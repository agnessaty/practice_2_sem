const host = `http://api-messenger.web-srv.local`;
const content = document.querySelector('.content');
const token = "";


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
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
}

_post({url: '/modules/chats.html'}, function(response) {
    content.innerHTML = response;
    LoadPageChats()
})

function LoadPageChats() {
    document.querySelector('.register').addEventListener('click', function () {
        let edata = new FormData();
        edata.append('fam', document.querySelector('input[name="fam"]').value)
        edata.append('name', document.querySelector('input[name="name"]').value)
        edata.append('otch', document.querySelector('input[name="otch"]').value)
        edata.append('email', document.querySelector('input[name="email"]').value)
        edata.append('pass', document.querySelector('input[name="pass"]').value)
        
        _post({url: `${host}/user/`, data: edata}, function(response) {
            response = JSON.parse(response)
            if (response.success) {
                token = response.token
                console.log(token)
                OnLoadPageChats()
            } else {
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