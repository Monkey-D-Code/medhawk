const Service = require('../models/service');

exports.createServicePage = (req,res,next)=>{
    if(req.session.isAuthenticated){
        res.render('services/create_service',{
            title:'Create a Service | Medhawk',
            isAuthenticated : req.session.isAuthenticated,
            csrfToken:req.csrfToken(),
        })
    }else{
        res.redirect('/auth/login');
    }
    
}
exports.createService = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }else{
        const {heading,description,imageUrl} = req.body;
        Service.create({
            heading,
            description,
            imageUrl,
        }).then((result)=>{
            console.log(result);
            res.redirect('/services');
        }).catch((err)=>{
            console.log(err);
            res.render('services/create_service' , {
                title:'Create a Service | Medhawk',
                errorMessage : err,
            });

        })
    }
    
   

}
exports.allServices = (req,res,next)=>{
    Service.findAll()
        .then(services=>{
            res.render('services' ,{
                title : 'Our Services | Medhawk',
                activeServices : true,
                services,
                isAuthenticated : req.session.isAuthenticated,
            });
        }).catch(err=>{
            console.log(err);
            res.render('services' ,{
                title : 'Our Services | Medhawk',
                activeServices : true,
                err,
                isAuthenticated : req.session.isAuthenticated,
            });
        })
    
}
exports.singleService = (req,res,next)=>{
    Service.findAll({where:{id:req.params.id}})
        .then((services)=>{
            res.render('services/service_details',{
                title : services[0].heading,
                service:services[0],
                isAuthenticated : req.session.isAuthenticated,
            })

        })
        .catch(err=>{
            console.log(err);
            res.render('services/service_details',{
                title : 'Unable to find product',
                err,
                isAuthenticated : req.session.isAuthenticated,
            })
        })
}

exports.updateServicePage = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }else{
        Service.findAll({where:{id:req.params.id}})
        .then(services=>{
            const {id,heading , description,imageUrl} = services[0];
            res.render('services/update_service',{
                title:`Update ${heading}`,
                id,
                heading,
                description,
                imageUrl,
                isAuthenticated : req.session.isAuthenticated,
                csrfToken:req.csrfToken(),
            });
            
        })
        .catch(err=>{
            console.log(err);
            res.render('services/update_service',{
                title:'Service not found',
                err,
            })
        })
    }
    

}
exports.updateService = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }
    const {heading,description,imageUrl} = req.body;
    const id = req.params.id;
    Service.findByPk(id)
        .then(service=>{
            service.heading = heading;
            service.description = description;
            service.imageUrl = imageUrl;
            service.save()
                .then(result=>{
                    console.log("Updated Successfully");
                    res.redirect(`/service/${id}`);
                })
                .catch(err=>{
                    console.log(err);
                    res.render('services/update_service',{
                        title:`Update ${heading}`,
                        id,
                        heading,
                        description,
                        imageUrl,
                        err,
                    });
                })
        })
        .catch(err=>{
            console.log(err);
            res.render('services/update_service',{
                title:`Update ${heading}`,
                id,
                heading,
                description,
                imageUrl,
                err,
            });
        })

}
exports.destroyServicePage = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }else{
        Service.findByPk(req.params.id)
        .then((service)=>{
            const {heading,imageUrl,id} = service;
            res.render('services/destroy_service',{
                title : `Delete ${heading}`,
                id,
                heading,
                imageUrl,
                isAuthenticated : req.session.isAuthenticated,
                csrfToken:req.csrfToken(),
            })
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/services');
        })
    }
    
}

exports.destroyService = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/auth/login');
    }else{
        Service.findByPk(req.params.id)
        .then(service=>{
            return service.destroy();
        })
        .then(result=>{
            console.log('Deleted Successfully');
            res.redirect('/services');
        })
        .catch(err=>{
            console.log(err);
        })
    }   
    
}