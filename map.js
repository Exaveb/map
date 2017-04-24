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
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true

    });


    var centerControlDiv = document.createElement('div');
    var menudiv = document.createElement('div');
    menudiv.id = 'menu';
    menudiv.classList.add("menu");
    menudiv.index = 1;
    centerControlDiv.index = 1;
    var source   = document.getElementById("info").innerHTML,
        template = Handlebars.compile(source),
        // context = {title: "My New Post", body: "This is my first post!"},
        html    = template(test_context);
    menudiv.innerHTML = html;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(menudiv);

    source = document.getElementById('add_btn').innerHTML;
    template = Handlebars.compile(source);
    html = template();
    centerControlDiv.innerHTML = html;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    var ok_can_div = document.createElement('div');
    ok_can_div.id = 'ok_can_div';
    source = document.getElementById('two_btn').innerHTML;
    template = Handlebars.compile(source);
    html = template();
    ok_can_div.innerHTML = html;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(ok_can_div);
    ok_can_div.style.display = 'none';





    google.maps.event.addListener(map,'click',function () {
       document.getElementById('menu').classList.remove('show');
    });
}



function add_click() {
    var controlUI = document.getElementById('addbtn');
    var ok_can_btn = document.getElementById('ok_can_div');
    var ok = document.getElementById('ok_btn');
    var cancel = document.getElementById('cancel_btn');

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,

    });
    drawingManager.setMap(map);
    console.log(map.controls);
    controlUI.style.display = "none";
    ok_can_btn.style.display = 'block';
    console.log(ok_can_btn);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        console.log(polygon);
        drawingManager.setMap(null);
        var menudiv = document.getElementById('menu');
        var source   = document.getElementById("inputform").innerHTML,
            template = Handlebars.compile(source),
            html    = template();
        menudiv.innerHTML = html;
        menudiv.classList.add('show');

        cancel.addEventListener('click',function(){
                polygon.setMap(null);
                polygon = null;
            controlUI.style.display = "block";
            ok_can_btn.style.display = 'none';
            menudiv.classList.remove('show');

            var source   = document.getElementById("info").innerHTML,
                template = Handlebars.compile(source),
                // context = {title: "My New Post", body: "This is my first post!"},
                html    = template(test_context);
            menudiv.innerHTML = html;
        });

       ok.addEventListener('click',function () {
            controlUI.style.display = "block";
            ok_can_btn.style.display = 'none';
           menudiv.classList.remove('show');

           var source   = document.getElementById("info").innerHTML,
               template = Handlebars.compile(source),
               // context = {title: "My New Post", body: "This is my first post!"},
               html    = template(test_context);
           menudiv.innerHTML = html;

            google.maps.event.addListener(polygon, 'click', function () {
                document.getElementById('menu').classList.add('show');
                console.log(document.getElementById('menu').classList);
            })

        })
    });
}

