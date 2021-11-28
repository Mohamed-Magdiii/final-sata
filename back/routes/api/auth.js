const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register Account
router.post(
  "/register",
  [
    check("fullname", "Please Enter Your FullName").not().isEmpty(),
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password must be more than 8 letter").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    console.log(req.body)
    try {
      let user = await User.findOne({ email });
      if (user) {
      return  res.status(500).json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        fullname,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        _id: user._id,
        username: user.fullname,
        password: "",
        email: user.email,
        authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
        refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
        roles: user.role === 'customer' ? [0] : 
        (user.role === 'admin' ? [1] : (user.role === 'vendor' ? [2] : [3])), // Administrator
        pic: "",
        fullname: user.fullname,
        firstname: user.fullname,
        lastname: user.fullname,
        occupation: "",
        companyName: "",
        phone: user.mobile,
        language: "en",
        timeZone: "International Date Line West",
        website: "https://keenthemes.com",
        emailSettings: {
          emailNotification: true,
          sendCopyToPersonalEmail: false,
          activityRelatesEmail: {
            youHaveNewNotifications: false,
            youAreSentADirectMessage: false,
            someoneAddsYouAsAsAConnection: true,
            uponNewOrder: false,
            newMembershipApproval: false,
            memberRegistration: true,
          },
          updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: false,
            tipsOnGettingMoreOutOfKeen: false,
            thingsYouMissedSindeYouLastLoggedIntoKeen: true,
            newsAboutMetronicOnPartnerProductsAndOtherServices: true,
            tipsOnMetronicBusinessProducts: true,
          },
        },
        communication: {
          email: true,
          sms: true,
          phone: false,
        },
        address: {
          addressLine: "L-12-20 Vertex, Cybersquare",
          city: "San Francisco",
          state: "California",
          postCode: "45000",
        },
        socialNetworks: {
          linkedIn: "https://linkedin.com/admin",
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          instagram: "https://instagram.com/admin",
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SEC,
        { expiresIn: "3d" },
        (err, token) => {
          if (!token) throw err;
          res.json({ token });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

//Login Account
router.post('/login' ,  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password must be more than 8 letter").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const {email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
      return   res.status(500).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatching =await bcrypt.compare(password , user.password);
      if (!isMatching) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        _id: user._id,
        username: user.fullname,
        password: "",
        email: user.email,
        authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
        refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
        roles: user.role === 'customer' ? [0] : 
        (user.role === 'admin' ? [1] : user.role === 'vendor' ? [2] : [3]), // Administrator
        pic: "",
        fullname: user.fullname,
        firstname: user.fullname,
        lastname: user.fullname,
        occupation: "",
        companyName: "Keenthemes",
        phone: "456669067890",
        language: "en",
        timeZone: "International Date Line West",
        website: "https://keenthemes.com",
        emailSettings: {
          emailNotification: true,
          sendCopyToPersonalEmail: false,
          activityRelatesEmail: {
            youHaveNewNotifications: false,
            youAreSentADirectMessage: false,
            someoneAddsYouAsAsAConnection: true,
            uponNewOrder: false,
            newMembershipApproval: false,
            memberRegistration: true,
          },
          updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: false,
            tipsOnGettingMoreOutOfKeen: false,
            thingsYouMissedSindeYouLastLoggedIntoKeen: true,
            newsAboutMetronicOnPartnerProductsAndOtherServices: true,
            tipsOnMetronicBusinessProducts: true,
          },
        },
        communication: {
          email: true,
          sms: true,
          phone: false,
        },
        address: {
          addressLine: "L-12-20 Vertex, Cybersquare",
          city: "San Francisco",
          state: "California",
          postCode: "45000",
        },
        socialNetworks: {
          linkedIn: "https://linkedin.com/admin",
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          instagram: "https://instagram.com/admin",
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SEC,
        { expiresIn: "3d" },
        (err, token) => {
          if (!token) throw err;
          res.status(200).json({token, payload});
        });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
)

module.exports = router;
