module.exports = function List(jsonfile) {
  const JSON_FILENAME = 'lists.json';
  this.jsonfile = jsonfile;

  this.getLists = function() {
    return this.jsonfile.readFileSync(JSON_FILENAME);
  }

  this.createList = function(listName) {
    var lists = this.getLists();
    for(var list in lists){
      if(list === listName){
          throw new Error('List Exist!')
      }
    }
    lists[listName] = [];
    jsonfile.writeFileSync(JSON_FILENAME, lists);
  }

};
