const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  userRegisterStep1,
  userRegisterStep2,
  userLogin,
  userFind,
} = require('../controllers/user');
const { getImage } = require('../controllers/file');

router.post('/users/register', userRegisterStep1);
router.post('/users/register/confirm', userRegisterStep2);
router.post('/users/login', userLogin);

router.get('/users', authenticate, userFind);
router.get('/images/:image', getImage);

module.exports = router;
