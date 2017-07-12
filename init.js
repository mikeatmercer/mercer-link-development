

$(document).ready(function(){
  navBarInit();
  getSPList('Epics',"<FieldRef Name='Title' /><FieldRef Name='Color' /><FieldRef Name='Icon' />",'',recieveEpics);
  getSPList('Projects',"<FieldRef Name='Title' /><FieldRef Name='Description' /><FieldRef Name='Status' /><FieldRef Name='ETA' /><FieldRef Name='Epics' /><FieldRef Name='Thumbnail' /><FieldRef Name='Team' /><FieldRef Name='Permalink' /><FieldRef Name='DocumentLinks' /><FieldRef Name='Hidden' />",'',recieveProjects);
});
