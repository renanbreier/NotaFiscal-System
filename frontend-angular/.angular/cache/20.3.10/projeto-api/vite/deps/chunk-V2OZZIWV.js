import {
  core_default
} from "./chunk-PCELI6Y7.js";
import {
  fitIntoRange,
  multiplyInExponentialForm,
  sign
} from "./chunk-VZ4XASFZ.js";
import {
  config_default,
  config_default2,
  dependency_injector_default,
  each,
  errors_default,
  escapeRegExp,
  extend,
  isPlainObject
} from "./chunk-EJA7O4BW.js";

// node_modules/devextreme/esm/common/core/localization/currency.js
var currency_default = {
  _formatNumberCore: function(value, format, formatConfig) {
    if ("currency" === format) {
      formatConfig.precision = formatConfig.precision || 0;
      let result = this.format(value, extend({}, formatConfig, {
        type: "fixedpoint"
      }));
      const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
      result = result.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
      return result;
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
    const result = integerString + (floatString.match(/\d/) ? config.decimalSeparator : "") + floatString;
    return result;
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
  const result = accountingFormat.split(";");
  for (let i = 0; i < result.length; i++) {
    for (const symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result[i] = result[i].replace(new RegExp(symbol, "g"), encodeSymbols[symbol]);
      }
    }
  }
  return 2 === result.length ? result[0] + "_);" + result[1] : result[0];
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
    const result = this.callBase.apply(this, arguments);
    return result;
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
    let result = number;
    while (power > 0) {
      result /= base;
      power--;
    }
    while (power < 0) {
      result *= base;
      power++;
    }
    return result;
  },
  _formatNumber: function(value, formatObject, formatConfig) {
    if ("auto" === formatObject.power) {
      formatObject.power = this._calculateNumberPower(value, 1e3, 0, 4);
    }
    if (formatObject.power) {
      value = this._getNumberByPower(value, formatObject.power, 1e3);
    }
    const powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || "";
    let result = this._formatNumberCore(value, formatObject.formatType, formatConfig);
    result = result.replace(/(\d|.$)(\D*)$/, "$1" + powerPostfix + "$2");
    return result;
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
    let result = value.toString();
    while (result.length < precision) {
      result = "0" + result;
    }
    return sign2 + result;
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
      const result = this.convertDigits(formatter);
      return result;
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
    let result = 0;
    if (integer) {
      result += calcDigitsAfterLeadingZeros(integer.split(""));
    }
    if (fractional) {
      result += calcDigitsAfterLeadingZeros(fractional.split("").reverse());
    }
    return result;
  }
});
numberLocalization.inject(currency_default);
if (hasIntl) {
  numberLocalization.inject(number_default);
}
var number_default2 = numberLocalization;

export {
  toFixed,
  getFormat,
  number_default2 as number_default
};
//# sourceMappingURL=chunk-V2OZZIWV.js.map
