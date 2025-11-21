import {
  DxiDropDownButtonItemModule,
  DxiDropDownButtonToolbarItemModule,
  DxoDropDownButtonAnimationModule,
  DxoDropDownButtonAtModule,
  DxoDropDownButtonBoundaryOffsetModule,
  DxoDropDownButtonCollisionModule,
  DxoDropDownButtonDropDownOptionsModule,
  DxoDropDownButtonFromModule,
  DxoDropDownButtonHideModule,
  DxoDropDownButtonMyModule,
  DxoDropDownButtonOffsetModule,
  DxoDropDownButtonPositionModule,
  DxoDropDownButtonShowModule,
  DxoDropDownButtonToModule
} from "./chunk-2XV3J7YH.js";
import {
  drop_down_button_default
} from "./chunk-5TKES2JQ.js";
import {
  DxiItemModule,
  DxoAnimationModule,
  DxoAtModule,
  DxoBoundaryOffsetModule,
  DxoCollisionModule,
  DxoDropDownOptionsModule,
  DxoFromModule,
  DxoHideModule,
  DxoMyModule,
  DxoOffsetModule,
  DxoPositionModule,
  DxoShowModule,
  DxoToModule
} from "./chunk-VHPDO6NT.js";
import {
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_toolbarItems
} from "./chunk-QTDRYW7W.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  IterableDifferHelper,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-AV5L3IRR.js";
import {
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  TransferState,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-GBBTBBS3.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-drop-down-button.mjs
var DxDropDownButtonComponent = class _DxDropDownButtonComponent extends DxComponent {
  _watcherHelper;
  _idh;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  set _toolbarItemsContentChildren(value) {
    this.setChildren("toolbarItems", value);
  }
  instance = null;
  /**
   * Specifies the shortcut key that sets focus on the UI component.
  
   */
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  /**
   * Specifies whether the UI component changes its visual state as a result of user interaction.
  
   */
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  /**
   * Provides data for the drop-down menu.
  
   */
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  /**
   * Specifies whether to wait until the drop-down menu is opened the first time to render its content. Specifies whether to render the view&apos;s content when it is displayed. If false, the content is rendered immediately.
  
   */
  get deferRendering() {
    return this._getOption("deferRendering");
  }
  set deferRendering(value) {
    this._setOption("deferRendering", value);
  }
  /**
   * Specifies whether the UI component responds to user interaction.
  
   */
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  /**
   * Specifies the data field whose values should be displayed in the drop-down menu.
  
   */
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
  }
  /**
   * Specifies custom content for the drop-down field.
  
   */
  get dropDownContentTemplate() {
    return this._getOption("dropDownContentTemplate");
  }
  set dropDownContentTemplate(value) {
    this._setOption("dropDownContentTemplate", value);
  }
  /**
   * Configures the drop-down field.
  
   */
  get dropDownOptions() {
    return this._getOption("dropDownOptions");
  }
  set dropDownOptions(value) {
    this._setOption("dropDownOptions", value);
  }
  /**
   * Specifies the global attributes to be attached to the UI component&apos;s container element.
  
   */
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  /**
   * Specifies whether users can use keyboard to focus the UI component.
  
   */
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  /**
   * Specifies the UI component&apos;s height.
  
   */
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  /**
   * Specifies text for a hint that appears when a user pauses on the UI component.
  
   */
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  /**
   * Specifies whether the UI component changes its state when a user hovers the mouse pointer over it.
  
   */
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  /**
   * Specifies the button&apos;s icon.
  
   */
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  /**
   * Provides drop-down menu items.
  
   */
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  /**
   * Specifies a custom template for drop-down menu items.
  
   */
  get itemTemplate() {
    return this._getOption("itemTemplate");
  }
  set itemTemplate(value) {
    this._setOption("itemTemplate", value);
  }
  /**
   * Specifies which data field provides keys used to distinguish between the selected drop-down menu items.
  
   */
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  /**
   * Specifies the text or HTML markup displayed in the drop-down menu when it does not contain any items.
  
   */
  get noDataText() {
    return this._getOption("noDataText");
  }
  set noDataText(value) {
    this._setOption("noDataText", value);
  }
  /**
   * Specifies whether the drop-down menu is opened.
  
   */
  get opened() {
    return this._getOption("opened");
  }
  set opened(value) {
    this._setOption("opened", value);
  }
  /**
   * Switches the UI component to a right-to-left representation.
  
   */
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  /**
   * Contains the selected item&apos;s data. Available when useSelectMode is true.
  
   */
  get selectedItem() {
    return this._getOption("selectedItem");
  }
  set selectedItem(value) {
    this._setOption("selectedItem", value);
  }
  /**
   * Contains the selected item&apos;s key and allows you to specify the initially selected item. Applies when useSelectMode is true.
  
   */
  get selectedItemKey() {
    return this._getOption("selectedItemKey");
  }
  set selectedItemKey(value) {
    this._setOption("selectedItemKey", value);
  }
  /**
   * Specifies whether the arrow icon should be displayed.
  
   */
  get showArrowIcon() {
    return this._getOption("showArrowIcon");
  }
  set showArrowIcon(value) {
    this._setOption("showArrowIcon", value);
  }
  /**
   * Specifies whether to split the button in two: one executes an action, the other opens and closes the drop-down menu.
  
   */
  get splitButton() {
    return this._getOption("splitButton");
  }
  set splitButton(value) {
    this._setOption("splitButton", value);
  }
  /**
   * Specifies how the button is styled.
  
   */
  get stylingMode() {
    return this._getOption("stylingMode");
  }
  set stylingMode(value) {
    this._setOption("stylingMode", value);
  }
  /**
   * Specifies the number of the element when the Tab key is used for navigating.
  
   */
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  /**
   * Specifies a custom template for the base button in DropDownButton.
  
   */
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  /**
   * Specifies the button&apos;s text. Applies only if useSelectMode is false.
  
   */
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  /**
   * Specifies the drop-down button type.
  
   */
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  /**
   * Specifies whether the widget uses item&apos;s text a title attribute.
  
   */
  get useItemTextAsTitle() {
    return this._getOption("useItemTextAsTitle");
  }
  set useItemTextAsTitle(value) {
    this._setOption("useItemTextAsTitle", value);
  }
  /**
   * Specifies whether the UI component stores the selected drop-down menu item.
  
   */
  get useSelectMode() {
    return this._getOption("useSelectMode");
  }
  set useSelectMode(value) {
    this._setOption("useSelectMode", value);
  }
  /**
   * Specifies whether the UI component is visible.
  
   */
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  /**
   * Specifies the UI component&apos;s width.
  
   */
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
   * Specifies whether text that exceeds the drop-down list width should be wrapped.
  
   */
  get wrapItemText() {
    return this._getOption("wrapItemText");
  }
  set wrapItemText(value) {
    this._setOption("wrapItemText", value);
  }
  /**
  
   * A function that is executed when the button is clicked or tapped. If splitButton is true, this function is executed for the action button only.
  
  
   */
  onButtonClick;
  /**
  
   * A function that is executed when the UI component is rendered and each time the component is repainted.
  
  
   */
  onContentReady;
  /**
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function used in JavaScript frameworks to save the UI component instance.
  
  
   */
  onInitialized;
  /**
  
   * A function that is executed when a drop-down menu item is clicked.
  
  
   */
  onItemClick;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
  /**
  
   * A function that is executed when an item is selected or selection is canceled. In effect when useSelectMode is true.
  
  
   */
  onSelectionChanged;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  accessKeyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  activeStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  dataSourceChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  deferRenderingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  disabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  displayExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  dropDownContentTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  dropDownOptionsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  elementAttrChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  focusStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  hintChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  hoverStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  iconChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  keyExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  noDataTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  openedChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemKeyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showArrowIconChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  splitButtonChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  stylingModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  tabIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  templateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  textChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  typeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  useItemTextAsTitleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  useSelectModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  wrapItemTextChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, _idh, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._watcherHelper = _watcherHelper;
    this._idh = _idh;
    this._createEventEmitters([{
      subscribe: "buttonClick",
      emit: "onButtonClick"
    }, {
      subscribe: "contentReady",
      emit: "onContentReady"
    }, {
      subscribe: "disposing",
      emit: "onDisposing"
    }, {
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "itemClick",
      emit: "onItemClick"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      subscribe: "selectionChanged",
      emit: "onSelectionChanged"
    }, {
      emit: "accessKeyChange"
    }, {
      emit: "activeStateEnabledChange"
    }, {
      emit: "dataSourceChange"
    }, {
      emit: "deferRenderingChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "displayExprChange"
    }, {
      emit: "dropDownContentTemplateChange"
    }, {
      emit: "dropDownOptionsChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "focusStateEnabledChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "iconChange"
    }, {
      emit: "itemsChange"
    }, {
      emit: "itemTemplateChange"
    }, {
      emit: "keyExprChange"
    }, {
      emit: "noDataTextChange"
    }, {
      emit: "openedChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "selectedItemChange"
    }, {
      emit: "selectedItemKeyChange"
    }, {
      emit: "showArrowIconChange"
    }, {
      emit: "splitButtonChange"
    }, {
      emit: "stylingModeChange"
    }, {
      emit: "tabIndexChange"
    }, {
      emit: "templateChange"
    }, {
      emit: "textChange"
    }, {
      emit: "typeChange"
    }, {
      emit: "useItemTextAsTitleChange"
    }, {
      emit: "useSelectModeChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }, {
      emit: "wrapItemTextChange"
    }]);
    this._idh.setHost(this);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new drop_down_button_default(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  ngOnChanges(changes) {
    super.ngOnChanges(changes);
    this.setupChanges("dataSource", changes);
    this.setupChanges("items", changes);
  }
  setupChanges(prop, changes) {
    if (!(prop in this._optionsToUpdate)) {
      this._idh.setup(prop, changes);
    }
  }
  ngDoCheck() {
    this._idh.doCheck("dataSource");
    this._idh.doCheck("items");
    this._watcherHelper.checkWatchers();
    super.ngDoCheck();
    super.clearChangedOptions();
  }
  _setOption(name, value) {
    let isSetup = this._idh.setupSingle(name, value);
    let isChanged = this._idh.getChanges(name, value) !== null;
    if (isSetup || isChanged) {
      super._setOption(name, value);
    }
  }
  /** @nocollapse */
  static ɵfac = function DxDropDownButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxDropDownButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(IterableDifferHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxDropDownButtonComponent,
    selectors: [["dx-drop-down-button"]],
    contentQueries: function DxDropDownButtonComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_toolbarItems, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._toolbarItemsContentChildren = _t);
      }
    },
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      dataSource: "dataSource",
      deferRendering: "deferRendering",
      disabled: "disabled",
      displayExpr: "displayExpr",
      dropDownContentTemplate: "dropDownContentTemplate",
      dropDownOptions: "dropDownOptions",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      icon: "icon",
      items: "items",
      itemTemplate: "itemTemplate",
      keyExpr: "keyExpr",
      noDataText: "noDataText",
      opened: "opened",
      rtlEnabled: "rtlEnabled",
      selectedItem: "selectedItem",
      selectedItemKey: "selectedItemKey",
      showArrowIcon: "showArrowIcon",
      splitButton: "splitButton",
      stylingMode: "stylingMode",
      tabIndex: "tabIndex",
      template: "template",
      text: "text",
      type: "type",
      useItemTextAsTitle: "useItemTextAsTitle",
      useSelectMode: "useSelectMode",
      visible: "visible",
      width: "width",
      wrapItemText: "wrapItemText"
    },
    outputs: {
      onButtonClick: "onButtonClick",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onItemClick: "onItemClick",
      onOptionChanged: "onOptionChanged",
      onSelectionChanged: "onSelectionChanged",
      accessKeyChange: "accessKeyChange",
      activeStateEnabledChange: "activeStateEnabledChange",
      dataSourceChange: "dataSourceChange",
      deferRenderingChange: "deferRenderingChange",
      disabledChange: "disabledChange",
      displayExprChange: "displayExprChange",
      dropDownContentTemplateChange: "dropDownContentTemplateChange",
      dropDownOptionsChange: "dropDownOptionsChange",
      elementAttrChange: "elementAttrChange",
      focusStateEnabledChange: "focusStateEnabledChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      iconChange: "iconChange",
      itemsChange: "itemsChange",
      itemTemplateChange: "itemTemplateChange",
      keyExprChange: "keyExprChange",
      noDataTextChange: "noDataTextChange",
      openedChange: "openedChange",
      rtlEnabledChange: "rtlEnabledChange",
      selectedItemChange: "selectedItemChange",
      selectedItemKeyChange: "selectedItemKeyChange",
      showArrowIconChange: "showArrowIconChange",
      splitButtonChange: "splitButtonChange",
      stylingModeChange: "stylingModeChange",
      tabIndexChange: "tabIndexChange",
      templateChange: "templateChange",
      textChange: "textChange",
      typeChange: "typeChange",
      useItemTextAsTitleChange: "useItemTextAsTitleChange",
      useSelectModeChange: "useSelectModeChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange",
      wrapItemTextChange: "wrapItemTextChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxDropDownButtonComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxDropDownButtonComponent, [{
    type: Component,
    args: [{
      selector: "dx-drop-down-button",
      standalone: true,
      template: "",
      host: {
        ngSkipHydration: "true"
      },
      imports: [DxIntegrationModule],
      providers: [DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: DxTemplateHost
  }, {
    type: WatcherHelper
  }, {
    type: IterableDifferHelper
  }, {
    type: NestedOptionHost
  }, {
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
    _toolbarItemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_toolbarItems]
    }],
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    deferRendering: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    displayExpr: [{
      type: Input
    }],
    dropDownContentTemplate: [{
      type: Input
    }],
    dropDownOptions: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    noDataText: [{
      type: Input
    }],
    opened: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    selectedItem: [{
      type: Input
    }],
    selectedItemKey: [{
      type: Input
    }],
    showArrowIcon: [{
      type: Input
    }],
    splitButton: [{
      type: Input
    }],
    stylingMode: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    useItemTextAsTitle: [{
      type: Input
    }],
    useSelectMode: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    wrapItemText: [{
      type: Input
    }],
    onButtonClick: [{
      type: Output
    }],
    onContentReady: [{
      type: Output
    }],
    onDisposing: [{
      type: Output
    }],
    onInitialized: [{
      type: Output
    }],
    onItemClick: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    onSelectionChanged: [{
      type: Output
    }],
    accessKeyChange: [{
      type: Output
    }],
    activeStateEnabledChange: [{
      type: Output
    }],
    dataSourceChange: [{
      type: Output
    }],
    deferRenderingChange: [{
      type: Output
    }],
    disabledChange: [{
      type: Output
    }],
    displayExprChange: [{
      type: Output
    }],
    dropDownContentTemplateChange: [{
      type: Output
    }],
    dropDownOptionsChange: [{
      type: Output
    }],
    elementAttrChange: [{
      type: Output
    }],
    focusStateEnabledChange: [{
      type: Output
    }],
    heightChange: [{
      type: Output
    }],
    hintChange: [{
      type: Output
    }],
    hoverStateEnabledChange: [{
      type: Output
    }],
    iconChange: [{
      type: Output
    }],
    itemsChange: [{
      type: Output
    }],
    itemTemplateChange: [{
      type: Output
    }],
    keyExprChange: [{
      type: Output
    }],
    noDataTextChange: [{
      type: Output
    }],
    openedChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    selectedItemChange: [{
      type: Output
    }],
    selectedItemKeyChange: [{
      type: Output
    }],
    showArrowIconChange: [{
      type: Output
    }],
    splitButtonChange: [{
      type: Output
    }],
    stylingModeChange: [{
      type: Output
    }],
    tabIndexChange: [{
      type: Output
    }],
    templateChange: [{
      type: Output
    }],
    textChange: [{
      type: Output
    }],
    typeChange: [{
      type: Output
    }],
    useItemTextAsTitleChange: [{
      type: Output
    }],
    useSelectModeChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }],
    wrapItemTextChange: [{
      type: Output
    }]
  });
})();
var DxDropDownButtonModule = class _DxDropDownButtonModule {
  /** @nocollapse */
  static ɵfac = function DxDropDownButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxDropDownButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxDropDownButtonModule,
    imports: [DxDropDownButtonComponent, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxIntegrationModule, DxTemplateModule],
    exports: [DxDropDownButtonComponent, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxDropDownButtonComponent, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxIntegrationModule, DxTemplateModule, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxDropDownButtonModule, [{
    type: NgModule,
    args: [{
      imports: [DxDropDownButtonComponent, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxIntegrationModule, DxTemplateModule],
      exports: [DxDropDownButtonComponent, DxoDropDownOptionsModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoDropDownButtonAnimationModule, DxoDropDownButtonAtModule, DxoDropDownButtonBoundaryOffsetModule, DxoDropDownButtonCollisionModule, DxoDropDownButtonDropDownOptionsModule, DxoDropDownButtonFromModule, DxoDropDownButtonHideModule, DxiDropDownButtonItemModule, DxoDropDownButtonMyModule, DxoDropDownButtonOffsetModule, DxoDropDownButtonPositionModule, DxoDropDownButtonShowModule, DxoDropDownButtonToModule, DxiDropDownButtonToolbarItemModule, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxDropDownButtonComponent,
  DxDropDownButtonModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-drop-down-button.mjs:
  (*!
   * devextreme-angular
   * Version: 25.1.6
   * Build date: Mon Oct 13 2025
   *
   * Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
   *
   * This software may be modified and distributed under the terms
   * of the MIT license. See the LICENSE file in the root of the project for details.
   *
   * https://github.com/DevExpress/devextreme-angular
   *)
*/
//# sourceMappingURL=chunk-WH7O5XRI.js.map
