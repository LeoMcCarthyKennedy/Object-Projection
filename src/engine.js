class Engine {

    static menu;
    static game;

    static state;

    // 0 - Menu
    // 1 - Game

    constructor() {
        Engine.menu = new Menu();
        Engine.game = new Game();

        Engine.state = 1;
    }

    update() {
        switch (Engine.state) {
            case 0:
                Engine.menu.update();
                break;
            case 1:
                Engine.game.update();
                break;
        }
    }

    input(event) {
        switch (Engine.state) {
            case 0:
                Engine.menu.input(event);
                break;
            case 1:
                Engine.game.input(event);
                break;
        }
    }
}