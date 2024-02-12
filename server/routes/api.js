var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: {type: String},
  password: {type: String},
});

const User = mongoose.model('Users', usersSchema)

