//var sodium = require('sodium-browserify'); 
var sodium = require('libsodium-wrappers');
//var sodium_api = require('libsodium-wrappers').api;
//var sodium_utils = require('libsodium-wrappers').Utils;
var base58 = require('bs58check');
var _ = require('lodash');
var arrayHelpers = require('./arrayHelpers.js')

var ID_VERSION = 0x0A;
var MSG_VERSION = 0x00;
var OPS = 524288;
var MEM = 16777216;

module.exports = {
    
     //TODO: test perf between libraries
     
    /**
     * Encrpyt a box to ID with a random sender key for anyonymity. Ported from CurveLock
     */
    encryptMessage: function(msg, toId) {
        //generate an ephemeral key to encrypt this with
      var key = sodium.crypto_box_keypair();

      //decode the recip ID
      var recip = base58.decode(toId);

      //Check to make sure that the ID version is supported
      if (recip[0] !== ID_VERSION)
      {
        console.error("Invalid ID Format.");
      }
      var bufferMsg = new Buffer(msg);
      var publicKey = new Uint8Array(new Buffer(recip.slice(1)));
      var nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
      var encrypted = sodium.crypto_box_easy(msg, nonce, publicKey, key.privateKey);
                     //sodium.crypto_box(plainText, nonce, receiver.publicKey, sender.secretKey);
      
      
     var verification = arrayHelpers.concat(nonce, recip.slice(1));
      
      var outputBuffer = new Uint8Array(new Buffer(verification));
      
      var recipVerifier = sodium.crypto_generichash(16, outputBuffer, null);
      
      var final = arrayHelpers.concat([MSG_VERSION], nonce, publicKey, recipVerifier, encrypted);

      return final;
    },
    
    /**
     * Decrypt a message encrypted with above method, also ported from CurveLock
     */
    decryptMessage: function(message, key) {
        
        var VERSION_LENGTH = 1;
        var NONCE_LENGTH = 24;
        var SENDER_KEY_LENGTH = 32;
        var RECIP_VERIFIER_LENGTH = 16;
        
        
      
        var version = message.slice(0, VERSION_LENGTH)[0];
        var ret;

        switch (version)
        {
            case 0:
                var cursor = 1;
                var nonce = new Uint8Array(new Buffer(message.slice(1, NONCE_LENGTH+cursor)));
                cursor += NONCE_LENGTH;
                var senderKey = new Uint8Array(new Buffer(message.slice(25, SENDER_KEY_LENGTH+cursor)));
                cursor += SENDER_KEY_LENGTH;
                var verifier = new Uint8Array(new Buffer(message.slice(57, RECIP_VERIFIER_LENGTH+cursor)));
                cursor += RECIP_VERIFIER_LENGTH;
                var encrypted = new Uint8Array(new Buffer(message.slice(cursor)));
                    
                //check the verifier, to make sure that the message is for this KeyPair before going on
                var verificationBuffer = new Uint8Array(new Buffer(arrayHelpers.concat(nonce, key.PublicKey)));
                var recipVarifier = sodium.crypto_generichash(16, verificationBuffer, null);
                if (sodium.memcmp(verifier, recipVarifier, verifier.length))
                {
                    console.error("Invalid verifier; message not encrypted for this key.");
                }

                var decrypted = sodium.crypto_box_open_easy(encrypted, nonce, senderKey, key.privateKey);
                ret = decrypted;

                break;
            default:
                //TODO: Unsupported version
                console.error("unsupported message version");
                break;
        }

        return ret;
    },
    scryptGenerateKey: function(email, password)
    {
      //wrappers.crypto_pwhash_scryptsalsa208sha256_SALTBYTES = 32;
      var salt = sodium.crypto_generichash(32, email);
      var seed = sodium.crypto_pwhash_scryptsalsa208sha256(password, salt, OPS, MEM, 32);
      var key = sodium.crypto_box_seed_keypair(seed);

      return key;
    },
    encodePublicKey: function(publicKey) {
        var out = arrayHelpers.concat([0x0A], publicKey);
        return base58.encode(new Buffer(out));
    }
    
}

