var Physics = {
    update(data) {
        Physics.tasks.Gravity(data.Objects.hero);
        Physics.tasks.CollisionDetection(data);
    },

    tasks : {
        Gravity(obj) {
            // quick maths
            const gravityConst = 0.32;
            var gravityVel = Math.sin(gravityConst);
            gravityVel += gravityConst;
            // assign to obj
            obj.actualState = obj.state.jump;
            obj.velocity.y += gravityVel;
            obj.y += obj.velocity.y;
        },

        CollisionDetection(data) {
            var hero = data.Objects.hero;

            var CollDetection = function(obj) {
                if (
                    hero.x < obj.x + obj.w &&
                    hero.x + hero.w > obj.x &&
                    hero.y < obj.y + obj.h &&
                    hero.y + hero.h > obj.y
                ) {
                    Physics.tasks.Collision(data, obj);
                }
            };

            data.Objects.wallArray.forEach((wall) => {
                CollDetection(wall);
            });
        },

        Collision(data, obj) {
            var hero = data.Objects.hero;

            if(obj.type === 'wall'){
                if (
                    hero.y + hero.h > obj.y &&
                    hero.x + hero.w > obj.x + 10 &&
                    hero.x < (obj.x + obj.w) - 10 &&
                    hero.velocity.y >= 0
                ) {
                    hero.actualState = hero.state.stand;
                    hero.y = obj.y - hero.h;
                    hero.velocity.y = 0;
                }
            } else if (obj.type === 'can') {
                console.log('can col');
            }
        },
    }
};