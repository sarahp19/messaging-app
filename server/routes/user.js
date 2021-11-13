const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  userRegister,
  userLogin,
  userFindOne,
} = require('../controllers/user');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);

router.get('/users', authenticate, userFindOne);

module.exports = router;
