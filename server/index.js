const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const nodemailer = require("nodemailer")
const fs = require("fs")
const cookieParser = require("cookie-parser")

const app = express()
const bodyParser = require("body-parser")
const ipInfo = require("ipinfo")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "tpompon",
	port: 3307,
	database: "matcha",
	multipleStatements: true,
})

fs.existsSync("../client/public/imageProfil") || fs.mkdirSync("../client/public/imageProfil", 0777)

const server = require("http").Server(app)
const io = module.exports.io = require("socket.io")(server)
const SocketManager = require("./SocketManager")

io.on(("connection"), SocketManager)

const sendMail = (mail, text, subject) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		secure: false,
		port: 25,
		auth: {
			user: "sylvainboeuf@gmail.com",
			pass: "r84lq27k035",
		},
		tls: {
			rejectUnauthorized: false,
		},
	})
	let helperOptions = {
		from: '"Fred Foo 👻" <foo@example.com>',
		to: mail,
		subject,
		text,
	}
	transporter.sendMail(helperOptions, (error, info) => {
		if (error) {
			return console.log(error)
		}
		console.log("the message was sent")
		console.log(info)
	})
}

const saltRounds = 10

const saveImage = (dataPicture, userId, namePicture) => {
    const pathDir = `../client/public/imageProfil/${userId}`
    fs.existsSync(pathDir, 0777) || fs.mkdirSync(pathDir, 0777)
    if (fs.existsSync(`${pathDir}/${namePicture}`)) {
        console.log("soon")
    } else {
        fs.writeFile(`${pathDir}/${namePicture}`, Buffer.from(dataPicture.split(",")[1], "base64"), (error) => {
        	if (error) {
        	     throw (error)
        	}
        	console.log("save")
        })
    }
}

const uniqueId = () => {
    return `${Date.now()}${Math.floor(Math.random() * 10000)}`
}

const jwtKey = 'my_secret_key'

connection.connect(err => {
    if (err) {
        return err
    }
})

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "5mb" }))
app.use(cookieParser())

app.get("/", (req, res) => {
        res.send("hello from the products server")
})

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
                confirmKey bigint(20) NOT NULL,
                confirmKeyOk int(11) NOT NULL DEFAULT '0',
                keyResetPassword varchar(255) DEFAULT NULL,
                bantime varchar(50) NOT NULL DEFAULT '0'
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
/*
connection.query(createTableMatcha, (error, results) => {
        if (error) {
                console.log(error)
        } else {
                console.log(results)
        }
})
*/

app.get("/cookieDataUser", (req, res) => {
	// We can obtain the session token from the requests cookies, which come with every request
	let cookiesArray = req.headers.cookie
	let list = {}
	if (cookiesArray === undefined) {
		return res.json({ dataUser: undefined })
	}
	cookiesArray.split(";").forEach((cookie) => {
		const parts = cookie.split("=")
		list[parts.shift().trim()] = decodeURI(parts.join('='))
	})
	// if the cookie is not set, return an unauthorized error
	const token = list.token
    let payload
    try {
      // Parse the JWT string and store the result in `payload`.
      // Note that we are passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match
      payload = jwt.verify(token, jwtKey)
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.json({ dataUser: undefined })
          }
        	// otherwise, return a bad request error
            return res.status(400).end()
        }
    // Finally, return the welcome message to the user, along with their
    // username given in the token
	let sql = `SELECT p.*, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${payload.name}';`
	sql += `SELECT p.id, p.userId, p.picture FROM picturesusers p INNER JOIN profil ON p.userId=profil.id WHERE profil.userName='${payload.name}'`
	connection.query(sql, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				return res.json({ dataUser: results })
			} else {
				return res.json({ dataUser: 0 })
			}
		}
	})
})

app.get("/deleteCookie", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	res.clearCookie("token")
    return res.send("")
})

app.post("/users", (req, res) => {
	const { userName } = req.body
	const selectAllProfil = `SELECT p.*, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName=${userName}`
	connection.query(selectAllProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ data: results })
		}
	})
})

app.get("/dataForMap", /*async*/(req, res) => {
	//const result = await verifyToken(req)
	//if (result === false) {
	//	return
	//}
	const dataPeople = `SELECT p.*, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore, i.picture FROM profil p INNER JOIN userinfos u ON p.userName=u.userName INNER JOIN picturesusers i ON p.id=i.userId GROUP BY (p.id)`
	connection.query(dataPeople, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				return res.json({ dataPeople: results })
			}
		}
	})
})

app.post("/users/checkLogin", (req, res) => {
	const { name, password } = req.body
	const checkLogin = `SELECT * FROM profil WHERE (userName, confirmKeyOk) IN (('${name}', 1))`
	connection.query(checkLogin, async(error, results) => {
			if (error) {
				return res.send(error)
			} else {
				const date = Math.floor(Date.now() / 1000)
				if (results.length > 0) {
					const match = await bcrypt.compare(password, results[0].password)
					if (match) {
						if (date > results[0].bantime || results[0].bantime === 0) {
							const token = jwt.sign({ name, hashPassword: results[0].password }, jwtKey, {
								algorithm: "HS256",
								expiresIn: "24h",
							})
							res.cookie("token", token)
							const getDataUser = `SELECT p.*, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${name}'`
							connection.query(getDataUser, (error, results) => {
							if (error) {
								return res.send(error)
							} else {
								return res.json({ dataUser: results })
							}
						})
					} else {
						return res.json({ dataUser: undefined })	
					}
				} else {
					return res.json({ dataUser: undefined })
				}
			} else {
				return res.json({ dataUser: undefined })
			}
		}
	})
})


app.post("/verifyKey", (req, res) => {
	const { key } = req.body
	const query = `SELECT * FROM profil WHERE confirmKey = '${key}'`
	connection.query(query, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			if (results.length > 0) {
				const sql = `UPDATE profil SET confirmKeyOk = 1, confirmKey=NULL WHERE confirmKey = '${key}'`
				connection.query(sql, (err, results) => {
					if (err) {
						return res.send(err)
					} else {
						res.json({ success: true, data: results })
					}
				})
			} else {
				return res.json({ success: false })
			}
		}
	})
})

app.post("/verifyKeyForgot", (req, res) => {
	const { key } = req.body
	const query = `SELECT * FROM profil WHERE keyResetPassword = '${key}'`
	connection.query(query, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			if (results.length > 0) {
				return res.json({ success: true, user: results[0] })
			} else {
				return res.json({ success: false })
			}
		}
	})
})

app.post("/users/verifyPassword", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { name, password } = req.body
	const checkLogin = `SELECT * FROM profil WHERE (userName, confirmKeyOk) IN (('${name}', 1))`
	connection.query(checkLogin, async(error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				const match = bcrypt.compare(password, results[0].password)
				if (match) {
					return res.json({ success: 1 })
				} else {
					return res.json({ success: 0 })
				}
			} else {
				return res.json({ success: 0 })
			}
		}
	})
})

app.post("/users/ban", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { username, bantime } = req.body
	const setBantime = `UPDATE profil SET bantime='${bantime}' WHERE userName='${username}'`
	connection.query(setBantime, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send(`Bantime updated`)
		}
	})
})

app.post("/users/getUserProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { id, profilName } = req.body
	let selectDataProfil = `SELECT p.*, DATE_FORMAT(p.lastConnection, "%m-%d-%y %H:%i:%s") AS date, u.biography, u.listInterest, u.gender, u.orientation, u.userAddress, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.id=${id};`
	selectDataProfil += `SELECT likeUser FROM likeuser l INNER JOIN profil p WHERE l.profilName='${profilName}' AND l.userName=p.userName AND p.id=${id};`
	selectDataProfil += `SELECT fakeUser FROM fakeuser INNER JOIN profil WHERE fakeuser.fakeUser=profil.userName AND profil.id=${id};`
	connection.query(selectDataProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			let data = results[0]
			if (results[1].length > 0) {
				data = [{ ...data[0], ...results[1][0] }]
			}
			data = [{ ...data[0], ...results[2][0] }]
			return res.json({ data })
		}
	})
})

app.post("/users/picturesUser", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userId } = req.body
	const selectPictureUsers = `SELECT * FROM picturesusers WHERE userId='${userId}'`
	connection.query(selectPictureUsers, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ pictures: results })
		}             
	})
})

app.post("/users/add", (req, res) => {
	const {
		name, password, email, lastName, firstName, confirmKey,
	} = req.body
	bcrypt.hash(password, saltRounds, function(err, hash) {
		let insertUserIntoBdd = `INSERT INTO profil (userName, password, email, lastname, firstname, confirmKey)
		VALUES('${name}', '${hash}', '${email}', '${lastName}', '${firstName}', ${confirmKey});`
		insertUserIntoBdd += `INSERT INTO userinfos (userName, gender, orientation) VALUES ('${name}', 'Male', 'Bisexuelle')`
		connection.query(insertUserIntoBdd, (error, results) => {
			if (error) {
				return res.send(error)
			} else {
				const text = `Please follow this link to confirm your account: http://localhost:3000/confirm/${confirmKey}`
				const subject = "Confirm you key"
				sendMail(email, text, subject)
				return res.send("added user")
			}
		})
	});
})

app.post("/users/checkUserAlreadyExist", (req, res) => {
	const { userName, email } = req.body
	const checkUserAlreadyExist = `SELECT * FROM profil WHERE userName='${userName}' OR email='${email}'`
	connection.query(checkUserAlreadyExist, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				return res.send("1")
			}  else {
				return res.send("0")
			}
		}
	})
})

app.post("/users/editProfil/sendPictures", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return
	}
	const {
		dataPicture, userId, id, requestId, namePicture,
	} = req.body
	saveImage(dataPicture, userId, namePicture)
	const sendDataPictureToBdd = (requestId)
		? `UPDATE picturesusers SET id='${id}', picture='${namePicture}' WHERE id='${id}'`
		: `INSERT INTO picturesusers (userId, picture) VALUES ('${userId}', '${namePicture}')`
	connection.query(sendDataPictureToBdd, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("picture add")
		}
	})
})

app.post("/users/findEmail", (req, res) => {
	const { email } = req.body
	const findEmail = `SELECT email from profil WHERE email='${email}'`
	connection.query(findEmail, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				const key = uniqueId()
				const text = `Follow this link to reset your password: http://localhost:3000/forgot/${key}`
				const subject = "Key to reset your password"
				const setKeyResetPassword = `UPDATE profil SET keyResetPassword='${key}' WHERE email='${email}'`
				connection.query(setKeyResetPassword, (error, results) => {
					if (error) {
						return res.send(error)
					} else {
						sendMail(email, text, subject)
						return res.json({ "result": true })
					}
				})
			} else {
				return res.json({ "result": false })
			}
		}
	})
})

app.post("/users/recoverPassword", (req, res) => {
	const { password, key } = req.body
	bcrypt.hash(password, saltRounds, (error, hash) => {
		if (error) {
			return res.send(error)
		}
		let updatePassword = `UPDATE profil SET password='${hash}' WHERE keyResetPassword='${key}';`
		updatePassword += `UPDATE profil SET keyResetPassword=NULL WHERE keyResetPassword='${key}';`
		connection.query(updatePassword, (error, results) => {
			if (error) {
				return res.send(error)
			} else {
				return res.send(`profil is confirmed`)
			}
		})
	})
})

app.post("/users/confirmIdendity", (req, res) => {
	const { key, name } = req.body
	const checkKey = `SELECT * FROM profil WHERE (userName, confirmKey) IN (('${name}', ${key}))`
	connection.query(checkKey, (error, results) => {
		if (error) {
				return res.send(error)
		} else {
			if (results.length > 0) {
				let updateConfirmKeyOk = `UPDATE profil SET confirmKeyOk=1 WHERE (userName, confirmKey) IN (('${name}', ${key}));`
				updateConfirmKeyOk += `SELECT p.*, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${name}';`
				connection.query(updateConfirmKeyOk, (error, results) => {
					if (error) {
						return res.send(error)
					} else {
						const token = jwt.sign({ name: results[2][0].userName, hashPassword: results[2][0].password }, jwtKey, {
							algorithm: "HS256",
							expiresIn: "1h",
						})
						res.cookie("token", token)
						return res.json({ dataUser: results[2][0] })
					}
				})
			} else {
				return res.json({ results: false })
			}
		}
	})
})

app.post("/users/updateInfosProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const {
			id, userName, newPassword, email, firstName, lastName, previousUserName, age,
	} = req.body
	const checkIfUserAlreadyExist = `SELECT * FROM profil WHERE id<>${id} AND (userName='${userName}' OR email='${email}')`
	connection.query(checkIfUserAlreadyExist, async(error, results) => {
		if (error) {
			return res.send(error)
		} else {
			console.log(results)
			const match = await bcrypt.compare(newPassword, results[0].password)
			if (match) {
				if (results.length > 0) {
					return res.send("0")
				} else {
					let updateDataUser = `UPDATE profil SET userName='${userName}', password='${newPassword}', email='${email}', firstName='${firstName}', lastName='${lastName}', age='${age}' WHERE id=${id};`
					updateDataUser += `UPDATE userinfos SET userName='${userName}' WHERE userName='${previousUserName}';`
					updateDataUser += `UPDATE profilmatch SET firstPerson='${userName}' WHERE firstPerson='${previousUserName}';`
					updateDataUser += `UPDATE profilmatch SET secondPerson='${userName}' WHERE secondPerson='${previousUserName}';`
					updateDataUser += `UPDATE notifications SET notificationUser='${userName}' WHERE notificationUser='${previousUserName}';`
					updateDataUser += `UPDATE messages SET fromUser='${userName}' WHERE fromUser='${previousUserName}';`
					updateDataUser += `UPDATE messages SET toUser='${userName}' WHERE toUser='${previousUserName}';`
					updateDataUser += `UPDATE listblockprofil SET user='${userName}' WHERE user='${previousUserName}';`
					updateDataUser += `UPDATE likeuser SET userName='${userName}' WHERE userName='${previousUserName}';`
					updateDataUser += `UPDATE likeuser SET profilName='${userName}' WHERE profilName='${previousUserName}';`
					updateDataUser += `UPDATE fakeuser SET fakeUser='${userName}' WHERE fakeUser='${previousUserName}';`
					connection.query(updateDataUser, (error, results) => {
						if (error) {
							return res.send(error)
						} else {
							res.clearCookie("token")
							const token = jwt.sign({ name: userName, hashPassword: newPassword }, jwtKey, {
								algorithm: "HS256",
								expiresIn: "24h",
							})
							res.cookie("token", token)
							return res.send("1")
						}
					})
				}
			}
		}
	})
})

app.post("/users/updateInfosPersonal", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const {
			orientation, gender, biography, listInterest, userName,
	} = req.body
	const text = (biography === null) ? "" : biography
	const interest = (listInterest === null) ? "" : listInterest
	const updateUserInfos = `UPDATE userinfos SET orientation='${orientation}', gender='${gender}', biography='${text.replace(/'/g, "\\'")}', listInterest='${interest}' WHERE userName='${userName}'`
	connection.query(updateUserInfos, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send(`${userName} personal infos is modified`)
		}
	})
})

app.post("/users/getImageProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { id } = req.body
	const getImageProfil = `SELECT picture from picturesusers WHERE userId=${id} LIMIT 1`
	connection.query(getImageProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ imageProfil: results })
		}
	})
})

app.post("/users/profilmatch", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { user, profilName } = req.body
	const insertMatch = `INSERT INTO profilmatch (firstPerson, secondPerson, chatId) VALUES ('${user}', '${profilName}', '${uniqueId()}')`
	connection.query(insertMatch, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("success insert")
		}
	})
})

app.post("/users/deleteMatch", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { user, profilName } = req.body
	const deleteMatch = `DELETE FROM profilmatch WHERE (firstPerson='${user}' AND secondPerson='${profilName}') OR (firstPerson='${profilName}' AND secondPerson='${user}');`
	connection.query(deleteMatch, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("match delete")
		}
	})
})

app.post("/users/listBlockProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, orientation, limit } = req.body
	const listBlock = `SELECT p.*, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.userLocation, u.userApproximateLocation, u.populareScore, picturesusers.picture FROM profil p INNER JOIN userinfos u ON p.userName=u.userName INNER JOIN picturesusers ON picturesusers.userId=p.id WHERE p.userName NOT IN (SELECT blockProfil FROM listblockprofil WHERE user='${userName}') AND p.userName<>'${userName}' ${(orientation !== "Bisexuelle") ? `AND u.gender='${orientation}'` : ""} GROUP BY p.id LIMIT ${limit}`
	connection.query(listBlock, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ blockList: results })
		}
	})
})

app.post("/users/recommended", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, orientation, age } = req.body
	const query = `SELECT p.*, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.userLocation, u.userApproximateLocation, u.populareScore, picturesusers.picture FROM profil p INNER JOIN userinfos u ON p.userName=u.userName INNER JOIN picturesusers ON picturesusers.userId=p.id WHERE p.userName NOT IN (SELECT blockProfil FROM listblockprofil WHERE user='${userName}') AND p.userName<>'${userName}' AND p.age > ${age} - 10 AND p.age < ${age} + 10 ${(orientation !== "Bisexuelle") ? `AND u.gender='${orientation}'` : ""} GROUP BY p.id ORDER BY u.populareScore ASC LIMIT 20`
	connection.query(query, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ recommended: results })
		}
	})
})

app.post("/users/checkLike", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { currUser, userProfile } = req.body
	const checkLike = `SELECT likeUser FROM likeuser WHERE '${currUser}' = userName AND '${userProfile}' = profilName AND likeUser = 1`
	connection.query(checkLike, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			if (results.length !== 0)
				return res.json({ like: true })
			else
				return res.json({ like: false })
		}
	})
})

app.post("/users/getBlockList", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	const getBlockList = `SELECT blockProfil FROM listblockprofil WHERE user='${userName}'`
	connection.query(getBlockList, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ blockList: results })
		}
	})
})

app.post("/users/checkBlock", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { firstUser, scndUser } = req.body
	const query = `SELECT * FROM listblockprofil WHERE user='${firstUser}' AND blockProfil='${scndUser}'`
	connection.query(query, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length === 0) {
				return res.json({blocked: false })
			} else {
				return res.json({blocked: true})
			}
		}
	})
})

app.post("/users/blockProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, profilBlock } = req.body
	let blockProfil = `INSERT INTO listblockprofil (user, blockProfil) VALUES('${userName}', '${profilBlock}');`
	blockProfil += `DELETE FROM profilmatch WHERE (firstPerson='${userName}' AND secondPerson='${profilBlock}') OR (firstPerson='${profilBlock}' AND secondPerson='${userName}');`
	blockProfil += `DELETE FROM likeuser WHERE userName='${userName}' AND profilName='${profilBlock}'`
	connection.query(blockProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({success: true})
		}
	})
})

app.post("/users/deblockUser", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, userDeblocked } = req.body
	const deblockProfil = `DELETE FROM listblockprofil WHERE (user, blockProfil) IN (('${userName}', '${userDeblocked}'))`
	connection.query(deblockProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send(`${userDeblocked} is deblocked`)
		}
	})
})

app.post("/users/getAllOtherDataOfProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, profilName } = req.body
	let sql = `SELECT p.*, DATE_FORMAT(p.lastConnection, "%m-%d-%y %H:%i:%s") AS date, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName INNER JOIN picturesusers ON picturesusers.userId=p.id WHERE p.userName='${profilName}';`
	sql += `SELECT likeUser FROM likeuser WHERE (userName, profilName) IN (('${profilName}', '${userName}'));`
	sql += `SELECT fakeUser FROM fakeuser WHERE fakeUser='${profilName}';`
	connection.query(sql, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			let otherData = {}
			results.forEach((data) => {
				Object.entries(data).forEach((entry) => {
					Object.entries(entry[1]).forEach((entry) => {
						otherData = {
							...otherData,
							[entry[0]]: entry[1],
						}
					})
				})
			})
			return res.json({ otherData })
		}
	})
})

const db = {
	query(query) {
		return new Promise((resolve, reject) => {
			connection.query(query, (error, results) => {
				if (error) {
					reject(error)
				} else {
					resolve(results)
				}
			})
		}
	)}
}

const verifyToken = async(req) => {
	let cookiesArray = req.headers.cookie
	let list = {}
	if (cookiesArray === undefined) {
		console.log(1)
		return false
	}
	cookiesArray.split(";").forEach((cookie) => {
		const parts = cookie.split("=")
		list[parts.shift().trim()] = decodeURI(parts.join('='))
	})
	const token = list.token
    try {
          const payload = jwt.verify(token, jwtKey)
          const sql = `SELECT * FROM profil WHERE userName='${payload.name}' AND password='${payload.hashPassword}'`
		  const result = await db.query(sql)
          if (result.length === 1) {
            return true
          } else {
			console.log(2)
            return false
          }
    } catch (e) {
	if (e instanceof jwt.JsonWebTokenError) {
			console.log(3)
			return false
		}
		console.log(4)
		return false
	}
}

app.post("/users/getListMatch", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	let getList = `SELECT p.id, p.age, m.secondPerson AS person, m.chatId, u.picture FROM profilmatch m INNER JOIN profil p ON m.secondPerson=p.userName INNER JOIN picturesusers u ON p.id=u.userId WHERE m.firstPerson='${userName}' GROUP BY (m.secondPerson);`
	getList += `SELECT p.id, p.age, m.firstPerson AS person, m.chatId, u.picture FROM profilmatch m INNER JOIN profil p ON m.firstPerson=p.userName INNER JOIN picturesusers u ON p.id=u.userId  WHERE m.secondPerson='${userName}' GROUP BY (m.firstPerson);`
	getList += `SELECT blockProfil FROM listblockprofil WHERE user='${userName}'`
	connection.query(getList, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			const getList = results[0].concat(results[1])
			const getListMatch = []
			getList.forEach((user) => {
			if (results[2].filter(name => name === user.person).length === 0) {
				getListMatch.push(user)
				}
			})
			return res.json({ listMatch: getListMatch })
		}
	})
})

app.post("/users/updateNotificationsToRead", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	const updateNotificationsToRead = `UPDATE notifications SET notificationRead=1 WHERE notificationUser='${userName}' AND notificationRead=0`
	connection.query(updateNotificationsToRead, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("Notifications read")
		}
	})
})

app.post("/users/reportingFakeProfil", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { profilName } = req.body
	const reportingFakeProfil = `INSERT INTO fakeuser (fakeUser) SELECT '${profilName}' FROM profil WHERE NOT EXISTS (SELECT fakeUser FROM fakeuser WHERE fakeUser='${profilName}') LIMIT 1`
	connection.query(reportingFakeProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("Reporting fake user")
		}
	})
})

app.post("/users/getUserLocation", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { coords, userName, userAddress } = req.body
	const insertLocation = `UPDATE userinfos SET userLocation='${coords}', userAddress="${userAddress}" WHERE userName='${userName}'`
	connection.query(insertLocation, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("insert location success")
		}
	})
})

app.post("/users/getUserApproximateLocation", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	ipInfo((error, cLoc) => {
		if (error) {
			return error
		} else {
			const insertApproximateLocation = `UPDATE userinfos SET userApproximateLocation='${cLoc.loc}', userApproximateCity='${cLoc.city}' WHERE userName='${userName}'`
			connection.query(insertApproximateLocation, (error, results) => {
				if (error) {
					return res.send(error)
				} else {
					return res.json({ approximateLocation: `${cLoc.loc}`, userApproximateCity: `${cLoc.city}` })
				}
			})
		}
	})
})

app.post("/users/setLocationToNull", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	const setLocationToNull = `UPDATE userinfos SET userLocation=NULL, userAddress=NULL WHERE userName='${userName}'`
	connection.query(setLocationToNull, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("set location to null")
		}
	})
})

app.post("/users/findUser", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { id } = req.body
	const getAllName = `SELECT p.id, p.userName FROM profil p INNER JOIN picturesusers i ON i.userId=p.id WHERE p.id<>${id} GROUP BY p.id LIMIT 15`	
	connection.query(getAllName, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ allProfilName: results })
		}
	})
})

app.post("/users/populareScore", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { profilName } = req.body
	const selectScore = `SELECT likeUser FROM likeuser WHERE profilName='${profilName}'`
	connection.query(selectScore, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			const valueLike = (1 / results.length) * 100
			let populareScore = 0
			results.forEach((like) => {
				if (like.likeUser === 1) {
					populareScore += valueLike
				} else {
					populareScore -= valueLike
				}
			})
			return res.json({ populareScore })
		}
	})
})

app.post("/users/getNotificationsNoRead", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName, limit } = req.body
	const query = `SELECT notificationType FROM notifications WHERE notificationUser='${userName}' LIMIT ${limit}`
	connection.query(query, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ notif: results })
		}
	})
})

app.post("/users/getListPersonLikeYou", async(req, res) => {
	const result = await verifyToken(req)
	if (result === false) {
		return res.json({ authentified: false })
	}
	const { userName } = req.body
	const query = `SELECT likeuser.likeUser, profil.*, picturesusers.picture FROM likeuser INNER JOIN profil ON likeuser.userName=profil.userName INNER JOIN picturesusers ON picturesusers.userId=profil.id WHERE likeuser.userName NOT IN (SELECT blockProfil FROM listblockprofil WHERE user='${userName}') AND likeuser.profilName='${userName}' GROUP BY id`
	connection.query(query, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ list: results })
		}
	})
})

const populareScore = (profilName, like) => {
	const selectScore = `SELECT likeUser FROM likeuser WHERE profilName='${profilName}'`
	connection.query(selectScore, (error, results) => {
		if (error) {
			return
		} else {
			const valueLike = (1 / results.length) * 100
			let populareScore = 0
			results.forEach((like) => {
				if (like.likeUser === 1) {
					populareScore += valueLike
				} else {
					populareScore -= valueLike
				}
			})
			const insertPopulareScore = `UPDATE userinfos SET populareScore=${populareScore} WHERE userName='${profilName}';`
			connection.query(insertPopulareScore, (error, results) => {
				if (error) {
						return false
				} else {
						return true
				}
			})
		}
	})
}

server.listen(4000, () => {
        console.log(`Server is launch on port 4000`)
})
