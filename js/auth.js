// ----------------------------------------------------------------------------
// AUTH0_CONFIG
//
// Informar configurações obtidas ao criar um client na plataforma Auth0.
// https://auth0.com/
// ----------------------------------------------------------------------------
var AUTH0_CONFIG = {
    domain: "dev-yxyi151pqcfxxapg.us.auth0.com", // <-- TODO informar "domain"
    clientId: "sjSRA8j6ExBe3AnWBksCWRRncOvJscrC", // <-- TODO informar "clientId"
    cacheLocation: "localstorage",
    useRefreshTokens: true
}


// ----------------------------------------------------------------------------
// getAuth0Client
//
// Função que retorna uma Promise com um objeto auth0Client que dispõe
// dos métodos necessários para operações relacionadas a autenticação.
//
// Esta função assume que o objeto auth0 esteja disponível no escopo global
// da aplicação. Para isto, garanta que o script
// https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js
// tenha sido importado previamente.
//
// Esta função utiliza o escopo global para disponibilizar o objeto auth0Client
// de forma eficiente em chamadas consecutivas, entretanto deve-se sempre obter
// o objeto auth0Client através da chamada desta função e não diretamente do
// escopo global.
//
// Retorna uma Promise com auth0Client.
// ----------------------------------------------------------------------------
function getAuth0Client() {
    if (window.auth0Client) return Promise.resolve(window.auth0Client)
    return auth0
        .createAuth0Client(AUTH0_CONFIG)
        .then(function (client) {
            window.auth0Client = client
            return client
        })
}


// ----------------------------------------------------------------------------
// login
//
// Função que realiza login com a estratégia de redirecionamento. Ou seja,
// o navegador é direcionado para a página de autenticação disponível na
// plataforma Auth0, e então, após o login, a plataforma redireciona de volta
// para a aplicação, informando dados da autenticação via query string.
// Para completar o processo de autenticação, ao receber o redirecionamento da
// plataforma é necessário acionar a função "handleRedirectCallback"
// definida e documentada abaixo.
//
// Não retorna valores.
// ----------------------------------------------------------------------------
function login() {
    var options = {
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }
    getAuth0Client()
        .then(function (auth0Client) {
            return auth0Client.loginWithRedirect(options)
        })
        .catch(function (error) {
            console.log("login failed:", error)
        })
}


// ----------------------------------------------------------------------------
// logout
//
// Função que realiza logout com a estratégia de redirecionamento. Ou seja,
// o navegador é direcionado para a página da plataforma Auth0 requisitando
// logout. A plataforma realiza o logout e direciona o navegador de volta
// à aplicação.
//
// Não retorna valores.
// ----------------------------------------------------------------------------
function logout() {
    var options = {
        logoutParams: {
            returnTo: window.location.origin
        }
    }
    getAuth0Client()
        .then(function (auth0Client) {
            return auth0Client.logout(options)
        })
        .catch(function (error) {
            console.log("logout failed:", error)
        })
}


// ----------------------------------------------------------------------------
// handleRedirectCallback
//
// Função responsável pela última etapa do processo de login por
// redirecionamento, iniciado pela função "login".
// Para identificar se o navegador está recebendo um redirecionamento da
// plataforma Auth0, é verificado se existem dados para "code" e "state" na
// url. Caso exista, entende-se que trata-se do recebimento de um
// redirecionamento. Com isto, obtém-se o client Auth0 e solicita-se que
// trate estas informações. Isto completa a autenticação.
//
// Retorna Promise com o resultado do tratamento do redirecionamento.
// ----------------------------------------------------------------------------
function handleRedirectCallback() {
    var query = window.location.search
    var isRedirect = query.includes("code=") && query.includes("state=")
    if (!isRedirect) return Promise.resolve()
    return getAuth0Client().then(function (auth0Client) {
        return auth0Client.handleRedirectCallback()
    })
}


// ----------------------------------------------------------------------------
// getUser
//
// Função criada para simplificar o acesso à função "getUser" do client Auth0.
//
// Retorna Promise de objeto com dados do usuário autenticado.
// ----------------------------------------------------------------------------
function getUser() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.getUser() })
}


// ----------------------------------------------------------------------------
// getUser
//
// Função criada para simplificar o acesso à função "isAuthenticated"
// do client Auth0.
//
// Retorna Promise com dado boleano, informando se há autenticação ou não.
// ----------------------------------------------------------------------------
function isAuthenticated() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.isAuthenticated() })
}


// ----------------------------------------------------------------------------
// getJwt
//
// Função criada para simplificar o acesso ao token JWT associado ao usuário
// autenticado.
//
// Retorna Promise com token JWT.
// ----------------------------------------------------------------------------
function getJwt() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.getIdTokenClaims() })
        .then(function (claims) { return claims.__raw })
}