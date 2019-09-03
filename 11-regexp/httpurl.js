function htmlHttpUrl(str, reg) {
    if (str) {
        reg = reg || /(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)/;
        return reg.test(str);
    }
    return false;
}