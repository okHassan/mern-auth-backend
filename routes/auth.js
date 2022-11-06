const router = require('express').Router()
const jwt = require("jsonwebtoken")
const User = require('../models/userShcema')
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate')


router.post('/resister', async (req, res) => {
    try {

        const { name, email, phone, work, password, Cpassword } = req.body

        if (!name || !email || !phone || !work || !password || !Cpassword) {
            res.status(422).json({ error: "please complete all fields" })
        } else {
            const userExist = await User.findOne({ email: email })

            if (userExist) {
                res.status(422).json({ error: "email already exist !" })
            } else {
                if (password === Cpassword) {
                    const user = new User({ name, email, phone, work, password })

                    const salt = await bcrypt.genSalt(10)

                    const hash = await bcrypt.hash(password, salt)

                    user.password = hash

                    const userResister = await user.save()

                    if (userResister) {
                        res.status(201).json({ message: "User Resister Successfully" })
                        console.log({ message: "User Resister Successfully" });
                    } else {
                        res.status(500).json({ error: "Failed to register" })
                    }

                } else {
                    res.status(422).json({ error: "Password Not Match !" })
                }
            }

        }


    } catch (error) {
        console.log('server crashed', error);
        res.status(500).json({ error: "Server Are busy. please reload Web Page and use correct Data" })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422).json({ error: "please enter all data" })

        } else {

            const userLogin = await User.findOne({ email: email })

            if (userLogin) {

                const ismatch = await bcrypt.compare(password, userLogin.password)

                if (ismatch) {

                    const token = jwt.sign(userLogin._doc, process.env.JWT_KEY, { expiresIn: '604800s' })


                    res.cookie('jwt_token', token, {
                        httpOnly: true,
                        secure: false,
                    });

                    res.json({ message: "User Login successfully" })
                } else {
                    res.json({ error: "Invalid Cradintial" })
                }

            } else {
                res.json({ error: "Invalid Cradintial" })
            }

        }

    } catch (error) {
        console.log('server crashed', error);
        res.status(500).json({ error: "Server Are busy. please reload Web Page and use correct Data" })
    }
})


router.post('/post', (req, res) => {
    res.cookie('token', 'token', {
        httpOnly: true
      });
    res.json({"name": "hassan"})
})


router.get('/about', authenticate, (req, res) => {
    res.send(req.user)
})


router.get('/logout', (req, res) => {
    res.clearCookie('jwt_token', {path: '/'})
    res.status(200).send('user logout')
})

module.exports = router