function layoutCreator() {
  $('#projects').empty();
  var statusList = [
    'Recently Launched',
    'Rolling Out Soon',
    'In Development',
  ]

  if($('#nav-bar a.archived').hasClass('selected')) {
    statusList.push('Archived');
  }
  var currentEpic = $('#nav-bar .selector-box select').val();

  $(statusList).each(function(i,e){
    var status = e;
    var cardString = '';
    var cardArray = [];
    $(App.projects).each(function(i,e){
      var toAdd = true;
      if(e.status !== status) {

        return;
      }

      if(currentEpic !== 'all' && $.inArray(parseInt(currentEpic),e.epics )== -1) {

        return;
      }
      //cardString += cardMaker(i,e);
      cardArray.push(cardMaker(i,e));
    });
    if(cardArray.length) {
      if(status == "Archived" || status == "Recently Launched") {
        cardArray.reverse();
      }
      $('#projects').append(
        '<div class="section">'
          +'<h2><img src="/KnowledgeManagement/Development/icon-'+status.toLowerCase().replace(/\s/g,"-")+'.png" class="icon" />'+status+'</h2>'
          +'<div class="card-container">'+cardArray.join('')+'</div>'
        +'</div>'
      )
    }
  });
  if(!$("#projects").html()) {
    $('#projects').html('<div class="section no-results">'+'<h2>Sorry, no projects found!</h2> <a onclick="epicSelect(event);" data-id="all" href="#">View All Projects</a>'+'</div>');
  } else {
    $('#projects .card').click(function(){
      modalMaker(parseInt($(this).attr('data-num')));
    });
    $('#projects .section .thumbnail-container img').each(function(){
      backgroundCover($(this));
    });
  }

}



function cardMaker(number,project) {
  var launchLabel = "ETA";
  var quarter = true;
  if(project.status == 'Recently Launched' || project.status == 'Archived') {
    launchLabel = 'Launched';
    quarter = false;
  }
  if(project.status == 'Rolling Out Soon') {
    quarter = false;
  }

  return (
    '<div class="card" data-num="'+number+'">'
      +'<div class="thumbnail-container cover-image-container">'
        +'<img src="'+project.thumbnail+'" alt="'+project.title+'"/>'
      +'</div>'
      +'<div class="card-info">'
        +'<h4>'+project.title+'</h4>'
        +'<div class="launch-date">'+launchLabel+': '+dateMaker(project.eta, quarter,true)+'</div>'
      +'</div>'

    +'</div>'
  );
}
