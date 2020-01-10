const {checkSchema}  = require('express-validator');

exports.create = checkSchema({
    name: {
        notEmpty : {errorMessage : 'Category Name is Necessary'},
        isLength : {
            errorMessage : 'Name must be between 4 & 40 characters',
            options : {
                max : 40,
                min : 4,
            }
        }
    },
    image_url : {
        notEmpty : {errorMessage : 'An image for category is required'},
        isURL : {errorMessage:'Provide a valid image link'}
    },
    description : {
        notEmpty : {errorMessage : 'Write something about the category'},
    }
})