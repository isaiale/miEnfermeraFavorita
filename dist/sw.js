if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let a={};const o=e=>n(e,c),l={module:{uri:c},exports:a,require:o};s[c]=Promise.all(i.map((e=>l[e]||o(e)))).then((e=>(r(...e),a)))}}define(["./workbox-1c4dabfd"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"2c52f5c2c3f358d097bbb0ab9b728173"},{url:"assets/error-404-monstruo-D9Nk5Fh2.png",revision:null},{url:"assets/html2canvas.esm-CBrSDip1.js",revision:null},{url:"assets/imgenfermera-BC8rDrYA.png",revision:null},{url:"assets/IMGSlider-DywCa5qO.png",revision:null},{url:"assets/index-BOKuU210.js",revision:null},{url:"assets/index-DE7eDJal.css",revision:null},{url:"assets/index.es-9Hcs9UDS.js",revision:null},{url:"assets/purify.es-DGIRlouP.js",revision:null},{url:"icon-192x192.png",revision:"6423c53d1ac59da3167eb5b904f54f54"},{url:"icon-512x512.png",revision:"5efc1ef5d581165cff908fbd9afc54b8"},{url:"index.html",revision:"a1ea6a1ba99b652535d8673619ca3a12"},{url:"logo_transparent.png",revision:"9df191f3668c6b7114749c09f069778a"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"manifest.webmanifest",revision:"fd02b210733b2271e065c948dee48a5b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"icon-192x192.png",revision:"6423c53d1ac59da3167eb5b904f54f54"},{url:"icon-512x512.png",revision:"5efc1ef5d581165cff908fbd9afc54b8"},{url:"logo.jpg",revision:"939a70a4727ee4c351ffb73a38a94154"},{url:"manifest.json",revision:"4fc60cf7601ed0109fc441edfb8cea28"},{url:"manifest.webmanifest",revision:"fd02b210733b2271e065c948dee48a5b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/back-end-enfermera\.vercel\.app\/api\//,new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)$/,new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/.*\.(?:js|css|html)$/,new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800})]}),"GET")}));
