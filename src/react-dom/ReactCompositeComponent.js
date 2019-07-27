import React from '../react'
import { toRealDOM } from './render';

export class Component {
  constructor (props = {}) {
    this.state = {}
    this.props = props
  }
  setState (state) {
    // 将修改合并到state
    Object.assign(this.state, state)
    // 触发组件更新，目前没有做异步队列
    componentToRealDOMWithLifeCycle(this)
  }
}

export function createReactCompositeComponent (componentFn, props) {
  // component 即自定义组件的实例
  let component
  // 如果是class组件，componentFn 则是构造函数，则直接返回实例即可
  if (componentFn.prototype && componentFn.prototype.render) {
    component = new componentFn(props)
  } else {
    // 如果是function组件，调用Component构造函数生成实例
    // Component类并没有生命周期方法，故函数式组件不能控制生命周期
    component = new React.Component(props)
    component.render = componentFn
  }
  return component
}

function componentToRealDOM (component) {
  // class 类型render参数为空
  let $dom = toRealDOM(component.render(component.props))
  // update $dom
  // todo: diff
  if (component.$dom && component.$dom.parentNode) {
    component.$dom.parentNode.replaceChild($dom, component.$dom)
  }
  component.$dom = $dom
}

/**
 * 1. 将component实例转化成$dom，并放在实例的$dom属性
 * 2. 实现生命周期钩子
 */
export function componentToRealDOMWithLifeCycle (component) {
  let isFirstRender = !component.$dom
  if (isFirstRender) {
    // First Mount
    component.componentWillMount && component.componentWillMount()
    componentToRealDOM(component)
    component.componentDidMount && component.componentDidMount()
  } else {
    // Update Component
    component.componentWillReceiveProps && component.componentWillReceiveProps()
    component.componentWillUpdate && component.componentWillUpdate()
    componentToRealDOM(component)
    component.componentDidUpdate && component.componentDidUpdate()
  }
}
