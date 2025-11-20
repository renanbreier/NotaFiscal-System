import {
  EventsStrategy,
  devices_default,
  m_devices_default,
  m_support_default,
  resize_callbacks_default,
  touch
} from "./chunk-A3D3LIWG.js";
import {
  beforeCleanData,
  cleanDataRecursive,
  data,
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  ready_callbacks_default,
  removeData,
  renderer_default,
  setStyle
} from "./chunk-3GE2VGI4.js";
import {
  call_once_default,
  event_registrator_callbacks_default,
  getEventTarget,
  m_events_engine_default,
  memorized_callbacks_default
} from "./chunk-4JX72F7N.js";
import {
  Deferred,
  _extends,
  addShadowDomStyles,
  callbacks_default,
  class_default,
  compileGetter,
  compileSetter,
  config_default2 as config_default,
  dom_adapter_default,
  each,
  ensureDefined,
  equalByValue,
  errors_default,
  extend,
  findBestMatches,
  fullVersion,
  getCurrentTemplateEngine,
  getNavigator,
  getPathParts,
  getWindow,
  hasWindow,
  isDefined,
  isEmptyObject,
  isFunction,
  isObject,
  isPlainObject,
  isRenderer,
  isString,
  isWindow,
  m_common_default,
  m_type_default,
  map,
  noop,
  orderEach,
  pairToObject,
  registerTemplateEngine,
  setTemplateEngine,
  splitPair,
  toComparable,
  type,
  uiLayerInitialized,
  when
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/common/core/animation/frame.js
var window = hasWindow() ? getWindow() : {};
var FRAME_ANIMATION_STEP_TIME = 1e3 / 60;
var request = function(callback) {
  return setTimeout(callback, 16.666666666666668);
};
var cancel = function(requestID) {
  clearTimeout(requestID);
};
var setAnimationFrameMethods = call_once_default((function() {
  const nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  const nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
}));
function requestAnimationFrame() {
  setAnimationFrameMethods();
  return request.apply(window, arguments);
}
function cancelAnimationFrame() {
  setAnimationFrameMethods();
  cancel.apply(window, arguments);
}

// node_modules/devextreme/esm/__internal/core/m_element.js
function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
var strategy = getPublicElementNonJquery;
function getPublicElement(element) {
  return strategy(element);
}

// node_modules/devextreme/esm/common/core/animation/translator.js
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
  $element = renderer_default($element);
  const translate = getTranslate($element);
  return {
    left: translate.x,
    top: translate.y
  };
};
function isPercentValue(value) {
  return "string" === type(value) && "%" === value[value.length - 1];
}
function cacheTranslate($element, translate) {
  if ($element.length) {
    data($element.get(0), "dxTranslator", translate);
  }
}
var clearCache = function($element) {
  if ($element.length) {
    removeData($element.get(0), "dxTranslator");
  }
};
var getTranslateCss = function(translate) {
  translate.x = translate.x || 0;
  translate.y = translate.y || 0;
  const xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
  const yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
  return "translate(" + xValueString + ", " + yValueString + ")";
};
var getTranslate = function($element) {
  let result = $element.length ? data($element.get(0), "dxTranslator") : null;
  if (!result) {
    const transformValue = $element.css("transform") || getTranslateCss({
      x: 0,
      y: 0
    });
    let matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
    const is3D = matrix && matrix[1];
    if (matrix) {
      matrix = matrix[2].split(",");
      if ("3d" === is3D) {
        matrix = matrix.slice(12, 15);
      } else {
        matrix.push(0);
        matrix = matrix.slice(4, 7);
      }
    } else {
      matrix = [0, 0, 0];
    }
    result = {
      x: parseFloat(matrix[0]),
      y: parseFloat(matrix[1]),
      z: parseFloat(matrix[2])
    };
    cacheTranslate($element, result);
  }
  return result;
};
var move = function($element, position2) {
  $element = renderer_default($element);
  const left = position2.left;
  const top = position2.top;
  let translate;
  if (void 0 === left) {
    translate = getTranslate($element);
    translate.y = top || 0;
  } else if (void 0 === top) {
    translate = getTranslate($element);
    translate.x = left || 0;
  } else {
    translate = {
      x: left || 0,
      y: top || 0,
      z: 0
    };
    cacheTranslate($element, translate);
  }
  $element.css({
    transform: getTranslateCss(translate)
  });
  if (isPercentValue(left) || isPercentValue(top)) {
    clearCache($element);
  }
};
var resetPosition = function($element, finishTransition) {
  $element = renderer_default($element);
  let originalTransition;
  const stylesConfig = {
    left: 0,
    top: 0,
    transform: "none"
  };
  if (finishTransition) {
    originalTransition = $element.css("transition");
    stylesConfig.transition = "none";
  }
  $element.css(stylesConfig);
  clearCache($element);
  if (finishTransition) {
    $element.get(0).offsetHeight;
    $element.css("transition", originalTransition);
  }
};
var parseTranslate = function(translateString) {
  let result = translateString.match(TRANSLATE_REGEX);
  if (!result || !result[1]) {
    return;
  }
  result = result[1].split(",");
  result = {
    x: parseFloat(result[0]),
    y: parseFloat(result[1]),
    z: parseFloat(result[2])
  };
  return result;
};

// node_modules/devextreme/esm/common/core/animation/easing.js
var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var TransitionTimingFuncMap = {
  linear: "cubic-bezier(0, 0, 1, 1)",
  swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
  "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
var polynomBezier = function(x1, y1, x2, y2) {
  const Cx = 3 * x1;
  const Bx = 3 * (x2 - x1) - Cx;
  const Ax = 1 - Cx - Bx;
  const Cy = 3 * y1;
  const By = 3 * (y2 - y1) - Cy;
  const Ay = 1 - Cy - By;
  const bezierX = function(t) {
    return t * (Cx + t * (Bx + t * Ax));
  };
  const derivativeX = function(t) {
    return Cx + t * (2 * Bx + 3 * t * Ax);
  };
  return function(t) {
    return (function(t2) {
      return t2 * (Cy + t2 * (By + t2 * Ay));
    })((function(t2) {
      let x = t2;
      let i = 0;
      let z;
      while (i < 14) {
        z = bezierX(x) - t2;
        if (Math.abs(z) < 1e-3) {
          break;
        }
        x -= z / derivativeX(x);
        i++;
      }
      return x;
    })(t));
  };
};
var easing = {};
var convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
  cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
  let coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
  let forceName;
  if (!coeffs) {
    forceName = "linear";
    coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX);
  }
  coeffs = coeffs.slice(1, 5);
  for (let i = 0; i < coeffs.length; i++) {
    coeffs[i] = parseFloat(coeffs[i]);
  }
  const easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
  if (!isFunction(easing[easingName])) {
    easing[easingName] = function(x, t, b, c, d) {
      return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b;
    };
  }
  return easingName;
};
function getEasing(name) {
  return easing[name];
}

// node_modules/devextreme/esm/__internal/core/utils/m_position.js
var getDefaultAlignment = (isRtlEnabled) => {
  const rtlEnabled = isRtlEnabled ?? config_default().rtlEnabled;
  return rtlEnabled ? "right" : "left";
};
var getBoundingRect = (element) => {
  var _element$getBoundingC;
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
};

// node_modules/devextreme/esm/__internal/core/utils/m_browser.js
var navigator = getNavigator();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;
var browserFromUA = (ua) => {
  ua = ua.toLowerCase();
  const result = {};
  const matches = webkitRegExp.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || [];
  let browserName = matches[1];
  let browserVersion = matches[2];
  if ("webkit" === browserName) {
    result.webkit = true;
    if (ua.indexOf("chrome") >= 0 || ua.indexOf("crios") >= 0) {
      browserName = "chrome";
      browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("fxios") >= 0) {
      browserName = "mozilla";
      browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("safari") >= 0 && /version|phantomjs/.test(ua)) {
      browserName = "safari";
      browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else {
      browserName = "unknown";
      browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    }
  }
  if (browserName) {
    result[browserName] = true;
    result.version = browserVersion;
  }
  return result;
};
var browser = extend({
  _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent));

// node_modules/devextreme/esm/core/utils/browser.js
var browser_default = browser;

// node_modules/devextreme/esm/common/core/animation/position.js
var window2 = getWindow();
var horzRe = /left|right/;
var vertRe = /top|bottom/;
var collisionRe = /fit|flip|none/;
var scaleRe = /scale\(.+?\)/;
var IS_SAFARI = browser_default.safari;
var normalizeAlign = function(raw) {
  const result = {
    h: "center",
    v: "center"
  };
  const pair = splitPair(raw);
  if (pair) {
    each(pair, (function() {
      const w = String(this).toLowerCase();
      if (horzRe.test(w)) {
        result.h = w;
      } else if (vertRe.test(w)) {
        result.v = w;
      }
    }));
  }
  return result;
};
var normalizeOffset = function(raw, preventRound) {
  return pairToObject(raw, preventRound);
};
var normalizeCollision = function(raw) {
  const pair = splitPair(raw);
  let h = String(pair && pair[0]).toLowerCase();
  let v = String(pair && pair[1]).toLowerCase();
  if (!collisionRe.test(h)) {
    h = "none";
  }
  if (!collisionRe.test(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getAlignFactor = function(align) {
  switch (align) {
    case "center":
      return 0.5;
    case "right":
    case "bottom":
      return 1;
    default:
      return 0;
  }
};
var inverseAlign = function(align) {
  switch (align) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    default:
      return align;
  }
};
var calculateOversize = function(data2, bounds) {
  let oversize = 0;
  if (data2.myLocation < bounds.min) {
    oversize += bounds.min - data2.myLocation;
  }
  if (data2.myLocation > bounds.max) {
    oversize += data2.myLocation - bounds.max;
  }
  return oversize;
};
var collisionSide = function(direction, data2, bounds) {
  if (data2.myLocation < bounds.min) {
    return "h" === direction ? "left" : "top";
  }
  if (data2.myLocation > bounds.max) {
    return "h" === direction ? "right" : "bottom";
  }
  return "none";
};
var initMyLocation = function(data2) {
  data2.myLocation = data2.atLocation + getAlignFactor(data2.atAlign) * data2.atSize - getAlignFactor(data2.myAlign) * data2.mySize + data2.offset;
};
var collisionResolvers = {
  fit: function(data2, bounds) {
    let result = false;
    if (data2.myLocation > bounds.max) {
      data2.myLocation = bounds.max;
      result = true;
    }
    if (data2.myLocation < bounds.min) {
      data2.myLocation = bounds.min;
      result = true;
    }
    data2.fit = result;
  },
  flip: function(data2, bounds) {
    data2.flip = false;
    if ("center" === data2.myAlign && "center" === data2.atAlign) {
      return;
    }
    if (data2.myLocation < bounds.min || data2.myLocation > bounds.max) {
      const inverseData = extend({}, data2, {
        myAlign: inverseAlign(data2.myAlign),
        atAlign: inverseAlign(data2.atAlign),
        offset: -data2.offset
      });
      initMyLocation(inverseData);
      inverseData.oversize = calculateOversize(inverseData, bounds);
      if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data2.oversize > inverseData.oversize) {
        data2.myLocation = inverseData.myLocation;
        data2.oversize = inverseData.oversize;
        data2.flip = true;
      }
    }
  },
  flipfit: function(data2, bounds) {
    this.flip(data2, bounds);
    this.fit(data2, bounds);
  },
  none: function(data2) {
    data2.oversize = 0;
  }
};
var scrollbarWidth;
var calculateScrollbarWidth = function() {
  const $scrollDiv = renderer_default("<div>").css({
    width: 100,
    height: 100,
    overflow: "scroll",
    position: "absolute",
    top: -9999
  }).appendTo(renderer_default("body"));
  const result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
  $scrollDiv.remove();
  scrollbarWidth = result;
};
var defaultPositionResult = {
  h: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  },
  v: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  }
};
var calculatePosition = function(what, options) {
  const $what = renderer_default(what);
  const currentOffset = $what.offset();
  const result = extend(true, {}, defaultPositionResult, {
    h: {
      location: currentOffset.left
    },
    v: {
      location: currentOffset.top
    }
  });
  if (!options) {
    return result;
  }
  const my = normalizeAlign(options.my);
  const at = normalizeAlign(options.at);
  let of = renderer_default(options.of).length && options.of || window2;
  const offset2 = normalizeOffset(options.offset, options.precise);
  const collision = normalizeCollision(options.collision);
  const boundary = options.boundary;
  const boundaryOffset = normalizeOffset(options.boundaryOffset, options.precise);
  const h = {
    mySize: getOuterWidth($what),
    myAlign: my.h,
    atAlign: at.h,
    offset: offset2.h,
    collision: collision.h,
    boundaryOffset: boundaryOffset.h
  };
  const v = {
    mySize: getOuterHeight($what),
    myAlign: my.v,
    atAlign: at.v,
    offset: offset2.v,
    collision: collision.v,
    boundaryOffset: boundaryOffset.v
  };
  if (of.preventDefault) {
    h.atLocation = of.pageX;
    v.atLocation = of.pageY;
    h.atSize = 0;
    v.atSize = 0;
  } else {
    of = renderer_default(of);
    if (isWindow(of[0])) {
      h.atLocation = of.scrollLeft();
      v.atLocation = of.scrollTop();
      if ("phone" === devices_default.real().deviceType && of[0].visualViewport) {
        h.atLocation = Math.max(h.atLocation, of[0].visualViewport.offsetLeft);
        v.atLocation = Math.max(v.atLocation, of[0].visualViewport.offsetTop);
        h.atSize = of[0].visualViewport.width;
        v.atSize = of[0].visualViewport.height;
      } else {
        h.atSize = of[0].innerWidth > of[0].outerWidth ? of[0].innerWidth : getWidth(of);
        v.atSize = of[0].innerHeight > of[0].outerHeight || IS_SAFARI ? of[0].innerHeight : getHeight(of);
      }
    } else if (9 === of[0].nodeType) {
      h.atLocation = 0;
      v.atLocation = 0;
      h.atSize = getWidth(of);
      v.atSize = getHeight(of);
    } else {
      const ofRect = getBoundingRect(of.get(0));
      const o = getOffsetWithoutScale(of);
      h.atLocation = o.left;
      v.atLocation = o.top;
      h.atSize = Math.max(ofRect.width, getOuterWidth(of));
      v.atSize = Math.max(ofRect.height, getOuterHeight(of));
    }
  }
  initMyLocation(h);
  initMyLocation(v);
  const bounds = (function() {
    const win = renderer_default(window2);
    const windowWidth = getWidth(win);
    const windowHeight = getHeight(win);
    let left = win.scrollLeft();
    let top = win.scrollTop();
    const documentElement = dom_adapter_default.getDocumentElement();
    const hZoomLevel = touch ? documentElement.clientWidth / windowWidth : 1;
    const vZoomLevel = touch ? documentElement.clientHeight / windowHeight : 1;
    if (void 0 === scrollbarWidth) {
      calculateScrollbarWidth();
    }
    let boundaryWidth = windowWidth;
    let boundaryHeight = windowHeight;
    if (boundary && !isWindow(boundary)) {
      const $boundary = renderer_default(boundary);
      const boundaryPosition = $boundary.offset();
      left = boundaryPosition.left;
      top = boundaryPosition.top;
      boundaryWidth = getWidth($boundary);
      boundaryHeight = getHeight($boundary);
    }
    return {
      h: {
        min: left + h.boundaryOffset,
        max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
      },
      v: {
        min: top + v.boundaryOffset,
        max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
      }
    };
  })();
  h.oversize = calculateOversize(h, bounds.h);
  v.oversize = calculateOversize(v, bounds.v);
  h.collisionSide = collisionSide("h", h, bounds.h);
  v.collisionSide = collisionSide("v", v, bounds.v);
  if (collisionResolvers[h.collision]) {
    collisionResolvers[h.collision](h, bounds.h);
  }
  if (collisionResolvers[v.collision]) {
    collisionResolvers[v.collision](v, bounds.v);
  }
  const preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  extend(true, result, {
    h: {
      location: preciser(h.myLocation),
      oversize: preciser(h.oversize),
      fit: h.fit,
      flip: h.flip,
      collisionSide: h.collisionSide
    },
    v: {
      location: preciser(v.myLocation),
      oversize: preciser(v.oversize),
      fit: v.fit,
      flip: v.flip,
      collisionSide: v.collisionSide
    },
    precise: options.precise
  });
  return result;
};
var setScaleProperty = function(element, scale, styleAttr, isEmpty) {
  const stylePropIsValid = isDefined(element.style) && !dom_adapter_default.isNode(element.style);
  const newStyleValue = isEmpty ? styleAttr.replace(scale, "") : styleAttr;
  if (stylePropIsValid) {
    setStyle(element, newStyleValue, false);
  } else {
    const styleAttributeNode = dom_adapter_default.createAttribute("style");
    styleAttributeNode.value = newStyleValue;
    element.setAttributeNode(styleAttributeNode);
  }
};
var getOffsetWithoutScale = function($startElement) {
  var _currentElement$getAt, _style$match;
  let $currentElement = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $startElement;
  const currentElement = $currentElement.get(0);
  if (!currentElement) {
    return $startElement.offset();
  }
  const style = (null === (_currentElement$getAt = currentElement.getAttribute) || void 0 === _currentElement$getAt ? void 0 : _currentElement$getAt.call(currentElement, "style")) || "";
  const scale = null === (_style$match = style.match(scaleRe)) || void 0 === _style$match ? void 0 : _style$match[0];
  let offset2;
  if (scale) {
    setScaleProperty(currentElement, scale, style, true);
    offset2 = getOffsetWithoutScale($startElement, $currentElement.parent());
    setScaleProperty(currentElement, scale, style, false);
  } else {
    offset2 = getOffsetWithoutScale($startElement, $currentElement.parent());
  }
  return offset2;
};
var position = function(what, options) {
  const $what = renderer_default(what);
  if (!options) {
    return $what.offset();
  }
  resetPosition($what, true);
  const offset2 = getOffsetWithoutScale($what);
  const targetPosition = options.h && options.v ? options : calculatePosition($what, options);
  const preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  move($what, {
    left: targetPosition.h.location - preciser(offset2.left),
    top: targetPosition.v.location - preciser(offset2.top)
  });
  return targetPosition;
};
var offset = function(element) {
  element = renderer_default(element).get(0);
  if (isWindow(element)) {
    return null;
  } else if (element && "pageY" in element && "pageX" in element) {
    return {
      top: element.pageY,
      left: element.pageX
    };
  }
  return renderer_default(element).offset();
};
if (!position.inverseAlign) {
  position.inverseAlign = inverseAlign;
}
if (!position.normalizeAlign) {
  position.normalizeAlign = normalizeAlign;
}
var position_default = {
  calculateScrollbarWidth,
  calculate: calculatePosition,
  setup: position,
  offset
};

// node_modules/devextreme/esm/__internal/events/core/m_event_registrator.js
var registerEvent = function(name, eventObject) {
  const strategy2 = {};
  if ("noBubble" in eventObject) {
    strategy2.noBubble = eventObject.noBubble;
  }
  if ("bindType" in eventObject) {
    strategy2.bindType = eventObject.bindType;
  }
  if ("delegateType" in eventObject) {
    strategy2.delegateType = eventObject.delegateType;
  }
  each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], ((_, methodName) => {
    if (!eventObject[methodName]) {
      return;
    }
    strategy2[methodName] = function() {
      const args = [].slice.call(arguments);
      args.unshift(this);
      return eventObject[methodName].apply(eventObject, args);
    };
  }));
  event_registrator_callbacks_default.fire(name, strategy2);
};
registerEvent.callbacks = event_registrator_callbacks_default;
var m_event_registrator_default = registerEvent;

// node_modules/devextreme/esm/__internal/events/m_remove.js
var removeEvent = "dxremove";
var eventPropName = "dxRemoveEvent";
beforeCleanData(((elements) => {
  elements = [].slice.call(elements);
  for (let i = 0; i < elements.length; i++) {
    const $element = renderer_default(elements[i]);
    if ($element.prop(eventPropName)) {
      $element[0][eventPropName] = null;
      m_events_engine_default.triggerHandler($element, "dxremove");
    }
  }
}));
m_event_registrator_default("dxremove", {
  noBubble: true,
  setup(element) {
    renderer_default(element).prop(eventPropName, true);
  }
});

// node_modules/devextreme/esm/__internal/core/utils/m_selectors.js
var focusableFn = (element, tabIndex) => {
  if (!visible(element)) {
    return false;
  }
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !isNaN(tabIndex);
  const isDisabled = element.disabled;
  const isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
  const isHyperlink = "a" === nodeName;
  let isFocusable;
  const {
    isContentEditable
  } = element;
  if (isDefaultFocus || isContentEditable) {
    isFocusable = !isDisabled;
  } else if (isHyperlink) {
    isFocusable = element.href || isTabIndexNotNaN;
  } else {
    isFocusable = isTabIndexNotNaN;
  }
  return isFocusable;
};
function visible(element) {
  const $element = renderer_default(element);
  return $element.is(":visible") && "hidden" !== $element.css("visibility") && "hidden" !== $element.parents().css("visibility");
}
var focusable = (index2, element) => focusableFn(element, renderer_default(element).attr("tabIndex"));
var tabbable = (index2, element) => {
  const tabIndex = renderer_default(element).attr("tabIndex");
  return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex);
};
var focused = ($element) => {
  const element = renderer_default($element).get(0);
  return dom_adapter_default.getActiveElement(element) === element;
};
var m_selectors_default = {
  focusable,
  tabbable,
  focused
};

// node_modules/devextreme/esm/__internal/events/utils/m_add_namespace.js
var addNamespace = (eventNames, namespace) => {
  if (!namespace) {
    throw errors_default.Error("E0017");
  }
  if (Array.isArray(eventNames)) {
    return eventNames.map(((eventName) => addNamespace(eventName, namespace))).join(" ");
  }
  if (-1 !== eventNames.indexOf(" ")) {
    return addNamespace(eventNames.split(/\s+/g), namespace);
  }
  return `${eventNames}.${namespace}`;
};
var m_add_namespace_default = addNamespace;

// node_modules/devextreme/esm/__internal/events/utils/index.js
var KEY_MAP = {
  backspace: "backspace",
  tab: "tab",
  enter: "enter",
  escape: "escape",
  pageup: "pageUp",
  pagedown: "pageDown",
  end: "end",
  home: "home",
  arrowleft: "leftArrow",
  arrowup: "upArrow",
  arrowright: "rightArrow",
  arrowdown: "downArrow",
  delete: "del",
  " ": "space",
  f: "F",
  a: "A",
  "*": "asterisk",
  "-": "minus",
  alt: "alt",
  control: "control",
  shift: "shift"
};
var LEGACY_KEY_CODES = {
  8: "backspace",
  9: "tab",
  13: "enter",
  27: "escape",
  33: "pageUp",
  34: "pageDown",
  35: "end",
  36: "home",
  37: "leftArrow",
  38: "upArrow",
  39: "rightArrow",
  40: "downArrow",
  46: "del",
  32: "space",
  70: "F",
  65: "A",
  106: "asterisk",
  109: "minus",
  189: "minus",
  173: "minus",
  16: "shift",
  17: "control",
  18: "alt"
};
var EVENT_SOURCES_REGEX = {
  dx: /^dx/i,
  mouse: /(mouse|wheel)/i,
  touch: /^touch/i,
  keyboard: /^key/i,
  pointer: /^(ms)?pointer/i
};
var eventSource = (_ref) => {
  let {
    type: type2
  } = _ref;
  let result = "other";
  each(EVENT_SOURCES_REGEX, (function(key) {
    if (this.test(type2)) {
      result = key;
      return false;
    }
  }));
  return result;
};
var fixMethod = (e) => e;
var getEvent = (originalEvent) => m_events_engine_default.Event(originalEvent, originalEvent);
var copyEvent = (originalEvent) => fixMethod(getEvent(originalEvent), originalEvent);
var isDxEvent = (e) => "dx" === eventSource(e);
var isNativeMouseEvent = (e) => "mouse" === eventSource(e);
var isNativeTouchEvent = (e) => "touch" === eventSource(e);
var isPointerEvent = (e) => "pointer" === eventSource(e);
var isMouseEvent = (e) => isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType;
var isDxMouseWheelEvent = (e) => e && "dxmousewheel" === e.type;
var isTouchEvent = (e) => isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType;
var isFakeClickEvent = (_ref2) => {
  let {
    screenX,
    offsetX,
    pageX
  } = _ref2;
  return 0 === screenX && !offsetX && 0 === pageX;
};
var eventData = (_ref3) => {
  let {
    pageX,
    pageY,
    timeStamp
  } = _ref3;
  return {
    x: pageX,
    y: pageY,
    time: timeStamp
  };
};
var eventDelta = (from, to) => ({
  x: to.x - from.x,
  y: to.y - from.y,
  time: to.time - from.time || 1
});
var hasTouches = (e) => {
  const {
    originalEvent,
    pointers
  } = e;
  if (isNativeTouchEvent(e)) {
    return (originalEvent.touches || []).length;
  }
  if (isDxEvent(e)) {
    return (pointers || []).length;
  }
  return 0;
};
var skipEvents = false;
var needSkipEvent = (e) => {
  if (skipEvents) {
    return true;
  }
  const {
    target
  } = e;
  const $target = renderer_default(target);
  const isContentEditable = (null === target || void 0 === target ? void 0 : target.isContentEditable) || (null === target || void 0 === target ? void 0 : target.hasAttribute("contenteditable"));
  const touchInEditable = $target.is("input, textarea, select") || isContentEditable;
  if (isDxMouseWheelEvent(e)) {
    const isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
    if (isTextArea || isContentEditable) {
      return false;
    }
    const isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
    return isInputFocused;
  }
  if (isMouseEvent(e)) {
    return touchInEditable || e.which > 1;
  }
  if (isTouchEvent(e)) {
    return touchInEditable && focused($target);
  }
};
var createEvent = (originalEvent, args) => {
  const event = copyEvent(originalEvent);
  if (args) {
    extend(event, args);
  }
  return event;
};
var fireEvent = (props) => {
  const {
    originalEvent,
    delegateTarget
  } = props;
  const event = createEvent(originalEvent, props);
  m_events_engine_default.trigger(delegateTarget || event.target, event);
  return event;
};
var normalizeKeyName = (_ref4) => {
  let {
    key,
    which
  } = _ref4;
  const normalizedKey = KEY_MAP[null === key || void 0 === key ? void 0 : key.toLowerCase()] || key;
  const normalizedKeyFromWhich = LEGACY_KEY_CODES[which];
  if (normalizedKeyFromWhich && normalizedKey === key) {
    return normalizedKeyFromWhich;
  }
  if (!normalizedKey && which) {
    return String.fromCharCode(which);
  }
  return normalizedKey;
};
var getChar = (_ref5) => {
  let {
    key,
    which
  } = _ref5;
  return key || String.fromCharCode(which);
};
var addNamespace2 = m_add_namespace_default;
var isCommandKeyPressed = (_ref6) => {
  let {
    ctrlKey,
    metaKey
  } = _ref6;
  return ctrlKey || metaKey;
};

// node_modules/devextreme/esm/common/core/animation/fx.js
var window3 = getWindow();
var removeEventName = addNamespace2(removeEvent, "dxFX");
var RELATIVE_VALUE_REGEX = /^([+-])=(.*)/i;
var TransitionAnimationStrategy = {
  initAnimation: function($element, config) {
    $element.css({
      transitionProperty: "none"
    });
    if ("string" === typeof config.from) {
      $element.addClass(config.from);
    } else {
      setProps($element, config.from);
    }
    const that = this;
    const deferred = new Deferred();
    const cleanupWhen = config.cleanupWhen;
    config.transitionAnimation = {
      deferred,
      finish: function() {
        that._finishTransition($element);
        if (cleanupWhen) {
          when(deferred, cleanupWhen).always((function() {
            that._cleanup($element, config);
          }));
        } else {
          that._cleanup($element, config);
        }
        deferred.resolveWith($element, [config, $element]);
      }
    };
    this._completeAnimationCallback($element, config).done((function() {
      config.transitionAnimation.finish();
    })).fail((function() {
      deferred.rejectWith($element, [config, $element]);
    }));
    if (!config.duration) {
      config.transitionAnimation.finish();
    }
    $element.css("transform");
  },
  animate: function($element, config) {
    this._startAnimation($element, config);
    return config.transitionAnimation.deferred.promise();
  },
  _completeAnimationCallback: function($element, config) {
    const that = this;
    const startTime = Date.now() + config.delay;
    const deferred = new Deferred();
    const transitionEndFired = new Deferred();
    const simulatedTransitionEndFired = new Deferred();
    let simulatedEndEventTimer;
    const transitionEndEventFullName = m_support_default.transitionEndEventName() + ".dxFX";
    config.transitionAnimation.cleanup = function() {
      clearTimeout(simulatedEndEventTimer);
      clearTimeout(waitForJSCompleteTimer);
      m_events_engine_default.off($element, transitionEndEventFullName);
      m_events_engine_default.off($element, removeEventName);
    };
    m_events_engine_default.one($element, transitionEndEventFullName, (function() {
      if (Date.now() - startTime >= config.duration) {
        transitionEndFired.reject();
      }
    }));
    m_events_engine_default.off($element, removeEventName);
    m_events_engine_default.on($element, removeEventName, (function() {
      that.stop($element, config);
      deferred.reject();
    }));
    const waitForJSCompleteTimer = setTimeout((function() {
      simulatedEndEventTimer = setTimeout((function() {
        simulatedTransitionEndFired.reject();
      }), config.duration + config.delay + fx._simulatedTransitionEndDelay);
      when(transitionEndFired, simulatedTransitionEndFired).fail((function() {
        deferred.resolve();
      }).bind(this));
    }));
    return deferred.promise();
  },
  _startAnimation: function($element, config) {
    $element.css({
      transitionProperty: "all",
      transitionDelay: config.delay + "ms",
      transitionDuration: config.duration + "ms",
      transitionTimingFunction: config.easing
    });
    if ("string" === typeof config.to) {
      $element[0].className += " " + config.to;
    } else if (config.to) {
      setProps($element, config.to);
    }
  },
  _finishTransition: function($element) {
    $element.css("transition", "none");
  },
  _cleanup: function($element, config) {
    config.transitionAnimation.cleanup();
    if ("string" === typeof config.from) {
      $element.removeClass(config.from);
      $element.removeClass(config.to);
    }
  },
  stop: function($element, config, jumpToEnd) {
    if (!config) {
      return;
    }
    if (jumpToEnd) {
      config.transitionAnimation.finish();
    } else {
      if (isPlainObject(config.to)) {
        each(config.to, (function(key) {
          $element.css(key, $element.css(key));
        }));
      }
      this._finishTransition($element);
      this._cleanup($element, config);
    }
  }
};
var FrameAnimationStrategy = {
  initAnimation: function($element, config) {
    setProps($element, config.from);
  },
  animate: function($element, config) {
    const deferred = new Deferred();
    const that = this;
    if (!config) {
      return deferred.reject().promise();
    }
    each(config.to, (function(prop) {
      if (void 0 === config.from[prop]) {
        config.from[prop] = that._normalizeValue($element.css(prop));
      }
    }));
    if (config.to.transform) {
      config.from.transform = that._parseTransform(config.from.transform);
      config.to.transform = that._parseTransform(config.to.transform);
    }
    config.frameAnimation = {
      to: config.to,
      from: config.from,
      currentValue: config.from,
      easing: convertTransitionTimingFuncToEasing(config.easing),
      duration: config.duration,
      startTime: (/* @__PURE__ */ new Date()).valueOf(),
      finish: function() {
        this.currentValue = this.to;
        this.draw();
        cancelAnimationFrame(config.frameAnimation.animationFrameId);
        deferred.resolve();
      },
      draw: function() {
        if (config.draw) {
          config.draw(this.currentValue);
          return;
        }
        const currentValue = extend({}, this.currentValue);
        if (currentValue.transform) {
          currentValue.transform = map(currentValue.transform, (function(value, prop) {
            if ("translate" === prop) {
              return getTranslateCss(value);
            } else if ("scale" === prop) {
              return "scale(" + value + ")";
            } else if ("rotate" === prop.substr(0, prop.length - 1)) {
              return prop + "(" + value + "deg)";
            }
          })).join(" ");
        }
        $element.css(currentValue);
      }
    };
    if (config.delay) {
      config.frameAnimation.startTime += config.delay;
      config.frameAnimation.delayTimeout = setTimeout((function() {
        that._startAnimation($element, config);
      }), config.delay);
    } else {
      that._startAnimation($element, config);
    }
    return deferred.promise();
  },
  _startAnimation: function($element, config) {
    m_events_engine_default.off($element, removeEventName);
    m_events_engine_default.on($element, removeEventName, (function() {
      if (config.frameAnimation) {
        cancelAnimationFrame(config.frameAnimation.animationFrameId);
      }
    }));
    this._animationStep($element, config);
  },
  _parseTransform: function(transformString) {
    const result = {};
    each(transformString.match(/\w+\d*\w*\([^)]*\)\s*/g), (function(i, part) {
      const translateData = parseTranslate(part);
      const scaleData = part.match(/scale\((.+?)\)/);
      const rotateData = part.match(/(rotate.)\((.+)deg\)/);
      if (translateData) {
        result.translate = translateData;
      }
      if (scaleData && scaleData[1]) {
        result.scale = parseFloat(scaleData[1]);
      }
      if (rotateData && rotateData[1]) {
        result[rotateData[1]] = parseFloat(rotateData[2]);
      }
    }));
    return result;
  },
  stop: function($element, config, jumpToEnd) {
    const frameAnimation = config && config.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    cancelAnimationFrame(frameAnimation.animationFrameId);
    clearTimeout(frameAnimation.delayTimeout);
    if (jumpToEnd) {
      frameAnimation.finish();
    }
    delete config.frameAnimation;
  },
  _animationStep: function($element, config) {
    const frameAnimation = config && config.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    const now = (/* @__PURE__ */ new Date()).valueOf();
    if (now >= frameAnimation.startTime + frameAnimation.duration) {
      frameAnimation.finish();
      return;
    }
    frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
    frameAnimation.draw();
    const that = this;
    frameAnimation.animationFrameId = requestAnimationFrame((function() {
      that._animationStep($element, config);
    }));
  },
  _calcStepValue: function(frameAnimation, currentDuration) {
    const calcValueRecursively = function(from, to) {
      const result = Array.isArray(to) ? [] : {};
      each(to, (function(propName, endPropValue) {
        if ("string" === typeof endPropValue && false === parseFloat(endPropValue)) {
          return true;
        }
        result[propName] = "object" === typeof endPropValue ? calcValueRecursively(from[propName], endPropValue) : (function(propName2) {
          const x = currentDuration / frameAnimation.duration;
          const t = currentDuration;
          const b = 1 * from[propName2];
          const c = to[propName2] - from[propName2];
          const d = frameAnimation.duration;
          return getEasing(frameAnimation.easing)(x, t, b, c, d);
        })(propName);
      }));
      return result;
    };
    return calcValueRecursively(frameAnimation.from, frameAnimation.to);
  },
  _normalizeValue: function(value) {
    const numericValue = parseFloat(value);
    if (false === numericValue) {
      return value;
    }
    return numericValue;
  }
};
var FallbackToNoAnimationStrategy = {
  initAnimation: function() {
  },
  animate: function() {
    return new Deferred().resolve().promise();
  },
  stop: noop,
  isSynchronous: true
};
var getAnimationStrategy = function(config) {
  config = config || {};
  const animationStrategies = {
    transition: m_support_default.transition() ? TransitionAnimationStrategy : FrameAnimationStrategy,
    frame: FrameAnimationStrategy,
    noAnimation: FallbackToNoAnimationStrategy
  };
  let strategy2 = config.strategy || "transition";
  if ("css" === config.type && !m_support_default.transition()) {
    strategy2 = "noAnimation";
  }
  return animationStrategies[strategy2];
};
var baseConfigValidator = function(config, animationType, validate, typeMessage) {
  each(["from", "to"], (function() {
    if (!validate(config[this])) {
      throw errors_default.Error("E0010", animationType, this, typeMessage);
    }
  }));
};
var isObjectConfigValidator = function(config, animationType) {
  return baseConfigValidator(config, animationType, (function(target) {
    return isPlainObject(target);
  }), "a plain object");
};
var isStringConfigValidator = function(config, animationType) {
  return baseConfigValidator(config, animationType, (function(target) {
    return "string" === typeof target;
  }), "a string");
};
var CustomAnimationConfigurator = {
  setup: function() {
  }
};
var CssAnimationConfigurator = {
  validateConfig: function(config) {
    isStringConfigValidator(config, "css");
  },
  setup: function() {
  }
};
var positionAliases = {
  top: {
    my: "bottom center",
    at: "top center"
  },
  bottom: {
    my: "top center",
    at: "bottom center"
  },
  right: {
    my: "left center",
    at: "right center"
  },
  left: {
    my: "right center",
    at: "left center"
  }
};
var SlideAnimationConfigurator = {
  validateConfig: function(config) {
    isObjectConfigValidator(config, "slide");
  },
  setup: function($element, config) {
    const location = locate($element);
    if ("slide" !== config.type) {
      const positioningConfig = "slideIn" === config.type ? config.from : config.to;
      positioningConfig.position = extend({
        of: window3
      }, positionAliases[config.direction]);
      setupPosition($element, positioningConfig);
    }
    this._setUpConfig(location, config.from);
    this._setUpConfig(location, config.to);
    clearCache($element);
  },
  _setUpConfig: function(location, config) {
    config.left = "left" in config ? config.left : "+=0";
    config.top = "top" in config ? config.top : "+=0";
    this._initNewPosition(location, config);
  },
  _initNewPosition: function(location, config) {
    const position2 = {
      left: config.left,
      top: config.top
    };
    delete config.left;
    delete config.top;
    let relativeValue = this._getRelativeValue(position2.left);
    if (void 0 !== relativeValue) {
      position2.left = relativeValue + location.left;
    } else {
      config.left = 0;
    }
    relativeValue = this._getRelativeValue(position2.top);
    if (void 0 !== relativeValue) {
      position2.top = relativeValue + location.top;
    } else {
      config.top = 0;
    }
    config.transform = getTranslateCss({
      x: position2.left,
      y: position2.top
    });
  },
  _getRelativeValue: function(value) {
    let relativeValue;
    if ("string" === typeof value && (relativeValue = RELATIVE_VALUE_REGEX.exec(value))) {
      return parseInt(relativeValue[1] + "1") * relativeValue[2];
    }
  }
};
var FadeAnimationConfigurator = {
  setup: function($element, config) {
    const from = config.from;
    const to = config.to;
    const defaultFromOpacity = "fadeOut" === config.type ? 1 : 0;
    const defaultToOpacity = "fadeOut" === config.type ? 0 : 1;
    let fromOpacity = isPlainObject(from) ? String(from.opacity ?? defaultFromOpacity) : String(from);
    let toOpacity = isPlainObject(to) ? String(to.opacity ?? defaultToOpacity) : String(to);
    if (!config.skipElementInitialStyles) {
      fromOpacity = $element.css("opacity");
    }
    switch (config.type) {
      case "fadeIn":
        toOpacity = 1;
        break;
      case "fadeOut":
        toOpacity = 0;
    }
    config.from = {
      visibility: "visible",
      opacity: fromOpacity
    };
    config.to = {
      opacity: toOpacity
    };
  }
};
var PopAnimationConfigurator = {
  validateConfig: function(config) {
    isObjectConfigValidator(config, "pop");
  },
  setup: function($element, config) {
    const from = config.from;
    const to = config.to;
    const fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity");
    const toOpacity = "opacity" in to ? to.opacity : 1;
    const fromScale = "scale" in from ? from.scale : 0;
    const toScale = "scale" in to ? to.scale : 1;
    config.from = {
      opacity: fromOpacity
    };
    const translate = getTranslate($element);
    config.from.transform = this._getCssTransform(translate, fromScale);
    config.to = {
      opacity: toOpacity
    };
    config.to.transform = this._getCssTransform(translate, toScale);
  },
  _getCssTransform: function(translate, scale) {
    return getTranslateCss(translate) + "scale(" + scale + ")";
  }
};
var animationConfigurators = {
  custom: CustomAnimationConfigurator,
  slide: SlideAnimationConfigurator,
  slideIn: SlideAnimationConfigurator,
  slideOut: SlideAnimationConfigurator,
  fade: FadeAnimationConfigurator,
  fadeIn: FadeAnimationConfigurator,
  fadeOut: FadeAnimationConfigurator,
  pop: PopAnimationConfigurator,
  css: CssAnimationConfigurator
};
var getAnimationConfigurator = function(config) {
  const result = animationConfigurators[config.type];
  if (!result) {
    throw errors_default.Error("E0011", config.type);
  }
  return result;
};
var defaultJSConfig = {
  type: "custom",
  from: {},
  to: {},
  duration: 400,
  start: noop,
  complete: noop,
  easing: "ease",
  delay: 0
};
var defaultCssConfig = {
  duration: 400,
  easing: "ease",
  delay: 0
};
function setupAnimationOnElement() {
  const $element = this.element;
  const config = this.config;
  setupPosition($element, config.from);
  setupPosition($element, config.to);
  this.configurator.setup($element, config);
  $element.data("dxAnimData", this);
  if (fx.off) {
    config.duration = 0;
    config.delay = 0;
  }
  this.strategy.initAnimation($element, config);
  if (config.start) {
    const element = getPublicElement($element);
    config.start.apply(this, [element, config]);
  }
}
var onElementAnimationComplete = function(animation2) {
  const $element = animation2.element;
  const config = animation2.config;
  $element.removeData("dxAnimData");
  if (config.complete) {
    const element = getPublicElement($element);
    config.complete.apply(this, [element, config]);
  }
  animation2.deferred.resolveWith(this, [$element, config]);
};
var startAnimationOnElement = function() {
  const animation2 = this;
  const $element = animation2.element;
  const config = animation2.config;
  animation2.isStarted = true;
  return animation2.strategy.animate($element, config).done((function() {
    onElementAnimationComplete(animation2);
  })).fail((function() {
    animation2.deferred.rejectWith(this, [$element, config]);
  }));
};
var stopAnimationOnElement = function(jumpToEnd) {
  const animation2 = this;
  const $element = animation2.element;
  const config = animation2.config;
  clearTimeout(animation2.startTimeout);
  if (!animation2.isStarted) {
    animation2.start();
  }
  animation2.strategy.stop($element, config, jumpToEnd);
};
var scopedRemoveEvent = addNamespace2(removeEvent, "dxFXStartAnimation");
var subscribeToRemoveEvent = function(animation2) {
  m_events_engine_default.off(animation2.element, scopedRemoveEvent);
  m_events_engine_default.on(animation2.element, scopedRemoveEvent, (function() {
    fx.stop(animation2.element);
  }));
  animation2.deferred.always((function() {
    m_events_engine_default.off(animation2.element, scopedRemoveEvent);
  }));
};
var createAnimation = function(element, initialConfig) {
  const defaultConfig = "css" === initialConfig.type ? defaultCssConfig : defaultJSConfig;
  const config = extend(true, {}, defaultConfig, initialConfig);
  const configurator = getAnimationConfigurator(config);
  const strategy2 = getAnimationStrategy(config);
  const animation2 = {
    element: renderer_default(element),
    config,
    configurator,
    strategy: strategy2,
    isSynchronous: strategy2.isSynchronous,
    setup: setupAnimationOnElement,
    start: startAnimationOnElement,
    stop: stopAnimationOnElement,
    deferred: new Deferred()
  };
  if (isFunction(configurator.validateConfig)) {
    configurator.validateConfig(config);
  }
  subscribeToRemoveEvent(animation2);
  return animation2;
};
var animate = function(element, config) {
  const $element = renderer_default(element);
  if (!$element.length) {
    return new Deferred().resolve().promise();
  }
  const animation2 = createAnimation($element, config);
  pushInAnimationQueue($element, animation2);
  return animation2.deferred.promise();
};
function pushInAnimationQueue($element, animation2) {
  const queueData = getAnimQueueData($element);
  writeAnimQueueData($element, queueData);
  queueData.push(animation2);
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
}
function getAnimQueueData($element) {
  return $element.data("dxAnimQueue") || [];
}
function writeAnimQueueData($element, queueData) {
  $element.data("dxAnimQueue", queueData);
}
var destroyAnimQueueData = function($element) {
  $element.removeData("dxAnimQueue");
};
function isAnimating(element) {
  const $element = renderer_default(element);
  return !!$element.data("dxAnimData");
}
function shiftFromAnimationQueue($element, queueData) {
  queueData = getAnimQueueData($element);
  if (!queueData.length) {
    return;
  }
  const animation2 = queueData.shift();
  if (0 === queueData.length) {
    destroyAnimQueueData($element);
  }
  executeAnimation(animation2).done((function() {
    if (!isAnimating($element)) {
      shiftFromAnimationQueue($element);
    }
  }));
}
function executeAnimation(animation2) {
  animation2.setup();
  if (fx.off || animation2.isSynchronous) {
    animation2.start();
  } else {
    animation2.startTimeout = setTimeout((function() {
      animation2.start();
    }));
  }
  return animation2.deferred.promise();
}
function setupPosition($element, config) {
  if (!config || !config.position) {
    return;
  }
  const win = renderer_default(window3);
  let left = 0;
  let top = 0;
  const position2 = position_default.calculate($element, config.position);
  const offset2 = $element.offset();
  const currentPosition = $element.position();
  if (currentPosition.top > offset2.top) {
    top = win.scrollTop();
  }
  if (currentPosition.left > offset2.left) {
    left = win.scrollLeft();
  }
  extend(config, {
    left: position2.h.location - offset2.left + currentPosition.left - left,
    top: position2.v.location - offset2.top + currentPosition.top - top
  });
  delete config.position;
}
function setProps($element, props) {
  each(props, (function(key, value) {
    try {
      $element.css(key, isFunction(value) ? value() : value);
    } catch (e) {
    }
  }));
}
var stop = function(element, jumpToEnd) {
  const $element = renderer_default(element);
  const queueData = getAnimQueueData($element);
  each(queueData, (function(_, animation3) {
    animation3.config.delay = 0;
    animation3.config.duration = 0;
    animation3.isSynchronous = true;
  }));
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
  const animation2 = $element.data("dxAnimData");
  if (animation2) {
    animation2.stop(jumpToEnd);
  }
  $element.removeData("dxAnimData");
  destroyAnimQueueData($element);
};
var fx = {
  off: false,
  animationTypes: animationConfigurators,
  animate,
  createAnimation,
  isAnimating,
  stop,
  _simulatedTransitionEndDelay: 100
};
var fx_default = fx;

// node_modules/devextreme/esm/__internal/core/m_action.js
var Action = class _Action {
  constructor(action, config) {
    config = config || {};
    this._action = action;
    this._context = config.context || getWindow();
    this._beforeExecute = config.beforeExecute;
    this._afterExecute = config.afterExecute;
    this._component = config.component;
    this._validatingTargetName = config.validatingTargetName;
    const excludeValidators = this._excludeValidators = {};
    if (config.excludeValidators) {
      for (let i = 0; i < config.excludeValidators.length; i++) {
        excludeValidators[config.excludeValidators[i]] = true;
      }
    }
  }
  execute() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const e = {
      action: this._action,
      args: Array.prototype.slice.call(args),
      context: this._context,
      component: this._component,
      validatingTargetName: this._validatingTargetName,
      cancel: false,
      handled: false
    };
    const beforeExecute = this._beforeExecute;
    const afterExecute = this._afterExecute;
    const argsBag = e.args[0] || {};
    if (!this._validateAction(e)) {
      return;
    }
    null === beforeExecute || void 0 === beforeExecute || beforeExecute.call(this._context, e);
    if (e.cancel) {
      return;
    }
    const result = this._executeAction(e);
    if (argsBag.cancel) {
      return;
    }
    null === afterExecute || void 0 === afterExecute || afterExecute.call(this._context, e);
    return result;
  }
  _validateAction(e) {
    const excludeValidators = this._excludeValidators;
    const {
      executors
    } = _Action;
    for (const name in executors) {
      if (!excludeValidators[name]) {
        var _executor$validate;
        const executor = executors[name];
        null === (_executor$validate = executor.validate) || void 0 === _executor$validate || _executor$validate.call(executor, e);
        if (e.cancel) {
          return false;
        }
      }
    }
    return true;
  }
  _executeAction(e) {
    let result;
    const {
      executors
    } = _Action;
    for (const name in executors) {
      var _executor$execute;
      const executor = executors[name];
      null === (_executor$execute = executor.execute) || void 0 === _executor$execute || _executor$execute.call(executor, e);
      if (e.handled) {
        result = e.result;
        break;
      }
    }
    return result;
  }
  static registerExecutor(name, executor) {
    if (isPlainObject(name)) {
      each(name, _Action.registerExecutor);
      return;
    }
    _Action.executors[name] = executor;
  }
  static unregisterExecutor() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    each(args, (function() {
      delete _Action.executors[this];
    }));
  }
};
Action.executors = {};
var createValidatorByTargetElement = (condition) => (e) => {
  if (!e.args.length) {
    return;
  }
  const args = e.args[0];
  const element = args[e.validatingTargetName] || args.element;
  if (element && condition(renderer_default(element))) {
    e.cancel = true;
  }
};
Action.registerExecutor({
  disabled: {
    validate: createValidatorByTargetElement((($target) => $target.is(".dx-state-disabled, .dx-state-disabled *")))
  },
  readOnly: {
    validate: createValidatorByTargetElement((($target) => $target.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)")))
  },
  undefined: {
    execute: (e) => {
      if (!e.action) {
        e.result = void 0;
        e.handled = true;
      }
    }
  },
  func: {
    execute: (e) => {
      if (isFunction(e.action)) {
        e.result = e.action.call(e.context, e.args[0]);
        e.handled = true;
      }
    }
  }
});

// node_modules/devextreme/esm/core/action.js
var action_default = Action;

// node_modules/devextreme/esm/__internal/core/options/m_utils.js
var cachedGetters = {};
var convertRulesToOptions = (rules) => {
  const currentDevice = devices_default.current();
  return rules.reduce(((options, _ref) => {
    let {
      device,
      options: ruleOptions
    } = _ref;
    const deviceFilter = device || {};
    const match = isFunction(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match) {
      extend(true, options, ruleOptions);
    }
    return options;
  }), {});
};
var normalizeOptions = (options, value) => "string" !== typeof options ? options : {
  [options]: value
};
var deviceMatch = (device, filter) => isEmptyObject(filter) || findBestMatches(device, [filter]).length > 0;
var getFieldName = (fullName) => fullName.substr(fullName.lastIndexOf(".") + 1);
var getParentName = (fullName) => fullName.substr(0, fullName.lastIndexOf("."));
var getNestedOptionValue = function(optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || compileGetter(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
var createDefaultOptionRules = function() {
  let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  return options;
};

// node_modules/devextreme/esm/__internal/core/utils/m_comparator.js
var hasNegation = function(oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
var equals = function(oldValue, newValue) {
  oldValue = toComparable(oldValue, true);
  newValue = toComparable(newValue, true);
  if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
    return newValue.is(oldValue);
  }
  const oldValueIsNaN = oldValue !== oldValue;
  const newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (0 === oldValue && 0 === newValue) {
    return hasNegation(oldValue, newValue);
  }
  if (null === oldValue || "object" !== typeof oldValue || dom_adapter_default.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};

// node_modules/devextreme/esm/__internal/core/options/m_option_manager.js
var cachedGetters2 = {};
var cachedSetters = {};
var OptionManager = class {
  constructor(options, optionsByReference) {
    this._options = options;
    this._optionsByReference = optionsByReference;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
    this._validateOptionsCallback;
  }
  _setByReference(options, rulesOptions) {
    extend(true, options, rulesOptions);
    for (const fieldName in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
        options[fieldName] = rulesOptions[fieldName];
      }
    }
  }
  _setPreparedValue(name, value, merge, silent) {
    const previousValue = this.get(this._options, name, false);
    if (!equals(previousValue, value)) {
      const path = getPathParts(name);
      !silent && this._changingCallback(name, previousValue, value);
      cachedSetters[name] = cachedSetters[name] || compileSetter(name);
      cachedSetters[name](this._options, value, {
        functionsAsIs: true,
        merge: isDefined(merge) ? merge : !this._optionsByReference[name],
        unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
      });
      !silent && this._changedCallback(name, value, previousValue);
    }
  }
  _prepareRelevantNames(options, name, value, silent) {
    if (isPlainObject(value)) {
      for (const valueName in value) {
        this._prepareRelevantNames(options, `${name}.${valueName}`, value[valueName]);
      }
    }
    this._namePreparedCallbacks(options, name, value, silent);
  }
  get() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._options;
    let name = arguments.length > 1 ? arguments[1] : void 0;
    let unwrapObservables = arguments.length > 2 ? arguments[2] : void 0;
    cachedGetters2[name] = cachedGetters2[name] || compileGetter(name);
    return cachedGetters2[name](options, {
      functionsAsIs: true,
      unwrapObservables
    });
  }
  set(options, value, merge, silent) {
    options = normalizeOptions(options, value);
    for (const name in options) {
      this._prepareRelevantNames(options, name, options[name], silent);
    }
    if (this._validateOptionsCallback) {
      options = this._validateOptionsCallback(options);
    }
    for (const name in options) {
      this._setPreparedValue(name, options[name], merge, silent);
    }
  }
  onRelevantNamesPrepared(callBack) {
    this._namePreparedCallbacks = callBack;
  }
  onChanging(callBack) {
    this._changingCallback = callBack;
  }
  onChanged(callBack) {
    this._changedCallback = callBack;
  }
  onValidateOptions(callback) {
    this._validateOptionsCallback = callback;
  }
  dispose() {
    this._changingCallback = noop;
    this._changedCallback = noop;
  }
};

// node_modules/devextreme/esm/__internal/core/options/m_index.js
var Options = class {
  constructor(options, defaultOptions, optionsByReference, deprecatedOptions) {
    this._deprecatedCallback;
    this._startChangeCallback;
    this._endChangeCallback;
    this._validateOptionsCallback;
    this._default = defaultOptions;
    this._deprecated = deprecatedOptions;
    this._deprecatedNames = [];
    this._initDeprecatedNames();
    this._optionManager = new OptionManager(options, optionsByReference);
    this._optionManager.onRelevantNamesPrepared(((options2, name, value, silent) => this._setRelevantNames(options2, name, value, silent)));
    this._cachedOptions = {};
    this._rules = [];
  }
  set _initial(value) {
    this._initialOptions = value;
  }
  get _initial() {
    if (!this._initialOptions) {
      const rulesOptions = this._getByRules(this.silent("defaultOptionsRules"));
      this._initialOptions = this._default;
      this._optionManager._setByReference(this._initialOptions, rulesOptions);
    }
    return this._initialOptions;
  }
  _initDeprecatedNames() {
    for (const optionName in this._deprecated) {
      this._deprecatedNames.push(optionName);
    }
  }
  _getByRules(rules) {
    rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
    return convertRulesToOptions(rules);
  }
  _notifyDeprecated(option) {
    const info = this._deprecated[option];
    if (info) {
      this._deprecatedCallback(option, info);
    }
  }
  _setRelevantNames(options, name, value, silent) {
    if (name) {
      const normalizedName = this._normalizeName(name, silent);
      if (normalizedName && normalizedName !== name) {
        this._setField(options, normalizedName, value);
        this._clearField(options, name);
      }
    }
  }
  _setField(options, fullName, value) {
    let fieldName = "";
    let fieldObject = null;
    do {
      fieldName = fieldName ? `.${fieldName}` : "";
      fieldName = getFieldName(fullName) + fieldName;
      fullName = getParentName(fullName);
      fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options;
    } while (!fieldObject);
    fieldObject[fieldName] = value;
  }
  _clearField(options, name) {
    delete options[name];
    const previousFieldName = getParentName(name);
    const fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
    if (fieldObject) {
      delete fieldObject[getFieldName(name)];
    }
  }
  _normalizeName(name, silent) {
    if (this._deprecatedNames.length && name) {
      for (let i = 0; i < this._deprecatedNames.length; i++) {
        if (this._deprecatedNames[i] === name) {
          const deprecate = this._deprecated[name];
          if (deprecate) {
            !silent && this._notifyDeprecated(name);
            return deprecate.alias || name;
          }
        }
      }
    }
    return name;
  }
  addRules(rules) {
    this._rules = rules.concat(this._rules);
  }
  applyRules(rules) {
    const options = this._getByRules(rules);
    this.silent(options);
  }
  dispose() {
    this._deprecatedCallback = noop;
    this._startChangeCallback = noop;
    this._endChangeCallback = noop;
    this._optionManager.dispose();
  }
  onChanging(callBack) {
    this._optionManager.onChanging(callBack);
  }
  onChanged(callBack) {
    this._optionManager.onChanged(callBack);
  }
  validateOptions(callBack) {
    this._optionManager.onValidateOptions(callBack);
  }
  onDeprecated(callBack) {
    this._deprecatedCallback = callBack;
  }
  onStartChange(callBack) {
    this._startChangeCallback = callBack;
  }
  onEndChange(callBack) {
    this._endChangeCallback = callBack;
  }
  isInitial(name) {
    const value = this.silent(name);
    const initialValue = this.initial(name);
    const areFunctions = isFunction(value) && isFunction(initialValue);
    return areFunctions ? value.toString() === initialValue.toString() : equalByValue(value, initialValue);
  }
  initial(name) {
    return getNestedOptionValue(this._initial, name);
  }
  option(options, value) {
    const isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, this._normalizeName(options));
    }
    this._startChangeCallback();
    try {
      this._optionManager.set(options, value);
    } finally {
      this._endChangeCallback();
    }
  }
  silent(options, value) {
    const isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, options, void 0, true);
    }
    this._optionManager.set(options, value, void 0, true);
  }
  reset(name) {
    if (name) {
      const fullPath = getPathParts(name);
      const value = fullPath.reduce(((value2, field) => value2 ? value2[field] : this.initial(field)), null);
      const defaultValue = isObject(value) ? _extends({}, value) : value;
      this._optionManager.set(name, defaultValue, false);
    }
  }
  getAliasesByName(name) {
    return Object.keys(this._deprecated).filter(((aliasName) => name === this._deprecated[aliasName].alias));
  }
  isDeprecated(name) {
    return Object.prototype.hasOwnProperty.call(this._deprecated, name);
  }
  cache(name, options) {
    const isGetter = arguments.length < 2;
    if (isGetter) {
      return this._cachedOptions[name];
    }
    this._cachedOptions[name] = extend(this._cachedOptions[name], options);
  }
};

// node_modules/devextreme/esm/__internal/core/m_postponed_operations.js
var PostponedOperations = class {
  constructor() {
    this._postponedOperations = {};
  }
  add(key, fn, postponedPromise) {
    if (key in this._postponedOperations) {
      postponedPromise && this._postponedOperations[key].promises.push(postponedPromise);
    } else {
      const completePromise = new Deferred();
      this._postponedOperations[key] = {
        fn,
        completePromise,
        promises: postponedPromise ? [postponedPromise] : []
      };
    }
    return this._postponedOperations[key].completePromise.promise();
  }
  callPostponedOperations() {
    for (const key in this._postponedOperations) {
      const operation = this._postponedOperations[key];
      if (isDefined(operation)) {
        if (operation.promises && operation.promises.length) {
          when(...operation.promises).done(operation.fn).then(operation.completePromise.resolve);
        } else {
          operation.fn().done(operation.completePromise.resolve);
        }
      }
    }
    this._postponedOperations = {};
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_public_component.js
var componentNames = /* @__PURE__ */ new WeakMap();
var nextAnonymousComponent = 0;
var getName = function(componentClass, newName) {
  if (isDefined(newName)) {
    componentNames.set(componentClass, newName);
    return;
  }
  if (!componentNames.has(componentClass)) {
    const generatedName = "dxPrivateComponent" + nextAnonymousComponent++;
    componentNames.set(componentClass, generatedName);
    return generatedName;
  }
  return componentNames.get(componentClass);
};
function attachInstanceToElement($element, componentInstance, disposeFn) {
  const data2 = data($element.get(0));
  const name = getName(componentInstance.constructor);
  data2[name] = componentInstance;
  if (disposeFn) {
    m_events_engine_default.one($element, removeEvent, (function() {
      disposeFn.call(componentInstance);
    }));
  }
  if (!data2.dxComponents) {
    data2.dxComponents = [];
  }
  data2.dxComponents.push(name);
}
function getInstanceByElement($element, componentClass) {
  const name = getName(componentClass);
  return data($element.get(0), name);
}

// node_modules/devextreme/esm/__internal/core/widget/component.js
var getEventName = (actionName) => actionName.charAt(2).toLowerCase() + actionName.substr(3);
var isInnerOption = (optionName) => 0 === optionName.indexOf("_", 0);
var Component = class extends class_default.inherit({}) {
  _setDeprecatedOptions() {
    this._deprecatedOptions = {};
  }
  _getDeprecatedOptions() {
    return this._deprecatedOptions;
  }
  _getDefaultOptions() {
    return {
      onInitialized: null,
      onOptionChanged: null,
      onDisposing: null,
      defaultOptionsRules: null
    };
  }
  _defaultOptionsRules() {
    return [];
  }
  _setOptionsByDevice(rules) {
    this._options.applyRules(rules);
  }
  _convertRulesToOptions(rules) {
    return convertRulesToOptions(rules);
  }
  _isInitialOptionValue(name) {
    return this._options.isInitial(name);
  }
  _setOptionsByReference() {
    this._optionsByReference = {};
  }
  _getOptionsByReference() {
    return this._optionsByReference;
  }
  ctor() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {
      _optionChangedCallbacks,
      _disposingCallbacks
    } = options;
    this.NAME = getName(this.constructor);
    this._eventsStrategy = EventsStrategy.create(this, options.eventsStrategy);
    this._updateLockCount = 0;
    this._optionChangedCallbacks = _optionChangedCallbacks || callbacks_default();
    this._disposingCallbacks = _disposingCallbacks || callbacks_default();
    this.postponedOperations = new PostponedOperations();
    this._createOptions(options);
  }
  _createOptions(options) {
    this.beginUpdate();
    try {
      this._setOptionsByReference();
      this._setDeprecatedOptions();
      this._options = new Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
      this._options.onChanging(((name, previousValue, value) => this._initialized && this._optionChanging(name, previousValue, value)));
      this._options.onDeprecated(((option, info) => this._logDeprecatedOptionWarning(option, info)));
      this._options.onChanged(((name, value, previousValue) => this._notifyOptionChanged(name, value, previousValue)));
      this._options.onStartChange((() => this.beginUpdate()));
      this._options.onEndChange((() => this.endUpdate()));
      this._options.addRules(this._defaultOptionsRules());
      this._options.validateOptions(((opts) => this._validateOptions(opts)));
      if (options && options.onInitializing) {
        options.onInitializing.apply(this, [options]);
      }
      this._setOptionsByDevice(options.defaultOptionsRules);
      this._initOptions(options);
    } finally {
      this.endUpdate();
    }
  }
  _initOptions(options) {
    this.option(options);
  }
  _init() {
    this._createOptionChangedAction();
    this.on("disposing", ((args) => {
      this._disposingCallbacks.fireWith(this, [args]);
    }));
  }
  _logDeprecatedOptionWarning(option, info) {
    const message = info.message || `Use the '${info.alias}' option instead`;
    errors_default.log("W0001", this.NAME, option, info.since, message);
  }
  _logDeprecatedComponentWarning(since, alias) {
    errors_default.log("W0000", this.NAME, since, `Use the '${alias}' widget instead`);
  }
  _createOptionChangedAction() {
    this._optionChangedAction = this._createActionByOption("onOptionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _createDisposingAction() {
    this._disposingAction = this._createActionByOption("onDisposing", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "onDisposing":
      case "onInitialized":
      case "defaultOptionsRules":
      default:
        break;
      case "onOptionChanged":
        this._createOptionChangedAction();
    }
  }
  _dispose() {
    var _this$_disposingActio;
    this._optionChangedCallbacks.empty();
    this._createDisposingAction();
    null === (_this$_disposingActio = this._disposingAction) || void 0 === _this$_disposingActio || _this$_disposingActio.call(this);
    this._eventsStrategy.dispose();
    this._options.dispose();
    this._disposed = true;
  }
  _lockUpdate() {
    this._updateLockCount += 1;
  }
  _unlockUpdate() {
    this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
  }
  _isUpdateAllowed() {
    return 0 === this._updateLockCount;
  }
  _isInitializingRequired() {
    return !this._initializing && !this._initialized;
  }
  isInitialized() {
    return this._initialized;
  }
  _commitUpdate() {
    this.postponedOperations.callPostponedOperations();
    this._isInitializingRequired() && this._initializeComponent();
  }
  _initializeComponent() {
    this._initializing = true;
    try {
      this._init();
    } finally {
      this._initializing = false;
      this._lockUpdate();
      this._createActionByOption("onInitialized", {
        excludeValidators: ["disabled", "readOnly"]
      })();
      this._unlockUpdate();
      this._initialized = true;
    }
  }
  instance() {
    return this;
  }
  beginUpdate() {
    this._lockUpdate();
  }
  endUpdate() {
    this._unlockUpdate();
    this._isUpdateAllowed() && this._commitUpdate();
  }
  _optionChanging() {
  }
  _notifyOptionChanged(option, value, previousValue) {
    if (this._initialized) {
      const optionNames = [option].concat(this._options.getAliasesByName(option));
      for (let i = 0; i < optionNames.length; i += 1) {
        const name = optionNames[i];
        const args = {
          name: getPathParts(name)[0],
          fullName: name,
          value,
          previousValue
        };
        if (!isInnerOption(name)) {
          var _this$_optionChangedA;
          this._optionChangedCallbacks.fireWith(this, [extend(this._defaultActionArgs(), args)]);
          null === (_this$_optionChangedA = this._optionChangedAction) || void 0 === _this$_optionChangedA || _this$_optionChangedA.call(this, extend({}, args));
        }
        if (!this._disposed && this._cancelOptionChange !== name) {
          this._optionChanged(args);
        }
      }
    }
  }
  initialOption(name) {
    return this._options.initial(name);
  }
  _defaultActionConfig() {
    return {
      context: this,
      component: this
    };
  }
  _defaultActionArgs() {
    return {
      component: this
    };
  }
  _createAction(actionSource, config) {
    let action;
    return (e) => {
      if (!isDefined(e)) {
        e = {};
      }
      if (!isPlainObject(e)) {
        e = {
          actionValue: e
        };
      }
      action = action || new action_default(actionSource, extend({}, config, this._defaultActionConfig()));
      return action.execute.call(action, extend(e, this._defaultActionArgs()));
    };
  }
  _createActionByOption(optionName, config) {
    var _this = this;
    let action;
    let eventName;
    let actionFunc;
    let actionConfig = _extends({}, config ?? {});
    const result = function() {
      var _actionConfig, _actionConfig2;
      if (!eventName) {
        actionConfig = actionConfig || {};
        if ("string" !== typeof optionName) {
          throw errors_default.Error("E0008");
        }
        if (optionName.startsWith("on")) {
          eventName = getEventName(optionName);
        }
        actionFunc = _this.option(optionName);
      }
      if (!action && !actionFunc && !(null !== (_actionConfig = actionConfig) && void 0 !== _actionConfig && _actionConfig.beforeExecute) && !(null !== (_actionConfig2 = actionConfig) && void 0 !== _actionConfig2 && _actionConfig2.afterExecute) && !_this._eventsStrategy.hasEvent(eventName)) {
        return;
      }
      if (!action) {
        const {
          beforeExecute
        } = actionConfig;
        actionConfig.beforeExecute = function() {
          for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            props[_key2] = arguments[_key2];
          }
          null === beforeExecute || void 0 === beforeExecute || beforeExecute.apply(_this, props);
          _this._eventsStrategy.fireEvent(eventName, props[0].args);
        };
        action = _this._createAction(actionFunc, actionConfig);
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (config_default().wrapActionsBeforeExecute) {
        const {
          beforeActionExecute = noop
        } = _this.option();
        const wrappedAction = beforeActionExecute(_this, action, actionConfig) || action;
        return wrappedAction.apply(_this, args);
      }
      return action.apply(_this, args);
    };
    if (config_default().wrapActionsBeforeExecute) {
      return result;
    }
    const {
      onActionCreated = noop
    } = this.option();
    return onActionCreated(this, result, actionConfig) || result;
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
  hasActionSubscription(actionName) {
    return !!this._options.silent(actionName) || isString(actionName) && this._eventsStrategy.hasEvent(getEventName(actionName));
  }
  isOptionDeprecated(name) {
    return this._options.isDeprecated(name);
  }
  _setOptionWithoutOptionChange(name, value) {
    this._cancelOptionChange = name;
    this.option(name, value);
    this._cancelOptionChange = false;
  }
  _getOptionValue(name, context) {
    const value = this.option(name);
    if (isFunction(value)) {
      return value.bind(context)();
    }
    return value;
  }
  option() {
    return this._options.option(...arguments);
  }
  resetOption(name) {
    this.beginUpdate();
    this._options.reset(name);
    this.endUpdate();
  }
  _validateOptions(options) {
    return options;
  }
};

// node_modules/devextreme/esm/common/core/animation/presets/presets.js
var directionPostfixes = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var AnimationPresetCollection = Component.inherit({
  ctor: function() {
    this.callBase.apply(this, arguments);
    this._registeredPresets = [];
    this.resetToDefaults();
  },
  _getDefaultOptions: function() {
    return extend(this.callBase(), {
      defaultAnimationDuration: 400,
      defaultAnimationDelay: 0,
      defaultStaggerAnimationDuration: 300,
      defaultStaggerAnimationDelay: 40,
      defaultStaggerAnimationStartDelay: 500
    });
  },
  _defaultOptionsRules: function() {
    return this.callBase().concat([{
      device: function(device) {
        return device.phone;
      },
      options: {
        defaultStaggerAnimationDuration: 350,
        defaultStaggerAnimationDelay: 50,
        defaultStaggerAnimationStartDelay: 0
      }
    }, {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      options: {
        defaultAnimationDelay: 100
      }
    }]);
  },
  _getPresetOptionName: function(animationName) {
    return "preset_" + animationName;
  },
  _createAndroidSlideAnimationConfig: function(throughOpacity, widthMultiplier) {
    const that = this;
    const createBaseConfig = function(configModifier) {
      return {
        type: "slide",
        delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
        duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
      };
    };
    return {
      enter: function($element, configModifier) {
        const width = getWidth($element.parent()) * widthMultiplier;
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.to = {
          left: 0,
          opacity: 1
        };
        if ("forward" === direction) {
          config.from = {
            left: width,
            opacity: throughOpacity
          };
        } else if ("backward" === direction) {
          config.from = {
            left: -width,
            opacity: throughOpacity
          };
        } else {
          config.from = {
            left: 0,
            opacity: 0
          };
        }
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const width = getWidth($element.parent()) * widthMultiplier;
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.from = {
          left: 0,
          opacity: 1
        };
        if ("forward" === direction) {
          config.to = {
            left: -width,
            opacity: throughOpacity
          };
        } else if ("backward" === direction) {
          config.to = {
            left: width,
            opacity: throughOpacity
          };
        } else {
          config.to = {
            left: 0,
            opacity: 0
          };
        }
        return fx_default.createAnimation($element, config);
      }
    };
  },
  _createOpenDoorConfig: function() {
    const that = this;
    const createBaseConfig = function(configModifier) {
      return {
        type: "css",
        extraCssClasses: "dx-opendoor-animation",
        delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
        duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
      };
    };
    return {
      enter: function($element, configModifier) {
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.delay = "none" === direction ? config.delay : config.duration;
        config.from = "dx-enter dx-opendoor-animation" + directionPostfixes[direction];
        config.to = "dx-enter-active";
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.from = "dx-leave dx-opendoor-animation" + directionPostfixes[direction];
        config.to = "dx-leave-active";
        return fx_default.createAnimation($element, config);
      }
    };
  },
  _createWinPopConfig: function() {
    const that = this;
    const baseConfig = {
      type: "css",
      extraCssClasses: "dx-win-pop-animation",
      duration: that.option("defaultAnimationDuration")
    };
    return {
      enter: function($element, configModifier) {
        const config = baseConfig;
        const direction = configModifier.direction;
        config.delay = "none" === direction ? that.option("defaultAnimationDelay") : that.option("defaultAnimationDuration") / 2;
        config.from = "dx-enter dx-win-pop-animation" + directionPostfixes[direction];
        config.to = "dx-enter-active";
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const config = baseConfig;
        const direction = configModifier.direction;
        config.delay = that.option("defaultAnimationDelay");
        config.from = "dx-leave dx-win-pop-animation" + directionPostfixes[direction];
        config.to = "dx-leave-active";
        return fx_default.createAnimation($element, config);
      }
    };
  },
  resetToDefaults: function() {
    this.clear();
    this.registerDefaultPresets();
    this.applyChanges();
  },
  clear: function(name) {
    const that = this;
    const newRegisteredPresets = [];
    each(this._registeredPresets, (function(index2, preset) {
      if (!name || name === preset.name) {
        that.option(that._getPresetOptionName(preset.name), void 0);
      } else {
        newRegisteredPresets.push(preset);
      }
    }));
    this._registeredPresets = newRegisteredPresets;
    this.applyChanges();
  },
  registerPreset: function(name, config) {
    this._registeredPresets.push({
      name,
      config
    });
  },
  applyChanges: function() {
    const that = this;
    const customRules = [];
    each(this._registeredPresets, (function(index2, preset) {
      const rule = {
        device: preset.config.device,
        options: {}
      };
      rule.options[that._getPresetOptionName(preset.name)] = preset.config.animation;
      customRules.push(rule);
    }));
    this._setOptionsByDevice(customRules);
  },
  getPreset: function(name) {
    let result = name;
    while ("string" === typeof result) {
      result = this.option(this._getPresetOptionName(result));
    }
    return result;
  },
  registerDefaultPresets: function() {
    this.registerPreset("pop", {
      animation: {
        extraCssClasses: "dx-android-pop-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("openDoor", {
      animation: this._createOpenDoorConfig()
    });
    this.registerPreset("win-pop", {
      animation: this._createWinPopConfig()
    });
    this.registerPreset("fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("slide", {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(1, 1)
    });
    this.registerPreset("slide", {
      device: function() {
        return !m_devices_default.current().android && !m_devices_default.real.android;
      },
      animation: {
        extraCssClasses: "dx-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-slide", {
      animation: {
        extraCssClasses: "dx-ios7-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("overflow", {
      animation: {
        extraCssClasses: "dx-overflow-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function() {
        return !m_devices_default.current().android && !m_devices_default.real.android;
      },
      animation: {
        extraCssClasses: "dx-ios7-toolbar-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(0, 0.4)
    });
    this.registerPreset("stagger-fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-slide", {
      animation: {
        extraCssClasses: "dx-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-slide", {
      animation: {
        extraCssClasses: "dx-fade-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-drop", {
      animation: {
        extraCssClasses: "dx-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-drop", {
      animation: {
        extraCssClasses: "dx-fade-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-rise", {
      animation: {
        extraCssClasses: "dx-fade-rise-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-3d-drop", {
      animation: {
        extraCssClasses: "dx-3d-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-zoom", {
      animation: {
        extraCssClasses: "dx-fade-zoom-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
  }
});
var animationPresets = new AnimationPresetCollection();

// node_modules/devextreme/esm/common/core/animation/presets.js
var presets_default = animationPresets;

// node_modules/devextreme/esm/common/core/animation/transition_executor/transition_executor.js
var directionPostfixes2 = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var TransitionExecutor = class_default.inherit({
  ctor: function() {
    this._accumulatedDelays = {
      enter: 0,
      leave: 0
    };
    this._animations = [];
    this.reset();
  },
  _createAnimations: function($elements, initialConfig, configModifier, type2) {
    $elements = renderer_default($elements);
    const that = this;
    const result = [];
    configModifier = configModifier || {};
    const animationConfig = this._prepareElementAnimationConfig(initialConfig, configModifier, type2);
    if (animationConfig) {
      $elements.each((function() {
        const animation2 = that._createAnimation(renderer_default(this), animationConfig, configModifier);
        if (animation2) {
          animation2.element.addClass("dx-animating");
          animation2.setup();
          result.push(animation2);
        }
      }));
    }
    return result;
  },
  _prepareElementAnimationConfig: function(config, configModifier, type2) {
    let result;
    if ("string" === typeof config) {
      const presetName = config;
      config = animationPresets.getPreset(presetName);
    }
    if (!config) {
      result = void 0;
    } else if (isFunction(config[type2])) {
      result = config[type2];
    } else {
      result = extend({
        skipElementInitialStyles: true,
        cleanupWhen: this._completePromise
      }, config, configModifier);
      if (!result.type || "css" === result.type) {
        const cssClass = "dx-" + type2;
        const extraCssClasses = (result.extraCssClasses ? " " + result.extraCssClasses : "") + directionPostfixes2[result.direction];
        result.type = "css";
        result.from = (result.from || cssClass) + extraCssClasses;
        result.to = result.to || cssClass + "-active";
      }
      result.staggerDelay = result.staggerDelay || 0;
      result.delay = result.delay || 0;
      if (result.staggerDelay) {
        result.delay += this._accumulatedDelays[type2];
        this._accumulatedDelays[type2] += result.staggerDelay;
      }
    }
    return result;
  },
  _createAnimation: function($element, animationConfig, configModifier) {
    let result;
    if (isPlainObject(animationConfig)) {
      result = fx_default.createAnimation($element, animationConfig);
    } else if (isFunction(animationConfig)) {
      result = animationConfig($element, configModifier);
    }
    return result;
  },
  _startAnimations: function() {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].start();
    }
  },
  _stopAnimations: function(jumpToEnd) {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].stop(jumpToEnd);
    }
  },
  _clearAnimations: function() {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].element.removeClass("dx-animating");
    }
    this._animations.length = 0;
  },
  reset: function() {
    this._accumulatedDelays.enter = 0;
    this._accumulatedDelays.leave = 0;
    this._clearAnimations();
    this._completeDeferred = new Deferred();
    this._completePromise = this._completeDeferred.promise();
  },
  enter: function($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, "enter");
    this._animations.push.apply(this._animations, animations);
  },
  leave: function($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, "leave");
    this._animations.push.apply(this._animations, animations);
  },
  start: function() {
    const that = this;
    let result;
    if (!this._animations.length) {
      that.reset();
      result = new Deferred().resolve().promise();
    } else {
      const animationDeferreds = map(this._animations, (function(animation2) {
        const result2 = new Deferred();
        animation2.deferred.always((function() {
          result2.resolve();
        }));
        return result2.promise();
      }));
      result = when.apply(renderer_default, animationDeferreds).always((function() {
        that._completeDeferred.resolve();
        that.reset();
      }));
      m_common_default.executeAsync((function() {
        that._startAnimations();
      }));
    }
    return result;
  },
  stop: function(jumpToEnd) {
    this._stopAnimations(jumpToEnd);
  }
});

// node_modules/devextreme/esm/common/core/animation/transition_executor.js
var transition_executor_default = TransitionExecutor;

// node_modules/devextreme/esm/__internal/core/utils/m_dom.js
var window4 = getWindow();
var getRootNodeHost = (element) => {
  if (!element.getRootNode) {
    return;
  }
  const {
    host
  } = element.getRootNode();
  if (isString(host)) {
    return;
  }
  return host;
};
var resetActiveElement = () => {
  const activeElement = dom_adapter_default.getActiveElement();
  if (activeElement && activeElement !== dom_adapter_default.getBody()) {
    var _activeElement$blur;
    null === (_activeElement$blur = activeElement.blur) || void 0 === _activeElement$blur || _activeElement$blur.call(activeElement);
  }
};
var clearSelection = () => {
  const selection = window4.getSelection();
  if (!selection) {
    return;
  }
  if ("Caret" === selection.type) {
    return;
  }
  if (selection.empty) {
    selection.empty();
  } else if (selection.removeAllRanges) {
    try {
      selection.removeAllRanges();
    } catch (e) {
    }
  }
};
var closestCommonParent = (startTarget, endTarget) => {
  const $startTarget = renderer_default(startTarget);
  const $endTarget = renderer_default(endTarget);
  if ($startTarget[0] === $endTarget[0]) {
    return $startTarget[0];
  }
  const $startParents = $startTarget.parents();
  const $endParents = $endTarget.parents();
  const startingParent = Math.min($startParents.length, $endParents.length);
  for (let i = -startingParent; i < 0; i++) {
    if ($startParents.get(i) === $endParents.get(i)) {
      return $startParents.get(i);
    }
  }
};
var extractTemplateMarkup = (element) => {
  element = renderer_default(element);
  const templateTag = element.length && element.filter((function() {
    const $node = renderer_default(this);
    return $node.is("script[type]") && !$node.attr("type").includes("script");
  }));
  if (templateTag.length) {
    return templateTag.eq(0).html();
  }
  element = renderer_default("<div>").append(element);
  return element.html();
};
var normalizeTemplateElement = (element) => {
  let $element = renderer_default();
  if (isDefined(element) && (element.nodeType || isRenderer(element))) {
    $element = renderer_default(element);
  } else if ("object" !== typeof element) {
    $element = renderer_default("<div>").html(element).contents();
  }
  if (1 === $element.length) {
    if ($element.is("script")) {
      $element = normalizeTemplateElement($element.html().trim());
    } else if ($element.is("table")) {
      $element = $element.children("tbody").contents();
    }
  }
  return $element;
};
var clipboardText = (event, text) => {
  const clipboard = event.originalEvent && event.originalEvent.clipboardData || window4.clipboardData;
  if (!text) {
    return clipboard && clipboard.getData("Text");
  }
  clipboard && clipboard.setData("Text", text);
};
var contains = (container, element) => {
  if (!element) {
    return false;
  }
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains(element) || contains(container, getRootNodeHost(element));
};
var createTextElementHiddenCopy = (element, text, options) => {
  const elementStyles = window4.getComputedStyle(renderer_default(element).get(0));
  const includePaddings = options && options.includePaddings;
  return renderer_default("<div>").text(text).css({
    fontStyle: elementStyles.fontStyle,
    fontVariant: elementStyles.fontVariant,
    fontWeight: elementStyles.fontWeight,
    fontSize: elementStyles.fontSize,
    fontFamily: elementStyles.fontFamily,
    letterSpacing: elementStyles.letterSpacing,
    border: elementStyles.border,
    paddingTop: includePaddings ? elementStyles.paddingTop : "",
    paddingRight: includePaddings ? elementStyles.paddingRight : "",
    paddingBottom: includePaddings ? elementStyles.paddingBottom : "",
    paddingLeft: includePaddings ? elementStyles.paddingLeft : "",
    visibility: "hidden",
    whiteSpace: "pre",
    position: "absolute",
    float: "left"
  });
};
var insertBefore = (element, newElement) => {
  if (newElement) {
    dom_adapter_default.insertElement(element.parentNode, newElement, element);
  }
  return element;
};
var replaceWith = (element, newElement) => {
  if (!(newElement && newElement[0])) {
    return;
  }
  if (newElement.is(element)) {
    return element;
  }
  each(newElement, ((_, currentElement) => {
    insertBefore(element[0], currentElement);
  }));
  element.remove();
  return newElement;
};
var isElementInDom = ($element) => {
  const element = null === $element || void 0 === $element ? void 0 : $element.get(0);
  const shadowHost = null === element || void 0 === element ? void 0 : element.getRootNode().host;
  return !!renderer_default(shadowHost || element).closest(getWindow().document).length;
};
var m_dom_default = {
  resetActiveElement,
  clearSelection,
  closestCommonParent,
  extractTemplateMarkup,
  normalizeTemplateElement,
  clipboardText,
  contains,
  createTextElementHiddenCopy,
  insertBefore,
  replaceWith,
  isElementInDom
};

// node_modules/devextreme/esm/__internal/events/core/m_emitter.js
var Emitter = class_default.inherit({
  ctor(element) {
    this._$element = renderer_default(element);
    this._cancelCallback = callbacks_default();
    this._acceptCallback = callbacks_default();
  },
  getElement() {
    return this._$element;
  },
  validate: (e) => !isDxMouseWheelEvent(e),
  validatePointers: (e) => 1 === hasTouches(e),
  allowInterruptionByMouseWheel: () => true,
  configure(data2) {
    extend(this, data2);
  },
  addCancelCallback(callback) {
    this._cancelCallback.add(callback);
  },
  removeCancelCallback() {
    this._cancelCallback.empty();
  },
  _cancel(e) {
    this._cancelCallback.fire(this, e);
  },
  addAcceptCallback(callback) {
    this._acceptCallback.add(callback);
  },
  removeAcceptCallback() {
    this._acceptCallback.empty();
  },
  _accept(e) {
    this._acceptCallback.fire(this, e);
  },
  _requestAccept(e) {
    this._acceptRequestEvent = e;
  },
  _forgetAccept() {
    this._accept(this._acceptRequestEvent);
    this._acceptRequestEvent = null;
  },
  start: noop,
  move: noop,
  end: noop,
  cancel: noop,
  reset() {
    if (this._acceptRequestEvent) {
      this._accept(this._acceptRequestEvent);
    }
  },
  _fireEvent(eventName, e, params) {
    const eventData2 = extend({
      type: eventName,
      originalEvent: e,
      target: this._getEmitterTarget(e),
      delegateTarget: this.getElement().get(0)
    }, params);
    e = fireEvent(eventData2);
    if (e.cancel) {
      this._cancel(e);
    }
    return e;
  },
  _getEmitterTarget(e) {
    return (this.delegateSelector ? renderer_default(e.target).closest(this.delegateSelector) : this.getElement()).get(0);
  },
  dispose: noop
});
var m_emitter_default = Emitter;

// node_modules/devextreme/esm/__internal/events/core/m_wheel.js
var EVENT_NAME = "dxmousewheel";
var wheel = {
  setup(element) {
    const $element = renderer_default(element);
    m_events_engine_default.on($element, addNamespace2("wheel", "dxWheel"), wheel._wheelHandler.bind(wheel));
  },
  teardown(element) {
    m_events_engine_default.off(element, ".dxWheel");
  },
  _wheelHandler(e) {
    const {
      deltaMode,
      deltaY,
      deltaX,
      deltaZ
    } = e.originalEvent;
    fireEvent({
      type: EVENT_NAME,
      originalEvent: e,
      delta: this._normalizeDelta(deltaY, deltaMode),
      deltaX,
      deltaY,
      deltaZ,
      deltaMode,
      pointerType: "mouse"
    });
    e.stopPropagation();
  },
  _normalizeDelta(delta) {
    let deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    if (0 === deltaMode) {
      return -delta;
    }
    return -30 * delta;
  }
};
m_event_registrator_default(EVENT_NAME, wheel);

// node_modules/devextreme/esm/__internal/events/pointer/m_base.js
var BaseStrategy = class_default.inherit({
  ctor(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = addNamespace2(originalEvents, "dxPointerEvents");
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble() {
    const eventName = this._eventName;
    return "dxpointerenter" === eventName || "dxpointerleave" === eventName;
  },
  _handler(e) {
    const delegateTarget = this._getDelegateTarget(e);
    const event = {
      type: this._eventName,
      pointerType: e.pointerType || eventSource(e),
      originalEvent: e,
      delegateTarget,
      timeStamp: browser_default.mozilla ? (/* @__PURE__ */ new Date()).getTime() : e.timeStamp
    };
    const target = getEventTarget(e);
    event.target = target;
    return this._fireEvent(event);
  },
  _getDelegateTarget(e) {
    let delegateTarget;
    if (this.noBubble) {
      delegateTarget = e.delegateTarget;
    }
    return delegateTarget;
  },
  _fireEvent: (args) => fireEvent(args),
  _setSelector(handleObj) {
    this._selector = this.noBubble && handleObj ? handleObj.selector : null;
  },
  _getSelector() {
    return this._selector;
  },
  setup: () => true,
  add(element, handleObj) {
    if (this._handlerCount <= 0 || this.noBubble) {
      element = this.noBubble ? element : dom_adapter_default.getDocument();
      this._setSelector(handleObj);
      const that = this;
      m_events_engine_default.on(element, this._originalEvents, this._getSelector(), ((e) => {
        that._handler(e);
      }));
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove(handleObj) {
    this._setSelector(handleObj);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown(element) {
    if (this._handlerCount && !this.noBubble) {
      return;
    }
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    if (".dxPointerEvents" !== this._originalEvents) {
      m_events_engine_default.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose(element) {
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    m_events_engine_default.off(element, this._originalEvents);
  }
});
var m_base_default = BaseStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_observer.js
var addEventsListener = function(events, handler) {
  ready_callbacks_default.add((() => {
    events.split(" ").forEach(((event) => {
      dom_adapter_default.listen(dom_adapter_default.getDocument(), event, handler, true);
    }));
  }));
};
var Observer = function(eventMap4, pointerEquals, onPointerAdding) {
  onPointerAdding = onPointerAdding || function() {
  };
  let pointers = [];
  const getPointerIndex = function(e) {
    let index2 = -1;
    each(pointers, ((i, pointer2) => {
      if (!pointerEquals(e, pointer2)) {
        return true;
      }
      index2 = i;
      return false;
    }));
    return index2;
  };
  const removePointer = function(e) {
    const index2 = getPointerIndex(e);
    if (index2 > -1) {
      pointers.splice(index2, 1);
    }
  };
  addEventsListener(eventMap4.dxpointerdown, (function(e) {
    if (-1 === getPointerIndex(e)) {
      onPointerAdding(e);
      pointers.push(e);
    }
  }));
  addEventsListener(eventMap4.dxpointermove, (function(e) {
    pointers[getPointerIndex(e)] = e;
  }));
  addEventsListener(eventMap4.dxpointerup, removePointer);
  addEventsListener(eventMap4.dxpointercancel, removePointer);
  this.pointers = function() {
    return pointers;
  };
  this.reset = function() {
    pointers = [];
  };
};
var m_observer_default = Observer;

// node_modules/devextreme/esm/__internal/events/pointer/m_mouse.js
var eventMap = {
  dxpointerdown: "mousedown",
  dxpointermove: "mousemove",
  dxpointerup: "mouseup",
  dxpointercancel: "pointercancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
if (browser_default.safari) {
  eventMap.dxpointercancel += " dragstart";
}
var normalizeMouseEvent = function(e) {
  e.pointerId = 1;
  return {
    pointers: observer.pointers(),
    pointerId: 1
  };
};
var observer;
var activated = false;
var activateStrategy = function() {
  if (activated) {
    return;
  }
  observer = new m_observer_default(eventMap, (() => true));
  activated = true;
};
var MouseStrategy = m_base_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _fireEvent(args) {
    return this.callBase(extend(normalizeMouseEvent(args.originalEvent), args));
  }
});
MouseStrategy.map = eventMap;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function() {
  observer.reset();
};
var m_mouse_default = MouseStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_touch.js
var eventMap2 = {
  dxpointerdown: "touchstart",
  dxpointermove: "touchmove",
  dxpointerup: "touchend",
  dxpointercancel: "touchcancel",
  dxpointerover: "",
  dxpointerout: "",
  dxpointerenter: "",
  dxpointerleave: ""
};
var normalizeTouchEvent = function(e) {
  const pointers = [];
  each(e.touches, ((_, touch2) => {
    pointers.push(extend({
      pointerId: touch2.identifier
    }, touch2));
  }));
  return {
    pointers,
    pointerId: e.changedTouches[0].identifier
  };
};
var skipTouchWithSameIdentifier = function(pointerEvent) {
  return "ios" === m_devices_default.real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent);
};
var TouchStrategy = m_base_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    this._pointerId = 0;
  },
  _handler(e) {
    if (skipTouchWithSameIdentifier(this._eventName)) {
      const touch2 = e.changedTouches[0];
      if (this._pointerId === touch2.identifier && 0 !== this._pointerId) {
        return;
      }
      this._pointerId = touch2.identifier;
    }
    return this.callBase.apply(this, arguments);
  },
  _fireEvent(args) {
    return this.callBase(extend(normalizeTouchEvent(args.originalEvent), args));
  }
});
TouchStrategy.map = eventMap2;
TouchStrategy.normalize = normalizeTouchEvent;
var m_touch_default = TouchStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_mouse_and_touch.js
var eventMap3 = {
  dxpointerdown: "touchstart mousedown",
  dxpointermove: "touchmove mousemove",
  dxpointerup: "touchend mouseup",
  dxpointercancel: "touchcancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
var activated2 = false;
var activateStrategy2 = function() {
  if (activated2) {
    return;
  }
  m_mouse_default.activate();
  activated2 = true;
};
var MouseAndTouchStrategy = m_base_default.inherit({
  EVENT_LOCK_TIMEOUT: 100,
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy2();
  },
  _handler(e) {
    const isMouse = isMouseEvent(e);
    if (!isMouse) {
      this._skipNextEvents = true;
    }
    if (isMouse && this._mouseLocked) {
      return;
    }
    if (isMouse && this._skipNextEvents) {
      this._skipNextEvents = false;
      this._mouseLocked = true;
      clearTimeout(this._unlockMouseTimer);
      const that = this;
      this._unlockMouseTimer = setTimeout((() => {
        that._mouseLocked = false;
      }), this.EVENT_LOCK_TIMEOUT);
      return;
    }
    return this.callBase(e);
  },
  _fireEvent(args) {
    const normalizer = isMouseEvent(args.originalEvent) ? m_mouse_default.normalize : m_touch_default.normalize;
    return this.callBase(extend(normalizer(args.originalEvent), args));
  },
  dispose() {
    this.callBase();
    this._skipNextEvents = false;
    this._mouseLocked = false;
    clearTimeout(this._unlockMouseTimer);
  }
});
MouseAndTouchStrategy.map = eventMap3;
MouseAndTouchStrategy.resetObserver = m_mouse_default.resetObserver;
var m_mouse_and_touch_default = MouseAndTouchStrategy;

// node_modules/devextreme/esm/__internal/events/m_pointer.js
var getStrategy = (support, _ref) => {
  let {
    tablet,
    phone
  } = _ref;
  const pointerEventStrategy = getStrategyFromGlobalConfig();
  if (pointerEventStrategy) {
    return pointerEventStrategy;
  }
  if (support.touch && !(tablet || phone)) {
    return m_mouse_and_touch_default;
  }
  if (support.touch) {
    return m_touch_default;
  }
  return m_mouse_default;
};
var EventStrategy = getStrategy(m_support_default, m_devices_default.real());
each(EventStrategy.map, ((pointerEvent, originalEvents) => {
  m_event_registrator_default(pointerEvent, new EventStrategy(pointerEvent, originalEvents));
}));
var pointer = {
  down: "dxpointerdown",
  up: "dxpointerup",
  move: "dxpointermove",
  cancel: "dxpointercancel",
  enter: "dxpointerenter",
  leave: "dxpointerleave",
  over: "dxpointerover",
  out: "dxpointerout"
};
function getStrategyFromGlobalConfig() {
  const eventStrategyName = config_default().pointerEventStrategy;
  return {
    "mouse-and-touch": m_mouse_and_touch_default,
    touch: m_touch_default,
    mouse: m_mouse_default
  }[eventStrategyName];
}
var m_pointer_default = pointer;

// node_modules/devextreme/esm/__internal/events/core/m_emitter_registrator.js
var MANAGER_EVENT = "dxEventManager";
var EventManager = class_default.inherit({
  ctor() {
    this._attachHandlers();
    this.reset();
    this._proxiedCancelHandler = this._cancelHandler.bind(this);
    this._proxiedAcceptHandler = this._acceptHandler.bind(this);
  },
  _attachHandlers() {
    ready_callbacks_default.add((() => {
      const document2 = dom_adapter_default.getDocument();
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.down, MANAGER_EVENT), this._pointerDownHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.move, MANAGER_EVENT), this._pointerMoveHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2([m_pointer_default.up, m_pointer_default.cancel].join(" "), MANAGER_EVENT), this._pointerUpHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(EVENT_NAME, MANAGER_EVENT), this._mouseWheelHandler.bind(this));
    }));
  },
  _eachEmitter(callback) {
    const activeEmitters = this._activeEmitters || [];
    let i = 0;
    while (activeEmitters.length > i) {
      const emitter = activeEmitters[i];
      if (false === callback(emitter)) {
        break;
      }
      if (activeEmitters[i] === emitter) {
        i++;
      }
    }
  },
  _applyToEmitters(method, arg) {
    this._eachEmitter(((emitter) => {
      emitter[method].call(emitter, arg);
    }));
  },
  reset() {
    this._eachEmitter(this._proxiedCancelHandler);
    this._activeEmitters = [];
  },
  resetEmitter(emitter) {
    this._proxiedCancelHandler(emitter);
  },
  _pointerDownHandler(e) {
    if (isMouseEvent(e) && e.which > 1) {
      return;
    }
    this._updateEmitters(e);
  },
  _updateEmitters(e) {
    if (!this._isSetChanged(e)) {
      return;
    }
    this._cleanEmitters(e);
    this._fetchEmitters(e);
  },
  _isSetChanged(e) {
    const currentSet = this._closestEmitter(e);
    const previousSet = this._emittersSet || [];
    let setChanged = currentSet.length !== previousSet.length;
    each(currentSet, ((index2, emitter) => {
      setChanged = setChanged || previousSet[index2] !== emitter;
      return !setChanged;
    }));
    this._emittersSet = currentSet;
    return setChanged;
  },
  _closestEmitter(e) {
    const that = this;
    const result = [];
    let $element = renderer_default(e.target);
    function handleEmitter(_, emitter) {
      if (!!emitter && emitter.validatePointers(e) && emitter.validate(e)) {
        emitter.addCancelCallback(that._proxiedCancelHandler);
        emitter.addAcceptCallback(that._proxiedAcceptHandler);
        result.push(emitter);
      }
    }
    while ($element.length) {
      const emitters = data($element.get(0), "dxEmitter") || [];
      each(emitters, handleEmitter);
      $element = $element.parent();
    }
    return result;
  },
  _acceptHandler(acceptedEmitter, e) {
    this._eachEmitter(((emitter) => {
      if (emitter !== acceptedEmitter) {
        this._cancelEmitter(emitter, e);
      }
    }));
  },
  _cancelHandler(canceledEmitter, e) {
    this._cancelEmitter(canceledEmitter, e);
  },
  _cancelEmitter(emitter, e) {
    const activeEmitters = this._activeEmitters;
    if (e) {
      emitter.cancel(e);
    } else {
      emitter.reset();
    }
    emitter.removeCancelCallback();
    emitter.removeAcceptCallback();
    const emitterIndex = activeEmitters.indexOf(emitter);
    if (emitterIndex > -1) {
      activeEmitters.splice(emitterIndex, 1);
    }
  },
  _cleanEmitters(e) {
    this._applyToEmitters("end", e);
    this.reset(e);
  },
  _fetchEmitters(e) {
    this._activeEmitters = this._emittersSet.slice();
    this._applyToEmitters("start", e);
  },
  _pointerMoveHandler(e) {
    this._applyToEmitters("move", e);
  },
  _pointerUpHandler(e) {
    this._updateEmitters(e);
  },
  _mouseWheelHandler(e) {
    if (!this._allowInterruptionByMouseWheel()) {
      return;
    }
    e.pointers = [null];
    this._pointerDownHandler(e);
    this._adjustWheelEvent(e);
    this._pointerMoveHandler(e);
    e.pointers = [];
    this._pointerUpHandler(e);
  },
  _allowInterruptionByMouseWheel() {
    let allowInterruption = true;
    this._eachEmitter(((emitter) => {
      allowInterruption = emitter.allowInterruptionByMouseWheel() && allowInterruption;
      return allowInterruption;
    }));
    return allowInterruption;
  },
  _adjustWheelEvent(e) {
    let closestGestureEmitter = null;
    this._eachEmitter(((emitter) => {
      if (!emitter.gesture) {
        return;
      }
      const direction2 = emitter.getDirection(e);
      if ("horizontal" !== direction2 && !e.shiftKey || "vertical" !== direction2 && e.shiftKey) {
        closestGestureEmitter = emitter;
        return false;
      }
    }));
    if (!closestGestureEmitter) {
      return;
    }
    const direction = closestGestureEmitter.getDirection(e);
    const verticalGestureDirection = "both" === direction && !e.shiftKey || "vertical" === direction;
    const prop = verticalGestureDirection ? "pageY" : "pageX";
    e[prop] += e.delta;
  },
  isActive(element) {
    let result = false;
    this._eachEmitter(((emitter) => {
      result = result || emitter.getElement().is(element);
    }));
    return result;
  }
});
var eventManager = new EventManager();
var registerEmitter = function(emitterConfig) {
  const EmitterClass = emitterConfig.emitter;
  const emitterName = emitterConfig.events[0];
  const emitterEvents = emitterConfig.events;
  each(emitterEvents, ((_, eventName) => {
    m_event_registrator_default(eventName, {
      noBubble: !emitterConfig.bubble,
      setup(element) {
        const subscriptions = data(element, "dxEmitterSubscription") || {};
        const emitters = data(element, "dxEmitter") || {};
        const emitter = emitters[emitterName] || new EmitterClass(element);
        subscriptions[eventName] = true;
        emitters[emitterName] = emitter;
        data(element, "dxEmitter", emitters);
        data(element, "dxEmitterSubscription", subscriptions);
      },
      add(element, handleObj) {
        const emitters = data(element, "dxEmitter");
        const emitter = emitters[emitterName];
        emitter.configure(extend({
          delegateSelector: handleObj.selector
        }, handleObj.data), handleObj.type);
      },
      teardown(element) {
        const subscriptions = data(element, "dxEmitterSubscription");
        const emitters = data(element, "dxEmitter");
        const emitter = emitters[emitterName];
        delete subscriptions[eventName];
        let disposeEmitter = true;
        each(emitterEvents, ((_2, eventName2) => {
          disposeEmitter = disposeEmitter && !subscriptions[eventName2];
          return disposeEmitter;
        }));
        if (disposeEmitter) {
          if (eventManager.isActive(element)) {
            eventManager.resetEmitter(emitter);
          }
          emitter && emitter.dispose();
          delete emitters[emitterName];
        }
      }
    });
  }));
};
var m_emitter_registrator_default = registerEmitter;

// node_modules/devextreme/esm/__internal/events/utils/m_event_nodes_disposing.js
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(((node) => !!node));
}
var subscribeNodesDisposing = (event, callback) => {
  m_events_engine_default.one(nodesByEvent(event), removeEvent, callback);
};
var unsubscribeNodesDisposing = (event, callback) => {
  m_events_engine_default.off(nodesByEvent(event), removeEvent, callback);
};

// node_modules/devextreme/esm/__internal/events/m_click.js
var CLICK_EVENT_NAME = "dxclick";
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = () => {
  lastFiredEvent = null;
};
var clickHandler = function(e) {
  const {
    originalEvent
  } = e;
  const eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
  const leftButton = !e.which || 1 === e.which;
  if (leftButton && !prevented && !eventAlreadyFired) {
    if (originalEvent) {
      originalEvent.DXCLICK_FIRED = true;
    }
    unsubscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    lastFiredEvent = originalEvent;
    subscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    fireEvent({
      type: "dxclick",
      originalEvent: e
    });
  }
};
var ClickEmitter = m_emitter_default.inherit({
  ctor(element) {
    this.callBase(element);
    m_events_engine_default.on(this.getElement(), "click", clickHandler);
  },
  start() {
    prevented = null;
  },
  cancel() {
    prevented = true;
  },
  dispose() {
    m_events_engine_default.off(this.getElement(), "click", clickHandler);
  }
});
!(function() {
  const desktopDevice = m_devices_default.real().generic;
  if (!desktopDevice) {
    let startTarget = null;
    let blurPrevented = false;
    const isInput = function(element) {
      return renderer_default(element).is("input, textarea, select, button ,:focus, :focus *");
    };
    const pointerDownHandler = function(e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    };
    const getTarget = function(e) {
      const target = getEventTarget(e);
      return renderer_default(target);
    };
    const clickHandler2 = function(e) {
      const $target = getTarget(e);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !renderer_default(startTarget).is("label") && isInput($target)) {
        m_dom_default.resetActiveElement();
      }
      startTarget = null;
      blurPrevented = false;
    };
    const NATIVE_CLICK_FIXER_NAMESPACE = "NATIVE_CLICK_FIXER";
    const document2 = dom_adapter_default.getDocument();
    m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
    m_events_engine_default.subscribeGlobal(document2, addNamespace2("click", NATIVE_CLICK_FIXER_NAMESPACE), clickHandler2);
  }
})();
m_emitter_registrator_default({
  emitter: ClickEmitter,
  bubble: true,
  events: ["dxclick"]
});

// node_modules/devextreme/esm/__internal/core/m_component_registrator_callbacks.js
var componentRegistratorCallbacks = new memorized_callbacks_default();

// node_modules/devextreme/esm/core/component_registrator_callbacks.js
var component_registrator_callbacks_default = componentRegistratorCallbacks;

// node_modules/devextreme/esm/__internal/core/m_component_registrator.js
var registerComponent = function(name, namespace, componentClass) {
  if (!componentClass) {
    componentClass = namespace;
  } else {
    namespace[name] = componentClass;
  }
  getName(componentClass, name);
  component_registrator_callbacks_default.fire(name, componentClass);
};
var registerRendererComponent = function(name, componentClass) {
  renderer_default.fn[name] = function(options) {
    const isMemberInvoke = "string" === typeof options;
    let result;
    if (isMemberInvoke) {
      const memberName = options;
      const memberArgs = [].slice.call(arguments).slice(1);
      this.each((function() {
        const instance = componentClass.getInstance(this);
        if (!instance) {
          throw errors_default.Error("E0009", name);
        }
        const member = instance[memberName];
        const memberValue = member.apply(instance, memberArgs);
        if (void 0 === result) {
          result = memberValue;
        }
      }));
    } else {
      this.each((function() {
        const instance = componentClass.getInstance(this);
        if (instance) {
          instance.option(options);
        } else {
          new componentClass(this, options);
        }
      }));
      result = this;
    }
    return result;
  };
};
component_registrator_callbacks_default.add(registerRendererComponent);

// node_modules/devextreme/esm/core/component_registrator.js
var component_registrator_default = registerComponent;

// node_modules/devextreme/esm/__internal/events/m_visibility_change.js
var triggerVisibilityChangeEvent = function(eventName) {
  return function(element) {
    const $element = renderer_default(element || "body");
    const changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
    for (let i = 0; i < changeHandlers.length; i++) {
      m_events_engine_default.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
var triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
var triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
var triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");
var m_visibility_change_default = {
  triggerHidingEvent,
  triggerResizeEvent,
  triggerShownEvent
};

// node_modules/devextreme/esm/common/core/events/visibility_change.js
var triggerShownEvent2 = m_visibility_change_default.triggerShownEvent;
var triggerHidingEvent2 = m_visibility_change_default.triggerHidingEvent;
var triggerResizeEvent2 = m_visibility_change_default.triggerResizeEvent;

// node_modules/devextreme/esm/__internal/core/templates/m_template_base.js
var renderedCallbacks = callbacks_default({
  syncStrategy: true
});
var TemplateBase = class {
  render(options) {
    options = options || {};
    const {
      onRendered
    } = options;
    delete options.onRendered;
    let $result;
    if (options.renovated && options.transclude && this._element) {
      $result = renderer_default("<div>").append(this._element).contents();
    } else {
      $result = this._renderCore(options);
    }
    this._ensureResultInContainer($result, options.container);
    renderedCallbacks.fire($result, options.container);
    onRendered && onRendered();
    return $result;
  }
  _ensureResultInContainer($result, container) {
    if (!container) {
      return;
    }
    const $container = renderer_default(container);
    const resultInContainer = contains($container.get(0), $result.get(0));
    $container.append($result);
    if (resultInContainer) {
      return;
    }
    const resultInBody = contains(dom_adapter_default.getBody(), $container.get(0));
    if (!resultInBody) {
      return;
    }
    triggerShownEvent2($result);
  }
  _renderCore() {
    throw errors_default.Error("E0001");
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_empty_template.js
var EmptyTemplate = class extends TemplateBase {
  _renderCore() {
    return renderer_default();
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_function_template.js
var FunctionTemplate = class extends TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  _renderCore(options) {
    return normalizeTemplateElement(this._render(options));
  }
};

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// node_modules/devextreme/esm/__internal/core/templates/m_child_default_template.js
var ChildDefaultTemplate = class extends TemplateBase {
  constructor(name) {
    super();
    this.name = name;
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_array.js
function createOccurrenceMap(array) {
  return array.reduce(((map2, value) => {
    const count = (map2.get(value) ?? 0) + 1;
    map2.set(value, count);
    return map2;
  }), /* @__PURE__ */ new Map());
}
var wrapToArray = function(item) {
  return Array.isArray(item) ? item : [item];
};
var getUniqueValues = function(values) {
  return [...new Set(values)];
};
var getIntersection = function(firstArray, secondArray) {
  const toRemoveMap = createOccurrenceMap(secondArray);
  return firstArray.filter(((value) => {
    const occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return occurrencesCount;
  }));
};
var removeDuplicates = function() {
  let from = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  let toRemove = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
  const toRemoveMap = createOccurrenceMap(toRemove);
  return from.filter(((value) => {
    const occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return !occurrencesCount;
  }));
};
var normalizeIndexes = function(items, indexPropName, currentItem, needIndexCallback) {
  const indexedItems = {};
  const {
    useLegacyVisibleIndex
  } = config_default();
  let currentIndex = 0;
  const shouldUpdateIndex = (item) => !isDefined(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
  items.forEach(((item) => {
    const index2 = item[indexPropName];
    if (index2 >= 0) {
      indexedItems[index2] = indexedItems[index2] || [];
      if (item === currentItem) {
        indexedItems[index2].unshift(item);
      } else {
        indexedItems[index2].push(item);
      }
    } else {
      item[indexPropName] = void 0;
    }
  }));
  if (!useLegacyVisibleIndex) {
    items.forEach(((item) => {
      if (shouldUpdateIndex(item)) {
        while (indexedItems[currentIndex]) {
          currentIndex++;
        }
        indexedItems[currentIndex] = [item];
        currentIndex++;
      }
    }));
  }
  currentIndex = 0;
  orderEach(indexedItems, (function(index2, items2) {
    items2.forEach(((item) => {
      if (index2 >= 0) {
        item[indexPropName] = currentIndex++;
      }
    }));
  }));
  if (useLegacyVisibleIndex) {
    items.forEach(((item) => {
      if (shouldUpdateIndex(item)) {
        item[indexPropName] = currentIndex++;
      }
    }));
  }
};
var groupBy = (array, getGroupName) => array.reduce(((groupedResult, item) => {
  const groupName = getGroupName(item);
  groupedResult[groupName] = groupedResult[groupName] ?? [];
  groupedResult[groupName].push(item);
  return groupedResult;
}), {});

// node_modules/devextreme/esm/__internal/events/core/m_emitter.feedback.js
var ACTIVE_EVENT_NAME = "dxactive";
var FeedbackEvent = class_default.inherit({
  ctor(timeout, fire) {
    this._timeout = timeout;
    this._fire = fire;
  },
  start() {
    const that = this;
    this._schedule((() => {
      that.force();
    }));
  },
  _schedule(fn) {
    this.stop();
    this._timer = setTimeout(fn, this._timeout);
  },
  stop() {
    clearTimeout(this._timer);
  },
  force() {
    if (this._fired) {
      return;
    }
    this.stop();
    this._fire();
    this._fired = true;
  },
  fired() {
    return this._fired;
  }
});
var activeFeedback;
var FeedbackEmitter = m_emitter_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    this._active = new FeedbackEvent(0, noop);
    this._inactive = new FeedbackEvent(0, noop);
  },
  configure(data2, eventName) {
    switch (eventName) {
      case "dxactive":
        data2.activeTimeout = data2.timeout;
        break;
      case "dxinactive":
        data2.inactiveTimeout = data2.timeout;
    }
    this.callBase(data2);
  },
  start(e) {
    if (activeFeedback) {
      const activeChildExists = contains(this.getElement().get(0), activeFeedback.getElement().get(0));
      const childJustActivated = !activeFeedback._active.fired();
      if (activeChildExists && childJustActivated) {
        this._cancel();
        return;
      }
      activeFeedback._inactive.force();
    }
    activeFeedback = this;
    this._initEvents(e);
    this._active.start();
  },
  _initEvents(e) {
    const that = this;
    const eventTarget = this._getEmitterTarget(e);
    const mouseEvent = isMouseEvent(e);
    const isSimulator = m_devices_default.isSimulator();
    const deferFeedback = isSimulator || !mouseEvent;
    const activeTimeout = ensureDefined(this.activeTimeout, 30);
    const inactiveTimeout = ensureDefined(this.inactiveTimeout, 400);
    this._active = new FeedbackEvent(deferFeedback ? activeTimeout : 0, (() => {
      that._fireEvent("dxactive", e, {
        target: eventTarget
      });
    }));
    this._inactive = new FeedbackEvent(deferFeedback ? inactiveTimeout : 0, (() => {
      that._fireEvent("dxinactive", e, {
        target: eventTarget
      });
      activeFeedback = null;
    }));
  },
  cancel(e) {
    this.end(e);
  },
  end(e) {
    const skipTimers = e.type !== m_pointer_default.up;
    if (skipTimers) {
      this._active.stop();
    } else {
      this._active.force();
    }
    this._inactive.start();
    if (skipTimers) {
      this._inactive.force();
    }
  },
  dispose() {
    this._active.stop();
    this._inactive.stop();
    if (activeFeedback === this) {
      activeFeedback = null;
    }
    this.callBase();
  },
  lockInactive() {
    this._active.force();
    this._inactive.stop();
    activeFeedback = null;
    this._cancel();
    return this._inactive.force.bind(this._inactive);
  }
});
FeedbackEmitter.lock = function(deferred) {
  const lockInactive = activeFeedback ? activeFeedback.lockInactive() : noop;
  deferred.done(lockInactive);
};
m_emitter_registrator_default({
  emitter: FeedbackEmitter,
  events: ["dxactive", "dxinactive"]
});
var {
  lock
} = FeedbackEmitter;

// node_modules/devextreme/esm/__internal/events/m_hover.js
var HOVERSTART = "dxhoverstart";
var POINTERENTER_NAMESPACED_EVENT_NAME = addNamespace2(m_pointer_default.enter, "dxHoverStart");
var HOVEREND = "dxhoverend";
var POINTERLEAVE_NAMESPACED_EVENT_NAME = addNamespace2(m_pointer_default.leave, "dxHoverEnd");
var Hover = class_default.inherit({
  noBubble: true,
  ctor() {
    this._handlerArrayKeyPath = `${this._eventNamespace}_HandlerStore`;
  },
  setup(element) {
    data(element, this._handlerArrayKeyPath, {});
  },
  add(element, handleObj) {
    const that = this;
    const handler = function(e) {
      that._handler(e);
    };
    m_events_engine_default.on(element, this._originalEventName, handleObj.selector, handler);
    data(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
  },
  _handler(e) {
    if (isTouchEvent(e) || m_devices_default.isSimulator()) {
      return;
    }
    fireEvent({
      type: this._eventName,
      originalEvent: e,
      delegateTarget: e.delegateTarget
    });
  },
  remove(element, handleObj) {
    const handler = data(element, this._handlerArrayKeyPath)[handleObj.guid];
    m_events_engine_default.off(element, this._originalEventName, handleObj.selector, handler);
  },
  teardown(element) {
    removeData(element, this._handlerArrayKeyPath);
  }
});
var HoverStart = Hover.inherit({
  ctor() {
    this._eventNamespace = "dxHoverStart";
    this._eventName = HOVERSTART;
    this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
    this.callBase();
  },
  _handler(e) {
    const pointers = e.pointers || [];
    if (!pointers.length) {
      this.callBase(e);
    }
  }
});
var HoverEnd = Hover.inherit({
  ctor() {
    this._eventNamespace = "dxHoverEnd";
    this._eventName = HOVEREND;
    this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
    this.callBase();
  }
});
m_event_registrator_default(HOVERSTART, new HoverStart());
m_event_registrator_default(HOVEREND, new HoverEnd());

// node_modules/devextreme/esm/__internal/events/core/m_keyboard_processor.js
var NAMESPACE = "KeyboardProcessor";
var createKeyDownOptions = (e) => ({
  keyName: normalizeKeyName(e),
  key: e.key,
  code: e.code,
  ctrl: e.ctrlKey,
  location: e.location,
  metaKey: e.metaKey,
  shift: e.shiftKey,
  alt: e.altKey,
  which: e.which,
  originalEvent: e
});
var KeyboardProcessor = class_default.inherit({
  _keydown: addNamespace2("keydown", NAMESPACE),
  _compositionStart: addNamespace2("compositionstart", NAMESPACE),
  _compositionEnd: addNamespace2("compositionend", NAMESPACE),
  ctor(options) {
    options = options || {};
    if (options.element) {
      this._element = renderer_default(options.element);
    }
    if (options.focusTarget) {
      this._focusTarget = options.focusTarget;
    }
    this._handler = options.handler;
    if (this._element) {
      this._processFunction = (e) => {
        const focusTargets = renderer_default(this._focusTarget).toArray();
        const isNotFocusTarget = this._focusTarget && this._focusTarget !== e.target && !focusTargets.includes(e.target);
        const shouldSkipProcessing = this._isComposingJustFinished && 229 === e.which || this._isComposing || isNotFocusTarget;
        this._isComposingJustFinished = false;
        if (!shouldSkipProcessing) {
          this.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      m_events_engine_default.on(this._element, this._keydown, this._processFunction);
      m_events_engine_default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      m_events_engine_default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose() {
    if (this._element) {
      m_events_engine_default.off(this._element, this._keydown, this._processFunction);
      m_events_engine_default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      m_events_engine_default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = void 0;
    this._handler = void 0;
  },
  process(e) {
    this._handler(createKeyDownOptions(e));
  },
  toggleProcessing(_ref) {
    let {
      type: type2
    } = _ref;
    this._isComposing = "compositionstart" === type2;
    this._isComposingJustFinished = !this._isComposing;
  }
});
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
var m_keyboard_processor_default = KeyboardProcessor;

// node_modules/devextreme/esm/__internal/events/m_short.js
function addNamespace3(event, namespace) {
  return namespace ? addNamespace2(event, namespace) : event;
}
function executeAction(action, args) {
  return "function" === typeof action ? action(args) : action.execute(args);
}
var active = {
  on: ($el, active2, inactive, opts) => {
    const {
      selector,
      showTimeout,
      hideTimeout,
      namespace
    } = opts;
    m_events_engine_default.on($el, addNamespace3("dxactive", namespace), selector, {
      timeout: showTimeout
    }, ((event) => executeAction(active2, {
      event,
      element: event.currentTarget
    })));
    m_events_engine_default.on($el, addNamespace3("dxinactive", namespace), selector, {
      timeout: hideTimeout
    }, ((event) => executeAction(inactive, {
      event,
      element: event.currentTarget
    })));
  },
  off: ($el, _ref) => {
    let {
      namespace,
      selector
    } = _ref;
    m_events_engine_default.off($el, addNamespace3("dxactive", namespace), selector);
    m_events_engine_default.off($el, addNamespace3("dxinactive", namespace), selector);
  }
};
var resize = {
  on: function($el, resize2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("dxresize", namespace), resize2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("dxresize", namespace));
  }
};
var hover = {
  on: ($el, start, end, _ref2) => {
    let {
      selector,
      namespace
    } = _ref2;
    m_events_engine_default.on($el, addNamespace3("dxhoverend", namespace), selector, ((event) => end(event)));
    m_events_engine_default.on($el, addNamespace3("dxhoverstart", namespace), selector, ((event) => executeAction(start, {
      element: event.target,
      event
    })));
  },
  off: ($el, _ref3) => {
    let {
      selector,
      namespace
    } = _ref3;
    m_events_engine_default.off($el, addNamespace3("dxhoverstart", namespace), selector);
    m_events_engine_default.off($el, addNamespace3("dxhoverend", namespace), selector);
  }
};
var visibility = {
  on: ($el, shown, hiding, _ref4) => {
    let {
      namespace
    } = _ref4;
    m_events_engine_default.on($el, addNamespace3("dxhiding", namespace), hiding);
    m_events_engine_default.on($el, addNamespace3("dxshown", namespace), shown);
  },
  off: ($el, _ref5) => {
    let {
      namespace
    } = _ref5;
    m_events_engine_default.off($el, addNamespace3("dxhiding", namespace));
    m_events_engine_default.off($el, addNamespace3("dxshown", namespace));
  }
};
var focus = {
  on: ($el, focusIn, focusOut, _ref6) => {
    let {
      namespace
    } = _ref6;
    m_events_engine_default.on($el, addNamespace3("focusin", namespace), focusIn);
    m_events_engine_default.on($el, addNamespace3("focusout", namespace), focusOut);
  },
  off: ($el, _ref7) => {
    let {
      namespace
    } = _ref7;
    m_events_engine_default.off($el, addNamespace3("focusin", namespace));
    m_events_engine_default.off($el, addNamespace3("focusout", namespace));
  },
  trigger: ($el) => m_events_engine_default.trigger($el, "focus")
};
var dxClick = {
  on: function($el, click2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("dxclick", namespace), click2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("dxclick", namespace));
  }
};
var click = {
  on: function($el, click2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("click", namespace), click2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("click", namespace));
  }
};
var index = 0;
var keyboardProcessors = {};
var generateListenerId = () => "keyboardProcessorId" + index++;
var keyboard = {
  on: (element, focusTarget, handler) => {
    const listenerId = generateListenerId();
    keyboardProcessors[listenerId] = new m_keyboard_processor_default({
      element,
      focusTarget,
      handler
    });
    return listenerId;
  },
  off: (listenerId) => {
    if (listenerId && keyboardProcessors[listenerId]) {
      keyboardProcessors[listenerId].dispose();
      delete keyboardProcessors[listenerId];
    }
  },
  _getProcessor: (listenerId) => keyboardProcessors[listenerId]
};

// node_modules/devextreme/esm/__internal/utils/version.js
function stringifyVersion(version) {
  const {
    major,
    minor,
    patch
  } = version;
  return [major, minor, patch].join(".");
}
function parseVersion(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return {
    major,
    minor,
    patch
  };
}
function getAssertedVersions() {
  var _config;
  return (null === (_config = config_default()) || void 0 === _config ? void 0 : _config.versionAssertions) ?? [];
}
function stringifyVersionList(assertedVersionList) {
  return assertedVersionList.map(((assertedVersion) => `${assertedVersion.packageName}: ${assertedVersion.version}`)).join("\n");
}
function versionsEqual(versionA, versionB) {
  return versionA.major === versionB.major && versionA.minor === versionB.minor && versionA.patch === versionB.patch;
}
function getPreviousMajorVersion(_ref) {
  let {
    major,
    minor,
    patch
  } = _ref;
  const previousMajorVersion = 1 === minor ? {
    major: major - 1,
    minor: 2,
    patch
  } : {
    major,
    minor: minor - 1,
    patch
  };
  return previousMajorVersion;
}
function assertedVersionsCompatible(currentVersion) {
  const mismatchingVersions = getAssertedVersions().filter(((assertedVersion) => !versionsEqual(parseVersion(assertedVersion.version), currentVersion)));
  if (mismatchingVersions.length) {
    errors_default.log("W0023", stringifyVersionList([{
      packageName: "devextreme",
      version: stringifyVersion(currentVersion)
    }, ...mismatchingVersions]));
    return false;
  }
  return true;
}

// node_modules/devextreme/esm/__internal/core/license/byte_utils.js
function base64ToBytes(base64) {
  return new Uint8Array(atob(base64).split("").map(((s) => s.charCodeAt(0))));
}
function hexToBytes(string) {
  var _string$match;
  return new Uint8Array((null === (_string$match = string.match(/.{1,2}/g)) || void 0 === _string$match ? void 0 : _string$match.map(((byte) => parseInt(byte, 16)))) ?? []);
}
function stringToBytes(string) {
  const bytes = new Uint8Array(string.length);
  for (let k = 0; k < string.length; k += 1) {
    bytes[k] = 255 & string.charCodeAt(k);
  }
  return bytes;
}
function wordsToBytes(words) {
  const bytes = new Uint8Array(4 * words.length);
  for (let k = 0; k < bytes.length; k += 1) {
    bytes[k] = words[k >> 2] >>> 8 * (3 - k % 4);
  }
  return bytes;
}
function bytesToWords(bytes) {
  const words = new Uint32Array(1 + (bytes.length - 1 >> 2));
  for (let k = 0; k < bytes.length; k += 1) {
    words[k >> 2] |= bytes[k] << 8 * (3 - k % 4);
  }
  return words;
}
function leftRotate(x, n) {
  return (x << n | x >>> 32 - n) >>> 0;
}
function concatBytes(a, b) {
  const result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}

// node_modules/devextreme/esm/__internal/core/license/key.js
var PUBLIC_KEY = {
  e: 65537,
  n: new Uint8Array([200, 219, 153, 203, 140, 7, 228, 253, 193, 243, 62, 137, 139, 60, 68, 242, 48, 142, 113, 88, 185, 235, 253, 105, 80, 74, 32, 170, 96, 74, 111, 250, 7, 205, 154, 3, 146, 115, 153, 53, 45, 132, 123, 56, 61, 208, 184, 201, 63, 24, 109, 223, 0, 179, 169, 102, 139, 224, 73, 233, 45, 173, 138, 66, 98, 88, 69, 76, 177, 111, 113, 218, 192, 33, 101, 152, 25, 134, 34, 173, 32, 82, 230, 44, 247, 200, 253, 170, 192, 246, 30, 12, 96, 205, 100, 249, 181, 93, 0, 231])
};
var INTERNAL_USAGE_ID = "j7WzkNQbTjVT6XCcXD8bhM";

// node_modules/devextreme/esm/__internal/core/license/pkcs1.js
var ASN1_SHA1 = "3021300906052b0e03021a05000414";
function pad(hash) {
  const dataLength = (8 * PUBLIC_KEY.n.length + 6) / 8;
  const data2 = concatBytes(hexToBytes(ASN1_SHA1), hash);
  if (data2.length + 10 > dataLength) {
    throw Error("Key is too short for SHA1 signing algorithm");
  }
  const padding = new Uint8Array(dataLength - data2.length);
  padding.fill(255, 0, padding.length - 1);
  padding[0] = 0;
  padding[1] = 1;
  padding[padding.length - 1] = 0;
  return concatBytes(padding, data2);
}

// node_modules/devextreme/esm/__internal/core/license/rsa_bigint.js
function compareSignatures(args) {
  try {
    const zero = BigInt(0);
    const one = BigInt(1);
    const eight = BigInt(8);
    const modExp = (base, exponent2, modulus2) => {
      let result = one;
      let b = base;
      let e = exponent2;
      while (e) {
        if (e & one) {
          result = result * b % modulus2;
        }
        b = b * b % modulus2;
        e >>= one;
      }
      return result;
    };
    const bigIntFromBytes = (bytes) => bytes.reduce(((acc, cur) => (acc << eight) + BigInt(cur)), zero);
    const actual = bigIntFromBytes(args.actual);
    const signature = bigIntFromBytes(args.signature);
    const exponent = BigInt(args.key.e);
    const modulus = bigIntFromBytes(args.key.n);
    const expected = modExp(signature, exponent, modulus);
    return expected === actual;
  } catch {
    return true;
  }
}

// node_modules/devextreme/esm/__internal/core/license/sha1.js
function preprocess(text) {
  const bytes = new Uint8Array(text.length + 1);
  bytes.set(stringToBytes(text));
  bytes[bytes.length - 1] = 128;
  const words = bytesToWords(new Uint8Array(bytes));
  const result = new Uint32Array(16 * Math.ceil((words.length + 2) / 16));
  result.set(words, 0);
  result[result.length - 1] = 8 * (bytes.length - 1);
  return result;
}
function sha1(text) {
  const message = preprocess(text);
  const h = new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  for (let i = 0; i < message.length; i += 16) {
    const w = new Uint32Array(80);
    for (let j = 0; j < 16; j += 1) {
      w[j] = message[i + j];
    }
    for (let j = 16; j < 80; j += 1) {
      const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
      w[j] = n << 1 | n >>> 31;
    }
    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    for (let j = 0; j < 80; j += 1) {
      const [f, k] = j < 20 ? [b & c | ~b & d, 1518500249] : j < 40 ? [b ^ c ^ d, 1859775393] : j < 60 ? [b & c | b & d | c & d, 2400959708] : [b ^ c ^ d, 3395469782];
      const temp = leftRotate(a, 5) + f + e + k + w[j];
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
  }
  return wordsToBytes(h);
}

// node_modules/devextreme/esm/__internal/core/license/trial_panel.client.js
var isClient = () => "undefined" !== typeof HTMLElement && "undefined" !== typeof customElements;
var SafeHTMLElement = isClient() ? HTMLElement : class {
};
var componentNames2 = {
  trigger: "dx-license-trigger",
  panel: "dx-license"
};
var attributeNames = {
  buyNow: "buy-now",
  licensingDoc: "licensing-doc",
  version: "version",
  subscriptions: "subscriptions"
};
var commonStyles = {
  opacity: "1",
  visibility: "visible",
  "clip-path": "none",
  filter: "none"
};
var contentStyles = _extends({}, commonStyles, {
  width: "100%",
  height: "auto",
  "line-height": "normal",
  display: "block",
  "z-index": "1500",
  position: "static",
  transform: "translate(0px, 0px)",
  "background-color": "#FF7200",
  border: "none",
  margin: "auto",
  "box-sizing": "border-box",
  "text-align": "center"
});
var containerStyles = _extends({}, contentStyles, {
  display: "flex",
  "align-items": "center",
  "flex-direction": "row",
  position: "relative",
  top: "0px",
  left: "0px",
  padding: "0.5rem"
});
var buttonStyles = {
  width: "1rem",
  cursor: "pointer",
  height: "1rem"
};
var textStyles = _extends({}, commonStyles, {
  display: "inline",
  position: "static",
  padding: "0px",
  margin: "0px",
  color: "white",
  "font-family": "'Segoe UI','Open Sans Condensed',-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif",
  "font-size": "0.875rem",
  "font-wight": "600"
});
function createImportantStyles(defaultStyles, customStyles) {
  const styles = customStyles ? _extends({}, defaultStyles, customStyles) : defaultStyles;
  return Object.keys(styles).reduce(((cssString, currentKey) => `${cssString}${[currentKey, `${styles[currentKey]} !important;`].join(": ")}`), "");
}
var DxLicense = class _DxLicense extends SafeHTMLElement {
  constructor() {
    var _DxLicense$customStyl, _DxLicense$customStyl2, _DxLicense$customStyl3, _DxLicense$customStyl4, _DxLicense$customStyl5;
    super();
    this._observer = null;
    this._inReassign = false;
    this._spanStyles = createImportantStyles(textStyles, null === (_DxLicense$customStyl = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl ? void 0 : _DxLicense$customStyl.textStyles);
    this._linkStyles = createImportantStyles(textStyles, null === (_DxLicense$customStyl2 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl2 ? void 0 : _DxLicense$customStyl2.linkStyles);
    this._containerStyles = createImportantStyles(containerStyles, null === (_DxLicense$customStyl3 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl3 ? void 0 : _DxLicense$customStyl3.containerStyles);
    this._contentStyles = createImportantStyles(contentStyles, null === (_DxLicense$customStyl4 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl4 ? void 0 : _DxLicense$customStyl4.contentStyles);
    this._buttonStyles = createImportantStyles(buttonStyles, null === (_DxLicense$customStyl5 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl5 ? void 0 : _DxLicense$customStyl5.contentStyles);
  }
  _getSubscriptionsArray(subscriptions) {
    return (null === subscriptions || void 0 === subscriptions ? void 0 : subscriptions.split(",").map(((x) => x.trim()))) ?? [];
  }
  updateSubscriptions(newSubscriptions) {
    if (!this._subscriptionsSpan || !newSubscriptions) {
      return;
    }
    const currentSubscriptionsStr = this.getAttribute(attributeNames.subscriptions);
    const currentSubscriptions = this._getSubscriptionsArray(currentSubscriptionsStr);
    if (!currentSubscriptions.length) {
      this._updateSubscriptionsText(newSubscriptions);
      return;
    }
    const newSubscriptionsArray = this._getSubscriptionsArray(newSubscriptions);
    const mergedSubscriptions = [];
    newSubscriptionsArray.forEach(((subscription) => {
      if (currentSubscriptions.some(((x) => x === subscription))) {
        mergedSubscriptions.push(subscription);
      }
    }));
    this._updateSubscriptionsText(0 !== mergedSubscriptions.length ? mergedSubscriptions.join(", ") : [...currentSubscriptions, ...newSubscriptionsArray].join(", "));
  }
  _updateSubscriptionsText(subscriptions) {
    if (subscriptions && this._subscriptionsSpan) {
      this.setAttribute(attributeNames.subscriptions, subscriptions);
      this._subscriptionsSpan.innerText = ` Included in Subscriptions: ${subscriptions}`;
    }
  }
  _createSubscriptionsSpan() {
    this._subscriptionsSpan = this._createSpan("");
    this._updateSubscriptionsText(this.getAttribute(attributeNames.subscriptions));
    return this._subscriptionsSpan;
  }
  _createSpan(text) {
    const span = document.createElement("span");
    span.innerText = text;
    span.style.cssText = this._spanStyles;
    return span;
  }
  _createLink(text, href) {
    const link = document.createElement("a");
    link.innerText = text;
    link.style.cssText = this._linkStyles;
    link.href = href;
    link.target = "_blank";
    return link;
  }
  _createButton() {
    const button = document.createElement("div");
    button.style.cssText = this._buttonStyles;
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    polygon.setAttribute("points", "13.4 12.7 8.7 8 13.4 3.4 12.6 2.6 8 7.3 3.4 2.6 2.6 3.4 7.3 8 2.6 12.6 3.4 13.4 8 8.7 12.7 13.4 13.4 12.7");
    polygon.style.cssText = createImportantStyles({
      fill: "#fff",
      opacity: ".5",
      "stroke-width": "0px"
    });
    svg.setAttribute("id", "Layer_1");
    svg.setAttribute("data-name", "Layer 1");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.style.cssText = createImportantStyles({
      "vertical-align": "baseline"
    });
    svg.appendChild(polygon);
    button.appendChild(svg);
    button.onclick = () => {
      _DxLicense.closed = true;
      this.style.cssText = createImportantStyles({
        display: "none"
      });
    };
    return button;
  }
  _createContentContainer() {
    const contentContainer = document.createElement("div");
    contentContainer.style.cssText = this._contentStyles;
    contentContainer.append(this._createSpan("For evaluation purposes only. Redistribution prohibited. Please "), this._createLink("register", this.getAttribute(attributeNames.licensingDoc)), this._createSpan(" an existing license or "), this._createLink("purchase a new license", this.getAttribute(attributeNames.buyNow)), this._createSpan(` to continue use of DevExpress product libraries (v${this.getAttribute(attributeNames.version)}).`), this._createSubscriptionsSpan());
    return contentContainer;
  }
  _reassignComponent() {
    this.innerHTML = "";
    this.style.cssText = this._containerStyles;
    this.append(this._createContentContainer(), this._createButton());
  }
  connectedCallback() {
    this._reassignComponent();
    if (!this._observer) {
      this._observer = new MutationObserver((() => {
        if (_DxLicense.closed) {
          var _this$_observer;
          null === (_this$_observer = this._observer) || void 0 === _this$_observer || _this$_observer.disconnect();
          return;
        }
        if (this._inReassign) {
          this._inReassign = false;
        } else {
          this._inReassign = true;
          this._reassignComponent();
        }
      }));
      this._observer.observe(this, {
        childList: true,
        attributes: true,
        subtree: true
      });
    }
  }
  disconnectedCallback() {
    if (_DxLicense.closed) {
      return;
    }
    Promise.resolve().then((() => {
      if (!document) {
        return;
      }
      const licensePanel = document.getElementsByTagName(componentNames2.panel);
      if (!licensePanel.length) {
        document.body.prepend(this);
      }
    }));
  }
};
DxLicense.customStyles = void 0;
DxLicense.closed = false;
var DxLicenseTrigger = class extends SafeHTMLElement {
  connectedCallback() {
    this.style.cssText = createImportantStyles({
      display: "none"
    });
    const licensePanel = document.getElementsByTagName(componentNames2.panel);
    if (DxLicense.closed) {
      return;
    }
    if (!licensePanel.length) {
      const license = document.createElement(componentNames2.panel);
      Object.values(attributeNames).forEach(((attrName) => {
        license.setAttribute(attrName, this.getAttribute(attrName));
      }));
      license.setAttribute("data-permanent", "");
      document.body.prepend(license);
    } else {
      const subscriptions = this.getAttribute(attributeNames.subscriptions);
      licensePanel[0].updateSubscriptions(subscriptions);
    }
  }
};
function registerCustomComponents(customStyles) {
  if (!customElements.get(componentNames2.trigger)) {
    DxLicense.customStyles = customStyles;
    customElements.define(componentNames2.panel, DxLicense);
    customElements.define(componentNames2.trigger, DxLicenseTrigger);
  }
}
function renderTrialPanel(buyNowUrl, licensingDocUrl, version) {
  let subscriptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
  let customStyles = arguments.length > 4 ? arguments[4] : void 0;
  registerCustomComponents(customStyles);
  const trialPanelTrigger = document.createElement(componentNames2.trigger);
  trialPanelTrigger.setAttribute(attributeNames.buyNow, buyNowUrl);
  trialPanelTrigger.setAttribute(attributeNames.licensingDoc, licensingDocUrl);
  trialPanelTrigger.setAttribute(attributeNames.version, version);
  trialPanelTrigger.setAttribute(attributeNames.subscriptions, subscriptions);
  document.body.appendChild(trialPanelTrigger);
}

// node_modules/devextreme/esm/__internal/core/license/trial_panel.js
function showTrialPanel(buyNowUrl, licensingDocUrl, version, subscriptions, customStyles) {
  if (isClient()) {
    renderTrialPanel(buyNowUrl, licensingDocUrl, version, subscriptions, customStyles);
  }
}

// node_modules/devextreme/esm/__internal/core/license/types.js
var TokenKind;
!(function(TokenKind2) {
  TokenKind2.corrupted = "corrupted";
  TokenKind2.verified = "verified";
  TokenKind2.internal = "internal";
})(TokenKind || (TokenKind = {}));

// node_modules/devextreme/esm/__internal/core/license/license_validation.js
var _excluded = ["customerId", "maxVersionAllowed", "format", "internalUsageId"];
var BUY_NOW_LINK = "https://go.devexpress.com/Licensing_Installer_Watermark_DevExtremeJQuery.aspx";
var LICENSING_DOC_LINK = "https://go.devexpress.com/Licensing_Documentation_DevExtremeJQuery.aspx";
var SUBSCRIPTION_NAMES = "Universal, DXperience, ASP.NET and Blazor, DevExtreme Complete";
var GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: "general"
};
var VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "verification"
};
var DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: "decoding"
};
var DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "deserialization"
};
var PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: "payload"
};
var VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: "version"
};
var validationPerformed = false;
function verifySignature(_ref) {
  let {
    text,
    signature: encodedSignature
  } = _ref;
  return compareSignatures({
    key: PUBLIC_KEY,
    signature: base64ToBytes(encodedSignature),
    actual: pad(sha1(text))
  });
}
function parseLicenseKey(encodedKey) {
  if (void 0 === encodedKey) {
    return GENERAL_ERROR;
  }
  const parts = encodedKey.split(".");
  if (2 !== parts.length || 0 === parts[0].length || 0 === parts[1].length) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  let decodedPayload = "";
  try {
    decodedPayload = atob(parts[0]);
  } catch {
    return DECODING_ERROR;
  }
  let payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch {
    return DESERIALIZATION_ERROR;
  }
  const {
    customerId,
    maxVersionAllowed,
    format,
    internalUsageId
  } = payload, rest = _objectWithoutPropertiesLoose(payload, _excluded);
  if (void 0 !== internalUsageId) {
    return {
      kind: TokenKind.internal,
      internalUsageId
    };
  }
  if (void 0 === customerId || void 0 === maxVersionAllowed || void 0 === format) {
    return PAYLOAD_ERROR;
  }
  if (1 !== format) {
    return VERSION_ERROR;
  }
  return {
    kind: TokenKind.verified,
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
function isPreview(patch) {
  return isNaN(patch) || patch < 3;
}
function isDevExpressLicenseKey(licenseKey) {
  return licenseKey.startsWith("LCX") || licenseKey.startsWith("LCP");
}
function getLicenseCheckParams(_ref2) {
  let {
    licenseKey,
    version
  } = _ref2;
  let preview = false;
  try {
    preview = isPreview(version.patch);
    const {
      major,
      minor
    } = preview ? getPreviousMajorVersion(version) : version;
    if (!licenseKey) {
      return {
        preview,
        error: "W0019"
      };
    }
    if (isDevExpressLicenseKey(licenseKey)) {
      return {
        preview,
        error: "W0024"
      };
    }
    const license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (license.kind === TokenKind.internal) {
      return {
        preview,
        internal: true,
        error: license.internalUsageId === INTERNAL_USAGE_ID ? void 0 : "W0020"
      };
    }
    if (!(major && minor)) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (10 * major + minor > license.payload.maxVersionAllowed) {
      return {
        preview,
        error: "W0020"
      };
    }
    return {
      preview,
      error: void 0
    };
  } catch {
    return {
      preview,
      error: "W0021"
    };
  }
}
function validateLicense(licenseKey) {
  let versionStr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : fullVersion;
  if (validationPerformed) {
    return;
  }
  validationPerformed = true;
  const version = parseVersion(versionStr);
  const versionsCompatible = assertedVersionsCompatible(version);
  const {
    internal,
    error
  } = getLicenseCheckParams({
    licenseKey,
    version
  });
  if (!versionsCompatible && internal) {
    return;
  }
  if (error && !internal) {
    const buyNowLink = config_default().buyNowLink ?? BUY_NOW_LINK;
    const licensingDocLink = config_default().licensingDocLink ?? LICENSING_DOC_LINK;
    showTrialPanel(buyNowLink, licensingDocLink, fullVersion, SUBSCRIPTION_NAMES);
  }
  const preview = isPreview(version.patch);
  if (error) {
    errors_default.log(preview ? "W0022" : error);
    return;
  }
  if (preview && !internal) {
    errors_default.log("W0022");
  }
}
function peekValidationPerformed() {
  return validationPerformed;
}
var license_validation_default = {
  validateLicense
};

// node_modules/devextreme/esm/__internal/core/templates/m_template.js
registerTemplateEngine("default", {
  compile: (element) => normalizeTemplateElement(element),
  render: (template, model, index2) => template.clone()
});
setTemplateEngine("default");
var Template = class extends TemplateBase {
  constructor(element) {
    super();
    this._element = element;
  }
  _renderCore(options) {
    const {
      transclude
    } = options;
    if (!transclude && !this._compiledTemplate) {
      this._compiledTemplate = getCurrentTemplateEngine().compile(this._element);
    }
    return renderer_default("<div>").append(transclude ? this._element : getCurrentTemplateEngine().render(this._compiledTemplate, options.model, options.index)).contents();
  }
  source() {
    return renderer_default(this._element).clone();
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_template_manager.js
var findTemplates = (element, name) => {
  const templates = renderer_default(element).contents().filter(`[data-options*="${name}"]`);
  return [].slice.call(templates).map(((element2) => {
    const optionsString = renderer_default(element2).attr("data-options") || "";
    return {
      element: element2,
      options: config_default().optionsParser(optionsString)[name]
    };
  })).filter(((template) => !!template.options));
};
var suitableTemplatesByName = (rawTemplates) => {
  const templatesMap = groupBy(rawTemplates, ((template) => template.options.name));
  if (templatesMap.undefined) {
    throw errors_default.Error("E0023");
  }
  const result = {};
  Object.keys(templatesMap).forEach(((name) => {
    var _findBestMatches$;
    const suitableTemplate = null === (_findBestMatches$ = findBestMatches(devices_default.current(), templatesMap[name], ((template) => template.options))[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
    if (suitableTemplate) {
      result[name] = suitableTemplate;
    }
  }));
  return result;
};
var addOneRenderedCall = (template) => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
var addPublicElementNormalization = (template) => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const $container = renderer_default(options.container);
      return render(_extends({}, options, {
        container: getPublicElement($container)
      }));
    }
  });
};
var getNormalizedTemplateArgs = (options) => {
  const args = [];
  if ("model" in options) {
    args.push(options.model);
  }
  if ("index" in options) {
    args.push(options.index);
  }
  args.push(options.container);
  return args;
};
var validateTemplateSource = (templateSource) => "string" === typeof templateSource ? m_dom_default.normalizeTemplateElement(templateSource) : templateSource;
var templateKey = (templateSource) => m_type_default.isRenderer(templateSource) && templateSource[0] || templateSource;
var defaultCreateElement = (element) => new Template(element);
var acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
  let integrationTemplate = null;
  if (!skipTemplates || -1 === skipTemplates.indexOf(templateSource)) {
    integrationTemplate = templates[templateSource];
    if (integrationTemplate && !(integrationTemplate instanceof TemplateBase)) {
      if (m_type_default.isFunction(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
  }
  return integrationTemplate;
};
var acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
  if (null == templateSource) {
    return new EmptyTemplate();
  }
  if (templateSource instanceof ChildDefaultTemplate) {
    return defaultTemplates[templateSource.name];
  }
  if (templateSource instanceof TemplateBase) {
    return templateSource;
  }
  if (m_type_default.isFunction(templateSource.render) && !m_type_default.isRenderer(templateSource)) {
    return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
  }
  if (templateSource.nodeType || m_type_default.isRenderer(templateSource)) {
    return createTemplate(renderer_default(templateSource));
  }
  return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
};

// node_modules/devextreme/esm/__internal/core/m_template_manager.js
var DX_POLYMORPH_WIDGET_TEMPLATE = new FunctionTemplate(((_ref) => {
  let {
    model,
    parent
  } = _ref;
  const widgetName = model.widget;
  if (!widgetName) {
    return renderer_default();
  }
  const widgetElement = renderer_default("<div>");
  const widgetOptions = model.options || {};
  if (parent) {
    parent._createComponent(widgetElement, widgetName, widgetOptions);
  } else {
    widgetElement[widgetName](widgetOptions);
  }
  return widgetElement;
}));
var TemplateManager = class {
  constructor(createElement, anonymousTemplateName) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = anonymousTemplateName || "template";
    this._createElement = createElement || defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  static createDefaultOptions() {
    return {
      integrationOptions: {
        watchMethod: function(fn, callback) {
          let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (!options.skipImmediate) {
            callback(fn());
          }
          return noop;
        },
        templates: {
          "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
        },
        useDeferUpdateForTemplates: true
      }
    };
  }
  get anonymousTemplateName() {
    return this._anonymousTemplateName;
  }
  addDefaultTemplates(templates) {
    this._defaultTemplates = extend({}, this._defaultTemplates, templates);
  }
  dispose() {
    this._tempTemplates.forEach(((tempTemplate) => {
      tempTemplate.template.dispose && tempTemplate.template.dispose();
    }));
    this._tempTemplates = [];
  }
  extractTemplates($el) {
    const templates = this._extractTemplates($el);
    const anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    const templates = findTemplates($el, "dxTemplate");
    const suitableTemplates = suitableTemplatesByName(templates);
    templates.forEach(((_ref2) => {
      let {
        element,
        options: {
          name
        }
      } = _ref2;
      if (element === suitableTemplates[name]) {
        renderer_default(element).addClass("dx-template-wrapper").detach();
      } else {
        renderer_default(element).remove();
      }
    }));
    return Object.keys(suitableTemplates).map(((name) => ({
      name,
      template: this._createTemplate(suitableTemplates[name])
    })));
  }
  _extractAnonymousTemplate($el) {
    const $anonymousTemplate = $el.contents().detach();
    const $notJunkTemplateContent = $anonymousTemplate.filter(((_, element) => {
      const isTextNode = 3 === element.nodeType;
      const isEmptyText = renderer_default(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    }));
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    const cachedTemplate = this._tempTemplates.filter(((tempTemplate) => tempTemplate.source === templateKey(templateSource)))[0];
    if (cachedTemplate) {
      return cachedTemplate.template;
    }
    const template = this._createTemplate(templateSource);
    this._tempTemplates.push({
      template,
      source: templateKey(templateSource)
    });
    return template;
  }
  _createTemplate(templateSource) {
    return this._createElement(validateTemplateSource(templateSource));
  }
  getTemplate(templateSource, templates, _ref3, context) {
    let {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!isFunction(templateSource)) {
      return acquireTemplate(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    return new FunctionTemplate(((options) => {
      const templateSourceResult = templateSource.apply(context, getNormalizedTemplateArgs(options));
      if (!isDefined(templateSourceResult)) {
        return new EmptyTemplate();
      }
      let dispose = false;
      const template = acquireTemplate(templateSourceResult, ((templateSource2) => {
        if (templateSource2.nodeType || isRenderer(templateSource2) && !renderer_default(templateSource2).is("script")) {
          return new FunctionTemplate((() => templateSource2));
        }
        dispose = true;
        return this._createTemplate(templateSource2);
      }), templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      const result = template.render(options);
      dispose && template.dispose && template.dispose();
      return result;
    }));
  }
};
var m_template_manager_default = {
  TemplateManager
};

// node_modules/devextreme/esm/__internal/core/widget/dom_component.js
var DOMComponent = class _DOMComponent extends Component {
  static getInstance(element) {
    return getInstanceByElement(renderer_default(element), this);
  }
  static defaultOptions(rule) {
    this._classCustomRules = Object.hasOwnProperty.bind(this)("_classCustomRules") && this._classCustomRules ? this._classCustomRules : [];
    this._classCustomRules.push(rule);
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      width: void 0,
      height: void 0,
      rtlEnabled: config_default().rtlEnabled,
      elementAttr: {},
      disabled: false,
      integrationOptions: {}
    }, this._useTemplates() ? m_template_manager_default.TemplateManager.createDefaultOptions() : {});
  }
  ctor(element, options) {
    this._customClass = null;
    this._createElement(element);
    attachInstanceToElement(this._$element, this, this._dispose);
    super.ctor(options);
    const validationAlreadyPerformed = peekValidationPerformed();
    license_validation_default.validateLicense(config_default().licenseKey);
    if (!validationAlreadyPerformed && peekValidationPerformed()) {
      config_default({
        licenseKey: ""
      });
    }
    uiLayerInitialized.resolve();
  }
  _createElement(element) {
    this._$element = renderer_default(element);
  }
  _getSynchronizableOptionsForCreateComponent() {
    return ["rtlEnabled", "disabled", "templatesRenderAsynchronously"];
  }
  _checkFunctionValueDeprecation(optionNames) {
    if (!this.option("_ignoreFunctionValueDeprecation")) {
      optionNames.forEach(((optionName) => {
        if (isFunction(this.option(optionName))) {
          errors_default.log("W0017", optionName);
        }
      }));
    }
  }
  _visibilityChanged(value) {
  }
  _dimensionChanged() {
  }
  _init() {
    super._init();
    this._checkFunctionValueDeprecation(["width", "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "popupHeight", "popupWidth"]);
    this._attachWindowResizeCallback();
    this._initTemplateManager();
  }
  _setOptionsByDevice(instanceCustomRules) {
    const ctor = this.constructor;
    const hasOwnCustomRules = Object.prototype.hasOwnProperty.call(ctor, "_classCustomRules");
    const hasOwnDefaultOptions = Object.prototype.hasOwnProperty.call(ctor, "defaultOptions");
    const ownClassCustomRules = hasOwnCustomRules || hasOwnDefaultOptions ? ctor._classCustomRules : [];
    super._setOptionsByDevice([].concat(ownClassCustomRules || [], instanceCustomRules || []));
  }
  _isInitialOptionValue(name) {
    const isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
    return !isCustomOption && super._isInitialOptionValue(name);
  }
  _attachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      const windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
      resize_callbacks_default.add(windowResizeCallBack);
    }
  }
  _isDimensionChangeSupported() {
    return this._dimensionChanged !== _DOMComponent.prototype._dimensionChanged;
  }
  _renderComponent() {
    addShadowDomStyles(this.$element());
    this._initMarkup();
    hasWindow() && this._render();
  }
  _initMarkup() {
    const {
      rtlEnabled
    } = this.option() || {};
    this._renderElementAttributes();
    this._toggleRTLDirection(rtlEnabled);
    this._renderVisibilityChange();
    this._renderDimensions();
  }
  _render() {
    this._attachVisibilityChangeHandlers();
  }
  _renderElementAttributes() {
    const {
      elementAttr
    } = this.option() || {};
    const attributes = extend({}, elementAttr);
    const classNames = attributes.class;
    delete attributes.class;
    this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
    this._customClass = classNames;
  }
  _renderVisibilityChange() {
    if (this._isDimensionChangeSupported()) {
      this._attachDimensionChangeHandlers();
    }
    if (this._isVisibilityChangeSupported()) {
      const $element = this.$element();
      $element.addClass("dx-visibility-change-handler");
    }
  }
  _renderDimensions() {
    const $element = this.$element();
    const element = $element.get(0);
    const width = this._getOptionValue("width", element);
    const height = this._getOptionValue("height", element);
    if (this._isCssUpdateRequired(element, height, width)) {
      $element.css({
        width: null === width ? "" : width,
        height: null === height ? "" : height
      });
    }
  }
  _isCssUpdateRequired(element, height, width) {
    return !!(isDefined(width) || isDefined(height) || element.style.width || element.style.height);
  }
  _attachDimensionChangeHandlers() {
    const $el = this.$element();
    const namespace = `${this.NAME}VisibilityChange`;
    resize.off($el, {
      namespace
    });
    resize.on($el, (() => this._dimensionChanged()), {
      namespace
    });
  }
  _attachVisibilityChangeHandlers() {
    if (this._isVisibilityChangeSupported()) {
      const $el = this.$element();
      const namespace = `${this.NAME}VisibilityChange`;
      this._isHidden = !this._isVisible();
      visibility.off($el, {
        namespace
      });
      visibility.on($el, (() => this._checkVisibilityChanged("shown")), (() => this._checkVisibilityChanged("hiding")), {
        namespace
      });
    }
  }
  _isVisible() {
    const $element = this.$element();
    return $element.is(":visible");
  }
  _checkVisibilityChanged(action) {
    const isVisible = this._isVisible();
    if (isVisible) {
      if ("hiding" === action && !this._isHidden) {
        this._visibilityChanged(false);
        this._isHidden = true;
      } else if ("shown" === action && this._isHidden) {
        this._isHidden = false;
        this._visibilityChanged(true);
      }
    }
  }
  _isVisibilityChangeSupported() {
    return this._visibilityChanged !== _DOMComponent.prototype._visibilityChanged && hasWindow();
  }
  _clean() {
  }
  _modelByElement($element) {
    const {
      modelByElement
    } = this.option();
    return modelByElement ? modelByElement(this.$element()) : void 0;
  }
  _invalidate() {
    if (this._isUpdateAllowed()) {
      throw errors_default.Error("E0007");
    }
    this._requireRefresh = true;
  }
  _refresh() {
    this._clean();
    this._renderComponent();
  }
  _dispose() {
    var _this$_templateManage;
    null === (_this$_templateManage = this._templateManager) || void 0 === _this$_templateManage || _this$_templateManage.dispose();
    super._dispose();
    this._clean();
    this._detachWindowResizeCallback();
  }
  _detachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      resize_callbacks_default.remove(this._windowResizeCallBack);
    }
  }
  _toggleRTLDirection(rtl) {
    const $element = this.$element();
    $element.toggleClass("dx-rtl", rtl);
  }
  _createComponent(element, component, componentConfiguration) {
    const configuration = componentConfiguration ?? {};
    const synchronizableOptions = this._getSynchronizableOptionsForCreateComponent().filter(((value) => !(value in configuration)));
    const {
      integrationOptions
    } = this.option();
    let {
      nestedComponentOptions
    } = this.option();
    nestedComponentOptions = nestedComponentOptions ?? noop;
    const nestedComponentConfig = extend({
      integrationOptions
    }, nestedComponentOptions(this));
    synchronizableOptions.forEach(((optionName) => {
      const {
        [optionName]: value
      } = this.option();
      nestedComponentConfig[optionName] = value;
    }));
    this._extendConfig(configuration, nestedComponentConfig);
    let instance;
    if (isString(component)) {
      const $element = renderer_default(element)[component](configuration);
      instance = $element[component]("instance");
    } else if (element) {
      instance = component.getInstance(element);
      if (instance) {
        instance.option(configuration);
      } else {
        instance = new component(element, configuration);
      }
    }
    if (instance) {
      const optionChangedHandler = (_ref) => {
        let {
          name,
          value
        } = _ref;
        if (synchronizableOptions.includes(name)) {
          instance.option(name, value);
        }
      };
      this.on("optionChanged", optionChangedHandler);
      instance.on("disposing", (() => this.off("optionChanged", optionChangedHandler)));
    }
    return instance;
  }
  _extendConfig(configuration, extendConfig) {
    each(extendConfig, ((key, value) => {
      configuration[key] ?? (configuration[key] = value);
    }));
  }
  _defaultActionConfig() {
    const $element = this.$element();
    const context = this._modelByElement($element);
    const defaultConfig = super._defaultActionConfig();
    if (context) {
      defaultConfig.context = context;
    }
    return defaultConfig;
  }
  _defaultActionArgs() {
    const args = super._defaultActionArgs();
    const $element = this.$element();
    const model = this._modelByElement($element);
    const element = this.element();
    if (element) {
      args.element = element;
    }
    if (model) {
      args.model = model;
    }
    return args;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "width":
      case "height":
        this._renderDimensions();
        break;
      case "rtlEnabled":
        this._invalidate();
        break;
      case "elementAttr":
        this._renderElementAttributes();
        break;
      case "disabled":
      case "integrationOptions":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _removeAttributes(element) {
    const attrs = element.attributes;
    for (let i = attrs.length - 1; i >= 0; i -= 1) {
      const attr = attrs[i];
      if (attr) {
        const {
          name
        } = attr;
        if (!name.indexOf("aria-") || -1 !== name.indexOf("dx-") || "role" === name || "style" === name || "tabindex" === name) {
          element.removeAttribute(name);
        }
      }
    }
  }
  _removeClasses(element) {
    element.className = element.className.split(" ").filter(((cssClass) => 0 !== cssClass.lastIndexOf("dx-", 0))).join(" ");
  }
  _updateDOMComponent(renderRequired) {
    if (renderRequired) {
      this._renderComponent();
    } else if (this._requireRefresh) {
      this._requireRefresh = false;
      this._refresh();
    }
  }
  endUpdate() {
    const renderRequired = this._isInitializingRequired();
    super.endUpdate();
    this._isUpdateAllowed() && this._updateDOMComponent(renderRequired);
  }
  $element() {
    return this._$element;
  }
  element() {
    const $element = this.$element();
    return getPublicElement($element);
  }
  dispose() {
    const element = this.$element().get(0);
    cleanDataRecursive(element, true);
    element.textContent = "";
    this._removeAttributes(element);
    this._removeClasses(element);
  }
  resetOption(optionName) {
    super.resetOption(optionName);
    if ("width" === optionName || "height" === optionName) {
      const initialOption = this.initialOption(optionName);
      !isDefined(initialOption) && this.$element().css(optionName, "");
    }
  }
  _getAnonymousTemplateName() {
    return;
  }
  _initTemplateManager() {
    if (this._templateManager || !this._useTemplates()) {
      return;
    }
    const {
      integrationOptions = {}
    } = this.option();
    const {
      createTemplate
    } = integrationOptions;
    this._templateManager = new m_template_manager_default.TemplateManager(createTemplate, this._getAnonymousTemplateName());
    this._initTemplates();
    return;
  }
  _initTemplates() {
    const {
      templates,
      anonymousTemplateMeta
    } = this._templateManager.extractTemplates(this.$element());
    const anonymousTemplate = this.option(`integrationOptions.templates.${anonymousTemplateMeta.name}`);
    templates.forEach(((_ref2) => {
      let {
        name,
        template
      } = _ref2;
      this._options.silent(`integrationOptions.templates.${name}`, template);
    }));
    if (anonymousTemplateMeta.name && !anonymousTemplate) {
      this._options.silent(`integrationOptions.templates.${anonymousTemplateMeta.name}`, anonymousTemplateMeta.template);
      this._options.silent("_hasAnonymousTemplateContent", true);
    }
  }
  _getTemplateByOption(optionName) {
    return this._getTemplate(this.option(optionName));
  }
  _getTemplate(templateSource) {
    const templates = this.option("integrationOptions.templates");
    const isAsyncTemplate = this.option("templatesRenderAsynchronously");
    const skipTemplates = this.option("integrationOptions.skipTemplates");
    return this._templateManager.getTemplate(templateSource, templates, {
      isAsyncTemplate,
      skipTemplates
    }, this);
  }
  _saveTemplate(name, template) {
    this._setOptionWithoutOptionChange(`integrationOptions.templates.${name}`, this._templateManager._createTemplate(template));
  }
  _useTemplates() {
    return true;
  }
};
var dom_component_default = DOMComponent;

export {
  requestAnimationFrame,
  cancelAnimationFrame,
  getPublicElement,
  locate,
  move,
  resetPosition,
  getDefaultAlignment,
  getBoundingRect,
  browser_default,
  position_default,
  m_event_registrator_default,
  removeEvent,
  focusable,
  tabbable,
  focused,
  m_selectors_default,
  isPointerEvent,
  isMouseEvent,
  isDxMouseWheelEvent,
  isTouchEvent,
  isFakeClickEvent,
  eventData,
  eventDelta,
  hasTouches,
  needSkipEvent,
  createEvent,
  fireEvent,
  normalizeKeyName,
  getChar,
  addNamespace2 as addNamespace,
  isCommandKeyPressed,
  fx_default,
  action_default,
  convertRulesToOptions,
  normalizeOptions,
  getFieldName,
  createDefaultOptionRules,
  equals,
  getName,
  attachInstanceToElement,
  getInstanceByElement,
  Component,
  presets_default,
  TransitionExecutor,
  transition_executor_default,
  m_emitter_default,
  EVENT_NAME,
  m_pointer_default,
  m_emitter_registrator_default,
  closestCommonParent,
  clipboardText,
  contains,
  createTextElementHiddenCopy,
  replaceWith,
  isElementInDom,
  m_dom_default,
  CLICK_EVENT_NAME,
  component_registrator_default,
  triggerShownEvent2 as triggerShownEvent,
  triggerHidingEvent2 as triggerHidingEvent,
  triggerResizeEvent2 as triggerResizeEvent,
  TemplateBase,
  _objectWithoutPropertiesLoose,
  ChildDefaultTemplate,
  EmptyTemplate,
  wrapToArray,
  getUniqueValues,
  getIntersection,
  removeDuplicates,
  normalizeIndexes,
  findTemplates,
  ACTIVE_EVENT_NAME,
  lock,
  HOVERSTART,
  HOVEREND,
  m_keyboard_processor_default,
  active,
  resize,
  hover,
  visibility,
  focus,
  dxClick,
  click,
  keyboard,
  FunctionTemplate,
  dom_component_default
};
//# sourceMappingURL=chunk-54SHI7Z2.js.map
