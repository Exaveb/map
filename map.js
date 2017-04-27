/**
 * Created by exaveb on 16.04.2017.
 */
var Handlebars = require('handlebars');

var test_context = {
    id:"001",
    years:[
        {
            title:"1990",
            operations:[
                {
                    type:"one",
                    action: "true"
                },
                {
                    type:"two",
                    action: "false"
                },
                {
                    type:"three",
                    action: "true"
                },
                {
                    type:"four",
                    action: "true"
                }
            ]
        },
        {
            title:"1991",
            operations:[
                {
                    type:"one",
                    action: "true"
                },
                {
                    type:"two",
                    action: "false"
                },
                {
                    type:"three",
                    action: "true"
                },
                {
                    type:"four",
                    action: "true"
                }
            ]
        },
        {
            title:"1992",
            operations:[
                {
                    type:"one",
                    action: "true"
                },
                {
                    type:"two",
                    action: "false"
                },
                {
                    type:"three",
                    action: "true"
                },
                {
                    type:"four",
                    action: "true"
                }
            ]
        },
        {
            title:"1993",
            operations:[
                {
                    type:"one",
                    action: "true"
                },
                {
                    type:"two",
                    action: "false"
                },
                {
                    type:"three",
                    action: "true"
                },
                {
                    type:"four",
                    action: "true"
                }
            ]
        },
        {
            title:"1994",
            operations:[
                {
                    type:"one",
                    action: "true"
                },
                {
                    type:"two",
                    action: "false"
                },
                {
                    type:"three",
                    action: "true"
                },
                {
                    type:"four",
                    action: "true"
                }
            ]
        }
    ]
};

var map;
var input = require('./input');
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true

    });

    var add_btn = document.createElement('div');
    var output = document.createElement('div');
    output = createTemplate('outputform',test_context);
    output.id = 'menu';
    output.classList.add("menu");
    output.index = 1;
    add_btn.index = 1;

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(output);
    add_btn = createTemplate('add_btn',null);

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(add_btn);

    google.maps.event.addListener(map,'click',function (e) {
       document.getElementById('menu').classList.remove('show');
    });
}



function add_click() {
    var add_btn = document.getElementById('addbtn');


    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,

    });

    drawingManager.setMap(map);
    add_btn.style.display = "none";




    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {

        drawingManager.setMap(null);
        input.bind(null,polygon,google)();

    });
}

function createTemplate(template,context) {
    var div = document.createElement('div'),
        source = document.getElementById(template).innerHTML,
        html =context? Handlebars.compile(source)(context) :Handlebars.compile(source)() ;
        div.innerHTML = html;
        return div;

}

function changeTemplate(template,context,container) {
    var source = document.getElementById(template).innerHTML,
        html =context? Handlebars.compile(source)(context) :Handlebars.compile(source)() ;
        container.innerHTML = html;
        return container;
}





