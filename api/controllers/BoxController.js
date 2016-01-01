/**
 * BoxController
 *
 * @description :: Server-side logic for managing boxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
	create: function(req, res) {
        var newBox = req.allParams();
        newBox.size = newBox.body.length;
        
        
        if (newBox.body.trim()) {
            //hash the contents with current date and server key
            newBox.hash = Box.generateBodyHash(newBox.body);
        }
        
        if (newBox.body.length > sails.config.application.maxDbStorageBodyLength) {
            Box.storeBodyInB2({filename: newBox.hash, buffer: new Buffer(newBox.body)}, function(fileId) {
                newBox.body = fileId;
                newBox.locationUrl = fileId;
                newBox.isRemoteStorage = true;
                Box.create(newBox).then(function(box) {
                    return res.json(box);
                });
            });
        } else {
            
            Box.create(newBox).then(function(box) {
                return res.json(box);
            });
        }
        
        
        
    },
    raw: function(req, res) {
       var box;
       Box.findOne(req.allParams().id).exec(function(err,found){
           box = found;
           Box.getBodyById({id: req.allParams().id}, function(body){
                if (Box.generateBodyHash(body) === box.hash)
                 return res.ok(body);
                else 
                 return res.serverError("hashes did not match");
            });
       });
       
        
    }
};

