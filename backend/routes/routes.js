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
        response.status(500).send("Internal Server Error Ocurred")
    })
})

router.post('/login', async (request, response) => {
    
   try{
    const user = await signUpTemplateCopy.findOne({username:request.body.username});
    // console.log(user)

    if(user){
        const comparePasswd = await bcrypt.compare(request.body.password, user.password);
        if(comparePasswd){
            response.send({message:"login success", user:user})
        }else{
            response.send({message:"Wrong username or password"})
        }
    }else{
        response.send({message:"Wrong username or password"})
    }

   }
   catch(error){
    console.log(error)
    response.status(500).send("Internal Server Error Occurred")
   }

})


module.exports = router