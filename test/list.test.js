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
    this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILENAME).returns(emptyLists);
    var listObejct = new List(jsonfile);
    //Act
    var result = listObejct.getLists();
    //Assert
    assert.equal(emptyLists,result);
    this.mockJsonfile.verify();
  });

  test('should create a new list with name',function(){
    //Arrange
    var emptyLists = {};
    this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILENAME).returns(emptyLists);
    var lists = {};
    var listName = 'ToDo';
    lists[listName] = [];
    this.mockJsonfile.expects('writeFileSync').once().withArgs(JSON_FILENAME,lists);
    var listObejct = new List(jsonfile);

    //Act
    listObejct.createList(listName);
    //Assert
    this.mockJsonfile.verify();
  });
});
