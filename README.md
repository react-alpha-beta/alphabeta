# AlphaBeta

AlphaBeta lets you build split tests (A/B tests) directly into 
your React app.

AlphaBeta is...
* **declarative:** Like React itself, AlphaBeta benefits from the advantages of declarative programming. The AlphaBeta component is, in fact, just a special type of React component that "wraps" the component variants you're testing.
* **lightweight:** The AlphaBeta package is small and the AlphaBeta component is thin, so AlphaBeta tests won't measurably increse the time it takes for your application to render. Since AlphaBeta is so lightweight, you can be less selective about what you choose to test - it may even make sense to run single-variant tests, wraping components you may test in the future in an AlphaBeta component to establish a baseline for comparison.
* **backend agnostic:** Since split testing requires that you store event data, AlphaBeta will need to communicate with your datastore in order to work. But AlphaBeta will work with whatever datastore you're currently - just follow the instructions in "Getting Started" to build your endpoint, point AlphaBeta to it, and you're good to go.
* **extensible:** AlphaBeta is designed to make it easy for developers to integrate basic split tests into their React apps without having to think about the the underlying statistics. But it's also possible to build your own custom logic around how confidence intervals are calculated and how user cohorting works within your app.

**Building your first A/B test is simple:**

```js
import { ABComponent } from 'react-alphabeta';
import { ButtonA, ButtonB } from '../yourCode';
class ButtonA extends React.Component {
  render(){
  }
}

class Page extends React.Component {
    
    buttonClickedEvent = () => {
        console.info("Button clicked")
    };

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

Additonally, the AlphaBeta component passes the prop `successAction` to ComponentA and ComponentB (your two variants). `successAction` is a function that should be called when the the event you're measuring occurs. In this experiment your two variants are buttons, so the "onClick" event is probably our `successAction`. Make sure that your code fires successAction when an onClick event occurs in ButtonA or ButtonB.

### Installation
```bash
$ npm install react-alphabeta --save
```

### Backend / API Setup
In order for AlphaBeta to be useful, it needs to be able to record data about the experiments you're running. This need to be linked with a datastore isn't unique to AlphaBeta - it is true of split testing in general.

Imagine that you're running an experiment to see if changing your "Sign Up" button from blue to orange leads to more sign ups. To measure which color performs better, you need to keep track of the number of times each button is seen (impressions) and the number of times each button is clicked (success events or conversions).

Given these four values (impressions for button A, conversions for button A, impressions for button B, and conversions for button B), all it takes is a bit of math to estimate (within a range or "confidence interval") which button has a better conversion rate. AlphaBeta does this math for you, but you're responsible for logging the events themselves in your datastore.

You can connect AlphaBeta to a datastore you're already using in three steps.

  **Step 1:** Build an endpoint for AlphaBeta to POST data to and GET data from.

  The URL for your endpont can be whatever you want it to be, but it must be able to accept a parameter at the end of its "path" section representing an `experimentId`.

  So, if your endpoint is located at `www.yoursite.com/api/alphabeta/` (which is AlphaBeta's default setting), then `www.yoursite.com/api/alphabeta/{{experimentId}}/` is required to return data about `{{experimentId}}` when it receives a GET request and needs to save data about `{{experimentId}}` when it receives a POST request.

  (You should also have the base url (the url when no `experimentId` is passed) return a list of your experiments. This is not required, but will be useful for building a page where you can view all of your experiments.)

  When AlphaBeta POST's data to your endpoint, the POST body should look like this:
  
  ```js
  {
      variant: "a",   // this will either be "a" or "b"
      success: null,  // this will either be null or true
      userId: .10392  // a number between 0 and 1
      metaId: null,   // this will be null unless you choose to set it
  }
  ```

  * **variant** tells your datastore which component variant (a or b) was presented to a particular user.

  * **success** tells your datastore whether the success event occured (true) not (null).

  (Note that the value for this parameter will either be true or null, as opposed to true or false. When **success** is passed as null, that signals that an sample event has occured (a user saw one variant - A or B - of the thing that you're testing). It is passed as null because when the component is loaded we don't know if the user will trigger the success event or not. When **success** is passed as true, that signals that a success event has occured.)
  
  **userId** is a number between 0 and 1 that AlphaBeta has associated with the particular user in this experiment. It has nothing to do with any other userIds that might be used elsewhere in your application.

  * **metaId** is a value that you can optionally pass to your AlphaBeta component, and is useful in situations where the thing that you're testing occurs multiple times on your site.

  The earlier example where we were testing the color of a "Sign Up" button on your landing page would be a case where the **metaId** property is probably not necessary, as user will only see the Sign Up button in one context.

  But imagine you instead were testing the copy on a Facebook-style "like" button to see if changing "like" to "+1" led to more engagement. Each piece of content a user views has a "like" (or "+1) button below it, and a single user could see (and "like") more than one piece of content. In cases like these, you could set a **metaId** that uniquely identfies the piece of content being "liked". If you use the **metaId** in this way, you would be testing which variant leads to more total likes per piece of content seen. If you did not set the **metaId** at all, you would be testing which variant is more likely to lead to a user liking at least one piece of content.

  When AlphaBeta GETs data from your endpoint, the returned data should look like this
  ```js
  {
      variantA: {
          trialCount:   291,  // the number of times this variant has been seen
          successCount: 59,   // the number of times the success event has occured
      },
      variantB: {
          trialCount:   101,
          successCount: 22,
      }
  }
  ```

  **Step 2:** Code out what happens when data is POST'ed to that endpoint.

  When POST data is received, one of two things may happen - the `trialCount` for an experiment variant could be incremented by 1, or the success count for an experiment could be incremented by 1. It's also possible that neither value is incremented. (Note that there is no case where they both will be incremented in the same call). The logic for which value is incremented and when must be executed by your application's backend, and requires that you maintain data about previously received trials in a queriable format. Here's how it should work:

    * if success === null and no previous trial exists where both userId and metaId are equal to this trial's values, you should increment trialCount for the appropriate variant.

    * if success === true and no previous trial exists where both userId and metaId are equal to this trial's values, you should increment successCount for the appropriate variant.

    * in all other cases, you should not increment either value.

  **Step 3:** Point AlphaBeta to that endpoint.

  By default, AlphaBeta will look for your endpoint at `yoursite.com/api/alphabeta`. If you would like AlphaBeta to look somewhere other than this location, just define your `ALPHA_BETA_ENDPOINT` environment variable.


### Usage / Examples

### Lint
```bash
$ npm run lint
```

### Test
```bash
$ npm run test        # run once
$ npm run test:watch  # continuous testing as file changes
```

### Resources
* [A/B testing course (Udacity)](https://www.udacity.com/course/viewer#!/c-ud257)
* [Hypothesis testing with one sample (Khan Academy)](https://www.khanacademy.org/math/probability/statistics-inferential/hypothesis-testing/v/hypothesis-testing-and-p-values)

### License
[MIT](LICENSE.md)

### Credits
