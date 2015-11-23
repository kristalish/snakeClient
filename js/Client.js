/**
 * Created by Krista on 29/10/2015.
 */

$(document).ready(function () {

/*
jQuery form for login via username or cbs mail
*/

$(".submit-button").click(function(){

    var Username = $('#username').val();
    var Password = $('#password').val();
    var user = {
        username: Username,
        password: Password
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/login',
        data: JSON.stringify(user),
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Du er nu logged ind');
            window.location.href = '../html/home.html';
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });


    });



});



/*$(".sign-up-button").click(function(){


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/login/',
        data: { username: $('#username').val(), password: $('#password').val() },
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Du er nu logged ind');
            window.location.href = '../html/signUp.html';
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });



});*/

