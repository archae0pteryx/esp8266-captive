const signupBtn = document.getElementById('signup-btn')
const signupMessage = document.getElementById('signup-message')
const signupLink = document.getElementById("signup-link")

const loginBtn = document.getElementById('login-btn')
const loginMessage = document.getElementById('login-message')
const loginLink = document.getElementById("login-link")

signupLink.addEventListener('click', () => {
    loginBtn.style.display = 'none'
    signupMessage.style.display = 'none'

    signupBtn.style.display = 'flex'
    loginMessage.style.display = 'flex'
})


loginBtn.addEventListener('click', () => {
    loginBtn.style.display = 'flex'
    signupMessage.style.display = 'flex'

    signupBtn.style.display = 'none'
    loginMessage.style.display = 'none'
})