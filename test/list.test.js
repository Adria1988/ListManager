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
    var result = listObejct.getLists();
    //Assert
    assert.equal(emptyLists,result);
    mockJsonfile.verify();
  });
});
