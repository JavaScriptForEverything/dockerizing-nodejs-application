const User = require('../model/userModel')
const { catchAsync, appError } = require('./errorController')

// => GET /api/users
exports.getUsers = catchAsync(async (req, res, next) => {
	const users = await User.find({})

	res.json({
		status: 'success',
		users
	})
})

// => POST /api/users
exports.addUsers = catchAsync(async (req, res, next) => {
	const user = await User.create(req.body)
	if(!user) return next(appError('no user found'))

	res.json({
		status: 'success',
		user
	})
})