function generateRandomString(length = 8) {
    let randomStr = parseInt(Math.random().toString().slice(2)).toString(36);
    while (randomStr.length < length) {
        randomStr += String.random();
    }
    randomStr = randomStr.slice(-length);
    return randomStr;
}

module.exports = {
    generateRandomString,
};