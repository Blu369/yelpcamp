var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema ({
	name: String,
	image: String,
	description: String,
	file: Buffer
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "http://localhost:3000/pics/IMG_2664.JPG",
// 		description: "This a huge granite hill, no bathrooms. No water. Beautiful granite!"

// 	}, 
// 	function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});




// var campgrounds = [
// 		{name: "Salmon Creek", image: "http://localhost:3000/pics/IMG_2663.JPG"},
// 		{name: "Granite Hill", image: "http://localhost:3000/pics/IMG_2664.JPG"},
// 		{name: "Mountain Goat's Rest", image: "http://localhost:3000/pics/IMG_2665.JPG"},
// 		{name: "Salmon Creek", image: "http://localhost:3000/pics/IMG_2663.JPG"},
// 		{name: "Granite Hill", image: "http://localhost:3000/pics/IMG_2664.JPG"},
// 		{name: "Mountain Goat's Rest", image: "http://localhost:3000/pics/IMG_2665.JPG"},
// 		{name: "Salmon Creek", image: "http://localhost:3000/pics/IMG_2663.JPG"},
// 		{name: "Granite Hill", image: "http://localhost:3000/pics/IMG_2664.JPG"},
// 		{name: "Mountain Goat's Rest", image: "http://localhost:3000/pics/IMG_2665.JPG"}
// 	]



app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from the DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
	
});
// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){	
	// get data from form and add to campgrounds array
	var name = req.body.name
	var image = req.body.image
	var desc = req.body.description
	var file = req.body.file

	var newCampground = {name: name, image: image, description: desc, file: file}
	// Create new campground and save to DB 
	Campground.create(newCampground, function(err, newlyCreated){
		 if(err){
		 	console.log(err);
		 } else {
		 	// redirect back to campgrounds page
			res.redirect("/campgrounds");
		 }
	});
	
});
// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// SHOW - shows more info about one campground  
app.get("/campgrounds/:id", function(req, res){
	// find campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});		
});

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started!");
});