(function(e){function t(t){for(var n,o,l=t[0],s=t[1],i=t[2],c=0,h=[];c<l.length;c++)o=l[c],a[o]&&h.push(a[o][0]),a[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);f&&f(t);while(h.length)h.shift()();return u.push.apply(u,i||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(n=!1)}n&&(u.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},o={app:0},a={app:0},u=[];function l(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-44889b18":"715dfb9c","chunk-522ba10b":"98edd718"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r={"chunk-44889b18":1,"chunk-522ba10b":1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise(function(t,r){for(var n="css/"+({}[e]||e)+"."+{"chunk-44889b18":"b9eac466","chunk-522ba10b":"7ccf7ea7"}[e]+".css",a=s.p+n,u=document.getElementsByTagName("link"),l=0;l<u.length;l++){var i=u[l],c=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(c===n||c===a))return t()}var h=document.getElementsByTagName("style");for(l=0;l<h.length;l++){i=h[l],c=i.getAttribute("data-href");if(c===n||c===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=n,delete o[e],f.parentNode.removeChild(f),r(u)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){o[e]=0}));var n=a[e];if(0!==n)if(n)t.push(n[2]);else{var u=new Promise(function(t,r){n=a[e]=[t,r]});t.push(n[2]=u);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=l(e),i=function(t){c.onerror=c.onload=null,clearTimeout(h);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+n+": "+o+")");u.type=n,u.request=o,r[1](u)}a[e]=void 0}};var h=setTimeout(function(){i({type:"timeout",target:c})},12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var h=0;h<i.length;h++)t(i[h]);var f=c;u.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view"),r("div",{staticClass:"mobile overlay",class:{active:!0===e.showOverlay},on:{click:e.closeMenus}})],1)},a=[],u=r("d3e3"),l={data:function(){return{showOverlay:!1}},methods:{closeMenus:function(){u["a"].$emit("CLOSE_MENUS"),this.showOverlay=!1}},mounted:function(){var e=this;u["a"].$on("SHOW_MOBILE_MENU",function(){e.showOverlay=!0}),u["a"].$on("NEW_RECIPE",function(){e.showOverlay=!1})},watch:{$route:{handler:function(){this.showOverlay=!1}}}},s=l,i=(r("5c0b"),r("2877")),c=Object(i["a"])(s,o,a,!1,null,null,null),h=c.exports,f=r("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("br"),n("a",{attrs:{href:"/auth/facebook"}},[e._v("Faceook Login")]),n("br"),n("a",{attrs:{href:"/auth/google"}},[e._v("Google Login!")]),n("br"),n("a",{attrs:{href:"/login"}},[e._v("Regular Login")]),n("br"),n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},v=[],d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[r("h1",[e._v(e._s(e.msg))]),e._m(0),r("h3",[e._v("Installed CLI Plugins")]),e._m(1),r("h3",[e._v("Essential Links")]),r("router-link",{attrs:{to:{path:"/recipes/all"}}},[e._v("\n    Recipes\n  ")]),e._m(2),r("h3",[e._v("Ecosystem")]),e._m(3)],1)},g=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("\n    For a guide and recipes on how to configure / customize this project,"),r("br"),e._v("\n    check out the\n    "),r("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),r("li",[r("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),r("li",[r("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),r("li",[r("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),r("li",[r("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],m={name:"HelloWorld",props:{msg:String}},b=m,_=(r("73e8"),Object(i["a"])(b,d,g,!1,null,"19bfd100",null)),y=_.exports,k={name:"home",components:{HelloWorld:y}},w=k,j=Object(i["a"])(w,p,v,!1,null,null,null),E=j.exports;n["a"].use(f["a"]);var O=new f["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Home",component:E},{path:"/recipes",redirect:"/recipes/all"},{path:"/recipes/:view",name:"Recipes",component:function(){return r.e("chunk-522ba10b").then(r.bind(null,"dece"))}},{path:"/recipes/tag/:tagName",name:"Tag",component:function(){return r.e("chunk-522ba10b").then(r.bind(null,"dece"))}},{path:"/login",name:"Login",component:function(){return r.e("chunk-44889b18").then(r.bind(null,"578a"))}}]});n["a"].config.productionTip=!1,new n["a"]({router:O,render:function(e){return e(h)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("5e27"),o=r.n(n);o.a},"5e27":function(e,t,r){},"73e8":function(e,t,r){"use strict";var n=r("7702"),o=r.n(n);o.a},7702:function(e,t,r){},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"},d3e3:function(e,t,r){"use strict";var n=r("2b0e");t["a"]=new n["a"]}});
//# sourceMappingURL=app.2090e52b.js.map