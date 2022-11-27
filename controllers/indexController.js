module.exports.index = (req, res, next)=>{
    res.render('index')
}


module.exports.aboutus = (req, res, next)=>{
    res.render('aboutus')
}

module.exports.askedQuestions = (req, res, next)=>{
    res.render('asked_questions')
}

module.exports.contactus = (req, res, next)=>{
    res.render('contactus')
}

