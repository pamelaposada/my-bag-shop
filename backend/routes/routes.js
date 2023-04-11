const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels')

const bcrypt = require('bcrypt');


router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:securePassword
    })
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

router.post('/login', async (request, response) => {
   
    const {email,username, password} = request.body;
    signUpTemplateCopy.findOne({email:email} || {username:username}, (error, user) => {
        if(user){
            if(password === user.password){
                response.send({message:"login success", user:user})
            }else{
                response.send({message:"wrong credentials"})
            }
        }else{
            response.send({message:"not register"})
        }
    })

})


module.exports = router