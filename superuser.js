const bcrypt = require('bcrypt');

const standerdInput = process.stdin;
standerdInput.setEncoding('utf-8');

console.log("Enter the password to be hashed");
standerdInput.on('data',(data)=>{

    if(data==='exit'){
        process.exit();
    }else{

        bcrypt.genSalt(10,(err,salt)=>{
            if(err)console.log(err)
            bcrypt.hash(data, salt , (err,hash)=>{
                if(err)console.log(err);
                console.log(`Hash : ${hash}`);
            })
        })
        
        
    }

})