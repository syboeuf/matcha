const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const nodemailer = require("nodemailer")
const fs = require("fs")
const cookieParser = require("cookie-parser")

const app = express()
const bodyParser = require("body-parser")
const ipInfo = require("ipinfo")
const cities = require("all-the-cities")
const jwt = require('jsonwebtoken')

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "input305",
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
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cookieParser())

app.get("/", (req, res) => {
	res.send("hello from the products server")
})
0
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
		let sql = `SELECT p.*, u.age, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${payload.name}';`
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

app.get("/deleteCookie", (req, res) => {
	res.clearCookie("token")
	return res.send("")
})

app.post("/users", (req, res) => {
	const { userName } = req.body
	const selectAllProfil = `SELECT p.*, u.age, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName=${userName}`
	connection.query(selectAllProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ data: results })
		}
	})
})

app.get("/dataForMap", (req, res) => {
	const dataPeople = `SELECT p.*, u.age, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore, i.picture FROM profil p INNER JOIN userinfos u ON p.userName=u.userName INNER JOIN picturesusers i ON p.id=i.userId GROUP BY (p.id)`
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
	const { name, hashPassword } = req.body
	const checkLogin = `SELECT * FROM profil WHERE (userName, password, confirmKeyOk) IN (('${name}', '${hashPassword}', 1))`
	connection.query(checkLogin, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			const date = Math.floor(Date.now() / 1000)
			if (results.length > 0) {
				if (date > results[0].bantime || results[0].bantime === 0) {
					const token = jwt.sign({ name, hashPassword }, jwtKey, {
						algorithm: "HS256",
						expiresIn: "24h",
					})
					res.cookie("token", token)
					const getDataUser = `SELECT p.*, u.age, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${name}'`
					connection.query(getDataUser, (error, results) => {
						if (error) {
							return res.send(error)
						} else {
							return res.json({ dataUser: results })
						}
					})
				} else {
					return res.send("nop")
				}
			} else {
				return res.send("nop")
			}
		}
	})
})

app.post("/users/verifyPassword", (req, res) => {
	const { name, hashPassword } = req.body
	const checkLogin = `SELECT p FROM profil WHERE (userName, password, confirmKeyOk) IN (('${name}', '${hashPassword}', 1))`
	connection.query(checkLogin, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				return res.json({ success: 1 })
			} else {
				return res.json({ success: 0 })
			}
		}
	})
})

app.post("/users/ban", (req, res) => {
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

app.post("/users/getUserProfil", (req, res) => {
	const { id } = req.body
	const selectDataProfil = `SELECT p.*, u.age, u.biography, u.listInterest, u.gender, u.orientation, u.userLocation, u.userAddress, u.userApproximateLocation, u.userApproximateCity, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.id='${id}'`
	connection.query(selectDataProfil, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ data: results })
		}
	})
})

app.post("/users/picturesUser", (req, res) => {
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
	let insertUserIntoBdd = `INSERT INTO profil (userName, password, email, lastname, firstname, confirmKey)
		VALUES('${name}', '${password}', '${email}', '${lastName}', '${firstName}', ${confirmKey});`
	insertUserIntoBdd += `INSERT INTO userinfos (userName, gender, orientation) VALUES ('${name}', 'Male', 'Bisexuelle')`
	connection.query(insertUserIntoBdd, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			const text = `This is your ${confirmKey} and the link: http://localhost:3000/ConfirmKey`
			const subject = "Confirm you key"
			sendMail(email, text, subject)
			return res.send("added user")
		}
	})
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

app.post("/users/editProfil/sendPictures", (req, res) => {
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
				const text = `This is your key: ${key}`
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
	const { passwordHash, key } = req.body
	const updatePassword = `UPDATE profil SET password='${passwordHash}' WHERE keyResetPassword='${key}'`
	connection.query(updatePassword, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send(`profil is confirmed`)
		}
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
				updateConfirmKeyOk += `SELECT p.*, u.age, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${name}'`
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

app.post("/users/updateInfosProfil", (req, res) => {
	const {
		id, userName, newPassword, email, firstName, lastName, previousUserName,
	} = req.body
	const checkIfUserAlreadyExist = `SELECT * FROM profil WHERE id <> ${id} AND (userName='${userName}' OR email='${email}')`
	connection.query(checkIfUserAlreadyExist, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			if (results.length > 0) {
				return res.send("0")
			} else {
				let updateDataUser = `UPDATE profil SET userName='${userName}', password='${newPassword}', email='${email}', firstName='${firstName}', lastName='${lastName}' WHERE id=${id};`
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
						return res.send("1")
					}
				})
			}
		}
	})
})

app.post("/users/updateInfosPersonal", (req, res) => {
	const {
		age, orientation, gender, biography, listInterest, userName,
	} = req.body
	const text = (biography === null) ? "" : biography
	const interest = (listInterest === null) ? "" : listInterest
	const updateUserInfos = `UPDATE userinfos SET age=${age}, orientation='${orientation}', gender='${gender}', biography='${text.replace(/'/g, "\\'")}', listInterest='${interest}' WHERE userName='${userName}'`
	connection.query(updateUserInfos, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send(`${userName} personal infos is modified`)
		}
	})
})

app.post("/users/getImageProfil", (req, res) => {
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

app.post("/users/profilmatch", (req, res) => {
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

app.post("/users/deleteMatch", (req, res) => {
	const { user, profilName } = req.body
	const deleteMatch = `DELETE FROM profilmatch WHERE (firstPerson='${user}' AND secondPerson='${profilName}') OR (firstPerson='${profilName}' AND secondPerson='${user}');`
	donnection.query(deleteMatch, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.send("match delete")
		}
	})
})

app.post("/users/listBlockProfil", (req, res) => {
	const { userName } = req.body
	const listBlock = `SELECT p.*, u.age, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.userLocation, u.userApproximateLocation, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName NOT IN (SELECT blockProfil FROM listblockprofil WHERE user='${userName}') AND p.userName<>'${userName}'`
	connection.query(listBlock, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ blockList: results })
		}
	})
})

app.post("/users/checkLike", (req, res) => {
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

app.post("/users/getBlockList", (req, res) => {
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

app.post("/users/blockProfil", (req, res) => {
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

app.post("/users/deblockUser", (req, res) => {
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

app.post("/users/getAllOtherDataOfProfil", (req, res) => {
	const { userName, profilName } = req.body
	let sql = `SELECT p.*, u.age, u.biography, u.gender, u.orientation, u.listInterest, u.userAddress, u.populareScore FROM profil p INNER JOIN userinfos u ON p.userName=u.userName WHERE p.userName='${profilName}';`
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

app.post("/users/getListMatch", (req, res) => {
	const { userName } = req.body
	let getList = `SELECT p.id, m.secondPerson AS person, m.chatId, u.picture, userinfos.age FROM profilmatch m INNER JOIN profil p ON m.secondPerson=p.userName INNER JOIN picturesusers u ON p.id=u.userId INNER JOIN userinfos ON p.userName=userinfos.userName WHERE m.firstPerson='${userName}' GROUP BY (m.secondPerson);`
	getList += `SELECT p.id, m.firstPerson AS person, m.chatId, u.picture, userinfos.age FROM profilmatch m INNER JOIN profil p ON m.firstPerson=p.userName INNER JOIN picturesusers u ON p.id=u.userId INNER JOIN userinfos ON p.userName=userinfos.userName WHERE m.secondPerson='${userName}' GROUP BY (m.firstPerson);`
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

app.post("/users/updateNotificationsToRead", (req, res) => {
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

app.post("/users/reportingFakeProfil", (req, res) => {
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

app.post("/users/getUserLocation", (req, res) => {
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

app.post("/users/getUserApproximateLocation", (req, res) => {
	const { userName } = req.body
	ipInfo((error, cLoc) => {
		if (error) {
			return error
		} else {
			const city = cities.filter(city => {
				if (city.name.startsWith(cLoc.city) !== -1 && city.country === cLoc.country) {
					return city.name.match(cLoc.city)
				}
			})
			const insertApproximateLocation = `UPDATE userinfos SET userApproximateLocation='${city[0].lat}, ${city[0].lon}', userApproximateCity='${city[0].name}' WHERE userName='${userName}'`
			connection.query(insertApproximateLocation, (error, results) => {
				if (error) {
					return res.send(error)
				} else {
					return res.json({ approximateLocation: `${city[0].lat}, ${city[0].lon}`, userApproximateCity: `${city[0].name}` })
				}
			})
		}
	})
})

app.post("/users/setLocationToNull", (req, res) => {
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

app.get("/users/findUser", (req, res) => {
	const getAllName = `SELECT userName FROM profil`
	connection.query(getAllName, (error, results) => {
		if (error) {
			return res.send(error)
		} else {
			return res.json({ allProfilName: results })
		}
	})
})

app.post("/users/populareScore", (req, res) => {
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
