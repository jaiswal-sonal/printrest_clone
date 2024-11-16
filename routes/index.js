
 var express = require('express');
   var router = express.Router();

  const userModel=require("./users");
  const postModel=require("./posts");
 const multer=require("multer");
  const uploads= multer({dest:"./uploads"});

  const passport=require("passport");


 
 

  const localStrategy=require("passport-local");
  passport.use(new localStrategy(userModel.authenticate()));
  /* GET home page. */
  router.get("/",function(req,res,next){
    res.render("index",{tittle:"express"});


  });


  router.get("/login",function(req,res,next){   res.render("login" ,{ error:req.flash("error")});
   });



  router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash:true
  }));
  router.get("/feed",function(req,res,next){
    res.render("feed");
  });

  router.post("/upload", isLoggedIn  ,uploads.single
  ("file"),  async function(req, res) {
   if (!req.file) {
  
   return  res.status(400).send("No files were uploaded");
   } 
   const user=await userModel.findOne({username:req.session.passport.user});

   const post=await  postModel.create({
     image:req.file.filename,
     imageText:req.body.filecaption,
     user:user._id
   })
   console.log(req.body);
   console.log(req.file);
    user.posts.push(post._id);
     await user.save();
    res.redirect("/profile");
  });




  router.post("/upload", isLoggedIn, uploads.single("file"),(req,res) =>{
  
     if(!req.file){
       return res.status(400).send("no files were uploaded");
    }
     res.send("file uploaded sucessfully");
  });

//   router.get("/profile", isLoggedIn, async function(req,res,next){
//     const user=await userModel.findOne({
//       username: req.session.passport.user
//     })
//     .populate("Post")
//     console.log(user);
//     res.render("profile",{user});
//  });

router.get("/profile", isLoggedIn, async function(req, res, next) {
  try {
      const user = await userModel.findOne({ username: req.session.passport.user })
      .populate("posts");
     console.log(user);
      res.render("profile", { user });
  } catch (error) {
      // Handle errors
      next(error);
  }
});






 router.post("/register",function(req,res){
   const { username,email,fullname}=req.body;
    const userData=new userModel({username,email,fullname});


   userModel.register(userData,req.body.password)
   .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
   })
  });

  router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash:true
  }));
  


  router.get("/logout",function(req,res ,next ){
         req.logout(function(err){
          if(err){return next (err);}
         res.redirect("/");
     });
  })


  function isLoggedIn(req,res,next){

   if(req.isAuthenticated()) return next();

   res.redirect("/login");
  }

  module.exports = router;


// var express = require('express');
// var router = express.Router();

// const userModel = require("./users");
// const postModel = require("./post");
// const passport = require('passport');
// const upload = require('./multer');

// const localStrategy = require("passport-local");
// passport.use(new localStrategy(userModel.authenticate()))




// router.get('/', (req, res) => {
//   const title = 'Your Page Title'; 
//   res.render('index', { title }); 
// });


// router.get('/login', function(req, res) {
//   res.render('login', {error: req.flash('error')});
// });

// router.get('/feed', function(req, res) {
//   res.render('feed', { title: 'Express' });
// });

// router.post('/upload',isLoggedIn, upload.single('file'),async function(req, res,next) {
//   if(!req.file){
//     return res.status(404).send("no files were given");
//   }
//   const user = await userModel.findOne({username: req.session.passport.user});
//    const post = await postModel.create({
//     image: req.file.filename,
//     postText: req.body.filecaption,
//     user: user._id
//   });
//    await user.posts.push(post._id);
//    res.send("done");
// });


// router.get('/profile',isLoggedIn, async (req, res) => {
//   try {
//     const user = await userModel.findOne({ username: req.session.passport.user });
//     if (user) {
//       res.render("profile", { user });
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// router.post("/register", function(req,res){
//   const { username, email, fullname } = req.body;
//   const userData = new userModel({ username, email, fullname});
  
//   userModel.register(userData,req.body.password).then(function(){
//     passport.authenticate("local")(req,res,function(){
//       res.redirect("/profile");
//     })
//   })
// })



// router.post("/login",passport.authenticate("local",{
//   successRedirect:"/profile",
//   failureRedirect:"/login",
//   failureFlash:true
// }), function(req,res){
  
// });

// router.get('/logout', function(req, res){
//   req.logout(function(err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });



// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }



// module.exports = router;











