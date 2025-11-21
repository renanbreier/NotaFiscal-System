import {
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_toolbarItems
} from "./chunk-QTDRYW7W.js";
import {
  CollectionNestedOption,
  DxIntegrationModule,
  DxTemplateHost,
  NestedOption,
  NestedOptionHost,
  extractTemplate
} from "./chunk-AV5L3IRR.js";
import {
  Component,
  ContentChildren,
  DOCUMENT,
  ElementRef,
  Host,
  Inject,
  Input,
  NgModule,
  Output,
  Renderer2,
  SkipSelf,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-GBBTBBS3.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-drop-down-button-nested.mjs
var _c0 = ["*"];
var DxoDropDownButtonAnimationComponent = class _DxoDropDownButtonAnimationComponent extends NestedOption {
  get hide() {
    return this._getOption("hide");
  }
  set hide(value) {
    this._setOption("hide", value);
  }
  get show() {
    return this._getOption("show");
  }
  set show(value) {
    this._setOption("show", value);
  }
  get _optionPath() {
    return "animation";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonAnimationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonAnimationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonAnimationComponent,
    selectors: [["dxo-drop-down-button-animation"]],
    inputs: {
      hide: "hide",
      show: "show"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonAnimationComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonAnimationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-animation",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    hide: [{
      type: Input
    }],
    show: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonAnimationModule = class _DxoDropDownButtonAnimationModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonAnimationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonAnimationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonAnimationModule,
    imports: [DxoDropDownButtonAnimationComponent],
    exports: [DxoDropDownButtonAnimationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonAnimationComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonAnimationModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonAnimationComponent],
      exports: [DxoDropDownButtonAnimationComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonAtComponent = class _DxoDropDownButtonAtComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "at";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonAtComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonAtComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonAtComponent,
    selectors: [["dxo-drop-down-button-at"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonAtComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonAtComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-at",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonAtModule = class _DxoDropDownButtonAtModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonAtModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonAtModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonAtModule,
    imports: [DxoDropDownButtonAtComponent],
    exports: [DxoDropDownButtonAtComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonAtComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonAtModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonAtComponent],
      exports: [DxoDropDownButtonAtComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonBoundaryOffsetComponent = class _DxoDropDownButtonBoundaryOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "boundaryOffset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonBoundaryOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonBoundaryOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonBoundaryOffsetComponent,
    selectors: [["dxo-drop-down-button-boundary-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonBoundaryOffsetComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonBoundaryOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-boundary-offset",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonBoundaryOffsetModule = class _DxoDropDownButtonBoundaryOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonBoundaryOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonBoundaryOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonBoundaryOffsetModule,
    imports: [DxoDropDownButtonBoundaryOffsetComponent],
    exports: [DxoDropDownButtonBoundaryOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonBoundaryOffsetComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonBoundaryOffsetModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonBoundaryOffsetComponent],
      exports: [DxoDropDownButtonBoundaryOffsetComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonCollisionComponent = class _DxoDropDownButtonCollisionComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "collision";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonCollisionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonCollisionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonCollisionComponent,
    selectors: [["dxo-drop-down-button-collision"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonCollisionComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonCollisionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-collision",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonCollisionModule = class _DxoDropDownButtonCollisionModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonCollisionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonCollisionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonCollisionModule,
    imports: [DxoDropDownButtonCollisionComponent],
    exports: [DxoDropDownButtonCollisionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonCollisionComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonCollisionModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonCollisionComponent],
      exports: [DxoDropDownButtonCollisionComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonDropDownOptionsComponent = class _DxoDropDownButtonDropDownOptionsComponent extends NestedOption {
  set _toolbarItemsContentChildren(value) {
    this.setChildren("toolbarItems", value);
  }
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get animation() {
    return this._getOption("animation");
  }
  set animation(value) {
    this._setOption("animation", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get contentTemplate() {
    return this._getOption("contentTemplate");
  }
  set contentTemplate(value) {
    this._setOption("contentTemplate", value);
  }
  get deferRendering() {
    return this._getOption("deferRendering");
  }
  set deferRendering(value) {
    this._setOption("deferRendering", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get dragAndResizeArea() {
    return this._getOption("dragAndResizeArea");
  }
  set dragAndResizeArea(value) {
    this._setOption("dragAndResizeArea", value);
  }
  get dragEnabled() {
    return this._getOption("dragEnabled");
  }
  set dragEnabled(value) {
    this._setOption("dragEnabled", value);
  }
  get dragOutsideBoundary() {
    return this._getOption("dragOutsideBoundary");
  }
  set dragOutsideBoundary(value) {
    this._setOption("dragOutsideBoundary", value);
  }
  get enableBodyScroll() {
    return this._getOption("enableBodyScroll");
  }
  set enableBodyScroll(value) {
    this._setOption("enableBodyScroll", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get fullScreen() {
    return this._getOption("fullScreen");
  }
  set fullScreen(value) {
    this._setOption("fullScreen", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hideOnOutsideClick() {
    return this._getOption("hideOnOutsideClick");
  }
  set hideOnOutsideClick(value) {
    this._setOption("hideOnOutsideClick", value);
  }
  get hideOnParentScroll() {
    return this._getOption("hideOnParentScroll");
  }
  set hideOnParentScroll(value) {
    this._setOption("hideOnParentScroll", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get maxHeight() {
    return this._getOption("maxHeight");
  }
  set maxHeight(value) {
    this._setOption("maxHeight", value);
  }
  get maxWidth() {
    return this._getOption("maxWidth");
  }
  set maxWidth(value) {
    this._setOption("maxWidth", value);
  }
  get minHeight() {
    return this._getOption("minHeight");
  }
  set minHeight(value) {
    this._setOption("minHeight", value);
  }
  get minWidth() {
    return this._getOption("minWidth");
  }
  set minWidth(value) {
    this._setOption("minWidth", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onHidden() {
    return this._getOption("onHidden");
  }
  set onHidden(value) {
    this._setOption("onHidden", value);
  }
  get onHiding() {
    return this._getOption("onHiding");
  }
  set onHiding(value) {
    this._setOption("onHiding", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onResize() {
    return this._getOption("onResize");
  }
  set onResize(value) {
    this._setOption("onResize", value);
  }
  get onResizeEnd() {
    return this._getOption("onResizeEnd");
  }
  set onResizeEnd(value) {
    this._setOption("onResizeEnd", value);
  }
  get onResizeStart() {
    return this._getOption("onResizeStart");
  }
  set onResizeStart(value) {
    this._setOption("onResizeStart", value);
  }
  get onShowing() {
    return this._getOption("onShowing");
  }
  set onShowing(value) {
    this._setOption("onShowing", value);
  }
  get onShown() {
    return this._getOption("onShown");
  }
  set onShown(value) {
    this._setOption("onShown", value);
  }
  get onTitleRendered() {
    return this._getOption("onTitleRendered");
  }
  set onTitleRendered(value) {
    this._setOption("onTitleRendered", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get resizeEnabled() {
    return this._getOption("resizeEnabled");
  }
  set resizeEnabled(value) {
    this._setOption("resizeEnabled", value);
  }
  get restorePosition() {
    return this._getOption("restorePosition");
  }
  set restorePosition(value) {
    this._setOption("restorePosition", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get shading() {
    return this._getOption("shading");
  }
  set shading(value) {
    this._setOption("shading", value);
  }
  get shadingColor() {
    return this._getOption("shadingColor");
  }
  set shadingColor(value) {
    this._setOption("shadingColor", value);
  }
  get showCloseButton() {
    return this._getOption("showCloseButton");
  }
  set showCloseButton(value) {
    this._setOption("showCloseButton", value);
  }
  get showTitle() {
    return this._getOption("showTitle");
  }
  set showTitle(value) {
    this._setOption("showTitle", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get titleTemplate() {
    return this._getOption("titleTemplate");
  }
  set titleTemplate(value) {
    this._setOption("titleTemplate", value);
  }
  get toolbarItems() {
    return this._getOption("toolbarItems");
  }
  set toolbarItems(value) {
    this._setOption("toolbarItems", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get wrapperAttr() {
    return this._getOption("wrapperAttr");
  }
  set wrapperAttr(value) {
    this._setOption("wrapperAttr", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  positionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  get _optionPath() {
    return "dropDownOptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "heightChange"
    }, {
      emit: "positionChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonDropDownOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonDropDownOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonDropDownOptionsComponent,
    selectors: [["dxo-drop-down-button-drop-down-options"]],
    contentQueries: function DxoDropDownButtonDropDownOptionsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_toolbarItems, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._toolbarItemsContentChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      animation: "animation",
      container: "container",
      contentTemplate: "contentTemplate",
      deferRendering: "deferRendering",
      disabled: "disabled",
      dragAndResizeArea: "dragAndResizeArea",
      dragEnabled: "dragEnabled",
      dragOutsideBoundary: "dragOutsideBoundary",
      enableBodyScroll: "enableBodyScroll",
      focusStateEnabled: "focusStateEnabled",
      fullScreen: "fullScreen",
      height: "height",
      hideOnOutsideClick: "hideOnOutsideClick",
      hideOnParentScroll: "hideOnParentScroll",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      maxHeight: "maxHeight",
      maxWidth: "maxWidth",
      minHeight: "minHeight",
      minWidth: "minWidth",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onHidden: "onHidden",
      onHiding: "onHiding",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      onResize: "onResize",
      onResizeEnd: "onResizeEnd",
      onResizeStart: "onResizeStart",
      onShowing: "onShowing",
      onShown: "onShown",
      onTitleRendered: "onTitleRendered",
      position: "position",
      resizeEnabled: "resizeEnabled",
      restorePosition: "restorePosition",
      rtlEnabled: "rtlEnabled",
      shading: "shading",
      shadingColor: "shadingColor",
      showCloseButton: "showCloseButton",
      showTitle: "showTitle",
      tabIndex: "tabIndex",
      title: "title",
      titleTemplate: "titleTemplate",
      toolbarItems: "toolbarItems",
      visible: "visible",
      width: "width",
      wrapperAttr: "wrapperAttr"
    },
    outputs: {
      heightChange: "heightChange",
      positionChange: "positionChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonDropDownOptionsComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonDropDownOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-drop-down-options",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    _toolbarItemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_toolbarItems]
    }],
    accessKey: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    deferRendering: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    dragAndResizeArea: [{
      type: Input
    }],
    dragEnabled: [{
      type: Input
    }],
    dragOutsideBoundary: [{
      type: Input
    }],
    enableBodyScroll: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    fullScreen: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hideOnOutsideClick: [{
      type: Input
    }],
    hideOnParentScroll: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    maxHeight: [{
      type: Input
    }],
    maxWidth: [{
      type: Input
    }],
    minHeight: [{
      type: Input
    }],
    minWidth: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onHidden: [{
      type: Input
    }],
    onHiding: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onResize: [{
      type: Input
    }],
    onResizeEnd: [{
      type: Input
    }],
    onResizeStart: [{
      type: Input
    }],
    onShowing: [{
      type: Input
    }],
    onShown: [{
      type: Input
    }],
    onTitleRendered: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    resizeEnabled: [{
      type: Input
    }],
    restorePosition: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    shading: [{
      type: Input
    }],
    shadingColor: [{
      type: Input
    }],
    showCloseButton: [{
      type: Input
    }],
    showTitle: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    titleTemplate: [{
      type: Input
    }],
    toolbarItems: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    wrapperAttr: [{
      type: Input
    }],
    heightChange: [{
      type: Output
    }],
    positionChange: [{
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
var DxoDropDownButtonDropDownOptionsModule = class _DxoDropDownButtonDropDownOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonDropDownOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonDropDownOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonDropDownOptionsModule,
    imports: [DxoDropDownButtonDropDownOptionsComponent],
    exports: [DxoDropDownButtonDropDownOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonDropDownOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonDropDownOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonDropDownOptionsComponent],
      exports: [DxoDropDownButtonDropDownOptionsComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonFromComponent = class _DxoDropDownButtonFromComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "from";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonFromComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonFromComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonFromComponent,
    selectors: [["dxo-drop-down-button-from"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonFromComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonFromComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-from",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonFromModule = class _DxoDropDownButtonFromModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonFromModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonFromModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonFromModule,
    imports: [DxoDropDownButtonFromComponent],
    exports: [DxoDropDownButtonFromComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonFromComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonFromModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonFromComponent],
      exports: [DxoDropDownButtonFromComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonHideComponent = class _DxoDropDownButtonHideComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "hide";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonHideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonHideComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonHideComponent,
    selectors: [["dxo-drop-down-button-hide"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonHideComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonHideComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-hide",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonHideModule = class _DxoDropDownButtonHideModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonHideModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonHideModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonHideModule,
    imports: [DxoDropDownButtonHideComponent],
    exports: [DxoDropDownButtonHideComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonHideComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonHideModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonHideComponent],
      exports: [DxoDropDownButtonHideComponent]
    }]
  }], null, null);
})();
var DxiDropDownButtonItemComponent = class _DxiDropDownButtonItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get badge() {
    return this._getOption("badge");
  }
  set badge(value) {
    this._setOption("badge", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get html() {
    return this._getOption("html");
  }
  set html(value) {
    this._setOption("html", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get onClick() {
    return this._getOption("onClick");
  }
  set onClick(value) {
    this._setOption("onClick", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "items";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDropDownButtonItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDropDownButtonItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDropDownButtonItemComponent,
    selectors: [["dxi-drop-down-button-item"]],
    inputs: {
      badge: "badge",
      disabled: "disabled",
      html: "html",
      icon: "icon",
      onClick: "onClick",
      template: "template",
      text: "text",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiDropDownButtonItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiDropDownButtonItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [DxIntegrationModule],
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDropDownButtonItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-drop-down-button-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiDropDownButtonItemComponent
      }],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    badge: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    onClick: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxiDropDownButtonItemModule = class _DxiDropDownButtonItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDropDownButtonItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDropDownButtonItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDropDownButtonItemModule,
    imports: [DxiDropDownButtonItemComponent],
    exports: [DxiDropDownButtonItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiDropDownButtonItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDropDownButtonItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiDropDownButtonItemComponent],
      exports: [DxiDropDownButtonItemComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonMyComponent = class _DxoDropDownButtonMyComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "my";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonMyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonMyComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonMyComponent,
    selectors: [["dxo-drop-down-button-my"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonMyComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonMyComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-my",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonMyModule = class _DxoDropDownButtonMyModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonMyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonMyModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonMyModule,
    imports: [DxoDropDownButtonMyComponent],
    exports: [DxoDropDownButtonMyComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonMyComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonMyModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonMyComponent],
      exports: [DxoDropDownButtonMyComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonOffsetComponent = class _DxoDropDownButtonOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "offset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonOffsetComponent,
    selectors: [["dxo-drop-down-button-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonOffsetComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-offset",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonOffsetModule = class _DxoDropDownButtonOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonOffsetModule,
    imports: [DxoDropDownButtonOffsetComponent],
    exports: [DxoDropDownButtonOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonOffsetComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonOffsetModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonOffsetComponent],
      exports: [DxoDropDownButtonOffsetComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonPositionComponent = class _DxoDropDownButtonPositionComponent extends NestedOption {
  get at() {
    return this._getOption("at");
  }
  set at(value) {
    this._setOption("at", value);
  }
  get boundary() {
    return this._getOption("boundary");
  }
  set boundary(value) {
    this._setOption("boundary", value);
  }
  get boundaryOffset() {
    return this._getOption("boundaryOffset");
  }
  set boundaryOffset(value) {
    this._setOption("boundaryOffset", value);
  }
  get collision() {
    return this._getOption("collision");
  }
  set collision(value) {
    this._setOption("collision", value);
  }
  get my() {
    return this._getOption("my");
  }
  set my(value) {
    this._setOption("my", value);
  }
  get of() {
    return this._getOption("of");
  }
  set of(value) {
    this._setOption("of", value);
  }
  get offset() {
    return this._getOption("offset");
  }
  set offset(value) {
    this._setOption("offset", value);
  }
  get _optionPath() {
    return "position";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonPositionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonPositionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonPositionComponent,
    selectors: [["dxo-drop-down-button-position"]],
    inputs: {
      at: "at",
      boundary: "boundary",
      boundaryOffset: "boundaryOffset",
      collision: "collision",
      my: "my",
      of: "of",
      offset: "offset"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonPositionComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonPositionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-position",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    at: [{
      type: Input
    }],
    boundary: [{
      type: Input
    }],
    boundaryOffset: [{
      type: Input
    }],
    collision: [{
      type: Input
    }],
    my: [{
      type: Input
    }],
    of: [{
      type: Input
    }],
    offset: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonPositionModule = class _DxoDropDownButtonPositionModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonPositionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonPositionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonPositionModule,
    imports: [DxoDropDownButtonPositionComponent],
    exports: [DxoDropDownButtonPositionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonPositionComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonPositionModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonPositionComponent],
      exports: [DxoDropDownButtonPositionComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonShowComponent = class _DxoDropDownButtonShowComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "show";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonShowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonShowComponent,
    selectors: [["dxo-drop-down-button-show"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonShowComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonShowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-show",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonShowModule = class _DxoDropDownButtonShowModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonShowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonShowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonShowModule,
    imports: [DxoDropDownButtonShowComponent],
    exports: [DxoDropDownButtonShowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonShowComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonShowModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonShowComponent],
      exports: [DxoDropDownButtonShowComponent]
    }]
  }], null, null);
})();
var DxoDropDownButtonToComponent = class _DxoDropDownButtonToComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "to";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonToComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonToComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDropDownButtonToComponent,
    selectors: [["dxo-drop-down-button-to"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDropDownButtonToComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonToComponent, [{
    type: Component,
    args: [{
      selector: "dxo-drop-down-button-to",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoDropDownButtonToModule = class _DxoDropDownButtonToModule {
  /** @nocollapse */
  static ɵfac = function DxoDropDownButtonToModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDropDownButtonToModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDropDownButtonToModule,
    imports: [DxoDropDownButtonToComponent],
    exports: [DxoDropDownButtonToComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoDropDownButtonToComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDropDownButtonToModule, [{
    type: NgModule,
    args: [{
      imports: [DxoDropDownButtonToComponent],
      exports: [DxoDropDownButtonToComponent]
    }]
  }], null, null);
})();
var DxiDropDownButtonToolbarItemComponent = class _DxiDropDownButtonToolbarItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get html() {
    return this._getOption("html");
  }
  set html(value) {
    this._setOption("html", value);
  }
  get locateInMenu() {
    return this._getOption("locateInMenu");
  }
  set locateInMenu(value) {
    this._setOption("locateInMenu", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get menuItemTemplate() {
    return this._getOption("menuItemTemplate");
  }
  set menuItemTemplate(value) {
    this._setOption("menuItemTemplate", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get showText() {
    return this._getOption("showText");
  }
  set showText(value) {
    this._setOption("showText", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get toolbar() {
    return this._getOption("toolbar");
  }
  set toolbar(value) {
    this._setOption("toolbar", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get widget() {
    return this._getOption("widget");
  }
  set widget(value) {
    this._setOption("widget", value);
  }
  get _optionPath() {
    return "toolbarItems";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDropDownButtonToolbarItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDropDownButtonToolbarItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDropDownButtonToolbarItemComponent,
    selectors: [["dxi-drop-down-button-toolbar-item"]],
    inputs: {
      cssClass: "cssClass",
      disabled: "disabled",
      html: "html",
      locateInMenu: "locateInMenu",
      location: "location",
      menuItemTemplate: "menuItemTemplate",
      options: "options",
      showText: "showText",
      template: "template",
      text: "text",
      toolbar: "toolbar",
      visible: "visible",
      widget: "widget"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_toolbarItems,
      useExisting: _DxiDropDownButtonToolbarItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiDropDownButtonToolbarItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [DxIntegrationModule],
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDropDownButtonToolbarItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-drop-down-button-toolbar-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_toolbarItems,
        useExisting: DxiDropDownButtonToolbarItemComponent
      }],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    cssClass: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    locateInMenu: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    menuItemTemplate: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    toolbar: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    widget: [{
      type: Input
    }]
  });
})();
var DxiDropDownButtonToolbarItemModule = class _DxiDropDownButtonToolbarItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDropDownButtonToolbarItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDropDownButtonToolbarItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDropDownButtonToolbarItemModule,
    imports: [DxiDropDownButtonToolbarItemComponent],
    exports: [DxiDropDownButtonToolbarItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiDropDownButtonToolbarItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDropDownButtonToolbarItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiDropDownButtonToolbarItemComponent],
      exports: [DxiDropDownButtonToolbarItemComponent]
    }]
  }], null, null);
})();

export {
  DxoDropDownButtonAnimationComponent,
  DxoDropDownButtonAnimationModule,
  DxoDropDownButtonAtComponent,
  DxoDropDownButtonAtModule,
  DxoDropDownButtonBoundaryOffsetComponent,
  DxoDropDownButtonBoundaryOffsetModule,
  DxoDropDownButtonCollisionComponent,
  DxoDropDownButtonCollisionModule,
  DxoDropDownButtonDropDownOptionsComponent,
  DxoDropDownButtonDropDownOptionsModule,
  DxoDropDownButtonFromComponent,
  DxoDropDownButtonFromModule,
  DxoDropDownButtonHideComponent,
  DxoDropDownButtonHideModule,
  DxiDropDownButtonItemComponent,
  DxiDropDownButtonItemModule,
  DxoDropDownButtonMyComponent,
  DxoDropDownButtonMyModule,
  DxoDropDownButtonOffsetComponent,
  DxoDropDownButtonOffsetModule,
  DxoDropDownButtonPositionComponent,
  DxoDropDownButtonPositionModule,
  DxoDropDownButtonShowComponent,
  DxoDropDownButtonShowModule,
  DxoDropDownButtonToComponent,
  DxoDropDownButtonToModule,
  DxiDropDownButtonToolbarItemComponent,
  DxiDropDownButtonToolbarItemModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-drop-down-button-nested.mjs:
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
//# sourceMappingURL=chunk-2XV3J7YH.js.map
