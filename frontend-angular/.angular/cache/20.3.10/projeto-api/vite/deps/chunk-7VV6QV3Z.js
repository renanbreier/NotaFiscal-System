import {
  CLICK_EVENT_NAME,
  addNamespace,
  closestCommonParent,
  fireEvent,
  m_event_registrator_default
} from "./chunk-ICLEXNO5.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  class_default,
  dom_adapter_default
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/events/m_dblclick.js
var DBLCLICK_EVENT_NAME = "dxdblclick";
var NAMESPACED_CLICK_EVENT = addNamespace(CLICK_EVENT_NAME, "dxDblClick");
var DblClick = class_default.inherit({
  ctor() {
    this._handlerCount = 0;
    this._forgetLastClick();
  },
  _forgetLastClick() {
    this._firstClickTarget = null;
    this._lastClickTimeStamp = -300;
  },
  add() {
    if (this._handlerCount <= 0) {
      m_events_engine_default.on(dom_adapter_default.getDocument(), NAMESPACED_CLICK_EVENT, this._clickHandler.bind(this));
    }
    this._handlerCount += 1;
  },
  _clickHandler(e) {
    const timeStamp = e.timeStamp || Date.now();
    const timeBetweenClicks = timeStamp - this._lastClickTimeStamp;
    const isSimulated = timeBetweenClicks < 0;
    const isDouble = !isSimulated && timeBetweenClicks < 300;
    if (isDouble) {
      fireEvent({
        type: "dxdblclick",
        target: closestCommonParent(this._firstClickTarget, e.target),
        originalEvent: e
      });
      this._forgetLastClick();
    } else {
      this._firstClickTarget = e.target;
      this._lastClickTimeStamp = timeStamp;
      clearTimeout(this._lastClickClearTimeout);
      this._lastClickClearTimeout = setTimeout((() => {
        this._forgetLastClick();
      }), 600);
    }
  },
  remove() {
    this._handlerCount -= 1;
    if (this._handlerCount <= 0) {
      this._forgetLastClick();
      m_events_engine_default.off(dom_adapter_default.getDocument(), NAMESPACED_CLICK_EVENT, void 0);
      clearTimeout(this._lastClickClearTimeout);
      this._handlerCount = 0;
    }
  }
});
var dblClick = new DblClick();

// node_modules/devextreme/esm/common/core/events/double_click.js
m_event_registrator_default(DBLCLICK_EVENT_NAME, dblClick);

export {
  DBLCLICK_EVENT_NAME
};
//# sourceMappingURL=chunk-7VV6QV3Z.js.map
