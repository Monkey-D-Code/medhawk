const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// importing routes
const blogRoutes = require('./routes/blog');
const websiteRoutes = require('./routes/website');
const authRoutes = require('./routes/auth');

// importing utilities
const sequelize = require('./utils/database');

// testing database connection


const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:"fjhgfjghfvjtyvjytfjvtyvfghfjytrutyrvutyvrjujyfv",
    resave:false,
    saveUninitialized:false,
    store: new SequelizeStore({db:sequelize}),
}));

app.engine('hbs' , hbs({
    extname : 'hbs',  
}));
app.set('view engine' , 'hbs');
app.use('/static',express.static(path.join(__dirname , 'public')));
app.set('views','views');

app.use('/' , websiteRoutes);
app.use('/blog',blogRoutes);
app.use('/auth' , authRoutes);
app.use((req,res,next)=>{
    res.status(404).render('404',{title:'Page not found'});
})

// sync the databse to models
sequelize.sync().then((result)=>{
    
    app.listen(port , ()=>{
        console.log(`Server running at ${port}`);
    });
}).catch(err=>console.log(err));

