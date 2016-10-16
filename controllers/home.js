// I need to re-check this
exports.homepage = function(req, res){
	res.render("homepage.handlebars", { myVar: req.user.username })
}