const Controls = {
    init(data) {
        document.onkeydown = (event) => {
            Controls.tasks.pressed[event.key] = true;
        };

        document.onkeyup = (event) => {
            Controls.tasks.pressed[event.key] = false;
        }
    },

    update(data) {
        var hero = data.Objects.hero;

        if(Controls.tasks.keyDown('ArrowRight')) {
            hero.direction.right = true;
            hero.direction.left = false;

            if(hero.velocity.y == 0) {
                hero.actualState = hero.state.move;
            } else {
                if (
                    hero.x < data.canvas.fgCanvas.width / 2 ||
                    data.Objects.map.x  <= data.canvas.fgCanvas.width - data.Objects.map.w  // center map
                ) {
                    hero.x += hero.velocity.x;
                } else {
                    data.Objects.map.x -= hero.velocity.x;
                    for (let i = 0; i < data.Objects.wallArray.length; i++) {
                        data.Objects.wallArray[i].x -= hero.velocity.x;     // move walls
                    }
                }
            }
        };

        if(Controls.tasks.keyDown('ArrowLeft')) {
            hero.direction.right = false;
            hero.direction.left = true;

            if(hero.velocity.y == 0) {
                hero.actualState = hero.state.move;
            } else {
                if (
                    hero.x > data.canvas.fgCanvas.width / 2 ||
                    data.Objects.map.x  >= 0 // center map
                ) {
                    hero.x -= hero.velocity.x;
                } else {
                    data.Objects.map.x -= hero.velocity.x;
                    for (let i = 0; i < data.Objects.wallArray.length; i++) {
                        data.Objects.wallArray[i].x += hero.velocity.x;     // move walls
                    }
                }
            }
        };

        if(Controls.tasks.keyDown(" ")) {  // spacebar
            hero.actualState = hero.state.jump;
        };
    },

    tasks: {
        pressed : {},

        keyDown (code) {
            return Controls.tasks.pressed[code];
        }
    }
}