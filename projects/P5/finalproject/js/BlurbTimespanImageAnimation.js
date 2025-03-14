/*
    Functions for additional animations:
    (1) Blurbs - text boxes, showing additional information - used in Map & Timeline
    (2) Timespans for the Timeline - a stripe that shows a range of time
    (3) BounceParameter - for the bounce effects, when images are popping in

    © Daniel Kasai 2017
 */

/*
    The Blurb consists of a pointer, a rectangle and the text within.
    It can have two orientations (horizontal, vertical) and grow from left to right, top down (both positive)
    or right to left, bottom up (both negative).
    The text is produced as a DOM element (later removed be the startScene-Functions ($("p").remove();)
 */
function Blurb(ref, pointer_x_start, pointer_y_start, pointer_textfield_dist, textfield_x_start, textfield_y_start, textfield_x_end, textfield_y_end, orientation, textString, area = "map") {

    // all coordinates should be dividable by 5
    this.pointer_x_start = pointer_x_start;
    this.pointer_y_start = pointer_y_start;
    this.pointer_textfield_dist = pointer_textfield_dist;
    this.textfield_x_start = textfield_x_start;
    this.textfield_y_start = textfield_y_start;
    this.textfield_x_end = textfield_x_end;
    this.textfield_y_end = textfield_y_end;
    this.orientation = orientation;
    this.textString = textString;
    this.area = area;

    if (this.orientation == "vertical") {
        this.textfield_fix_start = this.textfield_y_start;
        this.textfield_fix_end = this.textfield_y_end;
        this.pointer_var = this.pointer_y_start;
        this.textfield_var = this.textfield_y_start;

        if (this.pointer_y_start < this.textfield_y_start) {
            this.growDirection = 1;
        } else {
            this.growDirection = -1;
        }
    } else {
        this.textfield_fix_start = this.textfield_x_start;
        this.textfield_fix_end = this.textfield_x_end;
        this.pointer_var = this.pointer_x_start;
        this.textfield_var = this.textfield_x_start;

        if (this.pointer_x_start < this.textfield_x_start) {
            this.growDirection = 1;
        } else {
            this.growDirection = -1;
        }
    }
    this.loopCounter = 0;

    //the function used in Timeline & Map to show the Blurb
    this.display = function () {
        if (Math.abs(this.pointer_var - this.textfield_fix_start) > 0) {
            this.pointer_var += 5 * this.growDirection;
        } else {
            if (Math.abs(this.textfield_var - this.textfield_fix_end) > 0 && this.loopCounter == 0) {
                this.textfield_var += 5 * this.growDirection;
            } else if (Math.abs(this.textfield_var - this.textfield_fix_end) == 0) {
                var myP = createP(this.textString);
                var width = Math.abs(this.textfield_x_end - this.textfield_x_start) - 40;
                width += "px";
                myP.style("width", width);
                if (this.growDirection < 0 && this.orientation == "horizontal") {
                    var x = this.textfield_x_end + 30;
                } else {
                    var x = this.textfield_x_start + 30;
                }

                if (this.growDirection < 0 && this.orientation == "vertical") {
                    var y = this.textfield_y_end + 15;
                } else {
                    var y = this.textfield_y_start + 15;
                }

                //for the timeline we need to add an offset to the y-position
                if (this.area == "timeline") {
                    y += 520;
                }
                myP.position(x, y);
                this.textfield_var += 5 * this.growDirection;
                this.loopCounter++;
            }
        }
        ref.rectMode(CORNERS);
        ref.noStroke();
        ref.fill("rgba(255,255,255,.7)");
        if (this.orientation == "vertical") {
            ref.triangle(this.pointer_x_start, this.pointer_y_start, this.textfield_x_start + this.pointer_textfield_dist, this.pointer_var, this.textfield_x_start + this.pointer_textfield_dist + 30, this.pointer_var);

            ref.rect(this.textfield_x_start, this.textfield_y_start, this.textfield_x_end, this.textfield_var);

        } else {
            ref.triangle(this.pointer_x_start, this.pointer_y_start, this.pointer_var, this.textfield_y_start + this.pointer_textfield_dist, this.pointer_var, this.textfield_y_start + this.pointer_textfield_dist + 30);

            ref.rect(this.textfield_x_start, this.textfield_y_start, this.textfield_var, this.textfield_y_end);
        }
        ref.rectMode(CORNER);

    }
}


/*
    Timespan = a rectangle, containing the name of the event, ranging from a start year to an end year.
    (The position is calculated based on the current scale- and translate-values of the timeline.)
    The Timespan is animated from left to right.
 */
function Timespan(ref, startYear, endYear, yCoord, height, transparency, text, textOffset = 5) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.yCoord = yCoord;
    this.height = height;
    this.transparency = transparency;
    this.text = text;
    this.textOffset = textOffset;

    //calculate x-coordinates for timespan based on Zoom Factor and translate
    this.xCoord = (3000 + ref.translate_x_final - this.startYear) * ref.zoom_final;
    this.width = (Math.abs(this.endYear - this.startYear)) * ref.zoom_final;
    this.widthStart = 0;

    this.drawTimespan = function () {
        if (this.widthStart < this.width) {
            this.widthStart += 5;
        }
        this.fillColor = 'rgba(255, 204, 162,' + this.transparency + ')';
        ref.fill(this.fillColor);
        ref.rect(this.xCoord, this.yCoord, this.widthStart, this.height);
        if (this.widthStart >= this.width) {
            ref.fill("black");
            ref.text(this.text, this.xCoord + 10, this.yCoord + this.height - this.textOffset);
        }
    }
}

/*
    The Bounce movement is defined by a finalHeight, an upper & lower limit of the bounce movement (as well as additional values for Speed).
    Once the height of the animated object/image has reached the lower limit, it enters the actual bounce-movement (bounceLoop).
    Within this loop, upper & lower limit are getting closer to each other, until they reach the final height.
 */
function BounceParameter(finalHeight, growSpeed = 5, bounceSpeed = 0.6) {
    this.finalHeight = finalHeight;
    this.bounceParameter = 0;
    this.upperLimit = this.finalHeight + 30;
    this.lowerLimit = this.finalHeight - 30;
    this.enterBounceLoop = false;
    this.Direction = 1;
    this.bounceSpeed = bounceSpeed;
    this.growSpeed = growSpeed;

    this.returnBounceParameter = function () {
        if (this.enterBounceLoop == false) {
            this.bounceParameter += this.growSpeed;
            if (this.bounceParameter > this.lowerLimit) {
                this.enterBounceLoop = true;
            }
        }

        if (this.enterBounceLoop) {
            if ((this.upperLimit - this.lowerLimit) > 0) {
                this.upperLimit -= this.bounceSpeed;
                this.lowerLimit += this.bounceSpeed;
                if (this.bounceParameter > this.upperLimit) {
                    this.Direction = -1;
                }
                if (this.bounceParameter < this.lowerLimit) {
                    this.Direction = 1;
                }
                this.bounceParameter += this.growSpeed * this.Direction;
            }
        }
        return this.bounceParameter;
    }
}



