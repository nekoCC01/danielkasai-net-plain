
/*
    The following functions are the central control of the flow from scene to scene.
    They follow a basic pattern:
    (1) Deactivate all animations
    (2) Insert description text for scene
    (3) Position Map & Timeline and set AnimationNumber --> to allow entrance into the specific AnimationNumber-Conditions within map & timeline
    (4) prepare Blurbs (text boxes with additional information) and Timespans
    (5) activate Scene Icon (in the orientation bar between map & timeline
    --> these Icons can be used later to switch back and forth between the Scenes

    © Daniel Kasai 2017

 */

function startScene1() {
    //startCounter prevents showing the popup again, see end of startScene1()
    startCounter++;

    startScreen.remove();

    //alle Animations are set to false, then with AnimationNumber_SetOutside, the current Animation is activated
    deactivateAllAnimations();
    //remove all text, that was produced by Blurbs
    $("p").remove();

    //description text for this scene, on the right to the map
    text_div.html('“philosophia” is a greek word and originated in a greek colony called “Ionia”. <br>When the origins of philosophy are discussed, a map of greece is usually shown, with Athens as the center. <br> But to fully understand where philosophy came from, we have to extend the map to the east.');

    //MAP
    //set the values for scaling & translation
    myp5_map.positioned = false;
    myp5_map.zoom_final = 4;
    myp5_map.translate_x_final = -200;
    myp5_map.translate_y_final = -130;
    myp5_map.AnimationNumber_SetOutside = 1;
    calculate_differences(myp5_map, "map");

    //prepare the Blurbs (containting additional information) for display on the map
    myp5_map.blurbIonia = new Blurb(myp5_map, 540, 200, 50, 510, 240, 730, 360, "vertical", "Miletus was a prosperous harbour city with far-reaching connections to other cultures.");
    myp5_map.blurbAthens = new Blurb(myp5_map, 410, 200, 50, 360, 120, 120, 270, "horizontal", "In Athens, the three philosophers Socrates, Plato (as a student of Socrates) and Aristotle (as a student of Plato) lived and taught in succession.");
    myp5_map.blurbThales = new Blurb(myp5_map, 540, 100, 40, 610, 10, 820, 140, "horizontal", "Thales of Miletus was one of the first philosophers thinking about the origins of the material world.");

    //TIMELINE
    myp5_timeline.positioned = false;
    myp5_timeline.zoom_final = 1.4;
    myp5_timeline.translate_x_final = -2100;
    myp5_timeline.translate_y_final = 0;
    myp5_timeline.AnimationNumber_SetOutside = 1;
    calculate_differences(myp5_timeline, "timeline");

    //Time spans for Timeline
    myp5_timeline.timespanPresocratic = new Timespan(myp5_timeline, 650, 470, 15, 25, .8, "Presocratic Philosophy", 7);
    myp5_timeline.timespanThales = new Timespan(myp5_timeline, 640, 562, 60, 15, .6, "Thales", 3);
    myp5_timeline.timespanSocrates = new Timespan(myp5_timeline, 469, 399, 70, 15, .6, "Socrates", 3);
    myp5_timeline.timespanPlato = new Timespan(myp5_timeline, 428, 348, 90, 15, .6, "Plato", 3);
    myp5_timeline.timespanAristotle = new Timespan(myp5_timeline, 384, 322, 110, 15, .6, "Aristotle", 3);

    //Activate the icon for this scene and the arrow to get to the next scene
    var icon = select("#icon1");
    icon.style("display", "inline-block");
    icon.mousePressed(startScene1);

    var arrow = select("#arrow1");
    arrow.style("display", "inline-block");
    arrow.mousePressed(startScene2);

    if (startCounter == 1) {
        popup = createDiv("Click on the Arrow-Icon to move to the next screen");
        popup.addClass("popup");
        popup.position(310, 417);
    }

}

function startScene2() {
    popup.remove();

    deactivateAllAnimations();
    $("p").remove();

    text_div.html("Ionia was deeply influenced by the cultures of its backland, recieving transmitted knowledge, especially in astronomy and geometry, " +
        "from Egypt and Babylonia (within the region called Mesopotamia). These cultures developed around the fertile ground of the Nil and the Tigris–Euphrates river system " +
        "and - during the Bronce Age - grew into the first civilizations, encompassing a network of trading cities. ");

    //MAP
    myp5_map.positioned = false;
    myp5_map.zoom_final = 2.9;
    myp5_map.translate_x_final = -250;
    myp5_map.translate_y_final = -150;
    myp5_map.AnimationNumber_SetOutside = 2;
    calculate_differences(myp5_map, "map");

    //myp5_map.blurbLydia = new Blurb(myp5_map,240,115,100,50,150,250,250,"vertical","When Thales was young, Miletus was part of the Lydian Empire");
    myp5_map.blurbSardes = new Blurb(myp5_map, 260, 85, 130, 90, 130, 330, 265, "vertical", "Thales, as a merchant and engineer, regularly visited Sardes, which in turn was connected to Mesopotamian courts.");
    myp5_map.blurbSusa = new Blurb(myp5_map, 629, 210, 90, 590, 140, 830, 20, "vertical", "The Greeks traveled as far as Susa, one of the most important cities of the Ancient Near East.");

    //set angles for arrow movements
    myp5_map.angle = 50;
    myp5_map.angle2 = 0;

    //TIMELINE
    myp5_timeline.positioned = false;
    myp5_timeline.zoom_final = 0.57;
    myp5_timeline.translate_x_final = -450;
    myp5_timeline.translate_y_final = 150;
    myp5_timeline.AnimationNumber_SetOutside = 2;
    calculate_differences(myp5_timeline, "timeline");

    //Time spans for Timeline
    myp5_timeline.timespanEarlyBronceAge = new Timespan(myp5_timeline, 2550, 1920, 20, 25, .6, "Early Bronce Age", 7);
    myp5_timeline.timespanMiddleBronceAge = new Timespan(myp5_timeline, 1900, 1620, 20, 25, .6, "Middle Bronce Age", 7);
    myp5_timeline.timespanLateBronceAge = new Timespan(myp5_timeline, 1600, 1120, 20, 25, .6, "Late Bronce Age", 7);
    myp5_timeline.timespanIronAge = new Timespan(myp5_timeline, 1100, 600, 20, 25, .6, "Iron Age", 7);
    //myp5_timeline.timespanClassicAge = new Timespan(myp5_timeline, 384, 322, 110, 15, .6, "Aristotle", 3);
    myp5_timeline.timespanEarlyBabylonia = new Timespan(myp5_timeline, 1900, 1800, 85, 20, .8, "", 6);
    myp5_timeline.timespanNeoBabylonia = new Timespan(myp5_timeline, 700, 600, 85, 20, .8, "", 6);
    myp5_timeline.timespanEgyptMiddleKingdom = new Timespan(myp5_timeline, 2055, 1650, 60, 20, .8, "Egypt - Middle Kingdom", 6);
    myp5_timeline.timespanEgyptNewKingdom = new Timespan(myp5_timeline, 1550, 1069, 60, 20, .8, "Egypt - New Kingdom", 6);
    myp5_timeline.timespanEgyptLatePeriod = new Timespan(myp5_timeline, 664, 332, 60, 20, .8, "Egypt - Late Period", 6);
    myp5_timeline.timespanEgyptianPyramids = new Timespan(myp5_timeline, 2550, 2200, 60, 20, .8, "Egyptian Pyramids", 6);
    myp5_timeline.timespanSumerWriting = new Timespan(myp5_timeline, 2400, 2100, 85, 20, .8, "Sumer - first writing systems", 6);
    myp5_timeline.timespanGreeceTrade = new Timespan(myp5_timeline, 900, 560, 160, 20, .8, "Trade Greece-NearEast revived", 6);
    myp5_timeline.timespanGreecePhilosophy = new Timespan(myp5_timeline, 650, 400, 110, 20, .8, "Greek Philosophy", 6);


    //Activate the next ICONS
    var icon = select("#icon2");
    icon.style("display", "inline-block");
    icon.mousePressed(startScene2);

    var arrow = select("#arrow2");
    arrow.style("display", "inline-block");
    arrow.mousePressed(startScene3);


}

function startScene3() {

    deactivateAllAnimations();
    $("p").remove();

    text_div.html("The region of Mesopotamia was conquered by a wide range of tribes, establishing a long succession of different empires. " +
        "Around 1000 BC the Persians, a tribe of the Indo-European language family, moved from the Caspian Sea downwards into Mesopotamia. " +
        "They conquered one region after the other, establishing an empire that reached from Greece to India.");

    //MAP
    myp5_map.positioned = false;
    myp5_map.zoom_final = 1.7;
    myp5_map.translate_x_final = -250;
    myp5_map.translate_y_final = -130;
    myp5_map.AnimationNumber_SetOutside = 3;
    calculate_differences(myp5_map, "map");

    myp5_map.blurbMiletusPersia = new Blurb(myp5_map, 140, 90, 40, 10, 260, 270, 390, "vertical", "Miletus was under the influence of many different cultures, while still relatively independent - a good starting point for philosophical thinking.");
    myp5_map.blurbDareiosI = new Blurb(myp5_map, 450, 100, 40, 570, 10, 820, 170, "horizontal", "Dareios I. ruled Persia during its peak. He promoted the exchange of knowledge, himself especially interested in medicine and military engineering.");

    //TIMELINE
    myp5_timeline.positioned = false;
    myp5_timeline.zoom_final = 1.6;
    myp5_timeline.translate_x_final = -1950;
    myp5_timeline.translate_y_final = 0;
    myp5_timeline.AnimationNumber_SetOutside = 3;
    calculate_differences(myp5_timeline, "timeline");

    //Time spans for Timeline
    myp5_timeline.timespanPersianMove = new Timespan(myp5_timeline, 1000, 700, 20, 25, .8, "Persians come from Caspian Sea", 7);
    myp5_timeline.timespanFirstPersianEmpire = new Timespan(myp5_timeline, 550, 330, 20, 25, .8, "First Persian Empire (Achaemenid)", 7);
    myp5_timeline.timespanDariusI = new Timespan(myp5_timeline, 522, 486, 50, 25, .8, "", 7);
    myp5_timeline.timespanIndiaGreecePersia = new Timespan(myp5_timeline, 545, 490, 80, 25, .8, "", 7);

    //ICONS
    var icon = select("#icon3");
    icon.style("display", "inline-block");
    icon.mousePressed(startScene3);

    var arrow = select("#arrow3");
    arrow.style("display", "inline-block");
    arrow.mousePressed(startScene4);
}

function startScene4() {

    deactivateAllAnimations();
    $("p").remove();

    text_div.html("The Persians, from a European perspective, are often depicted as the enemy of Greek democracy. " +
        "But although military confrontation was daily routine in the Ancient world, there was nonetheless a wide-ranging network of cultural and material exchange, promoted by Persian kings. " +
        "Cities like Sardes or Susa were very likely the stage for encounters between Greek and Indian philosophers.");

    //MAP
    myp5_map.positioned = false;
    myp5_map.zoom_final = 1.7;
    myp5_map.translate_x_final = -250;
    myp5_map.translate_y_final = -130;
    myp5_map.AnimationNumber_SetOutside = 4;
    calculate_differences(myp5_map, "map");

    myp5_map.blurbSusaTranslation = new Blurb(myp5_map, 360, 230, 130, 210, 300, 550, 380, "vertical", "In cities like Susa there were many translators, paid by the court.");

    //angles for arrow movements
    myp5_map.angle3 = 180;
    myp5_map.angle4 = 0;

    //TIMELINE
    myp5_timeline.positioned = false;
    myp5_timeline.zoom_final = 0.7;
    myp5_timeline.translate_x_final = -900;
    myp5_timeline.translate_y_final = 118;
    myp5_timeline.AnimationNumber_SetOutside = 4;
    calculate_differences(myp5_timeline, "timeline");

    //Time spans for Timeline
    myp5_timeline.timespanIndeEuropeans = new Timespan(myp5_timeline, 1900, 1570, 20, 25, .8, "Indo-Europeans arrive in Greece & India", 7);
    myp5_timeline.timespanPersiansMesopotamia = new Timespan(myp5_timeline, 1000, 330, 20, 25, .8, "Persians in Mesopotamia", 7);
    myp5_timeline.timespanExchange = new Timespan(myp5_timeline, 800, 300, 50, 25, .8, "Time of Intensified Exchange", 7);

    myp5_timeline.blurbLanguage = new Blurb(myp5_timeline, 350, 37, 40, 390, 10, 700, 130, "horizontal", "The Greek, Iranian and Indian Languages all have their origin in the Indo-European language family. Translation between the languages wasn´t difficult at that time. ", "timeline");

    //ICONS
    var icon = select("#icon4");
    icon.style("display", "inline-block");
    icon.mousePressed(startScene4);

    var arrow = select("#arrow4");
    arrow.style("display", "inline-block");
    arrow.mousePressed(startScene5);
}

function startScene5() {

    deactivateAllAnimations();
    $("p").remove();

    text_div.html("So we shouldn´t be surprised to find a lot of related ideas both in Indian as well as in Greek Philosophy. Among those ideas are the concepts of rebirth, cyclical time and a philosophical view called 'monism' - which is foundational for religious belief systems as well. " +
        "Monism basically states, that everything consists of the same substance or goes back to the same origin.");

    //MAP
    myp5_map.positioned = false;
    myp5_map.zoom_final = 1;
    myp5_map.translate_x_final = 0;
    myp5_map.translate_y_final = 0;
    myp5_map.AnimationNumber_SetOutside = 5;
    calculate_differences(myp5_map, "map");

    myp5_map.blurbPlato = new Blurb(myp5_map, 390, 220, 160, 250, 295, 480, 380, "vertical", "In his book 'Phaido' Plato wrote about rebirth and the idea of an eternal soul.");
    myp5_map.blurbThalesMonism = new Blurb(myp5_map, 280, 150, 30, 210, 100, 20, 200, "horizontal", "Thales represents the doctrin of material monism.");

    myp5_map.blurbBuddha = new Blurb(myp5_map, 670, 200, 40, 690, 150, 835, 350, "horizontal", "Buddhism further developed the monistic ideas of the earlier Indian Vedic & Upanishadic Philosophy.");

    myp5_map.angle3 = 180;
    myp5_map.angle4 = 0;

    //TIMELINE
    myp5_timeline.positioned = false;
    myp5_timeline.zoom_final = 0.65;
    myp5_timeline.translate_x_final = -900;
    myp5_timeline.translate_y_final = 150;
    myp5_timeline.AnimationNumber_SetOutside = 5;
    calculate_differences(myp5_timeline, "timeline");

    //Time spans for Timeline
    myp5_timeline.timespanBronceAge = new Timespan(myp5_timeline, 2100, 1100, 20, 25, .8, "Bronce Age Civilizations", 7);
    myp5_timeline.timespanAxialAge = new Timespan(myp5_timeline, 800, 200, 20, 25, .8, "Axial Age of Philosophy & Religion", 7);
    myp5_timeline.timespanExchange = new Timespan(myp5_timeline, 800, 300, 50, 25, .8, "Time of Intensified Exchange", 7);

    myp5_timeline.timespanPlato2 = new Timespan(myp5_timeline, 428, 348, 50, 18, .7, "Plato");
    myp5_timeline.timespanConfucius = new Timespan(myp5_timeline, 551, 479, 70, 18, .7, "");
    myp5_timeline.timespanBuddha = new Timespan(myp5_timeline, 563, 483, 90, 18, .7, "Buddha");
    myp5_timeline.timespanZoroaster = new Timespan(myp5_timeline, 870, 600, 110, 18, .4, "Zoroaster (date unclear)");


    myp5_timeline.blurbAxialAge = new Blurb(myp5_timeline, 840, 40, 20, 790, 50, 390, 150, "horizontal", "'Axial Age' is a term to describe the simualtaneous occurence of new philosophical or religious movements in Greece, India, Persia and China. ", "timeline");

    //Last Icon
    var icon = select("#icon5");
    icon.style("display", "inline-block");
    icon.mousePressed(startScene5);

}




function deactivateAllAnimations() {
    for (i = 1; i <= 5; i++) {
        var AnimationVariableName = "Animation" + i;
        var assignmentString1 = "myp5_map." + AnimationVariableName + " = false";
        var assignmentString2 = "myp5_timeline." + AnimationVariableName + " = false";
        eval(assignmentString1);
        eval(assignmentString2);
    }
}
