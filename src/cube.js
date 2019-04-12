function cube(position, rotation, size) {
    this.position = position;
    this.rotation = rotation;

    this.size = size;

    this.vertices = [
        new vector(-this.size, this.size, -this.size, this.position),
        new vector(-this.size, -this.size, -this.size, this.position),
        new vector(-this.size, -this.size, this.size, this.position),
        new vector(this.size, this.size, -this.size, this.position),
        new vector(this.size, -this.size, -this.size, this.position),
        new vector(this.size, this.size, this.size, this.position),
        new vector(this.size, -this.size, this.size, this.position),
        new vector(-this.size, this.size, this.size, this.position)
    ];

    this.drawOrder = "0721035643572641";

    project(this.vertices, this.drawOrder);
}