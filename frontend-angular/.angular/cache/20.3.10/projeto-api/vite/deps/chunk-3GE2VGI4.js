import {
  call_once_default,
  m_events_engine_default,
  memorized_callbacks_default
} from "./chunk-4JX72F7N.js";
import {
  dependency_injector_default,
  dom_adapter_default,
  getWindow,
  hasWindow,
  isDefined,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isRenderer,
  isString,
  isWindow,
  map,
  type
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/core/utils/m_html_parser.js
var isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var tagWrappers = {
  default: {
    tagsCount: 0,
    startTags: "",
    endTags: ""
  },
  thead: {
    tagsCount: 1,
    startTags: "<table>",
    endTags: "</table>"
  },
  td: {
    tagsCount: 3,
    startTags: "<table><tbody><tr>",
    endTags: "</tr></tbody></table>"
  },
  col: {
    tagsCount: 2,
    startTags: "<table><colgroup>",
    endTags: "</colgroup></table>"
  },
  tr: {
    tagsCount: 2,
    startTags: "<table><tbody>",
    endTags: "</tbody></table>"
  }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
var parseHTML = function(html) {
  if ("string" !== typeof html) {
    return null;
  }
  const fragment = dom_adapter_default.createDocumentFragment();
  let container = fragment.appendChild(dom_adapter_default.createElement("div"));
  const tags = isTagName.exec(html);
  const firstRootTag = null === tags || void 0 === tags ? void 0 : tags[1].toLowerCase();
  const tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (let i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
var isTablePart = function(html) {
  const tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};

// node_modules/devextreme/esm/__internal/core/utils/m_size.js
var window = getWindow();
var SPECIAL_HEIGHT_VALUES = ["auto", "none", "inherit", "initial"];
var getSizeByStyles = function(elementStyles, styles) {
  let result = 0;
  styles.forEach((function(style) {
    result += parseFloat(elementStyles[style]) || 0;
  }));
  return result;
};
var getElementBoxParams = function(name, elementStyles) {
  const beforeName = "width" === name ? "Left" : "Top";
  const afterName = "width" === name ? "Right" : "Bottom";
  return {
    padding: getSizeByStyles(elementStyles, [`padding${beforeName}`, `padding${afterName}`]),
    border: getSizeByStyles(elementStyles, [`border${beforeName}Width`, `border${afterName}Width`]),
    margin: getSizeByStyles(elementStyles, [`margin${beforeName}`, `margin${afterName}`])
  };
};
var getElementComputedStyle = function(element) {
  var _element$ownerDocumen;
  const view = (null === element || void 0 === element || null === (_element$ownerDocumen = element.ownerDocument) || void 0 === _element$ownerDocumen ? void 0 : _element$ownerDocumen.defaultView) || window;
  return view.getComputedStyle && view.getComputedStyle(element);
};
var getCSSProperty = function(element, styles, name, defaultValue) {
  var _element$style;
  return (null === styles || void 0 === styles ? void 0 : styles[name]) || (null === (_element$style = element.style) || void 0 === _element$style ? void 0 : _element$style[name]) || defaultValue;
};
var boxIndices = {
  content: 0,
  padding: 1,
  border: 2,
  margin: 3,
  "content-box": 0,
  "border-box": 2
};
var dimensionComponents = {
  width: ["left", "right"],
  height: ["top", "bottom"]
};
function getComponentThickness(elem, dimension, component, styles) {
  const get = (elem2, styles2, field) => parseFloat(getCSSProperty(elem2, styles2, field, "0")) || 0;
  const suffix = "border" === component ? "-width" : "";
  return get(elem, styles, `${component}-${dimensionComponents[dimension][0]}${suffix}`) + get(elem, styles, `${component}-${dimensionComponents[dimension][1]}${suffix}`);
}
var getSize = function(element, dimension, box) {
  const offsetFieldName = "width" === dimension ? "offsetWidth" : "offsetHeight";
  const styles = getElementComputedStyle(element);
  let result = getCSSProperty(element, styles, dimension);
  if ("" === result || "auto" === result) {
    result = element[offsetFieldName];
  }
  result = parseFloat(result) || 0;
  const currentBox = getCSSProperty(element, styles, "boxSizing", "content-box");
  const targetBox = box || currentBox;
  let targetBoxIndex = boxIndices[targetBox];
  let currentBoxIndex = boxIndices[currentBox];
  if (void 0 === targetBoxIndex || void 0 === currentBoxIndex) {
    throw new Error();
  }
  if (currentBoxIndex === targetBoxIndex) {
    return result;
  }
  const coeff = Math.sign(targetBoxIndex - currentBoxIndex);
  let padding = false;
  let border = false;
  let margin = false;
  let scrollThickness = false;
  if (1 === coeff) {
    targetBoxIndex += 1;
    currentBoxIndex += 1;
  }
  for (let boxPart = currentBoxIndex; boxPart !== targetBoxIndex; boxPart += coeff) {
    switch (boxPart) {
      case boxIndices.content:
        break;
      case boxIndices.padding:
        padding = coeff * getComponentThickness(element, dimension, "padding", styles);
        break;
      case boxIndices.border:
        border = coeff * getComponentThickness(element, dimension, "border", styles);
        break;
      case boxIndices.margin:
        margin = coeff * getComponentThickness(element, dimension, "margin", styles);
    }
  }
  if (padding || border) {
    const paddingAndBorder = (false === padding ? coeff * getComponentThickness(element, dimension, "padding", styles) : padding) + (false === border ? coeff * getComponentThickness(element, dimension, "border", styles) : border);
    scrollThickness = coeff * Math.max(0, Math.floor(element[offsetFieldName] - result - coeff * paddingAndBorder)) || 0;
  }
  return result + margin + padding + border + scrollThickness;
};
var getContainerHeight = function(container) {
  return isWindow(container) ? container.innerHeight : container.offsetHeight;
};
var parseHeight = function(value, container, element) {
  if (value.indexOf("px") > 0) {
    value = parseInt(value.replace("px", ""));
  } else if (value.indexOf("%") > 0) {
    value = parseInt(value.replace("%", "")) * getContainerHeight(container) / 100;
  } else if (!isNaN(value)) {
    value = parseInt(value);
  } else if (value.indexOf("vh") > 0) {
    value = window.innerHeight / 100 * parseInt(value.replace("vh", ""));
  } else if (element && value.indexOf("em") > 0) {
    value = parseFloat(value.replace("em", "")) * parseFloat(window.getComputedStyle(element).fontSize);
  }
  return value;
};
var getHeightWithOffset = function(value, offset, container) {
  if (!value) {
    return null;
  }
  if (SPECIAL_HEIGHT_VALUES.includes(value)) {
    return offset ? null : value;
  }
  if (isString(value)) {
    value = parseHeight(value, container);
  }
  if (isNumeric(value)) {
    return Math.max(0, value + offset);
  }
  const operationString = offset < 0 ? " - " : " ";
  return `calc(${value}${operationString}${Math.abs(offset)}px)`;
};
var addOffsetToMaxHeight = function(value, offset, container) {
  const maxHeight = getHeightWithOffset(value, offset, container);
  return null !== maxHeight ? maxHeight : "none";
};
var addOffsetToMinHeight = function(value, offset, container) {
  const minHeight = getHeightWithOffset(value, offset, container);
  return null !== minHeight ? minHeight : 0;
};
var getVerticalOffsets = function(element, withMargins) {
  if (!element) {
    return 0;
  }
  const boxParams = getElementBoxParams("height", window.getComputedStyle(element));
  return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
};
var getVisibleHeight = function(element) {
  if (element) {
    var _element$getBoundingC;
    const boundingClientRect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
    if (null !== boundingClientRect && void 0 !== boundingClientRect && boundingClientRect.height) {
      return boundingClientRect.height;
    }
  }
  return 0;
};
var implementationsMap = {
  getWidth: function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return elementSizeHelper("width", ...args);
  },
  setWidth: function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return elementSizeHelper("width", ...args);
  },
  getHeight: function() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return elementSizeHelper("height", ...args);
  },
  setHeight: function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return elementSizeHelper("height", ...args);
  },
  getOuterWidth: function() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  setOuterWidth: function() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  getOuterHeight: function() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  setOuterHeight: function() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  getInnerWidth: function() {
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  setInnerWidth: function() {
    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  getInnerHeight: function() {
    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }
    return elementSizeHelper("innerHeight", ...args);
  },
  setInnerHeight: function() {
    for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }
    return elementSizeHelper("innerHeight", ...args);
  }
};
function elementSizeHelper(sizeProperty, el, value) {
  return 2 === arguments.length ? elementSize(el, sizeProperty) : elementSize(el, sizeProperty, value);
}
var getWidth = (el) => implementationsMap.getWidth(el);
var setWidth = (el, value) => implementationsMap.setWidth(el, value);
var getHeight = (el) => implementationsMap.getHeight(el);
var setHeight = (el, value) => implementationsMap.setHeight(el, value);
var getOuterWidth = (el, includeMargin) => implementationsMap.getOuterWidth(el, includeMargin || false);
var setOuterWidth = (el, value) => implementationsMap.setOuterWidth(el, value);
var getOuterHeight = (el, includeMargin) => implementationsMap.getOuterHeight(el, includeMargin || false);
var setOuterHeight = (el, value) => implementationsMap.setOuterHeight(el, value);
var getInnerWidth = (el) => implementationsMap.getInnerWidth(el);
var getInnerHeight = (el) => implementationsMap.getInnerHeight(el);
var elementSize = function(el, sizeProperty, value) {
  const partialName = sizeProperty.toLowerCase().indexOf("width") >= 0 ? "Width" : "Height";
  const propName = partialName.toLowerCase();
  const isOuter = 0 === sizeProperty.indexOf("outer");
  const isInner = 0 === sizeProperty.indexOf("inner");
  const isGetter = 2 === arguments.length || "boolean" === typeof value;
  if (isRenderer(el)) {
    if (el.length > 1 && !isGetter) {
      for (let i = 0; i < el.length; i++) {
        elementSize(el[i], sizeProperty, value);
      }
      return;
    }
    el = el[0];
  }
  if (!el) {
    return;
  }
  if (isWindow(el)) {
    return isOuter ? el[`inner${partialName}`] : dom_adapter_default.getDocumentElement()[`client${partialName}`];
  }
  if (dom_adapter_default.isDocument(el)) {
    const documentElement = dom_adapter_default.getDocumentElement();
    const body = dom_adapter_default.getBody();
    return Math.max(body[`scroll${partialName}`], body[`offset${partialName}`], documentElement[`scroll${partialName}`], documentElement[`offset${partialName}`], documentElement[`client${partialName}`]);
  }
  if (isGetter) {
    let box = "content";
    if (isOuter) {
      box = value ? "margin" : "border";
    }
    if (isInner) {
      box = "padding";
    }
    return getSize(el, propName, box);
  }
  if (isNumeric(value)) {
    const elementStyles = getElementComputedStyle(el);
    const sizeAdjustment = getElementBoxParams(propName, elementStyles);
    const isBorderBox = "border-box" === elementStyles.boxSizing;
    value = Number(value);
    if (isOuter) {
      value -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding;
    } else if (isInner) {
      value += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding;
    } else if (isBorderBox) {
      value += sizeAdjustment.border + sizeAdjustment.padding;
    }
  }
  value += isNumeric(value) ? "px" : "";
  dom_adapter_default.setStyle(el, propName, value);
  return null;
};
var getWindowByElement = (el) => isWindow(el) ? el : el.defaultView;
var getOffset = (el) => {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }
  const rect = el.getBoundingClientRect();
  const win = getWindowByElement(el.ownerDocument);
  const docElem = el.ownerDocument.documentElement;
  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  };
};

// node_modules/devextreme/esm/__internal/core/m_element_data.js
var dataMap = /* @__PURE__ */ new WeakMap();
var strategy;
var strategyChanging = new memorized_callbacks_default();
var beforeCleanDataFunc = function() {
};
var afterCleanDataFunc = function() {
};
var setDataStrategy = function(value) {
  strategyChanging.fire(value);
  strategy = value;
  const {
    cleanData: cleanData2
  } = strategy;
  strategy.cleanData = function(nodes) {
    beforeCleanDataFunc(nodes);
    const result = cleanData2.call(this, nodes);
    afterCleanDataFunc(nodes);
    return result;
  };
};
setDataStrategy({
  data: function() {
    const element = arguments.length <= 0 ? void 0 : arguments[0];
    const key = arguments.length <= 1 ? void 0 : arguments[1];
    const value = arguments.length <= 2 ? void 0 : arguments[2];
    if (!element) {
      return;
    }
    let elementData = dataMap.get(element);
    if (!elementData) {
      elementData = {};
      dataMap.set(element, elementData);
    }
    if (void 0 === key) {
      return elementData;
    }
    if (2 === arguments.length) {
      return elementData[key];
    }
    elementData[key] = value;
    return value;
  },
  removeData: function(element, key) {
    if (!element) {
      return;
    }
    if (void 0 === key) {
      dataMap.delete(element);
    } else {
      const elementData = dataMap.get(element);
      if (elementData) {
        delete elementData[key];
      }
    }
  },
  cleanData: function(elements) {
    for (let i = 0; i < elements.length; i++) {
      m_events_engine_default.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
function data() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return strategy.data.apply(this, args);
}
function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
function cleanDataRecursive(element, cleanSelf) {
  if (!dom_adapter_default.isElementNode(element)) {
    return;
  }
  const childElements = element.getElementsByTagName("*");
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}

// node_modules/devextreme/esm/__internal/core/utils/m_inflector.js
var _normalize = function(text) {
  if (void 0 === text || null === text) {
    return "";
  }
  return String(text);
};
var _upperCaseFirst = function(text) {
  return _normalize(text).charAt(0).toUpperCase() + text.substr(1);
};
var _chop = function(text) {
  return _normalize(text).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
};
var dasherize = function(text) {
  return map(_chop(text), (function(p) {
    return p.toLowerCase();
  })).join("-");
};
var underscore = function(text) {
  return dasherize(text).replace(/-/g, "_");
};
var camelize = function(text, upperFirst) {
  return map(_chop(text), (function(p, i) {
    p = p.toLowerCase();
    if (upperFirst || i > 0) {
      p = _upperCaseFirst(p);
    }
    return p;
  })).join("");
};
var humanize = function(text) {
  return _upperCaseFirst(dasherize(text).replace(/-/g, " "));
};
var titleize = function(text) {
  return map(_chop(text), (function(p) {
    return _upperCaseFirst(p.toLowerCase());
  })).join(" ");
};
var DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var captionize = function(name) {
  const captionList = [];
  let i;
  let char;
  let isPrevCharNewWord = false;
  let isNewWord = false;
  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord = char === char.toUpperCase() && "-" !== char && ")" !== char && "/" !== char || char in DIGIT_CHARS;
    if ("_" === char || "." === char) {
      char = " ";
      isNewWord = true;
    } else if (0 === i) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(" ");
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join("");
};
var m_inflector_default = {
  dasherize,
  underscore,
  camelize,
  humanize,
  titleize,
  captionize
};

// node_modules/devextreme/esm/__internal/core/utils/m_style.js
var jsPrefixes = ["", "Webkit", "Moz", "O", "Ms"];
var cssPrefixes = {
  "": "",
  Webkit: "-webkit-",
  Moz: "-moz-",
  O: "-o-",
  ms: "-ms-"
};
var getStyles = call_once_default((function() {
  return dom_adapter_default.createElement("dx").style;
}));
var forEachPrefixes = function(prop, callBack) {
  prop = camelize(prop, true);
  let result;
  for (let i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
    const jsPrefix = jsPrefixes[i];
    const prefixedProp = jsPrefix + prop;
    const lowerPrefixedProp = camelize(prefixedProp);
    result = callBack(lowerPrefixedProp, jsPrefix);
    if (void 0 === result) {
      result = callBack(prefixedProp, jsPrefix);
    }
    if (void 0 !== result) {
      break;
    }
  }
  return result || "";
};
var styleProp = function(name) {
  if (name in getStyles()) {
    return name;
  }
  const originalName = name;
  name = name.charAt(0).toUpperCase() + name.substr(1);
  for (let i = 1; i < jsPrefixes.length; i++) {
    const prefixedProp = jsPrefixes[i].toLowerCase() + name;
    if (prefixedProp in getStyles()) {
      return prefixedProp;
    }
  }
  return originalName;
};
var stylePropPrefix = function(prop) {
  return forEachPrefixes(prop, (function(specific, jsPrefix) {
    if (specific in getStyles()) {
      return cssPrefixes[jsPrefix];
    }
  }));
};
var pxExceptions = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
var normalizeStyleProp = function(prop, value) {
  if (isNumeric(value) && !pxExceptions.includes(prop)) {
    value += "px";
  }
  return value;
};
var setDimensionProperty = function(elements, propertyName, value) {
  if (elements) {
    value = isNumeric(value) ? value += "px" : value;
    for (let i = 0; i < elements.length; ++i) {
      elements[i].style[propertyName] = value;
    }
  }
};
var setWidth2 = function(elements, value) {
  setDimensionProperty(elements, "width", value);
};
var setHeight2 = function(elements, value) {
  setDimensionProperty(elements, "height", value);
};
var setStyle = function(element, styleString) {
  let resetStyle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
  if (resetStyle) {
    const styleList = [].slice.call(element.style);
    styleList.forEach(((propertyName) => {
      element.style.removeProperty(propertyName);
    }));
  }
  styleString.split(";").forEach(((style) => {
    const parts = style.split(":").map(((stylePart) => stylePart.trim()));
    if (2 === parts.length) {
      const [property, value] = parts;
      element.style[property] = value;
    }
  }));
};

// node_modules/devextreme/esm/__internal/core/m_renderer_base.js
var window2 = getWindow();
var renderer;
var initRender = function(selector, context) {
  if (!selector) {
    this.length = 0;
    return this;
  }
  if ("string" === typeof selector) {
    if ("body" === selector) {
      this[0] = context ? context.body : dom_adapter_default.getBody();
      this.length = 1;
      return this;
    }
    context = context || dom_adapter_default.getDocument();
    if (selector.startsWith("<")) {
      this[0] = dom_adapter_default.createElement(selector.slice(1, -1), context);
      this.length = 1;
      return this;
    }
    [].push.apply(this, dom_adapter_default.querySelectorAll(context, selector));
    return this;
  }
  if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
    this[0] = selector;
    this.length = 1;
    return this;
  }
  if (Array.isArray(selector)) {
    [].push.apply(this, selector);
    return this;
  }
  return renderer(selector.toArray ? selector.toArray() : [selector]);
};
renderer = function(selector, context) {
  return new initRender(selector, context);
};
renderer.fn = {
  dxRenderer: true
};
initRender.prototype = renderer.fn;
var repeatMethod = function(methodName, args) {
  for (let i = 0; i < this.length; i++) {
    const item = renderer(this[i]);
    item[methodName].apply(item, args);
  }
  return this;
};
var setAttributeValue = function(element, attrName, value) {
  if (void 0 !== value && null !== value && false !== value) {
    dom_adapter_default.setAttribute(element, attrName, value);
  } else {
    dom_adapter_default.removeAttribute(element, attrName);
  }
};
initRender.prototype.show = function() {
  return this.toggle(true);
};
initRender.prototype.hide = function() {
  return this.toggle(false);
};
initRender.prototype.toggle = function(value) {
  if (this[0]) {
    this.toggleClass("dx-state-invisible", !value);
  }
  return this;
};
initRender.prototype.attr = function(attrName, value) {
  if (this.length > 1 && arguments.length > 1) {
    return repeatMethod.call(this, "attr", arguments);
  }
  if (!this[0]) {
    if (isObject(attrName) || void 0 !== value) {
      return this;
    }
    return;
  }
  if (!this[0].getAttribute) {
    return this.prop(attrName, value);
  }
  if ("string" === typeof attrName && 1 === arguments.length) {
    const result = this[0].getAttribute(attrName);
    return null == result ? void 0 : result;
  }
  if (isPlainObject(attrName)) {
    for (const key in attrName) {
      this.attr(key, attrName[key]);
    }
  } else {
    setAttributeValue(this[0], attrName, value);
  }
  return this;
};
initRender.prototype.removeAttr = function(attrName) {
  this.each((function(_, element) {
    dom_adapter_default.removeAttribute(element, attrName);
  }));
  return this;
};
initRender.prototype.prop = function(propName, value) {
  if (!this[0]) {
    return this;
  }
  if ("string" === typeof propName && 1 === arguments.length) {
    return this[0][propName];
  }
  if (isPlainObject(propName)) {
    for (const key in propName) {
      this.prop(key, propName[key]);
    }
  } else {
    dom_adapter_default.setProperty(this[0], propName, value);
  }
  return this;
};
initRender.prototype.addClass = function(className) {
  return this.toggleClass(className, true);
};
initRender.prototype.removeClass = function(className) {
  return this.toggleClass(className, false);
};
initRender.prototype.hasClass = function(className) {
  if (!this[0] || void 0 === this[0].className) {
    return false;
  }
  const classNames = className.split(" ");
  for (let i = 0; i < classNames.length; i++) {
    if (this[0].classList) {
      if (this[0].classList.contains(classNames[i])) {
        return true;
      }
    } else {
      const className2 = isString(this[0].className) ? this[0].className : dom_adapter_default.getAttribute(this[0], "class");
      if ((className2 || "").split(" ").indexOf(classNames[i]) >= 0) {
        return true;
      }
    }
  }
  return false;
};
initRender.prototype.toggleClass = function(className, value) {
  if (this.length > 1) {
    return repeatMethod.call(this, "toggleClass", arguments);
  }
  if (!this[0] || !className) {
    return this;
  }
  value = void 0 === value ? !this.hasClass(className) : value;
  const classNames = className.split(" ");
  for (let i = 0; i < classNames.length; i++) {
    dom_adapter_default.setClass(this[0], classNames[i], value);
  }
  return this;
};
initRender.prototype.html = function(value) {
  if (!arguments.length) {
    return this[0].innerHTML;
  }
  this.empty();
  if ("string" === typeof value && !isTablePart(value) || "number" === typeof value) {
    this[0].innerHTML = value;
    return this;
  }
  return this.append(parseHTML(value));
};
var appendElements = function(element, nextSibling) {
  if (!this[0] || !element) {
    return;
  }
  if ("string" === typeof element) {
    element = parseHTML(element);
  } else if (element.nodeType) {
    element = [element];
  } else if (isNumeric(element)) {
    element = [dom_adapter_default.createTextNode(element)];
  }
  for (let i = 0; i < element.length; i++) {
    const item = element[i];
    let container = this[0];
    const wrapTR = "TABLE" === container.tagName && "TR" === item.tagName;
    if (wrapTR && container.tBodies && container.tBodies.length) {
      container = container.tBodies[0];
    }
    dom_adapter_default.insertElement(container, item.nodeType ? item : item[0], nextSibling);
  }
};
var setCss = function(name, value) {
  if (!this[0] || !this[0].style) {
    return;
  }
  if (null === value || "number" === typeof value && isNaN(value)) {
    return;
  }
  name = styleProp(name);
  for (let i = 0; i < this.length; i++) {
    this[i].style[name] = normalizeStyleProp(name, value);
  }
};
initRender.prototype.css = function(name, value) {
  if (isString(name)) {
    if (2 === arguments.length) {
      setCss.call(this, name, value);
    } else {
      if (!this[0]) {
        return;
      }
      name = styleProp(name);
      const result = window2.getComputedStyle(this[0])[name] || this[0].style[name];
      return isNumeric(result) ? result.toString() : result;
    }
  } else if (isPlainObject(name)) {
    for (const key in name) {
      setCss.call(this, key, name[key]);
    }
  }
  return this;
};
initRender.prototype.prepend = function(element) {
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.prepend(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element, this[0].firstChild]);
  return this;
};
initRender.prototype.append = function(element) {
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.append(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element]);
  return this;
};
initRender.prototype.prependTo = function(element) {
  if (this.length > 1) {
    for (let i = this.length - 1; i >= 0; i--) {
      renderer(this[i]).prependTo(element);
    }
    return this;
  }
  element = renderer(element);
  if (element[0]) {
    dom_adapter_default.insertElement(element[0], this[0], element[0].firstChild);
  }
  return this;
};
initRender.prototype.appendTo = function(element) {
  if (this.length > 1) {
    return repeatMethod.call(this, "appendTo", arguments);
  }
  dom_adapter_default.insertElement(renderer(element)[0], this[0]);
  return this;
};
initRender.prototype.insertBefore = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0]);
  }
  return this;
};
initRender.prototype.insertAfter = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0].nextSibling);
  }
  return this;
};
initRender.prototype.before = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0]);
  }
  return this;
};
initRender.prototype.after = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0].nextSibling);
  }
  return this;
};
initRender.prototype.wrap = function(wrapper) {
  if (this[0]) {
    const wrap = renderer(wrapper);
    wrap.insertBefore(this);
    wrap.append(this);
  }
  return this;
};
initRender.prototype.wrapInner = function(wrapper) {
  const contents = this.contents();
  if (contents.length) {
    contents.wrap(wrapper);
  } else {
    this.append(wrapper);
  }
  return this;
};
initRender.prototype.replaceWith = function(element) {
  if (!(element && element[0])) {
    return;
  }
  if (element.is(this)) {
    return this;
  }
  element.insertBefore(this);
  this.remove();
  return element;
};
initRender.prototype.remove = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "remove", arguments);
  }
  cleanDataRecursive(this[0], true);
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.detach = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "detach", arguments);
  }
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.empty = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "empty", arguments);
  }
  cleanDataRecursive(this[0]);
  dom_adapter_default.setText(this[0], "");
  return this;
};
initRender.prototype.clone = function() {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(this[i].cloneNode(true));
  }
  return renderer(result);
};
initRender.prototype.text = function(value) {
  if (!arguments.length) {
    let result = "";
    for (let i = 0; i < this.length; i++) {
      result += this[i] && this[i].textContent || "";
    }
    return result;
  }
  const text = isFunction(value) ? value() : value;
  cleanDataRecursive(this[0], false);
  dom_adapter_default.setText(this[0], isDefined(text) ? text : "");
  return this;
};
initRender.prototype.val = function(value) {
  if (1 === arguments.length) {
    return this.prop("value", isDefined(value) ? value : "");
  }
  return this.prop("value");
};
initRender.prototype.contents = function() {
  if (!this[0]) {
    return renderer();
  }
  const result = [];
  result.push.apply(result, this[0].childNodes);
  return renderer(result);
};
initRender.prototype.find = function(selector) {
  const result = renderer();
  if (!selector) {
    return result;
  }
  const nodes = [];
  let i;
  if ("string" === typeof selector) {
    selector = selector.trim();
    for (i = 0; i < this.length; i++) {
      const element = this[i];
      if (dom_adapter_default.isElementNode(element)) {
        const elementId = element.getAttribute("id");
        let queryId = elementId || "dx-query-children";
        if (!elementId) {
          setAttributeValue(element, "id", queryId);
        }
        queryId = `[id='${queryId}'] `;
        const querySelector = queryId + selector.replace(/([^\\])(,)/g, `$1, ${queryId}`);
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, querySelector));
        setAttributeValue(element, "id", elementId);
      } else if (dom_adapter_default.isDocument(element) || dom_adapter_default.isDocumentFragment(element)) {
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, selector));
      }
    }
  } else {
    for (i = 0; i < this.length; i++) {
      selector = dom_adapter_default.isNode(selector) ? selector : selector[0];
      if (this[i] !== selector && this[i].contains(selector)) {
        nodes.push(selector);
      }
    }
  }
  return result.add(nodes);
};
var isVisible = function(_, element) {
  var _element$getClientRec, _element;
  element = element.host ?? element;
  if (!element.nodeType) {
    return true;
  }
  return !!(element.offsetWidth || element.offsetHeight || null !== (_element$getClientRec = (_element = element).getClientRects) && void 0 !== _element$getClientRec && _element$getClientRec.call(_element).length);
};
initRender.prototype.filter = function(selector) {
  if (!selector) {
    return renderer();
  }
  if (":visible" === selector) {
    return this.filter(isVisible);
  }
  if (":hidden" === selector) {
    return this.filter((function(_, element) {
      return !isVisible(0, element);
    }));
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    if (dom_adapter_default.isElementNode(item) && "string" === type(selector)) {
      dom_adapter_default.elementMatches(item, selector) && result.push(item);
    } else if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
      selector === item && result.push(item);
    } else if (isFunction(selector)) {
      selector.call(item, i, item) && result.push(item);
    } else {
      for (let j = 0; j < selector.length; j++) {
        selector[j] === item && result.push(item);
      }
    }
  }
  return renderer(result);
};
initRender.prototype.not = function(selector) {
  const result = [];
  const nodes = this.filter(selector).toArray();
  for (let i = 0; i < this.length; i++) {
    if (-1 === nodes.indexOf(this[i])) {
      result.push(this[i]);
    }
  }
  return renderer(result);
};
initRender.prototype.is = function(selector) {
  return !!this.filter(selector).length;
};
initRender.prototype.children = function(selector) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    const nodes = this[i] ? this[i].childNodes : [];
    for (let j = 0; j < nodes.length; j++) {
      if (dom_adapter_default.isElementNode(nodes[j])) {
        result.push(nodes[j]);
      }
    }
  }
  result = renderer(result);
  return selector ? result.filter(selector) : result;
};
initRender.prototype.siblings = function() {
  const element = this[0];
  if (!element || !element.parentNode) {
    return renderer();
  }
  const result = [];
  const parentChildNodes = element.parentNode.childNodes || [];
  for (let i = 0; i < parentChildNodes.length; i++) {
    const node = parentChildNodes[i];
    if (dom_adapter_default.isElementNode(node) && node !== element) {
      result.push(node);
    }
  }
  return renderer(result);
};
initRender.prototype.each = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (false === callback.call(this[i], i, this[i])) {
      break;
    }
  }
};
initRender.prototype.index = function(element) {
  if (!element) {
    return this.parent().children().index(this);
  }
  element = renderer(element);
  return this.toArray().indexOf(element[0]);
};
initRender.prototype.get = function(index) {
  return this[index < 0 ? this.length + index : index];
};
initRender.prototype.eq = function(index) {
  index = index < 0 ? this.length + index : index;
  return renderer(this[index]);
};
initRender.prototype.first = function() {
  return this.eq(0);
};
initRender.prototype.last = function() {
  return this.eq(-1);
};
initRender.prototype.select = function() {
  for (let i = 0; i < this.length; i += 1) {
    this[i].select && this[i].select();
  }
  return this;
};
initRender.prototype.parent = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  const result = renderer(this[0].parentNode);
  return !selector || result.is(selector) ? result : renderer();
};
initRender.prototype.parents = function(selector) {
  const result = [];
  let parent = this.parent();
  while (parent && parent[0] && !dom_adapter_default.isDocument(parent[0])) {
    if (dom_adapter_default.isElementNode(parent[0])) {
      if (!selector || parent.is(selector)) {
        result.push(parent.get(0));
      }
    }
    parent = parent.parent();
  }
  return renderer(result);
};
initRender.prototype.closest = function(selector) {
  if (this.is(selector)) {
    return this;
  }
  let parent = this.parent();
  while (parent && parent.length) {
    if (parent.is(selector)) {
      return parent;
    }
    parent = parent.parent();
  }
  return renderer();
};
initRender.prototype.next = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  let next = renderer(this[0].nextSibling);
  if (!arguments.length) {
    return next;
  }
  while (next && next.length) {
    if (next.is(selector)) {
      return next;
    }
    next = next.next();
  }
  return renderer();
};
initRender.prototype.prev = function() {
  if (!this[0]) {
    return renderer();
  }
  return renderer(this[0].previousSibling);
};
initRender.prototype.add = function(selector) {
  const targets = renderer(selector);
  const result = this.toArray();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (-1 === result.indexOf(target)) {
      result.push(target);
    }
  }
  return renderer(result);
};
var emptyArray = [];
initRender.prototype.splice = function() {
  return renderer(emptyArray.splice.apply(this, arguments));
};
initRender.prototype.slice = function() {
  return renderer(emptyArray.slice.apply(this, arguments));
};
initRender.prototype.toArray = function() {
  return emptyArray.slice.call(this);
};
initRender.prototype.offset = function() {
  if (!this[0]) {
    return;
  }
  return getOffset(this[0]);
};
initRender.prototype.offsetParent = function() {
  if (!this[0]) {
    return renderer();
  }
  let offsetParent = renderer(this[0].offsetParent);
  while (offsetParent[0] && "static" === offsetParent.css("position")) {
    offsetParent = renderer(offsetParent[0].offsetParent);
  }
  offsetParent = offsetParent[0] ? offsetParent : renderer(dom_adapter_default.getDocumentElement());
  return offsetParent;
};
initRender.prototype.position = function() {
  if (!this[0]) {
    return;
  }
  let offset;
  const marginTop = parseFloat(this.css("marginTop"));
  const marginLeft = parseFloat(this.css("marginLeft"));
  if ("fixed" === this.css("position")) {
    offset = this[0].getBoundingClientRect();
    return {
      top: offset.top - marginTop,
      left: offset.left - marginLeft
    };
  }
  offset = this.offset();
  const offsetParent = this.offsetParent();
  let parentOffset = {
    top: 0,
    left: 0
  };
  if ("HTML" !== offsetParent[0].nodeName) {
    parentOffset = offsetParent.offset();
  }
  parentOffset = {
    top: parentOffset.top + parseFloat(offsetParent.css("borderTopWidth")),
    left: parentOffset.left + parseFloat(offsetParent.css("borderLeftWidth"))
  };
  return {
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft
  };
};
[{
  name: "scrollLeft",
  offsetProp: "pageXOffset",
  scrollWindow: function(win, value) {
    win.scrollTo(value, win.pageYOffset);
  }
}, {
  name: "scrollTop",
  offsetProp: "pageYOffset",
  scrollWindow: function(win, value) {
    win.scrollTo(win.pageXOffset, value);
  }
}].forEach((function(directionStrategy) {
  const propName = directionStrategy.name;
  initRender.prototype[propName] = function(value) {
    if (!this[0]) {
      return;
    }
    const window3 = getWindowByElement(this[0]);
    if (void 0 === value) {
      return window3 ? window3[directionStrategy.offsetProp] : this[0][propName];
    }
    if (window3) {
      directionStrategy.scrollWindow(window3, value);
    } else {
      this[0][propName] = value;
    }
    return this;
  };
}));
initRender.prototype.data = function(key, value) {
  if (!this[0]) {
    return;
  }
  if (arguments.length < 2) {
    return data.call(renderer, this[0], key);
  }
  data.call(renderer, this[0], key, value);
  return this;
};
initRender.prototype.removeData = function(key) {
  this[0] && removeData(this[0], key);
  return this;
};
var rendererWrapper = function() {
  return renderer.apply(this, arguments);
};
Object.defineProperty(rendererWrapper, "fn", {
  enumerable: true,
  configurable: true,
  get: function() {
    return renderer.fn;
  },
  set: function(value) {
    renderer.fn = value;
  }
});
var m_renderer_base_default = {
  set: function(strategy2) {
    renderer = strategy2;
  },
  get: function() {
    return rendererWrapper;
  }
};

// node_modules/devextreme/esm/__internal/core/m_renderer.js
var renderer2 = m_renderer_base_default.get();

// node_modules/devextreme/esm/core/renderer.js
var renderer_default = renderer2;

// node_modules/devextreme/esm/__internal/core/utils/m_ready_callbacks.js
var callbacks = [];
var subscribeReady = call_once_default((() => {
  const removeListener = dom_adapter_default.listen(dom_adapter_default.getDocument(), "DOMContentLoaded", (() => {
    readyCallbacks.fire();
    removeListener();
  }));
}));
var readyCallbacks = {
  add: (callback) => {
    const windowExists = hasWindow();
    if (windowExists && "loading" !== dom_adapter_default.getReadyState()) {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach(((callback) => callback()));
    callbacks = [];
  }
};
var readyCallbacksModule = dependency_injector_default(readyCallbacks);
var m_ready_callbacks_default = readyCallbacksModule;

// node_modules/devextreme/esm/core/utils/ready_callbacks.js
var ready_callbacks_default = readyCallbacksModule;

export {
  data,
  beforeCleanData,
  removeData,
  cleanDataRecursive,
  parseHTML,
  getElementBoxParams,
  parseHeight,
  addOffsetToMaxHeight,
  addOffsetToMinHeight,
  getVerticalOffsets,
  getVisibleHeight,
  getWidth,
  setWidth,
  getHeight,
  setHeight,
  getOuterWidth,
  setOuterWidth,
  getOuterHeight,
  setOuterHeight,
  getInnerWidth,
  getInnerHeight,
  getOffset,
  dasherize,
  camelize,
  humanize,
  titleize,
  captionize,
  m_inflector_default,
  styleProp,
  stylePropPrefix,
  normalizeStyleProp,
  setWidth2,
  setHeight2,
  setStyle,
  renderer_default,
  m_ready_callbacks_default,
  ready_callbacks_default
};
//# sourceMappingURL=chunk-3GE2VGI4.js.map
