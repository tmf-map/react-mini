import React from '../src/React'
import ReactDOM from '../src/ReactDOM'

const element = (
  <div>
    <h1>Hello, world!</h1>
    <h2>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
)

ReactDOM.render(
  element,
  document.getElementById( 'root' )
)
