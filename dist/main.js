(()=>{"use strict";var t={208:(t,n,e)=>{e.d(n,{A:()=>x});var o=e(601),r=e.n(o),i=e(314),a=e.n(i),s=e(417),c=e.n(s),l=new URL(e(779),e.b),d=new URL(e(3),e.b),u=new URL(e(644),e.b),h=new URL(e(522),e.b),p=new URL(e(428),e.b),f=new URL(e(298),e.b),g=a()(r()),m=c()(l),b=c()(d),y=c()(u),v=c()(h),w=c()(p),k=c()(f);g.push([t.id,`/* clears */\nbody, h2, h1, h3{\n    margin: 0;\n}\n\n/* and setup */\n@font-face{\n    font-family: "Roboto-Reg";\n    src: \n    url(${m}) format(woff2),\n    url(${b}) format(woff);\n    font-weight: normal;\n    font-style: normal;\n}\n@font-face{\n    font-family: "Roboto-Light";\n    src: \n    url(${y}) format(woff2),\n    url(${v}) format(woff);\n    font-weight: normal;\n    font-style: normal;\n}\n@font-face{\n    font-family: "Roboto-Med";\n    src: \n    url(${w}) format(woff2),\n    url(${k}) format(woff);\n    font-weight: normal;\n    font-style: normal;\n}\n\n:root{\n    box-sizing: border-box;\n\n    font-family: "Roboto-Reg", Arial, Helvetica, sans-serif;\n}\n\n\n\n\n.content{\n    height: max(100vh, 12rem);\n    width: max(100vw, 100ch);\n\n    display: grid;\n    grid-template-columns: 25ch 1fr;\n\n    grid-template-rows: auto 1fr;\n\n}\n\n\nheader{\n    grid-column: span 2;\n\n    /* k i've just noticed that for some reason having this padding makes the page overflow\n    a tiny bit to the right?? \n    but not if it zooms out a bit. BUT it still has room to shrink \n    i could probably hack it by padding the insides only but that SHOULDNT BE NECESSARY*/\n    padding: 1.5ch;\n    /* so this right padding is an extra hacky way to just help it not look as bad but\n    theres still a SCROLL BAR WHERE THERE SHOULDNT BE */\n    padding-right: 3ch;\n\n    font-size: 1.5rem;\n\n\n    display: flex;\n    justify-content: space-between;\n    \n    /* temp */\n    background-color: rgb(161, 231, 231);\n}\n\n/* contains logo image and name */\n.branding{\n    font-family: "Roboto-Med", Arial, Helvetica, sans-serif;\n\n    /* this doesn't seem necessary but does instantaneously make them line up neatly\n    whereas otherwise they were unaligned vertically. so */\n    display: flex;\n    gap: 0.2ch;\n}\n\n.branding > img{\n    width: 2ch;\n    height: auto;\n}\n\n\n\n.sidebar{\n    display: flex;\n    flex-direction: column;\n\n    /* justify-content: space-between; */\n\n\n    padding: 3.5ch 2ch 3.5ch 3.5ch;\n\n    background-color: rgb(219, 250, 255)\n}\n\n.projectList{\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n}\n\n.sidebar h2{\n    /* font-family: "Roboto-Med", Arial, Helvetica, sans-serif;\n    font-weight: normal; */\n    font-size: 1rem;\n\n    /* every time i bold things in roboto i feel it looks just a lil weird spacing-wise */\n    letter-spacing: 0.07ch;\n}\n\n.projectGroup{\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n\n    margin-bottom: 0.5rem;\n}\n\n/* the new-task/new-project buttons */\n.addButtons{\n    /* padding-top: 5rem; */\n\n    display: flex;\n    /* justify-content: end; */\n    gap: 2ch;\n\n    position: fixed;\n    bottom: 3vh;\n    left: 12ch;\n}\n\n.addButtons > img{\n    width: 4ch;\n    height: auto;\n}\n\n\n\n\n\n.mainContent{\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n\n    padding: 5ch;\n    padding-top: 7ch;\n\n    max-width: 85ch;\n\n    \n}\n\n.mainContent > h1{\n    font-size: 1.5rem;\n}\n\n/* the check/title/date part of a task */\n.taskMain{\n    display: grid;\n    grid-template-columns: 3ch 1fr 15ch 2ch;\n    gap: 1.5ch;\n\n    padding: 1ch;\n    border-radius: 7px;\n    /* this padding is because of the priority line */\n    padding-left: 2.5ch;\n    box-shadow: inset gray 30px 0 0 -20px;\n\n    background-color: gray;\n}\n\n.taskMain > img{\n    width: 3ch;\n    height: auto;\n}\n\n.taskMain .taskTitle{\n    font-size: 1.25rem;\n}\n\n/* these are applied only TO 'taskMain's */\n.priorityHigh{\n    box-shadow: inset rgb(185, 90, 90) 30px 0 0 -20px;\n    background-color: rgb(241, 208, 197);\n}\n\n.priorityMed{\n    box-shadow: inset rgb(233, 202, 134) 30px 0 0 -20px;\n    background-color: rgb(241, 230, 197);\n}\n\n.priorityLow{\n    box-shadow: inset rgb(136, 185, 90) 30px 0 0 -20px;\n    background-color: rgb(218, 241, 197);\n}\n\n\n/* the stuff below main task, descriptions/subtasks */\n.taskExtra{\n    display: flex;\n    flex-direction: column;\n\n    padding: 1rem 6ch 0rem 4ch;\n\n    gap: 2ch;\n\n    /* color: rgb(40, 40, 40); */\n    /* background-color: gainsboro; */\n}\n\n/* the subtasks */\n.subTask{\n    display: flex;\n\n    gap: 1ch;\n}\n\n.subTask > img{\n    width: 2ch;\n    height: auto;\n}\n\n\n\n/* this needs like. much reworking. but. rn more for function */\nform{\n    display: grid;\n\n    grid-template-columns: 24ch 16ch;\n    gap: 1ch;\n\n\n    /* width: 350px; */\n}\n\nform > h3{\n    grid-column: span 2;\n}\n\n#taskDesc, #taskSub0{\n    grid-column: span 2;\n}\n\n\ninput, select, textarea{\n    font-size: 1rem;\n}\n\nselect{\n    /* width: 80px; */\n\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\ntextarea{\n    resize: none;\n}\n\n/* this is the div that contains a subtask input and it's associated delete button */\n.formSubTask{\n    display: flex;\n    gap: 1ch;\n\n    grid-column: span 2;\n}\n\n\n\n.projectGroup div, .mainContent img{\n    cursor: grab;\n}\n\n\n/* so we have 3 main 'parts' of the page (header, sidebar, main)\nheader stays the same height unless font changes\nsidebar expands vertically to fill space, and horizontally only under extreme font changes\nmain expands... okay so like.\nthe actual LIST part of main expands based on space/font but only to a certain extent,\nprobably capped based on font\nthe 'background' part of main just fills space but i don't know if that will even 'exist'\nenough to count of if it's basically just body.background\n\nheader's minimum width should probably be whatever the mid width for the rest of everything\nelse is, so NOT set directly?\n*/`,""]);const x=g},314:t=>{t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e="",o=void 0!==n[5];return n[4]&&(e+="@supports (".concat(n[4],") {")),n[2]&&(e+="@media ".concat(n[2]," {")),o&&(e+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),e+=t(n),o&&(e+="}"),n[2]&&(e+="}"),n[4]&&(e+="}"),e})).join("")},n.i=function(t,e,o,r,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);o&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),e&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=e):d[2]=e),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),n.push(d))}},n}},417:t=>{t.exports=function(t,n){return n||(n={}),t?(t=String(t.__esModule?t.default:t),/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),n.hash&&(t+=n.hash),/["'() \t\n]|(%20)/.test(t)||n.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t):t}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var n=[];function e(t){for(var e=-1,o=0;o<n.length;o++)if(n[o].identifier===t){e=o;break}return e}function o(t,o){for(var i={},a=[],s=0;s<t.length;s++){var c=t[s],l=o.base?c[0]+o.base:c[0],d=i[l]||0,u="".concat(l," ").concat(d);i[l]=d+1;var h=e(u),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)n[h].references++,n[h].updater(p);else{var f=r(p,o);o.byIndex=s,n.splice(s,0,{identifier:u,updater:f,references:1})}a.push(u)}return a}function r(t,n){var e=n.domAPI(n);return e.update(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap&&n.supports===t.supports&&n.layer===t.layer)return;e.update(t=n)}else e.remove()}}t.exports=function(t,r){var i=o(t=t||[],r=r||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var s=e(i[a]);n[s].references--}for(var c=o(t,r),l=0;l<i.length;l++){var d=e(i[l]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}i=c}}},659:t=>{var n={};t.exports=function(t,e){var o=function(t){if(void 0===n[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}n[t]=e}return n[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}},540:t=>{t.exports=function(t){var n=document.createElement("style");return t.setAttributes(n,t.attributes),t.insert(n,t.options),n}},56:(t,n,e)=>{t.exports=function(t){var n=e.nc;n&&t.setAttribute("nonce",n)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=t.insertStyleElement(t);return{update:function(e){!function(t,n,e){var o="";e.supports&&(o+="@supports (".concat(e.supports,") {")),e.media&&(o+="@media ".concat(e.media," {"));var r=void 0!==e.layer;r&&(o+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),o+=e.css,r&&(o+="}"),e.media&&(o+="}"),e.supports&&(o+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(o,t,n.options)}(n,t,e)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)}}}},113:t=>{t.exports=function(t,n){if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}},298:(t,n,e)=>{t.exports=e.p+"23e2f4b6435c00ffe8d2.woff"},428:(t,n,e)=>{t.exports=e.p+"24bf1b6dc8deb2e54eb1.woff2"},3:(t,n,e)=>{t.exports=e.p+"84d3d2d3a77091c6e9b3.woff"},779:(t,n,e)=>{t.exports=e.p+"b8f9c5269a646ee92f1b.woff2"},522:(t,n,e)=>{t.exports=e.p+"c82a2ed60a5633f57629.woff"},644:(t,n,e)=>{t.exports=e.p+"af92f31f5ad033a4eb26.woff2"}},n={};function e(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={id:o,exports:{}};return t[o](i,i.exports,e),i.exports}e.m=t,e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!t||!/^http(s?):/.test(t));)t=o[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.b=document.baseURI||self.location.href,e.nc=void 0;var o={};(()=>{e.d(o,{bA:()=>_,bF:()=>J,p8:()=>q,dt:()=>B,SL:()=>F});class t{constructor(t,e,o,r,i,a){this.title=t,this.date=new Date(e),this.date.setHours(0,0,0,0),this.description=i,this.priority=r,this.category=o,o.addTask(this),this.subTasks=[],a&&a.forEach((t=>{this.subTasks.push(new n(t))}))}compareDates(t){const n=[];return t.forEach((t=>{this.date<t?n.push(!0):n.push(!1)})),n}testDisplay(){console.log(this.title),console.log(this.description),console.log("Priority: "+this.priority),console.log("#"+this.category)}}class n{constructor(t){this.title=t,this.complete=!1}setCompletion(){return this.complete?this.complete=!1:this.complete=!0,this.complete}}class r{constructor(t){this.title=t,this.tasks=[]}addTask(t){let n=!1,e=0;for(;e<this.tasks.length&&0==n;)n=i(t,this.tasks[e]),0==n&&(e+=1);this.tasks.splice(e,0,t)}removeTask(t){const n=this.tasks.indexOf(t);n>=0&&this.tasks.splice(n,1)}testDisplay(){console.log("-----"),this.tasks.forEach((t=>console.log(t.title))),console.log("-----")}}function i(t,n){let e=!1;return(t.date<n.date||t.date===n.date&&(t.priority>n.priority||t.priority==n.priority&&t.title.toLowerCase()<n.title.toLowerCase()))&&(e=!0),e}var a=e(72),s=e.n(a),c=e(825),l=e.n(c),d=e(659),u=e.n(d),h=e(56),p=e.n(h),f=e(540),g=e.n(f),m=e(113),b=e.n(m),y=e(208),v={};v.styleTagTransform=b(),v.setAttributes=p(),v.insert=u().bind(null,"head"),v.domAPI=l(),v.insertStyleElement=g(),s()(y.A,v),y.A&&y.A.locals&&y.A.locals;const w=["priorityLow","priorityMed","priorityHigh"],k=document.getElementById("dateNow"),x=document.querySelector(".projectList"),E=document.getElementById("addTaskButton"),T=document.getElementById("addProjectButton"),L=R("div","projectGroup","",x),S=R("div","projectGroup","",x),C=document.querySelector(".mainContent");function j(t,n){R("div","",t.title,n).addEventListener("click",(()=>{D(),M(t)}))}function M(t){R("h1","",t.title,C),t.tasks.forEach((t=>{!function(t){const n=R("div","taskObject","",C),e=R("div","taskMain","",n);e.classList.add(w[t.priority]),R("img","","../src/graphics/checkbox-blank-circle-outline.svg",e).addEventListener("click",(()=>{_(t),n.remove()})),R("div","taskTitle",t.title,e),R("div","",U(t.date),e),R("img","","../src/graphics/dots-vertical.svg",e).addEventListener("click",(()=>{D(),I(t)}));const o=R("div","taskExtra","",n);R("div","",t.description,o),t.subTasks.forEach((t=>{!function(t,n){const e=R("div","subTask","",n);let o;o=t.complete?"../src/graphics/checkbox-outline.svg":"../src/graphics/checkbox-blank-outline.svg";const r=R("img","",o,e);r.addEventListener("click",(()=>{t.setCompletion()?r.src="../src/graphics/checkbox-outline.svg":r.src="../src/graphics/checkbox-blank-outline.svg"})),R("div","",t.title,e)}(t,o)}))}(t)}))}function D(){for(;C.children.length>0;)C.removeChild(C.lastChild)}function R(t,n,e,o){const r=document.createElement(t);return n&&(r.className=n),o&&o.appendChild(r),e&&("img"==t?r.src=e:r.textContent=e),r}function A(t,n,e,o,r){const i=document.createElement("input");return i.type=t,i.id=n,i.name=e,i.required=o,r.appendChild(i),i}function $(t,n,e,o){const r=document.createElement("select");return r.id=t,r.name=n,e.appendChild(r),o.forEach((t=>{const n=document.createElement("option");n.textContent=t[0],n.value=t[1],r.appendChild(n)})),r}function H(t,n,e){const o=R("div","formSubTask","",t),r=A("text","sub"+e,"sub"+e,!1,o);n.push(r);const i=R("button","","-",o);return i.type="button",i.addEventListener("click",(()=>{n.splice(n.indexOf(r),1),t.removeChild(o)})),r}function I(t){const n=R("form","","",C);n.action="javascript:;",n.method="post",n.addEventListener("submit",(n=>{const e=new FormData(n.target);t&&_(t);const o=q([...e.entries()]);D(),M(o)})),R("h3","","New task",n);const e=A("text","taskTitle","title",!0,n),o=A("date","taskDate","date",!0,n),r=[];let i=0;for(let n=0;n<B.length;n++)r.push([B[n].title,n]),t&&B[n].title==t.category.title&&(i=n);$("taskCategory","category",n,r).selectedIndex=i;const a=$("taskPriority","priority",n,[["Low",0],["Medium",1],["High",2]]),s=function(t,n,e,o,r,i){const a=R("textarea");return a.id="taskDesc",a.name="desc",a.placeholder="Description...",a.cols=30,a.rows=4,i.appendChild(a),a}(0,0,0,0,0,n);let c=0;const l=[],d=R("button","","Add Subtask",n);d.type="button",d.addEventListener("click",(()=>{let t=l.length;(0==t||t>0&&""!=l[t-1].value)&&(H(n,l,c),c+=1)})),R("button","","+",n).type="submit",t&&(e.value=t.title,o.value=function(t){let n=t.getDate().toString();1==n.length&&(n="0"+n);let e=(t.getMonth()+1).toString();1==e.length&&(e="0"+e);let o=t.getFullYear().toString();for(;o.length<4;)o="0"+o;return`${o}-${e}-${n}`}(t.date),a.selectedIndex=t.priority,s.value=t.description,t.subTasks.forEach((t=>{H(n,l,c).value=t.title,c+=1})))}const N={0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"},O={0:"Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"June",6:"July",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec"};function U(t){return`${N[t.getDay()]} ${O[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`}console.log("working test");const B=[],F=[];B.push(new r("General"));let P=new r("Proj");B.push(P),new t("last week","2024-03-09",P,2,"these are details",["Sub 1","Sub 2"]),new t("today","2024-03-12",P,1,"these are details"),new t("tomorrow","2024-03-13",P,2,"these are details"),new t("this week","2024-03-16",P,2,"these are details"),new t("over a week","2024-03-22",P,2,"these are details"),new t("late month","2024-03-28",P,2,"these are details");let z=new Date;z.setHours(0,0,0,0);const G=[new Date(z.getFullYear(),z.getMonth(),z.getDate()+1),new Date(z.getFullYear(),z.getMonth(),z.getDate()+7)];function Y(t){const n=t.compareDates(G);for(let e=0;e<F.length;e++)1==n[e]&&F[e].addTask(t)}function q(n){const e=[];for(let t=0;t<5;t++)e.push(n[t][1]);e[2]=B[e[2]];const o=[];if(n.length>5)for(let t=5;t<n.length;t++)""!=n[t][1]&&o.push(n[t][1]);return e.push(o),Y(new t(...e)),e[2]}function J(t){const n=new r(t[1]);return B.push(n),n}function _(t){F.forEach((n=>{n.removeTask(t)})),t.category.removeTask(t)}G.forEach((t=>{t.setHours(0,0,0,0)})),F.push(new r("Today")),F.push(new r("This Week")),B.forEach((t=>{t.tasks.forEach((t=>{Y(t)}))})),function(t){k.textContent=U(t),T.addEventListener("click",(()=>{D(),function(){const t=R("form","","",C);t.action="javascript:;",t.method="post",t.addEventListener("submit",(t=>{const n=J(...new FormData(t.target).entries());D(),j(n,S)})),A("text","taskTitle","title",!0,t),R("button","","sub",t).type="submit"}()})),E.addEventListener("click",(()=>{D(),I()})),R("h2","","Upcoming",L);for(let t=0;t<F.length;t++)j(F[t],L);R("h2","","Projects",S);for(let t=0;t<B.length;t++)j(B[t],S);M(F[0])}(z)})()})();