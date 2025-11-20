import {
  m_emitter_gesture_default
} from "./chunk-KEUM6Q3Y.js";
import {
  addNamespace,
  cancelAnimationFrame,
  eventData,
  eventDelta,
  isDxMouseWheelEvent,
  isMouseEvent,
  m_emitter_registrator_default,
  requestAnimationFrame
} from "./chunk-54SHI7Z2.js";
import {
  m_devices_default
} from "./chunk-A3D3LIWG.js";
import {
  m_events_engine_default
} from "./chunk-4JX72F7N.js";
import {
  class_default
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/events/gesture/m_emitter.gesture.scroll.js
var {
  abstract
} = class_default;
var realDevice = m_devices_default.real();
var Locker = class_default.inherit((function() {
  const NAMESPACED_SCROLL_EVENT = addNamespace("scroll", "dxScrollEmitter");
  return {
    ctor(element) {
      this._element = element;
      this._locked = false;
      this._proxiedScroll = (e) => {
        if (!this._disposed) {
          this._scroll(e);
        }
      };
      m_events_engine_default.on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
    },
    _scroll: abstract,
    check(e, callback) {
      if (this._locked) {
        callback();
      }
    },
    dispose() {
      this._disposed = true;
      m_events_engine_default.off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
    }
  };
})());
var TimeoutLocker = Locker.inherit({
  ctor(element, timeout) {
    this.callBase(element);
    this._timeout = timeout;
  },
  _scroll() {
    this._prepare();
    this._forget();
  },
  _prepare() {
    if (this._timer) {
      this._clearTimer();
    }
    this._locked = true;
  },
  _clearTimer() {
    clearTimeout(this._timer);
    this._locked = false;
    this._timer = null;
  },
  _forget() {
    const that = this;
    this._timer = setTimeout((() => {
      that._clearTimer();
    }), this._timeout);
  },
  dispose() {
    this.callBase();
    this._clearTimer();
  }
});
var WheelLocker = TimeoutLocker.inherit({
  ctor(element) {
    this.callBase(element, 400);
    this._lastWheelDirection = null;
  },
  check(e, callback) {
    this._checkDirectionChanged(e);
    this.callBase(e, callback);
  },
  _checkDirectionChanged(e) {
    if (!isDxMouseWheelEvent(e)) {
      this._lastWheelDirection = null;
      return;
    }
    const direction = e.shiftKey || false;
    const directionChange = null !== this._lastWheelDirection && direction !== this._lastWheelDirection;
    this._lastWheelDirection = direction;
    this._locked = this._locked && !directionChange;
  }
});
var PointerLocker = TimeoutLocker.inherit({
  ctor(element) {
    this.callBase(element, 400);
  }
});
!(function() {
  const {
    ios: isIos,
    android: isAndroid
  } = realDevice;
  if (!(isIos || isAndroid)) {
    return;
  }
  PointerLocker = Locker.inherit({
    _scroll() {
      this._locked = true;
      const that = this;
      cancelAnimationFrame(this._scrollFrame);
      this._scrollFrame = requestAnimationFrame((() => {
        that._locked = false;
      }));
    },
    check(e, callback) {
      cancelAnimationFrame(this._scrollFrame);
      cancelAnimationFrame(this._checkFrame);
      const that = this;
      const {
        callBase
      } = this;
      this._checkFrame = requestAnimationFrame((() => {
        callBase.call(that, e, callback);
        that._locked = false;
      }));
    },
    dispose() {
      this.callBase();
      cancelAnimationFrame(this._scrollFrame);
      cancelAnimationFrame(this._checkFrame);
    }
  });
})();
var ScrollEmitter = m_emitter_gesture_default.inherit((function() {
  const FRAME_DURATION = Math.round(1e3 / 60);
  return {
    ctor(element) {
      this.callBase.apply(this, arguments);
      this.direction = "both";
      this._pointerLocker = new PointerLocker(element);
      this._wheelLocker = new WheelLocker(element);
    },
    validate: () => true,
    configure(data) {
      if (data.scrollTarget) {
        this._pointerLocker.dispose();
        this._wheelLocker.dispose();
        this._pointerLocker = new PointerLocker(data.scrollTarget);
        this._wheelLocker = new WheelLocker(data.scrollTarget);
      }
      this.callBase(data);
    },
    _init(e) {
      this._wheelLocker.check(e, (() => {
        if (isDxMouseWheelEvent(e)) {
          this._accept(e);
        }
      }));
      this._pointerLocker.check(e, (() => {
        const skipCheck = this.isNative && isMouseEvent(e);
        if (!isDxMouseWheelEvent(e) && !skipCheck) {
          this._accept(e);
        }
      }));
      this._fireEvent("dxscrollinit", e);
      this._prevEventData = eventData(e);
    },
    move(e) {
      this.callBase.apply(this, arguments);
      e.isScrollingEvent = this.isNative || e.isScrollingEvent;
    },
    _start(e) {
      this._savedEventData = eventData(e);
      this._fireEvent("dxscrollstart", e);
      this._prevEventData = eventData(e);
    },
    _move(e) {
      const currentEventData = eventData(e);
      this._fireEvent("dxscroll", e, {
        delta: eventDelta(this._prevEventData, currentEventData)
      });
      const delta = eventDelta(this._savedEventData, currentEventData);
      if (delta.time > 200) {
        this._savedEventData = this._prevEventData;
      }
      this._prevEventData = eventData(e);
    },
    _end(e) {
      const endEventDelta = eventDelta(this._prevEventData, eventData(e));
      let velocity = {
        x: 0,
        y: 0
      };
      if (!isDxMouseWheelEvent(e) && endEventDelta.time < 100) {
        const delta = eventDelta(this._savedEventData, this._prevEventData);
        const velocityMultiplier = FRAME_DURATION / delta.time;
        velocity = {
          x: delta.x * velocityMultiplier,
          y: delta.y * velocityMultiplier
        };
      }
      this._fireEvent("dxscrollend", e, {
        velocity
      });
    },
    _stop(e) {
      this._fireEvent("dxscrollstop", e);
    },
    cancel(e) {
      this.callBase.apply(this, arguments);
      this._fireEvent("dxscrollcancel", e);
    },
    dispose() {
      this.callBase.apply(this, arguments);
      this._pointerLocker.dispose();
      this._wheelLocker.dispose();
    },
    _clearSelection() {
      if (this.isNative) {
        return;
      }
      return this.callBase.apply(this, arguments);
    },
    _toggleGestureCover() {
      if (this.isNative) {
        return;
      }
      return this.callBase.apply(this, arguments);
    }
  };
})());
m_emitter_registrator_default({
  emitter: ScrollEmitter,
  events: ["dxscrollinit", "dxscrollstart", "dxscroll", "dxscrollend", "dxscrollstop", "dxscrollcancel"]
});
var m_emitter_gesture_scroll_default = {
  init: "dxscrollinit",
  start: "dxscrollstart",
  move: "dxscroll",
  end: "dxscrollend",
  stop: "dxscrollstop",
  cancel: "dxscrollcancel",
  scroll: "scroll"
};

export {
  m_emitter_gesture_scroll_default
};
//# sourceMappingURL=chunk-UJHFMIYG.js.map
