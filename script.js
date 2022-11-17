gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".container-main div")
ScrollTrigger.matchMedia({

  // desktop
  "(min-width: 800px)": function() {
    // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
    // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
    // Timeline for fading in and fading out the text

    var targets = document.querySelectorAll(".container-main div");

    targets.forEach(target => {
      const tl = gsap.timeline({
        defaults: {duration: 1},
        scrollTrigger: {
          trigger: target,
          markers: false,
          scrub: true,
          start: "center 50%",
          end: "bottom top",
          pin: true
        }
      })
      .fromTo(target, {y: 25}, {y: -25})
      .from(target, {opacity: 0, duration: 0.2}, 0)
      .to(target, {opacity: 0, duration: 0.2}, 0.8)
    });
  
  },
  // mobile
  "(max-width: 799px)": function() {

    var targets = document.querySelectorAll(".container-main div");

    targets.forEach(target => {
      const tl = gsap.timeline({
        defaults: {duration: 1},
        scrollTrigger: {
          trigger: target,
          scrub: true,
          start: "center 50%",
          end: "bottom -50%",
          pin: true
        }
      })
      .fromTo(target, {y: 25}, {y: -25})
      .from(target, {opacity: 0, duration: 0.2}, 0)
      .to(target, {opacity: 0, duration: 0.2}, 0.8)
    });
  },

  // all
  "all": function() {
    console.clear();

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 1158;
    canvas.height = 770;

    const frameCount = 147;
    const currentFrame = index => (
      `/img/__(${(index + 1).toString()}).png`
    );

    const images = []
    const chart = {
      frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(chart, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5
      },
      onUpdate: render
    });

    images[0].onload = render;

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[chart.frame], 0, 0);
    }

    
  }
});