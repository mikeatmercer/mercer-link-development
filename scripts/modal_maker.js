function modalMaker(num) {
 var p = App.projects[num];
var perma  = '';
var statusLabel = 'Launch Date';
var quarter = false;
var status = p.status;
if(status == "Archived") {
  status = 'Launched';
}
if(p.status == 'In Development' || p.status == 'Rolling Out Soon') {
  statusLabel = 'ETA';
}
if(p.status == 'In Development') {
  quarter = true;
}
if(p.permalink) {
  var link = p.permalink.split(',');
  perma = ('<div class="meta-item">'
            +'<h4>Permalink</h4>'
            +'<a href="'+link[0]+'" target="_blank">'+link[1].replace('http://','')+'</a>'
          +'</div>');
}



 $('body').append(
   '<div id="dev-modal">'
    +'<div class="overlay"></div>'
    +'<div class="shim"></div>'
    +'<div class="content">'
      +'<h2 class="title">'+p.title+'</h2>'
      +'<button class="close"><span style="display:none;">Close</span></button>'
      +'<div class="inner">'
      +'<div class="bg dev_clearfix">'
        +'<div class="main dev_clearfix">'
          +'<div class="description">'+p.description+'</div>'
          +'<div class="col left-col">'
            +dListMaker(p)
            +eListMaker(p)
          +'</div>'
          +'<div class="col right-col">'
            +tListMaker(p)
          +'</div>'
        +'</div>'
        +'<div class="meta">'
          +'<img src="'+p.thumbnail+'" alt="'+p.title+'" />'
          +'<div class="meta-wrap">'
            +'<a class="cta" href="http://mercerlink.mercer.com/Lists/Feedback/fd_Feedback_New.aspx?product='+encodeURIComponent(p.title)+'" target="_blank">Contact us about this project</a>'
            +perma
            +'<div class="meta-item">'
              +'<h4>Status</h4>'
              +status
            +'</div>'
            +'<div class="meta-item">'
              +'<h4>'+statusLabel+'</h4>'
              +dateMaker(p.eta, quarter,false)
            +'</div>'
          +'</div>'
        +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
   +'</div>'
 );
 $('#dev-modal .shim').height($(window).height());
 $('#dev-modal .content .inner').css({
   'max-height': ($(window).height() - ($('#dev-modal .content h2.title').height()+100))+'px',
 });
 $('#dev-modal .col:empty').remove();
 $('#dev-modal .col').first().addClass('first');
 $('#dev-modal .content').css('visibility','visible');
 $("#dev-modal button.close, #dev-modal .overlay").click(function(){
   $('#dev-modal').remove();
   return false;
 });



}

function dListMaker(p) {
  if(!p.content.length) {
    return '';
  }
  var docString = '<div class="section content"><h4>More Information</h4><ul>';
  $(p.content).each(function(i,e){
    docString += (
      '<li>'
        +'<a href="'+e.url+'" target="_blank">'+e.label+'</a>'
      +'</li>'
    )
  });
  docString += '</div></ul>'
  return docString;
}

function tListMaker(p) {
  var shorten = '';
  if(!p.team.length) {
    return '';
  }
  if(p.team.length > 3) {
    shorten = 'shorten';
  }
  var teamString = '<div class="section team"><h4>Business Team</h4><ul>'
    $(p.team).each(function(i,e){
      teamString += '<li data-account="'+e.replace('\\','_')+'" class="blank '+shorten+'"></li>'
      personGetter(e,personPlacer);
    });

  teamString +='</ul></div>';
  return teamString;
}

function personPlacer(person) {

  $('#dev-modal .section.team ul li[data-account="'+person.account.replace('\\','_')+'"]').html(
    '<a href="http://mysites.mercer.com/Person.aspx?accountname='+person.account+'" target="_blank">'
      +'<div class="cover-image-container"style="width:45px; height:45px;">'
        +'<img  data-account="'+person.account.replace('\\','')+'" src="http://mysites.mercer.com/User%20Photos/Profile%20Pictures/'+person.account.replace('\\','_')+'_MThumb.jpg" alt="'+person.name+'" class="profile "/>'
      +'</div>'
      +'<span class="name">'+person.name+'</span>'
    +'</a>'
  ).removeClass('blank');
  backgroundCover($('#dev-modal .team img[data-account="'+person.account.replace('\\','')+'"]'));
}

function eListMaker(p) {
  if(!p.epics.length) {
    return "";
  }
  var epicString = '<div class="section epics"><h4>Related Epics</h4><ul>';
  $(p.epics).each(function(i,e){
    var epic = epicGetter(e);
    epicString += ('<li><a onclick="epicSelect(event);" class="epic-change" href="#" data-id="'+epic.id+'">'+epic.title+'</a></li>');
  });
  epicString+= '</ul></div>'
  return epicString;
}
