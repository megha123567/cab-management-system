const Payment = require('../models/payment');

module.exports.paymentIndex = (req, res,next)=>{
    Payment.findAll().then(payment=>{
        res.render('payment-index',{
            data: payment
        });
    })
}

module.exports.paymentCreate = (req, res, next)=>{
    res.render('payment-create');
}

module.exports.paymentCreatePost = (req, res, next)=>{
    Payment.create({
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        cost: req.body.cost
    });
    res.redirect('/')
}

module.exports.paymentUpdate = (req, res, next)=>{
    Payment.findByPk(req.params.payment_id)
    .then(user =>{
        res.render('payment-update',{
            data: user
        })
    });
}

module.exports.paymentUpdatePost = async(req, res, next)=>{
    var user = await Payment.findByPk(req.params.driver_id);
    await Driver.update(
        {
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        cost: req.body.cost
        },
        {
            where: { payment_id: req.params.payment_id}
        }
        
    )
    res.redirect('/')
}

module.exports.paymentDelete = async(req, res, next)=>{
    let paymentid = req.params.payment_id;
    let user = await Payment.findByPk(paymentid);
    if(user){
        await Payment.destroy({
            where: {
                payment_id : paymentid
            }
        });
        res.redirect('/');
    }
}


