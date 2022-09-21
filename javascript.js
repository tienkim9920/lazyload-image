const loadImage = (img) => {
    const url = img.getAttribute('lazy-src');
    const src = img.getAttribute('src');
    if (src) {
        return;
    }

    img.setAttribute('src', url);
    img.removeAttribute('lazy-src');
}

const loadSection = (element) => {
    element.classList.add('active');
    element.removeAttribute('section-test')
}

// Lazy Load Image
const lazyLoadImage = () => {
    // Get all data lazy-src
    let lazyImgs = document.querySelectorAll('[lazy-src]');

    // process
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target)
            }
        })
    }) 

    // observer lazyImgs
    lazyImgs.forEach(img => {
        observer.observe(img);
    })
}

const lazyLoadSection = () => {
    let sectionTest = document.querySelectorAll('[section-test]');

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadSection(entry.target)
            }
        })
    })

    sectionTest.forEach(element => {
        observer.observe(element);
    })
}

const ready = () => {
    if ('IntersectionObserver' in window) {
        lazyLoadImage();
        lazyLoadSection();
    }
}

document.addEventListener('DOMContentLoaded', ready);