const Doctor = require('../models').doctor;
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

exports.createDoctorPage = (req,res,next)=>{
    res.render('doctors/form',{
        title : 'Create Doctor',
        fromCreate:true,
    })
}

exports.createDoctor = (req,res,next)=>{
    const {name,role,imageUrl,facebookLink,twitterLink,instagramLink} = req.body;
    // validations
    let formErrors = [];
    if(!name) formErrors.push({field:'name',message:'Name of a doctor is mandetory'});
    if(!role) formErrors.push({field:'role',message:'Role of a doctor is mandetory'});
    if(!imageUrl) formErrors.push({field:'imageUrl',message:'Photo link of a doctor is mandetory'});

    if(facebookLink && !urlRegex.test(facebookLink)) formErrors.push({field:'facebookLink',message:'facebook link is not valid'});
    if(twitterLink && !urlRegex.test(twitterLink)) formErrors.push({field:'twitterLink',message:'twitter link is not valid'});
    if(instagramLink && !urlRegex.test(instagramLink)) formErrors.push({field:'instagramLink',message:'instagram link is not valid'});
    if(imageUrl && !urlRegex.test(imageUrl)) formErrors.push({field:'imageUrl',message:'entered link is not valid'});

    if(formErrors.length > 0){
        res.render('doctors/form',{
            title : 'Create Doctor',
            fromCreate:true,
            formErrors,
            name,
            role,
            imageUrl,
            facebookLink,
            twitterLink,
            instagramLink,
        })

    }else{
        Doctor.create({name,role,imageUrl,facebookLink,twitterLink,instagramLink})
            .then(result=>{
                console.log(result);
                res.redirect('/departments');
            })
            .catch(err=>{
                console.log(err);
                res.render('doctors/form',{
                    title : 'Create Doctor',
                    fromCreate:true,
                    err,
                    name,
                    role,
                    imageUrl,
                    facebookLink,
                    twitterLink,
                    instagramLink,
                })
            })

    }


}

exports.updateDoctorPage= (req,res,next)=>{
    Doctor.findByPk(req.params.id)
        .then(doctor=>{
            const {id,name,role,imageUrl,facebookLink,twitterLink,instagramLink} = doctor;
            res.render('doctors/form',{
                title : 'Update',
                fromUpdate:true,
                id,
                name,
                role,
                imageUrl,
                facebookLink,
                twitterLink,
                instagramLink,
            })
        })
        .catch(err=>{
            res.render('doctors/form',{
                title : 'Create Doctor',
                fromUpdate:true,
                err,
            })
        })
}

exports.updateDoctor = (req,res,next)=>{
    const {name,role,imageUrl,facebookLink,twitterLink,instagramLink} = req.body;
    // validations
    let formErrors = [];
    if(!name) formErrors.push({field:'name',message:'Name of a doctor is mandetory'});
    if(!role) formErrors.push({field:'role',message:'Role of a doctor is mandetory'});
    if(!imageUrl) formErrors.push({field:'imageUrl',message:'Photo link of a doctor is mandetory'});

    if(facebookLink && !urlRegex.test(facebookLink)) formErrors.push({field:'facebookLink',message:'facebook link is not valid'});
    if(twitterLink && !urlRegex.test(twitterLink)) formErrors.push({field:'twitterLink',message:'twitter link is not valid'});
    if(instagramLink && !urlRegex.test(instagramLink)) formErrors.push({field:'instagramLink',message:'instagram link is not valid'});
    if(imageUrl && !urlRegex.test(imageUrl)) formErrors.push({field:'imageUrl',message:'entered link is not valid'});

    if(formErrors.length > 0){
        res.render('doctors/form',{
            title : 'Update',
            fromUpdate:true,
            id : req.params.id,
            name,
            role,
            imageUrl,
            facebookLink,
            twitterLink,
            instagramLink,
            formErrors,
        })

    }else{
        Doctor.findByPk(req.params.id)
            .then(doctor=>{
                doctor.name = name;
                doctor.role = role;
                doctor.imageUrl = imageUrl;
                doctor.facebookLink = facebookLink;
                doctor.twitterLink = twitterLink;
                doctor.instagramLink = instagramLink;
                doctor.save()
                    .then(result=>{
                        console.log(result);
                        res.redirect('/departments');

                    })
                    .catch(err=>{
                        console.log(err);
                        res.render('doctors/form',{
                            title : 'Update',
                            fromUpdate:true,
                            id : req.params.id,
                            name,
                            role,
                            imageUrl,
                            facebookLink,
                            twitterLink,
                            instagramLink,
                            err,
                        })
                    })
            })
        
    }

}


exports.deleteDoctorPage = (req,res,next)=>{
    Doctor.findByPk(req.params.id)
        .then(doctor=>{
            const {id,name,role,imageUrl} = doctor;
            res.render('doctors/delete',{
                title : `Confirm delete | ${name}`,
                id,
                name,
                role,
                imageUrl,
            })
        })
}

exports.deleteDoctor = (req,res,next)=>{
    Doctor.findByPk(req.params.id)
        .then(doctor => {   
            return doctor.destroy()

        })
        .then(result=>{
            console.log('deleted successfully');
            res.redirect('/departments');
        })
        .catch(err=>{
            console.log(err);
            
        })
}