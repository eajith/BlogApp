var express = require("express");
var router  = express.Router();
var passport = require("passport");
var user = require("../models/user");


//route route
router.get("/",function(req, res){
	res.render("landing");
});

//registerform router
router.get("/register",function(req, res){
	res.render("auth/register");
});


//handle signup  login
router.post("/register",function(req, res){
	user.register(new user({username : req.body.username}),req.body.password,function(err, user){
		if(err){
			req.flash("error",err.message);
			return res.render("auth/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success","successfully registered");
			res.redirect("/campground");
		});		
	});
});

//login router
router.get("/login",function(req, res){
	res.render("auth/login");
});


//handle login route
router.post("/login", passport.authenticate("local", {
	successRedirect : "/campground",
	failureRedirect : "/login"
}),function(req, res){
});


//logout route
router.get("/logout",function(req, res){
	req.logout();
	req.flash("success","successfully logged OUT");
	res.redirect("/campground");
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;