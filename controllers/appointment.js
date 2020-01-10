const Appointment = require('../models').appointment;

exports.addAppointmentPage = (req,res,next)=>{
    res.render('apointment' ,{
        title : 'Appointment | Medhawk',
    });
}


exports.addAppointment = (req,res,next)=>{
    const {fullName,email,phoneNumber,problem,address} = req.body;

    let formErrors = []
    if(!fullName) formErrors.push({field:'fullName',message:'Must enter your name'});
    if(!email) formErrors.push({field:'email',message:'Must enter your email'});
    if(!phoneNumber) formErrors.push({field:'phoneNumber',message:'Must enter your phone number'});
    if(!problem) formErrors.push({field:'problem',message:'You must enter some message to the Medhawk officials'});
    if(!address) formErrors.push({field:'address',message:'Must enter your address'});
    if(phoneNumber && phoneNumber.length !=10) formErrors.push({field:'phoneNumber',message:'Must be 10 digits exactly'});

    if(formErrors.length > 0){
        res.render('apointment' ,{
            title : 'Appointment | Medhawk',
            fullName,
            email,
            phoneNumber,
            problem,
            address,
            formErrors,
        });
    }else{
        Appointment.create({
            fullName,
            email,
            phoneNumber,
            problem,
            address,
            creationDate : Date.now(),
        })
        .then(result=>{
            console.log(result);
            res.render('apointment' ,{
                title : 'Appointment | Medhawk',
                successMsg : "Appointment booked Successfully. You will be informed of the date & time via email."
            });
        })
        .catch(err=>{
            console.log(err);
            res.render('apointment' ,{
                title : 'Appointment | Medhawk',
                fullName,
                email,
                phoneNumber,
                problem,
                address,
                err,
            });
        })

    }

}