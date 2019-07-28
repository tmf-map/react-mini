import { setProps, removeNode } from "./dom";
import { isVText, isVComponent } from "./utils";
import { createComponent, unmountComponent, setComponentProps } from "./component";

/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
 */
export function diff($dom, vnode, $container) {
  const ret = diffNode($dom, vnode);
  if ($container && ret.parentNode !== $container) {
    $container.appendChild(ret);
  }
  return ret;
}

/**
 * @param {HTMLElement} $dom 真实DOM
 * @param {vnode} newVNode 虚拟DOM
 * @returns {HTMLElement} $out 更新后的DOM
 */
function diffNode($dom, newVNode) {
  // 1. 对比文本节点
  if (isVText(newVNode)) {
    diffVText($dom, newVNode)
  }
  // 2. 对比自定义组件
  if (isVComponent(newVNode)) {
    return diffVComponent($dom, newVNode);
  }
  // 3. 对比非文本DOM节点
  return diffVElement($dom, newVNode)
}

function diffVText($dom, newVNode) {
  let $out = $dom
  // 如果当前的DOM也是文本节点，则直接更新内容
  if (isDOMText($dom)) {
    $dom.textContent = newVNode
  } else {
    // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
    document.createTextNode(newVNode)
    if ($dom && $dom.parentNode) {
      $dom.parentNode.replaceChild($out, $dom)
    }
  }
  return $out
}

function diffVComponent($dom, newVNode) {
  let component = $dom && $dom._component;
  let oldDom = $dom;
  // 如果组件类型没有变化，则重新set props
  if (component && component.constructor === newVNode.type) {
    setComponentProps(component, newVNode.props);
    $dom = component.$dom;
    // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
  } else {
    if (component) {
      unmountComponent(component);
      oldDom = null;
    }
    component = createComponent(newVNode.type, newVNode.props);
    setComponentProps(component, newVNode.props);
    $dom = component.$dom;
    if (oldDom && $dom !== oldDom) {
      oldDom._component = null;
      removeNode(oldDom);
    }
  }
  return $dom;
}

function diffVElement($dom, newVNode) {
  // 如果真实DOM不存在，表示此节点是新增的
  if (!$dom) {
    return document.createElement(newVNode.type);
  }
  if (hasDifferentNodeType($dom, newVNode)) {
    // 新建一个DOM元素
    let $out = document.createElement(newVNode.type);
    // 将原来的子节点移到新节点下
    [...dom.childNodes].map(out.appendChild);
    // 移除掉原来的DOM对象
    if (dom.parentNode) {
      dom.parentNode.replaceChild(out, dom);
    }
    return $out
  }
  if (hasDifferentProps($dom, newVNode)) {
    return diffProps($dom, newVNode)
  }
  if (hasChildrenNode($dom, newVNode)) {
    return diffChildren($dom, newVNode.children);
  }
  return $out
}

function diffProps($dom, newVNode) {
  const old = {};    // 当前DOM的属性
  const props = newVNode.props;     // 虚拟DOM的属性
  for (let i = 0; i < $dom.attributes.length; i++) {
    const attr = $dom.attributes[i];
    old[attr.name] = attr.value;
  }
  // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
  for (let name in old) {
    if (!(name in props)) {
      setProps($dom, name, undefined);
    }
  }
  // 更新新的属性值
  for (let name in props) {
    if (old[name] !== props[name]) {
      setProps($dom, name, props[name]);
    }
  }
}

function diffChildren($dom, VChildren) {
  const $domChildren = $dom.childNodes;
  const $children = [];
  const keyed = {};
  if ($domChildren.length > 0) {
    for (let i = 0; i < $domChildren.length; i++) {
      const $child = $domChildren[i];
      const key = $child.key;
      if (key) {
        keyedLen++;
        keyed[key] = $child;
      } else {
        $children.push(child);
      }
    }
  }
  if (VChildren && VChildren.length > 0) {
    let min = 0;
    let childrenLen = $children.length;
    for (let i = 0; i < VChildren.length; i++) {
      const VChild = VChildren[i];
      const key = VChild.key;
      let $child;
      if (key) {
        if (keyed[key]) {
          $child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (min < childrenLen) {
        for (let j = min; j < childrenLen; j++) {
          let $c = children[j];
          if ($c && !hasDifferentNodeType($c, VChild)) {
            child = $c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
      $child = diffNode($child, VChild)
      const f = $domChildren[i];
      if ($child && $child !== $dom && $child !== f) {
        if (!f) {
          $dom.appendChild($child);
        } else if ($child === f.nextSibling) {
          removeNode(f);
        } else {
          $dom.insertBefore($child, f);
        }
      }
    }
  }
}
