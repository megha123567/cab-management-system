module.exports.logout = (req, res, next)=>{
    console.log('33333333333333333333333333333')
    req.session.passengerId = null;
    // req.session.driverId = null;
    return res.redirect('/login')
}


