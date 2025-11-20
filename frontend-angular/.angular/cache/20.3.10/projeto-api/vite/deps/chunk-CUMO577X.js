import {
  ListBase,
  m_popup_default,
  toolbar_base_default
} from "./chunk-GQ5A5LDB.js";
import {
  Button
} from "./chunk-UQXIHJH2.js";
import {
  current,
  isFluent,
  isMaterialBased
} from "./chunk-BBLJGJFI.js";
import {
  widget_default
} from "./chunk-XX26YRCT.js";
import {
  ChildDefaultTemplate,
  component_registrator_default
} from "./chunk-54SHI7Z2.js";
import {
  devices_default
} from "./chunk-A3D3LIWG.js";
import {
  getOuterHeight,
  getOuterWidth,
  getWidth,
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  _extends,
  compileGetter,
  deferRender,
  each,
  getWindow
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/ui/toolbar/strategy/toolbar.multiline.js
var MultiLineStrategy = class {
  constructor(toolbar) {
    this._toolbar = toolbar;
  }
  _initMarkup() {
  }
  _updateMenuVisibility() {
  }
  _renderMenuItems() {
  }
  _renderItem() {
  }
  _getMenuItems() {
  }
  _getToolbarItems() {
    const {
      items = []
    } = this._toolbar.option();
    return items;
  }
  _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize("width", this._toolbar._itemElements(), true);
  }
  _arrangeItems() {
    const $label = this._toolbar._$toolbarItemsContainer.find(".dx-toolbar-label").eq(0);
    if (!$label.length) {
      return;
    }
    const elementWidth = getWidth(this._toolbar.$element());
    const labelPaddings = getOuterWidth($label) - getWidth($label);
    $label.css("maxWidth", elementWidth - labelPaddings);
  }
  _hideOverflowItems() {
  }
  _dimensionChanged() {
  }
  _itemOptionChanged() {
  }
  _optionChanged() {
  }
};

// node_modules/devextreme/esm/__internal/ui/toolbar/internal/toolbar.menu.list.js
var TOOLBAR_MENU_ACTION_CLASS = "dx-toolbar-menu-action";
var ToolbarMenuList = class extends ListBase {
  _activeStateUnit() {
    return ".dx-toolbar-menu-action:not(.dx-toolbar-hidden-button-group)";
  }
  _initMarkup() {
    this._renderSections();
    super._initMarkup();
    this._setMenuRole();
  }
  _getSections() {
    return this._itemContainer().children();
  }
  _itemElements() {
    return this._getSections().children(this._itemSelector());
  }
  _renderSections() {
    const $container = this._itemContainer();
    each(["before", "center", "after", "menu"], ((_, section) => {
      const sectionName = `_$${section}Section`;
      if (!this[sectionName]) {
        this[sectionName] = renderer_default("<div>").addClass("dx-toolbar-menu-section");
      }
      this[sectionName].appendTo($container);
    }));
  }
  _renderItems(items) {
    super._renderItems(items);
    this._updateSections();
  }
  _setMenuRole() {
    const $menuContainer = this.$element().find(".dx-scrollview-content");
    $menuContainer.attr("role", "menu");
  }
  _updateSections() {
    const $sections = this.$element().find(".dx-toolbar-menu-section");
    $sections.removeClass("dx-toolbar-menu-last-section");
    $sections.not(":empty").eq(-1).addClass("dx-toolbar-menu-last-section");
  }
  _renderItem(index, item, _$container, $itemToReplace) {
    const $container = this[`_$${item.location ?? "menu"}Section`];
    const $itemElement = super._renderItem(index, item, $container, $itemToReplace);
    const itemCssClasses = this._getItemCssClasses(item);
    $itemElement.addClass(itemCssClasses.join(" "));
    return $itemElement;
  }
  _getItemCssClasses(item) {
    const cssClasses = [];
    const actionableComponents = this._getActionableComponents();
    if (this._getItemTemplateName({
      itemData: item
    })) {
      cssClasses.push("dx-toolbar-menu-custom");
    }
    if (!item.location && !item.widget || actionableComponents.some(((component) => component === item.widget))) {
      cssClasses.push("dx-toolbar-menu-action");
    }
    if ("dxButton" === item.widget) {
      cssClasses.push("dx-toolbar-hidden-button");
    }
    if ("dxButtonGroup" === item.widget) {
      cssClasses.push("dx-toolbar-hidden-button-group");
    }
    if (item.cssClass) {
      cssClasses.push(item.cssClass);
    }
    return cssClasses;
  }
  _getActionableComponents() {
    return ["dxButton", "dxButtonGroup"];
  }
  _getItemTemplateName(args) {
    const template = super._getItemTemplateName(args);
    const data = args.itemData;
    const menuTemplate = null === data || void 0 === data ? void 0 : data.menuItemTemplate;
    return menuTemplate ?? template;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _itemClickHandler(e, args, config) {
    if (renderer_default(e.target).closest(".dx-toolbar-menu-action").length) {
      super._itemClickHandler(e, args, config);
    }
  }
  _clean() {
    this._getSections().empty();
    super._clean();
  }
};

// node_modules/devextreme/esm/__internal/ui/toolbar/toolbar.utils.js
var TOOLBAR_ITEMS = ["dxAutocomplete", "dxButton", "dxCheckBox", "dxDateBox", "dxMenu", "dxSelectBox", "dxTabs", "dxTextBox", "dxButtonGroup", "dxDropDownButton"];
var getItemInstance = ($element) => {
  const itemData = null === $element || void 0 === $element ? void 0 : $element.data();
  const dxComponents = null === itemData || void 0 === itemData ? void 0 : itemData.dxComponents;
  const widgetName = null === dxComponents || void 0 === dxComponents ? void 0 : dxComponents[0];
  return widgetName && itemData[widgetName];
};
function toggleItemFocusableElementTabIndex(context, item) {
  var _itemData$options;
  if (!context) {
    return;
  }
  const $item = context._findItemElementByItem(item);
  if (!$item.length) {
    return;
  }
  const itemData = context._getItemData($item);
  const isItemNotFocusable = !!(null !== (_itemData$options = itemData.options) && void 0 !== _itemData$options && _itemData$options.disabled || itemData.disabled || context.option("disabled"));
  const {
    widget
  } = itemData;
  if (widget && TOOLBAR_ITEMS.includes(widget)) {
    const $widget = $item.find(widget.toLowerCase().replace("dx", ".dx-"));
    if ($widget.length) {
      var _itemInstance$_focusT, _itemData$options2;
      const itemInstance = getItemInstance($widget);
      if (!itemInstance) {
        return;
      }
      let $focusTarget = null === (_itemInstance$_focusT = itemInstance._focusTarget) || void 0 === _itemInstance$_focusT ? void 0 : _itemInstance$_focusT.call(itemInstance);
      if ("dxDropDownButton" === widget) {
        var _$focusTarget;
        $focusTarget = null === (_$focusTarget = $focusTarget) || void 0 === _$focusTarget ? void 0 : _$focusTarget.find(".dx-buttongroup");
      } else {
        $focusTarget = $focusTarget ?? renderer_default(itemInstance.element());
      }
      const tabIndex = null === (_itemData$options2 = itemData.options) || void 0 === _itemData$options2 ? void 0 : _itemData$options2.tabIndex;
      if (isItemNotFocusable) {
        $focusTarget.attr("tabIndex", -1);
      } else {
        $focusTarget.attr("tabIndex", tabIndex ?? 0);
      }
    }
  }
}

// node_modules/devextreme/esm/__internal/ui/toolbar/internal/toolbar.menu.js
var DropDownMenu = class extends widget_default {
  _supportedKeys() {
    var _this$_list;
    let extension = {};
    const {
      opened
    } = this.option();
    if (!opened || !(null !== (_this$_list = this._list) && void 0 !== _this$_list && _this$_list.option("focusedElement"))) {
      extension = this._button._supportedKeys();
    }
    return _extends({}, super._supportedKeys(), extension, {
      tab() {
        var _this$_popup;
        null === (_this$_popup = this._popup) || void 0 === _this$_popup || _this$_popup.hide();
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: [],
      dataSource: null,
      itemTemplate: "item",
      activeStateEnabled: true,
      hoverStateEnabled: true,
      opened: false,
      closeOnClick: true,
      useInkRipple: false,
      container: void 0,
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          to: 0
        }
      }
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isMaterialBased(current()),
      options: {
        useInkRipple: true,
        animation: {
          show: {
            type: "pop",
            duration: 200,
            from: {
              scale: 0
            },
            to: {
              scale: 1
            }
          },
          hide: {
            type: "pop",
            duration: 200,
            from: {
              scale: 1
            },
            to: {
              scale: 0
            }
          }
        }
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass("dx-dropdownmenu");
    this._initItemClickAction();
    this._initButtonClickAction();
  }
  _initItemClickAction() {
    this._itemClickAction = this._createActionByOption("onItemClick", {});
  }
  _initButtonClickAction() {
    this._buttonClickAction = this._createActionByOption("onButtonClick", {});
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new ChildDefaultTemplate("content")
    });
    super._initTemplates();
  }
  _initMarkup() {
    this._renderButton();
    super._initMarkup();
  }
  _render() {
    super._render();
    const {
      opened
    } = this.option();
    this.setAria({
      haspopup: true,
      expanded: opened
    });
  }
  _renderContentImpl() {
    const {
      opened
    } = this.option();
    if (opened) {
      this._renderPopup();
    }
  }
  _clean() {
    var _this$_list2, _this$_popup2;
    this._cleanFocusState();
    null === (_this$_list2 = this._list) || void 0 === _this$_list2 || _this$_list2.$element().remove();
    null === (_this$_popup2 = this._popup) || void 0 === _this$_popup2 || _this$_popup2.$element().remove();
    delete this._list;
    delete this._popup;
  }
  _renderButton() {
    const $button = this.$element().addClass("dx-dropdownmenu-button");
    const {
      useInkRipple
    } = this.option();
    this._button = this._createComponent($button, Button, {
      icon: "overflow",
      template: "content",
      stylingMode: isFluent(current()) ? "text" : "contained",
      useInkRipple,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      onClick: (e) => {
        var _this$_buttonClickAct;
        this.option("opened", !this.option("opened"));
        null === (_this$_buttonClickAct = this._buttonClickAction) || void 0 === _this$_buttonClickAct || _this$_buttonClickAct.call(this, e);
      }
    });
  }
  _toggleActiveState($element, value) {
    this._button._toggleActiveState($element[0], value);
  }
  _toggleMenuVisibility(opened) {
    var _this$_popup3, _this$_popup4;
    const state = opened ?? !(null !== (_this$_popup3 = this._popup) && void 0 !== _this$_popup3 && _this$_popup3.option("visible"));
    if (opened) {
      this._renderPopup();
    }
    null === (_this$_popup4 = this._popup) || void 0 === _this$_popup4 || _this$_popup4.toggle(state);
    this.setAria("expanded", state);
  }
  _renderPopup() {
    if (this._$popup) {
      return;
    }
    this._$popup = renderer_default("<div>").appendTo(this.$element());
    const {
      rtlEnabled,
      container,
      animation
    } = this.option();
    this._popup = this._createComponent(this._$popup, m_popup_default, {
      onInitialized(e) {
        const {
          component
        } = e;
        component.$wrapper().addClass("dx-dropdownmenu-popup-wrapper").addClass("dx-dropdownmenu-popup");
      },
      deferRendering: false,
      preventScrollEvents: false,
      _ignorePreventScrollEventsDeprecation: true,
      contentTemplate: (contentElement) => this._renderList(contentElement),
      _ignoreFunctionValueDeprecation: true,
      maxHeight: () => this._getMaxHeight(),
      position: {
        my: "top " + (rtlEnabled ? "left" : "right"),
        at: "bottom " + (rtlEnabled ? "left" : "right"),
        collision: "fit flip",
        offset: {
          v: 3
        },
        of: this.$element()
      },
      animation,
      onOptionChanged: (_ref) => {
        let {
          name,
          value
        } = _ref;
        if ("visible" === name) {
          this.option("opened", value);
        }
      },
      container,
      autoResizeEnabled: false,
      height: "auto",
      width: "auto",
      hideOnOutsideClick: (e) => this._closeOutsideDropDownHandler(e),
      hideOnParentScroll: true,
      shading: false,
      dragEnabled: false,
      showTitle: false,
      fullScreen: false,
      ignoreChildEvents: false,
      _fixWrapperPosition: true
    });
    this._popup.registerKeyHandler("space", ((e) => {
      this._popupKeyHandler(e);
    }));
    this._popup.registerKeyHandler("enter", ((e) => {
      this._popupKeyHandler(e);
    }));
    this._popup.registerKeyHandler("escape", ((e) => {
      var _this$_popup5;
      if (null !== (_this$_popup5 = this._popup) && void 0 !== _this$_popup5 && _this$_popup5.$overlayContent().is(renderer_default(e.target))) {
        this.option("opened", false);
      }
    }));
  }
  _getMaxHeight() {
    var _$element$offset;
    const $element = this.$element();
    const offsetTop = (null === (_$element$offset = $element.offset()) || void 0 === _$element$offset ? void 0 : _$element$offset.top) ?? 0;
    const windowHeight = getOuterHeight(getWindow());
    const maxHeight = Math.max(offsetTop, windowHeight - offsetTop - getOuterHeight($element));
    return Math.min(windowHeight, maxHeight - 3 - 10);
  }
  _closeOutsideDropDownHandler(e) {
    const isOutsideClick = !renderer_default(e.target).closest(this.$element()).length;
    return isOutsideClick;
  }
  _renderList(contentElement) {
    const $content = renderer_default(contentElement);
    $content.addClass("dx-dropdownmenu-list");
    const {
      itemTemplate,
      onItemRendered
    } = this.option();
    this._list = this._createComponent($content, ToolbarMenuList, {
      dataSource: this._getListDataSource(),
      pageLoadMode: "scrollBottom",
      indicateLoading: false,
      noDataText: "",
      itemTemplate,
      onItemClick: (e) => {
        this._itemClickHandler(e);
      },
      tabIndex: -1,
      focusStateEnabled: false,
      activeStateEnabled: true,
      onItemRendered,
      _itemAttributes: {
        role: "menuitem"
      }
    });
  }
  _popupKeyHandler(e) {
    if (renderer_default(e.target).closest(`.${TOOLBAR_MENU_ACTION_CLASS}`).length) {
      this._closePopup();
    }
  }
  _closePopup() {
    const {
      closeOnClick
    } = this.option();
    if (closeOnClick) {
      this.option("opened", false);
    }
  }
  _itemClickHandler(e) {
    var _this$_itemClickActio;
    this._closePopup();
    null === (_this$_itemClickActio = this._itemClickAction) || void 0 === _this$_itemClickActio || _this$_itemClickActio.call(this, e);
  }
  _itemOptionChanged(item, property, value) {
    var _this$_list3;
    null === (_this$_list3 = this._list) || void 0 === _this$_list3 || _this$_list3._itemOptionChanged(item, property, value);
    toggleItemFocusableElementTabIndex(this._list, item);
  }
  _getListDataSource() {
    const {
      dataSource,
      items = []
    } = this.option();
    return dataSource ?? items;
  }
  _setListDataSource() {
    var _this$_list4;
    null === (_this$_list4 = this._list) || void 0 === _this$_list4 || _this$_list4.option("dataSource", this._getListDataSource());
    delete this._deferRendering;
  }
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat([this._list]);
  }
  _toggleVisibility(visible) {
    var _this$_button;
    super._toggleVisibility(visible);
    null === (_this$_button = this._button) || void 0 === _this$_button || _this$_button.option("visible", visible);
  }
  _optionChanged(args) {
    var _this$_list5, _this$_list6, _this$_list7, _this$_popup6;
    const {
      name,
      value
    } = args;
    switch (name) {
      case "items":
      case "dataSource":
        if (!this.option("opened")) {
          this._deferRendering = true;
        } else {
          this._setListDataSource();
        }
        break;
      case "itemTemplate":
        null === (_this$_list5 = this._list) || void 0 === _this$_list5 || _this$_list5.option(name, this._getTemplate(value));
        break;
      case "onItemClick":
        this._initItemClickAction();
        break;
      case "onButtonClick":
        this._initButtonClickAction();
        break;
      case "useInkRipple":
        this._invalidate();
        break;
      case "focusStateEnabled":
        null === (_this$_list6 = this._list) || void 0 === _this$_list6 || _this$_list6.option(name, value);
        super._optionChanged(args);
        break;
      case "onItemRendered":
        null === (_this$_list7 = this._list) || void 0 === _this$_list7 || _this$_list7.option(name, value);
        break;
      case "opened":
        if (this._deferRendering) {
          this._setListDataSource();
        }
        this._toggleMenuVisibility(value);
        this._updateFocusableItemsTabIndex();
        break;
      case "closeOnClick":
        break;
      case "container":
        null === (_this$_popup6 = this._popup) || void 0 === _this$_popup6 || _this$_popup6.option(name, value);
        break;
      case "disabled":
        if (this._list) {
          this._updateFocusableItemsTabIndex();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
  _updateFocusableItemsTabIndex() {
    const {
      items = []
    } = this.option();
    items.forEach(((item) => toggleItemFocusableElementTabIndex(this._list, item)));
  }
};

// node_modules/devextreme/esm/__internal/ui/toolbar/strategy/toolbar.singleline.js
var TOOLBAR_HIDDEN_ITEM = "dx-toolbar-item-invisible";
var SingleLineStrategy = class {
  constructor(toolbar) {
    this._restoreItems = [];
    this._toolbar = toolbar;
  }
  _initMarkup() {
    deferRender((() => {
      this._renderOverflowMenu();
      this._renderMenuItems();
    }));
  }
  _renderOverflowMenu() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }
    this._renderMenuButtonContainer();
    const $menu = renderer_default("<div>").appendTo(this._overflowMenuContainer());
    const itemClickAction = this._toolbar._createActionByOption("onItemClick");
    const menuItemTemplate = this._toolbar._getTemplateByOption("menuItemTemplate");
    const {
      disabled,
      menuContainer
    } = this._toolbar.option();
    this._menu = this._toolbar._createComponent($menu, DropDownMenu, {
      disabled,
      itemTemplate: () => menuItemTemplate,
      onItemClick: (e) => {
        itemClickAction(e);
      },
      container: menuContainer,
      onOptionChanged: (_ref) => {
        let {
          name,
          value
        } = _ref;
        if ("opened" === name) {
          this._toolbar.option("overflowMenuVisible", value);
        }
        if ("items" === name) {
          this._updateMenuVisibility(value);
        }
      }
    });
  }
  renderMenuItems() {
    if (!this._menu) {
      this._renderOverflowMenu();
    }
    if (this._menu) {
      this._menu.option("items", this._getMenuItems());
      const {
        items = []
      } = this._menu.option();
      if (!items.length) {
        this._menu.option("opened", false);
      }
    }
  }
  _renderMenuButtonContainer() {
    this._$overflowMenuContainer = renderer_default("<div>").appendTo(this._toolbar._$afterSection).addClass("dx-toolbar-button").addClass("dx-toolbar-menu-container");
  }
  _overflowMenuContainer() {
    return this._$overflowMenuContainer;
  }
  _updateMenuVisibility(menuItems) {
    const items = menuItems ?? this._getMenuItems();
    const isMenuVisible = items.length && this._hasVisibleMenuItems(items);
    this._toggleMenuVisibility(!!isMenuVisible);
  }
  _toggleMenuVisibility(value) {
    if (!this._overflowMenuContainer()) {
      return;
    }
    this._overflowMenuContainer().toggleClass("dx-state-invisible", !value);
  }
  _renderMenuItems() {
    deferRender((() => {
      this.renderMenuItems();
    }));
  }
  _dimensionChanged() {
    this.renderMenuItems();
  }
  _getToolbarItems() {
    const {
      items = []
    } = this._toolbar.option();
    return items.filter(((item) => !this._toolbar._isMenuItem(item)));
  }
  _getHiddenItems() {
    return this._toolbar._itemContainer().children(`.dx-toolbar-item-auto-hide.${TOOLBAR_HIDDEN_ITEM}`).not(".dx-state-invisible");
  }
  _getMenuItems() {
    const {
      items = []
    } = this._toolbar.option();
    const menuItems = items.filter(((item) => this._toolbar._isMenuItem(item)));
    const $hiddenItems = this._getHiddenItems();
    this._restoreItems = this._restoreItems ?? [];
    const overflowItems = [].slice.call($hiddenItems).map(((hiddenItem) => {
      const itemData = this._toolbar._getItemData(hiddenItem);
      const $itemContainer = renderer_default(hiddenItem);
      const $itemMarkup = $itemContainer.children();
      return _extends({
        menuItemTemplate: () => {
          this._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });
          const $container = renderer_default("<div>").addClass("dx-toolbar-item-auto-hide");
          return $container.append($itemMarkup);
        }
      }, itemData);
    }));
    return [...overflowItems, ...menuItems];
  }
  _hasVisibleMenuItems(items) {
    const menuItems = items ?? this._toolbar.option("items");
    let result = false;
    const optionGetter = compileGetter("visible");
    const overflowGetter = compileGetter("locateInMenu");
    each(menuItems, ((index, item) => {
      const itemVisible = optionGetter(item, {
        functionsAsIs: true
      });
      const itemOverflow = overflowGetter(item, {
        functionsAsIs: true
      });
      if (false !== itemVisible && ("auto" === itemOverflow || "always" === itemOverflow)) {
        result = true;
      }
    }));
    return result;
  }
  _arrangeItems() {
    this._toolbar._$centerSection.css({
      margin: "0 auto",
      float: "none"
    });
    each(this._restoreItems ?? [], ((_, obj) => {
      renderer_default(obj.container).append(obj.item);
    }));
    this._restoreItems = [];
    const elementWidth = getWidth(this._toolbar.$element());
    this._hideOverflowItems(elementWidth);
    return elementWidth;
  }
  _hideOverflowItems(width) {
    const overflowItems = this._toolbar.$element().find(".dx-toolbar-item-auto-hide");
    if (!overflowItems.length) {
      return;
    }
    const elementWidth = width ?? getWidth(this._toolbar.$element());
    renderer_default(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
    let itemsWidth = this._getItemsWidth();
    while (overflowItems.length && elementWidth < itemsWidth) {
      const $item = overflowItems.eq(-1);
      $item.addClass(TOOLBAR_HIDDEN_ITEM);
      itemsWidth = this._getItemsWidth();
      [].splice.apply(overflowItems, [-1, 1]);
    }
  }
  _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize("width", [this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
  }
  _itemOptionChanged(item, property, value) {
    if ("disabled" === property || "options.disabled" === property) {
      if (this._toolbar._isMenuItem(item)) {
        var _this$_menu;
        null === (_this$_menu = this._menu) || void 0 === _this$_menu || _this$_menu._itemOptionChanged(item, "disabled", value);
        return;
      }
    }
    this.renderMenuItems();
  }
  _renderItem(item, $itemElement) {
    if ("auto" === item.locateInMenu) {
      $itemElement.addClass("dx-toolbar-item-auto-hide");
    }
  }
  _optionChanged(name, value) {
    var _this$_menu2, _this$_menu3, _this$_menu4, _this$_menu5, _this$_menu6;
    switch (name) {
      case "disabled":
        null === (_this$_menu2 = this._menu) || void 0 === _this$_menu2 || _this$_menu2.option(name, value);
        break;
      case "overflowMenuVisible":
        null === (_this$_menu3 = this._menu) || void 0 === _this$_menu3 || _this$_menu3.option("opened", value);
        break;
      case "onItemClick":
        null === (_this$_menu4 = this._menu) || void 0 === _this$_menu4 || _this$_menu4.option(name, value);
        break;
      case "menuContainer":
        null === (_this$_menu5 = this._menu) || void 0 === _this$_menu5 || _this$_menu5.option("container", value);
        break;
      case "menuItemTemplate":
        null === (_this$_menu6 = this._menu) || void 0 === _this$_menu6 || _this$_menu6.option("itemTemplate", value);
    }
  }
};

// node_modules/devextreme/esm/__internal/ui/toolbar/toolbar.js
var Toolbar = class extends toolbar_base_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      menuItemTemplate: "menuItem",
      overflowMenuVisible: false,
      multiline: false
    });
  }
  _isMultiline() {
    const {
      multiline
    } = this.option();
    return multiline;
  }
  _dimensionChanged(dimension) {
    if ("height" === dimension) {
      return;
    }
    super._dimensionChanged();
    this._layoutStrategy._dimensionChanged();
  }
  _initMarkup() {
    super._initMarkup();
    this._updateFocusableItemsTabIndex();
    this._layoutStrategy._initMarkup();
  }
  _renderToolbar() {
    super._renderToolbar();
    this._renderLayoutStrategy();
  }
  _itemContainer() {
    if (this._isMultiline()) {
      return this._$toolbarItemsContainer;
    }
    return super._itemContainer();
  }
  _renderLayoutStrategy() {
    this.$element().toggleClass("dx-toolbar-multiline", this._isMultiline());
    this._layoutStrategy = this._isMultiline() ? new MultiLineStrategy(this) : new SingleLineStrategy(this);
  }
  _renderSections() {
    if (this._isMultiline()) {
      return;
    }
    super._renderSections();
  }
  _postProcessRenderItems() {
    this._layoutStrategy._hideOverflowItems();
    this._layoutStrategy._updateMenuVisibility();
    super._postProcessRenderItems();
    this._layoutStrategy._renderMenuItems();
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemElement = super._renderItem(index, itemData, $container, $itemToReplace);
    this._layoutStrategy._renderItem(itemData, $itemElement);
    const {
      widget,
      showText
    } = itemData;
    if ("dxButton" === widget && "inMenu" === showText) {
      $itemElement.toggleClass("dx-toolbar-text-auto-hide");
    }
    return $itemElement;
  }
  _getItemsWidth() {
    return this._layoutStrategy._getItemsWidth();
  }
  _getMenuItems() {
    return this._layoutStrategy._getMenuItems();
  }
  _getToolbarItems() {
    return this._layoutStrategy._getToolbarItems();
  }
  _arrangeItems() {
    if (this.$element().is(":hidden")) {
      return;
    }
    const elementWidth = this._layoutStrategy._arrangeItems();
    if (!this._isMultiline()) {
      super._arrangeItems(elementWidth);
    }
  }
  _itemOptionChanged(item, property, value, prevValue) {
    if (!this._isMenuItem(item)) {
      super._itemOptionChanged(item, property, value, prevValue);
    }
    this._layoutStrategy._itemOptionChanged(item, property, value);
    if ("disabled" === property || "options.disabled" === property) {
      toggleItemFocusableElementTabIndex(this, item);
    }
    if ("location" === property) {
      this.repaint();
    }
  }
  _updateFocusableItemsTabIndex() {
    this._getToolbarItems().forEach(((item) => toggleItemFocusableElementTabIndex(this, item)));
  }
  _isMenuItem(itemData) {
    return "always" === itemData.locateInMenu;
  }
  _isToolbarItem(itemData) {
    return void 0 === itemData.location || "never" === itemData.locateInMenu;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    this._layoutStrategy._optionChanged(name, value);
    switch (name) {
      case "menuContainer":
      case "menuItemTemplate":
      case "overflowMenuVisible":
        break;
      case "multiline":
        this._invalidate();
        break;
      case "disabled":
        super._optionChanged(args);
        this._updateFocusableItemsTabIndex();
        break;
      default:
        super._optionChanged(args);
    }
  }
  updateDimensions() {
    this._dimensionChanged();
  }
};
component_registrator_default("dxToolbar", Toolbar);
var toolbar_default = Toolbar;

// node_modules/devextreme/esm/ui/toolbar/ui.toolbar.js
var ui_toolbar_default = toolbar_default;

// node_modules/devextreme/esm/ui/toolbar.js
var toolbar_default2 = ui_toolbar_default;

export {
  toolbar_default2 as toolbar_default
};
//# sourceMappingURL=chunk-CUMO577X.js.map
