module.exports = {
    getStyles: function(req, res) {
        StyleService.getStyles(function(todos) {
            res.json(todos);
        });
    },
    addStyle: function(req, res) {
        var todoVal = (req.body.value) ? req.body.value : undefined
        StyleService.addStyle(todoVal, function(success) {
            res.json(success);
        });
    },
    removeStyle: function(req, res) {
       var todoVal = (req.body.value) ? req.body.value : undefined
        StyleService.removeStyle(todoVal, function(success) {
            res.json(success);
        });
    }
};
