(function(A){function t(t){for(var n,a,c=t[0],o=t[1],s=t[2],u=0,l=[];u<c.length;u++)a=c[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&l.push(r[a][0]),r[a]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(A[n]=o[n]);d&&d(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var A,t=0;t<i.length;t++){for(var e=i[t],n=!0,a=1;a<e.length;a++){var c=e[a];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),A=o(o.s=e[0]))}return A}var n={},a={app:0},r={app:0},i=[];function c(A){return o.p+"js/"+({}[A]||A)+"."+{"chunk-098213d2":"d6c9440b","chunk-2d0c0a55":"46d0982f","chunk-2d0d3322":"7e1d214f","chunk-2d225434":"f40b210a","chunk-2d22d746":"e0aefe8a"}[A]+".js"}function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return A[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.e=function(A){var t=[],e={"chunk-098213d2":1};a[A]?t.push(a[A]):0!==a[A]&&e[A]&&t.push(a[A]=new Promise((function(t,e){for(var n="css/"+({}[A]||A)+"."+{"chunk-098213d2":"93823e53","chunk-2d0c0a55":"31d6cfe0","chunk-2d0d3322":"31d6cfe0","chunk-2d225434":"31d6cfe0","chunk-2d22d746":"31d6cfe0"}[A]+".css",r=o.p+n,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===n||u===r))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){s=l[c],u=s.getAttribute("data-href");if(u===n||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+A+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[A],d.parentNode.removeChild(d),e(i)},d.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[A]=0})));var n=r[A];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,e){n=r[A]=[t,e]}));t.push(n[2]=i);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=c(A);var l=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(d);var e=r[A];if(0!==e){if(e){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+A+" failed.\n("+n+": "+a+")",l.name="ChunkLoadError",l.type=n,l.request=a,e[1](l)}r[A]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},o.m=A,o.c=n,o.d=function(A,t,e){o.o(A,t)||Object.defineProperty(A,t,{enumerable:!0,get:e})},o.r=function(A){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},o.t=function(A,t){if(1&t&&(A=o(A)),8&t)return A;if(4&t&&"object"===typeof A&&A&&A.__esModule)return A;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:A}),2&t&&"string"!=typeof A)for(var n in A)o.d(e,n,function(t){return A[t]}.bind(null,n));return e},o.n=function(A){var t=A&&A.__esModule?function(){return A["default"]}:function(){return A};return o.d(t,"a",t),t},o.o=function(A,t){return Object.prototype.hasOwnProperty.call(A,t)},o.p="/",o.oe=function(A){throw console.error(A),A};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=u;i.push([0,"chunk-vendors"]),e()})({0:function(A,t,e){A.exports=e("cd49")},"034f":function(A,t,e){"use strict";e("85ec")},"5ced":function(A,t,e){},"85ec":function(A,t,e){},9803:function(A,t,e){},cccb:function(A,t,e){"use strict";e("5ced")},cd49:function(A,t,e){"use strict";e.r(t);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),a=function(){var A=this,t=A.$createElement,n=A._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{id:"inspire"}},[n("v-app-bar",{attrs:{app:"",color:"#3b4252",flat:""}},[n("v-container",{staticClass:"py-0 fill-height"},[n("v-btn",{attrs:{text:""},on:{click:function(t){return A.clickHome()}}},[n("v-avatar",{staticClass:"mr-4",attrs:{size:"32"}},[n("img",{attrs:{src:e("fead"),alt:"Profile"}})]),n("b",[A._v(" "+A._s(A.title))])],1),n("v-spacer"),n("v-menu",{attrs:{bottom:"",left:"","close-on-click":!0},scopedSlots:A._u([{key:"activator",fn:function(t){var e=t.on,a=t.attrs;return[n("v-btn",A._g(A._b({attrs:{dark:"",icon:""}},"v-btn",a,!1),e),[n("v-icon",[A._v("mdi-dots-vertical")])],1)]}}])},[n("v-list",A._l(A.appBarLinks,(function(t,e){return n("v-list-item",{key:e,on:{click:function(e){return A.clickAppBarLink(t)}}},[n("v-list-item-title",[A._v(" "+A._s(t.name)+" ")])],1)})),1)],1)],1)],1),n("v-main",[n("v-container",[n("router-view")],1)],1)],1)],1)},r=[],i=(e("b0c0"),e("96cf"),e("1da1")),c=e("d4ec"),o=e("bee2"),s=e("262e"),u=e("2caf"),l=e("9ab4"),d=e("1b40"),p="Flight Diary",f="https://flights.uzuki.live/",g="SAVE_MAIN_LIST",h="LOAD_MAIN_DATA",m="SAVE_AIRPORT_MAP",w="SAVE_AIRCRAFT",v="LOAD_DETAIL_DATA",B="SAVE_DETAIL_DATA",b="SAVE_DEPARTURE_DATA",D="SAVE_DESTINATION_DATA",Q="LOAD_COLLECTION_DETAIL_DATA",C="data:image/png;base64, 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",E="data:image/png;base64, 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",y="data:image/png;base64, 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",I="data:image/png;base64, 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",O="data:image/png;base64, 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AAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6YAAP/bAAAA8AAAAPAAAADwAAAA8AAAAO8AAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVcONbesXeTYAAAAASUVORK5CYII=",k="data:image/png;base64, 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AEH8AAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAIAAhcAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQKAApbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnIhrWmcjrX4AAAAASUVORK5CYII=",P=function A(t,e){Object(c["a"])(this,A),this.name=t,this.path=e},j=new P("Home","/"),L=new P("About","/about"),M=new P("Detail","/:id/:airport"),H=new P("Specs","/spec"),S=new P("Collections","/collection"),x=new P("Collections","/collection/:id"),U=function(A){Object(s["a"])(e,A);var t=Object(u["a"])(e);function e(){var A;return Object(c["a"])(this,e),A=t.apply(this,arguments),A.appBarLinks=[H,L],A}return Object(o["a"])(e,[{key:"mounted",value:function(){var A=Object(i["a"])(regeneratorRuntime.mark((function A(){return regeneratorRuntime.wrap((function(A){while(1)switch(A.prev=A.next){case 0:this.title=p;case 1:case"end":return A.stop()}}),A,this)})));function t(){return A.apply(this,arguments)}return t}()},{key:"clickHome",value:function(){this.$router.push({name:j.name})}},{key:"clickAppBarLink",value:function(A){this.$router.push(A.path)}}]),e}(d["d"]);Object(l["a"])([Object(d["c"])({default:p})],U.prototype,"title",void 0),U=Object(l["a"])([Object(d["a"])({})],U);var _=U,V=_,Y=(e("034f"),e("2877")),T=Object(Y["a"])(V,a,r,!1,null,null,null),K=T.exports,N=(e("99af"),e("d3b7"),e("4de4"),e("caad"),e("fb6a"),e("07ac"),e("2532"),e("ade3")),R=function A(){Object(c["a"])(this,A)},J=function A(){Object(c["a"])(this,A)},G=function A(t,e){Object(c["a"])(this,A),this.w=1280,this.h=720,this.src="".concat(t,"/").concat(e),this.thumbnail="".concat(t,"/t").concat(e)},F=e("2f62"),q=(e("d81d"),e("18a5"),function A(){Object(c["a"])(this,A)}),X=e("e11e"),W=(e("a15b"),function A(){Object(c["a"])(this,A)}),z=function A(t,e){Object(c["a"])(this,A),this.align="start",this.sortable=!1,this.value="",this.text=t,this.value=e},Z=function A(){Object(c["a"])(this,A)},$=new z("","icon"),AA=new z("Ident","ident"),tA=new z("Region","region"),eA=new z("Name","name"),nA=new z("Procedure","procedure"),aA=new z("Airway or Procedure","airway"),rA=new z("Restriction ft/kts","restrictionKt"),iA=new z("Type","type"),cA=new z("Freq MHz","freq"),oA=new z("Distance nm","distance"),sA=new z("Wind °M/kts","wind");e("a9e3"),e("ac1f"),e("25f0"),e("5319");function uA(A){var t=Number((A||"").replace(/\D/g,"")),e=Math.ceil(1.1852*t).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");return"".concat(A," / ").concat(e," km")}function lA(A){var t=Number(A.replace(/\D/g,"")),e=Math.ceil(.3048*t).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");return"".concat(A.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")," ft / ").concat(e," km")}function dA(A){return"".concat(A.planType," ").concat(A.departure.icao," → ").concat(A.destination.icao)}function pA(A){return"".concat(A.planType," ").concat(A.departure.name," (").concat(A.departure.icao,") → ").concat(A.destination.name," (").concat(A.destination.icao,")")}function fA(A){var t=A.procedures.sid,e=A.procedures.approach,n="Depart runway ".concat(t.runway," via SID ").concat(t.name," . ");return e.transition?n+="Via ".concat(e.transition," and "):n+="Via ",n+="".concat(e.name," (").concat(e.arinc,") to runway ").concat(e.runway," ."),n}function gA(A){return"".concat(A.flightTime," | ").concat(uA(A.distance)," |\n").concat(lA(A.cruiseAlt)," | ").concat(A.aircraft)}function hA(A){return A.images.map((function(t){return new G("".concat(f,"data/").concat(A.id),t)}))}function mA(A){return A.waypoint.filter((function(A){return!A.isProcedure})).map((function(A){return A.ident})).join(" ")}function wA(A,t,e){var n;return n=0==A?C:A==t?E:e.type.includes("VORTAC")?O:e.type.includes("VORDME")?y:e.type.includes("ILS")||""==e.ident&&e.isProcedure?I:k,n}function vA(A,t,e){var n,a=e.ident;return 0==A?n="Departure ".concat(a):A==t?n="Destination ".concat(a):""!=e.type?(n="".concat(e.type," - ").concat(a),""!=e.alt&&(n+=" in ".concat(lA(e.alt)))):(n="".concat(a),""!=e.alt&&(n+=" in ".concat(lA(e.alt)))),n}function BA(A){var t=new W,e=A.waypoint.length-1;return t.headers=[$,AA,tA,eA,nA,aA,rA,iA,cA,oA,sA],t.contents=A.waypoint.map((function(A,t){var n=new Z;return n.icon=wA(t,e,A),n.ident=A.ident,n.region=A.region,n.name=A.name,n.procedure=A.procedure,n.airway=A.airway,n.restrictionKt=A.restrictKt,n.type=A.type,n.freq=A.freq,n.distance=A.distance,n.wind=A.wind,n.key="".concat(n.ident," - ").concat(n.procedure," - ").concat(n.airway),n})),t.length=t.contents.length,t}function bA(A){return[A.waypoint[0].lat,A.waypoint[0].lng]}function DA(A){var t=A.waypoint.length-1;return[A.waypoint[t].lat,A.waypoint[t].lng]}function QA(A){return new X["LatLngBounds"](bA(A),DA(A))}function CA(A){return A.waypoint.map((function(A){return[A.lat,A.lng]})).filter((function(A){return 0!=A[0]&&0!=A[1]}))}function EA(A){var t=A.waypoint.length-1;return A.waypoint.map((function(A,e){var n=new q;return n.latLng=[A.lat,A.lng],n.anchor=[10,12],n.icon=wA(e,t,A),n.ident=A.ident,n.tooltipText=vA(e,t,A),n})).filter((function(A){return 0!=A.latLng[0]&&0!=A.latLng[1]}))}var yA,IA,OA=function A(){Object(c["a"])(this,A)};n["default"].use(F["a"]);var kA={itemList:[],airportList:[],aircraftList:[],detailMetadata:void 0,detailDeparture:void 0,detailDestination:void 0},PA=new F["a"].Store({state:kA,mutations:(yA={},Object(N["a"])(yA,g,(function(A,t){A.itemList=t})),Object(N["a"])(yA,m,(function(A,t){A.airportList=Object.values(t)})),Object(N["a"])(yA,w,(function(A,t){A.aircraftList=t})),Object(N["a"])(yA,B,(function(A,t){A.detailMetadata=t})),Object(N["a"])(yA,b,(function(A,t){A.detailDeparture=t})),Object(N["a"])(yA,D,(function(A,t){A.detailDestination=t})),yA),actions:(IA={},Object(N["a"])(IA,h,(function(A){var t=A.commit,e=n["default"].axios.get("data.json"),a=n["default"].axios.get("airportmap.json"),r=n["default"].axios.get("aircraft.json");return n["default"].axios.all([e,a,r]).then(n["default"].axios.spread((function(){for(var A=arguments.length,e=new Array(A),n=0;n<A;n++)e[n]=arguments[n];t(g,e[0].data),t(m,e[1].data),t(w,e[2].data)}))).catch((function(A){console.log(A),console.log("Can't log main information")}))})),Object(N["a"])(IA,v,(function(A,t){var e=A.commit,a=t.id,r=t.airport.slice(0,4),i=t.airport.slice(4),c=n["default"].axios.get("data/".concat(a,"/metadata.json")),o=n["default"].axios.get("data/airport/".concat(r,".json")),s=n["default"].axios.get("data/airport/".concat(i,".json"));return n["default"].axios.all([c,o,s]).then(n["default"].axios.spread((function(){for(var A=arguments.length,t=new Array(A),n=0;n<A;n++)t[n]=arguments[n];e(B,t[0].data),e(b,t[1].data),e(D,t[2].data)}))).catch((function(A){console.log(A),console.log("Can't log metadata information")}))})),IA),getters:{getMainList:function(A){return function(t){var e=""!=t.departure&&null!=t.departure,n=""!=t.destination&&null!=t.destination,a=""!=t.aircraft&&null!=t.aircraft;return A.itemList.filter((function(A){return!e||A.departure.icao.includes(t.departure)})).filter((function(A){return!n||A.destination.icao.includes(t.destination)})).filter((function(A){return!a||A.aircraft.includes(t.aircraft)})).reverse()}},getDetailData:function(A){var t=new J,e=A.detailMetadata||{};return t.planTitle=dA(e),t.planSubtitle=gA(e),t.imageList=hA(e),t.approachTitle=fA(e),t.fullPlanTitle=pA(e),t},getFlightPlanData:function(A){var t=new R,e=A.detailMetadata||{};return t.planTitle=dA(e),t.bounds=QA(e),t.latLngs=CA(e),t.planRoute=mA(e),t.markers=EA(e),t},getFlightPlanRouteData:function(A){var t=A.detailMetadata||{};return BA(t)},getAirportData:function(A){var t=new OA;return t.departure=A.detailDeparture||{},t.destination=A.detailDestination||{},t}}}),jA=PA,LA=e("8c4f"),MA=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("v-row",[e("v-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"3"}},[e("v-sheet",{staticClass:"pa-2",attrs:{rounded:"lg",color:"#3b4252"}},[e("v-expansion-panels",{attrs:{accordion:"",flat:""},model:{value:A.searchOptions,callback:function(t){A.searchOptions=t},expression:"searchOptions"}},[e("v-expansion-panel",{staticStyle:{background:"#3b4252",color:"white"}},[e("v-expansion-panel-header",[e("h3",[A._v("Search Options")])]),e("v-expansion-panel-content",[e("h4",[A._v("Departure Airport")]),e("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Departure Airport",options:A.airportList,reduce:function(A){return A.icao},label:"label",dark:""},model:{value:A.selectedDeparture,callback:function(t){A.selectedDeparture=t},expression:"selectedDeparture"}}),e("h4",{staticClass:"mt-5"},[A._v("Destination Airport")]),e("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Destination Airport",options:A.airportList,reduce:function(A){return A.icao},label:"label",dark:""},model:{value:A.selectedDestination,callback:function(t){A.selectedDestination=t},expression:"selectedDestination"}}),e("h4",{staticClass:"mt-5"},[A._v("Aircraft")]),e("v-select",{staticClass:"style-chooser",attrs:{placeholder:"Used Aircraft",options:A.aircraftList,reduce:function(A){return A.name},label:"name",dark:""},model:{value:A.selectedAircraft,callback:function(t){A.selectedAircraft=t},expression:"selectedAircraft"}}),e("v-btn",{staticClass:"mt-5",attrs:{block:"",depressed:""},on:{click:A.clearOptions}},[A._v("Clear Options")])],1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"9"}},[e("v-sheet",{staticClass:"mt-3",attrs:{color:"#3b4252","min-height":"80vh",rounded:"lg"}},[e("v-row",A._l(A.listItems,(function(A,t){return e("v-col",{key:t,attrs:{cols:"12",sm:"12",md:"6",lg:"4"}},[e("FlightItem",{attrs:{item:A}})],1)})),1)],1)],1)],1)},HA=[],SA=e("5530"),xA=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("v-card",{staticClass:"mx-auto mb-2 ml-5 mr-5",attrs:{elevation:"2",outlined:"",shaped:""},on:{click:function(t){return A.moveToDetail()}}},[e("v-img",{staticClass:"white--text align-end",attrs:{"max-height":"250",src:A.thumbnail,"lazy-src":A.thumbnail,"aspect-ratio":"1.7778"},scopedSlots:A._u([{key:"placeholder",fn:function(){return[e("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])},[e("v-card-title",{staticClass:"text-stroke"},[A._v(A._s(A.title))])],1),e("v-card-subtitle",[A._v(" "+A._s(A.item.flightTime)+" "),e("br"),A._v(" "+A._s(A.item.aircraft)+" "),e("br"),A._v(" "+A._s(A.distance)+" ")])],1)},UA=[],_A=function(A){Object(s["a"])(e,A);var t=Object(u["a"])(e);function e(){return Object(c["a"])(this,e),t.apply(this,arguments)}return Object(o["a"])(e,[{key:"moveToDetail",value:function(){this.$router.push({name:M.name,params:{id:this.item.id,airport:this.item.departure.icao+this.item.destination.icao}})}},{key:"title",get:function(){return"".concat(this.item.planType," ").concat(this.item.departure.icao," → ").concat(this.item.destination.icao)}},{key:"thumbnail",get:function(){return"".concat(f,"/data/").concat(this.item.id,"/").concat(this.item.mainThumbnail)}},{key:"distance",get:function(){return uA(this.item.distance)}}]),e}(d["d"]);Object(l["a"])([Object(d["c"])({required:!0})],_A.prototype,"item",void 0),_A=Object(l["a"])([d["a"]],_A);var VA=_A,YA=VA,TA=(e("e5c2"),Object(Y["a"])(YA,xA,UA,!1,null,null,null)),KA=TA.exports,NA=function A(t,e,n){Object(c["a"])(this,A),this.departure="",this.destination="",this.aircraft="",this.departure=t,this.destination=e,this.aircraft=n},RA=function(A){Object(s["a"])(e,A);var t=Object(u["a"])(e);function e(){return Object(c["a"])(this,e),t.apply(this,arguments)}return Object(o["a"])(e,[{key:"onSearchOptionsChanged",value:function(A,t){console.log("newVal: ".concat(A," oldVal: ").concat(t)),localStorage.searchOptions=A}},{key:"mounted",value:function(){var A=Object(i["a"])(regeneratorRuntime.mark((function A(){var t=this;return regeneratorRuntime.wrap((function(A){while(1)switch(A.prev=A.next){case 0:return A.next=2,jA.dispatch(h).then((function(){"0"==localStorage.searchOptions&&(t.searchOptions=0)}));case 2:case"end":return A.stop()}}),A)})));function t(){return A.apply(this,arguments)}return t}()},{key:"clearOptions",value:function(){this.selectedDeparture="",this.selectedDestination="",this.selectedAircraft=""}},{key:"listItems",get:function(){var A=new NA(this.selectedDeparture,this.selectedDestination,this.selectedAircraft);return jA.getters.getMainList(A)}}]),e}(d["d"]);Object(l["a"])([Object(d["b"])("input",{type:Number,default:void 0})],RA.prototype,"searchOptions",void 0),Object(l["a"])([Object(d["b"])("input",{type:String,default:null})],RA.prototype,"selectedDeparture",void 0),Object(l["a"])([Object(d["b"])("input",{type:String,default:null})],RA.prototype,"selectedDestination",void 0),Object(l["a"])([Object(d["b"])("input",{type:String,default:null})],RA.prototype,"selectedAircraft",void 0),Object(l["a"])([Object(d["e"])("searchOptions")],RA.prototype,"onSearchOptionsChanged",null),RA=Object(l["a"])([Object(d["a"])({components:{FlightItem:KA},computed:Object(SA["a"])({},Object(F["c"])({airportList:"airportList",aircraftList:"aircraftList"}))})],RA);var JA=RA,GA=JA,FA=(e("cccb"),Object(Y["a"])(GA,MA,HA,!1,null,null,null)),qA=FA.exports;n["default"].use(LA["a"]);var XA=[{path:j.path,name:j.name,meta:{title:"".concat(j.name," - ").concat(p)},component:qA},{path:L.path,name:L.name,meta:{title:"".concat(L.name," - ").concat(p)},component:function(){return e.e("chunk-2d22d746").then(e.bind(null,"f820"))}},{path:H.path,name:H.name,meta:{title:"".concat(H.name," - ").concat(p)},component:function(){return e.e("chunk-2d0d3322").then(e.bind(null,"5c75"))}},{path:M.path,name:M.name,meta:{title:"".concat(M.name," - ").concat(p)},component:function(){return e.e("chunk-098213d2").then(e.bind(null,"c84b"))},props:!0,beforeEnter:function(A,t,e){jA.dispatch(v,{id:A.params.id,airport:A.params.airport}).then((function(){return e()}))}},{path:S.path,name:S.name,meta:{title:"".concat(S.name," - ").concat(p)},component:function(){return e.e("chunk-2d0c0a55").then(e.bind(null,"4355"))}},{path:x.path,name:x.name,meta:{title:"".concat(x.name," - ").concat(p)},component:function(){return e.e("chunk-2d225434").then(e.bind(null,"e43b"))},props:!0,beforeEnter:function(A,t,e){jA.dispatch(Q,{id:A.params.id}).then((function(){return e()}))}}],WA=new LA["a"]({routes:XA});WA.beforeEach((function(A,t,e){document.title=A.meta.title,e()}));var zA=WA,ZA=LA["a"].prototype.push;LA["a"].prototype.push=function(){var A=Object(i["a"])(regeneratorRuntime.mark((function A(t){var e;return regeneratorRuntime.wrap((function(A){while(1)switch(A.prev=A.next){case 0:return A.prev=0,A.next=3,ZA.call(this,t);case 3:e=A.sent,A.next=10;break;case 6:if(A.prev=6,A.t0=A["catch"](0),"NavigationDuplicated"===A.t0.name){A.next=10;break}throw A.t0;case 10:return A.abrupt("return",e);case 11:case"end":return A.stop()}}),A,this,[[0,6]])})));return function(t){return A.apply(this,arguments)}}();var $A=e("ce5b"),At=e.n($A);e("bf40");n["default"].use(At.a);var tt=new At.a({theme:{dark:!0,themes:{dark:{primary:"#2e3440",background:"#2e3440"}},options:{customProperties:!0}}}),et=e("2106"),nt=e.n(et),at=e("bc3a"),rt=e.n(at),it=e("4a7a"),ct=e.n(it),ot=e("ecee"),st=e("c074"),ut=e("ad3d"),lt=e("2699"),dt=e("a40a"),pt=e("4e2b"),ft=e("635f"),gt=e("2253"),ht=e("fbba"),mt=e("31dc"),wt=e("2af0");e("6cc5"),e("6dfc");ot["c"].add(st["a"],st["b"]),n["default"].component("font-awesome-icon",ut["a"]),n["default"].config.productionTip=!1,n["default"].use(nt.a,rt.a),n["default"].axios.defaults.baseURL=f,n["default"].component("v-select",ct.a),n["default"].component("vue-picture-swipe",wt["a"]),n["default"].component("l-map",lt["a"]),n["default"].component("l-tile-layer",dt["a"]),n["default"].component("l-marker",pt["a"]),n["default"].component("l-polyline",ft["a"]),n["default"].component("l-control",gt["a"]),n["default"].component("l-icon",ht["a"]),n["default"].component("l-tooltip",mt["a"]),new n["default"]({router:zA,store:jA,vuetify:tt,render:function(A){return A(K)}}).$mount("#app")},e5c2:function(A,t,e){"use strict";e("9803")},fead:function(A,t,e){A.exports=e.p+"img/profile_akari_circle.a2dfb05b.png"}});
//# sourceMappingURL=app.206fb725.js.map