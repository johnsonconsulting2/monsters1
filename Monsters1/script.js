//create my object
var myApp = {};
myApp.Url = "https://cjmonster.firebaseio.com/.json";

//this is the array to hold my monsters
myApp.Monsters = [];

//create the monsters with a Constructor
myApp.Monster = function (name, description, picture) {
    this.name = name;
    this.description = description;
    this.picture = picture;
};

//write tables of monsters out to the page
myApp.WriteTable = function () {
    //create a table to hold my monsters
    var holder = "<table class='table table-striped'>";
    for (var i in myApp.Monsters) {
        holder += "<tr>";
        holder += "<td>" + myApp.Monsters[i].name + "</td>";
        holder += "<td>" + myApp.Monsters[i].description + "</td>";
        holder += "<td> URL:" + myApp.Monsters[i].picture + "</td>";
        holder += "<td><div class='btn btn-warning' onclick='myApp.ShowUpdateMonster("+i+")';>Edit</div>" +
            "</td>";
        holder += "</tr>";
    }

    holder += "</table>";
    document.getElementById("tableOutput").innerHTML = holder;
};

//CRUD functions

//create monster
myApp.CreateMonster = function () {
    //I will get these from the form input.  They are pulled from the input fields
    var name = document.getElementById("Name").value;
    var description = document.getElementById("Description").value;
    var picture = document.getElementById("Picture").value;

    //instatiates the monster object
    var monster = new myApp.Monster(name, description, picture);


    //send monster to FireBase
    var request = new XMLHttpRequest();

    //step one
    request.open("POST", myApp.Url);

    //step two
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //push monster into Array
            myApp.Monsters.push(monster);

            //write whatever was updated
            myApp.WriteTable();
        }
        else {console.log(this.response);}
    };

    //step three
    request.onerror = function () {
        console.log("Com ERR");
    };

    //step four
    request.send(JSON.stringify(monster));
  

    
};


//show updated monster
myApp.ShowUpdateMonster = function (id) {
    var monster = myApp.Monsters[id];
    document.getElementById("EditName").value = monster.name;
    document.getElementById("EditDescription").value = monster.description;
    document.getElementById("EditPicture").value = monster.picture;
    document.getElementById("EditId").value = id;
    document.getElementById("ModalTitle").innerHTML = "Editing " + monster.name;

    $('#EditModal').modal();
    
};

//save updated monster
myApp.SaveUpdateMonster = function () {
    var name = document.getElementById("EditName").value;
    var description = document.getElementById("EditDescription").value;
    var picture = document.getElementById("EditPicture").value;
    var id = document.getElementById("EditId").value;

    //grabs name, description and pic by id
    myApp.Monsters[id].name = name;
    myApp.Monsters[id].description = description;
    myApp.Monsters[id].picture = picture;


    //collapse modal
    $('EditModal').modal('hide');
    myApp.WriteTable();
};

//delete monster
myApp.DeleteMonster = function () { };

//get all my monsters from the database

myApp.GetMonstersDB = function () {
    //this cleans out my array and only gets out what is stored in the database.
    myApp.Monsters = [];

    var request = new XMLHttpRequest();

    request.open("GET", myApp.Url);
    
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            //m is the iterator going over the monsters.  I used the for in loop because objects aren't keyes by index but rather by property.
            for (var m in data) {
                myApp.Monsters.push(data[m]);
            }
            //make sure that whatever is written is updated correctly
            myApp.WriteTable();
        }
    
        else{ console.log("Error on Monsters GET" + this.response);}
    };
    
    request.onerror = function () { console.log("Comm Error on Monsters GET");};
    
    request.send();
};

myApp.GetMonstersDB();