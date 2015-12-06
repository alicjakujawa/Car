module.exports = {
  getComments: function(next) {
    Comment.find().exec(function(err, comments) {
      if(err) throw err;
      next(comments);
    });
  },
  addComment: function(commentVal, next) {
    Comment.create({value: commentVal}).exec(function(err, comment) {
      if(err) throw err;
      next(comment);
    });
  },
  removeComment: function(commentVal, next) {
    Comment.destroy({id: commentVal.id}).exec(function(err, car) {
      if(err) throw err;
      next(car);
    });
  }
}
