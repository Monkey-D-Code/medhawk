const Department = require('../models/department');
const Doctor = require('../models/doctor');


exports.allDepartments = (req,res,next)=>{
    Promise.all([Department.findAll(),Doctor.findAll()])
        .then(([departments,doctors])=>{
            res.render('department',{
                title:'All departments | Medhawk',
                isAuthenticated : req.session.isAuthenticated,
                departments,
                doctors,
                activeDpt:true,
                empty : departments.length === 0 ? true : false,
            })

        }).catch(err=>{
            console.log(err);
            res.render('department',{
                title:'All departments | Medhawk',
                isAuthenticated : req.session.isAuthenticated,
                activeDepartment:true,
                err,
            })

        })
    
}

exports.createDepartmentPage = (req,res,next)=>{
    if(req.session.isAuthenticated){
        res.render('departments/create',{
            title:'Create department',
            isAuthenticated:req.session.isAuthenticated,
            csrfToken:req.csrfToken(),
            fromCreate:true,
        })
    }else{
        res.redirect('/auth/login');
    }
    
}

exports.createDepartment = (req,res,next)=>{
    if(req.session.isAuthenticated){
        const {name,about,imageUrl} = req.body;
        // validations
        const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        let formErrors = [];
        if(name.length < 4) formErrors.push({field:'name',message:"Name must be minimum 4 characters"});
        if(about.length > 500) formErrors.push({field:'about',message:"Maximum 500 characters allowed"});
        if(!urlRegex.test(imageUrl)) formErrors.push({field:'imageUrl',message:'Enter a valid link'})
        if(imageUrl.length > 500) formErrors.push({field:'imageUrl',message:"Maximum 500 characters allowed"});
        if(formErrors.length === 0){
            Department.create({name,about,imageUrl})
                .then(result=>{
                    console.log(result);
                    res.redirect('/departments');
                })
                .catch(err=>{
                    console.log(err);
                    res.render('departments/create',{
                        title:'Create department | Medhawk',
                        isAuthenticated:req.session.isAuthenticated,
                        err,
                    })
                })
        }else{
            res.render('departments/create',{
                title:'Create department | Medhawk',
                isAuthenticated:req.session.isAuthenticated,
                formErrors,
                name,
                about,
                imageUrl,
            })
        }
    }else{
        res.redirect('/auth/login');
    }
}

exports.updatePage = (req,res,next)=>{
    Department.findByPk(req.params.id)
        .then(department => {
            const {id,name,about,imageUrl} = department;
            res.render('departments/create',{
                title : "Update",
                id,
                name,
                about,
                imageUrl,
                fromUpdate : true,
            })
        })
}

exports.update = (req,res,next)=>{
    const {name , about,imageUrl}= req.body;
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    // validation
    let errors =  [];
    if(!name) errors.push({field:'name',message:'Mandetory field'});
    if(name && name.length < 4) errors.push({field:'name',message:'Too short must be more than 4 characters'});
    if(!urlRegex.test(imageUrl)) errors.push({field:'imageUrl',message:'Invalid link. Enter a proper link'});
    if(!about) errors.push({field:'about',message:'Write someting about the department'});

    if(errors.length > 0){
        res.render('departments/create',{
            title : "Update",
            id:req.params.id,
            name,
            about,
            imageUrl,
            fromUpdate : true,
            formErrors : errors,
        })
    }else{
        Department.findByPk(req.params.id)
            .then(department=>{
                department.name = name;
                department.about = about;
                department.imageUrl = imageUrl;
                department.save()
                    .then(result=>{
                        console.log('updated successfully');
                        res.redirect('/departments');
                    })
                    .catch(err=>{
                        console.log(err);
                        res.render('departments/create',{
                            title : "Update",
                            id:req.params.id,
                            name,
                            about,
                            imageUrl,
                            fromUpdate : true,
                            err,
                        })
                    })

            })
            .catch(err=>{
                console.log(err);
                res.render('departments/create',{
                    title : "Update",
                    id:req.params.id,
                    name,
                    about,
                    imageUrl,
                    fromUpdate : true,
                    err,
                })
            })
    }
    


}

exports.deletePage = (req,res,next)=>{
    Department.findByPk(req.params.id)
        .then(department=>{
            const {id,name,about,imageUrl} = department;
            res.render('departments/delete',{
                title : `Confirm delete | ${name}`,
                id,
                name,
                about,
                imageUrl,
            })
        })
}

exports.delete = (req,res,next)=>{
    Department.findByPk(req.params.id)
        .then(department => {   
            return department.destroy()

        })
        .then(result=>{
            console.log('deleted successfully');
            res.redirect('/departments');
        })
        .catch(err=>{
            console.log(err);
            
        })
}