const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");
const blogModel = require("../models/blog_model");
const reportModel = require("../models/report_model");

var md5 = require('md5');

const getApiJwt = async (req, res) => {
  console.log("get geldi");
  const token = await jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.send({ token: token });
};

const checkEmail = async (req, res) => {
  try {
    console.log(req.body);
    const userIsFind = await userModel.findOne({ mail: req.body.email });
    if (userIsFind != null) {
      res.send({ email: true });
    } else {
      res.send({ email: false });
    }
  } catch (error) {
    res.send({ error: true });
  }
};
const checkUserName = async (req, res) => {
  try {
    console.log(req.body);
    const userIsFind = await userModel.findOne({ username: req.body.username });
    console.log(userIsFind)
    if (userIsFind != null) {
      res.send({ username: true });
    } else {
      res.send({ username: false });
    }
  } catch (error) {
    res.send({ error: true });
  }
};
const register = async (req, res) => {
  try {
    console.log(req.body);
      const user = await new userModel({
        username: req.body.username,
        mail: req.body.mail,
        pass: md5(req.body.pass),
        fbuid:req.body.fbuid
      });
      await user.save();
      res.send({ register: "true", user: user });
  } catch (error) {
    res.send({ error: true });
  }
};
const login = async (req, res) => {
  try {
    const userIsFind = await userModel.findOne({$or:[{username:req.body.usernameormail},{mail:req.body.usernameormail}],pass:md5(req.body.pass)});
    if(userIsFind != null){
      res.send({ login: true , user:userIsFind});
    }else{
      res.send({ login: false});
    }
  } catch (error) {
    res.send({ error: true });
  }
};

const loginwithgoogle = async (req, res) => {
  try {
    const userIsFind = await userModel.findOne({mail:req.body.user.email});
    console.log(userIsFind);
    if(userIsFind == null){
      const str = req.body.user.username.replace(/ +/g, "")+"_"+Math.floor(Math.random()*898)+53;
      const user = await new userModel({
        mail:req.body.user.email,
        username:str,
        fbuid:req.body.user.fbuid,
        loginMethod:"google"
      }) 
      await user.save()
      res.send({user , login: false});
    }else{
      await userModel.findByIdAndUpdate(userIsFind._id,{loginMethod:"google"});
      const user = await userModel.findById(userIsFind._id);
      res.send({ login: true, user});
    }
  } catch (error) {
    res.send({ error: true });
  }
};


const getoneblog = async (req, res) => {
 
  const data = req.body;
  console.log(data)
  try {
    const blog = await blogModel.findById(data.blog_id);
    const author = await userModel.findById(blog.blog_author);

    if(blog==null){
      res.send({ blog: false });
    }else{
      res.send({ blog , author});
    }
  } catch (error) {
    res.send({ error: true });
  }
};

const getFollowedsBlogs = async (req, res) => {
  const data = req.body;
  const user = JSON.parse(data.user);
  //console.log(user.following)
  console.log(data);
  try {
  const blogs = await blogModel.find().where('blog_author').in(user.following).sort({ createdAt : -1 }).exec();
    console.log(blogs)
    res.send({ error: false, blogs });
  } catch (error) {
    res.send({ error: true });
  }
};

const getallblogs = async (req, res) => {

  try {
    const blogs = await blogModel.find().sort({ _id : -1 }).limit(20);
    res.send({ blogs });
  } catch (error) {
    res.send({ error: true });
  }
};

const saveBlog = async (req, res) => {
  const data = req.body;
  try {
    const author = await userModel.findById(data.user._id);

    const blog = await new blogModel({
      blog_author: data.user._id,
      blog_author_username:author.username,
      blog_title: data.title,
      blog_text: data.text,
      blog_author_photo:author.photo
    });
    await blog.save();
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};

const getmyblogs = async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    const blogs = await blogModel.find({ blog_author: data._id }).sort({ _id : -1 });
    console.log(blogs)
    res.send({ error: false, blogs });
  } catch (error) {
    res.send({ error: true });
  }
};

const deleteblog = async (req, res) => {
  const data = req.body;
  try {
    const result = await blogModel.findByIdAndDelete(data.blog_id);
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};

const editblog = async (req, res) => {
  const data = req.body;

  try {
    const result = await blogModel.findByIdAndUpdate(data.blog._id, {
      blog_title: data.title,
      blog_text: data.text,
    });
    console.log(data);
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};
const getalluserfromarray = async (req, res) => {
  const data = req.body;
  //console.log(data)
  try {
    const users = await userModel.find().where('_id').in(data.following_array).exec();
   
    res.send({ error: false, users });
  } catch (error) {
    res.send({ error: true });
  }
};
const getmessagingpersondata = async (req, res) => {
  const data = req.body;
  //console.log(data)
  try {
    const user= await userModel.findOne({fbuid:data.person_fbuid})
    res.send({ error: false, user });
  } catch (error) {
    res.send({ error: true });
  }
};

const searchperson = async (req, res) => {
  const data = req.body;
  try {
    const result = await userModel.find({
      _id: { $ne: data.userid },
      $or: [
        { username: { $regex: data.word, $options: "i" } },
        { mail: { $regex: data.word, $options: "i" } },
      ],
    });
    console.log(result);
    res.send({ error: false, searchedUsers: result });
  } catch (error) {
    res.send({ error: true });
  }
};
const searchbestperson = async (req, res) => {
  const data = req.body;
  const user = JSON.parse(data.user);
  //console.log(data);
  try {
    const result = await userModel.find({_id: { $ne: user._id }}).sort({"following":-1}).limit(10)
    //console.log(result);
    res.send({ error: false, users: result });
  } catch (error) {
    res.send({ error: true });
  }
};
const getpersondata = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const person = await userModel.findById(data._id)
    //console.log(result);
    res.send({ error: false, person });
  } catch (error) {
    res.send({ error: true });
  }
};

const followperson = async (req, res) => {
  const data = req.body;
  const user = JSON.parse(data.user);
  console.log(data)
  try {
    const result = await userModel.findOne({_id:user._id,following:data.willfollowpersonid});
    if(result == null){
      await userModel.findByIdAndUpdate(user._id,{ $push: { following: data.willfollowpersonid } });
      await userModel.findByIdAndUpdate(data.willfollowpersonid,{ $push: { followers: user._id } });

      const refuser = await userModel.findById(user._id);
      res.send({ error: false, user:refuser });
    }else{
      await userModel.findByIdAndUpdate(user._id,{ $pull: { following: data.willfollowpersonid } });
      await userModel.findByIdAndUpdate(data.willfollowpersonid,{ $pull: { followers:user._id } });
      const refuser = await userModel.findById(user._id);
      res.send({ error: "followed",user:refuser });
    }
  } catch (error) {
    res.send({ error: true });
  }
};
const reportSystem = async (req, res) => {
  const data = req.body;
  const towhat = req.params.towhat;
  try {
    switch (towhat) {
      case "blog":
        const blog = await blogModel.findById(data.blog_id)
        const reportblog = await new reportModel({report_towhat:towhat,reported_item:blog,reporting_person:data.reporting_person})
        await reportblog.save();
        res.send({error:false})
        break;
      case "person": 
        const person = await userModel.findById(data.reported_id)
        const reportperson = await new reportModel({report_towhat:towhat,reported_item:person,reporting_person:data.reporting_person})
        await reportperson.save();
        res.send({error:false})
        break;
    }
  } catch (error) {
    res.send({error:true})
  }
  
};
const updateprofile = async (req, res) => {
  const data = req.body;
  //console.log(data.user.name);
  try {
    const possible = await userModel.findOne({username:data.username});
    console.log(possible);
    if(possible == null){
      const result = await userModel.findByIdAndUpdate(data.user._id, {
        name:data.name,
        username: data.username,
      });
      await blogModel.updateMany({blog_author:result._id},{blog_author_username:data.username})  ;
      const user = await userModel.findById(result._id)
      res.send({ error: false , user});
    }else{
      res.send({ error: true });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

const changepp = async (req, res) => {
  const data = req.body;
  
  try {
    const result = await userModel.findByIdAndUpdate(data.user._id, {
      photo:data.ppname
    });
    await blogModel.updateMany({blog_author:result._id},{blog_author_photo:data.ppname})  ;
    const user = await userModel.findById(result._id);
    res.send({ error: false , user});
  } catch (error) {
    res.send({ error: true });
  }
};

const changepass = async (req, res) => {
  const data = req.body;
  
  try {
    !data.user_id ?  await userModel.findOneAndUpdate({mail:data.mail},{pass:md5(data.pass)}):
    await userModel.findByIdAndUpdate(data.user_id, {
      pass:md5(data.pass)
    });
    res.send({ error: false});
  } catch (error) {
    res.send({ error: true });
  }
};




module.exports = {
  getApiJwt,
  register,
  login,
  saveBlog,
  getmyblogs,
  deleteblog,
  getoneblog,
  editblog,
  searchperson,
  followperson,
  checkEmail,
  checkUserName,
  getFollowedsBlogs,
  searchbestperson,
  getpersondata,
  getallblogs,
  getalluserfromarray,
  getmessagingpersondata,
  reportSystem,
  loginwithgoogle,
  updateprofile,
  changepp,
  changepass
};
