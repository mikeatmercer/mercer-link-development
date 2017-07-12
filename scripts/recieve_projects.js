function recieveProjects(data) {
  App.projects=[]
  $(data).each(function(i,e){

    if($(e).attr('ows_Hidden') == 1) {
      return;
    }

    function splitter(data, keep) {
      var theArray = data.split(';#');
      var newArray = [];
      if(!data) {
        return [];
      }
      $(theArray).each(function(i,e){
        if(keep == 'number') {
          if(!isNaN(e)) {
            newArray.push(parseInt(e));
          }
        } else {
          if(isNaN(e)) {
            newArray.push(e);
          }
        }
      });

      return newArray;
    }
    function makeContent(data) {
      if(!data) {
        return [];
      }
      var contentArray = []
      var lines = data.split("\n");
      $(lines).each(function(i,e){
        var link = e.split(',');
        if(link.length > 1) {
          contentArray.push({
            url: link[0],
            label: link[1]
          })
        }
      });
      return contentArray;
    }
    var dateArray = $(e).attr('ows_ETA').replace(' 00:00:00','').split('-');



    var item = {
      id: parseInt($(e).attr('ows_ID')),
      title: $(e).attr('ows_Title'),
      status: $(e).attr('ows_Status'),
      thumbnail: blankCheck($(e).attr('ows_Thumbnail'), '/KnowledgeManagement/Development/fallback.jpg'),
      description: markdown.toHTML( blankCheck($(e).attr('ows_Description'),'') ),
      eta: new Date(dateArray[0],dateArray[1]-1,dateArray[2]),
      epics: splitter(blankCheck($(e).attr('ows_Epics'), ''), 'number'),
      team: splitter(blankCheck($(e).attr('ows_Team'), ''), 'team'),
      content: makeContent(blankCheck($(e).attr('ows_DocumentLinks'), '')),
      permalink: blankCheck($(e).attr('ows_Permalink'), '')
    }

    App.projects.push(item);

  });

  layoutCreator();

}
