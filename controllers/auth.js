const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Appointment = require('../models/appointment');
const Message = require('../models/message');


exports.loginPage = (req,res,next)=>{
    if(req.session.isAuthenticated){
        res.redirect('/auth/profile');
    }
    else{
        res.render('login',{
            title : 'Login | Medhawk',
            activeLogin:true,
            csrfToken:req.csrfToken(),
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
        Promise.all([
            Appointment.findAll(),
            Message.findAll(),
        ])
            .then(([apts,messages])=>{
                res.render('auth/profile',{
                    title:`${user.firstName} ${user.lastName}`,
                    user:user,
                    appointments : apts,
                    messages,
                })
            })
            .catch(err=>{
                console.log(err);
                res.render('auth/profile',{
                    title:`${user.firstName} ${user.lastName}`,
                    user:user,
                    err,
                })
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