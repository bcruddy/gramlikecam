'use strict';

var cam = window.cam || {};

cam = {
    debug: true,
    log: function () {
        if (this.debug && window.console && console.log) {
            console.log.apply(console, arguments);
        }
    },

    letterStore: {
        ' ': ' ',
        'a': ['@', '/\\'],
        'b': ['b'],
        'c': ['c'],
        'd': ['d'],
        'e': ['e'],
        'f': ['f'],
        'g': ['g'],
        'h': ['h'],
        'i': ['1'],
        'j': ['j'],
        'k': ['k'],
        'l': ['l'],
        'm': ['m'],
        'n': ['n'],
        'o': ['o'],
        'p': ['p'],
        'q': ['q'],
        'r': ['r'],
        's': ['$'],
        't': ['t'],
        'u': ['u'],
        'v': ['\\/'],
        'w': ['\\/\\/'],
        'x': ['x'],
        'y': ['y'],
        'z': ['z']
    },

    init: function () {
        $('#camify').click(function () {
            var $input = $('#cam-input');
            var $output = $('#cam-output');

            var raw = $input.val();
            var output = cam.process(raw);

            $output.val(output);
        });
    },

    process: function (raw) {
        var text = raw.split('');
        var store = this.letterStore;

        var last = '';
        var result = [];
        var isCaps = true;

        for (var i = 0; i < text.length; i++) {
            var current = text[i];
            var prev = result[i - 1];

            if (current === ' ') { // alternate caps every other word
                isCaps = !isCaps;
            }

            if (current === prev) {
                result.push(last);
                continue;
            }

            var val = current;
            if (store.hasOwnProperty(current)) {
                val = cam.utils.sample(store[current]); // if we have a match in our letter store, choose a random value from the array
            }

            val = this.setCase(isCaps, val);

            last = val;
            result.push(val);
        }


        return result.filter(function (letter) {
            return letter !== ' ';
        }).join('');
    },

    setCase: function (isCaps, val) {
        if (cam.utils.isLetter(val)) {
            try {
                if (isCaps) {
                    val = val.toUpperCase();
                }
                else {
                    val = val.toLowerCase();
                }
            }
            catch (ex) {}
        }

        return val;
    }
};

cam.utils = {
    sample: function (arr) {
        if (!this.isArray(arr)) {  }

        return arr[Math.floor(Math.random() * arr.length)];
    },

    isArray: function (arrLike) {
        return Object.prototype.toString.call(arrLike) === '[object Array]';
    },

    isLetter: function (char) {
        var charCode = char[0].charCodeAt(0);

        return this.isBetween(charCode, 90, 65) || this.isBetween(charCode, 122, 97);
    },

    isBetween: function (val, upper, lower) {

        return val > lower && val < upper;
    }
};

cam.init();