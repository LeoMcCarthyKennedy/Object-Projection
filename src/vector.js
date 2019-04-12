function vector(x, y, z, v) {
    if (v == null) {
        this.x = x;
        this.y = y;
        this.z = z;
    } else {
        this.x = x + v.x;
        this.y = y + v.y;
        this.z = z + v.z;
    }

    this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}