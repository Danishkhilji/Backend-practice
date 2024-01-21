let express = require("express")
let router = express.Router()
let {createTask} = require('../contrrollers/task')
router.post('/createTask',createTask )
// router.get()
// router.put()
// router.delete()

module.exports = router