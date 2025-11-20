import {
  DxiContextMenuItemModule,
  DxoContextMenuAnimationModule,
  DxoContextMenuAtModule,
  DxoContextMenuBoundaryOffsetModule,
  DxoContextMenuCollisionModule,
  DxoContextMenuDelayModule,
  DxoContextMenuFromModule,
  DxoContextMenuHideModule,
  DxoContextMenuMyModule,
  DxoContextMenuOffsetModule,
  DxoContextMenuPositionModule,
  DxoContextMenuShowEventModule,
  DxoContextMenuShowModule,
  DxoContextMenuShowSubmenuModeModule,
  DxoContextMenuToModule
} from "./chunk-3MBTYKF3.js";
import {
  context_menu_default2 as context_menu_default
} from "./chunk-PDY33GM5.js";
import {
  DxiItemModule,
  DxoAnimationModule,
  DxoAtModule,
  DxoBoundaryOffsetModule,
  DxoCollisionModule,
  DxoDelayModule,
  DxoFromModule,
  DxoHideModule,
  DxoMyModule,
  DxoOffsetModule,
  DxoPositionModule,
  DxoShowEventModule,
  DxoShowModule,
  DxoShowSubmenuModeModule,
  DxoToModule
} from "./chunk-PRGABLET.js";
import {
  PROPERTY_TOKEN_items
} from "./chunk-QTDRYW7W.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  IterableDifferHelper,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-N6JIRJK4.js";
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-context-menu.mjs
var DxContextMenuComponent = class _DxContextMenuComponent extends DxComponent {
  _watcherHelper;
  _idh;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
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
   * Configures UI component visibility animations. This object contains two fields: show and hide.
  
   */
  get animation() {
    return this._getOption("animation");
  }
  set animation(value) {
    this._setOption("animation", value);
  }
  /**
   * Specifies the name of the CSS class to be applied to the root menu level and all submenus.
  
   */
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  /**
   * Binds the UI component to data.
  
   */
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
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
   * Specifies the name of the data source item field whose value defines whether or not the corresponding UI component item is disabled.
  
   */
  get disabledExpr() {
    return this._getOption("disabledExpr");
  }
  set disabledExpr(value) {
    this._setOption("disabledExpr", value);
  }
  /**
   * Specifies the data field whose values should be displayed.
  
   */
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
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
   * Specifies whether the UI component can be focused using keyboard navigation.
  
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
   * Specifies whether to hide the UI component if a user clicks outside it.
  
   */
  get hideOnOutsideClick() {
    return this._getOption("hideOnOutsideClick");
  }
  set hideOnOutsideClick(value) {
    this._setOption("hideOnOutsideClick", value);
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
   * Specifies whether the UI component changes its state when a user pauses on it.
  
   */
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  /**
   * Holds an array of menu items.
  
   */
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  /**
   * Specifies which data field contains nested items.
  
   */
  get itemsExpr() {
    return this._getOption("itemsExpr");
  }
  set itemsExpr(value) {
    this._setOption("itemsExpr", value);
  }
  /**
   * Specifies a custom template for items.
  
   */
  get itemTemplate() {
    return this._getOption("itemTemplate");
  }
  set itemTemplate(value) {
    this._setOption("itemTemplate", value);
  }
  /**
   * An object defining UI component positioning properties.
  
   */
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
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
   * Specifies whether an item is selected if a user clicks it.
  
   */
  get selectByClick() {
    return this._getOption("selectByClick");
  }
  set selectByClick(value) {
    this._setOption("selectByClick", value);
  }
  /**
   * Specifies the name of the data source item field whose value defines whether or not the corresponding UI component items is selected.
  
   */
  get selectedExpr() {
    return this._getOption("selectedExpr");
  }
  set selectedExpr(value) {
    this._setOption("selectedExpr", value);
  }
  /**
   * The selected item object.
  
   */
  get selectedItem() {
    return this._getOption("selectedItem");
  }
  set selectedItem(value) {
    this._setOption("selectedItem", value);
  }
  /**
   * Specifies the selection mode supported by the menu.
  
   */
  get selectionMode() {
    return this._getOption("selectionMode");
  }
  set selectionMode(value) {
    this._setOption("selectionMode", value);
  }
  /**
   * Specifies properties used to display the UI component.
  
   */
  get showEvent() {
    return this._getOption("showEvent");
  }
  set showEvent(value) {
    this._setOption("showEvent", value);
  }
  /**
   * Specifies properties of submenu showing and hiding.
  
   */
  get showSubmenuMode() {
    return this._getOption("showSubmenuMode");
  }
  set showSubmenuMode(value) {
    this._setOption("showSubmenuMode", value);
  }
  /**
   * Specifies the direction at which submenus are displayed.
  
   */
  get submenuDirection() {
    return this._getOption("submenuDirection");
  }
  set submenuDirection(value) {
    this._setOption("submenuDirection", value);
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
   * The target element associated with the context menu.
  
   */
  get target() {
    return this._getOption("target");
  }
  set target(value) {
    this._setOption("target", value);
  }
  /**
   * A Boolean value specifying whether or not the UI component is visible.
  
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
  
   * A function that is executed when the UI component is rendered and each time the component is repainted.
  
  
   */
  onContentReady;
  /**
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function that is executed after the ContextMenu is hidden.
  
  
   */
  onHidden;
  /**
  
   * A function that is executed before the ContextMenu is hidden.
  
  
   */
  onHiding;
  /**
  
   * A function used in JavaScript frameworks to save the UI component instance.
  
  
   */
  onInitialized;
  /**
  
   * A function that is executed when a collection item is clicked or tapped.
  
  
   */
  onItemClick;
  /**
  
   * A function that is executed when a collection item is right-clicked or pressed.
  
  
   */
  onItemContextMenu;
  /**
  
   * A function that is executed after a collection item is rendered.
  
  
   */
  onItemRendered;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
  /**
  
   * A function that is executed before the ContextMenu is positioned.
  
  
   */
  onPositioning;
  /**
  
   * A function that is executed when a collection item is selected or selection is canceled.
  
  
   */
  onSelectionChanged;
  /**
  
   * A function that is executed before the ContextMenu is shown.
  
  
   */
  onShowing;
  /**
  
   * A function that is executed after the ContextMenu is shown.
  
  
   */
  onShown;
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
  animationChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  cssClassChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  dataSourceChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  disabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  disabledExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  displayExprChange;
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
  hideOnOutsideClickChange;
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
  itemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemsExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  positionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectByClickChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectionModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showEventChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showSubmenuModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  submenuDirectionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  tabIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  targetChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, _idh, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._watcherHelper = _watcherHelper;
    this._idh = _idh;
    this._createEventEmitters([{
      subscribe: "contentReady",
      emit: "onContentReady"
    }, {
      subscribe: "disposing",
      emit: "onDisposing"
    }, {
      subscribe: "hidden",
      emit: "onHidden"
    }, {
      subscribe: "hiding",
      emit: "onHiding"
    }, {
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "itemClick",
      emit: "onItemClick"
    }, {
      subscribe: "itemContextMenu",
      emit: "onItemContextMenu"
    }, {
      subscribe: "itemRendered",
      emit: "onItemRendered"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      subscribe: "positioning",
      emit: "onPositioning"
    }, {
      subscribe: "selectionChanged",
      emit: "onSelectionChanged"
    }, {
      subscribe: "showing",
      emit: "onShowing"
    }, {
      subscribe: "shown",
      emit: "onShown"
    }, {
      emit: "accessKeyChange"
    }, {
      emit: "activeStateEnabledChange"
    }, {
      emit: "animationChange"
    }, {
      emit: "cssClassChange"
    }, {
      emit: "dataSourceChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "disabledExprChange"
    }, {
      emit: "displayExprChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "focusStateEnabledChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hideOnOutsideClickChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "itemsChange"
    }, {
      emit: "itemsExprChange"
    }, {
      emit: "itemTemplateChange"
    }, {
      emit: "positionChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "selectByClickChange"
    }, {
      emit: "selectedExprChange"
    }, {
      emit: "selectedItemChange"
    }, {
      emit: "selectionModeChange"
    }, {
      emit: "showEventChange"
    }, {
      emit: "showSubmenuModeChange"
    }, {
      emit: "submenuDirectionChange"
    }, {
      emit: "tabIndexChange"
    }, {
      emit: "targetChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    this._idh.setHost(this);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new context_menu_default(element, options);
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
  static ɵfac = function DxContextMenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxContextMenuComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(IterableDifferHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxContextMenuComponent,
    selectors: [["dx-context-menu"]],
    contentQueries: function DxContextMenuComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      animation: "animation",
      cssClass: "cssClass",
      dataSource: "dataSource",
      disabled: "disabled",
      disabledExpr: "disabledExpr",
      displayExpr: "displayExpr",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hideOnOutsideClick: "hideOnOutsideClick",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      items: "items",
      itemsExpr: "itemsExpr",
      itemTemplate: "itemTemplate",
      position: "position",
      rtlEnabled: "rtlEnabled",
      selectByClick: "selectByClick",
      selectedExpr: "selectedExpr",
      selectedItem: "selectedItem",
      selectionMode: "selectionMode",
      showEvent: "showEvent",
      showSubmenuMode: "showSubmenuMode",
      submenuDirection: "submenuDirection",
      tabIndex: "tabIndex",
      target: "target",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onHidden: "onHidden",
      onHiding: "onHiding",
      onInitialized: "onInitialized",
      onItemClick: "onItemClick",
      onItemContextMenu: "onItemContextMenu",
      onItemRendered: "onItemRendered",
      onOptionChanged: "onOptionChanged",
      onPositioning: "onPositioning",
      onSelectionChanged: "onSelectionChanged",
      onShowing: "onShowing",
      onShown: "onShown",
      accessKeyChange: "accessKeyChange",
      activeStateEnabledChange: "activeStateEnabledChange",
      animationChange: "animationChange",
      cssClassChange: "cssClassChange",
      dataSourceChange: "dataSourceChange",
      disabledChange: "disabledChange",
      disabledExprChange: "disabledExprChange",
      displayExprChange: "displayExprChange",
      elementAttrChange: "elementAttrChange",
      focusStateEnabledChange: "focusStateEnabledChange",
      heightChange: "heightChange",
      hideOnOutsideClickChange: "hideOnOutsideClickChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      itemsChange: "itemsChange",
      itemsExprChange: "itemsExprChange",
      itemTemplateChange: "itemTemplateChange",
      positionChange: "positionChange",
      rtlEnabledChange: "rtlEnabledChange",
      selectByClickChange: "selectByClickChange",
      selectedExprChange: "selectedExprChange",
      selectedItemChange: "selectedItemChange",
      selectionModeChange: "selectionModeChange",
      showEventChange: "showEventChange",
      showSubmenuModeChange: "showSubmenuModeChange",
      submenuDirectionChange: "submenuDirectionChange",
      tabIndexChange: "tabIndexChange",
      targetChange: "targetChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxContextMenuComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxContextMenuComponent, [{
    type: Component,
    args: [{
      selector: "dx-context-menu",
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
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    disabledExpr: [{
      type: Input
    }],
    displayExpr: [{
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
    hideOnOutsideClick: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemsExpr: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    selectByClick: [{
      type: Input
    }],
    selectedExpr: [{
      type: Input
    }],
    selectedItem: [{
      type: Input
    }],
    selectionMode: [{
      type: Input
    }],
    showEvent: [{
      type: Input
    }],
    showSubmenuMode: [{
      type: Input
    }],
    submenuDirection: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    onContentReady: [{
      type: Output
    }],
    onDisposing: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    onHiding: [{
      type: Output
    }],
    onInitialized: [{
      type: Output
    }],
    onItemClick: [{
      type: Output
    }],
    onItemContextMenu: [{
      type: Output
    }],
    onItemRendered: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    onPositioning: [{
      type: Output
    }],
    onSelectionChanged: [{
      type: Output
    }],
    onShowing: [{
      type: Output
    }],
    onShown: [{
      type: Output
    }],
    accessKeyChange: [{
      type: Output
    }],
    activeStateEnabledChange: [{
      type: Output
    }],
    animationChange: [{
      type: Output
    }],
    cssClassChange: [{
      type: Output
    }],
    dataSourceChange: [{
      type: Output
    }],
    disabledChange: [{
      type: Output
    }],
    disabledExprChange: [{
      type: Output
    }],
    displayExprChange: [{
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
    hideOnOutsideClickChange: [{
      type: Output
    }],
    hintChange: [{
      type: Output
    }],
    hoverStateEnabledChange: [{
      type: Output
    }],
    itemsChange: [{
      type: Output
    }],
    itemsExprChange: [{
      type: Output
    }],
    itemTemplateChange: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    selectByClickChange: [{
      type: Output
    }],
    selectedExprChange: [{
      type: Output
    }],
    selectedItemChange: [{
      type: Output
    }],
    selectionModeChange: [{
      type: Output
    }],
    showEventChange: [{
      type: Output
    }],
    showSubmenuModeChange: [{
      type: Output
    }],
    submenuDirectionChange: [{
      type: Output
    }],
    tabIndexChange: [{
      type: Output
    }],
    targetChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }]
  });
})();
var DxContextMenuModule = class _DxContextMenuModule {
  /** @nocollapse */
  static ɵfac = function DxContextMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxContextMenuModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxContextMenuModule,
    imports: [DxContextMenuComponent, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxIntegrationModule, DxTemplateModule],
    exports: [DxContextMenuComponent, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxContextMenuComponent, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxIntegrationModule, DxTemplateModule, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxContextMenuModule, [{
    type: NgModule,
    args: [{
      imports: [DxContextMenuComponent, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxIntegrationModule, DxTemplateModule],
      exports: [DxContextMenuComponent, DxoAnimationModule, DxoHideModule, DxoFromModule, DxoPositionModule, DxoAtModule, DxoBoundaryOffsetModule, DxoCollisionModule, DxoMyModule, DxoOffsetModule, DxoToModule, DxoShowModule, DxiItemModule, DxoShowEventModule, DxoShowSubmenuModeModule, DxoDelayModule, DxoContextMenuAnimationModule, DxoContextMenuAtModule, DxoContextMenuBoundaryOffsetModule, DxoContextMenuCollisionModule, DxoContextMenuDelayModule, DxoContextMenuFromModule, DxoContextMenuHideModule, DxiContextMenuItemModule, DxoContextMenuMyModule, DxoContextMenuOffsetModule, DxoContextMenuPositionModule, DxoContextMenuShowModule, DxoContextMenuShowEventModule, DxoContextMenuShowSubmenuModeModule, DxoContextMenuToModule, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxContextMenuComponent,
  DxContextMenuModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-context-menu.mjs:
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
//# sourceMappingURL=chunk-A6JTB7QS.js.map
