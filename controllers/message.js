const Message = require('../models/message');

exports.sendMessage = (req,res,next)=>{
    const {name,email,subject,message} = req.body;
    Message.create({
        name,
        email,
        subject,
        message,
        creationDate : Date.now(),

    })
    .then(result=>{
        console.log(result);
        res.render('contact',{
            title:'Contact Us | Medhawk',
            activeContact : true,
            successMsg : "Message sent successfully. We will reply you soon on your email. Thanks.",
        })
    })
    .catch(err=>{
        console.log(err);
        res.render('contact',{
            title:'Contact Us | Medhawk',
            activeContact : true,
            err,
        })
    })
    
    

}