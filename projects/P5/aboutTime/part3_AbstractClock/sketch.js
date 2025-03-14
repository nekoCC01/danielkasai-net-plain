//global variables
var x_start = 50; //x-value for top-left corner of the bucket
var y_top = 50; //y-value of the top of the bucket
var bucket_array = [];
var direction = 1;
var shift_count = 0;

//initial drops for the first bucket
var first_drop_position_y = -20; //initial value for the first drop
var first_drop_end_position = 84; //position at the bottom of the first bucket

function setup() {
    /*
        canvas size:
        width = 50 (start_x) + 520 (4 * 140) (row of buckets) + 177 (width + thickness of the last bucket) + 50 (margin on the right)
        height = 50 (y_top) + 6720 (96 * 70) (number of buckets * shifting downwards) + 50 (margin bottom)
    */
    createCanvas(797, 6820);

    /*
        Create buckets (as an array) with a stair-like pattern
        24h * (4 buckets / h) = 96 buckets --> 1 bucket represents 15min
        distance between buckets: y:70, x:130
    */
    for (i = 1; i <= 96; i++) {
        myBucket = new Bucket(x_start, y_top);
        y_top += 70;
        x_start += 130 * direction;
        shift_count++;
        if (shift_count % 4 == 0) { //after four shifts (four buckets, together representing one hour), change the direction
            direction *= -1;
        }
        bucket_array.push(myBucket);
    }
}

function draw() {
    /*
    Draw background - consisting of 24 segments divided into 4 parts representing phases of the day with in-/decrementing luminosity and night or daylight color
    base color: #265B6A
    */
    background(255);
    colorMode(HSB);
    noStroke();
    var y_background_rect = 40;
    for (i = 1; i <= 8; i++) {
        var brightness = 20 + 10 * i;
        fill(193, 21.3, brightness);
        rect(0, y_background_rect, width, 280); // height: 4 buckets (4*70)
        y_background_rect += 280;
    }
    var y_background_rect = 2280;
    for (i = 1; i <= 4; i++) {
        var brightness = 60 + 10 * i;
        fill(42, 55.2, brightness);
        rect(0, y_background_rect, width, 280);
        y_background_rect += 280;
    }
    //mark the middle of the day
    stroke(255);
    strokeWeight(2);
    line(0, 3400, width, 3400);
    noStroke();
    var y_background_rect = 3400;
    for (i = 1; i <= 4; i++) {
        var brightness = 60 + 10 * (5 - i);
        fill(42, 55.2, brightness);
        rect(0, y_background_rect, width, 280);
        y_background_rect += 280;
    }
    var y_background_rect = 4520;
    for (i = 1; i <= 8; i++) {
        var brightness = 20 + 10 * (9 - i);
        fill(193, 21.3, brightness);
        rect(0, y_background_rect, width, 280);
        y_background_rect += 280;
    }
    //lines, just for design purposes  
    var y_line = 40;
    stroke(255);
    strokeWeight(0.3);
    while (y_line < 6820) {
        line(0, y_line, width, y_line);
        y_line += 10;
    }

    //initial water drops, at the top of the page, filling the first bucket
    if (first_drop_position_y < first_drop_end_position) {
        fill('#0F414F');
        noStroke();
        triangle(105, first_drop_position_y, 115, first_drop_position_y, 110, first_drop_position_y - 10);
        ellipse(110, first_drop_position_y, 10, 10);
        first_drop_position_y += 2;
    } else if (first_drop_position_y >= first_drop_end_position) {
        first_drop_position_y = -20;
    }

    //getting the current time
    var h = hour();
    var m = minute();
    var s = second();
    var seconds_total = h * 60 * 60 + m * 60 + s;
    var buckets_to_fill = ceil(seconds_total / (15 * 60)); // --> 1 bucket represents 15min

    //drawing the buckets (contained in the array (setup)) and filling them with water according to the current time
    direction = 1;
    for (i = 0; i < bucket_array.length; i++) {
        if (i % 4 == 0 && i != 0) {
            direction *= -1;
        }
        bucket_array[i].display(direction);
        if (i + 1 < buckets_to_fill) {
            bucket_array[i].dripping(direction);
            bucket_array[i].water(15 * 60); //full water load (representing 15min)
            seconds_total -= 15 * 60;
        } else if (i + 1 == buckets_to_fill) {
            bucket_array[i].water(seconds_total); //water height according to remaining amount of seconds (after decrements for the full buckets)
        }

    }
}

function Bucket(_x_start, _y_top) {

    //bucket measurements
    this.x_start = _x_start;
    this.y_top = _y_top;

    this.thickness = 7;
    this.height_bucket = 50;
    this.width_bucket = 170;
    this.padding = 3;

    //water drops
    this.drops_start_x_right = this.x_start + this.width_bucket + 20;
    this.drops_start_x_left = this.x_start - 20;
    this.drops_end_y = this.y_top + this.height_bucket + 70 - this.thickness - this.padding * 3; //70 = distance between buckets --> See setup-loop
    this.drop_position = this.y_top;

    //draw the bucket, relative to y_top, x_start
    this.display = function (RowDirection) {
        noStroke();
        fill('#022A35');
        rect(this.x_start, this.y_top, this.thickness, this.height_bucket);
        rect(this.x_start, this.y_top + this.height_bucket - this.thickness, this.width_bucket, this.thickness);
        rect(this.x_start + this.width_bucket - this.thickness, this.y_top, this.thickness, this.height_bucket);
        if (RowDirection == 1) {
            triangle(this.x_start + this.width_bucket - this.thickness, this.y_top, this.drops_start_x_right, this.y_top, this.x_start + this.width_bucket - this.thickness, this.y_top + this.thickness);
        } else if (RowDirection == -1) {
            triangle(this.x_start + this.thickness, this.y_top, this.drops_start_x_left, this.y_top, this.x_start, this.y_top + this.thickness);
        }
    }

    //fill in the water, relative to time
    this.water = function (_second) {
        fill('#0F414F');
        var waterHeight = (_second / (15 * 60)) * (this.height_bucket - this.thickness - this.padding);
        rect(this.x_start + this.thickness + this.padding, this.y_top + this.height_bucket - this.thickness - this.padding - waterHeight, this.width_bucket - 2 * (this.thickness + this.padding), waterHeight);
    }

    //drops dripping from the bucket
    this.dripping = function (RowDirection) {
        if (this.drop_position < this.drops_end_y) {
            fill('#0F414F');
            if (RowDirection == 1) {
                triangle(this.drops_start_x_right - 5, this.drop_position, this.drops_start_x_right + 5, this.drop_position, this.drops_start_x_right, this.drop_position - 10);
                ellipse(this.drops_start_x_right, this.drop_position, 10, 10);
            } else if (RowDirection == -1) {
                triangle(this.drops_start_x_left - 5, this.drop_position, this.drops_start_x_left + 5, this.drop_position, this.drops_start_x_left, this.drop_position - 10);
                ellipse(this.drops_start_x_left, this.drop_position, 10, 10);
            }
            this.drop_position += 2;
        } else if (this.drop_position >= this.drops_end_y) {
            this.drop_position = this.y_top;
        }
    }

}
