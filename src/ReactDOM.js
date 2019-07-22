function render(vNode, $container) {
  const $dom = toRealDOM(vNode)
  mount($dom, $container)
}

function toRealDOM(vNode) {
  let $dom
  // do something with vNode
  return $dom
}

function setProps($target, name, value) {

}

function mount($dom, $container) {
  return $container.appendChild($dom)
}

export default {
  render
}
