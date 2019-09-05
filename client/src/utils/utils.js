export const checkEmail = (addressEmail) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    return regexEmail.test(addressEmail)
}

export const checkPassword = (password) => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/
    return regexPassword.test(password)
}

export const checkAge = (age) => {
    if (parseInt(age) < 18) {
        return false
    } else {
        return true
    }
}

export const uniqueId = () => {
    return `${Date.now()}${Math.floor(Math.random() * 10000)}`
}
