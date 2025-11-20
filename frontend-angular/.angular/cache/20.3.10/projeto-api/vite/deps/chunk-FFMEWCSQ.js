import {
  m_text_box_default
} from "./chunk-T6RX3ICP.js";
import {
  search_box_controller_default
} from "./chunk-7Z6ON4IH.js";
import {
  animator_default
} from "./chunk-KCGINBM5.js";
import {
  DRAG_END_EVENT,
  DRAG_ENTER_EVENT,
  DRAG_EVENT,
  DRAG_LEAVE_EVENT,
  DRAG_START_EVENT
} from "./chunk-MJRE2EKH.js";
import {
  EmptyTemplate,
  addNamespace,
  component_registrator_default,
  dom_component_default,
  fx_default,
  getBoundingRect,
  getPublicElement,
  locate,
  m_pointer_default,
  move,
  needSkipEvent,
  position_default,
  resetPosition
} from "./chunk-54SHI7Z2.js";
import {
  value
} from "./chunk-A3D3LIWG.js";
import {
  dasherize,
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  m_events_engine_default
} from "./chunk-4JX72F7N.js";
import {
  Deferred,
  _extends,
  dom_adapter_default,
  extend,
  fromPromise,
  getWindow,
  isDefined,
  isFunction,
  isNumeric,
  isObject,
  quadToObject,
  splitPair,
  when
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/ui/list/modules/search.js
search_box_controller_default.setEditorClass(m_text_box_default);

// node_modules/devextreme/esm/__internal/m_draggable.js
var window = getWindow();
var DRAGGABLE = "dxDraggable";
var DRAGSTART_EVENT_NAME = addNamespace(DRAG_START_EVENT, DRAGGABLE);
var DRAG_EVENT_NAME = addNamespace(DRAG_EVENT, DRAGGABLE);
var DRAGEND_EVENT_NAME = addNamespace(DRAG_END_EVENT, DRAGGABLE);
var DRAG_ENTER_EVENT_NAME = addNamespace(DRAG_ENTER_EVENT, DRAGGABLE);
var DRAGEND_LEAVE_EVENT_NAME = addNamespace(DRAG_LEAVE_EVENT, DRAGGABLE);
var POINTERDOWN_EVENT_NAME = addNamespace(m_pointer_default.down, DRAGGABLE);
var KEYDOWN_EVENT_NAME = addNamespace("keydown", DRAGGABLE);
var targetDraggable;
var sourceDraggable;
var getMousePosition = (event) => ({
  x: event.pageX - renderer_default(window).scrollLeft(),
  y: event.pageY - renderer_default(window).scrollTop()
});
var ScrollHelper = class {
  constructor(orientation, component) {
    this._$scrollableAtPointer = null;
    this._preventScroll = true;
    this._component = component;
    if ("vertical" === orientation) {
      this._scrollValue = "scrollTop";
      this._overFlowAttr = "overflowY";
      this._sizeAttr = "height";
      this._scrollSizeProp = "scrollHeight";
      this._clientSizeProp = "clientHeight";
      this._limitProps = {
        start: "top",
        end: "bottom"
      };
    } else {
      this._scrollValue = "scrollLeft";
      this._overFlowAttr = "overflowX";
      this._sizeAttr = "width";
      this._scrollSizeProp = "scrollWidth";
      this._clientSizeProp = "clientWidth";
      this._limitProps = {
        start: "left",
        end: "right"
      };
    }
  }
  updateScrollable(elements, mousePosition) {
    let isScrollableFound = false;
    elements.some(((element) => {
      const $element = renderer_default(element);
      const isTargetOverOverlayWrapper = $element.hasClass("dx-overlay-wrapper");
      const isTargetOverOverlayContent = $element.hasClass("dx-overlay-content");
      if (isTargetOverOverlayWrapper || isTargetOverOverlayContent) {
        return true;
      }
      isScrollableFound = this._trySetScrollable(element, mousePosition);
      return isScrollableFound;
    }));
    if (!isScrollableFound) {
      this._$scrollableAtPointer = null;
      this._scrollSpeed = 0;
    }
  }
  isScrolling() {
    return !!this._scrollSpeed;
  }
  isScrollable($element) {
    return ("auto" === $element.css(this._overFlowAttr) || $element.hasClass("dx-scrollable-container")) && $element.prop(this._scrollSizeProp) > Math.ceil("width" === this._sizeAttr ? getWidth($element) : getHeight($element));
  }
  _trySetScrollable(element, mousePosition) {
    const that = this;
    const $element = renderer_default(element);
    let distanceToBorders;
    const sensitivity = that._component.option("scrollSensitivity");
    let isScrollable = that.isScrollable($element);
    if (isScrollable) {
      distanceToBorders = that._calculateDistanceToBorders($element, mousePosition);
      if (sensitivity > distanceToBorders[that._limitProps.start]) {
        if (!that._preventScroll) {
          that._scrollSpeed = -that._calculateScrollSpeed(distanceToBorders[that._limitProps.start]);
          that._$scrollableAtPointer = $element;
        }
      } else if (sensitivity > distanceToBorders[that._limitProps.end]) {
        if (!that._preventScroll) {
          that._scrollSpeed = that._calculateScrollSpeed(distanceToBorders[that._limitProps.end]);
          that._$scrollableAtPointer = $element;
        }
      } else {
        isScrollable = false;
        that._preventScroll = false;
      }
    }
    return isScrollable;
  }
  _calculateDistanceToBorders($area, mousePosition) {
    const area = $area.get(0);
    let areaBoundingRect;
    if (area) {
      areaBoundingRect = getBoundingRect(area);
      return {
        left: mousePosition.x - areaBoundingRect.left,
        top: mousePosition.y - areaBoundingRect.top,
        right: areaBoundingRect.right - mousePosition.x,
        bottom: areaBoundingRect.bottom - mousePosition.y
      };
    }
    return {};
  }
  _calculateScrollSpeed(distance) {
    const component = this._component;
    const sensitivity = component.option("scrollSensitivity");
    const maxSpeed = component.option("scrollSpeed");
    return Math.ceil(((sensitivity - distance) / sensitivity) ** 2 * maxSpeed);
  }
  scrollByStep() {
    const that = this;
    if (that._$scrollableAtPointer && that._scrollSpeed) {
      if (that._$scrollableAtPointer.hasClass("dx-scrollable-container")) {
        const $scrollable = that._$scrollableAtPointer.closest(".dx-scrollable");
        const scrollableInstance = $scrollable.data("dxScrollable") || $scrollable.data("dxScrollView");
        if (scrollableInstance) {
          const nextScrollPosition = scrollableInstance.scrollOffset()[that._limitProps.start] + that._scrollSpeed;
          scrollableInstance.scrollTo({
            [that._limitProps.start]: nextScrollPosition
          });
        }
      } else {
        const nextScrollPosition = that._$scrollableAtPointer[that._scrollValue]() + that._scrollSpeed;
        that._$scrollableAtPointer[that._scrollValue](nextScrollPosition);
      }
      const dragMoveArgs = that._component._dragMoveArgs;
      if (dragMoveArgs) {
        that._component._dragMoveHandler(dragMoveArgs);
      }
    }
  }
  reset() {
    this._$scrollableAtPointer = null;
    this._scrollSpeed = 0;
    this._preventScroll = true;
  }
  isOutsideScrollable($scrollable, event) {
    if (!$scrollable) {
      return false;
    }
    const scrollableSize = getBoundingRect($scrollable.get(0));
    const start = scrollableSize[this._limitProps.start];
    const size = scrollableSize[this._sizeAttr];
    const mousePosition = getMousePosition(event);
    const location = "width" === this._sizeAttr ? mousePosition.x : mousePosition.y;
    return location < start || location > start + size;
  }
};
var ScrollAnimator = class extends animator_default {
  constructor(strategy) {
    super();
    this._strategy = strategy;
  }
  _step() {
    const horizontalScrollHelper = this._strategy._horizontalScrollHelper;
    const verticalScrollHelper = this._strategy._verticalScrollHelper;
    null === horizontalScrollHelper || void 0 === horizontalScrollHelper || horizontalScrollHelper.scrollByStep();
    null === verticalScrollHelper || void 0 === verticalScrollHelper || verticalScrollHelper.scrollByStep();
  }
};
var Draggable = class extends dom_component_default {
  reset() {
  }
  dragMove(e) {
  }
  dragEnter() {
  }
  dragLeave() {
  }
  dragEnd(sourceEvent) {
    const sourceDraggable2 = this._getSourceDraggable();
    sourceDraggable2._fireRemoveEvent(sourceEvent);
    return Deferred().resolve();
  }
  _fireRemoveEvent(sourceEvent) {
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      onDragStart: null,
      onDragMove: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragLeave: null,
      onDragCancel: null,
      onCancelByEsc: false,
      onDrop: null,
      immediate: true,
      dragDirection: "both",
      boundOffset: 0,
      allowMoveByClick: false,
      itemData: null,
      contentTemplate: "content",
      handle: "",
      filter: "",
      clone: false,
      autoScroll: true,
      scrollSpeed: 30,
      scrollSensitivity: 60
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference.apply(this, arguments);
    extend(this._optionsByReference, {
      component: true,
      group: true,
      itemData: true,
      data: true
    });
  }
  _init() {
    super._init();
    this._attachEventHandlers();
    this._scrollAnimator = new ScrollAnimator(this);
    this._horizontalScrollHelper = new ScrollHelper("horizontal", this);
    this._verticalScrollHelper = new ScrollHelper("vertical", this);
    this._initScrollTop = 0;
    this._initScrollLeft = 0;
  }
  _normalizeCursorOffset(offset) {
    if (isObject(offset)) {
      offset = {
        h: offset.x,
        v: offset.y
      };
    }
    offset = splitPair(offset).map(((value2) => parseFloat(value2)));
    return {
      left: offset[0],
      top: 1 === offset.length ? offset[0] : offset[1]
    };
  }
  _getNormalizedCursorOffset(offset, options) {
    if (isFunction(offset)) {
      offset = offset.call(this, options);
    }
    return this._normalizeCursorOffset(offset);
  }
  _calculateElementOffset(options) {
    let elementOffset;
    let dragElementOffset;
    const {
      event
    } = options;
    const $element = renderer_default(options.itemElement);
    const $dragElement = renderer_default(options.dragElement);
    const isCloned = this._dragElementIsCloned();
    const cursorOffset = this.option("cursorOffset");
    let normalizedCursorOffset = {
      left: 0,
      top: 0
    };
    const currentLocate = this._initialLocate = locate($dragElement);
    if (isCloned || options.initialOffset || cursorOffset) {
      elementOffset = options.initialOffset || $element.offset();
      if (cursorOffset) {
        normalizedCursorOffset = this._getNormalizedCursorOffset(cursorOffset, options);
        if (isFinite(normalizedCursorOffset.left)) {
          elementOffset.left = event.pageX;
        }
        if (isFinite(normalizedCursorOffset.top)) {
          elementOffset.top = event.pageY;
        }
      }
      dragElementOffset = $dragElement.offset();
      elementOffset.top -= dragElementOffset.top + (normalizedCursorOffset.top || 0) - currentLocate.top;
      elementOffset.left -= dragElementOffset.left + (normalizedCursorOffset.left || 0) - currentLocate.left;
    }
    return elementOffset;
  }
  _initPosition(options) {
    const $dragElement = renderer_default(options.dragElement);
    const elementOffset = this._calculateElementOffset(options);
    if (elementOffset) {
      this._move(elementOffset, $dragElement);
    }
    this._startPosition = locate($dragElement);
  }
  _startAnimator() {
    if (!this._scrollAnimator.inProgress()) {
      this._scrollAnimator.start();
    }
  }
  _stopAnimator() {
    this._scrollAnimator.stop();
  }
  _addWidgetPrefix(className) {
    const componentName = this.NAME;
    return dasherize(componentName) + (className ? `-${className}` : "");
  }
  _getItemsSelector() {
    return this.option("filter") || "";
  }
  _$content() {
    const $element = this.$element();
    const $wrapper = $element.children(".dx-template-wrapper");
    return $wrapper.length ? $wrapper : $element;
  }
  _attachEventHandlers() {
    if (this.option("disabled")) {
      return;
    }
    let $element = this._$content();
    let itemsSelector = this._getItemsSelector();
    const allowMoveByClick = this.option("allowMoveByClick");
    const data = {
      direction: this.option("dragDirection"),
      immediate: this.option("immediate"),
      checkDropTarget: ($target, event) => {
        const targetGroup = this.option("group");
        const sourceGroup = this._getSourceDraggable().option("group");
        const $scrollable = this._getScrollable($target);
        if (this._verticalScrollHelper.isOutsideScrollable($scrollable, event) || this._horizontalScrollHelper.isOutsideScrollable($scrollable, event)) {
          return false;
        }
        return sourceGroup && sourceGroup === targetGroup;
      }
    };
    if (allowMoveByClick) {
      $element = this._getArea();
      m_events_engine_default.on($element, POINTERDOWN_EVENT_NAME, data, this._pointerDownHandler.bind(this));
    }
    if (">" === itemsSelector[0]) {
      itemsSelector = itemsSelector.slice(1);
    }
    m_events_engine_default.on($element, DRAGSTART_EVENT_NAME, itemsSelector, data, this._dragStartHandler.bind(this));
    m_events_engine_default.on($element, DRAG_EVENT_NAME, data, this._dragMoveHandler.bind(this));
    m_events_engine_default.on($element, DRAGEND_EVENT_NAME, data, this._dragEndHandler.bind(this));
    m_events_engine_default.on($element, DRAG_ENTER_EVENT_NAME, data, this._dragEnterHandler.bind(this));
    m_events_engine_default.on($element, DRAGEND_LEAVE_EVENT_NAME, data, this._dragLeaveHandler.bind(this));
    if (this.option("onCancelByEsc")) {
      m_events_engine_default.on($element, KEYDOWN_EVENT_NAME, this._keydownHandler.bind(this));
    }
  }
  _dragElementIsCloned() {
    var _this$_$dragElement;
    return null === (_this$_$dragElement = this._$dragElement) || void 0 === _this$_$dragElement ? void 0 : _this$_$dragElement.hasClass(this._addWidgetPrefix("clone"));
  }
  _getDragTemplateArgs($element, $container) {
    return {
      container: getPublicElement($container),
      model: {
        itemData: this.option("itemData"),
        itemElement: getPublicElement($element)
      }
    };
  }
  _createDragElement($element) {
    let result = $element;
    const clone = this.option("clone");
    const $container = this._getContainer();
    let template = this.option("dragTemplate");
    if (template) {
      template = this._getTemplate(template);
      result = renderer_default("<div>").appendTo($container);
      template.render(this._getDragTemplateArgs($element, result));
    } else if (clone) {
      result = renderer_default("<div>").appendTo($container);
      $element.clone().css({
        width: $element.css("width"),
        height: $element.css("height")
      }).appendTo(result);
    }
    return result.toggleClass(this._addWidgetPrefix("clone"), result.get(0) !== $element.get(0)).toggleClass("dx-rtl", this.option("rtlEnabled"));
  }
  _resetDragElement() {
    if (this._dragElementIsCloned()) {
      var _this$_$dragElement2;
      null === (_this$_$dragElement2 = this._$dragElement) || void 0 === _this$_$dragElement2 || _this$_$dragElement2.remove();
    } else {
      this._toggleDraggingClass(false);
    }
    this._$dragElement = null;
  }
  _resetSourceElement() {
    this._toggleDragSourceClass(false);
    this._$sourceElement = null;
  }
  _detachEventHandlers() {
    m_events_engine_default.off(this._$content(), `.${DRAGGABLE}`);
    m_events_engine_default.off(this._getArea(), `.${DRAGGABLE}`);
  }
  _move(position, $element) {
    move($element || this._$dragElement, position);
  }
  _getDraggableElement(e) {
    const $sourceElement = this._getSourceElement();
    if ($sourceElement) {
      return $sourceElement;
    }
    const allowMoveByClick = this.option("allowMoveByClick");
    if (allowMoveByClick) {
      return this.$element();
    }
    let $target = renderer_default(null === e || void 0 === e ? void 0 : e.target);
    const itemsSelector = this._getItemsSelector();
    if (">" === itemsSelector[0]) {
      const $items = this._$content().find(itemsSelector);
      if (!$items.is($target)) {
        $target = $target.closest($items);
      }
    }
    return $target;
  }
  _getSourceElement() {
    const draggable = this._getSourceDraggable();
    return draggable._$sourceElement;
  }
  _pointerDownHandler(e) {
    if (needSkipEvent(e)) {
      return;
    }
    const position = {};
    const $element = this.$element();
    const {
      dragDirection
    } = this.option();
    if ("horizontal" === dragDirection || "both" === dragDirection) {
      position.left = e.pageX - $element.offset().left + locate($element).left - getWidth($element) / 2;
    }
    if ("vertical" === dragDirection || "both" === dragDirection) {
      position.top = e.pageY - $element.offset().top + locate($element).top - getHeight($element) / 2;
    }
    this._move(position, $element);
    this._getAction("onDragMove")(this._getEventArgs(e));
  }
  _isValidElement(event, $element) {
    var _event$originalEvent;
    const {
      handle
    } = this.option();
    const $target = renderer_default(null === (_event$originalEvent = event.originalEvent) || void 0 === _event$originalEvent ? void 0 : _event$originalEvent.target);
    if (handle && !$target.closest(handle).length) {
      return false;
    }
    if (!$element.length) {
      return false;
    }
    return !$element.is(".dx-state-disabled, .dx-state-disabled *");
  }
  _dragStartHandler(e) {
    const $element = this._getDraggableElement(e);
    this.dragInProgress = true;
    if (!this._isValidElement(e, $element)) {
      e.cancel = true;
      return;
    }
    if (this._$sourceElement) {
      return;
    }
    const dragStartArgs = this._getDragStartArgs(e, $element);
    this._getAction("onDragStart")(dragStartArgs);
    if (dragStartArgs.cancel) {
      e.cancel = true;
      return;
    }
    this.option("itemData", dragStartArgs.itemData);
    this._setSourceDraggable();
    this._$sourceElement = $element;
    let initialOffset = $element.offset();
    if (!this._hasClonedDraggable() && this.option("autoScroll")) {
      this._initScrollTop = this._getScrollableScrollTop();
      this._initScrollLeft = this._getScrollableScrollLeft();
      initialOffset = this._getDraggableElementOffset(initialOffset.left, initialOffset.top);
    }
    const $dragElement = this._$dragElement = this._createDragElement($element);
    this._toggleDraggingClass(true);
    this._toggleDragSourceClass(true);
    this._setGestureCoverCursor($dragElement.children());
    const isFixedPosition = "fixed" === $dragElement.css("position");
    this._initPosition(extend({}, dragStartArgs, {
      dragElement: $dragElement.get(0),
      initialOffset: isFixedPosition && initialOffset
    }));
    this._getAction("onDraggableElementShown")(_extends({}, dragStartArgs, {
      dragElement: $dragElement
    }));
    const $area = this._getArea();
    const areaOffset = this._getAreaOffset($area);
    const boundOffset = this._getBoundOffset();
    const areaWidth = getOuterWidth($area);
    const areaHeight = getOuterHeight($area);
    const elementWidth = getWidth($dragElement);
    const elementHeight = getHeight($dragElement);
    const startOffset_left = $dragElement.offset().left - areaOffset.left, startOffset_top = $dragElement.offset().top - areaOffset.top;
    if ($area.length) {
      e.maxLeftOffset = startOffset_left - boundOffset.left;
      e.maxRightOffset = areaWidth - startOffset_left - elementWidth - boundOffset.right;
      e.maxTopOffset = startOffset_top - boundOffset.top;
      e.maxBottomOffset = areaHeight - startOffset_top - elementHeight - boundOffset.bottom;
    }
    if (this.option("autoScroll")) {
      this._startAnimator();
    }
  }
  _getAreaOffset($area) {
    const offset = $area && position_default.offset($area);
    return offset || {
      left: 0,
      top: 0
    };
  }
  _toggleDraggingClass(value2) {
    var _this$_$dragElement3;
    null === (_this$_$dragElement3 = this._$dragElement) || void 0 === _this$_$dragElement3 || _this$_$dragElement3.toggleClass(this._addWidgetPrefix("dragging"), value2);
  }
  _toggleDragSourceClass(value2, $element) {
    const $sourceElement = $element || this._$sourceElement;
    null === $sourceElement || void 0 === $sourceElement || $sourceElement.toggleClass(this._addWidgetPrefix("source"), value2);
  }
  _setGestureCoverCursor($element) {
    renderer_default(".dx-gesture-cover").css("cursor", $element.css("cursor"));
  }
  _getBoundOffset() {
    let boundOffset = this.option("boundOffset");
    if (isFunction(boundOffset)) {
      boundOffset = boundOffset.call(this);
    }
    return quadToObject(boundOffset);
  }
  _getArea() {
    let area = this.option("boundary");
    if (isFunction(area)) {
      area = area.call(this);
    }
    return renderer_default(area);
  }
  _getContainer() {
    let {
      container
    } = this.option();
    if (void 0 === container) {
      container = value();
    }
    return renderer_default(container);
  }
  _getDraggableElementOffset(initialOffsetX, initialOffsetY) {
    var _this$_startPosition, _this$_startPosition2;
    const initScrollTop = this._initScrollTop;
    const initScrollLeft = this._initScrollLeft;
    const scrollTop = this._getScrollableScrollTop();
    const scrollLeft = this._getScrollableScrollLeft();
    const elementPosition = renderer_default(this.element()).css("position");
    const isFixedPosition = "fixed" === elementPosition;
    const result = {
      left: ((null === (_this$_startPosition = this._startPosition) || void 0 === _this$_startPosition ? void 0 : _this$_startPosition.left) ?? 0) + initialOffsetX,
      top: ((null === (_this$_startPosition2 = this._startPosition) || void 0 === _this$_startPosition2 ? void 0 : _this$_startPosition2.top) ?? 0) + initialOffsetY
    };
    if (isFixedPosition || this._hasClonedDraggable()) {
      return result;
    }
    return {
      left: isNumeric(scrollLeft) ? result.left + scrollLeft - initScrollLeft : result.left,
      top: isNumeric(scrollTop) ? result.top + scrollTop - initScrollTop : result.top
    };
  }
  _hasClonedDraggable() {
    return this.option("clone") || this.option("dragTemplate");
  }
  _dragMoveHandler(e) {
    this._dragMoveArgs = e;
    if (!this._$dragElement) {
      e.cancel = true;
      return;
    }
    const offset = this._getDraggableElementOffset(e.offset.x, e.offset.y);
    this._move(offset);
    this._updateScrollable(e);
    const eventArgs = this._getEventArgs(e);
    this._getAction("onDragMove")(eventArgs);
    if (true === eventArgs.cancel) {
      return;
    }
    const targetDraggable2 = this._getTargetDraggable();
    targetDraggable2.dragMove(e, scrollBy);
  }
  _updateScrollable(e) {
    const that = this;
    if (that.option("autoScroll")) {
      const mousePosition = getMousePosition(e);
      const allObjects = dom_adapter_default.elementsFromPoint(mousePosition.x, mousePosition.y, this.$element().get(0));
      that._verticalScrollHelper.updateScrollable(allObjects, mousePosition);
      that._horizontalScrollHelper.updateScrollable(allObjects, mousePosition);
    }
  }
  _getScrollable($element) {
    let $scrollable;
    $element.parents().toArray().some(((parent) => {
      const $parent = renderer_default(parent);
      if (this._horizontalScrollHelper.isScrollable($parent) || this._verticalScrollHelper.isScrollable($parent)) {
        $scrollable = $parent;
        return true;
      }
      return false;
    }));
    return $scrollable;
  }
  _getScrollableScrollTop() {
    var _this$_getScrollable;
    return (null === (_this$_getScrollable = this._getScrollable(renderer_default(this.element()))) || void 0 === _this$_getScrollable ? void 0 : _this$_getScrollable.scrollTop()) ?? 0;
  }
  _getScrollableScrollLeft() {
    var _this$_getScrollable2;
    return (null === (_this$_getScrollable2 = this._getScrollable(renderer_default(this.element()))) || void 0 === _this$_getScrollable2 ? void 0 : _this$_getScrollable2.scrollLeft()) ?? 0;
  }
  _defaultActionArgs() {
    const args = super._defaultActionArgs.apply(this, arguments);
    const component = this.option("component");
    if (component) {
      args.component = component;
      args.element = component.element();
    }
    return args;
  }
  _getEventArgs(e) {
    const sourceDraggable2 = this._getSourceDraggable();
    const targetDraggable2 = this._getTargetDraggable();
    return {
      event: e,
      itemData: sourceDraggable2.option("itemData"),
      itemElement: getPublicElement(sourceDraggable2._$sourceElement),
      fromComponent: sourceDraggable2.option("component") || sourceDraggable2,
      toComponent: targetDraggable2.option("component") || targetDraggable2,
      fromData: sourceDraggable2.option("data"),
      toData: targetDraggable2.option("data")
    };
  }
  _getDragStartArgs(e, $itemElement) {
    const args = this._getEventArgs(e);
    return {
      event: args.event,
      itemData: args.itemData,
      itemElement: $itemElement,
      fromData: args.fromData
    };
  }
  _revertItemToInitialPosition() {
    !this._dragElementIsCloned() && this._move(this._initialLocate, this._$sourceElement);
  }
  _dragEndHandler(e) {
    const d = Deferred();
    const dragEndEventArgs = this._getEventArgs(e);
    const dropEventArgs = this._getEventArgs(e);
    const targetDraggable2 = this._getTargetDraggable();
    let needRevertPosition = true;
    this.dragInProgress = false;
    try {
      this._getAction("onDragEnd")(dragEndEventArgs);
    } finally {
      when(fromPromise(dragEndEventArgs.cancel)).done(((cancel) => {
        if (!cancel) {
          if (targetDraggable2 !== this) {
            targetDraggable2._getAction("onDrop")(dropEventArgs);
          }
          if (!dropEventArgs.cancel) {
            needRevertPosition = false;
            when(fromPromise(targetDraggable2.dragEnd(dragEndEventArgs))).always(d.resolve);
            return;
          }
        }
        d.resolve();
      })).fail(d.resolve);
      d.done((() => {
        if (needRevertPosition) {
          this._revertItemToInitialPosition();
        }
        this._resetDragOptions(targetDraggable2);
      }));
    }
  }
  _isTargetOverAnotherDraggable(e) {
    const sourceDraggable2 = this._getSourceDraggable();
    if (this === sourceDraggable2) {
      return false;
    }
    const $dragElement = sourceDraggable2._$dragElement;
    const $sourceDraggableElement = sourceDraggable2.$element();
    const $targetDraggableElement = this.$element();
    const mousePosition = getMousePosition(e);
    const elements = dom_adapter_default.elementsFromPoint(mousePosition.x, mousePosition.y, this.element());
    const firstWidgetElement = elements.filter(((element) => {
      const $element = renderer_default(element);
      if ($element.hasClass(this._addWidgetPrefix())) {
        return !$element.closest($dragElement).length;
      }
      return false;
    }))[0];
    const $sourceElement = this._getSourceElement();
    const isTargetOverItself = firstWidgetElement === $sourceDraggableElement.get(0);
    const isTargetOverNestedDraggable = renderer_default(firstWidgetElement).closest($sourceElement).length;
    return !firstWidgetElement || firstWidgetElement === $targetDraggableElement.get(0) && !isTargetOverItself && !isTargetOverNestedDraggable;
  }
  _dragEnterHandler(e) {
    this._fireDragEnterEvent(e);
    if (this._isTargetOverAnotherDraggable(e)) {
      this._setTargetDraggable();
    }
    const sourceDraggable2 = this._getSourceDraggable();
    sourceDraggable2.dragEnter(e);
  }
  _dragLeaveHandler(e) {
    this._fireDragLeaveEvent(e);
    this._resetTargetDraggable();
    if (this !== this._getSourceDraggable()) {
      this.reset();
    }
    const sourceDraggable2 = this._getSourceDraggable();
    sourceDraggable2.dragLeave(e);
  }
  _keydownHandler(e) {
    if (this.dragInProgress && "Escape" === e.key) {
      this._keydownEscapeHandler(e);
    }
  }
  _keydownEscapeHandler(e) {
    var _sourceDraggable;
    const $sourceElement = this._getSourceElement();
    if (!$sourceElement) {
      return;
    }
    const dragCancelEventArgs = this._getEventArgs(e);
    this._getAction("onDragCancel")(dragCancelEventArgs);
    if (dragCancelEventArgs.cancel) {
      return;
    }
    this.dragInProgress = false;
    null === (_sourceDraggable = sourceDraggable) || void 0 === _sourceDraggable || _sourceDraggable._toggleDraggingClass(false);
    this._detachEventHandlers();
    this._revertItemToInitialPosition();
    const targetDraggable2 = this._getTargetDraggable();
    this._resetDragOptions(targetDraggable2);
    this._attachEventHandlers();
  }
  _getAction(name) {
    return this[`_${name}Action`] || this._createActionByOption(name);
  }
  _getAnonymousTemplateName() {
    return "content";
  }
  _initTemplates() {
    if (!this.option("contentTemplate")) {
      return;
    }
    this._templateManager.addDefaultTemplates({
      content: new EmptyTemplate()
    });
    super._initTemplates.apply(this, arguments);
  }
  _render() {
    super._render();
    this.$element().addClass(this._addWidgetPrefix());
    const transclude = this._templateManager.anonymousTemplateName === this.option("contentTemplate");
    const template = this._getTemplateByOption("contentTemplate");
    if (template) {
      renderer_default(template.render({
        container: this.element(),
        transclude
      }));
    }
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "onDragStart":
      case "onDragMove":
      case "onDragEnd":
      case "onDrop":
      case "onDragEnter":
      case "onDragLeave":
      case "onDragCancel":
      case "onDraggableElementShown":
        this[`_${name}Action`] = this._createActionByOption(name);
        break;
      case "dragTemplate":
      case "contentTemplate":
      case "container":
      case "clone":
      case "scrollSensitivity":
      case "scrollSpeed":
      case "boundOffset":
      case "handle":
      case "group":
      case "data":
      case "itemData":
        break;
      case "allowMoveByClick":
      case "dragDirection":
      case "disabled":
      case "boundary":
      case "filter":
      case "immediate":
        this._resetDragElement();
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case "onCancelByEsc":
        this._keydownHandler();
        break;
      case "autoScroll":
        this._verticalScrollHelper.reset();
        this._horizontalScrollHelper.reset();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _getTargetDraggable() {
    return targetDraggable || this;
  }
  _getSourceDraggable() {
    return sourceDraggable || this;
  }
  _setTargetDraggable() {
    const currentGroup = this.option("group");
    const sourceDraggable2 = this._getSourceDraggable();
    if (currentGroup && currentGroup === sourceDraggable2.option("group")) {
      targetDraggable = this;
    }
  }
  _setSourceDraggable() {
    sourceDraggable = this;
  }
  _resetSourceDraggable() {
    sourceDraggable = null;
  }
  _resetTargetDraggable() {
    targetDraggable = null;
  }
  _resetDragOptions(targetDraggable2) {
    this.reset();
    targetDraggable2.reset();
    this._stopAnimator();
    this._horizontalScrollHelper.reset();
    this._verticalScrollHelper.reset();
    this._resetDragElement();
    this._resetSourceElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
  }
  _dispose() {
    super._dispose();
    this._detachEventHandlers();
    this._resetDragElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
    this._$sourceElement = null;
    this._stopAnimator();
  }
  _fireDragEnterEvent(sourceEvent) {
    const args = this._getEventArgs(sourceEvent);
    this._getAction("onDragEnter")(args);
  }
  _fireDragLeaveEvent(sourceEvent) {
    const args = this._getEventArgs(sourceEvent);
    this._getAction("onDragLeave")(args);
  }
};
component_registrator_default(DRAGGABLE, Draggable);
var m_draggable_default = Draggable;

// node_modules/devextreme/esm/__internal/m_sortable.js
var window2 = getWindow();
var SORTABLE = "dxSortable";
var isElementVisible = (itemElement) => renderer_default(itemElement).is(":visible");
var animate = (element, config) => {
  var _config$to, _config$to2;
  if (!element) {
    return;
  }
  const left = (null === (_config$to = config.to) || void 0 === _config$to ? void 0 : _config$to.left) || 0;
  const top = (null === (_config$to2 = config.to) || void 0 === _config$to2 ? void 0 : _config$to2.top) || 0;
  element.style.transform = `translate(${left}px,${top}px)`;
  element.style.transition = fx_default.off ? "" : `transform ${config.duration}ms ${config.easing}`;
};
var stopAnimation = (element) => {
  if (!element) {
    return;
  }
  element.style.transform = "";
  element.style.transition = "";
};
function getScrollableBoundary($scrollable) {
  const offset = $scrollable.offset();
  const {
    style
  } = $scrollable[0];
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingRight = parseFloat(style.paddingRight) || 0;
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const width = $scrollable[0].clientWidth - (paddingLeft + paddingRight);
  const height = getHeight($scrollable);
  const left = offset.left + paddingLeft;
  const top = offset.top + paddingTop;
  return {
    left,
    right: left + width,
    top,
    bottom: top + height
  };
}
var Sortable = class extends m_draggable_default {
  _init() {
    super._init();
    this._sourceScrollHandler = this._handleSourceScroll.bind(this);
    this._sourceScrollableInfo = null;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      clone: true,
      filter: "> *",
      itemOrientation: "vertical",
      dropFeedbackMode: "push",
      allowDropInsideItem: false,
      allowReordering: true,
      moveItemOnDrop: false,
      onDragChange: null,
      onAdd: null,
      onRemove: null,
      onReorder: null,
      onPlaceholderPrepared: null,
      placeholderClassName: "",
      animation: {
        type: "slide",
        duration: 300,
        easing: "ease"
      },
      fromIndex: null,
      toIndex: null,
      dropInsideItem: false,
      itemPoints: null,
      fromIndexOffset: 0,
      offset: 0,
      autoUpdate: false,
      draggableElementSize: 0
    });
  }
  reset() {
    this.option({
      dropInsideItem: false,
      toIndex: null,
      fromIndex: null,
      itemPoints: null,
      fromIndexOffset: 0,
      draggableElementSize: 0
    });
    if (this._$placeholderElement) {
      this._$placeholderElement.remove();
    }
    this._$placeholderElement = null;
    if (!this._isIndicateMode() && this._$modifiedItem) {
      this._$modifiedItem.css("marginBottom", this._modifiedItemMargin);
      this._$modifiedItem = null;
    }
  }
  _getPrevVisibleItem(items, index) {
    return items.slice(0, index).reverse().filter(isElementVisible)[0];
  }
  _dragStartHandler(e) {
    super._dragStartHandler.apply(this, arguments);
    if (true === e.cancel) {
      return;
    }
    const $sourceElement = this._getSourceElement();
    this._updateItemPoints();
    this._subscribeToSourceScroll(e);
    this.option("fromIndex", this._getElementIndex($sourceElement));
    this.option("fromIndexOffset", this.option("offset"));
  }
  _subscribeToSourceScroll(e) {
    const $scrollable = this._getScrollable(renderer_default(e.target));
    if ($scrollable) {
      this._sourceScrollableInfo = {
        element: $scrollable,
        scrollLeft: $scrollable.scrollLeft(),
        scrollTop: $scrollable.scrollTop()
      };
      m_events_engine_default.off($scrollable, "scroll", this._sourceScrollHandler);
      m_events_engine_default.on($scrollable, "scroll", this._sourceScrollHandler);
    }
  }
  _unsubscribeFromSourceScroll() {
    if (this._sourceScrollableInfo) {
      m_events_engine_default.off(this._sourceScrollableInfo.element, "scroll", this._sourceScrollHandler);
      this._sourceScrollableInfo = null;
    }
  }
  _handleSourceScroll(e) {
    const sourceScrollableInfo = this._sourceScrollableInfo;
    if (sourceScrollableInfo) {
      ["scrollLeft", "scrollTop"].forEach(((scrollProp) => {
        if (e.target[scrollProp] !== sourceScrollableInfo[scrollProp]) {
          const scrollBy2 = e.target[scrollProp] - sourceScrollableInfo[scrollProp];
          this._correctItemPoints(scrollBy2);
          this._movePlaceholder();
          sourceScrollableInfo[scrollProp] = e.target[scrollProp];
        }
      }));
    }
  }
  _dragEnterHandler(e) {
    super._dragEnterHandler.apply(this, arguments);
    if (this === this._getSourceDraggable()) {
      return;
    }
    this._subscribeToSourceScroll(e);
    this._updateItemPoints();
    this.option("fromIndex", -1);
    if (!this._isIndicateMode()) {
      const itemPoints = this.option("itemPoints");
      const lastItemPoint = itemPoints[itemPoints.length - 1];
      if (lastItemPoint) {
        const $element = this.$element();
        const $sourceElement = this._getSourceElement();
        const isVertical = this._isVerticalOrientation();
        const sourceElementSize = isVertical ? getOuterHeight($sourceElement, true) : getOuterWidth($sourceElement, true);
        const scrollSize = $element.get(0)[isVertical ? "scrollHeight" : "scrollWidth"];
        const scrollPosition = $element.get(0)[isVertical ? "scrollTop" : "scrollLeft"];
        const positionProp = isVertical ? "top" : "left";
        const lastPointPosition = lastItemPoint[positionProp];
        const elementPosition = $element.offset()[positionProp];
        const freeSize = elementPosition + scrollSize - scrollPosition - lastPointPosition;
        if (freeSize < sourceElementSize) {
          if (isVertical) {
            const items = this._getItems();
            const $lastItem = renderer_default(this._getPrevVisibleItem(items));
            this._$modifiedItem = $lastItem;
            this._modifiedItemMargin = $lastItem.get(0).style.marginBottom;
            $lastItem.css("marginBottom", sourceElementSize - freeSize);
            const $sortable = $lastItem.closest(".dx-sortable");
            const sortable = $sortable.data("dxScrollable") || $sortable.data("dxScrollView");
            null === sortable || void 0 === sortable || sortable.update();
          }
        }
      }
    }
  }
  _dragLeaveHandler() {
    super._dragLeaveHandler.apply(this, arguments);
    if (this !== this._getSourceDraggable()) {
      this._unsubscribeFromSourceScroll();
    }
  }
  dragEnter() {
    if (this !== this._getTargetDraggable()) {
      this.option("toIndex", -1);
    }
  }
  dragLeave() {
    if (this !== this._getTargetDraggable()) {
      this.option("toIndex", this.option("fromIndex"));
    }
  }
  _allowDrop(event) {
    const targetDraggable2 = this._getTargetDraggable();
    const $targetDraggable = targetDraggable2.$element();
    const $scrollable = this._getScrollable($targetDraggable);
    if ($scrollable) {
      const {
        left,
        right,
        top,
        bottom
      } = getScrollableBoundary($scrollable);
      const toIndex = this.option("toIndex");
      const itemPoints = this.option("itemPoints");
      const itemPoint = null === itemPoints || void 0 === itemPoints ? void 0 : itemPoints.filter(((item) => item.index === toIndex))[0];
      if (itemPoint && void 0 !== itemPoint.top) {
        const isVertical = this._isVerticalOrientation();
        if (isVertical) {
          return top <= Math.ceil(itemPoint.top) && Math.floor(itemPoint.top) <= bottom;
        }
        return left <= Math.ceil(itemPoint.left) && Math.floor(itemPoint.left) <= right;
      }
    }
    return true;
  }
  dragEnd(sourceEvent) {
    this._unsubscribeFromSourceScroll();
    const $sourceElement = this._getSourceElement();
    const sourceDraggable2 = this._getSourceDraggable();
    const isSourceDraggable = sourceDraggable2.NAME !== this.NAME;
    const toIndex = this.option("toIndex");
    const {
      event
    } = sourceEvent;
    const allowDrop = this._allowDrop(event);
    if (null !== toIndex && toIndex >= 0 && allowDrop) {
      let cancelAdd;
      let cancelRemove;
      if (sourceDraggable2 !== this) {
        cancelAdd = this._fireAddEvent(event);
        if (!cancelAdd) {
          cancelRemove = this._fireRemoveEvent(event);
        }
      }
      if (isSourceDraggable) {
        resetPosition($sourceElement);
      }
      if (this.option("moveItemOnDrop")) {
        !cancelAdd && this._moveItem($sourceElement, toIndex, cancelRemove);
      }
      if (sourceDraggable2 === this) {
        return this._fireReorderEvent(event);
      }
    }
    return Deferred().resolve();
  }
  dragMove(e) {
    const itemPoints = this.option("itemPoints");
    if (!itemPoints) {
      return;
    }
    const isVertical = this._isVerticalOrientation();
    const axisName = isVertical ? "top" : "left";
    const cursorPosition = isVertical ? e.pageY : e.pageX;
    const rtlEnabled = this.option("rtlEnabled");
    let itemPoint;
    for (let i = itemPoints.length - 1; i >= 0; i--) {
      const centerPosition = itemPoints[i + 1] && (itemPoints[i][axisName] + itemPoints[i + 1][axisName]) / 2;
      if ((!isVertical && rtlEnabled ? cursorPosition > centerPosition : centerPosition > cursorPosition) || void 0 === centerPosition) {
        itemPoint = itemPoints[i];
      } else {
        break;
      }
    }
    if (itemPoint) {
      this._updatePlaceholderPosition(e, itemPoint);
      if (this._verticalScrollHelper.isScrolling() && this._isIndicateMode()) {
        this._movePlaceholder();
      }
    }
  }
  _isIndicateMode() {
    return "indicate" === this.option("dropFeedbackMode") || this.option("allowDropInsideItem");
  }
  _createPlaceholder() {
    if (!this._isIndicateMode()) {
      return;
    }
    const customCssClass = this.option("placeholderClassName");
    this._$placeholderElement = renderer_default("<div>").addClass(this._addWidgetPrefix("placeholder")).addClass(customCssClass ?? "").insertBefore(this._getSourceDraggable()._$dragElement);
    return this._$placeholderElement;
  }
  _getItems() {
    const itemsSelector = this._getItemsSelector();
    return this._$content().find(itemsSelector).not(`.${this._addWidgetPrefix("placeholder")}`).not(`.${this._addWidgetPrefix("clone")}`).toArray();
  }
  _allowReordering() {
    const sourceDraggable2 = this._getSourceDraggable();
    const targetDraggable2 = this._getTargetDraggable();
    return sourceDraggable2 !== targetDraggable2 || this.option("allowReordering");
  }
  _isValidPoint(visibleIndex, draggableVisibleIndex, dropInsideItem) {
    const allowDropInsideItem = this.option("allowDropInsideItem");
    const allowReordering = dropInsideItem || this._allowReordering();
    if (!allowReordering && (0 !== visibleIndex || !allowDropInsideItem)) {
      return false;
    }
    if (!this._isIndicateMode()) {
      return true;
    }
    return -1 === draggableVisibleIndex || visibleIndex !== draggableVisibleIndex && (dropInsideItem || visibleIndex !== draggableVisibleIndex + 1);
  }
  _getItemPoints() {
    const that = this;
    let result = [];
    let $item;
    let offset;
    let itemWidth;
    const {
      rtlEnabled
    } = that.option();
    const isVertical = that._isVerticalOrientation();
    const itemElements = that._getItems();
    const visibleItemElements = itemElements.filter(isElementVisible);
    const visibleItemCount = visibleItemElements.length;
    const $draggableItem = this._getDraggableElement();
    const draggableVisibleIndex = visibleItemElements.indexOf($draggableItem.get(0));
    if (visibleItemCount) {
      for (let i = 0; i <= visibleItemCount; i++) {
        const needCorrectLeftPosition = !isVertical && rtlEnabled ^ i === visibleItemCount;
        const needCorrectTopPosition = isVertical && i === visibleItemCount;
        if (i < visibleItemCount) {
          $item = renderer_default(visibleItemElements[i]);
          offset = $item.offset();
          itemWidth = getOuterWidth($item);
        }
        result.push({
          dropInsideItem: false,
          left: offset.left + (needCorrectLeftPosition ? itemWidth : 0),
          top: offset.top + (needCorrectTopPosition ? result[i - 1].height : 0),
          index: i === visibleItemCount ? itemElements.length : itemElements.indexOf($item.get(0)),
          $item,
          width: getOuterWidth($item),
          height: getOuterHeight($item),
          isValid: that._isValidPoint(i, draggableVisibleIndex)
        });
      }
      if (this.option("allowDropInsideItem")) {
        const points = result;
        result = [];
        for (let i = 0; i < points.length; i++) {
          result.push(points[i]);
          if (points[i + 1]) {
            result.push(extend({}, points[i], {
              dropInsideItem: true,
              top: Math.floor((points[i].top + points[i + 1].top) / 2),
              left: Math.floor((points[i].left + points[i + 1].left) / 2),
              isValid: this._isValidPoint(i, draggableVisibleIndex, true)
            }));
          }
        }
      }
    } else {
      result.push({
        dropInsideItem: false,
        index: 0,
        isValid: true
      });
    }
    return result;
  }
  _updateItemPoints(forceUpdate) {
    if (forceUpdate || this.option("autoUpdate") || !this.option("itemPoints")) {
      this.option("itemPoints", this._getItemPoints());
    }
  }
  _correctItemPoints(scrollBy2) {
    const itemPoints = this.option("itemPoints");
    if (scrollBy2 && itemPoints && !this.option("autoUpdate")) {
      const isVertical = this._isVerticalOrientation();
      const positionPropName = isVertical ? "top" : "left";
      itemPoints.forEach(((itemPoint) => {
        itemPoint[positionPropName] -= scrollBy2;
      }));
    }
  }
  _getElementIndex($itemElement) {
    return this._getItems().indexOf($itemElement.get(0));
  }
  _getDragTemplateArgs($element) {
    const args = super._getDragTemplateArgs.apply(this, arguments);
    args.model.fromIndex = this._getElementIndex($element);
    return args;
  }
  _togglePlaceholder(value2) {
    var _this$_$placeholderEl;
    null === (_this$_$placeholderEl = this._$placeholderElement) || void 0 === _this$_$placeholderEl || _this$_$placeholderEl.toggle(value2);
  }
  _isVerticalOrientation() {
    const {
      itemOrientation
    } = this.option();
    return "vertical" === itemOrientation;
  }
  _normalizeToIndex(toIndex, skipOffsetting) {
    const isAnotherDraggable = this._getSourceDraggable() !== this._getTargetDraggable();
    const fromIndex = this._getActualFromIndex();
    if (null === toIndex) {
      return fromIndex;
    }
    return Math.max(isAnotherDraggable || fromIndex >= toIndex || skipOffsetting ? toIndex : toIndex - 1, 0);
  }
  _updatePlaceholderPosition(e, itemPoint) {
    const sourceDraggable2 = this._getSourceDraggable();
    const toIndex = this._normalizeToIndex(itemPoint.index, itemPoint.dropInsideItem);
    const eventArgs = extend(this._getEventArgs(e), {
      toIndex,
      dropInsideItem: itemPoint.dropInsideItem
    });
    itemPoint.isValid && this._getAction("onDragChange")(eventArgs);
    if (eventArgs.cancel || !itemPoint.isValid) {
      if (!itemPoint.isValid) {
        this.option({
          dropInsideItem: false,
          toIndex: null
        });
      }
      return;
    }
    this.option({
      dropInsideItem: itemPoint.dropInsideItem,
      toIndex: itemPoint.index
    });
    this._getAction("onPlaceholderPrepared")(extend(this._getEventArgs(e), {
      placeholderElement: getPublicElement(this._$placeholderElement),
      dragElement: getPublicElement(sourceDraggable2._$dragElement)
    }));
    this._updateItemPoints();
  }
  _makeWidthCorrection($item, width) {
    this._$scrollable = this._getScrollable($item);
    if (this._$scrollable) {
      const scrollableWidth = getWidth(this._$scrollable);
      const overflowLeft = this._$scrollable.offset().left - $item.offset().left;
      const overflowRight = getOuterWidth($item) - overflowLeft - scrollableWidth;
      if (overflowLeft > 0) {
        width -= overflowLeft;
      }
      if (overflowRight > 0) {
        width -= overflowRight;
      }
    }
    return width;
  }
  _updatePlaceholderSizes($placeholderElement, $itemElement) {
    const dropInsideItem = this.option("dropInsideItem");
    const isVertical = this._isVerticalOrientation();
    let width = "";
    let height = "";
    $placeholderElement.toggleClass(this._addWidgetPrefix("placeholder-inside"), dropInsideItem);
    if (isVertical || dropInsideItem) {
      width = getOuterWidth($itemElement);
    }
    if (!isVertical || dropInsideItem) {
      height = getOuterHeight($itemElement);
    }
    width = this._makeWidthCorrection($itemElement, width);
    $placeholderElement.css({
      width,
      height
    });
  }
  _moveItem($itemElement, index, cancelRemove) {
    let $prevTargetItemElement;
    const $itemElements = this._getItems();
    const $targetItemElement = $itemElements[index];
    const sourceDraggable2 = this._getSourceDraggable();
    if (cancelRemove) {
      $itemElement = $itemElement.clone();
      sourceDraggable2._toggleDragSourceClass(false, $itemElement);
    }
    if (!$targetItemElement) {
      $prevTargetItemElement = $itemElements[index - 1];
    }
    this._moveItemCore($itemElement, $targetItemElement, $prevTargetItemElement);
  }
  _moveItemCore($targetItem, item, prevItem) {
    if (!item && !prevItem) {
      $targetItem.appendTo(this.$element());
    } else if (prevItem) {
      $targetItem.insertAfter(renderer_default(prevItem));
    } else {
      $targetItem.insertBefore(renderer_default(item));
    }
  }
  _getDragStartArgs(e, $itemElement) {
    return extend(super._getDragStartArgs.apply(this, arguments), {
      fromIndex: this._getElementIndex($itemElement)
    });
  }
  _getEventArgs(e) {
    const sourceDraggable2 = this._getSourceDraggable();
    const targetDraggable2 = this._getTargetDraggable();
    const dropInsideItem = targetDraggable2.option("dropInsideItem");
    return extend(super._getEventArgs.apply(this, arguments), {
      fromIndex: sourceDraggable2.option("fromIndex"),
      toIndex: this._normalizeToIndex(targetDraggable2.option("toIndex"), dropInsideItem),
      dropInsideItem
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "onDragChange":
      case "onPlaceholderPrepared":
      case "onAdd":
      case "onRemove":
      case "onReorder":
        this[`_${name}Action`] = this._createActionByOption(name);
        break;
      case "fromIndex":
        [false, true].forEach(((isDragSource) => {
          const fromIndex = isDragSource ? args.value : args.previousValue;
          if (null !== fromIndex) {
            const $fromElement = renderer_default(this._getItems()[fromIndex]);
            this._toggleDragSourceClass(isDragSource, $fromElement);
          }
        }));
        break;
      case "dropInsideItem":
        this._optionChangedDropInsideItem(args);
        break;
      case "toIndex":
        this._optionChangedToIndex(args);
        break;
      case "itemOrientation":
      case "allowDropInsideItem":
      case "moveItemOnDrop":
      case "dropFeedbackMode":
      case "itemPoints":
      case "animation":
      case "allowReordering":
      case "fromIndexOffset":
      case "offset":
      case "draggableElementSize":
      case "autoUpdate":
      case "placeholderClassName":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _optionChangedDropInsideItem() {
    if (this._isIndicateMode() && this._$placeholderElement) {
      this._movePlaceholder();
    }
  }
  _isPositionVisible(position) {
    const $element = this.$element();
    let scrollContainer;
    if ("hidden" !== $element.css("overflow")) {
      scrollContainer = $element.get(0);
    } else {
      $element.parents().each((function() {
        if ("visible" !== renderer_default(this).css("overflow")) {
          scrollContainer = this;
          return false;
        }
        return;
      }));
    }
    if (scrollContainer) {
      const clientRect = getBoundingRect(scrollContainer);
      const isVerticalOrientation = this._isVerticalOrientation();
      const start = isVerticalOrientation ? "top" : "left";
      const end = isVerticalOrientation ? "bottom" : "right";
      const pageOffset = isVerticalOrientation ? window2.pageYOffset : window2.pageXOffset;
      if (position[start] < clientRect[start] + pageOffset || position[start] > clientRect[end] + pageOffset) {
        return false;
      }
    }
    return true;
  }
  _optionChangedToIndex(args) {
    const toIndex = args.value;
    if (this._isIndicateMode()) {
      const showPlaceholder = null !== toIndex && toIndex >= 0;
      this._togglePlaceholder(showPlaceholder);
      if (showPlaceholder) {
        this._movePlaceholder();
      }
    } else {
      this._moveItems(args.previousValue, args.value, args.fullUpdate);
    }
  }
  update() {
    if (null === this.option("fromIndex") && null === this.option("toIndex")) {
      return;
    }
    this._updateItemPoints(true);
    this._updateDragSourceClass();
    const toIndex = this.option("toIndex");
    this._optionChangedToIndex({
      value: toIndex,
      fullUpdate: true
    });
  }
  _updateDragSourceClass() {
    const fromIndex = this._getActualFromIndex();
    const $fromElement = renderer_default(this._getItems()[fromIndex]);
    if ($fromElement.length) {
      this._$sourceElement = $fromElement;
      this._toggleDragSourceClass(true, $fromElement);
    }
  }
  _makeLeftCorrection(left) {
    const $scrollable = this._$scrollable;
    if ($scrollable && this._isVerticalOrientation()) {
      const overflowLeft = $scrollable.offset().left - left;
      if (overflowLeft > 0) {
        left += overflowLeft;
      }
    }
    return left;
  }
  _movePlaceholder() {
    const that = this;
    const $placeholderElement = that._$placeholderElement || that._createPlaceholder();
    if (!$placeholderElement) {
      return;
    }
    const items = that._getItems();
    const toIndex = that.option("toIndex");
    const isVerticalOrientation = that._isVerticalOrientation();
    const rtlEnabled = this.option("rtlEnabled");
    const dropInsideItem = that.option("dropInsideItem");
    let position = null;
    let itemElement = items[toIndex];
    if (itemElement) {
      const $itemElement = renderer_default(itemElement);
      position = $itemElement.offset();
      if (!isVerticalOrientation && rtlEnabled && !dropInsideItem) {
        position.left += getOuterWidth($itemElement, true);
      }
    } else {
      const prevVisibleItemElement = itemElement = this._getPrevVisibleItem(items, toIndex);
      if (prevVisibleItemElement) {
        position = renderer_default(prevVisibleItemElement).offset();
        if (isVerticalOrientation) {
          position.top += getOuterHeight(prevVisibleItemElement, true);
        } else if (!rtlEnabled) {
          position.left += getOuterWidth(prevVisibleItemElement, true);
        }
      }
    }
    that._updatePlaceholderSizes($placeholderElement, renderer_default(itemElement));
    if (position && !that._isPositionVisible(position)) {
      position = null;
    }
    if (position) {
      const isLastVerticalPosition = isVerticalOrientation && toIndex === items.length;
      const outerPlaceholderHeight = getOuterHeight($placeholderElement);
      position.left = that._makeLeftCorrection(position.left);
      position.top = isLastVerticalPosition && position.top >= outerPlaceholderHeight ? position.top - outerPlaceholderHeight : position.top;
      that._move(position, $placeholderElement);
    }
    $placeholderElement.toggle(!!position);
  }
  _getPositions(items, elementSize, fromIndex, toIndex) {
    const positions = [];
    for (let i = 0; i < items.length; i++) {
      let position = 0;
      if (null === toIndex || null === fromIndex) {
        positions.push(position);
        continue;
      }
      if (-1 === fromIndex) {
        if (i >= toIndex) {
          position = elementSize;
        }
      } else if (-1 === toIndex) {
        if (i > fromIndex) {
          position = -elementSize;
        }
      } else if (fromIndex < toIndex) {
        if (i > fromIndex && i < toIndex) {
          position = -elementSize;
        }
      } else if (fromIndex > toIndex) {
        if (i >= toIndex && i < fromIndex) {
          position = elementSize;
        }
      }
      positions.push(position);
    }
    return positions;
  }
  _getDraggableElementSize(isVerticalOrientation) {
    const $draggableItem = this._getDraggableElement();
    let size = this.option("draggableElementSize");
    if (!size) {
      size = isVerticalOrientation ? (getOuterHeight($draggableItem) + getOuterHeight($draggableItem, true)) / 2 : (getOuterWidth($draggableItem) + getOuterWidth($draggableItem, true)) / 2;
      if (!this.option("autoUpdate")) {
        this.option("draggableElementSize", size);
      }
    }
    return size;
  }
  _getActualFromIndex() {
    const {
      fromIndex,
      fromIndexOffset,
      offset
    } = this.option();
    return null == fromIndex ? null : fromIndex + fromIndexOffset - offset;
  }
  _moveItems(prevToIndex, toIndex, fullUpdate) {
    const fromIndex = this._getActualFromIndex();
    const isVerticalOrientation = this._isVerticalOrientation();
    const positionPropName = isVerticalOrientation ? "top" : "left";
    const elementSize = this._getDraggableElementSize(isVerticalOrientation);
    const items = this._getItems();
    const prevPositions = this._getPositions(items, elementSize, fromIndex, prevToIndex);
    const positions = this._getPositions(items, elementSize, fromIndex, toIndex);
    const animationConfig = this.option("animation");
    const rtlEnabled = this.option("rtlEnabled");
    for (let i = 0; i < items.length; i++) {
      const itemElement = items[i];
      const prevPosition = prevPositions[i];
      const position = positions[i];
      if (null === toIndex || null === fromIndex) {
        stopAnimation(itemElement);
      } else if (prevPosition !== position || fullUpdate && isDefined(position)) {
        animate(itemElement, extend({}, animationConfig, {
          to: {
            [positionPropName]: !isVerticalOrientation && rtlEnabled ? -position : position
          }
        }));
      }
    }
  }
  _toggleDragSourceClass(value2, $element) {
    const $sourceElement = $element || this._$sourceElement;
    super._toggleDragSourceClass.apply(this, arguments);
    if (!this._isIndicateMode()) {
      null === $sourceElement || void 0 === $sourceElement || $sourceElement.toggleClass(this._addWidgetPrefix("source-hidden"), value2);
    }
  }
  _dispose() {
    this.reset();
    super._dispose();
  }
  _fireAddEvent(sourceEvent) {
    const args = this._getEventArgs(sourceEvent);
    this._getAction("onAdd")(args);
    return args.cancel;
  }
  _fireRemoveEvent(sourceEvent) {
    const sourceDraggable2 = this._getSourceDraggable();
    const args = this._getEventArgs(sourceEvent);
    sourceDraggable2._getAction("onRemove")(args);
    return args.cancel;
  }
  _fireReorderEvent(sourceEvent) {
    const args = this._getEventArgs(sourceEvent);
    this._getAction("onReorder")(args);
    return args.promise || Deferred().resolve();
  }
};
component_registrator_default(SORTABLE, Sortable);
var m_sortable_default = Sortable;

export {
  m_draggable_default,
  m_sortable_default
};
//# sourceMappingURL=chunk-FFMEWCSQ.js.map
