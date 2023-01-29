function modify(className, modifier) {
    var elements = document.getElementsByClassName(className)
    for (var i = 0; i < elements.length; i++) {
        modifier(elements[i])
    }
}

function setDisplay(className, show) {
    modify(className, function (element) { element.style.display = show ? "block" : "none" })
}

function setText(className, text) {
    modify(className, function (element) { element.innerText = text })
}

function init() {
    handleRedirectCallback()
        .then(function () { return isAuthenticated() })
        .then(function (authenticated) {
            if (authenticated) window.history.replaceState({}, document.title, "/")
            setDisplay("auth-area", authenticated)
            setDisplay("non-auth-area", !authenticated)
            setDisplay("checking-auth-area", false)
            return authenticated && getUser()
        })
        .then(function (user) { if (user) setText("user-name", user.name) })
        .catch(function (error) {
            console.log("init failed:", error)
            setDisplay("auth-area", false)
            setDisplay("non-auth-area", true)
            setDisplay("checking-auth-area", false)
        })
}

function logJwt(){
    getJwt().then(console.log)
}

var loginButton = document.getElementById("login-button")
var logoutButton = document.getElementById("logout-button")
var getJwtButton = document.getElementById("get-jwt-button")

loginButton.onclick = login
logoutButton.onclick = logout
getJwtButton.onclick = logJwt

window.onload = init