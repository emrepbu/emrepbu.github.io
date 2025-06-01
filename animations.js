gsap.registerPlugin(ScrollTrigger, Draggable);

gsap.to(".main-title", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out"
});

gsap.to(".subtitle", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.3,
    ease: "power3.out"
});

gsap.to(".nav-link", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
});

gsap.to(".card", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".card-container",
        start: "top 80%"
    }
});

document.getElementById("tween-demo").addEventListener("click", function() {
    gsap.to(this, {
        rotation: 360,
        scale: 1.2,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: function() {
            gsap.to("#tween-demo", {
                rotation: 0,
                scale: 1,
                duration: 0.5
            });
        }
    });
});

document.getElementById("timeline-demo").addEventListener("mouseenter", function() {
    const tl = gsap.timeline();
    tl.to(this, { scale: 1.1, duration: 0.3 })
      .to(this, { backgroundColor: "#fc00ff", duration: 0.3 })
      .to(this, { rotation: 5, duration: 0.2 })
      .to(this, { rotation: -5, duration: 0.2 })
      .to(this, { rotation: 0, duration: 0.2 });
});

document.getElementById("timeline-demo").addEventListener("mouseleave", function() {
    gsap.to(this, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3
    });
});

gsap.to("#easing-demo", {
    x: 100,
    duration: 2,
    ease: "elastic.out(1, 0.3)",
    repeat: -1,
    yoyo: true
});

document.getElementById("fade-demo").addEventListener("click", function() {
    gsap.to(this, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            gsap.to("#fade-demo", { opacity: 1, duration: 0.5 });
        }
    });
});

document.getElementById("scale-demo").addEventListener("click", function() {
    gsap.to(this, {
        scale: 1.5,
        duration: 0.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
    });
});

document.getElementById("rotate-demo").addEventListener("click", function() {
    gsap.to(this, {
        rotation: 720,
        duration: 1,
        ease: "power2.inOut"
    });
});

gsap.to(".stagger-box", {
    scale: 0,
    duration: 0.5,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

const masterTimeline = gsap.timeline({ paused: true });

masterTimeline
    .to("#elem1", { x: 200, rotation: 360, duration: 1 })
    .to("#elem2", { x: 200, scale: 1.5, duration: 1 }, "-=0.5")
    .to("#elem3", { x: 200, backgroundColor: "#fc00ff", duration: 1 }, "-=0.5")
    .to(".timeline-element", { x: 0, rotation: 0, scale: 1, duration: 1 });

document.getElementById("play-btn").addEventListener("click", () => masterTimeline.play());
document.getElementById("pause-btn").addEventListener("click", () => masterTimeline.pause());
document.getElementById("reverse-btn").addEventListener("click", () => masterTimeline.reverse());
document.getElementById("restart-btn").addEventListener("click", () => masterTimeline.restart());

gsap.utils.toArray(".scroll-element").forEach((element, index) => {
    gsap.to(element, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to(element, {
        y: -50 * parseFloat(element.dataset.speed),
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

Draggable.create(".draggable-box", {
    bounds: ".interactive-container",
    inertia: true,
    onDrag: function() {
        gsap.to(this.target, {
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(0, 219, 222, 0.5)"
        });
    },
    onDragEnd: function() {
        gsap.to(this.target, {
            scale: 1,
            boxShadow: "0 10px 30px rgba(0, 219, 222, 0.3)"
        });
    }
});

const morphTimeline = gsap.timeline({ repeat: -1, yoyo: true });
morphTimeline.to("#morph-path", {
    duration: 3,
    ease: "power1.inOut",
    attr: {
        d: "M100,20 C130,10 170,30 180,60 C190,90 190,110 180,140 C170,170 130,190 100,180 C70,190 30,170 20,140 C10,110 10,90 20,60 C30,30 70,10 100,20"
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power2.inOut"
            });
        }
    });
});

gsap.to("body", {
    backgroundColor: "#1a1a1a",
    scrollTrigger: {
        trigger: ".interactive-section",
        start: "top center",
        end: "bottom center",
        scrub: true
    }
});