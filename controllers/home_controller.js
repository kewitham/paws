// I need to re-check this -  depends on Taylor's main page name 
exports.homepage = function(req, res){
	res.render("homepage.handlebars", { myVar: req.user.username })
}