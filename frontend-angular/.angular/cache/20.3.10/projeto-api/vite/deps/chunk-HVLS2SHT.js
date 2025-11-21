import {
  Scroller,
  SimulatedStrategy,
  scrollable_default,
  scrollable_native_default
} from "./chunk-UAVVJIMK.js";
import {
  load_indicator_default2 as load_indicator_default
} from "./chunk-FYPIFWX2.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isFluent,
  isMaterial,
  isMaterialBased
} from "./chunk-2D4FZXPO.js";
import {
  overlay_default
} from "./chunk-VA6S6EFE.js";
import {
  component_registrator_default,
  eventData,
  getPublicElement,
  move
} from "./chunk-ICLEXNO5.js";
import {
  devices_default
} from "./chunk-DONQLAZQ.js";
import {
  getHeight,
  getOuterHeight,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  Deferred,
  _extends,
  callbacks_default,
  each,
  executeAsync,
  hasWindow,
  noop
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/load_panel.js
var LoadPanel = class extends overlay_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape: noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      message: message_default.format("Loading"),
      width: 222,
      height: 90,
      animation: null,
      showIndicator: true,
      indicatorSrc: "",
      showPane: true,
      delay: 0,
      templatesRenderAsynchronously: false,
      hideTopOverlayHandler: null,
      focusStateEnabled: false,
      propagateOutsideClick: true,
      preventScrollEvents: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "generic"
      },
      options: {
        shadingColor: "transparent"
      }
    }, {
      device: () => isMaterial(current()),
      options: {
        message: "",
        width: 60,
        height: 60,
        maxHeight: 60,
        maxWidth: 60
      }
    }, {
      device: () => isFluent(current()),
      options: {
        width: "auto",
        height: "auto"
      }
    }]);
  }
  _init() {
    super._init();
  }
  _render() {
    super._render();
    this.$element().addClass("dx-loadpanel");
    this.$wrapper().addClass("dx-loadpanel-wrapper");
    this._updateWrapperAria();
  }
  _updateWrapperAria() {
    this.$wrapper().removeAttr("aria-label").removeAttr("role");
    const showIndicator = this.option("showIndicator");
    if (!showIndicator) {
      const aria = this._getAriaAttributes();
      this.$wrapper().attr(aria);
    }
  }
  _getAriaAttributes() {
    const {
      message
    } = this.option();
    const label = message || message_default.format("Loading");
    const aria = {
      role: "alert",
      "aria-label": label
    };
    return aria;
  }
  _renderContentImpl() {
    const result = super._renderContentImpl();
    this.$content().addClass("dx-loadpanel-content");
    this._$loadPanelContentWrapper = renderer_default("<div>").addClass("dx-loadpanel-content-wrapper");
    this._$loadPanelContentWrapper.appendTo(this.$content());
    this._togglePaneVisible();
    this._cleanPreviousContent();
    this._renderLoadIndicator();
    this._renderMessage();
    return result;
  }
  _show() {
    const {
      delay
    } = this.option();
    if (!delay) {
      return super._show();
    }
    const deferred = Deferred();
    const callBase = super._show.bind(this);
    this._clearShowTimeout();
    this._showTimeout = setTimeout((() => {
      callBase().done((() => {
        deferred.resolve();
      }));
    }), delay);
    return deferred.promise();
  }
  _hide() {
    this._clearShowTimeout();
    return super._hide();
  }
  _clearShowTimeout() {
    clearTimeout(this._showTimeout);
  }
  _renderMessage() {
    if (!this._$loadPanelContentWrapper) {
      return;
    }
    const {
      message
    } = this.option();
    if (!message) {
      return;
    }
    const $message = renderer_default("<div>").addClass("dx-loadpanel-message").text(message);
    this._$loadPanelContentWrapper.append($message);
  }
  _renderLoadIndicator() {
    if (!this._$loadPanelContentWrapper || !this.option("showIndicator")) {
      return;
    }
    if (!this._$indicator) {
      this._$indicator = renderer_default("<div>").addClass("dx-loadpanel-indicator").appendTo(this._$loadPanelContentWrapper);
    }
    this._createComponent(this._$indicator, load_indicator_default, {
      elementAttr: this._getAriaAttributes(),
      indicatorSrc: this.option("indicatorSrc")
    });
  }
  _cleanPreviousContent() {
    this.$content().find(".dx-loadpanel-message").remove();
    this.$content().find(".dx-loadpanel-indicator").remove();
    this._$indicator = void 0;
  }
  _togglePaneVisible() {
    this.$content().toggleClass("dx-loadpanel-pane-hidden", !this.option("showPane"));
  }
  _optionChanged(args) {
    switch (args.name) {
      case "delay":
        break;
      case "message":
      case "showIndicator":
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage();
        this._updateWrapperAria();
        break;
      case "showPane":
        this._togglePaneVisible();
        break;
      case "indicatorSrc":
        this._renderLoadIndicator();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    this._clearShowTimeout();
    super._dispose();
  }
};
component_registrator_default("dxLoadPanel", LoadPanel);
var load_panel_default = LoadPanel;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scroll_view.native.pull_down.js
var PullDownNativeScrollViewStrategy = class extends scrollable_native_default {
  _init(scrollView) {
    super._init(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    this._$refreshingText = scrollView._$refreshingText;
    this._$scrollViewContent = renderer_default(scrollView.content());
    this._$container = renderer_default(scrollView.container());
    this._initCallbacks();
  }
  _initCallbacks() {
    this.pullDownCallbacks = callbacks_default();
    this.releaseCallbacks = callbacks_default();
    this.reachBottomCallbacks = callbacks_default();
  }
  render() {
    super.render();
    this._renderPullDown();
    this._releaseState();
  }
  _renderPullDown() {
    const $image = renderer_default("<div>").addClass("dx-scrollview-pull-down-image");
    const $loadContainer = renderer_default("<div>").addClass("dx-scrollview-pull-down-indicator");
    const loadIndicatorElement = renderer_default("<div>")[0];
    const $loadIndicator = new load_indicator_default(loadIndicatorElement).$element();
    this._$pullDownText = renderer_default("<div>").addClass("dx-scrollview-pull-down-text");
    const {
      pullingDownText = "",
      pulledDownText = "",
      refreshingText = ""
    } = this.option();
    this._$pullingDownText = renderer_default("<div>").text(pullingDownText).appendTo(this._$pullDownText);
    this._$pulledDownText = renderer_default("<div>").text(pulledDownText).appendTo(this._$pullDownText);
    this._$refreshingText = renderer_default("<div>").text(refreshingText).appendTo(this._$pullDownText);
    this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append(this._$pullDownText);
  }
  _releaseState() {
    this._state = 0;
    this._refreshPullDownText();
  }
  _refreshPullDownText() {
    const pullDownTextItems = [{
      element: this._$pullingDownText,
      visibleState: 0
    }, {
      element: this._$pulledDownText,
      visibleState: 1
    }, {
      element: this._$refreshingText,
      visibleState: 2
    }];
    each(pullDownTextItems, ((_, item) => {
      const action = this._state === item.visibleState ? "addClass" : "removeClass";
      item.element[action]("dx-scrollview-pull-down-text-visible");
    }));
  }
  update() {
    super.update();
    this._setTopPocketOffset();
  }
  _updateDimensions() {
    super._updateDimensions();
    this._topPocketSize = this._$topPocket.get(0).clientHeight;
    const contentEl = this._$scrollViewContent.get(0);
    const containerEl = this._$container.get(0);
    this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
  }
  _allowedDirections() {
    const allowedDirections = super._allowedDirections();
    allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
    return allowedDirections;
  }
  _setTopPocketOffset() {
    this._$topPocket.css({
      top: -this._topPocketSize
    });
  }
  handleEnd() {
    super.handleEnd();
    this._complete();
  }
  handleStop() {
    super.handleStop();
    this._complete();
  }
  _complete() {
    if (1 === this._state) {
      this._setPullDownOffset(this._topPocketSize);
      clearTimeout(this._pullDownRefreshTimeout);
      this._pullDownRefreshTimeout = setTimeout((() => {
        this._pullDownRefreshing();
      }), 400);
    }
  }
  _setPullDownOffset(offset) {
    move(this._$topPocket, {
      top: offset
    });
    move(this._$scrollViewContent, {
      top: offset
    });
  }
  handleScroll(e) {
    super.handleScroll(e);
    if (2 === this._state) {
      return;
    }
    const currentLocation = this.location().top;
    const scrollDelta = (this._location || 0) - currentLocation;
    this._location = currentLocation;
    if (this._isPullDown()) {
      this._pullDownReady();
    } else if (scrollDelta > 0 && this._isReachBottom()) {
      this._reachBottom();
    } else {
      this._stateReleased();
    }
  }
  _isPullDown() {
    return this._pullDownEnabled && this._location >= this._topPocketSize;
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    return Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  }
  _reachBottom() {
    if (3 === this._state) {
      return;
    }
    this._state = 3;
    this.reachBottomCallbacks.fire();
  }
  _pullDownReady() {
    if (1 === this._state) {
      return;
    }
    this._state = 1;
    this._$pullDown.addClass("dx-scrollview-pull-down-ready");
    this._refreshPullDownText();
  }
  _stateReleased() {
    if (0 === this._state) {
      return;
    }
    this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
    this._releaseState();
  }
  _pullDownRefreshing() {
    if (2 === this._state) {
      return;
    }
    this._state = 2;
    this._$pullDown.addClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
    this._refreshPullDownText();
    this.pullDownCallbacks.fire();
  }
  pullDownEnable(enabled) {
    if (enabled) {
      this._updateDimensions();
      this._setTopPocketOffset();
    }
    this._pullDownEnabled = enabled;
  }
  reachBottomEnable(enabled) {
    this._reachBottomEnabled = enabled;
  }
  pendingRelease() {
    this._state = 1;
  }
  release() {
    const deferred = Deferred();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    if (3 === this._state) {
      this._state = 0;
    }
    this._releaseTimeout = setTimeout((() => {
      this._setPullDownOffset(0);
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      deferred.resolve();
    }), 400);
    return deferred.promise();
  }
  dispose() {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    super.dispose();
  }
};
var scroll_view_native_pull_down_default = PullDownNativeScrollViewStrategy;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scroll_view.native.swipe_down.js
var SwipeDownNativeScrollViewStrategy = class extends scrollable_native_default {
  _init(scrollView) {
    super._init(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    this._$scrollViewContent = renderer_default(scrollView.content());
    this._$container = renderer_default(scrollView.container());
    this._initCallbacks();
    this._location = 0;
  }
  _initCallbacks() {
    this.pullDownCallbacks = callbacks_default();
    this.releaseCallbacks = callbacks_default();
    this.reachBottomCallbacks = callbacks_default();
  }
  render() {
    super.render();
    this._renderPullDown();
    this._releaseState();
  }
  _renderPullDown() {
    const $loadContainer = renderer_default("<div>").addClass("dx-scrollview-pull-down-indicator");
    const loadIndicatorElement = renderer_default("<div>")[0];
    const $loadIndicator = new load_indicator_default(loadIndicatorElement).$element();
    this._$icon = renderer_default("<div>").addClass("dx-icon-pulldown");
    this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator));
  }
  _releaseState() {
    this._state = 0;
    this._releasePullDown();
    this._updateDimensions();
  }
  _releasePullDown() {
    this._$pullDown.css({
      opacity: 0
    });
  }
  _updateDimensions() {
    super._updateDimensions();
    this._topPocketSize = this._$topPocket.get(0).clientHeight;
    const contentEl = this._$scrollViewContent.get(0);
    const containerEl = this._$container.get(0);
    this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
  }
  _allowedDirections() {
    const allowedDirections = super._allowedDirections();
    allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
    return allowedDirections;
  }
  handleInit(e) {
    super.handleInit(e);
    if (0 === this._state && 0 === this._location) {
      this._startClientY = eventData(e.originalEvent).y;
      this._state = 4;
    }
  }
  handleMove(e) {
    super.handleMove(e);
    this._deltaY = eventData(e.originalEvent).y - this._startClientY;
    if (4 === this._state) {
      if (this._pullDownEnabled && this._deltaY > 0) {
        this._state = 5;
      } else {
        this._complete();
      }
    }
    if (5 === this._state) {
      e.preventDefault();
      this._movePullDown();
    }
  }
  _movePullDown() {
    const pullDownHeight = this._getPullDownHeight();
    const top = Math.min(3 * pullDownHeight, this._deltaY + this._getPullDownStartPosition());
    const angle = 180 * top / (3 * pullDownHeight);
    this._$pullDown.css({
      opacity: 1
    }).toggleClass("dx-scrollview-pull-down-refreshing", top < pullDownHeight);
    move(this._$pullDown, {
      top
    });
    this._$icon.css({
      transform: `rotate(${angle}deg)`
    });
  }
  _isPullDown() {
    return this._pullDownEnabled && 5 === this._state && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition();
  }
  _getPullDownHeight() {
    return Math.round(0.05 * getOuterHeight(this._$element));
  }
  _getPullDownStartPosition() {
    return -Math.round(1.5 * getOuterHeight(this._$pullDown));
  }
  handleEnd() {
    if (this._isPullDown()) {
      this._pullDownRefreshing();
    }
    this._complete();
  }
  handleStop() {
    this._complete();
  }
  _complete() {
    if (4 === this._state || 5 === this._state) {
      this._releaseState();
    }
  }
  handleScroll(e) {
    super.handleScroll(e);
    if (2 === this._state) {
      return;
    }
    const currentLocation = this.location().top;
    const scrollDelta = this._location - currentLocation;
    this._location = currentLocation;
    if (scrollDelta > 0 && this._isReachBottom()) {
      this._reachBottom();
    } else {
      this._stateReleased();
    }
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    return Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  }
  _reachBottom() {
    this.reachBottomCallbacks.fire();
  }
  _stateReleased() {
    if (0 === this._state) {
      return;
    }
    this._$pullDown.removeClass("dx-scrollview-pull-down-loading");
    this._releaseState();
  }
  _pullDownRefreshing() {
    this._state = 2;
    this._pullDownRefreshHandler();
  }
  _pullDownRefreshHandler() {
    this._refreshPullDown();
    this.pullDownCallbacks.fire();
  }
  _refreshPullDown() {
    this._$pullDown.addClass("dx-scrollview-pull-down-loading");
    move(this._$pullDown, {
      top: this._getPullDownHeight()
    });
  }
  pullDownEnable(enabled) {
    this._$topPocket.toggle(enabled);
    this._pullDownEnabled = enabled;
  }
  reachBottomEnable(enabled) {
    this._reachBottomEnabled = enabled;
  }
  pendingRelease() {
    this._state = 1;
  }
  release() {
    const deferred = Deferred();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    this._releaseTimeout = setTimeout((() => {
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      deferred.resolve();
    }), 800);
    return deferred.promise();
  }
  dispose() {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    super.dispose();
  }
};
var scroll_view_native_swipe_down_default = SwipeDownNativeScrollViewStrategy;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scroll_view.simulated.js
var ScrollViewScroller = class extends Scroller {
  constructor(options) {
    super(options);
    this._topPocketSize = 0;
    this._bottomPocketSize = 0;
    this._initCallbacks();
    this._releaseState();
  }
  _releaseState() {
    this._state = 0;
    this._refreshPullDownText();
  }
  _refreshPullDownText() {
    const pullDownTextItems = [{
      element: this._$pullingDownText,
      visibleState: 0
    }, {
      element: this._$pulledDownText,
      visibleState: 1
    }, {
      element: this._$refreshingText,
      visibleState: 2
    }];
    each(pullDownTextItems, ((_, item) => {
      const action = this._state === item.visibleState ? "addClass" : "removeClass";
      item.element[action]("dx-scrollview-pull-down-text-visible");
    }));
  }
  _initCallbacks() {
    this.pullDownCallbacks = callbacks_default();
    this.releaseCallbacks = callbacks_default();
    this.reachBottomCallbacks = callbacks_default();
  }
  _updateBounds() {
    const considerPockets = "horizontal" !== this._direction;
    if (considerPockets) {
      this._topPocketSize = this._$topPocket.get(0).clientHeight;
      this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
      const containerEl = this._$container.get(0);
      const contentEl = this._$content.get(0);
      this._bottomBoundary = Math.max(contentEl.clientHeight - this._bottomPocketSize - containerEl.clientHeight, 0);
    }
    super._updateBounds();
  }
  _updateScrollbar() {
    this._scrollbar.option({
      containerSize: this._containerSize(),
      contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
      scaleRatio: this._getScaleRatio()
    });
  }
  _moveContent() {
    super._moveContent();
    if (this._isPullDown()) {
      this._pullDownReady();
    } else if (this._isReachBottom()) {
      this._reachBottomReady();
    } else if (0 !== this._state) {
      this._stateReleased();
    }
  }
  _moveScrollbar() {
    this._scrollbar.moveTo(this._topPocketSize + this._location);
  }
  _isPullDown() {
    return this._pullDownEnabled && this._location >= 0;
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    const containerEl = this._$container.get(0);
    return Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1;
  }
  _scrollComplete() {
    if (this._inBounds() && 1 === this._state) {
      this._pullDownRefreshing();
    } else if (this._inBounds() && 3 === this._state) {
      this._reachBottomLoading();
    } else {
      super._scrollComplete();
    }
  }
  _reachBottomReady() {
    if (3 === this._state) {
      return;
    }
    this._state = 3;
    this._minOffset = this._getMinOffset();
  }
  _getMaxOffset() {
    return -this._topPocketSize;
  }
  _getMinOffset() {
    return Math.min(super._getMinOffset(), -this._topPocketSize);
  }
  _reachBottomLoading() {
    this.reachBottomCallbacks.fire();
  }
  _pullDownReady() {
    if (1 === this._state) {
      return;
    }
    this._state = 1;
    this._maxOffset = 0;
    this._$pullDown.addClass("dx-scrollview-pull-down-ready");
    this._refreshPullDownText();
  }
  _stateReleased() {
    if (0 === this._state) {
      return;
    }
    this._releaseState();
    this._updateBounds();
    this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
    this.releaseCallbacks.fire();
  }
  _pullDownRefreshing() {
    if (2 === this._state) {
      return;
    }
    this._state = 2;
    this._$pullDown.addClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
    this._refreshPullDownText();
    this.pullDownCallbacks.fire();
  }
  _releaseHandler() {
    var _this$_releaseTask;
    if (0 === this._state) {
      this._moveToBounds();
    }
    this._update();
    if (this._releaseTask) {
      this._releaseTask.abort();
    }
    this._releaseTask = executeAsync(this._release.bind(this));
    return null === (_this$_releaseTask = this._releaseTask) || void 0 === _this$_releaseTask ? void 0 : _this$_releaseTask.promise;
  }
  _release() {
    this._stateReleased();
    this._scrollComplete();
  }
  _reachBottomEnablingHandler(enabled) {
    if (this._reachBottomEnabled === enabled) {
      return;
    }
    this._reachBottomEnabled = enabled;
    this._updateBounds();
  }
  _pullDownEnablingHandler(enabled) {
    if (this._pullDownEnabled === enabled) {
      return;
    }
    this._pullDownEnabled = enabled;
    this._considerTopPocketChange();
    this._updateHandler();
  }
  _considerTopPocketChange() {
    this._location -= getHeight(this._$topPocket) || -this._topPocketSize;
    this._maxOffset = 0;
    this._move();
  }
  _pendingReleaseHandler() {
    this._state = 1;
  }
  dispose() {
    if (this._releaseTask) {
      this._releaseTask.abort();
    }
    super.dispose();
  }
};
var SimulatedScrollViewStrategy = class extends SimulatedStrategy {
  _init(scrollView) {
    super._init(scrollView);
    this._$pullDown = scrollView._$pullDown;
    this._$topPocket = scrollView._$topPocket;
    this._$bottomPocket = scrollView._$bottomPocket;
    this._initCallbacks();
  }
  _initCallbacks() {
    this.pullDownCallbacks = callbacks_default();
    this.releaseCallbacks = callbacks_default();
    this.reachBottomCallbacks = callbacks_default();
  }
  render() {
    this._renderPullDown();
    super.render();
  }
  _renderPullDown() {
    const $image = renderer_default("<div>").addClass("dx-scrollview-pull-down-image");
    const $loadContainer = renderer_default("<div>").addClass("dx-scrollview-pull-down-indicator");
    const loadIndicatorElement = renderer_default("<div>")[0];
    const $loadIndicator = new load_indicator_default(loadIndicatorElement).$element();
    this._$pullDownText = renderer_default("<div>").addClass("dx-scrollview-pull-down-text");
    const {
      pullingDownText = "",
      pulledDownText = "",
      refreshingText = ""
    } = this.option();
    this._$pullingDownText = renderer_default("<div>").text(pullingDownText).appendTo(this._$pullDownText);
    this._$pulledDownText = renderer_default("<div>").text(pulledDownText).appendTo(this._$pullDownText);
    this._$refreshingText = renderer_default("<div>").text(refreshingText).appendTo(this._$pullDownText);
    this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append(this._$pullDownText);
  }
  pullDownEnable(enabled) {
    this._eventHandler("pullDownEnabling", enabled);
  }
  reachBottomEnable(enabled) {
    this._eventHandler("reachBottomEnabling", enabled);
  }
  _createScroller(direction) {
    const scroller = new ScrollViewScroller(this._scrollerOptions(direction));
    this._scrollers[direction] = scroller;
    scroller.pullDownCallbacks.add((() => {
      this.pullDownCallbacks.fire();
    }));
    scroller.releaseCallbacks.add((() => {
      this.releaseCallbacks.fire();
    }));
    scroller.reachBottomCallbacks.add((() => {
      this.reachBottomCallbacks.fire();
    }));
  }
  _scrollerOptions(direction) {
    return _extends({}, super._scrollerOptions(direction), {
      $topPocket: this._$topPocket,
      $bottomPocket: this._$bottomPocket,
      $pullDown: this._$pullDown,
      $pullDownText: this._$pullDownText,
      $pullingDownText: this._$pullingDownText,
      $pulledDownText: this._$pulledDownText,
      $refreshingText: this._$refreshingText
    });
  }
  pendingRelease() {
    this._eventHandler("pendingRelease");
  }
  release() {
    return this._eventHandler("release").done(this._updateAction);
  }
  location() {
    const location = super.location();
    location.top += getHeight(this._$topPocket);
    return location;
  }
  isBottomReached() {
    return this._scrollers.vertical.isBottomReached();
  }
  dispose() {
    each(this._scrollers, (function() {
      this.dispose();
    }));
    super.dispose();
  }
};
var scroll_view_simulated_default = SimulatedScrollViewStrategy;

// node_modules/devextreme/esm/__internal/ui/scroll_view/scroll_view.js
var SCROLLVIEW_LOADPANEL = "dx-scrollview-loadpanel";
var refreshStrategies = {
  pullDown: scroll_view_native_pull_down_default,
  swipeDown: scroll_view_native_swipe_down_default,
  simulated: scroll_view_simulated_default
};
var isServerSide = !hasWindow();
var ScrollViewServerSide = class extends scrollable_default {
  finishLoading() {
  }
  release() {
  }
  refresh() {
  }
  scrollOffset() {
    return {
      top: 0,
      left: 0
    };
  }
  isBottomReached() {
    return false;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    if ("onUpdated" !== name) {
      return super._optionChanged(args);
    }
  }
};
var ScrollView = class extends scrollable_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      pullingDownText: message_default.format("dxScrollView-pullingDownText"),
      pulledDownText: message_default.format("dxScrollView-pulledDownText"),
      refreshingText: message_default.format("dxScrollView-refreshingText"),
      reachBottomText: message_default.format("dxScrollView-reachBottomText"),
      onPullDown: null,
      onReachBottom: null,
      refreshStrategy: "pullDown"
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = devices_default.real();
        return "android" === realDevice.platform;
      },
      options: {
        refreshStrategy: "swipeDown"
      }
    }, {
      device: () => isMaterialBased(current()),
      options: {
        pullingDownText: "",
        pulledDownText: "",
        refreshingText: "",
        reachBottomText: ""
      }
    }]);
  }
  _init() {
    super._init();
    this._loadingIndicatorEnabled = true;
  }
  _initScrollableMarkup() {
    super._initScrollableMarkup();
    this.$element().addClass("dx-scrollview");
    this._initContent();
    this._initTopPocket();
    this._initBottomPocket();
    this._initLoadPanel();
  }
  _initContent() {
    const $content = renderer_default("<div>").addClass("dx-scrollview-content");
    this._$content.wrapInner($content);
  }
  _initTopPocket() {
    this._$topPocket = renderer_default("<div>").addClass("dx-scrollview-top-pocket");
    this._$pullDown = renderer_default("<div>").addClass("dx-scrollview-pull-down");
    this._$topPocket.append(this._$pullDown);
    this._$content.prepend(this._$topPocket);
  }
  _initBottomPocket() {
    this._$bottomPocket = renderer_default("<div>").addClass("dx-scrollview-bottom-pocket");
    this._$reachBottom = renderer_default("<div>").addClass("dx-scrollview-scrollbottom");
    const $loadContainer = renderer_default("<div>").addClass("dx-scrollview-scrollbottom-indicator");
    const loadIndicatorElement = renderer_default("<div>")[0];
    const $loadIndicator = new load_indicator_default(loadIndicatorElement).$element();
    this._$reachBottomText = renderer_default("<div>").addClass("dx-scrollview-scrollbottom-text");
    this._updateReachBottomText();
    this._$reachBottom.append($loadContainer.append($loadIndicator)).append(this._$reachBottomText);
    this._$bottomPocket.append(this._$reachBottom);
    this._$content.append(this._$bottomPocket);
  }
  _initLoadPanel() {
    const $loadPanelElement = renderer_default("<div>").addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
    const {
      refreshingText
    } = this.option();
    this._loadPanel = this._createComponent($loadPanelElement, load_panel_default, {
      shading: false,
      delay: 400,
      message: refreshingText,
      position: {
        of: this.$element()
      }
    });
  }
  _updateReachBottomText() {
    const {
      reachBottomText
    } = this.option();
    this._$reachBottomText.text(reachBottomText);
  }
  _createStrategy() {
    const {
      useNative,
      refreshStrategy
    } = this.option();
    const strategyName = useNative ? refreshStrategy : "simulated";
    const StrategyClass = refreshStrategies[strategyName ?? "pullDown"];
    this._strategy = new StrategyClass(this);
    this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
    this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
    this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this));
  }
  _createActions() {
    super._createActions();
    this._pullDownAction = this._createActionByOption("onPullDown");
    this._reachBottomAction = this._createActionByOption("onReachBottom");
    this._tryRefreshPocketState();
  }
  _tryRefreshPocketState() {
    this._pullDownEnable(this.hasActionSubscription("onPullDown"));
    this._reachBottomEnable(this.hasActionSubscription("onReachBottom"));
  }
  on(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    const result = super.on.apply(this, [eventName, ...args]);
    if ("pullDown" === eventName || "reachBottom" === eventName) {
      this._tryRefreshPocketState();
    }
    return result;
  }
  _pullDownEnable(enabled) {
    if (0 === arguments.length) {
      return this._pullDownEnabled;
    }
    if (this._$pullDown && this._strategy) {
      this._$pullDown.toggle(enabled);
      this._strategy.pullDownEnable(enabled);
      this._pullDownEnabled = enabled;
    }
  }
  _reachBottomEnable(enabled) {
    if (0 === arguments.length) {
      return this._reachBottomEnabled;
    }
    if (this._$reachBottom && this._strategy) {
      this._$reachBottom.toggle(enabled);
      this._strategy.reachBottomEnable(enabled);
      this._reachBottomEnabled = enabled;
    }
  }
  _pullDownHandler() {
    this._loadingIndicator(false);
    this._pullDownLoading();
  }
  _loadingIndicator(value) {
    if (arguments.length < 1) {
      return this._loadingIndicatorEnabled;
    }
    this._loadingIndicatorEnabled = value;
  }
  _pullDownLoading() {
    var _this$_pullDownAction;
    this.startLoading();
    null === (_this$_pullDownAction = this._pullDownAction) || void 0 === _this$_pullDownAction || _this$_pullDownAction.call(this);
  }
  _reachBottomHandler() {
    this._loadingIndicator(false);
    this._reachBottomLoading();
  }
  _reachBottomLoading() {
    var _this$_reachBottomAct;
    this.startLoading();
    null === (_this$_reachBottomAct = this._reachBottomAction) || void 0 === _this$_reachBottomAct || _this$_reachBottomAct.call(this);
  }
  _releaseHandler() {
    this.finishLoading();
    this._loadingIndicator(true);
  }
  _optionChanged(args) {
    switch (args.name) {
      case "onPullDown":
      case "onReachBottom":
        this._createActions();
        break;
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "refreshStrategy":
        this._invalidate();
        break;
      case "reachBottomText":
        this._updateReachBottomText();
        break;
      default:
        super._optionChanged(args);
    }
  }
  content() {
    return getPublicElement(this._$content.children().eq(1));
  }
  release(preventReachBottom) {
    if (void 0 !== preventReachBottom) {
      this.toggleLoading(!preventReachBottom);
    }
    return this._strategy.release();
  }
  toggleLoading(showOrHide) {
    this._reachBottomEnable(showOrHide);
  }
  refresh() {
    if (!this.hasActionSubscription("onPullDown")) {
      return;
    }
    this._strategy.pendingRelease();
    this._pullDownLoading();
  }
  startLoading() {
    if (this._loadingIndicator() && this.$element().is(":visible")) {
      this._loadPanel.show();
    }
    this._lock();
  }
  finishLoading() {
    this._loadPanel.hide();
    this._unlock();
  }
  isBottomReached() {
    return this._strategy.isBottomReached();
  }
  _dispose() {
    this._strategy.dispose();
    super._dispose();
    if (this._loadPanel) {
      this._loadPanel.$element().remove();
    }
  }
};
component_registrator_default("dxScrollView", isServerSide ? ScrollViewServerSide : ScrollView);
var scroll_view_default = isServerSide ? ScrollViewServerSide : ScrollView;

export {
  load_panel_default,
  scroll_view_default
};
//# sourceMappingURL=chunk-HVLS2SHT.js.map
