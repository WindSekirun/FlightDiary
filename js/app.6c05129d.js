(function(t){function e(e){for(var r,c,o=e[0],s=e[1],u=e[2],l=0,f=[];l<o.length;l++)c=o[l],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);p&&p(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,c=1;c<n.length;c++){var s=n[c];0!==a[s]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function c(t){return o.p+"js/"+({}[t]||t)+"."+{"chunk-2d0d3322":"ce492dcd","chunk-2d217a99":"20d72141","chunk-2d22d746":"78dd9436"}[t]+".js"}function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=a[t]=[e,r]}));e.push(n[2]=r);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.src=c(t);var u=new Error;i=function(e){s.onerror=s.onload=null,clearTimeout(l);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}a[t]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(e)},o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var p=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";n("85ec")},"5ced":function(t,e,n){},"85ec":function(t,e,n){},cccb:function(t,e,n){"use strict";n("5ced")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("v-app",{attrs:{id:"inspire"}},[r("v-app-bar",{attrs:{app:"",color:"#3b4252",flat:""}},[r("v-container",{staticClass:"py-0 fill-height"},[r("v-avatar",{staticClass:"mr-4",attrs:{size:"32"}},[r("img",{attrs:{src:n("fead"),alt:"Profile"}})]),r("b",{staticClass:"mr-4 d-none d-md-flex d-md-flex"},[t._v(" "+t._s(t.title))]),t._l(t.appBarLinks,(function(e,n){return r("v-btn",{key:n,attrs:{text:""},on:{click:function(n){return t.clickAppBarLink(e)}}},[t._v(" "+t._s(e.name)+" ")])}))],2)],1),r("v-main",[r("v-container",[r("router-view")],1)],1)],1)],1)},i=[],c=(n("96cf"),n("1da1")),o=n("d4ec"),s=n("bee2"),u=n("262e"),l=n("2caf"),p=n("9ab4"),f=n("1b40"),d="Flight Diary",h="https://flights.uzuki.live/",m="SAVE_MAIN_LIST",b="LOAD_MAIN_DATA",v="SAVE_AIRPORT_MAP",g="SAVE_AIRCRAFT",j=(n("b0c0"),function t(e,n){Object(o["a"])(this,t),this.name=e,this.path=n}),O=new j("Home","/"),y=new j("About","/about"),k=new j("Detail","/detail/:id"),_=new j("Specs","/spec"),w=function(t){Object(u["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.appBarLinks=[O,_,y],t}return Object(s["a"])(n,[{key:"mounted",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.title=d;case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"clickAppBarLink",value:function(t){this.$router.push("".concat(t.path))}}]),n}(f["d"]);Object(p["a"])([Object(f["c"])({default:d})],w.prototype,"title",void 0),w=Object(p["a"])([Object(f["a"])({})],w);var x=w,A=x,L=(n("034f"),n("2877")),D=Object(L["a"])(A,a,i,!1,null,null,null),C=D.exports,S=(n("99af"),n("d3b7"),n("8c4f")),P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("v-col",{attrs:{cols:"12",sm:"3"}},[n("v-sheet",{staticClass:"pa-3",attrs:{rounded:"lg","min-height":"120",color:"#3b4252"}},[n("p",[t._v("Departure Airport")]),n("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Departure Airport",options:t.airportList,reduce:function(t){return t.icao},label:"label"},model:{value:t.selectedDeparture,callback:function(e){t.selectedDeparture=e},expression:"selectedDeparture"}}),n("p",{staticClass:"mt-5"},[t._v("Destination Airport")]),n("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Destination Airport",options:t.airportList,reduce:function(t){return t.icao},label:"label"},model:{value:t.selectedDestination,callback:function(e){t.selectedDestination=e},expression:"selectedDestination"}}),n("p",{staticClass:"mt-5"},[t._v("Aircraft")]),n("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Destination Airport",options:t.aircraftList,reduce:function(t){return t.name},label:"name"},model:{value:t.selectedAircraft,callback:function(e){t.selectedAircraft=e},expression:"selectedAircraft"}})],1)],1),n("v-col",{attrs:{cols:"12",sm:"9"}},[n("v-sheet",{staticClass:"mt-3",attrs:{color:"#3b4252","min-height":"80vh",rounded:"lg"}},[n("v-row",t._l(t.listItems,(function(t,e){return n("v-col",{key:e,attrs:{cols:"12",sm:"12",md:"6",lg:"4"}},[n("FlightItem",{attrs:{item:t}})],1)})),1)],1)],1)],1)},T=[],E=n("5530"),I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mx-auto mb-2 ml-5 mr-5",attrs:{elevation:"2",outlined:""}},[n("v-img",{staticClass:"white--text align-end",attrs:{"max-height":"250",src:t.thumbnail}},[n("v-card-title",[t._v(t._s(t.title))])],1),n("v-card-subtitle",[t._v(" "+t._s(t.item.flightTime)+" "),n("br"),t._v(" "+t._s(t.item.aircraft)+" ")])],1)},M=[],R=function(t){Object(u["a"])(n,t);var e=Object(l["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(s["a"])(n,[{key:"title",get:function(){return"".concat(this.item.departure.icao," → ").concat(this.item.destination.icao)}},{key:"information",get:function(){return"".concat(this.item.flightTime," | ").concat(this.item.aircraft)}},{key:"thumbnail",get:function(){return"".concat(h,"/data/").concat(this.item.id,"/").concat(this.item.mainThumbnail)}}]),n}(f["d"]);Object(p["a"])([Object(f["c"])({required:!0})],R.prototype,"item",void 0),R=Object(p["a"])([f["a"]],R);var $,B=R,F=B,N=Object(L["a"])(F,I,M,!1,null,null,null),V=N.exports,q=(n("4de4"),n("caad"),n("07ac"),n("2532"),n("ade3")),z=n("2f62");r["default"].use(z["a"]);var J=new z["a"].Store({state:{itemList:[],airportList:[],aircraftList:[]},mutations:($={},Object(q["a"])($,m,(function(t,e){t.itemList=e})),Object(q["a"])($,v,(function(t,e){t.airportList=Object.values(e)})),Object(q["a"])($,g,(function(t,e){t.aircraftList=e})),$),actions:Object(q["a"])({},b,(function(t){var e=t.commit;r["default"].axios.get("data.json").then((function(t){return e(m,t.data)})),r["default"].axios.get("airportmap.json").then((function(t){return e(v,t.data)})),r["default"].axios.get("aircraft.json").then((function(t){return e(g,t.data)}))})),getters:{getMainList:function(t){return function(e){var n=""!=e.departure&&null!=e.departure,r=""!=e.destination&&null!=e.destination,a=""!=e.aircraft&&null!=e.aircraft;return t.itemList.filter((function(t){return!n||t.departure.icao.includes(e.departure)})).filter((function(t){return!r||t.destination.icao.includes(e.destination)})).filter((function(t){return!a||t.aircraft.includes(e.aircraft)})).reverse()}}}}),H=J,U=function t(e,n,r){Object(o["a"])(this,t),this.departure="",this.destination="",this.aircraft="",this.departure=e,this.destination=n,this.aircraft=r},G=function(t){Object(u["a"])(n,t);var e=Object(l["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(s["a"])(n,[{key:"created",value:function(){H.dispatch(b)}},{key:"listItems",get:function(){var t=new U(this.selectedDeparture,this.selectedDestination,this.selectedAircraft);return H.getters.getMainList(t)}}]),n}(f["d"]);Object(p["a"])([Object(f["b"])("input",{type:String,default:null})],G.prototype,"selectedDeparture",void 0),Object(p["a"])([Object(f["b"])("input",{type:String,default:null})],G.prototype,"selectedDestination",void 0),Object(p["a"])([Object(f["b"])("input",{type:String,default:null})],G.prototype,"selectedAircraft",void 0),G=Object(p["a"])([Object(f["a"])({components:{FlightItem:V},computed:Object(E["a"])({},Object(z["b"])({airportList:"airportList",aircraftList:"aircraftList"}))})],G);var K=G,Q=K,W=(n("cccb"),Object(L["a"])(Q,P,T,!1,null,null,null)),X=W.exports;r["default"].use(S["a"]);var Y=[{path:O.path,name:O.name,meta:{title:"".concat(O.name," - ").concat(d)},component:X},{path:y.path,name:y.name,meta:{title:"".concat(y.name," - ").concat(d)},component:function(){return n.e("chunk-2d22d746").then(n.bind(null,"f820"))}},{path:_.path,name:_.name,meta:{title:"".concat(_.name," - ").concat(d)},component:function(){return n.e("chunk-2d0d3322").then(n.bind(null,"5c75"))}},{path:k.path,name:k.name,meta:{title:"".concat(k.name," - ").concat(d)},component:function(){return n.e("chunk-2d217a99").then(n.bind(null,"c84b"))},props:!0}],Z=new S["a"]({routes:Y});Z.beforeEach((function(t,e,n){document.title=t.meta.title,n()}));var tt=Z,et=S["a"].prototype.push;S["a"].prototype.push=function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,et.call(this,e);case 3:n=t.sent,t.next=10;break;case 6:if(t.prev=6,t.t0=t["catch"](0),"NavigationDuplicated"===t.t0.name){t.next=10;break}throw t.t0;case 10:return t.abrupt("return",n);case 11:case"end":return t.stop()}}),t,this,[[0,6]])})));return function(e){return t.apply(this,arguments)}}();var nt=n("ce5b"),rt=n.n(nt);n("bf40");r["default"].use(rt.a);var at=new rt.a({theme:{dark:!0,themes:{dark:{background:"#2e3440"}},options:{customProperties:!0}}}),it=n("2106"),ct=n.n(it),ot=n("bc3a"),st=n.n(ot),ut=n("4a7a"),lt=n.n(ut);n("6dfc");r["default"].config.productionTip=!1,r["default"].use(ct.a,st.a),r["default"].component("v-select",lt.a),r["default"].axios.defaults.baseURL=h,new r["default"]({router:tt,store:H,vuetify:at,render:function(t){return t(C)}}).$mount("#app")},fead:function(t,e,n){t.exports=n.p+"img/profile_akari_circle.a2dfb05b.png"}});
//# sourceMappingURL=app.6c05129d.js.map