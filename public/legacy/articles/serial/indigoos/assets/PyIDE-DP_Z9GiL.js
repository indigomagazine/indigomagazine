import{j as e,c as h,a as m,p as f,b as g,u as _,r as n,_ as v}from"./index-BWmU0So1.js";import{u as j}from"./usePython-WVKzN_EL.js";function w({children:t,className:s,...l}){return e.jsx("button",{className:h("bg-white px-2 shadow-[inset_-2px_-2px_3px_0px_rgba(0,0,0,0.4)] active:shadow-[inset_-1px_-1px_3px_0px_rgba(0,0,0,0.4)]",s),...l,children:t})}const y=`import math

print("Hello, world!")
print("Square root of 2 is", math.sqrt(2))`,b=m(f(t=>({code:y,setCode:s=>t({code:s})}),{name:"pyeditor-store",storage:g(()=>localStorage)})),E=n.lazy(()=>v(()=>import("./index-BbjPBGlu.js"),__vite__mapDeps([0,1,2,3,4])));function C(){const{setIsResizable:t,setInitialSize:s}=_(),{runCode:l}=j(),[c,r]=n.useState(""),{code:i,setCode:u}=b();async function d(){r("Running...");const a=i.trim();let o="";l(a,x=>{o+=x+`
`,r(o)})}n.useEffect(()=>{t(!0),s({width:550,height:380})},[]);function p(a){u(a.target.value)}return e.jsxs("div",{className:"flex h-full w-full flex-col",children:[e.jsx("div",{className:"flex h-6 items-center bg-gray-300",children:e.jsx(w,{onClick:d,className:"h-full",children:"Run"})}),e.jsx("div",{className:"flex-1 overflow-auto",children:e.jsx(n.Suspense,{children:e.jsx(E,{className:"!min-h-full !overflow-hidden !bg-gray-200 !text-sm",onChange:p,"data-color-mode":"light",language:"python",value:i})})}),e.jsx("div",{className:"h-[25%] w-full overflow-auto bg-gray-300 p-2 text-sm",children:c.split(`
`).map((a,o)=>e.jsx("div",{children:a},o))})]})}export{C as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BbjPBGlu.js","assets/index-BWmU0So1.js","assets/index-cUP08M0n.css","assets/refractor-CzRbB5sG.js","assets/index-DVHzoe7z.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
