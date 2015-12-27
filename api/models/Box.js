/**
* Box.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      addressee: {
          type: 'string'
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
      locationId: {
          type: 'string'
      }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true
};

