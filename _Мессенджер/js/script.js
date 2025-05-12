const host = `http://api-messenger.web-srv.local`;
const content = document.querySelector('.content');


function _post (params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', params.url);
    xhr.send(params.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
}

function _get (params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', params.url);
    xhr.send(params.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
}

_post({url: '/modules/registration.html'}, function(response) {
    content.innerHTML = response;
    LoadPageChats()
})

function LoadPageChats() {
    document.querySelector('.register').addEventListener('click', function () {
        let fdata = new FormData();
        fdata.append('fam', document.querySelector('input[name="fam"]').value)
        fdata.append('name', document.querySelector('input[name="name"]').value)
        fdata.append('otch', document.querySelector('input[name="otch"]').value)
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)

        _post({url: `${host}/user`, data: fdata}, function(response){
            response = JSON.parse(response);
            if (response.success) {
                OnLoadPageChats()
            }
            else {
                alert('Login Failed')
            }
        })
    })
}

function OnLoadPageChats() {
    _post({url: '/modules/chats.html'}, function(response) {
    content.innerHTML = response;
})
}