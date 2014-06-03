//create my object
var myApp = {};

//this is the array to hold my monsters
myApp.Monsters = [];

//create the monsters with a Constructor
myApp.Monster = function (name, description, picture) {
    this.name = name;
    this.description = description;
    this.picture = picture;
};

//write tables of monsters out to the page
myApp.WriteTable = function () { };

//CRUD functions

//create monster
myApp.CreateMonster = function () { };

//show updated monster
myApp.ShowUpdateMonster = function () { };

//save updated monster
myApp.SaveUpdateMonster = function () { };

//delete monster
myApp.DeleteMonster = function () { };
