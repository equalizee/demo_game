var Animate = {
    update(data) {
        Animate.Hero(data);
    },

    Hero(data) {
        data.Objects.hero.actualState.animation(data);
    }
}