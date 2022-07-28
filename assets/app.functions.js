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

function sendMessage() {
    let isSent = false;
    // TODO: ??
    return isSent;
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
