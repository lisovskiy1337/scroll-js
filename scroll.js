export class Scroll {
    constructor(options) {
        let defaultOptions = {
            container: '',
        };
        this.options = Object.assign({}, defaultOptions, options);
        this.nodeList = this.options.container.children;
        this.sectionWatcherOptions = {
            threshold: 0.6,
        };
        this.scrollLinks = this.options.scrollLinks;
        this.activeSection = 0;


        // calling functions here
        this.checkOptions();
        this.activeSectionHandler();
        this.sectionWatcher();
        this.scrollKeyHandler();
        this.buildDots();
        this.buildLinks();

    }

    checkOptions() {
        if (!this.options.container) {
            throw new Error('container is required');
        }
        return this;
    }

    // IntersectionObserver stuff

    sectionWatcherCallback(allSections, sectionWatcher) {
        this.nodeList = allSections;
        Array.from(allSections).forEach(section => {
            if (!section.isIntersecting) {
                return;
            }
            this.activeSectionHandler(section.target.id);
            this.setActiveSection(section.target);

        });
    }


    sectionWatcher() {
        const sectionWatcherOptions = this.sectionWatcherOptions;
        const allSections = this.nodeList;
        const sectionWatcher = new IntersectionObserver(this.sectionWatcherCallback.bind(this), sectionWatcherOptions);
        Array.from(allSections).forEach(section => {

            sectionWatcher.observe(section);
        });
    }

    // sections handler
    
    sectionAddClass(element, className, currentSection) {
        Array.from(element).forEach((item) => {

            if (item.dataset.scroll === currentSection) {
                item.classList.add(className);
                return;
            } else {
                item.classList.remove(className);
            }
        });
    }

    activeSectionHandler(currentSectionId) {
        if (this.options.scrollLinks) {
            const scrollLinks = this.scrollLinks;
            this.sectionAddClass(scrollLinks, 'link--active', currentSectionId);

        }

        if (this.options.dots) {
            const navBtns = document.querySelectorAll('.scrollbar__list-button');
            this.sectionAddClass(navBtns, 'button--active', currentSectionId);


        }

    }


    setActiveSection(section) {
        this.activeSection = section;
    }


    showPrevSection() {
        const prevSection = this.activeSection.previousElementSibling;
        if (prevSection) {
            setTimeout(() => prevSection.scrollIntoView(), this.options.delay ? this.options.delay : 0);
        }
        return
    }

    showNextSection() {
        const nextSection = this.activeSection.nextElementSibling;
        if (nextSection) {
            setTimeout(() => nextSection.scrollIntoView(), this.options.delay ? this.options.delay : 0);
        }
        return
    }

    //scrolling stuff 


    keyEventHandler(keycode) {
        if (keycode === 'ArrowUp') {
            this.showPrevSection();
        }
        if (keycode === 'ArrowDown') {
            this.showNextSection();
        }
    }


    scrollKeyHandler() {
        window.addEventListener('keydown', (key) => {
            key.preventDefault();
            this.keyEventHandler(key.code);
        });

        window.addEventListener('mousewheel', (e) => {
            e.preventDefault();
            if (e.wheelDelta >= 0) {
                this.showPrevSection();
            } else {
                this.showNextSection();
            }

        }, {
            passive: false
        });

    }


    buildDots() {
        if (!this.options.dots) {
            return
        }
        this.ulEl = document.createElement('ul');
        this.ulEl.classList.add('scrollbar__list');
        const sections = this.nodeList;
        Array.from(sections).forEach(section => {
            const liEl = document.createElement('li');
            const aEl = document.createElement('a');
            const btnEl = document.createElement('button');

            liEl.classList.add('scrollbar__list-item');
            btnEl.classList.add('scrollbar__list-button');
            btnEl.setAttribute('data-scroll', `${section.id}`);

            aEl.setAttribute('href', `#${section.id}`);
            aEl.appendChild(btnEl);
            liEl.appendChild(aEl);
            this.ulEl.appendChild(liEl);

        });

        document.body.appendChild(this.ulEl);


    }

    buildLinks() {
        if (!this.options.scrollLinks) {
            return
        }
        const scrollLinks = this.scrollLinks;
        const sections = this.nodeList;
        Array.from(scrollLinks).forEach((link, i) => {
            if (sections[i].id) {

                link.dataset.scroll = sections[i].id;
            }
        });
    }



}