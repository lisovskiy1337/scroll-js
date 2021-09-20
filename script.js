const sections = document.querySelectorAll('section'),
    navLinks = document.querySelectorAll('.nav__list-link'),
    navBtns = document.querySelectorAll('.scrollbar__list-button');
let activeSection;


const setHtmlBehaviour = () => {
    document.querySelector('html').style.scrollBehavior = 'smooth';
}

setHtmlBehaviour();




const activeSectionHandler = (currentSectionClassName) => {
    navLinks.forEach(link => {
        if (link.dataset.scroll === currentSectionClassName) {
            link.classList.add('link--active');
            return;
        } else {
            link.classList.remove('link--active');
        }

    });
    navBtns.forEach(btn => {
        if (btn.dataset.scroll === currentSectionClassName) {
            btn.classList.add('button--active');
            return;
        } else {
            btn.classList.remove('button--active');
        }

    });

}


const setActiveSection = (section) => activeSection = section;


const showPrevSection = () => {
    const prevSection = activeSection.previousElementSibling;
    if (prevSection) {
        prevSection.scrollIntoView();
    }
    return
}

const showNextSection = () => {
    const nextSection = activeSection.nextElementSibling;
    if (nextSection) {
        nextSection.scrollIntoView();
    }
    return
}


const keyEventHandler = (keycode) => {
    if (keycode === 'ArrowUp') {
        showPrevSection();
    }
    if (keycode === 'ArrowDown') {
        showNextSection();
    }
}





const sectionWatcherCallback = (allSections, sectionWatcher) => {
    allSections.forEach(section => {
        if (!section.isIntersecting) {
            return;
        };
        activeSectionHandler(section.target.className);
        setActiveSection(section.target);

    });
}

const sectionWatcherOptions = {
    threshold: 0.6,
}




const sectionWatcher = new IntersectionObserver(sectionWatcherCallback, sectionWatcherOptions);


sections.forEach(section => {
    sectionWatcher.observe(section);
});




const scrollKeyHandler = () => {
    window.addEventListener('keydown', (key) => {
        key.preventDefault();
        keyEventHandler(key.code);
    });

    window.addEventListener('mousewheel', (e) => {
        e.preventDefault();
        if (e.wheelDelta >= 0) {
            showPrevSection();
        } else {
            showNextSection();
        }

    }, {
        passive: false
    });

}

scrollKeyHandler();

