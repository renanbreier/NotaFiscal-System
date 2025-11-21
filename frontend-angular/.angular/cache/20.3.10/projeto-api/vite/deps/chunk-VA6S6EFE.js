import {
  widget_default
} from "./chunk-IWHEGBWI.js";
import {
  m_emitter_gesture_default
} from "./chunk-Q7DS2YG3.js";
import {
  EmptyTemplate,
  addNamespace,
  browser_default,
  component_registrator_default,
  contains,
  eventData,
  fireEvent,
  fx_default,
  getPublicElement,
  isCommandKeyPressed,
  keyboard,
  locate,
  m_dom_default,
  m_emitter_registrator_default,
  m_event_registrator_default,
  m_pointer_default,
  m_selectors_default,
  move,
  normalizeKeyName,
  position_default,
  resetPosition,
  triggerHidingEvent,
  triggerResizeEvent,
  triggerShownEvent,
  wrapToArray
} from "./chunk-ICLEXNO5.js";
import {
  changeCallback,
  devices_default,
  hideCallback,
  ui_errors_default,
  value
} from "./chunk-DONQLAZQ.js";
import {
  data,
  getOuterHeight,
  getOuterWidth,
  ready_callbacks_default,
  removeData,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  dom_adapter_default,
  each,
  ensureDefined,
  errors_default,
  extend,
  isDefined,
  isEvent,
  isFunction,
  isObject,
  isPromise,
  isString,
  isWindow,
  m_window_default,
  map,
  noop
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/overlay/z_index.js
var baseZIndex = 1500;
var zIndexStack = [];
var base = (zIndex) => {
  baseZIndex = ensureDefined(zIndex, baseZIndex);
  return baseZIndex;
};
var create = function() {
  let baseIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : baseZIndex;
  const {
    length
  } = zIndexStack;
  const index = (length ? zIndexStack[length - 1] : baseIndex) + 1;
  zIndexStack.push(index);
  return index;
};
var remove = (zIndex) => {
  const position = zIndexStack.indexOf(zIndex);
  if (position >= 0) {
    zIndexStack.splice(position, 1);
  }
};
var isLastZIndexInStack = (zIndex) => {
  if (zIndexStack.length) {
    return zIndexStack[zIndexStack.length - 1] === zIndex;
  }
  return false;
};

// node_modules/devextreme/esm/__internal/events/m_drag.js
var DRAG_START_EVENT = "dxdragstart";
var DRAG_EVENT = "dxdrag";
var DRAG_END_EVENT = "dxdragend";
var DRAG_ENTER_EVENT = "dxdragenter";
var DRAG_LEAVE_EVENT = "dxdragleave";
var DROP_EVENT = "dxdrop";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
  setup(element, data2) {
    const knownDropTarget = knownDropTargets.includes(element);
    if (!knownDropTarget) {
      knownDropTargets.push(element);
      knownDropTargetSelectors.push([]);
      knownDropTargetConfigs.push(data2 || {});
    }
  },
  add(element, handleObj) {
    const index = knownDropTargets.indexOf(element);
    this.updateEventsCounter(element, handleObj.type, 1);
    const {
      selector
    } = handleObj;
    if (!knownDropTargetSelectors[index].includes(selector)) {
      knownDropTargetSelectors[index].push(selector);
    }
  },
  updateEventsCounter(element, event, value2) {
    if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].includes(event)) {
      const eventsCount = data(element, "dxDragEventsCount") || 0;
      data(element, "dxDragEventsCount", Math.max(0, eventsCount + value2));
    }
  },
  remove(element, handleObj) {
    this.updateEventsCounter(element, handleObj.type, -1);
  },
  teardown(element) {
    const handlersCount = data(element, "dxDragEventsCount");
    if (!handlersCount) {
      const index = knownDropTargets.indexOf(element);
      knownDropTargets.splice(index, 1);
      knownDropTargetSelectors.splice(index, 1);
      knownDropTargetConfigs.splice(index, 1);
      removeData(element, "dxDragEventsCount");
    }
  }
};
m_event_registrator_default(DRAG_ENTER_EVENT, dropTargetRegistration);
m_event_registrator_default(DRAG_LEAVE_EVENT, dropTargetRegistration);
m_event_registrator_default(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
  const dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  const dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter(((selector) => selector));
  let $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
  if (knownDropTargetSelectors[dropTargetIndex].includes(void 0)) {
    $delegatedTargets = $delegatedTargets.add($element);
  }
  return $delegatedTargets;
};
var getItemConfig = function($element) {
  const dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  return knownDropTargetConfigs[dropTargetIndex];
};
var getItemPosition = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemPositionFunc) {
    return dropTargetConfig.itemPositionFunc($element);
  }
  return $element.offset();
};
var getItemSize = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemSizeFunc) {
    return dropTargetConfig.itemSizeFunc($element);
  }
  return {
    width: $element.get(0).getBoundingClientRect().width,
    height: $element.get(0).getBoundingClientRect().height
  };
};
var DragEmitter = m_emitter_gesture_default.inherit({
  ctor(element) {
    this.callBase(element);
    this.direction = "both";
  },
  _init(e) {
    this._initEvent = e;
  },
  _start(e) {
    e = this._fireEvent("dxdragstart", this._initEvent);
    this._maxLeftOffset = e.maxLeftOffset;
    this._maxRightOffset = e.maxRightOffset;
    this._maxTopOffset = e.maxTopOffset;
    this._maxBottomOffset = e.maxBottomOffset;
    if (e.targetElements || null === e.targetElements) {
      const dropTargets = wrapToArray(e.targetElements || []);
      this._dropTargets = map(dropTargets, ((element) => renderer_default(element).get(0)));
    } else {
      this._dropTargets = knownDropTargets;
    }
  },
  _move(e) {
    const eventData2 = eventData(e);
    const dragOffset = this._calculateOffset(eventData2);
    e = this._fireEvent("dxdrag", e, {
      offset: dragOffset
    });
    this._processDropTargets(e);
    if (!e._cancelPreventDefault) {
      e.preventDefault();
    }
  },
  _calculateOffset(eventData2) {
    return {
      x: this._calculateXOffset(eventData2),
      y: this._calculateYOffset(eventData2)
    };
  },
  _calculateXOffset(eventData2) {
    if ("vertical" !== this.direction) {
      const offset = eventData2.x - this._startEventData.x;
      return this._fitOffset(offset, this._maxLeftOffset, this._maxRightOffset);
    }
    return 0;
  },
  _calculateYOffset(eventData2) {
    if ("horizontal" !== this.direction) {
      const offset = eventData2.y - this._startEventData.y;
      return this._fitOffset(offset, this._maxTopOffset, this._maxBottomOffset);
    }
    return 0;
  },
  _fitOffset(offset, minOffset, maxOffset) {
    if (null != minOffset) {
      offset = Math.max(offset, -minOffset);
    }
    if (null != maxOffset) {
      offset = Math.min(offset, maxOffset);
    }
    return offset;
  },
  _processDropTargets(e) {
    const target = this._findDropTarget(e);
    const sameTarget = target === this._currentDropTarget;
    if (!sameTarget) {
      this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
      this._currentDropTarget = target;
      this._fireDropTargetEvent(e, DRAG_ENTER_EVENT);
    }
  },
  _fireDropTargetEvent(event, eventName) {
    if (!this._currentDropTarget) {
      return;
    }
    const eventData2 = {
      type: eventName,
      originalEvent: event,
      draggingElement: this._$element.get(0),
      target: this._currentDropTarget
    };
    fireEvent(eventData2);
  },
  _findDropTarget(e) {
    const that = this;
    let result;
    each(knownDropTargets, ((_, target) => {
      if (!that._checkDropTargetActive(target)) {
        return;
      }
      const $target = renderer_default(target);
      each(getItemDelegatedTargets($target), ((_2, delegatedTarget) => {
        const $delegatedTarget = renderer_default(delegatedTarget);
        if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, renderer_default(result), e)) {
          result = delegatedTarget;
        }
      }));
    }));
    return result;
  },
  _checkDropTargetActive(target) {
    let active = false;
    each(this._dropTargets, ((_, activeTarget) => {
      active = active || activeTarget === target || contains(activeTarget, target);
      return !active;
    }));
    return active;
  },
  _checkDropTarget(config, $target, $prevTarget, e) {
    const isDraggingElement = $target.get(0) === renderer_default(e.target).get(0);
    if (isDraggingElement) {
      return false;
    }
    const targetPosition = getItemPosition(config, $target);
    if (e.pageX < targetPosition.left) {
      return false;
    }
    if (e.pageY < targetPosition.top) {
      return false;
    }
    const targetSize = getItemSize(config, $target);
    if (e.pageX > targetPosition.left + targetSize.width) {
      return false;
    }
    if (e.pageY > targetPosition.top + targetSize.height) {
      return false;
    }
    if ($prevTarget.length && $prevTarget.closest($target).length) {
      return false;
    }
    if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
      return false;
    }
    return $target;
  },
  _end(e) {
    const eventData2 = eventData(e);
    this._fireEvent("dxdragend", e, {
      offset: this._calculateOffset(eventData2)
    });
    this._fireDropTargetEvent(e, DROP_EVENT);
    delete this._currentDropTarget;
  }
});
m_emitter_registrator_default({
  emitter: DragEmitter,
  events: ["dxdragstart", "dxdrag", "dxdragend"]
});

// node_modules/devextreme/esm/__internal/core/utils/swatch_container.js
var getSwatchContainer = (element) => {
  const $element = renderer_default(element);
  const swatchContainer = $element.closest('[class^="dx-swatch-"], [class*=" dx-swatch-"]');
  const viewport = value();
  if (!swatchContainer.length) {
    return viewport;
  }
  const swatchClassRegex = new RegExp("(\\s|^)(dx-swatch-.*?)(\\s|$)");
  const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  let viewportSwatchContainer = viewport.children(`.${swatchClass}`);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = renderer_default("<div>").addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
var swatch_container_default = {
  getSwatchContainer
};

// node_modules/devextreme/esm/__internal/ui/overlay/overlay_position_controller.js
var window = m_window_default.getWindow();
var OVERLAY_POSITION_ALIASES = {
  top: {
    my: "top center",
    at: "top center"
  },
  bottom: {
    my: "bottom center",
    at: "bottom center"
  },
  right: {
    my: "right center",
    at: "right center"
  },
  left: {
    my: "left center",
    at: "left center"
  },
  center: {
    my: "center",
    at: "center"
  },
  "right bottom": {
    my: "right bottom",
    at: "right bottom"
  },
  "right top": {
    my: "right top",
    at: "right top"
  },
  "left bottom": {
    my: "left bottom",
    at: "left bottom"
  },
  "left top": {
    my: "left top",
    at: "left top"
  }
};
var DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
var isPositionAlignment = (position) => isString(position);
var OverlayPositionController = class {
  constructor(params) {
    const {
      properties,
      elements
    } = params;
    const {
      container,
      position,
      visualContainer
    } = properties;
    const {
      $root,
      $content,
      $wrapper
    } = elements;
    this._properties = properties;
    this._$root = $root;
    this._$content = $content;
    this._$wrapper = $wrapper;
    this._$markupContainer = void 0;
    this._$visualContainer = void 0;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = void 0;
    this._initialPosition = void 0;
    this._previousVisualPosition = void 0;
    this.updateContainer(container);
    this.updatePosition(position);
    this.updateVisualContainer(visualContainer);
  }
  get $container() {
    this.updateContainer();
    return this._$markupContainer;
  }
  get $visualContainer() {
    return this._$visualContainer;
  }
  get position() {
    return this._position;
  }
  set fixWrapperPosition(fixWrapperPosition) {
    this._properties._fixWrapperPosition = fixWrapperPosition;
    this.styleWrapperPosition();
  }
  set restorePosition(restorePosition) {
    this._properties.restorePosition = restorePosition;
  }
  updatePosition(position) {
    this._properties.position = position;
    this._position = this._normalizePosition(position);
    this.updateVisualContainer();
  }
  updateContainer(container) {
    const element = container ?? this._properties.container;
    if (isDefined(container)) {
      this._properties.container = element;
    }
    if (element) {
      this._$markupContainer = renderer_default(element);
    } else if (this._$root) {
      this._$markupContainer = swatch_container_default.getSwatchContainer(this._$root);
    }
    this.updateVisualContainer(this._properties.visualContainer);
  }
  updateVisualContainer(visualContainer) {
    if (isDefined(visualContainer)) {
      this._properties.visualContainer = visualContainer;
    }
    this._$visualContainer = this._getVisualContainer();
  }
  restorePositionOnNextRender(value2) {
    this._shouldRenderContentInitialPosition = value2 || !this._visualPosition;
  }
  openingHandled() {
    const shouldRestorePosition = Boolean(this._properties.restorePosition);
    this.restorePositionOnNextRender(shouldRestorePosition);
  }
  detectVisualPositionChange(event) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(event);
  }
  positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      move(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  }
  positionWrapper() {
    if (this._$visualContainer) {
      position_default.setup(this._$wrapper, {
        my: "top left",
        at: "top left",
        of: this._$visualContainer
      });
    }
  }
  styleWrapperPosition() {
    var _this$$visualContaine, _this$_$wrapper;
    const isContainerWindow = isWindow(null === (_this$$visualContaine = this.$visualContainer) || void 0 === _this$$visualContaine ? void 0 : _this$$visualContaine.get(0));
    const useFixed = isContainerWindow || this._properties._fixWrapperPosition;
    const positionStyle = useFixed ? "fixed" : "absolute";
    null === (_this$_$wrapper = this._$wrapper) || void 0 === _this$_$wrapper || _this$_$wrapper.css("position", positionStyle);
  }
  _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = locate(this._$content);
  }
  _renderContentInitialPosition() {
    var _this$_$wrapper2, _this$_$wrapper3, _this$_$wrapper4;
    this._renderBoundaryOffset();
    resetPosition(this._$content);
    const wrapperOverflow = (null === (_this$_$wrapper2 = this._$wrapper) || void 0 === _this$_$wrapper2 ? void 0 : _this$_$wrapper2.css("overflow")) ?? "";
    null === (_this$_$wrapper3 = this._$wrapper) || void 0 === _this$_$wrapper3 || _this$_$wrapper3.css("overflow", "hidden");
    if (!this._properties._skipContentPositioning) {
      const resultPosition = position_default.setup(this._$content, this._position);
      this._initialPosition = resultPosition;
    }
    null === (_this$_$wrapper4 = this._$wrapper) || void 0 === _this$_$wrapper4 || _this$_$wrapper4.css("overflow", wrapperOverflow);
    this.detectVisualPositionChange();
  }
  _raisePositionedEvents(event) {
    var _this$_properties$onP, _this$_properties2;
    const previousPosition = this._previousVisualPosition;
    const newPosition = this._visualPosition;
    const isTopEqual = (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.top) === (null === newPosition || void 0 === newPosition ? void 0 : newPosition.top);
    const isLeftEqual = (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.left) === (null === newPosition || void 0 === newPosition ? void 0 : newPosition.left);
    const isVisualPositionChanged = !(isTopEqual && isLeftEqual);
    if (isVisualPositionChanged) {
      var _this$_properties$onV, _this$_properties;
      null === (_this$_properties$onV = (_this$_properties = this._properties).onVisualPositionChanged) || void 0 === _this$_properties$onV || _this$_properties$onV.call(_this$_properties, {
        event,
        previousPosition,
        position: newPosition
      });
    }
    null === (_this$_properties$onP = (_this$_properties2 = this._properties).onPositioned) || void 0 === _this$_properties$onP || _this$_properties$onP.call(_this$_properties2, {
      position: this._initialPosition
    });
  }
  _renderBoundaryOffset() {
    var _this$_position, _this$_$content;
    const boundaryOffset = (null === (_this$_position = this._position) || void 0 === _this$_position ? void 0 : _this$_position.boundaryOffset) ?? DEFAULT_BOUNDARY_OFFSET;
    const {
      v,
      h
    } = boundaryOffset;
    if (!(v && h)) {
      return;
    }
    null === (_this$_$content = this._$content) || void 0 === _this$_$content || _this$_$content.css("margin", `${boundaryOffset.v}px ${boundaryOffset.h}px`);
  }
  _getVisualContainer() {
    var _this$_properties$pos, _this$_properties$pos2, _this$_properties$pos3;
    const containerProp = this._properties.container;
    const visualContainerProp = this._properties.visualContainer;
    const positionOf = isEvent(null === (_this$_properties$pos = this._properties.position) || void 0 === _this$_properties$pos ? void 0 : _this$_properties$pos.of) ? null === (_this$_properties$pos2 = this._properties.position) || void 0 === _this$_properties$pos2 || null === (_this$_properties$pos2 = _this$_properties$pos2.of) || void 0 === _this$_properties$pos2 ? void 0 : _this$_properties$pos2.target : null === (_this$_properties$pos3 = this._properties.position) || void 0 === _this$_properties$pos3 ? void 0 : _this$_properties$pos3.of;
    if (visualContainerProp) {
      return renderer_default(visualContainerProp);
    }
    if (containerProp) {
      return renderer_default(containerProp);
    }
    if (positionOf) {
      return renderer_default(positionOf);
    }
    return renderer_default(window);
  }
  _normalizePosition(position) {
    const defaultConfiguration = {
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    };
    if (isDefined(position)) {
      const positionObject = this._positionToObject(position);
      const configuration = extend(true, {}, defaultConfiguration, positionObject);
      return configuration;
    }
    return defaultConfiguration;
  }
  _positionToObject(position) {
    if (isPositionAlignment(position)) {
      const configuration = _extends({}, OVERLAY_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
};

// node_modules/devextreme/esm/__internal/ui/overlay/overlay.js
var ready = ready_callbacks_default.add;
var window2 = m_window_default.getWindow();
var viewPortChanged = changeCallback;
var OVERLAY_STACK = [];
ready((() => {
  m_events_engine_default.subscribeGlobal(dom_adapter_default.getDocument(), m_pointer_default.down, ((e) => {
    for (let i = OVERLAY_STACK.length - 1; i >= 0; i -= 1) {
      var _OVERLAY_STACK$i$_pro, _OVERLAY_STACK$i;
      if (!(null !== (_OVERLAY_STACK$i$_pro = (_OVERLAY_STACK$i = OVERLAY_STACK[i])._proxiedDocumentDownHandler) && void 0 !== _OVERLAY_STACK$i$_pro && _OVERLAY_STACK$i$_pro.call(_OVERLAY_STACK$i, e))) {
        return;
      }
    }
  }));
}));
var Overlay = class _Overlay extends widget_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape() {
        this.hide();
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: "",
      wrapperAttr: {},
      position: _extends({}, OVERLAY_POSITION_ALIASES.center),
      width: "80vw",
      minWidth: null,
      maxWidth: null,
      height: "80vh",
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: "pop",
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: "pop",
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      hideOnOutsideClick: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: "content",
      innerOverlay: false,
      restorePosition: true,
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _fixWrapperPosition: false,
      _loopFocus: false,
      _ignorePreventScrollEventsDeprecation: false,
      hideTopOverlayHandler: () => {
        this.hide();
      }
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device: () => !m_window_default.hasWindow(),
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }];
    return rules;
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    this._optionsByReference = _extends({}, this._optionsByReference, {
      animation: true
    });
  }
  $wrapper() {
    return this._$wrapper;
  }
  _eventBindingTarget() {
    return this._$content;
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ("preventScrollEvents" in options && !options._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  }
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning("preventScrollEvents", {
      since: "23.1",
      message: "If you enable this option, end-users may experience scrolling issues."
    });
  }
  _init() {
    super._init();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = renderer_default("<div>").addClass("dx-overlay-wrapper");
    this._$content = renderer_default("<div>").addClass("dx-overlay-content");
    this._initInnerOverlayClass();
    const $element = this.$element();
    $element.addClass("dx-overlay");
    this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
    this._toggleViewPortSubscription(true);
    const {
      hideTopOverlayHandler
    } = this.option();
    this._initHideTopOverlayHandler(hideTopOverlayHandler);
    this._parentsScrollSubscriptionInfo = {
      handler: (e) => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  }
  warnPositionAsFunction() {
    const {
      position
    } = this.option();
    if (isFunction(position)) {
      errors_default.log("W0018");
    }
  }
  _initInnerOverlayClass() {
    const {
      innerOverlay
    } = this.option();
    this._$content.toggleClass("dx-inner-overlay", innerOverlay);
  }
  _initHideTopOverlayHandler(handler) {
    if (handler) {
      this._hideTopOverlayHandler = handler;
    }
  }
  _getActionsList() {
    return ["onShowing", "onShown", "onHiding", "onHidden", "onPositioned", "onVisualPositionChanged"];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    each(actions, ((_, action) => {
      if (this._actions) {
        this._actions[action] = this._createActionByOption(action, {
          excludeValidators: ["disabled", "readOnly"]
        }) || noop;
      }
    }));
  }
  _initHideOnOutsideClickHandler() {
    this._proxiedDocumentDownHandler = (e) => this._documentDownHandler(e);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapperAttributes();
    this._initPositionController();
  }
  _documentDownHandler(e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    const {
      target
    } = e;
    const $target = renderer_default(target);
    const isTargetDocument = m_dom_default.contains(window2.document, target);
    const isAttachedTarget = renderer_default(window2.document).is($target) || isTargetDocument;
    const isInnerOverlay = renderer_default($target).closest(".dx-inner-overlay").length;
    const isTargetContent = this._$content.is($target);
    const isTargetInContent = m_dom_default.contains(this._$content.get(0), target);
    const isOutsideClick = isAttachedTarget && !isInnerOverlay && !(isTargetContent || isTargetInContent);
    if (isOutsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    const {
      propagateOutsideClick
    } = this.option();
    return Boolean(propagateOutsideClick);
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return Boolean(hideOnOutsideClick);
  }
  _outsideClickHandler(e) {
    const {
      shading
    } = this.option();
    if (shading) {
      e.preventDefault();
    }
    this.hide();
  }
  _getAnonymousTemplateName() {
    return "content";
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new EmptyTemplate()
    });
    super._initTemplates();
  }
  _isTopOverlay() {
    const overlayStack = this._overlayStack();
    for (let i = overlayStack.length - 1; i >= 0; i -= 1) {
      const tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.$first || tabbableElements.$last) {
        return overlayStack[i] === this;
      }
    }
    return false;
  }
  _overlayStack() {
    return OVERLAY_STACK;
  }
  _zIndexInitValue() {
    return _Overlay.baseZIndex();
  }
  _toggleViewPortSubscription(toggle) {
    if (this._viewPortChangeHandle) {
      viewPortChanged.remove(this._viewPortChangeHandle);
    }
    if (toggle) {
      this._viewPortChangeHandle = () => {
        this._viewPortChangeHandler();
      };
      viewPortChanged.add(this._viewPortChangeHandle);
    }
  }
  _viewPortChangeHandler() {
    const {
      container
    } = this.option();
    this._positionController.updateContainer(container);
    this._refresh();
  }
  _renderWrapperAttributes() {
    const {
      wrapperAttr
    } = this.option();
    const attributes = _extends({}, wrapperAttr);
    const classNames = attributes.class;
    delete attributes.class;
    const $wrapper = this.$wrapper();
    $wrapper.attr(attributes);
    if (this._customWrapperClass) {
      $wrapper.removeClass(this._customWrapperClass);
    }
    $wrapper.addClass(classNames);
    this._customWrapperClass = classNames;
  }
  _renderVisibilityAnimate(visible) {
    this._stopAnimation();
    return visible ? this._show() : this._hide();
  }
  _getAnimationConfig() {
    return this._getOptionValue("animation", this) ?? {};
  }
  _toggleBodyScroll(enabled) {
  }
  _animateShowing() {
    const animation = this._getAnimationConfig();
    const showAnimation = this._normalizeAnimation(animation.show, "to");
    const startShowAnimation = (null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.start) ?? noop;
    const completeShowAnimation = (null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.complete) ?? noop;
    this._animate(showAnimation, ((element, config) => {
      var _this$_actions, _this$_actions$onShow;
      if (this._isAnimationPaused) {
        return;
      }
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        m_events_engine_default.trigger(this._focusTarget(), "focus");
      }
      completeShowAnimation.call(this, element, config);
      this._showAnimationProcessing = false;
      this._isHidden = false;
      null === (_this$_actions = this._actions) || void 0 === _this$_actions || null === (_this$_actions$onShow = _this$_actions.onShown) || void 0 === _this$_actions$onShow || _this$_actions$onShow.call(_this$_actions);
      this._toggleSafariScrolling();
      this._showingDeferred.resolve();
    }), ((element, config) => {
      if (this._isAnimationPaused) {
        return;
      }
      startShowAnimation.call(this, element, config);
      this._showAnimationProcessing = true;
    }));
  }
  _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if (isPromise(cancelArg)) {
      cancelArg.then(((shouldCancel) => {
        if (shouldCancel) {
          cancelFunction();
        } else {
          applyFunction();
        }
      })).catch((() => applyFunction()));
    } else if (cancelArg) {
      cancelFunction();
    } else {
      applyFunction();
    }
  }
  _show() {
    this._showingDeferred = Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done((() => {
      delete this._parentHidden;
    }));
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      const show = () => {
        var _this$_actions2, _this$_actions2$onSho;
        this._stopAnimation();
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this._toggleVisibility(true);
        this._$content.css("visibility", "hidden");
        this._$content.toggleClass("dx-state-invisible", false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        const showingArgs = {
          cancel: false
        };
        null === (_this$_actions2 = this._actions) || void 0 === _this$_actions2 || null === (_this$_actions2$onSho = _this$_actions2.onShowing) || void 0 === _this$_actions2$onSho || _this$_actions2$onSho.call(_this$_actions2, showingArgs);
        this._processShowingHidingCancel(showingArgs.cancel, (() => {
          this._$content.css("visibility", "");
          this._renderVisibility(true);
          this._animateShowing();
        }), (() => {
          this._toggleVisibility(false);
          this._$content.css("visibility", "");
          this._$content.toggleClass("dx-state-invisible", true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option("visible", false);
          this._showingDeferred.resolve();
        }));
      };
      show();
    }
    return this._showingDeferred.promise();
  }
  _normalizeAnimation(showHideConfig, direction) {
    if (!showHideConfig) {
      return;
    }
    const configuration = _extends({
      type: "slide",
      skipElementInitialStyles: true
    }, showHideConfig);
    if (isObject(configuration[direction])) {
      extend(configuration[direction], {
        position: this._positionController.position
      });
    }
    return configuration;
  }
  _animateHiding() {
    const animation = this._getAnimationConfig();
    const hideAnimation = this._normalizeAnimation(animation.hide, "from");
    const startHideAnimation = (null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.start) ?? noop;
    const completeHideAnimation = (null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.complete) ?? noop;
    this._animate(hideAnimation, ((element, config) => {
      var _this$_actions3, _this$_actions3$onHid;
      this._$content.css("pointerEvents", "");
      this._renderVisibility(false);
      completeHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = false;
      null === (_this$_actions3 = this._actions) || void 0 === _this$_actions3 || null === (_this$_actions3$onHid = _this$_actions3.onHidden) || void 0 === _this$_actions3$onHid || _this$_actions3$onHid.call(_this$_actions3);
      this._hidingDeferred.resolve();
    }), ((element, config) => {
      this._$content.css("pointerEvents", "none");
      startHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = true;
    }));
  }
  _hide() {
    if (!this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = Deferred();
    const hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      var _this$_actions4, _this$_actions4$onHid;
      null === (_this$_actions4 = this._actions) || void 0 === _this$_actions4 || null === (_this$_actions4$onHid = _this$_actions4.onHiding) || void 0 === _this$_actions4$onHid || _this$_actions4$onHid.call(_this$_actions4, hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      const cancelHide = () => {
        this._isHidingActionCanceled = true;
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this.option("visible", true);
        this._hidingDeferred.resolve();
      };
      const applyHide = () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._animateHiding();
      };
      this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
    }
    return this._hidingDeferred.promise();
  }
  _forceFocusLost() {
    const activeElement = dom_adapter_default.getActiveElement();
    const shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      m_dom_default.resetActiveElement();
    }
  }
  _animate(animation, completeCallback, startCallback) {
    if (animation) {
      const actualStartCallback = startCallback ?? animation.start ?? noop;
      const configuration = _extends({}, animation, {
        start: actualStartCallback,
        complete: completeCallback
      });
      fx_default.animate(this._$content.get(0), configuration);
    } else {
      completeCallback();
    }
  }
  _stopAnimation() {
    fx_default.stop(this._$content.get(0), true);
  }
  _renderVisibility(visible) {
    if (visible && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible;
    this._stopAnimation();
    if (!visible) {
      triggerHidingEvent(this._$content);
    }
    if (visible) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      triggerShownEvent(this._$content);
      triggerResizeEvent(this._$content);
    } else {
      this._toggleVisibility(visible);
      this._$content.toggleClass("dx-state-invisible", !visible);
      this._updateZIndexStackPosition(visible);
      this._moveFromContainer();
    }
    this._toggleShading(visible);
    this._toggleSubscriptions(visible);
  }
  _updateZIndexStackPosition(pushToStack) {
    const overlayStack = this._overlayStack();
    const index = overlayStack.indexOf(this);
    if (pushToStack) {
      if (-1 === index) {
        this._zIndex = create(this._zIndexInitValue());
        overlayStack.push(this);
      }
      this._$wrapper.css("zIndex", this._zIndex);
      this._$content.css("zIndex", this._zIndex);
    } else if (-1 !== index) {
      overlayStack.splice(index, 1);
      remove(this._zIndex);
    }
  }
  _toggleShading(visible) {
    const {
      shading,
      shadingColor
    } = this.option();
    this._$wrapper.toggleClass("dx-overlay-shader", visible && shading);
    this._$wrapper.css("backgroundColor", shading ? shadingColor ?? "" : "");
    this._toggleTabTerminator(Boolean(visible && shading));
  }
  _initTabTerminatorHandler() {
    this._proxiedTabTerminatorHandler = (e) => {
      this._tabKeyHandler(e);
    };
  }
  _toggleTabTerminator(enabled) {
    const {
      _loopFocus
    } = this.option();
    const eventName = addNamespace("keydown", this.NAME);
    if (_loopFocus || enabled) {
      m_events_engine_default.on(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      this._destroyTabTerminator();
    }
  }
  _destroyTabTerminator() {
    const eventName = addNamespace("keydown", this.NAME);
    m_events_engine_default.off(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
  }
  _findTabbableBounds() {
    const $elements = this._$wrapper.find("*");
    const elementsCount = $elements.length - 1;
    let $first = null;
    let $last = null;
    for (let i = 0; i <= elementsCount; i += 1) {
      const $currentElement = $elements.eq(i);
      const $reverseElement = $elements.eq(elementsCount - i);
      if (!$first && $currentElement.is(m_selectors_default.tabbable)) {
        $first = $currentElement;
      }
      if (!$last && $reverseElement.is(m_selectors_default.tabbable)) {
        $last = $reverseElement;
      }
      if ($first && $last) {
        break;
      }
    }
    return {
      $first,
      $last
    };
  }
  _tabKeyHandler(e) {
    if ("tab" !== normalizeKeyName(e) || !this._isTopOverlay()) {
      return;
    }
    const wrapper = this._$wrapper.get(0);
    const activeElement = dom_adapter_default.getActiveElement(wrapper);
    const {
      $first: $firstTabbable,
      $last: $lastTabbable
    } = this._findTabbableBounds();
    const isTabOnLast = !e.shiftKey && activeElement === (null === $lastTabbable || void 0 === $lastTabbable ? void 0 : $lastTabbable.get(0));
    const isShiftTabOnFirst = e.shiftKey && activeElement === (null === $firstTabbable || void 0 === $firstTabbable ? void 0 : $firstTabbable.get(0));
    const isOutsideTarget = !m_dom_default.contains(wrapper, activeElement);
    const shouldPreventDefault = isTabOnLast || isShiftTabOnFirst || isOutsideTarget;
    if (shouldPreventDefault) {
      e.preventDefault();
      const $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      m_events_engine_default.trigger($focusElement, "focusin");
      m_events_engine_default.trigger($focusElement, "focus");
    }
  }
  _toggleSubscriptions(enabled) {
    if (m_window_default.hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  }
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      hideCallback.add(this._hideTopOverlayHandler);
    } else {
      hideCallback.remove(this._hideTopOverlayHandler);
    }
  }
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    const scrollEvent = addNamespace("scroll", this.NAME);
    const info = this._parentsScrollSubscriptionInfo ?? {};
    const {
      prevTargets,
      handler
    } = info;
    m_events_engine_default.off(prevTargets, scrollEvent, handler);
    const {
      hideOnParentScroll
    } = this.option();
    if (needSubscribe && hideOnParentScroll) {
      let $parents = this._getHideOnParentScrollTarget().parents();
      if ("desktop" === devices_default.real().deviceType) {
        $parents = $parents.add(window2);
      }
      m_events_engine_default.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo = _extends({}, info, {
        prevTargets: $parents
      });
    }
  }
  _hideOnParentsScrollHandler(e) {
    let hideHandled = false;
    const {
      hideOnParentScroll
    } = this.option();
    if (isFunction(hideOnParentScroll)) {
      hideHandled = hideOnParentScroll(e);
    }
    if (!hideHandled && !this._showAnimationProcessing) {
      this.hide();
    }
  }
  _getHideOnParentScrollTarget() {
    const {
      _hideOnParentScrollTarget
    } = this.option();
    const $hideOnParentScrollTarget = renderer_default(_hideOnParentScrollTarget);
    if ($hideOnParentScrollTarget.length) {
      return $hideOnParentScrollTarget;
    }
    return this._$wrapper;
  }
  _render() {
    super._render();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this._isVisible());
  }
  _appendContentToElement() {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  }
  _renderContent() {
    const {
      deferRendering
    } = this.option();
    const shouldDeferRendering = !this._currentVisible && deferRendering;
    const isParentHidden = this._isVisible() && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    super._renderContent();
  }
  _isParentHidden() {
    const {
      _checkParentVisibility
    } = this.option();
    if (!_checkParentVisibility) {
      return false;
    }
    if (void 0 !== this._parentHidden) {
      return this._parentHidden;
    }
    const $parent = this.$element().parent();
    if ($parent.is(":visible")) {
      return false;
    }
    let isHidden = false;
    $parent.add($parent.parents()).each(((index, element) => {
      const $element = renderer_default(element);
      if ("none" === $element.css("display")) {
        isHidden = true;
        return false;
      }
      return;
    }));
    return isHidden || !dom_adapter_default.getBody().contains($parent.get(0));
  }
  _renderContentImpl() {
    const {
      contentTemplate: contentTemplateOption
    } = this.option();
    const whenContentRendered = Deferred();
    const contentTemplate = this._getTemplate(contentTemplateOption);
    const transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    null === contentTemplate || void 0 === contentTemplate || contentTemplate.render({
      container: getPublicElement(this.$content()),
      noModel: true,
      transclude,
      onRendered: () => {
        whenContentRendered.resolve();
        const {
          templatesRenderAsynchronously
        } = this.option();
        if (templatesRenderAsynchronously) {
          this._dimensionChanged();
        }
      }
    });
    const {
      preventScrollEvents
    } = this.option();
    this._toggleWrapperScrollEventsSubscription(preventScrollEvents);
    whenContentRendered.done((() => {
      this._processContentRendering();
    }));
    return whenContentRendered.promise();
  }
  _processContentRendering() {
    if (this._isVisible()) {
      this._moveToContainer();
    }
  }
  _getPositionControllerConfig() {
    var _this$_actions5, _this$_actions6;
    const {
      container,
      visualContainer,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning
    } = this.option();
    const properties = {
      container,
      visualContainer,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning,
      onPositioned: null === (_this$_actions5 = this._actions) || void 0 === _this$_actions5 ? void 0 : _this$_actions5.onPositioned,
      onVisualPositionChanged: null === (_this$_actions6 = this._actions) || void 0 === _this$_actions6 ? void 0 : _this$_actions6.onVisualPositionChanged
    };
    const elements = {
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper
    };
    const positionControllerConfiguration = {
      properties,
      elements
    };
    return positionControllerConfiguration;
  }
  _initPositionController() {
    this._positionController = new OverlayPositionController(this._getPositionControllerConfig());
  }
  _toggleWrapperScrollEventsSubscription(enabled) {
    const eventName = addNamespace(DRAG_EVENT, this.NAME);
    m_events_engine_default.off(this._$wrapper, eventName);
    if (enabled) {
      const callback = (e) => {
        const {
          originalEvent
        } = e.originalEvent;
        const {
          type
        } = originalEvent ?? {};
        const isWheel = "wheel" === type;
        const isMouseMove = "mousemove" === type;
        const isScrollByWheel = isWheel && isCommandKeyPressed(e);
        e._cancelPreventDefault = true;
        if (originalEvent && false !== e.cancelable && !(isMouseMove || isScrollByWheel)) {
          e.preventDefault();
        }
      };
      const options = {
        validate: () => true,
        getDirection: () => "both",
        _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: noop,
        isNative: true
      };
      m_events_engine_default.on(this._$wrapper, eventName, options, callback);
    }
  }
  _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  }
  _checkContainerExists() {
    const $wrapperContainer = this._positionController.$container;
    if (void 0 === $wrapperContainer) {
      return;
    }
    const containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      ui_errors_default.log("W1021", this.NAME);
    }
  }
  _moveToContainer() {
    const $wrapperContainer = this._positionController.$container;
    if (void 0 !== $wrapperContainer) {
      this._$wrapper.appendTo($wrapperContainer);
    }
    this._$content.appendTo(this._$wrapper);
  }
  _renderGeometry() {
    if (this._isVisible() && m_window_default.hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  }
  _renderGeometryImpl() {
    this._positionController.updatePosition(this._getOptionValue("position"));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  }
  _renderPosition(state) {
    this._positionController.positionContent();
  }
  _isAllWindowCovered() {
    var _this$_positionContro;
    const {
      shading
    } = this.option();
    const element = null === (_this$_positionContro = this._positionController.$visualContainer) || void 0 === _this$_positionContro ? void 0 : _this$_positionContro.get(0);
    return isWindow(element) && Boolean(shading);
  }
  _toggleSafariScrolling() {
    const visible = this._isVisible();
    const $body = renderer_default(dom_adapter_default.getBody());
    const isIosSafari = "ios" === devices_default.real().platform && browser_default.safari;
    const isAllWindowCovered = this._isAllWindowCovered();
    const isScrollingPrevented = $body.hasClass("dx-prevent-safari-scrolling");
    const shouldPreventScrolling = !isScrollingPrevented && visible && isAllWindowCovered;
    const shouldEnableScrolling = isScrollingPrevented && (!visible || !isAllWindowCovered || this._disposed);
    if (isIosSafari) {
      if (shouldEnableScrolling) {
        $body.removeClass("dx-prevent-safari-scrolling");
        window2.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = void 0;
      } else if (shouldPreventScrolling) {
        this._cachedBodyScrollTop = window2.pageYOffset;
        $body.addClass("dx-prevent-safari-scrolling");
      }
    }
  }
  _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  }
  _renderWrapperDimensions() {
    const {
      $visualContainer
    } = this._positionController;
    const documentElement = dom_adapter_default.getDocumentElement();
    const isVisualContainerWindow = isWindow(null === $visualContainer || void 0 === $visualContainer ? void 0 : $visualContainer.get(0));
    const wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : getOuterWidth($visualContainer);
    const wrapperHeight = isVisualContainerWindow ? window2.innerHeight : getOuterHeight($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  }
  _renderDimensions() {
    const content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue("minWidth", content),
      maxWidth: this._getOptionValue("maxWidth", content),
      minHeight: this._getOptionValue("minHeight", content),
      maxHeight: this._getOptionValue("maxHeight", content),
      width: this._getOptionValue("width", content),
      height: this._getOptionValue("height", content)
    });
  }
  _focusTarget() {
    return this._$content;
  }
  _attachKeyboardEvents() {
    this._keyboardListenerId = keyboard.on(this._$content, null, ((options) => this._keyboardHandler(options)));
  }
  _keyboardHandler(options, onlyChildProcessing) {
    const e = options.originalEvent;
    const $target = renderer_default(e.target);
    const {
      ignoreChildEvents
    } = this.option();
    if ($target.is(this._$content) || !ignoreChildEvents) {
      super._keyboardHandler(options, onlyChildProcessing);
    }
  }
  _isVisible() {
    const visible = this.option("visible");
    return Boolean(visible);
  }
  _visibilityChanged(visible) {
    if (visible) {
      if (this._isVisible()) {
        this._renderVisibilityAnimate(visible);
      }
    } else {
      this._renderVisibilityAnimate(visible);
    }
  }
  _dimensionChanged() {
    this._renderGeometry();
  }
  _clean() {
    if (!this._contentAlreadyRendered) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._cleanFocusState();
  }
  _dispose() {
    fx_default.stop(this._$content.get(0), false);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._actions = {};
    this._parentsScrollSubscriptionInfo = void 0;
    super._dispose();
    this._toggleSafariScrolling();
    if (this._isVisible()) {
      remove(this._zIndex);
    }
    this._$wrapper.remove();
    this._$content.remove();
    this._destroyTabTerminator();
  }
  _toggleRTLDirection(rtl) {
    this._$content.toggleClass("dx-rtl", rtl);
  }
  _optionChanged(args) {
    const {
      value: value2,
      name
    } = args;
    if (this._getActionsList().includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case "animation":
      case "hideOnOutsideClick":
      case "propagateOutsideClick":
        break;
      case "_loopFocus":
      case "shading":
        this._toggleShading(this._isVisible());
        this._toggleSafariScrolling();
        break;
      case "shadingColor":
        this._toggleShading(this._isVisible());
        break;
      case "width":
      case "height":
      case "minWidth":
      case "maxWidth":
      case "minHeight":
      case "maxHeight":
        this._renderGeometry();
        break;
      case "position": {
        const {
          position
        } = this.option();
        this._positionController.updatePosition(position);
        this._positionController.restorePositionOnNextRender(true);
        this._renderGeometry();
        this._toggleSafariScrolling();
        break;
      }
      case "visible":
        this._renderVisibilityAnimate(Boolean(value2)).done((() => {
          var _this$_animateDeferre;
          return null === (_this$_animateDeferre = this._animateDeferred) || void 0 === _this$_animateDeferre ? void 0 : _this$_animateDeferre.resolveWith(this);
        })).fail((() => {
          var _this$_animateDeferre2;
          return null === (_this$_animateDeferre2 = this._animateDeferred) || void 0 === _this$_animateDeferre2 ? void 0 : _this$_animateDeferre2.reject();
        }));
        break;
      case "container":
        this._positionController.updateContainer(value2);
        this._invalidate();
        this._toggleSafariScrolling();
        break;
      case "visualContainer":
        this._positionController.updateVisualContainer(value2);
        this._renderWrapper();
        this._toggleSafariScrolling();
        break;
      case "innerOverlay":
        this._initInnerOverlayClass();
        break;
      case "deferRendering":
      case "contentTemplate":
        this._contentAlreadyRendered = false;
        this._clean();
        this._invalidate();
        break;
      case "hideTopOverlayHandler":
        this._toggleHideTopOverlayCallback(false);
        this._initHideTopOverlayHandler(value2);
        this._toggleHideTopOverlayCallback(this._isVisible());
        break;
      case "hideOnParentScroll":
      case "_hideOnParentScrollTarget":
        this._toggleHideOnParentsScrollSubscription(this._isVisible());
        break;
      case "rtlEnabled":
        this._contentAlreadyRendered = false;
        super._optionChanged(args);
        break;
      case "_fixWrapperPosition":
        this._positionController.fixWrapperPosition = value2;
        break;
      case "wrapperAttr":
        this._renderWrapperAttributes();
        break;
      case "restorePosition":
        this._positionController.restorePosition = value2;
        break;
      case "preventScrollEvents":
        this._logDeprecatedPreventScrollEventsInfo();
        this._toggleWrapperScrollEventsSubscription(value2);
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    const visible = this._isVisible();
    const isShowing = showing ?? !visible;
    const result = Deferred();
    if (isShowing === visible) {
      return result.resolveWith(this, [isShowing]).promise();
    }
    const animateDeferred = Deferred();
    this._animateDeferred = animateDeferred;
    this.option("visible", isShowing);
    animateDeferred.promise().done((() => {
      delete this._animateDeferred;
      result.resolveWith(this, [this._isVisible()]);
    })).fail((() => {
      delete this._animateDeferred;
      result.reject();
    }));
    return result.promise();
  }
  $content() {
    return this._$content;
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  content() {
    return getPublicElement(this._$content);
  }
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      triggerResizeEvent(this._$content);
    } else {
      super.repaint();
    }
  }
  static baseZIndex(zIndex) {
    return base(zIndex);
  }
};
component_registrator_default("dxOverlay", Overlay);
var overlay_default = Overlay;

export {
  DRAG_START_EVENT,
  DRAG_EVENT,
  DRAG_END_EVENT,
  DRAG_ENTER_EVENT,
  DRAG_LEAVE_EVENT,
  DROP_EVENT,
  swatch_container_default,
  OverlayPositionController,
  create,
  remove,
  isLastZIndexInStack,
  overlay_default
};
//# sourceMappingURL=chunk-VA6S6EFE.js.map
