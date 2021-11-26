const router = require('express').Router();
const { getImage } = require('../controllers/file');

router.get('/images', getImage);

module.exports = () => router;
