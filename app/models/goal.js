'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    Task  = require('../models/task');

function Goal(o, userId){
  this.name   = o.name;
  this.due    = new Date(o.due);
  this.tags   = o.tags.split(',');
  this.userId = userId;
  this.tasks  = [];
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, userId, cb){
  var goal = new Goal(o, userId);
  Goal.collection.save(goal, cb);
};

Goal.findAllByUserId = function(userId, cb){
  Goal.collection.find({userId:userId}).toArray(function(goals){
    goals = _.create(Goal.prototype, goals);
    cb(goals);
  });
};

Goal.findById = function(goalId, userId, cb){
  goalId = Mongo.ObjectID(goalId);
  userId = Mongo.ObjectID(userId);
  Goal.collection.findOne({_id:goalId, userId:userId}, function(goal){
    goal = _.create(Goal.prototype, goal);
    cb(goal);
  });
};

Goal.prototype.addTask = function(body, cb){
  var task = new Task(body);
  this.tasks.push(task);
  Goal.save(this, cb);

};

module.exports = Goal;
