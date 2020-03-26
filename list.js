module.exports = function List() {
  this.getLists = function(jsonfile){
    return  jsonfile.readFileSync('lists.json');
  }
};