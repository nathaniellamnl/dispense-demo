(this.webpackJsonpdispense=this.webpackJsonpdispense||[]).push([[4],{446:function(e,t,a){"use strict";var n=a(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(33)).default)(r.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}),"AddCircle");t.default=o},662:function(e,t,a){e.exports={button:"Button_button__25VVM","button-container":"Button_button-container__1v2wv"}},663:function(e,t,a){e.exports={"icon-container":"TransactionRecord_icon-container__9PZ9A","section-child":"TransactionRecord_section-child__r7ML2",spacer:"TransactionRecord_spacer__1PcQz","record-container":"TransactionRecord_record-container__1gyiH"}},664:function(e,t,a){"use strict";var n=a(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(33)).default)(r.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=o},665:function(e,t,a){"use strict";var n=a(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(33)).default)(r.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.default=o},666:function(e,t,a){"use strict";var n=a(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(33)).default)(r.default.createElement("path",{d:"M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"}),"Print");t.default=o},685:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(42),o=a(12),c=a(0),i=a.n(c),l=a(254),s=a(2),d=a(1),u=(a(5),a(3)),p=a(4);var m=c.createContext(),f=c.forwardRef((function(e,t){var a=e.classes,n=e.className,r=e.component,o=void 0===r?"table":r,i=e.padding,l=void 0===i?"default":i,p=e.size,f=void 0===p?"medium":p,g=e.stickyHeader,b=void 0!==g&&g,h=Object(s.a)(e,["classes","className","component","padding","size","stickyHeader"]),v=c.useMemo((function(){return{padding:l,size:f,stickyHeader:b}}),[l,f,b]);return c.createElement(m.Provider,{value:v},c.createElement(o,Object(d.a)({role:"table"===o?null:"table",ref:t,className:Object(u.a)(a.root,n,b&&a.stickyHeader)},h)))})),g=Object(p.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(d.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(f);var b=c.createContext(),h={variant:"body"},v=c.forwardRef((function(e,t){var a=e.classes,n=e.className,r=e.component,o=void 0===r?"tbody":r,i=Object(s.a)(e,["classes","className","component"]);return c.createElement(b.Provider,{value:h},c.createElement(o,Object(d.a)({className:Object(u.a)(a.root,n),ref:t,role:"tbody"===o?null:"rowgroup"},i)))})),y=Object(p.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(v),E=a(6),j=a(15),O=c.forwardRef((function(e,t){var a,n,r=e.align,o=void 0===r?"inherit":r,i=e.classes,l=e.className,p=e.component,f=e.padding,g=e.scope,h=e.size,v=e.sortDirection,y=e.variant,j=Object(s.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),O=c.useContext(m),k=c.useContext(b),w=k&&"head"===k.variant;p?(n=p,a=w?"columnheader":"cell"):n=w?"th":"td";var x=g;!x&&w&&(x="col");var _=f||(O&&O.padding?O.padding:"default"),C=h||(O&&O.size?O.size:"medium"),N=y||k&&k.variant,I=null;return v&&(I="asc"===v?"ascending":"descending"),c.createElement(n,Object(d.a)({ref:t,className:Object(u.a)(i.root,i[N],l,"inherit"!==o&&i["align".concat(Object(E.a)(o))],"default"!==_&&i["padding".concat(Object(E.a)(_))],"medium"!==C&&i["size".concat(Object(E.a)(C))],"head"===N&&O&&O.stickyHeader&&i.stickyHeader),"aria-sort":I,role:a,scope:x},j))})),k=Object(p.a)((function(e){return{root:Object(d.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(j.e)(Object(j.c)(e.palette.divider,1),.88):Object(j.a)(Object(j.c)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(O),w=c.forwardRef((function(e,t){var a=e.classes,n=e.className,r=e.component,o=void 0===r?"div":r,i=Object(s.a)(e,["classes","className","component"]);return c.createElement(o,Object(d.a)({ref:t,className:Object(u.a)(a.root,n)},i))})),x=Object(p.a)({root:{width:"100%",overflowX:"auto"}},{name:"MuiTableContainer"})(w),_={variant:"head"},C=c.forwardRef((function(e,t){var a=e.classes,n=e.className,r=e.component,o=void 0===r?"thead":r,i=Object(s.a)(e,["classes","className","component"]);return c.createElement(b.Provider,{value:_},c.createElement(o,Object(d.a)({className:Object(u.a)(a.root,n),ref:t,role:"thead"===o?null:"rowgroup"},i)))})),N=Object(p.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(C),I=c.forwardRef((function(e,t){var a=e.classes,n=e.className,r=e.component,o=void 0===r?"tr":r,i=e.hover,l=void 0!==i&&i,p=e.selected,m=void 0!==p&&p,f=Object(s.a)(e,["classes","className","component","hover","selected"]),g=c.useContext(b);return c.createElement(o,Object(d.a)({ref:t,className:Object(u.a)(a.root,n,g&&{head:a.head,footer:a.footer}[g.variant],l&&a.hover,m&&a.selected),role:"tr"===o?null:"row"},f))})),z=Object(p.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(j.c)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(I),T=a(259),M=a(446),D=a.n(M),H=a(666),S=a.n(H),R=a(664),A=a.n(R),P=a(665),q=a.n(P),$=a(220),L=a(48),V=a(662),B=a.n(V),F=function(e){return i.a.createElement("section",{className:B.a["button-container"]},e.buttonNames.map((function(t){return i.a.createElement("button",{onClick:"Cancel"===t?e.cancel:e.action,key:t,className:B.a.button,type:"button"},t)})))},J=a(24),W=a(91),Q=a(663),U=a.n(Q),X=i.a.lazy((function(){return Promise.all([a.e(7),a.e(6)]).then(a.bind(null,687))})),Z=Object(l.a)({table:{minWidth:400}});t.default=function(e){var t=Z(),a=Object(c.useState)({open:!1,transactionId:null}),l=Object(o.a)(a,2),s=l[0],d=l[1],u=Object(c.useState)({open:!1,transactionId:null}),p=Object(o.a)(u,2),m=p[0],f=p[1],b=Object(c.useState)(),h=Object(o.a)(b,2),v=h[0],E=h[1],j=Object(c.useState)(!1),O=Object(o.a)(j,2),w=O[0],_=O[1],C=Object(c.useState)(0),I=Object(o.a)(C,2),M=I[0],H=I[1],R=function(e){d({open:!0,transactionId:e})},P=function(){d({open:!1,transactionId:null})},V=function(){f({open:!1,transactionId:null})};Object(c.useEffect)((function(){var t={query:"\n                 query Transactions($id:ID) {\n                   transactions(_id:$id) {\n                    _id\n                    transactionDate\n                    drugs\n                    quantities\n                    remark\n                    amount\n                   }\n                 }\n              ",variables:{id:e.patientId}};fetch(J.graphqlServerUrl,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){E(e.data.transactions)})).catch((function(e){}))}),[e]),Object(c.useEffect)((function(){if(v){var e=0;v.map((function(t){e=Math.max(e,t.drugs.length)})),H(e)}}),[v]);var B=function(e,t,a){var o=Object(r.a)(v);switch(e){case"delete":var c=o.findIndex((function(e){return e._id===t}));o.splice(c,1),E(o);break;case"update":var i=o.findIndex((function(e){return e._id===t}));o[i]=Object(n.a)({},a),o.sort((function(e,t){return new Date(t.transactionDate)-new Date(e.transactionDate)})),E(o);break;case"create":o.push(Object(n.a)({},a)),o.sort((function(e,t){return new Date(t.transactionDate)-new Date(e.transactionDate)})),E(o)}};return i.a.createElement(c.Fragment,null,i.a.createElement("div",{className:U.a["record-container"]},i.a.createElement("h2",null,e.patientInfo[0].caseCode+" "+e.patientInfo[0].chineseName+"("+e.patientInfo[0].englishName+")"),i.a.createElement(W.a,{show:s.open,modalClosed:P},i.a.createElement(c.Suspense,{fallback:i.a.createElement("div",null,"Loading...")},i.a.createElement(X,{token:localStorage.getItem("dispenseToken"),cancelModal:P,patientId:e.patientId,transactionId:s.transactionId,entryChangeHandler:B}))),i.a.createElement(W.a,{show:m.open,modalClosed:V},w?i.a.createElement(L.a,null):i.a.createElement(c.Fragment,null,i.a.createElement("p",{style:{fontSize:"large"}},"Are you sure you want to delete this transaction entry?"),i.a.createElement(F,{buttonNames:["Delete","Cancel"],action:function(){var e={query:"\n                 mutation DeleteTransaction($transactionId:ID!) {\n                   deleteTransaction(_id:$transactionId)\n                 }\n              ",variables:{transactionId:m.transactionId}};_(!0),fetch(J.graphqlServerUrl,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){_(!1),V(),B("delete",m.transactionId,null)})).catch((function(e){alert(e),_(!1)}))},cancel:V}))),i.a.createElement("div",{className:U.a["icon-container"]},i.a.createElement($.a,{onClick:function(){return R(null)}},i.a.createElement(D.a,{style:{fill:"green",cursor:"pointer"}})),i.a.createElement("span",null,"Add new entry")),v&&0===v.length?i.a.createElement("p",null,"The patient does not have any transaction record."):i.a.createElement(x,{component:T.a,style:{maxHeight:450}},i.a.createElement(g,{stickyHeader:!0,className:t.table,"aria-label":"simple table"},i.a.createElement(N,null,i.a.createElement(z,null,i.a.createElement(k,{align:"center"},"Edit"),i.a.createElement(k,{align:"center"},"Print"),Object(r.a)(Array(M)).map((function(e,t){return i.a.createElement(c.Fragment,{key:t},i.a.createElement(k,{align:"right"},"Drug\xa0Item\xa0",t+1),i.a.createElement(k,{align:"right"},"Drug\xa0Item\xa0",t+1,"\xa0Qty"))})),i.a.createElement(k,{align:"right"},"Paid\xa0Amount\xa0"),i.a.createElement(k,{align:"right"},"Transaction\xa0Date\xa0"))),i.a.createElement(y,null,v?v.map((function(e,t){return i.a.createElement(z,{key:e._id,style:t%2?{background:"#e9e9e9"}:{background:"white"}},i.a.createElement(k,{align:"center"},i.a.createElement($.a,{onClick:function(){return R(e._id)}},i.a.createElement(A.a,{style:{fill:"#1053ab",cursor:"pointer"}})),i.a.createElement($.a,{onClick:function(){return t=e._id,void f({open:!0,transactionId:t});var t}},i.a.createElement(q.a,{style:{fill:"black",cursor:"pointer"}}))),i.a.createElement(k,{align:"center"},i.a.createElement($.a,{onClick:function(){return t=e._id,void window.open("/print/"+t,"_blank","noopener,noreferrer");var t}},i.a.createElement(S.a,{style:{fill:"#ab9910",cursor:"pointer"}}))),Object(r.a)(Array(M)).map((function(t,a){return i.a.createElement(c.Fragment,{key:a},i.a.createElement(k,{align:"right"},a>=e.drugs?null:e.drugs[a]),i.a.createElement(k,{align:"right"},a>=e.quantities?null:e.quantities[a]))})),i.a.createElement(k,{align:"right"},e.amount),i.a.createElement(k,{align:"right"},e.transactionDate.substring(0,10)))})):null)))))}}}]);
//# sourceMappingURL=4.19838be8.chunk.js.map