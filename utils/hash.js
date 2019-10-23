const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(
            password,
            saltRounds,
            (err,hash)=>{
                if(err) reject(err);
                resolve(hash);
            }
        )
    })
}

exports.comparePassword = (password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(
            password,
            hash,
            (err,res)=>{
                if(err) throw TypeError("Comparison failed");
                if(res)resolve(res);
                if(!res)reject(res);
            }
        )
    })
}