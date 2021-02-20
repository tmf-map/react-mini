export default function createElement(type, props, ...children) {
  const vdom = {
    type,
    props,
    children
  }
  // 因为是浅冻结，故里外两层都得冻结
  // 冻结后，不能增/删/改该属性
  // 顺序无所谓
  Object.freeze(vdom.props)
  Object.freeze(vdom)
  return vdom
}
