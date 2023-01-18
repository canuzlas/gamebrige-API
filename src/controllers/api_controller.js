const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");
const blogModel = require("../models/blog_model");
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

const getFollowedsBlogs = async (req, res) => {
  const data = req.body;
  const user = JSON.parse(data.user);
  console.log(user.following)
  try {
  //   const blogs = await blogModel.find({
  //     '_id': { $in:user.following }

      
  // }).sort({date: -1});


  const blogs = await blogModel.find().where('blog_author').in(user.following).exec();
    console.log(blogs)
    res.send({ error: false, blogs });
  } catch (error) {
    res.send({ error: true });
  }
};
const saveBlog = async (req, res) => {
  const data = req.body;
  try {
    const blog = await new blogModel({
      blog_author: data.author,
      blog_title: data.title,
      blog_text: data.text,
    });
    await blog.save();
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};

const getmyblogs = async (req, res) => {
  const data = req.body;
  try {
    const blogs = await blogModel.find({ blog_author: data._id });
    res.send({ error: false, blogs });
  } catch (error) {
    res.send({ error: true });
  }
};

const deleteblog = async (req, res) => {
  const data = req.body;
  try {
    const result = await blogModel.findByIdAndDelete(data._id);
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};

const getoneblog = async (req, res) => {
  const data = req.body;
  try {
    const blog = await blogModel.findById(data._id);
    res.send({ error: false, blog });
  } catch (error) {
    res.send({ error: true });
  }
};
const editblog = async (req, res) => {
  const data = req.body;
  try {
    const result = await blogModel.findByIdAndUpdate(data._id, {
      blog_title: data.title,
      blog_text: data.text,
    });
    console.log(result);
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true });
  }
};
const searchperson = async (req, res) => {
  const data = req.body;
  try {
    const result = await userModel.find({
      $or: [
        { name: { $regex: data.name, $options: "i" } },
        { mail: { $regex: data.name, $options: "i" } },
      ],
    });

    res.send({ error: false, person: result });
  } catch (error) {
    res.send({ error: true });
  }
};
const followperson = async (req, res) => {
  const data = req.body;
  try {
    const result = await userModel.findOne({_id:data._id,following:data.person_id});
    if(result == null){
      const result = await userModel.findByIdAndUpdate(data._id,{ $push: { following: data.person_id } });
      res.send({ error: false });
    }else{
      res.send({ error: "followed" });
    }
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
  followperson,checkEmail,checkUserName,getFollowedsBlogs
};
