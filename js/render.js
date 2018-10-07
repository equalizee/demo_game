var Render = {
	update: function(data) {
		// Draw game area
		// Render.tasks.Draw(data.Objects.area, data.canvas.areaCtx);

		// Draw background
		data.canvas.bgCtx.clearRect(
			0,0,
			data.canvas.bgCanvas.width,
			data.canvas.bgCanvas.height
		);
		Render.tasks.Draw(data.Objects.map, data.canvas.bgCtx);

		// Draw foreground
		data.canvas.fgCtx.clearRect(
			0,0,
			data.canvas.fgCanvas.width,
			data.canvas.fgCanvas.height
		);
		Render.tasks.Draw(data.Objects.can, data.canvas.fgCtx);
		Render.tasks.Draw(data.Objects.hero, data.canvas.fgCtx); //draw hero last
	},

	tasks: {
		Draw: function(obj, position) {
			position.drawImage(
				obj.image.img,
				obj.image.x, obj.image.y,
				obj.image.w, obj.image.h,
				obj.x, obj.y, obj.w, obj.h
			);
		}
	}
}