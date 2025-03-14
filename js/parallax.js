gsap.registerPlugin(ScrollTrigger);

initImageParallax();
// Parallax Images
function initImageParallax() {

    // select all sections .with-parallax
    gsap.utils.toArray('.section__parallax').forEach(section => {

        // get the image
        const image = section.querySelector('img');

        // create tween for the image
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: true
            }
        });

    });

}
