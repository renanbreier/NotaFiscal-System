import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  widget_default
} from "./chunk-IWHEGBWI.js";
import {
  CLICK_EVENT_NAME,
  TemplateBase,
  _objectWithoutPropertiesLoose,
  action_default,
  addNamespace,
  attachInstanceToElement,
  eventData,
  eventDelta,
  findTemplates,
  fireEvent,
  focusable,
  getInstanceByElement,
  getPublicElement,
  getUniqueValues,
  isCommandKeyPressed,
  isMouseEvent,
  m_emitter_default,
  m_emitter_registrator_default,
  m_event_registrator_default,
  m_pointer_default,
  removeDuplicates,
  removeEvent
} from "./chunk-ICLEXNO5.js";
import {
  EventsStrategy,
  m_devices_default,
  m_support_default,
  ui_errors_default
} from "./chunk-DONQLAZQ.js";
import {
  getOuterHeight,
  getOuterWidth,
  ready_callbacks_default,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  ajax_default
} from "./chunk-BKRVOW4S.js";
import {
  Deferred,
  _extends,
  class_default,
  compileGetter,
  config_default2 as config_default,
  deepExtendArraySafe,
  deferRenderer,
  dom_adapter_default,
  each,
  ensureDefined,
  equalByValue,
  error_default,
  errors_default,
  extend,
  fromPromise,
  getKeyHash,
  getWindow,
  grep,
  guid_default2 as guid_default,
  isBoolean,
  isDefined,
  isEmptyObject,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  logger,
  m_common_default,
  m_window_default,
  map,
  noop,
  toComparable,
  when
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/data/m_errors.js
var errors = error_default(errors_default.ERROR_MESSAGES, {
  E4000: "[DevExpress.data]: {0}",
  E4001: "Unknown aggregating function is detected: '{0}'",
  E4002: "Unsupported OData protocol version is used",
  E4003: "Unknown filter operation is used: {0}",
  E4004: "The thenby() method is called before the sortby() method",
  E4005: "Store requires a key expression for this operation",
  E4006: "ArrayStore 'data' option must be an array",
  E4007: "Compound keys cannot be auto-generated",
  E4008: "Attempt to insert an item with a duplicated key",
  E4009: "Data item cannot be found",
  E4010: "CustomStore does not support creating queries",
  E4011: "Custom Store method is not implemented or is not a function: {0}",
  E4012: "Custom Store method returns an invalid value: {0}",
  E4013: "Local Store requires the 'name' configuration option is specified",
  E4014: "Unknown data type is specified for ODataStore: {0}",
  E4015: "Unknown entity name or alias is used: {0}",
  E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
  E4017: "Keys cannot be modified",
  E4018: "The server has returned a non-numeric value in a response to an item count request",
  E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
  E4020: "Unknown store type is detected: {0}",
  E4021: "The server response does not provide the totalCount value",
  E4022: "The server response does not provide the groupCount value",
  E4023: "Could not parse the following XML: {0}",
  E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
  W4000: "Data returned from the server has an incorrect structure",
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
  var _errorHandler;
  null === (_errorHandler = errorHandler) || void 0 === _errorHandler || _errorHandler(error);
};
var setErrorHandler = (handler) => errorHandler = handler;

// node_modules/devextreme/esm/__internal/data/m_utils.js
var ready = ready_callbacks_default.add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
  return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
var normalizeSortingInfo = function(info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return map(info, ((i) => {
    const result = {
      selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
    };
    if (i.compare) {
      result.compare = i.compare;
    }
    return result;
  }));
};
var errorMessageFromXhr = (function() {
  const textStatusMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
  };
  let unloading;
  ready((() => {
    const window2 = getWindow();
    dom_adapter_default.listen(window2, "beforeunload", (() => {
      unloading = true;
    }));
  }));
  return function(xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return (function(textStatus2) {
        let result = textStatusMessages[textStatus2];
        if (!result) {
          return textStatus2;
        }
        return result;
      })(textStatus);
    }
    return xhr.statusText;
  };
})();
var aggregators = {
  count: {
    seed: 0,
    step: (count) => 1 + count
  },
  sum: {
    seed: 0,
    step: (sum, item) => sum + item
  },
  min: {
    step: (min, item) => item < min ? item : min
  },
  max: {
    step: (max, item) => item > max ? item : max
  },
  avg: {
    seed: [0, 0],
    step: (pair, value) => [pair[0] + value, pair[1] + 1],
    finalize: (pair) => pair[1] ? pair[0] / pair[1] : NaN
  }
};
var processRequestResultLock = /* @__PURE__ */ (function() {
  let lockCount = 0;
  let lockDeferred;
  return {
    obtain: function() {
      if (0 === lockCount) {
        lockDeferred = new Deferred();
      }
      lockCount++;
    },
    release: function() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    },
    promise: function() {
      const deferred = 0 === lockCount ? new Deferred().resolve() : lockDeferred;
      return deferred.promise();
    },
    reset: function() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    }
  };
})();
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
var keysEqual = function(keyExpr, key1, key2) {
  if (Array.isArray(keyExpr)) {
    const names = map(key1, ((v, k) => k));
    let name2;
    for (let i = 0; i < names.length; i++) {
      name2 = names[i];
      if (!equalByValue(key1[name2], key2[name2], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return equalByValue(key1, key2, {
    strict: false
  });
};
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var base64_encode = function(input) {
  if (!Array.isArray(input)) {
    input = stringToByteArray(String(input));
  }
  let result = "";
  function getBase64Char(index) {
    return BASE64_CHARS.charAt(index);
  }
  for (let i = 0; i < input.length; i += 3) {
    const octet1 = input[i];
    const octet2 = input[i + 1];
    const octet3 = input[i + 2];
    result += map([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("");
  }
  return result;
};
function stringToByteArray(str) {
  const bytes = [];
  let code;
  let i;
  for (i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 + (code >> 6), 128 + (63 & code));
    } else if (code < 65536) {
      bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code));
    } else if (code < 2097152) {
      bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code));
    }
  }
  return bytes;
}
var isUnaryOperation = function(crit) {
  return "!" === crit[0] && Array.isArray(crit[1]);
};
var isGroupOperator = function(value) {
  return "and" === value || "or" === value;
};
var isUniformEqualsByOr = function(crit) {
  if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
    const [prop] = crit[0];
    return !crit.find(((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]));
  }
  return false;
};
var isGroupCriterion = function(crit) {
  const first = crit[0];
  const second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if (isFunction(first)) {
    if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
var trivialPromise = function() {
  const d = new Deferred();
  return d.resolve.apply(d, arguments).promise();
};
var rejectedPromise = function() {
  const d = new Deferred();
  return d.reject.apply(d, arguments).promise();
};
function throttle(func, timeout) {
  let timeoutId;
  return function() {
    if (!timeoutId) {
      timeoutId = setTimeout((() => {
        timeoutId = void 0;
        func.call(this);
      }), isFunction(timeout) ? timeout() : timeout);
    }
    return timeoutId;
  };
}
function throttleChanges(func, timeout) {
  let cache = [];
  const throttled = throttle((function() {
    func.call(this, cache);
    cache = [];
  }), timeout);
  return function(changes) {
    if (Array.isArray(changes)) {
      cache.push(...changes);
    }
    return throttled.call(this, cache);
  };
}

// node_modules/devextreme/esm/__internal/data/m_array_query.js
var Iterator = class_default.inherit({
  toArray() {
    const result = [];
    this.reset();
    while (this.next()) {
      result.push(this.current());
    }
    return result;
  },
  countable: () => false
});
var ArrayIterator = Iterator.inherit({
  ctor(array) {
    this.array = array;
    this.index = -1;
  },
  next() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      return true;
    }
    return false;
  },
  current() {
    return this.array[this.index];
  },
  reset() {
    this.index = -1;
  },
  toArray() {
    return this.array.slice(0);
  },
  countable: () => true,
  count() {
    return this.array.length;
  }
});
var WrappedIterator = Iterator.inherit({
  ctor(iter) {
    this.iter = iter;
  },
  next() {
    return this.iter.next();
  },
  current() {
    return this.iter.current();
  },
  reset() {
    return this.iter.reset();
  }
});
var MapIterator = WrappedIterator.inherit({
  ctor(iter, mapper) {
    this.callBase(iter);
    this.index = -1;
    this.mapper = mapper;
  },
  current() {
    return this.mapper(this.callBase(), this.index);
  },
  next() {
    const hasNext = this.callBase();
    if (hasNext) {
      this.index++;
    }
    return hasNext;
  }
});
var defaultCompare = function(xValue, yValue, options) {
  if (isString(xValue) && isString(yValue) && (null !== options && void 0 !== options && options.locale || null !== options && void 0 !== options && options.collatorOptions)) {
    return new Intl.Collator((null === options || void 0 === options ? void 0 : options.locale) || void 0, (null === options || void 0 === options ? void 0 : options.collatorOptions) || void 0).compare(xValue, yValue);
  }
  xValue = toComparable(xValue, false, options);
  yValue = toComparable(yValue, false, options);
  if (null === xValue && null !== yValue) {
    return -1;
  }
  if (null !== xValue && null === yValue) {
    return 1;
  }
  if (void 0 === xValue && void 0 !== yValue) {
    return 1;
  }
  if (void 0 !== xValue && void 0 === yValue) {
    return -1;
  }
  if (xValue < yValue) {
    return -1;
  }
  if (xValue > yValue) {
    return 1;
  }
  return 0;
};
var SortIterator = Iterator.inherit({
  ctor(iter, getter, desc, compare) {
    this.langParams = iter.langParams;
    if (!(iter instanceof MapIterator)) {
      iter = new MapIterator(iter, this._wrap);
      iter.langParams = this.langParams;
    }
    this.iter = iter;
    this.rules = [{
      getter,
      desc,
      compare,
      langParams: this.langParams
    }];
  },
  thenBy(getter, desc, compare) {
    const result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare);
    if (!this.sortedIter) {
      result.rules = this.rules.concat(result.rules);
    }
    return result;
  },
  next() {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current() {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset() {
    delete this.sortedIter;
  },
  countable() {
    return this.sortedIter || this.iter.countable();
  },
  count() {
    if (this.sortedIter) {
      return this.sortedIter.count();
    }
    return this.iter.count();
  },
  _ensureSorted() {
    const that = this;
    if (that.sortedIter) {
      return;
    }
    each(that.rules, (function() {
      this.getter = compileGetter(this.getter);
    }));
    that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort(((x, y) => that._compare(x, y)))), that._unwrap);
  },
  _wrap: (record, index) => ({
    index,
    value: record
  }),
  _unwrap: (wrappedItem) => wrappedItem.value,
  _getDefaultCompare: (langParams) => (xValue, yValue) => defaultCompare(xValue, yValue, langParams),
  _compare(x, y) {
    const xIndex = x.index;
    const yIndex = y.index;
    x = x.value;
    y = y.value;
    if (x === y) {
      return xIndex - yIndex;
    }
    for (let i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
      const rule = this.rules[i];
      const xValue = rule.getter(x);
      const yValue = rule.getter(y);
      const compare = rule.compare || this._getDefaultCompare(rule.langParams);
      const compareResult = compare(xValue, yValue);
      if (compareResult) {
        return rule.desc ? -compareResult : compareResult;
      }
    }
    return xIndex - yIndex;
  }
});
var compileCriteria = /* @__PURE__ */ (function() {
  let langParams = {};
  const _toComparable = (value) => toComparable(value, false, langParams);
  const compileGroup = function(crit) {
    if (isUniformEqualsByOr(crit)) {
      return ((crit2) => {
        const getter = compileGetter(crit2[0][0]);
        const filterValues = crit2.reduce(((acc, item, i) => {
          if (i % 2 === 0) {
            acc.push(_toComparable(item[2]));
          }
          return acc;
        }), []);
        return (obj) => {
          const value = _toComparable(getter(obj));
          return filterValues.some(((filterValue) => useStrictComparison(filterValue) ? value === filterValue : value == filterValue));
        };
      })(crit);
    }
    const ops = [];
    let isConjunctiveOperator2 = false;
    let isConjunctiveNextOperator = false;
    each(crit, (function() {
      if (Array.isArray(this) || isFunction(this)) {
        if (ops.length > 1 && isConjunctiveOperator2 !== isConjunctiveNextOperator) {
          throw errors.Error("E4019");
        }
        ops.push(compileCriteria(this, langParams));
        isConjunctiveOperator2 = isConjunctiveNextOperator;
        isConjunctiveNextOperator = true;
      } else {
        isConjunctiveNextOperator = isConjunctiveOperator(this);
      }
    }));
    return function(d) {
      let result = isConjunctiveOperator2;
      for (let i = 0; i < ops.length; i++) {
        if (ops[i](d) !== isConjunctiveOperator2) {
          result = !isConjunctiveOperator2;
          break;
        }
      }
      return result;
    };
  };
  const toString = function(value) {
    var _langParams;
    return isDefined(value) ? null !== (_langParams = langParams) && void 0 !== _langParams && _langParams.locale ? value.toLocaleString(langParams.locale) : value.toString() : "";
  };
  function compileEquals(getter, value, negate) {
    return function(obj) {
      obj = _toComparable(getter(obj));
      let result = useStrictComparison(value) ? obj === value : obj == value;
      if (negate) {
        result = !result;
      }
      return result;
    };
  }
  function useStrictComparison(value) {
    return "" === value || 0 === value || false === value;
  }
  return function(crit, options) {
    langParams = options || {};
    if (isFunction(crit)) {
      return crit;
    }
    if (isGroupCriterion(crit)) {
      return compileGroup(crit);
    }
    if (isUnaryOperation(crit)) {
      return (function(crit2) {
        const op = crit2[0];
        const criteria = compileCriteria(crit2[1], langParams);
        if ("!" === op) {
          return function(obj) {
            return !criteria(obj);
          };
        }
        throw errors.Error("E4003", op);
      })(crit);
    }
    return (function(crit2) {
      crit2 = normalizeBinaryCriterion(crit2);
      const getter = compileGetter(crit2[0]);
      const op = crit2[1];
      let value = crit2[2];
      value = _toComparable(value);
      const compare = (obj, operatorFn) => {
        obj = _toComparable(getter(obj));
        return (null == value || null == obj) && value !== obj ? false : operatorFn(obj, value);
      };
      switch (op.toLowerCase()) {
        case "=":
          return compileEquals(getter, value);
        case "<>":
          return compileEquals(getter, value, true);
        case ">":
          return (obj) => compare(obj, ((a, b) => a > b));
        case "<":
          return (obj) => compare(obj, ((a, b) => a < b));
        case ">=":
          return (obj) => compare(obj, ((a, b) => a >= b));
        case "<=":
          return (obj) => compare(obj, ((a, b) => a <= b));
        case "startswith":
          return (obj) => _toComparable(toString(getter(obj))).startsWith(value);
        case "endswith":
          return (obj) => _toComparable(toString(getter(obj))).endsWith(value);
        case "contains":
          return (obj) => _toComparable(toString(getter(obj))).includes(value);
        case "notcontains":
          return (obj) => !_toComparable(toString(getter(obj))).includes(value);
      }
      throw errors.Error("E4003", op);
    })(crit);
  };
})();
var FilterIterator = WrappedIterator.inherit({
  ctor(iter, criteria) {
    this.callBase(iter);
    this.langParams = iter.langParams;
    this.criteria = compileCriteria(criteria, this.langParams);
  },
  next() {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var GroupIterator = Iterator.inherit({
  ctor(iter, getter) {
    this.iter = iter;
    this.getter = getter;
  },
  next() {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current() {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset() {
    delete this.groupedIter;
  },
  countable() {
    return !!this.groupedIter;
  },
  count() {
    return this.groupedIter.count();
  },
  _ensureGrouped() {
    if (this.groupedIter) {
      return;
    }
    const hash = {};
    const keys = [];
    const {
      iter
    } = this;
    const getter = compileGetter(this.getter);
    iter.reset();
    while (iter.next()) {
      const current = iter.current();
      const key = getter(current);
      if (key in hash) {
        hash[key].push(current);
      } else {
        hash[key] = [current];
        keys.push(key);
      }
    }
    this.groupedIter = new ArrayIterator(map(keys, ((key) => ({
      key,
      items: hash[key]
    }))));
  }
});
var SelectIterator = WrappedIterator.inherit({
  ctor(iter, getter) {
    this.callBase(iter);
    this.getter = compileGetter(getter);
  },
  current() {
    return this.getter(this.callBase());
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return this.iter.count();
  }
});
var SliceIterator = WrappedIterator.inherit({
  ctor(iter, skip, take) {
    this.callBase(iter);
    this.skip = Math.max(0, skip);
    this.take = Math.max(0, take);
    this.pos = 0;
  },
  next() {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset() {
    this.callBase();
    this.pos = 0;
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var arrayQueryImpl = function(iter, queryOptions) {
  queryOptions = queryOptions || {};
  if (!(iter instanceof Iterator)) {
    iter = new ArrayIterator(iter);
  }
  if (queryOptions.langParams) {
    iter.langParams = queryOptions.langParams;
  }
  const handleError2 = function(error) {
    const handler = queryOptions.errorHandler;
    if (handler) {
      handler(error);
    }
    handleError(error);
  };
  const aggregateCore = function(aggregator) {
    const d = new Deferred().fail(handleError2);
    let seed;
    const {
      step
    } = aggregator;
    const {
      finalize
    } = aggregator;
    try {
      iter.reset();
      if ("seed" in aggregator) {
        seed = aggregator.seed;
      } else {
        seed = iter.next() ? iter.current() : NaN;
      }
      let accumulator = seed;
      while (iter.next()) {
        accumulator = step(accumulator, iter.current());
      }
      d.resolve(finalize ? finalize(accumulator) : accumulator);
    } catch (x) {
      d.reject(x);
    }
    return d.promise();
  };
  const standardAggregate = function(name2) {
    return aggregateCore(aggregators[name2]);
  };
  const select = function(getter) {
    if (!isFunction(getter) && !Array.isArray(getter)) {
      getter = [].slice.call(arguments);
    }
    return chainQuery(new SelectIterator(iter, getter));
  };
  const selectProp = function(name2) {
    return select(compileGetter(name2));
  };
  function chainQuery(iter2) {
    return arrayQueryImpl(iter2, queryOptions);
  }
  return {
    toArray: () => iter.toArray(),
    enumerate() {
      const d = new Deferred().fail(handleError2);
      try {
        d.resolve(iter.toArray());
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    },
    setLangParams(options) {
      iter.langParams = options;
    },
    sortBy: (getter, desc, compare) => chainQuery(new SortIterator(iter, getter, desc, compare)),
    thenBy(getter, desc, compare) {
      if (iter instanceof SortIterator) {
        return chainQuery(iter.thenBy(getter, desc, compare));
      }
      throw errors.Error("E4004");
    },
    filter(criteria) {
      if (!Array.isArray(criteria)) {
        criteria = [].slice.call(arguments);
      }
      return chainQuery(new FilterIterator(iter, criteria));
    },
    slice(skip, take) {
      if (void 0 === take) {
        take = Number.MAX_VALUE;
      }
      return chainQuery(new SliceIterator(iter, skip, take));
    },
    select,
    groupBy: (getter) => chainQuery(new GroupIterator(iter, getter)),
    aggregate: function(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed,
        step,
        finalize
      });
    },
    count() {
      if (iter.countable()) {
        const d = new Deferred().fail(handleError2);
        try {
          d.resolve(iter.count());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      }
      return standardAggregate("count");
    },
    sum(getter) {
      if (getter) {
        return selectProp(getter).sum();
      }
      return standardAggregate("sum");
    },
    min(getter) {
      if (getter) {
        return selectProp(getter).min();
      }
      return standardAggregate("min");
    },
    max(getter) {
      if (getter) {
        return selectProp(getter).max();
      }
      return standardAggregate("max");
    },
    avg(getter) {
      if (getter) {
        return selectProp(getter).avg();
      }
      return standardAggregate("avg");
    }
  };
};
var m_array_query_default = arrayQueryImpl;

// node_modules/devextreme/esm/__internal/data/m_array_utils.js
function hasKey(target, keyOrKeys) {
  let key;
  const keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
  while (keys.length) {
    key = keys.shift();
    if (key in target) {
      return true;
    }
  }
  return false;
}
function findItems(keyInfo, items, key, groupCount) {
  let childItems;
  let result;
  if (groupCount) {
    for (let i = 0; i < items.length; i++) {
      childItems = items[i].items || items[i].collapsedItems || [];
      result = findItems(keyInfo, childItems || [], key, groupCount - 1);
      if (result) {
        return result;
      }
    }
  } else if (indexByKey(keyInfo, items, key) >= 0) {
    return items;
  }
}
function getItems(keyInfo, items, key, groupCount) {
  if (groupCount) {
    return findItems(keyInfo, items, key, groupCount) || [];
  }
  return items;
}
function generateDataByKeyMap(keyInfo, array) {
  if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
    const dataByKeyMap = {};
    const arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
      dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i];
    }
    array._dataByKeyMap = dataByKeyMap;
    array._dataByKeyMapLength = arrayLength;
  }
}
function getCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
}
function getHasKeyCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
  return true;
}
function setDataByKeyMapValue(array, key, data) {
  if (array._dataByKeyMap) {
    array._dataByKeyMap[JSON.stringify(key)] = data;
    array._dataByKeyMapLength += data ? 1 : -1;
  }
}
function cloneInstanceWithChangedPaths(instance, changes, clonedInstances) {
  clonedInstances = clonedInstances || /* @__PURE__ */ new WeakMap();
  const result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
  if (instance) {
    clonedInstances.set(instance, result);
  }
  const instanceWithoutPrototype = _extends({}, instance);
  deepExtendArraySafe(result, instanceWithoutPrototype, true, true, true);
  for (const name2 in instanceWithoutPrototype) {
    const value = instanceWithoutPrototype[name2];
    const change = null === changes || void 0 === changes ? void 0 : changes[name2];
    if (isObject(value) && !isPlainObject(value) && isObject(change) && !clonedInstances.has(value)) {
      result[name2] = cloneInstanceWithChangedPaths(value, change, clonedInstances);
    }
  }
  for (const name2 in result) {
    const prop = result[name2];
    if (isObject(prop) && clonedInstances.has(prop)) {
      result[name2] = clonedInstances.get(prop);
    }
  }
  return result;
}
function createObjectWithChanges(target, changes) {
  const result = cloneInstanceWithChangedPaths(target, changes);
  return deepExtendArraySafe(result, changes, true, true, true);
}
function applyBatch(_ref) {
  let {
    keyInfo,
    data,
    changes,
    groupCount,
    useInsertIndex,
    immutable,
    disableCache,
    logError,
    skipCopying
  } = _ref;
  const resultItems = true === immutable ? [...data] : data;
  changes.forEach(((item) => {
    const items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
    !disableCache && generateDataByKeyMap(keyInfo, items);
    switch (item.type) {
      case "update":
        update(keyInfo, items, item.key, item.data, true, immutable, logError);
        break;
      case "insert":
        insert(keyInfo, items, item.data, useInsertIndex && isDefined(item.index) ? item.index : -1, true, logError, skipCopying);
        break;
      case "remove":
        remove(keyInfo, items, item.key, true, logError);
    }
  }));
  return resultItems;
}
function getErrorResult(isBatch, logError, errorCode) {
  return !isBatch ? rejectedPromise(errors.Error(errorCode)) : logError && errors.log(errorCode);
}
function applyChanges(data, changes) {
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  const {
    keyExpr = "id",
    immutable = true
  } = options;
  const keyGetter = compileGetter(keyExpr);
  const keyInfo = {
    key: () => keyExpr,
    keyOf: (obj) => keyGetter(obj)
  };
  return applyBatch({
    keyInfo,
    data,
    changes,
    immutable,
    disableCache: true,
    logError: true
  });
}
function update(keyInfo, array, key, data, isBatch, immutable, logError) {
  let target;
  const keyExpr = keyInfo.key();
  if (keyExpr) {
    if (hasKey(data, keyExpr) && !keysEqual(keyExpr, key, keyInfo.keyOf(data))) {
      return getErrorResult(isBatch, logError, "E4017");
    }
    target = getCacheValue(array, key);
    if (!target) {
      const index = indexByKey(keyInfo, array, key);
      if (index < 0) {
        return getErrorResult(isBatch, logError, "E4009");
      }
      target = array[index];
      if (true === immutable && isDefined(target)) {
        const newTarget = createObjectWithChanges(target, data);
        array[index] = newTarget;
        return !isBatch && trivialPromise(newTarget, key);
      }
    }
  } else {
    target = key;
  }
  deepExtendArraySafe(target, data, true, false, true, true);
  if (!isBatch) {
    if (config_default().useLegacyStoreResult) {
      return trivialPromise(key, data);
    }
    return trivialPromise(target, key);
  }
}
function insert(keyInfo, array, data, index, isBatch, logError, skipCopying) {
  let keyValue;
  const keyExpr = keyInfo.key();
  const obj = isPlainObject(data) && !skipCopying ? extend({}, data) : data;
  if (keyExpr) {
    keyValue = keyInfo.keyOf(obj);
    if (void 0 === keyValue || "object" === typeof keyValue && isEmptyObject(keyValue)) {
      if (Array.isArray(keyExpr)) {
        throw errors.Error("E4007");
      }
      keyValue = obj[keyExpr] = String(new guid_default());
    } else if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
      return getErrorResult(isBatch, logError, "E4008");
    }
  } else {
    keyValue = obj;
  }
  if (index >= 0) {
    array.splice(index, 0, obj);
  } else {
    array.push(obj);
  }
  setDataByKeyMapValue(array, keyValue, obj);
  if (!isBatch) {
    return trivialPromise(config_default().useLegacyStoreResult ? data : obj, keyValue);
  }
}
function remove(keyInfo, array, key, isBatch, logError) {
  const index = indexByKey(keyInfo, array, key);
  if (index > -1) {
    array.splice(index, 1);
    setDataByKeyMapValue(array, key, null);
  }
  if (!isBatch) {
    return trivialPromise(key);
  }
  if (index < 0) {
    return getErrorResult(isBatch, logError, "E4009");
  }
}
function indexByKey(keyInfo, array, key) {
  const keyExpr = keyInfo.key();
  if (!getHasKeyCacheValue(array, key)) {
    return -1;
  }
  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    if (keysEqual(keyExpr, keyInfo.keyOf(array[i]), key)) {
      return i;
    }
  }
  return -1;
}

// node_modules/devextreme/esm/__internal/data/m_store_helper.js
function multiLevelGroup(query2, groupInfo) {
  query2 = query2.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query2 = query2.select(((g) => extend({}, g, {
      items: multiLevelGroup(m_array_query_default(g.items), groupInfo.slice(1)).toArray()
    })));
  }
  return query2;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  const filteredGroup = [];
  each(groupInfo, ((_, group) => {
    const collision = grep(sortInfo, ((sort) => group.selector === sort.selector));
    if (collision.length < 1) {
      filteredGroup.push(group);
    }
  }));
  return filteredGroup.concat(sortInfo);
}
function queryByOptions(query2, options, isCountQuery) {
  var _options;
  options = options || {};
  const {
    filter
  } = options;
  if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
    var _query$setLangParams, _query;
    null === (_query$setLangParams = (_query = query2).setLangParams) || void 0 === _query$setLangParams || _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query2 = query2.filter(filter);
  }
  if (isCountQuery) {
    return query2;
  }
  let {
    sort
  } = options;
  const {
    select
  } = options;
  let {
    group
  } = options;
  const {
    skip
  } = options;
  const {
    take
  } = options;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, (function(index) {
      query2 = query2[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
    }));
  }
  if (select) {
    query2 = query2.select(select);
  }
  if (group) {
    query2 = multiLevelGroup(query2, group);
  }
  if (take || skip) {
    query2 = query2.slice(skip || 0, take);
  }
  return query2;
}
var m_store_helper_default = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};

// node_modules/devextreme/esm/__internal/data/m_abstract_store.js
var {
  abstract
} = class_default;
var {
  queryByOptions: queryByOptions2
} = m_store_helper_default;
var storeImpl = {};
var Store = class_default.inherit({
  _langParams: {},
  ctor(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], ((_, optionName) => {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    }));
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: noop,
  _customLoadOptions: () => null,
  key() {
    return this._key;
  },
  keyOf(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }
    return this._keyGetter(obj);
  },
  _requireKey() {
    if (!this.key()) {
      throw errors.Error("E4005");
    }
  },
  load(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy.fireEvent("loading", [options]);
    return this._withLock(this._loadImpl(options)).done(((result) => {
      that._eventsStrategy.fireEvent("loaded", [result, options]);
    }));
  },
  _loadImpl(options) {
    if (!isEmptyObject(this._langParams)) {
      options = options || {};
      options._langParams = _extends({}, this._langParams, options._langParams);
    }
    return queryByOptions2(this.createQuery(options), options).enumerate();
  },
  _withLock(task) {
    const result = new Deferred();
    task.done((function() {
      const that = this;
      const args = arguments;
      processRequestResultLock.promise().done((() => {
        result.resolveWith(that, args);
      }));
    })).fail((function() {
      result.rejectWith(this, arguments);
    }));
    return result;
  },
  createQuery: abstract,
  totalCount(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl(options) {
    return queryByOptions2(this.createQuery(options), options, true).count();
  },
  byKey(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract,
  insert(values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("inserting", [values]);
    return that._addFailHandlers(that._insertImpl(values).done(((callbackValues, callbackKey) => {
      that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    })));
  },
  _insertImpl: abstract,
  update(key, values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("updating", [key, values]);
    return that._addFailHandlers(that._updateImpl(key, values).done((() => {
      that._eventsStrategy.fireEvent("updated", [key, values]);
      that._eventsStrategy.fireEvent("modified");
    })));
  },
  _updateImpl: abstract,
  push(changes) {
    const beforePushArgs = {
      changes,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePushAggregation", [beforePushArgs]);
    when(...beforePushArgs.waitFor).done((() => {
      this._pushImpl(changes);
      this._eventsStrategy.fireEvent("beforePush", [{
        changes
      }]);
      this._eventsStrategy.fireEvent("push", [changes]);
    }));
  },
  _pushImpl: noop,
  remove(key) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("removing", [key]);
    return that._addFailHandlers(that._removeImpl(key).done(((callbackKey) => {
      that._eventsStrategy.fireEvent("removed", [callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    })));
  },
  _removeImpl: abstract,
  _addFailHandlers(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
Store.create = function(alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error("E4020", alias);
  }
  return new storeImpl[alias](options);
};
Store.registerClass = function(type, alias) {
  if (alias) {
    storeImpl[alias] = type;
  }
  return type;
};
Store.inherit = /* @__PURE__ */ (function(inheritor) {
  return function(members, alias) {
    const type = inheritor.apply(this, [members]);
    Store.registerClass(type, alias);
    return type;
  };
})(Store.inherit);
var m_abstract_store_default = Store;

// node_modules/devextreme/esm/__internal/data/m_custom_store.js
var TOTAL_COUNT = "totalCount";
var LOAD = "load";
var BY_KEY = "byKey";
var INSERT = "insert";
var UPDATE = "update";
var REMOVE = "remove";
function isPromise2(obj) {
  return obj && isFunction(obj.then);
}
function trivialPromise2(value) {
  return new Deferred().resolve(value).promise();
}
function ensureRequiredFuncOption(name2, obj) {
  if (!isFunction(obj)) {
    throw errors.Error("E4011", name2);
  }
}
function throwInvalidUserFuncResult(name2) {
  throw errors.Error("E4012", name2);
}
function createUserFuncFailureHandler(pendingDeferred) {
  return function(arg) {
    let error;
    if (arg instanceof Error) {
      error = arg;
    } else {
      error = new Error((function(promiseArguments) {
        const xhr = promiseArguments[0];
        const textStatus = promiseArguments[1];
        if (!xhr || !xhr.getResponseHeader) {
          return null;
        }
        return errorMessageFromXhr(xhr, textStatus);
      })(arguments) || arg && String(arg) || "Unknown error");
    }
    if (error.message !== XHR_ERROR_UNLOAD) {
      pendingDeferred.reject(error);
    }
  };
}
function invokeUserLoad(store, options) {
  const userFunc = store._loadFunc;
  let userResult;
  ensureRequiredFuncOption(LOAD, userFunc);
  userResult = userFunc.apply(store, [options]);
  if (Array.isArray(userResult)) {
    userResult = trivialPromise2(userResult);
  } else if (null === userResult || void 0 === userResult) {
    userResult = trivialPromise2([]);
  } else if (!isPromise2(userResult)) {
    throwInvalidUserFuncResult(LOAD);
  }
  return fromPromise(userResult);
}
function invokeUserTotalCountFunc(store, options) {
  const userFunc = store._totalCountFunc;
  let userResult;
  if (!isFunction(userFunc)) {
    throw errors.Error("E4021");
  }
  userResult = userFunc.apply(store, [options]);
  if (!isPromise2(userResult)) {
    userResult = Number(userResult);
    if (!isFinite(userResult)) {
      throwInvalidUserFuncResult(TOTAL_COUNT);
    }
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function invokeUserByKeyFunc(store, key, extraOptions) {
  const userFunc = store._byKeyFunc;
  let userResult;
  ensureRequiredFuncOption(BY_KEY, userFunc);
  userResult = userFunc.apply(store, [key, extraOptions]);
  if (!isPromise2(userResult)) {
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
  if (store.__rawData) {
    continuation(store.__rawData);
  } else {
    const loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
    if (store._cacheRawData) {
      store.__rawDataPromise = loadPromise;
    }
    loadPromise.always((() => {
      delete store.__rawDataPromise;
    })).done(((rawData) => {
      if (store._cacheRawData) {
        store.__rawData = rawData;
      }
      continuation(rawData);
    })).fail(((error) => {
      var _store$_errorHandler;
      const userFuncFailureHandler = createUserFuncFailureHandler(pendingDeferred);
      null === (_store$_errorHandler = store._errorHandler) || void 0 === _store$_errorHandler || _store$_errorHandler.call(store, error);
      userFuncFailureHandler(error);
    }));
  }
}
function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
  options = options || {};
  const userFuncOptions = {};
  if ("userData" in options) {
    userFuncOptions.userData = options.userData;
  }
  runRawLoad(pendingDeferred, store, userFuncOptions, ((rawData) => {
    const rawDataQuery = m_array_query_default(rawData, {
      errorHandler: store._errorHandler
    });
    let itemsQuery;
    let totalCountQuery;
    const waitList = [];
    let items;
    let totalCount;
    if (!countOnly) {
      itemsQuery = m_store_helper_default.queryByOptions(rawDataQuery, options);
      if (itemsQuery === rawDataQuery) {
        items = rawData.slice(0);
      } else {
        waitList.push(itemsQuery.enumerate().done(((asyncResult) => {
          items = asyncResult;
        })));
      }
    }
    if (options.requireTotalCount || countOnly) {
      totalCountQuery = m_store_helper_default.queryByOptions(rawDataQuery, options, true);
      if (totalCountQuery === rawDataQuery) {
        totalCount = rawData.length;
      } else {
        waitList.push(totalCountQuery.count().done(((asyncResult) => {
          totalCount = asyncResult;
        })));
      }
    }
    when.apply(renderer_default, waitList).done((() => {
      if (countOnly) {
        pendingDeferred.resolve(totalCount);
      } else if (options.requireTotalCount) {
        pendingDeferred.resolve(items, {
          totalCount
        });
      } else {
        pendingDeferred.resolve(items);
      }
    })).fail(((x) => {
      pendingDeferred.reject(x);
    }));
  }));
}
function runRawLoadWithKey(pendingDeferred, store, key) {
  runRawLoad(pendingDeferred, store, {}, ((rawData) => {
    const keyExpr = store.key();
    let item;
    for (let i = 0, len = rawData.length; i < len; i++) {
      item = rawData[i];
      if (keysEqual(keyExpr, store.keyOf(rawData[i]), key)) {
        pendingDeferred.resolve(item);
        return;
      }
    }
    pendingDeferred.reject(errors.Error("E4009"));
  }));
}
var CustomStore = m_abstract_store_default.inherit({
  ctor(options) {
    options = options || {};
    this.callBase(options);
    this._useDefaultSearch = !!options.useDefaultSearch || "raw" === options.loadMode;
    this._loadMode = options.loadMode;
    this._cacheRawData = false !== options.cacheRawData;
    this._loadFunc = options[LOAD];
    this._totalCountFunc = options[TOTAL_COUNT];
    this._byKeyFunc = options[BY_KEY];
    this._insertFunc = options[INSERT];
    this._updateFunc = options[UPDATE];
    this._removeFunc = options[REMOVE];
  },
  _clearCache() {
    delete this.__rawData;
  },
  createQuery() {
    throw errors.Error("E4010");
  },
  clearRawDataCache() {
    this._clearCache();
  },
  _totalCountImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode && !this._totalCountFunc) {
      runRawLoadWithQuery(d, this, options, true);
    } else {
      invokeUserTotalCountFunc(this, options).done(((count) => {
        d.resolve(Number(count));
      })).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _pushImpl(changes) {
    if (this.__rawData) {
      applyBatch({
        keyInfo: this,
        data: this.__rawData,
        changes
      });
    }
  },
  _loadImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode) {
      runRawLoadWithQuery(d, this, options, false);
    } else {
      invokeUserLoad(this, options).done(((data, extra) => {
        d.resolve(data, extra);
      })).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _byKeyImpl(key, extraOptions) {
    const d = new Deferred();
    if (this._byKeyViaLoad()) {
      this._requireKey();
      runRawLoadWithKey(d, this, key);
    } else {
      invokeUserByKeyFunc(this, key, extraOptions).done(((obj) => {
        d.resolve(obj);
      })).fail(createUserFuncFailureHandler(d));
    }
    return d.promise();
  },
  _byKeyViaLoad() {
    return "raw" === this._loadMode && !this._byKeyFunc;
  },
  _insertImpl(values) {
    const that = this;
    const userFunc = that._insertFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(INSERT, userFunc);
    userResult = userFunc.apply(that, [values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done(((serverResponse) => {
      if (config_default().useLegacyStoreResult) {
        d.resolve(values, serverResponse);
      } else {
        d.resolve(serverResponse || values, that.keyOf(serverResponse));
      }
    })).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _updateImpl(key, values) {
    const userFunc = this._updateFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(UPDATE, userFunc);
    userResult = userFunc.apply(this, [key, values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done(((serverResponse) => {
      if (config_default().useLegacyStoreResult) {
        d.resolve(key, values);
      } else {
        d.resolve(serverResponse || values, key);
      }
    })).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _removeImpl(key) {
    const userFunc = this._removeFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(REMOVE, userFunc);
    userResult = userFunc.apply(this, [key]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2();
    }
    fromPromise(userResult).done((() => {
      d.resolve(key);
    })).fail(createUserFuncFailureHandler(d));
    return d.promise();
  }
});
var m_custom_store_default = CustomStore;

// node_modules/devextreme/esm/common/data/custom_store.js
function isGroupItem(item) {
  if (void 0 === item || null === item || "object" !== typeof item) {
    return false;
  }
  return "key" in item && "items" in item;
}
function isLoadResultObject(res) {
  return !Array.isArray(res) && "data" in res;
}
function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}

// node_modules/devextreme/esm/common/data/query_adapters.js
var query_adapters_default = {};

// node_modules/devextreme/esm/__internal/data/m_remote_query.js
var remoteQueryImpl = function(url, queryOptions, tasks) {
  tasks = tasks || [];
  queryOptions = queryOptions || {};
  const createTask = function(name2, args) {
    return {
      name: name2,
      args
    };
  };
  const exec = function(executorTask) {
    const d = new Deferred();
    let _adapterFactory;
    let _adapter;
    let _taskQueue;
    let _currentTask;
    let _mergedSortArgs;
    const rejectWithNotify = function(error) {
      const handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      handleError(error);
      d.reject(error);
    };
    function mergeSortTask(task) {
      switch (task.name) {
        case "sortBy":
          _mergedSortArgs = [task.args];
          return true;
        case "thenBy":
          if (!_mergedSortArgs) {
            throw errors.Error("E4004");
          }
          _mergedSortArgs.push(task.args);
          return true;
      }
      return false;
    }
    try {
      _adapterFactory = queryOptions.adapter;
      if (!isFunction(_adapterFactory)) {
        _adapterFactory = query_adapters_default[_adapterFactory];
      }
      _adapter = _adapterFactory(queryOptions);
      _taskQueue = [].concat(tasks).concat(executorTask);
      const {
        optimize
      } = _adapter;
      if (optimize) {
        optimize(_taskQueue);
      }
      while (_taskQueue.length) {
        _currentTask = _taskQueue[0];
        if (!mergeSortTask(_currentTask)) {
          if (_mergedSortArgs) {
            _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
            _mergedSortArgs = null;
            continue;
          }
          if ("enumerate" !== String(_currentTask.name)) {
            if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
              break;
            }
          }
        }
        _taskQueue.shift();
      }
      !(function() {
        const head = _taskQueue[0];
        const unmergedTasks = [];
        if (head && "multiSort" === head.name) {
          _taskQueue.shift();
          each(head.args[0], (function() {
            unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this));
          }));
        }
        _taskQueue = unmergedTasks.concat(_taskQueue);
      })();
      _adapter.exec(url).done(((result, extra) => {
        if (!_taskQueue.length) {
          d.resolve(result, extra);
        } else {
          let clientChain = m_array_query_default(result, {
            errorHandler: queryOptions.errorHandler
          });
          each(_taskQueue, (function() {
            clientChain = clientChain[this.name].apply(clientChain, this.args);
          }));
          clientChain.done(d.resolve).fail(d.reject);
        }
      })).fail(rejectWithNotify);
    } catch (x) {
      rejectWithNotify(x);
    }
    return d.promise();
  };
  const query2 = {};
  each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], (function() {
    const name2 = String(this);
    query2[name2] = function() {
      return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name2, arguments)));
    };
  }));
  each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], (function() {
    const name2 = String(this);
    query2[name2] = function() {
      return exec.call(this, createTask(name2, arguments));
    };
  }));
  return query2;
};
var m_remote_query_default = remoteQueryImpl;

// node_modules/devextreme/esm/common/data/query_implementation.js
var queryImpl = {
  array: m_array_query_default,
  remote: m_remote_query_default
};

// node_modules/devextreme/esm/__internal/data/m_query.js
var query = function() {
  const impl = Array.isArray(arguments[0]) ? "array" : "remote";
  return queryImpl[impl].apply(this, arguments);
};
var m_query_default = query;

// node_modules/devextreme/esm/__internal/data/m_array_store.js
var ArrayStore = m_abstract_store_default.inherit({
  ctor(options) {
    if (Array.isArray(options)) {
      options = {
        data: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw errors.Error("E4006");
    }
    this._array = initialArray || [];
  },
  createQuery() {
    return m_query_default(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl(key) {
    const index = indexByKey(this, this._array, key);
    if (-1 === index) {
      return rejectedPromise(errors.Error("E4009"));
    }
    return trivialPromise(this._array[index]);
  },
  _insertImpl(values) {
    return insert(this, this._array, values);
  },
  _pushImpl(changes) {
    applyBatch({
      keyInfo: this,
      data: this._array,
      changes
    });
  },
  _updateImpl(key, values) {
    return update(this, this._array, key, values);
  },
  _removeImpl(key) {
    return remove(this, this._array, key);
  },
  clear() {
    this._eventsStrategy.fireEvent("modifying");
    this._array = [];
    this._eventsStrategy.fireEvent("modified");
  }
}, "array");
var m_array_store_default = ArrayStore;

// node_modules/devextreme/esm/__internal/data/data_source/m_utils.js
var _excluded = ["items"];
var CANCELED_TOKEN = "canceled";
var isPending = (deferred) => "pending" === deferred.state();
var normalizeStoreLoadOptionAccessorArguments = (originalArguments) => {
  switch (originalArguments.length) {
    case 0:
      return;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
var mapGroup = (group, level, mapper) => map(group, ((item) => {
  const restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
}));
var mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) {
    return items;
  }
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  const level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
var normalizeLoadResult = (data, extra) => {
  var _data;
  if (null !== (_data = data) && void 0 !== _data && _data.data) {
    extra = data;
    data = data.data;
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    data,
    extra
  };
};
var createCustomStoreFromLoadFunc = (options) => {
  const storeConfig = {};
  each(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], (function() {
    storeConfig[this] = options[this];
    delete options[this];
  }));
  return new m_custom_store_default(storeConfig);
};
var createStoreFromConfig = (storeConfig) => {
  const alias = storeConfig.type;
  delete storeConfig.type;
  return m_abstract_store_default.create(alias, storeConfig);
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new m_custom_store_default({
  load: () => ajax_default.sendRequest({
    url,
    dataType: "json"
  }),
  loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
var normalizeDataSourceOptions = (options, normalizationOptions) => {
  let store;
  if ("string" === typeof options) {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (void 0 === options) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof m_abstract_store_default) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (void 0 === options.store) {
    options.store = [];
  }
  store = options.store;
  if ("load" in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new m_array_store_default(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};

// node_modules/devextreme/esm/__internal/data/data_source/m_operation_manager.js
var OperationManager = class {
  constructor() {
    this._counter = -1;
    this._deferreds = {};
  }
  add(deferred) {
    this._counter++;
    this._deferreds[this._counter] = deferred;
    return this._counter;
  }
  remove(operationId) {
    return delete this._deferreds[operationId];
  }
  cancel(operationId) {
    if (operationId in this._deferreds) {
      this._deferreds[operationId].reject(CANCELED_TOKEN);
      return true;
    }
    return false;
  }
  cancelAll() {
    while (this._counter > -1) {
      this.cancel(this._counter);
      this._counter--;
    }
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_queue.js
function createQueue(discardPendingTasks) {
  let _tasks = [];
  let _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      const task = _tasks.shift();
      const result = task();
      if (void 0 === result) {
        continue;
      }
      if (result.then) {
        when(result).always(exec);
        return;
      }
      throw errors_default.Error("E0015");
    }
    _busy = false;
  }
  return {
    add: function(task, removeTaskCallback) {
      if (!discardPendingTasks) {
        _tasks.push(task);
      } else {
        if (_tasks[0] && removeTaskCallback) {
          removeTaskCallback(_tasks[0]);
        }
        _tasks = [task];
      }
      if (!_busy) {
        exec();
      }
    },
    busy: function() {
      return _busy;
    }
  };
}
var enqueue = createQueue().add;

// node_modules/devextreme/esm/__internal/data/data_source/m_data_source.js
var DataSource = class_default.inherit({
  ctor(options) {
    options = normalizeDataSourceOptions(options);
    this._eventsStrategy = new EventsStrategy(this, {
      syncStrategy: true
    });
    this._store = options.store;
    this._changedTime = 0;
    const needThrottling = 0 !== options.pushAggregationTimeout;
    if (needThrottling) {
      const throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
      let pushDeferred;
      let lastPushWaiters;
      const throttlingPushHandler = throttleChanges(((changes) => {
        pushDeferred.resolve();
        const storePushPending = when(...lastPushWaiters);
        storePushPending.done((() => this._onPush(changes)));
        lastPushWaiters = void 0;
        pushDeferred = void 0;
      }), throttlingTimeout);
      this._onPushHandler = (args) => {
        this._aggregationTimeoutId = throttlingPushHandler(args.changes);
        if (!pushDeferred) {
          pushDeferred = new Deferred();
        }
        lastPushWaiters = args.waitFor;
        args.waitFor.push(pushDeferred.promise());
      };
      this._store.on("beforePushAggregation", this._onPushHandler);
    } else {
      this._onPushHandler = (changes) => this._onPush(changes);
      this._store.on("push", this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(options);
    this._mapFunc = options.map;
    this._postProcessFunc = options.postProcess;
    this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
    this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = "searchValue" in options ? options.searchValue : null;
    this._searchOperation = options.searchOperation || "contains";
    this._searchExpr = options.searchExpr;
    this._paginate = options.paginate;
    this._reshapeOnPush = options.reshapeOnPush ?? false;
    each(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], ((_, optionName) => {
      if (optionName in options) {
        this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName]);
      }
    }));
    this._operationManager = new OperationManager();
    this._init();
  },
  _init() {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!isDefined(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose() {
    var _this$_delayedLoadTas;
    this._store.off("beforePushAggregation", this._onPushHandler);
    this._store.off("push", this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas || _this$_delayedLoadTas.abort();
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions(options) {
    const result = {};
    let names = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
    const customNames = this._store._customLoadOptions();
    if (customNames) {
      names = names.concat(customNames);
    }
    each(names, (function() {
      result[this] = options[this];
    }));
    return result;
  },
  loadOptions() {
    return this._storeLoadOptions;
  },
  items() {
    return this._items;
  },
  pageIndex(newIndex) {
    if (!isNumeric(newIndex)) {
      return this._pageIndex;
    }
    this._pageIndex = newIndex;
    this._isLastPage = !this._paginate;
  },
  paginate(value) {
    if (!isBoolean(value)) {
      return this._paginate;
    }
    if (this._paginate !== value) {
      this._paginate = value;
      this.pageIndex(0);
    }
  },
  pageSize(value) {
    if (!isNumeric(value)) {
      return this._pageSize;
    }
    this._pageSize = value;
  },
  isLastPage() {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor(optionName) {
    return (args) => {
      const normalizedArgs = normalizeStoreLoadOptionAccessorArguments(args);
      if (void 0 === normalizedArgs) {
        return this._storeLoadOptions[optionName];
      }
      this._storeLoadOptions[optionName] = normalizedArgs;
    };
  },
  sort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.generateStoreLoadOptionAccessor("sort")(args);
  },
  filter() {
    const newFilter = normalizeStoreLoadOptionAccessorArguments(arguments);
    if (void 0 === newFilter) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = newFilter;
    this.pageIndex(0);
  },
  group() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.generateStoreLoadOptionAccessor("group")(args);
  },
  select() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.generateStoreLoadOptionAccessor("select")(args);
  },
  requireTotalCount(value) {
    if (!isBoolean(value)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = value;
  },
  searchValue(value) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = value;
    this.pageIndex(0);
  },
  searchOperation(op) {
    if (!isString(op)) {
      return this._searchOperation;
    }
    this._searchOperation = op;
    this.pageIndex(0);
  },
  searchExpr(expr) {
    const argc = arguments.length;
    if (0 === argc) {
      return this._searchExpr;
    }
    if (argc > 1) {
      expr = [].slice.call(arguments);
    }
    this._searchExpr = expr;
    this.pageIndex(0);
  },
  store() {
    return this._store;
  },
  key() {
    var _this$_store;
    return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key();
  },
  totalCount() {
    return this._totalCount;
  },
  isLoaded() {
    return this._isLoaded;
  },
  isLoading() {
    return this._loadingCount > 0;
  },
  beginLoading() {
    this._changeLoadingCount(1);
  },
  endLoading() {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue: () => createQueue(),
  _changeLoadingCount(increment) {
    const oldLoading = this.isLoading();
    this._loadingCount += increment;
    const newLoading = this.isLoading();
    if (oldLoading ^ newLoading) {
      this._eventsStrategy.fireEvent("loadingChanged", [newLoading]);
    }
  },
  _scheduleLoadCallbacks(deferred) {
    this.beginLoading();
    deferred.always((() => {
      this.endLoading();
    }));
  },
  _scheduleFailCallbacks(deferred) {
    var _this = this;
    deferred.fail((function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args[0] === CANCELED_TOKEN) {
        return;
      }
      _this._eventsStrategy.fireEvent("loadError", args);
    }));
  },
  _fireChanged(args) {
    const date = /* @__PURE__ */ new Date();
    this._eventsStrategy.fireEvent("changed", args);
    this._changedTime = /* @__PURE__ */ new Date() - date;
  },
  _scheduleChangedCallbacks(deferred) {
    deferred.done((() => this._fireChanged()));
  },
  loadSingle(propName, propValue) {
    const d = new Deferred();
    const key = this.key();
    const store = this._store;
    const options = this._createStoreLoadOptions();
    this._scheduleFailCallbacks(d);
    if (arguments.length < 2) {
      propValue = propName;
      propName = key;
    }
    delete options.skip;
    delete options.group;
    delete options.refresh;
    delete options.pageIndex;
    delete options.searchString;
    (() => {
      if (propName === key || store instanceof m_custom_store_default && !store._byKeyViaLoad()) {
        return store.byKey(propValue, options);
      }
      options.take = 1;
      options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
      return store.load(options);
    })().fail(d.reject).done(((data) => {
      const isEmptyArray = Array.isArray(data) && !data.length;
      if (!isDefined(data) || isEmptyArray) {
        d.reject(errors.Error("E4009"));
      } else {
        if (!Array.isArray(data)) {
          data = [data];
        }
        d.resolve(this._applyMapFunction(data)[0]);
      }
    }));
    return d.promise();
  },
  load() {
    const d = new Deferred();
    const loadTask = () => {
      if (this._disposed) {
        return;
      }
      if (!isPending(d)) {
        return;
      }
      return this._loadFromStore(loadOperation, d);
    };
    this._scheduleLoadCallbacks(d);
    this._scheduleFailCallbacks(d);
    this._scheduleChangedCallbacks(d);
    const loadOperation = this._createLoadOperation(d);
    this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
    this._loadQueue.add((() => {
      if ("number" === typeof loadOperation.delay) {
        this._delayedLoadTask = m_common_default.executeAsync(loadTask, loadOperation.delay);
      } else {
        loadTask();
      }
      return d.promise();
    }));
    return d.promise({
      operationId: loadOperation.operationId
    });
  },
  _onPush(changes) {
    if (this._reshapeOnPush) {
      this.load();
    } else {
      const changingArgs = {
        changes
      };
      this._eventsStrategy.fireEvent("changing", [changingArgs]);
      const group = this.group();
      const items = this.items();
      let groupLevel = 0;
      let dataSourceChanges = this.paginate() || group ? changes.filter(((item) => "update" === item.type)) : changes;
      if (group) {
        groupLevel = Array.isArray(group) ? group.length : 1;
      }
      if (this._mapFunc) {
        dataSourceChanges.forEach(((item) => {
          if ("insert" === item.type) {
            item.data = this._mapFunc(item.data);
          }
        }));
      }
      if (changingArgs.postProcessChanges) {
        dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges);
      }
      applyBatch({
        keyInfo: this.store(),
        data: items,
        changes: dataSourceChanges,
        groupCount: groupLevel,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes
      }]);
    }
  },
  _createLoadOperation(deferred) {
    const operationId = this._operationManager.add(deferred);
    const storeLoadOptions = this._createStoreLoadOptions();
    if (this._store && !isEmptyObject(null === storeLoadOptions || void 0 === storeLoadOptions ? void 0 : storeLoadOptions.langParams)) {
      this._store._langParams = _extends({}, this._store._langParams, storeLoadOptions.langParams);
    }
    deferred.always((() => this._operationManager.remove(operationId)));
    return {
      operationId,
      storeLoadOptions
    };
  },
  reload() {
    const store = this.store();
    store._clearCache();
    this._init();
    return this.load();
  },
  cancel(operationId) {
    return this._operationManager.cancel(operationId);
  },
  cancelAll() {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions(storeLoadOptions) {
    if (this._disposed) {
      return;
    }
    if (this.store()._useDefaultSearch) {
      this._addSearchFilter(storeLoadOptions);
    } else {
      storeLoadOptions.searchOperation = this._searchOperation;
      storeLoadOptions.searchValue = this._searchValue;
      storeLoadOptions.searchExpr = this._searchExpr;
    }
  },
  _createStoreLoadOptions() {
    const result = extend({}, this._storeLoadOptions);
    this._addSearchOptions(result);
    if (this._paginate) {
      if (this._pageSize) {
        result.skip = this._pageIndex * this._pageSize;
        result.take = this._pageSize;
      }
    }
    result.userData = this._userData;
    return result;
  },
  _addSearchFilter(storeLoadOptions) {
    const value = this._searchValue;
    const op = this._searchOperation;
    let selector = this._searchExpr;
    const searchFilter = [];
    if (!value) {
      return;
    }
    if (!selector) {
      selector = "this";
    }
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    each(selector, ((i, item) => {
      if (searchFilter.length) {
        searchFilter.push("or");
      }
      searchFilter.push([item, op, value]);
    }));
    if (storeLoadOptions.filter) {
      storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
    } else {
      storeLoadOptions.filter = searchFilter;
    }
  },
  _loadFromStore(loadOptions, pendingDeferred) {
    const handleSuccess = (data, extra) => {
      if (this._disposed) {
        return;
      }
      if (!isPending(pendingDeferred)) {
        return;
      }
      const loadResult = extend(normalizeLoadResult(data, extra), loadOptions);
      this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
      when(loadResult.data).done(((data2) => {
        loadResult.data = data2;
        this._processStoreLoadResult(loadResult, pendingDeferred);
      })).fail(pendingDeferred.reject);
    };
    if (loadOptions.data) {
      return new Deferred().resolve(loadOptions.data).done(handleSuccess);
    }
    return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject);
  },
  _processStoreLoadResult(loadResult, pendingDeferred) {
    let {
      data
    } = loadResult;
    let {
      extra
    } = loadResult;
    const {
      storeLoadOptions
    } = loadResult;
    const resolvePendingDeferred = () => {
      this._isLoaded = true;
      this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
      return pendingDeferred.resolve(data, extra);
    };
    const proceedLoadingTotalCount = () => {
      this.store().totalCount(storeLoadOptions).done(((count) => {
        extra.totalCount = count;
        resolvePendingDeferred();
      })).fail(pendingDeferred.reject);
    };
    if (this._disposed) {
      return;
    }
    data = this._applyPostProcessFunction(this._applyMapFunction(data));
    if (!isObject(extra)) {
      extra = {};
    }
    this._items = data;
    if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
      this._isLastPage = true;
    }
    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
      proceedLoadingTotalCount();
    } else {
      resolvePendingDeferred();
    }
  },
  _applyMapFunction(data) {
    if (this._mapFunc) {
      return mapDataRespectingGrouping(data, this._mapFunc, this.group());
    }
    return data;
  },
  _applyPostProcessFunction(data) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(data);
    }
    return data;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});

// node_modules/devextreme/esm/__internal/ui/collection/m_data_controller.js
var DataControllerMock = {
  load: () => Deferred().reject(),
  loadSingle: () => Deferred().reject(),
  loadFromStore: () => Deferred().reject(),
  loadNextPage: () => Deferred().reject(),
  loadOptions: noop,
  userData: noop,
  cancel: noop,
  cancelAll: noop,
  filter: noop,
  addSearchFilter: noop,
  group: noop,
  paginate: noop,
  pageSize: noop,
  pageIndex: noop,
  resetDataSourcePageIndex: noop,
  totalCount: noop,
  isLastPage: noop,
  isLoading: noop,
  isLoaded: noop,
  searchValue: noop,
  searchOperation: noop,
  searchExpr: noop,
  select: noop,
  key: noop,
  keyOf: noop,
  store: noop,
  items: noop,
  applyMapFunction: noop,
  getDataSource: noop,
  reload: noop,
  on: noop,
  off: noop
};
var DataController = class {
  constructor(dataSource) {
    if (!dataSource) {
      return DataControllerMock;
    }
    this._dataSource = dataSource;
  }
  load() {
    return this._dataSource.load();
  }
  loadSingle(propName, propValue) {
    if (arguments.length < 2) {
      propValue = propName;
      propName = this.key();
    }
    return this._dataSource.loadSingle(propName, propValue);
  }
  loadFromStore(loadOptions) {
    return this.store().load(loadOptions);
  }
  loadNextPage() {
    this.pageIndex(1 + this.pageIndex());
    return this.load();
  }
  loadOptions() {
    return this._dataSource.loadOptions();
  }
  userData() {
    return this._dataSource._userData;
  }
  cancel(operationId) {
    this._dataSource.cancel(operationId);
  }
  cancelAll() {
    this._dataSource.cancelAll();
  }
  filter(filter) {
    return this._dataSource.filter(filter);
  }
  addSearchFilter(storeLoadOptions) {
    this._dataSource._addSearchFilter(storeLoadOptions);
  }
  group(group) {
    return this._dataSource.group(group);
  }
  paginate() {
    return this._dataSource.paginate();
  }
  pageSize() {
    return this._dataSource._pageSize;
  }
  pageIndex(pageIndex) {
    return this._dataSource.pageIndex(pageIndex);
  }
  resetDataSourcePageIndex() {
    if (this.pageIndex()) {
      this.pageIndex(0);
      this.load();
    }
  }
  totalCount() {
    return this._dataSource.totalCount();
  }
  isLastPage() {
    return this._dataSource.isLastPage() || !this._dataSource._pageSize;
  }
  isLoading() {
    return this._dataSource.isLoading();
  }
  isLoaded() {
    return this._dataSource.isLoaded();
  }
  searchValue(value) {
    if (!arguments.length) {
      return this._dataSource.searchValue();
    }
    return this._dataSource.searchValue(value);
  }
  searchOperation(operation) {
    return this._dataSource.searchOperation(operation);
  }
  searchExpr(expr) {
    if (!arguments.length) {
      return this._dataSource.searchExpr();
    }
    return this._dataSource.searchExpr(expr);
  }
  select() {
    return this._dataSource.select(...arguments);
  }
  key() {
    return this._dataSource.key();
  }
  keyOf(item) {
    return this.store().keyOf(item);
  }
  store() {
    return this._dataSource.store();
  }
  items() {
    return this._dataSource.items();
  }
  applyMapFunction(data) {
    return this._dataSource._applyMapFunction(data);
  }
  getDataSource() {
    return this._dataSource || null;
  }
  reload() {
    return this._dataSource.reload();
  }
  on(event, handler) {
    this._dataSource.on(event, handler);
  }
  off(event, handler) {
    this._dataSource.off(event, handler);
  }
};
var m_data_controller_default = DataController;

// node_modules/devextreme/esm/__internal/data/m_data_helper.js
var DATA_SOURCE_CHANGED_METHOD = "_dataSourceChangedHandler";
var SPECIFIC_DATA_SOURCE_OPTION = "_getSpecificDataSourceOption";
var NORMALIZE_DATA_SOURCE = "_normalizeDataSource";
var DataHelperMixin = {
  postCtor() {
    this.on("disposing", (() => {
      this._disposeDataSource();
    }));
  },
  _refreshDataSource() {
    this._initDataSource();
    this._loadDataSource();
  },
  _initDataSource() {
    let dataSourceOptions = SPECIFIC_DATA_SOURCE_OPTION in this ? this[SPECIFIC_DATA_SOURCE_OPTION]() : this.option("dataSource");
    let widgetDataSourceOptions;
    let dataSourceType;
    this._disposeDataSource();
    if (dataSourceOptions) {
      if (dataSourceOptions instanceof DataSource) {
        this._isSharedDataSource = true;
        this._dataSource = dataSourceOptions;
      } else {
        widgetDataSourceOptions = "_dataSourceOptions" in this ? this._dataSourceOptions() : {};
        dataSourceType = this._dataSourceType ? this._dataSourceType() : DataSource;
        dataSourceOptions = normalizeDataSourceOptions(dataSourceOptions, {
          fromUrlLoadMode: "_dataSourceFromUrlLoadMode" in this && this._dataSourceFromUrlLoadMode()
        });
        this._dataSource = new dataSourceType(extend(true, {}, widgetDataSourceOptions, dataSourceOptions));
      }
      if (NORMALIZE_DATA_SOURCE in this) {
        this._dataSource = this[NORMALIZE_DATA_SOURCE](this._dataSource);
      }
      this._addDataSourceHandlers();
      this._initDataController();
    }
  },
  _initDataController() {
    var _this$option;
    const dataController = null === (_this$option = this.option) || void 0 === _this$option ? void 0 : _this$option.call(this, "_dataController");
    const dataSource = this._dataSource;
    if (dataController) {
      this._dataController = dataController;
    } else {
      this._dataController = new m_data_controller_default(dataSource);
    }
  },
  _addDataSourceHandlers() {
    if (DATA_SOURCE_CHANGED_METHOD in this) {
      this._addDataSourceChangeHandler();
    }
    if ("_dataSourceLoadErrorHandler" in this) {
      this._addDataSourceLoadErrorHandler();
    }
    if ("_dataSourceLoadingChangedHandler" in this) {
      this._addDataSourceLoadingChangedHandler();
    }
    this._addReadyWatcher();
  },
  _addReadyWatcher() {
    this.readyWatcher = (function(isLoading) {
      this._ready && this._ready(!isLoading);
    }).bind(this);
    this._dataSource.on("loadingChanged", this.readyWatcher);
  },
  _addDataSourceChangeHandler() {
    const dataSource = this._dataSource;
    this._proxiedDataSourceChangedHandler = (function(e) {
      this[DATA_SOURCE_CHANGED_METHOD](dataSource.items(), e);
    }).bind(this);
    dataSource.on("changed", this._proxiedDataSourceChangedHandler);
  },
  _addDataSourceLoadErrorHandler() {
    this._proxiedDataSourceLoadErrorHandler = this._dataSourceLoadErrorHandler.bind(this);
    this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler);
  },
  _addDataSourceLoadingChangedHandler() {
    this._proxiedDataSourceLoadingChangedHandler = this._dataSourceLoadingChangedHandler.bind(this);
    this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
  },
  _loadDataSource() {
    const dataSource = this._dataSource;
    if (dataSource) {
      if (dataSource.isLoaded()) {
        this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler();
      } else {
        dataSource.load();
      }
    }
  },
  _loadSingle(key, value) {
    key = "this" === key ? this._dataSource.key() || "this" : key;
    return this._dataSource.loadSingle(key, value);
  },
  _isLastPage() {
    return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize;
  },
  _isDataSourceLoading() {
    return this._dataSource && this._dataSource.isLoading();
  },
  _disposeDataSource() {
    if (this._dataSource) {
      if (this._isSharedDataSource) {
        delete this._isSharedDataSource;
        this._proxiedDataSourceChangedHandler && this._dataSource.off("changed", this._proxiedDataSourceChangedHandler);
        this._proxiedDataSourceLoadErrorHandler && this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler);
        this._proxiedDataSourceLoadingChangedHandler && this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
        if (this._dataSource._eventsStrategy) {
          this._dataSource._eventsStrategy.off("loadingChanged", this.readyWatcher);
        }
      } else {
        this._dataSource.dispose();
      }
      delete this._dataSource;
      delete this._proxiedDataSourceChangedHandler;
      delete this._proxiedDataSourceLoadErrorHandler;
      delete this._proxiedDataSourceLoadingChangedHandler;
    }
  },
  getDataSource() {
    return this._dataSource || null;
  }
};
var m_data_helper_default = DataHelperMixin;

// node_modules/devextreme/esm/__internal/events/m_hold.js
var {
  abs
} = Math;
var HoldEmitter = m_emitter_default.inherit({
  start(e) {
    this._startEventData = eventData(e);
    this._startTimer(e);
  },
  _startTimer(e) {
    const holdTimeout = "timeout" in this ? this.timeout : 750;
    this._holdTimer = setTimeout((() => {
      this._requestAccept(e);
      this._fireEvent("dxhold", e, {
        target: e.target
      });
      this._forgetAccept();
    }), holdTimeout);
  },
  move(e) {
    if (this._touchWasMoved(e)) {
      this._cancel(e);
    }
  },
  _touchWasMoved(e) {
    const delta = eventDelta(this._startEventData, eventData(e));
    return abs(delta.x) > 5 || abs(delta.y) > 5;
  },
  end() {
    this._stopTimer();
  },
  _stopTimer() {
    clearTimeout(this._holdTimer);
  },
  cancel() {
    this._stopTimer();
  },
  dispose() {
    this._stopTimer();
  }
});
m_emitter_registrator_default({
  emitter: HoldEmitter,
  bubble: true,
  events: ["dxhold"]
});
var m_hold_default = {
  name: "dxhold"
};

// node_modules/devextreme/esm/__internal/events/m_contextmenu.js
var CONTEXTMENU_NAMESPACED_EVENT_NAME = addNamespace("contextmenu", "dxContexMenu");
var HOLD_NAMESPACED_EVENT_NAME = addNamespace(m_hold_default.name, "dxContexMenu");
var ContextMenu = class_default.inherit({
  setup(element) {
    const $element = renderer_default(element);
    m_events_engine_default.on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
    if (m_support_default.touch || m_devices_default.isSimulator()) {
      m_events_engine_default.on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this));
    }
  },
  _holdHandler(e) {
    if (isMouseEvent(e) && !m_devices_default.isSimulator()) {
      return;
    }
    this._fireContextMenu(e);
  },
  _contextMenuHandler(e) {
    this._fireContextMenu(e);
  },
  _fireContextMenu: (e) => fireEvent({
    type: "dxcontextmenu",
    originalEvent: e
  }),
  teardown(element) {
    m_events_engine_default.off(element, ".dxContexMenu");
  }
});
m_event_registrator_default("dxcontextmenu", new ContextMenu());
var name = "dxcontextmenu";

// node_modules/devextreme/esm/__internal/core/m_resize_observer.js
var window = m_window_default.getWindow();
var ResizeObserverMock = {
  observe: noop,
  unobserve: noop,
  disconnect: noop
};
var ResizeObserverSingleton = class {
  constructor() {
    if (!m_window_default.hasWindow() || !window.ResizeObserver) {
      return ResizeObserverMock;
    }
    this._callbacksMap = /* @__PURE__ */ new Map();
    this._observer = new window.ResizeObserver(((entries) => {
      entries.forEach(((entry) => {
        var _this$_callbacksMap$g;
        null === (_this$_callbacksMap$g = this._callbacksMap.get(entry.target)) || void 0 === _this$_callbacksMap$g || _this$_callbacksMap$g(entry);
      }));
    }));
  }
  observe(element, callback) {
    this._callbacksMap.set(element, callback);
    this._observer.observe(element);
  }
  unobserve(element) {
    this._callbacksMap.delete(element);
    this._observer.unobserve(element);
  }
  disconnect() {
    this._callbacksMap.clear();
    this._observer.disconnect();
  }
};
var resizeObserverSingleton = new ResizeObserverSingleton();

// node_modules/devextreme/esm/core/resize_observer.js
var resize_observer_default = resizeObserverSingleton;

// node_modules/devextreme/esm/__internal/core/templates/m_bindable_template.js
var watchChanges = function(rawData, watchMethod, fields, fieldsMap, callback) {
  let fieldsDispose;
  const globalDispose = ((data, watchMethod2, callback2) => watchMethod2((() => data), callback2))(rawData, watchMethod, ((dataWithRawFields) => {
    fieldsDispose && fieldsDispose();
    if (isPrimitive(dataWithRawFields)) {
      callback(dataWithRawFields);
      return;
    }
    fieldsDispose = (function(data, watchMethod2, fields2, fieldsMap2, callback2) {
      const resolvedData = {};
      const missedFields = fields2.slice();
      const watchHandlers = fields2.map(((name2) => {
        const fieldGetter = fieldsMap2[name2];
        return watchMethod2(fieldGetter ? () => fieldGetter(data) : () => data[name2], ((value) => {
          resolvedData[name2] = value;
          if (missedFields.length) {
            const index = missedFields.indexOf(name2);
            if (index >= 0) {
              missedFields.splice(index, 1);
            }
          }
          if (!missedFields.length) {
            callback2(resolvedData);
          }
        }));
      }));
      return function() {
        watchHandlers.forEach(((dispose) => dispose()));
      };
    })(dataWithRawFields, watchMethod, fields, fieldsMap, callback);
  }));
  return function() {
    fieldsDispose && fieldsDispose();
    globalDispose && globalDispose();
  };
};
var BindableTemplate = class extends TemplateBase {
  constructor(render, fields, watchMethod, fieldsMap) {
    super();
    this._render = render;
    this._fields = fields;
    this._fieldsMap = fieldsMap || {};
    this._watchMethod = watchMethod;
  }
  _renderCore(options) {
    const $container = renderer_default(options.container);
    const dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, ((data) => {
      $container.empty();
      this._render($container, data, options.model);
    }));
    m_events_engine_default.on($container, removeEvent, dispose);
    return $container.contents();
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/item.js
var forcibleWatcher = (watchMethod, fn, callback) => {
  const filteredCallback = /* @__PURE__ */ (() => {
    let oldValue;
    return (value) => {
      if (oldValue !== value) {
        callback(value, oldValue);
        oldValue = value;
      }
    };
  })();
  return {
    dispose: watchMethod(fn, filteredCallback),
    force() {
      filteredCallback(fn());
    }
  };
};
var CollectionItem = class {
  constructor($element, options, rawData) {
    this._$element = $element;
    this._options = options;
    this._rawData = rawData;
    attachInstanceToElement($element, this, this._dispose);
    this._render();
  }
  _render() {
    const $placeholder = renderer_default("<div>").addClass("dx-item-content-placeholder");
    this._$element.append($placeholder);
    this._watchers = [];
    this._renderWatchers();
  }
  _renderWatchers() {
    this._startWatcher("disabled", this._renderDisabled.bind(this));
    this._startWatcher("visible", this._renderVisible.bind(this));
  }
  _startWatcher(field, render) {
    const rawData = this._rawData;
    const exprGetter = this._options.fieldGetter(field);
    const watcher = forcibleWatcher(this._options.watchMethod(), (() => exprGetter(rawData)), ((value, oldValue) => {
      this._dirty = true;
      render(value, oldValue);
    }));
    this._watchers.push(watcher);
  }
  setDataField() {
    this._dirty = false;
    each(this._watchers, ((_, watcher) => {
      watcher.force();
    }));
    return this._dirty;
  }
  _renderDisabled(value, oldValue) {
    this._$element.toggleClass("dx-state-disabled", !!value);
    this._$element.attr("aria-disabled", !!value);
    this._updateOwnerFocus(value);
  }
  _updateOwnerFocus(isDisabled) {
    const ownerComponent = this._options.owner;
    if (ownerComponent && isDisabled) {
      ownerComponent._resetItemFocus(this._$element);
    }
  }
  _renderVisible(value, oldValue) {
    this._$element.toggleClass("dx-state-invisible", void 0 !== value && !value);
  }
  _dispose() {
    each(this._watchers, ((_, watcher) => {
      watcher.dispose();
    }));
  }
  static getInstance($element) {
    return getInstanceByElement($element, this);
  }
  static isClickableItem(item) {
    return isObject(item) && "onClick" in item;
  }
};
var item_default = CollectionItem;

// node_modules/devextreme/esm/__internal/core/utils/m_selection_filter.js
var SelectionFilterCreator = function(selectedItemKeys, isSelectAll) {
  this.getLocalFilter = function(keyGetter, equalKeys, equalByReference, keyExpr) {
    equalKeys = void 0 === equalKeys ? equalByValue : equalKeys;
    return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr);
  };
  this.getExpr = function(keyExpr) {
    if (!keyExpr) {
      return;
    }
    let filterExpr;
    selectedItemKeys.forEach((function(key, index) {
      filterExpr = filterExpr || [];
      let filterExprPart;
      if (index > 0) {
        filterExpr.push(isSelectAll ? "and" : "or");
      }
      if (isString(keyExpr) || isFunction(keyExpr)) {
        filterExprPart = getFilterForPlainKey(keyExpr, key);
      } else {
        filterExprPart = (function(keyExpr2, itemKeyValue) {
          const filterExpr2 = [];
          for (let i = 0, {
            length
          } = keyExpr2; i < length; i++) {
            const currentKeyExpr = keyExpr2[i];
            const keyValueGetter = compileGetter(currentKeyExpr);
            const currentKeyValue = itemKeyValue && keyValueGetter(itemKeyValue);
            const filterExprPart2 = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
            if (!filterExprPart2) {
              break;
            }
            if (i > 0) {
              filterExpr2.push(isSelectAll ? "or" : "and");
            }
            filterExpr2.push(filterExprPart2);
          }
          return filterExpr2;
        })(keyExpr, key);
      }
      filterExpr.push(filterExprPart);
    }));
    if (filterExpr && 1 === filterExpr.length) {
      filterExpr = filterExpr[0];
    }
    return filterExpr;
  };
  this.getCombinedFilter = function(keyExpr, dataSourceFilter) {
    let forceCombinedFilter = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    const filterExpr = this.getExpr(keyExpr);
    let combinedFilter = filterExpr;
    if ((forceCombinedFilter || isSelectAll) && dataSourceFilter) {
      if (filterExpr) {
        combinedFilter = [];
        combinedFilter.push(filterExpr);
        combinedFilter.push(dataSourceFilter);
      } else {
        combinedFilter = dataSourceFilter;
      }
    }
    return combinedFilter;
  };
  let selectedItemKeyHashesMap;
  const getSelectedItemKeyHashesMap = function(keyOf, keyExpr) {
    if (!selectedItemKeyHashesMap) {
      selectedItemKeyHashesMap = {};
      const normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
      for (let i = 0; i < normalizedKeys.length; i++) {
        selectedItemKeyHashesMap[getKeyHash(normalizedKeys[i])] = true;
      }
    }
    return selectedItemKeyHashesMap;
  };
  const normalizeKeys = function(keys, keyOf, keyExpr) {
    return Array.isArray(keyExpr) ? keys.map(((key) => keyOf(key))) : keys;
  };
  function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
    const key = keyOf(item);
    let keyHash;
    let i;
    if (!equalByReference) {
      keyHash = getKeyHash(key);
      if (!isObject(keyHash)) {
        const selectedKeyHashesMap = getSelectedItemKeyHashesMap(keyOf, keyExpr);
        if (selectedKeyHashesMap[keyHash]) {
          return !isSelectAll;
        }
        return !!isSelectAll;
      }
    }
    for (i = 0; i < selectedItemKeys.length; i++) {
      if (equalKeys(selectedItemKeys[i], key)) {
        return !isSelectAll;
      }
    }
    return !!isSelectAll;
  }
  function getFilterForPlainKey(keyExpr, keyValue) {
    if (void 0 === keyValue) {
      return;
    }
    return [keyExpr, isSelectAll ? "<>" : "=", keyValue];
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.base.js
var ITEM_CLASS = "dx-item";
var EMPTY_COLLECTION = "dx-empty-collection";
var ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
var CollectionWidget = class extends widget_default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _supportedKeys() {
    const move = (location, e) => {
      if (!isCommandKeyPressed(e)) {
        e.preventDefault();
        e.stopPropagation();
        this._moveFocus(location, e);
      }
    };
    return _extends({}, super._supportedKeys(), {
      space: (e) => {
        e.preventDefault();
        this._enterKeyHandler(e);
      },
      enter: this._enterKeyHandler,
      leftArrow: move.bind(this, "left"),
      rightArrow: move.bind(this, "right"),
      upArrow: move.bind(this, "up"),
      downArrow: move.bind(this, "down"),
      pageUp: move.bind(this, "up"),
      pageDown: move.bind(this, "down"),
      home: move.bind(this, "first"),
      end: move.bind(this, "last")
    });
  }
  _getHandlerExtendedParams(e, $target) {
    const params = extend({}, e, {
      target: $target.get(0),
      currentTarget: $target.get(0)
    });
    return params;
  }
  _enterKeyHandler(e) {
    const {
      focusedElement
    } = this.option();
    const $itemElement = renderer_default(focusedElement);
    if (!$itemElement.length) {
      return;
    }
    const itemData = this._getItemData($itemElement);
    if (item_default.isClickableItem(itemData)) {
      const actionArgs = {
        event: e
      };
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, actionArgs);
    }
    this._itemClickHandler(this._getHandlerExtendedParams(e, $itemElement));
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectOnFocus: false,
      loopItemFocus: true,
      items: [],
      itemTemplate: "item",
      onItemRendered: null,
      onItemClick: null,
      onItemHold: null,
      itemHoldTimeout: 750,
      onItemContextMenu: null,
      onFocusedItemChanged: null,
      noDataText: message_default.format("dxCollectionWidget-noDataText"),
      encodeNoDataText: false,
      dataSource: null,
      _dataController: null,
      _itemAttributes: {},
      itemTemplateProperty: "template",
      focusedElement: null,
      displayExpr: void 0,
      disabledExpr: (data) => data ? data.disabled : void 0,
      visibleExpr: (data) => data ? data.visible : void 0
    });
  }
  _init() {
    this._compileDisplayGetter();
    this._initDataController();
    super._init();
    this._cleanRenderedItems();
    this._refreshDataSource();
  }
  _compileDisplayGetter() {
    const {
      displayExpr
    } = this.option();
    this._displayGetter = displayExpr ? compileGetter(displayExpr) : void 0;
  }
  _initTemplates() {
    this._initItemsFromMarkup();
    this._initDefaultItemTemplate();
    super._initTemplates();
  }
  _getAnonymousTemplateName() {
    return "item";
  }
  _initDefaultItemTemplate() {
    const fieldsMap = this._getFieldsMap();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate((($container, data) => {
        if (isPlainObject(data)) {
          this._prepareDefaultItemTemplate(data, $container);
        } else {
          if (fieldsMap && isFunction(fieldsMap.text)) {
            data = fieldsMap.text(data);
          }
          $container.text(String(ensureDefined(data, "")));
        }
      }), this._getBindableFields(), this.option("integrationOptions.watchMethod"), fieldsMap)
    });
  }
  _getBindableFields() {
    return ["text", "html"];
  }
  _getFieldsMap() {
    if (this._displayGetter) {
      return {
        text: this._displayGetter
      };
    }
    return;
  }
  _prepareDefaultItemTemplate(data, $container) {
    const {
      text,
      html
    } = data;
    if (isDefined(text)) {
      $container.text(text);
    }
    if (isDefined(html)) {
      $container.html(html);
    }
  }
  _initItemsFromMarkup() {
    const rawItems = findTemplates(this.$element(), "dxItem");
    const {
      items: userItems = []
    } = this.option();
    if (!rawItems.length || userItems.length) {
      return;
    }
    const items = rawItems.map(((_ref) => {
      let {
        element,
        options
      } = _ref;
      const isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
      if (isTemplateRequired) {
        options.template = this._prepareItemTemplate(element);
      } else {
        renderer_default(element).remove();
      }
      return options;
    }));
    this.option("items", items);
  }
  _prepareItemTemplate(item) {
    const templateId = `tmpl-${new guid_default()}`;
    const $template = renderer_default(item).detach().clone().removeAttr("data-options").addClass("dx-template-wrapper");
    this._saveTemplate(templateId, $template);
    return templateId;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _cleanRenderedItems() {
    this._renderedItemsCount = 0;
  }
  _focusTarget() {
    return this.$element();
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
    if (!this._isFocusTarget(e.target)) {
      return;
    }
    const {
      focusedElement
    } = this.option();
    const $focusedElement = renderer_default(focusedElement);
    if ($focusedElement.length) {
      this._shouldSkipSelectOnFocus = true;
      this._setFocusedItem($focusedElement);
      this._shouldSkipSelectOnFocus = false;
    } else {
      const $activeItem = this._getActiveItem();
      if ($activeItem.length) {
        this.option("focusedElement", getPublicElement($activeItem));
      }
    }
  }
  _focusOutHandler(e) {
    super._focusOutHandler(e);
    const {
      focusedElement
    } = this.option();
    const $target = renderer_default(focusedElement);
    this._updateFocusedItemState($target, false);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit());
  }
  _getActiveItem(last) {
    const {
      focusedElement
    } = this.option();
    const $focusedElement = renderer_default(focusedElement);
    if ($focusedElement.length) {
      return $focusedElement;
    }
    return this._determineFocusedElement(last);
  }
  _determineFocusedElement(last) {
    let index = this._getFocusedElementIndex();
    const activeElements = this._getActiveElement();
    const lastIndex = activeElements.length - 1;
    if (index < 0) {
      index = last ? lastIndex : 0;
    }
    return activeElements.eq(index);
  }
  _getFocusedElementIndex() {
    return 0;
  }
  _moveFocus(location, e) {
    const $items = this._getAvailableItems();
    let $newTarget = renderer_default();
    switch (location) {
      case "pageup":
      case "up":
        $newTarget = this._prevItem($items);
        break;
      case "pagedown":
      case "down":
        $newTarget = this._nextItem($items);
        break;
      case "right": {
        const {
          rtlEnabled
        } = this.option();
        $newTarget = rtlEnabled ? this._prevItem($items) : this._nextItem($items);
        break;
      }
      case "left": {
        const {
          rtlEnabled
        } = this.option();
        $newTarget = rtlEnabled ? this._nextItem($items) : this._prevItem($items);
        break;
      }
      case "first":
        $newTarget = $items.first();
        break;
      case "last":
        $newTarget = $items.last();
        break;
      default:
        return false;
    }
    if (0 !== $newTarget.length) {
      this.option("focusedElement", getPublicElement($newTarget));
    }
  }
  _getVisibleItems($itemElements) {
    const $items = $itemElements ?? this._itemElements();
    return $items.filter(":visible");
  }
  _getAvailableItems($itemElements) {
    return this._getVisibleItems($itemElements);
  }
  _prevItem($items) {
    const $target = this._getActiveItem();
    const targetIndex = $items.index($target);
    const $last = $items.last();
    let $item = renderer_default($items[targetIndex - 1]);
    const {
      loopItemFocus
    } = this.option();
    if (0 === $item.length && loopItemFocus) {
      $item = $last;
    }
    return $item;
  }
  _nextItem($items) {
    const $target = this._getActiveItem(true);
    const targetIndex = $items.index($target);
    const $first = $items.first();
    let $item = renderer_default($items[targetIndex + 1]);
    const {
      loopItemFocus
    } = this.option();
    if (0 === $item.length && loopItemFocus) {
      $item = $first;
    }
    return $item;
  }
  _selectFocusedItem($target) {
    this.selectItem($target);
  }
  _updateFocusedItemState(target, isFocused, needCleanItemId) {
    const $target = renderer_default(target);
    if ($target.length) {
      this._refreshActiveDescendant();
      this._refreshItemId($target, needCleanItemId);
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        this._toggleFocusClass(isFocused, $target);
      }
    }
    this._updateParentActiveDescendant();
  }
  _getElementClassToSkipRefreshId() {
    return "";
  }
  _shouldSkipRefreshId(target) {
    const elementClass = this._getElementClassToSkipRefreshId();
    const shouldSkipRefreshId = renderer_default(target).hasClass(elementClass);
    return shouldSkipRefreshId;
  }
  _refreshActiveDescendant($target) {
    const {
      focusedElement
    } = this.option();
    if (isDefined(focusedElement)) {
      const shouldSetExistingId = this._shouldSkipRefreshId(focusedElement);
      const id = shouldSetExistingId ? renderer_default(focusedElement).attr("id") : this.getFocusedItemId();
      this.setAria("activedescendant", id, $target);
      return;
    }
    this.setAria("activedescendant", null, $target);
  }
  _refreshItemId($target, needCleanItemId) {
    const {
      focusedElement
    } = this.option();
    const shouldSkipRefreshId = this._shouldSkipRefreshId($target);
    if (shouldSkipRefreshId) {
      return;
    }
    if (!needCleanItemId && focusedElement) {
      this.setAria("id", this.getFocusedItemId(), $target);
    } else {
      this.setAria("id", null, $target);
    }
  }
  _isDisabled($element) {
    return $element && "true" === renderer_default($element).attr("aria-disabled");
  }
  _setFocusedItem($target) {
    if (!(null !== $target && void 0 !== $target && $target.length)) {
      return;
    }
    this._updateFocusedItemState($target, true);
    this.onFocusedItemChanged(this.getFocusedItemId());
    const {
      selectOnFocus
    } = this.option();
    const isTargetDisabled = this._isDisabled($target);
    if (selectOnFocus && !isTargetDisabled && !this._shouldSkipSelectOnFocus) {
      this._selectFocusedItem($target);
    }
  }
  _findItemElementByItem(item) {
    let result = renderer_default();
    const itemDataKey = this._itemDataKey();
    this.itemElements().each(((_index, itemElement) => {
      const $item = renderer_default(itemElement);
      if ($item.data(itemDataKey) === item) {
        result = $item;
        return false;
      }
      return true;
    }));
    return result;
  }
  _getIndexByItem(item) {
    const {
      items
    } = this.option();
    return items.indexOf(item);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    const $item = this._findItemElementByItem(item);
    if (!$item.length) {
      return;
    }
    if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
      this._refreshItem($item, item);
    }
    const isDisabling = "disabled" === property && value;
    if (isDisabling) {
      this._resetItemFocus($item);
    }
  }
  _resetItemFocus($item) {
    const {
      focusedElement
    } = this.option();
    if ($item.is(focusedElement)) {
      this._resetFocusedElement();
    }
  }
  _resetFocusedElement() {
    this.option("focusedElement", null);
  }
  _refreshItem($item, item) {
    const itemData = this._getItemData($item);
    const index = $item.data(this._itemIndexKey());
    this._renderItem(this._renderedItemsCount + index, itemData, null, $item);
  }
  _updateParentActiveDescendant() {
  }
  _optionChanged(args) {
    const {
      name: name2,
      value,
      previousValue,
      fullName
    } = args;
    if ("items" === name2) {
      const matches = fullName.match(ITEM_PATH_REGEX);
      if (null !== matches && void 0 !== matches && matches.length) {
        const property = matches[matches.length - 1];
        const itemPath = fullName.replace(`.${property}`, "");
        const item = this.option(itemPath);
        this._itemOptionChanged(item, property, value, previousValue);
        return;
      }
    }
    switch (name2) {
      case "items":
      case "_itemAttributes":
      case "itemTemplateProperty":
      case "useItemTextAsTitle":
        this._cleanRenderedItems();
        this._invalidate();
        break;
      case "dataSource":
        this._refreshDataSource();
        this._renderEmptyMessage();
        break;
      case "noDataText":
      case "encodeNoDataText":
        this._renderEmptyMessage();
        break;
      case "itemTemplate":
      case "visibleExpr":
      case "disabledExpr":
        this._invalidate();
        break;
      case "onItemRendered":
        this._createItemRenderAction();
        break;
      case "onItemClick":
      case "selectOnFocus":
      case "loopItemFocus":
        break;
      case "onItemHold":
      case "itemHoldTimeout":
        this._attachHoldEvent();
        break;
      case "onItemContextMenu":
        this._attachContextMenuEvent();
        break;
      case "onFocusedItemChanged":
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        break;
      case "focusedElement":
        this._updateFocusedItemState(previousValue, false, true);
        this._setFocusedItem(renderer_default(value));
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._initDefaultItemTemplate();
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _invalidate() {
    this._resetFocusedElement();
    super._invalidate();
  }
  _loadNextPage() {
    this._expectNextPageLoading();
    return this._dataController.loadNextPage();
  }
  _expectNextPageLoading() {
    this._startIndexForAppendedItems = 0;
  }
  _expectLastItemLoading() {
    this._startIndexForAppendedItems = -1;
  }
  _forgetNextPageLoading() {
    this._startIndexForAppendedItems = null;
  }
  _dataSourceChangedHandler(newItems, e) {
    const {
      items
    } = this.option();
    if (this._initialized && items && this._shouldAppendItems()) {
      this._renderedItemsCount = items.length;
      if (!this._isLastPage() || -1 !== this._startIndexForAppendedItems) {
        this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems));
      }
      this._forgetNextPageLoading();
      this._refreshContent();
    } else {
      this.option("items", newItems.slice());
    }
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    const {
      items
    } = this.option();
    this.option("items", items);
  }
  _shouldAppendItems() {
    return null != this._startIndexForAppendedItems && this._allowDynamicItemsAppend();
  }
  _allowDynamicItemsAppend() {
    return false;
  }
  _clean() {
    this._cleanFocusState();
    this._cleanItemContainer();
    if (this._inkRipple) {
      delete this._inkRipple;
    }
    this._resetActiveState();
  }
  _cleanItemContainer() {
    renderer_default(this._itemContainer()).empty();
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._itemFocusTimeout);
  }
  _refresh() {
    this._cleanRenderedItems();
    super._refresh();
  }
  _itemContainer(searchEnabled, previousSelectAllEnabled) {
    return this.$element();
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemContentClass() {
    return `${this._itemClass()}-content`;
  }
  _itemResponseWaitClass() {
    return "dx-item-response-wait";
  }
  _itemSelector() {
    return `.${this._itemClass()}`;
  }
  _itemDataKey() {
    return "dxItemData";
  }
  _itemIndexKey() {
    return "dxItemIndex";
  }
  _itemElements() {
    return this._itemContainer().find(this._itemSelector());
  }
  _initMarkup() {
    super._initMarkup();
    this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
    this.$element().addClass("dx-collection");
    this._prepareContent();
  }
  _prepareContent() {
    deferRenderer((() => {
      this._renderContentImpl();
    }))();
  }
  _renderContent() {
    this._fireContentReadyAction();
  }
  _render() {
    super._render();
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
  }
  _getPointerEvent() {
    return m_pointer_default.down;
  }
  _attachClickEvent() {
    const itemSelector = this._itemSelector();
    const pointerDownEvent = m_pointer_default.down;
    const pointerUpEvent = m_pointer_default.up;
    const clickEventNamespace = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const pointerDownEventNamespace = addNamespace(pointerDownEvent, this.NAME);
    const pointerUpEventNamespace = addNamespace(pointerUpEvent, this.NAME);
    const pointerDownAction = new action_default(((args) => {
      const {
        event
      } = args;
      this._itemPointerHandler(event);
    }));
    const pointerUpAction = new action_default(((args) => {
      const {
        event
      } = args;
      this._itemPointerUpHandler(event);
    }));
    m_events_engine_default.off(this._itemContainer(), clickEventNamespace, itemSelector);
    m_events_engine_default.off(this._itemContainer(), pointerDownEventNamespace, itemSelector);
    m_events_engine_default.off(this._itemContainer(), pointerUpEventNamespace, itemSelector);
    m_events_engine_default.on(this._itemContainer(), clickEventNamespace, itemSelector, ((e) => this._itemClickHandler(e)));
    m_events_engine_default.on(this._itemContainer(), pointerDownEventNamespace, itemSelector, ((e) => {
      pointerDownAction.execute({
        element: renderer_default(e.target),
        event: e
      });
    }));
    m_events_engine_default.on(this._itemContainer(), pointerUpEventNamespace, itemSelector, ((e) => {
      pointerUpAction.execute({
        element: renderer_default(e.target),
        event: e
      });
    }));
  }
  _itemClickHandler(e, args, config) {
    this._itemDXEventHandler(e, "onItemClick", args, config);
  }
  _handleItemFocus(e) {
    if (e.isDefaultPrevented()) {
      return;
    }
    const $target = renderer_default(e.target);
    const $closestItem = $target.closest(this._itemElements());
    const $closestFocusable = this._closestFocusable($target);
    if ($closestItem.length && this._isFocusTarget(null === $closestFocusable || void 0 === $closestFocusable ? void 0 : $closestFocusable.get(0))) {
      this._shouldSkipSelectOnFocus = true;
      this.option("focusedElement", getPublicElement($closestItem));
      this._shouldSkipSelectOnFocus = false;
    }
  }
  _itemPointerHandler(e) {
    const {
      focusStateEnabled
    } = this.option();
    if (!focusStateEnabled) {
      return;
    }
    this._itemFocusHandler = () => {
      clearTimeout(this._itemFocusTimeout);
      this._itemFocusHandler = void 0;
      this._handleItemFocus(e);
    };
    this._itemFocusTimeout = setTimeout((() => {
      this._forcePointerDownFocus();
    }));
  }
  _itemPointerUpHandler(e) {
  }
  _closestFocusable($target) {
    if ($target.is(focusable)) {
      return $target;
    }
    let $nextTarget = $target.parent();
    while ($nextTarget.length && !dom_adapter_default.isDocument($nextTarget.get(0)) && !dom_adapter_default.isDocumentFragment($nextTarget.get(0))) {
      if ($nextTarget.is(focusable)) {
        return $nextTarget;
      }
      $nextTarget = $nextTarget.parent();
    }
    return;
  }
  _forcePointerDownFocus() {
    if (this._itemFocusHandler) {
      this._itemFocusHandler();
    }
  }
  _updateFocusState(e, isFocused) {
    super._updateFocusState(e, isFocused);
    this._forcePointerDownFocus();
  }
  _attachHoldEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    const eventName = addNamespace(m_hold_default.name, this.NAME);
    m_events_engine_default.off($itemContainer, eventName, itemSelector);
    m_events_engine_default.on($itemContainer, eventName, itemSelector, {
      timeout: this._getHoldTimeout()
    }, this._itemHoldHandler.bind(this));
  }
  _getHoldTimeout() {
    const {
      itemHoldTimeout
    } = this.option();
    return itemHoldTimeout;
  }
  _shouldFireHoldEvent() {
    return this.hasActionSubscription("onItemHold");
  }
  _itemHoldHandler(e) {
    if (this._shouldFireHoldEvent()) {
      this._itemDXEventHandler(e, "onItemHold");
    } else {
      e.cancel = true;
    }
  }
  _attachContextMenuEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    const eventName = addNamespace(name, this.NAME);
    m_events_engine_default.off($itemContainer, eventName, itemSelector);
    m_events_engine_default.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this));
  }
  _shouldFireContextMenuEvent() {
    return this.hasActionSubscription("onItemContextMenu");
  }
  _itemContextMenuHandler(e) {
    if (this._shouldFireContextMenuEvent()) {
      this._itemDXEventHandler(e, "onItemContextMenu");
    } else {
      e.cancel = true;
    }
  }
  _renderContentImpl() {
    const {
      items
    } = this.option();
    const itemsToRender = items ?? [];
    if (this._renderedItemsCount) {
      this._renderItems(itemsToRender.slice(this._renderedItemsCount));
    } else {
      this._renderItems(itemsToRender);
    }
  }
  _renderItems(items) {
    if (items.length) {
      each(items, ((index, itemData) => {
        this._renderItem(this._renderedItemsCount + index, itemData);
      }));
    }
    this._renderEmptyMessage();
  }
  _getItemsContainer() {
    return this._itemContainer();
  }
  _setAttributes($element) {
    const {
      _itemAttributes
    } = this.option();
    const attributes = _extends({}, _itemAttributes);
    const {
      class: customClassValue
    } = attributes;
    if (customClassValue) {
      const currentClassValue = $element.get(0).className;
      attributes.class = [currentClassValue, customClassValue].join(" ");
    }
    $element.attr(attributes);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const itemIndex = (null === index || void 0 === index ? void 0 : index.item) ?? index;
    const $containerToRender = $container ?? this._getItemsContainer();
    const $itemFrame = this._renderItemFrame(itemIndex, itemData, $containerToRender, $itemToReplace);
    this._setElementData($itemFrame, itemData, itemIndex);
    this._setAttributes($itemFrame);
    this._attachItemClickEvent(itemData, $itemFrame);
    const $itemContent = this._getItemContent($itemFrame);
    const {
      itemTemplate
    } = this.option();
    const renderContentPromise = this._renderItemContent({
      index: itemIndex,
      itemData,
      container: getPublicElement($itemContent),
      contentClass: this._itemContentClass(),
      defaultTemplateName: itemTemplate
    });
    when(renderContentPromise).done((($content) => {
      this._postprocessRenderItem({
        itemElement: $itemFrame,
        itemContent: $content,
        itemData,
        itemIndex
      });
      this._executeItemRenderAction(index, itemData, getPublicElement($itemFrame));
    }));
    return $itemFrame;
  }
  _getItemContent($itemFrame) {
    const $itemContent = $itemFrame.find(".dx-item-content-placeholder");
    $itemContent.removeClass("dx-item-content-placeholder");
    return $itemContent;
  }
  _attachItemClickEvent(itemData, $itemElement) {
    if (!itemData || !item_default.isClickableItem(itemData)) {
      return;
    }
    m_events_engine_default.on($itemElement, CLICK_EVENT_NAME, ((e) => {
      const actionArgs = {
        event: e
      };
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, actionArgs);
    }));
  }
  _renderItemContent(args) {
    const itemTemplateName = this._getItemTemplateName(args);
    const itemTemplate = this._getTemplate(itemTemplateName);
    this._addItemContentClasses(args);
    const $templateResult = renderer_default(this._createItemByTemplate(itemTemplate, args));
    if (!$templateResult.hasClass("dx-template-wrapper")) {
      return args.container;
    }
    return this._renderItemContentByNode(args, $templateResult);
  }
  _renderItemContentByNode(args, $node) {
    renderer_default(args.container).replaceWith($node);
    args.container = getPublicElement($node);
    this._addItemContentClasses(args);
    return $node;
  }
  _addItemContentClasses(args) {
    const classes = [ITEM_CLASS + "-content", args.contentClass];
    renderer_default(args.container).addClass(classes.join(" "));
  }
  _appendItemToContainer($container, $itemFrame, index) {
    $itemFrame.appendTo($container);
  }
  _renderItemFrame(index, itemData, $container, $itemToReplace) {
    const $itemFrame = renderer_default("<div>");
    new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
    if (null !== $itemToReplace && void 0 !== $itemToReplace && $itemToReplace.length) {
      $itemToReplace.replaceWith($itemFrame);
    } else {
      this._appendItemToContainer.call(this, $container, $itemFrame, index);
    }
    const {
      useItemTextAsTitle
    } = this.option();
    if (useItemTextAsTitle) {
      const displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
      $itemFrame.attr("title", displayValue);
    }
    return $itemFrame;
  }
  _itemOptions() {
    return {
      watchMethod: () => this.option("integrationOptions.watchMethod"),
      owner: this,
      fieldGetter: (field) => {
        const expr = this.option(`${field}Expr`);
        const getter = compileGetter(expr);
        return getter;
      }
    };
  }
  _postprocessRenderItem(args) {
  }
  _executeItemRenderAction(index, itemData, itemElement) {
    this._getItemRenderAction()({
      itemElement,
      itemIndex: index,
      itemData
    });
  }
  _setElementData(element, data, index) {
    element.addClass([ITEM_CLASS, this._itemClass()].join(" ")).data(this._itemDataKey(), data).data(this._itemIndexKey(), index);
  }
  _createItemRenderAction() {
    this._itemRenderAction = this._createActionByOption("onItemRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
    return this._itemRenderAction;
  }
  _getItemRenderAction() {
    return this._itemRenderAction ?? this._createItemRenderAction();
  }
  _getItemTemplateName(args) {
    const data = args.itemData;
    const {
      itemTemplateProperty
    } = this.option();
    const templateProperty = args.templateProperty ?? itemTemplateProperty;
    const template = data && templateProperty ? data[templateProperty] : void 0;
    return template || args.defaultTemplateName;
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      container,
      index
    } = renderArgs;
    return itemTemplate.render({
      model: itemData,
      container,
      index,
      onRendered: this._onItemTemplateRendered(itemTemplate, renderArgs)
    });
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
    };
  }
  _emptyMessageContainer() {
    return this._itemContainer();
  }
  _renderEmptyMessage(rootNodes) {
    const {
      items: userItems = [],
      noDataText
    } = this.option();
    const items = rootNodes ?? userItems;
    const hideNoData = !noDataText || (null === items || void 0 === items ? void 0 : items.length) || this._dataController.isLoading();
    if (hideNoData && this._$noData) {
      this._$noData.remove();
      this._$noData = null;
      this.setAria("label", void 0);
    }
    if (!hideNoData) {
      this._$noData = this._$noData ?? renderer_default("<div>").addClass("dx-empty-message");
      this._$noData.appendTo(this._emptyMessageContainer());
      const {
        encodeNoDataText
      } = this.option();
      if (encodeNoDataText) {
        this._$noData.text(noDataText);
      } else {
        this._$noData.html(noDataText);
      }
    }
    this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData);
  }
  _itemDXEventHandler(dxEvent, handlerOptionName, actionArgs, actionConfig) {
    this._itemEventHandler(dxEvent.target, handlerOptionName, extend(actionArgs, {
      event: dxEvent
    }), actionConfig);
  }
  _itemEventHandler(initiator, handlerOptionName, actionArgs, actionConfig) {
    const action = this._createActionByOption(handlerOptionName, _extends({
      validatingTargetName: "itemElement"
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerByHandler(initiator, handler, actionArgs, actionConfig) {
    const action = this._createAction(handler, extend({
      validatingTargetName: "itemElement"
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerImpl(initiator, action, actionArgs) {
    const $itemElement = this._closestItemElement(renderer_default(initiator));
    const args = extend({}, actionArgs);
    return action(extend(actionArgs, this._extendActionArgs($itemElement), args));
  }
  _extendActionArgs($itemElement) {
    return {
      itemElement: getPublicElement($itemElement),
      itemIndex: this._itemElements().index($itemElement),
      itemData: this._getItemData($itemElement)
    };
  }
  _closestItemElement($element) {
    return renderer_default($element).closest(this._itemSelector());
  }
  _getItemData(itemElement) {
    return renderer_default(itemElement).data(this._itemDataKey());
  }
  _getSummaryItemsSize(dimension, items, includeMargin) {
    let result = 0;
    if (items) {
      each(items, ((_index, item) => {
        if ("width" === dimension) {
          result += getOuterWidth(item, includeMargin ?? false);
        } else if ("height" === dimension) {
          result += getOuterHeight(item, includeMargin ?? false);
        }
      }));
    }
    return result;
  }
  getFocusedItemId() {
    if (!this._focusedItemId) {
      this._focusedItemId = `dx-${new guid_default()}`;
    }
    return this._focusedItemId;
  }
  itemElements() {
    return this._itemElements();
  }
  itemsContainer() {
    return this._itemContainer();
  }
};
CollectionWidget.ItemClass = item_default;
CollectionWidget.include(m_data_helper_default);
var collection_widget_base_default = CollectionWidget;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.strategy.js
var EditStrategy = class {
  constructor(collectionWidget) {
    this._collectionWidget = collectionWidget;
  }
  _getItems() {
    const {
      items = []
    } = this._collectionWidget.option();
    return items;
  }
  getIndexByItemData(value) {
    return class_default.abstract();
  }
  getItemDataByIndex(index) {
    return class_default.abstract();
  }
  getKeysByItems(items) {
    return class_default.abstract();
  }
  getItemsByKeys(keys, items) {
    return class_default.abstract();
  }
  itemsGetter() {
    return class_default.abstract();
  }
  getKeyByIndex(index) {
    const resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  }
  _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return equalByValue(key1, key2);
    }
    return key1 === key2;
  }
  beginCache() {
    this._cache = {};
  }
  endCache() {
    this._cache = null;
  }
  getIndexByKey(key) {
    return class_default.abstract();
  }
  getNormalizedIndex(value) {
    if (this._isNode(value)) {
      return this._getNormalizedItemIndex(value);
    }
    if (this._isNormalizedItemIndex(value)) {
      return value;
    }
    if (this._isItemIndex(value)) {
      return this._normalizeItemIndex(value);
    }
    return this._normalizeItemIndex(this.getIndexByItemData(value));
  }
  getIndex(value) {
    if (this._isNode(value)) {
      return this._denormalizeItemIndex(this._getNormalizedItemIndex(value));
    }
    if (this._isNormalizedItemIndex(value)) {
      return this._denormalizeItemIndex(value);
    }
    if (this._isItemIndex(value)) {
      return value;
    }
    return this.getIndexByItemData(value);
  }
  getItemElement(value) {
    if (this._isNode(value)) {
      return renderer_default(value);
    }
    if (this._isNormalizedItemIndex(value)) {
      return this._getItemByNormalizedIndex(value);
    }
    if (this._isItemIndex(value)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(value));
    }
    const normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  }
  _isNode(el) {
    return dom_adapter_default.isNode(el && isRenderer(el) ? el.get(0) : el);
  }
  deleteItemAtIndex(index) {
    return class_default.abstract();
  }
  itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? "after" : "before";
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    return class_default.abstract();
  }
  _isNormalizedItemIndex(index) {
    return "number" === typeof index && Math.round(index) === index;
  }
  _isItemIndex(index) {
    return class_default.abstract();
  }
  _getNormalizedItemIndex(value) {
    return class_default.abstract();
  }
  _normalizeItemIndex(index) {
    return class_default.abstract();
  }
  _denormalizeItemIndex(index) {
    return class_default.abstract();
  }
  _getItemByNormalizedIndex(index) {
    return class_default.abstract();
  }
  _itemsFromSameParent(movingIndex, destinationIndex) {
    return class_default.abstract();
  }
};
var collection_widget_edit_strategy_default = EditStrategy;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.strategy.plain.js
var PlainEditStrategy = class extends collection_widget_edit_strategy_default {
  _getPlainItems() {
    return this._getItems() ?? [];
  }
  getIndexByItemData(itemData) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    if (keyOf) {
      return this.getIndexByKey(keyOf(itemData));
    }
    return this._getPlainItems().indexOf(itemData);
  }
  getItemDataByIndex(index) {
    return this._getPlainItems()[index];
  }
  deleteItemAtIndex(index) {
    this._getPlainItems().splice(index, 1);
  }
  itemsGetter() {
    return this._getPlainItems();
  }
  getKeysByItems(items) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    let result = items;
    if (keyOf) {
      result = items.map(((item) => keyOf(item)));
    }
    return result;
  }
  getIndexByKey(key) {
    const cache = this._cache;
    const keys = (null === cache || void 0 === cache ? void 0 : cache.keys) ?? this.getKeysByItems(this._getPlainItems());
    if (cache && !cache.keys) {
      cache.keys = keys;
    }
    if ("object" === typeof key) {
      for (let i = 0; i < keys.length; i += 1) {
        if (this._equalKeys(key, keys[i])) {
          return i;
        }
      }
    } else {
      return keys.indexOf(key);
    }
    return -1;
  }
  getItemsByKeys(keys, items) {
    return (items ?? keys).slice();
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const items = this._getPlainItems();
    const movedItemData = items[movingIndex];
    items.splice(movingIndex, 1);
    items.splice(destinationIndex, 0, movedItemData);
  }
  _isItemIndex(index) {
    return this._isNormalizedItemIndex(index);
  }
  _getNormalizedItemIndex(itemElement) {
    return this._collectionWidget._itemElements().index(itemElement);
  }
  _normalizeItemIndex(index) {
    return index;
  }
  _denormalizeItemIndex(index) {
    return index;
  }
  _getItemByNormalizedIndex(index) {
    return index > -1 ? this._collectionWidget._itemElements().eq(index) : null;
  }
  _itemsFromSameParent(_firstIndex, _secondIndex) {
    return true;
  }
};
var collection_widget_edit_strategy_plain_default = PlainEditStrategy;

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.js
var SelectionStrategy = class {
  constructor(options) {
    this._lastSelectAllPageDeferred = Deferred().reject();
    this.options = options;
    this._setOption("disabledItemKeys", []);
    this._clearItemKeys();
  }
  _clearItemKeys() {
    this._setOption("addedItemKeys", []);
    this._setOption("removedItemKeys", []);
    this._setOption("removedItems", []);
    this._setOption("addedItems", []);
  }
  validate() {
  }
  _setOption(name2, value) {
    this.options[name2] = value;
  }
  onSelectionChanging() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanging = noop
    } = this.options;
    const selectionChangingArgs = {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      cancel: false
    };
    onSelectionChanging(selectionChangingArgs);
    return selectionChangingArgs.cancel;
  }
  _callCallbackIfNotCanceled(callback, cancelCallback) {
    const cancelResult = this.onSelectionChanging();
    if (isPromise(cancelResult)) {
      cancelResult.then(((cancel) => {
        if (!cancel) {
          callback();
        } else {
          cancelCallback();
        }
      })).catch((() => {
        callback();
      }));
    } else if (!cancelResult) {
      callback();
    } else {
      cancelCallback();
    }
  }
  onSelectionChanged() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanged = noop
    } = this.options;
    this._clearItemKeys();
    onSelectionChanged({
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems
    });
  }
  equalKeys(key1, key2) {
    if (this.options.equalByReference) {
      if (isObject(key1) && isObject(key2)) {
        return key1 === key2;
      }
    }
    return equalByValue(key1, key2);
  }
  getSelectableItems(items) {
    return items.filter(((item) => !(null !== item && void 0 !== item && item.disabled)));
  }
  _clearSelection(keys, preserve, isDeselect, isSelectAll) {
    let normalizedKeys = keys || [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll);
  }
  _removeTemplateProperty(remoteFilter) {
    if (Array.isArray(remoteFilter)) {
      return remoteFilter.map(((f) => this._removeTemplateProperty(f)));
    }
    if (isObject(remoteFilter)) {
      delete remoteFilter.template;
    }
    return remoteFilter;
  }
  _getQueryParams() {
    const {
      sensitivity
    } = this.options;
    if (!sensitivity) {
      return;
    }
    return {
      langParams: {
        collatorOptions: {
          sensitivity
        }
      }
    };
  }
  _loadFilteredData(remoteFilter, localFilter, select, isSelectAll) {
    const filterLength = encodeURI(JSON.stringify(this._removeTemplateProperty(remoteFilter))).length;
    const needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
    const deferred = Deferred();
    const queryParams = this._getQueryParams();
    const loadOptions = _extends({
      filter: needLoadAllData ? void 0 : remoteFilter,
      select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
    }, queryParams);
    if (remoteFilter && Array.isArray(remoteFilter) && 0 === remoteFilter.length) {
      deferred.resolve([]);
    } else {
      this.options.load(loadOptions).done(((items) => {
        let filteredItems = !Array.isArray(items) && isPlainObject(items) ? items.data : items;
        if (localFilter && !isSelectAll) {
          filteredItems = filteredItems.filter(localFilter);
        } else if (needLoadAllData) {
          filteredItems = m_query_default(filteredItems).filter(remoteFilter).toArray();
        }
        deferred.resolve(filteredItems);
      })).fail(((error) => {
        deferred.reject(error);
      }));
    }
    return deferred;
  }
  updateSelectedItemKeyHash(keys) {
    for (let i = 0; i < keys.length; i += 1) {
      const keyHash = getKeyHash(keys[i]);
      if (!isObject(keyHash)) {
        this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
        const keyIndices = this.options.keyHashIndices[keyHash];
        keyIndices.push(i);
      }
    }
  }
  _isAnyItemSelected(items) {
    if (items.find(((item) => this.options.isItemSelected(item)))) {
      return;
    }
    return false;
  }
  _getFullSelectAllState() {
    const items = this.options.plainItems();
    const {
      filter
    } = this.options;
    const dataFilter = filter();
    let selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(((item) => !(null !== item && void 0 !== item && item.disabled)));
    if (dataFilter) {
      selectedItems = m_query_default(selectedItems).filter(dataFilter).toArray();
    }
    const selectedItemsLength = selectedItems.length;
    const disabledItemsLength = items.length - this.getSelectableItems(items).length;
    if (!selectedItemsLength) {
      return this._isAnyItemSelected(items);
    }
    if (selectedItemsLength >= this.options.totalCount() - disabledItemsLength) {
      return true;
    }
    return;
  }
  _getVisibleSelectAllState() {
    const items = this.getSelectableItems(this.options.plainItems());
    let hasSelectedItems = false;
    let hasUnselectedItems = false;
    items.forEach(((item) => {
      const itemData = this.options.getItemData(item);
      const key = this.options.keyOf(itemData);
      if (this.options.isSelectableItem(item)) {
        if (this.isItemKeySelected(key)) {
          hasSelectedItems = true;
        } else {
          hasUnselectedItems = true;
        }
      }
    }));
    if (hasSelectedItems) {
      return !hasUnselectedItems ? true : void 0;
    }
    return false;
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter) {
    throw new Error("selectedItemKeys method should be overriden");
  }
  isItemKeySelected(itemKey) {
    throw new Error("isItemKeySelected method should be overriden");
  }
  isItemDataSelected(itemKey) {
    throw new Error("isItemKeySelected method should be overriden");
  }
  addSelectedItem(itemKey, dataOrIsSelectAll, skipFilter) {
    throw new Error("addSelectedItem method should be overriden");
  }
  removeSelectedItem(itemKey) {
    throw new Error("removeSelectedItem method should be overriden");
  }
  _selectAllPlainItems(isDeselect) {
    const items = this.getSelectableItems(this.options.plainItems());
    items.forEach(((item) => {
      if (this.options.isSelectableItem(item)) {
        const itemData = this.options.getItemData(item);
        const itemKey = this.options.keyOf(itemData);
        const isSelected = this.isItemKeySelected(itemKey);
        if (!isSelected && !isDeselect) {
          this.addSelectedItem(itemKey, itemData);
        }
        if (isSelected && isDeselect) {
          this.removeSelectedItem(itemKey);
        }
      }
    }));
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.deferred.js
var DeferredStrategy = class extends SelectionStrategy {
  getSelectedItems() {
    return this._loadFilteredData(this.options.selectionFilter);
  }
  getSelectedItemKeys() {
    const d = Deferred();
    const key = this.options.key();
    const select = isString(key) ? [key] : key;
    const getKey = (item) => this.options.keyOf(item);
    this._loadFilteredData(this.options.selectionFilter, null, select).done(((items) => {
      const keys = (Array.isArray(items) ? items : []).map(getKey);
      d.resolve(keys);
    })).fail(((error) => {
      d.reject(error);
    }));
    return d.promise();
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
    if (isSelectAll) {
      const filter = this.options.filter();
      const needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
      if (needResetSelectionFilter) {
        this._setOption("selectionFilter", isDeselect ? [] : null);
      } else {
        this._addSelectionFilter(isDeselect, filter, isSelectAll);
      }
    } else {
      if (!preserve) {
        this._setOption("selectionFilter", []);
      }
      keys.forEach(((key) => {
        if (isDeselect) {
          this.removeSelectedItem(key);
        } else {
          this.addSelectedItem(key, isSelectAll, !preserve);
        }
      }));
    }
    this.onSelectionChanged();
    return Deferred().resolve();
  }
  setSelectedItems(keys) {
    this._setOption("selectionFilter", null);
    keys.forEach(((key) => {
      this.addSelectedItem(key);
    }));
  }
  isItemDataSelected(itemData) {
    return this.isItemKeySelected(itemData);
  }
  isItemKeySelected(itemData) {
    const {
      selectionFilter
    } = this.options;
    if (!selectionFilter) {
      return true;
    }
    const queryParams = this._getQueryParams();
    return !!m_query_default([itemData], queryParams).filter(selectionFilter).toArray().length;
  }
  _getKeyExpr() {
    const keyField = this.options.key();
    if (Array.isArray(keyField) && 1 === keyField.length) {
      return keyField[0];
    }
    return keyField;
  }
  _normalizeKey(key) {
    const keyExpr = this.options.key();
    if (Array.isArray(keyExpr) && 1 === keyExpr.length) {
      return key[keyExpr[0]];
    }
    return key;
  }
  _getFilterByKey(key) {
    const keyField = this._getKeyExpr();
    let filter = [keyField, "=", this._normalizeKey(key)];
    if (Array.isArray(keyField)) {
      filter = [];
      for (let i = 0; i < keyField.length; i += 1) {
        filter.push([keyField[i], "=", key[keyField[i]]]);
        if (i !== keyField.length - 1) {
          filter.push("and");
        }
      }
    }
    return filter;
  }
  addSelectedItem(key, isSelectAll, skipFilter) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(false, filter, isSelectAll, skipFilter);
  }
  removeSelectedItem(key) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(true, filter);
  }
  validate() {
    const {
      key
    } = this.options;
    if (key && void 0 === key()) {
      throw ui_errors_default.Error("E1042", "Deferred selection");
    }
  }
  _findSubFilter(selectionFilter, filter) {
    if (!selectionFilter) {
      return -1;
    }
    const filterString = JSON.stringify(filter);
    for (let index = 0; index < selectionFilter.length; index += 1) {
      const subFilter = selectionFilter[index];
      if (subFilter && JSON.stringify(subFilter) === filterString) {
        return index;
      }
    }
    return -1;
  }
  _isLastSubFilter(selectionFilter, filter) {
    if (selectionFilter && filter) {
      return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter);
    }
    return false;
  }
  _addFilterOperator(selectionFilter, filterOperator) {
    let filter = selectionFilter;
    if (filter.length > 1 && isString(filter[1]) && filter[1] !== filterOperator) {
      filter = [filter];
    }
    if (Array.isArray(filter) && filter.length) {
      filter.push(filterOperator);
    }
    return filter;
  }
  _denormalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && isString(resultFilter[0])) {
      resultFilter = [resultFilter];
    }
    return resultFilter;
  }
  _isOnlyNegativeFiltersLeft(filters) {
    return filters.every(((filterItem, i) => {
      if (i % 2 === 0) {
        return Array.isArray(filterItem) && "!" === filterItem[0];
      }
      return "and" === filterItem;
    }));
  }
  _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
    var _selectionFilter;
    const currentOperation = isDeselect ? "and" : "or";
    let needAddFilter = true;
    let selectionFilter = this.options.selectionFilter || [];
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if (null !== (_selectionFilter = selectionFilter) && void 0 !== _selectionFilter && _selectionFilter.length && !skipFilter) {
      const removedIndex = this._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
      const filterIndex = this._removeSameFilter(selectionFilter, filter, !isDeselect);
      const shouldCleanFilter = isDeselect && (-1 !== removedIndex || -1 !== filterIndex) && this._isOnlyNegativeFiltersLeft(selectionFilter);
      if (shouldCleanFilter) {
        selectionFilter = [];
      }
      const isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
      needAddFilter = !!(null !== filter && void 0 !== filter && filter.length) && !isKeyOperatorsAfterRemoved;
    }
    if (needAddFilter) {
      selectionFilter = this._addFilterOperator(selectionFilter, currentOperation);
      if (Array.isArray(selectionFilter) && filter) {
        const currentFilter = isDeselect ? ["!", filter] : filter;
        selectionFilter.push(currentFilter);
      }
    }
    selectionFilter = this._normalizeFilter(selectionFilter);
    this._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter);
  }
  _normalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && 1 === resultFilter.length) {
      [resultFilter] = resultFilter;
    }
    return resultFilter;
  }
  _removeFilterByIndex(filter, filterIndex, isSelectAll) {
    const operation = filter[1];
    if (filterIndex > 0) {
      filter.splice(filterIndex - 1, 2);
    } else {
      filter.splice(filterIndex, 2);
    }
    if (isSelectAll && "and" === operation) {
      filter.splice(0, filter.length);
    }
  }
  _isSimpleKeyFilter(filter, key) {
    return 3 === (null === filter || void 0 === filter ? void 0 : filter.length) && filter[0] === key && "=" === filter[1];
  }
  _isKeyFilter(filter) {
    if (2 === (null === filter || void 0 === filter ? void 0 : filter.length) && "!" === (null === filter || void 0 === filter ? void 0 : filter[0])) {
      return this._isKeyFilter(filter[1]);
    }
    const keyField = this._getKeyExpr();
    if (Array.isArray(keyField)) {
      if ((null === filter || void 0 === filter ? void 0 : filter.length) !== 2 * keyField.length - 1) {
        return false;
      }
      for (let i = 0; i < keyField.length; i += 1) {
        if (i > 0 && "and" !== (null === filter || void 0 === filter ? void 0 : filter[2 * i - 1])) {
          return false;
        }
        if (!this._isSimpleKeyFilter(null === filter || void 0 === filter ? void 0 : filter[2 * i], keyField[i])) {
          return false;
        }
      }
      return true;
    }
    return this._isSimpleKeyFilter(filter, keyField);
  }
  _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
    if (filterIndex >= 0) {
      for (let i = filterIndex; i < selectionFilter.length; i += 1) {
        if ("string" !== typeof selectionFilter[i] && !this._isKeyFilter(selectionFilter[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
    const sameFilter = inverted ? ["!", filter] : filter;
    if (JSON.stringify(sameFilter) === JSON.stringify(selectionFilter)) {
      selectionFilter.splice(0, selectionFilter.length);
      return 0;
    }
    const filterIndex = this._findSubFilter(selectionFilter, sameFilter);
    if (filterIndex >= 0) {
      this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
      return filterIndex;
    }
    for (let i = 0; i < selectionFilter.length; i += 1) {
      if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
        const innerFilterIndex = this._removeSameFilter(selectionFilter[i], sameFilter, false, isSelectAll);
        if (innerFilterIndex >= 0) {
          if (!selectionFilter[i].length) {
            this._removeFilterByIndex(selectionFilter, i, isSelectAll);
          } else if (1 === selectionFilter[i].length) {
            const [firstFilter] = selectionFilter[i];
            selectionFilter[i] = firstFilter;
          }
          return innerFilterIndex;
        }
      }
    }
    return -1;
  }
  getSelectAllState() {
    const filter = this.options.filter();
    let {
      selectionFilter
    } = this.options;
    if (!selectionFilter) {
      return true;
    }
    if (!selectionFilter.length) {
      return false;
    }
    if (!(null !== filter && void 0 !== filter && filter.length)) {
      return;
    }
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if (this._isLastSubFilter(selectionFilter, filter)) {
      return true;
    }
    if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
      return false;
    }
    return;
  }
  loadSelectedItemsWithFilter() {
    const componentFilter = this.options.filter();
    const {
      selectionFilter
    } = this.options;
    const filter = componentFilter ? [componentFilter, "and", selectionFilter] : selectionFilter;
    return this._loadFilteredData(filter);
  }
  _onePageSelectAll(isDeselect) {
    this._selectAllPlainItems(isDeselect);
    this.onSelectionChanged();
    return Deferred().resolve();
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_array_compare.js
var getKeyWrapper = function(item, getKey) {
  const key = getKey(item);
  if (isObject(key)) {
    try {
      return JSON.stringify(key);
    } catch (e) {
      return key;
    }
  }
  return key;
};
var getSameNewByOld = function(oldItem, newItems, newIndexByKey, getKey) {
  const key = getKeyWrapper(oldItem, getKey);
  return newItems[newIndexByKey[key]];
};
var isKeysEqual = function(oldKeys, newKeys) {
  if (oldKeys.length !== newKeys.length) {
    return false;
  }
  for (let i = 0; i < newKeys.length; i++) {
    if (oldKeys[i] !== newKeys[i]) {
      return false;
    }
  }
  return true;
};
var mapIndexByKey = function(items, getKey) {
  const indexByKey2 = {};
  items.forEach(((item, index) => {
    const key = getKeyWrapper(item, getKey);
    if (isDefined(indexByKey2[String(key)])) {
      throw ui_errors_default.Error("E1040", key);
    }
    indexByKey2[key] = index;
  }));
  return indexByKey2;
};
var findChanges = function(_ref) {
  let {
    oldItems,
    newItems,
    getKey,
    isItemEquals,
    detectReorders = false
  } = _ref;
  try {
    const oldIndexByKey = mapIndexByKey(oldItems, getKey);
    const newIndexByKey = mapIndexByKey(newItems, getKey);
    let addedCount = 0;
    let removeCount = 0;
    const result = [];
    const itemCount = Math.max(oldItems.length, newItems.length);
    for (let index = 0; index < itemCount + addedCount; index += 1) {
      const newItem = newItems[index];
      const oldNextIndex = index - addedCount + removeCount;
      const nextOldItem = oldItems[oldNextIndex];
      const isRemoved = !newItem || nextOldItem && !getSameNewByOld(nextOldItem, newItems, newIndexByKey, getKey);
      if (isRemoved) {
        if (nextOldItem) {
          result.push({
            type: "remove",
            key: getKey(nextOldItem),
            index,
            oldItem: nextOldItem
          });
          removeCount++;
          index--;
        }
      } else {
        const key = getKeyWrapper(newItem, getKey);
        const oldIndex = oldIndexByKey[key];
        const oldItem = oldItems[oldIndex];
        if (!oldItem) {
          addedCount++;
          result.push({
            type: "insert",
            data: newItem,
            index
          });
        } else if (oldIndex === oldNextIndex) {
          if (!isItemEquals(oldItem, newItem)) {
            result.push({
              type: "update",
              data: newItem,
              key: getKey(newItem),
              index,
              oldItem
            });
          }
        } else {
          if (!detectReorders) {
            return;
          }
          result.push({
            type: "remove",
            key: getKey(oldItem),
            index: oldIndex,
            oldItem
          });
          result.push({
            type: "insert",
            data: newItem,
            index
          });
          addedCount++;
          removeCount++;
        }
      }
    }
    if (detectReorders) {
      const removes = result.filter(((r) => "remove" === r.type)).sort(((a, b) => b.index - a.index));
      const inserts = result.filter(((i) => "insert" === i.type)).sort(((a, b) => a.index - b.index));
      const updates = result.filter(((u) => "update" === u.type));
      return [...removes, ...inserts, ...updates];
    }
    return result;
  } catch (e) {
    logger.error(e);
    return;
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.standard.js
var StandardStrategy = class extends SelectionStrategy {
  constructor(options) {
    super(options);
    this._lastSelectAllPageDeferred = Deferred().reject();
    this._initSelectedItemKeyHash();
  }
  _initSelectedItemKeyHash() {
    this._setOption("keyHashIndices", this.options.equalByReference ? null : {});
  }
  getSelectedItemKeys() {
    return this.options.selectedItemKeys.slice(0);
  }
  getSelectedItems() {
    return this.options.selectedItems.slice(0);
  }
  _preserveSelectionUpdate(items, isDeselect) {
    const {
      keyOf
    } = this.options;
    let keyIndicesToRemoveMap;
    if (!keyOf) {
      return;
    }
    const isBatchDeselect = isDeselect && items.length > 1 && !this.options.equalByReference;
    if (isBatchDeselect) {
      keyIndicesToRemoveMap = {};
    }
    items.forEach(((item) => {
      const key = keyOf(item);
      if (isDeselect) {
        const keyIndex = this.removeSelectedItem(key, keyIndicesToRemoveMap, item && "object" === typeof item && "disabled" in item ? !!item.disabled : false);
        if (keyIndicesToRemoveMap && isNumeric(keyIndex) && keyIndex >= 0) {
          keyIndicesToRemoveMap[keyIndex] = true;
        }
      } else {
        this.addSelectedItem(key, item);
      }
    }));
    if (isBatchDeselect) {
      this._batchRemoveSelectedItems(keyIndicesToRemoveMap);
    }
  }
  _batchRemoveSelectedItems(keyIndicesToRemoveMap) {
    const selectedItemKeys = this.options.selectedItemKeys.slice(0);
    const selectedItems = this.options.selectedItems.slice(0);
    this.options.selectedItemKeys.length = 0;
    this.options.selectedItems.length = 0;
    for (let i = 0; i < selectedItemKeys.length; i += 1) {
      if (!keyIndicesToRemoveMap[i]) {
        this.options.selectedItemKeys.push(selectedItemKeys[i]);
        this.options.selectedItems.push(selectedItems[i]);
      }
    }
    this._initSelectedItemKeyHash();
    this.updateSelectedItemKeyHash(this.options.selectedItemKeys);
  }
  _loadSelectedItemsCore(keys, isDeselect, isSelectAll, filter) {
    let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    let deferred = Deferred();
    const key = this.options.key();
    if (!keys.length && !isSelectAll) {
      deferred.resolve([]);
      return deferred;
    }
    if (isSelectAll && isDeselect && !filter) {
      deferred.resolve(this.getSelectedItems());
      return deferred;
    }
    const selectionFilterCreator = new SelectionFilterCreator(keys, isSelectAll);
    const combinedFilter = selectionFilterCreator.getCombinedFilter(key, filter, forceCombinedFilter);
    let deselectedItems = [];
    if (isDeselect) {
      const {
        selectedItems
      } = this.options;
      deselectedItems = combinedFilter && keys.length !== selectedItems.length ? m_query_default(selectedItems).filter(combinedFilter).toArray() : selectedItems.slice(0);
    }
    let filteredItems = deselectedItems.length ? deselectedItems : this.options.plainItems(true).filter(this.options.isSelectableItem).map(this.options.getItemData);
    const localFilter = selectionFilterCreator.getLocalFilter(this.options.keyOf, this.equalKeys.bind(this), this.options.equalByReference, key);
    filteredItems = filteredItems.filter(localFilter);
    if (deselectedItems.length || !isSelectAll && filteredItems.length === keys.length) {
      deferred.resolve(filteredItems);
    } else {
      deferred = this._loadFilteredData(combinedFilter, localFilter, null, isSelectAll);
    }
    return deferred;
  }
  _replaceSelectionUpdate(items) {
    const {
      keyOf
    } = this.options;
    if (!keyOf) {
      return;
    }
    const internalKeys = items.map(((item) => keyOf(item)));
    this.setSelectedItems(internalKeys, items);
  }
  _warnOnIncorrectKeys(keys) {
    const {
      allowNullValue
    } = this.options;
    keys.forEach(((key) => {
      if ((!allowNullValue || null !== key) && !this.isItemKeySelected(key)) {
        ui_errors_default.log("W1002", key);
      }
    }));
  }
  _isMultiSelectEnabled() {
    const {
      mode
    } = this.options;
    return "all" === mode || "multiple" === mode;
  }
  _requestInProgress() {
    var _this$_lastLoadDeferr;
    return "pending" === (null === (_this$_lastLoadDeferr = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr ? void 0 : _this$_lastLoadDeferr.state());
  }
  _concatRequestsItems(keys, oldRequestItems, isDeselect, updatedKeys) {
    let selectedItems = [];
    const deselectedItems = isDeselect ? keys : [];
    if (updatedKeys) {
      selectedItems = updatedKeys;
    } else {
      selectedItems = removeDuplicates(keys, this.options.selectedItemKeys);
    }
    return {
      addedItems: oldRequestItems.added.concat(selectedItems),
      removedItems: oldRequestItems.removed.concat(deselectedItems),
      keys
    };
  }
  _collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys) {
    const isDeselectAll = isDeselect && isSelectAll;
    const oldRequestItems = {
      added: [],
      removed: []
    };
    const multiSelectEnabled = this._isMultiSelectEnabled();
    const emptyData = {
      addedItems: [],
      removedItems: [],
      keys: []
    };
    if (!multiSelectEnabled) {
      return emptyData;
    }
    let lastRequestData = this._lastRequestData ?? emptyData;
    if (this._shouldMergeWithLastRequest) {
      if (isDeselectAll) {
        var _this$_lastLoadDeferr2;
        null === (_this$_lastLoadDeferr2 = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr2 || _this$_lastLoadDeferr2.reject();
        lastRequestData = {};
      } else if (!isKeysEqual(keys, this.options.selectedItemKeys)) {
        var _lastRequestData, _lastRequestData2;
        oldRequestItems.added = null === (_lastRequestData = lastRequestData) || void 0 === _lastRequestData ? void 0 : _lastRequestData.addedItems;
        oldRequestItems.removed = null === (_lastRequestData2 = lastRequestData) || void 0 === _lastRequestData2 ? void 0 : _lastRequestData2.removedItems;
        if (!isDeselect) {
          var _this$_lastLoadDeferr3;
          null === (_this$_lastLoadDeferr3 = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr3 || _this$_lastLoadDeferr3.reject();
        }
      }
    }
    lastRequestData = this._concatRequestsItems(keys, oldRequestItems, isDeselect, this._shouldMergeWithLastRequest ? void 0 : updatedKeys);
    return lastRequestData;
  }
  _updateKeysByLastRequestData(keys, isDeselect, isSelectAll) {
    let currentKeys = keys;
    if (this._isMultiSelectEnabled() && this._shouldMergeWithLastRequest && this._lastRequestData && !isDeselect && !isSelectAll) {
      var _this$_lastRequestDat;
      currentKeys = removeDuplicates([...keys, ...this._lastRequestData.addedItems], null === (_this$_lastRequestDat = this._lastRequestData) || void 0 === _this$_lastRequestDat ? void 0 : _this$_lastRequestDat.removedItems);
      currentKeys = getUniqueValues(currentKeys);
    }
    return currentKeys;
  }
  _loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys) {
    let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    const deferred = Deferred();
    const filter = this.options.filter();
    this._shouldMergeWithLastRequest = this._requestInProgress();
    this._lastRequestData = this._collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys);
    when(this._lastLoadDeferred).always((() => {
      const currentKeys = this._updateKeysByLastRequestData(keys, isDeselect, isSelectAll);
      this._shouldMergeWithLastRequest = false;
      this._loadSelectedItemsCore(currentKeys, isDeselect, isSelectAll, filter, forceCombinedFilter).done(((result) => {
        deferred.resolve(result);
      })).fail(((error) => {
        deferred.reject(error);
      }));
    }));
    this._lastLoadDeferred = deferred;
    return deferred;
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter) {
    if (this._isCancelingInProgress) {
      return Deferred().reject();
    }
    const loadingDeferred = this._loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter);
    const selectionDeferred = Deferred();
    loadingDeferred.done(((items) => {
      this._storeSelectionState();
      if (preserve) {
        this._preserveSelectionUpdate(items, isDeselect);
      } else {
        this._replaceSelectionUpdate(items);
      }
      this._isCancelingInProgress = true;
      this._callCallbackIfNotCanceled((() => {
        this._isCancelingInProgress = false;
        this.onSelectionChanged();
        selectionDeferred.resolve(items);
      }), (() => {
        this._isCancelingInProgress = false;
        this._restoreSelectionState();
        selectionDeferred.reject();
      }));
    }));
    return selectionDeferred;
  }
  addSelectedItem(key, item) {
    if (isDefined(item) && !this.options.ignoreDisabledItems && item.disabled) {
      if (!this.options.disabledItemKeys.includes(key)) {
        this.options.disabledItemKeys.push(key);
      }
      return;
    }
    const keyHash = this._getKeyHash(key);
    if (-1 === this._indexOfSelectedItemKey(keyHash)) {
      if (!isObject(keyHash) && this.options.keyHashIndices) {
        this.options.keyHashIndices[keyHash] = [this.options.selectedItemKeys.length];
      }
      this.options.selectedItemKeys.push(key);
      this.options.addedItemKeys.push(key);
      this.options.addedItems.push(item);
      this.options.selectedItems.push(item);
    }
  }
  _getSelectedIndexByKey(key, ignoreIndicesMap) {
    const {
      selectedItemKeys
    } = this.options;
    return selectedItemKeys.findIndex(((_, index) => !(null !== ignoreIndicesMap && void 0 !== ignoreIndicesMap && ignoreIndicesMap[index]) && this.equalKeys(selectedItemKeys[index], key)));
  }
  _getSelectedIndexByHash(key, ignoreIndicesMap) {
    let indices = this.options.keyHashIndices[key];
    if (indices && indices.length > 1 && ignoreIndicesMap) {
      indices = indices.filter(((index) => !ignoreIndicesMap[index]));
    }
    return indices && indices[0] >= 0 ? indices[0] : -1;
  }
  _indexOfSelectedItemKey(key, ignoreIndicesMap) {
    let selectedIndex = -1;
    if (this.options.equalByReference) {
      selectedIndex = this.options.selectedItemKeys.indexOf(key);
    } else if (isObject(key)) {
      selectedIndex = this._getSelectedIndexByKey(key, ignoreIndicesMap);
    } else {
      selectedIndex = this._getSelectedIndexByHash(key, ignoreIndicesMap);
    }
    return selectedIndex;
  }
  _shiftSelectedKeyIndices(keyIndex) {
    for (let currentKeyIndex = keyIndex; currentKeyIndex < this.options.selectedItemKeys.length; currentKeyIndex += 1) {
      const currentKey = this.options.selectedItemKeys[currentKeyIndex];
      const currentKeyHash = getKeyHash(currentKey);
      const currentKeyIndices = this.options.keyHashIndices[currentKeyHash];
      if (!currentKeyIndices) {
        continue;
      }
      for (let i = 0; i < currentKeyIndices.length; i += 1) {
        if (currentKeyIndices[i] > keyIndex) {
          currentKeyIndices[i] -= 1;
        }
      }
    }
  }
  removeSelectedItem(key, keyIndicesToRemoveMap, isDisabled) {
    if (!this.options.ignoreDisabledItems && isDisabled) {
      return;
    }
    const keyHash = this._getKeyHash(key);
    const isBatchDeselect = !!keyIndicesToRemoveMap;
    const keyIndex = this._indexOfSelectedItemKey(keyHash, keyIndicesToRemoveMap);
    if (keyIndex < 0) {
      return keyIndex;
    }
    this.options.removedItemKeys.push(key);
    this.options.removedItems.push(this.options.selectedItems[keyIndex]);
    if (isBatchDeselect) {
      return keyIndex;
    }
    this.options.selectedItemKeys.splice(keyIndex, 1);
    this.options.selectedItems.splice(keyIndex, 1);
    if (isObject(keyHash) || !this.options.keyHashIndices) {
      return keyIndex;
    }
    const keyIndices = this.options.keyHashIndices[keyHash];
    if (!keyIndices) {
      return keyIndex;
    }
    keyIndices.shift();
    if (!keyIndices.length) {
      delete this.options.keyHashIndices[keyHash];
    }
    this._shiftSelectedKeyIndices(keyIndex);
    return keyIndex;
  }
  _updateAddedItemKeys(keys, items) {
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.isItemKeySelected(keys[i])) {
        this.options.addedItemKeys.push(keys[i]);
        this.options.addedItems.push(items[i]);
      }
    }
  }
  _updateRemovedItemKeys(_, oldSelectedKeys, oldSelectedItems) {
    for (let i = 0; i < oldSelectedKeys.length; i += 1) {
      if (!this.isItemKeySelected(oldSelectedKeys[i])) {
        this.options.removedItemKeys.push(oldSelectedKeys[i]);
        this.options.removedItems.push(oldSelectedItems[i]);
      }
    }
  }
  _isItemSelectionInProgress(key, checkPending) {
    const shouldCheckPending = checkPending && this._lastRequestData && this._requestInProgress();
    if (shouldCheckPending) {
      var _this$_lastRequestDat2;
      const addedItems = (null === (_this$_lastRequestDat2 = this._lastRequestData) || void 0 === _this$_lastRequestDat2 ? void 0 : _this$_lastRequestDat2.addedItems) ?? [];
      return addedItems.includes(key);
    }
    return false;
  }
  _getKeyHash(key) {
    return this.options.equalByReference ? key : getKeyHash(key);
  }
  setSelectedItems(keys, items) {
    this._updateAddedItemKeys(keys, items);
    const oldSelectedKeys = this.options.selectedItemKeys;
    const oldSelectedItems = this.options.selectedItems;
    if (!this.options.equalByReference) {
      this._initSelectedItemKeyHash();
      this.updateSelectedItemKeyHash(keys);
    }
    this._setOption("selectedItemKeys", keys);
    this._setOption("selectedItems", items);
    this._updateRemovedItemKeys(keys, oldSelectedKeys, oldSelectedItems);
  }
  isItemDataSelected(itemData) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const key = this.options.keyOf(itemData);
    return this.isItemKeySelected(key, options);
  }
  isItemKeySelected(key) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let result = this._isItemSelectionInProgress(key, options.checkPending);
    if (!result) {
      const keyHash = this._getKeyHash(key);
      const index = this._indexOfSelectedItemKey(keyHash);
      result = -1 !== index;
    }
    return result;
  }
  getSelectAllState(visibleOnly) {
    if (visibleOnly) {
      return this._getVisibleSelectAllState();
    }
    return this._getFullSelectAllState();
  }
  loadSelectedItemsWithFilter() {
    const keyExpr = this.options.key();
    const keys = this.getSelectedItemKeys();
    const filter = this.options.filter();
    if (!keys.length) {
      return Deferred().resolve([]);
    }
    const selectionFilterCreator = new SelectionFilterCreator(keys);
    const combinedFilter = selectionFilterCreator.getCombinedFilter(keyExpr, filter, true);
    return this._loadFilteredData(combinedFilter);
  }
  _storeSelectionState() {
    const {
      selectedItems,
      selectedItemKeys,
      keyHashIndices
    } = this.options;
    this._storedSelectionState = {
      keyHashIndices: JSON.stringify(keyHashIndices),
      selectedItems: [...selectedItems],
      selectedItemKeys: [...selectedItemKeys]
    };
  }
  _restoreSelectionState() {
    this._clearItemKeys();
    if (!this._storedSelectionState) {
      return;
    }
    const {
      selectedItemKeys,
      selectedItems,
      keyHashIndices
    } = this._storedSelectionState;
    this._setOption("selectedItemKeys", selectedItemKeys);
    this._setOption("selectedItems", selectedItems);
    this._setOption("keyHashIndices", JSON.parse(keyHashIndices));
  }
  _onePageSelectAll(isDeselect) {
    if ("pending" === this._lastSelectAllPageDeferred.state()) {
      return Deferred().reject();
    }
    this._storeSelectionState();
    this._selectAllPlainItems(isDeselect);
    this._lastSelectAllPageDeferred = Deferred();
    this._callCallbackIfNotCanceled((() => {
      this.onSelectionChanged();
      this._lastSelectAllPageDeferred.resolve();
    }), (() => {
      this._restoreSelectionState();
      this._lastSelectAllPageDeferred.reject();
    }));
    return this._lastSelectAllPageDeferred;
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.js
var Selection = class {
  constructor(options) {
    this.options = extend(this._getDefaultOptions(), options, {
      selectedItemKeys: options.selectedKeys ?? []
    });
    this._selectionStrategy = this.options.deferred ? new DeferredStrategy(this.options) : new StandardStrategy(this.options);
    this._focusedItemIndex = -1;
    if (!this.options.equalByReference) {
      this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
    }
  }
  _getDefaultOptions() {
    const defaultOptions = {
      allowNullValue: false,
      deferred: false,
      equalByReference: false,
      mode: "multiple",
      selectedItems: [],
      selectionFilter: [],
      maxFilterLengthInRequest: 0,
      onSelectionChanged: noop,
      key() {
        return;
      },
      keyOf: (item) => item,
      load: () => Deferred().resolve([]),
      totalCount: () => -1,
      isSelectableItem: () => true,
      isItemSelected: () => false,
      getItemData: (item) => item,
      dataFields() {
        return;
      },
      filter() {
        return;
      }
    };
    return defaultOptions;
  }
  validate() {
    this._selectionStrategy.validate();
  }
  getSelectedItemKeys() {
    return this._selectionStrategy.getSelectedItemKeys();
  }
  _isStandardStrategy(strategy) {
    return this.options.deferred;
  }
  getSelectedItems() {
    return this._selectionStrategy.getSelectedItems();
  }
  selectionFilter(value) {
    if (void 0 === value) {
      return this.options.selectionFilter;
    }
    const filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
    this.options.selectionFilter = value;
    if (filterIsChanged) {
      this.onSelectionChanged();
    }
    return;
  }
  setSelection(keys, updatedKeys) {
    return this.selectedItemKeys(keys, false, false, false, updatedKeys);
  }
  select(keys) {
    return this.selectedItemKeys(keys, true);
  }
  deselect(keys) {
    return this.selectedItemKeys(keys, true, true);
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
    let normalizedKeys = keys ?? [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this._selectionStrategy.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll, updatedKeys);
  }
  clearSelection() {
    return this.selectedItemKeys([]);
  }
  _addSelectedItem(itemData, key) {
    this._selectionStrategy.addSelectedItem(key, itemData);
  }
  _removeSelectedItem(key) {
    this._selectionStrategy.removeSelectedItem(key);
  }
  _setSelectedItems(keys, items) {
    this._selectionStrategy.setSelectedItems(keys, items);
  }
  onSelectionChanged() {
    this._selectionStrategy.onSelectionChanged();
  }
  changeItemSelection(itemIndex) {
    var _this$options$allowLo, _this$options;
    let keys = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let setFocusOnly = arguments.length > 2 ? arguments[2] : void 0;
    let isSelectedItemsChanged = false;
    const items = this.options.plainItems();
    const item = items[itemIndex];
    let focusedItemIndex = itemIndex;
    let deferred;
    const {
      isVirtualPaging
    } = this.options;
    const allowLoadByRange = null === (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) || void 0 === _this$options$allowLo ? void 0 : _this$options$allowLo.call(_this$options);
    const {
      alwaysSelectByShift
    } = this.options;
    let indexOffset;
    let focusedItemNotInLoadedRange = false;
    let shiftFocusedItemNotInLoadedRange = false;
    const itemIsNotInLoadedRange = (index) => index >= 0 && !items.filter(((it) => it.loadIndex === index)).length;
    if (isVirtualPaging && isDefined(item)) {
      if (allowLoadByRange) {
        indexOffset = item.loadIndex - focusedItemIndex;
        focusedItemIndex = item.loadIndex;
      }
      focusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._focusedItemIndex);
      if (isDefined(this._shiftFocusedItemIndex)) {
        shiftFocusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._shiftFocusedItemIndex);
      }
    }
    if (!this.isSelectable() || !this.isDataItem(item)) {
      return false;
    }
    const itemData = this.options.getItemData(item);
    const itemKey = this.options.keyOf(itemData);
    let allowSelectByShift = keys.shift;
    if (false === alwaysSelectByShift && allowSelectByShift) {
      allowSelectByShift = false !== allowLoadByRange || !focusedItemNotInLoadedRange && !shiftFocusedItemNotInLoadedRange;
    }
    if (allowSelectByShift && "multiple" === this.options.mode && this._focusedItemIndex >= 0) {
      if (allowLoadByRange && (focusedItemNotInLoadedRange || shiftFocusedItemNotInLoadedRange)) {
        isSelectedItemsChanged = focusedItemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
        if (isSelectedItemsChanged) {
          deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(focusedItemIndex);
        }
      } else {
        isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(focusedItemIndex, items, indexOffset);
      }
    } else if (keys.control) {
      this._resetItemSelectionWhenShiftKeyPressed();
      if (!setFocusOnly) {
        const isSelected = this._selectionStrategy.isItemDataSelected(itemData);
        if ("single" === this.options.mode) {
          this.clearSelectedItems();
        }
        if (isSelected) {
          this._removeSelectedItem(itemKey);
        } else {
          this._addSelectedItem(itemData, itemKey);
        }
      }
      isSelectedItemsChanged = true;
    } else {
      this._resetItemSelectionWhenShiftKeyPressed();
      const isKeysEqual2 = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
      if (1 !== this.options.selectedItemKeys.length || !isKeysEqual2) {
        this._setSelectedItems([itemKey], [itemData]);
        isSelectedItemsChanged = true;
      }
    }
    if (isSelectedItemsChanged) {
      when(deferred).done((() => {
        this._focusedItemIndex = focusedItemIndex;
        if (!setFocusOnly) {
          this.onSelectionChanged();
        }
      }));
      return true;
    }
    return;
  }
  isDataItem(item) {
    return this.options.isSelectableItem(item);
  }
  isSelectable() {
    return "single" === this.options.mode || "multiple" === this.options.mode;
  }
  isItemDataSelected(data) {
    return this._selectionStrategy.isItemDataSelected(data, {
      checkPending: true
    });
  }
  isItemSelected(arg) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return this._selectionStrategy.isItemKeySelected(arg, options);
  }
  _resetItemSelectionWhenShiftKeyPressed() {
    delete this._shiftFocusedItemIndex;
  }
  _resetFocusedItemIndex() {
    this._focusedItemIndex = -1;
  }
  changeItemSelectionWhenShiftKeyInVirtualPaging(loadIndex) {
    var _this$options$getLoad, _this$options2;
    const loadOptions = (null === (_this$options$getLoad = (_this$options2 = this.options).getLoadOptions) || void 0 === _this$options$getLoad ? void 0 : _this$options$getLoad.call(_this$options2, loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex)) ?? {};
    const deferred = Deferred();
    const indexOffset = loadOptions.skip;
    this.options.load(loadOptions).done(((items) => {
      const filteredItems = !Array.isArray(items) && isPlainObject(items) ? items.data : items;
      this.changeItemSelectionWhenShiftKeyPressed(loadIndex, filteredItems, indexOffset);
      deferred.resolve();
    }));
    return deferred.promise();
  }
  changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset) {
    let isSelectedItemsChanged = false;
    const indexOffsetDefined = isDefined(indexOffset);
    let index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
    const {
      keyOf
    } = this.options;
    const focusedItem = items[index];
    const focusedData = this.options.getItemData(focusedItem);
    const focusedKey = keyOf(focusedData);
    const isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
    if (!isDefined(this._shiftFocusedItemIndex)) {
      this._shiftFocusedItemIndex = this._focusedItemIndex;
    }
    let itemIndexStep = 0;
    let itemKey;
    let startIndex = 0;
    let endIndex = 0;
    if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
      itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          itemKey = keyOf(this.options.getItemData(items[index]));
          this._removeSelectedItem(itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if (itemIndex !== this._shiftFocusedItemIndex) {
      itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          const data = this.options.getItemData(items[index]);
          itemKey = keyOf(data);
          this._addSelectedItem(data, itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
      this._addSelectedItem(focusedData, focusedKey);
      isSelectedItemsChanged = true;
    }
    return isSelectedItemsChanged;
  }
  clearSelectedItems() {
    this._setSelectedItems([], []);
  }
  selectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(false);
    }
    return this.selectedItemKeys([], true, false, true);
  }
  deselectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(true);
    }
    return this.selectedItemKeys([], true, true, true);
  }
  getSelectAllState(visibleOnly) {
    return this._selectionStrategy.getSelectAllState(visibleOnly);
  }
  loadSelectedItemsWithFilter() {
    return this._selectionStrategy.loadSelectedItemsWithFilter();
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.js
var NOT_EXISTING_INDEX = -1;
var indexExists = (index) => index !== NOT_EXISTING_INDEX;
var CollectionWidget2 = class _CollectionWidget extends collection_widget_base_default {
  constructor(element, options) {
    _CollectionWidget._userOptions = options ?? {};
    super(element, options);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    this._optionsByReference.selectedItem = true;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectionMode: "none",
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: NOT_EXISTING_INDEX,
      focusOnSelectedItem: true,
      selectedItem: null,
      onSelectionChanging: null,
      onSelectionChanged: null,
      onItemReordered: null,
      onItemDeleting: null,
      onItemDeleted: null
    });
  }
  _init() {
    this._initEditStrategy();
    super._init();
    this._initKeyGetter();
    this._initActions();
    this._initSelectionModule();
  }
  _initKeyGetter() {
    const {
      keyExpr
    } = this.option();
    this._keyGetter = compileGetter(keyExpr);
  }
  _selectedItemClass() {
    return "dx-item-selected";
  }
  _getActionsList() {
    return ["onSelectionChanging", "onSelectionChanged"];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    actions.forEach(((action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ["disabled", "readOnly"]
      }) ?? noop;
    }));
  }
  _getKeysByItems(selectedItems) {
    return this._editStrategy.getKeysByItems(selectedItems);
  }
  _getItemsByKeys(selectedItemKeys, selectedItems) {
    return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems);
  }
  _getKeyByIndex(index) {
    return this._editStrategy.getKeyByIndex(index);
  }
  _getIndexByKey(key) {
    return this._editStrategy.getIndexByKey(key);
  }
  _getIndexByItemData(itemData) {
    return this._editStrategy.getIndexByItemData(itemData);
  }
  _isKeySpecified() {
    return !!this._dataController.key();
  }
  _getCombinedFilter() {
    return this._dataController.filter();
  }
  key() {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return keyExpr;
    }
    return this._dataController.key();
  }
  keyOf(item) {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return this._keyGetter(item);
    }
    if (this._dataController.store()) {
      return this._dataController.keyOf(item);
    }
    return item;
  }
  _nullValueSelectionSupported() {
    return false;
  }
  _initSelectionModule() {
    const that = this;
    const {
      itemsGetter
    } = this._editStrategy;
    const {
      selectionMode,
      maxFilterLengthInRequest
    } = this.option();
    this._selection = new Selection({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: selectionMode,
      maxFilterLengthInRequest,
      equalByReference: !this._isKeySpecified(),
      onSelectionChanging: (args) => {
        var _this$_actions$onSele, _this$_actions;
        const isSelectionChanged = args.addedItemKeys.length || args.removedItemKeys.length;
        if (!this._rendered || !isSelectionChanged) {
          return;
        }
        const selectionChangingArgs = {
          removedItems: args.removedItems,
          addedItems: args.addedItems,
          cancel: false
        };
        null === (_this$_actions$onSele = (_this$_actions = this._actions).onSelectionChanging) || void 0 === _this$_actions$onSele || _this$_actions$onSele.call(_this$_actions, selectionChangingArgs);
        args.cancel = selectionChangingArgs.cancel;
      },
      onSelectionChanged: (args) => {
        if (args.addedItemKeys.length || args.removedItemKeys.length) {
          this.option("selectedItems", this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
          this._updateSelectedItems(args);
        }
      },
      filter: this._getCombinedFilter.bind(this),
      totalCount: () => {
        const {
          items = []
        } = this.option();
        const totalCount = this._dataController.totalCount();
        return totalCount >= 0 ? totalCount : this._getItemsCount(items);
      },
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this),
      load(options) {
        var _dataController$loadO;
        const dataController = that._dataController;
        options.customQueryParams = null === (_dataController$loadO = dataController.loadOptions()) || void 0 === _dataController$loadO ? void 0 : _dataController$loadO.customQueryParams;
        options.userData = dataController.userData();
        if (dataController.store()) {
          return dataController.loadFromStore(options).done(((loadResult) => {
            if (that._disposed) {
              return;
            }
            const items = normalizeLoadResult(loadResult).data;
            dataController.applyMapFunction(items);
          }));
        }
        return Deferred().resolve(this.plainItems());
      },
      dataFields: () => this._dataController.select(),
      plainItems: itemsGetter.bind(this._editStrategy)
    });
  }
  _getItemsCount(items) {
    return items.reduce(((itemsCount, item) => {
      const subItemsCount = item.items ? this._getItemsCount(item.items) : 1;
      return itemsCount + subItemsCount;
    }), 0);
  }
  _initEditStrategy() {
    this._editStrategy = new collection_widget_edit_strategy_plain_default(this);
  }
  _getSelectedItemIndices(keys) {
    const indices = [];
    const selectedKeys = keys ?? this._selection.getSelectedItemKeys();
    this._editStrategy.beginCache();
    each(selectedKeys, ((_, key) => {
      const selectedIndex = this._getIndexByKey(key);
      if (indexExists(selectedIndex)) {
        indices.push(selectedIndex);
      }
    }));
    this._editStrategy.endCache();
    return indices;
  }
  _initMarkup() {
    this._rendering = true;
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done((() => {
        this._normalizeSelectedItems();
      }));
    }
    super._initMarkup();
  }
  _render() {
    super._render();
    this._rendering = false;
  }
  _fireContentReadyAction() {
    this._rendering = false;
    this._rendered = true;
    super._fireContentReadyAction();
  }
  _syncSelectionOptions(byOption) {
    const selectedByOption = byOption ?? this._chooseSelectOption();
    switch (selectedByOption) {
      case "selectedIndex": {
        const {
          selectedIndex
        } = this.option();
        const selectedItem = this._editStrategy.getItemDataByIndex(selectedIndex ?? NOT_EXISTING_INDEX);
        if (isDefined(selectedItem)) {
          this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
          this._setOptionWithoutOptionChange("selectedItem", selectedItem);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedItem", null);
        }
        break;
      }
      case "selectedItems": {
        const {
          selectedItems = [],
          selectionRequired
        } = this.option();
        const selectedIndex = selectedItems.length ? this._editStrategy.getIndexByItemData(selectedItems[0]) : NOT_EXISTING_INDEX;
        if (selectionRequired && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        this._setOptionWithoutOptionChange("selectedItem", selectedItems[0]);
        this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
        this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems(selectedItems));
        break;
      }
      case "selectedItem": {
        const {
          selectedItem,
          selectionRequired
        } = this.option();
        const selectedIndex = this._editStrategy.getIndexByItemData(selectedItem);
        if (selectionRequired && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        if (isDefined(selectedItem)) {
          this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
          this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedIndex", NOT_EXISTING_INDEX);
        }
        break;
      }
      case "selectedItemKeys": {
        const {
          selectedItemKeys = [],
          selectionRequired
        } = this.option();
        if (selectionRequired) {
          const selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
          if (!indexExists(selectedItemIndex)) {
            return this._syncSelectionOptions("selectedIndex");
          }
        }
        return this._selection.setSelection(selectedItemKeys);
      }
    }
    return Deferred().resolve();
  }
  _chooseSelectOption() {
    let optionName = "selectedIndex";
    const isOptionDefined = (name2) => {
      const {
        [name2]: optionValue
      } = this.option();
      const length = isDefined(optionValue) && Array.isArray(optionValue) && optionValue.length;
      return !!length || name2 in _CollectionWidget._userOptions;
    };
    if (isOptionDefined("selectedItems")) {
      optionName = "selectedItems";
    } else if (isOptionDefined("selectedItem")) {
      optionName = "selectedItem";
    } else if (isOptionDefined("selectedItemKeys")) {
      optionName = "selectedItemKeys";
    }
    return optionName;
  }
  _compareKeys(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    for (let i = 0; i < newKeys.length; i += 1) {
      if (oldKeys[i] !== newKeys[i]) {
        return false;
      }
    }
    return true;
  }
  _normalizeSelectedItems() {
    const {
      selectionMode,
      selectedItems = [],
      items
    } = this.option();
    if ("none" === selectionMode) {
      this._setOptionWithoutOptionChange("selectedItems", []);
      this._syncSelectionOptions("selectedItems");
    } else if ("single" === selectionMode) {
      const newSelection = selectedItems ?? [];
      const {
        selectionRequired
      } = this.option();
      if (newSelection.length > 1 || !newSelection.length && selectionRequired && null !== items && void 0 !== items && items.length) {
        const currentSelection = this._selection.getSelectedItems();
        let normalizedSelection = newSelection[0] ?? currentSelection[0];
        if (void 0 === normalizedSelection) {
          normalizedSelection = this._editStrategy.itemsGetter()[0];
        }
        const {
          grouped
        } = this.option();
        const hasSubItems = (item) => isObject(item) && "items" in item && Array.isArray(item.items);
        if (grouped && hasSubItems(normalizedSelection)) {
          normalizedSelection.items = [normalizedSelection.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
        this._setOptionWithoutOptionChange("selectedItems", [normalizedSelection]);
        return this._syncSelectionOptions("selectedItems");
      }
      this._selection.setSelection(this._getKeysByItems(newSelection));
    } else {
      const newKeys = this._getKeysByItems(selectedItems);
      const oldKeys = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(oldKeys, newKeys)) {
        this._selection.setSelection(newKeys);
      }
    }
    return Deferred().resolve();
  }
  _itemClickHandler(e, args, config) {
    let itemSelectPromise = Deferred().resolve();
    this._createAction(((event) => {
      itemSelectPromise = this._itemSelectHandler(event.event) ?? itemSelectPromise;
    }), {
      validatingTargetName: "itemElement"
    })({
      itemElement: renderer_default(e.currentTarget),
      event: e
    });
    itemSelectPromise.always((() => {
      super._itemClickHandler(e, args, config);
    }));
  }
  _itemSelectHandler(e, shouldIgnoreSelectByClick) {
    const {
      selectByClick
    } = this.option();
    if (!shouldIgnoreSelectByClick && !selectByClick) {
      return;
    }
    const $itemElement = e.currentTarget;
    if (this.isItemSelected($itemElement)) {
      this.unselectItem(e.currentTarget);
    } else {
      const itemSelectPromise = this.selectItem(e.currentTarget);
      return null === itemSelectPromise || void 0 === itemSelectPromise ? void 0 : itemSelectPromise.promise();
    }
  }
  _selectedItemElement(index) {
    return this._itemElements().eq(index);
  }
  _postprocessRenderItem(args) {
    const {
      selectionMode
    } = this.option();
    if ("none" !== selectionMode) {
      const $itemElement = renderer_default(args.itemElement);
      const normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement.get(0));
      const isItemSelected = this._isItemSelected(normalizedItemIndex);
      this._processSelectableItem($itemElement, isItemSelected);
    }
  }
  _processSelectableItem($itemElement, isSelected) {
    $itemElement.toggleClass(this._selectedItemClass(), isSelected);
    this._setAriaSelectionAttribute($itemElement, String(isSelected));
  }
  _updateSelectedItems(args) {
    const {
      addedItemKeys,
      removedItemKeys
    } = args;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      if (!this._rendering) {
        const addedSelection = [];
        const removedSelection = [];
        this._editStrategy.beginCache();
        for (let i = 0; i < addedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(addedItemKeys[i]);
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        for (let i = 0; i < removedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      this._actions.onSelectionChanged({
        addedItems: args.addedItems,
        removedItems: args.removedItems
      });
    }
  }
  _updateSelection(addedSelection, removedSelection) {
  }
  _setAriaSelectionAttribute($target, value) {
    this.setAria("selected", value, $target);
  }
  _getFocusedElementIndex() {
    const {
      focusOnSelectedItem
    } = this.option();
    return focusOnSelectedItem ? this._getFlatIndex() : super._getFocusedElementIndex();
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    return selectedIndex;
  }
  _removeSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, false);
      m_events_engine_default.triggerHandler($itemElement, "stateChanged", false);
    }
  }
  _addSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, true);
      m_events_engine_default.triggerHandler($itemElement, "stateChanged", true);
    }
  }
  _isItemSelected(index) {
    const key = this._getKeyByIndex(index);
    return this._selection.isItemSelected(key, {
      checkPending: true
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case "selectionMode":
        this._invalidate();
        break;
      case "dataSource":
        if (!args.value || Array.isArray(args.value) && !args.value.length) {
          this.option("selectedItemKeys", []);
        }
        super._optionChanged(args);
        break;
      case "selectedIndex":
      case "selectedItem":
      case "selectedItems":
      case "selectedItemKeys":
        this._syncSelectionOptions(args.name).done((() => {
          this._normalizeSelectedItems();
        }));
        break;
      case "keyExpr":
        this._initKeyGetter();
        break;
      case "selectionRequired":
        this._normalizeSelectedItems();
        break;
      case "onSelectionChanging":
      case "onSelectionChanged":
        this._initActions();
        break;
      case "selectByClick":
      case "onItemDeleting":
      case "onItemDeleted":
      case "onItemReordered":
      case "maxFilterLengthInRequest":
      case "focusOnSelectedItem":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearSelectedItems() {
    this._setOptionWithoutOptionChange("selectedItems", []);
    this._syncSelectionOptions("selectedItems");
  }
  _waitDeletingPrepare($itemElement) {
    if ($itemElement.data("dxItemDeleting")) {
      return Deferred().resolve().promise();
    }
    $itemElement.data("dxItemDeleting", true);
    const deferred = Deferred();
    const deletingActionArgs = {
      cancel: false
    };
    const deletePromise = this._itemEventHandler($itemElement, "onItemDeleting", deletingActionArgs, {
      excludeValidators: ["disabled", "readOnly"]
    });
    when(deletePromise).always((function(value) {
      const deletePromiseExists = !deletePromise;
      const deletePromiseResolved = !deletePromiseExists && "resolved" === deletePromise.state();
      const argumentsSpecified = !!arguments.length;
      const shouldDeleteImmediately = deletePromiseExists;
      const shouldDeleteWhenNoArgs = deletePromiseResolved && !argumentsSpecified;
      const shouldDeleteWithValue = deletePromiseResolved && value;
      const shouldDelete = shouldDeleteImmediately || shouldDeleteWhenNoArgs || shouldDeleteWithValue;
      when(fromPromise(deletingActionArgs.cancel)).always((() => {
        $itemElement.data("dxItemDeleting", false);
      })).done(((cancel) => {
        if (shouldDelete && !cancel) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })).fail(deferred.reject);
    }));
    return deferred.promise();
  }
  _deleteItemFromDS($item) {
    const dataController = this._dataController;
    const deferred = Deferred();
    const {
      disabled
    } = this.option();
    const dataStore = dataController.store();
    if (!dataStore) {
      return Deferred().resolve().promise();
    }
    if (!dataStore.remove) {
      throw ui_errors_default.Error("E1011");
    }
    this.option("disabled", true);
    dataStore.remove(dataController.keyOf(this._getItemData($item))).done(((key) => {
      if (void 0 !== key) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })).fail((() => {
      deferred.reject();
    }));
    deferred.always((() => {
      this.option("disabled", disabled);
    }));
    return deferred;
  }
  _tryRefreshLastPage() {
    const deferred = Deferred();
    const {
      grouped
    } = this.option();
    if (this._isLastPage() || grouped) {
      deferred.resolve();
    } else {
      this._refreshLastPage().done((() => {
        deferred.resolve();
      }));
    }
    return deferred.promise();
  }
  _refreshLastPage() {
    this._expectLastItemLoading();
    return this._dataController.load();
  }
  _updateSelectionAfterDelete(index) {
    const key = this._getKeyByIndex(index);
    this._selection.deselect([key]);
  }
  _updateIndicesAfterIndex(index) {
    const itemElements = this._itemElements();
    for (let i = index + 1; i < itemElements.length; i += 1) {
      renderer_default(itemElements[i]).data(this._itemIndexKey(), i - 1);
    }
  }
  _simulateOptionChange(optionName) {
    var _this$_optionChangedA;
    const optionValue = this.option(optionName);
    if (optionValue instanceof DataSource) {
      return;
    }
    null === (_this$_optionChangedA = this._optionChangedAction) || void 0 === _this$_optionChangedA || _this$_optionChangedA.call(this, {
      name: optionName,
      fullName: optionName,
      value: optionValue
    });
  }
  isItemSelected(itemElement) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement));
  }
  selectItem(itemElement) {
    const {
      selectionMode
    } = this.option();
    if ("none" === selectionMode) {
      return Deferred().resolve();
    }
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return Deferred().resolve();
    }
    const key = this._getKeyByIndex(itemIndex);
    if (this._selection.isItemSelected(key)) {
      return Deferred().resolve();
    }
    if ("single" === selectionMode) {
      return this._selection.setSelection([key]);
    }
    const {
      selectedItemKeys
    } = this.option();
    return this._selection.setSelection([...selectedItemKeys ?? [], key], [key]);
  }
  unselectItem(itemElement) {
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    const selectedItemKeys = this._selection.getSelectedItemKeys();
    const {
      selectionRequired
    } = this.option();
    if (selectionRequired && selectedItemKeys.length <= 1) {
      return;
    }
    const key = this._getKeyByIndex(itemIndex);
    if (!this._selection.isItemSelected(key, {
      checkPending: true
    })) {
      return;
    }
    this._selection.deselect([key]);
  }
  _deleteItemElementByIndex(index) {
    this._updateSelectionAfterDelete(index);
    this._updateIndicesAfterIndex(index);
    this._editStrategy.deleteItemAtIndex(index);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    const changingOption = this._dataController.getDataSource() ? "dataSource" : "items";
    this._simulateOptionChange(changingOption);
    this._itemEventHandler($item, "onItemDeleted", deletedActionArgs, {
      beforeExecute() {
        $item.remove();
      },
      excludeValidators: ["disabled", "readOnly"]
    });
    this._renderEmptyMessage();
  }
  deleteItem(itemElement) {
    const deferred = Deferred();
    const $item = this._editStrategy.getItemElement(itemElement);
    const index = this._editStrategy.getNormalizedIndex(itemElement);
    const itemResponseWaitClass = this._itemResponseWaitClass();
    if (indexExists(index)) {
      this._waitDeletingPrepare($item).done((() => {
        $item.addClass(itemResponseWaitClass);
        const deletedActionArgs = this._extendActionArgs($item);
        this._deleteItemFromDS($item).done((() => {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($item, deletedActionArgs);
          this._tryRefreshLastPage().done((() => {
            deferred.resolveWith(this);
          }));
        })).fail((() => {
          $item.removeClass(itemResponseWaitClass);
          deferred.rejectWith(this);
        }));
      })).fail((() => {
        deferred.rejectWith(this);
      }));
    } else {
      deferred.rejectWith(this);
    }
    return deferred.promise();
  }
  reorderItem(itemElement, toItemElement) {
    const deferred = Deferred();
    const strategy = this._editStrategy;
    const $movingItem = strategy.getItemElement(itemElement);
    const $destinationItem = strategy.getItemElement(toItemElement);
    const movingIndex = strategy.getNormalizedIndex(itemElement);
    const destinationIndex = strategy.getNormalizedIndex(toItemElement);
    const changingOption = this._dataController.getDataSource() ? "dataSource" : "items";
    const canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
    if (canMoveItems) {
      deferred.resolveWith(this);
    } else {
      deferred.rejectWith(this);
    }
    return deferred.promise().done((() => {
      $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
      strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
      this._updateIndicesAfterIndex(movingIndex);
      this.option("selectedItems", this._getItemsByKeys(this._selection.getSelectedItemKeys(), this._selection.getSelectedItems()));
      if ("items" === changingOption) {
        this._simulateOptionChange(changingOption);
      }
      this._itemEventHandler($movingItem, "onItemReordered", {
        fromIndex: strategy.getIndex(movingIndex),
        toIndex: strategy.getIndex(destinationIndex)
      }, {
        excludeValidators: ["disabled", "readOnly"]
      });
    }));
  }
};
CollectionWidget2._userOptions = {};
var collection_widget_edit_default = CollectionWidget2;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.async.js
var CollectionWidgetAsync = class extends collection_widget_edit_default {
  _initMarkup() {
    this._asyncTemplateItemsMap = {};
    super._initMarkup();
  }
  _render() {
    super._render();
    this._planPostRenderActions();
  }
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const itemDeferred = Deferred();
    const uniqueKey = `dx${new guid_default()}`;
    this._asyncTemplateItemsMap[uniqueKey] = itemDeferred;
    const $itemContent = super._renderItemContent(_extends({}, args, {
      uniqueKey
    }));
    itemDeferred.done((() => {
      renderContentDeferred.resolve($itemContent);
    }));
    return renderContentDeferred.promise();
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      const {
        uniqueKey
      } = renderArgs;
      if (uniqueKey) {
        var _this$_asyncTemplateI;
        null === (_this$_asyncTemplateI = this._asyncTemplateItemsMap[uniqueKey]) || void 0 === _this$_asyncTemplateI || _this$_asyncTemplateI.resolve();
      }
    };
  }
  _postProcessRenderItems() {
  }
  _planPostRenderActions() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const d = Deferred();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    when.apply(this, asyncTemplateItems).done((() => {
      this._postProcessRenderItems(...args);
      d.resolve().done((() => {
        this._asyncTemplateItemsMap = {};
      }));
    }));
    return d.promise();
  }
  _clean() {
    super._clean();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    asyncTemplateItems.forEach(((item) => {
      item.reject();
    }));
    this._asyncTemplateItemsMap = {};
  }
};
var collection_widget_async_default = CollectionWidgetAsync;

export {
  BindableTemplate,
  errors,
  errorHandler,
  handleError,
  setErrorHandler,
  XHR_ERROR_UNLOAD,
  normalizeBinaryCriterion,
  normalizeSortingInfo,
  errorMessageFromXhr,
  aggregators,
  isConjunctiveOperator,
  keysEqual,
  base64_encode,
  isUnaryOperation,
  createObjectWithChanges,
  applyBatch,
  applyChanges,
  update,
  insert,
  indexByKey,
  m_store_helper_default,
  m_abstract_store_default,
  m_custom_store_default,
  isLoadResultObject,
  isGroupItemsArray,
  isItemsArray,
  query_adapters_default,
  m_query_default,
  m_array_store_default,
  normalizeLoadResult,
  normalizeDataSourceOptions,
  DataSource,
  m_hold_default,
  name,
  m_data_controller_default,
  DataHelperMixin,
  m_data_helper_default,
  item_default,
  collection_widget_edit_strategy_plain_default,
  findChanges,
  SelectionFilterCreator,
  Selection,
  NOT_EXISTING_INDEX,
  indexExists,
  collection_widget_edit_default,
  collection_widget_async_default,
  resizeObserverSingleton,
  resize_observer_default
};
//# sourceMappingURL=chunk-LVWRVNT2.js.map
