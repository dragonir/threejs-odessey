import{T as x,W as P,C as D,S as E,a as k,s as O,P as B,A as F,O as V,b as A,c as N,V as t,d as L,D as I,e as G,f as W,M as j,G as q,R as H,U as J,E as K,g as Q,L as X}from"../three/three.3855f573.js";import"../vendor/vendor.d927beba.js";import{_ as Y}from"../index-21043359.js";import{o as Z,e as $,f as ee,q as ne,v as oe,g as f}from"../@vue/@vue.f12c5e7d.js";const re={animateCamera:(a,i,d,e,l=2e3,n)=>{const o=new x.Tween({x1:a.position.x,y1:a.position.y,z1:a.position.z,x2:i.target.x,y2:i.target.y,z2:i.target.z});o.to({x1:d.x,y1:d.y,z1:d.z,x2:e.x,y2:e.y,z2:e.z},l),o.onUpdate(function(s){a.position.x=s.x1,a.position.y=s.y1,a.position.z=s.z1,i.target.x=s.x2,i.target.y=s.y2,i.target.z=s.z2,i.update()}),o.onComplete(function(){i.enabled=!0,i.update(),n()}),o.easing(x.Easing.Cubic.InOut),o.start()}};var te=`varying vec3 vNormal;\r
varying vec3 camPos;\r
varying vec2 vUv;

void main() {\r
  vNormal = normal;\r
  vUv = uv;\r
  camPos = cameraPosition;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,ae=`#define NUM_OCTAVES 5\r
#define M_PI 3.1415926535897932384626433832795\r
uniform vec4 resolution;\r
varying vec3 vNormal;\r
uniform sampler2D perlinnoise;\r
uniform sampler2D sparknoise;\r
uniform sampler2D waterturbulence;\r
uniform sampler2D noiseTex;\r
uniform float time;\r
uniform vec3 color0;\r
uniform vec3 color1;\r
uniform vec3 color2;\r
uniform vec3 color3;\r
uniform vec3 color4;\r
uniform vec3 color5;\r
varying vec3 camPos;\r
varying vec2 vUv;

float rand(vec2 n) {\r
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\r
}

float noise(vec2 p){\r
  vec2 ip = floor(p);\r
  vec2 u = fract(p);\r
  u = u*u*(3.0-2.0*u);

  float res = mix(\r
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),\r
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);\r
  return res*res;\r
}

float fbm(vec2 x) {\r
  float v = 0.0;\r
  float a = 0.5;\r
  vec2 shift = vec2(100);\r
  
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));\r
  for (int i = 0; i < NUM_OCTAVES; ++i) {\r
    v += a * noise(x);\r
    x = rot * x * 2.0 + shift;\r
    a *= 0.5;\r
  }\r
  return v;\r
}

  float setOpacity(float r, float g, float b, float tonethreshold) {\r
  float tone = (r + g + b) / 3.0;\r
  float alpha = 1.0;\r
  if(tone<tonethreshold) {\r
    alpha = 0.0;\r
  }\r
  return alpha;\r
}

vec3 rgbcol(vec3 col) {\r
  return vec3(col.r/255.0,col.g/255.0,col.b/255.0);\r
}

vec2 rotate(vec2 v, float a) {\r
  float s = sin(a);\r
  float c = cos(a);\r
  mat2 m = mat2(c, -s, s, c);\r
  return m * v;\r
}

vec2 UnityPolarCoordinates (vec2 UV, vec2 Center, float RadialScale, float LengthScale){\r
  vec2 delta = UV - Center;\r
  float radius = length(delta) * 2. * RadialScale;\r
  float angle = atan(delta.x, delta.y) * 1.0/6.28 * LengthScale;\r
  return vec2(radius, angle);\r
}

void main() {\r
  vec2 olduv = gl_FragCoord.xy/resolution.xy ;\r
  vec2 uv = vUv ;\r
  vec2 imguv = uv;\r
  float scale = 1.;\r
  olduv *= 0.5 + time;\r
  olduv.y = olduv.y ;\r
  vec2 p = olduv*scale;\r
  float noise = fbm( p  )*0.04;\r
  vec4 txt = texture2D(perlinnoise, olduv);\r
  float gradient = dot(normalize( -camPos ), normalize( vNormal ));\r
  float pct = distance(vUv,vec2(0.5));

  vec3 rgbcolor0 = rgbcol(color0);\r
  vec3 rgbcolor1 = rgbcol(color1);\r
  vec3 rgbcolor2 = rgbcol(color2);\r
  vec3 rgbcolor3 = rgbcol(color3);\r
  vec3 rgbcolor4 = rgbcol(color4);\r
  vec3 rgbcolor5 = rgbcol(color5);

  
  float y = smoothstep(0.16, 0.5,pct);\r
  vec3 backcolor = mix(rgbcolor0, rgbcolor5, y);

  gl_FragColor = vec4(backcolor,1.);

  
  vec2 center = vec2(0.5);\r
  vec2 cor = UnityPolarCoordinates(vUv, center, 1., 1.);\r
  vec2 newvUv = vUv - 0.5;\r
  vec3 noisetexvUv = texture2D(perlinnoise,mod(rotate(newvUv*0.15 + vec2(sin(time*0.005),cos(time*0.005)),time),1.)).rgb;

  
  vec2 newUv = vec2(cor.x + time,cor.x+cor.y);\r
  vec3 noisetex = texture2D(perlinnoise,mod(newUv,1.)).rgb;\r
  vec3 noisetex2 = texture2D(sparknoise,mod(newUv,1.)).rgb;\r
  vec3 noisetex3 = texture2D(waterturbulence,mod(newUv,1.)).rgb;

  
  float tone0 =  1. - smoothstep(0.3,0.6,noisetex.r);\r
  float tone1 =  smoothstep(0.3,0.6,noisetex2.r);\r
  float tone2 =  smoothstep(0.3,0.6,noisetex3.r);

  
  float opacity0 = setOpacity(tone0,tone0,tone0,.29);\r
  float opacity1 = setOpacity(tone1,tone1,tone1,.49);\r
  float opacity2 = setOpacity(tone2,tone2,tone2,.69);

  
  float gradienttone = 1. - smoothstep(0.196,0.532,pct);\r
  vec4 circularnoise = vec4( vec3(gradienttone)*noisetexvUv*1.4, 1.0 );\r
  float gradopacity = setOpacity(circularnoise.r,circularnoise.g,circularnoise.b,0.19);

  
  vec2 uv2 = uv;\r
  float iTime = time*0.004;\r
  uv.y += iTime / 10.0;\r
  uv.x -= (sin(iTime/10.0)/2.0);\r
  uv2.x += iTime / 14.0;\r
  uv2.x += (sin(iTime/10.0)/9.0);\r
  float result = 0.0;\r
  result += texture2D(noiseTex, mod(uv*0.5,1.) * 0.6 + vec2(iTime*-0.003)).r;\r
  result *= texture2D(noiseTex, mod(uv2*0.5,1.) * 0.9 + vec2(iTime*+0.002)).b;\r
  result = pow(result, 4.0);

  
  if(opacity2>0.0){\r
    gl_FragColor = vec4(rgbcolor4,0.)*vec4(opacity2);\r
  } else if(opacity1>0.0){\r
    gl_FragColor = vec4(rgbcolor2,0.)*vec4(opacity1);\r
  } else if(opacity0>0.0){\r
    gl_FragColor = vec4(rgbcolor1,0.)*vec4(opacity0);\r
  }\r
  gl_FragColor += vec4(108.0)*result*(y*0.02);\r
  gl_FragColor *= vec4(gradopacity);\r
}`;const R=a=>(ne("data-v-75a3e579"),a=a(),oe(),a),ie={class:"home"},se=R(()=>f("canvas",{class:"webgl"},null,-1)),le=R(()=>f("a",{class:"github",href:"https://github.com/dragonir/threejs-odessey",target:"_blank",rel:"noreferrer"},[f("svg",{height:"40","aria-hidden":"true",viewBox:"0 0 16 16",version:"1.1",width:"40","data-view-component":"true"},[f("path",{fill:"#ffffff",fillRule:"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})]),f("span",{class:"author"},"@dragonir")],-1)),ce=[se,le],ue={__name:"index",setup(a){class i extends Q{constructor(l,n,o,s){super(),this.radiusTop=l,this.radiusBottom=n,this.height=o,this.turns=s}getPoint(l){const n=this.turns*2*Math.PI*l,o=(this.radiusTop-this.radiusBottom)*l+this.radiusBottom,s=Math.cos(n)*o,p=l*this.height,c=Math.sin(n)*o;return new t(s,p,c)}}const d=()=>{const e={width:window.innerWidth,height:window.innerHeight},l=document.querySelector("canvas.webgl"),n=new P({canvas:l,antialias:!0,alpha:!0});n.setSize(e.width,e.height),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.autoClear=!1,n.setClearAlpha(0),n.useLegacyLights=!0,n.toneMapping=D,n.toneMappingExposure=2;const o=new E,p=new k().load([new URL(""+new URL("../px-09c44bc0.jpg",import.meta.url).href,self.location).href,new URL(""+new URL("../nx-87600fc2.jpg",import.meta.url).href,self.location).href,new URL(""+new URL("../py-4a145873.jpg",import.meta.url).href,self.location).href,new URL(""+new URL("../ny-8e235718.jpg",import.meta.url).href,self.location).href,new URL(""+new URL("../pz-8001fb60.jpg",import.meta.url).href,self.location).href,new URL(""+new URL("../nz-3edf24d3.jpg",import.meta.url).href,self.location).href]);p.encoding=O,o.background=p,o.environment=p;const c=new B(55,e.width/e.height,1,1e3);o.add(c),c.position.set(0,100,200);const C=new F(16777215,1.5);o.add(C);const m=new V(c,n.domElement);m.enableDamping=!0,m.enablePan=!1,window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,n.setSize(e.width,e.height),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.aspect=e.width/e.height,c.updateProjectionMatrix()});const g=new A,r={exposure:5,bloomStrength:1,bloomThreshold:.5,bloomRadius:.5,color0:[0,242,22],color1:[2,20,2],color2:[44,97,15],color3:[14,28,5],color4:[255,255,255],color5:[0,190,232]},u=new N({uniforms:{time:{type:"f",value:0},perlinnoise:{type:"t",value:g.load(new URL(""+new URL("../perlinnoise-e6a198af.png",import.meta.url).href,self.location).href)},sparknoise:{type:"t",value:g.load(new URL(""+new URL("../sparknoise-999ad35e.png",import.meta.url).href,self.location).href)},waterturbulence:{type:"t",value:g.load(new URL(""+new URL("../waterturbulence-661c0267.png",import.meta.url).href,self.location).href)},noiseTex:{type:"t",value:g.load(new URL(""+new URL("../noise-e59217a8.png",import.meta.url).href,self.location).href)},color5:{value:new t(...r.color5)},color4:{value:new t(...r.color4)},color3:{value:new t(...r.color3)},color2:{value:new t(...r.color2)},color1:{value:new t(...r.color1)},color0:{value:new t(...r.color0)},resolution:{value:new L(e.width,e.height)}},fragmentShader:ae,vertexShader:te,side:I,transparent:!0}),T=new i(5,1,10,5),b=new G;b.add(T);const S=new W(b,256,.25,64,!1),y=new j(S,u);y.position.y=-4,o.add(y);const z=v=>{u.uniforms.time.value=v/2e4,u.uniforms.color5.value=new t(...r.color5),u.uniforms.color4.value=new t(...r.color4),u.uniforms.color3.value=new t(...r.color3),u.uniforms.color2.value=new t(...r.color2),u.uniforms.color1.value=new t(...r.color1),u.uniforms.color0.value=new t(...r.color0)},U=new X;U.onLoad=()=>{re.animateCamera(c,m,{x:0,y:1,z:15},{x:0,y:0,z:0},4e3,()=>{})},new q(U).load(new URL(""+new URL("../shrine-49a0fe0f.glb",import.meta.url).href,self.location).href,v=>{v.scene&&(v.scene.scale.set(.1,.1,.1),v.scene.position.y=-7,o.add(v.scene))});const M=new H(o,c),h=new J(new L(window.innerWidth,window.innerHeight),1.5,.4,.85);h.threshold=r.bloomThreshold,h.strength=r.bloomStrength,h.radius=r.bloomRadius;const w=new K(n);w.renderToScreen=!0,w.addPass(M),w.addPass(h);const _=v=>{z(v),w.render(),y.rotation.y-=.01,x&&x.update(),m.update(),window.requestAnimationFrame(_)};_()};return Z(()=>{d()}),(e,l)=>($(),ee("div",ie,ce))}},ge=Y(ue,[["__scopeId","data-v-75a3e579"]]);export{ge as default};
