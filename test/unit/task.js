/* jshint expr:true */
/* global describe, it */

'use strict';

var expect    = require('chai').expect,
    Task      = require('../../app/models/task');

describe('Task', function(){
  it('should create a task', function(){
    var body   = {
      name:'Get Shoes',
      description:'Buy some awesome and colorful shoes!',
      difficulty:'Easy',
      rank:'1'
    },
    task = new Task(body);
    expect(task).to.be.okay;
    expect(task).to.be.instanceof(Task);
    expect(task.name).to.be.equal('Get Shoes');
  });
});
