(this.webpackJsonpdispense=this.webpackJsonpdispense||[]).push([[0],{103:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(95),c=t.n(o),l=t(71),i=t(131),s=t.n(i),u=t(235);a.a=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(l.a,{show:e.show}),r.a.createElement("div",{className:c.a.Modal,style:{display:e.show?"block":"none",transform:e.show?"translateY(0)":"translateY(-100vh)",opacity:e.show?"1":"0",width:e.width,height:e.height}},r.a.createElement("div",{className:c.a["close-icon-container"]},r.a.createElement(u.a,{onClick:e.modalClosed},r.a.createElement(s.a,{style:{cursor:"pointer"}}))),e.children))}},11:function(e,a,t){e.exports={"form-container":"PersonalInfo_form-container__2QQ0t","info-item":"PersonalInfo_info-item__rP1KZ",NKDA_item:"PersonalInfo_NKDA_item__1FdCt",error:"PersonalInfo_error__24V_t","success-text":"PersonalInfo_success-text__1kTOT"}},128:function(e,a,t){e.exports={Backdrop:"Backdrop_Backdrop__1Ovz0"}},129:function(e,a,t){e.exports={main_container:"Main_main_container__3lk47"}},130:function(e,a,t){"use strict";t.r(a);var n=t(66),r=t(16),o=t(8),c=t(0),l=t.n(c),i=t(103),s=t(36),u=t(133),m=t.n(u),d=t(21),g=t(11),f=t.n(g),p={caseCode:{touched:!1,error:!1,value:""},chineseName:{touched:!1,error:!1,value:""},englishName:{touched:!1,error:!1,value:""},age:{touched:!1,error:!1,value:""},contactNumber:{touched:!1,error:!1,value:""},dateOfRegistration:{touched:!1,error:!1,value:""},address:{touched:!1,error:!1,value:""},allergy:{touched:!1,error:!1,value:""},adverseDrugReaction:{touched:!1,error:!1,value:""},remark:{touched:!1,error:!1,value:""}};a.default=function(e){var a=Object(c.useState)(p),t=Object(o.a)(a,2),u=t[0],g=t[1],h=Object(c.useState)(!1),v=Object(o.a)(h,2),E=v[0],b=v[1],N=Object(c.useState)(!1),_=Object(o.a)(N,2),k=_[0],w=_[1];Object(c.useEffect)((function(){if(/[\/]patient[\/]existing[\/].+/.test(window.location.pathname)){var e={query:'  \n             query {\n               patients(_id:"'.concat(window.location.pathname.split("/")[3],'") {\n                caseCode\n                chineseName \n                englishName\n                age\n                contactNumber\n                dateOfRegistration\n                address\n                allergy\n                adverseDrugReaction\n                remark\n                updatedAt\n               }\n             }\n          ')};b(!0),fetch(d.graphqlServerUrl,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){return 200!==e.status&&201!==e.status&&(b(!1),alert("error")),e.json()})).then((function(e){g({caseCode:{touched:!1,error:!1,value:e.data.patients[0].caseCode},chineseName:{touched:!1,error:!1,value:e.data.patients[0].chineseName},englishName:{touched:!1,error:!1,value:e.data.patients[0].englishName},age:{touched:!1,error:!1,value:e.data.patients[0].age},contactNumber:{touched:!1,error:!1,value:e.data.patients[0].contactNumber},dateOfRegistration:{touched:!1,error:!1,value:e.data.patients[0].dateOfRegistration?new Date(e.data.patients[0].dateOfRegistration).toISOString().substring(0,10):""},address:{touched:!1,error:!1,value:e.data.patients[0].address},allergy:{touched:!1,error:!1,value:e.data.patients[0].allergy},adverseDrugReaction:{touched:!1,error:!1,value:e.data.patients[0].adverseDrugReaction},remark:{touched:!1,error:!1,value:e.data.patients[0].remark}}),b(!1)})).catch((function(e){b(!1),alert(e)}))}else g(p)}),[window.location.pathname]);var O=function(e,a){g(Object(r.a)(Object(r.a)({},u),{},Object(n.a)({},e,{touched:!0,value:a.target.value,error:y(e,a.target.value)})))},y=function(e,a){var t=!1;if("age"===e)t=!(a&&a.replaceAll(" ","").length>0&&+a>=0&&+a<=120);else if("contactNumber"===e){t=!new RegExp(/^\+?[0-9]+$/).test(a.replaceAll(" ",""))}else"caseCode"===e&&(t=0===a.replaceAll(" ","").length);return t},j=function(){w(!1)},S=l.a.createElement("p",{style:{color:"#f44336",margin:"2px"}},"Invalid");return l.a.createElement(c.Fragment,null,E?l.a.createElement("div",{className:f.a["form-container"]}," ",l.a.createElement(s.a,null)," "):l.a.createElement("form",{className:f.a["form-container"],onSubmit:function(a){a.preventDefault();var t="";u.dateOfRegistration.value.length>0&&(t=new Date(u.dateOfRegistration.value).toISOString());var n,o=m()(u),c=!1;for(var l in o)c=c||y(l,o[l].value),o[l].touched=!0,o[l].error=y(l,o[l].value);c?g(Object(r.a)({},o)):(n="/patient/new"===e.routeName?{query:'\n           mutation {\n            createPatient (\n               patientInfoInput:{\n                caseCode: "'.concat(u.caseCode.value,'" ,\n                chineseName:"').concat(u.chineseName.value,'",\n                englishName: "').concat(u.englishName.value,'",\n                age:"').concat(String.valueOf(u.age.value),'",\n                contactNumber:"').concat(u.contactNumber.value,'",\n                dateOfRegistration:"').concat(t,'",\n                address: "').concat(u.address.value,'",\n                allergy: "').concat(u.allergy.value,'",\n                adverseDrugReaction: "').concat(u.adverseDrugReaction.value,'",\n                remark: "').concat(u.remark.value,'"           \n                }) {\n               age\n             }\n           }\n        ')}:{query:'\n           mutation {\n            updatePatient (\n              _id:"'.concat(window.location.pathname.split("/")[3],'",\n               patientInfoInput:{\n                caseCode: "').concat(u.caseCode.value,'" ,\n                chineseName:"').concat(u.chineseName.value,'",\n                englishName: "').concat(u.englishName.value,'",\n                age:"').concat(u.age.value,'",\n                contactNumber:"').concat(u.contactNumber.value,'",\n                dateOfRegistration:"').concat(t,'",\n                address: "').concat(u.address.value,'",\n                allergy: "').concat(u.allergy.value,'",\n                adverseDrugReaction: "').concat(u.adverseDrugReaction.value,'",\n                remark: "').concat(u.remark.value,'"           \n                }) {\n               age\n             }\n           }\n        ')},b(!0),fetch(d.graphqlServerUrl,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(a){a.errors?alert(a.errors):"/patient/new"===e.routeName?(w(!0),g(p)):(e.updateInfo(window.location.pathname.split("/")[3],{caseCode:o.caseCode.value,englishName:o.englishName.value,chineseName:u.chineseName.value}),w(!0)),b(!1)})).catch((function(e){b(!1),alert("An unexpected error occured!")})))}},l.a.createElement(i.a,{show:k,modalClosed:j},l.a.createElement("div",{className:f.a["success-text"]},l.a.createElement("p",null,"Success!"),l.a.createElement("button",{type:"button",onClick:j},"Confirm"))),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"caseCode"},"Case Code:"),l.a.createElement("input",{className:u.caseCode.error&&u.caseCode.touched?f.a.error:null,type:"text",id:"caseCode",name:"caseCode",value:u.caseCode.value,onChange:function(e){return O("caseCode",e)}}),u.caseCode.error&&u.caseCode.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"chineseName"},"Chinese Name:"),l.a.createElement("input",{className:u.chineseName.error&&u.chineseName.touched?f.a.error:null,type:"text",id:"chineseName",name:"chineseName",value:u.chineseName.value,onChange:function(e){return O("chineseName",e)}}),u.chineseName.error&&u.chineseName.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"englishName"},"English Name:"),l.a.createElement("input",{className:u.englishName.error&&u.englishName.touched?f.a.error:null,type:"text",id:"englishName",name:"englishName",value:u.englishName.value,onChange:function(e){return O("englishName",e)}}),u.englishName.error&&u.englishName.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"age"},"Age:"),l.a.createElement("input",{className:u.age.error&&u.age.touched?f.a.error:null,type:"number",id:"age",name:"age",value:u.age.value,onChange:function(e){return O("age",e)}}),u.age.error&&u.age.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"contactNumber"},"Contact Number:"),l.a.createElement("input",{className:u.contactNumber.error&&u.contactNumber.touched?f.a.error:null,type:"phone",id:"contactNumber",name:"contactNumber",value:u.contactNumber.value,onChange:function(e){return O("contactNumber",e)}}),u.contactNumber.error&&u.contactNumber.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"regDate"},"Date of Registration"),l.a.createElement("input",{className:u.dateOfRegistration.error&&u.dateOfRegistration.touched?f.a.error:null,type:"date",id:"regDate",name:"regDate",value:u.dateOfRegistration.value,onChange:function(e){return O("dateOfRegistration",e)}}),u.dateOfRegistration.error&&u.dateOfRegistration.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"address"},"Address:"),l.a.createElement("textarea",{className:u.address.error&&u.address.touched?f.a.error:null,type:"text",id:"address",name:"address",value:u.address.value,onChange:function(e){return O("address",e)}}),u.address.error&&u.address.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"allergy"},"Allergy:"),l.a.createElement("div",{className:f.a.NKDA_item,onClick:function(){g(Object(r.a)(Object(r.a)({},u),{},{allergy:Object(r.a)(Object(r.a)({},u.allergy),{},{value:"No Known Drug Allergy"})}))}},"NKDA"),l.a.createElement("textarea",{className:u.allergy.error&&u.allergy.touched?f.a.error:null,id:"allergy",name:"allergy",rows:"4",cols:"20",value:u.allergy.value,onChange:function(e){return O("allergy",e)}}),u.allergy.error&&u.allergy.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"adr"},"Adverse Drug Reaction:"),l.a.createElement("textarea",{className:u.adverseDrugReaction.error&&u.adverseDrugReaction.touched?f.a.error:null,id:"adr",name:"adr",rows:"4",cols:"20",value:u.adverseDrugReaction.value,onChange:function(e){return O("adverseDrugReaction",e)}}),u.adverseDrugReaction.error&&u.adverseDrugReaction.touched?S:null),l.a.createElement("section",{className:f.a["info-item"]},l.a.createElement("label",{htmlFor:"remark"},"Remark:"),l.a.createElement("textarea",{className:u.remark.error&&u.remark.touched?f.a.error:null,id:"remark",name:"remark",rows:"4",cols:"20",value:u.remark.value,onChange:function(e){return O("remark",e)}}),u.remark.error&&u.remark.touched?S:null),l.a.createElement("button",{type:"submit"},"/patient/new"===e.routeName?"Create":"Update")))}},132:function(e,a,t){e.exports={Loader:"Loader_Loader__5YQT7",load6:"Loader_load6__1X31U",round:"Loader_round__1L8ck"}},134:function(e,a,t){e.exports={list:"NavigationItems_list__3Dhpt"}},135:function(e,a,t){e.exports={"main-nav":"EPHeaderNav_main-nav__1cjQF"}},136:function(e,a,t){e.exports={"component-container":"ExistingPatientProfile_component-container__2mEvy"}},138:function(e,a,t){e.exports={Layout:"DrugInfo_Layout__1hcSZ"}},153:function(e,a,t){e.exports=t(234)},158:function(e,a,t){},159:function(e,a,t){},21:function(e,a){a.graphqlServerUrl="https://arcane-earth-96378.herokuapp.com/graphql"},234:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(10),c=t.n(o),l=(t(158),t(8)),i=t(16),s=t(28),u=t(13),m=(t(159),r.a.createContext({token:null,userId:null,login:function(e,a,t){},logout:function(){}})),d=function(e){var a=Object(n.useRef)(null);return Object(n.useEffect)((function(){function t(t){a.current&&!a.current.contains(t.target)?e.cancelShowLogout():a.current&&a.current.contains(t.target)&&e.showLogout()}return document.addEventListener("mousedown",t),function(){document.removeEventListener("mousedown",t)}}),[a]),r.a.createElement("div",{ref:a},e.children)},g=t(74),f=t.n(g),p=t(235),h=t(123),v=t.n(h),E=function(e){var a=Object(n.useState)(!1),t=Object(l.a)(a,2),o=t[0],c=t[1],i=Object(n.useContext)(m);return r.a.createElement("div",{className:f.a.Toolbar},r.a.createElement(p.a,{onClick:e.drawerToggleClicked},r.a.createElement(v.a,{style:{fill:"white",cursor:"pointer"}})),r.a.createElement(d,{cancelShowLogout:function(){c(!1)},showLogout:function(){c(!0)}},r.a.createElement("div",{className:f.a.circle},"A"),r.a.createElement("div",{className:f.a.logout,style:{display:o?"block":"none"}},r.a.createElement("ul",null,r.a.createElement("li",{onClick:function(){i.logout()}},"Log out")))))},b=t(124),N=t.n(b),_=t(75),k=t.n(_),w=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:k.a.Logo},r.a.createElement(N.a,{style:{fill:"#ab1032",fontSize:50}}),r.a.createElement("div",null," PHHK")),r.a.createElement("div",null,r.a.createElement("p",{className:k.a["welcome-msg"]},"Welcome, Admin")),r.a.createElement("div",null,r.a.createElement("p",{className:k.a.demo},"Dispense Demo")))},O=t(57),y=t.n(O),j=t(92),S=t.n(j),C=function(e){return r.a.createElement("li",{className:S.a.NavigationItem},r.a.createElement(s.b,{exact:e.exact,to:e.link,activeClassName:S.a.active},r.a.createElement("div",null,e.children)))},I=t(126),x=t.n(I),T=t(125),D=t.n(T),P=t(127),R=t.n(P),L=function(){return r.a.createElement("ul",{className:y.a.NavigationItems},r.a.createElement(C,{link:"/patient/new"},r.a.createElement(D.a,{style:{fontSize:30}}),r.a.createElement("span",{className:y.a.spacer}),"New Patient"),r.a.createElement(C,{link:"/patient/existing"},r.a.createElement(x.a,{style:{fontSize:30}}),r.a.createElement("span",{className:y.a.spacer}),"Existing Patient"),r.a.createElement(C,{link:"/druginfo"},r.a.createElement(R.a,{style:{fontSize:30}}),r.a.createElement("span",{className:y.a.spacer}),"Drug Information"))},F=t(41),A=t.n(F),q=t(71),H=function(e){var a;return a=e.show?[A.a.SideDrawer,A.a.Open]:[A.a.SideDrawer,A.a.Close],r.a.createElement(n.Fragment,null,r.a.createElement(q.a,{show:e.show,clicked:e.closed}),r.a.createElement("div",{className:a.join(" ")},r.a.createElement("div",{className:A.a.Logo},r.a.createElement(w,null)),r.a.createElement("div",{className:A.a.spacer}),r.a.createElement("nav",null,r.a.createElement(L,null))))},z=function(e){var a=Object(n.useState)(!1),t=Object(l.a)(a,2),o=t[0],c=t[1];return r.a.createElement(n.Fragment,null,r.a.createElement(E,{drawerToggleClicked:function(){c(!o)}}),r.a.createElement(H,{show:o,closed:function(){c(!1)}}),e.children)},B=t(129),U=t.n(B),W=t(76),J=t.n(W),K=t(130),M=function(e){return r.a.createElement("div",{className:J.a["new-patient-container"]},r.a.createElement("div",{className:J.a.background}),r.a.createElement("div",{className:J.a["personal-info-container"]},r.a.createElement(K.default,{routeName:"/patient/new",token:e.token})))},Q=t(52),Y=t(21),Z=t(134),G=t.n(Z),V=t(96),X=t.n(V),$=function(e){return r.a.createElement("li",{className:X.a.NavigationItem},r.a.createElement(s.b,{to:e.link,activeClassName:X.a.active},e.children))},ee=function(e){var a=Object(n.useState)(""),t=Object(l.a)(a,2),o=t[0],c=t[1];return Object(n.useEffect)((function(){c(e.patientBriefInfo)}),[e]),r.a.createElement("ul",{onClick:e.click,className:G.a.list},o?o.map((function(e,a){return r.a.createElement($,{link:"/patient/existing/"+e._id,key:a},e.caseCode+" "+e.chineseName+"("+e.englishName+")")})):null)},ae=t(58),te=t.n(ae),ne=t(97),re=t.n(ne),oe=function(e){return r.a.createElement("li",{className:re.a.NavigationItem,onClick:function(){return e.onNavHandler(e.id)}},r.a.createElement("button",{className:e.id==e.clickedHeader?re.a.active:null},function(e){switch(e){case"personalinfo":return"Personal Information";case"transactionrecord":return"Transaction Record"}}(e.id)))},ce=t(135),le=t.n(ce),ie=function(e){var a=window.location.pathname.split("/")[3],t=[{id:"personalinfo",text:"Personal Information",link:"/patient/existing/".concat(a,"/personalinfo"),auth:!0},{id:"transactionrecord",text:"Transaction Record",link:"/patient/existing/".concat(a,"/transactionrecord"),auth:!0}];return r.a.createElement("nav",null,r.a.createElement("ul",{className:le.a["main-nav"]},t.map((function(a){return r.a.createElement(oe,{clickedHeader:e.clickedHeader,onNavHandler:e.onNavHandler,key:a.id,id:a.id,link:a.link,text:a.text})}))))},se=t(136),ue=t.n(se),me=r.a.lazy((function(){return t.e(4).then(t.bind(null,713))})),de=r.a.lazy((function(){return Promise.resolve().then(t.bind(null,130))})),ge=r.a.memo((function(e){var a=Object(n.useState)("personalinfo"),t=Object(l.a)(a,2),o=t[0],c=t[1],i=Object(n.useState)(""),s=Object(l.a)(i,2),u=s[0],m=s[1];Object(n.useEffect)((function(){var e={query:'  \n                 query {\n                   patients(_id:"'.concat(window.location.pathname.split("/")[3],'") {\n                    caseCode\n                    chineseName \n                    englishName\n                   }\n                 }\n              ')};fetch(Y.graphqlServerUrl,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){m([].concat(Object(Q.a)(e.data.patients),[{_id:window.location.pathname.split("/")[3]}]))})).catch((function(e){alert("An unexpected error occured!")}))}),[window.location.pathname]);return r.a.createElement("section",null,r.a.createElement(ie,{onNavHandler:function(e){c(e)},clickedHeader:o}),r.a.createElement("div",{className:ue.a["component-container"]},"personalinfo"===o?r.a.createElement(n.Suspense,{fallback:r.a.createElement("h1",null,"loading...")},r.a.createElement(de,Object.assign({token:localStorage.getItem("dispenseToken"),updateInfo:e.updateInfo},e,{routeName:"/patient/existing"}))):null,"transactionrecord"===o?r.a.createElement(n.Suspense,{fallback:r.a.createElement("h1",null,"loading...")},r.a.createElement(me,Object.assign({token:localStorage.getItem("dispenseToken"),patientInfo:u,patientId:window.location.pathname.split("/")[3]},e))):null))})),fe=t(36),pe=function(e){var a=Object(n.useState)(""),t=Object(l.a)(a,2),o=t[0],c=t[1],s=Object(n.useState)(!1),m=Object(l.a)(s,2),d=m[0],g=m[1],f=Object(n.useState)(!1),p=Object(l.a)(f,2),h=p[0],v=p[1];Object(n.useEffect)((function(){v(!0),fetch(Y.graphqlServerUrl,{method:"POST",body:JSON.stringify({query:"\n                 query {\n                   patients {\n                    _id\n                    caseCode\n                    chineseName \n                    englishName\n                   }\n                 }\n              "}),headers:{"Content-Type":"application/json",Authorization:"Bearer "+e.token}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){c(Object(Q.a)(e.data.patients)),v(!1)})).catch((function(e){v(!1)}))}),[]);var E=function(e,a){var t=Object(Q.a)(o),n=t.findIndex((function(a){return a._id===e}));t[n]=Object(i.a)(Object(i.a)({},a),{},{_id:e}),c(t)};return r.a.createElement("div",{className:te.a["main-container"]},r.a.createElement("div",null,r.a.createElement("p",{className:te.a["sidebar-header"]},"Patient List"),r.a.createElement("nav",{className:te.a.sidebar},h?r.a.createElement(fe.a,null):r.a.createElement(ee,{patientBriefInfo:o,click:function(){g(!0)}}))),r.a.createElement("div",{className:te.a["main-content"]},d?r.a.createElement(u.b,{exact:!0,path:"/patient/existing/:id",render:function(e){return r.a.createElement(ge,Object.assign({token:e.token,updateInfo:E},e))}}):null))},he=t(282),ve=t(283),Ee=t(276),be=t(277),Ne=t(273),_e=t(274),ke=t(275),we=t(293),Oe=t(289),ye=Object(Ne.a)((function(e){return{table:{marginTop:e.spacing(3),"& thead th":{fontWeight:"600",color:"#ffffff",backgroundColor:"#f5073b",align:"left",width:"100"},"& tbody td":{fontWeight:"300",align:"left",width:"100"},"& tbody tr:hover":{backgroundColor:"#fffbf2",cursor:"pointer"}}}}));function je(e,a,t){var o=ye(),c=[5,10,15],i=Object(n.useState)(0),s=Object(l.a)(i,2),u=s[0],m=s[1],d=Object(n.useState)(c[u]),g=Object(l.a)(d,2),f=g[0],p=g[1],h=Object(n.useState)(),v=Object(l.a)(h,2),E=v[0],b=v[1],N=Object(n.useState)(),_=Object(l.a)(N,2),k=_[0],w=_[1],O=function(e,a){m(a)},y=function(e){p(parseInt(e.target.value,10)),m(0)},j=function(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0};return{TblContainer:function(e){return r.a.createElement(_e.a,{stickyHeader:!0,className:o.table},e.children)},TblHead:function(e){return r.a.createElement(ke.a,null,r.a.createElement(Ee.a,null,a.map((function(e){return r.a.createElement(be.a,{key:e.id,sortDirection:k===e.id&&E},e.disableSorting?e.label:r.a.createElement(we.a,{active:k===e.id,direction:k===e.id?E:"asc",onClick:function(){var a;a=e.id,b(k===a&&"asc"===E?"desc":"asc"),w(a)}},e.label))}))))},TblPagination:function(){return r.a.createElement(Oe.a,{component:"div",page:u,rowsPerPageOptions:c,rowsPerPage:f,count:e?e.length:0,onChangePage:O,onChangeRowsPerPage:y})},recordsAfterPaginationAndSorting:function(){return function(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var n=a(e[0],t[0]);return 0!==n?n:e[1]-t[1]})),t.map((function(e){return e[0]}))}(t.fn(e),function(e,a){return"desc"===e?function(e,t){return j(e,t,a)}:function(e,t){return-j(e,t,a)}}(E,k)).slice(u*f,(u+1)*f)}}}var Se=t(138),Ce=t.n(Se),Ie=[{id:"name",label:"Drug Item"},{id:"price",label:"Price"},{id:"quantity",label:"Available Quantity"}],xe=function(e){var a=Object(n.useState)([{name:"Loading",price:"",quantity:""}]),t=Object(l.a)(a,2),o=t[0],c=t[1],i=Object(n.useState)({fn:function(e){return e},value:null}),s=Object(l.a)(i,2),u=s[0],m=s[1],d=je(o,Ie,u),g=d.TblContainer,f=d.TblHead,p=d.TblPagination,h=d.recordsAfterPaginationAndSorting;Object(n.useEffect)((function(){fetch(Y.graphqlServerUrl,{method:"POST",body:JSON.stringify({query:"\n                 query Drugs {\n                   drugs{\n                       _id\n                       name \n                       price\n                       quantity\n                   }\n                 }\n              "}),headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("dispenseToken")}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){e.data.drugs.map((function(e){e.price=+e.price})),c(e.data.drugs)})).catch((function(e){alert(e)}))}),[]);return r.a.createElement("div",{className:Ce.a.Layout},r.a.createElement("textarea",{value:u.value,placeholder:"Search",rows:"1",cols:"160",onChange:function(e){var a=e.target;m({fn:function(e){return""===a.value?e:(console.log(e[0].name.toLowerCase()),e.filter((function(e){return e.name.toLowerCase().includes(a.value.toLowerCase())})))},value:a.value})}}),r.a.createElement(he.a,null,r.a.createElement(g,null,r.a.createElement(f,null),r.a.createElement(ve.a,null,h().map((function(e){return r.a.createElement(Ee.a,{key:e._id},r.a.createElement(be.a,null,e.name),r.a.createElement(be.a,null,e.price),r.a.createElement(be.a,null,e.quantity))})))),r.a.createElement(p,null)))},Te=function(e){return r.a.createElement(n.Fragment,null,null!=localStorage.getItem("dispenseToken")&&"null"!=localStorage.getItem("dispenseToken")?r.a.createElement(z,null,r.a.createElement("main",{className:U.a.main_container},r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/patient/new",render:function(e){return r.a.createElement(M,Object.assign({},e,{token:localStorage.getItem("dispenseToken"),routeName:"/patient/new"}))}}),r.a.createElement(u.b,{path:"/patient/existing",render:function(e){return r.a.createElement(pe,Object.assign({token:localStorage.getItem("dispenseToken")},e,{routeName:"/patient/existing"}))}}),r.a.createElement(u.b,{path:"/druginfo",render:function(e){return r.a.createElement(xe,Object.assign({token:localStorage.getItem("dispenseToken")},e))}})))):r.a.createElement(u.a,{to:"/signin"}))},De=t(291),Pe=t(286),Re=t(285),Le=t(290),Fe=t(288),Ae=t(139),qe=t.n(Ae),He=t(278),ze=t(284),Be=Object(Ne.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function Ue(e){var a=Be(),t=Object(n.useState)(!1),o=Object(l.a)(t,2),c=o[0],i=o[1],s=Object(n.useRef)(),d=Object(n.useRef)(),g=Object(n.useContext)(m),f=(Object(u.g)(),function(e){e.preventDefault();var a=s.current.value,t=d.current.value,n={query:'\n         query {\n           login (email: "'.concat(a,'", password: "').concat(t,'") {\n             userId\n             token\n             tokenExpiration\n           }\n         }\n      ')};i(!0),fetch(Y.graphqlServerUrl,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){e.data.login.token&&g.login(e.data.login.token,e.data.login.userId,e.data.login.tokenExpiration)})).catch((function(e){i(!1),alert("Incorrect email or password!")}))});return r.a.createElement(m.Consumer,null,(function(e){return e.token?r.a.createElement(u.a,{to:"/"}):r.a.createElement(ze.a,{component:"main",maxWidth:"xs"},c?r.a.createElement(fe.a,null):null,r.a.createElement(Re.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(De.a,{className:a.avatar},r.a.createElement(qe.a,null)),r.a.createElement(He.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement("form",{className:a.form,noValidate:!0,onSubmit:f},r.a.createElement(Le.a,{variant:"outlined",margin:"normal",inputRef:s,required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),r.a.createElement(Le.a,{variant:"outlined",margin:"normal",inputRef:d,required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),r.a.createElement(Pe.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit},"Sign In"))),r.a.createElement(Fe.a,{mt:8}),r.a.createElement("p",null,"(For demo purpose)You can use test@test.com as the email and 123456 as the password"))}))}var We=r.a.lazy((function(){return Promise.all([t.e(2),t.e(5)]).then(t.bind(null,711))})),Je=function(e,a){switch(a.type){case"Login":return localStorage.setItem("dispenseToken",a.token),Object(i.a)(Object(i.a)({},e),{},{token:a.token,userId:a.userId});case"Logout":return localStorage.removeItem("dispenseToken"),Object(i.a)(Object(i.a)({},e),{},{token:null,userId:null});default:throw new Error("Should not get there!")}},Ke=function(e){var a=Object(n.useReducer)(Je,{}),t=Object(l.a)(a,2),o=t[0],c=t[1];Object(n.useEffect)((function(){document.title="Dispense"}),[]);return r.a.createElement(s.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(m.Provider,{value:{token:o.token,userId:o.userId,login:function(e,a,t){c({type:"Login",token:e,userId:a})},logout:function(){c({type:"Logout"})}}},r.a.createElement("main",null,r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/signin",render:function(e){return r.a.createElement(Ue,e)}}),r.a.createElement(u.b,{path:"/print",render:function(e){return r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(We,null))}}),r.a.createElement(u.b,{path:"/",render:function(e){return r.a.createElement(Te,e)}}),r.a.createElement(u.a,{to:"/"}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ke,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},36:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(132),c=t.n(o);a.a=function(e){return r.a.createElement("div",{className:c.a.Loader},"Loading...")}},41:function(e,a,t){e.exports={SideDrawer:"SideDrawer_SideDrawer__1FLmz",Open:"SideDrawer_Open__1HvEi",Close:"SideDrawer_Close__2M6UG",spacer:"SideDrawer_spacer__1DPvu"}},57:function(e,a,t){e.exports={NavigationItems:"NavigationItems_NavigationItems__1fvrF",spacer:"NavigationItems_spacer__F1HBf"}},58:function(e,a,t){e.exports={"main-container":"ExistingPatient_main-container__syIGb",sidebar:"ExistingPatient_sidebar__3PZ9k","sidebar-header":"ExistingPatient_sidebar-header__3cHRe"}},71:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(128),c=t.n(o);a.a=function(e){return e.show?r.a.createElement("div",{className:c.a.Backdrop,onClick:e.clicked}):null}},74:function(e,a,t){e.exports={Toolbar:"Toolbar_Toolbar__12p80",circle:"Toolbar_circle__UcnzW",logout:"Toolbar_logout__dpzyF"}},75:function(e,a,t){e.exports={Logo:"Logo_Logo__3c4-b","welcome-msg":"Logo_welcome-msg__y2J9L",demo:"Logo_demo__3DcFA"}},76:function(e,a,t){e.exports={"new-patient-container":"NewPatient_new-patient-container__1I9xr","personal-info-container":"NewPatient_personal-info-container__3Zj-v",background:"NewPatient_background__3Tu4d"}},92:function(e,a,t){e.exports={NavigationItem:"NavigationItem_NavigationItem__32yG2",active:"NavigationItem_active__XopZo"}},95:function(e,a,t){e.exports={Modal:"Modal_Modal__35rfT","close-icon-container":"Modal_close-icon-container__2dioi"}},96:function(e,a,t){e.exports={NavigationItem:"NavigationItem_NavigationItem__Y3yKC",active:"NavigationItem_active__rgK2T",spacer:"NavigationItem_spacer__cHSST"}},97:function(e,a,t){e.exports={NavigationItem:"NavigationItem_NavigationItem__1eRaQ",active:"NavigationItem_active__1Y64k"}}},[[153,1,3]]]);
//# sourceMappingURL=main.d1fc8809.chunk.js.map