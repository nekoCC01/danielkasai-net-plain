//global variables
var canvas;

var persons = [
    {
        name: "Socrates",
        text: "Socrates (470/469 – 399 BC) was a classical Greek (Athenian) philosopher credited as one of the founders of Western philosophy. "
    },
    {
        name: "Thomas Aquin",
        text: "Saint Thomas Aquinas O.P. (1225 – 7 March 1274), was an Italian Dominican friar, Catholic priest, and Doctor of the Church. "
    },
    {
        name: "Kant",
        text: "Immanuel Kant (22 April 1724 – 12 February 1804) was a German philosopher who is considered a central figure in modern philosophy."
    },
    {
        name: "Sartre",
        text: "Jean-Paul Charles Aymard Sartre (21 June 1905 – 15 April 1980) was a French philosopher, playwright, novelist, political activist, biographer, and literary critic. "
    }

];


function setup() {
    //get width/height of canvas container - to make canvas responsive
    var canvas_container = select("#canvas_container");
    var width_canvas = canvas_container.width;
    var height_canvas = canvas_container.height;

    //append canvas to container-div
    canvas = createCanvas(width_canvas, height_canvas);
    background(100);
    canvas.parent("#canvas_container");

    //create buttons, based on persons array
    var buttons_div = select("#buttons");
    for (var i = 0; i < persons.length; i++) {
        button = createButton(persons[i].name);
        button.mousePressed(changePerson);
        //use global data-attribute of button element to store context
        button.data = i;
        buttons_div.child(button);
    }

    //style text div
    var text_div = select("#text");
    text_div.style("background-color", "black");

}

function draw() {
    ellipse(width / 2, height / 2, 100, 100);

}

//on button click: draw rectangle and show text
function changePerson() {
    fill(random(256), random(256), random(256));
    var text_div = select("#text");
    //use data-attribute of button to extract the right text from the array
    text_div.html(persons[this.data].text);

    //draw rectangle, based on context (button click)
    switch (this.data) {
        case 0:
            background(100);
            rect(0, 0, width / 2, height / 2);
            break;
        case 1:
            background(100);
            rect(width / 2, 0, width / 2, height / 2);
            break;
        case 2:
            background(100);
            rect(width / 2, height / 2, width / 2, height / 2);
            break;
        case 3:
            background(100);
            rect(0, height / 2, width / 2, height / 2);
            break;
    }
}
