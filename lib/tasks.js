var db = require('./db');
var _ = require('underscore')

var tasks = {
  getAll: function(cb){
    db.tasks.find({}, function(err, tasks){
      if (err)
        return cb(err);
            
      return cb(null, tasks);
    });
  },
  add: function(task, cb){
    db.tasks.save({task: task.task}, function(err, task){
      if (err)
        return cb(err);
            
      return cb(null, task);   
    });
  },
  getById: function(id, cb){
    db.tasks.find(id, function(err, task){
      if (err)
        return cb(err);
            
      return cb(null, task); 
    });
  },
  delete: function(id, cb){
    db.tasks.destroy({id: id}, function(err, result){
      if (err)
        return cb(err);
            
      return cb(null, result);
    });
  }
};

module.exports = tasks;