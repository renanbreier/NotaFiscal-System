import {
  PROPERTY_TOKEN_buttons,
  PROPERTY_TOKEN_items
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-tree-view-nested.mjs
var _c0 = ["*"];
var DxiTreeViewButtonComponent = class _DxiTreeViewButtonComponent extends CollectionNestedOption {
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get _optionPath() {
    return "buttons";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiTreeViewButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTreeViewButtonComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiTreeViewButtonComponent,
    selectors: [["dxi-tree-view-button"]],
    inputs: {
      location: "location",
      name: "name",
      options: "options"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_buttons,
      useExisting: _DxiTreeViewButtonComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiTreeViewButtonComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTreeViewButtonComponent, [{
    type: Component,
    args: [{
      selector: "dxi-tree-view-button",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_buttons,
        useExisting: DxiTreeViewButtonComponent
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
    location: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    options: [{
      type: Input
    }]
  });
})();
var DxiTreeViewButtonModule = class _DxiTreeViewButtonModule {
  /** @nocollapse */
  static ɵfac = function DxiTreeViewButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTreeViewButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiTreeViewButtonModule,
    imports: [DxiTreeViewButtonComponent],
    exports: [DxiTreeViewButtonComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiTreeViewButtonComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTreeViewButtonModule, [{
    type: NgModule,
    args: [{
      imports: [DxiTreeViewButtonComponent],
      exports: [DxiTreeViewButtonComponent]
    }]
  }], null, null);
})();
var DxiTreeViewItemComponent = class _DxiTreeViewItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get expanded() {
    return this._getOption("expanded");
  }
  set expanded(value) {
    this._setOption("expanded", value);
  }
  get hasItems() {
    return this._getOption("hasItems");
  }
  set hasItems(value) {
    this._setOption("hasItems", value);
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
  get id() {
    return this._getOption("id");
  }
  set id(value) {
    this._setOption("id", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get parentId() {
    return this._getOption("parentId");
  }
  set parentId(value) {
    this._setOption("parentId", value);
  }
  get selected() {
    return this._getOption("selected");
  }
  set selected(value) {
    this._setOption("selected", value);
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
  static ɵfac = function DxiTreeViewItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTreeViewItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiTreeViewItemComponent,
    selectors: [["dxi-tree-view-item"]],
    contentQueries: function DxiTreeViewItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      disabled: "disabled",
      expanded: "expanded",
      hasItems: "hasItems",
      html: "html",
      icon: "icon",
      id: "id",
      items: "items",
      parentId: "parentId",
      selected: "selected",
      template: "template",
      text: "text",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiTreeViewItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiTreeViewItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTreeViewItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-tree-view-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiTreeViewItemComponent
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
    disabled: [{
      type: Input
    }],
    expanded: [{
      type: Input
    }],
    hasItems: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    parentId: [{
      type: Input
    }],
    selected: [{
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
var DxiTreeViewItemModule = class _DxiTreeViewItemModule {
  /** @nocollapse */
  static ɵfac = function DxiTreeViewItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTreeViewItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiTreeViewItemModule,
    imports: [DxiTreeViewItemComponent],
    exports: [DxiTreeViewItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiTreeViewItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTreeViewItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiTreeViewItemComponent],
      exports: [DxiTreeViewItemComponent]
    }]
  }], null, null);
})();
var DxoTreeViewOptionsComponent = class _DxoTreeViewOptionsComponent extends NestedOption {
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
    return "options";
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
  static ɵfac = function DxoTreeViewOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTreeViewOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoTreeViewOptionsComponent,
    selectors: [["dxo-tree-view-options"]],
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
    template: function DxoTreeViewOptionsComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTreeViewOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-tree-view-options",
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
var DxoTreeViewOptionsModule = class _DxoTreeViewOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoTreeViewOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTreeViewOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoTreeViewOptionsModule,
    imports: [DxoTreeViewOptionsComponent],
    exports: [DxoTreeViewOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoTreeViewOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTreeViewOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoTreeViewOptionsComponent],
      exports: [DxoTreeViewOptionsComponent]
    }]
  }], null, null);
})();
var DxoTreeViewSearchEditorOptionsComponent = class _DxoTreeViewSearchEditorOptionsComponent extends NestedOption {
  set _buttonsContentChildren(value) {
    this.setChildren("buttons", value);
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
  get buttons() {
    return this._getOption("buttons");
  }
  set buttons(value) {
    this._setOption("buttons", value);
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
  get inputAttr() {
    return this._getOption("inputAttr");
  }
  set inputAttr(value) {
    this._setOption("inputAttr", value);
  }
  get isDirty() {
    return this._getOption("isDirty");
  }
  set isDirty(value) {
    this._setOption("isDirty", value);
  }
  get isValid() {
    return this._getOption("isValid");
  }
  set isValid(value) {
    this._setOption("isValid", value);
  }
  get label() {
    return this._getOption("label");
  }
  set label(value) {
    this._setOption("label", value);
  }
  get labelMode() {
    return this._getOption("labelMode");
  }
  set labelMode(value) {
    this._setOption("labelMode", value);
  }
  get mask() {
    return this._getOption("mask");
  }
  set mask(value) {
    this._setOption("mask", value);
  }
  get maskChar() {
    return this._getOption("maskChar");
  }
  set maskChar(value) {
    this._setOption("maskChar", value);
  }
  get maskInvalidMessage() {
    return this._getOption("maskInvalidMessage");
  }
  set maskInvalidMessage(value) {
    this._setOption("maskInvalidMessage", value);
  }
  get maskRules() {
    return this._getOption("maskRules");
  }
  set maskRules(value) {
    this._setOption("maskRules", value);
  }
  get maxLength() {
    return this._getOption("maxLength");
  }
  set maxLength(value) {
    this._setOption("maxLength", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get onChange() {
    return this._getOption("onChange");
  }
  set onChange(value) {
    this._setOption("onChange", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onCopy() {
    return this._getOption("onCopy");
  }
  set onCopy(value) {
    this._setOption("onCopy", value);
  }
  get onCut() {
    return this._getOption("onCut");
  }
  set onCut(value) {
    this._setOption("onCut", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onEnterKey() {
    return this._getOption("onEnterKey");
  }
  set onEnterKey(value) {
    this._setOption("onEnterKey", value);
  }
  get onFocusIn() {
    return this._getOption("onFocusIn");
  }
  set onFocusIn(value) {
    this._setOption("onFocusIn", value);
  }
  get onFocusOut() {
    return this._getOption("onFocusOut");
  }
  set onFocusOut(value) {
    this._setOption("onFocusOut", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onInput() {
    return this._getOption("onInput");
  }
  set onInput(value) {
    this._setOption("onInput", value);
  }
  get onKeyDown() {
    return this._getOption("onKeyDown");
  }
  set onKeyDown(value) {
    this._setOption("onKeyDown", value);
  }
  get onKeyUp() {
    return this._getOption("onKeyUp");
  }
  set onKeyUp(value) {
    this._setOption("onKeyUp", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onPaste() {
    return this._getOption("onPaste");
  }
  set onPaste(value) {
    this._setOption("onPaste", value);
  }
  get onValueChanged() {
    return this._getOption("onValueChanged");
  }
  set onValueChanged(value) {
    this._setOption("onValueChanged", value);
  }
  get placeholder() {
    return this._getOption("placeholder");
  }
  set placeholder(value) {
    this._setOption("placeholder", value);
  }
  get readOnly() {
    return this._getOption("readOnly");
  }
  set readOnly(value) {
    this._setOption("readOnly", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get showClearButton() {
    return this._getOption("showClearButton");
  }
  set showClearButton(value) {
    this._setOption("showClearButton", value);
  }
  get showMaskMode() {
    return this._getOption("showMaskMode");
  }
  set showMaskMode(value) {
    this._setOption("showMaskMode", value);
  }
  get spellcheck() {
    return this._getOption("spellcheck");
  }
  set spellcheck(value) {
    this._setOption("spellcheck", value);
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
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get useMaskedValue() {
    return this._getOption("useMaskedValue");
  }
  set useMaskedValue(value) {
    this._setOption("useMaskedValue", value);
  }
  get validationError() {
    return this._getOption("validationError");
  }
  set validationError(value) {
    this._setOption("validationError", value);
  }
  get validationErrors() {
    return this._getOption("validationErrors");
  }
  set validationErrors(value) {
    this._setOption("validationErrors", value);
  }
  get validationMessageMode() {
    return this._getOption("validationMessageMode");
  }
  set validationMessageMode(value) {
    this._setOption("validationMessageMode", value);
  }
  get validationMessagePosition() {
    return this._getOption("validationMessagePosition");
  }
  set validationMessagePosition(value) {
    this._setOption("validationMessagePosition", value);
  }
  get validationStatus() {
    return this._getOption("validationStatus");
  }
  set validationStatus(value) {
    this._setOption("validationStatus", value);
  }
  get value() {
    return this._getOption("value");
  }
  set value(value) {
    this._setOption("value", value);
  }
  get valueChangeEvent() {
    return this._getOption("valueChangeEvent");
  }
  set valueChangeEvent(value) {
    this._setOption("valueChangeEvent", value);
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
  valueChange;
  get _optionPath() {
    return "searchEditorOptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "valueChange"
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
  static ɵfac = function DxoTreeViewSearchEditorOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTreeViewSearchEditorOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoTreeViewSearchEditorOptionsComponent,
    selectors: [["dxo-tree-view-search-editor-options"]],
    contentQueries: function DxoTreeViewSearchEditorOptionsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_buttons, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._buttonsContentChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      buttons: "buttons",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      inputAttr: "inputAttr",
      isDirty: "isDirty",
      isValid: "isValid",
      label: "label",
      labelMode: "labelMode",
      mask: "mask",
      maskChar: "maskChar",
      maskInvalidMessage: "maskInvalidMessage",
      maskRules: "maskRules",
      maxLength: "maxLength",
      mode: "mode",
      name: "name",
      onChange: "onChange",
      onContentReady: "onContentReady",
      onCopy: "onCopy",
      onCut: "onCut",
      onDisposing: "onDisposing",
      onEnterKey: "onEnterKey",
      onFocusIn: "onFocusIn",
      onFocusOut: "onFocusOut",
      onInitialized: "onInitialized",
      onInput: "onInput",
      onKeyDown: "onKeyDown",
      onKeyUp: "onKeyUp",
      onOptionChanged: "onOptionChanged",
      onPaste: "onPaste",
      onValueChanged: "onValueChanged",
      placeholder: "placeholder",
      readOnly: "readOnly",
      rtlEnabled: "rtlEnabled",
      showClearButton: "showClearButton",
      showMaskMode: "showMaskMode",
      spellcheck: "spellcheck",
      stylingMode: "stylingMode",
      tabIndex: "tabIndex",
      text: "text",
      useMaskedValue: "useMaskedValue",
      validationError: "validationError",
      validationErrors: "validationErrors",
      validationMessageMode: "validationMessageMode",
      validationMessagePosition: "validationMessagePosition",
      validationStatus: "validationStatus",
      value: "value",
      valueChangeEvent: "valueChangeEvent",
      visible: "visible",
      width: "width"
    },
    outputs: {
      valueChange: "valueChange"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoTreeViewSearchEditorOptionsComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTreeViewSearchEditorOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-tree-view-search-editor-options",
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
    _buttonsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_buttons]
    }],
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    buttons: [{
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
    inputAttr: [{
      type: Input
    }],
    isDirty: [{
      type: Input
    }],
    isValid: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    labelMode: [{
      type: Input
    }],
    mask: [{
      type: Input
    }],
    maskChar: [{
      type: Input
    }],
    maskInvalidMessage: [{
      type: Input
    }],
    maskRules: [{
      type: Input
    }],
    maxLength: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    onChange: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onCopy: [{
      type: Input
    }],
    onCut: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onEnterKey: [{
      type: Input
    }],
    onFocusIn: [{
      type: Input
    }],
    onFocusOut: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onInput: [{
      type: Input
    }],
    onKeyDown: [{
      type: Input
    }],
    onKeyUp: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onPaste: [{
      type: Input
    }],
    onValueChanged: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    readOnly: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    showClearButton: [{
      type: Input
    }],
    showMaskMode: [{
      type: Input
    }],
    spellcheck: [{
      type: Input
    }],
    stylingMode: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    useMaskedValue: [{
      type: Input
    }],
    validationError: [{
      type: Input
    }],
    validationErrors: [{
      type: Input
    }],
    validationMessageMode: [{
      type: Input
    }],
    validationMessagePosition: [{
      type: Input
    }],
    validationStatus: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    valueChangeEvent: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }]
  });
})();
var DxoTreeViewSearchEditorOptionsModule = class _DxoTreeViewSearchEditorOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoTreeViewSearchEditorOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTreeViewSearchEditorOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoTreeViewSearchEditorOptionsModule,
    imports: [DxoTreeViewSearchEditorOptionsComponent],
    exports: [DxoTreeViewSearchEditorOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoTreeViewSearchEditorOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTreeViewSearchEditorOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoTreeViewSearchEditorOptionsComponent],
      exports: [DxoTreeViewSearchEditorOptionsComponent]
    }]
  }], null, null);
})();

export {
  DxiTreeViewButtonComponent,
  DxiTreeViewButtonModule,
  DxiTreeViewItemComponent,
  DxiTreeViewItemModule,
  DxoTreeViewOptionsComponent,
  DxoTreeViewOptionsModule,
  DxoTreeViewSearchEditorOptionsComponent,
  DxoTreeViewSearchEditorOptionsModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-tree-view-nested.mjs:
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
//# sourceMappingURL=chunk-ONL3PTUA.js.map
