function createProxy(obj) {
  let point = obj
  function setHandler(target, property, value) {
    target[property] = value
    point = obj
  }
  function getHandler(target, property) {
    if (target instanceof Array && isNaN(parseInt(property))) {
      // 访问数组方法
      return function() {
        point[property](...arguments)
        point = obj
      }
    } else if (target[property] instanceof Array) {
      point[property] = Array.from(point[property])
      point = point[property]
      return new Proxy(target[property], {
        get: getHandler,
        set: setHandler
      })
    } else {
      point[property] = { ...point[property] }
      point = point[property]
      return new Proxy(target[property], {
        get: getHandler,
        set: setHandler
      })
    }
  }
  return new Proxy(obj, {
    get: getHandler,
    set: setHandler
  })
}

function mutation(obj) {
  return createProxy(obj)
}

module.exports = mutation
