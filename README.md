# AlphaBeta

AlphaBeta lets you build split tests (A/B tests) directly into your React app.

### TL;DR
AlphaBeta is...
* **declarative:** Like React itself, AlphaBeta benefits from the advantages of declarative programming. The AlphaBeta component is, in fact, just a special type of React component that "wraps" the component varients you're testing.
* **lightweight:** The AlphaBeta package is small and the AlphaBeta component is thin, so AlphaBeta tests won't measurably increse the time it takes for your application to render. Since AlphaBeta is so lightweight, you can be less selective about what you choose to test - it may even make sense to run single-variant tests, wraping components you may test in the future in an AlphaBeta component to establish a baseline for comparison.
* **backend agnostic:** Because split testing requires storing what users do on your site, AlphaBeta will need to communicate with a datastore in order to work. But whatever datastore you're currently using will be fine - just build an endpoint like the one described in "Getting Started" and point AlphaBeta to it, and you're good to go.
* **extensible:** AlphaBeta is designed to make it easy for developers to integrate basic split tests into their React apps without having to think about the the underlying statistics. But it's also possible to build your own custom logic around how confidence intervals are calculated and how user cohorting works within your app.

### Installation

### Setup
In order for AlphaBeta to be useful, it needs to be able to record data about the experiments you're running. This isn't unique to AlphaBeta - it's true of split testing in general. Imagine, for example, that you're running an experiment on your landing page to see if changing your "Sign Up" button from blue to orange leads to more users clicking it. To measure which color performs better, you need to keep track of the number of times each buton is seen (impressions) and clicked (success events or conversions).
You can connect AlphaBeta to a datastore you're already using in three steps.
* **Step 1:** Build an endpoint for AlphaBeta to POST data to and GET data from.
The URL for your endpont can be whatever you want it to be, but it must be able to accept a parameter at the end of its "path" section representing an experiment id.
So if your endpoint is located at https://www.yoursite.com/api/alphabeta/ then https://www.yoursite.com/api/alphabeta/{{experimentId}}/ MUST return data about {{experimentId}} when it receives a GET request and MUST save data about {{experimentId}} when it receives a POST request.
You can also have the base url (the url when no experimentId is passed) return a list of your experiments. This is not required, but may be useful.
When AlphaBeta POSTs data to your endpoint, the POST body will look like this
```
{
  variant: "a",   // this will either be "a" or "b"
  success: null,  // this will either be null or true
  userId: .10392  // a number between 0 and 1
  metaId: null,   // this will be null unless you choose to set it
}
```
**variant** tells your datastore which component varient (a or b) was presented to a particular user.
**success** tells your datastore whether the success event occured (true) not (null). Note that the value for this parameter will either be true or null, as opposed to true or false. When **success** is passed as null, that signals that an sample event has occured (a user saw a variant of whatever it is that you're testing). It is passed as null because when the component is loaded we don't know if the user will trigger the success event or not. When **success** is passed as true, that signals that a success event has occured.
**userId** is a number between 0 and 1 that AlphaBeta has associated with the particular user in this experiment. It has nothing to do with any other userIds that might be used elsewhere in your application.
**metaId** is a value that you can optionally pass to your AlphaBeta component. It should be used when the component you're testing occurs multiple times on your site. The earlier example where we were testing the color of a "Sign Up" button on your landing page would be a case where the **metaId** property is not necessary, as user will only see the Sign Up button in one context. But suppose you instead were testing the copy on a facebook-style "like" button to see if it made sense to change it to "+1". Each piece of content a user views has a "like" (or "+1) button below it, and a single user could see (and "like") multiple pieces of content. In cases like these, you could set a **metaId** that uniquely identfies the piece of content. If you set the **metaId** in this way, you would be testing which variant leads to more total likes per content impression. If you did not set the **metaId** at all, you would be testing which variant leads to a user liking at least one piece of content.

When AlphaBeta GETs data from your endpoint, the returned data should look like this
```
{
  varientA: {
    trialCount: 291,    // the number of times this varient has been seen
    successCount: 59,   // the number of times the success event has occured
  },
  varientB: {
    trialCount: 101,
    successCount: 22,
  }
}
```

* **Step 2:** Code out what happens when data is POSTed to that endpoint.
When POST data is received, one two things may happen - the trialCount for an experiment variant could be incremented by 1, or the success count for an experiment could be incremented by 1. It's also possible that neither value is incremented. Note that there is no case where they both will be incremented in the same call. The logic for what gets incremented and when must be executed by your application's back end, and requires that you maintain data about previously received trials in a queriable format. Here's how it should work:
* if success === null and no previous trial exists where both userId and metaId are equal to this trial's values, you should increment trialCount for the appropriate variant.
* if success === true and no previous trial exists where both userId and metaId are equal to this trial's values, you should increment successCount for the appropriate variant.
* in all other cases, you should not increment either value.

* **Step 3:** Point AlphaBeta to that endpoint.


### Usage / Examples

### Lint
```bash
$ npm run lint
```

### Test
```bash
$ npm run test  # run once
$ npm run test:watch  # continuous testing as file changes
```

### License
MIT

### Credits
