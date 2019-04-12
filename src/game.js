class Game {

    static time;

    static map;
    static mapSize;

    // 0 - air
    // 1 - wall
    // g - generator

    // c - clock on
    // k - clock off

    // x - wire on
    // o - wire off

    // ^ - not off
    // > - not power
    // < - not unpowered

    // [ - and off
    // ] - and on

    // { - or off
    // } - or on

    static playerX;
    static playerY;

    static facing;

    // 0 - up;
    // 1 - down
    // 2 - left
    // 3 - right

    constructor() {
        Game.time = 0;

        Game.map = null;
        Game.mapSize = 50;

        Game.playerX = 1;
        Game.playerY = 1;

        Game.facing = 1;

        this.generateMap();
    }

    generateMap() {
        Game.map = [];

        for (var y = 0; y < Game.mapSize; y++) {
            Game.map[y] = [];
            for (var x = 0; x < Game.mapSize; x++) {
                if (y == 0 || y == Game.mapSize - 1) {
                    Game.map[y][x] = 1;
                } else if (x == 0 || x == Game.mapSize - 1) {
                    Game.map[y][x] = 1;
                } else {
                    Game.map[y][x] = 0;
                }
            }
        }
    }

    update() {
        Game.time += 1 / framerate;

        this.draw();
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var y = 0; y < Game.mapSize; y++) {
            for (var x = 0; x < Game.mapSize; x++) {
                this.setTile(x, y, Game.map[y][x]);
            }
        }

        ctx.fillStyle = "white";
        ctx.fillRect(Game.playerX * 25, Game.playerY * 25, 25, 25);
    }

    input(event) {
        var k = event.keyCode;

        var y = Game.playerY;
        var x = Game.playerX;

        var u = Game.map[y - 1][x] == 0 ? true : false;
        var d = Game.map[y + 1][x] == 0 ? true : false;
        var l = Game.map[y][x - 1] == 0 ? true : false;
        var r = Game.map[y][x + 1] == 0 ? true : false;

        switch (k) {

            case 87:
                Game.facing = 0;
                break;
            case 83:
                Game.facing = 1;
                break;
            case 65:
                Game.facing = 2;
                break;
            case 68:
                Game.facing = 3;
                break;

            case 38:
                Game.playerY -= u ? 1 : 0;
                break;
            case 40:
                Game.playerY += d ? 1 : 0;
                break;
            case 37:
                Game.playerX -= l ? 1 : 0;
                break;
            case 39:
                Game.playerX += r ? 1 : 0;
                break;

            case 48:
                this.placeTile(x, y, 0, u, d, l, r);
                break;
            case 49:
                this.placeTile(x, y, "g", u, d, l, r);
                break;
            case 50:
                this.placeTile(x, y, "x", u, d, l, r);
                break;
            case 51:
                this.placeTile(x, y, "c", u, d, l, r);
                break;
            case 52:
                this.placeTile(x, y, "^", u, d, l, r);
                break;
            case 53:
                this.placeTile(x, y, "[", u, d, l, r);
                break;
            case 54:
                this.placeTile(x, y, "{", u, d, l, r);
                break;
        }
    }

    placeTile(x, y, tile, u, d, l, r) {
        if (tile != 0) {
            switch (Game.facing) {
                case 0:
                    Game.map[y - 1][x] = u ? tile : Game.map[y - 1][x];
                    break;
                case 1:
                    Game.map[y + 1][x] = d ? tile : Game.map[y + 1][x];
                    break;
                case 2:
                    Game.map[y][x - 1] = l ? tile : Game.map[y][x - 1];
                    break;
                case 3:
                    Game.map[y][x + 1] = r ? tile : Game.map[y][x + 1];
                    break;
            }
        } else {
            switch (Game.facing) {
                case 0:
                    Game.map[y - 1][x] = 0;
                    break;
                case 1:
                    Game.map[y + 1][x] = 0;
                    break;
                case 2:
                    Game.map[y][x - 1] = 0;
                    break;
                case 3:
                    Game.map[y][x + 1] = 0;
                    break;
            }
        }
    }

    setTile(x, y, tile) {
        switch (tile) {
            case 0:
                ctx.fillStyle = "black";
                ctx.fillRect(x * 25, y * 25, 25, 25);
                return null;
            case 1:
                ctx.fillStyle = "white";
                ctx.fillRect(x * 25, y * 25, 25, 25);
                return null;
            case "g":
                ctx.fillStyle = "gold";
                break;
            case "x":
            case "o":
                if (((Game.map[y - 1][x] == "x" || Game.map[y - 1][x] == ">") || (Game.map[y - 1][x] == "g" || Game.map[y - 1][x] == "c")) || (Game.map[y - 1][x] == "]" || Game.map[y - 1][x] == "}")) {
                    ctx.fillStyle = "cyan";
                    Game.map[y][x] = "x";
                } else if (((Game.map[y][x - 1] == "x" || Game.map[y][x - 1] == ">") || (Game.map[y][x - 1] == "g" || Game.map[y][x - 1] == "c")) || (Game.map[y][x - 1] == "]" || Game.map[y][x - 1] == "}")) {
                    ctx.fillStyle = "cyan";
                    Game.map[y][x] = "x";
                } else {
                    ctx.fillStyle = "darkblue";
                    Game.map[y][x] = "o";
                }
                break;
            case "c":
            case "k":
                if (((Game.map[y - 1][x] == "x" || Game.map[y - 1][x] == ">") || (Game.map[y - 1][x] == "g" || Game.map[y - 1][x] == "c")) || (Game.map[y - 1][x] == "]" || Game.map[y - 1][x] == "}")) {
                    if (Math.round(Game.time) % 2 == 0) {
                        ctx.fillStyle = "darkorange";
                        Game.map[y][x] = "k";

                    } else {
                        ctx.fillStyle = "orangered";
                        Game.map[y][x] = "c";
                    }
                } else {
                    ctx.fillStyle = "darkslateblue";
                    Game.map[y][x] = "k";
                }
                break;
            case "^":
            case ">":
            case "<":
                if (((Game.map[y - 1][x] == "x" || Game.map[y - 1][x] == ">") || (Game.map[y - 1][x] == "g" || Game.map[y - 1][x] == "c")) || (Game.map[y - 1][x] == "]" || Game.map[y - 1][x] == "}")) {
                    ctx.fillStyle = "magenta";
                    if (((Game.map[y][x - 1] == "x" || Game.map[y][x - 1] == ">") || (Game.map[y][x - 1] == "g" || Game.map[y][x - 1] == "c")) || (Game.map[y][x - 1] == "]" || Game.map[y][x - 1] == "}")) {
                        Game.map[y][x] = "<";
                    } else {
                        Game.map[y][x] = ">";
                    }
                } else {
                    ctx.fillStyle = "indigo";
                    Game.map[y][x] = "^";
                }
                break;
            case "[":
            case "]":
                ctx.fillStyle = "brown";

                if (((Game.map[y - 1][x] == "x" || Game.map[y - 1][x] == ">") || (Game.map[y - 1][x] == "g" || Game.map[y - 1][x] == "c")) || (Game.map[y - 1][x] == "]" || Game.map[y - 1][x] == "}")) {
                    if (((Game.map[y][x - 1] == "x" || Game.map[y][x - 1] == ">") || (Game.map[y][x - 1] == "g" || Game.map[y][x - 1] == "c")) || (Game.map[y][x - 1] == "]" || Game.map[y][x - 1] == "}")) {
                        Game.map[y][x] = "]";
                    } else {
                        Game.map[y][x] = "[";
                    }
                } else {
                    Game.map[y][x] = "[";
                }
                break;
            case "{":
            case "}":
                ctx.fillStyle = "saddlebrown";

                if (((Game.map[y - 1][x] == "x" || Game.map[y - 1][x] == ">") || (Game.map[y - 1][x] == "g" || Game.map[y - 1][x] == "c")) || (Game.map[y - 1][x] == "]" || Game.map[y - 1][x] == "}")) {
                    Game.map[y][x] = "}";
                } else if (((Game.map[y][x - 1] == "x" || Game.map[y][x - 1] == ">") || (Game.map[y][x - 1] == "g" || Game.map[y][x - 1] == "c")) || (Game.map[y][x - 1] == "]" || Game.map[y][x - 1] == "}")) {
                    Game.map[y][x] = "}";
                } else {
                    Game.map[y][x] = "{";
                }
                break;
        }

        ctx.fillRect(x * 25, y * 25, 25, 25);
    }
}