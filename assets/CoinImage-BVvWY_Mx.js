import {s as e} from "./chunk-Bj-mKKzh.js";
import {n as t, t as n} from "./jsx-runtime-CHxL7yWb.js";
import {h as r} from "./api-DoLfDDRQ.js";
import {t as i} from "./CoinImage.module-BSvdUgHb.js";
var a = e(t(), 1)
  , o = n()
  , s = (0,
a.createContext)({
    connected: !1,
    subscribe: () => () => {}
    ,
    onReconnect: () => () => {}
})
  , c = `${r.VITE_API_URL || window.location.origin}/api/v1/events`
  , l = null
  , u = 0
  , d = new Map
  , f = new Set
  , p = !1;
function m(e) {
    try {
        let t = JSON.parse(e.data)
          , n = t._channel ?? t.channel;
        if (n) {
            let e = d.get(n);
            if (e)
                for (let n of e)
                    n(t)
        }
        if (n !== `global`) {
            let e = d.get(`global`);
            if (e)
                for (let n of e)
                    n(t)
        }
    } catch {}
}
function h(e) {
    if (l)
        return;
    let t = new EventSource(c);
    l = t,
    t.addEventListener(`connected`, () => {
        if (e(!0),
        p)
            for (let e of f)
                e();
        p = !0
    }
    ),
    t.addEventListener(`message`, m),
    t.onopen = () => {
        e(!0)
    }
    ,
    t.onerror = () => {
        e(!1)
    }
}
function g() {
    l &&= (l.close(),
    null)
}
function _({children: e}) {
    let[t,n] = (0,
    a.useState)(!1);
    (0,
    a.useEffect)( () => (u++,
    h(n),
    () => {
        u--,
        u <= 0 && (g(),
        u = 0)
    }
    ), []);
    let r = (0,
    a.useCallback)( (e, t) => (d.has(e) || d.set(e, new Set),
    d.get(e).add(t),
    () => {
        let n = d.get(e);
        n && (n.delete(t),
        n.size === 0 && d.delete(e))
    }
    ), [])
      , i = (0,
    a.useCallback)(e => (f.add(e),
    () => {
        f.delete(e)
    }
    ), []);
    return (0,
    o.jsx)(s.Provider, {
        value: {
            connected: t,
            subscribe: r,
            onReconnect: i
        },
        children: e
    })
}
function v() {
    return (0,
    a.useContext)(s)
}
var y = (0,
a.memo)(function({address: e, name: t, size: n=40, className: r}) {
    let s = (0,
    a.useMemo)( () => ({
        width: n,
        height: n,
        fontSize: n * .4
    }), [n])
      , [c,l] = (0,
    a.useState)(!1);
    return c || !e ? (0,
    o.jsx)(`div`, {
        className: `${i.fallback} ${r ?? ``}`,
        style: s,
        role: `img`,
        "aria-label": t,
        children: t.charAt(0).toUpperCase()
    }) : (0,
    o.jsx)(`img`, {
        src: `/api/v1/coins/${e}/image.svg`,
        alt: t,
        width: n,
        height: n,
        className: `${i.img} ${r ?? ``}`,
        onError: () => l(!0)
    })
});
export {_ as n, v as r, y as t};
