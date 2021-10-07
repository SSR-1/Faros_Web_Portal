exports.getNextId = function (last_id) {
    const fixed_str = last_id.replace(/(usr[0]+)(.*)/g, "$1");
    const variable_int = last_id.replace(/(usr[0]+)(.*)/g, "$2");
    return`${fixed_str}${parseInt(variable_int) + 1}`;
}