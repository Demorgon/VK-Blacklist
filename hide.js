window.onload = hideBadboy();

function hideBadboy() {
    var storage = chrome.storage.sync;
    var linked;
    storage.get(
        'linked',
        function (data) {
            linked = data.linked;
        })
    setInterval(function () {
        var result = [];
        var elems = $('.author');

        for (var i = 0, elem; elem = elems[i++];) {
            for (var x = 0; x < linked.length; x++) {
                if (elem.getAttribute('href') == linked[x]) {
                    result[result.length] = elem;
                }
            }
        }

        result.forEach(function (item) {
            for (var i = 0; i < 4; i++) {
                item = item.parentElement;
            }
            item.style.display = "none";
        })


    }, 250);
    hideReplies();
}

function hideReplies() {
    var storage = chrome.storage.sync;
    var linked;
    var replies;

    storage.get(
        'linked',
        function (data) {
            linked = data.linked;
        })
    storage.get(
        'replies',
        function (data) {
            replies = data.replies;
            if (replies == "1") {
                setInterval(function () {
                    var result = [];
                    var elems = $('.reply_author a');

                    for (var i = 0, elem; elem = elems[i++];) {
                        for (var x = 0; x < linked.length; x++) {
                            if (elem.getAttribute('href') == linked[x]) {
                                result[result.length] = elem;
                            }
                        }
                    }

                    result.forEach(function (item) {
                        for (var i = 0; i < 3; i++) {
                            item = item.parentElement;
                        }
                        item.style.display = "none";
                    })
                }, 250);
            }
        })
}