import {
  callbacks_default,
  dependency_injector_default,
  dom_adapter_default,
  each,
  errors_default,
  extend,
  getWindow,
  hasWindow,
  isFunction,
  isObject,
  isString,
  isWindow
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/core/m_memorized_callbacks.js
var MemorizedCallbacks = class {
  constructor() {
    this.memory = [];
    this.callbacks = callbacks_default();
  }
  add(fn) {
    each(this.memory, ((_, item) => fn.apply(fn, item)));
    this.callbacks.add(fn);
  }
  remove(fn) {
    this.callbacks.remove(fn);
  }
  fire() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
};

// node_modules/devextreme/esm/core/memorized_callbacks.js
var memorized_callbacks_default = MemorizedCallbacks;

// node_modules/devextreme/esm/common/core/events/core/event_registrator_callbacks.js
var event_registrator_callbacks_default = new memorized_callbacks_default();

// node_modules/devextreme/esm/__internal/events/core/m_hook_touch_props.js
var touchPropsToHook = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
var touchPropHook = function(name, event) {
  if (event[name] && !event.touches || !event.touches) {
    return event[name];
  }
  const touches = event.touches.length ? event.touches : event.changedTouches;
  if (!touches.length) {
    return;
  }
  return touches[0][name];
};
function m_hook_touch_props_default(callback) {
  touchPropsToHook.forEach(((name) => {
    callback(name, ((event) => touchPropHook(name, event)));
  }), this);
}

// node_modules/devextreme/esm/__internal/events/utils/m_event_target.js
var getEventTarget = (event) => {
  var _originalEvent$target, _originalEvent$compos;
  const {
    originalEvent
  } = event;
  if (!originalEvent) {
    return event.target;
  }
  const isShadowDOMUsed = Boolean(null === (_originalEvent$target = originalEvent.target) || void 0 === _originalEvent$target ? void 0 : _originalEvent$target.shadowRoot);
  if (!isShadowDOMUsed) {
    return originalEvent.target;
  }
  const path = originalEvent.path ?? (null === (_originalEvent$compos = originalEvent.composedPath) || void 0 === _originalEvent$compos ? void 0 : _originalEvent$compos.call(originalEvent));
  const target = (null === path || void 0 === path ? void 0 : path[0]) ?? event.target;
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_call_once.js
var callOnce = function(handler) {
  let result;
  let wrappedHandler = function() {
    result = handler.apply(this, arguments);
    wrappedHandler = function() {
      return result;
    };
    return result;
  };
  return function() {
    return wrappedHandler.apply(this, arguments);
  };
};

// node_modules/devextreme/esm/core/utils/call_once.js
var call_once_default = callOnce;

// node_modules/devextreme/esm/__internal/events/core/m_consts.js
var EMPTY_EVENT_NAME = "dxEmptyEventType";
var NATIVE_EVENTS_TO_SUBSCRIBE = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
};
var NATIVE_EVENTS_TO_TRIGGER = {
  focusin: "focus",
  focusout: "blur"
};
var NO_BUBBLE_EVENTS = ["blur", "focus", "load"];
var forcePassiveFalseEventNames = ["touchmove", "wheel", "mousewheel", "touchstart"];
var EVENT_PROPERTIES = ["altKey", "altitudeAngle", "azimuthAngle", "bubbles", "button", "buttons", "cancelable", "cancelBubble", "changedTouches", "char", "charCode", "clipboardData", "code", "composed", "ctrlKey", "defaultPrevented", "delegateTarget", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase", "height", "isComposing", "isPrimary", "key", "keyCode", "layerX", "layerY", "location", "metaKey", "movementX", "movementY", "offsetX", "offsetY", "pointerId", "pointerType", "pressure", "relatedTarget", "repeat", "returnValue", "srcElement", "shiftKey", "tangentialPressure", "target", "targetTouches", "tiltX", "tiltY", "toElement", "touches", "twist", "view", "width", "x", "y"];

// node_modules/devextreme/esm/__internal/events/core/m_events_engine.js
var window = getWindow();
function matchesSafe(target, selector) {
  return !isWindow(target) && "#document" !== target.nodeName && dom_adapter_default.elementMatches(target, selector);
}
var elementDataMap = /* @__PURE__ */ new WeakMap();
var guid = 0;
var skipEvent;
var special = (function() {
  const specialData = {};
  event_registrator_callbacks_default.add(((eventName, eventObject) => {
    specialData[eventName] = eventObject;
  }));
  return {
    getField: (eventName, field) => specialData[eventName] && specialData[eventName][field],
    callMethod: (eventName, methodName, context, args) => specialData[eventName] && specialData[eventName][methodName] && specialData[eventName][methodName].apply(context, args)
  };
})();
var eventsEngine = dependency_injector_default({
  on: getHandler(normalizeOnArguments(iterate(((element, eventName, selector, data, handler) => {
    const handlersController = getHandlersController(element, eventName);
    handlersController.addHandler(handler, selector, data);
  })))),
  one: getHandler(normalizeOnArguments(((element, eventName, selector, data, handler) => {
    const oneTimeHandler = function() {
      eventsEngine.off(element, eventName, selector, oneTimeHandler);
      handler.apply(this, arguments);
    };
    eventsEngine.on(element, eventName, selector, data, oneTimeHandler);
  }))),
  off: getHandler(normalizeOffArguments(iterate(((element, eventName, selector, handler) => {
    const handlersController = getHandlersController(element, eventName);
    handlersController.removeHandler(handler, selector);
  })))),
  trigger: getHandler(normalizeTriggerArguments(((element, event, extraParameters) => {
    const eventName = event.type;
    const handlersController = getHandlersController(element, event.type);
    special.callMethod(eventName, "trigger", element, [event, extraParameters]);
    handlersController.callHandlers(event, extraParameters);
    const noBubble = special.getField(eventName, "noBubble") || event.isPropagationStopped() || NO_BUBBLE_EVENTS.includes(eventName);
    if (!noBubble) {
      const parents = [];
      const getParents = function(element2) {
        const parent = element2.parentNode ?? (isObject(element2.host) ? element2.host : null);
        if (parent) {
          parents.push(parent);
          getParents(parent);
        }
      };
      getParents(element);
      parents.push(window);
      let i = 0;
      while (parents[i] && !event.isPropagationStopped()) {
        const parentDataByEvent = getHandlersController(parents[i], event.type);
        parentDataByEvent.callHandlers(extend(event, {
          currentTarget: parents[i]
        }), extraParameters);
        i++;
      }
    }
    if (element.nodeType || isWindow(element)) {
      special.callMethod(eventName, "_default", element, [event, extraParameters]);
      callNativeMethod(eventName, element);
    }
  }))),
  triggerHandler: getHandler(normalizeTriggerArguments(((element, event, extraParameters) => {
    const handlersController = getHandlersController(element, event.type);
    handlersController.callHandlers(event, extraParameters);
  })))
});
function applyForEach(args, method) {
  const element = args[0];
  if (!element) {
    return;
  }
  if (dom_adapter_default.isNode(element) || isWindow(element)) {
    method.apply(eventsEngine, args);
  } else if (!isString(element) && "length" in element) {
    const itemArgs = Array.prototype.slice.call(args, 0);
    Array.prototype.forEach.call(element, ((itemElement) => {
      itemArgs[0] = itemElement;
      applyForEach(itemArgs, method);
    }));
  } else {
    throw errors_default.Error("E0025");
  }
}
function getHandler(method) {
  return function() {
    applyForEach(arguments, method);
  };
}
function detectPassiveEventHandlersSupport() {
  let isSupported = false;
  try {
    const options = Object.defineProperty({}, "passive", {
      get() {
        isSupported = true;
        return true;
      }
    });
    window.addEventListener("test", null, options);
  } catch (e) {
  }
  return isSupported;
}
var passiveEventHandlersSupported = call_once_default(detectPassiveEventHandlersSupport);
var contains = (container, element) => {
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS);
};
function getHandlersController(element, eventName) {
  let elementData = elementDataMap.get(element);
  eventName = eventName || "";
  const eventNameParts = eventName.split(".");
  const namespaces = eventNameParts.slice(1);
  const eventNameIsDefined = !!eventNameParts[0];
  eventName = eventNameParts[0] || EMPTY_EVENT_NAME;
  if (!elementData) {
    elementData = {};
    elementDataMap.set(element, elementData);
  }
  if (!elementData[eventName]) {
    elementData[eventName] = {
      handleObjects: [],
      nativeHandler: null
    };
  }
  const eventData = elementData[eventName];
  return {
    addHandler(handler, selector, data) {
      const callHandler = function(e, extraParameters) {
        const handlerArgs = [e];
        const target = e.currentTarget;
        const {
          relatedTarget
        } = e;
        let secondaryTargetIsInside;
        let result;
        if (eventName in NATIVE_EVENTS_TO_SUBSCRIBE) {
          secondaryTargetIsInside = relatedTarget && target && (relatedTarget === target || contains(target, relatedTarget));
        }
        if (void 0 !== extraParameters) {
          handlerArgs.push(extraParameters);
        }
        special.callMethod(eventName, "handle", element, [e, data]);
        if (!secondaryTargetIsInside) {
          result = handler.apply(target, handlerArgs);
        }
        if (false === result) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      const handleObject = {
        handler,
        wrappedHandler: function(e, extraParameters) {
          if (skipEvent && e.type === skipEvent) {
            return;
          }
          e.data = data;
          e.delegateTarget = element;
          if (selector) {
            let currentTarget = e.target;
            while (currentTarget && currentTarget !== element) {
              if (matchesSafe(currentTarget, selector)) {
                e.currentTarget = currentTarget;
                callHandler(e, extraParameters);
              }
              currentTarget = currentTarget.parentNode;
            }
          } else {
            var _e$target;
            e.currentTarget = e.delegateTarget || e.target;
            const isTargetInShadowDOM = Boolean(null === (_e$target = e.target) || void 0 === _e$target ? void 0 : _e$target.shadowRoot);
            if (isTargetInShadowDOM) {
              const target = getEventTarget(e);
              e.target = target;
            }
            callHandler(e, extraParameters);
          }
        },
        selector,
        type: eventName,
        data,
        namespace: namespaces.join("."),
        namespaces,
        guid: ++guid
      };
      eventData.handleObjects.push(handleObject);
      const firstHandlerForTheType = 1 === eventData.handleObjects.length;
      let shouldAddNativeListener = firstHandlerForTheType && eventNameIsDefined;
      let nativeListenerOptions;
      if (shouldAddNativeListener) {
        shouldAddNativeListener = !special.callMethod(eventName, "setup", element, [data, namespaces, handler]);
      }
      if (shouldAddNativeListener) {
        eventData.nativeHandler = getNativeHandler(eventName);
        if (passiveEventHandlersSupported() && forcePassiveFalseEventNames.includes(eventName)) {
          nativeListenerOptions = {
            passive: false
          };
        }
        eventData.removeListener = dom_adapter_default.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData.nativeHandler, nativeListenerOptions);
      }
      special.callMethod(eventName, "add", element, [handleObject]);
    },
    removeHandler(handler, selector) {
      const removeByEventName = function(eventName2) {
        const eventData2 = elementData[eventName2];
        if (!eventData2.handleObjects.length) {
          delete elementData[eventName2];
          return;
        }
        let removedHandler;
        eventData2.handleObjects = eventData2.handleObjects.filter(((handleObject) => {
          const skip = namespaces.length && !isSubset(handleObject.namespaces, namespaces) || handler && handleObject.handler !== handler || selector && handleObject.selector !== selector;
          if (!skip) {
            removedHandler = handleObject.handler;
            special.callMethod(eventName2, "remove", element, [handleObject]);
          }
          return skip;
        }));
        const lastHandlerForTheType = !eventData2.handleObjects.length;
        const shouldRemoveNativeListener = lastHandlerForTheType && eventName2 !== EMPTY_EVENT_NAME;
        if (shouldRemoveNativeListener) {
          special.callMethod(eventName2, "teardown", element, [namespaces, removedHandler]);
          if (eventData2.nativeHandler) {
            eventData2.removeListener();
          }
          delete elementData[eventName2];
        }
      };
      if (eventNameIsDefined) {
        removeByEventName(eventName);
      } else {
        for (const name in elementData) {
          removeByEventName(name);
        }
      }
      const elementDataIsEmpty = 0 === Object.keys(elementData).length;
      if (elementDataIsEmpty) {
        elementDataMap.delete(element);
      }
    },
    callHandlers(event, extraParameters) {
      let forceStop = false;
      const handleCallback = function(handleObject) {
        if (forceStop) {
          return;
        }
        if (!namespaces.length || isSubset(handleObject.namespaces, namespaces)) {
          handleObject.wrappedHandler(event, extraParameters);
          forceStop = event.isImmediatePropagationStopped();
        }
      };
      eventData.handleObjects.forEach(handleCallback);
      if (namespaces.length && elementData[EMPTY_EVENT_NAME]) {
        elementData[EMPTY_EVENT_NAME].handleObjects.forEach(handleCallback);
      }
    }
  };
}
function getNativeHandler(subscribeName) {
  return function(event, extraParameters) {
    const handlersController = getHandlersController(this, subscribeName);
    event = eventsEngine.Event(event);
    handlersController.callHandlers(event, extraParameters);
  };
}
function isSubset(original, checked) {
  for (let i = 0; i < checked.length; i++) {
    if (original.indexOf(checked[i]) < 0) {
      return false;
    }
  }
  return true;
}
function normalizeOnArguments(callback) {
  return function(element, eventName, selector, data, handler) {
    if (!handler) {
      handler = data;
      data = void 0;
    }
    if ("string" !== typeof selector) {
      data = selector;
      selector = void 0;
    }
    if (!handler && "string" === typeof eventName) {
      handler = data || selector;
      selector = void 0;
      data = void 0;
    }
    callback(element, eventName, selector, data, handler);
  };
}
function normalizeOffArguments(callback) {
  return function(element, eventName, selector, handler) {
    if ("function" === typeof selector) {
      handler = selector;
      selector = void 0;
    }
    callback(element, eventName, selector, handler);
  };
}
function normalizeTriggerArguments(callback) {
  return function(element, src, extraParameters) {
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!src.target) {
      src.target = element;
    }
    src.currentTarget = element;
    if (!src.delegateTarget) {
      src.delegateTarget = element;
    }
    if (!src.type && src.originalEvent) {
      src.type = src.originalEvent.type;
    }
    callback(element, src instanceof eventsEngine.Event ? src : eventsEngine.Event(src), extraParameters);
  };
}
function normalizeEventArguments(callback) {
  eventsEngine.Event = function(src, config) {
    if (!(this instanceof eventsEngine.Event)) {
      return new eventsEngine.Event(src, config);
    }
    if (!src) {
      src = {};
    }
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!config) {
      config = {};
    }
    callback.call(this, src, config);
  };
  Object.assign(eventsEngine.Event.prototype, {
    _propagationStopped: false,
    _immediatePropagationStopped: false,
    _defaultPrevented: false,
    isPropagationStopped() {
      return !!(this._propagationStopped || this.originalEvent && this.originalEvent.propagationStopped);
    },
    stopPropagation() {
      this._propagationStopped = true;
      this.originalEvent && this.originalEvent.stopPropagation();
    },
    isImmediatePropagationStopped() {
      return this._immediatePropagationStopped;
    },
    stopImmediatePropagation() {
      this.stopPropagation();
      this._immediatePropagationStopped = true;
      this.originalEvent && this.originalEvent.stopImmediatePropagation();
    },
    isDefaultPrevented() {
      return !!(this._defaultPrevented || this.originalEvent && this.originalEvent.defaultPrevented);
    },
    preventDefault() {
      this._defaultPrevented = true;
      this.originalEvent && this.originalEvent.preventDefault();
    }
  });
  return eventsEngine.Event;
}
function iterate(callback) {
  const iterateEventNames = function(element, eventName) {
    if (eventName && eventName.indexOf(" ") > -1) {
      const args = Array.prototype.slice.call(arguments, 0);
      eventName.split(" ").forEach((function(eventName2) {
        args[1] = eventName2;
        callback.apply(this, args);
      }));
    } else {
      callback.apply(this, arguments);
    }
  };
  return function(element, eventName) {
    if ("object" === typeof eventName) {
      const args = Array.prototype.slice.call(arguments, 0);
      for (const name in eventName) {
        args[1] = name;
        args[args.length - 1] = eventName[name];
        iterateEventNames.apply(this, args);
      }
    } else {
      iterateEventNames.apply(this, arguments);
    }
  };
}
function callNativeMethod(eventName, element) {
  const nativeMethodName = NATIVE_EVENTS_TO_TRIGGER[eventName] || eventName;
  if ((function(eventName2, element2) {
    return "click" === eventName2 && "a" === element2.localName;
  })(eventName, element)) {
    return;
  }
  if (isFunction(element[nativeMethodName])) {
    skipEvent = eventName;
    element[nativeMethodName]();
    skipEvent = void 0;
  }
}
function calculateWhich(event) {
  if ((function(event2) {
    return null == event2.which && 0 === event2.type.indexOf("key");
  })(event)) {
    return null != event.charCode ? event.charCode : event.keyCode;
  }
  if ((function(event2) {
    return !event2.which && void 0 !== event2.button && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(event2.type);
  })(event)) {
    const whichByButton = {
      1: 1,
      2: 3,
      3: 1,
      4: 2
    };
    return whichByButton[event.button];
  }
  return event.which;
}
function initEvent(EventClass) {
  if (EventClass) {
    eventsEngine.Event = EventClass;
    eventsEngine.Event.prototype = EventClass.prototype;
  }
}
initEvent(normalizeEventArguments((function(src, config) {
  var _src$view;
  const srcIsEvent = src instanceof eventsEngine.Event || hasWindow() && src instanceof window.Event || (null === (_src$view = src.view) || void 0 === _src$view ? void 0 : _src$view.Event) && src instanceof src.view.Event;
  if (srcIsEvent) {
    this.originalEvent = src;
    this.type = src.type;
    this.currentTarget = void 0;
    if (Object.prototype.hasOwnProperty.call(src, "isTrusted")) {
      this.isTrusted = src.isTrusted;
    }
    this.timeStamp = src.timeStamp || Date.now();
  } else {
    Object.assign(this, src);
  }
  addProperty("which", calculateWhich, this);
  if (0 === src.type.indexOf("touch")) {
    delete config.pageX;
    delete config.pageY;
  }
  Object.assign(this, config);
  this.guid = ++guid;
})));
function addProperty(propName, hook, eventInstance) {
  Object.defineProperty(eventInstance || eventsEngine.Event.prototype, propName, {
    enumerable: true,
    configurable: true,
    get() {
      return this.originalEvent && hook(this.originalEvent);
    },
    set(value) {
      Object.defineProperty(this, propName, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
      });
    }
  });
}
EVENT_PROPERTIES.forEach(((prop) => addProperty(prop, ((event) => event[prop]))));
m_hook_touch_props_default(addProperty);
var beforeSetStrategy = callbacks_default();
var afterSetStrategy = callbacks_default();
eventsEngine.set = function(engine) {
  beforeSetStrategy.fire();
  eventsEngine.inject(engine);
  initEvent(engine.Event);
  afterSetStrategy.fire();
};
eventsEngine.subscribeGlobal = function() {
  applyForEach(arguments, normalizeOnArguments((function() {
    const args = arguments;
    eventsEngine.on.apply(this, args);
    beforeSetStrategy.add((function() {
      const offArgs = Array.prototype.slice.call(args, 0);
      offArgs.splice(3, 1);
      eventsEngine.off.apply(this, offArgs);
    }));
    afterSetStrategy.add((function() {
      eventsEngine.on.apply(this, args);
    }));
  })));
};
eventsEngine.forcePassiveFalseEventNames = forcePassiveFalseEventNames;
eventsEngine.passiveEventHandlersSupported = passiveEventHandlersSupported;
var m_events_engine_default = eventsEngine;

export {
  memorized_callbacks_default,
  event_registrator_callbacks_default,
  getEventTarget,
  call_once_default,
  m_events_engine_default
};
//# sourceMappingURL=chunk-4JX72F7N.js.map
