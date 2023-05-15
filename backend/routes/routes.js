const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels')
const cartTemplateCopy = require('../models/Purchase')

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
    
    if(user){
        const comparePasswd = await bcrypt.compare(request.body.password, user.password);
        if(comparePasswd){
            // it is the right user
            // console.log('user.username =', user.username);
            request.session.username = user.username;
          
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

router.get('/is_logged_in', async (request, response) => {
    
    let isLoggedIn = false;
    // console.log('/is_loggged_in, request.session.username=',request.session.username);
    if (request.session.username) {
        isLoggedIn = true;
    }
    response.send({ message: isLoggedIn ? 'Yes': 'No'});
})


router.delete('/is_logged_in', async (request, response) => {
   
    request.session.destroy()
    response.json({message: "logged out succesfully"})
})

router.get('/user', async (request, response) => {
   
    if(request.session.username !== undefined){
        response.send(request.session.username)
    }else{
        response.send(undefined)
    }
    
})


router.post('/checkout', async (request, response) => {
   
    const newPurchase = new cartTemplateCopy({
        username:request.body.username,
        products:request.body.products,
        total:request.body.total,
        address:request.body.address,
        state:request.body.state,
        phone:request.body.phone
    })
    newPurchase.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.status(500).send("Internal Server Error Ocurred")
    })
})

module.exports = router