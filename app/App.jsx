import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Main from './Main.jsx'
import Items from './Items.jsx'
import Item from './Item.jsx'
import Graph from './Graph.jsx'

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Main}>
          <IndexRoute component={Items} />
          <Route path='items' component={Items} />
          <Route path='item' component={Item} />
          <Route path='chart' component={Graph} />
        </Route>
      </Router>    )
  }
}

ReactDOM.render(<App />, document.getElementById('app') )
