angular.module("carModel", [])
  .directive( "carModel",
    [function () {
      return {
        restrict: "E",
        link: function (scope, elem, attr) {

          var scene, camera, renderer, car, controls;
          var mouseX = 0, mouseY = 0, angle = 0;
          var windowHalfX = window.innerWidth / 2;
          var windowHalfY = window.innerHeight / 2;
          var left = false, right = false, up = false, down = false;

          init();

          function init() {
              scene = new THREE.Scene();
              scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );
              renderer = new THREE.WebGLRenderer( { antialias: true } );
              renderer.setSize( window.innerWidth, window.innerHeight );
              renderer.setClearColor( scene.fog.color );
              renderer.setPixelRatio( window.devicePixelRatio );
              elem[0].appendChild(renderer.domElement);

              camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
              camera.position.y = 1;
              camera.position.z = 10;
              camera.eulerOrder = 'ZXY';

              scene.add(camera);
              
              var ambient = new THREE.AmbientLight( 0x101030 );
              scene.add( ambient );

              var directionalLight = new THREE.DirectionalLight( 0xffeedd );
              directionalLight.position.set( 0, 0, 1 );
              scene.add( directionalLight );

              var manager = new THREE.LoadingManager();
              var texture = new THREE.Texture();

              
              var grassTex = THREE.ImageUtils.loadTexture('models/water.jpg'); 
              grassTex.wrapS = THREE.RepeatWrapping; 
              grassTex.wrapT = THREE.RepeatWrapping; 
              grassTex.repeat.x = 256; 
              grassTex.repeat.y = 256; 
              var groundMat = new THREE.MeshBasicMaterial({map:grassTex}); 
              var groundGeo = new THREE.PlaneGeometry(400,400); 
              var ground = new THREE.Mesh(groundGeo,groundMat); 
              ground.position.y = -2;
              ground.rotation.x = -Math.PI/2;

              ground.doubleSided = true; 
              ground.receiveShadow = true;

              scene.add(ground); 

              var loader = new THREE.OBJLoader();
              loader.load(
                  '/models/audir8.obj',

                  function ( object ) {
                      car = object;
                      car.rotation.z = 0.19;
                      car.rotation.x = 0.02;
                      car.position.y = -1;
                      for(var i = 0; i<car.children.length; i++) {
                        car.children[i].material.color = new THREE.Color( Math.random() * 0xffffff )
                      }

                      //car.children[7].material =new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } );
                      console.log(car.children[7]);
                      scene.add( car );
                  }
              );

              document.addEventListener("keydown", onKeyDown, false);
              document.addEventListener("keyup", onKeyUp, false);
              
              animate();

          }

          var lastTime = 0;
          function animate() {
              requestAnimationFrame( animate );
              var timeNow = new Date().getTime();
              if (lastTime != 0 && car) {
                  var elapsed = timeNow - lastTime;
                  updatePosition(elapsed);
              }
              lastTime = timeNow;
              renderer.render( scene, camera );
          }


          function updatePosition(elapsed) {
            var speed = 4;
            var rspeed = 3;
            if (left) {
                car.rotation.y += elapsed*rspeed/1000;
            }
            if (right) {
                car.rotation.y -= elapsed*rspeed/1000;
            }
            if (down) {
                car.position.x -= (elapsed*speed/1000) * Math.cos(car.rotation.y);
                car.position.z += (elapsed*speed/1000) * Math.sin(car.rotation.y);
            }
            if (up) {
                car.position.x += (elapsed*speed/1000) * Math.cos(car.rotation.y);
                car.position.z -= (elapsed*speed/1000) * Math.sin(car.rotation.y);
            }
           
            var target  = new THREE.Vector3(car.position.x + 3 * Math.cos(car.rotation.z), car.position.y + 3 * Math.sin(car.rotation.z), car.rotation.z + Math.PI/2);
            camera.lookAt(target);
          }

          
          function onKeyDown( event ) {
              switch (event.keyCode) {
                case 37:
                    left = true
                    break;
                case 38:
                    up = true;
                    break;
                case 39:
                    right = true;
                    break;
                case 40:
                    down = true;
                    break;
                default:
                    prevent = false;
            }
          }
          function onKeyUp( event ) {
              switch (event.keyCode) {
                case 37:
                    left = false;
                    break;
                case 38:
                    up = false;
                    break;
                case 39:
                    right = false;
                    break;
                case 40:
                    down = false;
                    break;
                default:
                    prevent = false;
            }
          }
        }
      }
    }
  ]);
