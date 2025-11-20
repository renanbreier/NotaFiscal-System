// node_modules/devextreme/esm/__internal/core/utils/m_type.js
var types = {
  "[object Array]": "array",
  "[object Date]": "date",
  "[object Object]": "object",
  "[object String]": "string"
};
var type = function(object) {
  if (null === object) {
    return "null";
  }
  const typeOfObject = Object.prototype.toString.call(object);
  return "object" === typeof object ? types[typeOfObject] || "object" : typeof object;
};
var isBoolean = function(object) {
  return "boolean" === typeof object;
};
var isExponential = function(value) {
  return isNumeric(value) && -1 !== value.toString().indexOf("e");
};
var isDate = function(object) {
  return "date" === type(object);
};
var isDefined = function(object) {
  return null !== object && void 0 !== object;
};
var isFunction = function(object) {
  return "function" === typeof object;
};
var isString = function(object) {
  return "string" === typeof object;
};
var isNumeric = function(object) {
  return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object));
};
var isObject = function(object) {
  return "object" === type(object);
};
var isEmptyObject = function(object) {
  let property;
  for (property in object) {
    return false;
  }
  return true;
};
var isPlainObject = function(object) {
  if (!object || "object" !== type(object)) {
    return false;
  }
  const proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  const ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object);
};
var isPrimitive = function(value) {
  return !["object", "array", "function"].includes(type(value));
};
var isWindow = function(object) {
  return null != object && object === object.window;
};
var isRenderer = function(object) {
  return !!object && !!(object.jquery || object.dxRenderer);
};
var isPromise = function(object) {
  return !!object && isFunction(object.then);
};
var isDeferred = function(object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
var isEvent = function(object) {
  return !!(object && object.preventDefault);
};
var m_type_default = {
  isBoolean,
  isDate,
  isDeferred,
  isDefined,
  isEmptyObject,
  isEvent,
  isExponential,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  isWindow,
  type
};

// node_modules/devextreme/esm/__internal/core/utils/m_extend.js
var extendFromObject = function(target, source, overrideExistingValues) {
  target = target || {};
  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const value = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value;
      }
    }
  }
  return target;
};
var extend = function(target) {
  target = target || {};
  let i = 1;
  let deep = false;
  if ("boolean" === typeof target) {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    const source = arguments[i];
    if (null == source) {
      continue;
    }
    for (const key in source) {
      const targetValue = target[key];
      const sourceValue = source[key];
      let sourceValueIsArray = false;
      let clone2;
      if ("__proto__" === key || "constructor" === key || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone2 = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone2 = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }
        target[key] = extend(deep, clone2, sourceValue);
      } else if (void 0 !== sourceValue) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_string.js
var encodeHtml = (function() {
  const encodeRegExp = [new RegExp("&", "g"), new RegExp('"', "g"), new RegExp("'", "g"), new RegExp("<", "g"), new RegExp(">", "g")];
  return function(str) {
    return String(str).replace(encodeRegExp[0], "&amp;").replace(encodeRegExp[1], "&quot;").replace(encodeRegExp[2], "&#39;").replace(encodeRegExp[3], "&lt;").replace(encodeRegExp[4], "&gt;");
  };
})();
var splitQuad = function(raw) {
  switch (typeof raw) {
    case "string":
      return raw.split(/\s+/, 4);
    case "object":
      return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];
    case "number":
      return [raw];
    default:
      return raw;
  }
};
var quadToObject = function(raw) {
  const quad = splitQuad(raw);
  let left = parseInt(quad && quad[0], 10);
  let top = parseInt(quad && quad[1], 10);
  let right = parseInt(quad && quad[2], 10);
  let bottom = parseInt(quad && quad[3], 10);
  if (!isFinite(left)) {
    left = 0;
  }
  if (!isFinite(top)) {
    top = left;
  }
  if (!isFinite(right)) {
    right = left;
  }
  if (!isFinite(bottom)) {
    bottom = top;
  }
  return {
    top,
    right,
    bottom,
    left
  };
};
function format(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (isFunction(template)) {
    return template(...values);
  }
  values.forEach(((value, index) => {
    if (isString(value)) {
      value = value.replace(/\$/g, "$$$$");
    }
    const placeholderReg = new RegExp(`\\{${index}\\}`, "gm");
    template = template.replace(placeholderReg, value);
  }));
  return template;
}
var isEmpty = /* @__PURE__ */ (function() {
  const SPACE_REGEXP = /\s/g;
  return function(text) {
    return !text || !text.replace(SPACE_REGEXP, "");
  };
})();

// node_modules/devextreme/esm/core/version.js
var version = "25.1.6";
var fullVersion = "25.1.6";

// node_modules/devextreme/esm/__internal/core/utils/m_console.js
var noop = function() {
};
var getConsoleMethod = function(method) {
  if ("undefined" === typeof console || !isFunction(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
var logger = {
  log: getConsoleMethod("log"),
  info: getConsoleMethod("info"),
  warn: getConsoleMethod("warn"),
  error: getConsoleMethod("error")
};
var debug = /* @__PURE__ */ (function() {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  return {
    assert,
    assertParam: function(parameter, message) {
      assert(null !== parameter && void 0 !== parameter, message);
    }
  };
})();
var m_console_default = {
  logger,
  debug
};

// node_modules/devextreme/esm/__internal/core/utils/m_error.js
var ERROR_URL = `https://js.devexpress.com/error/${version.split(".").slice(0, 2).join("_")}/`;
function error(baseErrors, errors) {
  const exports = {
    ERROR_MESSAGES: extend(errors, baseErrors),
    Error: function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (function(args2) {
        const id = args2[0];
        args2 = args2.slice(1);
        const details = formatDetails(id, args2);
        const url = getErrorUrl(id);
        const message = formatMessage(id, details);
        return extend(new Error(message), {
          __id: id,
          __details: details,
          url
        });
      })(args);
    },
    log() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const id = args[0];
      let method = "log";
      if (/^E\d+$/.test(id)) {
        method = "error";
      } else if (/^W\d+$/.test(id)) {
        method = "warn";
      }
      m_console_default.logger[method]("log" === method ? id : (function(args2) {
        const id2 = args2[0];
        args2 = args2.slice(1);
        return formatMessage(id2, formatDetails(id2, args2));
      })(args));
    }
  };
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return format.apply(this, args).replace(/\.*\s*?$/, "");
  }
  function formatMessage(id, details) {
    const kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
    return format.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)]);
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}

// node_modules/devextreme/esm/core/utils/error.js
var error_default = error;

// node_modules/devextreme/esm/__internal/core/m_errors.js
var m_errors_default = error_default({
  E0001: "Method is not implemented",
  E0002: "Member name collision: {0}",
  E0003: "A class must be instantiated using the 'new' keyword",
  E0004: "The NAME property of the component is not specified",
  E0005: "Unknown device",
  E0006: "Unknown endpoint key is requested",
  E0007: "'Invalidate' method is called outside the update transaction",
  E0008: "Type of the option name is not appropriate to create an action",
  E0009: "Component '{0}' has not been initialized for an element",
  E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
  E0011: "Unknown animation type '{0}'",
  E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
  E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
  E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
  E0015: "Queued task returned an unexpected result",
  E0017: "Event namespace is not defined",
  E0018: "DevExpress.ui.DevExpressPopup widget is required",
  E0020: "Template engine '{0}' is not supported",
  E0021: "Unknown theme is set: {0}",
  E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
  E0023: "Template name is not specified",
  E0024: "DevExtreme bundle already included",
  E0025: "Unexpected argument type",
  E0100: "Unknown validation type is detected",
  E0101: "Misconfigured range validation rule is detected",
  E0102: "Misconfigured comparison validation rule is detected",
  E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
  E0110: "Unknown validation group is detected",
  E0120: "Adapter for a DevExpressValidator component cannot be configured",
  E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
  E0122: "AIIntegration: The sendRequest method is missing.",
  W0000: "'{0}' is deprecated in {1}. {2}",
  W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
  W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
  W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
  W0004: "Timeout for theme loading is over: {0}",
  W0005: "'{0}' event is deprecated in {1}. {2}",
  W0006: "Invalid recurrence rule: '{0}'",
  W0007: "'{0}' Globalize culture is not defined",
  W0008: "Invalid view type: {0}",
  W0009: "Invalid time zone name: '{0}'",
  W0010: "{0} is deprecated in {1}. {2}",
  W0011: "Number parsing is invoked while the parser is not defined",
  W0012: "Date parsing is invoked while the parser is not defined",
  W0013: "'{0}' file is deprecated in {1}. {2}",
  W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
  W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
  W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
  W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
  W0018: 'Setting the "position" property with a function is deprecated since v21.2',
  W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.devexpress.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.devexpress.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@devexpress.com.\n\n",
  W0020: "DevExtreme: License Key Has Expired.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n• use a version of DevExtreme linked to your license key: https://www.devexpress.com/ClientCenter/DownloadManager\n• renew your DevExpress Subscription: https://www.devexpress.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@devexpress.com.\n\n",
  W0021: "DevExtreme: License Key Verification Has Failed.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.devexpress.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n",
  W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n",
  W0023: "DevExtreme: the following 'devextreme' package version does not match versions of other DevExpress products used in this application:\n\n{0}\n\nInteroperability between different versions of the products listed herein cannot be guaranteed.\n\n",
  W0024: "DevExtreme: Use Your DevExtreme License Key - Not Your DevExpress .NET License Key\n\nInvalid/incorrect license key. You used your DevExpress .NET license key instead of your DevExtreme (React, Angular, Vue, JS) license key. Please copy your DevExtreme license key and try again. \n\nGo to https://www.devexpress.com/ClientCenter/DownloadManager (navigate to the DevExtreme Subscription section) to obtain a valid DevExtreme license key. To validate your license, specify the correct key within GlobalConfig.\n\nFor detailed license/registration information, visit https://js.devexpress.com/Documentation/Licensing/.\n\nIf you have a valid license and the issue persists, submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n"
});

// node_modules/devextreme/esm/core/errors.js
var errors_default = m_errors_default;

// node_modules/devextreme/esm/__internal/core/m_config.js
var config = {
  rtlEnabled: false,
  defaultCurrency: "USD",
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: ".",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  useJQuery: void 0,
  editorStylingMode: void 0,
  useLegacyVisibleIndex: false,
  versionAssertions: [],
  copyStylesToShadowDom: true,
  floatingActionButtonConfig: {
    icon: "add",
    closeIcon: "close",
    label: "",
    position: {
      at: "right bottom",
      my: "right bottom",
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: "auto"
  },
  optionsParser: (optionsString) => {
    if ("{" !== optionsString.trim().charAt(0)) {
      optionsString = `{${optionsString}}`;
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw errors_default.Error("E3018", ex, optionsString);
      }
    }
  }
};
var normalizeToJSONString = (optionsString) => optionsString.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":');
var deprecatedFields = ["decimalSeparator", "thousandsSeparator"];
var configMethod = function() {
  if (!arguments.length) {
    return config;
  }
  const newConfig = arguments.length <= 0 ? void 0 : arguments[0];
  deprecatedFields.forEach(((deprecatedField) => {
    if (newConfig[deprecatedField]) {
      const message = `Now, the ${deprecatedField} is selected based on the specified locale.`;
      errors_default.log("W0003", "config", deprecatedField, "19.2", message);
    }
  }));
  extend(config, newConfig);
};
if ("undefined" !== typeof DevExpress && DevExpress.config) {
  configMethod(DevExpress.config);
}
var m_config_default = configMethod;

// node_modules/devextreme/esm/common/config.js
var config_default = m_config_default;

// node_modules/devextreme/esm/__internal/core/m_class.js
var wrapOverridden = function(baseProto, methodName, method) {
  return function() {
    const prevCallBase = this.callBase;
    this.callBase = baseProto[methodName];
    try {
      return method.apply(this, arguments);
    } finally {
      this.callBase = prevCallBase;
    }
  };
};
var clonePrototype = function(obj) {
  const func = function() {
  };
  func.prototype = obj.prototype;
  return new func();
};
var redefine = function(members) {
  const that = this;
  let overridden;
  let memberName;
  let member;
  if (!members) {
    return that;
  }
  for (memberName in members) {
    member = members[memberName];
    overridden = "function" === typeof that.prototype[memberName] && "function" === typeof member;
    that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member;
  }
  return that;
};
var include = function() {
  const classObj = this;
  let argument;
  let name;
  let i;
  const hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
  const isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
  if (isES6Class) {
    classObj._includedCtors = classObj._includedCtors.slice(0);
    classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
  }
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  for (i = 0; i < args.length; i++) {
    argument = args[i];
    if (argument.ctor) {
      classObj._includedCtors.push(argument.ctor);
    }
    if (argument.postCtor) {
      classObj._includedPostCtors.push(argument.postCtor);
    }
    for (name in argument) {
      if ("ctor" === name || "postCtor" === name || "default" === name) {
        continue;
      }
      classObj.prototype[name] = argument[name];
    }
  }
  return classObj;
};
var subclassOf = function(parentClass) {
  const hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
  const isES6Class = !hasParentProperty && this.parent;
  if (isES6Class) {
    const baseClass = Object.getPrototypeOf(this);
    return baseClass === parentClass || baseClass.subclassOf(parentClass);
  }
  if (this.parent === parentClass) {
    return true;
  }
  if (!this.parent || !this.parent.subclassOf) {
    return false;
  }
  return this.parent.subclassOf(parentClass);
};
var abstract = function() {
  throw errors_default.Error("E0001");
};
var classImpl = function() {
};
classImpl.inherit = function(members) {
  const inheritor = function() {
    if (!this || isWindow(this) || "function" !== typeof this.constructor) {
      throw errors_default.Error("E0003");
    }
    const instance = this;
    const {
      ctor
    } = instance;
    const includedCtors = instance.constructor._includedCtors;
    const includedPostCtors = instance.constructor._includedPostCtors;
    let i;
    for (i = 0; i < includedCtors.length; i++) {
      includedCtors[i].call(instance);
    }
    if (ctor) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      ctor.apply(instance, args);
    }
    for (i = 0; i < includedPostCtors.length; i++) {
      includedPostCtors[i].call(instance);
    }
  };
  inheritor.prototype = clonePrototype(this);
  Object.setPrototypeOf(inheritor, this);
  inheritor.inherit = this.inherit;
  inheritor.abstract = abstract;
  inheritor.redefine = redefine;
  inheritor.include = include;
  inheritor.subclassOf = subclassOf;
  inheritor.parent = this;
  inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  inheritor.prototype.constructor = inheritor;
  inheritor.redefine(members);
  return inheritor;
};
classImpl.abstract = abstract;
var m_class_default = classImpl;

// node_modules/devextreme/esm/core/class.js
var class_default = m_class_default;

// node_modules/devextreme/esm/__internal/core/m_guid.js
var Guid = class_default.inherit({
  ctor: function(value) {
    if (value) {
      value = String(value);
    }
    this._value = this._normalize(value || this._generate());
  },
  _normalize: function(value) {
    value = value.replace(/[^a-f0-9]/gi, "").toLowerCase();
    while (value.length < 32) {
      value += "0";
    }
    return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join("-");
  },
  _generate: function() {
    let value = "";
    for (let i = 0; i < 32; i++) {
      value += Math.round(15 * Math.random()).toString(16);
    }
    return value;
  },
  toString: function() {
    return this._value;
  },
  valueOf: function() {
    return this._value;
  },
  toJSON: function() {
    return this._value;
  }
});

// node_modules/devextreme/esm/common/guid.js
var guid_default = Guid;

// node_modules/devextreme/esm/__internal/core/templates/m_template_engine_registry.js
var templateEngines = {};
var currentTemplateEngine;
function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
function setTemplateEngine(templateEngine) {
  if (isString(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];
    if (!currentTemplateEngine) {
      throw errors_default.Error("E0020", templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}

// node_modules/devextreme/esm/common/set_template_engine.js
var set_template_engine_default = setTemplateEngine;

// node_modules/devextreme/esm/core/config.js
var config_default2 = config_default;

// node_modules/devextreme/esm/__internal/core/utils/m_iterator.js
var map = (values, callback) => {
  if (Array.isArray(values)) {
    return values.map(callback);
  }
  const result = [];
  for (const key in values) {
    result.push(callback(values[key], key));
  }
  return result;
};
var each = (values, callback) => {
  if (!values) {
    return;
  }
  if ("length" in values) {
    for (let i = 0; i < values.length; i++) {
      if (false === callback.call(values[i], i, values[i])) {
        break;
      }
    }
  } else {
    for (const key in values) {
      if (false === callback.call(values[key], key, values[key])) {
        break;
      }
    }
  }
  return values;
};
var reverseEach = (array, callback) => {
  if (!array || !("length" in array) || 0 === array.length) {
    return;
  }
  for (let i = array.length - 1; i >= 0; i--) {
    if (false === callback.call(array[i], i, array[i])) {
      break;
    }
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_dependency_injector.js
function injector(object) {
  const BaseClass = class_default.inherit(object);
  let InjectedClass = BaseClass;
  let instance = new InjectedClass(object);
  const initialFields = {};
  const injectFields = function(injectionObject, initial) {
    each(injectionObject, (function(key) {
      if (isFunction(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function() {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    }));
  };
  injectFields(object, true);
  object.inject = function(injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function() {
    extend(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}

// node_modules/devextreme/esm/core/utils/dependency_injector.js
var dependency_injector_default = injector;

// node_modules/devextreme/esm/__internal/core/utils/m_variable_wrapper.js
var variableWrapper = dependency_injector_default({
  isWrapped: function() {
    return false;
  },
  isWritableWrapped: function() {
    return false;
  },
  wrap: function(value) {
    return value;
  },
  unwrap: function(value) {
    return value;
  },
  assign: function() {
    logger.error("Method 'assign' should not be used for not wrapped variables. Use 'isWrapped' method for ensuring.");
  }
});

// node_modules/devextreme/esm/core/utils/variable_wrapper.js
var variable_wrapper_default = variableWrapper;

// node_modules/devextreme/esm/__internal/core/utils/m_object.js
var clone = /* @__PURE__ */ (function() {
  function Clone() {
  }
  return function(obj) {
    Clone.prototype = obj;
    return new Clone();
  };
})();
var orderEach = function(map2, func) {
  const keys = [];
  let key;
  let i;
  for (key in map2) {
    if (Object.prototype.hasOwnProperty.call(map2, key)) {
      keys.push(key);
    }
  }
  keys.sort((function(x, y) {
    const isNumberX = isNumeric(x);
    const isNumberY = isNumeric(y);
    if (isNumberX && isNumberY) {
      return x - y;
    }
    if (isNumberX && !isNumberY) {
      return -1;
    }
    if (!isNumberX && isNumberY) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  }));
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    func(key, map2[key]);
  }
};
var getDeepCopyTarget = (item) => {
  if (isObject(item)) {
    return Array.isArray(item) ? [] : {};
  }
  return item;
};
var legacyAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
  if (!assignByReference && variable_wrapper_default.isWrapped(target[property])) {
    variable_wrapper_default.assign(target[property], value);
  } else {
    target[property] = value;
  }
};
var newAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
  const goDeeper = extendComplexObject ? isObject(target) : isPlainObject(target);
  if (!assignByReference && variable_wrapper_default.isWrapped(target[property])) {
    variable_wrapper_default.assign(target[property], value);
  } else if (!assignByReference && Array.isArray(value)) {
    target[property] = value.map(((item) => deepExtendArraySafe(getDeepCopyTarget(item), item, extendComplexObject, assignByReference, shouldCopyUndefined)));
  } else if (!assignByReference && goDeeper) {
    target[property] = deepExtendArraySafe(getDeepCopyTarget(value), value, extendComplexObject, assignByReference, shouldCopyUndefined, newAssign);
  } else {
    target[property] = value;
  }
};
var deepExtendArraySafe = function(target, changes, extendComplexObject, assignByReference, shouldCopyUndefined, useNewAssign) {
  let prevValue;
  let newValue;
  const assignFunc = useNewAssign ? newAssign : legacyAssign;
  for (const name in changes) {
    prevValue = target[name];
    newValue = changes[name];
    if ("__proto__" === name || "constructor" === name || target === newValue) {
      continue;
    }
    if (isPlainObject(newValue)) {
      const goDeeper = extendComplexObject ? isObject(prevValue) : isPlainObject(prevValue);
      newValue = deepExtendArraySafe(goDeeper ? prevValue : {}, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
    }
    const isDeepCopyArray = Array.isArray(newValue) && !assignByReference;
    const hasDifferentNewValue = (shouldCopyUndefined || void 0 !== newValue) && prevValue !== newValue || shouldCopyUndefined && void 0 === prevValue;
    if (isDeepCopyArray || hasDifferentNewValue) {
      assignFunc(target, name, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
    }
  }
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_data.js
var unwrapVariable = variable_wrapper_default.unwrap;
var {
  isWrapped
} = variable_wrapper_default;
var {
  assign
} = variable_wrapper_default;
var bracketsToDots = function(expr) {
  return expr.replace(/\[/g, ".").replace(/\]/g, "");
};
var getPathParts = function(name) {
  return bracketsToDots(name).split(".");
};
var readPropValue = function(obj, propName, options) {
  options = options || {};
  if ("this" === propName) {
    return unwrap(obj, options);
  }
  return unwrap(obj[propName], options);
};
var assignPropValue = function(obj, propName, value, options) {
  if ("this" === propName) {
    throw new errors_default.Error("E4016");
  }
  const propValue = obj[propName];
  if (options.unwrapObservables && isWrapped(propValue)) {
    assign(propValue, value);
  } else {
    obj[propName] = value;
  }
};
var prepareOptions = function(options) {
  options = options || {};
  options.unwrapObservables = void 0 !== options.unwrapObservables ? options.unwrapObservables : true;
  return options;
};
function unwrap(value, options) {
  return options.unwrapObservables ? unwrapVariable(value) : value;
}
var compileGetter = function(expr) {
  if (arguments.length > 1) {
    expr = [].slice.call(arguments);
  }
  if (!expr || "this" === expr) {
    return function(obj) {
      return obj;
    };
  }
  if ("string" === typeof expr) {
    const path = getPathParts(expr);
    return function(obj, options) {
      options = prepareOptions(options);
      const functionAsIs = options.functionsAsIs;
      const hasDefaultValue = "defaultValue" in options;
      let current = unwrap(obj, options);
      for (let i = 0; i < path.length; i++) {
        if (!current) {
          if (null == current && hasDefaultValue) {
            return options.defaultValue;
          }
          break;
        }
        const pathPart = path[i];
        if (hasDefaultValue && isObject(current) && !(pathPart in current)) {
          return options.defaultValue;
        }
        let next = unwrap(current[pathPart], options);
        if (!functionAsIs && isFunction(next)) {
          next = next.call(current);
        }
        current = next;
      }
      return current;
    };
  }
  if (Array.isArray(expr)) {
    return combineGetters(expr);
  }
  if (isFunction(expr)) {
    return expr;
  }
};
function combineGetters(getters) {
  const compiledGetters = {};
  for (let i = 0, l = getters.length; i < l; i++) {
    const getter = getters[i];
    compiledGetters[getter] = compileGetter(getter);
  }
  return function(obj, options) {
    let result;
    each(compiledGetters, (function(name) {
      const value = this(obj, options);
      if (void 0 === value) {
        return;
      }
      let current = result || (result = {});
      const path = name.split(".");
      const last = path.length - 1;
      for (let i = 0; i < last; i++) {
        const pathItem = path[i];
        if (!(pathItem in current)) {
          current[pathItem] = {};
        }
        current = current[pathItem];
      }
      current[path[last]] = value;
    }));
    return result;
  };
}
function toLowerCase(value, options) {
  return null !== options && void 0 !== options && options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();
}
function toUpperCase(value, options) {
  return null !== options && void 0 !== options && options.locale ? value.toLocaleUpperCase(options.locale) : value.toUpperCase();
}
var ensurePropValueDefined = function(obj, propName, value, options) {
  if (isDefined(value)) {
    return value;
  }
  const newValue = {};
  assignPropValue(obj, propName, newValue, options);
  return newValue;
};
var compileSetter = function(expr) {
  expr = getPathParts(expr || "this");
  const lastLevelIndex = expr.length - 1;
  return function(obj, value, options) {
    options = prepareOptions(options);
    let currentValue = unwrap(obj, options);
    expr.forEach((function(propertyName, levelIndex) {
      let propertyValue = readPropValue(currentValue, propertyName, options);
      const isPropertyFunc = !options.functionsAsIs && isFunction(propertyValue) && !isWrapped(propertyValue);
      if (levelIndex === lastLevelIndex) {
        if (options.merge && isPlainObject(value) && (!isDefined(propertyValue) || isPlainObject(propertyValue))) {
          propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
          deepExtendArraySafe(propertyValue, value, false, true);
        } else if (isPropertyFunc) {
          currentValue[propertyName](value);
        } else {
          assignPropValue(currentValue, propertyName, value, options);
        }
      } else {
        propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
        if (isPropertyFunc) {
          propertyValue = propertyValue.call(currentValue);
        }
        currentValue = propertyValue;
      }
    }));
  };
};
var toComparable = function(value, caseSensitive) {
  var _options$collatorOpti;
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  if (value instanceof Date) {
    return value.getTime();
  }
  const collatorSensitivity = null === options || void 0 === options || null === (_options$collatorOpti = options.collatorOptions) || void 0 === _options$collatorOpti ? void 0 : _options$collatorOpti.sensitivity;
  if (value && value instanceof class_default && value.valueOf) {
    value = value.valueOf();
  } else if ("string" === typeof value && ("base" === collatorSensitivity || "case" === collatorSensitivity)) {
    const REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
    if ("base" === collatorSensitivity) {
      value = toLowerCase(value, options);
    }
    value = value.normalize("NFD").replace(REMOVE_DIACRITICAL_MARKS_REGEXP, "");
  }
  const isCaseSensitive = caseSensitive || "case" === collatorSensitivity || "variant" === collatorSensitivity;
  if ("string" === typeof value && !isCaseSensitive) {
    var _options$locale;
    const locale = null === options || void 0 === options || null === (_options$locale = options.locale) || void 0 === _options$locale ? void 0 : _options$locale.toLowerCase();
    const useUpperCase = locale && !!["hy", "el"].find(((code) => locale === code || locale.startsWith(`${code}-`)));
    return (useUpperCase ? toUpperCase : toLowerCase)(value, options);
  }
  return value;
};

// node_modules/devextreme/esm/__internal/core/utils/m_callbacks.js
var Callback = function(options) {
  this._options = options || {};
  this._list = [];
  this._queue = [];
  this._firing = false;
  this._fired = false;
  this._firingIndexes = [];
};
Callback.prototype._fireCore = function(context, args) {
  const firingIndexes = this._firingIndexes;
  const list = this._list;
  const {
    stopOnFalse
  } = this._options;
  const step = firingIndexes.length;
  for (firingIndexes[step] = 0; firingIndexes[step] < list.length; firingIndexes[step]++) {
    const result = list[firingIndexes[step]].apply(context, args);
    if (false === result && stopOnFalse) {
      break;
    }
  }
  firingIndexes.pop();
};
Callback.prototype.add = function(fn) {
  if ("function" === typeof fn && (!this._options.unique || !this.has(fn))) {
    this._list.push(fn);
  }
  return this;
};
Callback.prototype.remove = function(fn) {
  const list = this._list;
  const firingIndexes = this._firingIndexes;
  const index = list.indexOf(fn);
  if (index > -1) {
    list.splice(index, 1);
    if (this._firing && firingIndexes.length) {
      for (let step = 0; step < firingIndexes.length; step++) {
        if (index <= firingIndexes[step]) {
          firingIndexes[step]--;
        }
      }
    }
  }
  return this;
};
Callback.prototype.has = function(fn) {
  const list = this._list;
  return fn ? list.indexOf(fn) > -1 : !!list.length;
};
Callback.prototype.empty = function(fn) {
  this._list = [];
  return this;
};
Callback.prototype.fireWith = function(context, args) {
  const queue = this._queue;
  args = args || [];
  args = args.slice ? args.slice() : args;
  if (this._options.syncStrategy) {
    this._firing = true;
    this._fireCore(context, args);
  } else {
    queue.push([context, args]);
    if (this._firing) {
      return;
    }
    this._firing = true;
    while (queue.length) {
      const memory = queue.shift();
      this._fireCore(memory[0], memory[1]);
    }
  }
  this._firing = false;
  this._fired = true;
  return this;
};
Callback.prototype.fire = function() {
  this.fireWith(this, arguments);
};
Callback.prototype.fired = function() {
  return this._fired;
};
var Callbacks = function(options) {
  return new Callback(options);
};
var m_callbacks_default = Callbacks;

// node_modules/devextreme/esm/core/utils/callbacks.js
var callbacks_default = Callbacks;

// node_modules/devextreme/esm/__internal/core/utils/m_deferred.js
var deferredConfig = [{
  method: "resolve",
  handler: "done",
  state: "resolved"
}, {
  method: "reject",
  handler: "fail",
  state: "rejected"
}, {
  method: "notify",
  handler: "progress"
}];
var DeferredObj = function() {
  const that = this;
  this._state = "pending";
  this._promise = {};
  deferredConfig.forEach((function(config2) {
    const methodName = config2.method;
    this[`${methodName}Callbacks`] = callbacks_default();
    this[methodName] = (function() {
      return this[`${methodName}With`](this._promise, arguments);
    }).bind(this);
    this._promise[config2.handler] = function(handler) {
      if (!handler) {
        return this;
      }
      const callbacks = that[`${methodName}Callbacks`];
      if (callbacks.fired()) {
        handler.apply(that[`${methodName}Context`], that[`${methodName}Args`]);
      } else {
        callbacks.add((function(context, args) {
          handler.apply(context, args);
        }));
      }
      return this;
    };
  }).bind(this));
  this._promise.always = function(handler) {
    return this.done(handler).fail(handler);
  };
  this._promise.catch = function(handler) {
    return this.then(null, handler);
  };
  this._promise.then = function(resolve, reject) {
    const result = new DeferredObj();
    ["done", "fail"].forEach((function(method) {
      const callback = "done" === method ? resolve : reject;
      this[method]((function() {
        if (!callback) {
          result["done" === method ? "resolve" : "reject"].apply(this, arguments);
          return;
        }
        const callbackResult = callback && callback.apply(this, arguments);
        if (isDeferred(callbackResult)) {
          callbackResult.done(result.resolve).fail(result.reject);
        } else if (isPromise(callbackResult)) {
          callbackResult.then(result.resolve, result.reject);
        } else {
          result.resolve.apply(this, isDefined(callbackResult) ? [callbackResult] : arguments);
        }
      }));
    }).bind(this));
    return result.promise();
  };
  this._promise.state = function() {
    return that._state;
  };
  this._promise.promise = function(args) {
    return args ? extend(args, that._promise) : that._promise;
  };
  this._promise.promise(this);
};
deferredConfig.forEach((function(config2) {
  const methodName = config2.method;
  const {
    state
  } = config2;
  DeferredObj.prototype[`${methodName}With`] = function(context, args) {
    const callbacks = this[`${methodName}Callbacks`];
    if ("pending" === this.state()) {
      this[`${methodName}Args`] = args;
      this[`${methodName}Context`] = context;
      if (state) {
        this._state = state;
      }
      callbacks.fire(context, args);
      if ("pending" !== state) {
        this.resolveCallbacks.empty();
        this.rejectCallbacks.empty();
      }
    }
    return this;
  };
}));
function fromPromise(promise, context) {
  if (isDeferred(promise)) {
    return promise;
  }
  if (isPromise(promise)) {
    const d = new DeferredObj();
    promise.then((function() {
      d.resolveWith.apply(d, [context].concat([
        [].slice.call(arguments)
      ]));
    }), (function() {
      d.rejectWith.apply(d, [context].concat([
        [].slice.call(arguments)
      ]));
    }));
    return d;
  }
  return new DeferredObj().resolveWith(context, [promise]);
}
var whenFunc = function() {
  if (1 === arguments.length) {
    return fromPromise(arguments[0]);
  }
  const values = [].slice.call(arguments);
  const contexts = [];
  let resolvedCount = 0;
  const deferred = new DeferredObj();
  const updateState = function(i) {
    return function(value) {
      contexts[i] = this;
      values[i] = arguments.length > 1 ? [].slice.call(arguments) : value;
      resolvedCount++;
      if (resolvedCount === values.length) {
        deferred.resolveWith(contexts, values);
      }
    };
  };
  for (let i = 0; i < values.length; i++) {
    if (isDeferred(values[i])) {
      values[i].promise().done(updateState(i)).fail(deferred.reject);
    } else {
      resolvedCount++;
    }
  }
  if (resolvedCount === values.length) {
    deferred.resolveWith(contexts, values);
  }
  return deferred.promise();
};
function Deferred() {
  return new DeferredObj();
}
function when() {
  return whenFunc.apply(this, arguments);
}

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// node_modules/devextreme/esm/core/guid.js
var guid_default2 = guid_default;

// node_modules/devextreme/esm/__internal/core/utils/m_common.js
var uiLayerInitialized = new Deferred();
var ensureDefined = function(value, defaultValue) {
  return isDefined(value) ? value : defaultValue;
};
var executeAsync = function(action, context) {
  const deferred = new Deferred();
  const normalizedContext = context || this;
  const task = {
    promise: deferred.promise(),
    abort() {
      clearTimeout(timerId);
      deferred.rejectWith(normalizedContext);
    }
  };
  const timerId = (arguments[2] || setTimeout)((function() {
    const result = action.call(normalizedContext);
    if (result && result.done && isFunction(result.done)) {
      result.done((function() {
        deferred.resolveWith(normalizedContext);
      }));
    } else {
      deferred.resolveWith(normalizedContext);
    }
  }), "number" === typeof context ? context : 0);
  return task;
};
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function(name, func, deferred) {
  if (executingName && executingName !== name) {
    delayedFuncs.push(func);
    delayedNames.push(name);
    deferred = deferred || new Deferred();
    delayedDeferreds.push(deferred);
    return deferred;
  }
  const oldExecutingName = executingName;
  const currentDelayedCount = delayedDeferreds.length;
  executingName = name;
  let result = func();
  if (!result) {
    if (delayedDeferreds.length > currentDelayedCount) {
      result = when.apply(this, delayedDeferreds.slice(currentDelayedCount));
    } else if (deferred) {
      deferred.resolve();
    }
  }
  executingName = oldExecutingName;
  if (deferred && result && result.done) {
    result.done(deferred.resolve).fail(deferred.reject);
  }
  if (!executingName && delayedFuncs.length) {
    ("render" === delayedNames.shift() ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift());
  }
  return result || when();
};
var deferRender = function(func, deferred) {
  return deferExecute("render", func, deferred);
};
var deferUpdate = function(func, deferred) {
  return deferExecute("update", func, deferred);
};
var deferRenderer = function(func) {
  return function() {
    const that = this;
    return deferExecute("render", (function() {
      return func.call(that);
    }));
  };
};
var deferUpdater = function(func) {
  return function() {
    const that = this;
    return deferExecute("update", (function() {
      return func.call(that);
    }));
  };
};
var findBestMatches = (targetFilter, items, mapFn) => {
  const bestMatches = [];
  let maxMatchCount = 0;
  each(items, ((index, itemSrc) => {
    let matchCount = 0;
    const item = mapFn ? mapFn(itemSrc) : itemSrc;
    each(targetFilter, ((paramName, targetValue) => {
      const value = item[paramName];
      if (void 0 === value) {
        return;
      }
      if (match(value, targetValue)) {
        matchCount++;
        return;
      }
      matchCount = -1;
      return false;
    }));
    if (matchCount < maxMatchCount) {
      return;
    }
    if (matchCount > maxMatchCount) {
      bestMatches.length = 0;
      maxMatchCount = matchCount;
    }
    bestMatches.push(itemSrc);
  }));
  return bestMatches;
};
var match = function(value, targetValue) {
  if (Array.isArray(value) && Array.isArray(targetValue)) {
    let mismatch = false;
    each(value, ((index, valueItem) => {
      if (valueItem !== targetValue[index]) {
        mismatch = true;
        return false;
      }
    }));
    if (mismatch) {
      return false;
    }
    return true;
  }
  if (value === targetValue) {
    return true;
  }
  return false;
};
var splitPair = function(raw) {
  switch (type(raw)) {
    case "string":
      return raw.split(/\s+/, 2);
    case "object":
      return [raw.x ?? raw.h, raw.y ?? raw.v];
    case "number":
      return [raw];
    case "array":
      return raw;
    default:
      return null;
  }
};
var normalizeKey = function(id) {
  let key = isString(id) ? id : id.toString();
  const arr = key.match(/[^a-zA-Z0-9_]/g);
  arr && each(arr, ((_, sign) => {
    key = key.replace(sign, `__${sign.charCodeAt()}__`);
  }));
  return key;
};
var denormalizeKey = function(key) {
  const arr = key.match(/__\d+__/g);
  arr && arr.forEach(((char) => {
    const charCode = parseInt(char.replace("__", ""));
    key = key.replace(char, String.fromCharCode(charCode));
  }));
  return key;
};
var pairToObject = function(raw, preventRound) {
  const pair = splitPair(raw);
  let h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
  let v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
  if (!isFinite(h)) {
    h = 0;
  }
  if (!isFinite(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getKeyHash = function(key) {
  if (key instanceof guid_default2) {
    return key.toString();
  }
  if (isObject(key) || Array.isArray(key)) {
    try {
      const keyHash = JSON.stringify(key);
      return "{}" === keyHash ? key : keyHash;
    } catch (e) {
      return key;
    }
  }
  return key;
};
var escapeRegExp = function(string) {
  return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, "\\$&");
};
var applyServerDecimalSeparator = function(value) {
  const separator = config_default2().serverDecimalSeparator;
  if (isDefined(value)) {
    value = value.toString().replace(".", separator);
  }
  return value;
};
var noop2 = function() {
};
var asyncNoop = function() {
  return new Deferred().resolve().promise();
};
var grep = function(elements, checkFunction, invert) {
  const result = [];
  let check;
  const expectedCheck = !invert;
  for (let i = 0; i < elements.length; i++) {
    check = !!checkFunction(elements[i], i);
    if (check === expectedCheck) {
      result.push(elements[i]);
    }
  }
  return result;
};
var compareArrays = (array1, array2, depth, options) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return !array1.some(((item, idx) => !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
    strict: true
  }))));
};
var compareObjects = (object1, object2, depth, options) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  const keys2Set = new Set(keys2);
  return !keys1.some(((key) => !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options)));
};
var DEFAULT_EQUAL_BY_VALUE_OPTS = {
  maxDepth: 3,
  strict: true
};
var compareByValue = (value1, value2, depth, options) => {
  const {
    strict,
    maxDepth
  } = options;
  const comparable1 = toComparable(value1, true);
  const comparable2 = toComparable(value2, true);
  const comparisonResult = strict ? comparable1 === comparable2 : comparable1 == comparable2;
  switch (true) {
    case comparisonResult:
    case depth >= maxDepth:
      return true;
    case (isObject(comparable1) && isObject(comparable2)):
      return compareObjects(comparable1, comparable2, depth, options);
    case (Array.isArray(comparable1) && Array.isArray(comparable2)):
      return compareArrays(comparable1, comparable2, depth, options);
    default:
      return false;
  }
};
var equalByValue = function(value1, value2) {
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
  const compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
  return compareByValue(value1, value2, 0, compareOptions);
};
var m_common_default = {
  ensureDefined,
  executeAsync,
  deferRender,
  deferUpdate,
  deferRenderer,
  deferUpdater,
  findBestMatches,
  splitPair,
  normalizeKey,
  denormalizeKey,
  pairToObject,
  getKeyHash,
  escapeRegExp,
  applyServerDecimalSeparator,
  noop: noop2,
  asyncNoop,
  grep,
  equalByValue
};

// node_modules/devextreme/esm/__internal/core/utils/m_shadow_dom.js
var ownerDocumentStyleSheet = null;
function createConstructedStyleSheet(rootNode) {
  try {
    return new CSSStyleSheet();
  } catch (err) {
    const styleElement = rootNode.ownerDocument.createElement("style");
    rootNode.appendChild(styleElement);
    return styleElement.sheet;
  }
}
function processRules(targetStyleSheet, styleSheets, needApplyAllStyles) {
  for (let i = 0; i < styleSheets.length; i++) {
    const sheet = styleSheets[i];
    try {
      for (let j = 0; j < sheet.cssRules.length; j++) {
        insertRule(targetStyleSheet, sheet.cssRules[j], needApplyAllStyles);
      }
    } catch (err) {
    }
  }
}
function insertRule(targetStyleSheet, rule, needApplyAllStyles) {
  var _rule$selectorText, _rule$cssRules, _rule$name, _rule$style;
  const isDxRule = needApplyAllStyles || (null === (_rule$selectorText = rule.selectorText) || void 0 === _rule$selectorText ? void 0 : _rule$selectorText.includes("dx-")) || (null === (_rule$cssRules = rule.cssRules) || void 0 === _rule$cssRules || null === (_rule$cssRules = _rule$cssRules[0]) || void 0 === _rule$cssRules || null === (_rule$cssRules = _rule$cssRules.selectorText) || void 0 === _rule$cssRules ? void 0 : _rule$cssRules.includes("dx-")) || (null === (_rule$name = rule.name) || void 0 === _rule$name ? void 0 : _rule$name.startsWith("dx-")) || "DXIcons" === (null === (_rule$style = rule.style) || void 0 === _rule$style ? void 0 : _rule$style.fontFamily);
  if (isDxRule) {
    targetStyleSheet.insertRule(rule.cssText, targetStyleSheet.cssRules.length);
  }
}
var sheetHashes = /* @__PURE__ */ new WeakMap();
function computeStyleSheetsHash(styleSheets) {
  let hash = 2166136261;
  for (const sheet of styleSheets) {
    if (sheetHashes.has(sheet)) {
      hash ^= sheetHashes.get(sheet);
      continue;
    }
    let localHash = 2166136261;
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText;
        for (let i = 0; i < text.length; i++) {
          localHash ^= text.charCodeAt(i);
          localHash += (localHash << 1) + (localHash << 4) + (localHash << 7) + (localHash << 8) + (localHash << 24);
        }
      }
    } catch (_) {
    }
    localHash >>>= 0;
    sheetHashes.set(sheet, localHash);
    hash ^= localHash;
  }
  return hash >>> 0;
}
var styleSheetHashes = /* @__PURE__ */ new WeakMap();
function addShadowDomStyles($element) {
  var _el$getRootNode;
  if (!config_default2().copyStylesToShadowDom) {
    return;
  }
  const el = $element.get(0);
  const root = null === (_el$getRootNode = el.getRootNode) || void 0 === _el$getRootNode ? void 0 : _el$getRootNode.call(el);
  if (!(null !== root && void 0 !== root && root.host)) {
    return;
  }
  if (!ownerDocumentStyleSheet) {
    ownerDocumentStyleSheet = createConstructedStyleSheet(root);
    processRules(ownerDocumentStyleSheet, el.ownerDocument.styleSheets, false);
  }
  const localHash = computeStyleSheetsHash(root.styleSheets);
  if (styleSheetHashes.get(root) === localHash) {
    return;
  }
  styleSheetHashes.set(root, localHash);
  const currentShadowDomStyleSheet = createConstructedStyleSheet(root);
  processRules(currentShadowDomStyleSheet, root.styleSheets, true);
  root.adoptedStyleSheets = [ownerDocumentStyleSheet, currentShadowDomStyleSheet];
}
function isPositionInElementRectangle(element, x, y) {
  var _element$getBoundingC;
  const rect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
  return rect && x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}
function createQueue() {
  let shiftIndex = 0;
  const items = [];
  return {
    push(item) {
      items.push(item);
      return this;
    },
    shift() {
      shiftIndex++;
      return items[shiftIndex - 1];
    },
    get length() {
      return items.length - shiftIndex;
    },
    get items() {
      return items;
    }
  };
}
function getShadowElementsFromPoint(x, y, root) {
  const elementQueue = createQueue().push(root);
  while (elementQueue.length) {
    const el = elementQueue.shift();
    for (let i = 0; i < el.childNodes.length; i++) {
      const childNode = el.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE && isPositionInElementRectangle(childNode, x, y) && "none" !== getComputedStyle(childNode).pointerEvents) {
        elementQueue.push(childNode);
      }
    }
  }
  const result = elementQueue.items.reverse();
  result.pop();
  return result;
}

// node_modules/devextreme/esm/__internal/core/m_dom_adapter.js
var nativeDOMAdapterStrategy = {
  querySelectorAll: (element, selector) => element.querySelectorAll(selector),
  elementMatches(element, selector) {
    const matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || ((selector2) => {
      const doc = element.document || element.ownerDocument;
      if (!doc) {
        return false;
      }
      const items = this.querySelectorAll(doc, selector2);
      for (let i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    });
    return matches.call(element, selector);
  },
  createElement(tagName, context) {
    context = context ?? this._document;
    return context.createElement(tagName);
  },
  createElementNS(ns, tagName, context) {
    context = context || this._document;
    return context.createElementNS(ns, tagName);
  },
  createTextNode(text, context) {
    context = context || this._document;
    return context.createTextNode(text);
  },
  createAttribute(text, context) {
    context = context || this._document;
    return context.createAttribute(text);
  },
  isNode: (element) => !!element && "object" === typeof element && "nodeType" in element && "nodeName" in element,
  isElementNode: (element) => !!element && 1 === element.nodeType,
  isTextNode: (element) => element && 3 === element.nodeType,
  isDocument: (element) => element && 9 === element.nodeType,
  isDocumentFragment: (element) => element && 11 === element.nodeType,
  removeElement(element) {
    const parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute: (element, name) => element.getAttribute(name),
  setAttribute(element, name, value) {
    if ("style" === name) {
      element.style.cssText = value;
    } else {
      element.setAttribute(name, value);
    }
  },
  removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty(element, name, value) {
    element[name] = value;
  },
  setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass(element, className, isAdd) {
    if (1 === element.nodeType && className) {
      isAdd ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  setStyle(element, name, value) {
    element.style[name] = value || "";
  },
  _document: "undefined" === typeof document ? void 0 : document,
  getDocument() {
    return this._document;
  },
  getActiveElement(element) {
    const activeElementHolder = this.getRootNode(element);
    return activeElementHolder.activeElement;
  },
  getRootNode(element) {
    var _element$getRootNode;
    return (null === element || void 0 === element || null === (_element$getRootNode = element.getRootNode) || void 0 === _element$getRootNode ? void 0 : _element$getRootNode.call(element)) ?? this._document;
  },
  getBody() {
    return this._document.body;
  },
  createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation() {
    return this._document.location;
  },
  getSelection() {
    return this._document.selection;
  },
  getReadyState() {
    return this._document.readyState;
  },
  getHead() {
    return this._document.head;
  },
  hasDocumentProperty(property) {
    return property in this._document;
  },
  listen(element, event, callback, options) {
    if (!element || !("addEventListener" in element)) {
      return noop2;
    }
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback);
    };
  },
  elementsFromPoint(x, y, element) {
    const activeElementHolder = this.getRootNode(element);
    if (activeElementHolder.host) {
      return getShadowElementsFromPoint(x, y, activeElementHolder);
    }
    return activeElementHolder.elementsFromPoint(x, y);
  }
};
var domAdapter = dependency_injector_default(nativeDOMAdapterStrategy);
var m_dom_adapter_default = domAdapter;

// node_modules/devextreme/esm/core/dom_adapter.js
var dom_adapter_default = domAdapter;

// node_modules/devextreme/esm/__internal/core/utils/m_window.js
var hasWindowValue = "undefined" !== typeof window;
var hasWindow = () => hasWindowValue;
var windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}
var getWindow = () => windowObject;
var setWindow = (newWindowObject, hasWindow2) => {
  if (void 0 === hasWindow2) {
    hasWindowValue = "undefined" !== typeof window && window === newWindowObject;
  } else {
    hasWindowValue = hasWindow2;
  }
  windowObject = newWindowObject;
};
var hasProperty = (prop) => hasWindow() && prop in windowObject;
var defaultScreenFactorFunc = (width) => {
  if (width < 768) {
    return "xs";
  }
  if (width < 992) {
    return "sm";
  }
  if (width < 1200) {
    return "md";
  }
  return "lg";
};
var getCurrentScreenFactor = (screenFactorCallback) => {
  const screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
  const windowWidth = dom_adapter_default.getDocumentElement().clientWidth;
  return screenFactorFunc(windowWidth);
};
var getNavigator = () => {
  var _windowObject;
  return hasWindow() ? null === (_windowObject = windowObject) || void 0 === _windowObject ? void 0 : _windowObject.navigator : {
    userAgent: ""
  };
};
var m_window_default = {
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  getNavigator,
  getWindow,
  hasProperty,
  hasWindow,
  setWindow
};

export {
  _extends,
  type,
  isBoolean,
  isExponential,
  isDate,
  isDefined,
  isFunction,
  isString,
  isNumeric,
  isObject,
  isEmptyObject,
  isPlainObject,
  isPrimitive,
  isWindow,
  isRenderer,
  isPromise,
  isDeferred,
  isEvent,
  m_type_default,
  extendFromObject,
  extend,
  encodeHtml,
  quadToObject,
  format,
  isEmpty,
  version,
  fullVersion,
  logger,
  error_default,
  errors_default,
  config_default,
  class_default,
  Guid,
  guid_default,
  registerTemplateEngine,
  setTemplateEngine,
  getCurrentTemplateEngine,
  set_template_engine_default,
  config_default2,
  guid_default2,
  map,
  each,
  reverseEach,
  dependency_injector_default,
  variable_wrapper_default,
  clone,
  orderEach,
  deepExtendArraySafe,
  getPathParts,
  compileGetter,
  compileSetter,
  toComparable,
  m_callbacks_default,
  callbacks_default,
  fromPromise,
  Deferred,
  when,
  uiLayerInitialized,
  ensureDefined,
  executeAsync,
  deferRender,
  deferUpdate,
  deferRenderer,
  deferUpdater,
  findBestMatches,
  splitPair,
  normalizeKey,
  pairToObject,
  getKeyHash,
  escapeRegExp,
  applyServerDecimalSeparator,
  noop2 as noop,
  asyncNoop,
  grep,
  equalByValue,
  m_common_default,
  addShadowDomStyles,
  m_dom_adapter_default,
  dom_adapter_default,
  hasWindow,
  getWindow,
  hasProperty,
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  getNavigator,
  m_window_default
};
//# sourceMappingURL=chunk-4U6OD5AW.js.map
