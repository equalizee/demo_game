var Movement = {
    update(data) {
        Movement.tasks.Hero(data);
    },

    tasks: {
        Hero(data) {
            data.Objects.hero.actualState.action(data);
        }
    }
}