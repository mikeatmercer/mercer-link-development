function backgroundCover(img) {

  if (!img.complete) {
        $(img).load(function(){
          setTimeout(function(){
            centerer();
          },150)
        });
    } else {
      setTimeout(function(){
        centerer();
      },150)
    }


  //$(img).attr('src', $(img).attr('data-src'));
  function centerer() {
    var bh = $(img).parent().height(),
        bw = $(img).parent().width(),
        ih = $(img).height(),
        iw = $(img).width(),
        scale_h = bh / ih,
        scale_w = bw / iw,
        scale;
    if(scale_h>scale_w) {
      scale = scale_h
    } else {
      scale = scale_w;
    }

    $(img).width(scale*iw).height(scale*ih).css({
      'left': -((scale*iw-bw)/2)+'px',
      'top':-((scale*ih-bh)/2)+'px',
      'visibility':'visible'
    }).addClass('loaded');
  }
}
