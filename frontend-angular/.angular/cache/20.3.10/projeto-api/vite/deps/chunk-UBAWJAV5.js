import {
  m_emitter_gesture_scroll_default
} from "./chunk-CYT7ZZVJ.js";
import {
  core_default,
  message_default
} from "./chunk-7AOZESUR.js";
import {
  current,
  isMaterial
} from "./chunk-2D4FZXPO.js";
import {
  CLICK_EVENT_NAME,
  _objectWithoutPropertiesLoose,
  addNamespace,
  click,
  component_registrator_default,
  convertRulesToOptions,
  createDefaultOptionRules,
  dom_component_default,
  dxClick,
  focus,
  getPublicElement,
  keyboard,
  m_keyboard_processor_default,
  m_pointer_default,
  replaceWith,
  resize,
  visibility
} from "./chunk-ICLEXNO5.js";
import {
  EventsStrategy,
  devices_default,
  fitIntoRange,
  multiplyInExponentialForm,
  resize_callbacks_default,
  sign
} from "./chunk-DONQLAZQ.js";
import {
  camelize,
  cleanDataRecursive,
  getOuterHeight,
  getOuterWidth,
  normalizeStyleProp,
  renderer_default
} from "./chunk-Q6FQHMWM.js";
import {
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  Deferred,
  _extends,
  class_default,
  config_default,
  config_default2,
  dependency_injector_default,
  dom_adapter_default,
  each,
  errors_default,
  escapeRegExp,
  extend,
  fromPromise,
  getPathParts,
  grep,
  isBoolean,
  isDate,
  isDefined,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPromise,
  isRenderer,
  isString
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/core/utils/m_icon.js
var ICON_CLASS = "dx-icon";
var getImageSourceType = (source) => {
  if (!source || "string" !== typeof source) {
    return false;
  }
  if (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(source)) {
    return "svg";
  }
  if (/data:.*base64|\.|[^<\s]\/{1,1}/.test(source)) {
    return "image";
  }
  if (/^[\w-_]+$/.test(source)) {
    return "dxIcon";
  }
  if (/^\s?([\w-_:]\s?)+$/.test(source)) {
    return "fontIcon";
  }
  return false;
};
var getImageContainer = (source) => {
  switch (getImageSourceType(source)) {
    case "image":
      return renderer_default("<img>").attr("src", source).addClass("dx-icon");
    case "fontIcon":
      return renderer_default("<i>").addClass(`dx-icon ${source}`);
    case "dxIcon":
      return renderer_default("<i>").addClass(`dx-icon dx-icon-${source}`);
    case "svg":
      return renderer_default("<i>").addClass("dx-icon dx-svg-icon").append(source);
    default:
      return null;
  }
};

// node_modules/devextreme/esm/common/core/localization/utils.js
function roundByAbs(value) {
  const valueSign = sign(value);
  return valueSign * Math.round(Math.abs(value));
}
function adjustValue(value, precision) {
  const precisionMultiplier = Math.pow(10, precision);
  const intermediateValue = multiplyInExponentialForm(value, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
function toFixed(value, precision) {
  const valuePrecision = precision || 0;
  const adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value;
  return adjustedValue.toFixed(valuePrecision);
}

// node_modules/devextreme/esm/common/core/localization/ldml/number.js
var DEFAULT_CONFIG = {
  thousandsSeparator: ",",
  decimalSeparator: "."
};
function getGroupSizes(formatString) {
  return formatString.split(",").slice(1).map((function(str) {
    let singleQuotesLeft = 0;
    return str.split("").filter((function(char, index) {
      singleQuotesLeft += "'" === char;
      const isDigit = "#" === char || "0" === char;
      const isInStub = singleQuotesLeft % 2;
      return isDigit && !isInStub;
    })).length;
  }));
}
function splitSignParts(format) {
  let separatorChar = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ";";
  let escapingChar = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "'";
  const parts = [];
  let currentPart = "";
  let state = "searchingSeparator";
  for (let i = 0; i < format.length; i++) {
    const char = format[i];
    if ("searchingSeparator" === state && char === escapingChar) {
      state = "skippingSeparationInsideEscaping";
    } else if ("skippingSeparationInsideEscaping" === state && char === escapingChar) {
      state = "searchingSeparator";
    } else if ("searchingSeparator" === state && char === separatorChar) {
      state = "separating";
      parts.push(currentPart);
      currentPart = "";
    }
    if ("separating" !== state) {
      currentPart += char;
    } else {
      state = "searchingSeparator";
    }
  }
  parts.push(currentPart);
  return parts;
}
function getSignParts(format) {
  const signParts = splitSignParts(format);
  if (1 === signParts.length) {
    signParts.push("-" + signParts[0]);
  }
  return signParts;
}
function reverseString(str) {
  return str.toString().split("").reverse().join("");
}
function isPercentFormat(format) {
  return -1 !== format.indexOf("%") && !format.match(/'[^']*%[^']*'/g);
}
function removeStubs(str) {
  return str.replace(/'[^']*'/g, "");
}
function getNonRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  const format = removeStubs(floatFormat);
  return format.length - format.replace(/[#]/g, "").length;
}
function getRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  const format = removeStubs(floatFormat);
  return format.length - format.replace(/[0]/g, "").length;
}
function normalizeValueString(valuePart, minDigitCount, maxDigitCount) {
  if (!valuePart) {
    return "";
  }
  if (valuePart.length > maxDigitCount) {
    valuePart = valuePart.substr(0, maxDigitCount);
  }
  while (valuePart.length > minDigitCount && "0" === valuePart.slice(-1)) {
    valuePart = valuePart.substr(0, valuePart.length - 1);
  }
  while (valuePart.length < minDigitCount) {
    valuePart += "0";
  }
  return valuePart;
}
function applyGroups(valueString, groupSizes, thousandsSeparator) {
  if (!groupSizes.length) {
    return valueString;
  }
  const groups = [];
  let index = 0;
  while (valueString) {
    const groupSize = groupSizes[index];
    if (!groupSize) {
      break;
    }
    groups.push(valueString.slice(0, groupSize));
    valueString = valueString.slice(groupSize);
    if (index < groupSizes.length - 1) {
      index++;
    }
  }
  return groups.join(thousandsSeparator);
}
function formatNumberPart(format, valueString) {
  return format.split("'").map((function(formatPart, escapeIndex) {
    const isEscape = escapeIndex % 2;
    if (!formatPart && isEscape) {
      return "'";
    }
    return isEscape ? formatPart : formatPart.replace(/[,#0]+/, valueString);
  })).join("");
}
function getFloatPointIndex(format) {
  let isEscape = false;
  for (let index = 0; index < format.length; index++) {
    if ("'" === format[index]) {
      isEscape = !isEscape;
    }
    if ("." === format[index] && !isEscape) {
      return index;
    }
  }
  return format.length;
}
function getFormatter(format, config) {
  config = config || DEFAULT_CONFIG;
  return function(value) {
    if ("number" !== typeof value || isNaN(value)) {
      return "";
    }
    const signFormatParts = getSignParts(format);
    const isPositiveZero = 1 / value === 1 / 0;
    const isPositive = value > 0 || isPositiveZero;
    const numberFormat = signFormatParts[isPositive ? 0 : 1];
    const floatPointIndex = getFloatPointIndex(numberFormat);
    const floatFormatParts = [numberFormat.substr(0, floatPointIndex), numberFormat.substr(floatPointIndex + 1)];
    const minFloatPrecision = getRequiredDigitCount(floatFormatParts[1]);
    const maxFloatPrecision = minFloatPrecision + getNonRequiredDigitCount(floatFormatParts[1]);
    if (isPercentFormat(numberFormat)) {
      value = multiplyInExponentialForm(value, 2);
    }
    if (!isPositive) {
      value = -value;
    }
    const minIntegerPrecision = getRequiredDigitCount(floatFormatParts[0]);
    const maxIntegerPrecision = getNonRequiredDigitCount(floatFormatParts[0]) || config.unlimitedIntegerDigits ? void 0 : minIntegerPrecision;
    const integerLength = Math.floor(value).toString().length;
    const floatPrecision = fitIntoRange(maxFloatPrecision, 0, 15 - integerLength);
    const groupSizes = getGroupSizes(floatFormatParts[0]).reverse();
    const valueParts = toFixed(value, floatPrecision < 0 ? 0 : floatPrecision).split(".");
    let valueIntegerPart = normalizeValueString(reverseString(valueParts[0]), minIntegerPrecision, maxIntegerPrecision);
    const valueFloatPart = normalizeValueString(valueParts[1], minFloatPrecision, maxFloatPrecision);
    valueIntegerPart = applyGroups(valueIntegerPart, groupSizes, config.thousandsSeparator);
    const integerString = reverseString(formatNumberPart(reverseString(floatFormatParts[0]), valueIntegerPart));
    const floatString = maxFloatPrecision ? formatNumberPart(floatFormatParts[1], valueFloatPart) : "";
    const result2 = integerString + (floatString.match(/\d/) ? config.decimalSeparator : "") + floatString;
    return result2;
  };
}
function parseValue(text, isPercent, isNegative) {
  const value = (isPercent ? 0.01 : 1) * parseFloat(text) || 0;
  return isNegative ? -value : value;
}
function prepareValueText(valueText, formatter, isPercent, isIntegerPart) {
  let nextValueText = valueText;
  let char;
  let text;
  let nextText;
  do {
    if (nextText) {
      char = text.length === nextText.length ? "0" : "1";
      valueText = isIntegerPart ? char + valueText : valueText + char;
    }
    text = nextText || formatter(parseValue(nextValueText, isPercent));
    nextValueText = isIntegerPart ? "1" + nextValueText : nextValueText + "1";
    nextText = formatter(parseValue(nextValueText, isPercent));
  } while (text !== nextText && (isIntegerPart ? text.length === nextText.length : text.length <= nextText.length));
  if (isIntegerPart && nextText.length > text.length) {
    const hasGroups = -1 === formatter(12345).indexOf("12345");
    do {
      valueText = "1" + valueText;
    } while (hasGroups && parseValue(valueText, isPercent) < 1e5);
  }
  return valueText;
}
function getFormatByValueText(valueText, formatter, isPercent, isNegative) {
  let format = formatter(parseValue(valueText, isPercent, isNegative));
  const valueTextParts = valueText.split(".");
  const valueTextWithModifiedFloat = valueTextParts[0] + ".3" + valueTextParts[1].slice(1);
  const valueWithModifiedFloat = parseValue(valueTextWithModifiedFloat, isPercent, isNegative);
  const decimalSeparatorIndex = formatter(valueWithModifiedFloat).indexOf("3") - 1;
  format = format.replace(/(\d)\D(\d)/g, "$1,$2");
  if (decimalSeparatorIndex >= 0) {
    format = format.slice(0, decimalSeparatorIndex) + "." + format.slice(decimalSeparatorIndex + 1);
  }
  format = format.replace(/1+/, "1").replace(/1/g, "#");
  if (!isPercent) {
    format = format.replace(/%/g, "'%'");
  }
  return format;
}
function getFormat(formatter) {
  let valueText = ".";
  const isPercent = formatter(1).indexOf("100") >= 0;
  valueText = prepareValueText(valueText, formatter, isPercent, true);
  valueText = prepareValueText(valueText, formatter, isPercent, false);
  const positiveFormat = getFormatByValueText(valueText, formatter, isPercent, false);
  const negativeFormat = getFormatByValueText(valueText, formatter, isPercent, true);
  return negativeFormat === "-" + positiveFormat ? positiveFormat : positiveFormat + ";" + negativeFormat;
}

// node_modules/devextreme/esm/common/core/localization/currency.js
var currency_default = {
  _formatNumberCore: function(value, format, formatConfig) {
    if ("currency" === format) {
      formatConfig.precision = formatConfig.precision || 0;
      let result2 = this.format(value, extend({}, formatConfig, {
        type: "fixedpoint"
      }));
      const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
      result2 = result2.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
      return result2;
    }
    return this.callBase.apply(this, arguments);
  },
  getCurrencySymbol: function() {
    return {
      symbol: "$"
    };
  },
  getOpenXmlCurrencyFormat: function() {
    return "$#,##0{0}_);\\($#,##0{0}\\)";
  }
};

// node_modules/devextreme/esm/common/core/localization/open_xml_currency_format.js
var open_xml_currency_format_default = (currencySymbol, accountingFormat) => {
  if (!accountingFormat) {
    return;
  }
  let encodedCurrencySymbol = currencySymbol;
  if ("string" === typeof currencySymbol) {
    encodedCurrencySymbol = "";
    for (let i = 0; i < currencySymbol.length; i++) {
      if ("$" !== currencySymbol[i]) {
        encodedCurrencySymbol += "\\";
      }
      encodedCurrencySymbol += currencySymbol[i];
    }
  }
  const encodeSymbols = {
    ".00": "{0}",
    "'": "\\'",
    "\\(": "\\(",
    "\\)": "\\)",
    " ": "\\ ",
    '"': "&quot;",
    "\\¤": encodedCurrencySymbol
  };
  const result2 = accountingFormat.split(";");
  for (let i = 0; i < result2.length; i++) {
    for (const symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result2[i] = result2[i].replace(new RegExp(symbol, "g"), encodeSymbols[symbol]);
      }
    }
  }
  return 2 === result2.length ? result2[0] + "_);" + result2[1] : result2[0];
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/accounting_formats.js
var accounting_formats_default = {
  af: "¤#,##0.00;(¤#,##0.00)",
  "af-NA": "¤#,##0.00;(¤#,##0.00)",
  agq: "#,##0.00¤",
  ak: "¤#,##0.00",
  am: "¤#,##0.00;(¤#,##0.00)",
  ar: "¤#,##0.00;(¤#,##0.00)",
  "ar-AE": "¤#,##0.00;(¤#,##0.00)",
  "ar-BH": "¤#,##0.00;(¤#,##0.00)",
  "ar-DJ": "¤#,##0.00;(¤#,##0.00)",
  "ar-DZ": "¤#,##0.00;(¤#,##0.00)",
  "ar-EG": "¤#,##0.00;(¤#,##0.00)",
  "ar-EH": "¤#,##0.00;(¤#,##0.00)",
  "ar-ER": "¤#,##0.00;(¤#,##0.00)",
  "ar-IL": "¤#,##0.00;(¤#,##0.00)",
  "ar-IQ": "¤#,##0.00;(¤#,##0.00)",
  "ar-JO": "¤#,##0.00;(¤#,##0.00)",
  "ar-KM": "¤#,##0.00;(¤#,##0.00)",
  "ar-KW": "¤#,##0.00;(¤#,##0.00)",
  "ar-LB": "¤#,##0.00;(¤#,##0.00)",
  "ar-LY": "¤#,##0.00;(¤#,##0.00)",
  "ar-MA": "¤#,##0.00;(¤#,##0.00)",
  "ar-MR": "¤#,##0.00;(¤#,##0.00)",
  "ar-OM": "¤#,##0.00;(¤#,##0.00)",
  "ar-PS": "¤#,##0.00;(¤#,##0.00)",
  "ar-QA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SD": "¤#,##0.00;(¤#,##0.00)",
  "ar-SO": "¤#,##0.00;(¤#,##0.00)",
  "ar-SS": "¤#,##0.00;(¤#,##0.00)",
  "ar-SY": "¤#,##0.00;(¤#,##0.00)",
  "ar-TD": "¤#,##0.00;(¤#,##0.00)",
  "ar-TN": "¤#,##0.00;(¤#,##0.00)",
  "ar-YE": "¤#,##0.00;(¤#,##0.00)",
  as: "¤ #,##,##0.00",
  asa: "#,##0.00 ¤",
  ast: "#,##0.00 ¤",
  az: "#,##0.00 ¤",
  "az-Cyrl": "#,##0.00 ¤",
  "az-Latn": "#,##0.00 ¤",
  bas: "#,##0.00 ¤",
  be: "#,##0.00 ¤",
  "be-tarask": "#,##0.00 ¤",
  bem: "¤#,##0.00;(¤#,##0.00)",
  bez: "#,##0.00¤",
  bg: "0.00 ¤;(0.00 ¤)",
  bm: "¤#,##0.00;(¤#,##0.00)",
  bn: "#,##,##0.00¤;(#,##,##0.00¤)",
  "bn-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  bo: "¤ #,##0.00",
  "bo-IN": "¤ #,##0.00",
  br: "#,##0.00 ¤",
  brx: "¤ #,##,##0.00",
  bs: "#,##0.00 ¤",
  "bs-Cyrl": "#,##0.00 ¤",
  "bs-Latn": "#,##0.00 ¤",
  ca: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-AD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-ES-valencia": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-FR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-IT": "#,##0.00 ¤;(#,##0.00 ¤)",
  ccp: "#,##,##0.00¤;(#,##,##0.00¤)",
  "ccp-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  ce: "#,##0.00 ¤",
  ceb: "¤#,##0.00;(¤#,##0.00)",
  cgg: "¤#,##0.00",
  chr: "¤#,##0.00;(¤#,##0.00)",
  ckb: "¤ #,##0.00",
  "ckb-IR": "¤ #,##0.00",
  cs: "#,##0.00 ¤",
  cy: "¤#,##0.00;(¤#,##0.00)",
  da: "#,##0.00 ¤",
  "da-GL": "#,##0.00 ¤",
  dav: "¤#,##0.00;(¤#,##0.00)",
  de: "#,##0.00 ¤",
  "de-AT": "#,##0.00 ¤",
  "de-BE": "#,##0.00 ¤",
  "de-CH": "#,##0.00 ¤",
  "de-IT": "#,##0.00 ¤",
  "de-LI": "#,##0.00 ¤",
  "de-LU": "#,##0.00 ¤",
  dje: "#,##0.00¤",
  doi: "¤#,##0.00",
  dsb: "#,##0.00 ¤",
  dua: "#,##0.00 ¤",
  dyo: "#,##0.00 ¤",
  dz: "¤#,##,##0.00",
  ebu: "¤#,##0.00;(¤#,##0.00)",
  ee: "¤#,##0.00;(¤#,##0.00)",
  "ee-TG": "¤#,##0.00;(¤#,##0.00)",
  el: "#,##0.00 ¤",
  "el-CY": "#,##0.00 ¤",
  en: "¤#,##0.00;(¤#,##0.00)",
  "en-001": "¤#,##0.00;(¤#,##0.00)",
  "en-150": "#,##0.00 ¤",
  "en-AE": "¤#,##0.00;(¤#,##0.00)",
  "en-AG": "¤#,##0.00;(¤#,##0.00)",
  "en-AI": "¤#,##0.00;(¤#,##0.00)",
  "en-AS": "¤#,##0.00;(¤#,##0.00)",
  "en-AT": "¤ #,##0.00",
  "en-AU": "¤#,##0.00;(¤#,##0.00)",
  "en-BB": "¤#,##0.00;(¤#,##0.00)",
  "en-BE": "#,##0.00 ¤",
  "en-BI": "¤#,##0.00;(¤#,##0.00)",
  "en-BM": "¤#,##0.00;(¤#,##0.00)",
  "en-BS": "¤#,##0.00;(¤#,##0.00)",
  "en-BW": "¤#,##0.00;(¤#,##0.00)",
  "en-BZ": "¤#,##0.00;(¤#,##0.00)",
  "en-CA": "¤#,##0.00;(¤#,##0.00)",
  "en-CC": "¤#,##0.00;(¤#,##0.00)",
  "en-CH": "¤ #,##0.00;¤-#,##0.00",
  "en-CK": "¤#,##0.00;(¤#,##0.00)",
  "en-CM": "¤#,##0.00;(¤#,##0.00)",
  "en-CX": "¤#,##0.00;(¤#,##0.00)",
  "en-CY": "¤#,##0.00;(¤#,##0.00)",
  "en-DE": "#,##0.00 ¤",
  "en-DG": "¤#,##0.00;(¤#,##0.00)",
  "en-DK": "#,##0.00 ¤",
  "en-DM": "¤#,##0.00;(¤#,##0.00)",
  "en-ER": "¤#,##0.00;(¤#,##0.00)",
  "en-FI": "#,##0.00 ¤",
  "en-FJ": "¤#,##0.00;(¤#,##0.00)",
  "en-FK": "¤#,##0.00;(¤#,##0.00)",
  "en-FM": "¤#,##0.00;(¤#,##0.00)",
  "en-GB": "¤#,##0.00;(¤#,##0.00)",
  "en-GD": "¤#,##0.00;(¤#,##0.00)",
  "en-GG": "¤#,##0.00;(¤#,##0.00)",
  "en-GH": "¤#,##0.00;(¤#,##0.00)",
  "en-GI": "¤#,##0.00;(¤#,##0.00)",
  "en-GM": "¤#,##0.00;(¤#,##0.00)",
  "en-GU": "¤#,##0.00;(¤#,##0.00)",
  "en-GY": "¤#,##0.00;(¤#,##0.00)",
  "en-HK": "¤#,##0.00;(¤#,##0.00)",
  "en-IE": "¤#,##0.00;(¤#,##0.00)",
  "en-IL": "¤#,##0.00;(¤#,##0.00)",
  "en-IM": "¤#,##0.00;(¤#,##0.00)",
  "en-IN": "¤#,##0.00;(¤#,##0.00)",
  "en-IO": "¤#,##0.00;(¤#,##0.00)",
  "en-JE": "¤#,##0.00;(¤#,##0.00)",
  "en-JM": "¤#,##0.00;(¤#,##0.00)",
  "en-KE": "¤#,##0.00;(¤#,##0.00)",
  "en-KI": "¤#,##0.00;(¤#,##0.00)",
  "en-KN": "¤#,##0.00;(¤#,##0.00)",
  "en-KY": "¤#,##0.00;(¤#,##0.00)",
  "en-LC": "¤#,##0.00;(¤#,##0.00)",
  "en-LR": "¤#,##0.00;(¤#,##0.00)",
  "en-LS": "¤#,##0.00;(¤#,##0.00)",
  "en-MG": "¤#,##0.00;(¤#,##0.00)",
  "en-MH": "¤#,##0.00;(¤#,##0.00)",
  "en-MO": "¤#,##0.00;(¤#,##0.00)",
  "en-MP": "¤#,##0.00;(¤#,##0.00)",
  "en-MS": "¤#,##0.00;(¤#,##0.00)",
  "en-MT": "¤#,##0.00;(¤#,##0.00)",
  "en-MU": "¤#,##0.00;(¤#,##0.00)",
  "en-MV": "¤ #,##0.00",
  "en-MW": "¤#,##0.00;(¤#,##0.00)",
  "en-MY": "¤#,##0.00;(¤#,##0.00)",
  "en-NA": "¤#,##0.00;(¤#,##0.00)",
  "en-NF": "¤#,##0.00;(¤#,##0.00)",
  "en-NG": "¤#,##0.00;(¤#,##0.00)",
  "en-NL": "¤ #,##0.00;(¤ #,##0.00)",
  "en-NR": "¤#,##0.00;(¤#,##0.00)",
  "en-NU": "¤#,##0.00;(¤#,##0.00)",
  "en-NZ": "¤#,##0.00;(¤#,##0.00)",
  "en-PG": "¤#,##0.00;(¤#,##0.00)",
  "en-PH": "¤#,##0.00;(¤#,##0.00)",
  "en-PK": "¤#,##0.00;(¤#,##0.00)",
  "en-PN": "¤#,##0.00;(¤#,##0.00)",
  "en-PR": "¤#,##0.00;(¤#,##0.00)",
  "en-PW": "¤#,##0.00;(¤#,##0.00)",
  "en-RW": "¤#,##0.00;(¤#,##0.00)",
  "en-SB": "¤#,##0.00;(¤#,##0.00)",
  "en-SC": "¤#,##0.00;(¤#,##0.00)",
  "en-SD": "¤#,##0.00;(¤#,##0.00)",
  "en-SE": "#,##0.00 ¤",
  "en-SG": "¤#,##0.00;(¤#,##0.00)",
  "en-SH": "¤#,##0.00;(¤#,##0.00)",
  "en-SI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "en-SL": "¤#,##0.00;(¤#,##0.00)",
  "en-SS": "¤#,##0.00;(¤#,##0.00)",
  "en-SX": "¤#,##0.00;(¤#,##0.00)",
  "en-SZ": "¤#,##0.00;(¤#,##0.00)",
  "en-TC": "¤#,##0.00;(¤#,##0.00)",
  "en-TK": "¤#,##0.00;(¤#,##0.00)",
  "en-TO": "¤#,##0.00;(¤#,##0.00)",
  "en-TT": "¤#,##0.00;(¤#,##0.00)",
  "en-TV": "¤#,##0.00;(¤#,##0.00)",
  "en-TZ": "¤#,##0.00;(¤#,##0.00)",
  "en-UG": "¤#,##0.00;(¤#,##0.00)",
  "en-UM": "¤#,##0.00;(¤#,##0.00)",
  "en-VC": "¤#,##0.00;(¤#,##0.00)",
  "en-VG": "¤#,##0.00;(¤#,##0.00)",
  "en-VI": "¤#,##0.00;(¤#,##0.00)",
  "en-VU": "¤#,##0.00;(¤#,##0.00)",
  "en-WS": "¤#,##0.00;(¤#,##0.00)",
  "en-ZA": "¤#,##0.00;(¤#,##0.00)",
  "en-ZM": "¤#,##0.00;(¤#,##0.00)",
  "en-ZW": "¤#,##0.00;(¤#,##0.00)",
  eo: "¤ #,##0.00",
  es: "#,##0.00 ¤",
  "es-419": "¤#,##0.00",
  "es-AR": "¤ #,##0.00;(¤ #,##0.00)",
  "es-BO": "¤#,##0.00",
  "es-BR": "¤#,##0.00",
  "es-BZ": "¤#,##0.00",
  "es-CL": "¤#,##0.00",
  "es-CO": "¤#,##0.00",
  "es-CR": "¤#,##0.00",
  "es-CU": "¤#,##0.00",
  "es-DO": "¤#,##0.00;(¤#,##0.00)",
  "es-EA": "#,##0.00 ¤",
  "es-EC": "¤#,##0.00",
  "es-GQ": "#,##0.00 ¤",
  "es-GT": "¤#,##0.00",
  "es-HN": "¤#,##0.00",
  "es-IC": "#,##0.00 ¤",
  "es-MX": "¤#,##0.00",
  "es-NI": "¤#,##0.00",
  "es-PA": "¤#,##0.00",
  "es-PE": "¤#,##0.00",
  "es-PH": "#,##0.00 ¤",
  "es-PR": "¤#,##0.00",
  "es-PY": "¤#,##0.00",
  "es-SV": "¤#,##0.00",
  "es-US": "¤#,##0.00",
  "es-UY": "¤ #,##0.00;(¤ #,##0.00)",
  "es-VE": "¤#,##0.00",
  et: "#,##0.00 ¤;(#,##0.00 ¤)",
  eu: "#,##0.00 ¤;(#,##0.00 ¤)",
  ewo: "#,##0.00 ¤",
  fa: "‎¤ #,##0.00;‎(¤ #,##0.00)",
  "fa-AF": "¤ #,##0.00;‎(¤ #,##0.00)",
  ff: "#,##0.00 ¤",
  "ff-Adlm": "¤ #,##0.00",
  "ff-Adlm-BF": "¤ #,##0.00",
  "ff-Adlm-CM": "¤ #,##0.00",
  "ff-Adlm-GH": "¤ #,##0.00",
  "ff-Adlm-GM": "¤ #,##0.00",
  "ff-Adlm-GW": "¤ #,##0.00",
  "ff-Adlm-LR": "¤ #,##0.00",
  "ff-Adlm-MR": "¤ #,##0.00",
  "ff-Adlm-NE": "¤ #,##0.00",
  "ff-Adlm-NG": "¤ #,##0.00",
  "ff-Adlm-SL": "¤ #,##0.00",
  "ff-Adlm-SN": "¤ #,##0.00",
  "ff-Latn": "#,##0.00 ¤",
  "ff-Latn-BF": "#,##0.00 ¤",
  "ff-Latn-CM": "#,##0.00 ¤",
  "ff-Latn-GH": "#,##0.00 ¤",
  "ff-Latn-GM": "#,##0.00 ¤",
  "ff-Latn-GN": "#,##0.00 ¤",
  "ff-Latn-GW": "#,##0.00 ¤",
  "ff-Latn-LR": "#,##0.00 ¤",
  "ff-Latn-MR": "#,##0.00 ¤",
  "ff-Latn-NE": "#,##0.00 ¤",
  "ff-Latn-NG": "#,##0.00 ¤",
  "ff-Latn-SL": "#,##0.00 ¤",
  fi: "#,##0.00 ¤",
  fil: "¤#,##0.00;(¤#,##0.00)",
  fo: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fo-DK": "#,##0.00 ¤;(#,##0.00 ¤)",
  fr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BL": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GP": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-HT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-KM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-ML": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SY": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-VU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-WF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-YT": "#,##0.00 ¤;(#,##0.00 ¤)",
  fur: "¤ #,##0.00",
  fy: "¤ #,##0.00;(¤ #,##0.00)",
  ga: "¤#,##0.00;(¤#,##0.00)",
  "ga-GB": "¤#,##0.00;(¤#,##0.00)",
  gd: "¤#,##0.00;(¤#,##0.00)",
  gl: "#,##0.00 ¤",
  gsw: "#,##0.00 ¤",
  "gsw-FR": "#,##0.00 ¤",
  "gsw-LI": "#,##0.00 ¤",
  gu: "¤#,##,##0.00;(¤#,##,##0.00)",
  guz: "¤#,##0.00;(¤#,##0.00)",
  gv: "¤#,##0.00",
  ha: "¤ #,##0.00",
  "ha-GH": "¤ #,##0.00",
  "ha-NE": "¤ #,##0.00",
  haw: "¤#,##0.00;(¤#,##0.00)",
  he: "#,##0.00 ¤",
  hi: "¤#,##,##0.00",
  "hi-Latn": "¤#,##,##0.00",
  hr: "#,##0.00 ¤",
  "hr-BA": "#,##0.00 ¤",
  hsb: "#,##0.00 ¤",
  hu: "#,##0.00 ¤",
  hy: "#,##0.00 ¤",
  ia: "¤ #,##0.00;(¤ #,##0.00)",
  id: "¤#,##0.00",
  ig: "¤#,##0.00;(¤#,##0.00)",
  ii: "¤ #,##0.00",
  is: "#,##0.00 ¤",
  it: "#,##0.00 ¤",
  "it-CH": "#,##0.00 ¤",
  "it-SM": "#,##0.00 ¤",
  "it-VA": "#,##0.00 ¤",
  ja: "¤#,##0.00;(¤#,##0.00)",
  jgo: "¤ #,##0.00",
  jmc: "¤#,##0.00",
  jv: "¤ #,##0.00",
  ka: "#,##0.00 ¤",
  kab: "#,##0.00¤",
  kam: "¤#,##0.00;(¤#,##0.00)",
  kde: "¤#,##0.00;(¤#,##0.00)",
  kea: "#,##0.00 ¤;(#,##0.00 ¤)",
  kgp: "¤ #,##0.00",
  khq: "#,##0.00¤",
  ki: "¤#,##0.00;(¤#,##0.00)",
  kk: "#,##0.00 ¤",
  kkj: "¤ #,##0.00",
  kl: "¤#,##0.00;¤-#,##0.00",
  kln: "¤#,##0.00;(¤#,##0.00)",
  km: "#,##0.00¤;(#,##0.00¤)",
  kn: "¤#,##0.00;(¤#,##0.00)",
  ko: "¤#,##0.00;(¤#,##0.00)",
  "ko-KP": "¤#,##0.00;(¤#,##0.00)",
  kok: "¤#,##0.00;(¤#,##0.00)",
  ks: "¤#,##0.00",
  "ks-Arab": "¤#,##0.00",
  "ks-Deva": "¤ #,##0.00",
  ksb: "#,##0.00¤",
  ksf: "#,##0.00 ¤",
  ksh: "#,##0.00 ¤",
  ku: "#,##0.00 ¤;(#,##0.00 ¤)",
  kw: "¤#,##0.00",
  ky: "#,##0.00 ¤",
  lag: "¤ #,##0.00",
  lb: "#,##0.00 ¤",
  lg: "#,##0.00¤",
  lkt: "¤ #,##0.00",
  ln: "#,##0.00 ¤",
  "ln-AO": "#,##0.00 ¤",
  "ln-CF": "#,##0.00 ¤",
  "ln-CG": "#,##0.00 ¤",
  lo: "¤#,##0.00;¤-#,##0.00",
  lrc: "¤ #,##0.00",
  "lrc-IQ": "¤ #,##0.00",
  lt: "#,##0.00 ¤",
  lu: "#,##0.00¤",
  luo: "#,##0.00¤",
  luy: "¤#,##0.00;¤- #,##0.00",
  lv: "#,##0.00 ¤",
  mai: "¤ #,##0.00",
  mas: "¤#,##0.00;(¤#,##0.00)",
  "mas-TZ": "¤#,##0.00;(¤#,##0.00)",
  mer: "¤#,##0.00;(¤#,##0.00)",
  mfe: "¤ #,##0.00",
  mg: "¤#,##0.00",
  mgh: "¤ #,##0.00",
  mgo: "¤ #,##0.00",
  mi: "¤ #,##0.00",
  mk: "#,##0.00 ¤",
  ml: "¤#,##0.00;(¤#,##0.00)",
  mn: "¤ #,##0.00",
  mni: "¤ #,##0.00",
  "mni-Beng": "¤ #,##0.00",
  mr: "¤#,##0.00;(¤#,##0.00)",
  ms: "¤#,##0.00;(¤#,##0.00)",
  "ms-BN": "¤#,##0.00;(¤#,##0.00)",
  "ms-ID": "¤#,##0.00",
  "ms-SG": "¤#,##0.00;(¤#,##0.00)",
  mt: "¤#,##0.00",
  mua: "¤#,##0.00;(¤#,##0.00)",
  my: "¤ #,##0.00",
  mzn: "¤ #,##0.00",
  naq: "¤#,##0.00",
  nb: "¤ #,##0.00;(¤ #,##0.00)",
  "nb-SJ": "¤ #,##0.00;(¤ #,##0.00)",
  nd: "¤#,##0.00;(¤#,##0.00)",
  nds: "¤ #,##0.00",
  "nds-NL": "¤ #,##0.00",
  ne: "¤ #,##,##0.00",
  "ne-IN": "¤ #,##,##0.00",
  nl: "¤ #,##0.00;(¤ #,##0.00)",
  "nl-AW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BE": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BQ": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-CW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SR": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SX": "¤ #,##0.00;(¤ #,##0.00)",
  nmg: "#,##0.00 ¤",
  nn: "#,##0.00 ¤",
  nnh: "¤ #,##0.00",
  no: "¤ #,##0.00;(¤ #,##0.00)",
  nus: "¤#,##0.00;(¤#,##0.00)",
  nyn: "¤#,##0.00",
  om: "¤#,##0.00",
  "om-KE": "¤#,##0.00",
  or: "¤#,##0.00;(¤#,##0.00)",
  os: "¤ #,##0.00",
  "os-RU": "¤ #,##0.00",
  pa: "¤ #,##0.00",
  "pa-Arab": "¤ #,##0.00",
  "pa-Guru": "¤ #,##0.00",
  pcm: "¤#,##0.00",
  pl: "#,##0.00 ¤;(#,##0.00 ¤)",
  ps: "¤#,##0.00;(¤#,##0.00)",
  "ps-PK": "¤#,##0.00;(¤#,##0.00)",
  pt: "¤ #,##0.00",
  "pt-AO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CV": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-PT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-ST": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-TL": "#,##0.00 ¤;(#,##0.00 ¤)",
  qu: "¤ #,##0.00",
  "qu-BO": "¤ #,##0.00",
  "qu-EC": "¤ #,##0.00",
  rm: "#,##0.00 ¤",
  rn: "#,##0.00¤",
  ro: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ro-MD": "#,##0.00 ¤;(#,##0.00 ¤)",
  rof: "¤#,##0.00",
  ru: "#,##0.00 ¤",
  "ru-BY": "#,##0.00 ¤",
  "ru-KG": "#,##0.00 ¤",
  "ru-KZ": "#,##0.00 ¤",
  "ru-MD": "#,##0.00 ¤",
  "ru-UA": "#,##0.00 ¤",
  rw: "¤ #,##0.00",
  rwk: "#,##0.00¤",
  sa: "¤ #,##0.00",
  sah: "#,##0.00 ¤",
  saq: "¤#,##0.00;(¤#,##0.00)",
  sat: "¤ #,##0.00",
  "sat-Olck": "¤ #,##0.00",
  sbp: "#,##0.00¤",
  sc: "#,##0.00 ¤",
  sd: "¤ #,##0.00",
  "sd-Arab": "¤ #,##0.00",
  "sd-Deva": "¤ #,##0.00",
  se: "#,##0.00 ¤",
  "se-FI": "#,##0.00 ¤",
  "se-SE": "#,##0.00 ¤",
  seh: "#,##0.00¤",
  ses: "#,##0.00¤",
  sg: "¤#,##0.00;¤-#,##0.00",
  shi: "#,##0.00¤",
  "shi-Latn": "#,##0.00¤",
  "shi-Tfng": "#,##0.00¤",
  si: "¤#,##0.00;(¤#,##0.00)",
  sk: "#,##0.00 ¤;(#,##0.00 ¤)",
  sl: "#,##0.00 ¤;(#,##0.00 ¤)",
  smn: "#,##0.00 ¤",
  sn: "¤#,##0.00;(¤#,##0.00)",
  so: "¤#,##0.00;(¤#,##0.00)",
  "so-DJ": "¤#,##0.00;(¤#,##0.00)",
  "so-ET": "¤#,##0.00;(¤#,##0.00)",
  "so-KE": "¤#,##0.00;(¤#,##0.00)",
  sq: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-MK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  sr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  su: "¤#,##0.00",
  "su-Latn": "¤#,##0.00",
  sv: "#,##0.00 ¤",
  "sv-AX": "#,##0.00 ¤",
  "sv-FI": "#,##0.00 ¤",
  sw: "¤ #,##0.00",
  "sw-CD": "¤ #,##0.00",
  "sw-KE": "¤ #,##0.00",
  "sw-UG": "¤ #,##0.00",
  ta: "¤#,##0.00;(¤#,##0.00)",
  "ta-LK": "¤#,##0.00;(¤#,##0.00)",
  "ta-MY": "¤#,##0.00;(¤#,##0.00)",
  "ta-SG": "¤#,##0.00;(¤#,##0.00)",
  te: "¤#,##0.00;(¤#,##0.00)",
  teo: "¤#,##0.00;(¤#,##0.00)",
  "teo-KE": "¤#,##0.00;(¤#,##0.00)",
  tg: "#,##0.00 ¤",
  th: "¤#,##0.00;(¤#,##0.00)",
  ti: "¤#,##0.00",
  "ti-ER": "¤#,##0.00",
  tk: "#,##0.00 ¤",
  to: "¤ #,##0.00",
  tr: "¤#,##0.00;(¤#,##0.00)",
  "tr-CY": "¤#,##0.00;(¤#,##0.00)",
  tt: "#,##0.00 ¤",
  twq: "#,##0.00¤",
  tzm: "#,##0.00 ¤",
  ug: "¤#,##0.00;(¤#,##0.00)",
  uk: "#,##0.00 ¤",
  und: "¤ #,##0.00",
  ur: "¤#,##0.00;(¤#,##0.00)",
  "ur-IN": "¤#,##0.00;(¤#,##0.00)",
  uz: "#,##0.00 ¤",
  "uz-Arab": "¤ #,##0.00",
  "uz-Cyrl": "#,##0.00 ¤",
  "uz-Latn": "#,##0.00 ¤",
  vai: "¤#,##0.00;(¤#,##0.00)",
  "vai-Latn": "¤#,##0.00;(¤#,##0.00)",
  "vai-Vaii": "¤#,##0.00;(¤#,##0.00)",
  vi: "#,##0.00 ¤",
  vun: "¤#,##0.00",
  wae: "¤ #,##0.00",
  wo: "¤ #,##0.00",
  xh: "¤#,##0.00",
  xog: "#,##0.00 ¤",
  yav: "#,##0.00 ¤;(#,##0.00 ¤)",
  yi: "¤ #,##0.00",
  yo: "¤#,##0.00;(¤#,##0.00)",
  "yo-BJ": "¤#,##0.00;(¤#,##0.00)",
  yrl: "¤ #,##0.00",
  "yrl-CO": "¤ #,##0.00",
  "yrl-VE": "¤ #,##0.00",
  yue: "¤#,##0.00;(¤#,##0.00)",
  "yue-Hans": "¤#,##0.00;(¤#,##0.00)",
  "yue-Hant": "¤#,##0.00;(¤#,##0.00)",
  zgh: "#,##0.00¤",
  zh: "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-MO": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-SG": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-MO": "¤#,##0.00;(¤#,##0.00)",
  zu: "¤#,##0.00;(¤#,##0.00)"
};

// node_modules/devextreme/esm/common/core/localization/intl/number.js
var CURRENCY_STYLES = ["standard", "accounting"];
var detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var formattersCache = {};
var getFormatter2 = (format) => {
  const key = core_default.locale() + "/" + JSON.stringify(format);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.NumberFormat(core_default.locale(), format).format;
  }
  return formattersCache[key];
};
var getCurrencyFormatter = (currency) => new Intl.NumberFormat(core_default.locale(), {
  style: "currency",
  currency
});
var number_default = {
  engine: function() {
    return "intl";
  },
  _formatNumberCore: function(value, format, formatConfig) {
    if ("exponential" === format) {
      return this.callBase.apply(this, arguments);
    }
    return getFormatter2(this._normalizeFormatConfig(format, formatConfig, value))(value);
  },
  _normalizeFormatConfig: function(format, formatConfig, value) {
    let config;
    if ("decimal" === format) {
      const fractionDigits = String(value).split(".")[1];
      config = {
        minimumIntegerDigits: formatConfig.precision || void 0,
        useGrouping: false,
        maximumFractionDigits: fractionDigits && fractionDigits.length,
        round: value < 0 ? "ceil" : "floor"
      };
    } else {
      config = this._getPrecisionConfig(formatConfig.precision);
    }
    if ("percent" === format) {
      config.style = "percent";
    } else if ("currency" === format) {
      const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? config_default().defaultUseCurrencyAccountingStyle;
      config.style = "currency";
      config.currency = formatConfig.currency || config_default().defaultCurrency;
      config.currencySign = CURRENCY_STYLES[+useAccountingStyle];
    }
    return config;
  },
  _getPrecisionConfig: function(precision) {
    let config;
    if (null === precision) {
      config = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20
      };
    } else {
      config = {
        minimumFractionDigits: precision || 0,
        maximumFractionDigits: precision || 0
      };
    }
    return config;
  },
  format: function(value, format) {
    if ("number" !== typeof value) {
      return value;
    }
    format = this._normalizeFormat(format);
    if ("default" === format.currency) {
      format.currency = config_default().defaultCurrency;
    }
    if (!format || "function" !== typeof format && !format.type && !format.formatter) {
      return getFormatter2(format)(value);
    }
    const result2 = this.callBase.apply(this, arguments);
    return result2;
  },
  _getCurrencySymbolInfo: function(currency) {
    const formatter = getCurrencyFormatter(currency);
    return this._extractCurrencySymbolInfo(formatter.format(0));
  },
  _extractCurrencySymbolInfo: function(currencyValueString) {
    const match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
    const position = match[1] ? "before" : "after";
    const symbol = match[1] || match[4] || "";
    const delimiter = match[2] || match[3] || "";
    return {
      position,
      symbol,
      delimiter
    };
  },
  getCurrencySymbol: function(currency) {
    if (!currency) {
      currency = config_default().defaultCurrency;
    }
    const symbolInfo = this._getCurrencySymbolInfo(currency);
    return {
      symbol: symbolInfo.symbol
    };
  },
  getOpenXmlCurrencyFormat: function(currency) {
    const targetCurrency = currency || config_default().defaultCurrency;
    const currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
    const closestAccountingFormat = core_default.getValueByClosestLocale(((locale) => accounting_formats_default[locale]));
    return open_xml_currency_format_default(currencySymbol, closestAccountingFormat);
  }
};

// node_modules/devextreme/esm/common/core/localization/number.js
var hasIntl = "undefined" !== typeof Intl;
var NUMERIC_FORMATS = ["currency", "fixedpoint", "exponential", "percent", "decimal"];
var LargeNumberFormatPostfixes = {
  1: "K",
  2: "M",
  3: "B",
  4: "T"
};
var LargeNumberFormatPowers = {
  largenumber: "auto",
  thousands: 1,
  millions: 2,
  billions: 3,
  trillions: 4
};
var numberLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  numericFormats: NUMERIC_FORMATS,
  defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
  _parseNumberFormatString: function(formatType) {
    const formatObject = {};
    if (!formatType || "string" !== typeof formatType) {
      return;
    }
    const formatList = formatType.toLowerCase().split(" ");
    each(formatList, ((index, value) => {
      if (NUMERIC_FORMATS.includes(value)) {
        formatObject.formatType = value;
      } else if (value in LargeNumberFormatPowers) {
        formatObject.power = LargeNumberFormatPowers[value];
      }
    }));
    if (formatObject.power && !formatObject.formatType) {
      formatObject.formatType = "fixedpoint";
    }
    if (formatObject.formatType) {
      return formatObject;
    }
  },
  _calculateNumberPower: function(value, base, minPower, maxPower) {
    let number = Math.abs(value);
    let power = 0;
    if (number > 1) {
      while (number && number >= base && (void 0 === maxPower || power < maxPower)) {
        power++;
        number /= base;
      }
    } else if (number > 0 && number < 1) {
      while (number < 1 && (void 0 === minPower || power > minPower)) {
        power--;
        number *= base;
      }
    }
    return power;
  },
  _getNumberByPower: function(number, power, base) {
    let result2 = number;
    while (power > 0) {
      result2 /= base;
      power--;
    }
    while (power < 0) {
      result2 *= base;
      power++;
    }
    return result2;
  },
  _formatNumber: function(value, formatObject, formatConfig) {
    if ("auto" === formatObject.power) {
      formatObject.power = this._calculateNumberPower(value, 1e3, 0, 4);
    }
    if (formatObject.power) {
      value = this._getNumberByPower(value, formatObject.power, 1e3);
    }
    const powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || "";
    let result2 = this._formatNumberCore(value, formatObject.formatType, formatConfig);
    result2 = result2.replace(/(\d|.$)(\D*)$/, "$1" + powerPostfix + "$2");
    return result2;
  },
  _formatNumberExponential: function(value, formatConfig) {
    let power = this._calculateNumberPower(value, 10);
    let number = this._getNumberByPower(value, power, 10);
    if (void 0 === formatConfig.precision) {
      formatConfig.precision = 1;
    }
    if (number.toFixed(formatConfig.precision || 0) >= 10) {
      power++;
      number /= 10;
    }
    const powString = (power >= 0 ? "+" : "") + power.toString();
    return this._formatNumberCore(number, "fixedpoint", formatConfig) + "E" + powString;
  },
  _addZeroes: function(value, precision) {
    const multiplier = Math.pow(10, precision);
    const sign2 = value < 0 ? "-" : "";
    value = (Math.abs(value) * multiplier >>> 0) / multiplier;
    let result2 = value.toString();
    while (result2.length < precision) {
      result2 = "0" + result2;
    }
    return sign2 + result2;
  },
  _addGroupSeparators: function(value) {
    const parts = value.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config_default2().thousandsSeparator) + (parts[1] ? config_default2().decimalSeparator + parts[1] : "");
  },
  _formatNumberCore: function(value, format, formatConfig) {
    if ("exponential" === format) {
      return this._formatNumberExponential(value, formatConfig);
    }
    if ("decimal" !== format && null !== formatConfig.precision) {
      formatConfig.precision = formatConfig.precision || 0;
    }
    if ("percent" === format) {
      value *= 100;
    }
    if (void 0 !== formatConfig.precision) {
      if ("decimal" === format) {
        value = this._addZeroes(value, formatConfig.precision);
      } else {
        value = null === formatConfig.precision ? value.toPrecision() : toFixed(value, formatConfig.precision);
      }
    }
    if ("decimal" !== format) {
      value = this._addGroupSeparators(value);
    } else {
      value = value.toString().replace(".", config_default2().decimalSeparator);
    }
    if ("percent" === format) {
      value += "%";
    }
    return value;
  },
  _normalizeFormat: function(format) {
    if (!format) {
      return {};
    }
    if ("function" === typeof format) {
      return format;
    }
    if (!isPlainObject(format)) {
      format = {
        type: format
      };
    }
    return format;
  },
  _getSeparators: function() {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator: function() {
    return this.format(1e4, "fixedPoint")[2];
  },
  getDecimalSeparator: function() {
    return this.format(1.2, {
      type: "fixedPoint",
      precision: 1
    })[1];
  },
  convertDigits: function(value, toStandard) {
    const digits = this.format(90, "decimal");
    if ("string" !== typeof value || "0" === digits[1]) {
      return value;
    }
    const fromFirstDigit = toStandard ? digits[1] : "0";
    const toFirstDigit = toStandard ? "0" : digits[1];
    const fromLastDigit = toStandard ? digits[0] : "9";
    const regExp = new RegExp("[" + fromFirstDigit + "-" + fromLastDigit + "]", "g");
    return value.replace(regExp, ((char) => String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0)))));
  },
  getNegativeEtalonRegExp: function(format) {
    const separators = this._getSeparators();
    const digitalRegExp = new RegExp("[0-9" + escapeRegExp(separators.decimalSeparator + separators.thousandsSeparator) + "]+", "g");
    let negativeEtalon = this.format(-1, format).replace(digitalRegExp, "1");
    ["\\", "(", ")", "[", "]", "*", "+", "$", "^", "?", "|", "{", "}"].forEach(((char) => {
      negativeEtalon = negativeEtalon.replace(new RegExp(`\\${char}`, "g"), `\\${char}`);
    }));
    negativeEtalon = negativeEtalon.replace(/ /g, "\\s");
    negativeEtalon = negativeEtalon.replace(/1/g, ".*");
    return new RegExp(negativeEtalon, "g");
  },
  getSign: function(text, format) {
    if (!format) {
      if ("-" === text.replace(/[^0-9-]/g, "").charAt(0)) {
        return -1;
      }
      return 1;
    }
    const negativeEtalon = this.getNegativeEtalonRegExp(format);
    return text.match(negativeEtalon) ? -1 : 1;
  },
  format: function(value, format) {
    if ("number" !== typeof value) {
      return value;
    }
    if ("number" === typeof format) {
      return value;
    }
    format = format && format.formatter || format;
    if ("function" === typeof format) {
      return format(value);
    }
    format = this._normalizeFormat(format);
    if (!format.type) {
      format.type = "decimal";
    }
    const numberConfig = this._parseNumberFormatString(format.type);
    if (!numberConfig) {
      const formatterConfig = this._getSeparators();
      formatterConfig.unlimitedIntegerDigits = format.unlimitedIntegerDigits;
      const formatter = getFormatter(format.type, formatterConfig)(value);
      const result2 = this.convertDigits(formatter);
      return result2;
    }
    return this._formatNumber(value, numberConfig, format);
  },
  parse: function(text, format) {
    if (!text) {
      return;
    }
    if (format && format.parser) {
      return format.parser(text);
    }
    text = this.convertDigits(text, true);
    if (format && "string" !== typeof format) {
      errors_default.log("W0011");
    }
    const decimalSeparator = this.getDecimalSeparator();
    const regExp = new RegExp("[^0-9" + escapeRegExp(decimalSeparator) + "]", "g");
    const cleanedText = text.replace(regExp, "").replace(decimalSeparator, ".").replace(/\.$/g, "");
    if ("." === cleanedText || "" === cleanedText) {
      return null;
    }
    if (this._calcSignificantDigits(cleanedText) > 15) {
      return NaN;
    }
    let parsed = +cleanedText * this.getSign(text, format);
    format = this._normalizeFormat(format);
    const formatConfig = this._parseNumberFormatString(format.type);
    let power = null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.power;
    if (power) {
      if ("auto" === power) {
        const match = text.match(/\d(K|M|B|T)/);
        if (match) {
          power = Object.keys(LargeNumberFormatPostfixes).find(((power2) => LargeNumberFormatPostfixes[power2] === match[1]));
        }
      }
      parsed *= Math.pow(10, 3 * power);
    }
    if ("percent" === (null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.formatType)) {
      parsed /= 100;
    }
    return parsed;
  },
  _calcSignificantDigits: function(text) {
    const [integer, fractional] = text.split(".");
    const calcDigitsAfterLeadingZeros = (digits) => {
      let index = -1;
      for (let i = 0; i < digits.length; i++) {
        if ("0" !== digits[i]) {
          index = i;
          break;
        }
      }
      return index > -1 ? digits.length - index : 0;
    };
    let result2 = 0;
    if (integer) {
      result2 += calcDigitsAfterLeadingZeros(integer.split(""));
    }
    if (fractional) {
      result2 += calcDigitsAfterLeadingZeros(fractional.split("").reverse());
    }
    return result2;
  }
});
numberLocalization.inject(currency_default);
if (hasIntl) {
  numberLocalization.inject(number_default);
}
var number_default2 = numberLocalization;

// node_modules/devextreme/esm/__internal/ui/m_validation_engine.js
var EMAIL_VALIDATION_REGEX = /^[\d\w.+_-]+@[\d\w._-]+\.[\w]+$/i;
var STATUS = {
  valid: "valid",
  invalid: "invalid",
  pending: "pending"
};
var BaseRuleValidator = class {
  constructor() {
    this.NAME = "base";
  }
  defaultMessage(value) {
    return message_default.getFormatter(`validation-${this.NAME}`)(value);
  }
  defaultFormattedMessage(value) {
    return message_default.getFormatter(`validation-${this.NAME}-formatted`)(value);
  }
  _isValueEmpty(value) {
    return !rulesValidators.required.validate(value, {});
  }
  validate(value, rule) {
    const valueArray = Array.isArray(value) ? value : [value];
    let result2 = true;
    if (valueArray.length) {
      valueArray.every(((itemValue) => {
        result2 = this._validate(itemValue, rule);
        return result2;
      }));
    } else {
      result2 = this._validate(null, rule);
    }
    return result2;
  }
};
var RequiredRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "required";
  }
  _validate(value, rule) {
    if (!isDefined(value)) {
      return false;
    }
    if (false === value) {
      return false;
    }
    value = String(value);
    if (rule.trim || !isDefined(rule.trim)) {
      value = value.trim();
    }
    return "" !== value;
  }
};
var NumericRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "numeric";
  }
  _validate(value, rule) {
    if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    if (rule.useCultureSettings && isString(value)) {
      return !isNaN(number_default2.parse(value));
    }
    return isNumeric(value);
  }
};
var RangeRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "range";
  }
  _validate(value, rule) {
    if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    const validNumber = rulesValidators.numeric.validate(value, rule);
    const validValue = isDefined(value) && "" !== value;
    const number = validNumber ? parseFloat(value) : validValue && value.valueOf();
    const {
      min
    } = rule;
    const {
      max
    } = rule;
    if (!(validNumber || isDate(value)) && !validValue) {
      return false;
    }
    if (isDefined(min)) {
      if (isDefined(max)) {
        return number >= min && number <= max;
      }
      return number >= min;
    }
    if (isDefined(max)) {
      return number <= max;
    }
    throw errors_default.Error("E0101");
  }
};
var StringLengthRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "stringLength";
  }
  _validate(value, rule) {
    value = String(value ?? "");
    if (rule.trim || !isDefined(rule.trim)) {
      value = value.trim();
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    return rulesValidators.range.validate(value.length, extend({}, rule));
  }
};
var CustomRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "custom";
  }
  validate(value, rule) {
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    const {
      validator
    } = rule;
    const dataGetter = validator && isFunction(validator.option) && validator.option("dataGetter");
    const extraParams = isFunction(dataGetter) && dataGetter();
    const params = {
      value,
      validator,
      rule
    };
    if (extraParams) {
      extend(params, extraParams);
    }
    return rule.validationCallback(params);
  }
};
var AsyncRuleValidator = class extends CustomRuleValidator {
  constructor() {
    super();
    this.NAME = "async";
  }
  validate(value, rule) {
    if (!isDefined(rule.reevaluate)) {
      extend(rule, {
        reevaluate: true
      });
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    const {
      validator
    } = rule;
    const dataGetter = validator && isFunction(validator.option) && validator.option("dataGetter");
    const extraParams = isFunction(dataGetter) && dataGetter();
    const params = {
      value,
      validator,
      rule
    };
    if (extraParams) {
      extend(params, extraParams);
    }
    const callbackResult = rule.validationCallback(params);
    if (!isPromise(callbackResult)) {
      throw errors_default.Error("E0103");
    }
    return this._getWrappedPromise(fromPromise(callbackResult).promise());
  }
  _getWrappedPromise(promise) {
    const deferred = Deferred();
    promise.then(((res) => {
      deferred.resolve(res);
    }), ((err) => {
      const res = {
        isValid: false
      };
      if (isDefined(err)) {
        if (isString(err)) {
          res.message = err;
        } else if (isObject(err) && isDefined(err.message) && isString(err.message)) {
          res.message = err.message;
        }
      }
      deferred.resolve(res);
    }));
    return deferred.promise();
  }
};
var CompareRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "compare";
  }
  _validate(value, rule) {
    if (!rule.comparisonTarget) {
      throw errors_default.Error("E0102");
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    extend(rule, {
      reevaluate: true
    });
    const otherValue = rule.comparisonTarget();
    const type = rule.comparisonType || "==";
    switch (type) {
      case "==":
        return value == otherValue;
      case "!=":
        return value != otherValue;
      case "===":
        return value === otherValue;
      case "!==":
        return value !== otherValue;
      case ">":
        return value > otherValue;
      case ">=":
        return value >= otherValue;
      case "<":
        return value < otherValue;
      case "<=":
        return value <= otherValue;
    }
  }
};
var PatternRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "pattern";
  }
  _validate(value, rule) {
    if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    let {
      pattern
    } = rule;
    if (isString(pattern)) {
      pattern = new RegExp(pattern);
    }
    return pattern.test(value);
  }
};
var EmailRuleValidator = class extends BaseRuleValidator {
  constructor() {
    super();
    this.NAME = "email";
  }
  _validate(value, rule) {
    if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    return rulesValidators.pattern.validate(value, extend({}, rule, {
      pattern: EMAIL_VALIDATION_REGEX
    }));
  }
};
var rulesValidators = {
  required: new RequiredRuleValidator(),
  numeric: new NumericRuleValidator(),
  range: new RangeRuleValidator(),
  stringLength: new StringLengthRuleValidator(),
  custom: new CustomRuleValidator(),
  async: new AsyncRuleValidator(),
  compare: new CompareRuleValidator(),
  pattern: new PatternRuleValidator(),
  email: new EmailRuleValidator()
};
var GroupConfig = class extends class_default.inherit({}) {
  ctor(group, isRemovable) {
    this.group = group;
    this.validators = [];
    this._isRemovable = isRemovable;
    this._pendingValidators = [];
    this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
    this._resetValidationInfo();
    this._eventsStrategy = new EventsStrategy(this);
  }
  validate() {
    const result2 = {
      isValid: true,
      brokenRules: [],
      validators: [],
      status: STATUS.valid,
      complete: null
    };
    this._unsubscribeFromAllChangeEvents();
    this._pendingValidators = [];
    this._resetValidationInfo();
    each(this.validators, ((_, validator) => {
      const validatorResult = validator.validate();
      result2.isValid = result2.isValid && validatorResult.isValid;
      if (validatorResult.brokenRules) {
        result2.brokenRules = result2.brokenRules.concat(validatorResult.brokenRules);
      }
      result2.validators.push(validator);
      if (validatorResult.status === STATUS.pending) {
        this._addPendingValidator(validator);
      }
      this._subscribeToChangeEvents(validator);
    }));
    if (this._pendingValidators.length) {
      result2.status = STATUS.pending;
    } else {
      result2.status = result2.isValid ? STATUS.valid : STATUS.invalid;
      this._unsubscribeFromAllChangeEvents();
      this._raiseValidatedEvent(result2);
    }
    this._updateValidationInfo(result2);
    return extend({}, this._validationInfo.result);
  }
  _subscribeToChangeEvents(validator) {
    validator.on("validating", this._onValidatorStatusChanged);
    validator.on("validated", this._onValidatorStatusChanged);
  }
  _unsubscribeFromChangeEvents(validator) {
    validator.off("validating", this._onValidatorStatusChanged);
    validator.off("validated", this._onValidatorStatusChanged);
  }
  _unsubscribeFromAllChangeEvents() {
    each(this.validators, ((_, validator) => {
      this._unsubscribeFromChangeEvents(validator);
    }));
  }
  _updateValidationInfo(result2) {
    this._validationInfo.result = result2;
    if (result2.status !== STATUS.pending) {
      return;
    }
    if (!this._validationInfo.deferred) {
      this._validationInfo.deferred = Deferred();
      this._validationInfo.result.complete = this._validationInfo.deferred.promise();
    }
  }
  _addPendingValidator(validator) {
    const foundValidator = grep(this._pendingValidators, ((val) => val === validator))[0];
    if (!foundValidator) {
      this._pendingValidators.push(validator);
    }
  }
  _removePendingValidator(validator) {
    const index = this._pendingValidators.indexOf(validator);
    if (index >= 0) {
      this._pendingValidators.splice(index, 1);
    }
  }
  _orderBrokenRules(brokenRules) {
    let orderedRules = [];
    each(this.validators, ((_, validator) => {
      const foundRules = grep(brokenRules, ((rule) => rule.validator === validator));
      if (foundRules.length) {
        orderedRules = orderedRules.concat(foundRules);
      }
    }));
    return orderedRules;
  }
  _updateBrokenRules(result2) {
    if (!this._validationInfo.result) {
      return;
    }
    let {
      brokenRules
    } = this._validationInfo.result;
    const rules = grep(brokenRules, ((rule) => rule.validator !== result2.validator));
    if (result2.brokenRules) {
      brokenRules = rules.concat(result2.brokenRules);
    }
    this._validationInfo.result.brokenRules = this._orderBrokenRules(brokenRules);
  }
  _onValidatorStatusChanged(result2) {
    if (result2.status === STATUS.pending) {
      this._addPendingValidator(result2.validator);
      return;
    }
    this._resolveIfComplete(result2);
  }
  _resolveIfComplete(result2) {
    this._removePendingValidator(result2.validator);
    this._updateBrokenRules(result2);
    if (!this._pendingValidators.length) {
      this._unsubscribeFromAllChangeEvents();
      if (!this._validationInfo.result) {
        return;
      }
      this._validationInfo.result.status = 0 === this._validationInfo.result.brokenRules.length ? STATUS.valid : STATUS.invalid;
      this._validationInfo.result.isValid = this._validationInfo.result.status === STATUS.valid;
      const res = extend({}, this._validationInfo.result, {
        complete: null
      });
      const {
        deferred
      } = this._validationInfo;
      this._validationInfo.deferred = null;
      this._raiseValidatedEvent(res);
      deferred && setTimeout((() => {
        deferred.resolve(res);
      }));
    }
  }
  _raiseValidatedEvent(result2) {
    this._eventsStrategy.fireEvent("validated", [result2]);
  }
  _resetValidationInfo() {
    this._validationInfo = {
      result: null,
      deferred: null
    };
  }
  _synchronizeValidationInfo() {
    if (this._validationInfo.result) {
      this._validationInfo.result.validators = this.validators;
    }
  }
  removeRegisteredValidator(validator) {
    const index = this.validators.indexOf(validator);
    if (index > -1) {
      this.validators.splice(index, 1);
      this._synchronizeValidationInfo();
      this._resolveIfComplete({
        validator
      });
    }
  }
  registerValidator(validator) {
    if (!this.validators.includes(validator)) {
      this.validators.push(validator);
      this._synchronizeValidationInfo();
    }
  }
  reset() {
    each(this.validators, ((_, validator) => {
      validator.reset();
    }));
    this._pendingValidators = [];
    this._resetValidationInfo();
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
};
var ValidationEngine = {
  groups: [],
  getGroupConfig(group) {
    const result2 = grep(this.groups, ((config) => config.group === group));
    if (result2.length) {
      return result2[0];
    }
  },
  findGroup($element, model) {
    var _$element$data;
    const hasValidationGroup = null === (_$element$data = $element.data()) || void 0 === _$element$data || null === (_$element$data = _$element$data.dxComponents) || void 0 === _$element$data ? void 0 : _$element$data.includes("dxValidationGroup");
    const validationGroup = hasValidationGroup && $element.dxValidationGroup("instance");
    if (validationGroup) {
      return validationGroup;
    }
    const $dxGroup = $element.parents(".dx-validationgroup").first();
    if ($dxGroup.length) {
      return $dxGroup.dxValidationGroup("instance");
    }
    return model;
  },
  initGroups() {
    this.groups = [];
    this.addGroup(void 0, false);
  },
  addGroup(group) {
    let isRemovable = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
    let config = this.getGroupConfig(group);
    if (!config) {
      config = new GroupConfig(group, isRemovable);
      this.groups.push(config);
    }
    return config;
  },
  removeGroup(group) {
    const config = this.getGroupConfig(group);
    const index = this.groups.indexOf(config);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    return config;
  },
  _setDefaultMessage(info) {
    const {
      rule,
      validator,
      name
    } = info;
    if (!isDefined(rule.message)) {
      if (validator.defaultFormattedMessage && isDefined(name)) {
        rule.message = validator.defaultFormattedMessage(name);
      } else {
        rule.message = validator.defaultMessage();
      }
    }
  },
  _addBrokenRule(info) {
    const {
      result: result2,
      rule
    } = info;
    if (!result2.brokenRule) {
      result2.brokenRule = rule;
    }
    if (!result2.brokenRules) {
      result2.brokenRules = [];
    }
    result2.brokenRules.push(rule);
  },
  validate(value, rules, name) {
    var _rules$;
    let result2 = {
      name,
      value,
      brokenRule: null,
      brokenRules: null,
      isValid: true,
      validationRules: rules,
      pendingRules: null,
      status: STATUS.valid,
      complete: null
    };
    const validator = null === rules || void 0 === rules || null === (_rules$ = rules[0]) || void 0 === _rules$ ? void 0 : _rules$.validator;
    const asyncRuleItems = [];
    each(rules || [], ((_, rule) => {
      const ruleValidator = rulesValidators[rule.type];
      let ruleValidationResult;
      if (ruleValidator) {
        if (isDefined(rule.isValid) && rule.value === value && !rule.reevaluate) {
          if (!rule.isValid) {
            result2.isValid = false;
            this._addBrokenRule({
              result: result2,
              rule
            });
            return false;
          }
          return true;
        }
        rule.value = value;
        if ("async" === rule.type) {
          asyncRuleItems.push({
            rule,
            ruleValidator
          });
          return true;
        }
        ruleValidationResult = ruleValidator.validate(value, rule);
        rule.isValid = ruleValidationResult;
        if (!ruleValidationResult) {
          result2.isValid = false;
          this._setDefaultMessage({
            rule,
            validator: ruleValidator,
            name
          });
          this._addBrokenRule({
            result: result2,
            rule
          });
        }
        if (!rule.isValid) {
          return false;
        }
      } else {
        throw errors_default.Error("E0100");
      }
    }));
    if (result2.isValid && !result2.brokenRules && asyncRuleItems.length) {
      result2 = this._validateAsyncRules({
        value,
        items: asyncRuleItems,
        result: result2,
        name
      });
    }
    this._synchronizeGroupValidationInfo(validator, result2);
    result2.status = result2.pendingRules ? STATUS.pending : result2.isValid ? STATUS.valid : STATUS.invalid;
    return result2;
  },
  _synchronizeGroupValidationInfo(validator, result2) {
    if (!validator) {
      return;
    }
    const groupConfig = ValidationEngine.getGroupConfig(validator._validationGroup);
    groupConfig._updateBrokenRules.call(groupConfig, {
      validator,
      brokenRules: result2.brokenRules ?? []
    });
  },
  _validateAsyncRules(_ref) {
    let {
      result: result2,
      value,
      items,
      name
    } = _ref;
    const asyncResults = [];
    each(items, ((_, item) => {
      const validateResult = item.ruleValidator.validate(value, item.rule);
      if (!isPromise(validateResult)) {
        this._updateRuleConfig({
          rule: item.rule,
          ruleResult: this._getPatchedRuleResult(validateResult),
          validator: item.ruleValidator,
          name
        });
      } else {
        if (!result2.pendingRules) {
          result2.pendingRules = [];
        }
        result2.pendingRules.push(item.rule);
        const asyncResult = validateResult.then(((res) => {
          const ruleResult = this._getPatchedRuleResult(res);
          this._updateRuleConfig({
            rule: item.rule,
            ruleResult,
            validator: item.ruleValidator,
            name
          });
          return ruleResult;
        }));
        asyncResults.push(asyncResult);
      }
    }));
    if (asyncResults.length) {
      result2.complete = Promise.all(asyncResults).then(((values) => this._getAsyncRulesResult({
        result: result2,
        values
      })));
    }
    return result2;
  },
  _updateRuleConfig(_ref2) {
    let {
      rule,
      ruleResult,
      validator,
      name
    } = _ref2;
    rule.isValid = ruleResult.isValid;
    if (!ruleResult.isValid) {
      if (isDefined(ruleResult.message) && isString(ruleResult.message) && ruleResult.message.length) {
        rule.message = ruleResult.message;
      } else {
        this._setDefaultMessage({
          rule,
          validator,
          name
        });
      }
    }
  },
  _getPatchedRuleResult(ruleResult) {
    let result2;
    if (isObject(ruleResult)) {
      result2 = extend({}, ruleResult);
      if (!isDefined(result2.isValid)) {
        result2.isValid = true;
      }
    } else {
      result2 = {
        isValid: isBoolean(ruleResult) ? ruleResult : true
      };
    }
    return result2;
  },
  _getAsyncRulesResult(_ref3) {
    let {
      values,
      result: result2
    } = _ref3;
    each(values, ((index, val) => {
      if (false === val.isValid) {
        result2.isValid = val.isValid;
        const rule = result2.pendingRules[index];
        this._addBrokenRule({
          result: result2,
          rule
        });
      }
    }));
    result2.pendingRules = null;
    result2.complete = null;
    result2.status = result2.isValid ? STATUS.valid : STATUS.invalid;
    return result2;
  },
  registerValidatorInGroup(group, validator) {
    const groupConfig = ValidationEngine.addGroup(group);
    groupConfig.registerValidator.call(groupConfig, validator);
  },
  removeRegisteredValidator(group, validator) {
    const config = ValidationEngine.getGroupConfig(group);
    if (config) {
      config.removeRegisteredValidator.call(config, validator);
      const validatorsInGroup = config.validators;
      const isRemovable = config._isRemovable;
      const shouldRemoveGroup = 0 === validatorsInGroup.length && isRemovable;
      if (shouldRemoveGroup) {
        this.removeGroup(group);
      }
    }
  },
  initValidationOptions(options2) {
    const initedOptions = {};
    if (options2) {
      const syncOptions = ["isValid", "validationStatus", "validationError", "validationErrors"];
      syncOptions.forEach(((prop) => {
        if (prop in options2) {
          extend(initedOptions, this.synchronizeValidationOptions({
            name: prop,
            value: options2[prop]
          }, options2));
        }
      }));
    }
    return initedOptions;
  },
  synchronizeValidationOptions(_ref4, options2) {
    let {
      name,
      value
    } = _ref4;
    switch (name) {
      case "validationStatus": {
        const isValid = value === STATUS.valid || value === STATUS.pending;
        return options2.isValid !== isValid ? {
          isValid
        } : {};
      }
      case "isValid": {
        const {
          validationStatus
        } = options2;
        let newStatus = validationStatus;
        if (value && validationStatus === STATUS.invalid) {
          newStatus = STATUS.valid;
        } else if (!value && validationStatus !== STATUS.invalid) {
          newStatus = STATUS.invalid;
        }
        return newStatus !== validationStatus ? {
          validationStatus: newStatus
        } : {};
      }
      case "validationErrors": {
        const validationError = !(null !== value && void 0 !== value && value.length) ? null : value[0];
        return options2.validationError !== validationError ? {
          validationError
        } : {};
      }
      case "validationError": {
        const {
          validationErrors
        } = options2;
        if (!value && validationErrors) {
          return {
            validationErrors: null
          };
        }
        if (value && !validationErrors) {
          return {
            validationErrors: [value]
          };
        }
        if (value && validationErrors && value !== validationErrors[0]) {
          validationErrors[0] = value;
          return {
            validationErrors: validationErrors.slice()
          };
        }
      }
    }
    return {};
  },
  validateGroup(group) {
    const groupConfig = ValidationEngine.getGroupConfig(group);
    if (!groupConfig) {
      throw errors_default.Error("E0110");
    }
    return groupConfig.validate();
  },
  resetGroup(group) {
    const groupConfig = ValidationEngine.getGroupConfig(group);
    if (!groupConfig) {
      throw errors_default.Error("E0110");
    }
    return groupConfig.reset();
  }
};
ValidationEngine.initGroups();
var m_validation_engine_default = ValidationEngine;

// node_modules/devextreme/esm/ui/validation_engine.js
var validation_engine_default = m_validation_engine_default;

// node_modules/devextreme/esm/core/dom_component.js
var dom_component_default2 = dom_component_default;

// node_modules/inferno/dist/index.esm.js
var isArray = Array.isArray;
function isStringOrNumber(o) {
  var type = typeof o;
  return type === "string" || type === "number";
}
function isNullOrUndef(o) {
  return o === void 0 || o === null;
}
function isInvalid(o) {
  return o === null || o === false || o === true || o === void 0;
}
function isFunction2(o) {
  return typeof o === "function";
}
function isString2(o) {
  return typeof o === "string";
}
function isNumber(o) {
  return typeof o === "number";
}
function isNull(o) {
  return o === null;
}
function isUndefined(o) {
  return o === void 0;
}
function combineFrom(first, second) {
  var out = {};
  if (first) {
    for (var key in first) {
      out[key] = first[key];
    }
  }
  if (second) {
    for (var _key in second) {
      out[_key] = second[_key];
    }
  }
  return out;
}
function isLinkEventObject(o) {
  return !isNull(o) && typeof o === "object";
}
var EMPTY_OBJ = {};
var Fragment = "$F";
var AnimationQueues = function AnimationQueues2() {
  this.componentDidAppear = [];
  this.componentWillDisappear = [];
  this.componentWillMove = [];
};
function normalizeEventName(name) {
  return name.substring(2).toLowerCase();
}
function appendChild(parentDOM, dom) {
  parentDOM.appendChild(dom);
}
function insertOrAppend(parentDOM, newNode, nextNode) {
  if (isNull(nextNode)) {
    appendChild(parentDOM, newNode);
  } else {
    parentDOM.insertBefore(newNode, nextNode);
  }
}
function documentCreateElement(tag, isSVG) {
  if (isSVG) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }
  return document.createElement(tag);
}
function replaceChild(parentDOM, newDom, lastDom) {
  parentDOM.replaceChild(newDom, lastDom);
}
function removeChild(parentDOM, childNode) {
  parentDOM.removeChild(childNode);
}
function callAll(arrayFn) {
  for (var i = 0; i < arrayFn.length; i++) {
    arrayFn[i]();
  }
}
function findChildVNode(vNode, startEdge, flags) {
  var children = vNode.children;
  if (flags & 4) {
    return children.$LI;
  }
  if (flags & 8192) {
    return vNode.childFlags === 2 ? children : children[startEdge ? 0 : children.length - 1];
  }
  return children;
}
function findDOMFromVNode(vNode, startEdge) {
  var flags;
  while (vNode) {
    flags = vNode.flags;
    if (flags & 1521) {
      return vNode.dom;
    }
    vNode = findChildVNode(vNode, startEdge, flags);
  }
  return null;
}
function callAllAnimationHooks(animationQueue, callback) {
  var animationsLeft = animationQueue.length;
  var fn;
  while ((fn = animationQueue.pop()) !== void 0) {
    fn(function() {
      if (--animationsLeft <= 0 && isFunction2(callback)) {
        callback();
      }
    });
  }
}
function callAllMoveAnimationHooks(animationQueue) {
  for (var i = 0; i < animationQueue.length; i++) {
    animationQueue[i].fn();
  }
  for (var _i = 0; _i < animationQueue.length; _i++) {
    var tmp = animationQueue[_i];
    insertOrAppend(tmp.parent, tmp.dom, tmp.next);
  }
  animationQueue.splice(0, animationQueue.length);
}
function clearVNodeDOM(vNode, parentDOM, deferredRemoval) {
  do {
    var flags = vNode.flags;
    if (flags & 1521) {
      if (!deferredRemoval || vNode.dom.parentNode === parentDOM) {
        removeChild(parentDOM, vNode.dom);
      }
      return;
    }
    var children = vNode.children;
    if (flags & 4) {
      vNode = children.$LI;
    }
    if (flags & 8) {
      vNode = children;
    }
    if (flags & 8192) {
      if (vNode.childFlags === 2) {
        vNode = children;
      } else {
        for (var i = 0, len = children.length; i < len; ++i) {
          clearVNodeDOM(children[i], parentDOM, false);
        }
        return;
      }
    }
  } while (vNode);
}
function createDeferComponentClassRemovalCallback(vNode, parentDOM) {
  return function() {
    clearVNodeDOM(vNode, parentDOM, true);
  };
}
function removeVNodeDOM(vNode, parentDOM, animations) {
  if (animations.componentWillDisappear.length > 0) {
    callAllAnimationHooks(animations.componentWillDisappear, createDeferComponentClassRemovalCallback(vNode, parentDOM));
  } else {
    clearVNodeDOM(vNode, parentDOM, false);
  }
}
function addMoveAnimationHook(animations, parentVNode, refOrInstance, dom, parentDOM, nextNode, flags, props) {
  animations.componentWillMove.push({
    dom,
    fn: function fn() {
      if (flags & 4) {
        refOrInstance.componentWillMove(parentVNode, parentDOM, dom);
      } else if (flags & 8) {
        refOrInstance.onComponentWillMove(parentVNode, parentDOM, dom, props);
      }
    },
    next: nextNode,
    parent: parentDOM
  });
}
function moveVNodeDOM(parentVNode, vNode, parentDOM, nextNode, animations) {
  var refOrInstance;
  var instanceProps;
  var instanceFlags = vNode.flags;
  do {
    var flags = vNode.flags;
    if (flags & 1521) {
      if (!isNullOrUndef(refOrInstance) && (isFunction2(refOrInstance.componentWillMove) || isFunction2(refOrInstance.onComponentWillMove))) {
        addMoveAnimationHook(animations, parentVNode, refOrInstance, vNode.dom, parentDOM, nextNode, instanceFlags, instanceProps);
      } else {
        insertOrAppend(parentDOM, vNode.dom, nextNode);
      }
      return;
    }
    var children = vNode.children;
    if (flags & 4) {
      refOrInstance = vNode.children;
      instanceProps = vNode.props;
      vNode = children.$LI;
    } else if (flags & 8) {
      refOrInstance = vNode.ref;
      instanceProps = vNode.props;
      vNode = children;
    } else if (flags & 8192) {
      if (vNode.childFlags === 2) {
        vNode = children;
      } else {
        for (var i = 0, len = children.length; i < len; ++i) {
          moveVNodeDOM(parentVNode, children[i], parentDOM, nextNode, animations);
        }
        return;
      }
    }
  } while (vNode);
}
function createDerivedState(instance, nextProps, state) {
  if (instance.constructor.getDerivedStateFromProps) {
    return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
  }
  return state;
}
var renderCheck = {
  v: false
};
var options = {
  componentComparator: null,
  createVNode: null,
  renderComplete: null
};
function setTextContent(dom, children) {
  dom.textContent = children;
}
function isLastValueSameLinkEvent(lastValue, nextValue) {
  return isLinkEventObject(lastValue) && lastValue.event === nextValue.event && lastValue.data === nextValue.data;
}
function mergeUnsetProperties(to, from) {
  for (var propName in from) {
    if (isUndefined(to[propName])) {
      to[propName] = from[propName];
    }
  }
  return to;
}
function safeCall1(method, arg1) {
  return !!isFunction2(method) && (method(arg1), true);
}
var keyPrefix = "$";
function V(childFlags, children, className, flags, key, props, ref, type) {
  this.childFlags = childFlags;
  this.children = children;
  this.className = className;
  this.dom = null;
  this.flags = flags;
  this.key = key === void 0 ? null : key;
  this.props = props === void 0 ? null : props;
  this.ref = ref === void 0 ? null : ref;
  this.type = type;
}
function createVNode(flags, type, className, children, childFlags, props, key, ref) {
  var childFlag = childFlags === void 0 ? 1 : childFlags;
  var vNode = new V(childFlag, children, className, flags, key, props, ref, type);
  if (options.createVNode) {
    options.createVNode(vNode);
  }
  if (childFlag === 0) {
    normalizeChildren(vNode, vNode.children);
  }
  return vNode;
}
function mergeDefaultHooks(flags, type, ref) {
  if (flags & 4) {
    return ref;
  }
  var defaultHooks = (flags & 32768 ? type.render : type).defaultHooks;
  if (isNullOrUndef(defaultHooks)) {
    return ref;
  }
  if (isNullOrUndef(ref)) {
    return defaultHooks;
  }
  return mergeUnsetProperties(ref, defaultHooks);
}
function mergeDefaultProps(flags, type, props) {
  var defaultProps = (flags & 32768 ? type.render : type).defaultProps;
  if (isNullOrUndef(defaultProps)) {
    return props;
  }
  if (isNullOrUndef(props)) {
    return combineFrom(defaultProps, null);
  }
  return mergeUnsetProperties(props, defaultProps);
}
function resolveComponentFlags(flags, type) {
  if (flags & 12) {
    return flags;
  }
  if (type.prototype && type.prototype.render) {
    return 4;
  }
  if (type.render) {
    return 32776;
  }
  return 8;
}
function createComponentVNode(flags, type, props, key, ref) {
  flags = resolveComponentFlags(flags, type);
  var vNode = new V(1, null, null, flags, key, mergeDefaultProps(flags, type, props), mergeDefaultHooks(flags, type, ref), type);
  if (options.createVNode) {
    options.createVNode(vNode);
  }
  return vNode;
}
function createTextVNode(text, key) {
  return new V(1, isNullOrUndef(text) || text === true || text === false ? "" : text, null, 16, key, null, null, null);
}
function createFragment(children, childFlags, key) {
  var fragment = createVNode(8192, 8192, null, children, childFlags, null, key, null);
  switch (fragment.childFlags) {
    case 1:
      fragment.children = createVoidVNode();
      fragment.childFlags = 2;
      break;
    case 16:
      fragment.children = [createTextVNode(children)];
      fragment.childFlags = 4;
      break;
  }
  return fragment;
}
function normalizeProps(vNode) {
  var props = vNode.props;
  if (props) {
    var flags = vNode.flags;
    if (flags & 481) {
      if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
        normalizeChildren(vNode, props.children);
      }
      if (props.className !== void 0) {
        if (isNullOrUndef(vNode.className)) {
          vNode.className = props.className || null;
        }
        props.className = void 0;
      }
    }
    if (props.key !== void 0) {
      vNode.key = props.key;
      props.key = void 0;
    }
    if (props.ref !== void 0) {
      if (flags & 8) {
        vNode.ref = combineFrom(vNode.ref, props.ref);
      } else {
        vNode.ref = props.ref;
      }
      props.ref = void 0;
    }
  }
  return vNode;
}
function cloneFragment(vNodeToClone) {
  var oldChildren = vNodeToClone.children;
  var childFlags = vNodeToClone.childFlags;
  return createFragment(childFlags === 2 ? directClone(oldChildren) : oldChildren.map(directClone), childFlags, vNodeToClone.key);
}
function directClone(vNodeToClone) {
  var flags = vNodeToClone.flags & -16385;
  var props = vNodeToClone.props;
  if (flags & 14) {
    if (!isNull(props)) {
      var propsToClone = props;
      props = {};
      for (var key in propsToClone) {
        props[key] = propsToClone[key];
      }
    }
  }
  if ((flags & 8192) === 0) {
    return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
  }
  return cloneFragment(vNodeToClone);
}
function createVoidVNode() {
  return createTextVNode("", null);
}
function createPortal(children, container) {
  var normalizedRoot = normalizeRoot(children);
  return createVNode(1024, 1024, null, normalizedRoot, 0, null, normalizedRoot.key, container);
}
function _normalizeVNodes(nodes, result2, index, currentKey) {
  for (var len = nodes.length; index < len; index++) {
    var n = nodes[index];
    if (!isInvalid(n)) {
      var newKey = currentKey + keyPrefix + index;
      if (isArray(n)) {
        _normalizeVNodes(n, result2, 0, newKey);
      } else {
        if (isStringOrNumber(n)) {
          n = createTextVNode(n, newKey);
        } else {
          var oldKey = n.key;
          var isPrefixedKey = isString2(oldKey) && oldKey[0] === keyPrefix;
          if (n.flags & 81920 || isPrefixedKey) {
            n = directClone(n);
          }
          n.flags |= 65536;
          if (!isPrefixedKey) {
            if (isNull(oldKey)) {
              n.key = newKey;
            } else {
              n.key = currentKey + oldKey;
            }
          } else if (oldKey.substring(0, currentKey.length) !== currentKey) {
            n.key = currentKey + oldKey;
          }
        }
        result2.push(n);
      }
    }
  }
}
function getFlagsForElementVnode(type) {
  switch (type) {
    case "svg":
      return 32;
    case "input":
      return 64;
    case "select":
      return 256;
    case "textarea":
      return 128;
    // @ts-ignore
    case Fragment:
      return 8192;
    default:
      return 1;
  }
}
function normalizeChildren(vNode, children) {
  var newChildren;
  var newChildFlags = 1;
  if (isInvalid(children)) {
    newChildren = children;
  } else if (isStringOrNumber(children)) {
    newChildFlags = 16;
    newChildren = children;
  } else if (isArray(children)) {
    var len = children.length;
    for (var i = 0; i < len; ++i) {
      var n = children[i];
      if (isInvalid(n) || isArray(n)) {
        newChildren = newChildren || children.slice(0, i);
        _normalizeVNodes(children, newChildren, i, "");
        break;
      } else if (isStringOrNumber(n)) {
        newChildren = newChildren || children.slice(0, i);
        newChildren.push(createTextVNode(n, keyPrefix + i));
      } else {
        var key = n.key;
        var needsCloning = (n.flags & 81920) > 0;
        var isNullKey = isNull(key);
        var isPrefixed = isString2(key) && key[0] === keyPrefix;
        if (needsCloning || isNullKey || isPrefixed) {
          newChildren = newChildren || children.slice(0, i);
          if (needsCloning || isPrefixed) {
            n = directClone(n);
          }
          if (isNullKey || isPrefixed) {
            n.key = keyPrefix + i;
          }
          newChildren.push(n);
        } else if (newChildren) {
          newChildren.push(n);
        }
        n.flags |= 65536;
      }
    }
    newChildren = newChildren || children;
    if (newChildren.length === 0) {
      newChildFlags = 1;
    } else {
      newChildFlags = 8;
    }
  } else {
    newChildren = children;
    newChildren.flags |= 65536;
    if (children.flags & 81920) {
      newChildren = directClone(children);
    }
    newChildFlags = 2;
  }
  vNode.children = newChildren;
  vNode.childFlags = newChildFlags;
  return vNode;
}
function normalizeRoot(input) {
  if (isInvalid(input) || isStringOrNumber(input)) {
    return createTextVNode(input, null);
  }
  if (isArray(input)) {
    return createFragment(input, 0, null);
  }
  return input.flags & 16384 ? directClone(input) : input;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var namespaces = {
  "xlink:actuate": xlinkNS,
  "xlink:arcrole": xlinkNS,
  "xlink:href": xlinkNS,
  "xlink:role": xlinkNS,
  "xlink:show": xlinkNS,
  "xlink:title": xlinkNS,
  "xlink:type": xlinkNS,
  "xml:base": xmlNS,
  "xml:lang": xmlNS,
  "xml:space": xmlNS
};
function getDelegatedEventObject(v) {
  return {
    onClick: v,
    onDblClick: v,
    onFocusIn: v,
    onFocusOut: v,
    onKeyDown: v,
    onKeyPress: v,
    onKeyUp: v,
    onMouseDown: v,
    onMouseMove: v,
    onMouseUp: v,
    onTouchEnd: v,
    onTouchMove: v,
    onTouchStart: v
  };
}
var attachedEventCounts = getDelegatedEventObject(0);
var attachedEvents = getDelegatedEventObject(null);
var syntheticEvents = getDelegatedEventObject(true);
function updateOrAddSyntheticEvent(name, dom) {
  var eventsObject = dom.$EV;
  if (!eventsObject) {
    eventsObject = dom.$EV = getDelegatedEventObject(null);
  }
  if (!eventsObject[name]) {
    if (++attachedEventCounts[name] === 1) {
      attachedEvents[name] = attachEventToDocument(name);
    }
  }
  return eventsObject;
}
function unmountSyntheticEvent(name, dom) {
  var eventsObject = dom.$EV;
  if (eventsObject && eventsObject[name]) {
    if (--attachedEventCounts[name] === 0) {
      document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
      attachedEvents[name] = null;
    }
    eventsObject[name] = null;
  }
}
function handleSyntheticEvent(name, lastEvent, nextEvent, dom) {
  if (isFunction2(nextEvent)) {
    updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
  } else if (isLinkEventObject(nextEvent)) {
    if (isLastValueSameLinkEvent(lastEvent, nextEvent)) {
      return;
    }
    updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
  } else {
    unmountSyntheticEvent(name, dom);
  }
}
function getTargetNode(event) {
  return isFunction2(event.composedPath) ? event.composedPath()[0] : event.target;
}
function dispatchEvents(event, isClick, name, eventData) {
  var dom = getTargetNode(event);
  do {
    if (isClick && dom.disabled) {
      return;
    }
    var eventsObject = dom.$EV;
    if (eventsObject) {
      var currentEvent = eventsObject[name];
      if (currentEvent) {
        eventData.dom = dom;
        currentEvent.event ? currentEvent.event(currentEvent.data, event) : currentEvent(event);
        if (event.cancelBubble) {
          return;
        }
      }
    }
    dom = dom.parentNode;
  } while (!isNull(dom));
}
function stopPropagation() {
  this.cancelBubble = true;
  if (!this.immediatePropagationStopped) {
    this.stopImmediatePropagation();
  }
}
function isDefaultPrevented() {
  return this.defaultPrevented;
}
function isPropagationStopped() {
  return this.cancelBubble;
}
function extendEventProperties(event) {
  var eventData = {
    dom: document
  };
  event.isDefaultPrevented = isDefaultPrevented;
  event.isPropagationStopped = isPropagationStopped;
  event.stopPropagation = stopPropagation;
  Object.defineProperty(event, "currentTarget", {
    configurable: true,
    get: function get() {
      return eventData.dom;
    }
  });
  return eventData;
}
function rootClickEvent(name) {
  return function(event) {
    if (event.button !== 0) {
      event.stopPropagation();
      return;
    }
    dispatchEvents(event, true, name, extendEventProperties(event));
  };
}
function rootEvent(name) {
  return function(event) {
    dispatchEvents(event, false, name, extendEventProperties(event));
  };
}
function attachEventToDocument(name) {
  var attachedEvent = name === "onClick" || name === "onDblClick" ? rootClickEvent(name) : rootEvent(name);
  document.addEventListener(normalizeEventName(name), attachedEvent);
  return attachedEvent;
}
function isSameInnerHTML(dom, innerHTML) {
  var tempdom = document.createElement("i");
  tempdom.innerHTML = innerHTML;
  return tempdom.innerHTML === dom.innerHTML;
}
function triggerEventListener(props, methodName, e) {
  if (props[methodName]) {
    var listener = props[methodName];
    if (listener.event) {
      listener.event(listener.data, e);
    } else {
      listener(e);
    }
  } else {
    var nativeListenerName = methodName.toLowerCase();
    if (props[nativeListenerName]) {
      props[nativeListenerName](e);
    }
  }
}
function createWrappedFunction(methodName, applyValue) {
  var fnMethod = function fnMethod2(e) {
    var vNode = this.$V;
    if (!vNode) {
      return;
    }
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    if (isString2(methodName)) {
      triggerEventListener(props, methodName, e);
    } else {
      for (var i = 0; i < methodName.length; ++i) {
        triggerEventListener(props, methodName[i], e);
      }
    }
    if (isFunction2(applyValue)) {
      var newVNode = this.$V;
      var newProps = newVNode.props || EMPTY_OBJ;
      applyValue(newProps, dom, false, newVNode);
    }
  };
  Object.defineProperty(fnMethod, "wrapped", {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false
  });
  return fnMethod;
}
function attachEvent(dom, eventName, handler) {
  var previousKey = "$" + eventName;
  var previousArgs = dom[previousKey];
  if (previousArgs) {
    if (previousArgs[1].wrapped) {
      return;
    }
    dom.removeEventListener(previousArgs[0], previousArgs[1]);
    dom[previousKey] = null;
  }
  if (isFunction2(handler)) {
    dom.addEventListener(eventName, handler);
    dom[previousKey] = [eventName, handler];
  }
}
function isCheckedType(type) {
  return type === "checkbox" || type === "radio";
}
var onTextInputChange = createWrappedFunction("onInput", applyValueInput);
var wrappedOnChange$1 = createWrappedFunction(["onClick", "onChange"], applyValueInput);
function emptywrapper(event) {
  event.stopPropagation();
}
emptywrapper.wrapped = true;
function inputEvents(dom, nextPropsOrEmpty) {
  if (isCheckedType(nextPropsOrEmpty.type)) {
    attachEvent(dom, "change", wrappedOnChange$1);
    attachEvent(dom, "click", emptywrapper);
  } else {
    attachEvent(dom, "input", onTextInputChange);
  }
}
function applyValueInput(nextPropsOrEmpty, dom) {
  var type = nextPropsOrEmpty.type;
  var value = nextPropsOrEmpty.value;
  var checked = nextPropsOrEmpty.checked;
  var multiple = nextPropsOrEmpty.multiple;
  var defaultValue = nextPropsOrEmpty.defaultValue;
  var hasValue = !isNullOrUndef(value);
  if (type && type !== dom.type) {
    dom.setAttribute("type", type);
  }
  if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
    dom.multiple = multiple;
  }
  if (!isNullOrUndef(defaultValue) && !hasValue) {
    dom.defaultValue = defaultValue + "";
  }
  if (isCheckedType(type)) {
    if (hasValue) {
      dom.value = value;
    }
    if (!isNullOrUndef(checked)) {
      dom.checked = checked;
    }
  } else {
    if (hasValue && dom.value !== value) {
      dom.defaultValue = value;
      dom.value = value;
    } else if (!isNullOrUndef(checked)) {
      dom.checked = checked;
    }
  }
}
function updateChildOptions(vNode, value) {
  if (vNode.type === "option") {
    updateChildOption(vNode, value);
  } else {
    var children = vNode.children;
    var flags = vNode.flags;
    if (flags & 4) {
      updateChildOptions(children.$LI, value);
    } else if (flags & 8) {
      updateChildOptions(children, value);
    } else if (vNode.childFlags === 2) {
      updateChildOptions(children, value);
    } else if (vNode.childFlags & 12) {
      for (var i = 0, len = children.length; i < len; ++i) {
        updateChildOptions(children[i], value);
      }
    }
  }
}
function updateChildOption(vNode, value) {
  var props = vNode.props || EMPTY_OBJ;
  var dom = vNode.dom;
  dom.value = props.value;
  if (props.value === value || isArray(value) && value.indexOf(props.value) !== -1) {
    dom.selected = true;
  } else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
    dom.selected = props.selected || false;
  }
}
var onSelectChange = createWrappedFunction("onChange", applyValueSelect);
function selectEvents(dom) {
  attachEvent(dom, "change", onSelectChange);
}
function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
  var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
  if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
    dom.multiple = multiplePropInBoolean;
  }
  var index = nextPropsOrEmpty.selectedIndex;
  if (index === -1) {
    dom.selectedIndex = -1;
  }
  var childFlags = vNode.childFlags;
  if (childFlags !== 1) {
    var value = nextPropsOrEmpty.value;
    if (isNumber(index) && index > -1 && dom.options[index]) {
      value = dom.options[index].value;
    }
    if (mounting && isNullOrUndef(value)) {
      value = nextPropsOrEmpty.defaultValue;
    }
    updateChildOptions(vNode, value);
  }
}
var onTextareaInputChange = createWrappedFunction("onInput", applyValueTextArea);
var wrappedOnChange = createWrappedFunction("onChange");
function textAreaEvents(dom, nextPropsOrEmpty) {
  attachEvent(dom, "input", onTextareaInputChange);
  if (nextPropsOrEmpty.onChange) {
    attachEvent(dom, "change", wrappedOnChange);
  }
}
function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
  var value = nextPropsOrEmpty.value;
  var domValue = dom.value;
  if (isNullOrUndef(value)) {
    if (mounting) {
      var defaultValue = nextPropsOrEmpty.defaultValue;
      if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
        dom.defaultValue = defaultValue;
        dom.value = defaultValue;
      }
    }
  } else if (domValue !== value) {
    dom.defaultValue = value;
    dom.value = value;
  }
}
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
  if (flags & 64) {
    applyValueInput(nextPropsOrEmpty, dom);
  } else if (flags & 256) {
    applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
  } else if (flags & 128) {
    applyValueTextArea(nextPropsOrEmpty, dom, mounting);
  }
  if (isControlled) {
    dom.$V = vNode;
  }
}
function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
  if (flags & 64) {
    inputEvents(dom, nextPropsOrEmpty);
  } else if (flags & 256) {
    selectEvents(dom);
  } else if (flags & 128) {
    textAreaEvents(dom, nextPropsOrEmpty);
  }
}
function isControlledFormElement(nextPropsOrEmpty) {
  return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}
function createRef() {
  return {
    current: null
  };
}
function unmountRef(ref) {
  if (ref) {
    if (!safeCall1(ref, null) && ref.current) {
      ref.current = null;
    }
  }
}
function mountRef(ref, value, lifecycle) {
  if (ref && (isFunction2(ref) || ref.current !== void 0)) {
    lifecycle.push(function() {
      if (!safeCall1(ref, value) && ref.current !== void 0) {
        ref.current = value;
      }
    });
  }
}
function remove(vNode, parentDOM, animations) {
  unmount(vNode, animations);
  removeVNodeDOM(vNode, parentDOM, animations);
}
function unmount(vNode, animations) {
  var flags = vNode.flags;
  var children = vNode.children;
  var ref;
  if (flags & 481) {
    ref = vNode.ref;
    var props = vNode.props;
    unmountRef(ref);
    var childFlags = vNode.childFlags;
    if (!isNull(props)) {
      var keys = Object.keys(props);
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (syntheticEvents[key]) {
          unmountSyntheticEvent(key, vNode.dom);
        }
      }
    }
    if (childFlags & 12) {
      unmountAllChildren(children, animations);
    } else if (childFlags === 2) {
      unmount(children, animations);
    }
  } else if (children) {
    if (flags & 4) {
      if (isFunction2(children.componentWillUnmount)) {
        children.componentWillUnmount();
      }
      var childAnimations = animations;
      if (isFunction2(children.componentWillDisappear)) {
        childAnimations = new AnimationQueues();
        addDisappearAnimationHook(animations, children, children.$LI.dom, flags, void 0);
      }
      unmountRef(vNode.ref);
      children.$UN = true;
      unmount(children.$LI, childAnimations);
    } else if (flags & 8) {
      var _childAnimations = animations;
      ref = vNode.ref;
      if (!isNullOrUndef(ref)) {
        var domEl = null;
        if (isFunction2(ref.onComponentWillUnmount)) {
          domEl = findDOMFromVNode(vNode, true);
          ref.onComponentWillUnmount(domEl, vNode.props || EMPTY_OBJ);
        }
        if (isFunction2(ref.onComponentWillDisappear)) {
          _childAnimations = new AnimationQueues();
          domEl = domEl || findDOMFromVNode(vNode, true);
          addDisappearAnimationHook(animations, ref, domEl, flags, vNode.props);
        }
      }
      unmount(children, _childAnimations);
    } else if (flags & 1024) {
      remove(children, vNode.ref, animations);
    } else if (flags & 8192) {
      if (vNode.childFlags & 12) {
        unmountAllChildren(children, animations);
      }
    }
  }
}
function unmountAllChildren(children, animations) {
  for (var i = 0, len = children.length; i < len; ++i) {
    unmount(children[i], animations);
  }
}
function createClearAllCallback(children, parentDOM) {
  return function() {
    if (parentDOM) {
      for (var i = 0; i < children.length; i++) {
        var vNode = children[i];
        clearVNodeDOM(vNode, parentDOM, false);
      }
    }
  };
}
function clearDOM(parentDOM, children, animations) {
  if (animations.componentWillDisappear.length > 0) {
    callAllAnimationHooks(animations.componentWillDisappear, createClearAllCallback(children, parentDOM));
  } else {
    parentDOM.textContent = "";
  }
}
function removeAllChildren(dom, vNode, children, animations) {
  unmountAllChildren(children, animations);
  if (vNode.flags & 8192) {
    removeVNodeDOM(vNode, dom, animations);
  } else {
    clearDOM(dom, children, animations);
  }
}
function addDisappearAnimationHook(animations, instanceOrRef, dom, flags, props) {
  animations.componentWillDisappear.push(function(callback) {
    if (flags & 4) {
      instanceOrRef.componentWillDisappear(dom, callback);
    } else if (flags & 8) {
      instanceOrRef.onComponentWillDisappear(dom, props, callback);
    }
  });
}
function wrapLinkEvent(nextValue) {
  var ev = nextValue.event;
  return function(e) {
    ev(nextValue.data, e);
  };
}
function patchEvent(name, lastValue, nextValue, dom) {
  if (isLinkEventObject(nextValue)) {
    if (isLastValueSameLinkEvent(lastValue, nextValue)) {
      return;
    }
    nextValue = wrapLinkEvent(nextValue);
  }
  attachEvent(dom, normalizeEventName(name), nextValue);
}
function patchStyle(lastAttrValue, nextAttrValue, dom) {
  if (isNullOrUndef(nextAttrValue)) {
    dom.removeAttribute("style");
    return;
  }
  var domStyle = dom.style;
  var style;
  var value;
  if (isString2(nextAttrValue)) {
    domStyle.cssText = nextAttrValue;
    return;
  }
  if (!isNullOrUndef(lastAttrValue) && !isString2(lastAttrValue)) {
    for (style in nextAttrValue) {
      value = nextAttrValue[style];
      if (value !== lastAttrValue[style]) {
        domStyle.setProperty(style, value);
      }
    }
    for (style in lastAttrValue) {
      if (isNullOrUndef(nextAttrValue[style])) {
        domStyle.removeProperty(style);
      }
    }
  } else {
    for (style in nextAttrValue) {
      value = nextAttrValue[style];
      domStyle.setProperty(style, value);
    }
  }
}
function patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom, animations) {
  var lastHtml = lastValue && lastValue.__html || "";
  var nextHtml = nextValue && nextValue.__html || "";
  if (lastHtml !== nextHtml) {
    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
      if (!isNull(lastVNode)) {
        if (lastVNode.childFlags & 12) {
          unmountAllChildren(lastVNode.children, animations);
        } else if (lastVNode.childFlags === 2) {
          unmount(lastVNode.children, animations);
        }
        lastVNode.children = null;
        lastVNode.childFlags = 1;
      }
      dom.innerHTML = nextHtml;
    }
  }
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode, animations) {
  switch (prop) {
    case "children":
    case "childrenType":
    case "className":
    case "defaultValue":
    case "key":
    case "multiple":
    case "ref":
    case "selectedIndex":
      break;
    case "autoFocus":
      dom.autofocus = !!nextValue;
      break;
    case "allowfullscreen":
    case "autoplay":
    case "capture":
    case "checked":
    case "controls":
    case "default":
    case "disabled":
    case "hidden":
    case "indeterminate":
    case "loop":
    case "muted":
    case "novalidate":
    case "open":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "selected":
      dom[prop] = !!nextValue;
      break;
    case "defaultChecked":
    case "value":
    case "volume":
      if (hasControlledValue && prop === "value") {
        break;
      }
      var value = isNullOrUndef(nextValue) ? "" : nextValue;
      if (dom[prop] !== value) {
        dom[prop] = value;
      }
      break;
    case "style":
      patchStyle(lastValue, nextValue, dom);
      break;
    case "dangerouslySetInnerHTML":
      patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom, animations);
      break;
    default:
      if (syntheticEvents[prop]) {
        handleSyntheticEvent(prop, lastValue, nextValue, dom);
      } else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
        patchEvent(prop, lastValue, nextValue, dom);
      } else if (isNullOrUndef(nextValue)) {
        dom.removeAttribute(prop);
      } else if (isSVG && namespaces[prop]) {
        dom.setAttributeNS(namespaces[prop], prop, nextValue);
      } else {
        dom.setAttribute(prop, nextValue);
      }
      break;
  }
}
function mountProps(vNode, flags, props, dom, isSVG, animations) {
  var hasControlledValue = false;
  var isFormElement = (flags & 448) > 0;
  if (isFormElement) {
    hasControlledValue = isControlledFormElement(props);
    if (hasControlledValue) {
      addFormElementEventHandlers(flags, dom, props);
    }
  }
  for (var prop in props) {
    patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null, animations);
  }
  if (isFormElement) {
    processElement(flags, vNode, dom, props, true, hasControlledValue);
  }
}
function renderNewInput(instance, props, context) {
  var nextInput = normalizeRoot(instance.render(props, instance.state, context));
  var childContext = context;
  if (isFunction2(instance.getChildContext)) {
    childContext = combineFrom(context, instance.getChildContext());
  }
  instance.$CX = childContext;
  return nextInput;
}
function createClassComponentInstance(vNode, Component2, props, context, isSVG, lifecycle) {
  var instance = new Component2(props, context);
  var usesNewAPI = instance.$N = Boolean(Component2.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate);
  instance.$SVG = isSVG;
  instance.$L = lifecycle;
  vNode.children = instance;
  instance.$BS = false;
  instance.context = context;
  if (instance.props === EMPTY_OBJ) {
    instance.props = props;
  }
  if (!usesNewAPI) {
    if (isFunction2(instance.componentWillMount)) {
      instance.$BR = true;
      instance.componentWillMount();
      var pending = instance.$PS;
      if (!isNull(pending)) {
        var state = instance.state;
        if (isNull(state)) {
          instance.state = pending;
        } else {
          for (var key in pending) {
            state[key] = pending[key];
          }
        }
        instance.$PS = null;
      }
      instance.$BR = false;
    }
  } else {
    instance.state = createDerivedState(instance, props, instance.state);
  }
  instance.$LI = renderNewInput(instance, props, context);
  return instance;
}
function renderFunctionalComponent(vNode, context) {
  var props = vNode.props || EMPTY_OBJ;
  return vNode.flags & 32768 ? vNode.type.render(props, vNode.ref, context) : vNode.type(props, context);
}
function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var flags = vNode.flags |= 16384;
  if (flags & 481) {
    mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else if (flags & 4) {
    mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else if (flags & 8) {
    mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else if (flags & 16) {
    mountText(vNode, parentDOM, nextNode);
  } else if (flags & 8192) {
    mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle, animations);
  } else if (flags & 1024) {
    mountPortal(vNode, context, parentDOM, nextNode, lifecycle, animations);
  } else ;
}
function mountPortal(vNode, context, parentDOM, nextNode, lifecycle, animations) {
  mount(vNode.children, vNode.ref, context, false, null, lifecycle, animations);
  var placeHolderVNode = createVoidVNode();
  mountText(placeHolderVNode, parentDOM, nextNode);
  vNode.dom = placeHolderVNode.dom;
}
function mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle, animations) {
  var children = vNode.children;
  var childFlags = vNode.childFlags;
  if (childFlags & 12 && children.length === 0) {
    childFlags = vNode.childFlags = 2;
    children = vNode.children = createVoidVNode();
  }
  if (childFlags === 2) {
    mount(children, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else {
    mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  }
}
function mountText(vNode, parentDOM, nextNode) {
  var dom = vNode.dom = document.createTextNode(vNode.children);
  if (!isNull(parentDOM)) {
    insertOrAppend(parentDOM, dom, nextNode);
  }
}
function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var flags = vNode.flags;
  var props = vNode.props;
  var className = vNode.className;
  var childFlags = vNode.childFlags;
  var dom = vNode.dom = documentCreateElement(vNode.type, isSVG = isSVG || (flags & 32) > 0);
  var children = vNode.children;
  if (!isNullOrUndef(className) && className !== "") {
    if (isSVG) {
      dom.setAttribute("class", className);
    } else {
      dom.className = className;
    }
  }
  if (childFlags === 16) {
    setTextContent(dom, children);
  } else if (childFlags !== 1) {
    var childrenIsSVG = isSVG && vNode.type !== "foreignObject";
    if (childFlags === 2) {
      if (children.flags & 16384) {
        vNode.children = children = directClone(children);
      }
      mount(children, dom, context, childrenIsSVG, null, lifecycle, animations);
    } else if (childFlags === 8 || childFlags === 4) {
      mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle, animations);
    }
  }
  if (!isNull(parentDOM)) {
    insertOrAppend(parentDOM, dom, nextNode);
  }
  if (!isNull(props)) {
    mountProps(vNode, flags, props, dom, isSVG, animations);
  }
  mountRef(vNode.ref, dom, lifecycle);
}
function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle, animations) {
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];
    if (child.flags & 16384) {
      children[i] = child = directClone(child);
    }
    mount(child, dom, context, isSVG, nextNode, lifecycle, animations);
  }
}
function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
  var childAnimations = animations;
  if (isFunction2(instance.componentDidAppear)) {
    childAnimations = new AnimationQueues();
  }
  mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle, childAnimations);
  mountClassComponentCallbacks(vNode.ref, instance, lifecycle, animations);
}
function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var ref = vNode.ref;
  var childAnimations = animations;
  if (!isNullOrUndef(ref) && isFunction2(ref.onComponentDidAppear)) {
    childAnimations = new AnimationQueues();
  }
  mount(vNode.children = normalizeRoot(renderFunctionalComponent(vNode, context)), parentDOM, context, isSVG, nextNode, lifecycle, childAnimations);
  mountFunctionalComponentCallbacks(vNode, lifecycle, animations);
}
function createClassMountCallback(instance) {
  return function() {
    instance.componentDidMount();
  };
}
function addAppearAnimationHook(animations, instanceOrRef, dom, flags, props) {
  animations.componentDidAppear.push(function() {
    if (flags & 4) {
      instanceOrRef.componentDidAppear(dom);
    } else if (flags & 8) {
      instanceOrRef.onComponentDidAppear(dom, props);
    }
  });
}
function mountClassComponentCallbacks(ref, instance, lifecycle, animations) {
  mountRef(ref, instance, lifecycle);
  if (isFunction2(instance.componentDidMount)) {
    lifecycle.push(createClassMountCallback(instance));
  }
  if (isFunction2(instance.componentDidAppear)) {
    addAppearAnimationHook(animations, instance, instance.$LI.dom, 4, void 0);
  }
}
function createOnMountCallback(ref, vNode) {
  return function() {
    ref.onComponentDidMount(findDOMFromVNode(vNode, true), vNode.props || EMPTY_OBJ);
  };
}
function mountFunctionalComponentCallbacks(vNode, lifecycle, animations) {
  var ref = vNode.ref;
  if (!isNullOrUndef(ref)) {
    safeCall1(ref.onComponentWillMount, vNode.props || EMPTY_OBJ);
    if (isFunction2(ref.onComponentDidMount)) {
      lifecycle.push(createOnMountCallback(ref, vNode));
    }
    if (isFunction2(ref.onComponentDidAppear)) {
      addAppearAnimationHook(animations, ref, findDOMFromVNode(vNode, true), 8, vNode.props);
    }
  }
}
function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle, animations) {
  unmount(lastVNode, animations);
  if ((nextVNode.flags & lastVNode.flags & 1521) !== 0) {
    mount(nextVNode, null, context, isSVG, null, lifecycle, animations);
    replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
  } else {
    mount(nextVNode, parentDOM, context, isSVG, findDOMFromVNode(lastVNode, true), lifecycle, animations);
    removeVNodeDOM(lastVNode, parentDOM, animations);
  }
}
function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var nextFlags = nextVNode.flags |= 16384;
  if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || nextFlags & 2048) {
    if (lastVNode.flags & 16384) {
      replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle, animations);
    } else {
      mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
    }
  } else if (nextFlags & 481) {
    patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle, animations);
  } else if (nextFlags & 4) {
    patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else if (nextFlags & 8) {
    patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations);
  } else if (nextFlags & 16) {
    patchText(lastVNode, nextVNode);
  } else if (nextFlags & 8192) {
    patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle, animations);
  } else {
    patchPortal(lastVNode, nextVNode, context, lifecycle, animations);
  }
}
function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
  if (lastChildren !== nextChildren) {
    if (lastChildren !== "") {
      parentDOM.firstChild.nodeValue = nextChildren;
    } else {
      setTextContent(parentDOM, nextChildren);
    }
  }
}
function patchContentEditableChildren(dom, nextChildren) {
  if (dom.textContent !== nextChildren) {
    dom.textContent = nextChildren;
  }
}
function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle, animations) {
  var lastChildren = lastVNode.children;
  var nextChildren = nextVNode.children;
  var lastChildFlags = lastVNode.childFlags;
  var nextChildFlags = nextVNode.childFlags;
  var nextNode = null;
  if (nextChildFlags & 12 && nextChildren.length === 0) {
    nextChildFlags = nextVNode.childFlags = 2;
    nextChildren = nextVNode.children = createVoidVNode();
  }
  var nextIsSingle = (nextChildFlags & 2) !== 0;
  if (lastChildFlags & 12) {
    var lastLen = lastChildren.length;
    if (
      // It uses keyed algorithm
      lastChildFlags & 8 && nextChildFlags & 8 || // It transforms from many to single
      nextIsSingle || // It will append more nodes
      !nextIsSingle && nextChildren.length > lastLen
    ) {
      nextNode = findDOMFromVNode(lastChildren[lastLen - 1], false).nextSibling;
    }
  }
  patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle, animations);
}
function patchPortal(lastVNode, nextVNode, context, lifecycle, animations) {
  var lastContainer = lastVNode.ref;
  var nextContainer = nextVNode.ref;
  var nextChildren = nextVNode.children;
  patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle, animations);
  nextVNode.dom = lastVNode.dom;
  if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
    var node = nextChildren.dom;
    removeChild(lastContainer, node);
    appendChild(nextContainer, node);
  }
}
function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle, animations) {
  var dom = nextVNode.dom = lastVNode.dom;
  var lastProps = lastVNode.props;
  var nextProps = nextVNode.props;
  var isFormElement = false;
  var hasControlledValue = false;
  var nextPropsOrEmpty;
  isSVG = isSVG || (nextFlags & 32) > 0;
  if (lastProps !== nextProps) {
    var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
    nextPropsOrEmpty = nextProps || EMPTY_OBJ;
    if (nextPropsOrEmpty !== EMPTY_OBJ) {
      isFormElement = (nextFlags & 448) > 0;
      if (isFormElement) {
        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
      }
      for (var prop in nextPropsOrEmpty) {
        var lastValue = lastPropsOrEmpty[prop];
        var nextValue = nextPropsOrEmpty[prop];
        if (lastValue !== nextValue) {
          patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode, animations);
        }
      }
    }
    if (lastPropsOrEmpty !== EMPTY_OBJ) {
      for (var _prop in lastPropsOrEmpty) {
        if (isNullOrUndef(nextPropsOrEmpty[_prop]) && !isNullOrUndef(lastPropsOrEmpty[_prop])) {
          patchProp(_prop, lastPropsOrEmpty[_prop], null, dom, isSVG, hasControlledValue, lastVNode, animations);
        }
      }
    }
  }
  var nextChildren = nextVNode.children;
  var nextClassName = nextVNode.className;
  if (lastVNode.className !== nextClassName) {
    if (isNullOrUndef(nextClassName)) {
      dom.removeAttribute("class");
    } else if (isSVG) {
      dom.setAttribute("class", nextClassName);
    } else {
      dom.className = nextClassName;
    }
  }
  if (nextFlags & 4096) {
    patchContentEditableChildren(dom, nextChildren);
  } else {
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== "foreignObject", null, lastVNode, lifecycle, animations);
  }
  if (isFormElement) {
    processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
  }
  var nextRef = nextVNode.ref;
  var lastRef = lastVNode.ref;
  if (lastRef !== nextRef) {
    unmountRef(lastRef);
    mountRef(nextRef, dom, lifecycle);
  }
}
function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle, animations) {
  unmount(lastChildren, animations);
  mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMFromVNode(lastChildren, true), lifecycle, animations);
  removeVNodeDOM(lastChildren, parentDOM, animations);
}
function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle, animations) {
  switch (lastChildFlags) {
    case 2:
      switch (nextChildFlags) {
        case 2:
          patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
        case 1:
          remove(lastChildren, parentDOM, animations);
          break;
        case 16:
          unmount(lastChildren, animations);
          setTextContent(parentDOM, nextChildren);
          break;
        default:
          replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle, animations);
          break;
      }
      break;
    case 1:
      switch (nextChildFlags) {
        case 2:
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
        case 1:
          break;
        case 16:
          setTextContent(parentDOM, nextChildren);
          break;
        default:
          mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
      }
      break;
    case 16:
      switch (nextChildFlags) {
        case 16:
          patchSingleTextChild(lastChildren, nextChildren, parentDOM);
          break;
        case 2:
          clearDOM(parentDOM, lastChildren, animations);
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
        case 1:
          clearDOM(parentDOM, lastChildren, animations);
          break;
        default:
          clearDOM(parentDOM, lastChildren, animations);
          mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
      }
      break;
    default:
      switch (nextChildFlags) {
        case 16:
          unmountAllChildren(lastChildren, animations);
          setTextContent(parentDOM, nextChildren);
          break;
        case 2:
          removeAllChildren(parentDOM, parentVNode, lastChildren, animations);
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
          break;
        case 1:
          removeAllChildren(parentDOM, parentVNode, lastChildren, animations);
          break;
        default:
          var lastLength = lastChildren.length | 0;
          var nextLength = nextChildren.length | 0;
          if (lastLength === 0) {
            if (nextLength > 0) {
              mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle, animations);
            }
          } else if (nextLength === 0) {
            removeAllChildren(parentDOM, parentVNode, lastChildren, animations);
          } else if (nextChildFlags === 8 && lastChildFlags === 8) {
            patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle, animations);
          } else {
            patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle, animations);
          }
          break;
      }
      break;
  }
}
function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
  lifecycle.push(function() {
    instance.componentDidUpdate(lastProps, lastState, snapshot);
  });
}
function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle, animations) {
  var lastState = instance.state;
  var lastProps = instance.props;
  var usesNewAPI = Boolean(instance.$N);
  var hasSCU = isFunction2(instance.shouldComponentUpdate);
  if (usesNewAPI) {
    nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
  }
  if (force || !hasSCU || hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context)) {
    if (!usesNewAPI && isFunction2(instance.componentWillUpdate)) {
      instance.componentWillUpdate(nextProps, nextState, context);
    }
    instance.props = nextProps;
    instance.state = nextState;
    instance.context = context;
    var snapshot = null;
    var nextInput = renderNewInput(instance, nextProps, context);
    if (usesNewAPI && isFunction2(instance.getSnapshotBeforeUpdate)) {
      snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
    }
    patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle, animations);
    instance.$LI = nextInput;
    if (isFunction2(instance.componentDidUpdate)) {
      createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
    }
  } else {
    instance.props = nextProps;
    instance.state = nextState;
    instance.context = context;
  }
}
function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var instance = nextVNode.children = lastVNode.children;
  if (isNull(instance)) {
    return;
  }
  instance.$L = lifecycle;
  var nextProps = nextVNode.props || EMPTY_OBJ;
  var nextRef = nextVNode.ref;
  var lastRef = lastVNode.ref;
  var nextState = instance.state;
  if (!instance.$N) {
    if (isFunction2(instance.componentWillReceiveProps)) {
      instance.$BR = true;
      instance.componentWillReceiveProps(nextProps, context);
      if (instance.$UN) {
        return;
      }
      instance.$BR = false;
    }
    if (!isNull(instance.$PS)) {
      nextState = combineFrom(nextState, instance.$PS);
      instance.$PS = null;
    }
  }
  updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle, animations);
  if (lastRef !== nextRef) {
    unmountRef(lastRef);
    mountRef(nextRef, instance, lifecycle);
  }
}
function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle, animations) {
  var shouldUpdate = true;
  var nextProps = nextVNode.props || EMPTY_OBJ;
  var nextRef = nextVNode.ref;
  var lastProps = lastVNode.props;
  var nextHooksDefined = !isNullOrUndef(nextRef);
  var lastInput = lastVNode.children;
  if (nextHooksDefined && isFunction2(nextRef.onComponentShouldUpdate)) {
    shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
  }
  if (shouldUpdate !== false) {
    if (nextHooksDefined && isFunction2(nextRef.onComponentWillUpdate)) {
      nextRef.onComponentWillUpdate(lastProps, nextProps);
    }
    var nextInput = normalizeRoot(renderFunctionalComponent(nextVNode, context));
    patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle, animations);
    nextVNode.children = nextInput;
    if (nextHooksDefined && isFunction2(nextRef.onComponentDidUpdate)) {
      nextRef.onComponentDidUpdate(lastProps, nextProps);
    }
  } else {
    nextVNode.children = lastInput;
  }
}
function patchText(lastVNode, nextVNode) {
  var nextText = nextVNode.children;
  var dom = nextVNode.dom = lastVNode.dom;
  if (nextText !== lastVNode.children) {
    dom.nodeValue = nextText;
  }
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle, animations) {
  var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
  var i = 0;
  var nextChild;
  var lastChild;
  for (; i < commonLength; ++i) {
    nextChild = nextChildren[i];
    lastChild = lastChildren[i];
    if (nextChild.flags & 16384) {
      nextChild = nextChildren[i] = directClone(nextChild);
    }
    patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle, animations);
    lastChildren[i] = nextChild;
  }
  if (lastChildrenLength < nextChildrenLength) {
    for (i = commonLength; i < nextChildrenLength; ++i) {
      nextChild = nextChildren[i];
      if (nextChild.flags & 16384) {
        nextChild = nextChildren[i] = directClone(nextChild);
      }
      mount(nextChild, dom, context, isSVG, nextNode, lifecycle, animations);
    }
  } else if (lastChildrenLength > nextChildrenLength) {
    for (i = commonLength; i < lastChildrenLength; ++i) {
      remove(lastChildren[i], dom, animations);
    }
  }
}
function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle, animations) {
  var aEnd = aLength - 1;
  var bEnd = bLength - 1;
  var j = 0;
  var aNode = a[j];
  var bNode = b[j];
  var nextPos;
  var nextNode;
  outer: {
    while (aNode.key === bNode.key) {
      if (bNode.flags & 16384) {
        b[j] = bNode = directClone(bNode);
      }
      patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle, animations);
      a[j] = bNode;
      ++j;
      if (j > aEnd || j > bEnd) {
        break outer;
      }
      aNode = a[j];
      bNode = b[j];
    }
    aNode = a[aEnd];
    bNode = b[bEnd];
    while (aNode.key === bNode.key) {
      if (bNode.flags & 16384) {
        b[bEnd] = bNode = directClone(bNode);
      }
      patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle, animations);
      a[aEnd] = bNode;
      aEnd--;
      bEnd--;
      if (j > aEnd || j > bEnd) {
        break outer;
      }
      aNode = a[aEnd];
      bNode = b[bEnd];
    }
  }
  if (j > aEnd) {
    if (j <= bEnd) {
      nextPos = bEnd + 1;
      nextNode = nextPos < bLength ? findDOMFromVNode(b[nextPos], true) : outerEdge;
      while (j <= bEnd) {
        bNode = b[j];
        if (bNode.flags & 16384) {
          b[j] = bNode = directClone(bNode);
        }
        ++j;
        mount(bNode, dom, context, isSVG, nextNode, lifecycle, animations);
      }
    }
  } else if (j > bEnd) {
    while (j <= aEnd) {
      remove(a[j++], dom, animations);
    }
  } else {
    patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle, animations);
  }
}
function patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle, animations) {
  var aNode;
  var bNode;
  var nextPos = 0;
  var i = 0;
  var aStart = j;
  var bStart = j;
  var aLeft = aEnd - j + 1;
  var bLeft = bEnd - j + 1;
  var sources = new Int32Array(bLeft + 1);
  var canRemoveWholeContent = aLeft === aLength;
  var moved = false;
  var pos = 0;
  var patched = 0;
  if (bLength < 4 || (aLeft | bLeft) < 32) {
    for (i = aStart; i <= aEnd; ++i) {
      aNode = a[i];
      if (patched < bLeft) {
        for (j = bStart; j <= bEnd; j++) {
          bNode = b[j];
          if (aNode.key === bNode.key) {
            sources[j - bStart] = i + 1;
            if (canRemoveWholeContent) {
              canRemoveWholeContent = false;
              while (aStart < i) {
                remove(a[aStart++], dom, animations);
              }
            }
            if (pos > j) {
              moved = true;
            } else {
              pos = j;
            }
            if (bNode.flags & 16384) {
              b[j] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle, animations);
            ++patched;
            break;
          }
        }
        if (!canRemoveWholeContent && j > bEnd) {
          remove(aNode, dom, animations);
        }
      } else if (!canRemoveWholeContent) {
        remove(aNode, dom, animations);
      }
    }
  } else {
    var keyIndex = {};
    for (i = bStart; i <= bEnd; ++i) {
      keyIndex[b[i].key] = i;
    }
    for (i = aStart; i <= aEnd; ++i) {
      aNode = a[i];
      if (patched < bLeft) {
        j = keyIndex[aNode.key];
        if (j !== void 0) {
          if (canRemoveWholeContent) {
            canRemoveWholeContent = false;
            while (i > aStart) {
              remove(a[aStart++], dom, animations);
            }
          }
          sources[j - bStart] = i + 1;
          if (pos > j) {
            moved = true;
          } else {
            pos = j;
          }
          bNode = b[j];
          if (bNode.flags & 16384) {
            b[j] = bNode = directClone(bNode);
          }
          patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle, animations);
          ++patched;
        } else if (!canRemoveWholeContent) {
          remove(aNode, dom, animations);
        }
      } else if (!canRemoveWholeContent) {
        remove(aNode, dom, animations);
      }
    }
  }
  if (canRemoveWholeContent) {
    removeAllChildren(dom, parentVNode, a, animations);
    mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle, animations);
  } else if (moved) {
    var seq = lis_algorithm(sources);
    j = seq.length - 1;
    for (i = bLeft - 1; i >= 0; i--) {
      if (sources[i] === 0) {
        pos = i + bStart;
        bNode = b[pos];
        if (bNode.flags & 16384) {
          b[pos] = bNode = directClone(bNode);
        }
        nextPos = pos + 1;
        mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMFromVNode(b[nextPos], true) : outerEdge, lifecycle, animations);
      } else if (j < 0 || i !== seq[j]) {
        pos = i + bStart;
        bNode = b[pos];
        nextPos = pos + 1;
        moveVNodeDOM(parentVNode, bNode, dom, nextPos < bLength ? findDOMFromVNode(b[nextPos], true) : outerEdge, animations);
      } else {
        j--;
      }
    }
    if (animations.componentWillMove.length > 0) {
      callAllMoveAnimationHooks(animations.componentWillMove);
    }
  } else if (patched !== bLeft) {
    for (i = bLeft - 1; i >= 0; i--) {
      if (sources[i] === 0) {
        pos = i + bStart;
        bNode = b[pos];
        if (bNode.flags & 16384) {
          b[pos] = bNode = directClone(bNode);
        }
        nextPos = pos + 1;
        mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMFromVNode(b[nextPos], true) : outerEdge, lifecycle, animations);
      }
    }
  }
}
var result;
var p;
var maxLen = 0;
function lis_algorithm(arr) {
  var arrI = 0;
  var i = 0;
  var j = 0;
  var k = 0;
  var u = 0;
  var v = 0;
  var c = 0;
  var len = arr.length;
  if (len > maxLen) {
    maxLen = len;
    result = new Int32Array(len);
    p = new Int32Array(len);
  }
  for (; i < len; ++i) {
    arrI = arr[i];
    if (arrI !== 0) {
      j = result[k];
      if (arr[j] < arrI) {
        p[i] = j;
        result[++k] = i;
        continue;
      }
      u = 0;
      v = k;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = k + 1;
  var seq = new Int32Array(u);
  v = result[u - 1];
  while (u-- > 0) {
    seq[u] = v;
    v = p[v];
    result[u] = 0;
  }
  return seq;
}
var hasDocumentAvailable = typeof document !== "undefined";
if (hasDocumentAvailable) {
  if (window.Node) {
    Node.prototype.$EV = null;
    Node.prototype.$V = null;
  }
}
function __render(input, parentDOM, callback, context) {
  var lifecycle = [];
  var animations = new AnimationQueues();
  var rootInput = parentDOM.$V;
  renderCheck.v = true;
  if (isNullOrUndef(rootInput)) {
    if (!isNullOrUndef(input)) {
      if (input.flags & 16384) {
        input = directClone(input);
      }
      mount(input, parentDOM, context, false, null, lifecycle, animations);
      parentDOM.$V = input;
      rootInput = input;
    }
  } else {
    if (isNullOrUndef(input)) {
      remove(rootInput, parentDOM, animations);
      parentDOM.$V = null;
    } else {
      if (input.flags & 16384) {
        input = directClone(input);
      }
      patch(rootInput, input, parentDOM, context, false, null, lifecycle, animations);
      rootInput = parentDOM.$V = input;
    }
  }
  callAll(lifecycle);
  callAllAnimationHooks(animations.componentDidAppear);
  renderCheck.v = false;
  if (isFunction2(callback)) {
    callback();
  }
  if (isFunction2(options.renderComplete)) {
    options.renderComplete(rootInput, parentDOM);
  }
}
function render(input, parentDOM, callback, context) {
  if (callback === void 0) {
    callback = null;
  }
  if (context === void 0) {
    context = EMPTY_OBJ;
  }
  __render(input, parentDOM, callback, context);
}
var COMPONENTS_QUEUE = [];
var nextTick = typeof Promise !== "undefined" ? Promise.resolve().then.bind(Promise.resolve()) : function(a) {
  window.setTimeout(a, 0);
};
var microTaskPending = false;
function queueStateChanges(component, newState, callback, force) {
  var pending = component.$PS;
  if (isFunction2(newState)) {
    newState = newState(pending ? combineFrom(component.state, pending) : component.state, component.props, component.context);
  }
  if (isNullOrUndef(pending)) {
    component.$PS = newState;
  } else {
    for (var stateKey in newState) {
      pending[stateKey] = newState[stateKey];
    }
  }
  if (!component.$BR) {
    if (!renderCheck.v) {
      if (COMPONENTS_QUEUE.length === 0) {
        applyState(component, force);
        if (isFunction2(callback)) {
          callback.call(component);
        }
        return;
      }
    }
    if (COMPONENTS_QUEUE.indexOf(component) === -1) {
      COMPONENTS_QUEUE.push(component);
    }
    if (force) {
      component.$F = true;
    }
    if (!microTaskPending) {
      microTaskPending = true;
      nextTick(rerender);
    }
    if (isFunction2(callback)) {
      var QU = component.$QU;
      if (!QU) {
        QU = component.$QU = [];
      }
      QU.push(callback);
    }
  } else if (isFunction2(callback)) {
    component.$L.push(callback.bind(component));
  }
}
function callSetStateCallbacks(component) {
  var queue = component.$QU;
  for (var i = 0; i < queue.length; ++i) {
    queue[i].call(component);
  }
  component.$QU = null;
}
function rerender() {
  var component;
  microTaskPending = false;
  while (component = COMPONENTS_QUEUE.shift()) {
    if (!component.$UN) {
      var force = component.$F;
      component.$F = false;
      applyState(component, force);
      if (component.$QU) {
        callSetStateCallbacks(component);
      }
    }
  }
}
function applyState(component, force) {
  if (force || !component.$BR) {
    var pendingState = component.$PS;
    component.$PS = null;
    var lifecycle = [];
    var animations = new AnimationQueues();
    renderCheck.v = true;
    updateClassComponent(component, combineFrom(component.state, pendingState), component.props, findDOMFromVNode(component.$LI, true).parentNode, component.context, component.$SVG, force, null, lifecycle, animations);
    callAll(lifecycle);
    callAllAnimationHooks(animations.componentDidAppear);
    renderCheck.v = false;
  } else {
    component.state = component.$PS;
    component.$PS = null;
  }
}
var Component = (function() {
  function Component2(props, context) {
    this.state = null;
    this.props = void 0;
    this.context = void 0;
    this.displayName = void 0;
    this.$BR = false;
    this.$BS = true;
    this.$PS = null;
    this.$LI = null;
    this.$UN = false;
    this.$CX = null;
    this.$QU = null;
    this.$N = false;
    this.$SSR = void 0;
    this.$L = null;
    this.$SVG = false;
    this.$F = false;
    this.props = props || EMPTY_OBJ;
    this.context = context || EMPTY_OBJ;
  }
  var _proto = Component2.prototype;
  _proto.forceUpdate = function forceUpdate(callback) {
    if (this.$UN) {
      return;
    }
    queueStateChanges(this, {}, callback, true);
  };
  _proto.setState = function setState(newState, callback) {
    if (this.$UN) {
      return;
    }
    if (!this.$BS) {
      queueStateChanges(this, newState, callback, false);
    }
  };
  _proto.render = function render3(props, state, context) {
    return null;
  };
  return Component2;
})();
Component.defaultProps = null;

// node_modules/inferno/index.esm.js
if (true) {
  console.warn("You are running production build of Inferno in development mode. Use dev:module entry point.");
}

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/effect_host.js
var InfernoEffectHost = {
  lockCount: 0,
  lock() {
    this.lockCount++;
  },
  callbacks: [],
  callEffects() {
    this.lockCount--;
    if (this.lockCount < 0) {
      throw new Error("Unexpected Effect Call");
    }
    if (0 === this.lockCount) {
      const effects = this.callbacks;
      this.callbacks = [];
      effects.forEach(((callback) => callback()));
    }
  }
};

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/base_component.js
var areObjectsEqual = (firstObject, secondObject) => {
  const bothAreObjects = firstObject instanceof Object && secondObject instanceof Object;
  if (!bothAreObjects) {
    return firstObject === secondObject;
  }
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  if (firstObjectKeys.length !== secondObjectKeys.length) {
    return false;
  }
  const hasDifferentElement = firstObjectKeys.some(((key) => firstObject[key] !== secondObject[key]));
  return !hasDifferentElement;
};
var BaseInfernoComponent = class extends Component {
  constructor() {
    super(...arguments);
    this._pendingContext = this.context;
  }
  componentWillReceiveProps(_, context) {
    this._pendingContext = context ?? {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !areObjectsEqual(this.props, nextProps) || !areObjectsEqual(this.state, nextState) || !areObjectsEqual(this.context, this._pendingContext);
  }
};
var InfernoComponent = class extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this._effects = [];
  }
  createEffects() {
    return [];
  }
  updateEffects() {
  }
  componentWillMount() {
    InfernoEffectHost.lock();
  }
  componentWillUpdate(_nextProps, _nextState, _context) {
    InfernoEffectHost.lock();
  }
  componentDidMount() {
    InfernoEffectHost.callbacks.push((() => {
      this._effects = this.createEffects();
    }));
    InfernoEffectHost.callEffects();
  }
  componentDidUpdate() {
    InfernoEffectHost.callbacks.push((() => this.updateEffects()));
    InfernoEffectHost.callEffects();
  }
  destroyEffects() {
    this._effects.forEach(((e) => e.dispose()));
  }
  componentWillUnmount() {
    this.destroyEffects();
  }
};
var InfernoWrapperComponent = class extends InfernoComponent {
  constructor() {
    super(...arguments);
    this.vDomElement = null;
  }
  vDomUpdateClasses() {
    var _el$className;
    const el = this.vDomElement;
    const currentClasses = null !== (_el$className = el.className) && void 0 !== _el$className && _el$className.length ? el.className.split(" ") : [];
    const addedClasses = currentClasses.filter(((className) => !el.dxClasses.previous.includes(className)));
    const removedClasses = el.dxClasses.previous.filter(((className) => !currentClasses.includes(className)));
    addedClasses.forEach(((value) => {
      const indexInRemoved = el.dxClasses.removed.indexOf(value);
      if (indexInRemoved > -1) {
        el.dxClasses.removed.splice(indexInRemoved, 1);
      }
      if (!el.dxClasses.added.includes(value)) {
        el.dxClasses.added.push(value);
      }
    }));
    removedClasses.forEach(((value) => {
      const indexInAdded = el.dxClasses.added.indexOf(value);
      if (indexInAdded > -1) {
        el.dxClasses.added.splice(indexInAdded, 1);
      }
      if (!el.dxClasses.removed.includes(value)) {
        el.dxClasses.removed.push(value);
      }
    }));
  }
  componentDidMount() {
    var _el$className2;
    const el = findDOMFromVNode(this.$LI, true);
    this.vDomElement = el;
    super.componentDidMount();
    el.dxClasses = el.dxClasses || {
      removed: [],
      added: [],
      previous: []
    };
    el.dxClasses.previous = null !== el && void 0 !== el && null !== (_el$className2 = el.className) && void 0 !== _el$className2 && _el$className2.length ? el.className.split(" ") : [];
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    const el = this.vDomElement;
    if (null !== el) {
      var _el$className3;
      el.dxClasses.added.forEach(((className) => el.classList.add(className)));
      el.dxClasses.removed.forEach(((className) => el.classList.remove(className)));
      el.dxClasses.previous = null !== (_el$className3 = el.className) && void 0 !== _el$className3 && _el$className3.length ? el.className.split(" ") : [];
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = super.shouldComponentUpdate(nextProps, nextState);
    if (shouldUpdate) {
      this.vDomUpdateClasses();
    }
    return shouldUpdate;
  }
};

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/create_context.js
var contextId = 0;
var createContext = function(defaultValue) {
  const id = contextId++;
  return {
    id,
    defaultValue,
    Provider: class extends Component {
      getChildContext() {
        return _extends({}, this.context, {
          [id]: this.props.value || defaultValue
        });
      }
      render() {
        return this.props.children;
      }
    }
  };
};

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/effect.js
var InfernoEffect = class {
  constructor(effect, dependency) {
    this.dependency = dependency;
    this.effect = effect;
    this.destroy = effect();
  }
  update(dependency) {
    const currentDependency = this.dependency;
    if (dependency) {
      this.dependency = dependency;
    }
    if (!dependency || dependency.some(((d, i) => currentDependency[i] !== d))) {
      this.dispose();
      this.destroy = this.effect();
    }
  }
  dispose() {
    if (this.destroy) {
      this.destroy();
    }
  }
};

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/mocked/shared.js
var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
function isNullOrUndef2(o) {
  return void 0 === o || null === o;
}
function isInvalid2(o) {
  return null === o || false === o || true === o || void 0 === o;
}
function isFunction3(o) {
  return "function" === typeof o;
}
function isNull2(o) {
  return null === o;
}
function throwError(message) {
  if (!message) {
    message = ERROR_MSG;
  }
  throw new Error(`Inferno Error: ${message}`);
}

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/mocked/vnode-flags.js
var VNodeFlags;
!(function(VNodeFlags2) {
  VNodeFlags2[VNodeFlags2.HtmlElement = 1] = "HtmlElement";
  VNodeFlags2[VNodeFlags2.ComponentUnknown = 2] = "ComponentUnknown";
  VNodeFlags2[VNodeFlags2.ComponentClass = 4] = "ComponentClass";
  VNodeFlags2[VNodeFlags2.ComponentFunction = 8] = "ComponentFunction";
  VNodeFlags2[VNodeFlags2.Text = 16] = "Text";
  VNodeFlags2[VNodeFlags2.SvgElement = 32] = "SvgElement";
  VNodeFlags2[VNodeFlags2.InputElement = 64] = "InputElement";
  VNodeFlags2[VNodeFlags2.TextareaElement = 128] = "TextareaElement";
  VNodeFlags2[VNodeFlags2.SelectElement = 256] = "SelectElement";
  VNodeFlags2[VNodeFlags2.Void = 512] = "Void";
  VNodeFlags2[VNodeFlags2.Portal = 1024] = "Portal";
  VNodeFlags2[VNodeFlags2.ReCreate = 2048] = "ReCreate";
  VNodeFlags2[VNodeFlags2.ContentEditable = 4096] = "ContentEditable";
  VNodeFlags2[VNodeFlags2.Fragment = 8192] = "Fragment";
  VNodeFlags2[VNodeFlags2.InUse = 16384] = "InUse";
  VNodeFlags2[VNodeFlags2.ForwardRef = 32768] = "ForwardRef";
  VNodeFlags2[VNodeFlags2.Normalized = 65536] = "Normalized";
  VNodeFlags2[VNodeFlags2.ForwardRefComponent = 32776] = "ForwardRefComponent";
  VNodeFlags2[VNodeFlags2.FormElement = 448] = "FormElement";
  VNodeFlags2[VNodeFlags2.Element = 481] = "Element";
  VNodeFlags2[VNodeFlags2.Component = 14] = "Component";
  VNodeFlags2[VNodeFlags2.DOMRef = 2033] = "DOMRef";
  VNodeFlags2[VNodeFlags2.InUseOrNormalized = 81920] = "InUseOrNormalized";
  VNodeFlags2[VNodeFlags2.ClearInUse = -16385] = "ClearInUse";
  VNodeFlags2[VNodeFlags2.ComponentKnown = 12] = "ComponentKnown";
})(VNodeFlags || (VNodeFlags = {}));
var ChildFlags;
!(function(ChildFlags2) {
  ChildFlags2[ChildFlags2.UnknownChildren = 0] = "UnknownChildren";
  ChildFlags2[ChildFlags2.HasInvalidChildren = 1] = "HasInvalidChildren";
  ChildFlags2[ChildFlags2.HasVNodeChildren = 2] = "HasVNodeChildren";
  ChildFlags2[ChildFlags2.HasNonKeyedChildren = 4] = "HasNonKeyedChildren";
  ChildFlags2[ChildFlags2.HasKeyedChildren = 8] = "HasKeyedChildren";
  ChildFlags2[ChildFlags2.HasTextChildren = 16] = "HasTextChildren";
  ChildFlags2[ChildFlags2.MultipleChildren = 12] = "MultipleChildren";
})(ChildFlags || (ChildFlags = {}));

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/mocked/hydrate.js
function isSameInnerHTML2(dom, innerHTML) {
  const tempdom = document.createElement("i");
  tempdom.innerHTML = innerHTML;
  return tempdom.innerHTML === dom.innerHTML;
}
function findLastDOMFromVNode(vNode) {
  let flags;
  let children;
  while (vNode) {
    flags = vNode.flags;
    if (flags & VNodeFlags.DOMRef) {
      return vNode.dom;
    }
    children = vNode.children;
    if (flags & VNodeFlags.Fragment) {
      vNode = vNode.childFlags === ChildFlags.HasVNodeChildren ? children : children[children.length - 1];
    } else if (flags & VNodeFlags.ComponentClass) {
      vNode = children.$LI;
    } else {
      vNode = children;
    }
  }
  return null;
}
function isSamePropsInnerHTML(dom, props) {
  return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML2(dom, props.dangerouslySetInnerHTML.__html));
}
function hydrateComponent(vNode, parentDOM, dom, context, isSVG, isClass, lifecycle, animations) {
  const type = vNode.type;
  const ref = vNode.ref;
  const props = vNode.props || EMPTY_OBJ;
  let currentNode;
  if (isClass) {
    const instance = createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
    const input = instance.$LI;
    currentNode = hydrateVNode(input, parentDOM, dom, instance.$CX, isSVG, lifecycle, animations);
    mountClassComponentCallbacks(ref, instance, lifecycle, animations);
  } else {
    const input = normalizeRoot(renderFunctionalComponent(vNode, context));
    currentNode = hydrateVNode(input, parentDOM, dom, context, isSVG, lifecycle, animations);
    vNode.children = input;
    mountFunctionalComponentCallbacks(vNode, lifecycle, animations);
  }
  return currentNode;
}
function hydrateChildren(parentVNode, parentNode, currentNode, context, isSVG, lifecycle, animations) {
  const childFlags = parentVNode.childFlags;
  const children = parentVNode.children;
  const props = parentVNode.props;
  const flags = parentVNode.flags;
  if (childFlags !== ChildFlags.HasInvalidChildren) {
    if (childFlags === ChildFlags.HasVNodeChildren) {
      if (isNull2(currentNode)) {
        mount(children, parentNode, context, isSVG, null, lifecycle, animations);
      } else {
        currentNode = hydrateVNode(children, parentNode, currentNode, context, isSVG, lifecycle, animations);
        currentNode = currentNode ? currentNode.nextSibling : null;
      }
    } else if (childFlags === ChildFlags.HasTextChildren) {
      if (isNull2(currentNode)) {
        parentNode.appendChild(document.createTextNode(children));
      } else if (1 !== parentNode.childNodes.length || 3 !== currentNode.nodeType) {
        parentNode.textContent = children;
      } else if (currentNode.nodeValue !== children) {
        currentNode.nodeValue = children;
      }
      currentNode = null;
    } else if (childFlags & ChildFlags.MultipleChildren) {
      let prevVNodeIsTextNode = false;
      for (let i = 0, len = children.length; i < len; ++i) {
        const child = children[i];
        if (isNull2(currentNode) || prevVNodeIsTextNode && (child.flags & VNodeFlags.Text) > 0) {
          mount(child, parentNode, context, isSVG, currentNode, lifecycle, animations);
        } else {
          currentNode = hydrateVNode(child, parentNode, currentNode, context, isSVG, lifecycle, animations);
          currentNode = currentNode ? currentNode.nextSibling : null;
        }
        prevVNodeIsTextNode = (child.flags & VNodeFlags.Text) > 0;
      }
    }
    if (0 === (flags & VNodeFlags.Fragment)) {
      let nextSibling = null;
      while (currentNode) {
        nextSibling = currentNode.nextSibling;
        parentNode.removeChild(currentNode);
        currentNode = nextSibling;
      }
    }
  } else if (!isNull2(parentNode.firstChild) && !isSamePropsInnerHTML(parentNode, props)) {
    parentNode.textContent = "";
    if (flags & VNodeFlags.FormElement) {
      parentNode.defaultValue = "";
    }
  }
}
function hydrateElement(vNode, parentDOM, dom, context, isSVG, lifecycle, animations) {
  const props = vNode.props;
  const className = vNode.className;
  const flags = vNode.flags;
  const ref = vNode.ref;
  isSVG = isSVG || (flags & VNodeFlags.SvgElement) > 0;
  if (1 !== dom.nodeType) {
    mountElement(vNode, null, context, isSVG, null, lifecycle, animations);
    parentDOM.replaceChild(vNode.dom, dom);
  } else {
    vNode.dom = dom;
    hydrateChildren(vNode, dom, dom.firstChild, context, isSVG, lifecycle, animations);
    if (!isNull2(props)) {
      mountProps(vNode, flags, props, dom, isSVG, animations);
    }
    if (isNullOrUndef2(className)) {
      if ("" !== dom.className) {
        dom.removeAttribute("class");
      }
    } else if (isSVG) {
      dom.setAttribute("class", className);
    } else {
      dom.className = className;
    }
    mountRef(ref, dom, lifecycle);
  }
  return vNode.dom;
}
function hydrateText(vNode, parentDOM, dom) {
  if (3 !== dom.nodeType) {
    parentDOM.replaceChild(vNode.dom = document.createTextNode(vNode.children), dom);
  } else {
    const text = vNode.children;
    if (dom.nodeValue !== text) {
      dom.nodeValue = text;
    }
    vNode.dom = dom;
  }
  return vNode.dom;
}
function hydrateFragment(vNode, parentDOM, dom, context, isSVG, lifecycle, animations) {
  const children = vNode.children;
  if (vNode.childFlags === ChildFlags.HasVNodeChildren) {
    hydrateText(children, parentDOM, dom);
    return children.dom;
  }
  hydrateChildren(vNode, parentDOM, dom, context, isSVG, lifecycle, animations);
  return findLastDOMFromVNode(children[children.length - 1]);
}
function hydrateVNode(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations) {
  const flags = vNode.flags |= VNodeFlags.InUse;
  if (flags & VNodeFlags.Component) {
    return hydrateComponent(vNode, parentDOM, currentDom, context, isSVG, (flags & VNodeFlags.ComponentClass) > 0, lifecycle, animations);
  }
  if (flags & VNodeFlags.Element) {
    return hydrateElement(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations);
  }
  if (flags & VNodeFlags.Text) {
    return hydrateText(vNode, parentDOM, currentDom);
  }
  if (flags & VNodeFlags.Void) {
    return vNode.dom = currentDom;
  }
  if (flags & VNodeFlags.Fragment) {
    return hydrateFragment(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations);
  }
  throwError();
  return null;
}
function hydrate(input, parentDOM, callback) {
  let dom = parentDOM.firstChild;
  if (isNull2(dom)) {
    render(input, parentDOM, callback);
  } else {
    const lifecycle = [];
    const animations = new AnimationQueues();
    if (!isInvalid2(input)) {
      dom = hydrateVNode(input, parentDOM, dom, {}, false, lifecycle, animations);
    }
    while (dom && (dom = dom.nextSibling)) {
      parentDOM.removeChild(dom);
    }
    if (lifecycle.length > 0) {
      let listener;
      while (void 0 !== (listener = lifecycle.shift())) {
        listener();
      }
    }
  }
  parentDOM.$V = input;
  if (isFunction3(callback)) {
    callback();
  }
}

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/normalize_styles.js
var NUMBER_STYLES = /* @__PURE__ */ new Set(["animationIterationCount", "borderImageOutset", "borderImageSlice", "border-imageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "fillOpacity", "flex", "flexGrow", "flexNegative", "flexOrder", "flexPositive", "flexShrink", "floodOpacity", "fontWeight", "gridColumn", "gridRow", "lineClamp", "lineHeight", "opacity", "order", "orphans", "stopOpacity", "strokeDasharray", "strokeDashoffset", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "tabSize", "widows", "zIndex", "zoom"]);
var isNumeric2 = (value) => {
  if ("number" === typeof value) {
    return true;
  }
  return !Number.isNaN(Number(value));
};
var getNumberStyleValue = (style, value) => NUMBER_STYLES.has(style) ? value : `${value}px`;
var uppercasePattern = /[A-Z]/g;
var kebabCase = (str) => str.replace(uppercasePattern, "-$&").toLowerCase();
function normalizeStyles(styles) {
  if (!(styles instanceof Object)) {
    return;
  }
  return Object.entries(styles).reduce(((acc, _ref) => {
    let [key, value] = _ref;
    acc[kebabCase(key)] = isNumeric2(value) ? getNumberStyleValue(key, value) : value;
    return acc;
  }), {});
}

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/re_render_effect.js
var createReRenderEffect = () => new InfernoEffect((() => {
  rerender();
}), []);

// node_modules/inferno-create-element/dist/index.esm.js
function isNullOrUndef3(o) {
  return o === void 0 || o === null;
}
function isString3(o) {
  return typeof o === "string";
}
function isUndefined2(o) {
  return o === void 0;
}
var componentHooks = {
  onComponentDidAppear: 1,
  onComponentDidMount: 1,
  onComponentDidUpdate: 1,
  onComponentShouldUpdate: 1,
  onComponentWillDisappear: 1,
  onComponentWillMount: 1,
  onComponentWillUnmount: 1,
  onComponentWillUpdate: 1
};
function createElement(type, props, _children) {
  var children;
  var ref = null;
  var key = null;
  var className = null;
  var flags;
  var newProps;
  var childLen = arguments.length - 2;
  if (childLen === 1) {
    children = _children;
  } else if (childLen > 1) {
    children = [];
    while (childLen-- > 0) {
      children[childLen] = arguments[childLen + 2];
    }
  }
  if (isString3(type)) {
    flags = getFlagsForElementVnode(type);
    if (!isNullOrUndef3(props)) {
      newProps = {};
      for (var prop in props) {
        if (prop === "className" || prop === "class") {
          className = props[prop];
        } else if (prop === "key") {
          key = props.key;
        } else if (prop === "children" && isUndefined2(children)) {
          children = props.children;
        } else if (prop === "ref") {
          ref = props.ref;
        } else {
          if (prop === "contenteditable") {
            flags |= 4096;
          }
          newProps[prop] = props[prop];
        }
      }
    }
  } else {
    flags = 2;
    if (!isUndefined2(children)) {
      if (!props) {
        props = {};
      }
      props.children = children;
    }
    if (!isNullOrUndef3(props)) {
      newProps = {};
      for (var _prop in props) {
        if (_prop === "key") {
          key = props.key;
        } else if (_prop === "ref") {
          ref = props.ref;
        } else if (componentHooks[_prop] === 1) {
          if (!ref) {
            ref = {};
          }
          ref[_prop] = props[_prop];
        } else {
          newProps[_prop] = props[_prop];
        }
      }
    }
    return createComponentVNode(flags, type, newProps, key, ref);
  }
  if (flags & 8192) {
    return createFragment(childLen === 1 ? [children] : children, 0, key);
  }
  return createVNode(flags, type, className, children, 0, newProps, key, ref);
}

// node_modules/devextreme/esm/__internal/core/r1/runtime/inferno/render_template.js
var getContainer = (props) => {
  var _props$container, _props$item;
  return (null === (_props$container = props.container) || void 0 === _props$container ? void 0 : _props$container.get(0)) || (null === (_props$item = props.item) || void 0 === _props$item ? void 0 : _props$item.get(0));
};
function renderTemplate(template, props, _component) {
  setTimeout((() => {
    render(createElement(template, props), getContainer(props));
  }), 0);
}
var hasTemplate = (name, properties, _component) => {
  const value = properties[name];
  return !!value && "string" !== typeof value;
};

// node_modules/devextreme/esm/__internal/core/m_inferno_renderer.js
var remove2 = (element) => {
  const {
    parentNode
  } = element;
  if (parentNode) {
    const {
      nextSibling
    } = element;
    cleanDataRecursive(element);
    parentNode.$V = element.$V;
    render(null, parentNode);
    parentNode.insertBefore(element, nextSibling);
    element.innerHTML = "";
    delete parentNode.$V;
  }
  delete element.$V;
};
var infernoRenderer = dependency_injector_default({
  createElement: (component, props) => createElement(component, props),
  remove: remove2,
  onAfterRender: () => {
    InfernoEffectHost.callEffects();
  },
  onPreRender: () => {
    InfernoEffectHost.lock();
  },
  render: (component, props, container, replace) => {
    if (!replace) {
      const {
        parentNode
      } = container;
      const nextNode = null === container || void 0 === container ? void 0 : container.nextSibling;
      const rootNode = dom_adapter_default.createElement("div");
      rootNode.appendChild(container);
      const mountNode = dom_adapter_default.createDocumentFragment().appendChild(rootNode);
      const vNodeAlreadyExists = !!container.$V;
      vNodeAlreadyExists && remove2(container);
      hydrate(createElement(component, props), mountNode);
      container.$V = mountNode.$V;
      if (parentNode) {
        parentNode.insertBefore(container, nextNode);
      }
    } else {
      render(createElement(component, props), container);
    }
  },
  renderIntoContainer: (jsx, container, replace) => {
    if (!replace) {
      hydrate(jsx, container);
    } else {
      render(jsx, container);
    }
  }
});

// node_modules/devextreme/esm/core/inferno_renderer.js
var inferno_renderer_default = infernoRenderer;

// node_modules/devextreme/esm/__internal/core/r1/utils/shallow_equals.js
var shallowEquals = (firstObject, secondObject) => {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }
  return Object.entries(firstObject).every(((_ref) => {
    let [key, firstValue] = _ref;
    const secondValue = secondObject[key];
    if (firstValue instanceof Date && secondValue instanceof Date) {
      return firstValue.getTime() === secondValue.getTime();
    }
    return firstValue === secondValue;
  }));
};

// node_modules/devextreme/esm/__internal/core/r1/template_wrapper.js
var _excluded = ["isEqual"];
var isDxElementWrapper = (element) => !!element.toArray;
var buildTemplateArgs = (model, template) => {
  const args = {
    template,
    model: _extends({}, model)
  };
  const _ref = model.data ?? {}, {
    isEqual
  } = _ref, data = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (isEqual) {
    args.model.data = data;
    args.isEqual = isEqual;
  }
  return args;
};
var renderTemplateContent = (props, container) => {
  const {
    data,
    index
  } = props.model ?? {
    data: {}
  };
  if (data) {
    Object.keys(data).forEach(((name) => {
      if (data[name] && dom_adapter_default.isNode(data[name])) {
        data[name] = getPublicElement(renderer_default(data[name]));
      }
    }));
  }
  const rendered = props.template.render(_extends({
    container,
    transclude: props.transclude
  }, {
    renovated: props.renovated
  }, !props.transclude ? {
    model: data
  } : {}, !props.transclude && Number.isFinite(index) ? {
    index
  } : {}));
  if (void 0 === rendered) {
    return [];
  }
  return isDxElementWrapper(rendered) ? rendered.toArray() : [renderer_default(rendered).get(0)];
};
var removeDifferentElements = (oldChildren, newChildren) => {
  newChildren.forEach(((newElement) => {
    const hasOldChild = !!oldChildren.find(((oldElement) => newElement === oldElement));
    if (!hasOldChild && newElement.parentNode) {
      renderer_default(newElement).remove();
    }
  }));
};
var TemplateWrapper = class extends InfernoComponent {
  constructor(props) {
    super(props);
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  renderTemplate() {
    const node = findDOMFromVNode(this.$LI, true);
    if (!(null !== node && void 0 !== node && node.parentNode)) {
      return () => {
      };
    }
    const container = node.parentNode;
    const $container = renderer_default(container);
    const $oldContainerContent = $container.contents().toArray();
    const content = renderTemplateContent(this.props, getPublicElement($container));
    replaceWith(renderer_default(node), renderer_default(content));
    return () => {
      const $actualContainerContent = renderer_default(container).contents().toArray();
      removeDifferentElements($oldContainerContent, $actualContainerContent);
      container.appendChild(node);
    };
  }
  shouldComponentUpdate(nextProps) {
    const {
      template,
      model
    } = this.props;
    const {
      template: nextTemplate,
      model: nextModel,
      isEqual
    } = nextProps;
    const equalityComparer = isEqual ?? shallowEquals;
    if (template !== nextTemplate) {
      return true;
    }
    if (!isDefined(model) || !isDefined(nextModel)) {
      return model !== nextModel;
    }
    const {
      data,
      index
    } = model;
    const {
      data: nextData,
      index: nextIndex
    } = nextModel;
    if (index !== nextIndex) {
      return true;
    }
    if (!isDefined(data) || !isDefined(nextData)) {
      return model !== nextModel;
    }
    return !equalityComparer(data, nextData);
  }
  createEffects() {
    return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  }
  updateEffects() {
    this._effects[0].update([this.props.template, this.props.model]);
  }
  componentWillUnmount() {
  }
  render() {
    return null;
  }
};

// node_modules/devextreme/esm/__internal/core/r1/utils/get_template.js
var getTemplate = (TemplateProp) => TemplateProp && (TemplateProp.defaultProps ? (props) => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

// node_modules/devextreme/esm/__internal/core/r1/utils/update_props_immutable.js
var cloneObjectValue = (value) => Array.isArray(value) ? [...value] : _extends({}, value);
var cloneObjectProp = (value, prevValue, fullNameParts) => {
  const result2 = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
  const name = fullNameParts[0];
  if (fullNameParts.length > 1) {
    result2[name] = cloneObjectProp(value[name], null === prevValue || void 0 === prevValue ? void 0 : prevValue[name], fullNameParts.slice(1));
  } else if (name) {
    if (isPlainObject(value[name])) {
      result2[name] = cloneObjectValue(value[name]);
    } else {
      result2[name] = value[name];
    }
  }
  return result2;
};
var updatePropsImmutable = (props, option, name, fullName) => {
  const currentPropsValue = option[name];
  const prevPropsValue = props[name];
  const result2 = props;
  if (isPlainObject(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
    result2[name] = cloneObjectProp(currentPropsValue, prevPropsValue, getPathParts(fullName).slice(1));
  } else {
    result2[name] = currentPropsValue;
  }
};

// node_modules/devextreme/esm/__internal/core/r1/component_wrapper.js
var setDefaultOptionValue = (options2, defaultValueGetter) => (name) => {
  if (Object.prototype.hasOwnProperty.call(options2, name) && void 0 === options2[name]) {
    options2[name] = defaultValueGetter(name);
  }
};
var ComponentWrapper = class extends dom_component_default2 {
  get _propsInfo() {
    return {
      allowNull: [],
      twoWay: [],
      elements: [],
      templates: [],
      props: []
    };
  }
  constructor(element, options2) {
    super(element, options2);
    this._shouldRaiseContentReady = false;
    this.validateKeyDownHandler();
  }
  validateKeyDownHandler() {
    const supportedKeyNames = this.getSupportedKeyNames();
    const hasComponentDefaultKeyHandlers = supportedKeyNames.length > 0;
    const hasComponentKeyDownMethod = "function" === typeof this._viewComponent.prototype.keyDown;
    if (hasComponentDefaultKeyHandlers && !hasComponentKeyDownMethod) {
      throw Error("Component's declaration must have 'keyDown' method.");
    }
  }
  get viewRef() {
    var _this$_viewRef;
    return null === (_this$_viewRef = this._viewRef) || void 0 === _this$_viewRef ? void 0 : _this$_viewRef.current;
  }
  _checkContentReadyOption(fullName) {
    const contentReadyOptions = this._getContentReadyOptions().reduce(((options2, name) => {
      options2[name] = true;
      return options2;
    }), {});
    this._checkContentReadyOption = (optionName) => !!contentReadyOptions[optionName];
    return this._checkContentReadyOption(fullName);
  }
  _getContentReadyOptions() {
    return ["rtlEnabled"];
  }
  _fireContentReady() {
    this._actionsMap.onContentReady({});
  }
  _getDefaultOptions() {
    const viewDefaultProps = this._getViewComponentDefaultProps();
    return extend(true, super._getDefaultOptions(), viewDefaultProps, this._propsInfo.twoWay.reduce(((options2, _ref) => {
      let [name, defaultName, eventName] = _ref;
      return _extends({}, options2, {
        [name]: viewDefaultProps[defaultName],
        [eventName]: (value) => this.option(name, value)
      });
    }), {}), this._propsInfo.templates.reduce(((options2, name) => _extends({}, options2, {
      [name]: null
    })), {}));
  }
  _getUnwrappedOption() {
    const unwrappedProps = {};
    Object.keys(this.option()).forEach(((key) => {
      unwrappedProps[key] = this.option(key);
    }));
    return unwrappedProps;
  }
  _initializeComponent() {
    var _this$_templateManage;
    super._initializeComponent();
    null === (_this$_templateManage = this._templateManager) || void 0 === _this$_templateManage || _this$_templateManage.addDefaultTemplates(this.getDefaultTemplates());
    const optionProxy = this._getUnwrappedOption();
    this._props = this._optionsWithDefaultTemplates(optionProxy);
    this._propsInfo.templates.forEach(((template) => {
      this._componentTemplates[template] = this._createTemplateComponent(this._props[template]);
    }));
    Object.keys(this._getActionConfigsFull()).forEach(((name) => this._addAction(name)));
    this._viewRef = createRef();
    this.defaultKeyHandlers = this._createDefaultKeyHandlers();
  }
  _initMarkup() {
    const props = this.getProps();
    this._renderWrapper(props);
  }
  _renderWrapper(props) {
    const containerNode = this.$element()[0];
    if (!this._isNodeReplaced) {
      inferno_renderer_default.onPreRender();
    }
    inferno_renderer_default.render(this._viewComponent, props, containerNode, this._isNodeReplaced);
    if (!this._isNodeReplaced) {
      this._isNodeReplaced = true;
      inferno_renderer_default.onAfterRender();
      this._shouldRaiseContentReady = true;
    }
    if (this._shouldRaiseContentReady) {
      this._fireContentReady();
      this._shouldRaiseContentReady = false;
    }
  }
  _silent(name, value) {
    this._options.silent(name, value);
  }
  _render() {
  }
  _removeWidget() {
    inferno_renderer_default.remove(this.$element()[0]);
  }
  _dispose() {
    this._removeWidget();
    super._dispose();
  }
  get elementAttr() {
    const element = this.$element()[0];
    if (!this._elementAttr) {
      const {
        attributes
      } = element;
      const attrs = Array.from(attributes).filter(((attr) => {
        var _attributes$attr$name;
        return !this._propsInfo.templates.includes(attr.name) && (null === (_attributes$attr$name = attributes[attr.name]) || void 0 === _attributes$attr$name ? void 0 : _attributes$attr$name.specified);
      })).reduce(((result2, _ref2) => {
        let {
          name,
          value
        } = _ref2;
        const updatedAttributes = result2;
        const isDomAttr = name in element;
        updatedAttributes[name] = "" === value && isDomAttr ? element[name] : value;
        return updatedAttributes;
      }), {});
      this._elementAttr = attrs;
      this._storedClasses = element.getAttribute("class") || "";
    }
    const elemStyle = element.style;
    const style = {};
    for (let i = 0; i < elemStyle.length; i += 1) {
      style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i]);
    }
    this._elementAttr.style = style;
    this._elementAttr.class = this._storedClasses;
    return this._elementAttr;
  }
  _getAdditionalActionConfigs() {
    return {
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  }
  _getAdditionalProps() {
    return [];
  }
  _patchOptionValues(options2) {
    const {
      allowNull,
      twoWay,
      elements,
      props
    } = this._propsInfo;
    const viewDefaultProps = this._getViewComponentDefaultProps();
    const defaultWidgetPropsKeys = Object.keys(viewDefaultProps);
    const defaultOptions2 = this._getDefaultOptions();
    const {
      ref,
      children,
      onKeyboardHandled
    } = options2;
    const onKeyDown = onKeyboardHandled ? (_, event_options) => {
      onKeyboardHandled(event_options);
    } : void 0;
    const widgetProps = {
      ref,
      children,
      onKeyDown
    };
    [...props, ...this._getAdditionalProps()].forEach(((propName) => {
      if (Object.prototype.hasOwnProperty.call(options2, propName)) {
        widgetProps[propName] = options2[propName];
      }
    }));
    allowNull.forEach(setDefaultOptionValue(widgetProps, (() => null)));
    defaultWidgetPropsKeys.forEach(setDefaultOptionValue(widgetProps, ((name) => defaultOptions2[name])));
    twoWay.forEach(((_ref3) => {
      let [name, defaultName] = _ref3;
      setDefaultOptionValue(widgetProps, (() => defaultOptions2[defaultName]))(name);
    }));
    elements.forEach(((name) => {
      if (name in widgetProps) {
        const value = widgetProps[name];
        if (isRenderer(value)) {
          widgetProps[name] = this._patchElementParam(value);
        }
      }
    }));
    return widgetProps;
  }
  getSupportedKeyNames() {
    return [];
  }
  prepareStyleProp(props) {
    if ("string" === typeof props.style) {
      return _extends({}, props, {
        style: {},
        cssText: props.style
      });
    }
    return props;
  }
  getProps() {
    const {
      elementAttr
    } = this.option();
    const options2 = this._patchOptionValues(_extends({}, this._props, {
      ref: this._viewRef,
      children: this._extractDefaultSlot(),
      aria: this._aria
    }));
    this._propsInfo.templates.forEach(((template) => {
      options2[template] = this._componentTemplates[template];
    }));
    return this.prepareStyleProp(_extends({}, options2, this.elementAttr, elementAttr, {
      className: [...(this.elementAttr.class ?? "").split(" "), ...((null === elementAttr || void 0 === elementAttr ? void 0 : elementAttr.class) ?? "").split(" ")].filter(((c, i, a) => c && a.indexOf(c) === i)).join(" ").trim(),
      class: ""
    }, this._actionsMap));
  }
  _getActionConfigs() {
    return {};
  }
  _getActionConfigsFull() {
    return _extends({}, this._getActionConfigs(), this._getAdditionalActionConfigs());
  }
  getDefaultTemplates() {
    const defaultTemplates = Object.values(this._templatesInfo);
    const result2 = {};
    defaultTemplates.forEach(((template) => {
      result2[template] = "dx-renovation-template-mock";
    }));
    return result2;
  }
  get _templatesInfo() {
    return {};
  }
  _optionsWithDefaultTemplates(options2) {
    const templateOptions = Object.entries(this._templatesInfo).reduce(((result2, _ref4) => {
      let [templateName, templateValue] = _ref4;
      return _extends({}, result2, {
        [templateName]: options2[templateName] ?? templateValue
      });
    }), {});
    return _extends({}, options2, templateOptions);
  }
  _init() {
    super._init();
    this.customKeyHandlers = {};
    this._actionsMap = {};
    this._aria = {};
    this._componentTemplates = {};
  }
  _createDefaultKeyHandlers() {
    const result2 = {};
    const keys = this.getSupportedKeyNames();
    keys.forEach(((key) => {
      result2[key] = (e) => this.viewRef.keyDown(m_keyboard_processor_default.createKeyDownOptions(e));
    }));
    return result2;
  }
  _addAction(event, actionToAdd) {
    let action = actionToAdd;
    if (!action) {
      const actionByOption = this._createActionByOption(event, this._getActionConfigsFull()[event]);
      action = (actArgs) => {
        Object.keys(actArgs).forEach(((name) => {
          if (isDefined(actArgs[name]) && dom_adapter_default.isNode(actArgs[name])) {
            actArgs[name] = getPublicElement(renderer_default(actArgs[name]));
          }
        }));
        return actionByOption(actArgs);
      };
    }
    this._actionsMap[event] = action;
  }
  _optionChanged(option) {
    const {
      name,
      fullName,
      value,
      previousValue
    } = option;
    updatePropsImmutable(this._props, this.option(), name, fullName);
    if (this._propsInfo.templates.includes(name) && value !== previousValue) {
      this._componentTemplates[name] = this._createTemplateComponent(value);
    }
    if (name && this._getActionConfigsFull()[name]) {
      this._addAction(name);
    }
    this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(fullName);
    super._optionChanged(option);
    this._invalidate();
  }
  _validateOptions(options2) {
    return super._validateOptions(options2);
  }
  _extractDefaultSlot() {
    if (this.option("_hasAnonymousTemplateContent")) {
      return inferno_renderer_default.createElement(TemplateWrapper, {
        template: this._getTemplate(this._templateManager.anonymousTemplateName),
        transclude: true,
        renovated: true
      });
    }
    return null;
  }
  _createTemplateComponent(templateOption) {
    if (!templateOption) {
      return;
    }
    const template = this._getTemplate(templateOption);
    if (isString(template) && "dx-renovation-template-mock" === template) {
      return;
    }
    return (model) => inferno_renderer_default.createElement(TemplateWrapper, buildTemplateArgs(model, template));
  }
  _wrapKeyDownHandler(initialHandler) {
    return (options2) => {
      const {
        originalEvent,
        keyName,
        which
      } = options2;
      const keys = this.customKeyHandlers;
      const func = keys[keyName] || keys[which];
      if (void 0 !== func) {
        const handler = func.bind(this);
        const result2 = handler(originalEvent, options2);
        if (!result2) {
          originalEvent.cancel = true;
          return originalEvent;
        }
      }
      return null === initialHandler || void 0 === initialHandler ? void 0 : initialHandler(originalEvent, options2);
    };
  }
  _toPublicElement(element) {
    return getPublicElement(renderer_default(element));
  }
  _patchElementParam(value) {
    try {
      const result2 = renderer_default(value);
      const element = null === result2 || void 0 === result2 ? void 0 : result2.get(0);
      return null !== element && void 0 !== element && element.nodeType ? element : value;
    } catch (error) {
      return value;
    }
  }
  focus() {
    const $root = this.$element();
    const hasFocus = $root.is(":focus") || $root.find(":focus").length > 0;
    if (hasFocus) {
      return;
    }
    if (this.option("focusStateEnabled")) {
      $root.focus();
    } else {
      var _focusableElements$;
      const focusableElements = $root.find("[tabindex]");
      null === (_focusableElements$ = focusableElements[0]) || void 0 === _focusableElements$ || _focusableElements$.focus();
    }
  }
  repaint() {
    this._isNodeReplaced = false;
    this._shouldRaiseContentReady = true;
    this._removeWidget();
    this._refresh();
  }
  _supportedKeys() {
    return _extends({}, this.defaultKeyHandlers, this.customKeyHandlers);
  }
  registerKeyHandler(key, handler) {
    this.customKeyHandlers[key] = handler;
  }
  setAria(name, value) {
    this._aria[name] = value;
    this._initMarkup();
  }
  _getViewComponentDefaultProps() {
    return this._viewComponent.defaultProps || {};
  }
};
ComponentWrapper.IS_RENOVATED_WIDGET = false;
ComponentWrapper.IS_RENOVATED_WIDGET = true;

// node_modules/devextreme/esm/__internal/core/r1/base_props.js
var BaseWidgetDefaultProps = {
  className: "",
  activeStateEnabled: false,
  disabled: false,
  focusStateEnabled: false,
  hoverStateEnabled: false,
  tabIndex: 0,
  visible: true
};

// node_modules/devextreme/esm/__internal/core/r1/config_context.js
var ConfigContext = createContext(void 0);

// node_modules/devextreme/esm/__internal/core/r1/config_provider.js
var ConfigProviderDefaultProps = {};
var ConfigProvider = class extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.__getterCache = {};
  }
  get config() {
    if (void 0 !== this.__getterCache.config) {
      return this.__getterCache.config;
    }
    return this.__getterCache.config = (() => ({
      rtlEnabled: this.props.rtlEnabled
    }))();
  }
  componentWillUpdate(nextProps) {
    if (this.props.rtlEnabled !== nextProps.rtlEnabled) {
      this.__getterCache.config = void 0;
    }
  }
  getChildContext() {
    return _extends({}, this.context, {
      [ConfigContext.id]: this.config || ConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
};
ConfigProvider.defaultProps = ConfigProviderDefaultProps;

// node_modules/devextreme/esm/__internal/core/r1/utils/render_utils.js
var combineClasses = (classesMap) => Object.keys(classesMap).filter(((cssClass) => !!cssClass && classesMap[cssClass])).join(" ").split(" ").filter(((cssClass, i, filteredClassesMap) => filteredClassesMap.indexOf(cssClass) === i)).join(" ");

// node_modules/devextreme/esm/__internal/core/r1/utils/resolve_rtl.js
function resolveRtlEnabled(rtlProp, config) {
  if (void 0 !== rtlProp) {
    return rtlProp;
  }
  if (void 0 !== (null === config || void 0 === config ? void 0 : config.rtlEnabled)) {
    return config.rtlEnabled;
  }
  return config_default().rtlEnabled;
}
function resolveRtlEnabledDefinition(rtlProp, config) {
  const isPropDefined = isDefined(rtlProp);
  const onlyGlobalDefined = isDefined(config_default().rtlEnabled) && !isPropDefined && !isDefined(null === config || void 0 === config ? void 0 : config.rtlEnabled);
  return isPropDefined && rtlProp !== (null === config || void 0 === config ? void 0 : config.rtlEnabled) || onlyGlobalDefined;
}

// node_modules/devextreme/esm/__internal/core/r1/utils/subscribe_to_event.js
function subscribeToEvent(eventName) {
  return (element, handler, eventData, namespace) => {
    const event = namespace ? addNamespace(eventName, namespace) : eventName;
    if (handler) {
      m_events_engine_default.on(element, event, eventData, handler);
      return () => {
        m_events_engine_default.off(element, event, handler);
      };
    }
    return;
  };
}
var subscribeToClickEvent = subscribeToEvent(CLICK_EVENT_NAME);
var subscribeToScrollEvent = subscribeToEvent(m_emitter_gesture_scroll_default.scroll);
var subscribeToScrollInitEvent = subscribeToEvent(m_emitter_gesture_scroll_default.init);
var subscribeToDXScrollStartEvent = subscribeToEvent(m_emitter_gesture_scroll_default.start);
var subscribeToDXScrollMoveEvent = subscribeToEvent(m_emitter_gesture_scroll_default.move);
var subscribeToDXScrollEndEvent = subscribeToEvent(m_emitter_gesture_scroll_default.end);
var subscribeToDXScrollStopEvent = subscribeToEvent(m_emitter_gesture_scroll_default.stop);
var subscribeToDXScrollCancelEvent = subscribeToEvent(m_emitter_gesture_scroll_default.cancel);
var subscribeToDXPointerDownEvent = subscribeToEvent(m_pointer_default.down);
var subscribeToDXPointerUpEvent = subscribeToEvent(m_pointer_default.up);
var subscribeToDXPointerMoveEvent = subscribeToEvent(m_pointer_default.move);
var subscribeToMouseEnterEvent = subscribeToEvent("mouseenter");
var subscribeToMouseLeaveEvent = subscribeToEvent("mouseleave");
var subscribeToKeyDownEvent = subscribeToEvent("keydown");
var subscribeToDxActiveEvent = subscribeToEvent("dxactive");
var subscribeToDxInactiveEvent = subscribeToEvent("dxinactive");
var subscribeToDxHoverStartEvent = subscribeToEvent("dxhoverstart");
var subscribeToDxHoverEndEvent = subscribeToEvent("dxhoverend");
var subscribeToDxFocusInEvent = subscribeToEvent("focusin");
var subscribeToDxFocusOutEvent = subscribeToEvent("focusout");

// node_modules/devextreme/esm/__internal/core/r1/widget.js
var WIDGET_CLASS = "dx-widget";
var getAria = (args) => Object.keys(args).reduce(((r, key) => {
  if (args[key]) {
    return _extends({}, r, {
      ["role" === key || "id" === key ? key : `aria-${key}`]: String(args[key])
    });
  }
  return r;
}), {});
var WidgetDefaultProps = _extends({}, BaseWidgetDefaultProps, {
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  cssText: "",
  aria: {},
  classes: "",
  name: "",
  addWidgetClass: true
});
var Widget = class extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      focused: false,
      hovered: false
    };
    this.refs = null;
    this.rootElementRef = createRef();
    this.widgetElementRef = createRef();
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.activeEffect = this.activeEffect.bind(this);
    this.inactiveEffect = this.inactiveEffect.bind(this);
    this.clickEffect = this.clickEffect.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.focusInEffect = this.focusInEffect.bind(this);
    this.focusOutEffect = this.focusOutEffect.bind(this);
    this.hoverStartEffect = this.hoverStartEffect.bind(this);
    this.hoverEndEffect = this.hoverEndEffect.bind(this);
    this.keyboardEffect = this.keyboardEffect.bind(this);
    this.resizeEffect = this.resizeEffect.bind(this);
    this.windowResizeEffect = this.windowResizeEffect.bind(this);
    this.visibilityEffect = this.visibilityEffect.bind(this);
    this.checkDeprecation = this.checkDeprecation.bind(this);
    this.applyCssTextEffect = this.applyCssTextEffect.bind(this);
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  getConfig() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.setRootElementRef, []), new InfernoEffect(this.activeEffect, [this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]), new InfernoEffect(this.inactiveEffect, [this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]), new InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new InfernoEffect(this.focusInEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]), new InfernoEffect(this.focusOutEffect, [this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]), new InfernoEffect(this.hoverStartEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]), new InfernoEffect(this.hoverEndEffect, [this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]), new InfernoEffect(this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), new InfernoEffect(this.checkDeprecation, [this.props.height, this.props.width]), new InfernoEffect(this.applyCssTextEffect, [this.props.cssText]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12, _this$_effects$13;
    null === (_this$_effects$ = this._effects[1]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]);
    null === (_this$_effects$2 = this._effects[2]) || void 0 === _this$_effects$2 || _this$_effects$2.update([this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]);
    null === (_this$_effects$3 = this._effects[3]) || void 0 === _this$_effects$3 || _this$_effects$3.update([this.props.disabled, this.props.name, this.props.onClick]);
    null === (_this$_effects$4 = this._effects[4]) || void 0 === _this$_effects$4 || _this$_effects$4.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]);
    null === (_this$_effects$5 = this._effects[5]) || void 0 === _this$_effects$5 || _this$_effects$5.update([this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]);
    null === (_this$_effects$6 = this._effects[6]) || void 0 === _this$_effects$6 || _this$_effects$6.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]);
    null === (_this$_effects$7 = this._effects[7]) || void 0 === _this$_effects$7 || _this$_effects$7.update([this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]);
    null === (_this$_effects$8 = this._effects[8]) || void 0 === _this$_effects$8 || _this$_effects$8.update([this.props.focusStateEnabled, this.props.onKeyDown]);
    null === (_this$_effects$9 = this._effects[9]) || void 0 === _this$_effects$9 || _this$_effects$9.update([this.props.name, this.props.onDimensionChanged]);
    null === (_this$_effects$10 = this._effects[10]) || void 0 === _this$_effects$10 || _this$_effects$10.update([this.props.onDimensionChanged]);
    null === (_this$_effects$11 = this._effects[11]) || void 0 === _this$_effects$11 || _this$_effects$11.update([this.props.name, this.props.onVisibilityChange]);
    null === (_this$_effects$12 = this._effects[12]) || void 0 === _this$_effects$12 || _this$_effects$12.update([this.props.height, this.props.width]);
    null === (_this$_effects$13 = this._effects[13]) || void 0 === _this$_effects$13 || _this$_effects$13.update([this.props.cssText]);
  }
  setRootElementRef() {
    var _this$widgetElementRe;
    const {
      rootElementRef,
      onRootElementRendered
    } = this.props;
    if (rootElementRef && this.widgetElementRef) {
      rootElementRef.current = this.widgetElementRef.current;
    }
    if (null !== this && void 0 !== this && null !== (_this$widgetElementRe = this.widgetElementRef) && void 0 !== _this$widgetElementRe && _this$widgetElementRe.current) {
      null === onRootElementRendered || void 0 === onRootElementRendered || onRootElementRendered(this.widgetElementRef.current);
    }
  }
  activeEffect() {
    const {
      activeStateEnabled,
      activeStateUnit,
      disabled,
      _feedbackShowTimeout,
      onActive
    } = this.props;
    const selector = activeStateUnit;
    if (activeStateEnabled) {
      if (!disabled) {
        var _this$widgetElementRe2;
        return subscribeToDxActiveEvent(null === (_this$widgetElementRe2 = this.widgetElementRef) || void 0 === _this$widgetElementRe2 ? void 0 : _this$widgetElementRe2.current, ((event) => {
          this.setState({
            active: true
          });
          null === onActive || void 0 === onActive || onActive(event);
        }), {
          timeout: _feedbackShowTimeout,
          selector
        }, "UIFeedback");
      }
    }
    return;
  }
  inactiveEffect() {
    const {
      activeStateEnabled,
      activeStateUnit,
      _feedbackHideTimeout,
      onInactive
    } = this.props;
    const selector = activeStateUnit;
    if (activeStateEnabled) {
      var _this$widgetElementRe3;
      return subscribeToDxInactiveEvent(null === (_this$widgetElementRe3 = this.widgetElementRef) || void 0 === _this$widgetElementRe3 ? void 0 : _this$widgetElementRe3.current, ((event) => {
        if (this.state.active) {
          this.setState({
            active: false
          });
          null === onInactive || void 0 === onInactive || onInactive(event);
        }
      }), {
        timeout: _feedbackHideTimeout,
        selector
      }, "UIFeedback");
    }
    return;
  }
  clickEffect() {
    const {
      name,
      onClick,
      disabled
    } = this.props;
    const namespace = name;
    if (onClick && !disabled) {
      var _this$widgetElementRe4;
      dxClick.on(null === (_this$widgetElementRe4 = this.widgetElementRef) || void 0 === _this$widgetElementRe4 ? void 0 : _this$widgetElementRe4.current, onClick, {
        namespace
      });
      return () => {
        var _this$widgetElementRe5;
        return dxClick.off(null === (_this$widgetElementRe5 = this.widgetElementRef) || void 0 === _this$widgetElementRe5 ? void 0 : _this$widgetElementRe5.current, {
          namespace
        });
      };
    }
    return;
  }
  focusInEffect() {
    const {
      disabled,
      focusStateEnabled,
      name,
      onFocusIn
    } = this.props;
    const namespace = `${name}Focus`;
    if (focusStateEnabled) {
      if (!disabled) {
        var _this$widgetElementRe6;
        return subscribeToDxFocusInEvent(null === (_this$widgetElementRe6 = this.widgetElementRef) || void 0 === _this$widgetElementRe6 ? void 0 : _this$widgetElementRe6.current, ((event) => {
          if (!event.isDefaultPrevented()) {
            this.setState({
              focused: true
            });
            null === onFocusIn || void 0 === onFocusIn || onFocusIn(event);
          }
        }), null, namespace);
      }
    }
    return;
  }
  focusOutEffect() {
    const {
      focusStateEnabled,
      name,
      onFocusOut
    } = this.props;
    const namespace = `${name}Focus`;
    if (focusStateEnabled) {
      var _this$widgetElementRe7;
      return subscribeToDxFocusOutEvent(null === (_this$widgetElementRe7 = this.widgetElementRef) || void 0 === _this$widgetElementRe7 ? void 0 : _this$widgetElementRe7.current, ((event) => {
        if (!event.isDefaultPrevented() && this.state.focused) {
          this.setState({
            focused: false
          });
          null === onFocusOut || void 0 === onFocusOut || onFocusOut(event);
        }
      }), null, namespace);
    }
    return;
  }
  hoverStartEffect() {
    const {
      activeStateUnit,
      hoverStateEnabled,
      disabled,
      onHoverStart
    } = this.props;
    const selector = activeStateUnit;
    if (hoverStateEnabled) {
      if (!disabled) {
        var _this$widgetElementRe8;
        return subscribeToDxHoverStartEvent(null === (_this$widgetElementRe8 = this.widgetElementRef) || void 0 === _this$widgetElementRe8 ? void 0 : _this$widgetElementRe8.current, ((event) => {
          if (!this.state.active) {
            this.setState({
              hovered: true
            });
          }
          null === onHoverStart || void 0 === onHoverStart || onHoverStart(event);
        }), {
          selector
        }, "UIFeedback");
      }
    }
    return;
  }
  hoverEndEffect() {
    const {
      activeStateUnit,
      hoverStateEnabled,
      onHoverEnd
    } = this.props;
    const selector = activeStateUnit;
    if (hoverStateEnabled) {
      var _this$widgetElementRe9;
      return subscribeToDxHoverEndEvent(null === (_this$widgetElementRe9 = this.widgetElementRef) || void 0 === _this$widgetElementRe9 ? void 0 : _this$widgetElementRe9.current, ((event) => {
        if (this.state.hovered) {
          this.setState({
            hovered: false
          });
          null === onHoverEnd || void 0 === onHoverEnd || onHoverEnd(event);
        }
      }), {
        selector
      }, "UIFeedback");
    }
    return;
  }
  keyboardEffect() {
    const {
      onKeyDown,
      focusStateEnabled
    } = this.props;
    if (focusStateEnabled && onKeyDown) {
      var _this$widgetElementRe10, _this$widgetElementRe11;
      const id = keyboard.on(null === (_this$widgetElementRe10 = this.widgetElementRef) || void 0 === _this$widgetElementRe10 ? void 0 : _this$widgetElementRe10.current, null === (_this$widgetElementRe11 = this.widgetElementRef) || void 0 === _this$widgetElementRe11 ? void 0 : _this$widgetElementRe11.current, ((e) => onKeyDown(e)));
      return () => keyboard.off(id);
    }
    return;
  }
  resizeEffect() {
    const namespace = `${this.props.name}VisibilityChange`;
    const {
      onDimensionChanged
    } = this.props;
    if (onDimensionChanged) {
      var _this$widgetElementRe12;
      resize.on(null === (_this$widgetElementRe12 = this.widgetElementRef) || void 0 === _this$widgetElementRe12 ? void 0 : _this$widgetElementRe12.current, onDimensionChanged, {
        namespace
      });
      return () => {
        var _this$widgetElementRe13;
        return resize.off(null === (_this$widgetElementRe13 = this.widgetElementRef) || void 0 === _this$widgetElementRe13 ? void 0 : _this$widgetElementRe13.current, {
          namespace
        });
      };
    }
    return;
  }
  windowResizeEffect() {
    const {
      onDimensionChanged
    } = this.props;
    if (onDimensionChanged) {
      resize_callbacks_default.add(onDimensionChanged);
      return () => {
        resize_callbacks_default.remove(onDimensionChanged);
      };
    }
    return;
  }
  visibilityEffect() {
    const {
      name,
      onVisibilityChange
    } = this.props;
    const namespace = `${name}VisibilityChange`;
    if (onVisibilityChange) {
      var _this$widgetElementRe14;
      visibility.on(null === (_this$widgetElementRe14 = this.widgetElementRef) || void 0 === _this$widgetElementRe14 ? void 0 : _this$widgetElementRe14.current, (() => onVisibilityChange(true)), (() => onVisibilityChange(false)), {
        namespace
      });
      return () => {
        var _this$widgetElementRe15;
        return visibility.off(null === (_this$widgetElementRe15 = this.widgetElementRef) || void 0 === _this$widgetElementRe15 ? void 0 : _this$widgetElementRe15.current, {
          namespace
        });
      };
    }
    return;
  }
  checkDeprecation() {
    const {
      width,
      height
    } = this.props;
    if (isFunction(width)) {
      errors_default.log("W0017", "width");
    }
    if (isFunction(height)) {
      errors_default.log("W0017", "height");
    }
  }
  applyCssTextEffect() {
    var _this$widgetElementRe16;
    const {
      cssText
    } = this.props;
    if (void 0 !== cssText && "" !== cssText && null !== (_this$widgetElementRe16 = this.widgetElementRef) && void 0 !== _this$widgetElementRe16 && _this$widgetElementRe16.current) {
      this.widgetElementRef.current.style.cssText = cssText;
    }
  }
  getShouldRenderConfigProvider() {
    const {
      rtlEnabled
    } = this.props;
    return resolveRtlEnabledDefinition(rtlEnabled, this.config);
  }
  getRtlEnabled() {
    const {
      rtlEnabled
    } = this.props;
    return resolveRtlEnabled(rtlEnabled, this.config);
  }
  getAttributes() {
    const {
      aria,
      disabled,
      focusStateEnabled,
      visible
    } = this.props;
    const accessKey = focusStateEnabled && !disabled && this.props.accessKey;
    const props = _extends({}, extend({}, accessKey && {
      accessKey
    }), getAria(_extends({}, aria, {
      disabled,
      hidden: !visible
    })), extend({}, this.getRestAttributes(this.props)));
    return props;
  }
  getRestAttributes(props) {
    const result2 = _extends({}, props);
    ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "cssText", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onRootElementRendered", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"].forEach(((exclude) => {
      delete result2[exclude];
    }));
    return result2;
  }
  getStyles() {
    const {
      width,
      height
    } = this.props;
    const style = this.props.style || {};
    const computedWidth = normalizeStyleProp("width", isFunction(width) ? width() : width);
    const computedHeight = normalizeStyleProp("height", isFunction(height) ? height() : height);
    return _extends({}, style, {
      height: computedHeight ?? style.height,
      width: computedWidth ?? style.width
    });
  }
  getCssClasses() {
    const {
      classes,
      addWidgetClass,
      className,
      disabled,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onVisibilityChange,
      visible
    } = this.props;
    const isFocusable = !!focusStateEnabled && !disabled;
    const isHoverable = !!hoverStateEnabled && !disabled;
    const canBeActive = !!activeStateEnabled && !disabled;
    const classesMap = {
      [WIDGET_CLASS]: !!addWidgetClass,
      [String(classes)]: !!classes,
      [String(className)]: !!className,
      "dx-state-disabled": !!disabled,
      "dx-state-invisible": !visible,
      "dx-state-focused": !!this.state.focused && isFocusable,
      "dx-state-active": !!this.state.active && canBeActive,
      "dx-state-hover": !!this.state.hovered && isHoverable && !this.state.active,
      "dx-rtl": !!this.props.rtlEnabled,
      "dx-visibility-change-handler": !!onVisibilityChange
    };
    return combineClasses(classesMap);
  }
  getTabIndex() {
    const {
      focusStateEnabled,
      disabled,
      tabIndex
    } = this.props;
    const isFocusable = focusStateEnabled && !disabled;
    return isFocusable ? tabIndex : void 0;
  }
  focus() {
    var _this$widgetElementRe17;
    focus.trigger(null === (_this$widgetElementRe17 = this.widgetElementRef) || void 0 === _this$widgetElementRe17 ? void 0 : _this$widgetElementRe17.current);
  }
  blur() {
    var _this$widgetElementRe18, _this$widgetElementRe19;
    const activeElement = dom_adapter_default.getActiveElement(null === (_this$widgetElementRe18 = this.widgetElementRef) || void 0 === _this$widgetElementRe18 ? void 0 : _this$widgetElementRe18.current);
    if ((null === (_this$widgetElementRe19 = this.widgetElementRef) || void 0 === _this$widgetElementRe19 ? void 0 : _this$widgetElementRe19.current) === activeElement) {
      activeElement.blur();
    }
  }
  activate() {
    this.setState({
      active: true
    });
  }
  deactivate() {
    this.setState({
      active: false
    });
  }
  render() {
    const {
      hint,
      children
    } = this.props;
    const widget = normalizeProps(createVNode(1, "div", this.getCssClasses(), children, 0, _extends({}, this.getAttributes(), {
      tabindex: this.getTabIndex(),
      title: hint,
      style: this.getStyles()
    }), null, this.widgetElementRef));
    return this.getShouldRenderConfigProvider() ? createComponentVNode(2, ConfigProvider, {
      rtlEnabled: this.getRtlEnabled(),
      children: widget
    }) : widget;
  }
};
Widget.defaultProps = WidgetDefaultProps;

// node_modules/devextreme/esm/__internal/core/utils/combine_classes.js
function combineClasses2(classesMap) {
  return Object.keys(classesMap).filter(((p2) => classesMap[p2])).join(" ");
}

// node_modules/devextreme/esm/__internal/ui/button/icon.js
var defaultIconProps = {
  position: "left",
  source: ""
};
var Icon = class extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get sourceType() {
    return getImageSourceType(this.props.source);
  }
  get cssClass() {
    return "left" !== this.props.position ? "dx-icon-right" : "";
  }
  get iconClassName() {
    const generalClasses = {
      "dx-icon": true,
      [this.cssClass]: !!this.cssClass
    };
    const {
      source
    } = this.props;
    if ("dxIcon" === this.sourceType) {
      return combineClasses2(_extends({}, generalClasses, {
        [`dx-icon-${source}`]: true
      }));
    }
    if ("fontIcon" === this.sourceType) {
      return combineClasses2(_extends({}, generalClasses, {
        [String(source)]: !!source
      }));
    }
    if ("image" === this.sourceType) {
      return combineClasses2(generalClasses);
    }
    if ("svg" === this.sourceType) {
      return combineClasses2(_extends({}, generalClasses, {
        "dx-svg-icon": true
      }));
    }
    return "";
  }
  render() {
    const {
      iconClassName,
      props,
      sourceType
    } = this;
    const IconTemplate = getTemplate(props.iconTemplate);
    return createFragment(["dxIcon" === sourceType && createVNode(1, "i", iconClassName), "fontIcon" === sourceType && createVNode(1, "i", iconClassName), "image" === sourceType && createVNode(1, "img", iconClassName, null, 1, {
      alt: "",
      src: props.source
    }), IconTemplate && createVNode(1, "i", iconClassName, IconTemplate({}), 0)], 0);
  }
};
Icon.defaultProps = defaultIconProps;

// node_modules/devextreme/esm/__internal/core/utils/m_ink_ripple.js
var initConfig = function() {
  let config = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  const {
    useHoldAnimation,
    waveSizeCoefficient,
    isCentered,
    wavesNumber
  } = config;
  return {
    waveSizeCoefficient: waveSizeCoefficient || 2,
    isCentered: isCentered || false,
    wavesNumber: wavesNumber || 1,
    durations: getDurations(useHoldAnimation ?? true)
  };
};
var render2 = function(args) {
  const config = initConfig(args);
  return {
    showWave: showWave.bind(this, config),
    hideWave: hideWave.bind(this, config)
  };
};
var getInkRipple = function(element) {
  let result2 = element.children(".dx-inkripple");
  if (0 === result2.length) {
    result2 = renderer_default("<div>").addClass("dx-inkripple").appendTo(element);
  }
  return result2;
};
var getWaves = function(element, wavesNumber) {
  const inkRipple = getInkRipple(renderer_default(element));
  const result2 = inkRipple.children(".dx-inkripple-wave").toArray();
  for (let i = result2.length; i < wavesNumber; i++) {
    const $currentWave = renderer_default("<div>").appendTo(inkRipple).addClass("dx-inkripple-wave");
    result2.push($currentWave[0]);
  }
  return renderer_default(result2);
};
var getWaveStyleConfig = function(args, config) {
  const element = renderer_default(config.element);
  const elementWidth = getOuterWidth(element);
  const elementHeight = getOuterHeight(element);
  const elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
  const waveSize = Math.min(4e3, parseInt(elementDiagonal * args.waveSizeCoefficient));
  let left;
  let top;
  if (args.isCentered) {
    left = (elementWidth - waveSize) / 2;
    top = (elementHeight - waveSize) / 2;
  } else {
    const {
      event
    } = config;
    const position = element.offset();
    const x = event.pageX - position.left;
    const y = event.pageY - position.top;
    left = x - waveSize / 2;
    top = y - waveSize / 2;
  }
  return {
    left,
    top,
    height: waveSize,
    width: waveSize
  };
};
function showWave(args, config) {
  const $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || 0);
  args.hidingTimeout && clearTimeout(args.hidingTimeout);
  hideSelectedWave($wave);
  $wave.css(getWaveStyleConfig(args, config));
  args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0);
}
function showingWaveHandler(args, $wave) {
  const durationCss = `${args.durations.showingScale}ms`;
  $wave.addClass("dx-inkripple-showing").css("transitionDuration", durationCss);
}
function getDurations(useHoldAnimation) {
  return {
    showingScale: useHoldAnimation ? 1e3 : 300,
    hidingScale: 300,
    hidingOpacity: 300
  };
}
function hideSelectedWave($wave) {
  $wave.removeClass("dx-inkripple-hiding").css("transitionDuration", "");
}
function hideWave(args, config) {
  args.showingTimeout && clearTimeout(args.showingTimeout);
  const $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || 0);
  const {
    durations
  } = args;
  const durationCss = `${durations.hidingScale}ms, ${durations.hidingOpacity}ms`;
  $wave.addClass("dx-inkripple-hiding").removeClass("dx-inkripple-showing").css("transitionDuration", durationCss);
  const animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
  args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration);
}

// node_modules/devextreme/esm/__internal/ui/button/ink_ripple.js
var _excluded2 = ["config"];
var defaultInkRippleProps = {
  config: {}
};
var InkRipple = class extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.state = {};
    this.hideWave = this.hideWave.bind(this);
    this.showWave = this.showWave.bind(this);
  }
  get getConfig() {
    if (void 0 === this.__getterCache.getConfig) {
      this.__getterCache.getConfig = initConfig(this.props.config);
    }
    return this.__getterCache.getConfig;
  }
  get restAttributes() {
    const _this$props = this.props, restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    return restProps;
  }
  hideWave(opts) {
    hideWave(this.getConfig, opts);
  }
  showWave(opts) {
    showWave(this.getConfig, opts);
  }
  componentWillUpdate(nextProps) {
    if (this.props.config !== nextProps.config) {
      this.__getterCache.getConfig = void 0;
    }
  }
  render() {
    return normalizeProps(createVNode(1, "div", "dx-inkripple", null, 1, _extends({}, this.restAttributes)));
  }
};
InkRipple.defaultProps = defaultInkRippleProps;

// node_modules/devextreme/esm/__internal/ui/button/button.js
var BUTTON_CLASS = "dx-button";
var stylingModes = ["outlined", "text", "contained"];
var buttonComponentProps = ["accessKey", "activeStateEnabled", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "iconTemplate", "onClick", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "templateData", "text", "type", "useInkRipple", "useSubmitBehavior", "visible", "width"];
var getCssClasses = (model) => {
  const {
    icon,
    iconPosition,
    stylingMode,
    text,
    type
  } = model;
  const isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
  const classesMap = {
    [BUTTON_CLASS]: true,
    [`dx-button-mode-${isValidStylingMode ? stylingMode : "contained"}`]: true,
    [`dx-button-${type ?? "normal"}`]: true,
    "dx-button-has-text": !!text,
    "dx-button-has-icon": !!icon,
    "dx-button-icon-right": "left" !== iconPosition
  };
  return combineClasses2(classesMap);
};
var omit = (obj, excludedKeys) => {
  const excludedSet = new Set(excludedKeys);
  return Object.keys(obj).reduce(((result2, key) => {
    if (!excludedSet.has(key)) {
      result2[key] = obj[key];
    }
    return result2;
  }), {});
};
var defaultButtonProps = _extends({}, BaseWidgetDefaultProps, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  icon: "",
  iconPosition: "left",
  stylingMode: "contained",
  text: "",
  type: "normal",
  useInkRipple: false,
  useSubmitBehavior: false,
  templateData: {}
});
var defaultOptionRules = createDefaultOptionRules([{
  device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
  options: {
    focusStateEnabled: true
  }
}, {
  device: () => isMaterial(current()),
  options: {
    useInkRipple: true
  }
}]);
var Button = class extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.contentRef = createRef();
    this.inkRippleRef = createRef();
    this.submitInputRef = createRef();
    this.widgetRef = createRef();
    this.__getterCache = {};
    this.state = {};
    this.focus = this.focus.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.submitEffect = this.submitEffect.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onInactive = this.onInactive.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects$;
    null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior]);
  }
  submitEffect() {
    const {
      onSubmit,
      useSubmitBehavior
    } = this.props;
    const submitInput = this.submitInputRef.current;
    if (useSubmitBehavior && onSubmit) {
      click.on(submitInput, ((event) => onSubmit({
        event,
        submitInput
      })), {
        namespace: "UIFeedback"
      });
      return () => click.off(submitInput, {
        namespace: "UIFeedback"
      });
    }
    return;
  }
  onActive(event) {
    if (this.props.useInkRipple) {
      var _this$inkRippleRef$cu;
      null === (_this$inkRippleRef$cu = this.inkRippleRef.current) || void 0 === _this$inkRippleRef$cu || _this$inkRippleRef$cu.showWave({
        element: this.contentRef.current,
        event
      });
    }
  }
  onInactive(event) {
    if (this.props.useInkRipple) {
      var _this$inkRippleRef$cu2;
      null === (_this$inkRippleRef$cu2 = this.inkRippleRef.current) || void 0 === _this$inkRippleRef$cu2 || _this$inkRippleRef$cu2.hideWave({
        element: this.contentRef.current,
        event
      });
    }
  }
  onWidgetClick(event) {
    const {
      onClick,
      useSubmitBehavior
    } = this.props;
    null === onClick || void 0 === onClick || onClick({
      event
    });
    if (useSubmitBehavior) {
      var _this$submitInputRef$;
      null === (_this$submitInputRef$ = this.submitInputRef.current) || void 0 === _this$submitInputRef$ || _this$submitInputRef$.click();
    }
  }
  keyDown(e) {
    const {
      onKeyDown
    } = this.props;
    const {
      keyName,
      originalEvent,
      which
    } = e;
    const result2 = null === onKeyDown || void 0 === onKeyDown ? void 0 : onKeyDown(e);
    if (null !== result2 && void 0 !== result2 && result2.cancel) {
      return result2;
    }
    if ("space" === keyName || "space" === which || "enter" === keyName || "enter" === which) {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }
    return;
  }
  get aria() {
    const {
      icon,
      text
    } = this.props;
    let label = text ?? "";
    if (!text && icon) {
      const iconSource = getImageSourceType(icon);
      switch (iconSource) {
        case "image": {
          const notURLRegexp = /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/;
          const isPathToImage = !icon.includes("base64") && notURLRegexp.test(icon);
          label = isPathToImage ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "";
          break;
        }
        case "dxIcon":
          label = message_default.format(camelize(icon, true)) || icon;
          break;
        case "fontIcon":
          label = icon;
          break;
        case "svg": {
          var _titleRegexp$exec;
          const titleRegexp = /<title>(.*?)<\/title>/;
          label = (null === (_titleRegexp$exec = titleRegexp.exec(icon)) || void 0 === _titleRegexp$exec ? void 0 : _titleRegexp$exec[1]) ?? "";
          break;
        }
      }
    }
    return _extends({
      role: "button"
    }, label ? {
      label
    } : {});
  }
  get cssClasses() {
    return getCssClasses(this.props);
  }
  get iconSource() {
    return this.props.icon ?? "";
  }
  get inkRippleConfig() {
    if (void 0 === this.__getterCache.inkRippleConfig) {
      const {
        icon,
        text
      } = this.props;
      this.__getterCache.inkRippleConfig = !text && icon ? {
        isCentered: true,
        useHoldAnimation: false,
        waveSizeCoefficient: 1
      } : {};
    }
    return this.__getterCache.inkRippleConfig;
  }
  get buttonTemplateData() {
    const {
      icon,
      text,
      templateData
    } = this.props;
    return _extends({
      icon,
      text
    }, templateData);
  }
  get restAttributes() {
    const excludedKeys = [...buttonComponentProps, "children"];
    return omit(this.props, excludedKeys);
  }
  focus() {
    var _this$widgetRef$curre;
    null === (_this$widgetRef$curre = this.widgetRef.current) || void 0 === _this$widgetRef$curre || _this$widgetRef$curre.focus();
  }
  activate() {
    var _this$widgetRef$curre2;
    null === (_this$widgetRef$curre2 = this.widgetRef.current) || void 0 === _this$widgetRef$curre2 || _this$widgetRef$curre2.activate();
  }
  deactivate() {
    var _this$widgetRef$curre3;
    null === (_this$widgetRef$curre3 = this.widgetRef.current) || void 0 === _this$widgetRef$curre3 || _this$widgetRef$curre3.deactivate();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.icon !== nextProps.icon || this.props.text !== nextProps.text) {
      this.__getterCache.inkRippleConfig = void 0;
    }
  }
  render() {
    const {
      children,
      iconPosition,
      text
    } = this.props;
    const ButtonTemplate = getTemplate(this.props.template);
    const IconTemplate = getTemplate(this.props.iconTemplate);
    const renderText = !this.props.template && !children && "" !== text;
    const isIconLeft = "left" === iconPosition;
    const iconComponent = !ButtonTemplate && !children && (this.iconSource || IconTemplate) && createComponentVNode(2, Icon, {
      source: this.iconSource,
      position: iconPosition,
      iconTemplate: IconTemplate
    });
    return normalizeProps(createComponentVNode(2, Widget, _extends({
      accessKey: this.props.accessKey,
      activeStateEnabled: this.props.activeStateEnabled,
      aria: this.aria,
      className: this.props.className,
      classes: this.cssClasses,
      disabled: this.props.disabled,
      focusStateEnabled: this.props.focusStateEnabled,
      height: this.props.height,
      hint: this.props.hint,
      hoverStateEnabled: this.props.hoverStateEnabled,
      onActive: this.onActive,
      onClick: this.onWidgetClick,
      onInactive: this.onInactive,
      onKeyDown: this.keyDown,
      rtlEnabled: this.props.rtlEnabled,
      tabIndex: this.props.tabIndex,
      visible: this.props.visible,
      width: this.props.width
    }, this.restAttributes, {
      children: createVNode(1, "div", "dx-button-content", [ButtonTemplate ? ButtonTemplate({
        data: this.buttonTemplateData
      }) : children, isIconLeft && iconComponent, renderText && createVNode(1, "span", "dx-button-text", text, 0), !isIconLeft && iconComponent, this.props.useSubmitBehavior && createVNode(64, "input", "dx-button-submit-input", null, 1, {
        type: "submit",
        tabindex: -1
      }, null, this.submitInputRef), this.props.useInkRipple && createComponentVNode(2, InkRipple, {
        config: this.inkRippleConfig
      }, null, this.inkRippleRef)], 0, null, null, this.contentRef)
    }), null, this.widgetRef));
  }
};
Button.defaultProps = _extends({}, defaultButtonProps, convertRulesToOptions(defaultOptionRules));
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Button.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors(convertRulesToOptions(defaultOptionRules)), Object.getOwnPropertyDescriptors(convertRulesToOptions(__defaultOptionRules))));
}

// node_modules/devextreme/esm/__internal/ui/button/wrapper.js
var Button2 = class extends ComponentWrapper {
  get _validationGroupConfig() {
    return validation_engine_default.getGroupConfig(this._findGroup());
  }
  getDefaultTemplateNames() {
    return ["content"];
  }
  getSupportedKeyNames() {
    return ["space", "enter"];
  }
  getProps() {
    const props = super.getProps();
    props.onClick = (_ref) => {
      let {
        event
      } = _ref;
      this._clickAction({
        event,
        validationGroup: this._validationGroupConfig
      });
    };
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    const iconType = getImageSourceType(props.icon);
    if ("svg" === iconType) {
      props.iconTemplate = this._createTemplateComponent((() => props.icon));
    }
    return props;
  }
  get viewRef() {
    return super.viewRef;
  }
  get _templatesInfo() {
    return {
      template: "content"
    };
  }
  _toggleActiveState(_, value) {
    if (value) {
      var _this$viewRef;
      null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef || _this$viewRef.activate();
    } else {
      var _this$viewRef2;
      null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 || _this$viewRef2.deactivate();
    }
  }
  _getSubmitAction() {
    let needValidate = true;
    let validationStatus = "valid";
    return this._createAction(((_ref2) => {
      let {
        event,
        submitInput
      } = _ref2;
      if (needValidate) {
        const validationGroup = this._validationGroupConfig;
        if (void 0 !== validationGroup && "" !== validationGroup) {
          const validationResult = validationGroup.validate();
          validationStatus = validationResult.status;
          if ("pending" === validationResult.status) {
            needValidate = false;
            this.option("disabled", true);
            validationResult.complete.then(((_ref3) => {
              let {
                status
              } = _ref3;
              this.option("disabled", false);
              validationStatus = status;
              if ("valid" === validationStatus) {
                submitInput.click();
              }
              needValidate = true;
            }));
          }
        }
      }
      if ("valid" !== validationStatus) {
        event.preventDefault();
      }
      event.stopPropagation();
    }));
  }
  _initializeComponent() {
    super._initializeComponent();
    this._addAction("onSubmit", this._getSubmitAction());
    this._clickAction = this._createClickAction();
  }
  _initMarkup() {
    super._initMarkup();
    const $content = this.$element().find(".dx-button-content").first();
    const $template = $content.children().filter(".dx-template-wrapper");
    const $input = $content.children().filter(".dx-button-submit-input");
    if ($template.length) {
      $template.addClass("dx-button-content");
      $template.append($input);
      $content.replaceWith($template);
    }
  }
  _patchOptionValues(options2) {
    return super._patchOptionValues(_extends({}, options2, {
      templateData: options2._templateData
    }));
  }
  _findGroup() {
    const $element = this.$element();
    const validationGroup = this.option("validationGroup");
    return void 0 !== validationGroup && "" !== validationGroup ? validationGroup : validation_engine_default.findGroup($element, this._modelByElement($element));
  }
  _createClickAction() {
    return this._createActionByOption("onClick", {
      excludeValidators: ["readOnly"]
    });
  }
  _optionChanged(option) {
    if ("onClick" === option.name) {
      this._clickAction = this._createClickAction();
    }
    super._optionChanged(option);
  }
  focus() {
    var _this$viewRef3;
    null === (_this$viewRef3 = this.viewRef) || void 0 === _this$viewRef3 || _this$viewRef3.focus();
  }
  activate() {
    var _this$viewRef4;
    null === (_this$viewRef4 = this.viewRef) || void 0 === _this$viewRef4 || _this$viewRef4.activate();
  }
  deactivate() {
    var _this$viewRef5;
    null === (_this$viewRef5 = this.viewRef) || void 0 === _this$viewRef5 || _this$viewRef5.deactivate();
  }
  _getActionConfigs() {
    return {
      onClick: {
        excludeValidators: ["readOnly"]
      },
      onSubmit: {}
    };
  }
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: ["onSubmit"],
      templates: ["template", "iconTemplate"],
      props: buttonComponentProps
    };
  }
  get _viewComponent() {
    return Button;
  }
};
component_registrator_default("dxButton", Button2);
Button2.defaultOptions = defaultOptions;

// node_modules/devextreme/esm/__internal/ui/button/index.js
var button_default = Button2;

// node_modules/devextreme/esm/ui/button.js
var button_default2 = button_default;

export {
  ICON_CLASS,
  getImageSourceType,
  getImageContainer,
  toFixed,
  getFormat,
  number_default2 as number_default,
  m_validation_engine_default,
  validation_engine_default,
  dom_component_default2 as dom_component_default,
  createVNode,
  createComponentVNode,
  createTextVNode,
  createFragment,
  normalizeProps,
  createPortal,
  createRef,
  render,
  rerender,
  Component,
  BaseInfernoComponent,
  InfernoComponent,
  InfernoWrapperComponent,
  createContext,
  InfernoEffect,
  normalizeStyles,
  createReRenderEffect,
  renderTemplate,
  hasTemplate,
  infernoRenderer,
  getTemplate,
  ComponentWrapper,
  BaseWidgetDefaultProps,
  ConfigContext,
  combineClasses,
  subscribeToClickEvent,
  WidgetDefaultProps,
  Widget,
  combineClasses2,
  render2,
  BUTTON_CLASS,
  Button2 as Button,
  button_default2 as button_default
};
//# sourceMappingURL=chunk-UBAWJAV5.js.map
