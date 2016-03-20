# AlphaBeta

AlphaBeta lets you build split tests (A/B tests) directly into 
your React app.


Building your first A/B is as simple:

    import {AlphaBetaComponent} from alphabeta;
    import {ButtonA, ButtonB} from "../yourCode"


    class Page extends React.Component {
        
        buttonClickedEvent: () => {
            console.info("Button clicked")
        }

        render() {
            return (
                <div>
                    <AlphaBetaComponent
                        ComponentA={ButtonA}
                        ComponentB={ButtonB}
                        onSuccessEvent={buttonClickedEvent}/>
                 </div>
            );
          }
        }

    ReactDOM.render(
      <Page />,
      document.getElementById('app')
    );

If the use clicked the button, posted to the console:

    L: {"experimentId": "Page:ButtonA:ButtonA",
       "variant": "ButtonA"|"ButtonB"}
    L: {"experimentId": "Page:ButtonA:ButtonB",
       "variant": "ButtonA"|"ButtonB",
       "success": true}
    I: "Button clicked"

// Leaving specifying config to Jack

// Probably just global vars on the window object


### TL;DR
AlphaBeta is...
* **declarative:** Like React itself, AlphaBeta benefits from the advantages of declarative programming. The AlphaBeta component is, in fact, just a special type of React component that "wraps" the component varients you're testing.
* **lightweight:** The AlphaBeta package is small and the AlphaBeta component is thin, so AlphaBeta tests won't measurably increse the time it takes for your application to render. Since AlphaBeta is so lightweight, you can be less selective about what you choose to test - it may even make sense to run single-variant tests, wraping components you may test in the future in an AlphaBeta component to establish a baseline for comparison.
* **backend agnostic:** Because split testing requires storing what users do on your site, AlphaBeta will need to communicate with a datastore in order to work. But whatever datastore you're currently using will be fine - just build an endpoint like the one described in "Getting Started" and point AlphaBeta to it, and you're good to go.
* **extensible:** AlphaBeta is designed to make it easy for developers to integrate basic split tests into their React apps without having to think about the the underlying statistics. But it's also possible to build your own custom logic around how confidence intervals are calculated and how user cohorting works within your app.

### Installation

### Setup

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
