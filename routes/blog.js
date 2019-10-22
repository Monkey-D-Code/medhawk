const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('blog',{
        title:'Our Blog | Medhawk',
        activeBlog : true
    });
})



module.exports = router;