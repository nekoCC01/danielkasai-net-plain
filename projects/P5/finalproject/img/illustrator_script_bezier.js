var p5_string = '';
if (app.documents.length > 0 && app.activeDocument.pathItems.length > 0) {
    doc = app.activeDocument;
    for (var i = 0; i < doc.pathItems.length; i++) {
        pathRef = doc.pathItems[i];
        p5_string += 'beginShape();';
        for (var c = 0; c < pathRef.pathPoints.length; c++) {
            pathPoint = pathRef.pathPoints[c];
            if (c == 0) {
                p5_string += "vertex(" + pathPoint.anchor[0] + "," + Math.abs(pathPoint.anchor[1]) + ");";
            } else {
                p5_string += "bezierVertex(" + Math.round(pathPoint.leftDirection[0]) + "," + Math.round(Math.abs(pathPoint.leftDirection[1])) + "," + Math.round(pathPoint.rightDirection[0]) + "," + Math.round(Math.abs(pathPoint.rightDirection[1])) + "," + Math.round(pathPoint.anchor[0]) + "," + Math.round(Math.abs(pathPoint.anchor[1])) + ");";
            }
        }
        p5_string += "endShape(CLOSE);"
    }
}

selectedItems = app.activeDocument.selection;
if (selectedItems.length > 0) {
    // The selection must be a text art item
    if (selectedItems[0].typename == "TextFrame") {
        selectedItems[0].contents = p5_string;
    }
}

//alert(p5_string);
