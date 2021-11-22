const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  userRegister,
  userLogin,
  userFind,
} = require('../controllers/user');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);

router.get('/users', authenticate, userFind);

module.exports = router;
