





var jsonObj;
var todoPubList = [];
var completedToDo = [];


window.onload= function() {
	dropBox = document.getElementById("dropBox");
	dropBox.ondragenter = ignoreDrag;
	dropBox.ondragover = ignoreDrag;
	dropBox.ondrop = drop;
}

function ignoreDrag(e) {
	e.stopPropagation();
	e.preventDefault();
}

function drop(e){
	e.stopPropagation();
	e.preventDefault();
	
	var data = e.dataTransfer;
	var files = data.files;
	processFiles(files);
	
}

function processFiles(files){
	var file = files[0];


		var reader = new FileReader();
		reader.onload = function(evnt){
			
			jsonObj = JSON.parse(reader.result);
			
		};
		reader.readAsText(file);
	
	
}









var app = angular.module('toDoApp', []); 
app.controller('todoCtrl', function($scope, $http) {
	
$scope.todoList = []
$scope.completed = [];
    $http.get('todo2.json')
        .then(function sucessCallBack(res){
       
		var i;
		for ( i = 0; i < res.data.todo.length; i++)
		{
		 $scope.todoList.push({todoText:res.data.todo[i].todoText,desc:res.data.todo[i].desc, 
		 done:res.data.todo[i].done,rm:res.data.todo[i].rm});		   
		}
    }, function errorCallBack(res){
        alert("File Error, The JSON file did not upload!");
    });

  $scope.todoAddJSON = function() {
	var i,j;
	for ( i = 0; i < jsonObj.todo.length; i++){
		var inUse = false;
			for ( j = 0; j < $scope.todoList.length; j++){
				  if (jsonObj.todo[i].todoText == $scope.todoList[j].todoText){
				alert("A Task already exist with the same name as " + jsonObj.todo[i].todoText   );
				inUse = true;
			}
			}
			if (!inUse) {
        $scope.todoList.push({todoText:jsonObj.todo[i].todoText,desc:jsonObj.todo[i].desc, done:jsonObj.todo[i].done,rm:jsonObj.todo[i].remove});
       } 
	}
	    $scope.todoInput = "";
		$scope.todoDesc = "";
		
    };
	// Add into Scope
    $scope.todoAdd = function() {
		var inUse = false;
		   angular.forEach($scope.todoList, function(x) {
            if (x.todoText == $scope.todoInput){
			alert("A Task already exist with the same name!");
			inUse = true;
			}
        });
		if (!inUse) {
        $scope.todoList.push({todoText:$scope.todoInput,desc:$scope.todoDesc, done:false,rm:false});
       } 
	    $scope.todoInput = "";
		$scope.todoDesc = "";
		
    };
	
	$scope.done = function () {
		var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
            if (x.done) $scope.completed.push(x);
			
        });
	}
	//Remove from Scope
    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.rm) $scope.todoList.push(x);
        });
    };
	
	$scope.add = function(){
	var f = document.getElementById('file').files[0],
    r = new FileReader();
	r.onloadend = function(e){
    var data = e.target.result;
    //send your binary data via $http or $resource or do anything else with it
	}
	r.readAsBinaryString(f);
	}	
});



