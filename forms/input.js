/**
 * Created by exaveb on 27.04.2017.
 */

var  handlebars = require('handlebars');

var output = require('./forms/output');

function changeTemplate(template, context, container) {
    var source = document.getElementById(template).innerHTML,
        html = context ? handlebars.compile(source)(context) : handlebars.compile(source)();
    container.innerHTML = html;
    return container;
}


var input = function (polygon) {

    add_btn = document.getElementById('addbtn');
    var menu = document.getElementById('menu');
    console.log(menu);
    changeTemplate('inputform', null, menu);
    menu.classList.add('show');

    document.getElementById('input-cancel').addEventListener('click', function () {
        polygon.setMap(null);
        polygon = null;
        add_btn.style.display = "block";
        menu.classList.remove('show');
    });

    document.getElementById('input-ok').addEventListener('click', function () {
        menu.classList.remove('show');
        add_btn.style.display = "block";


        google.maps.event.addListener(polygon, 'click', function () {

            output.bind(null,polygon)();

        });

    });

}

module.exports = input;