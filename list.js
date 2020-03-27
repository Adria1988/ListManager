module.exports = function List(jsonfile) {
  const JSON_FILENAME = 'lists.json';
  this.jsonfile = jsonfile;

  this.getLists = function() {
    return this.jsonfile.readFileSync(JSON_FILENAME);
  }

  this.createList = function(listName) {
    var listCollection = this.getLists();
    this.throwErrorIfListExistWhenCreate(listCollection,listName);
    listCollection[listName] = [];
    jsonfile.writeFileSync(JSON_FILENAME, listCollection);
  }

  this.removeList = function(listName) {
    
  }

  this.throwErrorIfListExistWhenCreate = function(listCollection,listName){
    for(var list in listCollection){
      if(list === listName){
          throw new Error('List Exist!')
      }
    }
  }



};
