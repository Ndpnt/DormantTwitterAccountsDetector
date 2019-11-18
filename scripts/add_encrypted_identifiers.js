require('dotenv').config();
const parse = require('csv-parse');
const stringify = require('csv-stringify');
const fs = require('fs');
const Twitter = require('twit');

const bcrypt = require('bcrypt');

const T = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const output = [];

const parser = parse({delimiter: ';'}, async function(err, records) {
	for (const element of records) {
		await encryptIdAndScreenName(element);
		// await addTwitterId(element);
		output.push(element);
	}
	stringify(output, {
		delimiter: ';'
	  }, function(err, result){
		fs.writeFile("result.csv", result, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});
	});
});

async function addTwitterId(arrayRow) {
	console.log(`Get twitter id for user ${arrayRow[0]}`);
	return T.get('users/lookup', { screen_name: arrayRow[0] })
		.then(({data}) => {
			if (data && data[0] && data[0].id_str) {
				arrayRow.push(data[0].id_str);
			}
		})
		.catch((err) => {
			console.error(err.message);
			return null;
		});
}

const saltRounds = 10;
async function encryptIdAndScreenName(arrayRow) {
	const screenName = arrayRow[0];
	const id = arrayRow[arrayRow.length - 1];
	console.time('hashage name');
	const screenNameHash = bcrypt.hashSync(screenName, saltRounds);
	console.timeEnd('hashage name');
	console.time('hashage id');
	const idHash = bcrypt.hashSync(id, saltRounds);
	console.log(id, idHash)
	console.log('hash:', bcrypt.compareSync(id, idHash));
	console.timeEnd('hashage id');
	arrayRow.push(screenNameHash);
	arrayRow.push(id ? idHash : '');
}

fs.createReadStream(__dirname + '/Twitter (naif) with id - cleaned.csv').pipe(parser);
