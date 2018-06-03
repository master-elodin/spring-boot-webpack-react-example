$.ajax({
    url: '/greeting',
    method: 'GET'
}).then((data) => {
    var element = document.createElement('div');
    
    element.innerHTML = "Hello world! I've received the following message from the server: " + data;

    document.body.appendChild(element);
});
