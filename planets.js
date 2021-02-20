function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle
    let cos = Math.cos(radians)
    let sin = Math.sin(radians)
    let finX = (cos * (x - cx)) + (sin * (y - cy)) + cx
    let finY = (cos * (y - cy)) - (sin * (x - cx)) + cy
    return [finX, finY];
}
class planet {
    //pos is the position of the planet. it must be in function form so it will work
    //size is the size, dist is the distance from pos, speed is the angele of rotation per tick, color is the color
    constructor(pos, func, size, dist, speed,  color) {
        this.pos = pos
        this.tick = func
        this.size = size
        this.dist = dist
        this.speed = speed
        this.color = color
        this.rot = 0
    }
    getPos() {
        return [rotate(this.pos[0], this.pos[1], this.pos[0], this.pos[1] + this.dist, this.rot)[0], rotate(this.pos[0], this.pos[1], this.pos[0], this.pos[1] - this.dist, this.rot)[1]]
    }
    update() {
        this.rot += this.speed
        if (this.tick != null) {
            this.pos = this.tick()
        }
    }
}
//x is the list of Planets/moons and line is true/false weather you want the line
function render(x, line) {
    for (i = 0; i < x.length; i++) {
        if (line) {
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(x[i].pos[0], x[i].pos[1], x[i].dist, 0, Math.PI / 180 * 360);
            context.closePath();
            context.stroke();
        }
        context.beginPath();
        context.arc(x[i].getPos()[0], x[i].getPos()[1], x[i].size, 0, Math.PI / 180 * 360);
        context.closePath();
        context.fillStyle = x[i].color;
        context.fill();
        x[i].update()
    }
}