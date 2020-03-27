var assert = require("assert");
var sinon = require("sinon");

var jsonfile = require("jsonfile");
var List = require("../list.js");

suite("List", function() {
  const JSON_FILENAME = "lists.json";
  var mockJsonfile = null;
  setup(function() {
    this.mockJsonfile = sinon.mock(jsonfile);
  });

  test("should get all lists", function() {
    //Arrange
    var emptyLists = {};
    this.mockJsonfile.expects("readFileSync").once().withArgs(JSON_FILENAME).returns(emptyLists);
    var listManager = createListManager();
    //Act
    var result = listManager.getLists();
    //Assert
    assert.equal(emptyLists, result);
    this.mockJsonfile.verify();
  });

  test("should create a new list with name", function() {
    //Arrange
    var emptyLists = {};
    this.mockJsonfile.expects("readFileSync").once().withArgs(JSON_FILENAME).returns(emptyLists);
    var listManager = createListManager();
    var listName = "ToDo";
    var lists = createTodoListInListsCollection(listName);
    this.mockJsonfile.expects("writeFileSync").once().withArgs(JSON_FILENAME, lists);
    var listManager = createListManager();

    //Act
    listManager.createList(listName);
    //Assert
    this.mockJsonfile.verify();
  });

  test("should throw error hey try create list with a name existing", function() {
    //Arrange
    var listName = "ToDo";
    var lists = createTodoListInListsCollection(listName);
    this.mockJsonfile.expects("readFileSync").once().withArgs(JSON_FILENAME).returns(lists);
    this.mockJsonfile.expects("writeFileSync").never(); 
    var listManager = createListManager();

    //Act
    //Assert
    assert.throws(function(){listManager.createList(listName)}, /List Exist!/);
    this.mockJsonfile.verify();
  });

  test('should remove a list existing',function(){
    //Arrange
    var listName = "ToDo";
    var lists = createTodoListInListsCollection(listName);
    this.mockJsonfile.expects("readFileSync").once().withArgs(JSON_FILENAME).returns(lists);
    var emptyLists = {};
    this.mockJsonfile.expects("writeFileSync").once().withArgs(JSON_FILENAME, {});
    var listManager = createListManager();

    //Act
    listManager.removeList(listName);
    //Assert
    this.mockJsonfile.verify();
  });

  test('should throw error when remove a list not exist', function(){
    //Arrange
    var emptyLists = {};
    this.mockJsonfile.expects("readFileSync").once().withArgs(JSON_FILENAME).returns(emptyLists);
    this.mockJsonfile.expects("writeFileSync").never(); 
    var listManager = createListManager();
    var listName = "ToDo";


    //Act
    //Assert
    assert.throws(function(){listManager.removeList(listName)}, /List not Exist!/);
    this.mockJsonfile.verify();
  });

  function createListManager() {
    return new List(jsonfile);
  }

  function createTodoListInListsCollection(listName){
    var lists = {};
    lists[listName] = [];
    return lists;
  }
  
});