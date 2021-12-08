Claim: 
	T1 - My scene contains 7 cubes and 3 tetrahedrons. 6 of the cubes are created by me and the funny colored one
         is loaded from "cube.obj". The tetrahedrons look like triangles at first but are actually 3D if rotated. 
        I create all shapes using the "createAllShapes()" function in "createSpapes.js" and the drawing happens in "Shape.js".
        Each face has a differnt color and the color is choosen at random using "randomColor()".
        The camera is initialized at (15,0,0).

	T2 - I implemented both the arrow key controlls and the mouse controlls. The code is in
	     "keyControlls.js" and "mouseControlls.js". Camera movement using keys is deactivated by default
         and mouse movement is always active.

	T3 - 
        a) 
        The shapes can be selected by pressing keys between '1' and '9' or '0' for all shapes. Pressing a key again will not deselect the shape.
        Camera movement can be activated/deactivated by pressing "c".

        selecting a shape will also display the local coordinate system. I achieved that by adding 
        additional vertices to each shape. 
        Scaling a shape will also scales the local coordinate system which makes it looks a little weird.

        I am a little confused about local vs gobal coordinate system so I don't know if the transformations
        are correct.
	    b) implemented everything

        c) implemented everything
         
        d) implemented everything

	T4 - Only simple .obj files that only contain vertex and face informations can be parsed.
         I loaded in a cube from "cube.obj".
         The objects are colored by triangles. That is also why the loaded cube looks a little funny.
         The code is in "objectLoader.js".

Tested environment:
	I used python -m http.server to locally host my project.
	OS: Windows
	Browser: chrome Version 95.0.4638.69