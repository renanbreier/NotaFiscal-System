import {
  collection_widget_edit_default
} from "./chunk-E3JK6CCS.js";
import {
  getOuterWidth
} from "./chunk-Z43WLGJP.js";
import {
  hasWindow
} from "./chunk-T2QELLXU.js";

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
//# sourceMappingURL=chunk-6TATA6U7.js.map
