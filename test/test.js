var should = require('should');
var mockery = require('mockery');
var curvelock = require('../lib/curvelock.js');
var sodium = require('libsodium-wrappers');
var base58 = require('bs58check');

var key;
var email = "sirtimbly@gmail.com";
var pass = "testtester";
var msg = "lorem ipsum is the way to make the designer go crazy";
var pubkey = "LW6Q1Uzo262dwb7nCWqrb4o6SnDNEcwoJDGtLJXQJtFGtCFp4K"; //"LqWh29foZTD56cUQc1aUYPzqSVfaAJ37ikS84iW21hkkWwBM6Z";
            //LZPHUQV8aa5Y3SCk1C6fHJaD8BompPH5fQNmSNxczuX3Req9LG


describe("chaindrop", function () {
    beforeEach(function() {
        mockery.registerAllowable('sodium-browserify');
        mockery.registerAllowable('libsodium-wrappers');
        mockery.registerAllowable('bs58check');
        mockery.registerAllowable('lodash');
    });
    
    describe('curvelock', function() {
        it("should create key", function(done){
            key = curvelock.scryptGenerateKey(email, pass);
            curvelock.encodePublicKey(key.publicKey).should.equal(pubkey);
            done();
        });
        it("should encrypt a message", function (done) {
            var cipherText = base58.encode(new Buffer(curvelock.encryptMessage(msg, pubkey)));
            should.exist(cipherText);
            done();   
        });
        it("should decrypt a message", function(done) {
            key = curvelock.scryptGenerateKey(email, pass);
            var toId = curvelock.encodePublicKey(key.publicKey);
            var cipherText = base58.encode(new Buffer(curvelock.encryptMessage(msg, toId)));
            
            var decodedText = curvelock.decryptMessage(base58.decode(cipherText), key);
            should.equal(decodedText, msg);
            done();
        });
    });
});