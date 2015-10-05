$(document).ready(function() {

    var container, stats;

    var camera, controls, scene, renderer;

    var cross;

    var RENDER = new THREE.WebGLRenderer( { antialias: false, autoClearColor: false } );
    var QUANTITY = 100;

    var POSX = 0,
	POSY = 0,
	POSZ = 0;

    var ROTX = 0,
	ROTY = 0,
	ROTZ = 0;

    var CAMX = 25,
	CAMY = 50,
	CAMZ = 400;


    var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );

    init();
    animate();

    function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
    }

    function init() {

	camera = new THREE.PerspectiveCamera( 60, $("#content").width() / window.innerHeight, 1, 1000 );
	camera.position.x = CAMX;
	camera.position.y = CAMY;
	camera.position.z = CAMZ;

	controls = new THREE.OrbitControls( camera, document.getElementById("content") );
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.002 );

	// world

	//var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	//var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
	//var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
	var texture = THREE.ImageUtils.loadTexture("./img/rough.jpg");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );

	var material = new THREE.MeshPhongMaterial({color: 0x00ff00, reflectivity: .1, emmisive: 0xff0000 });

	//var mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

	for (var t = 0; t < QUANTITY; t++) {

	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.x = eval(POSX);
	    mesh.position.y = eval(POSY);
	    mesh.position.z = eval(POSZ);
	    mesh.rotation.x = eval(ROTX);
	    mesh.rotation.y = eval(ROTY);
	    mesh.rotation.z = eval(ROTZ);
	    mesh.updateMatrix();
	    mesh.matrixAutoUpdate = false;
	    scene.add( mesh );
	}


	// lights

	light = new THREE.DirectionalLight( 0xffffff, 100 );
	light.position.set( 50, 100, 50 );
	scene.add( light );

	light = new THREE.DirectionalLight( 0x00ff00, 100 );
	light.position.set( 0, 50, 100 );
	scene.add( light );

	light = new THREE.AmbientLight( 0xffffff ); //eb9316
	scene.add( light );


	// renderer

	renderer = RENDER;
	//renderer.setClearColor( scene.fog.color, 1 );
	renderer.setSize( $("#content").width(), window.innerHeight );

	$("#content > canvas").replaceWith( renderer.domElement );

	$("#content").on('resize', function() {
	    camera.aspect = $("#content").width() / window.innerHeight;
	    camera.updateProjectionMatrix();

	    renderer.setSize( $("#content").width(), window.innerHeight );

	    render();

	});

    }

    function animate() {

	requestAnimationFrame( animate );
	controls.update();

    }

    function render() {
	renderer.render( scene, camera );
    }

    $("#mesh-list > li > a").on("click", function() {

    });

    $("#submit").on("click", function() {
	if ($("#rot-x").val() && $("#rot-y").val() && $("#rot-z").val()) {
	    ROTX = $("#rot-x").val();
	    ROTY = $("#rot-y").val();
	    ROTZ = $("#rot-z").val();
	}

	if ($("#pos-x").val() && $("#pos-y").val() && $("#pos-z").val()) {
	    POSX = $("#pos-x").val();
	    POSY = $("#pos-y").val();
	    POSZ = $("#pos-z").val();
	}

	if ($("#quantity").val()) {
	    QUANTITY = parseInt($("#quantity").val());
	}

	if ($("#mesh").val()) {
	    geometry = eval($("#mesh").val());
	}

	$("body").css("background-color", "#" + $("#color").val());
	$("#content").css("background-color", "#" + $("#color").val());
	RENDER.setClearColor( parseInt("0x" + $("#color").val()));

	CAMX = camera.position.x;
	CAMY = camera.position.y;
	CAMZ = camera.position.z;
	init();
	animate();
    });

    $("#mesh-list > li > a").on("click", function() {
	switch($(this).html()) {
	case "plane":
	    $("#mesh").attr("value", "new THREE.PlaneGeometry( 5, 20, 32 )");
	    break;
	case "circle":
	    $("#mesh").attr("value", "new THREE.CircleGeometry( 10, 32)");
	    break;
	case "ring":
	    $("#mesh").attr("value", "new THREE.RingGeometry(1, 5, 32)");
	    break;
	case "cube":
	    $("#mesh").attr("value", "new THREE.BoxGeometry(10, 10, 10)");
	    break;
	case "cylinder":
	    $("#mesh").attr("value", "new THREE.CylinderGeometry(5, 5, 20, 32)");
	    break;
	case "sphere":
	    $("#mesh").attr("value", "new THREE.SphereGeometry(5, 32, 32)");
	    break;
	case "torus":
	    $("#mesh").attr("value", "new THREE.TorusGeometry(10, 3, 16, 100)");
	    break;
	case "torusknot":
	    $("#mesh").attr("value", "new THREE.TorusKnotGeometry(10, 3, 100, 16)");
	    break;
	case "tetrahedron":
	    $("#mesh").attr("value", "new THREE.TetrahedronGeometry(10)");
	    break;
	case "octahedron":
	    $("#mesh").attr("value", "new THREE.OctahedronGeometry(10)");
	    break;
	case "dodecahedron":
	    $("#mesh").attr("value", "new THREE.DodecahedronGeometry(10)");
	    break;
	case "icosahedron":
	    $("#mesh").attr("value", "new THREE.IcosahedronGeometry(10)");
	    break;
	case "custom text":
	    $("#mesh").attr("value", "new THREE.TextGeometry(\"text\", {size: 10})");
	    break;
	default:
	    $("#mesh").attr("value", "");
	}
    });
});
