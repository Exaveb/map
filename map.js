/**
 * Created by exaveb on 16.04.2017.
 */
var Handlebars = require('handlebars');
function CenterControl(controlDiv, map) {


    var controlUI = document.createElement('div');
    controlUI.classList.add('btn');



    controlDiv.appendChild(controlUI);


    var controlText = document.createElement('div');



    controlText.innerHTML = 'Add';
    controlText.classList.add('btn-text');
    controlUI.appendChild(controlText);


    controlUI.addEventListener('click', function () {
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: false,

        });
        drawingManager.setMap(map);
        console.log(map.controls);
        controlUI.style.display = "none";
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            console.log(polygon);
            drawingManager.setMap(null);
            controlUI.style.display = "block";

            google.maps.event.addListener(polygon,'click',function () {
                document.getElementById('menu').classList.add('show');
                console.log( document.getElementById('menu').classList);
            })
        });
    });
}
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true

    });

    var centerControlDiv = document.createElement('div');
    var menudiv = document.createElement('div');
    menudiv.id = 'menu';
    menudiv.classList.add("menu");
    CenterControl(centerControlDiv, map);
    menudiv.index = 1;
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    var source   = document.getElementById("info").innerHTML,
        template = Handlebars.compile(source),
        // context = {title: "My New Post", body: "This is my first post!"},
        html    = template();
    menudiv.innerHTML = html;

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(menudiv);

    google.maps.event.addListener(map,'click',function () {
       document.getElementById('menu').classList.remove('show');
    });
}

