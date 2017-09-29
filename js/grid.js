
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var colorPallet = ['#ffffff','#FBF137','#FD6522','#DA111A','#EF1A84','#4713A2','#071CCF','#1DACE7','#2BB527','#096318','#552C0A','#8F713F','#C0C0C0','#606060','#181818','#000000'];

var colorSelected = 0;

var canleftUnit = 1;
var cantopUnit = 1;
var pixelUnit = 2.5;

//Background
context.fillStyle = "#181818";
context.fillRect(0, 0, canvas.width, canvas.height);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}



canvas.addEventListener("mousedown", function(e) {
    var pos = getMousePos(canvas, e);
    posx = parseInt(pos.x/pixelUnit);
    posy = parseInt(pos.y/pixelUnit);

    context.fillStyle = colorPallet[colorSelected];
    context.fillRect (posx, posy, 1, 1);
});


function zoom1x(){
    $('#canvas').removeClass('canvas-zoom--2x canvas-zoom--4x');
    $('body').removeClass('body-zoom--2x body-zoom--4x');
    $('.info').show();

    $(".zoom-control__button").removeClass('zoom-control__button--focus');
    $("#zoom-control-1x").addClass('zoom-control__button--focus');

    canvas.style.width = '1000px';
    canvas.style.height = '500px';
    pixelUnit = 2.5;
}


function zoom2x(){

    $('#canvas').removeClass('canvas-zoom--4x').addClass('canvas-zoom--2x');
    $('body').removeClass('body-zoom--4x').addClass('body-zoom--2x');
    $('.info').hide();

    $(".zoom-control__button").removeClass('zoom-control__button--focus');
    $("#zoom-control-2x").addClass('zoom-control__button--focus');

    canvas.style.width = '2000px';
    canvas.style.height = '1000px';
    pixelUnit = 10;
}

function zoom4x(){
    $('#canvas').removeClass('canvas-zoom--2x').addClass('canvas-zoom--4x');
    $('body').removeClass('body-zoom--2x').addClass('body-zoom--4x');
    $('.info').hide();

    $(".zoom-control__button").removeClass('zoom-control__button--focus');
    $("#zoom-control-4x").addClass('zoom-control__button--focus');

    canvas.style.width = '4000px';
    canvas.style.height = '2000px';
    pixelUnit = 40;
}

$('.color-control__button').click(function(evt) {
    $('.color-control__button').removeClass('color-control__button--focus');
    $(this).addClass('color-control__button--focus');
    colorSelected = $(this).attr('id');
});

