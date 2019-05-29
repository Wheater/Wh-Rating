class WhRating extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: 'open' });

    // DOM
    this._$top = null;
    this._$bottom = null;
    this._$icon = null;

    // Properties
    this._disabled = false;
    this._value = 0;
    this._hoverValue = 0;
    this._touched = false;   
    this._numberOfIcons = 5; 
    this._useMultiples = false;
  }

  get numberOfIcons() {
    return this._numberOfIcons;
  }

  set numberOfIcons(value) {
    this._numberOfIcons = value;
    this._render('container');
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value === value) {
      return;
    }

    this._touched = true;
    this._value = value;
    this._render();
  }

  set hoverValue(value) {
    this._hoverValue = value;
    this._render('hover');
  }

  connectedCallback() {
    this._root.innerHTML = `
      <style>
        :host {
            width: 8.2em;
            height: 2em;
            display: inline-block;
            overflow: hidden;
            user-select: none;
            vertical-align: middle;
            box-sizing: border-box;
        }          
        .container {                  
          color: var(--star-default-color, #c5c5c5); /* second parameter is fallback) */
          font-size: 2em;
          line-height: 1em;
          margin: 0 auto;
          position: relative;
          padding: 0;
          cursor: pointer;
        }               
        .container .top {
          color: var(--star-selected-color, #e7bd06);
          padding: 0;
          position: absolute;
          z-index: 1;
          display: block;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 0;       
        }
                    
        .container .bottom {
          padding: 0;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          unicode-bidi: bidi-override;
          direction: rtl;
        }    
        
        :host([disabled]) .container {
            cursor: inherit;
        }

        :host([disabled]) .container .top {
            display: block;
        }

        :host([disabled]) .container .bottom > span:hover,
        :host([disabled]) .container .bottom > span:hover ~ span {               
          color: inherit;
        }     

        span::after {
          content: var(--wh-rating-symbol, "\u2605");
        }
      </style>
      <div class="container">
        <div class="top">
        </div>
        <div class="bottom">
        </div>
      </div>
    `;

    this._$top = this._root.querySelector('.top');
    this._$bottom = this._root.querySelector('.bottom');
    this._disabled = this.getAttribute('disabled') !== null;
    this._useMultiples = this.getAttribute('use-multiples') !== null;

    this._$bottom.addEventListener('click', (event) => {
      const value = this._calculateRatingWidth(event);
      if (!this._disabled && value !== undefined) {
        this._touched = true;
        this.value = value;
        this.dispatchEvent(new Event('change'));
      }
    });

    this._$bottom.addEventListener('mousemove', (event) => {
      if (this._disabled) {
        return;
      }

      this.hoverValue = this._calculateHoverWidth(event);
    });

    this._$top.addEventListener('mousemove', (event) => {
      if (this._disabled) {
        return;
      }

      this.hoverValue = this._calculateHoverWidth(event);
    });

    this._$bottom.addEventListener('touchmove', (event) => {
      if (this._disabled) {
        return;
      }

      this.hoverValue = this._calculateHoverWidth(event);
    });

    this._$top.addEventListener('touchmove', (event) => {
      if (this._disabled) {
        return;
      }

      this.hoverValue = this._calculateHoverWidth(event);
    });

    this._$bottom.addEventListener('mouseleave', (event) => {
      if (this._disabled) {
        return;
      }

      this._render();
    });

    const initialValue = this.getAttribute('value');
    if (initialValue != null && +initialValue > 0) {
      this._value = +initialValue;
      this._render();
    }

    const initialIconValue = this.getAttribute('number-of-icons');
    if (initialIconValue != null && +initialIconValue > 0) {
      this._numberOfIcons = +initialIconValue;
      this._render('container');
    }
  }

  _render(type = 'click') {
    if (this._$top !== null) {
      switch (type) {
        case 'click':
          this._$top.style.width = this._value + '%';
          break;
        case 'hover':
          this._$top.style.width = this._hoverValue + '%';
          break;
        case 'container':

          for (let i = 0; i < this._numberOfIcons; i++) {
            this._$bottom.appendChild(document.createElement('span'));
            this._$top.appendChild(document.createElement('span'));
          }

          this._$icon = this._$bottom.querySelector('span');
          this.style.width = this._$icon.offsetWidth * this._numberOfIcons + 'px';
          break;
      }
    }
  }

  _calculateRatingWidth(event) {
    const rootWidth = this._$bottom.getBoundingClientRect().width;
    const mouseOffsetX = event.clientX - this._$bottom.getBoundingClientRect().x;

    let ratingWidth = mouseOffsetX / rootWidth;

    if (this._useMultiples) {
      ratingWidth = Math.ceil(mouseOffsetX / this._$icon.offsetWidth) / this.numberOfIcons;
    }

    return ratingWidth * 100;
  }

  _calculateHoverWidth(event) {

    const offsetWidthX = event.offsetX;
    const width = this._$bottom.getBoundingClientRect().width

    let hoverWidth = offsetWidthX / width;
    
    if (this._useMultiples) {
      hoverWidth = Math.ceil(offsetWidthX / this._$icon.offsetWidth) / this.numberOfIcons;
    } 

    return hoverWidth * 100;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'disabled':
          this._disabled = (newValue !== null);
          break;

        case 'value':
          if (!this._touched) {
            this._value = newValue;
            this._render();
          }
          break;

        case 'number-of-icons':
          if (!this.touched) {
            this._numberOfIcons = newValue;
            this._render('container');
          }

        case 'use-multiples':
          if (!this._touched) {
            this._useMultiples = (newValue !== null);
            this._render();
          }
      }
    }
  }

  static get observedAttributes() {
    return ['disabled', 'value', 'number-of-icons', 'use-multiples'];
  }
}

window.customElements.define('wh-rating', WhRating);
