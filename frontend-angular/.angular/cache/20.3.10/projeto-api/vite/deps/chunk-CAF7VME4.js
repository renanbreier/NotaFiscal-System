import {
  message_default
} from "./chunk-XULD25K2.js";
import {
  current,
  isGeneric,
  isMaterialBased
} from "./chunk-BBLJGJFI.js";
import {
  widget_default
} from "./chunk-XX26YRCT.js";
import {
  component_registrator_default
} from "./chunk-54SHI7Z2.js";
import {
  m_support_default
} from "./chunk-A3D3LIWG.js";
import {
  getHeight,
  getWidth,
  renderer_default
} from "./chunk-3GE2VGI4.js";
import {
  _extends
} from "./chunk-4U6OD5AW.js";

// node_modules/devextreme/esm/__internal/ui/load_indicator.js
var LOADINDICATOR_CONTENT_CLASS = "dx-loadindicator-content";
var AnimationType;
!(function(AnimationType2) {
  AnimationType2.Circle = "circle";
  AnimationType2.Sparkle = "sparkle";
})(AnimationType || (AnimationType = {}));
var ANIMATION_TYPE_CLASSES = {
  [AnimationType.Circle]: "dx-loadindicator-content-circle",
  [AnimationType.Sparkle]: "dx-loadindicator-content-sparkle"
};
var LoadIndicator = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false,
      _animationType: AnimationType.Circle,
      activeStateEnabled: false,
      hoverStateEnabled: false,
      indicatorSrc: ""
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device: () => isMaterialBased(themeName),
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device: () => isGeneric(themeName),
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  }
  _useTemplates() {
    return false;
  }
  _init() {
    super._init();
    this.$element().addClass("dx-loadindicator");
    const label = message_default.format("Loading");
    const aria = {
      role: "alert",
      label
    };
    this.setAria(aria);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  }
  _renderWrapper() {
    this._$wrapper = renderer_default("<div>").addClass("dx-loadindicator-wrapper");
    this.$element().append(this._$wrapper);
  }
  _getAnimationTypeContentClass() {
    const {
      _animationType: animationType
    } = this.option();
    return ANIMATION_TYPE_CLASSES[animationType];
  }
  _renderIndicatorContent() {
    const animationClass = this._getAnimationTypeContentClass() ?? "";
    const contentClasses = [LOADINDICATOR_CONTENT_CLASS, animationClass].join(" ");
    this._$content = renderer_default("<div>").addClass(contentClasses);
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      indicatorSrc
    } = this.option();
    const isAnimationAvailable = m_support_default.animation();
    if (indicatorSrc) {
      this._renderImageMarkup();
    } else if (isAnimationAvailable) {
      this._renderAnimationMarkup();
    }
  }
  _getSegmentParams() {
    const {
      _animationType: animationType,
      _animatingSegmentCount: animatingSegmentCount,
      _animatingSegmentInner: animatingSegmentInner
    } = this.option();
    switch (animationType) {
      case AnimationType.Sparkle:
        return {
          segmentCount: 2,
          segmentInner: false
        };
      case AnimationType.Circle:
      default:
        return {
          segmentCount: animatingSegmentCount ?? 0,
          segmentInner: Boolean(animatingSegmentInner)
        };
    }
  }
  _renderAnimationMarkup() {
    this._$indicator = renderer_default("<div>").addClass("dx-loadindicator-icon");
    this._$content.append(this._$indicator);
    const params = this._getSegmentParams();
    this._renderSegments(params);
  }
  _renderSegments(params) {
    const {
      segmentCount,
      segmentInner
    } = params;
    for (let i = segmentCount; i >= 0; i -= 1) {
      var _this$_$indicator;
      const $segment = renderer_default("<div>").addClass("dx-loadindicator-segment").addClass(`dx-loadindicator-segment${i}`);
      if (segmentInner) {
        const $segmentInner = renderer_default("<div>").addClass("dx-loadindicator-segment-inner");
        $segment.append($segmentInner);
      }
      null === (_this$_$indicator = this._$indicator) || void 0 === _this$_$indicator || _this$_$indicator.append($segment);
    }
  }
  _renderImageMarkup() {
    const {
      indicatorSrc
    } = this.option();
    this._$wrapper.addClass("dx-loadindicator-image");
    this._$wrapper.css("backgroundImage", `url(${indicatorSrc})`);
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updateContentSizeForAnimation();
  }
  _updateContentSizeForAnimation() {
    if (!this._$indicator) {
      return;
    }
    let {
      width,
      height
    } = this.option();
    if (width || height) {
      width = getWidth(this.$element());
      height = getHeight(this.$element());
      const minDimension = Math.min(height, width);
      this._$wrapper.css({
        height: minDimension,
        width: minDimension,
        fontSize: minDimension
      });
    }
  }
  _clean() {
    super._clean();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  }
  _removeMarkupForAnimation() {
    if (!this._$indicator) {
      return;
    }
    this._$indicator.remove();
    delete this._$indicator;
  }
  _removeMarkupForImage() {
    this._$wrapper.css("backgroundImage", "none");
  }
  _optionChanged(args) {
    switch (args.name) {
      case "_animatingSegmentCount":
      case "_animatingSegmentInner":
      case "_animationType":
      case "indicatorSrc":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxLoadIndicator", LoadIndicator);
var load_indicator_default = LoadIndicator;

// node_modules/devextreme/esm/ui/load_indicator.js
var load_indicator_default2 = load_indicator_default;

export {
  AnimationType,
  load_indicator_default,
  load_indicator_default2
};
//# sourceMappingURL=chunk-CAF7VME4.js.map
