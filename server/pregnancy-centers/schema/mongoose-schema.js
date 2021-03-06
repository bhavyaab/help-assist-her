'use strict'

const mongoose = require('mongoose')

const helpers = require('./helpers')
const {
	addressSchema, 
	userDateSchema, 
	getFullAddress
} = require('../../locations/schema/mongoose-schema')

const pregnancyCenterSchema = mongoose.Schema({
	address: addressSchema,
	outOfBusiness: Boolean,
	email: String,
	hours: Object,
	inVerification: mongoose.Schema.Types.ObjectId,
	prcName: String,
	notes: String,
	otherServices: String,
	phone: String,
	primaryContactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'Persons' },
	services: helpers.getPregnancyCenterServicesSchema(Boolean),
	verifiedData: {
		address: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		prcName: userDateSchema,
		phone: userDateSchema,
		primaryContactPerson: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	updated: {
		address: userDateSchema,
		outOfBusiness: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		prcName: userDateSchema,
		notes: userDateSchema,
		phone: userDateSchema,
		primaryContactPerson: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	website: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
	minimize: false // services will have a default of {}
})

pregnancyCenterSchema.index({'address.location': '2dsphere'})

pregnancyCenterSchema.methods.getFullAddress = getFullAddress

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

module.exports = PregnancyCenterModel
