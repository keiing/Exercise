function ImgUrl(str, reg) {
    if (str) {
        reg = reg || /(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/;
        return reg.test(str);
    }
    return false;
}