//basic counter
var c = 0;
//transparency value for moving clouds
var t = 0;

//variables for adding randomness to the background stripes
var t1, t2, t3, t4,
  offset1, offset2, offset3, offset4,
  offset5, offset6, offset7, offset8,
  height1, height2, height3, height4;

//counter for mouse events
var count_mouse = 0;

//movement
var x = 0;

//important: reference value for motion (target)
var ref = 0;

//background - stripes
var background_positions = {
  sky_middle: 140,
  sky_low: 220,
  ocean: 470,
  beach: 588
}

function setup() {
  createCanvas(1024, 768);
}

function mouseClicked() {
  if (count_mouse == 0) { //only for the first click event
    ref = mouseX;
  }
  count_mouse++;
}

function draw() {
  //establishing the background
  //gradient - upper part of sky
  colorMode(HSB);
  for (var i = 0; i <= 70; i = i + 10) {
    fill(200, 58, i);
    noStroke();
    rect(0, i, width, 10);
  }
  //sky - end of gradient
  rect(0, 80, width, 60);
  //sky - middle
  fill(163, 12, 47);
  rect(0, background_positions.sky_middle, width, 80);
  //sky - lower part
  fill(147, 14, 74);
  rect(0, background_positions.sky_low, width, 250);
  //ocean
  fill(156, 6, 35);
  rect(0, background_positions.ocean, width, 118);
  //beach - upper part
  fill(43, 47, 80)
  rect(0, background_positions.beach, width, 100);
  //gradient - beach - lower part
  for (var i = 80; i >= 0; i = i - 10) {
    fill(43, 47, i);
    noStroke();
    rect(0, height - i, width, 10);
  }

  //fixed transparent stripes
  fill(163, 12, 47, 0.5);
  rect(0, background_positions.sky_low - 40, width, 80);
  rect(0, background_positions.sky_low - 40, width, 80);
  rect(0, background_positions.ocean - 40, width, 80);

  //random transparent stripes
  //set random values for transparency (only first time)
  if (c == 0) {
    t1 = round(random(2, 4)) / 10;
    t2 = round(random(2, 4)) / 10;
    t3 = round(random(2, 4)) / 10;
    t4 = round(random(2, 4)) / 10;

    //small range
    offset1 = round(random(30, 90));
    offset2 = round(random(30, 90));
    offset3 = round(random(30, 90));
    offset4 = round(random(30, 90));

    //bigger range
    offset5 = round(random(-100, 100));
    offset6 = round(random(-100, 100));
    offset7 = round(random(-100, 100));
    offset8 = round(random(-100, 100));

    //height
    height1 = round(random(10, 100));
    height2 = round(random(10, 100));
    height3 = round(random(10, 100));
    height4 = round(random(10, 100));
  }
  c++;
  fill(163, 12, 47, t1);
  rect(0, background_positions.sky_low - offset1, width, 90);
  fill(163, 12, 47, t2);
  rect(0, background_positions.sky_low - offset2, width, 90);
  fill(163, 12, 47, t3);
  rect(0, background_positions.ocean - offset3, width, 90);
  fill(163, 12, 47, t4);
  rect(0, background_positions.ocean - offset4, width, 90);

  //additional random white stripes
  blendMode(OVERLAY);
  fill(0, 0, 100, t1);
  rect(0, background_positions.sky_low + offset5, width, height1);
  fill(0, 0, 100, t2);
  rect(0, background_positions.sky_low + offset6, width, height2);
  fill(0, 0, 100, t3);
  rect(0, background_positions.ocean + offset7, width, height3);
  fill(0, 0, 100, t4);
  rect(0, background_positions.ocean + offset8, width, height4);
  blendMode(BLEND);

  //invitation to click on the screen
  if (count_mouse == 0) { //only before the click event
    fill(255, 0.6);
    textSize(12);
    text("Please click on the screen to call the clouds...", width / 2, height / 2);
  }

  //movement created by the draw-loop, started by first click-event
  noFill();
  if (count_mouse > 0) {
    if (x <= ref) {
      x++;
    }
    //animated forms, with animated transparency (mapped to motion)
    colorMode(RGB);
    t = map(x, 0, ref, 0, 102);
    fill(255, t);
    noStroke();

    //from left to right
    triangle(x - 89, 336, x, 464, x - 83, 527);
    triangle(x - 89, 336, x + 14, 263, x - 89, 213);
    quad(x - 89, 213, x - 40, 237, x - 40, 103, x - 89, 103);
    quad(x - 89, 123, x, 144, x - 205, 248, x - 290, 219);
    quad(x - 342, 96, x - 18, 180, x + 48, 144, x - 326, 55);
    triangle(x - 224, 429, x + 49, 543, x + 49, 429);
    quad(x - 316, 144, x - 136, 192, x - 122, 145, x - 301, 97);
    quad(x - 295, 55, x - 72, 109, x - 68, 96, x - 292, 42);
    triangle(x - 619, 287, x - 214, 410, x - 185, 392);
    beginShape();
    vertex(x - 167, 412);
    vertex(x - 55, 451);
    vertex(x + 85, 358);
    vertex(x + 5, 304);
    vertex(x + 26, 217);
    vertex(x - 45, 275);
    vertex(x - 61, 123);
    vertex(x - 269, 76);
    vertex(x - 71, 146);
    vertex(x - 217, 206);
    vertex(x - 73, 176);
    vertex(x - 68, 340);
    endShape(CLOSE);
    //shadow
    fill(0, t - 50);
    blendMode(MULTIPLY);
    triangle(x - 237, 751, x + 148, 600, x + 53, 600);
    blendMode(BLEND);

    //from right to left
    fill(255, t);
    quad(2 * ref - x - 89, 336, 2 * ref - x + 55, 234, 2 * ref - x + 145, 361, 2 * ref - x, 464);
    beginShape();
    vertex(2 * ref - x - 23, 481);
    vertex(2 * ref - x + 82, 405);
    vertex(2 * ref - x + 201, 405);
    vertex(2 * ref - x + 249, 456);
    vertex(2 * ref - x + 49, 513);
    endShape(CLOSE);
    quad(2 * ref - x - 34, 240, 2 * ref - x + 44, 192, 2 * ref - x + 109, 228, 2 * ref - x + 80, 331);
    quad(2 * ref - x + 145, 361, 2 * ref - x + 74, 238, 2 * ref - x + 124, 194, 2 * ref - x + 208, 333);
    quad(2 * ref - x + 104, 270, 2 * ref - x + 134, 211, 2 * ref - x + 342, 107, 2 * ref - x + 162, 255);
    triangle(2 * ref - x + 117, 287, 2 * ref - x + 385, 154, 2 * ref - x + 178, 283);
    triangle(2 * ref - x + 117, 287, 2 * ref - x + 458, 262, 2 * ref - x + 198, 318);
    triangle(2 * ref - x + 263, 323, 2 * ref - x + 698, 278, 2 * ref - x + 342, 343);
    //shadow
    fill(0, t - 50);
    blendMode(MULTIPLY);
    triangle(2 * ref - x + 199, 745, 2 * ref - x + 307, 695, 2 * ref - x - 222, 610);
    blendMode(BLEND);
  }
}