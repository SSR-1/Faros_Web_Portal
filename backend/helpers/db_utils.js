exports.getNextId = function (last_id) {
    const fixed_str = last_id.replace(/([a-z]+)(.*)/g, "$1");
    const variable_int = last_id.replace(/([a-z]+)(.*)/g, "$2");
    const incremented_int = (parseInt(variable_int) + 1).toString().padStart(5, "0");
    return `${fixed_str}${incremented_int}`;
}