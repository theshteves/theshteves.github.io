$(document).ready(function() {

    // insert da pretty here
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer(),
	HEIGHT = window.innerHeight,
	WIDTH = $("#content").width();
    renderer.setSize(WIDTH, HEIGHT);
    $("#content").append( renderer.domElement );

    var camera = new THREE.PerspectiveCamera( 30, WIDTH/HEIGHT, 0.1, 1000 );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x18453C,
						  wireframe: true,
						  wireframeLinewidth: 1} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var render = function () {
	requestAnimationFrame( render );

	//cube.rotation.x += 0.00;
	//cube.rotation.y += 0.00;
	//cube.rotation.z += 0.00;

	renderer.render(scene, camera);
    };

    render();

    $("#submit").on("click", function() {
	if ($("#rot-x").val() && $("#rot-y").val() && $("#rot-z").val()) {
	    cube.rotation.x = parseInt($("#rot-x").val());
	    cube.rotation.y = parseInt($("#rot-y").val());
	    cube.rotation.z = parseInt($("#rot-z").val());
	}
	$("body").css("background-color", "#" + $("#color").val());
	$("#content").css("background-color", "#" + $("#color").val());
	renderer.setClearColor( parseInt("0x" + $("#color").val()));
    });
});
