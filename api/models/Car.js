/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	model: {
  		type: "string",
  		required: true,
  		minLength: 1
  	},
  	year: {
  		type: "string",
  		required: true
  	},
    shortDesc: {
      type: "string",
      maxLength: 100
    },
    longDesc:  {
      type: "string",
      maxLength: 500
    },
    imageName: {
      type: "string"
    },
    comments: {
      collection: 'Comment',
      via: 'owner'
    }

  }
};

