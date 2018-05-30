var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App');

// React components may have:
// state
// lifecycle event
// UI (set with render method)

/*class App extends React.Component {
    render () {
        return (
            // this is JSX, not HTML
            <div>Hello world!</div>
        )
    }
}*/

ReactDOM.render(
    <App />, document.getElementById('app')
)
