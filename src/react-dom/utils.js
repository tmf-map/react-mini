export function isVText (VNode) {
  return typeof VNode === 'string' || typeof VNode === 'number'
}

export function isDOMText($dom) {
  return $dom && $dom.nodeType === 3
}

export function isVComposite (vNode) {
  return vNode.type === 'function'
}

export function hasDifferentNodeType ($dom, newVNode) {
  return $dom.nodeName.toLowerCase() !== newVNode.type.toLowerCase()
}

export function hasDifferentProps($dom, newVNode) {
  
}

export function hasChildrenNode($dom, newVNode) {
  return newVNode.children && newVNode.children.length > 0 || ($dom.childNodes && $dom.childNodes.length > 0)
}
