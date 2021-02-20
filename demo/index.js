import React from '../src/react'
import ReactDOM from '../src/react-dom'

const  Welcome = props => <h1>Hello, {props.name}</h1>

class Counter extends React.Component {
  constructor(props) {
    // super 暂时不能省
    super(props)
    this.state = {
      age: 18
    }
  }

  onClick() {
    this.setState({ age: this.state.age + 1 })
  }
  
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  } 
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
  }
  
  render() {
    return (
      <div>
        <h1>Age: {this.state.age}</h1>
        <button onClick={() => this.onClick()}>{this.props.btnName}</button>
      </div>
    )
  }
}

const element = (
  <div>
    This is text node
    <Welcome name="Kimi" className='red' />
    <Counter btnName="Add age" />
  </div>
)

console.log(element)

ReactDOM.render(
  element,
  document.getElementById( 'root' )
)
