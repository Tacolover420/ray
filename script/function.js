/*enter fullscreen*/
function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/*exit fullscreen*/
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/*mousemovement for turning*/
function lockChangeLog() {
    if (document.pointerLockElement == canvas) {
        document.addEventListener("mousemove", mousemoveCallback, false);
    }
    else {
        document.removeEventListener("mousemove", mousemoveCallback, false);
    }
}

/*get distance between two points(x, y)*/
function getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

/*compares distances of sprites (draw further away first)*/
function compareDistance(a, b) {
    let distA = a.distance;
    let distB = b.distance;

    let comparison = 0;
    if (distA < distB) {
        comparison = 1;
    } else if (distA > distB) {
        comparison = -1;
    }
    return comparison;
}

/*check if points / rectangles are in range*/
function compareStartEnd(min0, max0, min1, max1) {
    return max0 > min1 && min0 < max1;
}