import {
  collection_widget_edit_default
} from "./chunk-EGHIGSYM.js";
import {
  getOuterWidth
} from "./chunk-3GE2VGI4.js";
import {
  hasWindow
} from "./chunk-4U6OD5AW.js";

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
//# sourceMappingURL=chunk-EDGMRKGH.js.map
