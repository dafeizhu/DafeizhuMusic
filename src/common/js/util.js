function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机播放洗牌函数
export function shuffle(arr) {
  // 因为shuffle洗牌函数作用在很多地方，我们需要它不去修改到原来的列表
  // 所以这里我们先复制出arr的副本_arr，然后只对这个副本做洗牌并返回，这样这个函数就没有副作用了
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
