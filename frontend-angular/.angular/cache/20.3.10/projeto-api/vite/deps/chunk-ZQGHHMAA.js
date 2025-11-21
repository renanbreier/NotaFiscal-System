import {
  hierarchical_collection_widget_default
} from "./chunk-4SHJMC7Q.js";
import {
  SCROLLABLE_CLASS,
  scrollable_default
} from "./chunk-UAVVJIMK.js";
import {
  collection_widget_edit_strategy_plain_default,
  item_default,
  m_hold_default,
  name
} from "./chunk-LVWRVNT2.js";
import {
  render2 as render
} from "./chunk-UBAWJAV5.js";
import {
  current,
  isGeneric
} from "./chunk-2D4FZXPO.js";
import {
  overlay_default
} from "./chunk-VA6S6EFE.js";
import {
  addNamespace,
  component_registrator_default,
  contains,
  fx_default,
  getPublicElement,
  position_default
} from "./chunk-ICLEXNO5.js";
import {
  devices_default
} from "./chunk-DONQLAZQ.js";
import {
  getOuterHeight,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  asyncNoop,
  dom_adapter_default,
  each,
  extend,
  getWindow,
  guid_default2 as guid_default,
  hasWindow,
  isDefined,
  isFunction,
  isObject,
  isPlainObject,
  isRenderer,
  isString,
  map,
  noop
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/ui/context_menu/menu_base.edit.strategy.js
var MenuBaseEditStrategy = class _MenuBaseEditStrategy extends collection_widget_edit_strategy_plain_default {
  _getPlainItems() {
    const items = this._getItems();
    const result = map(items, (function getMenuItems(item) {
      return item.items ? [item].concat(map(item.items, getMenuItems)) : item;
    }));
    return result.flat();
  }
  static _stringifyItem(item) {
    return JSON.stringify(item, ((key, value) => {
      if ("template" === key) {
        return _MenuBaseEditStrategy._getTemplateString(value);
      }
      return value;
    }));
  }
  static _getTemplateString(template) {
    if ("object" === typeof template && null !== template) {
      return renderer_default(template).text();
    }
    return String(template);
  }
};
var menu_base_edit_strategy_default = MenuBaseEditStrategy;

// node_modules/devextreme/esm/__internal/ui/context_menu/menu_base.js
var ITEM_CLASS = "dx-menu-item";
var DX_ITEM_CONTENT_CLASS = `${ITEM_CLASS}-content`;
var DX_MENU_SELECTED_ITEM_CLASS = `${ITEM_CLASS}-selected`;
var DX_MENU_ITEM_WRAPPER_CLASS = `${ITEM_CLASS}-wrapper`;
var DX_MENU_ITEM_EXPANDED_CLASS = `${ITEM_CLASS}-expanded`;
var DX_ITEM_HAS_TEXT = `${ITEM_CLASS}-has-text`;
var DX_ITEM_HAS_ICON = `${ITEM_CLASS}-has-icon`;
var DX_ITEM_HAS_SUBMENU = `${ITEM_CLASS}-has-submenu`;
var DX_MENU_ITEM_POPOUT_CLASS = `${ITEM_CLASS}-popout`;
var DX_MENU_ITEM_POPOUT_CONTAINER_CLASS = `${DX_MENU_ITEM_POPOUT_CLASS}-container`;
var DX_MENU_ITEM_CAPTION_CLASS = `${ITEM_CLASS}-text`;
var DEFAULT_DELAY = {
  show: 50,
  hide: 300
};
var DX_MENU_ITEM_CAPTION_URL_CLASS = `${DX_MENU_ITEM_CAPTION_CLASS}-with-url`;
var MenuBase = class extends hierarchical_collection_widget_default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: [],
      cssClass: "",
      activeStateEnabled: true,
      showSubmenuMode: {
        name: "onHover",
        delay: {
          show: 50,
          hide: 300
        }
      },
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1,
          duration: 100
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0,
          duration: 100
        }
      },
      selectByClick: false,
      focusOnSelectedItem: false,
      keyExpr: null,
      _itemAttributes: {
        role: "menuitem"
      },
      useInkRipple: false
    });
  }
  _itemDataKey() {
    return "dxMenuItemDataKey";
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _setAriaSelectionAttribute($itemElement, isSelected) {
  }
  _selectedItemClass() {
    return DX_MENU_SELECTED_ITEM_CLASS;
  }
  _widgetClass() {
    return "dx-menu-base";
  }
  _focusTarget() {
    return this._itemContainer();
  }
  _clean() {
    this.option("focusedElement", null);
    super._clean();
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      space: () => {
        const {
          focusedElement
        } = this.option();
        const $item = renderer_default(focusedElement);
        if (!$item.length || !this._isSelectionEnabled()) {
          return;
        }
        this.selectItem($item[0]);
      },
      pageUp: noop,
      pageDown: noop
    });
  }
  _isSelectionEnabled() {
    const {
      selectionMode
    } = this.option();
    return "single" === selectionMode;
  }
  _init() {
    super._init();
    this._renderSelectedItem();
    this._initActions();
  }
  _getLinkContainer(iconContainer, textContainer, itemData) {
    const {
      linkAttr,
      url
    } = itemData;
    null === iconContainer || void 0 === iconContainer || iconContainer.addClass("dx-icon-with-url");
    null === textContainer || void 0 === textContainer || textContainer.addClass(DX_MENU_ITEM_CAPTION_URL_CLASS);
    return super._getLinkContainer(iconContainer, textContainer, {
      linkAttr,
      url
    });
  }
  _addContent($container, itemData) {
    const {
      html,
      url
    } = itemData;
    if (url) {
      $container.html(html);
      const link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
      $container.append(link);
    } else {
      super._addContent($container, itemData);
    }
    $container.append(this._getPopoutContainer(itemData));
    this._addContentClasses(itemData, $container.parent());
  }
  _getTextContainer(itemData) {
    const {
      text
    } = itemData;
    if (!text) {
      return renderer_default();
    }
    const $itemContainer = renderer_default("<span>").addClass(DX_MENU_ITEM_CAPTION_CLASS);
    const itemText = isPlainObject(itemData) ? text : String(itemData);
    return $itemContainer.text(itemText);
  }
  _getItemExtraPropNames() {
    return ["url", "linkAttr"];
  }
  _getPopoutContainer(itemData) {
    const {
      items
    } = itemData;
    if (!(null !== items && void 0 !== items && items.length)) {
      return renderer_default();
    }
    const $popOutImage = renderer_default("<div>").addClass(DX_MENU_ITEM_POPOUT_CLASS);
    const $popOutContainer = renderer_default("<span>").addClass(DX_MENU_ITEM_POPOUT_CONTAINER_CLASS);
    $popOutContainer.append($popOutImage);
    return $popOutContainer;
  }
  _getDataAdapterOptions() {
    return {
      rootValue: 0,
      multipleSelection: false,
      recursiveSelection: false,
      recursiveExpansion: false,
      searchValue: ""
    };
  }
  _selectByItem(selectedItem) {
    if (!selectedItem) {
      return;
    }
    const nodeToSelect = this._dataAdapter.getNodeByItem(selectedItem);
    if (nodeToSelect) {
      this._dataAdapter.toggleSelection(nodeToSelect.internalFields.key, true);
    }
  }
  _renderSelectedItem() {
    const selectedKeys = this._dataAdapter.getSelectedNodesKeys();
    const selectedKey = selectedKeys.length && selectedKeys[0];
    const selectedItem = this.option("selectedItem");
    if (!selectedKey) {
      this._selectByItem(selectedItem);
      return;
    }
    const node = this._dataAdapter.getNodeByKey(selectedKey);
    if (!node || false === node.selectable) {
      return;
    }
    if (!selectedItem) {
      this.option("selectedItem", node.internalFields.item);
      return;
    }
    if (selectedItem !== node.internalFields.item) {
      this._dataAdapter.toggleSelection(selectedKey, false);
      this._selectByItem(selectedItem);
    }
  }
  _initActions() {
  }
  _initMarkup() {
    super._initMarkup();
    const {
      useInkRipple
    } = this.option();
    if (useInkRipple) {
      this._renderInkRipple();
    }
  }
  _renderInkRipple() {
    this._inkRipple = render();
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _getShowSubmenuMode() {
    const {
      showSubmenuMode
    } = this.option();
    const showMode = isObject(showSubmenuMode) ? showSubmenuMode.name : showSubmenuMode;
    return this._isDesktopDevice() ? showMode : "onClick";
  }
  _isDesktopDevice() {
    return "desktop" === devices_default.real().deviceType;
  }
  _initEditStrategy() {
    this._editStrategy = new menu_base_edit_strategy_default(this);
  }
  _addCustomCssClass($element) {
    const {
      cssClass
    } = this.option();
    if (cssClass) {
      $element.addClass(cssClass);
    }
  }
  _hoverStartHandler(e) {
    const $itemElement = this._getItemElementByEventArgs(e);
    if (!$itemElement || this._isItemDisabled($itemElement)) {
      return;
    }
    e.stopPropagation();
    if ("onHover" === this._getShowSubmenuMode()) {
      const submenuDelay = this._getSubmenuDelay();
      if (0 === submenuDelay) {
        this._showSubmenu($itemElement);
      } else {
        clearTimeout(this._showSubmenusTimeout);
        this._showSubmenusTimeout = setTimeout(this._showSubmenu.bind(this, $itemElement), submenuDelay);
      }
    }
  }
  _getAvailableItems($itemElements) {
    return super._getAvailableItems($itemElements).filter(((_index, item) => "hidden" !== renderer_default(item).css("visibility")));
  }
  _isItemDisabled($item) {
    return this._disabledGetter($item.data(this._itemDataKey()));
  }
  _showSubmenu($itemElement) {
    this._addExpandedClass($itemElement);
  }
  _addExpandedClass(itemElement) {
    renderer_default(itemElement).addClass(DX_MENU_ITEM_EXPANDED_CLASS);
  }
  _getSubmenuDelay() {
    const {
      showSubmenuMode
    } = this.option();
    const delay = isObject(showSubmenuMode) ? showSubmenuMode.delay : void 0;
    if (!isDefined(delay)) {
      return DEFAULT_DELAY.show;
    }
    if (isObject(delay)) {
      return delay.show ?? DEFAULT_DELAY.show;
    }
    return delay;
  }
  _getItemElementByEventArgs(eventArgs) {
    let $target = renderer_default(eventArgs.target);
    if ($target.hasClass(this._itemClass()) || $target.get(0) === eventArgs.currentTarget) {
      return $target;
    }
    while (!$target.hasClass(this._itemClass())) {
      $target = $target.parent();
      if ($target.hasClass("dx-submenu")) {
        return null;
      }
    }
    return $target;
  }
  _hoverEndHandler(event) {
    clearTimeout(this._showSubmenusTimeout);
  }
  _hasSubmenu(node) {
    return !!(null !== node && void 0 !== node && node.internalFields.childrenKeys.length);
  }
  _renderContentImpl() {
    this._renderItems(this._dataAdapter.getRootNodes());
  }
  _renderItems(nodes, $submenuContainer) {
    if (!nodes.length) {
      return;
    }
    this.hasIcons = false;
    const $nodeContainer = this._renderContainer(this.$element(), null === $submenuContainer || void 0 === $submenuContainer ? void 0 : $submenuContainer[0]);
    let firstVisibleIndex = -1;
    let nextGroupFirstIndex = -1;
    each(nodes, ((index, node) => {
      const isVisibleNode = false !== node.visible;
      if (isVisibleNode && firstVisibleIndex < 0) {
        firstVisibleIndex = index;
      }
      const isBeginGroup = firstVisibleIndex < index && (node.beginGroup || index === nextGroupFirstIndex);
      if (isBeginGroup) {
        nextGroupFirstIndex = isVisibleNode ? index : index + 1;
      }
      if (index === nextGroupFirstIndex && firstVisibleIndex < index) {
        this._renderSeparator($nodeContainer);
      }
      this._renderItem(index, node, $nodeContainer);
    }));
    if (!this.hasIcons) {
      $nodeContainer.addClass("dx-menu-no-icons");
    }
  }
  _renderContainer($wrapper, submenuContainer) {
    const $container = renderer_default("<ul>");
    this.setAria("role", "none", $container);
    return $container.appendTo($wrapper).addClass("dx-menu-items-container");
  }
  _createDOMElement($nodeContainer) {
    const $node = renderer_default("<li>");
    this.setAria("role", "none", $node);
    return $node.appendTo($nodeContainer).addClass(DX_MENU_ITEM_WRAPPER_CLASS);
  }
  _renderItem(index, node, $nodeContainer, $nodeElement) {
    var _items;
    const {
      items = []
    } = this.option();
    const $node = $nodeElement ?? this._createDOMElement($nodeContainer);
    if (null !== (_items = items[index + 1]) && void 0 !== _items && _items.beginGroup) {
      $node.addClass("dx-menu-last-group-item");
    }
    const $itemFrame = super._renderItem(index, node.internalFields.item, $node);
    if (node.internalFields.item === this.option("selectedItem")) {
      $itemFrame.addClass(DX_MENU_SELECTED_ITEM_CLASS);
    }
    $itemFrame.attr("tabIndex", -1);
    if (this._hasSubmenu(node)) {
      this.setAria("haspopup", "true", $itemFrame);
    }
    return $itemFrame;
  }
  _renderItemFrame(index, itemData, $itemContainer) {
    const $itemFrame = $itemContainer.children(`.${ITEM_CLASS}`);
    return $itemFrame.length ? $itemFrame : super._renderItemFrame(index, itemData, $itemContainer);
  }
  _refreshItem($item, item) {
    const node = this._dataAdapter.getNodeByItem(item);
    if (!node) {
      return;
    }
    const index = $item.data(this._itemIndexKey());
    const $nodeContainer = $item.closest("ul");
    const $nodeElement = $item.closest("li");
    this._renderItem(index, node, $nodeContainer, $nodeElement);
  }
  _addContentClasses(itemData, $itemFrame) {
    const hasText = itemData.text ? !!itemData.text.length : false;
    const hasIcon = !!itemData.icon;
    const hasSubmenu = itemData.items ? !!itemData.items.length : false;
    $itemFrame.toggleClass(DX_ITEM_HAS_TEXT, hasText);
    $itemFrame.toggleClass(DX_ITEM_HAS_ICON, hasIcon);
    if (!this.hasIcons) {
      this.hasIcons = hasIcon;
    }
    $itemFrame.toggleClass(DX_ITEM_HAS_SUBMENU, hasSubmenu);
  }
  _getItemContent($itemFrame) {
    let $itemContent = super._getItemContent($itemFrame);
    if (!$itemContent.length) {
      $itemContent = $itemFrame.children(`.${DX_ITEM_CONTENT_CLASS}`);
    }
    return $itemContent;
  }
  _postprocessRenderItem(args) {
    const $itemElement = renderer_default(args.itemElement);
    const selectedIndex = this._dataAdapter.getSelectedNodesKeys();
    if (!selectedIndex.length || !this._selectedGetter(args.itemData) || !this._isItemSelectable(args.itemData)) {
      this._setAriaSelectionAttribute($itemElement, "false");
      return;
    }
    const node = this._dataAdapter.getNodeByItem(args.itemData);
    if (node && node.internalFields.key === selectedIndex[0]) {
      $itemElement.addClass(this._selectedItemClass());
      this._setAriaSelectionAttribute($itemElement, "true");
    } else {
      this._setAriaSelectionAttribute($itemElement, "false");
    }
  }
  _isItemSelectable(item) {
    return false !== item.selectable;
  }
  _renderSeparator($itemsContainer) {
    renderer_default("<li>").appendTo($itemsContainer).addClass("dx-menu-separator");
  }
  _itemClickHandler(e) {
    if (e._skipHandling) {
      return;
    }
    const itemClickActionHandler = this._createAction(this._updateSubmenuVisibilityOnClick.bind(this));
    this._itemDXEventHandler(e, "onItemClick", {}, {
      beforeExecute: this._itemClick,
      afterExecute: itemClickActionHandler.bind(this)
    });
    e._skipHandling = true;
  }
  _isUrlItem(item) {
    return !!item && "url" in item && !!item.url;
  }
  _itemClick(actionArgs) {
    var _actionArgs$args;
    const {
      event,
      itemData
    } = (null === (_actionArgs$args = actionArgs.args) || void 0 === _actionArgs$args ? void 0 : _actionArgs$args[0]) ?? {};
    if (!event) {
      return;
    }
    const $itemElement = this._getItemElementByEventArgs(event);
    const link = null === $itemElement || void 0 === $itemElement ? void 0 : $itemElement.find(".dx-item-url")[0];
    if (!this._isUrlItem(itemData) || !link) {
      return;
    }
    const isNativeLinkClick = renderer_default(event.target).closest(".dx-item-url").length;
    if (isNativeLinkClick) {
      return;
    }
    this._clickByLink(link);
  }
  _updateSubmenuVisibilityOnClick(actionArgs) {
    this._updateSelectedItemOnClick(actionArgs);
    if ("onClick" === this._getShowSubmenuMode()) {
      var _actionArgs$args2;
      const itemElement = null === (_actionArgs$args2 = actionArgs.args) || void 0 === _actionArgs$args2 ? void 0 : _actionArgs$args2[0].itemElement;
      if (itemElement) {
        this._addExpandedClass(itemElement);
      }
    }
  }
  _updateSelectedItemOnClick(actionArgs) {
    const args = actionArgs.args ? actionArgs.args[0] : actionArgs;
    const {
      itemData
    } = args;
    if (!itemData || !this._isItemSelectAllowed(itemData)) {
      return;
    }
    const selectedItemKey = this._dataAdapter.getSelectedNodesKeys();
    const selectedNode = selectedItemKey.length && this._dataAdapter.getNodeByKey(selectedItemKey[0]);
    if (selectedNode) {
      this._toggleItemSelection(selectedNode, false);
    }
    if (!selectedNode || selectedNode.internalFields.item !== itemData) {
      this.selectItem(itemData);
    } else {
      this._fireSelectionChangeEvent(null, this.option("selectedItem"));
      this._setOptionWithoutOptionChange("selectedItem", null);
    }
  }
  _isItemSelectAllowed(item) {
    const {
      selectByClick
    } = this.option();
    const isSelectByClickEnabled = this._isSelectionEnabled() && selectByClick;
    return !this._isContainerEmpty() && isSelectByClickEnabled && this._isItemSelectable(item) && !this._itemsGetter(item);
  }
  _isContainerEmpty() {
    return this._itemContainer().is(":empty");
  }
  _syncSelectionOptions() {
    return asyncNoop();
  }
  _optionChanged(args) {
    switch (args.name) {
      case "showSubmenuMode":
        break;
      case "selectedItem": {
        const node = args.value ? this._dataAdapter.getNodeByItem(args.value) : null;
        const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
        if (node && node.internalFields.key !== selectedKey) {
          if (false === node.selectable) {
            break;
          }
          const selectedNode = this._dataAdapter.getNodeByKey(selectedKey);
          if (selectedKey && selectedNode) {
            this._toggleItemSelection(selectedNode, false);
          }
          this._toggleItemSelection(node, true);
        }
        break;
      }
      case "cssClass":
      case "position":
      case "selectByClick":
      case "animation":
      case "useInkRipple":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _toggleItemSelection(node, value) {
    const itemElement = this._getElementByItem(node.internalFields.item);
    if (itemElement) {
      renderer_default(itemElement).toggleClass(DX_MENU_SELECTED_ITEM_CLASS);
    }
    this._dataAdapter.toggleSelection(node.internalFields.key, value);
  }
  _getElementByItem(itemData) {
    let result = renderer_default();
    each(this._itemElements(), ((_index, $itemElement) => {
      if (renderer_default($itemElement).data(this._itemDataKey()) !== itemData) {
        return true;
      }
      result = $itemElement;
      return false;
    }));
    return result;
  }
  _updateSelectedItems() {
  }
  _updateSelectedItem(addedItem, removedItem) {
    if (addedItem || removedItem) {
      this._fireSelectionChangeEvent(addedItem, removedItem);
    }
  }
  _fireSelectionChangeEvent(addedItem, removedItem) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })({
      addedItems: [addedItem],
      removedItems: [removedItem]
    });
  }
  selectItem(itemElement) {
    const itemData = (item = itemElement, "object" === typeof item && "nodeType" in item && !!item.nodeType) ? this._getItemData(itemElement) : itemElement;
    var item;
    const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
    const selectedItem = this.option("selectedItem");
    const node = this._dataAdapter.getNodeByItem(itemData);
    if (node && node.internalFields.key !== selectedKey) {
      const selectedNode = this._dataAdapter.getNodeByKey(selectedKey);
      if (selectedKey && selectedNode) {
        this._toggleItemSelection(selectedNode, false);
      }
      this._toggleItemSelection(node, true);
      this._updateSelectedItem(itemData, selectedItem);
      this._setOptionWithoutOptionChange("selectedItem", itemData);
    }
  }
  unselectItem(itemElement) {
    const itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
    const node = this._dataAdapter.getNodeByItem(itemData);
    const selectedItem = this.option("selectedItem");
    if (null !== node && void 0 !== node && node.internalFields.selected) {
      this._toggleItemSelection(node, false);
      this._updateSelectedItem(null, selectedItem);
      this._setOptionWithoutOptionChange("selectedItem", null);
    }
  }
};
MenuBase.ItemClass = item_default;
var menu_base_default = MenuBase;

// node_modules/devextreme/esm/__internal/ui/context_menu/context_menu.js
var DX_MENU_PHONE_CLASS = "dx-menu-phone-overlay";
var ACTIONS = ["onShowing", "onShown", "onSubmenuCreated", "onHiding", "onHidden", "onPositioning", "onLeftFirstItem", "onLeftLastItem", "onCloseRootSubmenu", "onExpandLastSubmenu"];
var LOCAL_SUBMENU_DIRECTIONS = ["up", "down", "first", "last"];
var window = getWindow();
var ContextMenu = class extends menu_base_default {
  getShowEvent(showEventOption) {
    if (isObject(showEventOption)) {
      if (null === showEventOption.name) {
        return null;
      }
      return showEventOption.name ?? "dxcontextmenu";
    }
    return showEventOption ?? null;
  }
  getShowDelay(showEventOption) {
    return isObject(showEventOption) ? showEventOption.delay ?? 0 : 0;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showEvent: "dxcontextmenu",
      hideOnOutsideClick: true,
      position: {
        at: "top left",
        my: "top left"
      },
      onShowing: null,
      onShown: null,
      onSubmenuCreated: null,
      onHiding: null,
      onHidden: null,
      onPositioning: null,
      submenuDirection: "auto",
      visible: false,
      target: void 0,
      onLeftFirstItem: null,
      onLeftLastItem: null,
      onCloseRootSubmenu: null,
      onExpandLastSubmenu: null,
      hideOnParentScroll: true,
      visualContainer: window
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => !hasWindow(),
      options: {
        animation: null
      }
    }]);
  }
  _initActions() {
    this._actions = {};
    each(ACTIONS, ((_index, action) => {
      this._actions[action] = this._createActionByOption(action) || noop;
    }));
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  }
  _focusInHandler() {
  }
  _itemContainer() {
    return this._overlay ? this._overlay.$content() : renderer_default();
  }
  _eventBindingTarget() {
    return this._itemContainer();
  }
  itemsContainer() {
    var _this$_overlay;
    return (null === (_this$_overlay = this._overlay) || void 0 === _this$_overlay ? void 0 : _this$_overlay.$content()) ?? renderer_default();
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      space: () => {
        const {
          focusedElement
        } = this.option();
        const $item = renderer_default(focusedElement);
        this.hide();
        if (!$item.length || !this._isSelectionEnabled()) {
          return;
        }
        this.selectItem($item[0]);
      },
      escape: () => {
        this.hide();
      }
    });
  }
  _getActiveItem(_last) {
    const $availableItems = this._getAvailableItems();
    const $focusedItem = $availableItems.filter(".dx-state-focused");
    const $hoveredItem = $availableItems.filter(".dx-state-hover");
    const $hoveredItemContainer = $hoveredItem.closest(".dx-menu-items-container");
    if ($hoveredItemContainer.find(".dx-menu-item").index($focusedItem) >= 0) {
      return $focusedItem;
    }
    if ($hoveredItem.length) {
      return $hoveredItem;
    }
    return super._getActiveItem();
  }
  _moveFocus(location) {
    const $items = this._getItemsByLocation(location);
    const $oldTarget = this._getActiveItem(true);
    const $hoveredItem = this.itemsContainer().find(".dx-state-hover");
    const {
      focusedElement,
      rtlEnabled
    } = this.option();
    const $focusedItem = renderer_default(focusedElement);
    const $activeItemHighlighted = !!($focusedItem.length || null !== $hoveredItem && void 0 !== $hoveredItem && $hoveredItem.length);
    let $newTarget;
    switch (location) {
      case "up":
        $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.first())) {
          var _this$_actions$onLeft, _this$_actions;
          null === (_this$_actions$onLeft = (_this$_actions = this._actions).onLeftFirstItem) || void 0 === _this$_actions$onLeft || _this$_actions$onLeft.call(_this$_actions, $oldTarget);
        }
        break;
      case "down":
        $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.last())) {
          var _this$_actions$onLeft2, _this$_actions2;
          null === (_this$_actions$onLeft2 = (_this$_actions2 = this._actions).onLeftLastItem) || void 0 === _this$_actions$onLeft2 || _this$_actions$onLeft2.call(_this$_actions2, $oldTarget);
        }
        break;
      case "right":
        $newTarget = rtlEnabled ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
        this._setFocusedElement($newTarget);
        break;
      case "left":
        $newTarget = rtlEnabled ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
        this._setFocusedElement($newTarget);
        break;
      case "first":
        $newTarget = $items.first();
        this._setFocusedElement($newTarget);
        break;
      case "last":
        $newTarget = $items.last();
        this._setFocusedElement($newTarget);
        break;
      default:
        return super._moveFocus(location);
    }
  }
  _setFocusedElement($element) {
    if ($element && 0 !== $element.length) {
      this.option("focusedElement", getPublicElement($element));
      this._scrollToElement($element);
    }
  }
  _scrollToElement($element) {
    const $scrollableElement = $element.closest(`.${SCROLLABLE_CLASS}`);
    const scrollableInstance = scrollable_default.getInstance($scrollableElement.get(0));
    null === scrollableInstance || void 0 === scrollableInstance || scrollableInstance.scrollToElement($element);
  }
  _getItemsByLocation(location) {
    const $activeItem = this._getActiveItem(true);
    let $items;
    if (LOCAL_SUBMENU_DIRECTIONS.includes(location)) {
      $items = $activeItem.closest(".dx-menu-items-container").children().children();
    }
    $items = this._getAvailableItems($items);
    return $items;
  }
  _getAriaTarget() {
    return this.$element();
  }
  _refreshActiveDescendant() {
    if (isDefined(this._overlay)) {
      const $target = this._overlay.$content();
      super._refreshActiveDescendant($target);
    }
  }
  _hideSubmenuHandler() {
    var _this$_actions$onClos, _this$_actions3;
    const $curItem = this._getActiveItem(true);
    const $parentItem = $curItem.parents(".dx-menu-item-expanded").first();
    if ($parentItem.length) {
      this._hideSubmenusOnSameLevel($parentItem);
      this._hideSubmenu($curItem.closest(".dx-submenu"));
      return $parentItem;
    }
    null === (_this$_actions$onClos = (_this$_actions3 = this._actions).onCloseRootSubmenu) || void 0 === _this$_actions$onClos || _this$_actions$onClos.call(_this$_actions3, $curItem);
    return;
  }
  _expandSubmenuHandler($items, location) {
    var _this$_actions$onExpa, _this$_actions4;
    const $curItem = this._getActiveItem(true);
    const itemData = this._getItemData($curItem);
    const node = this._dataAdapter.getNodeByItem(itemData);
    const isItemHasSubmenu = this._hasSubmenu(node);
    const $submenu = $curItem.children(".dx-submenu");
    if (isItemHasSubmenu && !$curItem.hasClass("dx-state-disabled")) {
      if (!$submenu.length || "hidden" === $submenu.css("visibility")) {
        this._showSubmenu($curItem);
      }
      return this._nextItem(this._getItemsByLocation(location));
    }
    null === (_this$_actions$onExpa = (_this$_actions4 = this._actions).onExpandLastSubmenu) || void 0 === _this$_actions$onExpa || _this$_actions$onExpa.call(_this$_actions4, $curItem);
    return;
  }
  _clean() {
    if (this._overlay) {
      this._overlay.$element().remove();
      this._overlay = null;
    }
    this._detachShowContextMenuEvents(this._getTarget());
    this._shownSubmenus = [];
    super._clean();
  }
  _initMarkup() {
    this.$element().addClass("dx-has-context-menu");
    this._eventNamespace = `${this.NAME}${new guid_default()}`;
    super._initMarkup();
  }
  _render() {
    super._render();
    const {
      visible
    } = this.option();
    this._renderVisibility(visible);
    this._addWidgetClass();
  }
  _isTargetOutOfComponent(relatedTarget) {
    const isInsideContextMenu = 0 !== renderer_default(relatedTarget).closest(".dx-context-menu").length;
    return !isInsideContextMenu;
  }
  _focusOutHandler(e) {
    const {
      relatedTarget
    } = e;
    if (relatedTarget) {
      const isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
      if (isTargetOutside) {
        this.hide();
      }
    }
    super._focusOutHandler(e);
  }
  _renderContentImpl() {
    this._detachShowContextMenuEvents(this._getTarget());
    this._showContextMenuEventHandler = this._createShowContextMenuEventHandler();
    this._attachShowContextMenuEvents();
  }
  _attachKeyboardEvents() {
    if (!this._keyboardListenerId && this._focusTarget().length) {
      super._attachKeyboardEvents();
    }
  }
  _renderContextMenuOverlay() {
    if (this._overlay) {
      return;
    }
    const overlayOptions = this._getOverlayOptions();
    this._overlay = this._createComponent(renderer_default("<div>").appendTo(this.$element()), overlay_default, overlayOptions);
    const $overlayContent = this._overlay.$content();
    $overlayContent.addClass("dx-context-menu");
    this._addCustomCssClass($overlayContent);
    this._addPlatformDependentClass($overlayContent);
    this._attachContextMenuEvent();
  }
  preventShowingDefaultContextMenuAboveOverlay() {
    const $itemContainer = this._itemContainer();
    const eventName = addNamespace(name, this._eventNamespace);
    m_events_engine_default.off($itemContainer, eventName, ".dx-submenu");
    m_events_engine_default.on($itemContainer, eventName, ".dx-submenu", ((e) => {
      e.stopPropagation();
      e.preventDefault();
      m_events_engine_default.off($itemContainer, eventName, ".dx-submenu");
    }));
  }
  _itemContextMenuHandler(e) {
    super._itemContextMenuHandler(e);
    e.stopPropagation();
  }
  _addPlatformDependentClass($element) {
    if (devices_default.current().phone) {
      $element.addClass(DX_MENU_PHONE_CLASS);
    }
  }
  _createShowContextMenuEventHandler() {
    const showContextMenuAction = this._createAction(((e) => {
      const {
        showEvent
      } = this.option();
      const delay = this.getShowDelay(showEvent);
      if (delay) {
        setTimeout((() => this._show(e.event)), delay);
      } else {
        this._show(e.event);
      }
    }), {
      validatingTargetName: "target"
    });
    return (e) => showContextMenuAction({
      event: e,
      target: renderer_default(e.currentTarget)
    });
  }
  _detachShowContextMenuEvents(target, event) {
    const {
      showEvent: showEventOption
    } = this.option();
    const showEvent = this.getShowEvent(event ?? showEventOption);
    if (!showEvent) {
      return;
    }
    const isSelector = isString(target);
    const eventName = addNamespace(showEvent, this._eventNamespace);
    if (isSelector) {
      m_events_engine_default.off(dom_adapter_default.getDocument(), eventName, target, this._showContextMenuEventHandler);
    } else {
      m_events_engine_default.off(renderer_default(target), eventName, this._showContextMenuEventHandler);
    }
  }
  _attachShowContextMenuEvents() {
    const {
      showEvent: showEventOption,
      disabled
    } = this.option();
    const showEvent = this.getShowEvent(showEventOption);
    if (!showEvent || disabled) {
      return;
    }
    const target = this._getTarget();
    const isSelector = isString(target);
    const eventName = addNamespace(showEvent, this._eventNamespace);
    if (isSelector) {
      m_events_engine_default.on(dom_adapter_default.getDocument(), eventName, target, this._showContextMenuEventHandler);
    } else {
      m_events_engine_default.on(target, eventName, this._showContextMenuEventHandler);
    }
  }
  _hoverEndHandler(e) {
    super._hoverEndHandler(e);
    e.stopPropagation();
  }
  _renderDimensions() {
  }
  _renderContainer($wrapper, submenuContainer) {
    const $holder = submenuContainer ?? this._itemContainer();
    $wrapper = renderer_default("<div>");
    $wrapper.appendTo($holder).addClass("dx-submenu").css("visibility", submenuContainer ? "hidden" : "visible");
    if (!$wrapper.parent().hasClass("dx-overlay-content")) {
      this._addCustomCssClass($wrapper);
    }
    const $itemsContainer = super._renderContainer($wrapper);
    if (submenuContainer) {
      return $itemsContainer;
    }
    const {
      width,
      height
    } = this.option();
    if (width) {
      return $itemsContainer.css("minWidth", width);
    }
    if (height) {
      return $itemsContainer.css("minHeight", height);
    }
    return $itemsContainer;
  }
  _renderSubmenuItems(node, $itemFrame) {
    var _this$_actions$onSubm, _this$_actions5;
    this._renderItems(this._getChildNodes(node), $itemFrame);
    const $submenu = $itemFrame.children(".dx-submenu");
    null === (_this$_actions$onSubm = (_this$_actions5 = this._actions).onSubmenuCreated) || void 0 === _this$_actions$onSubm || _this$_actions$onSubm.call(_this$_actions5, {
      itemElement: getPublicElement($itemFrame),
      itemData: node.internalFields.item,
      submenuElement: getPublicElement($submenu)
    });
    this._initScrollable($submenu);
    this.setAria({
      role: "menu"
    }, $submenu);
  }
  _getOverlayOptions() {
    const {
      position,
      focusStateEnabled,
      animation,
      hideOnParentScroll,
      visualContainer,
      overlayContainer,
      boundaryOffset
    } = this.option();
    return {
      focusStateEnabled,
      animation,
      innerOverlay: true,
      hideOnOutsideClick: (e) => this._hideOnOutsideClickHandler(e),
      propagateOutsideClick: true,
      hideOnParentScroll,
      deferRendering: false,
      container: overlayContainer,
      position: {
        at: position.at,
        my: position.my,
        of: this._getTarget(),
        collision: "flipfit",
        boundary: visualContainer,
        boundaryOffset
      },
      shading: false,
      showTitle: false,
      height: "auto",
      width: "auto",
      onShown: this._overlayShownActionHandler.bind(this),
      onHiding: this._overlayHidingActionHandler.bind(this),
      onHidden: this._overlayHiddenActionHandler.bind(this),
      visualContainer
    };
  }
  _overlayShownActionHandler(arg) {
    var _this$_actions$onShow, _this$_actions6;
    null === (_this$_actions$onShow = (_this$_actions6 = this._actions).onShown) || void 0 === _this$_actions$onShow || _this$_actions$onShow.call(_this$_actions6, arg);
  }
  _overlayHidingActionHandler(arg) {
    var _this$_actions$onHidi, _this$_actions7;
    null === (_this$_actions$onHidi = (_this$_actions7 = this._actions).onHiding) || void 0 === _this$_actions$onHidi || _this$_actions$onHidi.call(_this$_actions7, arg);
    if (!arg.cancel) {
      this._hideAllShownSubmenus();
      this._setOptionWithoutOptionChange("visible", false);
    }
  }
  _overlayHiddenActionHandler(arg) {
    var _this$_actions$onHidd, _this$_actions8;
    null === (_this$_actions$onHidd = (_this$_actions8 = this._actions).onHidden) || void 0 === _this$_actions$onHidd || _this$_actions$onHidd.call(_this$_actions8, arg);
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  }
  _hideOnOutsideClickHandler(e) {
    if (!this._shouldHideOnOutsideClick(e)) {
      return false;
    }
    if (dom_adapter_default.isDocument(e.target)) {
      return true;
    }
    const $activeItemContainer = this._getActiveItemsContainer(e.target);
    const $itemContainers = this._getItemsContainers();
    const $clickedItem = this._searchActiveItem(e.target);
    const $rootItem = this.$element().parents(".dx-menu-item");
    const isRootItemClicked = $clickedItem[0] === $rootItem[0] && !!$clickedItem.length && !!$rootItem.length;
    const isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && !!$clickedItem.length;
    if (isInnerOverlayClicked || isRootItemClicked) {
      if ("onClick" === this._getShowSubmenuMode()) {
        this._hideAllShownChildSubmenus($clickedItem);
      }
      return false;
    }
    return true;
  }
  _getActiveItemsContainer(target) {
    return renderer_default(target).closest(".dx-menu-items-container");
  }
  _getItemsContainers() {
    var _this$_overlay2;
    return (null === (_this$_overlay2 = this._overlay) || void 0 === _this$_overlay2 ? void 0 : _this$_overlay2.$content().find(".dx-menu-items-container")) ?? renderer_default();
  }
  _searchActiveItem(target) {
    return renderer_default(target).closest(".dx-menu-item").eq(0);
  }
  _isIncludeOverlay($activeOverlay, $allOverlays) {
    let isSame = false;
    each($allOverlays, ((_index, $overlay) => {
      if ($activeOverlay.is($overlay) && !isSame) {
        isSame = true;
      }
    }));
    return isSame;
  }
  _hideAllShownChildSubmenus($clickedItem) {
    const $submenuElements = $clickedItem.find(".dx-submenu");
    const shownSubmenus = extend([], this._shownSubmenus);
    if ($submenuElements.length > 0) {
      each(shownSubmenus, ((index, $submenu) => {
        const $context = this._searchActiveItem($submenu.context).parent();
        if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
          this._hideSubmenu($submenu);
        }
      }));
    }
  }
  _initScrollable($container) {
    this._createComponent($container, scrollable_default, {
      useKeyboard: false,
      _onVisibilityChanged: (scrollable) => {
        scrollable.scrollTo(0);
      }
    });
  }
  _setSubMenuHeight($submenu, $anchor) {
    const $itemsContainer = $submenu.find(".dx-menu-items-container");
    const contentHeight = getOuterHeight($itemsContainer);
    const maxHeight = this._getMaxHeight($anchor, false);
    const menuHeight = Math.min(contentHeight, maxHeight);
    $submenu.css("height", menuHeight);
  }
  _getMaxUsableSpace(_offsetTop, windowHeight, _anchorHeight) {
    return windowHeight;
  }
  _getMaxHeight($anchor) {
    let considerAnchorHeight = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
    const windowHeight = getOuterHeight(window);
    const isAnchorRenderer = isRenderer($anchor);
    const document = dom_adapter_default.getDocument();
    const isAnchorDocument = isObject($anchor) && "length" in $anchor && $anchor.length && $anchor[0] === document;
    if (!isAnchorRenderer || isAnchorDocument) {
      return windowHeight;
    }
    const offsetTop = null === $anchor || void 0 === $anchor ? void 0 : $anchor[0].getBoundingClientRect().top;
    const anchorHeight = getOuterHeight($anchor);
    const availableHeight = considerAnchorHeight ? this._getMaxUsableSpace(offsetTop, windowHeight, anchorHeight) : Math.max(offsetTop + anchorHeight, windowHeight - offsetTop);
    return availableHeight - 10;
  }
  _setOverlayMaxHeight($subMenu) {
    var _this$_overlay3;
    if (!$subMenu) {
      return;
    }
    null === (_this$_overlay3 = this._overlay) || void 0 === _this$_overlay3 || _this$_overlay3.option({
      maxHeight: () => {
        const $content = $subMenu.find(".dx-menu-items-container");
        const outerHeight = getOuterHeight($content);
        const borderWidth = this._getSubmenuBorderWidth();
        return outerHeight + 2 * borderWidth;
      }
    });
    $subMenu.css("height", "100%");
  }
  _dimensionChanged() {
    if (!this._shownSubmenus) {
      return;
    }
    this._shownSubmenus.forEach((($submenu) => {
      const $item = $submenu.closest(".dx-menu-item");
      this._setSubMenuHeight($submenu, $item);
      this._scrollToElement($item);
      const submenuPosition = this._getSubmenuPosition($item);
      position_default.setup($submenu, submenuPosition);
    }));
  }
  _getSubmenuBorderWidth() {
    return isGeneric(current()) ? 1 : 0;
  }
  _showSubmenu($item) {
    const node = this._dataAdapter.getNodeByItem(this._getItemData($item));
    this._hideSubmenusOnSameLevel($item);
    if (!this._hasSubmenu(node)) {
      return;
    }
    let $submenu = $item.children(".dx-submenu");
    const isSubmenuRendered = $submenu.length;
    super._showSubmenu($item);
    if (node && !isSubmenuRendered) {
      this._renderSubmenuItems(node, $item);
      $submenu = $item.children(".dx-submenu");
    }
    this._planPostRenderActions($submenu);
  }
  _setSubmenuVisible($submenu) {
    if (!$submenu) {
      return;
    }
    const $item = null === $submenu || void 0 === $submenu ? void 0 : $submenu.closest(".dx-menu-item");
    this._setSubMenuHeight($submenu, $item);
    if (!this._isSubmenuVisible($submenu) && $item) {
      this._drawSubmenu($item);
    }
  }
  _hideSubmenusOnSameLevel($item) {
    const $expandedItems = $item.parent(".dx-menu-item-wrapper").siblings().find(".dx-menu-item-expanded");
    if ($expandedItems.length) {
      $expandedItems.removeClass("dx-menu-item-expanded");
      this._hideSubmenu($expandedItems.find(".dx-submenu"));
    }
  }
  _isSubmenuVisible($submenu) {
    return "visible" === $submenu.css("visibility");
  }
  _drawSubmenu($itemElement) {
    var _this$_overlay4;
    const {
      animation: animationOption
    } = this.option();
    const animation = animationOption ? animationOption.show : {};
    const $submenu = $itemElement.children(".dx-submenu");
    const submenuPosition = this._getSubmenuPosition($itemElement);
    if (null !== (_this$_overlay4 = this._overlay) && void 0 !== _this$_overlay4 && _this$_overlay4.option("visible")) {
      if (!isDefined(this._shownSubmenus)) {
        this._shownSubmenus = [];
      }
      if (!this._shownSubmenus.includes($submenu)) {
        this._shownSubmenus.push($submenu);
      }
      if (animation) {
        fx_default.stop($submenu.get(0), false);
      }
      position_default.setup($submenu, submenuPosition);
      if (animation) {
        if (isPlainObject(animation.to)) {
          animation.to.position = submenuPosition;
        }
        this._animate($submenu.get(0), animation);
      }
      $submenu.css("visibility", "visible");
    }
  }
  _animate(container, options) {
    fx_default.animate(container, options);
  }
  _getSubmenuPosition($rootItem) {
    const {
      submenuDirection: submenuDirectionOption,
      rtlEnabled
    } = this.option();
    const submenuDirection = null === submenuDirectionOption || void 0 === submenuDirectionOption ? void 0 : submenuDirectionOption.toLowerCase();
    const $rootItemWrapper = $rootItem.parent(".dx-menu-item-wrapper");
    const position = {
      collision: "flip",
      of: $rootItemWrapper,
      offset: {
        h: 0,
        v: -1
      }
    };
    switch (submenuDirection) {
      case "left":
        position.at = "left top";
        position.my = "right top";
        break;
      case "right":
        position.at = "right top";
        position.my = "left top";
        break;
      default:
        if (rtlEnabled) {
          position.at = "left top";
          position.my = "right top";
        } else {
          position.at = "right top";
          position.my = "left top";
        }
    }
    return position;
  }
  _updateSubmenuVisibilityOnClick(actionArgs) {
    var _actionArgs$args;
    if (!(null !== (_actionArgs$args = actionArgs.args) && void 0 !== _actionArgs$args && _actionArgs$args.length)) {
      return;
    }
    const {
      itemData,
      itemElement
    } = actionArgs.args[0];
    if (!itemData) {
      return;
    }
    const node = this._dataAdapter.getNodeByItem(itemData);
    if (!node) {
      return;
    }
    const $itemElement = renderer_default(itemElement);
    let $submenu = $itemElement.find(".dx-submenu");
    const shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;
    if (shouldRenderSubmenu) {
      this._renderSubmenuItems(node, $itemElement);
      $submenu = $itemElement.find(".dx-submenu");
    }
    if ($itemElement.context === $submenu.context && "visible" === $submenu.css("visibility")) {
      return;
    }
    this._updateSelectedItemOnClick(actionArgs);
    const notCloseMenuOnItemClick = itemData && false === itemData.closeMenuOnClick;
    if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
      return;
    }
    if (0 === $submenu.length) {
      var _this$_overlay5;
      const $prevSubmenu = renderer_default($itemElement.parents(".dx-submenu")[0]);
      this._hideSubmenu($prevSubmenu);
      if (!actionArgs.canceled && null !== (_this$_overlay5 = this._overlay) && void 0 !== _this$_overlay5 && _this$_overlay5.option("visible")) {
        this.option("visible", false);
      }
    } else {
      if (this._shownSubmenus && this._shownSubmenus.length > 0) {
        if (this._shownSubmenus[0].is($submenu)) {
          this._hideSubmenu($submenu);
        }
      }
      this._showSubmenu($itemElement);
    }
  }
  _hideSubmenu($curSubmenu) {
    const shownSubmenus = this._shownSubmenus ?? [];
    each(shownSubmenus, ((_index, $submenu) => {
      if ($curSubmenu.is($submenu) || contains($curSubmenu[0], $submenu[0])) {
        $submenu.parent().removeClass("dx-menu-item-expanded");
        this._hideSubmenuCore($submenu);
      }
    }));
  }
  _hideSubmenuCore($submenu) {
    const index = (this._shownSubmenus ?? []).indexOf($submenu);
    const {
      animation: animationOption
    } = this.option();
    const animation = animationOption ? animationOption.hide : null;
    if (index >= 0) {
      (this._shownSubmenus ?? []).splice(index, 1);
    }
    this._stopAnimate($submenu);
    if (animation) {
      this._animate($submenu.get(0), animation);
    }
    $submenu.css("visibility", "hidden");
    const scrollableInstance = $submenu.dxScrollable("instance");
    scrollableInstance.scrollTo(0);
    this.option("focusedElement", null);
  }
  _stopAnimate($container) {
    fx_default.stop($container.get(0), true);
  }
  _hideAllShownSubmenus() {
    var _this$_overlay6;
    const shownSubmenus = extend([], this._shownSubmenus);
    const $expandedItems = (null === (_this$_overlay6 = this._overlay) || void 0 === _this$_overlay6 ? void 0 : _this$_overlay6.$content().find(".dx-menu-item-expanded")) ?? renderer_default();
    $expandedItems.removeClass("dx-menu-item-expanded");
    each(shownSubmenus, ((_, $submenu) => {
      this._hideSubmenu($submenu);
    }));
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._renderContentImpl();
    }
  }
  _optionChanged(args) {
    const {
      name: name2,
      value,
      previousValue
    } = args;
    if (ACTIONS.includes(name2)) {
      this._initActions();
      return;
    }
    switch (name2) {
      case "visible":
        this._renderVisibility(value);
        break;
      case "disabled":
      case "position":
      case "submenuDirection":
        this._invalidate();
        break;
      case "showEvent":
        if (previousValue) {
          this._detachShowContextMenuEvents(this._getTarget(), previousValue);
        }
        this._invalidate();
        break;
      case "target":
        if (previousValue) {
          this._detachShowContextMenuEvents(previousValue);
        }
        this._invalidate();
        break;
      case "hideOnOutsideClick":
      case "hideOnParentScroll":
      case "visualContainer":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderVisibility(showing) {
    return showing ? this._show() : this._hide();
  }
  _toggleVisibility() {
  }
  _show(event) {
    var _this$_actions$onShow2, _this$_actions9;
    const args = {
      jQEvent: event
    };
    let promise = Deferred().reject().promise();
    null === (_this$_actions$onShow2 = (_this$_actions9 = this._actions).onShowing) || void 0 === _this$_actions$onShow2 || _this$_actions$onShow2.call(_this$_actions9, args);
    if (args.cancel) {
      return promise;
    }
    const position = this._positionContextMenu(event);
    if (position) {
      var _this$_overlay7, _this$_overlay8, _event$originalEvent;
      if (!this._overlay) {
        this._renderContextMenuOverlay();
        this._overlay.$content().addClass(this._widgetClass());
        this._renderFocusState();
        this._attachHoverEvents();
        this._attachClickEvent();
        this._renderItems(this._dataAdapter.getRootNodes());
      }
      const $subMenu = renderer_default(null === (_this$_overlay7 = this._overlay) || void 0 === _this$_overlay7 ? void 0 : _this$_overlay7.content()).children(".dx-submenu");
      this._setOptionWithoutOptionChange("visible", true);
      null === (_this$_overlay8 = this._overlay) || void 0 === _this$_overlay8 || _this$_overlay8.option({
        height: () => this._getMaxHeight(position.of),
        position
      });
      this._setOverlayMaxHeight($subMenu);
      this._planPostRenderActions($subMenu, true);
      if (this._overlay) {
        promise = this._overlay.show();
      }
      null === event || void 0 === event || event.stopPropagation();
      this._setAriaAttributes();
      if ((null === event || void 0 === event || null === (_event$originalEvent = event.originalEvent) || void 0 === _event$originalEvent ? void 0 : _event$originalEvent.type) === m_hold_default.name) {
        this.preventShowingDefaultContextMenuAboveOverlay();
      }
    }
    return promise;
  }
  _renderItems(nodes, submenuContainer) {
    var _this$_overlay9;
    super._renderItems(nodes, submenuContainer);
    const $submenu = renderer_default(null === (_this$_overlay9 = this._overlay) || void 0 === _this$_overlay9 ? void 0 : _this$_overlay9.content()).children(".dx-submenu");
    if ($submenu.length) {
      this._initScrollable($submenu);
    }
  }
  _setAriaAttributes() {
    var _this$_overlay10;
    this._overlayContentId = `dx-${new guid_default()}`;
    this.setAria("owns", this._overlayContentId);
    this.setAria({
      id: this._overlayContentId,
      role: "menu"
    }, null === (_this$_overlay10 = this._overlay) || void 0 === _this$_overlay10 ? void 0 : _this$_overlay10.$content());
  }
  _cleanAriaAttributes() {
    if (this._overlay) {
      this.setAria("id", null, this._overlay.$content());
    }
    this.setAria("owns", void 0);
  }
  _getTarget() {
    const {
      target,
      position
    } = this.option();
    return target || (null === position || void 0 === position ? void 0 : position.of) || renderer_default(dom_adapter_default.getDocument());
  }
  _getContextMenuPosition() {
    const {
      position
    } = this.option();
    return _extends({}, position, {
      of: this._getTarget()
    });
  }
  _positionContextMenu(jQEvent) {
    let position = this._getContextMenuPosition();
    const isInitialPosition = this._isInitialOptionValue("position");
    const positioningAction = this._createActionByOption("onPositioning");
    if (null !== jQEvent && void 0 !== jQEvent && jQEvent.preventDefault && isInitialPosition) {
      position.of = jQEvent;
    }
    const actionArgs = {
      position,
      event: jQEvent
    };
    positioningAction(actionArgs);
    if (actionArgs.cancel) {
      position = null;
    } else if (actionArgs.event) {
      actionArgs.event.cancel = true;
      null === jQEvent || void 0 === jQEvent || jQEvent.preventDefault();
    }
    return position;
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else if (this._overlay) {
      const {
        position: lastPosition
      } = this._overlay.option();
      super._refresh();
      if (this._overlay) {
        this._overlay.option("position", lastPosition);
      }
    } else {
      super._refresh();
    }
  }
  _hide() {
    let promise;
    if (this._overlay) {
      promise = this._overlay.hide();
      this._setOptionWithoutOptionChange("visible", false);
    }
    this._cleanAriaAttributes();
    this.option("focusedElement", null);
    return promise ?? Deferred().reject().promise();
  }
  toggle(showing) {
    const {
      visible
    } = this.option();
    return this._renderVisibility(showing ?? !visible);
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  _postProcessRenderItems($subMenu, isRootSubMenu) {
    if (!isRootSubMenu) {
      this._setSubmenuVisible($subMenu);
      return;
    }
    this._setOverlayMaxHeight($subMenu);
  }
};
component_registrator_default("dxContextMenu", ContextMenu);
var context_menu_default = ContextMenu;

// node_modules/devextreme/esm/ui/context_menu.js
var context_menu_default2 = context_menu_default;

export {
  menu_base_default,
  context_menu_default,
  context_menu_default2
};
//# sourceMappingURL=chunk-ZQGHHMAA.js.map
