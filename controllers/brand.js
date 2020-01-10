const Brand = require('../models').brand;
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

exports.createBrandPage = (req,res,next)=>{
    res.render('brands/form',{
        title : "Create a brand",
        fromCreate:true,
    })
}

exports.createBrand = (req,res,next)=>{
    const {
        fullName,
        shortName,
        contactNumber,
        email,
        address,
        openHours,
        facebookLink,
        twitterLink,
        instagramLink
    
    } = req.body;

    // validations
    let formErrors = [];

    // empty checks
    if(!fullName) formErrors.push({field:"fullName",message:"Must enter a full name"});
    if(!contactNumber) formErrors.push({field:"contactNumber",message:"is mandetory"});
    if(!email) formErrors.push({field:"email",message:"Email is your login id."});
    if(!address) formErrors.push({field:"address",message:"Head office address required"});
    if(!openHours) formErrors.push({field:"openHours",message:"Please mention the opening hours"});

    // link check
    if(facebookLink && !urlRegex.test(facebookLink)) formErrors.push({field:"facebookLink",message:"Provided link is not valid"});
    if(twitterLink && !urlRegex.test(twitterLink)) formErrors.push({field:"twitterLink",message:"Provided link is not valid"});
    if(instagramLink && !urlRegex.test(instagramLink)) formErrors.push({field:"instagramLink",message:"Provided link is not valid"});

    if(formErrors.length > 0){
        res.render('brands/form',{
            title : "Create a brand",
            fromCreate:true,
            formErrors,
            fullName,
            shortName,
            contactNumber,
            email,
            address,
            openHours,
            facebookLink,
            twitterLink,
            instagramLink,
        })

    }else{
        Brand.create({
            fullName,
            shortName,
            contactNumber,
            email,
            address,
            openHours,
            facebookLink,
            twitterLink,
            instagramLink,
        })
        .then(result=>{
            console.log(result);
            res.redirect('/auth/profile');

        }).catch(err=>{
            console.log(err);
            res.render('brands/form',{
                title : "Create a brand",
                fromCreate:true,
                err,
                fullName,
                shortName,
                contactNumber,
                email,
                address,
                openHours,
                facebookLink,
                twitterLink,
                instagramLink,
            });

        })

    }
        
}

exports.brandUpdatePage = (req,res,next)=>{
    Brand.findByPk(req.params.id)
        .then(brand=>{
            const {
                id,
                fullName,
                shortName,
                contactNumber,
                email,
                address,
                openHours,
                facebookLink,
                twitterLink,
                instagramLink
            
            } = brand;
            res.render('brands/form',{
                title : 'Update Brand',
                fromUpdate:true,
                id,
                fullName,
                shortName,
                contactNumber,
                email,
                address,
                openHours,
                facebookLink,
                twitterLink,
                instagramLink
            })

        })
        .catch(err=>{
            console.log(err);
            res.render('brands/form',{
                title : 'Update Brand',
                fromUpdate:true,
                err,
            })

        })
    
}

exports.updateBrand = (req,res,next)=>{
    const {
        fullName,
        shortName,
        contactNumber,
        email,
        address,
        openHours,
        facebookLink,
        twitterLink,
        instagramLink
    
    } = req.body;

    // validations
    let formErrors = [];

    // empty checks
    if(!fullName) formErrors.push({field:"fullName",message:"Must enter a full name"});
    if(!contactNumber) formErrors.push({field:"contactNumber",message:"is mandetory"});
    if(!email) formErrors.push({field:"email",message:"Email is your login id."});
    if(!address) formErrors.push({field:"address",message:"Head office address required"});
    if(!openHours) formErrors.push({field:"openHours",message:"Please mention the opening hours"});

    // link check
    if(facebookLink && !urlRegex.test(facebookLink)) formErrors.push({field:"facebookLink",message:"Provided link is not valid"});
    if(twitterLink && !urlRegex.test(twitterLink)) formErrors.push({field:"twitterLink",message:"Provided link is not valid"});
    if(instagramLink && !urlRegex.test(instagramLink)) formErrors.push({field:"instagramLink",message:"Provided link is not valid"});

    if(formErrors.length > 0){
        res.render('brands/form',{
            title : "Create a brand",
            fromCreate:true,
            formErrors,
            fullName,
            shortName,
            contactNumber,
            email,
            address,
            openHours,
            facebookLink,
            twitterLink,
            instagramLink,
        })

    }else{
        Brand.findByPk(req.params.id)
            .then(brand =>{
                brand.fullName = fullName;
                brand.shortName = shortName;
                brand.contactNumber = contactNumber;
                brand.email = email;
                brand.address = address;
                brand.openHours = openHours;
                brand.facebookLink = facebookLink;
                brand.twitterLink = twitterLink;
                brand.instagramLink = instagramLink;
                brand.save()
                .then(result=>{
                    console.log(result);
                    res.redirect('/auth/profile')

                })
                .catch(err=>{
                    console.log(err);
                    res.render('brands/form',{
                        title : 'Update Brand',
                        fromUpdate:true,
                        err,
                        id:req.params.id,
                        fullName,
                        shortName,
                        contactNumber,
                        email,
                        address,
                        openHours,
                        facebookLink,
                        twitterLink,
                        instagramLink
                    })
                })

            })
            
            .catch(err =>{
                console.log(err)
                res.render('brands/form',{
                    title : 'Update Brand',
                    fromUpdate:true,
                    err,
                    id:req.params.id,
                    fullName,
                    shortName,
                    contactNumber,
                    email,
                    address,
                    openHours,
                    facebookLink,
                    twitterLink,
                    instagramLink
                })
            })
    }
}