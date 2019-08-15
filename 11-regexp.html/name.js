function isName(str, reg) {
    if (str) {
        reg = reg || /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{3,16}$/;
        return reg.test(str);
    }
    return false;
}