function epicSelect(ev) {
  var target = ev.target || ev.srcElement;
  var id = $(target).attr('data-id');
  $('#nav-bar .selector-box select').val(id).trigger('change');
  $("#dev-modal").remove();
  $("#s4-workspace").scrollTop(250);
  ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
}
