(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4118cfa4"],{"0acf":function(e,t,a){},"30b7":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.disableHideTable?e._e():a("v-btn",{staticClass:"mt-2 mb-2",attrs:{block:"",color:"#2e3440"},on:{click:e.clickToggleTable}},[e._v(" "+e._s(e.hideTableButtonText)+" ")]),e.hideTable?e._e():a("v-data-table",{staticClass:"elevation-1 mytable",attrs:{dense:"",headers:e.headers,items:e.contents,"items-per-page":e.itemsPerPage,"item-key":"key","hide-default-footer":e.hideDefaultFooter},on:{"click:row":e.clickRow},scopedSlots:e._u([{key:"item.icon",fn:function(e){var t=e.item;return[a("img",{attrs:{src:t.icon}})]}}],null,!0)})],1)},o=[],r=a("d4ec"),c=a("bee2"),n=a("257e"),l=a("262e"),s=a("2caf"),b=a("ade3"),u=(a("99af"),a("b0c0"),a("a9e3"),a("9ab4")),d=a("1b40"),p="row-click",f=function(e){Object(l["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;Object(r["a"])(this,a);for(var i=arguments.length,o=new Array(i),c=0;c<i;c++)o[c]=arguments[c];return e=t.call.apply(t,[this].concat(o)),Object(b["a"])(Object(n["a"])(e),"tableId",void 0),Object(b["a"])(Object(n["a"])(e),"headers",void 0),Object(b["a"])(Object(n["a"])(e),"contents",void 0),Object(b["a"])(Object(n["a"])(e),"itemsPerPage",void 0),Object(b["a"])(Object(n["a"])(e),"hideDefaultFooter",void 0),Object(b["a"])(Object(n["a"])(e),"disableHideTable",void 0),Object(b["a"])(Object(n["a"])(e),"hideTable",null),e}return Object(c["a"])(a,[{key:"hideTableButtonText",get:function(){return this.hideTable?"Show table":"Hide Table"}},{key:"getLocalStorageKey",value:function(){return"hideTable".concat(this.tableId)}},{key:"onSearchOptionsChanged",value:function(e,t){localStorage[this.getLocalStorageKey()]=e}},{key:"mounted",value:function(){if(!this.disableHideTable)if("true"==localStorage[this.getLocalStorageKey()])this.hideTable=!0;else switch(this.$vuetify.breakpoint.name){case"xs":this.hideTable=!0;break;case"sm":this.hideTable=!0;break;default:this.hideTable=!1;break}}},{key:"clickRow",value:function(e){this.$emit(p,e)}},{key:"clickToggleTable",value:function(){this.hideTable=!this.hideTable}}]),a}(d["d"]);Object(u["a"])([Object(d["c"])({type:String,default:""})],f.prototype,"tableId",void 0),Object(u["a"])([Object(d["c"])({type:Array})],f.prototype,"headers",void 0),Object(u["a"])([Object(d["c"])({type:Array})],f.prototype,"contents",void 0),Object(u["a"])([Object(d["c"])({type:Number,default:10})],f.prototype,"itemsPerPage",void 0),Object(u["a"])([Object(d["c"])({type:Boolean,default:!1})],f.prototype,"hideDefaultFooter",void 0),Object(u["a"])([Object(d["c"])({type:Boolean,default:!1})],f.prototype,"disableHideTable",void 0),Object(u["a"])([Object(d["e"])("hideTable")],f.prototype,"onSearchOptionsChanged",null),f=Object(u["a"])([Object(d["a"])({components:{},computed:{}})],f);var h=f,v=h,O=(a("9037"),a("2877")),j=Object(O["a"])(v,i,o,!1,null,null,null);t["a"]=j.exports},"32e9":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-sheet",{staticClass:"pa-5",attrs:{rounded:"lg",color:"#3b4252"}},[a("h1",[e._v("Visited Airports")]),a("v-card",{staticClass:"mt-5"},[a("v-responsive",{attrs:{"aspect-ratio":2}},[a("l-map",{ref:"myMap",staticStyle:{"z-index":"0"},attrs:{options:{scrollWheelZoom:!1,preferCanvas:!0},zoom:2},on:{ready:e.readyLeaflet}},[a("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._l(e.markers,(function(t,i){return a("div",{key:i},[a("l-marker",{attrs:{"lat-lng":t.latLng},on:{click:function(a){return e.moveToAirport(t.headline)}}},[a("l-tooltip",{attrs:{options:{direction:"top"}}},[e._v(" "+e._s(t.tooltipText)+" ")]),a("l-icon",{attrs:{"icon-anchor":t.anchor,"class-name":"marker-icon"}},[a("img",{attrs:{src:t.icon}}),t.headline?a("div",{staticClass:"ident"},[e._v(" "+e._s(t.headline)+" ")]):e._e()])],1)],1)}))],2)],1)],1),a("data-table",{staticClass:"mt-5",attrs:{headers:e.tableHeader,contents:e.tableContents,"table-id":"visited-airport","items-per-page":10,"disable-hide-table":""},on:{"row-click":e.moveToAirportOnTable}})],1)},o=[],r=a("5530"),c=a("1da1"),n=a("d4ec"),l=a("bee2"),s=a("257e"),b=a("262e"),u=a("2caf"),d=a("ade3"),p=(a("96cf"),a("99af"),a("d81d"),a("b0c0"),a("9ab4")),f=a("1b40"),h=a("3bf0"),v=a("2f62"),O=a("0613"),j=a("3057"),m=a("472b"),y=a("cd49"),k=a("30b7"),g=a("b364"),T=a("4329"),w=function(e){Object(b["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;Object(n["a"])(this,a);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return e=t.call.apply(t,[this].concat(o)),Object(d["a"])(Object(s["a"])(e),"airportList",void 0),Object(d["a"])(Object(s["a"])(e),"url",void 0),Object(d["a"])(Object(s["a"])(e),"attribution",void 0),Object(d["a"])(Object(s["a"])(e),"defaultZoom",12),Object(d["a"])(Object(s["a"])(e),"map",void 0),e}return Object(l["a"])(a,[{key:"readyLeaflet",value:function(e){this.map=e}},{key:"moveToAirport",value:function(e){y["default"].$emit(h["b"],m["d"].index),this.$router.push({name:g["c"].name,params:{airport:e}})}},{key:"moveToAirportOnTable",value:function(e){this.moveToAirport(e.ident)}},{key:"markers",get:function(){return this.airportList.map((function(e){return j["a"].makeByAirport(e)}))}},{key:"tableHeader",get:function(){return[T["a"],T["b"]]}},{key:"tableContents",get:function(){return this.airportList.map((function(e){return T["d"].makeByDefault(e)}))}},{key:"mounted",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O["a"].dispatch(h["n"]);case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),a}(f["d"]);Object(p["a"])([Object(f["c"])({default:h["q"]})],w.prototype,"url",void 0),Object(p["a"])([Object(f["c"])({default:h["a"]})],w.prototype,"attribution",void 0),w=Object(p["a"])([Object(f["a"])({components:{DataTable:k["a"]},computed:Object(r["a"])({},Object(v["c"])({airportList:"airportList"}))})],w);var _=w,A=_,C=(a("5918"),a("2877")),L=Object(C["a"])(A,i,o,!1,null,null,null);t["default"]=L.exports},5918:function(e,t,a){"use strict";a("0acf")},"86b0":function(e,t,a){},9037:function(e,t,a){"use strict";a("86b0")}}]);
//# sourceMappingURL=chunk-4118cfa4.961f8724.js.map