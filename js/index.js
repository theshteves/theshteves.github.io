$(document).ready(function() {

    // insert da pretty here
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer(),
	HEIGHT = window.innerHeight,
	WIDTH = $("#content").width();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff);
    $("#content").append( renderer.domElement );

    var camera = new THREE.PerspectiveCamera( 30, WIDTH/HEIGHT, 0.1, 1000 );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x18453C,
						  wireframe: true,
						  wireframeLinewidth: 1} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var ROTX = .01,
	ROTY = .02,
	ROTZ = .03;

    var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += ROTX;
	cube.rotation.y += ROTY;
	cube.rotation.z += ROTZ;

	renderer.render(scene, camera);
    };

    render();

    $("#submit").on("click", function() {
	if ($("#rot-x").val() && $("#rot-y").val() && $("#rot-z").val()) {
	    ROTX = parseFloat($("#rot-x").val()) * .01;
	    ROTY = parseFloat($("#rot-y").val()) * .01;
	    ROTZ = parseFloat($("#rot-z").val()) * .01;
	}
	$("body").css("background-color", "#" + $("#color").val());
	$("#content").css("background-color", "#" + $("#color").val());
	renderer.setClearColor( parseInt("0x" + $("#color").val()));
    });
});
