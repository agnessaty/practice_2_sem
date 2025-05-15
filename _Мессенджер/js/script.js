const host = `http://api-messenger.web-srv.local`;
const content = document.querySelector('.content');
var token = "";


function _post (params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', params.url);
    xhr.send();
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

_post({url: '/modules/registration.html'}, function(response) {
    content.innerHTML = response;
    LoadPageChats()
    LoadPageAuth()
})

function LoadPageChats() {
    document.querySelector('.register').addEventListener('click', function () {
        let edata = new FormData();
        edata.append('fam', document.querySelector('input[name="fam"]').value)
        edata.append('name', document.querySelector('input[name="name"]').value)
        edata.append('otch', document.querySelector('input[name="otch"]').value)
        edata.append('email', document.querySelector('input[name="email"]').value)
        edata.append('pass', document.querySelector('input[name="pass"]').value)
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${host}/user/`);
        xhr.send(edata);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    OnLoadPageChats()
                } if (xhr.status == 422) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
                
        }
    })
}

function OnLoadPageChats() {
    _post({url: '/modules/chats.html'}, function(response) {
    content.innerHTML = response;
})
}

function LoadPageAuth() {
    document.querySelector('.authorize').addEventListener('click', function() {
        _post({url: '/modules/auth.html'}, function(response) {
        content.innerHTML = response;
        LoadPageChatAuth()
        
    })
}
)}

function LoadPageChatAuth() {
    document.querySelector('.auth').addEventListener('click', function () {
        let fdata = new FormData();
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${host}/auth/`);
        xhr.send(fdata);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    OnLoadPageChats()
                } if (xhr.status == 401) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
                
            
        }
    })
}
