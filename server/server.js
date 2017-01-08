'use strict'

const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const P = require('bluebird')

const server = express()
const port = config.server.port

mongoose.Promise = require('bluebird')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

	const pregnancyCenterSchema = mongoose.Schema({
		name: String,
		address: String,
		phone: String,
		website: String
	})

	const PregnancyCenter = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

	const aPregnancyCenter = new PregnancyCenter({
		name: 'Third Box Pregnancy Clinic',
		address: '450 Sutter St., Ste 1740, San Francisco, CA 94108',
		phone: '415.627.9175',
		website: 'http://www.firstresort.org'
	})
	console.log(aPregnancyCenter.name)

	aPregnancyCenter.save(function (err) {
		if (err) return console.error(err)
	})
})

startDatabase()

server.get('/', function(req, res) {
	res.send('Hello World!')
})

server.listen(port, function() {
	console.log(`Help Assist Her server listening on port ${port}`)
})
