const host = `http://api-messenger.web-srv.local`;
const content = document.querySelector('.content');

function _post(params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', params.url);
    xhr.send(params.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
}

LoadpageReg()
function LoadpageReg() {
    _post({url: '/modules/reg.html'}, function(response) {
    content.innerHTML = response;
    LoadPageAuth()
    OnLoadPageChat()
})
}


function LoadPageAuth() {
    document.querySelector('.authorize').addEventListener('click', function PageAuth() {
        _post({url: '/modules/auth.html'}, function(response) {
            content.innerHTML = response;
            LoadPageRegAuth()
            OnLoadPageChatAuth()
        })
    })
}

function LoadPageRegAuth() {
    document.querySelector('.reg').addEventListener('click', LoadpageReg)
}

function LoadPageChat() {
    _post({url: '/modules/chat.html'}, function(response) {
    content.innerHTML = response;
})
}

function OnLoadPageChat() {
    document.querySelector('.register').addEventListener('click', function() {
        let fdata = new FormData()
        fdata.append('fam', document.querySelector('input[name="fam"]').value)
        fdata.append('name', document.querySelector('input[name="name"]').value)
        fdata.append('otch', document.querySelector('input[name="otch"]').value)
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)

        _post({url: `${host}/user/`, data: fdata}, function(response) {
            response = JSON.parse(response)
            if(response.success) {
                LoadPageChat()
            } else {
                alert(response.message)
            }
        })
    })
}

function OnLoadPageChatAuth() {
    document.querySelector('.auth').addEventListener('click', function() {
        let edata = new FormData()
        edata.append('email', document.querySelector('input[name="email"]').value)
        edata.append('pass', document.querySelector('input[name="pass"]').value)

        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${host}/auth/`)
        xhr.send(edata)
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                LoadPageChat()
                } if(xhr.status == 401) {
                let response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
            }
            
        }
    })
}

/* _post({url: `${host}/auth/`, data: edata}, function(response) {
            response = JSON.parse(response)
            if(response.success) {
                LoadPageChat()
            } else {
                alert(response.message)
            }
        })
*/

/*let xhr = new XMLHttpRequest();
xhr.open('POST', `${host}/auth/`)
xhr.send(edata)
xhr.onreadystatechange = function() {
    if(xhr.status == 200) {
        LoadPageChat()
    } if(xhr.status == 401) {
        let response = JSON.parse(xhr.responseText)
        alert(response.message)
    }
}*/