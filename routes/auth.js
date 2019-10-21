const express = require('express');
const router = express.Router();


router.get('/login', (req,res,next)=>{
    res.render('login',{
        title:'Login | Medhawk',
        activeLogin : true,
    })
})

router.post('/login' , (req,res,next)=>{
    console.log(req.body);
    res.send('Done');
})



module.exports = router;