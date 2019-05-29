"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WhRating =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(WhRating, _HTMLElement);

  function WhRating() {
    var _this;

    _classCallCheck(this, WhRating);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WhRating).call(this));
    _this._root = _this.attachShadow({
      mode: 'open'
    }); // DOM

    _this._$top = null;
    _this._$bottom = null;
    _this._$icon = null; // Properties

    _this._disabled = false;
    _this._value = 0;
    _this._hoverValue = 0;
    _this._touched = false;
    _this._numberOfIcons = 5;
    return _this;
  }

  _createClass(WhRating, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this._root.innerHTML = "\n      <style>\n        :host {\n            width: 8.2em;\n            height: 2em;\n            display: inline-block;\n            overflow: hidden;\n            user-select: none;\n            vertical-align: middle;\n            box-sizing: border-box;\n        }          \n        .container {                  \n          color: var(--star-default-color, #c5c5c5); /* second parameter is fallback) */\n          font-size: 2em;\n          line-height: 1em;\n          margin: 0 auto;\n          position: relative;\n          padding: 0;\n          cursor: pointer;\n        }               \n        .container .top {\n          color: var(--star-selected-color, #e7bd06);\n          padding: 0;\n          position: absolute;\n          z-index: 1;\n          display: block;\n          top: 0;\n          left: 0;\n          overflow: hidden;\n          width: 0;       \n        }\n                    \n        .container .bottom {\n          padding: 0;\n          display: block;\n          position: absolute;\n          top: 0;\n          left: 0;\n          unicode-bidi: bidi-override;\n          direction: rtl;\n        }    \n        \n        :host([disabled]) .container {\n            cursor: inherit;\n        }\n\n        :host([disabled]) .container .top {\n            display: block;\n        }\n\n        :host([disabled]) .container .bottom > span:hover,\n        :host([disabled]) .container .bottom > span:hover ~ span {               \n          color: inherit;\n        }     \n\n        span::after {\n          content: var(--wh-rating-symbol, \"\u2605\");\n        }\n      </style>\n      <div class=\"container\">\n          <div class=\"top\">\n          </div>\n          <div class=\"bottom\">\n          </div>\n      </div>\n    ";
      this._$top = this._root.querySelector('.top');
      this._$bottom = this._root.querySelector('.bottom');
      this._disabled = this.getAttribute('disabled') !== null;

      this._$bottom.addEventListener('click', function (event) {
        var value = _this2._calculateRatingWidth(event);

        if (!_this2._disabled && value !== undefined) {
          _this2._touched = true;
          _this2.value = value;

          _this2.dispatchEvent(new Event('change'));
        }
      });

      this._$bottom.addEventListener('mousemove', function (event) {
        if (_this2._disabled) {
          return;
        }

        _this2.hoverValue = _this2._calculateHoverWidth(event);
      });

      this._$top.addEventListener('mousemove', function (event) {
        if (_this2._disabled) {
          return;
        }

        _this2.hoverValue = _this2._calculateHoverWidth(event);
      });

      this._$bottom.addEventListener('touchmove', function (event) {
        if (_this2._disabled) {
          return;
        }

        _this2.hoverValue = _this2._calculateHoverWidth(event);
      });

      this._$top.addEventListener('touchmove', function (event) {
        if (_this2._disabled) {
          return;
        }

        _this2.hoverValue = _this2._calculateHoverWidth(event);
      });

      this._$bottom.addEventListener('mouseleave', function (event) {
        if (_this2._disabled) {
          return;
        }

        _this2._render();
      });

      var initialValue = this.getAttribute('value');

      if (initialValue != null && +initialValue > 0) {
        this._value = +initialValue;

        this._render();
      }

      var initialIconValue = this.getAttribute('number-of-icons');

      if (initialIconValue != null && +initialIconValue > 0) {
        this._numberOfIcons = +initialIconValue;

        this._render('container');
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';

      if (this._$top !== null) {
        switch (type) {
          case 'click':
            this._$top.style.width = this._value + '%';
            break;

          case 'hover':
            this._$top.style.width = this._hoverValue + '%';
            break;

          case 'container':
            for (var i = 0; i < this._numberOfIcons; i++) {
              this._$bottom.appendChild(document.createElement('span'));

              this._$top.appendChild(document.createElement('span'));
            }

            this._$icon = this._$bottom.querySelector('span');
            this.style.width = this._$icon.offsetWidth * this._numberOfIcons + 'px';
            break;
        }
      }
    }
  }, {
    key: "_calculateRatingWidth",
    value: function _calculateRatingWidth(event) {
      var rootWidth = this._$bottom.getBoundingClientRect().width;

      var mouseOffsetX = event.clientX - this._$bottom.getBoundingClientRect().x;

      return mouseOffsetX / rootWidth * 100;
    }
  }, {
    key: "_calculateHoverWidth",
    value: function _calculateHoverWidth(event) {
      return event.offsetX / this._$bottom.getBoundingClientRect().width * 100;
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        switch (name) {
          case 'disabled':
            this._disabled = newValue !== null;
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

        }
      }
    }
  }, {
    key: "numberOfIcons",
    get: function get() {
      return this._numberOfIcons;
    },
    set: function set(value) {
      this._numberOfIcons = value;

      this._render('container');
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      if (this._value === value) {
        return;
      }

      this._touched = true;
      this._value = value;

      this._render();
    }
  }, {
    key: "hoverValue",
    set: function set(value) {
      this._hoverValue = value;

      this._render('hover');
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['disabled', 'value', 'number-of-icons'];
    }
  }]);

  return WhRating;
}(_wrapNativeSuper(HTMLElement));

window.customElements.define('wh-rating', WhRating);
