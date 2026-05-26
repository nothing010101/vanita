function e(e) {
    return window.__ENV?.[e] || {
        BASE_URL: `/`,
        DEV: !1,
        MODE: `production`,
        PROD: !0,
        SSR: !1
    }[e] || void 0
}
var t = {
    VITE_API_URL: e(`VITE_API_URL`),
    VITE_HOUSTON_URL: e(`VITE_HOUSTON_URL`),
    VITE_PLAUSIBLE_DOMAIN: e(`VITE_PLAUSIBLE_DOMAIN`),
    VITE_WALLET_CONNECT_PROJECT_ID: e(`VITE_WALLET_CONNECT_PROJECT_ID`),
    VITE_FARO_ENABLED: e(`VITE_FARO_ENABLED`),
    VITE_FARO_COLLECTOR_URL: e(`VITE_FARO_COLLECTOR_URL`),
    VITE_FARO_NAMESPACE: e(`VITE_FARO_NAMESPACE`),
    VITE_APP_VERSION: e(`VITE_APP_VERSION`)
}
  , n = t.VITE_API_URL || window.location.origin
  , r = 15e3;
async function i(e, t, i) {
    let a = new URL(e,n);
    if (t)
        for (let[e,n] of Object.entries(t))
            n !== void 0 && a.searchParams.set(e, String(n));
    let o = new AbortController
      , s = setTimeout( () => o.abort(), r)
      , c = i ? AbortSignal.any([i, o.signal]) : o.signal;
    try {
        let e = await fetch(a.toString(), {
            signal: c
        });
        if (!e.ok)
            throw Error(`API error: ${e.status} ${e.statusText}`);
        return e.json()
    } finally {
        clearTimeout(s)
    }
}
function a(e) {
    return i(`/api/v1/coins`, e)
}
function o(e) {
    return i(`/api/v1/coins/${e}`)
}
function s() {
    return i(`/api/v1/coins/trending`)
}
function c(e=20) {
    return i(`/api/v1/coins/new`, {
        limit: e
    })
}
function l(e, t=20, n=1, r, a) {
    return i(`/api/v1/coins/${e}/activity`, {
        pageSize: t,
        page: n,
        after: r?.after,
        before: r?.before,
        type: a === `all` ? void 0 : a
    })
}
function u(e, t=10) {
    return i(`/api/v1/coins/${e}/holders`, {
        limit: t
    })
}
function d(e, t, n) {
    return i(`/api/v1/coins/${e}/candles`, {
        interval: t,
        ...n
    })
}
function f(e) {
    return i(`/api/v1/agents`, e)
}
function p(e) {
    return i(`/api/v1/agents/${e}`)
}
function m(e) {
    return i(`/api/v1/activity`, e)
}
function h(e=20) {
    return i(`/api/v1/leaderboard`, {
        limit: e
    })
}
function g() {
    return i(`/api/v1/stats`)
}
function _() {
    return i(`/api/v1/tia-price`)
}
function v(e) {
    let t = new AbortController
      , i = setTimeout( () => t.abort(), r)
      , a = e ? AbortSignal.any([e, t.signal]) : t.signal;
    return fetch(`${n}/SKILL.md`, {
        signal: a
    }).then(e => {
        if (!e.ok)
            throw Error(`API error: ${e.status}`);
        return e.text()
    }
    ).finally( () => clearTimeout(i))
}
export {l as a, a as c, v as d, g as f, t as h, o as i, h as l, s as m, p as n, d as o, _ as p, f as r, u as s, m as t, c as u};
