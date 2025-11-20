import {
  getElementWidth,
  getSizeValue,
  ui_collection_widget_edit_default
} from "./chunk-EDGMRKGH.js";
import {
  list_edit_search_default
} from "./chunk-DHHSGAOU.js";
import {
  m_popup_default
} from "./chunk-GQ5A5LDB.js";
import {
  BindableTemplate,
  DataSource,
  m_array_store_default,
  normalizeDataSourceOptions
} from "./chunk-EGHIGSYM.js";
import {
  button_default,
  getImageContainer
} from "./chunk-UQXIHJH2.js";
import {
  message_default
} from "./chunk-XULD25K2.js";
import {
  widget_default
} from "./chunk-XX26YRCT.js";
import {
  FunctionTemplate,
  component_registrator_default,
  getPublicElement
} from "./chunk-54SHI7Z2.js";
import {
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  Deferred,
  _extends,
  compileGetter,
  ensureDefined,
  extend,
  guid_default2 as guid_default,
  isDefined,
  isFunction,
  isObject,
  isPlainObject
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/data/data_controller/data_controller.js
var DataController = class {
  constructor(dataSourceOptions, _ref) {
    let {
      key
    } = _ref;
    this._isSharedDataSource = false;
    this._keyExpr = key;
    this.updateDataSource(dataSourceOptions);
  }
  _updateDataSource(dataSourceOptions) {
    if (!dataSourceOptions) {
      return;
    }
    if (dataSourceOptions instanceof DataSource) {
      this._isSharedDataSource = true;
      this._dataSource = dataSourceOptions;
    } else {
      const normalizedDataSourceOptions = normalizeDataSourceOptions(dataSourceOptions);
      this._dataSource = new DataSource(extend(true, {}, {}, normalizedDataSourceOptions));
    }
  }
  _updateDataSourceByItems(items) {
    this._dataSource = new DataSource({
      store: new m_array_store_default({
        key: this.key(),
        data: items
      }),
      pageSize: 0
    });
  }
  _disposeDataSource() {
    if (this._dataSource) {
      if (this._isSharedDataSource) {
        this._isSharedDataSource = false;
      } else {
        this._dataSource.dispose();
      }
      delete this._dataSource;
    }
  }
  load() {
    return this._dataSource.load();
  }
  loadSingle(propName, propValue) {
    if (!this._dataSource) {
      return new Deferred().reject();
    }
    let pName = propName;
    let pValue = propValue;
    if (arguments.length < 2) {
      pValue = propName;
      pName = this.key();
    }
    return this._dataSource.loadSingle(pName, pValue);
  }
  loadFromStore(loadOptions) {
    return this.store().load(loadOptions);
  }
  loadNextPage() {
    this.pageIndex(1 + this.pageIndex());
    return this.load();
  }
  loadOptions() {
    return this._dataSource.loadOptions();
  }
  userData() {
    return this._dataSource._userData;
  }
  cancel(operationId) {
    this._dataSource.cancel(operationId);
  }
  cancelAll() {
    this._dataSource.cancelAll();
  }
  filter(filter) {
    return this._dataSource.filter(filter);
  }
  addSearchFilter(storeLoadOptions) {
    this._dataSource._addSearchFilter(storeLoadOptions);
  }
  group(group) {
    return this._dataSource.group(group);
  }
  paginate() {
    return this._dataSource.paginate();
  }
  pageSize() {
    return this._dataSource._pageSize;
  }
  pageIndex(pageIndex) {
    if (void 0 === pageIndex) {
      return this._dataSource.pageIndex(void 0);
    }
    return this._dataSource.pageIndex(pageIndex);
  }
  resetDataSource() {
    this._disposeDataSource();
  }
  resetDataSourcePageIndex() {
    if (this.pageIndex()) {
      this.pageIndex(0);
      this.load();
    }
  }
  updateDataSource(items, key) {
    const dataSourceOptions = items ?? this.items();
    if (key) {
      this._keyExpr = key;
    }
    this._disposeDataSource();
    if (Array.isArray(dataSourceOptions)) {
      this._updateDataSourceByItems(dataSourceOptions);
    } else {
      this._updateDataSource(dataSourceOptions);
    }
  }
  totalCount() {
    return this._dataSource.totalCount();
  }
  isLastPage() {
    return this._dataSource.isLastPage() || !this._dataSource._pageSize;
  }
  isLoading() {
    return this._dataSource.isLoading();
  }
  isLoaded() {
    return this._dataSource.isLoaded();
  }
  searchValue(value) {
    return this._dataSource.searchValue(value);
  }
  searchOperation(operation) {
    return this._dataSource.searchOperation(operation);
  }
  searchExpr(expr) {
    return this._dataSource.searchExpr(expr);
  }
  select() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this._dataSource.select(args);
  }
  key() {
    var _this$_dataSource;
    const storeKey = null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.key();
    return isDefined(storeKey) && "this" === this._keyExpr ? storeKey : this._keyExpr;
  }
  keyOf(item) {
    return this.store().keyOf(item);
  }
  store() {
    return this._dataSource.store();
  }
  items() {
    var _this$_dataSource2;
    return null === (_this$_dataSource2 = this._dataSource) || void 0 === _this$_dataSource2 ? void 0 : _this$_dataSource2.items();
  }
  applyMapFunction(data) {
    return this._dataSource._applyMapFunction(data);
  }
  getDataSource() {
    return this._dataSource ?? null;
  }
  reload() {
    return this._dataSource.reload();
  }
  on(event, handler) {
    this._dataSource.on(event, handler);
  }
  off(event, handler) {
    this._dataSource.off(event, handler);
  }
};
var data_controller_default = DataController;

// node_modules/devextreme/esm/data_controller.js
var data_controller_default2 = data_controller_default;

// node_modules/devextreme/esm/__internal/ui/button_group.js
var BUTTON_GROUP_ITEM_HAS_WIDTH = "dx-buttongroup-item-has-width";
var BUTTON_GROUP_STYLING_MODE_CLASS = {
  contained: "dx-buttongroup-mode-contained",
  outlined: "dx-buttongroup-mode-outlined",
  text: "dx-buttongroup-mode-text"
};
var ButtonCollection = class extends ui_collection_widget_edit_default {
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate((($container, data, model) => {
        this._prepareItemStyles($container);
        const {
          buttonTemplate
        } = this.option();
        this._createComponent($container, button_default, extend({}, model, data, this._getBasicButtonOptions(), {
          _templateData: this._hasCustomTemplate(buttonTemplate) ? model : {},
          template: model.template || buttonTemplate
        }));
      }), ["text", "type", "icon", "disabled", "visible", "hint"], this.option("integrationOptions.watchMethod"))
    });
  }
  _getBasicButtonOptions() {
    const {
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    } = this.option();
    return {
      focusStateEnabled: false,
      onClick: null,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    };
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTemplateProperty: null
    });
  }
  _hasCustomTemplate(template) {
    return isFunction(template) || this.option("integrationOptions.templates")[template];
  }
  _selectedItemClass() {
    return "dx-item-selected dx-state-selected";
  }
  _prepareItemStyles($item) {
    const itemIndex = $item.data("dxItemIndex");
    if (0 === itemIndex) {
      $item.addClass("dx-buttongroup-first-item");
    }
    const {
      items
    } = this.option();
    if (items && itemIndex === items.length - 1) {
      $item.addClass("dx-buttongroup-last-item");
    }
    $item.addClass("dx-shape-standard");
  }
  _renderItemContent(args) {
    args.container = renderer_default(args.container).parent();
    return super._renderItemContent(args);
  }
  _setAriaSelectionAttribute($target, value) {
    this.setAria("pressed", value, $target);
  }
  _renderItemContentByNode(args, $node) {
    args.container = renderer_default(args.container).children().first();
    return super._renderItemContentByNode(args, $node);
  }
  _focusTarget() {
    return this.$element().parent();
  }
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  }
  _enterKeyHandler(e) {
    e.preventDefault();
    super._enterKeyHandler(e);
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _itemClass() {
    return "dx-buttongroup-item";
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    if ("single" === selectionMode && this.isItemSelected(e.currentTarget)) {
      return;
    }
    super._itemSelectHandler(e);
  }
};
var ButtonGroup = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      focusStateEnabled: true,
      selectionMode: "single",
      selectedItems: [],
      selectedItemKeys: [],
      stylingMode: "contained",
      keyExpr: "text",
      items: [],
      buttonTemplate: "content",
      onSelectionChanged: null,
      onItemClick: null
    });
  }
  _init() {
    super._init();
    this._createItemClickAction();
  }
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption("onItemClick");
  }
  _initMarkup() {
    this.setAria("role", "group");
    this.$element().addClass("dx-buttongroup");
    this._renderStylingMode();
    this._renderButtons();
    this._syncSelectionOptions();
    super._initMarkup();
  }
  _renderStylingMode() {
    const {
      stylingMode
    } = this.option();
    for (const key in BUTTON_GROUP_STYLING_MODE_CLASS) {
      this.$element().removeClass(BUTTON_GROUP_STYLING_MODE_CLASS[key]);
    }
    this.$element().addClass(BUTTON_GROUP_STYLING_MODE_CLASS[stylingMode ?? "contained"]);
  }
  _fireSelectionChangeEvent(addedItems, removedItems) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })({
      addedItems,
      removedItems
    });
  }
  _renderButtons() {
    const $buttons = renderer_default("<div>").addClass("dx-buttongroup-wrapper").appendTo(this.$element());
    const {
      selectedItems,
      selectionMode,
      items,
      keyExpr,
      buttonTemplate,
      selectedItemKeys,
      focusStateEnabled,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode,
      accessKey,
      tabIndex
    } = this.option();
    const options = {
      selectionMode,
      items,
      keyExpr,
      buttonTemplate,
      selectedItemKeys,
      focusStateEnabled,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode,
      accessKey,
      tabIndex,
      noDataText: "",
      selectionRequired: false,
      onItemRendered: (e) => {
        const {
          width
        } = this.option();
        if (isDefined(width)) {
          renderer_default(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
        }
      },
      onSelectionChanged: (e) => {
        this._syncSelectionOptions();
        this._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      },
      onItemClick: (e) => {
        this._itemClickAction(e);
      }
    };
    if (isDefined(selectedItems) && selectedItems.length) {
      options.selectedItems = selectedItems;
    }
    this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options);
  }
  _syncSelectionOptions() {
    this._setOptionWithoutOptionChange("selectedItems", this._buttonsCollection.option("selectedItems"));
    this._setOptionWithoutOptionChange("selectedItemKeys", this._buttonsCollection.option("selectedItemKeys"));
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "stylingMode":
      case "selectionMode":
      case "keyExpr":
      case "buttonTemplate":
      case "items":
      case "activeStateEnabled":
      case "focusStateEnabled":
      case "hoverStateEnabled":
      case "tabIndex":
        this._invalidate();
        break;
      case "selectedItemKeys":
      case "selectedItems":
        this._buttonsCollection.option(name, value);
        break;
      case "onItemClick":
        this._createItemClickAction();
        break;
      case "onSelectionChanged":
        break;
      case "width":
        super._optionChanged(args);
        this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!value);
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxButtonGroup", ButtonGroup);
var button_group_default = ButtonGroup;

// node_modules/devextreme/esm/ui/button_group.js
var button_group_default2 = button_group_default;

// node_modules/devextreme/esm/__internal/ui/m_drop_down_button.js
var DROP_DOWN_BUTTON_CONTENT = "dx-dropdownbutton-content";
var DropDownButton = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTemplate: "item",
      keyExpr: "this",
      selectedItem: null,
      selectedItemKey: null,
      stylingMode: "outlined",
      deferRendering: true,
      noDataText: message_default.format("dxCollectionWidget-noDataText"),
      useSelectMode: false,
      splitButton: false,
      showArrowIcon: true,
      template: null,
      text: "",
      type: "normal",
      onButtonClick: null,
      onSelectionChanged: null,
      onItemClick: null,
      opened: false,
      items: null,
      dataSource: null,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      dropDownOptions: {},
      dropDownContentTemplate: "content",
      wrapItemText: false,
      useItemTextAsTitle: true,
      grouped: false,
      groupTemplate: "group",
      buttonGroupOptions: {}
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      selectedItem: true
    });
  }
  _init() {
    super._init();
    this._createItemClickAction();
    this._createActionClickAction();
    this._createSelectionChangedAction();
    this._initDataController();
    this._compileKeyGetter();
    this._compileDisplayGetter();
    this._options.cache("buttonGroupOptions", this.option("buttonGroupOptions"));
    this._options.cache("dropDownOptions", this.option("dropDownOptions"));
  }
  _initDataController() {
    const dataSource = this.option("dataSource");
    this._dataController = new data_controller_default2(dataSource ?? this.option("items"), {
      key: this.option("keyExpr")
    });
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new FunctionTemplate(((options) => {
        const $popupContent = renderer_default(options.container);
        const $listContainer = renderer_default("<div>").appendTo($popupContent);
        this._list = this._createComponent($listContainer, list_edit_search_default, this._listOptions());
        this._list.registerKeyHandler("escape", this._escHandler.bind(this));
        this._list.registerKeyHandler("tab", this._escHandler.bind(this));
        this._list.registerKeyHandler("leftArrow", this._escHandler.bind(this));
        this._list.registerKeyHandler("rightArrow", this._escHandler.bind(this));
      }))
    });
    super._initTemplates();
  }
  _compileKeyGetter() {
    this._keyGetter = compileGetter(this._dataController.key());
  }
  _compileDisplayGetter() {
    const {
      displayExpr
    } = this.option();
    this._displayGetter = compileGetter(displayExpr);
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass("dx-dropdownbutton");
    this._renderButtonGroup();
    this._updateArrowClass();
    if (isDefined(this.option("selectedItemKey"))) {
      this._loadSelectedItem().done(this._updateActionButton.bind(this));
    }
  }
  _renderFocusTarget() {
  }
  _render() {
    if (!this.option("deferRendering") || this.option("opened")) {
      this._renderPopup();
    }
    super._render();
  }
  _renderContentImpl() {
    if (this._popup) {
      this._renderPopupContent();
    }
    return super._renderContentImpl();
  }
  _loadSelectedItem() {
    var _this$_loadSingleDefe;
    null === (_this$_loadSingleDefe = this._loadSingleDeferred) || void 0 === _this$_loadSingleDefe || _this$_loadSingleDefe.reject();
    const d = Deferred();
    if (this._list && void 0 !== this._lastSelectedItemData) {
      const cachedResult = this.option("useSelectMode") ? this._list.option("selectedItem") : this._lastSelectedItemData;
      return d.resolve(cachedResult);
    }
    this._lastSelectedItemData = void 0;
    const selectedItemKey = this.option("selectedItemKey");
    this._dataController.loadSingle(selectedItemKey).done(d.resolve).fail((() => {
      d.reject(null);
    }));
    this._loadSingleDeferred = d;
    return d.promise();
  }
  _createActionClickAction() {
    this._actionClickAction = this._createActionByOption("onButtonClick");
  }
  _createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged");
  }
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption("onItemClick");
  }
  _fireSelectionChangedAction(_ref) {
    let {
      previousValue,
      value
    } = _ref;
    this._selectionChangedAction({
      item: value,
      previousItem: previousValue
    });
  }
  _fireItemClickAction(_ref2) {
    let {
      event,
      itemElement,
      itemData
    } = _ref2;
    return this._itemClickAction({
      event,
      itemElement,
      itemData: this._actionItem || itemData
    });
  }
  _getButtonTemplate() {
    const {
      template,
      splitButton,
      showArrowIcon
    } = this.option();
    if (template) {
      return template;
    }
    return splitButton || !showArrowIcon ? "content" : (_ref3, buttonContent) => {
      let {
        text,
        icon
      } = _ref3;
      const $firstIcon = getImageContainer(icon);
      const $textContainer = text ? renderer_default("<span>").text(text).addClass("dx-button-text") : void 0;
      const $secondIcon = getImageContainer("spindown").addClass("dx-icon-right");
      renderer_default(buttonContent).append($firstIcon, $textContainer, $secondIcon);
    };
  }
  _getActionButtonConfig() {
    const {
      icon,
      text,
      type,
      splitButton
    } = this.option();
    const actionButtonConfig = {
      text,
      icon,
      type,
      template: this._getButtonTemplate(),
      elementAttr: {
        class: "dx-dropdownbutton-action"
      }
    };
    if (splitButton) {
      actionButtonConfig.elementAttr.role = "menuitem";
    }
    return actionButtonConfig;
  }
  _getSpinButtonConfig() {
    const {
      type
    } = this.option();
    const config = {
      type,
      icon: "spindown",
      elementAttr: {
        class: "dx-dropdownbutton-toggle",
        role: "menuitem"
      }
    };
    return config;
  }
  _getButtonGroupItems() {
    const {
      splitButton
    } = this.option();
    const items = [this._getActionButtonConfig()];
    if (splitButton) {
      items.push(this._getSpinButtonConfig());
    }
    return items;
  }
  _buttonGroupItemClick(_ref4) {
    let {
      event,
      itemData
    } = _ref4;
    const isActionButton = "dx-dropdownbutton-action" === itemData.elementAttr.class;
    const isToggleButton = "dx-dropdownbutton-toggle" === itemData.elementAttr.class;
    if (isToggleButton) {
      this.toggle();
    } else if (isActionButton) {
      this._actionClickAction({
        event,
        selectedItem: this.option("selectedItem")
      });
      if (!this.option("splitButton")) {
        this.toggle();
      }
    }
  }
  _getButtonGroupOptions() {
    const {
      accessKey,
      focusStateEnabled,
      hoverStateEnabled,
      splitButton,
      stylingMode,
      tabIndex
    } = this.option();
    const buttonGroupOptions = _extends({
      items: this._getButtonGroupItems(),
      width: "100%",
      height: "100%",
      selectionMode: "none",
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode,
      accessKey,
      tabIndex,
      elementAttr: {
        role: splitButton ? "menu" : "group"
      },
      onItemClick: this._buttonGroupItemClick.bind(this),
      onKeyboardHandled: (e) => this._keyboardHandler(e)
    }, this._options.cache("buttonGroupOptions"));
    return buttonGroupOptions;
  }
  _renderPopupContent() {
    const $content = this._popup.$content();
    const template = this._getTemplateByOption("dropDownContentTemplate");
    $content.empty();
    this._popupContentId = `dx-${new guid_default()}`;
    this.setAria("id", this._popupContentId, $content);
    const result = template.render({
      container: getPublicElement($content),
      model: this.option("items") || this._dataController.getDataSource()
    });
    return result;
  }
  _popupOptions() {
    const horizontalAlignment = this.option("rtlEnabled") ? "right" : "left";
    return extend({
      dragEnabled: false,
      focusStateEnabled: false,
      deferRendering: this.option("deferRendering"),
      hideOnOutsideClick: (e) => {
        const $element = this.$element();
        const $buttonClicked = renderer_default(e.target).closest(".dx-dropdownbutton");
        return !$buttonClicked.is($element);
      },
      showTitle: false,
      animation: {
        show: {
          type: "fade",
          duration: 0,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 400,
          from: 1,
          to: 0
        }
      },
      _ignoreFunctionValueDeprecation: true,
      width: () => getElementWidth(this.$element()),
      height: "auto",
      shading: false,
      position: {
        of: this.$element(),
        collision: "flipfit",
        my: `${horizontalAlignment} top`,
        at: `${horizontalAlignment} bottom`
      },
      _wrapperClassExternal: "dx-dropdowneditor-overlay",
      contentTemplate: null
    }, this._options.cache("dropDownOptions"), {
      visible: this.option("opened")
    });
  }
  _listOptions() {
    const {
      wrapItemText,
      focusStateEnabled,
      hoverStateEnabled,
      useItemTextAsTitle,
      grouped,
      groupTemplate,
      noDataText,
      displayExpr,
      itemTemplate,
      items,
      selectedItemKey,
      useSelectMode
    } = this.option();
    return {
      selectionMode: useSelectMode ? "single" : "none",
      wrapItemText,
      focusStateEnabled,
      hoverStateEnabled,
      useItemTextAsTitle,
      onContentReady: () => this._fireContentReadyAction(),
      selectedItemKeys: isDefined(selectedItemKey) && useSelectMode ? [selectedItemKey] : [],
      grouped,
      groupTemplate,
      keyExpr: this._dataController.key(),
      noDataText,
      displayExpr,
      itemTemplate,
      items,
      dataSource: this._dataController.getDataSource(),
      onItemClick: (e) => {
        if (!this.option("useSelectMode")) {
          this._lastSelectedItemData = e.itemData;
        }
        this.option("selectedItemKey", this._keyGetter(e.itemData));
        const actionResult = this._fireItemClickAction(e);
        if (false !== actionResult) {
          this.toggle(false);
          this._buttonGroup.focus();
        }
      }
    };
  }
  _upDownKeyHandler() {
    var _this$_popup;
    if (null !== (_this$_popup = this._popup) && void 0 !== _this$_popup && _this$_popup.option("visible") && this._list) {
      this._list.focus();
    } else {
      this.open();
    }
    return true;
  }
  _escHandler() {
    this.close();
    this._buttonGroup.focus();
    return true;
  }
  _tabHandler() {
    this.close();
    return true;
  }
  _renderPopup() {
    const $popup = renderer_default("<div>");
    this.$element().append($popup);
    this._popup = this._createComponent($popup, m_popup_default, this._popupOptions());
    this._popup.$content().addClass(DROP_DOWN_BUTTON_CONTENT);
    this._popup.$wrapper().addClass("dx-dropdownbutton-popup-wrapper");
    this._popup.$overlayContent().attr("aria-label", "Dropdown");
    this._popup.on("hiding", this._popupHidingHandler.bind(this));
    this._popup.on("showing", this._popupShowingHandler.bind(this));
    this._bindInnerWidgetOptions(this._popup, "dropDownOptions");
  }
  _popupHidingHandler() {
    this.option("opened", false);
    this._updateAriaAttributes(false);
  }
  _popupOptionChanged(args) {
    const options = widget_default.getOptionsFromContainer(args);
    this._setPopupOption(options);
    const optionsKeys = Object.keys(options);
    if (optionsKeys.includes("width") || optionsKeys.includes("height")) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    const popupWidth = getSizeValue(this.option("dropDownOptions.width"));
    if (void 0 === popupWidth) {
      this._setPopupOption("width", (() => getElementWidth(this.$element())));
    }
  }
  _setPopupOption(optionName, value) {
    this._setWidgetOption("_popup", arguments);
  }
  _popupShowingHandler() {
    this.option("opened", true);
    this._updateAriaAttributes(true);
  }
  _setElementAria(value) {
    const elementAria = {
      owns: value ? this._popupContentId : void 0
    };
    this.setAria(elementAria, this.$element());
  }
  _setButtonsAria(value) {
    const commonButtonAria = {
      expanded: value,
      haspopup: "listbox"
    };
    const firstButtonAria = {};
    if (!this.option("text")) {
      firstButtonAria.label = "dropdownbutton";
    }
    this._getButtons().each(((index, $button) => {
      if (0 === index) {
        this.setAria(_extends({}, firstButtonAria, commonButtonAria), renderer_default($button));
      } else {
        this.setAria(commonButtonAria, renderer_default($button));
      }
    }));
  }
  _updateAriaAttributes(value) {
    this._setElementAria(value);
    this._setButtonsAria(value);
  }
  _getButtons() {
    return this._buttonGroup.$element().find(".dx-button");
  }
  _renderButtonGroup() {
    var _this$_buttonGroup;
    const $buttonGroup = (null === (_this$_buttonGroup = this._buttonGroup) || void 0 === _this$_buttonGroup ? void 0 : _this$_buttonGroup.$element()) || renderer_default("<div>");
    if (!this._buttonGroup) {
      this.$element().append($buttonGroup);
    }
    this._buttonGroup = this._createComponent($buttonGroup, button_group_default2, this._getButtonGroupOptions());
    this._buttonGroup.registerKeyHandler("downArrow", this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler("tab", this._tabHandler.bind(this));
    this._buttonGroup.registerKeyHandler("upArrow", this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler("escape", this._escHandler.bind(this));
    this._bindInnerWidgetOptions(this._buttonGroup, "buttonGroupOptions");
    this._updateAriaAttributes(this.option("opened"));
  }
  _updateArrowClass() {
    const hasArrow = this.option("splitButton") || this.option("showArrowIcon");
    this.$element().toggleClass("dx-dropdownbutton-has-arrow", hasArrow);
  }
  toggle(visible) {
    var _this$_popup2;
    if (!this._popup) {
      this._renderPopup();
      this._renderContent();
    }
    return null === (_this$_popup2 = this._popup) || void 0 === _this$_popup2 ? void 0 : _this$_popup2.toggle(visible);
  }
  open() {
    return this.toggle(true);
  }
  close() {
    return this.toggle(false);
  }
  _setListOption(name, value) {
    var _this$_list;
    null === (_this$_list = this._list) || void 0 === _this$_list || _this$_list.option(name, value);
  }
  _getDisplayValue(item) {
    const isPrimitiveItem = !isObject(item);
    const displayValue = isPrimitiveItem ? item : this._displayGetter(item);
    return !isObject(displayValue) ? String(ensureDefined(displayValue, "")) : "";
  }
  _updateActionButton(selectedItem) {
    if (this.option("useSelectMode")) {
      this.option({
        text: this._getDisplayValue(selectedItem),
        icon: isPlainObject(selectedItem) ? selectedItem.icon : void 0
      });
    }
    this._setOptionWithoutOptionChange("selectedItem", selectedItem);
    this._setOptionWithoutOptionChange("selectedItemKey", this._keyGetter(selectedItem));
  }
  _clean() {
    var _this$_list2, _this$_popup3;
    null === (_this$_list2 = this._list) || void 0 === _this$_list2 || _this$_list2.$element().remove();
    null === (_this$_popup3 = this._popup) || void 0 === _this$_popup3 || _this$_popup3.$element().remove();
  }
  _selectedItemKeyChanged(value) {
    this._setListOption("selectedItemKeys", this.option("useSelectMode") && isDefined(value) ? [value] : []);
    const previousItem = this.option("selectedItem");
    this._loadSelectedItem().always(((selectedItem) => {
      this._updateActionButton(selectedItem);
      if (this._displayGetter(previousItem) !== this._displayGetter(selectedItem)) {
        this._fireSelectionChangedAction({
          previousValue: previousItem,
          value: selectedItem
        });
      }
    }));
  }
  _updateButtonGroup(name, value) {
    this._buttonGroup.option(name, value);
    this._updateAriaAttributes(this.option("opened"));
  }
  _actionButtonOptionChanged(_ref5) {
    let {
      name,
      value
    } = _ref5;
    const newConfig = {};
    newConfig[name] = value;
    this._updateButtonGroup("items[0]", extend({}, this._getActionButtonConfig(), newConfig));
    this._popup && this._popup.repaint();
  }
  _selectModeChanged(value) {
    if (value) {
      this._setListOption("selectionMode", "single");
      const selectedItemKey = this.option("selectedItemKey");
      this._setListOption("selectedItemKeys", isDefined(selectedItemKey) ? [selectedItemKey] : []);
      this._selectedItemKeyChanged(this.option("selectedItemKey"));
    } else {
      this._setListOption("selectionMode", "none");
      this.option({
        selectedItemKey: void 0,
        selectedItem: void 0
      });
      this._actionButtonOptionChanged({
        text: this.option("text")
      });
    }
  }
  _updateItemCollection(optionName) {
    const selectedItemKey = this.option("selectedItemKey");
    this._setListOption("selectedItem", null);
    this._setWidgetOption("_list", [optionName]);
    if (isDefined(selectedItemKey)) {
      this._loadSelectedItem().done(((selectedItem) => {
        this._setListOption("selectedItemKeys", [selectedItemKey]);
        this._setListOption("selectedItem", selectedItem);
      })).fail(((error) => {
        this._setListOption("selectedItemKeys", []);
      })).always(this._updateActionButton.bind(this));
    }
  }
  _updateDataController(items) {
    this._dataController.updateDataSource(items, this.option("keyExpr"));
    this._updateKeyExpr();
  }
  _updateKeyExpr() {
    this._compileKeyGetter();
    this._setListOption("keyExpr", this._dataController.key());
  }
  focus() {
    this._buttonGroup.focus();
  }
  _optionChanged(args) {
    var _this$_popup4;
    const {
      name,
      value
    } = args;
    switch (name) {
      case "useSelectMode":
        this._selectModeChanged(value);
        break;
      case "splitButton":
        this._updateArrowClass();
        this._renderButtonGroup();
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._setListOption(name, value);
        this._updateActionButton(this.option("selectedItem"));
        break;
      case "keyExpr":
        this._updateDataController();
        break;
      case "buttonGroupOptions":
        this._innerWidgetOptionChanged(this._buttonGroup, args);
        break;
      case "dropDownOptions":
        if ("dropDownOptions.visible" === args.fullName) {
          break;
        }
        if (void 0 !== args.value.visible) {
          delete args.value.visible;
        }
        this._popupOptionChanged(args);
        this._innerWidgetOptionChanged(this._popup, args);
        break;
      case "opened":
        this.toggle(value);
        break;
      case "focusStateEnabled":
      case "hoverStateEnabled":
        this._setListOption(name, value);
        this._updateButtonGroup(name, value);
        super._optionChanged(args);
        break;
      case "items":
        this._updateDataController(this.option("items"));
        this._updateItemCollection(name);
        break;
      case "dataSource":
        this._dataController.updateDataSource(value);
        this._updateKeyExpr();
        this._updateItemCollection(name);
        break;
      case "icon":
      case "text":
        this._actionButtonOptionChanged(args);
        break;
      case "showArrowIcon":
        this._updateArrowClass();
        this._renderButtonGroup();
        this._popup && this._popup.repaint();
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        null === (_this$_popup4 = this._popup) || void 0 === _this$_popup4 || _this$_popup4.repaint();
        break;
      case "stylingMode":
      case "tabIndex":
        this._updateButtonGroup(name, value);
        break;
      case "type":
        this._updateButtonGroup("items", this._getButtonGroupItems());
        break;
      case "itemTemplate":
      case "grouped":
      case "noDataText":
      case "groupTemplate":
      case "wrapItemText":
      case "useItemTextAsTitle":
        this._setListOption(name, value);
        break;
      case "dropDownContentTemplate":
        this._renderContent();
        break;
      case "selectedItemKey":
        this._selectedItemKeyChanged(value);
        break;
      case "selectedItem":
        break;
      case "onItemClick":
        this._createItemClickAction();
        break;
      case "onButtonClick":
        this._createActionClickAction();
        break;
      case "onSelectionChanged":
        this._createSelectionChangedAction();
        break;
      case "deferRendering": {
        const {
          opened
        } = this.option();
        this.toggle(opened);
        break;
      }
      case "template":
        this._renderButtonGroup();
        break;
      default:
        super._optionChanged(args);
    }
  }
  getDataSource() {
    return this._dataController.getDataSource();
  }
};
component_registrator_default("dxDropDownButton", DropDownButton);
var m_drop_down_button_default = DropDownButton;

// node_modules/devextreme/esm/ui/drop_down_button.js
var drop_down_button_default = m_drop_down_button_default;

export {
  button_group_default2 as button_group_default,
  drop_down_button_default
};
//# sourceMappingURL=chunk-BRRWI45W.js.map
