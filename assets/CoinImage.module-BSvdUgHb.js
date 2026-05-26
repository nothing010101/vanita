import {s as e} from "./chunk-Bj-mKKzh.js";
import {n as t, t as n} from "./jsx-runtime-CHxL7yWb.js";
import {p as r} from "./api-DoLfDDRQ.js";
var i = e(t(), 1)
  , a = n()
  , o = (0,
i.createContext)({
    mode: `tia`,
    toggle: () => {}
    ,
    tiaUsdPrice: null,
    convertTia: () => null
})
  , s = `botfun:priceMode`
  , c = 6e4;
function l() {
    try {
        let e = localStorage.getItem(s);
        if (e === `usd` || e === `tia`)
            return e
    } catch {}
    return `tia`
}
function u({children: e}) {
    let[t,n] = (0,
    i.useState)(l)
      , [u,d] = (0,
    i.useState)(null)
      , f = (0,
    i.useCallback)( () => {
        n(e => {
            let t = e === `tia` ? `usd` : `tia`;
            try {
                localStorage.setItem(s, t)
            } catch {}
            return t
        }
        )
    }
    , []);
    (0,
    i.useEffect)( () => {
        let e = !1;
        async function t() {
            try {
                let t = await r();
                !e && t.price > 0 && d(t.price)
            } catch {}
        }
        t();
        let n = window.setInterval(t, c);
        return () => {
            e = !0,
            clearInterval(n)
        }
    }
    , []);
    let p = (0,
    i.useCallback)(e => u == null ? null : e * u, [u])
      , m = (0,
    i.useMemo)( () => ({
        mode: t,
        toggle: f,
        tiaUsdPrice: u,
        convertTia: p
    }), [t, f, u, p]);
    return (0,
    a.jsx)(o.Provider, {
        value: m,
        children: e
    })
}
function d() {
    return (0,
    i.useContext)(o)
}
function f(e) {
    return e.length <= 10 ? e : `${e.slice(0, 6)}...${e.slice(-4)}`
}
function p(e, t=2) {
    let n = typeof e == `string` ? parseFloat(e) : e;
    return isNaN(n) ? `0` : Math.abs(n) >= 1e9 ? (n / 1e9).toFixed(t) + `B` : Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(t) + `M` : Math.abs(n) >= 1e3 ? (n / 1e3).toFixed(t) + `K` : n.toFixed(t)
}
function m(e) {
    let t = typeof e == `string` ? parseFloat(e) : e;
    return isNaN(t) || t === 0 ? `0 TIA` : Math.abs(t) < .01 ? t.toPrecision(3) + ` TIA` : p(t) + ` TIA`
}
function h(e) {
    let t = typeof e == `string` ? parseFloat(e) : e;
    if (isNaN(t) || t === 0)
        return `0`;
    if (t < 1e-6) {
        let e = t.toFixed(20).match(/^0\.0*/)
          , n = e ? e[0].length - 2 : 0;
        return `0.0{${n}}${t.toFixed(n + 3).slice(n + 2)}`
    }
    return t < .01 ? t.toPrecision(3) : t < 1 ? t.toFixed(6) : p(t)
}
function g(e) {
    let t = typeof e == `string` ? parseFloat(e) : e;
    if (isNaN(t) || t === 0)
        return `$0.00`;
    if (Math.abs(t) >= 1e9)
        return `$` + (t / 1e9).toFixed(2) + `B`;
    if (Math.abs(t) >= 1e6)
        return `$` + (t / 1e6).toFixed(2) + `M`;
    if (Math.abs(t) >= 1e3)
        return `$` + (t / 1e3).toFixed(2) + `K`;
    if (Math.abs(t) >= 1)
        return `$` + t.toFixed(2);
    if (Math.abs(t) >= .01)
        return `$` + t.toFixed(4);
    if (Math.abs(t) >= 1e-6)
        return `$` + t.toPrecision(3);
    let n = t.toFixed(20).match(/^0\.0*/)
      , r = n ? n[0].length - 2 : 0;
    return `$0.0{${r}}${t.toFixed(r + 3).slice(r + 2)}`
}
function _(e) {
    let t = typeof e == `string` ? parseFloat(e) : e;
    if (isNaN(t) || t === 0)
        return `$0`;
    if (Math.abs(t) >= 1)
        return `$` + t.toFixed(2);
    if (Math.abs(t) >= .01)
        return `$` + t.toFixed(4);
    if (Math.abs(t) >= 1e-6)
        return `$` + t.toPrecision(3);
    let n = t.toFixed(20).match(/^0\.0*/)
      , r = n ? n[0].length - 2 : 0;
    return `$0.0{${r}}${t.toFixed(r + 3).slice(r + 2)}`
}
function v(e, t) {
    return e ? `${e}.bf` : f(t)
}
function y(e) {
    let t = Math.floor(e / 1e3);
    if (t < 60)
        return `${t}s ago`;
    let n = Math.floor(t / 60);
    if (n < 60)
        return `${n}m ago`;
    let r = Math.floor(n / 60);
    return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`
}
var b = new Set
  , x = Date.now()
  , S = null;
function C() {
    S ||= setInterval( () => {
        x = Date.now();
        for (let e of b)
            e()
    }
    , 1e3)
}
function w() {
    S &&= (clearInterval(S),
    null)
}
function T(e) {
    return b.add(e),
    b.size === 1 && C(),
    () => {
        b.delete(e),
        b.size === 0 && w()
    }
}
function E(e) {
    let t = new Date(e).getTime();
    return (0,
    i.useSyncExternalStore)(T, () => y(x - t))
}
function D() {
    let {mode: e, tiaUsdPrice: t, convertTia: n} = d()
      , r = e === `usd` && t != null
      , a = (0,
    i.useCallback)(e => {
        if (!r)
            return m(e);
        let t = n(typeof e == `string` ? parseFloat(e) : e);
        return t == null ? m(e) : g(t)
    }
    , [r, n]);
    return {
        fmtTia: a,
        fmtPrice: (0,
        i.useCallback)(e => {
            if (!r)
                return h(e) + ` TIA`;
            let t = n(typeof e == `string` ? parseFloat(e) : e);
            return t == null ? h(e) + ` TIA` : _(t)
        }
        , [r, n]),
        fmtPnL: (0,
        i.useCallback)(e => {
            let t = typeof e == `string` ? parseFloat(e) : e;
            return isNaN(t) ? r ? `$0.00` : `0 TIA` : (t >= 0 ? `+` : ``) + a(t)
        }
        , [r, a]),
        isUsd: r
    }
}
var O = {
    fallback: `_fallback_o1esw_1`,
    img: `_img_o1esw_12`
};
export {p as a, v as i, D as n, u as o, E as r, d as s, O as t};
