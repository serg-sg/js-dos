(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(2),i=n(6),a=(n(0),n(90)),o={id:"contributing-emulators-ui",title:"Contributing in client-side features"},c={unversionedId:"contributing-emulators-ui",id:"contributing-emulators-ui",isDocsHomePage:!1,title:"Contributing in client-side features",description:"To contribute to the emulators-ui package do the following:",source:"@site/docs/contributing-emulators-ui.md",slug:"/contributing-emulators-ui",permalink:"/v7/build/docs/contributing-emulators-ui",editUrl:"https://github.com/caiiiycuk/js-dos/edit/gh-pages/v7/docs/contributing-emulators-ui.md",version:"current",sidebar:"someSidebar",previous:{title:"Multiple layers",permalink:"/v7/build/docs/multiple-layers"},next:{title:"DOS Direct",permalink:"/v7/build/docs/dos-direct"}},l=[{value:"Adding new client-side features",id:"adding-new-client-side-features",children:[]}],u={rightToc:l};function s(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"To contribute to the ",Object(a.b)("inlineCode",{parentName:"p"},"emulators-ui")," package do the following:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Checkout ",Object(a.b)("inlineCode",{parentName:"p"},"js-dos")," repository"),Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"git clone https://github.com/caiiiycuk/js-dos"))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Switch to ",Object(a.b)("inlineCode",{parentName:"p"},"emulators-ui")," branch"),Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"git checkout -b dev origin/emulators-ui"))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Install ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://gulpjs.com/"}),"gulp 4"))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Now you can build everything with ",Object(a.b)("inlineCode",{parentName:"p"},"gulp")," command"))),Object(a.b)("h3",{id:"adding-new-client-side-features"},"Adding new client-side features"),Object(a.b)("p",null,"js-dos has an ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"configuration"}),"optional config")," file that you can put in ",Object(a.b)("inlineCode",{parentName:"p"},"js-dos bundle"),". This\nfile should be in json format. It can contain any information you want and it accessible from ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"command-interface"}),"Command Interface"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const ci = await Dos(/*element*/).run(/*bundle url*/);\nconst config = await ci.config();\n")),Object(a.b)("p",null,"Let's understand how gestures are implemented in js-dos.\nFirst of all, gestures have special configuration that stored in ",Object(a.b)("inlineCode",{parentName:"p"},"jsdos.jsdos")," file, it's looks\nlike: "),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n// ...\n  "gestures": [\n    {\n      "joystickId": 0,\n      "event": "dir:up",\n      "mapTo": 265\n    },\n//...\n')),Object(a.b)("p",null,"When js-dos starting it waits until config file is read and configure gestures\nlayer according to its configuration."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"async run(bundleUrl: string): Promise<CommandInterface> {\n        const bundle = await emulatorsUi.network.resolveBundle(bundleUrl);\n        this.ciPromise = emulators.dosWorker(bundle);\n\n        const ci = await this.ciPromise;\n        const config = await ci.config();\n\n        // ...\n        emulatorsUi.controls.nippleArrows(this.layers, ci, (config as any).gestures);\n        // ...\n}\n")),Object(a.b)("p",null,"You can do in same way:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"You can add some information to config file"),Object(a.b)("li",{parentName:"ul"},"You can access it in your client code")),Object(a.b)("p",null,"Doing this does not require changing the native part of ",Object(a.b)("inlineCode",{parentName:"p"},"js-dos"),"."))}s.isMDXComponent=!0},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),s=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=s(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),b=s(n),d=r,m=b["".concat(o,".").concat(d)]||b[d]||p[d]||a;return n?i.a.createElement(m,c(c({ref:t},u),{},{components:n})):i.a.createElement(m,c({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var u=2;u<a;u++)o[u]=n[u];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);