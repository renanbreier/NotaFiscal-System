import {
  PROPERTY_TOKEN_items
} from "./chunk-QTDRYW7W.js";
import {
  CollectionNestedOption,
  DxIntegrationModule,
  DxTemplateHost,
  NestedOptionHost,
  extractTemplate
} from "./chunk-N6JIRJK4.js";
import {
  Component,
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
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-GBBTBBS3.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-toolbar-nested.mjs
var _c0 = ["*"];
var DxiToolbarItemComponent = class _DxiToolbarItemComponent extends CollectionNestedOption {
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
  static ɵfac = function DxiToolbarItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiToolbarItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiToolbarItemComponent,
    selectors: [["dxi-toolbar-item"]],
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
      visible: "visible",
      widget: "widget"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost, {
      provide: PROPERTY_TOKEN_items,
      useExisting: _DxiToolbarItemComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiToolbarItemComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiToolbarItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-toolbar-item",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost, {
        provide: PROPERTY_TOKEN_items,
        useExisting: DxiToolbarItemComponent
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
    visible: [{
      type: Input
    }],
    widget: [{
      type: Input
    }]
  });
})();
var DxiToolbarItemModule = class _DxiToolbarItemModule {
  /** @nocollapse */
  static ɵfac = function DxiToolbarItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiToolbarItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiToolbarItemModule,
    imports: [DxiToolbarItemComponent],
    exports: [DxiToolbarItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiToolbarItemComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiToolbarItemModule, [{
    type: NgModule,
    args: [{
      imports: [DxiToolbarItemComponent],
      exports: [DxiToolbarItemComponent]
    }]
  }], null, null);
})();

export {
  DxiToolbarItemComponent,
  DxiToolbarItemModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-toolbar-nested.mjs:
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
//# sourceMappingURL=chunk-5VCVL2VT.js.map
