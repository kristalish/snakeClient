/**
 * Created by Krista on 29/10/2015.
 */

$(document).ready(function () {

/*
jQuery form for login via username or cbs mail
 */

$("#frontPage .loginForm").on('submit', function(){
    $.ajax({
        type: 'POST',
        url: 'api/login/',
        data: { username: $('#username-email').val(), password: $('#password').val() },
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Du er nu logged ind');
            window.location.href = 'http://google.dk';
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });


    });
});


$.ajax({
    type: 'GET',
    url: 'http://jsonplaceholder.typicode.com/posts',
    beforeSend: function(){
        $('#myFancyList').append('<li>Loader...</li>');
    },
    success:function(data){
        // successful request; do something with the data
        $('#myFancyList').html('');
        for(var i = 0; i < data.length; i++){
            $('#myFancyList').append('<li>' + data[i].title + '</li>');
        }
    },
    error:function(){
        // failed request; give feedback to user
        $('#myFancyList').html('');
        $('#myFancyList').append('<li>Det gik galt :/</li>');

    }
});
