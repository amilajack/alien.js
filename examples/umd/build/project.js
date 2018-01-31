var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Project = factory();
})(this, function () {
    'use strict';

    /**
     * @author Patrick Schroen / https://github.com/pschroen
     */

    if (typeof Promise !== 'undefined') Promise.create = function () {
        var resolve = void 0,
            reject = void 0,
            promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        promise.resolve = resolve;
        promise.reject = reject;
        return promise;
    };

    Math.sign = function (x) {
        x = +x;
        if (x === 0 || isNaN(x)) return Number(x);
        return x > 0 ? 1 : -1;
    };

    Math.degrees = function (radians) {
        return radians * (180 / Math.PI);
    };

    Math.radians = function (degrees) {
        return degrees * (Math.PI / 180);
    };

    Math.clamp = function (value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    };

    Math.range = function (value, oldMin, oldMax, newMin, newMax, isClamp) {
        var newValue = (value - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
        if (isClamp) return Math.clamp(newValue, newMin, newMax);
        return newValue;
    };

    Math.mix = function (a, b, alpha) {
        return a * (1 - alpha) + b * alpha;
    };

    Math.step = function (edge, value) {
        return value < edge ? 0 : 1;
    };

    Math.smoothStep = function (min, max, value) {
        var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
    };

    Math.fract = function (value) {
        return value - Math.floor(value);
    };

    Math.mod = function (value, n) {
        return (value % n + n) % n;
    };

    Array.prototype.remove = function (element) {
        var index = this.indexOf(element);
        if (~index) return this.splice(index, 1);
    };

    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    String.prototype.includes = function (str) {
        if (!Array.isArray(str)) return ~this.indexOf(str);
        for (var i = 0; i < str.length; i++) {
            if (~this.indexOf(str[i])) return true;
        }return false;
    };

    String.prototype.clip = function (num, end) {
        return this.length > num ? this.slice(0, num) + end : this;
    };

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.replaceAll = function (find, replace) {
        return this.split(find).join(replace);
    };

    if (!window.fetch) window.fetch = function (url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var promise = Promise.create(),
            request = new XMLHttpRequest();
        request.open(options.method || 'GET', url);
        for (var i in options.headers) {
            request.setRequestHeader(i, options.headers[i]);
        }request.onload = function () {
            return promise.resolve(response());
        };
        request.onerror = promise.reject;
        request.send(options.body);

        function response() {
            var _keys = [],
                all = [],
                headers = {},
                header = void 0;
            request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
                _keys.push(key = key.toLowerCase());
                all.push([key, value]);
                header = headers[key];
                headers[key] = header ? header + ',' + value : value;
            });
            return {
                ok: (request.status / 200 | 0) == 1,
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                clone: response,
                text: function text() {
                    return Promise.resolve(request.responseText);
                },
                json: function json() {
                    return Promise.resolve(request.responseText).then(JSON.parse);
                },
                xml: function xml() {
                    return Promise.resolve(request.responseXML);
                },
                blob: function blob() {
                    return Promise.resolve(new Blob([request.response]));
                },
                arrayBuffer: function arrayBuffer() {
                    return Promise.resolve(new ArrayBuffer([request.response]));
                },

                headers: {
                    keys: function keys() {
                        return _keys;
                    },
                    entries: function entries() {
                        return all;
                    },
                    get: function get(n) {
                        return headers[n.toLowerCase()];
                    },
                    has: function has(n) {
                        return n.toLowerCase() in headers;
                    }
                }
            };
        }
        return promise;
    };

    window.get = function (url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var promise = Promise.create();
        options.method = 'GET';
        window.fetch(url, options).then(handleResponse).catch(promise.reject);

        function handleResponse(e) {
            if (!e.ok) return promise.reject(e);
            e.text().then(function (text) {
                if (text.charAt(0).includes(['[', '{'])) {
                    try {
                        promise.resolve(JSON.parse(text));
                    } catch (err) {
                        promise.resolve(text);
                    }
                } else {
                    promise.resolve(text);
                }
            });
        }
        return promise;
    };

    window.post = function (url, body) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var promise = Promise.create();
        options.method = 'POST';
        options.body = JSON.stringify(body);
        window.fetch(url, options).then(handleResponse).catch(promise.reject);

        function handleResponse(e) {
            if (!e.ok) return promise.reject(e);
            e.text().then(function (text) {
                if (text.charAt(0).includes(['[', '{'])) {
                    try {
                        promise.resolve(JSON.parse(text));
                    } catch (err) {
                        promise.resolve(text);
                    }
                } else {
                    promise.resolve(text);
                }
            });
        }
        return promise;
    };

    window.getURL = function (url) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_blank';

        window.open(url, target);
    };

    if (!window.URL) window.URL = window.webkitURL;

    if (!window.Config) window.Config = {};
    if (!window.Global) window.Global = {};

    /**
     * Alien utilities.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Utils = function () {
        function Utils() {
            _classCallCheck(this, Utils);
        }

        _createClass(Utils, null, [{
            key: 'random',
            value: function random(min, max) {
                var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                if (typeof min === 'undefined') return Math.random();
                if (min === max) return min;
                min = min || 0;
                max = max || 1;
                var p = Math.pow(10, precision);
                return Math.round((min + Math.random() * (max - min)) * p) / p;
            }
        }, {
            key: 'headsTails',
            value: function headsTails(heads, tails) {
                return this.random(0, 1) ? tails : heads;
            }
        }, {
            key: 'queryString',
            value: function queryString(key) {
                var str = decodeURI(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
                if (!str.length || str === '0' || str === 'false') return false;
                return str;
            }
        }, {
            key: 'getConstructorName',
            value: function getConstructorName(object) {
                return object.constructor.name || object.constructor.toString().match(/function ([^(]+)/)[1];
            }
        }, {
            key: 'nullObject',
            value: function nullObject(object) {
                for (var key in object) {
                    if (typeof object[key] !== 'undefined') object[key] = null;
                }return null;
            }
        }, {
            key: 'cloneObject',
            value: function cloneObject(object) {
                return JSON.parse(JSON.stringify(object));
            }
        }, {
            key: 'mergeObject',
            value: function mergeObject() {
                var object = {};

                for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
                    objects[_key] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;
                        for (var key in obj) {
                            object[key] = obj[key];
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return object;
            }
        }, {
            key: 'toArray',
            value: function toArray(object) {
                return Object.keys(object).map(function (key) {
                    return object[key];
                });
            }
        }, {
            key: 'cloneArray',
            value: function cloneArray(array) {
                return array.slice(0);
            }
        }, {
            key: 'basename',
            value: function basename(path, ext) {
                var name = path.split('/').last();
                return !ext ? name.split('.')[0] : name;
            }
        }, {
            key: 'extension',
            value: function extension(path) {
                return path.split('.').last().split('?')[0].toLowerCase();
            }
        }, {
            key: 'base64',
            value: function base64(str) {
                return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
            }
        }, {
            key: 'timestamp',
            value: function timestamp() {
                return (Date.now() + this.random(0, 99999)).toString();
            }
        }, {
            key: 'pad',
            value: function pad(number) {
                return number < 10 ? '0' + number : number;
            }
        }]);

        return Utils;
    }();

    /**
     * Render loop.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    if (!window.requestAnimationFrame) window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function () {
        var start = Date.now();
        return function (callback) {
            return setTimeout(function () {
                return callback(Date.now() - start);
            }, 1000 / 60);
        };
    }();

    var Render = function () {
        function Render() {
            _classCallCheck(this, Render);
        }

        _createClass(Render, null, [{
            key: 'init',
            value: function init() {
                var _this = this;

                var self = this;
                var render = [],
                    skipLimit = 200;
                var last = performance.now();

                requestAnimationFrame(step);

                function step(t) {
                    var delta = Math.min(skipLimit, t - last);
                    last = t;
                    self.TIME = t;
                    self.DELTA = delta;
                    for (var i = render.length - 1; i >= 0; i--) {
                        var callback = render[i];
                        if (!callback) {
                            render.remove(callback);
                            continue;
                        }
                        if (callback.fps) {
                            if (t - callback.last < 1000 / callback.fps) continue;
                            callback(++callback.frame);
                            callback.last = t;
                            continue;
                        }
                        callback(t, delta);
                    }
                    if (!self.paused) requestAnimationFrame(step);
                }

                this.start = function (callback, fps) {
                    if (fps) {
                        callback.fps = fps;
                        callback.last = -Infinity;
                        callback.frame = -1;
                    }
                    if (!~render.indexOf(callback)) render.unshift(callback);
                };

                this.stop = function (callback) {
                    render.remove(callback);
                };

                this.pause = function () {
                    _this.paused = true;
                };

                this.resume = function () {
                    if (!_this.paused) return;
                    _this.paused = false;
                    requestAnimationFrame(step);
                };
            }
        }]);

        return Render;
    }();

    Render.init();

    /**
     * Timer helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Timer = function () {
        function Timer() {
            _classCallCheck(this, Timer);
        }

        _createClass(Timer, null, [{
            key: 'init',
            value: function init() {
                var callbacks = [],
                    discard = [];

                Render.start(loop);

                function loop(t, delta) {
                    for (var i = 0; i < discard.length; i++) {
                        var obj = discard[i];
                        obj.callback = null;
                        callbacks.remove(obj);
                    }
                    if (discard.length) discard.length = 0;
                    for (var _i = 0; _i < callbacks.length; _i++) {
                        var _obj = callbacks[_i];
                        if (!_obj) {
                            callbacks.remove(_obj);
                            continue;
                        }
                        if ((_obj.current += delta) >= _obj.time) {
                            if (_obj.callback) _obj.callback.apply(_obj, _toConsumableArray(_obj.args));
                            discard.push(_obj);
                        }
                    }
                }

                function find(ref) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].ref === ref) return callbacks[i];
                    }return null;
                }

                this.clearTimeout = function (ref) {
                    var obj = find(ref);
                    if (!obj) return false;
                    obj.callback = null;
                    callbacks.remove(obj);
                    return true;
                };

                this.create = function (callback, time) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                        args[_key2 - 2] = arguments[_key2];
                    }

                    var obj = {
                        time: Math.max(1, time || 1),
                        current: 0,
                        ref: Utils.timestamp(),
                        callback: callback,
                        args: args
                    };
                    callbacks.push(obj);
                    return obj.ref;
                };
            }
        }]);

        return Timer;
    }();

    Timer.init();

    /**
     * Event helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Events = function Events() {
        var _this2 = this;

        _classCallCheck(this, Events);

        var Emitter = function () {
            function Emitter() {
                _classCallCheck(this, Emitter);

                this.events = [];
                this.links = [];
            }

            _createClass(Emitter, [{
                key: 'add',
                value: function add(event, callback, object, target) {
                    this.events.push({ event: event, callback: callback, object: object, target: target });
                }
            }, {
                key: 'remove',
                value: function remove(event, callback) {
                    for (var i = this.events.length - 1; i >= 0; i--) {
                        if (this.events[i].event === event && this.events[i].callback === callback) {
                            this.events[i].removed = true;
                            this.events.splice(i, 1)[0] = null;
                        }
                    }
                }
            }, {
                key: 'fire',
                value: function fire(event) {
                    var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    var called = false;
                    for (var i = 0; i < this.events.length; i++) {
                        if (this.events[i].event === event && !this.events[i].removed) {
                            if (this.events[i].target && object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') object.target = object.target || this.events[i].target;
                            this.events[i].callback(object);
                            called = true;
                        }
                    }
                    return called;
                }
            }, {
                key: 'destroy',
                value: function destroy(object) {
                    for (var i = this.events.length - 1; i >= 0; i--) {
                        if (this.events[i].object === object) this.events.splice(i, 1)[0] = null;
                    }
                }
            }, {
                key: 'link',
                value: function link(object) {
                    if (!~this.links.indexOf(object)) this.links.push(object);
                }
            }]);

            return Emitter;
        }();

        if (!Events.initialized) {
            Events.emitter = new Emitter();
            Events.VISIBILITY = 'visibility';
            Events.KEYBOARD_PRESS = 'keyboard_press';
            Events.KEYBOARD_DOWN = 'keyboard_down';
            Events.KEYBOARD_UP = 'keyboard_up';
            Events.RESIZE = 'resize';
            Events.COMPLETE = 'complete';
            Events.PROGRESS = 'progress';
            Events.UPDATE = 'update';
            Events.LOADED = 'loaded';
            Events.ERROR = 'error';
            Events.READY = 'ready';
            Events.HOVER = 'hover';
            Events.CLICK = 'click';

            Events.initialized = true;
        }
        this.emitter = new Emitter();
        var linked = [];

        this.add = function (object, event, callback) {
            if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                callback = event;
                event = object;
                object = null;
            }
            if (!object) {
                Events.emitter.add(event, callback, _this2);
            } else {
                var emitter = object.events.emitter;
                emitter.add(event, callback, _this2, object);
                emitter.link(_this2);
                linked.push(emitter);
            }
        };

        this.remove = function (object, event, callback) {
            if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                callback = event;
                event = object;
                object = null;
            }
            if (!object) Events.emitter.remove(event, callback);else object.events.emitter.remove(event, callback);
        };

        this.fire = function (event) {
            var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var local = arguments[2];

            if (_this2.emitter.fire(event, object)) return;
            if (local) return;
            Events.emitter.fire(event, object);
        };

        this.destroy = function () {
            Events.emitter.destroy(_this2);
            linked.forEach(function (emitter) {
                return emitter.destroy(_this2);
            });
            _this2.emitter.links.forEach(function (object) {
                return object.unlink(_this2.emitter);
            });
            return Utils.nullObject(_this2);
        };

        this.unlink = function (emitter) {
            linked.remove(emitter);
        };
    };

    /**
     * Browser detection and vendor prefixes.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Device = function () {
        function Device() {
            _classCallCheck(this, Device);
        }

        _createClass(Device, null, [{
            key: 'init',
            value: function init() {
                var _this3 = this;

                this.agent = navigator.userAgent.toLowerCase();
                this.prefix = function () {
                    var styles = window.getComputedStyle(document.documentElement, ''),
                        pre = (Array.prototype.slice.call(styles).join('').match(/-(webkit|moz|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
                    return {
                        lowercase: pre,
                        js: pre[0].toUpperCase() + pre.substr(1)
                    };
                }();
                this.transformProperty = function () {
                    var pre = void 0;
                    switch (_this3.prefix.lowercase) {
                        case 'webkit':
                            pre = '-webkit-transform';
                            break;
                        case 'moz':
                            pre = '-moz-transform';
                            break;
                        case 'ms':
                            pre = '-ms-transform';
                            break;
                        case 'o':
                            pre = '-o-transform';
                            break;
                        default:
                            pre = 'transform';
                            break;
                    }
                    return pre;
                }();
                this.pixelRatio = window.devicePixelRatio;
                this.os = function () {
                    if (_this3.detect(['iphone', 'ipad'])) return 'ios';
                    if (_this3.detect(['android'])) return 'android';
                    if (_this3.detect(['blackberry'])) return 'blackberry';
                    if (_this3.detect(['mac os'])) return 'mac';
                    if (_this3.detect(['windows'])) return 'windows';
                    if (_this3.detect(['linux'])) return 'linux';
                    return 'unknown';
                }();
                this.browser = function () {
                    if (_this3.os === 'ios') {
                        if (_this3.detect(['safari'])) return 'safari';
                        return 'unknown';
                    }
                    if (_this3.os === 'android') {
                        if (_this3.detect(['chrome'])) return 'chrome';
                        if (_this3.detect(['firefox'])) return 'firefox';
                        return 'browser';
                    }
                    if (_this3.detect(['msie'])) return 'ie';
                    if (_this3.detect(['trident']) && _this3.detect(['rv:'])) return 'ie';
                    if (_this3.detect(['windows']) && _this3.detect(['edge'])) return 'ie';
                    if (_this3.detect(['chrome'])) return 'chrome';
                    if (_this3.detect(['safari'])) return 'safari';
                    if (_this3.detect(['firefox'])) return 'firefox';
                    return 'unknown';
                }();
                this.mobile = 'ontouchstart' in window && this.detect(['iphone', 'ipad', 'android', 'blackberry']);
                this.tablet = Math.max(screen.width, screen.height) > 800;
                this.phone = !this.tablet;
                this.webgl = function () {
                    try {
                        return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
                    } catch (e) {
                        return false;
                    }
                }();
            }
        }, {
            key: 'detect',
            value: function detect(matches) {
                return this.agent.includes(matches);
            }
        }, {
            key: 'vendor',
            value: function vendor(style) {
                return this.prefix.js + style;
            }
        }, {
            key: 'vibrate',
            value: function vibrate(time) {
                if (navigator.vibrate) navigator.vibrate(time);
            }
        }]);

        return Device;
    }();

    Device.init();

    /**
     * Alien component.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Component = function () {
        function Component() {
            _classCallCheck(this, Component);

            this.events = new Events();
            this.classes = [];
            this.timers = [];
            this.loops = [];
        }

        _createClass(Component, [{
            key: 'initClass',
            value: function initClass(object) {
                for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                    params[_key3 - 1] = arguments[_key3];
                }

                var child = new (Function.prototype.bind.apply(object, [null].concat(params)))();
                this.add(child);
                return child;
            }
        }, {
            key: 'add',
            value: function add(child) {
                if (child.destroy) {
                    this.classes.push(child);
                    child.parent = this;
                }
                return this;
            }
        }, {
            key: 'delayedCall',
            value: function delayedCall(callback) {
                for (var _len4 = arguments.length, params = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                    params[_key4 - 2] = arguments[_key4];
                }

                var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                var timer = Timer.create(function () {
                    if (callback) callback.apply(undefined, params);
                }, time);
                this.timers.push(timer);
                if (this.timers.length > 50) this.timers.shift();
                return timer;
            }
        }, {
            key: 'clearTimers',
            value: function clearTimers() {
                for (var i = this.timers.length - 1; i >= 0; i--) {
                    Timer.clearTimeout(this.timers[i]);
                }this.timers.length = 0;
            }
        }, {
            key: 'startRender',
            value: function startRender(callback, fps) {
                this.loops.push(callback);
                Render.start(callback, fps);
            }
        }, {
            key: 'stopRender',
            value: function stopRender(callback) {
                this.loops.remove(callback);
                Render.stop(callback);
            }
        }, {
            key: 'clearRenders',
            value: function clearRenders() {
                for (var i = this.loops.length - 1; i >= 0; i--) {
                    this.stopRender(this.loops[i]);
                }this.loops.length = 0;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removed = true;
                var parent = this.parent;
                if (parent && !parent.removed && parent.remove) parent.remove(this);
                for (var i = this.classes.length - 1; i >= 0; i--) {
                    var child = this.classes[i];
                    if (child && child.destroy) child.destroy();
                }
                this.classes.length = 0;
                this.clearRenders();
                this.clearTimers();
                this.events.destroy();
                return Utils.nullObject(this);
            }
        }, {
            key: 'remove',
            value: function remove(child) {
                this.classes.remove(child);
            }
        }]);

        return Component;
    }();

    /**
     * Interpolation helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Interpolation = function () {
        function Interpolation() {
            _classCallCheck(this, Interpolation);
        }

        _createClass(Interpolation, null, [{
            key: 'init',
            value: function init() {
                var _this4 = this;

                this.convertEase = function (ease) {
                    return function () {
                        var fn = void 0;
                        switch (ease) {
                            case 'easeInQuad':
                                fn = _this4.Quad.In;
                                break;
                            case 'easeInCubic':
                                fn = _this4.Cubic.In;
                                break;
                            case 'easeInQuart':
                                fn = _this4.Quart.In;
                                break;
                            case 'easeInQuint':
                                fn = _this4.Quint.In;
                                break;
                            case 'easeInSine':
                                fn = _this4.Sine.In;
                                break;
                            case 'easeInExpo':
                                fn = _this4.Expo.In;
                                break;
                            case 'easeInCirc':
                                fn = _this4.Circ.In;
                                break;
                            case 'easeInElastic':
                                fn = _this4.Elastic.In;
                                break;
                            case 'easeInBack':
                                fn = _this4.Back.In;
                                break;
                            case 'easeInBounce':
                                fn = _this4.Bounce.In;
                                break;
                            case 'easeOutQuad':
                                fn = _this4.Quad.Out;
                                break;
                            case 'easeOutCubic':
                                fn = _this4.Cubic.Out;
                                break;
                            case 'easeOutQuart':
                                fn = _this4.Quart.Out;
                                break;
                            case 'easeOutQuint':
                                fn = _this4.Quint.Out;
                                break;
                            case 'easeOutSine':
                                fn = _this4.Sine.Out;
                                break;
                            case 'easeOutExpo':
                                fn = _this4.Expo.Out;
                                break;
                            case 'easeOutCirc':
                                fn = _this4.Circ.Out;
                                break;
                            case 'easeOutElastic':
                                fn = _this4.Elastic.Out;
                                break;
                            case 'easeOutBack':
                                fn = _this4.Back.Out;
                                break;
                            case 'easeOutBounce':
                                fn = _this4.Bounce.Out;
                                break;
                            case 'easeInOutQuad':
                                fn = _this4.Quad.InOut;
                                break;
                            case 'easeInOutCubic':
                                fn = _this4.Cubic.InOut;
                                break;
                            case 'easeInOutQuart':
                                fn = _this4.Quart.InOut;
                                break;
                            case 'easeInOutQuint':
                                fn = _this4.Quint.InOut;
                                break;
                            case 'easeInOutSine':
                                fn = _this4.Sine.InOut;
                                break;
                            case 'easeInOutExpo':
                                fn = _this4.Expo.InOut;
                                break;
                            case 'easeInOutCirc':
                                fn = _this4.Circ.InOut;
                                break;
                            case 'easeInOutElastic':
                                fn = _this4.Elastic.InOut;
                                break;
                            case 'easeInOutBack':
                                fn = _this4.Back.InOut;
                                break;
                            case 'easeInOutBounce':
                                fn = _this4.Bounce.InOut;
                                break;
                            case 'linear':
                                fn = _this4.Linear.None;
                                break;
                        }
                        return fn;
                    }() || _this4.Cubic.Out;
                };

                this.Linear = {
                    None: function None(k) {
                        return k;
                    }
                };

                this.Quad = {
                    In: function In(k) {
                        return k * k;
                    },
                    Out: function Out(k) {
                        return k * (2 - k);
                    },
                    InOut: function InOut(k) {
                        if ((k *= 2) < 1) return 0.5 * k * k;
                        return -0.5 * (--k * (k - 2) - 1);
                    }
                };

                this.Cubic = {
                    In: function In(k) {
                        return k * k * k;
                    },
                    Out: function Out(k) {
                        return --k * k * k + 1;
                    },
                    InOut: function InOut(k) {
                        if ((k *= 2) < 1) return 0.5 * k * k * k;
                        return 0.5 * ((k -= 2) * k * k + 2);
                    }
                };

                this.Quart = {
                    In: function In(k) {
                        return k * k * k * k;
                    },
                    Out: function Out(k) {
                        return 1 - --k * k * k * k;
                    },
                    InOut: function InOut(k) {
                        if ((k *= 2) < 1) return 0.5 * k * k * k * k;
                        return -0.5 * ((k -= 2) * k * k * k - 2);
                    }
                };

                this.Quint = {
                    In: function In(k) {
                        return k * k * k * k * k;
                    },
                    Out: function Out(k) {
                        return --k * k * k * k * k + 1;
                    },
                    InOut: function InOut(k) {
                        if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
                        return 0.5 * ((k -= 2) * k * k * k * k + 2);
                    }
                };

                this.Sine = {
                    In: function In(k) {
                        return 1 - Math.cos(k * Math.PI / 2);
                    },
                    Out: function Out(k) {
                        return Math.sin(k * Math.PI / 2);
                    },
                    InOut: function InOut(k) {
                        return 0.5 * (1 - Math.cos(Math.PI * k));
                    }
                };

                this.Expo = {
                    In: function In(k) {
                        return k === 0 ? 0 : Math.pow(1024, k - 1);
                    },
                    Out: function Out(k) {
                        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                    },
                    InOut: function InOut(k) {
                        if (k === 0) return 0;
                        if (k === 1) return 1;
                        if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
                        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                    }
                };

                this.Circ = {
                    In: function In(k) {
                        return 1 - Math.sqrt(1 - k * k);
                    },
                    Out: function Out(k) {
                        return Math.sqrt(1 - --k * k);
                    },
                    InOut: function InOut(k) {
                        if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
                        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                    }
                };

                this.Elastic = {
                    In: function In(k) {
                        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
                        var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.4;

                        var s = void 0;
                        if (k === 0) return 0;
                        if (k === 1) return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                    },
                    Out: function Out(k) {
                        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
                        var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.4;

                        var s = void 0;
                        if (k === 0) return 0;
                        if (k === 1) return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
                    },
                    InOut: function InOut(k) {
                        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
                        var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.4;

                        var s = void 0;
                        if (k === 0) return 0;
                        if (k === 1) return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
                        if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
                    }
                };

                this.Back = {
                    In: function In(k) {
                        var s = 1.70158;
                        return k * k * ((s + 1) * k - s);
                    },
                    Out: function Out(k) {
                        var s = 1.70158;
                        return --k * k * ((s + 1) * k + s) + 1;
                    },
                    InOut: function InOut(k) {
                        var s = 1.70158 * 1.525;
                        if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
                        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                    }
                };

                this.Bounce = {
                    In: function In(k) {
                        return 1 - Interpolation.Bounce.Out(1 - k);
                    },
                    Out: function Out(k) {
                        if (k < 1 / 2.75) return 7.5625 * k * k;
                        if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
                        if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
                        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
                    },
                    InOut: function InOut(k) {
                        if (k < 0.5) return Interpolation.Bounce.In(k * 2) * 0.5;
                        return Interpolation.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                    }
                };
            }
        }]);

        return Interpolation;
    }();

    Interpolation.init();

    /**
     * Mathematical.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var MathTween = function MathTween(object, props, time, ease, delay, update, callback) {
        var _this5 = this;

        _classCallCheck(this, MathTween);

        var self = this;
        var startTime = void 0,
            startValues = void 0,
            endValues = void 0,
            paused = void 0,
            spring = void 0,
            damping = void 0,
            elapsed = void 0;

        initMathTween();

        function initMathTween() {
            if (!object.multiTween && object.mathTween) TweenManager.clearTween(object);
            TweenManager.addMathTween(self);
            object.mathTween = self;
            if (object.multiTween) {
                if (!object.mathTweens) object.mathTweens = [];
                object.mathTweens.push(self);
            }
            ease = Interpolation.convertEase(ease);
            startTime = performance.now();
            startTime += delay;
            endValues = props;
            startValues = {};
            if (props.spring) spring = props.spring;
            if (props.damping) damping = props.damping;
            for (var prop in endValues) {
                if (typeof object[prop] === 'number') startValues[prop] = object[prop];
            }
        }

        function clear() {
            if (!object && !props) return false;
            object.mathTween = null;
            TweenManager.removeMathTween(self);
            Utils.nullObject(self);
            if (object.mathTweens) object.mathTweens.remove(self);
        }

        this.update = function (t) {
            if (paused || t < startTime) return;
            elapsed = (t - startTime) / time;
            elapsed = elapsed > 1 ? 1 : elapsed;
            var delta = _this5.interpolate(elapsed);
            if (update) update(delta);
            if (elapsed === 1) {
                if (callback) callback();
                clear();
            }
        };

        this.stop = function () {
            clear();
        };

        this.pause = function () {
            paused = true;
        };

        this.resume = function () {
            paused = false;
            startTime = performance.now() - elapsed * time;
        };

        this.interpolate = function (elapsed) {
            var delta = ease(elapsed, spring, damping);
            for (var prop in startValues) {
                if (typeof startValues[prop] === 'number' && typeof endValues[prop] === 'number') {
                    var start = startValues[prop],
                        end = endValues[prop];
                    object[prop] = start + (end - start) * delta;
                }
            }
            return delta;
        };
    };

    /**
     * Tween helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var TweenManager = function () {
        function TweenManager() {
            _classCallCheck(this, TweenManager);
        }

        _createClass(TweenManager, null, [{
            key: 'init',
            value: function init() {
                var self = this;
                this.TRANSFORMS = ['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotation', 'rotationX', 'rotationY', 'rotationZ', 'skewX', 'skewY', 'perspective'];
                this.CSS_EASES = {
                    easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                    easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
                    easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
                    easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
                    easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
                    easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
                    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
                    easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
                    easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
                    easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
                    easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
                    easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
                    easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
                    easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
                    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
                    easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
                    easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
                    easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
                    easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
                    easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
                    easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
                    easeInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
                    linear: 'linear'
                };
                var tweens = [];

                Render.start(updateTweens);

                function updateTweens(t) {
                    for (var i = tweens.length - 1; i >= 0; i--) {
                        var tween = tweens[i];
                        if (tween.update) tween.update(t);else self.removeMathTween(tween);
                    }
                }

                this.addMathTween = function (tween) {
                    tweens.push(tween);
                };

                this.removeMathTween = function (tween) {
                    tweens.remove(tween);
                };
            }
        }, {
            key: 'tween',
            value: function tween(object, props, time, ease, delay, callback, update) {
                if (typeof delay !== 'number') {
                    update = callback;
                    callback = delay;
                    delay = 0;
                }
                var promise = null;
                if (typeof Promise !== 'undefined') {
                    promise = Promise.create();
                    if (callback) promise.then(callback);
                    callback = promise.resolve;
                }
                var tween = new MathTween(object, props, time, ease, delay, update, callback);
                return promise || tween;
            }
        }, {
            key: 'clearTween',
            value: function clearTween(object) {
                if (object.mathTween) object.mathTween.stop();
                if (object.mathTweens) {
                    var tweens = object.mathTweens;
                    for (var i = tweens.length - 1; i >= 0; i--) {
                        var tween = tweens[i];
                        if (tween) tween.stop();
                    }
                    object.mathTweens = null;
                }
            }
        }, {
            key: 'parseTransform',
            value: function parseTransform(props) {
                var transforms = '';
                if (typeof props.x !== 'undefined' || typeof props.y !== 'undefined' || typeof props.z !== 'undefined') {
                    var x = props.x || 0,
                        y = props.y || 0,
                        z = props.z || 0;
                    var translate = '';
                    translate += x + 'px, ';
                    translate += y + 'px, ';
                    translate += z + 'px';
                    transforms += 'translate3d(' + translate + ')';
                }
                if (typeof props.scale !== 'undefined') {
                    transforms += 'scale(' + props.scale + ')';
                } else {
                    if (typeof props.scaleX !== 'undefined') transforms += 'scaleX(' + props.scaleX + ')';
                    if (typeof props.scaleY !== 'undefined') transforms += 'scaleY(' + props.scaleY + ')';
                }
                if (typeof props.rotation !== 'undefined') transforms += 'rotate(' + props.rotation + 'deg)';
                if (typeof props.rotationX !== 'undefined') transforms += 'rotateX(' + props.rotationX + 'deg)';
                if (typeof props.rotationY !== 'undefined') transforms += 'rotateY(' + props.rotationY + 'deg)';
                if (typeof props.rotationZ !== 'undefined') transforms += 'rotateZ(' + props.rotationZ + 'deg)';
                if (typeof props.skewX !== 'undefined') transforms += 'skewX(' + props.skewX + 'deg)';
                if (typeof props.skewY !== 'undefined') transforms += 'skewY(' + props.skewY + 'deg)';
                if (typeof props.perspective !== 'undefined') transforms += 'perspective(' + props.perspective + 'px)';
                return transforms;
            }
        }, {
            key: 'isTransform',
            value: function isTransform(key) {
                return ~this.TRANSFORMS.indexOf(key);
            }
        }, {
            key: 'getAllTransforms',
            value: function getAllTransforms(object) {
                var obj = {};
                for (var i = 0; i < this.TRANSFORMS.length; i++) {
                    var key = this.TRANSFORMS[i],
                        val = object[key];
                    if (val !== 0 && typeof val === 'number') obj[key] = val;
                }
                return obj;
            }
        }, {
            key: 'getEase',
            value: function getEase(name) {
                return this.CSS_EASES[name] || this.CSS_EASES.easeOutCubic;
            }
        }]);

        return TweenManager;
    }();

    TweenManager.init();

    /**
     * CSS3 transition animation.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var CSSTransition = function CSSTransition(object, props, time, ease, delay, callback) {
        _classCallCheck(this, CSSTransition);

        var self = this;
        var transformProps = void 0,
            transitionProps = void 0;

        initProperties();
        initCSSTween();

        function killed() {
            return !self || self.kill || !object || !object.element;
        }

        function initProperties() {
            var transform = TweenManager.getAllTransforms(object),
                properties = [];
            for (var key in props) {
                if (TweenManager.isTransform(key)) {
                    transform.use = true;
                    transform[key] = props[key];
                    delete props[key];
                } else if (typeof props[key] === 'number' || ~key.indexOf('-')) {
                    properties.push(key);
                }
            }
            if (transform.use) {
                properties.push(Device.transformProperty);
                delete transform.use;
            }
            transformProps = transform;
            transitionProps = properties;
        }

        function initCSSTween() {
            if (killed()) return;
            if (object.cssTween) object.cssTween.kill = true;
            object.cssTween = self;
            var strings = buildStrings(time, ease, delay);
            object.willChange(strings.props);
            Timer.create(function () {
                if (killed()) return;
                object.element.style[Device.vendor('Transition')] = strings.transition;
                object.css(props);
                object.transform(transformProps);
                Timer.create(function () {
                    if (killed()) return;
                    clearCSSTween();
                    if (callback) callback();
                }, time + delay);
            }, 35);
        }

        function buildStrings(time, ease, delay) {
            var props = '',
                transition = '';
            for (var i = 0; i < transitionProps.length; i++) {
                var transitionProp = transitionProps[i];
                props += (props.length ? ', ' : '') + transitionProp;
                transition += (transition.length ? ', ' : '') + transitionProp + ' ' + time + 'ms ' + TweenManager.getEase(ease) + ' ' + delay + 'ms';
            }
            return {
                props: props,
                transition: transition
            };
        }

        function clearCSSTween() {
            if (killed()) return;
            self.kill = true;
            object.element.style[Device.vendor('Transition')] = '';
            object.willChange(null);
            object.cssTween = null;
            object = props = null;
            Utils.nullObject(self);
        }

        this.stop = clearCSSTween;
    };

    /**
     * Alien interface.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Interface = function () {
        function Interface(name) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
            var detached = arguments[2];

            _classCallCheck(this, Interface);

            this.events = new Events();
            this.classes = [];
            this.timers = [];
            this.loops = [];
            if (typeof name !== 'undefined') {
                if (typeof name === 'string') {
                    this.name = name;
                    this.type = type;
                    if (type === 'svg') {
                        var qualifiedName = detached || 'svg';
                        detached = true;
                        this.element = document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
                        this.element.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
                    } else {
                        this.element = document.createElement(type);
                        if (name[0] !== '.') this.element.id = name;else this.element.className = name.substr(1);
                    }
                    this.element.style.position = 'absolute';
                    if (!detached) document.body.appendChild(this.element);
                } else {
                    this.element = name;
                }
                this.element.object = this;
            }
        }

        _createClass(Interface, [{
            key: 'initClass',
            value: function initClass(object) {
                for (var _len5 = arguments.length, params = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                    params[_key5 - 1] = arguments[_key5];
                }

                var child = new (Function.prototype.bind.apply(object, [null].concat(params)))();
                this.add(child);
                return child;
            }
        }, {
            key: 'add',
            value: function add(child) {
                var element = this.element;
                if (child.element) {
                    element.appendChild(child.element);
                    this.classes.push(child);
                    child.parent = this;
                } else if (child.nodeName) {
                    element.appendChild(child);
                }
                return this;
            }
        }, {
            key: 'delayedCall',
            value: function delayedCall(callback) {
                for (var _len6 = arguments.length, params = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
                    params[_key6 - 2] = arguments[_key6];
                }

                var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                var timer = Timer.create(function () {
                    if (callback) callback.apply(undefined, params);
                }, time);
                this.timers.push(timer);
                if (this.timers.length > 50) this.timers.shift();
                return timer;
            }
        }, {
            key: 'clearTimers',
            value: function clearTimers() {
                for (var i = this.timers.length - 1; i >= 0; i--) {
                    Timer.clearTimeout(this.timers[i]);
                }this.timers.length = 0;
            }
        }, {
            key: 'startRender',
            value: function startRender(callback, fps) {
                this.loops.push(callback);
                Render.start(callback, fps);
            }
        }, {
            key: 'stopRender',
            value: function stopRender(callback) {
                this.loops.remove(callback);
                Render.stop(callback);
            }
        }, {
            key: 'clearRenders',
            value: function clearRenders() {
                for (var i = this.loops.length - 1; i >= 0; i--) {
                    this.stopRender(this.loops[i]);
                }this.loops.length = 0;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removed = true;
                var parent = this.parent;
                if (parent && !parent.removed && parent.remove) parent.remove(this);
                for (var i = this.classes.length - 1; i >= 0; i--) {
                    var child = this.classes[i];
                    if (child && child.destroy) child.destroy();
                }
                this.classes.length = 0;
                this.element.object = null;
                this.clearRenders();
                this.clearTimers();
                this.events.destroy();
                return Utils.nullObject(this);
            }
        }, {
            key: 'remove',
            value: function remove(child) {
                if (child.element.parentNode) child.element.parentNode.removeChild(child.element);
                this.classes.remove(child);
            }
        }, {
            key: 'create',
            value: function create(name, type) {
                var child = new Interface(name, type);
                this.add(child);
                return child;
            }
        }, {
            key: 'clone',
            value: function clone() {
                return new Interface(this.element.cloneNode(true));
            }
        }, {
            key: 'empty',
            value: function empty() {
                this.element.innerHTML = '';
                return this;
            }
        }, {
            key: 'text',
            value: function text(_text) {
                if (typeof _text === 'undefined') return this.element.textContent;else this.element.textContent = _text;
                return this;
            }
        }, {
            key: 'html',
            value: function html(text) {
                if (typeof text === 'undefined') return this.element.innerHTML;else this.element.innerHTML = text;
                return this;
            }
        }, {
            key: 'hide',
            value: function hide() {
                this.element.style.display = 'none';
                return this;
            }
        }, {
            key: 'show',
            value: function show() {
                this.element.style.display = '';
                return this;
            }
        }, {
            key: 'visible',
            value: function visible() {
                this.element.style.visibility = 'visible';
                return this;
            }
        }, {
            key: 'invisible',
            value: function invisible() {
                this.element.style.visibility = 'hidden';
                return this;
            }
        }, {
            key: 'setZ',
            value: function setZ(z) {
                this.element.style.zIndex = z;
                return this;
            }
        }, {
            key: 'clearAlpha',
            value: function clearAlpha() {
                this.element.style.opacity = '';
                return this;
            }
        }, {
            key: 'size',
            value: function size(w) {
                var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : w;

                if (typeof w !== 'undefined') {
                    if (typeof w === 'string' || typeof h === 'string') {
                        if (typeof w !== 'string') w = w + 'px';
                        if (typeof h !== 'string') h = h + 'px';
                        this.element.style.width = w;
                        this.element.style.height = h;
                    } else {
                        this.element.style.width = w + 'px';
                        this.element.style.height = h + 'px';
                        this.element.style.backgroundSize = w + 'px ' + h + 'px';
                    }
                }
                this.width = this.element.offsetWidth;
                this.height = this.element.offsetHeight;
                return this;
            }
        }, {
            key: 'mouseEnabled',
            value: function mouseEnabled(bool) {
                this.element.style.pointerEvents = bool ? 'auto' : 'none';
                return this;
            }
        }, {
            key: 'fontStyle',
            value: function fontStyle(fontFamily, fontSize, color, _fontStyle) {
                this.css({ fontFamily: fontFamily, fontSize: fontSize, color: color, fontStyle: _fontStyle });
                return this;
            }
        }, {
            key: 'bg',
            value: function bg(src, x, y, repeat) {
                if (src.includes(['data:', '.'])) this.element.style.backgroundImage = 'url(' + src + ')';else this.element.style.backgroundColor = src;
                if (typeof x !== 'undefined') {
                    x = typeof x === 'number' ? x + 'px' : x;
                    y = typeof y === 'number' ? y + 'px' : y;
                    this.element.style.backgroundPosition = x + ' ' + y;
                }
                if (repeat) {
                    this.element.style.backgroundSize = '';
                    this.element.style.backgroundRepeat = repeat;
                }
                if (x === 'cover' || x === 'contain') {
                    this.element.style.backgroundSize = x;
                    this.element.style.backgroundRepeat = 'no-repeat';
                    this.element.style.backgroundPosition = typeof y !== 'undefined' ? y + ' ' + repeat : 'center';
                }
                return this;
            }
        }, {
            key: 'center',
            value: function center(x, y, noPos) {
                var css = {};
                if (typeof x === 'undefined') {
                    css.left = '50%';
                    css.top = '50%';
                    css.marginLeft = -this.width / 2;
                    css.marginTop = -this.height / 2;
                } else {
                    if (x) {
                        css.left = '50%';
                        css.marginLeft = -this.width / 2;
                    }
                    if (y) {
                        css.top = '50%';
                        css.marginTop = -this.height / 2;
                    }
                }
                if (noPos) {
                    delete css.left;
                    delete css.top;
                }
                this.css(css);
                return this;
            }
        }, {
            key: 'mask',
            value: function mask(src) {
                this.element.style[Device.vendor('Mask')] = (~src.indexOf('.') ? 'url(' + src + ')' : src) + ' no-repeat';
                this.element.style[Device.vendor('MaskSize')] = 'contain';
                return this;
            }
        }, {
            key: 'blendMode',
            value: function blendMode(mode, bg) {
                this.element.style[bg ? 'background-blend-mode' : 'mix-blend-mode'] = mode;
                return this;
            }
        }, {
            key: 'css',
            value: function css(props, value) {
                if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
                    if (!value) {
                        var style = this.element.style[props];
                        if (typeof style !== 'number') {
                            if (~style.indexOf('px')) style = Number(style.slice(0, -2));
                            if (props === 'opacity') style = !isNaN(Number(this.element.style.opacity)) ? Number(this.element.style.opacity) : 1;
                        }
                        return style || 0;
                    } else {
                        this.element.style[props] = value;
                        return this;
                    }
                }
                for (var key in props) {
                    var val = props[key];
                    if (!(typeof val === 'string' || typeof val === 'number')) continue;
                    if (typeof val !== 'string' && key !== 'opacity' && key !== 'zIndex') val += 'px';
                    this.element.style[key] = val;
                }
                return this;
            }
        }, {
            key: 'transform',
            value: function transform(props) {
                if (!props) props = this;else for (var key in props) {
                    if (typeof props[key] === 'number') this[key] = props[key];
                }this.element.style[Device.vendor('Transform')] = TweenManager.parseTransform(props);
                return this;
            }
        }, {
            key: 'willChange',
            value: function willChange(props) {
                var string = typeof props === 'string';
                if (props) this.element.style['will-change'] = string ? props : Device.transformProperty + ', opacity';else this.element.style['will-change'] = '';
            }
        }, {
            key: 'backfaceVisibility',
            value: function backfaceVisibility(visible) {
                if (visible) this.element.style[Device.vendor('BackfaceVisibility')] = 'visible';else this.element.style[Device.vendor('BackfaceVisibility')] = 'hidden';
            }
        }, {
            key: 'enable3D',
            value: function enable3D(perspective, x, y) {
                this.element.style[Device.vendor('TransformStyle')] = 'preserve-3d';
                if (perspective) this.element.style[Device.vendor('Perspective')] = perspective + 'px';
                if (typeof x !== 'undefined') {
                    x = typeof x === 'number' ? x + 'px' : x;
                    y = typeof y === 'number' ? y + 'px' : y;
                    this.element.style[Device.vendor('PerspectiveOrigin')] = x + ' ' + y;
                }
                return this;
            }
        }, {
            key: 'disable3D',
            value: function disable3D() {
                this.element.style[Device.vendor('TransformStyle')] = '';
                this.element.style[Device.vendor('Perspective')] = '';
                return this;
            }
        }, {
            key: 'transformPoint',
            value: function transformPoint(x, y, z) {
                var origin = '';
                if (typeof x !== 'undefined') origin += typeof x === 'number' ? x + 'px' : x;
                if (typeof y !== 'undefined') origin += typeof y === 'number' ? ' ' + y + 'px' : ' ' + y;
                if (typeof z !== 'undefined') origin += typeof z === 'number' ? ' ' + z + 'px' : ' ' + z;
                this.element.style[Device.vendor('TransformOrigin')] = origin;
                return this;
            }
        }, {
            key: 'tween',
            value: function tween(props, time, ease, delay, callback) {
                if (typeof delay !== 'number') {
                    callback = delay;
                    delay = 0;
                }
                var promise = null;
                if (typeof Promise !== 'undefined') {
                    promise = Promise.create();
                    if (callback) promise.then(callback);
                    callback = promise.resolve;
                }
                var tween = new CSSTransition(this, props, time, ease, delay, callback);
                return promise || tween;
            }
        }, {
            key: 'clearTransform',
            value: function clearTransform() {
                if (typeof this.x === 'number') this.x = 0;
                if (typeof this.y === 'number') this.y = 0;
                if (typeof this.z === 'number') this.z = 0;
                if (typeof this.scale === 'number') this.scale = 1;
                if (typeof this.scaleX === 'number') this.scaleX = 1;
                if (typeof this.scaleY === 'number') this.scaleY = 1;
                if (typeof this.rotation === 'number') this.rotation = 0;
                if (typeof this.rotationX === 'number') this.rotationX = 0;
                if (typeof this.rotationY === 'number') this.rotationY = 0;
                if (typeof this.rotationZ === 'number') this.rotationZ = 0;
                if (typeof this.skewX === 'number') this.skewX = 0;
                if (typeof this.skewY === 'number') this.skewY = 0;
                this.element.style[Device.transformProperty] = '';
                return this;
            }
        }, {
            key: 'clearTween',
            value: function clearTween() {
                if (this.cssTween) this.cssTween.stop();
                if (this.mathTween) this.mathTween.stop();
                return this;
            }
        }, {
            key: 'attr',
            value: function attr(_attr, value) {
                if (typeof value === 'undefined') return this.element.getAttribute(_attr);
                if (value === '') this.element.removeAttribute(_attr);else this.element.setAttribute(_attr, value);
                return this;
            }
        }, {
            key: 'convertTouchEvent',
            value: function convertTouchEvent(e) {
                var touch = {};
                touch.x = 0;
                touch.y = 0;
                if (!e) return touch;
                if (e.touches || e.changedTouches) {
                    if (e.touches.length) {
                        touch.x = e.touches[0].pageX;
                        touch.y = e.touches[0].pageY;
                    } else {
                        touch.x = e.changedTouches[0].pageX;
                        touch.y = e.changedTouches[0].pageY;
                    }
                } else {
                    touch.x = e.pageX;
                    touch.y = e.pageY;
                }
                return touch;
            }
        }, {
            key: 'click',
            value: function click(callback) {
                var _this6 = this;

                var click = function click(e) {
                    if (!_this6.element) return false;
                    e.object = _this6.element.className === 'hit' ? _this6.parent : _this6;
                    e.action = 'click';
                    if (callback) callback(e);
                };
                this.element.addEventListener('click', click, true);
                this.element.style.cursor = 'pointer';
                return this;
            }
        }, {
            key: 'hover',
            value: function hover(callback) {
                var _this7 = this;

                var hover = function hover(e) {
                    if (!_this7.element) return false;
                    e.object = _this7.element.className === 'hit' ? _this7.parent : _this7;
                    e.action = e.type === 'mouseout' ? 'out' : 'over';
                    if (callback) callback(e);
                };
                this.element.addEventListener('mouseover', hover, true);
                this.element.addEventListener('mouseout', hover, true);
                return this;
            }
        }, {
            key: 'press',
            value: function press(callback) {
                var _this8 = this;

                var press = function press(e) {
                    if (!_this8.element) return false;
                    e.object = _this8.element.className === 'hit' ? _this8.parent : _this8;
                    e.action = e.type === 'mousedown' ? 'down' : 'up';
                    if (callback) callback(e);
                };
                this.element.addEventListener('mousedown', press, true);
                this.element.addEventListener('mouseup', press, true);
                return this;
            }
        }, {
            key: 'bind',
            value: function bind(event, callback) {
                var _this9 = this;

                if (event === 'touchstart' && !Device.mobile) event = 'mousedown';else if (event === 'touchmove' && !Device.mobile) event = 'mousemove';else if (event === 'touchend' && !Device.mobile) event = 'mouseup';
                if (!this.events['bind_' + event]) this.events['bind_' + event] = [];
                var events = this.events['bind_' + event];
                events.push({ target: this.element, callback: callback });

                var touchEvent = function touchEvent(e) {
                    var touch = _this9.convertTouchEvent(e);
                    if (!(e instanceof MouseEvent)) {
                        e.x = touch.x;
                        e.y = touch.y;
                    }
                    events.forEach(function (event) {
                        if (event.target === e.currentTarget) event.callback(e);
                    });
                };

                if (!this.events['fn_' + event]) {
                    this.events['fn_' + event] = touchEvent;
                    this.element.addEventListener(event, touchEvent, true);
                }
                return this;
            }
        }, {
            key: 'unbind',
            value: function unbind(event, callback) {
                if (event === 'touchstart' && !Device.mobile) event = 'mousedown';else if (event === 'touchmove' && !Device.mobile) event = 'mousemove';else if (event === 'touchend' && !Device.mobile) event = 'mouseup';
                var events = this.events['bind_' + event];
                if (!events) return this;
                events.forEach(function (event, i) {
                    if (event.callback === callback) events.splice(i, 1);
                });
                if (this.events['fn_' + event] && !events.length) {
                    this.element.removeEventListener(event, this.events['fn_' + event], true);
                    this.events['fn_' + event] = null;
                }
                return this;
            }
        }, {
            key: 'interact',
            value: function interact(overCallback, clickCallback) {
                this.hit = this.create('.hit');
                this.hit.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 99999
                });
                if (Device.mobile) this.hit.touchClick(overCallback, clickCallback);else this.hit.hover(overCallback).click(clickCallback);
                return this;
            }
        }, {
            key: 'touchClick',
            value: function touchClick(hover, click) {
                var _this10 = this;

                var start = {};
                var time = void 0,
                    move = void 0,
                    touch = void 0;

                var findDistance = function findDistance(p1, p2) {
                    var dx = p2.x - p1.x,
                        dy = p2.y - p1.y;
                    return Math.sqrt(dx * dx + dy * dy);
                };

                var touchMove = function touchMove(e) {
                    if (!_this10.element) return false;
                    touch = _this10.convertTouchEvent(e);
                    move = findDistance(start, touch) > 5;
                };

                var setTouch = function setTouch(e) {
                    var touchEvent = _this10.convertTouchEvent(e);
                    e.touchX = touchEvent.x;
                    e.touchY = touchEvent.y;
                    start.x = e.touchX;
                    start.y = e.touchY;
                };

                var touchStart = function touchStart(e) {
                    if (!_this10.element) return false;
                    time = performance.now();
                    e.object = _this10.element.className === 'hit' ? _this10.parent : _this10;
                    e.action = 'over';
                    setTouch(e);
                    if (hover && !move) hover(e);
                };

                var touchEnd = function touchEnd(e) {
                    if (!_this10.element) return false;
                    var t = performance.now();
                    e.object = _this10.element.className === 'hit' ? _this10.parent : _this10;
                    setTouch(e);
                    if (time && t - time < 750 && click && !move) {
                        e.action = 'click';
                        click(e);
                    }
                    if (hover) {
                        e.action = 'out';
                        hover(e);
                    }
                    move = false;
                };

                this.element.addEventListener('touchmove', touchMove, { passive: true });
                this.element.addEventListener('touchstart', touchStart, { passive: true });
                this.element.addEventListener('touchend', touchEnd, { passive: true });
                return this;
            }
        }, {
            key: 'split',
            value: function split() {
                var by = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                var style = {
                    position: 'relative',
                    display: 'block',
                    width: 'auto',
                    height: 'auto',
                    margin: 0,
                    padding: 0,
                    cssFloat: 'left'
                },
                    array = [],
                    split = this.text().split(by);
                this.empty();
                if (by === ' ') by = '&nbsp;';
                for (var i = 0; i < split.length; i++) {
                    if (split[i] === ' ') split[i] = '&nbsp;';
                    array.push(this.create('.t', 'span').html(split[i]).css(style));
                    if (by !== '' && i < split.length - 1) array.push(this.create('.t', 'span').html(by).css(style));
                }
                return array;
            }
        }]);

        return Interface;
    }();

    /**
     * Stage instance.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Stage = new Interface('Stage');
    Stage.css({ overflow: 'hidden' });

    window.addEventListener('load', function () {
        var last = void 0;

        window.addEventListener('focus', focus, true);
        window.addEventListener('blur', blur, true);
        window.addEventListener('keydown', function (e) {
            return Events.emitter.fire(Events.KEYBOARD_DOWN, e);
        }, true);
        window.addEventListener('keyup', function (e) {
            return Events.emitter.fire(Events.KEYBOARD_UP, e);
        }, true);
        window.addEventListener('keypress', function (e) {
            return Events.emitter.fire(Events.KEYBOARD_PRESS, e);
        }, true);
        window.addEventListener('resize', resize, true);
        window.addEventListener('orientationchange', resize, true);
        resize();

        function focus() {
            if (last !== 'focus') {
                last = 'focus';
                Events.emitter.fire(Events.VISIBILITY, { type: 'focus' });
            }
        }

        function blur() {
            if (last !== 'blur') {
                last = 'blur';
                Events.emitter.fire(Events.VISIBILITY, { type: 'blur' });
            }
        }

        function resize() {
            Stage.size();
            Stage.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            Events.emitter.fire(Events.RESIZE);
        }
    }, true);

    /**
     * 2D vector.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Interaction helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Accelerometer helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Mouse interaction.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Image helper class with promise method.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Assets = function () {
        function Assets() {
            _classCallCheck(this, Assets);
        }

        _createClass(Assets, null, [{
            key: 'init',
            value: function init() {
                var _this11 = this;

                this.CDN = '';
                this.CORS = null;
                var images = {};

                this.createImage = function (src, store, callback) {
                    if (typeof store !== 'boolean') {
                        callback = store;
                        store = undefined;
                    }
                    var img = new Image();
                    img.crossOrigin = _this11.CORS;
                    img.src = src;
                    img.onload = callback;
                    img.onerror = callback;
                    if (store) images[src] = img;
                    return img;
                };

                this.getImage = function (src) {
                    return images[src];
                };
            }
        }, {
            key: 'loadImage',
            value: function loadImage(img) {
                if (typeof img === 'string') img = this.createImage(img);
                var promise = Promise.create();
                img.onload = promise.resolve;
                img.onerror = promise.resolve;
                return promise;
            }
        }]);

        return Assets;
    }();

    Assets.init();

    /**
     * Asset loader with promise method.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var AssetLoader = function (_Component) {
        _inherits(AssetLoader, _Component);

        function AssetLoader(assets, callback) {
            _classCallCheck(this, AssetLoader);

            var _this12 = _possibleConstructorReturn(this, (AssetLoader.__proto__ || Object.getPrototypeOf(AssetLoader)).call(this));

            if (Array.isArray(assets)) {
                assets = function () {
                    var keys = assets.map(function (path) {
                        return Utils.basename(path);
                    });
                    return keys.reduce(function (o, k, i) {
                        o[k] = assets[i];
                        return o;
                    }, {});
                }();
            }
            var self = _this12;
            _this12.events = new Events();
            var total = Object.keys(assets).length;
            var loaded = 0;

            for (var key in assets) {
                loadAsset(key, Assets.CDN + assets[key]);
            }function loadAsset(key, asset) {
                var ext = Utils.extension(asset);
                if (ext.includes(['jpg', 'jpeg', 'png', 'gif', 'svg'])) {
                    Assets.createImage(asset, assetLoaded);
                    return;
                }
                if (ext.includes(['mp3', 'm4a', 'ogg', 'wav', 'aif'])) {
                    if (!window.AudioContext || !window.WebAudio) return assetLoaded();
                    window.WebAudio.createSound(key, asset, assetLoaded);
                    return;
                }
                window.get(asset).then(function (data) {
                    if (ext === 'js') window.eval(data.replace('use strict', ''));
                    assetLoaded();
                }).catch(function () {
                    assetLoaded();
                });
            }

            function assetLoaded() {
                self.percent = ++loaded / total;
                self.events.fire(Events.PROGRESS, { percent: self.percent }, true);
                if (loaded === total) complete();
            }

            function complete() {
                self.events.fire(Events.COMPLETE, null, true);
                if (callback) callback();
            }
            return _this12;
        }

        _createClass(AssetLoader, null, [{
            key: 'loadAssets',
            value: function loadAssets(assets, callback) {
                var promise = Promise.create();
                if (!callback) callback = promise.resolve;
                promise.loader = new AssetLoader(assets, callback);
                return promise;
            }
        }]);

        return AssetLoader;
    }(Component);

    /**
     * Loader helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Font loader with promise method.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * State dispatcher.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Storage helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Web audio engine.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    if (!window.AudioContext) window.AudioContext = window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;

    /**
     * Canvas values.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var CanvasValues = function () {
        function CanvasValues(style) {
            _classCallCheck(this, CanvasValues);

            this.styles = {};
            if (!style) this.data = new Float32Array(6);else this.styled = false;
        }

        _createClass(CanvasValues, [{
            key: 'setTRSA',
            value: function setTRSA(x, y, r, sx, sy, a) {
                var m = this.data;
                m[0] = x;
                m[1] = y;
                m[2] = r;
                m[3] = sx;
                m[4] = sy;
                m[5] = a;
            }
        }, {
            key: 'calculate',
            value: function calculate(values) {
                var v = values.data,
                    m = this.data;
                m[0] = m[0] + v[0];
                m[1] = m[1] + v[1];
                m[2] = m[2] + v[2];
                m[3] = m[3] * v[3];
                m[4] = m[4] * v[4];
                m[5] = m[5] * v[5];
            }
        }, {
            key: 'calculateStyle',
            value: function calculateStyle(parent) {
                if (!parent.styled) return false;
                this.styled = true;
                var values = parent.values;
                for (var key in values) {
                    if (!this.styles[key]) this.styles[key] = values[key];
                }
            }
        }, {
            key: 'shadowOffsetX',
            set: function set(val) {
                this.styled = true;
                this.styles.shadowOffsetX = val;
            },
            get: function get() {
                return this.styles.shadowOffsetX;
            }
        }, {
            key: 'shadowOffsetY',
            set: function set(val) {
                this.styled = true;
                this.styles.shadowOffsetY = val;
            },
            get: function get() {
                return this.styles.shadowOffsetY;
            }
        }, {
            key: 'shadowBlur',
            set: function set(val) {
                this.styled = true;
                this.styles.shadowBlur = val;
            },
            get: function get() {
                return this.styles.shadowBlur;
            }
        }, {
            key: 'shadowColor',
            set: function set(val) {
                this.styled = true;
                this.styles.shadowColor = val;
            },
            get: function get() {
                return this.styles.shadowColor;
            }
        }, {
            key: 'values',
            get: function get() {
                return this.styles;
            }
        }]);

        return CanvasValues;
    }();

    /**
     * Canvas object.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var CanvasObject = function () {
        function CanvasObject() {
            _classCallCheck(this, CanvasObject);

            this.visible = true;
            this.blendMode = 'source-over';
            this.x = 0;
            this.y = 0;
            this.px = 0;
            this.py = 0;
            this.clipX = 0;
            this.clipY = 0;
            this.clipWidth = 0;
            this.clipHeight = 0;
            this.width = 0;
            this.height = 0;
            this.rotation = 0;
            this.scale = 1;
            this.opacity = 1;
            this.values = new CanvasValues();
            this.styles = new CanvasValues(true);
            this.children = [];
        }

        _createClass(CanvasObject, [{
            key: 'updateValues',
            value: function updateValues() {
                this.values.setTRSA(this.x, this.y, Math.radians(this.rotation), this.scaleX || this.scale, this.scaleY || this.scale, this.opacity);
                if (this.parent.values) this.values.calculate(this.parent.values);
                if (this.parent.styles) this.styles.calculateStyle(this.parent.styles);
            }
        }, {
            key: 'render',
            value: function render(override) {
                if (!this.visible) return false;
                this.updateValues();
                if (this.draw) this.draw(override);
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].render(override);
                }
            }
        }, {
            key: 'startDraw',
            value: function startDraw(ox, oy, override) {
                var context = this.canvas.context,
                    v = this.values.data,
                    x = v[0] + (ox || 0),
                    y = v[1] + (oy || 0);
                context.save();
                if (!override) context.globalCompositeOperation = this.blendMode;
                context.translate(x, y);
                context.rotate(v[2]);
                context.scale(v[3], v[4]);
                context.globalAlpha = v[5];
                if (this.styles.styled) {
                    var values = this.styles.values;
                    for (var key in values) {
                        context[key] = values[key];
                    }
                }
            }
        }, {
            key: 'endDraw',
            value: function endDraw() {
                this.canvas.context.restore();
            }
        }, {
            key: 'add',
            value: function add(child) {
                child.setCanvas(this.canvas);
                child.parent = this;
                this.children.push(child);
                child.z = this.children.length;
            }
        }, {
            key: 'setCanvas',
            value: function setCanvas(canvas) {
                this.canvas = canvas;
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].setCanvas(canvas);
                }
            }
        }, {
            key: 'remove',
            value: function remove(child) {
                child.canvas = null;
                child.parent = null;
                this.children.remove(child);
            }
        }, {
            key: 'isMask',
            value: function isMask() {
                var obj = this;
                while (obj) {
                    if (obj.masked) return true;
                    obj = obj.parent;
                }
                return false;
            }
        }, {
            key: 'unmask',
            value: function unmask() {
                this.masked.mask(null);
                this.masked = null;
            }
        }, {
            key: 'setZ',
            value: function setZ(z) {
                this.z = z;
                this.parent.children.sort(function (a, b) {
                    return a.z - b.z;
                });
            }
        }, {
            key: 'follow',
            value: function follow(object) {
                this.x = object.x;
                this.y = object.y;
                this.px = object.px;
                this.py = object.py;
                this.clipX = object.clipX;
                this.clipY = object.clipY;
                this.clipWidth = object.clipWidth;
                this.clipHeight = object.clipHeight;
                this.width = object.width;
                this.height = object.height;
                this.rotation = object.rotation;
                this.scale = object.scale;
                this.scaleX = object.scaleX || object.scale;
                this.scaleY = object.scaleY || object.scale;
                return this;
            }
        }, {
            key: 'visible',
            value: function visible() {
                this.visible = true;
                return this;
            }
        }, {
            key: 'invisible',
            value: function invisible() {
                this.visible = false;
                return this;
            }
        }, {
            key: 'transform',
            value: function transform(props) {
                for (var key in props) {
                    if (typeof props[key] === 'number') this[key] = props[key];
                }return this;
            }
        }, {
            key: 'transformPoint',
            value: function transformPoint(x, y) {
                this.px = typeof x === 'number' ? x : this.width * (parseFloat(x) / 100);
                this.py = typeof y === 'number' ? y : this.height * (parseFloat(y) / 100);
                return this;
            }
        }, {
            key: 'clip',
            value: function clip(x, y, w, h) {
                this.clipX = x;
                this.clipY = y;
                this.clipWidth = w;
                this.clipHeight = h;
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    this.children[i].destroy();
                }return Utils.nullObject(this);
            }
        }]);

        return CanvasObject;
    }();

    /**
     * Canvas graphics.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var CanvasGraphics = function (_CanvasObject) {
        _inherits(CanvasGraphics, _CanvasObject);

        function CanvasGraphics() {
            var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : w;

            _classCallCheck(this, CanvasGraphics);

            var _this13 = _possibleConstructorReturn(this, (CanvasGraphics.__proto__ || Object.getPrototypeOf(CanvasGraphics)).call(this));

            var self = _this13;
            _this13.width = w;
            _this13.height = h;
            _this13.props = {};
            var draw = [],
                mask = void 0;

            function setProperties(context) {
                for (var key in self.props) {
                    context[key] = self.props[key];
                }
            }

            _this13.draw = function (override) {
                if (_this13.isMask() && !override) return false;
                var context = _this13.canvas.context;
                _this13.startDraw(_this13.px, _this13.py, override);
                setProperties(context);
                if (_this13.clipWidth && _this13.clipHeight) {
                    context.beginPath();
                    context.rect(_this13.clipX, _this13.clipY, _this13.clipWidth, _this13.clipHeight);
                    context.clip();
                }
                for (var i = 0; i < draw.length; i++) {
                    var cmd = draw[i];
                    if (!cmd) continue;
                    var fn = cmd.shift();
                    context[fn].apply(context, cmd);
                    cmd.unshift(fn);
                }
                _this13.endDraw();
                if (mask) {
                    context.globalCompositeOperation = mask.blendMode;
                    mask.render(true);
                }
            };

            _this13.clear = function () {
                for (var i = draw.length - 1; i >= 0; i--) {
                    draw[i].length = 0;
                }draw.length = 0;
            };

            _this13.arc = function () {
                var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var endAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this13.radius || _this13.width / 2;
                var startAngle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
                var counterclockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

                if (x && !y) {
                    endAngle = x;
                    x = 0;
                    y = 0;
                }
                endAngle -= 90;
                startAngle -= 90;
                draw.push(['beginPath']);
                draw.push(['arc', x, y, radius, Math.radians(startAngle), Math.radians(endAngle), counterclockwise]);
            };

            _this13.quadraticCurveTo = function (cpx, cpy, x, y) {
                draw.push(['quadraticCurveTo', cpx, cpy, x, y]);
            };

            _this13.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                draw.push(['bezierCurveTo', cp1x, cp1y, cp2x, cp2y, x, y]);
            };

            _this13.fillRect = function (x, y, w, h) {
                draw.push(['fillRect', x, y, w, h]);
            };

            _this13.clearRect = function (x, y, w, h) {
                draw.push(['clearRect', x, y, w, h]);
            };

            _this13.strokeRect = function (x, y, w, h) {
                draw.push(['strokeRect', x, y, w, h]);
            };

            _this13.moveTo = function (x, y) {
                draw.push(['moveTo', x, y]);
            };

            _this13.lineTo = function (x, y) {
                draw.push(['lineTo', x, y]);
            };

            _this13.stroke = function () {
                draw.push(['stroke']);
            };

            _this13.fill = function () {
                if (!mask) draw.push(['fill']);
            };

            _this13.beginPath = function () {
                draw.push(['beginPath']);
            };

            _this13.closePath = function () {
                draw.push(['closePath']);
            };

            _this13.fillText = function (text, x, y) {
                draw.push(['fillText', text, x, y]);
            };

            _this13.strokeText = function (text, x, y) {
                draw.push(['strokeText', text, x, y]);
            };

            _this13.setLineDash = function (value) {
                draw.push(['setLineDash', value]);
            };

            _this13.drawImage = function (img) {
                var sx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var sy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var sWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : img.width;
                var sHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : img.height;
                var dx = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
                var dy = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
                var dWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : img.width;
                var dHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : img.height;

                draw.push(['drawImage', img, sx, sy, sWidth, sHeight, dx + -_this13.px, dy + -_this13.py, dWidth, dHeight]);
            };

            _this13.mask = function (object) {
                if (!object) return mask = null;
                mask = object;
                object.masked = _this13;
                for (var i = 0; i < draw.length; i++) {
                    if (draw[i][0] === 'fill' || draw[i][0] === 'stroke') {
                        draw[i].length = 0;
                        draw.splice(i, 1);
                    }
                }
            };

            _this13.clone = function () {
                var object = new CanvasGraphics(_this13.width, _this13.height);
                object.visible = _this13.visible;
                object.blendMode = _this13.blendMode;
                object.opacity = _this13.opacity;
                object.follow(_this13);
                object.props = Utils.cloneObject(_this13.props);
                object.setDraw(Utils.cloneArray(draw));
                return object;
            };

            _this13.setDraw = function (array) {
                draw = array;
            };
            return _this13;
        }

        _createClass(CanvasGraphics, [{
            key: 'strokeStyle',
            set: function set(val) {
                this.props.strokeStyle = val;
            },
            get: function get() {
                return this.props.strokeStyle;
            }
        }, {
            key: 'fillStyle',
            set: function set(val) {
                this.props.fillStyle = val;
            },
            get: function get() {
                return this.props.fillStyle;
            }
        }, {
            key: 'lineWidth',
            set: function set(val) {
                this.props.lineWidth = val;
            },
            get: function get() {
                return this.props.lineWidth;
            }
        }, {
            key: 'lineCap',
            set: function set(val) {
                this.props.lineCap = val;
            },
            get: function get() {
                return this.props.lineCap;
            }
        }, {
            key: 'lineDashOffset',
            set: function set(val) {
                this.props.lineDashOffset = val;
            },
            get: function get() {
                return this.props.lineDashOffset;
            }
        }, {
            key: 'lineJoin',
            set: function set(val) {
                this.props.lineJoin = val;
            },
            get: function get() {
                return this.props.lineJoin;
            }
        }, {
            key: 'miterLimit',
            set: function set(val) {
                this.props.miterLimit = val;
            },
            get: function get() {
                return this.props.miterLimit;
            }
        }, {
            key: 'font',
            set: function set(val) {
                this.props.font = val;
            },
            get: function get() {
                return this.props.font;
            }
        }, {
            key: 'textAlign',
            set: function set(val) {
                this.props.textAlign = val;
            },
            get: function get() {
                return this.props.textAlign;
            }
        }, {
            key: 'textBaseline',
            set: function set(val) {
                this.props.textBaseline = val;
            },
            get: function get() {
                return this.props.textBaseline;
            }
        }]);

        return CanvasGraphics;
    }(CanvasObject);

    /**
     * Canvas interface.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    var Canvas = function Canvas(w) {
        var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : w;

        var _this14 = this;

        var retina = arguments[2];
        var whiteAlpha = arguments[3];

        _classCallCheck(this, Canvas);

        var self = this;
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.object = new Interface(this.element);
        this.children = [];
        this.retina = retina;

        size(w, h, retina);

        function size(w, h, retina) {
            var ratio = retina ? 2 : 1;
            self.element.width = w * ratio;
            self.element.height = h * ratio;
            self.width = w;
            self.height = h;
            self.scale = ratio;
            self.object.size(self.width, self.height);
            self.context.scale(ratio, ratio);
            self.element.style.width = w + 'px';
            self.element.style.height = h + 'px';
            if (whiteAlpha) {
                var alpha = new CanvasGraphics(self.width, self.height);
                alpha.fillStyle = 'rgba(255, 255, 255, 0.002)';
                alpha.fillRect(0, 0, self.width, self.height);
                alpha.setCanvas(self);
                alpha.parent = self;
                self.children[0] = alpha;
                alpha.z = 1;
            }
        }

        this.size = size;

        this.toDataURL = function (type, quality) {
            return _this14.element.toDataURL(type, quality);
        };

        this.render = function (noClear) {
            if (!(typeof noClear === 'boolean' && noClear)) _this14.clear();
            for (var i = 0; i < _this14.children.length; i++) {
                _this14.children[i].render();
            }
        };

        this.clear = function () {
            _this14.context.clearRect(0, 0, _this14.element.width, _this14.element.height);
        };

        this.add = function (child) {
            child.setCanvas(_this14);
            child.parent = _this14;
            _this14.children.push(child);
            child.z = _this14.children.length;
        };

        this.remove = function (child) {
            child.canvas = null;
            child.parent = null;
            _this14.children.remove(child);
        };

        this.destroy = function () {
            for (var i = _this14.children.length - 1; i >= 0; i--) {
                _this14.children[i].destroy();
            }_this14.object.destroy();
            return Utils.nullObject(_this14);
        };

        this.getImageData = function () {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this14.element.width;
            var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this14.element.height;

            _this14.imageData = _this14.context.getImageData(x, y, w, h);
            return _this14.imageData;
        };

        this.getPixel = function (x, y, dirty) {
            if (!_this14.imageData || dirty) _this14.getImageData();
            var imgData = {},
                index = (x + y * _this14.element.width) * 4,
                pixels = _this14.imageData.data;
            imgData.r = pixels[index];
            imgData.g = pixels[index + 1];
            imgData.b = pixels[index + 2];
            imgData.a = pixels[index + 3];
            return imgData;
        };

        this.putImageData = function (imageData) {
            _this14.context.putImageData(imageData, 0, 0);
        };
    };

    /**
     * Canvas font utilities.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Video interface.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * SVG interface.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Scroll interaction.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Slide interaction.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Slide video.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Slide loader with promise method.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Linked list.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Object pool.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * 3D vector.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * 3D utilities.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /* global THREE */

    /**
     * Raycaster.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /* global THREE */

    /**
     * 3D interaction.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Screen projection.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /* global THREE */

    /**
     * Shader helper class.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /* global THREE */

    /**
     * Post processing effects.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /* global THREE */

    /**
     * Alien abduction point.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    /**
     * Alien.js Example Project.
     *
     * @author Patrick Schroen / https://github.com/pschroen
     */

    Config.UI_COLOR = 'white';

    Config.ASSETS = ['assets/images/alienkitty.svg', 'assets/images/alienkitty_eyelid.svg'];

    var AlienKittyCanvas = function (_Interface) {
        _inherits(AlienKittyCanvas, _Interface);

        function AlienKittyCanvas() {
            _classCallCheck(this, AlienKittyCanvas);

            var _this15 = _possibleConstructorReturn(this, (AlienKittyCanvas.__proto__ || Object.getPrototypeOf(AlienKittyCanvas)).call(this, 'AlienKittyCanvas'));

            var self = _this15;
            var canvas = void 0,
                alienkittyimg = void 0,
                eyelidimg = void 0,
                alienkitty = void 0,
                eyelid1 = void 0,
                eyelid2 = void 0;

            initHTML();
            initCanvas();
            initImages();

            function initHTML() {
                self.size(90, 86).css({ opacity: 0 });
            }

            function initCanvas() {
                canvas = self.initClass(Canvas, 90, 86, true);
            }

            function initImages() {
                alienkittyimg = Assets.createImage('assets/images/alienkitty.svg');
                eyelidimg = Assets.createImage('assets/images/alienkitty_eyelid.svg');
                Promise.all([Assets.loadImage(alienkittyimg), Assets.loadImage(eyelidimg)]).then(finishSetup);
            }

            function finishSetup() {
                alienkitty = new CanvasGraphics(90, 86);
                alienkitty.drawImage(alienkittyimg);
                eyelid1 = new CanvasGraphics(24, 14);
                eyelid1.transformPoint('50%', 0).transform({ x: 35, y: 25, scaleX: 1.5, scaleY: 0.01 });
                eyelid1.drawImage(eyelidimg);
                eyelid2 = new CanvasGraphics(24, 14);
                eyelid2.transformPoint(0, 0).transform({ x: 53, y: 26, scaleX: 1, scaleY: 0.01 });
                eyelid2.drawImage(eyelidimg);
                alienkitty.add(eyelid1);
                alienkitty.add(eyelid2);
                canvas.add(alienkitty);
            }

            function blink() {
                self.delayedCall(Utils.headsTails(blink1, blink2), Utils.random(0, 10000));
            }

            function blink1() {
                TweenManager.tween(eyelid1, { scaleY: 1.5 }, 120, 'easeOutCubic', function () {
                    TweenManager.tween(eyelid1, { scaleY: 0.01 }, 180, 'easeOutCubic');
                });
                TweenManager.tween(eyelid2, { scaleX: 1.3, scaleY: 1.3 }, 120, 'easeOutCubic', function () {
                    TweenManager.tween(eyelid2, { scaleX: 1, scaleY: 0.01 }, 180, 'easeOutCubic', function () {
                        blink();
                    });
                });
            }

            function blink2() {
                TweenManager.tween(eyelid1, { scaleY: 1.5 }, 120, 'easeOutCubic', function () {
                    TweenManager.tween(eyelid1, { scaleY: 0.01 }, 180, 'easeOutCubic');
                });
                TweenManager.tween(eyelid2, { scaleX: 1.3, scaleY: 1.3 }, 180, 'easeOutCubic', function () {
                    TweenManager.tween(eyelid2, { scaleX: 1, scaleY: 0.01 }, 240, 'easeOutCubic', function () {
                        blink();
                    });
                });
            }

            function loop() {
                canvas.render();
            }

            _this15.animateIn = function () {
                blink();
                _this15.tween({ opacity: 1 }, 500, 'easeOutQuart');
                _this15.startRender(loop);
            };

            _this15.animateOut = function (callback) {
                _this15.tween({ opacity: 0 }, 500, 'easeInOutQuad', function () {
                    _this15.stopRender(loop);
                    _this15.clearTimers();
                    if (callback) callback();
                });
            };
            return _this15;
        }

        return AlienKittyCanvas;
    }(Interface);

    var Progress = function (_Interface2) {
        _inherits(Progress, _Interface2);

        function Progress() {
            _classCallCheck(this, Progress);

            var _this16 = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, 'Progress'));

            var self = _this16;
            var size = 90;
            var canvas = void 0,
                context = void 0;

            initHTML();
            initCanvas();
            _this16.startRender(loop);

            function initHTML() {
                self.size(size);
                self.progress = 0;
            }

            function initCanvas() {
                canvas = self.initClass(Canvas, size, size, true);
                context = canvas.context;
                context.lineWidth = 5;
            }

            function loop() {
                if (self.progress >= 1 && !self.complete) complete();
                context.clearRect(0, 0, size, size);
                var progress = self.progress || 0,
                    x = size / 2,
                    y = size / 2,
                    radius = size * 0.4,
                    startAngle = Math.radians(-90),
                    endAngle = Math.radians(-90) + Math.radians(progress * 360);
                context.beginPath();
                context.arc(x, y, radius, startAngle, endAngle, false);
                context.strokeStyle = Config.UI_COLOR;
                context.stroke();
            }

            function complete() {
                self.complete = true;
                self.events.fire(Events.COMPLETE);
                self.stopRender(loop);
            }

            _this16.update = function (e) {
                if (_this16.complete) return;
                TweenManager.tween(_this16, { progress: e.percent }, 500, 'easeOutCubic');
            };

            _this16.animateOut = function (callback) {
                _this16.tween({ scale: 0.9, opacity: 0 }, 400, 'easeInCubic', callback);
            };
            return _this16;
        }

        return Progress;
    }(Interface);

    var Loader = function (_Interface3) {
        _inherits(Loader, _Interface3);

        function Loader() {
            _classCallCheck(this, Loader);

            var _this17 = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, 'Loader'));

            var self = _this17;
            var loader = void 0,
                progress = void 0;

            initHTML();
            initLoader();
            initProgress();

            function initHTML() {
                self.size('100%');
            }

            function initLoader() {
                loader = self.initClass(AssetLoader, Config.ASSETS);
                self.events.add(loader, Events.PROGRESS, loadUpdate);
            }

            function initProgress() {
                progress = self.initClass(Progress);
                progress.center();
                self.events.add(progress, Events.COMPLETE, loadComplete);
            }

            function loadUpdate(e) {
                progress.update(e);
            }

            function loadComplete() {
                self.events.fire(Events.COMPLETE);
            }

            _this17.animateOut = function (callback) {
                progress.animateOut(callback);
            };
            return _this17;
        }

        return Loader;
    }(Interface);

    var Main = function Main(_ref) {
        var container = _ref.container;

        _classCallCheck(this, Main);

        container.appendChild(Stage.element);

        var loader = void 0,
            wrapper = void 0,
            alienkitty = void 0;

        initStage();
        initLoader();
        addListeners();

        function initStage() {
            Stage.size('100%').enable3D(2000);
            wrapper = Stage.create('.wrapper');
            wrapper.size('100%').transform({ z: -300 }).enable3D();
            alienkitty = wrapper.initClass(AlienKittyCanvas);
            alienkitty.center();
        }

        function initLoader() {
            loader = Stage.initClass(Loader);
            Stage.events.add(loader, Events.COMPLETE, loadComplete);
        }

        function loadComplete() {
            loader.animateOut(function () {
                loader = loader.destroy();
                Stage.events.fire(Events.COMPLETE);
            });
        }

        function addListeners() {
            Stage.events.add(Events.COMPLETE, complete);
        }

        function complete() {
            wrapper.tween({ z: 0 }, 7000, 'easeOutCubic');
            alienkitty.animateIn();
        }
    };

    return Main;
});
