(function(document, window) {
  var talk = window.talk = {};

  talk.TICK_TIME = 10000;

  talk.impress_inst = undefined;
  talk.current_tick_timeout_id = undefined;

  talk.init = function(impress_instance) {
    console.log("Starting the talk.");
    talk.impress_inst = impress_instance;

    var root = document.querySelector("#impress");
    root.addEventListener("impress:stepenter", talk.onStepEnter)
    root.addEventListener("impress:stepleave", talk.onStepLeave)
  };
  talk.progress = function(active_slide, slide_num) {
  }
  
  talk.onStepEnter = function(event) {
    var active_slide = event.target,
        slide_number = parseInt(active_slide.id.substr(5), 10),
        should_auto_tick = active_slide.className.indexOf("no-tick") === -1;

    console.log("Tick! Slide number = " + slide_number);
  
    if (should_auto_tick) {
      console.log("Scheduling next tick");
      talk.current_tick_timeout_id = 
        window.setTimeout(talk.onSlideTimeout, talk.TICK_TIME);
    }
  };

  talk.onStepLeave = function(event) {
    if (talk.current_tick_timeout_id !== undefined) {
      console.log("Clearing existing timeout");
      window.clearTimeout(talk.current_tick_timeout_id);
      talk.current_tick_timeout_id = undefined;
    }
  };

  talk.onSlideTimeout = function() {
    talk.impress_inst.next();
  };
}(document, window))
