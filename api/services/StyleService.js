module.exports = {
  getStyles: function(next) {
    Style.find().exec(function(err, todos) {
      if(err) throw err;
      next(todos);
    });
  },
  addStyle: function(todoVal, next) {
    Style.create({value: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  },
  removeStyle: function(todoVal, next) {
    Style.destroy({value: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
};
