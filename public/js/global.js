'use strict';

var glc = window.glc || {};

glc = {
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
        'i': ['i', 'î', 'ï', 'í', 'ī', 'į', 'ì'],
        'j': ['j'],
        'k': ['k'],
        'l': ['l', 'ł'],
        'm': ['m'],
        'n': ['n', 'ñ', 'ń'],
        'o': ['o', 'ô', 'ö', 'ò', 'ó', 'ø', 'ō', 'õ'],
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
        var $english = $('#english');
        var $camified = $('#camified');

        $('#camify').click(function () {
            var raw = $english.val();
            var output = glc.camify(raw);

            $camified.val(output);
        });

        $('#un-camify').click(function () {
            var raw = $camified.val();
            var output = glc.english(raw);

            $english.val(output);
        });
    },

    camify: function (raw) {
        var text = raw.split('');
        var store = this.letterStore;

        var isCaps = true;
        var last = '';
        var result = [];

        for (var i = 0; i < text.length; i++) {
            var current = text[i];

            if (current === ' ')
                isCaps = !isCaps;

            if (text[i - 1] === '.')
                isCaps = true;

            if (glc.utils.isLetter(current)) {
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
                val = glc.utils.sample(store[current]); // if we have a match in our letter store, choose a random value from the array
            }

            last = val;
            result.push(val);
        }

        return result.filter(function (letter) {
            return letter !== ' ';
        }).join('');
    },

    english: function (raw) {
        var text = raw.split('');
        var store = this.letterStore;

        var result = [];
        for (var i = 0; i < text.length; i++) {
            var current = text[i];

            var val = '';
            for (var letter in store) {
                if (store[letter].indexOf(current) !== -1) {
                    val = letter;
                }
            }

            result.push(val);
        }

        return result.join('');
    }
};

glc.utils = {
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

        return val >= lower && val <= upper;
    },

    isUpper: function (val) {
        return this.isBetween(val, 90, 65);
    },

    isLower: function (val) {
        return this.isBetween(val, 122, 97);
    }
};

glc.init();