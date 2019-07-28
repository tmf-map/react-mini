export function setProps($target, name, value) {
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

// if name is event, value(cb) must have.
export function removeProp($target, name, value) {
  if (name === 'className') { // fix react className
    return $target.removeAttribute('class');
  }
  if (isEventProp(name)) {
    return $target.removeEventListener(extractEventName(name), value);
  }
  if (typeof value === 'boolean') {
    $target.removeAttribute(name);
    $target[name] = false;
  } else {
      $target.removeAttribute(name);
  }
}

function removeNode( $dom ) {
  if ( $dom && $dom.parentNode ) {
      $dom.parentNode.removeChild( $dom );
  }
}
