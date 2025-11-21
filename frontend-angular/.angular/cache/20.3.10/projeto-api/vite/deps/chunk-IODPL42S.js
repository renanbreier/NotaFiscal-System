import {
  ui_overlay_default
} from "./chunk-UBCBIACN.js";
import {
  current,
  isMaterialBased
} from "./chunk-2D4FZXPO.js";
import {
  component_registrator_default,
  m_pointer_default
} from "./chunk-ICLEXNO5.js";
import {
  value
} from "./chunk-DONQLAZQ.js";
import {
  ready_callbacks_default,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  _extends,
  dom_adapter_default,
  getWindow,
  isPlainObject,
  isString
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/toast/toast.js
var ready = ready_callbacks_default.add;
var toastTypes = ["info", "warning", "error", "success"];
var TOAST_STACK = [];
var POSITION_ALIASES = {
  top: {
    my: "top",
    at: "top",
    of: null,
    offset: "0 0"
  },
  bottom: {
    my: "bottom",
    at: "bottom",
    of: null,
    offset: "0 -20"
  },
  center: {
    my: "center",
    at: "center",
    of: null,
    offset: "0 0"
  },
  right: {
    my: "center right",
    at: "center right",
    of: null,
    offset: "0 0"
  },
  left: {
    my: "center left",
    at: "center left",
    of: null,
    offset: "0 0"
  }
};
var DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
ready((() => {
  const element = dom_adapter_default.getDocument();
  m_events_engine_default.subscribeGlobal(element, m_pointer_default.down, ((e) => {
    for (let i = TOAST_STACK.length - 1; i >= 0; i -= 1) {
      var _TOAST_STACK$i$_proxi, _TOAST_STACK$i;
      if (!(null !== (_TOAST_STACK$i$_proxi = (_TOAST_STACK$i = TOAST_STACK[i])._proxiedDocumentDownHandler) && void 0 !== _TOAST_STACK$i$_proxi && _TOAST_STACK$i$_proxi.call(_TOAST_STACK$i, e))) {
        return;
      }
    }
  }));
}));
var Toast = class extends ui_overlay_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      message: "",
      type: "info",
      displayTime: 2e3,
      position: "bottom center",
      animation: {
        show: {
          type: "fade",
          duration: 400,
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
      shading: false,
      height: "auto",
      hideTopOverlayHandler: null,
      preventScrollEvents: false,
      closeOnSwipe: true,
      closeOnClick: false
    });
  }
  _defaultOptionsRules() {
    const tabletAndMobileCommonOptions = {
      displayTime: isMaterialBased(current()) ? 4e3 : 2e3,
      hideOnOutsideClick: true,
      animation: {
        show: {
          type: "fade",
          duration: 200,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 200,
          from: 1,
          to: 0
        }
      }
    };
    const toastRules = [{
      device: (device) => "phone" === device.deviceType,
      options: _extends({
        width: "calc(100vw - 40px)"
      }, tabletAndMobileCommonOptions)
    }, {
      device: (device) => "tablet" === device.deviceType,
      options: _extends({
        width: "auto",
        maxWidth: "80vw"
      }, tabletAndMobileCommonOptions)
    }, {
      device: (device) => isMaterialBased(current()) && "desktop" === device.deviceType,
      options: {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4e3
      }
    }];
    const rules = [...super._defaultOptionsRules(), ...toastRules];
    return rules;
  }
  _init() {
    super._init();
    this._posStringToObject();
  }
  _renderContentImpl() {
    const {
      message,
      type
    } = this.option();
    this._message = renderer_default("<div>").addClass("dx-toast-message").text(message ?? "").appendTo(this.$content());
    this.setAria("role", "alert", this._message);
    if (type && toastTypes.includes(type.toLowerCase())) {
      this.$content().prepend(renderer_default("<div>").addClass("dx-toast-icon"));
    }
    return super._renderContentImpl();
  }
  _render() {
    super._render();
    this.$element().addClass("dx-toast");
    this.$wrapper().addClass("dx-toast-wrapper");
    const {
      type
    } = this.option();
    if (type) {
      this.$content().addClass(`dx-toast-${type.toLowerCase()}`);
    }
    this.$content().addClass("dx-toast-content");
    this._toggleCloseEvents("Swipe");
    this._toggleCloseEvents("Click");
  }
  _toggleCloseEvents(event) {
    const dxEvent = `dx${event.toLowerCase()}`;
    m_events_engine_default.off(this.$content(), dxEvent);
    const optionName = `closeOn${event}`;
    const optionValue = this.option(optionName);
    if (optionValue) {
      m_events_engine_default.on(this.$content(), dxEvent, this.hide.bind(this));
    }
  }
  _posStringToObject() {
    const {
      position
    } = this.option();
    if (!isString(position)) {
      return;
    }
    const verticalPosition = position.split(" ")[0];
    const horizontalPosition = position.split(" ")[1];
    const newPosition = _extends({
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    }, POSITION_ALIASES[verticalPosition]);
    this.option("position", newPosition);
    switch (horizontalPosition) {
      case "center":
      case "left":
      case "right":
        if (newPosition && "object" === typeof newPosition) {
          const at = `${newPosition.at} ${horizontalPosition}`;
          const my = `${newPosition.my} ${horizontalPosition}`;
          this.option("position.at", at);
          this.option("position.my", my);
        }
    }
  }
  _show() {
    const promise = super._show();
    promise.always((() => {
      clearTimeout(this._hideTimeout);
      const {
        displayTime
      } = this.option();
      this._hideTimeout = setTimeout(this.hide.bind(this), displayTime);
    }));
    return promise;
  }
  _overlayStack() {
    return TOAST_STACK;
  }
  _zIndexInitValue() {
    return super._zIndexInitValue() + 8e3;
  }
  _dispose() {
    clearTimeout(this._hideTimeout);
    super._dispose();
  }
  _optionChanged(args) {
    const {
      name,
      value: value2,
      previousValue
    } = args;
    switch (name) {
      case "type":
        this.$content().removeClass(`dx-toast-${previousValue}`);
        if (value2) {
          this.$content().addClass(`dx-toast-${String(value2).toLowerCase()}`);
        }
        break;
      case "message":
        if (this._message) {
          this._message.text(value2);
        }
        break;
      case "closeOnSwipe":
        this._toggleCloseEvents("Swipe");
        break;
      case "closeOnClick":
        this._toggleCloseEvents("Click");
        break;
      case "displayTime":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxToast", Toast);
var toast_default = Toast;

// node_modules/devextreme/esm/ui/toast.js
var toast_default2 = toast_default;

// node_modules/devextreme/esm/__internal/ui/notify.js
var window = getWindow();
var $notify = null;
var $containers = {};
var COORDINATE_ALIASES = {
  "top left": {
    top: 10,
    left: 10
  },
  "top right": {
    top: 10,
    right: 10
  },
  "bottom left": {
    bottom: 10,
    left: 10
  },
  "bottom right": {
    bottom: 10,
    right: 10
  },
  "top center": (dimensions) => ({
    top: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  "left center": (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: 10
  }),
  "right center": (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    right: 10
  }),
  center: (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  "bottom center": (dimensions) => ({
    bottom: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  })
};
var POSITION_STYLES_MAP = {
  up: (coordinates, dimensions) => ({
    bottom: coordinates.bottom ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.top ?? 0),
    top: "",
    left: coordinates.left ?? "",
    right: coordinates.right ?? ""
  }),
  down: (coordinates, dimensions) => ({
    top: coordinates.top ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.bottom ?? 0),
    bottom: "",
    left: coordinates.left ?? "",
    right: coordinates.right ?? ""
  }),
  left: (coordinates, dimensions) => ({
    right: coordinates.right ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.left ?? 0),
    left: "",
    top: coordinates.top ?? "",
    bottom: coordinates.bottom ?? ""
  }),
  right: (coordinates, dimensions) => ({
    left: coordinates.left ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.right ?? 0),
    right: "",
    top: coordinates.top ?? "",
    bottom: coordinates.bottom ?? ""
  })
};
var getDefaultDirection = (position) => {
  const condition = isString(position) && position.includes("top");
  return condition ? "down-push" : "up-push";
};
var createStackContainer = (key) => {
  const $container = renderer_default("<div>").appendTo(value());
  $containers[key] = $container;
  return $container;
};
var getStackContainer = (key) => {
  const $container = $containers[key];
  return $container || createStackContainer(key);
};
var setContainerClasses = (container, direction) => {
  const containerClasses = `dx-toast-stack dx-toast-stack-${direction}-direction`;
  container.removeAttr("class").addClass(containerClasses);
};
var getNotifyCoordinatesByAlias = (alias, dimensions) => {
  const coordinate = alias ? COORDINATE_ALIASES[alias] : COORDINATE_ALIASES["bottom center"];
  return "function" === typeof coordinate ? coordinate(dimensions) : coordinate;
};
var getPositionStylesByNotifyCoordinates = (direction, coordinates, dimensions) => {
  const directionKey = direction.replace(/-push|-stack/g, "");
  const styleFunction = POSITION_STYLES_MAP[directionKey];
  return styleFunction ? styleFunction(coordinates, dimensions) : {
    top: "",
    bottom: "",
    left: "",
    right: ""
  };
};
var setContainerStyles = (container, direction, position) => {
  const {
    offsetWidth: toastWidth,
    offsetHeight: toastHeight
  } = container.children().first().get(0);
  const dimensions = {
    toastWidth,
    toastHeight,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
  const coordinates = isString(position) ? getNotifyCoordinatesByAlias(position, dimensions) : position;
  const styles = getPositionStylesByNotifyCoordinates(direction, coordinates, dimensions);
  container.css(styles);
};
var getToastOptions = (message, typeOrStack, displayTime) => {
  const userOptions = isPlainObject(message) ? message : {
    message
  };
  const stack = isPlainObject(typeOrStack) ? typeOrStack : void 0;
  const type = isPlainObject(typeOrStack) ? void 0 : typeOrStack;
  const {
    onHidden: userOnHidden,
    onShowing: userOnShowing
  } = userOptions;
  const defaultConfiguration = {
    onHidden: (e) => {
      renderer_default(e.element).remove();
      null === userOnHidden || void 0 === userOnHidden || userOnHidden(e);
    }
  };
  if (void 0 !== type) {
    defaultConfiguration.type = type;
  }
  if (void 0 !== displayTime) {
    defaultConfiguration.displayTime = displayTime;
  }
  if (null !== stack && void 0 !== stack && stack.position) {
    const {
      position
    } = stack;
    const direction = stack.direction || getDefaultDirection(position);
    const containerKey = isString(position) ? position : `${position.top}-${position.left}-${position.bottom}-${position.right}`;
    const $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);
    const options2 = _extends({}, userOptions, defaultConfiguration, {
      container: $container,
      _skipContentPositioning: true,
      onShowing: (e) => {
        setContainerStyles($container, direction, position);
        null === userOnShowing || void 0 === userOnShowing || userOnShowing(e);
      }
    });
    return options2;
  }
  const options = _extends({}, userOptions, defaultConfiguration);
  return options;
};
var notify = (message, typeOrStack, displayTime) => {
  const options = getToastOptions(message, typeOrStack, displayTime);
  $notify = renderer_default("<div>").appendTo(value());
  const toast = new toast_default2($notify, options);
  toast.show();
};
var notify_default = notify;

// node_modules/devextreme/esm/ui/notify.js
var notify_default2 = notify_default;

export {
  toast_default2 as toast_default,
  notify_default2 as notify_default
};
//# sourceMappingURL=chunk-IODPL42S.js.map
