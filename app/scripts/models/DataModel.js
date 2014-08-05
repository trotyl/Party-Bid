function Data () {
}

Data.check_if_contains = function (list, data_to_check) {
    return _(list).findWhere(data_to_check);
};