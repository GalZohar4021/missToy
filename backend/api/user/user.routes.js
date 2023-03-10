const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser , addUser , addUserMsg } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',  requireAuth, requireAdmin, getUsers)
router.get('/:id', getUser)
router.post('/',  addUser)
router.put('/',  requireAuth,  updateUser)

router.post('/:id/msg', requireAuth, addUserMsg)
router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router