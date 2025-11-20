import {
  m_text_box_default
} from "./chunk-T6RX3ICP.js";
import {
  getOperationBySearchMode,
  search_box_controller_default
} from "./chunk-7Z6ON4IH.js";
import {
  BindableTemplate,
  collection_widget_async_default,
  m_query_default,
  m_store_helper_default
} from "./chunk-EGHIGSYM.js";
import {
  getImageContainer
} from "./chunk-UQXIHJH2.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-54SHI7Z2.js";
import {
  devices_default,
  ui_errors_default
} from "./chunk-A3D3LIWG.js";
import {
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  _extends,
  compileGetter,
  compileSetter,
  each,
  extend,
  isDefined,
  isFunction,
  isObject,
  isPrimitive,
  noop
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/ui/collection/ui.collection_widget.async.js
var ui_collection_widget_async_default = collection_widget_async_default;

// node_modules/devextreme/esm/__internal/ui/hierarchical_collection/data_converter.js
var _excluded = ["items"];
var DataConverter = class {
  constructor() {
    this._dataStructure = [];
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
    this._indexByKey = {};
  }
  _convertItemsToNodes(items, parentKey) {
    each(items, ((_index, item) => {
      const parentId = isDefined(parentKey) ? parentKey : this._getParentId(item);
      const node = this._convertItemToNode(item, parentId);
      this._dataStructure.push(node);
      this._checkForDuplicateId(node.internalFields.key);
      this._indexByKey[node.internalFields.key] = this._dataStructure.length - 1;
      if (this._itemHasChildren(item)) {
        this._convertItemsToNodes(this._dataAccessors.getters.items(item), node.internalFields.key);
      }
    }));
  }
  _checkForDuplicateId(key) {
    if (isDefined(this._indexByKey[String(key)])) {
      throw ui_errors_default.Error("E1040", key);
    }
  }
  _getParentId(item) {
    return "plain" === this._dataType ? this._dataAccessors.getters.parentKey(item) : void 0;
  }
  _itemHasChildren(item) {
    if ("plain" === this._dataType) {
      return false;
    }
    const items = this._dataAccessors.getters.items(item);
    return Boolean(null === items || void 0 === items ? void 0 : items.length);
  }
  _getUniqueKey(item) {
    const keyGetter = this._dataAccessors.getters.key;
    const itemKey = keyGetter(item);
    const isCorrectKey = (itemKey || 0 === itemKey) && isPrimitive(itemKey);
    return isCorrectKey ? itemKey : this.getItemsCount();
  }
  _convertItemToNode(item, parentKey) {
    this._itemsCount += 1;
    if (false !== item.visible) {
      this._visibleItemsCount += 1;
    }
    const itemWithoutItems = _objectWithoutPropertiesLoose(item, _excluded);
    const node = _extends({
      internalFields: {
        disabled: this._dataAccessors.getters.disabled(item, {
          defaultValue: false
        }),
        expanded: this._dataAccessors.getters.expanded(item, {
          defaultValue: false
        }),
        selected: this._dataAccessors.getters.selected(item, {
          defaultValue: false
        }),
        key: this._getUniqueKey(item),
        parentKey: isDefined(parentKey) ? parentKey : this._rootValue,
        item: this._makeObjectFromPrimitive(item),
        childrenKeys: []
      }
    }, itemWithoutItems);
    return node;
  }
  setChildrenKeys() {
    each(this._dataStructure, ((_index, node) => {
      if (node.internalFields.parentKey === this._rootValue) {
        return;
      }
      const parent = this.getParentNode(node);
      if (parent) {
        parent.internalFields.childrenKeys.push(node.internalFields.key);
      }
    }));
  }
  _makeObjectFromPrimitive(item) {
    if (isPrimitive(item)) {
      const key = item;
      const newItem = {};
      this._dataAccessors.setters.key(newItem, key);
      return newItem;
    }
    return item;
  }
  _convertToPublicNode(node, parent) {
    if (!node) {
      return null;
    }
    const publicNode = {
      text: this._dataAccessors.getters.display(node),
      key: node.internalFields.key,
      selected: node.internalFields.selected,
      expanded: node.internalFields.expanded,
      disabled: node.internalFields.disabled,
      parent: parent ?? null,
      itemData: node.internalFields.item,
      children: [],
      items: []
    };
    if (publicNode.parent) {
      publicNode.parent.children.push(publicNode);
      publicNode.parent.items.push(publicNode);
    }
    return publicNode;
  }
  convertToPublicNodes(data, parent) {
    if (!data.length) {
      return [];
    }
    const publicNodes = [];
    each(data, ((_index, node) => {
      const internalNode = isPrimitive(node) ? this._getByKey(node) : node;
      if (!internalNode) {
        return;
      }
      const publicNode = this._convertToPublicNode(internalNode, parent);
      if (!publicNode) {
        return;
      }
      publicNode.children = this.convertToPublicNodes(internalNode.internalFields.childrenKeys, publicNode);
      publicNodes.push(publicNode);
      internalNode.internalFields.publicNode = publicNode;
    }));
    return publicNodes;
  }
  setDataAccessors(accessors) {
    this._dataAccessors = accessors;
  }
  _getByKey(key) {
    return this._dataStructure[this.getIndexByKey(key)] ?? null;
  }
  getParentNode(node) {
    return this._getByKey(node.internalFields.parentKey);
  }
  getByKey(data, key) {
    if (!isDefined(key)) {
      return null;
    }
    return (function(searchData, searchKey) {
      let result = null;
      each(searchData, ((_index, element) => {
        var _element$internalFiel;
        const currentElementKey = (null === (_element$internalFiel = element.internalFields) || void 0 === _element$internalFiel ? void 0 : _element$internalFiel.key) ?? element.key;
        if ((null === currentElementKey || void 0 === currentElementKey ? void 0 : currentElementKey.toString()) === searchKey.toString()) {
          result = element;
          return false;
        }
        return true;
      }));
      return result;
    })(data, key);
  }
  getItemsCount() {
    return this._itemsCount;
  }
  getVisibleItemsCount() {
    return this._visibleItemsCount;
  }
  updateIndexByKey() {
    this._indexByKey = {};
    each(this._dataStructure, ((index, node) => {
      this._checkForDuplicateId(node.internalFields.key);
      this._indexByKey[node.internalFields.key] = index;
    }));
  }
  updateChildrenKeys() {
    this._indexByKey = {};
    this.removeChildrenKeys();
    this.updateIndexByKey();
    this.setChildrenKeys();
  }
  removeChildrenKeys() {
    this._indexByKey = {};
    each(this._dataStructure, ((_index, node) => {
      node.internalFields.childrenKeys = [];
    }));
  }
  getIndexByKey(key) {
    return this._indexByKey[key];
  }
  createPlainStructure(items, rootValue, dataType) {
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
    this._rootValue = rootValue;
    this._dataType = dataType;
    this._indexByKey = {};
    this._convertItemsToNodes(items);
    this.setChildrenKeys();
    return this._dataStructure;
  }
};
var data_converter_default = DataConverter;

// node_modules/devextreme/esm/__internal/ui/hierarchical_collection/data_adapter.js
var EXPANDED = "expanded";
var SELECTED = "selected";
var DISABLED = "disabled";
search_box_controller_default.setEditorClass(m_text_box_default);
var DataAdapter = class _DataAdapter {
  constructor(options) {
    this.options = {
      dataAccessors: {},
      items: [],
      multipleSelection: true,
      recursiveSelection: false,
      recursiveExpansion: false,
      rootValue: 0,
      searchValue: "",
      dataType: "tree",
      searchMode: "contains",
      dataConverter: new data_converter_default(),
      onNodeChanged: noop,
      sort: null
    };
    this._selectedNodesKeys = [];
    this._expandedNodesKeys = [];
    this._dataStructure = [];
    this._initialDataStructure = [];
    extend(this.options, options);
    this.options.dataConverter.setDataAccessors(this.options.dataAccessors);
    this._createInternalDataStructure();
    this.getTreeNodes();
  }
  setOption(name, value) {
    this.options[name] = value;
    if ("recursiveSelection" === name) {
      this._updateSelection();
    }
  }
  _createInternalDataStructure() {
    this._initialDataStructure = this.options.dataConverter.createPlainStructure(this.options.items, this.options.rootValue, this.options.dataType);
    this._dataStructure = this.options.searchValue.length ? this.search(this.options.searchValue) : this._initialDataStructure;
    this.options.dataConverter._dataStructure = this._dataStructure;
    this._updateSelection();
    this._updateExpansion();
  }
  _updateSelection() {
    if (this.options.recursiveSelection) {
      this._setChildrenSelection();
      this._setParentSelection();
    }
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
  }
  _updateExpansion(key) {
    if (this.options.recursiveExpansion) {
      if (key) {
        this._updateOneBranch(key);
      } else {
        this._setParentExpansion();
      }
    }
    this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
  }
  _updateNodesKeysArray(property) {
    let array = [];
    each(this._getDataBySelectionMode(), ((_index, node) => {
      if (!this._isNodeVisible(node)) {
        return;
      }
      if (node.internalFields[property]) {
        if (property === EXPANDED || this.options.multipleSelection) {
          array.push(node.internalFields.key);
        } else {
          if (array.length) {
            this.toggleSelection(array[0], false, true);
          }
          array = [node.internalFields.key];
        }
      }
    }));
    return array;
  }
  _getDataBySelectionMode() {
    return this.options.multipleSelection ? this.getData() : this.getFullData();
  }
  _isNodeVisible(node) {
    return false !== node.internalFields.item.visible;
  }
  _getByKey(data, key) {
    return data === this._dataStructure ? this.options.dataConverter._getByKey(key) : this.options.dataConverter.getByKey(data.filter(Boolean), key);
  }
  _setChildrenSelection() {
    each(this._dataStructure, ((_index, node) => {
      if (!(null !== node && void 0 !== node && node.internalFields.childrenKeys.length)) {
        return;
      }
      const isSelected = node.internalFields.selected;
      if (isSelected) {
        this._toggleChildrenSelection(node, isSelected);
      }
    }));
  }
  _setParentSelection() {
    each(this._dataStructure, ((_index, node) => {
      if (!node) {
        return;
      }
      const parent = this.options.dataConverter.getParentNode(node);
      if (parent && node.internalFields.parentKey !== this.options.rootValue) {
        this._iterateParents(node, ((parentNode) => {
          const newParentState = this._calculateSelectedState(parentNode);
          this._setFieldState(parentNode, SELECTED, newParentState);
        }));
      }
    }));
  }
  _setParentExpansion() {
    each(this._dataStructure, ((_index, node) => {
      if (!(null !== node && void 0 !== node && node.internalFields.expanded)) {
        return;
      }
      this._updateOneBranch(node.internalFields.key);
    }));
  }
  _updateOneBranch(key) {
    const node = this.getNodeByKey(key);
    this._iterateParents(node, ((parent) => {
      this._setFieldState(parent, EXPANDED, true);
    }));
  }
  _iterateChildren(node, recursive, callback, processedKeys) {
    if (!isFunction(callback) || !node) {
      return;
    }
    const nodeKey = node.internalFields.key;
    const keys = processedKeys ?? [];
    if (void 0 !== nodeKey && !keys.includes(nodeKey)) {
      keys.push(nodeKey);
      each(node.internalFields.childrenKeys, ((_index, key) => {
        const child = this.getNodeByKey(key);
        callback(child);
        if (null !== child && void 0 !== child && child.internalFields.childrenKeys.length && recursive) {
          this._iterateChildren(child, recursive, callback, keys);
        }
      }));
    }
  }
  _iterateParents(node, callback, processedKeys) {
    if (!node || node.internalFields.parentKey === this.options.rootValue || !isFunction(callback)) {
      return;
    }
    const keys = processedKeys ?? [];
    const {
      key
    } = node.internalFields;
    if (!keys.includes(key)) {
      keys.push(key);
      const parent = this.options.dataConverter.getParentNode(node);
      if (parent) {
        callback(parent);
        if (parent.internalFields.parentKey !== this.options.rootValue) {
          this._iterateParents(parent, callback, keys);
        }
      }
    }
  }
  _calculateSelectedState(node) {
    const itemsCount = node.internalFields.childrenKeys.length;
    let selectedItemsCount = 0;
    let invisibleItemsCount = 0;
    let result = false;
    for (let i = 0; i <= itemsCount - 1; i += 1) {
      const childNode = this.getNodeByKey(node.internalFields.childrenKeys[i]);
      const isChildInvisible = false === (null === childNode || void 0 === childNode ? void 0 : childNode.internalFields.item.visible);
      const childState = null === childNode || void 0 === childNode ? void 0 : childNode.internalFields.selected;
      if (isChildInvisible) {
        invisibleItemsCount += 1;
      } else if (childState) {
        selectedItemsCount += 1;
      } else if (void 0 === childState) {
        selectedItemsCount += 0.5;
      }
    }
    if (selectedItemsCount) {
      result = selectedItemsCount === itemsCount - invisibleItemsCount ? true : void 0;
    }
    return result;
  }
  _toggleChildrenSelection(node, state) {
    this._iterateChildren(node, true, ((child) => {
      if (child && this._isNodeVisible(child)) {
        this._setFieldState(child, SELECTED, state);
      }
    }));
  }
  _setFieldState(node, field, state) {
    if (node.internalFields[field] === state) {
      return;
    }
    node.internalFields[field] = state;
    if (node.internalFields.publicNode) {
      node.internalFields.publicNode[field] = state;
    }
    this.options.dataAccessors.setters[field](node.internalFields.item, state);
    this.options.onNodeChanged(node);
  }
  _markChildren(keys) {
    each(keys, ((_index, key) => {
      const index = this.getIndexByKey(key);
      const node = this.getNodeByKey(key);
      this._dataStructure[index] = null;
      if (null !== node && void 0 !== node && node.internalFields.childrenKeys.length) {
        this._markChildren(node.internalFields.childrenKeys);
      }
    }));
  }
  _removeNode(key) {
    const node = this.getNodeByKey(key);
    this._dataStructure[this.getIndexByKey(key)] = null;
    if (null !== node && void 0 !== node && node.internalFields.childrenKeys.length) {
      this._markChildren(node.internalFields.childrenKeys);
    }
    let counter = 0;
    const items = extend([], this._dataStructure);
    each(items, ((index, item) => {
      if (!item) {
        this._dataStructure.splice(index - counter, 1);
        counter += 1;
      }
    }));
  }
  _addNode(item) {
    const {
      dataConverter
    } = this.options;
    const node = dataConverter._convertItemToNode(item, this.options.dataAccessors.getters.parentKey(item));
    this._dataStructure = this._dataStructure.concat(node);
    this._initialDataStructure = this._initialDataStructure.concat(node);
    dataConverter._dataStructure = dataConverter._dataStructure.concat(node);
  }
  _updateFields() {
    this.options.dataConverter.updateChildrenKeys();
    this._updateSelection();
    this._updateExpansion();
  }
  getSelectedNodesKeys() {
    return this._selectedNodesKeys;
  }
  getExpandedNodesKeys() {
    return this._expandedNodesKeys;
  }
  getData() {
    return this._dataStructure;
  }
  getFullData() {
    return this._initialDataStructure;
  }
  getNodeByItem(item) {
    let result = null;
    each(this._dataStructure, ((_index, node) => {
      if ((null === node || void 0 === node ? void 0 : node.internalFields.item) === item) {
        result = node;
        return false;
      }
      return true;
    }));
    return result;
  }
  getNodesByItems(items) {
    const nodes = [];
    each(items, ((_index, item) => {
      const node = this.getNodeByItem(item);
      if (node) {
        nodes.push(node);
      }
    }));
    return nodes;
  }
  getNodeByKey(key, data) {
    return this._getByKey(data ?? this._getDataBySelectionMode(), key);
  }
  getTreeNodes() {
    const rootNodes = this.getRootNodes();
    const rootKeys = rootNodes.map(((node) => node.internalFields.key));
    return this.options.dataConverter.convertToPublicNodes(rootKeys, null);
  }
  getItemsCount() {
    return this.options.dataConverter.getItemsCount();
  }
  getVisibleItemsCount() {
    return this.options.dataConverter.getVisibleItemsCount();
  }
  getPublicNode(node) {
    return null === node || void 0 === node ? void 0 : node.internalFields.publicNode;
  }
  getRootNodes() {
    return this.getChildrenNodes(this.options.rootValue);
  }
  getChildrenNodes(parentKey) {
    return m_query_default(this._dataStructure, {
      langParams: this.options.langParams
    }).filter(["internalFields.parentKey", parentKey]).toArray();
  }
  getIndexByKey(key) {
    return this.options.dataConverter.getIndexByKey(key);
  }
  addItem(item) {
    this._addNode(item);
    this._updateFields();
  }
  removeItem(key) {
    this._removeNode(key);
    this._updateFields();
  }
  toggleSelection(key, state, selectRecursive) {
    const isSingleModeUnselect = this._isSingleModeUnselect(state);
    const dataArray = selectRecursive || isSingleModeUnselect ? this._initialDataStructure : this._dataStructure;
    const node = this._getByKey(dataArray, key);
    if (node) {
      this._setFieldState(node, SELECTED, state);
      if (this.options.recursiveSelection && !selectRecursive) {
        if (state) {
          this._setChildrenSelection();
        } else {
          this._toggleChildrenSelection(node, state);
        }
        this._setParentSelection();
      }
    }
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
  }
  _isSingleModeUnselect(selectionState) {
    return !this.options.multipleSelection && !selectionState;
  }
  toggleNodeDisabledState(key, state) {
    const node = this.getNodeByKey(key);
    if (node) {
      this._setFieldState(node, DISABLED, state);
    }
  }
  toggleSelectAll(state) {
    if (!isDefined(state)) {
      return;
    }
    const lastSelectedKey = this._selectedNodesKeys[this._selectedNodesKeys.length - 1];
    const dataStructure = this._isSingleModeUnselect(state) ? this._initialDataStructure : this._dataStructure;
    each(dataStructure, ((_index, node) => {
      if (node && this._isNodeVisible(node)) {
        this._setFieldState(node, SELECTED, state);
      }
    }));
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
    if (!state && this.options.selectionRequired) {
      this.toggleSelection(lastSelectedKey, true);
    }
  }
  isAllSelected() {
    if (this.getSelectedNodesKeys().length) {
      return this.getSelectedNodesKeys().length === this.getVisibleItemsCount() ? true : void 0;
    }
    return false;
  }
  toggleExpansion(key, state) {
    const node = this.getNodeByKey(key);
    if (node) {
      this._setFieldState(node, EXPANDED, state);
      if (state) {
        this._updateExpansion(key);
      }
    }
    this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
  }
  isFiltered(item) {
    return !this.options.searchValue.length || !!this._filterDataStructure(this.options.searchValue, [item]).length;
  }
  static _createCriteria(selector, value, operation) {
    const searchFilter = [];
    if (!Array.isArray(selector)) {
      return [selector, operation, value];
    }
    each(selector, ((_index, item) => {
      searchFilter.push([item, operation, value], "or");
    }));
    searchFilter.pop();
    return searchFilter;
  }
  _filterDataStructure(filterValue, dataStructure) {
    const selector = this.options.searchExpr ?? this.options.dataAccessors.getters.display;
    const operation = getOperationBySearchMode(this.options.searchMode);
    const criteria = _DataAdapter._createCriteria(selector, filterValue, operation);
    const data = dataStructure ?? this._initialDataStructure;
    return m_query_default(data, {
      langParams: this.options.langParams
    }).filter(criteria).toArray();
  }
  search(searchValue) {
    let matches = this._filterDataStructure(searchValue);
    const {
      dataConverter
    } = this.options;
    const lookForParents = (matchesArray, startIndex) => {
      const {
        length
      } = matchesArray;
      let index = startIndex;
      while (index < length) {
        const node = matchesArray[index];
        if (node.internalFields.parentKey === this.options.rootValue) {
          index += 1;
        } else {
          const parent = dataConverter.getParentNode(node);
          if (!parent) {
            ui_errors_default.log("W1007", node.internalFields.parentKey, node.internalFields.key);
            index += 1;
          } else {
            if (!parent.internalFields.expanded) {
              this._setFieldState(parent, EXPANDED, true);
            }
            if (matchesArray.includes(parent)) {
              index += 1;
            } else {
              matchesArray.splice(index, 0, parent);
              lookForParents(matchesArray, index);
              return;
            }
          }
        }
      }
    };
    lookForParents(matches, 0);
    if (this.options.sort) {
      matches = m_store_helper_default.queryByOptions(m_query_default(matches), {
        sort: this.options.sort,
        langParams: this.options.langParams
      }).toArray();
    }
    dataConverter._indexByKey = {};
    each(matches, ((index, node) => {
      node.internalFields.childrenKeys = [];
      dataConverter._indexByKey[node.internalFields.key] = index;
    }));
    dataConverter._dataStructure = matches;
    dataConverter.setChildrenKeys();
    return dataConverter._dataStructure;
  }
};
var data_adapter_default = DataAdapter;

// node_modules/devextreme/esm/__internal/ui/hierarchical_collection/hierarchical_collection_widget.js
var HierarchicalCollectionWidget = class extends ui_collection_widget_async_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      keyExpr: "id",
      displayExpr: "text",
      selectedExpr: "selected",
      disabledExpr: "disabled",
      itemsExpr: "items",
      hoverStateEnabled: true,
      parentIdExpr: "parentId",
      expandedExpr: "expanded"
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
  _init() {
    super._init();
    this._initAccessors();
    this._initDataAdapter();
    this._initDynamicTemplates();
  }
  _initDataSource() {
    var _this$_dataSource;
    super._initDataSource();
    null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource || _this$_dataSource.paginate(false);
  }
  _initDataAdapter() {
    const accessors = this._createDataAdapterAccessors();
    const {
      items = []
    } = this.option();
    this._dataAdapter = new data_adapter_default(_extends({
      dataAccessors: {
        getters: accessors.getters,
        setters: accessors.setters
      },
      items
    }, this._getDataAdapterOptions()));
  }
  _getDataAdapterOptions() {
    return {};
  }
  _getItemExtraPropNames() {
    return [];
  }
  _initDynamicTemplates() {
    const fields = ["text", "html", "items", "icon"].concat(this._getItemExtraPropNames());
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(this._addContent.bind(this), fields, this.option("integrationOptions.watchMethod"), {
        text: this._displayGetter,
        items: this._itemsGetter
      })
    });
  }
  _addContent($container, itemData) {
    $container.html(itemData.html).append(this._getIconContainer(itemData)).append(this._getTextContainer(itemData));
  }
  _getLinkContainer(iconContainer, textContainer, itemData) {
    const {
      linkAttr,
      url
    } = itemData;
    const linkAttributes = isObject(linkAttr) ? linkAttr : {};
    return renderer_default("<a>").addClass("dx-item-url").attr(_extends({}, linkAttributes, {
      href: url
    })).append(iconContainer).append(textContainer);
  }
  _clickByLink(link) {
    link.addEventListener("click", ((e) => {
      e.stopPropagation();
    }), {
      once: true
    });
    link.click();
  }
  _getIconContainer(itemData) {
    if (!itemData.icon) {
      return;
    }
    const $imageContainer = getImageContainer(itemData.icon);
    if ($imageContainer.is("img")) {
      var _this$NAME;
      const componentName = null !== (_this$NAME = this.NAME) && void 0 !== _this$NAME && _this$NAME.startsWith("dxPrivateComponent") ? "" : `${this.NAME} `;
      $imageContainer.attr("alt", `${componentName}item icon`);
    }
    return $imageContainer;
  }
  _getTextContainer(itemData) {
    return renderer_default("<span>").text(itemData.text);
  }
  _initAccessors() {
    each(this._getAccessors(), ((_index, accessor) => {
      this._compileAccessor(accessor);
    }));
    this._compileDisplayGetter();
  }
  _getAccessors() {
    return ["key", "selected", "items", "disabled", "parentId", "expanded"];
  }
  _getChildNodes(node) {
    const arr = [];
    each(node.internalFields.childrenKeys, ((_, key) => {
      var _this$_dataAdapter;
      const childNode = null === (_this$_dataAdapter = this._dataAdapter) || void 0 === _this$_dataAdapter ? void 0 : _this$_dataAdapter.getNodeByKey(key);
      arr.push(childNode);
    }));
    return arr;
  }
  _hasChildren(node) {
    var _node$internalFields;
    return Boolean(null === node || void 0 === node || null === (_node$internalFields = node.internalFields) || void 0 === _node$internalFields || null === (_node$internalFields = _node$internalFields.childrenKeys) || void 0 === _node$internalFields ? void 0 : _node$internalFields.length);
  }
  _compileAccessor(optionName) {
    const getter = `_${optionName}Getter`;
    const setter = `_${optionName}Setter`;
    const optionExpr = this.option(`${optionName}Expr`);
    if (!optionExpr) {
      this[getter] = noop;
      this[setter] = noop;
      return;
    }
    if (isFunction(optionExpr)) {
      this[setter] = (obj, value) => {
        obj[optionExpr()] = value;
      };
      this[getter] = (obj) => obj[optionExpr()];
      return;
    }
    this[getter] = compileGetter(optionExpr);
    this[setter] = compileSetter(optionExpr);
  }
  _createDataAdapterAccessors() {
    const accessors = {
      getters: {},
      setters: {}
    };
    each(this._getAccessors(), ((_index, accessor) => {
      const getterName = `_${accessor}Getter`;
      const setterName = `_${accessor}Setter`;
      const newAccessor = "parentId" === accessor ? "parentKey" : accessor;
      accessors.getters[newAccessor] = this[getterName];
      accessors.setters[newAccessor] = this[setterName];
    }));
    accessors.getters.display = this._displayGetter ?? ((itemData) => itemData.text);
    return accessors;
  }
  _initMarkup() {
    super._initMarkup();
    this._addWidgetClass();
  }
  _addWidgetClass() {
    this._focusTarget().addClass(this._widgetClass());
  }
  _widgetClass() {
    return "";
  }
  _renderItemFrame(index, itemData, $itemContainer) {
    const $itemFrame = super._renderItemFrame(index, itemData, $itemContainer);
    $itemFrame.toggleClass("dx-state-disabled", !!this._disabledGetter(itemData));
    return $itemFrame;
  }
  _optionChanged(args) {
    switch (args.name) {
      case "displayExpr":
      case "keyExpr":
        this._initAccessors();
        this._initDynamicTemplates();
        this.repaint();
        break;
      case "itemsExpr":
      case "selectedExpr":
      case "disabledExpr":
      case "expandedExpr":
      case "parentIdExpr":
        this._initAccessors();
        this._initDataAdapter();
        this.repaint();
        break;
      case "items":
        this._initDataAdapter();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var hierarchical_collection_widget_default = HierarchicalCollectionWidget;

export {
  hierarchical_collection_widget_default
};
//# sourceMappingURL=chunk-KLHBLXOX.js.map
