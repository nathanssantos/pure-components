var P=Object.defineProperty;var O=(o,t,e)=>t in o?P(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>(O(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerpolicy&&(c.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?c.credentials="include":s.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(s){if(s.ep)return;s.ep=!0;const c=e(s);fetch(s.href,c)}})();const I={base:"0em",sm:"30em",md:"48em",lg:"62em",xl:"80em","2xl":"96em"};class ${}r($,"breakpoints",I);const N=o=>o.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),A=()=>{let o=new Date().getTime(),t=performance.now()*1e3;return"xxxxxxxxxxxxxxxx".replace(/[xy]/g,()=>{let e=Math.random()*16;return o>0?(e=(o+e)%16|0,o=Math.floor(o/16)):(e=(t+e)%16|0,t=Math.floor(t/16)),(e&7|8).toString(16)})};class b{}r(b,"camelCaseToKebabCase",N),r(b,"generateUUID",A);const k=class{constructor(t={}){r(this,"children",{});r(this,"id");r(this,"state",{});r(this,"target");r(this,"appendChildren",t=>{for(const[e,n]of Object.entries(t))this.children[e]=n,this.target.append(n.target)});r(this,"appendTo",t=>{t.append(this.target)});r(this,"bindEvents",async t=>{for(const[e,n]of Object.entries(t))this.target.addEventListener(e,s=>n(this,s))});r(this,"destroy",()=>{var t;(t=this.target.parentNode)==null||t.removeChild(this.target)});r(this,"fadeIn",(t={})=>new Promise(e=>{this.show(),setTimeout(()=>{this.setStyle(t),e(!0)},0)}));r(this,"fadeOut",(t={})=>new Promise(e=>{this.setStyle(t),setTimeout(()=>{this.hide(),e(!0)},Number(getComputedStyle(this.target).transitionDuration.replace("s",""))*1e3)}));r(this,"hide",()=>{this.setStyle({display:"none"})});r(this,"prependChildren",t=>{for(const[e,n]of Object.entries(t))this.children[e]=n,this.target.prepend(n.target)});r(this,"prependTo",t=>{t.prepend(this.target)});r(this,"setAttributes",t=>{for(const[e,n]of Object.entries(t))this.target.setAttribute(e,n.toString())});r(this,"setState",t=>{for(const[e,n]of Object.entries(t))this.state[e]=n});r(this,"setStyle",t=>{const{base:e,sm:n,md:s,lg:c,xl:a,...d}=t,l=document.getElementById("pure-components__stylesheet").sheet;if(Object.entries(d).length){let h=`.component--${this.id} { `;const m=Array.from(l.cssRules).findIndex(u=>u.selectorText===`.component--${this.id}`);m!==-1&&l.cssRules.item&&(h=l.cssRules.item(m).cssText.replace(" }",""),l.deleteRule(m));for(const[u,T]of Object.entries(d))h+=` ${b.camelCaseToKebabCase(u)}: ${T};`;l.insertRule(`${h} }`)}const p=Object.entries({xl:a,lg:c,md:s,sm:n,base:e}).filter(([h,m])=>h&&m);for(const[h,m]of p)for(const[u,T]of Object.entries(m)){const M=`@media screen and (min-width: ${$.breakpoints[h]}) { .component--${this.id} { ${b.camelCaseToKebabCase(u)}: ${T}; } }`;Array.from(l.cssRules).some(_=>_.cssText===M)||l.insertRule(M)}});r(this,"show",()=>{this.setStyle({display:"flex"})});var m;const{attributes:e,children:n,className:s,events:c,innerHTML:a,state:d,style:l,tagName:p}=t;(m=document.getElementById("pure-components__stylesheet"))!=null&&m.sheet||document.head.insertAdjacentHTML("beforeend",'<style type="text/css" id="pure-components__stylesheet"></style>');const h=b.generateUUID();this.id=h,this.target=document.createElement(p||"div"),this.setAttributes({"data-testid":h}),this.target.classList.add("pure-components",`component--${h}`),d&&this.setState(d),e&&this.setAttributes(e),s!=null&&s.length&&this.target.classList.add(...s.split(" ")),l&&this.setStyle(l),typeof a=="string"&&(this.target.innerHTML=a),n&&this.appendChildren(n),c&&this.bindEvents(c)}};let i=k;r(i,"create",(t={})=>new k(t));class f extends i{constructor(t={}){const{className:e,...n}=t;super({className:`button${e!=null&&e.length?` ${e}`:""}`,tagName:"button",...n})}}class g extends i{constructor(t={}){const{className:e,...n}=t;super({className:`container${e!=null&&e.length?` ${e}`:""}`,...n})}}class E extends i{constructor(e={}){const{className:n,...s}=e;super({className:`drawer${n!=null&&n.length?` ${n}`:""}`,...s});r(this,"assemble",e=>new Promise(n=>{const s=new f({className:"drawer__bt-close",innerHTML:"x",...e.btClose}),c=new i({children:{btClose:s},className:"drawer__header",...e.header}),a=new i({className:"drawer__body",...e.body}),d=new i({className:"drawer__footer",...e.footer}),l=new i({children:{header:c,body:a,footer:d},className:"drawer__content",...e.content}),p=new i({className:"drawer__overlay",...e.overlay});this.appendChildren({overlay:p,content:l}),n(!0)}));r(this,"close",async()=>{const{content:e,overlay:n}=this.children;await Promise.allSettled([e.fadeOut({transform:"translateX(-100%)"}),n.fadeOut({opacity:"0"})]),this.hide()});r(this,"init",async e=>{await this.assemble(e);const{content:n,overlay:s}=this.children;for(const c of[n.children.header.children.btClose,s])c.bindEvents({click:this.close})});r(this,"open",async()=>{this.show();const{content:e,overlay:n}=this.children;await Promise.allSettled([e.fadeIn({transform:"translateX(0)"}),n.fadeIn({opacity:"1"})])});this.init(e)}}class j extends i{constructor(e={}){const{className:n,...s}=e;super({className:`header${n!=null&&n.length?` ${n}`:""}`,tagName:"header",...s});r(this,"assemble",e=>new Promise(n=>{const s=new g({className:"header__container",...e.container});e.leftContent&&s.appendChildren({leftContent:new i({className:"header__left-content",...e.leftContent})}),e.centerContent&&s.appendChildren({centerContent:new i({className:"header__center-content",...e.centerContent})}),e.rightContent&&s.appendChildren({rightContent:new i({className:"header__right-content",...e.rightContent})}),this.appendChildren({container:s}),n(!0)}));r(this,"init",e=>{this.assemble(e)});this.init(e)}}class x extends f{constructor(e={}){const{className:n,...s}=e;super({className:`tab${n!=null&&n.length?` ${n}`:""}`,...s});r(this,"isActive",!1);r(this,"assemble",e=>new Promise(n=>{const s=new i({className:"tab__activity-indicator",...e.activityIndicator});this.appendChildren({activityIndicator:s}),n(!0)}));r(this,"init",async e=>{await this.assemble(e)});r(this,"setInactive",()=>{this.isActive=!1,this.children.activityIndicator.setStyle({width:"0"})});r(this,"setActive",()=>{this.isActive=!0,this.children.activityIndicator.setStyle({width:"100%"})});this.init(e)}}class C extends i{constructor(t={}){const{className:e,...n}=t;super({className:`tab-panel${e!=null&&e.length?` ${e}`:""}`,...n})}}class R extends i{constructor(e={}){const{className:n,...s}=e;super({className:`tabs${n!=null&&n.length?` ${n}`:""}`,...s});r(this,"activeTabIndex",0);r(this,"assemble",e=>new Promise(n=>{const s=new i({className:"tabs__tab-list",...e.tabList}),c=new i({className:"tabs__tab-panels",...e.tabPanels});this.appendChildren({tabList:s,tabPanels:c}),n(!0)}));r(this,"init",async e=>{const{activeTabIndex:n,tabList:s}=e;await this.assemble(e),this.setActiveTabIndex(n||0),s!=null&&s.children&&Object.values(s.children).forEach((c,a)=>{c.bindEvents({click:()=>this.setActiveTabIndex(a)})})});r(this,"setActiveTabIndex",e=>{const{tabList:n,tabPanels:s}=this.children,c=Object.values(n.children),a=Object.values(s.children);for(const d of c)d.setInactive();for(const d of a)d.hide();c[e].setActive(),a[e].show()});this.init(e)}}class y extends i{constructor(t){super({style:{marginBottom:"2rem",base:{fontSize:"0.875rem"},md:{fontSize:"1rem"}},...t})}}class B extends i{constructor(t){super({children:{container:new g({style:{gap:"1rem",paddingTop:"8rem",paddingBottom:"8rem"},children:{title:new i({innerHTML:t.title,style:{base:{fontSize:"1.85rem"},md:{fontSize:"2.5rem"}}}),description:new y({innerHTML:t.description})}})}})}}class L extends i{constructor(t={}){super({tagName:"pre",style:{whiteSpace:"break-spaces",backgroundColor:"#3f3f3f",padding:"1rem",borderRadius:"0.25rem",base:{fontSize:"0.875rem"},md:{fontSize:"1rem"}},...t})}}class S extends i{constructor(t){super({style:{marginBottom:"1rem",base:{fontSize:"1.5rem"},md:{fontSize:"1.75rem"}},...t})}}const z=new i({style:{display:"flex",gap:"1rem"},children:{button:new f({innerHTML:"Click me",events:{click:()=>alert("Button clicked!")}})}}),D=new L({innerHTML:`new Button({
  innerHTML: 'Click me',
  events: {
    click: () => alert('Button clicked!'),
  },
})`});class K extends i{constructor(){super({children:{container:new g({children:{title:new S({innerHTML:"Button"}),description:new y({innerHTML:"A simple button."}),componentExample:z,codeExample:D}})}})}}const U=new i({style:{display:"flex",gap:"1rem"},children:{component:new i({innerHTML:"I'm a Component.",style:{backgroundColor:"lightskyblue",padding:"2rem",color:"#222",fontWeight:"bold",borderRadius:"0.25rem",textAlign:"center"},children:{otherComponent:new i({innerHTML:"Other Component",style:{backgroundColor:"coral",padding:"2rem",borderRadius:"0.25rem",marginTop:"2rem"},events:{click:(o,t)=>{t.stopPropagation(),o.setStyle({backgroundColor:"rebeccapurple",color:"white"})}}})},events:{click:o=>{o.setStyle({backgroundColor:"rebeccapurple",color:"white"})},mouseleave:o=>{o.setStyle({backgroundColor:"lightskyblue",color:"black"}),o.children.otherComponent.setStyle({backgroundColor:"coral",color:"black"})}}})}}),q=new L({innerHTML:`new Component({
  innerHTML: "I'm a Component.",
  style: {
    backgroundColor: 'lightskyblue',
    padding: '2rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
  children: {
    otherComponent: new Component({
      innerHTML: 'Other Component',
      style: {
        backgroundColor: 'coral',
        padding: '2rem',
        borderRadius: '0.25rem',
        marginTop: '2rem',
      },
      events: {
        click: (instance, event) => {
          event.stopPropagation();
          instance.setStyle({ backgroundColor: 'rebeccapurple', color: 'white' });
        },
      },
    }),
  },
  events: {
    click: (instance) => {
      instance.setStyle({ backgroundColor: 'rebeccapurple', color: 'white' });
    },
    mouseout: (instance) => {
      instance.setStyle({ backgroundColor: 'lightskyblue', color: 'black' });
      instance.children.otherComponent.setStyle({
        backgroundColor: 'coral',
        color: 'black',
      });
    },
  },
})`});class W extends i{constructor(){super({children:{container:new g({children:{title:new S({innerHTML:"Component"}),description:new y({innerHTML:"A generic component that can be anything."}),componentExample:U,codeExample:q}})}})}}const X=new i({style:{display:"flex",gap:"1rem"},children:{tabs:new R({tabList:{children:{tab1:new x({innerHTML:"Tab 1"}),tab2:new x({innerHTML:"Tab 2"}),tab3:new x({innerHTML:"Tab 3"})}},tabPanels:{children:{panel1:new C({innerHTML:"TabPanel 1"}),panel2:new C({innerHTML:"TabPanel 2"}),panel3:new C({innerHTML:"TabPanel 3"})}}})}}),F=new L({innerHTML:`new Tabs({
  tabList: {
    children: {
      tab1: new Tab({
        innerHTML: 'Tab 1',
      }),
      tab2: new Tab({
        innerHTML: 'Tab 2',
      }),
      tab3: new Tab({
        innerHTML: 'Tab 3',
      }),
    },
  },
  tabPanels: {
    children: {
      panel1: new TabPanel({
        innerHTML: 'TabPanel 1',
      }),
      panel2: new TabPanel({
        innerHTML: 'TabPanel 2',
      }),
      panel3: new TabPanel({
        innerHTML: 'TabPanel 3',
      }),
    },
  },
}),`});class V extends i{constructor(){super({children:{container:new g({children:{title:new S({innerHTML:"Tabs"}),description:new y({innerHTML:"A simple tabs component."}),componentExample:X,codeExample:F}})}})}}class Z extends i{constructor(){super({children:{hero:new B({title:"Components",description:"Pure Components provide prebuild components to help you build your projects faster.<br>Here is a list with examples:"}),components:new i({style:{display:"flex",flexDirection:"column",gap:"4rem"},children:{componentSection:new W,buttonSection:new K,tabsSection:new V}})}})}}class G extends i{constructor(){const t={componentsScreenButton:new f({innerHTML:"Components",events:{click:()=>{v.navigate("components"),e.close()}}})},e=new E({body:{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:{...t}}}),n=new j({rightContent:{children:{btOpenDrawer:new f({style:{padding:"0.25rem"},innerHTML:'<svg width="1.5rem" height="1.5rem" focusable="false" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>',events:{click:e.open}})}},leftContent:{innerHTML:"Pure Components",style:{base:{fontSize:"1rem"},md:{fontSize:"1.25rem"}}}});super({className:"layout",children:{header:n,drawer:e}})}}class J extends i{constructor(){super({className:"router",children:{layout:new G}});r(this,"initialRoute","components");r(this,"routes",{components:{component:new Z,name:"Components"}});r(this,"navigate",(e=this.initialRoute)=>{for(const[n,s]of Object.entries(this.children.layout.children))n!=="header"&&n!=="drawer"&&s.destroy();this.children.layout.appendChildren({[e]:this.routes[e].component})})}}const v=new J;const H=class extends i{constructor(){super({className:"demo",children:{router:v}}),this.appendTo(document.querySelector("#app")),v.navigate()}};let w=H;r(w,"init",()=>{new H});w.init();
