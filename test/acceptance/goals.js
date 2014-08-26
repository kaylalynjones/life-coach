/* global describe, before, it, beforeEach */

'use strict';

process.env.DB = 'life-coach-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../app/index'),
    cookie  = null,
    request = require('supertest'); //allows you to act like a browser

//name of controller
describe('goals', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')//logging in
      .send('email=bob@aol.com')
      .send('password=abcd')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /', function(){
    it('should fetch the home page', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Home');
        done();
      });
    });
  });

  describe('get /goals/new', function(){
    it('should show the new goals page', function(done){
      request(app)
      .get('/goals/new')
      .set('cookie', cookie) //attaches your cookie to the request
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });

  describe('post /goals', function(){
    it('should redirect to /goals', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie) //attaches your cookie to the request
      .send('name=become+a+chef&due=2014-08-30&tags=a%2C+b%2C+c%2C+d')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

});//end

