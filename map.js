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

    google.maps.event.addListener(map,'click',function () {
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
        console.log(polygon);
        drawingManager.setMap(null);

        var input = document.getElementById('menu');
        console.log(input);
        changeTemplate('inputform',null, input);
        input.classList.add('show');

        document.getElementById('input-cancel').addEventListener('click',function() {
            polygon.setMap(null);
            polygon = null;
            add_btn.style.display = "block";
            input.classList.remove('show');
            changeTemplate('info',null,input);
            document.getElementById('input-cancel').removeEventListener('click');
            document.getElementById('input-ok').removeEventListener('click');

        });

        document.getElementById('input-ok').addEventListener('click',function() {
           add_btn.style.display = "block";
           input.classList.remove('show');
           changeTemplate('outputform', test_context,input);

           google.maps.event.addListener(polygon, 'click', function () {

               document.getElementById('menu').classList.add('show');
               console.log(document.getElementById('menu').classList);

               document.getElementById('delete').addEventListener('click',function () {
                   polygon.setMap(null);
                   polygon = null;
                   input.classList.remove('show');
               });
               document.getElementById('edit').addEventListener('click',function () {
                   var menu =  document.getElementById('menu');
                   menu.classList.remove('show');
                   changeTemplate('editform',null,menu);
                   menu.classList.add('show');

                   document.getElementById('edit-ok').addEventListener('click',function () {
                       menu.classList.remove('show');
                       changeTemplate('outputform',test_context,menu);

                       document.getElementById('edit-cancel').removeEventListener('click');
                       document.getElementById('edit-ok').removeEventListener('click');
                   });

                   document.getElementById('edit-cancel').addEventListener('click',function () {
                       menu.classList.remove('show');
                       changeTemplate('outputform',test_context,menu);

                       document.getElementById('edit-cancel').removeEventListener('click');
                       document.getElementById('edit-ok').removeEventListener('click');

                   });

               })

           });
            document.getElementById('input-cancel').removeEventListener('click');
            document.getElementById('input-ok').removeEventListener('click');
       });
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





