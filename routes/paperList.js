
/*
 * GET paper page.
 */

exports.list = function(req, res){
  res.render('paperList', { title: 'paper' });
};

exports.demoPaper = function(req, res){
  res.render('demoPaper', { title: 'paper' });
};
