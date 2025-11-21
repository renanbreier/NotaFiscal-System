import {
  DxiToolbarItemModule
} from "./chunk-ITABAN43.js";
import {
  toolbar_default
} from "./chunk-TVIBT7BP.js";
import {
  DxiItemModule
} from "./chunk-VHPDO6NT.js";
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-toolbar.mjs
var DxToolbarComponent = class _DxToolbarComponent extends DxComponent {
  _watcherHelper;
  _idh;
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  instance = null;
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
   * Specifies the global attributes to be attached to the UI component&apos;s container element.
  
   */
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
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
   * The time period in milliseconds before the onItemHold event is raised.
  
   */
  get itemHoldTimeout() {
    return this._getOption("itemHoldTimeout");
  }
  set itemHoldTimeout(value) {
    this._setOption("itemHoldTimeout", value);
  }
  /**
   * An array of items displayed by the UI component.
  
   */
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
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
   * Specifies a custom template for menu items.
  
   */
  get menuItemTemplate() {
    return this._getOption("menuItemTemplate");
  }
  set menuItemTemplate(value) {
    this._setOption("menuItemTemplate", value);
  }
  /**
   * Specifies whether or not the Toolbar arranges items into multiple lines when their combined width exceeds the Toolbar width.
  
   */
  get multiline() {
    return this._getOption("multiline");
  }
  set multiline(value) {
    this._setOption("multiline", value);
  }
  /**
   * Specifies the text or HTML markup displayed by the UI component if the item collection is empty.
  
   */
  get noDataText() {
    return this._getOption("noDataText");
  }
  set noDataText(value) {
    this._setOption("noDataText", value);
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
  
   * A function that is executed when a collection item is clicked or tapped.
  
  
   */
  onItemClick;
  /**
  
   * A function that is executed when a collection item is right-clicked or pressed.
  
  
   */
  onItemContextMenu;
  /**
  
   * A function that is executed when a collection item has been held for a specified period.
  
  
   */
  onItemHold;
  /**
  
   * A function that is executed after a collection item is rendered.
  
  
   */
  onItemRendered;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
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
  elementAttrChange;
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
  itemHoldTimeoutChange;
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
  menuItemTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  multilineChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  noDataTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
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
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "itemClick",
      emit: "onItemClick"
    }, {
      subscribe: "itemContextMenu",
      emit: "onItemContextMenu"
    }, {
      subscribe: "itemHold",
      emit: "onItemHold"
    }, {
      subscribe: "itemRendered",
      emit: "onItemRendered"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      emit: "dataSourceChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "itemHoldTimeoutChange"
    }, {
      emit: "itemsChange"
    }, {
      emit: "itemTemplateChange"
    }, {
      emit: "menuItemTemplateChange"
    }, {
      emit: "multilineChange"
    }, {
      emit: "noDataTextChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    this._idh.setHost(this);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new toolbar_default(element, options);
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
  static ɵfac = function DxToolbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxToolbarComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(IterableDifferHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxToolbarComponent,
    selectors: [["dx-toolbar"]],
    contentQueries: function DxToolbarComponent_ContentQueries(rf, ctx, dirIndex) {
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
      dataSource: "dataSource",
      disabled: "disabled",
      elementAttr: "elementAttr",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      itemHoldTimeout: "itemHoldTimeout",
      items: "items",
      itemTemplate: "itemTemplate",
      menuItemTemplate: "menuItemTemplate",
      multiline: "multiline",
      noDataText: "noDataText",
      rtlEnabled: "rtlEnabled",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onItemClick: "onItemClick",
      onItemContextMenu: "onItemContextMenu",
      onItemHold: "onItemHold",
      onItemRendered: "onItemRendered",
      onOptionChanged: "onOptionChanged",
      dataSourceChange: "dataSourceChange",
      disabledChange: "disabledChange",
      elementAttrChange: "elementAttrChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      itemHoldTimeoutChange: "itemHoldTimeoutChange",
      itemsChange: "itemsChange",
      itemTemplateChange: "itemTemplateChange",
      menuItemTemplateChange: "menuItemTemplateChange",
      multilineChange: "multilineChange",
      noDataTextChange: "noDataTextChange",
      rtlEnabledChange: "rtlEnabledChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxToolbarComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxToolbarComponent, [{
    type: Component,
    args: [{
      selector: "dx-toolbar",
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
    dataSource: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
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
    menuItemTemplate: [{
      type: Input
    }],
    multiline: [{
      type: Input
    }],
    noDataText: [{
      type: Input
    }],
    rtlEnabled: [{
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
    onInitialized: [{
      type: Output
    }],
    onItemClick: [{
      type: Output
    }],
    onItemContextMenu: [{
      type: Output
    }],
    onItemHold: [{
      type: Output
    }],
    onItemRendered: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    dataSourceChange: [{
      type: Output
    }],
    disabledChange: [{
      type: Output
    }],
    elementAttrChange: [{
      type: Output
    }],
    hintChange: [{
      type: Output
    }],
    hoverStateEnabledChange: [{
      type: Output
    }],
    itemHoldTimeoutChange: [{
      type: Output
    }],
    itemsChange: [{
      type: Output
    }],
    itemTemplateChange: [{
      type: Output
    }],
    menuItemTemplateChange: [{
      type: Output
    }],
    multilineChange: [{
      type: Output
    }],
    noDataTextChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
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
var DxToolbarModule = class _DxToolbarModule {
  /** @nocollapse */
  static ɵfac = function DxToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxToolbarModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxToolbarModule,
    imports: [DxToolbarComponent, DxiItemModule, DxiToolbarItemModule, DxIntegrationModule, DxTemplateModule],
    exports: [DxToolbarComponent, DxiItemModule, DxiToolbarItemModule, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxToolbarComponent, DxiItemModule, DxiToolbarItemModule, DxIntegrationModule, DxTemplateModule, DxiItemModule, DxiToolbarItemModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [DxToolbarComponent, DxiItemModule, DxiToolbarItemModule, DxIntegrationModule, DxTemplateModule],
      exports: [DxToolbarComponent, DxiItemModule, DxiToolbarItemModule, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxToolbarComponent,
  DxToolbarModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-toolbar.mjs:
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
//# sourceMappingURL=chunk-5NF5C2XT.js.map
