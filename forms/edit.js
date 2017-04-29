/**
 * Created by exaveb on 27.04.2017.
 */

var  handlebars = require('handlebars');

function changeTemplate(template, context, container) {
    var source = document.getElementById(template).innerHTML,
        html = context ? handlebars.compile(source)(context) : handlebars.compile(source)();
    container.innerHTML = html;
    return container;
}







 var edit = function () {

    var menu = document.getElementById('menu');
    changeTemplate('editform', null, menu);
    menu.classList.add('show');


    document.getElementById('edit-ok').addEventListener('click', function () {
        menu.classList.remove('show');
        changeTemplate('outputform', test_context, menu);

    })

    document.getElementById('edit-cancel').addEventListener('click', function () {
        menu.classList.remove('show');
        changeTemplate('outputform', test_context, menu);
    })

};

module.exports = edit;




