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
			let group, camera, scene, renderer;

			const can = this.getView().byId("myCanvas2");
			const canDom = can.getId();
			const canElm = document.getElementById(canDom);
			renderer = new THREE.WebGLRenderer({ canvas: canElm, antialias: true  });
			// renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( canElm.width, canElm.height );

			scene = new THREE.Scene();
			// camera

			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
			camera.position.set( 15, 20, 30 );
			scene.add( camera );

			// controls

			const controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.minDistance = 20;
			controls.maxDistance = 50;
			controls.maxPolarAngle = Math.PI / 2;

			// ambient light

			scene.add( new THREE.AmbientLight( 0x222222 ) );

			// point light

			const light = new THREE.PointLight( 0xffffff, 1 );
			camera.add( light );

			// helper

			scene.add( new THREE.AxesHelper( 20 ) );

			// textures

			const loader = new THREE.TextureLoader();
			const texture = loader.load( 'textures/sprites/disc.png' );

			group = new THREE.Group();
			scene.add( group );

			// points

			let dodecahedronGeometry = new THREE.DodecahedronGeometry( 10 );

			// if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

			dodecahedronGeometry.deleteAttribute( 'normal' );
			dodecahedronGeometry.deleteAttribute( 'uv' );

			dodecahedronGeometry = THREE.BufferGeometryUtils.mergeVertices( dodecahedronGeometry );

			const vertices = [];
			const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );

			for ( let i = 0; i < positionAttribute.count; i ++ ) {

				const vertex = new THREE.Vector3();
				vertex.fromBufferAttribute( positionAttribute, i );
				vertices.push( vertex );

			}

			const pointsMaterial = new THREE.PointsMaterial( {

				color: 0x0080ff,
				map: texture,
				size: 1,
				alphaTest: 0.5

			} );

			const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

			const points = new THREE.Points( pointsGeometry, pointsMaterial );
			group.add( points );

			// convex hull

			const meshMaterial = new THREE.MeshLambertMaterial( {
				color: 0xffffff,
				opacity: 0.5,
				transparent: true
			} );

			const meshGeometry = new THREE.ConvexGeometry( vertices );

			const mesh1 = new THREE.Mesh( meshGeometry, meshMaterial );
			mesh1.material.side = THREE.BackSide; // back faces
			mesh1.renderOrder = 0;
			group.add( mesh1 );

			const mesh2 = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
			mesh2.material.side = THREE.FrontSide; // front faces
			mesh2.renderOrder = 1;
			group.add( mesh2 );

			window.addEventListener( 'resize', onWindowResize );
			function onWindowResize() {

				camera.aspect = canElm.width / canElm.height;
				camera.updateProjectionMatrix();

				renderer.setSize( canElm.width, canElm.height );

			}

			function animate() {
				requestAnimationFrame( animate );

				group.rotation.y += 0.005;

				renderer.render( scene, camera );
			};

			animate();
		}
	});
});