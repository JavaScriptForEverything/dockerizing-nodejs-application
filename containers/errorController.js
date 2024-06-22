exports.catchAsync = (fn) => {
	return (req, res, next) => {
		return fn(req, res, next).catch(next)
	}
}


exports.appError = (message='', statusCode=400, status='error') => {
	const error = new Error(message) 
	error.statusCode = statusCode
	error.status = status

	return error
}


// Express Global Error handler
exports.globalErrorHandler = (err, _req, res, _next) => {
	const { NODE_ENV = 'development' } = process.env

	if(!err.message) {
		res.status(err.statusCode || 404).json({
			message: err,
			status: 'unknown',
			stack: NODE_ENV === 'development' ? err.stack : undefined
		})
	}

	// 1. Give simple message for InvalidId Error
	if(err.name === 'CastError') {
		err.message = `Invalid ID: ${err.value}`
		err.status = err.name
	}

	// 2. Give simple message for Duplicate (Unique Field) Error
	if(err.code === 11000) {
		err.message = `Duplicate Fields: ${err.message.split('index:').pop()}`
		err.status = err.name
	}

	// 3. Give simple message for ValidationError
	if(err.errors) {
		const message = Object.entries( err.errors ).map( ([key, value]) => {
			if(value instanceof Error) {
				return `${key}: ${value.message}`
			}
		})
		err.message = message
		err.status = err.name
	}

	// 4.1: JsonWebToken Modification Error
  if(err.name === 'JsonWebTokenError') {
		err.statusCode = 401
		err.status = err.name
	}
	// 4.2: JsonWebToken Expire Error
  if(err.name === 'TokenExpiredError') {
		err.statusCode = 401
		err.status = err.name
	}


	res.status(err.statusCode || 404).json({
		message: err.message,
		status: err.status || 'failed',
		stack: NODE_ENV === 'development' ? err.stack : undefined
	})
}

exports.routeNotFound = (req, _res, next) => {
	next(appError(`route ${req.originalUrl} not found`, 404, 'NotFound'))
}


