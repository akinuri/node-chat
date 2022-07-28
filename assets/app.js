function initSendMessage() {
    let message = collectMessage();
    let entry = writeMessage(message, true);
    $("#messageBox").val("");
    sendMessage(message, () => {
        console.error("The last message could not be sent.");
        entry.remove();
    });
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
    
    getMessages(() => {
        writeMessage({
            from : {
                user : "Me",
                time : getCurrentTime(),
            },
            message : "Lorem ipsum may be used as a placeholder before final copy is available.",
        }, true);
    });
    
});
