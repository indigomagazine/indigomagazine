(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Vf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function yx(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var Lf = { exports: {} },
  xo = {},
  Rf = { exports: {} },
  N = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kr = Symbol.for("react.element"),
  Sm = Symbol.for("react.portal"),
  xm = Symbol.for("react.fragment"),
  km = Symbol.for("react.strict_mode"),
  Em = Symbol.for("react.profiler"),
  Cm = Symbol.for("react.provider"),
  Pm = Symbol.for("react.context"),
  Tm = Symbol.for("react.forward_ref"),
  _m = Symbol.for("react.suspense"),
  Vm = Symbol.for("react.memo"),
  Lm = Symbol.for("react.lazy"),
  du = Symbol.iterator;
function Rm(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (du && e[du]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Af = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Df = Object.assign,
  Mf = {};
function Qn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Mf),
    (this.updater = n || Af);
}
Qn.prototype.isReactComponent = {};
Qn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Qn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Nf() {}
Nf.prototype = Qn.prototype;
function Kl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Mf),
    (this.updater = n || Af);
}
var Gl = (Kl.prototype = new Nf());
Gl.constructor = Kl;
Df(Gl, Qn.prototype);
Gl.isPureReactComponent = !0;
var pu = Array.isArray,
  If = Object.prototype.hasOwnProperty,
  Yl = { current: null },
  Of = { key: !0, ref: !0, __self: !0, __source: !0 };
function zf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      If.call(t, r) && !Of.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return {
    $$typeof: Kr,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Yl.current,
  };
}
function Am(e, t) {
  return {
    $$typeof: Kr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Xl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Kr;
}
function Dm(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var hu = /\/+/g;
function Xo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Dm("" + e.key)
    : t.toString(36);
}
function Ci(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Kr:
          case Sm:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + Xo(s, 0) : r),
      pu(i)
        ? ((n = ""),
          e != null && (n = e.replace(hu, "$&/") + "/"),
          Ci(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (Xl(i) &&
            (i = Am(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(hu, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), pu(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + Xo(o, l);
      s += Ci(o, t, n, a, i);
    }
  else if (((a = Rm(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + Xo(o, l++)), (s += Ci(o, t, n, a, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function ri(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ci(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Mm(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ve = { current: null },
  Pi = { transition: null },
  Nm = {
    ReactCurrentDispatcher: ve,
    ReactCurrentBatchConfig: Pi,
    ReactCurrentOwner: Yl,
  };
N.Children = {
  map: ri,
  forEach: function (e, t, n) {
    ri(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ri(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ri(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Xl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
N.Component = Qn;
N.Fragment = xm;
N.Profiler = Em;
N.PureComponent = Kl;
N.StrictMode = km;
N.Suspense = _m;
N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Nm;
N.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Df({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = Yl.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      If.call(t, a) &&
        !Of.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: Kr, type: e.type, key: i, ref: o, props: r, _owner: s };
};
N.createContext = function (e) {
  return (
    (e = {
      $$typeof: Pm,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Cm, _context: e }),
    (e.Consumer = e)
  );
};
N.createElement = zf;
N.createFactory = function (e) {
  var t = zf.bind(null, e);
  return (t.type = e), t;
};
N.createRef = function () {
  return { current: null };
};
N.forwardRef = function (e) {
  return { $$typeof: Tm, render: e };
};
N.isValidElement = Xl;
N.lazy = function (e) {
  return { $$typeof: Lm, _payload: { _status: -1, _result: e }, _init: Mm };
};
N.memo = function (e, t) {
  return { $$typeof: Vm, type: e, compare: t === void 0 ? null : t };
};
N.startTransition = function (e) {
  var t = Pi.transition;
  Pi.transition = {};
  try {
    e();
  } finally {
    Pi.transition = t;
  }
};
N.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
N.useCallback = function (e, t) {
  return ve.current.useCallback(e, t);
};
N.useContext = function (e) {
  return ve.current.useContext(e);
};
N.useDebugValue = function () {};
N.useDeferredValue = function (e) {
  return ve.current.useDeferredValue(e);
};
N.useEffect = function (e, t) {
  return ve.current.useEffect(e, t);
};
N.useId = function () {
  return ve.current.useId();
};
N.useImperativeHandle = function (e, t, n) {
  return ve.current.useImperativeHandle(e, t, n);
};
N.useInsertionEffect = function (e, t) {
  return ve.current.useInsertionEffect(e, t);
};
N.useLayoutEffect = function (e, t) {
  return ve.current.useLayoutEffect(e, t);
};
N.useMemo = function (e, t) {
  return ve.current.useMemo(e, t);
};
N.useReducer = function (e, t, n) {
  return ve.current.useReducer(e, t, n);
};
N.useRef = function (e) {
  return ve.current.useRef(e);
};
N.useState = function (e) {
  return ve.current.useState(e);
};
N.useSyncExternalStore = function (e, t, n) {
  return ve.current.useSyncExternalStore(e, t, n);
};
N.useTransition = function () {
  return ve.current.useTransition();
};
N.version = "18.2.0";
Rf.exports = N;
var x = Rf.exports;
const Gr = Vf(x);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Im = x,
  Om = Symbol.for("react.element"),
  zm = Symbol.for("react.fragment"),
  jm = Object.prototype.hasOwnProperty,
  Fm = Im.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Bm = { key: !0, ref: !0, __self: !0, __source: !0 };
function jf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) jm.call(t, r) && !Bm.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Om,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Fm.current,
  };
}
xo.Fragment = zm;
xo.jsx = jf;
xo.jsxs = jf;
Lf.exports = xo;
var L = Lf.exports,
  Os = {},
  Ff = { exports: {} },
  Le = {},
  Bf = { exports: {} },
  Uf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(V, D) {
    var M = V.length;
    V.push(D);
    e: for (; 0 < M; ) {
      var X = (M - 1) >>> 1,
        ne = V[X];
      if (0 < i(ne, D)) (V[X] = D), (V[M] = ne), (M = X);
      else break e;
    }
  }
  function n(V) {
    return V.length === 0 ? null : V[0];
  }
  function r(V) {
    if (V.length === 0) return null;
    var D = V[0],
      M = V.pop();
    if (M !== D) {
      V[0] = M;
      e: for (var X = 0, ne = V.length, ti = ne >>> 1; X < ti; ) {
        var $t = 2 * (X + 1) - 1,
          Yo = V[$t],
          Wt = $t + 1,
          ni = V[Wt];
        if (0 > i(Yo, M))
          Wt < ne && 0 > i(ni, Yo)
            ? ((V[X] = ni), (V[Wt] = M), (X = Wt))
            : ((V[X] = Yo), (V[$t] = M), (X = $t));
        else if (Wt < ne && 0 > i(ni, M)) (V[X] = ni), (V[Wt] = M), (X = Wt);
        else break e;
      }
    }
    return D;
  }
  function i(V, D) {
    var M = V.sortIndex - D.sortIndex;
    return M !== 0 ? M : V.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    c = 1,
    d = null,
    f = 3,
    m = !1,
    g = !1,
    y = !1,
    S = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(V) {
    for (var D = n(u); D !== null; ) {
      if (D.callback === null) r(u);
      else if (D.startTime <= V)
        r(u), (D.sortIndex = D.expirationTime), t(a, D);
      else break;
      D = n(u);
    }
  }
  function w(V) {
    if (((y = !1), v(V), !g))
      if (n(a) !== null) (g = !0), de(k);
      else {
        var D = n(u);
        D !== null && Ke(w, D.startTime - V);
      }
  }
  function k(V, D) {
    (g = !1), y && ((y = !1), h(_), (_ = -1)), (m = !0);
    var M = f;
    try {
      for (
        v(D), d = n(a);
        d !== null && (!(d.expirationTime > D) || (V && !Y()));

      ) {
        var X = d.callback;
        if (typeof X == "function") {
          (d.callback = null), (f = d.priorityLevel);
          var ne = X(d.expirationTime <= D);
          (D = e.unstable_now()),
            typeof ne == "function" ? (d.callback = ne) : d === n(a) && r(a),
            v(D);
        } else r(a);
        d = n(a);
      }
      if (d !== null) var ti = !0;
      else {
        var $t = n(u);
        $t !== null && Ke(w, $t.startTime - D), (ti = !1);
      }
      return ti;
    } finally {
      (d = null), (f = M), (m = !1);
    }
  }
  var C = !1,
    P = null,
    _ = -1,
    I = 5,
    R = -1;
  function Y() {
    return !(e.unstable_now() - R < I);
  }
  function Qe() {
    if (P !== null) {
      var V = e.unstable_now();
      R = V;
      var D = !0;
      try {
        D = P(!0, V);
      } finally {
        D ? rt() : ((C = !1), (P = null));
      }
    } else C = !1;
  }
  var rt;
  if (typeof p == "function")
    rt = function () {
      p(Qe);
    };
  else if (typeof MessageChannel < "u") {
    var vt = new MessageChannel(),
      q = vt.port2;
    (vt.port1.onmessage = Qe),
      (rt = function () {
        q.postMessage(null);
      });
  } else
    rt = function () {
      S(Qe, 0);
    };
  function de(V) {
    (P = V), C || ((C = !0), rt());
  }
  function Ke(V, D) {
    _ = S(function () {
      V(e.unstable_now());
    }, D);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (V) {
      V.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || m || ((g = !0), de(k));
    }),
    (e.unstable_forceFrameRate = function (V) {
      0 > V || 125 < V
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (I = 0 < V ? Math.floor(1e3 / V) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (V) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = f;
      }
      var M = f;
      f = D;
      try {
        return V();
      } finally {
        f = M;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (V, D) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var M = f;
      f = V;
      try {
        return D();
      } finally {
        f = M;
      }
    }),
    (e.unstable_scheduleCallback = function (V, D, M) {
      var X = e.unstable_now();
      switch (
        (typeof M == "object" && M !== null
          ? ((M = M.delay), (M = typeof M == "number" && 0 < M ? X + M : X))
          : (M = X),
        V)
      ) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return (
        (ne = M + ne),
        (V = {
          id: c++,
          callback: D,
          priorityLevel: V,
          startTime: M,
          expirationTime: ne,
          sortIndex: -1,
        }),
        M > X
          ? ((V.sortIndex = M),
            t(u, V),
            n(a) === null &&
              V === n(u) &&
              (y ? (h(_), (_ = -1)) : (y = !0), Ke(w, M - X)))
          : ((V.sortIndex = ne), t(a, V), g || m || ((g = !0), de(k))),
        V
      );
    }),
    (e.unstable_shouldYield = Y),
    (e.unstable_wrapCallback = function (V) {
      var D = f;
      return function () {
        var M = f;
        f = D;
        try {
          return V.apply(this, arguments);
        } finally {
          f = M;
        }
      };
    });
})(Uf);
Bf.exports = Uf;
var Um = Bf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $f = x,
  _e = Um;
function E(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Wf = new Set(),
  Cr = {};
function ln(e, t) {
  In(e, t), In(e + "Capture", t);
}
function In(e, t) {
  for (Cr[e] = t, e = 0; e < t.length; e++) Wf.add(t[e]);
}
var ft = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  zs = Object.prototype.hasOwnProperty,
  $m =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  mu = {},
  vu = {};
function Wm(e) {
  return zs.call(vu, e)
    ? !0
    : zs.call(mu, e)
    ? !1
    : $m.test(e)
    ? (vu[e] = !0)
    : ((mu[e] = !0), !1);
}
function Hm(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Qm(e, t, n, r) {
  if (t === null || typeof t > "u" || Hm(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ge(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    le[e] = new ge(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  le[t] = new ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  le[e] = new ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  le[e] = new ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    le[e] = new ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  le[e] = new ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  le[e] = new ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  le[e] = new ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  le[e] = new ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Zl = /[\-:]([a-z])/g;
function Jl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Zl, Jl);
    le[t] = new ge(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Zl, Jl);
    le[t] = new ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Zl, Jl);
  le[t] = new ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  le[e] = new ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new ge(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  le[e] = new ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ql(e, t, n, r) {
  var i = le.hasOwnProperty(t) ? le[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Qm(t, n, i, r) && (n = null),
    r || i === null
      ? Wm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var mt = $f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ii = Symbol.for("react.element"),
  pn = Symbol.for("react.portal"),
  hn = Symbol.for("react.fragment"),
  bl = Symbol.for("react.strict_mode"),
  js = Symbol.for("react.profiler"),
  Hf = Symbol.for("react.provider"),
  Qf = Symbol.for("react.context"),
  ea = Symbol.for("react.forward_ref"),
  Fs = Symbol.for("react.suspense"),
  Bs = Symbol.for("react.suspense_list"),
  ta = Symbol.for("react.memo"),
  wt = Symbol.for("react.lazy"),
  Kf = Symbol.for("react.offscreen"),
  gu = Symbol.iterator;
function Yn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (gu && e[gu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Q = Object.assign,
  Zo;
function ir(e) {
  if (Zo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Zo = (t && t[1]) || "";
    }
  return (
    `
` +
    Zo +
    e
  );
}
var Jo = !1;
function qo(e, t) {
  if (!e || Jo) return "";
  Jo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          l = o.length - 1;
        1 <= s && 0 <= l && i[s] !== o[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (i[s] !== o[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || i[s] !== o[l])) {
                var a =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (Jo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? ir(e) : "";
}
function Km(e) {
  switch (e.tag) {
    case 5:
      return ir(e.type);
    case 16:
      return ir("Lazy");
    case 13:
      return ir("Suspense");
    case 19:
      return ir("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = qo(e.type, !1)), e;
    case 11:
      return (e = qo(e.type.render, !1)), e;
    case 1:
      return (e = qo(e.type, !0)), e;
    default:
      return "";
  }
}
function Us(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case hn:
      return "Fragment";
    case pn:
      return "Portal";
    case js:
      return "Profiler";
    case bl:
      return "StrictMode";
    case Fs:
      return "Suspense";
    case Bs:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Qf:
        return (e.displayName || "Context") + ".Consumer";
      case Hf:
        return (e._context.displayName || "Context") + ".Provider";
      case ea:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ta:
        return (
          (t = e.displayName || null), t !== null ? t : Us(e.type) || "Memo"
        );
      case wt:
        (t = e._payload), (e = e._init);
        try {
          return Us(e(t));
        } catch {}
    }
  return null;
}
function Gm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Us(t);
    case 8:
      return t === bl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function It(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Gf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Ym(e) {
  var t = Gf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function oi(e) {
  e._valueTracker || (e._valueTracker = Ym(e));
}
function Yf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Gf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function ji(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function $s(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function yu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = It(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Xf(e, t) {
  (t = t.checked), t != null && ql(e, "checked", t, !1);
}
function Ws(e, t) {
  Xf(e, t);
  var n = It(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Hs(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Hs(e, t.type, It(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function wu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Hs(e, t, n) {
  (t !== "number" || ji(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var or = Array.isArray;
function Vn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + It(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Qs(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Su(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(E(92));
      if (or(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: It(n) };
}
function Zf(e, t) {
  var n = It(t.value),
    r = It(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function xu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Jf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ks(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Jf(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var si,
  qf = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        si = si || document.createElement("div"),
          si.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = si.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Pr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ur = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Xm = ["Webkit", "ms", "Moz", "O"];
Object.keys(ur).forEach(function (e) {
  Xm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ur[t] = ur[e]);
  });
});
function bf(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (ur.hasOwnProperty(e) && ur[e])
    ? ("" + t).trim()
    : t + "px";
}
function ed(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = bf(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Zm = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Gs(e, t) {
  if (t) {
    if (Zm[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
  }
}
function Ys(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Xs = null;
function na(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Zs = null,
  Ln = null,
  Rn = null;
function ku(e) {
  if ((e = Zr(e))) {
    if (typeof Zs != "function") throw Error(E(280));
    var t = e.stateNode;
    t && ((t = To(t)), Zs(e.stateNode, e.type, t));
  }
}
function td(e) {
  Ln ? (Rn ? Rn.push(e) : (Rn = [e])) : (Ln = e);
}
function nd() {
  if (Ln) {
    var e = Ln,
      t = Rn;
    if (((Rn = Ln = null), ku(e), t)) for (e = 0; e < t.length; e++) ku(t[e]);
  }
}
function rd(e, t) {
  return e(t);
}
function id() {}
var bo = !1;
function od(e, t, n) {
  if (bo) return e(t, n);
  bo = !0;
  try {
    return rd(e, t, n);
  } finally {
    (bo = !1), (Ln !== null || Rn !== null) && (id(), nd());
  }
}
function Tr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = To(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var Js = !1;
if (ft)
  try {
    var Xn = {};
    Object.defineProperty(Xn, "passive", {
      get: function () {
        Js = !0;
      },
    }),
      window.addEventListener("test", Xn, Xn),
      window.removeEventListener("test", Xn, Xn);
  } catch {
    Js = !1;
  }
function Jm(e, t, n, r, i, o, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var cr = !1,
  Fi = null,
  Bi = !1,
  qs = null,
  qm = {
    onError: function (e) {
      (cr = !0), (Fi = e);
    },
  };
function bm(e, t, n, r, i, o, s, l, a) {
  (cr = !1), (Fi = null), Jm.apply(qm, arguments);
}
function ev(e, t, n, r, i, o, s, l, a) {
  if ((bm.apply(this, arguments), cr)) {
    if (cr) {
      var u = Fi;
      (cr = !1), (Fi = null);
    } else throw Error(E(198));
    Bi || ((Bi = !0), (qs = u));
  }
}
function an(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function sd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Eu(e) {
  if (an(e) !== e) throw Error(E(188));
}
function tv(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = an(e)), t === null)) throw Error(E(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Eu(i), e;
        if (o === r) return Eu(i), t;
        o = o.sibling;
      }
      throw Error(E(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, l = i.child; l; ) {
        if (l === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (l === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = o.child; l; ) {
          if (l === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (l === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function ld(e) {
  return (e = tv(e)), e !== null ? ad(e) : null;
}
function ad(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ad(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ud = _e.unstable_scheduleCallback,
  Cu = _e.unstable_cancelCallback,
  nv = _e.unstable_shouldYield,
  rv = _e.unstable_requestPaint,
  Z = _e.unstable_now,
  iv = _e.unstable_getCurrentPriorityLevel,
  ra = _e.unstable_ImmediatePriority,
  cd = _e.unstable_UserBlockingPriority,
  Ui = _e.unstable_NormalPriority,
  ov = _e.unstable_LowPriority,
  fd = _e.unstable_IdlePriority,
  ko = null,
  be = null;
function sv(e) {
  if (be && typeof be.onCommitFiberRoot == "function")
    try {
      be.onCommitFiberRoot(ko, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var $e = Math.clz32 ? Math.clz32 : uv,
  lv = Math.log,
  av = Math.LN2;
function uv(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((lv(e) / av) | 0)) | 0;
}
var li = 64,
  ai = 4194304;
function sr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function $i(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? (r = sr(l)) : ((o &= s), o !== 0 && (r = sr(o)));
  } else (s = n & ~i), s !== 0 ? (r = sr(s)) : o !== 0 && (r = sr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - $e(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function cv(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function fv(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - $e(o),
      l = 1 << s,
      a = i[s];
    a === -1
      ? (!(l & n) || l & r) && (i[s] = cv(l, t))
      : a <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function bs(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function dd() {
  var e = li;
  return (li <<= 1), !(li & 4194240) && (li = 64), e;
}
function es(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Yr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - $e(t)),
    (e[t] = n);
}
function dv(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - $e(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function ia(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var z = 0;
function pd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var hd,
  oa,
  md,
  vd,
  gd,
  el = !1,
  ui = [],
  _t = null,
  Vt = null,
  Lt = null,
  _r = new Map(),
  Vr = new Map(),
  kt = [],
  pv =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Pu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      _t = null;
      break;
    case "dragenter":
    case "dragleave":
      Vt = null;
      break;
    case "mouseover":
    case "mouseout":
      Lt = null;
      break;
    case "pointerover":
    case "pointerout":
      _r.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Vr.delete(t.pointerId);
  }
}
function Zn(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Zr(t)), t !== null && oa(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function hv(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (_t = Zn(_t, e, t, n, r, i)), !0;
    case "dragenter":
      return (Vt = Zn(Vt, e, t, n, r, i)), !0;
    case "mouseover":
      return (Lt = Zn(Lt, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return _r.set(o, Zn(_r.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), Vr.set(o, Zn(Vr.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function yd(e) {
  var t = Xt(e.target);
  if (t !== null) {
    var n = an(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = sd(n)), t !== null)) {
          (e.blockedOn = t),
            gd(e.priority, function () {
              md(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ti(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = tl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Xs = r), n.target.dispatchEvent(r), (Xs = null);
    } else return (t = Zr(n)), t !== null && oa(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Tu(e, t, n) {
  Ti(e) && n.delete(t);
}
function mv() {
  (el = !1),
    _t !== null && Ti(_t) && (_t = null),
    Vt !== null && Ti(Vt) && (Vt = null),
    Lt !== null && Ti(Lt) && (Lt = null),
    _r.forEach(Tu),
    Vr.forEach(Tu);
}
function Jn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    el ||
      ((el = !0),
      _e.unstable_scheduleCallback(_e.unstable_NormalPriority, mv)));
}
function Lr(e) {
  function t(i) {
    return Jn(i, e);
  }
  if (0 < ui.length) {
    Jn(ui[0], e);
    for (var n = 1; n < ui.length; n++) {
      var r = ui[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    _t !== null && Jn(_t, e),
      Vt !== null && Jn(Vt, e),
      Lt !== null && Jn(Lt, e),
      _r.forEach(t),
      Vr.forEach(t),
      n = 0;
    n < kt.length;
    n++
  )
    (r = kt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < kt.length && ((n = kt[0]), n.blockedOn === null); )
    yd(n), n.blockedOn === null && kt.shift();
}
var An = mt.ReactCurrentBatchConfig,
  Wi = !0;
function vv(e, t, n, r) {
  var i = z,
    o = An.transition;
  An.transition = null;
  try {
    (z = 1), sa(e, t, n, r);
  } finally {
    (z = i), (An.transition = o);
  }
}
function gv(e, t, n, r) {
  var i = z,
    o = An.transition;
  An.transition = null;
  try {
    (z = 4), sa(e, t, n, r);
  } finally {
    (z = i), (An.transition = o);
  }
}
function sa(e, t, n, r) {
  if (Wi) {
    var i = tl(e, t, n, r);
    if (i === null) cs(e, t, r, Hi, n), Pu(e, r);
    else if (hv(i, e, t, n, r)) r.stopPropagation();
    else if ((Pu(e, r), t & 4 && -1 < pv.indexOf(e))) {
      for (; i !== null; ) {
        var o = Zr(i);
        if (
          (o !== null && hd(o),
          (o = tl(e, t, n, r)),
          o === null && cs(e, t, r, Hi, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else cs(e, t, r, null, n);
  }
}
var Hi = null;
function tl(e, t, n, r) {
  if (((Hi = null), (e = na(r)), (e = Xt(e)), e !== null))
    if (((t = an(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = sd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Hi = e), null;
}
function wd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (iv()) {
        case ra:
          return 1;
        case cd:
          return 4;
        case Ui:
        case ov:
          return 16;
        case fd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ct = null,
  la = null,
  _i = null;
function Sd() {
  if (_i) return _i;
  var e,
    t = la,
    n = t.length,
    r,
    i = "value" in Ct ? Ct.value : Ct.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (_i = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Vi(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ci() {
  return !0;
}
function _u() {
  return !1;
}
function Re(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? ci
        : _u),
      (this.isPropagationStopped = _u),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ci));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ci));
      },
      persist: function () {},
      isPersistent: ci,
    }),
    t
  );
}
var Kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  aa = Re(Kn),
  Xr = Q({}, Kn, { view: 0, detail: 0 }),
  yv = Re(Xr),
  ts,
  ns,
  qn,
  Eo = Q({}, Xr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ua,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== qn &&
            (qn && e.type === "mousemove"
              ? ((ts = e.screenX - qn.screenX), (ns = e.screenY - qn.screenY))
              : (ns = ts = 0),
            (qn = e)),
          ts);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ns;
    },
  }),
  Vu = Re(Eo),
  wv = Q({}, Eo, { dataTransfer: 0 }),
  Sv = Re(wv),
  xv = Q({}, Xr, { relatedTarget: 0 }),
  rs = Re(xv),
  kv = Q({}, Kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ev = Re(kv),
  Cv = Q({}, Kn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Pv = Re(Cv),
  Tv = Q({}, Kn, { data: 0 }),
  Lu = Re(Tv),
  _v = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Vv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Lv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Rv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Lv[e]) ? !!t[e] : !1;
}
function ua() {
  return Rv;
}
var Av = Q({}, Xr, {
    key: function (e) {
      if (e.key) {
        var t = _v[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Vi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Vv[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ua,
    charCode: function (e) {
      return e.type === "keypress" ? Vi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Vi(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Dv = Re(Av),
  Mv = Q({}, Eo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ru = Re(Mv),
  Nv = Q({}, Xr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ua,
  }),
  Iv = Re(Nv),
  Ov = Q({}, Kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  zv = Re(Ov),
  jv = Q({}, Eo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Fv = Re(jv),
  Bv = [9, 13, 27, 32],
  ca = ft && "CompositionEvent" in window,
  fr = null;
ft && "documentMode" in document && (fr = document.documentMode);
var Uv = ft && "TextEvent" in window && !fr,
  xd = ft && (!ca || (fr && 8 < fr && 11 >= fr)),
  Au = " ",
  Du = !1;
function kd(e, t) {
  switch (e) {
    case "keyup":
      return Bv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ed(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var mn = !1;
function $v(e, t) {
  switch (e) {
    case "compositionend":
      return Ed(t);
    case "keypress":
      return t.which !== 32 ? null : ((Du = !0), Au);
    case "textInput":
      return (e = t.data), e === Au && Du ? null : e;
    default:
      return null;
  }
}
function Wv(e, t) {
  if (mn)
    return e === "compositionend" || (!ca && kd(e, t))
      ? ((e = Sd()), (_i = la = Ct = null), (mn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return xd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Hv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Mu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Hv[e.type] : t === "textarea";
}
function Cd(e, t, n, r) {
  td(r),
    (t = Qi(t, "onChange")),
    0 < t.length &&
      ((n = new aa("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var dr = null,
  Rr = null;
function Qv(e) {
  Id(e, 0);
}
function Co(e) {
  var t = yn(e);
  if (Yf(t)) return e;
}
function Kv(e, t) {
  if (e === "change") return t;
}
var Pd = !1;
if (ft) {
  var is;
  if (ft) {
    var os = "oninput" in document;
    if (!os) {
      var Nu = document.createElement("div");
      Nu.setAttribute("oninput", "return;"),
        (os = typeof Nu.oninput == "function");
    }
    is = os;
  } else is = !1;
  Pd = is && (!document.documentMode || 9 < document.documentMode);
}
function Iu() {
  dr && (dr.detachEvent("onpropertychange", Td), (Rr = dr = null));
}
function Td(e) {
  if (e.propertyName === "value" && Co(Rr)) {
    var t = [];
    Cd(t, Rr, e, na(e)), od(Qv, t);
  }
}
function Gv(e, t, n) {
  e === "focusin"
    ? (Iu(), (dr = t), (Rr = n), dr.attachEvent("onpropertychange", Td))
    : e === "focusout" && Iu();
}
function Yv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Co(Rr);
}
function Xv(e, t) {
  if (e === "click") return Co(t);
}
function Zv(e, t) {
  if (e === "input" || e === "change") return Co(t);
}
function Jv(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var He = typeof Object.is == "function" ? Object.is : Jv;
function Ar(e, t) {
  if (He(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!zs.call(t, i) || !He(e[i], t[i])) return !1;
  }
  return !0;
}
function Ou(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function zu(e, t) {
  var n = Ou(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ou(n);
  }
}
function _d(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? _d(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Vd() {
  for (var e = window, t = ji(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ji(e.document);
  }
  return t;
}
function fa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function qv(e) {
  var t = Vd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    _d(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && fa(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = zu(n, o));
        var s = zu(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var bv = ft && "documentMode" in document && 11 >= document.documentMode,
  vn = null,
  nl = null,
  pr = null,
  rl = !1;
function ju(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  rl ||
    vn == null ||
    vn !== ji(r) ||
    ((r = vn),
    "selectionStart" in r && fa(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (pr && Ar(pr, r)) ||
      ((pr = r),
      (r = Qi(nl, "onSelect")),
      0 < r.length &&
        ((t = new aa("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = vn))));
}
function fi(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var gn = {
    animationend: fi("Animation", "AnimationEnd"),
    animationiteration: fi("Animation", "AnimationIteration"),
    animationstart: fi("Animation", "AnimationStart"),
    transitionend: fi("Transition", "TransitionEnd"),
  },
  ss = {},
  Ld = {};
ft &&
  ((Ld = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete gn.animationend.animation,
    delete gn.animationiteration.animation,
    delete gn.animationstart.animation),
  "TransitionEvent" in window || delete gn.transitionend.transition);
function Po(e) {
  if (ss[e]) return ss[e];
  if (!gn[e]) return e;
  var t = gn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ld) return (ss[e] = t[n]);
  return e;
}
var Rd = Po("animationend"),
  Ad = Po("animationiteration"),
  Dd = Po("animationstart"),
  Md = Po("transitionend"),
  Nd = new Map(),
  Fu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Ft(e, t) {
  Nd.set(e, t), ln(t, [e]);
}
for (var ls = 0; ls < Fu.length; ls++) {
  var as = Fu[ls],
    e0 = as.toLowerCase(),
    t0 = as[0].toUpperCase() + as.slice(1);
  Ft(e0, "on" + t0);
}
Ft(Rd, "onAnimationEnd");
Ft(Ad, "onAnimationIteration");
Ft(Dd, "onAnimationStart");
Ft("dblclick", "onDoubleClick");
Ft("focusin", "onFocus");
Ft("focusout", "onBlur");
Ft(Md, "onTransitionEnd");
In("onMouseEnter", ["mouseout", "mouseover"]);
In("onMouseLeave", ["mouseout", "mouseover"]);
In("onPointerEnter", ["pointerout", "pointerover"]);
In("onPointerLeave", ["pointerout", "pointerover"]);
ln(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ln(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ln(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ln(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ln(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var lr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  n0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(lr));
function Bu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), ev(r, t, void 0, e), (e.currentTarget = null);
}
function Id(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== o && i.isPropagationStopped())) break e;
          Bu(i, l, u), (o = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== o && i.isPropagationStopped())
          )
            break e;
          Bu(i, l, u), (o = a);
        }
    }
  }
  if (Bi) throw ((e = qs), (Bi = !1), (qs = null), e);
}
function B(e, t) {
  var n = t[al];
  n === void 0 && (n = t[al] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Od(t, e, 2, !1), n.add(r));
}
function us(e, t, n) {
  var r = 0;
  t && (r |= 4), Od(n, e, r, t);
}
var di = "_reactListening" + Math.random().toString(36).slice(2);
function Dr(e) {
  if (!e[di]) {
    (e[di] = !0),
      Wf.forEach(function (n) {
        n !== "selectionchange" && (n0.has(n) || us(n, !1, e), us(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[di] || ((t[di] = !0), us("selectionchange", !1, t));
  }
}
function Od(e, t, n, r) {
  switch (wd(t)) {
    case 1:
      var i = vv;
      break;
    case 4:
      i = gv;
      break;
    default:
      i = sa;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Js ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function cs(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = Xt(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = o = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  od(function () {
    var u = o,
      c = na(n),
      d = [];
    e: {
      var f = Nd.get(e);
      if (f !== void 0) {
        var m = aa,
          g = e;
        switch (e) {
          case "keypress":
            if (Vi(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Dv;
            break;
          case "focusin":
            (g = "focus"), (m = rs);
            break;
          case "focusout":
            (g = "blur"), (m = rs);
            break;
          case "beforeblur":
          case "afterblur":
            m = rs;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = Vu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = Sv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Iv;
            break;
          case Rd:
          case Ad:
          case Dd:
            m = Ev;
            break;
          case Md:
            m = zv;
            break;
          case "scroll":
            m = yv;
            break;
          case "wheel":
            m = Fv;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Pv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Ru;
        }
        var y = (t & 4) !== 0,
          S = !y && e === "scroll",
          h = y ? (f !== null ? f + "Capture" : null) : f;
        y = [];
        for (var p = u, v; p !== null; ) {
          v = p;
          var w = v.stateNode;
          if (
            (v.tag === 5 &&
              w !== null &&
              ((v = w),
              h !== null && ((w = Tr(p, h)), w != null && y.push(Mr(p, w, v)))),
            S)
          )
            break;
          p = p.return;
        }
        0 < y.length &&
          ((f = new m(f, g, null, n, c)), d.push({ event: f, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (m = e === "mouseout" || e === "pointerout"),
          f &&
            n !== Xs &&
            (g = n.relatedTarget || n.fromElement) &&
            (Xt(g) || g[dt]))
        )
          break e;
        if (
          (m || f) &&
          ((f =
            c.window === c
              ? c
              : (f = c.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          m
            ? ((g = n.relatedTarget || n.toElement),
              (m = u),
              (g = g ? Xt(g) : null),
              g !== null &&
                ((S = an(g)), g !== S || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((m = null), (g = u)),
          m !== g)
        ) {
          if (
            ((y = Vu),
            (w = "onMouseLeave"),
            (h = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = Ru),
              (w = "onPointerLeave"),
              (h = "onPointerEnter"),
              (p = "pointer")),
            (S = m == null ? f : yn(m)),
            (v = g == null ? f : yn(g)),
            (f = new y(w, p + "leave", m, n, c)),
            (f.target = S),
            (f.relatedTarget = v),
            (w = null),
            Xt(c) === u &&
              ((y = new y(h, p + "enter", g, n, c)),
              (y.target = v),
              (y.relatedTarget = S),
              (w = y)),
            (S = w),
            m && g)
          )
            t: {
              for (y = m, h = g, p = 0, v = y; v; v = dn(v)) p++;
              for (v = 0, w = h; w; w = dn(w)) v++;
              for (; 0 < p - v; ) (y = dn(y)), p--;
              for (; 0 < v - p; ) (h = dn(h)), v--;
              for (; p--; ) {
                if (y === h || (h !== null && y === h.alternate)) break t;
                (y = dn(y)), (h = dn(h));
              }
              y = null;
            }
          else y = null;
          m !== null && Uu(d, f, m, y, !1),
            g !== null && S !== null && Uu(d, S, g, y, !0);
        }
      }
      e: {
        if (
          ((f = u ? yn(u) : window),
          (m = f.nodeName && f.nodeName.toLowerCase()),
          m === "select" || (m === "input" && f.type === "file"))
        )
          var k = Kv;
        else if (Mu(f))
          if (Pd) k = Zv;
          else {
            k = Yv;
            var C = Gv;
          }
        else
          (m = f.nodeName) &&
            m.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (k = Xv);
        if (k && (k = k(e, u))) {
          Cd(d, k, n, c);
          break e;
        }
        C && C(e, f, u),
          e === "focusout" &&
            (C = f._wrapperState) &&
            C.controlled &&
            f.type === "number" &&
            Hs(f, "number", f.value);
      }
      switch (((C = u ? yn(u) : window), e)) {
        case "focusin":
          (Mu(C) || C.contentEditable === "true") &&
            ((vn = C), (nl = u), (pr = null));
          break;
        case "focusout":
          pr = nl = vn = null;
          break;
        case "mousedown":
          rl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (rl = !1), ju(d, n, c);
          break;
        case "selectionchange":
          if (bv) break;
        case "keydown":
        case "keyup":
          ju(d, n, c);
      }
      var P;
      if (ca)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        mn
          ? kd(e, n) && (_ = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ &&
        (xd &&
          n.locale !== "ko" &&
          (mn || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && mn && (P = Sd())
            : ((Ct = c),
              (la = "value" in Ct ? Ct.value : Ct.textContent),
              (mn = !0))),
        (C = Qi(u, _)),
        0 < C.length &&
          ((_ = new Lu(_, e, null, n, c)),
          d.push({ event: _, listeners: C }),
          P ? (_.data = P) : ((P = Ed(n)), P !== null && (_.data = P)))),
        (P = Uv ? $v(e, n) : Wv(e, n)) &&
          ((u = Qi(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Lu("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = P)));
    }
    Id(d, t);
  });
}
function Mr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Qi(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Tr(e, n)),
      o != null && r.unshift(Mr(e, o, i)),
      (o = Tr(e, t)),
      o != null && r.push(Mr(e, o, i))),
      (e = e.return);
  }
  return r;
}
function dn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Uu(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      i
        ? ((a = Tr(n, o)), a != null && s.unshift(Mr(n, a, l)))
        : i || ((a = Tr(n, o)), a != null && s.push(Mr(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var r0 = /\r\n?/g,
  i0 = /\u0000|\uFFFD/g;
function $u(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      r0,
      `
`
    )
    .replace(i0, "");
}
function pi(e, t, n) {
  if (((t = $u(t)), $u(e) !== t && n)) throw Error(E(425));
}
function Ki() {}
var il = null,
  ol = null;
function sl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ll = typeof setTimeout == "function" ? setTimeout : void 0,
  o0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Wu = typeof Promise == "function" ? Promise : void 0,
  s0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Wu < "u"
      ? function (e) {
          return Wu.resolve(null).then(e).catch(l0);
        }
      : ll;
function l0(e) {
  setTimeout(function () {
    throw e;
  });
}
function fs(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Lr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Lr(t);
}
function Rt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Hu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Gn = Math.random().toString(36).slice(2),
  Je = "__reactFiber$" + Gn,
  Nr = "__reactProps$" + Gn,
  dt = "__reactContainer$" + Gn,
  al = "__reactEvents$" + Gn,
  a0 = "__reactListeners$" + Gn,
  u0 = "__reactHandles$" + Gn;
function Xt(e) {
  var t = e[Je];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[dt] || n[Je])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Hu(e); e !== null; ) {
          if ((n = e[Je])) return n;
          e = Hu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Zr(e) {
  return (
    (e = e[Je] || e[dt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function yn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function To(e) {
  return e[Nr] || null;
}
var ul = [],
  wn = -1;
function Bt(e) {
  return { current: e };
}
function U(e) {
  0 > wn || ((e.current = ul[wn]), (ul[wn] = null), wn--);
}
function F(e, t) {
  wn++, (ul[wn] = e.current), (e.current = t);
}
var Ot = {},
  fe = Bt(Ot),
  Se = Bt(!1),
  tn = Ot;
function On(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ot;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function xe(e) {
  return (e = e.childContextTypes), e != null;
}
function Gi() {
  U(Se), U(fe);
}
function Qu(e, t, n) {
  if (fe.current !== Ot) throw Error(E(168));
  F(fe, t), F(Se, n);
}
function zd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(E(108, Gm(e) || "Unknown", i));
  return Q({}, n, r);
}
function Yi(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ot),
    (tn = fe.current),
    F(fe, e),
    F(Se, Se.current),
    !0
  );
}
function Ku(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n
    ? ((e = zd(e, t, tn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      U(Se),
      U(fe),
      F(fe, e))
    : U(Se),
    F(Se, n);
}
var st = null,
  _o = !1,
  ds = !1;
function jd(e) {
  st === null ? (st = [e]) : st.push(e);
}
function c0(e) {
  (_o = !0), jd(e);
}
function Ut() {
  if (!ds && st !== null) {
    ds = !0;
    var e = 0,
      t = z;
    try {
      var n = st;
      for (z = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (st = null), (_o = !1);
    } catch (i) {
      throw (st !== null && (st = st.slice(e + 1)), ud(ra, Ut), i);
    } finally {
      (z = t), (ds = !1);
    }
  }
  return null;
}
var Sn = [],
  xn = 0,
  Xi = null,
  Zi = 0,
  Ae = [],
  De = 0,
  nn = null,
  lt = 1,
  at = "";
function Kt(e, t) {
  (Sn[xn++] = Zi), (Sn[xn++] = Xi), (Xi = e), (Zi = t);
}
function Fd(e, t, n) {
  (Ae[De++] = lt), (Ae[De++] = at), (Ae[De++] = nn), (nn = e);
  var r = lt;
  e = at;
  var i = 32 - $e(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - $e(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (lt = (1 << (32 - $e(t) + i)) | (n << i) | r),
      (at = o + e);
  } else (lt = (1 << o) | (n << i) | r), (at = e);
}
function da(e) {
  e.return !== null && (Kt(e, 1), Fd(e, 1, 0));
}
function pa(e) {
  for (; e === Xi; )
    (Xi = Sn[--xn]), (Sn[xn] = null), (Zi = Sn[--xn]), (Sn[xn] = null);
  for (; e === nn; )
    (nn = Ae[--De]),
      (Ae[De] = null),
      (at = Ae[--De]),
      (Ae[De] = null),
      (lt = Ae[--De]),
      (Ae[De] = null);
}
var Pe = null,
  Ce = null,
  $ = !1,
  Ue = null;
function Bd(e, t) {
  var n = Me(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Gu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Pe = e), (Ce = Rt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Pe = e), (Ce = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = nn !== null ? { id: lt, overflow: at } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Me(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Pe = e),
            (Ce = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function cl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function fl(e) {
  if ($) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!Gu(e, t)) {
        if (cl(e)) throw Error(E(418));
        t = Rt(n.nextSibling);
        var r = Pe;
        t && Gu(e, t)
          ? Bd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), ($ = !1), (Pe = e));
      }
    } else {
      if (cl(e)) throw Error(E(418));
      (e.flags = (e.flags & -4097) | 2), ($ = !1), (Pe = e);
    }
  }
}
function Yu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Pe = e;
}
function hi(e) {
  if (e !== Pe) return !1;
  if (!$) return Yu(e), ($ = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !sl(e.type, e.memoizedProps))),
    t && (t = Ce))
  ) {
    if (cl(e)) throw (Ud(), Error(E(418)));
    for (; t; ) Bd(e, t), (t = Rt(t.nextSibling));
  }
  if ((Yu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = Rt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = Pe ? Rt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ud() {
  for (var e = Ce; e; ) e = Rt(e.nextSibling);
}
function zn() {
  (Ce = Pe = null), ($ = !1);
}
function ha(e) {
  Ue === null ? (Ue = [e]) : Ue.push(e);
}
var f0 = mt.ReactCurrentBatchConfig;
function Fe(e, t) {
  if (e && e.defaultProps) {
    (t = Q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Ji = Bt(null),
  qi = null,
  kn = null,
  ma = null;
function va() {
  ma = kn = qi = null;
}
function ga(e) {
  var t = Ji.current;
  U(Ji), (e._currentValue = t);
}
function dl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Dn(e, t) {
  (qi = e),
    (ma = kn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (we = !0), (e.firstContext = null));
}
function Ie(e) {
  var t = e._currentValue;
  if (ma !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), kn === null)) {
      if (qi === null) throw Error(E(308));
      (kn = e), (qi.dependencies = { lanes: 0, firstContext: e });
    } else kn = kn.next = e;
  return t;
}
var Zt = null;
function ya(e) {
  Zt === null ? (Zt = [e]) : Zt.push(e);
}
function $d(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), ya(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    pt(e, r)
  );
}
function pt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var St = !1;
function wa(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Wd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function ut(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function At(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), O & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      pt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), ya(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    pt(e, n)
  );
}
function Li(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ia(e, n);
  }
}
function Xu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function bi(e, t, n, r) {
  var i = e.updateQueue;
  St = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), s === null ? (o = u) : (s.next = u), (s = a);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (l = c.lastBaseUpdate),
      l !== s &&
        (l === null ? (c.firstBaseUpdate = u) : (l.next = u),
        (c.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var d = i.baseState;
    (s = 0), (c = u = a = null), (l = o);
    do {
      var f = l.lane,
        m = l.eventTime;
      if ((r & f) === f) {
        c !== null &&
          (c = c.next =
            {
              eventTime: m,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var g = e,
            y = l;
          switch (((f = t), (m = n), y.tag)) {
            case 1:
              if (((g = y.payload), typeof g == "function")) {
                d = g.call(m, d, f);
                break e;
              }
              d = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = y.payload),
                (f = typeof g == "function" ? g.call(m, d, f) : g),
                f == null)
              )
                break e;
              d = Q({}, d, f);
              break e;
            case 2:
              St = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (f = i.effects),
          f === null ? (i.effects = [l]) : f.push(l));
      } else
        (m = {
          eventTime: m,
          lane: f,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          c === null ? ((u = c = m), (a = d)) : (c = c.next = m),
          (s |= f);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (f = l),
          (l = f.next),
          (f.next = null),
          (i.lastBaseUpdate = f),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (a = d),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (on |= s), (e.lanes = s), (e.memoizedState = d);
  }
}
function Zu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(E(191, i));
        i.call(r);
      }
    }
}
var Hd = new $f.Component().refs;
function pl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Vo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? an(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = me(),
      i = Mt(e),
      o = ut(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = At(e, o, i)),
      t !== null && (We(t, e, i, r), Li(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = me(),
      i = Mt(e),
      o = ut(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = At(e, o, i)),
      t !== null && (We(t, e, i, r), Li(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = me(),
      r = Mt(e),
      i = ut(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = At(e, i, r)),
      t !== null && (We(t, e, r, n), Li(t, e, r));
  },
};
function Ju(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Ar(n, r) || !Ar(i, o)
      : !0
  );
}
function Qd(e, t, n) {
  var r = !1,
    i = Ot,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Ie(o))
      : ((i = xe(t) ? tn : fe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? On(e, i) : Ot)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Vo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function qu(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Vo.enqueueReplaceState(t, t.state, null);
}
function hl(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = Hd), wa(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = Ie(o))
    : ((o = xe(t) ? tn : fe.current), (i.context = On(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (pl(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Vo.enqueueReplaceState(i, i.state, null),
      bi(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function bn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var l = i.refs;
            l === Hd && (l = i.refs = {}),
              s === null ? delete l[o] : (l[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function mi(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      E(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function bu(e) {
  var t = e._init;
  return t(e._payload);
}
function Kd(e) {
  function t(h, p) {
    if (e) {
      var v = h.deletions;
      v === null ? ((h.deletions = [p]), (h.flags |= 16)) : v.push(p);
    }
  }
  function n(h, p) {
    if (!e) return null;
    for (; p !== null; ) t(h, p), (p = p.sibling);
    return null;
  }
  function r(h, p) {
    for (h = new Map(); p !== null; )
      p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling);
    return h;
  }
  function i(h, p) {
    return (h = Nt(h, p)), (h.index = 0), (h.sibling = null), h;
  }
  function o(h, p, v) {
    return (
      (h.index = v),
      e
        ? ((v = h.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((h.flags |= 2), p) : v)
            : ((h.flags |= 2), p))
        : ((h.flags |= 1048576), p)
    );
  }
  function s(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function l(h, p, v, w) {
    return p === null || p.tag !== 6
      ? ((p = ws(v, h.mode, w)), (p.return = h), p)
      : ((p = i(p, v)), (p.return = h), p);
  }
  function a(h, p, v, w) {
    var k = v.type;
    return k === hn
      ? c(h, p, v.props.children, w, v.key)
      : p !== null &&
        (p.elementType === k ||
          (typeof k == "object" &&
            k !== null &&
            k.$$typeof === wt &&
            bu(k) === p.type))
      ? ((w = i(p, v.props)), (w.ref = bn(h, p, v)), (w.return = h), w)
      : ((w = Ii(v.type, v.key, v.props, null, h.mode, w)),
        (w.ref = bn(h, p, v)),
        (w.return = h),
        w);
  }
  function u(h, p, v, w) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = Ss(v, h.mode, w)), (p.return = h), p)
      : ((p = i(p, v.children || [])), (p.return = h), p);
  }
  function c(h, p, v, w, k) {
    return p === null || p.tag !== 7
      ? ((p = en(v, h.mode, w, k)), (p.return = h), p)
      : ((p = i(p, v)), (p.return = h), p);
  }
  function d(h, p, v) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = ws("" + p, h.mode, v)), (p.return = h), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case ii:
          return (
            (v = Ii(p.type, p.key, p.props, null, h.mode, v)),
            (v.ref = bn(h, null, p)),
            (v.return = h),
            v
          );
        case pn:
          return (p = Ss(p, h.mode, v)), (p.return = h), p;
        case wt:
          var w = p._init;
          return d(h, w(p._payload), v);
      }
      if (or(p) || Yn(p))
        return (p = en(p, h.mode, v, null)), (p.return = h), p;
      mi(h, p);
    }
    return null;
  }
  function f(h, p, v, w) {
    var k = p !== null ? p.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return k !== null ? null : l(h, p, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case ii:
          return v.key === k ? a(h, p, v, w) : null;
        case pn:
          return v.key === k ? u(h, p, v, w) : null;
        case wt:
          return (k = v._init), f(h, p, k(v._payload), w);
      }
      if (or(v) || Yn(v)) return k !== null ? null : c(h, p, v, w, null);
      mi(h, v);
    }
    return null;
  }
  function m(h, p, v, w, k) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (h = h.get(v) || null), l(p, h, "" + w, k);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case ii:
          return (h = h.get(w.key === null ? v : w.key) || null), a(p, h, w, k);
        case pn:
          return (h = h.get(w.key === null ? v : w.key) || null), u(p, h, w, k);
        case wt:
          var C = w._init;
          return m(h, p, v, C(w._payload), k);
      }
      if (or(w) || Yn(w)) return (h = h.get(v) || null), c(p, h, w, k, null);
      mi(p, w);
    }
    return null;
  }
  function g(h, p, v, w) {
    for (
      var k = null, C = null, P = p, _ = (p = 0), I = null;
      P !== null && _ < v.length;
      _++
    ) {
      P.index > _ ? ((I = P), (P = null)) : (I = P.sibling);
      var R = f(h, P, v[_], w);
      if (R === null) {
        P === null && (P = I);
        break;
      }
      e && P && R.alternate === null && t(h, P),
        (p = o(R, p, _)),
        C === null ? (k = R) : (C.sibling = R),
        (C = R),
        (P = I);
    }
    if (_ === v.length) return n(h, P), $ && Kt(h, _), k;
    if (P === null) {
      for (; _ < v.length; _++)
        (P = d(h, v[_], w)),
          P !== null &&
            ((p = o(P, p, _)), C === null ? (k = P) : (C.sibling = P), (C = P));
      return $ && Kt(h, _), k;
    }
    for (P = r(h, P); _ < v.length; _++)
      (I = m(P, h, _, v[_], w)),
        I !== null &&
          (e && I.alternate !== null && P.delete(I.key === null ? _ : I.key),
          (p = o(I, p, _)),
          C === null ? (k = I) : (C.sibling = I),
          (C = I));
    return (
      e &&
        P.forEach(function (Y) {
          return t(h, Y);
        }),
      $ && Kt(h, _),
      k
    );
  }
  function y(h, p, v, w) {
    var k = Yn(v);
    if (typeof k != "function") throw Error(E(150));
    if (((v = k.call(v)), v == null)) throw Error(E(151));
    for (
      var C = (k = null), P = p, _ = (p = 0), I = null, R = v.next();
      P !== null && !R.done;
      _++, R = v.next()
    ) {
      P.index > _ ? ((I = P), (P = null)) : (I = P.sibling);
      var Y = f(h, P, R.value, w);
      if (Y === null) {
        P === null && (P = I);
        break;
      }
      e && P && Y.alternate === null && t(h, P),
        (p = o(Y, p, _)),
        C === null ? (k = Y) : (C.sibling = Y),
        (C = Y),
        (P = I);
    }
    if (R.done) return n(h, P), $ && Kt(h, _), k;
    if (P === null) {
      for (; !R.done; _++, R = v.next())
        (R = d(h, R.value, w)),
          R !== null &&
            ((p = o(R, p, _)), C === null ? (k = R) : (C.sibling = R), (C = R));
      return $ && Kt(h, _), k;
    }
    for (P = r(h, P); !R.done; _++, R = v.next())
      (R = m(P, h, _, R.value, w)),
        R !== null &&
          (e && R.alternate !== null && P.delete(R.key === null ? _ : R.key),
          (p = o(R, p, _)),
          C === null ? (k = R) : (C.sibling = R),
          (C = R));
    return (
      e &&
        P.forEach(function (Qe) {
          return t(h, Qe);
        }),
      $ && Kt(h, _),
      k
    );
  }
  function S(h, p, v, w) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === hn &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case ii:
          e: {
            for (var k = v.key, C = p; C !== null; ) {
              if (C.key === k) {
                if (((k = v.type), k === hn)) {
                  if (C.tag === 7) {
                    n(h, C.sibling),
                      (p = i(C, v.props.children)),
                      (p.return = h),
                      (h = p);
                    break e;
                  }
                } else if (
                  C.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === wt &&
                    bu(k) === C.type)
                ) {
                  n(h, C.sibling),
                    (p = i(C, v.props)),
                    (p.ref = bn(h, C, v)),
                    (p.return = h),
                    (h = p);
                  break e;
                }
                n(h, C);
                break;
              } else t(h, C);
              C = C.sibling;
            }
            v.type === hn
              ? ((p = en(v.props.children, h.mode, w, v.key)),
                (p.return = h),
                (h = p))
              : ((w = Ii(v.type, v.key, v.props, null, h.mode, w)),
                (w.ref = bn(h, p, v)),
                (w.return = h),
                (h = w));
          }
          return s(h);
        case pn:
          e: {
            for (C = v.key; p !== null; ) {
              if (p.key === C)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  n(h, p.sibling),
                    (p = i(p, v.children || [])),
                    (p.return = h),
                    (h = p);
                  break e;
                } else {
                  n(h, p);
                  break;
                }
              else t(h, p);
              p = p.sibling;
            }
            (p = Ss(v, h.mode, w)), (p.return = h), (h = p);
          }
          return s(h);
        case wt:
          return (C = v._init), S(h, p, C(v._payload), w);
      }
      if (or(v)) return g(h, p, v, w);
      if (Yn(v)) return y(h, p, v, w);
      mi(h, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        p !== null && p.tag === 6
          ? (n(h, p.sibling), (p = i(p, v)), (p.return = h), (h = p))
          : (n(h, p), (p = ws(v, h.mode, w)), (p.return = h), (h = p)),
        s(h))
      : n(h, p);
  }
  return S;
}
var jn = Kd(!0),
  Gd = Kd(!1),
  Jr = {},
  et = Bt(Jr),
  Ir = Bt(Jr),
  Or = Bt(Jr);
function Jt(e) {
  if (e === Jr) throw Error(E(174));
  return e;
}
function Sa(e, t) {
  switch ((F(Or, t), F(Ir, e), F(et, Jr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ks(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ks(t, e));
  }
  U(et), F(et, t);
}
function Fn() {
  U(et), U(Ir), U(Or);
}
function Yd(e) {
  Jt(Or.current);
  var t = Jt(et.current),
    n = Ks(t, e.type);
  t !== n && (F(Ir, e), F(et, n));
}
function xa(e) {
  Ir.current === e && (U(et), U(Ir));
}
var W = Bt(0);
function eo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var ps = [];
function ka() {
  for (var e = 0; e < ps.length; e++)
    ps[e]._workInProgressVersionPrimary = null;
  ps.length = 0;
}
var Ri = mt.ReactCurrentDispatcher,
  hs = mt.ReactCurrentBatchConfig,
  rn = 0,
  H = null,
  ee = null,
  re = null,
  to = !1,
  hr = !1,
  zr = 0,
  d0 = 0;
function ae() {
  throw Error(E(321));
}
function Ea(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!He(e[n], t[n])) return !1;
  return !0;
}
function Ca(e, t, n, r, i, o) {
  if (
    ((rn = o),
    (H = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ri.current = e === null || e.memoizedState === null ? v0 : g0),
    (e = n(r, i)),
    hr)
  ) {
    o = 0;
    do {
      if (((hr = !1), (zr = 0), 25 <= o)) throw Error(E(301));
      (o += 1),
        (re = ee = null),
        (t.updateQueue = null),
        (Ri.current = y0),
        (e = n(r, i));
    } while (hr);
  }
  if (
    ((Ri.current = no),
    (t = ee !== null && ee.next !== null),
    (rn = 0),
    (re = ee = H = null),
    (to = !1),
    t)
  )
    throw Error(E(300));
  return e;
}
function Pa() {
  var e = zr !== 0;
  return (zr = 0), e;
}
function Xe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return re === null ? (H.memoizedState = re = e) : (re = re.next = e), re;
}
function Oe() {
  if (ee === null) {
    var e = H.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? H.memoizedState : re.next;
  if (t !== null) (re = t), (ee = e);
  else {
    if (e === null) throw Error(E(310));
    (ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      re === null ? (H.memoizedState = re = e) : (re = re.next = e);
  }
  return re;
}
function jr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ms(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = ee,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      u = o;
    do {
      var c = u.lane;
      if ((rn & c) === c)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = d), (s = r)) : (a = a.next = d),
          (H.lanes |= c),
          (on |= c);
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? (s = r) : (a.next = l),
      He(r, t.memoizedState) || (we = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (H.lanes |= o), (on |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function vs(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    He(o, t.memoizedState) || (we = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Xd() {}
function Zd(e, t) {
  var n = H,
    r = Oe(),
    i = t(),
    o = !He(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (we = !0)),
    (r = r.queue),
    Ta(bd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Fr(9, qd.bind(null, n, r, i, t), void 0, null),
      ie === null)
    )
      throw Error(E(349));
    rn & 30 || Jd(n, t, i);
  }
  return i;
}
function Jd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function qd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), ep(t) && tp(e);
}
function bd(e, t, n) {
  return n(function () {
    ep(t) && tp(e);
  });
}
function ep(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !He(e, n);
  } catch {
    return !0;
  }
}
function tp(e) {
  var t = pt(e, 1);
  t !== null && We(t, e, 1, -1);
}
function ec(e) {
  var t = Xe();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = m0.bind(null, H, e)),
    [t.memoizedState, e]
  );
}
function Fr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function np() {
  return Oe().memoizedState;
}
function Ai(e, t, n, r) {
  var i = Xe();
  (H.flags |= e),
    (i.memoizedState = Fr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Lo(e, t, n, r) {
  var i = Oe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (((o = s.destroy), r !== null && Ea(r, s.deps))) {
      i.memoizedState = Fr(t, n, o, r);
      return;
    }
  }
  (H.flags |= e), (i.memoizedState = Fr(1 | t, n, o, r));
}
function tc(e, t) {
  return Ai(8390656, 8, e, t);
}
function Ta(e, t) {
  return Lo(2048, 8, e, t);
}
function rp(e, t) {
  return Lo(4, 2, e, t);
}
function ip(e, t) {
  return Lo(4, 4, e, t);
}
function op(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function sp(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Lo(4, 4, op.bind(null, t, e), n)
  );
}
function _a() {}
function lp(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ea(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function ap(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ea(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function up(e, t, n) {
  return rn & 21
    ? (He(n, t) || ((n = dd()), (H.lanes |= n), (on |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (we = !0)), (e.memoizedState = n));
}
function p0(e, t) {
  var n = z;
  (z = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = hs.transition;
  hs.transition = {};
  try {
    e(!1), t();
  } finally {
    (z = n), (hs.transition = r);
  }
}
function cp() {
  return Oe().memoizedState;
}
function h0(e, t, n) {
  var r = Mt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    fp(e))
  )
    dp(t, n);
  else if (((n = $d(e, t, n, r)), n !== null)) {
    var i = me();
    We(n, e, r, i), pp(n, t, r);
  }
}
function m0(e, t, n) {
  var r = Mt(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (fp(e)) dp(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), He(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((i.next = i), ya(t))
            : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = $d(e, t, i, r)),
      n !== null && ((i = me()), We(n, e, r, i), pp(n, t, r));
  }
}
function fp(e) {
  var t = e.alternate;
  return e === H || (t !== null && t === H);
}
function dp(e, t) {
  hr = to = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function pp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ia(e, n);
  }
}
var no = {
    readContext: Ie,
    useCallback: ae,
    useContext: ae,
    useEffect: ae,
    useImperativeHandle: ae,
    useInsertionEffect: ae,
    useLayoutEffect: ae,
    useMemo: ae,
    useReducer: ae,
    useRef: ae,
    useState: ae,
    useDebugValue: ae,
    useDeferredValue: ae,
    useTransition: ae,
    useMutableSource: ae,
    useSyncExternalStore: ae,
    useId: ae,
    unstable_isNewReconciler: !1,
  },
  v0 = {
    readContext: Ie,
    useCallback: function (e, t) {
      return (Xe().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ie,
    useEffect: tc,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ai(4194308, 4, op.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ai(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ai(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Xe();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Xe();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = h0.bind(null, H, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Xe();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ec,
    useDebugValue: _a,
    useDeferredValue: function (e) {
      return (Xe().memoizedState = e);
    },
    useTransition: function () {
      var e = ec(!1),
        t = e[0];
      return (e = p0.bind(null, e[1])), (Xe().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = H,
        i = Xe();
      if ($) {
        if (n === void 0) throw Error(E(407));
        n = n();
      } else {
        if (((n = t()), ie === null)) throw Error(E(349));
        rn & 30 || Jd(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        tc(bd.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Fr(9, qd.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Xe(),
        t = ie.identifierPrefix;
      if ($) {
        var n = at,
          r = lt;
        (n = (r & ~(1 << (32 - $e(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = zr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = d0++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  g0 = {
    readContext: Ie,
    useCallback: lp,
    useContext: Ie,
    useEffect: Ta,
    useImperativeHandle: sp,
    useInsertionEffect: rp,
    useLayoutEffect: ip,
    useMemo: ap,
    useReducer: ms,
    useRef: np,
    useState: function () {
      return ms(jr);
    },
    useDebugValue: _a,
    useDeferredValue: function (e) {
      var t = Oe();
      return up(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = ms(jr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: Xd,
    useSyncExternalStore: Zd,
    useId: cp,
    unstable_isNewReconciler: !1,
  },
  y0 = {
    readContext: Ie,
    useCallback: lp,
    useContext: Ie,
    useEffect: Ta,
    useImperativeHandle: sp,
    useInsertionEffect: rp,
    useLayoutEffect: ip,
    useMemo: ap,
    useReducer: vs,
    useRef: np,
    useState: function () {
      return vs(jr);
    },
    useDebugValue: _a,
    useDeferredValue: function (e) {
      var t = Oe();
      return ee === null ? (t.memoizedState = e) : up(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = vs(jr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: Xd,
    useSyncExternalStore: Zd,
    useId: cp,
    unstable_isNewReconciler: !1,
  };
function Bn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Km(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function gs(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ml(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var w0 = typeof WeakMap == "function" ? WeakMap : Map;
function hp(e, t, n) {
  (n = ut(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      io || ((io = !0), (Pl = r)), ml(e, t);
    }),
    n
  );
}
function mp(e, t, n) {
  (n = ut(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        ml(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        ml(e, t),
          typeof r != "function" &&
            (Dt === null ? (Dt = new Set([this])) : Dt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function nc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new w0();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = M0.bind(null, e, t, n)), t.then(e, e));
}
function rc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ic(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = ut(-1, 1)), (t.tag = 2), At(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var S0 = mt.ReactCurrentOwner,
  we = !1;
function he(e, t, n, r) {
  t.child = e === null ? Gd(t, null, n, r) : jn(t, e.child, n, r);
}
function oc(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    Dn(t, i),
    (r = Ca(e, t, n, r, o, i)),
    (n = Pa()),
    e !== null && !we
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        ht(e, t, i))
      : ($ && n && da(t), (t.flags |= 1), he(e, t, r, i), t.child)
  );
}
function sc(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Ia(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), vp(e, t, o, r, i))
      : ((e = Ii(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ar), n(s, r) && e.ref === t.ref)
    )
      return ht(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Nt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function vp(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ar(o, r) && e.ref === t.ref)
      if (((we = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (we = !0);
      else return (t.lanes = e.lanes), ht(e, t, i);
  }
  return vl(e, t, n, r, i);
}
function gp(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        F(Cn, Ee),
        (Ee |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          F(Cn, Ee),
          (Ee |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        F(Cn, Ee),
        (Ee |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      F(Cn, Ee),
      (Ee |= r);
  return he(e, t, i, n), t.child;
}
function yp(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function vl(e, t, n, r, i) {
  var o = xe(n) ? tn : fe.current;
  return (
    (o = On(t, o)),
    Dn(t, i),
    (n = Ca(e, t, n, r, o, i)),
    (r = Pa()),
    e !== null && !we
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        ht(e, t, i))
      : ($ && r && da(t), (t.flags |= 1), he(e, t, n, i), t.child)
  );
}
function lc(e, t, n, r, i) {
  if (xe(n)) {
    var o = !0;
    Yi(t);
  } else o = !1;
  if ((Dn(t, i), t.stateNode === null))
    Di(e, t), Qd(t, n, r), hl(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Ie(u))
      : ((u = xe(n) ? tn : fe.current), (u = On(t, u)));
    var c = n.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    d ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && qu(t, s, r, u)),
      (St = !1);
    var f = t.memoizedState;
    (s.state = f),
      bi(t, r, s, i),
      (a = t.memoizedState),
      l !== r || f !== a || Se.current || St
        ? (typeof c == "function" && (pl(t, n, c, r), (a = t.memoizedState)),
          (l = St || Ju(t, n, l, r, f, a, u))
            ? (d ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Wd(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : Fe(t.type, l)),
      (s.props = u),
      (d = t.pendingProps),
      (f = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Ie(a))
        : ((a = xe(n) ? tn : fe.current), (a = On(t, a)));
    var m = n.getDerivedStateFromProps;
    (c =
      typeof m == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== d || f !== a) && qu(t, s, r, a)),
      (St = !1),
      (f = t.memoizedState),
      (s.state = f),
      bi(t, r, s, i);
    var g = t.memoizedState;
    l !== d || f !== g || Se.current || St
      ? (typeof m == "function" && (pl(t, n, m, r), (g = t.memoizedState)),
        (u = St || Ju(t, n, u, r, f, g, a) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, g, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, g, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (s.props = r),
        (s.state = g),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return gl(e, t, n, r, o, i);
}
function gl(e, t, n, r, i, o) {
  yp(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && Ku(t, n, !1), ht(e, t, o);
  (r = t.stateNode), (S0.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = jn(t, e.child, null, o)), (t.child = jn(t, null, l, o)))
      : he(e, t, l, o),
    (t.memoizedState = r.state),
    i && Ku(t, n, !0),
    t.child
  );
}
function wp(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Qu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Qu(e, t.context, !1),
    Sa(e, t.containerInfo);
}
function ac(e, t, n, r, i) {
  return zn(), ha(i), (t.flags |= 256), he(e, t, n, r), t.child;
}
var yl = { dehydrated: null, treeContext: null, retryLane: 0 };
function wl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Sp(e, t, n) {
  var r = t.pendingProps,
    i = W.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    F(W, i & 1),
    e === null)
  )
    return (
      fl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = Do(s, r, 0, null)),
              (e = en(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = wl(n)),
              (t.memoizedState = yl),
              e)
            : Va(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
    return x0(e, t, s, r, l, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (l = i.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Nt(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      l !== null ? (o = Nt(l, o)) : ((o = en(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? wl(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = yl),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Nt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Va(e, t) {
  return (
    (t = Do({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function vi(e, t, n, r) {
  return (
    r !== null && ha(r),
    jn(t, e.child, null, n),
    (e = Va(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function x0(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = gs(Error(E(422)))), vi(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = Do({ mode: "visible", children: r.children }, i, 0, null)),
        (o = en(o, i, s, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && jn(t, e.child, null, s),
        (t.child.memoizedState = wl(s)),
        (t.memoizedState = yl),
        o);
  if (!(t.mode & 1)) return vi(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(E(419))), (r = gs(o, r, void 0)), vi(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), we || l)) {
    if (((r = ie), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), pt(e, i), We(r, e, i, -1));
    }
    return Na(), (r = gs(Error(E(421)))), vi(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = N0.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ce = Rt(i.nextSibling)),
      (Pe = t),
      ($ = !0),
      (Ue = null),
      e !== null &&
        ((Ae[De++] = lt),
        (Ae[De++] = at),
        (Ae[De++] = nn),
        (lt = e.id),
        (at = e.overflow),
        (nn = t)),
      (t = Va(t, r.children)),
      (t.flags |= 4096),
      t);
}
function uc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), dl(e.return, t, n);
}
function ys(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function xp(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((he(e, t, r.children, n), (r = W.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && uc(e, n, t);
        else if (e.tag === 19) uc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((F(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && eo(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          ys(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && eo(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        ys(t, !0, n, null, o);
        break;
      case "together":
        ys(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Di(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ht(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (on |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Nt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Nt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function k0(e, t, n) {
  switch (t.tag) {
    case 3:
      wp(t), zn();
      break;
    case 5:
      Yd(t);
      break;
    case 1:
      xe(t.type) && Yi(t);
      break;
    case 4:
      Sa(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      F(Ji, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (F(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Sp(e, t, n)
          : (F(W, W.current & 1),
            (e = ht(e, t, n)),
            e !== null ? e.sibling : null);
      F(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return xp(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        F(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), gp(e, t, n);
  }
  return ht(e, t, n);
}
var kp, Sl, Ep, Cp;
kp = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Sl = function () {};
Ep = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Jt(et.current);
    var o = null;
    switch (n) {
      case "input":
        (i = $s(e, i)), (r = $s(e, r)), (o = []);
        break;
      case "select":
        (i = Q({}, i, { value: void 0 })),
          (r = Q({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = Qs(e, i)), (r = Qs(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ki);
    }
    Gs(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Cr.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (o || (o = []), o.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (o = o || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (o = o || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Cr.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && B("scroll", e),
                  o || l === a || (o = []))
                : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Cp = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function er(e, t) {
  if (!$)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ue(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function E0(e, t, n) {
  var r = t.pendingProps;
  switch ((pa(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ue(t), null;
    case 1:
      return xe(t.type) && Gi(), ue(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Fn(),
        U(Se),
        U(fe),
        ka(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (hi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ue !== null && (Vl(Ue), (Ue = null)))),
        Sl(e, t),
        ue(t),
        null
      );
    case 5:
      xa(t);
      var i = Jt(Or.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Ep(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return ue(t), null;
        }
        if (((e = Jt(et.current)), hi(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Je] = t), (r[Nr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              B("cancel", r), B("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              B("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < lr.length; i++) B(lr[i], r);
              break;
            case "source":
              B("error", r);
              break;
            case "img":
            case "image":
            case "link":
              B("error", r), B("load", r);
              break;
            case "details":
              B("toggle", r);
              break;
            case "input":
              yu(r, o), B("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                B("invalid", r);
              break;
            case "textarea":
              Su(r, o), B("invalid", r);
          }
          Gs(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var l = o[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 &&
                      pi(r.textContent, l, e),
                    (i = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (o.suppressHydrationWarning !== !0 &&
                      pi(r.textContent, l, e),
                    (i = ["children", "" + l]))
                : Cr.hasOwnProperty(s) &&
                  l != null &&
                  s === "onScroll" &&
                  B("scroll", r);
            }
          switch (n) {
            case "input":
              oi(r), wu(r, o, !0);
              break;
            case "textarea":
              oi(r), xu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ki);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Jf(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Je] = t),
            (e[Nr] = r),
            kp(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = Ys(n, r)), n)) {
              case "dialog":
                B("cancel", e), B("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                B("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < lr.length; i++) B(lr[i], e);
                i = r;
                break;
              case "source":
                B("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                B("error", e), B("load", e), (i = r);
                break;
              case "details":
                B("toggle", e), (i = r);
                break;
              case "input":
                yu(e, r), (i = $s(e, r)), B("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Q({}, r, { value: void 0 })),
                  B("invalid", e);
                break;
              case "textarea":
                Su(e, r), (i = Qs(e, r)), B("invalid", e);
                break;
              default:
                i = r;
            }
            Gs(n, i), (l = i);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style"
                  ? ed(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && qf(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Pr(e, a)
                    : typeof a == "number" && Pr(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Cr.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && B("scroll", e)
                      : a != null && ql(e, o, a, s));
              }
            switch (n) {
              case "input":
                oi(e), wu(e, r, !1);
                break;
              case "textarea":
                oi(e), xu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + It(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Vn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Vn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Ki);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) Cp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (((n = Jt(Or.current)), Jt(et.current), hi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Je] = t),
            (o = r.nodeValue !== n) && ((e = Pe), e !== null))
          )
            switch (e.tag) {
              case 3:
                pi(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  pi(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Je] = t),
            (t.stateNode = r);
      }
      return ue(t), null;
    case 13:
      if (
        (U(W),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if ($ && Ce !== null && t.mode & 1 && !(t.flags & 128))
          Ud(), zn(), (t.flags |= 98560), (o = !1);
        else if (((o = hi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(E(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(E(317));
            o[Je] = t;
          } else
            zn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ue(t), (o = !1);
        } else Ue !== null && (Vl(Ue), (Ue = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? te === 0 && (te = 3) : Na())),
          t.updateQueue !== null && (t.flags |= 4),
          ue(t),
          null);
    case 4:
      return (
        Fn(), Sl(e, t), e === null && Dr(t.stateNode.containerInfo), ue(t), null
      );
    case 10:
      return ga(t.type._context), ue(t), null;
    case 17:
      return xe(t.type) && Gi(), ue(t), null;
    case 19:
      if ((U(W), (o = t.memoizedState), o === null)) return ue(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) er(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = eo(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    er(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return F(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Z() > Un &&
            ((t.flags |= 128), (r = !0), er(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = eo(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              er(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !$)
            )
              return ue(t), null;
          } else
            2 * Z() - o.renderingStartTime > Un &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), er(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Z()),
          (t.sibling = null),
          (n = W.current),
          F(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (ue(t), null);
    case 22:
    case 23:
      return (
        Ma(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ee & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ue(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function C0(e, t) {
  switch ((pa(t), t.tag)) {
    case 1:
      return (
        xe(t.type) && Gi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Fn(),
        U(Se),
        U(fe),
        ka(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return xa(t), null;
    case 13:
      if ((U(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(E(340));
        zn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return U(W), null;
    case 4:
      return Fn(), null;
    case 10:
      return ga(t.type._context), null;
    case 22:
    case 23:
      return Ma(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var gi = !1,
  ce = !1,
  P0 = typeof WeakSet == "function" ? WeakSet : Set,
  T = null;
function En(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else n.current = null;
}
function xl(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var cc = !1;
function T0(e, t) {
  if (((il = Wi), (e = Vd()), fa(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            c = 0,
            d = e,
            f = null;
          t: for (;;) {
            for (
              var m;
              d !== n || (i !== 0 && d.nodeType !== 3) || (l = s + i),
                d !== o || (r !== 0 && d.nodeType !== 3) || (a = s + r),
                d.nodeType === 3 && (s += d.nodeValue.length),
                (m = d.firstChild) !== null;

            )
              (f = d), (d = m);
            for (;;) {
              if (d === e) break t;
              if (
                (f === n && ++u === i && (l = s),
                f === o && ++c === r && (a = s),
                (m = d.nextSibling) !== null)
              )
                break;
              (d = f), (f = d.parentNode);
            }
            d = m;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ol = { focusedElem: e, selectionRange: n }, Wi = !1, T = t; T !== null; )
    if (((t = T), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (T = e);
    else
      for (; T !== null; ) {
        t = T;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var y = g.memoizedProps,
                    S = g.memoizedState,
                    h = t.stateNode,
                    p = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : Fe(t.type, y),
                      S
                    );
                  h.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(E(163));
            }
        } catch (w) {
          K(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (T = e);
          break;
        }
        T = t.return;
      }
  return (g = cc), (cc = !1), g;
}
function mr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && xl(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Ro(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function kl(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Pp(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Pp(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Je], delete t[Nr], delete t[al], delete t[a0], delete t[u0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Tp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function fc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Tp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function El(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ki));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (El(e, t, n), e = e.sibling; e !== null; ) El(e, t, n), (e = e.sibling);
}
function Cl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Cl(e, t, n), e = e.sibling; e !== null; ) Cl(e, t, n), (e = e.sibling);
}
var oe = null,
  Be = !1;
function gt(e, t, n) {
  for (n = n.child; n !== null; ) _p(e, t, n), (n = n.sibling);
}
function _p(e, t, n) {
  if (be && typeof be.onCommitFiberUnmount == "function")
    try {
      be.onCommitFiberUnmount(ko, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ce || En(n, t);
    case 6:
      var r = oe,
        i = Be;
      (oe = null),
        gt(e, t, n),
        (oe = r),
        (Be = i),
        oe !== null &&
          (Be
            ? ((e = oe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null &&
        (Be
          ? ((e = oe),
            (n = n.stateNode),
            e.nodeType === 8
              ? fs(e.parentNode, n)
              : e.nodeType === 1 && fs(e, n),
            Lr(e))
          : fs(oe, n.stateNode));
      break;
    case 4:
      (r = oe),
        (i = Be),
        (oe = n.stateNode.containerInfo),
        (Be = !0),
        gt(e, t, n),
        (oe = r),
        (Be = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && xl(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      gt(e, t, n);
      break;
    case 1:
      if (
        !ce &&
        (En(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          K(n, t, l);
        }
      gt(e, t, n);
      break;
    case 21:
      gt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ce = (r = ce) || n.memoizedState !== null), gt(e, t, n), (ce = r))
        : gt(e, t, n);
      break;
    default:
      gt(e, t, n);
  }
}
function dc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new P0()),
      t.forEach(function (r) {
        var i = I0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function ze(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (oe = l.stateNode), (Be = !1);
              break e;
            case 3:
              (oe = l.stateNode.containerInfo), (Be = !0);
              break e;
            case 4:
              (oe = l.stateNode.containerInfo), (Be = !0);
              break e;
          }
          l = l.return;
        }
        if (oe === null) throw Error(E(160));
        _p(o, s, i), (oe = null), (Be = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (u) {
        K(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Vp(t, e), (t = t.sibling);
}
function Vp(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ze(t, e), Ge(e), r & 4)) {
        try {
          mr(3, e, e.return), Ro(3, e);
        } catch (y) {
          K(e, e.return, y);
        }
        try {
          mr(5, e, e.return);
        } catch (y) {
          K(e, e.return, y);
        }
      }
      break;
    case 1:
      ze(t, e), Ge(e), r & 512 && n !== null && En(n, n.return);
      break;
    case 5:
      if (
        (ze(t, e),
        Ge(e),
        r & 512 && n !== null && En(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Pr(i, "");
        } catch (y) {
          K(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && o.type === "radio" && o.name != null && Xf(i, o),
              Ys(l, s);
            var u = Ys(l, o);
            for (s = 0; s < a.length; s += 2) {
              var c = a[s],
                d = a[s + 1];
              c === "style"
                ? ed(i, d)
                : c === "dangerouslySetInnerHTML"
                ? qf(i, d)
                : c === "children"
                ? Pr(i, d)
                : ql(i, c, d, u);
            }
            switch (l) {
              case "input":
                Ws(i, o);
                break;
              case "textarea":
                Zf(i, o);
                break;
              case "select":
                var f = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var m = o.value;
                m != null
                  ? Vn(i, !!o.multiple, m, !1)
                  : f !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Vn(i, !!o.multiple, o.defaultValue, !0)
                      : Vn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Nr] = o;
          } catch (y) {
            K(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((ze(t, e), Ge(e), r & 4)) {
        if (e.stateNode === null) throw Error(E(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          K(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (ze(t, e), Ge(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Lr(t.containerInfo);
        } catch (y) {
          K(e, e.return, y);
        }
      break;
    case 4:
      ze(t, e), Ge(e);
      break;
    case 13:
      ze(t, e),
        Ge(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Aa = Z())),
        r & 4 && dc(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ce = (u = ce) || c), ze(t, e), (ce = u)) : ze(t, e),
        Ge(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (T = e, c = e.child; c !== null; ) {
            for (d = T = c; T !== null; ) {
              switch (((f = T), (m = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  mr(4, f, f.return);
                  break;
                case 1:
                  En(f, f.return);
                  var g = f.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (y) {
                      K(r, n, y);
                    }
                  }
                  break;
                case 5:
                  En(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    hc(d);
                    continue;
                  }
              }
              m !== null ? ((m.return = f), (T = m)) : hc(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                (i = d.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((l = d.stateNode),
                      (a = d.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = bf("display", s)));
              } catch (y) {
                K(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (y) {
                K(e, e.return, y);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            c === d && (c = null), (d = d.return);
          }
          c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      ze(t, e), Ge(e), r & 4 && dc(e);
      break;
    case 21:
      break;
    default:
      ze(t, e), Ge(e);
  }
}
function Ge(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Tp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Pr(i, ""), (r.flags &= -33));
          var o = fc(e);
          Cl(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = fc(e);
          El(e, l, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (a) {
      K(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function _0(e, t, n) {
  (T = e), Lp(e);
}
function Lp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var i = T,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || gi;
      if (!s) {
        var l = i.alternate,
          a = (l !== null && l.memoizedState !== null) || ce;
        l = gi;
        var u = ce;
        if (((gi = s), (ce = a) && !u))
          for (T = i; T !== null; )
            (s = T),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? mc(i)
                : a !== null
                ? ((a.return = s), (T = a))
                : mc(i);
        for (; o !== null; ) (T = o), Lp(o), (o = o.sibling);
        (T = i), (gi = l), (ce = u);
      }
      pc(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (T = o)) : pc(e);
  }
}
function pc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ce || Ro(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ce)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Fe(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Zu(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Zu(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && Lr(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(E(163));
          }
        ce || (t.flags & 512 && kl(t));
      } catch (f) {
        K(t, t.return, f);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (T = n);
      break;
    }
    T = t.return;
  }
}
function hc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (T = n);
      break;
    }
    T = t.return;
  }
}
function mc(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ro(4, t);
          } catch (a) {
            K(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              K(t, i, a);
            }
          }
          var o = t.return;
          try {
            kl(t);
          } catch (a) {
            K(t, o, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            kl(t);
          } catch (a) {
            K(t, s, a);
          }
      }
    } catch (a) {
      K(t, t.return, a);
    }
    if (t === e) {
      T = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (T = l);
      break;
    }
    T = t.return;
  }
}
var V0 = Math.ceil,
  ro = mt.ReactCurrentDispatcher,
  La = mt.ReactCurrentOwner,
  Ne = mt.ReactCurrentBatchConfig,
  O = 0,
  ie = null,
  J = null,
  se = 0,
  Ee = 0,
  Cn = Bt(0),
  te = 0,
  Br = null,
  on = 0,
  Ao = 0,
  Ra = 0,
  vr = null,
  ye = null,
  Aa = 0,
  Un = 1 / 0,
  ot = null,
  io = !1,
  Pl = null,
  Dt = null,
  yi = !1,
  Pt = null,
  oo = 0,
  gr = 0,
  Tl = null,
  Mi = -1,
  Ni = 0;
function me() {
  return O & 6 ? Z() : Mi !== -1 ? Mi : (Mi = Z());
}
function Mt(e) {
  return e.mode & 1
    ? O & 2 && se !== 0
      ? se & -se
      : f0.transition !== null
      ? (Ni === 0 && (Ni = dd()), Ni)
      : ((e = z),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : wd(e.type))),
        e)
    : 1;
}
function We(e, t, n, r) {
  if (50 < gr) throw ((gr = 0), (Tl = null), Error(E(185)));
  Yr(e, n, r),
    (!(O & 2) || e !== ie) &&
      (e === ie && (!(O & 2) && (Ao |= n), te === 4 && Et(e, se)),
      ke(e, r),
      n === 1 && O === 0 && !(t.mode & 1) && ((Un = Z() + 500), _o && Ut()));
}
function ke(e, t) {
  var n = e.callbackNode;
  fv(e, t);
  var r = $i(e, e === ie ? se : 0);
  if (r === 0)
    n !== null && Cu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Cu(n), t === 1))
      e.tag === 0 ? c0(vc.bind(null, e)) : jd(vc.bind(null, e)),
        s0(function () {
          !(O & 6) && Ut();
        }),
        (n = null);
    else {
      switch (pd(r)) {
        case 1:
          n = ra;
          break;
        case 4:
          n = cd;
          break;
        case 16:
          n = Ui;
          break;
        case 536870912:
          n = fd;
          break;
        default:
          n = Ui;
      }
      n = zp(n, Rp.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Rp(e, t) {
  if (((Mi = -1), (Ni = 0), O & 6)) throw Error(E(327));
  var n = e.callbackNode;
  if (Mn() && e.callbackNode !== n) return null;
  var r = $i(e, e === ie ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = so(e, r);
  else {
    t = r;
    var i = O;
    O |= 2;
    var o = Dp();
    (ie !== e || se !== t) && ((ot = null), (Un = Z() + 500), bt(e, t));
    do
      try {
        A0();
        break;
      } catch (l) {
        Ap(e, l);
      }
    while (!0);
    va(),
      (ro.current = o),
      (O = i),
      J !== null ? (t = 0) : ((ie = null), (se = 0), (t = te));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = bs(e)), i !== 0 && ((r = i), (t = _l(e, i)))), t === 1)
    )
      throw ((n = Br), bt(e, 0), Et(e, r), ke(e, Z()), n);
    if (t === 6) Et(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !L0(i) &&
          ((t = so(e, r)),
          t === 2 && ((o = bs(e)), o !== 0 && ((r = o), (t = _l(e, o)))),
          t === 1))
      )
        throw ((n = Br), bt(e, 0), Et(e, r), ke(e, Z()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          Gt(e, ye, ot);
          break;
        case 3:
          if (
            (Et(e, r), (r & 130023424) === r && ((t = Aa + 500 - Z()), 10 < t))
          ) {
            if ($i(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              me(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = ll(Gt.bind(null, e, ye, ot), t);
            break;
          }
          Gt(e, ye, ot);
          break;
        case 4:
          if ((Et(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - $e(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = Z() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * V0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ll(Gt.bind(null, e, ye, ot), r);
            break;
          }
          Gt(e, ye, ot);
          break;
        case 5:
          Gt(e, ye, ot);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return ke(e, Z()), e.callbackNode === n ? Rp.bind(null, e) : null;
}
function _l(e, t) {
  var n = vr;
  return (
    e.current.memoizedState.isDehydrated && (bt(e, t).flags |= 256),
    (e = so(e, t)),
    e !== 2 && ((t = ye), (ye = n), t !== null && Vl(t)),
    e
  );
}
function Vl(e) {
  ye === null ? (ye = e) : ye.push.apply(ye, e);
}
function L0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!He(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Et(e, t) {
  for (
    t &= ~Ra,
      t &= ~Ao,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - $e(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function vc(e) {
  if (O & 6) throw Error(E(327));
  Mn();
  var t = $i(e, 0);
  if (!(t & 1)) return ke(e, Z()), null;
  var n = so(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = bs(e);
    r !== 0 && ((t = r), (n = _l(e, r)));
  }
  if (n === 1) throw ((n = Br), bt(e, 0), Et(e, t), ke(e, Z()), n);
  if (n === 6) throw Error(E(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Gt(e, ye, ot),
    ke(e, Z()),
    null
  );
}
function Da(e, t) {
  var n = O;
  O |= 1;
  try {
    return e(t);
  } finally {
    (O = n), O === 0 && ((Un = Z() + 500), _o && Ut());
  }
}
function sn(e) {
  Pt !== null && Pt.tag === 0 && !(O & 6) && Mn();
  var t = O;
  O |= 1;
  var n = Ne.transition,
    r = z;
  try {
    if (((Ne.transition = null), (z = 1), e)) return e();
  } finally {
    (z = r), (Ne.transition = n), (O = t), !(O & 6) && Ut();
  }
}
function Ma() {
  (Ee = Cn.current), U(Cn);
}
function bt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), o0(n)), J !== null))
    for (n = J.return; n !== null; ) {
      var r = n;
      switch ((pa(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Gi();
          break;
        case 3:
          Fn(), U(Se), U(fe), ka();
          break;
        case 5:
          xa(r);
          break;
        case 4:
          Fn();
          break;
        case 13:
          U(W);
          break;
        case 19:
          U(W);
          break;
        case 10:
          ga(r.type._context);
          break;
        case 22:
        case 23:
          Ma();
      }
      n = n.return;
    }
  if (
    ((ie = e),
    (J = e = Nt(e.current, null)),
    (se = Ee = t),
    (te = 0),
    (Br = null),
    (Ra = Ao = on = 0),
    (ye = vr = null),
    Zt !== null)
  ) {
    for (t = 0; t < Zt.length; t++)
      if (((n = Zt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    Zt = null;
  }
  return e;
}
function Ap(e, t) {
  do {
    var n = J;
    try {
      if ((va(), (Ri.current = no), to)) {
        for (var r = H.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        to = !1;
      }
      if (
        ((rn = 0),
        (re = ee = H = null),
        (hr = !1),
        (zr = 0),
        (La.current = null),
        n === null || n.return === null)
      ) {
        (te = 1), (Br = t), (J = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = se),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            c = l,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var f = c.alternate;
            f
              ? ((c.updateQueue = f.updateQueue),
                (c.memoizedState = f.memoizedState),
                (c.lanes = f.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var m = rc(s);
          if (m !== null) {
            (m.flags &= -257),
              ic(m, s, l, o, t),
              m.mode & 1 && nc(o, u, t),
              (t = m),
              (a = u);
            var g = t.updateQueue;
            if (g === null) {
              var y = new Set();
              y.add(a), (t.updateQueue = y);
            } else g.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              nc(o, u, t), Na();
              break e;
            }
            a = Error(E(426));
          }
        } else if ($ && l.mode & 1) {
          var S = rc(s);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256),
              ic(S, s, l, o, t),
              ha(Bn(a, l));
            break e;
          }
        }
        (o = a = Bn(a, l)),
          te !== 4 && (te = 2),
          vr === null ? (vr = [o]) : vr.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var h = hp(o, a, t);
              Xu(o, h);
              break e;
            case 1:
              l = a;
              var p = o.type,
                v = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (Dt === null || !Dt.has(v))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var w = mp(o, l, t);
                Xu(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Np(n);
    } catch (k) {
      (t = k), J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Dp() {
  var e = ro.current;
  return (ro.current = no), e === null ? no : e;
}
function Na() {
  (te === 0 || te === 3 || te === 2) && (te = 4),
    ie === null || (!(on & 268435455) && !(Ao & 268435455)) || Et(ie, se);
}
function so(e, t) {
  var n = O;
  O |= 2;
  var r = Dp();
  (ie !== e || se !== t) && ((ot = null), bt(e, t));
  do
    try {
      R0();
      break;
    } catch (i) {
      Ap(e, i);
    }
  while (!0);
  if ((va(), (O = n), (ro.current = r), J !== null)) throw Error(E(261));
  return (ie = null), (se = 0), te;
}
function R0() {
  for (; J !== null; ) Mp(J);
}
function A0() {
  for (; J !== null && !nv(); ) Mp(J);
}
function Mp(e) {
  var t = Op(e.alternate, e, Ee);
  (e.memoizedProps = e.pendingProps),
    t === null ? Np(e) : (J = t),
    (La.current = null);
}
function Np(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = C0(n, t)), n !== null)) {
        (n.flags &= 32767), (J = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (te = 6), (J = null);
        return;
      }
    } else if (((n = E0(n, t, Ee)), n !== null)) {
      J = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Gt(e, t, n) {
  var r = z,
    i = Ne.transition;
  try {
    (Ne.transition = null), (z = 1), D0(e, t, n, r);
  } finally {
    (Ne.transition = i), (z = r);
  }
  return null;
}
function D0(e, t, n, r) {
  do Mn();
  while (Pt !== null);
  if (O & 6) throw Error(E(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(E(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (dv(e, o),
    e === ie && ((J = ie = null), (se = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      yi ||
      ((yi = !0),
      zp(Ui, function () {
        return Mn(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Ne.transition), (Ne.transition = null);
    var s = z;
    z = 1;
    var l = O;
    (O |= 4),
      (La.current = null),
      T0(e, n),
      Vp(n, e),
      qv(ol),
      (Wi = !!il),
      (ol = il = null),
      (e.current = n),
      _0(n),
      rv(),
      (O = l),
      (z = s),
      (Ne.transition = o);
  } else e.current = n;
  if (
    (yi && ((yi = !1), (Pt = e), (oo = i)),
    (o = e.pendingLanes),
    o === 0 && (Dt = null),
    sv(n.stateNode),
    ke(e, Z()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (io) throw ((io = !1), (e = Pl), (Pl = null), e);
  return (
    oo & 1 && e.tag !== 0 && Mn(),
    (o = e.pendingLanes),
    o & 1 ? (e === Tl ? gr++ : ((gr = 0), (Tl = e))) : (gr = 0),
    Ut(),
    null
  );
}
function Mn() {
  if (Pt !== null) {
    var e = pd(oo),
      t = Ne.transition,
      n = z;
    try {
      if (((Ne.transition = null), (z = 16 > e ? 16 : e), Pt === null))
        var r = !1;
      else {
        if (((e = Pt), (Pt = null), (oo = 0), O & 6)) throw Error(E(331));
        var i = O;
        for (O |= 4, T = e.current; T !== null; ) {
          var o = T,
            s = o.child;
          if (T.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (T = u; T !== null; ) {
                  var c = T;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mr(8, c, o);
                  }
                  var d = c.child;
                  if (d !== null) (d.return = c), (T = d);
                  else
                    for (; T !== null; ) {
                      c = T;
                      var f = c.sibling,
                        m = c.return;
                      if ((Pp(c), c === u)) {
                        T = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = m), (T = f);
                        break;
                      }
                      T = m;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var y = g.child;
                if (y !== null) {
                  g.child = null;
                  do {
                    var S = y.sibling;
                    (y.sibling = null), (y = S);
                  } while (y !== null);
                }
              }
              T = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), (T = s);
          else
            e: for (; T !== null; ) {
              if (((o = T), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    mr(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                (h.return = o.return), (T = h);
                break e;
              }
              T = o.return;
            }
        }
        var p = e.current;
        for (T = p; T !== null; ) {
          s = T;
          var v = s.child;
          if (s.subtreeFlags & 2064 && v !== null) (v.return = s), (T = v);
          else
            e: for (s = p; T !== null; ) {
              if (((l = T), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ro(9, l);
                  }
                } catch (k) {
                  K(l, l.return, k);
                }
              if (l === s) {
                T = null;
                break e;
              }
              var w = l.sibling;
              if (w !== null) {
                (w.return = l.return), (T = w);
                break e;
              }
              T = l.return;
            }
        }
        if (
          ((O = i), Ut(), be && typeof be.onPostCommitFiberRoot == "function")
        )
          try {
            be.onPostCommitFiberRoot(ko, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (z = n), (Ne.transition = t);
    }
  }
  return !1;
}
function gc(e, t, n) {
  (t = Bn(n, t)),
    (t = hp(e, t, 1)),
    (e = At(e, t, 1)),
    (t = me()),
    e !== null && (Yr(e, 1, t), ke(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) gc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        gc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Dt === null || !Dt.has(r)))
        ) {
          (e = Bn(n, e)),
            (e = mp(t, e, 1)),
            (t = At(t, e, 1)),
            (e = me()),
            t !== null && (Yr(t, 1, e), ke(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function M0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = me()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ie === e &&
      (se & n) === n &&
      (te === 4 || (te === 3 && (se & 130023424) === se && 500 > Z() - Aa)
        ? bt(e, 0)
        : (Ra |= n)),
    ke(e, t);
}
function Ip(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = ai), (ai <<= 1), !(ai & 130023424) && (ai = 4194304))
      : (t = 1));
  var n = me();
  (e = pt(e, t)), e !== null && (Yr(e, t, n), ke(e, n));
}
function N0(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Ip(e, n);
}
function I0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(E(314));
  }
  r !== null && r.delete(t), Ip(e, n);
}
var Op;
Op = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Se.current) we = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (we = !1), k0(e, t, n);
      we = !!(e.flags & 131072);
    }
  else (we = !1), $ && t.flags & 1048576 && Fd(t, Zi, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Di(e, t), (e = t.pendingProps);
      var i = On(t, fe.current);
      Dn(t, n), (i = Ca(null, t, r, e, i, n));
      var o = Pa();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            xe(r) ? ((o = !0), Yi(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            wa(t),
            (i.updater = Vo),
            (t.stateNode = i),
            (i._reactInternals = t),
            hl(t, r, e, n),
            (t = gl(null, t, r, !0, o, n)))
          : ((t.tag = 0), $ && o && da(t), he(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Di(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = z0(r)),
          (e = Fe(r, e)),
          i)
        ) {
          case 0:
            t = vl(null, t, r, e, n);
            break e;
          case 1:
            t = lc(null, t, r, e, n);
            break e;
          case 11:
            t = oc(null, t, r, e, n);
            break e;
          case 14:
            t = sc(null, t, r, Fe(r.type, e), n);
            break e;
        }
        throw Error(E(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Fe(r, i)),
        vl(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Fe(r, i)),
        lc(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((wp(t), e === null)) throw Error(E(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Wd(e, t),
          bi(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = Bn(Error(E(423)), t)), (t = ac(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Bn(Error(E(424)), t)), (t = ac(e, t, r, n, i));
            break e;
          } else
            for (
              Ce = Rt(t.stateNode.containerInfo.firstChild),
                Pe = t,
                $ = !0,
                Ue = null,
                n = Gd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((zn(), r === i)) {
            t = ht(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Yd(t),
        e === null && fl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        sl(r, i) ? (s = null) : o !== null && sl(r, o) && (t.flags |= 32),
        yp(e, t),
        he(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && fl(t), null;
    case 13:
      return Sp(e, t, n);
    case 4:
      return (
        Sa(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = jn(t, null, r, n)) : he(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Fe(r, i)),
        oc(e, t, r, i, n)
      );
    case 7:
      return he(e, t, t.pendingProps, n), t.child;
    case 8:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          F(Ji, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (He(o.value, s)) {
            if (o.children === i.children && !Se.current) {
              t = ht(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                s = o.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = ut(-1, n & -n)), (a.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (u.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      dl(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(E(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  dl(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        he(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Dn(t, n),
        (i = Ie(i)),
        (r = r(i)),
        (t.flags |= 1),
        he(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Fe(r, t.pendingProps)),
        (i = Fe(r.type, i)),
        sc(e, t, r, i, n)
      );
    case 15:
      return vp(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Fe(r, i)),
        Di(e, t),
        (t.tag = 1),
        xe(r) ? ((e = !0), Yi(t)) : (e = !1),
        Dn(t, n),
        Qd(t, r, i),
        hl(t, r, i, n),
        gl(null, t, r, !0, e, n)
      );
    case 19:
      return xp(e, t, n);
    case 22:
      return gp(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function zp(e, t) {
  return ud(e, t);
}
function O0(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Me(e, t, n, r) {
  return new O0(e, t, n, r);
}
function Ia(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function z0(e) {
  if (typeof e == "function") return Ia(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ea)) return 11;
    if (e === ta) return 14;
  }
  return 2;
}
function Nt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Me(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ii(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) Ia(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case hn:
        return en(n.children, i, o, t);
      case bl:
        (s = 8), (i |= 8);
        break;
      case js:
        return (
          (e = Me(12, n, t, i | 2)), (e.elementType = js), (e.lanes = o), e
        );
      case Fs:
        return (e = Me(13, n, t, i)), (e.elementType = Fs), (e.lanes = o), e;
      case Bs:
        return (e = Me(19, n, t, i)), (e.elementType = Bs), (e.lanes = o), e;
      case Kf:
        return Do(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Hf:
              s = 10;
              break e;
            case Qf:
              s = 9;
              break e;
            case ea:
              s = 11;
              break e;
            case ta:
              s = 14;
              break e;
            case wt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(E(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Me(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function en(e, t, n, r) {
  return (e = Me(7, e, r, t)), (e.lanes = n), e;
}
function Do(e, t, n, r) {
  return (
    (e = Me(22, e, r, t)),
    (e.elementType = Kf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ws(e, t, n) {
  return (e = Me(6, e, null, t)), (e.lanes = n), e;
}
function Ss(e, t, n) {
  return (
    (t = Me(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function j0(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = es(0)),
    (this.expirationTimes = es(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = es(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Oa(e, t, n, r, i, o, s, l, a) {
  return (
    (e = new j0(e, t, n, l, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Me(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    wa(o),
    e
  );
}
function F0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: pn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function jp(e) {
  if (!e) return Ot;
  e = e._reactInternals;
  e: {
    if (an(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (xe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xe(n)) return zd(e, n, t);
  }
  return t;
}
function Fp(e, t, n, r, i, o, s, l, a) {
  return (
    (e = Oa(n, r, !0, e, i, o, s, l, a)),
    (e.context = jp(null)),
    (n = e.current),
    (r = me()),
    (i = Mt(n)),
    (o = ut(r, i)),
    (o.callback = t ?? null),
    At(n, o, i),
    (e.current.lanes = i),
    Yr(e, i, r),
    ke(e, r),
    e
  );
}
function Mo(e, t, n, r) {
  var i = t.current,
    o = me(),
    s = Mt(i);
  return (
    (n = jp(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = ut(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = At(i, t, s)),
    e !== null && (We(e, i, s, o), Li(e, i, s)),
    s
  );
}
function lo(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function yc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function za(e, t) {
  yc(e, t), (e = e.alternate) && yc(e, t);
}
function B0() {
  return null;
}
var Bp =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ja(e) {
  this._internalRoot = e;
}
No.prototype.render = ja.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Mo(e, t, null, null);
};
No.prototype.unmount = ja.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    sn(function () {
      Mo(null, e, null, null);
    }),
      (t[dt] = null);
  }
};
function No(e) {
  this._internalRoot = e;
}
No.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = vd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < kt.length && t !== 0 && t < kt[n].priority; n++);
    kt.splice(n, 0, e), n === 0 && yd(e);
  }
};
function Fa(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Io(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function wc() {}
function U0(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = lo(s);
        o.call(u);
      };
    }
    var s = Fp(t, r, e, 0, null, !1, !1, "", wc);
    return (
      (e._reactRootContainer = s),
      (e[dt] = s.current),
      Dr(e.nodeType === 8 ? e.parentNode : e),
      sn(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = lo(a);
      l.call(u);
    };
  }
  var a = Oa(e, 0, !1, null, null, !1, !1, "", wc);
  return (
    (e._reactRootContainer = a),
    (e[dt] = a.current),
    Dr(e.nodeType === 8 ? e.parentNode : e),
    sn(function () {
      Mo(t, a, n, r);
    }),
    a
  );
}
function Oo(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function () {
        var a = lo(s);
        l.call(a);
      };
    }
    Mo(t, s, e, i);
  } else s = U0(n, t, e, i, r);
  return lo(s);
}
hd = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = sr(t.pendingLanes);
        n !== 0 &&
          (ia(t, n | 1), ke(t, Z()), !(O & 6) && ((Un = Z() + 500), Ut()));
      }
      break;
    case 13:
      sn(function () {
        var r = pt(e, 1);
        if (r !== null) {
          var i = me();
          We(r, e, 1, i);
        }
      }),
        za(e, 1);
  }
};
oa = function (e) {
  if (e.tag === 13) {
    var t = pt(e, 134217728);
    if (t !== null) {
      var n = me();
      We(t, e, 134217728, n);
    }
    za(e, 134217728);
  }
};
md = function (e) {
  if (e.tag === 13) {
    var t = Mt(e),
      n = pt(e, t);
    if (n !== null) {
      var r = me();
      We(n, e, t, r);
    }
    za(e, t);
  }
};
vd = function () {
  return z;
};
gd = function (e, t) {
  var n = z;
  try {
    return (z = e), t();
  } finally {
    z = n;
  }
};
Zs = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Ws(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = To(r);
            if (!i) throw Error(E(90));
            Yf(r), Ws(r, i);
          }
        }
      }
      break;
    case "textarea":
      Zf(e, n);
      break;
    case "select":
      (t = n.value), t != null && Vn(e, !!n.multiple, t, !1);
  }
};
rd = Da;
id = sn;
var $0 = { usingClientEntryPoint: !1, Events: [Zr, yn, To, td, nd, Da] },
  tr = {
    findFiberByHostInstance: Xt,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  W0 = {
    bundleType: tr.bundleType,
    version: tr.version,
    rendererPackageName: tr.rendererPackageName,
    rendererConfig: tr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: mt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ld(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: tr.findFiberByHostInstance || B0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wi.isDisabled && wi.supportsFiber)
    try {
      (ko = wi.inject(W0)), (be = wi);
    } catch {}
}
Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $0;
Le.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fa(t)) throw Error(E(200));
  return F0(e, t, null, n);
};
Le.createRoot = function (e, t) {
  if (!Fa(e)) throw Error(E(299));
  var n = !1,
    r = "",
    i = Bp;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Oa(e, 1, !1, null, null, n, !1, r, i)),
    (e[dt] = t.current),
    Dr(e.nodeType === 8 ? e.parentNode : e),
    new ja(t)
  );
};
Le.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(E(188))
      : ((e = Object.keys(e).join(",")), Error(E(268, e)));
  return (e = ld(t)), (e = e === null ? null : e.stateNode), e;
};
Le.flushSync = function (e) {
  return sn(e);
};
Le.hydrate = function (e, t, n) {
  if (!Io(t)) throw Error(E(200));
  return Oo(null, e, t, !0, n);
};
Le.hydrateRoot = function (e, t, n) {
  if (!Fa(e)) throw Error(E(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = Bp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Fp(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[dt] = t.current),
    Dr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new No(t);
};
Le.render = function (e, t, n) {
  if (!Io(t)) throw Error(E(200));
  return Oo(null, e, t, !1, n);
};
Le.unmountComponentAtNode = function (e) {
  if (!Io(e)) throw Error(E(40));
  return e._reactRootContainer
    ? (sn(function () {
        Oo(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[dt] = null);
        });
      }),
      !0)
    : !1;
};
Le.unstable_batchedUpdates = Da;
Le.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Io(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return Oo(e, t, n, !1, r);
};
Le.version = "18.2.0-next-9e3b772b8-20220608";
function Up() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Up);
    } catch (e) {
      console.error(e);
    }
}
Up(), (Ff.exports = Le);
var H0 = Ff.exports,
  Sc = H0;
(Os.createRoot = Sc.createRoot), (Os.hydrateRoot = Sc.hydrateRoot);
const Q0 = "modulepreload",
  K0 = function (e) {
    return "/" + e;
  },
  xc = {},
  Ye = function (t, n, r) {
    let i = Promise.resolve();
    if (n && n.length > 0) {
      const o = document.getElementsByTagName("link");
      i = Promise.all(
        n.map((s) => {
          if (((s = K0(s)), s in xc)) return;
          xc[s] = !0;
          const l = s.endsWith(".css"),
            a = l ? '[rel="stylesheet"]' : "";
          if (!!r)
            for (let d = o.length - 1; d >= 0; d--) {
              const f = o[d];
              if (f.href === s && (!l || f.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${s}"]${a}`)) return;
          const c = document.createElement("link");
          if (
            ((c.rel = l ? "stylesheet" : Q0),
            l || ((c.as = "script"), (c.crossOrigin = "")),
            (c.href = s),
            document.head.appendChild(c),
            l)
          )
            return new Promise((d, f) => {
              c.addEventListener("load", d),
                c.addEventListener("error", () =>
                  f(new Error(`Unable to preload CSS for ${s}`))
                );
            });
        })
      );
    }
    return i
      .then(() => t())
      .catch((o) => {
        const s = new Event("vite:preloadError", { cancelable: !0 });
        if (((s.payload = o), window.dispatchEvent(s), !s.defaultPrevented))
          throw o;
      });
  },
  G0 = {
    clock: x.lazy(() =>
      Ye(() => import("./Clock-BTo7ltjY.js"), __vite__mapDeps([]))
    ),
    calculator: x.lazy(() =>
      Ye(() => import("./index-6JFqcYfN.js"), __vite__mapDeps([]))
    ),
    navigator: x.lazy(() =>
      Ye(() => import("./Navigator-BtyWrFg0.js"), __vite__mapDeps([]))
    ),
    pyide: x.lazy(() =>
      Ye(() => import("./PyIDE-DP_Z9GiL.js"), __vite__mapDeps([0, 1]))
    ),
    terminal: x.lazy(() =>
      Ye(() => import("./index-BJb8F9Il.js"), __vite__mapDeps([2, 1, 3]))
    ),
    quachat: x.lazy(() =>
      Ye(() => import("./QuaChat-DF54pzFG.js"), __vite__mapDeps([]))
    ),
    Notepad: x.lazy(() =>
      Ye(() => import("./Notepad-BkxSz9jP.js"), __vite__mapDeps([]))
    ),
    game: x.lazy(() =>
      Ye(() => import("./Dinosaur-DmV5Ga-W.js"), __vite__mapDeps([]))
    ),
    album: x.lazy(() =>
      Ye(() => import("./Album-Ca0CfmmM.js"), __vite__mapDeps([]))
    ),
  },
  $p = x.createContext({});
function Y0(e) {
  return Math.floor(
    Math.pow(10, e - 1) +
      Math.random() * (Math.pow(10, e) - Math.pow(10, e - 1) - 1)
  );
}
const X0 = ({ children: e }) => {
  const [t, n] = x.useState([]),
    [r, i] = x.useState("");
  x.useEffect(() => {
    if (!r || t.length <= 1) return;
    const a = t.findIndex(({ id: d }) => d === r),
      u = t[a],
      c = t.toSpliced(a, 1);
    c.push(u), n(c);
  }, [r]);
  const o = ({ name: a, x: u, y: c }) => {
      const d = G0[a],
        f = {
          id: Y0(8).toString(),
          Node: d,
          title: a,
          start: Date.now(),
          x: u,
          y: c,
        };
      i(f.id), n([...t, f]);
    },
    s = (a) => {
      n((u) => u.filter((c) => c.id !== a));
    },
    l = () => {
      n([]);
    };
  return L.jsx($p.Provider, {
    value: {
      apps: t,
      addApp: o,
      removeApp: s,
      clearApps: l,
      appOnFocus: r,
      setAppOnFocus: i,
    },
    children: e,
  });
};
function Wp(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  e && e.addEventListener && e.addEventListener.apply(e, t);
}
function Hp(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var xs = typeof window < "u",
  Z0 = ["mousedown", "touchstart"],
  Qp = function (e, t, n) {
    n === void 0 && (n = Z0);
    var r = x.useRef(t);
    x.useEffect(
      function () {
        r.current = t;
      },
      [t]
    ),
      x.useEffect(
        function () {
          for (
            var i = function (a) {
                var u = e.current;
                u && !u.contains(a.target) && r.current(a);
              },
              o = 0,
              s = n;
            o < s.length;
            o++
          ) {
            var l = s[o];
            Wp(document, l, i);
          }
          return function () {
            for (var a = 0, u = n; a < u.length; a++) {
              var c = u[a];
              Hp(document, c, i);
            }
          };
        },
        [n, e]
      );
  },
  J0 = function (e) {
    x.useEffect(e, []);
  },
  q0 = function (e) {
    var t = x.useRef(e);
    (t.current = e),
      J0(function () {
        return function () {
          return t.current();
        };
      });
  },
  b0 = function (e) {
    var t = x.useRef(0),
      n = x.useState(e),
      r = n[0],
      i = n[1],
      o = x.useCallback(function (s) {
        cancelAnimationFrame(t.current),
          (t.current = requestAnimationFrame(function () {
            i(s);
          }));
      }, []);
    return (
      q0(function () {
        cancelAnimationFrame(t.current);
      }),
      [r, o]
    );
  },
  Kp = function (e, t) {
    e === void 0 && (e = 1 / 0), t === void 0 && (t = 1 / 0);
    var n = b0({
        width: xs ? window.innerWidth : e,
        height: xs ? window.innerHeight : t,
      }),
      r = n[0],
      i = n[1];
    return (
      x.useEffect(function () {
        if (xs) {
          var o = function () {
            i({ width: window.innerWidth, height: window.innerHeight });
          };
          return (
            Wp(window, "resize", o),
            function () {
              Hp(window, "resize", o);
            }
          );
        }
      }, []),
      r
    );
  };
function zo() {
  const e = x.useContext($p);
  if (!e) throw new Error("useApps must be used within an ApplicationProvider");
  return e;
}
const Ba = x.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  jo = x.createContext({});
function eg() {
  return x.useContext(jo).visualElement;
}
const Fo = x.createContext(null),
  un = typeof document < "u",
  ks = un ? x.useLayoutEffect : x.useEffect,
  Gp = x.createContext({ strict: !1 });
function tg(e, t, n, r) {
  const i = eg(),
    o = x.useContext(Gp),
    s = x.useContext(Fo),
    l = x.useContext(Ba).reducedMotion,
    a = x.useRef();
  (r = r || o.renderer),
    !a.current &&
      r &&
      (a.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceId: s ? s.id : void 0,
        blockInitialAnimation: s ? s.initial === !1 : !1,
        reducedMotionConfig: l,
      }));
  const u = a.current;
  return (
    ks(() => {
      u && u.render();
    }),
    ks(() => {
      u && u.animationState && u.animationState.animateChanges();
    }),
    ks(() => () => u && u.notify("Unmount"), []),
    u
  );
}
function Pn(e) {
  return (
    typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function ng(e, t, n) {
  return x.useCallback(
    (r) => {
      r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : Pn(n) && (n.current = r));
    },
    [t]
  );
}
function Ur(e) {
  return typeof e == "string" || Array.isArray(e);
}
function Bo(e) {
  return typeof e == "object" && typeof e.start == "function";
}
const rg = [
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileDrag",
  "whileTap",
  "whileFocus",
  "whileInView",
];
function Uo(e) {
  return Bo(e.animate) || rg.some((t) => Ur(e[t]));
}
function Yp(e) {
  return !!(Uo(e) || e.variants);
}
function ig(e, t) {
  if (Uo(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || Ur(n) ? n : void 0,
      animate: Ur(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function og(e) {
  const { initial: t, animate: n } = ig(e, x.useContext(jo));
  return x.useMemo(() => ({ initial: t, animate: n }), [kc(t), kc(n)]);
}
function kc(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const it = (e) => ({ isEnabled: (t) => e.some((n) => !!t[n]) }),
  $r = {
    measureLayout: it(["layout", "layoutId", "drag"]),
    animation: it([
      "animate",
      "exit",
      "variants",
      "whileHover",
      "whileTap",
      "whileFocus",
      "whileDrag",
      "whileInView",
    ]),
    exit: it(["exit"]),
    drag: it(["drag", "dragControls"]),
    focus: it(["whileFocus"]),
    hover: it(["whileHover", "onHoverStart", "onHoverEnd"]),
    tap: it(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
    pan: it(["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"]),
    inView: it(["whileInView", "onViewportEnter", "onViewportLeave"]),
  };
function sg(e) {
  for (const t in e)
    t === "projectionNodeConstructor"
      ? ($r.projectionNodeConstructor = e[t])
      : ($r[t].Component = e[t]);
}
function $o(e) {
  const t = x.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const yr = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
let lg = 1;
function ag() {
  return $o(() => {
    if (yr.hasEverUpdated) return lg++;
  });
}
const Xp = x.createContext({});
class ug extends Gr.Component {
  getSnapshotBeforeUpdate() {
    const { visualElement: t, props: n } = this.props;
    return t && t.setProps(n), null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
const Zp = x.createContext({}),
  cg = Symbol.for("motionComponentSymbol");
function fg({
  preloadedFeatures: e,
  createVisualElement: t,
  projectionNodeConstructor: n,
  useRender: r,
  useVisualState: i,
  Component: o,
}) {
  e && sg(e);
  function s(a, u) {
    const c = { ...x.useContext(Ba), ...a, layoutId: dg(a) },
      { isStatic: d } = c;
    let f = null;
    const m = og(a),
      g = d ? void 0 : ag(),
      y = i(a, d);
    if (!d && un) {
      m.visualElement = tg(o, y, c, t);
      const S = x.useContext(Gp).strict,
        h = x.useContext(Zp);
      m.visualElement &&
        (f = m.visualElement.loadFeatures(
          c,
          S,
          e,
          g,
          n || $r.projectionNodeConstructor,
          h
        ));
    }
    return x.createElement(
      ug,
      { visualElement: m.visualElement, props: c },
      f,
      x.createElement(
        jo.Provider,
        { value: m },
        r(o, a, g, ng(y, m.visualElement, u), y, d, m.visualElement)
      )
    );
  }
  const l = x.forwardRef(s);
  return (l[cg] = o), l;
}
function dg({ layoutId: e }) {
  const t = x.useContext(Xp).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function pg(e) {
  function t(r, i = {}) {
    return fg(e(r, i));
  }
  if (typeof Proxy > "u") return t;
  const n = new Map();
  return new Proxy(t, {
    get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i)),
  });
}
const hg = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Ua(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(hg.indexOf(e) > -1 || /[A-Z]/.test(e));
}
const ao = {};
function mg(e) {
  Object.assign(ao, e);
}
const uo = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  cn = new Set(uo);
function Jp(e, { layout: t, layoutId: n }) {
  return (
    cn.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!ao[e] || e === "opacity"))
  );
}
const nt = (e) => !!(e != null && e.getVelocity),
  vg = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  gg = (e, t) => uo.indexOf(e) - uo.indexOf(t);
function yg(
  { transform: e, transformKeys: t },
  { enableHardwareAcceleration: n = !0, allowTransformNone: r = !0 },
  i,
  o
) {
  let s = "";
  t.sort(gg);
  for (const l of t) s += `${vg[l] || l}(${e[l]}) `;
  return (
    n && !e.z && (s += "translateZ(0)"),
    (s = s.trim()),
    o ? (s = o(e, i ? "" : s)) : r && i && (s = "none"),
    s
  );
}
function qp(e) {
  return e.startsWith("--");
}
const wg = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  $n = (e, t, n) => Math.min(Math.max(n, e), t),
  fn = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  wr = { ...fn, transform: (e) => $n(0, 1, e) },
  Si = { ...fn, default: 1 },
  Sr = (e) => Math.round(e * 1e5) / 1e5,
  Wr = /(-)?([\d]*\.?[\d])+/g,
  Ll =
    /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
  Sg =
    /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function qr(e) {
  return typeof e == "string";
}
const br = (e) => ({
    test: (t) => qr(t) && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  yt = br("deg"),
  tt = br("%"),
  A = br("px"),
  xg = br("vh"),
  kg = br("vw"),
  Ec = {
    ...tt,
    parse: (e) => tt.parse(e) / 100,
    transform: (e) => tt.transform(e * 100),
  },
  Cc = { ...fn, transform: Math.round },
  bp = {
    borderWidth: A,
    borderTopWidth: A,
    borderRightWidth: A,
    borderBottomWidth: A,
    borderLeftWidth: A,
    borderRadius: A,
    radius: A,
    borderTopLeftRadius: A,
    borderTopRightRadius: A,
    borderBottomRightRadius: A,
    borderBottomLeftRadius: A,
    width: A,
    maxWidth: A,
    height: A,
    maxHeight: A,
    size: A,
    top: A,
    right: A,
    bottom: A,
    left: A,
    padding: A,
    paddingTop: A,
    paddingRight: A,
    paddingBottom: A,
    paddingLeft: A,
    margin: A,
    marginTop: A,
    marginRight: A,
    marginBottom: A,
    marginLeft: A,
    rotate: yt,
    rotateX: yt,
    rotateY: yt,
    rotateZ: yt,
    scale: Si,
    scaleX: Si,
    scaleY: Si,
    scaleZ: Si,
    skew: yt,
    skewX: yt,
    skewY: yt,
    distance: A,
    translateX: A,
    translateY: A,
    translateZ: A,
    x: A,
    y: A,
    z: A,
    perspective: A,
    transformPerspective: A,
    opacity: wr,
    originX: Ec,
    originY: Ec,
    originZ: A,
    zIndex: Cc,
    fillOpacity: wr,
    strokeOpacity: wr,
    numOctaves: Cc,
  };
function $a(e, t, n, r) {
  const {
    style: i,
    vars: o,
    transform: s,
    transformKeys: l,
    transformOrigin: a,
  } = e;
  l.length = 0;
  let u = !1,
    c = !1,
    d = !0;
  for (const f in t) {
    const m = t[f];
    if (qp(f)) {
      o[f] = m;
      continue;
    }
    const g = bp[f],
      y = wg(m, g);
    if (cn.has(f)) {
      if (((u = !0), (s[f] = y), l.push(f), !d)) continue;
      m !== (g.default || 0) && (d = !1);
    } else f.startsWith("origin") ? ((c = !0), (a[f] = y)) : (i[f] = y);
  }
  if (
    (t.transform ||
      (u || r
        ? (i.transform = yg(e, n, d, r))
        : i.transform && (i.transform = "none")),
    c)
  ) {
    const { originX: f = "50%", originY: m = "50%", originZ: g = 0 } = a;
    i.transformOrigin = `${f} ${m} ${g}`;
  }
}
const Wa = () => ({
  style: {},
  transform: {},
  transformKeys: [],
  transformOrigin: {},
  vars: {},
});
function eh(e, t, n) {
  for (const r in t) !nt(t[r]) && !Jp(r, n) && (e[r] = t[r]);
}
function Eg({ transformTemplate: e }, t, n) {
  return x.useMemo(() => {
    const r = Wa();
    return (
      $a(r, t, { enableHardwareAcceleration: !n }, e),
      Object.assign({}, r.vars, r.style)
    );
  }, [t]);
}
function Cg(e, t, n) {
  const r = e.style || {},
    i = {};
  return (
    eh(i, r, e),
    Object.assign(i, Eg(e, t, n)),
    e.transformValues ? e.transformValues(i) : i
  );
}
function Pg(e, t, n) {
  const r = {},
    i = Cg(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    (r.style = i),
    r
  );
}
const Tg = [
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
  ],
  _g = ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  Vg = ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  Lg = ["whileInView", "onViewportEnter", "onViewportLeave", "viewport"],
  Rg = new Set([
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "transformValues",
    "custom",
    "inherit",
    "layout",
    "layoutId",
    "layoutDependency",
    "onLayoutAnimationStart",
    "onLayoutAnimationComplete",
    "onLayoutMeasure",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragDirectionLock",
    "dragSnapToOrigin",
    "_dragX",
    "_dragY",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "onHoverStart",
    "onHoverEnd",
    "layoutScroll",
    ...Lg,
    ..._g,
    ...Tg,
    ...Vg,
  ]);
function co(e) {
  return Rg.has(e);
}
let th = (e) => !co(e);
function Ag(e) {
  e && (th = (t) => (t.startsWith("on") ? !co(t) : e(t)));
}
try {
  Ag(require("@emotion/is-prop-valid").default);
} catch {}
function Dg(e, t, n) {
  const r = {};
  for (const i in e)
    (th(i) ||
      (n === !0 && co(i)) ||
      (!t && !co(i)) ||
      (e.draggable && i.startsWith("onDrag"))) &&
      (r[i] = e[i]);
  return r;
}
function Pc(e, t, n) {
  return typeof e == "string" ? e : A.transform(t + n * e);
}
function Mg(e, t, n) {
  const r = Pc(t, e.x, e.width),
    i = Pc(n, e.y, e.height);
  return `${r} ${i}`;
}
const Ng = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  Ig = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Og(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? Ng : Ig;
  e[o.offset] = A.transform(-r);
  const s = A.transform(t),
    l = A.transform(n);
  e[o.array] = `${s} ${l}`;
}
function Ha(
  e,
  {
    attrX: t,
    attrY: n,
    originX: r,
    originY: i,
    pathLength: o,
    pathSpacing: s = 1,
    pathOffset: l = 0,
    ...a
  },
  u,
  c,
  d
) {
  if (($a(e, a, u, d), c)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: f, style: m, dimensions: g } = e;
  f.transform && (g && (m.transform = f.transform), delete f.transform),
    g &&
      (r !== void 0 || i !== void 0 || m.transform) &&
      (m.transformOrigin = Mg(
        g,
        r !== void 0 ? r : 0.5,
        i !== void 0 ? i : 0.5
      )),
    t !== void 0 && (f.x = t),
    n !== void 0 && (f.y = n),
    o !== void 0 && Og(f, o, s, l, !1);
}
const nh = () => ({ ...Wa(), attrs: {} }),
  Qa = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function zg(e, t, n, r) {
  const i = x.useMemo(() => {
    const o = nh();
    return (
      Ha(o, t, { enableHardwareAcceleration: !1 }, Qa(r), e.transformTemplate),
      { ...o.attrs, style: { ...o.style } }
    );
  }, [t]);
  if (e.style) {
    const o = {};
    eh(o, e.style, e), (i.style = { ...o, ...i.style });
  }
  return i;
}
function jg(e = !1) {
  return (n, r, i, o, { latestValues: s }, l) => {
    const u = (Ua(n) ? zg : Pg)(r, s, l, n),
      d = { ...Dg(r, typeof n == "string", e), ...u, ref: o };
    return i && (d["data-projection-id"] = i), x.createElement(n, d);
  };
}
const Ka = (e) => e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function rh(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const o in n) e.style.setProperty(o, n[o]);
}
const ih = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function oh(e, t, n, r) {
  rh(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(ih.has(i) ? i : Ka(i), t.attrs[i]);
}
function Ga(e) {
  const { style: t } = e,
    n = {};
  for (const r in t) (nt(t[r]) || Jp(r, e)) && (n[r] = t[r]);
  return n;
}
function sh(e) {
  const t = Ga(e);
  for (const n in e)
    if (nt(e[n])) {
      const r = n === "x" || n === "y" ? "attr" + n.toUpperCase() : n;
      t[r] = e[n];
    }
  return t;
}
function Ya(e, t, n, r = {}, i = {}) {
  return (
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    t
  );
}
const fo = (e) => Array.isArray(e),
  Fg = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  Bg = (e) => (fo(e) ? e[e.length - 1] || 0 : e);
function Oi(e) {
  const t = nt(e) ? e.get() : e;
  return Fg(t) ? t.toValue() : t;
}
function Ug(
  { scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n },
  r,
  i,
  o
) {
  const s = { latestValues: $g(r, i, o, e), renderState: t() };
  return n && (s.mount = (l) => n(r, l, s)), s;
}
const lh = (e) => (t, n) => {
  const r = x.useContext(jo),
    i = x.useContext(Fo),
    o = () => Ug(e, t, r, i);
  return n ? o() : $o(o);
};
function $g(e, t, n, r) {
  const i = {},
    o = r(e);
  for (const f in o) i[f] = Oi(o[f]);
  let { initial: s, animate: l } = e;
  const a = Uo(e),
    u = Yp(e);
  t &&
    u &&
    !a &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), l === void 0 && (l = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const d = c ? l : s;
  return (
    d &&
      typeof d != "boolean" &&
      !Bo(d) &&
      (Array.isArray(d) ? d : [d]).forEach((m) => {
        const g = Ya(e, m);
        if (!g) return;
        const { transitionEnd: y, transition: S, ...h } = g;
        for (const p in h) {
          let v = h[p];
          if (Array.isArray(v)) {
            const w = c ? v.length - 1 : 0;
            v = v[w];
          }
          v !== null && (i[p] = v);
        }
        for (const p in y) i[p] = y[p];
      }),
    i
  );
}
const Wg = {
    useVisualState: lh({
      scrapeMotionValuesFromProps: sh,
      createRenderState: nh,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        try {
          n.dimensions =
            typeof t.getBBox == "function"
              ? t.getBBox()
              : t.getBoundingClientRect();
        } catch {
          n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
        }
        Ha(
          n,
          r,
          { enableHardwareAcceleration: !1 },
          Qa(t.tagName),
          e.transformTemplate
        ),
          oh(t, n);
      },
    }),
  },
  Hg = {
    useVisualState: lh({
      scrapeMotionValuesFromProps: Ga,
      createRenderState: Wa,
    }),
  };
function Qg(e, { forwardMotionProps: t = !1 }, n, r, i) {
  return {
    ...(Ua(e) ? Wg : Hg),
    preloadedFeatures: n,
    useRender: jg(t),
    createVisualElement: r,
    projectionNodeConstructor: i,
    Component: e,
  };
}
var j;
(function (e) {
  (e.Animate = "animate"),
    (e.Hover = "whileHover"),
    (e.Tap = "whileTap"),
    (e.Drag = "whileDrag"),
    (e.Focus = "whileFocus"),
    (e.InView = "whileInView"),
    (e.Exit = "exit");
})(j || (j = {}));
function Wo(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
function Rl(e, t, n, r) {
  x.useEffect(() => {
    const i = e.current;
    if (n && i) return Wo(i, t, n, r);
  }, [e, t, n, r]);
}
function Kg({ whileFocus: e, visualElement: t }) {
  const { animationState: n } = t,
    r = () => {
      n && n.setActive(j.Focus, !0);
    },
    i = () => {
      n && n.setActive(j.Focus, !1);
    };
  Rl(t, "focus", e ? r : void 0), Rl(t, "blur", e ? i : void 0);
}
function ah(e) {
  return typeof PointerEvent < "u" && e instanceof PointerEvent
    ? e.pointerType === "mouse"
    : e instanceof MouseEvent;
}
function uh(e) {
  return !!e.touches;
}
function Gg(e) {
  return (t) => {
    const n = t instanceof MouseEvent;
    (!n || (n && t.button === 0)) && e(t);
  };
}
const Yg = { pageX: 0, pageY: 0 };
function Xg(e, t = "page") {
  const r = e.touches[0] || e.changedTouches[0] || Yg;
  return { x: r[t + "X"], y: r[t + "Y"] };
}
function Zg(e, t = "page") {
  return { x: e[t + "X"], y: e[t + "Y"] };
}
function Xa(e, t = "page") {
  return { point: uh(e) ? Xg(e, t) : Zg(e, t) };
}
const ch = (e, t = !1) => {
    const n = (r) => e(r, Xa(r));
    return t ? Gg(n) : n;
  },
  Jg = () => un && window.onpointerdown === null,
  qg = () => un && window.ontouchstart === null,
  bg = () => un && window.onmousedown === null,
  ey = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
  },
  ty = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
  };
function fh(e) {
  return Jg() ? e : qg() ? ty[e] : bg() ? ey[e] : e;
}
function Nn(e, t, n, r) {
  return Wo(e, fh(t), ch(n, t === "pointerdown"), r);
}
function po(e, t, n, r) {
  return Rl(e, fh(t), n && ch(n, t === "pointerdown"), r);
}
function dh(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? ((t = e), n) : !1;
  };
}
const Tc = dh("dragHorizontal"),
  _c = dh("dragVertical");
function ph(e) {
  let t = !1;
  if (e === "y") t = _c();
  else if (e === "x") t = Tc();
  else {
    const n = Tc(),
      r = _c();
    n && r
      ? (t = () => {
          n(), r();
        })
      : (n && n(), r && r());
  }
  return t;
}
function hh() {
  const e = ph(!0);
  return e ? (e(), !1) : !0;
}
function Vc(e, t, n) {
  return (r, i) => {
    !ah(r) ||
      hh() ||
      (e.animationState && e.animationState.setActive(j.Hover, t),
      n && n(r, i));
  };
}
function ny({
  onHoverStart: e,
  onHoverEnd: t,
  whileHover: n,
  visualElement: r,
}) {
  po(r, "pointerenter", e || n ? Vc(r, !0, e) : void 0, { passive: !e }),
    po(r, "pointerleave", t || n ? Vc(r, !1, t) : void 0, { passive: !t });
}
const mh = (e, t) => (t ? (e === t ? !0 : mh(e, t.parentElement)) : !1);
function vh(e) {
  return x.useEffect(() => () => e(), []);
}
const ry = (e, t) => (n) => t(e(n)),
  Ho = (...e) => e.reduce(ry);
function iy({
  onTap: e,
  onTapStart: t,
  onTapCancel: n,
  whileTap: r,
  visualElement: i,
}) {
  const o = e || t || n || r,
    s = x.useRef(!1),
    l = x.useRef(null),
    a = { passive: !(t || e || n || m) };
  function u() {
    l.current && l.current(), (l.current = null);
  }
  function c() {
    return (
      u(),
      (s.current = !1),
      i.animationState && i.animationState.setActive(j.Tap, !1),
      !hh()
    );
  }
  function d(g, y) {
    c() && (mh(i.current, g.target) ? e && e(g, y) : n && n(g, y));
  }
  function f(g, y) {
    c() && n && n(g, y);
  }
  function m(g, y) {
    u(),
      !s.current &&
        ((s.current = !0),
        (l.current = Ho(
          Nn(window, "pointerup", d, a),
          Nn(window, "pointercancel", f, a)
        )),
        i.animationState && i.animationState.setActive(j.Tap, !0),
        t && t(g, y));
  }
  po(i, "pointerdown", o ? m : void 0, a), vh(u);
}
var oy = {};
const sy = "production",
  ly = typeof process > "u" || oy === void 0 ? sy : "production",
  Lc = new Set();
function ay(e, t, n) {
  e || Lc.has(t) || (console.warn(t), n && console.warn(n), Lc.add(t));
}
const Al = new WeakMap(),
  Es = new WeakMap(),
  uy = (e) => {
    const t = Al.get(e.target);
    t && t(e);
  },
  cy = (e) => {
    e.forEach(uy);
  };
function fy({ root: e, ...t }) {
  const n = e || document;
  Es.has(n) || Es.set(n, {});
  const r = Es.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(cy, { root: e, ...t })), r[i];
}
function dy(e, t, n) {
  const r = fy(t);
  return (
    Al.set(e, n),
    r.observe(e),
    () => {
      Al.delete(e), r.unobserve(e);
    }
  );
}
function py({
  visualElement: e,
  whileInView: t,
  onViewportEnter: n,
  onViewportLeave: r,
  viewport: i = {},
}) {
  const o = x.useRef({ hasEnteredView: !1, isInView: !1 });
  let s = !!(t || n || r);
  i.once && o.current.hasEnteredView && (s = !1),
    (typeof IntersectionObserver > "u" ? vy : my)(s, o.current, e, i);
}
const hy = { some: 0, all: 1 };
function my(e, t, n, { root: r, margin: i, amount: o = "some", once: s }) {
  x.useEffect(() => {
    if (!e || !n.current) return;
    const l = {
        root: r == null ? void 0 : r.current,
        rootMargin: i,
        threshold: typeof o == "number" ? o : hy[o],
      },
      a = (u) => {
        const { isIntersecting: c } = u;
        if (t.isInView === c || ((t.isInView = c), s && !c && t.hasEnteredView))
          return;
        c && (t.hasEnteredView = !0),
          n.animationState && n.animationState.setActive(j.InView, c);
        const d = n.getProps(),
          f = c ? d.onViewportEnter : d.onViewportLeave;
        f && f(u);
      };
    return dy(n.current, l, a);
  }, [e, r, i, o]);
}
function vy(e, t, n, { fallback: r = !0 }) {
  x.useEffect(() => {
    !e ||
      !r ||
      (ly !== "production" &&
        ay(
          !1,
          "IntersectionObserver not available on this device. whileInView animations will trigger on mount."
        ),
      requestAnimationFrame(() => {
        t.hasEnteredView = !0;
        const { onViewportEnter: i } = n.getProps();
        i && i(null),
          n.animationState && n.animationState.setActive(j.InView, !0);
      }));
  }, [e]);
}
const Tt = (e) => (t) => (e(t), null),
  gy = { inView: Tt(py), tap: Tt(iy), focus: Tt(Kg), hover: Tt(ny) };
function gh() {
  const e = x.useContext(Fo);
  if (e === null) return [!0, null];
  const { isPresent: t, onExitComplete: n, register: r } = e,
    i = x.useId();
  return x.useEffect(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
function yh(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
const yy = (e) => /^\-?\d*\.?\d+$/.test(e),
  wy = (e) => /^0[^.\s]+$/.test(e),
  ct = { delta: 0, timestamp: 0 },
  wh = (1 / 60) * 1e3,
  Sy = typeof performance < "u" ? () => performance.now() : () => Date.now(),
  Sh =
    typeof window < "u"
      ? (e) => window.requestAnimationFrame(e)
      : (e) => setTimeout(() => e(Sy()), wh);
function xy(e) {
  let t = [],
    n = [],
    r = 0,
    i = !1,
    o = !1;
  const s = new WeakSet(),
    l = {
      schedule: (a, u = !1, c = !1) => {
        const d = c && i,
          f = d ? t : n;
        return (
          u && s.add(a),
          f.indexOf(a) === -1 && (f.push(a), d && i && (r = t.length)),
          a
        );
      },
      cancel: (a) => {
        const u = n.indexOf(a);
        u !== -1 && n.splice(u, 1), s.delete(a);
      },
      process: (a) => {
        if (i) {
          o = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), (n.length = 0), (r = t.length), r))
          for (let u = 0; u < r; u++) {
            const c = t[u];
            c(a), s.has(c) && (l.schedule(c), e());
          }
        (i = !1), o && ((o = !1), l.process(a));
      },
    };
  return l;
}
const ky = 40;
let Dl = !0,
  Hr = !1,
  Ml = !1;
const ei = ["read", "update", "preRender", "render", "postRender"],
  Qo = ei.reduce((e, t) => ((e[t] = xy(() => (Hr = !0))), e), {}),
  Te = ei.reduce((e, t) => {
    const n = Qo[t];
    return (e[t] = (r, i = !1, o = !1) => (Hr || Cy(), n.schedule(r, i, o))), e;
  }, {}),
  zt = ei.reduce((e, t) => ((e[t] = Qo[t].cancel), e), {}),
  Cs = ei.reduce((e, t) => ((e[t] = () => Qo[t].process(ct)), e), {}),
  Ey = (e) => Qo[e].process(ct),
  xh = (e) => {
    (Hr = !1),
      (ct.delta = Dl ? wh : Math.max(Math.min(e - ct.timestamp, ky), 1)),
      (ct.timestamp = e),
      (Ml = !0),
      ei.forEach(Ey),
      (Ml = !1),
      Hr && ((Dl = !1), Sh(xh));
  },
  Cy = () => {
    (Hr = !0), (Dl = !0), Ml || Sh(xh);
  };
function Za(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ja(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class qa {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Za(this.subscriptions, t), () => Ja(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o];
          s && s(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function ba(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Py = (e) => !isNaN(parseFloat(e));
class Ty {
  constructor(t, n = {}) {
    (this.version = "7.10.3"),
      (this.timeDelta = 0),
      (this.lastUpdated = 0),
      (this.canTrackVelocity = !1),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        (this.prev = this.current), (this.current = r);
        const { delta: o, timestamp: s } = ct;
        this.lastUpdated !== s &&
          ((this.timeDelta = o),
          (this.lastUpdated = s),
          Te.postRender(this.scheduleVelocityCheck)),
          this.prev !== this.current &&
            this.events.change &&
            this.events.change.notify(this.current),
          this.events.velocityChange &&
            this.events.velocityChange.notify(this.getVelocity()),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.scheduleVelocityCheck = () => Te.postRender(this.velocityCheck)),
      (this.velocityCheck = ({ timestamp: r }) => {
        r !== this.lastUpdated &&
          ((this.prev = this.current),
          this.events.velocityChange &&
            this.events.velocityChange.notify(this.getVelocity()));
      }),
      (this.hasAnimated = !1),
      (this.prev = this.current = t),
      (this.canTrackVelocity = Py(this.current)),
      (this.owner = n.owner);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new qa()), this.events[t].add(n);
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t) {
    this.passiveEffect = t;
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n), (this.prev = t), (this.timeDelta = r);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity
      ? ba(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
      : 0;
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.stopAnimation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.stopAnimation &&
      (this.stopAnimation(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.clearListeners(), this.stop();
  }
}
function Wn(e, t) {
  return new Ty(e, t);
}
const eu = (e, t) => (n) =>
    !!(
      (qr(n) && Sg.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  kh = (e, t, n) => (r) => {
    if (!qr(r)) return r;
    const [i, o, s, l] = r.match(Wr);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: l !== void 0 ? parseFloat(l) : 1,
    };
  },
  _y = (e) => $n(0, 255, e),
  Ps = { ...fn, transform: (e) => Math.round(_y(e)) },
  qt = {
    test: eu("rgb", "red"),
    parse: kh("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      Ps.transform(e) +
      ", " +
      Ps.transform(t) +
      ", " +
      Ps.transform(n) +
      ", " +
      Sr(wr.transform(r)) +
      ")",
  };
function Vy(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const Nl = { test: eu("#"), parse: Vy, transform: qt.transform },
  Tn = {
    test: eu("hsl", "hue"),
    parse: kh("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      tt.transform(Sr(t)) +
      ", " +
      tt.transform(Sr(n)) +
      ", " +
      Sr(wr.transform(r)) +
      ")",
  },
  pe = {
    test: (e) => qt.test(e) || Nl.test(e) || Tn.test(e),
    parse: (e) =>
      qt.test(e) ? qt.parse(e) : Tn.test(e) ? Tn.parse(e) : Nl.parse(e),
    transform: (e) =>
      qr(e) ? e : e.hasOwnProperty("red") ? qt.transform(e) : Tn.transform(e),
  },
  Eh = "${c}",
  Ch = "${n}";
function Ly(e) {
  var t, n;
  return (
    isNaN(e) &&
    qr(e) &&
    (((t = e.match(Wr)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(Ll)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
function ho(e) {
  typeof e == "number" && (e = `${e}`);
  const t = [];
  let n = 0,
    r = 0;
  const i = e.match(Ll);
  i && ((n = i.length), (e = e.replace(Ll, Eh)), t.push(...i.map(pe.parse)));
  const o = e.match(Wr);
  return (
    o && ((r = o.length), (e = e.replace(Wr, Ch)), t.push(...o.map(fn.parse))),
    { values: t, numColors: n, numNumbers: r, tokenised: e }
  );
}
function Ph(e) {
  return ho(e).values;
}
function Th(e) {
  const { values: t, numColors: n, tokenised: r } = ho(e),
    i = t.length;
  return (o) => {
    let s = r;
    for (let l = 0; l < i; l++)
      s = s.replace(l < n ? Eh : Ch, l < n ? pe.transform(o[l]) : Sr(o[l]));
    return s;
  };
}
const Ry = (e) => (typeof e == "number" ? 0 : e);
function Ay(e) {
  const t = Ph(e);
  return Th(e)(t.map(Ry));
}
const jt = {
    test: Ly,
    parse: Ph,
    createTransformer: Th,
    getAnimatableNone: Ay,
  },
  Dy = new Set(["brightness", "contrast", "saturate", "opacity"]);
function My(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(Wr) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let o = Dy.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + "(" + o + i + ")";
}
const Ny = /([a-z-]*)\(.*?\)/g,
  Il = {
    ...jt,
    getAnimatableNone: (e) => {
      const t = e.match(Ny);
      return t ? t.map(My).join(" ") : e;
    },
  },
  Iy = {
    ...bp,
    color: pe,
    backgroundColor: pe,
    outlineColor: pe,
    fill: pe,
    stroke: pe,
    borderColor: pe,
    borderTopColor: pe,
    borderRightColor: pe,
    borderBottomColor: pe,
    borderLeftColor: pe,
    filter: Il,
    WebkitFilter: Il,
  },
  tu = (e) => Iy[e];
function nu(e, t) {
  var n;
  let r = tu(e);
  return (
    r !== Il && (r = jt),
    (n = r.getAnimatableNone) === null || n === void 0 ? void 0 : n.call(r, t)
  );
}
const _h = (e) => (t) => t.test(e),
  Oy = { test: (e) => e === "auto", parse: (e) => e },
  Vh = [fn, A, tt, yt, kg, xg, Oy],
  nr = (e) => Vh.find(_h(e)),
  zy = [...Vh, pe, jt],
  jy = (e) => zy.find(_h(e));
function Fy(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.get())), t;
}
function By(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.getVelocity())), t;
}
function Ko(e, t, n) {
  const r = e.getProps();
  return Ya(r, t, n !== void 0 ? n : r.custom, Fy(e), By(e));
}
function Uy(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Wn(n));
}
function $y(e, t) {
  const n = Ko(e, t);
  let {
    transitionEnd: r = {},
    transition: i = {},
    ...o
  } = n ? e.makeTargetAnimatable(n, !1) : {};
  o = { ...o, ...r };
  for (const s in o) {
    const l = Bg(o[s]);
    Uy(e, s, l);
  }
}
function Wy(e, t, n) {
  var r, i;
  const o = Object.keys(t).filter((l) => !e.hasValue(l)),
    s = o.length;
  if (s)
    for (let l = 0; l < s; l++) {
      const a = o[l],
        u = t[a];
      let c = null;
      Array.isArray(u) && (c = u[0]),
        c === null &&
          (c =
            (i = (r = n[a]) !== null && r !== void 0 ? r : e.readValue(a)) !==
              null && i !== void 0
              ? i
              : t[a]),
        c != null &&
          (typeof c == "string" && (yy(c) || wy(c))
            ? (c = parseFloat(c))
            : !jy(c) && jt.test(u) && (c = nu(a, u)),
          e.addValue(a, Wn(c, { owner: e })),
          n[a] === void 0 && (n[a] = c),
          c !== null && e.setBaseTarget(a, c));
    }
}
function Hy(e, t) {
  return t ? (t[e] || t.default || t).from : void 0;
}
function Qy(e, t, n) {
  var r;
  const i = {};
  for (const o in e) {
    const s = Hy(o, t);
    i[o] =
      s !== void 0
        ? s
        : (r = n.getValue(o)) === null || r === void 0
        ? void 0
        : r.get();
  }
  return i;
}
function mo(e) {
  return !!(nt(e) && e.add);
}
const Ky = (e, t) => `${e}: ${t}`;
function Gy(e, t) {
  const { MotionAppearAnimations: n } = window,
    r = Ky(e, cn.has(t) ? "transform" : t),
    i = n && n.get(r);
  return i
    ? (Te.render(() => {
        try {
          i.cancel(), n.delete(r);
        } catch {}
      }),
      i.currentTime || 0)
    : 0;
}
const Yy = "framerAppearId",
  Xy = "data-" + Ka(Yy);
var vo = function () {};
const zi = (e) => e * 1e3,
  Zy = { current: !1 },
  ru = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  iu = (e) => (t) => 1 - e(1 - t),
  ou = (e) => e * e,
  Jy = iu(ou),
  su = ru(ou),
  G = (e, t, n) => -n * e + n * t + e;
function Ts(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function qy({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    o = 0,
    s = 0;
  if (!t) i = o = s = n;
  else {
    const l = n < 0.5 ? n * (1 + t) : n + t - n * t,
      a = 2 * n - l;
    (i = Ts(a, l, e + 1 / 3)), (o = Ts(a, l, e)), (s = Ts(a, l, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  };
}
const _s = (e, t, n) => {
    const r = e * e;
    return Math.sqrt(Math.max(0, n * (t * t - r) + r));
  },
  by = [Nl, qt, Tn],
  e1 = (e) => by.find((t) => t.test(e));
function Rc(e) {
  const t = e1(e);
  let n = t.parse(e);
  return t === Tn && (n = qy(n)), n;
}
const Lh = (e, t) => {
  const n = Rc(e),
    r = Rc(t),
    i = { ...n };
  return (o) => (
    (i.red = _s(n.red, r.red, o)),
    (i.green = _s(n.green, r.green, o)),
    (i.blue = _s(n.blue, r.blue, o)),
    (i.alpha = G(n.alpha, r.alpha, o)),
    qt.transform(i)
  );
};
function Rh(e, t) {
  return typeof e == "number"
    ? (n) => G(e, t, n)
    : pe.test(e)
    ? Lh(e, t)
    : Dh(e, t);
}
const Ah = (e, t) => {
    const n = [...e],
      r = n.length,
      i = e.map((o, s) => Rh(o, t[s]));
    return (o) => {
      for (let s = 0; s < r; s++) n[s] = i[s](o);
      return n;
    };
  },
  t1 = (e, t) => {
    const n = { ...e, ...t },
      r = {};
    for (const i in n)
      e[i] !== void 0 && t[i] !== void 0 && (r[i] = Rh(e[i], t[i]));
    return (i) => {
      for (const o in r) n[o] = r[o](i);
      return n;
    };
  },
  Dh = (e, t) => {
    const n = jt.createTransformer(t),
      r = ho(e),
      i = ho(t);
    return r.numColors === i.numColors && r.numNumbers >= i.numNumbers
      ? Ho(Ah(r.values, i.values), n)
      : (s) => `${s > 0 ? t : e}`;
  },
  go = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  Ac = (e, t) => (n) => G(e, t, n);
function n1(e) {
  return typeof e == "number"
    ? Ac
    : typeof e == "string"
    ? pe.test(e)
      ? Lh
      : Dh
    : Array.isArray(e)
    ? Ah
    : typeof e == "object"
    ? t1
    : Ac;
}
function r1(e, t, n) {
  const r = [],
    i = n || n1(e[0]),
    o = e.length - 1;
  for (let s = 0; s < o; s++) {
    let l = i(e[s], e[s + 1]);
    if (t) {
      const a = Array.isArray(t) ? t[s] : t;
      l = Ho(a, l);
    }
    r.push(l);
  }
  return r;
}
function Mh(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length;
  vo(o === t.length),
    vo(!r || !Array.isArray(r) || r.length === o - 1),
    e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const s = r1(t, r, i),
    l = s.length,
    a = (u) => {
      let c = 0;
      if (l > 1) for (; c < e.length - 2 && !(u < e[c + 1]); c++);
      const d = go(e[c], e[c + 1], u);
      return s[c](d);
    };
  return n ? (u) => a($n(e[0], e[o - 1], u)) : a;
}
const lu = (e) => e,
  Nh = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  i1 = 1e-7,
  o1 = 12;
function s1(e, t, n, r, i) {
  let o,
    s,
    l = 0;
  do (s = t + (n - t) / 2), (o = Nh(s, r, i) - e), o > 0 ? (n = s) : (t = s);
  while (Math.abs(o) > i1 && ++l < o1);
  return s;
}
function Ih(e, t, n, r) {
  if (e === t && n === r) return lu;
  const i = (o) => s1(o, 0, 1, e, n);
  return (o) => (o === 0 || o === 1 ? o : Nh(i(o), t, r));
}
const Oh = (e) => 1 - Math.sin(Math.acos(e)),
  au = iu(Oh),
  l1 = ru(au),
  zh = Ih(0.33, 1.53, 0.69, 0.99),
  uu = iu(zh),
  a1 = ru(uu),
  u1 = (e) =>
    (e *= 2) < 1 ? 0.5 * uu(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  c1 = {
    linear: lu,
    easeIn: ou,
    easeInOut: su,
    easeOut: Jy,
    circIn: Oh,
    circInOut: l1,
    circOut: au,
    backIn: uu,
    backInOut: a1,
    backOut: zh,
    anticipate: u1,
  },
  Dc = (e) => {
    if (Array.isArray(e)) {
      vo(e.length === 4);
      const [t, n, r, i] = e;
      return Ih(t, n, r, i);
    } else if (typeof e == "string") return c1[e];
    return e;
  },
  f1 = (e) => Array.isArray(e) && typeof e[0] != "number";
function d1(e, t) {
  return e.map(() => t || su).splice(0, e.length - 1);
}
function p1(e) {
  const t = e.length;
  return e.map((n, r) => (r !== 0 ? r / (t - 1) : 0));
}
function h1(e, t) {
  return e.map((n) => n * t);
}
function yo({ keyframes: e, ease: t = su, times: n, duration: r = 300 }) {
  e = [...e];
  const i = yo[0],
    o = f1(t) ? t.map(Dc) : Dc(t),
    s = { done: !1, value: i },
    l = h1(n && n.length === yo.length ? n : p1(e), r);
  function a() {
    return Mh(l, e, { ease: Array.isArray(o) ? o : d1(e, o) });
  }
  let u = a();
  return {
    next: (c) => ((s.value = u(c)), (s.done = c >= r), s),
    flipTarget: () => {
      e.reverse(), (u = a());
    },
  };
}
const Vs = 0.001,
  m1 = 0.01,
  v1 = 10,
  g1 = 0.05,
  y1 = 1;
function w1({
  duration: e = 800,
  bounce: t = 0.25,
  velocity: n = 0,
  mass: r = 1,
}) {
  let i,
    o,
    s = 1 - t;
  (s = $n(g1, y1, s)),
    (e = $n(m1, v1, e / 1e3)),
    s < 1
      ? ((i = (u) => {
          const c = u * s,
            d = c * e,
            f = c - n,
            m = Ol(u, s),
            g = Math.exp(-d);
          return Vs - (f / m) * g;
        }),
        (o = (u) => {
          const d = u * s * e,
            f = d * n + n,
            m = Math.pow(s, 2) * Math.pow(u, 2) * e,
            g = Math.exp(-d),
            y = Ol(Math.pow(u, 2), s);
          return ((-i(u) + Vs > 0 ? -1 : 1) * ((f - m) * g)) / y;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * e),
            d = (u - n) * e + 1;
          return -Vs + c * d;
        }),
        (o = (u) => {
          const c = Math.exp(-u * e),
            d = (n - u) * (e * e);
          return c * d;
        }));
  const l = 5 / e,
    a = x1(i, o, l);
  if (((e = e * 1e3), isNaN(a)))
    return { stiffness: 100, damping: 10, duration: e };
  {
    const u = Math.pow(a, 2) * r;
    return { stiffness: u, damping: s * 2 * Math.sqrt(r * u), duration: e };
  }
}
const S1 = 12;
function x1(e, t, n) {
  let r = n;
  for (let i = 1; i < S1; i++) r = r - e(r) / t(r);
  return r;
}
function Ol(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const k1 = ["duration", "bounce"],
  E1 = ["stiffness", "damping", "mass"];
function Mc(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function C1(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!Mc(e, E1) && Mc(e, k1)) {
    const n = w1(e);
    (t = { ...t, ...n, velocity: 0, mass: 1 }), (t.isResolvedFromDuration = !0);
  }
  return t;
}
const P1 = 5;
function jh({ keyframes: e, restSpeed: t = 2, restDelta: n = 0.01, ...r }) {
  let i = e[0],
    o = e[e.length - 1];
  const s = { done: !1, value: i },
    {
      stiffness: l,
      damping: a,
      mass: u,
      velocity: c,
      duration: d,
      isResolvedFromDuration: f,
    } = C1(r);
  let m = T1,
    g = c ? -(c / 1e3) : 0;
  const y = a / (2 * Math.sqrt(l * u));
  function S() {
    const h = o - i,
      p = Math.sqrt(l / u) / 1e3;
    if ((n === void 0 && (n = Math.min(Math.abs(o - i) / 100, 0.4)), y < 1)) {
      const v = Ol(p, y);
      m = (w) => {
        const k = Math.exp(-y * p * w);
        return (
          o -
          k * (((g + y * p * h) / v) * Math.sin(v * w) + h * Math.cos(v * w))
        );
      };
    } else if (y === 1) m = (v) => o - Math.exp(-p * v) * (h + (g + p * h) * v);
    else {
      const v = p * Math.sqrt(y * y - 1);
      m = (w) => {
        const k = Math.exp(-y * p * w),
          C = Math.min(v * w, 300);
        return (
          o - (k * ((g + y * p * h) * Math.sinh(C) + v * h * Math.cosh(C))) / v
        );
      };
    }
  }
  return (
    S(),
    {
      next: (h) => {
        const p = m(h);
        if (f) s.done = h >= d;
        else {
          let v = g;
          if (h !== 0)
            if (y < 1) {
              const C = Math.max(0, h - P1);
              v = ba(p - m(C), h - C);
            } else v = 0;
          const w = Math.abs(v) <= t,
            k = Math.abs(o - p) <= n;
          s.done = w && k;
        }
        return (s.value = s.done ? o : p), s;
      },
      flipTarget: () => {
        (g = -g), ([i, o] = [o, i]), S();
      },
    }
  );
}
jh.needsInterpolation = (e, t) => typeof e == "string" || typeof t == "string";
const T1 = (e) => 0;
function _1({
  keyframes: e = [0],
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 350,
  restDelta: i = 0.5,
  modifyTarget: o,
}) {
  const s = e[0],
    l = { done: !1, value: s };
  let a = n * t;
  const u = s + a,
    c = o === void 0 ? u : o(u);
  return (
    c !== u && (a = c - s),
    {
      next: (d) => {
        const f = -a * Math.exp(-d / r);
        return (l.done = !(f > i || f < -i)), (l.value = l.done ? c : c + f), l;
      },
      flipTarget: () => {},
    }
  );
}
const V1 = { decay: _1, keyframes: yo, tween: yo, spring: jh };
function Fh(e, t, n = 0) {
  return e - t - n;
}
function L1(e, t = 0, n = 0, r = !0) {
  return r ? Fh(t + -e, t, n) : t - (e - t) + n;
}
function R1(e, t, n, r) {
  return r ? e >= t + n : e <= -n;
}
const A1 = (e) => {
  const t = ({ delta: n }) => e(n);
  return { start: () => Te.update(t, !0), stop: () => zt.update(t) };
};
function wo({
  duration: e,
  driver: t = A1,
  elapsed: n = 0,
  repeat: r = 0,
  repeatType: i = "loop",
  repeatDelay: o = 0,
  keyframes: s,
  autoplay: l = !0,
  onPlay: a,
  onStop: u,
  onComplete: c,
  onRepeat: d,
  onUpdate: f,
  type: m = "keyframes",
  ...g
}) {
  var y, S;
  let h,
    p = 0,
    v = e,
    w,
    k = !1,
    C = !0,
    P;
  const _ = V1[s.length > 2 ? "keyframes" : m],
    I = s[0],
    R = s[s.length - 1];
  !((S = (y = _).needsInterpolation) === null || S === void 0) &&
    S.call(y, I, R) &&
    ((P = Mh([0, 100], [I, R], { clamp: !1 })), (s = [0, 100]));
  const Y = _({ ...g, duration: e, keyframes: s });
  function Qe() {
    p++,
      i === "reverse"
        ? ((C = p % 2 === 0), (n = L1(n, v, o, C)))
        : ((n = Fh(n, v, o)), i === "mirror" && Y.flipTarget()),
      (k = !1),
      d && d();
  }
  function rt() {
    h.stop(), c && c();
  }
  function vt(de) {
    if ((C || (de = -de), (n += de), !k)) {
      const Ke = Y.next(Math.max(0, n));
      (w = Ke.value), P && (w = P(w)), (k = C ? Ke.done : n <= 0);
    }
    f && f(w),
      k &&
        (p === 0 && (v = v !== void 0 ? v : n),
        p < r ? R1(n, v, o, C) && Qe() : rt());
  }
  function q() {
    a && a(), (h = t(vt)), h.start();
  }
  return (
    l && q(),
    {
      stop: () => {
        u && u(), h.stop();
      },
      sample: (de) => Y.next(Math.max(0, de)),
    }
  );
}
function D1(e) {
  return !e || Array.isArray(e) || (typeof e == "string" && Bh[e]);
}
const ar = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Bh = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ar([0, 0.65, 0.55, 1]),
    circOut: ar([0.55, 0, 1, 0.45]),
    backIn: ar([0.31, 0.01, 0.66, -0.59]),
    backOut: ar([0.33, 1.53, 0.69, 0.99]),
  };
function M1(e) {
  if (e) return Array.isArray(e) ? ar(e) : Bh[e];
}
function N1(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i,
    repeat: o = 0,
    repeatType: s = "loop",
    ease: l,
    times: a,
  } = {}
) {
  return e.animate(
    { [t]: n, offset: a },
    {
      delay: r,
      duration: i,
      easing: M1(l),
      fill: "both",
      iterations: o + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    }
  );
}
const xi = 10;
function I1(e, t, { onUpdate: n, onComplete: r, ...i }) {
  let { keyframes: o, duration: s = 0.3, elapsed: l = 0, ease: a } = i;
  if (i.type === "spring" || !D1(i.ease)) {
    const c = wo(i);
    let d = { done: !1, value: o[0] };
    const f = [];
    let m = 0;
    for (; !d.done; ) (d = c.sample(m)), f.push(d.value), (m += xi);
    (o = f), (s = m - xi), (a = "linear");
  }
  const u = N1(e.owner.current, t, o, {
    ...i,
    delay: -l,
    duration: s,
    ease: a,
  });
  return (
    (u.onfinish = () => {
      e.set(o[o.length - 1]), r && r();
    }),
    () => {
      const { currentTime: c } = u;
      if (c) {
        const d = wo(i);
        e.setWithVelocity(d.sample(c - xi).value, d.sample(c).value, xi);
      }
      Te.update(() => u.cancel());
    }
  );
}
function Uh(e, t) {
  const n = performance.now(),
    r = ({ timestamp: i }) => {
      const o = i - n;
      o >= t && (zt.read(r), e(o - t));
    };
  return Te.read(r, !0), () => zt.read(r);
}
function O1({ keyframes: e, elapsed: t, onUpdate: n, onComplete: r }) {
  const i = () => (n && n(e[e.length - 1]), r && r(), () => {});
  return t ? Uh(i, -t) : i();
}
function z1({
  keyframes: e,
  velocity: t = 0,
  min: n,
  max: r,
  power: i = 0.8,
  timeConstant: o = 750,
  bounceStiffness: s = 500,
  bounceDamping: l = 10,
  restDelta: a = 1,
  modifyTarget: u,
  driver: c,
  onUpdate: d,
  onComplete: f,
  onStop: m,
}) {
  const g = e[0];
  let y;
  function S(w) {
    return (n !== void 0 && w < n) || (r !== void 0 && w > r);
  }
  function h(w) {
    return n === void 0
      ? r
      : r === void 0 || Math.abs(n - w) < Math.abs(r - w)
      ? n
      : r;
  }
  function p(w) {
    y == null || y.stop(),
      (y = wo({
        keyframes: [0, 1],
        velocity: 0,
        ...w,
        driver: c,
        onUpdate: (k) => {
          var C;
          d == null || d(k),
            (C = w.onUpdate) === null || C === void 0 || C.call(w, k);
        },
        onComplete: f,
        onStop: m,
      }));
  }
  function v(w) {
    p({ type: "spring", stiffness: s, damping: l, restDelta: a, ...w });
  }
  if (S(g)) v({ velocity: t, keyframes: [g, h(g)] });
  else {
    let w = i * t + g;
    typeof u < "u" && (w = u(w));
    const k = h(w),
      C = k === n ? -1 : 1;
    let P, _;
    const I = (R) => {
      (P = _),
        (_ = R),
        (t = ba(R - P, ct.delta)),
        ((C === 1 && R > k) || (C === -1 && R < k)) &&
          v({ keyframes: [R, k], velocity: t });
    };
    p({
      type: "decay",
      keyframes: [g, 0],
      velocity: t,
      timeConstant: o,
      power: i,
      restDelta: a,
      modifyTarget: u,
      onUpdate: S(w) ? I : void 0,
    });
  }
  return { stop: () => (y == null ? void 0 : y.stop()) };
}
const Ht = () => ({
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  }),
  ki = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Ls = () => ({ type: "keyframes", ease: "linear", duration: 0.3 }),
  j1 = { type: "keyframes", duration: 0.8 },
  Nc = {
    x: Ht,
    y: Ht,
    z: Ht,
    rotate: Ht,
    rotateX: Ht,
    rotateY: Ht,
    rotateZ: Ht,
    scaleX: ki,
    scaleY: ki,
    scale: ki,
    opacity: Ls,
    backgroundColor: Ls,
    color: Ls,
    default: ki,
  },
  F1 = (e, { keyframes: t }) =>
    t.length > 2 ? j1 : (Nc[e] || Nc.default)(t[1]),
  zl = (e, t) =>
    e === "zIndex"
      ? !1
      : !!(
          typeof t == "number" ||
          Array.isArray(t) ||
          (typeof t == "string" && jt.test(t) && !t.startsWith("url("))
        );
function B1({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: s,
  repeatDelay: l,
  from: a,
  ...u
}) {
  return !!Object.keys(u).length;
}
function Ic(e) {
  return (
    e === 0 ||
    (typeof e == "string" && parseFloat(e) === 0 && e.indexOf(" ") === -1)
  );
}
function Oc(e) {
  return typeof e == "number" ? 0 : nu("", e);
}
function $h(e, t) {
  return e[t] || e.default || e;
}
function U1(e, t, n, r) {
  const i = zl(t, n);
  let o = r.from !== void 0 ? r.from : e.get();
  return (
    o === "none" && i && typeof n == "string"
      ? (o = nu(t, n))
      : Ic(o) && typeof n == "string"
      ? (o = Oc(n))
      : !Array.isArray(n) && Ic(n) && typeof o == "string" && (n = Oc(o)),
    Array.isArray(n) ? (n[0] === null && (n[0] = o), n) : [o, n]
  );
}
const zc = {
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  },
  Rs = {},
  Wh = {};
for (const e in zc)
  Wh[e] = () => (Rs[e] === void 0 && (Rs[e] = zc[e]()), Rs[e]);
const $1 = new Set(["opacity"]),
  cu =
    (e, t, n, r = {}) =>
    (i) => {
      const o = $h(r, e) || {},
        s = o.delay || r.delay || 0;
      let { elapsed: l = 0 } = r;
      l = l - zi(s);
      const a = U1(t, e, n, o),
        u = a[0],
        c = a[a.length - 1],
        d = zl(e, u),
        f = zl(e, c);
      let m = {
        keyframes: a,
        velocity: t.getVelocity(),
        ...o,
        elapsed: l,
        onUpdate: (h) => {
          t.set(h), o.onUpdate && o.onUpdate(h);
        },
        onComplete: () => {
          i(), o.onComplete && o.onComplete();
        },
      };
      if (!d || !f || Zy.current || o.type === !1) return O1(m);
      if (o.type === "inertia") {
        const h = z1(m);
        return () => h.stop();
      }
      B1(o) || (m = { ...m, ...F1(e, m) }),
        m.duration && (m.duration = zi(m.duration)),
        m.repeatDelay && (m.repeatDelay = zi(m.repeatDelay));
      const g = t.owner,
        y = g && g.current;
      if (
        Wh.waapi() &&
        $1.has(e) &&
        !m.repeatDelay &&
        m.repeatType !== "mirror" &&
        m.damping !== 0 &&
        g &&
        y instanceof HTMLElement &&
        !g.getProps().onUpdate
      )
        return I1(t, e, m);
      {
        const h = wo(m);
        return () => h.stop();
      }
    };
function W1(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((o) => jl(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = jl(e, t, n);
  else {
    const i = typeof t == "function" ? Ko(e, t, n.custom) : t;
    r = Hh(e, i, n);
  }
  return r.then(() => e.notify("AnimationComplete", t));
}
function jl(e, t, n = {}) {
  var r;
  const i = Ko(e, t, n.custom);
  let { transition: o = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (o = n.transitionOverride);
  const s = i ? () => Hh(e, i, n) : () => Promise.resolve(),
    l =
      !((r = e.variantChildren) === null || r === void 0) && r.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: d,
              staggerDirection: f,
            } = o;
            return H1(e, t, c + u, d, f, n);
          }
        : () => Promise.resolve(),
    { when: a } = o;
  if (a) {
    const [u, c] = a === "beforeChildren" ? [s, l] : [l, s];
    return u().then(c);
  } else return Promise.all([s(), l(n.delay)]);
}
function Hh(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var o;
  let {
    transition: s = e.getDefaultTransition(),
    transitionEnd: l,
    ...a
  } = e.makeTargetAnimatable(t);
  const u = e.getValue("willChange");
  r && (s = r);
  const c = [],
    d =
      i &&
      ((o = e.animationState) === null || o === void 0
        ? void 0
        : o.getState()[i]);
  for (const f in a) {
    const m = e.getValue(f),
      g = a[f];
    if (!m || g === void 0 || (d && K1(d, f))) continue;
    let y = { delay: n, elapsed: 0, ...s };
    if (
      (e.shouldReduceMotion && cn.has(f) && (y = { ...y, type: !1, delay: 0 }),
      !m.hasAnimated)
    ) {
      const h = e.getProps()[Xy];
      h && (y.elapsed = Gy(h, f));
    }
    let S = m.start(cu(f, m, g, y));
    mo(u) && (u.add(f), (S = S.then(() => u.remove(f)))), c.push(S);
  }
  return Promise.all(c).then(() => {
    l && $y(e, l);
  });
}
function H1(e, t, n = 0, r = 0, i = 1, o) {
  const s = [],
    l = (e.variantChildren.size - 1) * r,
    a = i === 1 ? (u = 0) => u * r : (u = 0) => l - u * r;
  return (
    Array.from(e.variantChildren)
      .sort(Q1)
      .forEach((u, c) => {
        s.push(
          jl(u, t, { ...o, delay: n + a(c) }).then(() =>
            u.notify("AnimationComplete", t)
          )
        );
      }),
    Promise.all(s)
  );
}
function Q1(e, t) {
  return e.sortNodePosition(t);
}
function K1({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
const fu = [j.Animate, j.InView, j.Focus, j.Hover, j.Tap, j.Drag, j.Exit],
  G1 = [...fu].reverse(),
  Y1 = fu.length;
function X1(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: r }) => W1(e, n, r)));
}
function Z1(e) {
  let t = X1(e);
  const n = q1();
  let r = !0;
  const i = (a, u) => {
    const c = Ko(e, u);
    if (c) {
      const { transition: d, transitionEnd: f, ...m } = c;
      a = { ...a, ...m, ...f };
    }
    return a;
  };
  function o(a) {
    t = a(e);
  }
  function s(a, u) {
    const c = e.getProps(),
      d = e.getVariantContext(!0) || {},
      f = [],
      m = new Set();
    let g = {},
      y = 1 / 0;
    for (let h = 0; h < Y1; h++) {
      const p = G1[h],
        v = n[p],
        w = c[p] !== void 0 ? c[p] : d[p],
        k = Ur(w),
        C = p === u ? v.isActive : null;
      C === !1 && (y = h);
      let P = w === d[p] && w !== c[p] && k;
      if (
        (P && r && e.manuallyAnimateOnMount && (P = !1),
        (v.protectedKeys = { ...g }),
        (!v.isActive && C === null) ||
          (!w && !v.prevProp) ||
          Bo(w) ||
          typeof w == "boolean")
      )
        continue;
      const _ = J1(v.prevProp, w);
      let I = _ || (p === u && v.isActive && !P && k) || (h > y && k);
      const R = Array.isArray(w) ? w : [w];
      let Y = R.reduce(i, {});
      C === !1 && (Y = {});
      const { prevResolvedValues: Qe = {} } = v,
        rt = { ...Qe, ...Y },
        vt = (q) => {
          (I = !0), m.delete(q), (v.needsAnimating[q] = !0);
        };
      for (const q in rt) {
        const de = Y[q],
          Ke = Qe[q];
        g.hasOwnProperty(q) ||
          (de !== Ke
            ? fo(de) && fo(Ke)
              ? !yh(de, Ke) || _
                ? vt(q)
                : (v.protectedKeys[q] = !0)
              : de !== void 0
              ? vt(q)
              : m.add(q)
            : de !== void 0 && m.has(q)
            ? vt(q)
            : (v.protectedKeys[q] = !0));
      }
      (v.prevProp = w),
        (v.prevResolvedValues = Y),
        v.isActive && (g = { ...g, ...Y }),
        r && e.blockInitialAnimation && (I = !1),
        I &&
          !P &&
          f.push(
            ...R.map((q) => ({ animation: q, options: { type: p, ...a } }))
          );
    }
    if (m.size) {
      const h = {};
      m.forEach((p) => {
        const v = e.getBaseTarget(p);
        v !== void 0 && (h[p] = v);
      }),
        f.push({ animation: h });
    }
    let S = !!f.length;
    return (
      r && c.initial === !1 && !e.manuallyAnimateOnMount && (S = !1),
      (r = !1),
      S ? t(f) : Promise.resolve()
    );
  }
  function l(a, u, c) {
    var d;
    if (n[a].isActive === u) return Promise.resolve();
    (d = e.variantChildren) === null ||
      d === void 0 ||
      d.forEach((m) => {
        var g;
        return (g = m.animationState) === null || g === void 0
          ? void 0
          : g.setActive(a, u);
      }),
      (n[a].isActive = u);
    const f = s(c, a);
    for (const m in n) n[m].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: s,
    setActive: l,
    setAnimateFunction: o,
    getState: () => n,
  };
}
function J1(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !yh(t, e) : !1;
}
function Qt(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function q1() {
  return {
    [j.Animate]: Qt(!0),
    [j.InView]: Qt(),
    [j.Hover]: Qt(),
    [j.Tap]: Qt(),
    [j.Drag]: Qt(),
    [j.Focus]: Qt(),
    [j.Exit]: Qt(),
  };
}
const b1 = {
    animation: Tt(({ visualElement: e, animate: t }) => {
      e.animationState || (e.animationState = Z1(e)),
        Bo(t) && x.useEffect(() => t.subscribe(e), [t]);
    }),
    exit: Tt((e) => {
      const { custom: t, visualElement: n } = e,
        [r, i] = gh(),
        o = x.useContext(Fo);
      x.useEffect(() => {
        n.isPresent = r;
        const s =
          n.animationState &&
          n.animationState.setActive(j.Exit, !r, {
            custom: (o && o.custom) || t,
          });
        s && !r && s.then(i);
      }, [r]);
    }),
  },
  jc = (e, t) => Math.abs(e - t);
function ew(e, t) {
  const n = jc(e.x, t.x),
    r = jc(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class Qh {
  constructor(t, n, { transformPagePoint: r } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const u = Ds(this.lastMoveEventInfo, this.history),
          c = this.startEvent !== null,
          d = ew(u.offset, { x: 0, y: 0 }) >= 3;
        if (!c && !d) return;
        const { point: f } = u,
          { timestamp: m } = ct;
        this.history.push({ ...f, timestamp: m });
        const { onStart: g, onMove: y } = this.handlers;
        c ||
          (g && g(this.lastMoveEvent, u),
          (this.startEvent = this.lastMoveEvent)),
          y && y(this.lastMoveEvent, u);
      }),
      (this.handlePointerMove = (u, c) => {
        if (
          ((this.lastMoveEvent = u),
          (this.lastMoveEventInfo = As(c, this.transformPagePoint)),
          ah(u) && u.buttons === 0)
        ) {
          this.handlePointerUp(u, c);
          return;
        }
        Te.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (u, c) => {
        this.end();
        const { onEnd: d, onSessionEnd: f } = this.handlers,
          m = Ds(As(c, this.transformPagePoint), this.history);
        this.startEvent && d && d(u, m), f && f(u, m);
      }),
      uh(t) && t.touches.length > 1)
    )
      return;
    (this.handlers = n), (this.transformPagePoint = r);
    const i = Xa(t),
      o = As(i, this.transformPagePoint),
      { point: s } = o,
      { timestamp: l } = ct;
    this.history = [{ ...s, timestamp: l }];
    const { onSessionStart: a } = n;
    a && a(t, Ds(o, this.history)),
      (this.removeListeners = Ho(
        Nn(window, "pointermove", this.handlePointerMove),
        Nn(window, "pointerup", this.handlePointerUp),
        Nn(window, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), zt.update(this.updatePoint);
  }
}
function As(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Fc(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ds({ point: e }, t) {
  return {
    point: e,
    delta: Fc(e, Kh(t)),
    offset: Fc(e, tw(t)),
    velocity: nw(t, 0.1),
  };
}
function tw(e) {
  return e[0];
}
function Kh(e) {
  return e[e.length - 1];
}
function nw(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = Kh(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > zi(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const o = (i.timestamp - r.timestamp) / 1e3;
  if (o === 0) return { x: 0, y: 0 };
  const s = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function Ve(e) {
  return e.max - e.min;
}
function Fl(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function Bc(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = G(t.min, t.max, e.origin)),
    (e.scale = Ve(n) / Ve(t)),
    (Fl(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = G(n.min, n.max, e.origin) - e.originPoint),
    (Fl(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function xr(e, t, n, r) {
  Bc(e.x, t.x, n.x, r == null ? void 0 : r.originX),
    Bc(e.y, t.y, n.y, r == null ? void 0 : r.originY);
}
function Uc(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + Ve(t));
}
function rw(e, t, n) {
  Uc(e.x, t.x, n.x), Uc(e.y, t.y, n.y);
}
function $c(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + Ve(t));
}
function kr(e, t, n) {
  $c(e.x, t.x, n.x), $c(e.y, t.y, n.y);
}
function iw(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? G(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? G(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function Wc(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function ow(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: Wc(e.x, n, i), y: Wc(e.y, t, r) };
}
function Hc(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function sw(e, t) {
  return { x: Hc(e.x, t.x), y: Hc(e.y, t.y) };
}
function lw(e, t) {
  let n = 0.5;
  const r = Ve(e),
    i = Ve(t);
  return (
    i > r
      ? (n = go(t.min, t.max - r, e.min))
      : r > i && (n = go(e.min, e.max - i, t.min)),
    $n(0, 1, n)
  );
}
function aw(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const Bl = 0.35;
function uw(e = Bl) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Bl),
    { x: Qc(e, "left", "right"), y: Qc(e, "top", "bottom") }
  );
}
function Qc(e, t, n) {
  return { min: Kc(e, t), max: Kc(e, n) };
}
function Kc(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Gc = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Er = () => ({ x: Gc(), y: Gc() }),
  Yc = () => ({ min: 0, max: 0 }),
  b = () => ({ x: Yc(), y: Yc() });
function Ze(e) {
  return [e("x"), e("y")];
}
function Gh({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function cw({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function fw(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function Ms(e) {
  return e === void 0 || e === 1;
}
function Ul({ scale: e, scaleX: t, scaleY: n }) {
  return !Ms(e) || !Ms(t) || !Ms(n);
}
function Yt(e) {
  return Ul(e) || Yh(e) || e.z || e.rotate || e.rotateX || e.rotateY;
}
function Yh(e) {
  return Xc(e.x) || Xc(e.y);
}
function Xc(e) {
  return e && e !== "0%";
}
function So(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function Zc(e, t, n, r, i) {
  return i !== void 0 && (e = So(e, i, r)), So(e, n, r) + t;
}
function $l(e, t = 0, n = 1, r, i) {
  (e.min = Zc(e.min, t, n, r, i)), (e.max = Zc(e.max, t, n, r, i));
}
function Xh(e, { x: t, y: n }) {
  $l(e.x, t.translate, t.scale, t.originPoint),
    $l(e.y, n.translate, n.scale, n.originPoint);
}
function dw(e, t, n, r = !1) {
  var i, o;
  const s = n.length;
  if (!s) return;
  t.x = t.y = 1;
  let l, a;
  for (let u = 0; u < s; u++)
    (l = n[u]),
      (a = l.projectionDelta),
      ((o = (i = l.instance) === null || i === void 0 ? void 0 : i.style) ===
        null || o === void 0
        ? void 0
        : o.display) !== "contents" &&
        (r &&
          l.options.layoutScroll &&
          l.scroll &&
          l !== l.root &&
          _n(e, { x: -l.scroll.offset.x, y: -l.scroll.offset.y }),
        a && ((t.x *= a.x.scale), (t.y *= a.y.scale), Xh(e, a)),
        r && Yt(l.latestValues) && _n(e, l.latestValues));
  (t.x = Jc(t.x)), (t.y = Jc(t.y));
}
function Jc(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999
    ? e
    : 1;
}
function xt(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function qc(e, t, [n, r, i]) {
  const o = t[i] !== void 0 ? t[i] : 0.5,
    s = G(e.min, e.max, o);
  $l(e, t[n], t[r], s, t.scale);
}
const pw = ["x", "scaleX", "originX"],
  hw = ["y", "scaleY", "originY"];
function _n(e, t) {
  qc(e.x, t, pw), qc(e.y, t, hw);
}
function Zh(e, t) {
  return Gh(fw(e.getBoundingClientRect(), t));
}
function mw(e, t, n) {
  const r = Zh(e, n),
    { scroll: i } = t;
  return i && (xt(r.x, i.offset.x), xt(r.y, i.offset.y)), r;
}
const vw = new WeakMap();
class gw {
  constructor(t) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = b()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    if (this.visualElement.isPresent === !1) return;
    const r = (l) => {
        this.stopAnimation(), n && this.snapToCursor(Xa(l, "page").point);
      },
      i = (l, a) => {
        var u;
        const { drag: c, dragPropagation: d, onDragStart: f } = this.getProps();
        (c &&
          !d &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = ph(c)),
          !this.openGlobalLock)) ||
          ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Ze((m) => {
            var g, y;
            let S = this.getAxisMotionValue(m).get() || 0;
            if (tt.test(S)) {
              const h =
                (y =
                  (g = this.visualElement.projection) === null || g === void 0
                    ? void 0
                    : g.layout) === null || y === void 0
                  ? void 0
                  : y.layoutBox[m];
              h && (S = Ve(h) * (parseFloat(S) / 100));
            }
            this.originPoint[m] = S;
          }),
          f == null || f(l, a),
          (u = this.visualElement.animationState) === null ||
            u === void 0 ||
            u.setActive(j.Drag, !0));
      },
      o = (l, a) => {
        const {
          dragPropagation: u,
          dragDirectionLock: c,
          onDirectionLock: d,
          onDrag: f,
        } = this.getProps();
        if (!u && !this.openGlobalLock) return;
        const { offset: m } = a;
        if (c && this.currentDirection === null) {
          (this.currentDirection = yw(m)),
            this.currentDirection !== null &&
              (d == null || d(this.currentDirection));
          return;
        }
        this.updateAxis("x", a.point, m),
          this.updateAxis("y", a.point, m),
          this.visualElement.render(),
          f == null || f(l, a);
      },
      s = (l, a) => this.stop(l, a);
    this.panSession = new Qh(
      t,
      { onSessionStart: r, onStart: i, onMove: o, onSessionEnd: s },
      { transformPagePoint: this.visualElement.getTransformPagePoint() }
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: o } = this.getProps();
    o == null || o(t, n);
  }
  cancel() {
    var t, n;
    (this.isDragging = !1),
      this.visualElement.projection &&
        (this.visualElement.projection.isAnimationBlocked = !1),
      (t = this.panSession) === null || t === void 0 || t.end(),
      (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      (n = this.visualElement.animationState) === null ||
        n === void 0 ||
        n.setActive(j.Drag, !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Ei(t, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (s = iw(s, this.constraints[t], this.elastic[t])),
      o.set(s);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      { layout: r } = this.visualElement.projection || {},
      i = this.constraints;
    t && Pn(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && r
      ? (this.constraints = ow(r.layoutBox, t))
      : (this.constraints = !1),
      (this.elastic = uw(n)),
      i !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Ze((o) => {
          this.getAxisMotionValue(o) &&
            (this.constraints[o] = aw(r.layoutBox[o], this.constraints[o]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !Pn(t)) return !1;
    const r = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = mw(r, i.root, this.visualElement.getTransformPagePoint());
    let s = sw(i.layout.layoutBox, o);
    if (n) {
      const l = n(cw(s));
      (this.hasMutatedConstraints = !!l), l && (s = Gh(l));
    }
    return s;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: s,
        onDragTransitionEnd: l,
      } = this.getProps(),
      a = this.constraints || {},
      u = Ze((c) => {
        if (!Ei(c, n, this.currentDirection)) return;
        let d = (a == null ? void 0 : a[c]) || {};
        s && (d = { min: 0, max: 0 });
        const f = i ? 200 : 1e6,
          m = i ? 40 : 1e7,
          g = {
            type: "inertia",
            velocity: r ? t[c] : 0,
            bounceStiffness: f,
            bounceDamping: m,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...d,
          };
        return this.startAxisValueAnimation(c, g);
      });
    return Promise.all(u).then(l);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(cu(t, r, 0, n));
  }
  stopAnimation() {
    Ze((t) => this.getAxisMotionValue(t).stop());
  }
  getAxisMotionValue(t) {
    var n;
    const r = "_drag" + t.toUpperCase(),
      i = this.visualElement.getProps()[r];
    return (
      i ||
      this.visualElement.getValue(
        t,
        ((n = this.visualElement.getProps().initial) === null || n === void 0
          ? void 0
          : n[t]) || 0
      )
    );
  }
  snapToCursor(t) {
    Ze((n) => {
      const { drag: r } = this.getProps();
      if (!Ei(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: s, max: l } = i.layout.layoutBox[n];
        o.set(t[n] - G(s, l, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    var t;
    if (!this.visualElement.current) return;
    const { drag: n, dragConstraints: r } = this.getProps(),
      { projection: i } = this.visualElement;
    if (!Pn(r) || !i || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Ze((l) => {
      const a = this.getAxisMotionValue(l);
      if (a) {
        const u = a.get();
        o[l] = lw({ min: u, max: u }, this.constraints[l]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = s ? s({}, "") : "none"),
      (t = i.root) === null || t === void 0 || t.updateScroll(),
      i.updateLayout(),
      this.resolveConstraints(),
      Ze((l) => {
        if (!Ei(l, n, null)) return;
        const a = this.getAxisMotionValue(l),
          { min: u, max: c } = this.constraints[l];
        a.set(G(u, c, o[l]));
      });
  }
  addListeners() {
    var t;
    if (!this.visualElement.current) return;
    vw.set(this.visualElement, this);
    const n = this.visualElement.current,
      r = Nn(n, "pointerdown", (u) => {
        const { drag: c, dragListener: d = !0 } = this.getProps();
        c && d && this.start(u);
      }),
      i = () => {
        const { dragConstraints: u } = this.getProps();
        Pn(u) && (this.constraints = this.resolveRefConstraints());
      },
      { projection: o } = this.visualElement,
      s = o.addEventListener("measure", i);
    o &&
      !o.layout &&
      ((t = o.root) === null || t === void 0 || t.updateScroll(),
      o.updateLayout()),
      i();
    const l = Wo(window, "resize", () => this.scalePositionWithinConstraints()),
      a = o.addEventListener(
        "didUpdate",
        ({ delta: u, hasLayoutChanged: c }) => {
          this.isDragging &&
            c &&
            (Ze((d) => {
              const f = this.getAxisMotionValue(d);
              f &&
                ((this.originPoint[d] += u[d].translate),
                f.set(f.get() + u[d].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      l(), r(), s(), a == null || a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: s = Bl,
        dragMomentum: l = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: l,
    };
  }
}
function Ei(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function yw(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
function ww(e) {
  const { dragControls: t, visualElement: n } = e,
    r = $o(() => new gw(n));
  x.useEffect(() => t && t.subscribe(r), [r, t]),
    x.useEffect(() => r.addListeners(), [r]);
}
function Sw({
  onPan: e,
  onPanStart: t,
  onPanEnd: n,
  onPanSessionStart: r,
  visualElement: i,
}) {
  const o = e || t || n || r,
    s = x.useRef(null),
    { transformPagePoint: l } = x.useContext(Ba),
    a = {
      onSessionStart: r,
      onStart: t,
      onMove: e,
      onEnd: (c, d) => {
        (s.current = null), n && n(c, d);
      },
    };
  x.useEffect(() => {
    s.current !== null && s.current.updateHandlers(a);
  });
  function u(c) {
    s.current = new Qh(c, a, { transformPagePoint: l });
  }
  po(i, "pointerdown", o && u), vh(() => s.current && s.current.end());
}
const xw = { pan: Tt(Sw), drag: Tt(ww) };
function Wl(e) {
  return typeof e == "string" && e.startsWith("var(--");
}
const Jh = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function kw(e) {
  const t = Jh.exec(e);
  if (!t) return [,];
  const [, n, r] = t;
  return [n, r];
}
function Hl(e, t, n = 1) {
  const [r, i] = kw(e);
  if (!r) return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  return o ? o.trim() : Wl(i) ? Hl(i, t, n + 1) : i;
}
function Ew(e, { ...t }, n) {
  const r = e.current;
  if (!(r instanceof Element)) return { target: t, transitionEnd: n };
  n && (n = { ...n }),
    e.values.forEach((i) => {
      const o = i.get();
      if (!Wl(o)) return;
      const s = Hl(o, r);
      s && i.set(s);
    });
  for (const i in t) {
    const o = t[i];
    if (!Wl(o)) continue;
    const s = Hl(o, r);
    s && ((t[i] = s), n && n[i] === void 0 && (n[i] = o));
  }
  return { target: t, transitionEnd: n };
}
const Cw = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
  ]),
  qh = (e) => Cw.has(e),
  Pw = (e) => Object.keys(e).some(qh),
  bh = (e, t) => {
    e.set(t, !1), e.set(t);
  },
  bc = (e) => e === fn || e === A;
var ef;
(function (e) {
  (e.width = "width"),
    (e.height = "height"),
    (e.left = "left"),
    (e.right = "right"),
    (e.top = "top"),
    (e.bottom = "bottom");
})(ef || (ef = {}));
const tf = (e, t) => parseFloat(e.split(", ")[t]),
  nf =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/);
      if (i) return tf(i[1], t);
      {
        const o = r.match(/^matrix\((.+)\)$/);
        return o ? tf(o[1], e) : 0;
      }
    },
  Tw = new Set(["x", "y", "z"]),
  _w = uo.filter((e) => !Tw.has(e));
function Vw(e) {
  const t = [];
  return (
    _w.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t.length && e.render(),
    t
  );
}
const rf = {
    width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
      e.max - e.min - parseFloat(t) - parseFloat(n),
    height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
      e.max - e.min - parseFloat(t) - parseFloat(n),
    top: (e, { top: t }) => parseFloat(t),
    left: (e, { left: t }) => parseFloat(t),
    bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
    right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
    x: nf(4, 13),
    y: nf(5, 14),
  },
  Lw = (e, t, n) => {
    const r = t.measureViewportBox(),
      i = t.current,
      o = getComputedStyle(i),
      { display: s } = o,
      l = {};
    s === "none" && t.setStaticValue("display", e.display || "block"),
      n.forEach((u) => {
        l[u] = rf[u](r, o);
      }),
      t.render();
    const a = t.measureViewportBox();
    return (
      n.forEach((u) => {
        const c = t.getValue(u);
        bh(c, l[u]), (e[u] = rf[u](a, o));
      }),
      e
    );
  },
  Rw = (e, t, n = {}, r = {}) => {
    (t = { ...t }), (r = { ...r });
    const i = Object.keys(t).filter(qh);
    let o = [],
      s = !1;
    const l = [];
    if (
      (i.forEach((a) => {
        const u = e.getValue(a);
        if (!e.hasValue(a)) return;
        let c = n[a],
          d = nr(c);
        const f = t[a];
        let m;
        if (fo(f)) {
          const g = f.length,
            y = f[0] === null ? 1 : 0;
          (c = f[y]), (d = nr(c));
          for (let S = y; S < g; S++) m ? vo(nr(f[S]) === m) : (m = nr(f[S]));
        } else m = nr(f);
        if (d !== m)
          if (bc(d) && bc(m)) {
            const g = u.get();
            typeof g == "string" && u.set(parseFloat(g)),
              typeof f == "string"
                ? (t[a] = parseFloat(f))
                : Array.isArray(f) && m === A && (t[a] = f.map(parseFloat));
          } else
            d != null &&
            d.transform &&
            m != null &&
            m.transform &&
            (c === 0 || f === 0)
              ? c === 0
                ? u.set(m.transform(c))
                : (t[a] = d.transform(f))
              : (s || ((o = Vw(e)), (s = !0)),
                l.push(a),
                (r[a] = r[a] !== void 0 ? r[a] : t[a]),
                bh(u, f));
      }),
      l.length)
    ) {
      const a = l.indexOf("height") >= 0 ? window.pageYOffset : null,
        u = Lw(t, e, l);
      return (
        o.length &&
          o.forEach(([c, d]) => {
            e.getValue(c).set(d);
          }),
        e.render(),
        un && a !== null && window.scrollTo({ top: a }),
        { target: u, transitionEnd: r }
      );
    } else return { target: t, transitionEnd: r };
  };
function Aw(e, t, n, r) {
  return Pw(t) ? Rw(e, t, n, r) : { target: t, transitionEnd: r };
}
const Dw = (e, t, n, r) => {
    const i = Ew(e, t, r);
    return (t = i.target), (r = i.transitionEnd), Aw(e, t, n, r);
  },
  Ql = { current: null },
  em = { current: !1 };
function Mw() {
  if (((em.current = !0), !!un))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (Ql.current = e.matches);
      e.addListener(t), t();
    } else Ql.current = !1;
}
function Nw(e, t, n) {
  const { willChange: r } = t;
  for (const i in t) {
    const o = t[i],
      s = n[i];
    if (nt(o)) e.addValue(i, o), mo(r) && r.add(i);
    else if (nt(s)) e.addValue(i, Wn(o, { owner: e })), mo(r) && r.remove(i);
    else if (s !== o)
      if (e.hasValue(i)) {
        const l = e.getValue(i);
        !l.hasAnimated && l.set(o);
      } else {
        const l = e.getStaticValue(i);
        e.addValue(i, Wn(l !== void 0 ? l : o));
      }
  }
  for (const i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
const tm = Object.keys($r),
  Iw = tm.length,
  of = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "Unmount",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ];
class Ow {
  constructor(
    { parent: t, props: n, reducedMotionConfig: r, visualState: i },
    o = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.isPresent = !0),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.scheduleRender = () => Te.render(this.render, !1, !0));
    const { latestValues: s, renderState: l } = i;
    (this.latestValues = s),
      (this.baseTarget = { ...s }),
      (this.initialValues = n.initial ? { ...s } : {}),
      (this.renderState = l),
      (this.parent = t),
      (this.props = n),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = r),
      (this.options = o),
      (this.isControllingVariants = Uo(n)),
      (this.isVariantNode = Yp(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: a, ...u } = this.scrapeMotionValuesFromProps(n);
    for (const c in u) {
      const d = u[c];
      s[c] !== void 0 && nt(d) && (d.set(s[c], !1), mo(a) && a.add(c));
    }
  }
  scrapeMotionValuesFromProps(t) {
    return {};
  }
  mount(t) {
    var n;
    (this.current = t),
      this.projection && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree =
          (n = this.parent) === null || n === void 0
            ? void 0
            : n.addVariantChild(this)),
      this.values.forEach((r, i) => this.bindToMotionValue(i, r)),
      em.current || Mw(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : Ql.current),
      this.parent && this.parent.children.add(this),
      this.setProps(this.props);
  }
  unmount() {
    var t, n, r;
    (t = this.projection) === null || t === void 0 || t.unmount(),
      zt.update(this.notifyUpdate),
      zt.render(this.render),
      this.valueSubscriptions.forEach((i) => i()),
      (n = this.removeFromVariantTree) === null || n === void 0 || n.call(this),
      (r = this.parent) === null || r === void 0 || r.children.delete(this);
    for (const i in this.events) this.events[i].clear();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = cn.has(t),
      i = n.on("change", (s) => {
        (this.latestValues[t] = s),
          this.props.onUpdate && Te.update(this.notifyUpdate, !1, !0),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      o = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      i(), o();
    });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  loadFeatures(t, n, r, i, o, s) {
    const l = [];
    for (let a = 0; a < Iw; a++) {
      const u = tm[a],
        { isEnabled: c, Component: d } = $r[u];
      c(t) &&
        d &&
        l.push(x.createElement(d, { key: u, ...t, visualElement: this }));
    }
    if (!this.projection && o) {
      this.projection = new o(
        i,
        this.latestValues,
        this.parent && this.parent.projection
      );
      const {
        layoutId: a,
        layout: u,
        drag: c,
        dragConstraints: d,
        layoutScroll: f,
      } = t;
      this.projection.setOptions({
        layoutId: a,
        layout: u,
        alwaysMeasureLayout: !!c || (d && Pn(d)),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof u == "string" ? u : "both",
        initialPromotionConfig: s,
        layoutScroll: f,
      });
    }
    return l;
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : b();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  makeTargetAnimatable(t, n = !0) {
    return this.makeTargetAnimatableFromInstance(t, this.props, n);
  }
  setProps(t) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.props = t);
    for (let n = 0; n < of.length; n++) {
      const r = of[n];
      this.propEventSubscriptions[r] &&
        (this.propEventSubscriptions[r](),
        delete this.propEventSubscriptions[r]);
      const i = t["on" + r];
      i && (this.propEventSubscriptions[r] = this.on(r, i));
    }
    this.prevMotionValues = Nw(
      this,
      this.scrapeMotionValuesFromProps(t),
      this.prevMotionValues
    );
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    var n;
    return (n = this.props.variants) === null || n === void 0 ? void 0 : n[t];
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    var t;
    return this.isVariantNode
      ? this
      : (t = this.parent) === null || t === void 0
      ? void 0
      : t.getClosestVariantNode();
  }
  getVariantContext(t = !1) {
    var n, r;
    if (t)
      return (n = this.parent) === null || n === void 0
        ? void 0
        : n.getVariantContext();
    if (!this.isControllingVariants) {
      const o =
        ((r = this.parent) === null || r === void 0
          ? void 0
          : r.getVariantContext()) || {};
      return (
        this.props.initial !== void 0 && (o.initial = this.props.initial), o
      );
    }
    const i = {};
    for (let o = 0; o < zw; o++) {
      const s = nm[o],
        l = this.props[s];
      (Ur(l) || l === !1) && (i[s] = l);
    }
    return i;
  }
  addVariantChild(t) {
    var n;
    const r = this.getClosestVariantNode();
    if (r)
      return (
        (n = r.variantChildren) === null || n === void 0 || n.add(t),
        () => r.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    this.hasValue(t) && this.removeValue(t),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()),
      this.bindToMotionValue(t, n);
  }
  removeValue(t) {
    var n;
    this.values.delete(t),
      (n = this.valueSubscriptions.get(t)) === null || n === void 0 || n(),
      this.valueSubscriptions.delete(t),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = Wn(n, { owner: this })), this.addValue(t, r)),
      r
    );
  }
  readValue(t) {
    return this.latestValues[t] !== void 0 || !this.current
      ? this.latestValues[t]
      : this.readValueFromInstance(this.current, t, this.options);
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const { initial: r } = this.props,
      i =
        typeof r == "string" || typeof r == "object"
          ? (n = Ya(this.props, r)) === null || n === void 0
            ? void 0
            : n[t]
          : void 0;
    if (r && i !== void 0) return i;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !nt(o)
      ? o
      : this.initialValues[t] !== void 0 && i === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new qa()), this.events[t].add(n);
  }
  notify(t, ...n) {
    var r;
    (r = this.events[t]) === null || r === void 0 || r.notify(...n);
  }
}
const nm = ["initial", ...fu],
  zw = nm.length;
class rm extends Ow {
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    var r;
    return (r = t.style) === null || r === void 0 ? void 0 : r[n];
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  makeTargetAnimatableFromInstance(
    { transition: t, transitionEnd: n, ...r },
    { transformValues: i },
    o
  ) {
    let s = Qy(r, t || {}, this);
    if ((i && (n && (n = i(n)), r && (r = i(r)), s && (s = i(s))), o)) {
      Wy(this, r, s);
      const l = Dw(this, r, s, n);
      (n = l.transitionEnd), (r = l.target);
    }
    return { transition: t, transitionEnd: n, ...r };
  }
}
function jw(e) {
  return window.getComputedStyle(e);
}
class Fw extends rm {
  readValueFromInstance(t, n) {
    if (cn.has(n)) {
      const r = tu(n);
      return (r && r.default) || 0;
    } else {
      const r = jw(t),
        i = (qp(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Zh(t, n);
  }
  build(t, n, r, i) {
    $a(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t) {
    return Ga(t);
  }
  renderInstance(t, n, r, i) {
    rh(t, n, r, i);
  }
}
class Bw extends rm {
  constructor() {
    super(...arguments), (this.isSVGTag = !1);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    var r;
    return cn.has(n)
      ? ((r = tu(n)) === null || r === void 0 ? void 0 : r.default) || 0
      : ((n = ih.has(n) ? n : Ka(n)), t.getAttribute(n));
  }
  measureInstanceViewportBox() {
    return b();
  }
  scrapeMotionValuesFromProps(t) {
    return sh(t);
  }
  build(t, n, r, i) {
    Ha(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    oh(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = Qa(t.tagName)), super.mount(t);
  }
}
const Uw = (e, t) =>
  Ua(e)
    ? new Bw(t, { enableHardwareAcceleration: !1 })
    : new Fw(t, { enableHardwareAcceleration: !0 });
function sf(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const rr = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (A.test(e)) e = parseFloat(e);
        else return e;
      const n = sf(e, t.target.x),
        r = sf(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  lf = "_$css",
  $w = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = e.includes("var("),
        o = [];
      i && (e = e.replace(Jh, (m) => (o.push(m), lf)));
      const s = jt.parse(e);
      if (s.length > 5) return r;
      const l = jt.createTransformer(e),
        a = typeof s[0] != "number" ? 1 : 0,
        u = n.x.scale * t.x,
        c = n.y.scale * t.y;
      (s[0 + a] /= u), (s[1 + a] /= c);
      const d = G(u, c, 0.5);
      typeof s[2 + a] == "number" && (s[2 + a] /= d),
        typeof s[3 + a] == "number" && (s[3 + a] /= d);
      let f = l(s);
      if (i) {
        let m = 0;
        f = f.replace(lf, () => {
          const g = o[m];
          return m++, g;
        });
      }
      return f;
    },
  };
class Ww extends Gr.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: o } = t;
    mg(Qw),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (yr.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: o,
      } = this.props,
      s = r.projection;
    return (
      s &&
        ((s.isPresent = o),
        i || t.layoutDependency !== n || n === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? s.promote()
            : s.relegate() ||
              Te.postRender(() => {
                var l;
                (!((l = s.getStack()) === null || l === void 0) &&
                  l.members.length) ||
                  this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      !t.currentAnimation && t.isLead() && this.safeToRemove());
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
      } = this.props,
      { projection: i } = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n != null && n.group && n.group.remove(i),
      r != null && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t == null || t();
  }
  render() {
    return null;
  }
}
function Hw(e) {
  const [t, n] = gh(),
    r = x.useContext(Xp);
  return Gr.createElement(Ww, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: x.useContext(Zp),
    isPresent: t,
    safeToRemove: n,
  });
}
const Qw = {
    borderRadius: {
      ...rr,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: rr,
    borderTopRightRadius: rr,
    borderBottomLeftRadius: rr,
    borderBottomRightRadius: rr,
    boxShadow: $w,
  },
  Kw = { measureLayout: Hw };
function Gw(e, t, n = {}) {
  const r = nt(e) ? e : Wn(e);
  return (
    r.start(cu("", r, t, n)),
    { stop: () => r.stop(), isAnimating: () => r.isAnimating() }
  );
}
const im = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Yw = im.length,
  af = (e) => (typeof e == "string" ? parseFloat(e) : e),
  uf = (e) => typeof e == "number" || A.test(e);
function Xw(e, t, n, r, i, o) {
  i
    ? ((e.opacity = G(0, n.opacity !== void 0 ? n.opacity : 1, Zw(r))),
      (e.opacityExit = G(t.opacity !== void 0 ? t.opacity : 1, 0, Jw(r))))
    : o &&
      (e.opacity = G(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r
      ));
  for (let s = 0; s < Yw; s++) {
    const l = `border${im[s]}Radius`;
    let a = cf(t, l),
      u = cf(n, l);
    if (a === void 0 && u === void 0) continue;
    a || (a = 0),
      u || (u = 0),
      a === 0 || u === 0 || uf(a) === uf(u)
        ? ((e[l] = Math.max(G(af(a), af(u), r), 0)),
          (tt.test(u) || tt.test(a)) && (e[l] += "%"))
        : (e[l] = u);
  }
  (t.rotate || n.rotate) && (e.rotate = G(t.rotate || 0, n.rotate || 0, r));
}
function cf(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const Zw = om(0, 0.5, au),
  Jw = om(0.5, 0.95, lu);
function om(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(go(e, t, r)));
}
function ff(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function je(e, t) {
  ff(e.x, t.x), ff(e.y, t.y);
}
function df(e, t, n, r, i) {
  return (
    (e -= t), (e = So(e, 1 / n, r)), i !== void 0 && (e = So(e, 1 / i, r)), e
  );
}
function qw(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (
    (tt.test(t) &&
      ((t = parseFloat(t)), (t = G(s.min, s.max, t / 100) - s.min)),
    typeof t != "number")
  )
    return;
  let l = G(o.min, o.max, r);
  e === o && (l -= t),
    (e.min = df(e.min, t, n, l, i)),
    (e.max = df(e.max, t, n, l, i));
}
function pf(e, t, [n, r, i], o, s) {
  qw(e, t[n], t[r], t[i], t.scale, o, s);
}
const bw = ["x", "scaleX", "originX"],
  eS = ["y", "scaleY", "originY"];
function hf(e, t, n, r) {
  pf(e.x, t, bw, n == null ? void 0 : n.x, r == null ? void 0 : r.x),
    pf(e.y, t, eS, n == null ? void 0 : n.y, r == null ? void 0 : r.y);
}
function mf(e) {
  return e.translate === 0 && e.scale === 1;
}
function sm(e) {
  return mf(e.x) && mf(e.y);
}
function lm(e, t) {
  return (
    e.x.min === t.x.min &&
    e.x.max === t.x.max &&
    e.y.min === t.y.min &&
    e.y.max === t.y.max
  );
}
function vf(e) {
  return Ve(e.x) / Ve(e.y);
}
class tS {
  constructor() {
    this.members = [];
  }
  add(t) {
    Za(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (Ja(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    var r;
    const i = this.lead;
    if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
      i.instance && i.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = i),
        n && (t.resumeFrom.preserveOpacity = !0),
        i.snapshot &&
          ((t.snapshot = i.snapshot),
          (t.snapshot.latestValues = i.animationValues || i.latestValues)),
        !((r = t.root) === null || r === void 0) &&
          r.isUpdating &&
          (t.isLayoutDirty = !0);
      const { crossfade: o } = t.options;
      o === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      var n, r, i, o, s;
      (r = (n = t.options).onExitComplete) === null ||
        r === void 0 ||
        r.call(n),
        (s =
          (i = t.resumingFrom) === null || i === void 0
            ? void 0
            : (o = i.options).onExitComplete) === null ||
          s === void 0 ||
          s.call(o);
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function gf(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y;
  if (
    ((i || o) && (r = `translate3d(${i}px, ${o}px, 0) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const { rotate: a, rotateX: u, rotateY: c } = n;
    a && (r += `rotate(${a}deg) `),
      u && (r += `rotateX(${u}deg) `),
      c && (r += `rotateY(${c}deg) `);
  }
  const s = e.x.scale * t.x,
    l = e.y.scale * t.y;
  return (s !== 1 || l !== 1) && (r += `scale(${s}, ${l})`), r || "none";
}
const nS = (e, t) => e.depth - t.depth;
class rS {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    Za(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    Ja(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(nS),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
const yf = ["", "X", "Y", "Z"],
  wf = 1e3;
let iS = 0;
function am({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s, l = {}, a = t == null ? void 0 : t()) {
      (this.id = iS++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isTransformDirty = !1),
        (this.isProjectionDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.potentialNodes = new Map()),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          this.nodes.forEach(lS),
            this.nodes.forEach(cS),
            this.nodes.forEach(fS);
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.elementId = s),
        (this.latestValues = l),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0),
        s && this.root.registerPotentialNode(s, this);
      for (let u = 0; u < this.path.length; u++)
        this.path[u].shouldResetTransform = !0;
      this.root === this && (this.nodes = new rS());
    }
    addEventListener(s, l) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new qa()),
        this.eventHandlers.get(s).add(l)
      );
    }
    notifyListeners(s, ...l) {
      const a = this.eventHandlers.get(s);
      a == null || a.notify(...l);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    registerPotentialNode(s, l) {
      this.potentialNodes.set(s, l);
    }
    mount(s, l = !1) {
      var a;
      if (this.instance) return;
      (this.isSVG = s instanceof SVGElement && s.tagName !== "svg"),
        (this.instance = s);
      const { layoutId: u, layout: c, visualElement: d } = this.options;
      if (
        (d && !d.current && d.mount(s),
        this.root.nodes.add(this),
        (a = this.parent) === null || a === void 0 || a.children.add(this),
        this.elementId && this.root.potentialNodes.delete(this.elementId),
        l && (c || u) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f;
        const m = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          (this.root.updateBlockedByResize = !0),
            f && f(),
            (f = Uh(m, 250)),
            yr.hasAnimatedSinceResize &&
              ((yr.hasAnimatedSinceResize = !1), this.nodes.forEach(xf));
        });
      }
      u && this.root.registerSharedNode(u, this),
        this.options.animate !== !1 &&
          d &&
          (u || c) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: f,
              hasLayoutChanged: m,
              hasRelativeTargetChanged: g,
              layout: y,
            }) => {
              var S, h, p, v, w;
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const k =
                  (h =
                    (S = this.options.transition) !== null && S !== void 0
                      ? S
                      : d.getDefaultTransition()) !== null && h !== void 0
                    ? h
                    : vS,
                { onLayoutAnimationStart: C, onLayoutAnimationComplete: P } =
                  d.getProps(),
                _ = !this.targetLayout || !lm(this.targetLayout, y) || g,
                I = !m && g;
              if (
                (!((p = this.resumeFrom) === null || p === void 0) &&
                  p.instance) ||
                I ||
                (m && (_ || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, I);
                const R = { ...$h(k, "layout"), onPlay: C, onComplete: P };
                d.shouldReduceMotion && ((R.delay = 0), (R.type = !1)),
                  this.startAnimation(R);
              } else
                !m && this.animationProgress === 0 && xf(this),
                  this.isLead() &&
                    ((w = (v = this.options).onExitComplete) === null ||
                      w === void 0 ||
                      w.call(v));
              this.targetLayout = y;
            }
          );
    }
    unmount() {
      var s, l;
      this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this),
        (s = this.getStack()) === null || s === void 0 || s.remove(this),
        (l = this.parent) === null || l === void 0 || l.children.delete(this),
        (this.instance = void 0),
        zt.preRender(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      var s;
      return (
        this.isAnimationBlocked ||
        ((s = this.parent) === null || s === void 0
          ? void 0
          : s.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      var s;
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        (s = this.nodes) === null || s === void 0 || s.forEach(dS),
        this.animationId++);
    }
    willUpdate(s = !0) {
      var l, a, u;
      if (this.root.isUpdateBlocked()) {
        (a = (l = this.options).onExitComplete) === null ||
          a === void 0 ||
          a.call(l);
        return;
      }
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let m = 0; m < this.path.length; m++) {
        const g = this.path[m];
        (g.shouldResetTransform = !0), g.updateScroll("snapshot");
      }
      const { layoutId: c, layout: d } = this.options;
      if (c === void 0 && !d) return;
      const f =
        (u = this.options.visualElement) === null || u === void 0
          ? void 0
          : u.getProps().transformTemplate;
      (this.prevTransformTemplateValue =
        f == null ? void 0 : f(this.latestValues, "")),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      if (this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Sf);
        return;
      }
      this.isUpdating &&
        ((this.isUpdating = !1),
        this.potentialNodes.size &&
          (this.potentialNodes.forEach(gS), this.potentialNodes.clear()),
        this.nodes.forEach(uS),
        this.nodes.forEach(oS),
        this.nodes.forEach(sS),
        this.clearAllSnapshots(),
        Cs.update(),
        Cs.preRender(),
        Cs.render());
    }
    clearAllSnapshots() {
      this.nodes.forEach(aS), this.sharedNodes.forEach(pS);
    }
    scheduleUpdateProjection() {
      Te.preRender(this.updateProjection, !1, !0);
    }
    scheduleCheckAfterUnmount() {
      Te.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      var s;
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let a = 0; a < this.path.length; a++) this.path[a].updateScroll();
      const l = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = b()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox),
        (s = this.options.visualElement) === null ||
          s === void 0 ||
          s.notify(
            "LayoutMeasure",
            this.layout.layoutBox,
            l == null ? void 0 : l.layoutBox
          );
    }
    updateScroll(s = "measure") {
      let l = !!(this.options.layoutScroll && this.instance);
      this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === s &&
        (l = !1),
        l &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: s,
            isRoot: r(this.instance),
            offset: n(this.instance),
          });
    }
    resetTransform() {
      var s;
      if (!i) return;
      const l = this.isLayoutDirty || this.shouldResetTransform,
        a = this.projectionDelta && !sm(this.projectionDelta),
        u =
          (s = this.options.visualElement) === null || s === void 0
            ? void 0
            : s.getProps().transformTemplate,
        c = u == null ? void 0 : u(this.latestValues, ""),
        d = c !== this.prevTransformTemplateValue;
      l &&
        (a || Yt(this.latestValues) || d) &&
        (i(this.instance, c),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const l = this.measurePageBox();
      let a = this.removeElementScroll(l);
      return (
        s && (a = this.removeTransform(a)),
        yS(a),
        {
          animationId: this.root.animationId,
          measuredBox: l,
          layoutBox: a,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: s } = this.options;
      if (!s) return b();
      const l = s.measureViewportBox(),
        { scroll: a } = this.root;
      return a && (xt(l.x, a.offset.x), xt(l.y, a.offset.y)), l;
    }
    removeElementScroll(s) {
      const l = b();
      je(l, s);
      for (let a = 0; a < this.path.length; a++) {
        const u = this.path[a],
          { scroll: c, options: d } = u;
        if (u !== this.root && c && d.layoutScroll) {
          if (c.isRoot) {
            je(l, s);
            const { scroll: f } = this.root;
            f && (xt(l.x, -f.offset.x), xt(l.y, -f.offset.y));
          }
          xt(l.x, c.offset.x), xt(l.y, c.offset.y);
        }
      }
      return l;
    }
    applyTransform(s, l = !1) {
      const a = b();
      je(a, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !l &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          _n(a, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Yt(c.latestValues) && _n(a, c.latestValues);
      }
      return Yt(this.latestValues) && _n(a, this.latestValues), a;
    }
    removeTransform(s) {
      var l;
      const a = b();
      je(a, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        if (!c.instance || !Yt(c.latestValues)) continue;
        Ul(c.latestValues) && c.updateSnapshot();
        const d = b(),
          f = c.measurePageBox();
        je(d, f),
          hf(
            a,
            c.latestValues,
            (l = c.snapshot) === null || l === void 0 ? void 0 : l.layoutBox,
            d
          );
      }
      return Yt(this.latestValues) && hf(a, this.latestValues), a;
    }
    setTargetDelta(s) {
      (this.targetDelta = s),
        (this.isProjectionDirty = !0),
        this.root.scheduleUpdateProjection();
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    resolveTargetDelta() {
      var s;
      const l = this.getLead();
      if (
        (this.isProjectionDirty ||
          (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        !this.isProjectionDirty && !this.attemptToResolveRelativeTarget)
      )
        return;
      const { layout: a, layoutId: u } = this.options;
      if (!(!this.layout || !(a || u))) {
        if (!this.targetDelta && !this.relativeTarget) {
          const c = this.getClosestProjectingParent();
          c && c.layout
            ? ((this.relativeParent = c),
              (this.relativeTarget = b()),
              (this.relativeTargetOrigin = b()),
              kr(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                c.layout.layoutBox
              ),
              je(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = b()), (this.targetWithTransforms = b())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          !((s = this.relativeParent) === null || s === void 0) &&
          s.target
            ? rw(this.target, this.relativeTarget, this.relativeParent.target)
            : this.targetDelta
            ? (this.resumingFrom
                ? (this.target = this.applyTransform(this.layout.layoutBox))
                : je(this.target, this.layout.layoutBox),
              Xh(this.target, this.targetDelta))
            : je(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const c = this.getClosestProjectingParent();
          c &&
          !!c.resumingFrom == !!this.resumingFrom &&
          !c.options.layoutScroll &&
          c.target
            ? ((this.relativeParent = c),
              (this.relativeTarget = b()),
              (this.relativeTargetOrigin = b()),
              kr(this.relativeTargetOrigin, this.target, c.target),
              je(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Ul(this.parent.latestValues) ||
          Yh(this.parent.latestValues)
        )
      )
        return (this.parent.relativeTarget || this.parent.targetDelta) &&
          this.parent.layout
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    calcProjection() {
      var s;
      const { isProjectionDirty: l, isTransformDirty: a } = this;
      this.isProjectionDirty = this.isTransformDirty = !1;
      const u = this.getLead(),
        c = !!this.resumingFrom || this !== u;
      let d = !0;
      if ((l && (d = !1), c && a && (d = !1), d)) return;
      const { layout: f, layoutId: m } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (!((s = this.parent) === null || s === void 0) &&
            s.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(f || m))
      )
        return;
      je(this.layoutCorrected, this.layout.layoutBox),
        dw(this.layoutCorrected, this.treeScale, this.path, c);
      const { target: g } = u;
      if (!g) return;
      this.projectionDelta ||
        ((this.projectionDelta = Er()),
        (this.projectionDeltaWithTransform = Er()));
      const y = this.treeScale.x,
        S = this.treeScale.y,
        h = this.projectionTransform;
      xr(this.projectionDelta, this.layoutCorrected, g, this.latestValues),
        (this.projectionTransform = gf(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== h ||
          this.treeScale.x !== y ||
          this.treeScale.y !== S) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", g));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var l, a, u;
      (a = (l = this.options).scheduleRender) === null ||
        a === void 0 ||
        a.call(l),
        s &&
          ((u = this.getStack()) === null ||
            u === void 0 ||
            u.scheduleRender()),
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
    }
    setAnimationOrigin(s, l = !1) {
      var a, u;
      const c = this.snapshot,
        d = (c == null ? void 0 : c.latestValues) || {},
        f = { ...this.latestValues },
        m = Er();
      (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !l);
      const g = b(),
        y =
          (c == null ? void 0 : c.source) !==
          ((a = this.layout) === null || a === void 0 ? void 0 : a.source),
        S =
          (((u = this.getStack()) === null || u === void 0
            ? void 0
            : u.members.length) || 0) <= 1,
        h = !!(y && !S && this.options.crossfade === !0 && !this.path.some(mS));
      (this.animationProgress = 0),
        (this.mixTargetDelta = (p) => {
          var v;
          const w = p / 1e3;
          kf(m.x, s.x, w),
            kf(m.y, s.y, w),
            this.setTargetDelta(m),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              !((v = this.relativeParent) === null || v === void 0) &&
              v.layout &&
              (kr(
                g,
                this.layout.layoutBox,
                this.relativeParent.layout.layoutBox
              ),
              hS(this.relativeTarget, this.relativeTargetOrigin, g, w)),
            y &&
              ((this.animationValues = f),
              Xw(f, d, this.latestValues, w, h, S)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = w);
        }),
        this.mixTargetDelta(0);
    }
    startAnimation(s) {
      var l, a;
      this.notifyListeners("animationStart"),
        (l = this.currentAnimation) === null || l === void 0 || l.stop(),
        this.resumingFrom &&
          ((a = this.resumingFrom.currentAnimation) === null ||
            a === void 0 ||
            a.stop()),
        this.pendingAnimation &&
          (zt.update(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Te.update(() => {
          (yr.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Gw(0, wf, {
              ...s,
              onUpdate: (u) => {
                var c;
                this.mixTargetDelta(u),
                  (c = s.onUpdate) === null || c === void 0 || c.call(s, u);
              },
              onComplete: () => {
                var u;
                (u = s.onComplete) === null || u === void 0 || u.call(s),
                  this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      var s;
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0)),
        (s = this.getStack()) === null ||
          s === void 0 ||
          s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      var s;
      this.currentAnimation &&
        ((s = this.mixTargetDelta) === null || s === void 0 || s.call(this, wf),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {
        targetWithTransforms: l,
        target: a,
        layout: u,
        latestValues: c,
      } = s;
      if (!(!l || !a || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          um(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          a = this.target || b();
          const d = Ve(this.layout.layoutBox.x);
          (a.x.min = s.target.x.min), (a.x.max = a.x.min + d);
          const f = Ve(this.layout.layoutBox.y);
          (a.y.min = s.target.y.min), (a.y.max = a.y.min + f);
        }
        je(l, a),
          _n(l, c),
          xr(this.projectionDeltaWithTransform, this.layoutCorrected, l, c);
      }
    }
    registerSharedNode(s, l) {
      var a, u, c;
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new tS()),
        this.sharedNodes.get(s).add(l),
        l.promote({
          transition:
            (a = l.options.initialPromotionConfig) === null || a === void 0
              ? void 0
              : a.transition,
          preserveFollowOpacity:
            (c =
              (u = l.options.initialPromotionConfig) === null || u === void 0
                ? void 0
                : u.shouldPreserveFollowOpacity) === null || c === void 0
              ? void 0
              : c.call(u, l),
        });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: l } = this.options;
      return l
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: l } = this.options;
      return l
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: l, preserveFollowOpacity: a } = {}) {
      const u = this.getStack();
      u && u.promote(this, a),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        l && this.setOptions({ transition: l });
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let l = !1;
      const { latestValues: a } = s;
      if (((a.rotate || a.rotateX || a.rotateY || a.rotateZ) && (l = !0), !l))
        return;
      const u = {};
      for (let c = 0; c < yf.length; c++) {
        const d = "rotate" + yf[c];
        a[d] && ((u[d] = a[d]), s.setStaticValue(d, 0));
      }
      s == null || s.render();
      for (const c in u) s.setStaticValue(c, u[c]);
      s.scheduleRender();
    }
    getProjectionStyles(s = {}) {
      var l, a, u;
      const c = {};
      if (!this.instance || this.isSVG) return c;
      if (this.isVisible) c.visibility = "";
      else return { visibility: "hidden" };
      const d =
        (l = this.options.visualElement) === null || l === void 0
          ? void 0
          : l.getProps().transformTemplate;
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (c.opacity = ""),
          (c.pointerEvents = Oi(s.pointerEvents) || ""),
          (c.transform = d ? d(this.latestValues, "") : "none"),
          c
        );
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const S = {};
        return (
          this.options.layoutId &&
            ((S.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (S.pointerEvents = Oi(s.pointerEvents) || "")),
          this.hasProjected &&
            !Yt(this.latestValues) &&
            ((S.transform = d ? d({}, "") : "none"), (this.hasProjected = !1)),
          S
        );
      }
      const m = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(),
        (c.transform = gf(
          this.projectionDeltaWithTransform,
          this.treeScale,
          m
        )),
        d && (c.transform = d(m, c.transform));
      const { x: g, y } = this.projectionDelta;
      (c.transformOrigin = `${g.origin * 100}% ${y.origin * 100}% 0`),
        f.animationValues
          ? (c.opacity =
              f === this
                ? (u =
                    (a = m.opacity) !== null && a !== void 0
                      ? a
                      : this.latestValues.opacity) !== null && u !== void 0
                  ? u
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : m.opacityExit)
          : (c.opacity =
              f === this
                ? m.opacity !== void 0
                  ? m.opacity
                  : ""
                : m.opacityExit !== void 0
                ? m.opacityExit
                : 0);
      for (const S in ao) {
        if (m[S] === void 0) continue;
        const { correct: h, applyTo: p } = ao[S],
          v = h(m[S], f);
        if (p) {
          const w = p.length;
          for (let k = 0; k < w; k++) c[p[k]] = v;
        } else c[S] = v;
      }
      return (
        this.options.layoutId &&
          (c.pointerEvents = f === this ? Oi(s.pointerEvents) || "" : "none"),
        c
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((s) => {
        var l;
        return (l = s.currentAnimation) === null || l === void 0
          ? void 0
          : l.stop();
      }),
        this.root.nodes.forEach(Sf),
        this.root.sharedNodes.clear();
    }
  };
}
function oS(e) {
  e.updateLayout();
}
function sS(e) {
  var t, n, r;
  const i =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && i && e.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: s } = e.layout,
      { animationType: l } = e.options,
      a = i.source !== e.layout.source;
    l === "size"
      ? Ze((m) => {
          const g = a ? i.measuredBox[m] : i.layoutBox[m],
            y = Ve(g);
          (g.min = o[m].min), (g.max = g.min + y);
        })
      : um(l, i.layoutBox, o) &&
        Ze((m) => {
          const g = a ? i.measuredBox[m] : i.layoutBox[m],
            y = Ve(o[m]);
          g.max = g.min + y;
        });
    const u = Er();
    xr(u, o, i.layoutBox);
    const c = Er();
    a ? xr(c, e.applyTransform(s, !0), i.measuredBox) : xr(c, o, i.layoutBox);
    const d = !sm(u);
    let f = !1;
    if (!e.resumeFrom) {
      const m = e.getClosestProjectingParent();
      if (m && !m.resumeFrom) {
        const { snapshot: g, layout: y } = m;
        if (g && y) {
          const S = b();
          kr(S, i.layoutBox, g.layoutBox);
          const h = b();
          kr(h, o, y.layoutBox), lm(S, h) || (f = !0);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: o,
      snapshot: i,
      delta: c,
      layoutDelta: u,
      hasLayoutChanged: d,
      hasRelativeTargetChanged: f,
    });
  } else
    e.isLead() &&
      ((r = (n = e.options).onExitComplete) === null ||
        r === void 0 ||
        r.call(n));
  e.options.transition = void 0;
}
function lS(e) {
  e.isProjectionDirty ||
    (e.isProjectionDirty = !!(e.parent && e.parent.isProjectionDirty)),
    e.isTransformDirty ||
      (e.isTransformDirty = !!(e.parent && e.parent.isTransformDirty));
}
function aS(e) {
  e.clearSnapshot();
}
function Sf(e) {
  e.clearMeasurements();
}
function uS(e) {
  const { visualElement: t } = e.options;
  t != null &&
    t.getProps().onBeforeLayoutMeasure &&
    t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function xf(e) {
  e.finishAnimation(), (e.targetDelta = e.relativeTarget = e.target = void 0);
}
function cS(e) {
  e.resolveTargetDelta();
}
function fS(e) {
  e.calcProjection();
}
function dS(e) {
  e.resetRotation();
}
function pS(e) {
  e.removeLeadSnapshot();
}
function kf(e, t, n) {
  (e.translate = G(t.translate, 0, n)),
    (e.scale = G(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Ef(e, t, n, r) {
  (e.min = G(t.min, n.min, r)), (e.max = G(t.max, n.max, r));
}
function hS(e, t, n, r) {
  Ef(e.x, t.x, n.x, r), Ef(e.y, t.y, n.y, r);
}
function mS(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const vS = { duration: 0.45, ease: [0.4, 0, 0.1, 1] };
function gS(e, t) {
  let n = e.root;
  for (let o = e.path.length - 1; o >= 0; o--)
    if (e.path[o].instance) {
      n = e.path[o];
      break;
    }
  const i = (n && n !== e.root ? n.instance : document).querySelector(
    `[data-projection-id="${t}"]`
  );
  i && e.mount(i, !0);
}
function Cf(e) {
  (e.min = Math.round(e.min)), (e.max = Math.round(e.max));
}
function yS(e) {
  Cf(e.x), Cf(e.y);
}
function um(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !Fl(vf(t), vf(n), 0.2))
  );
}
const wS = am({
    attachResizeListener: (e, t) => Wo(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Ns = { current: void 0 },
  SS = am({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Ns.current) {
        const e = new wS(0, {});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (Ns.current = e);
      }
      return Ns.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  xS = { ...b1, ...gy, ...xw, ...Kw },
  cm = pg((e, t) => Qg(e, t, xS, Uw, SS));
class kS {
  constructor() {
    this.componentControls = new Set();
  }
  subscribe(t) {
    return (
      this.componentControls.add(t), () => this.componentControls.delete(t)
    );
  }
  start(t, n) {
    this.componentControls.forEach((r) => {
      r.start(t.nativeEvent || t, n);
    });
  }
}
const ES = () => new kS();
function fm() {
  return $o(ES);
}
function dm(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = dm(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function qe() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = dm(e)) && (r && (r += " "), (r += t));
  return r;
}
function CS({
  onDoubleClick: e,
  id: t,
  defaultPosition: n,
  isDraggable: r,
  title: i,
  width: o = 60,
  height: s = 60,
  icon: l,
}) {
  const [a, u] = x.useState(!1),
    [c, d] = x.useState(0),
    f = x.useRef(null),
    m = fm(),
    g = () => {
      c === 1 && (e == null || e());
      const S = setTimeout(() => {
        d(0);
      }, 300);
      return (
        d((h) => (h === 1 ? (u(!1), 0) : (u(!0), 1))), () => clearTimeout(S)
      );
    };
  return (
    Qp(f, () => {
      d(0), u(!1);
    }),
    L.jsx(L.Fragment, {
      children: L.jsxs(cm.div, {
        drag: r,
        initial: n,
        dragControls: m,
        dragMomentum: !1,
        ref: f,
        onClickCapture: g,
        className: qe(
          "flex h-fit w-fit flex-col items-center justify-center p-2",
          { "bg-stone-400": a }
        ),
        children: [
          L.jsx("div", {
            style: {
              width: o * 0.8,
              height: o * 0.8,
              backgroundImage: `url(${l})`,
            },
            className: qe("bg-contain bg-center bg-no-repeat"),
          }),
          L.jsx("strong", {
            style: { width: o * 1.4 },
            className: qe("break-words text-center text-sm text-white", {
              underline: a,
              "": !a,
            }),
            children: i,
          }),
        ],
      }),
    })
  );
}
function PS() {
  zo();
  const [e, t] = x.useState(!1);
  x.useState(!1);
  const n = x.useRef(null),
    r = x.useRef(null);
  return (
    Qp(n, () => {
      t(!1);
    }),
    L.jsxs("div", {
      className:
        "relative z-[9999] flex h-10 w-full items-center justify-between border-b-[4px] border-black bg-white px-4",
      ref: n,
      children: [
        L.jsx("button", {
          ref: r,
          onClick: () => {
            window.location.href = "https://www.indigomagazinetx.com/";
          },
          style: {
            backgroundImage: "url('./brand/indigo.png')",
            backgroundSize: "auto 80%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "invert(1)",
          },
          className: qe("flex h-9 w-9 items-center justify-center", {
            "bg-black": e,
          }),
        }),
        L.jsxs("div", {
          className:
            "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5",
          children: [
            L.jsx("div", {
              className: "retro-blink h-1.5 w-1.5 rounded-full bg-red-600",
            }),
            L.jsx("span", {
              className: "flicker text-[13px] tracking-widest text-black ",
              children: "RECORDING",
            }),
          ],
        }),
        L.jsx("div", {
          className: "flicker text-[13px] tracking-widest text-black",
          children: "SESSION: 668.48",
        }),
        L.jsx("style", {
          children: `
        @keyframes retro-blink {
          0%, 80%, 100% { opacity: 1; }
          40% { opacity: 0; }
        }

        .retro-blink {
          animation: retro-blink 0.9s steps(1, start) infinite;
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.3;
          }
        }

        .shadow{
        text-shadow: 0 0 2px #000;
        }

        .flicker {
          animation: flicker 4s infinite;
          text-shadow: 0 0 2px #000;
        }
      `,
        }),
      ],
    })
  );
}
const TS = ({ Node: e, appID: t }) =>
    L.jsx(x.Suspense, { children: L.jsx(e, { appId: t }) }),
  _S = x.memo(TS),
  pm = x.createContext({}),
  Sx = () => x.useContext(pm);
function VS({
  children: e,
  setIsResizable: t,
  isFullscreen: n,
  appId: r,
  initialSize: i,
  setInitialSize: o,
}) {
  return L.jsx(pm.Provider, {
    value: {
      setIsResizable: t,
      isFullscreen: n,
      appId: r,
      initialSize: i,
      setInitialSize: o,
    },
    children: e,
  });
}
function LS() {
  const [e, t] = x.useState(!1),
    [n, r] = x.useState({ width: 700, height: 600 });
  return {
    isResizable: e,
    setIsResizable: t,
    initialSize: n,
    setInitialSize: r,
  };
}
function RS({
  children: e,
  x: t,
  y: n,
  drag: r,
  setDrag: i,
  mouse: o,
  initialHeight: s,
  initialWidth: l,
  isFullscreen: a,
}) {
  const u = fm(),
    { width: c, height: d } = Kp(),
    f = x.useRef(!1);
  x.useEffect(() => {
    r && o && !a && ((f.current = !0), u.start(o));
  }, [r, o, a]);
  const m = () => {
      (f.current = !0), i(!0);
    },
    g = () => {
      (f.current = !1), i(!1);
    },
    y = (h) => {
      f.current && (h.preventDefault(), h.stopPropagation());
    },
    S = x.useMemo(
      () =>
        t !== void 0 && n !== void 0
          ? { x: t, y: n }
          : { x: (c - l) / 2, y: (d - s) / 2 },
      [t, n, c, d, l, s]
    );
  return L.jsx(cm.div, {
    initial: { opacity: 0, scale: 0.1, x: S.x, y: S.y },
    animate: {
      opacity: 1,
      scale: 1,
      x: a ? 0 : S.x,
      y: a ? 0 : S.y,
      width: a ? "100%" : "fit-content",
      height: a ? "100%" : "fit-content",
    },
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    drag: !a,
    dragControls: u,
    dragListener: !1,
    dragMomentum: !1,
    dragElastic: 0.1,
    onDragStart: m,
    onDragEnd: g,
    onClick: y,
    style: {
      position: "absolute",
      zIndex: 25,
      touchAction: "none",
      overflow: "visible",
    },
    whileTap: { cursor: "grabbing" },
    children: e,
  });
}
function AS({ Node: e, ...t }) {
  const [n, r] = x.useState(!1),
    [i, o] = x.useState(),
    [s, l] = x.useState(!1),
    [a, u] = x.useState(!0),
    { removeApp: c, setAppOnFocus: d } = zo(),
    {
      isResizable: f,
      setIsResizable: m,
      initialSize: g,
      setInitialSize: y,
    } = LS(),
    S = (v) => {
      o(v), r(!0);
    },
    h = () => {
      setTimeout(() => {
        c(t.id);
      }, 300);
    };
  function p() {
    l((v) => !v);
  }
  return (
    x.useEffect(() => {
      setTimeout(() => {
        u(!1);
      }, 500);
    }, []),
    L.jsx(RS, {
      drag: !s && n,
      mouse: i,
      setDrag: r,
      x: t.x,
      y: t.y,
      isFullscreen: s,
      initialHeight: g.height,
      initialWidth: g.width,
      children: L.jsxs("div", {
        style: {
          width: s ? "100vw" : g.width,
          height: s ? "calc(100vh - 40px)" : g.height,
        },
        className: qe(
          " flex flex-col items-center  border-[5px] border-black ring-2 ring-white"
        ),
        onMouseDown: () => {
          d(t.id);
        },
        children: [
          L.jsxs("div", {
            className:
              "z-30 mt-0 flex h-11 w-full select-none items-center border-2 border-black bg-black text-white",
            onPointerDown: S,
            children: [
              L.jsx("strong", {
                className: qe("ml-auto block", { "opacity-0": a === !0 }),
                children: t.title,
              }),
              L.jsxs("div", {
                className: "ml-auto flex w-fit gap-2 ",
                children: [
                  f &&
                    L.jsx("button", {
                      onClick: p,
                      className:
                        "flex h-6 w-6 items-center justify-center bg-white text-base font-bold leading-none text-black",
                      children: "=",
                    }),
                  L.jsx("button", {
                    className:
                      "flex h-6 w-6 items-center justify-center bg-white text-base font-bold leading-none text-black",
                    onClick: h,
                    children: "x",
                  }),
                ],
              }),
            ],
          }),
          L.jsx("div", {
            className: qe(
              "flex h-full w-full flex-col items-center justify-center overflow-hidden  bg-white"
            ),
            children: L.jsx(VS, {
              appId: t.id,
              setIsResizable: m,
              isFullscreen: s,
              initialSize: g,
              setInitialSize: y,
              children: L.jsx("div", {
                className: qe(
                  "flex h-full w-full",
                  a ? "opacity-0" : "opacity-100"
                ),
                children: L.jsx(_S, { Node: e, appID: t.id }),
              }),
            }),
          }),
        ],
      }),
    })
  );
}
var DS = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Pf = (e) => {
    let t;
    const n = new Set(),
      r = (a, u) => {
        const c = typeof a == "function" ? a(t) : a;
        if (!Object.is(c, t)) {
          const d = t;
          (t =
            u ?? (typeof c != "object" || c === null)
              ? c
              : Object.assign({}, t, c)),
            n.forEach((f) => f(t, d));
        }
      },
      i = () => t,
      l = {
        setState: r,
        getState: i,
        subscribe: (a) => (n.add(a), () => n.delete(a)),
        destroy: () => {
          (DS ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
            ),
            n.clear();
        },
      };
    return (t = e(r, i, l)), l;
  },
  MS = (e) => (e ? Pf(e) : Pf);
var hm = { exports: {} },
  mm = {},
  vm = { exports: {} },
  gm = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hn = x;
function NS(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var IS = typeof Object.is == "function" ? Object.is : NS,
  OS = Hn.useState,
  zS = Hn.useEffect,
  jS = Hn.useLayoutEffect,
  FS = Hn.useDebugValue;
function BS(e, t) {
  var n = t(),
    r = OS({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    o = r[1];
  return (
    jS(
      function () {
        (i.value = n), (i.getSnapshot = t), Is(i) && o({ inst: i });
      },
      [e, n, t]
    ),
    zS(
      function () {
        return (
          Is(i) && o({ inst: i }),
          e(function () {
            Is(i) && o({ inst: i });
          })
        );
      },
      [e]
    ),
    FS(n),
    n
  );
}
function Is(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !IS(e, n);
  } catch {
    return !0;
  }
}
function US(e, t) {
  return t();
}
var $S =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? US
    : BS;
gm.useSyncExternalStore =
  Hn.useSyncExternalStore !== void 0 ? Hn.useSyncExternalStore : $S;
vm.exports = gm;
var WS = vm.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Go = x,
  HS = WS;
function QS(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var KS = typeof Object.is == "function" ? Object.is : QS,
  GS = HS.useSyncExternalStore,
  YS = Go.useRef,
  XS = Go.useEffect,
  ZS = Go.useMemo,
  JS = Go.useDebugValue;
mm.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var o = YS(null);
  if (o.current === null) {
    var s = { hasValue: !1, value: null };
    o.current = s;
  } else s = o.current;
  o = ZS(
    function () {
      function a(m) {
        if (!u) {
          if (((u = !0), (c = m), (m = r(m)), i !== void 0 && s.hasValue)) {
            var g = s.value;
            if (i(g, m)) return (d = g);
          }
          return (d = m);
        }
        if (((g = d), KS(c, m))) return g;
        var y = r(m);
        return i !== void 0 && i(g, y) ? g : ((c = m), (d = y));
      }
      var u = !1,
        c,
        d,
        f = n === void 0 ? null : n;
      return [
        function () {
          return a(t());
        },
        f === null
          ? void 0
          : function () {
              return a(f());
            },
      ];
    },
    [t, n, r, i]
  );
  var l = GS(e, o[0], o[1]);
  return (
    XS(
      function () {
        (s.hasValue = !0), (s.value = l);
      },
      [l]
    ),
    JS(l),
    l
  );
};
hm.exports = mm;
var qS = hm.exports;
const bS = Vf(qS);
var ym = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const { useDebugValue: ex } = Gr,
  { useSyncExternalStoreWithSelector: tx } = bS;
let Tf = !1;
function nx(e, t = e.getState, n) {
  (ym ? "production" : void 0) !== "production" &&
    n &&
    !Tf &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    ),
    (Tf = !0));
  const r = tx(e.subscribe, e.getState, e.getServerState || e.getState, t, n);
  return ex(r), r;
}
const _f = (e) => {
    (ym ? "production" : void 0) !== "production" &&
      typeof e != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
      );
    const t = typeof e == "function" ? MS(e) : e,
      n = (r, i) => nx(t, r, i);
    return Object.assign(n, t), n;
  },
  rx = (e) => (e ? _f(e) : _f);
var ix = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function ox(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (i) => {
      var o;
      const s = (a) =>
          a === null ? null : JSON.parse(a, t == null ? void 0 : t.reviver),
        l = (o = n.getItem(i)) != null ? o : null;
      return l instanceof Promise ? l.then(s) : s(l);
    },
    setItem: (i, o) =>
      n.setItem(i, JSON.stringify(o, t == null ? void 0 : t.replacer)),
    removeItem: (i) => n.removeItem(i),
  };
}
const Qr = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return Qr(r)(n);
            },
            catch(r) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(r) {
          return this;
        },
        catch(r) {
          return Qr(r)(n);
        },
      };
    }
  },
  sx = (e, t) => (n, r, i) => {
    let o = {
        getStorage: () => localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        partialize: (S) => S,
        version: 0,
        merge: (S, h) => ({ ...h, ...S }),
        ...t,
      },
      s = !1;
    const l = new Set(),
      a = new Set();
    let u;
    try {
      u = o.getStorage();
    } catch {}
    if (!u)
      return e(
        (...S) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
          ),
            n(...S);
        },
        r,
        i
      );
    const c = Qr(o.serialize),
      d = () => {
        const S = o.partialize({ ...r() });
        let h;
        const p = c({ state: S, version: o.version })
          .then((v) => u.setItem(o.name, v))
          .catch((v) => {
            h = v;
          });
        if (h) throw h;
        return p;
      },
      f = i.setState;
    i.setState = (S, h) => {
      f(S, h), d();
    };
    const m = e(
      (...S) => {
        n(...S), d();
      },
      r,
      i
    );
    let g;
    const y = () => {
      var S;
      if (!u) return;
      (s = !1), l.forEach((p) => p(r()));
      const h =
        ((S = o.onRehydrateStorage) == null ? void 0 : S.call(o, r())) ||
        void 0;
      return Qr(u.getItem.bind(u))(o.name)
        .then((p) => {
          if (p) return o.deserialize(p);
        })
        .then((p) => {
          if (p)
            if (typeof p.version == "number" && p.version !== o.version) {
              if (o.migrate) return o.migrate(p.state, p.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return p.state;
        })
        .then((p) => {
          var v;
          return (g = o.merge(p, (v = r()) != null ? v : m)), n(g, !0), d();
        })
        .then(() => {
          h == null || h(g, void 0), (s = !0), a.forEach((p) => p(g));
        })
        .catch((p) => {
          h == null || h(void 0, p);
        });
    };
    return (
      (i.persist = {
        setOptions: (S) => {
          (o = { ...o, ...S }), S.getStorage && (u = S.getStorage());
        },
        clearStorage: () => {
          u == null || u.removeItem(o.name);
        },
        getOptions: () => o,
        rehydrate: () => y(),
        hasHydrated: () => s,
        onHydrate: (S) => (
          l.add(S),
          () => {
            l.delete(S);
          }
        ),
        onFinishHydration: (S) => (
          a.add(S),
          () => {
            a.delete(S);
          }
        ),
      }),
      y(),
      g || m
    );
  },
  lx = (e, t) => (n, r, i) => {
    let o = {
        storage: ox(() => localStorage),
        partialize: (y) => y,
        version: 0,
        merge: (y, S) => ({ ...S, ...y }),
        ...t,
      },
      s = !1;
    const l = new Set(),
      a = new Set();
    let u = o.storage;
    if (!u)
      return e(
        (...y) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
          ),
            n(...y);
        },
        r,
        i
      );
    const c = () => {
        const y = o.partialize({ ...r() });
        return u.setItem(o.name, { state: y, version: o.version });
      },
      d = i.setState;
    i.setState = (y, S) => {
      d(y, S), c();
    };
    const f = e(
      (...y) => {
        n(...y), c();
      },
      r,
      i
    );
    let m;
    const g = () => {
      var y, S;
      if (!u) return;
      (s = !1),
        l.forEach((p) => {
          var v;
          return p((v = r()) != null ? v : f);
        });
      const h =
        ((S = o.onRehydrateStorage) == null
          ? void 0
          : S.call(o, (y = r()) != null ? y : f)) || void 0;
      return Qr(u.getItem.bind(u))(o.name)
        .then((p) => {
          if (p)
            if (typeof p.version == "number" && p.version !== o.version) {
              if (o.migrate) return o.migrate(p.state, p.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return p.state;
        })
        .then((p) => {
          var v;
          return (m = o.merge(p, (v = r()) != null ? v : f)), n(m, !0), c();
        })
        .then(() => {
          h == null || h(m, void 0),
            (m = r()),
            (s = !0),
            a.forEach((p) => p(m));
        })
        .catch((p) => {
          h == null || h(void 0, p);
        });
    };
    return (
      (i.persist = {
        setOptions: (y) => {
          (o = { ...o, ...y }), y.storage && (u = y.storage);
        },
        clearStorage: () => {
          u == null || u.removeItem(o.name);
        },
        getOptions: () => o,
        rehydrate: () => g(),
        hasHydrated: () => s,
        onHydrate: (y) => (
          l.add(y),
          () => {
            l.delete(y);
          }
        ),
        onFinishHydration: (y) => (
          a.add(y),
          () => {
            a.delete(y);
          }
        ),
      }),
      o.skipHydration || g(),
      m || f
    );
  },
  ax = (e, t) =>
    "getStorage" in t || "serialize" in t || "deserialize" in t
      ? ((ix ? "production" : void 0) !== "production" &&
          console.warn(
            "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
          ),
        sx(e, t))
      : lx(e, t),
  ux = ax,
  cx = rx(
    ux(
      (e, t) => ({
        apps: [],
        updatePos(n, r) {
          e((i) => {
            const o = i.apps.slice();
            let s = o.find((l) => l.id === n);
            return (
              s || ((s = { id: n, x: 0, y: 0 }), o.push(s)),
              (s.x = r.x),
              (s.y = r.y),
              { apps: o }
            );
          });
        },
      }),
      { name: "icons-store" }
    )
  ),
  fx = [
    {
      title: "Clock",
      id: "clock",
      icon: "icons/applications/clock.webp",
      x: 10,
      y: 10,
    },
    {
      title: "Calculator",
      id: "calculator",
      icon: "./icons/applications/calculator.webp",
      x: 10,
      y: 10,
    },
    {
      title: "README.txt",
      id: "Notepad",
      icon: "./icons/applications/notepad.webp",
      x: 10,
      y: 10,
    },
    {
      title: "game",
      id: "game",
      icon: "./icons/applications/dinosaur.webp",
      x: 10,
      y: 10,
    },
    {
      title: "album",
      id: "album",
      icon: "./icons/applications/film.png",
      x: 10,
      y: 10,
    },
  ],
  dx = () => {
    cx((o) => o.apps);
    const { width: e, height: t } = Kp(),
      { apps: n, addApp: r } = zo(),
      i = x.useMemo(
        () =>
          fx.map((o) => {
            let s = o.x,
              l = o.y;
            return L.jsx(
              CS,
              {
                id: o.id,
                isDraggable: !0,
                onDoubleClick: () => r({ name: o.id }),
                defaultPosition: { x: s, y: l },
                icon: o.icon,
                title: o.title,
              },
              o.id
            );
          }),
        [r]
      );
    return (
      x.useEffect(() => {
        r({ name: "Notepad", x: e / 4, y: t / 4 });
      }, []),
      L.jsx(L.Fragment, {
        children: L.jsxs("main", {
          className:
            "fixed flex h-screen w-screen flex-col overflow-hidden bg-zinc-900 bg-duck bg-[length:200px_200px] bg-center bg-no-repeat",
          children: [
            L.jsx(PS, {}),
            L.jsxs("div", {
              className:
                "relative flex-1 bg-dot-pattern bg-[length:60px] bg-repeat",
              children: [
                n.map((o) => L.jsx(AS, { ...o }, o.id)),
                i,
                L.jsx("div", {
                  className:
                    "absolute bottom-4 left-1/2 -translate-x-1/2 select-none text-sm font-semibold tracking-widest text-white opacity-80",
                  children: "IndigoOS Ver. ALPHA 2025.7",
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  px = ["|", "/", "—", "\\"];
function hx() {
  const [e, t] = x.useState(0),
    { clearApps: n } = zo();
  return (
    x.useEffect(() => {
      n();
      const r = setInterval(() => {
        t((i) => (i === 3 ? 0 : i + 1));
      }, 300);
      return () => {
        clearInterval(r);
      };
    }, []),
    L.jsxs("div", {
      className: qe(
        "flex h-screen w-screen flex-col items-center justify-evenly bg-zinc-950 text-center text-white"
      ),
      children: [
        L.jsx("div", {
          children: L.jsx("img", { src: "./brand/indigo.png", width: 300 }),
        }),
        L.jsxs("p", {
          className: "text-4xl",
          children: ["IndigoOS ", L.jsx("br", {}), "SERIAL Release"],
        }),
        L.jsx("span", { className: "text-3xl", children: px[e] }),
        L.jsx("div", {
          children: L.jsxs("p", {
            className: "text-3xl",
            children: [
              "SERIAL (c) Indigo Corporation, 2018.",
              L.jsx("br", {}),
              "All Rights Reserved. IndigoOS is a registered trademark of Indigo Corp.",
            ],
          }),
        }),
      ],
    })
  );
}
function mx() {
  const [e, t] = x.useState(!0);
  return (
    x.useEffect(() => {
      setTimeout(() => {
        t(!1);
      }, 2500);
    }, []),
    L.jsxs(L.Fragment, {
      children: [
        e && L.jsx(hx, {}),
        L.jsx("div", {
          className: qe({ "absolute opacity-0": e }),
          children: L.jsx(dx, {}),
        }),
      ],
    })
  );
}
const wm = x.createContext({}),
  xx = () => x.useContext(wm),
  vx = ({ children: e }) => {
    const [t, n] = x.useState(),
      [r, i] = x.useState("/home/quackos"),
      [o, s] = x.useState(!1);
    function l(c) {
      return new Promise((d, f) => {
        let m = "";
        c.startsWith("/") ? (m = c) : (m = `${r}/${c}`),
          t == null ||
            t.spawn("jsh", ["-c", `cd ${m}`]).then((g) => {
              g.exit.then((y) => {
                y !== 0
                  ? f(new Error(`cd: ${c}: No such file or directory`))
                  : (i(m), d());
              });
            });
      });
    }
    async function a(c, d) {
      if (!t || o) return u(), d("Loading web container...");
      const f = await t.spawn("jsh", ["-c", `cd ${r}; ${c.join(" ")}`]);
      if ((await f.exit) !== 0)
        return f.output.pipeTo(
          new WritableStream({
            write(g) {
              d("Error: " + g), f.kill();
            },
          })
        );
      f.output.pipeTo(
        new WritableStream({
          write(g) {
            d(g), f.kill();
          },
        })
      );
    }
    async function u() {
      if (t || o) {
        console.log("Web container already loaded");
        return;
      }
      s(!0), console.log("Loading web container...");
      const d = await (
        await Ye(() => import("./index-Bl459byu.js"), __vite__mapDeps([])).then(
          (f) => f.WebContainer
        )
      ).boot({ workdirName: "quackos" });
      n(d), s(!1);
    }
    return (
      x.useEffect(
        () => () => {
          t == null || t.teardown();
        },
        []
      ),
      L.jsx(wm.Provider, {
        value: { exec: a, webContainer: t, cd: l },
        children: e,
      })
    );
  },
  gx = () => L.jsx(X0, { children: L.jsx(vx, { children: L.jsx(mx, {}) }) });
Os.createRoot(document.getElementById("root")).render(
  L.jsx(Gr.StrictMode, { children: L.jsx(gx, {}) })
);
export {
  Gr as R,
  Ye as _,
  rx as a,
  ox as b,
  qe as c,
  Vf as d,
  zo as e,
  xx as f,
  yx as g,
  L as j,
  ux as p,
  x as r,
  Sx as u,
};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = [
      "assets/PyIDE-DP_Z9GiL.js",
      "assets/usePython-WVKzN_EL.js",
      "assets/index-BJb8F9Il.js",
      "assets/index-uR75-1xa.css",
    ];
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
