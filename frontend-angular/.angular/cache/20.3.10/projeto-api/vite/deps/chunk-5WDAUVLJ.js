import {
  button_default
} from "./chunk-UQXIHJH2.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-N6JIRJK4.js";
import {
  Component,
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
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-GBBTBBS3.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-button.mjs
var _c0 = ["*"];
var DxButtonComponent = class _DxButtonComponent extends DxComponent {
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
   * Specifies whether the UI component responds to user interaction.
  
   */
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
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
   * Specifies the icon to be displayed on the button.
  
   */
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
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
   * Specifies a custom template for the Button UI component.
  
   */
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  /**
   * The text displayed on the button.
  
   */
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  /**
   * Specifies the button type.
  
   */
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  /**
   * Specifies whether the button submits an HTML form.
  
   */
  get useSubmitBehavior() {
    return this._getOption("useSubmitBehavior");
  }
  set useSubmitBehavior(value) {
    this._setOption("useSubmitBehavior", value);
  }
  /**
   * Specifies the name of the validation group to be accessed in the click event handler.
  
   */
  get validationGroup() {
    return this._getOption("validationGroup");
  }
  set validationGroup(value) {
    this._setOption("validationGroup", value);
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
  
   * A function that is executed when the Button is clicked or tapped.
  
  
   */
  onClick;
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
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
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
  disabledChange;
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
  rtlEnabledChange;
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
  useSubmitBehaviorChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  validationGroupChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._createEventEmitters([{
      subscribe: "click",
      emit: "onClick"
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
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      emit: "accessKeyChange"
    }, {
      emit: "activeStateEnabledChange"
    }, {
      emit: "disabledChange"
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
      emit: "rtlEnabledChange"
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
      emit: "useSubmitBehaviorChange"
    }, {
      emit: "validationGroupChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new button_default(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  /** @nocollapse */
  static ɵfac = function DxButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxButtonComponent,
    selectors: [["dx-button"]],
    hostAttrs: ["ngSkipHydration", "true"],
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
    outputs: {
      onClick: "onClick",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      accessKeyChange: "accessKeyChange",
      activeStateEnabledChange: "activeStateEnabledChange",
      disabledChange: "disabledChange",
      elementAttrChange: "elementAttrChange",
      focusStateEnabledChange: "focusStateEnabledChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      iconChange: "iconChange",
      rtlEnabledChange: "rtlEnabledChange",
      stylingModeChange: "stylingModeChange",
      tabIndexChange: "tabIndexChange",
      templateChange: "templateChange",
      textChange: "textChange",
      typeChange: "typeChange",
      useSubmitBehaviorChange: "useSubmitBehaviorChange",
      validationGroupChange: "validationGroupChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxButtonComponent, [{
    type: Component,
    args: [{
      selector: "dx-button",
      standalone: true,
      template: "<ng-content></ng-content>",
      host: {
        ngSkipHydration: "true"
      },
      imports: [DxIntegrationModule],
      providers: [DxTemplateHost, WatcherHelper, NestedOptionHost]
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
    }],
    onClick: [{
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
    onOptionChanged: [{
      type: Output
    }],
    accessKeyChange: [{
      type: Output
    }],
    activeStateEnabledChange: [{
      type: Output
    }],
    disabledChange: [{
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
    rtlEnabledChange: [{
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
    useSubmitBehaviorChange: [{
      type: Output
    }],
    validationGroupChange: [{
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
var DxButtonModule = class _DxButtonModule {
  /** @nocollapse */
  static ɵfac = function DxButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxButtonModule,
    imports: [DxButtonComponent, DxIntegrationModule, DxTemplateModule],
    exports: [DxButtonComponent, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxButtonComponent, DxIntegrationModule, DxTemplateModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxButtonModule, [{
    type: NgModule,
    args: [{
      imports: [DxButtonComponent, DxIntegrationModule, DxTemplateModule],
      exports: [DxButtonComponent, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxButtonComponent,
  DxButtonModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-button.mjs:
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
//# sourceMappingURL=chunk-5WDAUVLJ.js.map
