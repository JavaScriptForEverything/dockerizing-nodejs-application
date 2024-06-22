const { model, models, Schema } = require('mongoose')
const bcryptjs = require('bcryptjs')
const { isEmail } = require('validator')

/*
{

"clientId" : "", 		// for social media login
"name" : "Riajul Islam",
"email" : "riajul@gmail.com",
"password" : "asdfasdf",
"confirmPassword?" : "asdfasdf",
"avatar" : "",

}
*/

const userSchema = new Schema({
	clientId: String, 		// for social media login
	name: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		validate: isEmail
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false
	},
	confirmPassword: {
		type: String,
		// required: true,
		validate: function(val) {
			return this.password === val
		},
	},
	passwordResetToken: String,

	role: {
		type: String,
		enum: ['admin', 'leader', 'user'],
		default: 'user'
	},
	isActive: {
		type: Boolean,
		default: false
	},

	avatar: {
		public_id: String,
		secure_url: String,
		alt: String,
		size: String
	},

}, {
	timestamps: true
})

userSchema.pre('save', async function(next) {
	if( !this.isModified('password') ) return

	this.password = await bcryptjs.hash(this.password, 12)
	this.confirmPassword = undefined
	next()
})





const User  = models.User|| model('User', userSchema)
module.exports = User