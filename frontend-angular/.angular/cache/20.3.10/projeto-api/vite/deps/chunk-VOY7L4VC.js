import {
  BindableTemplate,
  collection_widget_async_default,
  resize_observer_default
} from "./chunk-LVWRVNT2.js";
import {
  button_default
} from "./chunk-UBAWJAV5.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isFluent,
  isMaterial,
  isMaterialBased,
  waitWebFont
} from "./chunk-2D4FZXPO.js";
import {
  DRAG_END_EVENT,
  DRAG_EVENT,
  DRAG_START_EVENT,
  OverlayPositionController,
  create,
  isLastZIndexInStack,
  overlay_default,
  remove
} from "./chunk-VA6S6EFE.js";
import {
  EmptyTemplate,
  addNamespace,
  component_registrator_default,
  dom_component_default,
  fx_default,
  getBoundingRect,
  getPublicElement,
  locate,
  move,
  triggerResizeEvent
} from "./chunk-ICLEXNO5.js";
import {
  devices_default,
  fitIntoRange,
  inRange,
  originalViewPort
} from "./chunk-DONQLAZQ.js";
import {
  addOffsetToMaxHeight,
  addOffsetToMinHeight,
  camelize,
  getHeight,
  getInnerHeight,
  getInnerWidth,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getVerticalOffsets,
  getVisibleHeight,
  getWidth,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  _extends,
  dom_adapter_default,
  each,
  extend,
  guid_default2 as guid_default,
  hasWindow,
  isDefined,
  isFunction,
  isObject,
  isPlainObject,
  isWindow,
  m_window_default,
  noop,
  pairToObject
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/resizable/resizable.js
var RESIZABLE = "dxResizable";
var DRAGSTART_START_EVENT_NAME = addNamespace(DRAG_START_EVENT, RESIZABLE);
var DRAGSTART_EVENT_NAME = addNamespace(DRAG_EVENT, RESIZABLE);
var DRAGSTART_END_EVENT_NAME = addNamespace(DRAG_END_EVENT, RESIZABLE);
var SIDE_BORDER_WIDTH_STYLES = {
  left: "borderLeftWidth",
  top: "borderTopWidth",
  right: "borderRightWidth",
  bottom: "borderBottomWidth"
};
var Resizable = class extends dom_component_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      handles: "all",
      step: "1",
      stepPrecision: "simple",
      minWidth: 30,
      maxWidth: 1 / 0,
      minHeight: 30,
      maxHeight: 1 / 0,
      roundStepValue: true,
      keepAspectRatio: true
    });
  }
  _init() {
    super._init();
    this.$element().addClass("dx-resizable");
  }
  _initMarkup() {
    super._initMarkup();
    this._renderHandles();
  }
  _render() {
    super._render();
    this._renderActions();
  }
  _renderActions() {
    this._resizeStartAction = this._createActionByOption("onResizeStart");
    this._resizeEndAction = this._createActionByOption("onResizeEnd");
    this._resizeAction = this._createActionByOption("onResize");
  }
  _renderHandles() {
    this._handles = [];
    const {
      handles
    } = this.option();
    if ("none" === handles || !handles) {
      return;
    }
    const directions = "all" === handles ? ["top", "bottom", "left", "right"] : handles.split(" ");
    const activeHandlesMap = {};
    each(directions, ((index, handleName) => {
      activeHandlesMap[handleName] = true;
      this._renderHandle(handleName);
    }));
    if (activeHandlesMap.bottom && activeHandlesMap.right) {
      this._renderHandle("corner-bottom-right");
    }
    if (activeHandlesMap.bottom && activeHandlesMap.left) {
      this._renderHandle("corner-bottom-left");
    }
    if (activeHandlesMap.top && activeHandlesMap.right) {
      this._renderHandle("corner-top-right");
    }
    if (activeHandlesMap.top && activeHandlesMap.left) {
      this._renderHandle("corner-top-left");
    }
    this._attachEventHandlers();
  }
  _renderHandle(handleName) {
    const $handle = renderer_default("<div>").addClass("dx-resizable-handle").addClass(`dx-resizable-handle-${handleName}`).appendTo(this.$element());
    this._handles.push($handle);
  }
  _attachEventHandlers() {
    if (this.option("disabled")) {
      return;
    }
    const handlers = {};
    handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
    handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
    handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
    this._handles.forEach(((handleElement) => {
      m_events_engine_default.on(handleElement, handlers, {
        direction: "both",
        immediate: true
      });
    }));
  }
  _detachEventHandlers() {
    this._handles.forEach(((handleElement) => {
      m_events_engine_default.off(handleElement);
    }));
  }
  _toggleEventHandlers(shouldAttachEvents) {
    if (shouldAttachEvents) {
      this._attachEventHandlers();
    } else {
      this._detachEventHandlers();
    }
  }
  _getElementSize() {
    const $element = this.$element();
    return "border-box" === $element.css("boxSizing") ? {
      width: getOuterWidth($element),
      height: getOuterHeight($element)
    } : {
      width: getWidth($element),
      height: getHeight($element)
    };
  }
  _dragStartHandler(e) {
    var _this$_resizeStartAct;
    const $element = this.$element();
    if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
      e.cancel = true;
      return;
    }
    this._toggleResizingClass(true);
    this._movingSides = this._getMovingSides(e);
    this._elementLocation = locate($element);
    this._elementSize = this._getElementSize();
    this._renderDragOffsets(e);
    null === (_this$_resizeStartAct = this._resizeStartAction) || void 0 === _this$_resizeStartAct || _this$_resizeStartAct.call(this, {
      event: e,
      width: this._elementSize.width,
      height: this._elementSize.height,
      handles: this._movingSides
    });
    e.targetElements = null;
  }
  _toggleResizingClass(value) {
    this.$element().toggleClass("dx-resizable-resizing", value);
  }
  _renderDragOffsets(e) {
    const area = this._getArea();
    if (!area) {
      return;
    }
    const $handle = renderer_default(e.target).closest(".dx-resizable-handle");
    const handleWidth = getOuterWidth($handle);
    const handleHeight = getOuterHeight($handle);
    const handleOffset = $handle.offset() ?? {
      left: 0,
      top: 0
    };
    const areaOffset = area.offset;
    const scrollOffset = this._getAreaScrollOffset();
    this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
    e.maxLeftOffset = this._leftMaxOffset;
    this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
    e.maxRightOffset = this._rightMaxOffset;
    this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
    e.maxTopOffset = this._topMaxOffset;
    this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY;
    e.maxBottomOffset = this._bottomMaxOffset;
  }
  _getBorderWidth($element, direction) {
    if (isWindow($element.get(0))) {
      return 0;
    }
    const borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
    return parseInt(borderWidth, 10) || 0;
  }
  _proportionate(direction, value) {
    const size = this._elementSize;
    const factor = "x" === direction ? size.width / size.height : size.height / size.width;
    return value * factor;
  }
  _getProportionalDelta(delta) {
    const {
      x,
      y
    } = delta;
    const proportionalY = this._proportionate("y", x);
    if (proportionalY >= y) {
      return {
        x,
        y: proportionalY
      };
    }
    const proportionalX = this._proportionate("x", y);
    if (proportionalX >= x) {
      return {
        x: proportionalX,
        y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  _getDirectionName(axis) {
    const sides = this._movingSides;
    if ("x" === axis) {
      return sides.left ? "left" : "right";
    }
    return sides.top ? "top" : "bottom";
  }
  _fitIntoArea(axis, value) {
    const directionName = this._getDirectionName(axis);
    return Math.min(value, this[`_${directionName}MaxOffset`] ?? 1 / 0);
  }
  _fitDeltaProportionally(delta) {
    let fittedDelta = _extends({}, delta);
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    const calculateWidth = () => size.width + fittedDelta.x;
    const calculateHeight = () => size.height + fittedDelta.y;
    const isInArea = (axis) => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
    const isFittedX = () => inRange(calculateWidth(), minWidth, maxWidth) && isInArea("x");
    const isFittedY = () => inRange(calculateHeight(), minHeight, maxHeight) && isInArea("y");
    if (!isFittedX()) {
      const x = this._fitIntoArea("x", fitIntoRange(calculateWidth(), minWidth, maxWidth) - size.width);
      fittedDelta = {
        x,
        y: this._proportionate("y", x)
      };
    }
    if (!isFittedY()) {
      const y = this._fitIntoArea("y", fitIntoRange(calculateHeight(), minHeight, maxHeight) - size.height);
      fittedDelta = {
        x: this._proportionate("x", y),
        y
      };
    }
    return isFittedX() && isFittedY() ? fittedDelta : {
      x: 0,
      y: 0
    };
  }
  _fitDelta(delta) {
    const {
      x,
      y
    } = delta;
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    return {
      x: fitIntoRange(size.width + x, minWidth, maxWidth) - size.width,
      y: fitIntoRange(size.height + y, minHeight, maxHeight) - size.height
    };
  }
  _getDeltaByOffset(offset) {
    const sides = this._movingSides;
    const shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option("keepAspectRatio");
    let delta = {
      x: offset.x * (sides.left ? -1 : 1),
      y: offset.y * (sides.top ? -1 : 1)
    };
    if (shouldKeepAspectRatio) {
      const proportionalDelta = this._getProportionalDelta(delta);
      const fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
      delta = fittedProportionalDelta;
    } else {
      const fittedDelta = this._fitDelta(delta);
      const roundedFittedDelta = this._roundByStep(fittedDelta);
      delta = roundedFittedDelta;
    }
    return delta;
  }
  _updatePosition(delta, elementDimensions) {
    const {
      width,
      height
    } = elementDimensions;
    const location = this._elementLocation;
    const sides = this._movingSides;
    const $element = this.$element();
    const elementRect = this._getElementSize();
    const offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
    const offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
    move($element, {
      top: location.top + (sides.top ? offsetTop : 0),
      left: location.left + (sides.left ? offsetLeft : 0)
    });
  }
  _dragHandler(e) {
    const offset = this._getOffset(e);
    const delta = this._getDeltaByOffset(offset);
    const dimensions = this._updateDimensions(delta);
    this._updatePosition(delta, dimensions);
    this._triggerResizeAction(e, dimensions);
  }
  _updateDimensions(delta) {
    const isAbsoluteSize = (size2) => "px" === size2.substring(size2.length - 2);
    const {
      stepPrecision
    } = this.option();
    const isStepPrecisionStrict = "strict" === stepPrecision;
    const size = this._elementSize;
    const width = size.width + delta.x;
    const height = size.height + delta.y;
    const elementStyle = this.$element()[0].style;
    const shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
    const shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
    if (shouldRenderWidth) {
      this.option({
        width
      });
    }
    if (shouldRenderHeight) {
      this.option({
        height
      });
    }
    return {
      width: shouldRenderWidth ? width : size.width,
      height: shouldRenderHeight ? height : size.height
    };
  }
  _triggerResizeAction(e, elementDimensions) {
    var _this$_resizeAction;
    const {
      width,
      height
    } = elementDimensions;
    null === (_this$_resizeAction = this._resizeAction) || void 0 === _this$_resizeAction || _this$_resizeAction.call(this, {
      event: e,
      width: this.option("width") || width,
      height: this.option("height") || height,
      handles: this._movingSides
    });
    triggerResizeEvent(this.$element());
  }
  _isCornerHandler(sides) {
    return 0 === Object.values(sides).reduce(((xor, value) => xor ^ value), 0);
  }
  _getOffset(e) {
    const {
      offset
    } = e;
    const sides = this._movingSides;
    if (!sides.left && !sides.right) {
      offset.x = 0;
    }
    if (!sides.top && !sides.bottom) {
      offset.y = 0;
    }
    return offset;
  }
  _roundByStep(delta) {
    const {
      stepPrecision
    } = this.option();
    return "strict" === stepPrecision ? this._roundStrict(delta) : this._roundNotStrict(delta);
  }
  _getSteps() {
    const {
      step,
      roundStepValue
    } = this.option();
    return pairToObject(step, !roundStepValue);
  }
  _roundNotStrict(delta) {
    const {
      h,
      v
    } = this._getSteps();
    return {
      x: delta.x - delta.x % h,
      y: delta.y - delta.y % v
    };
  }
  _roundStrict(delta) {
    const sides = this._movingSides;
    const offset = {
      x: delta.x * (sides.left ? -1 : 1),
      y: delta.y * (sides.top ? -1 : 1)
    };
    const steps = this._getSteps();
    const location = this._elementLocation;
    const size = this._elementSize;
    const xPos = sides.left ? location.left : location.left + size.width;
    const yPos = sides.top ? location.top : location.top + size.height;
    const newXShift = (xPos + offset.x) % steps.h;
    const newYShift = (yPos + offset.y) % steps.v;
    const sign = Math.sign || ((x) => {
      const offsetX = +x;
      if (0 === offsetX || isNaN(offsetX)) {
        return offsetX;
      }
      return offsetX > 0 ? 1 : -1;
    });
    const separatorOffset = (stepValue, offsetValue) => (1 + 0.2 * sign(offsetValue)) % 1 * stepValue;
    const isSmallOffset = (offsetValue, stepValue) => Math.abs(offsetValue) < 0.2 * stepValue;
    let newOffsetX = offset.x - newXShift;
    let newOffsetY = offset.y - newYShift;
    if (newXShift > separatorOffset(steps.h, offset.x)) {
      newOffsetX += steps.h;
    }
    if (newYShift > separatorOffset(steps.v, offset.y)) {
      newOffsetY += steps.v;
    }
    const roundedOffset_x = (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0, roundedOffset_y = (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0;
    return {
      x: roundedOffset_x * (sides.left ? -1 : 1),
      y: roundedOffset_y * (sides.top ? -1 : 1)
    };
  }
  _getMovingSides(e) {
    const $target = renderer_default(e.target);
    const hasCornerTopLeftClass = $target.hasClass("dx-resizable-handle-corner-top-left");
    const hasCornerTopRightClass = $target.hasClass("dx-resizable-handle-corner-top-right");
    const hasCornerBottomLeftClass = $target.hasClass("dx-resizable-handle-corner-bottom-left");
    const hasCornerBottomRightClass = $target.hasClass("dx-resizable-handle-corner-bottom-right");
    return {
      top: $target.hasClass("dx-resizable-handle-top") || hasCornerTopLeftClass || hasCornerTopRightClass,
      left: $target.hasClass("dx-resizable-handle-left") || hasCornerTopLeftClass || hasCornerBottomLeftClass,
      bottom: $target.hasClass("dx-resizable-handle-bottom") || hasCornerBottomLeftClass || hasCornerBottomRightClass,
      right: $target.hasClass("dx-resizable-handle-right") || hasCornerTopRightClass || hasCornerBottomRightClass
    };
  }
  _getArea() {
    let {
      area
    } = this.option();
    if (isFunction(area)) {
      area = area.call(this);
    }
    if (isPlainObject(area)) {
      return this._getAreaFromObject(area);
    }
    return this._getAreaFromElement(area);
  }
  _getAreaScrollOffset() {
    const {
      area
    } = this.option();
    const isElement = !isFunction(area) && !isPlainObject(area);
    const scrollOffset = {
      scrollY: 0,
      scrollX: 0
    };
    if (isElement) {
      const areaElement = renderer_default(area)[0];
      if (isWindow(areaElement)) {
        scrollOffset.scrollX = areaElement.pageXOffset;
        scrollOffset.scrollY = areaElement.pageYOffset;
      }
    }
    return scrollOffset;
  }
  _getAreaFromObject(area) {
    const result = {
      width: area.right - area.left,
      height: area.bottom - area.top,
      offset: {
        left: area.left,
        top: area.top
      }
    };
    this._correctAreaGeometry(result);
    return result;
  }
  _getAreaFromElement(area) {
    const $area = renderer_default(area);
    if (!$area.length) {
      return;
    }
    const result = {
      width: getInnerWidth($area),
      height: getInnerHeight($area),
      offset: extend({
        top: 0,
        left: 0
      }, isWindow($area[0]) ? {} : $area.offset())
    };
    this._correctAreaGeometry(result, $area);
    return result;
  }
  _correctAreaGeometry(result, $area) {
    const areaBorderLeft = $area ? this._getBorderWidth($area, "left") : 0;
    const areaBorderTop = $area ? this._getBorderWidth($area, "top") : 0;
    result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), "left");
    result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), "top");
    result.width -= getOuterWidth(this.$element()) - getInnerWidth(this.$element());
    result.height -= getOuterHeight(this.$element()) - getInnerHeight(this.$element());
  }
  _dragEndHandler(e) {
    var _this$_resizeEndActio;
    const $element = this.$element();
    null === (_this$_resizeEndActio = this._resizeEndAction) || void 0 === _this$_resizeEndActio || _this$_resizeEndActio.call(this, {
      event: e,
      width: getOuterWidth($element),
      height: getOuterHeight($element),
      handles: this._movingSides
    });
    this._toggleResizingClass(false);
  }
  _renderWidth(width) {
    const {
      minWidth,
      maxWidth
    } = this.option();
    this.option("width", fitIntoRange(width, minWidth, maxWidth));
  }
  _renderHeight(height) {
    const {
      minHeight,
      maxHeight
    } = this.option();
    this.option("height", fitIntoRange(height, minHeight, maxHeight));
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "disabled":
        this._toggleEventHandlers(!value);
        super._optionChanged(args);
        break;
      case "handles":
        this._invalidate();
        break;
      case "minWidth":
      case "maxWidth":
        if (hasWindow()) {
          this._renderWidth(getOuterWidth(this.$element()));
        }
        break;
      case "minHeight":
      case "maxHeight":
        if (hasWindow()) {
          this._renderHeight(getOuterHeight(this.$element()));
        }
        break;
      case "onResize":
      case "onResizeStart":
      case "onResizeEnd":
        this._renderActions();
        break;
      case "area":
      case "stepPrecision":
      case "step":
      case "roundStepValue":
      case "keepAspectRatio":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    this.$element().find(".dx-resizable-handle").remove();
  }
  _useTemplates() {
    return false;
  }
};
component_registrator_default(RESIZABLE, Resizable);
var resizable_default = Resizable;

// node_modules/devextreme/esm/ui/resizable.js
var resizable_default2 = resizable_default;

// node_modules/devextreme/esm/__internal/ui/toolbar/constants.js
var TOOLBAR_CLASS = "dx-toolbar";

// node_modules/devextreme/esm/__internal/ui/toolbar/toolbar.base.js
var TOOLBAR_ITEM_DATA_KEY = "dxToolbarItemDataKey";
var ToolbarBase = class extends collection_widget_async_default {
  _getSynchronizableOptionsForCreateComponent() {
    return super._getSynchronizableOptionsForCreateComponent().filter(((item) => "disabled" !== item));
  }
  _initTemplates() {
    super._initTemplates();
    const template = new BindableTemplate((($container, data, rawModel) => {
      if (isPlainObject(data)) {
        const {
          text,
          html,
          widget
        } = data;
        if (text) {
          $container.text(text).wrapInner("<div>");
        }
        if (html) {
          $container.html(html);
        }
        if ("dxDropDownButton" === widget) {
          data.options = data.options ?? {};
          if (!isDefined(data.options.stylingMode)) {
            data.options.stylingMode = this.option("useFlatButtons") ? "text" : "contained";
          }
        }
        if ("dxButton" === widget) {
          if (this.option("useFlatButtons")) {
            data.options = data.options ?? {};
            data.options.stylingMode = data.options.stylingMode ?? "text";
          }
          if (this.option("useDefaultButtons")) {
            data.options = data.options ?? {};
            data.options.type = data.options.type ?? "default";
          }
        }
      } else {
        $container.text(String(data));
      }
      this._getTemplate("dx-polymorph-widget").render({
        container: $container,
        model: rawModel,
        parent: this
      });
    }), ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
    this._templateManager.addDefaultTemplates({
      item: template,
      menuItem: template
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      renderAs: "topToolbar",
      grouped: false,
      useFlatButtons: false,
      useDefaultButtons: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => isMaterialBased(current()),
      options: {
        useFlatButtons: true
      }
    }]);
  }
  _itemContainer() {
    return this._$toolbarItemsContainer.find([".dx-toolbar-before", ".dx-toolbar-center", ".dx-toolbar-after"].join(","));
  }
  _itemClass() {
    return "dx-toolbar-item";
  }
  _itemDataKey() {
    return TOOLBAR_ITEM_DATA_KEY;
  }
  _dimensionChanged(dimension) {
    if (this._disposed) {
      return;
    }
    this._arrangeItems();
    this._applyCompactMode();
  }
  _initMarkup() {
    this._renderToolbar();
    this._renderSections();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._updateDimensionsInMaterial();
  }
  _postProcessRenderItems() {
    this._arrangeItems();
  }
  _renderToolbar() {
    this.$element().addClass(TOOLBAR_CLASS);
    this._$toolbarItemsContainer = renderer_default("<div>").addClass("dx-toolbar-items-container").appendTo(this.$element());
    this.setAria("role", "toolbar");
  }
  _renderSections() {
    const $container = this._$toolbarItemsContainer;
    each(["before", "center", "after"], ((_, section) => {
      const sectionClass = `dx-toolbar-${section}`;
      const $section = $container.find(`.${sectionClass}`);
      if (!$section.length) {
        this[`_$${section}Section`] = renderer_default("<div>").addClass(sectionClass).attr("role", "presentation").appendTo($container);
      }
    }));
  }
  _arrangeItems(width) {
    var _this$_$centerSection, _this$_$beforeSection, _this$_$afterSection, _$label$position;
    const elementWidth = width ?? getWidth(this.$element());
    null === (_this$_$centerSection = this._$centerSection) || void 0 === _this$_$centerSection || _this$_$centerSection.css({
      margin: "0 auto",
      float: "none"
    });
    const beforeRect = getBoundingRect(null === (_this$_$beforeSection = this._$beforeSection) || void 0 === _this$_$beforeSection ? void 0 : _this$_$beforeSection.get(0));
    const afterRect = getBoundingRect(null === (_this$_$afterSection = this._$afterSection) || void 0 === _this$_$afterSection ? void 0 : _this$_$afterSection.get(0));
    this._alignCenterSection(beforeRect, afterRect, elementWidth);
    const $label = this._$toolbarItemsContainer.find(".dx-toolbar-label").eq(0);
    const $section = $label.parent();
    if (!$label.length) {
      return;
    }
    const labelOffset = beforeRect.width ? beforeRect.width : null === (_$label$position = $label.position()) || void 0 === _$label$position ? void 0 : _$label$position.left;
    const widthBeforeSection = $section.hasClass("dx-toolbar-before") ? 0 : labelOffset;
    const widthAfterSection = $section.hasClass("dx-toolbar-after") ? 0 : afterRect.width;
    let elemsAtSectionWidth = 0;
    $section.children().not(".dx-toolbar-label").each(((_, element) => {
      elemsAtSectionWidth += getOuterWidth(element);
    }));
    const freeSpace = elementWidth - elemsAtSectionWidth;
    const sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
    if ($section.hasClass("dx-toolbar-before")) {
      if (this._$beforeSection) {
        this._alignSection(this._$beforeSection, sectionMaxWidth);
      }
    } else {
      const labelPaddings = getOuterWidth($label) - getWidth($label);
      $label.css("maxWidth", sectionMaxWidth - labelPaddings);
    }
  }
  _alignCenterSection(beforeRect, afterRect, elementWidth) {
    if (!this._$centerSection) {
      return;
    }
    this._alignSection(this._$centerSection, elementWidth - beforeRect.width - afterRect.width);
    const isRTL = this.option("rtlEnabled");
    const leftRect = isRTL ? afterRect : beforeRect;
    const rightRect = isRTL ? beforeRect : afterRect;
    const centerRect = getBoundingRect(this._$centerSection.get(0));
    if (leftRect.right > centerRect.left || centerRect.right > rightRect.left) {
      this._$centerSection.css({
        marginLeft: leftRect.width,
        marginRight: rightRect.width,
        float: leftRect.width > rightRect.width ? "none" : "right"
      });
    }
  }
  _alignSection($section, maxWidth) {
    const $labels = $section.find(".dx-toolbar-label");
    const labels = $labels.toArray();
    const maxWidthWithoutPaddings = maxWidth - this._getCurrentLabelsPaddings(labels);
    const currentWidth = this._getCurrentLabelsWidth(labels);
    const difference = Math.abs(currentWidth - maxWidthWithoutPaddings);
    if (maxWidthWithoutPaddings < currentWidth) {
      const reversedLabels = labels.reverse();
      this._alignSectionLabels(reversedLabels, difference, false);
    } else {
      this._alignSectionLabels(labels, difference, true);
    }
  }
  _alignSectionLabels(labels, difference, expanding) {
    const getRealLabelWidth = (label) => getBoundingRect(label).width;
    for (let i = 0; i < labels.length; i++) {
      const $label = renderer_default(labels[i]);
      const currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
      let labelMaxWidth = 0;
      if (expanding) {
        $label.css("maxWidth", "inherit");
      }
      const width = expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth;
      const possibleLabelWidth = Math.ceil(width);
      if (possibleLabelWidth < difference) {
        labelMaxWidth = expanding ? possibleLabelWidth : 0;
        difference -= possibleLabelWidth;
      } else {
        labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
        $label.css("maxWidth", labelMaxWidth);
        break;
      }
      $label.css("maxWidth", labelMaxWidth);
    }
  }
  _applyCompactMode() {
    const $element = renderer_default(this.element());
    $element.removeClass("dx-toolbar-compact");
    if (this.option("compactMode") && this._getSummaryItemsSize("width", this._itemElements(), true) > getWidth($element)) {
      $element.addClass("dx-toolbar-compact");
    }
  }
  _getCurrentLabelsWidth(labels) {
    let width = 0;
    labels.forEach(((label) => {
      width += getOuterWidth(label);
    }));
    return width;
  }
  _getCurrentLabelsPaddings(labels) {
    let padding = 0;
    labels.forEach(((label) => {
      padding += getOuterWidth(label) - getWidth(label);
    }));
    return padding;
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const location = itemData.location ?? "center";
    const container = $container ?? this[`_$${location}Section`];
    const itemHasText = !!(itemData.text ?? itemData.html);
    const $itemElement = super._renderItem(index, itemData, container, $itemToReplace);
    $itemElement.toggleClass("dx-toolbar-button", !itemHasText).toggleClass("dx-toolbar-label", itemHasText).addClass(itemData.cssClass ?? "");
    return $itemElement;
  }
  _renderGroupedItems() {
    each(this.option("items"), ((groupIndex, group) => {
      const groupItems = group.items;
      const $container = renderer_default("<div>").addClass("dx-toolbar-group");
      const location = group.location ?? "center";
      if (!(null !== groupItems && void 0 !== groupItems && groupItems.length)) {
        return;
      }
      each(groupItems, ((itemIndex, item) => {
        this._renderItem(itemIndex, item, $container);
      }));
      this._$toolbarItemsContainer.find(`.dx-toolbar-${location}`).append($container);
    }));
  }
  _renderItems(items) {
    const grouped = this.option("grouped") && items.length && items[0].items;
    if (grouped) {
      this._renderGroupedItems();
    } else {
      super._renderItems(items);
    }
  }
  _getToolbarItems() {
    const {
      items = []
    } = this.option();
    return items;
  }
  _renderContentImpl() {
    const items = this._getToolbarItems();
    this.$element().toggleClass("dx-toolbar-mini", 0 === items.length);
    if (this._renderedItemsCount) {
      this._renderItems(items.slice(this._renderedItemsCount));
    } else {
      this._renderItems(items);
    }
    this._applyCompactMode();
  }
  _renderEmptyMessage() {
  }
  _clean() {
    this._$toolbarItemsContainer.children().empty();
    this.$element().empty();
    delete this._$beforeSection;
    delete this._$centerSection;
    delete this._$afterSection;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._arrangeItems();
    }
  }
  _isVisible() {
    return getWidth(this.$element()) > 0 && getHeight(this.$element()) > 0;
  }
  _getIndexByItem(item) {
    return this._getToolbarItems().indexOf(item);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    super._itemOptionChanged(item, property, value, prevValue);
    this._arrangeItems();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "width":
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case "renderAs":
      case "useFlatButtons":
      case "useDefaultButtons":
        this._invalidate();
        break;
      case "compactMode":
        this._applyCompactMode();
        break;
      case "grouped":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._waitParentAnimationTimeout);
  }
  _updateDimensionsInMaterial() {
    if (isMaterial(current())) {
      const _waitParentAnimationFinished = () => new Promise(((resolve) => {
        const check = () => {
          let readyToResolve = true;
          this.$element().parents().each(((_, parent) => {
            if (fx_default.isAnimating(renderer_default(parent).get(0))) {
              readyToResolve = false;
              return false;
            }
            return true;
          }));
          if (readyToResolve) {
            resolve();
          }
          return readyToResolve;
        };
        const runCheck = () => {
          clearTimeout(this._waitParentAnimationTimeout);
          this._waitParentAnimationTimeout = setTimeout((() => check() || runCheck()), 15);
        };
        runCheck();
      }));
      const _checkWebFontForLabelsLoaded = () => {
        const $labels = this.$element().find(".dx-toolbar-label");
        const promises = [];
        $labels.each(((_, label) => {
          const text = renderer_default(label).text();
          const fontWeight = renderer_default(label).css("fontWeight");
          promises.push(waitWebFont(text, fontWeight));
          return true;
        }));
        return Promise.all(promises);
      };
      Promise.all([_waitParentAnimationFinished(), _checkWebFontForLabelsLoaded()]).then((() => {
        this._dimensionChanged();
      }));
    }
  }
};
component_registrator_default("dxToolbarBase", ToolbarBase);
var toolbar_base_default = ToolbarBase;

// node_modules/devextreme/esm/__internal/ui/popup/m_popup_drag.js
var PopupDrag = class {
  constructor(config) {
    this.init(config);
  }
  init(_ref) {
    let {
      dragEnabled,
      handle,
      draggableElement,
      positionController
    } = _ref;
    this._positionController = positionController;
    this._draggableElement = draggableElement;
    this._handle = handle;
    this._dragEnabled = dragEnabled;
    this.unsubscribe();
    if (!dragEnabled) {
      return;
    }
    this.subscribe();
  }
  moveDown(e) {
    this._moveTo(5, 0, e);
  }
  moveUp(e) {
    this._moveTo(-5, 0, e);
  }
  moveLeft(e) {
    this._moveTo(0, -5, e);
  }
  moveRight(e) {
    this._moveTo(0, 5, e);
  }
  subscribe() {
    const eventNames = this._getEventNames();
    m_events_engine_default.on(this._handle, eventNames.startEventName, ((e) => {
      this._dragStartHandler(e);
    }));
    m_events_engine_default.on(this._handle, eventNames.updateEventName, ((e) => {
      this._dragUpdateHandler(e);
    }));
    m_events_engine_default.on(this._handle, eventNames.endEventName, ((e) => {
      this._dragEndHandler(e);
    }));
  }
  unsubscribe() {
    const eventNames = this._getEventNames();
    m_events_engine_default.off(this._handle, eventNames.startEventName);
    m_events_engine_default.off(this._handle, eventNames.updateEventName);
    m_events_engine_default.off(this._handle, eventNames.endEventName);
  }
  _getEventNames() {
    const startEventName = addNamespace(DRAG_START_EVENT, "overlayDrag");
    const updateEventName = addNamespace(DRAG_EVENT, "overlayDrag");
    const endEventName = addNamespace(DRAG_END_EVENT, "overlayDrag");
    return {
      startEventName,
      updateEventName,
      endEventName
    };
  }
  _dragStartHandler(e) {
    const allowedOffsets = this._getAllowedOffsets();
    this._prevOffset = {
      x: 0,
      y: 0
    };
    e.targetElements = [];
    e.maxTopOffset = allowedOffsets.top;
    e.maxBottomOffset = allowedOffsets.bottom;
    e.maxLeftOffset = allowedOffsets.left;
    e.maxRightOffset = allowedOffsets.right;
  }
  _dragUpdateHandler(e) {
    const targetOffset = {
      top: e.offset.y - this._prevOffset.y,
      left: e.offset.x - this._prevOffset.x
    };
    this._moveByOffset(targetOffset);
    this._prevOffset = e.offset;
  }
  _dragEndHandler(event) {
    this._positionController.dragHandled();
    this._positionController.detectVisualPositionChange(event);
  }
  _moveTo(top, left, e) {
    if (!this._dragEnabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const offset = this._fitOffsetIntoAllowedRange(top, left);
    this._moveByOffset(offset);
    this._dragEndHandler(e);
  }
  _fitOffsetIntoAllowedRange(top, left) {
    const allowedOffsets = this._getAllowedOffsets();
    return {
      top: fitIntoRange(top, -allowedOffsets.top, allowedOffsets.bottom),
      left: fitIntoRange(left, -allowedOffsets.left, allowedOffsets.right)
    };
  }
  _getContainerDimensions() {
    const document = dom_adapter_default.getDocument();
    const container = this._positionController.$dragResizeContainer.get(0);
    let containerWidth = getOuterWidth(container);
    let containerHeight = getOuterHeight(container);
    if (isWindow(container)) {
      containerHeight = Math.max(document.body.clientHeight, containerHeight);
      containerWidth = Math.max(document.body.clientWidth, containerWidth);
    }
    return {
      width: containerWidth,
      height: containerHeight
    };
  }
  _getContainerPosition() {
    const container = this._positionController.$dragResizeContainer.get(0);
    return isWindow(container) ? {
      top: 0,
      left: 0
    } : getOffset(container);
  }
  _getElementPosition() {
    return getOffset(this._draggableElement);
  }
  _getInnerDelta() {
    const containerDimensions = this._getContainerDimensions();
    const elementDimensions = this._getElementDimensions();
    return {
      x: containerDimensions.width - elementDimensions.width,
      y: containerDimensions.height - elementDimensions.height
    };
  }
  _getOuterDelta() {
    const {
      width,
      height
    } = this._getElementDimensions();
    const {
      outsideDragFactor
    } = this._positionController;
    return {
      x: width * outsideDragFactor,
      y: height * outsideDragFactor
    };
  }
  _getFullDelta() {
    const fullDelta = this._getInnerDelta();
    const outerDelta = this._getOuterDelta();
    return {
      x: fullDelta.x + outerDelta.x,
      y: fullDelta.y + outerDelta.y
    };
  }
  _getElementDimensions() {
    return {
      width: this._draggableElement.offsetWidth,
      height: this._draggableElement.offsetHeight
    };
  }
  _getAllowedOffsets() {
    const fullDelta = this._getFullDelta();
    const isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
    if (!isDragAllowed) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
    }
    const elementPosition = this._getElementPosition();
    const containerPosition = this._getContainerPosition();
    const outerDelta = this._getOuterDelta();
    return {
      top: elementPosition.top - containerPosition.top + outerDelta.y,
      bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
      left: elementPosition.left - containerPosition.left + outerDelta.x,
      right: -elementPosition.left + containerPosition.left + fullDelta.x
    };
  }
  _moveByOffset(offset) {
    const currentPosition = locate(this._draggableElement);
    const newPosition = {
      left: currentPosition.left + offset.left,
      top: currentPosition.top + offset.top
    };
    move(this._draggableElement, newPosition);
  }
};
var m_popup_drag_default = PopupDrag;

// node_modules/devextreme/esm/__internal/ui/popup/m_popup_overflow_manager.js
var overflowManagerMock = {
  setOverflow: noop,
  restoreOverflow: noop
};
var createBodyOverflowManager = () => {
  if (!m_window_default.hasWindow()) {
    return overflowManagerMock;
  }
  const window3 = m_window_default.getWindow();
  const {
    documentElement
  } = dom_adapter_default.getDocument();
  const body = dom_adapter_default.getBody();
  const isIosDevice = "ios" === devices_default.real().platform;
  const prevSettings = {
    overflow: null,
    overflowX: null,
    overflowY: null,
    paddingRight: null,
    position: null,
    top: null,
    left: null
  };
  return {
    setOverflow: isIosDevice ? () => {
      if (isDefined(prevSettings.position) || "fixed" === body.style.position) {
        return;
      }
      const {
        scrollY,
        scrollX
      } = window3;
      prevSettings.position = body.style.position;
      prevSettings.top = body.style.top;
      prevSettings.left = body.style.left;
      body.style.setProperty("position", "fixed");
      body.style.setProperty("top", -scrollY + "px");
      body.style.setProperty("left", -scrollX + "px");
    } : () => {
      (() => {
        const scrollBarWidth = window3.innerWidth - documentElement.clientWidth;
        if (prevSettings.paddingRight || scrollBarWidth <= 0) {
          return;
        }
        const paddingRight = window3.getComputedStyle(body).getPropertyValue("padding-right");
        const computedBodyPaddingRight = parseInt(paddingRight, 10);
        prevSettings.paddingRight = computedBodyPaddingRight;
        body.style.setProperty("padding-right", `${computedBodyPaddingRight + scrollBarWidth}px`);
      })();
      if (prevSettings.overflow || "hidden" === body.style.overflow) {
        return;
      }
      prevSettings.overflow = body.style.overflow;
      prevSettings.overflowX = body.style.overflowX;
      prevSettings.overflowY = body.style.overflowY;
      body.style.setProperty("overflow", "hidden");
    },
    restoreOverflow: isIosDevice ? () => {
      if (!isDefined(prevSettings.position)) {
        return;
      }
      const scrollY = -parseInt(body.style.top, 10);
      const scrollX = -parseInt(body.style.left, 10);
      ["position", "top", "left"].forEach(((property) => {
        if (prevSettings[property]) {
          body.style.setProperty(property, prevSettings[property]);
        } else {
          body.style.removeProperty(property);
        }
      }));
      window3.scrollTo(scrollX, scrollY);
      prevSettings.position = null;
    } : () => {
      (() => {
        if (!isDefined(prevSettings.paddingRight)) {
          return;
        }
        if (prevSettings.paddingRight) {
          body.style.setProperty("padding-right", `${prevSettings.paddingRight}px`);
        } else {
          body.style.removeProperty("padding-right");
        }
        prevSettings.paddingRight = null;
      })();
      ["overflow", "overflowX", "overflowY"].forEach(((property) => {
        if (!isDefined(prevSettings[property])) {
          return;
        }
        const propertyInKebabCase = property.replace(/(X)|(Y)/, ((symbol) => `-${symbol.toLowerCase()}`));
        if (prevSettings[property]) {
          body.style.setProperty(propertyInKebabCase, prevSettings[property]);
        } else {
          body.style.removeProperty(propertyInKebabCase);
        }
        prevSettings[property] = null;
      }));
    }
  };
};

// node_modules/devextreme/esm/__internal/ui/popup/popup_position_controller.js
var window = m_window_default.getWindow();
var PopupPositionController = class extends OverlayPositionController {
  constructor(params) {
    super(params);
    const superProperties = this._properties;
    const {
      properties
    } = params;
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = properties;
    this._properties = _extends({}, superProperties, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    this._$dragResizeContainer = void 0;
    this._updateDragResizeContainer();
  }
  get $dragResizeContainer() {
    return this._$dragResizeContainer;
  }
  get outsideDragFactor() {
    if (this._properties.dragOutsideBoundary) {
      return 1;
    }
    return this._properties.outsideDragFactor;
  }
  set outsideDragFactor(outsideDragFactor) {
    this._properties.outsideDragFactor = outsideDragFactor;
  }
  set fullScreen(fullScreen) {
    this._properties.fullScreen = fullScreen;
    if (fullScreen) {
      this._fullScreenEnabled();
    } else {
      this._fullScreenDisabled();
    }
  }
  set dragAndResizeArea(dragAndResizeArea) {
    this._properties.dragAndResizeArea = dragAndResizeArea;
    this._updateDragResizeContainer();
  }
  set dragOutsideBoundary(dragOutsideBoundary) {
    this._properties.dragOutsideBoundary = dragOutsideBoundary;
    this._updateDragResizeContainer();
  }
  updateContainer(container) {
    super.updateContainer(container);
    this._updateDragResizeContainer();
  }
  dragHandled() {
    this.restorePositionOnNextRender(false);
  }
  resizeHandled() {
    this.restorePositionOnNextRender(false);
  }
  positionContent() {
    if (this._properties.fullScreen) {
      move(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_properties$for, _this$_properties;
      null === (_this$_properties$for = (_this$_properties = this._properties).forceApplyBindings) || void 0 === _this$_properties$for || _this$_properties$for.call(_this$_properties);
      super.positionContent();
    }
  }
  _normalizePosition(position) {
    const normalizedPosition = super._normalizePosition(position);
    if (this._properties.fullScreen) {
      normalizedPosition.of = "window";
    }
    return normalizedPosition;
  }
  _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  }
  _getDragResizeContainer() {
    if (this._properties.dragOutsideBoundary) {
      return renderer_default(window);
    }
    if (this._properties.dragAndResizeArea) {
      return renderer_default(this._properties.dragAndResizeArea);
    }
    const isContainerDefined = originalViewPort().get(0) || this._properties.container;
    return isContainerDefined ? this._$markupContainer : renderer_default(window);
  }
  _getVisualContainer() {
    if (this._properties.fullScreen) {
      return renderer_default(window);
    }
    return super._getVisualContainer();
  }
  _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
  }
  _fullScreenDisabled() {
    this.restorePositionOnNextRender(true);
  }
};

// node_modules/devextreme/esm/__internal/ui/popup/m_popup.js
var window2 = m_window_default.getWindow();
var ALLOWED_TOOLBAR_ITEM_ALIASES = ["cancel", "clear", "done"];
var HEIGHT_STRATEGIES = {
  static: "",
  inherit: "dx-popup-inherit-height",
  flex: "dx-popup-flex-height"
};
var getButtonPlace = (name) => {
  const device = devices_default.current();
  const {
    platform
  } = device;
  let toolbar = "bottom";
  let location = "before";
  if ("ios" === platform) {
    switch (name) {
      case "cancel":
        toolbar = "top";
        break;
      case "clear":
        toolbar = "top";
        location = "after";
        break;
      case "done":
        location = "after";
    }
  } else if ("android" === platform) {
    switch (name) {
      case "cancel":
      case "done":
        location = "after";
    }
  }
  return {
    toolbar,
    location
  };
};
var getLocalizationKey = (itemType) => "done" === itemType.toLowerCase() ? "OK" : camelize(itemType, true);
var getHeightStrategyChangeOffset = (currentHeightStrategyClass, popupVerticalPaddings) => currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
var Popup = class extends overlay_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      upArrow: (e) => {
        var _this$_drag;
        null === (_this$_drag = this._drag) || void 0 === _this$_drag || _this$_drag.moveUp(e);
      },
      downArrow: (e) => {
        var _this$_drag2;
        null === (_this$_drag2 = this._drag) || void 0 === _this$_drag2 || _this$_drag2.moveDown(e);
      },
      leftArrow: (e) => {
        var _this$_drag3;
        null === (_this$_drag3 = this._drag) || void 0 === _this$_drag3 || _this$_drag3.moveLeft(e);
      },
      rightArrow: (e) => {
        var _this$_drag4;
        null === (_this$_drag4 = this._drag) || void 0 === _this$_drag4 || _this$_drag4.moveRight(e);
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      fullScreen: false,
      title: "",
      showTitle: true,
      titleTemplate: "title",
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
      enableBodyScroll: true,
      outsideDragFactor: 0,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      resizeEnabled: false,
      toolbarItems: [],
      showCloseButton: false,
      bottomTemplate: "bottom",
      useDefaultToolbarButtons: false,
      useFlatToolbarButtons: false,
      autoResizeEnabled: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "ios"
      },
      options: {
        animation: this._iosAnimation
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        animation: this._androidAnimation
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        showCloseButton: true
      }
    }, {
      device: (device) => "desktop" === devices_default.real().deviceType && "generic" === device.platform,
      options: {
        dragEnabled: true
      }
    }, {
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isMaterialBased(current()),
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device: () => isMaterial(current()),
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  }
  _iosAnimation() {
    return {
      show: {
        type: "slide",
        duration: 400,
        from: {
          position: {
            my: "top",
            at: "bottom"
          }
        },
        to: {
          position: {
            my: "center",
            at: "center"
          }
        }
      },
      hide: {
        type: "slide",
        duration: 400,
        from: {
          opacity: 1,
          position: {
            my: "center",
            at: "center"
          }
        },
        to: {
          opacity: 1,
          position: {
            my: "top",
            at: "bottom"
          }
        }
      }
    };
  }
  _androidAnimation() {
    return this.option("fullScreen") ? {
      show: {
        type: "slide",
        duration: 300,
        from: {
          top: "30%",
          opacity: 0
        },
        to: {
          top: 0,
          opacity: 1
        }
      },
      hide: {
        type: "slide",
        duration: 300,
        from: {
          top: 0,
          opacity: 1
        },
        to: {
          top: "30%",
          opacity: 0
        }
      }
    } : {
      show: {
        type: "fade",
        duration: 400,
        from: 0,
        to: 1
      },
      hide: {
        type: "fade",
        duration: 400,
        from: 1,
        to: 0
      }
    };
  }
  _init() {
    const {
      _wrapperClassExternal: popupWrapperClassExternal
    } = this.option();
    const popupWrapperClasses = popupWrapperClassExternal ? `dx-popup-wrapper ${popupWrapperClassExternal}` : "dx-popup-wrapper";
    super._init();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass("dx-popup");
    this.$wrapper().addClass(popupWrapperClasses);
    this._$popupContent = this._$content.wrapInner(renderer_default("<div>").addClass("dx-popup-content")).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr("role", "dialog");
  }
  _render() {
    const isFullscreen = Boolean(this.option("fullScreen"));
    this._toggleFullScreenClass(isFullscreen);
    super._render();
  }
  _createBodyOverflowManager() {
    this._bodyOverflowManager = createBodyOverflowManager();
  }
  _toggleFullScreenClass(value) {
    this.$overlayContent().toggleClass("dx-popup-fullscreen", value).toggleClass("dx-popup-normal", !value);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new EmptyTemplate(),
      bottom: new EmptyTemplate()
    });
  }
  _getActionsList() {
    return super._getActionsList().concat(["onResizeStart", "onResize", "onResizeEnd"]);
  }
  _contentResizeHandler(entry) {
    if (!this._shouldSkipContentResize(entry)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  }
  _isShowAnimationResizing() {
    const animation = this.option("animation");
    return ["to", "from"].some(((prop) => {
      var _animation$show;
      const config = null === animation || void 0 === animation || null === (_animation$show = animation.show) || void 0 === _animation$show ? void 0 : _animation$show[prop];
      return isObject(config) && ("width" in config || "height" in config);
    }));
  }
  _updateResizeCallbackSkipCondition() {
    const isShowAnimationResizing = this._isShowAnimationResizing();
    this._shouldSkipContentResize = (entry) => isShowAnimationResizing && this._showAnimationProcessing || this._areContentDimensionsRendered(entry);
  }
  _observeContentResize(shouldObserve) {
    if (!this.option("useResizeObserver")) {
      return;
    }
    const contentElement = this._$content.get(0);
    if (shouldObserve) {
      resize_observer_default.observe(contentElement, ((entry) => {
        this._contentResizeHandler(entry);
      }));
    } else {
      resize_observer_default.unobserve(contentElement);
    }
  }
  _areContentDimensionsRendered(entry) {
    var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
    const contentBox = null === (_entry$contentBoxSize = entry.contentBoxSize) || void 0 === _entry$contentBoxSize ? void 0 : _entry$contentBoxSize[0];
    if (contentBox) {
      var _this$_renderedDimens, _this$_renderedDimens2;
      return parseInt(contentBox.inlineSize, 10) === (null === (_this$_renderedDimens = this._renderedDimensions) || void 0 === _this$_renderedDimens ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === (null === (_this$_renderedDimens2 = this._renderedDimensions) || void 0 === _this$_renderedDimens2 ? void 0 : _this$_renderedDimens2.height);
    }
    const {
      contentRect
    } = entry;
    return parseInt(contentRect.width, 10) === (null === (_this$_renderedDimens3 = this._renderedDimensions) || void 0 === _this$_renderedDimens3 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === (null === (_this$_renderedDimens4 = this._renderedDimensions) || void 0 === _this$_renderedDimens4 ? void 0 : _this$_renderedDimens4.height);
  }
  _renderContent() {
    super._renderContent();
    this._observeContentResize(true);
  }
  _processContentRendering() {
    this._renderTopToolbar();
    this._renderBottomToolbar();
    this._renderResize();
    super._processContentRendering();
  }
  _getTopToolbarItems() {
    const {
      showTitle,
      title
    } = this.option();
    const {
      ios: isIOS
    } = devices_default.current();
    const items = this._getToolbarItems("top");
    if (showTitle && Boolean(title)) {
      items.unshift({
        location: isIOS ? "center" : "before",
        text: title
      });
    }
    return items;
  }
  _renderTopToolbar() {
    const {
      showTitle
    } = this.option();
    const items = this._getTopToolbarItems();
    const shouldBeShown = showTitle || items.length > 0;
    if (shouldBeShown) {
      var _this$_$topToolbar;
      if (this._$topToolbar) {
        this._updateToolbarOptions("top", {
          items
        });
      } else {
        this._renderTopToolbarImpl();
      }
      null === (_this$_$topToolbar = this._$topToolbar) || void 0 === _this$_$topToolbar || _this$_$topToolbar.toggleClass("dx-has-close-button", this._hasCloseButton());
    } else {
      var _this$_$topToolbar2;
      null === (_this$_$topToolbar2 = this._$topToolbar) || void 0 === _this$_$topToolbar2 || _this$_$topToolbar2.remove();
      this._$topToolbar = void 0;
    }
    this._toggleAriaLabel();
  }
  _renderTopToolbarImpl() {
    var _this$_$topToolbar3;
    null === (_this$_$topToolbar3 = this._$topToolbar) || void 0 === _this$_$topToolbar3 || _this$_$topToolbar3.remove();
    const items = this._getTopToolbarItems();
    const $toolbarContainer = renderer_default("<div>").addClass("dx-popup-title").addClass(TOOLBAR_CLASS).insertBefore(this.$content());
    this._$topToolbar = this._renderToolbar("titleTemplate", items, $toolbarContainer, {
      onInitialized: (e) => {
        this._topToolbar = e.component;
      }
    });
    this._$topToolbar.addClass("dx-popup-title");
    this._renderDrag();
    this._executeTitleRenderAction(this._$topToolbar);
  }
  _renderBottomToolbar() {
    const items = this._getToolbarItems("bottom");
    if (!items.length) {
      var _this$_$bottomToolbar;
      null === (_this$_$bottomToolbar = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar || _this$_$bottomToolbar.remove();
      this._$bottomToolbar = void 0;
      return;
    }
    if (this._$bottomToolbar) {
      this._updateToolbarOptions("bottom", {
        items
      });
    } else {
      this._renderBottomToolbarImpl();
    }
    this._toggleClasses();
  }
  _renderBottomToolbarImpl() {
    var _this$_$bottomToolbar2;
    null === (_this$_$bottomToolbar2 = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar2 || _this$_$bottomToolbar2.remove();
    const items = this._getToolbarItems("bottom");
    const $toolbarContainer = renderer_default("<div>").addClass("dx-popup-bottom").addClass(TOOLBAR_CLASS).insertAfter(this.$content());
    this._$bottomToolbar = this._renderToolbar("bottomTemplate", items, $toolbarContainer, {
      compactMode: true,
      onInitialized: (e) => {
        this._bottomToolbar = e.component;
      }
    });
    this._$bottomToolbar.addClass("dx-popup-bottom");
  }
  _triggerToolbarResizeEvent() {
    [this._$topToolbar, this._$bottomToolbar].forEach((($toolbar) => {
      if ($toolbar) {
        triggerResizeEvent($toolbar);
        triggerResizeEvent($toolbar);
      }
    }));
  }
  _renderToolbar(optionName, items, $container) {
    let additionalToolbarOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const template = this._getTemplateByOption(optionName);
    const isEmptyTemplate = template instanceof EmptyTemplate;
    if (isEmptyTemplate) {
      return this._renderByPolymorphicTemplate(items, $container, additionalToolbarOptions);
    }
    return this._renderByTemplate(template, $container);
  }
  _renderByPolymorphicTemplate(items, $container, additionalToolbarOptions) {
    const {
      disabled,
      rtlEnabled,
      useDefaultToolbarButtons,
      useFlatToolbarButtons
    } = this.option();
    const integrationOptions = extend({}, this.option("integrationOptions"), {
      skipTemplates: ["content", "title"]
    });
    const toolbarOptions = extend(additionalToolbarOptions, {
      disabled,
      rtlEnabled,
      items,
      useDefaultButtons: useDefaultToolbarButtons,
      useFlatButtons: useFlatToolbarButtons,
      integrationOptions
    });
    const template = this._getTemplate("dx-polymorph-widget");
    template.render({
      container: $container,
      model: {
        widget: this._getToolbarName(),
        options: toolbarOptions
      }
    });
    const $toolbar = $container.children("div");
    $container.replaceWith($toolbar);
    return $toolbar;
  }
  _renderByTemplate(template, $container) {
    const $result = renderer_default(template.render({
      container: getPublicElement($container)
    }));
    if ($result.hasClass("dx-template-wrapper")) {
      $container.replaceWith($result);
      $container = $result;
    }
    return $container;
  }
  _updateToolbarOptions(toolbar, options) {
    const instance = "top" === toolbar ? this._topToolbar : this._bottomToolbar;
    null === instance || void 0 === instance || instance.option(options);
  }
  _toggleAriaLabel() {
    var _this$_$topToolbar4;
    const {
      title,
      showTitle
    } = this.option();
    const shouldSetAriaLabel = showTitle && Boolean(title);
    const titleId = shouldSetAriaLabel ? new guid_default().toString() : null;
    null === (_this$_$topToolbar4 = this._$topToolbar) || void 0 === _this$_$topToolbar4 || _this$_$topToolbar4.find(".dx-toolbar-label").eq(0).attr("id", titleId);
    this.$overlayContent().attr("aria-labelledby", titleId);
  }
  _animateShowing() {
    this._triggerToolbarResizeEvent();
    super._animateShowing();
  }
  _renderVisibilityAnimate(visible) {
    return super._renderVisibilityAnimate(visible);
  }
  _hide() {
    this._observeContentResize(false);
    return super._hide();
  }
  _executeTitleRenderAction($titleElement) {
    this._getTitleRenderAction()({
      titleElement: getPublicElement($titleElement)
    });
  }
  _getTitleRenderAction() {
    return this._titleRenderAction ?? this._createTitleRenderAction();
  }
  _createTitleRenderAction() {
    this._titleRenderAction = this._createActionByOption("onTitleRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"]
    });
    return this._titleRenderAction;
  }
  _getCloseButton() {
    return {
      toolbar: "top",
      location: "after",
      template: this._getCloseButtonRenderer()
    };
  }
  _getCloseButtonRenderer() {
    return (_, __, container) => {
      const $button = renderer_default("<div>").addClass("dx-closebutton");
      this._createComponent($button, button_default, {
        icon: "close",
        onClick: this._createToolbarItemAction(void 0),
        stylingMode: "text",
        integrationOptions: {}
      });
      renderer_default(container).append($button);
    };
  }
  _getToolbarItems(toolbar) {
    const {
      platform: currentPlatform
    } = devices_default.current();
    const {
      toolbarItems
    } = this.option();
    const toolbarsItems = [];
    this._toolbarItemClasses = [];
    let index = 0;
    each(toolbarItems, ((_, data) => {
      const isShortcut = isDefined(data.shortcut);
      const item = isShortcut ? getButtonPlace(data.shortcut) : data;
      if (isShortcut && "ios" === currentPlatform && index < 2) {
        item.toolbar = "top";
        index++;
      }
      item.toolbar = data.toolbar || item.toolbar || "top";
      if (item && item.toolbar === toolbar) {
        if (isShortcut) {
          extend(item, {
            location: data.location
          }, this._getToolbarItemByAlias(data));
        }
        const isLTROrder = "generic" === currentPlatform;
        if ("done" === data.shortcut && isLTROrder || "cancel" === data.shortcut && !isLTROrder) {
          toolbarsItems.unshift(item);
        } else {
          toolbarsItems.push(item);
        }
      }
    }));
    if ("top" === toolbar && this._hasCloseButton()) {
      toolbarsItems.push(this._getCloseButton());
    }
    return toolbarsItems;
  }
  _hasCloseButton() {
    const {
      showCloseButton,
      showTitle
    } = this.option();
    return showCloseButton && showTitle;
  }
  _getToolbarButtonStylingMode(shortcut) {
    if (isFluent(current())) {
      return "done" === shortcut ? "contained" : "outlined";
    }
    return this.option("useFlatToolbarButtons") ? "text" : "contained";
  }
  _getToolbarButtonType(shortcut) {
    if (isFluent(current()) && "done" === shortcut || this.option("useDefaultToolbarButtons")) {
      return "default";
    }
    return "normal";
  }
  _getToolbarItemByAlias(data) {
    const itemType = data.shortcut;
    if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
      return false;
    }
    const itemConfig = extend({
      text: message_default.format(getLocalizationKey(itemType)),
      onClick: this._createToolbarItemAction(data.onClick),
      integrationOptions: {},
      type: this._getToolbarButtonType(itemType),
      stylingMode: this._getToolbarButtonStylingMode(itemType)
    }, data.options || {});
    const itemClass = `dx-popup-${itemType}`;
    this._toolbarItemClasses.push(itemClass);
    return {
      template: (_, __, container) => {
        const $toolbarItem = renderer_default("<div>").addClass(itemClass).appendTo(container);
        this._createComponent($toolbarItem, button_default, itemConfig);
      }
    };
  }
  _createToolbarItemAction(clickAction) {
    return this._createAction(clickAction, {
      afterExecute(e) {
        e.component.hide();
      }
    });
  }
  _getToolbarName() {
    return "dxToolbarBase";
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(...arguments);
    this.$content().toggleClass("dx-state-disabled", Boolean(value));
  }
  _toggleClasses() {
    const aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
    each(aliases, ((_, alias) => {
      var _this$_$bottomToolbar3;
      const className = `dx-popup-${alias}`;
      const isVisible = this._toolbarItemClasses.includes(className);
      this.$wrapper().toggleClass(`${className}-visible`, isVisible);
      null === (_this$_$bottomToolbar3 = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar3 || _this$_$bottomToolbar3.toggleClass(className, isVisible);
    }));
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, $element);
    if (isFocused && !isLastZIndexInStack(this._zIndex)) {
      const zIndex = create(this._zIndexInitValue());
      remove(this._zIndex);
      this._zIndex = zIndex;
      this._$wrapper.css("zIndex", zIndex);
      this._$content.css("zIndex", zIndex);
    }
  }
  _toggleContentScrollClass() {
    const isNativeScrollingEnabled = !this.option("preventScrollEvents");
    this.$content().toggleClass("dx-popup-content-scrollable", isNativeScrollingEnabled);
  }
  _getPositionControllerConfig() {
    const superConfiguration = super._getPositionControllerConfig();
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = this.option();
    const properties = _extends({}, superConfiguration.properties, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    const elements = _extends({}, superConfiguration.elements);
    const configuration = {
      properties,
      elements
    };
    return configuration;
  }
  _initPositionController() {
    if (this._positionController) {
      return;
    }
    this._positionController = new PopupPositionController(this._getPositionControllerConfig());
  }
  _getDragTarget() {
    return this.topToolbar();
  }
  _renderGeometry() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {
      visible,
      useResizeObserver
    } = this.option();
    const {
      forceStopAnimation,
      shouldOnlyReposition,
      isDimensionChange
    } = options;
    if (visible && m_window_default.hasWindow()) {
      const isAnimated = this._showAnimationProcessing;
      const shouldRepeatAnimation = isAnimated && !forceStopAnimation && useResizeObserver;
      this._isAnimationPaused = shouldRepeatAnimation || void 0;
      this._stopAnimation();
      if (shouldOnlyReposition) {
        this._renderPosition(false);
      } else {
        this._renderGeometryImpl(isDimensionChange);
      }
      if (shouldRepeatAnimation) {
        this._animateShowing();
        this._isAnimationPaused = void 0;
      }
    }
  }
  _cacheDimensions() {
    if (!this.option("useResizeObserver")) {
      return;
    }
    this._renderedDimensions = {
      width: parseInt(getWidth(this._$content), 10),
      height: parseInt(getHeight(this._$content), 10)
    };
  }
  _renderGeometryImpl() {
    let isDimensionChange = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    if (!isDimensionChange) {
      this._resetContentHeight();
    }
    super._renderGeometryImpl();
    this._cacheDimensions();
    this._setContentHeight();
  }
  _resetContentHeight() {
    const height = this._getOptionValue("height");
    if ("auto" === height) {
      this.$content().css({
        height: "auto",
        maxHeight: "none"
      });
    }
  }
  _renderDrag() {
    const $dragTarget = this._getDragTarget();
    const {
      dragEnabled
    } = this.option();
    if (!$dragTarget) {
      return;
    }
    const config = {
      dragEnabled,
      handle: $dragTarget.get(0),
      draggableElement: this._$content.get(0),
      positionController: this._positionController
    };
    if (this._drag) {
      this._drag.init(config);
    } else {
      this._drag = new m_popup_drag_default(config);
    }
    this.$overlayContent().toggleClass("dx-popup-draggable", dragEnabled);
  }
  _renderResize() {
    this._resizable = this._createComponent(this._$content, resizable_default2, {
      handles: this.option("resizeEnabled") ? "all" : "none",
      onResizeStart: (e) => {
        var _this$_actions, _this$_actions$onResi;
        this._observeContentResize(false);
        null === (_this$_actions = this._actions) || void 0 === _this$_actions || null === (_this$_actions$onResi = _this$_actions.onResizeStart) || void 0 === _this$_actions$onResi || _this$_actions$onResi.call(_this$_actions, e);
      },
      onResize: (e) => {
        var _this$_actions2, _this$_actions2$onRes;
        this._setContentHeight();
        null === (_this$_actions2 = this._actions) || void 0 === _this$_actions2 || null === (_this$_actions2$onRes = _this$_actions2.onResize) || void 0 === _this$_actions2$onRes || _this$_actions2$onRes.call(_this$_actions2, e);
      },
      onResizeEnd: (e) => {
        this._resizeEndHandler(e);
        this._observeContentResize(true);
      },
      minHeight: 100,
      minWidth: 100,
      area: this._positionController.$dragResizeContainer,
      keepAspectRatio: false
    });
  }
  _resizeEndHandler(e) {
    var _this$_actions3, _this$_actions3$onRes;
    const width = this._resizable.option("width");
    const height = this._resizable.option("height");
    if (width) {
      this._setOptionWithoutOptionChange("width", width);
    }
    if (height) {
      this._setOptionWithoutOptionChange("height", height);
    }
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    null === (_this$_actions3 = this._actions) || void 0 === _this$_actions3 || null === (_this$_actions3$onRes = _this$_actions3.onResizeEnd) || void 0 === _this$_actions3$onRes || _this$_actions3$onRes.call(_this$_actions3, e);
  }
  _setContentHeight() {
    const {
      forceApplyBindings
    } = this.option();
    (forceApplyBindings ?? noop)();
    const overlayContent = this.$overlayContent().get(0);
    const currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
    this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
    this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
  }
  _chooseHeightStrategy(overlayContent) {
    const isAutoWidth = "auto" === overlayContent.style.width || "" === overlayContent.style.width;
    let currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
    if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
      if (isAutoWidth) {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
      } else {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
      }
    }
    return currentHeightStrategyClass;
  }
  _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
    let cssStyles = {};
    const contentMaxHeight = this._getOptionValue("maxHeight", overlayContent);
    const contentMinHeight = this._getOptionValue("minHeight", overlayContent);
    const popupHeightParts = this._splitPopupHeight();
    const heightStrategyChangeOffset = getHeightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
    const toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + heightStrategyChangeOffset;
    if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
      if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
        const overlayHeight = this.option("fullScreen") ? Math.min(getBoundingRect(overlayContent).height, m_window_default.getWindow().innerHeight) : getBoundingRect(overlayContent).height;
        const contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
        cssStyles = {
          height: Math.max(0, contentHeight),
          minHeight: "auto",
          maxHeight: "auto"
        };
      }
    } else {
      const container = renderer_default(this._positionController.$visualContainer).get(0);
      const maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
      const minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
      cssStyles = {
        height: "auto",
        minHeight: minHeightValue,
        maxHeight: maxHeightValue
      };
    }
    return cssStyles;
  }
  _setHeightClasses($container, currentClass) {
    let excessClasses = "";
    for (const name in HEIGHT_STRATEGIES) {
      if (HEIGHT_STRATEGIES[name] !== currentClass) {
        excessClasses += ` ${HEIGHT_STRATEGIES[name]}`;
      }
    }
    $container.removeClass(excessClasses).addClass(currentClass);
  }
  _isAutoHeight() {
    return "auto" === this.$overlayContent().get(0).style.height;
  }
  _splitPopupHeight() {
    const topToolbar = this.topToolbar();
    const bottomToolbar = this.bottomToolbar();
    return {
      header: getVisibleHeight(null === topToolbar || void 0 === topToolbar ? void 0 : topToolbar.get(0)),
      footer: getVisibleHeight(null === bottomToolbar || void 0 === bottomToolbar ? void 0 : bottomToolbar.get(0)),
      contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
      popupVerticalOffsets: getVerticalOffsets(this.$content().get(0), true),
      popupVerticalPaddings: getVerticalOffsets(this.$content().get(0), false)
    };
  }
  _isAllWindowCovered() {
    const {
      fullScreen
    } = this.option();
    return super._isAllWindowCovered() || Boolean(fullScreen);
  }
  _renderDimensions() {
    if (this.option("fullScreen")) {
      this.$overlayContent().css({
        width: "100%",
        height: "100%",
        minWidth: "",
        maxWidth: "",
        minHeight: "",
        maxHeight: ""
      });
    } else {
      super._renderDimensions();
    }
    if (m_window_default.hasWindow()) {
      this._renderFullscreenWidthClass();
    }
  }
  _dimensionChanged() {
    this._renderGeometry({
      isDimensionChange: true
    });
  }
  _clean() {
    super._clean();
    this._observeContentResize(false);
  }
  _dispose() {
    super._dispose();
    this._toggleBodyScroll(true);
  }
  _renderFullscreenWidthClass() {
    const isFullScreen = getOuterWidth(this.$overlayContent()) === getWidth(window2);
    this.$overlayContent().toggleClass("dx-popup-fullscreen-width", isFullScreen);
  }
  _toggleSafariScrolling() {
    if (!this.option("enableBodyScroll")) {
      return;
    }
    super._toggleSafariScrolling();
  }
  _toggleBodyScroll(enabled) {
    if (!this._bodyOverflowManager) {
      return;
    }
    const {
      setOverflow,
      restoreOverflow
    } = this._bodyOverflowManager;
    if (enabled) {
      restoreOverflow();
    } else {
      setOverflow();
    }
  }
  refreshPosition() {
    this._renderPosition();
  }
  _optionChanged(args) {
    var _this$_resizable2;
    const {
      value,
      name
    } = args;
    switch (name) {
      case "rtlEnabled":
      case "disabled": {
        super._optionChanged(args);
        const options = {
          [name]: Boolean(value)
        };
        this._updateToolbarOptions("top", options);
        this._updateToolbarOptions("bottom", options);
        break;
      }
      case "animation":
        this._updateResizeCallbackSkipCondition();
        break;
      case "enableBodyScroll":
        if (this.option("visible")) {
          this._toggleBodyScroll(value);
        }
        break;
      case "showTitle":
      case "title":
        this._renderTopToolbar();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "titleTemplate":
        this._renderTopToolbarImpl();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "bottomTemplate":
        this._renderBottomToolbarImpl();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "container":
        super._optionChanged(args);
        if (this.option("resizeEnabled")) {
          var _this$_resizable;
          null === (_this$_resizable = this._resizable) || void 0 === _this$_resizable || _this$_resizable.option("area", this._positionController.$dragResizeContainer);
        }
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        null === (_this$_resizable2 = this._resizable) || void 0 === _this$_resizable2 || _this$_resizable2.option(name, value);
        break;
      case "onTitleRendered":
        this._createTitleRenderAction();
        break;
      case "toolbarItems":
      case "useDefaultToolbarButtons":
      case "useFlatToolbarButtons":
        this._renderTopToolbar();
        this._renderBottomToolbar();
        this._renderGeometry();
        this._triggerToolbarResizeEvent();
        break;
      case "dragEnabled":
        this._renderDrag();
        break;
      case "dragAndResizeArea":
        this._positionController.dragAndResizeArea = value;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case "dragOutsideBoundary":
        this._positionController.dragOutsideBoundary = value;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        break;
      case "outsideDragFactor":
        this._positionController.outsideDragFactor = value;
        break;
      case "resizeEnabled":
        this._renderResize();
        this._renderGeometry();
        break;
      case "autoResizeEnabled":
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "fullScreen":
        this._positionController.fullScreen = value;
        this._toggleFullScreenClass(Boolean(value));
        this._toggleSafariScrolling();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "showCloseButton":
        this._renderTopToolbar();
        break;
      case "preventScrollEvents":
        super._optionChanged(args);
        this._toggleContentScrollClass();
        break;
      default:
        super._optionChanged(args);
    }
  }
  bottomToolbar() {
    return this._$bottomToolbar;
  }
  topToolbar() {
    return this._$topToolbar;
  }
  $content() {
    return this._$popupContent;
  }
  content() {
    return getPublicElement(this.$content());
  }
  $overlayContent() {
    return this._$content;
  }
  getFocusableElements() {
    return this.$wrapper().find("[tabindex]").filter(((_, item) => item.getAttribute("tabindex") >= 0));
  }
};
component_registrator_default("dxPopup", Popup);
var m_popup_default = Popup;

export {
  TOOLBAR_CLASS,
  toolbar_base_default,
  resizable_default2 as resizable_default,
  m_popup_default
};
//# sourceMappingURL=chunk-VOY7L4VC.js.map
