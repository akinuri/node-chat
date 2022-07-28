function initSendMessage() {
    let message = collectMessage();
    let entry = writeMessage(message, true);
    $("#messageBox").val("");
    // sendMessage(message, (isSent) => {
    //     if (!isSent) {
    //         entry.remove();
    //     }
    // });
}

$("#sendMessageButton").on("click", initSendMessage);

$("#messageBox").on("keydown", (e) => {
    e = e.originalEvent;
    if (e.code == "Enter" && e.ctrlKey) {
        initSendMessage();
    }
});

$(document).ready(() => {
    $("#history").css("height", $("#history").css("height"));
});
