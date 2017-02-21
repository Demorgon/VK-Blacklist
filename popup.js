window.onload = function () {
    var add_btn = document.getElementById('add_btn');
    var show_btn = document.getElementById('show_btn');
    var replies_switch = document.getElementById('replies_switch');
    add_btn.addEventListener('click', addBadboy);
    addListeners();
    replies_switch.addEventListener('click', repliesSwitch);
    switchSet();
    showBadboy();
}

var storage = chrome.storage.sync;

function addBadboy() {
    var linked;

    storage.get(
        'linked',
        function (data) {
            if (data.linked == null) {
                linked = [];
            } else {
                linked = data.linked;
            }

            var text = document.getElementById('name').value;
            if (text[0] === "/") {
                linked.push(text);
                storage.set({
                    'linked': linked
                });
            } else {
                text = "/" + text;
                linked.push(text);
                storage.set({
                    'linked': linked
                });
            }
            cleanBadboy();
        })
}

function deleteBadboy(name_attr) {
    var linked;
    storage.get('linked', function (data) {
        linked = data.linked;
        linked.forEach(function (item, i, linked) {
            if (item == name_attr) {
                linked.splice(i, 1);
            }
        })
        chrome.storage.sync.set({
            'linked': linked
        });
        showBadboy();
    });
}

function cleanBadboy() {
    var linked, result;

    storage.get('linked', function (data) {
        linked = data.linked;

        for (var i = 0; i < linked.length; i++)
            for (var j = i + 1; j < linked.length; j++)
                if (linked[i] == linked[j]) {
                    linked.splice(j, 1);
                }
        chrome.storage.sync.set({
            'linked': linked
        });
        showBadboy();
    });
}

function showBadboy() {
    var linked;

    storage.get(
        'linked',
        function (data) {
            linked = data.linked;

            var container = document.getElementById('list_container');

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            linked.forEach(function (item, i, linked) {
                var container = document.getElementById("list_container");
                var new_div = document.createElement("div");
                var new_p = document.createElement("p");
                var new_i = document.createElement("i");

                new_p.innerHTML = item.substr(1);
                new_i.innerHTML = "close";
                new_i.className = "material-icons";
                new_i.setAttribute("name", item + "");
                new_div.className = "list_item";

                new_div.appendChild(new_p);
                new_div.appendChild(new_i);
                container.appendChild(new_div);
            })
            addListeners();
        })
}

function addListeners() {
    var delete_btn = document.getElementsByClassName('material-icons');
    for (var i = 0; i < delete_btn.length; i++) {
        var some_btn = delete_btn.item(i);
        some_btn.addEventListener('click', function () {
            deleteBadboy(this.getAttribute("name"));
        });
    }
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