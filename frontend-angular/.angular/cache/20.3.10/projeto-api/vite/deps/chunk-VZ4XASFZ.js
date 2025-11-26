import {
  isExponential,
  map
} from "./chunk-EJA7O4BW.js";

// node_modules/devextreme/esm/common/core/localization/default_date_names.js
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var PERIODS = ["AM", "PM"];
var QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
var cutCaptions = (captions, format) => {
  const lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return map(captions, ((caption) => caption.substr(0, lengthByFormat[format])));
};
var default_date_names_default = {
  getMonthNames: function(format) {
    return cutCaptions(MONTHS, format);
  },
  getDayNames: function(format) {
    return cutCaptions(DAYS, format);
  },
  getQuarterNames: function(format) {
    return QUARTERS;
  },
  getPeriodNames: function(format) {
    return PERIODS;
  }
};

// node_modules/devextreme/esm/common/core/localization/ldml/date.formatter.js
function leftPad(text, length) {
  while (text.length < length) {
    text = "0" + text;
  }
  return text;
}
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var LDML_FORMATTERS = {
  y: function(date, count, useUtc) {
    let year = date[useUtc ? "getUTCFullYear" : "getFullYear"]();
    if (2 === count) {
      year %= 100;
    }
    return leftPad(year.toString(), count);
  },
  M: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "format")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  L: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "standalone")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  Q: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const quarter = Math.floor(month / 3);
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getQuarterNames(formatType)[quarter];
    }
    return leftPad((quarter + 1).toString(), Math.min(count, 2));
  },
  E: function(date, count, useUtc, dateParts) {
    const day = date[useUtc ? "getUTCDay" : "getDay"]();
    const formatType = FORMAT_TYPES[count < 3 ? 3 : count];
    return dateParts.getDayNames(formatType)[day];
  },
  a: function(date, count, useUtc, dateParts) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    const period = hours < 12 ? 0 : 1;
    const formatType = FORMAT_TYPES[count];
    return dateParts.getPeriodNames(formatType)[period];
  },
  d: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCDate" : "getDate"]().toString(), Math.min(count, 2));
  },
  H: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCHours" : "getHours"]().toString(), Math.min(count, 2));
  },
  h: function(date, count, useUtc) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
  },
  m: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMinutes" : "getMinutes"]().toString(), Math.min(count, 2));
  },
  s: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCSeconds" : "getSeconds"]().toString(), Math.min(count, 2));
  },
  S: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMilliseconds" : "getMilliseconds"]().toString(), 3).substr(0, count);
  },
  x: function(date, count, useUtc) {
    const timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
    const signPart = timezoneOffset > 0 ? "-" : "+";
    const timezoneOffsetAbs = Math.abs(timezoneOffset);
    const hours = Math.floor(timezoneOffsetAbs / 60);
    const minutes = timezoneOffsetAbs % 60;
    const hoursPart = leftPad(hours.toString(), 2);
    const minutesPart = leftPad(minutes.toString(), 2);
    return signPart + hoursPart + (count >= 3 ? ":" : "") + (count > 1 || minutes ? minutesPart : "");
  },
  X: function(date, count, useUtc) {
    if (useUtc || !date.getTimezoneOffset()) {
      return "Z";
    }
    return LDML_FORMATTERS.x(date, count, useUtc);
  },
  Z: function(date, count, useUtc) {
    return LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc);
  }
};
var getFormatter = function(format, dateParts) {
  return function(date) {
    let charIndex;
    let formatter;
    let char;
    let charCount = 0;
    let isEscaping = false;
    let isCurrentCharEqualsNext;
    let result = "";
    if (!date) {
      return null;
    }
    if (!format) {
      return date;
    }
    const useUtc = "Z" === format[format.length - 1] || "'Z'" === format.slice(-3);
    for (charIndex = 0; charIndex < format.length; charIndex++) {
      char = format[charIndex];
      formatter = LDML_FORMATTERS[char];
      isCurrentCharEqualsNext = char === format[charIndex + 1];
      charCount++;
      if (!isCurrentCharEqualsNext) {
        if (formatter && !isEscaping) {
          result += formatter(date, charCount, useUtc, dateParts);
        }
        charCount = 0;
      }
      if ("'" === char && !isCurrentCharEqualsNext) {
        isEscaping = !isEscaping;
      } else if (isEscaping || !formatter) {
        result += char;
      }
      if ("'" === char && isCurrentCharEqualsNext) {
        charIndex++;
      }
    }
    return result;
  };
};

// node_modules/devextreme/esm/__internal/core/utils/m_math.js
var sign = function(value) {
  if (0 === value) {
    return 0;
  }
  return value / Math.abs(value);
};
var fitIntoRange = function(value, minValue, maxValue) {
  const isMinValueUndefined = !minValue && 0 !== minValue;
  const isMaxValueUndefined = !maxValue && 0 !== maxValue;
  isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value, maxValue) : value);
  isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value, minValue) : value);
  return Math.min(Math.max(value, minValue), maxValue);
};
var inRange = function(value, minValue, maxValue) {
  return value >= minValue && value <= maxValue;
};
function getExponent(value) {
  const [_, exponentString] = value.toExponential().split("e");
  return Math.abs(parseInt(exponentString, 10));
}
function getExponentialNotation(value) {
  const parts = value.toExponential().split("e");
  const mantissa = parseFloat(parts[0]);
  const exponent = parseInt(parts[1], 10);
  return {
    exponent,
    mantissa
  };
}
function multiplyInExponentialForm(value, exponentShift) {
  const exponentialNotation = getExponentialNotation(value);
  return parseFloat(`${exponentialNotation.mantissa}e${exponentialNotation.exponent + exponentShift}`);
}
function adjust(value, interval) {
  const absValue = Math.abs(value);
  const integerPart = absValue > 1 ? 10 : 0;
  const precision = getPrecision(interval ?? 0) + 2;
  const finalPrecision = precision > 7 ? 15 : 7;
  const [integerValuePart, fractionalValuePart] = value.toString().split(".");
  const sourceValue = value;
  const isExponentValue = isExponential(value);
  if (isExponentValue) {
    return adjustExponential(value, finalPrecision);
  }
  if (!fractionalValuePart) {
    return value;
  }
  if (isExponential(interval)) {
    const expPrecision = integerValuePart.length + getExponent(interval);
    return parseFloat(sourceValue.toPrecision(expPrecision));
  }
  const fractionalPart = absValue - Math.floor(absValue);
  const adjustedValue = integerPart + fractionalPart;
  const separatedAdjustedValue = parseFloat(adjustedValue.toPrecision(finalPrecision)).toString().split(".");
  const isIntPartNotChanged = separatedAdjustedValue[0] === integerPart.toString();
  if (isIntPartNotChanged) {
    return parseFloat(`${integerValuePart}.${separatedAdjustedValue[1]}`);
  }
  return parseFloat(sourceValue.toPrecision(finalPrecision));
}
function adjustExponential(value, precision) {
  const expValue = value.toExponential();
  const [mantissa, _exponent] = expValue.split("e");
  if (!mantissa.includes(".")) {
    return parseFloat(expValue);
  }
  return parseFloat(value.toPrecision(precision));
}
function getPrecision(value) {
  const str = value.toString();
  if (!str.includes(".")) {
    return 0;
  }
  const [_, fractionalPart] = str.split(".");
  const positionOfDelimiter = fractionalPart.indexOf("e");
  return positionOfDelimiter >= 0 ? positionOfDelimiter : fractionalPart.length;
}
function getRoot(x, n) {
  if (x < 0 && n % 2 !== 1) {
    return NaN;
  }
  const y = Math.abs(x) ** (1 / n);
  return n % 2 === 1 && x < 0 ? -y : y;
}
function solveCubicEquation(a, b, c, d) {
  if (Math.abs(a) < 1e-8) {
    a = b;
    b = c;
    c = d;
    if (Math.abs(a) < 1e-8) {
      a = b;
      b = c;
      if (Math.abs(a) < 1e-8) {
        return [];
      }
      return [-b / a];
    }
    const D2 = b * b - 4 * a * c;
    if (Math.abs(D2) < 1e-8) {
      return [-b / (2 * a)];
    }
    if (D2 > 0) {
      return [(-b + Math.sqrt(D2)) / (2 * a), (-b - Math.sqrt(D2)) / (2 * a)];
    }
    return [];
  }
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  let roots;
  let u;
  if (Math.abs(p) < 1e-8) {
    roots = [getRoot(-q, 3)];
  } else if (Math.abs(q) < 1e-8) {
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    const D3 = q * q / 4 + p * p * p / 27;
    if (Math.abs(D3) < 1e-8) {
      roots = [-1.5 * q / p, 3 * q / p];
    } else if (D3 > 0) {
      u = getRoot(-q / 2 - Math.sqrt(D3), 3);
      roots = [u - p / (3 * u)];
    } else {
      u = 2 * Math.sqrt(-p / 3);
      const t = Math.acos(3 * q / p / u) / 3;
      const k = 2 * Math.PI / 3;
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
    }
  }
  for (let i = 0; i < roots.length; i++) {
    roots[i] -= b / (3 * a);
  }
  return roots;
}
function trunc(value) {
  return Math.trunc ? Math.trunc(value) : value > 0 ? Math.floor(value) : Math.ceil(value);
}
function getRemainderByDivision(dividend, divider, digitsCount) {
  if (divider === parseInt(divider, 10)) {
    return dividend % divider;
  }
  const quotient = roundFloatPart(dividend / divider, digitsCount);
  return (quotient - parseInt(quotient, 10)) * divider;
}
function getExponentLength(value) {
  var _valueString$split$;
  const valueString = value.toString();
  return (null === (_valueString$split$ = valueString.split(".")[1]) || void 0 === _valueString$split$ ? void 0 : _valueString$split$.length) || parseInt(valueString.split("e-")[1], 10) || 0;
}
function roundFloatPart(value) {
  let digitsCount = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  return parseFloat(value.toFixed(digitsCount));
}

export {
  default_date_names_default,
  getFormatter,
  sign,
  fitIntoRange,
  inRange,
  getExponent,
  multiplyInExponentialForm,
  adjust,
  getPrecision,
  solveCubicEquation,
  trunc,
  getRemainderByDivision,
  getExponentLength,
  roundFloatPart
};
//# sourceMappingURL=chunk-VZ4XASFZ.js.map
