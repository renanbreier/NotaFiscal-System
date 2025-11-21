import {
  scroll_view_default
} from "./chunk-HVLS2SHT.js";
import {
  deviceDependentOptions
} from "./chunk-UAVVJIMK.js";
import {
  BindableTemplate,
  DataSource,
  XHR_ERROR_UNLOAD,
  applyChanges,
  collection_widget_async_default,
  errorMessageFromXhr,
  errors,
  findChanges,
  handleError,
  indexByKey,
  insert,
  isConjunctiveOperator,
  isGroupItemsArray,
  isUnaryOperation,
  item_default,
  keysEqual,
  m_abstract_store_default,
  m_array_store_default,
  m_query_default,
  normalizeBinaryCriterion,
  query_adapters_default,
  update
} from "./chunk-LVWRVNT2.js";
import {
  button_default,
  getImageContainer,
  render2 as render
} from "./chunk-UBAWJAV5.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isMaterial,
  isMaterialBased
} from "./chunk-2D4FZXPO.js";
import {
  m_emitter_gesture_default
} from "./chunk-Q7DS2YG3.js";
import {
  CLICK_EVENT_NAME,
  addNamespace,
  eventData,
  fx_default,
  getPublicElement,
  m_emitter_registrator_default,
  m_pointer_default
} from "./chunk-ICLEXNO5.js";
import {
  devices_default,
  m_support_default
} from "./chunk-DONQLAZQ.js";
import {
  getHeight,
  getOuterHeight,
  getWidth,
  renderer_default,
  setHeight,
  titleize
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
  dom_adapter_default,
  each,
  ensureDefined,
  errors_default,
  extend,
  format,
  getWindow,
  grep,
  guid_default2 as guid_default,
  hasWindow,
  isDefined,
  isFunction,
  isObject,
  isPlainObject,
  map,
  noop,
  type,
  when
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/common/data/data_source.js
var data_source_default = DataSource;

// node_modules/devextreme/esm/common/data/apply_changes.js
var apply_changes_default = applyChanges;

// node_modules/devextreme/esm/__internal/data/m_endpoint_selector.js
var window = getWindow();
var IS_WINJS_ORIGIN;
var IS_LOCAL_ORIGIN;
function isLocalHostName(url) {
  return /^(localhost$|127\.)/i.test(url);
}
var EndpointSelector = function(config) {
  this.config = config;
  IS_WINJS_ORIGIN = "ms-appx:" === window.location.protocol;
  IS_LOCAL_ORIGIN = isLocalHostName(window.location.hostname);
};
EndpointSelector.prototype = {
  urlFor(key) {
    const bag = this.config[key];
    if (!bag) {
      throw errors_default.Error("E0006");
    }
    if (bag.production) {
      if (IS_WINJS_ORIGIN && !Debug.debuggerEnabled || !IS_WINJS_ORIGIN && !IS_LOCAL_ORIGIN) {
        return bag.production;
      }
    }
    return bag.local;
  }
};
var m_endpoint_selector_default = EndpointSelector;

// node_modules/devextreme/esm/__internal/data/m_local_store.js
var window2 = getWindow();
var LocalStoreBackend = class {
  constructor(store, storeOptions) {
    this._store = store;
    this._dirty = !!storeOptions.data;
    const {
      name
    } = storeOptions;
    if (!name) {
      throw errors.Error("E4013");
    }
    this._key = `dx-data-localStore-${name}`;
    this.save();
    const immediate = this._immediate = storeOptions.immediate;
    const flushInterval = Math.max(100, storeOptions.flushInterval || 1e4);
    if (!immediate) {
      const saveProxy = this.save.bind(this);
      setInterval(saveProxy, flushInterval);
      m_events_engine_default.on(window2, "beforeunload", saveProxy);
      if (window2.cordova) {
        dom_adapter_default.listen(dom_adapter_default.getDocument(), "pause", saveProxy, false);
      }
    }
  }
  notifyChanged() {
    this._dirty = true;
    if (this._immediate) {
      this.save();
    }
  }
  load() {
    this._store._array = this._loadImpl();
    this._dirty = false;
  }
  save() {
    if (!this._dirty) {
      return;
    }
    this._saveImpl(this._store._array);
    this._dirty = false;
  }
  _loadImpl() {
    const raw = window2.localStorage.getItem(this._key);
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  }
  _saveImpl(array) {
    if (!array.length) {
      window2.localStorage.removeItem(this._key);
    } else {
      window2.localStorage.setItem(this._key, JSON.stringify(array));
    }
  }
};
var LocalStore = class extends m_array_store_default {
  constructor(options) {
    if ("string" === typeof options) {
      options = {
        name: options
      };
    } else {
      options = options || {};
    }
    super(options);
    this._array = options.data || [];
    this._backend = new LocalStoreBackend(this, options);
    this._backend.load();
  }
  _clearCache() {
    this._backend.load();
  }
  clear() {
    super.clear();
    this._backend.notifyChanged();
  }
  _insertImpl(values) {
    const b = this._backend;
    return super._insertImpl(values).done(b.notifyChanged.bind(b));
  }
  _updateImpl(key, values) {
    const b = this._backend;
    return super._updateImpl(key, values).done(b.notifyChanged.bind(b));
  }
  _removeImpl(key) {
    const b = this._backend;
    return super._removeImpl(key).done(b.notifyChanged.bind(b));
  }
};
m_abstract_store_default.registerClass(LocalStore, "local");
var m_local_store_default = LocalStore;

// node_modules/devextreme/esm/__internal/data/odata/m_utils.js
var GUID_REGEX = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
var VERBOSE_DATE_REGEX = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
var ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
var JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";
var makeArray = (value) => "string" === type(value) ? value.split() : value;
var hasDot = (x) => /\./.test(x);
var pad = (text, length, right) => {
  text = String(text);
  while (text.length < length) {
    text = right ? `${text}0` : `0${text}`;
  }
  return text;
};
var formatISO8601 = (date, skipZeroTime, skipTimezone) => {
  const bag = [];
  const padLeft2 = (text) => pad(text, 2);
  bag.push(date.getFullYear());
  bag.push("-");
  bag.push(padLeft2(date.getMonth() + 1));
  bag.push("-");
  bag.push(padLeft2(date.getDate()));
  if (!(skipZeroTime && date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1)) {
    bag.push("T");
    bag.push(padLeft2(date.getHours()));
    bag.push(":");
    bag.push(padLeft2(date.getMinutes()));
    bag.push(":");
    bag.push(padLeft2(date.getSeconds()));
    if (date.getMilliseconds()) {
      bag.push(".");
      bag.push(pad(date.getMilliseconds(), 3));
    }
    if (!skipTimezone) {
      bag.push("Z");
    }
  }
  return bag.join("");
};
var parseISO8601 = (isoString) => {
  const result = new Date(60 * (/* @__PURE__ */ new Date(0)).getTimezoneOffset() * 1e3);
  const chunks = isoString.replace("Z", "").split("T");
  const date = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]);
  const time = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
  result.setFullYear(Number(date[1]));
  result.setMonth(Number(date[2]) - 1);
  result.setDate(Number(date[3]));
  if (Array.isArray(time) && time.length) {
    result.setHours(Number(time[1]));
    result.setMinutes(Number(time[2]));
    result.setSeconds(Number(time[3]));
    let fractional = (time[4] || "").slice(0, 3);
    fractional = pad(fractional, 3, true);
    result.setMilliseconds(Number(fractional));
  }
  return result;
};
var isAbsoluteUrl = (url) => /^(?:[a-z]+:)?\/{2,2}/i.test(url);
var stripParams = (url) => {
  const index = url.indexOf("?");
  if (index > -1) {
    return url.substr(0, index);
  }
  return url;
};
var toAbsoluteUrl = (basePath, relativePath) => {
  let part;
  const baseParts = stripParams(basePath).split("/");
  const relativeParts = relativePath.split("/");
  baseParts.pop();
  while (relativeParts.length) {
    part = relativeParts.shift();
    if (".." === part) {
      baseParts.pop();
    } else {
      baseParts.push(part);
    }
  }
  return baseParts.join("/");
};
var param = (params) => {
  const result = [];
  for (const name in params) {
    result.push(`${name}=${params[name]}`);
  }
  return result.join("&");
};
var ajaxOptionsForRequest = function(protocolVersion, request) {
  var _options$beforeSend;
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  request = extend({
    async: true,
    method: "get",
    url: "",
    params: {},
    payload: null,
    headers: {},
    timeout: 3e4
  }, request);
  null === (_options$beforeSend = options.beforeSend) || void 0 === _options$beforeSend || _options$beforeSend.call(options, request);
  const {
    async,
    timeout,
    headers
  } = request;
  let {
    url,
    method
  } = request;
  const {
    jsonp,
    withCredentials
  } = options;
  method = (method || "get").toLowerCase();
  const isGet = "get" === method;
  const useJsonp = isGet && jsonp;
  const params = extend({}, request.params);
  const ajaxData = isGet ? params : (payload = request.payload, JSON.stringify(payload, (function(key, value) {
    if (!(this[key] instanceof Date)) {
      return value;
    }
    value = formatISO8601(this[key]);
    switch (protocolVersion) {
      case 2:
        return value.substr(0, value.length - 1);
      case 3:
      case 4:
        return value;
      default:
        throw errors.Error("E4002");
    }
  })));
  var payload;
  const qs = !isGet && param(params);
  const contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
  if (qs) {
    url += (url.indexOf("?") > -1 ? "&" : "?") + qs;
  }
  if (useJsonp) {
    ajaxData.$format = "json";
  }
  return {
    url,
    data: ajaxData,
    dataType: useJsonp ? "jsonp" : "json",
    jsonp: useJsonp && "$callback",
    method,
    async,
    timeout,
    headers,
    contentType,
    accepts: {
      json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()
    },
    xhrFields: {
      withCredentials
    }
  };
};
var sendRequest = (protocolVersion, request, options) => {
  const {
    deserializeDates,
    fieldTypes,
    countOnly,
    isPaged
  } = options;
  const d = new Deferred();
  const ajaxOptions = ajaxOptionsForRequest(protocolVersion, request, options);
  ajax_default.sendRequest(ajaxOptions).always(((obj, textStatus) => {
    const transformOptions = {
      deserializeDates,
      fieldTypes
    };
    const tuple = interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions);
    const {
      error,
      data,
      count
    } = tuple;
    let {
      nextUrl
    } = tuple;
    if (error) {
      if (error.message !== XHR_ERROR_UNLOAD) {
        d.reject(error);
      }
    } else if (countOnly) {
      if (isFinite(count)) {
        d.resolve(count);
      } else {
        d.reject(errors.Error("E4018"));
      }
    } else if (nextUrl && !isPaged) {
      if (!isAbsoluteUrl(nextUrl)) {
        nextUrl = toAbsoluteUrl(ajaxOptions.url, nextUrl);
      }
      sendRequest(protocolVersion, {
        url: nextUrl
      }, options).fail(d.reject).done(((nextData) => d.resolve(data.concat(nextData))));
    } else {
      const extra = isFinite(count) ? {
        totalCount: count
      } : void 0;
      d.resolve(data, extra);
    }
  }));
  return d.promise();
};
var formatDotNetError = (errorObj) => {
  let message;
  let currentMessage;
  let currentError = errorObj;
  if ("message" in errorObj) {
    var _errorObj$message;
    message = (null === (_errorObj$message = errorObj.message) || void 0 === _errorObj$message ? void 0 : _errorObj$message.value) || errorObj.message;
  }
  while (currentError = currentError.innererror || currentError.internalexception) {
    currentMessage = currentError.message;
    message = currentMessage ?? message;
    if (currentError.internalexception && -1 === message.indexOf("inner exception")) {
      break;
    }
  }
  return message;
};
var errorFromResponse = (obj, textStatus, ajaxOptions) => {
  var _response, _response2, _response3, _response4;
  if ("nocontent" === textStatus) {
    return null;
  }
  let message = "Unknown error";
  let response = obj;
  let httpStatus = 200;
  const errorData = {
    requestOptions: ajaxOptions
  };
  if ("success" !== textStatus) {
    const {
      status,
      responseText
    } = obj;
    httpStatus = status;
    message = errorMessageFromXhr(obj, textStatus);
    try {
      response = JSON.parse(responseText);
    } catch (x) {
    }
  }
  const errorObj = (null === (_response = response) || void 0 === _response ? void 0 : _response.then) || (null === (_response2 = response) || void 0 === _response2 ? void 0 : _response2.error) || (null === (_response3 = response) || void 0 === _response3 ? void 0 : _response3["odata.error"]) || (null === (_response4 = response) || void 0 === _response4 ? void 0 : _response4["@odata.error"]);
  if (errorObj) {
    message = formatDotNetError(errorObj) || message;
    errorData.errorDetails = errorObj;
    if (200 === httpStatus) {
      httpStatus = 500;
    }
    const customCode = Number(errorObj.code);
    if (isFinite(customCode) && customCode >= 400) {
      httpStatus = customCode;
    }
  }
  if (httpStatus >= 400 || 0 === httpStatus) {
    errorData.httpStatus = httpStatus;
    return extend(Error(message), errorData);
  }
  return null;
};
var interpretJsonFormat = (obj, textStatus, transformOptions, ajaxOptions) => {
  const error = errorFromResponse(obj, textStatus, ajaxOptions);
  if (error) {
    return {
      error
    };
  }
  if (!isPlainObject(obj)) {
    return {
      data: obj
    };
  }
  const value = "d" in obj && (Array.isArray(obj.d) || isObject(obj.d)) ? interpretVerboseJsonFormat(obj) : interpretLightJsonFormat(obj);
  transformTypes(value, transformOptions);
  return value;
};
var interpretVerboseJsonFormat = (_ref) => {
  let {
    d: data
  } = _ref;
  if (!isDefined(data)) {
    return {
      error: Error("Malformed or unsupported JSON response received")
    };
  }
  return {
    data: data.results ?? data,
    nextUrl: data.__next,
    count: parseInt(data.__count, 10)
  };
};
var interpretLightJsonFormat = (obj) => ({
  data: obj.value ?? obj,
  nextUrl: obj["@odata.nextLink"],
  count: parseInt(obj["@odata.count"], 10)
});
var EdmLiteral = class_default.inherit({
  ctor(value) {
    this._value = value;
  },
  valueOf() {
    return this._value;
  }
});
var transformTypes = function(obj) {
  let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  each(obj, ((key, value) => {
    if (null !== value && "object" === typeof value) {
      if ("results" in value) {
        obj[key] = value.results;
      }
      transformTypes(obj[key], options);
    } else if ("string" === typeof value) {
      const {
        fieldTypes,
        deserializeDates
      } = options;
      const canBeGuid = !fieldTypes || "String" !== fieldTypes[key];
      if (canBeGuid && GUID_REGEX.test(value)) {
        obj[key] = new guid_default(value);
      }
      if (false !== deserializeDates) {
        if (VERBOSE_DATE_REGEX.exec(value)) {
          const date = new Date(Number(RegExp.$1) + 60 * RegExp.$2 * 1e3);
          obj[key] = new Date(date.valueOf() + 60 * date.getTimezoneOffset() * 1e3);
        } else if (ISO8601_DATE_REGEX.test(value)) {
          obj[key] = new Date(parseISO8601(obj[key]).valueOf());
        }
      }
    }
  }));
};
var serializeDate = (date) => `datetime'${formatISO8601(date, true, true)}'`;
var serializeString = (value) => `'${value.replace(/'/g, "''")}'`;
var serializePropName = (propName) => propName instanceof EdmLiteral ? propName.valueOf() : propName.replace(/\./g, "/");
var serializeValueV4 = (value) => {
  if (value instanceof Date) {
    return formatISO8601(value, false, false);
  }
  if (value instanceof guid_default) {
    return value.valueOf();
  }
  if (Array.isArray(value)) {
    return `[${value.map(((item) => serializeValueV4(item))).join(",")}]`;
  }
  return serializeValueV2(value);
};
var serializeValueV2 = (value) => {
  if (value instanceof Date) {
    return serializeDate(value);
  }
  if (value instanceof guid_default) {
    return `guid'${value}'`;
  }
  if (value instanceof EdmLiteral) {
    return value.valueOf();
  }
  if ("string" === typeof value) {
    return serializeString(value);
  }
  return String(value);
};
var serializeValue = (value, protocolVersion) => {
  switch (protocolVersion) {
    case 2:
    case 3:
      return serializeValueV2(value);
    case 4:
      return serializeValueV4(value);
    default:
      throw errors.Error("E4002");
  }
};
var serializeKey = (key, protocolVersion) => {
  if (isPlainObject(key)) {
    const parts = [];
    each(key, ((k, v) => parts.push(`${serializePropName(k)}=${serializeValue(v, protocolVersion)}`)));
    return parts.join();
  }
  return serializeValue(key, protocolVersion);
};
var keyConverters = {
  String: (value) => `${value}`,
  Int32: (value) => Math.floor(value),
  Int64: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}L`),
  Guid: (value) => value instanceof guid_default ? value : new guid_default(value),
  Boolean: (value) => !!value,
  Single: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}f`),
  Decimal: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}m`)
};
var convertPrimitiveValue = (type2, value) => {
  if (null === value) {
    return null;
  }
  const converter = keyConverters[type2];
  if (!converter) {
    throw errors.Error("E4014", type2);
  }
  return converter(value);
};
var generateSelect = (oDataVersion, select) => {
  if (!select) {
    return;
  }
  return oDataVersion < 4 ? serializePropName(select.join()) : grep(select, hasDot, true).join();
};
var formatCore = (hash) => {
  let result = "";
  const selectValue = [];
  const expandValue = [];
  each(hash, ((key, value) => {
    if (Array.isArray(value)) {
      [].push.apply(selectValue, value);
    }
    if (isPlainObject(value)) {
      expandValue.push(`${key}${formatCore(value)}`);
    }
  }));
  if (selectValue.length || expandValue.length) {
    result += "(";
    if (selectValue.length) {
      result += `$select=${map(selectValue, serializePropName).join()}`;
    }
    if (expandValue.length) {
      if (selectValue.length) {
        result += ";";
      }
      result += `$expand=${map(expandValue, serializePropName).join()}`;
    }
    result += ")";
  }
  return result;
};
var format2 = (hash) => {
  const result = [];
  each(hash, ((key, value) => result.push(`${key}${formatCore(value)}`)));
  return result.join();
};
var parseCore = (exprParts, root, stepper) => {
  const result = stepper(root, exprParts.shift(), exprParts);
  if (false === result) {
    return;
  }
  parseCore(exprParts, result, stepper);
};
var parseTree = (exprs, root, stepper) => each(exprs, ((_, x) => parseCore(x.split("."), root, stepper)));
var generatorV2 = (expand, select) => {
  const hash = {};
  if (expand) {
    each(makeArray(expand), (function() {
      hash[serializePropName(this)] = 1;
    }));
  }
  if (select) {
    each(makeArray(select), (function() {
      const path = this.split(".");
      if (path.length < 2) {
        return;
      }
      path.pop();
      hash[serializePropName(path.join("."))] = 1;
    }));
  }
  return map(hash, ((_, v) => v)).join();
};
var generatorV4 = (expand, select) => {
  const hash = {};
  if (expand || select) {
    if (expand) {
      parseTree(makeArray(expand), hash, ((node, key, path) => {
        node[key] = node[key] || {};
        return !path.length ? false : node[key];
      }));
    }
    if (select) {
      parseTree(grep(makeArray(select), hasDot), hash, ((node, key, path) => {
        if (!path.length) {
          node[key] = node[key] || [];
          node[key].push(key);
          return false;
        }
        return node[key] = node[key] || {};
      }));
    }
    return format2(hash);
  }
};
var generateExpand = (oDataVersion, expand, select) => oDataVersion < 4 ? generatorV2(expand, select) : generatorV4(expand, select);
var formatFunctionInvocationUrl = (baseUrl, args) => format("{0}({1})", baseUrl, map(args || {}, ((value, key) => format("{0}={1}", key, value))).join(","));
var escapeServiceOperationParams = (params, version) => {
  if (!params) {
    return params;
  }
  const result = {};
  each(params, ((k, v) => {
    result[k] = serializeValue(v, version);
  }));
  return result;
};

// node_modules/devextreme/esm/__internal/data/odata/m_query_adapter.js
var STRING_FUNCTIONS = ["contains", "notcontains", "startswith", "endswith"];
var compileCriteria = (() => {
  let protocolVersion;
  let forceLowerCase;
  let fieldTypes;
  const createBinaryOperationFormatter = (op) => (prop, val) => `${prop} ${op} ${val}`;
  const createStringFuncFormatter = (op, reverse) => (prop, val) => {
    const bag = [op, "("];
    if (forceLowerCase) {
      prop = -1 === prop.indexOf("tolower(") ? `tolower(${prop})` : prop;
      val = val.toLowerCase();
    }
    if (reverse) {
      bag.push(val, ",", prop);
    } else {
      bag.push(prop, ",", val);
    }
    bag.push(")");
    return bag.join("");
  };
  const formatters = {
    "=": createBinaryOperationFormatter("eq"),
    "<>": createBinaryOperationFormatter("ne"),
    ">": createBinaryOperationFormatter("gt"),
    ">=": createBinaryOperationFormatter("ge"),
    "<": createBinaryOperationFormatter("lt"),
    "<=": createBinaryOperationFormatter("le"),
    startswith: createStringFuncFormatter("startswith"),
    endswith: createStringFuncFormatter("endswith")
  };
  const formattersV2 = extend({}, formatters, {
    contains: createStringFuncFormatter("substringof", true),
    notcontains: createStringFuncFormatter("not substringof", true)
  });
  const formattersV4 = extend({}, formatters, {
    contains: createStringFuncFormatter("contains"),
    notcontains: createStringFuncFormatter("not contains")
  });
  const compileBinary = (criteria) => {
    var _fieldTypes;
    criteria = normalizeBinaryCriterion(criteria);
    const op = criteria[1];
    const fieldName = criteria[0];
    const fieldType = fieldTypes && fieldTypes[fieldName];
    if (fieldType && (name = op, STRING_FUNCTIONS.some(((funcName) => funcName === name))) && "String" !== fieldType) {
      throw new errors.Error("E4024", op, fieldName, fieldType);
    }
    var name;
    const formatters2 = 4 === protocolVersion ? formattersV4 : formattersV2;
    const formatter = formatters2[op.toLowerCase()];
    if (!formatter) {
      throw errors.Error("E4003", op);
    }
    let value = criteria[2];
    if (null !== (_fieldTypes = fieldTypes) && void 0 !== _fieldTypes && _fieldTypes[fieldName]) {
      value = convertPrimitiveValue(fieldTypes[fieldName], value);
    }
    return formatter(serializePropName(fieldName), serializeValue(value, protocolVersion));
  };
  const compileGroup = (criteria) => {
    const bag = [];
    let groupOperator;
    let nextGroupOperator;
    each(criteria, (function(index, criterion) {
      if (Array.isArray(criterion)) {
        if (bag.length > 1 && groupOperator !== nextGroupOperator) {
          throw new errors.Error("E4019");
        }
        bag.push(`(${compileCore(criterion)})`);
        groupOperator = nextGroupOperator;
        nextGroupOperator = "and";
      } else {
        nextGroupOperator = isConjunctiveOperator(this) ? "and" : "or";
      }
    }));
    return bag.join(` ${groupOperator} `);
  };
  const compileCore = (criteria) => {
    if (Array.isArray(criteria[0])) {
      return compileGroup(criteria);
    }
    if (isUnaryOperation(criteria)) {
      return ((criteria2) => {
        const op = criteria2[0];
        const crit = compileCore(criteria2[1]);
        if ("!" === op) {
          return `not (${crit})`;
        }
        throw errors.Error("E4003", op);
      })(criteria);
    }
    return compileBinary(criteria);
  };
  return (criteria, version, types, filterToLower) => {
    fieldTypes = types;
    forceLowerCase = filterToLower ?? config_default().oDataFilterToLower;
    protocolVersion = version;
    return compileCore(criteria);
  };
})();
var createODataQueryAdapter = (queryOptions) => {
  let _sorting = [];
  const _criteria = [];
  const _expand = queryOptions.expand;
  let _select;
  let _skip;
  let _take;
  let _countQuery;
  const _oDataVersion = queryOptions.version || 4;
  const hasSlice = () => _skip || void 0 !== _take;
  const hasFunction = (criterion) => {
    for (let i = 0; i < criterion.length; i++) {
      if (isFunction(criterion[i])) {
        return true;
      }
      if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
        return true;
      }
    }
    return false;
  };
  const requestData = () => {
    const result = {};
    if (!_countQuery) {
      if (_sorting.length) {
        result.$orderby = _sorting.join(",");
      }
      if (_skip) {
        result.$skip = _skip;
      }
      if (void 0 !== _take) {
        result.$top = _take;
      }
      result.$select = generateSelect(_oDataVersion, _select) || void 0;
      result.$expand = generateExpand(_oDataVersion, _expand, _select) || void 0;
    }
    if (_criteria.length) {
      const criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
      const fieldTypes = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.fieldTypes;
      const filterToLower = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.filterToLower;
      result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower);
    }
    if (_countQuery) {
      result.$top = 0;
    }
    if (queryOptions.requireTotalCount || _countQuery) {
      if (4 !== _oDataVersion) {
        result.$inlinecount = "allpages";
      } else {
        result.$count = "true";
      }
    }
    return result;
  };
  return {
    optimize: (tasks) => {
      let selectIndex = -1;
      for (let i = 0; i < tasks.length; i++) {
        if ("select" === tasks[i].name) {
          selectIndex = i;
          break;
        }
      }
      if (selectIndex < 0 || !isFunction(tasks[selectIndex].args[0])) {
        return;
      }
      const nextTask = tasks[1 + selectIndex];
      if (!nextTask || "slice" !== nextTask.name) {
        return;
      }
      tasks[1 + selectIndex] = tasks[selectIndex];
      tasks[selectIndex] = nextTask;
    },
    exec: (url) => sendRequest(_oDataVersion, {
      url,
      params: extend(requestData(), null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.params)
    }, {
      beforeSend: queryOptions.beforeSend,
      jsonp: queryOptions.jsonp,
      withCredentials: queryOptions.withCredentials,
      countOnly: _countQuery,
      deserializeDates: queryOptions.deserializeDates,
      fieldTypes: queryOptions.fieldTypes,
      isPaged: isFinite(_take)
    }),
    multiSort(args) {
      let rules;
      if (hasSlice()) {
        return false;
      }
      for (let i = 0; i < args.length; i++) {
        const getter = args[i][0];
        const desc = !!args[i][1];
        let rule;
        if ("string" !== typeof getter) {
          return false;
        }
        rule = serializePropName(getter);
        if (desc) {
          rule += " desc";
        }
        rules = rules || [];
        rules.push(rule);
      }
      _sorting = rules;
    },
    slice(skipCount, takeCount) {
      if (hasSlice()) {
        return false;
      }
      _skip = skipCount;
      _take = takeCount;
    },
    filter(criterion) {
      if (hasSlice()) {
        return false;
      }
      if (!Array.isArray(criterion)) {
        criterion = [].slice.call(arguments);
      }
      if (hasFunction(criterion)) {
        return false;
      }
      if (_criteria.length) {
        _criteria.push("and");
      }
      _criteria.push(criterion);
    },
    select(expr) {
      if (_select || isFunction(expr)) {
        return false;
      }
      if (!Array.isArray(expr)) {
        expr = [].slice.call(arguments);
      }
      _select = expr;
    },
    count: () => _countQuery = true
  };
};
query_adapters_default.odata = createODataQueryAdapter;

// node_modules/devextreme/esm/__internal/data/odata/m_request_dispatcher.js
var RequestDispatcher = class {
  constructor(options) {
    options = options || {};
    this._url = String(options.url).replace(/\/+$/, "");
    this._beforeSend = options.beforeSend;
    this._jsonp = options.jsonp;
    this._version = options.version || 4;
    this._withCredentials = options.withCredentials;
    this._deserializeDates = options.deserializeDates;
    this._filterToLower = options.filterToLower;
  }
  sendRequest(url, method, params, payload) {
    return sendRequest(this.version, {
      url,
      method,
      params: params || {},
      payload
    }, {
      beforeSend: this._beforeSend,
      jsonp: this._jsonp,
      withCredentials: this._withCredentials,
      deserializeDates: this._deserializeDates
    });
  }
  get version() {
    return this._version;
  }
  get beforeSend() {
    return this._beforeSend;
  }
  get url() {
    return this._url;
  }
  get jsonp() {
    return this._jsonp;
  }
  get filterToLower() {
    return this._filterToLower;
  }
};

// node_modules/devextreme/esm/__internal/data/odata/m_store.js
var ANONYMOUS_KEY_NAME = "5d46402c-7899-4ea9-bd81-8b73c47c7683";
var expandKeyType = (key, keyType) => ({
  [key]: keyType
});
var mergeFieldTypesWithKeyType = (fieldTypes, keyType) => {
  const result = {};
  for (const field in fieldTypes) {
    result[field] = fieldTypes[field];
  }
  for (const keyName in keyType) {
    if (keyName in result) {
      if (result[keyName] !== keyType[keyName]) {
        errors.log("W4001", keyName);
      }
    } else {
      result[keyName] = keyType[keyName];
    }
  }
  return result;
};
var ODataStore = m_abstract_store_default.inherit({
  ctor(options) {
    this.callBase(options);
    this._requestDispatcher = new RequestDispatcher(options);
    let key = this.key();
    let {
      fieldTypes
    } = options;
    let {
      keyType
    } = options;
    if (keyType) {
      const keyTypeIsString = "string" === typeof keyType;
      if (!key) {
        key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
        this._legacyAnonymousKey = key;
      }
      if (keyTypeIsString) {
        keyType = expandKeyType(key, keyType);
      }
      fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType);
    }
    this._fieldTypes = fieldTypes || {};
    if (2 === this.version()) {
      this._updateMethod = "MERGE";
    } else {
      this._updateMethod = "PATCH";
    }
  },
  _customLoadOptions: () => ["expand", "customQueryParams"],
  _byKeyImpl(key, extraOptions) {
    const params = {};
    if (extraOptions) {
      params.$expand = generateExpand(this.version(), extraOptions.expand, extraOptions.select) || void 0;
      params.$select = generateSelect(this.version(), extraOptions.select) || void 0;
    }
    return this._requestDispatcher.sendRequest(this._byKeyUrl(key), "GET", params);
  },
  createQuery(loadOptions) {
    let url;
    const queryOptions = {
      adapter: "odata",
      beforeSend: this._requestDispatcher.beforeSend,
      errorHandler: this._errorHandler,
      jsonp: this._requestDispatcher.jsonp,
      version: this._requestDispatcher.version,
      withCredentials: this._requestDispatcher._withCredentials,
      expand: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.expand,
      requireTotalCount: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.requireTotalCount,
      deserializeDates: this._requestDispatcher._deserializeDates,
      fieldTypes: this._fieldTypes
    };
    url = (null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.urlOverride) ?? this._requestDispatcher.url;
    if (isDefined(this._requestDispatcher.filterToLower)) {
      queryOptions.filterToLower = this._requestDispatcher.filterToLower;
    }
    if (null !== loadOptions && void 0 !== loadOptions && loadOptions.customQueryParams) {
      const params = escapeServiceOperationParams(null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.customQueryParams, this.version());
      if (4 === this.version()) {
        url = formatFunctionInvocationUrl(url, params);
      } else {
        queryOptions.params = params;
      }
    }
    return m_query_default(url, queryOptions);
  },
  _insertImpl(values) {
    this._requireKey();
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._requestDispatcher.url, "POST", null, values)).done(((serverResponse) => d.resolve(serverResponse && !config_default().useLegacyStoreResult ? serverResponse : values, this.keyOf(serverResponse)))).fail(d.reject);
    return d.promise();
  },
  _updateImpl(key, values) {
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done(((serverResponse) => config_default().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key))).fail(d.reject);
    return d.promise();
  },
  _removeImpl(key) {
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), "DELETE")).done((() => d.resolve(key))).fail(d.reject);
    return d.promise();
  },
  _convertKey(value) {
    let result = value;
    const fieldTypes = this._fieldTypes;
    const key = this.key() || this._legacyAnonymousKey;
    if (Array.isArray(key)) {
      result = {};
      for (let i = 0; i < key.length; i++) {
        const keyName = key[i];
        result[keyName] = convertPrimitiveValue(fieldTypes[keyName], value[keyName]);
      }
    } else if (fieldTypes[key]) {
      result = convertPrimitiveValue(fieldTypes[key], value);
    }
    return result;
  },
  _byKeyUrl(value) {
    const baseUrl = this._requestDispatcher.url;
    const convertedKey = this._convertKey(value);
    return `${baseUrl}(${encodeURIComponent(serializeKey(convertedKey, this.version()))})`;
  },
  version() {
    return this._requestDispatcher.version;
  }
}, "odata");
var m_store_default = ODataStore;

// node_modules/devextreme/esm/__internal/data/odata/m_context.js
var ODataContext = class_default.inherit({
  ctor(options) {
    this._requestDispatcher = new RequestDispatcher(options);
    this._errorHandler = options.errorHandler;
    each(options.entities || [], ((entityAlias, entityOptions) => {
      this[entityAlias] = new m_store_default(extend({}, options, {
        url: `${this._requestDispatcher.url}/${encodeURIComponent(entityOptions.name || entityAlias)}`
      }, entityOptions));
    }));
  },
  get(operationName, params) {
    return this.invoke(operationName, params, "GET");
  },
  invoke(operationName) {
    let params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let httpMethod = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
    httpMethod = httpMethod.toLowerCase();
    const d = new Deferred();
    let url = `${this._requestDispatcher.url}/${encodeURIComponent(operationName)}`;
    let payload;
    if (4 === this.version()) {
      if ("get" === httpMethod) {
        url = formatFunctionInvocationUrl(url, escapeServiceOperationParams(params, this.version()));
        params = null;
      } else if ("post" === httpMethod) {
        payload = params;
        params = null;
      }
    }
    when(this._requestDispatcher.sendRequest(url, httpMethod, escapeServiceOperationParams(params, this.version()), payload)).done(((r) => {
      if (isPlainObject(r) && operationName in r) {
        r = r[operationName];
      }
      d.resolve(r);
    })).fail(this._errorHandler).fail(handleError).fail(d.reject);
    return d.promise();
  },
  objectLink(entityAlias, key) {
    const store = this[entityAlias];
    if (!store) {
      throw errors.Error("E4015", entityAlias);
    }
    if (!isDefined(key)) {
      return null;
    }
    return {
      __metadata: {
        uri: store._byKeyUrl(key)
      }
    };
  },
  version() {
    return this._requestDispatcher.version;
  }
});
var m_context_default = ODataContext;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.live_update.js
var PRIVATE_KEY_FIELD = "__dx_key__";
var CollectionWidgetLiveUpdate = class extends collection_widget_async_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      repaintChangesOnly: false
    });
  }
  reload() {
  }
  _init() {
    super._init();
    this._refreshItemsCache();
  }
  _findItemElementByKey(key) {
    let result = renderer_default();
    const keyExpr = this.key();
    this.itemElements().each(((_, item) => {
      const $item = renderer_default(item);
      const itemData = this._getItemData($item);
      if (keyExpr ? keysEqual(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
        result = $item;
        return false;
      }
      return true;
    }));
    return result;
  }
  _dataSourceChangedHandler(newItems, e) {
    if (null !== e && void 0 !== e && e.changes) {
      this._modifyByChanges(e.changes);
    } else {
      super._dataSourceChangedHandler(newItems, e);
      this._refreshItemsCache();
    }
  }
  _isItemEquals(item1, item2) {
    let itemToCompare = item1;
    if (item1 && "object" === typeof item1 && item1.__dx_key__) {
      itemToCompare = item1.data;
    }
    try {
      return JSON.stringify(itemToCompare) === JSON.stringify(item2);
    } catch (e) {
      return itemToCompare === item2;
    }
  }
  _isItemStrictEquals(item1, item2) {
    return this._isItemEquals(item1, item2);
  }
  _shouldAddNewGroup(changes, items) {
    let result = false;
    const {
      grouped
    } = this.option();
    if (grouped) {
      if (!changes.length) {
        result = true;
      }
      each(changes, ((i, change) => {
        if ("insert" === change.type) {
          result = true;
          each(items, ((_, item) => {
            if (void 0 !== change.data.key && change.data.key === item.key) {
              result = false;
              return false;
            }
            return true;
          }));
        }
      }));
    }
    return result;
  }
  _partialRefresh() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const keyOf = (data) => {
        if (data && void 0 !== data.__dx_key__) {
          return data.__dx_key__;
        }
        return this.keyOf(data);
      };
      const result = findChanges({
        oldItems: this._itemsCache,
        newItems: this._editStrategy.itemsGetter(),
        getKey: keyOf,
        isItemEquals: this._isItemStrictEquals.bind(this),
        detectReorders: true
      });
      if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
        this._modifyByChanges(result, true);
        this._renderEmptyMessage();
        return true;
      }
      this._refreshItemsCache();
    }
    return false;
  }
  _refreshItemsCache() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const items = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = extend(true, [], items);
        if (!this.key()) {
          this._itemsCache = this._itemsCache.map(((itemCache, index) => ({
            [PRIVATE_KEY_FIELD]: items[index],
            data: itemCache
          })));
        }
      } catch (e) {
        this._itemsCache = extend([], items);
      }
    }
  }
  _updateByChange(keyInfo, items, change, isPartialRefresh) {
    if (isPartialRefresh) {
      this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
    } else {
      const changedItem = items[indexByKey(keyInfo, items, change.key)];
      if (changedItem) {
        update(keyInfo, items, change.key, change.data).done((() => {
          this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key));
        }));
      }
    }
  }
  _insertByChange(keyInfo, items, change, isPartialRefresh) {
    when(isPartialRefresh ?? insert(keyInfo, items, change.data, change.index)).done((() => {
      this._beforeItemElementInserted(change);
      this._renderItem(change.index ?? items.length, change.data);
      this._afterItemElementInserted();
    }));
  }
  _updateSelectionAfterRemoveByChange(removeIndex) {
    const {
      selectedIndex,
      selectedItems = []
    } = this.option();
    const index = selectedIndex;
    if (index > removeIndex) {
      this.option("selectedIndex", index - 1);
    } else if (index === removeIndex && 1 === selectedItems.length) {
      this.option("selectedItems", []);
    } else {
      this._normalizeSelectedItems();
    }
  }
  _beforeItemElementInserted(change) {
    const {
      selectedIndex
    } = this.option();
    const index = selectedIndex;
    if (change.index <= index) {
      this.option("selectedIndex", index + 1);
    }
  }
  _afterItemElementInserted() {
    this._renderEmptyMessage();
  }
  _removeByChange(keyInfo, items, change, isPartialRefresh) {
    const index = isPartialRefresh ? change.index : indexByKey(keyInfo, items, change.key);
    const removedItem = isPartialRefresh ? change.oldItem : items[index];
    if (removedItem) {
      const $removedItemElement = this._findItemElementByKey(change.key);
      const deletedActionArgs = this._extendActionArgs($removedItemElement);
      this._waitDeletingPrepare($removedItemElement).done((() => {
        if (isPartialRefresh) {
          this._updateIndicesAfterIndex(index - 1);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
          this._updateSelectionAfterRemoveByChange(index);
        } else {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
        }
      }));
    }
  }
  _modifyByChanges(changes, isPartialRefresh) {
    const items = this._editStrategy.itemsGetter();
    const keyInfo = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    const dataController = this._dataController;
    const paginate = dataController.paginate();
    const group = dataController.group();
    let filteredChanges = changes;
    if (paginate || group) {
      filteredChanges = changes.filter(((item) => "insert" !== item.type || void 0 !== item.index));
    }
    filteredChanges.forEach(((change) => this[`_${change.type}ByChange`](keyInfo, items, change, isPartialRefresh)));
    this._renderedItemsCount = items.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  }
  _appendItemToContainer($container, $itemFrame, index) {
    const nextSiblingElement = $container.children(this._itemSelector())[index];
    dom_adapter_default.insertElement($container[0], $itemFrame[0], nextSiblingElement);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "items": {
        const isItemsUpdated = this._partialRefresh();
        if (!isItemsUpdated) {
          super._optionChanged(args);
        }
        break;
      }
      case "dataSource": {
        const {
          repaintChangesOnly
        } = this.option();
        if (!repaintChangesOnly || !value) {
          this.option("items", []);
        }
        super._optionChanged(args);
        break;
      }
      case "repaintChangesOnly":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var collection_widget_live_update_default = CollectionWidgetLiveUpdate;

// node_modules/devextreme/esm/__internal/events/m_swipe.js
var SWIPE_START_EVENT = "dxswipestart";
var SWIPE_EVENT = "dxswipe";
var SWIPE_END_EVENT = "dxswipeend";
var HorizontalStrategy = {
  defaultItemSizeFunc() {
    return getWidth(this.getElement());
  },
  getBounds() {
    return [this._maxLeftOffset, this._maxRightOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = eventData(e);
    return (endEventData.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = eventData(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time;
  }
};
var VerticalStrategy = {
  defaultItemSizeFunc() {
    return getHeight(this.getElement());
  },
  getBounds() {
    return [this._maxTopOffset, this._maxBottomOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = eventData(e);
    return (endEventData.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = eventData(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time;
  }
};
var STRATEGIES = {
  horizontal: HorizontalStrategy,
  vertical: VerticalStrategy
};
var SwipeEmitter = m_emitter_gesture_default.inherit({
  TICK_INTERVAL: 300,
  FAST_SWIPE_SPEED_LIMIT: 10,
  ctor(element) {
    this.callBase(element);
    this.direction = "horizontal";
    this.elastic = true;
  },
  _getStrategy() {
    return STRATEGIES[this.direction];
  },
  _defaultItemSizeFunc() {
    return this._getStrategy().defaultItemSizeFunc.call(this);
  },
  _itemSizeFunc() {
    return this.itemSizeFunc || this._defaultItemSizeFunc;
  },
  _init(e) {
    this._tickData = eventData(e);
  },
  _start(e) {
    this._savedEventData = eventData(e);
    e = this._fireEvent("dxswipestart", e);
    if (!e.cancel) {
      this._maxLeftOffset = e.maxLeftOffset;
      this._maxRightOffset = e.maxRightOffset;
      this._maxTopOffset = e.maxTopOffset;
      this._maxBottomOffset = e.maxBottomOffset;
    }
  },
  _move(e) {
    const strategy = this._getStrategy();
    const moveEventData = eventData(e);
    let offset = strategy.calcOffsetRatio.call(this, e);
    offset = this._fitOffset(offset, this.elastic);
    if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL) {
      this._tickData = moveEventData;
    }
    this._fireEvent("dxswipe", e, {
      offset
    });
    if (false !== e.cancelable) {
      e.preventDefault();
    }
  },
  _end(e) {
    const strategy = this._getStrategy();
    const offsetRatio = strategy.calcOffsetRatio.call(this, e);
    const isFast = strategy.isFastSwipe.call(this, e);
    let startOffset = offsetRatio;
    let targetOffset = this._calcTargetOffset(offsetRatio, isFast);
    startOffset = this._fitOffset(startOffset, this.elastic);
    targetOffset = this._fitOffset(targetOffset, false);
    this._fireEvent("dxswipeend", e, {
      offset: startOffset,
      targetOffset
    });
  },
  _fitOffset(offset, elastic) {
    const strategy = this._getStrategy();
    const bounds = strategy.getBounds.call(this);
    if (offset < -bounds[0]) {
      return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0];
    }
    if (offset > bounds[1]) {
      return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1];
    }
    return offset;
  },
  _calcTargetOffset(offsetRatio, isFast) {
    let result;
    if (isFast) {
      result = Math.ceil(Math.abs(offsetRatio));
      if (offsetRatio < 0) {
        result = -result;
      }
    } else {
      result = Math.round(offsetRatio);
    }
    return result;
  }
});
m_emitter_registrator_default({
  emitter: SwipeEmitter,
  events: ["dxswipestart", "dxswipe", "dxswipeend"]
});

// node_modules/devextreme/esm/__internal/data/data_converter/grouped.js
function getDataSourceOptions(dataSource) {
  if (!isGroupItemsArray(dataSource)) {
    return dataSource;
  }
  let hasSimpleItems = false;
  const data = dataSource.reduce(((accumulator, item) => {
    var _item$items;
    const items = (null === (_item$items = item.items) || void 0 === _item$items ? void 0 : _item$items.map(((value) => {
      let innerItem = value;
      if (!isObject(innerItem)) {
        innerItem = {
          text: innerItem
        };
        hasSimpleItems = true;
      }
      const objectItem = innerItem;
      if (!("key" in objectItem)) {
        objectItem.key = item.key;
      }
      return objectItem;
    }))) ?? [];
    return accumulator.concat(items);
  }), []);
  return {
    store: {
      type: "array",
      data
    },
    group: {
      selector: "key",
      keepInitialKeyOrder: true
    },
    searchExpr: hasSimpleItems ? "text" : void 0
  };
}

// node_modules/devextreme/esm/__internal/ui/list/item.js
var ListItem = class extends item_default {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher("badge", this._renderBadge.bind(this));
    this._startWatcher("showChevron", this._renderShowChevron.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(".dx-list-item-badge-container").remove();
    if (!badge) {
      return;
    }
    const $badge = renderer_default("<div>").addClass("dx-list-item-badge-container").append(renderer_default("<div>").addClass("dx-list-item-badge").addClass("dx-badge").text(badge));
    const $chevron = this._$element.children(".dx-list-item-chevron-container").first();
    if ($chevron.length > 0) {
      $badge.insertBefore($chevron);
    } else {
      $badge.appendTo(this._$element);
    }
  }
  _renderShowChevron(showChevron) {
    this._$element.children(".dx-list-item-chevron-container").remove();
    if (!showChevron) {
      return;
    }
    const $chevronContainer = renderer_default("<div>").addClass("dx-list-item-chevron-container");
    const $chevron = renderer_default("<div>").addClass("dx-list-item-chevron");
    $chevronContainer.append($chevron).appendTo(this._$element);
  }
};
var item_default2 = ListItem;

// node_modules/devextreme/esm/__internal/utils/type_conversion.js
function toNumber(attribute) {
  return attribute ? Number(attribute.replace("px", "")) : 0;
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_element_style.js
function getElementStyle(el) {
  var _getWindow$getCompute, _getWindow;
  return el && hasWindow() ? null === (_getWindow$getCompute = (_getWindow = getWindow()).getComputedStyle) || void 0 === _getWindow$getCompute ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null;
}
function getElementMargin(element, side) {
  const style = getElementStyle(element);
  return style ? toNumber(style[`margin${titleize(side)}`]) : 0;
}

// node_modules/devextreme/esm/__internal/ui/list/list.base.js
var LIST_SELECT_CHECKBOX = "dx-list-select-checkbox";
var LIST_SELECT_RADIOBUTTON = "dx-list-select-radiobutton";
var _scrollView = null;
function getScrollView() {
  return _scrollView ?? scroll_view_default;
}
var ListBase = class extends collection_widget_live_update_default {
  _feedbackShowTimeout() {
    return 70;
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      leftArrow: noop,
      rightArrow: noop,
      pageUp(e) {
        this._moveFocusPerPage(e, "prev");
      },
      pageDown(e) {
        this._moveFocusPerPage(e, "next");
      }
    });
  }
  _moveFocusPerPage(e, direction) {
    if (this._isLastItemFocused(direction)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    let $item = this._getEdgeVisibleItem(direction);
    const {
      focusedElement
    } = this.option();
    const isFocusedItem = $item.is(renderer_default(focusedElement));
    if (isFocusedItem) {
      this.scrollTo(this._getItemLocation($item, direction));
      $item = this._getEdgeVisibleItem(direction);
    }
    this.option("focusedElement", getPublicElement($item));
    this.scrollToItem($item);
  }
  _isLastItemFocused(direction) {
    const lastItemInDirection = "prev" === direction ? this._itemElements().first() : this._itemElements().last();
    const {
      focusedElement
    } = this.option();
    return lastItemInDirection.is(renderer_default(focusedElement));
  }
  _getNextItem($item, direction) {
    const $items = this._getAvailableItems();
    const itemIndex = $items.index($item);
    if ("prev" === direction) {
      return renderer_default($items[itemIndex - 1]);
    }
    return renderer_default($items[itemIndex + 1]);
  }
  _getEdgeVisibleItem(direction) {
    const scrollTop = this.scrollTop();
    const containerHeight = getHeight(this.$element());
    const {
      focusedElement
    } = this.option();
    let $item = renderer_default(focusedElement);
    let isItemVisible = true;
    if (!$item.length) {
      return renderer_default();
    }
    while (isItemVisible) {
      var _$nextItem$position;
      const $nextItem = this._getNextItem($item, direction);
      if (!$nextItem.length) {
        break;
      }
      const nextItemLocation = ((null === (_$nextItem$position = $nextItem.position()) || void 0 === _$nextItem$position ? void 0 : _$nextItem$position.top) ?? 0) + getOuterHeight($nextItem) / 2;
      isItemVisible = nextItemLocation < containerHeight + scrollTop && nextItemLocation > scrollTop;
      if (isItemVisible) {
        $item = $nextItem;
      }
    }
    return $item;
  }
  _getItemLocation($item, direction) {
    if ("prev" === direction) {
      return $item.position().top - getHeight(this.$element()) + getOuterHeight($item);
    }
    return $item.position().top;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      pullRefreshEnabled: false,
      scrollingEnabled: true,
      selectByClick: true,
      showScrollbar: "onScroll",
      useNativeScrolling: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      pullingDownText: message_default.format("dxList-pullingDownText"),
      pulledDownText: message_default.format("dxList-pulledDownText"),
      refreshingText: message_default.format("dxList-refreshingText"),
      pageLoadingText: message_default.format("dxList-pageLoadingText"),
      onScroll: null,
      onPullRefresh: null,
      onPageLoading: null,
      pageLoadMode: "scrollBottom",
      nextButtonText: message_default.format("dxList-nextButtonText"),
      onItemSwipe: null,
      grouped: false,
      onGroupRendered: null,
      collapsibleGroups: false,
      groupTemplate: "group",
      indicateLoading: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: "option"
      },
      useInkRipple: false,
      wrapItemText: false,
      _swipeEnabled: true,
      showChevronExpr: (data) => null === data || void 0 === data ? void 0 : data.showChevron,
      badgeExpr: (data) => null === data || void 0 === data ? void 0 : data.badge,
      _onItemsRendered: () => {
      }
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat(deviceDependentOptions(), [{
      device: () => !m_support_default.nativeScrolling,
      options: {
        useNativeScrolling: false
      }
    }, {
      device: (device) => !m_support_default.nativeScrolling && !devices_default.isSimulator() && "desktop" === devices_default.real().deviceType && "generic" === device.platform,
      options: {
        showScrollbar: "onHover",
        pageLoadMode: "nextButton"
      }
    }, {
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isMaterial(themeName),
      options: {
        useInkRipple: true
      }
    }, {
      device: () => isMaterialBased(themeName),
      options: {
        pullingDownText: "",
        pulledDownText: "",
        refreshingText: "",
        pageLoadingText: ""
      }
    }]);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._updateLoadingState(true);
    }
  }
  _itemClass() {
    return "dx-list-item";
  }
  _itemDataKey() {
    return "dxListItemData";
  }
  _itemContainer() {
    return this._$container;
  }
  _getItemsContainer() {
    return this._$listContainer;
  }
  _cleanItemContainer() {
    super._cleanItemContainer();
    const listContainer = this._getItemsContainer();
    renderer_default(listContainer).empty();
    listContainer.appendTo(this._$container);
  }
  _saveSelectionChangeEvent(e) {
    this._selectionChangeEventInstance = e;
  }
  _getSelectionChangeEvent() {
    return this._selectionChangeEventInstance;
  }
  _refreshItemElements() {
    const {
      grouped
    } = this.option();
    const $itemsContainer = this._getItemsContainer();
    if (grouped) {
      this._itemElementsCache = $itemsContainer.children(".dx-list-group").children(".dx-list-group-body").children(this._itemSelector());
    } else {
      this._itemElementsCache = $itemsContainer.children(this._itemSelector());
    }
  }
  _getItemAndHeaderElements() {
    const itemSelector = `> .dx-list-group-body > ${this._itemSelector()}`;
    const itemAndHeaderSelector = `${itemSelector}, > .dx-list-group-header`;
    const $listGroup = this._getItemsContainer().children(".dx-list-group");
    return $listGroup.find(itemAndHeaderSelector);
  }
  _getAvailableItems($itemElements) {
    const {
      collapsibleGroups
    } = this.option();
    if (collapsibleGroups) {
      const $elements = this._getItemAndHeaderElements();
      return $elements.filter(((_index, element) => {
        if (renderer_default(element).hasClass("dx-list-group-header")) {
          return true;
        }
        return !renderer_default(element).closest(".dx-list-group").hasClass("dx-list-group-collapsed");
      }));
    }
    return super._getAvailableItems($itemElements);
  }
  _modifyByChanges(changes, isPartialRefresh) {
    super._modifyByChanges(changes, isPartialRefresh);
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  reorderItem(itemElement, toItemElement) {
    const promise = super.reorderItem(itemElement, toItemElement);
    return promise.done((() => {
      this._refreshItemElements();
    }));
  }
  deleteItem(itemElement) {
    const promise = super.deleteItem(itemElement);
    return promise.done((() => {
      this._refreshItemElements();
    }));
  }
  _itemElements() {
    return this._itemElementsCache;
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    const isSingleSelectedItemClicked = "single" === selectionMode && this.isItemSelected(e.currentTarget);
    if (isSingleSelectedItemClicked) {
      return;
    }
    const isSelectionControlClicked = renderer_default(e.target).closest(`.${LIST_SELECT_CHECKBOX}`).length || renderer_default(e.target).closest(`.${LIST_SELECT_RADIOBUTTON}`).length;
    if (isSelectionControlClicked) {
      this.option("focusedElement", getPublicElement(renderer_default(e.currentTarget)));
    }
    return super._itemSelectHandler(e, isSelectionControlClicked);
  }
  _allowDynamicItemsAppend() {
    return true;
  }
  _activeStateUnit() {
    const {
      collapsibleGroups
    } = this.option();
    const selectors = [".dx-list-item", ".dx-list-select-all"];
    if (collapsibleGroups) {
      selectors.push(".dx-list-group-header");
    }
    return selectors.join(",");
  }
  _init() {
    super._init();
    this._dataController.resetDataSourcePageIndex();
    this._$container = this.$element();
    this._$listContainer = renderer_default("<div>").addClass("dx-list-items");
    this._initScrollView();
    this._createGroupRenderAction();
  }
  _scrollBottomMode() {
    const {
      pageLoadMode
    } = this.option();
    return "scrollBottom" === pageLoadMode;
  }
  _nextButtonMode() {
    const {
      pageLoadMode
    } = this.option();
    return "nextButton" === pageLoadMode;
  }
  _dataSourceOptions() {
    const scrollBottom = this._scrollBottomMode();
    const nextButton = this._nextButtonMode();
    return _extends({}, super._dataSourceOptions(), {
      paginate: ensureDefined(scrollBottom || nextButton, true)
    });
  }
  _getSpecificDataSourceOption() {
    const {
      grouped
    } = this.option();
    const dataSource = this.option("dataSource");
    if (dataSource && grouped) {
      return getDataSourceOptions(dataSource);
    }
    return dataSource;
  }
  _getGroupContainerByIndex(groupIndex) {
    return this._getItemsContainer().find(".dx-list-group").eq(groupIndex).find(".dx-list-group-body");
  }
  _dataSourceFromUrlLoadMode() {
    return "raw";
  }
  _initScrollView() {
    const {
      height,
      width,
      disabled,
      showScrollbar,
      useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      pageLoadingText,
      scrollingEnabled,
      pullRefreshEnabled
    } = this.option();
    const isPullRefreshEnabled = scrollingEnabled && pullRefreshEnabled;
    const autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataController.getDataSource();
    this._scrollView = this._createComponent(this.$element(), getScrollView(), {
      height,
      width,
      disabled: disabled || !scrollingEnabled,
      onScroll: (e) => {
        this._scrollHandler(e);
      },
      onPullDown: isPullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
      onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
      showScrollbar,
      useNative: useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      reachBottomText: pageLoadingText,
      useKeyboard: false
    });
    this._$container = renderer_default(this._scrollView.content());
    this._$listContainer.appendTo(this._$container);
    const {
      wrapItemText
    } = this.option();
    this._toggleWrapItemText(wrapItemText);
    this._createScrollViewActions();
  }
  _toggleWrapItemText(value) {
    this._$listContainer.toggleClass("dx-wrap-item-text", value);
  }
  _createScrollViewActions() {
    this._scrollAction = this._createActionByOption("onScroll");
    this._pullRefreshAction = this._createActionByOption("onPullRefresh");
    this._pageLoadingAction = this._createActionByOption("onPageLoading");
  }
  _scrollHandler(e) {
    var _this$_scrollAction;
    null === (_this$_scrollAction = this._scrollAction) || void 0 === _this$_scrollAction || _this$_scrollAction.call(this, e);
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      group: new BindableTemplate((($container, data) => {
        if (isPlainObject(data)) {
          if (data.key) {
            $container.text(data.key);
          }
        } else {
          $container.text(String(data));
        }
      }), ["key"], this.option("integrationOptions.watchMethod"))
    });
    super._initTemplates();
  }
  _prepareDefaultItemTemplate(data, $container) {
    super._prepareDefaultItemTemplate(data, $container);
    if (data.icon) {
      const $imageContainer = getImageContainer(data.icon);
      if (!$imageContainer) {
        return;
      }
      const $icon = $imageContainer.addClass("dx-list-item-icon");
      const $iconContainer = renderer_default("<div>").addClass("dx-list-item-icon-container");
      $iconContainer.append($icon);
      $container.prepend($iconContainer);
    }
  }
  _getBindableFields() {
    return ["text", "html", "icon"];
  }
  _updateLoadingState(tryLoadMore) {
    const dataController = this._dataController;
    const scrollBottomMode = this._scrollBottomMode();
    const isDataControllerLoading = dataController.isLoading();
    const isLastPage = this._isLastPage();
    const shouldLoadNextPage = scrollBottomMode && Boolean(tryLoadMore) && !isDataControllerLoading && !isLastPage;
    if (this._shouldContinueLoading(shouldLoadNextPage)) {
      this._infiniteDataLoading();
    } else {
      this._scrollView.release(!shouldLoadNextPage && !dataController.isLoading());
      this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
      this._loadIndicationSuppressed(false);
    }
  }
  _shouldRenderNextButton() {
    return this._nextButtonMode() && this._dataController.isLoaded();
  }
  _isDataSourceFirstLoadCompleted(newValue) {
    if (isDefined(newValue)) {
      this._isFirstLoadCompleted = newValue;
    }
    return this._isFirstLoadCompleted;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    if (this._loadIndicationSuppressed()) {
      return;
    }
    const {
      indicateLoading
    } = this.option();
    if (isLoading && indicateLoading) {
      this._showLoadingIndicatorTimer = setTimeout((() => {
        const isEmpty = !this._itemElements().length;
        const shouldIndicateLoading = !isEmpty || this._isDataSourceFirstLoadCompleted();
        if (shouldIndicateLoading) {
          var _this$_scrollView;
          null === (_this$_scrollView = this._scrollView) || void 0 === _this$_scrollView || _this$_scrollView.startLoading();
        }
      }));
    } else {
      var _this$_scrollView2;
      clearTimeout(this._showLoadingIndicatorTimer);
      null === (_this$_scrollView2 = this._scrollView) || void 0 === _this$_scrollView2 || _this$_scrollView2.finishLoading();
    }
    if (!isLoading) {
      this._isDataSourceFirstLoadCompleted(false);
    }
  }
  _dataSourceChangedHandler(newItems, e) {
    if (!this._shouldAppendItems() && hasWindow()) {
      var _this$_scrollView3;
      null === (_this$_scrollView3 = this._scrollView) || void 0 === _this$_scrollView3 || _this$_scrollView3.scrollTo(0);
    }
    super._dataSourceChangedHandler(newItems, e);
    this._isDataSourceFirstLoadCompleted(true);
  }
  _refreshContent() {
    this._prepareContent();
    this._fireContentReadyAction();
  }
  _hideLoadingIfLoadIndicationOff() {
    const {
      indicateLoading
    } = this.option();
    if (!indicateLoading) {
      this._dataSourceLoadingChangedHandler(false);
    }
  }
  _loadIndicationSuppressed(value) {
    if (arguments.length) {
      this._isLoadIndicationSuppressed = value;
    }
    return this._isLoadIndicationSuppressed;
  }
  _scrollViewIsFull() {
    const scrollView = this._scrollView;
    return !scrollView || getHeight(scrollView.content()) > getHeight(scrollView.container());
  }
  _pullDownHandler() {
    var _this$_pullRefreshAct;
    const pullRefreshArgs = {
      component: this,
      element: this.element()
    };
    null === (_this$_pullRefreshAct = this._pullRefreshAction) || void 0 === _this$_pullRefreshAct || _this$_pullRefreshAct.call(this, pullRefreshArgs);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      this._clearSelectedItems();
      dataController.pageIndex(0);
      dataController.reload();
    } else {
      this._updateLoadingState();
    }
  }
  _shouldContinueLoading(shouldLoadNextPage) {
    var _this$_scrollView$scr;
    if (!shouldLoadNextPage) {
      return false;
    }
    const $content = this._scrollView.content();
    const $container = this._scrollView.container();
    const contentHeight = getHeight($content);
    const containerHeight = getHeight($container);
    const offsetTop = (null === (_this$_scrollView$scr = this._scrollView.scrollOffset()) || void 0 === _this$_scrollView$scr ? void 0 : _this$_scrollView$scr.top) ?? 0;
    const isBottomReached = contentHeight - containerHeight < offsetTop;
    const isFull = this._scrollViewIsFull();
    return shouldLoadNextPage && !isFull || isBottomReached;
  }
  _infiniteDataLoading() {
    const isElementVisible = this.$element().is(":visible");
    if (isElementVisible) {
      clearTimeout(this._loadNextPageTimer);
      this._loadNextPageTimer = setTimeout((() => {
        this._loadNextPage();
      }));
    }
  }
  _scrollBottomHandler(e) {
    var _this$_pageLoadingAct;
    null === (_this$_pageLoadingAct = this._pageLoadingAction) || void 0 === _this$_pageLoadingAct || _this$_pageLoadingAct.call(this, e);
    const dataController = this._dataController;
    if (!dataController.isLoading() && !this._isLastPage()) {
      this._loadNextPage();
    } else {
      this._updateLoadingState();
    }
  }
  _renderItems(items) {
    const {
      grouped
    } = this.option();
    if (grouped) {
      each(items, this._renderGroup.bind(this));
      this._attachGroupCollapseEvent();
      this._renderEmptyMessage();
      if (isMaterial(current())) {
        this.attachGroupHeaderInkRippleEvents();
      }
    } else {
      super._renderItems(items);
    }
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  _postProcessRenderItems() {
    const {
      _onItemsRendered: onItemsRendered
    } = this.option();
    null === onItemsRendered || void 0 === onItemsRendered || onItemsRendered();
  }
  _attachGroupCollapseEvent() {
    const {
      collapsibleGroups
    } = this.option();
    const eventNameClick = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const $element = this.$element();
    $element.toggleClass("dx-list-collapsible-groups", collapsibleGroups);
    m_events_engine_default.off($element, eventNameClick, ".dx-list-group-header");
    if (collapsibleGroups) {
      m_events_engine_default.on($element, eventNameClick, ".dx-list-group-header", ((e) => {
        this._processGroupCollapse(e);
      }));
    }
  }
  _processGroupCollapse(e) {
    const action = this._createAction(((evt) => {
      var _evt$event;
      const {
        focusStateEnabled
      } = this.option();
      const $group = renderer_default(null === (_evt$event = evt.event) || void 0 === _evt$event ? void 0 : _evt$event.currentTarget).parent();
      this._collapseGroupHandler($group);
      if (focusStateEnabled) {
        const groupHeader = getPublicElement($group.find(".dx-list-group-header"));
        this.option({
          focusedElement: groupHeader
        });
      }
    }), {
      validatingTargetName: "element"
    });
    action({
      event: e
    });
  }
  _enterKeyHandler(e) {
    const {
      collapsibleGroups,
      focusedElement
    } = this.option();
    const isGroupHeader = renderer_default(focusedElement).hasClass("dx-list-group-header");
    if (collapsibleGroups && isGroupHeader) {
      const params = this._getHandlerExtendedParams(e, renderer_default(focusedElement));
      this._processGroupCollapse(params);
      return;
    }
    super._enterKeyHandler(e);
  }
  _collapseGroupHandler($group, toggle) {
    const deferred = Deferred();
    const $groupHeader = $group.children(".dx-list-group-header");
    const collapsed = $group.hasClass("dx-list-group-collapsed");
    this._updateGroupHeaderAriaExpanded($groupHeader, collapsed);
    if (collapsed === toggle) {
      return deferred.resolve();
    }
    const $groupBody = $group.children(".dx-list-group-body");
    const startHeight = getOuterHeight($groupBody);
    let endHeight = 0;
    if (collapsed) {
      setHeight($groupBody, "auto");
      endHeight = getOuterHeight($groupBody);
    }
    $group.toggleClass("dx-list-group-collapsed", toggle);
    const groupBodyElement = $groupBody.get(0);
    if (fx_default.isAnimating(groupBodyElement)) {
      fx_default.stop(groupBodyElement, false);
    }
    fx_default.animate(groupBodyElement, {
      type: "custom",
      from: {
        height: startHeight
      },
      to: {
        height: endHeight
      },
      duration: 200,
      complete: () => {
        this.updateDimensions();
        this._updateLoadingState(true);
        deferred.resolve();
      }
    });
    return deferred.promise();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    if (this._initialized) {
      this._renderEmptyMessage();
      this._updateLoadingState();
    }
  }
  _initMarkup() {
    this._itemElementsCache = renderer_default();
    this.$element().addClass("dx-list");
    super._initMarkup();
    const {
      useInkRipple
    } = this.option();
    if (useInkRipple) {
      this._renderInkRipple();
    }
    const elementAria = {
      role: "group",
      roledescription: message_default.format("dxList-ariaRoleDescription")
    };
    this.setAria(elementAria, this.$element());
    this.setAria({
      role: "application"
    }, this._focusTarget());
    this._setListAria();
  }
  _setListAria() {
    const {
      items,
      allowItemDeleting,
      collapsibleGroups
    } = this.option();
    const label = allowItemDeleting ? message_default.format("dxList-listAriaLabel-deletable") : message_default.format("dxList-listAriaLabel");
    const shouldSetAria = (null === items || void 0 === items ? void 0 : items.length) && !collapsibleGroups;
    const listArea = {
      role: shouldSetAria ? "listbox" : void 0,
      label: shouldSetAria ? label : void 0
    };
    this.setAria(listArea, this._$listContainer);
  }
  _focusTarget() {
    return this._itemContainer();
  }
  _renderInkRipple() {
    this._inkRipple = render();
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      if (isMaterial(current())) {
        this._inkRippleTimer = setTimeout((() => {
          var _this$_inkRipple;
          null === (_this$_inkRipple = this._inkRipple) || void 0 === _this$_inkRipple || _this$_inkRipple.showWave(config);
        }), 35);
      } else {
        this._inkRipple.showWave(config);
      }
    } else {
      clearTimeout(this._inkRippleTimer);
      this._inkRipple.hideWave(config);
    }
  }
  _postprocessRenderItem(args) {
    this._refreshItemElements();
    super._postprocessRenderItem(args);
    const {
      _swipeEnabled
    } = this.option();
    if (_swipeEnabled) {
      this._attachSwipeEvent(renderer_default(args.itemElement));
    }
  }
  _getElementClassToSkipRefreshId() {
    return "dx-list-group-header";
  }
  _attachSwipeEvent($itemElement) {
    const endEventName = addNamespace(SWIPE_END_EVENT, this.NAME);
    m_events_engine_default.on($itemElement, endEventName, ((e) => {
      this._itemSwipeEndHandler(e);
    }));
  }
  _itemSwipeEndHandler(e) {
    this._itemDXEventHandler(e, "onItemSwipe", {
      direction: e.offset < 0 ? "left" : "right"
    });
  }
  _nextButtonHandler() {
    var _this$_pageLoadingAct2;
    const pageLoadingArgs = {
      component: this,
      element: this.element()
    };
    null === (_this$_pageLoadingAct2 = this._pageLoadingAction) || void 0 === _this$_pageLoadingAct2 || _this$_pageLoadingAct2.call(this, pageLoadingArgs);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      var _this$_$nextButton;
      this._scrollView.toggleLoading(true);
      null === (_this$_$nextButton = this._$nextButton) || void 0 === _this$_$nextButton || _this$_$nextButton.detach();
      this._loadIndicationSuppressed(true);
      this._loadNextPage();
    }
  }
  _setGroupAria($group, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupAria = {
      role: collapsibleGroups ? void 0 : "group",
      labelledby: collapsibleGroups ? void 0 : groupHeaderId
    };
    this.setAria(groupAria, $group);
  }
  _updateGroupHeaderAriaExpanded($groupHeader, expanded) {
    this.setAria({
      expanded
    }, $groupHeader);
  }
  _setGroupHeaderAria($groupHeader, listGroupBodyId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? "button" : void 0,
      expanded: collapsibleGroups ? true : void 0,
      controls: collapsibleGroups ? listGroupBodyId : void 0
    };
    this.setAria(groupHeaderAria, $groupHeader);
  }
  _setGroupBodyAria($groupBody, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? "listbox" : void 0,
      labelledby: collapsibleGroups ? groupHeaderId : void 0
    };
    this.setAria(groupHeaderAria, $groupBody);
  }
  _renderGroup(index, group) {
    var _this$_groupRenderAct;
    const $groupElement = renderer_default("<div>").addClass("dx-list-group").appendTo(this._getItemsContainer());
    const groupHeaderId = `dx-${new guid_default().toString()}`;
    const $groupHeaderElement = renderer_default("<div>").addClass("dx-list-group-header").attr("id", groupHeaderId).appendTo($groupElement);
    const {
      groupTemplate: templateName
    } = this.option();
    const groupTemplate = this._getTemplate(group.template ?? templateName, group, index, $groupHeaderElement);
    const renderArgs = {
      index,
      itemData: group,
      container: getPublicElement($groupHeaderElement)
    };
    this._createItemByTemplate(groupTemplate, renderArgs);
    renderer_default("<div>").addClass("dx-list-group-header-indicator").prependTo($groupHeaderElement);
    const groupBodyId = `dx-${new guid_default().toString()}`;
    const $groupBody = renderer_default("<div>").addClass("dx-list-group-body").attr("id", groupBodyId).appendTo($groupElement);
    const groupItemsGetter = compileGetter("items");
    each(groupItemsGetter(group) || [], ((itemIndex, item) => {
      this._renderItem({
        group: index,
        item: itemIndex
      }, item, $groupBody);
    }));
    null === (_this$_groupRenderAct = this._groupRenderAction) || void 0 === _this$_groupRenderAct || _this$_groupRenderAct.call(this, {
      groupElement: getPublicElement($groupElement),
      groupIndex: index,
      groupData: group
    });
    this._setGroupAria($groupElement, groupHeaderId);
    this._setGroupHeaderAria($groupHeaderElement, groupBodyId);
    this._setGroupBodyAria($groupBody, groupHeaderId);
  }
  downInkRippleHandler(e) {
    this._toggleActiveState(renderer_default(e.currentTarget), true, e);
  }
  upInkRippleHandler(e) {
    this._toggleActiveState(renderer_default(e.currentTarget), false, e);
  }
  attachGroupHeaderInkRippleEvents() {
    const selector = ".dx-list-group-header";
    const $element = this.$element();
    this._downInkRippleHandler = this._downInkRippleHandler ?? this.downInkRippleHandler.bind(this);
    this._upInkRippleHandler = this._upInkRippleHandler ?? this.upInkRippleHandler.bind(this);
    m_events_engine_default.off($element, m_pointer_default.down, selector, this._downInkRippleHandler);
    m_events_engine_default.on($element, m_pointer_default.down, selector, this._downInkRippleHandler);
    m_events_engine_default.off($element, [m_pointer_default.up, m_pointer_default.out].join(" "), selector, this._upInkRippleHandler);
    m_events_engine_default.on($element, [m_pointer_default.up, m_pointer_default.out].join(" "), selector, this._upInkRippleHandler);
  }
  _createGroupRenderAction() {
    this._groupRenderAction = this._createActionByOption("onGroupRendered");
  }
  _clean() {
    clearTimeout(this._inkRippleTimer);
    if (this._$nextButton) {
      this._$nextButton.remove();
      this._$nextButton = null;
    }
    super._clean();
  }
  _dispose() {
    this._isDataSourceFirstLoadCompleted(false);
    clearTimeout(this._holdTimer);
    clearTimeout(this._loadNextPageTimer);
    clearTimeout(this._showLoadingIndicatorTimer);
    super._dispose();
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(value);
    const {
      scrollingEnabled
    } = this.option();
    this._scrollView.option("disabled", value || !scrollingEnabled);
  }
  _toggleNextButton(value) {
    const dataController = this._dataController;
    const $nextButton = this._getNextButton();
    this.$element().toggleClass("dx-has-next", value);
    if (value && dataController.isLoaded()) {
      $nextButton.appendTo(this._itemContainer());
    }
    if (!value) {
      $nextButton.detach();
    }
  }
  _getNextButton() {
    if (!this._$nextButton) {
      this._$nextButton = this._createNextButton();
    }
    return this._$nextButton;
  }
  _createNextButton() {
    const $result = renderer_default("<div>").addClass("dx-list-next-button");
    const $button = renderer_default("<div>").appendTo($result);
    const {
      nextButtonText
    } = this.option();
    this._createComponent($button, button_default, {
      text: nextButtonText,
      onClick: () => {
        this._nextButtonHandler();
      },
      type: isMaterialBased(current()) ? "default" : void 0,
      integrationOptions: {}
    });
    return $result;
  }
  _moveFocus(location) {
    super._moveFocus(location);
    const {
      focusedElement
    } = this.option();
    if (focusedElement) {
      this.scrollToItem(focusedElement);
    }
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else {
      const scrollTop = this._scrollView.scrollTop();
      super._refresh();
      if (scrollTop) {
        this._scrollView.scrollTo(scrollTop);
      }
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "pageLoadMode":
        this._toggleNextButton(!!value);
        this._initScrollView();
        break;
      case "dataSource":
        super._optionChanged(args);
        this._initScrollView();
        this._updateLoadingState(true);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "items":
        super._optionChanged(args);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "pageLoadingText":
      case "showScrollbar":
      case "bounceEnabled":
      case "scrollByContent":
      case "scrollByThumb":
      case "useNativeScrolling":
      case "scrollingEnabled":
      case "pullRefreshEnabled":
        this._initScrollView();
        this._updateLoadingState(true);
        break;
      case "nextButtonText":
      case "onItemSwipe":
      case "useInkRipple":
      case "grouped":
      case "groupTemplate":
      case "collapsibleGroups":
      case "showChevronExpr":
      case "badgeExpr":
        this._invalidate();
        break;
      case "onScroll":
      case "onPullRefresh":
      case "onPageLoading":
        this._createScrollViewActions();
        break;
      case "wrapItemText":
        this._toggleWrapItemText(value);
        break;
      case "onGroupRendered":
        this._createGroupRenderAction();
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        this._scrollView.option(name, value);
        this._scrollView.update();
        break;
      case "indicateLoading":
        this._hideLoadingIfLoadIndicationOff();
        break;
      case "visible":
        super._optionChanged(args);
        this._scrollView.update();
        break;
      case "rtlEnabled":
        this._initScrollView();
        super._optionChanged(args);
        break;
      case "_swipeEnabled":
      case "_onItemsRendered":
      case "selectByClick":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _extendActionArgs($itemElement) {
    const {
      grouped
    } = this.option();
    if (!grouped) {
      return super._extendActionArgs($itemElement);
    }
    const $group = $itemElement.closest(".dx-list-group");
    const $item = $group.find(".dx-list-item");
    return _extends({}, super._extendActionArgs($itemElement), {
      itemIndex: {
        group: $group.index(),
        item: $item.index($itemElement)
      }
    });
  }
  expandGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(".dx-list-group").eq(groupIndex);
    this._collapseGroupHandler($group, false).done((() => {
      deferred.resolveWith(this);
    }));
    return deferred.promise();
  }
  collapseGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(".dx-list-group").eq(groupIndex);
    this._collapseGroupHandler($group, true).done((() => {
      deferred.resolveWith(this);
    }));
    return deferred;
  }
  updateDimensions() {
    const deferred = Deferred();
    if (this._scrollView) {
      this._scrollView.update().done((() => {
        if (!this._scrollViewIsFull()) {
          this._updateLoadingState(true);
        }
        deferred.resolveWith(this);
      }));
    } else {
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  reload() {
    super.reload();
    this.scrollTo(0);
    this._pullDownHandler();
  }
  repaint() {
    this.scrollTo(0);
    super.repaint();
  }
  scrollTop() {
    return this._scrollView.scrollOffset().top ?? 0;
  }
  clientHeight() {
    return this._scrollView.clientHeight();
  }
  scrollHeight() {
    return this._scrollView.scrollHeight();
  }
  scrollBy(distance) {
    this._scrollView.scrollBy(distance);
  }
  scrollTo(location) {
    this._scrollView.scrollTo(location);
  }
  scrollToItem(itemElement) {
    if (!isDefined(itemElement)) {
      return;
    }
    const $item = this._editStrategy.getItemElement(itemElement);
    this._scrollView.scrollToElement($item, {
      bottom: getElementMargin(null === $item || void 0 === $item ? void 0 : $item.get(0), "bottom")
    });
  }
  _dimensionChanged() {
    this.updateDimensions();
  }
};
ListBase.ItemClass = item_default2;

export {
  PRIVATE_KEY_FIELD,
  collection_widget_live_update_default,
  data_source_default,
  apply_changes_default,
  m_endpoint_selector_default,
  m_local_store_default,
  EdmLiteral,
  keyConverters,
  m_store_default,
  m_context_default,
  getDataSourceOptions,
  SWIPE_START_EVENT,
  SWIPE_EVENT,
  SWIPE_END_EVENT,
  ListBase
};
//# sourceMappingURL=chunk-FF43QURI.js.map
