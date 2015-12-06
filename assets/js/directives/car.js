angular.module("carModel", [])
  .directive( "carModel",
    [function () {
      return {
        restrict: "E",
        link: function (scope, elem, attr) {

          var scene, camera, renderer, car, controls, textureCube, geometry;
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
              
              var ambient = new THREE.AmbientLight( 0x050505 );
              scene.add( ambient );

              directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
              directionalLight.position.set( 2, 1.2, 10 ).normalize();
              scene.add( directionalLight );

              directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
              directionalLight.position.set( -2, 1.2, -10 ).normalize();
              scene.add( directionalLight );

              pointLight = new THREE.PointLight( 0xffaa00, 2 );
              pointLight.position.set( 2000, 1200, 10000 );
              scene.add( pointLight )

              var manager = new THREE.LoadingManager();
              var texture = new THREE.Texture();

              addSkyBox();

              var button = document.getElementById("colorChange");
              var colors_variant = document.getElementById("colors_variant");
              /*
              createMenu();
              button.addEventListener("click", function() {

                car.children[5].material = interior
              })*/

              var glass = new THREE.MeshBasicMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } );
              var body = new THREE.MeshLambertMaterial( {color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation });
              var engine = new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } );
              var interior = new THREE.MeshPhongMaterial( { color: 0x050505, envMap: textureCube, shininess: 20 } );
              var wells = new THREE.MeshLambertMaterial( { color: 0x050505, envMap: textureCube } );
              var loader = new THREE.OBJLoader();

              loader.load(
                  '/models/audir8.obj',

                  function ( object ) {
                      car = object;
                      car.rotation.z = 0.19;
                      car.rotation.x = 0.02;
                      car.position.y = -1;

                      car.children[0].material = glass;
                      car.children[1].material = body;
                      car.children[4].material = wells;
                      car.children[7].material = wells;
                      car.children[2].material = engine;
                      car.children[3].material = body;
                      car.children[5].material = body;
                      car.children[6].material = interior;
                      car.children[8].material = body;
                      car.children[9].material = interior;

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

          function createButton() {
            
          }

          function addSkyBox() {
            var urlPrefix = "/skybox/";
            var urls = [ urlPrefix + "px.jpg", urlPrefix + "nx.jpg",
                urlPrefix + "py.jpg", urlPrefix + "ny.jpg",
                urlPrefix + "pz.jpg", urlPrefix + "nz.jpg" ];
            textureCube = THREE.ImageUtils.loadTextureCube( urls );

            var shader = THREE.ShaderLib[ "cube" ];
            shader.uniforms[ "tCube" ].value = textureCube;

            var material = new THREE.ShaderMaterial( {

              fragmentShader: shader.fragmentShader,
              vertexShader: shader.vertexShader,
              uniforms: shader.uniforms,
              depthWrite: false,
              side: THREE.BackSide

            } ),

            mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
            scene.add( mesh );
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
