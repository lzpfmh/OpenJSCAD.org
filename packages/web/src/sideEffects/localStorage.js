const most = require('most')

module.exports = function makeStorageSideEffect (name) {
  function sink (outToStore$) {
    if (outToStore$) {
      outToStore$.forEach(function (outToStore) {
        // console.log('operation storage', outToStore)
        localStorage.setItem(`${name}:jscad-settings`, JSON.stringify(outToStore))
        /* const {operation, data, target} = outToStore
        const storage = target === `local` ? localStorage : sessionStorage
        storage[operation](data) */
        // store.set(outToStore)
      })
    }
  }

  function source () {
    const settings = localStorage.getItem(`${name}:jscad-settings`)
    const allData = JSON.parse(settings) || {}
    /* Object.keys(localStorage)
      .reduce((obj, key) => {
        obj[key] = localStorage.getItem(key)
        return obj
      }, {}) */

    return most.just(allData).multicast()
  }
  return {sink, source}
}