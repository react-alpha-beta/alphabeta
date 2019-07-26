# AlphaBeta

AlphaBeta lets you build split tests (A/B tests) directly into
your React app.

AlphaBeta is...
* **declarative:** Like React itself, AlphaBeta benefits from the advantages of declarative programming. The AlphaBeta component is, in fact, just a special type of React component that "wraps" the component variants you're testing.
* **lightweight:** The AlphaBeta package is small and the AlphaBeta component is thin, so AlphaBeta tests won't measurably increase the time it takes for your application to render. Since AlphaBeta is so lightweight, you can be less selective about what you choose to test - it may even make sense to run single-variant tests, wrapping components you may test in the future in an AlphaBeta component today in order to establish a baseline for comparison.
* **backend agnostic:** Since split testing requires that you store event data, AlphaBeta needs to communicate with a datastore in order to work. But AlphaBeta will work with whatever datastore you're currently using - just follow the instructions in [Backend / API Setup](README.md#backend--api-setup) to build your endpoint, point AlphaBeta to it, and you're good to go.
* **extensible:** AlphaBeta is designed to make it easy for developers to integrate basic split tests into their React apps without having to think about the underlying statistics. But it's also possible to build your own custom logic around how confidence intervals are calculated and how user cohorting works within your app.

**Building your first A/B test is simple:**

```js
import { ABComponent } from 'react-alpha-beta';

class ButtonA extends React.Component {
  render() {
    return (<Button onClick={this.props.successAction}
                    style={{'background-color':'blue'}}>
              "Sign Up"
            </Button>);
  }
}

class ButtonB extends React.Component {
  render() {
    return (<Button onClick={this.props.successAction}
                    style={{'background-color':'orange'}}>
              "Sign Up"
            </Button>);
  }
}

class Page extends React.Component {
    render() {
        return (
            <div>
                <ABComponent
                    ComponentA={ButtonA}
                    ComponentB={ButtonB}
                    experimentParams={{
                      id: '1',
                      testCohortSize: 0.4,
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('app')
);
```

**Your experiment results will look something like this:**

```js
{
  meanDifferenceValue: -0.05023923444976075,
  marginOfError: 0.04837299277280508,
  statisticalSignificance: true,
  details: "Our best estimate is that the absolute rate of success is 5% lower with variant B, and this result is statistically significant (We are 95% confident the true difference is between -10% and 0%.). Given this information, you should probably stick with variant A.",
}
```

## Installation

```bash
$ npm install react-alpha-beta --save
```

## Overview and Basic Usage

The AlphaBeta component is a React component that "wraps" two other components. These two "wrapped" components are passed as `ComponentA` and `ComponentB`, and they represent the two variants you're testing. Each user that encounters the AlphaBeta component will see one of the two variants, and the AlphaBeta component will report back to your server (i) which variant was displayed and (ii) if a success event occurred.

In addition to your `ComponentA` and `ComponentB` variants, you'll also pass `experimentParams` to each of your AlphaBeta components. `experimentParams` is an object containing the keys `id` and `testCohortSize`.

`id` is the unique id of a particular experiment, and is passed by the AlphaBeta component to your Backend / API (described below). Each AlphaBeta component that you declare should have a unique `id` associated with it.

`testCohortSize` is a number between 0.0 and 1.0. Its value tells your AlphaBeta component what proportion of your users will see each experiment variant. A `testCohortSize` value of 0.01 means that 1% of your users should see the `ComponentB` variant - the other 99% should see `ComponentA`. A value of .5 indicates that there should be an even split between the two variants.

When you wrap your variants in an AlphaBeta component, the AlphaBeta component passes the prop `successAction` to each of them.

You get to decide what constitutes "success" in the context of your experiment. If you're testing a button variation, "success" might be defined as a click (this is the case in the above code sample). If you're testing a landing page variation, "success" might be defined as submitting a validated form.

Note that while you have the ability to define "success" however you want, it is also your responsibility to make sure that `successAction` is fired by each of your variants when "success" occurs. Otherwise, AlphaBeta will have no way of giving you guidance about which variant is more likely to produce the desired outcome.

The [Button example](examples/button-experiment) is designed to help you get comfortable using the AlphaBeta component. You'll need to set up your Backend / API for the example to work (instructions below), but reading through the example may help you better understand how to use AlphaBeta, even prior to fully setting things up.

## Backend / API Setup

### Wait, AlphaBeta Needs a Backend?

In order for AlphaBeta to be useful, it needs to be able to record data about the experiments you're running. In other words, it needs to be linked to a datastore of some type. This reliance on a datastore isn't unique to AlphaBeta - it is true of split testing in general.

Imagine that you're running an experiment to see if changing a particular button from a transparent background (variant A) to a solid blue background (variant B) leads to more clicks. (If you already looked at the [Button example](examples/button-experiment), this should look familiar...)

To measure which variant performs better, you need to keep track of each variant's "impressions" (how many users have seen each button) and "conversions" (how many times each button is clicked).

When we are able to keep track of these values, all it takes is a bit of math to estimate (within a specific range or "confidence interval") which button leads to more conversions. AlphaBeta handles this math for you, but you're responsible for logging the events themselves in your datastore.

### So How Do I Set Up My AlphaBeta Endpoint?

You can connect AlphaBeta to a datastore you're already using in two steps.

#### Step 1:

**Set up an API endpoint for AlphaBeta to Consume**

AlphaBeta expects to be able to interact with an endpoint at `www.yoursite.com/api/alphabeta/{{experimentId}}/`, where `{{experimentId}}` is the unique `id` you pass to each AlphaBeta component in `experimentParams`.

AlphaBeta will both POST to and GET from this endpoint. When AlphaBeta detects an "impression" or a "conversion", it will POST to this endpoint, so all users who may encounter an experiment should be able to POST to this endpoint.

You can safely restrict GET requests to only allow access to users who should be able to see data about your experiments.

It's also a good idea (though not strictly necessary) to set up your endpoint such that GET requests made without an `{{experimentId}}` return a list of your experiments. This is a good idea if you wish to build a single page where you can view data about all of our experiments.

**Ensure Your Endpoint Accepts POST Requests Correctly**

When AlphaBeta POST data to your endpoint, the POST body should look like this:

```js
{
    variant: "a",             // this will either be "a" or "b"
    success: null,            // this will either be null or true
    userCohortValue: .10392,  // a number between 0 and 1
    metaId: null,             // this will be null unless you choose to set it
}
```

  * `variant` tells your datastore which component variant (A or B) was presented to a particular user.

  * `success` tells your datastore whether the success event occurred (`true`) or not (`null`).

    (Note that the value for this parameter will either be `true` or `null`, as opposed to `true` or `false`. When `success` is passed as `null`, that signals that an impression has occurred. It is passed as `null` because when the component is loaded we don't know if the user will trigger the success event or not. When `success` is passed as `true`, that signals that a success event has occurred.)

  * `userCohortValue` is a number between 0.0 and 1.0 that AlphaBeta has associated with the particular user in this experiment. This number is randomly generated the first time a user encounters a particular AlphaBeta experiment, and is core to how AlphaBeta separates users into cohorts.

  * `metaId` is a value that you can optionally pass to your AlphaBeta component. It should be used in cases where the component that you're testing occurs more than one time times on your site.

  Here is an example of when you would set the `metaId` attribute:

  Imagine you instead were testing the copy on a Facebook-style "like" button to see if changing "like" to "+1" led to more engagement. Each piece of content a user views in his/her news feed should have a "like" (or "+1) button below it. But since each user has multiple items in his/her feed, a single user could "like" more than one piece of content.

  In this case, you could set a `metaId` that uniquely identifies the piece of content being "liked". If you were to set the `metaId`, you would be testing which variant leads to more total likes per unit of content seen. If you were to not set the `metaId`, you would be testing which variant is more likely to lead to a user liking at least one piece of content.

**Ensure Your Endpoint Responds to GET Requests Correctly**

When AlphaBeta GETs data from your endpoint, the returned data should look like this
```js
{
  variantA: {
    trialCount:   291,  // the number of unique impressions for this variant
    successCount: 59,   // the number of unique success events for this variant
  },
  variantB: {
    trialCount:   101,
    successCount: 22,
  },
  confidenceInterval: .95 // the CI you're looking to achieve, expressed as a float
}
```

#### Step 2:

**Ensure Your Back End Processes POST Requests Correctly**

When POST data is received, one of three things is supposed to happen:

  1 - the `trialCount` for an experiment variant could be incremented by 1.

  2 - the `successCount` for an experiment could be incremented by 1.

  3 - Nothing at all.

The logic for what should happen must be executed by your application's backend. Here's how things should work:

  * if `success` === `null` and no previous trial exists where both `userCohortValue` and `metaId` are equal to this trial's values, you should increment `trialCount` by one for the appropriate variant.

  * if `success` === `true` and no previous trial exists where both `userCohortValue` and `metaId` are equal to this trial's values and `success` === `true`, you should increment `successCount` by one for the appropriate variant.

  * in all other cases, you should not take any action.

## Checking Your Experiment Results

```js
import { getExperimentData } from 'react-alpha-beta';

console.log(getExperimentData(experimentId));
```

To view your experiment results, call the `getExperimentData` function with the `experimentId` for a particular experiment. It will return a json object with the keys `meanDifferenceValue`, `marginOfError`, `statisticalSignificance`, and `details`.

  * `meanDifferenceValue` is AlphaBeta's best estimate (or mean estimate) of ComponentB's performance relative to ComponentA. A positive number indicates that ComponentB is leading to more successActions per impression than ComponentA, while a negative number indicates the opposite.

  Note that `meanDifferenceValue` alone doesn't mean much if the experiment hasn't yet reached statistical significance.

  * `marginOfError` is the margin of error (or uncertainty) that exists in the experiment.

  * `statisticalSignificance`, a boolean, represents whether this experiment has yet reached statistical significance at the level of confidence you defined.

  * `details` is a human readable description of this experiment's current results.

Sample result from `getExperimentData`:
```
{
  meanDifferenceValue: -0.05023923444976075,
  marginOfError: 0.04837299277280508,
  statisticalSignificance: true,
  details: "Our best estimate is that the absolute rate of success is 5% lower with variant B, and this result is statistically significant (We are 95% confident the true difference is between -10% and 0%.). Given this information, you should probably stick with variant A.",
}
```

## Example

*Note: in order for this example to work, you must first set up an API endpoint for AlphaBeta to consume. If you haven't done this yet, follow the steps in [Backend / API Setup](README.md#backend--api-setup)*

* [Button example](examples/button-experiment): Set up an experiment to see which of two button variants has a greater click-through rate. This example covers (i) basic experiment setup, (ii) the two ways to pass your variant components to the AlphaBeta component, and (iii) basic usage of the AlphaBeta DevTools.

## AlphaBeta DevTools

AlphaBeta comes with a DevTools component that can be used on any page containing an experiment.

```js
import { ABComponent, DevTools } from 'react-alpha-beta';

// ***
// Build your experiment component, which we'll call <Page /> here.
// Make sure that <DevTools /> is in your <Page /> component.
// ***

ReactDOM.render(
    <Page />,
    document.getElementById('app')
);
```

One easy way to familiarize yourself with the DevTools component is to load the [Button example](examples/button-experiment).

If the DevTools component is included on your page and you are not in a production environment (i.e. `process.env.NODE_ENV !== 'production'`), you should see a DevTools box in the lower right hand corner of your screen. This box lets you control your user cohort value for each of the experiments on the page. Recall that the user cohort value for an experiment, along with the `testCohortSize` parameter, determine which variant a user sees.

If the user cohort value is greater than or equal to `testCohortSize`, the user will see variant A for this experiment. If the user cohort value is less than `testCohortSize`, the user will see variant B. When you manipulate the DevTools sliders, you are changing your user cohort value for an experiment. These changes will take place when you refresh the page.

You can add the DevTools component to the lower level components that contain your experiments, or to higher level components of your application.

## Discussion and Support
Join our [Slack team](http://alphabeta.launchrock.com/)!

## Additional Resources
* [A/B testing course (Udacity)](https://www.udacity.com/course/viewer#!/c-ud257)
* [Hypothesis testing with one sample (Khan Academy)](https://www.khanacademy.org/math/probability/statistics-inferential/hypothesis-testing/v/hypothesis-testing-and-p-values)

## Lint
```bash
$ npm run lint
```

## Test
```bash
$ npm run test        # run once
$ npm run test:watch  # continuous testing as file changes
$ npm run test:cov    # generate test coverage report
```

## Contribute
We are using [commitizen](https://commitizen.github.io/cz-cli/) to make commit format consistent.
```bash
# Install the command line tool.
$ npm install -g commitizen

# From then on, whenever you would like to commit:
$ git add .
$ git cz
# ... follow the prompt messages
```

## License
[MIT](LICENSE.md)

## Credits
- [Jack McCloy](https://github.com/jackmccloy)
- [Brian Park](https://github.com/yaru22)
- [Ben Hall](https://github.com/bxh_io)
