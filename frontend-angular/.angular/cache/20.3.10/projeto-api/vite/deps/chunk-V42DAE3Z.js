import {
  DxiFormAsyncRuleModule,
  DxiFormButtonItemModule,
  DxiFormCompareRuleModule,
  DxiFormCustomRuleModule,
  DxiFormEmailRuleModule,
  DxiFormEmptyItemModule,
  DxiFormGroupItemModule,
  DxiFormItemModule,
  DxiFormNumericRuleModule,
  DxiFormPatternRuleModule,
  DxiFormRangeRuleModule,
  DxiFormRequiredRuleModule,
  DxiFormSimpleItemModule,
  DxiFormStringLengthRuleModule,
  DxiFormTabModule,
  DxiFormTabPanelOptionsItemModule,
  DxiFormTabbedItemModule,
  DxiFormValidationRuleModule,
  DxoFormButtonOptionsModule,
  DxoFormColCountByScreenModule,
  DxoFormLabelModule,
  DxoFormTabPanelOptionsModule
} from "./chunk-KGMM6NMT.js";
import {
  form_default
} from "./chunk-PVKBANVU.js";
import {
  DxiItemModule,
  DxiTabModule,
  DxiValidationRuleModule,
  DxoButtonOptionsModule,
  DxoColCountByScreenModule,
  DxoLabelModule,
  DxoTabPanelOptionsModule
} from "./chunk-VHPDO6NT.js";
import {
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_tabs,
  PROPERTY_TOKEN_validationRules
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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-form.mjs
var DxFormComponent = class _DxFormComponent extends DxComponent {
  _watcherHelper;
  _idh;
  set _validationRulesContentChildren(value) {
    this.setChildren("validationRules", value);
  }
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  set _tabsContentChildren(value) {
    this.setChildren("tabs", value);
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
   * Specifies whether all item labels are aligned. Applies only to labels outside their editors (see labelMode).
  
   */
  get alignItemLabels() {
    return this._getOption("alignItemLabels");
  }
  set alignItemLabels(value) {
    this._setOption("alignItemLabels", value);
  }
  /**
   * Specifies whether item labels in all groups are aligned. Applies only to labels outside their editors (see labelMode).
  
   */
  get alignItemLabelsInAllGroups() {
    return this._getOption("alignItemLabelsInAllGroups");
  }
  set alignItemLabelsInAllGroups(value) {
    this._setOption("alignItemLabelsInAllGroups", value);
  }
  /**
   * The count of columns in the form layout.
  
   */
  get colCount() {
    return this._getOption("colCount");
  }
  set colCount(value) {
    this._setOption("colCount", value);
  }
  /**
   * Specifies dependency between the screen factor and the count of columns in the form layout.
  
   */
  get colCountByScreen() {
    return this._getOption("colCountByScreen");
  }
  set colCountByScreen(value) {
    this._setOption("colCountByScreen", value);
  }
  /**
   * Specifies a function that customizes a form item after it has been created.
  
   */
  get customizeItem() {
    return this._getOption("customizeItem");
  }
  set customizeItem(value) {
    this._setOption("customizeItem", value);
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
   * Provides the Form&apos;s data. Gets updated every time form fields change.
  
   */
  get formData() {
    return this._getOption("formData");
  }
  set formData(value) {
    this._setOption("formData", value);
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
   * Specifies whether current editor values differ from initial values.
  
   */
  get isDirty() {
    return this._getOption("isDirty");
  }
  set isDirty(value) {
    this._setOption("isDirty", value);
  }
  /**
   * Holds an array of form items.
  
   */
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  /**
   * Specifies the location of a label against the editor. Applies only to labels outside their editors (see labelMode).
  
   */
  get labelLocation() {
    return this._getOption("labelLocation");
  }
  set labelLocation(value) {
    this._setOption("labelLocation", value);
  }
  /**
   * Specifies a display mode for item labels.
  
   */
  get labelMode() {
    return this._getOption("labelMode");
  }
  set labelMode(value) {
    this._setOption("labelMode", value);
  }
  /**
   * The minimum column width used for calculating column count in the form layout. Applies only if colCount property is &apos;auto&apos;.
  
   */
  get minColWidth() {
    return this._getOption("minColWidth");
  }
  set minColWidth(value) {
    this._setOption("minColWidth", value);
  }
  /**
   * The text displayed for optional fields. Applies only if showOptionalMark is true.
  
   */
  get optionalMark() {
    return this._getOption("optionalMark");
  }
  set optionalMark(value) {
    this._setOption("optionalMark", value);
  }
  /**
   * Specifies whether all editors on the form are read-only. Applies only to non-templated items.
  
   */
  get readOnly() {
    return this._getOption("readOnly");
  }
  set readOnly(value) {
    this._setOption("readOnly", value);
  }
  /**
   * The text displayed for required fields.
  
   */
  get requiredMark() {
    return this._getOption("requiredMark");
  }
  set requiredMark(value) {
    this._setOption("requiredMark", value);
  }
  /**
   * Specifies the message that is shown for end-users if a required field value is not specified.
  
   */
  get requiredMessage() {
    return this._getOption("requiredMessage");
  }
  set requiredMessage(value) {
    this._setOption("requiredMessage", value);
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
   * Specifies a function that categorizes screens by their width.
  
   */
  get screenByWidth() {
    return this._getOption("screenByWidth");
  }
  set screenByWidth(value) {
    this._setOption("screenByWidth", value);
  }
  /**
   * A Boolean value specifying whether to enable or disable form scrolling.
  
   */
  get scrollingEnabled() {
    return this._getOption("scrollingEnabled");
  }
  set scrollingEnabled(value) {
    this._setOption("scrollingEnabled", value);
  }
  /**
   * Specifies whether a colon is displayed at the end of form labels. Applies only to labels outside their editors (see labelMode).
  
   */
  get showColonAfterLabel() {
    return this._getOption("showColonAfterLabel");
  }
  set showColonAfterLabel(value) {
    this._setOption("showColonAfterLabel", value);
  }
  /**
   * Specifies whether or not the optional mark is displayed for optional fields.
  
   */
  get showOptionalMark() {
    return this._getOption("showOptionalMark");
  }
  set showOptionalMark(value) {
    this._setOption("showOptionalMark", value);
  }
  /**
   * Specifies whether or not the required mark is displayed for required fields.
  
   */
  get showRequiredMark() {
    return this._getOption("showRequiredMark");
  }
  set showRequiredMark(value) {
    this._setOption("showRequiredMark", value);
  }
  /**
   * Specifies whether or not the total validation summary is displayed on the form.
  
   */
  get showValidationSummary() {
    return this._getOption("showValidationSummary");
  }
  set showValidationSummary(value) {
    this._setOption("showValidationSummary", value);
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
   * Gives a name to the internal validation group.
  
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
  
   * A function that is executed when the UI component is rendered and each time the component is repainted.
  
  
   */
  onContentReady;
  /**
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function that is executed when the Enter key has been pressed while an editor is focused.
  
  
   */
  onEditorEnterKey;
  /**
  
   * A function that is executed when the value of a formData object field is changed.
  
  
   */
  onFieldDataChanged;
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
  alignItemLabelsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  alignItemLabelsInAllGroupsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  colCountChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  colCountByScreenChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  customizeItemChange;
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
  formDataChange;
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
  isDirtyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  labelLocationChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  labelModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  minColWidthChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  optionalMarkChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  readOnlyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  requiredMarkChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  requiredMessageChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  screenByWidthChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  scrollingEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showColonAfterLabelChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showOptionalMarkChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showRequiredMarkChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showValidationSummaryChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  tabIndexChange;
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
      subscribe: "editorEnterKey",
      emit: "onEditorEnterKey"
    }, {
      subscribe: "fieldDataChanged",
      emit: "onFieldDataChanged"
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
      emit: "alignItemLabelsChange"
    }, {
      emit: "alignItemLabelsInAllGroupsChange"
    }, {
      emit: "colCountChange"
    }, {
      emit: "colCountByScreenChange"
    }, {
      emit: "customizeItemChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "focusStateEnabledChange"
    }, {
      emit: "formDataChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "isDirtyChange"
    }, {
      emit: "itemsChange"
    }, {
      emit: "labelLocationChange"
    }, {
      emit: "labelModeChange"
    }, {
      emit: "minColWidthChange"
    }, {
      emit: "optionalMarkChange"
    }, {
      emit: "readOnlyChange"
    }, {
      emit: "requiredMarkChange"
    }, {
      emit: "requiredMessageChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "screenByWidthChange"
    }, {
      emit: "scrollingEnabledChange"
    }, {
      emit: "showColonAfterLabelChange"
    }, {
      emit: "showOptionalMarkChange"
    }, {
      emit: "showRequiredMarkChange"
    }, {
      emit: "showValidationSummaryChange"
    }, {
      emit: "tabIndexChange"
    }, {
      emit: "validationGroupChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    this._idh.setHost(this);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new form_default(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  ngOnChanges(changes) {
    super.ngOnChanges(changes);
    this.setupChanges("items", changes);
  }
  setupChanges(prop, changes) {
    if (!(prop in this._optionsToUpdate)) {
      this._idh.setup(prop, changes);
    }
  }
  ngDoCheck() {
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
  static ɵfac = function DxFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxFormComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(IterableDifferHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxFormComponent,
    selectors: [["dx-form"]],
    contentQueries: function DxFormComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_validationRules, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_tabs, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._validationRulesContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._tabsContentChildren = _t);
      }
    },
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      alignItemLabels: "alignItemLabels",
      alignItemLabelsInAllGroups: "alignItemLabelsInAllGroups",
      colCount: "colCount",
      colCountByScreen: "colCountByScreen",
      customizeItem: "customizeItem",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      formData: "formData",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      isDirty: "isDirty",
      items: "items",
      labelLocation: "labelLocation",
      labelMode: "labelMode",
      minColWidth: "minColWidth",
      optionalMark: "optionalMark",
      readOnly: "readOnly",
      requiredMark: "requiredMark",
      requiredMessage: "requiredMessage",
      rtlEnabled: "rtlEnabled",
      screenByWidth: "screenByWidth",
      scrollingEnabled: "scrollingEnabled",
      showColonAfterLabel: "showColonAfterLabel",
      showOptionalMark: "showOptionalMark",
      showRequiredMark: "showRequiredMark",
      showValidationSummary: "showValidationSummary",
      tabIndex: "tabIndex",
      validationGroup: "validationGroup",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onEditorEnterKey: "onEditorEnterKey",
      onFieldDataChanged: "onFieldDataChanged",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      accessKeyChange: "accessKeyChange",
      activeStateEnabledChange: "activeStateEnabledChange",
      alignItemLabelsChange: "alignItemLabelsChange",
      alignItemLabelsInAllGroupsChange: "alignItemLabelsInAllGroupsChange",
      colCountChange: "colCountChange",
      colCountByScreenChange: "colCountByScreenChange",
      customizeItemChange: "customizeItemChange",
      disabledChange: "disabledChange",
      elementAttrChange: "elementAttrChange",
      focusStateEnabledChange: "focusStateEnabledChange",
      formDataChange: "formDataChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      isDirtyChange: "isDirtyChange",
      itemsChange: "itemsChange",
      labelLocationChange: "labelLocationChange",
      labelModeChange: "labelModeChange",
      minColWidthChange: "minColWidthChange",
      optionalMarkChange: "optionalMarkChange",
      readOnlyChange: "readOnlyChange",
      requiredMarkChange: "requiredMarkChange",
      requiredMessageChange: "requiredMessageChange",
      rtlEnabledChange: "rtlEnabledChange",
      screenByWidthChange: "screenByWidthChange",
      scrollingEnabledChange: "scrollingEnabledChange",
      showColonAfterLabelChange: "showColonAfterLabelChange",
      showOptionalMarkChange: "showOptionalMarkChange",
      showRequiredMarkChange: "showRequiredMarkChange",
      showValidationSummaryChange: "showValidationSummaryChange",
      tabIndexChange: "tabIndexChange",
      validationGroupChange: "validationGroupChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxFormComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxFormComponent, [{
    type: Component,
    args: [{
      selector: "dx-form",
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
    _validationRulesContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_validationRules]
    }],
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
    _tabsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_tabs]
    }],
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    alignItemLabels: [{
      type: Input
    }],
    alignItemLabelsInAllGroups: [{
      type: Input
    }],
    colCount: [{
      type: Input
    }],
    colCountByScreen: [{
      type: Input
    }],
    customizeItem: [{
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
    formData: [{
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
    isDirty: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    labelLocation: [{
      type: Input
    }],
    labelMode: [{
      type: Input
    }],
    minColWidth: [{
      type: Input
    }],
    optionalMark: [{
      type: Input
    }],
    readOnly: [{
      type: Input
    }],
    requiredMark: [{
      type: Input
    }],
    requiredMessage: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    screenByWidth: [{
      type: Input
    }],
    scrollingEnabled: [{
      type: Input
    }],
    showColonAfterLabel: [{
      type: Input
    }],
    showOptionalMark: [{
      type: Input
    }],
    showRequiredMark: [{
      type: Input
    }],
    showValidationSummary: [{
      type: Input
    }],
    tabIndex: [{
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
    onContentReady: [{
      type: Output
    }],
    onDisposing: [{
      type: Output
    }],
    onEditorEnterKey: [{
      type: Output
    }],
    onFieldDataChanged: [{
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
    alignItemLabelsChange: [{
      type: Output
    }],
    alignItemLabelsInAllGroupsChange: [{
      type: Output
    }],
    colCountChange: [{
      type: Output
    }],
    colCountByScreenChange: [{
      type: Output
    }],
    customizeItemChange: [{
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
    formDataChange: [{
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
    isDirtyChange: [{
      type: Output
    }],
    itemsChange: [{
      type: Output
    }],
    labelLocationChange: [{
      type: Output
    }],
    labelModeChange: [{
      type: Output
    }],
    minColWidthChange: [{
      type: Output
    }],
    optionalMarkChange: [{
      type: Output
    }],
    readOnlyChange: [{
      type: Output
    }],
    requiredMarkChange: [{
      type: Output
    }],
    requiredMessageChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    screenByWidthChange: [{
      type: Output
    }],
    scrollingEnabledChange: [{
      type: Output
    }],
    showColonAfterLabelChange: [{
      type: Output
    }],
    showOptionalMarkChange: [{
      type: Output
    }],
    showRequiredMarkChange: [{
      type: Output
    }],
    showValidationSummaryChange: [{
      type: Output
    }],
    tabIndexChange: [{
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
var DxFormModule = class _DxFormModule {
  /** @nocollapse */
  static ɵfac = function DxFormModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxFormModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxFormModule,
    imports: [DxFormComponent, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxIntegrationModule, DxTemplateModule],
    exports: [DxFormComponent, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxFormComponent, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxIntegrationModule, DxTemplateModule, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxFormModule, [{
    type: NgModule,
    args: [{
      imports: [DxFormComponent, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxIntegrationModule, DxTemplateModule],
      exports: [DxFormComponent, DxoColCountByScreenModule, DxiItemModule, DxoLabelModule, DxiValidationRuleModule, DxoTabPanelOptionsModule, DxiTabModule, DxoButtonOptionsModule, DxiFormAsyncRuleModule, DxiFormButtonItemModule, DxoFormButtonOptionsModule, DxoFormColCountByScreenModule, DxiFormCompareRuleModule, DxiFormCustomRuleModule, DxiFormEmailRuleModule, DxiFormEmptyItemModule, DxiFormGroupItemModule, DxiFormItemModule, DxoFormLabelModule, DxiFormNumericRuleModule, DxiFormPatternRuleModule, DxiFormRangeRuleModule, DxiFormRequiredRuleModule, DxiFormSimpleItemModule, DxiFormStringLengthRuleModule, DxiFormTabModule, DxiFormTabbedItemModule, DxoFormTabPanelOptionsModule, DxiFormTabPanelOptionsItemModule, DxiFormValidationRuleModule, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxFormComponent,
  DxFormModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-form.mjs:
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
//# sourceMappingURL=chunk-V42DAE3Z.js.map
