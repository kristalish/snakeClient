/**
 * Created by Krista on 29/10/2015.
 */

$(document).ready(function () {

    /*
     jQuery form for login via username
     */

    $(".submit-button").click(function () {

        var user = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        /*
         ajax call for the database
         */
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/login',
            data: JSON.stringify(user),
            beforeSend:function(){
                // this is where we append a loading image
                $('.myLoadingImage').css("display", "block");
            },
            success: function (data) {
                // successful request; do something with the data
                $.session.set('userId', data.userid);
                $('.myLoadingImage').css("display", "none");
                window.location.href = '../html/home.html';
            },
            error: function () {
                // failed request; give feedback to user
                $('.myLoadingImage').css("display", "none");
                alert('Der skete en fejl');

            }
        });

    });


    /*
     Jquery form to create a new user
     */
    $(".create-user").click(function () {

        var user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val()
        };

        /*
         ajax call for the database
         */
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/users',
            data: JSON.stringify(user),
            beforeSend:function(){
                // this is where we append a loading image
                $('.myLoadingImage').css("display", "block");
            },
            success: function (data) {
                // successful request; do something with the data
                $('.myLoadingImage').css("display", "none");
                alert('Ny user bum');
                window.location.href = '../html/index.html';
            },
            error: function () {
                // failed request; give feedback to user
                $('.myLoadingImage').css("display", "none");
                alert('Der skete en fejl');

            }
        });


    });
//click function that creates the game. variables name, opponent and host are declared in a createGame
    $(".create-game").click(function () {

        var createGame = {
            name: $('#gameName').val(),
            mapSize: $('#mapSize').val(),
            opponent: {
                id: $('#opponent').val()
            },
            host: {
                id: $.session.get('userId'),
                controls: $('#controls').val()
            }
        };


        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games',
            data: JSON.stringify(createGame),
            beforeSend:function(){
                // this is where we append a loading image
                $('.myLoadingImage').css("display", "block");
            },
            success: function (data) {
                // successful request; do something with the data
                $('.myLoadingImage').css("display", "none");
                alert('Congratulations, you have created a new game');
                window.location.href = '../html/games.html';
            },
            error: function () {
                // failed request; give feedback to user
                $('.myLoadingImage').css("display", "none");
                alert('Der skete en fejl');

            }
        });


    });


    /*
     dropdown that lists all the users in the database. the users chooses the opponent
     */
    var options = $("#opponent");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8888/api/users',
        beforeSend: function () {
            // this is where we append a loading image
            $('form').append('loader');
        },
        success: function (data) {
            // successful request; show all users from an array in a select box
            $.each(data, function () {
                options.append("<option value=" + this.id + ">" + this.username + "</option>");
                // console.log(this)
            });
        },
        error: function () {
            // failed request; give feedback to user

            alert('Der skete en fejl');

        }
    });
});

/*
 Delete game
 */
$(".deleteGame").click(function () {

    var gameid = $('#gameID').val(),
        host = $.session.get('userId');


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/' + gameid,
        data: JSON.stringify(gameid),
        beforeSend:function(){
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Game deleted');
            /*window.location.href = '../html/home.html';*/
        },
        error: function () {
            // failed request; give feedback to user
            $('.myLoadingImage').css("display", "none");
            alert('Der skete en fejl');

        }
    });


});


/*
 Join game function
 */
$(".join-game").click(function () {

    var joinGame = {
        gameId: $('#gameID').val(),
        opponent: {
            id: $.session.get('userId')
        }
    };


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/join/',
        data: JSON.stringify(joinGame),
        beforeSend:function(){
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Congratulations, you have joined game');
        },
        error: function () {
            // failed request; give feedback to user
            $('.myLoadingImage').css("display", "none");
            alert('Der skete en fejl');

        }
    });


});

/*
 Start game function
 Declaring the varible that AJAX will send to the server
 */
$(".start-game").click(function () {

    var startGame = {
        gameId: $('#gameID').val(),
        opponent: {
          //  id: $.session.get('userId'),
            controls: $('#controls').val()
        }
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/start/',
        data: JSON.stringify(startGame),
        beforeSend:function(){
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Congratulations, you have started game');
        },
        error: function () {
            // failed request; give feedback to user
            $('.myLoadingImage').css("display", "none");
            alert('Der skete en fejl');

        }
    });

});

/*
AJAX kald til serveren. Henter de ti højeste scores.
 */
$.ajax({
    type: 'GET',
    url: 'http://localhost:8888/api/scores',
    success: function (data) {
        // successful request; do something with the data
        data.forEach(function (item) {
            var highscore =
                "<tr><td>" + item.user.username + "</td><td>" + item.game.gameId + "</td><td>" + item.score + "</td></tr>";
            $('.highscore').append(highscore);
        })
    },
    error: function (){
        // failed request; give feedback to user
        alert('Der skete en fejl');
    }
});





