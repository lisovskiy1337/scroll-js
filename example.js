import {Scroll} from './scroll.js'; 



 new Scroll({
    container: document.querySelector('.main'),
    scrollLinks: document.querySelectorAll('.nav__list-link'),
    dots: true,
    delay: 150
}
    

);
