function recieveEpics (data) {
  App.epics = [];
  $('#nav-bar .selector-box select').html('<option value="all">All Epics</option>');
  $(data).each(function(i,e){
    var item = {
      id: parseInt($(this).attr('ows_ID')),
      title: $(this).attr('ows_Title').trim(),
      color: blankCheck($(this).attr('ows_Color'), null),
      icon: blankCheck($(this).attr('ows_Icon'), 'fakeIcon.jpg')
    }
    App.epics.push(item);
  });
  $(App.epics).each(function(i,e){
    $('#nav-bar .selector-box select').append(
      '<option value="'+e.id+'">'+e.title+'</option>'
    );
  });
}
