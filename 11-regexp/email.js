function isEmail(str, reg) {
    if (str) {
        reg = reg || /^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/;
        return reg.test(str);
    }
    return false;
}