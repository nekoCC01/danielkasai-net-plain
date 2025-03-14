function setup() {
    createCanvas(700, 800);
    stroke(0);
}

function draw() {
    background(255);

    //clock design, based on concentric circles
    translate(350, 350);
    noStroke();
    fill(0);
    ellipse(0, 0, 630, 630);
    fill(255);
    ellipse(0, 0, 600, 600);
    for (i = 4; i >= 1; i--) {
        var r = 400 + i * 50;
        colorMode(HSB);
        var brightness = 100 - i * 2.5;
        fill(31, 50, brightness);
        noStroke();
        ellipse(0, 0, r, r);
    }
    fill(0);
    ellipse(0, 0, 400, 400);
    //some transparent white reflections
    noFill();
    stroke('rgba(255,255,255,0.2)');
    strokeWeight(43);
    ellipse(0, 0, 500, 500);
    strokeWeight(4);
    stroke('rgba(255,255,255,0.4)');
    ellipse(0, 0, 570, 570);
    ellipse(0, 0, 430, 430);

    //roman letters
    var roman_letters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    for (i = 1; i <= 12; i++) {
        var angle = radians((360 / 12) * i);
        push();
        rotate(angle);
        textSize(42);
        fill("#AA7439");
        noStroke();
        textFont("Georgia");
        textAlign(CENTER);
        text(roman_letters[i - 1], 0, -235);
        pop();
    }

    //get the current time
    var h = hour() % 12;
    var m = minute();
    var s = second();

    //minute hand
    push();
    var m_angle = (360 / 60) * m;
    rotate(radians(m_angle));
    drawMinuteHand();
    pop();

    //hour hand
    push();
    var h_angle = (360 / 12) * h;
    //additional angle according to the proceeding of minutes
    var add_min = m / 60 * (360 / 12);
    h_angle += add_min;
    rotate(radians(h_angle));
    drawHourHand();
    pop();

    //second hand
    push();
    var s_angle = (360 / 60) * s;
    rotate(radians(s_angle));
    drawSecondHand();
    pop();


    //digital display
    rectMode(CENTER);
    fill("#113C51");
    rect(0, 372, 200, 50)
    textAlign(CENTER);
    textSize(28);
    textFont("Courier New");
    fill(255);
    strokeWeight(3);
    text(nf(hour(), 2) + ":" + nf(m, 2) + ":" + nf(s, 2), 0, 380);

}

function drawMinuteHand() {
    fill("#D4A16A");
    noStroke();
    //central circle
    ellipse(0, 0, 50, 50);
    //backwards
    triangle(0, 0, 25, 30, -25, 30);
    triangle(0, 20, 30, 50, -30, 50);
    triangle(-15, 40, 15, 40, 0, 100);
    //forwards
    triangle(0, 0, 25, -50, -25, -50);
    ellipse(0, -80, 40, 80);
    quad(0, -100, -18, -120, 0, -300, 18, -120);
}


function drawHourHand() {
    fill("#AA7439");
    noStroke();
    //central circle
    ellipse(0, 0, 40, 40)
    //hand
    quad(0, 0, -25, -25, 0, -80, 25, -25);
    ellipse(0, -80, 40, 40);
    quad(0, -90, -15, -110, 0, -200, 15, -110);
}

function drawSecondHand() {
    fill("#FFE7CC");
    noStroke();
    ellipse(0, 0, 15, 15);
    quad(0, 0, -3, -20, 0, 2 - 250, 3, -20);
}
