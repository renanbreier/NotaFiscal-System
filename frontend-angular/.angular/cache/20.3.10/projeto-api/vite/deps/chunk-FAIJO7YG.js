import {
  overlay_default
} from "./chunk-MJRE2EKH.js";
import {
  widget_default
} from "./chunk-XX26YRCT.js";
import {
  CLICK_EVENT_NAME,
  EmptyTemplate,
  component_registrator_default,
  fx_default,
  getBoundingRect,
  getPublicElement,
  move,
  triggerResizeEvent
} from "./chunk-54SHI7Z2.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-N6JIRJK4.js";
import {
  camelize,
  getWidth,
  renderer_default,
  setHeight,
  setWidth
} from "./chunk-3GE2VGI4.js";
import {
  Component,
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
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-GBBTBBS3.js";
import {
  m_events_engine_default
} from "./chunk-4JX72F7N.js";
import {
  Deferred,
  _extends,
  ensureDefined,
  hasWindow,
  isDefined,
  isFunction,
  when
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.animation.js
var animation = {
  getMoveToConfig(direction, position) {
    switch (direction) {
      case "right":
        return {
          transform: `translate(${position}px, 0px)`
        };
      case "left":
        return {
          left: position
        };
      case "top":
      case "bottom":
        return {
          top: position
        };
      default:
        return;
    }
  },
  moveTo(config) {
    const {
      $element,
      position,
      direction = "left",
      duration,
      complete
    } = config;
    const toConfig = this.getMoveToConfig(direction, position);
    const animationType = "right" === direction ? "custom" : "slide";
    fx_default.animate($element.get(0), {
      type: animationType,
      to: toConfig,
      duration,
      complete
    });
  },
  margin(config) {
    const {
      $element,
      margin,
      direction = "left",
      duration,
      complete
    } = config;
    const marginName = `margin${camelize(direction, true)}`;
    const toConfig = {
      [marginName]: margin
    };
    fx_default.animate($element.get(0), {
      to: toConfig,
      duration,
      complete
    });
  },
  fade($element, config, duration, completeAction) {
    fx_default.animate($element.get(0), {
      type: "fade",
      to: config.to,
      from: config.from,
      duration,
      complete: completeAction
    });
  },
  size(config) {
    const {
      $element,
      size,
      direction = "left",
      marginTop = 0,
      duration,
      complete
    } = config;
    const toConfig = {};
    if ("right" === direction || "left" === direction) {
      toConfig.width = size;
    } else {
      toConfig.height = size;
    }
    if ("bottom" === direction) {
      toConfig.marginTop = marginTop;
    }
    fx_default.animate($element.get(0), {
      to: toConfig,
      duration,
      complete
    });
  },
  complete($element) {
    fx_default.stop($element.get(0), true);
  }
};

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.rendering.strategy.js
var DrawerStrategy = class {
  constructor(drawer) {
    this._drawer = drawer;
  }
  getDrawerInstance() {
    return this._drawer;
  }
  renderPanelContent(whenPanelContentRendered) {
    const drawer = this.getDrawerInstance();
    const template = drawer._getTemplate(drawer.option("template"));
    if (template) {
      template.render({
        container: drawer.content(),
        onRendered: () => {
          null === whenPanelContentRendered || void 0 === whenPanelContentRendered || whenPanelContentRendered.resolve();
        }
      });
    }
  }
  renderPosition(changePositionUsingFxAnimation, animationDuration) {
    const whenPositionAnimationCompleted = Deferred();
    const whenShaderAnimationCompleted = Deferred();
    const drawer = this.getDrawerInstance();
    if (changePositionUsingFxAnimation) {
      when.apply(renderer_default, [whenPositionAnimationCompleted, whenShaderAnimationCompleted]).done((() => {
        drawer._animationCompleteHandler();
      }));
    }
    this._internalRenderPosition(changePositionUsingFxAnimation, whenPositionAnimationCompleted);
    if (!changePositionUsingFxAnimation) {
      drawer.resizeViewContent();
    }
    this.renderShaderVisibility(changePositionUsingFxAnimation, animationDuration, whenShaderAnimationCompleted);
  }
  _getPanelOffset(isDrawerOpened) {
    const drawer = this.getDrawerInstance();
    const size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();
    const panelSize = this._getPanelSize(isDrawerOpened) ?? 0;
    return panelSize - size;
  }
  _getPanelSize(isDrawerOpened) {
    return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize();
  }
  renderShaderVisibility(changePositionUsingFxAnimation, duration, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isShaderVisible
    } = drawer.option();
    const fadeConfig = isShaderVisible ? {
      from: 0,
      to: 1
    } : {
      from: 1,
      to: 0
    };
    if (changePositionUsingFxAnimation) {
      animation.fade(renderer_default(drawer._$shader), fadeConfig, duration, (() => {
        this._drawer._toggleShaderVisibility(isShaderVisible);
        null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
      }));
    } else {
      drawer._toggleShaderVisibility(isShaderVisible);
      drawer._$shader.css("opacity", fadeConfig.to);
    }
  }
  getPanelContent() {
    return renderer_default(this.getDrawerInstance().content());
  }
  setPanelSize(calcFromRealPanelSize) {
    this.refreshPanelElementSize(calcFromRealPanelSize);
  }
  refreshPanelElementSize(calcFromRealPanelSize) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened
    } = drawer.option();
    const panelSize = this._getPanelSize(isDrawerOpened);
    if (drawer.isHorizontalDirection()) {
      setWidth(renderer_default(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize);
    } else {
      setHeight(renderer_default(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize);
    }
  }
  isViewContentFirst(position, isRtl) {
    return false;
  }
  onPanelContentRendered() {
  }
  _internalRenderPosition(changePositionUsingFxAnimation, whenPositionAnimationCompleted) {
  }
};
var drawer_rendering_strategy_default = DrawerStrategy;

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.rendering.strategy.overlap.js
var OverlapStrategy = class extends drawer_rendering_strategy_default {
  renderPanelContent(whenPanelContentRendered) {
    delete this._initialPosition;
    const drawer = this.getDrawerInstance();
    const {
      opened,
      minSize,
      template: contentTemplate,
      templatesRenderAsynchronously
    } = drawer.option();
    drawer._overlay = drawer._createComponent(renderer_default(drawer.content()), overlay_default, {
      shading: false,
      container: drawer.content(),
      visualContainer: drawer.getOverlayTarget(),
      position: this._getOverlayPosition(),
      width: opened ? "auto" : minSize ?? 0,
      height: "100%",
      templatesRenderAsynchronously,
      animation: {
        show: {
          duration: 0
        }
      },
      onPositioned: (function(e) {
        this._fixOverlayPosition(e.component.$content());
      }).bind(this),
      contentTemplate,
      onContentReady: (args) => {
        null === whenPanelContentRendered || void 0 === whenPanelContentRendered || whenPanelContentRendered.resolve();
        this._processOverlayZIndex(args.component.content());
      },
      visible: true,
      propagateOutsideClick: true
    });
  }
  _fixOverlayPosition($overlayContent) {
    const position = ensureDefined(this._initialPosition, {
      left: 0,
      top: 0
    });
    move($overlayContent, position);
    if ("right" === this.getDrawerInstance().calcTargetPosition()) {
      $overlayContent.css("left", "auto");
    }
    if ("bottom" === this.getDrawerInstance().calcTargetPosition()) {
      $overlayContent.css("top", "auto");
      $overlayContent.css("bottom", "0px");
    }
  }
  _getOverlayPosition() {
    const drawer = this.getDrawerInstance();
    const panelPosition = drawer.calcTargetPosition();
    let result = {};
    switch (panelPosition) {
      case "left":
        result = {
          my: "top left",
          at: "top left"
        };
        break;
      case "right":
        result = {
          my: drawer.option("rtlEnabled") ? "top left" : "top right",
          at: "top right"
        };
        break;
      case "top":
      case "bottom":
        result = {
          my: panelPosition,
          at: panelPosition
        };
    }
    result.of = drawer.getOverlayTarget().get(0);
    return result;
  }
  refreshPanelElementSize(calcFromRealPanelSize) {
    const drawer = this.getDrawerInstance();
    const overlay = drawer.getOverlay();
    const {
      opened: isDrawerOpened
    } = drawer.option();
    if (!overlay) {
      return;
    }
    if (drawer.isHorizontalDirection()) {
      overlay.option("height", "100%");
      overlay.option("width", calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(isDrawerOpened));
    } else {
      overlay.option("width", getWidth(drawer.getOverlayTarget()));
      overlay.option("height", calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(isDrawerOpened));
    }
  }
  onPanelContentRendered() {
    this._updateViewContentStyles();
  }
  _updateViewContentStyles() {
    const drawer = this.getDrawerInstance();
    const {
      minSize
    } = drawer.option();
    renderer_default(drawer.viewContent()).css(`padding${camelize(drawer.calcTargetPosition(), true)}`, minSize);
    renderer_default(drawer.viewContent()).css("transform", "inherit");
  }
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const $panel = renderer_default(drawer.content());
    const {
      opened: isDrawerOpened,
      revealMode,
      animationDuration
    } = drawer.option();
    const $panelOverlayContent = drawer.getOverlay().$content();
    const targetPanelPosition = drawer.calcTargetPosition();
    const panelSize = this._getPanelSize(isDrawerOpened) ?? 0;
    const panelOffset = this._getPanelOffset(isDrawerOpened) * drawer._getPositionCorrection();
    const marginTop = drawer.getRealPanelHeight() - panelSize;
    this._updateViewContentStyles();
    if (changePositionUsingFxAnimation) {
      if ("slide" === revealMode) {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: panelOffset
        } : {
          top: panelOffset
        };
        animation.moveTo({
          complete: () => {
            null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
          },
          duration: animationDuration,
          direction: targetPanelPosition,
          $element: $panel,
          position: panelOffset
        });
      } else if ("expand" === revealMode) {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: 0
        } : {
          top: 0
        };
        move($panelOverlayContent, this._initialPosition);
        animation.size({
          complete: () => {
            null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
          },
          duration: animationDuration,
          direction: targetPanelPosition,
          $element: $panelOverlayContent,
          size: panelSize,
          marginTop
        });
      }
    } else if ("slide" === revealMode) {
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: panelOffset
      } : {
        top: panelOffset
      };
      move($panel, this._initialPosition);
    } else if ("expand" === revealMode) {
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: 0
      } : {
        top: 0
      };
      move($panelOverlayContent, this._initialPosition);
      if (drawer.isHorizontalDirection()) {
        renderer_default($panelOverlayContent).css("width", panelSize);
      } else {
        renderer_default($panelOverlayContent).css("height", panelSize);
        if ("bottom" === targetPanelPosition) {
          renderer_default($panelOverlayContent).css("marginTop", marginTop);
        }
      }
    }
  }
  getPanelContent() {
    return renderer_default(this.getDrawerInstance().getOverlay().content());
  }
  _processOverlayZIndex(element) {
    const styles = renderer_default(element).get(0).style;
    const zIndex = styles.zIndex || 1;
    this.getDrawerInstance().setZIndex(zIndex);
  }
  isViewContentFirst(position) {
    return "right" === position || "bottom" === position;
  }
};
var drawer_rendering_strategy_overlap_default = OverlapStrategy;

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.rendering.strategy.push.js
var PushStrategy = class extends drawer_rendering_strategy_default {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened,
      animationDuration
    } = drawer.option();
    const openedPanelSize = this._getPanelSize(true);
    const contentPosition = this._getPanelSize(isDrawerOpened) * drawer._getPositionCorrection();
    renderer_default(drawer.content()).css(drawer.isHorizontalDirection() ? "width" : "height", openedPanelSize);
    if (drawer.getMinSize()) {
      let paddingCssPropertyName = "padding";
      switch (drawer.calcTargetPosition()) {
        case "left":
          paddingCssPropertyName += "Right";
          break;
        case "right":
          paddingCssPropertyName += "Left";
          break;
        case "top":
          paddingCssPropertyName += "Bottom";
          break;
        case "bottom":
          paddingCssPropertyName += "Top";
      }
      renderer_default(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize());
    }
    if (changePositionUsingFxAnimation) {
      animation.moveTo({
        $element: renderer_default(drawer.viewContent()),
        position: contentPosition,
        direction: drawer.calcTargetPosition(),
        duration: animationDuration,
        complete: () => {
          null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
        }
      });
    } else if (drawer.isHorizontalDirection()) {
      move(renderer_default(drawer.viewContent()), {
        left: contentPosition
      });
    } else {
      move(renderer_default(drawer.viewContent()), {
        top: contentPosition
      });
    }
  }
  onPanelContentRendered() {
    renderer_default(this.getDrawerInstance().viewContent()).addClass("dx-theme-background-color");
  }
};
var drawer_rendering_strategy_push_default = PushStrategy;

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.rendering.strategy.shrink.js
var ShrinkStrategy = class extends drawer_rendering_strategy_default {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened,
      revealMode,
      animationDuration
    } = drawer.option();
    const direction = drawer.calcTargetPosition();
    const $panel = renderer_default(drawer.content());
    const panelSize = this._getPanelSize(isDrawerOpened);
    const panelOffset = this._getPanelOffset(isDrawerOpened);
    if (changePositionUsingFxAnimation) {
      if ("slide" === revealMode) {
        animation.margin({
          complete: () => {
            null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: animationDuration,
          direction,
          margin: panelOffset
        });
      } else if ("expand" === revealMode) {
        animation.size({
          complete: () => {
            null === whenAnimationCompleted || void 0 === whenAnimationCompleted || whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: animationDuration,
          direction,
          size: panelSize
        });
      }
    } else if ("slide" === revealMode) {
      $panel.css(`margin${camelize(direction, true)}`, panelOffset);
    } else if ("expand" === revealMode) {
      $panel.css(drawer.isHorizontalDirection() ? "width" : "height", panelSize);
    }
  }
  isViewContentFirst(position, isRtl) {
    return (isRtl ? "left" === position : "right" === position) || "bottom" === position;
  }
};
var drawer_rendering_strategy_shrink_default = ShrinkStrategy;

// node_modules/devextreme/esm/__internal/ui/drawer/drawer.js
var Drawer = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      position: "left",
      opened: false,
      minSize: null,
      maxSize: null,
      shading: false,
      template: "panel",
      openedStateMode: "shrink",
      revealMode: "slide",
      animationEnabled: true,
      animationDuration: 400,
      closeOnOutsideClick: false,
      contentTemplate: "content"
    });
  }
  _init() {
    super._init();
    this._initStrategy();
    this.$element().addClass("dx-drawer");
    this._whenAnimationCompleted = void 0;
    this._whenPanelContentRendered = void 0;
    this._whenPanelContentRefreshed = void 0;
    this._$wrapper = renderer_default("<div>").addClass("dx-drawer-wrapper");
    this._$viewContentWrapper = renderer_default("<div>").addClass("dx-drawer-content");
    this._$wrapper.append(this._$viewContentWrapper);
    this.$element().append(this._$wrapper);
  }
  _initStrategy() {
    const {
      openedStateMode
    } = this.option();
    switch (openedStateMode) {
      case "push":
      default:
        this._strategy = new drawer_rendering_strategy_push_default(this);
        break;
      case "shrink":
        this._strategy = new drawer_rendering_strategy_shrink_default(this);
        break;
      case "overlap":
        this._strategy = new drawer_rendering_strategy_overlap_default(this);
    }
  }
  _getAnonymousTemplateName() {
    return "content";
  }
  _initTemplates() {
    const defaultTemplates = {};
    defaultTemplates.panel = new EmptyTemplate();
    defaultTemplates.content = new EmptyTemplate();
    this._templateManager.addDefaultTemplates(defaultTemplates);
    super._initTemplates();
  }
  _viewContentWrapperClickHandler(e) {
    const {
      opened,
      shading
    } = this.option();
    let {
      closeOnOutsideClick
    } = this.option();
    if (isFunction(closeOnOutsideClick)) {
      closeOnOutsideClick = closeOnOutsideClick(e);
    }
    if (closeOnOutsideClick && opened) {
      this.stopAnimations();
      if (shading) {
        e.preventDefault();
      }
      this.hide();
    }
  }
  _initMarkup() {
    super._initMarkup();
    const {
      opened
    } = this.option();
    this._toggleOpenedStateClass(opened);
    this._renderPanelContentWrapper();
    this._refreshOpenedStateModeClass();
    this._refreshRevealModeClass();
    this._renderShader();
    this._refreshPositionClass();
    this._whenPanelContentRendered = Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRendered);
    this._strategy.onPanelContentRendered();
    this._renderViewContent();
    m_events_engine_default.off(this._$viewContentWrapper, CLICK_EVENT_NAME);
    m_events_engine_default.on(this._$viewContentWrapper, CLICK_EVENT_NAME, this._viewContentWrapperClickHandler.bind(this));
    this._refreshWrapperChildrenOrder();
  }
  _render() {
    var _this$_whenPanelConte;
    this._initMinMaxSize();
    super._render();
    null === (_this$_whenPanelConte = this._whenPanelContentRendered) || void 0 === _this$_whenPanelConte || _this$_whenPanelConte.always((() => {
      this._initMinMaxSize();
      const {
        revealMode
      } = this.option();
      this._strategy.refreshPanelElementSize("slide" === revealMode);
      this._renderPosition(true);
      this._removePanelManualPosition();
    }));
  }
  _removePanelManualPosition() {
    var _this$_$panelContentW;
    if (null !== (_this$_$panelContentW = this._$panelContentWrapper) && void 0 !== _this$_$panelContentW && _this$_$panelContentW.attr("manualposition")) {
      this._$panelContentWrapper.removeAttr("manualPosition");
      this._$panelContentWrapper.css({
        position: "",
        top: "",
        left: "",
        right: "",
        bottom: ""
      });
    }
  }
  _togglePanelContentHiddenClass() {
    const callback = () => {
      var _this$_$panelContentW2;
      const {
        minSize,
        opened
      } = this.option();
      const shouldBeSet = minSize ? false : !opened;
      null === (_this$_$panelContentW2 = this._$panelContentWrapper) || void 0 === _this$_$panelContentW2 || _this$_$panelContentW2.toggleClass("dx-drawer-panel-content-hidden", shouldBeSet);
    };
    if (this._whenAnimationCompleted && !this.option("opened")) {
      when(this._whenAnimationCompleted).done(callback);
    } else {
      callback();
    }
  }
  _renderPanelContentWrapper() {
    const {
      openedStateMode,
      opened,
      minSize
    } = this.option();
    this._$panelContentWrapper = renderer_default("<div>").addClass("dx-drawer-panel-content");
    this._togglePanelContentHiddenClass();
    const position = this.calcTargetPosition();
    if ("push" === openedStateMode && position && ["top", "bottom"].includes(position)) {
      this._$panelContentWrapper.addClass("dx-drawer-panel-content-push-top-or-bottom");
    }
    if ("overlap" !== openedStateMode && !opened && !minSize) {
      this._$panelContentWrapper.attr("manualposition", true);
      this._$panelContentWrapper.css({
        position: "absolute",
        top: "-10000px",
        left: "-10000px",
        right: "auto",
        bottom: "auto"
      });
    }
    this._$wrapper.append(this._$panelContentWrapper);
  }
  _refreshOpenedStateModeClass(prevOpenedStateMode) {
    if (prevOpenedStateMode) {
      this.$element().removeClass(`dx-drawer-${prevOpenedStateMode}`);
    }
    const {
      openedStateMode
    } = this.option();
    this.$element().addClass(`dx-drawer-${openedStateMode}`);
  }
  _refreshPositionClass() {
    this.$element().removeClass(["left", "right", "top", "bottom"].map(((position) => `dx-drawer-${position}`)).join(" ")).addClass(`dx-drawer-${this.calcTargetPosition()}`);
  }
  _refreshWrapperChildrenOrder() {
    const position = this.calcTargetPosition();
    const {
      rtlEnabled
    } = this.option();
    if (this._strategy.isViewContentFirst(position, rtlEnabled)) {
      this._$wrapper.prepend(this._$viewContentWrapper);
    } else if (this._$panelContentWrapper) {
      this._$wrapper.prepend(this._$panelContentWrapper);
    }
  }
  _refreshRevealModeClass(prevRevealMode) {
    if (prevRevealMode) {
      this.$element().removeClass(`dx-drawer-${prevRevealMode}`);
    }
    const {
      revealMode
    } = this.option();
    this.$element().addClass(`dx-drawer-${revealMode}`);
  }
  _renderViewContent() {
    const contentTemplateOption = this.option("contentTemplate");
    const contentTemplate = this._getTemplate(contentTemplateOption);
    if (contentTemplate) {
      const $viewTemplate = contentTemplate.render({
        container: this.viewContent(),
        noModel: true,
        transclude: this._templateManager.anonymousTemplateName === contentTemplateOption
      });
      if ($viewTemplate.hasClass("ng-scope")) {
        renderer_default(this._$viewContentWrapper).children().not(".dx-drawer-shader").replaceWith($viewTemplate);
      }
    }
  }
  _renderShader() {
    this._$shader = this._$shader || renderer_default("<div>").addClass("dx-drawer-shader");
    this._$shader.appendTo(this.viewContent());
    const {
      opened
    } = this.option();
    this._toggleShaderVisibility(opened);
  }
  _initSize() {
    this._initMinMaxSize();
  }
  _initMinMaxSize() {
    const realPanelSize = this.isHorizontalDirection() ? this.getRealPanelWidth() : this.getRealPanelHeight();
    const {
      maxSize,
      minSize
    } = this.option();
    this._maxSize = maxSize || realPanelSize;
    this._minSize = minSize || 0;
  }
  calcTargetPosition() {
    const {
      position,
      rtlEnabled
    } = this.option();
    if ("before" === position) {
      return rtlEnabled ? "right" : "left";
    }
    if ("after" === position) {
      return rtlEnabled ? "left" : "right";
    }
    return position;
  }
  getOverlayTarget() {
    return this._$wrapper;
  }
  getOverlay() {
    return this._overlay;
  }
  getMaxSize() {
    return this._maxSize;
  }
  getMinSize() {
    return this._minSize;
  }
  getRealPanelWidth() {
    if (hasWindow()) {
      const {
        templateSize
      } = this.option();
      if (isDefined(templateSize)) {
        return templateSize;
      }
      return getBoundingRect(this._getPanelTemplateElement()).width;
    }
    return 0;
  }
  getRealPanelHeight() {
    if (hasWindow()) {
      const {
        templateSize
      } = this.option();
      if (isDefined(templateSize)) {
        return templateSize;
      }
      return getBoundingRect(this._getPanelTemplateElement()).height;
    }
    return 0;
  }
  _getPanelTemplateElement() {
    const $panelContent = this._strategy.getPanelContent();
    let $result = $panelContent;
    if ($panelContent.children().length) {
      $result = $panelContent.children().eq(0);
      if ($panelContent.hasClass("dx-overlay-content") && $result.hasClass("dx-template-wrapper") && $result.children().length) {
        $result = $result.children().eq(0);
      }
    }
    return $result.get(0);
  }
  isHorizontalDirection() {
    const position = this.calcTargetPosition();
    return "left" === position || "right" === position;
  }
  stopAnimations() {
    let jumpToEnd = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    fx_default.stop(this._$shader.get(0), jumpToEnd);
    fx_default.stop(renderer_default(this.content()).get(0), jumpToEnd);
    fx_default.stop(renderer_default(this.viewContent()).get(0), jumpToEnd);
    const overlay = this.getOverlay();
    if (overlay) {
      fx_default.stop(renderer_default(overlay.$content()).get(0), jumpToEnd);
    }
  }
  setZIndex(zIndex) {
    var _this$_$panelContentW3;
    this._$shader.css("zIndex", zIndex - 1);
    null === (_this$_$panelContentW3 = this._$panelContentWrapper) || void 0 === _this$_$panelContentW3 || _this$_$panelContentW3.css("zIndex", zIndex);
  }
  resizeContent() {
    this.resizeViewContent();
  }
  resizeViewContent() {
    triggerResizeEvent(this.viewContent());
  }
  _isInvertedPosition() {
    const position = this.calcTargetPosition();
    return "right" === position || "bottom" === position;
  }
  _renderPosition(disableAnimation, jumpToEnd) {
    this.stopAnimations(jumpToEnd);
    this._whenAnimationCompleted = Deferred();
    const {
      animationDuration,
      animationEnabled: optionAnimationEnabled,
      opened
    } = this.option();
    const animationEnabled = !disableAnimation && optionAnimationEnabled;
    if (!animationEnabled) {
      this._whenAnimationCompleted.resolve();
    }
    if (!hasWindow()) {
      return;
    }
    renderer_default(this.viewContent()).css("paddingLeft", 0);
    renderer_default(this.viewContent()).css("paddingRight", 0);
    renderer_default(this.viewContent()).css("paddingTop", 0);
    renderer_default(this.viewContent()).css("paddingBottom", 0);
    if (opened) {
      this._toggleShaderVisibility(opened);
    }
    this._strategy.renderPosition(animationEnabled, animationDuration);
  }
  _animationCompleteHandler() {
    var _this$_whenAnimationC;
    this.resizeViewContent();
    null === (_this$_whenAnimationC = this._whenAnimationCompleted) || void 0 === _this$_whenAnimationC || _this$_whenAnimationC.resolve();
  }
  _getPositionCorrection() {
    return this._isInvertedPosition() ? -1 : 1;
  }
  _dispose() {
    animation.complete(renderer_default(this.viewContent()));
    super._dispose();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    this._initMinMaxSize();
    const {
      revealMode
    } = this.option();
    this._strategy.refreshPanelElementSize("slide" === revealMode);
    this._renderPosition(true);
  }
  _toggleShaderVisibility(visible) {
    if (this.option("shading")) {
      this._$shader.toggleClass("dx-state-invisible", !visible);
      this._$shader.css("visibility", visible ? "visible" : "hidden");
    } else {
      this._$shader.toggleClass("dx-state-invisible", true);
    }
  }
  _toggleOpenedStateClass(opened) {
    this.$element().toggleClass("dx-drawer-opened", opened);
  }
  _refreshPanel() {
    renderer_default(this.viewContent()).css("left", 0);
    renderer_default(this.viewContent()).css("transform", "translate(0px, 0px)");
    renderer_default(this.viewContent()).removeClass("dx-theme-background-color");
    this._removePanelContentWrapper();
    this._removeOverlay();
    this._renderPanelContentWrapper();
    this._refreshWrapperChildrenOrder();
    this._whenPanelContentRefreshed = Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
    this._strategy.onPanelContentRendered();
    if (hasWindow()) {
      this._whenPanelContentRefreshed.always((() => {
        const {
          revealMode
        } = this.option();
        this._strategy.refreshPanelElementSize("slide" === revealMode);
        this._renderPosition(true, true);
        this._removePanelManualPosition();
      }));
    }
  }
  _clean() {
    this._cleanFocusState();
    this._removePanelContentWrapper();
    this._removeOverlay();
  }
  _removePanelContentWrapper() {
    if (this._$panelContentWrapper) {
      this._$panelContentWrapper.remove();
    }
  }
  _removeOverlay() {
    if (this._overlay) {
      this._overlay.dispose();
      delete this._overlay;
      delete this._$panelContentWrapper;
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case "width":
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case "opened":
        this._renderPosition();
        this._toggleOpenedStateClass(args.value);
        this._togglePanelContentHiddenClass();
        break;
      case "position":
        this._refreshPositionClass();
        this._refreshWrapperChildrenOrder();
        this._invalidate();
        break;
      case "contentTemplate":
      case "template":
        this._invalidate();
        break;
      case "openedStateMode":
        this._initStrategy();
        this._refreshOpenedStateModeClass(args.previousValue);
        this._refreshPanel();
        break;
      case "minSize":
        this._initMinMaxSize();
        this._renderPosition(true);
        this._togglePanelContentHiddenClass();
        break;
      case "maxSize":
        this._initMinMaxSize();
        this._renderPosition(true);
        break;
      case "revealMode":
        this._refreshRevealModeClass(args.previousValue);
        this._refreshPanel();
        break;
      case "shading": {
        const {
          opened
        } = this.option();
        this._toggleShaderVisibility(opened);
        break;
      }
      case "animationEnabled":
      case "animationDuration":
      case "closeOnOutsideClick":
        break;
      default:
        super._optionChanged(args);
    }
  }
  content() {
    return this._$panelContentWrapper ? getPublicElement(this._$panelContentWrapper) : void 0;
  }
  viewContent() {
    return getPublicElement(this._$viewContentWrapper);
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  toggle(opened) {
    var _this$_whenAnimationC2;
    const {
      opened: currentOpened
    } = this.option();
    const targetOpened = opened ?? !currentOpened;
    this.option("opened", targetOpened);
    return null === (_this$_whenAnimationC2 = this._whenAnimationCompleted) || void 0 === _this$_whenAnimationC2 ? void 0 : _this$_whenAnimationC2.promise();
  }
};
component_registrator_default("dxDrawer", Drawer);
var drawer_default = Drawer;

// node_modules/devextreme/esm/ui/drawer.js
var drawer_default2 = drawer_default;

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-drawer.mjs
var _c0 = ["*"];
var DxDrawerComponent = class _DxDrawerComponent extends DxComponent {
  instance = null;
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
   * Specifies the duration of the drawer&apos;s opening and closing animation (in milliseconds). Applies only if animationEnabled is true.
  
   */
  get animationDuration() {
    return this._getOption("animationDuration");
  }
  set animationDuration(value) {
    this._setOption("animationDuration", value);
  }
  /**
   * Specifies whether to use an opening and closing animation.
  
   */
  get animationEnabled() {
    return this._getOption("animationEnabled");
  }
  set animationEnabled(value) {
    this._setOption("animationEnabled", value);
  }
  /**
   * Specifies whether to close the drawer if a user clicks or taps the view area.
  
   */
  get closeOnOutsideClick() {
    return this._getOption("closeOnOutsideClick");
  }
  set closeOnOutsideClick(value) {
    this._setOption("closeOnOutsideClick", value);
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
   * Specifies the global attributes to be attached to the UI component&apos;s container element.
  
   */
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
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
   * Specifies the drawer&apos;s width or height (depending on the drawer&apos;s position) in the opened state.
  
   */
  get maxSize() {
    return this._getOption("maxSize");
  }
  set maxSize(value) {
    this._setOption("maxSize", value);
  }
  /**
   * Specifies the drawer&apos;s width or height (depending on the drawer&apos;s position) in the closed state.
  
   */
  get minSize() {
    return this._getOption("minSize");
  }
  set minSize(value) {
    this._setOption("minSize", value);
  }
  /**
   * Specifies whether the drawer is opened.
  
   */
  get opened() {
    return this._getOption("opened");
  }
  set opened(value) {
    this._setOption("opened", value);
  }
  /**
   * Specifies how the drawer interacts with the view in the opened state.
  
   */
  get openedStateMode() {
    return this._getOption("openedStateMode");
  }
  set openedStateMode(value) {
    this._setOption("openedStateMode", value);
  }
  /**
   * Specifies the drawer&apos;s position in relation to the view.
  
   */
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  /**
   * Specifies the drawer&apos;s reveal mode.
  
   */
  get revealMode() {
    return this._getOption("revealMode");
  }
  set revealMode(value) {
    this._setOption("revealMode", value);
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
   * Specifies whether to shade the view when the drawer is opened.
  
   */
  get shading() {
    return this._getOption("shading");
  }
  set shading(value) {
    this._setOption("shading", value);
  }
  /**
   * Specifies the drawer&apos;s content.
  
   */
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
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
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function used in JavaScript frameworks to save the UI component instance.
  
  
   */
  onInitialized;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  activeStateEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  animationDurationChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  animationEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  closeOnOutsideClickChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  disabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  elementAttrChange;
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
  maxSizeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  minSizeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  openedChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  openedStateModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  positionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  revealModeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  shadingChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  templateChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._createEventEmitters([{
      subscribe: "disposing",
      emit: "onDisposing"
    }, {
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      emit: "activeStateEnabledChange"
    }, {
      emit: "animationDurationChange"
    }, {
      emit: "animationEnabledChange"
    }, {
      emit: "closeOnOutsideClickChange"
    }, {
      emit: "disabledChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "hoverStateEnabledChange"
    }, {
      emit: "maxSizeChange"
    }, {
      emit: "minSizeChange"
    }, {
      emit: "openedChange"
    }, {
      emit: "openedStateModeChange"
    }, {
      emit: "positionChange"
    }, {
      emit: "revealModeChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "shadingChange"
    }, {
      emit: "templateChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new drawer_default2(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  /** @nocollapse */
  static ɵfac = function DxDrawerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxDrawerComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxDrawerComponent,
    selectors: [["dx-drawer"]],
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      activeStateEnabled: "activeStateEnabled",
      animationDuration: "animationDuration",
      animationEnabled: "animationEnabled",
      closeOnOutsideClick: "closeOnOutsideClick",
      disabled: "disabled",
      elementAttr: "elementAttr",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      maxSize: "maxSize",
      minSize: "minSize",
      opened: "opened",
      openedStateMode: "openedStateMode",
      position: "position",
      revealMode: "revealMode",
      rtlEnabled: "rtlEnabled",
      shading: "shading",
      template: "template",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      activeStateEnabledChange: "activeStateEnabledChange",
      animationDurationChange: "animationDurationChange",
      animationEnabledChange: "animationEnabledChange",
      closeOnOutsideClickChange: "closeOnOutsideClickChange",
      disabledChange: "disabledChange",
      elementAttrChange: "elementAttrChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      hoverStateEnabledChange: "hoverStateEnabledChange",
      maxSizeChange: "maxSizeChange",
      minSizeChange: "minSizeChange",
      openedChange: "openedChange",
      openedStateModeChange: "openedStateModeChange",
      positionChange: "positionChange",
      revealModeChange: "revealModeChange",
      rtlEnabledChange: "rtlEnabledChange",
      shadingChange: "shadingChange",
      templateChange: "templateChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxDrawerComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxDrawerComponent, [{
    type: Component,
    args: [{
      selector: "dx-drawer",
      standalone: true,
      template: "<ng-content></ng-content>",
      host: {
        ngSkipHydration: "true"
      },
      imports: [DxIntegrationModule],
      providers: [DxTemplateHost, WatcherHelper, NestedOptionHost]
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
    activeStateEnabled: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }],
    animationEnabled: [{
      type: Input
    }],
    closeOnOutsideClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    elementAttr: [{
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
    maxSize: [{
      type: Input
    }],
    minSize: [{
      type: Input
    }],
    opened: [{
      type: Input
    }],
    openedStateMode: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    revealMode: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    shading: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    onDisposing: [{
      type: Output
    }],
    onInitialized: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    activeStateEnabledChange: [{
      type: Output
    }],
    animationDurationChange: [{
      type: Output
    }],
    animationEnabledChange: [{
      type: Output
    }],
    closeOnOutsideClickChange: [{
      type: Output
    }],
    disabledChange: [{
      type: Output
    }],
    elementAttrChange: [{
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
    maxSizeChange: [{
      type: Output
    }],
    minSizeChange: [{
      type: Output
    }],
    openedChange: [{
      type: Output
    }],
    openedStateModeChange: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    revealModeChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    shadingChange: [{
      type: Output
    }],
    templateChange: [{
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
var DxDrawerModule = class _DxDrawerModule {
  /** @nocollapse */
  static ɵfac = function DxDrawerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxDrawerModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxDrawerModule,
    imports: [DxDrawerComponent, DxIntegrationModule, DxTemplateModule],
    exports: [DxDrawerComponent, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxDrawerComponent, DxIntegrationModule, DxTemplateModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxDrawerModule, [{
    type: NgModule,
    args: [{
      imports: [DxDrawerComponent, DxIntegrationModule, DxTemplateModule],
      exports: [DxDrawerComponent, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  drawer_default2 as drawer_default,
  DxDrawerComponent,
  DxDrawerModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-drawer.mjs:
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
//# sourceMappingURL=chunk-FAIJO7YG.js.map
