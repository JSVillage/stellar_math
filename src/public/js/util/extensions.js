window.toJsonData = window.toJsonData || function toJsonData(form) {
    var data = {};
    var formArr = form.serializeArray();
    var i = 0;
    for (i; i < formArr.length; i++) {
        data[formArr[i].name] = formArr[i].value;
    }
    return data;
};