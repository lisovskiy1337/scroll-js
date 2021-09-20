export class Scroll {

    constructor(options) {
        let defaultOptions = {
            container: '',
            
        }
        this.options = Object.assign({},defaultOptions, options);
       
        this.nodeList = this.options.container.children;
        this.sectionWatcherOptions = {
            threshold: 0.6,
        };
        this.navLinks = this.options.navLinks;
        this.navBtns =  this.options.navBtns;
        this.activeSection = 0; 

    }

    checkOptions() {
        if (!this.options.container) {
            throw new Error('container is required');
        }
        return this
    }



    sectionWatcherCallback(allSections, sectionWatcher) {
        this.nodeList = allSections;
        allSections.forEach(section => {
            if (!section.isIntersecting) {
                return;
            }
            activeSectionHandler(section.target.className);
            setActiveSection(section.target);

        });
    }


    sectionWatcher() {
        const sectionWatcherOptions = this.sectionWatcherOptions;

        this.nodeList.forEach(section => {
            const sectionWatcher = IntersectifonObserver(sectionWatcherCallback, sectionWatcherOptions);
            sectionWatcher.observe(section);
        });
    }



    activeSectionHandler(currentSectionClassName) {
        if (this.options.navLinks) {
            const navLinks = this.navLinks;
            navLinks.forEach(link => {
                if (link.dataset.scroll === currentSectionClassName) {
                    link.classList.add('link--active');
                    return;
                } else {
                    link.classList.remove('link--active');
                }

            });
            if (this.options.navBtns) {
                const navBtns = this.navBtns;
                navBtns.forEach(btn => {
                    if (btn.dataset.scroll === currentSectionClassName) {
                        btn.classList.add('button--active');
                        return;
                    } else {
                        btn.classList.remove('button--active');
                    }

                });
            }
        }
    }


    setActiveSection(section) {
        activeSection = section;
    }


    showPrevSection() {
        const prevSection = activeSection.previousElementSibling;
        if (prevSection) {
            prevSection.scrollIntoView();
        }
        return
    }

    showNextSection() {
        const nextSection = activeSection.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView();
        }
        return
    }


    keyEventHandler(keycode) {
        if (keycode === 'ArrowUp') {
            showPrevSection();
        }
        if (keycode === 'ArrowDown') {
            showNextSection();
        }
    }





    scrollKeyHandler() {
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



}