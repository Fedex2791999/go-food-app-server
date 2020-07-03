const express = require('express');
const auth = require('../../middlewares/auth');
const {
  signUpUser,
  logInUser,
  postUserInfo,
  getUserInfo,
} = require('../../controllers/auth/userController');

const router = express.Router();

//* New User Signup
router.post('/signup', signUpUser);

router.post('/info', auth, postUserInfo);

//* User Log-In to work with Data
router.post('/login', logInUser);

//* User get private Information
router.get('/me', auth, getUserInfo);

// //* User update current Profile
// router.put('/updatedetails', auth, async (req, res) => {
//   const { error } = validateUpdateUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//     const { fullname, contactNumber } = req.body;

//     await User.findByIdAndUpdate(
//       req.user._id,
//       { fullname, contactNumber },
//       { new: true }
//     );

//     res.status(200).json({
//       msg: 'Update successful',
//       userData: { fullname, contactNumber },
//     });
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

// //* User update current Password
// router.put('/updatepassword', auth, async (req, res) => {
//   const { error } = validateUpdatePassword(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   try {
//     const { oldPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id);

//     const validPassword = await user.comparePassword(oldPassword);
//     if (!validPassword) {
//       return res.status(400).send('Old password incorrect !!!');
//     } else {
//       user.password = newPassword;
//       await user.save();
//       return res.status(200).send('Update password successful');
//     }
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

module.exports = router;
