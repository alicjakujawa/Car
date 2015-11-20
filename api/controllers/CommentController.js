/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getComments: function(req, res) {
    CommentService.getComments(function(comments) {
       res.json(comments);
    });
  },
  addComment: function(req, res) {
    var comVal = (req.body.value) ? req.body.value : undefined
    CommentService.addComment(comVal, function(success) {
       res.json(success);
    });
  },
  removeComment: function(req, res) {
    var comVal = (req.body.value) ? req.body.value : undefined
    CommentService.removeComment(comVal, function(success) {
      res.json(success);
    });
  }
}

