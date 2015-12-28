/**
 * AddresseeController
 *
 * @description :: Server-side logic for managing addressees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var GitHubApi = require("github");
var kbuser = require('keybase-user');

module.exports = {
    
    /**
     * Look up all the public keys associated with a github user 'name'
     */
	lookupGithubKeys: function(req,res) {
        
        if (!req.allParams().name) {
            return res.badRequest();
        }
        
        var github = new GitHubApi({
            // required
            version: "3.0.0",
            // optional
            debug: true,
            protocol: "https",
            host: "api.github.com", // should be api.github.com for GitHub
             // for some GHEs; none for GitHub
            timeout: 5000,
            headers: {
                "user-agent": "chainblock" // GitHub is happy with a unique user agent
            }
        });
        
        github.user.keys({
            user: req.allParams().name
        }, function(err, response) {
            return res.json(response);
        });
    },
    
    /**
     * Look up the primary key for a user 'name' from keybase.io
     */
    lookupKeybasePrimary: function(req,res) {
        if (!req.allParams().name) {
            return res.badRequest();
        }
        
        kbuser(req.allParams().name).then(function(user) {
            return res.json(user.public_keys.primary);
        });
        
    }
};

