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
    this.writeListCollectionInJson(listCollection);
  }

  this.removeList = function(listName) {
    var listCollection = this.getLists();

    if(false == listCollection.hasOwnProperty(listName)){
      throw Error('List not Exist!');
    }
    this.forInListCollectionAndListEqualListname(
      listName,
      listCollection, 
      'deleteListInCollectionAndWriteListCollectionInJson',
      [listCollection, listName]
    );
  }

  this.forInListCollectionAndListEqualListname =function(listName,listCollection, functionName,params){
    for(var list in listCollection){
      if(list === listName){
        this[functionName].apply(this,params);
      }
    }
  }

  this.deleteListInCollectionAndWriteListCollectionInJson = function(listCollection,listName){
    delete listCollection[listName];
    this.writeListCollectionInJson(listCollection);
  }

  this.writeListCollectionInJson = function(listCollection){
    jsonfile.writeFileSync(JSON_FILENAME, listCollection);
  }

  this.throwErrorIfListExistWhenCreate = function(listCollection,listName){
    this.forInListCollectionAndListEqualListname(listName,listCollection, 'throwErrorListExist', []);
  }

  this.throwErrorListExist = function(){
    throw new Error('List Exist!')
  }

};
