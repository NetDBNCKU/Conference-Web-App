
/*
 * GET paper page.
 */

exports.list = function(req, res){
  res.render('program', { title: 'program' });
};
exports.programday = function(req, res){
  if(req.params.id == '2'){
    res.render('program_tuesday', {title: 'tuesday' });
  }
  if(req.params.id == '3'){
    res.render('program_wednesday', {title: 'wednesday'});
  }
  if(req.params.id == '4'){
    res.render('program_thursday', {title: 'thursday'});
  }
  if(req.params.id == '5'){
    res.render('program_friday', {title: 'friday'});
  }
}
