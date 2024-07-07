const models = require('../models')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
exports.register = async (req, res) => {
    const { name, email, password,userName } = req.body;
    console.log('Received request to register with name:', name);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const findEmail = await models.User.findOne({ where: { email: email } })
        if (findEmail === null) {
            const user = await models.User.create({
                name: name,
                email: email,
                password: hashedPassword,
                userName:userName
            });
            res.status(201).json({
                message: "Registration successful",
                user: user
            });
        } else {
            res.status(500).json({
                massage: 'the email is used'
            })
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await models.User.findOne({ where: { email: email } })
        if (user !== null) {
            if (bcrypt.compareSync(password, user.password)) {
                const token=jwt.sign({id:user.id,
                    email:user.email,password:user.password

                },process.env.JWT_SECRET)
                res.status(200).json({
                    accessToken: token
                })
            } else {
                res.status(401).json({
                    massage: 'the password or email is wrong'
                })
            }
        } else {
            res.status(401).json({
                massage: 'the password or email is wrong'
            })
        }
    } catch (e) {

        res.status(500).json(e)
    }
}
exports.getProfile=async(req,res)=>{
    try {
        console.log(req.currentUser.id)
        const user = await models.User.findByPk(req.currentUser.id)
        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.eamil
            }
        })
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}
exports.uploadUserPhoto = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const user = await models.User.findByPk(req.currentUser.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        user.img_uri = url + '/photo/' + req.file.filename;
        await user.save();
        res.status(200).json({
            msg: "The upload of photo is successful",
            img_uri: user.img_uri
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updataProfile=async(req,res)=>{
    const {name,password}=req.body
    try {
        const hashPassword=await bcrypt.hash(password,10)
        const update=await models.User.update({
            name,password:hashPassword
        },{where:{id:req.currentUser.id}})
        res.status(200).json({
            msg: "The updata  of profile is successful",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}