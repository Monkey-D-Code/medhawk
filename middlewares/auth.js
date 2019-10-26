exports.authPage = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }else{
        next();
    } 
    
    
}