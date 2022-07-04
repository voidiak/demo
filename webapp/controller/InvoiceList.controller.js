sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/three/three",
    "../libs/three/geometries/ConvexGeometry",
    "../libs/three/controls/OrbitControls",
    "../libs/three/math/ConvexHull",
    "../libs/three/utils/BufferGeometryUtils",
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		onInit : function () {
			// this.initThreejsModel();
		},
		onAfterRendering : function () {
			this.initThreejsModel();
		},
		initThreejsModel: function () {

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			const canElm = document.getElementById("myCanvas2");
			const renderer = new THREE.WebGLRenderer({ canvas: canElm });
			renderer.setSize( 512,500 );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
		}
	});
});