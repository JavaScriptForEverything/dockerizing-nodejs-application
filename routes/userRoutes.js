const { Router } = require('express');
const userController = require('../containers/userContainer')

const router = Router()

//=> /api/users
router.get('/', userController.getUsers)
router.post('/', userController.addUsers)

module.exports = router
