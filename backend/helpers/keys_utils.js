exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
}

const secret_keys = ["abh45d", "abh567", "678ftg", "145xg7"];

exports.validate_secret_key = function (secret_key) {
    if (secret_keys.includes(secret_key)) {
        return true;
    } else { 
        return false;
    }
}