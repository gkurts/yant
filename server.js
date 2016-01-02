var express     = require('express');
var router = express.Router();
var app         = express();
var morgan      = require('morgan');
var bodyParser  = require('body-parser');

var taskDb = require('./lib/tasks');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/scripts", express.static(__dirname + "/web/bower_components"));
app.use("/app", express.static(__dirname + "/web/app"));

app.get("/", function(req, res){
    res.sendfile('web/index.html');
});

app.get("/tasks", function(req, res){
    taskDb.getAll(function(err, tasks){
        if (err) res.status(500).send(err);
        
        res.json(tasks);
    });
});

app.post("/tasks", function(req, res){
    var task = req.body;
    taskDb.add(task, function(err, result){
        if (err) res.status(500).send(err);
        res.json(result);
    });
         
});

app.get("/tasks/:id", function(req, res){
    var id = parseInt(req.params.id);
    taskDb.getById(id, function(err, result){
        if (err) res.status(500).send(err);
        
        res.json(result);
    });
});

app.post("/tasks/delete/:id", function(req, res){
    var id = parseInt(req.params.id);
    
    taskDb.delete(id, function(err, result){
        if (err) res.status(500).send(err);
        
        res.json(result);
    });
    
});


app.listen(8080);
console.log('YANT is listening at http://localhost:8080!');