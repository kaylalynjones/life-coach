'use strict';


function Task(obj){
  this.name        = obj.name;
  this.description = obj.description;
  this.difficulty  = obj.difficulty;
  this.rank        = parseInt(obj.rank);
  this.isComplete  = false;
}


module.exports = Task;
