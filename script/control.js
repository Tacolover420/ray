let movement = false;
let turn = false;
let interval;
let intervalTurn;
let updatespeed = 10;

document.addEventListener('pointerlockchange', lockChangeLog, false);

/*key down event*/
document.onkeydown = function(event) {
    if (movement == false) {
        switch (event.keyCode) {
            /*w key*/
            case 87:
                interval = setInterval("player.move(90)", updatespeed);
                movement = true;
                break;

            /*a key*/
            case 68:
                interval = setInterval("player.move(180)", updatespeed);
                movement = true;
                break;

            /*s key*/
            case 83:
                interval = setInterval("player.move(270)", updatespeed);
                movement = true;
                break;

            /*d key*/
            case 65:
                interval = setInterval("player.move(0)", updatespeed);
                movement = true;
                break;
        }
    }

    if (turn == false) {
        switch (event.keyCode) {
            /*right arrow key*/
            case 39:
                intervalTurn = setInterval("player.turn(3);", updatespeed);
                turn = true;
                break;

            /*left arrow key*/
            case 37:
                intervalTurn = setInterval("player.turn(-3);", updatespeed);
                turn = true;
                break;
        }
    }

    switch (event.keyCode) {
        /*up arrow key*/
        case 38:
            player.look(-10);
            break;

        /*down arrow key*/
        case 40:
            player.look(10);
            break;

        /*F, enter and leave fullscreen*/
        case 70:
            if (screen == false) {
                launchIntoFullscreen(document.documentElement);
                scaleCanvas();
                screen = true;
            }
            else {
                exitFullscreen();
                scaleCanvas();
                screen = false;
            }
            break;
    }
}

/*key up event*/
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

/*onclick in canvas to get pointerlock*/
canvas.onclick = function() {
    canvas.requestPointerLock();
}

function mousemoveCallback(event) {
    /*turn around*/
    let turn = event.movementX / 2;
    player.turn(turn);

    /*look around*/
    let look = event.movementY / 2;
    player.look(look);

    update();
}


