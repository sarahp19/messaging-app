const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  userRegister,
  userLogin,
  userFind,
} = require('../controllers/user');
const { getImage } = require('../controllers/file');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);

router.get('/users', authenticate, userFind);
router.get('/images/:image', getImage);

module.exports = router;
