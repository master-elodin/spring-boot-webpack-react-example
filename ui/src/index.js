require('./styles/styles.scss');

var jQuery = require("jquery-ajax");

jQuery.ajax({
    url: './greeting',
    method: 'GET'
}).then((data) => {
    var element = document.createElement('div');
    
    element.innerHTML = `<h2 class='initial-message'>I've received the following message from the server:</h2><br/><h2 class='server-message'>${data}</h2>`;

    document.body.appendChild(element);
});
