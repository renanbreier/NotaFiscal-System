import {
  action_default,
  active,
  dom_component_default,
  focus,
  focusable,
  hover,
  keyboard
} from "./chunk-54SHI7Z2.js";
import {
  devices_default
} from "./chunk-A3D3LIWG.js";
import {
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  _extends,
  deferRender,
  each,
  extend,
  isDefined,
  isPlainObject
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/core/utils/m_version.js
function compare(x, y, maxLevel) {
  function normalizeArg(value) {
    if ("string" === typeof value) {
      return value.split(".");
    }
    if ("number" === typeof value) {
      return [value];
    }
    return value;
  }
  x = normalizeArg(x);
  y = normalizeArg(y);
  let length = Math.max(x.length, y.length);
  if (isFinite(maxLevel)) {
    length = Math.min(length, maxLevel);
  }
  for (let i = 0; i < length; i++) {
    const xItem = parseInt(x[i] || 0, 10);
    const yItem = parseInt(y[i] || 0, 10);
    if (xItem < yItem) {
      return -1;
    }
    if (xItem > yItem) {
      return 1;
    }
  }
  return 0;
}

// node_modules/devextreme/esm/__internal/core/widget/widget.js
var FOCUSED_STATE_CLASS = "dx-state-focused";
var EMPTY_ACTIVE_STATE_UNIT = "";
function setAttribute(name, value, $target) {
  const attributeName = "role" === name || "id" === name ? name : `aria-${name}`;
  const attr = isDefined(value) ? value.toString() : null;
  $target.attr(attributeName, attr);
}
var Widget = class _Widget extends dom_component_default {
  static getOptionsFromContainer(_ref) {
    let {
      name,
      fullName,
      value
    } = _ref;
    let options = {};
    if (name === fullName) {
      options = value;
    } else {
      const option = fullName.split(".").pop();
      options[option] = value;
    }
    return options;
  }
  _activeStateUnit() {
    return "";
  }
  _feedbackHideTimeout() {
    return 400;
  }
  _feedbackShowTimeout() {
    return 30;
  }
  _supportedKeys(e) {
    return {};
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      hoveredElement: null,
      isActive: false,
      disabled: false,
      visible: true,
      hint: void 0,
      activeStateEnabled: false,
      onContentReady: null,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      tabIndex: 0,
      accessKey: void 0,
      onFocusIn: null,
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device() {
        const device = devices_default.real();
        const {
          platform
        } = device;
        const {
          version
        } = device;
        return "ios" === platform && compare(version, "13.3") <= 0;
      },
      options: {
        useResizeObserver: false
      }
    }];
    return rules;
  }
  _init() {
    super._init();
    this._initContentReadyAction();
  }
  _innerWidgetOptionChanged(innerWidget, args) {
    const options = _Widget.getOptionsFromContainer(args);
    innerWidget && innerWidget.option(options);
    this._options.cache(args.name, options);
  }
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    const syncOptions = () => this._options.silent(optionsContainer, extend({}, innerWidget.option()));
    syncOptions();
    innerWidget.on("optionChanged", syncOptions);
  }
  _getAriaTarget() {
    return this._focusTarget();
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initMarkup() {
    const {
      disabled,
      visible
    } = this.option();
    this.$element().addClass("dx-widget");
    this._toggleDisabledState(disabled);
    this._toggleVisibility(visible);
    this._renderHint();
    this._isFocusable() && this._renderFocusTarget();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  }
  _renderHint() {
    const {
      hint
    } = this.option();
    this.$element().attr("title", hint || null);
  }
  _renderContent() {
    deferRender((() => !this._disposed ? this._renderContentImpl() : void 0)).done((() => !this._disposed ? this._fireContentReadyAction() : void 0));
  }
  _renderContentImpl() {
  }
  _fireContentReadyAction() {
    return deferRender((() => {
      var _this$_contentReadyAc;
      return null === (_this$_contentReadyAc = this._contentReadyAction) || void 0 === _this$_contentReadyAc ? void 0 : _this$_contentReadyAc.call(this);
    }));
  }
  _dispose() {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    super._dispose();
  }
  _resetActiveState() {
    this._toggleActiveState(this._eventBindingTarget(), false);
  }
  _clean() {
    this._cleanFocusState();
    this._resetActiveState();
    super._clean();
    this.$element().empty();
  }
  _toggleVisibility(visible) {
    this.$element().toggleClass("dx-state-invisible", !visible);
  }
  _renderFocusState() {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  }
  _renderAccessKey() {
    const $el = this._focusTarget();
    const {
      accessKey
    } = this.option();
    $el.attr("accesskey", accessKey);
  }
  _isFocusable() {
    const {
      focusStateEnabled,
      disabled
    } = this.option();
    return focusStateEnabled && !disabled;
  }
  _eventBindingTarget() {
    return this.$element();
  }
  _focusTarget() {
    return this._getActiveElement();
  }
  _isFocusTarget(element) {
    const focusTargets = renderer_default(this._focusTarget()).toArray();
    return focusTargets.includes(element);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit()).not(".dx-state-disabled");
  }
  _getActiveElement() {
    const activeElement = this._eventBindingTarget();
    if (this._activeStateUnit()) {
      return this._findActiveTarget(activeElement);
    }
    return activeElement;
  }
  _renderFocusTarget() {
    const {
      tabIndex
    } = this.option();
    this._focusTarget().attr("tabIndex", tabIndex);
  }
  _keyboardEventBindingTarget() {
    return this._eventBindingTarget();
  }
  _refreshFocusEvent() {
    this._detachFocusEvents();
    this._attachFocusEvents();
  }
  _focusEventTarget() {
    return this._focusTarget();
  }
  _focusInHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusIn", {
        beforeExecute: () => this._updateFocusState(event, true),
        excludeValidators: ["readOnly"]
      })({
        event
      });
    }
  }
  _focusOutHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusOut", {
        beforeExecute: () => this._updateFocusState(event, false),
        excludeValidators: ["readOnly", "disabled"]
      })({
        event
      });
    }
  }
  _updateFocusState(_ref2, isFocused) {
    let {
      target
    } = _ref2;
    if (this._isFocusTarget(target)) {
      this._toggleFocusClass(isFocused, renderer_default(target));
    }
  }
  _toggleFocusClass(isFocused, $element) {
    const $focusTarget = null !== $element && void 0 !== $element && $element.length ? $element : this._focusTarget();
    $focusTarget.toggleClass("dx-state-focused", isFocused);
  }
  _hasFocusClass(element) {
    const $focusTarget = renderer_default(element ?? this._focusTarget());
    return $focusTarget.hasClass("dx-state-focused");
  }
  _isFocused() {
    return this._hasFocusClass();
  }
  _getKeyboardListeners() {
    return [];
  }
  _attachKeyboardEvents() {
    this._detachKeyboardEvents();
    const {
      focusStateEnabled,
      onKeyboardHandled
    } = this.option();
    const hasChildListeners = this._getKeyboardListeners().length;
    const hasKeyboardEventHandler = !!onKeyboardHandled;
    const shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
    if (shouldAttach) {
      this._keyboardListenerId = keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), ((opts) => this._keyboardHandler(opts)));
    }
  }
  _keyboardHandler(options, onlyChildProcessing) {
    if (!onlyChildProcessing) {
      const {
        originalEvent,
        keyName,
        which
      } = options;
      const keys = this._supportedKeys(originalEvent);
      const func = keys[keyName] || keys[which];
      if (void 0 !== func) {
        const handler = func.bind(this);
        const result = handler(originalEvent, options);
        if (!result) {
          return false;
        }
      }
    }
    const keyboardListeners = this._getKeyboardListeners();
    const {
      onKeyboardHandled
    } = this.option();
    keyboardListeners.forEach(((listener) => null === listener || void 0 === listener ? void 0 : listener._keyboardHandler(options)));
    onKeyboardHandled && onKeyboardHandled(options);
    return true;
  }
  _refreshFocusState() {
    this._cleanFocusState();
    this._renderFocusState();
  }
  _cleanFocusState() {
    const $element = this._focusTarget();
    $element.removeAttr("tabIndex");
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  }
  _detachKeyboardEvents() {
    keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  }
  _attachHoverEvents() {
    const {
      hoverStateEnabled
    } = this.option();
    const selector = this._activeStateUnit();
    const $el = this._eventBindingTarget();
    hover.off($el, {
      selector,
      namespace: "UIFeedback"
    });
    if (hoverStateEnabled) {
      hover.on($el, new action_default(((_ref3) => {
        let {
          event,
          element
        } = _ref3;
        this._hoverStartHandler(event);
        this.option("hoveredElement", renderer_default(element));
      }), {
        excludeValidators: ["readOnly"]
      }), ((event) => {
        this.option("hoveredElement", null);
        this._hoverEndHandler(event);
      }), {
        selector,
        namespace: "UIFeedback"
      });
    }
  }
  _attachFeedbackEvents() {
    const {
      activeStateEnabled
    } = this.option();
    const selector = this._activeStateUnit();
    const $el = this._eventBindingTarget();
    active.off($el, {
      namespace: "UIFeedback",
      selector
    });
    if (activeStateEnabled) {
      active.on($el, new action_default(((_ref4) => {
        let {
          event,
          element
        } = _ref4;
        return this._toggleActiveState(renderer_default(element), true, event);
      })), new action_default(((_ref5) => {
        let {
          event,
          element
        } = _ref5;
        return this._toggleActiveState(renderer_default(element), false, event);
      }), {
        excludeValidators: ["disabled", "readOnly"]
      }), {
        showTimeout: this._feedbackShowTimeout(),
        hideTimeout: this._feedbackHideTimeout(),
        selector,
        namespace: "UIFeedback"
      });
    }
  }
  _detachFocusEvents() {
    const $el = this._focusEventTarget();
    focus.off($el, {
      namespace: `${this.NAME}Focus`
    });
  }
  _attachFocusEvents() {
    const $element = this._focusEventTarget();
    focus.on($element, ((e) => this._focusInHandler(e)), ((e) => this._focusOutHandler(e)), {
      namespace: `${this.NAME}Focus`,
      isFocusable: (_index, el) => renderer_default(el).is(focusable)
    });
  }
  _hoverStartHandler(event) {
  }
  _hoverEndHandler(event) {
  }
  _toggleActiveState($element, value, event) {
    this.option("isActive", value);
    $element.toggleClass("dx-state-active", value);
  }
  _updatedHover() {
    const hoveredElement = this._options.silent("hoveredElement");
    this._hover(hoveredElement, hoveredElement);
  }
  _findHoverTarget($el) {
    return null === $el || void 0 === $el ? void 0 : $el.closest(this._activeStateUnit() || this._eventBindingTarget());
  }
  _hover($el, $previous) {
    var _$previous;
    const {
      hoverStateEnabled,
      disabled,
      isActive
    } = this.option();
    $previous = this._findHoverTarget($previous);
    null === (_$previous = $previous) || void 0 === _$previous || _$previous.toggleClass("dx-state-hover", false);
    if ($el && hoverStateEnabled && !disabled && !isActive) {
      const newHoveredElement = this._findHoverTarget($el);
      null === newHoveredElement || void 0 === newHoveredElement || newHoveredElement.toggleClass("dx-state-hover", true);
    }
  }
  _toggleDisabledState(value) {
    this.$element().toggleClass("dx-state-disabled", Boolean(value));
    this.setAria("disabled", value || void 0);
  }
  _toggleIndependentState() {
    const {
      ignoreParentReadOnly
    } = this.option();
    this.$element().toggleClass("dx-state-independent", ignoreParentReadOnly);
  }
  _setWidgetOption(widgetName, args) {
    if (!this[widgetName]) {
      return;
    }
    if (isPlainObject(args[0])) {
      each(args[0], ((option, value2) => this._setWidgetOption(widgetName, [option, value2])));
      return;
    }
    const optionName = args[0];
    let value = args[1];
    if (1 === args.length) {
      value = this.option(optionName);
    }
    const widgetOptionMap = this[`${widgetName}OptionMap`];
    this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "disabled":
        this._toggleDisabledState(value);
        this._updatedHover();
        this._refreshFocusState();
        break;
      case "hint":
        this._renderHint();
        break;
      case "ignoreParentReadOnly":
        this._toggleIndependentState();
        break;
      case "activeStateEnabled":
        this._attachFeedbackEvents();
        break;
      case "hoverStateEnabled":
        this._attachHoverEvents();
        this._updatedHover();
        break;
      case "tabIndex":
      case "focusStateEnabled":
        this._refreshFocusState();
        break;
      case "onFocusIn":
      case "onFocusOut":
      case "useResizeObserver":
        break;
      case "accessKey":
        this._renderAccessKey();
        break;
      case "hoveredElement":
        this._hover(value, previousValue);
        break;
      case "isActive":
        this._updatedHover();
        break;
      case "visible":
        this._toggleVisibility(value);
        if (this._isVisibilityChangeSupported()) {
          this._checkVisibilityChanged(value ? "shown" : "hiding");
        }
        break;
      case "onKeyboardHandled":
        this._attachKeyboardEvents();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _isVisible() {
    const {
      visible
    } = this.option();
    return super._isVisible() && visible;
  }
  beginUpdate() {
    this._ready(false);
    super.beginUpdate();
  }
  endUpdate() {
    super.endUpdate();
    if (this._initialized) {
      this._ready(true);
    }
  }
  _ready(value) {
    if (0 === arguments.length) {
      return !!this._isReady;
    }
    this._isReady = !!value;
    return this._isReady;
  }
  setAria() {
    if (!isPlainObject(arguments.length <= 0 ? void 0 : arguments[0])) {
      setAttribute(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 2 ? void 0 : arguments[2]) || this._getAriaTarget());
    } else {
      const target = (arguments.length <= 1 ? void 0 : arguments[1]) || this._getAriaTarget();
      each(arguments.length <= 0 ? void 0 : arguments[0], ((name, value) => setAttribute(name, value, target)));
    }
  }
  isReady() {
    return this._ready();
  }
  repaint() {
    this._refresh();
  }
  focus() {
    focus.trigger(this._focusTarget());
  }
  registerKeyHandler(key, handler) {
    const currentKeys = this._supportedKeys();
    this._supportedKeys = () => _extends({}, currentKeys, {
      [key]: handler
    });
  }
};
var widget_default = Widget;

export {
  FOCUSED_STATE_CLASS,
  EMPTY_ACTIVE_STATE_UNIT,
  widget_default
};
//# sourceMappingURL=chunk-XX26YRCT.js.map
