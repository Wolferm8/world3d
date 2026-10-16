export const WORLD_HTML = `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<style>html,body{margin:0;overflow:hidden;background:#87ceeb;touch-action:none}
#h{position:fixed;top:8px;left:0;right:0;text-align:center;font:14px sans-serif;color:#fff;pointer-events:none;text-shadow:0 1px 3px #000}</style>
</head><body><div id="h">Left side: move &middot; Right side: look</div>
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script>
var scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
scene.fog=new THREE.Fog(0x87ceeb,20,140);
var camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,300);
var renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x446644,0.9));
var sun=new THREE.DirectionalLight(0xfff2cc,0.8);sun.position.set(50,80,30);scene.add(sun);
var ground=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshLambertMaterial({color:0x4caf50}));
ground.rotation.x=-Math.PI/2;scene.add(ground);
function rnd(a,b){return a+Math.random()*(b-a);}
for(var i=0;i<140;i++){
  var x=rnd(-120,120),z=rnd(-120,120);
  if(Math.abs(x)<5&&Math.abs(z)<5)continue;
  var h=rnd(3,7);
  var t=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.5,h*0.4,6),new THREE.MeshLambertMaterial({color:0x8d5a2b}));
  t.position.set(x,h*0.2,z);scene.add(t);
  var l=new THREE.Mesh(new THREE.ConeGeometry(rnd(1.5,2.5),h,7),new THREE.MeshLambertMaterial({color:0x1b5e20}));
  l.position.set(x,h*0.4+h*0.5,z);scene.add(l);
}
for(var j=0;j<40;j++){
  var s=rnd(0.6,2);
  var r=new THREE.Mesh(new THREE.DodecahedronGeometry(s),new THREE.MeshLambertMaterial({color:0x9e9e9e}));
  r.position.set(rnd(-120,120),s*0.5,rnd(-120,120));scene.add(r);
}
var tower=new THREE.Mesh(new THREE.BoxGeometry(6,30,6),new THREE.MeshLambertMaterial({color:0xe53935}));
tower.position.set(0,15,-40);scene.add(tower);
var orb=new THREE.Mesh(new THREE.SphereGeometry(2,24,24),new THREE.MeshLambertMaterial({color:0xffeb3b,emissive:0xaa8800}));
orb.position.set(0,34,-40);scene.add(orb);

var yaw=0,pitch=0,mv={x:0,y:0},look=null,move=null;
camera.position.set(0,1.7,10);
addEventListener('touchstart',function(e){
  for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];
    if(t.clientX<innerWidth/2&&!move)move={id:t.identifier,x:t.clientX,y:t.clientY};
    else if(t.clientX>=innerWidth/2&&!look)look={id:t.identifier,x:t.clientX,y:t.clientY};}
},{passive:false});
addEventListener('touchmove',function(e){
  e.preventDefault();
  for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];
    if(move&&t.identifier===move.id){
      mv.x=Math.max(-1,Math.min(1,(t.clientX-move.x)/50));
      mv.y=Math.max(-1,Math.min(1,(t.clientY-move.y)/50));}
    else if(look&&t.identifier===look.id){
      yaw-=(t.clientX-look.x)*0.005;
      pitch=Math.max(-1.2,Math.min(1.2,pitch-(t.clientY-look.y)*0.005));
      look.x=t.clientX;look.y=t.clientY;}}
},{passive:false});
addEventListener('touchend',function(e){
  for(var i=0;i<e.changedTouches.length;i++){var id=e.changedTouches[i].identifier;
    if(move&&id===move.id){move=null;mv.x=0;mv.y=0;}
    if(look&&id===look.id){look=null;}}
});
addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
var last=performance.now();
function loop(now){
  requestAnimationFrame(loop);
  var dt=Math.min((now-last)/1000,0.05);last=now;
  var sp=8*dt;
  camera.position.x+=(-Math.sin(yaw)*-mv.y+Math.cos(yaw)*mv.x)*sp;
  camera.position.z+=(-Math.cos(yaw)*-mv.y-Math.sin(yaw)*mv.x)*sp;
  camera.rotation.order='YXZ';camera.rotation.y=yaw;camera.rotation.x=pitch;
  orb.position.y=34+Math.sin(now/600)*1.5;orb.rotation.y+=dt;
  renderer.render(scene,camera);
}
requestAnimationFrame(loop);
</script></body></html>`;
