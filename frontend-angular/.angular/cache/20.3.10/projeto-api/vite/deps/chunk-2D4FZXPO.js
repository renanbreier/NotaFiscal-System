import {
  changeCallback,
  devices_default,
  originalViewPort,
  ui_errors_default,
  value
} from "./chunk-DONQLAZQ.js";
import {
  getOuterHeight,
  parseHTML,
  ready_callbacks_default,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  Deferred,
  callbacks_default,
  dom_adapter_default,
  each,
  getWindow,
  hasWindow,
  uiLayerInitialized,
  when
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/ui/themes_callback.js
var themeReadyCallback = callbacks_default();

// node_modules/devextreme/esm/ui/themes.js
var window = getWindow();
var ready = ready_callbacks_default.add;
var viewPort = value;
var viewPortChanged = changeCallback;
var initDeferred = new Deferred();
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15e3;
function readThemeMarker() {
  if (!hasWindow()) {
    return null;
  }
  const element = renderer_default("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
  let result;
  try {
    result = window.getComputedStyle(element.get(0)).fontFamily;
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, "");
    if ("dx." !== result.substr(0, 3)) {
      return null;
    }
    return result.substr(3);
  } finally {
    element.remove();
  }
}
function waitForThemeLoad(themeName) {
  let waitStartTime;
  let timerId;
  let intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    themeReadyCallback.fire();
    themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval((function() {
      const isLoaded = isPendingThemeLoaded();
      const isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        ui_errors_default.log("W0004", pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }), 10);
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  const anyThemePending = "any" === pendingThemeName;
  if ("resolved" === initDeferred.state() && anyThemePending) {
    return true;
  }
  const themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function processMarkup() {
  const $allThemeLinks = renderer_default(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = renderer_default(parseHTML("<link rel=stylesheet>"), context);
  $allThemeLinks.each((function() {
    const link = renderer_default(this, context);
    const fullThemeName = link.attr(THEME_ATTR);
    const url = link.attr("href");
    const isActive = "true" === link.attr(ACTIVE_ATTR);
    knownThemes[fullThemeName] = {
      url,
      isActive
    };
  }));
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  const desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
  let result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    each(knownThemes, (function(knownThemeName, themeData) {
      const knownThemeParts = knownThemeName.split(".");
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    }));
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    knownThemes = null;
  }
  context = newContext;
}
function init(options) {
  options = options || {};
  initContext(options.context || dom_adapter_default.getDocument());
  if (!context) {
    return;
  }
  processMarkup();
  currentThemeName = void 0;
  current(options);
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if ("string" === typeof options) {
    options = {
      theme: options
    };
  }
  const isAutoInit = options._autoInit;
  const loadCallback = options.loadCallback;
  let currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
    if (themeReadyCallback.has() || "resolved" !== initDeferred.state() || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else if (isAutoInit) {
    if (hasWindow()) {
      waitForThemeLoad("any");
    }
    themeReadyCallback.fire();
    themeReadyCallback.empty();
  } else {
    throw ui_errors_default.Error("E0021", currentThemeName);
  }
  initDeferred.done((() => attachCssClasses(originalViewPort(), currentThemeName)));
}
function getCssClasses(themeName) {
  themeName = themeName || current();
  const result = [];
  const themeNameParts = themeName && themeName.split(".");
  if (themeNameParts) {
    result.push("dx-theme-" + themeNameParts[0], "dx-theme-" + themeNameParts[0] + "-typography");
    if (themeNameParts.length > 1) {
      result.push("dx-color-scheme-" + themeNameParts[1] + (isMaterialBased(themeName) ? "-" + themeNameParts[2] : ""));
    }
  }
  return result;
}
var themeClasses;
function _attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(" ");
  renderer_default(element).addClass(themeClasses);
  !(function() {
    const pixelRatio = hasWindow() && window.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    const $tester = renderer_default("<div>");
    $tester.css("border", ".5px solid transparent");
    renderer_default("body").append($tester);
    if (1 === getOuterHeight($tester)) {
      renderer_default(element).addClass("dx-hairlines");
      themeClasses += " dx-hairlines";
    }
    $tester.remove();
  })();
}
function attachCssClasses(element, themeName) {
  when(uiLayerInitialized).done((() => {
    _attachCssClasses(element, themeName);
  }));
}
function detachCssClasses(element) {
  when(uiLayerInitialized).done((() => {
    renderer_default(element).removeClass(themeClasses);
  }));
}
function themeReady(callback) {
  themeReadyCallback.add(callback);
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterialBased(themeName) {
  return isMaterial(themeName) || isFluent(themeName);
}
function isMaterial(themeName) {
  return isTheme("material", themeName);
}
function isFluent(themeName) {
  return isTheme("fluent", themeName);
}
function isGeneric(themeName) {
  return isTheme("generic", themeName);
}
function isDark(themeName) {
  return isTheme("dark", themeName);
}
function isCompact(themeName) {
  return isTheme("compact", themeName);
}
function isWebFontLoaded(text, fontWeight) {
  const document = dom_adapter_default.getDocument();
  const testElement = document.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = "-9999px";
  testElement.style.left = "-9999px";
  testElement.style.visibility = "hidden";
  testElement.style.fontFamily = "Arial";
  testElement.style.fontSize = "250px";
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document.body.appendChild(testElement);
  const etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = "Roboto, RobotoFallback, Arial";
  const testedFontWidth = testElement.offsetWidth;
  testElement.parentNode.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  return new Promise(((resolve) => {
    const clear = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    const intervalId = setInterval((() => {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    }), 15);
    const timeoutId = setTimeout(clear, 2e3);
  }));
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if (renderer_default(DX_LINK_SELECTOR, context).length) {
    throw ui_errors_default.Error("E0022");
  }
}
if (hasWindow()) {
  autoInit();
} else {
  ready(autoInit);
}
viewPortChanged.add((function(viewPort2, prevViewPort) {
  initDeferred.done((function() {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort2);
  }));
}));
devices_default.changed.add((function() {
  init({
    _autoInit: true
  });
}));
function resetTheme() {
  $activeThemeLink && $activeThemeLink.attr("href", "about:blank");
  currentThemeName = null;
  pendingThemeName = null;
  initDeferred = new Deferred();
}
function initialized(callback) {
  initDeferred.done(callback);
}
function setDefaultTimeout(timeout) {
  defaultTimeout = timeout;
}
var themes_default = {
  setDefaultTimeout,
  initialized,
  resetTheme,
  ready: themeReady,
  waitWebFont,
  isWebFontLoaded,
  isCompact,
  isDark,
  isGeneric,
  isMaterial,
  isFluent,
  isMaterialBased,
  detachCssClasses,
  attachCssClasses,
  current,
  waitForThemeLoad,
  isPendingThemeLoaded
};

export {
  waitForThemeLoad,
  isPendingThemeLoaded,
  init,
  current,
  attachCssClasses,
  detachCssClasses,
  themeReady,
  isMaterialBased,
  isMaterial,
  isFluent,
  isGeneric,
  isDark,
  isCompact,
  isWebFontLoaded,
  waitWebFont,
  resetTheme,
  initialized,
  setDefaultTimeout,
  themes_default
};
//# sourceMappingURL=chunk-2D4FZXPO.js.map
