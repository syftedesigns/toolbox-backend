var chai = require("chai");
var chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

describe("Data Files API test", () => {
  /*
    Test our API
    */
  describe("/data/files", () => {
    it("Get all files from an external api", (done) => {
      chai
        .request(server)
        .get("/v1/data/files")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          console.log(res.body.data);
          done();
        });
    });
  });
});
