function getCurrentTime() {
    let d = new Date();
    let time = [
        d.getHours().toString().padStart(2, 0),
        d.getMinutes().toString().padStart(2, "0"),
    ].join(":");
    return time;
}

function collectMessage() {
    let message = {
        id: generateRandomString(),
        from : {
            user : $("#user").val(),
            time : getCurrentTime(),
        },
        message : $("#messageBox").val(),
    };
    return message;
}

function createChatEntry(message, isSelf = false) {
    let entry = `
    <div class="entry">
        <div class="from">
            <div class="user">${message.from.user}</div>
            ·
            <div class="time">${message.from.time}</div>
        </div>
        <div class="message">${message.message}</div>
    </div>
    `;
    let tempEl = document.createElement("div");
    tempEl.innerHTML = entry;
    entry = tempEl.children[0].cloneNode(true);
    if (isSelf) {
        entry.classList.add("self");
    }
    entry.dataset.id = message.id;
    return entry;
}

function writeMessage(message, isSelf = false) {
    if (!message.from.user || !message.message) {
        return null;
    }
    let entry = createChatEntry(message, isSelf);
    let historyElement = $("#history");
    let shouldScroll = isScrolledToBottom(historyElement.get(0));
    historyElement.append(entry);
    if (isSelf || shouldScroll) {
        entry.scrollIntoView();
    }
    return entry;
}

function isScrolledToBottom(el) {
    return el.scrollTop + el.clientHeight > el.scrollHeight - (el.clientHeight / 2);
}

function sendMessage(message, failCallback = null) {
    if (message.from.user && message.message) {
        $.ajax({
            url: document.baseURI + "messages",
            type: "POST",
            data: JSON.stringify(message),
            contentType: 'application/json; charset=utf-8',
            error: function (msg) {
                console.log(msg);
                failCallback && failCallback();
            },
        });
    }
}

// lets test the scroll on message receive
function receiveMessage() {
    let message = {
        from : {
            user : "Shia",
            time : getCurrentTime(),
        },
        message : "Just do it!",
    };
    writeMessage(message);
}

function createUser(user) {
    let li = document.createElement("li");
    li.className = "list-group-item pulse";
    li.textContent = user;
    return li;
}

function writeUser(user) {
    $("#users").prepend(user);
}

function receiveUser() {
    let user = createUser("Michael");
    writeUser(user);
}

function getMessages(afterId = null, callback = null) {
    let url = document.baseURI + "messages";
    if (afterId) {
        url += "?after=" + afterId;
    }
    $.get(url, (data) => {
        for (let message of data) {
            writeMessage(message);
        }
        callback && callback();
    });
}

function generateRandomString(length = 8) {
    let randomStr = parseInt(Math.random().toString().slice(2)).toString(36);
    while (randomStr.length < length) {
        randomStr += String.random();
    }
    randomStr = randomStr.slice(-length);
    return randomStr;
}
