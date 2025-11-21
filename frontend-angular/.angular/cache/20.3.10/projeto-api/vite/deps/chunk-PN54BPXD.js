import {
  check_box_default
} from "./chunk-LHOK3AXV.js";
import {
  register
} from "./chunk-NGYFL4CQ.js";
import {
  SWIPE_END_EVENT,
  SWIPE_EVENT,
  SWIPE_START_EVENT
} from "./chunk-FF43QURI.js";
import {
  editor_default
} from "./chunk-EFEUTFTO.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  CLICK_EVENT_NAME,
  addNamespace,
  component_registrator_default,
  getPublicElement
} from "./chunk-ICLEXNO5.js";
import {
  devices_default,
  ui_errors_default
} from "./chunk-DONQLAZQ.js";
import {
  getWidth,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/ui/check_box.js
var check_box_default2 = check_box_default;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.js
var LIST_EDIT_DECORATOR = "dxListEditDecorator";
var SWIPE_START_EVENT_NAME = addNamespace(SWIPE_START_EVENT, LIST_EDIT_DECORATOR);
var SWIPE_UPDATE_EVENT_NAME = addNamespace(SWIPE_EVENT, LIST_EDIT_DECORATOR);
var SWIPE_END_EVENT_NAME = addNamespace(SWIPE_END_EVENT, LIST_EDIT_DECORATOR);
var EditDecorator = class {
  constructor(list) {
    this._itemWidthCache = 0;
    this._list = list;
    this._init();
  }
  _shouldHandleSwipe() {
    return false;
  }
  _init() {
  }
  _attachSwipeEvent(config) {
    const swipeConfig = {
      itemSizeFunc: () => {
        if (this._clearSwipeCache) {
          this._itemWidthCache = getWidth(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }
    };
    m_events_engine_default.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, ((e) => {
      this._itemSwipeStartHandler(e);
    }));
    m_events_engine_default.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, ((e) => {
      this._itemSwipeUpdateHandler(e);
    }));
    m_events_engine_default.on(config.$itemElement, SWIPE_END_EVENT_NAME, ((e) => {
      this._itemSwipeEndHandler(e);
    }));
  }
  _itemSwipeStartHandler(e) {
    const $itemElement = renderer_default(e.currentTarget);
    if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement);
  }
  _itemSwipeUpdateHandler(e) {
    const target = e.currentTarget;
    if (target instanceof Element) {
      const $itemElement = renderer_default(target);
      this._swipeUpdateHandler($itemElement, e);
    }
  }
  _itemSwipeEndHandler(e) {
    const target = e.currentTarget;
    if (target instanceof Element) {
      const $itemElement = renderer_default(target);
      this._swipeEndHandler($itemElement, e);
    }
  }
  beforeBag(config) {
  }
  afterBag(config) {
  }
  _commonOptions() {
    const {
      activeStateEnabled,
      hoverStateEnabled,
      focusStateEnabled
    } = this._list.option();
    return {
      activeStateEnabled,
      hoverStateEnabled,
      focusStateEnabled
    };
  }
  modifyElement(config) {
    if (this._shouldHandleSwipe()) {
      this._attachSwipeEvent(config);
      this._clearSwipeCache = true;
    }
  }
  afterRender() {
  }
  handleClick($itemElement, e) {
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
  }
  handleEnterPressing(e) {
  }
  handleContextMenu($itemElement) {
  }
  _swipeStartHandler($element) {
  }
  _swipeUpdateHandler($element, event) {
  }
  _swipeEndHandler($element, event) {
  }
  visibilityChange() {
  }
  getExcludedSelectors() {
  }
  dispose() {
  }
};
var list_edit_decorator_default = EditDecorator;

// node_modules/devextreme/esm/__internal/ui/radio_group/m_radio_button.js
var RadioButton = class extends editor_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      space: function(e) {
        e.preventDefault();
        this._clickAction({
          event: e
        });
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false
    });
  }
  _canValueBeChangedByClick() {
    return true;
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass("dx-radiobutton");
  }
  _initMarkup() {
    super._initMarkup();
    this._renderIcon();
    this._renderCheckedState(this.option("value"));
    this._renderClick();
    this.setAria("role", "radio");
  }
  _renderIcon() {
    this._$icon = renderer_default("<div>").addClass("dx-radiobutton-icon");
    renderer_default("<div>").addClass("dx-radiobutton-icon-dot").appendTo(this._$icon);
    this.$element().append(this._$icon);
  }
  _renderCheckedState(checked) {
    this.$element().toggleClass("dx-radiobutton-checked", checked).find(".dx-radiobutton-icon").toggleClass("dx-radiobutton-icon-checked", checked);
    this.setAria("checked", checked);
  }
  _renderClick() {
    const eventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    this._clickAction = this._createAction(((args) => {
      this._clickHandler(args.event);
    }));
    m_events_engine_default.off(this.$element(), eventName);
    m_events_engine_default.on(this.$element(), eventName, ((e) => {
      var _this$_clickAction;
      null === (_this$_clickAction = this._clickAction) || void 0 === _this$_clickAction || _this$_clickAction.call(this, {
        event: e
      });
    }));
  }
  _clickHandler(e) {
    this._saveValueChangeEvent(e);
    this.option("value", true);
    this._saveValueChangeEvent(void 0);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    if ("value" === name) {
      this._renderCheckedState(value);
      super._optionChanged(args);
    } else {
      super._optionChanged(args);
    }
  }
};
component_registrator_default("dxRadioButton", RadioButton);
var m_radio_button_default = RadioButton;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.selection.js
var SELECT_DECORATOR_ENABLED_CLASS = "dx-list-select-decorator-enabled";
var SELECT_CHECKBOX_CONTAINER_CLASS = "dx-list-select-checkbox-container";
var SELECT_CHECKBOX_CLASS = "dx-list-select-checkbox";
var SELECT_RADIO_BUTTON_CONTAINER_CLASS = "dx-list-select-radiobutton-container";
var SELECT_RADIO_BUTTON_CLASS = "dx-list-select-radiobutton";
var CLICK_EVENT_NAME2 = addNamespace(CLICK_EVENT_NAME, "dxListEditDecorator");
var EditDecoratorSelection = class extends list_edit_decorator_default {
  _init() {
    super._init();
    const {
      selectionMode
    } = this._list.option();
    this._singleStrategy = "single" === selectionMode;
    this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
    this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
    this._controlWidget = this._singleStrategy ? m_radio_button_default : check_box_default2;
    this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
  }
  beforeBag(config) {
    const {
      $itemElement
    } = config;
    const $container = config.$container.addClass(this._containerClass);
    const $control = renderer_default("<div>").addClass(this._controlClass).appendTo($container);
    new this._controlWidget($control.get(0), _extends({}, this._commonOptions(), {
      value: this._isSelected($itemElement.get(0)),
      elementAttr: {
        "aria-label": message_default.format("CheckState")
      },
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onValueChanged: (e) => {
        const {
          value,
          component,
          event
        } = e;
        const isUiClick = !!event;
        if (isUiClick) {
          component._valueChangeEventInstance = void 0;
          component.option("value", !value);
        }
      }
    }));
  }
  modifyElement(config) {
    super.modifyElement(config);
    const {
      $itemElement
    } = config;
    const control = this._controlWidget.getInstance($itemElement.find(`.${this._controlClass}`).get(0));
    m_events_engine_default.on($itemElement, "stateChanged", ((_e, state) => {
      control.option("value", state);
    }));
  }
  _updateSelectAllState() {
    var _this$_selectAllCheck;
    if (!this._$selectAll) {
      return;
    }
    null === (_this$_selectAllCheck = this._selectAllCheckBox) || void 0 === _this$_selectAllCheck || _this$_selectAllCheck.option("value", this._list.isSelectAll());
  }
  afterRender() {
    const {
      selectionMode
    } = this._list.option();
    if ("all" !== selectionMode) {
      return;
    }
    if (!this._$selectAll) {
      this._renderSelectAll();
    } else {
      this._updateSelectAllState();
    }
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    const moveFocusDown = !moveFocusUp;
    const list = this._list;
    const $selectAll = this._$selectAll;
    const lastItemIndex = list._getLastItemIndex();
    const isFocusOutOfList = moveFocusUp && 0 === currentFocusedIndex || moveFocusDown && currentFocusedIndex === lastItemIndex;
    const hasSelectAllItem = !!$selectAll;
    if (hasSelectAllItem && isFocusOutOfList) {
      list.option("focusedElement", getPublicElement($selectAll));
      const {
        focusedElement
      } = list.option();
      if (focusedElement) {
        list.scrollToItem(focusedElement);
      }
      return true;
    }
    return false;
  }
  handleEnterPressing(e) {
    var _this$_$selectAll;
    if (null !== (_this$_$selectAll = this._$selectAll) && void 0 !== _this$_$selectAll && _this$_$selectAll.hasClass("dx-state-focused")) {
      e.target = this._$selectAll.get(0);
      this._selectAllHandler(e);
      return true;
    }
    return false;
  }
  _renderSelectAll() {
    this._$selectAll = renderer_default("<div>").addClass("dx-list-select-all");
    const downArrowHandler = this._list._supportedKeys().downArrow.bind(this._list);
    const selectAllCheckBoxElement = renderer_default("<div>").addClass("dx-list-select-all-checkbox").appendTo(this._$selectAll);
    this._selectAllCheckBox = this._list._createComponent(selectAllCheckBoxElement, check_box_default2, {
      elementAttr: {
        "aria-label": message_default.format("dxList-selectAll")
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler("downArrow", downArrowHandler);
    const {
      selectAllText = ""
    } = this._list.option();
    renderer_default("<div>").addClass("dx-list-select-all-label").text(selectAllText).appendTo(this._$selectAll);
    this._list.itemsContainer().prepend(this._$selectAll);
    this._updateSelectAllState();
    this._updateSelectAllAriaLabel();
    this._attachSelectAllHandler();
  }
  _attachSelectAllHandler() {
    var _this$_selectAllCheck2;
    null === (_this$_selectAllCheck2 = this._selectAllCheckBox) || void 0 === _this$_selectAllCheck2 || _this$_selectAllCheck2.option("onValueChanged", ((e) => {
      const {
        value,
        component,
        event
      } = e;
      const isUiClick = !!event;
      if (isUiClick) {
        component._setOptionWithoutOptionChange("value", !value);
        return;
      }
      this._updateSelectAllAriaLabel();
      this._list._createActionByOption("onSelectAllValueChanged")({
        value
      });
    }));
    m_events_engine_default.off(this._$selectAll, CLICK_EVENT_NAME2);
    m_events_engine_default.on(this._$selectAll, CLICK_EVENT_NAME2, ((e) => {
      this._selectAllHandler(e);
    }));
  }
  _updateSelectAllAriaLabel() {
    var _this$_selectAllCheck3;
    if (!this._$selectAll) {
      return;
    }
    const {
      value
    } = (null === (_this$_selectAllCheck3 = this._selectAllCheckBox) || void 0 === _this$_selectAllCheck3 ? void 0 : _this$_selectAllCheck3.option()) ?? {};
    const indeterminate = void 0 === value;
    const checkedState = value ? "checked" : "notChecked";
    const stateVariableName = indeterminate ? "indeterminate" : checkedState;
    const label = `${message_default.format("dxList-selectAll")}, ${message_default.format(`dxList-selectAll-${stateVariableName}`)}`;
    this._$selectAll.attr({
      "aria-label": label
    });
  }
  _selectAllHandler(event) {
    var _this$_selectAllCheck4;
    event.stopPropagation();
    this._list._saveSelectionChangeEvent(event);
    const {
      value
    } = (null === (_this$_selectAllCheck4 = this._selectAllCheckBox) || void 0 === _this$_selectAllCheck4 ? void 0 : _this$_selectAllCheck4.option()) ?? {};
    const selectionDeferred = value ? this._unselectAllItems() : this._selectAllItems();
    this._list.option("focusedElement", getPublicElement(renderer_default(this._$selectAll)));
    return selectionDeferred;
  }
  _checkSelectAllCapability() {
    const list = this._list;
    const dataController = list._dataController;
    const {
      selectAllMode,
      grouped
    } = list.option();
    if ("allPages" === selectAllMode && grouped && !dataController.group()) {
      ui_errors_default.log("W1010");
      return false;
    }
    return true;
  }
  _selectAllItems() {
    if (!this._checkSelectAllCapability()) {
      return Deferred().resolve();
    }
    const {
      selectAllMode
    } = this._list.option();
    return this._list._selection.selectAll("page" === selectAllMode);
  }
  _unselectAllItems() {
    if (!this._checkSelectAllCapability()) {
      return Deferred().resolve();
    }
    const {
      selectAllMode
    } = this._list.option();
    return this._list._selection.deselectAll("page" === selectAllMode);
  }
  _isSelected(itemElement) {
    return this._list.isItemSelected(itemElement);
  }
  dispose() {
    this._disposeSelectAll();
    this._list.$element().removeClass(SELECT_DECORATOR_ENABLED_CLASS);
    super.dispose();
  }
  _disposeSelectAll() {
    if (this._$selectAll) {
      this._$selectAll.remove();
      this._$selectAll = null;
    }
  }
};
register("selection", "default", EditDecoratorSelection);

export {
  check_box_default2 as check_box_default,
  list_edit_decorator_default
};
//# sourceMappingURL=chunk-PN54BPXD.js.map
