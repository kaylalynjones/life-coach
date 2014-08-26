/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal      = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('.create', function(){
    it('should create a goal', function(done){
      var body = {name:'become a chef', due:'2014-08-30', tags:'a, b, c, d'},
      userId = Mongo.ObjectID('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.name).to.equal('become a chef');
        expect(goal.due).to.be.instanceof(Date);
        expect(goal.tags).to.have.length(4);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find users goals', function(done){
      var userId = Mongo.ObjectID('000000000000000000000001');
      Goal.findAllByUserId(userId, function(err, goals){
        expect(goals).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a goal', function(done){
      var goalId = 'a00000000000000000000003',
          userId = '000000000000000000000002';
      Goal.findById(goalId, userId, function(err, goal){
        expect(goal.name).to.equal('Lose Weight');
        done();
      });
    });
    it('should not find a goal', function(done){
      var goalId = 'a00000000000000000000003',
          userId = '000000000000000000000001';
      Goal.findById(goalId, userId, function(err, goal){
        expect(goal).to.be.null;
        done();
      });
    });
  });

  describe('#addTask', function(){
    it('should add a task to a goal', function(done){
      var goalId = 'a00000000000000000000003',
          userId = '000000000000000000000001',
          task   = {
            name:'Get Shoes',
            description:'Buy some awesome and colorful shoes!',
            difficulty:'Easy',
            rank:'1'
          };
      Goal.findById(goalId, userId, function(err, goal){
        goal.addTask(task, function(err, goal){
          expect(goal.tasks).to.have.length(1);
          done();
        });
      });
    });
  });
});//end

