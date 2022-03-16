const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const router = express.Router();
const jwt = require("jsonwebtoken");
const withAuth = require("../middlewares/auth");
const { findByIdAndUpdate } = require('../models/user');
require("dotenv").config();

//Registrar usuário
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const secret = process.env.SECRET;

  try {

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already created" });
    }

    bcrypt.hash(password, 10, async (error, hash) => {

      if (error) {
        return res.status(400).json({ message: "Failed a create the hash of user" })
      }

      let userCreate = {
        name,
        email,
        password: hash
      };

      const token = jwt.sign({ email }, secret, { expiresIn: 86400 });

      const user = await User.create(userCreate);

      user.password = undefined

      res.status(201).json({ user, token });

    })

  } catch (error) {
    return res.status(400).json({
      message: "Failed a create the new user",
      error
    })
  }

});

//Logar Usuário
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const secret = process.env.SECRET;

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.password = undefined;

    const token = jwt.sign({ email }, secret, { expiresIn: 86400 });

    res.status(200).json({ user, token });

  } catch (error) {
    return res.status(400).json({
      message: "Failed a login of user",
      error
    })
  }
})

//Verificar token
router.get("/token", async (req, res) => {
  const token = req.headers["x-access-token"];

  const secret = process.env.SECRET

  try {

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(400).send(false);
      }

      const user = await User.findOne({ email: decoded.email });

      if (user) {
        return res.status(200).send(true);
      } else {
        return res.status(400).send(false);
      }
    })

  } catch (error) {
    return res.status(400).json({
      message: "Failed verify token of user",
      error
    })
  }
})

//Mudar Nome do usuário
router.put("/profile/name", withAuth, async (req, res) => {

  const { name } = req.body;

  try {

    await User.findByIdAndUpdate(req.user._id, { name });
    return res.status(200).json({ message: "Name updated with success", name });

  } catch (error) {
    return res.status(400).json({
      message: "Failed update the name",
      error
    })
  }

});

//Mudar Email do usuário
router.put("/profile/email", withAuth, async (req, res) => {

  const {email} = req.body;

  const secret = process.env.SECRET;

  try {

    if(await User.findOne({email})){
      return res.status(400).json({message: "Email already used"})
    }

    const token = jwt.sign({ email }, secret, { expiresIn: 86400 });

    await User.findByIdAndUpdate(req.user._id, {email});
    return res.status(200).json({message: "Email updated with success", email, token});

  } catch (error) {
    return res.status(400).json({
      message: "Failed update the email",
      error
    })
  }

});

//Mudar Nome e Email do usuário
router.put("/profile", withAuth, async (req, res) => {

  const { name, email } = req.body;

  const secret = process.env.SECRET;

  try {

    if(await User.findOne({email})){
      return res.status(400).json({message: "Email already used"})
    }

    const token = jwt.sign({ email }, secret, { expiresIn: 86400 });

    await User.findByIdAndUpdate(req.user._id, { name, email });
    return res.status(200).json({ message: "Name updated with success", name, email, token });

  } catch (error) {
    return res.status(400).json({
      message: "Failed update the name or email",
      error
    })
  }

});

//Mudar Password
router.put("/profile/password", withAuth, (req, res) => {

  const {password} = req.body;

  const secret = process.env.SECRET;

  try {
    
    bcrypt.hash(password, 10, async (error, hash) => {

      if (error) {
        return res.status(400).json({ message: "Failed a create the hash of user" })
      }

      await User.findByIdAndUpdate(req.user._id, {password: hash});

      res.status(200).json({ message: "Password updated with success" });

    })

  } catch (error) {
    return res.status(400).json({
      message: "Failed update the password",
      error
  })
  }

});

module.exports = router;
