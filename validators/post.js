const {checkSchema} = require('express-validator');


module.exports = checkSchema({
    title : {
        notEmpty : {errorMessage : 'A post title is required'},
        
    },
    cover_image_url : {
        notEmpty : {errorMessage : 'A cover image is required'},
        isURL : {errorMessage : 'Provide a valid image link !'}
    },
    body : {
        notEmpty : {errorMessage : 'A post must have a body !'}
    }
})