var _pauldijou$elm_map$Native_Map = function () {
  var emptyMap = new Map()

  var Tuple2 = _elm_lang$core$Native_Utils.Tuple2
  var Nil = _elm_lang$core$Native_List.Nil
  var Cons = _elm_lang$core$Native_List.Cons
  var arrayToList = _elm_lang$core$Native_List.fromArray
  var listToArray = _elm_lang$core$Native_List.toArray

  function clone(m) {
    return new Map(m)
  }

  function empty() {
    return emptyMap
  }

  function singleton(key, value) {
    return new Map([[key, value]])
  }

  function insert(key, value, m) {
    return clone(m).set(key, value)
  }

  function remove(key, m) {
    m = clone(m)
    m.delete(key)
    return m
  }

  function size(m) {
    return m.size
  }

  function member(key, m) {
    return m.has(key)
  }

  function keys(m) {
    var res = Nil
    m.forEach(function (key, value) {
      res = Cons(key, res)
    })
    return res
  }

  function values(m) {
    var res = Nil
    m.forEach(function (key, value) {
      res = Cons(value, res)
    })
    return res
  }

  function toList(m) {
    var res = Nil
    m.forEach(function (key, value) {
      res = Cons(Tuple2(key, value), res)
    })
    return res
  }

  function map(fn, m) {
    var res = new Map()
    m.forEach(function (key, value) {
      res.set(key, A2(fn, key, value))
    })
    return res
  }

  function fold(fn, acc, m) {
    var res = acc
    m.forEach(function (key, value) {
      res = A3(fn, key, value, res)
    })
    return res
  }

  function filter(predicate, m) {
    var res = new Map()
    m.forEach(function (key, value) {
      if (A2(predicate, key, value)) {
        res.set(key, value)
      }
    })
    return res
  }

  function partition(predicate, m) {
    var left = new Map()
    var right = new Map()
    m.forEach(function (key, value) {
      A2(predicate, key, value) ? left.set(key, value) : right.set(key, value)
    })
    return Tuple2(left, right)
  }

  function union(m1, m2) {
    var res = new Map()
    m2.forEach(function (key, value) {
      res.set(key, value)
    })
    m1.forEach(function (key, value) {
      res.set(key, value)
    })
    return res
  }

  function intersect(m1, m2) {
    var res = new Map()
    m1.forEach(function (key, value) {
      if (m2.has(key)) {
        res.set(key, value)
      }
    })
    return res
  }

  function diff(m1, m2) {
    var res = new Map()
    m1.forEach(function (key, value) {
      if (!m2.has(key)) {
        res.set(key, value)
      }
    })
    return res
  }

  function merge(left, both, rigth, m1, m2, acc) {
    var res = acc

    m1.forEach(function (key, value) {
      if (m2.has(key)) {
        res = A4(both, key, value, m2.get(key), res)
      } else {
        res = A3(left, key, value, res)
      }
    })

    m2.forEach(function (key, value) {
      if (!m1.has(key)) {
        res = A3(right, key, value, res)
      }
      // m1 keys have already been handled
    })

    return acc
  }

  return {
    empty: empty,
    singleton: F2(singleton),
    insert: F3(insert),
    remove: F2(remove),
    size: size,
    member: F2(member),
    keys: keys,
    values: values,
    map: F2(map),
    fold: F3(fold),
    filter: F2(filter),
    partition: F2(partition),
    union: F2(union),
    intersect: F2(intersect),
    diff: F2(diff),
    merge: F6(merge),
  }
}();
