import React from '../src/React'
import ReactDOM from '../src/ReactDOM'

const element = (
  <div>
    This is text node
    <h1 className='red'>Hello, world!</h1>
    <button onClick={() => alert('clicked')}>alert</button>
  </div>
)

console.log(element)

ReactDOM.render(
  element,
  document.getElementById( 'root' )
)
