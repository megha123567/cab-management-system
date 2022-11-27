const Admin = require('../models/admin');

module.exports.adminLogin = (req, res, next) => {
    res.render('admin-login');
}

module.exports.adminLoginPost = async (req, res, next) => {
    const { adminemail, adminpassword } = req.body;
    const userFromDb = await Admin.findOne({
        where: { admin_email: adminemail, admin_password: adminpassword }
    });

    if (userFromDb == null) {
        return res.render('admin-login', { message: 'No user with this email or password' })
    }

    req.session.adminId = userFromDb.adminId

    res.render('/');
}

module.exports.adminRegister = (req, res, next)=>{
    res.render('admin-register');
}

module.exports.adminRegisterPost = async(req, res, next)=>{
    const {adminemail, adminpassword} = req.body;
    let existingUser = await Admin.findOne({
        where: {
            admin_email: adminemail,
        }
    });
    if(existingUser){
        return req.render('admin-register', {message: 'Already registered'})
    }
    await Admin.create({
        admin_name: req.body.adminname,
        admin_email: req.body.adminemail,
        admin_password: req.body.adminpassword
    });
    res.redirect('./login')
}