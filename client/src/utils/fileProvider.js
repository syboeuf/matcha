import Swal from "sweetalert2"

import { checkEmail, checkPassword, checkAge } from "utils/utils"

const optionsFetch = (dataBody) => {
    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(dataBody),
    }
    return options
}

const transformArrayInObject = (array) => {
    let dataObject = {}
    array.forEach((data) => {
        dataObject = {
            ...dataObject,
            [data.name]: data.value,
        }
    })
    return dataObject
}

export const verifyKey = (key) => {
    return fetch("http://localhost:4000/verifyKey", optionsFetch({ key }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const verifyKeyForgot = (key) => {
    return fetch("http://localhost:4000/verifyKeyForgot", optionsFetch({ key }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getUserProfil = (id, profilName) => {
    return fetch("http://localhost:4000/users/getUserProfil", optionsFetch({ id, profilName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getAllProfilName = (id) => {
    return fetch("http://localhost:4000/users/findUser", optionsFetch({ id }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const banUser = (username, bantime) => {
    fetch(`http://localhost:4000/users/ban`, optionsFetch({ username, bantime }))
}

export const getPicturesUser = (userId) => {
    return fetch(`http://localhost:4000/users/picturesUser`, optionsFetch({ userId }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getImageProfil = (id) => {
    return fetch("http://localhost:4000/users/getImageProfil", optionsFetch({ id }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const addNewUser = (newUser) => {
    const userData = { ...transformArrayInObject(newUser) }
    checkUserAlreadyExist(userData)
        .then((userExist) => {
            if (userExist === 0) {
                if (!checkEmail(userData.email)) {
                    Swal.fire(
                        'Error',
                        'The email you entered is invalid',
                        'error'
                    )
                } else if (!checkPassword(userData.password)) {
                    Swal.fire(
                        'Error',
                        'Please choose a most secure password',
                        'error'
                    )
                } else if (!checkAge(userData.age)) {
                    Swal.fire(
                        'Error',
                        'You must be at least 18 years old',
                        'error'
                    )
                } else {
                    const confirmKey = Math.floor(Math.random() * 10000000000000)
                    fetch(`http://localhost:4000/users/add`, optionsFetch({
                        name: userData.userName,
                        password: userData.password,
                        email: userData.email,
                        lastName: userData.lastName,
                        firstName: userData.firstName,
                        age: userData.age,
                        confirmKey,
                    }))
                    Swal.fire(
                        'A mail has been sent',
                        'Please check your inbox and follow the link to confirm your account',
                        'success'
                    )
                }
            } else {
                Swal.fire(
                    'Error',
                    'Email or username already in use, sorry',
                    'error'
                )
            }
        })
}

export const checkLogIn = (inputArray) => {
    const name = inputArray[0].value
    const password = inputArray[1].value
    return fetch("http://localhost:4000/users/checkLogin", optionsFetch({ name, password }))
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.dataUser === undefined) {
                return undefined
            }
            return responseJson.dataUser[0]
        })
        .catch((error) => alert(error))
}

export const verifyPassword = (name, password) => {
    return fetch("http://localhost:4000/users/verifyPassword", optionsFetch({ name, password }))
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export const checkKey = (name, key) => {
    return fetch(`http://localhost:4000/users/confirmIdendity`, optionsFetch({ key, name }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

const checkUserAlreadyExist = (dataNewUser) => {
    const { userName, email } = dataNewUser
    return fetch("http://localhost:4000/users/checkUserAlreadyExist", optionsFetch({ userName, email }))
        .then((response) => response.text())
        .then((responseText) => (responseText === "1") ? 1 : 0)
        .catch((error) => console.log(error))
}

export const findEmail = (email) => {
    return fetch("http://localhost:4000/users/findEmail", optionsFetch({ email }))
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.result === true) {
                Swal.fire(
                    'A mail has been sent',
                    'Please check your inbox and follow the instructions to reset your password',
                    'success'
                )
                return 1
            }
            Swal.fire(
                'Sorry',
                'This email doesn\'t exist',
                'error'
            )
            return 0
        })
        .catch((error) => console.log(error))
}

export const recoverPassword = (newPassword, key) => {
    fetch(`http://localhost:4000/users/recoverPassword`, optionsFetch({ password: newPassword, key }))
}

export const updateInfosProfil = (id, previousUserName, dataArray) => {
    const infosProfilUser = { id, previousUserName, ...dataArray }
    const { email, newPassword } = infosProfilUser
    if (!checkEmail(email)) {
        return new Promise((resolve) => resolve(2))
    } else if (!checkPassword(newPassword)) {
        return new Promise((resolve) => resolve(3))
    } else {
        return fetch("http://localhost:4000/users/updateInfosProfil", optionsFetch(infosProfilUser))
            .then((response) => response.text())
            .then((responseText) => (responseText === "1") ? 1 : 0)
            .catch((error) => console.log(error))
    }
}

export const updateInfosPersonal = (infosPersonal) => {
    fetch("http://localhost:4000/users/updateInfosPersonal", optionsFetch(infosPersonal))
}

export const insertMatch = (user, profilName) => {
    fetch("http://localhost:4000/users/profilMatch", optionsFetch({ user, profilName }))
}

export const deleteMatch = (user, profilName) => {
    fetch("http://localhost:4000/users/deleteMatch", optionsFetch({ user, profilName }))
}

export const blockList = (userName, orientation, limit) => {
    return fetch("http://localhost:4000/users/listBlockProfil", optionsFetch({ userName, orientation, limit }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const recommended = (userName, orientation, age) => {
    return fetch("http://localhost:4000/users/recommended", optionsFetch({ userName, orientation, age }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getBlockList = (userName) => {
    return fetch("http://localhost:4000/users/getBlockList", optionsFetch({ userName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getAllOtherDataOfProfil = (userName, profilName) => {
    return fetch("http://localhost:4000/users/getAllOtherDataOfProfil", optionsFetch({ userName, profilName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const blockProfil = (userName, profilBlock) => {
    fetch("http://localhost:4000/users/blockProfil", optionsFetch({ userName, profilBlock }))
} 

export const checkBlock = (firstUser, scndUser) => {
    return fetch("http://localhost:4000/users/checkBlock", optionsFetch({ firstUser, scndUser }))
        .then((res) => res.json())
        .then((resJson) => resJson)
        .catch((error) => console.log(error))
}

export const deblockUser = (userName, userDeblocked) => {
    return fetch("http://localhost:4000/users/deblockUser", optionsFetch({ userName, userDeblocked }))
}

export const getListMatch = (userName) => {
    return fetch("http://localhost:4000/users/getListMatch", optionsFetch({ userName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const checkLike = (currUser, userProfile) => {
    return fetch("http://localhost:4000/users/checkLike", optionsFetch({ currUser, userProfile }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const getAllMessages = (userName, profilMatchName) => {
    return fetch("http://localhost:4000/users/getAllMessages", optionsFetch({ userName, profilMatchName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error)
}

export const getNotificationsNoRead = (userName, limit) => {
    return fetch("http://localhost:4000/users/getNotificationsNoRead", optionsFetch({ userName, limit }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const updateNotificationsToRead = (userName) => {
    return fetch("http://localhost:4000/users/updateNotificationsToRead", optionsFetch({ userName }))
}

export const reportingFakeProfil = (profilName) => {
    fetch("http://localhost:4000/users/reportingFakeProfil", optionsFetch({ profilName }))
}

export const getPopularScoreOfProfil = (profilName) => {
    fetch("http://localhost:4000/users/showPopulareScore", optionsFetch({ profilName }))
}

export const setLocation = (userName, dataAddress) => {
    return fetch("http://localhost:4000/users/getUserLocation", optionsFetch({
        userName,
        coords: dataAddress.coords,
        userAddress: dataAddress.address,
    }))
}

export const setNewLocation = (userName, coords, userAddress) => {
    fetch("http://localhost:4000/users/getUserLocation", optionsFetch({ userName, coords, userAddress }))
}

export const getLocation = () => {
    const geolocation = navigator.geolocation
    const getLocation = new Promise((resolve, reject) => {
        if (!geolocation) {
            console.log("Not supported !")
        }
        geolocation.getCurrentPosition((position) => {
            resolve(position)
        }, () => {
            reject (null)
        })
    })
    return getLocation
}

export const setLocationToNull = (userName) => {
    return fetch("http://localhost:4000/users/setLocationToNull", optionsFetch({ userName }))
}

export const getUserApproximateLocation = (userName) => {
    return fetch("http://localhost:4000/users/getUserApproximateLocation", optionsFetch({ userName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const calculDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0
    } else {
        const radLat1 = Math.PI * lat1 / 180
        const radLat2 = Math.PI * lat2 / 180
        const theta = lon1 - lon2
        const radTheta = Math.PI * theta / 180
        let distance = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)
        if (distance > 1) {
            distance = 1
        }
        distance = Math.acos(distance)
        distance = distance * 180 / Math.PI
        distance = distance * 60 * 1.1515
        distance = distance * 1.609344
        return distance
    }
}

export const getDataFromCookie = () => {
    return fetch("http://localhost:4000/cookieDataUser", {
        credentials: "include",
        method: "POST",
    })
        .then((response) => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log(error))
}

export const getDataPeople = () => {
    return fetch("http://localhost:4000/dataForMap", { method: "POST", credentials: "include" })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}

export const deleteCookie = () => {
    fetch("http://localhost:4000/deleteCookie", {
        credentials: "include",
        method: "POST",
    })
}

export const getListPersonLikeYou = (userName) => {
    return fetch("http://localhost:4000/users/getListPersonLikeYou", optionsFetch({ userName }))
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.log(error))
}
