//window.onload = startHideBadboy();
window.onload = function () {
    var add_btn = document.getElementById('add_btn');
    var delete_btn = document.getElementById('delete_btn');
    var show_btn = document.getElementById('show_btn');
    var replies_switch = document.getElementById('replies_switch');
    //    show_btn.addEventListener('click', showBadboy);
    add_btn.addEventListener('click', addBadboy);
    delete_btn.addEventListener('click', deleteBadboy);
    replies_switch.addEventListener('click', repliesSwitch);
    switchSet();
    showBadboy();
}

var storage = chrome.storage.sync;
//var add_btn = document.getElementById('add_btn');


function addBadboy() {
    var linked;

    storage.get(
        'linked',
        function (data) {
            if (data.linked == null) {
                linked = [];
                alert("Can't find.")
            } else {
                linked = data.linked;
            }

            var text = document.getElementById('name').value;
            alert("Added: " + text);
            linked.push(text);
            storage.set({
                'linked': linked
            });
            showBadboy();
        })


}

function deleteBadboy() {
    var text = document.getElementById('name').value;
    var linked;
    storage.get('linked', function (data) {
        linked = data.linked;
        linked.forEach(function (item, i, linked) {
            if (item == text) {
                linked.splice(i, 1);
                alert("This good man will be visible again: " + text);
            }
        })
        chrome.storage.sync.set({
            'linked': linked
        });
        showBadboy();
    });
}

function showBadboy() {
    var linked;
    var text = document.getElementById("show");
    storage.get('linked', function (data) {
        linked = data.linked;
        text.innerHTML = "Mraz'es: ";
        linked.forEach(function (item, i, linked) {
            text.innerHTML += "*" +
                item.toString() + "* ";
        })
    });
}

function switchSet() {
    var switchState;
    storage.get('replies', function (data) {
        switchState = data.replies;
        if (switchState == "1") {
            replies_switch.checked = true;
        } else {
            replies_switch.checked = false;
        }
    });
}

function repliesSwitch() {
    if (replies_switch.checked) {
        storage.set({
            'replies': "1"
        });
    } else {
        storage.set({
            'replies': "0"
        });
    }
}