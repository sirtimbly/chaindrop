/* global sails */
/**
* Box.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var sodium = require('libsodium-wrappers');
var B2 = require('backblaze-b2');

module.exports = {

  attributes: {
      addressee: {
          model: 'addressee'
      },
      keyFingerprint: {
          type: 'string'
      },
      keyUrl: {
          type: 'string'
      },
      body: {
          type: 'string'
      },
      hash: {
        type: 'string'  
      },
      size: {
          type:'string',
          defaultsTo: 0
      },
      locationId: {
          type: 'string'
      },
      locationUrl: {
          type: 'string',
          defaultsTo: ''
      },
      isRemoteStorage: {
          type: 'boolean'
      }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
  generateBodyHash: function(body) {
     //var now = new Date();
     return sodium.to_hex(sodium.crypto_generichash(64, body));
  },
  storeBodyInB2: function(opts, callback) {
    var filename = opts.filename;
    var buffer = opts.buffer;

    var b2 = new B2({
        accountId: sails.config.backblaze.accountId,
        applicationKey: sails.config.backblaze.appKey
    });
    b2.authorize().then(function(response){
            var authToken = b2.authorizationToken;
            console.log("b2 auth token:" + authToken);
            
            b2.getUploadUrl(sails.config.backblaze.bucketId).then(function(response){
                authToken = response.authorizationToken;
                var uploadUrl = response.uploadUrl;
        
                b2.uploadFile({
                    uploadUrl: uploadUrl,
                    contentType: "text/plain", //TODO: detect and switch for file uploads
                    uploadAuthToken: authToken,
                    filename: filename,
                    data: buffer  // this is expecting a Buffer not an encoded string
                }).then(function(response){
                    if (response.fileName){
                       callback(b2.downloadUrl + '/files/' + sails.config.backblaze.bucketName + '/' + response.fileName)
                    }
                });
        });
    });
    
  },
  getBodyById: function(opts, callback) {
      
      Box.findOne(opts.id).exec(function(err,box){
          
          if (box.isRemoteStorage) {
            var b2 = new B2({
                accountId: sails.config.backblaze.accountId,
                applicationKey: sails.config.backblaze.appKey
            });
            b2.authorize().then(function(response){
                
                b2.downloadFileById(box.body).then(function(response){
                     callback(response.data);
                });
               
            });
            
          } else {
            callback(box.body);
          }
      });
      
  }
};

