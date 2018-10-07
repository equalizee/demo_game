var Objects = {
	init(data) {
		var map = {
			image: new Objects.tasks.Image(data.background, 0, 0, 700, 450),
			x: 0,
			y: 0,
			w: 800,
			h: 600
		};

		var hero = new Objects.Heros(data.hero, 10, 0, 85, 130);

		var can = new Objects.Can(data.can, 150, 450, 15, 30);

		var walls = [
			[0, 0, 0, 600], // left screen wall
			[0, 520, 800, 100],	//floor
		];

		data.Objects = {};
		// data.Objects.area = area;
		data.Objects.map = map;
		data.Objects.hero = hero;
		data.Objects.can = can;
		data.Objects.wallArray = [];

		walls.forEach(function(z){
			data.Objects.wallArray.push(
				new Objects.Wall(z[0], z[1], z[2], z[3]));
		});
	},

	tasks: {
		Image: function(img, x, y, w, h) {
			this.img = img;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}
	},

	Heros: function(img, x, y, w, h) {
		this.id = 'hero';
		const char = this;
		this.width = 85;
		this.height = 130;
		this.image = new Objects.tasks.Image(img, 0, 130, this.width, this.height);

		this.direction = {
			right : true,
			left : false
		};

		this.animation = {
			stand : {
				right : new Objects.tasks.Image(img, 0, 130, this.width, this.height),
				left : new Objects.tasks.Image(img, 0, 0, this.width, this.height),
			},

			jump : {
				right : new Objects.tasks.Image(img, this.width * 2, 130, this.width, this.height),
				left : new Objects.tasks.Image(img, this.width * 2, 0, this.width, this.height),
			},

			move : {
				right : {
					frame : [
						new Objects.tasks.Image(img, this.width * 1, 130, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 2, 130, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 3, 130, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 4, 130, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 5, 130, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 6, 130, this.width, this.height),
					],
					actualFrame : 0,
				},
				left : {
					frame : [
						new Objects.tasks.Image(img, this.width * 1, 0, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 2, 0, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 3, 0, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 4, 0, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 5, 0, this.width, this.height),
						new Objects.tasks.Image(img, this.width * 6, 0, this.width, this.height),
					],
					actualFrame : 0,
				}
			},

			meleeAttack : {
				right : null,
				left : null
			},

			throwProjectile : {
				right : null,
				left : null
			}
		};

		this.state = {
			stand : {
				action(data) {
					return;
				},

				animation(data){
					if (char.direction.right) {
						char.image = char.animation.stand.right;
					} else {
						char.image = char.animation.stand.left;
					}
				}
			},

			move : {
				action(data) {
					if(char.direction.right) {
						if (
							char.x < data.canvas.fgCanvas.width / 2 ||
							data.Objects.map.x  <= data.canvas.fgCanvas.width - data.Objects.map.w  // center map
						) {
							char.x += char.velocity.x;
						} else {
							data.Objects.map.x -= char.velocity.x;
							for (let i = 0; i < data.Objects.wallArray.length; i++) {
								data.Objects.wallArray[i].x -= char.velocity.x;     // move walls
							}
						}
					} else {
						if (
							char.x > data.canvas.fgCanvas.width / 2 ||
							data.Objects.map.x  >= 0 // center map
						) {
							char.x -= char.velocity.x;
						} else {
							data.Objects.map.x -= char.velocity.x;
							for (let i = 0; i < data.Objects.wallArray.length; i++) {
								data.Objects.wallArray[i].x +=char.velocity.x;     // move walls
							}
						}
					}
				},

				animation(data){
					if (char.direction.right) {
						if(data.frame % 6 == 0) {
							char.image = char.animation.move.right.frame[char.animation.move.right.actualFrame];
							char.animation.move.right.actualFrame++;

							if(char.animation.move.right.actualFrame >= char.animation.move.right.frame.length) {
								char.animation.move.right.actualFrame = 0;
							};
						}
					} else {
						if(data.frame % 6 == 0) {
							char.image = char.animation.move.left.frame[char.animation.move.left.actualFrame];
							char.animation.move.left.actualFrame++;

							if(char.animation.move.left.actualFrame >= char.animation.move.left.frame.length) {
								char.animation.move.left.actualFrame = 0;
							};
						}
					}
				}
			},

			jump : {
				action(data) {
					if(char.velocity.y == 0) {
						char.velocity.y -= 14.5;
					}
				},

				animation(data){
					if (char.direction.right) {
						char.image = char.animation.jump.right;
					} else {
						char.image = char.animation.jump.left;
					}
				}
			},

			meleeAttack : {
				action(data) {
					return;
				},

				animation(data) {
					return;
				}
			},

			throwProjectile : {
				action(data) {
					return;
				},

				animation(data) {
					return;
				}
			}
		};

		this.actualState = char.state.stand;	//stand state as default
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.velocity = {
			x : 3,
			y : 1,
		}
	},

	Wall : function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.type = 'wall';
	},

	Can : function(img, x , y, w, h) {
		this.image = new Objects.tasks.Image(img, 0, 0, 30, 60);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.type = 'can';
	}
};