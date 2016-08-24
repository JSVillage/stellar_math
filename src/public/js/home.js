$( document ).ready(function() {
    $('#send-button').click(function(e){
        e.preventDefault();
        return signup();
    });

    $('#launch-button').click(function(e){
        e.preventDefault();
        return signin();
    });
});

function signup() {
    var data = toJsonData( $('#user-info') );
    $.post('/signup', data, function(){
        window.location.href = '/user';
    });
}

function signin() {
    var data = toJsonData( $('#user-info') );
    $.post('/signin', data, function(){
        window.location.href = '/user';
    });
}