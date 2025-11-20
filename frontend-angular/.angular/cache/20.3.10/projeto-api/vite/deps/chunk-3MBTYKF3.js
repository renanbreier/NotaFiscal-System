import {
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-context-menu-nested.mjs
var _c0 = ["*"];
var DxoContextMenuAnimationComponent = class _DxoContextMenuAnimationComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuAnimationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuAnimationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuAnimationComponent,
    selectors: [["dxo-context-menu-animation"]],
    inputs: {
      hide: "hide",
      show: "show"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuAnimationComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuAnimationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-animation",
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
var DxoContextMenuAnimationModule = class _DxoContextMenuAnimationModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuAnimationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuAnimationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuAnimationModule,
    imports: [DxoContextMenuAnimationComponent],
    exports: [DxoContextMenuAnimationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuAnimationComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuAnimationModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuAnimationComponent],
      exports: [DxoContextMenuAnimationComponent]
    }]
  }], null, null);
})();
var DxoContextMenuAtComponent = class _DxoContextMenuAtComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuAtComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuAtComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuAtComponent,
    selectors: [["dxo-context-menu-at"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuAtComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuAtComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-at",
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
var DxoContextMenuAtModule = class _DxoContextMenuAtModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuAtModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuAtModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuAtModule,
    imports: [DxoContextMenuAtComponent],
    exports: [DxoContextMenuAtComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuAtComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuAtModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuAtComponent],
      exports: [DxoContextMenuAtComponent]
    }]
  }], null, null);
})();
var DxoContextMenuBoundaryOffsetComponent = class _DxoContextMenuBoundaryOffsetComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuBoundaryOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuBoundaryOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuBoundaryOffsetComponent,
    selectors: [["dxo-context-menu-boundary-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuBoundaryOffsetComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuBoundaryOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-boundary-offset",
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
var DxoContextMenuBoundaryOffsetModule = class _DxoContextMenuBoundaryOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuBoundaryOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuBoundaryOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuBoundaryOffsetModule,
    imports: [DxoContextMenuBoundaryOffsetComponent],
    exports: [DxoContextMenuBoundaryOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuBoundaryOffsetComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuBoundaryOffsetModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuBoundaryOffsetComponent],
      exports: [DxoContextMenuBoundaryOffsetComponent]
    }]
  }], null, null);
})();
var DxoContextMenuCollisionComponent = class _DxoContextMenuCollisionComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuCollisionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuCollisionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuCollisionComponent,
    selectors: [["dxo-context-menu-collision"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuCollisionComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuCollisionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-collision",
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
var DxoContextMenuCollisionModule = class _DxoContextMenuCollisionModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuCollisionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuCollisionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuCollisionModule,
    imports: [DxoContextMenuCollisionComponent],
    exports: [DxoContextMenuCollisionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuCollisionComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuCollisionModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuCollisionComponent],
      exports: [DxoContextMenuCollisionComponent]
    }]
  }], null, null);
})();
var DxoContextMenuDelayComponent = class _DxoContextMenuDelayComponent extends NestedOption {
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
    return "delay";
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
  static ɵfac = function DxoContextMenuDelayComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuDelayComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuDelayComponent,
    selectors: [["dxo-context-menu-delay"]],
    inputs: {
      hide: "hide",
      show: "show"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuDelayComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuDelayComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-delay",
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
var DxoContextMenuDelayModule = class _DxoContextMenuDelayModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuDelayModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuDelayModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuDelayModule,
    imports: [DxoContextMenuDelayComponent],
    exports: [DxoContextMenuDelayComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuDelayComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuDelayModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuDelayComponent],
      exports: [DxoContextMenuDelayComponent]
    }]
  }], null, null);
})();
var DxoContextMenuFromComponent = class _DxoContextMenuFromComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuFromComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuFromComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuFromComponent,
    selectors: [["dxo-context-menu-from"]],
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
    template: function DxoContextMenuFromComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuFromComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-from",
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
var DxoContextMenuFromModule = class _DxoContextMenuFromModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuFromModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuFromModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuFromModule,
    imports: [DxoContextMenuFromComponent],
    exports: [DxoContextMenuFromComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuFromComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuFromModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuFromComponent],
      exports: [DxoContextMenuFromComponent]
    }]
  }], null, null);
})();
var DxoContextMenuHideComponent = class _DxoContextMenuHideComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuHideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuHideComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuHideComponent,
    selectors: [["dxo-context-menu-hide"]],
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
    template: function DxoContextMenuHideComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuHideComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-hide",
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
var DxoContextMenuHideModule = class _DxoContextMenuHideModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuHideModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuHideModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuHideModule,
    imports: [DxoContextMenuHideComponent],
    exports: [DxoContextMenuHideComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuHideComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuHideModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuHideComponent],
      exports: [DxoContextMenuHideComponent]
    }]
  }], null, null);
})();
var DxiContextMenuItemComponent = class _DxiContextMenuItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  get beginGroup() {
    return this._getOption("beginGroup");
  }
  set beginGroup(value) {
    this._setOption("beginGroup", value);
  }
  get closeMenuOnClick() {
    return this._getOption("closeMenuOnClick");
  }
  set closeMenuOnClick(value) {
    this._setOption("closeMenuOnClick", value);
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
  get selectable() {
    return this._getOption("selectable");
  }
  set selectable(value) {
    this._setOption("selectable", value);
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
  static ɵfac = function DxiContextMenuItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiContextMenuItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiContextMenuItemComponent,
    selectors: [["dxi-context-menu-item"]],
    contentQueries: function DxiContextMenuItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
      }
    },
    inputs: {
      beginGroup: "beginGroup",
      closeMenuOnClick: "closeMenuOnClick",
      disabled: "disabled",
      icon: "icon",
      items: "items",
      selectable: "selectable",
      selected: "selected",
      template: "template",
      text: "text",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiContextMenuItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiContextMenuItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiContextMenuItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-context-menu-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiContextMenuItemComponent
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
    beginGroup: [{
      type: Input
    }],
    closeMenuOnClick: [{
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
    selectable: [{
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
var DxiContextMenuItemModule = class _DxiContextMenuItemModule {
  /** @nocollapse */
  static ɵfac = function DxiContextMenuItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiContextMenuItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiContextMenuItemModule,
    imports: [DxiContextMenuItemComponent],
    exports: [DxiContextMenuItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiContextMenuItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiContextMenuItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiContextMenuItemComponent],
      exports: [DxiContextMenuItemComponent]
    }]
  }], null, null);
})();
var DxoContextMenuMyComponent = class _DxoContextMenuMyComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuMyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuMyComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuMyComponent,
    selectors: [["dxo-context-menu-my"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuMyComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuMyComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-my",
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
var DxoContextMenuMyModule = class _DxoContextMenuMyModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuMyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuMyModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuMyModule,
    imports: [DxoContextMenuMyComponent],
    exports: [DxoContextMenuMyComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuMyComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuMyModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuMyComponent],
      exports: [DxoContextMenuMyComponent]
    }]
  }], null, null);
})();
var DxoContextMenuOffsetComponent = class _DxoContextMenuOffsetComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuOffsetComponent,
    selectors: [["dxo-context-menu-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuOffsetComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-offset",
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
var DxoContextMenuOffsetModule = class _DxoContextMenuOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuOffsetModule,
    imports: [DxoContextMenuOffsetComponent],
    exports: [DxoContextMenuOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuOffsetComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuOffsetModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuOffsetComponent],
      exports: [DxoContextMenuOffsetComponent]
    }]
  }], null, null);
})();
var DxoContextMenuPositionComponent = class _DxoContextMenuPositionComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuPositionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuPositionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuPositionComponent,
    selectors: [["dxo-context-menu-position"]],
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
    template: function DxoContextMenuPositionComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuPositionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-position",
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
var DxoContextMenuPositionModule = class _DxoContextMenuPositionModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuPositionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuPositionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuPositionModule,
    imports: [DxoContextMenuPositionComponent],
    exports: [DxoContextMenuPositionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuPositionComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuPositionModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuPositionComponent],
      exports: [DxoContextMenuPositionComponent]
    }]
  }], null, null);
})();
var DxoContextMenuShowEventComponent = class _DxoContextMenuShowEventComponent extends NestedOption {
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get _optionPath() {
    return "showEvent";
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
  static ɵfac = function DxoContextMenuShowEventComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowEventComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuShowEventComponent,
    selectors: [["dxo-context-menu-show-event"]],
    inputs: {
      delay: "delay",
      name: "name"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuShowEventComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowEventComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-show-event",
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
    delay: [{
      type: Input
    }],
    name: [{
      type: Input
    }]
  });
})();
var DxoContextMenuShowEventModule = class _DxoContextMenuShowEventModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuShowEventModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowEventModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuShowEventModule,
    imports: [DxoContextMenuShowEventComponent],
    exports: [DxoContextMenuShowEventComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuShowEventComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowEventModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuShowEventComponent],
      exports: [DxoContextMenuShowEventComponent]
    }]
  }], null, null);
})();
var DxoContextMenuShowSubmenuModeComponent = class _DxoContextMenuShowSubmenuModeComponent extends NestedOption {
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get _optionPath() {
    return "showSubmenuMode";
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
  static ɵfac = function DxoContextMenuShowSubmenuModeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowSubmenuModeComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuShowSubmenuModeComponent,
    selectors: [["dxo-context-menu-show-submenu-mode"]],
    inputs: {
      delay: "delay",
      name: "name"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoContextMenuShowSubmenuModeComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowSubmenuModeComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-show-submenu-mode",
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
    delay: [{
      type: Input
    }],
    name: [{
      type: Input
    }]
  });
})();
var DxoContextMenuShowSubmenuModeModule = class _DxoContextMenuShowSubmenuModeModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuShowSubmenuModeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowSubmenuModeModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuShowSubmenuModeModule,
    imports: [DxoContextMenuShowSubmenuModeComponent],
    exports: [DxoContextMenuShowSubmenuModeComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuShowSubmenuModeComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowSubmenuModeModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuShowSubmenuModeComponent],
      exports: [DxoContextMenuShowSubmenuModeComponent]
    }]
  }], null, null);
})();
var DxoContextMenuShowComponent = class _DxoContextMenuShowComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuShowComponent,
    selectors: [["dxo-context-menu-show"]],
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
    template: function DxoContextMenuShowComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-show",
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
var DxoContextMenuShowModule = class _DxoContextMenuShowModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuShowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuShowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuShowModule,
    imports: [DxoContextMenuShowComponent],
    exports: [DxoContextMenuShowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuShowComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuShowModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuShowComponent],
      exports: [DxoContextMenuShowComponent]
    }]
  }], null, null);
})();
var DxoContextMenuToComponent = class _DxoContextMenuToComponent extends NestedOption {
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
  static ɵfac = function DxoContextMenuToComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuToComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoContextMenuToComponent,
    selectors: [["dxo-context-menu-to"]],
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
    template: function DxoContextMenuToComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuToComponent, [{
    type: Component,
    args: [{
      selector: "dxo-context-menu-to",
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
var DxoContextMenuToModule = class _DxoContextMenuToModule {
  /** @nocollapse */
  static ɵfac = function DxoContextMenuToModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoContextMenuToModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoContextMenuToModule,
    imports: [DxoContextMenuToComponent],
    exports: [DxoContextMenuToComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoContextMenuToComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoContextMenuToModule, [{
    type: NgModule,
    args: [{
      imports: [DxoContextMenuToComponent],
      exports: [DxoContextMenuToComponent]
    }]
  }], null, null);
})();

export {
  DxoContextMenuAnimationComponent,
  DxoContextMenuAnimationModule,
  DxoContextMenuAtComponent,
  DxoContextMenuAtModule,
  DxoContextMenuBoundaryOffsetComponent,
  DxoContextMenuBoundaryOffsetModule,
  DxoContextMenuCollisionComponent,
  DxoContextMenuCollisionModule,
  DxoContextMenuDelayComponent,
  DxoContextMenuDelayModule,
  DxoContextMenuFromComponent,
  DxoContextMenuFromModule,
  DxoContextMenuHideComponent,
  DxoContextMenuHideModule,
  DxiContextMenuItemComponent,
  DxiContextMenuItemModule,
  DxoContextMenuMyComponent,
  DxoContextMenuMyModule,
  DxoContextMenuOffsetComponent,
  DxoContextMenuOffsetModule,
  DxoContextMenuPositionComponent,
  DxoContextMenuPositionModule,
  DxoContextMenuShowEventComponent,
  DxoContextMenuShowEventModule,
  DxoContextMenuShowSubmenuModeComponent,
  DxoContextMenuShowSubmenuModeModule,
  DxoContextMenuShowComponent,
  DxoContextMenuShowModule,
  DxoContextMenuToComponent,
  DxoContextMenuToModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-context-menu-nested.mjs:
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
//# sourceMappingURL=chunk-3MBTYKF3.js.map
