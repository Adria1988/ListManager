module.exports = function List(jsonfile) {
  const JSON_FILENAME = "lists.json";
  this.jsonfile = jsonfile;

  this.getLists = function() {
    return this.jsonfile.readFileSync(JSON_FILENAME);
  }

  this.createList = function(listName) {
    var lists = this.getLists();
    lists[listName] = [];
    jsonfile.writeFileSync(JSON_FILENAME, lists);
  }
};
