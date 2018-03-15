var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

var campgrounds = [
		{name: "Salmon Creek", image: "pics/IMG_2663.JPG"},
		{name: "Granite Hill", image: "pics/IMG_2664.JPG"},
		{name: "Mountain Goat's Rest", image: "pics/IMG_2665.JPG"},
		{name: "Salmon Creek", image: "pics/IMG_2663.JPG"},
		{name: "Granite Hill", image: "pics/IMG_2664.JPG"},
		{name: "Mountain Goat's Rest", image: "pics/IMG_2665.JPG"},
		{name: "Salmon Creek", image: "pics/IMG_2663.JPG"},
		{name: "Granite Hill", image: "pics/IMG_2664.JPG"},
		{name: "Mountain Goat's Rest", image: "pics/IMG_2665.JPG"}
	]



app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	res.send("YOU HIT THE POST ROUTE");
	// get data from form and add to campgrounds array
	var name = req.body.name
	var image = req.body.image
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started!");
});