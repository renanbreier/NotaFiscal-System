import {
  DBLCLICK_EVENT_NAME
} from "./chunk-7VV6QV3Z.js";
import {
  getElementWidth,
  getSizeValue,
  ui_collection_widget_edit_default
} from "./chunk-QJSN4TNH.js";
import {
  list_edit_search_default
} from "./chunk-NGYFL4CQ.js";
import {
  SWIPE_END_EVENT,
  SWIPE_EVENT,
  SWIPE_START_EVENT,
  collection_widget_live_update_default,
  data_source_default,
  getDataSourceOptions
} from "./chunk-FF43QURI.js";
import {
  TEXTEDITOR_CLASS,
  TEXTEDITOR_INPUT_CLASS,
  TextEditorButton,
  editor_default,
  m_text_box_default,
  m_text_editor_mask_default
} from "./chunk-EFEUTFTO.js";
import {
  DIRECTION_BOTH,
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  scrollable_default
} from "./chunk-UAVVJIMK.js";
import {
  TOOLBAR_CLASS,
  m_popup_default
} from "./chunk-VOY7L4VC.js";
import {
  BindableTemplate,
  DataHelperMixin,
  collection_widget_edit_default,
  item_default,
  m_array_store_default,
  m_hold_default,
  m_query_default,
  resize_observer_default
} from "./chunk-LVWRVNT2.js";
import {
  Button,
  button_default,
  dom_component_default as dom_component_default2,
  getFormat,
  getImageContainer,
  m_validation_engine_default,
  number_default,
  render2 as render
} from "./chunk-UBAWJAV5.js";
import {
  core_default,
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isFluent,
  isMaterial,
  isMaterialBased
} from "./chunk-2D4FZXPO.js";
import {
  FOCUSED_STATE_CLASS,
  widget_default
} from "./chunk-IWHEGBWI.js";
import {
  CLICK_EVENT_NAME,
  ChildDefaultTemplate,
  FunctionTemplate,
  HOVEREND,
  HOVERSTART,
  addNamespace,
  browser_default,
  clipboardText,
  component_registrator_default,
  createTextElementHiddenCopy,
  dom_component_default,
  focused,
  fx_default,
  getChar,
  getDefaultAlignment,
  getName,
  getPublicElement,
  isCommandKeyPressed,
  locate,
  lock,
  m_pointer_default,
  move,
  normalizeIndexes,
  normalizeKeyName,
  position_default,
  removeEvent,
  resetPosition,
  triggerResizeEvent,
  triggerShownEvent
} from "./chunk-ICLEXNO5.js";
import {
  adjust,
  date_default,
  date_serialization_default,
  default_date_names_default,
  devices_default,
  fitIntoRange,
  getFormatter,
  inRange,
  inputType,
  m_support_default,
  sign,
  ui_errors_default
} from "./chunk-DONQLAZQ.js";
import {
  captionize,
  dasherize,
  data,
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  normalizeStyleProp,
  renderer_default,
  setStyle,
  styleProp,
  stylePropPrefix
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  applyServerDecimalSeparator,
  callbacks_default,
  class_default,
  compileGetter,
  config_default2 as config_default,
  defaultScreenFactorFunc,
  deferRender,
  dependency_injector_default,
  dom_adapter_default,
  each,
  ensureDefined,
  errors_default,
  escapeRegExp,
  extend,
  format,
  fromPromise,
  getCurrentScreenFactor,
  getWindow,
  grep,
  guid_default2 as guid_default,
  hasWindow,
  isDate,
  isDefined,
  isEmptyObject,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPromise,
  isString,
  isWindow,
  logger,
  map,
  noop,
  splitPair,
  toComparable,
  type,
  variable_wrapper_default
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/m_validation_summary.js
var ITEM_CLASS = "dx-validationsummary-item";
var ITEM_DATA_KEY = "dx-validationsummary-item-data";
var ValidationSummary = class extends collection_widget_edit_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      focusStateEnabled: false,
      noDataText: null
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationGroup: true
    });
  }
  _init() {
    super._init();
    this._initGroupRegistration();
  }
  _initGroupRegistration() {
    const $element = this.$element();
    const {
      validationGroup
    } = this.option();
    const group = validationGroup || m_validation_engine_default.findGroup($element, this._modelByElement($element));
    const groupConfig = m_validation_engine_default.addGroup(group, true);
    this._unsubscribeGroup();
    this._groupWasInit = true;
    this._validationGroup = group;
    this.groupSubscription = this._groupValidationHandler.bind(this);
    groupConfig.on("validated", this.groupSubscription);
  }
  _unsubscribeGroup() {
    const groupConfig = m_validation_engine_default.getGroupConfig(this._validationGroup);
    null === groupConfig || void 0 === groupConfig || groupConfig.off("validated", this.groupSubscription);
  }
  _getOrderedItems(validators, items) {
    let orderedItems = [];
    each(validators, ((_, validator) => {
      const foundItems = grep(items, ((item) => {
        if (item.validator === validator) {
          return true;
        }
      }));
      if (foundItems.length) {
        orderedItems = orderedItems.concat(foundItems);
      }
    }));
    return orderedItems;
  }
  _groupValidationHandler(params) {
    const items = this._getOrderedItems(params.validators, map(params.brokenRules, ((rule) => ({
      text: rule.message,
      validator: rule.validator,
      index: rule.index
    }))));
    this.validators = params.validators;
    each(this.validators, ((_, validator) => {
      if (validator._validationSummary !== this) {
        let handler = this._itemValidationHandler.bind(this);
        const disposingHandler = function() {
          validator.off("validated", handler);
          validator._validationSummary = null;
          handler = null;
        };
        validator.on("validated", handler);
        validator.on("disposing", disposingHandler);
        validator._validationSummary = this;
      }
    }));
    this.option("items", items);
  }
  _itemValidationHandler(_ref) {
    let {
      isValid,
      validator,
      brokenRules
    } = _ref;
    let {
      items
    } = this.option();
    let itemsChanged = false;
    let itemIndex = 0;
    while (itemIndex < items.length) {
      const item = items[itemIndex];
      if (item.validator === validator) {
        const foundRule = grep(brokenRules || [], ((rule) => rule.index === item.index))[0];
        if (isValid || !foundRule) {
          items.splice(itemIndex, 1);
          itemsChanged = true;
          continue;
        }
        if (foundRule.message !== item.text) {
          item.text = foundRule.message;
          itemsChanged = true;
        }
      }
      itemIndex++;
    }
    each(brokenRules, ((_, rule) => {
      const foundItem = grep(items, ((item) => item.validator === validator && item.index === rule.index))[0];
      if (!foundItem) {
        items.push({
          text: rule.message,
          validator,
          index: rule.index
        });
        itemsChanged = true;
      }
    }));
    if (itemsChanged) {
      items = this._getOrderedItems(this.validators, items);
      this.option("items", items);
    }
  }
  _initMarkup() {
    this.$element().addClass("dx-validationsummary");
    super._initMarkup();
  }
  _optionChanged(args) {
    if ("validationGroup" === args.name) {
      this._initGroupRegistration();
    } else {
      super._optionChanged(args);
    }
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemDataKey() {
    return ITEM_DATA_KEY;
  }
  _postprocessRenderItem(params) {
    m_events_engine_default.on(params.itemElement, "click", (() => {
      var _params$itemData$vali, _params$itemData$vali2;
      null === (_params$itemData$vali = params.itemData.validator) || void 0 === _params$itemData$vali || null === (_params$itemData$vali2 = _params$itemData$vali.focus) || void 0 === _params$itemData$vali2 || _params$itemData$vali2.call(_params$itemData$vali);
    }));
  }
  _dispose() {
    super._dispose();
    this._unsubscribeGroup();
  }
  refreshValidationGroup() {
    this._initGroupRegistration();
  }
};
component_registrator_default("dxValidationSummary", ValidationSummary);
var m_validation_summary_default = ValidationSummary;

// node_modules/devextreme/esm/ui/validation_summary.js
var validation_summary_default = m_validation_summary_default;

// node_modules/devextreme/esm/__internal/ui/validation/m_default_adapter.js
var DefaultAdapter = class extends class_default.inherit({}) {
  ctor(editor, validator) {
    this.editor = editor;
    this.validator = validator;
    this.validationRequestsCallbacks = [];
    const handler = (args) => {
      this.validationRequestsCallbacks.forEach(((item) => item(args)));
    };
    editor.validationRequest.add(handler);
    editor.on("disposing", (() => {
      editor.validationRequest.remove(handler);
    }));
  }
  getValue() {
    return this.editor.option("value");
  }
  getCurrentValidationError() {
    return this.editor.option("validationError");
  }
  bypass() {
    return this.editor.option("disabled");
  }
  applyValidationResults(params) {
    this.editor.option({
      validationErrors: params.brokenRules,
      validationStatus: params.status
    });
  }
  reset() {
    this.editor.clear();
  }
  focus() {
    this.editor.focus();
  }
};
var m_default_adapter_default = DefaultAdapter;

// node_modules/devextreme/esm/__internal/ui/m_validator.js
var Validator = class extends dom_component_default {
  _initOptions(options) {
    super._initOptions.apply(this, arguments);
    this.option(m_validation_engine_default.initValidationOptions(options));
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      validationRules: []
    });
  }
  _init() {
    super._init();
    this._initGroupRegistration();
    this.focused = callbacks_default();
    this._initAdapter();
    this._validationInfo = {
      result: null,
      deferred: null,
      skipValidation: false
    };
  }
  _initGroupRegistration() {
    const group = this._findGroup();
    if (!this._groupWasInit) {
      this.on("disposing", ((args) => {
        m_validation_engine_default.removeRegisteredValidator(args.component._validationGroup, args.component);
      }));
    }
    if (!this._groupWasInit || this._validationGroup !== group) {
      m_validation_engine_default.removeRegisteredValidator(this._validationGroup, this);
      this._groupWasInit = true;
      this._validationGroup = group;
      m_validation_engine_default.registerValidatorInGroup(group, this);
    }
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationGroup: true
    });
  }
  _getEditor() {
    const element = this.$element()[0];
    return data(element, "dx-validation-target");
  }
  _initAdapter() {
    const dxStandardEditor = this._getEditor();
    let {
      adapter
    } = this.option();
    if (!adapter) {
      if (dxStandardEditor) {
        var _adapter;
        adapter = new m_default_adapter_default(dxStandardEditor, this);
        null === (_adapter = adapter) || void 0 === _adapter || null === (_adapter = _adapter.validationRequestsCallbacks) || void 0 === _adapter || _adapter.push(((args) => {
          var _this$_validationInfo;
          if (null !== (_this$_validationInfo = this._validationInfo) && void 0 !== _this$_validationInfo && _this$_validationInfo.skipValidation) {
            return;
          }
          this.validate(args);
        }));
        this.option("adapter", adapter);
        return;
      }
      throw ui_errors_default.Error("E0120");
    }
    const callbacks = adapter.validationRequestsCallbacks;
    if (callbacks) {
      callbacks.push(((args) => {
        this.validate(args);
      }));
    }
  }
  _toggleRTLDirection(isRtl) {
    var _adapter$editor;
    const {
      adapter
    } = this.option();
    const rtlEnabled = (null === adapter || void 0 === adapter || null === (_adapter$editor = adapter.editor) || void 0 === _adapter$editor ? void 0 : _adapter$editor.option("rtlEnabled")) ?? isRtl;
    super._toggleRTLDirection(rtlEnabled);
  }
  _initMarkup() {
    this.$element().addClass("dx-validator");
    super._initMarkup();
  }
  _render() {
    super._render();
    this._toggleAccessibilityAttributes();
  }
  _toggleAccessibilityAttributes() {
    const dxStandardEditor = this._getEditor();
    if (dxStandardEditor) {
      const rules = this.option("validationRules") || [];
      const isRequired = rules.some(((_ref) => {
        let {
          type: type2
        } = _ref;
        return "required" === type2;
      })) || null;
      if (dxStandardEditor.isInitialized()) {
        dxStandardEditor.setAria("required", isRequired);
      }
      dxStandardEditor.option("_onMarkupRendered", (() => {
        dxStandardEditor.setAria("required", isRequired);
      }));
    }
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._initGroupRegistration();
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "validationGroup":
        this._initGroupRegistration();
        return;
      case "validationRules":
        this._resetValidationRules();
        this._toggleAccessibilityAttributes();
        void 0 !== this.option("isValid") && this.validate();
        return;
      case "adapter":
        this._initAdapter();
        break;
      case "isValid":
      case "validationStatus":
        this.option(m_validation_engine_default.synchronizeValidationOptions(args, this.option()));
        break;
      default:
        super._optionChanged(args);
    }
  }
  _getValidationRules() {
    if (!this._validationRules) {
      this._validationRules = map(this.option("validationRules"), ((rule, index) => extend({}, rule, {
        validator: this,
        index
      })));
    }
    return this._validationRules;
  }
  _findGroup() {
    const $element = this.$element();
    const {
      validationGroup
    } = this.option();
    return validationGroup || m_validation_engine_default.findGroup($element, this._modelByElement($element));
  }
  _resetValidationRules() {
    delete this._validationRules;
  }
  validate(args) {
    var _adapter$bypass, _adapter$getValue, _adapter$getCurrentVa, _this$_validationInfo2, _result$complete;
    const {
      adapter,
      name
    } = this.option();
    const bypass = null === adapter || void 0 === adapter || null === (_adapter$bypass = adapter.bypass) || void 0 === _adapter$bypass ? void 0 : _adapter$bypass.call(adapter);
    const value = args && void 0 !== args.value ? args.value : null === adapter || void 0 === adapter || null === (_adapter$getValue = adapter.getValue) || void 0 === _adapter$getValue ? void 0 : _adapter$getValue.call(adapter);
    const currentError = null === adapter || void 0 === adapter || null === (_adapter$getCurrentVa = adapter.getCurrentValidationError) || void 0 === _adapter$getCurrentVa ? void 0 : _adapter$getCurrentVa.call(adapter);
    const rules = this._getValidationRules();
    const currentResult = null === (_this$_validationInfo2 = this._validationInfo) || void 0 === _this$_validationInfo2 ? void 0 : _this$_validationInfo2.result;
    if (currentResult && "pending" === currentResult.status && currentResult.value === value) {
      return extend({}, currentResult);
    }
    let result;
    if (bypass) {
      result = {
        isValid: true,
        status: "valid"
      };
    } else if (null !== currentError && void 0 !== currentError && currentError.editorSpecific) {
      currentError.validator = this;
      result = {
        isValid: false,
        status: "invalid",
        brokenRule: currentError,
        brokenRules: [currentError]
      };
    } else {
      result = m_validation_engine_default.validate(value, rules, name);
    }
    result.id = new guid_default().toString();
    this._applyValidationResult(result, adapter);
    null === (_result$complete = result.complete) || void 0 === _result$complete || _result$complete.then(((res) => {
      if (res.id === this._validationInfo.result.id) {
        this._applyValidationResult(res, adapter);
      }
    }));
    return extend({}, this._validationInfo.result);
  }
  reset() {
    const {
      adapter
    } = this.option();
    const result = {
      id: null,
      isValid: true,
      brokenRule: null,
      brokenRules: null,
      pendingRules: null,
      status: "valid",
      complete: null
    };
    this._validationInfo.skipValidation = true;
    adapter.reset();
    this._validationInfo.skipValidation = false;
    this._resetValidationRules();
    this._applyValidationResult(result, adapter);
  }
  _updateValidationResult(result) {
    if (!this._validationInfo.result || this._validationInfo.result.id !== result.id) {
      const complete = this._validationInfo.deferred && this._validationInfo.result.complete;
      this._validationInfo.result = extend({}, result, {
        complete
      });
    } else {
      for (const prop in result) {
        if ("id" !== prop && "complete" !== prop) {
          this._validationInfo.result[prop] = result[prop];
        }
      }
    }
  }
  _applyValidationResult(result, adapter) {
    const validatedAction = this._createActionByOption("onValidated", {
      excludeValidators: ["readOnly"]
    });
    result.validator = this;
    this._updateValidationResult(result);
    adapter.applyValidationResults && adapter.applyValidationResults(this._validationInfo.result);
    this.option({
      validationStatus: this._validationInfo.result.status
    });
    if ("pending" === this._validationInfo.result.status) {
      if (!this._validationInfo.deferred) {
        this._validationInfo.deferred = Deferred();
        this._validationInfo.result.complete = this._validationInfo.deferred.promise();
      }
      this._eventsStrategy.fireEvent("validating", [this._validationInfo.result]);
      return;
    }
    if ("pending" !== this._validationInfo.result.status) {
      validatedAction(result);
      if (this._validationInfo.deferred) {
        this._validationInfo.deferred.resolve(result);
        this._validationInfo.deferred = null;
      }
    }
  }
  focus() {
    const {
      adapter
    } = this.option();
    adapter && adapter.focus && adapter.focus();
  }
  _useTemplates() {
    return false;
  }
};
component_registrator_default("dxValidator", Validator);
var m_validator_default = Validator;

// node_modules/devextreme/esm/__internal/ui/m_validation_group.js
var ValidationGroup = class extends dom_component_default2 {
  _getDefaultOptions() {
    return super._getDefaultOptions();
  }
  _init() {
    super._init();
    m_validation_engine_default.addGroup(this, false);
  }
  _initMarkup() {
    const $element = this.$element();
    $element.addClass("dx-validationgroup");
    $element.find(".dx-validator").each(((_, validatorContainer) => {
      m_validator_default.getInstance(renderer_default(validatorContainer))._initGroupRegistration();
    }));
    $element.find(".dx-validationsummary").each(((_, summaryContainer) => {
      m_validation_summary_default.getInstance(renderer_default(summaryContainer)).refreshValidationGroup();
    }));
    super._initMarkup();
  }
  validate() {
    return m_validation_engine_default.validateGroup(this);
  }
  reset() {
    return m_validation_engine_default.resetGroup(this);
  }
  _dispose() {
    m_validation_engine_default.removeGroup(this);
    this.$element().removeClass("dx-validationgroup");
    super._dispose();
  }
  _useTemplates() {
    return false;
  }
};
component_registrator_default("dxValidationGroup", ValidationGroup);
var m_validation_group_default = ValidationGroup;

// node_modules/devextreme/esm/ui/validation_group.js
var validation_group_default = m_validation_group_default;

// node_modules/devextreme/esm/ui/popup/ui.popup.js
var ui_popup_default = m_popup_default;

// node_modules/devextreme/esm/ui/widget/ui.widget.js
var ui_widget_default = widget_default;

// node_modules/devextreme/esm/__internal/ui/drop_down_editor/m_drop_down_button.js
var DROP_DOWN_EDITOR_BUTTON_VISIBLE = "dx-dropdowneditor-button-visible";
var BUTTON_MESSAGE = "dxDropDownEditor-selectLabel";
var DropDownButton = class extends TextEditorButton {
  constructor(name, editor, options) {
    super(name, editor, options);
    this.currentTemplate = null;
  }
  _attachEvents(instance) {
    const {
      editor
    } = this;
    instance.option("onClick", ((e) => {
      var _editor$_shouldCallOp;
      if (null !== (_editor$_shouldCallOp = editor._shouldCallOpenHandler) && void 0 !== _editor$_shouldCallOp && _editor$_shouldCallOp.call(editor)) {
        editor._openHandler(e);
        return;
      }
      !editor.option("openOnFieldClick") && editor._openHandler(e);
    }));
    m_events_engine_default.on(instance.$element(), "mousedown", ((e) => {
      if (editor.$element().is(".dx-state-focused")) {
        e.preventDefault();
      }
    }));
  }
  _create() {
    const {
      editor
    } = this;
    const $element = renderer_default("<div>");
    const options = this._getOptions();
    this._addToContainer($element);
    const instance = editor._createComponent($element, button_default, extend({}, options, {
      elementAttr: {
        "aria-label": message_default.format(BUTTON_MESSAGE)
      }
    }));
    this._legacyRender(editor.$element(), $element, options.visible);
    return {
      $element,
      instance
    };
  }
  _getOptions() {
    const {
      editor
    } = this;
    const visible = this._isVisible();
    const isReadOnly = editor.option("readOnly");
    const options = {
      focusStateEnabled: false,
      hoverStateEnabled: false,
      activeStateEnabled: false,
      useInkRipple: false,
      disabled: isReadOnly,
      visible
    };
    this._addTemplate(options);
    return options;
  }
  _isVisible() {
    const {
      editor
    } = this;
    return super._isVisible() && editor.option("showDropDownButton");
  }
  _legacyRender($editor, $element, isVisible) {
    $editor.toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, isVisible);
    if ($element) {
      $element.removeClass("dx-button").removeClass("dx-button-mode-contained").addClass("dx-dropdowneditor-button");
    }
  }
  _isSameTemplate() {
    return this.editor.option("dropDownButtonTemplate") === this.currentTemplate;
  }
  _addTemplate(options) {
    if (!this._isSameTemplate()) {
      options.template = this.editor._getTemplateByOption("dropDownButtonTemplate");
      this.currentTemplate = this.editor.option("dropDownButtonTemplate");
    }
  }
  update() {
    const shouldUpdate = super.update();
    if (shouldUpdate) {
      const {
        editor,
        instance
      } = this;
      const $editor = editor.$element();
      const options = this._getOptions();
      null === instance || void 0 === instance || instance.option(options);
      this._legacyRender($editor, null === instance || void 0 === instance ? void 0 : instance.$element(), options.visible);
    }
  }
};

// node_modules/devextreme/esm/__internal/ui/drop_down_editor/m_drop_down_editor.js
var DROP_DOWN_EDITOR_CLASS = "dx-dropdowneditor";
var DROP_DOWN_EDITOR_INPUT_WRAPPER = "dx-dropdowneditor-input-wrapper";
var DROP_DOWN_EDITOR_OVERLAY = "dx-dropdowneditor-overlay";
var DROP_DOWN_EDITOR_OVERLAY_FLIPPED = "dx-dropdowneditor-overlay-flipped";
var DROP_DOWN_EDITOR_ACTIVE = "dx-dropdowneditor-active";
var DROP_DOWN_EDITOR_FIELD_CLICKABLE = "dx-dropdowneditor-field-clickable";
var DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER = "dx-dropdowneditor-field-template-wrapper";
var isIOs = "ios" === devices_default.current().platform;
function createTemplateWrapperElement() {
  return renderer_default("<div>").addClass(DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER);
}
var DropDownEditor = class extends m_text_box_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      tab: (e) => {
        if (!this.option("opened")) {
          return;
        }
        if (!this._popup.getFocusableElements().length) {
          this.close();
          return;
        }
        const $focusableElement = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
        if ($focusableElement) {
          m_events_engine_default.trigger($focusableElement, "focus");
          $focusableElement.select();
        }
        e.preventDefault();
      },
      escape: (e) => {
        if (this.option("opened")) {
          e.preventDefault();
        }
        this.close();
        return true;
      },
      upArrow: (e) => {
        if (!isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (e.altKey) {
            this.close();
            return false;
          }
        }
        return true;
      },
      downArrow: (e) => {
        if (!isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (e.altKey) {
            this._validatedOpening();
            return false;
          }
        }
        return true;
      },
      enter: (e) => {
        if (this.option("opened")) {
          e.preventDefault();
          this._valueChangeEventHandler(e);
        }
        return true;
      }
    });
  }
  _getDefaultButtons() {
    return super._getDefaultButtons().concat([{
      name: "dropDown",
      Ctor: DropDownButton
    }]);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: null,
      onOpened: null,
      onClosed: null,
      opened: false,
      acceptCustomValue: true,
      applyValueMode: "instantly",
      deferRendering: true,
      activeStateEnabled: true,
      dropDownButtonTemplate: "dropDownButton",
      fieldTemplate: null,
      openOnFieldClick: false,
      showDropDownButton: true,
      buttons: void 0,
      dropDownOptions: {
        showTitle: false
      },
      popupPosition: this._getDefaultPopupPosition(),
      onPopupInitialized: null,
      applyButtonText: message_default.format("OK"),
      cancelButtonText: message_default.format("Cancel"),
      buttonsLocation: "default",
      useHiddenSubmitElement: false,
      validationMessagePosition: "auto",
      _userDropDownOptions: {}
    });
  }
  _useTemplates() {
    return true;
  }
  _getDefaultPopupPosition(isRtlEnabled) {
    const position = getDefaultAlignment(isRtlEnabled);
    return {
      offset: {
        h: 0,
        v: -1
      },
      my: `${position} top`,
      at: `${position} bottom`,
      collision: "flip flip"
    };
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device(device) {
        const isGeneric = "generic" === device.platform;
        return isGeneric;
      },
      options: {
        popupPosition: {
          offset: {
            v: 0
          }
        }
      }
    }]);
  }
  _inputWrapper() {
    return this.$element().find(`.${DROP_DOWN_EDITOR_INPUT_WRAPPER}`).first();
  }
  _init() {
    super._init();
    this._initVisibilityActions();
    this._initPopupInitializedAction();
    const {
      rtlEnabled,
      dropDownOptions
    } = this.option();
    this._updatePopupPosition(rtlEnabled);
    this._cacheUserDropDownOptions(dropDownOptions);
  }
  _updatePopupPosition(isRtlEnabled) {
    const {
      my,
      at
    } = this._getDefaultPopupPosition(isRtlEnabled);
    const currentPosition = this.option("popupPosition");
    this.option("popupPosition", extend({}, currentPosition, {
      my,
      at
    }));
  }
  _initVisibilityActions() {
    this._openAction = this._createActionByOption("onOpened", {
      excludeValidators: ["disabled", "readOnly"]
    });
    this._closeAction = this._createActionByOption("onClosed", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initPopupInitializedAction() {
    this._popupInitializedAction = this._createActionByOption("onPopupInitialized", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initMarkup() {
    this._renderSubmitElement();
    super._initMarkup();
    this.$element().addClass("dx-dropdowneditor");
    this.setAria("role", this._getAriaRole());
  }
  _render() {
    this._detachFocusEvents();
    super._render();
    this._renderOpenHandler();
    this._attachFocusOutHandler();
    this._renderOpenedState();
  }
  _renderContentImpl() {
    if (!this.option("deferRendering")) {
      this._createPopup();
    }
  }
  _renderInput() {
    super._renderInput();
    this._renderTemplateWrapper();
    this._wrapInput();
    this._setDefaultAria();
  }
  _wrapInput() {
    this._$container = this.$element().wrapInner(renderer_default("<div>").addClass(DROP_DOWN_EDITOR_INPUT_WRAPPER)).children().eq(0);
  }
  _getAriaHasPopup() {
    return "true";
  }
  _getAriaAutocomplete() {
    return "none";
  }
  _getAriaRole() {
    return "combobox";
  }
  _setDefaultAria() {
    this.setAria({
      haspopup: this._getAriaHasPopup(),
      autocomplete: this._getAriaAutocomplete(),
      role: this._getAriaRole()
    });
  }
  _readOnlyPropValue() {
    return !this._isEditable() || super._readOnlyPropValue();
  }
  _cleanFocusState() {
    super._cleanFocusState();
    if (this.option("fieldTemplate")) {
      this._detachFocusEvents();
    }
  }
  _getFieldTemplate() {
    return this.option("fieldTemplate") && this._getTemplateByOption("fieldTemplate");
  }
  _renderMask() {
    if (this.option("fieldTemplate")) {
      return;
    }
    super._renderMask();
  }
  _renderField() {
    const fieldTemplate = this._getFieldTemplate();
    if (fieldTemplate) {
      this._renderTemplatedField(fieldTemplate, this._fieldRenderData());
    }
  }
  _renderPlaceholder() {
    const hasFieldTemplate = !!this._getFieldTemplate();
    if (!hasFieldTemplate) {
      super._renderPlaceholder();
    }
  }
  _renderValue() {
    if (this.option("useHiddenSubmitElement")) {
      this._setSubmitValue();
    }
    const promise = super._renderValue();
    return promise.always(this._renderField.bind(this));
  }
  _getButtonsContainer() {
    const fieldTemplate = this._getFieldTemplate();
    return fieldTemplate ? this._$container : this._$textEditorContainer;
  }
  _renderTemplateWrapper() {
    const fieldTemplate = this._getFieldTemplate();
    if (!fieldTemplate) {
      return;
    }
    if (!this._$templateWrapper) {
      this._$templateWrapper = createTemplateWrapperElement().prependTo(this.$element());
    }
  }
  _renderTemplatedField(fieldTemplate, data2) {
    const isFocused = focused(this._input());
    this._detachKeyboardEvents();
    this._detachFocusEvents();
    this._$textEditorContainer.remove();
    const $newTemplateWrapper = createTemplateWrapperElement();
    this._$templateWrapper.replaceWith($newTemplateWrapper);
    this._$templateWrapper = $newTemplateWrapper;
    const currentRenderContext = Symbol("renderContext");
    this._activeRenderContext = currentRenderContext;
    fieldTemplate.render({
      model: data2,
      container: getPublicElement(this._$templateWrapper),
      onRendered: () => {
        if (this._activeRenderContext !== currentRenderContext) {
          return;
        }
        const $input = this._input();
        if (!$input.length) {
          throw ui_errors_default.Error("E1010");
        }
        this._integrateInput();
        if (!isFocused) {
          return;
        }
        if (browser_default.mozilla) {
          const inputElement = $input.get(0);
          inputElement.focus({
            preventScroll: true
          });
        } else {
          m_events_engine_default.trigger($input, "focus");
        }
      }
    });
  }
  _integrateInput() {
    const {
      isValid
    } = this.option();
    this._renderFocusState();
    this._refreshValueChangeEvent();
    this._refreshEvents();
    this._refreshEmptinessEvent();
    this._setDefaultAria();
    this._setFieldAria();
    this._toggleValidationClasses(!isValid);
    const {
      _onMarkupRendered: markupRendered
    } = this.option();
    null === markupRendered || void 0 === markupRendered || markupRendered();
  }
  _refreshEmptinessEvent() {
    m_events_engine_default.off(this._input(), "input blur", this._toggleEmptinessEventHandler);
    this._renderEmptinessEvent();
  }
  _fieldRenderData() {
    return this.option("value");
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new FunctionTemplate(((options) => {
        const $icon = renderer_default("<div>").addClass("dx-dropdowneditor-icon");
        renderer_default(options.container).append($icon);
      }))
    });
    super._initTemplates();
  }
  _renderOpenHandler() {
    const $inputWrapper = this._inputWrapper();
    const eventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const {
      openOnFieldClick
    } = this.option();
    m_events_engine_default.off($inputWrapper, eventName);
    m_events_engine_default.on($inputWrapper, eventName, this._getInputClickHandler(openOnFieldClick));
    this.$element().toggleClass(DROP_DOWN_EDITOR_FIELD_CLICKABLE, openOnFieldClick);
    if (openOnFieldClick) {
      this._openOnFieldClickAction = this._createAction(this._openHandler.bind(this));
    }
  }
  _attachFocusOutHandler() {
    if (isIOs) {
      this._detachFocusOutEvents();
      m_events_engine_default.on(this._inputWrapper(), addNamespace("focusout", this.NAME), ((event) => {
        const newTarget = event.relatedTarget;
        if (newTarget && this.option("opened")) {
          const isNewTargetOutside = this._isTargetOutOfComponent(newTarget);
          if (isNewTargetOutside) {
            this.close();
          }
        }
      }));
    }
  }
  _isTargetOutOfComponent(newTarget) {
    const popupWrapper = this.content ? renderer_default(this.content()).closest(`.${DROP_DOWN_EDITOR_OVERLAY}`) : this._$popup;
    const isTargetOutsidePopup = 0 === renderer_default(newTarget).closest(`.${DROP_DOWN_EDITOR_OVERLAY}`, popupWrapper).length;
    return isTargetOutsidePopup;
  }
  _detachFocusOutEvents() {
    isIOs && m_events_engine_default.off(this._inputWrapper(), addNamespace("focusout", this.NAME));
  }
  _getInputClickHandler(openOnFieldClick) {
    return openOnFieldClick ? (e) => {
      this._executeOpenAction(e);
    } : () => {
      this._focusInput();
    };
  }
  _openHandler() {
    this._toggleOpenState();
  }
  _executeOpenAction(e) {
    var _this$_openOnFieldCli;
    null === (_this$_openOnFieldCli = this._openOnFieldClickAction) || void 0 === _this$_openOnFieldCli || _this$_openOnFieldCli.call(this, {
      event: e
    });
  }
  _keyboardEventBindingTarget() {
    return this._input();
  }
  _focusInput() {
    if (this.option("disabled")) {
      return false;
    }
    if (this.option("focusStateEnabled") && !focused(this._input())) {
      this._resetCaretPosition();
      m_events_engine_default.trigger(this._input(), "focus");
    }
    return true;
  }
  _resetCaretPosition() {
    let ignoreEditable = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    const inputElement = this._input().get(0);
    if (inputElement) {
      const {
        value
      } = inputElement;
      const caretPosition = isDefined(value) && (ignoreEditable || this._isEditable()) ? value.length : 0;
      this._caret({
        start: caretPosition,
        end: caretPosition
      }, true);
    }
  }
  _isEditable() {
    const {
      acceptCustomValue
    } = this.option();
    return acceptCustomValue;
  }
  _toggleOpenState(isVisible) {
    if (!this._focusInput()) {
      return;
    }
    if (!this.option("readOnly")) {
      isVisible = arguments.length ? isVisible : !this.option("opened");
      this.option("opened", isVisible);
    }
  }
  _getControlsAria() {
    return this._popup && this._popupContentId;
  }
  _renderOpenedState() {
    const opened = this.option("opened");
    if (opened) {
      this._createPopup();
    }
    this.$element().toggleClass(DROP_DOWN_EDITOR_ACTIVE, opened);
    this._setPopupOption("visible", opened);
    const arias = {
      expanded: opened,
      controls: this._getControlsAria()
    };
    this.setAria(arias);
    this.setAria("owns", opened ? this._popupContentId : void 0, this.$element());
  }
  _createPopup() {
    if (this._$popup) {
      return;
    }
    this._$popup = renderer_default("<div>").addClass(DROP_DOWN_EDITOR_OVERLAY).appendTo(this.$element());
    this._renderPopup();
    this._renderPopupContent();
    this._setPopupAriaLabel();
  }
  _setPopupAriaLabel() {
    const $overlayContent = this._popup.$overlayContent();
    this.setAria("label", "Dropdown", $overlayContent);
  }
  _renderPopupContent() {
  }
  _renderPopup() {
    const popupConfig = extend(this._popupConfig(), this.option("_userDropDownOptions"));
    this._popup = this._createComponent(this._$popup, ui_popup_default, popupConfig);
    this._popup.on({
      showing: this._popupShowingHandler.bind(this),
      shown: this._popupShownHandler.bind(this),
      hiding: this._popupHidingHandler.bind(this),
      hidden: this._popupHiddenHandler.bind(this),
      contentReady: this._contentReadyHandler.bind(this)
    });
    this._attachPopupKeyHandler();
    this._contentReadyHandler();
    this._setPopupContentId(this._popup.$content());
    this._bindInnerWidgetOptions(this._popup, "dropDownOptions");
  }
  _attachPopupKeyHandler() {
    m_events_engine_default.on(this._popup.$overlayContent(), addNamespace("keydown", this.NAME), ((e) => this._popupKeyHandler(e)));
  }
  _popupKeyHandler(e) {
    switch (normalizeKeyName(e)) {
      case "tab":
        this._popupTabHandler(e);
        break;
      case "escape":
        this._popupEscHandler();
    }
  }
  _popupTabHandler(e) {
    const $target = renderer_default(e.target);
    const moveBackward = e.shiftKey && $target.is(this._getFirstPopupElement());
    const moveForward = !e.shiftKey && $target.is(this._getLastPopupElement());
    if (moveForward || moveBackward) {
      m_events_engine_default.trigger(this.field(), "focus");
      e.preventDefault();
    }
  }
  _popupEscHandler() {
    m_events_engine_default.trigger(this._input(), "focus");
    this.close();
  }
  _setPopupContentId($popupContent) {
    this._popupContentId = `dx-${new guid_default()}`;
    this.setAria("id", this._popupContentId, $popupContent);
  }
  _contentReadyHandler() {
  }
  _popupConfig() {
    return {
      onInitialized: this._getPopupInitializedHandler(),
      position: extend(this.option("popupPosition"), {
        of: this.$element()
      }),
      showTitle: this.option("dropDownOptions.showTitle"),
      _ignoreFunctionValueDeprecation: true,
      width: () => getElementWidth(this.$element()),
      height: "auto",
      shading: false,
      hideOnParentScroll: true,
      hideOnOutsideClick: (e) => this._closeOutsideDropDownHandler(e),
      animation: {
        show: {
          type: "fade",
          duration: 0,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 400,
          from: 1,
          to: 0
        }
      },
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      dragEnabled: false,
      toolbarItems: this._getPopupToolbarItems(),
      onPositioned: this._popupPositionedHandler.bind(this),
      fullScreen: false,
      contentTemplate: null,
      _hideOnParentScrollTarget: this.$element(),
      _wrapperClassExternal: DROP_DOWN_EDITOR_OVERLAY,
      _ignorePreventScrollEventsDeprecation: true
    };
  }
  _popupInitializedHandler() {
  }
  _getPopupInitializedHandler() {
    const {
      onPopupInitialized
    } = this.option();
    return (e) => {
      this._popupInitializedHandler();
      if (onPopupInitialized) {
        this._popupInitializedAction({
          popup: e.component
        });
      }
    };
  }
  _dimensionChanged() {
    if (hasWindow() && !this.$element().is(":visible")) {
      this.close();
      return;
    }
    this._updatePopupWidth();
  }
  _updatePopupWidth() {
    const popupWidth = getSizeValue(this.option("dropDownOptions.width"));
    if (void 0 === popupWidth) {
      this._setPopupOption("width", (() => getElementWidth(this.$element())));
    }
  }
  _popupPositionedHandler(e) {
    var _e$position;
    const {
      labelMode,
      stylingMode
    } = this.option();
    if (!this._popup) {
      return;
    }
    const $popupOverlayContent = this._popup.$overlayContent();
    const isOverlayFlipped = null === (_e$position = e.position) || void 0 === _e$position || null === (_e$position = _e$position.v) || void 0 === _e$position ? void 0 : _e$position.flip;
    const shouldIndentForLabel = "hidden" !== labelMode && "outside" !== labelMode && "outlined" === stylingMode;
    if (e.position) {
      $popupOverlayContent.toggleClass(DROP_DOWN_EDITOR_OVERLAY_FLIPPED, isOverlayFlipped);
    }
    if (isOverlayFlipped && shouldIndentForLabel && this._label.isVisible()) {
      const $label = this._label.$element();
      move($popupOverlayContent, {
        top: locate($popupOverlayContent).top - parseInt($label.css("fontSize"))
      });
    }
  }
  _popupShowingHandler() {
  }
  _popupHidingHandler() {
    this.option("opened", false);
  }
  _popupShownHandler() {
    var _this$_validationMess;
    this._openAction();
    null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess || _this$_validationMess.option("positionSide", this._getValidationMessagePositionSide());
  }
  _popupHiddenHandler() {
    var _this$_validationMess2;
    this._closeAction();
    null === (_this$_validationMess2 = this._validationMessage) || void 0 === _this$_validationMess2 || _this$_validationMess2.option("positionSide", this._getValidationMessagePositionSide());
  }
  _getValidationMessagePositionSide() {
    var _this$_popup;
    const {
      validationMessagePosition
    } = this.option();
    if ("auto" !== validationMessagePosition) {
      return validationMessagePosition;
    }
    let positionSide = "bottom";
    if (null !== (_this$_popup = this._popup) && void 0 !== _this$_popup && _this$_popup.option("visible")) {
      const {
        top: myTop
      } = position_default.setup(this.$element());
      const {
        top: popupTop
      } = position_default.setup(this._popup.$content());
      positionSide = myTop + this.option("popupPosition").offset.v > popupTop ? "bottom" : "top";
    }
    return positionSide;
  }
  _closeOutsideDropDownHandler(event) {
    const {
      target
    } = event;
    const $target = renderer_default(target);
    const dropDownButton = this.getButton("dropDown");
    const $dropDownButton = null === dropDownButton || void 0 === dropDownButton ? void 0 : dropDownButton.$element();
    const isInputClicked = !!$target.closest(this.$element()).length;
    const isDropDownButtonClicked = !!$target.closest($dropDownButton).length;
    const isOutsideClick = !isInputClicked && !isDropDownButtonClicked;
    return isOutsideClick;
  }
  _clean() {
    delete this._openOnFieldClickAction;
    delete this._$templateWrapper;
    if (this._$popup) {
      this._$popup.remove();
      delete this._$popup;
      delete this._popup;
    }
    super._clean();
  }
  _setPopupOption(optionName, value) {
    this._setWidgetOption("_popup", arguments);
  }
  _validatedOpening() {
    if (!this.option("readOnly")) {
      this._toggleOpenState(true);
    }
  }
  _getPopupToolbarItems() {
    const {
      applyValueMode
    } = this.option();
    return "useButtons" === applyValueMode ? this._popupToolbarItemsConfig() : [];
  }
  _getFirstPopupElement() {
    return renderer_default(this._popup.getFocusableElements()).first();
  }
  _getLastPopupElement() {
    return renderer_default(this._popup.getFocusableElements()).last();
  }
  _popupToolbarItemsConfig() {
    const buttonsConfig = [{
      shortcut: "done",
      options: {
        onClick: this._applyButtonHandler.bind(this),
        text: this.option("applyButtonText")
      }
    }, {
      shortcut: "cancel",
      options: {
        onClick: this._cancelButtonHandler.bind(this),
        text: this.option("cancelButtonText")
      }
    }];
    return this._applyButtonsLocation(buttonsConfig);
  }
  _applyButtonsLocation(buttonsConfig) {
    const {
      buttonsLocation
    } = this.option();
    const resultConfig = buttonsConfig;
    if ("default" !== buttonsLocation) {
      const position = splitPair(buttonsLocation);
      each(resultConfig, ((_, element) => {
        extend(element, {
          toolbar: position[0],
          location: position[1]
        });
      }));
    }
    return resultConfig;
  }
  _applyButtonHandler(args) {
    this.close();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  }
  _cancelButtonHandler() {
    this.close();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  }
  _popupOptionChanged(args) {
    const options = ui_widget_default.getOptionsFromContainer(args);
    this._setPopupOption(options);
    const optionsKeys = Object.keys(options);
    if (optionsKeys.includes("width") || optionsKeys.includes("height")) {
      this._dimensionChanged();
    }
  }
  _cacheUserDropDownOptions(value) {
    let name = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "dropDownOptions";
    const optionName = name.replace("dropDownOptions", "_userDropDownOptions");
    this.option(optionName, value);
  }
  _renderSubmitElement() {
    if (this.option("useHiddenSubmitElement")) {
      this._$submitElement = renderer_default("<input>").attr("type", "hidden").appendTo(this.$element());
    }
  }
  _setSubmitValue() {
    const {
      value
    } = this.option();
    this._getSubmitElement().val(value);
  }
  _getSubmitElement() {
    if (this.option("useHiddenSubmitElement")) {
      return this._$submitElement;
    }
    return super._getSubmitElement();
  }
  _dispose() {
    this._detachFocusOutEvents();
    super._dispose();
  }
  _optionChanged(args) {
    var _this$_popup2;
    const {
      name,
      fullName,
      value
    } = args;
    switch (name) {
      case "width":
      case "height":
        super._optionChanged(args);
        null === (_this$_popup2 = this._popup) || void 0 === _this$_popup2 || _this$_popup2.repaint();
        break;
      case "opened":
        this._renderOpenedState();
        break;
      case "onOpened":
      case "onClosed":
        this._initVisibilityActions();
        break;
      case "onPopupInitialized":
        this._initPopupInitializedAction();
        break;
      case "fieldTemplate":
      case "acceptCustomValue":
      case "openOnFieldClick":
        this._invalidate();
        break;
      case "dropDownButtonTemplate":
      case "showDropDownButton":
        this._updateButtons(["dropDown"]);
        break;
      case "dropDownOptions":
        this._popupOptionChanged(args);
        this._cacheUserDropDownOptions(value, fullName);
        break;
      case "_userDropDownOptions":
      case "popupPosition":
        break;
      case "deferRendering":
        if (hasWindow()) {
          this._createPopup();
        }
        break;
      case "applyValueMode":
      case "applyButtonText":
      case "cancelButtonText":
      case "buttonsLocation":
        this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
        break;
      case "useHiddenSubmitElement":
        if (this._$submitElement) {
          this._$submitElement.remove();
          this._$submitElement = void 0;
        }
        this._renderSubmitElement();
        break;
      case "rtlEnabled":
        this._updatePopupPosition(value);
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  open() {
    this.option("opened", true);
  }
  close() {
    this.option("opened", false);
  }
  field() {
    return getPublicElement(this._input());
  }
  content() {
    return this._popup ? this._popup.content() : null;
  }
};
component_registrator_default("dxDropDownEditor", DropDownEditor);
var m_drop_down_editor_default = DropDownEditor;

// node_modules/devextreme/esm/__internal/ui/form/constants.js
var FORM_CLASS = "dx-form";
var FORM_GROUP_CLASS = "dx-form-group";
var FORM_GROUP_CAPTION_CLASS = "dx-form-group-caption";
var FORM_GROUP_CUSTOM_CAPTION_CLASS = "dx-form-group-custom-caption";
var FORM_FIELD_ITEM_COL_CLASS = "dx-col-";
var FIELD_ITEM_CLASS = "dx-field-item";
var LAYOUT_MANAGER_ONE_COLUMN = "dx-layout-manager-one-col";
var FIELD_ITEM_LABEL_CONTENT_CLASS = "dx-field-item-label-content";
var FORM_LAYOUT_MANAGER_CLASS = "dx-layout-manager";
var FIELD_ITEM_LABEL_CLASS = "dx-field-item-label";
var FIELD_ITEM_CONTENT_CLASS = "dx-field-item-content";
var SINGLE_COLUMN_ITEM_CONTENT = "dx-single-column-item-content";
var ROOT_SIMPLE_ITEM_CLASS = "dx-root-simple-item";
var FORM_GROUP_CONTENT_CLASS = "dx-form-group-content";
var FIELD_ITEM_CONTENT_HAS_GROUP_CLASS = "dx-field-item-has-group";
var FIELD_ITEM_CONTENT_HAS_TABS_CLASS = "dx-field-item-has-tabs";
var FORM_GROUP_WITH_CAPTION_CLASS = "dx-form-group-with-caption";
var FIELD_ITEM_TAB_CLASS = "dx-field-item-tab";
var GROUP_COL_COUNT_CLASS = "dx-group-colcount-";
var GROUP_COL_COUNT_ATTR = "group-col-count";
var FORM_VALIDATION_SUMMARY = "dx-form-validation-summary";
var FORM_UNDERLINED_CLASS = "dx-form-styling-mode-underlined";
var SIMPLE_ITEM_TYPE = "simple";

// node_modules/devextreme/esm/__internal/ui/form/form.layout_manager.utils.js
var EDITORS_WITH_ARRAY_VALUE = ["dxTagBox", "dxRangeSlider", "dxDateRangeBox"];
var EDITORS_WITH_MULTIPLE_INPUT_FIELDS = ["dxRangeSlider", "dxDateRangeBox"];
var EDITORS_WITH_SPECIFIC_LABELS = ["dxRangeSlider", "dxSlider"];
var EDITORS_WITHOUT_LABELS = ["dxCalendar", "dxCheckBox", "dxHtmlEditor", "dxRadioGroup", "dxRangeSlider", "dxSlider", "dxSwitch"];
var DROP_DOWN_EDITORS = ["dxSelectBox", "dxDropDownBox", "dxTagBox", "dxLookup", "dxAutocomplete", "dxColorBox", "dxDateBox", "dxDateRangeBox"];
function _hasRequiredRuleInSet(rules) {
  return null === rules || void 0 === rules ? void 0 : rules.some(((rule) => "required" === rule.type));
}
function convertToLabelMarkOptions(_ref, isRequired) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref;
  return {
    showRequiredMark: showRequiredMark && isRequired,
    requiredMark,
    showOptionalMark: showOptionalMark && !isRequired,
    optionalMark
  };
}
function _convertToLabelOptions(_ref2) {
  let {
    item,
    id,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation,
    labelTemplate,
    formLabelMode,
    onLabelTemplateRendered
  } = _ref2;
  const isEditorWithoutLabels = EDITORS_WITHOUT_LABELS.includes(item.editorType);
  const labelOptions = extend({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id,
    visible: "outside" === formLabelMode || isEditorWithoutLabels && "hidden" !== formLabelMode,
    isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired),
    labelTemplate,
    onLabelTemplateRendered
  });
  if (["dxRadioGroup", "dxCheckBox", "dxLookup", "dxSlider", "dxRangeSlider", "dxSwitch", "dxHtmlEditor", "dxDateRangeBox"].includes(item.editorType)) {
    labelOptions.labelID = `dx-label-${new guid_default()}`;
  }
  if (!labelOptions.text && item.dataField) {
    labelOptions.text = captionize(item.dataField);
  }
  if (labelOptions.text) {
    labelOptions.textWithoutColon = labelOptions.text;
    labelOptions.text += labelOptions.showColon ? ":" : "";
  }
  return labelOptions;
}
function getDropDownEditorOptions($parent, editorType, editorInputId) {
  const isDropDownEditor = DROP_DOWN_EDITORS.includes(editorType);
  if (!isDropDownEditor) {
    return {};
  }
  return {
    onPopupInitialized: (_ref3) => {
      let {
        component,
        popup
      } = _ref3;
      const {
        openOnFieldClick
      } = component.option();
      const {
        hideOnOutsideClick: initialHideOnOutsideClick
      } = popup.option();
      if (openOnFieldClick && isFunction(initialHideOnOutsideClick)) {
        const hideOnOutsideClick = (e) => {
          const $target = renderer_default(e.target);
          const $label = $parent.find(`label[for="${editorInputId}"]`);
          const isLabelClicked = !!$target.closest($label).length;
          return !isLabelClicked && initialHideOnOutsideClick(e);
        };
        component.option("dropDownOptions", {
          hideOnOutsideClick
        });
        popup.option({
          hideOnOutsideClick
        });
      }
    }
  };
}
function _convertToEditorOptions(_ref4) {
  let {
    $parent,
    editorType,
    defaultEditorName,
    editorValue,
    canAssignUndefinedValueToEditor,
    externalEditorOptions,
    editorInputId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode,
    labelText,
    labelMark
  } = _ref4;
  const editorOptionsWithValue = {};
  if (void 0 !== editorValue || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }
  if (EDITORS_WITH_ARRAY_VALUE.includes(editorType)) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }
  let labelMode = null === externalEditorOptions || void 0 === externalEditorOptions ? void 0 : externalEditorOptions.labelMode;
  if (!isDefined(labelMode)) {
    labelMode = "outside" === formLabelMode ? "hidden" : formLabelMode;
  }
  const stylingMode = (null === externalEditorOptions || void 0 === externalEditorOptions ? void 0 : externalEditorOptions.stylingMode) || editorStylingMode;
  const useSpecificLabelOptions = EDITORS_WITH_SPECIFIC_LABELS.includes(editorType);
  const dropDownEditorOptions = getDropDownEditorOptions($parent, editorType, editorInputId);
  const result = extend(true, editorOptionsWithValue, externalEditorOptions, dropDownEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode,
    label: useSpecificLabelOptions ? null === externalEditorOptions || void 0 === externalEditorOptions ? void 0 : externalEditorOptions.label : labelText,
    labelMode,
    labelMark
  });
  if (externalEditorOptions) {
    if (result.dataSource) {
      result.dataSource = externalEditorOptions.dataSource;
    }
    if (result.items) {
      result.items = externalEditorOptions.items;
    }
  }
  if (defaultEditorName) {
    if (EDITORS_WITH_MULTIPLE_INPUT_FIELDS.includes(editorType)) {
      if ("dxRangeSlider" === editorType) {
        if (!result.startName) {
          result.startName = `${defaultEditorName}Start`;
        }
        if (!result.endName) {
          result.endName = `${defaultEditorName}End`;
        }
      }
      if ("dxDateRangeBox" === editorType) {
        if (!result.startDateName) {
          result.startDateName = `${defaultEditorName}Start`;
        }
        if (!result.endDateName) {
          result.endDateName = `${defaultEditorName}End`;
        }
      }
      return result;
    }
    if (!result.name) {
      result.name = defaultEditorName;
    }
  }
  return result;
}
function convertToRenderFieldItemOptions(_ref5) {
  let {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    item,
    template,
    labelTemplate,
    name,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorValue,
    canAssignUndefinedValueToEditor,
    editorValidationBoundary,
    editorStylingMode,
    showColonAfterLabel,
    managerLabelLocation,
    itemId,
    managerMarkOptions,
    labelMode,
    onLabelTemplateRendered
  } = _ref5;
  const isRequired = isDefined(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  const isSimpleItem = item.itemType === SIMPLE_ITEM_TYPE;
  const helpID = item.helpText ? `dx-${new guid_default()}` : null;
  const labelOptions = _convertToLabelOptions({
    item,
    id: itemId,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation: managerLabelLocation,
    formLabelMode: labelMode,
    labelTemplate,
    onLabelTemplateRendered
  });
  const needRenderLabel = !!labelOptions.visible && !!(labelOptions.text || labelOptions.labelTemplate && isSimpleItem);
  const {
    location: labelLocation,
    labelID
  } = labelOptions;
  const labelNeedBaselineAlign = "top" !== labelLocation && ["dxTextArea", "dxRadioGroup", "dxCalendar", "dxHtmlEditor"].includes(item.editorType ?? "");
  const editorOptions = _convertToEditorOptions({
    $parent,
    editorType: item.editorType,
    editorValue,
    defaultEditorName: item.dataField,
    canAssignUndefinedValueToEditor,
    externalEditorOptions: item.editorOptions,
    editorInputId: itemId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode: labelMode,
    labelText: labelOptions.textWithoutColon,
    labelMark: labelOptions.markOptions.showRequiredMark ? String.fromCharCode(160) + labelOptions.markOptions.requiredMark : ""
  });
  const needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && "hidden" !== editorOptions.labelMode && !isDefined(item.helpText);
  const helpText = needRenderOptionalMarkAsHelpText ? labelOptions.markOptions.optionalMark : item.helpText;
  return {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    item,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorOptions
  };
}
function getLabelMarkText(_ref6) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref6;
  if (!showRequiredMark && !showOptionalMark) {
    return "";
  }
  return String.fromCharCode(160) + (showRequiredMark ? requiredMark : optionalMark);
}

// node_modules/devextreme/esm/__internal/ui/form/components/label.js
function renderLabelMark(markOptions) {
  const markText = getLabelMarkText(markOptions);
  if ("" === markText) {
    return renderer_default();
  }
  const markClass = markOptions.showRequiredMark ? "dx-field-item-required-mark" : "dx-field-item-optional-mark";
  return renderer_default("<span>").addClass(markClass).text(markText);
}
function renderLabel(_ref) {
  let {
    text,
    id,
    location,
    alignment,
    labelID = null,
    markOptions = {},
    labelTemplate,
    labelTemplateData,
    onLabelTemplateRendered
  } = _ref;
  if ((!isDefined(text) || text.length <= 0) && !isDefined(labelTemplate)) {
    return null;
  }
  const $label = renderer_default("<label>").addClass(`${FIELD_ITEM_LABEL_CLASS} dx-field-item-label-location-${location}`).attr("for", id).attr("id", labelID).css("textAlign", alignment);
  const $labelContainer = renderer_default("<span>").addClass(FIELD_ITEM_LABEL_CONTENT_CLASS);
  let $labelContent = renderer_default("<span>").addClass("dx-field-item-label-text");
  $labelContent.text(text);
  if (labelTemplate) {
    $labelContent = renderer_default("<div>").addClass("dx-field-item-custom-label-content");
    labelTemplateData.text = text;
    labelTemplate.render({
      container: getPublicElement($labelContent),
      model: labelTemplateData,
      onRendered() {
        null === onLabelTemplateRendered || void 0 === onLabelTemplateRendered || onLabelTemplateRendered();
      }
    });
  }
  return $label.append($labelContainer.append($labelContent).append(renderLabelMark(markOptions)));
}
function getLabelWidthByHTML(labelContent) {
  let result = 0;
  const itemsCount = labelContent.children.length;
  for (let i = 0; i < itemsCount; i += 1) {
    const child = labelContent.children[i];
    result += child.offsetWidth;
  }
  return result;
}
function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector) {
  const labelContentItemsSelector = `${labelsSelector} > .${FIELD_ITEM_LABEL_CLASS}:not(.dx-field-item-label-location-top) > .${FIELD_ITEM_LABEL_CONTENT_CLASS}`;
  const $labelContentItems = $targetContainer.find(labelContentItemsSelector);
  const labelContentItemCount = $labelContentItems.length;
  let labelWidth = 0;
  let maxWidth = 0;
  for (let i = 0; i < labelContentItemCount; i += 1) {
    labelWidth = getLabelWidthByHTML($labelContentItems[i]);
    if (labelWidth > maxWidth) {
      maxWidth = labelWidth;
    }
  }
  for (let i = 0; i < labelContentItemCount; i += 1) {
    $labelContentItems[i].style.width = `${maxWidth}px`;
  }
}

// node_modules/devextreme/esm/__internal/ui/form/form.item_option_action.js
var ItemOptionAction = class {
  constructor(options) {
    this._options = options;
    this._itemsRunTimeInfo = this._options.itemsRunTimeInfo;
  }
  findInstance() {
    return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item);
  }
  findItemContainer() {
    return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item);
  }
  findPreparedItem() {
    return this._itemsRunTimeInfo.findPreparedItemByItem(this._options.item);
  }
  tryExecute() {
    class_default.abstract();
  }
};

// node_modules/devextreme/esm/__internal/ui/form/form.utils.js
var createItemPathByIndex = (index, isTabs) => `${isTabs ? "tabs" : "items"}[${index}]`;
var concatPaths = (path1, path2) => {
  if (isDefined(path1) && isDefined(path2)) {
    return `${path1}.${path2}`;
  }
  return path1 || path2;
};
var getTextWithoutSpaces = (text) => text ? text.replace(/\s/g, "") : void 0;
var isEqualToDataFieldOrNameOrTitleOrCaption = (item, fieldName) => {
  if (item) {
    return item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || "group" === item.itemType && getTextWithoutSpaces(item.caption) === fieldName;
  }
  return false;
};
var getFullOptionName = (path, optionName) => `${path}.${optionName}`;
var getOptionNameFromFullName = (fullName) => {
  const parts = fullName.split(".");
  return parts[parts.length - 1].replace(/\[\d+]/, "");
};
var isFullPathContainsTabs = (fullPath) => fullPath.includes("tabs");
var tryGetTabPath = (fullPath) => {
  const pathParts = fullPath.split(".");
  const resultPathParts = [...pathParts];
  for (let i = pathParts.length - 1; i >= 0; i -= 1) {
    if (isFullPathContainsTabs(pathParts[i])) {
      return resultPathParts.join(".");
    }
    resultPathParts.splice(i, 1);
  }
  return "";
};
var getItemPath = (items, item, isTabs) => {
  if (!item) {
    return "";
  }
  const index = items.indexOf(item);
  if (index > -1) {
    return createItemPathByIndex(index, isTabs);
  }
  for (let i = 0; i < items.length; i += 1) {
    const targetItem = items[i];
    const tabOrGroupItems = targetItem.tabs ?? targetItem.items;
    if (tabOrGroupItems) {
      const itemPath = getItemPath(tabOrGroupItems, item, !!targetItem.tabs);
      if (itemPath) {
        return concatPaths(createItemPathByIndex(i, isTabs), itemPath) ?? "";
      }
    }
  }
  return "";
};
function convertToLayoutManagerOptions(_ref) {
  let {
    form,
    $formElement,
    formOptions,
    items,
    validationGroup,
    extendedLayoutManagerOptions,
    onFieldDataChanged,
    onContentReady,
    onDisposing,
    onFieldItemRendered
  } = _ref;
  const baseOptions = {
    form,
    items,
    $formElement,
    validationGroup,
    onFieldDataChanged,
    onContentReady,
    onDisposing,
    onFieldItemRendered,
    validationBoundary: formOptions.scrollingEnabled ? $formElement : void 0,
    scrollingEnabled: formOptions.scrollingEnabled,
    showRequiredMark: formOptions.showRequiredMark,
    showOptionalMark: formOptions.showOptionalMark,
    requiredMark: formOptions.requiredMark,
    optionalMark: formOptions.optionalMark,
    requiredMessage: formOptions.requiredMessage,
    screenByWidth: formOptions.screenByWidth,
    layoutData: formOptions.formData,
    labelLocation: formOptions.labelLocation,
    customizeItem: formOptions.customizeItem,
    minColWidth: formOptions.minColWidth,
    showColonAfterLabel: formOptions.showColonAfterLabel,
    onEditorEnterKey: formOptions.onEditorEnterKey,
    labelMode: formOptions.labelMode
  };
  const result = extend(baseOptions, {
    isRoot: extendedLayoutManagerOptions.isRoot,
    colCount: extendedLayoutManagerOptions.colCount,
    alignItemLabels: extendedLayoutManagerOptions.alignItemLabels,
    cssItemClass: extendedLayoutManagerOptions.cssItemClass,
    colCountByScreen: extendedLayoutManagerOptions.colCountByScreen,
    onLayoutChanged: extendedLayoutManagerOptions.onLayoutChanged,
    width: extendedLayoutManagerOptions.width
  });
  return result;
}

// node_modules/devextreme/esm/__internal/ui/form/form.item_options_actions.js
var WidgetOptionItemOptionAction = class extends ItemOptionAction {
  tryExecute() {
    const {
      value
    } = this._options;
    const instance = this.findInstance();
    if (instance) {
      instance.option(value);
      return true;
    }
    return false;
  }
};
var TabOptionItemOptionAction = class extends ItemOptionAction {
  tryExecute() {
    const tabPanel = this.findInstance();
    if (tabPanel) {
      const {
        optionName,
        item,
        value
      } = this._options;
      const itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item) ?? -1;
      if (itemIndex >= 0) {
        tabPanel.option(getFullOptionName(`items[${itemIndex}]`, optionName), value);
        return true;
      }
    }
    return false;
  }
};
var SimpleItemTemplateChangedAction = class extends ItemOptionAction {
  tryExecute() {
    return false;
  }
};
var GroupItemTemplateChangedAction = class extends ItemOptionAction {
  tryExecute() {
    const preparedItem = this.findPreparedItem();
    if (null !== preparedItem && void 0 !== preparedItem && preparedItem._prepareGroupItemTemplate && preparedItem._renderGroupContentTemplate) {
      preparedItem._prepareGroupItemTemplate(this._options.item.template);
      preparedItem._renderGroupContentTemplate();
      return true;
    }
    return false;
  }
};
var TabsOptionItemOptionAction = class extends ItemOptionAction {
  tryExecute() {
    const tabPanel = this.findInstance();
    if (tabPanel) {
      const {
        value
      } = this._options;
      tabPanel.option("dataSource", value);
      return true;
    }
    return false;
  }
};
var ValidationRulesItemOptionAction = class extends ItemOptionAction {
  tryExecute() {
    const {
      item
    } = this._options;
    const instance = this.findInstance();
    const validator = instance && data(instance.$element()[0], "dxValidator");
    if (validator && item) {
      const filterRequired = (validationRule) => "required" === validationRule.type;
      const oldContainsRequired = (validator.option("validationRules") || []).some(filterRequired);
      const newContainsRequired = (item.validationRules ?? []).some(filterRequired);
      if (oldContainsRequired === newContainsRequired) {
        validator.option("validationRules", item.validationRules);
        return true;
      }
    }
    return false;
  }
};
var CssClassItemOptionAction = class extends ItemOptionAction {
  tryExecute() {
    const $itemContainer = this.findItemContainer();
    if ($itemContainer.length) {
      const {
        previousValue = "",
        value = ""
      } = this._options;
      $itemContainer.removeClass(previousValue).addClass(value);
      return true;
    }
    return false;
  }
};
var tryCreateItemOptionAction = (optionName, itemActionOptions) => {
  switch (optionName) {
    case "editorOptions":
    case "buttonOptions":
      return new WidgetOptionItemOptionAction(itemActionOptions);
    case "validationRules":
      return new ValidationRulesItemOptionAction(itemActionOptions);
    case "cssClass":
      return new CssClassItemOptionAction(itemActionOptions);
    case "badge":
    case "disabled":
    case "icon":
    case "tabTemplate":
    case "title":
      itemActionOptions.optionName = optionName;
      return new TabOptionItemOptionAction(itemActionOptions);
    case "tabs":
      return new TabsOptionItemOptionAction(itemActionOptions);
    case "template": {
      var _itemActionOptions$it, _itemActionOptions$it2;
      const itemType = (null === itemActionOptions || void 0 === itemActionOptions || null === (_itemActionOptions$it = itemActionOptions.item) || void 0 === _itemActionOptions$it ? void 0 : _itemActionOptions$it.itemType) ?? (null === (_itemActionOptions$it2 = itemActionOptions.itemsRunTimeInfo.findPreparedItemByItem(null === itemActionOptions || void 0 === itemActionOptions ? void 0 : itemActionOptions.item)) || void 0 === _itemActionOptions$it2 ? void 0 : _itemActionOptions$it2.itemType);
      if ("simple" === itemType) {
        return new SimpleItemTemplateChangedAction(itemActionOptions);
      }
      if ("group" === itemType) {
        return new GroupItemTemplateChangedAction(itemActionOptions);
      }
      itemActionOptions.optionName = optionName;
      return new TabOptionItemOptionAction(itemActionOptions);
    }
    default:
      return null;
  }
};
var form_item_options_actions_default = tryCreateItemOptionAction;

// node_modules/devextreme/esm/__internal/ui/form/form.items_runtime_info.js
var FormItemsRunTimeInfo = class {
  constructor() {
    this._map = {};
  }
  _findWidgetInstance(condition) {
    let result;
    each(this._map, ((_guid, _ref) => {
      let {
        widgetInstance,
        item
      } = _ref;
      if (condition(item)) {
        result = widgetInstance;
        return false;
      }
      return true;
    }));
    return result;
  }
  _findFieldByCondition(callback, valueExpr) {
    let result;
    each(this._map, ((key, value) => {
      if (callback(value)) {
        result = "guid" === valueExpr ? key : value[valueExpr];
        return false;
      }
      return true;
    }));
    return result;
  }
  clear() {
    this._map = {};
  }
  removeItemsByItems(itemsRunTimeInfo) {
    each(itemsRunTimeInfo.getItems(), ((guid) => this.removeItemByKey(guid)));
  }
  removeItemByKey(key) {
    delete this._map[key];
  }
  add(options) {
    const key = options.guid ?? new guid_default().toString();
    this._map[key] = options;
    return key;
  }
  addItemsOrExtendFrom(itemsRunTimeInfo) {
    itemsRunTimeInfo.each(((key, itemRunTimeInfo) => {
      if (this._map[key]) {
        if (itemRunTimeInfo.widgetInstance) {
          this._map[key].widgetInstance = itemRunTimeInfo.widgetInstance;
        }
        this._map[key].$itemContainer = itemRunTimeInfo.$itemContainer;
      } else {
        this.add({
          item: itemRunTimeInfo.item,
          widgetInstance: itemRunTimeInfo.widgetInstance,
          guid: key,
          $itemContainer: itemRunTimeInfo.$itemContainer
        });
      }
    }));
  }
  extendRunTimeItemInfoByKey(key, options) {
    if (this._map[key]) {
      this._map[key] = extend(this._map[key], options);
    }
  }
  findWidgetInstanceByItem(item) {
    return this._findWidgetInstance(((storedItem) => storedItem === item));
  }
  findGroupOrTabLayoutManagerByPath(targetPath) {
    return this._findFieldByCondition(((_ref2) => {
      let {
        path
      } = _ref2;
      return path === targetPath;
    }), "layoutManager");
  }
  findKeyByPath(targetPath) {
    return this._findFieldByCondition(((_ref3) => {
      let {
        path
      } = _ref3;
      return path === targetPath;
    }), "guid");
  }
  findWidgetInstanceByName(name) {
    return this._findWidgetInstance(((item) => name === item.name));
  }
  findWidgetInstanceByDataField(dataField) {
    return this._findWidgetInstance(((item) => dataField === (isString(item) ? item : item.dataField)));
  }
  findItemContainerByItem(item) {
    for (const key in this._map) {
      if (this._map[key].item === item) {
        return this._map[key].$itemContainer ?? renderer_default();
      }
    }
    return renderer_default();
  }
  findItemIndexByItem(targetItem) {
    return this._findFieldByCondition(((_ref4) => {
      let {
        item
      } = _ref4;
      return item === targetItem;
    }), "itemIndex");
  }
  findPreparedItemByItem(item) {
    return this._findFieldByCondition(((_ref5) => {
      let {
        item: currentItem
      } = _ref5;
      return currentItem === item;
    }), "preparedItem");
  }
  getItems() {
    return this._map;
  }
  each(handler) {
    each(this._map, ((key, itemRunTimeInfo) => {
      handler(key, itemRunTimeInfo);
    }));
  }
  removeItemsByPathStartWith(path) {
    const keys = Object.keys(this._map);
    const filteredKeys = keys.filter(((key) => {
      if (this._map[key].path) {
        var _this$_map$key$path;
        return null === (_this$_map$key$path = this._map[key].path) || void 0 === _this$_map$key$path ? void 0 : _this$_map$key$path.includes(path, 0);
      }
      return false;
    }));
    filteredKeys.forEach(((key) => this.removeItemByKey(key)));
  }
};

// node_modules/devextreme/esm/ui/text_box/text_box.js
var text_box_default = m_text_box_default;

// node_modules/devextreme/esm/ui/text_box.js
var text_box_default2 = text_box_default;

// node_modules/devextreme/esm/__internal/ui/text_box/m_text_editor.js
component_registrator_default("dxTextEditor", m_text_editor_mask_default);
var m_text_editor_default = m_text_editor_mask_default;

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.spin.js
var SPIN_CLASS = "dx-numberbox-spin";
var SPIN_BUTTON_CLASS = "dx-numberbox-spin-button";
var NUMBER_BOX = "dxNumberBox";
var POINTERUP_EVENT_NAME = addNamespace(m_pointer_default.up, NUMBER_BOX);
var POINTERCANCEL_EVENT_NAME = addNamespace(m_pointer_default.cancel, NUMBER_BOX);
var SpinButton = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: "up",
      onChange: null,
      activeStateEnabled: true,
      hoverStateEnabled: true
    });
  }
  _initMarkup() {
    super._initMarkup();
    const {
      direction: spinDirection
    } = this.option();
    const direction = `${SPIN_CLASS}-${spinDirection}`;
    this.$element().addClass(SPIN_BUTTON_CLASS).addClass(direction);
    this._spinIcon = renderer_default("<div>").addClass(`${direction}-icon`).appendTo(this.$element());
  }
  _render() {
    super._render();
    const eventName = addNamespace(m_pointer_default.down, this.NAME);
    const $element = this.$element();
    m_events_engine_default.off($element, eventName);
    m_events_engine_default.on($element, eventName, this._spinDownHandler.bind(this));
    this._spinChangeHandler = this._createActionByOption("onChange");
  }
  _spinDownHandler(e) {
    e.preventDefault();
    this._clearTimer();
    m_events_engine_default.on(this.$element(), m_hold_default.name, (() => {
      this._feedBackDeferred = Deferred();
      lock(this._feedBackDeferred);
      this._spinChangeHandler({
        event: e
      });
      this._holdTimer = setInterval(this._spinChangeHandler, 100, {
        event: e
      });
    }));
    const document = dom_adapter_default.getDocument();
    m_events_engine_default.on(document, POINTERUP_EVENT_NAME, this._clearTimer.bind(this));
    m_events_engine_default.on(document, POINTERCANCEL_EVENT_NAME, this._clearTimer.bind(this));
    this._spinChangeHandler({
      event: e
    });
  }
  _dispose() {
    this._clearTimer();
    super._dispose();
  }
  _clearTimer() {
    m_events_engine_default.off(this.$element(), m_hold_default.name);
    const document = dom_adapter_default.getDocument();
    m_events_engine_default.off(document, POINTERUP_EVENT_NAME);
    m_events_engine_default.off(document, POINTERCANCEL_EVENT_NAME);
    if (this._feedBackDeferred) {
      this._feedBackDeferred.resolve();
    }
    if (this._holdTimer) {
      clearInterval(this._holdTimer);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "onChange":
      case "direction":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var m_number_box_spin_default = SpinButton;

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.spins.js
var SPIN_CLASS2 = "dx-numberbox-spin";
var SPIN_CONTAINER_CLASS = "dx-numberbox-spin-container";
var SPIN_TOUCH_FRIENDLY_CLASS = "dx-numberbox-spin-touch-friendly";
var SpinButtons = class extends TextEditorButton {
  _attachEvents(instance, $spinContainer) {
    const {
      editor
    } = this;
    const eventName = addNamespace(m_pointer_default.down, editor.NAME);
    const $spinContainerChildren = $spinContainer.children();
    const pointerDownAction = editor._createAction(((e) => editor._spinButtonsPointerDownHandler(e)));
    m_events_engine_default.off($spinContainer, eventName);
    m_events_engine_default.on($spinContainer, eventName, ((e) => pointerDownAction({
      event: e
    })));
    m_number_box_spin_default.getInstance($spinContainerChildren.eq(0)).option("onChange", ((e) => editor._spinUpChangeHandler(e)));
    m_number_box_spin_default.getInstance($spinContainerChildren.eq(1)).option("onChange", ((e) => editor._spinDownChangeHandler(e)));
  }
  _create() {
    const {
      editor
    } = this;
    const $spinContainer = renderer_default("<div>").addClass(SPIN_CONTAINER_CLASS);
    const $spinUp = renderer_default("<div>").appendTo($spinContainer);
    const $spinDown = renderer_default("<div>").appendTo($spinContainer);
    const options = this._getOptions();
    this._addToContainer($spinContainer);
    editor._createComponent($spinUp, m_number_box_spin_default, extend({
      direction: "up"
    }, options));
    editor._createComponent($spinDown, m_number_box_spin_default, extend({
      direction: "down"
    }, options));
    this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
    return {
      instance: $spinContainer,
      $element: $spinContainer
    };
  }
  _getOptions() {
    const {
      editor
    } = this;
    const visible = this._isVisible();
    const disabled = editor.option("disabled");
    return {
      visible,
      disabled
    };
  }
  _isVisible() {
    const {
      editor
    } = this;
    return super._isVisible() && editor.option("showSpinButtons");
  }
  _isTouchFriendly() {
    const {
      editor
    } = this;
    return editor.option("showSpinButtons") && editor.option("useLargeSpinButtons");
  }
  _legacyRender($editor, isTouchFriendly, isVisible) {
    $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
    $editor.toggleClass(SPIN_CLASS2, isVisible);
  }
  update() {
    const shouldUpdate = super.update();
    if (shouldUpdate) {
      const {
        editor,
        instance
      } = this;
      const $editor = editor.$element();
      const isVisible = this._isVisible();
      const isTouchFriendly = this._isTouchFriendly();
      const $spinButtons = instance.children();
      const spinUp = m_number_box_spin_default.getInstance($spinButtons.eq(0));
      const spinDown = m_number_box_spin_default.getInstance($spinButtons.eq(1));
      const options = this._getOptions();
      spinUp.option(options);
      spinDown.option(options);
      this._legacyRender($editor, isTouchFriendly, isVisible);
    }
  }
};

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.base.js
var math = Math;
var WIDGET_CLASS = "dx-numberbox";
var FIREFOX_CONTROL_KEYS = ["tab", "del", "backspace", "leftArrow", "rightArrow", "home", "end", "enter"];
var NumberBoxBase = class extends m_text_editor_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      upArrow(e) {
        if (!isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          this._spinUpChangeHandler(e);
        }
      },
      downArrow(e) {
        if (!isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          this._spinDownChangeHandler(e);
        }
      },
      enter() {
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: 0,
      min: void 0,
      max: void 0,
      step: 1,
      showSpinButtons: false,
      useLargeSpinButtons: true,
      mode: "text",
      invalidValueMessage: message_default.format("dxNumberBox-invalidValueMessage"),
      buttons: void 0
    });
  }
  _useTemplates() {
    return false;
  }
  _getDefaultButtons() {
    return super._getDefaultButtons().concat([{
      name: "spins",
      Ctor: SpinButtons
    }]);
  }
  _isSupportInputMode() {
    const version = parseFloat(browser_default.version);
    return browser_default.chrome && version >= 66 || browser_default.safari && version >= 12;
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => devices_default.real().generic && !devices_default.isSimulator(),
      options: {
        useLargeSpinButtons: false
      }
    }, {
      device: (function() {
        return "desktop" !== devices_default.real().deviceType && !this._isSupportInputMode();
      }).bind(this),
      options: {
        mode: "number"
      }
    }]);
  }
  _initMarkup() {
    this._renderSubmitElement();
    this.$element().addClass(WIDGET_CLASS);
    super._initMarkup();
    this._toggleTabIndex();
  }
  _getDefaultAttributes() {
    const attributes = super._getDefaultAttributes();
    attributes.inputmode = "decimal";
    return attributes;
  }
  _renderContentImpl() {
    this.option("isValid") && this._validateValue(this.option("value"));
    this.setAria("role", "spinbutton");
  }
  _renderSubmitElement() {
    this._$submitElement = renderer_default("<input>").attr("type", "hidden").appendTo(this.$element());
    this._setSubmitValue(this.option("value"));
  }
  _setSubmitValue(value) {
    this._getSubmitElement().val(applyServerDecimalSeparator(value));
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _keyPressHandler(e) {
    super._keyPressHandler();
    const char = getChar(e);
    const isInputCharValid = /[\d.,eE\-+]/.test(char);
    if (!isInputCharValid) {
      const keyName = normalizeKeyName(e);
      if (isCommandKeyPressed(e) || keyName && FIREFOX_CONTROL_KEYS.includes(keyName)) {
        return;
      }
      e.preventDefault();
      return;
    }
    this._keyPressed = true;
  }
  _hasMouseWheelHandler() {
    return true;
  }
  _onMouseWheel(dxEvent) {
    dxEvent.delta > 0 ? this._spinValueChange(1, dxEvent) : this._spinValueChange(-1, dxEvent);
  }
  _renderValue() {
    const inputValue = this._input().val();
    const value = this.option("value");
    if (!inputValue.length || Number(inputValue) !== value) {
      this._forceValueRender();
      this._toggleEmptinessEventHandler();
    }
    const valueText = isDefined(value) ? null : message_default.format("dxNumberBox-noDataText");
    this.setAria({
      valuenow: ensureDefined(value, ""),
      valuetext: valueText
    });
    this.option("text", this._input().val());
    this._updateButtons();
    return Deferred().resolve();
  }
  _forceValueRender() {
    const value = this.option("value");
    const number = Number(value);
    const formattedValue = isNaN(number) ? "" : this._applyDisplayValueFormatter(value);
    this._renderDisplayText(formattedValue);
  }
  _applyDisplayValueFormatter(value) {
    const {
      displayValueFormatter
    } = this.option();
    return null === displayValueFormatter || void 0 === displayValueFormatter ? void 0 : displayValueFormatter(value);
  }
  _renderProps() {
    this._input().prop({
      min: this.option("min"),
      max: this.option("max"),
      step: this.option("step")
    });
    this.setAria({
      valuemin: ensureDefined(this.option("min"), ""),
      valuemax: ensureDefined(this.option("max"), "")
    });
  }
  _spinButtonsPointerDownHandler() {
    const $input = this._input();
    if (!this.option("useLargeSpinButtons") && dom_adapter_default.getActiveElement() !== $input[0]) {
      m_events_engine_default.trigger($input, "focus");
    }
  }
  _spinUpChangeHandler(e) {
    if (!this.option("readOnly")) {
      this._spinValueChange(1, e.event || e);
    }
  }
  _spinDownChangeHandler(e) {
    if (!this.option("readOnly")) {
      this._spinValueChange(-1, e.event || e);
    }
  }
  _spinValueChange(sign2, dxEvent) {
    const step = parseFloat(this.option("step"));
    if (0 === step) {
      return;
    }
    let value = parseFloat(this._normalizeInputValue()) || 0;
    value = this._correctRounding(value, step * sign2);
    const min = this.option("min");
    const max = this.option("max");
    if (isDefined(min)) {
      value = Math.max(min, value);
    }
    if (isDefined(max)) {
      value = Math.min(max, value);
    }
    this._saveValueChangeEvent(dxEvent);
    this.option("value", value);
  }
  _correctRounding(value, step) {
    const regex = /[,.](.*)/;
    const isFloatValue = regex.test(value);
    const isFloatStep = regex.test(step);
    if (isFloatValue || isFloatStep) {
      const valueAccuracy = isFloatValue ? regex.exec(value)[0].length : 0;
      const stepAccuracy = isFloatStep ? regex.exec(step)[0].length : 0;
      const accuracy = math.max(valueAccuracy, stepAccuracy);
      value = this._round(value + step, accuracy);
      return value;
    }
    return value + step;
  }
  _round(value, precision) {
    precision = precision || 0;
    const multiplier = 10 ** precision;
    value *= multiplier;
    value = Math.round(value) / multiplier;
    return value;
  }
  _renderValueChangeEvent() {
    super._renderValueChangeEvent();
    const forceValueChangeEvent = addNamespace("focusout", "NumberBoxForceValueChange");
    m_events_engine_default.off(this.element(), forceValueChangeEvent);
    m_events_engine_default.on(this.element(), forceValueChangeEvent, this._forceRefreshInputValue.bind(this));
  }
  _forceRefreshInputValue() {
    const {
      mode
    } = this.option();
    if ("number" === mode) {
      return;
    }
    const $input = this._input();
    const formattedValue = this._applyDisplayValueFormatter(this.option("value"));
    $input.val(null);
    $input.val(formattedValue);
  }
  _valueChangeEventHandler(e) {
    const $input = this._input();
    const inputValue = this._normalizeText();
    const value = this._parseValue(inputValue);
    const valueHasDigits = "." !== inputValue && "-" !== inputValue;
    if (this._isValueValid() && !this._validateValue(value)) {
      $input.val(this._applyDisplayValueFormatter(value));
      return;
    }
    if (valueHasDigits) {
      super._valueChangeEventHandler(e, isNaN(value) ? null : value);
    }
    this._applyValueBoundaries(inputValue, value);
    this.validationRequest.fire({
      value,
      editor: this
    });
  }
  _applyValueBoundaries(inputValue, parsedValue) {
    const isValueIncomplete = this._isValueIncomplete(inputValue);
    const isValueCorrect = this._isValueInRange(inputValue);
    if (!isValueIncomplete && !isValueCorrect && null !== parsedValue) {
      if (Number(inputValue) !== parsedValue) {
        this._input().val(this._applyDisplayValueFormatter(parsedValue));
      }
    }
  }
  _replaceCommaWithPoint(value) {
    return value.replace(",", ".");
  }
  _inputIsInvalid() {
    const {
      mode
    } = this.option();
    const isNumberMode = "number" === mode;
    const validityState = this._input().get(0).validity;
    return isNumberMode && (null === validityState || void 0 === validityState ? void 0 : validityState.badInput);
  }
  _renderDisplayText(text) {
    if (this._inputIsInvalid()) {
      return;
    }
    super._renderDisplayText(text);
  }
  _isValueIncomplete(value) {
    return /(^-$)|(^-?\d*\.$)|(\d+e-?$)/i.test(value);
  }
  _isValueInRange(value) {
    return inRange(value, this.option("min"), this.option("max"));
  }
  _isNumber(value) {
    return null !== this._parseValue(value);
  }
  _validateValue(value) {
    const inputValue = this._normalizeText();
    const isValueValid = this._isValueValid();
    let isValid = true;
    const isNumber = this._isNumber(inputValue);
    if (isNaN(Number(value))) {
      isValid = false;
    }
    if (!value && isValueValid) {
      isValid = true;
    } else if (!isNumber && !isValueValid) {
      isValid = false;
    }
    this.option({
      isValid,
      validationError: isValid ? null : {
        editorSpecific: true,
        message: this.option("invalidValueMessage")
      }
    });
    return isValid;
  }
  _normalizeInputValue() {
    return this._parseValue(this._normalizeText());
  }
  _normalizeText() {
    const value = this._input().val().trim();
    return this._replaceCommaWithPoint(value);
  }
  _parseValue(value) {
    const number = parseFloat(value);
    if (isNaN(number)) {
      return null;
    }
    return fitIntoRange(number, this.option("min"), this.option("max"));
  }
  _clearValue() {
    if (this._inputIsInvalid()) {
      this._input().val("");
      this._validateValue();
    }
    super._clearValue();
  }
  clear() {
    if (null === this.option("value")) {
      this.option("text", "");
      if (this._input().length) {
        this._renderValue();
      }
    } else {
      this.option("value", null);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "value":
        this._validateValue(args.value);
        this._setSubmitValue(args.value);
        super._optionChanged(args);
        this._resumeValueChangeAction();
        break;
      case "step":
        this._renderProps();
        break;
      case "min":
      case "max":
        this._renderProps();
        this.option("value", this._parseValue(this.option("value")));
        break;
      case "showSpinButtons":
      case "useLargeSpinButtons":
        this._updateButtons(["spins"]);
        break;
      case "invalidValueMessage":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var m_number_box_base_default = NumberBoxBase;

// node_modules/devextreme/esm/__internal/ui/number_box/m_utils.js
var getRealSeparatorIndex = function(str) {
  let quoteBalance = 0;
  let separatorCount = 0;
  for (let i = 0; i < str.length; ++i) {
    if ("'" === str[i]) {
      quoteBalance++;
    }
    if ("." === str[i]) {
      ++separatorCount;
      if (quoteBalance % 2 === 0) {
        return {
          occurrence: separatorCount,
          index: i
        };
      }
    }
  }
  return {
    occurrence: 1,
    index: -1
  };
};
var getNthOccurrence = function(str, c, n) {
  let i = -1;
  while (n-- && i++ < str.length) {
    i = str.indexOf(c, i);
  }
  return i;
};
var splitByIndex = function(str, index) {
  if (-1 === index) {
    return [str];
  }
  return [str.slice(0, index), str.slice(index + 1)];
};
var adjustPercentValue = function(rawValue, interval) {
  if (!rawValue) {
    return rawValue;
  }
  return adjust(rawValue / 100, interval / 100);
};

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.caret.js
var getCaretBoundaries = function(text, format2) {
  if ("string" === typeof format2) {
    const signParts = format2.split(";");
    const sign2 = number_default.getSign(text, format2);
    signParts[1] = signParts[1] || `-${signParts[0]}`;
    format2 = signParts[sign2 < 0 ? 1 : 0];
    const mockEscapedStubs = (str) => str.replace(/'([^']*)'/g, ((str2) => str2.split("").map((() => " ")).join("").substr(2)));
    format2 = mockEscapedStubs(format2);
    const prefixStubLength = /^[^#0.,]*/.exec(format2)[0].length;
    const postfixStubLength = /[^#0.,]*$/.exec(format2)[0].length;
    return {
      start: prefixStubLength,
      end: text.length - postfixStubLength
    };
  }
  return {
    start: 0,
    end: text.length
  };
};
var _getDigitCountBeforeIndex = function(index, text) {
  const decimalSeparator = number_default.getDecimalSeparator();
  const regExp = new RegExp(`[^0-9${escapeRegExp(decimalSeparator)}]`, "g");
  const textBeforePosition = text.slice(0, index);
  return textBeforePosition.replace(regExp, "").length;
};
var _reverseText = function(text) {
  return text.split("").reverse().join("");
};
var _getDigitPositionByIndex = function(digitIndex, text) {
  if (!digitIndex) {
    return -1;
  }
  const regExp = /[0-9]/g;
  let counter = 1;
  let index = null;
  let result = regExp.exec(text);
  while (result) {
    index = result.index;
    if (counter >= digitIndex) {
      return index;
    }
    counter++;
    result = regExp.exec(text);
  }
  return null === index ? text.length : index;
};
var _trimNonNumericCharsFromEnd = function(text) {
  return text.replace(/[^0-9e]+$/, "");
};
var getCaretWithOffset = function(caret, offset) {
  if (void 0 === caret.start) {
    caret = {
      start: caret,
      end: caret
    };
  }
  return {
    start: caret.start + offset,
    end: caret.end + offset
  };
};
var getCaretAfterFormat = function(text, formatted, caret, format2) {
  caret = getCaretWithOffset(caret, 0);
  const point = number_default.getDecimalSeparator();
  const isSeparatorBasedText = isSeparatorBasedString(text);
  const realSeparatorOccurrenceIndex = getRealSeparatorIndex(format2).occurrence;
  const pointPosition = isSeparatorBasedText ? 0 : getNthOccurrence(text, point, realSeparatorOccurrenceIndex);
  const newPointPosition = getNthOccurrence(formatted, point, realSeparatorOccurrenceIndex);
  const textParts = splitByIndex(text, pointPosition);
  const formattedParts = splitByIndex(formatted, newPointPosition);
  const isCaretOnFloat = -1 !== pointPosition && caret.start > pointPosition;
  if (isCaretOnFloat) {
    const relativeIndex = caret.start - pointPosition - 1;
    const digitsBefore = _getDigitCountBeforeIndex(relativeIndex, textParts[1]);
    const newPosition = formattedParts[1] ? newPointPosition + 1 + _getDigitPositionByIndex(digitsBefore, formattedParts[1]) + 1 : formatted.length;
    return getCaretInBoundaries(newPosition, formatted, format2);
  }
  const formattedIntPart = _trimNonNumericCharsFromEnd(formattedParts[0]);
  const positionFromEnd = textParts[0].length - caret.start;
  const digitsFromEnd = _getDigitCountBeforeIndex(positionFromEnd, _reverseText(textParts[0]));
  const newPositionFromEnd = _getDigitPositionByIndex(digitsFromEnd, _reverseText(formattedIntPart));
  const newPositionFromBegin = formattedIntPart.length - (newPositionFromEnd + 1);
  return getCaretInBoundaries(newPositionFromBegin, formatted, format2);
};
function isSeparatorBasedString(text) {
  return 1 === text.length && !!text.match(/^[,.][0-9]*$/g);
}
var isCaretInBoundaries = function(caret, text, format2) {
  caret = getCaretWithOffset(caret, 0);
  const boundaries = getCaretInBoundaries(caret, text, format2);
  return caret.start >= boundaries.start && caret.end <= boundaries.end;
};
function getCaretInBoundaries(caret, text, format2) {
  caret = getCaretWithOffset(caret, 0);
  const boundaries = getCaretBoundaries(text, format2);
  const adjustedCaret = {
    start: fitIntoRange(caret.start, boundaries.start, boundaries.end),
    end: fitIntoRange(caret.end, boundaries.start, boundaries.end)
  };
  return adjustedCaret;
}
var getCaretOffset = function(previousText, newText, format2) {
  const previousBoundaries = getCaretBoundaries(previousText, format2);
  const newBoundaries = getCaretBoundaries(newText, format2);
  return newBoundaries.start - previousBoundaries.start;
};

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.mask.js
var NumberBoxMask = class extends m_number_box_base_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      useMaskBehavior: true,
      format: null
    });
  }
  _isDeleteKey(key) {
    return "del" === key;
  }
  _supportedKeys() {
    if (!this._useMaskBehavior()) {
      return super._supportedKeys();
    }
    return _extends({}, super._supportedKeys(), {
      minus: this._revertSign.bind(this),
      del: this._removeHandler.bind(this),
      backspace: this._removeHandler.bind(this),
      leftArrow: this._arrowHandler.bind(this, -1),
      rightArrow: this._arrowHandler.bind(this, 1),
      home: this._moveCaretToBoundaryEventHandler.bind(this, 1),
      enter: this._updateFormattedValue.bind(this),
      end: this._moveCaretToBoundaryEventHandler.bind(this, -1)
    });
  }
  _getTextSeparatorIndex(text) {
    const decimalSeparator = number_default.getDecimalSeparator();
    const realSeparatorOccurrenceIndex = getRealSeparatorIndex(this.option("format")).occurrence;
    return getNthOccurrence(text, decimalSeparator, realSeparatorOccurrenceIndex);
  }
  _focusInHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this.clearCaretTimeout();
      this._caretTimeout = setTimeout((() => {
        this._caretTimeout = void 0;
        const caret = this._caret();
        if (caret.start === caret.end && this._useMaskBehavior()) {
          const text = this._getInputVal();
          const decimalSeparatorIndex = this._getTextSeparatorIndex(text);
          if (decimalSeparatorIndex >= 0) {
            this._caret({
              start: decimalSeparatorIndex,
              end: decimalSeparatorIndex
            });
          } else {
            this._moveCaretToBoundaryEventHandler(-1, e);
          }
        }
      }), 0);
    }
    super._focusInHandler(e);
  }
  _focusOutHandler(e) {
    const shouldHandleEvent = !this._preventNestedFocusEvent(e);
    if (shouldHandleEvent) {
      this._focusOutOccurs = true;
      if (this._useMaskBehavior()) {
        this._updateFormattedValue();
      }
    }
    super._focusOutHandler(e);
    if (shouldHandleEvent) {
      this._focusOutOccurs = false;
    }
  }
  _hasValueBeenChanged(inputValue) {
    const format2 = this._getFormatPattern();
    const value = this.option("value");
    const formatted = this._format(value, format2) || "";
    return formatted !== inputValue;
  }
  _updateFormattedValue() {
    const inputValue = this._getInputVal();
    if (this._hasValueBeenChanged(inputValue)) {
      this._updateParsedValue();
      this._adjustParsedValue();
      this._setTextByParsedValue();
      const {
        value
      } = this.option();
      if (this._parsedValue !== value) {
        m_events_engine_default.trigger(this._input(), "change");
      }
    }
  }
  _arrowHandler(step, e) {
    if (!this._useMaskBehavior()) {
      return;
    }
    const text = this._getInputVal();
    const format2 = this._getFormatPattern();
    let nextCaret = getCaretWithOffset(this._caret(), step);
    if (!isCaretInBoundaries(nextCaret, text, format2)) {
      nextCaret = 1 === step ? nextCaret.end : nextCaret.start;
      e.preventDefault();
      this._caret(getCaretInBoundaries(nextCaret, text, format2));
    }
  }
  _moveCaretToBoundary(direction) {
    const boundaries = getCaretBoundaries(this._getInputVal(), this._getFormatPattern());
    const newCaret = getCaretWithOffset(1 === direction ? boundaries.start : boundaries.end, 0);
    this._caret(newCaret);
  }
  _moveCaretToBoundaryEventHandler(direction, e) {
    if (!this._useMaskBehavior() || null !== e && void 0 !== e && e.shiftKey) {
      return;
    }
    this._moveCaretToBoundary(direction);
    null === e || void 0 === e || e.preventDefault();
  }
  _shouldMoveCaret(text, caret) {
    const decimalSeparator = number_default.getDecimalSeparator();
    const isDecimalSeparatorNext = text.charAt(caret.end) === decimalSeparator;
    const moveToFloat = (this._lastKey === decimalSeparator || "." === this._lastKey || "," === this._lastKey) && isDecimalSeparatorNext;
    return moveToFloat;
  }
  _getInputVal() {
    return number_default.convertDigits(this._input().val(), true);
  }
  _keyboardHandler(e) {
    this.clearCaretTimeout();
    this._lastKey = number_default.convertDigits(getChar(e), true);
    this._lastKeyName = normalizeKeyName(e);
    if (!this._shouldHandleKey(e.originalEvent)) {
      return super._keyboardHandler(e);
    }
    const normalizedText = this._getInputVal();
    const caret = this._caret();
    let enteredChar;
    if ("minus" === this._lastKeyName) {
      enteredChar = "";
    } else {
      enteredChar = 110 === e.which ? number_default.getDecimalSeparator() : this._lastKey;
    }
    const newValue = this._tryParse(normalizedText, caret, enteredChar);
    if (this._shouldMoveCaret(normalizedText, caret)) {
      this._moveCaret(1);
      e.originalEvent.preventDefault();
    }
    if (void 0 === newValue) {
      if ("minus" !== this._lastKeyName) {
        e.originalEvent.preventDefault();
      }
    } else {
      this._parsedValue = newValue;
    }
    return super._keyboardHandler(e);
  }
  _keyPressHandler(e) {
    if (!this._useMaskBehavior()) {
      super._keyPressHandler(e);
    }
  }
  _removeHandler(e) {
    const caret = this._caret();
    const text = this._getInputVal();
    let {
      start
    } = caret;
    let {
      end
    } = caret;
    this._lastKey = getChar(e);
    this._lastKeyName = normalizeKeyName(e);
    const isDeleteKey = this._isDeleteKey(this._lastKeyName);
    const isBackspaceKey = !isDeleteKey;
    if (start === end) {
      const caretPosition = start;
      const canDelete = isBackspaceKey && caretPosition > 0 || isDeleteKey && caretPosition < text.length;
      if (canDelete) {
        isDeleteKey && end++;
        isBackspaceKey && start--;
      } else {
        e.preventDefault();
        return;
      }
    }
    const char = text.slice(start, end);
    if (this._isStub(char)) {
      this._moveCaret(isDeleteKey ? 1 : -1);
      if (this._parsedValue < 0 || 1 / this._parsedValue === -1 / 0) {
        this._revertSign(e);
        this._setTextByParsedValue();
        const shouldTriggerInputEvent = this.option("valueChangeEvent").split(" ").includes("input");
        if (shouldTriggerInputEvent) {
          m_events_engine_default.trigger(this._input(), "input");
        }
      }
      e.preventDefault();
      return;
    }
    const decimalSeparator = number_default.getDecimalSeparator();
    if (char === decimalSeparator) {
      const decimalSeparatorIndex = text.indexOf(decimalSeparator);
      if (this._isNonStubAfter(decimalSeparatorIndex + 1)) {
        this._moveCaret(isDeleteKey ? 1 : -1);
        e.preventDefault();
      }
      return;
    }
    if (end - start < text.length) {
      const editedText = this._replaceSelectedText(text, {
        start,
        end
      }, "");
      const noDigits = editedText.search(/[0-9]/) < 0;
      if (noDigits && this._isValueInRange(0)) {
        this._parsedValue = this._parsedValue < 0 || 1 / this._parsedValue === -1 / 0 ? -0 : 0;
        return;
      }
    }
    const valueAfterRemoving = this._tryParse(text, {
      start,
      end
    }, "");
    if (void 0 === valueAfterRemoving) {
      e.preventDefault();
    } else {
      this._parsedValue = valueAfterRemoving;
    }
  }
  _isPercentFormat() {
    const format2 = this._getFormatPattern();
    const noEscapedFormat = format2.replace(/'[^']+'/g, "");
    return -1 !== noEscapedFormat.indexOf("%");
  }
  _parse(text, format2) {
    const formatOption = this.option("format");
    const isCustomParser = isFunction(formatOption.parser);
    const parser = isCustomParser ? formatOption.parser : number_default.parse;
    let integerPartStartIndex = 0;
    if (!isCustomParser) {
      const formatPointIndex = getRealSeparatorIndex(format2).index;
      const textPointIndex = this._getTextSeparatorIndex(text);
      const formatIntegerPartLength = -1 !== formatPointIndex ? formatPointIndex : format2.length;
      const textIntegerPartLength = -1 !== textPointIndex ? textPointIndex : text.length;
      if (textIntegerPartLength > formatIntegerPartLength && -1 === format2.indexOf("#")) {
        integerPartStartIndex = textIntegerPartLength - formatIntegerPartLength;
      }
    }
    text = text.substr(integerPartStartIndex);
    return parser(text, format2);
  }
  _format(value, format2) {
    const formatOption = this.option("format");
    const customFormatter = (null === formatOption || void 0 === formatOption ? void 0 : formatOption.formatter) || formatOption;
    const formatter = isFunction(customFormatter) ? customFormatter : number_default.format;
    const formattedValue = null === value ? "" : formatter(value, format2);
    return formattedValue;
  }
  _getFormatPattern() {
    if (!this._currentFormat) {
      this._updateFormat();
    }
    return this._currentFormat;
  }
  _updateFormat() {
    const {
      format: format2
    } = this.option();
    const isCustomParser = isFunction(null === format2 || void 0 === format2 ? void 0 : format2.parser);
    const isLDMLPattern = isString(format2) && (format2.includes("0") || format2.includes("#"));
    const isExponentialFormat = "exponential" === format2 || "exponential" === (null === format2 || void 0 === format2 ? void 0 : format2.type);
    const shouldUseFormatAsIs = isCustomParser || isLDMLPattern || isExponentialFormat;
    this._currentFormat = shouldUseFormatAsIs ? format2 : getFormat(((value) => {
      const text = this._format(value, format2);
      return number_default.convertDigits(text, true);
    }));
  }
  _getFormatForSign(text) {
    const format2 = this._getFormatPattern();
    if (isString(format2)) {
      const signParts = format2.split(";");
      const sign3 = number_default.getSign(text, format2);
      signParts[1] = signParts[1] || `-${signParts[0]}`;
      return sign3 < 0 ? signParts[1] : signParts[0];
    }
    const sign2 = number_default.getSign(text);
    return sign2 < 0 ? "-" : "";
  }
  _removeStubs(text, excludeComma) {
    const format2 = this._getFormatForSign(text);
    const thousandsSeparator = number_default.getThousandsSeparator();
    const stubs = this._getStubs(format2);
    let result = text;
    if (stubs.length) {
      const prefixStubs = stubs[0];
      const postfixRegex = new RegExp(`(${escapeRegExp(stubs[1] || "")})$`, "g");
      const decoratorsRegex = new RegExp(`[-${escapeRegExp(excludeComma ? "" : thousandsSeparator)}]`, "g");
      result = result.replace(prefixStubs, "").replace(postfixRegex, "").replace(decoratorsRegex, "");
    }
    return result;
  }
  _getStubs(format2) {
    const regExpResult = /[^']([#0.,]+)/g.exec(format2);
    const pattern = regExpResult && regExpResult[0].trim();
    return format2.split(pattern).map(((stub) => stub.replace(/'/g, "")));
  }
  _truncateToPrecision(value, maxPrecision) {
    if (isDefined(value)) {
      const strValue = value.toString();
      const decimalSeparatorIndex = strValue.indexOf(".");
      if (strValue && decimalSeparatorIndex > -1) {
        const parsedValue = parseFloat(strValue.substr(0, decimalSeparatorIndex + maxPrecision + 1));
        return isNaN(parsedValue) ? value : parsedValue;
      }
    }
    return value;
  }
  _tryParse(text, selection, char) {
    const isTextSelected = selection.start !== selection.end;
    const isWholeTextSelected = isTextSelected && 0 === selection.start && selection.end === text.length;
    const decimalSeparator = number_default.getDecimalSeparator();
    if (isWholeTextSelected && char === decimalSeparator) {
      return 0;
    }
    const editedText = this._replaceSelectedText(text, selection, char);
    const format2 = this._getFormatPattern();
    let parsedValue = this._getParsedValue(editedText, format2);
    const maxPrecision = !format2.parser && this._getPrecisionLimits(editedText).max;
    const isValueChanged = parsedValue !== this._parsedValue;
    const isDecimalPointRestricted = char === decimalSeparator && 0 === maxPrecision;
    const isUselessCharRestricted = !isTextSelected && !isValueChanged && "-" !== char && this._isStub(char);
    if (isDecimalPointRestricted || isUselessCharRestricted) {
      return;
    }
    if ("" === this._removeStubs(editedText)) {
      parsedValue = Math.abs(0 * this._parsedValue);
    }
    if (isNaN(parsedValue)) {
      return;
    }
    const value = null === parsedValue ? this._parsedValue : parsedValue;
    parsedValue = maxPrecision ? this._truncateToPrecision(value, maxPrecision) : parsedValue;
    if (!format2.parser && this._isPercentFormat()) {
      const interval = this._getIntervalFromPrecision(maxPrecision);
      return adjustPercentValue(parsedValue, interval);
    }
    return parsedValue;
  }
  _getIntervalFromPrecision(precision) {
    if (precision < 1) {
      return 1;
    }
    return 10 ** -precision;
  }
  _getParsedValue(text, format2) {
    const sign2 = number_default.getSign(text, (null === format2 || void 0 === format2 ? void 0 : format2.formatter) || format2);
    const textWithoutStubs = this._removeStubs(text, true);
    const parsedValue = this._parse(textWithoutStubs, format2);
    const parsedValueSign = parsedValue < 0 ? -1 : 1;
    const parsedValueWithSign = isNumeric(parsedValue) && sign2 !== parsedValueSign ? sign2 * parsedValue : parsedValue;
    return parsedValueWithSign;
  }
  _isValueIncomplete(text) {
    if (!this._useMaskBehavior()) {
      return super._isValueIncomplete(text);
    }
    const caret = this._caret();
    const point = number_default.getDecimalSeparator();
    const pointIndex = this._getTextSeparatorIndex(text);
    const isCaretOnFloat = pointIndex >= 0 && pointIndex < caret.start;
    const textParts = this._removeStubs(text, true).split(point);
    if (!isCaretOnFloat || 2 !== textParts.length) {
      return false;
    }
    const floatLength = textParts[1].length;
    const format2 = this._getFormatPattern();
    const isCustomParser = !!format2.parser;
    const precision = !isCustomParser && this._getPrecisionLimits(this._getFormatPattern());
    const isPrecisionInRange = isCustomParser ? true : inRange(floatLength, precision.min, precision.max);
    const endsWithZero = "0" === textParts[1].charAt(floatLength - 1);
    return isPrecisionInRange && (endsWithZero || !floatLength);
  }
  _isValueInRange(value) {
    const min = ensureDefined(this.option("min"), -1 / 0);
    const max = ensureDefined(this.option("max"), 1 / 0);
    return inRange(value, min, max);
  }
  _setInputText(text) {
    const normalizedText = number_default.convertDigits(text, true);
    const newCaret = getCaretAfterFormat(this._getInputVal(), normalizedText, this._caret(), this._getFormatPattern());
    this._input().val(text);
    this._toggleEmptinessEventHandler();
    this._formattedValue = text;
    if (!this._focusOutOccurs) {
      this._caret(newCaret);
    }
  }
  _useMaskBehavior() {
    const {
      useMaskBehavior
    } = this.option();
    return !!this.option("format") && useMaskBehavior;
  }
  _renderInputType() {
    const {
      mode
    } = this.option();
    const isNumberType = "number" === mode;
    const isDesktop = "desktop" === devices_default.real().deviceType;
    if (this._useMaskBehavior() && isNumberType) {
      this._setInputType(isDesktop || this._isSupportInputMode() ? "text" : "tel");
    } else {
      super._renderInputType();
    }
  }
  _isChar(str) {
    return isString(str) && 1 === str.length;
  }
  _moveCaret(offset) {
    if (!offset) {
      return;
    }
    const newCaret = getCaretWithOffset(this._caret(), offset);
    const adjustedCaret = getCaretInBoundaries(newCaret, this._getInputVal(), this._getFormatPattern());
    this._caret(adjustedCaret);
  }
  _shouldHandleKey(e) {
    const keyName = normalizeKeyName(e);
    const isSpecialChar = isCommandKeyPressed(e) || e.altKey || e.shiftKey || !this._isChar(keyName);
    const isMinusKey = "minus" === keyName;
    const useMaskBehavior = this._useMaskBehavior();
    return useMaskBehavior && !isSpecialChar && !isMinusKey;
  }
  _renderInput() {
    super._renderInput();
    this._renderFormatter();
  }
  _renderFormatter() {
    this._clearCache();
    this._detachFormatterEvents();
    if (this._useMaskBehavior()) {
      this._attachFormatterEvents();
    }
  }
  _detachFormatterEvents() {
    m_events_engine_default.off(this._input(), ".dxNumberFormatter");
  }
  _isInputFromPaste(e) {
    var _e$originalEvent;
    const inputType2 = null === (_e$originalEvent = e.originalEvent) || void 0 === _e$originalEvent ? void 0 : _e$originalEvent.inputType;
    if (isDefined(inputType2)) {
      return "insertFromPaste" === inputType2;
    }
    return this._isValuePasted;
  }
  _attachFormatterEvents() {
    const $input = this._input();
    m_events_engine_default.on($input, addNamespace("input", "dxNumberFormatter"), ((e) => {
      this._formatValue(e);
      this._isValuePasted = false;
    }));
    m_events_engine_default.on($input, addNamespace("dxclick", "dxNumberFormatter"), (() => {
      if (!this._caretTimeout) {
        this._caretTimeout = setTimeout((() => {
          this._caretTimeout = void 0;
          this._caret(getCaretInBoundaries(this._caret(), this._getInputVal(), this._getFormatPattern()));
        }), 0);
      }
    }));
    m_events_engine_default.on($input, DBLCLICK_EVENT_NAME, (() => {
      this.clearCaretTimeout();
    }));
  }
  clearCaretTimeout() {
    clearTimeout(this._caretTimeout);
    this._caretTimeout = void 0;
  }
  _forceRefreshInputValue() {
    if (!this._useMaskBehavior()) {
      return super._forceRefreshInputValue();
    }
  }
  _isNonStubAfter(index) {
    const text = this._getInputVal().slice(index);
    return text && !this._isStub(text, true);
  }
  _isStub(str, isString2) {
    const escapedDecimalSeparator = escapeRegExp(number_default.getDecimalSeparator());
    const regExpString = `^[^0-9${escapedDecimalSeparator}]+$`;
    const stubRegExp = new RegExp(regExpString, "g");
    return stubRegExp.test(str) && (isString2 || this._isChar(str));
  }
  _parseValue(text) {
    if (!this._useMaskBehavior()) {
      return super._parseValue(text);
    }
    return this._parsedValue;
  }
  _getPrecisionLimits(text) {
    const currentFormat = this._getFormatForSign(text);
    const realSeparatorIndex = getRealSeparatorIndex(currentFormat).index;
    const floatPart = (splitByIndex(currentFormat, realSeparatorIndex)[1] || "").replace(/[^#0]/g, "");
    const minPrecision = floatPart.replace(/^(0*)#*/, "$1").length;
    const maxPrecision = floatPart.length;
    return {
      min: minPrecision,
      max: maxPrecision
    };
  }
  _revertSign(e) {
    if (!this._useMaskBehavior()) {
      return;
    }
    const caret = this._caret();
    if (caret.start !== caret.end) {
      if ("minus" === normalizeKeyName(e)) {
        this._applyRevertedSign(e, caret, true);
        return;
      }
      this._caret(getCaretInBoundaries(0, this._getInputVal(), this._getFormatPattern()));
    }
    this._applyRevertedSign(e, caret);
  }
  _applyRevertedSign(e, caret, preserveSelectedText) {
    const newValue = -1 * ensureDefined(this._parsedValue, null);
    if (this._isValueInRange(newValue) || 0 === newValue) {
      this._parsedValue = newValue;
      if (preserveSelectedText) {
        const format2 = this._getFormatPattern();
        const previousText = this._getInputVal();
        this._setTextByParsedValue();
        e.preventDefault();
        const currentText = this._getInputVal();
        const offset = getCaretOffset(previousText, currentText, format2);
        caret = getCaretWithOffset(caret, offset);
        const caretInBoundaries = getCaretInBoundaries(caret, currentText, format2);
        this._caret(caretInBoundaries);
      }
    }
  }
  _removeMinusFromText(text, caret) {
    const isMinusPressed = "minus" === this._lastKeyName && "-" === text.charAt(caret.start - 1);
    return isMinusPressed ? this._replaceSelectedText(text, {
      start: caret.start - 1,
      end: caret.start
    }, "") : text;
  }
  _setTextByParsedValue() {
    const format2 = this._getFormatPattern();
    const parsed = this._parseValue();
    const formatted = this._format(parsed, format2) || "";
    this._setInputText(formatted);
  }
  _formatValue(e) {
    let normalizedText = this._getInputVal();
    const caret = this._caret();
    const textWithoutMinus = this._removeMinusFromText(normalizedText, caret);
    const wasMinusRemoved = textWithoutMinus !== normalizedText;
    normalizedText = textWithoutMinus;
    if (!this._isInputFromPaste(e) && this._isValueIncomplete(textWithoutMinus)) {
      this._formattedValue = normalizedText;
      if (wasMinusRemoved) {
        this._setTextByParsedValue();
      }
      return;
    }
    const textWasChanged = number_default.convertDigits(this._formattedValue, true) !== normalizedText;
    if (textWasChanged) {
      const value = this._tryParse(normalizedText, caret, "");
      if (isDefined(value)) {
        this._parsedValue = value;
      }
    }
    this._setTextByParsedValue();
  }
  _renderDisplayText() {
    if (this._useMaskBehavior()) {
      this._toggleEmptinessEventHandler();
    } else {
      super._renderDisplayText.apply(this, arguments);
    }
  }
  _renderValue() {
    if (this._useMaskBehavior()) {
      const {
        value
      } = this.option();
      this._parsedValue = value;
      this._setTextByParsedValue();
    }
    return super._renderValue();
  }
  _updateParsedValue() {
    const inputValue = this._getInputVal();
    this._parsedValue = this._tryParse(inputValue, this._caret());
  }
  _adjustParsedValue() {
    if (!this._useMaskBehavior()) {
      return;
    }
    const clearedText = this._removeStubs(this._getInputVal());
    const parsedValue = clearedText ? this._parseValue() : null;
    if (!isNumeric(parsedValue)) {
      this._parsedValue = parsedValue;
      return;
    }
    this._parsedValue = fitIntoRange(parsedValue, this.option("min"), this.option("max"));
  }
  _valueChangeEventHandler(e) {
    if (!this._useMaskBehavior()) {
      return super._valueChangeEventHandler(e);
    }
    const caret = this._caret();
    this._saveValueChangeEvent(e);
    this._lastKey = null;
    this._lastKeyName = null;
    this._updateParsedValue();
    this._adjustParsedValue();
    this.option("value", this._parsedValue);
    if (caret) {
      this._caret(caret);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "format":
      case "useMaskBehavior":
        this._renderInputType();
        this._updateFormat();
        this._renderFormatter();
        this._renderValue();
        this._refreshValueChangeEvent();
        this._refreshEvents();
        break;
      case "min":
      case "max":
        this._adjustParsedValue();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearCache() {
    delete this._formattedValue;
    delete this._lastKey;
    delete this._lastKeyName;
    delete this._parsedValue;
    delete this._focusOutOccurs;
    clearTimeout(this._caretTimeout);
    delete this._caretTimeout;
  }
  _clean() {
    this._clearCache();
    super._clean();
  }
};
var m_number_box_mask_default = NumberBoxMask;

// node_modules/devextreme/esm/__internal/ui/number_box/m_number_box.js
component_registrator_default("dxNumberBox", m_number_box_mask_default);
var m_number_box_default = m_number_box_mask_default;

// node_modules/devextreme/esm/ui/number_box.js
var number_box_default = m_number_box_default;

// node_modules/devextreme/esm/common/core/localization/ldml/date.format.js
var FORMAT_SEPARATORS = " .,:;/\\<>()-[]،";
var checkDigit = function(char) {
  const code = char && number_default.convertDigits(char, false).charCodeAt(0);
  const zeroCode = number_default.convertDigits("0", false).charCodeAt(0);
  return zeroCode <= code && code < zeroCode + 10;
};
var checkPatternContinue = function(text, patterns, index, isDigit) {
  const char = text[index];
  const nextChar = text[index + 1];
  if (!isDigit) {
    if ("." === char || " " === char && ". m." === text.slice(index - 1, index + 3)) {
      return true;
    }
    if ("-" === char && !checkDigit(nextChar)) {
      return true;
    }
  }
  const isDigitChanged = isDigit && patterns.some(((pattern) => text[index] !== pattern[index]));
  return FORMAT_SEPARATORS.indexOf(char) < 0 && isDigit === checkDigit(char) && (!isDigit || isDigitChanged);
};
var getPatternStartIndex = function(defaultPattern, index) {
  if (!checkDigit(defaultPattern[index])) {
    while (index > 0 && !checkDigit(defaultPattern[index - 1]) && ("." === defaultPattern[index - 1] || FORMAT_SEPARATORS.indexOf(defaultPattern[index - 1]) < 0)) {
      index--;
    }
  }
  return index;
};
var getDifference = function(defaultPattern, patterns, processedIndexes, isDigit) {
  let i = 0;
  const result = [];
  const patternsFilter = function(pattern) {
    return defaultPattern[i] !== pattern[i] && (void 0 === isDigit || checkDigit(defaultPattern[i]) === isDigit);
  };
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  for (i = 0; i < defaultPattern.length; i++) {
    if (processedIndexes.indexOf(i) < 0 && patterns.filter(patternsFilter).length) {
      i = getPatternStartIndex(defaultPattern, i);
      do {
        isDigit = checkDigit(defaultPattern[i]);
        if (!result.length && !isDigit && checkDigit(patterns[0][i])) {
          break;
        }
        result.push(i);
        processedIndexes.unshift(i);
        i++;
      } while (defaultPattern[i] && checkPatternContinue(defaultPattern, patterns, i, isDigit));
      break;
    }
  }
  if (1 === result.length && ("0" === defaultPattern[processedIndexes[0] - 1] || "٠" === defaultPattern[processedIndexes[0] - 1])) {
    processedIndexes.unshift(processedIndexes[0] - 1);
  }
  return result;
};
var replaceCharsCore = function(pattern, indexes, char, patternPositions) {
  const baseCharIndex = indexes[0];
  const patternIndex = baseCharIndex < patternPositions.length ? patternPositions[baseCharIndex] : baseCharIndex;
  indexes.forEach((function(_, index) {
    pattern = pattern.substr(0, patternIndex + index) + (char.length > 1 ? char[index] : char) + pattern.substr(patternIndex + index + 1);
  }));
  if (1 === indexes.length) {
    pattern = pattern.replace("0" + char, char + char);
    pattern = pattern.replace("٠" + char, char + char);
  }
  return pattern;
};
var replaceChars = function(pattern, indexes, char, patternPositions) {
  let i;
  let index;
  let patternIndex;
  if (!checkDigit(pattern[indexes[0]] || "0")) {
    const letterCount = Math.max(indexes.length <= 3 ? 3 : 4, char.length);
    while (indexes.length > letterCount) {
      index = indexes.pop();
      patternIndex = patternPositions[index];
      patternPositions[index] = -1;
      for (i = index + 1; i < patternPositions.length; i++) {
        patternPositions[i]--;
      }
      pattern = pattern.substr(0, patternIndex) + pattern.substr(patternIndex + 1);
    }
    index = indexes[indexes.length - 1] + 1, patternIndex = index < patternPositions.length ? patternPositions[index] : index;
    while (indexes.length < letterCount) {
      indexes.push(indexes[indexes.length - 1] + 1);
      for (i = index; i < patternPositions.length; i++) {
        patternPositions[i]++;
      }
      pattern = pattern.substr(0, patternIndex) + " " + pattern.substr(patternIndex);
    }
  }
  pattern = replaceCharsCore(pattern, indexes, char, patternPositions);
  return pattern;
};
var formatValue = function(value, formatter) {
  if (Array.isArray(value)) {
    return value.map((function(value2) {
      return (formatter(value2) || "").toString();
    }));
  }
  return (formatter(value) || "").toString();
};
var ESCAPE_CHARS_REGEXP = /[a-zA-Z]/g;
var escapeChars = function(pattern, defaultPattern, processedIndexes, patternPositions) {
  const escapeIndexes = defaultPattern.split("").map((function(char, index) {
    if (processedIndexes.indexOf(index) < 0 && (char.match(ESCAPE_CHARS_REGEXP) || "'" === char)) {
      return patternPositions[index];
    }
    return -1;
  }));
  pattern = pattern.split("").map((function(char, index) {
    let result = char;
    const isCurrentCharEscaped = escapeIndexes.indexOf(index) >= 0;
    const isPrevCharEscaped = index > 0 && escapeIndexes.indexOf(index - 1) >= 0;
    const isNextCharEscaped = escapeIndexes.indexOf(index + 1) >= 0;
    if (isCurrentCharEscaped) {
      if (!isPrevCharEscaped) {
        result = "'" + result;
      }
      if (!isNextCharEscaped) {
        result += "'";
      }
    }
    return result;
  })).join("");
  return pattern;
};
var getFormat2 = function(formatter) {
  const processedIndexes = [];
  const defaultPattern = formatValue(new Date(2009, 8, 8, 6, 5, 4), formatter);
  const patternPositions = defaultPattern.split("").map((function(_, index) {
    return index;
  }));
  let result = defaultPattern;
  const replacedPatterns = {};
  const datePatterns = [{
    date: new Date(2009, 8, 8, 6, 5, 4, 111),
    pattern: "S"
  }, {
    date: new Date(2009, 8, 8, 6, 5, 2),
    pattern: "s"
  }, {
    date: new Date(2009, 8, 8, 6, 2, 4),
    pattern: "m"
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "H",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 2, 5, 4),
    pattern: "h",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "a",
    isDigit: false
  }, {
    date: new Date(2009, 8, 1, 6, 5, 4),
    pattern: "d"
  }, {
    date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
    pattern: "E"
  }, {
    date: new Date(2009, 9, 6, 6, 5, 4),
    pattern: "M"
  }, {
    date: new Date(1998, 8, 8, 6, 5, 4),
    pattern: "y"
  }];
  if (!result) {
    return;
  }
  datePatterns.forEach((function(test) {
    const diff = getDifference(defaultPattern, formatValue(test.date, formatter), processedIndexes, test.isDigit);
    const pattern = "M" === test.pattern && !replacedPatterns.d ? "L" : test.pattern;
    result = replaceChars(result, diff, pattern, patternPositions);
    replacedPatterns[pattern] = diff.length;
  }));
  result = escapeChars(result, defaultPattern, processedIndexes, patternPositions);
  if (processedIndexes.length) {
    return result;
  }
};

// node_modules/devextreme/esm/common/core/localization/ldml/date.parser.js
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var monthRegExpGenerator = function(count, dateParts) {
  if (count > 2) {
    return Object.keys(FORMAT_TYPES).map((function(count2) {
      return ["format", "standalone"].map((function(type2) {
        return dateParts.getMonthNames(FORMAT_TYPES[count2], type2).join("|");
      })).join("|");
    })).join("|");
  }
  return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
};
var PATTERN_REGEXPS = {
  ":": function(count, dateParts) {
    const countSuffix = count > 1 ? `{${count}}` : "";
    let timeSeparator = escapeRegExp(dateParts.getTimeSeparator());
    ":" !== timeSeparator && (timeSeparator = `${timeSeparator}|:`);
    return `${timeSeparator}${countSuffix}`;
  },
  y: function(count) {
    return 2 === count ? `[0-9]{${count}}` : "[0-9]+?";
  },
  M: monthRegExpGenerator,
  L: monthRegExpGenerator,
  Q: function(count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").join("|");
    }
    return "0?[1-4]";
  },
  E: function(count, dateParts) {
    return "\\D*";
  },
  a: function(count, dateParts) {
    return dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format").join("|");
  },
  d: function(count) {
    return 2 === count ? "3[01]|[12][0-9]|0?[1-9]" : "0??[1-9]|[12][0-9]|3[01]";
  },
  H: function(count) {
    return 2 === count ? "2[0-3]|1[0-9]|0?[0-9]" : "0??[0-9]|1[0-9]|2[0-3]";
  },
  h: function(count) {
    return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
  },
  m: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  s: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  S: function(count) {
    return `[0-9]{1,${count}}`;
  },
  w: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  x: function(count) {
    return 3 === count ? "[+-](?:2[0-3]|[01][0-9]):(?:[0-5][0-9])|Z" : "[+-](?:2[0-3]|[01][0-9])(?:[0-5][0-9])|Z";
  }
};
var parseNumber = Number;
var caseInsensitiveIndexOf = function(array, value) {
  return array.map(((item) => item.toLowerCase())).indexOf(value.toLowerCase());
};
var monthPatternParser = function(text, count, dateParts) {
  if (count > 2) {
    return ["format", "standalone"].map((function(type2) {
      return Object.keys(FORMAT_TYPES).map((function(count2) {
        const monthNames = dateParts.getMonthNames(FORMAT_TYPES[count2], type2);
        return caseInsensitiveIndexOf(monthNames, text);
      }));
    })).reduce((function(a, b) {
      return a.concat(b);
    })).filter((function(index) {
      return index >= 0;
    }))[0];
  }
  return parseNumber(text) - 1;
};
var PATTERN_PARSERS = {
  y: function(text, count) {
    const year = parseNumber(text);
    if (2 === count) {
      return year < 30 ? 2e3 + year : 1900 + year;
    }
    return year;
  },
  M: monthPatternParser,
  L: monthPatternParser,
  Q: function(text, count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").indexOf(text);
    }
    return parseNumber(text) - 1;
  },
  E: function(text, count, dateParts) {
    const dayNames = dateParts.getDayNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(dayNames, text);
  },
  a: function(text, count, dateParts) {
    const periodNames = dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(periodNames, text);
  },
  d: parseNumber,
  H: parseNumber,
  h: parseNumber,
  m: parseNumber,
  s: parseNumber,
  S: function(text, count) {
    count = Math.max(count, 3);
    text = text.slice(0, 3);
    while (count < 3) {
      text += "0";
      count++;
    }
    return parseNumber(text);
  }
};
var ORDERED_PATTERNS = ["y", "M", "d", "h", "m", "s", "S"];
var PATTERN_SETTERS = {
  y: "setFullYear",
  M: "setMonth",
  L: "setMonth",
  a: function(date, value, datePartValues) {
    let hours = date.getHours();
    const hourPartValue = datePartValues.h;
    if (void 0 !== hourPartValue && hourPartValue !== hours) {
      hours--;
    }
    if (!value && 12 === hours) {
      hours = 0;
    } else if (value && 12 !== hours) {
      hours += 12;
    }
    date.setHours(hours);
  },
  d: "setDate",
  H: "setHours",
  h: "setHours",
  m: "setMinutes",
  s: "setSeconds",
  S: "setMilliseconds"
};
var getSameCharCount = function(text, index) {
  const char = text[index];
  if (!char) {
    return 0;
  }
  let count = 0;
  do {
    index++;
    count++;
  } while (text[index] === char);
  return count;
};
var createPattern = function(char, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += char;
  }
  return result;
};
var getRegExpInfo = function(format2, dateParts) {
  let regexpText = "";
  let stubText = "";
  let isEscaping;
  const patterns = [];
  const addPreviousStub = function() {
    if (stubText) {
      patterns.push(`'${stubText}'`);
      regexpText += `${escapeRegExp(stubText)})`;
      stubText = "";
    }
  };
  for (let i = 0; i < format2.length; i++) {
    const char = format2[i];
    const isEscapeChar = "'" === char;
    const regexpPart = PATTERN_REGEXPS[char];
    if (isEscapeChar) {
      isEscaping = !isEscaping;
      if ("'" !== format2[i - 1]) {
        continue;
      }
    }
    if (regexpPart && !isEscaping) {
      const count = getSameCharCount(format2, i);
      const pattern = createPattern(char, count);
      addPreviousStub();
      patterns.push(pattern);
      regexpText += `(${regexpPart(count, dateParts)})`;
      i += count - 1;
    } else {
      if (!stubText) {
        regexpText += "(";
      }
      stubText += char;
    }
  }
  addPreviousStub();
  if (!isPossibleForParsingFormat(patterns)) {
    logger.warn(`The following format may be parsed incorrectly: ${format2}.`);
  }
  return {
    patterns,
    regexp: new RegExp(`^${regexpText}$`, "i")
  };
};
var digitFieldSymbols = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
var isPossibleForParsingFormat = function(patterns) {
  const isDigitPattern = (pattern) => {
    if (!pattern) {
      return false;
    }
    const char = pattern[0];
    return ["y", "S"].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3;
  };
  let possibleForParsing = true;
  let ambiguousDigitPatternsCount = 0;
  return patterns.every(((pattern, index, patterns2) => {
    if (isDigitPattern(pattern)) {
      if (((pattern2) => "S" !== pattern2[0] && 2 !== pattern2.length)(pattern)) {
        possibleForParsing = ++ambiguousDigitPatternsCount < 2;
      }
      if (!isDigitPattern(patterns2[index + 1])) {
        ambiguousDigitPatternsCount = 0;
      }
    }
    return possibleForParsing;
  }));
};
var getPatternSetters = function() {
  return PATTERN_SETTERS;
};
var setPatternPart = function(date, pattern, text, dateParts, datePartValues) {
  const patternChar = pattern[0];
  const partSetter = PATTERN_SETTERS[patternChar];
  const partParser = PATTERN_PARSERS[patternChar];
  if (partSetter && partParser) {
    const value = partParser(text, pattern.length, dateParts);
    datePartValues[pattern] = value;
    if (date[partSetter]) {
      date[partSetter](value);
    } else {
      partSetter(date, value, datePartValues);
    }
  }
};
var setPatternPartFromNow = function(date, pattern, now) {
  const setterName = PATTERN_SETTERS[pattern];
  const getterName = "g" + setterName.substr(1);
  const value = now[getterName]();
  date[setterName](value);
};
var getShortPatterns = function(fullPatterns) {
  return fullPatterns.map((function(pattern) {
    if ("'" === pattern[0]) {
      return "";
    } else {
      return "H" === pattern[0] ? "h" : pattern[0];
    }
  }));
};
var getMaxOrderedPatternIndex = function(patterns) {
  const indexes = patterns.map((function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern);
  }));
  return Math.max.apply(Math, indexes);
};
var getOrderedFormatPatterns = function(formatPatterns) {
  const otherPatterns = formatPatterns.filter((function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern) < 0;
  }));
  return ORDERED_PATTERNS.concat(otherPatterns);
};
var getParser = function(format2, dateParts) {
  const regExpInfo = getRegExpInfo(format2, dateParts);
  return function(text) {
    const regExpResult = regExpInfo.regexp.exec(text);
    if (regExpResult) {
      const now = /* @__PURE__ */ new Date();
      const date = new Date(now.getFullYear(), 0, 1);
      const formatPatterns = getShortPatterns(regExpInfo.patterns);
      const maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
      const orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
      const datePartValues = {};
      orderedFormatPatterns.forEach((function(pattern, index) {
        if (!pattern || index < ORDERED_PATTERNS.length && index > maxPatternIndex) {
          return;
        }
        const patternIndex = formatPatterns.indexOf(pattern);
        if (patternIndex >= 0) {
          const regExpPattern = regExpInfo.patterns[patternIndex];
          const regExpText = regExpResult[patternIndex + 1];
          setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues);
        } else {
          setPatternPartFromNow(date, pattern, now);
        }
      }));
      return date;
    }
    return null;
  };
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/first_day_of_week_data.js
var first_day_of_week_data_default = {
  "af-NA": 1,
  agq: 1,
  ak: 1,
  ar: 6,
  "ar-EH": 1,
  "ar-ER": 1,
  "ar-KM": 1,
  "ar-LB": 1,
  "ar-MA": 1,
  "ar-MR": 1,
  "ar-PS": 1,
  "ar-SO": 1,
  "ar-SS": 1,
  "ar-TD": 1,
  "ar-TN": 1,
  asa: 1,
  ast: 1,
  az: 1,
  "az-Cyrl": 1,
  bas: 1,
  be: 1,
  bem: 1,
  bez: 1,
  bg: 1,
  bm: 1,
  br: 1,
  bs: 1,
  "bs-Cyrl": 1,
  ca: 1,
  ce: 1,
  cgg: 1,
  ckb: 6,
  cs: 1,
  cy: 1,
  da: 1,
  de: 1,
  dje: 1,
  dsb: 1,
  dua: 1,
  dyo: 1,
  ee: 1,
  el: 1,
  "en-001": 1,
  "en-AE": 6,
  "en-BI": 1,
  "en-MP": 1,
  "en-MV": 5,
  "en-SD": 6,
  eo: 1,
  es: 1,
  et: 1,
  eu: 1,
  ewo: 1,
  fa: 6,
  ff: 1,
  "ff-Adlm": 1,
  fi: 1,
  fo: 1,
  fr: 1,
  "fr-DJ": 6,
  "fr-DZ": 6,
  "fr-SY": 6,
  fur: 1,
  fy: 1,
  ga: 1,
  gd: 1,
  gl: 1,
  gsw: 1,
  gv: 1,
  ha: 1,
  hr: 1,
  hsb: 1,
  hu: 1,
  hy: 1,
  ia: 1,
  ig: 1,
  is: 1,
  it: 1,
  jgo: 1,
  jmc: 1,
  ka: 1,
  kab: 6,
  kde: 1,
  kea: 1,
  khq: 1,
  kk: 1,
  kkj: 1,
  kl: 1,
  "ko-KP": 1,
  ksb: 1,
  ksf: 1,
  ksh: 1,
  ku: 1,
  kw: 1,
  ky: 1,
  lag: 1,
  lb: 1,
  lg: 1,
  ln: 1,
  lrc: 6,
  lt: 1,
  lu: 1,
  lv: 1,
  "mas-TZ": 1,
  mfe: 1,
  mg: 1,
  mgo: 1,
  mi: 1,
  mk: 1,
  mn: 1,
  ms: 1,
  mua: 1,
  mzn: 6,
  naq: 1,
  nds: 1,
  nl: 1,
  nmg: 1,
  nnh: 1,
  no: 1,
  nus: 1,
  nyn: 1,
  os: 1,
  pcm: 1,
  pl: 1,
  ps: 6,
  "pt-AO": 1,
  "pt-CH": 1,
  "pt-CV": 1,
  "pt-GQ": 1,
  "pt-GW": 1,
  "pt-LU": 1,
  "pt-ST": 1,
  "pt-TL": 1,
  "qu-BO": 1,
  "qu-EC": 1,
  rm: 1,
  rn: 1,
  ro: 1,
  rof: 1,
  ru: 1,
  rw: 1,
  rwk: 1,
  sah: 1,
  sbp: 1,
  sc: 1,
  se: 1,
  ses: 1,
  sg: 1,
  shi: 1,
  "shi-Latn": 1,
  si: 1,
  sk: 1,
  sl: 1,
  smn: 1,
  so: 1,
  "so-DJ": 6,
  sq: 1,
  sr: 1,
  "sr-Latn": 1,
  sv: 1,
  sw: 1,
  "ta-LK": 1,
  "ta-MY": 1,
  teo: 1,
  tg: 1,
  "ti-ER": 1,
  tk: 1,
  to: 1,
  tr: 1,
  tt: 1,
  twq: 1,
  tzm: 1,
  uk: 1,
  uz: 1,
  "uz-Arab": 6,
  "uz-Cyrl": 1,
  vai: 1,
  "vai-Latn": 1,
  vi: 1,
  vun: 1,
  wae: 1,
  wo: 1,
  xog: 1,
  yav: 1,
  yi: 1,
  yo: 1,
  zgh: 1
};

// node_modules/devextreme/esm/common/core/localization/intl/date.js
var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
var getIntlFormatter = (format2) => (date) => {
  if (!format2.timeZoneName) {
    const year = date.getFullYear();
    const recognizableAsTwentyCentury = String(year).length < 3;
    const safeYearShift = 400;
    const temporaryYearValue = recognizableAsTwentyCentury ? year + safeYearShift : year;
    const utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    if (recognizableAsTwentyCentury) {
      utcDate.setFullYear(year);
    }
    const utcFormat = extend({
      timeZone: "UTC"
    }, format2);
    return formatDateTime(utcDate, utcFormat);
  }
  return formatDateTime(date, format2);
};
var formattersCache = {};
var getFormatter2 = (format2) => {
  const key = core_default.locale() + "/" + JSON.stringify(format2);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.DateTimeFormat(core_default.locale(), format2).format;
  }
  return formattersCache[key];
};
function formatDateTime(date, format2) {
  return getFormatter2(format2)(date).replace(SYMBOLS_TO_REMOVE_REGEX, "").replace(NARROW_NO_BREAK_SPACE_REGEX, " ");
}
var formatNumber = (number) => new Intl.NumberFormat(core_default.locale()).format(number);
var getAlternativeNumeralsMap = /* @__PURE__ */ (() => {
  const numeralsMapCache = {};
  return (locale) => {
    if (!(locale in numeralsMapCache)) {
      if ("0" === formatNumber(0)) {
        numeralsMapCache[locale] = false;
        return false;
      }
      numeralsMapCache[locale] = {};
      for (let i = 0; i < 10; ++i) {
        numeralsMapCache[locale][formatNumber(i)] = i;
      }
    }
    return numeralsMapCache[locale];
  };
})();
var normalizeNumerals = (dateString) => {
  const alternativeNumeralsMap = getAlternativeNumeralsMap(core_default.locale());
  if (!alternativeNumeralsMap) {
    return dateString;
  }
  return dateString.split("").map(((sign2) => sign2 in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign2]) : sign2)).join("");
};
var removeLeadingZeroes = (str) => str.replace(/(\D)0+(\d)/g, "$1$2");
var dateStringEquals = (actual, expected) => removeLeadingZeroes(actual) === removeLeadingZeroes(expected);
var normalizeMonth = (text) => text.replace("d’", "de ");
var intlFormats = {
  day: {
    day: "numeric"
  },
  date: {
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  dayofweek: {
    weekday: "long"
  },
  longdate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  longdatelongtime: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  longtime: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  month: {
    month: "long"
  },
  monthandday: {
    month: "long",
    day: "numeric"
  },
  monthandyear: {
    year: "numeric",
    month: "long"
  },
  shortdate: {},
  shorttime: {
    hour: "numeric",
    minute: "numeric"
  },
  shortyear: {
    year: "2-digit"
  },
  year: {
    year: "numeric"
  }
};
Object.defineProperty(intlFormats, "shortdateshorttime", {
  get: function() {
    const defaultOptions = Intl.DateTimeFormat(core_default.locale()).resolvedOptions();
    return {
      year: defaultOptions.year,
      month: defaultOptions.month,
      day: defaultOptions.day,
      hour: "numeric",
      minute: "numeric"
    };
  }
});
var getIntlFormat = (format2) => "string" === typeof format2 && intlFormats[format2.toLowerCase()];
var monthNameStrategies = {
  standalone: function(monthIndex, monthFormat) {
    const date = new Date(1999, monthIndex, 13, 1);
    const dateString = getIntlFormatter({
      month: monthFormat
    })(date);
    return dateString;
  },
  format: function(monthIndex, monthFormat) {
    const date = new Date(0, monthIndex, 13, 1);
    const dateString = normalizeMonth(getIntlFormatter({
      day: "numeric",
      month: monthFormat
    })(date));
    const parts = dateString.split(" ").filter(((part) => part.indexOf("13") < 0));
    if (1 === parts.length) {
      return parts[0];
    } else if (2 === parts.length) {
      return parts[0].length > parts[1].length ? parts[0] : parts[1];
    }
    return monthNameStrategies.standalone(monthIndex, monthFormat);
  }
};
var date_default2 = {
  engine: function() {
    return "intl";
  },
  getMonthNames: function(format2, type2) {
    const monthFormat = {
      wide: "long",
      abbreviated: "short",
      narrow: "narrow"
    }[format2 || "wide"];
    type2 = "format" === type2 ? type2 : "standalone";
    return Array.apply(null, new Array(12)).map(((_, monthIndex) => monthNameStrategies[type2](monthIndex, monthFormat)));
  },
  getDayNames: function(format2) {
    const result = ((format3) => Array.apply(null, new Array(7)).map(((_, dayIndex) => getIntlFormatter({
      weekday: format3
    })(new Date(0, 0, dayIndex)))))({
      wide: "long",
      abbreviated: "short",
      short: "narrow",
      narrow: "narrow"
    }[format2 || "wide"]);
    return result;
  },
  getPeriodNames: function() {
    const hour12Formatter = getIntlFormatter({
      hour: "numeric",
      hour12: true
    });
    return [1, 13].map(((hours) => {
      const hourNumberText = formatNumber(1);
      const timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
      if (2 !== timeParts.length) {
        return "";
      }
      const biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
      return biggerPart.trim();
    }));
  },
  format: function(date, format2) {
    if (!date) {
      return;
    }
    if (!format2) {
      return date;
    }
    if ("function" !== typeof format2 && !format2.formatter) {
      format2 = format2.type || format2;
    }
    const intlFormat = getIntlFormat(format2);
    if (intlFormat) {
      return getIntlFormatter(intlFormat)(date);
    }
    const formatType = typeof format2;
    if (format2.formatter || "function" === formatType || "string" === formatType) {
      return this.callBase.apply(this, arguments);
    }
    return getIntlFormatter(format2)(date);
  },
  parse: function(dateString, format2) {
    let formatter;
    if (format2 && !format2.parser && "string" === typeof dateString) {
      dateString = normalizeMonth(dateString);
      formatter = (date) => normalizeMonth(this.format(date, format2));
    }
    return this.callBase(dateString, formatter || format2);
  },
  _parseDateBySimpleFormat: function(dateString, format2) {
    dateString = normalizeNumerals(dateString);
    const formatParts = this.getFormatParts(format2);
    const dateParts = dateString.split(/\D+/).filter(((part) => part.length > 0));
    if (formatParts.length !== dateParts.length) {
      return;
    }
    const dateArgs = this._generateDateArgs(formatParts, dateParts);
    const constructValidDate = (ampmShift) => {
      const parsedDate = ((dateArgs2, ampmShift2) => {
        const hoursShift = ampmShift2 ? 12 : 0;
        return new Date(dateArgs2.year, dateArgs2.month, dateArgs2.day, (dateArgs2.hours + hoursShift) % 24, dateArgs2.minutes, dateArgs2.seconds);
      })(dateArgs, ampmShift);
      if (dateStringEquals(normalizeNumerals(this.format(parsedDate, format2)), dateString)) {
        return parsedDate;
      }
    };
    return constructValidDate(false) || constructValidDate(true);
  },
  _generateDateArgs: function(formatParts, dateParts) {
    const currentDate = /* @__PURE__ */ new Date();
    const dateArgs = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    formatParts.forEach(((formatPart, index) => {
      const datePart = dateParts[index];
      let parsed = parseInt(datePart, 10);
      if ("month" === formatPart) {
        parsed -= 1;
      }
      dateArgs[formatPart] = parsed;
    }));
    return dateArgs;
  },
  formatUsesMonthName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.month;
    }
    return this.callBase.apply(this, arguments);
  },
  formatUsesDayName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.weekday;
    }
    return this.callBase.apply(this, arguments);
  },
  getTimeSeparator: function() {
    return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })).replace(/\d/g, "");
  },
  getFormatParts: function(format2) {
    if ("string" === typeof format2) {
      return this.callBase(format2);
    }
    const intlFormat = extend({}, intlFormats[format2.toLowerCase()]);
    const date = new Date(2001, 2, 4, 5, 6, 7);
    let formattedDate = getIntlFormatter(intlFormat)(date);
    formattedDate = normalizeNumerals(formattedDate);
    return [{
      name: "year",
      value: 1
    }, {
      name: "month",
      value: 3
    }, {
      name: "day",
      value: 4
    }, {
      name: "hours",
      value: 5
    }, {
      name: "minutes",
      value: 6
    }, {
      name: "seconds",
      value: 7
    }].map(((part) => ({
      name: part.name,
      index: formattedDate.indexOf(part.value)
    }))).filter(((part) => part.index > -1)).sort(((a, b) => a.index - b.index)).map(((part) => part.name));
  }
};

// node_modules/devextreme/esm/common/core/localization/date.js
var hasIntl = "undefined" !== typeof Intl;
var FORMATS_TO_PATTERN_MAP = {
  shortdate: "M/d/y",
  shorttime: "h:mm a",
  longdate: "EEEE, MMMM d, y",
  longtime: "h:mm:ss a",
  monthandday: "MMMM d",
  monthandyear: "MMMM y",
  quarterandyear: "QQQ y",
  day: "d",
  year: "y",
  shortdateshorttime: "M/d/y, h:mm a",
  longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
  month: "LLLL",
  shortyear: "yy",
  dayofweek: "EEEE",
  quarter: "QQQ",
  hour: "HH",
  minute: "mm",
  second: "ss",
  millisecond: "SSS",
  "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var possiblePartPatterns = {
  year: ["y", "yy", "yyyy"],
  day: ["d", "dd"],
  month: ["M", "MM", "MMM", "MMMM"],
  hours: ["H", "HH", "h", "hh", "ah"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  milliseconds: ["S", "SS", "SSS"]
};
var dateLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _getPatternByFormat: function(format2) {
    return FORMATS_TO_PATTERN_MAP[format2.toLowerCase()];
  },
  _expandPattern: function(pattern) {
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("MMMM");
  },
  formatUsesDayName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("EEEE");
  },
  getFormatParts: function(format2) {
    const pattern = this._getPatternByFormat(format2) || format2;
    const result = [];
    each(pattern.split(/\W+/), ((_, formatPart) => {
      each(possiblePartPatterns, ((partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      }));
    }));
    return result;
  },
  getMonthNames: function(format2) {
    return default_date_names_default.getMonthNames(format2);
  },
  getDayNames: function(format2) {
    return default_date_names_default.getDayNames(format2);
  },
  getQuarterNames: function(format2) {
    return default_date_names_default.getQuarterNames(format2);
  },
  getPeriodNames: function(format2) {
    return default_date_names_default.getPeriodNames(format2);
  },
  getTimeSeparator: function() {
    return ":";
  },
  is24HourFormat: function(format2) {
    const amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    const pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    const amTimeFormatted = this.format(amTime, format2);
    const pmTimeFormatted = this.format(pmTime, format2);
    for (let i = 0; i < amTimeFormatted.length; i++) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i]));
      }
    }
  },
  format: function(date, format2) {
    if (!date) {
      return;
    }
    if (!format2) {
      return date;
    }
    let formatter;
    if ("function" === typeof format2) {
      formatter = format2;
    } else if (format2.formatter) {
      formatter = format2.formatter;
    } else {
      format2 = format2.type || format2;
      if (isString(format2)) {
        format2 = FORMATS_TO_PATTERN_MAP[format2.toLowerCase()] || format2;
        return number_default.convertDigits(getFormatter(format2, this)(date));
      }
    }
    if (!formatter) {
      return;
    }
    return formatter(date);
  },
  parse: function(text, format2) {
    const that = this;
    let ldmlFormat;
    let formatter;
    if (!text) {
      return;
    }
    if (!format2) {
      return this.parse(text, "shortdate");
    }
    if (format2.parser) {
      return format2.parser(text);
    }
    if ("string" === typeof format2 && !FORMATS_TO_PATTERN_MAP[format2.toLowerCase()]) {
      ldmlFormat = format2;
    } else {
      formatter = (value) => {
        const text2 = that.format(value, format2);
        return number_default.convertDigits(text2, true);
      };
      try {
        ldmlFormat = getFormat2(formatter);
      } catch (e) {
      }
    }
    if (ldmlFormat) {
      text = number_default.convertDigits(text, true);
      return getParser(ldmlFormat, this)(text);
    }
    errors_default.log("W0012");
    const result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return;
    }
    return result;
  },
  firstDayOfWeekIndex: function() {
    const index = core_default.getValueByClosestLocale(((locale) => first_day_of_week_data_default[locale]));
    return void 0 === index ? 0 : index;
  }
});
if (hasIntl) {
  dateLocalization.inject(date_default2);
}
var date_default3 = dateLocalization;

// node_modules/devextreme/esm/__internal/events/gesture/m_swipeable.js
var DX_SWIPEABLE = "dxSwipeable";
var ACTION_TO_EVENT_MAP = {
  onStart: SWIPE_START_EVENT,
  onUpdated: SWIPE_EVENT,
  onEnd: SWIPE_END_EVENT,
  onCancel: "dxswipecancel"
};
var Swipeable = class extends dom_component_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      elastic: true,
      immediate: false,
      immediateTimeout: 180,
      direction: "horizontal",
      itemSizeFunc: null,
      onStart: null,
      onUpdated: null,
      onEnd: null,
      onCancel: null
    });
  }
  _render() {
    super._render();
    this.$element().addClass("dx-swipeable");
    this._attachEventHandlers();
  }
  _attachEventHandlers() {
    this._detachEventHandlers();
    if (this.option("disabled")) {
      return;
    }
    const {
      NAME
    } = this;
    this._createEventData();
    each(ACTION_TO_EVENT_MAP, ((actionName, eventName) => {
      const action = this._createActionByOption(actionName, {
        context: this
      });
      const event = addNamespace(eventName, NAME);
      m_events_engine_default.on(this.$element(), event, this._eventData, ((e) => action({
        event: e
      })));
    }));
  }
  _createEventData() {
    this._eventData = {
      elastic: this.option("elastic"),
      itemSizeFunc: this.option("itemSizeFunc"),
      direction: this.option("direction"),
      immediate: this.option("immediate"),
      immediateTimeout: this.option("immediateTimeout")
    };
  }
  _detachEventHandlers() {
    m_events_engine_default.off(this.$element(), `.${DX_SWIPEABLE}`);
  }
  _optionChanged(args) {
    switch (args.name) {
      case "disabled":
      case "onStart":
      case "onUpdated":
      case "onEnd":
      case "onCancel":
      case "elastic":
      case "immediate":
      case "itemSizeFunc":
      case "direction":
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case "rtlEnabled":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _useTemplates() {
    return false;
  }
};
getName(Swipeable, DX_SWIPEABLE);
var m_swipeable_default = Swipeable;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.selection.strategy.js
var CalendarSelectionStrategy = class {
  constructor(component) {
    this.calendar = component;
  }
  dateValue(value, e) {
    this.calendar._dateValue(value, e);
  }
  skipNavigate() {
    this.calendar._skipNavigate = true;
  }
  updateAriaSelected(value, previousValue) {
    this.calendar._updateAriaSelected(value, previousValue);
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.calendar.option();
    if (value[0] && currentDate.getTime() === value[0].getTime()) {
      this.calendar._updateAriaId(value[0]);
    }
  }
  processValueChanged(val, previousVal) {
    var _value, _previousValue;
    let value = val;
    let previousValue = previousVal;
    if (isDefined(value) && !Array.isArray(value)) {
      value = [value];
    }
    if (isDefined(previousValue) && !Array.isArray(previousValue)) {
      previousValue = [previousValue];
    }
    value = (null === (_value = value) || void 0 === _value ? void 0 : _value.map(((item) => this._convertToDate(item)))) ?? [];
    previousValue = (null === (_previousValue = previousValue) || void 0 === _previousValue ? void 0 : _previousValue.map(((item) => this._convertToDate(item)))) ?? [];
    this._updateViewsValue(value.filter(((item) => null !== item)));
    this.updateAriaSelected(value, previousValue);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  }
  _isDateDisabled(date) {
    const min = this.calendar._getDateOption("min");
    const max = this.calendar._getDateOption("max");
    const isLessThanMin = isDefined(min) && date < min && !date_default.sameDate(min, date);
    const isBiggerThanMax = isDefined(max) && date > max && !date_default.sameDate(max, date);
    return this.calendar._view.isDateDisabled(date) || isLessThanMin || isBiggerThanMax;
  }
  _getLowestDateInArray(dates) {
    if (dates.length) {
      return new Date(Math.min(...dates.map(((date) => (null === date || void 0 === date ? void 0 : date.getTime()) ?? 1 / 0))));
    }
    return null;
  }
  _convertToDate(value) {
    return this.calendar._convertToDate(value);
  }
  _isMaxZoomLevel() {
    return this.calendar._isMaxZoomLevel();
  }
  _updateViewsOption(optionName, optionValue) {
    this.calendar._updateViewsOption(optionName, optionValue);
  }
  _updateViewsValue(value) {
    this._updateViewsOption("value", value);
  }
  _updateCurrentDate(value) {
    this.calendar.option("currentDate", value ?? /* @__PURE__ */ new Date());
  }
  _shouldHandleWeekNumberClick() {
    const {
      selectionMode,
      selectWeekOnClick
    } = this.calendar.option();
    return true === selectWeekOnClick && "single" !== selectionMode;
  }
};
var calendar_selection_strategy_default = CalendarSelectionStrategy;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.multiple.selection.strategy.js
var CalendarMultiSelectionStrategy = class extends calendar_selection_strategy_default {
  constructor(component) {
    super(component);
    this.NAME = "MultiSelection";
  }
  dateOption(optionName) {
    if ("value" === optionName) {
      return this.calendar._getDateOption("value");
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    return {
      value: this.dateOption("value"),
      range: [],
      selectionMode: "multiple",
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  }
  selectValue(selectedValue, e) {
    const value = [...this.dateOption("value")];
    const alreadySelectedIndex = value.findIndex(((date) => (null === date || void 0 === date ? void 0 : date.toDateString()) === selectedValue.toDateString()));
    if (alreadySelectedIndex > -1) {
      value.splice(alreadySelectedIndex, 1);
    } else {
      value.push(selectedValue);
    }
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    this.dateValue(value, e);
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? this.dateOption("value");
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    const value = this.dateOption("value");
    const dates = value.filter(((date) => null !== date));
    return this._getLowestDateInArray(dates);
  }
  restoreValue() {
    this.calendar.option("value", []);
  }
  _weekNumberClickHandler(_ref) {
    let {
      rowDates,
      event
    } = _ref;
    const selectedDates = rowDates.filter(((date) => !this._isDateDisabled(date)));
    this.dateValue(selectedDates, event);
  }
};
var calendar_multiple_selection_strategy_default = CalendarMultiSelectionStrategy;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.navigator.js
var Navigator = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      onClick: void 0,
      onCaptionClick: void 0,
      type: "normal",
      stylingMode: "outlined",
      text: ""
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => isMaterial(current()),
      options: {
        type: "default",
        stylingMode: "text"
      }
    }, {
      device: () => isFluent(current()),
      options: {
        type: "normal",
        stylingMode: "text"
      }
    }]);
  }
  _init() {
    super._init();
    this._initActions();
  }
  _initActions() {
    this._clickAction = this._createActionByOption("onClick");
    this._captionClickAction = this._createActionByOption("onCaptionClick");
  }
  _initMarkup() {
    super._initMarkup();
    renderer_default(this.element()).addClass("dx-calendar-navigator");
    this._renderButtons();
    this._renderCaption();
  }
  _renderButtons() {
    const {
      rtlEnabled,
      type: type2,
      stylingMode,
      focusStateEnabled
    } = this.option();
    this._prevButton = this._createComponent(renderer_default("<div>"), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? "chevronright" : "chevronleft",
      onClick: (e) => {
        var _this$_clickAction;
        null === (_this$_clickAction = this._clickAction) || void 0 === _this$_clickAction || _this$_clickAction.call(this, {
          direction: -1,
          event: e
        });
      },
      type: type2,
      stylingMode,
      integrationOptions: {}
    });
    const $prevButton = renderer_default(this._prevButton.element()).addClass("dx-calendar-navigator-previous-view").addClass("dx-calendar-navigator-previous-month");
    this._nextButton = this._createComponent(renderer_default("<div>"), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? "chevronleft" : "chevronright",
      onClick: (e) => {
        var _this$_clickAction2;
        null === (_this$_clickAction2 = this._clickAction) || void 0 === _this$_clickAction2 || _this$_clickAction2.call(this, {
          direction: 1,
          event: e
        });
      },
      type: type2,
      stylingMode,
      integrationOptions: {}
    });
    const $nextButton = renderer_default(this._nextButton.element()).addClass("dx-calendar-navigator-next-view").addClass("dx-calendar-navigator-next-month");
    this._caption = this._createComponent(renderer_default("<div>").addClass("dx-calendar-caption-button"), Button, {
      focusStateEnabled,
      onClick: (e) => {
        var _this$_captionClickAc;
        null === (_this$_captionClickAc = this._captionClickAction) || void 0 === _this$_captionClickAc || _this$_captionClickAc.call(this, {
          event: e
        });
      },
      type: type2,
      stylingMode,
      template: (_, content) => {
        const {
          text
        } = this.option();
        const viewCaptionTexts = text.split(" - ");
        viewCaptionTexts.forEach(((captionText) => {
          renderer_default(content).append(renderer_default("<span>").addClass("dx-button-text").text(captionText));
        }));
      },
      integrationOptions: {}
    });
    const $caption = this._caption.$element();
    this.$element().append($prevButton).append($caption).append($nextButton);
  }
  _renderCaption() {
    var _this$_caption;
    const {
      text
    } = this.option();
    null === (_this$_caption = this._caption) || void 0 === _this$_caption || _this$_caption.option("text", text);
  }
  toggleButton(buttonPrefix, value) {
    const buttonName = `_${buttonPrefix}Button`;
    const button = this[buttonName];
    if (button) {
      button.option("disabled", value);
      button.$element().toggleClass("dx-calendar-disabled-navigator-link", value);
    }
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    if ("text" === name) {
      this._renderCaption();
    } else {
      super._optionChanged(args);
    }
  }
};
var calendar_navigator_default = Navigator;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.range.selection.strategy.js
var CalendarRangeSelectionStrategy = class extends calendar_selection_strategy_default {
  constructor(component) {
    super(component);
    this.NAME = "RangeSelection";
  }
  dateOption(optionName) {
    if ("value" === optionName) {
      return this.calendar._getDateOption("value") || null;
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    const value = this._getValue();
    const range = this._getDaysInRange(value[0], value[1]);
    return {
      value,
      range,
      selectionMode: "range",
      onCellHover: this._cellHoverHandler.bind(this),
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  }
  selectValue(selectedValue, e) {
    const [startDate, endDate] = this._getValue();
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    if (true === allowChangeSelectionOrder) {
      this.calendar._valueSelected = true;
      const convertedSelectedValue = this.calendar._convertToDate(selectedValue);
      if ("startDate" === currentSelection) {
        if (convertedSelectedValue > (this.calendar._convertToDate(endDate) ?? /* @__PURE__ */ new Date(0))) {
          this.dateValue([selectedValue, null], e);
        } else {
          this.dateValue([selectedValue, endDate], e);
        }
      } else if (convertedSelectedValue >= (this.calendar._convertToDate(startDate) ?? /* @__PURE__ */ new Date(0))) {
        this.dateValue([startDate, selectedValue], e);
      } else {
        this.dateValue([selectedValue, null], e);
      }
    } else if (!startDate || endDate) {
      this.dateValue([selectedValue, null], e);
    } else {
      this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e);
    }
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? this._getValue();
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  processValueChanged(value, previousValue) {
    super.processValueChanged(value, previousValue);
    const range = this._getRange();
    this._updateViewsOption("range", range);
  }
  getDefaultCurrentDate() {
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    const value = this.dateOption("value");
    if (allowChangeSelectionOrder) {
      if ("startDate" === currentSelection && value[0]) {
        return value[0];
      }
      if ("endDate" === currentSelection && value[1]) {
        return value[1];
      }
    }
    const dates = value.filter(((date) => null !== date));
    return this._getLowestDateInArray(dates);
  }
  restoreValue() {
    this.calendar.option("value", [null, null]);
  }
  _getValue() {
    const value = this.dateOption("value");
    if (!value.length) {
      return value;
    }
    let [startDate, endDate] = value;
    if (startDate && endDate && startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    return [startDate, endDate];
  }
  _getRange() {
    const [startDate, endDate] = this._getValue();
    return this._getDaysInRange(startDate, endDate);
  }
  _getDaysInRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return [];
    }
    const {
      currentDate,
      viewsCount
    } = this.calendar.option();
    const isAdditionalViewDate = this.calendar._isAdditionalViewDate(currentDate);
    const firstDateInViews = date_default.getFirstMonthDate(currentDate, isAdditionalViewDate ? -2 : -1);
    const lastDateInViews = date_default.getLastMonthDate(currentDate, isAdditionalViewDate ? 1 : viewsCount);
    const rangeStartDate = new Date(Math.max(firstDateInViews.getTime(), startDate.getTime()));
    const rangeEndDate = new Date(Math.min(lastDateInViews.getTime(), endDate.getTime()));
    return [...date_default.getDatesOfInterval(rangeStartDate, rangeEndDate, 864e5), rangeEndDate];
  }
  _cellHoverHandler(e) {
    const isMaxZoomLevel = this._isMaxZoomLevel();
    const [startDate, endDate] = this._getValue();
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    if (isMaxZoomLevel) {
      const skipHoveredRange = allowChangeSelectionOrder && "startDate" === currentSelection;
      if (startDate && !endDate && !skipHoveredRange) {
        if (e.value > startDate) {
          this._updateViewsOption("hoveredRange", this._getDaysInRange(startDate, e.value));
          return;
        }
      } else if (!startDate && endDate && !(allowChangeSelectionOrder && "endDate" === currentSelection)) {
        if (e.value < endDate) {
          this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, endDate));
          return;
        }
      } else if (startDate && endDate) {
        if ("startDate" === currentSelection && e.value < startDate) {
          this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, startDate));
          return;
        }
        if ("endDate" === currentSelection && e.value > endDate) {
          this._updateViewsOption("hoveredRange", this._getDaysInRange(endDate, e.value));
          return;
        }
      }
      this._updateViewsOption("hoveredRange", []);
    }
  }
  _weekNumberClickHandler(_ref) {
    let {
      rowDates,
      event
    } = _ref;
    const selectedDates = rowDates.filter(((date) => !this._isDateDisabled(date)));
    const value = selectedDates.length ? [selectedDates[0], selectedDates[selectedDates.length - 1]] : [null, null];
    this.dateValue(value, event);
  }
};
var calendar_range_selection_strategy_default = CalendarRangeSelectionStrategy;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.single.selection.strategy.js
var CalendarSingleSelectionStrategy = class extends calendar_selection_strategy_default {
  constructor(component) {
    super(component);
    this.NAME = "SingleSelection";
  }
  dateOption(optionName) {
    if ("value" === optionName) {
      return this.calendar._getDateOption("value");
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    const value = this.dateOption("value") ?? void 0;
    return {
      value,
      range: [],
      selectionMode: "single"
    };
  }
  selectValue(selectedValue, e) {
    this.skipNavigate();
    this.dateValue(selectedValue, e);
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? [this.dateOption("value")];
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    return this.dateOption("value");
  }
  restoreValue() {
    this.calendar.option("value", null);
  }
  _updateViewsValue(value) {
    this._updateViewsOption("value", value[0]);
  }
};
var calendar_single_selection_strategy_default = CalendarSingleSelectionStrategy;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.base_view.js
var NOT_WEEK_CELL_SELECTOR = "td:not(.dx-calendar-week-number-cell)";
var CALENDAR_DXCLICK_EVENT_NAME = addNamespace(CLICK_EVENT_NAME, "dxCalendar");
var CALENDAR_DXHOVERSTART_EVENT_NAME = addNamespace(HOVERSTART, "dxCalendar");
var CURRENT_DATE_TEXT = {
  month: message_default.format("dxCalendar-currentDay"),
  year: message_default.format("dxCalendar-currentMonth"),
  decade: message_default.format("dxCalendar-currentYear"),
  century: message_default.format("dxCalendar-currentYearRange")
};
var SELECTION_MODE = {
  single: "single",
  multiple: "multiple",
  range: "range"
};
var BaseView = class extends widget_default {
  _getViewName() {
    return "base";
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      date: /* @__PURE__ */ new Date(),
      focusStateEnabled: false,
      cellTemplate: null,
      disabledDates: null,
      onCellClick: null,
      onCellHover: null,
      onWeekNumberClick: null,
      rowCount: 3,
      colCount: 4,
      allowValueSelection: true,
      _todayDate: () => /* @__PURE__ */ new Date()
    });
  }
  _initMarkup() {
    super._initMarkup();
    this._renderImpl();
  }
  _renderImpl() {
    this.$element().append(this._createTable());
    this._createDisabledDatesHandler();
    this._renderBody();
    this._renderContouredDate();
    this._renderValue();
    this._renderRange();
    this._renderEvents();
    this._updateTableAriaLabel();
  }
  _getLocalizedWidgetName() {
    const localizedWidgetName = message_default.format("dxCalendar-ariaWidgetName");
    return localizedWidgetName;
  }
  _getSingleModeAriaLabel() {
    const {
      value
    } = this.option();
    const localizedWidgetName = this._getLocalizedWidgetName();
    const formattedDate = date_default3.format(value, "date");
    const selectedDatesText = message_default.format("dxCalendar-selectedDate", formattedDate);
    const ariaLabel = `${localizedWidgetName}. ${selectedDatesText}`;
    return ariaLabel;
  }
  _getRangeModeAriaLabel() {
    const {
      value
    } = this.option();
    const localizedWidgetName = this._getLocalizedWidgetName();
    const [startDate, endDate] = value;
    const formattedStartDate = date_default3.format(startDate, "date");
    const formattedEndDate = date_default3.format(endDate, "date");
    const selectedDatesText = startDate && endDate ? message_default.format("dxCalendar-selectedDateRange", formattedStartDate, formattedEndDate) : message_default.format("dxCalendar-selectedDate", formattedStartDate ?? formattedEndDate);
    const ariaLabel = `${localizedWidgetName}. ${selectedDatesText}`;
    return ariaLabel;
  }
  _getMultipleModeAriaLabel() {
    const localizedWidgetName = this._getLocalizedWidgetName();
    const selectedRangesText = this._getMultipleRangesText();
    const ariaLabel = `${localizedWidgetName}. ${selectedRangesText}`;
    return ariaLabel;
  }
  _getMultipleRangesText() {
    const {
      value
    } = this.option();
    const rangeValue = value;
    const ranges = date_default.getRangesByDates(rangeValue.map(((date) => new Date(date))));
    if (ranges.length > 2) {
      const dateRangeCountText = message_default.format("dxCalendar-selectedDateRangeCount", ranges.length);
      return dateRangeCountText;
    }
    const selectedDatesText = message_default.format("dxCalendar-selectedDates");
    const rangesText = ranges.map(((range) => this._getRangeText(range))).join(", ");
    const result = `${selectedDatesText}: ${rangesText}`;
    return result;
  }
  _getRangeText(range) {
    const [startDate, endDate] = range;
    const formattedStartDate = date_default3.format(startDate, "date");
    const formattedEndDate = date_default3.format(endDate, "date");
    const selectedDatesText = startDate && endDate ? message_default.format("dxCalendar-selectedMultipleDateRange", formattedStartDate, formattedEndDate) : formattedStartDate;
    return `${selectedDatesText}`;
  }
  _getTableAriaLabel() {
    const {
      value,
      selectionMode
    } = this.option();
    const isValueEmpty = !value || Array.isArray(value) && !value.filter(Boolean).length;
    if (isValueEmpty) {
      return this._getLocalizedWidgetName();
    }
    switch (selectionMode) {
      case SELECTION_MODE.single:
        return this._getSingleModeAriaLabel();
      case SELECTION_MODE.range:
        return this._getRangeModeAriaLabel();
      case SELECTION_MODE.multiple:
        return this._getMultipleModeAriaLabel();
      default:
        return this._getSingleModeAriaLabel();
    }
  }
  _updateTableAriaLabel() {
    const label = this._getTableAriaLabel();
    this.setAria({
      label
    }, this._$table);
  }
  _createTable() {
    this._$table = renderer_default("<table>");
    this.setAria({
      role: "grid"
    }, this._$table);
    return this._$table;
  }
  _renderBody() {
    this.$body = renderer_default("<tbody>").appendTo(this._$table);
    const rowData = {
      cellDate: this._getFirstCellData(),
      prevCellDate: null,
      row: void 0
    };
    const {
      rowCount: rowsCount,
      colCount: colsCount
    } = this.option();
    for (let rowIndex = 0, rowCount = rowsCount; rowIndex < rowCount; rowIndex += 1) {
      rowData.row = this._createRow();
      for (let colIndex = 0, colCount = colsCount; colIndex < colCount; colIndex += 1) {
        this._renderCell(rowData, colIndex);
      }
      this._renderWeekNumberCell(rowData);
    }
  }
  _renderWeekNumberCell(rowData) {
  }
  _createRow() {
    const row = dom_adapter_default.createElement("tr");
    this.setAria("role", "row", renderer_default(row));
    this.$body.get(0).appendChild(row);
    return row;
  }
  _createCell(cellDate, cellIndex) {
    const cell = dom_adapter_default.createElement("td");
    const $cell = renderer_default(cell);
    cell.className = this._getClassNameByDate(cellDate, cellIndex);
    cell.setAttribute("data-value", date_serialization_default.serializeDate(cellDate, date_default.getShortDateFormat()));
    data(cell, "dxDateValueKey", cellDate);
    this.setAria({
      role: "gridcell",
      selected: false,
      label: this.getCellAriaLabel(cellDate)
    }, $cell);
    return {
      cell,
      $cell
    };
  }
  _renderCell(params, cellIndex) {
    const {
      cellDate,
      prevCellDate,
      row
    } = params;
    if (prevCellDate) {
      date_default.fixTimezoneGap(prevCellDate, cellDate);
    }
    params.prevCellDate = cellDate;
    const {
      cell,
      $cell
    } = this._createCell(cellDate, cellIndex);
    const {
      cellTemplate
    } = this.option();
    renderer_default(row).append(cell);
    if (cellTemplate) {
      cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell));
    } else {
      cell.innerHTML = this._getCellText(cellDate);
    }
    params.cellDate = this._getNextCellData(cellDate);
  }
  _getClassNameByDate(cellDate, cellIndex) {
    let className = "dx-calendar-cell";
    if (this._isTodayCell(cellDate)) {
      className += " dx-calendar-today";
    }
    if (this._isDateOutOfRange(cellDate) || this.isDateDisabled(cellDate)) {
      className += " dx-calendar-empty-cell";
    }
    if (this._isOtherView(cellDate)) {
      className += " dx-calendar-other-view";
    }
    const {
      selectionMode
    } = this.option();
    if (selectionMode === SELECTION_MODE.range) {
      if (0 === cellIndex) {
        className += " dx-calendar-cell-start-in-row";
      }
      const {
        colCount
      } = this.option();
      if (cellIndex === colCount - 1) {
        className += " dx-calendar-cell-end-in-row";
      }
      if (this._isStartDayOfMonth(cellDate)) {
        className += " dx-calendar-cell-start";
      }
      if (this._isEndDayOfMonth(cellDate)) {
        className += " dx-calendar-cell-end";
      }
    }
    return className;
  }
  _prepareCellTemplateData(cellDate, cellIndex, $cell) {
    const isDateCell = cellDate instanceof Date;
    const text = isDateCell ? this._getCellText(cellDate) : cellDate;
    const date = isDateCell ? cellDate : void 0;
    const view = this._getViewName();
    return {
      model: {
        text,
        date,
        view
      },
      container: getPublicElement($cell),
      index: cellIndex
    };
  }
  _renderEvents() {
    this._createCellClickAction();
    m_events_engine_default.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
    m_events_engine_default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, ((e) => {
      if (!renderer_default(e.currentTarget).hasClass("dx-calendar-empty-cell")) {
        this._cellClickAction({
          event: e,
          value: renderer_default(e.currentTarget).data("dxDateValueKey")
        });
      }
    }));
    const {
      selectionMode
    } = this.option();
    m_events_engine_default.off(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME);
    if (selectionMode === SELECTION_MODE.range) {
      this._createCellHoverAction();
      m_events_engine_default.on(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, ((e) => {
        if (!renderer_default(e.currentTarget).hasClass("dx-calendar-empty-cell")) {
          this._cellHoverAction({
            event: e,
            value: renderer_default(e.currentTarget).data("dxDateValueKey")
          });
        }
      }));
    }
    if (selectionMode !== SELECTION_MODE.single) {
      this._createWeekNumberCellClickAction();
      m_events_engine_default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, ".dx-calendar-week-number-cell", ((e) => {
        const $row = renderer_default(e.currentTarget).closest("tr");
        const firstDateInRow = $row.find(".dx-calendar-cell").first().data("dxDateValueKey");
        const lastDateInRow = $row.find(".dx-calendar-cell").last().data("dxDateValueKey");
        const rowDates = [...date_default.getDatesOfInterval(firstDateInRow, lastDateInRow, 864e5), lastDateInRow];
        this._weekNumberCellClickAction({
          event: e,
          rowDates
        });
      }));
    }
  }
  _createCellClickAction() {
    this._cellClickAction = this._createActionByOption("onCellClick");
  }
  _createCellHoverAction() {
    this._cellHoverAction = this._createActionByOption("onCellHover");
  }
  _createWeekNumberCellClickAction() {
    this._weekNumberCellClickAction = this._createActionByOption("onWeekNumberClick");
  }
  _createDisabledDatesHandler() {
    const {
      disabledDates
    } = this.option();
    this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates ?? (() => false);
  }
  _getDefaultDisabledDatesHandler(disabledDates) {
    return () => false;
  }
  _isTodayCell(cellDate) {
    return false;
  }
  _isDateOutOfRange(cellDate) {
    return false;
  }
  isDateDisabled(cellDate) {
    const dateParts = {
      date: cellDate,
      view: this._getViewName()
    };
    return this._disabledDatesHandler(dateParts);
  }
  _isOtherView(cellDate) {
    return false;
  }
  _isStartDayOfMonth(cellDate) {
    return false;
  }
  _isEndDayOfMonth(cellDate) {
    return false;
  }
  _getCellText(cellDate) {
    return "";
  }
  _getFirstCellData() {
    return /* @__PURE__ */ new Date();
  }
  _getNextCellData(date) {
    return new Date(date);
  }
  _renderContouredDate(contouredDate) {
    const {
      focusStateEnabled
    } = this.option();
    if (!focusStateEnabled) {
      return;
    }
    const {
      contouredDate: currentContouredDate
    } = this.option();
    const newContouredDate = contouredDate ?? currentContouredDate;
    const $oldContouredCell = this._getContouredCell();
    const $newContouredCell = this._getCellByDate(newContouredDate);
    $oldContouredCell.removeClass("dx-calendar-contoured-date");
    if (newContouredDate) {
      $newContouredCell.addClass("dx-calendar-contoured-date");
    }
  }
  _getContouredCell() {
    return this._$table.find(".dx-calendar-contoured-date");
  }
  _renderValue() {
    if (!this.option("allowValueSelection")) {
      return;
    }
    let {
      value = []
    } = this.option();
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._updateSelectedClass(value);
  }
  _updateSelectedClass(value) {
    var _this$_$selectedCells;
    if (this._isRangeMode() && !this._isMonthView()) {
      return;
    }
    null === (_this$_$selectedCells = this._$selectedCells) || void 0 === _this$_$selectedCells || _this$_$selectedCells.forEach((($cell) => {
      $cell.removeClass("dx-calendar-selected-date");
    }));
    this._$selectedCells = value.map(((date) => this._getCellByDate(date)));
    this._$selectedCells.forEach((($cell) => {
      $cell.addClass("dx-calendar-selected-date");
    }));
  }
  _renderRange() {
    var _this$_$rangeCells, _this$_$hoveredRangeC, _this$_$rangeStartHov, _this$_$rangeEndHover, _this$_$rangeStartDat, _this$_$rangeEndDateC, _this$_$rangeStartDat2, _this$_$rangeEndDateC2;
    const {
      allowValueSelection,
      value = [],
      range
    } = this.option();
    if (!allowValueSelection || !this._isRangeMode() || !this._isMonthView()) {
      return;
    }
    null === (_this$_$rangeCells = this._$rangeCells) || void 0 === _this$_$rangeCells || _this$_$rangeCells.forEach((($cell) => {
      $cell.removeClass("dx-calendar-cell-in-range");
    }));
    null === (_this$_$hoveredRangeC = this._$hoveredRangeCells) || void 0 === _this$_$hoveredRangeC || _this$_$hoveredRangeC.forEach((($cell) => {
      $cell.removeClass("dx-calendar-cell-range-hover");
    }));
    null === (_this$_$rangeStartHov = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov || _this$_$rangeStartHov.removeClass("dx-calendar-cell-range-hover-start");
    null === (_this$_$rangeEndHover = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover || _this$_$rangeEndHover.removeClass("dx-calendar-cell-range-hover-end");
    null === (_this$_$rangeStartDat = this._$rangeStartDateCell) || void 0 === _this$_$rangeStartDat || _this$_$rangeStartDat.removeClass("dx-calendar-range-start-date");
    null === (_this$_$rangeEndDateC = this._$rangeEndDateCell) || void 0 === _this$_$rangeEndDateC || _this$_$rangeEndDateC.removeClass("dx-calendar-range-end-date");
    this._$rangeCells = range.map(((date) => this._getCellByDate(date)));
    this._$rangeStartDateCell = this._getCellByDate(value[0]);
    this._$rangeEndDateCell = this._getCellByDate(value[1]);
    this._$rangeCells.forEach((($cell) => {
      $cell.addClass("dx-calendar-cell-in-range");
    }));
    null === (_this$_$rangeStartDat2 = this._$rangeStartDateCell) || void 0 === _this$_$rangeStartDat2 || _this$_$rangeStartDat2.addClass("dx-calendar-range-start-date");
    null === (_this$_$rangeEndDateC2 = this._$rangeEndDateCell) || void 0 === _this$_$rangeEndDateC2 || _this$_$rangeEndDateC2.addClass("dx-calendar-range-end-date");
  }
  _renderHoveredRange() {
    var _this$_$hoveredRangeC2, _this$_$rangeStartHov2, _this$_$rangeEndHover2, _this$_$rangeStartHov3, _this$_$rangeEndHover3;
    const {
      allowValueSelection,
      hoveredRange
    } = this.option();
    if (!allowValueSelection || !this._isRangeMode() || !this._isMonthView()) {
      return;
    }
    null === (_this$_$hoveredRangeC2 = this._$hoveredRangeCells) || void 0 === _this$_$hoveredRangeC2 || _this$_$hoveredRangeC2.forEach((($cell) => {
      $cell.removeClass("dx-calendar-cell-range-hover");
    }));
    null === (_this$_$rangeStartHov2 = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov2 || _this$_$rangeStartHov2.removeClass("dx-calendar-cell-range-hover-start");
    null === (_this$_$rangeEndHover2 = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover2 || _this$_$rangeEndHover2.removeClass("dx-calendar-cell-range-hover-end");
    this._$hoveredRangeCells = hoveredRange.map(((date) => this._getCellByDate(date)));
    this._$rangeStartHoverCell = this._getCellByDate(hoveredRange[0]);
    this._$rangeEndHoverCell = this._getCellByDate(hoveredRange[hoveredRange.length - 1]);
    this._$hoveredRangeCells.forEach((($cell) => {
      $cell.addClass("dx-calendar-cell-range-hover");
    }));
    null === (_this$_$rangeStartHov3 = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov3 || _this$_$rangeStartHov3.addClass("dx-calendar-cell-range-hover-start");
    null === (_this$_$rangeEndHover3 = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover3 || _this$_$rangeEndHover3.addClass("dx-calendar-cell-range-hover-end");
  }
  _isMonthView() {
    const {
      zoomLevel
    } = this.option();
    return "month" === zoomLevel;
  }
  _isRangeMode() {
    const {
      selectionMode
    } = this.option();
    return selectionMode === SELECTION_MODE.range;
  }
  _getCurrentDateFormat() {
    return null;
  }
  getCellAriaLabel(date) {
    const viewName = this._getViewName();
    const isToday = this._isTodayCell(date);
    const format2 = this._getCurrentDateFormat();
    const dateRangeText = format2 ? `${date_default3.format(date, format2)}` : this._getCellText(date);
    const ariaLabel = isToday ? `${dateRangeText}. ${CURRENT_DATE_TEXT[viewName]}` : dateRangeText;
    return ariaLabel;
  }
  _getFirstAvailableDate() {
    const {
      date,
      min
    } = this.option();
    const firstAvailableDate = date_default.getViewFirstCellDate(this._getViewName(), date) ?? date;
    return new Date(min && firstAvailableDate < min ? min : firstAvailableDate);
  }
  _getCellByDate(contouredDate) {
    return renderer_default();
  }
  isBoundary(date) {
    return false;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "value":
        this._renderValue();
        this._updateTableAriaLabel();
        break;
      case "range":
        this._renderRange();
        break;
      case "hoveredRange":
        this._renderHoveredRange();
        break;
      case "contouredDate":
        this._renderContouredDate(value);
        break;
      case "onCellClick":
        this._createCellClickAction();
        break;
      case "onCellHover":
        this._createCellHoverAction();
        break;
      case "min":
      case "max":
      case "disabledDates":
      case "cellTemplate":
      case "selectionMode":
        this._invalidate();
        break;
      case "_todayDate":
        this._renderBody();
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var calendar_base_view_default = BaseView;

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.views.js
var MonthView = class extends calendar_base_view_default {
  _getViewName() {
    return "month";
  }
  _getCurrentDateFormat() {
    return "longdate";
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      firstDayOfWeek: 0,
      rowCount: 6,
      colCount: 7
    });
  }
  _renderImpl() {
    super._renderImpl();
    this._renderHeader();
  }
  _renderBody() {
    super._renderBody();
    this._$table.find(".dx-calendar-other-view").addClass("dx-calendar-other-month");
  }
  _renderFocusTarget() {
  }
  _renderHeader() {
    const $headerRow = renderer_default("<tr>");
    const $header = renderer_default("<thead>").append($headerRow);
    this._$table.prepend($header);
    const {
      colCount: columnsCount,
      showWeekNumbers
    } = this.option();
    for (let colIndex = 0, colCount = columnsCount; colIndex < colCount; colIndex += 1) {
      this._renderHeaderCell(colIndex, $headerRow);
    }
    if (showWeekNumbers) {
      this._renderWeekHeaderCell($headerRow);
    }
  }
  _renderHeaderCell(cellIndex, $headerRow) {
    const {
      firstDayOfWeek = 0
    } = this.option();
    const {
      full: fullCaption,
      abbreviated: abbrCaption
    } = this._getDayCaption(firstDayOfWeek + cellIndex);
    const $cell = renderer_default("<th>").attr({
      scope: "col",
      abbr: fullCaption
    }).text(abbrCaption);
    $headerRow.append($cell);
  }
  _renderWeekHeaderCell($headerRow) {
    const $weekNumberHeaderCell = renderer_default("<th>").attr({
      scope: "col",
      abbr: "WeekNumber",
      class: "dx-week-number-header"
    });
    $headerRow.prepend($weekNumberHeaderCell);
  }
  _renderWeekNumberCell(rowData) {
    const {
      showWeekNumbers,
      cellTemplate,
      selectionMode,
      selectWeekOnClick
    } = this.option();
    if (!showWeekNumbers) {
      return;
    }
    const weekNumber = this._getWeekNumber(rowData.prevCellDate);
    const cell = dom_adapter_default.createElement("td");
    const $cell = renderer_default(cell);
    cell.className = "dx-calendar-week-number-cell";
    if ("single" !== selectionMode && selectWeekOnClick) {
      $cell.addClass("dx-calendar-week-selection");
    }
    if (cellTemplate) {
      cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell));
    } else {
      cell.innerHTML = `${weekNumber}`;
    }
    rowData.row.prepend(cell);
    this.setAria({
      role: "gridcell",
      label: `Week ${weekNumber}`
    }, $cell);
  }
  _getWeekNumber(date) {
    const {
      weekNumberRule = "auto",
      firstDayOfWeek
    } = this.option();
    if ("auto" === weekNumberRule) {
      return date_default.getWeekNumber(date, firstDayOfWeek, 1 === firstDayOfWeek ? "firstFourDays" : "firstDay");
    }
    return date_default.getWeekNumber(date, firstDayOfWeek, weekNumberRule);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return `${date_default3.format(date, "monthandyear")}`;
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return date_default.sameDate(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const minDate = this.option("min");
    const maxDate = this.option("max");
    return !date_default.dateInRange(cellDate, minDate, maxDate, "date");
  }
  _isOtherView(cellDate) {
    const {
      date
    } = this.option();
    return cellDate.getMonth() !== date.getMonth();
  }
  _isStartDayOfMonth(cellDate) {
    return date_default.sameDate(cellDate, date_default.getFirstMonthDate(this.option("date")));
  }
  _isEndDayOfMonth(cellDate) {
    return date_default.sameDate(cellDate, date_default.getLastMonthDate(this.option("date")));
  }
  _getCellText(cellDate) {
    return `${date_default3.format(cellDate, "d")}`;
  }
  _getDayCaption(day) {
    const {
      colCount: daysInWeek
    } = this.option();
    const dayIndex = day % daysInWeek;
    return {
      full: date_default3.getDayNames()[dayIndex],
      abbreviated: date_default3.getDayNames("abbreviated")[dayIndex]
    };
  }
  _getFirstCellData() {
    const {
      firstDayOfWeek = 0,
      date
    } = this.option();
    const firstDay = date_default.getFirstMonthDate(date);
    let firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
    const {
      colCount: daysInWeek
    } = this.option();
    if (firstMonthDayOffset >= 0) {
      firstMonthDayOffset -= daysInWeek;
    }
    firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
    return firstDay;
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }
  _getCellByDate(date) {
    return this._$table.find(`td[data-value='${date_serialization_default.serializeDate(date, date_default.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    return date_default.sameMonthAndYear(date, this.option("min")) || date_default.sameMonthAndYear(date, this.option("max"));
  }
  _getDefaultDisabledDatesHandler(disabledDates) {
    return (args) => disabledDates.some(((item) => date_default.sameDate(item, args.date)));
  }
};
var YearView = class extends calendar_base_view_default {
  _getViewName() {
    return "year";
  }
  _getCurrentDateFormat() {
    return "monthandyear";
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return date_default.sameMonthAndYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    return !date_default.dateInRange(cellDate, date_default.getFirstMonthDate(this.option("min")), date_default.getLastMonthDate(this.option("max")));
  }
  _isOtherView() {
    return false;
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    return date_default3.getMonthNames("abbreviated")[cellDate.getMonth()];
  }
  _getFirstCellData() {
    const {
      date: currentDate
    } = this.option();
    const data2 = new Date(currentDate);
    data2.setDate(1);
    data2.setMonth(0);
    return data2;
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    return this._$table.find(`td[data-value='${date_serialization_default.serializeDate(foundDate, date_default.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return `${date_default3.format(date, "yyyy")}`;
  }
  isBoundary(date) {
    return date_default.sameYear(date, this.option("min")) || date_default.sameYear(date, this.option("max"));
  }
  _renderWeekNumberCell() {
  }
};
var DecadeView = class extends calendar_base_view_default {
  _getViewName() {
    return "decade";
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return date_default.sameYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const {
      min,
      max
    } = this.option();
    return !date_default.dateInRange(cellDate.getFullYear(), null === min || void 0 === min ? void 0 : min.getFullYear(), null === max || void 0 === max ? void 0 : max.getFullYear());
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !date_default.sameDecade(date, this.option("date"));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    return `${date_default3.format(cellDate, "yyyy")}`;
  }
  _getFirstCellData() {
    const year = date_default.getFirstYearInDecade(this.option("date")) - 1;
    return date_default.createDateWithFullYear(year, 0, 1);
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstYearInDecade = date_default.getFirstYearInDecade(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstYearInDecade);
    endDate.setFullYear(firstYearInDecade + 9);
    return `${date_default3.format(startDate, "yyyy")}-${date_default3.format(endDate, "yyyy")}`;
  }
  _isValueOnCurrentView(currentDate, value) {
    return date_default.sameDecade(currentDate, value);
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    return this._$table.find(`td[data-value='${date_serialization_default.serializeDate(foundDate, date_default.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    return date_default.sameDecade(date, this.option("min")) || date_default.sameDecade(date, this.option("max"));
  }
  _renderWeekNumberCell() {
  }
};
var CenturyView = class extends calendar_base_view_default {
  _getViewName() {
    return "century";
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return date_default.sameDecade(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const decade = date_default.getFirstYearInDecade(cellDate);
    const minDecade = date_default.getFirstYearInDecade(this.option("min"));
    const maxDecade = date_default.getFirstYearInDecade(this.option("max"));
    return !date_default.dateInRange(decade, minDecade, maxDecade);
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !date_default.sameCentury(date, this.option("date"));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    const startDate = date_default3.format(cellDate, "yyyy");
    const endDate = new Date(cellDate);
    endDate.setFullYear(endDate.getFullYear() + 9);
    return `${startDate} - ${date_default3.format(endDate, "yyyy")}`;
  }
  _getFirstCellData() {
    const decade = date_default.getFirstDecadeInCentury(this.option("date")) - 10;
    return date_default.createDateWithFullYear(decade, 0, 1);
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 10);
    return newDate;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    foundDate.setFullYear(date_default.getFirstYearInDecade(foundDate));
    return this._$table.find(`td[data-value='${date_serialization_default.serializeDate(foundDate, date_default.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstDecadeInCentury = date_default.getFirstDecadeInCentury(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstDecadeInCentury);
    endDate.setFullYear(firstDecadeInCentury + 99);
    return `${date_default3.format(startDate, "yyyy")}-${date_default3.format(endDate, "yyyy")}`;
  }
  isBoundary(date) {
    return date_default.sameCentury(date, this.option("min")) || date_default.sameCentury(date, this.option("max"));
  }
  _renderWeekNumberCell() {
  }
};
var calendar_views_default = {
  month: MonthView,
  year: YearView,
  decade: DecadeView,
  century: CenturyView
};

// node_modules/devextreme/esm/__internal/ui/calendar/calendar.js
var CALENDAR_DXHOVEREND_EVENT_NAME = addNamespace(HOVEREND, "dxCalendar");
var LEVEL_COMPARE_MAP = {
  month: 3,
  year: 2,
  decade: 1,
  century: 0
};
var ZOOM_LEVEL = {
  MONTH: "month",
  YEAR: "year",
  DECADE: "decade",
  CENTURY: "century"
};
var SELECTION_STRATEGIES = {
  SingleSelection: calendar_single_selection_strategy_default,
  MultipleSelection: calendar_multiple_selection_strategy_default,
  RangeSelection: calendar_range_selection_strategy_default
};
var Calendar = class extends editor_default {
  _activeStateUnit() {
    return ".dx-calendar-cell";
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      currentDate: /* @__PURE__ */ new Date(),
      value: null,
      min: new Date(1e3, 0),
      max: new Date(3e3, 0),
      viewsCount: 1,
      zoomLevel: ZOOM_LEVEL.MONTH,
      maxZoomLevel: ZOOM_LEVEL.MONTH,
      minZoomLevel: ZOOM_LEVEL.CENTURY,
      selectionMode: "single",
      selectWeekOnClick: true,
      showTodayButton: false,
      todayButtonText: message_default.format("dxCalendar-todayButtonText"),
      showWeekNumbers: false,
      weekNumberRule: "auto",
      cellTemplate: "cell",
      disabledDates: null,
      onCellClick: null,
      onContouredChanged: null,
      skipFocusCheck: false,
      _todayDate: () => /* @__PURE__ */ new Date()
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      rightArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._waitRenderView(1);
        } else {
          this._moveCurrentDateByOffset(1 * this._getRtlCorrection());
        }
      },
      leftArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._waitRenderView(-1);
        } else {
          this._moveCurrentDateByOffset(-1 * this._getRtlCorrection());
        }
      },
      upArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._navigateUp();
        } else {
          if (fx_default.isAnimating(this._view.$element().get(0))) {
            return;
          }
          this._moveCurrentDateByOffset(-1 * this._view.option("colCount"));
        }
      },
      downArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._navigateDown();
        } else {
          if (fx_default.isAnimating(this._view.$element().get(0))) {
            return;
          }
          this._moveCurrentDateByOffset(1 * this._view.option("colCount"));
        }
      },
      home(e) {
        e.preventDefault();
        const zoomLevel = this.option("zoomLevel");
        const currentDate = this.option("currentDate");
        const min = this._getDateOption("min");
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        const date = date_default.sameView(zoomLevel, currentDate, min) ? min : date_default.getViewFirstCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      end(e) {
        e.preventDefault();
        const zoomLevel = this.option("zoomLevel");
        const currentDate = this.option("currentDate");
        const max = this._getDateOption("max");
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        const date = date_default.sameView(zoomLevel, currentDate, max) ? max : date_default.getViewLastCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      pageUp(e) {
        e.preventDefault();
        this._waitRenderView(-1 * this._getRtlCorrection());
      },
      pageDown(e) {
        e.preventDefault();
        this._waitRenderView(1 * this._getRtlCorrection());
      },
      tab() {
      },
      enter: this._enterKeyHandler
    });
  }
  _enterKeyHandler(e) {
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    if (!this._isMaxZoomLevel()) {
      this._navigateDown();
    } else if (!this._view.isDateDisabled(currentDate)) {
      const value = this._updateTimeComponent(currentDate);
      this._selectionStrategy.selectValue(value, e);
    }
  }
  _getSerializationFormat() {
    let optionName = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "value";
    const {
      [optionName]: value
    } = this.option();
    const {
      dateSerializationFormat
    } = this.option();
    if (dateSerializationFormat) {
      return dateSerializationFormat;
    }
    if (isNumeric(value)) {
      return "number";
    }
    if (!isString(value) || "" === value) {
      return;
    }
    return date_serialization_default.getDateSerializationFormat(value);
  }
  _convertToDate(value) {
    return date_serialization_default.deserializeDate(value);
  }
  _dateValue(value, event) {
    if (event) {
      if ("keydown" === event.type) {
        const cellElement = this._view._getContouredCell().get(0);
        event.target = cellElement;
      }
      this._saveValueChangeEvent(event);
    }
    this._setDateOption("value", value);
  }
  _isArrayValue(optionName, value) {
    return "value" === optionName && !this._isSingleMode();
  }
  _setDateOption(optionName, optionValue) {
    const serializationFormat = this._getSerializationFormat(optionName);
    const serializedValue = this._isArrayValue(optionName, optionValue) ? optionValue.map(((value) => date_serialization_default.serializeDate(value, serializationFormat))) : date_serialization_default.serializeDate(optionValue, serializationFormat);
    this.option(optionName, serializedValue);
  }
  _getDateOption(optionName) {
    let {
      [optionName]: optionValue
    } = this.option();
    if (!this._isArrayValue(optionName, optionValue)) {
      if ("" === optionValue) {
        optionValue = null;
      }
      return this._convertToDate(optionValue);
    }
    const valueArray = optionValue ?? [];
    return valueArray.map(((item) => this._convertToDate(item)));
  }
  _isSingleMode() {
    const {
      selectionMode
    } = this.option();
    return "single" === selectionMode;
  }
  _shiftDate(zoomLevel, date, offset, reverse) {
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        date.setDate(date.getDate() + offset * reverse);
        break;
      case ZOOM_LEVEL.YEAR:
        date.setMonth(date.getMonth() + offset * reverse);
        break;
      case ZOOM_LEVEL.DECADE:
        date.setFullYear(date.getFullYear() + offset * reverse);
        break;
      case ZOOM_LEVEL.CENTURY:
        date.setFullYear(date.getFullYear() + 10 * offset * reverse);
    }
  }
  _moveCurrentDateByOffset(offset) {
    const {
      currentDate: baseDate = /* @__PURE__ */ new Date(),
      zoomLevel = ZOOM_LEVEL.MONTH
    } = this.option();
    let currentDate = new Date(baseDate);
    this._shiftDate(zoomLevel, currentDate, offset, 1);
    const maxDate = this._getMaxDate();
    const minDate = this._getMinDate();
    let isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, currentDate, baseDate);
    let isDateForwardInRange = inRange(currentDate, minDate, maxDate) && isDateForwardInNeighborView;
    const dateForward = new Date(currentDate);
    while (isDateForwardInRange) {
      if (!this._view.isDateDisabled(dateForward)) {
        currentDate = dateForward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, offset, 1);
      isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, dateForward, baseDate);
      isDateForwardInRange = inRange(dateForward, minDate, maxDate) && isDateForwardInNeighborView;
    }
    if (this._view.isDateDisabled(baseDate) || this._view.isDateDisabled(currentDate)) {
      const direction = offset > 0 ? 1 : -1;
      const isViewDisabled = 1 === direction ? this._isNextViewDisabled() : this._isPrevViewDisabled();
      if (!isViewDisabled) {
        this._waitRenderView(direction);
      } else {
        this._moveToClosestAvailableDate(currentDate);
      }
    } else {
      this._skipNavigate = true;
      this.option("currentDate", currentDate);
    }
  }
  _isNextViewDisabled() {
    const {
      disabled
    } = this._navigator._nextButton.option();
    return true === disabled;
  }
  _isPrevViewDisabled() {
    const {
      disabled
    } = this._navigator._prevButton.option();
    return true === disabled;
  }
  _areDatesInSameView(zoomLevel, date1, date2) {
    switch (zoomLevel) {
      case ZOOM_LEVEL.YEAR:
        return date1.getFullYear() === date2.getFullYear();
      case ZOOM_LEVEL.DECADE:
        return Math.floor(date1.getFullYear() / 10) === Math.floor(date2.getFullYear() / 10);
      case ZOOM_LEVEL.CENTURY:
        return Math.floor(date1.getFullYear() / 100) === Math.floor(date2.getFullYear() / 100);
      case ZOOM_LEVEL.MONTH:
      default:
        return date1.getMonth() === date2.getMonth();
    }
  }
  _areDatesInNeighborView(zoomLevel, date1, date2) {
    switch (zoomLevel) {
      case ZOOM_LEVEL.YEAR:
        return Math.abs(date1.getFullYear() - date2.getFullYear()) <= 1;
      case ZOOM_LEVEL.DECADE:
        return Math.abs(date1.getFullYear() - date2.getFullYear()) <= 10;
      case ZOOM_LEVEL.CENTURY:
        return Math.abs(date1.getFullYear() - date2.getFullYear()) <= 100;
      case ZOOM_LEVEL.MONTH:
      default:
        return ((a, b) => {
          const abs = Math.abs(a - b);
          return Math.min(abs, 12 - abs);
        })(date1.getMonth(), date2.getMonth()) <= 1;
    }
  }
  _moveToClosestAvailableDate(baseDate) {
    const {
      zoomLevel = ZOOM_LEVEL.MONTH,
      currentDate: oldCurrentDate = /* @__PURE__ */ new Date()
    } = this.option();
    let currentDate = new Date(baseDate ?? oldCurrentDate);
    const isCurrentDateAvailable = !this._isDateNotAvailable(currentDate);
    let isDateForwardAvailable = isCurrentDateAvailable;
    let isDateBackwardAvailable = isCurrentDateAvailable;
    let isDateForwardInStartView = true;
    let isDateBackwardInStartView = true;
    const dateForward = new Date(currentDate);
    const dateBackward = new Date(currentDate);
    do {
      if (isDateForwardAvailable) {
        currentDate = dateForward;
        break;
      }
      if (isDateBackwardAvailable) {
        currentDate = dateBackward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, 1, 1);
      this._shiftDate(zoomLevel, dateBackward, 1, -1);
      isDateForwardInStartView = this._areDatesInSameView(zoomLevel, dateForward, baseDate ?? oldCurrentDate);
      isDateBackwardInStartView = this._areDatesInSameView(zoomLevel, dateBackward, baseDate ?? oldCurrentDate);
      isDateForwardAvailable = isDateForwardInStartView && !this._isDateNotAvailable(dateForward);
      isDateBackwardAvailable = isDateBackwardInStartView && !this._isDateNotAvailable(dateBackward);
    } while (isDateForwardInStartView || isDateBackwardInStartView);
    this.option("currentDate", currentDate);
  }
  _isDateNotAvailable(date) {
    const maxDate = this._getMaxDate();
    const minDate = this._getMinDate();
    return !inRange(date, minDate, maxDate) || this._view.isDateDisabled(date);
  }
  _init() {
    super._init();
    this._initSelectionStrategy();
    this._correctZoomLevel();
    this._initCurrentDate();
    this._initActions();
  }
  _initSelectionStrategy() {
    const strategyName = this._getSelectionStrategyName();
    const strategy = SELECTION_STRATEGIES[strategyName];
    if (!this._selectionStrategy || this._selectionStrategy.NAME !== strategyName) {
      this._selectionStrategy = new strategy(this);
    }
  }
  _refreshSelectionStrategy() {
    this._initSelectionStrategy();
    this._selectionStrategy.restoreValue();
    this._refresh();
  }
  _getSelectionStrategyName() {
    const {
      selectionMode
    } = this.option();
    switch (selectionMode) {
      case "multiple":
        return "MultipleSelection";
      case "range":
        return "RangeSelection";
      default:
        return "SingleSelection";
    }
  }
  _correctZoomLevel() {
    const {
      minZoomLevel = ZOOM_LEVEL.CENTURY,
      maxZoomLevel = ZOOM_LEVEL.MONTH,
      zoomLevel = ZOOM_LEVEL.MONTH
    } = this.option();
    if (LEVEL_COMPARE_MAP[maxZoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      return;
    }
    if (LEVEL_COMPARE_MAP[zoomLevel] > LEVEL_COMPARE_MAP[maxZoomLevel]) {
      this.option("zoomLevel", maxZoomLevel);
      return;
    }
    if (LEVEL_COMPARE_MAP[zoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      this.option("zoomLevel", minZoomLevel);
    }
  }
  _initCurrentDate() {
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    const defaultCurrentDate = this._selectionStrategy.getDefaultCurrentDate();
    const date = (defaultCurrentDate ? this._getNormalizedDate(defaultCurrentDate) : null) ?? this._getNormalizedDate(currentDate);
    this.option("currentDate", date);
  }
  _getNormalizedDate(date) {
    const normalizedDate = date_default.normalizeDate(date, this._getMinDate(), this._getMaxDate());
    return isDefined(normalizedDate) ? this._getDate(normalizedDate) : date;
  }
  _initActions() {
    this._cellClickAction = this._createActionByOption("onCellClick");
    this._onContouredChanged = this._createActionByOption("onContouredChanged");
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      cell: new FunctionTemplate(((options) => {
        const data2 = options.model;
        renderer_default(options.container).append(renderer_default("<span>").text((null === data2 || void 0 === data2 ? void 0 : data2.text) || String(data2)));
      }))
    });
    super._initTemplates();
  }
  _updateCurrentDate(date) {
    if (fx_default.isAnimating(this._$viewsWrapper.get(0))) {
      fx_default.stop(this._$viewsWrapper.get(0), true);
    }
    const min = this._getMinDate();
    const max = this._getMaxDate();
    if (min > max) {
      this.option("currentDate", /* @__PURE__ */ new Date());
      return;
    }
    const normalizedDate = this._getNormalizedDate(date);
    if (date.getTime() !== normalizedDate.getTime()) {
      this.option("currentDate", new Date(normalizedDate));
      return;
    }
    const {
      date: viewDate
    } = this._view.option();
    let offset = this._getViewsOffset(viewDate, normalizedDate);
    if (0 !== offset && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
      offset = 0;
    }
    if (this._view && 0 !== offset && !this._suppressNavigation) {
      if (this._additionalView) {
        if (offset > 2 || offset < -1) {
          this._refreshViews();
          this._setViewContoured(normalizedDate);
          this._updateAriaId(normalizedDate);
          this._renderNavigator();
        } else if (1 === offset && this._skipNavigate) {
          this._setViewContoured(normalizedDate);
          this._updateAriaId(normalizedDate);
        } else {
          this._navigate(offset, normalizedDate);
        }
      } else {
        this._navigate(offset, normalizedDate);
      }
    } else {
      this._renderNavigator();
      this._setViewContoured(normalizedDate);
      this._updateAriaId(normalizedDate);
    }
    this._skipNavigate = false;
  }
  _isAdditionalViewDate() {
    let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
    if (!this._additionalView) {
      return false;
    }
    return date >= this._additionalView._getFirstAvailableDate();
  }
  _getActiveView(date) {
    return this._isAdditionalViewDate(date) ? this._additionalView : this._view;
  }
  _setViewContoured(date) {
    if (this.option("skipFocusCheck") || renderer_default(this._$viewsWrapper).is(":focus")) {
      var _this$_additionalView;
      this._view.option("contouredDate", null);
      null === (_this$_additionalView = this._additionalView) || void 0 === _this$_additionalView || _this$_additionalView.option("contouredDate", null);
      const view = this._isAdditionalViewDate(date) ? this._additionalView : this._view;
      view.option("contouredDate", date);
    }
  }
  _getMinDate() {
    const {
      rangeMin
    } = this.option();
    if (rangeMin) {
      return rangeMin;
    }
    if (this.min) {
      return this.min;
    }
    this.min = this._getDateOption("min") ?? new Date(1e3, 0);
    return this.min;
  }
  _getMaxDate() {
    const {
      rangeMax
    } = this.option();
    if (rangeMax) {
      return rangeMax;
    }
    if (this.max) {
      return this.max;
    }
    this.max = this._getDateOption("max") ?? new Date(3e3, 0);
    return this.max;
  }
  _getViewsOffset(startDate, endDate) {
    const {
      zoomLevel
    } = this.option();
    if (zoomLevel === ZOOM_LEVEL.MONTH) {
      return this._getMonthsOffset(startDate, endDate);
    }
    let zoomCorrection = 1;
    switch (zoomLevel) {
      case ZOOM_LEVEL.CENTURY:
        zoomCorrection = 100;
        break;
      case ZOOM_LEVEL.DECADE:
        zoomCorrection = 10;
        break;
      default:
        zoomCorrection = 1;
    }
    return Math.floor(endDate.getFullYear() / zoomCorrection) - Math.floor(startDate.getFullYear() / zoomCorrection);
  }
  _getMonthsOffset(startDate, endDate) {
    const yearOffset = endDate.getFullYear() - startDate.getFullYear();
    const monthOffset = endDate.getMonth() - startDate.getMonth();
    return 12 * yearOffset + monthOffset;
  }
  _waitRenderView(offset) {
    if (this._alreadyViewRender) {
      return;
    }
    this._alreadyViewRender = true;
    const date = this._getDateByOffset(offset * this._getRtlCorrection());
    this._moveToClosestAvailableDate(date);
    this._waitRenderViewTimeout = setTimeout((() => {
      this._alreadyViewRender = false;
    }));
  }
  _getRtlCorrection() {
    const {
      rtlEnabled
    } = this.option();
    return rtlEnabled ? -1 : 1;
  }
  _getDateByOffset(offset, initialDate) {
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    const date = this._getDate(initialDate ?? currentDate);
    const currentDay = date.getDate();
    const difference = date_default.getDifferenceInMonth(this.option("zoomLevel")) * offset;
    date.setDate(1);
    date.setMonth(date.getMonth() + difference);
    const lastDay = date_default.getLastMonthDate(date).getDate();
    date.setDate(currentDay > lastDay ? lastDay : currentDay);
    return date;
  }
  _focusTarget() {
    return this._$viewsWrapper;
  }
  _focusEventTarget() {
    return this.$element();
  }
  _initMarkup() {
    this._renderSubmitElement();
    const $element = this.$element();
    $element.addClass("dx-calendar");
    const {
      selectionMode
    } = this.option();
    $element.toggleClass("dx-calendar-range", "range" === selectionMode);
    this._renderBody();
    $element.append(this.$body);
    this._renderViews();
    this._renderNavigator();
    super._initMarkup();
    this._renderEvents();
    $element.prepend(this._navigator.$element());
    this._renderSwipeable();
    this._renderFooter();
    this._selectionStrategy.updateAriaSelected();
    this._updateAriaId();
    this._updateNavigatorLabels();
    this.setAria("role", "application");
    this._updateAriaLabelAndRole();
    this._moveToClosestAvailableDate();
  }
  _render() {
    super._render();
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    this._setViewContoured(currentDate);
  }
  _renderBody() {
    if (!this._$viewsWrapper) {
      this.$body = renderer_default("<div>").addClass("dx-calendar-body");
      this._$viewsWrapper = renderer_default("<div>").addClass("dx-calendar-views-wrapper");
      this.$body.append(this._$viewsWrapper);
    }
  }
  _updateAriaLabelAndRole() {
    const readOnly = this.option("readOnly");
    const $element = this.$element();
    const aria = {
      role: readOnly ? "group" : void 0,
      label: readOnly ? message_default.format("dxCalendar-readOnlyLabel") : void 0
    };
    this.setAria(aria, $element);
  }
  _setAriaReadonly() {
  }
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat([this._view]);
  }
  _renderViews() {
    const {
      zoomLevel
    } = this.option();
    this.$element().addClass(`dx-calendar-view-${zoomLevel}`);
    const {
      currentDate = /* @__PURE__ */ new Date(),
      viewsCount
    } = this.option();
    this.$element().toggleClass("dx-calendar-multiview", viewsCount > 1);
    this._view = this._renderSpecificView(currentDate);
    if (hasWindow()) {
      const beforeDate = this._getDateByOffset(-1, currentDate);
      this._beforeView = this._isViewAvailable(beforeDate) ? this._renderSpecificView(beforeDate) : null;
      const afterDate = this._getDateByOffset(viewsCount, currentDate);
      afterDate.setDate(1);
      this._afterView = this._isViewAvailable(afterDate) ? this._renderSpecificView(afterDate) : null;
    }
    if (viewsCount > 1) {
      this._additionalView = this._renderSpecificView(this._getDateByOffset(1, currentDate));
    }
    this._translateViews();
  }
  _renderSpecificView(date) {
    const {
      zoomLevel = ZOOM_LEVEL.MONTH
    } = this.option();
    const specificView = calendar_views_default[zoomLevel];
    const $view = renderer_default("<div>").appendTo(this._$viewsWrapper);
    const config = this._viewConfig(date);
    const view = this._createComponent($view, specificView, config);
    return view;
  }
  _viewConfig(date) {
    const {
      firstDayOfWeek = date_default3.firstDayOfWeekIndex(),
      showWeekNumbers = false,
      selectWeekOnClick,
      weekNumberRule,
      zoomLevel = ZOOM_LEVEL.MONTH,
      focusStateEnabled,
      hoverStateEnabled,
      disabledDates: disabledDatesOption,
      _todayDate: todayDate
    } = this.option();
    const disabledDates = isFunction(disabledDatesOption) ? this._injectComponent(disabledDatesOption.bind(this)) : disabledDatesOption;
    return _extends({}, this._selectionStrategy.getViewOptions(), {
      date,
      min: this._getMinDate(),
      max: this._getMaxDate(),
      firstDayOfWeek,
      showWeekNumbers,
      selectWeekOnClick,
      weekNumberRule,
      zoomLevel,
      tabIndex: void 0,
      focusStateEnabled,
      hoverStateEnabled,
      disabledDates,
      onCellClick: this._cellClickHandler.bind(this),
      cellTemplate: this._getTemplateByOption("cellTemplate"),
      allowValueSelection: this._isMaxZoomLevel(),
      _todayDate: todayDate
    });
  }
  _renderEvents() {
    m_events_engine_default.off(this._$viewsWrapper, CALENDAR_DXHOVEREND_EVENT_NAME);
    const {
      selectionMode
    } = this.option();
    if ("range" === selectionMode) {
      m_events_engine_default.on(this._$viewsWrapper, CALENDAR_DXHOVEREND_EVENT_NAME, null, (() => {
        this._updateViewsOption("hoveredRange", []);
      }));
    }
  }
  _injectComponent(func) {
    return (params) => func(_extends({}, params, {
      component: this
    }));
  }
  _isViewAvailable(date) {
    const {
      zoomLevel
    } = this.option();
    const min = date_default.getViewMinBoundaryDate(zoomLevel, this._getMinDate());
    const max = date_default.getViewMaxBoundaryDate(zoomLevel, this._getMaxDate());
    return date_default.dateInRange(date, min, max);
  }
  _translateViews() {
    const {
      viewsCount
    } = this.option();
    move(this._view.$element(), {
      left: 0,
      top: 0
    });
    this._moveViewElement(this._beforeView, -1);
    this._moveViewElement(this._afterView, viewsCount);
    this._moveViewElement(this._additionalView, 1);
  }
  _moveViewElement(view, coefficient) {
    if (view) {
      move(view.$element(), {
        left: this._getViewPosition(coefficient),
        top: 0
      });
    }
  }
  _getViewPosition(coefficient) {
    const rtlCorrection = this.option("rtlEnabled") ? -1 : 1;
    return 100 * coefficient * rtlCorrection + "%";
  }
  _cellClickHandler(e) {
    const zoomLevel = this.option("zoomLevel");
    const nextView = date_default.getViewDown(zoomLevel);
    const isMaxZoomLevel = this._isMaxZoomLevel();
    if (nextView && !isMaxZoomLevel) {
      this._navigateDown(e.event.currentTarget);
    } else {
      var _this$_cellClickActio;
      const newValue = this._updateTimeComponent(e.value);
      this._selectionStrategy.selectValue(newValue, e.event);
      null === (_this$_cellClickActio = this._cellClickAction) || void 0 === _this$_cellClickActio || _this$_cellClickActio.call(this, e);
    }
  }
  _updateTimeComponent(date) {
    const result = new Date(date);
    const currentValue = this._getDateOption("value");
    if (currentValue && !this._isArrayValue("value", currentValue)) {
      result.setHours(currentValue.getHours());
      result.setMinutes(currentValue.getMinutes());
      result.setSeconds(currentValue.getSeconds());
      result.setMilliseconds(currentValue.getMilliseconds());
    }
    return result;
  }
  _isMaxZoomLevel() {
    const {
      zoomLevel = ZOOM_LEVEL.MONTH,
      maxZoomLevel
    } = this.option();
    return zoomLevel === maxZoomLevel;
  }
  _navigateDown(cell) {
    const {
      zoomLevel,
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    if (this._isMaxZoomLevel()) {
      return;
    }
    const nextView = date_default.getViewDown(zoomLevel);
    if (!nextView) {
      return;
    }
    const {
      contouredDate,
      date
    } = this._view.option();
    let newCurrentDate = contouredDate ?? date;
    if (cell) {
      newCurrentDate = renderer_default(cell).data("dxDateValueKey");
    }
    this._isOtherViewCellClicked = true;
    this.option("currentDate", newCurrentDate);
    this.option("zoomLevel", nextView);
    this._isOtherViewCellClicked = false;
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(currentDate));
  }
  _renderNavigator() {
    if (!this._navigator) {
      this._navigator = this._createComponent(renderer_default("<div>"), calendar_navigator_default, this._navigatorConfig());
    }
    this._navigator.option("text", this._getViewsCaption(this._view, this._additionalView));
    this._updateButtonsVisibility();
  }
  _navigatorConfig() {
    const {
      focusStateEnabled,
      rtlEnabled
    } = this.option();
    return {
      text: this._getViewsCaption(this._view, this._additionalView),
      onClick: this._navigatorClickHandler.bind(this),
      onCaptionClick: this._navigateUp.bind(this),
      focusStateEnabled,
      rtlEnabled,
      tabIndex: void 0
    };
  }
  _navigatorClickHandler(e) {
    const {
      currentDate,
      viewsCount
    } = this.option();
    let offset = e.direction;
    if (viewsCount > 1) {
      const additionalViewActive = this._isAdditionalViewDate(currentDate);
      const shouldDoubleOffset = additionalViewActive && offset < 0 || !additionalViewActive && offset > 0;
      if (shouldDoubleOffset) {
        offset *= 2;
      }
    }
    const newCurrentDate = this._getDateByOffset(offset, currentDate);
    this._moveToClosestAvailableDate(newCurrentDate);
  }
  _navigateUp() {
    const {
      zoomLevel = ZOOM_LEVEL.MONTH,
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    const nextView = date_default.getViewUp(zoomLevel);
    if (!nextView || this._isMinZoomLevel(zoomLevel)) {
      return;
    }
    this.option("zoomLevel", nextView);
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(currentDate));
  }
  _isMinZoomLevel(zoomLevel) {
    const min = this._getMinDate();
    const max = this._getMaxDate();
    const {
      minZoomLevel
    } = this.option();
    return !!date_default.sameView(zoomLevel, min, max) || minZoomLevel === zoomLevel;
  }
  _updateButtonsVisibility() {
    this._navigator.toggleButton("next", !isDefined(this._afterView));
    this._navigator.toggleButton("prev", !isDefined(this._beforeView));
  }
  _renderSwipeable() {
    if (!this._swipeable) {
      this._swipeable = this._createComponent(this.$element(), m_swipeable_default, {
        onStart: (e) => {
          this._swipeStartHandler(e.event);
        },
        onUpdated: (e) => {
          this._swipeUpdateHandler(e.event);
        },
        onEnd: (e) => {
          this._swipeEndHandler(e.event);
        },
        itemSizeFunc: this._viewWidth.bind(this)
      });
    }
  }
  _swipeStartHandler(event) {
    fx_default.stop(this._$viewsWrapper.get(0), true);
    const {
      viewsCount
    } = this.option();
    this._toggleGestureCoverCursor("grabbing");
    event.maxLeftOffset = this._getRequiredView("next") ? 1 / viewsCount : 0;
    event.maxRightOffset = this._getRequiredView("prev") ? 1 / viewsCount : 0;
  }
  _toggleGestureCoverCursor(cursor) {
    renderer_default(".dx-gesture-cover").css("cursor", cursor);
  }
  _getRequiredView(name) {
    const {
      rtlEnabled
    } = this.option();
    if ("prev" === name) {
      return rtlEnabled ? this._afterView : this._beforeView;
    }
    return rtlEnabled ? this._beforeView : this._afterView;
  }
  _swipeUpdateHandler(event) {
    const {
      offset
    } = event;
    move(this._$viewsWrapper, {
      left: offset * this._viewWidth(),
      top: 0
    });
    this._updateNavigatorCaption(offset);
  }
  _swipeEndHandler(event) {
    this._toggleGestureCoverCursor("auto");
    const {
      currentDate,
      rtlEnabled
    } = this.option();
    const {
      targetOffset
    } = event;
    const moveOffset = !targetOffset ? 0 : targetOffset / Math.abs(targetOffset);
    const isAdditionalViewActive = this._isAdditionalViewDate(currentDate);
    const shouldDoubleOffset = isAdditionalViewActive && (rtlEnabled ? -1 === moveOffset : 1 === moveOffset);
    if (0 === moveOffset) {
      this._animateWrapper(0, 250);
      return;
    }
    const offset = -moveOffset * this._getRtlCorrection() * (shouldDoubleOffset ? 2 : 1);
    let date = this._getDateByOffset(offset);
    if (this._isDateInInvalidRange(date)) {
      if (moveOffset >= 0) {
        date = new Date(this._getMinDate());
      } else {
        date = new Date(this._getMaxDate());
      }
    }
    this.option("currentDate", date);
  }
  _viewWidth() {
    if (!this._viewWidthValue) {
      const {
        viewsCount
      } = this.option();
      this._viewWidthValue = getWidth(this.$element()) / viewsCount;
    }
    return this._viewWidthValue;
  }
  _updateNavigatorCaption(initialOffset) {
    const offset = initialOffset * this._getRtlCorrection();
    const {
      viewsCount
    } = this.option();
    const isMultiView = viewsCount > 1;
    let view = null;
    let additionalView = null;
    if (offset > 0.5 && this._beforeView) {
      view = this._beforeView;
      if (isMultiView) {
        additionalView = this._view;
      }
    } else if (offset < -0.5 && this._afterView) {
      view = isMultiView ? this._additionalView : this._afterView;
      additionalView = isMultiView ? this._afterView : null;
    } else {
      view = this._view;
      additionalView = isMultiView ? this._additionalView : null;
    }
    this._navigator.option("text", this._getViewsCaption(view, additionalView));
  }
  _getViewsCaption(view, additionalView) {
    let caption = view.getNavigatorCaption();
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1 && additionalView) {
      const additionalViewCaption = additionalView.getNavigatorCaption();
      caption = `${caption} - ${additionalViewCaption}`;
    }
    return caption;
  }
  _isDateInInvalidRange(date) {
    if (this._view.isBoundary(date)) {
      return false;
    }
    const min = this._getMinDate();
    const max = this._getMaxDate();
    const normalizedDate = date_default.normalizeDate(date, min, max);
    return normalizedDate === min || normalizedDate === max;
  }
  _renderFooter() {
    const {
      showTodayButton,
      todayButtonText: text
    } = this.option();
    if (showTodayButton) {
      const $todayButton = this._createComponent(renderer_default("<div>"), Button, {
        focusStateEnabled: this.option("focusStateEnabled"),
        text,
        onClick: (args) => {
          this._toTodayView(args);
        },
        type: isFluent(current()) ? "normal" : "default",
        stylingMode: isFluent(current()) ? "outlined" : "text",
        integrationOptions: {}
      }).$element().addClass("dx-calendar-today-button");
      this._$footer = renderer_default("<div>").addClass("dx-calendar-footer").append($todayButton);
      this.$element().append(this._$footer);
    }
    this.$element().toggleClass("dx-calendar-with-footer", showTodayButton);
  }
  _renderSubmitElement() {
    this._$submitElement = renderer_default("<input>").attr("type", "hidden").appendTo(this.$element());
    const {
      value
    } = this.option();
    this._setSubmitValue(value);
  }
  _setSubmitValue(value) {
    if (this._isArrayValue("value", value)) {
      return;
    }
    const dateValue = this._convertToDate(value);
    this._getSubmitElement().val(date_serialization_default.serializeDate(dateValue, "yyyy-MM-dd"));
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _animateShowView() {
    fx_default.stop(this._view.$element().get(0), true);
    this._popAnimationView(this._view, 0.6, 1, 250);
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1) {
      fx_default.stop(this._additionalView.$element().get(0), true);
      this._popAnimationView(this._additionalView, 0.6, 1, 250);
    }
  }
  _popAnimationView(view, from, to, duration) {
    return fx_default.animate(view.$element().get(0), {
      type: "pop",
      from: {
        scale: from,
        opacity: from
      },
      to: {
        scale: to,
        opacity: to
      },
      duration
    });
  }
  _navigate(offset, value) {
    if (0 !== offset && 1 !== Math.abs(offset) && this._isViewAvailable(value)) {
      const newView = this._renderSpecificView(value);
      if (offset > 0) {
        var _this$_afterView;
        null === (_this$_afterView = this._afterView) || void 0 === _this$_afterView || _this$_afterView.$element().remove();
        this._afterView = newView;
      } else {
        var _this$_beforeView;
        null === (_this$_beforeView = this._beforeView) || void 0 === _this$_beforeView || _this$_beforeView.$element().remove();
        this._beforeView = newView;
      }
      this._translateViews();
    }
    const rtlCorrection = this._getRtlCorrection();
    const offsetSign = sign(offset);
    const endPosition = -rtlCorrection * offsetSign * this._viewWidth();
    const viewsWrapperPosition = this._$viewsWrapper.position().left;
    if (viewsWrapperPosition !== endPosition) {
      if (this._preventViewChangeAnimation) {
        this._wrapperAnimationEndHandler(offset, value);
      } else {
        this._animateWrapper(endPosition, 250).done(this._wrapperAnimationEndHandler.bind(this, offset, value));
      }
    }
  }
  _animateWrapper(to, duration) {
    return fx_default.animate(this._$viewsWrapper.get(0), {
      type: "slide",
      from: {
        left: this._$viewsWrapper.position().left
      },
      to: {
        left: to
      },
      duration
    });
  }
  _getDate(value) {
    return new Date(value);
  }
  _toTodayView(args) {
    const today = /* @__PURE__ */ new Date();
    if (this._isMaxZoomLevel()) {
      this._selectionStrategy.selectValue(today, args.event);
      return;
    }
    this._preventViewChangeAnimation = true;
    this.option("zoomLevel", this.option("maxZoomLevel"));
    this._selectionStrategy.selectValue(today, args.event);
    this._animateShowView();
    this._preventViewChangeAnimation = false;
  }
  _wrapperAnimationEndHandler(offset, newDate) {
    this._rearrangeViews(offset);
    this._translateViews();
    this._resetLocation();
    this._renderNavigator();
    this._setViewContoured(newDate);
    this._updateAriaId(newDate);
    this._selectionStrategy.updateAriaSelected();
  }
  _rearrangeViews(offset) {
    var _this$viewToRemoveKey;
    if (0 === offset) {
      return;
    }
    const {
      viewsCount
    } = this.option();
    let viewOffset = -1;
    let viewToCreateKey = "_afterView";
    let viewToRemoveKey = "_beforeView";
    let viewBeforeCreateKey = 1 === viewsCount ? "_view" : "_additionalView";
    let viewAfterRemoveKey = "_view";
    if (offset < 0) {
      viewOffset = 1;
      viewToCreateKey = "_beforeView";
      viewToRemoveKey = "_afterView";
      viewBeforeCreateKey = "_view";
      viewAfterRemoveKey = 1 === viewsCount ? "_view" : "_additionalView";
    }
    if (!this[viewToCreateKey]) {
      return;
    }
    const destinationDate = this[viewToCreateKey].option("date");
    null === (_this$viewToRemoveKey = this[viewToRemoveKey]) || void 0 === _this$viewToRemoveKey || _this$viewToRemoveKey.$element().remove();
    this[viewToRemoveKey] = this._renderSpecificView(this._getDateByOffset(viewOffset * viewsCount, destinationDate));
    this[viewAfterRemoveKey].$element().remove();
    if (1 === viewsCount) {
      this[viewAfterRemoveKey] = this[viewToCreateKey];
    } else {
      this[viewAfterRemoveKey] = this[viewBeforeCreateKey];
      this[viewBeforeCreateKey] = this[viewToCreateKey];
    }
    const dateByOffset = this._getDateByOffset(-viewOffset, destinationDate);
    this[viewToCreateKey] = this._isViewAvailable(dateByOffset) ? this._renderSpecificView(dateByOffset) : null;
  }
  _resetLocation() {
    move(this._$viewsWrapper, {
      left: 0,
      top: 0
    });
  }
  _clean() {
    super._clean();
    this._clearViewWidthCache();
    delete this._$viewsWrapper;
    delete this._navigator;
    delete this._$footer;
  }
  _clearViewWidthCache() {
    delete this._viewWidthValue;
  }
  _disposeViews() {
    var _this$_beforeView2, _this$_additionalView2, _this$_afterView2;
    this._view.$element().remove();
    null === (_this$_beforeView2 = this._beforeView) || void 0 === _this$_beforeView2 || _this$_beforeView2.$element().remove();
    null === (_this$_additionalView2 = this._additionalView) || void 0 === _this$_additionalView2 || _this$_additionalView2.$element().remove();
    null === (_this$_afterView2 = this._afterView) || void 0 === _this$_afterView2 || _this$_afterView2.$element().remove();
    delete this._view;
    delete this._additionalView;
    delete this._beforeView;
    delete this._afterView;
    delete this._skipNavigate;
  }
  _dispose() {
    clearTimeout(this._waitRenderViewTimeout);
    super._dispose();
  }
  _refreshViews() {
    this._resetActiveState();
    this._disposeViews();
    this._renderViews();
  }
  _visibilityChanged() {
    this._translateViews();
  }
  _shouldSkipFocusEvent(event) {
    const {
      target,
      relatedTarget
    } = event;
    return Boolean(renderer_default(target).parents(".dx-calendar").length) && Boolean(renderer_default(relatedTarget).parents(".dx-calendar").length);
  }
  _focusInHandler(event) {
    if (renderer_default(event.target).is(this._$viewsWrapper)) {
      const {
        currentDate = /* @__PURE__ */ new Date()
      } = this.option();
      this._setViewContoured(currentDate);
    }
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    super._focusInHandler.apply(this, [event]);
    this._toggleFocusClass(true, this.$element());
  }
  _focusOutHandler(event) {
    if (renderer_default(event.target).is(this._$viewsWrapper)) {
      var _this$_additionalView3;
      this._view.option("contouredDate", null);
      null === (_this$_additionalView3 = this._additionalView) || void 0 === _this$_additionalView3 || _this$_additionalView3.option("contouredDate", null);
    }
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    super._focusOutHandler.apply(this, [event]);
    this._toggleFocusClass(false, this.$element());
  }
  _updateViewsOption(optionName, newValue) {
    var _this$_additionalView4, _this$_beforeView3, _this$_afterView3;
    this._view.option(optionName, newValue);
    null === (_this$_additionalView4 = this._additionalView) || void 0 === _this$_additionalView4 || _this$_additionalView4.option(optionName, newValue);
    null === (_this$_beforeView3 = this._beforeView) || void 0 === _this$_beforeView3 || _this$_beforeView3.option(optionName, newValue);
    null === (_this$_afterView3 = this._afterView) || void 0 === _this$_afterView3 || _this$_afterView3.option(optionName, newValue);
  }
  _setViewsMinOption(min) {
    this._restoreViewsMinMaxOptions();
    this.option("rangeMin", this._convertToDate(min));
    this._updateViewsOption("min", this._getMinDate());
  }
  _setViewsMaxOption(max) {
    this._restoreViewsMinMaxOptions();
    this.option("rangeMax", this._convertToDate(max));
    this._updateViewsOption("max", this._getMaxDate());
  }
  _restoreViewsMinMaxOptions() {
    this._resetActiveState();
    this.option({
      rangeMin: null,
      rangeMax: null
    });
    this._updateViewsOption("min", this._getMinDate());
    this._updateViewsOption("max", this._getMaxDate());
  }
  _updateNavigatorLabels() {
    const {
      zoomLevel = ZOOM_LEVEL.MONTH
    } = this.option();
    const capitalizedZoomLevel = zoomLevel.charAt(0).toUpperCase() + zoomLevel.slice(1);
    const captionButtonText = this._navigator._caption.option("text");
    const localizedPrevButtonLabel = message_default.format(`dxCalendar-previous${capitalizedZoomLevel}ButtonLabel`);
    const localizedCaptionLabel = message_default.format(`dxCalendar-caption${capitalizedZoomLevel}Label`);
    const localizedNextButtonLabel = message_default.format(`dxCalendar-next${capitalizedZoomLevel}ButtonLabel`);
    this.setAria("label", localizedPrevButtonLabel, this._navigator._prevButton.$element());
    this.setAria("label", `${captionButtonText}. ${localizedCaptionLabel}`, this._navigator._caption.$element());
    this.setAria("label", localizedNextButtonLabel, this._navigator._nextButton.$element());
  }
  _updateAriaSelected(value, previousValue) {
    null === previousValue || void 0 === previousValue || previousValue.forEach(((item) => {
      if (!item) {
        return;
      }
      this.setAria("selected", false, this._view._getCellByDate(item));
    }));
    null === value || void 0 === value || value.forEach(((item) => {
      if (!item) {
        return;
      }
      this.setAria("selected", true, this._view._getCellByDate(item));
    }));
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1) {
      null === previousValue || void 0 === previousValue || previousValue.forEach(((item) => {
        if (!item) {
          return;
        }
        this.setAria("selected", false, this._additionalView._getCellByDate(item));
      }));
      null === value || void 0 === value || value.forEach(((item) => {
        if (!item) {
          return;
        }
        this.setAria("selected", true, this._additionalView._getCellByDate(item));
      }));
    }
  }
  _updateAriaId(value) {
    var _this$_onContouredCha;
    const {
      currentDate = /* @__PURE__ */ new Date()
    } = this.option();
    const date = value ?? currentDate;
    const ariaId = `dx-${new guid_default()}`;
    const view = this._getActiveView(date);
    const $newCell = view._getCellByDate(date);
    this.setAria("id", ariaId, $newCell);
    this.setAria("activedescendant", ariaId);
    null === (_this$_onContouredCha = this._onContouredChanged) || void 0 === _this$_onContouredCha || _this$_onContouredCha.call(this, ariaId);
  }
  _suppressingNavigation(callback, args) {
    this._suppressNavigation = true;
    callback.apply(this, args);
    delete this._suppressNavigation;
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "width":
        super._optionChanged(args);
        this._clearViewWidthCache();
        break;
      case "min":
      case "max": {
        this.min = void 0;
        this.max = void 0;
        const {
          currentDate = /* @__PURE__ */ new Date()
        } = this.option();
        this._suppressingNavigation(this._updateCurrentDate, [currentDate]);
        this._refreshViews();
        this._renderNavigator();
        break;
      }
      case "selectionMode":
        this._refreshSelectionStrategy();
        this._initCurrentDate();
        break;
      case "selectWeekOnClick":
      case "_todayDate":
      case "showWeekNumbers":
      case "weekNumberRule":
        this._refreshViews();
        break;
      case "firstDayOfWeek":
        this._refreshViews();
        this._updateButtonsVisibility();
        break;
      case "focusStateEnabled":
      case "disabledDates":
      case "dateSerializationFormat":
      case "cellTemplate":
      case "showTodayButton":
      case "todayButtonText":
        this._invalidate();
        break;
      case "currentDate":
        this.setAria("id", void 0, this._view._getCellByDate(previousValue));
        this._updateCurrentDate(value);
        break;
      case "zoomLevel":
        this.$element().removeClass(`dx-calendar-view-${previousValue}`);
        this._correctZoomLevel();
        this._refreshViews();
        this._renderNavigator();
        this._updateAriaId();
        this._updateNavigatorLabels();
        break;
      case "minZoomLevel":
      case "maxZoomLevel":
        this._correctZoomLevel();
        this._updateButtonsVisibility();
        break;
      case "value": {
        const isSameValue = date_default.sameDatesArrays(value, previousValue);
        if (!isSameValue) {
          this._selectionStrategy.processValueChanged(value, previousValue);
        }
        this._setSubmitValue(value);
        super._optionChanged(args);
        break;
      }
      case "viewsCount":
        this._refreshViews();
        this._renderNavigator();
        break;
      case "onCellClick":
        this._view.option("onCellClick", value);
        break;
      case "onContouredChanged":
        this._onContouredChanged = this._createActionByOption("onContouredChanged");
        break;
      case "readOnly":
        super._optionChanged(args);
        this._updateAriaLabelAndRole();
        break;
      case "skipFocusCheck":
        break;
      default:
        super._optionChanged(args);
    }
  }
  getContouredDate() {
    const {
      contouredDate
    } = this._view.option();
    return contouredDate;
  }
};
component_registrator_default("dxCalendar", Calendar);
var calendar_default = Calendar;

// node_modules/devextreme/esm/ui/calendar.js
var calendar_default2 = calendar_default;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.js
var DateBoxStrategy = class extends class_default.inherit({}) {
  ctor(dateBox) {
    this.dateBox = dateBox;
  }
  widgetOption(option) {
    var _this$_widget;
    return null === (_this$_widget = this._widget) || void 0 === _this$_widget ? void 0 : _this$_widget.option.apply(this._widget, arguments);
  }
  _renderWidget(element) {
    element = element || renderer_default("<div>");
    this._widget = this._createWidget(element);
    this._widget.$element().appendTo(this._getWidgetContainer());
  }
  _createWidget(element) {
    const widgetName = this._getWidgetName();
    const widgetOptions = this._getWidgetOptions();
    return this.dateBox._createComponent(element, widgetName, widgetOptions);
  }
  _getWidgetOptions() {
    class_default.abstract();
  }
  _getWidgetName() {
    class_default.abstract();
  }
  getDefaultOptions() {
    return {
      mode: "text"
    };
  }
  getDisplayFormat(displayFormat) {
    class_default.abstract();
  }
  supportedKeys() {
  }
  getKeyboardListener() {
  }
  customizeButtons() {
  }
  getParsedText(text, format2) {
    const value = date_default3.parse(text, format2);
    return value || date_default3.parse(text);
  }
  renderInputMinMax() {
  }
  renderOpenedState() {
    this._updateValue();
  }
  popupConfig(popupConfig) {
    class_default.abstract();
  }
  _dimensionChanged() {
    var _this$_getPopup;
    null === (_this$_getPopup = this._getPopup()) || void 0 === _this$_getPopup || _this$_getPopup.repaint();
  }
  renderPopupContent() {
    const popup = this._getPopup();
    this._renderWidget();
    const $popupContent = popup.$content().parent();
    m_events_engine_default.off($popupContent, "mousedown");
    m_events_engine_default.on($popupContent, "mousedown", this._preventFocusOnPopup.bind(this));
  }
  _preventFocusOnPopup(e) {
    e.preventDefault();
  }
  _getWidgetContainer() {
    return this._getPopup().$content();
  }
  _getPopup() {
    return this.dateBox._popup;
  }
  popupShowingHandler() {
  }
  popupHiddenHandler() {
  }
  _updateValue(preventDefaultValue) {
    var _this$_widget2;
    null === (_this$_widget2 = this._widget) || void 0 === _this$_widget2 || _this$_widget2.option("value", this.dateBoxValue());
  }
  useCurrentDateByDefault() {
  }
  getDefaultDate() {
    return /* @__PURE__ */ new Date();
  }
  textChangedHandler() {
  }
  renderValue() {
    if (this.dateBox.option("opened")) {
      this._updateValue();
    }
  }
  getValue() {
    return this._widget.option("value");
  }
  isAdaptivityChanged() {
    return false;
  }
  dispose() {
    const popup = this._getPopup();
    if (popup) {
      popup.$content().empty();
    }
  }
  dateBoxValue(value, event) {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    }
    return this.dateBox.dateOption.apply(this.dateBox, ["value"]);
  }
};
var m_date_box_strategy_default = DateBoxStrategy;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.calendar.js
var CalendarStrategy = class extends m_date_box_strategy_default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = "Calendar";
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      todayButtonText: this.dateBox.option("todayButtonText") ?? message_default.format("dxCalendar-todayButtonText")
    });
  }
  supportedKeys() {
    const homeEndHandler = function(e) {
      if (this.option("opened")) {
        e.preventDefault();
        return true;
      }
      return false;
    };
    return {
      rightArrow() {
        if (this.option("opened")) {
          return true;
        }
      },
      leftArrow() {
        if (this.option("opened")) {
          return true;
        }
      },
      enter: (function(e) {
        if (this.dateBox.option("opened")) {
          e.preventDefault();
          if (this._widget.option("zoomLevel") === this._widget.option("maxZoomLevel")) {
            const viewValue = this._getContouredValue();
            const lastActionElement = this._lastActionElement;
            const shouldCloseDropDown = this._closeDropDownByEnter();
            if (shouldCloseDropDown && viewValue && "calendar" === lastActionElement) {
              this.dateBoxValue(viewValue, e);
            }
            shouldCloseDropDown && this.dateBox.close();
            this.dateBox._valueChangeEventHandler(e);
            return !shouldCloseDropDown;
          }
          return true;
        }
        this.dateBox._valueChangeEventHandler(e);
      }).bind(this),
      home: homeEndHandler,
      end: homeEndHandler
    };
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || "shortdate";
  }
  _closeDropDownByEnter() {
    return true;
  }
  _getWidgetName() {
    return calendar_default2;
  }
  _getContouredValue() {
    return this._widget._view.option("contouredDate");
  }
  getKeyboardListener() {
    return this._widget;
  }
  _getWidgetOptions() {
    const {
      disabledDates,
      min,
      max,
      todayButtonText
    } = this.dateBox.option();
    return extend(this.dateBox.option("calendarOptions"), {
      value: this.dateBoxValue() || null,
      selectionMode: "single",
      dateSerializationFormat: null,
      min,
      max,
      onValueChanged: this._valueChangedHandler.bind(this),
      onCellClick: this._cellClickHandler.bind(this),
      disabledDates: isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
      onContouredChanged: this._refreshActiveDescendant.bind(this),
      skipFocusCheck: true,
      todayButtonText
    });
  }
  _injectComponent(func) {
    const that = this;
    return function(params) {
      extend(params, {
        component: that.dateBox
      });
      return func(params);
    };
  }
  _refreshActiveDescendant(e) {
    this._lastActionElement = "calendar";
    this.dateBox.setAria("activedescendant", e.actionValue);
  }
  _getTodayButtonConfig() {
    const buttonsLocation = this.dateBox.option("buttonsLocation");
    const isButtonsLocationDefault = "default" === buttonsLocation;
    const position = isButtonsLocationDefault ? ["bottom", "center"] : splitPair(buttonsLocation);
    const stylingMode = isMaterial() ? "text" : "outlined";
    return {
      widget: "dxButton",
      toolbar: position[0],
      location: "after" === position[1] ? "before" : position[1],
      options: {
        onClick: (args) => {
          this._widget._toTodayView(args);
        },
        text: this.dateBox.option("todayButtonText"),
        elementAttr: {
          class: "dx-button-today"
        },
        stylingMode
      }
    };
  }
  _isCalendarVisible() {
    const {
      calendarOptions
    } = this.dateBox.option();
    return isEmptyObject(calendarOptions) || false !== calendarOptions.visible;
  }
  _getPopupToolbarItems(toolbarItems) {
    const useButtons = "useButtons" === this.dateBox.option("applyValueMode");
    const shouldRenderTodayButton = useButtons && this._isCalendarVisible();
    if (shouldRenderTodayButton) {
      const todayButton = this._getTodayButtonConfig();
      return [todayButton, ...toolbarItems];
    }
    return toolbarItems;
  }
  popupConfig(popupConfig) {
    return extend(true, popupConfig, {
      position: {
        collision: "flipfit flip"
      },
      width: "auto"
    });
  }
  _valueChangedHandler(e) {
    const {
      value
    } = e;
    const prevValue = e.previousValue;
    if (date_default.sameDate(value, prevValue) && date_default.sameHoursAndMinutes(value, prevValue)) {
      return;
    }
    if ("instantly" === this.dateBox.option("applyValueMode")) {
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
  _updateValue(preventDefaultValue) {
    if (!this._widget) {
      return;
    }
    this._widget.option("value", this.dateBoxValue());
  }
  textChangedHandler() {
    this._lastActionElement = "input";
    if (this.dateBox.option("opened") && this._widget) {
      this._updateValue(true);
    }
  }
  _cellClickHandler(e) {
    const {
      dateBox
    } = this;
    if ("instantly" === dateBox.option("applyValueMode")) {
      dateBox.option("opened", false);
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
};
var m_date_box_strategy_calendar_default = CalendarStrategy;

// node_modules/devextreme/esm/__internal/ui/box.js
var MINSIZE_MAP = {
  row: "minWidth",
  col: "minHeight"
};
var MAXSIZE_MAP = {
  row: "maxWidth",
  col: "maxHeight"
};
var FLEX_JUSTIFY_CONTENT_MAP = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around"
};
var FLEX_ALIGN_ITEMS_MAP = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch"
};
var FLEX_DIRECTION_MAP = {
  row: "row",
  col: "column"
};
var setFlexProp = (element, prop, value) => {
  const normalizedValue = normalizeStyleProp(prop, value);
  element.style[styleProp(prop)] = normalizedValue;
  if (!hasWindow()) {
    if ("" === normalizedValue || !isDefined(normalizedValue)) {
      return;
    }
    const cssName = dasherize(prop);
    const styleExpr = `${cssName}: ${normalizedValue};`;
    setStyle(element, styleExpr, false);
  }
};
var BoxItem = class extends item_default {
  _renderVisible(value, oldValue) {
    super._renderVisible(value);
    if (isDefined(oldValue)) {
      this._options.fireItemStateChangedAction({
        name: "visible",
        state: value,
        oldState: oldValue
      });
    }
  }
};
var LayoutStrategy = class {
  constructor($element, option) {
    this._$element = $element;
    this._option = option;
  }
  renderBox() {
    this._$element.css({
      display: `${stylePropPrefix("flexDirection")}flex`
    });
    const direction = this._option("direction") ?? "row";
    setFlexProp(this._$element.get(0), "flexDirection", FLEX_DIRECTION_MAP[direction]);
  }
  renderAlign() {
    this._$element.css({
      justifyContent: this._normalizedAlign()
    });
  }
  _normalizedAlign() {
    const align = this._option("align") ?? "start";
    return align in FLEX_JUSTIFY_CONTENT_MAP ? FLEX_JUSTIFY_CONTENT_MAP[align] : align;
  }
  renderCrossAlign() {
    this._$element.css({
      alignItems: this._normalizedCrossAlign()
    });
  }
  _normalizedCrossAlign() {
    const crossAlign = this._option("crossAlign") ?? "start";
    return crossAlign in FLEX_ALIGN_ITEMS_MAP ? FLEX_ALIGN_ITEMS_MAP[crossAlign] : crossAlign;
  }
  renderItems($items) {
    const flexPropPrefix = stylePropPrefix("flexDirection");
    const direction = this._option("direction") ?? "row";
    each($items, (function() {
      const $item = renderer_default(this);
      const item = $item.data("dxBoxItemData");
      $item.css({
        display: `${flexPropPrefix}flex`
      }).css(MAXSIZE_MAP[direction], item.maxSize ?? "none").css(MINSIZE_MAP[direction], item.minSize ?? "0");
      setFlexProp($item.get(0), "flexBasis", item.baseSize ?? 0);
      setFlexProp($item.get(0), "flexGrow", item.ratio ?? 0);
      setFlexProp($item.get(0), "flexShrink", isDefined(item.shrink) ? item.shrink : 1);
      $item.children().each(((index, element) => {
        renderer_default(element).css({
          width: "auto",
          height: "auto",
          display: `${stylePropPrefix("flexDirection")}flex`,
          flexBasis: 0
        });
        setFlexProp(element, "flexGrow", 1);
        setFlexProp(element, "flexDirection", renderer_default(element)[0].style.flexDirection ?? "column");
        return true;
      }));
    }));
  }
};
var Box = class _Box extends collection_widget_edit_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: "row",
      align: "start",
      crossAlign: "stretch",
      activeStateEnabled: false,
      focusStateEnabled: false
    });
  }
  _itemClass() {
    return "dx-box-item";
  }
  _itemDataKey() {
    return "dxBoxItemData";
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _init() {
    super._init();
    this.$element().addClass("dx-box-flex");
    this._initLayout();
    this._initializeRenderQueue();
  }
  _initLayout() {
    this._layout = new LayoutStrategy(this.$element(), ((name) => this.option(name)));
  }
  _initializeRenderQueue() {
    const {
      _queue: queue
    } = this.option();
    this._queue = queue ?? [];
  }
  _queueIsNotEmpty() {
    return this.option("_queue") ? false : !!this._queue.length;
  }
  _pushItemToQueue($item, config) {
    this._queue.push({
      $item,
      config
    });
  }
  _shiftItemFromQueue() {
    return this._queue.shift();
  }
  _initMarkup() {
    this.$element().addClass("dx-box");
    this._layout.renderBox();
    super._initMarkup();
    this._renderAlign();
    this._renderActions();
  }
  _renderActions() {
    this._onItemStateChanged = this._createActionByOption("onItemStateChanged");
  }
  _renderAlign() {
    this._layout.renderAlign();
    this._layout.renderCrossAlign();
  }
  _renderItems(items) {
    super._renderItems(items);
    this._processRenderQueue();
    this._layout.renderItems(this._itemElements());
  }
  _processRenderQueue() {
    if (this._queueIsNotEmpty()) {
      const item = this._shiftItemFromQueue();
      const {
        itemTemplate,
        itemHoldTimeout,
        onItemHold,
        onItemClick,
        onItemContextMenu,
        onItemRendered
      } = this.option();
      if (item) {
        this._createComponent(item.$item, _Box, _extends({
          itemTemplate,
          itemHoldTimeout,
          onItemHold,
          onItemClick,
          onItemContextMenu,
          onItemRendered,
          _queue: this._queue
        }, item.config));
      }
      this._processRenderQueue();
    }
  }
  _renderItemContent(args) {
    var _args$itemData;
    const $itemNode = null === (_args$itemData = args.itemData) || void 0 === _args$itemData ? void 0 : _args$itemData.node;
    if ($itemNode) {
      return this._renderItemContentByNode(args, $itemNode);
    }
    return super._renderItemContent(args);
  }
  _postprocessRenderItem(args) {
    var _args$itemData2;
    const boxConfig = null === (_args$itemData2 = args.itemData) || void 0 === _args$itemData2 ? void 0 : _args$itemData2.box;
    if (!boxConfig) {
      return;
    }
    this._pushItemToQueue(args.itemContent, boxConfig);
  }
  _createItemByTemplate(itemTemplate, args) {
    const {
      itemData
    } = args;
    if (itemData.box) {
      return itemTemplate.source ? itemTemplate.source() : renderer_default();
    }
    return super._createItemByTemplate(itemTemplate, args);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    if ("visible" === property) {
      this._onItemStateChanged({
        name: property,
        state: value,
        oldState: false !== prevValue
      });
    }
    super._itemOptionChanged(item, property, value, prevValue);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "_queue":
      case "direction":
        this._invalidate();
        break;
      case "align":
        this._layout.renderAlign();
        break;
      case "crossAlign":
        this._layout.renderCrossAlign();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemOptions() {
    const options = super._itemOptions();
    options.fireItemStateChangedAction = (e) => {
      this._onItemStateChanged(e);
    };
    return options;
  }
};
Box.ItemClass = BoxItem;
component_registrator_default("dxBox", Box);
var box_default = Box;

// node_modules/devextreme/esm/data_helper.js
var data_helper_default = DataHelperMixin;

// node_modules/devextreme/esm/__internal/ui/editor/m_data_expression.js
var DataExpressionMixin = extend({}, data_helper_default, {
  _dataExpressionDefaultOptions: () => ({
    items: [],
    dataSource: null,
    itemTemplate: "item",
    value: null,
    valueExpr: "this",
    displayExpr: void 0
  }),
  _initDataExpressions() {
    this._compileValueGetter();
    this._compileDisplayGetter();
    this._initDynamicTemplates();
    this._initDataSource();
    this._itemsToDataSource();
  },
  _itemsToDataSource() {
    if (!this.option("dataSource")) {
      this._dataSource = new data_source_default({
        store: new m_array_store_default(this.option("items")),
        pageSize: 0
      });
      this._initDataController();
    }
  },
  _compileDisplayGetter() {
    this._displayGetter = compileGetter(this._displayGetterExpr());
  },
  _displayGetterExpr() {
    return this.option("displayExpr");
  },
  _compileValueGetter() {
    this._valueGetter = compileGetter(this._valueGetterExpr());
  },
  _valueGetterExpr() {
    return this.option("valueExpr") || "this";
  },
  _loadValue(value) {
    const deferred = Deferred();
    value = this._unwrappedValue(value);
    if (!isDefined(value)) {
      return deferred.reject().promise();
    }
    this._loadSingle(this._valueGetterExpr(), value).done(((item) => {
      this._isValueEquals(this._valueGetter(item), value) ? deferred.resolve(item) : deferred.reject();
    })).fail((() => {
      deferred.reject();
    }));
    this._loadValueDeferred = deferred;
    return deferred.promise();
  },
  _rejectValueLoading() {
    var _this$_loadValueDefer;
    null === (_this$_loadValueDefer = this._loadValueDeferred) || void 0 === _this$_loadValueDefer || _this$_loadValueDefer.reject({
      shouldSkipCallback: true
    });
  },
  _getCurrentValue() {
    return this.option("value");
  },
  _unwrappedValue(value) {
    value = value ?? this._getCurrentValue();
    if (value && this._dataSource && "this" === this._valueGetterExpr()) {
      value = this._getItemKey(value);
    }
    return variable_wrapper_default.unwrap(value);
  },
  _getItemKey(value) {
    const key = this._dataSource.key();
    if (Array.isArray(key)) {
      const result = {};
      for (let i = 0, n = key.length; i < n; i++) {
        result[key[i]] = value[key[i]];
      }
      return result;
    }
    if (key && "object" === typeof value) {
      value = value[key];
    }
    return value;
  },
  _isValueEquals(value1, value2) {
    const dataSourceKey = this._dataSource && this._dataSource.key();
    let result = this._compareValues(value1, value2);
    if (!result && dataSourceKey && isDefined(value1) && isDefined(value2)) {
      if (Array.isArray(dataSourceKey)) {
        result = this._compareByCompositeKey(value1, value2, dataSourceKey);
      } else {
        result = this._compareByKey(value1, value2, dataSourceKey);
      }
    }
    return result;
  },
  _compareByCompositeKey(value1, value2, key) {
    const isObject2 = isObject;
    if (!isObject2(value1) || !isObject2(value2)) {
      return false;
    }
    for (let i = 0, n = key.length; i < n; i++) {
      if (value1[key[i]] !== value2[key[i]]) {
        return false;
      }
    }
    return true;
  },
  _compareByKey(value1, value2, key) {
    const unwrapObservable = variable_wrapper_default.unwrap;
    const valueKey1 = ensureDefined(unwrapObservable(value1[key]), value1);
    const valueKey2 = ensureDefined(unwrapObservable(value2[key]), value2);
    return this._compareValues(valueKey1, valueKey2);
  },
  _compareValues: (value1, value2) => toComparable(value1, true) === toComparable(value2, true),
  _initDynamicTemplates: noop,
  _setCollectionWidgetItemTemplate() {
    this._initDynamicTemplates();
    this._setCollectionWidgetOption("itemTemplate", this.option("itemTemplate"));
  },
  _getCollectionKeyExpr() {
    const valueExpr = this.option("valueExpr");
    const isValueExprField = isString(valueExpr) && "this" !== valueExpr || isFunction(valueExpr);
    return isValueExprField ? valueExpr : null;
  },
  _dataExpressionOptionChanged(args) {
    switch (args.name) {
      case "items":
        this._itemsToDataSource();
        this._setCollectionWidgetOption("items");
        break;
      case "dataSource":
        this._initDataSource();
        break;
      case "itemTemplate":
        this._setCollectionWidgetItemTemplate();
        break;
      case "valueExpr":
        this._compileValueGetter();
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._initDynamicTemplates();
        this._setCollectionWidgetOption("displayExpr");
    }
  }
});
var m_data_expression_default = DataExpressionMixin;

// node_modules/devextreme/esm/ui/editor/ui.data_expression.js
var ui_data_expression_default = m_data_expression_default;

// node_modules/devextreme/esm/__internal/ui/drop_down_editor/m_drop_down_list.js
var window = getWindow();
var SEARCH_MODES = ["startswith", "contains", "endwith", "notcontains"];
var useCompositionEvents = "android" !== devices_default.real().platform;
var DropDownList = class extends m_drop_down_editor_default {
  _supportedKeys() {
    const parentSupportedKeys = super._supportedKeys();
    return _extends({}, parentSupportedKeys, {
      tab(e) {
        if (this._allowSelectItemByTab()) {
          this._saveValueChangeEvent(e);
          const {
            focusedElement
          } = this._list.option();
          const $focusedItem = renderer_default(focusedElement);
          if ($focusedItem.length) {
            this._setSelectedElement($focusedItem);
          }
        }
        parentSupportedKeys.tab(e);
      },
      space: noop,
      home: noop,
      end: noop
    });
  }
  _allowSelectItemByTab() {
    const {
      opened,
      applyValueMode
    } = this.option();
    return opened && "instantly" === applyValueMode;
  }
  _setSelectedElement($element) {
    const value = this._valueGetter(this._list._getItemData($element));
    this._setValue(value);
  }
  _setValue(value) {
    this.option("value", value);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), ui_data_expression_default._dataExpressionDefaultOptions(), {
      displayValue: void 0,
      searchEnabled: false,
      searchMode: "contains",
      searchTimeout: 500,
      minSearchLength: 0,
      searchExpr: null,
      valueChangeEvent: "input change keyup",
      selectedItem: null,
      noDataText: message_default.format("dxCollectionWidget-noDataText"),
      encodeNoDataText: false,
      onSelectionChanged: null,
      onItemClick: noop,
      showDataBeforeSearch: false,
      grouped: false,
      groupTemplate: "group",
      popupPosition: {
        my: "left top",
        at: "left bottom",
        offset: {
          h: 0,
          v: 0
        },
        collision: "flip"
      },
      wrapItemText: false,
      useItemTextAsTitle: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "ios"
      },
      options: {
        popupPosition: {
          offset: {
            v: -1
          }
        }
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        buttonsLocation: "bottom center"
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      value: true,
      selectedItem: true,
      displayValue: true
    });
  }
  _init() {
    super._init();
    this._initDataExpressions();
    this._initActions();
    this._setListDataSource();
    this._validateSearchMode();
    this._clearSelectedItem();
    this._initItems();
  }
  _setListFocusedElementOptionChange() {
    this._list._updateParentActiveDescendant = this._updateActiveDescendant.bind(this);
  }
  _initItems() {
    const {
      items
    } = this.option();
    if (items && !items.length && this._dataSource) {
      this.option().items = this._dataSource.items();
    }
  }
  _initActions() {
    this._initContentReadyAction();
    this._initSelectionChangedAction();
    this._initItemClickAction();
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initItemClickAction() {
    this._itemClickAction = this._createActionByOption("onItemClick");
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new ChildDefaultTemplate("item")
    });
  }
  _isEditable() {
    const {
      searchEnabled
    } = this.option();
    return super._isEditable() || searchEnabled;
  }
  _saveFocusOnWidget() {
    var _this$_list;
    if (null !== (_this$_list = this._list) && void 0 !== _this$_list && _this$_list.initialOption("focusStateEnabled")) {
      this._focusInput();
    }
  }
  _fitIntoRange(value, start, end) {
    if (value > end) {
      return start;
    }
    if (value < start) {
      return end;
    }
    return value;
  }
  _items() {
    const items = this._getPlainItems(!this._list && this._dataSource.items());
    const availableItems = new m_query_default(items).filter("disabled", "<>", true).toArray();
    return availableItems;
  }
  _calcNextItem(step) {
    const items = this._items();
    const nextIndex = this._fitIntoRange(this._getSelectedIndex() + step, 0, items.length - 1);
    return items[nextIndex];
  }
  _getSelectedIndex() {
    const items = this._items();
    const selectedItem = this.option("selectedItem");
    let result = -1;
    each(items, ((index, item) => {
      if (this._isValueEquals(item, selectedItem)) {
        result = index;
        return false;
      }
    }));
    return result;
  }
  _createPopup() {
    super._createPopup();
    this._updateCustomBoundaryContainer();
    this._popup.$wrapper().addClass(this._popupWrapperClass());
    const $popupContent = this._popup.$content();
    m_events_engine_default.off($popupContent, "mouseup");
    m_events_engine_default.on($popupContent, "mouseup", this._saveFocusOnWidget.bind(this));
  }
  _updateCustomBoundaryContainer() {
    const customContainer = this.option("dropDownOptions.container");
    const $container = customContainer && renderer_default(customContainer);
    if ($container && $container.length && !isWindow($container.get(0))) {
      const $containerWithParents = [].slice.call($container.parents());
      $containerWithParents.unshift($container.get(0));
      each($containerWithParents, ((i, parent) => {
        if (parent === renderer_default("body").get(0)) {
          return false;
        }
        if ("hidden" === window.getComputedStyle(parent).overflowY) {
          this._$customBoundaryContainer = renderer_default(parent);
          return false;
        }
      }));
    }
  }
  _popupWrapperClass() {
    return "dx-dropdownlist-popup-wrapper";
  }
  _renderInputValue() {
    var _this = this;
    let {
      value,
      renderOnly
    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const currentValue = value ?? this._getCurrentValue();
    this._rejectValueLoading();
    if (renderOnly) {
      return super._renderInputValue(currentValue);
    }
    return this._loadInputValue(currentValue, (function() {
      _this._setSelectedItem(...arguments);
    })).always(super._renderInputValue.bind(this, currentValue));
  }
  _loadInputValue(value, callback) {
    return this._loadItem(value).always(callback);
  }
  _getItemFromPlain(value, cache) {
    let plainItems;
    let selectedItem;
    if (cache && "object" !== typeof value) {
      if (!cache.itemByValue) {
        cache.itemByValue = {};
        plainItems = this._getPlainItems();
        plainItems.forEach((function(item) {
          cache.itemByValue[this._valueGetter(item)] = item;
        }), this);
      }
      selectedItem = cache.itemByValue[value];
    }
    if (!selectedItem) {
      plainItems = this._getPlainItems();
      selectedItem = grep(plainItems, ((item) => this._isValueEquals(this._valueGetter(item), value)))[0];
    }
    return selectedItem;
  }
  _resetInputText() {
    this._renderInputValue({
      renderOnly: true
    });
  }
  _loadItem(value, cache) {
    const selectedItem = this._getItemFromPlain(value, cache);
    return void 0 !== selectedItem ? Deferred().resolve(selectedItem).promise() : this._loadValue(value);
  }
  _getPlainItems(items) {
    let plainItems = [];
    const {
      grouped
    } = this.option();
    items = items || this.option("items") || this._dataSource.items() || [];
    for (let i = 0; i < items.length; i++) {
      var _items$i;
      if (grouped && null !== (_items$i = items[i]) && void 0 !== _items$i && _items$i.items) {
        plainItems = plainItems.concat(items[i].items);
      } else {
        plainItems.push(items[i]);
      }
    }
    return plainItems;
  }
  _updateActiveDescendant($target) {
    var _this$_list2;
    const opened = this.option("opened");
    const listFocusedItemId = null === (_this$_list2 = this._list) || void 0 === _this$_list2 ? void 0 : _this$_list2.getFocusedItemId();
    const isElementOnDom = renderer_default(`#${listFocusedItemId}`).length > 0;
    const activedescendant = opened && isElementOnDom && listFocusedItemId;
    this.setAria({
      activedescendant: activedescendant || null
    }, $target);
  }
  _setSelectedItem(item) {
    const displayValue = this._displayValue(item);
    this.option("selectedItem", ensureDefined(item, null));
    this.option("displayValue", displayValue);
  }
  _displayValue(item) {
    return this._displayGetter(item);
  }
  _refreshSelected() {
    const cache = {};
    this._listItemElements().each(((_, itemElement) => {
      const $itemElement = renderer_default(itemElement);
      const itemValue = this._valueGetter($itemElement.data("dxListItemData"));
      const isItemSelected = this._isSelectedValue(itemValue, cache);
      if (isItemSelected) {
        this._list.selectItem($itemElement);
      } else {
        this._list.unselectItem($itemElement);
      }
    }));
  }
  _popupShownHandler() {
    super._popupShownHandler();
    this._setFocusPolicy();
  }
  _setFocusPolicy() {
    if (!this.option("focusStateEnabled") || !this._list) {
      return;
    }
    this._list.option("focusedElement", null);
  }
  _isSelectedValue(value, cache) {
    return this._isValueEquals(value, this.option("value"));
  }
  _validateSearchMode() {
    const searchMode = this.option("searchMode");
    const normalizedSearchMode = searchMode.toLowerCase();
    if (!SEARCH_MODES.includes(normalizedSearchMode)) {
      throw ui_errors_default.Error("E1019", searchMode);
    }
  }
  _clearSelectedItem() {
    this.option("selectedItem", null);
  }
  _processDataSourceChanging() {
    this._initDataController();
    this._setListOption("_dataController", this._dataController);
    this._setListDataSource();
    this._renderInputValue().fail((() => {
      if (this._isCustomValueAllowed()) {
        return;
      }
      this._clearSelectedItem();
    }));
  }
  _isCustomValueAllowed() {
    return this.option("displayCustomValue");
  }
  clear() {
    super.clear();
    this._clearFilter();
    this._clearSelectedItem();
  }
  _listItemElements() {
    return this._$list ? this._$list.find(".dx-list-item") : renderer_default();
  }
  _popupConfig() {
    return _extends({}, super._popupConfig(), {
      templatesRenderAsynchronously: false,
      autoResizeEnabled: false,
      maxHeight: this._getMaxHeight.bind(this)
    });
  }
  _renderPopupContent() {
    super._renderPopupContent();
    this._renderList();
  }
  _getKeyboardListeners() {
    const canListHaveFocus = this._canListHaveFocus();
    if (!canListHaveFocus) {
      return super._getKeyboardListeners().concat([this._list]);
    }
    return super._getKeyboardListeners();
  }
  _renderList() {
    this._listId = `dx-${new guid_default()._value}`;
    const $list = renderer_default("<div>").attr("id", this._listId).appendTo(this._popup.$content());
    this._$list = $list;
    this._list = this._createComponent($list, list_edit_search_default, this._listConfig());
    this._refreshList();
    this._renderPreventBlurOnListClick();
    this._setListFocusedElementOptionChange();
  }
  _renderPreventBlurOnListClick() {
    const eventName = addNamespace("mousedown", "dxDropDownList");
    m_events_engine_default.off(this._$list, eventName);
    m_events_engine_default.on(this._$list, eventName, ((e) => e.preventDefault()));
  }
  _getControlsAria() {
    return this._list && this._listId;
  }
  _renderOpenedState() {
    super._renderOpenedState();
    this._list && this._updateActiveDescendant();
    this.setAria("owns", this._popup && this._popupContentId);
  }
  _getAriaHasPopup() {
    return "listbox";
  }
  _refreshList() {
    if (this._list && this._shouldRefreshDataSource()) {
      this._setListDataSource();
    }
  }
  _shouldRefreshDataSource() {
    const dataSourceProvided = !!this._list.option("dataSource");
    return dataSourceProvided !== this._needPassDataSourceToList();
  }
  _isDesktopDevice() {
    return "desktop" === devices_default.real().deviceType;
  }
  _listConfig() {
    const {
      noDataText,
      grouped,
      wrapItemText,
      itemTemplate,
      groupTemplate,
      hoverStateEnabled,
      focusStateEnabled,
      encodeNoDataText,
      useItemTextAsTitle
    } = this.option();
    const options = {
      selectionMode: "single",
      _templates: this.option("_templates"),
      templateProvider: this.option("templateProvider"),
      noDataText,
      encodeNoDataText,
      grouped,
      wrapItemText,
      useItemTextAsTitle,
      onContentReady: this._listContentReadyHandler.bind(this),
      itemTemplate,
      indicateLoading: false,
      keyExpr: this._getCollectionKeyExpr(),
      displayExpr: this._displayGetterExpr(),
      groupTemplate,
      onItemClick: this._listItemClickAction.bind(this),
      dataSource: this._getDataSource(),
      _dataController: this._dataController,
      hoverStateEnabled: this._isDesktopDevice() ? hoverStateEnabled : false,
      focusStateEnabled: this._isDesktopDevice() ? focusStateEnabled : false,
      _onItemsRendered: () => {
        this._popup.repaint();
      }
    };
    if (!this._canListHaveFocus()) {
      options.tabIndex = null;
    }
    return options;
  }
  _canListHaveFocus() {
    return false;
  }
  _getDataSource() {
    return this._needPassDataSourceToList() ? this._dataSource : null;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _getSpecificDataSourceOption() {
    const {
      grouped
    } = this.option();
    const dataSource = this.option("dataSource");
    if (dataSource && grouped) {
      return getDataSourceOptions(dataSource);
    }
    return dataSource;
  }
  _dataSourceFromUrlLoadMode() {
    return "raw";
  }
  _listContentReadyHandler() {
    this._list = this._list || this._$list.dxList("instance");
    if (!this.option("deferRendering")) {
      this._refreshSelected();
    }
    this._updatePopupWidth();
    this._updateListDimensions();
    this._contentReadyAction();
  }
  _setListOption(optionName, value) {
    this._setWidgetOption("_list", arguments);
  }
  _listItemClickAction(e) {
    this._listItemClickHandler(e);
    this._itemClickAction(e);
  }
  _listItemClickHandler(e) {
  }
  _setListDataSource() {
    if (!this._list) {
      return;
    }
    this._setListOption("dataSource", this._getDataSource());
    if (!this._needPassDataSourceToList()) {
      this._setListOption("items", []);
    }
  }
  _needPassDataSourceToList() {
    const {
      showDataBeforeSearch
    } = this.option();
    return showDataBeforeSearch || this._isMinSearchLengthExceeded();
  }
  _isMinSearchLengthExceeded() {
    return this._searchValue().toString().length >= this.option("minSearchLength");
  }
  _needClearFilter() {
    return this._canKeepDataSource() ? false : this._needPassDataSourceToList();
  }
  _canKeepDataSource() {
    const isMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
    return this._dataController.isLoaded() && this.option("showDataBeforeSearch") && this.option("minSearchLength") && !isMinSearchLengthExceeded && !this._isLastMinSearchLengthExceeded;
  }
  _searchValue() {
    return this._input().val() || "";
  }
  _getSearchEvent() {
    return addNamespace("input", `${this.NAME}Search`);
  }
  _getCompositionStartEvent() {
    return addNamespace("compositionstart", `${this.NAME}CompositionStart`);
  }
  _getCompositionEndEvent() {
    return addNamespace("compositionend", `${this.NAME}CompositionEnd`);
  }
  _getSetFocusPolicyEvent() {
    return addNamespace("input", `${this.NAME}FocusPolicy`);
  }
  _renderEvents() {
    super._renderEvents();
    m_events_engine_default.on(this._input(), this._getSetFocusPolicyEvent(), (() => {
      this._setFocusPolicy();
    }));
    if (this._shouldRenderSearchEvent()) {
      m_events_engine_default.on(this._input(), this._getSearchEvent(), ((e) => {
        this._searchHandler(e);
      }));
      if (useCompositionEvents) {
        m_events_engine_default.on(this._input(), this._getCompositionStartEvent(), (() => {
          this._isTextCompositionInProgress(true);
        }));
        m_events_engine_default.on(this._input(), this._getCompositionEndEvent(), ((e) => {
          this._isTextCompositionInProgress(void 0);
          this._searchHandler(e, this._searchValue());
        }));
      }
    }
  }
  _shouldRenderSearchEvent() {
    return this.option("searchEnabled");
  }
  _refreshEvents() {
    m_events_engine_default.off(this._input(), this._getSearchEvent());
    m_events_engine_default.off(this._input(), this._getSetFocusPolicyEvent());
    if (useCompositionEvents) {
      m_events_engine_default.off(this._input(), this._getCompositionStartEvent());
      m_events_engine_default.off(this._input(), this._getCompositionEndEvent());
    }
    super._refreshEvents();
  }
  _isTextCompositionInProgress(value) {
    if (arguments.length) {
      this._isTextComposition = value;
    } else {
      return this._isTextComposition;
    }
  }
  _searchHandler(e, searchValue) {
    if (this._isTextCompositionInProgress()) {
      return;
    }
    if (!this._isMinSearchLengthExceeded()) {
      this._searchCanceled();
      return;
    }
    const {
      searchTimeout
    } = this.option();
    if (searchTimeout) {
      this._clearSearchTimer();
      this._searchTimer = setTimeout((() => {
        this._searchDataSource(searchValue);
      }), searchTimeout);
    } else {
      this._searchDataSource(searchValue);
    }
  }
  _searchCanceled() {
    this._clearSearchTimer();
    if (this._needClearFilter()) {
      this._filterDataSource(null);
    }
    this._refreshList();
  }
  _searchDataSource() {
    let searchValue = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._searchValue();
    this._filterDataSource(searchValue);
  }
  _filterDataSource(searchValue) {
    this._clearSearchTimer();
    const dataController = this._dataController;
    dataController.searchExpr(this.option("searchExpr") || this._displayGetterExpr());
    dataController.searchOperation(this.option("searchMode"));
    dataController.searchValue(searchValue);
    dataController.load().done(this._dataSourceFiltered.bind(this, searchValue));
  }
  _clearFilter() {
    const dataController = this._dataController;
    dataController.searchValue() && dataController.searchValue(null);
  }
  _dataSourceFiltered(searchValue) {
    this._isLastMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
    this._refreshList();
    this._refreshPopupVisibility();
  }
  _shouldOpenPopup() {
    return this._hasItemsToShow();
  }
  _refreshPopupVisibility() {
    if (this.option("readOnly") || !this._searchValue()) {
      return;
    }
    const shouldOpenPopup = this._shouldOpenPopup();
    if (shouldOpenPopup && !this._isFocused()) {
      return;
    }
    this.option("opened", shouldOpenPopup);
    if (shouldOpenPopup) {
      this._updatePopupWidth();
      this._updateListDimensions();
    }
  }
  _dataSourceChangedHandler(newItems) {
    if (0 === this._dataController.pageIndex()) {
      this.option().items = newItems;
    } else {
      this.option().items = this.option().items.concat(newItems);
    }
  }
  _hasItemsToShow() {
    const dataController = this._dataController;
    const resultItems = dataController.items() || [];
    const resultAmount = resultItems.length;
    const isMinSearchLengthExceeded = this._needPassDataSourceToList();
    return !!(isMinSearchLengthExceeded && resultAmount);
  }
  _clearSearchTimer() {
    clearTimeout(this._searchTimer);
    delete this._searchTimer;
  }
  _popupShowingHandler() {
    this._updatePopupWidth();
    this._updateListDimensions();
  }
  _dimensionChanged() {
    super._dimensionChanged();
    this._updateListDimensions();
  }
  _needPopupRepaint() {
    const dataController = this._dataController;
    const currentPageIndex = dataController.pageIndex();
    const needRepaint = isDefined(this._pageIndex) && currentPageIndex <= this._pageIndex || dataController.isLastPage() && !this._list._scrollViewIsFull();
    this._pageIndex = currentPageIndex;
    return needRepaint;
  }
  _updateListDimensions() {
    if (!this._popup) {
      return;
    }
    if (this._needPopupRepaint()) {
      this._popup.repaint();
    }
    if (this._list) {
      this._list.updateDimensions();
    }
  }
  _getMaxHeight() {
    const $element = this.$element();
    const $customBoundaryContainer = this._$customBoundaryContainer;
    const offsetTop = $element.offset().top - ($customBoundaryContainer ? $customBoundaryContainer.offset().top : 0);
    const windowHeight = getOuterHeight(window);
    const containerHeight = $customBoundaryContainer ? Math.min(getOuterHeight($customBoundaryContainer), windowHeight) : windowHeight;
    const maxHeight = Math.max(offsetTop, containerHeight - offsetTop - getOuterHeight($element));
    return Math.min(0.5 * containerHeight, maxHeight);
  }
  _clean() {
    if (this._list) {
      delete this._list;
    }
    delete this._isLastMinSearchLengthExceeded;
    super._clean();
  }
  _dispose() {
    this._clearSearchTimer();
    super._dispose();
  }
  _setCollectionWidgetOption() {
    this._setListOption.apply(this, arguments);
  }
  _setSubmitValue() {
    const value = this.option("value");
    const submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
    this._getSubmitElement().val(submitValue);
  }
  _shouldUseDisplayValue(value) {
    return "this" === this.option("valueExpr") && isObject(value);
  }
  _optionChanged(args) {
    this._dataExpressionOptionChanged(args);
    switch (args.name) {
      case "hoverStateEnabled":
      case "focusStateEnabled":
        this._isDesktopDevice() && this._setListOption(args.name, args.value);
        super._optionChanged(args);
        break;
      case "items":
        if (!this.option("dataSource")) {
          this._processDataSourceChanging();
        }
        break;
      case "dataSource":
        this._processDataSourceChanging();
        break;
      case "valueExpr":
        this._renderValue();
        this._setListOption("keyExpr", this._getCollectionKeyExpr());
        break;
      case "displayExpr":
        this._renderValue();
        this._setListOption("displayExpr", this._displayGetterExpr());
        break;
      case "searchMode":
        this._validateSearchMode();
        break;
      case "minSearchLength":
        this._refreshList();
        break;
      case "searchEnabled":
      case "showDataBeforeSearch":
      case "searchExpr":
        this._invalidate();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      case "onSelectionChanged":
        this._initSelectionChangedAction();
        break;
      case "onItemClick":
        this._initItemClickAction();
        break;
      case "grouped":
      case "groupTemplate":
      case "wrapItemText":
      case "noDataText":
      case "encodeNoDataText":
      case "useItemTextAsTitle":
        this._setListOption(args.name);
        break;
      case "displayValue":
        this.option("text", args.value);
        break;
      case "itemTemplate":
      case "searchTimeout":
        break;
      case "selectedItem":
        if (args.previousValue !== args.value) {
          this._selectionChangedAction({
            selectedItem: args.value
          });
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
};
DropDownList.include(ui_data_expression_default);
component_registrator_default("dxDropDownList", DropDownList);
var m_drop_down_list_default = DropDownList;

// node_modules/devextreme/esm/__internal/ui/m_select_box.js
var SelectBox = class extends m_drop_down_list_default {
  _supportedKeys() {
    const that = this;
    const parent = super._supportedKeys();
    const clearSelectBox = function(e) {
      const isEditable = this._isEditable();
      if (!isEditable) {
        if (this.option("showClearButton")) {
          e.preventDefault();
          this.clear();
        }
      } else if (this._valueSubstituted()) {
        this._preventFiltering = true;
      }
      this._savedTextRemoveEvent = e;
      this._preventSubstitution = true;
    };
    const searchIfNeeded = function() {
      if (that.option("searchEnabled") && that._valueSubstituted()) {
        that._searchHandler();
      }
    };
    return _extends({}, parent, {
      tab() {
        const {
          opened
        } = this.option();
        const popupHasFocusableElements = opened && !!this._popup.getFocusableElements().length;
        if (!popupHasFocusableElements) {
          this._resetCaretPosition(true);
        }
        parent.tab && parent.tab.apply(this, arguments);
        if (!popupHasFocusableElements) {
          this._cancelSearchIfNeed();
        }
      },
      upArrow(e) {
        if (parent.upArrow.apply(this, arguments)) {
          if (!this.option("opened")) {
            this._setNextValue(e);
          }
          return true;
        }
        return;
      },
      downArrow(e) {
        if (parent.downArrow.apply(this, arguments)) {
          if (!this.option("opened")) {
            this._setNextValue(e);
          }
          return true;
        }
        return;
      },
      leftArrow() {
        var _parent$leftArrow;
        searchIfNeeded();
        null === (_parent$leftArrow = parent.leftArrow) || void 0 === _parent$leftArrow || _parent$leftArrow.apply(this, arguments);
      },
      rightArrow() {
        var _parent$rightArrow;
        searchIfNeeded();
        null === (_parent$rightArrow = parent.rightArrow) || void 0 === _parent$rightArrow || _parent$rightArrow.apply(this, arguments);
      },
      home() {
        var _parent$home;
        searchIfNeeded();
        null === (_parent$home = parent.home) || void 0 === _parent$home || _parent$home.apply(this, arguments);
      },
      end() {
        var _parent$end;
        searchIfNeeded();
        null === (_parent$end = parent.end) || void 0 === _parent$end || _parent$end.apply(this, arguments);
      },
      escape() {
        var _parent$escape;
        const result = null === (_parent$escape = parent.escape) || void 0 === _parent$escape ? void 0 : _parent$escape.apply(this, arguments);
        this._cancelEditing();
        return result ?? true;
      },
      enter(e) {
        const isOpened = this.option("opened");
        const inputText = this._input().val().trim();
        const isCustomText = inputText && this._list && !this._list.option("focusedElement");
        if (!inputText && isDefined(this.option("value")) && this.option("allowClearing")) {
          this._saveValueChangeEvent(e);
          this.option({
            selectedItem: null,
            value: null
          });
          this.close();
        } else {
          var _parent$enter;
          if (this.option("acceptCustomValue")) {
            e.preventDefault();
            if (isCustomText) {
              if (isOpened) {
                this._toggleOpenState();
              }
              this._valueChangeEventHandler(e);
            }
            return isOpened;
          }
          if (null !== (_parent$enter = parent.enter) && void 0 !== _parent$enter && _parent$enter.apply(this, arguments)) {
            return isOpened;
          }
        }
      },
      space(e) {
        const isOpened = this.option("opened");
        const isSearchEnabled = this.option("searchEnabled");
        const acceptCustomValue = this.option("acceptCustomValue");
        if (!isOpened || isSearchEnabled || acceptCustomValue) {
          return;
        }
        e.preventDefault();
        this._valueChangeEventHandler(e);
        return true;
      },
      backspace: clearSelectBox,
      del: clearSelectBox
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      placeholder: message_default.format("Select"),
      fieldTemplate: null,
      customItemCreateEvent: "change",
      acceptCustomValue: false,
      onCustomItemCreating(e) {
        if (!isDefined(e.customItem)) {
          e.customItem = e.text;
        }
      },
      showSelectionControls: false,
      allowClearing: true,
      tooltipEnabled: false,
      openOnFieldClick: true,
      showDropDownButton: true,
      displayCustomValue: false,
      useHiddenSubmitElement: true
    });
  }
  _init() {
    super._init();
    this._initCustomItemCreatingAction();
  }
  _initMarkup() {
    this.$element().addClass("dx-selectbox");
    this._renderTooltip();
    super._initMarkup();
    this._$container.addClass("dx-selectbox-container");
  }
  _createPopup() {
    super._createPopup();
    this._popup.$element().addClass("dx-selectbox-popup");
    this._popup.$overlayContent().attr("tabindex", -1);
  }
  _popupWrapperClass() {
    return `${super._popupWrapperClass()} dx-selectbox-popup-wrapper`;
  }
  _cancelEditing() {
    if (!this.option("searchEnabled") && this._list) {
      this._focusListElement(null);
      this._updateField(this.option("selectedItem"));
    }
  }
  _renderOpenedState() {
    super._renderOpenedState();
    if (this.option("opened")) {
      this._scrollToSelectedItem();
      this._focusSelectedElement();
    }
  }
  _focusSelectedElement() {
    const searchValue = this._searchValue();
    if (!searchValue) {
      this._focusListElement(null);
      return;
    }
    const {
      items,
      selectedItem
    } = this.option();
    const $listItems = this._list._itemElements();
    const index = (null === items || void 0 === items ? void 0 : items.indexOf(selectedItem)) ?? -1;
    const focusedElement = -1 !== index && !this._isCustomItemSelected() ? $listItems.eq(index) : null;
    this._focusListElement(focusedElement);
  }
  _renderFocusedElement() {
    if (!this._list) {
      return;
    }
    const searchValue = this._searchValue();
    if (!searchValue || this.option("acceptCustomValue")) {
      this._focusListElement(null);
      return;
    }
    const $listItems = this._list._itemElements();
    const focusedElement = $listItems.not(".dx-state-disabled").eq(0);
    this._focusListElement(focusedElement);
  }
  _focusListElement(element) {
    this._preventInputValueRender = true;
    this._list.option("focusedElement", getPublicElement(element));
    delete this._preventInputValueRender;
  }
  _scrollToSelectedItem() {
    if (!this._list) {
      return;
    }
    const {
      selectedItem
    } = this._list.option();
    this._list.scrollToItem(selectedItem);
  }
  _listContentReadyHandler() {
    super._listContentReadyHandler();
    const isPaginate = this._dataController.paginate();
    if (isPaginate && this._needPopupRepaint()) {
      return;
    }
    this._scrollToSelectedItem();
  }
  _renderValue() {
    this._renderInputValue();
    this._setSubmitValue();
    return Deferred().resolve();
  }
  _renderInputValue() {
    return super._renderInputValue(...arguments).always((() => {
      this._renderInputValueAsync();
    }));
  }
  _renderInputValueAsync() {
    this._renderTooltip();
    this._renderInputValueImpl().always((() => {
      this._refreshSelected();
    }));
  }
  _renderInputValueImpl() {
    this._renderField();
    return Deferred().resolve();
  }
  _setNextItem(step) {
    const item = this._calcNextItem(step);
    const value = this._valueGetter(item);
    this._setValue(value);
  }
  _setNextValue(e) {
    const dataSourceIsLoaded = this._dataController.isLoaded() ? Deferred().resolve() : this._dataController.load();
    dataSourceIsLoaded.done((() => {
      const selectedIndex = this._getSelectedIndex();
      const hasPages = this._dataController.pageSize();
      const isLastPage = this._dataController.isLastPage();
      const isLastItem = selectedIndex === this._items().length - 1;
      this._saveValueChangeEvent(e);
      const step = "downArrow" === normalizeKeyName(e) ? 1 : -1;
      if (hasPages && !isLastPage && isLastItem && step > 0) {
        if (!this._popup) {
          this._createPopup();
        }
        if (!this._dataController.isLoading()) {
          this._list._loadNextPage().done(this._setNextItem.bind(this, step));
        }
      } else {
        this._setNextItem(step);
      }
    }));
  }
  _setSelectedItem(item) {
    const isUnknownItem = !this._isCustomValueAllowed() && void 0 === item;
    super._setSelectedItem(isUnknownItem ? null : item);
    if (!isUnknownItem && (!this._isEditable() || this._isCustomItemSelected())) {
      this._setListOption("selectedItem", this.option("selectedItem"));
    }
  }
  _isCustomValueAllowed() {
    return this.option("acceptCustomValue") || super._isCustomValueAllowed();
  }
  _displayValue(item) {
    item = !isDefined(item) && this._isCustomValueAllowed() ? this.option("value") : item;
    return super._displayValue(item);
  }
  _listConfig() {
    const result = extend(super._listConfig(), {
      pageLoadMode: "scrollBottom",
      onSelectionChanged: this._getSelectionChangeHandler(),
      selectedItem: this.option("selectedItem"),
      onFocusedItemChanged: this._listFocusedItemChangeHandler.bind(this),
      _onItemsRendered: () => {
        this._popup.repaint();
        if (this.option("opened")) {
          this._scrollToSelectedItem();
        }
      }
    });
    if (this.option("showSelectionControls")) {
      extend(result, {
        showSelectionControls: true,
        selectByClick: true
      });
    }
    return result;
  }
  _listFocusedItemChangeHandler(e) {
    if (this._preventInputValueRender) {
      return;
    }
    const list = e.component;
    const focusedElement = renderer_default(list.option("focusedElement"));
    const focusedItem = list._getItemData(focusedElement);
    this._updateField(focusedItem);
  }
  _updateField(item) {
    const fieldTemplate = this._getTemplateByOption("fieldTemplate");
    if (!(fieldTemplate && this.option("fieldTemplate"))) {
      const text = this._displayGetter(item);
      this.option("text", text);
      this._renderDisplayText(text);
      return;
    }
    this._renderField();
  }
  _getSelectionChangeHandler() {
    return this.option("showSelectionControls") ? this._selectionChangeHandler.bind(this) : noop;
  }
  _selectionChangeHandler(e) {
    each(e.addedItems || [], ((_, addedItem) => {
      this._setValue(this._valueGetter(addedItem));
    }));
  }
  _getActualSearchValue() {
    return this._dataController.searchValue();
  }
  _isInlineAutocompleteEnabled() {
    const {
      searchEnabled,
      acceptCustomValue,
      searchMode
    } = this.option();
    return searchEnabled && !acceptCustomValue && "startswith" === searchMode;
  }
  _getAriaAutocomplete() {
    const {
      disabled,
      readOnly,
      searchEnabled
    } = this.option();
    const isInputEditable = !(readOnly || disabled);
    const hasAutocomplete = searchEnabled && isInputEditable;
    if (!hasAutocomplete) {
      return "none";
    }
    const isInlineAutocompleteEnabled = this._isInlineAutocompleteEnabled();
    const autocompleteAria = isInlineAutocompleteEnabled ? "both" : "list";
    return autocompleteAria;
  }
  _toggleOpenState(isVisible) {
    if (this.option("disabled")) {
      return;
    }
    isVisible = arguments.length ? isVisible : !this.option("opened");
    if (!isVisible && !this._shouldClearFilter()) {
      this._restoreInputText(true);
    }
    if (this._wasSearch() && isVisible) {
      this._wasSearch(false);
      const showDataImmediately = this.option("showDataBeforeSearch") || this._isMinSearchLengthExceeded();
      if (showDataImmediately && this._dataController.getDataSource()) {
        if (this._searchTimer) {
          return;
        }
        const searchValue = this._getActualSearchValue();
        searchValue && this._wasSearch(true);
        this._filterDataSource(searchValue || null);
      } else {
        this._setListOption("items", []);
      }
    }
    if (isVisible) {
      this._scrollToSelectedItem();
    }
    super._toggleOpenState(isVisible);
  }
  _renderTooltip() {
    const {
      tooltipEnabled,
      displayValue
    } = this.option();
    if (tooltipEnabled) {
      this.$element().attr("title", displayValue);
    }
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updatePopupWidth();
    this._updateListDimensions();
  }
  _isValueEqualInputText() {
    const initialSelectedItem = this.option("selectedItem");
    if (null === initialSelectedItem) {
      return false;
    }
    const value = this._displayGetter(initialSelectedItem);
    const displayValue = value ? String(value) : "";
    const inputText = this._searchValue();
    return displayValue === inputText;
  }
  _popupHidingHandler() {
    if (this._isValueEqualInputText()) {
      this._cancelEditing();
    }
    super._popupHidingHandler();
  }
  _popupHiddenHandler() {
    super._popupHiddenHandler();
    if (this._shouldCancelSearch()) {
      this._wasSearch(false);
      this._searchCanceled();
      this._shouldCancelSearch(false);
    }
  }
  _restoreInputText(saveEditingValue) {
    var _this$_loadItemDeferr;
    if (this.option("readOnly")) {
      return;
    }
    null === (_this$_loadItemDeferr = this._loadItemDeferred) || void 0 === _this$_loadItemDeferr || _this$_loadItemDeferr.always((() => {
      const {
        acceptCustomValue,
        text,
        selectedItem: initialSelectedItem,
        customItemCreateEvent
      } = this.option();
      if (acceptCustomValue) {
        if (!saveEditingValue && !this._isValueChanging) {
          let initialItem = null;
          if (isDefined(initialSelectedItem)) {
            initialItem = initialSelectedItem;
          } else if ("" !== customItemCreateEvent) {
            initialItem = this._createCustomItem(text);
          }
          this._updateField(initialItem);
          this._clearFilter();
        }
        return;
      }
      if (this.option("searchEnabled")) {
        if (!this._searchValue() && this.option("allowClearing")) {
          this._clearTextValue();
          return;
        }
      }
      if (this._isValueEqualInputText()) {
        return;
      }
      this._renderInputValue().always(((selectedItem) => {
        const newSelectedItem = ensureDefined(selectedItem, initialSelectedItem);
        this._setSelectedItem(newSelectedItem);
        this._updateField(newSelectedItem);
        this._clearFilter();
      }));
    }));
  }
  _valueChangeEventIncludesBlur() {
    const valueChangeEvent = this.option(this._getValueChangeEventOptionName());
    return valueChangeEvent.includes("blur");
  }
  _isPreventedFocusOutEvent(e) {
    return this._preventNestedFocusEvent(e) || this._valueChangeEventIncludesBlur();
  }
  _focusOutHandler(e) {
    if (!this._isPreventedFocusOutEvent(e)) {
      const isOverlayTarget = this._isOverlayNestedTarget(e.relatedTarget);
      if (!isOverlayTarget) {
        this._restoreInputText();
        this._clearSearchTimer();
      }
      this._cancelSearchIfNeed(e);
    }
    e.target = this._input().get(0);
    super._focusOutHandler(e);
  }
  _cancelSearchIfNeed(e) {
    const {
      searchEnabled
    } = this.option();
    const isOverlayTarget = this._isOverlayNestedTarget(null === e || void 0 === e ? void 0 : e.relatedTarget);
    const shouldCancelSearch = this._wasSearch() && searchEnabled && !isOverlayTarget;
    if (shouldCancelSearch) {
      var _this$_popup;
      const isPopupVisible = null === (_this$_popup = this._popup) || void 0 === _this$_popup ? void 0 : _this$_popup._hideAnimationProcessing;
      this._clearSearchTimer();
      if (isPopupVisible) {
        this._shouldCancelSearch(true);
      } else {
        this._wasSearch(false);
        this._searchCanceled();
      }
    }
  }
  _shouldCancelSearch(value) {
    if (!arguments.length) {
      return this._shouldCancelSearchValue;
    }
    this._shouldCancelSearchValue = value;
  }
  _isOverlayNestedTarget(target) {
    return !!renderer_default(target).closest(".dx-selectbox-popup-wrapper").length;
  }
  _clearTextValue() {
    const selectedItem = this.option("selectedItem");
    const selectedItemText = this._displayGetter(selectedItem);
    const shouldRestoreValue = selectedItem && "" !== selectedItemText;
    if (shouldRestoreValue) {
      if (this._savedTextRemoveEvent) {
        this._saveValueChangeEvent(this._savedTextRemoveEvent);
      }
      this.option("value", null);
    }
    delete this._savedTextRemoveEvent;
  }
  _shouldOpenPopup() {
    return this._needPassDataSourceToList() && this._wasSearch();
  }
  _isFocused() {
    const activeElement = dom_adapter_default.getActiveElement(this.element());
    return super._isFocused() && renderer_default(activeElement).closest(this._input()).length > 0;
  }
  _getValueChangeEventOptionName() {
    return "customItemCreateEvent";
  }
  _renderValueChangeEvent() {
    if (this._isEditable()) {
      super._renderValueChangeEvent();
    }
  }
  _fieldRenderData() {
    const {
      focusedElement
    } = this.option();
    const $listFocused = this._list && this.option("opened") && renderer_default(focusedElement);
    if (null !== $listFocused && void 0 !== $listFocused && $listFocused.length) {
      return this._list._getItemData($listFocused);
    }
    return this.option("selectedItem");
  }
  _isSelectedValue(value, cache) {
    return this._isValueEquals(value, this.option("value"));
  }
  _shouldCloseOnItemClick() {
    const {
      selectionMode
    } = this.option();
    return !(this.option("showSelectionControls") && "single" !== selectionMode);
  }
  _listItemClickHandler(e) {
    const previousValue = this._getCurrentValue();
    this._focusListElement(renderer_default(e.itemElement));
    this._saveValueChangeEvent(e.event);
    this._completeSelection(this._valueGetter(e.itemData));
    if (this._shouldCloseOnItemClick()) {
      this.option("opened", false);
    }
    if (this.option("searchEnabled") && previousValue === this._valueGetter(e.itemData)) {
      this._updateField(e.itemData);
    }
    if (this._shouldClearFilter()) {
      this._cancelSearchIfNeed();
    }
  }
  _shouldClearFilter() {
    return this._wasSearch();
  }
  _completeSelection(value) {
    this._setValue(value);
  }
  _loadItem(value, cache) {
    const that = this;
    const deferred = Deferred();
    super._loadItem(value, cache).done(((item) => {
      deferred.resolve(item);
    })).fail(((args) => {
      if (null !== args && void 0 !== args && args.shouldSkipCallback) {
        return;
      }
      const selectedItem = that.option("selectedItem");
      if (that.option("acceptCustomValue") && value === that._valueGetter(selectedItem)) {
        deferred.resolve(selectedItem);
      } else {
        deferred.reject();
      }
    }));
    return deferred.promise();
  }
  _loadInputValue(value, callback) {
    this._loadItemDeferred = this._loadItem(value).always(callback);
    return this._loadItemDeferred;
  }
  _isCustomItemSelected() {
    const selectedItem = this.option("selectedItem");
    const searchValue = this._searchValue();
    const selectedItemText = this._displayGetter(selectedItem);
    return !selectedItemText || searchValue !== selectedItemText.toString();
  }
  _valueChangeEventHandler(e) {
    if (this.option("acceptCustomValue") && this._isCustomItemSelected() && !this._isValueChanging) {
      this._isValueChanging = true;
      this._customItemAddedHandler(e);
    }
  }
  _initCustomItemCreatingAction() {
    this._customItemCreatingAction = this._createActionByOption("onCustomItemCreating");
  }
  _createCustomItem(text) {
    const params = {
      text
    };
    const actionResult = this._customItemCreatingAction(params);
    const item = ensureDefined(actionResult, params.customItem);
    if (isDefined(actionResult)) {
      errors_default.log("W0015", "onCustomItemCreating", "customItem");
    }
    return item;
  }
  _customItemAddedHandler(e) {
    const searchValue = this._searchValue();
    const item = this._createCustomItem(searchValue);
    this._saveValueChangeEvent(e);
    if (void 0 === item) {
      this._renderValue();
      throw errors_default.Error("E0121");
    }
    if (isPromise(item)) {
      fromPromise(item).done(this._setCustomItem.bind(this)).fail(this._setCustomItem.bind(this, null));
    } else {
      this._setCustomItem(item);
    }
  }
  _setCustomItem(item) {
    if (this._disposed) {
      return;
    }
    item = item || null;
    this.option("selectedItem", item);
    this._cancelSearchIfNeed();
    this._setValue(this._valueGetter(item));
    this._renderDisplayText(this._displayGetter(item));
    this._isValueChanging = false;
  }
  _clearValueHandler(e) {
    this._preventFiltering = true;
    super._clearValueHandler(e);
    this._searchCanceled();
    return false;
  }
  _wasSearch(value) {
    if (!arguments.length) {
      return !!this._wasSearchValue;
    }
    this._wasSearchValue = value;
    return;
  }
  _searchHandler(e) {
    if (this._preventFiltering) {
      delete this._preventFiltering;
      return;
    }
    if (this._needPassDataSourceToList()) {
      this._wasSearch(true);
    }
    super._searchHandler(arguments);
  }
  _dataSourceFiltered(searchValue) {
    super._dataSourceFiltered();
    if (null !== searchValue) {
      this._renderInputSubstitution();
      this._renderFocusedElement();
    }
  }
  _valueSubstituted() {
    const input = this._input().get(0);
    const currentSearchLength = this._searchValue().length;
    const isAllSelected = 0 === input.selectionStart && input.selectionEnd === currentSearchLength;
    const inputHasSelection = input.selectionStart !== input.selectionEnd;
    const isLastSymbolSelected = currentSearchLength === input.selectionEnd;
    return this._wasSearch() && inputHasSelection && !isAllSelected && isLastSymbolSelected && this._shouldSubstitutionBeRendered();
  }
  _shouldSubstitutionBeRendered() {
    return !this._preventSubstitution && this._isInlineAutocompleteEnabled();
  }
  _renderInputSubstitution() {
    if (!this._shouldSubstitutionBeRendered()) {
      delete this._preventSubstitution;
      return;
    }
    const item = this._list && this._getPlainItems(this._list.option("items"))[0];
    if (!item) {
      return;
    }
    const $input = this._input();
    const valueLength = $input.val().length;
    if (0 === valueLength) {
      return;
    }
    const inputElement = $input.get(0);
    const displayValue = this._displayGetter(item).toString();
    inputElement.value = displayValue;
    this._caret({
      start: valueLength,
      end: displayValue.length
    });
  }
  _dispose() {
    this._renderInputValueAsync = noop;
    delete this._loadItemDeferred;
    super._dispose();
  }
  _optionChanged(args) {
    switch (args.name) {
      case "customItemCreateEvent":
        this._refreshValueChangeEvent();
        this._refreshFocusEvent();
        this._refreshEvents();
        break;
      case "onCustomItemCreating":
        this._initCustomItemCreatingAction();
        break;
      case "tooltipEnabled":
        this._renderTooltip();
        break;
      case "readOnly":
      case "disabled":
      case "searchMode":
        super._optionChanged(args);
        this._setDefaultAria();
        break;
      case "displayCustomValue":
      case "acceptCustomValue":
      case "showSelectionControls":
        this._invalidate();
        break;
      case "allowClearing":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxSelectBox", SelectBox);
var m_select_box_default = SelectBox;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_utils.js
var DATE_COMPONENTS = ["year", "day", "month", "day"];
var TIME_COMPONENTS = ["hours", "minutes", "seconds", "milliseconds"];
var ONE_DAY = 864e5;
var ONE_YEAR = 31536e6;
var getStringFormat = function(format2) {
  const formatType = typeof format2;
  if ("string" === formatType) {
    return "format";
  }
  if ("object" === formatType && void 0 !== format2.type) {
    return format2.type;
  }
  return null;
};
var dateUtils = {
  SUPPORTED_FORMATS: ["date", "time", "datetime"],
  ONE_MINUTE: 6e4,
  ONE_DAY,
  ONE_YEAR,
  MIN_DATEVIEW_DEFAULT_DATE: new Date(1900, 0, 1),
  MAX_DATEVIEW_DEFAULT_DATE: (function() {
    const newDate = /* @__PURE__ */ new Date();
    return new Date(newDate.getFullYear() + 50, newDate.getMonth(), newDate.getDate(), 23, 59, 59);
  })(),
  FORMATS_INFO: {
    date: {
      getStandardPattern: () => "yyyy-MM-dd",
      components: DATE_COMPONENTS
    },
    time: {
      getStandardPattern: () => "HH:mm",
      components: TIME_COMPONENTS
    },
    datetime: {
      getStandardPattern() {
        let standardPattern;
        !(function() {
          const $input = renderer_default("<input>").attr("type", "datetime");
          $input.val("2000-01-01T01:01Z");
          if ($input.val()) {
            standardPattern = "yyyy-MM-ddTHH:mmZ";
          }
        })();
        if (!standardPattern) {
          standardPattern = "yyyy-MM-ddTHH:mm:ssZ";
        }
        dateUtils.FORMATS_INFO.datetime.getStandardPattern = function() {
          return standardPattern;
        };
        return standardPattern;
      },
      components: [...DATE_COMPONENTS, ...TIME_COMPONENTS]
    },
    "datetime-local": {
      getStandardPattern: () => "yyyy-MM-ddTHH:mm:ss",
      components: [...DATE_COMPONENTS, "hours", "minutes", "seconds"]
    }
  },
  FORMATS_MAP: {
    date: "shortdate",
    time: "shorttime",
    datetime: "shortdateshorttime"
  },
  SUBMIT_FORMATS_MAP: {
    date: "date",
    time: "time",
    datetime: "datetime-local"
  },
  toStandardDateFormat(date, type2) {
    const pattern = dateUtils.FORMATS_INFO[type2].getStandardPattern();
    return date_serialization_default.serializeDate(date, pattern);
  },
  fromStandardDateFormat(text) {
    const date = date_serialization_default.dateParser(text);
    return isDate(date) ? date : void 0;
  },
  getMaxMonthDay: (year, month) => new Date(year, month + 1, 0).getDate(),
  mergeDates(oldValue, newValue, format2) {
    if (!newValue) {
      return newValue || null;
    }
    if (!oldValue || isNaN(oldValue.getTime())) {
      const now = /* @__PURE__ */ new Date(null);
      oldValue = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    const result = new Date(oldValue.valueOf());
    const formatInfo = dateUtils.FORMATS_INFO[format2];
    each(formatInfo.components, (function() {
      const componentInfo = dateUtils.DATE_COMPONENTS_INFO[this];
      result[componentInfo.setter](newValue[componentInfo.getter]());
    }));
    return result;
  },
  getLongestCaptionIndex(captionArray) {
    let longestIndex = 0;
    let longestCaptionLength = 0;
    let i;
    for (i = 0; i < captionArray.length; ++i) {
      if (captionArray[i].length > longestCaptionLength) {
        longestIndex = i;
        longestCaptionLength = captionArray[i].length;
      }
    }
    return longestIndex;
  },
  formatUsesMonthName: (format2) => date_default3.formatUsesMonthName(format2),
  formatUsesDayName: (format2) => date_default3.formatUsesDayName(format2),
  getLongestDate(format2, monthNames, dayNames) {
    const stringFormat = getStringFormat(format2);
    let month = 9;
    if (!stringFormat || dateUtils.formatUsesMonthName(stringFormat)) {
      month = dateUtils.getLongestCaptionIndex(monthNames);
    }
    const longestDate = new Date(1888, month, 21, 23, 59, 59, 999);
    if (!stringFormat || dateUtils.formatUsesDayName(stringFormat)) {
      const date = longestDate.getDate() - longestDate.getDay() + dateUtils.getLongestCaptionIndex(dayNames);
      longestDate.setDate(date);
    }
    return longestDate;
  },
  normalizeTime(date) {
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
};
dateUtils.DATE_COMPONENTS_INFO = {
  year: {
    getter: "getFullYear",
    setter: "setFullYear",
    formatter(value, date) {
      const formatDate = new Date(date.getTime());
      formatDate.setFullYear(value);
      return date_default3.format(formatDate, "yyyy");
    },
    startValue: void 0,
    endValue: void 0
  },
  day: {
    getter: "getDate",
    setter: "setDate",
    formatter(value, date) {
      const formatDate = new Date(date.getTime());
      formatDate.setDate(value);
      return date_default3.format(formatDate, "d");
    },
    startValue: 1,
    endValue: void 0
  },
  month: {
    getter: "getMonth",
    setter: "setMonth",
    formatter: (value) => date_default3.getMonthNames()[value],
    startValue: 0,
    endValue: 11
  },
  hours: {
    getter: "getHours",
    setter: "setHours",
    formatter: (value) => date_default3.format(new Date(0, 0, 0, value), "hour"),
    startValue: 0,
    endValue: 23
  },
  minutes: {
    getter: "getMinutes",
    setter: "setMinutes",
    formatter: (value) => date_default3.format(new Date(0, 0, 0, 0, value), "minute"),
    startValue: 0,
    endValue: 59
  },
  seconds: {
    getter: "getSeconds",
    setter: "setSeconds",
    formatter: (value) => date_default3.format(new Date(0, 0, 0, 0, 0, value), "second"),
    startValue: 0,
    endValue: 59
  },
  milliseconds: {
    getter: "getMilliseconds",
    setter: "setMilliseconds",
    formatter: (value) => date_default3.format(new Date(0, 0, 0, 0, 0, 0, value), "millisecond"),
    startValue: 0,
    endValue: 999
  }
};
var m_date_utils_default = dateUtils;

// node_modules/devextreme/esm/__internal/ui/date_box/m_time_view.js
var rotateArrow = function($arrow, angle, offset) {
  cssRotate($arrow, angle, offset);
};
var cssRotate = function($arrow, angle, offset) {
  $arrow.css("transform", `rotate(${angle}deg) translate(0,${offset}px)`);
};
var TimeView = class extends editor_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: new Date(Date.now()),
      use24HourFormat: true,
      _showClock: true,
      _arrowOffset: 5
    });
  }
  _getValue() {
    const {
      value
    } = this.option();
    return value || /* @__PURE__ */ new Date();
  }
  _init() {
    super._init();
    this.$element().addClass("dx-timeview");
  }
  _render() {
    super._render();
    this._renderBox();
    this._updateTime();
  }
  _renderBox() {
    const $box = renderer_default("<div>").appendTo(this.$element());
    const items = [];
    if (this.option("_showClock")) {
      items.push({
        ratio: 1,
        shrink: 0,
        baseSize: "auto",
        template: this._renderClock.bind(this)
      });
    }
    items.push({
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: this._renderField.bind(this)
    });
    this._createComponent($box, box_default, {
      height: "100%",
      width: "100%",
      direction: "col",
      items
    });
  }
  _renderClock(_, __, container) {
    this._$hourArrow = renderer_default("<div>").addClass("dx-timeview-hourarrow");
    this._$minuteArrow = renderer_default("<div>").addClass("dx-timeview-minutearrow");
    const $container = renderer_default(container);
    $container.addClass("dx-timeview-clock").append(this._$hourArrow).append(this._$minuteArrow);
    this.setAria("role", "presentation", $container);
  }
  _updateClock() {
    const time = this._getValue();
    const hourArrowAngle = time.getHours() / 12 * 360 + time.getMinutes() / 60 * 30;
    const minuteArrowAngle = time.getMinutes() / 60 * 360;
    rotateArrow(this._$hourArrow, hourArrowAngle, this.option("_arrowOffset"));
    rotateArrow(this._$minuteArrow, minuteArrowAngle, this.option("_arrowOffset"));
  }
  _getBoxItems(is12HourFormat) {
    const items = [{
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: () => this._hourBox.$element()
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: renderer_default("<div>").addClass("dx-timeview-time-separator").text(date_default3.getTimeSeparator())
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: () => this._minuteBox.$element()
    }];
    if (is12HourFormat) {
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: "auto",
        template: () => this._format12.$element()
      });
    }
    return items;
  }
  _renderField() {
    const is12HourFormat = !this.option("use24HourFormat");
    this._createHourBox(is12HourFormat);
    this._createMinuteBox();
    if (is12HourFormat) {
      this._createFormat12Box();
    }
    return this._createComponent(renderer_default("<div>").addClass("dx-timeview-field"), box_default, {
      direction: "row",
      align: "center",
      crossAlign: "center",
      items: this._getBoxItems(is12HourFormat)
    }).$element();
  }
  _createHourBox(is12HourFormat) {
    this._hourBox = this._createComponent(renderer_default("<div>"), m_number_box_default, _extends({
      min: -1,
      max: is12HourFormat ? 13 : 24,
      value: this._getValue().getHours(),
      onValueChanged: this._onHourBoxValueChanged.bind(this),
      onKeyboardHandled: (opts) => this._keyboardHandler(opts)
    }, this._getNumberBoxConfig()));
    this._hourBox.setAria("label", "hours");
  }
  _isPM() {
    return !this.option("use24HourFormat") && 1 === this._format12.option("value");
  }
  _onHourBoxValueChanged(_ref) {
    let {
      value,
      component
    } = _ref;
    const currentValue = this._getValue();
    const newValue = new Date(currentValue);
    let newHours = this._convertMaxHourToMin(value);
    component.option("value", newHours);
    if (this._isPM()) {
      newHours += 12;
    }
    newValue.setHours(newHours);
    m_date_utils_default.normalizeTime(newValue);
    this.option("value", newValue);
  }
  _convertMaxHourToMin(hours) {
    const maxHoursValue = this.option("use24HourFormat") ? 24 : 12;
    return (maxHoursValue + hours) % maxHoursValue;
  }
  _createMinuteBox() {
    this._minuteBox = this._createComponent(renderer_default("<div>"), m_number_box_default, _extends({
      min: -1,
      max: 60,
      value: this._getValue().getMinutes(),
      onKeyboardHandled: (opts) => this._keyboardHandler(opts),
      onValueChanged: (_ref2) => {
        let {
          value,
          component
        } = _ref2;
        const newMinutes = (60 + value) % 60;
        component.option("value", newMinutes);
        const time = new Date(this._getValue());
        time.setMinutes(newMinutes);
        m_date_utils_default.normalizeTime(time);
        this.option("value", time);
      }
    }, this._getNumberBoxConfig()));
    this._minuteBox.setAria("label", "minutes");
  }
  _createFormat12Box() {
    const periodNames = date_default3.getPeriodNames();
    this._format12 = this._createComponent(renderer_default("<div>").addClass("dx-timeview-format12"), m_select_box_default, {
      items: [{
        value: -1,
        text: periodNames[0]
      }, {
        value: 1,
        text: periodNames[1]
      }],
      valueExpr: "value",
      displayExpr: "text",
      onKeyboardHandled: (opts) => this._keyboardHandler(opts),
      onValueChanged: (_ref3) => {
        let {
          value
        } = _ref3;
        const hours = this._getValue().getHours();
        const time = new Date(this._getValue());
        const newHours = (hours + 12 * value) % 24;
        time.setHours(newHours);
        this.option("value", time);
      },
      dropDownOptions: {
        container: this.$element()
      },
      value: this._getValue().getHours() >= 12 ? 1 : -1,
      stylingMode: this.option("stylingMode")
    });
    this._format12.setAria("label", "type");
  }
  _refreshFormat12() {
    if (this.option("use24HourFormat")) {
      return;
    }
    const value = this._getValue();
    const hours = value.getHours();
    const isPM = hours >= 12;
    const newValue = isPM ? 1 : -1;
    this._silentEditorValueUpdate(this._format12, newValue);
  }
  _silentEditorValueUpdate(editor, value) {
    if (editor) {
      editor._suppressValueChangeAction();
      editor.option("value", value);
      editor._resumeValueChangeAction();
    }
  }
  _getNumberBoxConfig() {
    const {
      stylingMode
    } = this.option();
    return {
      showSpinButtons: true,
      displayValueFormatter: (value) => (value < 10 ? "0" : "") + value,
      stylingMode
    };
  }
  _normalizeHours(hours) {
    return this.option("use24HourFormat") ? hours : hours % 12 || 12;
  }
  _updateField() {
    const hours = this._normalizeHours(this._getValue().getHours());
    this._silentEditorValueUpdate(this._hourBox, hours);
    this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
    this._refreshFormat12();
  }
  _updateTime() {
    if (this.option("_showClock")) {
      this._updateClock();
    }
    this._updateField();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._updateTime();
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "value":
        this._updateTime();
        super._optionChanged(args);
        break;
      case "_arrowOffset":
        break;
      case "use24HourFormat":
      case "_showClock":
      case "stylingMode":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxTimeView", TimeView);
var m_time_view_default = TimeView;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.calendar_with_time.js
var window2 = getWindow();
var DATEBOX_TIMEVIEW_SIDE_CLASS = "dx-datebox-datetime-time-side";
var CalendarWithTimeStrategy = class extends m_date_box_strategy_calendar_default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = "CalendarWithTime";
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      applyValueMode: "useButtons",
      buttonsLocation: "bottom after",
      "dropDownOptions.showTitle": false
    });
  }
  _closeDropDownByEnter() {
    return date_default.sameDate(this._getContouredValue(), this.widgetOption("value"));
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || "shortdateshorttime";
  }
  _is24HourFormat() {
    return date_default3.is24HourFormat(this.getDisplayFormat(this.dateBox.option("displayFormat")));
  }
  _getContouredValue() {
    const viewDate = super._getContouredValue();
    return this._updateDateTime(viewDate);
  }
  _renderWidget() {
    super._renderWidget();
    this._timeView = this.dateBox._createComponent(renderer_default("<div>"), m_time_view_default, {
      value: this.dateBoxValue(),
      _showClock: !this._isShrinkView(),
      use24HourFormat: this._is24HourFormat(),
      onValueChanged: this._valueChangedHandler.bind(this),
      stylingMode: this.dateBox.option("stylingMode")
    });
  }
  renderOpenedState() {
    super.renderOpenedState();
    const popup = this._getPopup();
    if (popup) {
      popup.$wrapper().toggleClass("dx-datebox-adaptivity-mode", this._isSmallScreen());
    }
    clearTimeout(this._repaintTimer);
    this._repaintTimer = setTimeout((() => {
      var _this$_getPopup;
      null === (_this$_getPopup = this._getPopup()) || void 0 === _this$_getPopup || _this$_getPopup.repaint();
    }), 0);
  }
  isAdaptivityChanged() {
    const isAdaptiveMode = this._isShrinkView();
    const currentAdaptiveMode = this._currentAdaptiveMode;
    if (isAdaptiveMode !== currentAdaptiveMode) {
      this._currentAdaptiveMode = isAdaptiveMode;
      return void 0 !== currentAdaptiveMode;
    }
    return super.isAdaptivityChanged();
  }
  _updateValue(preventDefaultValue) {
    let date = this.dateBoxValue();
    if (!date && !preventDefaultValue) {
      date = /* @__PURE__ */ new Date();
      m_date_utils_default.normalizeTime(date);
    }
    super._updateValue();
    if (this._timeView) {
      date && this._timeView.option("value", date);
      this._timeView.option("use24HourFormat", this._is24HourFormat());
    }
  }
  _isSmallScreen() {
    return getWidth(window2) <= 573;
  }
  _isShrinkView() {
    return !this.dateBox.option("showAnalogClock") || this.dateBox.option("adaptivityEnabled") && this._isSmallScreen();
  }
  _getBoxItems() {
    const items = [{
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      name: "calendar"
    }];
    if (!this._isShrinkView()) {
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: "auto",
        name: "time"
      });
    }
    return items;
  }
  renderPopupContent() {
    super.renderPopupContent();
    this._currentAdaptiveMode = this._isShrinkView();
    const $popupContent = this._getPopup().$content();
    this._box = this.dateBox._createComponent(renderer_default("<div>").appendTo($popupContent), box_default, {
      direction: "row",
      crossAlign: "stretch",
      items: this._getBoxItems(),
      itemTemplate: (function(data2, i, element) {
        const $container = renderer_default("<div>");
        switch (data2.name) {
          case "calendar":
            $container.append(this._widget.$element());
            if (this._isShrinkView()) {
              this._timeView.$element().addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
              $container.append(this._timeView.$element());
            }
            break;
          case "time":
            $container.append(this._timeView.$element());
            renderer_default(element).addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
        }
        return $container;
      }).bind(this)
    });
  }
  popupConfig(popupConfig) {
    const calendarPopupConfig = super.popupConfig(popupConfig);
    return extend(calendarPopupConfig, {
      width: "auto"
    });
  }
  _preventFocusOnPopup(e) {
    if (!renderer_default(e.target).hasClass("dx-texteditor-input")) {
      super._preventFocusOnPopup.apply(this, arguments);
      if (!this.dateBox._hasFocusClass()) {
        this.dateBox.focus();
      }
    }
  }
  _updateDateTime(date) {
    const {
      value: time
    } = this._timeView.option();
    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    return date;
  }
  getValue() {
    let date = this._widget.option("value") ?? this._widget.getContouredDate();
    date = date ? new Date(date) : /* @__PURE__ */ new Date();
    return this._updateDateTime(date);
  }
  dispose() {
    clearTimeout(this._removeMinWidthTimer);
    clearTimeout(this._repaintTimer);
    super.dispose();
  }
};
var m_date_box_strategy_calendar_with_time_default = CalendarWithTimeStrategy;

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/scroll_direction.js
var ScrollDirection = class {
  constructor(direction) {
    this.DIRECTION_HORIZONTAL = "horizontal";
    this.DIRECTION_VERTICAL = "vertical";
    this.DIRECTION_BOTH = "both";
    this.direction = direction ?? DIRECTION_VERTICAL;
  }
  get isHorizontal() {
    return this.direction === DIRECTION_HORIZONTAL || this.direction === DIRECTION_BOTH;
  }
  get isVertical() {
    return this.direction === DIRECTION_VERTICAL || this.direction === DIRECTION_BOTH;
  }
  get isBoth() {
    return this.direction === DIRECTION_BOTH;
  }
};

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/convert_location.js
function convertToLocation(location, direction) {
  if (isPlainObject(location)) {
    const left = ensureDefined(location.left, location.x);
    const top = ensureDefined(location.top, location.y);
    return {
      left: isDefined(left) ? left : void 0,
      top: isDefined(top) ? top : void 0
    };
  }
  const {
    isVertical,
    isHorizontal
  } = new ScrollDirection(direction);
  return {
    left: isHorizontal && isDefined(location) ? location : void 0,
    top: isVertical && isDefined(location) ? location : void 0
  };
}

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_view_roller.js
var DateViewRoller = class extends scrollable_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showScrollbar: "never",
      useNative: false,
      selectedIndex: 0,
      bounceEnabled: false,
      items: [],
      showOnClick: false,
      onClick: null,
      onSelectedIndexChanged: null,
      scrollByContent: true
    });
  }
  _init() {
    super._init();
    this.option("onVisibilityChange", this._visibilityChangedHandler.bind(this));
    this.option("onEnd", this._endActionHandler.bind(this));
  }
  _render() {
    super._render();
    this._renderSelectedItemFrame();
    this.$element().addClass("dx-dateviewroller");
    this._renderContainerClick();
    this._renderItems();
    this._renderSelectedValue();
    this._renderItemsClick();
    this._renderWheelEvent();
    this._renderSelectedIndexChanged();
  }
  _renderSelectedIndexChanged() {
    this._selectedIndexChanged = this._createActionByOption("onSelectedIndexChanged");
  }
  _renderWheelEvent() {
    m_events_engine_default.on(renderer_default(this.container()), "dxmousewheel", ((e) => {
      this._isWheelScrolled = true;
    }));
  }
  _renderContainerClick() {
    if (!this.option("showOnClick")) {
      return;
    }
    const eventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const clickAction = this._createActionByOption("onClick");
    m_events_engine_default.off(renderer_default(this.container()), eventName);
    m_events_engine_default.on(renderer_default(this.container()), eventName, ((e) => {
      clickAction({
        event: e
      });
    }));
  }
  _renderItems() {
    const items = this.option("items") || [];
    let $items = renderer_default();
    renderer_default(this.content()).empty();
    items.forEach(((item) => {
      $items = $items.add(renderer_default("<div>").addClass("dx-dateview-item").append(item));
    }));
    renderer_default(this.content()).append($items);
    this._$items = $items;
    this.update();
  }
  _renderSelectedItemFrame() {
    renderer_default("<div>").addClass("dx-dateview-item-selected-frame").append(renderer_default("<div>").addClass("dx-dateview-item-selected-border")).appendTo(renderer_default(this.container()));
  }
  _renderSelectedValue(selectedIndex) {
    const index = this._fitIndex(selectedIndex ?? this.option("selectedIndex"));
    this._moveTo({
      top: this._getItemPosition(index)
    });
    this._renderActiveStateItem();
  }
  _fitIndex(index) {
    const items = this.option("items") || [];
    const itemCount = items.length;
    if (index >= itemCount) {
      return itemCount - 1;
    }
    if (index < 0) {
      return 0;
    }
    return index;
  }
  _getItemPosition(index) {
    return Math.round(this._itemHeight() * index);
  }
  _renderItemsClick() {
    const itemSelector = this._getItemSelector();
    const eventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    m_events_engine_default.off(this.$element(), eventName, itemSelector);
    m_events_engine_default.on(this.$element(), eventName, itemSelector, this._itemClickHandler.bind(this));
  }
  _getItemSelector() {
    return ".dx-dateview-item";
  }
  _itemClickHandler(e) {
    this.option("selectedIndex", this._itemElementIndex(e.currentTarget));
  }
  _itemElementIndex(itemElement) {
    return this._itemElements().index(itemElement);
  }
  _itemElements() {
    return this.$element().find(this._getItemSelector());
  }
  _renderActiveStateItem() {
    const selectedIndex = this.option("selectedIndex");
    each(this._$items, (function(index) {
      renderer_default(this).toggleClass("dx-dateview-item-selected", selectedIndex === index);
    }));
  }
  _shouldScrollToNeighborItem() {
    return "desktop" === devices_default.real().deviceType && this._isWheelScrolled;
  }
  _moveTo(targetLocation) {
    const {
      top,
      left
    } = convertToLocation(targetLocation);
    const location = this.scrollOffset();
    const delta = {
      x: location.left - left,
      y: location.top - top
    };
    if (this._isVisible() && (delta.x || delta.y)) {
      this._prepareDirections(true);
      if (this._animation && !this._shouldScrollToNeighborItem()) {
        const that = this;
        fx_default.stop(renderer_default(this.content()));
        fx_default.animate(renderer_default(this.content()), {
          duration: 200,
          type: "slide",
          to: {
            top: Math.floor(delta.y)
          },
          complete() {
            resetPosition(renderer_default(that.content()));
            that.handleMove({
              delta
            });
          }
        });
        delete this._animation;
      } else {
        this.handleMove({
          delta
        });
      }
    }
  }
  _validate(e) {
    return this._moveIsAllowed(e);
  }
  _fitSelectedIndexInRange(index) {
    const itemsCount = this.option("items").length;
    return Math.max(Math.min(index, itemsCount - 1), 0);
  }
  _isInNullNeighborhood(x) {
    return -0.1 <= x && x <= 0.1;
  }
  _getSelectedIndexAfterScroll(currentSelectedIndex) {
    const locationTop = this.scrollOffset().top;
    const currentSelectedIndexPosition = currentSelectedIndex * this._itemHeight();
    const dy = locationTop - currentSelectedIndexPosition;
    if (this._isInNullNeighborhood(dy)) {
      return currentSelectedIndex;
    }
    const direction = dy > 0 ? 1 : -1;
    const newSelectedIndex = this._fitSelectedIndexInRange(currentSelectedIndex + direction);
    return newSelectedIndex;
  }
  _getNewSelectedIndex(currentSelectedIndex) {
    if (this._shouldScrollToNeighborItem()) {
      return this._getSelectedIndexAfterScroll(currentSelectedIndex);
    }
    this._animation = true;
    const ratio = this.scrollOffset().top / this._itemHeight();
    return Math.round(ratio);
  }
  _endActionHandler() {
    const currentSelectedIndex = this.option("selectedIndex");
    const newSelectedIndex = this._getNewSelectedIndex(currentSelectedIndex);
    if (newSelectedIndex === currentSelectedIndex) {
      this._renderSelectedValue(newSelectedIndex);
    } else {
      this.option("selectedIndex", newSelectedIndex);
    }
    this._isWheelScrolled = false;
  }
  _itemHeight() {
    const $item = this._$items.first();
    return getHeight($item);
  }
  _toggleActive(state) {
    this.$element().toggleClass("dx-state-active", state);
  }
  _isVisible() {
    return renderer_default(this.container()).is(":visible");
  }
  _fireSelectedIndexChanged(value, previousValue) {
    var _this$_selectedIndexC;
    null === (_this$_selectedIndexC = this._selectedIndexChanged) || void 0 === _this$_selectedIndexC || _this$_selectedIndexC.call(this, {
      value,
      previousValue,
      event: void 0
    });
  }
  _visibilityChanged(visible) {
    super._visibilityChanged(visible);
    this._visibilityChangedHandler(visible);
  }
  _visibilityChangedHandler(visible) {
    if (visible) {
      this._visibilityTimer = setTimeout((() => {
        this._renderSelectedValue(this.option("selectedIndex"));
      }));
    }
    this.toggleActiveState(false);
  }
  toggleActiveState(state) {
    this.$element().toggleClass("dx-dateviewroller-current", state);
  }
  _refreshSelectedIndex() {
    const selectedIndex = this.option("selectedIndex");
    const fitIndex = this._fitIndex(selectedIndex);
    if (fitIndex === selectedIndex) {
      this._renderActiveStateItem();
    } else {
      this.option("selectedIndex", fitIndex);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "selectedIndex":
        this._fireSelectedIndexChanged(args.value, args.previousValue);
        this._renderSelectedValue(args.value);
        break;
      case "items":
        this._renderItems();
        this._refreshSelectedIndex();
        break;
      case "onClick":
      case "showOnClick":
        this._renderContainerClick();
        break;
      case "onSelectedIndexChanged":
        this._renderSelectedIndexChanged();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    clearTimeout(this._visibilityTimer);
    super._dispose();
  }
};
component_registrator_default("dxDateViewRoller", DateViewRoller);
var m_date_view_roller_default = DateViewRoller;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_view.js
var TYPE = {
  date: "date",
  datetime: "datetime",
  time: "time"
};
var ROLLER_TYPE = {
  year: "year",
  month: "month",
  day: "day",
  hours: "hours"
};
var DateView = class extends editor_default {
  _valueOption() {
    const {
      value
    } = this.option();
    const date = new Date(value);
    return !value || isNaN(date) ? this._getDefaultDate() : date;
  }
  _getDefaultDate() {
    const date = /* @__PURE__ */ new Date();
    const {
      type: type2
    } = this.option();
    if (type2 === TYPE.date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return date;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      minDate: m_date_utils_default.MIN_DATEVIEW_DEFAULT_DATE,
      maxDate: m_date_utils_default.MAX_DATEVIEW_DEFAULT_DATE,
      type: TYPE.date,
      value: /* @__PURE__ */ new Date(),
      applyCompactClass: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: (device) => "desktop" !== device.deviceType,
      options: {
        applyCompactClass: true
      }
    }]);
  }
  _render() {
    super._render();
    this.$element().addClass("dx-dateview");
    const {
      type: type2
    } = this.option();
    this._toggleFormatClasses(type2);
    this._toggleCompactClass();
  }
  _toggleFormatClasses(currentFormat, previousFormat) {
    this.$element().addClass(`dx-dateview-${currentFormat}`);
    previousFormat && this.$element().removeClass(`dx-dateview-${previousFormat}`);
  }
  _toggleCompactClass() {
    const {
      applyCompactClass
    } = this.option();
    this.$element().toggleClass("dx-dateview-compact", applyCompactClass);
  }
  _wrapper() {
    return this._$wrapper;
  }
  _renderContentImpl() {
    this._$wrapper = renderer_default("<div>").addClass("dx-dateview-wrapper");
    this._renderRollers();
    this._$wrapper.appendTo(this.$element());
  }
  _renderRollers() {
    if (!this._$rollersContainer) {
      this._$rollersContainer = renderer_default("<div>").addClass("dx-dateview-rollers");
    }
    this._$rollersContainer.empty();
    this._createRollerConfigs();
    this._rollers = {};
    const that = this;
    each(that._rollerConfigs, ((name) => {
      const $roller = renderer_default("<div>").appendTo(that._$rollersContainer).addClass(`dx-dateviewroller-${that._rollerConfigs[name].type}`);
      that._rollers[that._rollerConfigs[name].type] = that._createComponent($roller, m_date_view_roller_default, {
        items: that._rollerConfigs[name].displayItems,
        selectedIndex: that._rollerConfigs[name].selectedIndex,
        showScrollbar: "never",
        scrollByContent: true,
        onStart(e) {
          const roller = e.component;
          roller._toggleActive(true);
          that._setActiveRoller(that._rollerConfigs[name]);
        },
        onEnd(e) {
          const roller = e.component;
          roller._toggleActive(false);
        },
        onClick(e) {
          const roller = e.component;
          roller._toggleActive(true);
          that._setActiveRoller(that._rollerConfigs[name]);
          that._setRollerState(that._rollerConfigs[name], roller.option("selectedIndex"));
          roller._toggleActive(false);
        },
        onSelectedIndexChanged(e) {
          const roller = e.component;
          that._setRollerState(that._rollerConfigs[name], roller.option("selectedIndex"));
        }
      });
    }));
    that._$rollersContainer.appendTo(that._wrapper());
  }
  _createRollerConfigs(type2) {
    const that = this;
    type2 = type2 || that.option("type");
    that._rollerConfigs = {};
    date_default3.getFormatParts(m_date_utils_default.FORMATS_MAP[type2]).forEach(((partName) => {
      that._createRollerConfig(partName);
    }));
  }
  _createRollerConfig(componentName) {
    const componentInfo = m_date_utils_default.DATE_COMPONENTS_INFO[componentName];
    const valueRange = this._calculateRollerConfigValueRange(componentName);
    const {
      startValue
    } = valueRange;
    const {
      endValue
    } = valueRange;
    const {
      formatter
    } = componentInfo;
    const curDate = this._getCurrentDate();
    const config = {
      type: componentName,
      setValue: componentInfo.setter,
      valueItems: [],
      displayItems: [],
      getIndex: (value) => value[componentInfo.getter]() - startValue
    };
    for (let i = startValue; i <= endValue; i++) {
      config.valueItems.push(i);
      config.displayItems.push(formatter(i, curDate));
    }
    config.selectedIndex = config.getIndex(curDate);
    this._rollerConfigs[componentName] = config;
  }
  _setActiveRoller(currentRoller) {
    const activeRoller = currentRoller && this._rollers[currentRoller.type];
    each(this._rollers, (function() {
      this.toggleActiveState(this === activeRoller);
    }));
  }
  _updateRollersPosition() {
    const that = this;
    each(this._rollers, (function(type2) {
      const correctIndex = that._rollerConfigs[type2].getIndex(that._getCurrentDate());
      this.option("selectedIndex", correctIndex);
    }));
  }
  _setRollerState(roller, selectedIndex) {
    if (selectedIndex !== roller.selectedIndex) {
      const rollerValue = roller.valueItems[selectedIndex];
      const {
        setValue
      } = roller;
      let currentValue = new Date(this._getCurrentDate());
      let currentDate = currentValue.getDate();
      const minDate = this.option("minDate");
      const maxDate = this.option("maxDate");
      if (roller.type === ROLLER_TYPE.month) {
        currentDate = Math.min(currentDate, m_date_utils_default.getMaxMonthDay(currentValue.getFullYear(), rollerValue));
      } else if (roller.type === ROLLER_TYPE.year) {
        currentDate = Math.min(currentDate, m_date_utils_default.getMaxMonthDay(rollerValue, currentValue.getMonth()));
      }
      currentValue.setDate(currentDate);
      currentValue[setValue](rollerValue);
      const normalizedDate = date_default.normalizeDate(currentValue, minDate, maxDate);
      currentValue = m_date_utils_default.mergeDates(normalizedDate, currentValue, "time");
      currentValue = date_default.normalizeDate(currentValue, minDate, maxDate);
      this.option("value", currentValue);
      roller.selectedIndex = selectedIndex;
    }
    if (roller.type === ROLLER_TYPE.year) {
      this._refreshRollers();
    }
    if (roller.type === ROLLER_TYPE.month) {
      this._refreshRoller(ROLLER_TYPE.day);
      this._refreshRoller(ROLLER_TYPE.hours);
    }
  }
  _refreshRoller(rollerType) {
    const roller = this._rollers[rollerType];
    if (roller) {
      this._createRollerConfig(rollerType);
      const rollerConfig = this._rollerConfigs[rollerType];
      if (rollerType === ROLLER_TYPE.day || rollerConfig.displayItems.toString() !== roller.option("items").toString()) {
        roller.option({
          items: rollerConfig.displayItems,
          selectedIndex: rollerConfig.selectedIndex
        });
      }
    }
  }
  _getCurrentDate() {
    const curDate = this._valueOption();
    const minDate = this.option("minDate");
    const maxDate = this.option("maxDate");
    return date_default.normalizeDate(curDate, minDate, maxDate);
  }
  _calculateRollerConfigValueRange(componentName) {
    const curDate = this._getCurrentDate();
    const {
      minDate,
      maxDate
    } = this.option();
    const minYear = date_default.sameYear(curDate, minDate);
    const minMonth = minYear && curDate.getMonth() === minDate.getMonth();
    const maxYear = date_default.sameYear(curDate, maxDate);
    const maxMonth = maxYear && curDate.getMonth() === maxDate.getMonth();
    const minHour = minMonth && curDate.getDate() === minDate.getDate();
    const maxHour = maxMonth && curDate.getDate() === maxDate.getDate();
    const componentInfo = m_date_utils_default.DATE_COMPONENTS_INFO[componentName];
    let {
      startValue
    } = componentInfo;
    let {
      endValue
    } = componentInfo;
    if (componentName === ROLLER_TYPE.year) {
      startValue = minDate.getFullYear();
      endValue = maxDate.getFullYear();
    }
    if (componentName === ROLLER_TYPE.month) {
      if (minYear) {
        startValue = minDate.getMonth();
      }
      if (maxYear) {
        endValue = maxDate.getMonth();
      }
    }
    if (componentName === ROLLER_TYPE.day) {
      endValue = m_date_utils_default.getMaxMonthDay(curDate.getFullYear(), curDate.getMonth());
      if (minYear && minMonth) {
        startValue = minDate.getDate();
      }
      if (maxYear && maxMonth) {
        endValue = maxDate.getDate();
      }
    }
    if (componentName === ROLLER_TYPE.hours) {
      startValue = minHour ? minDate.getHours() : startValue;
      endValue = maxHour ? maxDate.getHours() : endValue;
    }
    return {
      startValue,
      endValue
    };
  }
  _refreshRollers() {
    this._refreshRoller(ROLLER_TYPE.month);
    this._refreshRoller(ROLLER_TYPE.day);
    this._refreshRoller(ROLLER_TYPE.hours);
  }
  _optionChanged(args) {
    switch (args.name) {
      case "minDate":
      case "maxDate":
      case "type":
        this._renderRollers();
        this._toggleFormatClasses(args.value, args.previousValue);
        break;
      case "visible":
        super._optionChanged(args);
        if (args.value) {
          this._renderRollers();
        }
        break;
      case "value":
        this.option("value", this._valueOption());
        this._refreshRollers();
        this._updateRollersPosition();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    super._clean();
    delete this._$rollersContainer;
  }
};
component_registrator_default("dxDateView", DateView);
var m_date_view_default = DateView;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.date_view.js
var window3 = getWindow();
var DateViewStrategy = class extends m_date_box_strategy_default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = "DateView";
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      openOnFieldClick: true,
      applyButtonText: message_default.format("OK"),
      "dropDownOptions.showTitle": true
    });
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || m_date_utils_default.FORMATS_MAP[this.dateBox.option("type")];
  }
  popupConfig(config) {
    return {
      toolbarItems: this.dateBox._popupToolbarItemsConfig(),
      onInitialized: config.onInitialized,
      defaultOptionsRules: [{
        device: {
          platform: "android"
        },
        options: {
          width: 333,
          height: 331
        }
      }, {
        device(device) {
          const {
            platform
          } = device;
          return "generic" === platform || "ios" === platform;
        },
        options: {
          width: "auto",
          height: "auto"
        }
      }, {
        device(device) {
          const {
            platform
          } = device;
          const {
            phone
          } = device;
          return "generic" === platform && phone;
        },
        options: {
          width: 333,
          maxWidth: "100%",
          maxHeight: "100%",
          height: "auto",
          position: {
            collision: "flipfit flip"
          }
        }
      }, {
        device: {
          platform: "ios",
          phone: true
        },
        options: {
          width: "100%",
          position: {
            my: "bottom",
            at: "bottom",
            of: window3
          }
        }
      }]
    };
  }
  _renderWidget() {
    if (inputType(this.dateBox.option("mode")) && this.dateBox._isNativeType() || this.dateBox.option("readOnly")) {
      if (this._widget) {
        this._widget.$element().remove();
        this._widget = null;
      }
      return;
    }
    const popup = this._getPopup();
    if (this._widget) {
      this._widget.option(this._getWidgetOptions());
    } else {
      const element = renderer_default("<div>").appendTo(popup.$content());
      this._widget = this._createWidget(element);
    }
    this._widget.$element().appendTo(this._getWidgetContainer());
  }
  _getWidgetName() {
    return m_date_view_default;
  }
  renderOpenedState() {
    super.renderOpenedState();
    if (this._widget) {
      this._widget.option("value", this._widget._getCurrentDate());
    }
  }
  _getWidgetOptions() {
    return {
      value: this.dateBoxValue() || /* @__PURE__ */ new Date(),
      type: this.dateBox.option("type"),
      minDate: this.dateBox.dateOption("min") || new Date(1900, 0, 1),
      maxDate: this.dateBox.dateOption("max") || new Date(Date.now() + 50 * m_date_utils_default.ONE_YEAR),
      onDisposing: (function() {
        this._widget = null;
      }).bind(this)
    };
  }
};
var m_date_box_strategy_date_view_default = DateViewStrategy;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.list.js
var window4 = getWindow();
var BOUNDARY_VALUES = {
  min: new Date(0, 0, 0, 0, 0),
  max: new Date(0, 0, 0, 23, 59)
};
var ListStrategy = class extends m_date_box_strategy_default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = "List";
  }
  supportedKeys() {
    return {
      space: noop,
      home: noop,
      end: noop
    };
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      applyValueMode: "instantly"
    });
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || "shorttime";
  }
  popupConfig(popupConfig) {
    return popupConfig;
  }
  getValue() {
    const selectedIndex = this._widget.option("selectedIndex");
    if (-1 === selectedIndex) {
      return this.dateBox.option("value");
    }
    const itemData = this._widgetItems[selectedIndex];
    return this._getDateByItemData(itemData);
  }
  useCurrentDateByDefault() {
    return true;
  }
  getDefaultDate() {
    return /* @__PURE__ */ new Date(null);
  }
  popupShowingHandler() {
    this.dateBox._dimensionChanged();
  }
  _renderWidget() {
    super._renderWidget();
    this._refreshItems();
  }
  _getWidgetName() {
    return list_edit_search_default;
  }
  _getWidgetOptions() {
    return {
      itemTemplate: this._timeListItemTemplate.bind(this),
      onItemClick: this._listItemClickHandler.bind(this),
      tabIndex: -1,
      onFocusedItemChanged: this._refreshActiveDescendant.bind(this),
      selectionMode: "single"
    };
  }
  _refreshActiveDescendant(e) {
    this.dateBox.setAria("activedescendant", "");
    this.dateBox.setAria("activedescendant", e.actionValue);
  }
  _refreshItems() {
    this._widgetItems = this._getTimeListItems();
    this._widget.option("items", this._widgetItems);
  }
  renderOpenedState() {
    if (!this._widget) {
      return;
    }
    this._widget.option("focusedElement", null);
    this._setSelectedItemsByValue();
    if (this._widget.option("templatesRenderAsynchronously")) {
      this._asyncScrollTimeout = setTimeout(this._scrollToSelectedItem.bind(this));
    } else {
      this._scrollToSelectedItem();
    }
  }
  dispose() {
    super.dispose();
    clearTimeout(this._asyncScrollTimeout);
  }
  _updateValue() {
    if (!this._widget) {
      return;
    }
    this._refreshItems();
    this._setSelectedItemsByValue();
    this._scrollToSelectedItem();
  }
  _setSelectedItemsByValue() {
    const value = this.dateBoxValue();
    const dateIndex = this._getDateIndex(value);
    if (-1 === dateIndex) {
      this._widget.option("selectedItems", []);
    } else {
      this._widget.option("selectedIndex", dateIndex);
    }
  }
  _scrollToSelectedItem() {
    this._widget.scrollToItem(this._widget.option("selectedIndex"));
  }
  _getDateIndex(date) {
    let result = -1;
    for (let i = 0, n = this._widgetItems.length; i < n; i++) {
      if (this._areDatesEqual(date, this._widgetItems[i])) {
        result = i;
        break;
      }
    }
    return result;
  }
  _areDatesEqual(first, second) {
    return isDate(first) && isDate(second) && first.getHours() === second.getHours() && first.getMinutes() === second.getMinutes();
  }
  _getTimeListItems() {
    let min = this.dateBox.dateOption("min") || this._getBoundaryDate("min");
    const max = this.dateBox.dateOption("max") || this._getBoundaryDate("max");
    const value = this.dateBox.dateOption("value") || null;
    let delta = max - min;
    const minutes = min.getMinutes() % this.dateBox.option("interval");
    if (delta < 0) {
      return [];
    }
    if (delta > m_date_utils_default.ONE_DAY) {
      delta = m_date_utils_default.ONE_DAY;
    }
    if (value - min < m_date_utils_default.ONE_DAY) {
      return this._getRangeItems(min, new Date(min), delta);
    }
    min = this._getBoundaryDate("min");
    min.setMinutes(minutes);
    if (value && Math.abs(value - max) < m_date_utils_default.ONE_DAY) {
      delta = (60 * max.getHours() + Math.abs(max.getMinutes() - minutes)) * m_date_utils_default.ONE_MINUTE;
    }
    return this._getRangeItems(min, new Date(min), delta);
  }
  _getRangeItems(startValue, currentValue, rangeDuration) {
    const rangeItems = [];
    const interval = this.dateBox.option("interval");
    while (currentValue - startValue <= rangeDuration) {
      rangeItems.push(new Date(currentValue));
      currentValue.setMinutes(currentValue.getMinutes() + interval);
    }
    return rangeItems;
  }
  _getBoundaryDate(boundary) {
    const boundaryValue = BOUNDARY_VALUES[boundary];
    const currentValue = new Date(ensureDefined(this.dateBox.dateOption("value"), 0));
    return new Date(currentValue.getFullYear(), currentValue.getMonth(), currentValue.getDate(), boundaryValue.getHours(), boundaryValue.getMinutes());
  }
  _timeListItemTemplate(itemData) {
    const displayFormat = this.dateBox.option("displayFormat");
    return date_default3.format(itemData, this.getDisplayFormat(displayFormat));
  }
  _listItemClickHandler(e) {
    if ("useButtons" === this.dateBox.option("applyValueMode")) {
      return;
    }
    const date = this._getDateByItemData(e.itemData);
    this.dateBox.option("opened", false);
    this.dateBoxValue(date, e.event);
  }
  _getDateByItemData(itemData) {
    let date = this.dateBox.option("value");
    const hours = itemData.getHours();
    const minutes = itemData.getMinutes();
    const seconds = itemData.getSeconds();
    const year = itemData.getFullYear();
    const month = itemData.getMonth();
    const day = itemData.getDate();
    if (date) {
      if (this.dateBox.option("dateSerializationFormat")) {
        date = date_serialization_default.deserializeDate(date);
      } else {
        date = new Date(date);
      }
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      date.setFullYear(year);
      date.setMonth(month);
      date.setDate(day);
    } else {
      date = new Date(year, month, day, hours, minutes, 0, 0);
    }
    return date;
  }
  getKeyboardListener() {
    return this._widget;
  }
  _updatePopupHeight() {
    var _this$dateBox$_timeLi;
    const dropDownOptionsHeight = getSizeValue(this.dateBox.option("dropDownOptions.height"));
    if (void 0 === dropDownOptionsHeight || "auto" === dropDownOptionsHeight) {
      this.dateBox._setPopupOption("height", "auto");
      const popupHeight = getOuterHeight(this._widget.$element());
      const maxHeight = 0.45 * getHeight(window4);
      this.dateBox._setPopupOption("height", Math.min(popupHeight, maxHeight));
    }
    null === (_this$dateBox$_timeLi = this.dateBox._timeList) || void 0 === _this$dateBox$_timeLi || _this$dateBox$_timeLi.updateDimensions();
  }
  getParsedText(text, format2) {
    let value = super.getParsedText(text, format2);
    if (value) {
      value = m_date_utils_default.mergeDates(value, /* @__PURE__ */ new Date(null), "date");
    }
    return value;
  }
};
var m_date_box_strategy_list_default = ListStrategy;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.strategy.native.js
var NativeStrategy = class extends m_date_box_strategy_default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = "Native";
  }
  popupConfig(popupConfig) {
    return _extends({}, popupConfig, {
      width: "auto"
    });
  }
  getParsedText(text) {
    if (!text) {
      return null;
    }
    if ("datetime" === this.dateBox.option("type")) {
      return new Date(text.replace(/-/g, "/").replace("T", " ").split(".")[0]);
    }
    return m_date_utils_default.fromStandardDateFormat(text);
  }
  renderPopupContent() {
  }
  _getWidgetName() {
  }
  _getWidgetOptions() {
  }
  _getDateBoxType() {
    let {
      type: type2
    } = this.dateBox.option();
    if (!m_date_utils_default.SUPPORTED_FORMATS.includes(type2)) {
      type2 = "date";
    } else if ("datetime" === type2 && !inputType(type2)) {
      type2 = "datetime-local";
    }
    return type2;
  }
  customizeButtons() {
    const dropDownButton = this.dateBox.getButton("dropDown");
    if (devices_default.real().android && dropDownButton) {
      dropDownButton.on("click", (() => {
        this.dateBox._input().get(0).click();
      }));
    }
  }
  getDefaultOptions() {
    return {
      mode: this._getDateBoxType()
    };
  }
  getDisplayFormat(displayFormat) {
    const type2 = this._getDateBoxType();
    return displayFormat || m_date_utils_default.FORMATS_MAP[type2];
  }
  renderInputMinMax($input) {
    const type2 = this.dateBox.option("type");
    const format2 = {
      datetime: "yyyy-MM-ddTHH:mm:ss",
      date: "yyyy-MM-dd",
      time: "HH:mm:ss"
    }[type2] ?? "yyyy-MM-dd";
    $input.attr({
      min: date_serialization_default.serializeDate(this.dateBox.dateOption("min"), format2),
      max: date_serialization_default.serializeDate(this.dateBox.dateOption("max"), format2)
    });
  }
};
var m_date_box_strategy_native_default = NativeStrategy;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.base.js
var window5 = getWindow();
var DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var DX_CLEAR_BUTTON_CLASS = "dx-clear-button-area";
var PICKER_TYPE = {
  calendar: "calendar",
  rollers: "rollers",
  list: "list",
  native: "native"
};
var TYPE2 = {
  date: "date",
  datetime: "datetime",
  time: "time"
};
var STRATEGY_NAME = {
  calendar: "Calendar",
  dateView: "DateView",
  native: "Native",
  calendarWithTime: "CalendarWithTime",
  list: "List"
};
var STRATEGY_CLASSES = {
  Calendar: m_date_box_strategy_calendar_default,
  DateView: m_date_box_strategy_date_view_default,
  Native: m_date_box_strategy_native_default,
  CalendarWithTime: m_date_box_strategy_calendar_with_time_default,
  List: m_date_box_strategy_list_default
};
var DateBox = class extends m_drop_down_editor_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), this._strategy.supportedKeys());
  }
  _renderButtonContainers() {
    super._renderButtonContainers.apply(this, arguments);
    this._strategy.customizeButtons();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      type: "date",
      showAnalogClock: true,
      value: null,
      displayFormat: null,
      interval: 30,
      disabledDates: null,
      pickerType: PICKER_TYPE.calendar,
      invalidDateMessage: message_default.format("dxDateBox-validation-datetime"),
      dateOutOfRangeMessage: message_default.format("validation-range"),
      applyButtonText: message_default.format("OK"),
      adaptivityEnabled: false,
      calendarOptions: {},
      useHiddenSubmitElement: true,
      _showValidationIcon: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "ios"
      },
      options: {
        "dropDownOptions.showTitle": true
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        buttonsLocation: "bottom after"
      }
    }, {
      device() {
        const realDevice = devices_default.real();
        const {
          platform
        } = realDevice;
        return "ios" === platform || "android" === platform;
      },
      options: {
        pickerType: PICKER_TYPE.native
      }
    }, {
      device: {
        platform: "generic",
        deviceType: "desktop"
      },
      options: {
        buttonsLocation: "bottom after"
      }
    }]);
  }
  _initOptions(options) {
    this._userOptions = extend({}, options);
    super._initOptions(options);
    this._updatePickerOptions();
  }
  _updatePickerOptions() {
    let {
      pickerType
    } = this.option();
    const {
      type: type2
    } = this.option();
    if (pickerType === PICKER_TYPE.list && (type2 === TYPE2.datetime || type2 === TYPE2.date)) {
      pickerType = PICKER_TYPE.calendar;
    }
    if (type2 === TYPE2.time && pickerType === PICKER_TYPE.calendar) {
      pickerType = PICKER_TYPE.list;
    }
    this._pickerType = pickerType;
    this._setShowDropDownButtonOption();
  }
  _setShowDropDownButtonOption() {
    const {
      platform
    } = devices_default.real();
    const isMozillaOnAndroid = "android" === platform && browser_default.mozilla;
    const isNativePickerType = this._isNativeType();
    let showDropDownButton = "generic" !== platform || !isNativePickerType;
    if (isNativePickerType && isMozillaOnAndroid) {
      showDropDownButton = false;
    }
    this.option({
      showDropDownButton
    });
  }
  _init() {
    this._initStrategy();
    this.option(extend({}, this._strategy.getDefaultOptions(), this._userOptions));
    delete this._userOptions;
    super._init();
  }
  _toLowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.substr(1);
  }
  _initStrategy() {
    const strategyName = this._getStrategyName(this._getFormatType());
    const strategy = STRATEGY_CLASSES[strategyName];
    if (!(this._strategy && this._strategy.NAME === strategyName)) {
      this._strategy = new strategy(this);
    }
  }
  _getFormatType() {
    const currentType = this.option("type");
    const isTime = /h|m|s/g.test(currentType);
    const isDate2 = /d|M|Y/g.test(currentType);
    let type2 = "";
    if (isDate2) {
      type2 += TYPE2.date;
    }
    if (isTime) {
      type2 += TYPE2.time;
    }
    return type2;
  }
  _getStrategyName(type2) {
    const pickerType = this._pickerType;
    if (pickerType === PICKER_TYPE.rollers) {
      return STRATEGY_NAME.dateView;
    }
    if (pickerType === PICKER_TYPE.native) {
      return STRATEGY_NAME.native;
    }
    if (type2 === TYPE2.date) {
      return STRATEGY_NAME.calendar;
    }
    if (type2 === TYPE2.datetime) {
      return STRATEGY_NAME.calendarWithTime;
    }
    return STRATEGY_NAME.list;
  }
  _initMarkup() {
    this.$element().addClass("dx-datebox");
    super._initMarkup();
    this._refreshFormatClass();
    this._refreshPickerTypeClass();
    this._strategy.renderInputMinMax(this._input());
  }
  _render() {
    super._render();
    this._formatValidationIcon();
  }
  _renderDimensions() {
    super._renderDimensions();
    this.$element().toggleClass("dx-auto-width", !this.option("width"));
    this._updatePopupWidth();
    this._updatePopupHeight();
  }
  _dimensionChanged() {
    super._dimensionChanged();
    this._updatePopupHeight();
  }
  _updatePopupHeight() {
    if (this._popup) {
      var _this$_strategy$_upda, _this$_strategy;
      null === (_this$_strategy$_upda = (_this$_strategy = this._strategy)._updatePopupHeight) || void 0 === _this$_strategy$_upda || _this$_strategy$_upda.call(_this$_strategy);
    }
  }
  _refreshFormatClass() {
    const $element = this.$element();
    each(TYPE2, ((_, item) => {
      $element.removeClass(`dx-datebox-${item}`);
    }));
    const {
      type: type2
    } = this.option();
    $element.addClass(`dx-datebox-${type2}`);
  }
  _refreshPickerTypeClass() {
    const $element = this.$element();
    each(PICKER_TYPE, ((_, item) => {
      $element.removeClass(`dx-datebox-${item}`);
    }));
    $element.addClass(`dx-datebox-${this._pickerType}`);
  }
  _formatValidationIcon() {
    if (!hasWindow()) {
      return;
    }
    const inputElement = this._input().get(0);
    const isRtlEnabled = this.option("rtlEnabled");
    const clearButtonWidth = this._getClearButtonWidth();
    const longestElementDimensions = this._getLongestElementDimensions();
    const curWidth = parseFloat(window5.getComputedStyle(inputElement).width) - clearButtonWidth;
    const shouldHideValidationIcon = longestElementDimensions.width > curWidth;
    const {
      style
    } = inputElement;
    const {
      _showValidationIcon: showValidationIcon
    } = this.option();
    this.$element().toggleClass(DX_INVALID_BADGE_CLASS, !shouldHideValidationIcon && showValidationIcon);
    if (shouldHideValidationIcon) {
      if (void 0 === this._storedPadding) {
        this._storedPadding = isRtlEnabled ? longestElementDimensions.leftPadding : longestElementDimensions.rightPadding;
      }
      isRtlEnabled ? style.paddingLeft = 0 : style.paddingRight = 0;
    } else {
      isRtlEnabled ? style.paddingLeft = `${this._storedPadding}px` : style.paddingRight = `${this._storedPadding}px`;
    }
  }
  _getClearButtonWidth() {
    let clearButtonWidth = 0;
    if (this._isClearButtonVisible() && "" === this._input().val()) {
      const clearButtonElement = this.$element().find(`.${DX_CLEAR_BUTTON_CLASS}`).get(0);
      clearButtonWidth = parseFloat(window5.getComputedStyle(clearButtonElement).width);
    }
    return clearButtonWidth;
  }
  _getLongestElementDimensions() {
    const format2 = this._strategy.getDisplayFormat(this.option("displayFormat"));
    const longestValue = date_default3.format(m_date_utils_default.getLongestDate(format2, date_default3.getMonthNames(), date_default3.getDayNames()), format2);
    const $input = this._input();
    const inputElement = $input.get(0);
    const $longestValueElement = createTextElementHiddenCopy($input, longestValue);
    const isPaddingStored = void 0 !== this._storedPadding;
    const storedPadding = !isPaddingStored ? 0 : this._storedPadding;
    $longestValueElement.appendTo(this.$element());
    const elementWidth = parseFloat(window5.getComputedStyle($longestValueElement.get(0)).width);
    const rightPadding = parseFloat(window5.getComputedStyle(inputElement).paddingRight);
    const leftPadding = parseFloat(window5.getComputedStyle(inputElement).paddingLeft);
    const necessaryWidth = elementWidth + leftPadding + rightPadding + storedPadding;
    $longestValueElement.remove();
    return {
      width: necessaryWidth,
      leftPadding,
      rightPadding
    };
  }
  _getKeyboardListeners() {
    var _this$_strategy2;
    return super._getKeyboardListeners().concat([null === (_this$_strategy2 = this._strategy) || void 0 === _this$_strategy2 ? void 0 : _this$_strategy2.getKeyboardListener()]);
  }
  _renderPopup() {
    var _this$_popup;
    super._renderPopup();
    null === (_this$_popup = this._popup) || void 0 === _this$_popup || _this$_popup.$wrapper().addClass("dx-datebox-wrapper");
    this._renderPopupWrapper();
  }
  _getPopupToolbarItems() {
    var _this$_strategy$_getP, _this$_strategy3;
    const defaultItems = super._getPopupToolbarItems();
    return (null === (_this$_strategy$_getP = (_this$_strategy3 = this._strategy)._getPopupToolbarItems) || void 0 === _this$_strategy$_getP ? void 0 : _this$_strategy$_getP.call(_this$_strategy3, defaultItems)) ?? defaultItems;
  }
  _popupConfig() {
    const popupConfig = super._popupConfig();
    return _extends({}, this._strategy.popupConfig(popupConfig), {
      title: this._getPopupTitle(),
      dragEnabled: false
    });
  }
  _renderPopupWrapper() {
    if (!this._popup) {
      return;
    }
    const $element = this.$element();
    const classPostfixes = extend({}, TYPE2, PICKER_TYPE);
    each(classPostfixes, ((_, item) => {
      $element.removeClass(`dx-datebox-wrapper-${item}`);
    }));
    const {
      type: type2
    } = this.option();
    this._popup.$wrapper().addClass(`dx-datebox-wrapper-${type2}`).addClass(`dx-datebox-wrapper-${this._pickerType}`).addClass("dx-dropdowneditor-overlay");
  }
  _renderPopupContent() {
    super._renderPopupContent();
    this._strategy.renderPopupContent();
  }
  _popupShowingHandler() {
    super._popupShowingHandler();
    this._strategy.popupShowingHandler();
  }
  _popupShownHandler() {
    super._popupShownHandler();
    this._strategy.renderOpenedState();
  }
  _popupHiddenHandler() {
    super._popupHiddenHandler();
    this._strategy.renderOpenedState();
    this._strategy.popupHiddenHandler();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._formatValidationIcon();
    }
  }
  _clearValueHandler(e) {
    this.option("text", "");
    super._clearValueHandler(e);
  }
  _readOnlyPropValue() {
    if (this._pickerType === PICKER_TYPE.rollers) {
      return true;
    }
    const {
      platform
    } = devices_default.real();
    const isCustomValueDisabled = this._isNativeType() && ("ios" === platform || "android" === platform);
    if (isCustomValueDisabled) {
      const {
        readOnly
      } = this.option();
      return readOnly;
    }
    return super._readOnlyPropValue();
  }
  _isClearButtonVisible() {
    return super._isClearButtonVisible() && !this._isNativeType();
  }
  _renderValue() {
    const value = this.dateOption("value");
    this.option("text", this._getDisplayedText(value));
    this._strategy.renderValue();
    return super._renderValue();
  }
  _setSubmitValue() {
    const value = this.dateOption("value");
    const {
      type: type2,
      dateSerializationFormat
    } = this.option();
    const submitFormat = m_date_utils_default.SUBMIT_FORMATS_MAP[type2];
    const submitValue = dateSerializationFormat ? date_serialization_default.serializeDate(value, dateSerializationFormat) : m_date_utils_default.toStandardDateFormat(value, submitFormat);
    this._getSubmitElement().val(submitValue);
  }
  _getDisplayedText(value) {
    const {
      mode
    } = this.option();
    let displayedText;
    if ("text" === mode) {
      const displayFormat = this._strategy.getDisplayFormat(this.option("displayFormat"));
      displayedText = date_default3.format(value, displayFormat);
    } else {
      const format2 = this._getFormatByMode(mode);
      if (format2) {
        displayedText = date_default3.format(value, format2);
      } else {
        displayedText = m_date_utils_default.toStandardDateFormat(value, mode);
      }
    }
    return displayedText;
  }
  _getFormatByMode(mode) {
    return inputType(mode) ? null : m_date_utils_default.FORMATS_MAP[mode];
  }
  _valueChangeEventHandler(e) {
    const {
      text,
      type: type2,
      validationError
    } = this.option();
    const currentValue = this.dateOption("value");
    if (text === this._getDisplayedText(currentValue)) {
      this._recallInternalValidation(currentValue, validationError);
      return;
    }
    const parsedDate = this._getParsedDate(text);
    const value = currentValue ?? this._getDateByDefault();
    const newValue = m_date_utils_default.mergeDates(value, parsedDate, type2);
    const date = parsedDate && "time" === type2 ? newValue : parsedDate;
    if (this._applyInternalValidation(date).isValid) {
      const displayedText = this._getDisplayedText(newValue);
      if (value && newValue && value.getTime() === newValue.getTime() && displayedText !== text) {
        this._renderValue();
      } else {
        this.dateValue(newValue, e);
      }
    }
  }
  _recallInternalValidation(value, validationError) {
    if (!validationError || validationError.editorSpecific) {
      this._applyInternalValidation(value);
      this._applyCustomValidation(value);
    }
  }
  _getDateByDefault() {
    return this._strategy.useCurrentDateByDefault() && this._strategy.getDefaultDate();
  }
  _getParsedDate(text) {
    const displayFormat = this._strategy.getDisplayFormat(this.option("displayFormat"));
    const parsedText = this._strategy.getParsedText(text, displayFormat);
    return parsedText ?? void 0;
  }
  _applyInternalValidation(value) {
    const text = this.option("text");
    const hasText = !!text && null !== value;
    const isDate2 = !!value && isDate(value) && !isNaN(value.getTime());
    const isDateInRange = isDate2 && date_default.dateInRange(value, this.dateOption("min"), this.dateOption("max"), this.option("type"));
    const isValid = !hasText && !value || isDateInRange;
    let validationMessage = "";
    const {
      invalidDateMessage,
      dateOutOfRangeMessage
    } = this.option();
    if (!isDate2) {
      validationMessage = invalidDateMessage;
    } else if (!isDateInRange) {
      validationMessage = dateOutOfRangeMessage;
    }
    this._updateInternalValidationState(isValid, validationMessage);
    return {
      isValid,
      isDate: isDate2
    };
  }
  _updateInternalValidationState(isValid, validationMessage) {
    this.option({
      isValid,
      validationError: isValid ? null : {
        editorSpecific: true,
        message: validationMessage
      }
    });
  }
  _applyCustomValidation(value) {
    this.validationRequest.fire({
      editor: this,
      value: this._serializeDate(value)
    });
  }
  _isValueChanged(newValue) {
    const oldValue = this.dateOption("value");
    const oldTime = oldValue && oldValue.getTime();
    const newTime = newValue && newValue.getTime();
    return oldTime !== newTime;
  }
  _isTextChanged(newValue) {
    const oldText = this.option("text");
    const newText = newValue && this._getDisplayedText(newValue) || "";
    return oldText !== newText;
  }
  _renderProps() {
    super._renderProps();
    this._input().attr("autocomplete", "off");
  }
  _renderOpenedState() {
    if (!this._isNativeType()) {
      super._renderOpenedState();
    }
    if (this._strategy.isAdaptivityChanged()) {
      this._refreshStrategy();
    }
  }
  _getPopupTitle() {
    const {
      placeholder
    } = this.option();
    if (placeholder) {
      return placeholder;
    }
    const {
      type: type2
    } = this.option();
    if (type2 === TYPE2.time) {
      return message_default.format("dxDateBox-simulatedDataPickerTitleTime");
    }
    if (type2 === TYPE2.date || type2 === TYPE2.datetime) {
      return message_default.format("dxDateBox-simulatedDataPickerTitleDate");
    }
    return "";
  }
  _refreshStrategy() {
    this._strategy.dispose();
    this._initStrategy();
    this.option(this._strategy.getDefaultOptions());
    this._refresh();
  }
  _applyButtonHandler(e) {
    const value = this._strategy.getValue();
    this.dateValue(value, e.event);
    super._applyButtonHandler();
  }
  _dispose() {
    var _this$_strategy4;
    super._dispose();
    null === (_this$_strategy4 = this._strategy) || void 0 === _this$_strategy4 || _this$_strategy4.dispose();
  }
  _isNativeType() {
    return this._pickerType === PICKER_TYPE.native;
  }
  _updatePopupTitle() {
    var _this$_popup2;
    null === (_this$_popup2 = this._popup) || void 0 === _this$_popup2 || _this$_popup2.option("title", this._getPopupTitle());
  }
  _optionChanged(args) {
    switch (args.name) {
      case "showClearButton":
      case "buttons":
      case "isValid":
      case "readOnly":
        super._optionChanged.apply(this, arguments);
        this._formatValidationIcon();
        break;
      case "pickerType":
        this._updatePickerOptions();
        this._refreshStrategy();
        this._refreshPickerTypeClass();
        this._invalidate();
        break;
      case "type":
        this._updatePickerOptions();
        this._refreshStrategy();
        this._refreshFormatClass();
        this._renderPopupWrapper();
        this._formatValidationIcon();
        this._updateValue();
        break;
      case "placeholder":
        super._optionChanged.apply(this, arguments);
        this._updatePopupTitle();
        break;
      case "min":
      case "max": {
        const isValid = this.option("isValid");
        this._applyInternalValidation(this.dateOption("value"));
        if (!isValid) {
          this._applyCustomValidation(this.dateOption("value"));
        }
        this._invalidate();
        break;
      }
      case "dateSerializationFormat":
      case "interval":
      case "disabledDates":
      case "calendarOptions":
      case "todayButtonText":
        this._invalidate();
        break;
      case "displayFormat":
        this.option("text", this._getDisplayedText(this.dateOption("value")));
        this._renderInputValue();
        break;
      case "text":
        this._strategy.textChangedHandler(args.value);
        super._optionChanged.apply(this, arguments);
        break;
      case "showDropDownButton":
        this._formatValidationIcon();
        super._optionChanged.apply(this, arguments);
        break;
      case "invalidDateMessage":
      case "dateOutOfRangeMessage":
      case "adaptivityEnabled":
      case "showAnalogClock":
      case "_showValidationIcon":
        break;
      default:
        super._optionChanged.apply(this, arguments);
    }
  }
  _getSerializationFormat() {
    const {
      value
    } = this.option();
    if (this.option("dateSerializationFormat") && config_default().forceIsoDateParsing) {
      return this.option("dateSerializationFormat");
    }
    if (isNumeric(value)) {
      return "number";
    }
    if (!isString(value) || "" === value) {
      return;
    }
    return date_serialization_default.getDateSerializationFormat(value);
  }
  _updateValue(value) {
    super._updateValue();
    this._applyInternalValidation(value ?? this.dateOption("value"));
  }
  dateValue(value, dxEvent) {
    const isValueChanged = this._isValueChanged(value);
    if (isValueChanged && dxEvent) {
      this._saveValueChangeEvent(dxEvent);
    }
    if (!isValueChanged) {
      const {
        text
      } = this.option();
      if (this._isTextChanged(value)) {
        this._updateValue(value);
      } else if ("" === text) {
        this._applyCustomValidation(value);
      }
    }
    return this.dateOption("value", value);
  }
  dateOption(optionName, value) {
    if (1 === arguments.length) {
      return date_serialization_default.deserializeDate(this.option(optionName));
    }
    this.option(optionName, this._serializeDate(value));
  }
  _serializeDate(date) {
    const serializationFormat = this._getSerializationFormat();
    return date_serialization_default.serializeDate(date, serializationFormat);
  }
  _clearValue() {
    const value = this.option("value");
    super._clearValue();
    if (null === value) {
      this._applyCustomValidation(null);
    }
  }
  clear() {
    const value = this.option("value");
    super.clear();
    if (null === value) {
      this._applyInternalValidation(null);
    }
  }
};
var m_date_box_base_default = DateBox;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.mask.parts.js
var monthGetter = (date) => date.getMonth() + 1;
var monthSetter = (date, value) => {
  const day = date.getDate();
  const monthLimits = getLimits("M", date);
  const newValue = fitIntoRange(parseInt(value), monthLimits.min, monthLimits.max);
  date.setMonth(newValue - 1, 1);
  const {
    min,
    max
  } = getLimits("dM", date);
  const newDay = fitIntoRange(day, min, max);
  date.setDate(newDay);
};
var PATTERN_GETTERS = {
  a: (date) => date.getHours() < 12 ? 0 : 1,
  E: "getDay",
  y: "getFullYear",
  M: monthGetter,
  L: monthGetter,
  d: "getDate",
  H: "getHours",
  h: "getHours",
  m: "getMinutes",
  s: "getSeconds",
  S: "getMilliseconds",
  x: "getTimezoneOffset"
};
var PATTERN_SETTERS2 = extend({}, getPatternSetters(), {
  a: (date, value) => {
    const hours = date.getHours();
    const current2 = hours >= 12;
    if (current2 === !!parseInt(value)) {
      return;
    }
    date.setHours((hours + 12) % 24);
  },
  d: (date, value) => {
    const lastDayInMonth = getLimits("dM", date).max;
    if (value > lastDayInMonth) {
      date.setMonth(date.getMonth() + 1);
    }
    date.setDate(value);
  },
  h: (date, value) => {
    const isPM = date.getHours() >= 12;
    date.setHours(+value % 12 + (isPM ? 12 : 0));
  },
  M: monthSetter,
  L: monthSetter,
  E: (date, value) => {
    if (value < 0) {
      return;
    }
    date.setDate(date.getDate() - date.getDay() + parseInt(value));
  },
  y: (date, value) => {
    const currentYear = date.getFullYear();
    const valueLength = String(value).length;
    const maxLimitLength = String(getLimits("y", date).max).length;
    const newValue = parseInt(String(currentYear).substr(0, maxLimitLength - valueLength) + value);
    date.setFullYear(newValue);
  },
  x: (date) => date
});
var getPatternGetter = (patternChar) => PATTERN_GETTERS[patternChar] || (() => patternChar);
var renderDateParts = (text, regExpInfo) => {
  const result = regExpInfo.regexp.exec(text);
  let start = 0;
  let end = 0;
  const sections = [];
  for (let i = 1; i < result.length; i++) {
    start = end;
    end = start + result[i].length;
    const pattern = regExpInfo.patterns[i - 1].replace(/^'|'$/g, "");
    const getter = getPatternGetter(pattern[0]);
    sections.push({
      index: i - 1,
      isStub: pattern === result[i],
      caret: {
        start,
        end
      },
      pattern,
      text: result[i],
      limits: function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return getLimits(pattern[0], ...args);
      },
      setter: PATTERN_SETTERS2[pattern[0]] || noop,
      getter
    });
  }
  return sections;
};
var getLimits = (pattern, date, forcedPattern) => {
  const limits = {
    y: {
      min: 0,
      max: 9999
    },
    M: {
      min: 1,
      max: 12
    },
    L: {
      min: 1,
      max: 12
    },
    d: {
      min: 1,
      max: 31
    },
    dM: {
      min: 1,
      max: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    },
    E: {
      min: 0,
      max: 6
    },
    H: {
      min: 0,
      max: 23
    },
    h: {
      min: 1,
      max: 12
    },
    m: {
      min: 0,
      max: 59
    },
    s: {
      min: 0,
      max: 59
    },
    S: {
      min: 0,
      max: 999
    },
    a: {
      min: 0,
      max: 1
    },
    x: {
      min: 0,
      max: 0
    }
  };
  return limits[forcedPattern || pattern] || limits.getAmPm;
};
var getDatePartIndexByPosition = (dateParts, position) => {
  for (let i = 0; i < dateParts.length; i++) {
    const caretInGroup = dateParts[i].caret.end >= position;
    if (!dateParts[i].isStub && caretInGroup) {
      return i;
    }
  }
  return null;
};

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.mask.js
var DateBoxMask = class extends m_date_box_base_default {
  _supportedKeys() {
    const originalHandlers = super._supportedKeys();
    const callOriginalHandler = (e) => {
      const originalHandler = originalHandlers[normalizeKeyName(e)];
      return null === originalHandler || void 0 === originalHandler ? void 0 : originalHandler.apply(this, [e]);
    };
    const applyHandler = (e, maskHandler) => {
      if (this._shouldUseOriginalHandler(e)) {
        return callOriginalHandler.apply(this, [e]);
      }
      return maskHandler.apply(this, [e]);
    };
    return _extends({}, originalHandlers, {
      del: (e) => applyHandler(e, ((event) => {
        this._revertPart(1);
        this._isAllSelected() || event.preventDefault();
      })),
      backspace: (e) => applyHandler(e, ((event) => {
        this._revertPart(-1);
        this._isAllSelected() || event.preventDefault();
      })),
      home: (e) => applyHandler(e, ((event) => {
        this._selectFirstPart();
        event.preventDefault();
      })),
      end: (e) => applyHandler(e, ((event) => {
        this._selectLastPart();
        event.preventDefault();
      })),
      escape: (e) => applyHandler(e, (() => {
        this._revertChanges();
      })),
      enter: (e) => applyHandler(e, (() => {
        this._enterHandler();
      })),
      leftArrow: (e) => applyHandler(e, ((event) => {
        this._selectNextPart(-1);
        event.preventDefault();
      })),
      rightArrow: (e) => applyHandler(e, ((event) => {
        this._selectNextPart(1);
        event.preventDefault();
      })),
      upArrow: (e) => applyHandler(e, ((event) => {
        this._upDownArrowHandler(1);
        event.preventDefault();
      })),
      downArrow: (e) => applyHandler(e, ((event) => {
        this._upDownArrowHandler(-1);
        event.preventDefault();
      }))
    });
  }
  _shouldUseOriginalHandler(e) {
    const isNotDeletingInCalendar = this.option("opened") && e && !["backspace", "del"].includes(normalizeKeyName(e));
    return !this._useMaskBehavior() || isNotDeletingInCalendar || e && e.altKey;
  }
  _upDownArrowHandler(step) {
    this._setNewDateIfEmpty();
    const originalValue = this._getActivePartValue(this._initialMaskValue);
    const currentValue = this._getActivePartValue();
    const delta = currentValue - originalValue;
    this._loadMaskValue(this._initialMaskValue);
    this._changePartValue(delta + step, true);
  }
  _changePartValue(step, lockOtherParts) {
    const activePartPattern = this._getActivePartProp("pattern");
    const isAmPmPartActive = /^a{1,5}$/.test(activePartPattern);
    if (isAmPmPartActive) {
      this._toggleAmPm();
    } else {
      this._partIncrease(step, lockOtherParts);
    }
  }
  _toggleAmPm() {
    const currentValue = this._getActivePartProp("text");
    const indexOfCurrentValue = default_date_names_default.getPeriodNames().indexOf(currentValue);
    const newValue = 1 ^ indexOfCurrentValue;
    this._setActivePartValue(newValue);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      useMaskBehavior: false,
      emptyDateValue: new Date(2e3, 0, 1, 0, 0, 0)
    });
  }
  _isSingleCharKey(_ref) {
    let {
      originalEvent,
      alt
    } = _ref;
    const key = originalEvent.data || originalEvent.key;
    return "string" === typeof key && 1 === key.length && !alt && !isCommandKeyPressed(originalEvent);
  }
  _isSingleDigitKey(e) {
    var _e$originalEvent;
    const data2 = null === (_e$originalEvent = e.originalEvent) || void 0 === _e$originalEvent ? void 0 : _e$originalEvent.data;
    return 1 === (null === data2 || void 0 === data2 ? void 0 : data2.length) && parseInt(data2, 10);
  }
  _useBeforeInputEvent() {
    return devices_default.real().android;
  }
  _keyInputHandler(e, key) {
    const oldInputValue = this._input().val();
    this._processInputKey(key);
    e.preventDefault();
    const isValueChanged = oldInputValue !== this._input().val();
    isValueChanged && m_events_engine_default.trigger(this._input(), "input");
  }
  _keyboardHandler(e) {
    let {
      key
    } = e.originalEvent;
    const result = super._keyboardHandler(e);
    if (!this._useMaskBehavior() || this._useBeforeInputEvent()) {
      return result;
    }
    if (browser_default.chrome && "Process" === e.key && 0 === e.code.indexOf("Digit")) {
      key = e.code.replace("Digit", "");
      this._processInputKey(key);
      this._maskInputHandler = () => {
        this._renderSelectedPart();
      };
    } else if (this._isSingleCharKey(e)) {
      this._keyInputHandler(e.originalEvent, key);
    }
    return result;
  }
  _maskBeforeInputHandler(e) {
    this._maskInputHandler = null;
    const {
      inputType: inputType2
    } = e.originalEvent;
    if ("insertCompositionText" === inputType2) {
      this._maskInputHandler = () => {
        this._renderSelectedPart();
      };
    }
    const isBackwardDeletion = "deleteContentBackward" === inputType2;
    const isForwardDeletion = "deleteContentForward" === inputType2;
    if (isBackwardDeletion || isForwardDeletion) {
      const direction = isBackwardDeletion ? -1 : 1;
      this._maskInputHandler = () => {
        this._revertPart();
        this._selectNextPart(direction);
      };
    }
    if (!this._useMaskBehavior() || !this._isSingleCharKey(e)) {
      return;
    }
    const key = e.originalEvent.data;
    this._keyInputHandler(e, key);
    return true;
  }
  _keyPressHandler(e) {
    const {
      originalEvent: event
    } = e;
    if ("insertCompositionText" === (null === event || void 0 === event ? void 0 : event.inputType) && this._isSingleDigitKey(e)) {
      this._processInputKey(event.data);
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._selectNextPart();
    }
    super._keyPressHandler(e);
    if (this._maskInputHandler) {
      this._maskInputHandler();
      this._maskInputHandler = null;
    }
  }
  _processInputKey(key) {
    if (this._isAllSelected()) {
      this._activePartIndex = 0;
    }
    this._setNewDateIfEmpty();
    if (isNaN(parseInt(key))) {
      this._searchString(key);
    } else {
      this._searchNumber(key);
    }
  }
  _isAllSelected() {
    const caret = this._caret();
    const {
      text
    } = this.option();
    return caret.end - caret.start === text.length;
  }
  _getFormatPattern() {
    if (this._formatPattern) {
      return this._formatPattern;
    }
    const format2 = this._strategy.getDisplayFormat(this.option("displayFormat"));
    const isLDMLPattern = isString(format2) && !date_default3._getPatternByFormat(format2);
    if (isLDMLPattern) {
      this._formatPattern = format2;
    } else {
      this._formatPattern = getFormat2(((value) => date_default3.format(value, format2)));
    }
    return this._formatPattern;
  }
  _setNewDateIfEmpty() {
    if (!this._maskValue) {
      const {
        type: type2
      } = this.option();
      const value = "time" === type2 ? /* @__PURE__ */ new Date(null) : /* @__PURE__ */ new Date();
      this._maskValue = value;
      this._initialMaskValue = value;
      this._renderDateParts();
    }
  }
  _partLimitsReached(max) {
    const maxLimitLength = String(max).length;
    const formatLength = this._getActivePartProp("pattern").length;
    const isShortFormat = 1 === formatLength;
    const maxSearchLength = isShortFormat ? maxLimitLength : Math.min(formatLength, maxLimitLength);
    const isLengthExceeded = this._searchValue.length === maxSearchLength;
    const isValueOverflowed = parseInt(`${this._searchValue}0`) > max;
    return isLengthExceeded || isValueOverflowed;
  }
  _searchNumber(char) {
    const {
      max
    } = this._getActivePartLimits();
    const maxLimitLength = String(max).length;
    this._searchValue = (this._searchValue + char).substr(-maxLimitLength);
    if (isNaN(this._searchValue)) {
      this._searchValue = char;
    }
    this._setActivePartValue(this._searchValue);
    if (this._partLimitsReached(max)) {
      this._selectNextPart(1);
    }
  }
  _searchString(char) {
    if (!isNaN(parseInt(this._getActivePartProp("text")))) {
      return;
    }
    const limits = this._getActivePartProp("limits")(this._maskValue);
    const startString = this._searchValue + char.toLowerCase();
    const endLimit = limits.max - limits.min;
    for (let i = 0; i <= endLimit; i++) {
      this._loadMaskValue(this._initialMaskValue);
      this._changePartValue(i + 1);
      if (0 === this._getActivePartProp("text").toLowerCase().indexOf(startString)) {
        this._searchValue = startString;
        return;
      }
    }
    this._setNewDateIfEmpty();
    if (this._searchValue) {
      this._clearSearchValue();
      this._searchString(char);
    }
  }
  _clearSearchValue() {
    this._searchValue = "";
  }
  _revertPart(direction) {
    if (!this._isAllSelected()) {
      const actual = this._getActivePartValue(this.option("emptyDateValue"));
      this._setActivePartValue(actual);
      this._selectNextPart(direction);
    }
    this._clearSearchValue();
  }
  _useMaskBehavior() {
    const {
      mode
    } = this.option();
    return this.option("useMaskBehavior") && "text" === mode;
  }
  _prepareRegExpInfo() {
    this._regExpInfo = getRegExpInfo(this._getFormatPattern(), date_default3);
    const {
      regexp
    } = this._regExpInfo;
    const {
      source
    } = regexp;
    const {
      flags
    } = regexp;
    const quantifierRegexp = new RegExp(/(\{[0-9]+,?[0-9]*\})/);
    const convertedSource = source.split(quantifierRegexp).map(((sourcePart) => quantifierRegexp.test(sourcePart) ? sourcePart : number_default.convertDigits(sourcePart, false))).join("");
    this._regExpInfo.regexp = new RegExp(convertedSource, flags);
  }
  _initMaskState() {
    this._activePartIndex = 0;
    this._formatPattern = null;
    this._prepareRegExpInfo();
    this._loadMaskValue();
  }
  _renderMask() {
    super._renderMask();
    this._detachMaskEvents();
    this._clearMaskState();
    if (this._useMaskBehavior()) {
      this._attachMaskEvents();
      this._initMaskState();
      this._renderDateParts();
    }
  }
  _renderDateParts() {
    if (!this._useMaskBehavior()) {
      return;
    }
    const text = this.option("text") || this._getDisplayedText(this._maskValue);
    if (text) {
      this._dateParts = renderDateParts(text, this._regExpInfo);
      if (!this._input().is(":hidden")) {
        this._selectNextPart();
      }
    }
  }
  _detachMaskEvents() {
    m_events_engine_default.off(this._input(), ".dateBoxMask");
  }
  _attachMaskEvents() {
    m_events_engine_default.on(this._input(), addNamespace("dxclick", "dateBoxMask"), this._maskClickHandler.bind(this));
    m_events_engine_default.on(this._input(), addNamespace("paste", "dateBoxMask"), this._maskPasteHandler.bind(this));
    m_events_engine_default.on(this._input(), addNamespace("drop", "dateBoxMask"), (() => {
      this._renderSelectedPart();
    }));
    m_events_engine_default.on(this._input(), addNamespace("compositionend", "dateBoxMask"), this._maskCompositionEndHandler.bind(this));
    if (this._useBeforeInputEvent()) {
      m_events_engine_default.on(this._input(), addNamespace("beforeinput", "dateBoxMask"), this._maskBeforeInputHandler.bind(this));
    }
  }
  _renderSelectedPart() {
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
  }
  _selectLastPart() {
    if (this.option("text")) {
      this._activePartIndex = this._dateParts.length;
      this._selectNextPart(-1);
    }
  }
  _selectFirstPart() {
    if (this.option("text") && this._dateParts) {
      this._activePartIndex = -1;
      this._selectNextPart(1);
    }
  }
  _hasMouseWheelHandler() {
    return true;
  }
  _onMouseWheel(e) {
    if (this._useMaskBehavior()) {
      this._partIncrease(e.delta > 0 ? 1 : -1, e);
    }
  }
  _selectNextPart() {
    let step = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    if (!this.option("text") || this._disposed) {
      return;
    }
    if (step) {
      this._initialMaskValue = new Date(this._maskValue);
    }
    let index = fitIntoRange(this._activePartIndex + step, 0, this._dateParts.length - 1);
    if (this._dateParts[index].isStub) {
      const isBoundaryIndex = 0 === index && step < 0 || index === this._dateParts.length - 1 && step > 0;
      if (!isBoundaryIndex) {
        this._selectNextPart(step >= 0 ? step + 1 : step - 1);
        return;
      }
      index = this._activePartIndex;
    }
    if (this._activePartIndex !== index) {
      this._clearSearchValue();
    }
    this._activePartIndex = index;
    this._caret(this._getActivePartProp("caret"));
  }
  _getRealLimitsPattern() {
    if ("d" === this._getActivePartProp("pattern")[0]) {
      return "dM";
    }
  }
  _getActivePartLimits(lockOtherParts) {
    const limitFunction = this._getActivePartProp("limits");
    return limitFunction(this._maskValue, lockOtherParts && this._getRealLimitsPattern());
  }
  _getActivePartValue(dateValue) {
    dateValue = dateValue || this._maskValue;
    const getter = this._getActivePartProp("getter");
    return isFunction(getter) ? getter(dateValue) : dateValue[getter]();
  }
  _addLeadingZeroes(value) {
    const zeroes = /^0+/.exec(this._searchValue);
    const limits = this._getActivePartLimits();
    const maxLimitLength = String(limits.max).length;
    return ((zeroes && zeroes[0] || "") + String(value)).substr(-maxLimitLength);
  }
  _setActivePartValue(value, dateValue) {
    dateValue = dateValue || this._maskValue;
    const setter = this._getActivePartProp("setter");
    const limits = this._getActivePartLimits();
    value = inRange(value, limits.min, limits.max) ? value : value % 10;
    value = this._addLeadingZeroes(fitIntoRange(value, limits.min, limits.max));
    isFunction(setter) ? setter(dateValue, value) : dateValue[setter](value);
    this._renderDisplayText(this._getDisplayedText(dateValue));
    this._renderDateParts();
  }
  _getActivePartProp(property) {
    if (!this._dateParts || !this._dateParts[this._activePartIndex]) {
      return;
    }
    return this._dateParts[this._activePartIndex][property];
  }
  _loadMaskValue() {
    let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.dateOption("value");
    this._maskValue = value && new Date(value);
    this._initialMaskValue = value && new Date(value);
  }
  _saveMaskValue() {
    const value = this._maskValue && new Date(this._maskValue);
    const {
      type: type2
    } = this.option();
    if (value && "date" === type2) {
      value.setHours(0, 0, 0, 0);
    }
    this._initialMaskValue = new Date(value);
    if (this._applyInternalValidation(value).isValid) {
      this.dateOption("value", value);
    }
  }
  _revertChanges() {
    this._loadMaskValue();
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._renderDateParts();
  }
  _renderDisplayText(text) {
    super._renderDisplayText(text);
    if (this._useMaskBehavior()) {
      this.option("text", text);
    }
  }
  _partIncrease(step, lockOtherParts) {
    this._setNewDateIfEmpty();
    const {
      max,
      min
    } = this._getActivePartLimits(lockOtherParts);
    let newValue = step + this._getActivePartValue();
    if (newValue > max) {
      newValue = this._applyLimits(newValue, {
        limitBase: min,
        limitClosest: max,
        max
      });
    } else if (newValue < min) {
      newValue = this._applyLimits(newValue, {
        limitBase: max,
        limitClosest: min,
        max
      });
    }
    this._setActivePartValue(newValue);
  }
  _applyLimits(newValue, _ref2) {
    let {
      limitBase,
      limitClosest,
      max
    } = _ref2;
    const delta = (newValue - limitClosest) % max;
    return delta ? limitBase + delta - 1 * sign(delta) : limitClosest;
  }
  _maskClickHandler() {
    this._loadMaskValue(this._maskValue);
    if (this.option("text")) {
      this._activePartIndex = getDatePartIndexByPosition(this._dateParts, this._caret().start);
      if (!this._isAllSelected()) {
        this._clearSearchValue();
        if (isDefined(this._activePartIndex)) {
          this._caret(this._getActivePartProp("caret"));
        } else {
          this._selectLastPart();
        }
      }
    }
  }
  _maskCompositionEndHandler(e) {
    this._input().val(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
    this._maskInputHandler = () => {
      this._renderSelectedPart();
    };
  }
  _maskPasteHandler(e) {
    const newText = this._replaceSelectedText(this.option("text"), this._caret(), clipboardText(e));
    const date = date_default3.parse(newText, this._getFormatPattern());
    if (date && this._isDateValid(date)) {
      this._maskValue = date;
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._renderDateParts();
      this._selectNextPart();
    }
    e.preventDefault();
  }
  _isDateValid(date) {
    return isDate(date) && !isNaN(date);
  }
  _isValueDirty() {
    const value = this.dateOption("value");
    return (this._maskValue && this._maskValue.getTime()) !== (value && value.getTime());
  }
  _fireChangeEvent() {
    this._clearSearchValue();
    if (this._isValueDirty()) {
      m_events_engine_default.trigger(this._input(), "change");
    }
  }
  _enterHandler() {
    this._fireChangeEvent();
    this._selectNextPart(1);
  }
  _focusOutHandler(e) {
    const shouldFireChangeEvent = this._useMaskBehavior() && !e.isDefaultPrevented();
    if (shouldFireChangeEvent) {
      this._fireChangeEvent();
      super._focusOutHandler(e);
      this._selectFirstPart();
    } else {
      super._focusOutHandler(e);
    }
  }
  _valueChangeEventHandler(e) {
    const text = this.option("text");
    if (this._useMaskBehavior()) {
      this._saveValueChangeEvent(e);
      if (!text) {
        this._maskValue = null;
      } else if (null === this._maskValue) {
        this._loadMaskValue(text);
      }
      this._saveMaskValue();
    } else {
      super._valueChangeEventHandler(e);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "useMaskBehavior":
        this._renderMask();
        break;
      case "displayFormat":
      case "mode":
        super._optionChanged(args);
        this._renderMask();
        break;
      case "value":
        this._loadMaskValue();
        super._optionChanged(args);
        this._renderDateParts();
        break;
      case "emptyDateValue":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearMaskState() {
    this._clearSearchValue();
    delete this._dateParts;
    delete this._activePartIndex;
    delete this._maskValue;
  }
  clear() {
    this._clearMaskState();
    this._activePartIndex = 0;
    super.clear();
  }
  _clean() {
    super._clean();
    this._detachMaskEvents();
    this._clearMaskState();
  }
};
var m_date_box_mask_default = DateBoxMask;

// node_modules/devextreme/esm/__internal/ui/date_box/m_date_box.js
component_registrator_default("dxDateBox", m_date_box_mask_default);
var m_date_box_default = m_date_box_mask_default;

// node_modules/devextreme/esm/ui/date_box.js
var date_box_default = m_date_box_default;

// node_modules/devextreme/esm/__internal/ui/form/components/button_item.js
function convertAlignmentToTextAlign(horizontalAlignment) {
  return isDefined(horizontalAlignment) ? horizontalAlignment : "right";
}
function convertAlignmentToJustifyContent(verticalAlignment) {
  switch (verticalAlignment) {
    case "center":
      return "center";
    case "bottom":
      return "flex-end";
    default:
      return "flex-start";
  }
}
function renderButtonItem(_ref) {
  let {
    item,
    $parent,
    rootElementCssClassList,
    validationGroup,
    createComponentCallback
  } = _ref;
  const $rootElement = renderer_default("<div>").appendTo($parent).addClass(rootElementCssClassList.join(" ")).addClass("dx-field-button-item").css("textAlign", convertAlignmentToTextAlign(item.horizontalAlignment));
  $parent.css("justifyContent", convertAlignmentToJustifyContent(item.verticalAlignment));
  const $button = renderer_default("<div>").appendTo($rootElement);
  return {
    $rootElement,
    buttonInstance: createComponentCallback($button, extend({
      validationGroup
    }, item.buttonOptions))
  };
}

// node_modules/devextreme/esm/__internal/ui/form/components/empty_item.js
function renderEmptyItem(info) {
  const {
    $parent,
    rootElementCssClassList
  } = info;
  return renderer_default("<div>").addClass("dx-field-empty-item").html("&nbsp;").addClass(rootElementCssClassList.join(" ")).appendTo($parent);
}

// node_modules/devextreme/esm/__internal/ui/form/components/field_item.js
function getValidationTarget($fieldEditorContainer) {
  const $editor = $fieldEditorContainer.children().first();
  return $editor.hasClass("dx-template-wrapper") ? $editor.children().first() : $editor;
}
function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
  if (validationTargetInstance && isMaterialBased(current())) {
    const wrapperClass = ".dx-field-item-content-wrapper";
    const toggleInvalidClass = (_ref) => {
      let {
        element,
        component
      } = _ref;
      const {
        isValid,
        validationMessageMode
      } = component.option();
      renderer_default(element).parents(wrapperClass).toggleClass("dx-invalid", false === isValid && (component._isFocused() || "always" === validationMessageMode));
    };
    validationTargetInstance.on("optionChanged", ((e) => {
      if ("isValid" !== e.name) {
        return;
      }
      toggleInvalidClass(e);
    }));
    validationTargetInstance.on("focusIn", toggleInvalidClass).on("focusOut", toggleInvalidClass).on("enterKey", toggleInvalidClass);
  }
}
function tryGetValidationTargetInstance($validationTarget) {
  var _$validationTarget$pa;
  return (null === $validationTarget || void 0 === $validationTarget ? void 0 : $validationTarget.data("dx-validation-target")) || (null === $validationTarget || void 0 === $validationTarget || null === (_$validationTarget$pa = $validationTarget.parent) || void 0 === _$validationTarget$pa || null === (_$validationTarget$pa = _$validationTarget$pa.call($validationTarget)) || void 0 === _$validationTarget$pa ? void 0 : _$validationTarget$pa.data("dx-validation-target"));
}
function getTemplateData(item, editorOptions, formOrLayoutManager) {
  return {
    dataField: item.dataField,
    editorType: item.editorType,
    editorOptions,
    component: formOrLayoutManager,
    name: item.name
  };
}
function renderFieldItem(_ref2) {
  let {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    formLabelLocation,
    item,
    editorOptions,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    requiredMessageTemplate,
    validationGroup
  } = _ref2;
  const $rootElement = renderer_default("<div>").addClass(rootElementCssClassList.join(" ")).appendTo($parent);
  $rootElement.addClass(isRequired ? "dx-field-item-required" : "dx-field-item-optional");
  if (isSimpleItem) {
    $rootElement.addClass("dx-flex-layout");
  }
  if (isSimpleItem && labelNeedBaselineAlign) {
    $rootElement.addClass("dx-field-item-label-align");
  }
  const $fieldEditorContainer = renderer_default("<div>");
  $fieldEditorContainer.data("dx-form-item", item);
  $fieldEditorContainer.addClass(FIELD_ITEM_CONTENT_CLASS).addClass("dx-field-item-content-location-" + {
    right: "left",
    left: "right",
    top: "bottom"
  }[formLabelLocation]);
  let $label = null;
  if (needRenderLabel) {
    if (labelOptions.labelTemplate) {
      labelOptions.labelTemplateData = getTemplateData(item, editorOptions, formOrLayoutManager);
    }
    $label = renderLabel(labelOptions);
  }
  if ($label) {
    const {
      editorType
    } = item;
    $rootElement.append($label);
    if ("top" === labelLocation || "left" === labelLocation) {
      $rootElement.append($fieldEditorContainer);
    }
    if ("right" === labelLocation) {
      $rootElement.prepend($fieldEditorContainer);
    }
    if ("top" === labelLocation) {
      $rootElement.addClass("dx-label-v-align");
    } else {
      $rootElement.addClass("dx-label-h-align");
    }
    if ("dxCheckBox" === editorType || "dxSwitch" === editorType) {
      m_events_engine_default.on($label, CLICK_EVENT_NAME, (() => {
        m_events_engine_default.trigger($fieldEditorContainer.children(), CLICK_EVENT_NAME);
      }));
    }
    const toggleControls = ["dxCheckBox", "dxSwitch", "dxRadioGroup"];
    const isToggleControls = toggleControls.includes(editorType);
    const labelAlignment = labelOptions.alignment;
    const isLabelAlignmentLeft = "left" === labelAlignment || !labelAlignment;
    const hasNotTemplate = !template;
    const isLabelOnTop = "top" === labelLocation;
    if (hasNotTemplate && isToggleControls && isLabelOnTop && isLabelAlignmentLeft) {
      $fieldEditorContainer.addClass("dx-toggle-controls-paddings");
    }
  } else {
    $rootElement.append($fieldEditorContainer);
  }
  let widgetInstance;
  if (template) {
    template.render({
      container: getPublicElement($fieldEditorContainer),
      model: getTemplateData(item, editorOptions, formOrLayoutManager),
      onRendered() {
        const $validationTarget2 = getValidationTarget($fieldEditorContainer);
        const validationTargetInstance2 = tryGetValidationTargetInstance($validationTarget2);
        subscribeWrapperInvalidClassToggle(validationTargetInstance2);
      }
    });
  } else {
    const $div = renderer_default("<div>").appendTo($fieldEditorContainer);
    try {
      widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
      widgetInstance.setAria("describedby", helpID);
      if (labelID) {
        widgetInstance.setAria("labelledby", labelID);
      }
      widgetInstance.setAria("required", isRequired);
    } catch (e) {
      ui_errors_default.log("E1035", e.message);
    }
  }
  const $validationTarget = getValidationTarget($fieldEditorContainer);
  const validationTargetInstance = null === $validationTarget || void 0 === $validationTarget ? void 0 : $validationTarget.data("dx-validation-target");
  if (validationTargetInstance) {
    var _item$label;
    const isItemHaveCustomLabel = null === (_item$label = item.label) || void 0 === _item$label ? void 0 : _item$label.text;
    const itemName = isItemHaveCustomLabel ? null : name;
    const fieldName = isItemHaveCustomLabel ? item.label.text : itemName && captionize(itemName);
    let validationRules = null;
    if (isSimpleItem) {
      if (item.validationRules) {
        validationRules = item.validationRules;
      } else {
        const requiredMessage = format(requiredMessageTemplate, fieldName);
        validationRules = item.isRequired ? [{
          type: "required",
          message: requiredMessage
        }] : null;
      }
    }
    if (Array.isArray(validationRules) && validationRules.length) {
      createComponentCallback($validationTarget, m_validator_default, {
        validationRules,
        validationGroup,
        dataGetter: () => ({
          formItem: item
        })
      });
    }
    subscribeWrapperInvalidClassToggle(validationTargetInstance);
  }
  if (helpText && isSimpleItem) {
    const $editorParent = $fieldEditorContainer.parent();
    $editorParent.append(renderer_default("<div>").addClass("dx-field-item-content-wrapper").append($fieldEditorContainer).append(renderer_default("<div>").addClass("dx-field-item-help-text").attr("id", helpID).text(helpText)));
  }
  return {
    $fieldEditorContainer,
    $rootElement,
    widgetInstance
  };
}

// node_modules/devextreme/esm/__internal/ui/responsive_box.js
var SCREEN_SIZE_CLASS_PREFIX = "dx-responsivebox-screen-";
var ResponsiveBox = class extends ui_collection_widget_edit_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      rows: [],
      cols: [],
      singleColumnScreen: "",
      screenByWidth: null,
      height: "100%",
      width: "100%",
      activeStateEnabled: false,
      focusStateEnabled: false,
      onLayoutChanged: null
    });
  }
  _init() {
    const {
      screenByWidth
    } = this.option();
    if (!screenByWidth) {
      this._options.silent("screenByWidth", defaultScreenFactorFunc);
    }
    super._init();
    this._initLayoutChangedAction();
  }
  _initLayoutChangedAction() {
    this._layoutChangedAction = this._createActionByOption("onLayoutChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _itemClass() {
    return "dx-box-item";
  }
  _itemDataKey() {
    return "dxBoxItemData";
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass("dx-responsivebox");
  }
  _renderItems() {
    this._setScreenSize();
    this._screenItems = this._itemsByScreen();
    this._prepareGrid();
    this._spreadItems();
    this._layoutItems();
    this._linkNodeToItem();
  }
  _itemOptionChanged(item) {
    const $item = this._findItemElementByItem(item);
    if (!$item.length) {
      return;
    }
    this._refreshItem($item, item);
    this._clearItemNodeTemplates();
    this._update(true);
  }
  _setScreenSize() {
    const currentScreen = this._getCurrentScreen();
    this._removeScreenSizeClass();
    this.$element().addClass(SCREEN_SIZE_CLASS_PREFIX + currentScreen);
    this.option("currentScreenFactor", currentScreen);
  }
  _removeScreenSizeClass() {
    const {
      currentScreenFactor
    } = this.option();
    if (currentScreenFactor) {
      this.$element().removeClass(SCREEN_SIZE_CLASS_PREFIX + currentScreenFactor);
    }
  }
  _prepareGrid() {
    this._grid = [];
    this._prepareRowsAndCols();
    each(this._rows, (() => {
      const row = [];
      this._grid.push(row);
      each(this._cols, (() => {
        row.push(this._createEmptyCell());
      }));
    }));
  }
  getSingleColumnRows() {
    const {
      rows
    } = this.option();
    const screenItemsLength = this._screenItems.length;
    if (null !== rows && void 0 !== rows && rows.length) {
      const filteredRows = this._filterByScreen(rows);
      const result = [];
      for (let i = 0; i < screenItemsLength; i += 1) {
        const sizeConfig = this._defaultSizeConfig();
        if (i < filteredRows.length && isDefined(filteredRows[i].shrink)) {
          sizeConfig.shrink = filteredRows[i].shrink;
        }
        result.push(sizeConfig);
      }
      return result;
    }
    return this._defaultSizeConfig(screenItemsLength);
  }
  _prepareRowsAndCols() {
    if (this._isSingleColumnScreen()) {
      this._prepareSingleColumnScreenItems();
      this._rows = this.getSingleColumnRows();
      this._cols = this._defaultSizeConfig(1);
    } else {
      const {
        rows,
        cols
      } = this.option();
      this._rows = this._sizesByScreen(rows);
      this._cols = this._sizesByScreen(cols);
    }
  }
  _isSingleColumnScreen() {
    const {
      singleColumnScreen,
      rows,
      cols
    } = this.option();
    return this._screenRegExp().test(singleColumnScreen) || !(null !== rows && void 0 !== rows && rows.length) || !(null !== cols && void 0 !== cols && cols.length);
  }
  _prepareSingleColumnScreenItems() {
    this._screenItems.sort(((item1, item2) => item1.location.row - item2.location.row || item1.location.col - item2.location.col));
    each(this._screenItems, ((index, item) => {
      Object.assign(item.location, {
        row: index,
        col: 0,
        rowspan: 1,
        colspan: 1
      });
    }));
  }
  _sizesByScreen(sizeConfigs) {
    return map(this._filterByScreen(sizeConfigs), ((sizeConfig) => extend(this._defaultSizeConfig(), sizeConfig)));
  }
  _createDefaultSizeConfig() {
    return {
      ratio: 1,
      baseSize: 0,
      minSize: 0,
      maxSize: 0
    };
  }
  _defaultSizeConfig(size) {
    const defaultSizeConfig = this._createDefaultSizeConfig();
    if (!arguments.length) {
      return defaultSizeConfig;
    }
    const result = [];
    for (let i = 0; i < size; i += 1) {
      result.push(defaultSizeConfig);
    }
    return result;
  }
  _filterByScreen(items) {
    const screenRegExp = this._screenRegExp();
    return grep(items, ((item) => !item.screen || screenRegExp.test(item.screen)));
  }
  _screenRegExp() {
    const screen = this._getCurrentScreen();
    return new RegExp(`(^|\\s)${screen}($|\\s)`, "i");
  }
  _getCurrentScreen() {
    const width = this._screenWidth();
    const {
      screenByWidth
    } = this.option();
    return null === screenByWidth || void 0 === screenByWidth ? void 0 : screenByWidth(width);
  }
  _screenWidth() {
    if (hasWindow()) {
      return getWidth(getWindow());
    }
    return 1920;
  }
  _createEmptyCell() {
    return {
      item: {},
      location: {
        colspan: 1,
        rowspan: 1
      }
    };
  }
  _spreadItems() {
    each(this._screenItems, ((_, itemInfo) => {
      const location = itemInfo.location || {};
      const itemCol = location.col;
      const itemRow = location.row;
      const row = this._grid[itemRow];
      const itemCell = null === row || void 0 === row ? void 0 : row[itemCol];
      this._occupyCells(itemCell, itemInfo);
    }));
  }
  _itemsByScreen() {
    const {
      items = []
    } = this.option();
    return items.reduce(((result, item) => {
      let locations = item.location ?? {};
      locations = isPlainObject(locations) ? [locations] : locations;
      this._filterByScreen(locations).forEach(((location) => {
        result.push({
          item,
          location: _extends({
            rowspan: 1,
            colspan: 1
          }, location)
        });
      }));
      return result;
    }), []);
  }
  _occupyCells(itemCell, itemInfo) {
    if (!itemCell || this._isItemCellOccupied(itemCell, itemInfo)) {
      return;
    }
    extend(itemCell, itemInfo);
    this._markSpanningCell(itemCell);
  }
  _isItemCellOccupied(itemCell, itemInfo) {
    if (!isEmptyObject(itemCell.item)) {
      return true;
    }
    let result = false;
    this._loopOverSpanning(itemInfo.location, ((cell) => {
      result = result || !isEmptyObject(cell.item);
    }));
    return result;
  }
  _loopOverSpanning(location, callback) {
    const rowEnd = location.row + location.rowspan - 1;
    const colEnd = location.col + location.colspan - 1;
    const boundRowEnd = Math.min(rowEnd, this._rows.length - 1);
    const boundColEnd = Math.min(colEnd, this._cols.length - 1);
    location.rowspan -= rowEnd - boundRowEnd;
    location.colspan -= colEnd - boundColEnd;
    for (let rowIndex = location.row; rowIndex <= boundRowEnd; rowIndex += 1) {
      for (let colIndex = location.col; colIndex <= boundColEnd; colIndex += 1) {
        if (rowIndex !== location.row || colIndex !== location.col) {
          callback(this._grid[rowIndex][colIndex]);
        }
      }
    }
  }
  _markSpanningCell(itemCell) {
    this._loopOverSpanning(itemCell.location, ((cell) => {
      cell.item = itemCell.item;
      cell.spanningCell = itemCell;
    }));
  }
  _linkNodeToItem() {
    each(this._itemElements(), ((_, itemNode) => {
      const $item = renderer_default(itemNode);
      const item = $item.data("dxBoxItemData");
      if (!item.box) {
        item.node = $item.children();
      }
    }));
  }
  _layoutItems() {
    const rowsCount = this._grid.length;
    const colsCount = rowsCount && this._grid[0].length;
    if (!rowsCount && !colsCount) {
      return;
    }
    const result = this._layoutBlock({
      direction: "col",
      row: {
        start: 0,
        end: rowsCount - 1
      },
      col: {
        start: 0,
        end: colsCount - 1
      }
    });
    const rootBox = this._prepareBoxConfig((null === result || void 0 === result ? void 0 : result.box) ?? {
      direction: "row",
      items: [extend(result, {
        ratio: 1
      })]
    });
    extend(rootBox, this._rootBoxConfig(rootBox.items));
    this._$root = renderer_default("<div>").appendTo(this._itemContainer());
    this._createComponent(this._$root, box_default, rootBox);
  }
  _rootBoxConfig(items) {
    const rootItems = each(items, ((index, item) => {
      if (this._needApplyAutoBaseSize(item)) {
        item.baseSize = "auto";
      }
    }));
    const {
      itemHoldTimeout
    } = this.option();
    return {
      width: "100%",
      height: "100%",
      items: rootItems,
      itemTemplate: this._getTemplateByOption("itemTemplate"),
      itemHoldTimeout,
      onItemHold: this._createActionByOption("onItemHold"),
      onItemClick: this._createActionByOption("onItemClick"),
      onItemContextMenu: this._createActionByOption("onItemContextMenu"),
      onItemRendered: this._createActionByOption("onItemRendered")
    };
  }
  _needApplyAutoBaseSize(item) {
    return !item.baseSize && (!item.minSize || "auto" === item.minSize) && (!item.maxSize || "auto" === item.maxSize);
  }
  _prepareBoxConfig(config) {
    const {
      onItemStateChanged
    } = this.option();
    return extend(config || {}, {
      crossAlign: "stretch",
      onItemStateChanged
    });
  }
  _layoutBlock(options) {
    if (this._isSingleItem(options)) {
      return this._itemByCell(options.row.start, options.col.start);
    }
    return this._layoutDirection(options);
  }
  _isSingleItem(options) {
    const {
      row,
      col
    } = options;
    const firstCellLocation = this._grid[row.start][col.start].location;
    const isItemRowSpanned = row.end - row.start === firstCellLocation.rowspan - 1;
    const isItemColSpanned = col.end - col.start === firstCellLocation.colspan - 1;
    return isItemRowSpanned && isItemColSpanned;
  }
  _itemByCell(rowIndex, colIndex) {
    const itemCell = this._grid[rowIndex][colIndex];
    return itemCell.spanningCell ? null : itemCell.item;
  }
  _layoutDirection(options) {
    const items = [];
    const {
      direction
    } = options;
    const crossDirection = this._crossDirection(direction);
    let block = null;
    while (block = this._nextBlock(options)) {
      if (this._isBlockIndivisible(options.prevBlockOptions, block)) {
        throw ui_errors_default.Error("E1025");
      }
      const item = this._layoutBlock({
        direction: crossDirection,
        row: block.row,
        col: block.col,
        prevBlockOptions: options
      });
      if (item) {
        extend(item, this._blockSize(block, crossDirection));
        items.push(item);
      }
      options[crossDirection].start = block[crossDirection].end + 1;
    }
    return {
      box: this._prepareBoxConfig({
        direction,
        items
      })
    };
  }
  _isBlockIndivisible(options, block) {
    return !!options && options.col.start === block.col.start && options.col.end === block.col.end && options.row.start === block.row.start && options.row.end === block.row.end;
  }
  _crossDirection(direction) {
    return "col" === direction ? "row" : "col";
  }
  _nextBlock(options) {
    const {
      direction
    } = options;
    const crossDirection = this._crossDirection(direction);
    const startIndex = options[direction].start;
    const endIndex = options[direction].end;
    const crossStartIndex = options[crossDirection].start;
    if (crossStartIndex > options[crossDirection].end) {
      return null;
    }
    let crossSpan = 1;
    for (let crossIndex = crossStartIndex; crossIndex < crossStartIndex + crossSpan; crossIndex += 1) {
      let lineCrossSpan = 1;
      for (let index = startIndex; index <= endIndex; index += 1) {
        const cell = this._cellByDirection(direction, index, crossIndex);
        lineCrossSpan = Math.max(lineCrossSpan, cell.location[`${crossDirection}span`]);
      }
      const lineCrossEndIndex = crossIndex + lineCrossSpan;
      const crossEndIndex = crossStartIndex + crossSpan;
      if (lineCrossEndIndex > crossEndIndex) {
        crossSpan += lineCrossEndIndex - crossEndIndex;
      }
    }
    const result = {};
    result[direction] = {
      start: startIndex,
      end: endIndex
    };
    result[crossDirection] = {
      start: crossStartIndex,
      end: crossStartIndex + crossSpan - 1
    };
    return result;
  }
  _cellByDirection(direction, index, crossIndex) {
    return "col" === direction ? this._grid[crossIndex][index] : this._grid[index][crossIndex];
  }
  _blockSize(block, direction) {
    const defaultMinSize = "row" === direction ? "auto" : 0;
    const sizeConfigs = "row" === direction ? this._rows : this._cols;
    const result = _extends({}, this._createDefaultSizeConfig(), {
      ratio: 0
    });
    for (let index = block[direction].start; index <= block[direction].end; index += 1) {
      const sizeConfig = sizeConfigs[index];
      result.ratio += sizeConfig.ratio;
      result.baseSize += sizeConfig.baseSize;
      result.minSize += sizeConfig.minSize;
      result.maxSize += sizeConfig.maxSize;
      if (isDefined(sizeConfig.shrink)) {
        result.shrink = sizeConfig.shrink;
      }
    }
    if (!result.minSize) {
      result.minSize = defaultMinSize;
    }
    if (!result.maxSize) {
      result.maxSize = "auto";
    }
    if (this._isSingleColumnScreen()) {
      result.baseSize = "auto";
    }
    return result;
  }
  _update(forceRemoveRoot) {
    var _this$_layoutChangedA;
    const $existingRoot = this._$root;
    this._renderItems();
    if ($existingRoot) {
      if (forceRemoveRoot) {
        $existingRoot.remove();
      } else {
        $existingRoot.detach();
        this._saveAssistantRoot($existingRoot);
      }
    }
    null === (_this$_layoutChangedA = this._layoutChangedAction) || void 0 === _this$_layoutChangedA || _this$_layoutChangedA.call(this);
  }
  _saveAssistantRoot($root) {
    this._assistantRoots = this._assistantRoots ?? [];
    this._assistantRoots.push($root);
  }
  _dispose() {
    this._clearItemNodeTemplates();
    this._cleanUnusedRoots();
    super._dispose();
  }
  _cleanUnusedRoots() {
    if (!this._assistantRoots) {
      return;
    }
    each(this._assistantRoots, ((_, item) => {
      renderer_default(item).remove();
    }));
  }
  _clearItemNodeTemplates() {
    const {
      items
    } = this.option();
    each(items, (function() {
      delete this.node;
    }));
  }
  _attachClickEvent() {
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "rows":
      case "cols":
      case "screenByWidth":
      case "singleColumnScreen":
        this._clearItemNodeTemplates();
        this._invalidate();
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        this._update();
        break;
      case "onLayoutChanged":
        this._initLayoutChangedAction();
        break;
      case "itemTemplate":
        this._clearItemNodeTemplates();
        super._optionChanged(args);
        break;
      case "currentScreenFactor":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dimensionChanged() {
    const {
      currentScreenFactor
    } = this.option();
    if (this._getCurrentScreen() !== currentScreenFactor) {
      this._update();
    }
  }
  repaint() {
    this._update();
  }
};
component_registrator_default("dxResponsiveBox", ResponsiveBox);
var responsive_box_default = ResponsiveBox;

// node_modules/devextreme/esm/__internal/ui/form/form.layout_manager.js
var MIN_COLUMN_WIDTH = 200;
var LayoutManager = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      layoutData: {},
      readOnly: false,
      colCount: 1,
      labelLocation: "left",
      onFieldDataChanged: null,
      onEditorEnterKey: null,
      customizeItem: null,
      alignItemLabels: true,
      minColWidth: MIN_COLUMN_WIDTH,
      showRequiredMark: true,
      screenByWidth: null,
      showOptionalMark: false,
      requiredMark: "*",
      labelMode: "outside",
      optionalMark: message_default.format("dxForm-optionalMark"),
      requiredMessage: message_default.getFormatter("dxForm-requiredMessage")
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      layoutData: true,
      validationGroup: true
    });
  }
  _init() {
    const {
      layoutData
    } = this.option();
    super._init();
    this._itemWatchers = [];
    this._itemsRunTimeInfo = new FormItemsRunTimeInfo();
    this._updateReferencedOptions(layoutData);
    this._initDataAndItems(layoutData);
  }
  _dispose() {
    super._dispose();
    this._cleanItemWatchers();
  }
  _initDataAndItems(initialData) {
    this._syncDataWithItems();
    this._updateItems(initialData);
  }
  _syncDataWithItems() {
    const {
      layoutData,
      items
    } = this.option();
    if (isDefined(items)) {
      items.forEach(((item) => {
        if (item.dataField && void 0 === this._getDataByField(item.dataField)) {
          var _item$editorOptions;
          const value = null === (_item$editorOptions = item.editorOptions) || void 0 === _item$editorOptions ? void 0 : _item$editorOptions.value;
          if (isDefined(value) || item.dataField in layoutData) {
            this._updateFieldValue(item.dataField, value);
          }
        }
      }));
    }
  }
  _getDataByField(dataField) {
    return dataField ? this.option(`layoutData.${dataField}`) : null;
  }
  _isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField) {
    if (allowIndeterminateState && "dxCheckBox" === editorType) {
      const nameParts = ["layoutData", ...dataField.split(".")];
      const propertyName = nameParts.pop();
      const layoutData = this.option(nameParts.join("."));
      if (!propertyName) {
        return false;
      }
      return layoutData && propertyName in layoutData;
    }
    return false;
  }
  _updateFieldValue(dataField, value) {
    const {
      layoutData
    } = this.option();
    let newValue = value;
    if (!variable_wrapper_default.isWrapped(layoutData[dataField]) && isDefined(dataField)) {
      this.option(`layoutData.${dataField}`, newValue);
    } else if (variable_wrapper_default.isWritableWrapped(layoutData[dataField])) {
      newValue = isFunction(newValue) ? newValue() : newValue;
      layoutData[dataField](newValue);
    }
    this._triggerOnFieldDataChanged({
      dataField,
      value: newValue
    });
  }
  _triggerOnFieldDataChanged(args) {
    this._createActionByOption("onFieldDataChanged")(args);
  }
  _updateItems(layoutData) {
    const {
      items: userItems
    } = this.option();
    const isUserItemsExist = isDefined(userItems);
    const {
      customizeItem
    } = this.option();
    const items = isUserItemsExist ? userItems : this._generateItemsByData(layoutData);
    if (isDefined(items)) {
      const processedItems = [];
      each(items, ((_index, item) => {
        if (this._isAcceptableItem(item)) {
          item = this._processItem(item);
          null === customizeItem || void 0 === customizeItem || customizeItem(item);
          if (isObject(item) && false !== variable_wrapper_default.unwrap(item.visible)) {
            processedItems.push(item);
          }
        }
      }));
      if (!this._itemWatchers.length || !isUserItemsExist) {
        this._updateItemWatchers(items);
      }
      this._setItems(processedItems);
      this._sortItems();
    }
  }
  _cleanItemWatchers() {
    this._itemWatchers.forEach(((dispose) => {
      dispose();
    }));
    this._itemWatchers = [];
  }
  _updateItemWatchers(items) {
    const watch = this._getWatch();
    items.forEach(((item) => {
      if (isObject(item) && isDefined(item.visible) && isFunction(watch)) {
        this._itemWatchers.push(watch((() => variable_wrapper_default.unwrap(item.visible)), (() => {
          const {
            layoutData
          } = this.option();
          this._updateItems(layoutData);
          this.repaint();
        }), {
          skipImmediate: true
        }));
      }
    }));
  }
  _generateItemsByData(layoutData) {
    const result = [];
    if (isDefined(layoutData)) {
      each(layoutData, ((dataField) => {
        result.push({
          dataField
        });
      }));
    }
    return result;
  }
  _isAcceptableItem(item) {
    const itemField = isString(item) ? item : item.dataField;
    const itemData = this._getDataByField(itemField);
    return !(isFunction(itemData) && !variable_wrapper_default.isWrapped(itemData));
  }
  _processItem(item) {
    if ("string" === typeof item) {
      item = {
        dataField: item
      };
    }
    if ("object" === typeof item && !item.itemType) {
      item.itemType = SIMPLE_ITEM_TYPE;
    }
    if (!isDefined(item.editorType) && isDefined(item.dataField)) {
      const value = this._getDataByField(item.dataField);
      item.editorType = isDefined(value) ? this._getEditorTypeByDataType(type(value)) : "dxTextBox";
    }
    if ("dxCheckBox" === item.editorType) {
      item.allowIndeterminateState = item.allowIndeterminateState ?? true;
    }
    return item;
  }
  _getEditorTypeByDataType(dataType) {
    switch (dataType) {
      case "number":
        return "dxNumberBox";
      case "date":
        return "dxDateBox";
      case "boolean":
        return "dxCheckBox";
      default:
        return "dxTextBox";
    }
  }
  _sortItems() {
    normalizeIndexes(this._items, "visibleIndex");
    this._sortIndexes();
  }
  _sortIndexes() {
    var _this$_items;
    null === (_this$_items = this._items) || void 0 === _this$_items || _this$_items.sort(((itemA, itemB) => {
      const indexA = itemA.visibleIndex;
      const indexB = itemB.visibleIndex;
      if (indexA > indexB) {
        return 1;
      }
      if (indexA < indexB) {
        return -1;
      }
      return 0;
    }));
  }
  _initMarkup() {
    this._itemsRunTimeInfo.clear();
    this.$element().addClass(FORM_LAYOUT_MANAGER_CLASS);
    super._initMarkup();
    this._renderResponsiveBox();
  }
  _renderResponsiveBox() {
    var _this$_items2;
    const templatesInfo = [];
    if (null !== (_this$_items2 = this._items) && void 0 !== _this$_items2 && _this$_items2.length) {
      const colCount = this._getColCount();
      const $container = renderer_default("<div>").appendTo(this.$element());
      this._prepareItemsWithMerging(colCount);
      const layoutItems = this._generateLayoutItems();
      this._responsiveBox = super._createComponent($container, responsive_box_default, this._getResponsiveBoxConfig(layoutItems, colCount, templatesInfo));
      if (!hasWindow()) {
        this._renderTemplates(templatesInfo);
      }
    }
  }
  _itemStateChangedHandler(args) {
    this._refresh();
  }
  _renderTemplates(templatesInfo) {
    let itemsWithLabelTemplateCount = 0;
    templatesInfo.forEach(((_ref) => {
      var _item$label;
      let {
        item
      } = _ref;
      if (null !== item && void 0 !== item && null !== (_item$label = item.label) && void 0 !== _item$label && _item$label.template) {
        itemsWithLabelTemplateCount += 1;
      }
    }));
    each(templatesInfo, ((_index, info) => {
      switch (info.itemType) {
        case "empty":
          renderEmptyItem(info);
          break;
        case "button":
          this._renderButtonItem(info);
          break;
        default:
          this._renderFieldItem(info, itemsWithLabelTemplateCount);
      }
    }));
  }
  _getResponsiveBoxConfig(layoutItems, colCount, templatesInfo) {
    const that = this;
    const {
      colCountByScreen,
      screenByWidth
    } = this.option();
    const xsColCount = null === colCountByScreen || void 0 === colCountByScreen ? void 0 : colCountByScreen.xs;
    return {
      onItemStateChanged: this._itemStateChangedHandler.bind(this),
      onLayoutChanged: () => {
        const {
          onLayoutChanged
        } = this.option();
        const isSingleColumnMode = this.isSingleColumnMode();
        if (onLayoutChanged) {
          this.$element().toggleClass(LAYOUT_MANAGER_ONE_COLUMN, isSingleColumnMode);
          onLayoutChanged(isSingleColumnMode);
        }
      },
      onContentReady: (e) => {
        if (hasWindow()) {
          this._renderTemplates(templatesInfo);
        }
        const {
          onLayoutChanged
        } = this.option();
        if (onLayoutChanged) {
          this.$element().toggleClass(LAYOUT_MANAGER_ONE_COLUMN, this.isSingleColumnMode(e.component));
        }
      },
      itemTemplate(itemData, _index, itemElement) {
        var _that$_items;
        const {
          location
        } = itemData;
        if (!location) {
          return;
        }
        const $itemElement = renderer_default(itemElement);
        const itemRenderedCountInPreviousRows = location.row * colCount;
        const item = null === (_that$_items = that._items) || void 0 === _that$_items ? void 0 : _that$_items[location.col + itemRenderedCountInPreviousRows];
        if (!item) {
          return;
        }
        const itemCssClassList = [item.cssClass ?? ""];
        $itemElement.toggleClass(SINGLE_COLUMN_ITEM_CONTENT, that.isSingleColumnMode(this));
        if (0 === location.row) {
          itemCssClassList.push("dx-first-row");
        }
        if (0 === location.col) {
          itemCssClassList.push("dx-first-col");
        }
        const {
          isRoot
        } = that.option();
        if (item.itemType === SIMPLE_ITEM_TYPE && isRoot) {
          $itemElement.addClass(ROOT_SIMPLE_ITEM_CLASS);
        }
        const isLastColumn = location.col === colCount - 1 || location.col + location.colspan === colCount;
        const rowsCount = that._getRowsCount();
        const isLastRow = location.row === rowsCount - 1;
        if (isLastColumn) {
          itemCssClassList.push("dx-last-col");
        }
        if (isLastRow) {
          itemCssClassList.push("dx-last-row");
        }
        if ("empty" !== item.itemType) {
          itemCssClassList.push(FIELD_ITEM_CLASS);
          const {
            cssItemClass = ""
          } = that.option();
          itemCssClassList.push(cssItemClass);
          if (isDefined(item.col)) {
            itemCssClassList.push(`dx-col-${item.col}`);
          }
        }
        templatesInfo.push({
          itemType: item.itemType,
          item,
          $parent: $itemElement,
          rootElementCssClassList: itemCssClassList
        });
      },
      cols: this._generateRatio(colCount),
      rows: this._generateRatio(this._getRowsCount(), true),
      dataSource: layoutItems,
      screenByWidth,
      singleColumnScreen: xsColCount ? false : "xs"
    };
  }
  _getColCount() {
    let {
      colCount
    } = this.option();
    const colCountByScreen = this.option("colCountByScreen");
    if (colCountByScreen) {
      const {
        form
      } = this.option();
      let screenFactor = null === form || void 0 === form ? void 0 : form.getTargetScreenFactor();
      if (!screenFactor) {
        screenFactor = hasWindow() ? getCurrentScreenFactor(this.option("screenByWidth")) : "lg";
      }
      colCount = colCountByScreen[screenFactor] || colCount;
    }
    if ("auto" === colCount) {
      if (this._cashedColCount) {
        return this._cashedColCount;
      }
      colCount = this._getMaxColCount();
      this._cashedColCount = colCount;
    }
    return colCount < 1 ? 1 : colCount;
  }
  _getMaxColCount() {
    if (!hasWindow()) {
      return 1;
    }
    const {
      minColWidth = MIN_COLUMN_WIDTH
    } = this.option();
    const width = getWidth(this.$element());
    const itemsCount = this._items.length;
    const maxColCount = Math.floor(width / minColWidth) || 1;
    return itemsCount < maxColCount ? itemsCount : maxColCount;
  }
  isCachedColCountObsolete() {
    return !!this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
  }
  _prepareItemsWithMerging(colCount) {
    const items = (this._items ?? []).slice(0);
    let result = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      result.push(item);
      const {
        alignItemLabels
      } = this.option();
      if (alignItemLabels || item.alignItemLabels || item.colSpan) {
        item.col = this._getColByIndex(result.length - 1, colCount);
      }
      if (item.colSpan > 1 && item.col + item.colSpan <= colCount) {
        const itemsMergedByCol = [];
        for (let j = 0; j < item.colSpan - 1; j += 1) {
          itemsMergedByCol.push({
            merged: true
          });
        }
        result = result.concat(itemsMergedByCol);
      } else {
        delete item.colSpan;
      }
    }
    this._setItems(result);
  }
  _getColByIndex(index, colCount) {
    return index % colCount;
  }
  _setItems(items) {
    this._items = items;
    this._cashedColCount = null;
  }
  _generateLayoutItems() {
    const items = this._items ?? [];
    const colCount = this._getColCount();
    const result = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item.merged) {
        const location = {
          row: parseInt(String(i / colCount), 10),
          col: this._getColByIndex(i, colCount)
        };
        if (isDefined(item.colSpan)) {
          location.colspan = item.colSpan;
        }
        if (isDefined(item.rowSpan)) {
          location.rowspan = item.rowSpan;
        }
        const generatedItem = {
          location
        };
        if (isDefined(item.disabled)) {
          generatedItem.disabled = item.disabled;
        }
        if (isDefined(item.visible)) {
          generatedItem.visible = item.visible;
        }
        result.push(generatedItem);
      }
    }
    return result;
  }
  _renderButtonItem(info) {
    const {
      item,
      $parent,
      rootElementCssClassList
    } = info;
    const {
      validationGroup
    } = this.option();
    const {
      $rootElement,
      buttonInstance
    } = renderButtonItem({
      item,
      $parent,
      rootElementCssClassList,
      validationGroup,
      createComponentCallback: ($element, options) => super._createComponent($element, Button, options)
    });
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance: buttonInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _renderFieldItem(info, itemsWithLabelTemplateCount) {
    var _item$label2;
    const {
      item,
      $parent,
      rootElementCssClassList
    } = info;
    const editorValue = this._getDataByField(item.dataField);
    let canAssignUndefinedValueToEditor = false;
    if (void 0 === editorValue) {
      const {
        allowIndeterminateState,
        editorType,
        dataField
      } = item;
      canAssignUndefinedValueToEditor = this._isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField);
    }
    const name = item.dataField || item.name;
    const formOrLayoutManager = this._getFormOrThis();
    const {
      form,
      labelLocation,
      requiredMessage,
      validationGroup,
      validationBoundary,
      showColonAfterLabel,
      labelMode
    } = this.option();
    const fieldItemOptions = convertToRenderFieldItemOptions({
      $parent,
      rootElementCssClassList,
      item,
      name,
      editorValue,
      canAssignUndefinedValueToEditor,
      formOrLayoutManager: this._getFormOrThis(),
      createComponentCallback: this._createComponent.bind(this),
      formLabelLocation: labelLocation,
      requiredMessageTemplate: requiredMessage,
      validationGroup,
      editorValidationBoundary: validationBoundary,
      editorStylingMode: null === form || void 0 === form ? void 0 : form.option("stylingMode"),
      showColonAfterLabel: Boolean(showColonAfterLabel),
      managerLabelLocation: labelLocation,
      template: item.template ? this._getTemplate(item.template) : null,
      labelTemplate: null !== (_item$label2 = item.label) && void 0 !== _item$label2 && _item$label2.template ? this._getTemplate(item.label.template) : null,
      itemId: null === form || void 0 === form ? void 0 : form.getItemID(name),
      managerMarkOptions: this._getMarkOptions(),
      labelMode,
      onLabelTemplateRendered: () => {
        this._incTemplateRenderedCallCount();
        if (this._shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, itemsWithLabelTemplateCount)) {
          formOrLayoutManager._alignLabels(this, this.isSingleColumnMode(formOrLayoutManager));
        }
      }
    });
    const {
      $fieldEditorContainer,
      widgetInstance,
      $rootElement
    } = renderFieldItem(fieldItemOptions);
    const {
      onFieldItemRendered
    } = this.option();
    null === onFieldItemRendered || void 0 === onFieldItemRendered || onFieldItemRendered();
    if (widgetInstance && item.dataField) {
      this._bindDataField(widgetInstance, item.dataField, $fieldEditorContainer);
    }
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _incTemplateRenderedCallCount() {
    this._labelTemplateRenderedCallCount = (this._labelTemplateRenderedCallCount ?? 0) + 1;
  }
  _shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, totalItemsWithLabelTemplate) {
    const {
      templatesRenderAsynchronously
    } = formOrLayoutManager.option();
    return !!templatesRenderAsynchronously && this._labelTemplateRenderedCallCount === totalItemsWithLabelTemplate;
  }
  _getMarkOptions() {
    const {
      showRequiredMark,
      requiredMark,
      showOptionalMark,
      optionalMark
    } = this.option();
    return {
      showRequiredMark,
      requiredMark,
      showOptionalMark,
      optionalMark
    };
  }
  _getFormOrThis() {
    const {
      form
    } = this.option();
    return form || this;
  }
  _bindDataField(editorInstance, dataField, $container) {
    const formOrThis = this._getFormOrThis();
    editorInstance.on("enterKey", ((args) => {
      formOrThis._createActionByOption("onEditorEnterKey")(extend(args, {
        dataField
      }));
    }));
    this._createWatcher(editorInstance, $container, dataField);
    this.linkEditorToDataField(editorInstance, dataField);
  }
  _createWatcher(editorInstance, $container, dataField) {
    const watch = this._getWatch();
    if (!isFunction(watch)) {
      return;
    }
    const dispose = watch((() => this._getDataByField(dataField)), (() => {
      const fieldValue = this._getDataByField(dataField);
      if ("dxTagBox" === editorInstance.NAME) {
        const editorValue = editorInstance.option("value");
        if (fieldValue !== editorValue && (function(array1, array2) {
          if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
            return false;
          }
          for (let i = 0; i < array1.length; i += 1) {
            if (array1[i] !== array2[i]) {
              return false;
            }
          }
          return true;
        })(fieldValue, editorValue)) {
          return;
        }
      }
      editorInstance.option("value", fieldValue);
    }), {
      deep: true,
      skipImmediate: true
    }, {
      createWatcherDataField: dataField
    });
    m_events_engine_default.on($container, removeEvent, dispose);
  }
  _getWatch() {
    if (!isDefined(this._watch)) {
      const {
        form: formInstance
      } = this.option();
      this._watch = null === formInstance || void 0 === formInstance ? void 0 : formInstance.option("integrationOptions.watchMethod");
    }
    return this._watch;
  }
  _createComponent($editor, component, editorOptions) {
    const {
      readOnly: readOnlyState
    } = this.option();
    let hasEditorReadOnly = Object.hasOwn(editorOptions, "readOnly");
    const instance = super._createComponent($editor, component, _extends({}, editorOptions, {
      readOnly: !hasEditorReadOnly ? readOnlyState : editorOptions.readOnly
    }));
    let isChangeByForm = false;
    instance.on("optionChanged", ((args) => {
      if ("readOnly" === args.name && !isChangeByForm) {
        hasEditorReadOnly = true;
      }
    }));
    this.on("optionChanged", ((args) => {
      if ("readOnly" === args.name && !hasEditorReadOnly) {
        isChangeByForm = true;
        instance.option(args.name, args.value);
        isChangeByForm = false;
      }
    }));
    return instance;
  }
  _generateRatio(count, isAutoSize) {
    const result = [];
    for (let i = 0; i < count; i += 1) {
      const ratio = {
        ratio: 1
      };
      if (isAutoSize) {
        ratio.baseSize = "auto";
      }
      result.push(ratio);
    }
    return result;
  }
  _getRowsCount() {
    const items = this._items ?? [];
    return Math.ceil(items.length / this._getColCount());
  }
  _updateReferencedOptions(newLayoutData) {
    const layoutData = this.option("layoutData");
    if (isObject(layoutData)) {
      Object.getOwnPropertyNames(layoutData).forEach(((property) => delete this._optionsByReference[`layoutData.${property}`]));
    }
    if (isObject(newLayoutData)) {
      Object.getOwnPropertyNames(newLayoutData).forEach(((property) => this._optionsByReference[`layoutData.${property}`] = true));
    }
  }
  _clearWidget(instance) {
    this._disableEditorValueChangedHandler = true;
    instance.clear();
    this._disableEditorValueChangedHandler = false;
    instance.option("isValid", true);
  }
  _optionChanged(args) {
    if (0 === args.fullName.search("layoutData.")) {
      return;
    }
    switch (args.name) {
      case "showRequiredMark":
      case "showOptionalMark":
      case "requiredMark":
      case "optionalMark":
      case "alignItemLabels":
      case "labelLocation":
      case "labelMode":
      case "requiredMessage":
        this._invalidate();
        break;
      case "layoutData": {
        this._updateReferencedOptions(args.value);
        const {
          items
        } = this.option();
        if (items) {
          if (!isEmptyObject(args.value)) {
            this._itemsRunTimeInfo.each(((_, itemRunTimeInfo) => {
              if (isDefined(itemRunTimeInfo.item)) {
                const {
                  dataField
                } = itemRunTimeInfo.item;
                if (dataField && isDefined(itemRunTimeInfo.widgetInstance)) {
                  const valueGetter = compileGetter(dataField);
                  const dataValue = valueGetter(args.value);
                  const {
                    allowIndeterminateState,
                    editorType
                  } = itemRunTimeInfo.item;
                  if (void 0 !== dataValue || this._isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField)) {
                    itemRunTimeInfo.widgetInstance.option("value", dataValue);
                  } else {
                    this._clearWidget(itemRunTimeInfo.widgetInstance);
                  }
                }
              }
            }));
          }
        } else {
          this._initDataAndItems(args.value);
          this._invalidate();
        }
        break;
      }
      case "items":
        this._cleanItemWatchers();
        this._initDataAndItems(args.value);
        this._invalidate();
        break;
      case "customizeItem":
        this._updateItems(this.option("layoutData"));
        this._invalidate();
        break;
      case "colCount":
      case "colCountByScreen":
        this._resetColCount();
        break;
      case "minColWidth": {
        const {
          colCount
        } = this.option();
        if ("auto" === colCount) {
          this._resetColCount();
        }
        break;
      }
      case "readOnly":
      case "onFieldDataChanged":
        break;
      case "width": {
        super._optionChanged(args);
        const {
          colCount
        } = this.option();
        if ("auto" === colCount) {
          this._resetColCount();
        }
        break;
      }
      default:
        super._optionChanged(args);
    }
  }
  _resetColCount() {
    this._cashedColCount = null;
    this._invalidate();
  }
  linkEditorToDataField(editorInstance, dataField) {
    this.on("optionChanged", ((args) => {
      if (args.fullName === `layoutData.${dataField}`) {
        editorInstance._setOptionWithoutOptionChange("value", args.value);
      }
    }));
    editorInstance.on("valueChanged", ((args) => {
      const isValueReferenceType = isObject(args.value) || Array.isArray(args.value);
      if (!this._disableEditorValueChangedHandler && !(isValueReferenceType && args.value === args.previousValue)) {
        this._updateFieldValue(dataField, args.value);
      }
    }));
  }
  _dimensionChanged() {
    const {
      colCount
    } = this.option();
    if ("auto" === colCount && this.isCachedColCountObsolete()) {
      this._eventsStrategy.fireEvent("autoColCountChanged");
    }
  }
  updateData(data2, value) {
    if (isObject(data2)) {
      each(data2, ((dataField, fieldValue) => {
        this._updateFieldValue(dataField, fieldValue);
      }));
    } else if ("string" === typeof data2) {
      this._updateFieldValue(data2, value);
    }
  }
  getEditor(field) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(field) ?? this._itemsRunTimeInfo.findWidgetInstanceByName(field);
  }
  isSingleColumnMode(component) {
    const responsiveBox = this._responsiveBox || component;
    if (responsiveBox) {
      const {
        currentScreenFactor,
        singleColumnScreen
      } = responsiveBox.option();
      return currentScreenFactor === singleColumnScreen;
    }
    return false;
  }
  getItemsRunTimeInfo() {
    return this._itemsRunTimeInfo;
  }
};
component_registrator_default("dxLayoutManager", LayoutManager);
var form_layout_manager_default = LayoutManager;

// node_modules/devextreme/esm/ui/collection/ui.collection_widget.live_update.js
var ui_collection_widget_live_update_default = collection_widget_live_update_default;

// node_modules/devextreme/esm/__internal/ui/multi_view/multi_view.animation.js
var _translator = {
  move($element, position) {
    move($element, {
      left: position
    });
  }
};
var animation = {
  moveTo($element, position, duration, completeAction) {
    fx_default.animate($element.get(0), {
      type: "slide",
      to: {
        left: position
      },
      duration,
      complete: completeAction
    });
  },
  complete($element) {
    fx_default.stop($element.get(0), true);
  }
};

// node_modules/devextreme/esm/__internal/ui/multi_view/multi_view.js
var toNumber = (value) => +value;
var getPosition = ($element) => locate($element).left;
var MultiView = class extends ui_collection_widget_live_update_default {
  _activeStateUnit() {
    return ".dx-multiview-item";
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      pageUp: noop,
      pageDown: noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectedIndex: 0,
      swipeEnabled: true,
      animationEnabled: true,
      loop: false,
      deferRendering: true,
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: "single",
      selectionRequired: true,
      selectByClick: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _itemClass() {
    return "dx-multiview-item";
  }
  _itemDataKey() {
    return "dxMultiViewItemData";
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _itemWidth() {
    if (this._itemWidthValue) {
      return this._itemWidthValue;
    }
    return getWidth(this._$wrapper);
  }
  _clearItemWidthCache() {
    delete this._itemWidthValue;
  }
  _itemsCount() {
    const {
      items = []
    } = this.option();
    return items.length;
  }
  _isAllItemsHidden() {
    const {
      items = []
    } = this.option();
    return items.every(((_item, index) => !this._isItemVisible(index)));
  }
  _normalizeIndex(index, direction) {
    let loop = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
    const count = this._itemsCount();
    let normalizedIndex = index;
    if (this._isAllItemsHidden()) {
      return;
    }
    if (index < 0) {
      normalizedIndex += count;
    }
    if (index >= count) {
      normalizedIndex -= count;
    }
    const step = direction > 0 ? -1 : 1;
    const lastNotLoopedIndex = -1 === step ? 0 : count - 1;
    while (!this._isItemVisible(normalizedIndex) && (loop || normalizedIndex !== lastNotLoopedIndex)) {
      normalizedIndex = (normalizedIndex + step + count) % count;
    }
    return normalizedIndex;
  }
  _getRTLSignCorrection() {
    const {
      rtlEnabled
    } = this.option();
    return rtlEnabled ? -1 : 1;
  }
  _init() {
    super._init();
    const $element = this.$element();
    $element.addClass("dx-multiview");
    this._$wrapper = renderer_default("<div>").addClass("dx-multiview-wrapper");
    this._$wrapper.appendTo($element);
    this._$itemContainer = renderer_default("<div>").addClass("dx-multiview-item-container");
    this._$itemContainer.appendTo(this._$wrapper);
    const {
      loop
    } = this.option();
    this.option("loopItemFocus", loop);
    this._findBoundaryIndices();
    this._initSwipeable();
  }
  _ensureSelectedItemIsVisible() {
    const {
      loop,
      selectedIndex: currentSelectedIndex
    } = this.option();
    if (!isDefined(currentSelectedIndex)) {
      return;
    }
    if (this._isItemVisible(currentSelectedIndex)) {
      return;
    }
    if (this._isAllItemsHidden()) {
      this.option("selectedIndex", 0);
      return;
    }
    const direction = -1 * this._getRTLSignCorrection();
    let newSelectedIndex = this._normalizeIndex(currentSelectedIndex, direction, loop);
    if (newSelectedIndex === currentSelectedIndex) {
      newSelectedIndex = this._normalizeIndex(currentSelectedIndex, -direction, loop);
    }
    this.option("selectedIndex", newSelectedIndex);
  }
  _initMarkup() {
    this._deferredItems = [];
    super._initMarkup();
    this._ensureSelectedItemIsVisible();
    const selectedItemIndices = this._getSelectedItemIndices();
    this._updateItemsVisibility(selectedItemIndices[0]);
    this._setElementAria();
    this._setItemsAria();
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    super._afterItemElementDeleted($item, deletedActionArgs);
    if (this._deferredItems) {
      this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
    }
  }
  _beforeItemElementInserted(change) {
    super._beforeItemElementInserted(change);
    if (this._deferredItems) {
      this._deferredItems.splice(change.index, 0, null);
    }
  }
  _executeItemRenderAction(_index, itemData, itemElement) {
    const {
      items = []
    } = this.option();
    const index = items.indexOf(itemData);
    super._executeItemRenderAction(index, itemData, itemElement);
  }
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const deferred = Deferred();
    deferred.done((() => {
      const $itemContent = super._renderItemContent(args);
      renderContentDeferred.resolve($itemContent);
    }));
    this._deferredItems[args.index] = deferred;
    const {
      deferRendering
    } = this.option();
    if (!deferRendering) {
      deferred.resolve();
    }
    return renderContentDeferred.promise();
  }
  _render() {
    super._render();
    deferRender((() => {
      const selectedItemIndices = this._getSelectedItemIndices();
      this._updateItems(selectedItemIndices[0]);
    }));
  }
  _getElementAria() {
    return {
      role: "group",
      roledescription: message_default.format("dxMultiView-elementAriaRoleDescription"),
      label: message_default.format("dxMultiView-elementAriaLabel")
    };
  }
  _setElementAria() {
    const aria = this._getElementAria();
    this.setAria(aria, this.$element());
  }
  _setItemsAria() {
    const $itemElements = this._itemElements();
    const itemsCount = this._itemsCount();
    $itemElements.each(((itemIndex, item) => {
      const aria = this._getItemAria({
        itemIndex,
        itemsCount
      });
      this.setAria(aria, renderer_default(item));
    }));
  }
  _getItemAria(args) {
    const {
      itemIndex,
      itemsCount
    } = args;
    return {
      role: "group",
      roledescription: message_default.format("dxMultiView-itemAriaRoleDescription"),
      label: message_default.format("dxMultiView-itemAriaLabel", itemIndex + 1, itemsCount)
    };
  }
  _updateItems(selectedIndex, newIndex) {
    this._updateItemsPosition(selectedIndex, newIndex);
    this._updateItemsVisibility(selectedIndex, newIndex);
  }
  _modifyByChanges(changes, isPartialRefresh) {
    super._modifyByChanges(changes, isPartialRefresh);
    const selectedItemIndices = this._getSelectedItemIndices();
    this._updateItemsVisibility(selectedItemIndices[0]);
  }
  _updateItemsPosition(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    const positionSign = isDefined(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : void 0;
    const $selectedItem = $itemElements.eq(selectedIndex);
    _translator.move($selectedItem, 0);
    if (isDefined(newIndex) && isDefined(positionSign)) {
      _translator.move($itemElements.eq(newIndex), 100 * positionSign + "%");
    }
  }
  _isItemVisible(index) {
    var _items$index;
    const {
      items = []
    } = this.option();
    return (isDefined(index) && (null === (_items$index = items[index]) || void 0 === _items$index ? void 0 : _items$index.visible)) ?? true;
  }
  _updateItemsVisibility(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    $itemElements.each(((itemIndex, item) => {
      const $item = renderer_default(item);
      const isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;
      if (!isHidden) {
        this._renderSpecificItem(itemIndex);
      }
      $item.toggleClass("dx-multiview-item-hidden", isHidden);
      this.setAria("hidden", isHidden || void 0, $item);
    }));
  }
  _renderSpecificItem(index) {
    const $item = this._itemElements().eq(index);
    const hasItemContent = $item.find(this._itemContentClass()).length > 0;
    if (isDefined(index) && !hasItemContent) {
      var _this$_deferredItems$;
      null === (_this$_deferredItems$ = this._deferredItems[index]) || void 0 === _this$_deferredItems$ || _this$_deferredItems$.resolve();
      triggerResizeEvent($item);
    }
  }
  _refreshItem($item, item) {
    super._refreshItem($item, item);
    const {
      selectedIndex = 0
    } = this.option();
    this._updateItemsVisibility(selectedIndex);
  }
  _setAriaSelectionAttribute() {
  }
  _updateSelection(addedSelection, removedSelection) {
    const newIndex = addedSelection[0];
    const prevIndex = removedSelection[0];
    animation.complete(this._$itemContainer);
    this._updateItems(prevIndex, newIndex);
    const animationDirection = this._animationDirection(newIndex, prevIndex);
    this._animateItemContainer(animationDirection * this._itemWidth(), (() => {
      _translator.move(this._$itemContainer, 0);
      this._updateItems(newIndex);
      getWidth(this._$itemContainer);
    }));
  }
  _animateItemContainer(position, completeCallback) {
    const {
      animationEnabled
    } = this.option();
    const duration = animationEnabled ? 200 : 0;
    animation.moveTo(this._$itemContainer, position, duration, completeCallback);
  }
  _animationDirection(newIndex, prevIndex) {
    const containerPosition = getPosition(this._$itemContainer);
    const signCorrection = this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
    const indexDifference = (prevIndex - newIndex) * signCorrection;
    const isSwipePresent = 0 !== containerPosition;
    const directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
    return sign(directionSignVariable);
  }
  _getSwipeDisabledState() {
    const {
      swipeEnabled
    } = this.option();
    return !swipeEnabled || this._itemsCount() <= 1;
  }
  _initSwipeable() {
    this._createComponent(this.$element(), m_swipeable_default, {
      disabled: this._getSwipeDisabledState(),
      elastic: false,
      itemSizeFunc: this._itemWidth.bind(this),
      onStart: (args) => {
        this._swipeStartHandler(args.event);
      },
      onUpdated: (args) => {
        this._swipeUpdateHandler(args.event);
      },
      onEnd: (args) => {
        this._swipeEndHandler(args.event);
      }
    });
  }
  _findBoundaryIndices() {
    const {
      items = []
    } = this.option();
    let firstIndex;
    let lastIndex;
    items.forEach(((item, index) => {
      const isDisabled = Boolean(null === item || void 0 === item ? void 0 : item.disabled);
      const isVisible = this._isItemVisible(index);
      if (!isDisabled && isVisible) {
        firstIndex ?? (firstIndex = index);
        lastIndex = index;
      }
    }));
    this._boundaryIndices = {
      firstAvailableIndex: firstIndex ?? 0,
      lastAvailableIndex: lastIndex ?? items.length - 1,
      firstTrueIndex: 0,
      lastTrueIndex: items.length - 1
    };
  }
  _swipeStartHandler(e) {
    animation.complete(this._$itemContainer);
    const {
      selectedIndex,
      loop,
      rtlEnabled
    } = this.option();
    if (!isDefined(selectedIndex) || !isDefined(this._boundaryIndices)) {
      return;
    }
    const {
      firstAvailableIndex,
      lastAvailableIndex
    } = this._boundaryIndices;
    const canSwipeLeft = rtlEnabled ? selectedIndex > firstAvailableIndex : selectedIndex < lastAvailableIndex;
    const canSwipeRight = rtlEnabled ? selectedIndex < lastAvailableIndex : selectedIndex > firstAvailableIndex;
    e.maxLeftOffset = toNumber(!!loop || canSwipeLeft);
    e.maxRightOffset = toNumber(!!loop || canSwipeRight);
  }
  _swipeUpdateHandler(e) {
    const {
      offset
    } = e;
    const swipeDirection = sign(offset) * this._getRTLSignCorrection();
    const {
      selectedIndex
    } = this.option();
    if (!isDefined(selectedIndex)) {
      return;
    }
    const newIndex = this._normalizeIndex(selectedIndex - swipeDirection, swipeDirection);
    if (selectedIndex === newIndex) {
      return;
    }
    _translator.move(this._$itemContainer, offset * this._itemWidth());
    this._updateItems(selectedIndex, newIndex);
  }
  _findNextAvailableIndex(index, offset) {
    if (!isDefined(this._boundaryIndices)) {
      return index;
    }
    const {
      items = [],
      loop
    } = this.option();
    const {
      firstAvailableIndex,
      lastAvailableIndex,
      firstTrueIndex,
      lastTrueIndex
    } = this._boundaryIndices;
    const isFirstActive = [firstTrueIndex, firstAvailableIndex].includes(index);
    const isLastActive = [lastTrueIndex, lastAvailableIndex].includes(index);
    if (loop) {
      if (isFirstActive && offset < 0) {
        return lastAvailableIndex;
      }
      if (isLastActive && offset > 0) {
        return firstAvailableIndex;
      }
    }
    for (let i = index + offset; i >= firstAvailableIndex && i <= lastAvailableIndex; i += offset) {
      const isDisabled = Boolean(items[i].disabled);
      const isVisible = this._isItemVisible(i);
      if (!isDisabled && isVisible) {
        return i;
      }
    }
    return index;
  }
  _postprocessSwipe(args) {
  }
  _swipeEndHandler(e) {
    const targetOffset = e.targetOffset * this._getRTLSignCorrection();
    if (targetOffset) {
      const {
        selectedIndex
      } = this.option();
      if (!isDefined(selectedIndex)) {
        return;
      }
      const newSelectedIndex = this._findNextAvailableIndex(selectedIndex, -targetOffset);
      this.selectItem(newSelectedIndex).fail((() => {
        this._animateItemContainer(0, noop);
      })).done((() => {
        this._postprocessSwipe({
          swipedTabsIndex: newSelectedIndex
        });
      }));
      const $selectedElement = this.itemElements().filter(".dx-item-selected");
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        this.option("focusedElement", getPublicElement($selectedElement));
      }
    } else {
      this._animateItemContainer(0, noop);
    }
  }
  _getItemFocusLoopSignCorrection() {
    return this._itemFocusLooped ? -1 : 1;
  }
  _moveFocus(location, e) {
    super._moveFocus(location, e);
    this._itemFocusLooped = false;
  }
  _prevItem($items) {
    const $result = super._prevItem($items);
    this._itemFocusLooped = $result.is($items.last());
    return $result;
  }
  _nextItem($items) {
    const $result = super._nextItem($items);
    this._itemFocusLooped = $result.is($items.first());
    return $result;
  }
  _dimensionChanged() {
    this._clearItemWidthCache();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _updateSwipeDisabledState() {
    const disabled = this._getSwipeDisabledState();
    m_swipeable_default.getInstance(this.$element()).option("disabled", disabled);
  }
  _dispose() {
    delete this._boundaryIndices;
    super._dispose();
  }
  _itemOptionChanged(item, property, value, prevValue) {
    super._itemOptionChanged(item, property, value, prevValue);
    const {
      selectedItem
    } = this.option();
    if ("visible" === property && item === selectedItem) {
      this._ensureSelectedItemIsVisible();
    }
  }
  _optionChanged(args) {
    const {
      value
    } = args;
    switch (args.name) {
      case "loop":
        this.option("loopItemFocus", value);
        break;
      case "animationEnabled":
        break;
      case "swipeEnabled":
        this._updateSwipeDisabledState();
        break;
      case "deferRendering":
        this._invalidate();
        break;
      case "items":
        this._updateSwipeDisabledState();
        this._findBoundaryIndices();
        super._optionChanged(args);
        break;
      case "selectedIndex":
        if (this._isItemVisible(value)) {
          super._optionChanged(args);
        } else {
          this._ensureSelectedItemIsVisible();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxMultiView", MultiView);
var multi_view_default = MultiView;

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_scroll_left_max.js
function getScrollLeftMax(element) {
  return element.scrollWidth - element.clientWidth;
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_scroll_top_max.js
function getScrollTopMax(element) {
  return element.scrollHeight - element.clientHeight;
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_boundary_props.js
function isReachedLeft(scrollOffsetLeft, epsilon) {
  return Math.round(scrollOffsetLeft) <= epsilon;
}
function isReachedRight(element, scrollOffsetLeft, epsilon) {
  return Math.round(getScrollLeftMax(element) - scrollOffsetLeft) <= epsilon;
}
function isReachedTop(scrollOffsetTop, epsilon) {
  return Math.round(scrollOffsetTop) <= epsilon;
}
function isReachedBottom(element, scrollOffsetTop, pocketHeight, epsilon) {
  return Math.round(getScrollTopMax(element) - scrollOffsetTop - pocketHeight) <= epsilon;
}

// node_modules/devextreme/esm/__internal/ui/tabs/constants.js
var TABS_EXPANDED_CLASS = "dx-tabs-expanded";

// node_modules/devextreme/esm/__internal/ui/tabs/item.js
var TabsItem = class extends item_default {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher("badge", this._renderBadge.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(".dx-badge").remove();
    if (!badge) {
      return;
    }
    const $badge = renderer_default("<div>").addClass("dx-tabs-item-badge").addClass("dx-badge").text(badge);
    this._$element.append($badge);
  }
};
var item_default2 = TabsItem;

// node_modules/devextreme/esm/__internal/ui/tabs/tabs.js
var TABS_ITEM_TEXT_CLASS = "dx-tab-text";
var TABS_ITEM_TEXT_SPAN_CLASS = "dx-tab-text-span";
var TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS = "dx-tab-text-span-pseudo";
var TABS_ORIENTATION_CLASS = {
  vertical: "dx-tabs-vertical",
  horizontal: "dx-tabs-horizontal"
};
var TABS_INDICATOR_POSITION_CLASS = {
  top: "dx-tab-indicator-position-top",
  right: "dx-tab-indicator-position-right",
  bottom: "dx-tab-indicator-position-bottom",
  left: "dx-tab-indicator-position-left"
};
var TABS_ICON_POSITION_CLASS = {
  top: "dx-tabs-icon-position-top",
  end: "dx-tabs-icon-position-end",
  bottom: "dx-tabs-icon-position-bottom",
  start: "dx-tabs-icon-position-start"
};
var TABS_STYLING_MODE_CLASS = {
  primary: "dx-tabs-styling-mode-primary",
  secondary: "dx-tabs-styling-mode-secondary"
};
var ORIENTATION = {
  horizontal: "horizontal",
  vertical: "vertical"
};
var INDICATOR_POSITION = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left"
};
var SCROLLABLE_DIRECTION = {
  horizontal: "horizontal",
  vertical: "vertical"
};
var ICON_POSITION = {
  top: "top",
  end: "end",
  bottom: "bottom",
  start: "start"
};
var STYLING_MODE = {
  primary: "primary",
  secondary: "secondary"
};
var Tabs = class extends ui_collection_widget_live_update_default {
  _activeStateUnit() {
    return ".dx-tab";
  }
  _feedbackHideTimeout() {
    return 100;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      showNavButtons: true,
      scrollByContent: true,
      scrollingEnabled: true,
      selectionMode: "single",
      orientation: ORIENTATION.horizontal,
      iconPosition: ICON_POSITION.start,
      stylingMode: STYLING_MODE.primary,
      activeStateEnabled: true,
      selectionRequired: false,
      selectOnFocus: true,
      loopItemFocus: false,
      useInkRipple: false,
      badgeExpr: (data2) => null === data2 || void 0 === data2 ? void 0 : data2.badge,
      _itemAttributes: {
        role: "tab"
      },
      _indicatorPosition: null
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" !== devices_default.real().deviceType,
      options: {
        showNavButtons: false
      }
    }, {
      device: {
        deviceType: "desktop"
      },
      options: {
        scrollByContent: false
      }
    }, {
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isFluent(themeName),
      options: {
        iconPosition: ICON_POSITION.top,
        stylingMode: STYLING_MODE.secondary
      }
    }, {
      device: () => isMaterial(themeName),
      options: {
        useInkRipple: true,
        selectOnFocus: false,
        iconPosition: ICON_POSITION.top
      }
    }]);
  }
  _init() {
    const {
      orientation,
      stylingMode,
      scrollingEnabled
    } = this.option();
    const indicatorPosition = this._getIndicatorPosition();
    super._init();
    this.setAria("role", "tablist");
    this.$element().addClass("dx-tabs");
    this._toggleScrollingEnabledClass(scrollingEnabled);
    this._toggleOrientationClass(orientation);
    this._toggleIndicatorPositionClass(indicatorPosition);
    this._toggleIconPositionClass();
    this._toggleStylingModeClass(stylingMode);
    this._renderWrapper();
    this._renderMultiple();
  }
  _prepareDefaultItemTemplate(data2, $container) {
    const text = isPlainObject(data2) ? null === data2 || void 0 === data2 ? void 0 : data2.text : data2;
    if (isDefined(text)) {
      const $tabTextSpan = renderer_default("<span>").addClass("dx-tab-text-span");
      $tabTextSpan.text(text);
      const $tabTextSpanPseudo = renderer_default("<span>").addClass("dx-tab-text-span-pseudo");
      $tabTextSpanPseudo.text(text);
      $tabTextSpanPseudo.appendTo($tabTextSpan);
      $tabTextSpan.appendTo($container);
    }
    if (isDefined(data2.html)) {
      $container.html(data2.html);
    }
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate((($container, data2) => {
        this._prepareDefaultItemTemplate(data2, $container);
        const $iconElement = getImageContainer(data2.icon);
        if ($iconElement) {
          $iconElement.prependTo($container);
        }
        const $tabItem = renderer_default("<div>").addClass("dx-tab-text");
        $container.wrapInner($tabItem);
      }), ["text", "html", "icon"], this.option("integrationOptions.watchMethod"))
    });
  }
  _itemClass() {
    return "dx-tab";
  }
  _selectedItemClass() {
    return "dx-tab-selected";
  }
  _itemDataKey() {
    return "dxTabData";
  }
  _initMarkup() {
    super._initMarkup();
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
    this.$element().addClass("dx-overflow-hidden");
    this._attachResizeObserverSubscription();
  }
  _postProcessRenderItems() {
    this._renderScrolling();
  }
  _renderScrolling() {
    const removeClasses = ["dx-tabs-stretched", TABS_EXPANDED_CLASS, "dx-overflow-hidden"];
    this.$element().removeClass(removeClasses.join(" "));
    if (this.option("scrollingEnabled") && this._isItemsSizeExceeded()) {
      if (!this._scrollable) {
        this._renderScrollable();
        this._renderNavButtons();
      }
      const scrollable = this.getScrollable();
      null === scrollable || void 0 === scrollable || scrollable.update();
      if (this.option("rtlEnabled")) {
        const maxLeftOffset = getScrollLeftMax(renderer_default(this.getScrollable().container()).get(0));
        null === scrollable || void 0 === scrollable || scrollable.scrollTo({
          left: maxLeftOffset
        });
      }
      this._updateNavButtonsState();
      const {
        selectedItem
      } = this.option();
      this._scrollToItem(selectedItem);
    }
    if (!(this.option("scrollingEnabled") && this._isItemsSizeExceeded())) {
      this._cleanScrolling();
      if (this._needStretchItems()) {
        this.$element().addClass("dx-tabs-stretched");
      }
      this.$element().removeClass("dx-tabs-nav-buttons").addClass(TABS_EXPANDED_CLASS);
    }
  }
  _isVertical() {
    const {
      orientation
    } = this.option();
    return orientation === ORIENTATION.vertical;
  }
  _isItemsSizeExceeded() {
    const isVertical = this._isVertical();
    return isVertical ? this._isItemsHeightExceeded() : this._isItemsWidthExceeded();
  }
  _isItemsWidthExceeded() {
    const $visibleItems = this._getVisibleItems();
    const tabItemTotalWidth = this._getSummaryItemsSize("width", $visibleItems, true);
    const elementWidth = getWidth(this.$element());
    if ([tabItemTotalWidth, elementWidth].includes(0)) {
      return false;
    }
    return tabItemTotalWidth > elementWidth - 1;
  }
  _isItemsHeightExceeded() {
    const $visibleItems = this._getVisibleItems();
    const itemsHeight = this._getSummaryItemsSize("height", $visibleItems, true);
    const elementHeight = getHeight(this.$element());
    return itemsHeight - 1 > elementHeight;
  }
  _needStretchItems() {
    const $visibleItems = this._getVisibleItems();
    const elementWidth = getWidth(this.$element());
    const itemsWidth = [];
    each($visibleItems, ((_, item) => {
      itemsWidth.push(getOuterWidth(item, true));
    }));
    const maxTabItemWidth = Math.max.apply(null, itemsWidth);
    const requireWidth = elementWidth / $visibleItems.length;
    return maxTabItemWidth > requireWidth + 1;
  }
  _cleanNavButtons() {
    if (!this._leftButton || !this._rightButton) {
      return;
    }
    this._leftButton.$element().remove();
    this._rightButton.$element().remove();
    this._leftButton = null;
    this._rightButton = null;
  }
  _cleanScrolling() {
    if (!this._scrollable) {
      return;
    }
    this._$wrapper.appendTo(this.$element());
    this._scrollable.$element().remove();
    this._scrollable = null;
    this._cleanNavButtons();
  }
  _renderInkRipple() {
    this._inkRipple = render();
  }
  _getPointerEvent() {
    return m_pointer_default.up;
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value, event);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _renderMultiple() {
    const {
      selectionMode
    } = this.option();
    if ("multiple" === selectionMode) {
      this.option("selectOnFocus", false);
    }
  }
  _renderWrapper() {
    this._$wrapper = renderer_default("<div>").addClass("dx-tabs-wrapper");
    this.$element().append(this._$wrapper);
  }
  _itemContainer() {
    return this._$wrapper;
  }
  _getScrollableDirection() {
    const isVertical = this._isVertical();
    return isVertical ? SCROLLABLE_DIRECTION.vertical : SCROLLABLE_DIRECTION.horizontal;
  }
  _updateScrollable() {
    if (this.getScrollable()) {
      this._cleanScrolling();
    }
    this._renderScrolling();
  }
  _renderScrollable() {
    const $itemContainer = this.$element().wrapInner(renderer_default("<div>").addClass("dx-tabs-scrollable")).children();
    const {
      scrollByContent
    } = this.option();
    this._scrollable = this._createComponent($itemContainer, scrollable_default, {
      direction: this._getScrollableDirection(),
      showScrollbar: "never",
      useKeyboard: false,
      useNative: false,
      scrollByContent,
      onScroll: () => {
        this._updateNavButtonsState();
      }
    });
    this.$element().append(this._scrollable.$element());
  }
  _scrollToItem(item) {
    if (!this._scrollable) {
      return;
    }
    const $item = this._editStrategy.getItemElement(item);
    this._scrollable.scrollToElement($item);
  }
  _itemPointerHandler(e) {
    this._handleItemFocus(e);
  }
  _itemPointerUpHandler(e) {
    super._itemPointerHandler(e);
  }
  _renderNavButtons() {
    const {
      showNavButtons,
      rtlEnabled
    } = this.option();
    this.$element().toggleClass("dx-tabs-nav-buttons", showNavButtons);
    if (!showNavButtons) {
      return;
    }
    this._leftButton = this._createNavButton(-30, rtlEnabled ? "chevronnext" : "chevronprev");
    const $leftButton = this._leftButton.$element();
    $leftButton.addClass("dx-tabs-nav-button-left");
    this.$element().prepend($leftButton);
    this._rightButton = this._createNavButton(30, rtlEnabled ? "chevronprev" : "chevronnext");
    const $rightButton = this._rightButton.$element();
    $rightButton.addClass("dx-tabs-nav-button-right");
    this.$element().append($rightButton);
  }
  _updateNavButtonsAriaDisabled() {
    const buttons = [this._leftButton, this._rightButton];
    buttons.forEach(((button) => {
      null === button || void 0 === button || button.$element().attr({
        "aria-disabled": null
      });
    }));
  }
  _updateNavButtonsState() {
    const isVertical = this._isVertical();
    const scrollable = this.getScrollable();
    if (isVertical) {
      var _this$_leftButton, _this$_rightButton;
      null === (_this$_leftButton = this._leftButton) || void 0 === _this$_leftButton || _this$_leftButton.option("disabled", isReachedTop(scrollable.scrollTop(), 1));
      null === (_this$_rightButton = this._rightButton) || void 0 === _this$_rightButton || _this$_rightButton.option("disabled", isReachedBottom(renderer_default(scrollable.container()).get(0), scrollable.scrollTop(), 0, 1));
    } else {
      var _this$_leftButton2, _this$_rightButton2;
      null === (_this$_leftButton2 = this._leftButton) || void 0 === _this$_leftButton2 || _this$_leftButton2.option("disabled", isReachedLeft(scrollable.scrollLeft(), 1));
      null === (_this$_rightButton2 = this._rightButton) || void 0 === _this$_rightButton2 || _this$_rightButton2.option("disabled", isReachedRight(renderer_default(scrollable.container()).get(0), scrollable.scrollLeft(), 1));
    }
    this._updateNavButtonsAriaDisabled();
  }
  _updateScrollPosition(offset, duration) {
    var _this$_scrollable, _this$_scrollable2;
    null === (_this$_scrollable = this._scrollable) || void 0 === _this$_scrollable || _this$_scrollable.update();
    null === (_this$_scrollable2 = this._scrollable) || void 0 === _this$_scrollable2 || _this$_scrollable2.scrollBy(offset / duration);
  }
  _createNavButton(offset, icon) {
    const holdAction = this._createAction((() => {
      this._holdInterval = setInterval((() => {
        this._updateScrollPosition(offset, 5);
      }), 5);
    }));
    const holdEventName = addNamespace(m_hold_default.name, "dxNavButton");
    const pointerUpEventName = addNamespace(m_pointer_default.up, "dxNavButton");
    const pointerOutEventName = addNamespace(m_pointer_default.out, "dxNavButton");
    const navButton = this._createComponent(renderer_default("<div>").addClass("dx-tabs-nav-button"), button_default, {
      focusStateEnabled: false,
      icon,
      integrationOptions: {},
      elementAttr: {
        role: null,
        "aria-label": null,
        "aria-disabled": null
      },
      onClick: () => {
        this._updateScrollPosition(offset, 1);
      }
    });
    const $navButton = navButton.$element();
    m_events_engine_default.on($navButton, holdEventName, {
      timeout: 300
    }, ((e) => {
      holdAction({
        event: e
      });
    }));
    m_events_engine_default.on($navButton, pointerUpEventName, (() => {
      this._clearInterval();
    }));
    m_events_engine_default.on($navButton, pointerOutEventName, (() => {
      this._clearInterval();
    }));
    return navButton;
  }
  _clearInterval() {
    if (this._holdInterval) {
      clearInterval(this._holdInterval);
    }
  }
  _updateSelection(addedSelection) {
    if (this._scrollable) {
      return this._scrollable.scrollToElement(this.itemElements().eq(addedSelection[0]));
    }
    return;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _attachResizeObserverSubscription() {
    resize_observer_default.unobserve(this.$element().get(0));
    resize_observer_default.observe(this.$element().get(0), (() => {
      this._dimensionChanged();
    }));
  }
  _dimensionChanged() {
    this._renderScrolling();
  }
  _enterKeyHandler(e) {
    const {
      focusedElement
    } = this.option();
    super._enterKeyHandler(e);
    this.option("focusedElement", focusedElement);
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    if ("single" === selectionMode && this.isItemSelected(e.currentTarget)) {
      return;
    }
    super._itemSelectHandler(e);
  }
  _clean() {
    resize_observer_default.unobserve(this.$element().get(0));
    this._cleanScrolling();
    super._clean();
  }
  _toggleTabsVerticalClass(value) {
    this.$element().toggleClass(TABS_ORIENTATION_CLASS.vertical, value);
  }
  _toggleTabsHorizontalClass(value) {
    this.$element().toggleClass(TABS_ORIENTATION_CLASS.horizontal, value);
  }
  _getIndicatorPositionClass(indicatorPosition) {
    return TABS_INDICATOR_POSITION_CLASS[indicatorPosition];
  }
  _getIndicatorPosition() {
    const {
      _indicatorPosition,
      rtlEnabled
    } = this.option();
    if (_indicatorPosition) {
      return _indicatorPosition;
    }
    const isVertical = this._isVertical();
    if (rtlEnabled) {
      return isVertical ? INDICATOR_POSITION.left : INDICATOR_POSITION.bottom;
    }
    return isVertical ? INDICATOR_POSITION.right : INDICATOR_POSITION.bottom;
  }
  _toggleIndicatorPositionClass(indicatorPosition) {
    const newClass = this._getIndicatorPositionClass(indicatorPosition);
    this._toggleElementClasses(TABS_INDICATOR_POSITION_CLASS, newClass);
  }
  _toggleScrollingEnabledClass(scrollingEnabled) {
    this.$element().toggleClass("dx-tabs-scrolling-enabled", Boolean(scrollingEnabled));
  }
  _toggleOrientationClass(orientation) {
    const isVertical = orientation === ORIENTATION.vertical;
    this._toggleTabsVerticalClass(isVertical);
    this._toggleTabsHorizontalClass(!isVertical);
  }
  _getTabsIconPositionClass() {
    const {
      iconPosition
    } = this.option();
    switch (iconPosition) {
      case ICON_POSITION.top:
        return TABS_ICON_POSITION_CLASS.top;
      case ICON_POSITION.end:
        return TABS_ICON_POSITION_CLASS.end;
      case ICON_POSITION.bottom:
        return TABS_ICON_POSITION_CLASS.bottom;
      default:
        return TABS_ICON_POSITION_CLASS.start;
    }
  }
  _toggleIconPositionClass() {
    const newClass = this._getTabsIconPositionClass();
    this._toggleElementClasses(TABS_ICON_POSITION_CLASS, newClass);
  }
  _toggleStylingModeClass(value) {
    const newClass = TABS_STYLING_MODE_CLASS[value ?? "primary"];
    this._toggleElementClasses(TABS_STYLING_MODE_CLASS, newClass);
  }
  _toggleElementClasses(classMap, newClass) {
    for (const key in classMap) {
      this.$element().removeClass(classMap[key]);
    }
    this.$element().addClass(newClass);
  }
  _toggleFocusedDisabledNextClass(currentIndex, isNextDisabled) {
    this._itemElements().eq(currentIndex).toggleClass("dx-focused-disabled-next-tab", isNextDisabled);
  }
  _toggleFocusedDisabledPrevClass(currentIndex, isPrevDisabled) {
    this._itemElements().eq(currentIndex).toggleClass("dx-focused-disabled-prev-tab", isPrevDisabled);
  }
  _toggleFocusedDisabledClasses(value) {
    const {
      selectedIndex: currentIndex
    } = this.option();
    this._itemElements().removeClass("dx-focused-disabled-next-tab").removeClass("dx-focused-disabled-prev-tab");
    const prevItemIndex = currentIndex - 1;
    const nextItemIndex = currentIndex + 1;
    const nextFocusedIndex = renderer_default(value).index();
    const isNextDisabled = this._itemElements().eq(nextItemIndex).hasClass("dx-state-disabled");
    const isPrevDisabled = this._itemElements().eq(prevItemIndex).hasClass("dx-state-disabled");
    const shouldNextClassBeSetted = isNextDisabled && nextFocusedIndex === nextItemIndex;
    const shouldPrevClassBeSetted = isPrevDisabled && nextFocusedIndex === prevItemIndex;
    this._toggleFocusedDisabledNextClass(currentIndex, shouldNextClassBeSetted);
    this._toggleFocusedDisabledPrevClass(currentIndex, shouldPrevClassBeSetted);
  }
  _updateFocusedElement() {
    const {
      focusStateEnabled,
      selectedIndex
    } = this.option();
    const itemElements = this._itemElements();
    if (focusStateEnabled && itemElements.length) {
      const selectedItem = itemElements.get(selectedIndex);
      this.option({
        focusedElement: selectedItem
      });
    }
  }
  _optionChanged(args) {
    var _this$_scrollable3;
    const {
      name,
      value
    } = args;
    switch (name) {
      case "useInkRipple":
      case "scrollingEnabled":
        this._toggleScrollingEnabledClass(value);
        this._invalidate();
        break;
      case "showNavButtons":
      case "badgeExpr":
        this._invalidate();
        break;
      case "scrollByContent":
        null === (_this$_scrollable3 = this._scrollable) || void 0 === _this$_scrollable3 || _this$_scrollable3.option(name, value);
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case "selectionMode":
        this._renderMultiple();
        super._optionChanged(args);
        break;
      case "focusedElement":
        this._toggleFocusedDisabledClasses(renderer_default(value));
        super._optionChanged(args);
        this._scrollToItem(value);
        break;
      case "rtlEnabled": {
        super._optionChanged(args);
        const indicatorPosition = this._getIndicatorPosition();
        this._toggleIndicatorPositionClass(indicatorPosition);
        break;
      }
      case "orientation": {
        this._toggleOrientationClass(value);
        const indicatorPosition = this._getIndicatorPosition();
        this._toggleIndicatorPositionClass(indicatorPosition);
        if (hasWindow()) {
          this._updateScrollable();
        }
        break;
      }
      case "iconPosition":
        this._toggleIconPositionClass();
        if (hasWindow()) {
          this._dimensionChanged();
        }
        break;
      case "stylingMode":
        this._toggleStylingModeClass(value);
        if (hasWindow()) {
          this._dimensionChanged();
        }
        break;
      case "_indicatorPosition": {
        const indicatorPosition = this._getIndicatorPosition();
        this._toggleIndicatorPositionClass(indicatorPosition);
        break;
      }
      case "selectedIndex":
      case "selectedItem":
      case "selectedItems":
        super._optionChanged(args);
        this._updateFocusedElement();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _afterItemElementInserted() {
    super._afterItemElementInserted();
    this._planPostRenderActions();
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    super._afterItemElementDeleted($item, deletedActionArgs);
    this._renderScrolling();
  }
  getScrollable() {
    return this._scrollable;
  }
};
Tabs.ItemClass = item_default2;
component_registrator_default("dxTabs", Tabs);
var tabs_default = Tabs;

// node_modules/devextreme/esm/__internal/ui/tab_panel/item.js
var TabPanelItem = class extends item_default {
  _renderWatchers() {
    this._startWatcher("badge", noop);
    super._renderWatchers();
  }
};

// node_modules/devextreme/esm/__internal/ui/tab_panel/tab_panel.js
var TABPANEL_TABS_POSITION_CLASS = {
  top: "dx-tabpanel-tabs-position-top",
  right: "dx-tabpanel-tabs-position-right",
  bottom: "dx-tabpanel-tabs-position-bottom",
  left: "dx-tabpanel-tabs-position-left"
};
var TABS_POSITION = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left"
};
var TABS_INDICATOR_POSITION_BY_TABS_POSITION = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var TABS_ORIENTATION = {
  horizontal: "horizontal",
  vertical: "vertical"
};
var ICON_POSITION2 = {
  top: "top",
  end: "end",
  bottom: "bottom",
  start: "start"
};
var STYLING_MODE2 = {
  primary: "primary",
  secondary: "secondary"
};
var TabPanel = class extends multi_view_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTitleTemplate: "title",
      hoverStateEnabled: true,
      selectOnFocus: false,
      showNavButtons: false,
      scrollByContent: true,
      scrollingEnabled: true,
      tabsPosition: TABS_POSITION.top,
      iconPosition: ICON_POSITION2.start,
      stylingMode: STYLING_MODE2.primary,
      onTitleClick: null,
      onTitleHold: null,
      onTitleRendered: null,
      badgeExpr: (data2) => null === data2 || void 0 === data2 ? void 0 : data2.badge,
      _tabsIndicatorPosition: null
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => !m_support_default.touch,
      options: {
        swipeEnabled: false
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        animationEnabled: false
      }
    }, {
      device: () => isFluent(themeName),
      options: {
        stylingMode: STYLING_MODE2.secondary
      }
    }, {
      device: () => isMaterialBased(themeName),
      options: {
        iconPosition: ICON_POSITION2.top
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass("dx-tabpanel");
    this._toggleTabPanelTabsPositionClass();
  }
  _getElementAria() {
    return {
      role: "tabpanel"
    };
  }
  _getItemAria() {
    return {
      role: "tabpanel"
    };
  }
  _initMarkup() {
    super._initMarkup();
    this._createTitleActions();
    this._renderLayout();
  }
  _prepareTabsItemTemplate(data2, $container) {
    const $iconElement = getImageContainer(null === data2 || void 0 === data2 ? void 0 : data2.icon);
    if ($iconElement) {
      $container.append($iconElement);
    }
    const title = isPlainObject(data2) ? null === data2 || void 0 === data2 ? void 0 : data2.title : data2;
    if (isDefined(title) && !isPlainObject(title)) {
      const $tabTextSpan = renderer_default("<span>").addClass(TABS_ITEM_TEXT_SPAN_CLASS);
      $tabTextSpan.append(dom_adapter_default.createTextNode(title));
      const $tabTextSpanPseudo = renderer_default("<span>").addClass(TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS);
      $tabTextSpanPseudo.append(dom_adapter_default.createTextNode(title));
      $tabTextSpanPseudo.appendTo($tabTextSpan);
      $tabTextSpan.appendTo($container);
    }
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new BindableTemplate((($container, data2) => {
        this._prepareTabsItemTemplate(data2, $container);
        const $tabItem = renderer_default("<div>").addClass(TABS_ITEM_TEXT_CLASS);
        $container.wrapInner($tabItem);
      }), ["title", "icon"], this.option("integrationOptions.watchMethod"))
    });
  }
  _createTitleActions() {
    this._createTitleClickAction();
    this._createTitleHoldAction();
    this._createTitleRenderedAction();
  }
  _createTitleClickAction() {
    this._titleClickAction = this._createActionByOption("onTitleClick");
  }
  _createTitleHoldAction() {
    this._titleHoldAction = this._createActionByOption("onTitleHold");
  }
  _createTitleRenderedAction() {
    this._titleRenderedAction = this._createActionByOption("onTitleRendered");
  }
  _renderLayout() {
    if (this._tabs) {
      return;
    }
    const $element = this.$element();
    this._$tabContainer = renderer_default("<div>").addClass("dx-tabpanel-tabs").appendTo($element);
    const $tabs = renderer_default("<div>").appendTo(this._$tabContainer);
    this._tabs = this._createComponent($tabs, tabs_default, this._tabConfig());
    this._$container = renderer_default("<div>").addClass("dx-tabpanel-container").appendTo($element);
    this._$container.append(this._$wrapper);
    const {
      focusStateEnabled,
      selectedIndex
    } = this.option();
    if (focusStateEnabled && isDefined(selectedIndex)) {
      const selectedItem = this._tabs.itemElements().get(selectedIndex);
      if (selectedItem) {
        this._tabs.option({
          focusedElement: selectedItem
        });
      }
    }
  }
  _refreshActiveDescendant() {
    if (!this._tabs) {
      return;
    }
    const tabs = this._tabs;
    const tabItems = tabs.itemElements();
    const $activeTab = renderer_default(tabItems[tabs.option("selectedIndex")]);
    const id = this.getFocusedItemId();
    this.setAria("controls", void 0, renderer_default(tabItems));
    this.setAria("controls", id, $activeTab);
  }
  _getTabsIndicatorPosition() {
    const {
      _tabsIndicatorPosition,
      tabsPosition
    } = this.option();
    return _tabsIndicatorPosition ?? TABS_INDICATOR_POSITION_BY_TABS_POSITION[tabsPosition ?? TABS_POSITION.top];
  }
  _tabConfig() {
    const tabsIndicatorPosition = this._getTabsIndicatorPosition();
    const {
      focusStateEnabled,
      hoverStateEnabled,
      repaintChangesOnly,
      tabIndex,
      selectedIndex,
      badgeExpr,
      itemHoldTimeout,
      items,
      scrollingEnabled,
      scrollByContent,
      showNavButtons,
      loop,
      iconPosition,
      stylingMode
    } = this.option();
    return {
      selectOnFocus: true,
      focusStateEnabled,
      hoverStateEnabled,
      repaintChangesOnly,
      tabIndex,
      selectedIndex,
      badgeExpr,
      onItemClick: this._titleClickAction.bind(this),
      onItemHold: this._titleHoldAction.bind(this),
      itemHoldTimeout,
      onSelectionChanging: (e) => {
        const newTabsSelectedItemData = e.addedItems[0];
        const newTabsSelectedIndex = this._getIndexByItemData(newTabsSelectedItemData);
        const selectingResult = this.selectItem(newTabsSelectedIndex);
        const promiseState = selectingResult.state();
        if ("pending" !== promiseState) {
          e.cancel = "rejected" === promiseState;
          return;
        }
        e.cancel = new Promise(((resolve) => {
          selectingResult.done((() => {
            resolve(false);
          })).fail((() => {
            resolve(true);
          }));
        }));
      },
      onSelectionChanged: () => {
        this._refreshActiveDescendant();
      },
      onItemRendered: this._titleRenderedAction.bind(this),
      itemTemplate: this._getTemplateByOption("itemTitleTemplate"),
      items,
      noDataText: null,
      scrollingEnabled,
      scrollByContent,
      showNavButtons,
      itemTemplateProperty: "tabTemplate",
      loopItemFocus: loop,
      selectionRequired: true,
      onOptionChanged: (args) => {
        if ("focusedElement" === args.name) {
          if (args.value) {
            const $value = renderer_default(args.value);
            const $newItem = this._itemElements().eq($value.index());
            this.option("focusedElement", getPublicElement($newItem));
          } else {
            this.option("focusedElement", args.value);
          }
        }
      },
      onFocusIn: (args) => {
        this._focusInHandler(args.event);
      },
      onFocusOut: (args) => {
        if (!this._isFocusOutHandlerExecuting) {
          this._focusOutHandler(args.event);
        }
      },
      orientation: this._getTabsOrientation(),
      iconPosition,
      stylingMode,
      _itemAttributes: {
        class: "dx-tabpanel-tab"
      },
      _indicatorPosition: tabsIndicatorPosition
    };
  }
  _renderFocusTarget() {
    this._focusTarget().attr("tabIndex", -1);
  }
  _getTabsOrientation() {
    const {
      tabsPosition
    } = this.option();
    if ([TABS_POSITION.right, TABS_POSITION.left].includes(tabsPosition)) {
      return TABS_ORIENTATION.vertical;
    }
    return TABS_ORIENTATION.horizontal;
  }
  _getTabPanelTabsPositionClass() {
    const {
      tabsPosition
    } = this.option();
    switch (tabsPosition) {
      case TABS_POSITION.right:
        return TABPANEL_TABS_POSITION_CLASS.right;
      case TABS_POSITION.bottom:
        return TABPANEL_TABS_POSITION_CLASS.bottom;
      case TABS_POSITION.left:
        return TABPANEL_TABS_POSITION_CLASS.left;
      case TABS_POSITION.top:
      default:
        return TABPANEL_TABS_POSITION_CLASS.top;
    }
  }
  _toggleTabPanelTabsPositionClass() {
    for (const key in TABPANEL_TABS_POSITION_CLASS) {
      this.$element().removeClass(TABPANEL_TABS_POSITION_CLASS[key]);
    }
    const newClass = this._getTabPanelTabsPositionClass();
    this.$element().addClass(newClass);
  }
  _updateTabsOrientation() {
    const orientation = this._getTabsOrientation();
    this._setTabsOption("orientation", orientation);
  }
  _toggleWrapperFocusedClass(isFocused) {
    this._toggleFocusClass(isFocused, this._$wrapper);
  }
  _toggleDisabledFocusedClass(isFocused) {
    this._focusTarget().toggleClass("dx-disabled-focused-tab", isFocused);
  }
  _updateFocusState(e, isFocused) {
    super._updateFocusState(e, isFocused);
    const isTabsTarget = e.target === this._tabs._focusTarget().get(0);
    const isMultiViewTarget = e.target === this._focusTarget().get(0);
    if (isTabsTarget) {
      this._toggleFocusClass(isFocused, this._focusTarget());
    }
    if (isTabsTarget || isMultiViewTarget) {
      const isDisabled = this._isDisabled(this.option("focusedElement"));
      this._toggleWrapperFocusedClass(isFocused && !isDisabled);
      this._toggleDisabledFocusedClass(isFocused && isDisabled);
    }
    if (isMultiViewTarget) {
      this._toggleFocusClass(isFocused, this._tabs.$element());
      this._toggleFocusClass(isFocused, this._tabs.option("focusedElement"));
    }
  }
  _focusOutHandler(e) {
    this._isFocusOutHandlerExecuting = true;
    super._focusOutHandler(e);
    this._tabs._focusOutHandler(e);
    this._isFocusOutHandlerExecuting = false;
  }
  _setTabsOption(name, value) {
    if (this._tabs) {
      this._tabs.option(name, value);
    }
  }
  _postprocessSwipe(args) {
    this._setTabsOption("selectedIndex", args.swipedTabsIndex);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._tabs._dimensionChanged();
    }
  }
  registerKeyHandler(key, handler) {
    super.registerKeyHandler(key, handler);
    if (this._tabs) {
      this._tabs.registerKeyHandler(key, handler);
    }
  }
  repaint() {
    super.repaint();
    this._tabs.repaint();
  }
  _updateTabsIndicatorPosition() {
    const value = this._getTabsIndicatorPosition();
    this._setTabsOption("_indicatorPosition", value);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      fullName
    } = args;
    switch (name) {
      case "dataSource":
      default:
        super._optionChanged(args);
        break;
      case "items":
        this._setTabsOption(name, this.option(name));
        if (!this.option("repaintChangesOnly")) {
          this._tabs.repaint();
        }
        super._optionChanged(args);
        break;
      case "width":
        super._optionChanged(args);
        this._tabs.repaint();
        break;
      case "selectedIndex":
      case "selectedItem": {
        this._setTabsOption(fullName, value);
        super._optionChanged(args);
        const {
          focusStateEnabled
        } = this.option();
        if (true === focusStateEnabled) {
          const selectedIndex = this.option("selectedIndex");
          const selectedTabContent = this._itemElements().eq(selectedIndex);
          this.option("focusedElement", getPublicElement(selectedTabContent));
        }
        break;
      }
      case "itemHoldTimeout":
      case "focusStateEnabled":
      case "hoverStateEnabled":
        this._setTabsOption(fullName, value);
        super._optionChanged(args);
        break;
      case "scrollingEnabled":
      case "scrollByContent":
      case "showNavButtons":
        this._setTabsOption(fullName, value);
        break;
      case "focusedElement": {
        const id = value ? renderer_default(value).index() : value;
        const newItem = value && this._tabs ? this._tabs._itemElements().eq(id) : value;
        this._setTabsOption("focusedElement", getPublicElement(newItem));
        if (value) {
          const isDisabled = this._isDisabled(value);
          this._toggleWrapperFocusedClass(!isDisabled);
          this._toggleDisabledFocusedClass(isDisabled);
        }
        super._optionChanged(args);
        break;
      }
      case "itemTitleTemplate":
        this._setTabsOption("itemTemplate", this._getTemplateByOption("itemTitleTemplate"));
        break;
      case "onTitleClick":
        this._createTitleClickAction();
        this._setTabsOption("onItemClick", this._titleClickAction.bind(this));
        break;
      case "onTitleHold":
        this._createTitleHoldAction();
        this._setTabsOption("onItemHold", this._titleHoldAction.bind(this));
        break;
      case "onTitleRendered":
        this._createTitleRenderedAction();
        this._setTabsOption("onItemRendered", this._titleRenderedAction.bind(this));
        break;
      case "loop":
        this._setTabsOption("loopItemFocus", value);
        super._optionChanged(args);
        break;
      case "badgeExpr":
        this._invalidate();
        break;
      case "tabsPosition":
        this._toggleTabPanelTabsPositionClass();
        this._updateTabsIndicatorPosition();
        this._updateTabsOrientation();
        break;
      case "iconPosition":
        this._setTabsOption("iconPosition", value);
        break;
      case "stylingMode":
        this._setTabsOption("stylingMode", value);
        break;
      case "_tabsIndicatorPosition":
        this._setTabsOption("_indicatorPosition", value);
    }
  }
};
TabPanel.ItemClass = TabPanelItem;
component_registrator_default("dxTabPanel", TabPanel);
var tab_panel_default = TabPanel;

// node_modules/devextreme/esm/__internal/ui/form/form.js
var ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ["items", "isRequired", "validationRules", "visible"];
var Form = class extends widget_default {
  _init() {
    super._init();
    this._dirtyFields = /* @__PURE__ */ new Set();
    this._cachedColCountOptions = [];
    this._itemsRunTimeInfo = new FormItemsRunTimeInfo();
    this._groupsColCount = [];
    this._attachSyncSubscriptions();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      formID: `dx-${new guid_default()}`,
      formData: {},
      colCount: 1,
      screenByWidth: defaultScreenFactorFunc,
      labelLocation: "left",
      readOnly: false,
      onFieldDataChanged: null,
      customizeItem: null,
      onEditorEnterKey: null,
      minColWidth: 200,
      alignItemLabels: true,
      alignItemLabelsInAllGroups: true,
      alignRootItemLabels: true,
      showColonAfterLabel: true,
      showRequiredMark: true,
      showOptionalMark: false,
      requiredMark: "*",
      optionalMark: message_default.format("dxForm-optionalMark"),
      requiredMessage: message_default.getFormatter("dxForm-requiredMessage"),
      showValidationSummary: false,
      scrollingEnabled: false,
      stylingMode: config_default().editorStylingMode,
      labelMode: "outside",
      isDirty: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => isMaterialBased(current()),
      options: {
        labelLocation: "top"
      }
    }, {
      device: () => isMaterial(current()),
      options: {
        showColonAfterLabel: false
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      formData: true,
      validationGroup: true
    });
  }
  _getGroupColCount($element) {
    return parseInt($element.attr(GROUP_COL_COUNT_ATTR) ?? "1", 10);
  }
  _applyLabelsWidthByCol($container, index) {
    let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const fieldItemClass = null !== options && void 0 !== options && options.inOneColumn ? FIELD_ITEM_CLASS : FORM_FIELD_ITEM_COL_CLASS + index;
    const cssExcludeTabbedSelector = null !== options && void 0 !== options && options.excludeTabbed ? `:not(.${FIELD_ITEM_TAB_CLASS})` : "";
    setLabelWidthByMaxLabelWidth($container, `.${fieldItemClass}${cssExcludeTabbedSelector}`);
  }
  _applyLabelsWidth($container, excludeTabbed, inOneColumn, colCount) {
    const applyLabelsOptions = {
      excludeTabbed,
      inOneColumn
    };
    const columnsCount = inOneColumn ? 1 : colCount ?? this._getGroupColCount($container);
    for (let i = 0; i < columnsCount; i += 1) {
      this._applyLabelsWidthByCol($container, i, applyLabelsOptions);
    }
  }
  _getGroupElementsInColumn($container, columnIndex, colCount) {
    const cssColCountSelector = isDefined(colCount) ? `.${GROUP_COL_COUNT_CLASS}${colCount}` : "";
    const groupSelector = `.${FORM_FIELD_ITEM_COL_CLASS}${columnIndex} > .${FIELD_ITEM_CONTENT_CLASS} > .${FORM_GROUP_CLASS}${cssColCountSelector}`;
    return $container.find(groupSelector);
  }
  _applyLabelsWidthWithGroups($container, colCount, excludeTabbed) {
    const {
      alignRootItemLabels
    } = this.option();
    if (true === alignRootItemLabels) {
      const $rootSimpleItems = $container.find(`.${ROOT_SIMPLE_ITEM_CLASS}`);
      for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
        this._applyLabelsWidthByCol($rootSimpleItems, colIndex);
      }
    }
    const alignItemLabelsInAllGroups = this.option("alignItemLabelsInAllGroups");
    if (alignItemLabelsInAllGroups) {
      this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed);
    } else {
      const $groups = this.$element().find(`.${FORM_GROUP_CLASS}`);
      for (let i = 0; i < $groups.length; i += 1) {
        this._applyLabelsWidth($groups.eq(i), excludeTabbed, false, void 0);
      }
    }
  }
  _applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed) {
    const applyLabelsOptions = {
      excludeTabbed
    };
    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      const $baseGroups = this._getGroupElementsInColumn($container, colIndex);
      this._applyLabelsWidthByCol($baseGroups, 0, applyLabelsOptions);
      for (let groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex += 1) {
        const $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
        const groupColCount = this._getGroupColCount($groupsByCol);
        for (let groupColIndex = 1; groupColIndex < groupColCount; groupColIndex += 1) {
          this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions);
        }
      }
    }
  }
  _labelLocation() {
    const {
      labelLocation
    } = this.option();
    return labelLocation;
  }
  _alignLabelsInColumn(options) {
    const {
      layoutManager,
      inOneColumn,
      $container,
      excludeTabbed,
      items
    } = options;
    if (!hasWindow() || "top" === this._labelLocation()) {
      return;
    }
    if (inOneColumn) {
      this._applyLabelsWidth($container, excludeTabbed, true, void 0);
    } else if (this._checkGrouping(items)) {
      this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed);
    } else {
      this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount());
    }
  }
  _prepareFormData() {
    if (!isDefined(this.option("formData"))) {
      this.option("formData", {});
    }
  }
  _setStylingModeClass() {
    const {
      stylingMode
    } = this.option();
    if ("underlined" === stylingMode) {
      this.$element().addClass(FORM_UNDERLINED_CLASS);
    }
  }
  _initMarkup() {
    m_validation_engine_default.addGroup(this._getValidationGroup(), false);
    this._clearCachedInstances();
    this._prepareFormData();
    this.$element().addClass(FORM_CLASS);
    this._setStylingModeClass();
    super._initMarkup();
    this.setAria("role", "form", this.$element());
    const {
      scrollingEnabled
    } = this.option();
    if (scrollingEnabled) {
      this._renderScrollable();
    }
    this._renderLayout();
    this._renderValidationSummary();
    this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
    this._attachResizeObserverSubscription();
  }
  _attachResizeObserverSubscription() {
    if (hasWindow()) {
      const formRootElement = this.$element().get(0);
      resize_observer_default.unobserve(formRootElement);
      resize_observer_default.observe(formRootElement, (() => {
        this._resizeHandler();
      }));
    }
  }
  _resizeHandler() {
    if (this._cachedLayoutManagers.length) {
      each(this._cachedLayoutManagers, ((_, layoutManager) => {
        const {
          onLayoutChanged
        } = layoutManager.option();
        null === onLayoutChanged || void 0 === onLayoutChanged || onLayoutChanged(layoutManager.isSingleColumnMode());
      }));
    }
  }
  _getCurrentScreenFactor() {
    const {
      screenByWidth
    } = this.option();
    if (hasWindow()) {
      const currentScreenFactor = getCurrentScreenFactor(screenByWidth);
      return currentScreenFactor;
    }
    return "lg";
  }
  _clearCachedInstances() {
    this._itemsRunTimeInfo.clear();
    this._cachedLayoutManagers = [];
  }
  _alignLabels(layoutManager, inOneColumn) {
    const {
      items
    } = this.option();
    this._alignLabelsInColumn({
      $container: this.$element(),
      layoutManager,
      excludeTabbed: true,
      items,
      inOneColumn
    });
    triggerResizeEvent(this.$element().find(`.${TOOLBAR_CLASS}`));
  }
  _clean() {
    this._clearValidationSummary();
    super._clean();
    this._groupsColCount = [];
    this._cachedColCountOptions = [];
    this._lastMarkupScreenFactor = void 0;
    resize_observer_default.unobserve(this.$element().get(0));
  }
  _renderScrollable() {
    const useNativeScrolling = this.option("useNativeScrolling");
    this._scrollable = new scrollable_default(this.$element(), {
      useNative: !!useNativeScrolling,
      useSimulatedScrollbar: !useNativeScrolling,
      useKeyboard: false,
      direction: "both",
      bounceEnabled: false
    });
  }
  _getContent() {
    var _this$_scrollable;
    const {
      scrollingEnabled
    } = this.option();
    return scrollingEnabled ? renderer_default(null === (_this$_scrollable = this._scrollable) || void 0 === _this$_scrollable ? void 0 : _this$_scrollable.content()) : this.$element();
  }
  _clearValidationSummary() {
    var _this$_$validationSum;
    null === (_this$_$validationSum = this._$validationSummary) || void 0 === _this$_$validationSum || _this$_$validationSum.remove();
    this._$validationSummary = void 0;
    this._validationSummary = void 0;
  }
  _renderValidationSummary() {
    this._clearValidationSummary();
    const {
      showValidationSummary
    } = this.option();
    if (showValidationSummary) {
      this._$validationSummary = renderer_default("<div>").addClass(FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
      this._validationSummary = super._createComponent(this._$validationSummary, m_validation_summary_default, {
        validationGroup: this._getValidationGroup()
      });
    }
  }
  _prepareItems(items, parentIsTabbedItem, currentPath, isTabs) {
    if (items) {
      const result = [];
      for (let i = 0; i < items.length; i += 1) {
        let item = items[i];
        const path = concatPaths(currentPath, createItemPathByIndex(i, isTabs));
        const itemRunTimeInfo = {
          item,
          itemIndex: i,
          path
        };
        const guid = this._itemsRunTimeInfo.add(itemRunTimeInfo);
        if (isString(item)) {
          item = {
            dataField: item
          };
        }
        if (isObject(item)) {
          const preparedItem = _extends({}, item);
          itemRunTimeInfo.preparedItem = preparedItem;
          preparedItem.guid = guid;
          this._tryPrepareGroupItemCaption(preparedItem);
          this._tryPrepareGroupItem(preparedItem);
          this._tryPrepareTabbedItem(preparedItem, path);
          this._tryPrepareItemTemplate(preparedItem);
          if (parentIsTabbedItem) {
            preparedItem.cssItemClass = FIELD_ITEM_TAB_CLASS;
          }
          if (preparedItem.items) {
            preparedItem.items = this._prepareItems(preparedItem.items, parentIsTabbedItem, path);
          }
          result.push(preparedItem);
        } else {
          result.push(item);
        }
      }
      return result;
    }
    return items;
  }
  _isGroupItem(item) {
    return "group" === item.itemType;
  }
  _tryPrepareGroupItemCaption(item) {
    if (this._isGroupItem(item)) {
      item._prepareGroupCaptionTemplate = (captionTemplate) => {
        if (item.captionTemplate) {
          item.groupCaptionTemplate = this._getTemplate(captionTemplate);
        }
        item.captionTemplate = this._itemGroupTemplate.bind(this, item);
      };
      item._prepareGroupCaptionTemplate(item.captionTemplate);
    }
  }
  _tryPrepareGroupItem(item) {
    if (this._isGroupItem(item)) {
      item.alignItemLabels = ensureDefined(item.alignItemLabels, true);
      item._prepareGroupItemTemplate = (itemTemplate) => {
        if (item.template) {
          item.groupContentTemplate = this._getTemplate(itemTemplate);
        }
        item.template = this._itemGroupTemplate.bind(this, item);
      };
      item._prepareGroupItemTemplate(item.template);
    }
  }
  _isTabbedItem(item) {
    return "tabbed" === item.itemType;
  }
  _tryPrepareTabbedItem(item, path) {
    if (this._isTabbedItem(item)) {
      item.template = this._itemTabbedTemplate.bind(this, item);
      item.tabs = this._prepareItems(item.tabs, true, path, true);
    }
  }
  _tryPrepareItemTemplate(item) {
    if (item.template) {
      item.template = this._getTemplate(item.template);
    }
  }
  _checkGrouping(items) {
    if (items) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if ("group" === item.itemType) {
          return true;
        }
      }
    }
    return false;
  }
  _renderLayout() {
    const {
      items
    } = this.option();
    const $content = this._getContent();
    const preparedItems = this._prepareItems(items);
    const {
      colCount,
      alignItemLabels,
      screenByWidth,
      colCountByScreen
    } = this.option();
    this._rootLayoutManager = this._renderLayoutManager($content, this._createLayoutManagerOptions(preparedItems, {
      isRoot: true,
      colCount,
      alignItemLabels,
      screenByWidth,
      colCountByScreen,
      onLayoutChanged: (inOneColumn) => {
        this._alignLabels.bind(this)(this._rootLayoutManager, inOneColumn);
      },
      onContentReady: (e) => {
        this._alignLabels(e.component, e.component.isSingleColumnMode());
      }
    }));
  }
  _tryGetItemsForTemplate(item) {
    return item.items ?? [];
  }
  _itemTabbedTemplate(tabbedItem, data2, $itemContainer) {
    const $tabPanel = renderer_default("<div>").appendTo($itemContainer);
    const tabPanelOptions = _extends({}, tabbedItem.tabPanelOptions, {
      dataSource: tabbedItem.tabs,
      onItemRendered: (args) => {
        var _tabbedItem$tabPanelO, _tabbedItem$tabPanelO2;
        null === (_tabbedItem$tabPanelO = tabbedItem.tabPanelOptions) || void 0 === _tabbedItem$tabPanelO || null === (_tabbedItem$tabPanelO2 = _tabbedItem$tabPanelO.onItemRendered) || void 0 === _tabbedItem$tabPanelO2 || _tabbedItem$tabPanelO2.call(_tabbedItem$tabPanelO, args);
        triggerShownEvent(args.itemElement);
      },
      itemTemplate: (itemData, e, container) => {
        const {
          screenByWidth
        } = this.option();
        const $container = renderer_default(container);
        const alignItemLabels = ensureDefined(itemData.alignItemLabels, true);
        const layoutManager = this._renderLayoutManager($container, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(itemData), {
          colCount: itemData.colCount,
          alignItemLabels,
          screenByWidth,
          colCountByScreen: itemData.colCountByScreen,
          cssItemClass: itemData.cssItemClass,
          onLayoutChanged: (inOneColumn) => {
            this._alignLabelsInColumn({
              $container: renderer_default(container),
              layoutManager,
              items: itemData.items,
              inOneColumn,
              excludeTabbed: false
            });
          }
        }));
        if (this._itemsRunTimeInfo) {
          this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid ?? "", {
            layoutManager
          });
        }
        if (alignItemLabels) {
          this._alignLabelsInColumn({
            $container,
            layoutManager,
            items: itemData.items,
            inOneColumn: layoutManager.isSingleColumnMode(),
            excludeTabbed: false
          });
        }
      }
    });
    const tryUpdateTabPanelInstance = (items, instance) => {
      if (Array.isArray(items)) {
        items.forEach(((item) => this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid ?? "", {
          widgetInstance: instance
        })));
      }
    };
    const tabPanel = this._createComponent($tabPanel, tab_panel_default, tabPanelOptions);
    renderer_default($itemContainer).parent().addClass(FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
    tabPanel.on("optionChanged", ((eventArgs) => {
      const {
        fullName,
        value,
        component
      } = eventArgs;
      if ("dataSource" === fullName) {
        tryUpdateTabPanelInstance(value, component);
      }
    }));
    tryUpdateTabPanelInstance([{
      guid: tabbedItem.guid
    }, ...tabbedItem.tabs ?? []], tabPanel);
  }
  _itemGroupCaptionTemplate(item, $group, id) {
    if (item.groupCaptionTemplate) {
      const $captionTemplate = renderer_default("<div>").addClass(FORM_GROUP_CUSTOM_CAPTION_CLASS).attr("id", id).appendTo($group);
      item._renderGroupCaptionTemplate = () => {
        var _item$groupCaptionTem;
        const data2 = {
          component: this,
          caption: item.caption,
          name: item.name
        };
        null === (_item$groupCaptionTem = item.groupCaptionTemplate) || void 0 === _item$groupCaptionTem || _item$groupCaptionTem.render({
          model: data2,
          container: getPublicElement($captionTemplate)
        });
      };
      item._renderGroupCaptionTemplate();
      return;
    }
    if (item.caption) {
      renderer_default("<span>").addClass(FORM_GROUP_CAPTION_CLASS).text(item.caption).attr("id", id).appendTo($group);
    }
  }
  _itemGroupContentTemplate(item, $group) {
    const $groupContent = renderer_default("<div>").addClass(FORM_GROUP_CONTENT_CLASS).appendTo($group);
    if (item.groupContentTemplate) {
      item._renderGroupContentTemplate = () => {
        var _item$groupContentTem;
        $groupContent.empty();
        const data2 = {
          formData: this.option("formData"),
          component: this
        };
        null === (_item$groupContentTem = item.groupContentTemplate) || void 0 === _item$groupContentTem || _item$groupContentTem.render({
          model: data2,
          container: getPublicElement($groupContent)
        });
      };
      item._renderGroupContentTemplate();
    } else {
      var _this$_itemsRunTimeIn;
      const layoutManager = this._renderLayoutManager($groupContent, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(item), {
        colCount: item.colCount,
        colCountByScreen: item.colCountByScreen,
        alignItemLabels: item.alignItemLabels,
        cssItemClass: item.cssItemClass
      }));
      null === (_this$_itemsRunTimeIn = this._itemsRunTimeInfo) || void 0 === _this$_itemsRunTimeIn || _this$_itemsRunTimeIn.extendRunTimeItemInfoByKey(item.guid ?? "", {
        layoutManager
      });
      const colCount = layoutManager._getColCount();
      if (!this._groupsColCount.includes(colCount)) {
        this._groupsColCount.push(colCount);
      }
      $group.addClass(GROUP_COL_COUNT_CLASS + colCount);
      $group.attr(GROUP_COL_COUNT_ATTR, colCount);
    }
  }
  _itemGroupTemplate(item, options, $container) {
    var _item$caption;
    const {
      id
    } = options.editorOptions.inputAttr;
    const $group = renderer_default("<div>").toggleClass(FORM_GROUP_WITH_CAPTION_CLASS, !!(null !== (_item$caption = item.caption) && void 0 !== _item$caption && _item$caption.length)).addClass(FORM_GROUP_CLASS).appendTo($container);
    const groupAria = {
      role: "group",
      labelledby: id
    };
    this.setAria(groupAria, $group);
    renderer_default($container).parent().addClass(FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
    this._itemGroupCaptionTemplate(item, $group, id);
    this._itemGroupContentTemplate(item, $group);
  }
  _createLayoutManagerOptions(items, extendedLayoutManagerOptions) {
    return convertToLayoutManagerOptions({
      form: this,
      formOptions: this.option(),
      $formElement: this.$element(),
      items,
      validationGroup: this._getValidationGroup(),
      extendedLayoutManagerOptions,
      onFieldDataChanged: (args) => {
        if (!this._isDataUpdating) {
          this._triggerOnFieldDataChanged(args);
        }
      },
      onContentReady: (args) => {
        var _extendedLayoutManage;
        this._itemsRunTimeInfo.addItemsOrExtendFrom(args.component._itemsRunTimeInfo);
        null === (_extendedLayoutManage = extendedLayoutManagerOptions.onContentReady) || void 0 === _extendedLayoutManage || _extendedLayoutManage.call(extendedLayoutManagerOptions, args);
      },
      onDisposing: (e) => {
        const {
          component
        } = e;
        const nestedItemsRunTimeInfo = component.getItemsRunTimeInfo();
        this._itemsRunTimeInfo.removeItemsByItems(nestedItemsRunTimeInfo);
      },
      onFieldItemRendered: () => {
        var _this$_validationSumm;
        null === (_this$_validationSumm = this._validationSummary) || void 0 === _this$_validationSumm || _this$_validationSumm.refreshValidationGroup();
      }
    });
  }
  _renderLayoutManager($parent, layoutManagerOptions) {
    const baseColCountByScreen = {
      lg: layoutManagerOptions.colCount,
      md: layoutManagerOptions.colCount,
      sm: layoutManagerOptions.colCount,
      xs: 1
    };
    this._cachedColCountOptions.push({
      colCountByScreen: extend(baseColCountByScreen, layoutManagerOptions.colCountByScreen)
    });
    const $element = renderer_default("<div>");
    $element.appendTo($parent);
    const instance = this._createComponent($element, form_layout_manager_default, layoutManagerOptions);
    instance.on("autoColCountChanged", (() => {
      this._clearAutoColCountChangedTimeout();
      this.autoColCountChangedTimeoutId = setTimeout((() => !this._disposed && this._refresh()), 0);
    }));
    this._cachedLayoutManagers.push(instance);
    return instance;
  }
  _getValidationGroup() {
    const {
      validationGroup
    } = this.option();
    return validationGroup ?? this;
  }
  _createComponent(element, component, componentConfiguration) {
    const {
      readOnly
    } = this.option();
    this._extendConfig(componentConfiguration ?? {}, {
      readOnly
    });
    return super._createComponent(element, component, componentConfiguration);
  }
  _attachSyncSubscriptions() {
    this.on("optionChanged", ((args) => {
      const {
        fullName,
        name
      } = args;
      if ("formData" === fullName) {
        if (!isDefined(args.value)) {
          this._options.silent("formData", args.value = {});
        }
        this._triggerOnFieldDataChangedByDataSet(args.value);
      }
      if (this._cachedLayoutManagers.length) {
        each(this._cachedLayoutManagers, ((_index, layoutManager) => {
          if ("formData" === fullName) {
            this._isDataUpdating = true;
            layoutManager.option("layoutData", args.value);
            this._isDataUpdating = false;
          }
          if ("readOnly" === name || "disabled" === name) {
            layoutManager.option(fullName, args.value);
          }
        }));
      }
    }));
  }
  _optionChanged(args) {
    const {
      fullName
    } = args;
    const splitFullName = fullName.split(".");
    if (splitFullName.length > 1 && -1 !== splitFullName[0].search("items") && this._itemsOptionChangedHandler(args)) {
      return;
    }
    if (splitFullName.length > 1 && -1 !== splitFullName[0].search("formData") && this._formDataOptionChangedHandler(args)) {
      return;
    }
    this._defaultOptionChangedHandler(args);
  }
  _defaultOptionChangedHandler(args) {
    switch (args.name) {
      case "formData":
        if (!this.option("items")) {
          this._invalidate();
        } else if (isEmptyObject(args.value)) {
          this._clear();
        }
        break;
      case "onFieldDataChanged":
      case "alignRootItemLabels":
      case "readOnly":
      case "isDirty":
        break;
      case "items":
      case "colCount":
      case "onEditorEnterKey":
      case "labelLocation":
      case "labelMode":
      case "alignItemLabels":
      case "showColonAfterLabel":
      case "customizeItem":
      case "alignItemLabelsInAllGroups":
      case "showRequiredMark":
      case "showOptionalMark":
      case "requiredMark":
      case "optionalMark":
      case "requiredMessage":
      case "scrollingEnabled":
      case "formID":
      case "colCountByScreen":
      case "screenByWidth":
      case "stylingMode":
        this._invalidate();
        break;
      case "showValidationSummary":
        this._renderValidationSummary();
        break;
      case "minColWidth": {
        const {
          colCount
        } = this.option();
        if ("auto" === colCount) {
          this._invalidate();
        }
        break;
      }
      case "width":
        super._optionChanged(args);
        this._rootLayoutManager.option(args.name, args.value);
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
        break;
      case "validationGroup":
        m_validation_engine_default.removeGroup(args.previousValue || this);
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemsOptionChangedHandler(args) {
    const {
      value,
      fullName
    } = args;
    const nameParts = fullName.split(".");
    const itemPath = this._getItemPath(nameParts);
    const item = this.option(itemPath);
    const optionNameWithoutPath = fullName.replace(`${itemPath}.`, "");
    const simpleOptionName = optionNameWithoutPath.split(".")[0].replace(/\[\d+]/, "");
    const itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
    let result = this._tryExecuteItemOptionAction(itemAction) ?? this._tryChangeLayoutManagerItemOption(fullName, value);
    if (!result && item) {
      this._changeItemOption(item, optionNameWithoutPath, value);
      const {
        items
      } = this.option();
      const generatedItems = this._generateItemsFromData(items);
      this.option("items", generatedItems);
      result = true;
    }
    return result;
  }
  _formDataOptionChangedHandler(args) {
    const nameParts = args.fullName.split(".");
    const {
      value
    } = args;
    const dataField = nameParts.slice(1).join(".");
    const editor = this.getEditor(dataField);
    if (editor) {
      editor.option("value", value);
    } else {
      this._triggerOnFieldDataChanged({
        dataField,
        value
      });
    }
    return true;
  }
  _tryCreateItemOptionAction(optionName, item, value, previousValue, itemPath) {
    let currentValue = value;
    if ("tabs" === optionName) {
      this._itemsRunTimeInfo.removeItemsByPathStartWith(`${itemPath}.tabs`);
      currentValue = this._prepareItems(currentValue, true, itemPath, true);
    }
    return form_item_options_actions_default(optionName, {
      item,
      value: currentValue,
      previousValue,
      itemsRunTimeInfo: this._itemsRunTimeInfo
    });
  }
  _tryExecuteItemOptionAction(action) {
    return null === action || void 0 === action ? void 0 : action.tryExecute();
  }
  _updateValidationGroupAndSummaryIfNeeded(fullName) {
    const optionName = getOptionNameFromFullName(fullName);
    if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.includes(optionName)) {
      m_validation_engine_default.addGroup(this._getValidationGroup(), false);
      if (this.option("showValidationSummary")) {
        var _this$_validationSumm2;
        null === (_this$_validationSumm2 = this._validationSummary) || void 0 === _this$_validationSumm2 || _this$_validationSumm2.refreshValidationGroup();
      }
    }
  }
  _setLayoutManagerItemOption(layoutManager, optionName, value, path) {
    if (this._updateLockCount > 0) {
      if (!layoutManager._updateLockCount) {
        layoutManager.beginUpdate();
      }
      const key = this._itemsRunTimeInfo.findKeyByPath(path);
      this.postponedOperations.add(key, (() => {
        if (!layoutManager._disposed) {
          layoutManager.endUpdate();
        }
        return Deferred().resolve();
      }));
    }
    const contentReadyHandler = (e) => {
      e.component.off("contentReady", contentReadyHandler);
      if (isFullPathContainsTabs(path)) {
        const tabPath = tryGetTabPath(path);
        const tabLayoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(tabPath);
        if (tabLayoutManager) {
          const {
            items
          } = tabLayoutManager.option();
          this._alignLabelsInColumn({
            items,
            layoutManager: tabLayoutManager,
            $container: tabLayoutManager.$element(),
            inOneColumn: tabLayoutManager.isSingleColumnMode(),
            excludeTabbed: false
          });
        }
      } else {
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
      }
    };
    layoutManager.on("contentReady", contentReadyHandler);
    layoutManager.option(optionName, value);
    this._updateValidationGroupAndSummaryIfNeeded(optionName);
  }
  _tryChangeLayoutManagerItemOption(fullName, value) {
    const nameParts = fullName.split(".");
    const optionName = getOptionNameFromFullName(fullName);
    if ("items" === optionName && nameParts.length > 1) {
      const itemPath = this._getItemPath(nameParts);
      const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
      if (layoutManager) {
        this._itemsRunTimeInfo.removeItemsByItems(layoutManager.getItemsRunTimeInfo());
        const items = this._prepareItems(value, false, itemPath);
        this._setLayoutManagerItemOption(layoutManager, optionName, items, itemPath);
        return true;
      }
    } else if (nameParts.length > 2) {
      const endPartIndex = nameParts.length - 2;
      const itemPath = this._getItemPath(nameParts.slice(0, endPartIndex));
      const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
      if (layoutManager) {
        const fullOptionName = getFullOptionName(nameParts[endPartIndex], optionName);
        if ("editorType" === optionName) {
          if (layoutManager.option(fullOptionName) !== value) {
            return false;
          }
        }
        if ("visible" === optionName) {
          const formItems = this.option(getFullOptionName(itemPath, "items"));
          if (null !== formItems && void 0 !== formItems && formItems.length) {
            const {
              items: layoutManagerItems
            } = layoutManager.option();
            formItems.forEach(((item, index) => {
              const layoutItem = layoutManagerItems[index];
              layoutItem.visibleIndex = item.visibleIndex;
            }));
          }
        }
        this._setLayoutManagerItemOption(layoutManager, fullOptionName, value, itemPath);
        return true;
      }
    }
    return false;
  }
  _tryChangeLayoutManagerItemOptions(itemPath, options) {
    let result = false;
    this.beginUpdate();
    each(options, ((optionName, optionValue) => {
      result = this._tryChangeLayoutManagerItemOption(getFullOptionName(itemPath, optionName), optionValue);
      if (!result) {
        return false;
      }
      return true;
    }));
    this.endUpdate();
    return result;
  }
  _getItemPath(nameParts) {
    let itemPath = nameParts[0];
    for (let i = 1; i < nameParts.length; i += 1) {
      if (-1 !== nameParts[i].search(/items\[\d+]|tabs\[\d+]/)) {
        itemPath += `.${nameParts[i]}`;
      } else {
        break;
      }
    }
    return itemPath;
  }
  _triggerOnFieldDataChanged(args) {
    this._updateIsDirty(args.dataField ?? "");
    this._createActionByOption("onFieldDataChanged")(args);
  }
  _triggerOnFieldDataChangedByDataSet(data2) {
    if (data2 && isObject(data2)) {
      Object.keys(data2).forEach(((key) => {
        this._triggerOnFieldDataChanged({
          dataField: key,
          value: data2[key]
        });
      }));
    }
  }
  _updateFieldValue(dataField, value) {
    const {
      formData
    } = this.option();
    if (isDefined(formData)) {
      const editor = this.getEditor(dataField);
      this.option(`formData.${dataField}`, value);
      if (editor) {
        const editorValue = editor.option("value");
        if (editorValue !== value) {
          editor.option("value", value);
        }
      }
    }
  }
  _generateItemsFromData(items) {
    const {
      formData
    } = this.option();
    const result = [];
    if (!items && isDefined(formData)) {
      each(formData, ((dataField) => {
        result.push({
          dataField
        });
      }));
    }
    if (items) {
      each(items, ((_index, item) => {
        if (isObject(item)) {
          result.push(item);
        } else {
          result.push({
            dataField: item
          });
        }
      }));
    }
    return result;
  }
  _getItemByField(field, items) {
    const fieldParts = isObject(field) ? field : this._getFieldParts(field);
    const {
      fieldName
    } = fieldParts;
    const {
      fieldPath
    } = fieldParts;
    let resultItem = false;
    if (items.length) {
      each(items, ((_index, item) => {
        const {
          itemType
        } = item;
        if (fieldPath.length) {
          const path = fieldPath.slice();
          item = this._getItemByFieldPath(path, fieldName, item);
        } else if (this._isGroupItem(item) && !(item.caption || item.name) || "tabbed" === itemType && !item.name) {
          const subItemsField = this._getSubItemField(itemType);
          item.items = this._generateItemsFromData(item.items);
          item = this._getItemByField({
            fieldName,
            fieldPath
          }, item[subItemsField]);
        }
        if (isEqualToDataFieldOrNameOrTitleOrCaption(item, fieldName)) {
          resultItem = item;
          return false;
        }
        return true;
      }));
    }
    return resultItem;
  }
  _getFieldParts(field) {
    let fieldName = field;
    let separatorIndex = fieldName.indexOf(".");
    const resultPath = [];
    while (-1 !== separatorIndex) {
      resultPath.push(fieldName.substr(0, separatorIndex));
      fieldName = fieldName.substr(separatorIndex + 1);
      separatorIndex = fieldName.indexOf(".");
    }
    return {
      fieldName,
      fieldPath: resultPath.reverse()
    };
  }
  _getItemByFieldPath(path, fieldName, item) {
    const {
      itemType
    } = item;
    const subItemsField = this._getSubItemField(itemType);
    const isItemWithSubItems = "group" === itemType || "tabbed" === itemType || item.title;
    let result = false;
    do {
      if (isItemWithSubItems) {
        const name = item.name || item.caption || item.title;
        const isGroupWithName = isDefined(name);
        const nameWithoutSpaces = getTextWithoutSpaces(name);
        let pathNode = "";
        item[subItemsField] = this._generateItemsFromData(item[subItemsField]);
        if (isGroupWithName) {
          pathNode = path.pop();
        }
        if (!path.length) {
          result = this._getItemByField(fieldName, item[subItemsField]);
          if (result) {
            break;
          }
        }
        if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
          if (path.length) {
            result = this._searchItemInEverySubItem(path, fieldName, item[subItemsField]);
          }
        }
      } else {
        break;
      }
    } while (path.length && !isDefined(result));
    return result;
  }
  _getSubItemField(itemType) {
    return "tabbed" === itemType ? "tabs" : "items";
  }
  _searchItemInEverySubItem(path, fieldName, items) {
    let result = false;
    each(items, ((_index, groupItem) => {
      result = this._getItemByFieldPath(path.slice(), fieldName, groupItem);
      if (result) {
        return false;
      }
      return true;
    }));
    if (!result) {
      return false;
    }
    return result;
  }
  _changeItemOption(item, option, value) {
    if (isObject(item)) {
      item[option] = value;
    }
  }
  _dimensionChanged() {
    const currentScreenFactor = this._getCurrentScreenFactor();
    if (this._lastMarkupScreenFactor !== currentScreenFactor) {
      if (this._isColCountChanged(this._lastMarkupScreenFactor, currentScreenFactor)) {
        this._targetScreenFactor = currentScreenFactor;
        this._refresh();
        this._targetScreenFactor = void 0;
      }
      this._lastMarkupScreenFactor = currentScreenFactor;
    }
  }
  _isColCountChanged(oldScreenSize, newScreenSize) {
    let isChanged = false;
    each(this._cachedColCountOptions, ((_index, item) => {
      if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
        isChanged = true;
        return false;
      }
      return true;
    }));
    return isChanged;
  }
  _refresh() {
    const editorSelector = `.${TEXTEDITOR_CLASS}.${FOCUSED_STATE_CLASS}:not(.${DROP_DOWN_EDITOR_CLASS}) .${TEXTEDITOR_INPUT_CLASS}`;
    m_events_engine_default.trigger(this.$element().find(editorSelector), "change");
    super._refresh();
  }
  _updateIsDirty(dataField) {
    const editor = this.getEditor(dataField);
    if (!editor) {
      return;
    }
    if (editor.option("isDirty")) {
      this._dirtyFields.add(dataField);
    } else {
      this._dirtyFields.delete(dataField);
    }
    this.option("isDirty", !!this._dirtyFields.size);
  }
  updateRunTimeInfoForEachEditor(editorAction) {
    this._itemsRunTimeInfo.each(((_, itemRunTimeInfo) => {
      const {
        widgetInstance
      } = itemRunTimeInfo;
      if (isDefined(widgetInstance) && editor_default.isEditor(widgetInstance)) {
        editorAction(widgetInstance);
      }
    }));
  }
  _clear() {
    this.updateRunTimeInfoForEachEditor(((editor) => {
      editor.clear();
      editor.option("isValid", true);
    }));
    m_validation_engine_default.resetGroup(this._getValidationGroup());
  }
  _updateData(data2, value, isComplexData) {
    const _data = isComplexData ? value : data2;
    if (isObject(_data)) {
      each(_data, ((dataField, fieldValue) => {
        this._updateData(isComplexData ? `${data2}.${dataField}` : dataField, fieldValue, isObject(fieldValue));
      }));
    } else if (isString(data2)) {
      this._updateFieldValue(data2, value);
    }
  }
  registerKeyHandler(key, handler) {
    super.registerKeyHandler(key, handler);
    this._itemsRunTimeInfo.each(((_, itemRunTimeInfo) => {
      if (isDefined(itemRunTimeInfo.widgetInstance)) {
        itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler);
      }
    }));
  }
  _focusTarget() {
    return this.$element().find(`.${FIELD_ITEM_CONTENT_CLASS} [tabindex]`).first();
  }
  _visibilityChanged() {
    this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
  }
  _clearAutoColCountChangedTimeout() {
    if (this.autoColCountChangedTimeoutId) {
      clearTimeout(this.autoColCountChangedTimeoutId);
      this.autoColCountChangedTimeoutId = void 0;
    }
  }
  _dispose() {
    this._clearAutoColCountChangedTimeout();
    m_validation_engine_default.removeGroup(this._getValidationGroup());
    super._dispose();
  }
  clear() {
    this._clear();
  }
  resetValues() {
    this._clear();
  }
  reset(editorsData) {
    this.updateRunTimeInfoForEachEditor(((editor) => {
      const {
        name = ""
      } = editor.option();
      if (editorsData && name in editorsData) {
        editor.reset(editorsData[name]);
        this._updateIsDirty(name);
      } else {
        editor.reset();
      }
    }));
    this._renderValidationSummary();
  }
  updateData(data2, value) {
    this._updateData(data2, value);
  }
  getEditor(dataField) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) ?? this._itemsRunTimeInfo.findWidgetInstanceByName(dataField);
  }
  getButton(name) {
    return this._itemsRunTimeInfo.findWidgetInstanceByName(name);
  }
  updateDimensions() {
    const deferred = Deferred();
    if (this._scrollable) {
      this._scrollable.update().done((() => {
        deferred.resolveWith(this);
      }));
    } else {
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  itemOption(id, option, value) {
    const {
      items
    } = this.option();
    const generatedItems = this._generateItemsFromData(items);
    const item = this._getItemByField(id, generatedItems);
    const path = getItemPath(generatedItems, item);
    if (!item) {
      return;
    }
    if (1 === arguments.length) {
      return item;
    }
    switch (arguments.length) {
      case 3: {
        const itemAction = this._tryCreateItemOptionAction(option, item, value, item[option ?? ""], path);
        this._changeItemOption(item, option ?? "", value);
        const fullName = getFullOptionName(path, option);
        if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
          this.option("items", generatedItems);
        }
        break;
      }
      default:
        if (isObject(option)) {
          if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
            let allowUpdateItems = false;
            each(option, ((optionName, optionValue) => {
              const itemAction = this._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
              this._changeItemOption(item, optionName, optionValue);
              if (!allowUpdateItems && !this._tryExecuteItemOptionAction(itemAction)) {
                allowUpdateItems = true;
              }
            }));
            if (allowUpdateItems) {
              this.option("items", generatedItems);
            }
          }
        }
    }
    return;
  }
  validate() {
    return m_validation_engine_default.validateGroup(this._getValidationGroup());
  }
  getItemID(name) {
    const {
      formID
    } = this.option();
    return `dx_${formID}_${name || new guid_default()}`;
  }
  getTargetScreenFactor() {
    return this._targetScreenFactor;
  }
};
component_registrator_default("dxForm", Form);
var form_default = Form;

// node_modules/devextreme/esm/ui/form/ui.form.js
var ui_form_default = form_default;

// node_modules/devextreme/esm/ui/form.js
var form_default2 = ui_form_default;

export {
  data_helper_default,
  ui_data_expression_default,
  ui_popup_default,
  ui_widget_default,
  DropDownButton,
  m_drop_down_editor_default,
  m_drop_down_list_default,
  getFormat2 as getFormat,
  date_default3 as date_default,
  box_default,
  m_swipeable_default,
  calendar_default2 as calendar_default,
  validation_summary_default,
  m_validator_default,
  validation_group_default,
  text_box_default2 as text_box_default,
  m_number_box_default,
  number_box_default,
  m_date_box_strategy_calendar_default,
  m_select_box_default,
  date_box_default,
  responsive_box_default,
  multi_view_default,
  getScrollTopMax,
  tabs_default,
  tab_panel_default,
  form_default2 as form_default
};
//# sourceMappingURL=chunk-PVKBANVU.js.map
