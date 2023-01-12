const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");
const blogModel = require("../models/blog_model");

const getApiJwt = async (req, res) => {
  console.log("get geldi");
  const token = await jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.send({ token: token });
};
const postApiJwt = async (req, res) => {
  const data = req.body;
  try {
    const result = await jwt.verify(data.token, process.env.JWT_SECRET);
    result ? res.send({ error: "false" }) : res.send({ error: "true" });
  } catch (error) {
    res.send({ error: true });
  }
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
const registerOrLogin = async (req, res) => {
  try {
    console.log(req.body.user);
    const userIsFind = await userModel.findOne({ mail: req.body.user.email });
    if (userIsFind != null) {
      console.log("if");
      res.send({ login: "true", user: userIsFind });
    } else {
      console.log("else");
      const user = await new userModel({
        name: req.body.user.name,
        mail: req.body.user.email,
        photo: req.body.user.photo,
      });
      const res = await user.save();
      res.send({ login: "false", user: user });
    }
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
  postApiJwt,
  registerOrLogin,
  saveBlog,
  getmyblogs,
  deleteblog,
  getoneblog,
  editblog,
  searchperson,
  followperson,checkEmail
};
