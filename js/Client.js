/**
 * Created by Krista on 29/10/2015.
 */

$(document).ready(function () {

/* dette er en test fra janik
    console.log("TEST");
// this is the id of the form
    $("#login-block").on('Submit')(function(e) {
        var Username = $('#userfrm').val();
        var Password = $('#passfrm').val();
        var url = "http://localhost:9998/api/login/"; // the script where you handle the form input.
        var data = '{"username": "' + Username + '", "password": "'+ Password +'"}';
        console.log(data);
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: data, // serializes the form's elements.
            error: function(response) {
                $(".info").text("Unfortunately the server is not responding").fadeTo(1000, 1).fadeTo(2000, 0);
            },
            success: function(response)
            {
                console.log(response.message); // show response
                if(response.userid) {
                    $("#overlay").fadeTo("slow",0);
                    $(".sk-folding-cube").delay(100).fadeTo(1600, 1);
                }
                else {
                    $(".info").text("Wrong username or password. Please try again.").fadeTo(1000, 1).fadeTo(2000, 0);
                    //document.location = '/login.php?info=Wrong username or password. Please try again.';
                }
            }
        });
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
*/

/*
jQuery form for login via username or cbs mail
*/

$(".submit-button").click(function(){

    debugger;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:9998/api/login/',
        data: { username: $('#username').val(), password: $('#password').val() },
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

$(".sign-up-button").click(function(){

    debugger;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:9998/api/login/',
        data: { username: $('#username').val(), password: $('#password').val() },
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

/*
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
*/