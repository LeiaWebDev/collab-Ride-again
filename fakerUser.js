const { faker, fakerFR, fakerEN } = require("@faker-js/faker")
const { getRandomValues } = require("crypto")
const fs = require("fs")
const allStatus = ["likeNew", "veryGood", "good", "parts", "needsRepair"]
/**
 * Faker is a small package allowing us to create some fake datas
 * Might be handy when we want to create a "seed".
 * A seed is generally created / used when we want to test our application
 * and we do not have any data.
 */

function generate() {
	const users = createUser()
	const ads = createAd()

	// randomizeUserToAd(users, ads)

	return { users, ads }
}


fs.writeFileSync(
	"data.json",
	JSON.stringify(generate(), null, "\t")
)

// fs.writeFileSync(
// 	"ad_data.json",
// 	JSON.stringify(generateAd(), null, "\t")
// )



function createUser(arr = []) {
	for (let userId = 1; userId <= 100; userId++) {
		let firstName = faker.person.firstName()
		let lastName = faker.person.lastName()
		let email = faker.internet
			.email({ firstName, lastName })
			.toLocaleLowerCase()
		let phoneNumber = faker.phone.number('+33 6 ## ## ## ##')
		const city = fakerFR.location.city()
		const postCode = fakerFR.location.zipCode()
		const streetName = fakerFR.location.streetAddress()
		// const country = "France"
		const longitude = fakerFR.location.longitude()
		const latitude = fakerFR.location.latitude()



		arr.push({ 
			id : userId,
			firstName, 
			lastName, 
			email, 
			city, 
			phoneNumber, 
			postCode, 
			streetName, 
			longitude, 
			latitude,
			// country
		})
	}
	return arr
}


function createAd(arr = []) {
	for (let adId = 0; adId < 100; adId++) {

		let status = allStatus[Math.floor(Math.random() * allStatus.length)]

		arr.push({
			id:adId + 1,
			status,
			userId: Math.floor((Math.random()) * 100) + 1
			
		})
	}
	return arr
}
