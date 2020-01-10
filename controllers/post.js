const {validationResult} = require('express-validator');
const chalk = require('chalk');

// importing model
const Post = require('../models').post;
const Category = require('../models').category;



exports.allPosts = (req,res,next)=>{
    Promise.all([
        Post.findAll(),
        Category.findAll(),
    ])
        .then(([posts,categories])=>{
            res.render('post/post-list',{
                title : 'All posts | Medhawk',
                posts,
                categories,
            })

        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('post/post-list',{
                title : 'All posts | Medhawk',
                err,
            })
        })

}

exports.createPostPage = (req,res,next)=>{
    const category_id = req.params.id;
    Category.findByPk(category_id)
        .then(category=>{
            res.render('post/form' , {
                title : 'Create new Post | Medhawk',
                fromCreate : true,
                category,
            })
        })
        .catch(err=>{
            console.log(chalk.red(err))
            res.render('post/form' , {
                title : 'Create new Post | Medhawk',
                fromCreate : true,
                err,
            })
        })
    
}

exports.createPost = (req,res,next)=>{
    const category_id = req.params.id;
    const fieldErrors = validationResult(req);
    Category.findByPk(category_id)
        .then(category=>{
            if(fieldErrors.errors.length > 0){
                res.render('post/form',{
                    title : 'Create new post error | Medhawk',
                    fieldErrors,
                    category,
                    post : req.body,
                    fromCreate : true,   
                })
            }else{
                Post.create({...req.body , categoryId : category.id})
                    .then(newPost=>{
                        res.redirect(`/post/${newPost.id}/details`)
                    })
                    .catch(err=>{
                        console.log(chalk.red(err));
                        res.render('post/form',{
                            title : 'Create new post error | Medhawk',
                            err,
                            fromCreate : true, 
                            category,
                            post : req.body,
                        })
                    })
            }
        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('post/form',{
                title : 'Create new post error | Medhawk',
                err,
                fromCreate : true, 
                post : req.body,
            })
        })
}

exports.postDetails = (req,res,next)=>{
    Post.findByPk(req.params.id)
        .then(post=>{
            res.render('post/post-details',{
                title : `${post.title} | Medhawk`,
                post,
            })

        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('post/post-details',{
                title : `POst error | Medhawk`,
                err,
            })
        })
}

exports.postUpdatePage = (req,res,next)=>{
    Post.findByPk(req.params.id)
        .then(post=>{
            res.render('post/form',{
                title : `${post.title} | Medhawk`,
                post,
                fromUpdate : true, 
            })
        })
        .catch(err=>{
            console.log(chalk.red(err));
            res.render('post/form',{
                title : 'Update post error | Medhawk',
                err,
                fromUpdate : true, 
            })

        })
}

exports.postUpdate = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('post/form',{
            title : `${req.body.title} | Medhawk`,
            post  :req.body,
            fieldErrors,
            fromUpdate : true, 
        })

    }else{
        const {
            title,
            cover_image_url,
            body,
        } = req.body;
        Post.findByPk(req.params.id)
            .then(post=>{
                post.title = title;
                post.cover_image_url = cover_image_url;
                post.body = body;
                return post.save();
                
            })
            .then(newPost=>res.redirect(`/post/${newPost.id}/details`))
            .catch(err=>{
                console.log(chalk.red(err));
                res.render('post/form',{
                    title : 'Update post error | Medhawk',
                    err,
                    fromUpdate : true, 
                })
            })
    }
}

exports.confirmDeletePostPage = (req,res,next)=>{
    Post.findByPk(req.params.id)
        .then(post=>{
            res.render('post/confirm_delete',{
                title : `${post.title} | Delete ?`,
                post,
            })
        })
        .catch(err=>{
            console.log(chalk.red(err));
                res.render('post/confirm_delete',{
                    title : 'Delete post error | Medhawk',
                    err,
                    
                })
        })
}

exports.deletePost = (req,res,next)=>{
    Post.findByPk(req.params.id)
        .then(post=>post.destroy())
        .then(result=>res.redirect('/category'))
        .catch(err=>{
            console.log(chalk.red(err));
                res.render('post/confirm_delete',{
                    title : 'Delete post error | Medhawk',
                    err,
                    
                })
        })
}