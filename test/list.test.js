var assert = require("assert");
var sinon = require("sinon");

var jsonfile = require("jsonfile");
var List = require("../list.js");

suite("List", function() {
  setup(function() {});

  test("should get all lists", function() {
    //Arrange
    var mockJsonfile = sinon.mock(jsonfile);
    var filemame = 'lists.json';
    var emptyLists = {};
    mockJsonfile.expects('readFileSync').once().withArgs(filemame).returns(emptyLists);
    var listObejct = new List();
    //Act
    var result = listObejct.getLists(jsonfile);
    //Assert
    assert.equal(emptyLists,result);
    mockJsonfile.verify();
  });

  test('should create a new list with name',function(){
    //Arrange
    var mockJsonfile = sinon.mock(jsonfile);
    var filemame = 'lists.json';
    var emptyLists = {};
    mockJsonfile.expects('readFileSync').once().withArgs(filemame).returns(emptyLists);
    var lists = {};
    var listName = 'ToDo';
    lists[listName] = [];
    mockJsonfile.expects('writeFileSync').once().withArgs(filemame,lists);
    var listObejct = new List();

    //Act
    listObejct.createList(listName);
    //Assert
    mockJsonfile.verify();
  });
});
