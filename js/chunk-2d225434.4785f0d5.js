(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225434"],{e43b:function(t,e,a){"use strict";a.r(e);var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-sheet",{staticClass:"pa-5",attrs:{rounded:"lg",color:"#3b4252"}},[a("h1",[t._v(t._s(t.collectionDetail.item.title))]),a("h4",{staticClass:"mt-2"},[t._v(" "+t._s(t.totalDistance)+" | "+t._s(t.collectionDetail.item.aircraft)+" ")]),a("h2",{staticClass:"mt-5"},[t._v("Flight Plan")]),a("leaflet-map",{staticClass:"mt-2",attrs:{"default-zoom-level":4,"use-zoom-in-center":"",markers:t.collectionDetail.markers,title:t.collectionDetail.item.title}}),a("data-table",{staticClass:"mt-5",attrs:{"table-id":"collection detail-"+t.id,headers:t.collectionDetail.tableHeaders,contents:t.collectionDetail.tableContents},on:{"row-click":t.clickDetail}})],1)},l=[],i=a("5530"),o=a("d4ec"),n=a("bee2"),s=a("257e"),r=a("262e"),b=a("2caf"),d=a("ade3"),u=(a("99af"),a("b0c0"),a("9ab4")),m=a("8889"),f=a("1b40"),p=a("2f62"),h=a("3bf0"),j=a("f770"),v=a("b364"),D=a("30b7"),O=function(t){Object(r["a"])(a,t);var e=Object(b["a"])(a);function a(){var t;Object(o["a"])(this,a);for(var c=arguments.length,l=new Array(c),i=0;i<c;i++)l[i]=arguments[i];return t=e.call.apply(e,[this].concat(l)),Object(d["a"])(Object(s["a"])(t),"collectionDetail",void 0),Object(d["a"])(Object(s["a"])(t),"id",void 0),t}return Object(n["a"])(a,[{key:"totalDistance",get:function(){return Object(m["a"])(this.collectionDetail.item.distances)}},{key:"mounted",value:function(){document.title="".concat(this.collectionDetail.item.title," - ").concat(h["C"])}},{key:"clickDetail",value:function(t){this.$router.push({name:v["f"].name,params:{id:t.id,airport:t.detailKey}})}}]),a}(f["d"]);Object(u["a"])([Object(f["c"])({required:!0})],O.prototype,"id",void 0),O=Object(u["a"])([Object(f["a"])({components:{LeafletMap:j["a"],DataTable:D["a"]},computed:Object(i["a"])({},Object(p["c"])({collectionDetail:"collectionDetail"}))})],O);var k=O,w=k,_=a("2877"),y=Object(_["a"])(w,c,l,!1,null,null,null);e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d225434.4785f0d5.js.map