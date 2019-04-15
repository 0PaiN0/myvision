!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=fabric},function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o);function r(e){e.__eventListeners&&(e.__eventListeners["mouse:down"]=[],e.__eventListeners["mouse:over"]=[],e.__eventListeners["mouse:out"]=[],e.__eventListeners["mouse:move"]=[],e.__eventListeners["mouse:up"]=[],e.__eventListeners["object:moving"]=[])}const a={};function s(e,t){return{left:e.origX,top:e.origY,width:t.x-e.origX,height:t.y-e.origY,stroke:"rgba(255,0,0)",strokeWidth:2,fill:"rgba(255,0,0,0)",shapeName:"bndBoxTemp"}}function l(e,t){const n=document.getElementById("labelNamePopUp");n.style.display="block";const o=document.getElementById("canvas-wrapper").getBoundingClientRect(),i=o.top,r=o.left;n.style.top=`${t+i}px`,n.style.left=`${e+r}px`}function c(){document.getElementById("labelNamePopUp").style.display="none"}a.tempBndBoxProps=s,a.finalBndBoxProps={fill:"rgba(255,0,0,0)",shapeName:"bndBox",objectCaching:!1,selectable:!1};const u={};function f(e,t){return{radius:3.5,fill:"#ffffff",stroke:"#333333",strokeWidth:.5,left:t.x,top:t.y,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",shapeName:"tempPoint",pointId:e,objectCaching:!1}}function d(e){return{radius:3.5,fill:"#ffffff",stroke:"#333333",strokeWidth:.5,selectable:!0,shapeName:"tempPoint",pointId:e,lockMovementX:!1,lockMovementY:!1}}function g(e,t){return{radius:3.5,fill:"blue",stroke:"#333333",strokeWidth:.5,left:t.x,top:t.y,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",shapeName:"point",objectCaching:!1,pointId:e,perPixelTargetFind:!0}}function h(e,t){const n={radius:4,fill:"red",stroke:"#333333",strokeWidth:.5,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",shapeName:"point",objectCaching:!1,pointId:e,perPixelTargetFind:!0,lockMovementX:!0,lockMovementY:!0};return t&&(n.left=t.x,n.top=t.y),n}function p(e,t){const n={radius:4,fill:"green",stroke:"#333333",strokeWidth:.5,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",shapeName:"point",objectCaching:!1,pointId:e,perPixelTargetFind:!0,lockMovementX:!0,lockMovementY:!0};return t&&(n.left=t.x,n.top=t.y),n}u.newPolygon={stroke:"rgba(255,0,0)",strokeWidth:1.75,fill:"rgba(237, 237, 237, 0.01)",perPixelTargetFind:!0,hasBorders:!1,hasControls:!1,shapeName:"polygon",selectable:!1,evented:!0,objectCaching:!1,numberOfNullPolygonPoints:0},u.newTempPolygon={stroke:"#333333",strokeWidth:.8,fill:"#cccccc",opacity:.3,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1,numberOfNullPolygonPoints:-3},u.newLine={strokeWidth:1.1,fill:"#999999",stroke:"#999999",class:"line",originX:"center",originY:"center",selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1},u.firstPoint={fill:"red",shapeName:"firstPoint",lockMovementX:!0,lockMovementY:!0},u.removablePoint={fill:"red",radius:4},u.additionalPoint={fill:"green",radius:4},u.disabledButton={fill:"white",radius:3},u.newPoint=f,u.changeRemovablePointToTemp=d,u.existingPolygonPoint=g,u.removablePolygonPoint=h,u.initialAddPolygonPoint=p;let m=null,b=[],v=null,y=null;function w(e,t,n,o){!function(e,t,n,o){m=e,b=t,v=n,y=o}(e,t,n,o);const r=function(){const e=new i.a.Polygon([],y.newPolygon);return e.set({id:m.id,selectable:!0}),e}();v.add(r);const a=function(e){let t=0;const n=[];return e.forEach(e=>{const o=new i.a.Circle(y.existingPolygonPoint(t,e));v.add(o),b.push(o),n.push({x:o.left-1,y:o.top-1}),t+=1}),n}(function(){const e=m.calcTransformMatrix();return m.get("points").map(e=>new i.a.Point(e.x-m.pathOffset.x,e.y-m.pathOffset.y)).map(t=>i.a.util.transformPoint(t,e))}());return v.remove(m),(m=r).set("points",a),function(){const e=m._calcDimensions();m.set({left:e.left,top:e.top,height:e.height,width:e.width,pathOffset:{x:e.left+e.width/2,y:e.top+e.height/2}}),m.setCoords(),v.renderAll()}(),m}let x=null,P=null,k=[],N=!1;function C(){return N}function j(){0!==k.length&&(k.forEach(e=>{x.remove(e)}),x.renderAll(),k=[]),N=!1}function O(){P=w(P,k,x,u),N=!0}function A(e,t){x=e,P=t}function B(e,t,n,o){A(e,t),e.discardActiveObject(),n?o?function(){let e=0;k=[],x.forEachObject(t=>{"tempPoint"!==t.shapeName&&"firstPoint"!==t.shapeName||(t.set(u.removablePolygonPoint(e)),k.push(t),e+=1)})}():function(){let e=0;P.get("points").forEach(t=>{const n=new i.a.Circle(u.removablePolygonPoint(e,t));x.add(n),k.push(n),e+=1})}():function(){let e=0;P.get("points").forEach(t=>{const n=new i.a.Circle(u.existingPolygonPoint(e,t));x.add(n),k.push(n),e+=1})}(),N=!0}function E(e){if(P.points.length-P.numberOfNullPolygonPoints>3){if(0===Object.keys(P.points[e]).length){for(let t=e-1;t>-1;t-=1)if(0!==Object.keys(P.points[t]).length){P.points[P.points.length-1]=P.points[t],P.points[t]={};break}}else if(P.points.length-1===e){for(let t=e-1;t>-1;t-=1)if(0!==Object.keys(P.points[t]).length){P.points[e]=P.points[t],P.points[t]={};break}}else P.points[e]={};x.remove(k[e]),k[e]=null,P.numberOfNullPolygonPoints+=1,P.points.length-P.numberOfNullPolygonPoints>3&&console.log("need to signal restrictions"),x.renderAll()}}function M(){x&&(x.preserveObjectStacking=!1)}function _(){x.preserveObjectStacking=!0}let X=!1,Y=!1,I=null,W=!1;function T(e,t){var n,o;W?(n=t,o=e.target,A(n,o),n.discardActiveObject(),O(),I=e.target.id):O(),X=!1}function L(){!function(){const e=P._calcDimensions();P.set({left:e.left,top:e.top,height:e.height,width:e.width,pathOffset:{x:e.left+e.width/2,y:e.top+e.height/2}}),P.setCoords(),x.renderAll()}(),Y=!1}function R(){j(),I=null}function U(e,t){X?T(e,t):W?function(e,t){C()&&j(),B(t,e.target),I=e.target.id}(e,t):Y?L():e.target&&"polygon"===e.target.shapeName?(x.discardActiveObject(),k.forEach(e=>{e&&e.bringForward()}),N=!0):!e.target&&C()&&R()}function S(e){e.target&&("polygon"===e.target.shapeName?(C()&&j(),X=!0):"point"===e.target.shapeName&&(!function(e){const{left:t}=e.target,{top:n}=e.target,o=e.target;P.points[o.pointId]={x:t,y:n}}(e),Y=!0))}function $(){I=null}let H=null,F=!1,D=!1,z=null;function q(){z.forEachObject(e=>{"bndBox"===e.shapeName?e.selectable=!0:(e.lockMovementX=!1,e.lockMovementY=!1),"point"===e.shapeName&&(e.fill="blue",e.radius=3.5)})}function G(e){e.target&&"polygon"===e.target.shapeName&&F?($(),function(e){C()&&(j(),D=!0),B(z,e.target,!0),H=e.target.id}(e)):(!e.target&&C()||e.target&&"bndBox"===e.target.shapeName)&&(j(),H=null)}function J(e,t){t?q():e.forEachObject(e=>{e.selectable=!0}),e.defaultCursor="default",e.hoverCursor="move",e.renderAll()}const K={};let Q=!1,V=null,Z=null,ee=0;function te(e,t){V=e,Z=t,Q=!0}function ne(){const e=document.getElementById("label-title").value;J(Z),c(),V.set("id",ee),ee+=1,K[V[V.id]]=e,Q=!1}function oe(){return Q}function ie(e,t){e.discardActiveObject(),t||function(e){e.forEachObject(e=>{e.selectable=!1})}(e),e.defaultCursor="crosshair",e.hoverCursor="crosshair",e.renderAll()}let re=null,ae=!1,se=!1;const le={};function ce(e){(re=e).backgroundImage&&(ae=!0,ie(re),re.discardActiveObject()),e.on("mouse:down",()=>{!function(){if(ae){se=!0;const e=re.getPointer(re.e);le.origX=e.x,le.origY=e.y,le.rect=new i.a.Rect(a.tempBndBoxProps(le,e)),re.add(le.rect)}}()}),e.on("mouse:move",e=>{!function(e){if(!se)return;const t=re.getPointer(e.e);le.origX>t.x&&le.rect.set({left:Math.abs(t.x)}),le.origY>t.y&&le.rect.set({top:Math.abs(t.y)}),le.rect.set({width:Math.abs(le.origX-t.x)}),le.rect.set({height:Math.abs(le.origY-t.y)}),re.renderAll()}(e)}),e.on("mouse:up",e=>{!function(e){if(se){ae=!1,se=!1,le.rect.setCoords(),le.rect.set(a.finalBndBoxProps),J(re);const t=re.getPointer(e.e);te(le.rect,re),l(t.x,t.y)}}(e)})}let ue=!1,fe=!1,de=!1;function ge(){return fe}function he(e){ue=e}function pe(e){fe=e}let me=null,be=[],ve=!0,ye=!1,we=0,xe=null;function Pe(){me.remove(ye),ye=null}function ke(){return null!==ye}function Ne(e){const t=me.getPointer(e.e);(function(e){return!(!ye||xe.x===e.x)})(t)||(e.target&&e.target.shapeName&&"firstPoint"===e.target.shapeName?function(e){const t=[];be.forEach(e=>{t.push({x:e.left,y:e.top}),me.remove(e)}),Pe();const n=new i.a.Polygon(t,u.newPolygon);me.add(n),ye=null,ve=!1,te(n,me),l(e.x,e.y)}(t):ve&&function(e){const t=new i.a.Circle(u.newPoint(we,e));we+=1,0===be.length&&t.set(u.firstPoint);let n=[e.x,e.y,e.x,e.y];if(ye){(n=ye.get("points")).push({x:e.x,y:e.y});const t=new i.a.Polygon(n,u.newTempPolygon);me.remove(ye),me.add(t),ye=t,me.renderAll()}else{const t=[{x:e.x,y:e.y}],n=new i.a.Polygon(t,u.newTempPolygon);ye=n,me.add(n)}be.push(t),me.add(t),me.selection=!1}(t))}function Ce(){!function(){const e=ye.get("points"),t=[];e.forEach(e=>{Object.keys(e).length>0&&t.push({x:e.x,y:e.y})}),ye.set({points:t}),me.renderAll();let n=0;const o=[];me.forEachObject(e=>{"point"===e.shapeName&&(e.set(u.changeRemovablePointToTemp(n)),0===n&&e.set(u.firstPoint),n+=1,o.push(e))}),be=o,we=n,me.renderAll(),t[be.length]={x:t[0].x,y:t[0].y},ye.set({points:t}),me.renderAll(),ie(me,!0),me.renderAll()}()}function je(e,t){t?Ce():(ve=!0,(me=e).discardActiveObject(),ie(me)),e.on("mouse:down",e=>{(!e.target||e.target&&"tempPoint"!==e.target.shapeName)&&Ne(e)}),e.on("object:moving",e=>{!function(e){if(ye){const t=e.target.getCenterPoint().x,n=e.target.getCenterPoint().y;ye.points[e.target.pointId]={x:t,y:n}}}(e)}),e.on("mouse:move",e=>{!function(e){if(ye){const t=me.getPointer(e.e);xe=t;const n=ye.get("points");n[be.length]={x:t.x,y:t.y},ye.set({points:n})}me.renderAll()}(e)}),e.on("mouse:over",t=>{t.target&&t.target.selectable?e.hoverCursor="move":e.hoverCursor="crosshair"})}function Oe(e){e.getActiveObject()?e.remove(e.getActiveObject()):P&&x.remove(P),pe(!1)}function Ae(e){!function(e){e.forEachObject(e=>{"point"===e.shapeName&&(e.set(u.disabledButton),e.selectable=!1)}),e.renderAll()}(e),e.defaultCursor="default",e.hoverCursor="default"}let Be=null,Ee=!1,Me=null;function _e(e){e.target&&"polygon"===e.target.shapeName&&Ee?($(),Be=function(e,t){x=e,P=t,C()&&(j(),k=[]),x.discardActiveObject();let n=0;return P.get("points").forEach(e=>{const t=new i.a.Circle(u.initialAddPolygonPoint(n,e));x.add(t),k.push(t),n+=1}),N=!0,P.id}(Me,e.target)):(!e.target&&C()||e.target&&"bndBox"===e.target.shapeName)&&(j(),Be=null)}function Xe(e){Me=e,e.on("mouse:down",e=>{!function(e){e.target&&(M(),"polygon"===e.target.shapeName&&e.target.id!==Be?Ee=!0:"point"===e.target.shapeName?Ae(Me):(_(),Ee=!1))}(e)}),e.on("mouse:over",()=>{}),e.on("mouse:up",e=>{_e(e)}),e.on("mouse:out",()=>{})}function Ye(e){!function(e){e.forEachObject(e=>{"bndBox"===e.shapeName?e.selectable=!1:(e.lockMovementX=!0,e.lockMovementY=!0),"point"===e.shapeName&&e.set(u.additionalPoint)}),e.renderAll()}(e),e.defaultCursor="default",e.hoverCursor="default"}function Ie(e){r(e),Xe(e),Ye(e),he(!1),de=!0}function We(e,t){t&&function(e){I=e}(t),e.on("mouse:down",e=>{!function(e){e.target?(M(),"bndBox"===e.target.shapeName&&C()?(R(),W=!1):"polygon"===e.target.shapeName&&e.target.id!==I?W=!0:(_(),W=!1)):W=!1}(e)}),e.on("mouse:up",t=>{U(t,e)}),e.on("object:moving",e=>{S(e)}),e.on("object:scaling",e=>{!function(e){if("bndBox"===e.target.shapeName){const t=e.target;t.width*=t.scaleX,t.height*=t.scaleY,t.scaleX=1,t.scaleY=1}}(e)}),e.on("mouse:over",t=>{!function(e,t){e.target&&"point"!==e.target.shapeName&&(e.target.set("fill","rgba(255,0,0,0.2)"),t.renderAll())}(t,e)}),e.on("mouse:out",t=>{t.target&&"point"!==t.target.shapeName&&("bndBox"===t.target.shapeName?function(e){e.target.set("fill","rgba(255,0,0,0")}(t):"polygon"===t.target.shapeName&&function(e){e.target.set("fill","rgba(255,0,0,0.01)")}(t),e.renderAll())})}function Te(e){ue||(r(e),J(e,ge()),We(e),ge()&&he(!1),he(!0))}function Le(e){!function(e){e.forEachObject(e=>{"bndBox"===e.shapeName?e.selectable=!1:(e.lockMovementX=!0,e.lockMovementY=!0),"point"===e.shapeName&&e.set(u.removablePoint)}),e.renderAll()}(e),e.defaultCursor="default",e.hoverCursor="default"}function Re(e){z=e,e.on("mouse:down",e=>{!function(e){e.target&&(M(),"polygon"===e.target.shapeName&&e.target.id!==H?F=!0:"point"===e.target.shapeName?E(e.target.pointId):_())}(e)}),e.on("mouse:over",e=>{!function(e){e.target&&"point"===e.target.shapeName&&(e.target.stroke="red",z.renderAll())}(e)}),e.on("mouse:up",e=>{G(e)}),e.on("mouse:out",e=>{!function(e){e.target&&"point"===e.target.shapeName&&(e.target.stroke="black",z.renderAll())}(e)})}let Ue=null;function Se(e){var t;t=e,ye.get("points").length-=1,B(Ue=t,ye,!0,!0),e.on("mouse:down",e=>{!function(e){e.target&&"point"===e.target.shapeName&&E(e.target.pointId)}(e)}),e.on("mouse:over",e=>{!function(e){e.target&&"point"===e.target.shapeName&&(e.target.stroke="red",Ue.renderAll())}(e)}),e.on("mouse:up",e=>{}),e.on("mouse:out",e=>{!function(e){e.target&&"point"===e.target.shapeName&&(e.target.stroke="black",Ue.renderAll())}(e)})}function $e(e){if(ke())je(e,!0),he(!1);else{J(e,!0),We(e,H),he(!0)}}function He(e){ge()?(r(e),$e(e),pe(!1)):(r(e),function(e){const t=ke();t?Se(e):t||Re(e)}(e),function(e){const t=ke();t?function(e){e.defaultCursor="default",e.hoverCursor="default",e.renderAll()}(e):t||Le(e)}(e),he(!1),pe(!0))}const Fe={uploaded:!1,name:null},De={};let ze=null;function qe(e,t){t?function(e,t){ze.setWidth(t.width),ze.setHeight(t.height),i.a.Image.fromURL(e.src,e=>{ze.setBackgroundImage(e,ze.renderAll.bind(ze),{scaleX:ze.width/e.width,scaleY:ze.height/e.height})})}(e,t):function(e){ze.setWidth(e.width),ze.setHeight(e.height),ze.setBackgroundColor({source:e.src},()=>{ze.renderAll()})}(e)}function Ge(e){const t={},n=De.maximumCanvasWidth/e.width;return t.width=De.maximumCanvasWidth,t.height=e.height*n,t}function Je(){Fe.uploaded=!0;const e=this;if(De.maximumCanvasHeight<e.height){let t=function(e){const t={},n=De.maximumCanvasHeight/e.height;return t.height=De.maximumCanvasHeight,t.width=e.width*n,t}(e);De.maximumCanvasWidth<t.width&&(t=Ge(t)),qe(e,t)}else if(De.maximumCanvasWidth<e.width){qe(e,Ge(e))}else qe(e)}function Ke(e){const t=new Image;t.src=e.target.result,t.onload=Je}function Qe(e){ze=e,De.maximumCanvasHeight=window.innerHeight-54,De.maximumCanvasWidth=window.innerWidth-110}function Ve(e){return function e(t){let n="";return Object.keys(t).forEach(o=>{"object"==typeof t[o]?n+=`<${o}>${e(t[o])}</${o}>`:n+=`<${o}>${t[o]}</${o}>`}),n}(e)}let Ze=null;function et(e){const t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});return t.setAttribute("href",window.URL.createObjectURL(n)),t.setAttribute("download",`${new RegExp("^([^.]+)").exec(Fe.name)[0]}.xml`),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.draggable=!0,t.classList.add("dragout"),t}function tt(){et(Ve(function(e,t){const n={};return n.annotations=function(e,t){return{folder:"Unknown",filename:t.name,path:"Unknown",source:{database:"Unknown"},size:{width:e.getWidth(),height:e.getHeight(),depth:1},segmented:0}}(e,t),n.annotations.object=function(e){let t={};return e.forEachObject(e=>{const n=e._objects[0],o=e._objects[1].text;t={name:o,pose:"Unspecified",truncated:1,difficult:0,bndbox:{xmin:n.left,ymin:n.top,xmax:n.left+n.width,ymax:n.top+n.height}}}),t}(e),n}(Ze,Fe))).click()}function nt(e){!function(e){if(e.files&&e.files[0]){const t=new FileReader;Fe.name=e.files[0].name,t.onload=Ke,t.readAsDataURL(e.files[0])}}(e)}let ot=null;function it(){var e;r(e=ot),ce(e),he(!1),pe(!1)}function rt(){var e;r(e=ot),je(e),he(!1),pe(!1)}function at(){Ie(ot)}function st(){Oe(ot)}function lt(){Te(ot)}function ct(){He(ot)}function ut(){ot.backgroundImage&&tt()}function ft(e){nt(e)}function dt(){ne(),lt()}function gt(){oe()&&(c(),Z.remove(V),Q=!1)}function ht(){be[0]&&(be.forEach(e=>{me.remove(e)}),Pe(),be=[],ye=null,we=0),gt(),j(),$(),D&&(q(),D=!1)}function pt(e){ht(),e&&e()}function mt(e){oe()||e&&e()}!function(){const e=new i.a.Canvas("c",{selection:!1});i.a.Object.prototype.transparentCorners=!1,ot=e,Qe(e),function(e){Ze=e}(e)}(),function(){window.createNewBndBox=pt.bind(this,it),window.createNewPolygon=pt.bind(this,rt),window.addPoints=mt.bind(this,at),window.removePoint=mt.bind(this,ct),window.removeShape=pt.bind(this,st),window.downloadXML=pt.bind(this,ut),window.cancel=pt.bind(this,lt),window.uploadImage=function(e,t,n){ht(),t&&t(n)}.bind(this,this,ft)}(),window.labelShape=dt}]);