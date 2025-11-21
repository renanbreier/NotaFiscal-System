import {
  ListBase,
  PRIVATE_KEY_FIELD
} from "./chunk-FF43QURI.js";
import {
  getOperationBySearchMode,
  search_box_controller_default
} from "./chunk-OU6GQY4H.js";
import {
  NOT_EXISTING_INDEX,
  collection_widget_edit_strategy_plain_default,
  indexExists,
  m_query_default,
  m_store_helper_default
} from "./chunk-LVWRVNT2.js";
import {
  message_default
} from "./chunk-7AOZESUR.js";
import {
  component_registrator_default,
  getPublicElement,
  isTouchEvent
} from "./chunk-ICLEXNO5.js";
import {
  ui_errors_default
} from "./chunk-DONQLAZQ.js";
import {
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  _extends,
  each,
  isFunction,
  isNumeric,
  isObject,
  noop
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator_registry.js
var registry = {};
function register(option, type, decoratorClass) {
  if (!registry[option]) {
    registry[option] = {};
  }
  registry[option][type] = decoratorClass;
}

// node_modules/devextreme/esm/__internal/ui/list/list.edit.provider.js
var editOptionsRegistry = [];
var registerOption = (_ref) => {
  let {
    enabled,
    decoratorType,
    decoratorSubType
  } = _ref;
  editOptionsRegistry.push({
    enabled,
    decoratorType,
    decoratorSubType
  });
};
registerOption({
  enabled() {
    const {
      menuItems
    } = this.option();
    return Boolean(menuItems.length);
  },
  decoratorType: () => "menu",
  decoratorSubType() {
    const {
      menuMode
    } = this.option();
    return menuMode;
  }
});
registerOption({
  enabled() {
    const {
      menuItems,
      allowItemDeleting
    } = this.option();
    return Boolean(!menuItems.length && allowItemDeleting);
  },
  decoratorType() {
    const {
      itemDeleteMode
    } = this.option();
    return ["toggle", "slideButton", "swipe", "static"].includes(itemDeleteMode) ? "delete" : "menu";
  },
  decoratorSubType() {
    let {
      itemDeleteMode
    } = this.option();
    if ("slideItem" === itemDeleteMode) {
      itemDeleteMode = "slide";
    }
    return itemDeleteMode;
  }
});
registerOption({
  enabled() {
    const {
      selectionMode,
      showSelectionControls
    } = this.option();
    return Boolean("none" !== selectionMode && showSelectionControls);
  },
  decoratorType: () => "selection",
  decoratorSubType: () => "default"
});
registerOption({
  enabled() {
    const {
      itemDragging
    } = this.option();
    return Boolean(itemDragging.allowReordering || itemDragging.allowDropInsideItem || itemDragging.group);
  },
  decoratorType: () => "reorder",
  decoratorSubType: () => "default"
});
var EditProvider = class {
  constructor(list) {
    this._list = list;
    this._decorators = [];
    this._fetchRequiredDecorators();
  }
  dispose() {
    var _this$_decorators;
    if (null !== (_this$_decorators = this._decorators) && void 0 !== _this$_decorators && _this$_decorators.length) {
      each(this._decorators, ((_index, decorator) => {
        decorator.dispose();
      }));
    }
  }
  _fetchRequiredDecorators() {
    each(editOptionsRegistry, ((_index, option) => {
      const optionEnabled = option.enabled.call(this._list);
      if (optionEnabled) {
        const decoratorType = option.decoratorType.call(this._list);
        const decoratorSubType = option.decoratorSubType.call(this._list);
        const decorator = this._createDecorator(decoratorType, decoratorSubType);
        this._decorators.push(decorator);
      }
    }));
  }
  _createDecorator(type, subType) {
    const CreatedDecoratorClass = this._findDecorator(type, subType);
    return new CreatedDecoratorClass(this._list);
  }
  _findDecorator(type, subType) {
    var _registry$type;
    const foundDecorator = null === (_registry$type = registry[type]) || void 0 === _registry$type ? void 0 : _registry$type[subType];
    if (!foundDecorator) {
      throw ui_errors_default.Error("E1012", type, subType);
    }
    return foundDecorator;
  }
  modifyItemElement(args) {
    const $itemElement = renderer_default(args.itemElement);
    const config = {
      $itemElement,
      $container: renderer_default()
    };
    this._prependBeforeBags($itemElement, config);
    this._appendAfterBags($itemElement, config);
    this._applyDecorators("modifyElement", config);
  }
  afterItemsRendered() {
    this._applyDecorators("afterRender");
  }
  _prependBeforeBags($itemElement, config) {
    const $beforeBags = this._collectDecoratorsMarkup("beforeBag", config, "dx-list-item-before-bag");
    $itemElement.prepend($beforeBags);
  }
  _appendAfterBags($itemElement, config) {
    const $afterBags = this._collectDecoratorsMarkup("afterBag", config, "dx-list-item-after-bag");
    $itemElement.append($afterBags);
  }
  _collectDecoratorsMarkup(method, config, containerClass) {
    var _this$_decorators2;
    const $collector = renderer_default("<div>");
    null === (_this$_decorators2 = this._decorators) || void 0 === _this$_decorators2 || _this$_decorators2.forEach(((decorator) => {
      if (isFunction(decorator[method])) {
        const $container = renderer_default("<div>").addClass(containerClass);
        decorator[method](_extends({}, config, {
          $container
        }));
        if ($container.children().length) {
          $collector.append($container);
        }
      }
    }));
    return $collector.children();
  }
  _applyDecorators(method, config) {
    var _this$_decorators3;
    null === (_this$_decorators3 = this._decorators) || void 0 === _this$_decorators3 || _this$_decorators3.forEach(((decorator) => {
      decorator[method](config);
    }));
  }
  _handlerExists(name) {
    if (!this._decorators) {
      return false;
    }
    const decorators = this._decorators;
    const {
      length
    } = decorators;
    for (let i = 0; i < length; i += 1) {
      if (decorators[i][name] !== noop) {
        return true;
      }
    }
    return false;
  }
  _eventHandler(name) {
    if (!this._decorators) {
      return false;
    }
    let response = false;
    const decorators = this._decorators;
    const {
      length
    } = decorators;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    for (let i = 0; i < length; i += 1) {
      response = decorators[i][name](...args);
      if (response) {
        break;
      }
    }
    return response;
  }
  handleClick($itemElement, e) {
    return this._eventHandler("handleClick", $itemElement, e);
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    return this._eventHandler("handleKeyboardEvents", currentFocusedIndex, moveFocusUp);
  }
  handleEnterPressing(e) {
    return this._eventHandler("handleEnterPressing", e);
  }
  contextMenuHandlerExists() {
    return this._handlerExists("handleContextMenu");
  }
  handleContextMenu($itemElement, e) {
    return this._eventHandler("handleContextMenu", $itemElement, e);
  }
  getExcludedItemSelectors() {
    const excludedSelectors = [];
    this._applyDecorators("getExcludedSelectors", excludedSelectors);
    return excludedSelectors.join(",");
  }
};
var list_edit_provider_default = EditProvider;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.strategy.grouped.js
var combineIndex = (index) => (index.group << 20) + index.item;
var splitIndex = (combinedIndex) => ({
  group: combinedIndex >> 20,
  item: 1048575 & combinedIndex
});
var GroupedEditStrategy = class extends collection_widget_edit_strategy_plain_default {
  _groupElements() {
    return this._collectionWidget._itemContainer().find(".dx-list-group");
  }
  _groupItemElements($group) {
    return $group.find(".dx-list-item");
  }
  getIndexByItemData(itemData) {
    const groups = this._getItems();
    let index = NOT_EXISTING_INDEX;
    if (!itemData) {
      return NOT_EXISTING_INDEX;
    }
    const {
      items = []
    } = itemData;
    if (items.length) {
      itemData = items[0];
    }
    each(groups, ((groupIndex, group) => {
      if (!group.items) {
        return false;
      }
      each(group.items, ((itemIndex, item) => {
        if (item !== itemData) {
          return true;
        }
        index = {
          group: groupIndex,
          item: itemIndex
        };
        return false;
      }));
      return !indexExists(index);
    }));
    return index;
  }
  _isIndexNumeric(index) {
    return isNumeric(index);
  }
  getItemDataByIndex(index) {
    const groups = this._getItems();
    if (this._isIndexNumeric(index)) {
      return this.itemsGetter()[index];
    }
    const groupIndex = index.group;
    const group = groups[groupIndex];
    const {
      items = []
    } = group;
    return index && items[index.item] || null;
  }
  itemsGetter() {
    let resultItems = [];
    const items = this._getItems();
    items.forEach(((groupedItem) => {
      if (groupedItem.items) {
        resultItems = resultItems.concat(groupedItem.items);
      } else {
        resultItems.push(groupedItem);
      }
    }));
    return resultItems;
  }
  deleteItemAtIndex(index) {
    const indices = splitIndex(index);
    const {
      items = []
    } = this._collectionWidget.option();
    const itemGroup = items[indices.group].items;
    null === itemGroup || void 0 === itemGroup || itemGroup.splice(indices.item, 1);
  }
  getKeysByItems(items) {
    const plainItems = items.reduce(((counter, item) => {
      if (null !== item && void 0 !== item && item.items) {
        return counter.concat(item.items);
      }
      counter.push(item);
      return counter;
    }), []);
    return plainItems.map(((plainItem) => this._collectionWidget.keyOf(plainItem)));
  }
  getIndexByKey(key, items) {
    const {
      items: userItems
    } = this._collectionWidget.option();
    const groups = items ?? userItems;
    let index = -1;
    each(groups, ((groupIndex, group) => {
      if (!group.items) {
        return;
      }
      each(group.items, ((itemIndex, item) => {
        const itemKey = this._collectionWidget.keyOf(item);
        if (this._equalKeys(itemKey, key)) {
          index = {
            group: groupIndex,
            item: itemIndex
          };
          return false;
        }
        return;
      }));
      if (-1 !== index) {
        return false;
      }
      return;
    }));
    return "object" === typeof index ? combineIndex(index) : index;
  }
  _getGroups(items) {
    const dataController = this._collectionWidget._dataController;
    const group = dataController.group();
    if (group) {
      return m_store_helper_default.queryByOptions(m_query_default(items), {
        group
      }).toArray();
    }
    const {
      items: userItems = []
    } = this._collectionWidget.option();
    return userItems;
  }
  getItemsByKeys(keys, items) {
    const result = [];
    const groups = this._getGroups(items);
    const groupItemByKeyMap = {};
    const getItemMeta = (key) => {
      const index = this.getIndexByKey(key, groups);
      const splitIdx = splitIndex(index);
      const group = splitIdx && groups[splitIdx.group];
      if (!group) {
        return;
      }
      return {
        groupKey: String(group.key),
        item: group.items[splitIdx.item]
      };
    };
    each(keys, ((_index, key) => {
      var _selectedGroup$items;
      const itemMeta = getItemMeta(key);
      if (!itemMeta) {
        return;
      }
      const {
        groupKey,
        item
      } = itemMeta;
      let selectedGroup = groupItemByKeyMap[groupKey];
      if (!selectedGroup) {
        selectedGroup = {
          key: groupKey,
          items: []
        };
        groupItemByKeyMap[groupKey] = selectedGroup;
        result.push(selectedGroup);
      }
      null === (_selectedGroup$items = selectedGroup.items) || void 0 === _selectedGroup$items || _selectedGroup$items.push(item);
    }));
    return result;
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const {
      items = []
    } = this._collectionWidget.option();
    const movingIndices = splitIndex(movingIndex);
    const destinationIndices = splitIndex(destinationIndex);
    const movingItemGroup = items[movingIndices.group].items;
    const destinationItemGroup = items[destinationIndices.group].items;
    if (movingItemGroup) {
      const movedItemData = null === movingItemGroup || void 0 === movingItemGroup ? void 0 : movingItemGroup[movingIndices.item];
      null === movingItemGroup || void 0 === movingItemGroup || movingItemGroup.splice(movingIndices.item, 1);
      null === destinationItemGroup || void 0 === destinationItemGroup || destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
    }
  }
  _isItemIndex(index) {
    return Boolean(index && isNumeric(index.group) && isNumeric(index.item));
  }
  _getNormalizedItemIndex(itemElement) {
    const $item = renderer_default(itemElement);
    const $group = $item.closest(".dx-list-group");
    if (!$group.length) {
      return -1;
    }
    return combineIndex({
      group: this._groupElements().index($group),
      item: this._groupItemElements($group).index($item)
    });
  }
  _normalizeItemIndex(index) {
    return combineIndex(index);
  }
  _denormalizeItemIndex(index) {
    return splitIndex(index);
  }
  _getItemByNormalizedIndex(index) {
    const indices = splitIndex(index);
    const $group = this._groupElements().eq(indices.group);
    return this._groupItemElements($group).eq(indices.item);
  }
  _itemsFromSameParent(firstIndex, secondIndex) {
    return splitIndex(firstIndex).group === splitIndex(secondIndex).group;
  }
};
var list_edit_strategy_grouped_default = GroupedEditStrategy;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.js
var ListEdit = class extends ListBase {
  _supportedKeys() {
    const parent = super._supportedKeys();
    const moveFocusedItem = (e, moveUp) => {
      const {
        focusedElement,
        itemDragging,
        grouped
      } = this.option();
      const editStrategy = this._editStrategy;
      const focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
      const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
      if (isLastIndexFocused && this._dataController.isLoading()) {
        return;
      }
      if (e.shiftKey && null !== itemDragging && void 0 !== itemDragging && itemDragging.allowReordering) {
        const nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
        const $nextItem = editStrategy.getItemElement(nextItemIndex);
        const isMoveFromGroup = grouped && renderer_default(focusedElement).parent().get(0) !== $nextItem.parent().get(0);
        if (!isMoveFromGroup) {
          this.reorderItem(renderer_default(focusedElement).get(0), $nextItem.get(0));
          this.scrollToItem(renderer_default(focusedElement));
        }
        e.preventDefault();
      } else {
        const editProvider = this._editProvider;
        const isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
        if (!isInternalMoving) {
          if (moveUp) {
            parent.upArrow(e);
          } else {
            parent.downArrow(e);
          }
        }
      }
    };
    return _extends({}, parent, {
      del: (e) => {
        const {
          allowItemDeleting,
          focusedElement
        } = this.option();
        if (allowItemDeleting && focusedElement) {
          e.preventDefault();
          this.deleteItem(focusedElement);
        }
      },
      upArrow: (e) => moveFocusedItem(e, true),
      downArrow: (e) => moveFocusedItem(e),
      enter: (e) => {
        if (!this._editProvider.handleEnterPressing(e)) {
          parent.enter.apply(this, [e]);
        }
      },
      space: (e) => {
        if (!this._editProvider.handleEnterPressing(e)) {
          parent.space.apply(this, [e]);
        }
      }
    });
  }
  _updateSelection() {
    this._editProvider.afterItemsRendered();
    super._updateSelection();
  }
  _getLastItemIndex() {
    return this._itemElements().length - 1;
  }
  _refreshItemElements() {
    super._refreshItemElements();
    const excludedSelectors = this._editProvider.getExcludedItemSelectors();
    if (excludedSelectors.length) {
      this._itemElementsCache = this._itemElementsCache.not(excludedSelectors);
    }
  }
  _isItemStrictEquals(item1, item2) {
    const privateKey = null === item1 || void 0 === item1 ? void 0 : item1[PRIVATE_KEY_FIELD];
    if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
      return false;
    }
    return super._isItemStrictEquals(item1, item2);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showSelectionControls: false,
      selectionMode: "none",
      selectAllMode: "page",
      onSelectAllValueChanged: null,
      selectAllText: message_default.format("dxList-selectAll"),
      menuItems: [],
      menuMode: "context",
      allowItemDeleting: false,
      itemDeleteMode: "static",
      itemDragging: {}
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: (device) => "ios" === device.platform,
      options: {
        menuMode: "slide",
        itemDeleteMode: "slideItem"
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        itemDeleteMode: "swipe"
      }
    }]);
  }
  _init() {
    super._init();
    this._initEditProvider();
  }
  _initDataSource() {
    super._initDataSource();
    if (!this._isPageSelectAll()) {
      var _this$_dataSource;
      null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource || _this$_dataSource.requireTotalCount(true);
    }
  }
  _isPageSelectAll() {
    const {
      selectAllMode
    } = this.option();
    return "page" === selectAllMode;
  }
  _initEditProvider() {
    this._editProvider = new list_edit_provider_default(this);
  }
  _disposeEditProvider() {
    if (this._editProvider) {
      this._editProvider.dispose();
    }
  }
  _refreshEditProvider() {
    this._disposeEditProvider();
    this._initEditProvider();
  }
  _initEditStrategy() {
    const {
      grouped
    } = this.option();
    if (grouped) {
      this._editStrategy = new list_edit_strategy_grouped_default(this);
    } else {
      super._initEditStrategy();
    }
  }
  _initMarkup() {
    this._refreshEditProvider();
    super._initMarkup();
  }
  _renderItems(items) {
    super._renderItems(items);
    this._editProvider.afterItemsRendered();
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const {
      showSelectionControls,
      selectionMode
    } = this.option();
    const $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    if (showSelectionControls && "none" !== selectionMode) {
      this._updateItemAriaLabel($itemFrame, itemData);
    }
    return $itemFrame;
  }
  _updateItemAriaLabel($itemFrame, itemData) {
    var _this$_displayGetter;
    const label = (null === (_this$_displayGetter = this._displayGetter) || void 0 === _this$_displayGetter ? void 0 : _this$_displayGetter.call(this, itemData)) ?? (null === itemData || void 0 === itemData ? void 0 : itemData.text) ?? itemData;
    this.setAria("label", isObject(label) ? message_default.format("dxList-listAriaLabel-itemContent") : label, $itemFrame);
  }
  _selectedItemClass() {
    return "dx-list-item-selected";
  }
  _itemResponseWaitClass() {
    return "dx-list-item-response-wait";
  }
  _itemClickHandler(e, args, config) {
    const $itemElement = renderer_default(e.currentTarget);
    if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
      return;
    }
    const handledByEditProvider = this._editProvider.handleClick($itemElement, e);
    if (handledByEditProvider) {
      return;
    }
    this._saveSelectionChangeEvent(e);
    super._itemClickHandler(e, args, config);
  }
  _shouldFireContextMenuEvent() {
    return super._shouldFireContextMenuEvent() || this._editProvider.contextMenuHandlerExists();
  }
  _itemHoldHandler(e) {
    const $itemElement = renderer_default(e.currentTarget);
    if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
      return;
    }
    const handledByEditProvider = isTouchEvent(e) && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.handledByEditProvider = true;
      return;
    }
    super._itemHoldHandler(e);
  }
  _itemContextMenuHandler(e) {
    const $itemElement = renderer_default(e.currentTarget);
    if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
      return;
    }
    const handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.preventDefault();
      return;
    }
    super._itemContextMenuHandler(e);
  }
  _postprocessRenderItem(args) {
    super._postprocessRenderItem(args);
    this._editProvider.modifyItemElement(args);
  }
  _clean() {
    this._disposeEditProvider();
    super._clean();
  }
  focusListItem(index) {
    const $item = this._editStrategy.getItemElement(index);
    this.option("focusedElement", getPublicElement($item));
    this.focus();
    this.scrollToItem($item);
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    if (isNumeric(selectedIndex) || !selectedIndex) {
      return selectedIndex;
    }
    const $item = this._editStrategy.getItemElement(selectedIndex);
    return this.getFlatIndexByItemElement($item);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "selectAllMode":
        this._initDataSource();
        this._dataController.pageIndex(0);
        this._dataController.load();
        break;
      case "grouped":
        this._clearSelectedItems();
        this._initEditStrategy();
        super._optionChanged(args);
        break;
      case "showSelectionControls":
      case "menuItems":
      case "menuMode":
      case "allowItemDeleting":
      case "itemDeleteMode":
      case "itemDragging":
      case "selectAllText":
        this._invalidate();
        break;
      case "onSelectAllValueChanged":
        break;
      default:
        super._optionChanged(args);
    }
  }
  selectAll() {
    return this._selection.selectAll(this._isPageSelectAll());
  }
  unselectAll() {
    return this._selection.deselectAll(this._isPageSelectAll());
  }
  isSelectAll() {
    return this._selection.getSelectAllState(this._isPageSelectAll());
  }
  getFlatIndexByItemElement(itemElement) {
    return this._itemElements().index(itemElement);
  }
  getItemElementByFlatIndex(flatIndex) {
    const $itemElements = this._itemElements();
    if (flatIndex < 0 || flatIndex >= $itemElements.length) {
      return renderer_default();
    }
    return $itemElements.eq(flatIndex);
  }
  getItemByIndex(index) {
    return this._editStrategy.getItemDataByIndex(index);
  }
  deleteItem(itemElement) {
    const editStrategy = this._editStrategy;
    const deletingElementIndex = editStrategy.getNormalizedIndex(itemElement);
    const {
      focusedElement,
      focusStateEnabled
    } = this.option();
    const focusedItemIndex = focusedElement ? editStrategy.getNormalizedIndex(focusedElement) : deletingElementIndex;
    const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
    const nextFocusedItem = isLastIndexFocused || deletingElementIndex < focusedItemIndex ? focusedItemIndex - 1 : focusedItemIndex;
    const promise = super.deleteItem(itemElement);
    return promise.done((() => {
      if (focusStateEnabled) {
        this.focusListItem(nextFocusedItem);
      }
    }));
  }
};
var list_edit_default = ListEdit;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.search.js
var ListSearch = class extends list_edit_default {
  _getCombinedFilter() {
    const dataController = this._dataController;
    const storeLoadOptions = {
      filter: dataController.filter()
    };
    dataController.addSearchFilter(storeLoadOptions);
    const {
      filter
    } = storeLoadOptions;
    return filter;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      searchMode: "",
      searchExpr: null,
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
  _initDataSource() {
    const {
      searchValue,
      searchExpr,
      searchMode
    } = this.option();
    super._initDataSource();
    const dataController = this._dataController;
    if (null !== searchValue && void 0 !== searchValue && searchValue.length) {
      dataController.searchValue(searchValue);
    }
    if (null !== searchMode && void 0 !== searchMode && searchMode.length) {
      dataController.searchOperation(getOperationBySearchMode(searchMode));
    }
    if (searchExpr) {
      dataController.searchExpr(searchExpr);
    }
  }
  _init() {
    this._searchBoxController = new search_box_controller_default();
    super._init();
  }
  _initMarkup() {
    this._searchBoxController.render("dx-list", this.$element(), this._getSearchBoxControllerOptions(), this._createComponent.bind(this));
    super._initMarkup();
  }
  _getAriaTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer();
    }
    return super._getAriaTarget();
  }
  focus() {
    const {
      focusedElement,
      searchEnabled
    } = this.option();
    if (!focusedElement && searchEnabled) {
      var _this$_searchBoxContr;
      null === (_this$_searchBoxContr = this._searchBoxController) || void 0 === _this$_searchBoxContr || _this$_searchBoxContr.focus();
      return;
    }
    super.focus();
  }
  _focusTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer();
    }
    return super._focusTarget();
  }
  _updateFocusState(e, isFocused) {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    super._updateFocusState(e, isFocused);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "searchEnabled":
      case "searchEditorOptions":
        this._invalidate();
        break;
      case "searchExpr":
      case "searchMode":
      case "searchValue":
        if (!this._dataSource) {
          ui_errors_default.log("W1009");
          return;
        }
        if ("searchMode" === name) {
          this._dataSource.searchOperation(getOperationBySearchMode(value));
        } else {
          this._dataSource[name](value);
        }
        this._dataSource.load();
        break;
      case "searchTimeout":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _refresh() {
    var _this$_searchBoxContr2;
    null === (_this$_searchBoxContr2 = this._searchBoxController) || void 0 === _this$_searchBoxContr2 || _this$_searchBoxContr2.resolveValueChange();
    super._refresh();
  }
  _cleanAria() {
    const $element = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, $element);
    $element.attr("tabIndex", null);
  }
  _clean() {
    this._cleanAria();
    super._clean();
  }
  _dispose() {
    var _this$_searchBoxContr3;
    null === (_this$_searchBoxContr3 = this._searchBoxController) || void 0 === _this$_searchBoxContr3 || _this$_searchBoxContr3.dispose();
    super._dispose();
  }
};
component_registrator_default("dxList", ListSearch);
var list_edit_search_default = ListSearch;

export {
  register,
  list_edit_default,
  list_edit_search_default
};
//# sourceMappingURL=chunk-NGYFL4CQ.js.map
