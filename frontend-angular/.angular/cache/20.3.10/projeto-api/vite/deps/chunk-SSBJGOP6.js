import {
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_tabs,
  PROPERTY_TOKEN_validationRules
} from "./chunk-QTDRYW7W.js";
import {
  CollectionNestedOption,
  DxIntegrationModule,
  DxTemplateHost,
  NestedOption,
  NestedOptionHost,
  extractTemplate
} from "./chunk-N6JIRJK4.js";
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-form-nested.mjs
var _c0 = ["*"];
var DxiFormAsyncRuleComponent = class _DxiFormAsyncRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "async";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormAsyncRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormAsyncRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormAsyncRuleComponent,
    selectors: [["dxi-form-async-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      reevaluate: "reevaluate",
      type: "type",
      validationCallback: "validationCallback"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormAsyncRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormAsyncRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormAsyncRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-async-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormAsyncRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }]
  });
})();
var DxiFormAsyncRuleModule = class _DxiFormAsyncRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormAsyncRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormAsyncRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormAsyncRuleModule,
    imports: [DxiFormAsyncRuleComponent],
    exports: [DxiFormAsyncRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormAsyncRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormAsyncRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormAsyncRuleComponent],
      exports: [DxiFormAsyncRuleComponent]
    }]
  }], null, null);
})();
var DxiFormButtonItemComponent = class _DxiFormButtonItemComponent extends CollectionNestedOption {
  get buttonOptions() {
    return this._getOption("buttonOptions");
  }
  set buttonOptions(value) {
    this._setOption("buttonOptions", value);
  }
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get horizontalAlignment() {
    return this._getOption("horizontalAlignment");
  }
  set horizontalAlignment(value) {
    this._setOption("horizontalAlignment", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get verticalAlignment() {
    return this._getOption("verticalAlignment");
  }
  set verticalAlignment(value) {
    this._setOption("verticalAlignment", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get _optionPath() {
    return "items";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.itemType = "button";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormButtonItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormButtonItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormButtonItemComponent,
    selectors: [["dxi-form-button-item"]],
    inputs: {
      buttonOptions: "buttonOptions",
      colSpan: "colSpan",
      cssClass: "cssClass",
      horizontalAlignment: "horizontalAlignment",
      itemType: "itemType",
      name: "name",
      verticalAlignment: "verticalAlignment",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormButtonItemComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormButtonItemComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormButtonItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-button-item",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormButtonItemComponent
      }]
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
    buttonOptions: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    horizontalAlignment: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    verticalAlignment: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }]
  });
})();
var DxiFormButtonItemModule = class _DxiFormButtonItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormButtonItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormButtonItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormButtonItemModule,
    imports: [DxiFormButtonItemComponent],
    exports: [DxiFormButtonItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormButtonItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormButtonItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormButtonItemComponent],
      exports: [DxiFormButtonItemComponent]
    }]
  }], null, null);
})();
var DxoFormButtonOptionsComponent = class _DxoFormButtonOptionsComponent extends NestedOption {
  renderer;
  document;
  element;
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
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
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get stylingMode() {
    return this._getOption("stylingMode");
  }
  set stylingMode(value) {
    this._setOption("stylingMode", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
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
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get useSubmitBehavior() {
    return this._getOption("useSubmitBehavior");
  }
  set useSubmitBehavior(value) {
    this._setOption("useSubmitBehavior", value);
  }
  get validationGroup() {
    return this._getOption("validationGroup");
  }
  set validationGroup(value) {
    this._setOption("validationGroup", value);
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
  get _optionPath() {
    return "buttonOptions";
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
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoFormButtonOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormButtonOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoFormButtonOptionsComponent,
    selectors: [["dxo-form-button-options"]],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      icon: "icon",
      onClick: "onClick",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      rtlEnabled: "rtlEnabled",
      stylingMode: "stylingMode",
      tabIndex: "tabIndex",
      template: "template",
      text: "text",
      type: "type",
      useSubmitBehavior: "useSubmitBehavior",
      validationGroup: "validationGroup",
      visible: "visible",
      width: "width"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoFormButtonOptionsComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormButtonOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-form-button-options",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost],
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
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    disabled: [{
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
    onClick: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    rtlEnabled: [{
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
    useSubmitBehavior: [{
      type: Input
    }],
    validationGroup: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoFormButtonOptionsModule = class _DxoFormButtonOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoFormButtonOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormButtonOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoFormButtonOptionsModule,
    imports: [DxoFormButtonOptionsComponent],
    exports: [DxoFormButtonOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoFormButtonOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormButtonOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoFormButtonOptionsComponent],
      exports: [DxoFormButtonOptionsComponent]
    }]
  }], null, null);
})();
var DxoFormColCountByScreenComponent = class _DxoFormColCountByScreenComponent extends NestedOption {
  get lg() {
    return this._getOption("lg");
  }
  set lg(value) {
    this._setOption("lg", value);
  }
  get md() {
    return this._getOption("md");
  }
  set md(value) {
    this._setOption("md", value);
  }
  get sm() {
    return this._getOption("sm");
  }
  set sm(value) {
    this._setOption("sm", value);
  }
  get xs() {
    return this._getOption("xs");
  }
  set xs(value) {
    this._setOption("xs", value);
  }
  get _optionPath() {
    return "colCountByScreen";
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
  static ɵfac = function DxoFormColCountByScreenComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormColCountByScreenComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoFormColCountByScreenComponent,
    selectors: [["dxo-form-col-count-by-screen"]],
    inputs: {
      lg: "lg",
      md: "md",
      sm: "sm",
      xs: "xs"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoFormColCountByScreenComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormColCountByScreenComponent, [{
    type: Component,
    args: [{
      selector: "dxo-form-col-count-by-screen",
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
    lg: [{
      type: Input
    }],
    md: [{
      type: Input
    }],
    sm: [{
      type: Input
    }],
    xs: [{
      type: Input
    }]
  });
})();
var DxoFormColCountByScreenModule = class _DxoFormColCountByScreenModule {
  /** @nocollapse */
  static ɵfac = function DxoFormColCountByScreenModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormColCountByScreenModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoFormColCountByScreenModule,
    imports: [DxoFormColCountByScreenComponent],
    exports: [DxoFormColCountByScreenComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoFormColCountByScreenComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormColCountByScreenModule, [{
    type: NgModule,
    args: [{
      imports: [DxoFormColCountByScreenComponent],
      exports: [DxoFormColCountByScreenComponent]
    }]
  }], null, null);
})();
var DxiFormCompareRuleComponent = class _DxiFormCompareRuleComponent extends CollectionNestedOption {
  get comparisonTarget() {
    return this._getOption("comparisonTarget");
  }
  set comparisonTarget(value) {
    this._setOption("comparisonTarget", value);
  }
  get comparisonType() {
    return this._getOption("comparisonType");
  }
  set comparisonType(value) {
    this._setOption("comparisonType", value);
  }
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "compare";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormCompareRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormCompareRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormCompareRuleComponent,
    selectors: [["dxi-form-compare-rule"]],
    inputs: {
      comparisonTarget: "comparisonTarget",
      comparisonType: "comparisonType",
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormCompareRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormCompareRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormCompareRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-compare-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormCompareRuleComponent
      }]
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
    comparisonTarget: [{
      type: Input
    }],
    comparisonType: [{
      type: Input
    }],
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormCompareRuleModule = class _DxiFormCompareRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormCompareRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormCompareRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormCompareRuleModule,
    imports: [DxiFormCompareRuleComponent],
    exports: [DxiFormCompareRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormCompareRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormCompareRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormCompareRuleComponent],
      exports: [DxiFormCompareRuleComponent]
    }]
  }], null, null);
})();
var DxiFormCustomRuleComponent = class _DxiFormCustomRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "custom";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormCustomRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormCustomRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormCustomRuleComponent,
    selectors: [["dxi-form-custom-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      reevaluate: "reevaluate",
      type: "type",
      validationCallback: "validationCallback"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormCustomRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormCustomRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormCustomRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-custom-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormCustomRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }]
  });
})();
var DxiFormCustomRuleModule = class _DxiFormCustomRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormCustomRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormCustomRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormCustomRuleModule,
    imports: [DxiFormCustomRuleComponent],
    exports: [DxiFormCustomRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormCustomRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormCustomRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormCustomRuleComponent],
      exports: [DxiFormCustomRuleComponent]
    }]
  }], null, null);
})();
var DxiFormEmailRuleComponent = class _DxiFormEmailRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "email";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormEmailRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormEmailRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormEmailRuleComponent,
    selectors: [["dxi-form-email-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormEmailRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormEmailRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormEmailRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-email-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormEmailRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormEmailRuleModule = class _DxiFormEmailRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormEmailRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormEmailRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormEmailRuleModule,
    imports: [DxiFormEmailRuleComponent],
    exports: [DxiFormEmailRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormEmailRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormEmailRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormEmailRuleComponent],
      exports: [DxiFormEmailRuleComponent]
    }]
  }], null, null);
})();
var DxiFormEmptyItemComponent = class _DxiFormEmptyItemComponent extends CollectionNestedOption {
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get _optionPath() {
    return "items";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.itemType = "empty";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormEmptyItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormEmptyItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormEmptyItemComponent,
    selectors: [["dxi-form-empty-item"]],
    inputs: {
      colSpan: "colSpan",
      cssClass: "cssClass",
      itemType: "itemType",
      name: "name",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormEmptyItemComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormEmptyItemComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormEmptyItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-empty-item",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormEmptyItemComponent
      }]
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
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }]
  });
})();
var DxiFormEmptyItemModule = class _DxiFormEmptyItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormEmptyItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormEmptyItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormEmptyItemModule,
    imports: [DxiFormEmptyItemComponent],
    exports: [DxiFormEmptyItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormEmptyItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormEmptyItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormEmptyItemComponent],
      exports: [DxiFormEmptyItemComponent]
    }]
  }], null, null);
})();
var DxiFormGroupItemComponent = class _DxiFormGroupItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  get alignItemLabels() {
    return this._getOption("alignItemLabels");
  }
  set alignItemLabels(value) {
    this._setOption("alignItemLabels", value);
  }
  get caption() {
    return this._getOption("caption");
  }
  set caption(value) {
    this._setOption("caption", value);
  }
  get captionTemplate() {
    return this._getOption("captionTemplate");
  }
  set captionTemplate(value) {
    this._setOption("captionTemplate", value);
  }
  get colCount() {
    return this._getOption("colCount");
  }
  set colCount(value) {
    this._setOption("colCount", value);
  }
  get colCountByScreen() {
    return this._getOption("colCountByScreen");
  }
  set colCountByScreen(value) {
    this._setOption("colCountByScreen", value);
  }
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
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
    this.itemType = "group";
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
  static ɵfac = function DxiFormGroupItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormGroupItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormGroupItemComponent,
    selectors: [["dxi-form-group-item"]],
    contentQueries: function DxiFormGroupItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      alignItemLabels: "alignItemLabels",
      caption: "caption",
      captionTemplate: "captionTemplate",
      colCount: "colCount",
      colCountByScreen: "colCountByScreen",
      colSpan: "colSpan",
      cssClass: "cssClass",
      items: "items",
      itemType: "itemType",
      name: "name",
      template: "template",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormGroupItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiFormGroupItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormGroupItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-group-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormGroupItemComponent
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
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
    alignItemLabels: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    captionTemplate: [{
      type: Input
    }],
    colCount: [{
      type: Input
    }],
    colCountByScreen: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }]
  });
})();
var DxiFormGroupItemModule = class _DxiFormGroupItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormGroupItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormGroupItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormGroupItemModule,
    imports: [DxiFormGroupItemComponent],
    exports: [DxiFormGroupItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormGroupItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormGroupItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormGroupItemComponent],
      exports: [DxiFormGroupItemComponent]
    }]
  }], null, null);
})();
var DxiFormItemComponent = class _DxiFormItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _validationRulesContentChildren(value) {
    this.setChildren("validationRules", value);
  }
  set _tabsContentChildren(value) {
    this.setChildren("tabs", value);
  }
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
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
  get tabTemplate() {
    return this._getOption("tabTemplate");
  }
  set tabTemplate(value) {
    this._setOption("tabTemplate", value);
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
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get dataField() {
    return this._getOption("dataField");
  }
  set dataField(value) {
    this._setOption("dataField", value);
  }
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get editorType() {
    return this._getOption("editorType");
  }
  set editorType(value) {
    this._setOption("editorType", value);
  }
  get helpText() {
    return this._getOption("helpText");
  }
  set helpText(value) {
    this._setOption("helpText", value);
  }
  get isRequired() {
    return this._getOption("isRequired");
  }
  set isRequired(value) {
    this._setOption("isRequired", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get label() {
    return this._getOption("label");
  }
  set label(value) {
    this._setOption("label", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get validationRules() {
    return this._getOption("validationRules");
  }
  set validationRules(value) {
    this._setOption("validationRules", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get alignItemLabels() {
    return this._getOption("alignItemLabels");
  }
  set alignItemLabels(value) {
    this._setOption("alignItemLabels", value);
  }
  get caption() {
    return this._getOption("caption");
  }
  set caption(value) {
    this._setOption("caption", value);
  }
  get captionTemplate() {
    return this._getOption("captionTemplate");
  }
  set captionTemplate(value) {
    this._setOption("captionTemplate", value);
  }
  get colCount() {
    return this._getOption("colCount");
  }
  set colCount(value) {
    this._setOption("colCount", value);
  }
  get colCountByScreen() {
    return this._getOption("colCountByScreen");
  }
  set colCountByScreen(value) {
    this._setOption("colCountByScreen", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get tabPanelOptions() {
    return this._getOption("tabPanelOptions");
  }
  set tabPanelOptions(value) {
    this._setOption("tabPanelOptions", value);
  }
  get tabs() {
    return this._getOption("tabs");
  }
  set tabs(value) {
    this._setOption("tabs", value);
  }
  get buttonOptions() {
    return this._getOption("buttonOptions");
  }
  set buttonOptions(value) {
    this._setOption("buttonOptions", value);
  }
  get horizontalAlignment() {
    return this._getOption("horizontalAlignment");
  }
  set horizontalAlignment(value) {
    this._setOption("horizontalAlignment", value);
  }
  get verticalAlignment() {
    return this._getOption("verticalAlignment");
  }
  set verticalAlignment(value) {
    this._setOption("verticalAlignment", value);
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
  static ɵfac = function DxiFormItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormItemComponent,
    selectors: [["dxi-form-item"]],
    contentQueries: function DxiFormItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_validationRules, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_tabs, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._validationRulesContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._tabsContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      badge: "badge",
      disabled: "disabled",
      html: "html",
      icon: "icon",
      tabTemplate: "tabTemplate",
      template: "template",
      text: "text",
      title: "title",
      visible: "visible",
      colSpan: "colSpan",
      cssClass: "cssClass",
      dataField: "dataField",
      editorOptions: "editorOptions",
      editorType: "editorType",
      helpText: "helpText",
      isRequired: "isRequired",
      itemType: "itemType",
      label: "label",
      name: "name",
      validationRules: "validationRules",
      visibleIndex: "visibleIndex",
      alignItemLabels: "alignItemLabels",
      caption: "caption",
      captionTemplate: "captionTemplate",
      colCount: "colCount",
      colCountByScreen: "colCountByScreen",
      items: "items",
      tabPanelOptions: "tabPanelOptions",
      tabs: "tabs",
      buttonOptions: "buttonOptions",
      horizontalAlignment: "horizontalAlignment",
      verticalAlignment: "verticalAlignment"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiFormItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormItemComponent
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
    _validationRulesContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_validationRules]
    }],
    _tabsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_tabs]
    }],
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
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
    tabTemplate: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    dataField: [{
      type: Input
    }],
    editorOptions: [{
      type: Input
    }],
    editorType: [{
      type: Input
    }],
    helpText: [{
      type: Input
    }],
    isRequired: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    validationRules: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }],
    alignItemLabels: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    captionTemplate: [{
      type: Input
    }],
    colCount: [{
      type: Input
    }],
    colCountByScreen: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    tabPanelOptions: [{
      type: Input
    }],
    tabs: [{
      type: Input
    }],
    buttonOptions: [{
      type: Input
    }],
    horizontalAlignment: [{
      type: Input
    }],
    verticalAlignment: [{
      type: Input
    }]
  });
})();
var DxiFormItemModule = class _DxiFormItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormItemModule,
    imports: [DxiFormItemComponent],
    exports: [DxiFormItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormItemComponent],
      exports: [DxiFormItemComponent]
    }]
  }], null, null);
})();
var DxoFormLabelComponent = class _DxoFormLabelComponent extends NestedOption {
  renderer;
  document;
  element;
  get alignment() {
    return this._getOption("alignment");
  }
  set alignment(value) {
    this._setOption("alignment", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get showColon() {
    return this._getOption("showColon");
  }
  set showColon(value) {
    this._setOption("showColon", value);
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
    return "label";
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
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoFormLabelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormLabelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoFormLabelComponent,
    selectors: [["dxo-form-label"]],
    inputs: {
      alignment: "alignment",
      location: "location",
      showColon: "showColon",
      template: "template",
      text: "text",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoFormLabelComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormLabelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-form-label",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost],
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
    alignment: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    showColon: [{
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
var DxoFormLabelModule = class _DxoFormLabelModule {
  /** @nocollapse */
  static ɵfac = function DxoFormLabelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormLabelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoFormLabelModule,
    imports: [DxoFormLabelComponent],
    exports: [DxoFormLabelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoFormLabelComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormLabelModule, [{
    type: NgModule,
    args: [{
      imports: [DxoFormLabelComponent],
      exports: [DxoFormLabelComponent]
    }]
  }], null, null);
})();
var DxiFormNumericRuleComponent = class _DxiFormNumericRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "numeric";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormNumericRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormNumericRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormNumericRuleComponent,
    selectors: [["dxi-form-numeric-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormNumericRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormNumericRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormNumericRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-numeric-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormNumericRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormNumericRuleModule = class _DxiFormNumericRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormNumericRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormNumericRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormNumericRuleModule,
    imports: [DxiFormNumericRuleComponent],
    exports: [DxiFormNumericRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormNumericRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormNumericRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormNumericRuleComponent],
      exports: [DxiFormNumericRuleComponent]
    }]
  }], null, null);
})();
var DxiFormPatternRuleComponent = class _DxiFormPatternRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get pattern() {
    return this._getOption("pattern");
  }
  set pattern(value) {
    this._setOption("pattern", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "pattern";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormPatternRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormPatternRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormPatternRuleComponent,
    selectors: [["dxi-form-pattern-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      pattern: "pattern",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormPatternRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormPatternRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormPatternRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-pattern-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormPatternRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    pattern: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormPatternRuleModule = class _DxiFormPatternRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormPatternRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormPatternRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormPatternRuleModule,
    imports: [DxiFormPatternRuleComponent],
    exports: [DxiFormPatternRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormPatternRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormPatternRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormPatternRuleComponent],
      exports: [DxiFormPatternRuleComponent]
    }]
  }], null, null);
})();
var DxiFormRangeRuleComponent = class _DxiFormRangeRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "range";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormRangeRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormRangeRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormRangeRuleComponent,
    selectors: [["dxi-form-range-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      message: "message",
      min: "min",
      reevaluate: "reevaluate",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormRangeRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormRangeRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormRangeRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-range-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormRangeRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormRangeRuleModule = class _DxiFormRangeRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormRangeRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormRangeRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormRangeRuleModule,
    imports: [DxiFormRangeRuleComponent],
    exports: [DxiFormRangeRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormRangeRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormRangeRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormRangeRuleComponent],
      exports: [DxiFormRangeRuleComponent]
    }]
  }], null, null);
})();
var DxiFormRequiredRuleComponent = class _DxiFormRequiredRuleComponent extends CollectionNestedOption {
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "required";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormRequiredRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormRequiredRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormRequiredRuleComponent,
    selectors: [["dxi-form-required-rule"]],
    inputs: {
      message: "message",
      trim: "trim",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormRequiredRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormRequiredRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormRequiredRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-required-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormRequiredRuleComponent
      }]
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
    message: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormRequiredRuleModule = class _DxiFormRequiredRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormRequiredRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormRequiredRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormRequiredRuleModule,
    imports: [DxiFormRequiredRuleComponent],
    exports: [DxiFormRequiredRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormRequiredRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormRequiredRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormRequiredRuleComponent],
      exports: [DxiFormRequiredRuleComponent]
    }]
  }], null, null);
})();
var DxiFormSimpleItemComponent = class _DxiFormSimpleItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _validationRulesContentChildren(value) {
    this.setChildren("validationRules", value);
  }
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get dataField() {
    return this._getOption("dataField");
  }
  set dataField(value) {
    this._setOption("dataField", value);
  }
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get editorType() {
    return this._getOption("editorType");
  }
  set editorType(value) {
    this._setOption("editorType", value);
  }
  get helpText() {
    return this._getOption("helpText");
  }
  set helpText(value) {
    this._setOption("helpText", value);
  }
  get isRequired() {
    return this._getOption("isRequired");
  }
  set isRequired(value) {
    this._setOption("isRequired", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get label() {
    return this._getOption("label");
  }
  set label(value) {
    this._setOption("label", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get validationRules() {
    return this._getOption("validationRules");
  }
  set validationRules(value) {
    this._setOption("validationRules", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
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
    this.itemType = "simple";
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
  static ɵfac = function DxiFormSimpleItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormSimpleItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormSimpleItemComponent,
    selectors: [["dxi-form-simple-item"]],
    contentQueries: function DxiFormSimpleItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_validationRules, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._validationRulesContentChildren = _t);
      }
    },
    inputs: {
      colSpan: "colSpan",
      cssClass: "cssClass",
      dataField: "dataField",
      editorOptions: "editorOptions",
      editorType: "editorType",
      helpText: "helpText",
      isRequired: "isRequired",
      itemType: "itemType",
      label: "label",
      name: "name",
      template: "template",
      validationRules: "validationRules",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormSimpleItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiFormSimpleItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormSimpleItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-simple-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormSimpleItemComponent
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
    _validationRulesContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_validationRules]
    }],
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    dataField: [{
      type: Input
    }],
    editorOptions: [{
      type: Input
    }],
    editorType: [{
      type: Input
    }],
    helpText: [{
      type: Input
    }],
    isRequired: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    validationRules: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }]
  });
})();
var DxiFormSimpleItemModule = class _DxiFormSimpleItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormSimpleItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormSimpleItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormSimpleItemModule,
    imports: [DxiFormSimpleItemComponent],
    exports: [DxiFormSimpleItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormSimpleItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormSimpleItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormSimpleItemComponent],
      exports: [DxiFormSimpleItemComponent]
    }]
  }], null, null);
})();
var DxiFormStringLengthRuleComponent = class _DxiFormStringLengthRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "stringLength";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormStringLengthRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormStringLengthRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormStringLengthRuleComponent,
    selectors: [["dxi-form-string-length-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      message: "message",
      min: "min",
      trim: "trim",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormStringLengthRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormStringLengthRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormStringLengthRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-string-length-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormStringLengthRuleComponent
      }]
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
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiFormStringLengthRuleModule = class _DxiFormStringLengthRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormStringLengthRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormStringLengthRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormStringLengthRuleModule,
    imports: [DxiFormStringLengthRuleComponent],
    exports: [DxiFormStringLengthRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormStringLengthRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormStringLengthRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormStringLengthRuleComponent],
      exports: [DxiFormStringLengthRuleComponent]
    }]
  }], null, null);
})();
var DxiFormTabComponent = class _DxiFormTabComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  get alignItemLabels() {
    return this._getOption("alignItemLabels");
  }
  set alignItemLabels(value) {
    this._setOption("alignItemLabels", value);
  }
  get badge() {
    return this._getOption("badge");
  }
  set badge(value) {
    this._setOption("badge", value);
  }
  get colCount() {
    return this._getOption("colCount");
  }
  set colCount(value) {
    this._setOption("colCount", value);
  }
  get colCountByScreen() {
    return this._getOption("colCountByScreen");
  }
  set colCountByScreen(value) {
    this._setOption("colCountByScreen", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get tabTemplate() {
    return this._getOption("tabTemplate");
  }
  set tabTemplate(value) {
    this._setOption("tabTemplate", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get _optionPath() {
    return "tabs";
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
  static ɵfac = function DxiFormTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormTabComponent,
    selectors: [["dxi-form-tab"]],
    contentQueries: function DxiFormTabComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      alignItemLabels: "alignItemLabels",
      badge: "badge",
      colCount: "colCount",
      colCountByScreen: "colCountByScreen",
      disabled: "disabled",
      icon: "icon",
      items: "items",
      tabTemplate: "tabTemplate",
      template: "template",
      title: "title"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_tabs,
      useExisting: _DxiFormTabComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiFormTabComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-tab",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_tabs,
        useExisting: DxiFormTabComponent
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
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
    alignItemLabels: [{
      type: Input
    }],
    badge: [{
      type: Input
    }],
    colCount: [{
      type: Input
    }],
    colCountByScreen: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    tabTemplate: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    title: [{
      type: Input
    }]
  });
})();
var DxiFormTabModule = class _DxiFormTabModule {
  /** @nocollapse */
  static ɵfac = function DxiFormTabModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormTabModule,
    imports: [DxiFormTabComponent],
    exports: [DxiFormTabComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormTabComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormTabComponent],
      exports: [DxiFormTabComponent]
    }]
  }], null, null);
})();
var DxiFormTabPanelOptionsItemComponent = class _DxiFormTabPanelOptionsItemComponent extends CollectionNestedOption {
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
  get tabTemplate() {
    return this._getOption("tabTemplate");
  }
  set tabTemplate(value) {
    this._setOption("tabTemplate", value);
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
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
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
  static ɵfac = function DxiFormTabPanelOptionsItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabPanelOptionsItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormTabPanelOptionsItemComponent,
    selectors: [["dxi-form-tab-panel-options-item"]],
    inputs: {
      badge: "badge",
      disabled: "disabled",
      html: "html",
      icon: "icon",
      tabTemplate: "tabTemplate",
      template: "template",
      text: "text",
      title: "title",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormTabPanelOptionsItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiFormTabPanelOptionsItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabPanelOptionsItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-tab-panel-options-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormTabPanelOptionsItemComponent
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
    tabTemplate: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxiFormTabPanelOptionsItemModule = class _DxiFormTabPanelOptionsItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormTabPanelOptionsItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabPanelOptionsItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormTabPanelOptionsItemModule,
    imports: [DxiFormTabPanelOptionsItemComponent],
    exports: [DxiFormTabPanelOptionsItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormTabPanelOptionsItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabPanelOptionsItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormTabPanelOptionsItemComponent],
      exports: [DxiFormTabPanelOptionsItemComponent]
    }]
  }], null, null);
})();
var DxoFormTabPanelOptionsComponent = class _DxoFormTabPanelOptionsComponent extends NestedOption {
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  get animationEnabled() {
    return this._getOption("animationEnabled");
  }
  set animationEnabled(value) {
    this._setOption("animationEnabled", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
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
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
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
  get iconPosition() {
    return this._getOption("iconPosition");
  }
  set iconPosition(value) {
    this._setOption("iconPosition", value);
  }
  get itemHoldTimeout() {
    return this._getOption("itemHoldTimeout");
  }
  set itemHoldTimeout(value) {
    this._setOption("itemHoldTimeout", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get itemTemplate() {
    return this._getOption("itemTemplate");
  }
  set itemTemplate(value) {
    this._setOption("itemTemplate", value);
  }
  get itemTitleTemplate() {
    return this._getOption("itemTitleTemplate");
  }
  set itemTitleTemplate(value) {
    this._setOption("itemTitleTemplate", value);
  }
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  get loop() {
    return this._getOption("loop");
  }
  set loop(value) {
    this._setOption("loop", value);
  }
  get noDataText() {
    return this._getOption("noDataText");
  }
  set noDataText(value) {
    this._setOption("noDataText", value);
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
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onItemClick() {
    return this._getOption("onItemClick");
  }
  set onItemClick(value) {
    this._setOption("onItemClick", value);
  }
  get onItemContextMenu() {
    return this._getOption("onItemContextMenu");
  }
  set onItemContextMenu(value) {
    this._setOption("onItemContextMenu", value);
  }
  get onItemHold() {
    return this._getOption("onItemHold");
  }
  set onItemHold(value) {
    this._setOption("onItemHold", value);
  }
  get onItemRendered() {
    return this._getOption("onItemRendered");
  }
  set onItemRendered(value) {
    this._setOption("onItemRendered", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onSelectionChanged() {
    return this._getOption("onSelectionChanged");
  }
  set onSelectionChanged(value) {
    this._setOption("onSelectionChanged", value);
  }
  get onSelectionChanging() {
    return this._getOption("onSelectionChanging");
  }
  set onSelectionChanging(value) {
    this._setOption("onSelectionChanging", value);
  }
  get onTitleClick() {
    return this._getOption("onTitleClick");
  }
  set onTitleClick(value) {
    this._setOption("onTitleClick", value);
  }
  get onTitleHold() {
    return this._getOption("onTitleHold");
  }
  set onTitleHold(value) {
    this._setOption("onTitleHold", value);
  }
  get onTitleRendered() {
    return this._getOption("onTitleRendered");
  }
  set onTitleRendered(value) {
    this._setOption("onTitleRendered", value);
  }
  get repaintChangesOnly() {
    return this._getOption("repaintChangesOnly");
  }
  set repaintChangesOnly(value) {
    this._setOption("repaintChangesOnly", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get scrollByContent() {
    return this._getOption("scrollByContent");
  }
  set scrollByContent(value) {
    this._setOption("scrollByContent", value);
  }
  get scrollingEnabled() {
    return this._getOption("scrollingEnabled");
  }
  set scrollingEnabled(value) {
    this._setOption("scrollingEnabled", value);
  }
  get selectedIndex() {
    return this._getOption("selectedIndex");
  }
  set selectedIndex(value) {
    this._setOption("selectedIndex", value);
  }
  get selectedItem() {
    return this._getOption("selectedItem");
  }
  set selectedItem(value) {
    this._setOption("selectedItem", value);
  }
  get showNavButtons() {
    return this._getOption("showNavButtons");
  }
  set showNavButtons(value) {
    this._setOption("showNavButtons", value);
  }
  get stylingMode() {
    return this._getOption("stylingMode");
  }
  set stylingMode(value) {
    this._setOption("stylingMode", value);
  }
  get swipeEnabled() {
    return this._getOption("swipeEnabled");
  }
  set swipeEnabled(value) {
    this._setOption("swipeEnabled", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get tabsPosition() {
    return this._getOption("tabsPosition");
  }
  set tabsPosition(value) {
    this._setOption("tabsPosition", value);
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
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemChange;
  get _optionPath() {
    return "tabPanelOptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "itemsChange"
    }, {
      emit: "selectedIndexChange"
    }, {
      emit: "selectedItemChange"
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
  static ɵfac = function DxoFormTabPanelOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormTabPanelOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoFormTabPanelOptionsComponent,
    selectors: [["dxo-form-tab-panel-options"]],
    contentQueries: function DxoFormTabPanelOptionsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      animationEnabled: "animationEnabled",
      dataSource: "dataSource",
      deferRendering: "deferRendering",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      iconPosition: "iconPosition",
      itemHoldTimeout: "itemHoldTimeout",
      items: "items",
      itemTemplate: "itemTemplate",
      itemTitleTemplate: "itemTitleTemplate",
      keyExpr: "keyExpr",
      loop: "loop",
      noDataText: "noDataText",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onItemClick: "onItemClick",
      onItemContextMenu: "onItemContextMenu",
      onItemHold: "onItemHold",
      onItemRendered: "onItemRendered",
      onOptionChanged: "onOptionChanged",
      onSelectionChanged: "onSelectionChanged",
      onSelectionChanging: "onSelectionChanging",
      onTitleClick: "onTitleClick",
      onTitleHold: "onTitleHold",
      onTitleRendered: "onTitleRendered",
      repaintChangesOnly: "repaintChangesOnly",
      rtlEnabled: "rtlEnabled",
      scrollByContent: "scrollByContent",
      scrollingEnabled: "scrollingEnabled",
      selectedIndex: "selectedIndex",
      selectedItem: "selectedItem",
      showNavButtons: "showNavButtons",
      stylingMode: "stylingMode",
      swipeEnabled: "swipeEnabled",
      tabIndex: "tabIndex",
      tabsPosition: "tabsPosition",
      visible: "visible",
      width: "width"
    },
    outputs: {
      itemsChange: "itemsChange",
      selectedIndexChange: "selectedIndexChange",
      selectedItemChange: "selectedItemChange"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoFormTabPanelOptionsComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormTabPanelOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-form-tab-panel-options",
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
    animationEnabled: [{
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
    iconPosition: [{
      type: Input
    }],
    itemHoldTimeout: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    itemTitleTemplate: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    loop: [{
      type: Input
    }],
    noDataText: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onItemClick: [{
      type: Input
    }],
    onItemContextMenu: [{
      type: Input
    }],
    onItemHold: [{
      type: Input
    }],
    onItemRendered: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onSelectionChanged: [{
      type: Input
    }],
    onSelectionChanging: [{
      type: Input
    }],
    onTitleClick: [{
      type: Input
    }],
    onTitleHold: [{
      type: Input
    }],
    onTitleRendered: [{
      type: Input
    }],
    repaintChangesOnly: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    scrollByContent: [{
      type: Input
    }],
    scrollingEnabled: [{
      type: Input
    }],
    selectedIndex: [{
      type: Input
    }],
    selectedItem: [{
      type: Input
    }],
    showNavButtons: [{
      type: Input
    }],
    stylingMode: [{
      type: Input
    }],
    swipeEnabled: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    tabsPosition: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    itemsChange: [{
      type: Output
    }],
    selectedIndexChange: [{
      type: Output
    }],
    selectedItemChange: [{
      type: Output
    }]
  });
})();
var DxoFormTabPanelOptionsModule = class _DxoFormTabPanelOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoFormTabPanelOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoFormTabPanelOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoFormTabPanelOptionsModule,
    imports: [DxoFormTabPanelOptionsComponent],
    exports: [DxoFormTabPanelOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoFormTabPanelOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoFormTabPanelOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoFormTabPanelOptionsComponent],
      exports: [DxoFormTabPanelOptionsComponent]
    }]
  }], null, null);
})();
var DxiFormTabbedItemComponent = class _DxiFormTabbedItemComponent extends CollectionNestedOption {
  set _tabsContentChildren(value) {
    this.setChildren("tabs", value);
  }
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get tabPanelOptions() {
    return this._getOption("tabPanelOptions");
  }
  set tabPanelOptions(value) {
    this._setOption("tabPanelOptions", value);
  }
  get tabs() {
    return this._getOption("tabs");
  }
  set tabs(value) {
    this._setOption("tabs", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get _optionPath() {
    return "items";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.itemType = "tabbed";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormTabbedItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabbedItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormTabbedItemComponent,
    selectors: [["dxi-form-tabbed-item"]],
    contentQueries: function DxiFormTabbedItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_tabs, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._tabsContentChildren = _t);
      }
    },
    inputs: {
      colSpan: "colSpan",
      cssClass: "cssClass",
      itemType: "itemType",
      name: "name",
      tabPanelOptions: "tabPanelOptions",
      tabs: "tabs",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiFormTabbedItemComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormTabbedItemComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabbedItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-tabbed-item",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiFormTabbedItemComponent
      }]
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
    _tabsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_tabs]
    }],
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    tabPanelOptions: [{
      type: Input
    }],
    tabs: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }]
  });
})();
var DxiFormTabbedItemModule = class _DxiFormTabbedItemModule {
  /** @nocollapse */
  static ɵfac = function DxiFormTabbedItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormTabbedItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormTabbedItemModule,
    imports: [DxiFormTabbedItemComponent],
    exports: [DxiFormTabbedItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormTabbedItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormTabbedItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormTabbedItemComponent],
      exports: [DxiFormTabbedItemComponent]
    }]
  }], null, null);
})();
var DxiFormValidationRuleComponent = class _DxiFormValidationRuleComponent extends CollectionNestedOption {
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get comparisonTarget() {
    return this._getOption("comparisonTarget");
  }
  set comparisonTarget(value) {
    this._setOption("comparisonTarget", value);
  }
  get comparisonType() {
    return this._getOption("comparisonType");
  }
  set comparisonType(value) {
    this._setOption("comparisonType", value);
  }
  get pattern() {
    return this._getOption("pattern");
  }
  set pattern(value) {
    this._setOption("pattern", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    this.type = "required";
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiFormValidationRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormValidationRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiFormValidationRuleComponent,
    selectors: [["dxi-form-validation-rule"]],
    inputs: {
      message: "message",
      trim: "trim",
      type: "type",
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      min: "min",
      reevaluate: "reevaluate",
      validationCallback: "validationCallback",
      comparisonTarget: "comparisonTarget",
      comparisonType: "comparisonType",
      pattern: "pattern"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_validationRules,
      useExisting: _DxiFormValidationRuleComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiFormValidationRuleComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormValidationRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-form-validation-rule",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_validationRules,
        useExisting: DxiFormValidationRuleComponent
      }]
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
    message: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }],
    comparisonTarget: [{
      type: Input
    }],
    comparisonType: [{
      type: Input
    }],
    pattern: [{
      type: Input
    }]
  });
})();
var DxiFormValidationRuleModule = class _DxiFormValidationRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiFormValidationRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiFormValidationRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiFormValidationRuleModule,
    imports: [DxiFormValidationRuleComponent],
    exports: [DxiFormValidationRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiFormValidationRuleComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiFormValidationRuleModule, [{
    type: NgModule,
    args: [{
      imports: [DxiFormValidationRuleComponent],
      exports: [DxiFormValidationRuleComponent]
    }]
  }], null, null);
})();

export {
  DxiFormAsyncRuleComponent,
  DxiFormAsyncRuleModule,
  DxiFormButtonItemComponent,
  DxiFormButtonItemModule,
  DxoFormButtonOptionsComponent,
  DxoFormButtonOptionsModule,
  DxoFormColCountByScreenComponent,
  DxoFormColCountByScreenModule,
  DxiFormCompareRuleComponent,
  DxiFormCompareRuleModule,
  DxiFormCustomRuleComponent,
  DxiFormCustomRuleModule,
  DxiFormEmailRuleComponent,
  DxiFormEmailRuleModule,
  DxiFormEmptyItemComponent,
  DxiFormEmptyItemModule,
  DxiFormGroupItemComponent,
  DxiFormGroupItemModule,
  DxiFormItemComponent,
  DxiFormItemModule,
  DxoFormLabelComponent,
  DxoFormLabelModule,
  DxiFormNumericRuleComponent,
  DxiFormNumericRuleModule,
  DxiFormPatternRuleComponent,
  DxiFormPatternRuleModule,
  DxiFormRangeRuleComponent,
  DxiFormRangeRuleModule,
  DxiFormRequiredRuleComponent,
  DxiFormRequiredRuleModule,
  DxiFormSimpleItemComponent,
  DxiFormSimpleItemModule,
  DxiFormStringLengthRuleComponent,
  DxiFormStringLengthRuleModule,
  DxiFormTabComponent,
  DxiFormTabModule,
  DxiFormTabPanelOptionsItemComponent,
  DxiFormTabPanelOptionsItemModule,
  DxoFormTabPanelOptionsComponent,
  DxoFormTabPanelOptionsModule,
  DxiFormTabbedItemComponent,
  DxiFormTabbedItemModule,
  DxiFormValidationRuleComponent,
  DxiFormValidationRuleModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-form-nested.mjs:
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
//# sourceMappingURL=chunk-SSBJGOP6.js.map
