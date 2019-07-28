import { createComponent, renderComponentToRealDOM } from './component';
import { setProps } from './dom';
import { diff } from './diff'

export function render(vNode, $container, $dom) {
  return diff($dom, vNode, $container)
}

// export function toRealDOM (vNode) {
//   // 创建真实节点
//   let $dom = createRealNode(vNode)
//   // 设置节点属性
//   if (vNode.props) {
//     Object.keys(vNode.props).forEach(key => {
//       setProps($dom, key, vNode.props[key])
//     })
//   }
//   // 递归处理子节点
//   if (vNode.children && vNode.children.length) {
//     vNode.children.forEach(child => {
//       // 注意有个挂载到父节点的操作
//       $dom.appendChild(toRealDOM(child))
//     })
//   }
//   return $dom
// }

// function createRealNode(vNode) {
//   // 注意不要遗漏 number 类型
//   if (typeof vNode === 'string' || typeof vNode === 'number') {
//     return document.createTextNode(vNode)
//   }
//   // 自定义组件(包括class和function)
//   if (typeof vNode.type === 'function') {
//     // component 即自定义组件的实例
//     const component = createComponent(vNode.type, vNode.props)
//     // 生成 component.$dom
//     renderComponentToRealDOM(component)
//     // 自定义组件的对应的真实dom
//     return component.$dom
//   }
//   return document.createElement(vNode.type)
// }

export default {
  render
}
