import{r as w,j as n}from"./index-BWmU0So1.js";function E(){const f=w.useRef(null),[p,u]=w.useState(`Ctrl + C, Ctrl + V, Ctrl + P
There is a ladder that I climb, but it gets narrower with each step
I’m ruled by minutes of the hour
Reserved to nothing but the arms on the wall
And my seat at the oval table
Attuned to the drumbeat of the ticking clock
Careful to not twist my spine or crane my neck
And spiral out of orbit

Pinstripes stapled to my skin
But if you ripped at the metal seams and tore the two apart
Would you be harrowed by my decrepit entity
Vacant of warm showers and thick stew,
But embalmed with the sweetest vanilla paste?
Would you, too, look away?

Just as a passing stranger could only catch a glimpse
Of these tailored pants and a gouging gaze
But not my frosted fingertips of malaise
On the ladder you say that I’m hard to reach,
With yourself and the clouds below me
But am I hard to reach, or are you too far away?`),y=(e,s="	")=>{const o=e.selectionStart,a=e.selectionEnd,l=e.value,i=l.slice(0,o),h=l.slice(o,a),c=l.slice(a);if(h.includes(`
`)){const r=h.split(`
`),d=r.map(t=>s+t).join(`
`),m=i+d+c;u(m),requestAnimationFrame(()=>{const t=o,b=a+r.length*s.length;e.selectionStart=t,e.selectionEnd=b})}else{const r=i+s+c;u(r),requestAnimationFrame(()=>{const d=o+s.length;e.selectionStart=e.selectionEnd=d})}},g=e=>{const s=e.selectionStart,o=e.selectionEnd,a=e.value,l=a.slice(0,s),i=a.slice(s,o),h=a.slice(o),c=i.includes(`
`)?i.split(`
`):[i],r=c.map(t=>t.startsWith("	")?t.slice(1):t.startsWith("    ")?t.slice(4):t.startsWith("   ")?t.slice(3):t.startsWith("  ")?t.slice(2):t.startsWith(" ")?t.slice(1):t),d=r.join(`
`),m=l+d+h;u(m),requestAnimationFrame(()=>{const t=c.reduce((b,v,j)=>b+(v.length-r[j].length),0);e.selectionStart=s,e.selectionEnd=o-t})},x=e=>{const s=f.current;s&&e.key==="Tab"&&(e.preventDefault(),e.shiftKey?g(s):y(s,"	"))};return n.jsxs("div",{className:"flex h-full w-full flex-col bg-white text-black",children:[n.jsxs("div",{className:"flex h-8 items-center justify-between border-b-2 border-black bg-gray-200 px-2 text-sm",children:[n.jsx("span",{className:"font-bold",children:"README.txt"}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("button",{className:"border border-black bg-white px-2 active:translate-y-[1px]",children:"File"}),n.jsx("button",{className:"border border-black bg-white px-2 active:translate-y-[1px]",children:"Edit"}),n.jsx("button",{className:"border border-black bg-white px-2 active:translate-y-[1px]",children:"View"})]})]}),n.jsx("textarea",{ref:f,onPointerDown:e=>{var s;e.stopPropagation(),(s=f.current)==null||s.focus()},onMouseDown:e=>{e.stopPropagation()},className:"flex-1 resize-none border-none bg-white p-2 font-mono text-sm outline-none",value:p,onChange:e=>u(e.target.value),onKeyDown:x,spellCheck:!1,autoFocus:!0}),n.jsxs("div",{className:"flex h-6 items-center justify-end border-t-2 border-black bg-gray-100 px-2 text-xs text-gray-700",children:[p.length," chars"]})]})}export{E as default};
