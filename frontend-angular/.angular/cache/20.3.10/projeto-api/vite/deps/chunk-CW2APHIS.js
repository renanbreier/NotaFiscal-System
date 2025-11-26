import {
  number_default
} from "./chunk-V2OZZIWV.js";
import {
  core_default
} from "./chunk-PCELI6Y7.js";
import {
  default_date_names_default,
  getFormatter
} from "./chunk-VZ4XASFZ.js";
import {
  dependency_injector_default,
  each,
  errors_default,
  escapeRegExp,
  extend,
  isString,
  logger
} from "./chunk-EJA7O4BW.js";

// node_modules/devextreme/esm/common/core/localization/ldml/date.format.js
var FORMAT_SEPARATORS = " .,:;/\\<>()-[]،";
var checkDigit = function(char) {
  const code = char && number_default.convertDigits(char, false).charCodeAt(0);
  const zeroCode = number_default.convertDigits("0", false).charCodeAt(0);
  return zeroCode <= code && code < zeroCode + 10;
};
var checkPatternContinue = function(text, patterns, index, isDigit) {
  const char = text[index];
  const nextChar = text[index + 1];
  if (!isDigit) {
    if ("." === char || " " === char && ". m." === text.slice(index - 1, index + 3)) {
      return true;
    }
    if ("-" === char && !checkDigit(nextChar)) {
      return true;
    }
  }
  const isDigitChanged = isDigit && patterns.some(((pattern) => text[index] !== pattern[index]));
  return FORMAT_SEPARATORS.indexOf(char) < 0 && isDigit === checkDigit(char) && (!isDigit || isDigitChanged);
};
var getPatternStartIndex = function(defaultPattern, index) {
  if (!checkDigit(defaultPattern[index])) {
    while (index > 0 && !checkDigit(defaultPattern[index - 1]) && ("." === defaultPattern[index - 1] || FORMAT_SEPARATORS.indexOf(defaultPattern[index - 1]) < 0)) {
      index--;
    }
  }
  return index;
};
var getDifference = function(defaultPattern, patterns, processedIndexes, isDigit) {
  let i = 0;
  const result = [];
  const patternsFilter = function(pattern) {
    return defaultPattern[i] !== pattern[i] && (void 0 === isDigit || checkDigit(defaultPattern[i]) === isDigit);
  };
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  for (i = 0; i < defaultPattern.length; i++) {
    if (processedIndexes.indexOf(i) < 0 && patterns.filter(patternsFilter).length) {
      i = getPatternStartIndex(defaultPattern, i);
      do {
        isDigit = checkDigit(defaultPattern[i]);
        if (!result.length && !isDigit && checkDigit(patterns[0][i])) {
          break;
        }
        result.push(i);
        processedIndexes.unshift(i);
        i++;
      } while (defaultPattern[i] && checkPatternContinue(defaultPattern, patterns, i, isDigit));
      break;
    }
  }
  if (1 === result.length && ("0" === defaultPattern[processedIndexes[0] - 1] || "٠" === defaultPattern[processedIndexes[0] - 1])) {
    processedIndexes.unshift(processedIndexes[0] - 1);
  }
  return result;
};
var replaceCharsCore = function(pattern, indexes, char, patternPositions) {
  const baseCharIndex = indexes[0];
  const patternIndex = baseCharIndex < patternPositions.length ? patternPositions[baseCharIndex] : baseCharIndex;
  indexes.forEach((function(_, index) {
    pattern = pattern.substr(0, patternIndex + index) + (char.length > 1 ? char[index] : char) + pattern.substr(patternIndex + index + 1);
  }));
  if (1 === indexes.length) {
    pattern = pattern.replace("0" + char, char + char);
    pattern = pattern.replace("٠" + char, char + char);
  }
  return pattern;
};
var replaceChars = function(pattern, indexes, char, patternPositions) {
  let i;
  let index;
  let patternIndex;
  if (!checkDigit(pattern[indexes[0]] || "0")) {
    const letterCount = Math.max(indexes.length <= 3 ? 3 : 4, char.length);
    while (indexes.length > letterCount) {
      index = indexes.pop();
      patternIndex = patternPositions[index];
      patternPositions[index] = -1;
      for (i = index + 1; i < patternPositions.length; i++) {
        patternPositions[i]--;
      }
      pattern = pattern.substr(0, patternIndex) + pattern.substr(patternIndex + 1);
    }
    index = indexes[indexes.length - 1] + 1, patternIndex = index < patternPositions.length ? patternPositions[index] : index;
    while (indexes.length < letterCount) {
      indexes.push(indexes[indexes.length - 1] + 1);
      for (i = index; i < patternPositions.length; i++) {
        patternPositions[i]++;
      }
      pattern = pattern.substr(0, patternIndex) + " " + pattern.substr(patternIndex);
    }
  }
  pattern = replaceCharsCore(pattern, indexes, char, patternPositions);
  return pattern;
};
var formatValue = function(value, formatter) {
  if (Array.isArray(value)) {
    return value.map((function(value2) {
      return (formatter(value2) || "").toString();
    }));
  }
  return (formatter(value) || "").toString();
};
var ESCAPE_CHARS_REGEXP = /[a-zA-Z]/g;
var escapeChars = function(pattern, defaultPattern, processedIndexes, patternPositions) {
  const escapeIndexes = defaultPattern.split("").map((function(char, index) {
    if (processedIndexes.indexOf(index) < 0 && (char.match(ESCAPE_CHARS_REGEXP) || "'" === char)) {
      return patternPositions[index];
    }
    return -1;
  }));
  pattern = pattern.split("").map((function(char, index) {
    let result = char;
    const isCurrentCharEscaped = escapeIndexes.indexOf(index) >= 0;
    const isPrevCharEscaped = index > 0 && escapeIndexes.indexOf(index - 1) >= 0;
    const isNextCharEscaped = escapeIndexes.indexOf(index + 1) >= 0;
    if (isCurrentCharEscaped) {
      if (!isPrevCharEscaped) {
        result = "'" + result;
      }
      if (!isNextCharEscaped) {
        result += "'";
      }
    }
    return result;
  })).join("");
  return pattern;
};
var getFormat = function(formatter) {
  const processedIndexes = [];
  const defaultPattern = formatValue(new Date(2009, 8, 8, 6, 5, 4), formatter);
  const patternPositions = defaultPattern.split("").map((function(_, index) {
    return index;
  }));
  let result = defaultPattern;
  const replacedPatterns = {};
  const datePatterns = [{
    date: new Date(2009, 8, 8, 6, 5, 4, 111),
    pattern: "S"
  }, {
    date: new Date(2009, 8, 8, 6, 5, 2),
    pattern: "s"
  }, {
    date: new Date(2009, 8, 8, 6, 2, 4),
    pattern: "m"
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "H",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 2, 5, 4),
    pattern: "h",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "a",
    isDigit: false
  }, {
    date: new Date(2009, 8, 1, 6, 5, 4),
    pattern: "d"
  }, {
    date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
    pattern: "E"
  }, {
    date: new Date(2009, 9, 6, 6, 5, 4),
    pattern: "M"
  }, {
    date: new Date(1998, 8, 8, 6, 5, 4),
    pattern: "y"
  }];
  if (!result) {
    return;
  }
  datePatterns.forEach((function(test) {
    const diff = getDifference(defaultPattern, formatValue(test.date, formatter), processedIndexes, test.isDigit);
    const pattern = "M" === test.pattern && !replacedPatterns.d ? "L" : test.pattern;
    result = replaceChars(result, diff, pattern, patternPositions);
    replacedPatterns[pattern] = diff.length;
  }));
  result = escapeChars(result, defaultPattern, processedIndexes, patternPositions);
  if (processedIndexes.length) {
    return result;
  }
};

// node_modules/devextreme/esm/common/core/localization/ldml/date.parser.js
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var monthRegExpGenerator = function(count, dateParts) {
  if (count > 2) {
    return Object.keys(FORMAT_TYPES).map((function(count2) {
      return ["format", "standalone"].map((function(type) {
        return dateParts.getMonthNames(FORMAT_TYPES[count2], type).join("|");
      })).join("|");
    })).join("|");
  }
  return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
};
var PATTERN_REGEXPS = {
  ":": function(count, dateParts) {
    const countSuffix = count > 1 ? `{${count}}` : "";
    let timeSeparator = escapeRegExp(dateParts.getTimeSeparator());
    ":" !== timeSeparator && (timeSeparator = `${timeSeparator}|:`);
    return `${timeSeparator}${countSuffix}`;
  },
  y: function(count) {
    return 2 === count ? `[0-9]{${count}}` : "[0-9]+?";
  },
  M: monthRegExpGenerator,
  L: monthRegExpGenerator,
  Q: function(count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").join("|");
    }
    return "0?[1-4]";
  },
  E: function(count, dateParts) {
    return "\\D*";
  },
  a: function(count, dateParts) {
    return dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format").join("|");
  },
  d: function(count) {
    return 2 === count ? "3[01]|[12][0-9]|0?[1-9]" : "0??[1-9]|[12][0-9]|3[01]";
  },
  H: function(count) {
    return 2 === count ? "2[0-3]|1[0-9]|0?[0-9]" : "0??[0-9]|1[0-9]|2[0-3]";
  },
  h: function(count) {
    return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
  },
  m: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  s: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  S: function(count) {
    return `[0-9]{1,${count}}`;
  },
  w: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  x: function(count) {
    return 3 === count ? "[+-](?:2[0-3]|[01][0-9]):(?:[0-5][0-9])|Z" : "[+-](?:2[0-3]|[01][0-9])(?:[0-5][0-9])|Z";
  }
};
var parseNumber = Number;
var caseInsensitiveIndexOf = function(array, value) {
  return array.map(((item) => item.toLowerCase())).indexOf(value.toLowerCase());
};
var monthPatternParser = function(text, count, dateParts) {
  if (count > 2) {
    return ["format", "standalone"].map((function(type) {
      return Object.keys(FORMAT_TYPES).map((function(count2) {
        const monthNames = dateParts.getMonthNames(FORMAT_TYPES[count2], type);
        return caseInsensitiveIndexOf(monthNames, text);
      }));
    })).reduce((function(a, b) {
      return a.concat(b);
    })).filter((function(index) {
      return index >= 0;
    }))[0];
  }
  return parseNumber(text) - 1;
};
var PATTERN_PARSERS = {
  y: function(text, count) {
    const year = parseNumber(text);
    if (2 === count) {
      return year < 30 ? 2e3 + year : 1900 + year;
    }
    return year;
  },
  M: monthPatternParser,
  L: monthPatternParser,
  Q: function(text, count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").indexOf(text);
    }
    return parseNumber(text) - 1;
  },
  E: function(text, count, dateParts) {
    const dayNames = dateParts.getDayNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(dayNames, text);
  },
  a: function(text, count, dateParts) {
    const periodNames = dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(periodNames, text);
  },
  d: parseNumber,
  H: parseNumber,
  h: parseNumber,
  m: parseNumber,
  s: parseNumber,
  S: function(text, count) {
    count = Math.max(count, 3);
    text = text.slice(0, 3);
    while (count < 3) {
      text += "0";
      count++;
    }
    return parseNumber(text);
  }
};
var ORDERED_PATTERNS = ["y", "M", "d", "h", "m", "s", "S"];
var PATTERN_SETTERS = {
  y: "setFullYear",
  M: "setMonth",
  L: "setMonth",
  a: function(date, value, datePartValues) {
    let hours = date.getHours();
    const hourPartValue = datePartValues.h;
    if (void 0 !== hourPartValue && hourPartValue !== hours) {
      hours--;
    }
    if (!value && 12 === hours) {
      hours = 0;
    } else if (value && 12 !== hours) {
      hours += 12;
    }
    date.setHours(hours);
  },
  d: "setDate",
  H: "setHours",
  h: "setHours",
  m: "setMinutes",
  s: "setSeconds",
  S: "setMilliseconds"
};
var getSameCharCount = function(text, index) {
  const char = text[index];
  if (!char) {
    return 0;
  }
  let count = 0;
  do {
    index++;
    count++;
  } while (text[index] === char);
  return count;
};
var createPattern = function(char, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += char;
  }
  return result;
};
var getRegExpInfo = function(format, dateParts) {
  let regexpText = "";
  let stubText = "";
  let isEscaping;
  const patterns = [];
  const addPreviousStub = function() {
    if (stubText) {
      patterns.push(`'${stubText}'`);
      regexpText += `${escapeRegExp(stubText)})`;
      stubText = "";
    }
  };
  for (let i = 0; i < format.length; i++) {
    const char = format[i];
    const isEscapeChar = "'" === char;
    const regexpPart = PATTERN_REGEXPS[char];
    if (isEscapeChar) {
      isEscaping = !isEscaping;
      if ("'" !== format[i - 1]) {
        continue;
      }
    }
    if (regexpPart && !isEscaping) {
      const count = getSameCharCount(format, i);
      const pattern = createPattern(char, count);
      addPreviousStub();
      patterns.push(pattern);
      regexpText += `(${regexpPart(count, dateParts)})`;
      i += count - 1;
    } else {
      if (!stubText) {
        regexpText += "(";
      }
      stubText += char;
    }
  }
  addPreviousStub();
  if (!isPossibleForParsingFormat(patterns)) {
    logger.warn(`The following format may be parsed incorrectly: ${format}.`);
  }
  return {
    patterns,
    regexp: new RegExp(`^${regexpText}$`, "i")
  };
};
var digitFieldSymbols = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
var isPossibleForParsingFormat = function(patterns) {
  const isDigitPattern = (pattern) => {
    if (!pattern) {
      return false;
    }
    const char = pattern[0];
    return ["y", "S"].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3;
  };
  let possibleForParsing = true;
  let ambiguousDigitPatternsCount = 0;
  return patterns.every(((pattern, index, patterns2) => {
    if (isDigitPattern(pattern)) {
      if (((pattern2) => "S" !== pattern2[0] && 2 !== pattern2.length)(pattern)) {
        possibleForParsing = ++ambiguousDigitPatternsCount < 2;
      }
      if (!isDigitPattern(patterns2[index + 1])) {
        ambiguousDigitPatternsCount = 0;
      }
    }
    return possibleForParsing;
  }));
};
var getPatternSetters = function() {
  return PATTERN_SETTERS;
};
var setPatternPart = function(date, pattern, text, dateParts, datePartValues) {
  const patternChar = pattern[0];
  const partSetter = PATTERN_SETTERS[patternChar];
  const partParser = PATTERN_PARSERS[patternChar];
  if (partSetter && partParser) {
    const value = partParser(text, pattern.length, dateParts);
    datePartValues[pattern] = value;
    if (date[partSetter]) {
      date[partSetter](value);
    } else {
      partSetter(date, value, datePartValues);
    }
  }
};
var setPatternPartFromNow = function(date, pattern, now) {
  const setterName = PATTERN_SETTERS[pattern];
  const getterName = "g" + setterName.substr(1);
  const value = now[getterName]();
  date[setterName](value);
};
var getShortPatterns = function(fullPatterns) {
  return fullPatterns.map((function(pattern) {
    if ("'" === pattern[0]) {
      return "";
    } else {
      return "H" === pattern[0] ? "h" : pattern[0];
    }
  }));
};
var getMaxOrderedPatternIndex = function(patterns) {
  const indexes = patterns.map((function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern);
  }));
  return Math.max.apply(Math, indexes);
};
var getOrderedFormatPatterns = function(formatPatterns) {
  const otherPatterns = formatPatterns.filter((function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern) < 0;
  }));
  return ORDERED_PATTERNS.concat(otherPatterns);
};
var getParser = function(format, dateParts) {
  const regExpInfo = getRegExpInfo(format, dateParts);
  return function(text) {
    const regExpResult = regExpInfo.regexp.exec(text);
    if (regExpResult) {
      const now = /* @__PURE__ */ new Date();
      const date = new Date(now.getFullYear(), 0, 1);
      const formatPatterns = getShortPatterns(regExpInfo.patterns);
      const maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
      const orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
      const datePartValues = {};
      orderedFormatPatterns.forEach((function(pattern, index) {
        if (!pattern || index < ORDERED_PATTERNS.length && index > maxPatternIndex) {
          return;
        }
        const patternIndex = formatPatterns.indexOf(pattern);
        if (patternIndex >= 0) {
          const regExpPattern = regExpInfo.patterns[patternIndex];
          const regExpText = regExpResult[patternIndex + 1];
          setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues);
        } else {
          setPatternPartFromNow(date, pattern, now);
        }
      }));
      return date;
    }
    return null;
  };
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/first_day_of_week_data.js
var first_day_of_week_data_default = {
  "af-NA": 1,
  agq: 1,
  ak: 1,
  ar: 6,
  "ar-EH": 1,
  "ar-ER": 1,
  "ar-KM": 1,
  "ar-LB": 1,
  "ar-MA": 1,
  "ar-MR": 1,
  "ar-PS": 1,
  "ar-SO": 1,
  "ar-SS": 1,
  "ar-TD": 1,
  "ar-TN": 1,
  asa: 1,
  ast: 1,
  az: 1,
  "az-Cyrl": 1,
  bas: 1,
  be: 1,
  bem: 1,
  bez: 1,
  bg: 1,
  bm: 1,
  br: 1,
  bs: 1,
  "bs-Cyrl": 1,
  ca: 1,
  ce: 1,
  cgg: 1,
  ckb: 6,
  cs: 1,
  cy: 1,
  da: 1,
  de: 1,
  dje: 1,
  dsb: 1,
  dua: 1,
  dyo: 1,
  ee: 1,
  el: 1,
  "en-001": 1,
  "en-AE": 6,
  "en-BI": 1,
  "en-MP": 1,
  "en-MV": 5,
  "en-SD": 6,
  eo: 1,
  es: 1,
  et: 1,
  eu: 1,
  ewo: 1,
  fa: 6,
  ff: 1,
  "ff-Adlm": 1,
  fi: 1,
  fo: 1,
  fr: 1,
  "fr-DJ": 6,
  "fr-DZ": 6,
  "fr-SY": 6,
  fur: 1,
  fy: 1,
  ga: 1,
  gd: 1,
  gl: 1,
  gsw: 1,
  gv: 1,
  ha: 1,
  hr: 1,
  hsb: 1,
  hu: 1,
  hy: 1,
  ia: 1,
  ig: 1,
  is: 1,
  it: 1,
  jgo: 1,
  jmc: 1,
  ka: 1,
  kab: 6,
  kde: 1,
  kea: 1,
  khq: 1,
  kk: 1,
  kkj: 1,
  kl: 1,
  "ko-KP": 1,
  ksb: 1,
  ksf: 1,
  ksh: 1,
  ku: 1,
  kw: 1,
  ky: 1,
  lag: 1,
  lb: 1,
  lg: 1,
  ln: 1,
  lrc: 6,
  lt: 1,
  lu: 1,
  lv: 1,
  "mas-TZ": 1,
  mfe: 1,
  mg: 1,
  mgo: 1,
  mi: 1,
  mk: 1,
  mn: 1,
  ms: 1,
  mua: 1,
  mzn: 6,
  naq: 1,
  nds: 1,
  nl: 1,
  nmg: 1,
  nnh: 1,
  no: 1,
  nus: 1,
  nyn: 1,
  os: 1,
  pcm: 1,
  pl: 1,
  ps: 6,
  "pt-AO": 1,
  "pt-CH": 1,
  "pt-CV": 1,
  "pt-GQ": 1,
  "pt-GW": 1,
  "pt-LU": 1,
  "pt-ST": 1,
  "pt-TL": 1,
  "qu-BO": 1,
  "qu-EC": 1,
  rm: 1,
  rn: 1,
  ro: 1,
  rof: 1,
  ru: 1,
  rw: 1,
  rwk: 1,
  sah: 1,
  sbp: 1,
  sc: 1,
  se: 1,
  ses: 1,
  sg: 1,
  shi: 1,
  "shi-Latn": 1,
  si: 1,
  sk: 1,
  sl: 1,
  smn: 1,
  so: 1,
  "so-DJ": 6,
  sq: 1,
  sr: 1,
  "sr-Latn": 1,
  sv: 1,
  sw: 1,
  "ta-LK": 1,
  "ta-MY": 1,
  teo: 1,
  tg: 1,
  "ti-ER": 1,
  tk: 1,
  to: 1,
  tr: 1,
  tt: 1,
  twq: 1,
  tzm: 1,
  uk: 1,
  uz: 1,
  "uz-Arab": 6,
  "uz-Cyrl": 1,
  vai: 1,
  "vai-Latn": 1,
  vi: 1,
  vun: 1,
  wae: 1,
  wo: 1,
  xog: 1,
  yav: 1,
  yi: 1,
  yo: 1,
  zgh: 1
};

// node_modules/devextreme/esm/common/core/localization/intl/date.js
var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
var getIntlFormatter = (format) => (date) => {
  if (!format.timeZoneName) {
    const year = date.getFullYear();
    const recognizableAsTwentyCentury = String(year).length < 3;
    const safeYearShift = 400;
    const temporaryYearValue = recognizableAsTwentyCentury ? year + safeYearShift : year;
    const utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    if (recognizableAsTwentyCentury) {
      utcDate.setFullYear(year);
    }
    const utcFormat = extend({
      timeZone: "UTC"
    }, format);
    return formatDateTime(utcDate, utcFormat);
  }
  return formatDateTime(date, format);
};
var formattersCache = {};
var getFormatter2 = (format) => {
  const key = core_default.locale() + "/" + JSON.stringify(format);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.DateTimeFormat(core_default.locale(), format).format;
  }
  return formattersCache[key];
};
function formatDateTime(date, format) {
  return getFormatter2(format)(date).replace(SYMBOLS_TO_REMOVE_REGEX, "").replace(NARROW_NO_BREAK_SPACE_REGEX, " ");
}
var formatNumber = (number) => new Intl.NumberFormat(core_default.locale()).format(number);
var getAlternativeNumeralsMap = /* @__PURE__ */ (() => {
  const numeralsMapCache = {};
  return (locale) => {
    if (!(locale in numeralsMapCache)) {
      if ("0" === formatNumber(0)) {
        numeralsMapCache[locale] = false;
        return false;
      }
      numeralsMapCache[locale] = {};
      for (let i = 0; i < 10; ++i) {
        numeralsMapCache[locale][formatNumber(i)] = i;
      }
    }
    return numeralsMapCache[locale];
  };
})();
var normalizeNumerals = (dateString) => {
  const alternativeNumeralsMap = getAlternativeNumeralsMap(core_default.locale());
  if (!alternativeNumeralsMap) {
    return dateString;
  }
  return dateString.split("").map(((sign) => sign in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign]) : sign)).join("");
};
var removeLeadingZeroes = (str) => str.replace(/(\D)0+(\d)/g, "$1$2");
var dateStringEquals = (actual, expected) => removeLeadingZeroes(actual) === removeLeadingZeroes(expected);
var normalizeMonth = (text) => text.replace("d’", "de ");
var intlFormats = {
  day: {
    day: "numeric"
  },
  date: {
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  dayofweek: {
    weekday: "long"
  },
  longdate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  longdatelongtime: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  longtime: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  month: {
    month: "long"
  },
  monthandday: {
    month: "long",
    day: "numeric"
  },
  monthandyear: {
    year: "numeric",
    month: "long"
  },
  shortdate: {},
  shorttime: {
    hour: "numeric",
    minute: "numeric"
  },
  shortyear: {
    year: "2-digit"
  },
  year: {
    year: "numeric"
  }
};
Object.defineProperty(intlFormats, "shortdateshorttime", {
  get: function() {
    const defaultOptions = Intl.DateTimeFormat(core_default.locale()).resolvedOptions();
    return {
      year: defaultOptions.year,
      month: defaultOptions.month,
      day: defaultOptions.day,
      hour: "numeric",
      minute: "numeric"
    };
  }
});
var getIntlFormat = (format) => "string" === typeof format && intlFormats[format.toLowerCase()];
var monthNameStrategies = {
  standalone: function(monthIndex, monthFormat) {
    const date = new Date(1999, monthIndex, 13, 1);
    const dateString = getIntlFormatter({
      month: monthFormat
    })(date);
    return dateString;
  },
  format: function(monthIndex, monthFormat) {
    const date = new Date(0, monthIndex, 13, 1);
    const dateString = normalizeMonth(getIntlFormatter({
      day: "numeric",
      month: monthFormat
    })(date));
    const parts = dateString.split(" ").filter(((part) => part.indexOf("13") < 0));
    if (1 === parts.length) {
      return parts[0];
    } else if (2 === parts.length) {
      return parts[0].length > parts[1].length ? parts[0] : parts[1];
    }
    return monthNameStrategies.standalone(monthIndex, monthFormat);
  }
};
var date_default = {
  engine: function() {
    return "intl";
  },
  getMonthNames: function(format, type) {
    const monthFormat = {
      wide: "long",
      abbreviated: "short",
      narrow: "narrow"
    }[format || "wide"];
    type = "format" === type ? type : "standalone";
    return Array.apply(null, new Array(12)).map(((_, monthIndex) => monthNameStrategies[type](monthIndex, monthFormat)));
  },
  getDayNames: function(format) {
    const result = ((format2) => Array.apply(null, new Array(7)).map(((_, dayIndex) => getIntlFormatter({
      weekday: format2
    })(new Date(0, 0, dayIndex)))))({
      wide: "long",
      abbreviated: "short",
      short: "narrow",
      narrow: "narrow"
    }[format || "wide"]);
    return result;
  },
  getPeriodNames: function() {
    const hour12Formatter = getIntlFormatter({
      hour: "numeric",
      hour12: true
    });
    return [1, 13].map(((hours) => {
      const hourNumberText = formatNumber(1);
      const timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
      if (2 !== timeParts.length) {
        return "";
      }
      const biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
      return biggerPart.trim();
    }));
  },
  format: function(date, format) {
    if (!date) {
      return;
    }
    if (!format) {
      return date;
    }
    if ("function" !== typeof format && !format.formatter) {
      format = format.type || format;
    }
    const intlFormat = getIntlFormat(format);
    if (intlFormat) {
      return getIntlFormatter(intlFormat)(date);
    }
    const formatType = typeof format;
    if (format.formatter || "function" === formatType || "string" === formatType) {
      return this.callBase.apply(this, arguments);
    }
    return getIntlFormatter(format)(date);
  },
  parse: function(dateString, format) {
    let formatter;
    if (format && !format.parser && "string" === typeof dateString) {
      dateString = normalizeMonth(dateString);
      formatter = (date) => normalizeMonth(this.format(date, format));
    }
    return this.callBase(dateString, formatter || format);
  },
  _parseDateBySimpleFormat: function(dateString, format) {
    dateString = normalizeNumerals(dateString);
    const formatParts = this.getFormatParts(format);
    const dateParts = dateString.split(/\D+/).filter(((part) => part.length > 0));
    if (formatParts.length !== dateParts.length) {
      return;
    }
    const dateArgs = this._generateDateArgs(formatParts, dateParts);
    const constructValidDate = (ampmShift) => {
      const parsedDate = ((dateArgs2, ampmShift2) => {
        const hoursShift = ampmShift2 ? 12 : 0;
        return new Date(dateArgs2.year, dateArgs2.month, dateArgs2.day, (dateArgs2.hours + hoursShift) % 24, dateArgs2.minutes, dateArgs2.seconds);
      })(dateArgs, ampmShift);
      if (dateStringEquals(normalizeNumerals(this.format(parsedDate, format)), dateString)) {
        return parsedDate;
      }
    };
    return constructValidDate(false) || constructValidDate(true);
  },
  _generateDateArgs: function(formatParts, dateParts) {
    const currentDate = /* @__PURE__ */ new Date();
    const dateArgs = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    formatParts.forEach(((formatPart, index) => {
      const datePart = dateParts[index];
      let parsed = parseInt(datePart, 10);
      if ("month" === formatPart) {
        parsed -= 1;
      }
      dateArgs[formatPart] = parsed;
    }));
    return dateArgs;
  },
  formatUsesMonthName: function(format) {
    if ("object" === typeof format && !(format.type || format.format)) {
      return "long" === format.month;
    }
    return this.callBase.apply(this, arguments);
  },
  formatUsesDayName: function(format) {
    if ("object" === typeof format && !(format.type || format.format)) {
      return "long" === format.weekday;
    }
    return this.callBase.apply(this, arguments);
  },
  getTimeSeparator: function() {
    return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })).replace(/\d/g, "");
  },
  getFormatParts: function(format) {
    if ("string" === typeof format) {
      return this.callBase(format);
    }
    const intlFormat = extend({}, intlFormats[format.toLowerCase()]);
    const date = new Date(2001, 2, 4, 5, 6, 7);
    let formattedDate = getIntlFormatter(intlFormat)(date);
    formattedDate = normalizeNumerals(formattedDate);
    return [{
      name: "year",
      value: 1
    }, {
      name: "month",
      value: 3
    }, {
      name: "day",
      value: 4
    }, {
      name: "hours",
      value: 5
    }, {
      name: "minutes",
      value: 6
    }, {
      name: "seconds",
      value: 7
    }].map(((part) => ({
      name: part.name,
      index: formattedDate.indexOf(part.value)
    }))).filter(((part) => part.index > -1)).sort(((a, b) => a.index - b.index)).map(((part) => part.name));
  }
};

// node_modules/devextreme/esm/common/core/localization/date.js
var hasIntl = "undefined" !== typeof Intl;
var FORMATS_TO_PATTERN_MAP = {
  shortdate: "M/d/y",
  shorttime: "h:mm a",
  longdate: "EEEE, MMMM d, y",
  longtime: "h:mm:ss a",
  monthandday: "MMMM d",
  monthandyear: "MMMM y",
  quarterandyear: "QQQ y",
  day: "d",
  year: "y",
  shortdateshorttime: "M/d/y, h:mm a",
  longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
  month: "LLLL",
  shortyear: "yy",
  dayofweek: "EEEE",
  quarter: "QQQ",
  hour: "HH",
  minute: "mm",
  second: "ss",
  millisecond: "SSS",
  "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var possiblePartPatterns = {
  year: ["y", "yy", "yyyy"],
  day: ["d", "dd"],
  month: ["M", "MM", "MMM", "MMMM"],
  hours: ["H", "HH", "h", "hh", "ah"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  milliseconds: ["S", "SS", "SSS"]
};
var dateLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _getPatternByFormat: function(format) {
    return FORMATS_TO_PATTERN_MAP[format.toLowerCase()];
  },
  _expandPattern: function(pattern) {
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName: function(format) {
    return -1 !== this._expandPattern(format).indexOf("MMMM");
  },
  formatUsesDayName: function(format) {
    return -1 !== this._expandPattern(format).indexOf("EEEE");
  },
  getFormatParts: function(format) {
    const pattern = this._getPatternByFormat(format) || format;
    const result = [];
    each(pattern.split(/\W+/), ((_, formatPart) => {
      each(possiblePartPatterns, ((partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      }));
    }));
    return result;
  },
  getMonthNames: function(format) {
    return default_date_names_default.getMonthNames(format);
  },
  getDayNames: function(format) {
    return default_date_names_default.getDayNames(format);
  },
  getQuarterNames: function(format) {
    return default_date_names_default.getQuarterNames(format);
  },
  getPeriodNames: function(format) {
    return default_date_names_default.getPeriodNames(format);
  },
  getTimeSeparator: function() {
    return ":";
  },
  is24HourFormat: function(format) {
    const amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    const pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    const amTimeFormatted = this.format(amTime, format);
    const pmTimeFormatted = this.format(pmTime, format);
    for (let i = 0; i < amTimeFormatted.length; i++) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i]));
      }
    }
  },
  format: function(date, format) {
    if (!date) {
      return;
    }
    if (!format) {
      return date;
    }
    let formatter;
    if ("function" === typeof format) {
      formatter = format;
    } else if (format.formatter) {
      formatter = format.formatter;
    } else {
      format = format.type || format;
      if (isString(format)) {
        format = FORMATS_TO_PATTERN_MAP[format.toLowerCase()] || format;
        return number_default.convertDigits(getFormatter(format, this)(date));
      }
    }
    if (!formatter) {
      return;
    }
    return formatter(date);
  },
  parse: function(text, format) {
    const that = this;
    let ldmlFormat;
    let formatter;
    if (!text) {
      return;
    }
    if (!format) {
      return this.parse(text, "shortdate");
    }
    if (format.parser) {
      return format.parser(text);
    }
    if ("string" === typeof format && !FORMATS_TO_PATTERN_MAP[format.toLowerCase()]) {
      ldmlFormat = format;
    } else {
      formatter = (value) => {
        const text2 = that.format(value, format);
        return number_default.convertDigits(text2, true);
      };
      try {
        ldmlFormat = getFormat(formatter);
      } catch (e) {
      }
    }
    if (ldmlFormat) {
      text = number_default.convertDigits(text, true);
      return getParser(ldmlFormat, this)(text);
    }
    errors_default.log("W0012");
    const result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return;
    }
    return result;
  },
  firstDayOfWeekIndex: function() {
    const index = core_default.getValueByClosestLocale(((locale) => first_day_of_week_data_default[locale]));
    return void 0 === index ? 0 : index;
  }
});
if (hasIntl) {
  dateLocalization.inject(date_default);
}
var date_default2 = dateLocalization;

export {
  getFormat,
  getRegExpInfo,
  getPatternSetters,
  date_default2 as date_default
};
//# sourceMappingURL=chunk-CW2APHIS.js.map
