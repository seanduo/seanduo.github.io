import {
  computed,
  getCurrentInstance,
  getCurrentScope,
  hasInjectionContext,
  inject,
  onMounted,
  ref,
  shallowRef,
  toValue,
  unref,
  watch,
  watchEffect
} from "./chunk-6CCHZG4T.js";

// node_modules/vitepress-carbon/dist/theme/index.js
import "D:/projects/my-website/node_modules/vitepress-carbon/dist/theme/styles/index.css";
import {} from "vitepress";
import Layout from "D:/projects/my-website/node_modules/vitepress-carbon/dist/theme/Layout.vue";

// node_modules/vitepress-carbon/node_modules/@vueuse/shared/dist/index.js
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
var injectLocal = (...args) => {
  var _getCurrentInstance;
  const key = args[0];
  const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
  const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
  if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
  if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
  return inject(...args);
};
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var isIOS = getIsIOS();
function getIsIOS() {
  var _window, _window2, _window3;
  return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function identity(arg) {
  return arg;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    return cache[str] || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}

// node_modules/vitepress-carbon/node_modules/@vueuse/core/dist/index.js
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  return watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
    onCleanup(() => {
      cleanups.forEach((fn) => fn());
    });
  }, { flush: "post" });
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) onMounted(() => {
    isMounted.value = true;
  }, instance);
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow, ssrWidth = useSSRWidth() } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
        if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value) return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var DEFAULT_UNITS = [
  {
    max: 6e4,
    value: 1e3,
    name: "second"
  },
  {
    max: 276e4,
    value: 6e4,
    name: "minute"
  },
  {
    max: 72e6,
    value: 36e5,
    name: "hour"
  },
  {
    max: 5184e5,
    value: 864e5,
    name: "day"
  },
  {
    max: 24192e5,
    value: 6048e5,
    name: "week"
  },
  {
    max: 28512e6,
    value: 2592e6,
    name: "month"
  },
  {
    max: Number.POSITIVE_INFINITY,
    value: 31536e6,
    name: "year"
  }
];
var TransitionPresets = Object.assign({}, { linear: identity }, {
  easeInSine: [
    0.12,
    0,
    0.39,
    0
  ],
  easeOutSine: [
    0.61,
    1,
    0.88,
    1
  ],
  easeInOutSine: [
    0.37,
    0,
    0.63,
    1
  ],
  easeInQuad: [
    0.11,
    0,
    0.5,
    0
  ],
  easeOutQuad: [
    0.5,
    1,
    0.89,
    1
  ],
  easeInOutQuad: [
    0.45,
    0,
    0.55,
    1
  ],
  easeInCubic: [
    0.32,
    0,
    0.67,
    0
  ],
  easeOutCubic: [
    0.33,
    1,
    0.68,
    1
  ],
  easeInOutCubic: [
    0.65,
    0,
    0.35,
    1
  ],
  easeInQuart: [
    0.5,
    0,
    0.75,
    0
  ],
  easeOutQuart: [
    0.25,
    1,
    0.5,
    1
  ],
  easeInOutQuart: [
    0.76,
    0,
    0.24,
    1
  ],
  easeInQuint: [
    0.64,
    0,
    0.78,
    0
  ],
  easeOutQuint: [
    0.22,
    1,
    0.36,
    1
  ],
  easeInOutQuint: [
    0.83,
    0,
    0.17,
    1
  ],
  easeInExpo: [
    0.7,
    0,
    0.84,
    0
  ],
  easeOutExpo: [
    0.16,
    1,
    0.3,
    1
  ],
  easeInOutExpo: [
    0.87,
    0,
    0.13,
    1
  ],
  easeInCirc: [
    0.55,
    0,
    1,
    0.45
  ],
  easeOutCirc: [
    0,
    0.55,
    0.45,
    1
  ],
  easeInOutCirc: [
    0.85,
    0,
    0.15,
    1
  ],
  easeInBack: [
    0.36,
    0,
    0.66,
    -0.56
  ],
  easeOutBack: [
    0.34,
    1.56,
    0.64,
    1
  ],
  easeInOutBack: [
    0.68,
    -0.6,
    0.32,
    1.6
  ]
});

// node_modules/vitepress-carbon/dist/theme/support/utils.js
import { withBase } from "vitepress";

// node_modules/vitepress-carbon/dist/theme/composables/data.js
import { useData as vitepressUseData } from "vitepress";
var useData = vitepressUseData;

// node_modules/vitepress-carbon/dist/shared.js
var inBrowser = typeof document !== "undefined";

// node_modules/vitepress-carbon/dist/theme/support/utils.js
function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

// node_modules/vitepress-carbon/dist/theme/support/sidebar.js
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const item of sidebar) {
    if (item.items) {
      lastGroupIndex = groups.push(item) - 1;
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base ?? _base;
    if (base && item.link)
      item.link = base + item.link;
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}

// node_modules/vitepress-carbon/dist/theme/composables/hash.js
var hashRef = ref(inBrowser ? location.hash : "");
if (inBrowser) {
  window.addEventListener("hashchange", () => {
    hashRef.value = location.hash;
  });
}

// node_modules/vitepress-carbon/dist/theme/composables/sidebar.js
function useSidebar() {
  const { frontmatter, page, theme } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const _sidebar = computed(() => {
    const sidebarConfig = theme.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const sidebar = ref(_sidebar.value);
  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value;
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside == null ? void 0 : hasAside.value)
      return frontmatter.value.aside == null ? theme.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}

// node_modules/vitepress-carbon/dist/theme/composables/local-nav.js
import { onContentUpdated } from "vitepress";

// node_modules/vitepress-carbon/dist/theme/composables/outline.js
import { getScrollOffset } from "vitepress";
var resolvedHeaders = [];
function getHeaders(range) {
  const headers = Array.from(document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")).filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers, range);
}
function serializeHeader(h2) {
  let ret = "";
  for (const node of Array.from(h2.childNodes)) {
    if (node.nodeType === 1) {
      if (node.classList.contains("VPBadge") || node.classList.contains("header-anchor") || node.classList.contains("ignore-header")) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) ?? 2;
  let high, low;
  if (levelsRange === "deep") {
    ;
    [high, low] = [2, 6];
  } else {
    ;
    [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange;
  }
  headers = headers.filter((h2) => h2.level >= high && h2.level <= low);
  resolvedHeaders.length = 0;
  for (const { element, link } of headers) {
    resolvedHeaders.push({ element, link });
  }
  const ret = [];
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];
        if (prev.level < cur.level) {
          ;
          (prev.children ?? (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }
  return ret;
}

// node_modules/vitepress-carbon/dist/theme/composables/local-nav.js
function useLocalNav() {
  const { theme, frontmatter } = useData();
  const headers = shallowRef([]);
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
  });
  return {
    headers,
    hasLocalNav
  };
}

// node_modules/vitepress-carbon/dist/theme/index.js
var VPCarbon = {
  Layout
};
export {
  VPCarbon,
  useLocalNav,
  useSidebar
};
//# sourceMappingURL=vitepress-carbon.js.map
