import {
  m_emitter_gesture_scroll_default
} from "./chunk-CYT7ZZVJ.js";
import {
  widget_default
} from "./chunk-IWHEGBWI.js";
import {
  addNamespace,
  browser_default,
  cancelAnimationFrame,
  component_registrator_default,
  dom_component_default,
  getBoundingRect,
  getPublicElement,
  isCommandKeyPressed,
  isDxMouseWheelEvent,
  locate,
  m_pointer_default,
  move,
  normalizeKeyName,
  requestAnimationFrame,
  resetPosition
} from "./chunk-ICLEXNO5.js";
import {
  devices_default,
  m_support_default
} from "./chunk-DONQLAZQ.js";
import {
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  ready_callbacks_default,
  renderer_default,
  titleize
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  class_default,
  deferRender,
  deferRenderer,
  deferUpdate,
  deferUpdater,
  dom_adapter_default,
  each,
  ensureDefined,
  extend,
  getWindow,
  hasWindow,
  isDefined,
  isPlainObject,
  map,
  noop,
  when
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/scroll_view/consts.js
var DIRECTION_VERTICAL = "vertical";
var DIRECTION_HORIZONTAL = "horizontal";
var DIRECTION_BOTH = "both";
var SCROLLABLE_CLASS = "dx-scrollable";
var SCROLLABLE_CONTENT_CLASS = "dx-scrollable-content";
var SCROLLABLE_WRAPPER_CLASS = "dx-scrollable-wrapper";
var SCROLLABLE_CONTAINER_CLASS = "dx-scrollable-container";
var SCROLLABLE_DISABLED_CLASS = "dx-scrollable-disabled";

// node_modules/devextreme/esm/__internal/ui/scroll_view/scrollable.device.js
var deviceDependentOptions = function() {
  return [{
    device: () => !m_support_default.nativeScrolling,
    options: {
      useNative: false
    }
  }, {
    device: (device) => !devices_default.isSimulator() && "desktop" === devices_default.real().deviceType && "generic" === device.platform,
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: m_support_default.touch,
      showScrollbar: "onHover"
    }
  }];
};

// node_modules/devextreme/esm/__internal/ui/scroll_view/scrollbar.js
var SCROLLBAR = "dxScrollbar";
var HOVER_ENABLED_STATE = "dx-scrollbar-hoverable";
var HORIZONTAL = "horizontal";
var activeScrollbar = null;
var Scrollbar = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      visible: false,
      activeStateEnabled: false,
      visibilityMode: "onScroll",
      containerSize: 0,
      contentSize: 0,
      expandable: true,
      scaleRatio: 1
    });
  }
  _init() {
    super._init();
    this._isHovered = false;
  }
  _initMarkup() {
    this._renderThumb();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderDirection();
    this._update();
    this._attachPointerDownHandler();
    this.option("hoverStateEnabled", this._isHoverMode());
    const {
      hoverStateEnabled
    } = this.option();
    this.$element().toggleClass(HOVER_ENABLED_STATE, hoverStateEnabled);
  }
  _renderThumb() {
    this._$thumb = renderer_default("<div>").addClass("dx-scrollable-scroll");
    renderer_default("<div>").addClass("dx-scrollable-scroll-content").appendTo(this._$thumb);
    this.$element().addClass("dx-scrollable-scrollbar").append(this._$thumb);
  }
  isThumb($element) {
    return !!this.$element().find($element).length;
  }
  _isHoverMode() {
    const {
      visibilityMode,
      expandable
    } = this.option();
    return ("onHover" === visibilityMode || "always" === visibilityMode) && expandable;
  }
  _renderDirection() {
    const {
      direction
    } = this.option();
    this.$element().addClass(`dx-scrollbar-${direction}`);
    this._dimension = direction === HORIZONTAL ? "width" : "height";
    this._prop = direction === HORIZONTAL ? "left" : "top";
  }
  _attachPointerDownHandler() {
    m_events_engine_default.on(this._$thumb, addNamespace(m_pointer_default.down, SCROLLBAR), this.feedbackOn.bind(this));
  }
  feedbackOn(e) {
    null === e || void 0 === e || e.preventDefault();
    this.$element().addClass("dx-scrollable-scrollbar-active");
    activeScrollbar = this;
  }
  feedbackOff() {
    this.$element().removeClass("dx-scrollable-scrollbar-active");
    activeScrollbar = null;
  }
  cursorEnter() {
    this._isHovered = true;
    if (this._needScrollbar()) {
      this.option("visible", true);
    }
  }
  cursorLeave() {
    this._isHovered = false;
    this.option("visible", false);
  }
  _renderDimensions() {
    this._$thumb.css({
      width: this.option("width"),
      height: this.option("height")
    });
  }
  _toggleVisibility(visible) {
    const {
      visibilityMode
    } = this.option();
    if ("onScroll" === visibilityMode) {
      this._$thumb.css("opacity");
    }
    const adjustedVisible = this._adjustVisibility(visible);
    this.option().visible = adjustedVisible;
    this._$thumb.toggleClass("dx-state-invisible", !adjustedVisible);
  }
  _adjustVisibility(visible) {
    if (this._baseContainerToContentRatio && !this._needScrollbar()) {
      return false;
    }
    const {
      visibilityMode
    } = this.option();
    let adjustedVisible = visible;
    switch (visibilityMode) {
      case "onScroll":
      default:
        break;
      case "onHover":
        adjustedVisible = adjustedVisible || !!this._isHovered;
        break;
      case "never":
        adjustedVisible = false;
        break;
      case "always":
        adjustedVisible = true;
    }
    return adjustedVisible;
  }
  moveTo(location) {
    if (this._isAlwaysHidden()) {
      return;
    }
    let normalizedLocation = location;
    if (isPlainObject(location)) {
      normalizedLocation = location[this._prop] || 0;
    }
    const scrollBarLocation = {};
    scrollBarLocation[this._prop] = this._calculateScrollBarPosition(normalizedLocation);
    move(this._$thumb, scrollBarLocation);
  }
  _calculateScrollBarPosition(location) {
    return -location * this._thumbRatio;
  }
  _getSizes() {
    const {
      containerSize,
      contentSize,
      baseContainerSize,
      baseContentSize
    } = this.option();
    return {
      containerSize: Math.round(containerSize),
      contentSize: Math.round(contentSize),
      baseContainerSize: Math.round(baseContainerSize),
      baseContentSize: Math.round(baseContentSize)
    };
  }
  _update() {
    const {
      containerSize,
      contentSize
    } = this._getSizes();
    let {
      baseContainerSize,
      baseContentSize
    } = this._getSizes();
    if (isNaN(baseContainerSize)) {
      baseContainerSize = containerSize;
      baseContentSize = contentSize;
    }
    const {
      scaleRatio
    } = this.option();
    this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
    this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
    const thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), 15));
    this._thumbRatio = (containerSize - thumbSize) / (scaleRatio * (contentSize - containerSize));
    this.option(this._dimension, thumbSize / scaleRatio);
    this.$element().css("display", this._needScrollbar() ? "" : "none");
  }
  _isAlwaysHidden() {
    const {
      visibilityMode
    } = this.option();
    return "never" === visibilityMode;
  }
  _needScrollbar() {
    return !this._isAlwaysHidden() && this._baseContainerToContentRatio < 1;
  }
  containerToContentRatio() {
    return this._realContainerToContentRatio;
  }
  _normalizeSize(size) {
    return isPlainObject(size) ? size[this._dimension] || 0 : size;
  }
  _clean() {
    super._clean();
    if (this === activeScrollbar) {
      activeScrollbar = null;
    }
    m_events_engine_default.off(this._$thumb, `.${SCROLLBAR}`);
  }
  _optionChanged(args) {
    if (this._isAlwaysHidden()) {
      return;
    }
    const {
      name,
      value
    } = args;
    switch (name) {
      case "containerSize":
      case "contentSize":
        this.option()[name] = this._normalizeSize(value);
        this._update();
        break;
      case "baseContentSize":
      case "baseContainerSize":
      case "scaleRatio":
        this._update();
        break;
      case "visibilityMode":
      case "direction":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  update() {
    deferRenderer((() => {
      if (this._adjustVisibility()) {
        this.option("visible", true);
      }
    }))();
  }
};
ready_callbacks_default.add((() => {
  m_events_engine_default.subscribeGlobal(dom_adapter_default.getDocument(), addNamespace(m_pointer_default.up, SCROLLBAR), (() => {
    if (activeScrollbar) {
      activeScrollbar.feedbackOff();
    }
  }));
}));
var scrollbar_default = Scrollbar;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scrollable.native.js
var SCROLLABLE_NATIVE = "dxNativeScrollable";
var SCROLLABLE_SCROLLBAR_SIMULATED = "dx-scrollable-scrollbar-simulated";
var SCROLLABLE_SCROLLBARS_HIDDEN = "dx-scrollable-scrollbars-hidden";
var VERTICAL = "vertical";
var HORIZONTAL2 = "horizontal";
var NativeStrategy = class {
  constructor(scrollable) {
    this._init(scrollable);
  }
  _init(scrollable) {
    this._component = scrollable;
    this._$element = scrollable.$element();
    this._$container = renderer_default(scrollable.container());
    this._$content = scrollable.$content();
    const {
      direction,
      useSimulatedScrollbar
    } = scrollable.option();
    this._direction = direction;
    this._useSimulatedScrollbar = useSimulatedScrollbar;
    this.option = scrollable.option.bind(scrollable);
    this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
    this._isLocked = scrollable._isLocked.bind(scrollable);
    this._isDirection = scrollable._isDirection.bind(scrollable);
    this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
    this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
    this._isRtlNativeStrategy = scrollable._isRtlNativeStrategy.bind(scrollable);
  }
  render() {
    const device = devices_default.real();
    const deviceType = device.platform;
    this._$element.addClass("dx-scrollable-native").addClass(`dx-scrollable-native-${deviceType}`).toggleClass(SCROLLABLE_SCROLLBARS_HIDDEN, !this._isScrollbarVisible());
    if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
      this._renderScrollbars();
    }
  }
  updateRtlPosition(isFirstRender) {
    const {
      rtlEnabled
    } = this.option();
    if (isFirstRender && rtlEnabled) {
      if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
        this._moveScrollbars();
      }
    }
  }
  _renderScrollbars() {
    this._scrollbars = {};
    this._hideScrollbarTimeout = 0;
    this._$element.addClass(SCROLLABLE_SCROLLBAR_SIMULATED);
    this._renderScrollbar(VERTICAL);
    this._renderScrollbar(HORIZONTAL2);
  }
  _renderScrollbar(direction) {
    if (!this._isDirection(direction)) {
      return;
    }
    const {
      scrollByThumb
    } = this.option();
    this._scrollbars[direction] = new scrollbar_default(renderer_default("<div>").appendTo(this._$element), {
      direction,
      expandable: scrollByThumb
    });
  }
  handleInit(e) {
  }
  handleStart() {
  }
  handleMove(e) {
    if (this._isLocked()) {
      e.cancel = true;
      return;
    }
    if (this._allowedDirection()) {
      e.originalEvent.isScrollingEvent = true;
    }
  }
  handleEnd() {
  }
  handleCancel() {
  }
  handleStop() {
  }
  _eachScrollbar(callback) {
    each(this._scrollbars || {}, ((direction, scrollbar) => {
      callback(scrollbar, direction);
    }));
  }
  createActions() {
    this._scrollAction = this._createActionByOption("onScroll");
    this._updateAction = this._createActionByOption("onUpdated");
  }
  _createActionArgs() {
    const {
      left,
      top
    } = this.location();
    return {
      event: this._eventForUserAction,
      scrollOffset: this._getScrollOffset(),
      reachedLeft: this._isRtlNativeStrategy() ? this._isReachedRight(-left) : this._isReachedLeft(left),
      reachedRight: this._isRtlNativeStrategy() ? this._isReachedLeft(-Math.abs(left)) : this._isReachedRight(left),
      reachedTop: this._isDirection(VERTICAL) ? Math.round(top) >= 0 : void 0,
      reachedBottom: this._isDirection(VERTICAL) ? Math.round(Math.abs(top) - this._getMaxOffset().top) >= 0 : void 0
    };
  }
  _getScrollOffset() {
    const {
      top,
      left
    } = this.location();
    return {
      top: -top,
      left: this._normalizeOffsetLeft(-left)
    };
  }
  _normalizeOffsetLeft(scrollLeft) {
    if (this._isRtlNativeStrategy()) {
      return this._getMaxOffset().left + scrollLeft;
    }
    return scrollLeft;
  }
  _isReachedLeft(left) {
    return this._isDirection(HORIZONTAL2) ? Math.round(left) >= 0 : void 0;
  }
  _isReachedRight(left) {
    return this._isDirection(HORIZONTAL2) ? Math.round(Math.abs(left) - this._getMaxOffset().left) >= 0 : void 0;
  }
  _isScrollbarVisible() {
    const showScrollbar = this.option("showScrollbar");
    return "never" !== showScrollbar && false !== showScrollbar;
  }
  handleScroll(e) {
    var _this$_scrollAction;
    this._eventForUserAction = e;
    this._moveScrollbars();
    null === (_this$_scrollAction = this._scrollAction) || void 0 === _this$_scrollAction || _this$_scrollAction.call(this, this._createActionArgs());
  }
  _moveScrollbars() {
    const {
      top,
      left
    } = this._getScrollOffset();
    this._eachScrollbar(((scrollbar) => {
      scrollbar.moveTo({
        top: -top,
        left: -left
      });
      scrollbar.option("visible", true);
    }));
    this._hideScrollbars();
  }
  _hideScrollbars() {
    clearTimeout(this._hideScrollbarTimeout);
    this._hideScrollbarTimeout = setTimeout((() => {
      this._eachScrollbar(((scrollbar) => {
        scrollbar.option("visible", false);
      }));
    }), 500);
  }
  location() {
    return {
      left: -this._$container.scrollLeft(),
      top: -this._$container.scrollTop()
    };
  }
  disabledChanged() {
  }
  update() {
    this._update();
    this._updateAction(this._createActionArgs());
  }
  _update() {
    this._updateDimensions();
    this._updateScrollbars();
  }
  _updateDimensions() {
    this._containerSize = {
      height: getHeight(this._$container),
      width: getWidth(this._$container)
    };
    this._componentContentSize = {
      height: getHeight(this._component.$content()),
      width: getWidth(this._component.$content())
    };
    this._contentSize = {
      height: getHeight(this._$content),
      width: getWidth(this._$content)
    };
  }
  _updateScrollbars() {
    this._eachScrollbar(((scrollbar, direction) => {
      const dimension = direction === VERTICAL ? "height" : "width";
      scrollbar.option({
        containerSize: this._containerSize[dimension],
        contentSize: this._componentContentSize[dimension]
      });
      scrollbar.update();
    }));
  }
  _prepareDirections() {
  }
  _allowedDirections() {
    return {
      vertical: this._isDirection(VERTICAL) && this._contentSize.height > this._containerSize.height,
      horizontal: this._isDirection(HORIZONTAL2) && this._contentSize.width > this._containerSize.width
    };
  }
  dispose() {
    const {
      className
    } = this._$element.get(0);
    const scrollableNativeRegexp = new RegExp("dx-scrollable-native\\S*", "g");
    if (scrollableNativeRegexp.test(className)) {
      const matches = className.match(scrollableNativeRegexp);
      if (matches) {
        this._$element.removeClass(matches.join(" "));
      }
    }
    m_events_engine_default.off(this._$element, `.${SCROLLABLE_NATIVE}`);
    m_events_engine_default.off(this._$container, `.${SCROLLABLE_NATIVE}`);
    this._removeScrollbars();
    clearTimeout(this._hideScrollbarTimeout);
  }
  _removeScrollbars() {
    this._eachScrollbar(((scrollbar) => {
      scrollbar.$element().remove();
    }));
  }
  scrollBy(distance) {
    const location = this.location();
    this._$container.scrollTop(Math.round(-location.top - distance.top));
    this._$container.scrollLeft(Math.round(-location.left - distance.left));
  }
  validate(e) {
    const {
      disabled
    } = this.option();
    if (disabled) {
      return false;
    }
    if (isDxMouseWheelEvent(e) && this._isScrolledInMaxDirection(e)) {
      return false;
    }
    return !!this._allowedDirection();
  }
  _isScrolledInMaxDirection(e) {
    const container = this._$container.get(0);
    let result = false;
    if (e.delta > 0) {
      result = e.shiftKey ? !container.scrollLeft : !container.scrollTop;
    } else if (e.shiftKey) {
      result = container.scrollLeft >= this._getMaxOffset().left;
    } else {
      result = container.scrollTop >= this._getMaxOffset().top;
    }
    return result;
  }
  getDirection() {
    return this._allowedDirection();
  }
};
var scrollable_native_default = NativeStrategy;

// node_modules/devextreme/esm/__internal/ui/scroll_view/animator.js
var Animator = class {
  constructor() {
    this._finished = true;
    this._stopped = false;
    this._proxiedStepCore = this._stepCore.bind(this);
  }
  start() {
    this._stopped = false;
    this._finished = false;
    this._stepCore();
  }
  stop() {
    this._stopped = true;
    cancelAnimationFrame(this._stepAnimationFrame);
  }
  _stepCore() {
    if (this._isStopped()) {
      this._stop();
      return;
    }
    if (this._isFinished()) {
      this._finished = true;
      this._complete();
      return;
    }
    this._step();
    this._stepAnimationFrame = requestAnimationFrame(this._proxiedStepCore);
  }
  _step() {
    class_default.abstract();
  }
  _isFinished() {
    return this._finished;
  }
  _stop() {
  }
  _complete() {
  }
  _isStopped() {
    return this._stopped;
  }
  inProgress() {
    return !(this._stopped || this._finished);
  }
};
var animator_default = Animator;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scrollable.simulated.js
var SCROLLABLE_SIMULATED = "dxSimulatedScrollable";
var SCROLLABLE_STRATEGY = "dxScrollableStrategy";
var SCROLLABLE_SIMULATED_CURSOR = `${SCROLLABLE_SIMULATED}Cursor`;
var SCROLLABLE_SIMULATED_KEYBOARD = `${SCROLLABLE_SIMULATED}Keyboard`;
var SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = "dx-scrollable-scrollbars-alwaysvisible";
var VERTICAL2 = "vertical";
var HORIZONTAL3 = "horizontal";
var FRAME_DURATION = Math.round(1e3 / 60);
var BOUNCE_FRAMES = 400 / FRAME_DURATION;
var BOUNCE_ACCELERATION_SUM = (1 - 0.92 ** BOUNCE_FRAMES) / (1 - 0.92);
var KEY_CODES = {
  PAGE_UP: "pageUp",
  PAGE_DOWN: "pageDown",
  END: "end",
  HOME: "home",
  LEFT: "leftArrow",
  UP: "upArrow",
  RIGHT: "rightArrow",
  DOWN: "downArrow",
  TAB: "tab"
};
var InertiaAnimator = class extends animator_default {
  constructor(scroller) {
    super();
    this.VELOCITY_LIMIT = 1;
    this.scroller = scroller;
  }
  _isFinished() {
    return Math.abs(this.scroller._velocity) <= this.VELOCITY_LIMIT;
  }
  _step() {
    this.scroller._scrollStep(this.scroller._velocity);
    this.scroller._velocity *= this._acceleration();
  }
  _acceleration() {
    return this.scroller._inBounds() ? 0.92 : 0.5;
  }
  _complete() {
    this.scroller._scrollComplete();
  }
};
var BounceAnimator = class extends InertiaAnimator {
  constructor() {
    super(...arguments);
    this.VELOCITY_LIMIT = 0.2;
  }
  _isFinished() {
    return this.scroller._crossBoundOnNextStep() || super._isFinished();
  }
  _acceleration() {
    return 0.92;
  }
  _complete() {
    this.scroller._move(this.scroller._bounceLocation);
    super._complete();
  }
};
var Scroller = class {
  constructor(options) {
    this._initOptions(options);
    this._initAnimators();
    this._initScrollbar();
  }
  _initOptions(options) {
    this._location = 0;
    this._topReached = false;
    this._bottomReached = false;
    this._axis = options.direction === HORIZONTAL3 ? "x" : "y";
    this._prop = options.direction === HORIZONTAL3 ? "left" : "top";
    this._dimension = options.direction === HORIZONTAL3 ? "width" : "height";
    this._scrollProp = options.direction === HORIZONTAL3 ? "scrollLeft" : "scrollTop";
    each(options, ((optionName, optionValue) => {
      this[`_${optionName}`] = optionValue;
    }));
  }
  _initAnimators() {
    this._inertiaAnimator = new InertiaAnimator(this);
    this._bounceAnimator = new BounceAnimator(this);
  }
  _initScrollbar() {
    this._scrollbar = new scrollbar_default(renderer_default("<div>").appendTo(this._$container), {
      direction: this._direction,
      visible: this._scrollByThumb,
      visibilityMode: this._visibilityModeNormalize(this._scrollbarVisible),
      expandable: this._scrollByThumb
    });
    this._$scrollbar = this._scrollbar.$element();
  }
  _visibilityModeNormalize(mode) {
    if (true === mode) {
      return "onScroll";
    }
    if (false === mode) {
      return "never";
    }
    return mode ?? "never";
  }
  _scrollStep(delta) {
    const prevLocation = this._location;
    this._location += delta;
    this._suppressBounce();
    this._move();
    if (Math.abs(prevLocation - this._location) < 1) {
      return;
    }
    m_events_engine_default.triggerHandler(this._$container, {
      type: "scroll"
    });
  }
  _suppressBounce() {
    if (this._bounceEnabled || this._inBounds(this._location)) {
      return;
    }
    this._velocity = 0;
    this._location = this._boundLocation();
  }
  _boundLocation(location) {
    const actualLocation = location ?? this._location;
    return Math.max(Math.min(actualLocation, this._maxOffset), this._minOffset);
  }
  _move(location) {
    this._location = void 0 !== location ? location * this._getScaleRatio() : this._location;
    this._moveContent();
    this._moveScrollbar();
  }
  _moveContent() {
    const location = this._location;
    this._$container[this._scrollProp](-location / this._getScaleRatio());
    this._moveContentByTranslator(location);
  }
  _getScaleRatio() {
    if (hasWindow() && !this._scaleRatio) {
      const element = this._$element[0];
      const dimension = this._dimension;
      const realDimension = this._getRealDimension(element, dimension);
      const baseDimension = this._getBaseDimension(element, dimension);
      this._scaleRatio = Math.round(realDimension / baseDimension * 100) / 100;
    }
    return this._scaleRatio || 1;
  }
  _getRealDimension(element, dimension) {
    return Math.round(getBoundingRect(element)[dimension]);
  }
  _getBaseDimension(element, dimension) {
    const dimensionName = `offset${titleize(dimension)}`;
    return element[dimensionName];
  }
  _moveContentByTranslator(location) {
    let translateOffset;
    const minOffset = -this._maxScrollPropValue;
    if (location > 0) {
      translateOffset = location;
    }
    if (location <= minOffset) {
      translateOffset = location - minOffset;
    }
    if (this._translateOffset === translateOffset) {
      return;
    }
    const targetLocation = {};
    targetLocation[this._prop] = translateOffset;
    this._translateOffset = translateOffset;
    if (!translateOffset) {
      resetPosition(this._$content);
      return;
    }
    move(this._$content, targetLocation);
  }
  _moveScrollbar() {
    this._scrollbar.moveTo(this._location);
  }
  _scrollComplete() {
    if (this._inBounds()) {
      this._hideScrollbar();
      if (this._completeDeferred) {
        this._completeDeferred.resolve();
      }
    }
    this._scrollToBounds();
  }
  _scrollToBounds() {
    var _this$_bounceAction;
    if (this._inBounds()) {
      return;
    }
    null === (_this$_bounceAction = this._bounceAction) || void 0 === _this$_bounceAction || _this$_bounceAction.call(this);
    this._setupBounce();
    this._bounceAnimator.start();
  }
  _setupBounce() {
    this._bounceLocation = this._boundLocation();
    const bounceDistance = this._bounceLocation - this._location;
    this._velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  }
  _inBounds(location) {
    const currentLocation = location ?? this._location;
    return this._boundLocation(currentLocation) === currentLocation;
  }
  _crossBoundOnNextStep() {
    const location = this._location;
    const nextLocation = location + this._velocity;
    return location < this._minOffset && nextLocation >= this._minOffset || location > this._maxOffset && nextLocation <= this._maxOffset;
  }
  _initHandler(e) {
    this._stopScrolling();
    this._prepareThumbScrolling(e);
  }
  _stopScrolling() {
    deferRenderer((() => {
      this._hideScrollbar();
      this._inertiaAnimator.stop();
      this._bounceAnimator.stop();
    }))();
  }
  _prepareThumbScrolling(e) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      return;
    }
    const $target = renderer_default(e.originalEvent.target);
    const scrollbarClicked = this._isScrollbar($target);
    if (scrollbarClicked) {
      this._moveToMouseLocation(e);
    }
    this._thumbScrolling = scrollbarClicked || this._isThumb($target);
    this._crossThumbScrolling = !this._thumbScrolling && this._isAnyThumbScrolling($target);
    if (this._thumbScrolling) {
      this._scrollbar.feedbackOn();
    }
  }
  _isThumbScrollingHandler($target) {
    return this._isThumb($target);
  }
  _moveToMouseLocation(e) {
    const mouseLocation = e[`page${this._axis.toUpperCase()}`] - this._$element.offset()[this._prop];
    const location = this._location + mouseLocation / this._containerToContentRatio() - getHeight(this._$container) / 2;
    this._scrollStep(-Math.round(location));
  }
  _startHandler() {
    this._showScrollbar();
  }
  _moveHandler(delta) {
    if (this._crossThumbScrolling) {
      return;
    }
    if (this._thumbScrolling) {
      delta[this._axis] = -Math.round(delta[this._axis] / this._containerToContentRatio());
    }
    this._scrollBy(delta);
  }
  _scrollBy(delta) {
    let scrollDelta = delta[this._axis];
    if (!this._inBounds()) {
      scrollDelta *= 0.5;
    }
    this._scrollStep(scrollDelta);
  }
  _scrollByHandler(delta) {
    if (!delta.x && !delta.y) {
      return;
    }
    this._scrollBy(delta);
    this._scrollComplete();
  }
  _containerToContentRatio() {
    return this._scrollbar.containerToContentRatio();
  }
  _endHandler(velocity) {
    this._completeDeferred = Deferred();
    this._velocity = velocity[this._axis];
    this._inertiaHandler();
    this._resetThumbScrolling();
    return this._completeDeferred.promise();
  }
  _inertiaHandler() {
    this._suppressInertia();
    this._inertiaAnimator.start();
  }
  _suppressInertia() {
    if (!this._inertiaEnabled || this._thumbScrolling) {
      this._velocity = 0;
    }
  }
  _resetThumbScrolling() {
    this._thumbScrolling = false;
    this._crossThumbScrolling = false;
  }
  _stopHandler() {
    if (this._thumbScrolling) {
      this._scrollComplete();
    }
    this._resetThumbScrolling();
    this._scrollToBounds();
  }
  _disposeHandler() {
    this._stopScrolling();
    this._$scrollbar.remove();
  }
  _updateHandler() {
    this._update();
    this._moveToBounds();
  }
  _update() {
    this._stopScrolling();
    return deferUpdate((() => {
      this._resetScaleRatio();
      this._updateLocation();
      this._updateBounds();
      this._updateScrollbar();
      return deferRender((() => {
        this._moveScrollbar();
        this._scrollbar.update();
      }));
    }));
  }
  _resetScaleRatio() {
    this._scaleRatio = null;
  }
  _updateLocation() {
    this._location = (locate(this._$content)[this._prop] - this._$container[this._scrollProp]()) * this._getScaleRatio();
  }
  _updateBounds() {
    this._maxOffset = this._getMaxOffset();
    this._minOffset = this._getMinOffset();
  }
  _getMaxOffset() {
    return 0;
  }
  _getMinOffset() {
    this._maxScrollPropValue = Math.max(this._contentSize() - this._containerSize(), 0);
    return -this._maxScrollPropValue;
  }
  _updateScrollbar() {
    deferUpdater((() => {
      const containerSize = this._containerSize();
      const contentSize = this._contentSize();
      const dimension = this._dimension;
      const baseContainerSize = this._getBaseDimension(this._$container[0], dimension);
      const baseContentSize = this._getBaseDimension(this._$content[0], dimension);
      deferRender((() => {
        this._scrollbar.option({
          containerSize,
          contentSize,
          baseContainerSize,
          baseContentSize,
          scaleRatio: this._getScaleRatio()
        });
      }));
    }))();
  }
  _moveToBounds() {
    deferRenderer(deferUpdater(deferRenderer((() => {
      const location = this._boundLocation();
      const locationChanged = location !== this._location;
      this._location = location;
      this._move();
      if (locationChanged) {
        var _this$_scrollAction;
        null === (_this$_scrollAction = this._scrollAction) || void 0 === _this$_scrollAction || _this$_scrollAction.call(this);
      }
    }))))();
  }
  _createActionsHandler(actions) {
    this._scrollAction = actions.scroll;
    this._bounceAction = actions.bounce;
  }
  _showScrollbar() {
    this._scrollbar.option("visible", true);
  }
  _hideScrollbar() {
    this._scrollbar.option("visible", false);
  }
  _containerSize() {
    return this._getRealDimension(this._$container.get(0), this._dimension);
  }
  _contentSize() {
    const isOverflowHidden = "hidden" === this._$content.css(`overflow${this._axis.toUpperCase()}`);
    let contentSize = this._getRealDimension(this._$content.get(0), this._dimension);
    if (!isOverflowHidden) {
      const containerScrollSize = this._$content[0][`scroll${titleize(this._dimension)}`] * this._getScaleRatio();
      contentSize = Math.max(containerScrollSize, contentSize);
    }
    return contentSize;
  }
  _validateEvent(e) {
    const $target = renderer_default(e.originalEvent.target);
    return this._isThumb($target) || this._isScrollbar($target);
  }
  _isThumb($element) {
    return this._scrollByThumb && this._scrollbar.isThumb($element);
  }
  _isScrollbar($element) {
    return Boolean(this._scrollByThumb && (null === $element || void 0 === $element ? void 0 : $element.is(this._$scrollbar)));
  }
  _reachedMin() {
    return Math.round(this._location - this._minOffset) <= 0;
  }
  _reachedMax() {
    return Math.round(this._location - this._maxOffset) >= 0;
  }
  _cursorEnterHandler() {
    this._resetScaleRatio();
    this._updateScrollbar();
    this._scrollbar.cursorEnter();
  }
  _cursorLeaveHandler() {
    this._scrollbar.cursorLeave();
  }
  isBottomReached() {
    return false;
  }
  dispose() {
  }
};
var hoveredScrollable = null;
var activeScrollable = null;
var SimulatedStrategy = class {
  constructor(scrollable) {
    this._init(scrollable);
  }
  _init(scrollable) {
    this._component = scrollable;
    this._$element = scrollable.$element();
    this._$container = renderer_default(scrollable.container());
    this._$wrapper = scrollable._$wrapper;
    this._$content = scrollable.$content();
    this.option = scrollable.option.bind(scrollable);
    this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
    this._isLocked = scrollable._isLocked.bind(scrollable);
    this._isDirection = scrollable._isDirection.bind(scrollable);
    this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
    this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
  }
  render() {
    this._$element.addClass("dx-scrollable-simulated");
    this._createScrollers();
    const {
      useKeyboard
    } = this.option();
    if (useKeyboard) {
      this._$container.prop("tabIndex", 0);
    }
    this._attachKeyboardHandler();
    this._attachCursorHandlers();
  }
  _createScrollers() {
    this._scrollers = {};
    if (this._isDirection(HORIZONTAL3)) {
      this._createScroller(HORIZONTAL3);
    }
    if (this._isDirection(VERTICAL2)) {
      this._createScroller(VERTICAL2);
    }
    this._$element.toggleClass(SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, "always" === this.option("showScrollbar"));
  }
  _createScroller(direction) {
    this._scrollers[direction] = new Scroller(this._scrollerOptions(direction));
  }
  _scrollerOptions(direction) {
    return {
      direction,
      $content: this._$content,
      $container: this._$container,
      $wrapper: this._$wrapper,
      $element: this._$element,
      scrollByThumb: this.option("scrollByThumb"),
      scrollbarVisible: this.option("showScrollbar"),
      bounceEnabled: this.option("bounceEnabled"),
      inertiaEnabled: this.option("inertiaEnabled"),
      isAnyThumbScrolling: this._isAnyThumbScrolling.bind(this)
    };
  }
  _applyScaleRatio(targetLocation) {
    for (const direction in this._scrollers) {
      const prop = this._getPropByDirection(direction);
      if (isDefined(targetLocation[prop])) {
        const scroller = this._scrollers[direction];
        const currentValue = targetLocation[prop];
        if (void 0 !== currentValue) {
          targetLocation[prop] = currentValue * scroller._getScaleRatio();
        }
      }
    }
    return targetLocation;
  }
  _isAnyThumbScrolling($target) {
    let result = false;
    this._eventHandler("isThumbScrolling", $target).done(((isThumbScrollingVertical, isThumbScrollingHorizontal) => {
      result = isThumbScrollingVertical || isThumbScrollingHorizontal;
    }));
    return result;
  }
  handleInit(e) {
    this._suppressDirections(e);
    this._eventForUserAction = e;
    this._eventHandler("init", e);
  }
  _suppressDirections(e) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      this._prepareDirections(true);
      return;
    }
    this._prepareDirections();
    this._eachScroller((function(scroller, direction) {
      const $target = renderer_default(e.originalEvent.target);
      const isValid = scroller._validateEvent(e) || this.option("scrollByContent") && this._isContent($target);
      this._validDirections[direction] = isValid;
    }));
  }
  _isContent($element) {
    return !!$element.closest(this._$element).length;
  }
  _prepareDirections() {
    let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    this._validDirections = {};
    this._validDirections[HORIZONTAL3] = value;
    this._validDirections[VERTICAL2] = value;
  }
  _eachScroller(callback) {
    const boundCallback = callback.bind(this);
    each(this._scrollers, ((direction, scroller) => {
      boundCallback(scroller, direction);
    }));
  }
  handleStart(e) {
    this._eventForUserAction = e;
    this._eventHandler("start").done(this._startAction);
  }
  _saveActive() {
    activeScrollable = this;
  }
  _resetActive() {
    if (activeScrollable === this) {
      activeScrollable = null;
    }
  }
  handleMove(e) {
    var _e$preventDefault;
    if (this._isLocked()) {
      e.cancel = true;
      this._resetActive();
      return;
    }
    this._saveActive();
    null === (_e$preventDefault = e.preventDefault) || void 0 === _e$preventDefault || _e$preventDefault.call(e);
    this._adjustDistance(e, e.delta);
    this._eventForUserAction = e;
    this._eventHandler("move", e.delta);
  }
  _adjustDistance(e, distance) {
    distance.x *= this._validDirections[HORIZONTAL3];
    distance.y *= this._validDirections[VERTICAL2];
    const devicePixelRatio = this._tryGetDevicePixelRatio();
    if (devicePixelRatio && isDxMouseWheelEvent(e.originalEvent)) {
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }
  _tryGetDevicePixelRatio() {
    if (hasWindow()) {
      return getWindow().devicePixelRatio;
    }
    return;
  }
  handleEnd(e) {
    var _e$originalEvent;
    this._resetActive();
    this._refreshCursorState((null === (_e$originalEvent = e.originalEvent) || void 0 === _e$originalEvent ? void 0 : _e$originalEvent.target) ?? void 0);
    this._adjustDistance(e, e.velocity);
    this._eventForUserAction = e;
    return this._eventHandler("end", e.velocity).done(this._endAction);
  }
  handleCancel(e) {
    this._resetActive();
    this._eventForUserAction = e;
    return this._eventHandler("end", {
      x: 0,
      y: 0
    });
  }
  handleStop() {
    this._resetActive();
    this._eventHandler("stop");
  }
  handleScroll() {
    var _this$_scrollAction2;
    this._updateRtlConfig();
    null === (_this$_scrollAction2 = this._scrollAction) || void 0 === _this$_scrollAction2 || _this$_scrollAction2.call(this);
  }
  _attachKeyboardHandler() {
    m_events_engine_default.off(this._$element, `.${SCROLLABLE_SIMULATED_KEYBOARD}`);
    if (!this.option("disabled") && this.option("useKeyboard")) {
      m_events_engine_default.on(this._$element, addNamespace("keydown", SCROLLABLE_SIMULATED_KEYBOARD), this._keyDownHandler.bind(this));
    }
  }
  _keyDownHandler(e) {
    clearTimeout(this._updateHandlerTimeout);
    this._updateHandlerTimeout = setTimeout((() => {
      if (normalizeKeyName(e) === KEY_CODES.TAB) {
        this._eachScroller(((scroller) => {
          scroller._updateHandler();
        }));
      }
    }));
    if (!this._$container.is(dom_adapter_default.getActiveElement(this._$container.get(0)))) {
      return;
    }
    let handled = true;
    switch (normalizeKeyName(e)) {
      case KEY_CODES.DOWN:
        this._scrollByLine({
          y: 1
        });
        break;
      case KEY_CODES.UP:
        this._scrollByLine({
          y: -1
        });
        break;
      case KEY_CODES.RIGHT:
        this._scrollByLine({
          x: 1
        });
        break;
      case KEY_CODES.LEFT:
        this._scrollByLine({
          x: -1
        });
        break;
      case KEY_CODES.PAGE_DOWN:
        this._scrollByPage(1);
        break;
      case KEY_CODES.PAGE_UP:
        this._scrollByPage(-1);
        break;
      case KEY_CODES.HOME:
        this._scrollToHome();
        break;
      case KEY_CODES.END:
        this._scrollToEnd();
        break;
      default:
        handled = false;
    }
    if (handled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  _scrollByLine(lines) {
    const devicePixelRatio = this._tryGetDevicePixelRatio();
    let scrollOffset = 40;
    if (devicePixelRatio) {
      scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100;
    }
    this.scrollBy({
      top: (lines.y ?? 0) * -scrollOffset,
      left: (lines.x ?? 0) * -scrollOffset
    });
  }
  _scrollByPage(page) {
    const prop = this._wheelProp();
    const dimension = this._dimensionByProp(prop);
    const distance = {};
    const getter = "width" === dimension ? getWidth : getHeight;
    distance[prop] = page * -getter(this._$container);
    this.scrollBy(distance);
  }
  _dimensionByProp(prop) {
    return "left" === prop ? "width" : "height";
  }
  _getPropByDirection(direction) {
    return direction === HORIZONTAL3 ? "left" : "top";
  }
  _scrollToHome() {
    const prop = this._wheelProp();
    const distance = {};
    distance[prop] = 0;
    this._component.scrollTo(distance);
  }
  _scrollToEnd() {
    const prop = this._wheelProp();
    const dimension = this._dimensionByProp(prop);
    const distance = {};
    const getter = "width" === dimension ? getWidth : getHeight;
    distance[prop] = getter(this._$content) - getter(this._$container);
    this._component.scrollTo(distance);
  }
  createActions() {
    this._startAction = this._createActionHandler("onStart");
    this._endAction = this._createActionHandler("onEnd");
    this._updateAction = this._createActionHandler("onUpdated");
    this._createScrollerActions();
  }
  _createScrollerActions() {
    this._scrollAction = this._createActionHandler("onScroll");
    this._bounceAction = this._createActionHandler("onBounce");
    this._eventHandler("createActions", {
      scroll: this._scrollAction,
      bounce: this._bounceAction
    });
  }
  _createActionHandler(optionName) {
    var _this = this;
    const actionHandler = this._createActionByOption(optionName);
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      actionHandler(extend(_this._createActionArgs(), args));
    };
  }
  _createActionArgs() {
    const {
      horizontal: scrollerX,
      vertical: scrollerY
    } = this._scrollers;
    const offset = this._getScrollOffset();
    this._scrollOffset = {
      top: scrollerY && offset.top,
      left: scrollerX && offset.left
    };
    return {
      event: this._eventForUserAction,
      scrollOffset: this._scrollOffset,
      reachedLeft: null === scrollerX || void 0 === scrollerX ? void 0 : scrollerX._reachedMax(),
      reachedRight: null === scrollerX || void 0 === scrollerX ? void 0 : scrollerX._reachedMin(),
      reachedTop: null === scrollerY || void 0 === scrollerY ? void 0 : scrollerY._reachedMax(),
      reachedBottom: null === scrollerY || void 0 === scrollerY ? void 0 : scrollerY._reachedMin()
    };
  }
  _getScrollOffset() {
    return {
      top: -this.location().top,
      left: -this.location().left
    };
  }
  _eventHandler(eventName, location) {
    const args = [].slice.call(arguments).slice(1);
    const deferreds = map(this._scrollers, ((scroller) => scroller[`_${eventName}Handler`].apply(scroller, args)));
    return when.apply(renderer_default, deferreds).promise();
  }
  location() {
    const location = locate(this._$content);
    location.top -= this._$container.scrollTop();
    location.left -= this._$container.scrollLeft();
    return location;
  }
  disabledChanged() {
    this._attachCursorHandlers();
  }
  _attachCursorHandlers() {
    m_events_engine_default.off(this._$element, `.${SCROLLABLE_SIMULATED_CURSOR}`);
    const {
      disabled
    } = this.option();
    if (!disabled && this._isHoverMode()) {
      m_events_engine_default.on(this._$element, addNamespace("mouseenter", SCROLLABLE_SIMULATED_CURSOR), this._cursorEnterHandler.bind(this));
      m_events_engine_default.on(this._$element, addNamespace("mouseleave", SCROLLABLE_SIMULATED_CURSOR), this._cursorLeaveHandler.bind(this));
    }
  }
  _isHoverMode() {
    return "onHover" === this.option("showScrollbar");
  }
  _cursorEnterHandler(e) {
    const event = e || {};
    event.originalEvent = event.originalEvent || {};
    if (activeScrollable || event.originalEvent._hoverHandled) {
      return;
    }
    if (hoveredScrollable) {
      hoveredScrollable._cursorLeaveHandler();
    }
    hoveredScrollable = this;
    this._eventHandler("cursorEnter");
    event.originalEvent._hoverHandled = true;
  }
  _cursorLeaveHandler(e) {
    if (hoveredScrollable !== this || activeScrollable === hoveredScrollable) {
      return;
    }
    this._eventHandler("cursorLeave");
    hoveredScrollable = null;
    this._refreshCursorState(null === e || void 0 === e ? void 0 : e.relatedTarget);
  }
  _refreshCursorState(target) {
    if (!this._isHoverMode() && (!target || activeScrollable)) {
      return;
    }
    const $target = renderer_default(target);
    const $scrollable = $target.closest(".dx-scrollable-simulated:not(.dx-state-disabled)");
    const targetScrollable = $scrollable.length && $scrollable.data(SCROLLABLE_STRATEGY);
    if (hoveredScrollable && hoveredScrollable !== targetScrollable) {
      hoveredScrollable._cursorLeaveHandler();
    }
    if (targetScrollable) {
      targetScrollable._cursorEnterHandler();
    }
  }
  update() {
    const result = this._eventHandler("update").done(this._updateAction);
    return when(result, deferUpdate((() => {
      const allowedDirections = this._allowedDirections();
      deferRender((() => {
        let touchDirection = allowedDirections.vertical ? "pan-x" : "";
        touchDirection = allowedDirections.horizontal ? "pan-y" : touchDirection;
        touchDirection = allowedDirections.vertical && allowedDirections.horizontal ? "none" : touchDirection;
        this._$container.css("touchAction", touchDirection);
      }));
      return when().promise();
    })));
  }
  _allowedDirections() {
    const {
      bounceEnabled
    } = this.option();
    const verticalScroller = this._scrollers[VERTICAL2];
    const horizontalScroller = this._scrollers[HORIZONTAL3];
    return {
      vertical: Boolean(verticalScroller && (verticalScroller._minOffset < 0 || bounceEnabled)),
      horizontal: Boolean(horizontalScroller && (horizontalScroller._minOffset < 0 || bounceEnabled))
    };
  }
  _updateBounds() {
    var _this$_scrollers$HORI;
    null === (_this$_scrollers$HORI = this._scrollers[HORIZONTAL3]) || void 0 === _this$_scrollers$HORI || _this$_scrollers$HORI._updateBounds();
  }
  _isHorizontalAndRtlEnabled() {
    return this.option("rtlEnabled") && this.option("direction") !== VERTICAL2;
  }
  updateRtlPosition(needInitializeRtlConfig) {
    if (needInitializeRtlConfig) {
      this._rtlConfig = {
        scrollRight: 0,
        clientWidth: this._$container.get(0).clientWidth,
        windowPixelRatio: this._getWindowDevicePixelRatio()
      };
    }
    this._updateBounds();
    if (this._isHorizontalAndRtlEnabled()) {
      let scrollLeft = this._getMaxOffset().left - this._rtlConfig.scrollRight;
      if (scrollLeft <= 0) {
        scrollLeft = 0;
        this._rtlConfig.scrollRight = this._getMaxOffset().left;
      }
      if (this._getScrollOffset().left !== scrollLeft) {
        this._rtlConfig.skipUpdating = true;
        this._component.scrollTo({
          left: scrollLeft
        });
        this._rtlConfig.skipUpdating = false;
      }
    }
  }
  _updateRtlConfig() {
    if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
      const {
        clientWidth,
        scrollLeft
      } = this._$container.get(0);
      const windowPixelRatio = this._getWindowDevicePixelRatio();
      if (this._rtlConfig.windowPixelRatio === windowPixelRatio && this._rtlConfig.clientWidth === clientWidth) {
        this._rtlConfig.scrollRight = this._getMaxOffset().left - scrollLeft;
      }
      this._rtlConfig.clientWidth = clientWidth;
      this._rtlConfig.windowPixelRatio = windowPixelRatio;
    }
  }
  _getWindowDevicePixelRatio() {
    return hasWindow() ? getWindow().devicePixelRatio : 1;
  }
  scrollBy(distance) {
    var _this$_startAction, _this$_endAction;
    const verticalScroller = this._scrollers[VERTICAL2];
    const horizontalScroller = this._scrollers[HORIZONTAL3];
    if (verticalScroller) {
      distance.top = verticalScroller._boundLocation(distance.top + verticalScroller._location) - verticalScroller._location;
    }
    if (horizontalScroller) {
      distance.left = horizontalScroller._boundLocation(distance.left + horizontalScroller._location) - horizontalScroller._location;
    }
    this._prepareDirections(true);
    null === (_this$_startAction = this._startAction) || void 0 === _this$_startAction || _this$_startAction.call(this);
    this._eventHandler("scrollBy", {
      x: distance.left,
      y: distance.top
    });
    null === (_this$_endAction = this._endAction) || void 0 === _this$_endAction || _this$_endAction.call(this);
    this._updateRtlConfig();
  }
  validate(e) {
    if (isDxMouseWheelEvent(e) && isCommandKeyPressed(e)) {
      return false;
    }
    if (this.option("disabled")) {
      return false;
    }
    if (this.option("bounceEnabled")) {
      return true;
    }
    return isDxMouseWheelEvent(e) ? this._validateWheel(e) : this._validateMove(e);
  }
  _validateWheel(e) {
    const scroller = this._scrollers[this._wheelDirection(e)];
    const reachedMin = scroller._reachedMin();
    const reachedMax = scroller._reachedMax();
    const contentGreaterThanContainer = !reachedMin || !reachedMax;
    const locatedNotAtBound = !reachedMin && !reachedMax;
    const scrollFromMin = reachedMin && e.delta > 0;
    const scrollFromMax = reachedMax && e.delta < 0;
    let validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || void 0 !== this._validateWheelTimer;
    if (validated) {
      clearTimeout(this._validateWheelTimer);
      this._validateWheelTimer = setTimeout((() => {
        this._validateWheelTimer = void 0;
      }), 500);
    }
    return validated;
  }
  _validateMove(e) {
    const {
      scrollByContent
    } = this.option();
    if (!scrollByContent && !renderer_default(e.target).closest(".dx-scrollable-scrollbar").length) {
      return false;
    }
    return this._allowedDirection();
  }
  getDirection(e) {
    return isDxMouseWheelEvent(e) ? this._wheelDirection(e) : this._allowedDirection();
  }
  _wheelProp() {
    return this._wheelDirection() === HORIZONTAL3 ? "left" : "top";
  }
  _wheelDirection(e) {
    const {
      direction
    } = this.option();
    switch (direction) {
      case HORIZONTAL3:
        return HORIZONTAL3;
      case VERTICAL2:
        return VERTICAL2;
      default:
        return null !== e && void 0 !== e && e.shiftKey ? HORIZONTAL3 : VERTICAL2;
    }
  }
  dispose() {
    this._resetActive();
    if (hoveredScrollable === this) {
      hoveredScrollable = null;
    }
    this._eventHandler("dispose");
    this._detachEventHandlers();
    this._$element.removeClass("dx-scrollable-simulated");
    this._eventForUserAction = void 0;
    clearTimeout(this._validateWheelTimer);
    clearTimeout(this._updateHandlerTimeout);
  }
  _detachEventHandlers() {
    m_events_engine_default.off(this._$element, `.${SCROLLABLE_SIMULATED_CURSOR}`);
    m_events_engine_default.off(this._$container, `.${SCROLLABLE_SIMULATED_KEYBOARD}`);
  }
};

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_relative_offset.js
function getRelativeOffset(targetElementClass, sourceElement) {
  const offset = {
    left: 0,
    top: 0
  };
  let element = sourceElement;
  while (null !== (_element = element) && void 0 !== _element && _element.offsetParent && !element.classList.contains(targetElementClass)) {
    var _element;
    const parentElement = element.offsetParent;
    const elementRect = element.getBoundingClientRect();
    const parentElementRect = parentElement.getBoundingClientRect();
    offset.left += elementRect.left - parentElementRect.left;
    offset.top += elementRect.top - parentElementRect.top;
    element = element.offsetParent;
  }
  return offset;
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_element_location_internal.js
function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
  let scrollableContentClass = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : SCROLLABLE_CONTENT_CLASS;
  const additionalOffset = _extends({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, offset);
  const isVertical = direction === DIRECTION_VERTICAL;
  const prop = isVertical ? "top" : "left";
  const inverseProp = isVertical ? "bottom" : "right";
  const dimension = isVertical ? "height" : "width";
  const containerOffsetSize = containerElement[`offset${titleize(dimension)}`];
  const containerClientSize = containerElement[`client${titleize(dimension)}`];
  const containerSize = containerElement.getBoundingClientRect()[dimension];
  const elementSize = targetElement.getBoundingClientRect()[dimension];
  let scale = 1;
  if (Math.abs(containerSize - containerOffsetSize) > 1) {
    scale = containerSize / containerOffsetSize;
  }
  const relativeElementOffset = getRelativeOffset(scrollableContentClass, targetElement)[prop] / scale;
  const containerScrollOffset = scrollOffset[prop];
  const relativeStartOffset = containerScrollOffset - relativeElementOffset + additionalOffset[prop];
  const relativeEndOffset = containerScrollOffset - relativeElementOffset - elementSize / scale + containerClientSize - additionalOffset[inverseProp];
  if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
    return containerScrollOffset;
  }
  return containerScrollOffset - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset) ? relativeEndOffset : relativeStartOffset);
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/scrollable.js
var SCROLLABLE = "dxScrollable";
var SCROLLABLE_STRATEGY2 = "dxScrollableStrategy";
var VERTICAL3 = "vertical";
var HORIZONTAL4 = "horizontal";
var BOTH = "both";
var Scrollable = class extends dom_component_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      disabled: false,
      onScroll: null,
      direction: VERTICAL3,
      showScrollbar: "onScroll",
      useNative: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      onUpdated: null,
      onStart: null,
      onEnd: null,
      onBounce: null,
      useSimulatedScrollbar: false,
      useKeyboard: true,
      inertiaEnabled: true,
      updateManually: false,
      _onVisibilityChanged: noop
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat(deviceDependentOptions(), [{
      device: () => !!(m_support_default.nativeScrolling && "android" === devices_default.real().platform && !browser_default.mozilla),
      options: {
        useSimulatedScrollbar: true
      }
    }]);
  }
  _initOptions(options) {
    super._initOptions(options);
    if (!("useSimulatedScrollbar" in options)) {
      this._setUseSimulatedScrollbar();
    }
  }
  _setUseSimulatedScrollbar() {
    if (!this.initialOption("useSimulatedScrollbar")) {
      this.option("useSimulatedScrollbar", !this.option("useNative"));
    }
  }
  _init() {
    super._init();
    this._initScrollableMarkup();
    this._locked = false;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this.update();
      this._updateRtlPosition();
      if (this._savedScrollOffset) {
        this.scrollTo(this._savedScrollOffset);
      }
      delete this._savedScrollOffset;
      const {
        _onVisibilityChanged: onVisibilityChanged
      } = this.option();
      null === onVisibilityChanged || void 0 === onVisibilityChanged || onVisibilityChanged(this);
    } else {
      this._savedScrollOffset = this.scrollOffset();
    }
  }
  _initScrollableMarkup() {
    const $element = this.$element().addClass(SCROLLABLE_CLASS);
    const $container = renderer_default("<div>").addClass(SCROLLABLE_CONTAINER_CLASS);
    const $wrapper = renderer_default("<div>").addClass(SCROLLABLE_WRAPPER_CLASS);
    const $content = renderer_default("<div>").addClass(SCROLLABLE_CONTENT_CLASS);
    this._$container = $container;
    this._$wrapper = $wrapper;
    this._$content = $content;
    $content.append($element.contents()).appendTo($container);
    $container.appendTo($wrapper);
    $wrapper.appendTo($element);
  }
  _dimensionChanged() {
    this.update();
    this._updateRtlPosition();
  }
  _initMarkup() {
    super._initMarkup();
    this._renderDirection();
  }
  _render() {
    this._renderStrategy();
    this._attachEventHandlers();
    this._renderDisabledState();
    this._createActions();
    this.update();
    super._render();
    this._updateRtlPosition(true);
  }
  _updateRtlPosition(needInitializeRtlConfig) {
    this._strategy.updateRtlPosition(needInitializeRtlConfig);
  }
  _getMaxOffset() {
    const {
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight
    } = renderer_default(this.container()).get(0);
    return {
      left: scrollWidth - clientWidth,
      top: scrollHeight - clientHeight
    };
  }
  _attachEventHandlers() {
    const strategy = this._strategy;
    const initEventData = {
      getDirection: strategy.getDirection.bind(strategy),
      validate: this._validate.bind(this),
      isNative: this.option("useNative"),
      scrollTarget: this._$container
    };
    m_events_engine_default.off(this._$wrapper, `.${SCROLLABLE}`);
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.init, SCROLLABLE), initEventData, this._initHandler.bind(this));
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.start, SCROLLABLE), strategy.handleStart.bind(strategy));
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.move, SCROLLABLE), strategy.handleMove.bind(strategy));
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.end, SCROLLABLE), strategy.handleEnd.bind(strategy));
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.cancel, SCROLLABLE), strategy.handleCancel.bind(strategy));
    m_events_engine_default.on(this._$wrapper, addNamespace(m_emitter_gesture_scroll_default.stop, SCROLLABLE), strategy.handleStop.bind(strategy));
    m_events_engine_default.off(this._$container, `.${SCROLLABLE}`);
    m_events_engine_default.on(this._$container, addNamespace("scroll", SCROLLABLE), strategy.handleScroll.bind(strategy));
  }
  _validate(e) {
    if (this._isLocked()) {
      return false;
    }
    this._updateIfNeed();
    return this._moveIsAllowed(e);
  }
  _moveIsAllowed(e) {
    const result = this._strategy.validate(e);
    return Boolean(result);
  }
  handleMove(e) {
    this._strategy.handleMove(e);
  }
  _prepareDirections(value) {
    this._strategy._prepareDirections(value);
  }
  _initHandler(e) {
    this._strategy.handleInit(e);
  }
  _renderDisabledState() {
    const {
      disabled
    } = this.option();
    this.$element().toggleClass(SCROLLABLE_DISABLED_CLASS, disabled);
    if (this.option("disabled")) {
      this._lock();
    } else {
      this._unlock();
    }
  }
  _renderDirection() {
    const {
      direction
    } = this.option();
    this.$element().removeClass(`dx-scrollable-${HORIZONTAL4}`).removeClass(`dx-scrollable-${VERTICAL3}`).removeClass(`dx-scrollable-${BOTH}`).addClass(`dx-scrollable-${direction}`);
  }
  _renderStrategy() {
    this._createStrategy();
    this._strategy.render();
    this.$element().data(SCROLLABLE_STRATEGY2, this._strategy);
  }
  _createStrategy() {
    const {
      useNative
    } = this.option();
    this._strategy = useNative ? new scrollable_native_default(this) : new SimulatedStrategy(this);
  }
  _createActions() {
    var _this$_strategy;
    null === (_this$_strategy = this._strategy) || void 0 === _this$_strategy || _this$_strategy.createActions();
  }
  _clean() {
    var _this$_strategy2;
    null === (_this$_strategy2 = this._strategy) || void 0 === _this$_strategy2 || _this$_strategy2.dispose();
  }
  _optionChanged(args) {
    var _this$_strategy3;
    switch (args.name) {
      case "onStart":
      case "onEnd":
      case "onUpdated":
      case "onScroll":
      case "onBounce":
        this._createActions();
        break;
      case "direction":
        this._resetInactiveDirection();
        this._invalidate();
        break;
      case "useNative":
        this._setUseSimulatedScrollbar();
        this._invalidate();
        break;
      case "inertiaEnabled":
      case "scrollByThumb":
      case "bounceEnabled":
      case "useKeyboard":
      case "showScrollbar":
      case "useSimulatedScrollbar":
        this._invalidate();
        break;
      case "disabled":
        this._renderDisabledState();
        null === (_this$_strategy3 = this._strategy) || void 0 === _this$_strategy3 || _this$_strategy3.disabledChanged();
        break;
      case "updateManually":
      case "scrollByContent":
      case "_onVisibilityChanged":
        break;
      case "width":
        super._optionChanged(args);
        this._updateRtlPosition();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetInactiveDirection() {
    const inactiveProp = this._getInactiveProp();
    if (!inactiveProp || !hasWindow()) {
      return;
    }
    const scrollOffset = this.scrollOffset();
    scrollOffset[inactiveProp] = 0;
    this.scrollTo(scrollOffset);
  }
  _getInactiveProp() {
    const {
      direction
    } = this.option();
    if (direction === VERTICAL3) {
      return "left";
    }
    return "top";
  }
  _location() {
    return this._strategy.location();
  }
  _normalizeLocation(location) {
    if (isPlainObject(location)) {
      const left = ensureDefined(location.left, location.x);
      const top = ensureDefined(location.top, location.y);
      return {
        left: isDefined(left) ? -left : void 0,
        top: isDefined(top) ? -top : void 0
      };
    }
    const {
      direction
    } = this.option();
    return {
      left: direction !== VERTICAL3 ? -location : void 0,
      top: direction !== HORIZONTAL4 ? -location : void 0
    };
  }
  _isLocked() {
    return this._locked;
  }
  _lock() {
    this._locked = true;
  }
  _unlock() {
    if (!this.option("disabled")) {
      this._locked = false;
    }
  }
  _isDirection(direction) {
    const {
      direction: current
    } = this.option();
    if (direction === VERTICAL3) {
      return current !== HORIZONTAL4;
    }
    if (direction === HORIZONTAL4) {
      return current !== VERTICAL3;
    }
    return current === direction;
  }
  _updateAllowedDirection() {
    const allowedDirections = this._strategy._allowedDirections();
    if (this._isDirection(BOTH) && allowedDirections.vertical && allowedDirections.horizontal) {
      this._allowedDirectionValue = BOTH;
    } else if (this._isDirection(HORIZONTAL4) && allowedDirections.horizontal) {
      this._allowedDirectionValue = HORIZONTAL4;
    } else if (this._isDirection(VERTICAL3) && allowedDirections.vertical) {
      this._allowedDirectionValue = VERTICAL3;
    } else {
      this._allowedDirectionValue = null;
    }
  }
  _allowedDirection() {
    return this._allowedDirectionValue;
  }
  $content() {
    return this._$content;
  }
  content() {
    return getPublicElement(this._$content);
  }
  container() {
    return getPublicElement(this._$container);
  }
  scrollOffset() {
    return this._strategy._getScrollOffset();
  }
  _isRtlNativeStrategy() {
    const {
      useNative,
      rtlEnabled
    } = this.option();
    return useNative && rtlEnabled;
  }
  scrollTop() {
    return this.scrollOffset().top;
  }
  scrollLeft() {
    return this.scrollOffset().left;
  }
  clientHeight() {
    return getHeight(this._$container);
  }
  scrollHeight() {
    return getOuterHeight(this.$content());
  }
  clientWidth() {
    return getWidth(this._$container);
  }
  scrollWidth() {
    return getOuterWidth(this.$content());
  }
  update() {
    if (!this._strategy) {
      return Deferred().resolve();
    }
    return when(this._strategy.update()).done((() => {
      this._updateAllowedDirection();
    }));
  }
  scrollBy(distance) {
    const normalizedDistance = this._normalizeLocation(distance);
    if (!normalizedDistance.top && !normalizedDistance.left) {
      return;
    }
    this._updateIfNeed();
    this._strategy.scrollBy(normalizedDistance);
  }
  scrollTo(targetLocation) {
    if (!hasWindow()) {
      return;
    }
    let normalizedLocation = this._normalizeLocation(targetLocation);
    this._updateIfNeed();
    let location = this._location();
    const {
      useNative
    } = this.option();
    if (!useNative) {
      const strategy = this._strategy;
      normalizedLocation = strategy._applyScaleRatio(normalizedLocation);
      location = strategy._applyScaleRatio(location);
    }
    if (this._isRtlNativeStrategy()) {
      location.left -= this._getMaxOffset().left;
    }
    const distance = this._normalizeLocation({
      left: location.left - ensureDefined(normalizedLocation.left, location.left),
      top: location.top - ensureDefined(normalizedLocation.top, location.top)
    });
    if (!distance.top && !distance.left) {
      return;
    }
    this._strategy.scrollBy(distance);
  }
  scrollToElement(element, offset) {
    const $element = renderer_default(element);
    const elementInsideContent = this.$content().find(element).length;
    const elementIsInsideContent = $element.parents(`.${SCROLLABLE_CLASS}`).length - $element.parents(`.${SCROLLABLE_CONTENT_CLASS}`).length === 0;
    if (!elementInsideContent || !elementIsInsideContent) {
      return;
    }
    const scrollPosition = {
      top: 0,
      left: 0
    };
    const {
      direction
    } = this.option();
    if (direction !== VERTICAL3) {
      scrollPosition.left = this.getScrollElementPosition($element, HORIZONTAL4, offset);
    }
    if (direction !== HORIZONTAL4) {
      scrollPosition.top = this.getScrollElementPosition($element, VERTICAL3, offset);
    }
    this.scrollTo(scrollPosition);
  }
  getScrollElementPosition($element, direction, offset) {
    const scrollOffset = this.scrollOffset();
    return getElementLocationInternal($element[0], direction, renderer_default(this.container())[0], scrollOffset, offset);
  }
  _updateIfNeed() {
    if (!this.option("updateManually")) {
      this.update();
    }
  }
  _useTemplates() {
    return false;
  }
};
component_registrator_default(SCROLLABLE, Scrollable);
var scrollable_default = Scrollable;

export {
  scrollable_native_default,
  animator_default,
  Scroller,
  SimulatedStrategy,
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL,
  DIRECTION_BOTH,
  SCROLLABLE_CLASS,
  SCROLLABLE_CONTENT_CLASS,
  deviceDependentOptions,
  getRelativeOffset,
  getElementLocationInternal,
  scrollable_default
};
//# sourceMappingURL=chunk-UAVVJIMK.js.map
