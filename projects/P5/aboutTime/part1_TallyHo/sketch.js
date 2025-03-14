//global variables
//initial position for marks
var x = 50;
var y = 50;
//click counter
var clicks = 0;

function setup() {
    createCanvas(700, 700);
    background("#277554");
}

function draw() {

}

function mousePressed() {
    stroke("rgba(255,255,255,0.7)");
    strokeWeight(2.2);
    clicks++;
    if (clicks % 5 == 0) { //after 5,10,15.. clicks
        line(x - 50, y + 25, x, y + 20); //final line, across the other 4 lines of a group
        //at this point, before starting a new group: check distance to right edge
        if (width - x > 100) { //if distance is big enough (> 100), go on
            x += 20;
        } else { //if distance is too narrow (<= 100), start a new row
            x = 50;
            y += 100;
        }
    } else { //adding vertical lines to the group & shifting the x-value
        line(x, y, x, y + 50);
        x += 10;
    }
}

function keyPressed() {
    //set back to initial state
    background("#277554");
    x = 50;
    y = 50;
    clicks = 0;
}
