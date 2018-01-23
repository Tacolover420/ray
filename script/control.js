let movement = false;
let turn = false;
let interval;
let intervalTurn;
let updatespeed = 10;
let speed = 2;
let lastMoveX = 0;

document.addEventListener('pointerlockchange', lockChangeLog, false);

document.onkeydown = function(event) {
    if (movement == false) {
        switch (event.keyCode) {
            case 87: //w
                interval = setInterval("player.move(90)", updatespeed);
                movement = true;
                break;
            case 68: //a
                interval = setInterval("player.move(180)", updatespeed);
                movement = true;
                break;
            case 83: //s
                interval = setInterval("player.move(270)", updatespeed);
                movement = true;
                break;
            case 65: //d
                interval = setInterval("player.move(0)", updatespeed);
                movement = true;
                break;
            case 38: //up
                interval = setInterval("player.move(90)", updatespeed);
                movement = true;
                break;
            case 40: //down
                interval = setInterval("player.move(270)", updatespeed);
                movement = true;
                break;
        }
    }
    if (turn == false) {
        let speed = 3;
        switch (event.keyCode) {
            case 39: //rechts
                intervalTurn = setInterval("player.turn(speed);", updatespeed);
                turn = true;
                break;
            case 37: //links
                intervalTurn = setInterval("player.turn(-speed);", updatespeed);
                turn = true;
                break;
        }
    }
    if (event.keyCode == 70) { //f -> enter/leave fullscreen
        if (screen == false) {
            launchIntoFullscreen(document.documentElement);
            screen = true;
        }
        else {
            exitFullscreen();
            screen = false;
        }
    }
}

document.onkeyup = function(event) {
    if (movement == true && (event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 83 || event.keyCode == 65 ||  event.keyCode == 40 ||  event.keyCode == 38)) {
        clearInterval(interval);
        movement = false;
    }
    if (turn == true && (event.keyCode == 37 || event.keyCode == 39)) {
        clearInterval(intervalTurn);
        turn = false;
    }
}

canvas.onclick = function() {
    canvas.requestPointerLock();
}

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

function mousemoveCallback(event) {
    let move = event.movementX;
    if (move > lastMoveX +500 || move < lastMoveX - 500) {
        move = lastMoveX;
    }
    lastMoveX = move;
    player.pod += move / 50; //mouse sensitivity
    if (player.pod >= 360) {
        player.pod -= 360;
    }
    if (player.pod < 0) {
        player.pod += 360;
    }
    pod += move / 50;
    update();
}

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

function lockChangeLog() {
    if (document.pointerLockElement == canvas) {
        document.addEventListener("mousemove", mousemoveCallback, false);
    }
    else {
        document.removeEventListener("mousemove", mousemoveCallback, false);
    }
}
