import {
  DxiListButtonModule,
  DxiListItemModule,
  DxiListMenuItemModule,
  DxoListCursorOffsetModule,
  DxoListItemDraggingModule,
  DxoListOptionsModule,
  DxoListSearchEditorOptionsModule
} from "./chunk-TOGINMFO.js";
import {
  m_sortable_default
} from "./chunk-FFMEWCSQ.js";
import {
  list_edit_decorator_default
} from "./chunk-O4CT4SVL.js";
import {
  list_edit_search_default,
  register
} from "./chunk-DHHSGAOU.js";
import {
  ListBase,
  m_popup_default
} from "./chunk-GQ5A5LDB.js";
import {
  BindableTemplate,
  collection_widget_edit_default,
  m_hold_default
} from "./chunk-EGHIGSYM.js";
import {
  DxiButtonModule,
  DxiItemModule,
  DxiMenuItemModule,
  DxoCursorOffsetModule,
  DxoItemDraggingModule,
  DxoOptionsModule,
  DxoSearchEditorOptionsModule
} from "./chunk-PRGABLET.js";
import {
  Button,
  button_default
} from "./chunk-UQXIHJH2.js";
import {
  message_default
} from "./chunk-XULD25K2.js";
import {
  current,
  isMaterial,
  isMaterialBased
} from "./chunk-BBLJGJFI.js";
import {
  PROPERTY_TOKEN_buttons,
  PROPERTY_TOKEN_items,
  PROPERTY_TOKEN_menuItems
} from "./chunk-QTDRYW7W.js";
import {
  OverlayPositionController,
  overlay_default
} from "./chunk-MJRE2EKH.js";
import {
  ACTIVE_EVENT_NAME,
  CLICK_EVENT_NAME,
  addNamespace,
  component_registrator_default,
  fx_default,
  getBoundingRect,
  getPublicElement,
  isMouseEvent,
  locate,
  m_pointer_default,
  move,
  position_default
} from "./chunk-54SHI7Z2.js";
import {
  fitIntoRange,
  ui_errors_default
} from "./chunk-A3D3LIWG.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  IterableDifferHelper,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-N6JIRJK4.js";
import {
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  renderer_default,
  setHeight,
  setWidth
} from "./chunk-3GE2VGI4.js";
import {
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  TransferState,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-GBBTBBS3.js";
import {
  m_events_engine_default
} from "./chunk-4JX72F7N.js";
import {
  Deferred,
  _extends,
  dom_adapter_default,
  extend,
  getWindow,
  hasWindow,
  isDefined,
  isObject,
  isString,
  noop,
  pairToObject
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/ui/list_light.js
var list_light_default = list_edit_search_default;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.context.js
var CONTEXTMENU_CLASS = "dx-list-context-menu";
var EditDecoratorContext = class extends list_edit_decorator_default {
  _init() {
    const $menu = renderer_default("<div>").addClass(CONTEXTMENU_CLASS);
    this._list.$element().append($menu);
    this._menu = this._renderOverlay($menu);
  }
  _renderOverlay($element) {
    return this._list._createComponent($element, overlay_default, {
      shading: false,
      deferRendering: true,
      hideOnParentScroll: true,
      hideOnOutsideClick: (e) => !renderer_default(e.target).closest(`.${CONTEXTMENU_CLASS}`).length,
      animation: {
        show: {
          type: "slide",
          duration: 300,
          from: {
            height: 0,
            opacity: 1
          },
          to: {
            height: () => getOuterHeight(this._$menuList),
            opacity: 1
          }
        },
        hide: {
          type: "slide",
          duration: 0,
          from: {
            opacity: 1
          },
          to: {
            opacity: 0
          }
        }
      },
      _ignoreFunctionValueDeprecation: true,
      height: () => this._$menuList ? getOuterHeight(this._$menuList) : 0,
      width: () => getOuterWidth(this._list.$element()),
      onContentReady: (e) => {
        this._renderMenuContent(e);
      }
    });
  }
  _renderMenuContent(e) {
    const $overlayContent = renderer_default(e.component.content());
    const {
      menuItems = [],
      allowItemDeleting
    } = this._list.option();
    const items = menuItems.slice();
    if (allowItemDeleting) {
      items.push({
        text: message_default.format("dxListEditDecorator-delete"),
        action: this._deleteItem.bind(this)
      });
    }
    this._$menuList = renderer_default("<div>");
    this._list._createComponent(this._$menuList, ListBase, {
      items,
      onItemClick: (event) => {
        this._menuItemClickHandler(event);
      },
      height: "auto",
      integrationOptions: {}
    });
    $overlayContent.addClass("dx-list-context-menucontent");
    $overlayContent.append(this._$menuList);
  }
  _menuItemClickHandler(e) {
    this._menu.hide();
    this._list._itemEventHandlerByHandler(renderer_default(this._$itemWithMenu), e.itemData.action, {}, {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _deleteItem() {
    if (!this._$itemWithMenu) {
      return;
    }
    this._list.deleteItem(this._$itemWithMenu.get(0));
  }
  handleContextMenu($itemElement) {
    this._$itemWithMenu = $itemElement;
    this._menu.option({
      position: {
        my: "top",
        at: "bottom",
        of: $itemElement,
        collision: "flip"
      }
    });
    this._menu.show();
    return true;
  }
  dispose() {
    if (this._menu) {
      this._menu.$element().remove();
    }
    super.dispose();
  }
};
register("menu", "context", EditDecoratorContext);

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.switchable.js
var LIST_EDIT_DECORATOR = "dxListEditDecorator";
var POINTER_DOWN_EVENT_NAME = addNamespace(m_pointer_default.down, LIST_EDIT_DECORATOR);
var ACTIVE_EVENT_NAME2 = addNamespace(ACTIVE_EVENT_NAME, LIST_EDIT_DECORATOR);
var SWITCHABLE_DELETE_READY_CLASS = "dx-list-switchable-delete-ready";
var SWITCHABLE_MENU_SHIELD_POSITIONING_CLASS = "dx-list-switchable-menu-shield-positioning";
var SWITCHABLE_DELETE_TOP_SHIELD_CLASS = "dx-list-switchable-delete-top-shield";
var SWITCHABLE_DELETE_BOTTOM_SHIELD_CLASS = "dx-list-switchable-delete-bottom-shield";
var SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS = "dx-list-switchable-menu-item-shield-positioning";
var SWITCHABLE_DELETE_ITEM_CONTENT_SHIELD_CLASS = "dx-list-switchable-delete-item-content-shield";
var SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-switchable-delete-button-container";
var SwitchableEditDecorator = class extends list_edit_decorator_default {
  _init() {
    this._$topShield = renderer_default("<div>").addClass(SWITCHABLE_DELETE_TOP_SHIELD_CLASS);
    this._$bottomShield = renderer_default("<div>").addClass(SWITCHABLE_DELETE_BOTTOM_SHIELD_CLASS);
    this._$itemContentShield = renderer_default("<div>").addClass(SWITCHABLE_DELETE_ITEM_CONTENT_SHIELD_CLASS);
    m_events_engine_default.on(this._$topShield, POINTER_DOWN_EVENT_NAME, (() => {
      this._cancelDeleteReadyItem();
    }));
    m_events_engine_default.on(this._$bottomShield, POINTER_DOWN_EVENT_NAME, (() => {
      this._cancelDeleteReadyItem();
    }));
    this._list.$element().append(this._$topShield.toggle(false)).append(this._$bottomShield.toggle(false));
  }
  handleClick(_$itemElement, _e) {
    return this._cancelDeleteReadyItem();
  }
  _cancelDeleteReadyItem() {
    if (!this._$readyToDeleteItem) {
      return false;
    }
    this._cancelDelete(this._$readyToDeleteItem);
    return true;
  }
  _cancelDelete($itemElement) {
    this._toggleDeleteReady($itemElement, false);
  }
  _toggleDeleteReady($itemElement, readyToDelete) {
    const isReadyToDelete = readyToDelete ?? !this._isReadyToDelete($itemElement);
    this._toggleShields($itemElement, isReadyToDelete);
    this._toggleScrolling(isReadyToDelete);
    this._cacheReadyToDeleteItem($itemElement, isReadyToDelete);
    this._animateToggleDelete($itemElement, isReadyToDelete);
  }
  _isReadyToDelete($itemElement) {
    return $itemElement.hasClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _toggleShields($itemElement, enabled) {
    this._list.$element().toggleClass(SWITCHABLE_MENU_SHIELD_POSITIONING_CLASS, enabled);
    this._$topShield.toggle(enabled);
    this._$bottomShield.toggle(enabled);
    if (enabled) {
      this._updateShieldsHeight($itemElement);
    }
    this._toggleContentShield($itemElement, enabled);
  }
  _updateShieldsHeight($itemElement) {
    var _$list$offset, _$itemElement$offset;
    const $list = this._list.$element();
    const listTopOffset = (null === (_$list$offset = $list.offset()) || void 0 === _$list$offset ? void 0 : _$list$offset.top) ?? 0;
    const listHeight = getOuterHeight($list);
    const itemTopOffset = (null === (_$itemElement$offset = $itemElement.offset()) || void 0 === _$itemElement$offset ? void 0 : _$itemElement$offset.top) ?? 0;
    const itemHeight = getOuterHeight($itemElement);
    const dirtyTopShieldHeight = itemTopOffset - listTopOffset;
    const dirtyBottomShieldHeight = listHeight - itemHeight - dirtyTopShieldHeight;
    setHeight(this._$topShield, Math.max(dirtyTopShieldHeight, 0));
    setHeight(this._$bottomShield, Math.max(dirtyBottomShieldHeight, 0));
  }
  _toggleContentShield($itemElement, enabled) {
    if (enabled) {
      $itemElement.find(".dx-list-item-content").first().append(this._$itemContentShield);
    } else {
      this._$itemContentShield.detach();
    }
  }
  _toggleScrolling(readyToDelete) {
    const scrollView = this._list._scrollView;
    if (readyToDelete) {
      scrollView.on("start", this._cancelScrolling);
    } else {
      scrollView.off("start", this._cancelScrolling);
    }
  }
  _cancelScrolling(args) {
    if (args.event) {
      args.event.cancel = true;
    }
  }
  _cacheReadyToDeleteItem($itemElement, cache) {
    if (cache) {
      this._$readyToDeleteItem = $itemElement;
    } else {
      delete this._$readyToDeleteItem;
    }
  }
  _animateToggleDelete($itemElement, readyToDelete) {
    if (readyToDelete) {
      this._enablePositioning($itemElement);
      this._prepareDeleteReady($itemElement);
      this._animatePrepareDeleteReady($itemElement);
      m_events_engine_default.off($itemElement, m_pointer_default.up);
    } else {
      this._forgetDeleteReady($itemElement);
      this._animateForgetDeleteReady($itemElement).done(this._disablePositioning.bind(this, $itemElement));
    }
  }
  _enablePositioning($itemElement) {
    $itemElement.addClass(SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS);
    m_events_engine_default.on($itemElement, ACTIVE_EVENT_NAME2, noop);
    m_events_engine_default.one($itemElement, m_pointer_default.up, this._disablePositioning.bind(this, $itemElement));
  }
  _disablePositioning($itemElement) {
    $itemElement.removeClass(SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS);
    m_events_engine_default.off($itemElement, ACTIVE_EVENT_NAME2);
  }
  _prepareDeleteReady($itemElement) {
    $itemElement.addClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _forgetDeleteReady($itemElement) {
    $itemElement.removeClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _getDeleteButtonContainer($itemElement) {
    const $element = $itemElement || this._$readyToDeleteItem;
    return $element.children(`.${SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS}`);
  }
  _deleteItem($itemElement) {
    const $element = $itemElement ?? this._$readyToDeleteItem;
    if (!$element) {
      return;
    }
    this._getDeleteButtonContainer($element).detach();
    if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
      return;
    }
    this._list.deleteItem($element.get(0)).always(this._cancelDelete.bind(this, $element));
  }
  _isRtlEnabled() {
    const {
      rtlEnabled = false
    } = this._list.option();
    return rtlEnabled;
  }
  dispose() {
    if (this._$topShield) {
      this._$topShield.remove();
    }
    if (this._$bottomShield) {
      this._$bottomShield.remove();
    }
    super.dispose();
  }
};
var list_edit_decorator_switchable_default = SwitchableEditDecorator;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.switchable.button.js
var SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS2 = "dx-list-switchable-delete-button-container";
var SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = "dx-list-switchable-delete-button-wrapper";
var SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = "dx-list-switchable-delete-button-inner-wrapper";
var SWITCHABLE_DELETE_BUTTON_CLASS = "dx-list-switchable-delete-button";
var SwitchableButtonEditDecorator = class extends list_edit_decorator_switchable_default {
  _init() {
    super._init();
    const $buttonContainer = renderer_default("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS2);
    const $buttonWrapper = renderer_default("<div>").addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
    const $buttonInnerWrapper = renderer_default("<div>").addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
    const $button = renderer_default("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, button_default, {
      text: message_default.format("dxListEditDecorator-delete"),
      type: "danger",
      stylingMode: isMaterialBased(current()) ? "text" : "contained",
      onClick: (e) => {
        this._deleteItem();
        const {
          event
        } = e;
        null === event || void 0 === event || event.stopPropagation();
      },
      integrationOptions: {},
      elementAttr: {
        role: null,
        "aria-label": null
      },
      tabIndex: -1
    });
    $buttonContainer.append($buttonWrapper);
    $buttonWrapper.append($buttonInnerWrapper);
    $buttonInnerWrapper.append($button);
    this._$buttonContainer = $buttonContainer;
  }
  _enablePositioning($itemElement) {
    super._enablePositioning($itemElement);
    fx_default.stop(this._$buttonContainer.get(0), true);
    this._$buttonContainer.appendTo($itemElement);
  }
  _disablePositioning($itemElement) {
    if ($itemElement) {
      super._disablePositioning($itemElement);
    }
    this._$buttonContainer.detach();
  }
  _animatePrepareDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = getWidth(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth : -buttonWidth;
    const toValue = rtl ? listWidth - buttonWidth : 0;
    return fx_default.animate(this._$buttonContainer.get(0), {
      type: "custom",
      duration: 200,
      from: {
        right: fromValue
      },
      to: {
        right: toValue
      }
    });
  }
  _animateForgetDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = getWidth(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth - buttonWidth : 0;
    const toValue = rtl ? listWidth : -buttonWidth;
    return fx_default.animate(this._$buttonContainer.get(0), {
      type: "custom",
      duration: 200,
      from: {
        right: fromValue
      },
      to: {
        right: toValue
      }
    });
  }
  _buttonWidth() {
    if (!this._buttonContainerWidth) {
      this._buttonContainerWidth = getOuterWidth(this._$buttonContainer);
    }
    return this._buttonContainerWidth;
  }
  dispose() {
    if (this._$buttonContainer) {
      this._$buttonContainer.remove();
    }
    super.dispose();
  }
};
var TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = "dx-list-toggle-delete-switch-container";
var TOGGLE_DELETE_SWITCH_CLASS = "dx-list-toggle-delete-switch";
var SwitchableButtonToggleEditDecorator = class extends SwitchableButtonEditDecorator {
  beforeBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $toggle = renderer_default("<div>").addClass(TOGGLE_DELETE_SWITCH_CLASS);
    this._list._createComponent($toggle, button_default, {
      icon: "toggle-delete",
      onClick: (e) => {
        var _e$event;
        fx_default.stop(this._$buttonContainer.get(0), false);
        this._toggleDeleteReady($itemElement);
        null === (_e$event = e.event) || void 0 === _e$event || _e$event.stopPropagation();
      },
      integrationOptions: {},
      elementAttr: {
        role: null,
        "aria-label": null
      },
      tabIndex: -1
    });
    $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
    $container.append($toggle);
  }
};
register("delete", "toggle", SwitchableButtonToggleEditDecorator);
var SwitchableButtonSlideEditDecorator = class extends SwitchableButtonEditDecorator {
  _shouldHandleSwipe() {
    return true;
  }
  _swipeEndHandler($itemElement, args) {
    if (0 !== args.targetOffset) {
      fx_default.stop(this._$buttonContainer.get(0), false);
      this._toggleDeleteReady($itemElement);
    }
  }
};
register("delete", "slideButton", SwitchableButtonSlideEditDecorator);

// node_modules/devextreme/esm/__internal/ui/resizable/utils.js
var borderWidthStyles = {
  left: "borderLeftWidth",
  top: "borderTopWidth",
  right: "borderRightWidth",
  bottom: "borderBottomWidth"
};

// node_modules/devextreme/esm/__internal/ui/popover/popover_position_controller.js
var WEIGHT_OF_SIDES = {
  left: -1,
  top: -1,
  center: 0,
  right: 1,
  bottom: 1
};
var POPOVER_POSITION_ALIASES = {
  top: {
    my: "bottom center",
    at: "top center",
    collision: "fit flip"
  },
  bottom: {
    my: "top center",
    at: "bottom center",
    collision: "fit flip"
  },
  right: {
    my: "left center",
    at: "right center",
    collision: "flip fit"
  },
  left: {
    my: "right center",
    at: "left center",
    collision: "flip fit"
  }
};
var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 10
};
var isCommonPosition = (position) => isString(position);
var PopoverPositionController = class extends OverlayPositionController {
  constructor(params) {
    super(params);
    const superProperties = this._properties;
    const {
      properties,
      elements
    } = params;
    const {
      shading,
      target
    } = properties;
    const {
      $arrow
    } = elements;
    this._properties = _extends({}, superProperties, {
      shading,
      target
    });
    this._$arrow = $arrow;
    this._positionSide = void 0;
    this.updatePosition(this._properties.position);
  }
  positionWrapper() {
    if (this._properties.shading) {
      var _this$_$wrapper;
      null === (_this$_$wrapper = this._$wrapper) || void 0 === _this$_$wrapper || _this$_$wrapper.css({
        top: 0,
        left: 0
      });
    }
  }
  updateTarget(target) {
    this._properties.target = target;
    this.updatePosition(this._properties.position);
  }
  _renderBoundaryOffset() {
  }
  _getContainerPosition() {
    var _this$_position;
    const offset = pairToObject((null === (_this$_position = this._position) || void 0 === _this$_position ? void 0 : _this$_position.offset) ?? "");
    let {
      h: hOffset,
      v: vOffset
    } = offset;
    const isVerticalSide = this._isVerticalSide();
    const isHorizontalSide = this._isHorizontalSide();
    if (isVerticalSide || isHorizontalSide) {
      const isPopoverInside = this._isPopoverInside();
      const weightOfSide = this._positionSide ? WEIGHT_OF_SIDES[this._positionSide] : WEIGHT_OF_SIDES.center;
      const sign = (isPopoverInside ? -1 : 1) * weightOfSide;
      const arrowSize = isVerticalSide ? getHeight(this._$arrow) : getWidth(this._$arrow);
      const arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
      const arrowOffset = sign * (arrowSize - arrowSizeCorrection);
      if (isVerticalSide) {
        vOffset += arrowOffset;
      } else {
        hOffset += arrowOffset;
      }
    }
    const position = _extends({}, this._position, {
      offset: `${hOffset} ${vOffset}`
    });
    return position;
  }
  _getContentBorderWidth(side) {
    var _this$_$content;
    const borderWidth = side ? (null === (_this$_$content = this._$content) || void 0 === _this$_$content ? void 0 : _this$_$content.css(borderWidthStyles[side])) ?? "" : "";
    return parseInt(borderWidth, 10) || 0;
  }
  _isPopoverInside() {
    var _this$_position2, _this$_position3;
    const my = position_default.setup.normalizeAlign(null === (_this$_position2 = this._position) || void 0 === _this$_position2 ? void 0 : _this$_position2.my);
    const at = position_default.setup.normalizeAlign(null === (_this$_position3 = this._position) || void 0 === _this$_position3 ? void 0 : _this$_position3.at);
    return my.h === at.h && my.v === at.v;
  }
  _isVerticalSide() {
    let side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
    return "top" === side || "bottom" === side;
  }
  _isHorizontalSide() {
    let side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
    return "left" === side || "right" === side;
  }
  _getDisplaySide(position) {
    const my = position_default.setup.normalizeAlign(position.my);
    const at = position_default.setup.normalizeAlign(position.at);
    const weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
    const horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
    const verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
    return horizontalWeight > verticalWeight ? at.h : at.v;
  }
  _normalizePosition(position) {
    const defaultPositionConfig = {
      of: this._properties.target,
      boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
    };
    const positionObject = isDefined(position) ? this._positionToObject(position) : {};
    const resultPosition = extend(true, {}, defaultPositionConfig, positionObject);
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }
  _positionToObject(position) {
    if (isCommonPosition(position)) {
      const configuration = _extends({}, POPOVER_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
};

// node_modules/devextreme/esm/__internal/ui/popover/m_popover.js
var POSITION_FLIP_MAP = {
  left: "right",
  top: "bottom",
  right: "left",
  bottom: "top",
  center: "center"
};
var Popover = class extends m_popup_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      shading: false,
      position: extend({}, POPOVER_POSITION_ALIASES.bottom),
      hideOnOutsideClick: true,
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0
        }
      },
      showTitle: false,
      width: "auto",
      height: "auto",
      dragEnabled: false,
      resizeEnabled: false,
      fullScreen: false,
      hideOnParentScroll: true,
      arrowPosition: "",
      arrowOffset: 0,
      _fixWrapperPosition: true
    });
  }
  _defaultOptionsRules() {
    return [{
      device: {
        platform: "ios"
      },
      options: {
        arrowPosition: {
          boundaryOffset: {
            h: 20,
            v: -10
          },
          collision: "fit"
        }
      }
    }, {
      device: () => !hasWindow(),
      options: {
        animation: null
      }
    }, {
      device: () => isMaterialBased(),
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device: () => isMaterial(),
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }];
  }
  _init() {
    super._init();
    this._renderArrow();
    this._timeouts = {};
    this.$element().addClass("dx-popover");
    this.$wrapper().addClass("dx-popover-wrapper");
    const {
      toolbarItems
    } = this.option();
    const isInteractive = null === toolbarItems || void 0 === toolbarItems ? void 0 : toolbarItems.length;
    this.setAria("role", isInteractive ? "dialog" : "tooltip");
  }
  _render() {
    super._render.apply(this, arguments);
    this._detachEvents(this.option("target"));
    this._attachEvents();
  }
  _detachEvents(target) {
    this._detachEvent(target, "show");
    this._detachEvent(target, "hide");
  }
  _attachEvents() {
    this._attachEvent("show");
    this._attachEvent("hide");
  }
  _createEventHandler(name) {
    const action = this._createAction((() => {
      const delay = this._getEventDelay(`${name}Event`);
      this._clearEventsTimeouts();
      if (delay) {
        this._timeouts[name] = setTimeout((() => {
          this[name]();
        }), delay);
      } else {
        this[name]();
      }
    }), {
      validatingTargetName: "target"
    });
    return (e) => {
      action({
        event: e,
        target: renderer_default(e.currentTarget)
      });
    };
  }
  _attachEvent(name) {
    const {
      target,
      shading,
      disabled,
      hideEvent
    } = this.option();
    const shouldIgnoreHideEvent = shading && "hide" === name;
    if (shouldIgnoreHideEvent && hideEvent) {
      ui_errors_default.log("W1020");
    }
    const event = shouldIgnoreHideEvent ? null : this._getEventName(`${name}Event`);
    if (!event || disabled) {
      return;
    }
    const EVENT_HANDLER_NAME = this._getEventHandlerName(name);
    this[EVENT_HANDLER_NAME] = this._createEventHandler(name);
    const eventName = addNamespace(event, this.NAME);
    const isSelector = isString(target);
    if (isSelector) {
      m_events_engine_default.on(dom_adapter_default.getDocument(), eventName, target, this[EVENT_HANDLER_NAME]);
    } else {
      m_events_engine_default.on(getPublicElement(renderer_default(target)), eventName, this[EVENT_HANDLER_NAME]);
    }
  }
  _detachEvent(target, name, event) {
    let eventName = event || this._getEventName(`${name}Event`);
    if (!eventName) {
      return;
    }
    eventName = addNamespace(eventName, this.NAME);
    const EVENT_HANDLER_NAME = this._getEventHandlerName(name);
    const isSelector = isString(target);
    if (isSelector) {
      m_events_engine_default.off(dom_adapter_default.getDocument(), eventName, target, this[EVENT_HANDLER_NAME]);
    } else {
      m_events_engine_default.off(getPublicElement(renderer_default(target)), eventName, this[EVENT_HANDLER_NAME]);
    }
  }
  _getEventHandlerName(name) {
    return `_${name}EventHandler`;
  }
  _getEventNameByOption(optionValue) {
    return isObject(optionValue) ? optionValue.name : optionValue;
  }
  _getEventName(optionName) {
    const optionValue = this.option(optionName);
    return this._getEventNameByOption(optionValue);
  }
  _getEventDelay(optionName) {
    const optionValue = this.option(optionName);
    return isObject(optionValue) && optionValue.delay;
  }
  _renderArrow() {
    this._$arrow = renderer_default("<div>").addClass("dx-popover-arrow").prependTo(this.$overlayContent());
  }
  _documentDownHandler(e) {
    if (this._isOutsideClick(e)) {
      return super._documentDownHandler(e);
    }
    return true;
  }
  _isOutsideClick(e) {
    const {
      target
    } = this.option();
    return !renderer_default(e.target).closest(target).length;
  }
  _animate(animation) {
    if (null !== animation && void 0 !== animation && animation.to && "object" === typeof animation.to) {
      extend(animation.to, {
        position: this._getContainerPosition()
      });
    }
    super._animate.apply(this, arguments);
  }
  _stopAnimation() {
    super._stopAnimation.apply(this, arguments);
  }
  _renderTopToolbar() {
    this.$wrapper().toggleClass("dx-popover-without-title", !this.option("showTitle"));
    super._renderTopToolbar();
  }
  _renderPosition() {
    var _this$_actions, _this$_actions$onPosi;
    let shouldUpdateDimensions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : true;
    super._renderPosition();
    this._renderOverlayPosition(shouldUpdateDimensions);
    null === (_this$_actions = this._actions) || void 0 === _this$_actions || null === (_this$_actions$onPosi = _this$_actions.onPositioned) || void 0 === _this$_actions$onPosi || _this$_actions$onPosi.call(_this$_actions);
  }
  _renderOverlayPosition(shouldUpdateDimensions) {
    this._resetOverlayPosition(shouldUpdateDimensions);
    this._updateContentSize(shouldUpdateDimensions);
    const contentPosition = this._getContainerPosition();
    const resultLocation = position_default.setup(this.$overlayContent(), contentPosition);
    const positionSide = this._getSideByLocation(resultLocation);
    this._togglePositionClass(`dx-position-${positionSide}`);
    this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
    const isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
    if (isArrowVisible) {
      this._renderArrowPosition(positionSide);
    }
  }
  _resetOverlayPosition(shouldUpdateDimensions) {
    this._setContentHeight(shouldUpdateDimensions);
    this._togglePositionClass(`dx-position-${this._positionController._positionSide}`);
    move(this.$overlayContent(), {
      left: 0,
      top: 0
    });
    this._$arrow.css({
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    });
  }
  _updateContentSize(shouldUpdateDimensions) {
    if (!this.$content() || !shouldUpdateDimensions) {
      return;
    }
    const containerLocation = position_default.calculate(this.$overlayContent(), this._getContainerPosition());
    if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
      const newContainerWidth = getWidth(this.$overlayContent()) - containerLocation.h.oversize;
      setWidth(this.$overlayContent(), newContainerWidth);
    }
    if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
      const newOverlayContentHeight = getHeight(this.$overlayContent()) - containerLocation.v.oversize;
      const newPopupContentHeight = getHeight(this.$content()) - containerLocation.v.oversize;
      setHeight(this.$overlayContent(), newOverlayContentHeight);
      setHeight(this.$content(), newPopupContentHeight);
    }
  }
  _getContainerPosition() {
    return this._positionController._getContainerPosition();
  }
  _getHideOnParentScrollTarget() {
    var _this$_positionContro;
    return renderer_default((null === (_this$_positionContro = this._positionController._position) || void 0 === _this$_positionContro ? void 0 : _this$_positionContro.of) || super._getHideOnParentScrollTarget());
  }
  _getSideByLocation(location) {
    const isFlippedByVertical = location.v.flip;
    const isFlippedByHorizontal = location.h.flip;
    const isVertical = this._isVerticalSide() && isFlippedByVertical;
    const isHorizontal = this._isHorizontalSide() && isFlippedByHorizontal;
    const isInside = this._isPopoverInside();
    const condition = isVertical || isHorizontal || isInside;
    const positionSide = this._positionController._positionSide;
    if (condition && positionSide) {
      return POSITION_FLIP_MAP[positionSide];
    }
    if (positionSide) {
      return positionSide;
    }
    return;
  }
  _togglePositionClass(positionClass) {
    this.$wrapper().removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(positionClass);
  }
  _toggleFlippedClass(isFlippedHorizontal, isFlippedVertical) {
    this.$wrapper().toggleClass("dx-popover-flipped-horizontal", isFlippedHorizontal).toggleClass("dx-popover-flipped-vertical", isFlippedVertical);
  }
  _renderArrowPosition(side) {
    var _this$_positionContro2;
    const arrowRect = getBoundingRect(this._$arrow.get(0));
    const arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
    this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
    const axis = this._isVerticalSide(side) ? "left" : "top";
    const sizeProperty = this._isVerticalSide(side) ? "width" : "height";
    const $target = renderer_default(null === (_this$_positionContro2 = this._positionController._position) || void 0 === _this$_positionContro2 ? void 0 : _this$_positionContro2.of);
    const targetOffset = position_default.offset($target) ?? {
      top: 0,
      left: 0
    };
    const contentOffset = position_default.offset(this.$overlayContent());
    const arrowSize = arrowRect[sizeProperty];
    const contentLocation = null === contentOffset || void 0 === contentOffset ? void 0 : contentOffset[axis];
    const contentSize = getBoundingRect(this.$overlayContent().get(0))[sizeProperty];
    const targetLocation = targetOffset[axis];
    const targetElement = $target.get(0);
    const targetSize = targetElement && !targetElement.preventDefault ? getBoundingRect(targetElement)[sizeProperty] : 0;
    const min = Math.max(contentLocation, targetLocation);
    const max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
    let arrowLocation;
    const {
      arrowPosition
    } = this.option();
    if ("start" === arrowPosition) {
      arrowLocation = min - contentLocation;
    } else if ("end" === arrowPosition) {
      arrowLocation = max - contentLocation - arrowSize;
    } else {
      arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2;
    }
    const borderWidth = this._positionController._getContentBorderWidth(side);
    const {
      arrowOffset
    } = this.option();
    const finalArrowLocation = fitIntoRange(arrowLocation - borderWidth + arrowOffset, borderWidth, contentSize - arrowSize - 2 * borderWidth);
    this._$arrow.css(axis, finalArrowLocation);
  }
  _isPopoverInside() {
    return this._positionController._isPopoverInside();
  }
  _setContentHeight(fullUpdate) {
    if (fullUpdate) {
      super._setContentHeight();
    }
  }
  _getPositionControllerConfig() {
    const superConfiguration = super._getPositionControllerConfig();
    const {
      shading,
      target
    } = this.option();
    const properties = _extends({}, superConfiguration.properties, {
      target,
      shading
    });
    const elements = _extends({}, superConfiguration.elements, {
      $arrow: this._$arrow
    });
    const configuration = {
      properties,
      elements
    };
    return configuration;
  }
  _initPositionController() {
    this._positionController = new PopoverPositionController(this._getPositionControllerConfig());
  }
  _renderWrapperDimensions() {
    if (this.option("shading")) {
      this.$wrapper().css({
        width: "100%",
        height: "100%"
      });
    }
  }
  _isVerticalSide(side) {
    return this._positionController._isVerticalSide(side);
  }
  _isHorizontalSide(side) {
    return this._positionController._isHorizontalSide(side);
  }
  _clearEventTimeout(name) {
    clearTimeout(this._timeouts[name]);
  }
  _clearEventsTimeouts() {
    this._clearEventTimeout("show");
    this._clearEventTimeout("hide");
  }
  _clean() {
    this._detachEvents(this.option("target"));
    super._clean.apply(this, arguments);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "arrowPosition":
      case "arrowOffset":
        this._renderGeometry();
        break;
      case "fullScreen":
        if (value) {
          this.option("fullScreen", false);
        }
        break;
      case "target":
        if (previousValue) {
          this._detachEvents(previousValue);
        }
        this._positionController.updateTarget(value);
        this._invalidate();
        break;
      case "showEvent":
      case "hideEvent": {
        const eventName = name.substring(0, 4);
        const event = this._getEventNameByOption(previousValue);
        this.hide();
        const {
          target
        } = this.option();
        this._detachEvent(target, eventName, event);
        this._attachEvent(eventName);
        break;
      }
      case "visible":
        this._clearEventTimeout(value ? "show" : "hide");
        super._optionChanged(args);
        break;
      case "disabled":
        this._detachEvents(this.option("target"));
        this._attachEvents();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  show(target) {
    if (target) {
      this.option("target", target);
    }
    return super.show();
  }
};
component_registrator_default("dxPopover", Popover);
var m_popover_default = Popover;

// node_modules/devextreme/esm/__internal/ui/action_sheet.js
var window = getWindow();
var ActionSheet = class extends collection_widget_edit_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      usePopover: false,
      target: null,
      title: "",
      showTitle: true,
      showCancelButton: true,
      cancelText: message_default.format("Cancel"),
      onCancelClick: null,
      visible: false,
      noDataText: "",
      focusStateEnabled: false,
      selectByClick: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "ios",
        tablet: true
      },
      options: {
        usePopover: true
      }
    }]);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate((($container, data) => {
        const button = new Button(renderer_default("<div>"), extend({
          onClick: null === data || void 0 === data ? void 0 : data.click,
          stylingMode: (null === data || void 0 === data ? void 0 : data.stylingMode) || "outlined"
        }, data));
        $container.append(button.$element());
      }), ["disabled", "icon", "text", "type", "onClick", "click", "stylingMode"], this.option("integrationOptions.watchMethod"))
    });
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemClass() {
    return "dx-actionsheet-item";
  }
  _itemDataKey() {
    return "dxActionSheetItemData";
  }
  _toggleVisibility() {
  }
  _renderDimensions() {
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass("dx-actionsheet");
    this._createItemContainer();
  }
  _render() {
    this._renderPopup();
  }
  _createItemContainer() {
    this._$itemContainer = renderer_default("<div>").addClass("dx-actionsheet-container");
    this._renderDisabled();
  }
  _renderDisabled() {
    const {
      disabled
    } = this.option();
    this._$itemContainer.toggleClass("dx-state-disabled", disabled);
  }
  _renderPopup() {
    this._$popup = renderer_default("<div>").appendTo(this.$element());
    if (this._isPopoverMode()) {
      this._createPopover();
    } else {
      this._createPopup();
    }
    this._renderPopupTitle();
    this._mapPopupOption("visible");
  }
  _mapPopupOption(optionName) {
    var _this$_popup;
    null === (_this$_popup = this._popup) || void 0 === _this$_popup || _this$_popup.option(optionName, this.option(optionName));
  }
  _isPopoverMode() {
    const {
      usePopover,
      target
    } = this.option();
    return !!(usePopover && target);
  }
  _renderPopupTitle() {
    var _this$_popup2;
    this._mapPopupOption("showTitle");
    null === (_this$_popup2 = this._popup) || void 0 === _this$_popup2 || _this$_popup2.$wrapper().toggleClass("dx-actionsheet-without-title", !this.option("showTitle"));
  }
  _clean() {
    if (this._$popup) {
      this._$popup.remove();
    }
    super._clean();
  }
  _overlayConfig() {
    const {
      title
    } = this.option();
    return {
      onInitialized: (args) => {
        this._popup = args.component;
      },
      disabled: false,
      showTitle: true,
      title,
      deferRendering: true,
      onContentReady: this._popupContentReadyAction.bind(this),
      onHidden: () => {
        this.hide();
      }
    };
  }
  _createPopover() {
    this._createComponent(this._$popup, m_popover_default, extend(this._overlayConfig(), {
      width: this.option("width") || 200,
      height: this.option("height") || "auto",
      target: this.option("target")
    }));
    this._popup.$overlayContent().attr("role", "dialog");
    this._popup.$wrapper().addClass("dx-actionsheet-popover-wrapper");
  }
  _createPopup() {
    this._createComponent(this._$popup, m_popup_default, extend(this._overlayConfig(), {
      dragEnabled: false,
      width: this.option("width") || "100%",
      height: this.option("height") || "auto",
      showCloseButton: false,
      position: {
        my: "bottom",
        at: "bottom",
        of: window
      },
      animation: {
        show: {
          type: "slide",
          duration: 400,
          from: {
            position: {
              my: "top",
              at: "bottom",
              of: window
            }
          },
          to: {
            position: {
              my: "bottom",
              at: "bottom",
              of: window
            }
          }
        },
        hide: {
          type: "slide",
          duration: 400,
          from: {
            position: {
              my: "bottom",
              at: "bottom",
              of: window
            }
          },
          to: {
            position: {
              my: "top",
              at: "bottom",
              of: window
            }
          }
        }
      }
    }));
    this._popup.$wrapper().addClass("dx-actionsheet-popup-wrapper");
  }
  _popupContentReadyAction() {
    this._popup.$content().append(this._$itemContainer);
    this._attachClickEvent();
    this._attachHoldEvent();
    this._prepareContent();
    this._renderContent();
    this._renderCancelButton();
  }
  _renderCancelButton() {
    if (this._isPopoverMode()) {
      return;
    }
    if (this._$cancelButton) {
      this._$cancelButton.remove();
    }
    const {
      showCancelButton,
      cancelText
    } = this.option();
    if (showCancelButton) {
      var _this$_popup3;
      const cancelClickAction = this._createActionByOption("onCancelClick") || noop;
      this._$cancelButton = renderer_default("<div>").addClass("dx-actionsheet-cancel").appendTo(null === (_this$_popup3 = this._popup) || void 0 === _this$_popup3 ? void 0 : _this$_popup3.$content());
      this._createComponent(this._$cancelButton, Button, {
        disabled: false,
        stylingMode: "outlined",
        text: cancelText,
        onClick: (e) => {
          const hidingArgs = {
            event: e,
            cancel: false
          };
          cancelClickAction(hidingArgs);
          if (!hidingArgs.cancel) {
            this.hide();
          }
        },
        integrationOptions: {}
      });
    }
  }
  _attachItemClickEvent() {
  }
  _itemClickHandler(e) {
    super._itemClickHandler(e);
    if (!renderer_default(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
      this.hide();
    }
  }
  _itemHoldHandler(e) {
    super._itemHoldHandler(e);
    if (!renderer_default(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
      this.hide();
    }
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "width":
      case "height":
      case "visible":
      case "title":
        this._mapPopupOption(name);
        break;
      case "disabled":
        this._renderDisabled();
        break;
      case "showTitle":
        this._renderPopupTitle();
        break;
      case "showCancelButton":
      case "onCancelClick":
      case "cancelText":
        this._renderCancelButton();
        break;
      case "target":
      case "usePopover":
      case "items":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    const d = Deferred();
    this._popup.toggle(showing).done((() => {
      this.option("visible", showing);
      d.resolveWith(this);
    }));
    return d.promise();
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
};
component_registrator_default("dxActionSheet", ActionSheet);
var action_sheet_default = ActionSheet;

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.switchable.slide.js
var LIST_EDIT_DECORATOR2 = "dxListEditDecorator";
var CLICK_EVENT_NAME2 = addNamespace(CLICK_EVENT_NAME, LIST_EDIT_DECORATOR2);
var ACTIVE_EVENT_NAME3 = addNamespace(ACTIVE_EVENT_NAME, LIST_EDIT_DECORATOR2);
var SLIDE_MENU_CLASS = "dx-list-slide-menu";
var SLIDE_MENU_WRAPPER_CLASS = "dx-list-slide-menu-wrapper";
var SLIDE_MENU_CONTENT_CLASS = "dx-list-slide-menu-content";
var SLIDE_MENU_BUTTONS_CONTAINER_CLASS = "dx-list-slide-menu-buttons-container";
var SLIDE_MENU_BUTTONS_CLASS = "dx-list-slide-menu-buttons";
var SLIDE_MENU_BUTTON_CLASS = "dx-list-slide-menu-button";
var SLIDE_MENU_BUTTON_MENU_CLASS = "dx-list-slide-menu-button-menu";
var SLIDE_MENU_BUTTON_DELETE_CLASS = "dx-list-slide-menu-button-delete";
var SLIDE_MENU_ANIMATION_EASING = "cubic-bezier(0.075, 0.82, 0.165, 1)";
var SwitchableEditDecoratorSlide = class extends list_edit_decorator_switchable_default {
  _shouldHandleSwipe() {
    return true;
  }
  _init() {
    super._init();
    this._$buttonsContainer = renderer_default("<div>").addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
    m_events_engine_default.on(this._$buttonsContainer, ACTIVE_EVENT_NAME3, noop);
    this._$buttons = renderer_default("<div>").addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
    this._renderMenu();
    this._renderDeleteButton();
  }
  _renderMenu() {
    const {
      menuItems = []
    } = this._list.option();
    if (!menuItems.length) {
      return;
    }
    if (1 === menuItems.length) {
      const menuItem = menuItems[0];
      this._renderMenuButton(menuItem.text ?? "", ((e) => {
        e.stopPropagation();
        this._fireAction(menuItem);
      }));
    } else {
      const $menu = renderer_default("<div>").addClass(SLIDE_MENU_CLASS);
      this._menu = this._list._createComponent($menu, action_sheet_default, {
        showTitle: false,
        items: menuItems,
        onItemClick: (args) => {
          this._fireAction(args.itemData);
        },
        integrationOptions: {}
      });
      $menu.appendTo(this._list.$element());
      const $menuButton = this._renderMenuButton(message_default.format("dxListEditDecorator-more"), ((e) => {
        e.stopPropagation();
        this._menu.show();
      }));
      this._menu.option("target", $menuButton);
    }
  }
  _renderMenuButton(text, action) {
    const $menuButton = renderer_default("<div>").addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
    this._$buttons.append($menuButton);
    m_events_engine_default.on($menuButton, CLICK_EVENT_NAME2, action);
    return $menuButton;
  }
  _renderDeleteButton() {
    const {
      allowItemDeleting
    } = this._list.option();
    if (!allowItemDeleting) {
      return;
    }
    const $deleteButton = renderer_default("<div>").addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text(isMaterialBased(current()) ? "" : message_default.format("dxListEditDecorator-delete"));
    m_events_engine_default.on($deleteButton, CLICK_EVENT_NAME2, ((e) => {
      e.stopPropagation();
      this._deleteItem();
    }));
    this._$buttons.append($deleteButton);
  }
  _fireAction(menuItem) {
    this._list._itemEventHandlerByHandler(renderer_default(this._cachedNode), menuItem.action, {}, {
      excludeValidators: ["disabled", "readOnly"]
    });
    this._cancelDeleteReadyItem();
  }
  modifyElement(config) {
    super.modifyElement(config);
    const {
      $itemElement
    } = config;
    $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
    const $slideMenuContent = renderer_default("<div>").addClass(SLIDE_MENU_CONTENT_CLASS);
    $itemElement.wrapInner($slideMenuContent);
  }
  _getDeleteButtonContainer() {
    return this._$buttonsContainer;
  }
  handleClick($itemElement, e) {
    if (renderer_default(e.target).closest(`.${SLIDE_MENU_CONTENT_CLASS}`).length) {
      return super.handleClick($itemElement, e);
    }
    return false;
  }
  _swipeStartHandler($itemElement) {
    this._enablePositioning($itemElement);
    this._cacheItemData($itemElement);
    this._setPositions(this._getPositions(0));
  }
  _swipeUpdateHandler($itemElement, e) {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    const isItemReadyToDelete = this._isReadyToDelete($itemElement);
    const moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
    if (moveJustStarted && !isItemReadyToDelete && e.offset * signCorrection > 0) {
      e.cancel = true;
      return;
    }
    const offset = this._cachedItemWidth * e.offset;
    const startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
    const correctedOffset = (offset + startOffset) * signCorrection;
    const percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
    this._setPositions(this._getPositions(percent));
  }
  _getStartPositions() {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    return {
      content: 0,
      buttonsContainer: rtl ? -this._cachedButtonWidth : this._cachedItemWidth,
      buttons: -this._cachedButtonWidth * signCorrection
    };
  }
  _getPositions(percent) {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    const startPositions = this._getStartPositions();
    return {
      content: startPositions.content - percent * this._cachedButtonWidth * signCorrection,
      buttonsContainer: startPositions.buttonsContainer - Math.min(percent, 1) * this._cachedButtonWidth * signCorrection,
      buttons: startPositions.buttons + Math.min(percent, 1) * this._cachedButtonWidth * signCorrection
    };
  }
  _getCurrentPositions() {
    return {
      content: locate(this._$cachedContent).left,
      buttonsContainer: locate(this._$buttonsContainer).left,
      buttons: locate(this._$buttons).left
    };
  }
  _setPositions(positions) {
    move(this._$cachedContent, {
      left: positions.content
    });
    move(this._$buttonsContainer, {
      left: positions.buttonsContainer
    });
    move(this._$buttons, {
      left: positions.buttons
    });
  }
  _cacheItemData($itemElement) {
    var _this$_$cachedContent;
    if ($itemElement[0] === this._cachedNode) {
      return;
    }
    this._$cachedContent = $itemElement.find(`.${SLIDE_MENU_CONTENT_CLASS}`);
    this._cachedItemWidth = getOuterWidth($itemElement);
    this._cachedButtonWidth = this._cachedButtonWidth || getOuterWidth(this._$buttons);
    setWidth(this._$buttonsContainer, this._cachedButtonWidth);
    if (null !== (_this$_$cachedContent = this._$cachedContent) && void 0 !== _this$_$cachedContent && _this$_$cachedContent.length) {
      this._cachedNode = $itemElement.get(0);
    }
  }
  _minButtonContainerLeftOffset() {
    return this._cachedItemWidth - this._cachedButtonWidth;
  }
  _swipeEndHandler($itemElement, args) {
    this._cacheItemData($itemElement);
    const signCorrection = this._isRtlEnabled() ? 1 : -1;
    const offset = this._cachedItemWidth * args.offset;
    const endedAtReadyToDelete = !this._isReadyToDelete($itemElement) && offset * signCorrection > 0.2 * this._cachedButtonWidth;
    const readyToDelete = args.targetOffset === signCorrection && endedAtReadyToDelete;
    this._toggleDeleteReady($itemElement, readyToDelete);
  }
  _enablePositioning($itemElement) {
    if (this._$cachedContent) {
      fx_default.stop(this._$cachedContent.get(0), true);
    }
    super._enablePositioning($itemElement);
    this._$buttonsContainer.appendTo($itemElement);
  }
  _disablePositioning($itemElement) {
    super._disablePositioning($itemElement);
    this._$buttonsContainer.detach();
  }
  _animatePrepareDeleteReady() {
    return this._animateToPositions(this._getPositions(1));
  }
  _animateForgetDeleteReady($itemElement) {
    this._cacheItemData($itemElement);
    return this._animateToPositions(this._getPositions(0));
  }
  _animateToPositions(positions) {
    const currentPosition = this._getCurrentPositions();
    const durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
    return fx_default.animate(renderer_default(this._$cachedContent).get(0), {
      from: currentPosition,
      to: positions,
      easing: SLIDE_MENU_ANIMATION_EASING,
      duration: 400 * durationTimePart,
      strategy: "frame",
      draw: (drawPositions) => {
        this._setPositions(drawPositions);
      }
    });
  }
  dispose() {
    if (this._menu) {
      this._menu.$element().remove();
    }
    if (this._$buttonsContainer) {
      this._$buttonsContainer.remove();
    }
    super.dispose();
  }
};
register("menu", "slide", SwitchableEditDecoratorSlide);

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.static.js
var STATIC_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-static-delete-button-container";
var STATIC_DELETE_BUTTON_CLASS = "dx-list-static-delete-button";
var EditDecoratorStatic = class extends list_edit_decorator_default {
  afterBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $button = renderer_default("<div>").addClass(STATIC_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, Button, {
      icon: "remove",
      onClick: (args) => {
        const {
          event
        } = args;
        null === event || void 0 === event || event.stopPropagation();
        this._deleteItem($itemElement);
      },
      integrationOptions: {},
      elementAttr: {
        role: null,
        "aria-label": null
      },
      tabIndex: -1
    });
    $container.addClass(STATIC_DELETE_BUTTON_CONTAINER_CLASS).append($button);
  }
  _deleteItem($itemElement) {
    if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
      return;
    }
    this._list.deleteItem($itemElement.get(0));
  }
};
register("delete", "static", EditDecoratorStatic);

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.swipe.js
var EditDecoratorSwipe = class extends list_edit_decorator_default {
  _shouldHandleSwipe() {
    return true;
  }
  _renderItemPosition($itemElement, offset, animate) {
    const deferred = Deferred();
    const itemOffset = offset * this._itemElementWidth;
    if (animate) {
      fx_default.animate($itemElement.get(0), {
        to: {
          left: itemOffset
        },
        type: "slide",
        complete() {
          deferred.resolve($itemElement, offset);
        }
      });
    } else {
      move($itemElement, {
        left: itemOffset
      });
      deferred.resolve();
    }
    return deferred.promise();
  }
  _swipeStartHandler($itemElement) {
    this._itemElementWidth = getWidth($itemElement);
  }
  _swipeUpdateHandler($itemElement, e) {
    const {
      offset
    } = e;
    this._renderItemPosition($itemElement, offset);
  }
  _swipeEndHandler($itemElement, e) {
    const {
      targetOffset
    } = e;
    this._renderItemPosition($itemElement, targetOffset, true).done((($element, offset) => {
      if (Math.abs(offset)) {
        this._list.deleteItem($element.get(0)).fail((() => {
          this._renderItemPosition($element, 0, true);
        }));
      }
    }));
  }
};
register("delete", "swipe", EditDecoratorSwipe);

// node_modules/devextreme/esm/__internal/ui/list/list.edit.decorator.reorder.js
var REORDER_HANDLE_CONTAINER_CLASS = "dx-list-reorder-handle-container";
var REORDER_HANDLE_CLASS = "dx-list-reorder-handle";
var REORDERING_ITEM_GHOST_CLASS = "dx-list-item-ghost-reordering";
var EditDecoratorReorder = class extends list_edit_decorator_default {
  _init() {
    const list = this._list;
    const {
      grouped,
      itemDragging
    } = this._list.option();
    this._groupedEnabled = grouped;
    this._lockedDrag = false;
    const filter = this._groupedEnabled ? "> .dx-list-items > .dx-list-group > .dx-list-group-body > .dx-list-item" : "> .dx-list-items > .dx-list-item";
    this._sortable = list._createComponent(list._scrollView.content(), m_sortable_default, _extends({
      component: list,
      contentTemplate: null,
      allowReordering: false,
      filter,
      container: list.$element().get(0),
      dragDirection: null !== itemDragging && void 0 !== itemDragging && itemDragging.group ? "both" : "vertical",
      handle: `.${REORDER_HANDLE_CLASS}`,
      dragTemplate: this._dragTemplate,
      onDragStart: (e) => {
        this._dragStartHandler(e);
      },
      onDragChange: (e) => {
        this._dragChangeHandler(e);
      },
      onReorder: (e) => {
        this._reorderHandler(e);
      }
    }, itemDragging));
  }
  afterRender() {
    this._sortable.update();
  }
  _dragTemplate(e) {
    const result = renderer_default(e.itemElement).clone().addClass(REORDERING_ITEM_GHOST_CLASS).addClass("dx-state-hover");
    setWidth(result, getWidth(e.itemElement));
    return result;
  }
  _dragStartHandler(e) {
    if (this._lockedDrag) {
      e.cancel = true;
    }
  }
  _dragChangeHandler(e) {
    if (this._groupedEnabled && isDefined(e.fromIndex) && isDefined(e.toIndex) && !this._sameParent(e.fromIndex, e.toIndex)) {
      e.cancel = true;
    }
  }
  _sameParent(fromIndex, toIndex) {
    const $dragging = this._list.getItemElementByFlatIndex(fromIndex);
    const $over = this._list.getItemElementByFlatIndex(toIndex);
    return $over.parent().get(0) === $dragging.parent().get(0);
  }
  _reorderHandler(e) {
    const $targetElement = this._list.getItemElementByFlatIndex(e.toIndex);
    this._list.reorderItem(renderer_default(e.itemElement), $targetElement);
  }
  afterBag(config) {
    const $handle = renderer_default("<div>").addClass(REORDER_HANDLE_CLASS);
    m_events_engine_default.on($handle, m_pointer_default.down, ((e) => {
      this._lockedDrag = !isMouseEvent(e);
    }));
    m_events_engine_default.on($handle, m_hold_default.name, {
      timeout: 30
    }, ((e) => {
      e.cancel = true;
      this._lockedDrag = false;
    }));
    config.$container.addClass(REORDER_HANDLE_CONTAINER_CLASS).append($handle);
  }
};
register("reorder", "default", EditDecoratorReorder);

// node_modules/devextreme/esm/ui/list.js
var list_default = list_light_default;

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-list.mjs
var DxListComponent = class _DxListComponent extends DxComponent {
  _watcherHelper;
  _idh;
  set _buttonsContentChildren(value) {
    this.setChildren("buttons", value);
  }
  set _itemsContentChildren(value) {
    this.setChildren("items", value);
  }
  set _menuItemsContentChildren(value) {
    this.setChildren("menuItems", value);
  }
  instance = null;
  /**
   * Specifies the shortcut key that sets focus on the UI component.
  
   */
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  /**
   * Specifies whether the UI component changes its visual state as a result of user interaction.
  
   */
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  /**
   * Specifies whether or not an end user can delete list items.
  
   */
  get allowItemDeleting() {
    return this._getOption("allowItemDeleting");
  }
  set allowItemDeleting(value) {
    this._setOption("allowItemDeleting", value);
  }
  /**
   * A Boolean value specifying whether to enable or disable the bounce-back effect.
  
   */
  get bounceEnabled() {
    return this._getOption("bounceEnabled");
  }
  set bounceEnabled(value) {
    this._setOption("bounceEnabled", value);
  }
  /**
   * Specifies whether or not an end user can collapse groups.
  
   */
  get collapsibleGroups() {
    return this._getOption("collapsibleGroups");
  }
  set collapsibleGroups(value) {
    this._setOption("collapsibleGroups", value);
  }
  /**
   * Binds the UI component to data.
  
   */
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  /**
   * Specifies whether the UI component responds to user interaction.
  
   */
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  /**
   * Specifies the data field whose values should be displayed. Defaults to &apos;text&apos; when the data source contains objects.
  
   */
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
  }
  /**
   * Specifies the global attributes to be attached to the UI component&apos;s container element.
  
   */
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  /**
   * Specifies whether the UI component can be focused using keyboard navigation.
  
   */
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  /**
   * Specifies whether data items should be grouped.
  
   */
  get grouped() {
    return this._getOption("grouped");
  }
  set grouped(value) {
    this._setOption("grouped", value);
  }
  /**
   * Specifies a custom template for group captions.
  
   */
  get groupTemplate() {
    return this._getOption("groupTemplate");
  }
  set groupTemplate(value) {
    this._setOption("groupTemplate", value);
  }
  /**
   * Specifies the UI component&apos;s height.
  
   */
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  /**
   * Specifies text for a hint that appears when a user pauses on the UI component.
  
   */
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  /**
   * Specifies whether the UI component changes its state when a user pauses on it.
  
   */
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  /**
   * Specifies whether or not to show the loading panel when the DataSource bound to the UI component is loading data.
  
   */
  get indicateLoading() {
    return this._getOption("indicateLoading");
  }
  set indicateLoading(value) {
    this._setOption("indicateLoading", value);
  }
  /**
   * Specifies the way a user can delete items from the list.
  
   */
  get itemDeleteMode() {
    return this._getOption("itemDeleteMode");
  }
  set itemDeleteMode(value) {
    this._setOption("itemDeleteMode", value);
  }
  /**
   * Configures item reordering using drag and drop gestures.
  
   */
  get itemDragging() {
    return this._getOption("itemDragging");
  }
  set itemDragging(value) {
    this._setOption("itemDragging", value);
  }
  /**
   * The time period in milliseconds before the onItemHold event is raised.
  
   */
  get itemHoldTimeout() {
    return this._getOption("itemHoldTimeout");
  }
  set itemHoldTimeout(value) {
    this._setOption("itemHoldTimeout", value);
  }
  /**
   * An array of items displayed by the UI component.
  
   */
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  /**
   * Specifies a custom template for items.
  
   */
  get itemTemplate() {
    return this._getOption("itemTemplate");
  }
  set itemTemplate(value) {
    this._setOption("itemTemplate", value);
  }
  /**
   * Specifies the key property that provides key values to access data items. Each key value must be unique.
  
   */
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  /**
   * Specifies the array of items for a context menu called for a list item.
  
   */
  get menuItems() {
    return this._getOption("menuItems");
  }
  set menuItems(value) {
    this._setOption("menuItems", value);
  }
  /**
   * Specifies whether an item context menu is shown when a user holds or swipes an item.
  
   */
  get menuMode() {
    return this._getOption("menuMode");
  }
  set menuMode(value) {
    this._setOption("menuMode", value);
  }
  /**
   * The text displayed on the button used to load the next page from the data source.
  
   */
  get nextButtonText() {
    return this._getOption("nextButtonText");
  }
  set nextButtonText(value) {
    this._setOption("nextButtonText", value);
  }
  /**
   * Specifies the text or HTML markup displayed by the UI component if the item collection is empty.
  
   */
  get noDataText() {
    return this._getOption("noDataText");
  }
  set noDataText(value) {
    this._setOption("noDataText", value);
  }
  /**
   * Specifies the text shown in the pullDown panel, which is displayed when the list is scrolled to the bottom.
  
   */
  get pageLoadingText() {
    return this._getOption("pageLoadingText");
  }
  set pageLoadingText(value) {
    this._setOption("pageLoadingText", value);
  }
  /**
   * Specifies whether the next page is loaded when a user scrolls the UI component to the bottom or when the &apos;next&apos; button is clicked.
  
   */
  get pageLoadMode() {
    return this._getOption("pageLoadMode");
  }
  set pageLoadMode(value) {
    this._setOption("pageLoadMode", value);
  }
  /**
   * Specifies the text displayed in the pullDown panel when the list is pulled below the refresh threshold.
  
   */
  get pulledDownText() {
    return this._getOption("pulledDownText");
  }
  set pulledDownText(value) {
    this._setOption("pulledDownText", value);
  }
  /**
   * Specifies the text shown in the pullDown panel while the list is being pulled down to the refresh threshold.
  
   */
  get pullingDownText() {
    return this._getOption("pullingDownText");
  }
  set pullingDownText(value) {
    this._setOption("pullingDownText", value);
  }
  /**
   * A Boolean value specifying whether or not the UI component supports the &apos;pull down to refresh&apos; gesture.
  
   */
  get pullRefreshEnabled() {
    return this._getOption("pullRefreshEnabled");
  }
  set pullRefreshEnabled(value) {
    this._setOption("pullRefreshEnabled", value);
  }
  /**
   * Specifies the text displayed in the pullDown panel while the list is being refreshed.
  
   */
  get refreshingText() {
    return this._getOption("refreshingText");
  }
  set refreshingText(value) {
    this._setOption("refreshingText", value);
  }
  /**
   * Specifies whether to repaint only those elements whose data changed.
  
   */
  get repaintChangesOnly() {
    return this._getOption("repaintChangesOnly");
  }
  set repaintChangesOnly(value) {
    this._setOption("repaintChangesOnly", value);
  }
  /**
   * Switches the UI component to a right-to-left representation.
  
   */
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  /**
   * A Boolean value specifying if the list is scrolled by content.
  
   */
  get scrollByContent() {
    return this._getOption("scrollByContent");
  }
  set scrollByContent(value) {
    this._setOption("scrollByContent", value);
  }
  /**
   * Specifies whether a user can scroll the content with the scrollbar. Applies only if useNativeScrolling is false.
  
   */
  get scrollByThumb() {
    return this._getOption("scrollByThumb");
  }
  set scrollByThumb(value) {
    this._setOption("scrollByThumb", value);
  }
  /**
   * A Boolean value specifying whether to enable or disable list scrolling.
  
   */
  get scrollingEnabled() {
    return this._getOption("scrollingEnabled");
  }
  set scrollingEnabled(value) {
    this._setOption("scrollingEnabled", value);
  }
  /**
   * Configures the search panel.
  
   */
  get searchEditorOptions() {
    return this._getOption("searchEditorOptions");
  }
  set searchEditorOptions(value) {
    this._setOption("searchEditorOptions", value);
  }
  /**
   * Specifies whether the search panel is visible.
  
   */
  get searchEnabled() {
    return this._getOption("searchEnabled");
  }
  set searchEnabled(value) {
    this._setOption("searchEnabled", value);
  }
  /**
   * Specifies a data object&apos;s field name or an expression whose value is compared to the search string.
  
   */
  get searchExpr() {
    return this._getOption("searchExpr");
  }
  set searchExpr(value) {
    this._setOption("searchExpr", value);
  }
  /**
   * Specifies a comparison operation used to search UI component items.
  
   */
  get searchMode() {
    return this._getOption("searchMode");
  }
  set searchMode(value) {
    this._setOption("searchMode", value);
  }
  /**
   * Specifies a delay in milliseconds between when a user finishes typing, and the search is executed.
  
   */
  get searchTimeout() {
    return this._getOption("searchTimeout");
  }
  set searchTimeout(value) {
    this._setOption("searchTimeout", value);
  }
  /**
   * Specifies the current search string.
  
   */
  get searchValue() {
    return this._getOption("searchValue");
  }
  set searchValue(value) {
    this._setOption("searchValue", value);
  }
  /**
   * Specifies the mode in which all items are selected.
  
   */
  get selectAllMode() {
    return this._getOption("selectAllMode");
  }
  set selectAllMode(value) {
    this._setOption("selectAllMode", value);
  }
  /**
   * Specifies the text displayed at the &apos;Select All&apos; check box.
  
   */
  get selectAllText() {
    return this._getOption("selectAllText");
  }
  set selectAllText(value) {
    this._setOption("selectAllText", value);
  }
  /**
   * Specifies whether an item is selected if a user clicks it.
  
   */
  get selectByClick() {
    return this._getOption("selectByClick");
  }
  set selectByClick(value) {
    this._setOption("selectByClick", value);
  }
  /**
   * Specifies an array of currently selected item keys.
  
   */
  get selectedItemKeys() {
    return this._getOption("selectedItemKeys");
  }
  set selectedItemKeys(value) {
    this._setOption("selectedItemKeys", value);
  }
  /**
   * An array of currently selected item objects.
  
   */
  get selectedItems() {
    return this._getOption("selectedItems");
  }
  set selectedItems(value) {
    this._setOption("selectedItems", value);
  }
  /**
   * Specifies item selection mode.
  
   */
  get selectionMode() {
    return this._getOption("selectionMode");
  }
  set selectionMode(value) {
    this._setOption("selectionMode", value);
  }
  /**
   * Specifies when the UI component shows the scrollbar.
  
   */
  get showScrollbar() {
    return this._getOption("showScrollbar");
  }
  set showScrollbar(value) {
    this._setOption("showScrollbar", value);
  }
  /**
   * Specifies whether or not to display controls used to select list items. Not available if selectionMode is set to &apos;none&apos;.
  
   */
  get showSelectionControls() {
    return this._getOption("showSelectionControls");
  }
  set showSelectionControls(value) {
    this._setOption("showSelectionControls", value);
  }
  /**
   * Specifies the number of the element when the Tab key is used for navigating.
  
   */
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  /**
   * Specifies whether or not the UI component uses native scrolling.
  
   */
  get useNativeScrolling() {
    return this._getOption("useNativeScrolling");
  }
  set useNativeScrolling(value) {
    this._setOption("useNativeScrolling", value);
  }
  /**
   * Specifies whether the UI component is visible.
  
   */
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  /**
   * Specifies the UI component&apos;s width.
  
   */
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * A function that is executed when the UI component is rendered and each time the component is repainted.
  
  
   */
  onContentReady;
  /**
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function that is executed when a group element is rendered.
  
  
   */
  onGroupRendered;
  /**
  
   * A function used in JavaScript frameworks to save the UI component instance.
  
  
   */
  onInitialized;
  /**
  
   * A function that is executed when a collection item is clicked or tapped.
  
  
   */
  onItemClick;
  /**
  
   * A function that is executed when a collection item is right-clicked or pressed.
  
  
   */
  onItemContextMenu;
  /**
  
   * A function that is executed after a list item is deleted from the data source.
  
  
   */
  onItemDeleted;
  /**
  
   * A function that is executed before a collection item is deleted from the data source.
  
  
   */
  onItemDeleting;
  /**
  
   * A function that is executed when a collection item has been held for a specified period.
  
  
   */
  onItemHold;
  /**
  
   * A function that is executed after a collection item is rendered.
  
  
   */
  onItemRendered;
  /**
  
   * A function that is executed after a list item is moved to another position.
  
  
   */
  onItemReordered;
  /**
  
   * A function that is executed when a list item is swiped.
  
  
   */
  onItemSwipe;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
  /**
  
   * A function that is executed before the next page is loaded.
  
  
   */
  onPageLoading;
  /**
  
   * A function that is executed when the &apos;pull to refresh&apos; gesture is performed. Supported on mobile devices only.
  
  
   */
  onPullRefresh;
  /**
  
   * A function that is executed on each scroll gesture.
  
  
   */
  onScroll;
  /**
  
   * A function that is executed when the &apos;Select All&apos; check box value is changed. Applies only if the selectionMode is &apos;all&apos;.
  
  
   */
  onSelectAllValueChanged;
  /**
  
   * A function that is called after selection changes.
  
  
   */
  onSelectionChanged;
  /**
  
   * A function that is called before selection changes.
  
  
   */
  onSelectionChanging;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  accessKeyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  activeStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  allowItemDeletingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  bounceEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  collapsibleGroupsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  dataSourceChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  disabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  displayExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  elementAttrChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  focusStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  groupedChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  groupTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  hintChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  hoverStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  indicateLoadingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemDeleteModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemDraggingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemHoldTimeoutChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  itemTemplateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  keyExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  menuItemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  menuModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  nextButtonTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  noDataTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pageLoadingTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pageLoadModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pulledDownTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pullingDownTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pullRefreshEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  refreshingTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  repaintChangesOnlyChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  scrollByContentChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  scrollByThumbChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  scrollingEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchEditorOptionsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchExprChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchTimeoutChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  searchValueChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectAllModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectAllTextChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectByClickChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemKeysChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedItemsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectionModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showScrollbarChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  showSelectionControlsChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  tabIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  useNativeScrollingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, _idh, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._watcherHelper = _watcherHelper;
    this._idh = _idh;
    this._createEventEmitters([{
      subscribe: "contentReady",
      emit: "onContentReady"
    }, {
      subscribe: "disposing",
      emit: "onDisposing"
    }, {
      subscribe: "groupRendered",
      emit: "onGroupRendered"
    }, {
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "itemClick",
      emit: "onItemClick"
    }, {
      subscribe: "itemContextMenu",
      emit: "onItemContextMenu"
    }, {
      subscribe: "itemDeleted",
      emit: "onItemDeleted"
    }, {
      subscribe: "itemDeleting",
      emit: "onItemDeleting"
    }, {
      subscribe: "itemHold",
      emit: "onItemHold"
    }, {
      subscribe: "itemRendered",
      emit: "onItemRendered"
    }, {
      subscribe: "itemReordered",
      emit: "onItemReordered"
    }, {
      subscribe: "itemSwipe",
      emit: "onItemSwipe"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      subscribe: "pageLoading",
      emit: "onPageLoading"
    }, {
      subscribe: "pullRefresh",
      emit: "onPullRefresh"
    }, {
      subscribe: "scroll",
      emit: "onScroll"
    }, {
      subscribe: "selectAllValueChanged",
      emit: "onSelectAllValueChanged"
    }, {
      subscribe: "selectionChanged",
      emit: "onSelectionChanged"
    }, {
      subscribe: "selectionChanging",
      emit: "onSelectionChanging"
    }, {
      emit: "accessKeyChange"
    }, {
      emit: "activeStateEnabledChange"
    }, {
      emit: "allowItemDeletingChange"
    }, {
      emit: "bounceEnabledChange"
    }, {
      emit: "collapsibleGroupsChange"
    }, {
      emit: "dataSourceChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "displayExprChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "focusStateEnabledChange"
    }, {
      emit: "groupedChange"
    }, {
      emit: "groupTemplateChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "indicateLoadingChange"
    }, {
      emit: "itemDeleteModeChange"
    }, {
      emit: "itemDraggingChange"
    }, {
      emit: "itemHoldTimeoutChange"
    }, {
      emit: "itemsChange"
    }, {
      emit: "itemTemplateChange"
    }, {
      emit: "keyExprChange"
    }, {
      emit: "menuItemsChange"
    }, {
      emit: "menuModeChange"
    }, {
      emit: "nextButtonTextChange"
    }, {
      emit: "noDataTextChange"
    }, {
      emit: "pageLoadingTextChange"
    }, {
      emit: "pageLoadModeChange"
    }, {
      emit: "pulledDownTextChange"
    }, {
      emit: "pullingDownTextChange"
    }, {
      emit: "pullRefreshEnabledChange"
    }, {
      emit: "refreshingTextChange"
    }, {
      emit: "repaintChangesOnlyChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "scrollByContentChange"
    }, {
      emit: "scrollByThumbChange"
    }, {
      emit: "scrollingEnabledChange"
    }, {
      emit: "searchEditorOptionsChange"
    }, {
      emit: "searchEnabledChange"
    }, {
      emit: "searchExprChange"
    }, {
      emit: "searchModeChange"
    }, {
      emit: "searchTimeoutChange"
    }, {
      emit: "searchValueChange"
    }, {
      emit: "selectAllModeChange"
    }, {
      emit: "selectAllTextChange"
    }, {
      emit: "selectByClickChange"
    }, {
      emit: "selectedItemKeysChange"
    }, {
      emit: "selectedItemsChange"
    }, {
      emit: "selectionModeChange"
    }, {
      emit: "showScrollbarChange"
    }, {
      emit: "showSelectionControlsChange"
    }, {
      emit: "tabIndexChange"
    }, {
      emit: "useNativeScrollingChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    this._idh.setHost(this);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new list_default(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  ngOnChanges(changes) {
    super.ngOnChanges(changes);
    this.setupChanges("dataSource", changes);
    this.setupChanges("items", changes);
    this.setupChanges("menuItems", changes);
    this.setupChanges("searchExpr", changes);
    this.setupChanges("selectedItemKeys", changes);
    this.setupChanges("selectedItems", changes);
  }
  setupChanges(prop, changes) {
    if (!(prop in this._optionsToUpdate)) {
      this._idh.setup(prop, changes);
    }
  }
  ngDoCheck() {
    this._idh.doCheck("dataSource");
    this._idh.doCheck("items");
    this._idh.doCheck("menuItems");
    this._idh.doCheck("searchExpr");
    this._idh.doCheck("selectedItemKeys");
    this._idh.doCheck("selectedItems");
    this._watcherHelper.checkWatchers();
    super.ngDoCheck();
    super.clearChangedOptions();
  }
  _setOption(name, value) {
    let isSetup = this._idh.setupSingle(name, value);
    let isChanged = this._idh.getChanges(name, value) !== null;
    if (isSetup || isChanged) {
      super._setOption(name, value);
    }
  }
  /** @nocollapse */
  static ɵfac = function DxListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxListComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(IterableDifferHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxListComponent,
    selectors: [["dx-list"]],
    contentQueries: function DxListComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_buttons, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_items, 4);
        ɵɵcontentQuery(dirIndex, PROPERTY_TOKEN_menuItems, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._buttonsContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._itemsContentChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._menuItemsContentChildren = _t);
      }
    },
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      allowItemDeleting: "allowItemDeleting",
      bounceEnabled: "bounceEnabled",
      collapsibleGroups: "collapsibleGroups",
      dataSource: "dataSource",
      disabled: "disabled",
      displayExpr: "displayExpr",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      grouped: "grouped",
      groupTemplate: "groupTemplate",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      indicateLoading: "indicateLoading",
      itemDeleteMode: "itemDeleteMode",
      itemDragging: "itemDragging",
      itemHoldTimeout: "itemHoldTimeout",
      items: "items",
      itemTemplate: "itemTemplate",
      keyExpr: "keyExpr",
      menuItems: "menuItems",
      menuMode: "menuMode",
      nextButtonText: "nextButtonText",
      noDataText: "noDataText",
      pageLoadingText: "pageLoadingText",
      pageLoadMode: "pageLoadMode",
      pulledDownText: "pulledDownText",
      pullingDownText: "pullingDownText",
      pullRefreshEnabled: "pullRefreshEnabled",
      refreshingText: "refreshingText",
      repaintChangesOnly: "repaintChangesOnly",
      rtlEnabled: "rtlEnabled",
      scrollByContent: "scrollByContent",
      scrollByThumb: "scrollByThumb",
      scrollingEnabled: "scrollingEnabled",
      searchEditorOptions: "searchEditorOptions",
      searchEnabled: "searchEnabled",
      searchExpr: "searchExpr",
      searchMode: "searchMode",
      searchTimeout: "searchTimeout",
      searchValue: "searchValue",
      selectAllMode: "selectAllMode",
      selectAllText: "selectAllText",
      selectByClick: "selectByClick",
      selectedItemKeys: "selectedItemKeys",
      selectedItems: "selectedItems",
      selectionMode: "selectionMode",
      showScrollbar: "showScrollbar",
      showSelectionControls: "showSelectionControls",
      tabIndex: "tabIndex",
      useNativeScrolling: "useNativeScrolling",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onGroupRendered: "onGroupRendered",
      onInitialized: "onInitialized",
      onItemClick: "onItemClick",
      onItemContextMenu: "onItemContextMenu",
      onItemDeleted: "onItemDeleted",
      onItemDeleting: "onItemDeleting",
      onItemHold: "onItemHold",
      onItemRendered: "onItemRendered",
      onItemReordered: "onItemReordered",
      onItemSwipe: "onItemSwipe",
      onOptionChanged: "onOptionChanged",
      onPageLoading: "onPageLoading",
      onPullRefresh: "onPullRefresh",
      onScroll: "onScroll",
      onSelectAllValueChanged: "onSelectAllValueChanged",
      onSelectionChanged: "onSelectionChanged",
      onSelectionChanging: "onSelectionChanging",
      accessKeyChange: "accessKeyChange",
      activeStateEnabledChange: "activeStateEnabledChange",
      allowItemDeletingChange: "allowItemDeletingChange",
      bounceEnabledChange: "bounceEnabledChange",
      collapsibleGroupsChange: "collapsibleGroupsChange",
      dataSourceChange: "dataSourceChange",
      disabledChange: "disabledChange",
      displayExprChange: "displayExprChange",
      elementAttrChange: "elementAttrChange",
      focusStateEnabledChange: "focusStateEnabledChange",
      groupedChange: "groupedChange",
      groupTemplateChange: "groupTemplateChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      indicateLoadingChange: "indicateLoadingChange",
      itemDeleteModeChange: "itemDeleteModeChange",
      itemDraggingChange: "itemDraggingChange",
      itemHoldTimeoutChange: "itemHoldTimeoutChange",
      itemsChange: "itemsChange",
      itemTemplateChange: "itemTemplateChange",
      keyExprChange: "keyExprChange",
      menuItemsChange: "menuItemsChange",
      menuModeChange: "menuModeChange",
      nextButtonTextChange: "nextButtonTextChange",
      noDataTextChange: "noDataTextChange",
      pageLoadingTextChange: "pageLoadingTextChange",
      pageLoadModeChange: "pageLoadModeChange",
      pulledDownTextChange: "pulledDownTextChange",
      pullingDownTextChange: "pullingDownTextChange",
      pullRefreshEnabledChange: "pullRefreshEnabledChange",
      refreshingTextChange: "refreshingTextChange",
      repaintChangesOnlyChange: "repaintChangesOnlyChange",
      rtlEnabledChange: "rtlEnabledChange",
      scrollByContentChange: "scrollByContentChange",
      scrollByThumbChange: "scrollByThumbChange",
      scrollingEnabledChange: "scrollingEnabledChange",
      searchEditorOptionsChange: "searchEditorOptionsChange",
      searchEnabledChange: "searchEnabledChange",
      searchExprChange: "searchExprChange",
      searchModeChange: "searchModeChange",
      searchTimeoutChange: "searchTimeoutChange",
      searchValueChange: "searchValueChange",
      selectAllModeChange: "selectAllModeChange",
      selectAllTextChange: "selectAllTextChange",
      selectByClickChange: "selectByClickChange",
      selectedItemKeysChange: "selectedItemKeysChange",
      selectedItemsChange: "selectedItemsChange",
      selectionModeChange: "selectionModeChange",
      showScrollbarChange: "showScrollbarChange",
      showSelectionControlsChange: "showSelectionControlsChange",
      tabIndexChange: "tabIndexChange",
      useNativeScrollingChange: "useNativeScrollingChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxListComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxListComponent, [{
    type: Component,
    args: [{
      selector: "dx-list",
      standalone: true,
      template: "",
      host: {
        ngSkipHydration: "true"
      },
      imports: [DxIntegrationModule],
      providers: [DxTemplateHost, WatcherHelper, NestedOptionHost, IterableDifferHelper]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: DxTemplateHost
  }, {
    type: WatcherHelper
  }, {
    type: IterableDifferHelper
  }, {
    type: NestedOptionHost
  }, {
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    _buttonsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_buttons]
    }],
    _itemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_items]
    }],
    _menuItemsContentChildren: [{
      type: ContentChildren,
      args: [PROPERTY_TOKEN_menuItems]
    }],
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    allowItemDeleting: [{
      type: Input
    }],
    bounceEnabled: [{
      type: Input
    }],
    collapsibleGroups: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    displayExpr: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    grouped: [{
      type: Input
    }],
    groupTemplate: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    indicateLoading: [{
      type: Input
    }],
    itemDeleteMode: [{
      type: Input
    }],
    itemDragging: [{
      type: Input
    }],
    itemHoldTimeout: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    menuItems: [{
      type: Input
    }],
    menuMode: [{
      type: Input
    }],
    nextButtonText: [{
      type: Input
    }],
    noDataText: [{
      type: Input
    }],
    pageLoadingText: [{
      type: Input
    }],
    pageLoadMode: [{
      type: Input
    }],
    pulledDownText: [{
      type: Input
    }],
    pullingDownText: [{
      type: Input
    }],
    pullRefreshEnabled: [{
      type: Input
    }],
    refreshingText: [{
      type: Input
    }],
    repaintChangesOnly: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    scrollByContent: [{
      type: Input
    }],
    scrollByThumb: [{
      type: Input
    }],
    scrollingEnabled: [{
      type: Input
    }],
    searchEditorOptions: [{
      type: Input
    }],
    searchEnabled: [{
      type: Input
    }],
    searchExpr: [{
      type: Input
    }],
    searchMode: [{
      type: Input
    }],
    searchTimeout: [{
      type: Input
    }],
    searchValue: [{
      type: Input
    }],
    selectAllMode: [{
      type: Input
    }],
    selectAllText: [{
      type: Input
    }],
    selectByClick: [{
      type: Input
    }],
    selectedItemKeys: [{
      type: Input
    }],
    selectedItems: [{
      type: Input
    }],
    selectionMode: [{
      type: Input
    }],
    showScrollbar: [{
      type: Input
    }],
    showSelectionControls: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    useNativeScrolling: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    onContentReady: [{
      type: Output
    }],
    onDisposing: [{
      type: Output
    }],
    onGroupRendered: [{
      type: Output
    }],
    onInitialized: [{
      type: Output
    }],
    onItemClick: [{
      type: Output
    }],
    onItemContextMenu: [{
      type: Output
    }],
    onItemDeleted: [{
      type: Output
    }],
    onItemDeleting: [{
      type: Output
    }],
    onItemHold: [{
      type: Output
    }],
    onItemRendered: [{
      type: Output
    }],
    onItemReordered: [{
      type: Output
    }],
    onItemSwipe: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    onPageLoading: [{
      type: Output
    }],
    onPullRefresh: [{
      type: Output
    }],
    onScroll: [{
      type: Output
    }],
    onSelectAllValueChanged: [{
      type: Output
    }],
    onSelectionChanged: [{
      type: Output
    }],
    onSelectionChanging: [{
      type: Output
    }],
    accessKeyChange: [{
      type: Output
    }],
    activeStateEnabledChange: [{
      type: Output
    }],
    allowItemDeletingChange: [{
      type: Output
    }],
    bounceEnabledChange: [{
      type: Output
    }],
    collapsibleGroupsChange: [{
      type: Output
    }],
    dataSourceChange: [{
      type: Output
    }],
    disabledChange: [{
      type: Output
    }],
    displayExprChange: [{
      type: Output
    }],
    elementAttrChange: [{
      type: Output
    }],
    focusStateEnabledChange: [{
      type: Output
    }],
    groupedChange: [{
      type: Output
    }],
    groupTemplateChange: [{
      type: Output
    }],
    heightChange: [{
      type: Output
    }],
    hintChange: [{
      type: Output
    }],
    hoverStateEnabledChange: [{
      type: Output
    }],
    indicateLoadingChange: [{
      type: Output
    }],
    itemDeleteModeChange: [{
      type: Output
    }],
    itemDraggingChange: [{
      type: Output
    }],
    itemHoldTimeoutChange: [{
      type: Output
    }],
    itemsChange: [{
      type: Output
    }],
    itemTemplateChange: [{
      type: Output
    }],
    keyExprChange: [{
      type: Output
    }],
    menuItemsChange: [{
      type: Output
    }],
    menuModeChange: [{
      type: Output
    }],
    nextButtonTextChange: [{
      type: Output
    }],
    noDataTextChange: [{
      type: Output
    }],
    pageLoadingTextChange: [{
      type: Output
    }],
    pageLoadModeChange: [{
      type: Output
    }],
    pulledDownTextChange: [{
      type: Output
    }],
    pullingDownTextChange: [{
      type: Output
    }],
    pullRefreshEnabledChange: [{
      type: Output
    }],
    refreshingTextChange: [{
      type: Output
    }],
    repaintChangesOnlyChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    scrollByContentChange: [{
      type: Output
    }],
    scrollByThumbChange: [{
      type: Output
    }],
    scrollingEnabledChange: [{
      type: Output
    }],
    searchEditorOptionsChange: [{
      type: Output
    }],
    searchEnabledChange: [{
      type: Output
    }],
    searchExprChange: [{
      type: Output
    }],
    searchModeChange: [{
      type: Output
    }],
    searchTimeoutChange: [{
      type: Output
    }],
    searchValueChange: [{
      type: Output
    }],
    selectAllModeChange: [{
      type: Output
    }],
    selectAllTextChange: [{
      type: Output
    }],
    selectByClickChange: [{
      type: Output
    }],
    selectedItemKeysChange: [{
      type: Output
    }],
    selectedItemsChange: [{
      type: Output
    }],
    selectionModeChange: [{
      type: Output
    }],
    showScrollbarChange: [{
      type: Output
    }],
    showSelectionControlsChange: [{
      type: Output
    }],
    tabIndexChange: [{
      type: Output
    }],
    useNativeScrollingChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }]
  });
})();
var DxListModule = class _DxListModule {
  /** @nocollapse */
  static ɵfac = function DxListModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxListModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxListModule,
    imports: [DxListComponent, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxIntegrationModule, DxTemplateModule],
    exports: [DxListComponent, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxListComponent, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxIntegrationModule, DxTemplateModule, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxListModule, [{
    type: NgModule,
    args: [{
      imports: [DxListComponent, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxIntegrationModule, DxTemplateModule],
      exports: [DxListComponent, DxoItemDraggingModule, DxoCursorOffsetModule, DxiItemModule, DxiMenuItemModule, DxoSearchEditorOptionsModule, DxiButtonModule, DxoOptionsModule, DxiListButtonModule, DxoListCursorOffsetModule, DxiListItemModule, DxoListItemDraggingModule, DxiListMenuItemModule, DxoListOptionsModule, DxoListSearchEditorOptionsModule, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  isCommonPosition,
  PopoverPositionController,
  m_popover_default,
  action_sheet_default,
  DxListComponent,
  DxListModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-list.mjs:
  (*!
   * devextreme-angular
   * Version: 25.1.6
   * Build date: Mon Oct 13 2025
   *
   * Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
   *
   * This software may be modified and distributed under the terms
   * of the MIT license. See the LICENSE file in the root of the project for details.
   *
   * https://github.com/DevExpress/devextreme-angular
   *)
*/
//# sourceMappingURL=chunk-CNVQ3TKS.js.map
