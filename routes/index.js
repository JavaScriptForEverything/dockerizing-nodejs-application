const { Router } = require('express');
const pageRouter = require('./pageRoutes')
const userRouter = require('./userRoutes')

const router = Router()

router.use('/', pageRouter)
router.use('/api/users', userRouter)

module.exports = router