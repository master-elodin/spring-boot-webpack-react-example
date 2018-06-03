var jQuery = require("jquery-ajax");

jQuery.ajax({
    url: './greeting',
    method: 'GET'
}).then((data) => {
    var element = document.createElement('div');
    
    element.innerHTML = `<h2>I've received the following message from the server:</h2><br/><h2 style='font-family: monospace'>${data}</h2>`;

    document.body.appendChild(element);
});
