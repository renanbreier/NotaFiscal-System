import {
  editor_default,
  validation_message_default
} from "./chunk-EFEUTFTO.js";
import {
  BaseInfernoComponent,
  BaseWidgetDefaultProps,
  ComponentWrapper,
  ConfigContext,
  InfernoComponent,
  InfernoEffect,
  InfernoWrapperComponent,
  Widget,
  WidgetDefaultProps,
  combineClasses2 as combineClasses,
  createComponentVNode,
  createFragment,
  createReRenderEffect,
  createRef,
  createVNode,
  hasTemplate,
  normalizeProps,
  normalizeStyles,
  renderTemplate,
  validation_engine_default
} from "./chunk-UBAWJAV5.js";
import {
  _objectWithoutPropertiesLoose,
  component_registrator_default,
  convertRulesToOptions
} from "./chunk-ICLEXNO5.js";
import {
  devices_default
} from "./chunk-DONQLAZQ.js";
import {
  data,
  normalizeStyleProp,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  _extends,
  callbacks_default,
  extend,
  guid_default2 as guid_default,
  isDefined,
  isPlainObject,
  type
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/check_box/check_box_icon.js
var _excluded = ["size"];
var defaultCheckBoxIconProps = {};
var CheckBoxIcon = class extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.elementRef = createRef();
    this.__getterCache = {};
  }
  get cssStyles() {
    if (void 0 !== this.__getterCache.cssStyles) {
      return this.__getterCache.cssStyles;
    }
    return this.__getterCache.cssStyles = (() => {
      const {
        size
      } = this.props;
      const fontSize = normalizeStyleProp("fontSize", size);
      return {
        fontSize
      };
    })();
  }
  get restAttributes() {
    const _this$props = this.props, restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.size !== nextProps.size) {
      this.__getterCache.cssStyles = void 0;
    }
  }
  render() {
    const {
      elementRef,
      cssStyles
    } = this;
    return createVNode(1, "span", "dx-checkbox-icon", null, 1, {
      style: normalizeStyles(cssStyles)
    }, null, elementRef);
  }
};
CheckBoxIcon.defaultProps = defaultCheckBoxIconProps;

// node_modules/devextreme/esm/__internal/core/r1/utils/get_updated_options.js
var defaultNotDeepCopyArrays = ["dataSource", "selectedRowKeys"];
var propsToIgnore = {
  integrationOptions: true
};
function getDiffItem(key, value, previousValue) {
  return {
    path: key,
    value,
    previousValue
  };
}
function compare(resultPaths, item1, item2, key, fullPropName, notDeepCopyArrays) {
  if (propsToIgnore[key]) {
    return;
  }
  const type1 = type(item1);
  const type2 = type(item2);
  if (item1 === item2) {
    return;
  }
  if (type1 !== type2) {
    resultPaths.push(getDiffItem(key, item2, item1));
  } else if ("object" === type1) {
    if (!isPlainObject(item2)) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else {
      const diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
      resultPaths.push(...diffPaths.map(((item) => _extends({}, item, {
        path: `${key}.${item.path}`
      }))));
    }
  } else if ("array" === type1) {
    const notDeepCopy = notDeepCopyArrays.some(((prop) => fullPropName.includes(prop)));
    if (notDeepCopy && item1 !== item2) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else if (item1.length !== item2.length) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else {
      const diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
      [].push.apply(resultPaths, diffPaths.map(((item) => _extends({}, item, {
        path: `${key}${item.path}`
      }))));
    }
  } else {
    resultPaths.push(getDiffItem(key, item2, item1));
  }
}
var objectDiffsFiltered = (propsEnumerator) => (oldProps, props, fullPropName, notDeepCopyArrays) => {
  const resultPaths = [];
  const processItem = !Array.isArray(oldProps) ? (propName) => {
    compare(resultPaths, oldProps[propName], props[propName], propName, `${fullPropName}.${propName}`, notDeepCopyArrays);
  } : (propName) => {
    compare(resultPaths, oldProps[propName], props[propName], `[${propName}]`, `${fullPropName}.${propName}`, notDeepCopyArrays);
  };
  propsEnumerator(oldProps).forEach(processItem);
  Object.keys(props).filter(((propName) => !Object.prototype.hasOwnProperty.call(oldProps, propName) && oldProps[propName] !== props[propName])).forEach(((propName) => {
    resultPaths.push({
      path: propName,
      value: props[propName],
      previousValue: oldProps[propName]
    });
  }));
  return resultPaths;
};
var objectDiffs = objectDiffsFiltered(((oldProps) => Object.keys(oldProps)));
var reactProps = {
  key: true,
  ref: true,
  children: true,
  style: true
};
var objectDiffsWithoutReactProps = objectDiffsFiltered(((prop) => Object.keys(prop).filter(((p) => !reactProps[p]))));
function getUpdatedOptions(oldProps, props) {
  let notDeepCopyArrays = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : defaultNotDeepCopyArrays;
  return objectDiffsWithoutReactProps(oldProps, props, "", notDeepCopyArrays);
}

// node_modules/devextreme/esm/__internal/core/r1/dom_component_wrapper.js
var _excluded2 = ["componentProps", "componentType", "templateNames"];
var normalizeProps2 = (props) => Object.keys(props).reduce(((accumulator, key) => {
  if (void 0 !== props[key]) {
    accumulator[key] = props[key];
  }
  return accumulator;
}), {});
var DomComponentWrapper = class extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.widgetRef = createRef();
    this.instance = null;
    this.prevProps = null;
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }
  getConfig() {
    const {
      id
    } = ConfigContext;
    if (this.context[id]) {
      return this.context[id];
    }
    return ConfigContext.defaultValue;
  }
  render() {
    return normalizeProps2(createVNode(1, "div", this.props.componentProps.className, null, 1, _extends({}, this.getRestAttributes()), null, this.widgetRef));
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.getConfig(), this.props.templateNames])];
  }
  updateEffects() {
    var _this$_effects$;
    const dependency = [this.props.componentProps, this.getConfig(), this.props.templateNames];
    null === (_this$_effects$ = this._effects[1]) || void 0 === _this$_effects$ || _this$_effects$.update(dependency);
  }
  setupWidget() {
    const current = this.widgetRef.current;
    const componentInstance = new this.props.componentType(current, this.getProperties());
    this.instance = componentInstance;
    return () => {
      componentInstance.dispose();
      this.instance = null;
    };
  }
  updateWidget() {
    if (!this.instance) {
      return;
    }
    const updatedOptions = getUpdatedOptions(this.prevProps ?? {}, this.getProperties());
    if (updatedOptions.length) {
      this.instance.beginUpdate();
      updatedOptions.forEach(((_ref2) => {
        var _this$instance;
        const {
          path,
          value
        } = _ref2;
        null === (_this$instance = this.instance) || void 0 === _this$instance || _this$instance.option(path, value);
      }));
      this.instance.endUpdate();
    }
    this.prevProps = this.getProperties();
  }
  getRestAttributes() {
    const _this$props = this.props, restAttr = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    return restAttr;
  }
  getProperties() {
    var _this$getConfig;
    const normalizedProps = normalizeProps2(this.props.componentProps);
    const {
      valueChange
    } = normalizedProps;
    const properties = extend({
      rtlEnabled: null === (_this$getConfig = this.getConfig()) || void 0 === _this$getConfig ? void 0 : _this$getConfig.rtlEnabled,
      isRenovated: true
    }, normalizedProps);
    if (valueChange) {
      properties.onValueChanged = (_ref3) => {
        const {
          value
        } = _ref3;
        return valueChange(value);
      };
    }
    const templates = this.props.templateNames;
    templates.forEach(((name) => {
      if (hasTemplate(name, properties, this)) {
        properties[name] = (item, index, container) => {
          renderTemplate(this.props.componentProps[name], {
            item,
            index,
            container
          }, this);
        };
      }
    }));
    return properties;
  }
  getInstance() {
    return this.instance;
  }
};

// node_modules/devextreme/esm/__internal/ui/check_box/wrappers/validation_message.js
var _excluded3 = ["accessKey", "activeStateEnabled", "boundary", "className", "contentId", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionSide", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "visualContainer", "width"];
var defaultValidationMessageProps = _extends({}, BaseWidgetDefaultProps, {
  mode: "auto",
  positionSide: "top",
  offset: Object.freeze({
    h: 0,
    v: 0
  }),
  isReactComponentWrapper: true
});
var ValidationMessage = class extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get restAttributes() {
    const _this$props = this.props, restProps = _objectWithoutPropertiesLoose(_this$props, _excluded3);
    return restProps;
  }
  render() {
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
      componentType: validation_message_default,
      componentProps: this.props,
      templateNames: []
    }, this.restAttributes)));
  }
};
ValidationMessage.defaultProps = defaultValidationMessageProps;

// node_modules/devextreme/esm/__internal/ui/check_box/editor_base/editor.js
var _excluded4 = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
var getCssClasses = (model) => {
  const {
    classes,
    isValid,
    readOnly
  } = model;
  const classesMap = {
    "dx-state-readonly": !!readOnly,
    "dx-invalid": !isValid,
    [String(classes)]: !!classes
  };
  return combineClasses(classesMap);
};
var defaultEditorProps = _extends({}, WidgetDefaultProps, {
  readOnly: false,
  name: "",
  validationError: null,
  validationErrors: null,
  validationMessageMode: "auto",
  validationMessagePosition: "bottom",
  validationStatus: "valid",
  isValid: true,
  isDirty: false,
  inputAttr: {},
  defaultValue: null,
  valueChange: () => {
  }
});
var Editor = class extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = createRef();
    this.rootElementRef = createRef();
    this.__getterCache = {};
    this.state = {
      validationMessageGuid: `dx-${new guid_default()}`,
      isValidationMessageVisible: false,
      value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
    };
    this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects;
    null === (_this$_effects = this._effects) || void 0 === _this$_effects || null === (_this$_effects = _this$_effects[0]) || void 0 === _this$_effects || _this$_effects.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
  }
  updateValidationMessageVisibility() {
    this.setState((() => ({
      isValidationMessageVisible: this.shouldShowValidationMessage
    })));
  }
  onFocusIn(event) {
    const {
      onFocusIn
    } = this.props;
    null === onFocusIn || void 0 === onFocusIn || onFocusIn(event);
  }
  get cssClasses() {
    return `${getCssClasses(_extends({}, this.props, { value: void 0 !== this.props.value ? this.props.value : this.state.value }))}`;
  }
  get shouldShowValidationMessage() {
    const {
      isValid,
      validationStatus
    } = this.props;
    const validationErrors = this.validationErrors ?? [];
    const isEditorValid = isValid && "invalid" !== validationStatus;
    return !isEditorValid && validationErrors.length > 0;
  }
  get aria() {
    const {
      isValid,
      readOnly
    } = this.props;
    const result = {
      readonly: readOnly ? "true" : "false",
      invalid: !isValid ? "true" : "false"
    };
    if (this.shouldShowValidationMessage) {
      result.describedBy = this.state.validationMessageGuid;
    }
    return _extends({}, result, this.props.aria);
  }
  get validationErrors() {
    if (void 0 !== this.__getterCache.validationErrors) {
      return this.__getterCache.validationErrors;
    }
    return this.__getterCache.validationErrors = (() => {
      const {
        validationError,
        validationErrors
      } = this.props;
      let allValidationErrors = validationErrors && [...validationErrors];
      if (!allValidationErrors && validationError) {
        allValidationErrors = [_extends({}, validationError)];
      }
      return allValidationErrors;
    })();
  }
  get validationMessageTarget() {
    var _this$rootElementRef;
    return null === (_this$rootElementRef = this.rootElementRef) || void 0 === _this$rootElementRef ? void 0 : _this$rootElementRef.current;
  }
  get restAttributes() {
    const _this$props = this.props, restProps = _objectWithoutPropertiesLoose(_this$props, _excluded4);
    return restProps;
  }
  focus() {
    this.widgetRef.current.focus();
  }
  blur() {
    this.widgetRef.current.blur();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.validationError !== nextProps.validationError || this.props.validationErrors !== nextProps.validationErrors) {
      this.__getterCache.validationErrors = void 0;
    }
  }
  render() {
    return normalizeProps(createComponentVNode(2, Widget, _extends({
      rootElementRef: this.rootElementRef,
      aria: this.aria,
      classes: this.cssClasses,
      activeStateEnabled: this.props.activeStateEnabled,
      focusStateEnabled: this.props.focusStateEnabled,
      hoverStateEnabled: this.props.hoverStateEnabled,
      accessKey: this.props.accessKey,
      className: this.props.className,
      rtlEnabled: this.props.rtlEnabled,
      hint: this.props.hint,
      disabled: this.props.disabled,
      height: this.props.height,
      width: this.props.width,
      onFocusIn: this.props.onFocusIn,
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      tabIndex: this.props.tabIndex,
      visible: this.props.visible
    }, this.restAttributes, {
      children: createFragment([this.props.children, this.state.isValidationMessageVisible && createComponentVNode(2, ValidationMessage, {
        validationErrors: this.validationErrors,
        mode: this.props.validationMessageMode,
        positionSide: this.props.validationMessagePosition,
        rtlEnabled: this.props.rtlEnabled,
        target: this.validationMessageTarget,
        boundary: this.validationMessageTarget,
        visualContainer: this.validationMessageTarget,
        contentId: this.state.validationMessageGuid
      })], 0)
    }), null, this.widgetRef));
  }
};
Editor.defaultProps = defaultEditorProps;

// node_modules/devextreme/esm/__internal/ui/check_box/check_box.js
var _excluded5 = ["accessKey", "activeStateEnabled", "aria", "className", "classes", "defaultValue", "disabled", "enableThreeStateBehavior", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "iconSize", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
var getCssClasses2 = (model) => {
  const {
    text,
    value
  } = model;
  const checked = value;
  const indeterminate = null === checked;
  const classesMap = {
    "dx-checkbox": true,
    "dx-checkbox-checked": true === checked,
    "dx-checkbox-has-text": !!text,
    "dx-checkbox-indeterminate": indeterminate
  };
  return combineClasses(classesMap);
};
var defaultCheckBoxProps = _extends({}, defaultEditorProps, {
  text: "",
  enableThreeStateBehavior: false,
  activeStateEnabled: true,
  hoverStateEnabled: true,
  get focusStateEnabled() {
    return "desktop" === devices_default.real().deviceType && !devices_default.isSimulator();
  },
  defaultValue: false,
  valueChange: () => {
  }
});
var CheckBox = class extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.editorRef = createRef();
    this.state = {
      value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
    };
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  createEffects() {
    return [createReRenderEffect()];
  }
  onWidgetClick(event) {
    const {
      enableThreeStateBehavior,
      readOnly,
      saveValueChangeEvent
    } = this.props;
    if (!readOnly) {
      null === saveValueChangeEvent || void 0 === saveValueChangeEvent || saveValueChangeEvent(event);
      if (enableThreeStateBehavior) {
        var _this$props$valueChan, _this$props;
        let __newValue;
        this.setState(((__state_argument) => {
          __newValue = null === (void 0 !== this.props.value ? this.props.value : __state_argument.value) || (!(void 0 !== this.props.value ? this.props.value : __state_argument.value) ? null : false);
          return {
            value: __newValue
          };
        }));
        null === (_this$props$valueChan = (_this$props = this.props).valueChange) || void 0 === _this$props$valueChan || _this$props$valueChan.call(_this$props, __newValue);
      } else {
        var _this$props$valueChan2, _this$props2;
        let __newValue;
        this.setState(((__state_argument) => {
          __newValue = !((void 0 !== this.props.value ? this.props.value : __state_argument.value) ?? false);
          return {
            value: __newValue
          };
        }));
        null === (_this$props$valueChan2 = (_this$props2 = this.props).valueChange) || void 0 === _this$props$valueChan2 || _this$props$valueChan2.call(_this$props2, __newValue);
      }
    }
  }
  keyDown(e) {
    const {
      onKeyDown
    } = this.props;
    const {
      keyName,
      originalEvent,
      which
    } = e;
    const result = null === onKeyDown || void 0 === onKeyDown ? void 0 : onKeyDown(e);
    if (null !== result && void 0 !== result && result.cancel) {
      return result;
    }
    if ("space" === keyName || "space" === which) {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }
    return;
  }
  get cssClasses() {
    return getCssClasses2(_extends({}, this.props, {
      value: void 0 !== this.props.value ? this.props.value : this.state.value
    }));
  }
  get aria() {
    const checked = true === (void 0 !== this.props.value ? this.props.value : this.state.value);
    const indeterminate = null === (void 0 !== this.props.value ? this.props.value : this.state.value);
    const result = {
      role: "checkbox",
      checked: indeterminate ? "mixed" : `${checked}`
    };
    return _extends({}, result, this.props.aria);
  }
  get restAttributes() {
    const _this$props3 = this.props, restProps = _objectWithoutPropertiesLoose(_this$props3, _excluded5);
    return restProps;
  }
  focus() {
    this.editorRef.current.focus();
  }
  blur() {
    this.editorRef.current.blur();
  }
  render() {
    const value = void 0 !== this.props.value ? this.props.value : this.state.value;
    return normalizeProps(createComponentVNode(2, Editor, _extends({
      aria: this.aria,
      classes: this.cssClasses,
      onClick: this.onWidgetClick,
      onKeyDown: this.keyDown,
      accessKey: this.props.accessKey,
      activeStateEnabled: this.props.activeStateEnabled,
      focusStateEnabled: this.props.focusStateEnabled,
      hoverStateEnabled: this.props.hoverStateEnabled,
      className: this.props.className,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      hint: this.props.hint,
      height: this.props.height,
      width: this.props.width,
      rtlEnabled: this.props.rtlEnabled,
      tabIndex: this.props.tabIndex,
      visible: this.props.visible,
      validationError: this.props.validationError,
      validationErrors: this.props.validationErrors,
      validationMessageMode: this.props.validationMessageMode,
      validationMessagePosition: this.props.validationMessagePosition,
      validationStatus: this.props.validationStatus,
      isValid: this.props.isValid,
      onFocusIn: this.props.onFocusIn
    }, this.restAttributes, {
      children: createFragment([normalizeProps(createVNode(64, "input", null, null, 1, _extends({
        type: "hidden",
        value: `${value}`
      }, this.props.name && {
        name: this.props.name
      }))), createVNode(1, "div", "dx-checkbox-container", [createComponentVNode(2, CheckBoxIcon, {
        size: this.props.iconSize,
        isChecked: true === value
      }), this.props.text && createVNode(1, "span", "dx-checkbox-text", this.props.text, 0)], 0)], 4)
    }), null, this.editorRef));
  }
};
function __processTwoWayProps(defaultProps) {
  const twoWayProps = ["value"];
  return Object.keys(defaultProps).reduce(((props, propName) => {
    const propValue = defaultProps[propName];
    const defaultPropName = twoWayProps.some(((p) => p === propName)) ? `default${propName.charAt(0).toUpperCase()}${propName.slice(1)}` : propName;
    props[defaultPropName] = propValue;
    return props;
  }), {});
}
CheckBox.defaultProps = defaultCheckBoxProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  CheckBox.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(CheckBox.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(convertRulesToOptions(__defaultOptionRules)))));
}

// node_modules/devextreme/esm/ui/editor/editor.js
var editor_default2 = editor_default;

// node_modules/devextreme/esm/__internal/core/r1/utils/dom.js
function querySelectorInSameDocument(el, selector) {
  var _el$getRootNode;
  const root = (null === (_el$getRootNode = el.getRootNode) || void 0 === _el$getRootNode ? void 0 : _el$getRootNode.call(el)) ?? document;
  return root.querySelector(selector);
}

// node_modules/devextreme/esm/__internal/ui/check_box/editor_base/wrapper.js
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var VALIDATION_TARGET = "dx-validation-target";
var Editor2 = class extends ComponentWrapper {
  getProps() {
    const props = super.getProps();
    props.onFocusIn = () => {
      const isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
      if (isValidationMessageShownOnFocus) {
        const $validationMessageWrapper = renderer_default(querySelectorInSameDocument(this.element(), ".dx-invalid-message.dx-overlay-wrapper"));
        null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
        const timeToWaitBeforeShow = 150;
        if (this.showValidationMessageTimeout) {
          clearTimeout(this.showValidationMessageTimeout);
        }
        this.showValidationMessageTimeout = setTimeout((() => {
          null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO);
        }), timeToWaitBeforeShow);
      }
    };
    props.saveValueChangeEvent = (e) => {
      this._valueChangeEventInstance = e;
    };
    return props;
  }
  _createElement(element) {
    super._createElement(element);
    this.showValidationMessageTimeout = void 0;
    this.validationRequest = callbacks_default();
    data(this.$element()[0], VALIDATION_TARGET, this);
  }
  _render() {
    var _this$option;
    null === (_this$option = this.option("_onMarkupRendered")) || void 0 === _this$option || _this$option();
  }
  _init() {
    super._init();
    this._initialValue = this.option("value");
  }
  _initializeComponent() {
    super._initializeComponent();
    this._valueChangeAction = this._createActionByOption("onValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initOptions(options) {
    super._initOptions(options);
    this.option(validation_engine_default.initValidationOptions(options));
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {}
    });
  }
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    const innerWidgetOptions = extend({}, innerWidget.option());
    const syncOptions = () => this._silent(optionsContainer, innerWidgetOptions);
    syncOptions();
    innerWidget.on("optionChanged", syncOptions);
  }
  _raiseValidation(value, previousValue) {
    const areValuesEmpty = !isDefined(value) && !isDefined(previousValue);
    if (value !== previousValue && !areValuesEmpty) {
      this.validationRequest.fire({
        value,
        editor: this
      });
    }
  }
  _raiseValueChangeAction(value, previousValue) {
    var _this$_valueChangeAct;
    null === (_this$_valueChangeAct = this._valueChangeAction) || void 0 === _this$_valueChangeAct || _this$_valueChangeAct.call(this, {
      element: this.$element(),
      previousValue,
      value,
      event: this._valueChangeEventInstance
    });
    this._valueChangeEventInstance = void 0;
  }
  _optionChanged(option) {
    const {
      name,
      previousValue,
      value
    } = option;
    if (name && void 0 !== this._getActionConfigs()[name]) {
      this._addAction(name);
    }
    switch (name) {
      case "value":
        this._raiseValidation(value, previousValue);
        this.option("isDirty", this._initialValue !== value);
        this._raiseValueChangeAction(value, previousValue);
        break;
      case "onValueChanged":
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        });
        break;
      case "isValid":
      case "validationError":
      case "validationErrors":
      case "validationStatus":
        this.option(validation_engine_default.synchronizeValidationOptions(option, this.option()));
    }
    super._optionChanged(option);
  }
  clear() {
    const {
      value
    } = this._getDefaultOptions();
    this.option({
      value
    });
  }
  reset() {
    let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
    if (arguments.length) {
      this._initialValue = value;
    }
    this.option("value", this._initialValue);
    this.option("isDirty", false);
    this.option("isValid", true);
  }
  _dispose() {
    super._dispose();
    data(this.element(), VALIDATION_TARGET, null);
    if (this.showValidationMessageTimeout) {
      clearTimeout(this.showValidationMessageTimeout);
    }
  }
};
var prevIsEditor = editor_default2.isEditor;
var newIsEditor = (instance) => prevIsEditor(instance) || instance instanceof Editor2;
Editor2.isEditor = newIsEditor;
editor_default2.isEditor = newIsEditor;

// node_modules/devextreme/esm/__internal/ui/check_box/wrapper.js
var CheckBox2 = class extends Editor2 {
  _useTemplates() {
    return false;
  }
  _isFocused() {
    const focusTarget = this.$element()[0];
    return focusTarget.classList.contains("dx-state-focused");
  }
  getSupportedKeyNames() {
    return ["space"];
  }
  getProps() {
    const props = super.getProps();
    if (null !== props.value) {
      props.value = Boolean(props.value);
    }
    return props;
  }
};

// node_modules/devextreme/esm/__internal/ui/check_box/generated_wrapper.js
var CheckBox3 = class extends CheckBox2 {
  getProps() {
    const props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }
  focus() {
    var _this$viewRef;
    return null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef ? void 0 : _this$viewRef.focus(...arguments);
  }
  blur() {
    var _this$viewRef2;
    return null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 ? void 0 : _this$viewRef2.blur(...arguments);
  }
  _getActionConfigs() {
    return {
      onFocusIn: {},
      onClick: {}
    };
  }
  get _propsInfo() {
    return {
      twoWay: [
        ["value", "defaultValue", "valueChange"]
      ],
      allowNull: ["defaultValue", "validationError", "validationErrors", "value"],
      elements: [],
      templates: [],
      props: ["text", "iconSize", "enableThreeStateBehavior", "activeStateEnabled", "hoverStateEnabled", "focusStateEnabled", "saveValueChangeEvent", "defaultValue", "valueChange", "readOnly", "name", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "isValid", "isDirty", "inputAttr", "onFocusIn", "className", "accessKey", "disabled", "height", "hint", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "aria", "value"]
    };
  }
  get _viewComponent() {
    return CheckBox;
  }
};
component_registrator_default("dxCheckBox", CheckBox3);
CheckBox3.defaultOptions = defaultOptions;

// node_modules/devextreme/esm/__internal/ui/check_box/index.js
var check_box_default = CheckBox3;

export {
  DomComponentWrapper,
  editor_default2 as editor_default,
  check_box_default
};
//# sourceMappingURL=chunk-LHOK3AXV.js.map
