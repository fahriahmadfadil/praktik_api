const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UsersTable = require('../model/users.model');

const createUser = async(req,res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const dateNow = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
        const timeNow = `${now.getHours()}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const created_at = dateNow+" "+timeNow;
        console.log(created_at)

        // Hash password (proses enkripsi )
        const saltRound = 12;
        const encryptPassword = await bcrypt.hash(password, saltRound);

        const data = {
            name : name,
            email : email,
            password : encryptPassword,
            created_at: created_at
        }

        const createUser = await UsersTable.create(data);
        if(createUser){
            res.status(200).json({
                message : 'Success to create user'+name
            })
        }else{
            res.status(500).json({
                message: 'Failed to create user'+name
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to create user'
        })
    }
}

const processLogin = async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const checkEmail = await UsersTable.findOne({where : {email}});
        if(checkEmail){
            // Cek password yang diinputkan dengan yg ada didatabase
            // 1. Ambil original password dari input user
            const originalPass = password;
            // 2. ambil password dari db
            const passwordDB = checkEmail.password;
            // 3. compare apakah match atau tidak
            const checkPass = await bcrypt.compare(originalPass, passwordDB);
            if(checkPass){
                // Berhasil login
                const SECRET_KEY = process.env.SECRET_KEY;
                const createToken = jwt.sign({email:email, name:checkEmail.name},
                    SECRET_KEY, {expiresIn : '1d'}
                )

                return res.status(200).json({
                    message: 'Success login',
                    token : createToken
                })
            }else{
                // Gagal Login
                return res.status(401).json({
                    message: 'Failed login, wrong password'
                })
            }
        }else{
            return res.status(401).json({message : 'Account not found'});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'Error when try login'})
    }
}   

module.exports = {createUser, processLogin}