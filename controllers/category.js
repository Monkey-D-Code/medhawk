const {validationResult} = require('express-validator');
const chalk = require('chalk');

// importing model
const Category = require('../models').category;

exports.allCategoriesPage = (req,res,next)=>{
    Category.findAll()
        .then(categories=>{
            res.render('category/all-categories',{
                title  : 'All Categories | Medhawk',
                categories,
            })
        })
        .catch(err=>{
            console.log(err);
            res.render('category/all-categories',{
                title  : 'All Categories | Medhawk',
                err,
            })
        })
    
}

exports.createCategoryPage = (req,res,next)=>{
    res.render('category/form',{
        title : 'Create New Category | Medhawk',
        fromCreate : true,
    })
}

exports.createCategory = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.status(400)
            .render('category/form',{
                title : 'Create New Category | Medhawk',
                fromCreate : true,
                fieldErrors,
                category : req.body,
            })
    }else{
        Category.create(req.body)
            .then(result=>{
                res.redirect('/category');
            })
            .catch(err=>{
                res.status(500)
                    .render('category/form',{
                        title : 'Create New Category | Medhawk',
                        fromCreate : true,
                        err,
                        category : req.body,
                    })
            })
    }
}

exports.categoryDetailsPage =(req,res,next)=>{
    Category.findByPk(req.params.id,{include:['posts']})
        .then(category=>{
            res.render('category/category-details',{
                title : `${category.name} | Medhawk`,
                category,
                posts:category.get().posts,
            })
        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('category/category-details',{
                title : 'Category Details | Medhawk',
                err,
            })
        })
}

exports.categoryUpdatePage = (req,res,next)=>{
    Category.findByPk(req.params.id)
        .then(category=>{
            res.render('category/form',{
                title : `${category.name} | Update | Medhawk`,
                category,
                fromUpdate : true,
            })

        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('category/form',{
                title : 'Update Category | Medhawk',
                err,
            })
        })
}

exports.categoryUpdate = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('category/form',{
            title : 'Update Category | Medhawk',
            fieldErrors,
            fromUpdate : true,
            category : req.body,
        })
    }else{
        const {
            name,
            image_url,
            description,
        } = req.body;
        Category.findByPk(req.params.id)
            .then(category=>{
                category.name = name;
                category.image_url = image_url;
                category.description = description;
                return category.save();
            })
            .then(result=>res.redirect(`/category/${result.id}/details`))
            .catch(err=>{
                console.log(chalk.red(err))
                res.render('category/form',{
                    title : 'Update Category | Medhawk',
                    err,
                    fromUpdate : true,
                    category : req.body,
                })
            })
    }
    
        
}

exports.categoryDeletePage = (req,res,next)=>{
    Category.findByPk(req.params.id)
        .then(category=>{
            res.render('category/confirm_delete',{
                title : `${category.name} | confirm delete ?`,
                category,
            })
        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('category/confirm_delete',{
                title : 'Delete Category | Error | Medhawk',
                err,
            })
        })
}
exports.categoryDelete = (req,res,next)=>{
    Category.findByPk(req.params.id)
        .then(category=>category.destroy())
        .then(result=>res.redirect('/category'))
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('category/confirm_delete',{
                title : 'Delete Category | Error | Medhawk',
                err,
            })
        })
}