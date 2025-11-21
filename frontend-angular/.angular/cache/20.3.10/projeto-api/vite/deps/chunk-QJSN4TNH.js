import {
  collection_widget_edit_default
} from "./chunk-LVWRVNT2.js";
import {
  getOuterWidth
} from "./chunk-Q6FQHMWM.js";
import {
  hasWindow
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/drop_down_editor/m_utils.js
var getElementWidth = function($element) {
  if (hasWindow()) {
    return getOuterWidth($element);
  }
};
var getSizeValue = function(size) {
  if (null === size) {
    size = void 0;
  }
  if ("function" === typeof size) {
    size = size();
  }
  return size;
};

// node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js
var ui_collection_widget_edit_default = collection_widget_edit_default;

export {
  getElementWidth,
  getSizeValue,
  ui_collection_widget_edit_default
};
//# sourceMappingURL=chunk-QJSN4TNH.js.map
