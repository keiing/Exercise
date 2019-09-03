function isIDCard(str, reg) {
    if (str) {
        reg = reg || /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        return reg.test(str);
    }
    return false
}

function isIDCardFifteen(str, reg) {
    if (str) {
        reg = reg || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        return reg.test(str);
    }
    return false;
}

function isIDCardEighteen(str, reg) {
    if (str) {
        reg = reg || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        return reg.test(str);
    }
    return false;
}