export const hoursInMilliseconds = (HOURS) => 1 * 1000 * 60 * 60 * HOURS;
export const daysInMilliseconds = (DAYS) => hoursInMilliseconds(24) * DAYS;

export const isEquivalent = (a, b, ignore) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if ((ignore && ignore.indexOf(propName)> -1)) {
            continue;
        }
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

// export const filterLogs = (logs, from, to) => {
//     const filteredLogs = logs.filter(log => {
//         log.createdAt = new Date(log.createdAt);
//         return log.createdAt >= from && log.createdAt <= to;
//     });
//     return prepareLogs(filteredLogs);
// };
