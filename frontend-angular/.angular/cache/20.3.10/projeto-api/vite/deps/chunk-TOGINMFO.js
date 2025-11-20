import {
  PROPERTY_TOKEN_buttons,
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_menuItems
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-list-nested.mjs
var _c0 = ["*"];
var DxiListButtonComponent = class _DxiListButtonComponent extends CollectionNestedOption {
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
  static ɵfac = function DxiListButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListButtonComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiListButtonComponent,
    selectors: [["dxi-list-button"]],
    inputs: {
      location: "location",
      name: "name",
      options: "options"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_buttons,
      useExisting: _DxiListButtonComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiListButtonComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListButtonComponent, [{
    type: Component,
    args: [{
      selector: "dxi-list-button",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_buttons,
        useExisting: DxiListButtonComponent
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
var DxiListButtonModule = class _DxiListButtonModule {
  /** @nocollapse */
  static ɵfac = function DxiListButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiListButtonModule,
    imports: [DxiListButtonComponent],
    exports: [DxiListButtonComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiListButtonComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListButtonModule, [{
    type: NgModule,
    args: [{
      imports: [DxiListButtonComponent],
      exports: [DxiListButtonComponent]
    }]
  }], null, null);
})();
var DxoListCursorOffsetComponent = class _DxoListCursorOffsetComponent extends NestedOption {
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
    return "cursorOffset";
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
  static ɵfac = function DxoListCursorOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListCursorOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoListCursorOffsetComponent,
    selectors: [["dxo-list-cursor-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoListCursorOffsetComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListCursorOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-list-cursor-offset",
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
var DxoListCursorOffsetModule = class _DxoListCursorOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoListCursorOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListCursorOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoListCursorOffsetModule,
    imports: [DxoListCursorOffsetComponent],
    exports: [DxoListCursorOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoListCursorOffsetComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListCursorOffsetModule, [{
    type: NgModule,
    args: [{
      imports: [DxoListCursorOffsetComponent],
      exports: [DxoListCursorOffsetComponent]
    }]
  }], null, null);
})();
var DxoListItemDraggingComponent = class _DxoListItemDraggingComponent extends NestedOption {
  get allowDropInsideItem() {
    return this._getOption("allowDropInsideItem");
  }
  set allowDropInsideItem(value) {
    this._setOption("allowDropInsideItem", value);
  }
  get allowReordering() {
    return this._getOption("allowReordering");
  }
  set allowReordering(value) {
    this._setOption("allowReordering", value);
  }
  get autoScroll() {
    return this._getOption("autoScroll");
  }
  set autoScroll(value) {
    this._setOption("autoScroll", value);
  }
  get boundary() {
    return this._getOption("boundary");
  }
  set boundary(value) {
    this._setOption("boundary", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get cursorOffset() {
    return this._getOption("cursorOffset");
  }
  set cursorOffset(value) {
    this._setOption("cursorOffset", value);
  }
  get data() {
    return this._getOption("data");
  }
  set data(value) {
    this._setOption("data", value);
  }
  get dragDirection() {
    return this._getOption("dragDirection");
  }
  set dragDirection(value) {
    this._setOption("dragDirection", value);
  }
  get dragTemplate() {
    return this._getOption("dragTemplate");
  }
  set dragTemplate(value) {
    this._setOption("dragTemplate", value);
  }
  get dropFeedbackMode() {
    return this._getOption("dropFeedbackMode");
  }
  set dropFeedbackMode(value) {
    this._setOption("dropFeedbackMode", value);
  }
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get filter() {
    return this._getOption("filter");
  }
  set filter(value) {
    this._setOption("filter", value);
  }
  get group() {
    return this._getOption("group");
  }
  set group(value) {
    this._setOption("group", value);
  }
  get handle() {
    return this._getOption("handle");
  }
  set handle(value) {
    this._setOption("handle", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get itemOrientation() {
    return this._getOption("itemOrientation");
  }
  set itemOrientation(value) {
    this._setOption("itemOrientation", value);
  }
  get moveItemOnDrop() {
    return this._getOption("moveItemOnDrop");
  }
  set moveItemOnDrop(value) {
    this._setOption("moveItemOnDrop", value);
  }
  get onAdd() {
    return this._getOption("onAdd");
  }
  set onAdd(value) {
    this._setOption("onAdd", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onDragChange() {
    return this._getOption("onDragChange");
  }
  set onDragChange(value) {
    this._setOption("onDragChange", value);
  }
  get onDragEnd() {
    return this._getOption("onDragEnd");
  }
  set onDragEnd(value) {
    this._setOption("onDragEnd", value);
  }
  get onDragMove() {
    return this._getOption("onDragMove");
  }
  set onDragMove(value) {
    this._setOption("onDragMove", value);
  }
  get onDragStart() {
    return this._getOption("onDragStart");
  }
  set onDragStart(value) {
    this._setOption("onDragStart", value);
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
  get onRemove() {
    return this._getOption("onRemove");
  }
  set onRemove(value) {
    this._setOption("onRemove", value);
  }
  get onReorder() {
    return this._getOption("onReorder");
  }
  set onReorder(value) {
    this._setOption("onReorder", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get scrollSensitivity() {
    return this._getOption("scrollSensitivity");
  }
  set scrollSensitivity(value) {
    this._setOption("scrollSensitivity", value);
  }
  get scrollSpeed() {
    return this._getOption("scrollSpeed");
  }
  set scrollSpeed(value) {
    this._setOption("scrollSpeed", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "itemDragging";
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
  static ɵfac = function DxoListItemDraggingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListItemDraggingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoListItemDraggingComponent,
    selectors: [["dxo-list-item-dragging"]],
    inputs: {
      allowDropInsideItem: "allowDropInsideItem",
      allowReordering: "allowReordering",
      autoScroll: "autoScroll",
      boundary: "boundary",
      container: "container",
      cursorOffset: "cursorOffset",
      data: "data",
      dragDirection: "dragDirection",
      dragTemplate: "dragTemplate",
      dropFeedbackMode: "dropFeedbackMode",
      elementAttr: "elementAttr",
      filter: "filter",
      group: "group",
      handle: "handle",
      height: "height",
      itemOrientation: "itemOrientation",
      moveItemOnDrop: "moveItemOnDrop",
      onAdd: "onAdd",
      onDisposing: "onDisposing",
      onDragChange: "onDragChange",
      onDragEnd: "onDragEnd",
      onDragMove: "onDragMove",
      onDragStart: "onDragStart",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      onRemove: "onRemove",
      onReorder: "onReorder",
      rtlEnabled: "rtlEnabled",
      scrollSensitivity: "scrollSensitivity",
      scrollSpeed: "scrollSpeed",
      width: "width"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoListItemDraggingComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListItemDraggingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-list-item-dragging",
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
    allowDropInsideItem: [{
      type: Input
    }],
    allowReordering: [{
      type: Input
    }],
    autoScroll: [{
      type: Input
    }],
    boundary: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    cursorOffset: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    dragDirection: [{
      type: Input
    }],
    dragTemplate: [{
      type: Input
    }],
    dropFeedbackMode: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    filter: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    handle: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    itemOrientation: [{
      type: Input
    }],
    moveItemOnDrop: [{
      type: Input
    }],
    onAdd: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onDragChange: [{
      type: Input
    }],
    onDragEnd: [{
      type: Input
    }],
    onDragMove: [{
      type: Input
    }],
    onDragStart: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onRemove: [{
      type: Input
    }],
    onReorder: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    scrollSensitivity: [{
      type: Input
    }],
    scrollSpeed: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoListItemDraggingModule = class _DxoListItemDraggingModule {
  /** @nocollapse */
  static ɵfac = function DxoListItemDraggingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListItemDraggingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoListItemDraggingModule,
    imports: [DxoListItemDraggingComponent],
    exports: [DxoListItemDraggingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoListItemDraggingComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListItemDraggingModule, [{
    type: NgModule,
    args: [{
      imports: [DxoListItemDraggingComponent],
      exports: [DxoListItemDraggingComponent]
    }]
  }], null, null);
})();
var DxiListItemComponent = class _DxiListItemComponent extends CollectionNestedOption {
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
  get key() {
    return this._getOption("key");
  }
  set key(value) {
    this._setOption("key", value);
  }
  get showChevron() {
    return this._getOption("showChevron");
  }
  set showChevron(value) {
    this._setOption("showChevron", value);
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
  static ɵfac = function DxiListItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiListItemComponent,
    selectors: [["dxi-list-item"]],
    inputs: {
      badge: "badge",
      disabled: "disabled",
      html: "html",
      icon: "icon",
      key: "key",
      showChevron: "showChevron",
      template: "template",
      text: "text",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiListItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiListItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-list-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiListItemComponent
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
    key: [{
      type: Input
    }],
    showChevron: [{
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
var DxiListItemModule = class _DxiListItemModule {
  /** @nocollapse */
  static ɵfac = function DxiListItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiListItemModule,
    imports: [DxiListItemComponent],
    exports: [DxiListItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiListItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiListItemComponent],
      exports: [DxiListItemComponent]
    }]
  }], null, null);
})();
var DxiListMenuItemComponent = class _DxiListMenuItemComponent extends CollectionNestedOption {
  get action() {
    return this._getOption("action");
  }
  set action(value) {
    this._setOption("action", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get _optionPath() {
    return "menuItems";
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
  static ɵfac = function DxiListMenuItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListMenuItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiListMenuItemComponent,
    selectors: [["dxi-list-menu-item"]],
    inputs: {
      action: "action",
      text: "text"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_menuItems,
      useExisting: _DxiListMenuItemComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiListMenuItemComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListMenuItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-list-menu-item",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_menuItems,
        useExisting: DxiListMenuItemComponent
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
    action: [{
      type: Input
    }],
    text: [{
      type: Input
    }]
  });
})();
var DxiListMenuItemModule = class _DxiListMenuItemModule {
  /** @nocollapse */
  static ɵfac = function DxiListMenuItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiListMenuItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiListMenuItemModule,
    imports: [DxiListMenuItemComponent],
    exports: [DxiListMenuItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiListMenuItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiListMenuItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiListMenuItemComponent],
      exports: [DxiListMenuItemComponent]
    }]
  }], null, null);
})();
var DxoListOptionsComponent = class _DxoListOptionsComponent extends NestedOption {
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
  static ɵfac = function DxoListOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoListOptionsComponent,
    selectors: [["dxo-list-options"]],
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
    template: function DxoListOptionsComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-list-options",
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
var DxoListOptionsModule = class _DxoListOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoListOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoListOptionsModule,
    imports: [DxoListOptionsComponent],
    exports: [DxoListOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoListOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoListOptionsComponent],
      exports: [DxoListOptionsComponent]
    }]
  }], null, null);
})();
var DxoListSearchEditorOptionsComponent = class _DxoListSearchEditorOptionsComponent extends NestedOption {
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
  static ɵfac = function DxoListSearchEditorOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListSearchEditorOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoListSearchEditorOptionsComponent,
    selectors: [["dxo-list-search-editor-options"]],
    contentQueries: function DxoListSearchEditorOptionsComponent_ContentQueries(rf, ctx, dirIndex) {
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
    template: function DxoListSearchEditorOptionsComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListSearchEditorOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-list-search-editor-options",
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
var DxoListSearchEditorOptionsModule = class _DxoListSearchEditorOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoListSearchEditorOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoListSearchEditorOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoListSearchEditorOptionsModule,
    imports: [DxoListSearchEditorOptionsComponent],
    exports: [DxoListSearchEditorOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoListSearchEditorOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoListSearchEditorOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoListSearchEditorOptionsComponent],
      exports: [DxoListSearchEditorOptionsComponent]
    }]
  }], null, null);
})();

export {
  DxiListButtonComponent,
  DxiListButtonModule,
  DxoListCursorOffsetComponent,
  DxoListCursorOffsetModule,
  DxoListItemDraggingComponent,
  DxoListItemDraggingModule,
  DxiListItemComponent,
  DxiListItemModule,
  DxiListMenuItemComponent,
  DxiListMenuItemModule,
  DxoListOptionsComponent,
  DxoListOptionsModule,
  DxoListSearchEditorOptionsComponent,
  DxoListSearchEditorOptionsModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-list-nested.mjs:
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
//# sourceMappingURL=chunk-TOGINMFO.js.map
