if (/Mobi/.test(navigator.userAgent)) {
    var isMobile = true;
}

// Makes score an integer
var score = 0;
var timer = 65;
var gameOver = false;

var fruits = ["Apple", "Orange", "Watermelon"];

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        function Corridor(textureLoader) {

            var corridor = new THREE.Object3D();

            var wallGeometry = new THREE.PlaneGeometry(175, 125);
            var wallTexture = textureLoader.load("/textures/dojo_wall.jpg");
            wallTexture.wrapS = THREE.RepeatWrapping;
            wallTexture.wrapT = THREE.RepeatWrapping;
            wallTexture.repeat.set(4, 1);
            var wallMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shading: THREE.FlatShading,
                map: wallTexture
            });

            var ceilGeometry = new THREE.PlaneGeometry(100, 70);
            var ceilTexture = textureLoader.load("/textures/dojo_ceil.jpg");
            ceilTexture.wrapS = THREE.RepeatWrapping;
            ceilTexture.wrapT = THREE.RepeatWrapping;
            ceilTexture.repeat.set(5, 5);
            var ceilMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                shading: THREE.FlatShading,
                map: ceilTexture
            });

            var wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
            wall1.position.set(0, 0, -80);

            var wall2 = wall1.clone();
            wall2.position.set(0, 0, 80);
            wall2.rotateY(Math.PI);

            corridor.add(wall1, wall2);
            return corridor;
        }
        module.exports = Corridor;

}, {}],
    2: [function (require, module, exports) {
        function Fruit() {
            var currentFruit = fruits[Math.floor(Math.random() * 3)];
            if (currentFruit == "Apple") {
                var fruitGeometry = new THREE.SphereGeometry(1.5, 32, 32);
                var fruitTexture = new THREE.TextureLoader().load("/textures/fruit_apple.jpg");
                fruitTexture.repeat.set(1, 1);
            } else if (currentFruit == "Orange") {
                var fruitGeometry = new THREE.SphereGeometry(1, 32, 32);
                var fruitTexture = new THREE.TextureLoader().load("/textures/fruit_orange.jpg");
                fruitTexture.repeat.set(1, 1);
            } else if (currentFruit == "Watermelon") {
                var fruitGeometry = new THREE.SphereGeometry(2, 16, 12);
                fruitGeometry.applyMatrix(new THREE.Matrix4().makeScale(1.0, 1.5, 1.0));
                var fruitTexture = new THREE.TextureLoader().load("/textures/fruit_watermelon.jpg");
                fruitTexture.repeat.set(3, 1);
            }
            var fruitMaterial = new THREE.MeshBasicMaterial({
                color: 0xff9900
            });
            fruitTexture.wrapS = THREE.RepeatWrapping;
            fruitTexture.wrapT = THREE.RepeatWrapping;
            fruitMaterial.map = fruitTexture;
            var fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
            fruit.fruitType = currentFruit;
            fruit.rotateZ(Math.PI / 2);
            return fruit;
        }
        module.exports = Fruit;

}, {}],
    3: [function (require, module, exports) {
        function Floor(textureLoader, renderer) {

            var floorTexture = textureLoader.load("/textures/dojo_floor.jpg");
            floorTexture.wrapS = THREE.RepeatWrapping;
            floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set(5, 5);
            floorTexture.anisotropy = renderer.getMaxAnisotropy();

            var floorMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 5,
                shading: THREE.FlatShading,
                map: floorTexture
            });

            var floorGeometry = new THREE.PlaneGeometry(200, 200);
            floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            
            return floor;
        }
        module.exports = Floor;

}, {}],
    4: [function (require, module, exports) {
        function Hand(camera) {
            /* Katana Handle */
            var handGeometry = new THREE.CylinderGeometry(.7, .7, 6, 7);
            var handMaterial = new THREE.MeshBasicMaterial({
                color: "#141414"
            });
            hand = new THREE.Mesh(handGeometry, handMaterial);
            hand.position.set(15, 6, camera.position.z / 2);
            return hand;
        }
        module.exports = Hand;

}, {}],
    5: [function (require, module, exports) {
        function Katana() {
            /* Katana Model */
            var lsGeometry = new THREE.BoxGeometry(0.4, 30, 0.5);
            var lsMaterial = new THREE.MeshBasicMaterial({
                color: "white"
            });
            katana = new THREE.Mesh(lsGeometry, lsMaterial);
            katana.position.setY(15);
            var glowGeometry = new THREE.BoxGeometry(0.5, 30, 0.4);
            var glowMaterial = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.5,
                color: "#ccc"
            });
            var glow = new THREE.Mesh(glowGeometry, glowMaterial);
            katana.add(glow);
            return katana;
        }
        module.exports = Katana;

}, {}],
    6: [function (require, module, exports) {
        function Sky(textureLoader) {
            //            var skyGeometry = new THREE.SphereGeometry(10000, 10000, 25, 25);
            //            var skyMaterial = new THREE.MeshBasicMaterial({
            //                map: textureLoader.load('textures/floor_metal.jpg'),
            //                side: THREE.BackSide
            //            });
            //            var skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
            //            skyDome.rotateY(-Math.PI / 2);
            //
            //            return skyDome;
        }
        module.exports = Sky;
}, {}],
    7: [function (require, module, exports) {
        function Enemy_1() {
            /* ENEMY_1 MODEL */
            var enemy_1Geometry = new THREE.SphereGeometry(20, 32, 32);
            var enemy_1Material = new THREE.MeshBasicMaterial({
                color: "#aa1212"
            });
            enemy_1 = new THREE.Mesh(enemy_1Geometry, enemy_1Material);
            enemy_1.position.set(15, -1000, 0);
            return enemy_1;
        }
        module.exports = Enemy_1;

}, {}],
    8: [function (require, module, exports) {
        function Utils() {
            this.raycaster = new THREE.Raycaster();
            this.collidableMeshList = []; // All meshes raycaster cares about
            this.collidedMeshes = []; // UUIDs of meshes that have already been collided with
        }

        Utils.prototype.getRandomInRange = function (min, max) {
            /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
            return Math.random() * (max - min) + min;
        }

        Utils.prototype.playAudio = function (audio) {
            audio.play();
        }

        Utils.prototype.checkCollision = function (object, targetName, once, cb) {
            /*
            	Raycaster.
            	Iterate through all vertices of an object. Cast a ray from its center to the outside.
            	Ray will pick up all of its intersecting objects in raycaster.intersectObjects
            	Check if the object picked up is the one we want, "targetName"
            	FOR THIS PROJECT: We don't want to multi-count targets that may still be touching, so their UUIDs are cached and checked against
            */

            if (!once) {
                once = false;
            }
            for (var vertexIndex = 0; vertexIndex < object.geometry.vertices.length; vertexIndex++) {
                var localVertex = object.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4(object.matrixWorld)
                var directionVector = globalVertex.sub(object.position);

                this.raycaster.set(object.position, directionVector.clone().normalize());

                var collisionResults = this.raycaster.intersectObjects(this.collidableMeshList);

                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    var result = collisionResults[0].object;

                    if (result.name == targetName) {

                        if (once) {
                            for (var i = 0; i < this.collidedMeshes.length; i++) {
                                var uuid = this.collidedMeshes[i];
                                if (result.uuid == uuid) {
                                    return;
                                }
                            }

                            this.collidedMeshes.push(result.uuid);
                        }
                        cb(result);
                    }
                }
            }
        }

        Utils.prototype.cameraLookDir = function (camera) {
            /* http://stackoverflow.com/a/17286752/896112 */
            var vector = new THREE.Vector3(0, 0, -1);
            vector.applyEuler(camera.rotation, camera.rotation.order);
            return vector;
        }

        Utils.prototype.debugAxes = function (axisLength, scene) {
            // Shorten the vertex function
            function v(x, y, z) {
                return new THREE.Vector3(x, y, z);
            }

            // Create axis (point1, point2, colour)
            function createAxis(p1, p2, color) {
                var line, lineGeometry = new THREE.Geometry(),
                    lineMat = new THREE.LineBasicMaterial({
                        color: color,
                        lineWidth: 1
                    });
                lineGeometry.vertices.push(p1, p2);
                line = new THREE.Line(lineGeometry, lineMat);
                scene.add(line);
            }

            createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
            createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
            createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
        };

        var u = new Utils();

        module.exports = u;
}, {}],
    9: [function (require, module, exports) {

        var socket = io();
        var scene,
            width,
            height,
            camera,
            renderer,
            stereo,
            clock,
            textureLoader,
            controls,
            orbitControls,
            container,
            domElement,
            hand,
            fruit,
            storedFruit,
            katana,
            floor,
            corridor,
            soundDir,
            started,
            enemy_1;

        var Sky = require('../../assets/Sky');
        var Floor = require('../../assets/Floor');
        var Corridor = require('../../assets/Corridor');
        var Hand = require('../../assets/Hand');
        var Katana = require('../../assets/Katana');
        var Fruit = require('../../assets/Fruit');
        var Enemy_1 = require('../../assets/Enemy_1');
        var Utils = require('./utils');

        function init() {
            started = false;
            width = window.innerWidth;
            height = window.innerHeight;
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(90, width / height, 0.001, 20000);
            renderer = new THREE.WebGLRenderer();
            stereo = new THREE.StereoEffect(renderer);
            clock = new THREE.Clock();
            textureLoader = new THREE.TextureLoader();
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.lookAt(0, 0, 0);
            camera.position.set(0, 15, 0);

            scene.add(camera);

            container = document.getElementById("container");
            domElement = renderer.domElement;

            orbitControls = new THREE.OrbitControls(camera, domElement);

            orbitControls.target.set(
                camera.position.x + 0.15,
                camera.position.y,
                camera.position.z
            );

            orbitControls.noPan = true;
            orbitControls.noZoom = true;

            if (isMobile) {
                controls = new DeviceOrientationController(camera, renderer.domElement);
                controls.connect();
            }
            //Hide the landing page, display timer and score
            $('.landing').fadeOut(100);
            $('.confirm-button').fadeOut(100);
            //Count down every second for timer
            setTimeout(function () {
                setInterval(function () {
                    if (timer > 0) {
                        timer--;
                        document.getElementById("timer").innerHTML = timer;

                        // hide intro message at certain time
                        if (timer == 60) {
                            $("#timer").fadeIn(200);
                            $("#timertitle").fadeIn(200);
                            $("#score").fadeIn(200);
                            $("#scoretitle").fadeIn(200);
                            $("#introMessage").fadeOut(200);
                        } else if (timer == 0) {
                            // play outro message at end of timer
                            playoutroMessage();
                        }
                    }
                }, 1000);
            }, 5000);
            container.appendChild(domElement);
            domElement.addEventListener('click', fullscreen, false);
            setupScene();
        }

        function setupScene() {

            storedFruit = []; // Keep stored fruit in here so we can manipulate them in update()

            floor = new Floor(textureLoader, renderer);
            scene.add(floor);

            corridor = new Corridor(textureLoader);
            scene.add(corridor);

            // Compound object from parent to child: Camera -> Hand -> Katana -> Glow
            hand = new Hand(camera);
            katana = new Katana();
            hand.add(katana);

            Utils.collidableMeshList.push(katana);

            /* LIGHTING */
            lightAngle = new THREE.PointLight(0x999999, 1, 500);
            lightAngle.position.set(0, 50, 0);
            scene.add(lightAngle);

            // AXIS
            var axis = new THREE.AxisHelper(200);
            // scene.add(axis);

            scene.add(hand);

            enemy_1 = new Enemy_1();
            scene.add(enemy_1);

            requestAnimationFrame(animate);

            // Show intro message
            playintroMessage();

        }

        // Intro message function
        function playintroMessage() {
            $("#introMessage").fadeIn(500);
        }

        // Outro message function
        function playoutroMessage() {
            $("#outroMessage").fadeIn(1000);
            $("#winMessage").html("You have scored " + score + " points!");
            $(".gameView").fadeOut(1000);
        }

        function setupGame() {
            scene.add(hand);
            window.addEventListener('deviceorientation', setOrientationControls, true);
            // Every 1.5 seconds, spawn a new laser  at random position and set its velocity to -1, to come at the player
            window.setInterval(function () {
                var newFruit = new Fruit();
                newFruit.position.set(20, 100, Utils.getRandomInRange(-10, 10));
                newFruit.name = "laser";
                newFruit.velocity = new THREE.Vector3(0, -0.20, 0);
                storedFruit.push(newFruit);
                Utils.collidableMeshList.push(newFruit);
                scene.add(newFruit);
            }, Math.floor((Math.random() * 200) + 900));
        }

        function fullscreen() {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            }
        }

        function setOrientationControls(e) {
            if (!e.alpha) {
                return;
            }
            controls = new THREE.DeviceOrientationControls(camera, true);
            controls.connect();
            controls.update();
            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }

        /* UTILS */
        function setObjectQuat(object, data) {

            /* Degrees to radians */
            var gammaRotation = data.g ? data.g * (Math.PI / 180) : 0;
            var betaRotation = data.b ? data.b * (Math.PI / 180) : 0;
            var alphaRotation = data.a ? data.a * (Math.PI / 180) : 0;
            var alpha, beta, gamma, betaMax, betaMin;
            var euler = new THREE.Euler();

            beta = betaRotation;
            gamma = gammaRotation;
            alpha = alphaRotation;

            euler.set(0, -gamma, beta - Math.PI / 2);
            object.quaternion.setFromEuler(euler);
        }

        /* RENDER */

        function resize() {
            var newWidth = window.innerWidth;
            var newHeight = window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            stereo.setSize(newWidth, newHeight);
        }

        function animate() {
            var elapsedSeconds = clock.getElapsedTime();
            requestAnimationFrame(animate);
            for (var i = 0; i < storedFruit.length; i++) {
                storedFruit[i].rotation.x -= 0.03;
                storedFruit[i].rotation.z -= 0.02;
            }
            update(clock.getDelta());
            if (isMobile) {
                stereo.render(scene, camera);
            } else {
                renderer.render(scene, camera);
            }
        }

        function update(dt) {
            resize();
            camera.updateProjectionMatrix();
            orbitControls.update(dt);

            var cameraDir = Utils.cameraLookDir(camera);

            if (Math.abs(1 - cameraDir.x) < 0.01 && !started) {
                setupGame();
                started = true;
            }
            // stores urls of all hit sounds
            var hitSounds = ["/sounds/slash1.mp3", "/sounds/slash2.mp3", "/sounds/slash3.mp3"];

            // Check collision with katana and fruit at every iteration
            // ALSO updates "score" to document each time laser is hit
            Utils.checkCollision(katana.children[0], "laser", true, function (result) {
                if (result) {
                    socket.emit('sendhit');
                    console.log(result);
                    result.velocity = new THREE.Vector3(.7, 0, 0);
                    if (result.fruitType == "Watermelon"){ 
                        score = score + 10;
                    } else if (result.fruitType == "Apple"){ 
                        score = score + 20;
                    } else if (result.fruitType == "Orange"){ 
                        score = score + 30;
                    }
                    document.getElementById("score").innerHTML = score;
                    // play random hit sound when deflecting
                    var hitSound = new Audio(hitSounds[Math.floor(Math.random() * 4)]);
                    if (gameOver == false) {
                        hitSound.play();
                    }
                }
            });

            // Apply velocity vector to laser, check if they are out of bounds to remove them
            for (var i = 0; i < storedFruit.length; i++) {
                var e = storedFruit[i];
                e.position.add(e.velocity);
                if (e.position.y < -10 || e.position.y > 200) {
                    scene.remove(e);
                    storedFruit.splice(i, 1);
                }
            }
            if (isMobile) {
                controls.update();
            }
        }

        $(document).ready(function () {
            $('.confirm-button').click(function () {
                init();
                animate();
            });
        });

        /* SOCKET.IO */

        socket.emit('viewerjoin', {
            room: roomId
        });

        socket.on('beginsetup', function (data) {
            // change display
        });

        socket.on('setupcomplete', function (data) {
            $('.confirm-button').show();
            //  $('#room-link').hide();
            //  $('#qrcode').hide();
            socket.emit('viewready');
        });

        // initiates game
        socket.on('beginGame', function (data) {
            console.log("Training is starting...");
            init();
            animate();
        });

        socket.on('updateorientation', function (data) {
            if (hand) {
                setObjectQuat(hand, data);
            }
        });

        socket.on('updatemotion', function (data) {});
}, {
        "../../assets/Corridor": 1,
        "../../assets/Fruit": 2,
        "../../assets/Floor": 3,
        "../../assets/Hand": 4,
        "../../assets/Katana": 5,
        "../../assets/Sky": 6,
        "../../assets/Enemy_1": 7,
        "./utils": 8
    }]
}, {}, [9]);
