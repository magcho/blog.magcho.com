(self.webpackChunkmagcho_s_blog=self.webpackChunkmagcho_s_blog||[]).push([[745],{2993:function(t){var e="undefined"!=typeof Element,M="function"==typeof Map,n="function"==typeof Set,L="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function u(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){if(t.constructor!==r.constructor)return!1;var i,c,o,a;if(Array.isArray(t)){if((i=t.length)!=r.length)return!1;for(c=i;0!=c--;)if(!u(t[c],r[c]))return!1;return!0}if(M&&t instanceof Map&&r instanceof Map){if(t.size!==r.size)return!1;for(a=t.entries();!(c=a.next()).done;)if(!r.has(c.value[0]))return!1;for(a=t.entries();!(c=a.next()).done;)if(!u(c.value[1],r.get(c.value[0])))return!1;return!0}if(n&&t instanceof Set&&r instanceof Set){if(t.size!==r.size)return!1;for(a=t.entries();!(c=a.next()).done;)if(!r.has(c.value[0]))return!1;return!0}if(L&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(r)){if((i=t.length)!=r.length)return!1;for(c=i;0!=c--;)if(t[c]!==r[c])return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if((i=(o=Object.keys(t)).length)!==Object.keys(r).length)return!1;for(c=i;0!=c--;)if(!Object.prototype.hasOwnProperty.call(r,o[c]))return!1;if(e&&t instanceof Element)return!1;for(c=i;0!=c--;)if(("_owner"!==o[c]&&"__v"!==o[c]&&"__o"!==o[c]||!t.$$typeof)&&!u(t[o[c]],r[o[c]]))return!1;return!0}return t!=t&&r!=r}t.exports=function(t,e){try{return u(t,e)}catch(M){if((M.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw M}}},5414:function(t,e,M){"use strict";M.d(e,{q:function(){return wt}});var n,L,u,r,i=M(5697),c=M.n(i),o=M(4839),a=M.n(o),j=M(2993),s=M.n(j),C=M(7294),y=M(6494),w=M.n(y),g="bodyAttributes",I="htmlAttributes",l="titleAttributes",A={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},N=(Object.keys(A).map((function(t){return A[t]})),"charset"),T="cssText",D="href",z="http-equiv",m="innerHTML",E="itemprop",d="name",S="property",p="rel",f="src",x="target",b={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},O="defaultTitle",h="defer",Y="encodeSpecialCharacters",v="onChangeClientState",k="titleTemplate",Z=Object.keys(b).reduce((function(t,e){return t[b[e]]=e,t}),{}),Q=[A.NOSCRIPT,A.SCRIPT,A.STYLE],U="data-react-helmet",G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},H=function(){function t(t,e){for(var M=0;M<e.length;M++){var n=e[M];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,M,n){return M&&t(e.prototype,M),n&&t(e,n),e}}(),R=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var M=arguments[e];for(var n in M)Object.prototype.hasOwnProperty.call(M,n)&&(t[n]=M[n])}return t},W=function(t,e){var M={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(M[n]=t[n]);return M},J=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},B=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},X=function(t){var e=q(t,A.TITLE),M=q(t,k);if(M&&e)return M.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var n=q(t,O);return e||n||void 0},F=function(t){return q(t,v)||function(){}},K=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return R({},t,e)}),{})},V=function(t,e){return e.filter((function(t){return void 0!==t[A.BASE]})).map((function(t){return t[A.BASE]})).reverse().reduce((function(e,M){if(!e.length)for(var n=Object.keys(M),L=0;L<n.length;L++){var u=n[L].toLowerCase();if(-1!==t.indexOf(u)&&M[u])return e.concat(M)}return e}),[])},_=function(t,e,M){var n={};return M.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&nt("Helmet: "+t+' should be of type "Array". Instead found type "'+G(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,M){var L={};M.filter((function(t){for(var M=void 0,u=Object.keys(t),r=0;r<u.length;r++){var i=u[r],c=i.toLowerCase();-1===e.indexOf(c)||M===p&&"canonical"===t[M].toLowerCase()||c===p&&"stylesheet"===t[c].toLowerCase()||(M=c),-1===e.indexOf(i)||i!==m&&i!==T&&i!==E||(M=i)}if(!M||!t[M])return!1;var o=t[M].toLowerCase();return n[M]||(n[M]={}),L[M]||(L[M]={}),!n[M][o]&&(L[M][o]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var u=Object.keys(L),r=0;r<u.length;r++){var i=u[r],c=w()({},n[i],L[i]);n[i]=c}return t}),[]).reverse()},q=function(t,e){for(var M=t.length-1;M>=0;M--){var n=t[M];if(n.hasOwnProperty(e))return n[e]}return null},$=(n=Date.now(),function(t){var e=Date.now();e-n>16?(n=e,t(e)):setTimeout((function(){$(t)}),0)}),tt=function(t){return clearTimeout(t)},et="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:M.g.requestAnimationFrame||$,Mt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||tt:M.g.cancelAnimationFrame||tt,nt=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},Lt=null,ut=function(t,e){var M=t.baseTag,n=t.bodyAttributes,L=t.htmlAttributes,u=t.linkTags,r=t.metaTags,i=t.noscriptTags,c=t.onChangeClientState,o=t.scriptTags,a=t.styleTags,j=t.title,s=t.titleAttributes;ct(A.BODY,n),ct(A.HTML,L),it(j,s);var C={baseTag:ot(A.BASE,M),linkTags:ot(A.LINK,u),metaTags:ot(A.META,r),noscriptTags:ot(A.NOSCRIPT,i),scriptTags:ot(A.SCRIPT,o),styleTags:ot(A.STYLE,a)},y={},w={};Object.keys(C).forEach((function(t){var e=C[t],M=e.newTags,n=e.oldTags;M.length&&(y[t]=M),n.length&&(w[t]=C[t].oldTags)})),e&&e(),c(t,y,w)},rt=function(t){return Array.isArray(t)?t.join(""):t},it=function(t,e){void 0!==t&&document.title!==t&&(document.title=rt(t)),ct(A.TITLE,e)},ct=function(t,e){var M=document.getElementsByTagName(t)[0];if(M){for(var n=M.getAttribute(U),L=n?n.split(","):[],u=[].concat(L),r=Object.keys(e),i=0;i<r.length;i++){var c=r[i],o=e[c]||"";M.getAttribute(c)!==o&&M.setAttribute(c,o),-1===L.indexOf(c)&&L.push(c);var a=u.indexOf(c);-1!==a&&u.splice(a,1)}for(var j=u.length-1;j>=0;j--)M.removeAttribute(u[j]);L.length===u.length?M.removeAttribute(U):M.getAttribute(U)!==r.join(",")&&M.setAttribute(U,r.join(","))}},ot=function(t,e){var M=document.head||document.querySelector(A.HEAD),n=M.querySelectorAll(t+"["+"data-react-helmet]"),L=Array.prototype.slice.call(n),u=[],r=void 0;return e&&e.length&&e.forEach((function(e){var M=document.createElement(t);for(var n in e)if(e.hasOwnProperty(n))if(n===m)M.innerHTML=e.innerHTML;else if(n===T)M.styleSheet?M.styleSheet.cssText=e.cssText:M.appendChild(document.createTextNode(e.cssText));else{var i=void 0===e[n]?"":e[n];M.setAttribute(n,i)}M.setAttribute(U,"true"),L.some((function(t,e){return r=e,M.isEqualNode(t)}))?L.splice(r,1):u.push(M)})),L.forEach((function(t){return t.parentNode.removeChild(t)})),u.forEach((function(t){return M.appendChild(t)})),{oldTags:L,newTags:u}},at=function(t){return Object.keys(t).reduce((function(e,M){var n=void 0!==t[M]?M+'="'+t[M]+'"':""+M;return e?e+" "+n:n}),"")},jt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,M){return e[b[M]||M]=t[M],e}),e)},st=function(t,e,M){switch(t){case A.TITLE:return{toComponent:function(){return t=e.title,M=e.titleAttributes,(n={key:t})[U]=!0,L=jt(M,n),[C.createElement(A.TITLE,L,t)];var t,M,n,L},toString:function(){return function(t,e,M,n){var L=at(M),u=rt(e);return L?"<"+t+' data-react-helmet="true" '+L+">"+B(u,n)+"</"+t+">":"<"+t+' data-react-helmet="true">'+B(u,n)+"</"+t+">"}(t,e.title,e.titleAttributes,M)}};case g:case I:return{toComponent:function(){return jt(e)},toString:function(){return at(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,M){var n,L=((n={key:M})[U]=!0,n);return Object.keys(e).forEach((function(t){var M=b[t]||t;if(M===m||M===T){var n=e.innerHTML||e.cssText;L.dangerouslySetInnerHTML={__html:n}}else L[M]=e[t]})),C.createElement(t,L)}))}(t,e)},toString:function(){return function(t,e,M){return e.reduce((function(e,n){var L=Object.keys(n).filter((function(t){return!(t===m||t===T)})).reduce((function(t,e){var L=void 0===n[e]?e:e+'="'+B(n[e],M)+'"';return t?t+" "+L:L}),""),u=n.innerHTML||n.cssText||"",r=-1===Q.indexOf(t);return e+"<"+t+' data-react-helmet="true" '+L+(r?"/>":">"+u+"</"+t+">")}),"")}(t,e,M)}}}},Ct=function(t){var e=t.baseTag,M=t.bodyAttributes,n=t.encode,L=t.htmlAttributes,u=t.linkTags,r=t.metaTags,i=t.noscriptTags,c=t.scriptTags,o=t.styleTags,a=t.title,j=void 0===a?"":a,s=t.titleAttributes;return{base:st(A.BASE,e,n),bodyAttributes:st(g,M,n),htmlAttributes:st(I,L,n),link:st(A.LINK,u,n),meta:st(A.META,r,n),noscript:st(A.NOSCRIPT,i,n),script:st(A.SCRIPT,c,n),style:st(A.STYLE,o,n),title:st(A.TITLE,{title:j,titleAttributes:s},n)}},yt=a()((function(t){return{baseTag:V([D,x],t),bodyAttributes:K(g,t),defer:q(t,h),encode:q(t,Y),htmlAttributes:K(I,t),linkTags:_(A.LINK,[p,D],t),metaTags:_(A.META,[d,N,z,S,E],t),noscriptTags:_(A.NOSCRIPT,[m],t),onChangeClientState:F(t),scriptTags:_(A.SCRIPT,[f,m],t),styleTags:_(A.STYLE,[T],t),title:X(t),titleAttributes:K(l,t)}}),(function(t){Lt&&Mt(Lt),t.defer?Lt=et((function(){ut(t,(function(){Lt=null}))})):(ut(t),Lt=null)}),Ct)((function(){return null})),wt=(L=yt,r=u=function(t){function e(){return P(this,e),J(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!s()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case A.SCRIPT:case A.NOSCRIPT:return{innerHTML:e};case A.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,M=t.child,n=t.arrayTypeChildren,L=t.newChildProps,u=t.nestedChildren;return R({},n,((e={})[M.type]=[].concat(n[M.type]||[],[R({},L,this.mapNestedChildrenToProps(M,u))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,M,n=t.child,L=t.newProps,u=t.newChildProps,r=t.nestedChildren;switch(n.type){case A.TITLE:return R({},L,((e={})[n.type]=r,e.titleAttributes=R({},u),e));case A.BODY:return R({},L,{bodyAttributes:R({},u)});case A.HTML:return R({},L,{htmlAttributes:R({},u)})}return R({},L,((M={})[n.type]=R({},u),M))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var M=R({},e);return Object.keys(t).forEach((function(e){var n;M=R({},M,((n={})[e]=t[e],n))})),M},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var M=this,n={};return C.Children.forEach(t,(function(t){if(t&&t.props){var L=t.props,u=L.children,r=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,M){return e[Z[M]||M]=t[M],e}),e)}(W(L,["children"]));switch(M.warnOnInvalidChildren(t,u),t.type){case A.LINK:case A.META:case A.NOSCRIPT:case A.SCRIPT:case A.STYLE:n=M.flattenArrayTypeChildren({child:t,arrayTypeChildren:n,newChildProps:r,nestedChildren:u});break;default:e=M.mapObjectTypeChildren({child:t,newProps:e,newChildProps:r,nestedChildren:u})}}})),e=this.mapArrayTypeChildrenToProps(n,e)},e.prototype.render=function(){var t=this.props,e=t.children,M=W(t,["children"]),n=R({},M);return e&&(n=this.mapChildrenToProps(e,n)),C.createElement(L,n)},H(e,null,[{key:"canUseDOM",set:function(t){L.canUseDOM=t}}]),e}(C.Component),u.propTypes={base:c().object,bodyAttributes:c().object,children:c().oneOfType([c().arrayOf(c().node),c().node]),defaultTitle:c().string,defer:c().bool,encodeSpecialCharacters:c().bool,htmlAttributes:c().object,link:c().arrayOf(c().object),meta:c().arrayOf(c().object),noscript:c().arrayOf(c().object),onChangeClientState:c().func,script:c().arrayOf(c().object),style:c().arrayOf(c().object),title:c().string,titleAttributes:c().object,titleTemplate:c().string},u.defaultProps={defer:!0,encodeSpecialCharacters:!0},u.peek=L.peek,u.rewind=function(){var t=L.rewind();return t||(t=Ct({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},r);wt.renderStatic=wt.rewind,e.Z=wt},4839:function(t,e,M){"use strict";var n,L=M(7294),u=(n=L)&&"object"==typeof n&&"default"in n?n.default:n;function r(t,e,M){return e in t?Object.defineProperty(t,e,{value:M,enumerable:!0,configurable:!0,writable:!0}):t[e]=M,t}var i=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,M){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==M&&"function"!=typeof M)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var c,o=[];function a(){c=t(o.map((function(t){return t.props}))),j.canUseDOM?e(c):M&&(c=M(c))}var j=function(t){var e,M;function L(){return t.apply(this,arguments)||this}M=t,(e=L).prototype=Object.create(M.prototype),e.prototype.constructor=e,e.__proto__=M,L.peek=function(){return c},L.rewind=function(){if(L.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=c;return c=void 0,o=[],t};var r=L.prototype;return r.UNSAFE_componentWillMount=function(){o.push(this),a()},r.componentDidUpdate=function(){a()},r.componentWillUnmount=function(){var t=o.indexOf(this);o.splice(t,1),a()},r.render=function(){return u.createElement(n,this.props)},L}(L.PureComponent);return r(j,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(n)+")"),r(j,"canUseDOM",i),j}}},9746:function(t,e,M){"use strict";M.d(e,{Z:function(){return c}});var n=M(7294),L=M(1597),u=function(){var t=(0,L.useStaticQuery)("4172131656").allMarkdownRemark.group.sort((function(t,e){return t.totalCount>e.totalCount?-1:t.totalCount<e.totalCount?1:0}));return n.createElement("nav",{className:"tag-link"},n.createElement("h1",{className:"title"},"Tags"),n.createElement("ul",null,t.map((function(t){return""==t.fieldValue?"":n.createElement("li",{key:t.fieldValue},n.createElement(L.Link,{to:"/tag/"+t.fieldValue.toLowerCase()+"/"},t.fieldValue))}))))},r=function(){var t=(0,L.useStaticQuery)("848935343").allMarkdownRemark.group.map((function(t){return t.fieldValue}));return n.createElement("nav",{className:"category-link"},n.createElement("h1",{className:"title"},"Categories"),n.createElement("ul",null,t.map((function(t){return n.createElement("li",{key:t},n.createElement(L.Link,{to:"/category/"+t.toLowerCase()+"/"},t))}))))},i=function(t){var e,M,u=t.previousPath,r=t.nextPath;return e=u?n.createElement("div",{className:"previous"},n.createElement(L.Link,{to:""+u},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkIgogICBpZD0ic3ZnNzgiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDUxLjYyNjEzNyA2Ny44OTEwOTciCiAgIGhlaWdodD0iNjcuODkxMDk4cHQiCiAgIHdpZHRoPSI1MS42MjYxMzdwdCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhODQiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4MiIgLz4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NC44NDYyMzEsLTQyNC40NTA5KSIKICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtzdHJva2U6bm9uZSIKICAgICAgIGQ9Im0gNjYuMjg5MSw0MzIuNjg1IGMgMS4xNjIxLC0xLjA1NyA1LjgwODYsLTIuODUxIDYuMzM1OSwtMy4xNjggMC41MjczLC0wLjMxOCAwLjYzMjgsLTMuODAyIDYuMTIzLC00Ljg1OCA1LjQ5MjIsLTEuMDU1IDguNTUyOCwyLjIxOCA5LjE4NzUsMi43NDUgMCwwIDIuNDI3OCwxLjI2OCA2LjQ0MTUsMi4yMTcgNC4wMTE3LDAuOTUxIDEwLjg3NSwzLjY5NiAxNi4zNjcsMTUuMzExIDMuMDE4LDYuMzg2IDMuMTMzLDEzLjk1MSAyLjY0MSwxOS42NzggMC4wNjIsMS4zMzMgMC4xNDYsMi40MzcgMC4zMTQsMy4xMyAwLjc0LDMuMDYyIDMuNDg1LDMuOTA4IDEuOTAxLDQuNDM2IC0xLjE2MiwwLjM4OCAtMi4xOCwtMC4wOTMgLTMuMDU3LC0xLjEwMiAtMC4xOTksMS4yMTIgLTAuMzQyLDIuMDE0IC0wLjMyMiwyLjI2MyAwLjEwNSwxLjI2OCAxLjM3Myw3LjYwMyAxLjY4OSw4LjY1OSAwLjMxNywxLjA1NSAyLjg1MiwxLjg5OSAyLjUzNSwyLjQyOCAtMC4zMTYsMC41MjcgLTEuNjg5LDAuNDIyIC0yLjUzNSwwIC0wLjEwNSwxLjE2IC0wLjk0OSw0LjUzOSAtMi4yMTcsNS4wNjYgLTEuMjY3LDAuNTMgLTMuOCwxLjI3IC00Ljg1NywxLjU4NCAtMS4wNTUsMC4zMTkgLTEuMjY4LDEuMjY4IC0xLjY5LDEuMjY4IC0wLjQyMSwwIDAuMzE3LC0xLjc5NSAwLjMxNywtMS43OTUgMCwwIC0xLjkwMSwwLjg0NiAtMi41MzMsMS4wNTcgLTAuNjM1LDAuMjExIDAuODQzLC0yLjUzNCAxLjY4OSwtMi45NTcgMC40MjIsLTAuOTUyIDIuODUsLTEuMjY2IDMuNjk1LC0xLjQ3OSAwLjg0NCwtMC4yMDkgMC45NTIsLTEuODk4IDAuNTMsLTIuNzQ0IC0xLjU4NiwwLjEwNSAtNS4xNzYsLTAuNzM4IC02LjQ0MiwtMS4xNjIgLTEuMjY3LC0wLjQyMiAtMy4zODA1LC0xLjA1NyAtMy4xNjc2LC0xLjQ3OSAtMC40MjM5LDEuMDU3IC0xLjkwMDQsMS42OTIgLTEuOTAwNCwxLjY5MiBsIC0xLjE2MjEsMi40MjcgYyAwLDAgMCwwLjczOSAtMC41Mjc0LDEuNDc5IC0wLjUyOTMsMC43MzggLTMuNTg5OCwxLjU4MiAtNC40MzU1LDEuNTgyIC0wLjg0NTcsMCAtMS41ODQsMC45NTEgLTIuNTM1MiwxLjQ3OSAtMC45NDkyLDAuNTI5IC0wLjQyMTgsLTAuNDIyIDAuMTA1NSwtMS4zNzIgLTAuMzE2NCwtMC4zMTYgLTIuNjM4NywwLjYzMyAtMy4yNzM0LDAuOTUgLTAuNjMyOSwwLjMxNiAwLjMxODMsLTEuOTAxIDEuMjY3NSwtMi44NTIgMC43NDAzLC0xLjQ3OCAzLjM3ODksLTEuNjg5IDMuOTA4MiwtMS42ODkgMC41Mjc0LDAgMC43MzgzLC0wLjQyMiAxLjA1NDcsLTAuNzM5IDAuMzE4NCwtMC4zMTYgMC42MzI4LC0xLjQ3OCAwLjc0MDMsLTIuMzIyIDAuMTA1NCwtMC44NDYgLTAuNjM0OCwtMi43NDYgLTEuMTYyMSwtNC4zMyAtOS41MDQsLTIxLjc1IC0xMS4yOTg5LC0zNy44MDEgLTExLjI5ODksLTM4LjY0NiAwLC0wLjg0NCAtMC43MzgzLC0yLjYzOSAtMi4zMjIyLC00LjAxMiAtMS41ODQsLTEuMzczIC00Ljk2MjksLTIuMDA2IC00Ljk2MjksLTIuMDA2IDAsMCAtMy41MTk2LDAuNDkyIC00Ljc4NzEsMC43MDMgLTEuMjY3NiwwLjIxMiAtMi4wNjg0LDEuMTM1IC0yLjgxNjQsMC45ODYgLTAuNzAzMiwtMC4xNDIgMCwtMS4zNzMgMS4xNjIxLC0yLjQyOCB6IgogICAgICAgaWQ9InBhdGgxNiIgLz4KICA8L2c+Cjwvc3ZnPgo=",alt:"Previous",className:"light-mode"}),n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0ic3ZnNzgiIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEuNiA2Ny45IgoJIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjYgNjcuOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNERkUxRTM7fQo8L3N0eWxlPgo8ZyBpZD0ibGF5ZXIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjQuODQ2MjMxLC00MjQuNDUwOSkiPgoJPHBhdGggaWQ9InBhdGgxNiIgY2xhc3M9InN0MCIgZD0iTTY2LjMsNDMyLjdjMS4yLTEuMSw1LjgtMi45LDYuMy0zLjJjMC41LTAuMywwLjYtMy44LDYuMS00LjljNS41LTEuMSw4LjYsMi4yLDkuMiwyLjcKCQljMCwwLDIuNCwxLjMsNi40LDIuMmM0LDEsMTAuOSwzLjcsMTYuNCwxNS4zYzMsNi40LDMuMSwxNCwyLjYsMTkuN2MwLjEsMS4zLDAuMSwyLjQsMC4zLDMuMWMwLjcsMy4xLDMuNSwzLjksMS45LDQuNAoJCWMtMS4yLDAuNC0yLjItMC4xLTMuMS0xLjFjLTAuMiwxLjItMC4zLDItMC4zLDIuM2MwLjEsMS4zLDEuNCw3LjYsMS43LDguN2MwLjMsMS4xLDIuOSwxLjksMi41LDIuNGMtMC4zLDAuNS0xLjcsMC40LTIuNSwwCgkJYy0wLjEsMS4yLTAuOSw0LjUtMi4yLDUuMWMtMS4zLDAuNS0zLjgsMS4zLTQuOSwxLjZjLTEuMSwwLjMtMS4zLDEuMy0xLjcsMS4zYy0wLjQsMCwwLjMtMS44LDAuMy0xLjhzLTEuOSwwLjgtMi41LDEuMQoJCWMtMC42LDAuMiwwLjgtMi41LDEuNy0zYzAuNC0xLDIuOC0xLjMsMy43LTEuNWMwLjgtMC4yLDEtMS45LDAuNS0yLjdjLTEuNiwwLjEtNS4yLTAuNy02LjQtMS4yYy0xLjMtMC40LTMuNC0xLjEtMy4yLTEuNQoJCWMtMC40LDEuMS0xLjksMS43LTEuOSwxLjdsLTEuMiwyLjRjMCwwLDAsMC43LTAuNSwxLjVjLTAuNSwwLjctMy42LDEuNi00LjQsMS42cy0xLjYsMS0yLjUsMS41Yy0wLjksMC41LTAuNC0wLjQsMC4xLTEuNAoJCWMtMC4zLTAuMy0yLjYsMC42LTMuMywxYy0wLjYsMC4zLDAuMy0xLjksMS4zLTIuOWMwLjctMS41LDMuNC0xLjcsMy45LTEuN2MwLjUsMCwwLjctMC40LDEuMS0wLjdjMC4zLTAuMywwLjYtMS41LDAuNy0yLjMKCQljMC4xLTAuOC0wLjYtMi43LTEuMi00LjNDODEuOCw0NTYuMyw4MCw0NDAuMyw4MCw0MzkuNGMwLTAuOC0wLjctMi42LTIuMy00Yy0xLjYtMS40LTUtMi01LTJzLTMuNSwwLjUtNC44LDAuNwoJCWMtMS4zLDAuMi0yLjEsMS4xLTIuOCwxQzY0LjQsNDM1LDY1LjEsNDMzLjcsNjYuMyw0MzIuN0w2Ni4zLDQzMi43eiIvPgo8L2c+Cjwvc3ZnPgo=",alt:"Previous",className:"dark-mode"}),n.createElement("p",null,"←Previous"))):n.createElement(n.Fragment,null),M=r?n.createElement("div",{className:"next"},n.createElement(L.Link,{to:""+r},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkIgogICBpZD0ic3ZnNzgiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDQzLjEyOTAzNiA3Mi43NjczMDIiCiAgIGhlaWdodD0iNzIuNzY3MzAzcHQiCiAgIHdpZHRoPSI0My4xMjkwMzZwdCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhODQiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4MiIgLz4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzQuMzE3OTksLTMzNy4xMzE4NCkiCiAgICAgc3R5bGU9ImRpc3BsYXk6bm9uZSIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDojMjQyYjI1O3N0cm9rZTpub25lIgogICAgICAgZD0ibSA2Ni4yODkxLDQzMi42ODUgYyAxLjE2MjEsLTEuMDU3IDUuODA4NiwtMi44NTEgNi4zMzU5LC0zLjE2OCAwLjUyNzMsLTAuMzE4IDAuNjMyOCwtMy44MDIgNi4xMjMsLTQuODU4IDUuNDkyMiwtMS4wNTUgOC41NTI4LDIuMjE4IDkuMTg3NSwyLjc0NSAwLDAgMi40Mjc4LDEuMjY4IDYuNDQxNSwyLjIxNyA0LjAxMTcsMC45NTEgMTAuODc1LDMuNjk2IDE2LjM2NywxNS4zMTEgMy4wMTgsNi4zODYgMy4xMzMsMTMuOTUxIDIuNjQxLDE5LjY3OCAwLjA2MiwxLjMzMyAwLjE0NiwyLjQzNyAwLjMxNCwzLjEzIDAuNzQsMy4wNjIgMy40ODUsMy45MDggMS45MDEsNC40MzYgLTEuMTYyLDAuMzg4IC0yLjE4LC0wLjA5MyAtMy4wNTcsLTEuMTAyIC0wLjE5OSwxLjIxMiAtMC4zNDIsMi4wMTQgLTAuMzIyLDIuMjYzIDAuMTA1LDEuMjY4IDEuMzczLDcuNjAzIDEuNjg5LDguNjU5IDAuMzE3LDEuMDU1IDIuODUyLDEuODk5IDIuNTM1LDIuNDI4IC0wLjMxNiwwLjUyNyAtMS42ODksMC40MjIgLTIuNTM1LDAgLTAuMTA1LDEuMTYgLTAuOTQ5LDQuNTM5IC0yLjIxNyw1LjA2NiAtMS4yNjcsMC41MyAtMy44LDEuMjcgLTQuODU3LDEuNTg0IC0xLjA1NSwwLjMxOSAtMS4yNjgsMS4yNjggLTEuNjksMS4yNjggLTAuNDIxLDAgMC4zMTcsLTEuNzk1IDAuMzE3LC0xLjc5NSAwLDAgLTEuOTAxLDAuODQ2IC0yLjUzMywxLjA1NyAtMC42MzUsMC4yMTEgMC44NDMsLTIuNTM0IDEuNjg5LC0yLjk1NyAwLjQyMiwtMC45NTIgMi44NSwtMS4yNjYgMy42OTUsLTEuNDc5IDAuODQ0LC0wLjIwOSAwLjk1MiwtMS44OTggMC41MywtMi43NDQgLTEuNTg2LDAuMTA1IC01LjE3NiwtMC43MzggLTYuNDQyLC0xLjE2MiAtMS4yNjcsLTAuNDIyIC0zLjM4MDUsLTEuMDU3IC0zLjE2NzYsLTEuNDc5IC0wLjQyMzksMS4wNTcgLTEuOTAwNCwxLjY5MiAtMS45MDA0LDEuNjkyIGwgLTEuMTYyMSwyLjQyNyBjIDAsMCAwLDAuNzM5IC0wLjUyNzQsMS40NzkgLTAuNTI5MywwLjczOCAtMy41ODk4LDEuNTgyIC00LjQzNTUsMS41ODIgLTAuODQ1NywwIC0xLjU4NCwwLjk1MSAtMi41MzUyLDEuNDc5IC0wLjk0OTIsMC41MjkgLTAuNDIxOCwtMC40MjIgMC4xMDU1LC0xLjM3MiAtMC4zMTY0LC0wLjMxNiAtMi42Mzg3LDAuNjMzIC0zLjI3MzQsMC45NSAtMC42MzI5LDAuMzE2IDAuMzE4MywtMS45MDEgMS4yNjc1LC0yLjg1MiAwLjc0MDMsLTEuNDc4IDMuMzc4OSwtMS42ODkgMy45MDgyLC0xLjY4OSAwLjUyNzQsMCAwLjczODMsLTAuNDIyIDEuMDU0NywtMC43MzkgMC4zMTg0LC0wLjMxNiAwLjYzMjgsLTEuNDc4IDAuNzQwMywtMi4zMjIgMC4xMDU0LC0wLjg0NiAtMC42MzQ4LC0yLjc0NiAtMS4xNjIxLC00LjMzIC05LjUwNCwtMjEuNzUgLTExLjI5ODksLTM3LjgwMSAtMTEuMjk4OSwtMzguNjQ2IDAsLTAuODQ0IC0wLjczODMsLTIuNjM5IC0yLjMyMjIsLTQuMDEyIC0xLjU4NCwtMS4zNzMgLTQuOTYyOSwtMi4wMDYgLTQuOTYyOSwtMi4wMDYgMCwwIC0zLjUxOTYsMC40OTIgLTQuNzg3MSwwLjcwMyAtMS4yNjc2LDAuMjEyIC0yLjA2ODQsMS4xMzUgLTIuODE2NCwwLjk4NiAtMC43MDMyLC0wLjE0MiAwLC0xLjM3MyAxLjE2MjEsLTIuNDI4IHoiCiAgICAgICBpZD0icGF0aDE2IiAvPgogIDwvZz4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzQuMzE3OTksLTMzNy4xMzE4NCkiCiAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lIgogICAgIGlkPSJsYXllcjIiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOiMyNDJiMjU7c3Ryb2tlOm5vbmUiCiAgICAgICBkPSJtIDI2MC4yNzgsMzM3LjE0NiBjIC0yLjY1MiwwLjExMyAtNy4yNTUsMS41OTIgLTcuNjA5LDcuMjU0IC0xLjA2Miw0LjA3MSAtMi4xMjMsNS4zMDkgLTMuMDA4LDYuNzI1IC0wLjg4NSwxLjQxNSAtOS4zNzgsMTYuMjc5IC05LjIwMSwzMC43ODggMC4xNzcsMTQuNTEgLTEuMjM5LDIwLjUyNyAtNC45NTQsMjMuMDAzIC0zLjcxNywyLjQ3NyAyLjMsMC43MDggNC4yNDYsMCAxLjk0NywtMC43MDcgNS40ODUsLTIuODMxIDUuNDg1LC0xLjc2OSAwLDEuMDYyIC0wLjg4NSwzLjAwOCAwLjcwOCwzLjE4NCAxLjU5MywwLjE3OCAzLjcxNiwwIDMuNzE2LDAgMCwwIDAuNzA4LDMuMDA5IDMuMDA4LDMuMDA5IDIuMzAxLDAgNy43ODYsMC43MDcgOC44NDgsMC41MzEgMS4wNjEsLTAuMTc4IDEuMDYxLC0wLjE3OCAxLjA2MSwtMC4xNzggbCAtMC41MywtMS40MTUgMS40MTUsLTAuMzU0IGMgMCwwIC0yLjEyMywtMC41MzEgLTMuMTg1LC0wLjcwOCAwLDAgMC40MTIsLTAuMzUzIDAuMTE5LC0wLjQxMyAtMC4yOTYsLTAuMDU4IC0yLjM2MSwtMC4yOTQgLTIuNzE0LC0wLjM1MyAtMC4zNTUsLTAuMDU5IDAuODI1LC0wLjU5IDEuMDYxLC0wLjc2NiAwLjIzNiwtMC4xNzggLTAuMzUzLC0wLjUzMiAtMC43NjYsLTAuNTkxIC0wLjQxMywtMC4wNTkgMS4wNjEsLTAuNDcxIDAuNTg5LC0wLjY0OCAtMC40NzEsLTAuMTc3IC0xLjU5MiwtMC4yOTUgLTEuNTkyLC0wLjI5NSAwLDAgMC4xMTgsLTAuNDE0IC0wLjM1NCwtMC40MTQgLTAuNDczLDAgLTEuMDYxLC0wLjI5NCAtMS4wNjEsLTAuMjk0IDAsMCAwLjQ3MSwtMS4yMzkgMS4wMDIsLTEuNjUxIDAuNTMxLC0wLjQxMyA0LjM2NSwtNC45NTUgNS4yNDksLTUuOTU4IDAuODg1LC0xLjAwMyA2LjU0NywtOS45NjggNy41NSwtMjAuNzAzIDEuMDAyLC0xMC43MzQgLTEuMTc5LC0xOS44MTcgLTIuNTM3LC0yMi44ODUgLTEuMzU1LC0zLjA2NyAtMy4zNjEsLTQuMDY5IC0zLjE4MywtNS4wNzIgMC4xNzYsLTEuMDAzIDEuOTQ1LC0zLjAwOCAyLjE4MSwtNC4wMTEgMS4zNTcsLTAuOTQ0IDQuNTQyLC0zLjAwOCA3LjMxNCwtMy4zNjIgMi43NzIsLTAuMzU0IDQuNDI0LDAuMjk1IDQuMzA1LC0wLjI5NSAtMC4xMTcsLTAuNTg5IC0xLjgyNCwtMC44MyAtMy4yNDQsLTAuODg0IC0xLjUzMywtMC4wNiAtNi40MjgsMC41OSAtNy4xOTUsMC4yMzUgLTAuNzY3LC0wLjM1MyAtMi41OTYsLTEuODg3IC02LjcyNCwtMS43MSB6IgogICAgICAgaWQ9InBhdGg4IiAvPgogIDwvZz4KPC9zdmc+Cg==",alt:"Next",className:"light-mode"}),n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0ic3ZnNzgiIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDMuMSA3Mi44IgoJIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzLjEgNzIuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtkaXNwbGF5Om5vbmU7fQoJLnN0MXtkaXNwbGF5OmlubGluZTtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMyNDJCMjU7fQoJLnN0MntmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNERkUxRTM7fQo8L3N0eWxlPgo8ZyBpZD0ibGF5ZXIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM0LjMxNzk5LC0zMzcuMTMxODQpIiBjbGFzcz0ic3QwIj4KCTxwYXRoIGlkPSJwYXRoMTYiIGNsYXNzPSJzdDEiIGQ9Ik02Ni4zLDQzMi43YzEuMi0xLjEsNS44LTIuOSw2LjMtMy4yYzAuNS0wLjMsMC42LTMuOCw2LjEtNC45YzUuNS0xLjEsOC42LDIuMiw5LjIsMi43CgkJYzAsMCwyLjQsMS4zLDYuNCwyLjJjNCwxLDEwLjksMy43LDE2LjQsMTUuM2MzLDYuNCwzLjEsMTQsMi42LDE5LjdjMC4xLDEuMywwLjEsMi40LDAuMywzLjFjMC43LDMuMSwzLjUsMy45LDEuOSw0LjQKCQljLTEuMiwwLjQtMi4yLTAuMS0zLjEtMS4xYy0wLjIsMS4yLTAuMywyLTAuMywyLjNjMC4xLDEuMywxLjQsNy42LDEuNyw4LjdjMC4zLDEuMSwyLjksMS45LDIuNSwyLjRjLTAuMywwLjUtMS43LDAuNC0yLjUsMAoJCWMtMC4xLDEuMi0wLjksNC41LTIuMiw1LjFjLTEuMywwLjUtMy44LDEuMy00LjksMS42Yy0xLjEsMC4zLTEuMywxLjMtMS43LDEuM2MtMC40LDAsMC4zLTEuOCwwLjMtMS44cy0xLjksMC44LTIuNSwxLjEKCQljLTAuNiwwLjIsMC44LTIuNSwxLjctM2MwLjQtMSwyLjgtMS4zLDMuNy0xLjVjMC44LTAuMiwxLTEuOSwwLjUtMi43Yy0xLjYsMC4xLTUuMi0wLjctNi40LTEuMmMtMS4zLTAuNC0zLjQtMS4xLTMuMi0xLjUKCQljLTAuNCwxLjEtMS45LDEuNy0xLjksMS43bC0xLjIsMi40YzAsMCwwLDAuNy0wLjUsMS41Yy0wLjUsMC43LTMuNiwxLjYtNC40LDEuNnMtMS42LDEtMi41LDEuNWMtMC45LDAuNS0wLjQtMC40LDAuMS0xLjQKCQljLTAuMy0wLjMtMi42LDAuNi0zLjMsMWMtMC42LDAuMywwLjMtMS45LDEuMy0yLjljMC43LTEuNSwzLjQtMS43LDMuOS0xLjdjMC41LDAsMC43LTAuNCwxLjEtMC43YzAuMy0wLjMsMC42LTEuNSwwLjctMi4zCgkJYzAuMS0wLjgtMC42LTIuNy0xLjItNC4zQzgxLjgsNDU2LjMsODAsNDQwLjMsODAsNDM5LjRjMC0wLjgtMC43LTIuNi0yLjMtNGMtMS42LTEuNC01LTItNS0ycy0zLjUsMC41LTQuOCwwLjcKCQljLTEuMywwLjItMi4xLDEuMS0yLjgsMUM2NC40LDQzNSw2NS4xLDQzMy43LDY2LjMsNDMyLjdMNjYuMyw0MzIuN3oiLz4KPC9nPgo8ZyBpZD0ibGF5ZXIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM0LjMxNzk5LC0zMzcuMTMxODQpIj4KCTxwYXRoIGlkPSJwYXRoOCIgY2xhc3M9InN0MiIgZD0iTTI2MC4zLDMzNy4xYy0yLjcsMC4xLTcuMywxLjYtNy42LDcuM2MtMS4xLDQuMS0yLjEsNS4zLTMsNi43Yy0wLjksMS40LTkuNCwxNi4zLTkuMiwzMC44CgkJYzAuMiwxNC41LTEuMiwyMC41LTUsMjNjLTMuNywyLjUsMi4zLDAuNyw0LjIsMGMxLjktMC43LDUuNS0yLjgsNS41LTEuOGMwLDEuMS0wLjksMywwLjcsMy4yYzEuNiwwLjIsMy43LDAsMy43LDBzMC43LDMsMywzCgkJYzIuMywwLDcuOCwwLjcsOC44LDAuNWMxLjEtMC4yLDEuMS0wLjIsMS4xLTAuMmwtMC41LTEuNGwxLjQtMC40YzAsMC0yLjEtMC41LTMuMi0wLjdjMCwwLDAuNC0wLjQsMC4xLTAuNAoJCWMtMC4zLTAuMS0yLjQtMC4zLTIuNy0wLjRjLTAuNC0wLjEsMC44LTAuNiwxLjEtMC44YzAuMi0wLjItMC40LTAuNS0wLjgtMC42czEuMS0wLjUsMC42LTAuNmMtMC41LTAuMi0xLjYtMC4zLTEuNi0wLjMKCQlzMC4xLTAuNC0wLjQtMC40Yy0wLjUsMC0xLjEtMC4zLTEuMS0wLjNzMC41LTEuMiwxLTEuN2MwLjUtMC40LDQuNC01LDUuMi02YzAuOS0xLDYuNS0xMCw3LjUtMjAuN2MxLTEwLjctMS4yLTE5LjgtMi41LTIyLjkKCQljLTEuNC0zLjEtMy40LTQuMS0zLjItNS4xYzAuMi0xLDEuOS0zLDIuMi00YzEuNC0wLjksNC41LTMsNy4zLTMuNHM0LjQsMC4zLDQuMy0wLjNjLTAuMS0wLjYtMS44LTAuOC0zLjItMC45CgkJYy0xLjUtMC4xLTYuNCwwLjYtNy4yLDAuMkMyNjYuMiwzMzguNSwyNjQuNCwzMzcsMjYwLjMsMzM3LjFMMjYwLjMsMzM3LjF6Ii8+CjwvZz4KPC9zdmc+Cg==",alt:"Next",className:"dark-mode"}),n.createElement("p",null,"Next→"))):n.createElement(n.Fragment,null),n.createElement("div",{className:"pagenate"},e,M)},c=function(t){var e,M,c=t.parent,o=t.siteTitle,a=t.children,j=t.previousPath,s=t.nextPath;return null!=c?(e={height:"200px"},M={lineHeight:"200px"}):(M={},e={}),n.createElement(n.Fragment,null,n.createElement("header",{style:e},n.createElement(L.Link,{to:"/",style:M},n.createElement("div",{className:"title"},o))),n.createElement("div",{className:"mainframe"},n.createElement("main",null,a),n.createElement(r,null),n.createElement(u,null),n.createElement(i,{previousPath:j,nextPath:s})),n.createElement("footer",null,n.createElement("p",{className:"copyright"},"(C)copyright magcho 2018-"),n.createElement("p",{className:"google-analytics"},"google analyticsを導入しています")))}},1316:function(t,e,M){"use strict";var n=M(7294),L=M(5414),u=M(1597);e.Z=function(t){var e=t.description,M=t.title,r=(0,u.useStaticQuery)("1324386404").site,i=M||r.siteMetadata.title,c=e||r.siteMetadata.description;return n.createElement(L.q,{htmlAttributes:{prefix:"og: http:ogp.me/ns#",jang:"ja"}},n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:site",content:r.siteMetadata.social.twitter}),n.createElement("meta",{name:"twitter:player",content:r.siteMetadata.social.twitter}),n.createElement("meta",{property:"og:title",content:i}),n.createElement("meta",{property:"og:description",content:c}),n.createElement("meta",{property:"og:site_name",content:i}),n.createElement("meta",{property:"og:image",content:r.siteMetadata.siteUrl+"/twitter-icon.jpg"}))}},2405:function(t,e,M){"use strict";var n=M(5750),L=M(7294),u=function(t){function e(){return t.apply(this,arguments)||this}return(0,n.Z)(e,t),e.prototype.render=function(){var t;switch(this.props.category){case"舞台技術":t="#7CB3D9";break;case"日記":t="#00bb16";break;case"電子工作":t="#F18AF2";break;case"プログラミング":t="#F29333";break;default:t="#e4ff3c"}return L.createElement("div",{className:"title-flame"},L.createElement("h1",{className:"title",style:{borderBottom:"solid "+t+" 0.3rem"}},this.props.children))},e}(L.Component);e.Z=u},858:function(t,e,M){"use strict";var n=M(7294),L=M(1597),u=function(t){return""!=t.category.category?n.createElement("li",{className:t.category.category},n.createElement(L.Link,{to:"/category/"+t.category.category+"/"},"【",t.category.category,"】")):null};e.Z=function(t){return n.createElement("ul",{className:"content-tags"},n.createElement(u,{category:t}),t.list.map((function(t){return n.createElement("li",{key:t,className:t},n.createElement(L.Link,{to:"/tag/"+t.toLowerCase()+"/"},t))})))}}}]);
//# sourceMappingURL=b7349f91ecd1d2b8f83406690b96a6b20ca5e405-c7c9634c17e8dcede92e.js.map