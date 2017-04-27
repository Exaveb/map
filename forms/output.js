/**
 * Created by exaveb on 27.04.2017.
 */

var edit = require('./forms/edit');

var  handlebars = require('handlebars');


function changeTemplate(template, context, container) {
    var source = document.getElementById(template).innerHTML,
        html = context ? handlebars.compile(source)(context) : handlebars.compile(source)();
    container.innerHTML = html;
    return container;
}


var output = function (polygon) {

    var menu = document.getElementById('menu');
    changeTemplate('outputform', test_context, menu);
    menu.classList.add('show');
    document.getElementById('delete').addEventListener('click', function () {
        polygon.setMap(null);
        polygon = null;
        menu.classList.remove('show');
    });

    document.getElementById('edit').addEventListener('click', function () {

        edit();

    });
}

module.exports = output;