// libraries for user auth
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = require("express").Router()

// register user
router.post("/api/register", async (req, res) => {
    const user = req.body

    // check if username or email has already been taken
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})

    if(takenUsername || takenEmail) {
        res.json({message: 'Username or email has already been taken'})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)
        let isAdmin = false
        if(user.isAdmin != null) {
            isAdmin = user.isAdmin
        }
        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
            isAdmin: isAdmin
        })

        dbUser.save()
        res.json({status: 'ok'})
    }
})

// login user
router.post("/api/login", (req, res) => {

    const userLoggingIn = req.body.body
    console.log(userLoggingIn.username)
    
    User.findOne({username: userLoggingIn.username})
    .then(dbUser => {
        if(!dbUser) {
            console.log('user not found...')
            return res.json({messgae: 'invalid username or password, not found'})
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
            if(isCorrect) {
                // create token
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username
                }
                token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if(err){
                            console.log(err)
                            return res.json({message: err})
                            
                        }
                        console.log('token created')
                        return res.json({
                            status: 'ok',
                            token: token
                        })
                    }
                )
            } else {
                console.log('password incorrect...')
                return res.json({
                    message: 'invalid username or password 2'
                })
            }
        })
    })
})


// get current uer
router.get('/api/getUsername', verifyJWT, (req, res) => {
    res.json({user: req.user, isLoggedIn: true})
})

// verify user, check if logged in
function verifyJWT(req, res, next) {
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) return res.json({
                isLoggedIn: false,
                message: 'failed to authenticate'
            })
            let dbUser = await User.findById(decoded.id)
            dbUser.isLoggedIn = true
            req.user = dbUser
            return next()
        })
    } else {
        res.json({message: 'incorrect token given', isLoggedIn: false})
    }
}

module.exports = router;