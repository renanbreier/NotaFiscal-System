import {
  Deferred,
  dependency_injector_default,
  dom_adapter_default,
  extendFromObject,
  getWindow,
  hasWindow,
  isDefined
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/core/m_http_request.js
var window = getWindow();
var nativeXMLHttpRequest = {
  getXhr: () => new window.XMLHttpRequest()
};
var httpRequest = dependency_injector_default(nativeXMLHttpRequest);

// node_modules/devextreme/esm/core/http_request.js
var http_request_default = httpRequest;

// node_modules/devextreme/esm/__internal/core/utils/m_ajax_utils.js
var window2 = getWindow();
var createScript = function(options) {
  const script = dom_adapter_default.createElement("script");
  for (const name in options) {
    script[name] = options[name];
  }
  return script;
};
var appendToHead = function(element) {
  return dom_adapter_default.getHead().appendChild(element);
};
var removeScript = function(scriptNode) {
  scriptNode.parentNode.removeChild(scriptNode);
};
var evalScript = function(code) {
  const script = createScript({
    text: code
  });
  appendToHead(script);
  removeScript(script);
};
var evalCrossDomainScript = function(url) {
  const script = createScript({
    src: url
  });
  return new Promise(((resolve, reject) => {
    const events = {
      load: resolve,
      error: reject
    };
    const loadHandler = function(e) {
      events[e.type]();
      removeScript(script);
    };
    for (const event in events) {
      dom_adapter_default.listen(script, event, loadHandler);
    }
    appendToHead(script);
  }));
};
function getMethod(options) {
  return (options.method || "GET").toUpperCase();
}
var paramsConvert = function(params) {
  const result = [];
  for (const name in params) {
    let value = params[name];
    if (void 0 === value) {
      continue;
    }
    if (null === value) {
      value = "";
    }
    if ("function" === typeof value) {
      value = value();
    }
    result.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }
  return result.join("&");
};
var getContentTypeHeader = function(options) {
  let defaultContentType;
  if (options.data && !options.upload && "GET" !== getMethod(options)) {
    defaultContentType = "application/x-www-form-urlencoded;charset=utf-8";
  }
  return options.contentType || defaultContentType;
};
var getAcceptHeader = function(options) {
  const dataType = options.dataType || "*";
  const scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
  const accepts = {
    "*": "*/*",
    text: "text/plain",
    html: "text/html",
    xml: "application/xml, text/xml",
    json: "application/json, text/javascript",
    jsonp: scriptAccept,
    script: scriptAccept
  };
  extendFromObject(accepts, options.accepts, true);
  return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"];
};
var getRequestHeaders = function(options) {
  const headers = options.headers || {};
  headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
  headers.Accept = headers.Accept || getAcceptHeader(options);
  if (!options.crossDomain && !headers["X-Requested-With"]) {
    headers["X-Requested-With"] = "XMLHttpRequest";
  }
  return headers;
};
var getJsonpOptions = function(options) {
  if ("jsonp" === options.dataType) {
    const random = Math.random().toString().replace(/\D/g, "");
    const callbackName = options.jsonpCallback || `dxCallback${Date.now()}_${random}`;
    const callbackParameter = options.jsonp || "callback";
    options.data = options.data || {};
    options.data[callbackParameter] = callbackName;
    return callbackName;
  }
};
var getRequestOptions = function(options, headers) {
  let params = options.data;
  const paramsAlreadyString = "string" === typeof params;
  let url = options.url || window2.location.href;
  if (!paramsAlreadyString && !options.cache) {
    params = params || {};
    params._ = Date.now();
  }
  if (params && !options.upload) {
    if (!paramsAlreadyString) {
      params = paramsConvert(params);
    }
    if ("GET" === getMethod(options)) {
      if ("" !== params) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + params;
      }
      params = null;
    } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
      params = params.replace(/%20/g, "+");
    }
  }
  return {
    url,
    parameters: params
  };
};
var isCrossDomain = function(url) {
  if (!hasWindow()) {
    return true;
  }
  let crossDomain = false;
  const originAnchor = dom_adapter_default.createElement("a");
  const urlAnchor = dom_adapter_default.createElement("a");
  originAnchor.href = window2.location.href;
  try {
    urlAnchor.href = url;
    urlAnchor.href = urlAnchor.href;
    crossDomain = `${originAnchor.protocol}//${originAnchor.host}` !== `${urlAnchor.protocol}//${urlAnchor.host}`;
  } catch (e) {
    crossDomain = true;
  }
  return crossDomain;
};

// node_modules/devextreme/esm/__internal/core/utils/m_ajax.js
var window3 = getWindow();
var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
  return status >= 200 && status < 300;
};
var hasContent = function(status) {
  return 204 !== status;
};
var getDataFromResponse = function(xhr) {
  return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText;
};
var postProcess = function(deferred, xhr, dataType) {
  const data = getDataFromResponse(xhr);
  switch (dataType) {
    case "jsonp":
      evalScript(data);
      break;
    case "script":
      evalScript(data);
      deferred.resolve(data, SUCCESS, xhr);
      break;
    case "json":
      try {
        deferred.resolve(JSON.parse(data), SUCCESS, xhr);
      } catch (e) {
        deferred.reject(xhr, PARSER_ERROR, e);
      }
      break;
    default:
      deferred.resolve(data, SUCCESS, xhr);
  }
};
var setHttpTimeout = function(timeout, xhr) {
  return timeout && setTimeout((function() {
    xhr.customStatus = TIMEOUT;
    xhr.abort();
  }), timeout);
};
var sendRequest = function(options) {
  const xhr = http_request_default.getXhr();
  const d = new Deferred();
  const result = d.promise();
  const async = isDefined(options.async) ? options.async : true;
  const {
    dataType
  } = options;
  const timeout = options.timeout || 0;
  let timeoutId;
  options.crossDomain = isCrossDomain(options.url);
  const needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
  if (void 0 === options.cache) {
    options.cache = !needScriptEvaluation;
  }
  const callbackName = getJsonpOptions(options);
  const headers = getRequestHeaders(options);
  const requestOptions = getRequestOptions(options, headers);
  const {
    url
  } = requestOptions;
  const {
    parameters
  } = requestOptions;
  if (callbackName) {
    window3[callbackName] = function(data) {
      d.resolve(data, SUCCESS, xhr);
    };
  }
  if (options.crossDomain && needScriptEvaluation) {
    const reject = function() {
      d.reject(xhr, ERROR);
    };
    const resolve = function() {
      if ("jsonp" === dataType) {
        return;
      }
      d.resolve(null, SUCCESS, xhr);
    };
    evalCrossDomainScript(url).then(resolve, reject);
    return result;
  }
  if (options.crossDomain && !("withCredentials" in xhr)) {
    d.reject(xhr, ERROR);
    return result;
  }
  xhr.open(getMethod(options), url, async, options.username, options.password);
  if (async) {
    xhr.timeout = timeout;
    timeoutId = setHttpTimeout(timeout, xhr);
  }
  xhr.onreadystatechange = function(e) {
    if (4 === xhr.readyState) {
      clearTimeout(timeoutId);
      if (isStatusSuccess(xhr.status)) {
        if (hasContent(xhr.status)) {
          postProcess(d, xhr, dataType);
        } else {
          d.resolve(null, NO_CONTENT, xhr);
        }
      } else {
        d.reject(xhr, xhr.customStatus || ERROR);
      }
    }
  };
  if (options.upload) {
    xhr.upload.onprogress = options.upload.onprogress;
    xhr.upload.onloadstart = options.upload.onloadstart;
    xhr.upload.onabort = options.upload.onabort;
  }
  if (options.xhrFields) {
    for (const field in options.xhrFields) {
      xhr[field] = options.xhrFields[field];
    }
  }
  if ("arraybuffer" === options.responseType) {
    xhr.responseType = options.responseType;
  }
  for (const name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name) && isDefined(headers[name])) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  if (options.beforeSend) {
    options.beforeSend(xhr);
  }
  xhr.send(parameters);
  result.abort = function() {
    xhr.abort();
  };
  return result;
};
var Ajax = dependency_injector_default({
  sendRequest
});

// node_modules/devextreme/esm/core/utils/ajax.js
var ajax_default = Ajax;

export {
  http_request_default,
  evalScript,
  evalCrossDomainScript,
  getMethod,
  getAcceptHeader,
  getRequestHeaders,
  getJsonpOptions,
  getRequestOptions,
  isCrossDomain,
  ajax_default
};
//# sourceMappingURL=chunk-BKRVOW4S.js.map
