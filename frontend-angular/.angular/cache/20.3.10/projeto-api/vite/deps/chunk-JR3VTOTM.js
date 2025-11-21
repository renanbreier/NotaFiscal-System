import {
  m_popup_default
} from "./chunk-VOY7L4VC.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isFluent
} from "./chunk-2D4FZXPO.js";
import {
  action_default,
  m_dom_default
} from "./chunk-ICLEXNO5.js";
import {
  devices_default,
  ui_errors_default,
  value
} from "./chunk-DONQLAZQ.js";
import {
  getHeight,
  getWidth,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  config_default2 as config_default,
  ensureDefined,
  getWindow,
  guid_default2 as guid_default,
  isDefined,
  isPlainObject
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/dialog.js
var window = getWindow();
var DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 0
};
var DEFAULT_BUTTON_OPTIONS = {
  text: message_default.format("OK"),
  onClick: () => true
};
var getApplyButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: "contained",
      type: "default"
    };
  }
  return {};
};
var getCancelButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: "outlined",
      type: "default"
    };
  }
  return {};
};
var custom = (params) => {
  const {
    buttons,
    dragEnabled,
    message,
    messageHtml,
    popupOptions,
    showCloseButton,
    showTitle,
    title = "",
    width,
    position
  } = params ?? {};
  const isMessageDefined = isDefined(message);
  if (isMessageDefined) {
    ui_errors_default.log("W1013");
  }
  const isMessageHtmlDefined = isDefined(messageHtml);
  const messageMarkup = String(isMessageHtmlDefined ? messageHtml : message);
  const messageId = title ? null : new guid_default().toString();
  const deferred = Deferred();
  const $element = renderer_default("<div>").addClass("dx-dialog").appendTo(value());
  const $message = renderer_default("<div>").addClass("dx-dialog-message").html(messageMarkup).attr("id", messageId);
  let popupInstance = null;
  const hide = (value2) => {
    var _popupInstance3;
    deferred.resolve(value2);
    null === (_popupInstance3 = popupInstance) || void 0 === _popupInstance3 || _popupInstance3.hide();
  };
  const buttonOptions = buttons ?? [DEFAULT_BUTTON_OPTIONS];
  const toolbarItems = buttonOptions.map(((configuration2) => {
    const {
      onClick
    } = configuration2;
    const action = new action_default(onClick, {
      context: popupInstance
    });
    const buttonItem = {
      toolbar: "bottom",
      location: devices_default.current().android ? "after" : "center",
      widget: "dxButton",
      options: _extends({}, configuration2, {
        onClick: (e) => {
          const result = action.execute(e);
          hide(result);
        }
      })
    };
    return buttonItem;
  }));
  const popupPosition = position ?? {
    boundaryOffset: _extends({}, DEFAULT_BOUNDARY_OFFSET)
  };
  const configuration = {
    animation: {
      show: {
        type: "pop",
        duration: 400
      },
      hide: {
        type: "pop",
        duration: 400,
        to: {
          opacity: 0,
          scale: 0
        },
        from: {
          opacity: 1,
          scale: 1
        }
      }
    },
    container: $element,
    dragAndResizeArea: window,
    dragEnabled: ensureDefined(dragEnabled, true),
    height: "auto",
    ignoreChildEvents: false,
    onContentReady: (e) => {
      const component = e.component;
      component.$content().addClass("dx-dialog-content").append($message);
      if (messageId) {
        component.$overlayContent().attr("aria-labelledby", messageId);
      }
    },
    onHiding: () => {
      deferred.reject();
    },
    onShowing: (e) => {
      const component = e.component;
      const bottomToolbar = component.bottomToolbar();
      null === bottomToolbar || void 0 === bottomToolbar || bottomToolbar.addClass("dx-dialog-buttons").find(".dx-button").addClass("dx-dialog-button");
      m_dom_default.resetActiveElement();
    },
    onShown: (e) => {
      const component = e.component;
      const bottomToolbar = component.bottomToolbar();
      const $firstButton = null === bottomToolbar || void 0 === bottomToolbar ? void 0 : bottomToolbar.find(".dx-button").first();
      m_events_engine_default.trigger($firstButton, "focus");
    },
    position: popupPosition,
    rtlEnabled: config_default().rtlEnabled,
    showCloseButton: showCloseButton ?? false,
    showTitle: ensureDefined(showTitle, true),
    title,
    toolbarItems,
    visualContainer: window,
    width
  };
  const options = _extends({}, configuration, popupOptions, {
    onHidden: (e) => {
      var _popupOptions$onHidde;
      renderer_default(e.element).remove();
      null === popupOptions || void 0 === popupOptions || null === (_popupOptions$onHidde = popupOptions.onHidden) || void 0 === _popupOptions$onHidde || _popupOptions$onHidde.call(popupOptions, e);
    }
  });
  popupInstance = new m_popup_default($element, options);
  popupInstance.$wrapper().addClass("dx-dialog-wrapper").addClass("dx-dialog-root");
  const dialog = {
    show: () => {
      var _popupInstance2;
      if ("phone" === devices_default.real().deviceType) {
        var _popupInstance;
        const isPortrait = getHeight(window) > getWidth(window);
        const width2 = isPortrait ? "90%" : "60%";
        null === (_popupInstance = popupInstance) || void 0 === _popupInstance || _popupInstance.option({
          width: width2
        });
      }
      null === (_popupInstance2 = popupInstance) || void 0 === _popupInstance2 || _popupInstance2.show();
      return deferred.promise();
    },
    hide
  };
  return dialog;
};
var isCustomDialogOptions = (options) => isPlainObject(options);
var alert = (messageHtml, title, showTitle) => {
  const titleValue = title ?? "";
  const options = isCustomDialogOptions(messageHtml) ? messageHtml : {
    title: titleValue,
    messageHtml,
    showTitle,
    buttons: [_extends({}, DEFAULT_BUTTON_OPTIONS, getApplyButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};
var confirm = (messageHtml, title, showTitle) => {
  const titleValue = title ?? "";
  const options = isCustomDialogOptions(messageHtml) ? messageHtml : {
    title: titleValue,
    messageHtml,
    showTitle,
    buttons: [_extends({
      text: message_default.format("Yes"),
      onClick: () => true
    }, getApplyButtonConfig()), _extends({
      text: message_default.format("No"),
      onClick: () => false
    }, getCancelButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};

export {
  custom,
  alert,
  confirm
};
//# sourceMappingURL=chunk-JR3VTOTM.js.map
