function setup() {
    createCanvas(800, 800);
}

function draw() {
    //darker skin color, no stroke
    fill(214, 135, 52);
    noStroke();
    //base shape for face (rounded)
    rect(199, 140, 351, 439, 20);
    
    //ligther skin color
    fill(252, 205, 151);
    //inner shape for face
    rect(237, 140, 313, 401, 20);
    
    //eyes, white
    fill(255,255,255);
    ellipse(329,362,83,42);
    ellipse(461,356,83,55);
    //eyeballs,black
    fill(0,0,0);
    ellipse(334,359,28,28);
    ellipse(463,353,33,33);
    
    //eyebrows, brown
    fill(116,73,51);
    rect(279,328,96,22);
    //second eyebrow, diagonal
    beginShape();
    vertex(411, 348);
    vertex(411, 326);
    vertex(505, 288);
    vertex(505, 310);
    endShape(CLOSE);
    
    //nose
    fill(214,135,52);
    beginShape();
    vertex(346, 442);
    vertex(423, 421);
    vertex(411, 356);
    vertex(450, 442);
    endShape(CLOSE);
    
    //mouth, as an arc of a big circle, placed above
    noFill();
    stroke(163,80,30);
    strokeWeight(15);
    arc(382,245,480,480,radians(60),radians(110));
    
    //hair
    fill(221,177,133);
    noStroke();
    beginShape();
    vertex(200, 340);
    vertex(290, 240);
    vertex(297, 273);
    vertex(345, 232);
    vertex(376, 279);
    vertex(448, 187);
    vertex(481, 281);
    vertex(493, 253);
    vertex(550, 345);
    vertex(550, 160);
    vertex(199, 160);
    endShape(CLOSE);
    //top of the head
    rect(199,140,351,40,20);
    
    
    
}