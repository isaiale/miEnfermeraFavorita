define(["exports"],(function(t){"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.0.0"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;const c=()=>(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new i(t,e,n);else if("function"==typeof t)a=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return c().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.precache),w=t=>t||l(u.runtime);function d(t){t.then((()=>{}))}const p=new Set;function y(){return y=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},y.apply(null,arguments)}const m=(t,e)=>e.some((e=>t instanceof e));let g,R;const v=new WeakMap,b=new WeakMap,q=new WeakMap,D=new WeakMap,U=new WeakMap;let x={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return b.get(t);if("objectStoreNames"===e)return t.objectStoreNames||q.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return E(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function I(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(R||(R=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(C(this),e),E(v.get(this))}:function(...e){return E(t.apply(C(this),e))}:function(e,...s){const n=t.call(C(this),e,...s);return q.set(n,e.sort?e.sort():[e]),E(n)}}function L(t){return"function"==typeof t?I(t):(t instanceof IDBTransaction&&function(t){if(b.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));b.set(t,e)}(t),m(t,g||(g=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,x):t)}function E(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(E(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&v.set(e,t)})).catch((()=>{})),U.set(e,t),e}(t);if(D.has(t))return D.get(t);const e=L(t);return e!==t&&(D.set(t,e),U.set(e,t)),e}const C=t=>U.get(t);const N=["get","getKey","getAll","getAllKeys","count"],O=["put","add","delete","clear"],k=new Map;function B(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(k.get(e))return k.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=O.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!N.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return k.set(e,i),i}x=(t=>y({},t,{get:(e,s,n)=>B(e,s)||t.get(e,s,n),has:(e,s)=>!!B(e,s)||t.has(e,s)}))(x);try{self["workbox:expiration:7.0.0"]&&_()}catch(t){}const T="cache-entries",M=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class P{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(T,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),E(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=M(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(T,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(T,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(T).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&i>=e?r.push(n.value):i++),n=await n.continue()}const a=[];for(const t of r)await s.delete(T,t.id),a.push(t.url);return a}m(t){return this.u+"|"+M(t)}async getDb(){return this.h||(this.h=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=E(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(E(a.result),t.oldVersion,t.newVersion,E(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(t=>r(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class W{constructor(t,e={}){this.R=!1,this.v=!1,this.q=e.maxEntries,this.D=e.maxAgeSeconds,this.U=e.matchOptions,this.u=t,this._=new P(t)}async expireEntries(){if(this.R)return void(this.v=!0);this.R=!0;const t=this.D?Date.now()-1e3*this.D:0,e=await this._.expireEntries(t,this.q),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this.U);this.R=!1,this.v&&(this.v=!1,d(this.expireEntries()))}async updateTimestamp(t){await this._.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.D){const e=await this._.getTimestamp(t),s=Date.now()-1e3*this.D;return void 0===e||e<s}return!1}async delete(){this.v=!1,await this._.expireEntries(1/0)}}try{self["workbox:strategies:7.0.0"]&&_()}catch(t){}const j={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};function S(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class K{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}function A(t){return"string"==typeof t?new Request(t):t}class F{constructor(t,e){this.I={},Object.assign(this,e),this.event=e.event,this.L=t,this.C=new K,this.N=[],this.O=[...t.plugins],this.k=new Map;for(const t of this.O)this.k.set(t,{});this.event.waitUntil(this.C.promise)}async fetch(t){const{event:e}=this;let n=A(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.L.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=A(t);let s;const{cacheName:n,matchOptions:r}=this.L,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=A(t);var r;await(r=0,new Promise((t=>setTimeout(t,r))));const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(a=i.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const o=await this.B(e);if(!o)return!1;const{cacheName:c,matchOptions:h}=this.L,u=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),f=l?await async function(t,e,s,n){const r=S(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===S(e.url,s))return t.match(e,n)}(u,i.clone(),["__WB_REVISION__"],h):null;try{await u.put(i,l?o.clone():o)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of p)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:f,newResponse:o.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.I[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=A(await t({mode:e,request:n,event:this.event,params:this.params}));this.I[s]=n}return this.I[s]}hasCallback(t){for(const e of this.L.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.L.plugins)if("function"==typeof e[t]){const s=this.k.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.N.push(t),t}async doneWaiting(){let t;for(;t=this.N.shift();)await t}destroy(){this.C.resolve(null)}async B(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class H{constructor(t={}){this.cacheName=w(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new F(this,{event:e,request:s,params:n}),i=this.T(r,s,e);return[i,this.M(i,r,s,e)]}async T(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.P(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async M(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}function $(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:7.0.0"]&&_()}catch(t){}function G(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",e),{cacheKey:r.href,url:i.href}}class V{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class J{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.W.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.W=t}}let Q,z;async function X(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=e?e(i):i,o=function(){if(void 0===Q){const t=new Response("");if("body"in t)try{new Response(t.body),Q=!0}catch(t){Q=!1}Q=!1}return Q}()?r.body:await r.blob();return new Response(o,a)}class Y extends H{constructor(t={}){t.cacheName=f(t.cacheName),super(t),this.j=!1!==t.fallbackToNetwork,this.plugins.push(Y.copyRedirectedCacheableResponsesPlugin)}async P(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.S(t,e):await this.K(t,e))}async K(t,e){let n;const r=e.params||{};if(!this.j)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=r.integrity,i=t.integrity,a=!i||i===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?i||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.A(),await e.cachePut(t,n.clone()))}return n}async S(t,e){this.A();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}A(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==Y.copyRedirectedCacheableResponsesPlugin&&(n===Y.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(Y.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}Y.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},Y.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await X(t):t};class Z{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.F=new Map,this.H=new Map,this.$=new Map,this.L=new Y({cacheName:f(t),plugins:[...e,new J({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.L}precache(t){this.addToCacheList(t),this.G||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.G=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:r}=G(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.F.has(r)&&this.F.get(r)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.F.get(r),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.$.has(t)&&this.$.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:r});this.$.set(t,n.integrity)}if(this.F.set(r,t),this.H.set(r,i),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return $(t,(async()=>{const e=new V;this.strategy.plugins.push(e);for(const[e,s]of this.F){const n=this.$.get(s),r=this.H.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return $(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.F.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.F}getCachedURLs(){return[...this.F.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.F.get(e.href)}getIntegrityForCacheKey(t){return this.$.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const tt=()=>(z||(z=new Z),z);class et extends r{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}t.CacheFirst=class extends H{async P(t,e){let n,r=await e.cacheMatch(t);if(!r)try{r=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!r)throw new s("no-response",{url:t.url,error:n});return r}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const r=this.V(n),i=this.J(s);d(i.expireEntries());const a=i.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return r?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.J(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.X=t,this.D=t.maxAgeSeconds,this.Y=new Map,t.purgeOnQuotaError&&function(t){p.add(t)}((()=>this.deleteCacheAndMetadata()))}J(t){if(t===w())throw new s("expire-custom-caches-only");let e=this.Y.get(t);return e||(e=new W(t,this.X),this.Y.set(t,e)),e}V(t){if(!this.D)return!0;const e=this.Z(t);if(null===e)return!0;return e>=Date.now()-1e3*this.D}Z(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.Y)await self.caches.delete(t),await e.delete();this.Y=new Map}},t.NavigationRoute=class extends r{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.tt(t)),t),this.et=e,this.st=s}tt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.st)if(t.test(s))return!1;return!!this.et.some((t=>t.test(s)))}},t.NetworkFirst=class extends H{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(j),this.nt=t.networkTimeoutSeconds||0}async P(t,e){const n=[],r=[];let i;if(this.nt){const{id:s,promise:a}=this.rt({request:t,logs:n,handler:e});i=s,r.push(a)}const a=this.it({timeoutId:i,request:t,logs:n,handler:e});r.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(r))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}rt({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.nt)})),id:n}}async it({timeoutId:t,request:e,logs:s,handler:n}){let r,i;try{i=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(r=t)}return t&&clearTimeout(t),!r&&i||(i=await n.cacheMatch(e)),i}},t.StaleWhileRevalidate=class extends H{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(j)}async P(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let r,i=await e.cacheMatch(t);if(i);else try{i=await n}catch(t){t instanceof Error&&(r=t)}if(!i)throw new s("no-response",{url:t.url,error:r});return i}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=f();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.createHandlerBoundToURL=function(t){return tt().createHandlerBoundToURL(t)},t.precacheAndRoute=function(t,e){!function(t){tt().precache(t)}(t),function(t){const e=tt();h(new et(e,t))}(e)},t.registerRoute=h}));
