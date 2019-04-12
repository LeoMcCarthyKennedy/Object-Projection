function pyramid(position, rotation, size) {
    this.position = position;
    this.rotation = rotation;

    this.size = size;

    this.vertices = [
        new vector(0, -this.size, 0, this.position),
        new vector(this.size, this.size, this.size, this.position),
        new vector(this.size, this.size, -this.size, this.position),
        new vector(-this.size, this.size, this.size, this.position),
        new vector(-this.size, this.size, -this.size, this.position),
    ];

    this.drawOder = "010203042134";

    project(this.vertices, this.drawOder);
}