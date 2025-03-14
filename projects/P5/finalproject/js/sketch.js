/*
    This file contains the two P5 sketches (in Instance Mode) for the Map and the Timeline.
    They are both integrated into the DOM of index.html.

    © Daniel Kasai 2017
 */

//global variables
var startScreen;
var popup;
var text_div;
var startCounter = 0;

function setup() {
    noCanvas();
    startScreen = createDiv("<h1>The Origins of Philosophy</h1>" +
        "<h2>Welcome!</h2><p>Click on this screen to start a tour through the Ancient Age of Philosophy...</p>");
    startScreen.addClass("startScreen");
    startScreen.position(300, 140);
    startScreen.mousePressed(startScene1);
    text_div = select("#description_text");
}

function draw() {

}


var sketch_map = function (p) {

    // Indicator for the positioning of the map, starts with false, is set to true after positioning of the map
    p.positioned = false;

    //initial values for Zooming (Scale)
    p.zoom = 1;
    p.zoom_final = 1;
    p.zoom_direction = 0;
    p.increment_zoom = 0.01;
    p.difference_zoom = 0;

    // initial values for x-translation
    p.translate_x = 0;
    p.translate_x_final = 0;
    p.translate_x_direction = 0;
    p.increment_translate_x = 0;
    p.difference_translate_x = 0;

    // initial values for y-translation
    p.translate_y = 0;
    p.translate_y_final = 0;
    p.translate_y_direction = 0;
    p.increment_translate_y = 0;
    p.difference_translate_y = 0;

    // Offsets for Animations - used to delay specific animations, based on frameCount
    p.captureFrameCount = 0;
    p.frameCountOffset = 60;

    /*
        AnimationNumber - used to (de)activate scene-based animations by setting "Animation+[Number]" to true,
        thus allowing the entrance into the corresponding conditional statement
    */
    p.AnimationNumber_SetOutside = 0;
    p.AnimationNumber_SetInside = 0;

    //the corresponding "Animation+[Number]"-variables
    p.Animation1 = false;
    p.Animation2 = false;
    p.Animation3 = false;
    p.Animation4 = false;
    p.Animation5 = false;
    p.Animation6 = false;

    //external images
    p.images = [];

    p.preload = function () {
        p.images[0] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/thales.png");
        p.images[1] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/dareiosI.png");
        p.images[2] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/IndianPhilosopher.png");
        p.images[3] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/plato.png");
        p.images[4] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/buddha.png");
    }


    p.setup = function () {

        p.canvas_container = p.select("#map");
        p.width_canvas = p.canvas_container.width;
        p.height_canvas = p.canvas_container.height;

        //append canvas to container-div
        p.canvas = p.createCanvas(p.width_canvas, p.height_canvas);

        p.canvas.parent("#map");

        /*
            bounce parameters for images --> bouncing Effect for images
        */
        p.bounceImageHeightThales = new BounceParameter(180);
        p.bounceImageHeightThales2 = new BounceParameter(190);
        p.bounceImageHeightDareios = new BounceParameter(320);
        p.bounceImageHeightDareios2 = new BounceParameter(230);
        p.bounceImageHeightIndianPhilosopher = new BounceParameter(240);
        p.bounceImageHeightPlato = new BounceParameter(200);
        p.bounceImageHeightBuddha = new BounceParameter(200);

    }
    p.draw = function () {

        p.push();

        p.background('#809E9D');

        // recalculation of the map position, based on the set values for Scale & Translation
        positioning(myp5_map);

        p.noStroke();
        p.fill('#FFCCA2');

        //the actual map
        drawMap();

        p.pop();


        if (p.Animation1 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            p.strokeWeight(1);
            //CITIES & AREAS
            //Athens
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(430, 200, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(430, 200, 13, 13);

            //Milet
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(530, 205, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(530, 205, 13, 13);

            //Ionia
            p.stroke('rgba(174, 109, 55,.8)');
            p.ellipse(530, 190, 65, 65);
            p.ellipse(530, 190, 70, 70);

            p.textAlign(LEFT);
            p.textSize(30);
            p.text("IONIA", 570, 170);


            p.noStroke();
            p.fill('rgba(255,255,255,.8)');

            //IMAGES & BLURBS
            //Blurbs, based on the Blurb class, containing additional information
            p.blurbIonia.display();
            p.blurbAthens.display();

            if (p.frameCount > p.captureFrameCount + 3 * p.frameCountOffset) {
                p.blurbThales.display();

                p.height_image = p.bounceImageHeightThales.returnBounceParameter();
                p.image(p.images[0], 410, 50, 118, p.height_image);
            }

        }

        if (p.Animation2 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {


            // rivers (Nil, Tigris & Euphrat
            drawRivers();


            //CITIES
            p.strokeWeight(1);
            //Milet
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(240, 90, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(240, 90, 13, 13);

            p.fill('rgba(255,255,255,.8)');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Miletus", 212, 107);

            //Sardes
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(260, 70, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(260, 70, 13, 13);

            p.fill('rgba(255,255,255,.8)');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Sardes", 260, 58);

            //Susa
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(630, 235, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(630, 235, 13, 13);

            p.fill('rgba(255,255,255,.8)');
            p.noStroke();
            p.text("Susa", 630, 219);

            //Babylon
            p.noStroke();
            p.fill('rgba(255,255,255,.8)');
            p.ellipse(515, 170, 10, 10);
            p.noFill();
            p.stroke('rgba(255,255,255,.8)');
            p.ellipse(515, 170, 13, 13);

            p.fill('rgba(255,255,255,.8)');
            p.noStroke();
            p.text("Babylon", 540, 190);


            //Text for regions
            p.noFill();
            p.stroke('rgba(174, 109, 55,.6)');
            p.textSize(30);
            p.text("MESOPOTAMIA", 540, 170);

            p.text("EGYPT", 300, 300);

            //p.textSize(24);
            //p.text("LYDIA", 330, 70);


            //ARROWS
            //arrow from Egypt
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.25)');

            if (p.angle >= -30) {
                p.angle--;
            }
            p.arc(300, 200, 200, 200, p.radians(p.angle), p.radians(50));

            p.push();
            p.translate(300, 200);
            p.rotate(p.radians(p.angle) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.25)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();


            //arrow from Mesopotamia
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.25)');

            if (p.angle2 >= -80) {
                p.angle2--;
            }
            p.arc(400, 170, 200, 200, p.radians(p.angle2), p.radians(0));

            p.push();
            p.translate(400, 170);
            p.rotate(p.radians(p.angle2) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.25)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();

            //BLURBS
            if (p.frameCount > p.captureFrameCount + 3 * p.frameCountOffset) {
                //Blurbs
                p.blurbSardes.display();
                //p.blurbLydia.display();
                p.blurbSusa.display();
            }



        }

        if (p.Animation3 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            p.fill('rgba(255,255,255,.6)');
            //draw Persian Empire, as a transparent white overlay
            drawPersianEmpire();

            p.textAlign(CENTER);
            //Text for regions
            p.noFill();
            p.stroke('rgba(174, 109, 55,.6)');
            p.textSize(30);
            p.text("INDIA", 675, 310);
            p.textSize(24);
            p.text("INDUS", 586, 210);
            p.text("VALLEY", 586, 240);


            //CITIES
            p.strokeWeight(1);
            //Milet
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(140, 90, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(140, 90, 13, 13);

            p.fill(255, 255, 255);
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Miletus", 112, 107);

            //Persepolis
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(400, 170, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(400, 170, 13, 13);

            p.fill('#FFCCA2');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Persepolis", 445, 180);


            //IMAGES & BLURBS
            if (p.frameCount > p.captureFrameCount + 2 * p.frameCountOffset) {
                p.height_image = p.bounceImageHeightDareios.returnBounceParameter();
                p.image(p.images[1], 240, 30, 222, p.height_image);
            }

            if (p.frameCount > p.captureFrameCount + 3 * p.frameCountOffset) {
                p.blurbDareiosI.display();
            }
            if (p.frameCount > p.captureFrameCount + 4 * p.frameCountOffset) {
                p.blurbMiletusPersia.display();
            }

        }


        if (p.Animation4 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            p.fill('rgba(255,255,255,.3)');
            drawPersianEmpire();


            p.strokeWeight(1);
            p.textAlign(CENTER);
            //Text for regions
            p.noFill();
            p.stroke('rgba(174, 109, 55,.6)');
            p.textSize(30);
            p.text("INDIA", 675, 310);
            p.textSize(24);
            p.text("INDUS", 586, 210);
            p.text("VALLEY", 586, 240);


            //CITIES
            //Milet
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(140, 90, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(140, 90, 13, 13);

            p.fill(255, 255, 255);
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Miletus", 112, 107);

            //Sardes
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(160, 70, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(160, 70, 13, 13);

            p.fill('#FFCCA2');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Sardes", 197, 70);

            //Persepolis
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(400, 170, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(400, 170, 13, 13);

            p.fill('#FFCCA2');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Persepolis", 445, 180);

            //Susa
            p.noStroke();
            p.fill('#FFCCA2');
            p.ellipse(355, 175, 10, 10);
            p.noFill();
            p.stroke(255, 255, 255);
            p.ellipse(355, 175, 13, 13);

            p.fill('#FFCCA2');
            p.noStroke();
            p.textSize(14);
            p.textAlign(CENTER);
            p.text("Susa", 355, 160);


            //ARROWS - symbolizing the exchange of ideas, supported by translation
            //arrow1
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.5)');

            if (p.angle3 >= 0) {
                p.angle3--;
            }
            p.arc(370, 150, 200, 200, p.radians(p.angle3), p.radians(180));

            p.push();
            p.translate(370, 150);
            p.rotate(p.radians(p.angle3) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.5)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();


            //arrow2
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.5)');

            if (p.angle4 >= -180) {
                p.angle4--;
            }
            p.arc(370, 150, 200, 200, p.radians(p.angle4), p.radians(0));

            p.push();
            p.translate(370, 150);
            p.rotate(p.radians(p.angle4) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.5)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();


            //IMAGES & BLURBS
            p.height_image = p.bounceImageHeightThales2.returnBounceParameter();
            p.image(p.images[0], 150, 50, 125, p.height_image);

            p.height_image = p.bounceImageHeightIndianPhilosopher.returnBounceParameter();
            p.image(p.images[2], 450, 30, 171, p.height_image);


            if (p.frameCount > p.captureFrameCount + 3 * p.frameCountOffset) {
                p.blurbSusaTranslation.display();
            }


        }


        if (p.Animation5 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //ARROWS
            //arrow1
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.5)');

            if (p.angle3 >= 0) {
                p.angle3--;
            }
            p.arc(470, 150, 200, 200, p.radians(p.angle3), p.radians(180));

            p.push();
            p.translate(470, 150);
            p.rotate(p.radians(p.angle3) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.5)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();


            //arrow2
            p.strokeCap(SQUARE);
            p.noFill();
            p.strokeWeight(20);
            p.stroke('rgba(255,255,255,0.5)');

            if (p.angle4 >= -180) {
                p.angle4--;
            }
            p.arc(470, 150, 200, 200, p.radians(p.angle4), p.radians(0));

            p.push();
            p.translate(470, 150);
            p.rotate(p.radians(p.angle4) - PI);
            p.noStroke();
            p.fill('rgba(255,255,255,0.5)');
            p.triangle(-140, 0, -100, 50, -60, 0);
            p.pop();



            //IMAGES
            p.height_image = p.bounceImageHeightThales2.returnBounceParameter();
            p.image(p.images[0], 250, 50, 125, p.height_image);

            p.height_image = p.bounceImageHeightDareios2.returnBounceParameter();
            p.image(p.images[1], 408, 30, 160, p.height_image);

            p.height_image = p.bounceImageHeightIndianPhilosopher.returnBounceParameter();
            p.image(p.images[2], 550, 30, 171, p.height_image);

            p.height_image = p.bounceImageHeightPlato.returnBounceParameter();
            p.image(p.images[3], 295, 100, 132, p.height_image);

            p.height_image = p.bounceImageHeightBuddha.returnBounceParameter();
            p.image(p.images[4], 580, 120, 139, p.height_image);


            //BLURBS
            if (p.frameCount > p.captureFrameCount + 3.5 * p.frameCountOffset) {
                p.blurbPlato.display();
                p.blurbThalesMonism.display();
                p.blurbBuddha.display();
            }



        }

        /*
            The following condition is entered, when positioning of the map is finished AND the AnimationNumber hasn´t been set yet.
            AnimationNumber_SetOutside is set by the startScene[1-5]-functions, which control the overall flow from Scene to Scene.
         */
        if (p.positioned == true && p.AnimationNumber_SetOutside != p.AnimationNumber_SetInside) {

            var AnimationVariableName = "Animation" + p.AnimationNumber_SetOutside;
            var assignmentString = "p." + AnimationVariableName + " = true";
            eval(assignmentString);

            //capture current frameCount in order to delay specific animations
            p.captureFrameCount = p.frameCount;

            /*
                set AnimationNumber Inside to Outside(set by startScene)
                --> to prevent re-entrance into this condition, until the next Scene is started (SetOutside is changed)
             */

            p.AnimationNumber_SetInside = p.AnimationNumber_SetOutside;
        }

    }


}
var myp5_map = new p5(sketch_map);


var sketch_timeline = function (p) {

    /*
        The timeline code basically follows the same pattern as the map code
     */

    p.positioned = false;

    p.zoom = 1;
    p.zoom_final = 1;
    p.zoom_direction = 0;
    p.increment_zoom = 0.01;
    p.difference_zoom = 0;

    p.translate_x = 0;
    p.translate_x_final = 0;
    p.translate_x_direction = 0;
    p.increment_translate_x = 0;
    p.difference_translate_x = 0;

    p.translate_y = 0;
    p.translate_y_final = 0;
    p.translate_y_direction = 0;
    p.increment_translate_y = 0;
    p.difference_translate_y = 0;

    p.captureFrameCount = 0;
    p.frameCountOffset = 60;

    p.AnimationNumber_SetOutside = 0;
    p.AnimationNumber_SetInside = 0;

    p.Animation1 = false;
    p.Animation2 = false;
    p.Animation3 = false;
    p.Animation4 = false;
    p.Animation5 = false;
    p.Animation6 = false;

    p.images = [];

    //container for timeline years
    p.timeline_years = [];


    p.preload = function () {
        p.images[0] = p.loadImage("/danielkasai-net-plain/projects/P5/finalproject/img/thales.png");
    }

    p.setup = function () {
        p.canvas_container = p.select("#timeline");
        p.width_canvas = p.canvas_container.width;
        p.height_canvas = p.canvas_container.height;

        //append canvas to container-div
        p.canvas = p.createCanvas(p.width_canvas, p.height_canvas);

        p.canvas.parent("#timeline");

        // build timeline array, containing the years from 3000BC to 500AD
        for (i = -3000; i <= 500; i += 100) {
            p.timeline_years.push(i);
        }

    }
    p.draw = function () {

        p.push();

        p.background('#809E9D');

        positioning(myp5_timeline);

        p.drawTimeline();
        p.pop();

        p.noStroke();

        if (p.Animation1 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //TIMESPANS, based on the Timespan class --> animated strip within the Timeine, with text
            p.timespanPresocratic.drawTimespan();
            p.timespanPresocratic.drawTimespan();
            p.timespanThales.drawTimespan();
            p.timespanSocrates.drawTimespan();
            p.timespanPlato.drawTimespan();
            p.timespanAristotle.drawTimespan();

            if (p.frameCount > p.captureFrameCount + p.frameCountOffset * 6) {
                //p.height_image = p.bounceImageHeightThales.returnBounceParameter();
                p.image(p.images[0], 192, 20, 197, 300);
            }

        }

        if (p.Animation2 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //TIMESPANS
            p.timespanEarlyBronceAge.drawTimespan();
            p.timespanMiddleBronceAge.drawTimespan();
            p.timespanLateBronceAge.drawTimespan();
            p.timespanIronAge.drawTimespan();
            //p.timespanClassicAge.drawTimespan();

            if (p.frameCount > p.captureFrameCount + p.frameCountOffset * 2.5) {
                p.timespanEarlyBabylonia.drawTimespan();

                p.text("Early Babylonia", 460, 100);
                p.stroke("black");
                p.strokeWeight(1);
                p.line(454, 95, 400, 95);
                p.noStroke();

                p.timespanNeoBabylonia.drawTimespan();

                p.text("Neo Babylonian Empire", 880, 100);
                p.stroke("black");
                p.strokeWeight(1);
                p.line(1010, 95, 1080, 95);
                p.noStroke();

                p.timespanEgyptMiddleKingdom.drawTimespan();
                p.timespanEgyptNewKingdom.drawTimespan();
                p.timespanEgyptLatePeriod.drawTimespan();
            }

            if (p.frameCount > p.captureFrameCount + p.frameCountOffset * 3.5) {
                p.timespanEgyptianPyramids.drawTimespan();
                p.timespanSumerWriting.drawTimespan();
                p.timespanGreeceTrade.drawTimespan();
                p.timespanGreecePhilosophy.drawTimespan();
            }


        }

        if (p.Animation3 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //TIMESPANS
            p.timespanPersianMove.drawTimespan();
            p.timespanFirstPersianEmpire.drawTimespan();
            p.timespanDariusI.drawTimespan();

            p.text("Reign of Darius I.", 940, 68);
            p.stroke("black");
            p.strokeWeight(1);
            p.line(880, 64, 930, 64);
            p.noStroke();

            p.timespanIndiaGreecePersia.drawTimespan();

            p.text("Greece and India under Persian rule", 940, 97);
            p.stroke("black");
            p.strokeWeight(1);
            p.line(865, 93, 930, 93);
            p.noStroke();
        }


        if (p.Animation4 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //TIMESPANS
            p.timespanIndeEuropeans.drawTimespan();
            p.timespanPersiansMesopotamia.drawTimespan();
            p.timespanExchange.drawTimespan();

            //BLURB
            if (p.frameCount > p.captureFrameCount + p.frameCountOffset * 2) {
                p.blurbLanguage.display();
            }

        }

        if (p.Animation5 == true && p.frameCount > p.captureFrameCount + p.frameCountOffset) {

            //TIMESPANS
            p.timespanBronceAge.drawTimespan();
            p.timespanAxialAge.drawTimespan();
            //p.timespanExchange.drawTimespan();

            p.timespanPlato2.drawTimespan();
            p.timespanConfucius.drawTimespan();

            p.text("Confucius", 1070, 83);
            p.stroke("black");
            p.strokeWeight(1);
            p.line(1030, 79, 1065, 79);
            p.noStroke();

            p.timespanBuddha.drawTimespan();
            p.timespanZoroaster.drawTimespan();

            //BLURB
            p.blurbAxialAge.display();
        }


        /*
            same as with the Map: the following condition regulates the activation of Animations
            based on AnimationNumber_SetOutside,
            after the timeline has been positioned
         */

        if (p.positioned == true && p.AnimationNumber_SetOutside != p.AnimationNumber_SetInside) {

            var AnimationVariableName = "Animation" + p.AnimationNumber_SetOutside;
            var assignmentString = "p." + AnimationVariableName + " = true";
            eval(assignmentString);

            p.captureFrameCount = p.frameCount;

            p.AnimationNumber_SetInside = p.AnimationNumber_SetOutside;

        }

    }

    //Drawing of the Timeline - with different sizes for text and marks (based on steps of 1000,500,100 years
    p.drawTimeline = function () {
        for (x = 0; x < p.timeline_years.length; x++) {

            if (p.timeline_years[x] % 1000 == 0) {
                p.size = 80;
            } else if (p.timeline_years[x] % 500 == 0) {
                p.size = 50;
            } else if (p.timeline_years[x] % 100 == 0) {
                p.size = 30;
            }
            p.textSize(p.size * 0.32);
            p.textAlign(CENTER);
            //p.textFont("Georgia");
            p.textFont("Verdana");
            p.textStyle(BOLD);
            p.fill("rgba(255,255,255,.6)");
            p.noStroke();
            if (p.timeline_years[x] < 0) {
                var text = Math.abs(p.timeline_years[x]) + "BC";
                p.text(text, x * 100 + 5, 107);
            } else {
                p.text(p.timeline_years[x], x * 100, 107);
            }
            p.stroke("rgba(255,255,255,.3)");
            p.line(x * 100, 100 - (p.size / 2), x * 100, 100 + (p.size / 2));
        }
    }

}
var myp5_timeline = new p5(sketch_timeline);
