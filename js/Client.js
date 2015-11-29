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
            $.session.set('userId', data.userid)

           window.location.href = '../html/home.html';
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });

    });



$(".create-user").click(function(){

    var Firstname =$('#firstName').val();
    var Lastname =$('#lastName').val();
    var Email =$('#email').val();
    var Username = $('#username').val();
    var Password = $('#password').val();
    var user = {
        firstName: Firstname,
        lastName: Lastname,
        email: Email,
        username: Username,
        password: Password
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/users',
        data: JSON.stringify(user),
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny user bum');
            window.location.href = '../html/home.html';
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });


});
//click function that creates the game. variables name, opponent and host are
$(".create-game").click(function(){

    var createGame = {
        name: $('#name').val(),
        opponent: {
            id: $('#opponent').val()
        },
        host: {
            id: $.session.get('userId'),
            controls: $('#host').val()
        }
    };


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games',
        data: JSON.stringify(createGame),
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny user bum');
            /*window.location.href = '../html/home.html';*/
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });


});





var options = $("#opponentlist");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8888/api/users',
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; show all users from an array in a select box
            $.each(data, function() {
                options.append("<option>"+this.username+"</option>");
            });
        },
        error:function(){
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });



});


