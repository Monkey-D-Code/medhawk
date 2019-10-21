const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

// importing routes
const blogRoutes = require('./routes/blog');
const websiteRoutes = require('./routes/website');
const authRoutes = require('./routes/auth');


const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.engine('hbs' , hbs({
    extname : 'hbs',
    
}));
app.set('view engine' , 'hbs');
app.use('/static',express.static(path.join(__dirname , 'public')));
app.set('views','views');

app.use('/' , websiteRoutes);
app.use('/blog',blogRoutes);
app.use('/auth' , authRoutes);
app.use((re,res,next)=>{
    res.status(404).render('404',{title:'Page not found'});
})


app.listen(port , ()=>{
    console.log(`Server running at ${port}`);
})