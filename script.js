var source = document.createElement("source");

onFenixReady(function() {
  var foxTree = document.getElementById("foxTree");
  var cts = document.getElementById("cts");
  var intro = document.getElementById("intro");
  var intro_img = document.getElementById("instruct-img");
  var replay = document.getElementById("replay");
  var top = document.getElementById("top");
  var wSize = document.getElementById("size").value;
  var sound = document.getElementById("muteUnmuteButton");

  var ended = false;
  var played = false;
  var ten = false;
  var twentyfive = false;
  var fifty = false;
  var seventyfive = false;
  var seventyfive3 = false;
  var active = false;
  var clicked = false;
    
    intro.style.display="none";
    intro_img.style.display="none";

  cts.onclick = function(){
    sendEvent("click_to_site"); 
  }
  sound.onclick = function(){
      foxTree.muted = !foxTree.muted;
      $(this).toggleClass("on");
      if(!foxTree.muted){
          sendEvent("unmute");
      }else{
          sendEvent("mute");
      }
  }

  
  var box = document.getElementById("fox_tree_pinchBox");  
  var pinchBox = new Hammer(box);
  pinchBox.get('pinch').set({ enable: true });
  
  pinchBox.on('pan pinch panend pinchend', function () { 
    sendEvent('zoom');
      
    foxTreeplay();

  });
    
  // box.onclick = function(){
  //   foxTreeplay();
  // }


  introduction();

  function introduction(){
    top.play();
  }

  function foxTreeplay(){ 
    cts.style.display = "block";
    sound.style.display = "block";
    box.style.display = "none";
    intro.style.display = "none";
    intro_img.style.display = "none";
    foxTree.play();
    sendEvent('vp_fox_t');
    foxTree.currentTime = 0;
    clicked = true;
    top.style.display = "none";
    //$('#top').fadeOut();
  }

    
    top.addEventListener("timeupdate", function(e) {
      sevenfiveper3 = 0.75 * top.duration;
      if (top.currentTime > sevenfiveper3 && !seventyfive3) {
        seventyfive3 = true;
        cts.style.display = "block";
        box.style.display = "none";
      }
    });


    var fox_inited = false;
    foxTree.addEventListener("timeupdate", function(e) {
      if (!fox_inited && foxTree.currentTime>0)
      {
        fox_inited = true;
        return;
      }
      tenper = 0.1 * foxTree.duration;
      twofiveper = 0.25 * foxTree.duration;
      fiftyper = 0.5 * foxTree.duration;
      sevenfiveper = 0.75 * foxTree.duration;
      if (foxTree.currentTime > tenper && !ten) {
          sendEvent("vp10p_fox_t");
          ten = true;
      }
      if (foxTree.currentTime > twofiveper && !twentyfive) {
          sendEvent("vp25p_fox_t");
          twentyfive = true;
      }
      if (foxTree.currentTime > fiftyper && !fifty) {
          sendEvent("vp50p_fox_t");
          fifty = true;
      }
      if (foxTree.currentTime > sevenfiveper && !seventyfive) {
          sendEvent("vp75p_fox_t");
          seventyfive = true;
          box.style.display = "none";
          if (!ended) {
            sendEvent("vc_fox_t");
              ended = true;
          }
      }
    });
    setTimeout(function(){
          if (!clicked){
            foxTreeplay();
           }
        }, 3500);

  document.addEventListener("DOMContentLoaded", function(e){
    //window.onload = function () {
    	if (wSize == 300) {
    		source.setAttribute("src", "300x250/video.mp4")
    	}else if (wSize == 320) {
    		source.setAttribute("src", "320x480/video.mp4")
    	}else if (wSize == 384) {
    		source.setAttribute("src", "384x615/video.mp4")
    	}
      foxTree.appendChild(source);
       $('#container').css('opacity', 1);
       setTimeout(function(){
          $('#intro').fadeIn();
          $('#instruct-img').fadeIn();
        }, 600);
    //}
  })
});