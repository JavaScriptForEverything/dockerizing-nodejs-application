const User = require('../model/userModel')
const { catchAsync, appError } = require('./errorController')

// => GET /
exports.home = catchAsync(async (req, res, next) => {
	const users = await User.find({})

	const payload = {
		title: 'Home Page',
		users,
		usersJs: JSON.stringify(users)
	}
	
	res.render('home', payload)
})

