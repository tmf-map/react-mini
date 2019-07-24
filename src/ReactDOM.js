function render(vNode, $container) {
  // 防止多次调用render方法，要先清除之前的内容
  $container.innerHTML = ''
  $container.appendChild(toRealDOM(vNode))
}

function toRealDOM(vNode) {
  // 创建真实节点
  let $dom = createRealNode(vNode)
  // 设置节点属性
  if (vNode.props) {
    Object.keys(vNode.props).forEach(key => {
      setProps($dom, key, vNode.props[key])
    })
  }
  // 递归处理子节点
  if (vNode.children && vNode.children.length) {
    vNode.children.forEach(child => {
      // 注意有个挂载到父节点的操作
      $dom.appendChild(toRealDOM(child))
    })
  }
  return $dom
}

function createRealNode(vNode) {
  let $node
  if (typeof vNode === 'string') {
    $node = document.createTextNode(vNode)
  } else {
    $node = document.createElement(vNode.type)
  }
  return $node
}

function setProps($target, name, value) {
  // 如果属性名是className，则改回class
  if (name === 'className') {
    name = 'class'
  }

  // 如果属性名是onXXX，则是一个事件监听方法
  if (/^on/.test(name)) {
    $target.addEventListener(name.slice(2).toLowerCase(), value)
  }

  // 如果属性名是style，则更新style对象

  // 普通属性则直接更新属性
  $target.setAttribute(name, value)
}

export default {
  render
}
