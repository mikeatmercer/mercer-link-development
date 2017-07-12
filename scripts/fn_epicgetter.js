function epicGetter(id) {

  var epic;
  $(App.epics).each(function(i,e){
    if(e.id == id) {

      epic = e;
    }
  });
  return epic;

}
