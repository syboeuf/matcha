const mysql = require("mysql")
const bcrypt = require('bcrypt')
const faker = require("faker")
const fs = require("fs")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "input305",
	multipleStatements: true,
})

connection.connect(err => {
	if (err) {
        console.log(err)
		return err
	}
})

const saltRounds = 10
const uniqueId = () => {
    return `${Date.now()}${Math.floor(Math.random() * 10000)}`
}

let createTableMatcha =
`
        CREATE TABLE IF NOT EXISTS fakeuser (
                id int primary key auto_increment,
                fakeUser varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS likeuser (
                id int primary key auto_increment,
                userName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                profilName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                likeUser int(11) NOT NULL DEFAULT '0'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS listblockprofil (
                id int primary key auto_increment,
                user varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                blockProfil varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS messages (
                id int primary key auto_increment,
                fromUser varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
                toUser varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
                message text,
                date datetime DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS notifications (
                id int primary key auto_increment,
                notificationUser varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                notificationType text NOT NULL,
                notificationRead int(11) NOT NULL DEFAULT '0',
                date datetime NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS picturesusers (
                id int primary key auto_increment,
                userId varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                picture longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        CREATE TABLE IF NOT EXISTS profil (
                id int primary key auto_increment,
                userName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                password varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                email varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                lastName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                firstName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                age int(11) DEFAULT NULL,
                lastConnection datetime DEFAULT NULL,
                confirmKey bigint(20) DEFAULT NULL,
                confirmKeyOk int(11) NOT NULL DEFAULT '0',
                keyResetPassword varchar(255) DEFAULT NULL,
				bantime varchar(50) NOT NULL DEFAULT '0',
				admin INT NOT NULL DEFAULT '0'
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        CREATE TABLE IF NOT EXISTS profilmatch (
                id int primary key auto_increment,
                firstPerson varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                secondPerson varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                chatId varchar(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS userinfos (
                id int primary key auto_increment,
                userName varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
                biography text,
                gender text,
                orientation text,
                listInterest text,
                userLocation text,
                userApproximateLocation text,
                userAddress text,
                userApproximateCity text,
                populareScore int(11) NOT NULL DEFAULT '0'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

const suffleArray = (array) => {
	let arrayIsShuffle = []
	let i = 0
	while (i < array.length) {
		const random = Math.floor(Math.random() * (array.length))
		const found = arrayIsShuffle.find(element => element === array[random])
		if (found === undefined) {
			arrayIsShuffle.push(array[random])
			i++
		}
	}
	return arrayIsShuffle
}

const startFaker = () => {
	connection.query("SELECT * FROM profil", (error, results) => {
		if (error) {
			return error
		} else {
			if (results.length < 500) {
				let j = 0
				while (j < 500) {
					bcrypt.hash("Input305", saltRounds, (error, hash) => {
						if (error) {
							return error
						} else {
							let listInterestArray = [
								"#Movie",
								"#Manga",
								"#Sport",
								"#NightParty",
								"#Data Processing",
							]
							const genderArray = ["Male", "Female"]
							const orientationArray = ["Male", "Female", "Bisexual"]
							let listInterestPerson = ""
							const randomTag = Math.floor(Math.random() * 5)
							let i = 0
							listInterestArray = suffleArray(listInterestArray)
							while (i <= randomTag) {
								listInterestPerson += listInterestArray[i]
								i++
							}
							const randomPicture = Math.floor(Math.random() * 5) + 1
							i = 0
							const arrayPicture = []
							while (i < randomPicture) {
								namePicture = uniqueId()
								arrayPicture.push(`${namePicture}.jpg`)
								i++
							}
							const fakeProfil = {
								userName: faker.fake("{{name.firstName}}").replace(/'/g, "\\'") + Math.floor(Math.random() * 100).toString(),
								email: Math.floor(Math.random() * 100).toString() + faker.internet.email().replace(/'/g, "\\'"),
								lastName: faker.fake("{{name.lastName}}").replace(/'/g, "\\'"),
								firstName: faker.fake("{{name.firstName}}").replace(/'/g, "\\'"),
								age: Math.floor(Math.random() * 132) + 18,
								confirmKeyOk: 1,
								biography: faker.lorem.text(),
								gender: genderArray[Math.floor(Math.random() * 2)],
								orientation: orientationArray[Math.floor(Math.random() * 3)],
								listInterest: listInterestPerson,
								userLocation: `${faker.address.latitude()},${faker.address.longitude()}`,
								userApproximateLocation: `${faker.address.latitude()},${faker.address.longitude()}`,
								userAddress: faker.address.streetAddress().replace(/'/g, "\\'"),
								userApproximateCity: faker.address.city().replace(/'/g, "\\'"),
								populareScore: Math.floor(Math.random() * 100),
							}
							let sql = `INSERT INTO profil (userName, password, email, lastName, firstName, age, lastConnection, confirmKeyOk) VALUES ('${fakeProfil.userName}', '${hash}', '${fakeProfil.email}', '${fakeProfil.lastName}', '${fakeProfil.firstName}', ${fakeProfil.age}, NOW(), 1);`
							sql += `INSERT INTO userinfos (userName, biography, gender, orientation, listInterest, userLocation, userApproximateLocation, userAddress, userApproximateCity, populareScore) VALUES ('${fakeProfil.userName}', '${fakeProfil.biography}', '${fakeProfil.gender}', '${fakeProfil.orientation}', '${fakeProfil.listInterest}', '${fakeProfil.userLocation}', '${fakeProfil.userApproximateLocation}', '${fakeProfil.userAddress}', '${fakeProfil.userApproximateCity}', ${fakeProfil.populareScore});`
							for (let i = 0; i < arrayPicture.length; i++) {
								sql += `INSERT INTO picturesusers (userId, picture) VALUES ((SELECT id FROM profil WHERE userName='${fakeProfil.userName}' LIMIT 1), '${arrayPicture[i]}');`
							}
							connection.query(sql, (error, results) => {
								if (error) {
									return error
								} else {
									let i = 0
									while (i < arrayPicture.length) {
										image(faker.image.avatar(), arrayPicture[i], results[0].insertId, i)
										i++
									}
								}
							})
						}
					})
					j++
				}
			}
		}
	})
}

const sqlCreateDatabase = `CREATE DATABASE IF NOT EXISTS matcha`

function startDb () {
    connection.query(sqlCreateDatabase, (error, results) => {
        if (error) {
            console.log("error in creating database", error)
        }
        console.log("databse created")
        connection.changeUser({ database: "matcha" }, (error) => {
            if (error) {
                console.log('error in changing database', err)
                  return
            }
            connection.query(createTableMatcha, (error) => {
                if (error) {
                    console.log("error in creating table", error)
                }
                //io.on(("connection"), SocketManager)
                startFaker()
            })
        })
    })
}

var https = require('https');
const image = (url, namePicture, userId, i) => {
https.get(url, (resp) => {
    resp.setEncoding('base64');
    body = "data:" + resp.headers["content-type"] + ";base64,";
    resp.on('data', (data) => { body += data});
    resp.on('end', () => {
		const pathDir = `../client/public/imageProfil/${userId}`
		fs.existsSync(pathDir, 0777) || fs.mkdirSync(pathDir, 0777)
        fs.writeFile(`${pathDir}/${namePicture}`, body.replace("data:image/jpeg;base64,", ""), "base64", (error) => {
			if (error) {
				return (error)
			}
		})
    })
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`)
})
}

module.exports.query = connection
module.exports.startDb = startDb