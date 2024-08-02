class SlideShow {
    constructor(cadmgElement, cadmgiconElements, slide, totalSlides, initialSlide = 1) {
        this.cadmg = document.querySelector(cadmgElement);
        this.slides = this.cadmg.querySelectorAll(slide);
        this.cadmgicons = document.querySelectorAll(cadmgiconElements);
        this.totalSlides = totalSlides;
        this.currentSlide = initialSlide;
        this.dotted = document.querySelectorAll('.slide-counters_span')
        
        
        this.isDragging = false;
        this.prevpageX = 0;
        this.prevScrollLeft = 0;
        this.dragDistance = 0;
        
        this.setup();
    }

    setup() {
        this.cadmgicons.forEach(icon => {
            icon.addEventListener("click", () => {
                let slideWidth = this.slides[0].clientWidth;
                this.cadmg.scrollLeft += icon.id == "left" || icon.id == "lef" ? -slideWidth : slideWidth;
                this.currentSlide = Math.min(Math.max(1, this.currentSlide + (icon.id == "left" || icon.id == "lef" ? -1 : 1)), this.totalSlides);
                this.updateSlideCounter();
            })
        });
        
        this.cadmg.addEventListener("mousedown", this.dragStart.bind(this));
        this.cadmg.addEventListener("touchstart", this.dragStart.bind(this));
        
        this.cadmg.addEventListener("mousemove", this.dragging.bind(this));
        this.cadmg.addEventListener("touchmove", this.dragging.bind(this));
        
        this.cadmg.addEventListener("mouseup", this.dragStop.bind(this));
        this.cadmg.addEventListener("mouseleave", this.dragStop.bind(this));
        this.cadmg.addEventListener("touchend", this.dragStop.bind(this));
        
        this.updateSlideCounter();
    }

    updateSlideCounter() {
      document.getElementById('slide-counter').textContent = `${this.currentSlide}/${this.totalSlides}`;
      document.getElementById('slide-counter').style = `
      
      font-size: 16px;
      line-height: 120%;
      color: #313131;`
    }

    autoSlide() {
        if(this.cadmg.scrollLeft == (this.cadmg.scrollWidth - this.cadmg.clientWidth)) return;

        this.dragDistance = Math.abs(this.dragDistance);
        let firstImgWidth = this.slides[0].clientWidth + 14;
        let diff = firstImgWidth - this.dragDistance;

        if(this.cadmg.scrollLeft > this.prevScrollLeft){
            return this.cadmg.scrollLeft += this.dragDistance > firstImgWidth / 3 ? diff : -this.dragDistance;
        }
        this.cadmg.scrollLeft -= this.dragDistance > firstImgWidth / 3 ? diff : -this.dragDistance;
        this.currentSlide = Math.min(Math.max(1, this.currentSlide + 1), this.totalSlides);
        this.updateSlideCounter();
    }

    dragStart(e) {
        this.isDragging = true;
        this.prevpageX = e.pageX || e.touches[0].pageX;
        this.prevScrollLeft = this.cadmg.scrollLeft;
    }

    dragging(e) {
        if(!this.isDragging) return;
        e.preventDefault();
        this.cadmg.classList.add("dragging");
        this.dragDistance = (e.pageX || e.touches[0].pageX) -  this.prevpageX ;
        this.cadmg.scrollLeft = this.prevScrollLeft - this.dragDistance;
    }

    dragStop() {
        this.isDragging = false;
        this.cadmg.classList.remove("dragging");

        if(!this.isDragging) return;
        this.isDragging = false;
        this.autoSlide();
    }
}

const slideshow1 = new SlideShow(".cad-img", ".control", '.member-sliders_slide', 5, 3);
const slideshow2 = new SlideShow(".stages-slides", ".controls", '.stages-layout_item', 5, 3);
