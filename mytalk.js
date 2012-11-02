(function(document, window) {
  var talk = window.talk = {};

  talk.TICK_TIME = 10000;
  talk.NUM_OF_SLIDES = 16;

  talk.impress_inst = undefined;

  talk.init = function(impress_instance) {
    console.log("Starting the talk.");
    talk.impress_inst = impress_instance;

    var root = document.querySelector("#impress");
    root.addEventListener("impress:stepenter", talk.onStepEnter)
  };
  talk.progress = function(active_slide, slide_num) {
  }
  
  talk.onStepEnter = function(event) {
    var active_slide = event.target,
        slide_number = parseInt(active_slide.id.substr(5), 10);

    console.log("Tick! Slide number = " + slide_number);
  
    if (slide_number < talk.NUM_OF_SLIDES) {
      console.log("Scheduled next tick");
      window.setTimeout(talk.onSlideTimeout, talk.TICK_TIME);
    }
  };

  talk.onSlideTimeout = function() {
    talk.impress_inst.next();
  };
}(document, window))
