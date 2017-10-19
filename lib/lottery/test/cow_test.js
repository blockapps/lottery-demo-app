var expect = chai.expect;

describe("Cow", function() {
  describe("constructor", function() {
    it("should have a default name", function*() {
      var cow = new cowLib.Cow();
      const a = yield fetch('https://google.com');
      expect(cow.name).to.equal("Anon cow");
    });

    it("should set cow's name if provided", function() {
      var cow = new cowLib.Cow("Kate");
      expect(cow.name).to.equal("Kate");
    });
  });

  describe("#greets", function() {
    it("should throw if no target is passed in", function() {
      expect(function() {
        (new cowLib.Cow()).greets();
      }).to.throw(Error);
    });

    it("should greet passed target", function() {
      var greetings = (new cowLib.Cow("Kate")).greets("Baby");
      expect(greetings).to.equal("Kate greets Baby");
    });
  });

});