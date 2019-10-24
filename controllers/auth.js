const bcrypt = require('bcryptjs');

const User = require('../models/user');


exports.loginPage = (req,res,next)=>{
    if(req.session.isAuthenticated){
        res.redirect('/auth/profile');
    }
    else{
        res.render('login',{
            title : 'Login | Medhawk',
            activeLogin:true,
        });
    }
    
}
exports.login = (req,res,next)=>{
    const {email,password} = req.body;
    User.findAll({where:{email,}})
        .then(users=>{
            console.log(password);
            console.log(users[0].password);
            bcrypt.compare(password,users[0].password,(err,r)=>{
                if(err){
                    console.log(err);
                    res.render('login',{
                        title:'Login | Medhawk',
                        activeLogin:true,
                        error:err,
                    });
                }
                if(r){
                    req.session.isAuthenticated = true;
                    req.session.user = users[0];
                    res.redirect('/auth/profile')
                }else{
                    res.render('login',{
                        title:'Login | Medhawk',
                        activeLogin:true,
                        error:"Passwords don't match",
                    });
                }
            })
                
            
        })
        .catch(err=>{
            console.log(err);
            res.render('login',{
                title:'Login | Medhawk',
                activeLogin:true,
                error:"Email Address invalid",
            });
        })
    
    
    
}

exports.profilePage = (req,res,next)=>{
    const user = req.session.user;
    
    if(req.session.isAuthenticated){
        res.render('auth/profile',{
            title:`${user.firstName} ${user.lastName}`,
            user:user,
            isAuthenticated : req.session.isAuthenticated,
        })
    }else{
        res.redirect('/auth/login');
    }
    
}

exports.logout = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }
    req.session.destroy(()=>res.redirect('/auth/login'));
}