function navBarInit() {
  $('#nav-bar .selector-box select').css('opacity',0);
  $('#nav-bar .selector-box .select-text').wrapInner('<span class="text" />');
  $('#nav-bar .selector-box .select-text').prepend('<span class="icon"></span>');

  $('#nav-bar a.archived').text('Show Archived Projects');


  $('#nav-bar .selector-box select').on('change',function(){
    $('#nav-bar .selector-box .select-text .text').text($(this).find('option:selected').text());
    layoutCreator();
    return false;
  });
  $('#nav-bar a.archived').click(function(){
    $(this).toggleClass('selected');
    $('#nav-bar').toggleClass('archive-showing');
    $('#nav-bar .selector-box select').trigger('change');
    if($(this).hasClass('selected')) {
      $(this).text('Hide Archived Projects')
    } else {
      $(this).text('Show Archived Projects');
    }
    return false;
  });
}
