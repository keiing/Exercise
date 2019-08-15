function phone(str, reg) {
    if (str) {
        reg = reg || /1(?:3d{3}|5[^4D]d{2}|8d{3}|7(?:[35678]d{2}|4(?:0d|1[0-2]|9d))|9[189]d{2}|66d{2})d{6}$/;
        return reg.test(str);
    }
    return false;
}
function fixedphone(str,reg){
    //fixed包括包括移动和固定电话
    if(str){
        reg=reg||/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
        return reg.test(str);
    }
    return false;
}