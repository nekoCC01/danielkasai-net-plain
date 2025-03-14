/*
    This file regulates the positioning of Map & Timeline, based on the values set in the startScene-functions (startScenes.js).
    Within startScene[1-5] values for scale & translate are set.
    Here the differences between current and set (final) values are calculated.
    The positioning-function is called within the P5-draw-function of Map & Timeline.

    © Daniel Kasai 2017
 */


/*
    First, the positioned-variable is set to true.
    If current and final values (scale/translate) still differ, the values in question are incremented/decremented.
    If they have reached their goal, positioned is set to true, allowing - within Timeline&Map-draw-functions -
    the entrance into the scene-specific animation code.

    As it can be difficult to exactly match the point, where the values have reached their goal,
    instead the moment is detected, when they cross the goal (the the difference between the values changes its sign-value (checkSign)).
 */
function positioning(ref) {

    ref.positioned = true;

    //Zoom (Scale)
    if (ref.zoom_direction != 0 && ref.zoom_direction == checkSign(ref.zoom_final - ref.zoom)) {
        ref.zoom += ref.increment_zoom * ref.zoom_direction;
        ref.positioned = false;
    }
    ref.scale(ref.zoom, ref.zoom);

    //Translate X
    if (ref.translate_x_direction != 0 && ref.translate_x_direction == checkSign(ref.translate_x_final - ref.translate_x)) {
        ref.translate_x += ref.increment_translate_x * ref.translate_x_direction;
        ref.positioned = false;
    }

    //Translate Y
    if (ref.translate_y_direction != 0 && ref.translate_y_direction == checkSign(ref.translate_y_final - ref.translate_y)) {
        ref.translate_y += ref.increment_translate_y * ref.translate_y_direction;
        ref.positioned = false;
    }

    ref.translate(ref.translate_x, ref.translate_y);

}

/*
    The following function is called by the startScene-functions in order to calculate the difference between the newly set (final) values
    and the current values (for scale, translate).
 */
function calculate_differences(ref, area) {


    if (area == "map") {
        ref.zoom_direction = checkSign(Math.round(ref.zoom_final - ref.zoom));
        ref.difference_zoom = Math.abs(ref.zoom_final - ref.zoom);

        ref.translate_x_direction = checkSign(Math.round(ref.translate_x_final - ref.translate_x));
        ref.difference_translate_x = Math.abs(ref.translate_x_final - ref.translate_x);

        ref.translate_y_direction = checkSign(Math.round(ref.translate_y_final - ref.translate_y));
        ref.difference_translate_y = Math.abs(ref.translate_y_final - ref.translate_y);
    } else if (area == "timeline") {
        ref.zoom_direction = checkSign(ref.zoom_final - ref.zoom);
        ref.difference_zoom = Math.abs(ref.zoom_final - ref.zoom);

        ref.translate_x_direction = checkSign(ref.translate_x_final - ref.translate_x);
        ref.difference_translate_x = Math.abs(ref.translate_x_final - ref.translate_x);

        ref.translate_y_direction = checkSign(ref.translate_y_final - ref.translate_y);
        ref.difference_translate_y = Math.abs(ref.translate_y_final - ref.translate_y);
    }

    //set default increment for zoom/scale
    ref.increment_zoom = ref.difference_zoom / 100;

    //set increment for translate: if scaling/zooming is active, map translate to scaling
    if (ref.zoom != ref.zoom_final) {
        //change translate increments, so that it maps to the zoom
        ref.increment_translate_x = (ref.increment_zoom * ref.difference_translate_x) / ref.difference_zoom;
        ref.increment_translate_y = (ref.increment_zoom * ref.difference_translate_y) / ref.difference_zoom;
    } else {
        ref.increment_translate_x = ref.difference_translate_x / 100;
        ref.increment_translate_y = ref.difference_translate_y / 100;
    }
}

function checkSign(input_number) {
    if (input_number > 0) {
        return 1;
    } else if (input_number == 0) {
        return 0;
    } else {
        return -1;
    }
}

