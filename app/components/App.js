var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

class App extends React.Component {
    render() {
        return (
            // this is JSX, not HTML
            // Need to use className when adding a class to a JSX element
            // ...since class is a reserved keyword in JavaScript
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/battle' component={Battle} />
                      <Route path='/battle/results' component={Results} />
                      <Route path='/popular' component={Popular} />
                      <Route render={function() {
                          return <p>Not Found</p>
                      }} />
                    </Switch>
                </div>
            </Router>

        )
    }
}

// Allows us to require (export) this class to other components
module.exports = App;