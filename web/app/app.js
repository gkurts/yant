var yantApp = angular.module('yantApp', []);

yantApp.controller('TodoController', function(todoService){
    var vm = this;
    vm.todos = [];
    
    todoService.getTasks()
        .success(function(data){
            vm.todos = data;
        })
        .error(function(error){
           console.log('unable to get tasks'); 
        });
    
    vm.removeTask = function(id){
        todoService.deleteTask(id)
            .success(function(data){
                vm.todos = _.without(vm.todos, _.findWhere(vm.todos, {id:id}));
            })
            .error(function(error){
                console.log('unable to delete task');
            });
    };
});

yantApp.factory('todoService', function($http){
    return {
        getTasks : function() {
            return $http.get('/tasks');
        },
        deleteTask: function(id){
            return $http.post('/tasks/delete/'+id);
        }
    }
});