var Engine = {
	init() {
        var areaCanvas = document.getElementById('area-canvas');
		var bgCanvas = document.getElementById('bg-canvas');
		var fgCanvas = document.getElementById('fg-canvas');

		const canvas = {
            areaCanvas,
			bgCanvas,
			fgCanvas,
			areaCtx: areaCanvas.getContext("2d"),
			fgCtx : fgCanvas.getContext("2d"),
			bgCtx: bgCanvas.getContext("2d"),
		};

		const graphics = {
			background : "assets/background/bg.jpg",
			hero : 'assets/hero/ssheets.png',
			can : 'assets/items/can.png',
		};

		var graphicsArray = [];

		var fillGraphicsArray = (function(){
			let counter = 0;
			for (i in graphics) {
				graphicsArray[counter] = new Image();
				graphicsArray[counter].src = graphics[i];
				counter++;
			}
		})();

		var background = graphicsArray[0];
		var hero = graphicsArray[1];
		var can = graphicsArray[2];

		const data = {
			frame: 0,
			canvas,
			background,
			hero,
			can
		};

		Controls.init(data);
		Objects.init(data);
		Engine.start(data);
	},

	start(data) {
		var loop = function() {
			Engine.input(data);
			Engine.update(data);
			Engine.render(data);

			data.frame++;

			window.requestAnimationFrame(loop);
		};

		loop();
	},

	input(data) {
		Controls.update(data);
	},

	update(data) {
		Movement.update(data);
		Animate.update(data);
		Physics.update(data);
	},

	render(data) {
		Render.update(data);
	}
};