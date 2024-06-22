const { Router } = require('express');
const pageController = require('../containers/pageController')

const router = Router()

//=> /
router.get('/', pageController.home)

module.exports = router
