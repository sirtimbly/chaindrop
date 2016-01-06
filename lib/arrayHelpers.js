
var _ = require('lodash');

module.exports = {
    concat: function(anyArrays) {
      var out = [];
      
      _.forEach(arguments, function(array){
          _.forEach(array, function(element) {
            out.push(element);
          });
      });
      
      return out;
    }
}