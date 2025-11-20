import {
  DBLCLICK_EVENT_NAME
} from "./chunk-YAW44OPQ.js";
import {
  check_box_default
} from "./chunk-WL3AHEXM.js";
import {
  hierarchical_collection_widget_default
} from "./chunk-KLHBLXOX.js";
import {
  m_text_box_default
} from "./chunk-T6RX3ICP.js";
import {
  search_box_controller_default
} from "./chunk-7Z6ON4IH.js";
import {
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  SCROLLABLE_CONTENT_CLASS,
  getRelativeOffset,
  scrollable_default
} from "./chunk-KCGINBM5.js";
import {
  load_indicator_default
} from "./chunk-CAF7VME4.js";
import {
  getImageContainer
} from "./chunk-UQXIHJH2.js";
import {
  message_default
} from "./chunk-XULD25K2.js";
import {
  CLICK_EVENT_NAME,
  addNamespace,
  component_registrator_default,
  fx_default,
  getPublicElement,
  m_pointer_default
} from "./chunk-54SHI7Z2.js";
import {
  m_support_default
} from "./chunk-A3D3LIWG.js";
import {
  getHeight,
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  m_events_engine_default
} from "./chunk-4JX72F7N.js";
import {
  Deferred,
  _extends,
  dom_adapter_default,
  each,
  extend,
  fromPromise,
  hasWindow,
  isDefined,
  isFunction,
  isPlainObject,
  isPrimitive,
  isString,
  when
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/ui/tree_view/tree_view.base.js
var WIDGET_CLASS = "dx-treeview";
var NODE_CLASS = `${WIDGET_CLASS}-node`;
var NODE_CONTAINER_CLASS = `${NODE_CLASS}-container`;
var NODE_LOAD_INDICATOR_CLASS = `${NODE_CLASS}-loadindicator`;
var OPENED_NODE_CONTAINER_CLASS = `${NODE_CLASS}-container-opened`;
var IS_LEAF = `${NODE_CLASS}-is-leaf`;
var ITEM_CLASS = `${WIDGET_CLASS}-item`;
var ITEM_WITH_CHECKBOX_CLASS = `${ITEM_CLASS}-with-checkbox`;
var ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS = `${ITEM_CLASS}-with-custom-expander-icon`;
var CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS = `${WIDGET_CLASS}-custom-expander-icon-item-container`;
var ITEM_WITHOUT_CHECKBOX_CLASS = `${ITEM_CLASS}-without-checkbox`;
var ITEM_DATA_KEY = `${ITEM_CLASS}-data`;
var TOGGLE_ITEM_VISIBILITY_CLASS = `${WIDGET_CLASS}-toggle-item-visibility`;
var CUSTOM_COLLAPSE_ICON_CLASS = `${WIDGET_CLASS}-custom-collapse-icon`;
var CUSTOM_EXPAND_ICON_CLASS = `${WIDGET_CLASS}-custom-expand-icon`;
var LOAD_INDICATOR_CLASS = `${WIDGET_CLASS}-loadindicator`;
var LOAD_INDICATOR_WRAPPER_CLASS = `${WIDGET_CLASS}-loadindicator-wrapper`;
var TOGGLE_ITEM_VISIBILITY_OPENED_CLASS = `${WIDGET_CLASS}-toggle-item-visibility-opened`;
var SELECT_ALL_ITEM_CLASS = `${WIDGET_CLASS}-select-all-item`;
var DATA_ITEM_ID = "data-item-id";
var ROOT_NODE_CLASS = `${WIDGET_CLASS}-root-node`;
var EXPANDER_ICON_STUB_CLASS = `${WIDGET_CLASS}-expander-icon-stub`;
var TreeViewBase = class extends hierarchical_collection_widget_default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _supportedKeys() {
    const click = (e) => {
      const {
        focusedElement
      } = this.option();
      const $itemElement = renderer_default(focusedElement);
      if (!$itemElement.length) {
        return;
      }
      e.target = $itemElement.get(0);
      e.currentTarget = $itemElement.get(0);
      this._processItemClick(e, $itemElement.children(`.${ITEM_CLASS}`));
      const {
        expandEvent
      } = this.option();
      const expandEventName = this._getEventNameByOption(expandEvent);
      const expandByClick = expandEventName === addNamespace(CLICK_EVENT_NAME, "dxTreeView_expand");
      if (expandByClick) {
        this._expandEventHandler(e);
      }
    };
    const select = (e) => {
      e.preventDefault();
      const {
        focusedElement
      } = this.option();
      const $focusedElement = renderer_default(focusedElement);
      const checkboxInstance = this._getCheckBoxInstance($focusedElement);
      const {
        disabled,
        value
      } = checkboxInstance.option();
      if (!disabled) {
        const currentState = value;
        this._updateItemSelection(!currentState, $focusedElement.find(`.${ITEM_CLASS}`).get(0), e);
      }
    };
    const toggleExpandedNestedItems = (state, e) => {
      const {
        expandAllEnabled
      } = this.option();
      if (!expandAllEnabled) {
        return;
      }
      e.preventDefault();
      const {
        focusedElement
      } = this.option();
      const $rootElement = renderer_default(focusedElement);
      if (!$rootElement.length) {
        return;
      }
      const rootItem = this._getItemData($rootElement.find(`.${ITEM_CLASS}`));
      this._toggleExpandedNestedItems([rootItem], state);
    };
    return _extends({}, super._supportedKeys(), {
      enter: this._showCheckboxes() ? select : click,
      space: this._showCheckboxes() ? select : click,
      asterisk: (e) => {
        toggleExpandedNestedItems(true, e);
      },
      minus: (e) => {
        toggleExpandedNestedItems(false, e);
      }
    });
  }
  _toggleExpandedNestedItems(items, state) {
    if (!items) {
      return;
    }
    for (let i = 0, len = items.length; i < len; i += 1) {
      const item = items[i];
      const node = this._dataAdapter.getNodeByItem(item);
      this._toggleExpandedState(node, state);
      this._toggleExpandedNestedItems(item.items, state);
    }
  }
  _getNodeElement(node, cache) {
    const key = this._encodeString(node.internalFields.key);
    if (cache) {
      if (!cache.$nodeByKey) {
        cache.$nodeByKey = {};
        const $nodes = this.$element().find(`.${NODE_CLASS}`);
        $nodes.each(((_index, element2) => {
          const $node = renderer_default(element2);
          const nodeKey = $node.attr(DATA_ITEM_ID);
          cache.$nodeByKey[nodeKey] = $node;
          return true;
        }));
      }
      return cache.$nodeByKey[key] || renderer_default();
    }
    const element = this.$element().get(0).querySelector(`[${DATA_ITEM_ID}="${key}"]`);
    return renderer_default(element);
  }
  _widgetClass() {
    return WIDGET_CLASS;
  }
  _getDefaultOptions() {
    const defaultOptions = _extends({}, super._getDefaultOptions(), {
      animationEnabled: true,
      dataStructure: "tree",
      deferRendering: true,
      expandAllEnabled: false,
      hasItemsExpr: "hasItems",
      selectNodesRecursive: true,
      expandNodesRecursive: true,
      showCheckBoxesMode: "none",
      expandIcon: null,
      collapseIcon: null,
      selectAllText: message_default.format("dxList-selectAll"),
      onItemSelectionChanged: null,
      onItemExpanded: null,
      onItemCollapsed: null,
      scrollDirection: "vertical",
      useNativeScrolling: true,
      virtualModeEnabled: false,
      rootValue: 0,
      focusStateEnabled: false,
      selectionMode: "multiple",
      expandEvent: "dblclick",
      selectByClick: false,
      createChildren: null,
      onSelectAllValueChanged: null,
      _supportItemUrl: false
    });
    return extend(true, defaultOptions, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => !m_support_default.nativeScrolling,
      options: {
        useNativeScrolling: false
      }
    }]);
  }
  _initSelectedItems() {
  }
  _syncSelectionOptions() {
    return Deferred().resolve().promise();
  }
  _fireSelectionChanged() {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })();
  }
  _createSelectAllValueChangedAction() {
    this._selectAllValueChangedAction = this._createActionByOption("onSelectAllValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _fireSelectAllValueChanged(value) {
    var _this$_selectAllValue;
    null === (_this$_selectAllValue = this._selectAllValueChangedAction) || void 0 === _this$_selectAllValue || _this$_selectAllValue.call(this, {
      value
    });
  }
  _checkBoxModeChange(value, previousValue) {
    var _this$_$selectAllItem;
    const {
      searchEnabled
    } = this.option();
    const previousSelectAllEnabled = this._selectAllEnabled(previousValue);
    const previousItemsContainer = this._itemContainer(searchEnabled, previousSelectAllEnabled);
    this._detachClickEvent(previousItemsContainer);
    this._detachExpandEvent(previousItemsContainer);
    if ("none" === previousValue || "none" === value) {
      return;
    }
    const selectAllExists = null === (_this$_$selectAllItem = this._$selectAllItem) || void 0 === _this$_$selectAllItem ? void 0 : _this$_$selectAllItem.length;
    switch (value) {
      case "selectAll":
        if (!selectAllExists) {
          this._createSelectAllValueChangedAction();
          this._renderSelectAllItem();
        }
        break;
      case "normal":
        if (selectAllExists) {
          var _this$_$selectAllItem2;
          null === (_this$_$selectAllItem2 = this._$selectAllItem) || void 0 === _this$_$selectAllItem2 || _this$_$selectAllItem2.remove();
          delete this._$selectAllItem;
        }
    }
  }
  _removeSelection() {
    each(this._dataAdapter.getFullData(), ((_index, node) => {
      if (!this._hasChildren(node)) {
        return;
      }
      this._dataAdapter.toggleSelection(node.internalFields.key, false, true);
    }));
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "selectAllText":
        if (this._$selectAllItem) {
          this._$selectAllItem.dxCheckBox("instance").option("text", value);
        }
        break;
      case "showCheckBoxesMode":
        this._checkBoxModeChange(value, previousValue);
        this._invalidate();
        break;
      case "scrollDirection":
        this.getScrollable().option("direction", value);
        break;
      case "useNativeScrolling":
        this.getScrollable().option("useNative", value);
        break;
      case "items":
        delete this._$selectAllItem;
        super._optionChanged(args);
        break;
      case "dataSource":
        super._optionChanged(args);
        this._initDataAdapter();
        this._filter = {};
        break;
      case "hasItemsExpr":
        this._initAccessors();
        this.repaint();
        break;
      case "expandEvent":
        this._attachExpandEvent();
        break;
      case "deferRendering":
      case "dataStructure":
      case "rootValue":
      case "createChildren":
      case "expandNodesRecursive":
      case "onItemSelectionChanged":
      case "onItemExpanded":
      case "onItemCollapsed":
      case "expandAllEnabled":
      case "animationEnabled":
      case "virtualModeEnabled":
      case "selectByClick":
      case "_supportItemUrl":
        break;
      case "selectionMode":
        this._initDataAdapter();
        super._optionChanged(args);
        break;
      case "onSelectAllValueChanged":
        this._createSelectAllValueChangedAction();
        break;
      case "selectNodesRecursive":
        this._dataAdapter.setOption("recursiveSelection", args.value ?? false);
        this.repaint();
        break;
      case "expandIcon":
      case "collapseIcon":
        this.repaint();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _initDataSource() {
    if (this._useCustomChildrenLoader()) {
      this._loadChildrenByCustomLoader(null).done(((newItems) => {
        if (null !== newItems && void 0 !== newItems && newItems.length) {
          this.option("items", newItems);
        }
      }));
    } else {
      super._initDataSource();
      if (this._isVirtualMode()) {
        this._initVirtualMode();
      }
    }
  }
  _initVirtualMode() {
    const filter = this._filter;
    if (!filter.custom) {
      filter.custom = this._dataSource.filter();
    }
    if (!filter.internal) {
      const {
        parentIdExpr,
        rootValue
      } = this.option();
      filter.internal = [parentIdExpr, rootValue];
    }
  }
  _useCustomChildrenLoader() {
    const {
      createChildren
    } = this.option();
    return isFunction(createChildren) && this._isDataStructurePlain();
  }
  _loadChildrenByCustomLoader(parentNode) {
    const {
      createChildren
    } = this.option();
    const invocationResult = null === createChildren || void 0 === createChildren ? void 0 : createChildren.call(this, parentNode);
    if (Array.isArray(invocationResult)) {
      return Deferred().resolve(invocationResult).promise();
    }
    if (invocationResult && isFunction(invocationResult.then)) {
      return fromPromise(invocationResult);
    }
    return Deferred().resolve([]).promise();
  }
  _combineFilter() {
    var _this$_filter$custom;
    if (!(null !== (_this$_filter$custom = this._filter.custom) && void 0 !== _this$_filter$custom && _this$_filter$custom.length)) {
      return this._filter.internal;
    }
    return [this._filter.custom, this._filter.internal];
  }
  _dataSourceLoadErrorHandler() {
    this._renderEmptyMessage();
  }
  _init() {
    this._filter = {};
    super._init();
    this._initStoreChangeHandlers();
  }
  _dataSourceChangedHandler(newItems) {
    const {
      items = []
    } = this.option();
    if (this._initialized && this._isVirtualMode() && items.length) {
      return;
    }
    this.option("items", newItems);
  }
  _removeTreeViewLoadIndicator() {
    if (!this._treeViewLoadIndicator) {
      return;
    }
    this._treeViewLoadIndicator.remove();
    this._treeViewLoadIndicator = null;
  }
  _createTreeViewLoadIndicator() {
    this._treeViewLoadIndicator = renderer_default("<div>").addClass(LOAD_INDICATOR_CLASS);
    this._createComponent(this._treeViewLoadIndicator, load_indicator_default, {});
    return this._treeViewLoadIndicator;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    let resultFilter;
    if (this._isVirtualMode()) {
      resultFilter = this._combineFilter();
      this._dataSource.filter(resultFilter);
    }
    if (isLoading && !this._dataSource.isLoaded()) {
      this.option("items", []);
      const $wrapper = renderer_default("<div>").addClass(LOAD_INDICATOR_WRAPPER_CLASS);
      this._createTreeViewLoadIndicator().appendTo($wrapper);
      this.itemsContainer().append($wrapper);
      if (this._isVirtualMode() && this._dataSource.filter() !== resultFilter) {
        this._dataSource.filter([]);
      }
    } else {
      this._removeTreeViewLoadIndicator();
    }
  }
  _initStoreChangeHandlers() {
    var _this$_dataSource;
    const {
      dataStructure
    } = this.option();
    if ("plain" !== dataStructure) {
      return;
    }
    null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource || _this$_dataSource.store().on("inserted", ((newItem) => {
      const {
        items = []
      } = this.option();
      this.option().items = items.concat(newItem);
      this._dataAdapter.addItem(newItem);
      if (!this._dataAdapter.isFiltered(newItem)) {
        return;
      }
      this._updateLevel(this._parentIdGetter(newItem));
    })).on("removed", ((removedKey) => {
      const node = this._dataAdapter.getNodeByKey(removedKey);
      if (isDefined(node)) {
        const {
          items = []
        } = this.option();
        const index = this._dataAdapter.getIndexByKey(node.internalFields.key);
        items[index] = 0;
        this._markChildrenItemsToRemove(node);
        this._removeItems();
        this._dataAdapter.removeItem(removedKey);
        this._updateLevel(this._parentIdGetter(node));
      }
    }));
  }
  _markChildrenItemsToRemove(node) {
    const keys = null === node || void 0 === node ? void 0 : node.internalFields.childrenKeys;
    each(keys, ((_index, key) => {
      const {
        items = []
      } = this.option();
      const index = this._dataAdapter.getIndexByKey(key);
      items[index] = 0;
      this._markChildrenItemsToRemove(this._dataAdapter.getNodeByKey(key));
    }));
  }
  _removeItems() {
    const items = extend(true, [], this.option("items"));
    let counter = 0;
    each(items, ((index, item) => {
      if (!item) {
        this.option("items").splice(index - counter, 1);
        counter += 1;
      }
    }));
  }
  _updateLevel(parentId) {
    const $container = this._getContainerByParentKey(parentId);
    this._renderNodes(this._dataAdapter.getChildrenNodes(parentId), $container);
  }
  _getOldContainer($itemElement) {
    if ($itemElement.length) {
      return $itemElement.children(`.${NODE_CONTAINER_CLASS}`);
    }
    const scrollable = this.getScrollable();
    if (scrollable) {
      return renderer_default(scrollable.content()).children();
    }
    return renderer_default();
  }
  _getContainerByParentKey(parentId) {
    const node = this._dataAdapter.getNodeByKey(parentId);
    const $itemElement = node ? this._getNodeElement(node) : renderer_default();
    this._getOldContainer($itemElement).remove();
    const $container = this._renderNodeContainer($itemElement);
    if (this._isRootLevel(parentId)) {
      const scrollable = this.getScrollable();
      if (!scrollable) {
        this._renderScrollableContainer();
      }
      renderer_default(scrollable.content()).append($container);
    }
    return $container;
  }
  _isRootLevel(parentId) {
    const {
      rootValue
    } = this.option();
    return parentId === rootValue;
  }
  _getAccessors() {
    const accessors = super._getAccessors();
    accessors.push("hasItems");
    return accessors;
  }
  _getDataAdapterOptions() {
    var _this$_dataSource2, _this$_dataSource3, _this$_dataSource3$lo;
    const {
      rootValue,
      expandNodesRecursive = true,
      selectionRequired = false,
      dataStructure = "tree"
    } = this.option();
    return {
      rootValue,
      multipleSelection: !this._isSingleSelection(),
      recursiveSelection: this._isRecursiveSelection(),
      recursiveExpansion: expandNodesRecursive,
      searchValue: "",
      selectionRequired,
      dataType: dataStructure,
      sort: null === (_this$_dataSource2 = this._dataSource) || void 0 === _this$_dataSource2 ? void 0 : _this$_dataSource2.sort(),
      langParams: null === (_this$_dataSource3 = this._dataSource) || void 0 === _this$_dataSource3 || null === (_this$_dataSource3$lo = _this$_dataSource3.loadOptions) || void 0 === _this$_dataSource3$lo || null === (_this$_dataSource3$lo = _this$_dataSource3$lo.call(_this$_dataSource3)) || void 0 === _this$_dataSource3$lo ? void 0 : _this$_dataSource3$lo.langParams
    };
  }
  _initMarkup() {
    this._renderScrollableContainer();
    this._renderEmptyMessage(this._dataAdapter.getRootNodes());
    super._initMarkup();
    this._setAriaRole();
  }
  _setAriaRole() {
    const {
      items
    } = this.option();
    if (null !== items && void 0 !== items && items.length) {
      this.setAria({
        role: "tree"
      });
    }
  }
  _renderContentImpl() {
    const $nodeContainer = this._renderNodeContainer();
    renderer_default(this.getScrollable().content()).append($nodeContainer);
    const {
      items
    } = this.option();
    if (!(null !== items && void 0 !== items && items.length)) {
      return;
    }
    this._renderNodes(this._dataAdapter.getRootNodes(), $nodeContainer);
    this._attachExpandEvent();
    if (this._selectAllEnabled()) {
      this._createSelectAllValueChangedAction();
      this._renderSelectAllItem($nodeContainer);
    }
  }
  _isVirtualMode() {
    const {
      virtualModeEnabled,
      dataSource
    } = this.option();
    return !!virtualModeEnabled && this._isDataStructurePlain() && !!dataSource;
  }
  _isDataStructurePlain() {
    const {
      dataStructure
    } = this.option();
    return "plain" === dataStructure;
  }
  _fireContentReadyAction() {
    const dataSource = this.getDataSource();
    const skipContentReadyAction = dataSource && !dataSource.isLoaded() || this._skipContentReadyAndItemExpanded;
    const scrollable = this.getScrollable();
    if (scrollable && hasWindow()) {
      scrollable.update();
    }
    if (!skipContentReadyAction) {
      super._fireContentReadyAction();
    }
    if (scrollable && hasWindow()) {
      scrollable.update();
    }
  }
  _renderScrollableContainer() {
    const {
      useNativeScrolling,
      scrollDirection
    } = this.option();
    this._scrollable = this._createComponent(renderer_default("<div>").appendTo(this.$element()), scrollable_default, {
      useNative: useNativeScrolling,
      direction: scrollDirection,
      useKeyboard: false
    });
  }
  _renderNodeContainer($parent) {
    const $container = renderer_default("<ul>").addClass(NODE_CONTAINER_CLASS);
    this.setAria("role", "group", $container);
    if (null !== $parent && void 0 !== $parent && $parent.length) {
      const itemData = this._getItemData($parent.children(`.${ITEM_CLASS}`));
      if (this._expandedGetter(itemData)) {
        $container.addClass(OPENED_NODE_CONTAINER_CLASS);
      }
      $container.appendTo($parent);
    }
    return $container;
  }
  _createDOMElement($nodeContainer, node) {
    var _this$_displayGetter, _node$internalFields;
    const $node = renderer_default("<li>").addClass(NODE_CLASS).attr(DATA_ITEM_ID, this._encodeString(node.internalFields.key)).prependTo($nodeContainer);
    const attrs = {
      role: "treeitem",
      label: (null === (_this$_displayGetter = this._displayGetter) || void 0 === _this$_displayGetter ? void 0 : _this$_displayGetter.call(this, node.internalFields.item)) ?? "",
      level: this._getLevel($nodeContainer)
    };
    const hasChildNodes = !!(null !== node && void 0 !== node && null !== (_node$internalFields = node.internalFields) && void 0 !== _node$internalFields && null !== (_node$internalFields = _node$internalFields.childrenKeys) && void 0 !== _node$internalFields && _node$internalFields.length);
    if (hasChildNodes) {
      attrs.expanded = node.internalFields.expanded ?? false;
    }
    this.setAria(attrs, $node);
    return $node;
  }
  _getLevel($nodeContainer) {
    const parent = $nodeContainer.parent();
    return parent.hasClass("dx-scrollable-content") ? 1 : parseInt(parent.attr("aria-level") ?? "0", 10) + 1;
  }
  _showCheckboxes() {
    const {
      showCheckBoxesMode
    } = this.option();
    return "none" !== showCheckBoxesMode;
  }
  _hasCustomExpanderIcons() {
    const {
      expandIcon,
      collapseIcon
    } = this.option();
    return !!expandIcon || !!collapseIcon;
  }
  _selectAllEnabled(showCheckBoxesMode) {
    const {
      showCheckBoxesMode: currentShowCheckBoxesMode
    } = this.option();
    const mode = showCheckBoxesMode ?? currentShowCheckBoxesMode;
    return "selectAll" === mode && !this._isSingleSelection();
  }
  _renderNodes(nodes, $nodeContainer) {
    const length = nodes.length - 1;
    for (let i = length; i >= 0; i -= 1) {
      this._renderItem(i, nodes[i], $nodeContainer);
    }
    this._renderedItemsCount += nodes.length;
  }
  _renderItem(nodeIndex, node, $nodeContainer) {
    const $node = this._createDOMElement($nodeContainer, node);
    const nodeData = node.internalFields;
    const showCheckBox = this._showCheckboxes();
    $node.addClass(showCheckBox ? ITEM_WITH_CHECKBOX_CLASS : ITEM_WITHOUT_CHECKBOX_CLASS);
    $node.toggleClass("dx-state-invisible", false === nodeData.item.visible);
    if (this._hasCustomExpanderIcons()) {
      $node.addClass(ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS);
      $nodeContainer.addClass(CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS);
    }
    this.setAria("selected", nodeData.selected, $node);
    this._toggleSelectedClass($node, nodeData.selected);
    if (nodeData.disabled) {
      this.setAria("disabled", nodeData.disabled, $node);
    }
    super._renderItem(this._renderedItemsCount + nodeIndex, nodeData.item, $node);
    const parent = this._getNode(node.internalFields.parentKey);
    if (!parent) {
      $node.addClass(ROOT_NODE_CLASS);
    }
    if (false !== nodeData.item.visible) {
      this._renderChildren($node, node);
    }
    return $node;
  }
  _setAriaSelectionAttribute() {
  }
  _renderChildren($node, node) {
    if (!this._hasChildren(node)) {
      this._addLeafClass($node);
      renderer_default("<div>").addClass(EXPANDER_ICON_STUB_CLASS).appendTo(this._getItem($node));
      return;
    }
    if (this._hasCustomExpanderIcons()) {
      this._renderCustomExpanderIcons($node, node);
    } else {
      this._renderDefaultExpanderIcons($node, node);
    }
    if (this._shouldRenderSublevel(node.internalFields.expanded)) {
      this._loadSublevel(node).done(((childNodes) => {
        this._renderSublevel($node, this._getActualNode(node), childNodes);
      }));
    }
  }
  _shouldRenderSublevel(expanded) {
    const {
      deferRendering
    } = this.option();
    return expanded || !deferRendering;
  }
  _getActualNode(cachedNode) {
    return this._dataAdapter.getNodeByKey(cachedNode.internalFields.key);
  }
  _hasChildren(node) {
    if (this._isVirtualMode() || this._useCustomChildrenLoader()) {
      return false !== this._hasItemsGetter(node.internalFields.item);
    }
    return super._hasChildren(node);
  }
  _loadSublevel(node) {
    const deferred = Deferred();
    const childrenNodes = this._getChildNodes(node);
    if (childrenNodes.length) {
      deferred.resolve(childrenNodes);
    } else {
      this._loadNestedItems(node).done(((items) => {
        deferred.resolve(this._dataAdapter.getNodesByItems(items));
      }));
    }
    return deferred.promise();
  }
  _getItemExtraPropNames() {
    return ["url", "linkAttr"];
  }
  _addContent($container, itemData) {
    const {
      html,
      url
    } = itemData;
    const {
      _supportItemUrl
    } = this.option();
    if (_supportItemUrl && url) {
      $container.html(html);
      const link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
      $container.append(link);
    } else {
      super._addContent($container, itemData);
    }
  }
  _postprocessRenderItem(args) {
    const {
      itemData,
      itemElement
    } = args;
    if (this._showCheckboxes()) {
      this._renderCheckBox(itemElement, this._getNode(itemData));
    }
    super._postprocessRenderItem(args);
  }
  _renderSublevel($node, node, childNodes) {
    const $nestedNodeContainer = this._renderNodeContainer($node);
    const keySet = new Set(node.internalFields.childrenKeys);
    const childNodesByChildrenKeys = childNodes.filter(((childNode) => keySet.has(childNode.internalFields.key)));
    this._renderNodes(childNodesByChildrenKeys, $nestedNodeContainer);
    if (childNodesByChildrenKeys.length && !node.internalFields.selected) {
      const firstChild = childNodesByChildrenKeys[0];
      this._updateParentsState(firstChild, this._getNodeElement(firstChild));
    }
    this._normalizeIconState($node, childNodesByChildrenKeys.length);
    if (node.internalFields.expanded) {
      $nestedNodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    }
  }
  _executeItemRenderAction(itemIndex, itemData, itemElement) {
    const node = this._getNode(itemElement);
    this._getItemRenderAction()({
      itemElement,
      itemIndex,
      itemData,
      node: this._dataAdapter.getPublicNode(node)
    });
  }
  _addLeafClass($node) {
    $node.addClass(IS_LEAF);
  }
  _expandEventHandler(e) {
    const $nodeElement = renderer_default(e.currentTarget.parentNode);
    if (!$nodeElement.hasClass(IS_LEAF)) {
      this._toggleExpandedState(e.currentTarget, void 0, e);
    }
  }
  _attachExpandEvent() {
    const {
      expandEvent
    } = this.option();
    const expandedEventName = this._getEventNameByOption(expandEvent);
    const $itemsContainer = this._itemContainer();
    this._detachExpandEvent($itemsContainer);
    m_events_engine_default.on($itemsContainer, expandedEventName, this._itemSelector(), this._expandEventHandler.bind(this));
  }
  _detachExpandEvent(itemsContainer) {
    m_events_engine_default.off(itemsContainer, ".dxTreeView_expand", this._itemSelector());
  }
  _getEventNameByOption(name) {
    const event = "click" === name ? CLICK_EVENT_NAME : DBLCLICK_EVENT_NAME;
    return addNamespace(event, "dxTreeView_expand");
  }
  _getNode(identifier) {
    if (!isDefined(identifier)) {
      return null;
    }
    if (isPrimitive(identifier)) {
      return this._dataAdapter.getNodeByKey(identifier);
    }
    if (isPlainObject(identifier) && "internalFields" in identifier) {
      return identifier;
    }
    const itemElement = renderer_default(identifier).get(0);
    if (!itemElement) {
      return null;
    }
    if (dom_adapter_default.isElementNode(itemElement)) {
      return this._getNodeByElement(itemElement);
    }
    return this._dataAdapter.getNodeByItem(itemElement);
  }
  _getNodeByElement(itemElement) {
    const $node = renderer_default(itemElement).closest(`.${NODE_CLASS}`);
    const itemKeyAttr = $node.attr(DATA_ITEM_ID);
    if (!isDefined(itemKeyAttr)) {
      return null;
    }
    const key = this._decodeString(itemKeyAttr);
    return this._dataAdapter.getNodeByKey(key);
  }
  _toggleExpandedState(itemElement, state, e) {
    const node = this._getNode(itemElement);
    if (!node) {
      return Deferred().reject().promise();
    }
    if (node.internalFields.disabled) {
      return Deferred().reject().promise();
    }
    const currentState = node.internalFields.expanded;
    if (currentState === state) {
      return Deferred().resolve().promise();
    }
    if (this._hasChildren(node)) {
      const $node = this._getNodeElement(node);
      if ($node.find(`.${NODE_LOAD_INDICATOR_CLASS}:not(.dx-state-invisible)`).length) {
        return Deferred().reject().promise();
      }
      if (!currentState && !this._nodeHasRenderedChildren($node)) {
        this._createLoadIndicator($node);
      }
    }
    const newState = state ?? !currentState;
    this._dataAdapter.toggleExpansion(node.internalFields.key, newState);
    return this._updateExpandedItemsUI(node, newState, e);
  }
  _nodeHasRenderedChildren($node) {
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    return $nodeContainer.not(":empty").length;
  }
  _getItem($node) {
    return $node.children(`.${ITEM_CLASS}`).eq(0);
  }
  _createLoadIndicator($node) {
    const $treeviewItem = this._getItem($node);
    this._createComponent(renderer_default("<div>").addClass(NODE_LOAD_INDICATOR_CLASS), load_indicator_default, {}).$element().appendTo($treeviewItem);
    const $icon = $treeviewItem.children(`.${TOGGLE_ITEM_VISIBILITY_CLASS},.${CUSTOM_EXPAND_ICON_CLASS}`);
    $icon.hide();
  }
  _renderExpanderIcon($node, node, $icon, iconClass) {
    $icon.appendTo(this._getItem($node));
    $icon.addClass(iconClass);
    if (node.internalFields.disabled) {
      $icon.addClass("dx-state-disabled");
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  }
  _renderDefaultExpanderIcons($node, node) {
    const $treeViewItem = this._getItem($node);
    const $icon = renderer_default("<div>").addClass(TOGGLE_ITEM_VISIBILITY_CLASS).appendTo($treeViewItem);
    if (node.internalFields.expanded) {
      $icon.addClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS);
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    if (node.internalFields.disabled) {
      $icon.addClass("dx-state-disabled");
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  }
  _renderCustomExpanderIcons($node, node) {
    const {
      expandIcon,
      collapseIcon
    } = this.option();
    const $expandIcon = getImageContainer(expandIcon ?? collapseIcon) ?? renderer_default();
    const $collapseIcon = getImageContainer(collapseIcon ?? expandIcon) ?? renderer_default();
    this._renderExpanderIcon($node, node, $expandIcon, CUSTOM_EXPAND_ICON_CLASS);
    this._renderExpanderIcon($node, node, $collapseIcon, CUSTOM_COLLAPSE_ICON_CLASS);
    const isNodeExpanded = node.internalFields.expanded;
    if (isNodeExpanded) {
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    this._toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded);
  }
  _renderToggleItemVisibilityIconClick($icon, node) {
    const eventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    m_events_engine_default.off($icon, eventName);
    m_events_engine_default.on($icon, eventName, ((e) => {
      this._toggleExpandedState(node.internalFields.key, void 0, e);
      return false;
    }));
  }
  _toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded) {
    $collapseIcon.toggle(isNodeExpanded);
    $expandIcon.toggle(!isNodeExpanded);
  }
  _updateExpandedItemsUI(node, state, e) {
    const $node = this._getNodeElement(node);
    const isHiddenNode = !$node.length || state && $node.is(":hidden");
    const {
      expandNodesRecursive
    } = this.option();
    if (expandNodesRecursive && isHiddenNode) {
      const parentNode = this._getNode(node.internalFields.parentKey);
      if (parentNode) {
        this._updateExpandedItemsUI(parentNode, state, e);
      }
    }
    if (!this._hasCustomExpanderIcons()) {
      const $icon = this._getItem($node).children(`.${TOGGLE_ITEM_VISIBILITY_CLASS}`);
      $icon.toggleClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS, state);
    } else if (this._nodeHasRenderedChildren($node)) {
      const $item = this._getItem($node);
      const $childExpandIcons = $item.children(`.${CUSTOM_EXPAND_ICON_CLASS}`);
      const $childCollapseIcons = $item.children(`.${CUSTOM_COLLAPSE_ICON_CLASS}`);
      this._toggleCustomExpanderIcons($childExpandIcons, $childCollapseIcons, state);
    }
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    const nodeContainerExists = $nodeContainer.length > 0;
    const completionCallback = Deferred();
    if (!state || nodeContainerExists && !$nodeContainer.is(":empty")) {
      this._animateNodeContainer(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    if (0 === node.internalFields.childrenKeys.length && (this._isVirtualMode() || this._useCustomChildrenLoader())) {
      this._loadNestedItemsWithUpdate(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    this._renderSublevel($node, node, this._getChildNodes(node));
    this._fireContentReadyAction();
    this._animateNodeContainer(node, state, e, completionCallback);
    return completionCallback.promise();
  }
  _loadNestedItemsWithUpdate(node, state, e, completionCallback) {
    const $node = this._getNodeElement(node);
    this._loadNestedItems(node).done(((items) => {
      const actualNodeData = this._getActualNode(node);
      this._renderSublevel($node, actualNodeData, this._dataAdapter.getNodesByItems(items));
      if (!(null !== items && void 0 !== items && items.length)) {
        completionCallback.resolve();
        return;
      }
      this._fireContentReadyAction();
      this._animateNodeContainer(actualNodeData, state, e, completionCallback);
    }));
  }
  _loadNestedItems(node) {
    if (this._useCustomChildrenLoader()) {
      const publicNode = this._dataAdapter.getPublicNode(node);
      return this._loadChildrenByCustomLoader(publicNode).done(((newItems) => {
        if (!this._areNodesExists(newItems)) {
          this._appendItems(newItems);
        }
      }));
    }
    if (!this._isVirtualMode()) {
      return Deferred().resolve([]).promise();
    }
    const {
      parentIdExpr
    } = this.option();
    this._filter.internal = [parentIdExpr, node.internalFields.key];
    this._dataSource.filter(this._combineFilter());
    return this._dataSource.load().done(((newItems) => {
      if (!this._areNodesExists(newItems)) {
        this._appendItems(newItems);
      }
    }));
  }
  _areNodesExists(newItems) {
    const keyOfRootItem = this.keyOf(newItems[0]);
    const fullData = this._dataAdapter.getFullData();
    return !!this._dataAdapter.getNodeByKey(keyOfRootItem, fullData);
  }
  _appendItems(newItems) {
    const {
      items = []
    } = this.option();
    this.option().items = items.concat(newItems);
    this._initDataAdapter();
  }
  _animateNodeContainer(node, state, e, completionCallback) {
    const $node = this._getNodeElement(node);
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    if (node && completionCallback && 0 === $nodeContainer.length) {
      completionCallback.resolve();
    }
    $nodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    const nodeHeight = getHeight($nodeContainer);
    const {
      animationEnabled
    } = this.option();
    fx_default.stop($nodeContainer.get(0), true);
    fx_default.animate($nodeContainer.get(0), {
      type: "custom",
      duration: animationEnabled ? 400 : 0,
      from: {
        maxHeight: state ? 0 : nodeHeight
      },
      to: {
        maxHeight: state ? nodeHeight : 0
      },
      complete: () => {
        $nodeContainer.css("maxHeight", "none");
        $nodeContainer.toggleClass(OPENED_NODE_CONTAINER_CLASS, state);
        this.setAria("expanded", state, $node);
        this.getScrollable().update();
        this._fireExpandedStateUpdatedEvent(state, node, e);
        if (completionCallback) {
          completionCallback.resolve();
        }
      }
    });
  }
  _fireExpandedStateUpdatedEvent(isExpanded, node, e) {
    if (!this._hasChildren(node) || this._skipContentReadyAndItemExpanded) {
      return;
    }
    const optionName = isExpanded ? "onItemExpanded" : "onItemCollapsed";
    if (isDefined(e)) {
      this._itemDXEventHandler(e, optionName, {
        node: this._dataAdapter.getPublicNode(node)
      });
    } else {
      const target = this._getNodeElement(node);
      const actionArgs = {
        event: e,
        node: this._dataAdapter.getPublicNode(node)
      };
      this._itemEventHandler(target, optionName, actionArgs);
    }
  }
  _normalizeIconState($node, hasNewItems) {
    const $loadIndicator = $node.find(`.${NODE_LOAD_INDICATOR_CLASS}`);
    if ($loadIndicator.length) {
      var _LoadIndicator$getIns;
      null === (_LoadIndicator$getIns = load_indicator_default.getInstance($loadIndicator)) || void 0 === _LoadIndicator$getIns || _LoadIndicator$getIns.option("visible", false);
    }
    const $treeViewItem = this._getItem($node);
    const $toggleItem = $treeViewItem.children(`.${CUSTOM_COLLAPSE_ICON_CLASS},.${TOGGLE_ITEM_VISIBILITY_CLASS}`);
    if (hasNewItems) {
      $toggleItem.show();
      return;
    }
    $toggleItem.removeClass(TOGGLE_ITEM_VISIBILITY_CLASS);
    $node.addClass(IS_LEAF);
  }
  _emptyMessageContainer() {
    const scrollable = this.getScrollable();
    return scrollable ? renderer_default(scrollable.content()) : super._emptyMessageContainer();
  }
  _renderContent() {
    const {
      items
    } = this.option();
    if (null !== items && void 0 !== items && items.length) {
      this._contentAlreadyRendered = true;
    }
    super._renderContent();
  }
  _renderSelectAllItem($container) {
    const {
      selectAllText,
      focusStateEnabled
    } = this.option();
    const $selectAllContainer = $container ?? this.$element().find(`.${NODE_CONTAINER_CLASS}`).first();
    this._$selectAllItem = renderer_default("<div>").addClass(SELECT_ALL_ITEM_CLASS);
    const isAllSelected = this._dataAdapter.isAllSelected();
    this._createComponent(this._$selectAllItem, check_box_default, {
      value: isAllSelected,
      elementAttr: {
        "aria-label": message_default.format("dxList-selectAll")
      },
      text: selectAllText,
      focusStateEnabled,
      onValueChanged: (event) => {
        this._onSelectAllCheckboxValueChanged(event);
      },
      onInitialized: (event) => {
        const {
          component
        } = event;
        component.registerKeyHandler("enter", (() => {
          const {
            value
          } = component.option();
          component.option("value", !value);
        }));
      }
    });
    this._toggleSelectedClass(this._$selectAllItem, isAllSelected);
    $selectAllContainer.before(this._$selectAllItem);
  }
  _onSelectAllCheckboxValueChanged(args) {
    this._toggleSelectAll(args);
    this._fireSelectAllValueChanged(args.value);
  }
  _toggleSelectAll(args) {
    this._dataAdapter.toggleSelectAll(args.value);
    this._updateItemsUI();
    this._fireSelectionChanged();
  }
  _renderCheckBox($node, node) {
    const $checkbox = renderer_default("<div>").appendTo($node);
    this._createComponent($checkbox, check_box_default, {
      value: null === node || void 0 === node ? void 0 : node.internalFields.selected,
      onValueChanged: (e) => {
        this._changeCheckboxValue(e);
      },
      focusStateEnabled: false,
      elementAttr: {
        "aria-label": message_default.format("CheckState")
      },
      disabled: this._disabledGetter(node)
    });
  }
  _toggleSelectedClass($node, value) {
    $node.toggleClass("dx-state-selected", !!value);
  }
  _toggleNodeDisabledState(node, state) {
    const $node = this._getNodeElement(node);
    const $item = $node.find(`.${ITEM_CLASS}`).eq(0);
    this._dataAdapter.toggleNodeDisabledState(node.internalFields.key, state);
    $item.toggleClass("dx-state-disabled", !!state);
    if (this._showCheckboxes()) {
      const checkbox = this._getCheckBoxInstance($node);
      checkbox.option("disabled", !!state);
    }
  }
  _itemOptionChanged(item, property, value) {
    const node = this._dataAdapter.getNodeByItem(item);
    const {
      disabledExpr
    } = this.option();
    if (node && property === disabledExpr) {
      this._toggleNodeDisabledState(node, Boolean(value));
    }
  }
  _changeCheckboxValue(e) {
    const $node = renderer_default(e.element).closest(`.${NODE_CLASS}`);
    const $item = this._getItem($node);
    const item = this._getItemData($item);
    const node = this._getNodeByElement($item);
    const {
      value
    } = e;
    if (node && node.internalFields.selected === value) {
      return;
    }
    this._updateItemSelection(value, item, e.event);
  }
  _isSingleSelection() {
    const {
      selectionMode
    } = this.option();
    return "single" === selectionMode;
  }
  _isRecursiveSelection() {
    const {
      selectionMode,
      selectNodesRecursive
    } = this.option();
    return !!selectNodesRecursive && "single" !== selectionMode;
  }
  _isLastSelectedBranch(publicNode, selectedNodesKeys, deep) {
    const keyIndex = selectedNodesKeys.indexOf(publicNode.key);
    if (keyIndex >= 0) {
      selectedNodesKeys.splice(keyIndex, 1);
    }
    if (deep) {
      each(publicNode.children, ((_index, childNode) => {
        this._isLastSelectedBranch(childNode, selectedNodesKeys, true);
      }));
    }
    if (publicNode.parent) {
      this._isLastSelectedBranch(publicNode.parent, selectedNodesKeys);
    }
    return 0 === selectedNodesKeys.length;
  }
  _isLastRequired(node) {
    const {
      selectionRequired
    } = this.option();
    const isSingleMode = this._isSingleSelection();
    const selectedNodesKeys = this.getSelectedNodeKeys();
    if (!selectionRequired) {
      return false;
    }
    if (isSingleMode) {
      return 1 === selectedNodesKeys.length;
    }
    return this._isLastSelectedBranch(node.internalFields.publicNode, selectedNodesKeys.slice(), true);
  }
  _updateItemSelection(value, itemElement, event) {
    const node = this._getNode(itemElement);
    if (!node || false === node.visible) {
      return false;
    }
    if (node.internalFields.selected === value) {
      return true;
    }
    if (!value && this._isLastRequired(node)) {
      if (this._showCheckboxes()) {
        const $node = this._getNodeElement(node);
        this._getCheckBoxInstance($node).option("value", true);
      }
      return false;
    }
    if (value && this._isSingleSelection()) {
      const selectedKeys = this.getSelectedNodeKeys();
      each(selectedKeys, ((_index, key) => {
        this._dataAdapter.toggleSelection(key, false);
        this._updateItemsUI();
        this._fireItemSelectionChanged(this._getNode(key));
      }));
    }
    this._dataAdapter.toggleSelection(node.internalFields.key, value);
    const isAllSelected = this._dataAdapter.isAllSelected();
    const needFireSelectAllChanged = this._selectAllEnabled() && this._$selectAllItem.dxCheckBox("instance").option("value") !== isAllSelected;
    this._updateItemsUI();
    this._fireItemSelectionChanged(node, event);
    this._fireSelectionChanged();
    if (needFireSelectAllChanged) {
      this._fireSelectAllValueChanged(isAllSelected);
    }
    return true;
  }
  _fireItemSelectionChanged(node, event) {
    const initiator = event ?? this._findItemElementByItem(node.internalFields.item);
    const handler = event ? this._itemDXEventHandler : this._itemEventHandler;
    handler.call(this, initiator, "onItemSelectionChanged", {
      node: this._dataAdapter.getPublicNode(node),
      itemData: null === node || void 0 === node ? void 0 : node.internalFields.item
    });
  }
  _getCheckBoxInstance($node) {
    const $treeViewItem = this._getItem($node);
    return $treeViewItem.children(".dx-checkbox").dxCheckBox("instance");
  }
  _updateItemsUI() {
    const cache = {};
    each(this._dataAdapter.getData(), ((_index, node) => {
      const $node = this._getNodeElement(node, cache);
      const nodeSelection = node.internalFields.selected;
      if (!$node.length) {
        return;
      }
      this._toggleSelectedClass($node, nodeSelection);
      this.setAria("selected", nodeSelection, $node);
      if (this._showCheckboxes()) {
        var _this$_getCheckBoxIns;
        null === (_this$_getCheckBoxIns = this._getCheckBoxInstance($node)) || void 0 === _this$_getCheckBoxIns || _this$_getCheckBoxIns.option("value", nodeSelection);
      }
    }));
    if (this._selectAllEnabled()) {
      const selectAllCheckbox = this._$selectAllItem.dxCheckBox("instance");
      selectAllCheckbox.option("onValueChanged", void 0);
      selectAllCheckbox.option("value", this._dataAdapter.isAllSelected());
      selectAllCheckbox.option("onValueChanged", this._onSelectAllCheckboxValueChanged.bind(this));
    }
  }
  _updateParentsState(node, $node) {
    if (!$node || !node) {
      return;
    }
    const parentNode = this._dataAdapter.getNodeByKey(node.internalFields.parentKey);
    const $parentNode = renderer_default($node.parents(`.${NODE_CLASS}`)[0]);
    if (this._showCheckboxes()) {
      var _this$_getCheckBoxIns2;
      const parentValue = null === parentNode || void 0 === parentNode ? void 0 : parentNode.internalFields.selected;
      null === (_this$_getCheckBoxIns2 = this._getCheckBoxInstance($parentNode)) || void 0 === _this$_getCheckBoxIns2 || _this$_getCheckBoxIns2.option("value", parentValue);
      this._toggleSelectedClass($parentNode, parentValue);
    }
    const {
      rootValue
    } = this.option();
    if ((null === parentNode || void 0 === parentNode ? void 0 : parentNode.internalFields.parentKey) !== rootValue) {
      this._updateParentsState(parentNode, $parentNode);
    }
  }
  _itemEventHandlerImpl(initiator, action, actionArgs) {
    const $itemElement = renderer_default(initiator).closest(`.${NODE_CLASS}`).children(`.${ITEM_CLASS}`);
    return action(extend(this._extendActionArgs($itemElement), actionArgs));
  }
  _itemContextMenuHandler(e) {
    this._createEventHandler("onItemContextMenu", e);
  }
  _itemHoldHandler(e) {
    this._createEventHandler("onItemHold", e);
  }
  _createEventHandler(eventName, e) {
    const node = this._getNodeByElement(e.currentTarget);
    this._itemDXEventHandler(e, eventName, {
      node: this._dataAdapter.getPublicNode(node)
    });
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemDataKey() {
    return ITEM_DATA_KEY;
  }
  _attachClickEvent() {
    const $itemContainer = this._itemContainer();
    this._detachClickEvent($itemContainer);
    const {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    } = this._getItemClickEventData();
    m_events_engine_default.on($itemContainer, clickEventNamespace, itemSelector, ((e) => {
      if (renderer_default(e.target).hasClass("dx-checkbox-icon") || renderer_default(e.target).hasClass("dx-checkbox")) {
        return;
      }
      this._processItemClick(e, renderer_default(e.currentTarget));
    }));
    m_events_engine_default.on($itemContainer, pointerDownEventNamespace, nodeSelector, ((e) => {
      this._itemPointerHandler(e);
    }));
  }
  _detachClickEvent(itemsContainer) {
    const {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    } = this._getItemClickEventData();
    m_events_engine_default.off(itemsContainer, clickEventNamespace, itemSelector);
    m_events_engine_default.off(itemsContainer, pointerDownEventNamespace, nodeSelector);
  }
  _getItemClickEventData() {
    const itemSelector = `.${this._itemClass()}`;
    const nodeSelector = `.${NODE_CLASS}, .${SELECT_ALL_ITEM_CLASS}`;
    const clickEventNamespace = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const pointerDownEventNamespace = addNamespace(m_pointer_default.down, this.NAME);
    return {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    };
  }
  _itemClick(args) {
    const {
      event,
      itemData
    } = args;
    const target = (null === event || void 0 === event ? void 0 : event.target[0]) || (null === event || void 0 === event ? void 0 : event.target);
    const link = target.getElementsByClassName("dx-item-url")[0];
    if (itemData.url && link) {
      this._clickByLink(link);
    }
  }
  _processItemClick(e, $item) {
    const itemData = this._getItemData($item);
    const node = this._getNodeByElement($item);
    if (!node) {
      return;
    }
    this._itemDXEventHandler(e, "onItemClick", {
      node: this._dataAdapter.getPublicNode(node)
    }, {
      beforeExecute: (e2) => {
        this._itemClick(e2.args[0]);
      }
    });
    const {
      selectByClick
    } = this.option();
    if (selectByClick && !e.isDefaultPrevented()) {
      this._updateItemSelection(!node.internalFields.selected, itemData, e);
    }
  }
  _updateSelectionToFirstItem($items, startIndex) {
    let itemIndex = startIndex;
    while (itemIndex >= 0) {
      const $item = renderer_default($items[itemIndex]);
      this._updateItemSelection(true, $item.find(`.${ITEM_CLASS}`).get(0));
      itemIndex -= 1;
    }
  }
  _updateSelectionToLastItem($items, startIndex) {
    const {
      length
    } = $items;
    let itemIndex = startIndex;
    while (itemIndex < length) {
      const $item = renderer_default($items[itemIndex]);
      this._updateItemSelection(true, $item.find(`.${ITEM_CLASS}`).get(0));
      itemIndex += 1;
    }
  }
  focus() {
    const {
      items = []
    } = this.option();
    if (this._selectAllEnabled() && items.length) {
      m_events_engine_default.trigger(this._$selectAllItem, "focus");
      return;
    }
    super.focus();
  }
  _focusInHandler(e) {
    this._updateFocusState(e, true);
    const isSelectAllItem = renderer_default(e.target).hasClass(SELECT_ALL_ITEM_CLASS);
    if (isSelectAllItem || this.option("focusedElement")) {
      clearTimeout(this._setFocusedItemTimeout);
      this._setFocusedItemTimeout = setTimeout((() => {
        const {
          focusedElement
        } = this.option();
        const element = isSelectAllItem ? getPublicElement(renderer_default(this._$selectAllItem)) : renderer_default(focusedElement);
        this._setFocusedItem(renderer_default(element));
      }));
      return;
    }
    const $activeItem = this._getActiveItem();
    this.option("focusedElement", getPublicElement($activeItem.closest(`.${NODE_CLASS}`)));
  }
  _itemPointerHandler(e) {
    const {
      focusStateEnabled
    } = this.option();
    if (!focusStateEnabled) {
      return;
    }
    const $target = renderer_default(e.target).closest(`.${NODE_CLASS}, .${SELECT_ALL_ITEM_CLASS}`);
    if (!$target.length) {
      return;
    }
    const itemElement = $target.hasClass("dx-state-disabled") ? null : $target;
    this.option("focusedElement", getPublicElement(itemElement));
  }
  _findNonDisabledNodes($nodes) {
    return $nodes.not(`:has(>.${ITEM_CLASS}.dx-state-disabled)`);
  }
  _moveFocus(location, e) {
    const {
      rtlEnabled
    } = this.option();
    const FOCUS_LEFT = rtlEnabled ? "right" : "left";
    const FOCUS_RIGHT = rtlEnabled ? "left" : "right";
    this.$element().find(`.${NODE_CONTAINER_CLASS}`).each(((_index, nodeContainer) => {
      fx_default.stop(nodeContainer, true);
      return true;
    }));
    const $items = this._nodeElements();
    if (!(null !== $items && void 0 !== $items && $items.length)) {
      return;
    }
    switch (location) {
      case "up": {
        const $prevItem = this._prevItem($items);
        this.option("focusedElement", getPublicElement($prevItem));
        const prevItemElement = this._getNodeItemElement($prevItem);
        this.getScrollable().scrollToElement(prevItemElement);
        if (e.shiftKey && this._showCheckboxes()) {
          this._updateItemSelection(true, prevItemElement);
        }
        break;
      }
      case "down": {
        const $nextItem = this._nextItem($items);
        this.option("focusedElement", getPublicElement($nextItem));
        const nextItemElement = this._getNodeItemElement($nextItem);
        this.getScrollable().scrollToElement(nextItemElement);
        if (e.shiftKey && this._showCheckboxes()) {
          this._updateItemSelection(true, nextItemElement);
        }
        break;
      }
      case "first": {
        const $firstItem = $items.first();
        if (e.shiftKey && this._showCheckboxes()) {
          this._updateSelectionToFirstItem($items, $items.index(this._prevItem($items)));
        }
        this.option("focusedElement", getPublicElement($firstItem));
        this.getScrollable().scrollToElement(this._getNodeItemElement($firstItem));
        break;
      }
      case "last": {
        const $lastItem = $items.last();
        if (e.shiftKey && this._showCheckboxes()) {
          this._updateSelectionToLastItem($items, $items.index(this._nextItem($items)));
        }
        this.option("focusedElement", getPublicElement($lastItem));
        this.getScrollable().scrollToElement(this._getNodeItemElement($lastItem));
        break;
      }
      case FOCUS_RIGHT:
        this._expandFocusedContainer();
        break;
      case FOCUS_LEFT:
        this._collapseFocusedContainer();
        break;
      default:
        super._moveFocus(location, e);
    }
  }
  _getNodeItemElement($node) {
    return $node.find(`.${ITEM_CLASS}`).get(0);
  }
  _nodeElements() {
    return this.$element().find(`.${NODE_CLASS}`).not(":hidden");
  }
  _expandFocusedContainer() {
    const {
      focusedElement
    } = this.option();
    const $focusedNode = renderer_default(focusedElement);
    if (!$focusedNode.length || $focusedNode.hasClass(IS_LEAF)) {
      return;
    }
    const $node = $focusedNode.find(`.${NODE_CONTAINER_CLASS}`).eq(0);
    if ($node.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      const $nextItem = this._nextItem(this._findNonDisabledNodes(this._nodeElements()));
      this.option("focusedElement", getPublicElement($nextItem));
      this.getScrollable().scrollToElement(this._getNodeItemElement($nextItem));
      return;
    }
    const node = this._getNodeByElement(this._getItem($focusedNode));
    this._toggleExpandedState(node, true);
  }
  _getClosestNonDisabledNode($node) {
    let currentNode = $node;
    do {
      currentNode = currentNode.parent().closest(`.${NODE_CLASS}`);
    } while (currentNode.length && ($el = currentNode, $el.children(`.${ITEM_CLASS}.dx-state-disabled`).length > 0));
    var $el;
    return currentNode;
  }
  _collapseFocusedContainer() {
    const {
      focusedElement
    } = this.option();
    const $focusedNode = renderer_default(focusedElement);
    if (!$focusedNode.length) {
      return;
    }
    const nodeElement = $focusedNode.find(`.${NODE_CONTAINER_CLASS}`).eq(0);
    if (!$focusedNode.hasClass(IS_LEAF) && nodeElement.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      const node = this._getNodeByElement(this._getItem($focusedNode));
      this._toggleExpandedState(node, false);
    } else {
      const collapsedNode = this._getClosestNonDisabledNode($focusedNode);
      if (collapsedNode.length) {
        this.option("focusedElement", getPublicElement(collapsedNode));
      }
      this.getScrollable().scrollToElement(this._getNodeItemElement(collapsedNode));
    }
  }
  _encodeString(value) {
    return isString(value) ? encodeURI(value) : value;
  }
  _decodeString(value) {
    return isString(value) ? decodeURI(value) : value;
  }
  getScrollable() {
    return this._scrollable;
  }
  updateDimensions() {
    const deferred = Deferred();
    const scrollable = this.getScrollable();
    if (scrollable) {
      scrollable.update().done((() => {
        deferred.resolveWith(this);
      }));
    } else {
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  selectItem(itemElement) {
    return this._updateItemSelection(true, itemElement);
  }
  unselectItem(itemElement) {
    return this._updateItemSelection(false, itemElement);
  }
  expandItem(itemElement) {
    return this._toggleExpandedState(itemElement, true);
  }
  collapseItem(itemElement) {
    return this._toggleExpandedState(itemElement, false);
  }
  getNodes() {
    return this._dataAdapter.getTreeNodes();
  }
  getSelectedNodes() {
    return this.getSelectedNodeKeys().map(((key) => {
      const node = this._dataAdapter.getNodeByKey(key);
      return this._dataAdapter.getPublicNode(node);
    }));
  }
  getSelectedNodeKeys() {
    return this._dataAdapter.getSelectedNodesKeys();
  }
  selectAll() {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox("instance").option("value", true);
    } else {
      this._toggleSelectAll({
        value: true
      });
    }
  }
  unselectAll() {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox("instance").option("value", false);
    } else {
      this._toggleSelectAll({
        value: false
      });
    }
  }
  _allItemsExpandedHandler() {
    this._skipContentReadyAndItemExpanded = false;
    this._fireContentReadyAction();
  }
  expandAll() {
    const nodes = this._dataAdapter.getData();
    const expandingPromises = [];
    this._skipContentReadyAndItemExpanded = true;
    nodes.forEach(((node) => expandingPromises.push(this._toggleExpandedState((null === node || void 0 === node ? void 0 : node.internalFields.key) ?? null, true))));
    Promise.allSettled(expandingPromises).then((() => {
      var _this$_allItemsExpand;
      return null === (_this$_allItemsExpand = this._allItemsExpandedHandler) || void 0 === _this$_allItemsExpand ? void 0 : _this$_allItemsExpand.call(this);
    }));
  }
  collapseAll() {
    each(this._dataAdapter.getExpandedNodesKeys(), ((_index, key) => {
      this._toggleExpandedState(key, false);
    }));
  }
  scrollToItem(keyOrItemOrElement) {
    const node = this._getNode(keyOrItemOrElement);
    if (!node) {
      return Deferred().reject().promise();
    }
    const nodeKeysToExpand = [];
    let parentNode = node.internalFields.publicNode.parent;
    while (null != parentNode) {
      if (!parentNode.expanded) {
        nodeKeysToExpand.push(parentNode.key);
      }
      parentNode = parentNode.parent;
    }
    const scrollCallback = Deferred();
    this._expandNodes(nodeKeysToExpand.reverse()).always((() => {
      const $element = this._getNodeElement(node);
      if (null !== $element && void 0 !== $element && $element.length) {
        this.scrollToElementTopLeft($element[0]);
        scrollCallback.resolve();
      } else {
        scrollCallback.reject();
      }
    }));
    return scrollCallback.promise();
  }
  scrollToElementTopLeft(targetElement) {
    const scrollable = this.getScrollable();
    const {
      scrollDirection,
      rtlEnabled
    } = this.option();
    const targetLocation = {
      top: 0,
      left: 0
    };
    const relativeOffset = getRelativeOffset(SCROLLABLE_CONTENT_CLASS, targetElement);
    if (scrollDirection !== DIRECTION_VERTICAL) {
      const containerElement = renderer_default(scrollable.container()).get(0);
      targetLocation.left = rtlEnabled ? relativeOffset.left + targetElement.offsetWidth - containerElement.clientWidth : relativeOffset.left;
    }
    if (scrollDirection !== DIRECTION_HORIZONTAL) {
      targetLocation.top = relativeOffset.top;
    }
    scrollable.scrollTo(targetLocation);
  }
  _expandNodes(keysToExpand) {
    if (!keysToExpand || 0 === keysToExpand.length) {
      return Deferred().resolve().promise();
    }
    const resultCallback = Deferred();
    const callbacksByNodes = keysToExpand.map(((key) => this.expandItem(key)));
    when.apply(renderer_default, callbacksByNodes).done((() => resultCallback.resolve())).fail((() => resultCallback.reject()));
    return resultCallback.promise();
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._setFocusedItemTimeout);
    this._allItemsExpandedHandler = null;
  }
};
var tree_view_base_default = TreeViewBase;

// node_modules/devextreme/esm/__internal/ui/tree_view/tree_view.search.js
search_box_controller_default.setEditorClass(m_text_box_default);
var TreeViewSearch = class extends tree_view_base_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      searchValue: "",
      searchEnabled: false,
      searchEditorOptions: {}
    });
  }
  _getSearchBoxControllerOptions() {
    const {
      tabIndex,
      searchEnabled,
      searchValue,
      searchTimeout,
      searchEditorOptions
    } = this.option();
    return {
      tabIndex,
      searchEnabled,
      searchValue,
      searchTimeout,
      searchEditorOptions,
      onValueChanged: (value) => {
        this.option("searchValue", value);
      }
    };
  }
  _init() {
    this._searchBoxController = new search_box_controller_default();
    super._init();
  }
  _initMarkup() {
    this._searchBoxController.render("dx-treeview", this.$element(), this._getSearchBoxControllerOptions(), this._createComponent.bind(this));
    super._initMarkup();
  }
  _getAriaTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer(true);
    }
    return super._getAriaTarget();
  }
  getSearchBoxController() {
    return this._searchBoxController;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "searchEnabled":
      case "searchEditorOptions":
        this._invalidate();
        break;
      case "searchValue":
        if (this._showCheckboxes() && this._isRecursiveSelection()) {
          this._removeSelection();
        }
        this._initDataAdapter();
        this._updateSearch();
        this._repaintContainer();
        this.option("focusedElement", null);
        break;
      case "searchExpr":
        this._initDataAdapter();
        this.repaint();
        break;
      case "searchMode": {
        const {
          expandNodesRecursive
        } = this.option();
        if (expandNodesRecursive) {
          this._updateDataAdapter();
        } else {
          this._initDataAdapter();
        }
        this.repaint();
        break;
      }
      case "searchTimeout":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _updateDataAdapter() {
    this._setOptionWithoutOptionChange("expandNodesRecursive", false);
    this._initDataAdapter();
    this._setOptionWithoutOptionChange("expandNodesRecursive", true);
  }
  _getDataAdapterOptions() {
    const {
      searchValue = "",
      searchMode = "contains",
      searchExpr
    } = this.option();
    return _extends({}, super._getDataAdapterOptions(), {
      searchValue,
      searchMode,
      searchExpr
    });
  }
  _getNodeContainer() {
    return this.$element().find(".dx-treeview-node-container").first();
  }
  _updateSearch() {
    var _this$_searchBoxContr;
    const searchBoxControllerOptions = this._getSearchBoxControllerOptions();
    null === (_this$_searchBoxContr = this._searchBoxController) || void 0 === _this$_searchBoxContr || _this$_searchBoxContr.updateEditorOptions(searchBoxControllerOptions);
  }
  _repaintContainer() {
    const $container = this._getNodeContainer();
    let rootNodes = [];
    if ($container.length) {
      $container.empty();
      rootNodes = this._dataAdapter.getRootNodes();
      this._renderEmptyMessage(rootNodes);
      this._renderNodes(rootNodes, $container);
      this._fireContentReadyAction();
    }
  }
  _updateFocusState(e, isFocused) {
    if (this.option("searchEnabled")) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    super._updateFocusState(e, isFocused);
  }
  _focusTarget() {
    const {
      searchEnabled
    } = this.option();
    return this._itemContainer(searchEnabled);
  }
  focus() {
    if (!this.option("focusedElement") && this.option("searchEnabled")) {
      var _this$_searchBoxContr2;
      null === (_this$_searchBoxContr2 = this._searchBoxController) || void 0 === _this$_searchBoxContr2 || _this$_searchBoxContr2.focus();
      return;
    }
    super.focus();
  }
  _cleanItemContainer() {
    var _this$_searchBoxContr3;
    null === (_this$_searchBoxContr3 = this._searchBoxController) || void 0 === _this$_searchBoxContr3 || _this$_searchBoxContr3.remove();
    this.$element().empty();
  }
  _itemContainer(isSearchMode, selectAllEnabled) {
    const isSelectAllEnabled = selectAllEnabled ?? this._selectAllEnabled();
    const {
      items = []
    } = this.option();
    if (isSelectAllEnabled && items.length) {
      return this._getNodeContainer();
    }
    if (this._scrollable && isSearchMode) {
      return renderer_default(this._scrollable.content());
    }
    return super._itemContainer();
  }
  _addWidgetClass() {
    this.$element().addClass(this._widgetClass());
  }
  _cleanAria() {
    const $element = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, $element);
    $element.attr("tabIndex", null);
  }
  _refresh() {
    var _this$_searchBoxContr4;
    null === (_this$_searchBoxContr4 = this._searchBoxController) || void 0 === _this$_searchBoxContr4 || _this$_searchBoxContr4.resolveValueChange();
    super._refresh();
  }
  _clean() {
    this._cleanAria();
    super._clean();
  }
  dispose() {
    var _this$_searchBoxContr5;
    null === (_this$_searchBoxContr5 = this._searchBoxController) || void 0 === _this$_searchBoxContr5 || _this$_searchBoxContr5.dispose();
    super.dispose();
  }
};
component_registrator_default("dxTreeView", TreeViewSearch);
var tree_view_search_default = TreeViewSearch;

// node_modules/devextreme/esm/ui/tree_view.js
var tree_view_default = tree_view_search_default;

export {
  tree_view_search_default,
  tree_view_default
};
//# sourceMappingURL=chunk-DYGKOJFJ.js.map
