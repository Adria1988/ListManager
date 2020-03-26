module.exports = function List() {
  const JSON_FILENAME = 'lists.json';

  this.getLists = function(jsonfile){
  return  jsonfile.readFileSync(JSON_FILENAME);
  }

  this.createList = function{

  }
};