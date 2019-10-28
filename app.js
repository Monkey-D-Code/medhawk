const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const {Handlebars} = require('express-handlebars')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csrf = require('csurf');

// importing routes
const blogRoutes = require('./routes/blog');
const websiteRoutes = require('./routes/website');
const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const doctorRoutes = require('./routes/doctor');
const brandRoutes = require('./routes/brand');
const appointmentRoutes = require('./routes/appointment');

// importing utilities
const sequelize = require('./utils/database');

// importing models
const Brand = require('./models/brand');
const Service = require('./models/service');

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
const csrfProtection = csrf();
app.use(csrfProtection);

const exhbs = hbs.create({
    extname : 'hbs',
    helpers:{
        truncatewords : (text , value)=>{
            const textArray = text.trim().split(" ");
            textArray.length = value;
            return textArray.join(" ");
        }
    }
})

app.engine('hbs' , exhbs.engine);
app.set('view engine' , 'hbs');
app.use('/static',express.static(path.join(__dirname , 'public')));
app.set('views','views');



app.use((req,res,next)=>{
    Promise.all([
        Service.findAll(),
        Brand.findByPk(1),
    ])
    .then(([services , brand])=>{
        
        res.locals.services = services;
        res.locals.brand = brand;
        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.csrfToken = req.csrfToken();
        
        next();
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/brand/create');
    })
    
})

app.use('/' , websiteRoutes);
app.use('/blog',blogRoutes);
app.use('/auth' , authRoutes);
app.use('/departments',departmentRoutes);
app.use('/doctor',doctorRoutes);
app.use('/brand',brandRoutes);
app.use('/appointment',appointmentRoutes);
app.use((req,res,next)=>{
    res.status(404).render('404',{title:'Page not found'});
})

// sync the databse to models
sequelize.sync().then((result)=>{
    
    app.listen(port , ()=>{
        console.log(`Server running at ${port}`);
    });
}).catch(err=>console.log(err));

