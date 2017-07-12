function dateMaker(date, quarter, relativeYear) {
  var monthLabel = ['Jan', 'Feb', 'Mar', "Apr", "May", 'Jun', "Jul", "Aug", "Sep", "Nov", "Dec"];
  var now = new Date();
  var dateLabel = monthLabel[parseInt(date.getMonth())]+' '+(parseInt(date.getDate()));
  var year = date.getFullYear();
  if(relativeYear) {
    if(now.getFullYear() - year < 1) {
      year = '';
    }
  }
  if(quarter) {
    var q = Math.floor(date.getMonth() / 3);
    dateLabel = 'Q'+(q+1);
  }
  return dateLabel+' '+year;



}
