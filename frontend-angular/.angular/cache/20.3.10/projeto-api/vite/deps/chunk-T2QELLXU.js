import {
  config_default2 as config_default,
  dependency_injector_default,
  noop
} from "./chunk-EJA7O4BW.js";

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
  if (!config_default().copyStylesToShadowDom) {
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
      return noop;
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
//# sourceMappingURL=chunk-T2QELLXU.js.map
