let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

let circles1 = [];
for (let i = 150, rate = 0.005; i < 800; i += 100, rate += 0.005) {
    circles1.push(new Circle(i, 50, rate));
}
let circles2 = [];
for (let i = 150, rate = 0.005; i < 800; i += 100, rate += 0.005) {
    circles2.push(new Circle(50, i, rate));
}

setInterval(() => {
    context.clearRect(0, 0, canvas.width, 100);
    context.clearRect(0, 0, 100, canvas.height);
    for (let circle of circles1) {
        circle.update().draw();
    };
    for (let circle of circles2) {
        circle.update().draw();
    };
    for (let c1 of circles1) {
        for (let c2 of circles2) {
            drawPoint(c1, c2);
        }
    }
}, 30);

function drawPoint(c1, c2) {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(c1.px, c2.py, 1, Math.PI * 2, false);
    context.fill();
    // context.stroke();
};

function Circle(x, y, rate) {
    this.x = x;
    this.y = y;
    this.radius = 40;
    this.rate = rate;
    this.angle = 0;
    this.update = function() {
        this.px = x;
        this.py = y;
        let dx = Math.cos(this.angle) * this.radius;
        let dy = Math.sin(this.angle) * this.radius;
        this.px += dx;
        this.py += dy;
        this.angle += this.rate;
        if (this.angle >= 360) {
            this.angle = 0;
        }
        return this;
    };
    this.draw = function() {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        context.stroke();
        context.beginPath();
        context.arc(this.px, this.py, 5, Math.PI * 2, false);
        context.fill();
        context.stroke();
    };
};
