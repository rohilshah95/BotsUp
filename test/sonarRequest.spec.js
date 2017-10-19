var expect = require('chai').expect;
var nock = require('nock');
var sendRequest = require('../sonarRequest').sendRequest;

describe('GET issues', function() {
  beforeEach(function() {

    // Sample response
    var issuesResponse ={"issues": [
  {
    "organization": "default-organization",
    "key": "AV8mBOruNzdILZC6QEb-",
    "rule": "javascript:UnusedVariable",
    "severity": "MINOR",
    "component": "my:project1:bot.js",
    "project": "my:project1",
    "line": 57,
    "textRange": {
      "startLine": 57,
      "endLine": 57,
      "startOffset": 5,
      "endOffset": 6
    },
    "flows": [],
    "status": "OPEN",
    "message": "Remove the declaration of the unused 'a' variable.",
    "effort": "5min",
    "debt": "5min",
    "author": "rshah8@ncsu.edu",
    "tags": [
      "unused"
    ],
    "creationDate": "2017-10-13T20:59:53-0400",
    "updateDate": "2017-10-16T12:29:26-0400",
    "type": "CODE_SMELL"
  },
  {
    "organization": "default-organization",
    "key": "AV8mBOrvNzdILZC6QEb_",
    "rule": "javascript:UnusedVariable",
    "severity": "MINOR",
    "component": "my:project1:bot.js",
    "project": "my:project1",
    "line": 58,
    "textRange": {
      "startLine": 58,
      "endLine": 58,
      "startOffset": 5,
      "endOffset": 6
    },
    "flows": [],
    "status": "OPEN",
    "message": "Remove the declaration of the unused 'b' variable.",
    "effort": "5min",
    "debt": "5min",
    "author": "rshah8@ncsu.edu",
    "tags": [
      "unused"
    ],
    "creationDate": "2017-10-13T20:59:53-0400",
    "updateDate": "2017-10-16T12:29:26-0400",
    "type": "CODE_SMELL"
  }
]};

    // Mock the request using Nock
    nock('http://localhost:9000')
      .get('/api/issues/search')
      .reply(200, issuesResponse);
  });


  // Chai Assertion
  it('Returns issues', function(done) {
    // Timeout for Test Case
    this.timeout(10000);
    sendRequest(null, function(err, issues){
      // Printing Mock Output
      console.log("Mock Output");
      console.log(issues);

      // Assertions

      // 1. Array of issues
      expect(Array.isArray(issues)).to.equal(true);
      // 2. Array not empty
      expect(issues).to.have.length.above(1);
      // 3. Each issue has a description (string)
      issues.forEach(function(issue) {
        expect(issue.message).to.be.a('string');
      });
      done();
    });
  });
});
