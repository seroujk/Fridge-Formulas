const router = require('express').Router();
const { authorize } = require('../middlewares/auth');
const {
  validateUserBody,
  validateAuthenticationBody,
  validateUserUpdate,
} = require('../middlewares/validation');
const {
    getCurrentUser,
    updateCurrentUser,
    signup,
    login,
} = require('../controllers/users');

router.get('/users/me',authorize,getCurrentUser);
router.patch('/users/me',authorize,validateUserUpdate,updateCurrentUser);
router.post('/login',validateAuthenticationBody,login);
router.post('/signup',validateUserBody,signup);


module.exports = router;