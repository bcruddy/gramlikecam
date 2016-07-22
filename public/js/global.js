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
        'a': ['a', 'á', 'å', 'à', 'â', 'ä', 'ã', 'ā'],
        'b': ['b'],
        'c': ['c', 'ç', 'ć', 'č'],
        'd': ['d'],
        'e': ['e', 'è', 'é', 'ê', 'ë', 'ē', 'ė', 'ę'],
        'f': ['f'],
        'g': ['g'],
        'h': ['h'],
        'i': ['i', 'î', 'ï', 'í', 'ī', 'į', 'ì', '1'],
        'j': ['j'],
        'k': ['k'],
        'l': ['l', 'ł'],
        'm': ['m'],
        'n': ['n', 'ñ', 'ń'],
        'o': ['ô', 'ö', 'ò', 'ó', 'ø', 'ō', 'õ'],
        'p': ['p'],
        'q': ['q'],
        'r': ['r'],
        's': ['s', 'ś', 'š'],
        't': ['t'],
        'u': ['u', 'û', 'ü', 'ù', 'ú', 'ū'],
        'v': ['v'],
        'w': ['w'],
        'x': ['x'],
        'y': ['y', 'ÿ'],
        'z': ['z', 'ž', 'ź', 'ż'],
        'A': ['A','À', 'Á', 'Â', 'Ä', 'Ã', 'Å', 'Ā'],
        'B': ['B', '8'],
        'C': ['C', 'Ç', 'Ć', 'Č'],
        'D': ['D'],
        'E': ['E','È', 'É', 'Ê', 'Ë', 'Ē', 'Ė', 'Ę', '3'],
        'F': ['F'],
        'G': ['G'],
        'H': ['H'],
        'I': ['I', '1', 'Î', 'Ï', 'Í', 'Ī', 'Į', 'Ì'],
        'J': ['J'],
        'K': ['K'],
        'L': ['L', 'Ł'],
        'M': ['M'],
        'N': ['N', 'Ñ', 'Ń'],
        'O': ['O', '0', 'Ô', 'Ö', 'Ò', 'Ó', 'Ø', 'Ō', 'Õ'],
        'P': ['P'],
        'Q': ['Q'],
        'R': ['R'],
        'S': ['S', 'Ś', 'Š', '5'],
        'T': ['T', '7'],
        'U': ['U', 'Û', 'Ü', 'Ù', 'Ú', 'Ū'],
        'V': ['V'],
        'W': ['W'],
        'X': ['X'],
        'Y': ['Y', 'Ÿ'],
        'Z': ['Z', 'Ž', 'Ź', 'Ż'],
        '.': ['•']
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

        var isCaps = true;
        var last = '';
        var result = [];

        for (var i = 0; i < text.length; i++) {
            var current = text[i];

            if (current === ' ')
                isCaps = !isCaps;

            if (cam.utils.isLetter(current)) {
                if (isCaps)
                    current = current.toUpperCase();
                else
                    current = current.toLowerCase();
            }

            if (current === result[result.length - 1]) {
                result.push(last);
                continue;
            }

            var val = current;
            if (store.hasOwnProperty(current)) {
                val = cam.utils.sample(store[current]); // if we have a match in our letter store, choose a random value from the array
            }

            last = val;
            result.push(val);
        }

        return result.filter(function (letter) {
            return letter !== ' ';
        }).join('');
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