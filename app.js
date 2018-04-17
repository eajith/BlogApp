var express = require("express"),
        app = express(),
      parser = require("body-parser"),
   mongoose = require("mongoose"),
 campground = require("./models/campground"),
    comment = require("./models/comment"),
methodOverride = require("method-override"),
      user  = require("./models/user")
     seedDB = require("./seeds"),
  passport  = require("passport"),
 localStategy = require("passport-local");
     flash  = require("connect-flash");

var commentRoutes    = require("./routes/campground"),
    campgroundRoutes = require("./routes/comment"),
    indexRoutes      = require("./routes/index");

 // seedDB();  //seeding the database 

app.use(methodOverride("_method"));

app.use(require("express-session")({
	secret : "hello how are you",
	resave : false,
	saveUninitialized : false
}));
app.use(parser.urlencoded({extended:true}));
app.use(express.static(__dirname +"/public"))
app.set("view engine", "ejs");
console.log(process.env.DATABASEURL+ " "+ process.env.PORT);
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://ajith:ajith@ds129939.mlab.com:29939/yelpamp");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
	return next();
});


app.use(flash());

app.use("/",indexRoutes);
app.use("/campground",commentRoutes);
app.use("/campground/:id/comments",campgroundRoutes)


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started");
});