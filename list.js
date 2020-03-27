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
    this.throwErrorINotExistLIstInLIstCollectionWhenCreate(listCollection,listName);
    this.forInListCollectionAndListEqualListname(
      listName,
      listCollection, 
      'deleteListInCollectionAndWriteListCollectionInJson',
      [listCollection, listName]
    );
  }

  this.throwErrorINotExistLIstInLIstCollectionWhenCreate = function(listCollection,listName){
    if(false == listCollection.hasOwnProperty(listName)){
      throw Error('List not Exist!');
    }
  }

  this.forInListCollectionAndListEqualListname =function(listName,listCollection, functionName,params){
    if(true == listCollection.hasOwnProperty(listName)){
      this[functionName].apply(this,params);
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

  this.createTaskInList = function(taskName, listName){
    
  }

  this.throwErrorListExist = function(){
    throw new Error('List Exist!')
  }

};
