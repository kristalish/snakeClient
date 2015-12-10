/**
 * Created by Krista on 29/10/2015.
 */

$(document).ready(function () {

    /*
     jQuery form for login via username
     deklarer variablen user ved værdierne username og password
     */

    $(".submit-button").click(function () {

        var user = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        /*
         variablen sendes med en POST til endpointet /login
         inden det bliver sendt sørger beforeSend funktionen for at
         en loader i form af en nyancat bliver vist
         success funktionen tager dataen fra user, og sender
         derefter bliver brugeren sendt videre til home.html
         her bliver der også sat en session af userid, således at browseren husker hvem der er logget ind
         error funktionen eksekveres hvis der er fejl i ajax kaldet. Der bliver brugeren promptet med en besked
         */
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/login',
            data: JSON.stringify(user),
            beforeSend: function () {
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
     en variable: user deklareres med nedenstående værdier
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
         variablen sendes med en POST til endpointet /users
         inden det bliver sendt sørger beforeSend funktionen for at
         en loader i form af en nyancat bliver vist
         success funktionen tager dataen fra user, og sender
         derefter åbnes et vindue med en besked til brugeren om at ny bruger er oprettet
         herefter sendes brugeren videre til login - index.html
         error funktionen eksekveres hvis der er fejl i ajax kaldet.
         */
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/users',
            data: JSON.stringify(user),
            beforeSend: function () {
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
    /*
     click function that creates the game.
     values name, opponent and host are declared in a variable: createGame
     */
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

        /*
         variablen sendes med en POST til endpointet /games
         inden det bliver sendt sørger beforeSend funktionen for at
         en loader i form af en nyancat bliver vist
         success funktionen tager dataen fra createGame, og sender
         derefter åbnes et vindue med en besked til brugeren om at spillet er oprettet
         error funktionen eksekveres hvis der er fejl i ajax kaldet.
         */

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games',
            data: JSON.stringify(createGame),
            beforeSend: function () {
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
     dropdown that lists all the users in the database.
     */
    var options = $("#opponent");

    /*
     ajax kald til at hente alle brugere i systemet. brugerne hentes med et array
     de sættes ind i en select (dropdown) der viser usernavn
     error funktion køres hvis der er en fejl

     */
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
 Delete game klik funktion eksekveres ved klik på deleteGame knappen
 variablen gameid deklarers
 */
$(".deleteGame").click(function () {

    var gameid = $('#gameID').val();

    /*
     variablen sendes med en POST til endpointet /games + gameid
     inden det bliver sendt sørger beforeSend funktionen for at
     en loader i form af en nyancat bliver vist
     success funktionen tager dataen fra gameid, og sender
     derefter åbnes et vindue med en besked til brugeren om at spillet er slettet
     error funktionen eksekveres hvis der er fejl i ajax kaldet.
     */

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/' + gameid,
        data: JSON.stringify(gameid),
        beforeSend: function () {
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Game deleted');

        },
        error: function () {
            // failed request; give feedback to user
            $('.myLoadingImage').css("display", "none");
            alert('Der skete en fejl');

        }
    });


});


/*
 Join game click function eksekveres ved klik på join-game knappen
 variablen joinGame deklareres og opponent id tages fra $.session.get
 */
$(".join-game").click(function () {

    var joinGame = {
        gameId: $('#gameID').val(),
        opponent: {
            id: $.session.get('userId')
        }
    };

    /*
     variablen sendes med en POST til endpointet /join
     inden det bliver sendt sørger beforeSend funktionen for at
     en loader i form af en nyancat bliver vist
     success funktionen tager dataen fra joinGame, og sender
     derefter åbnes et vindue med en besked til brugeren om at spillet er joined
     til sidst bliver brugern sendt tilbage til games.html
     error funktionen eksekveres hvis der er fejl i ajax kaldet.
     */

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/join/',
        data: JSON.stringify(joinGame),
        beforeSend: function () {
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Congratulations, you have joined game');
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
 Start game click function - eksekveres ved at klikke på knappen start-game
 Deklarer en variable, startGame som AJAX skal sende til serveren
 */
$(".start-game").click(function () {

    var startGame = {
        gameId: $('#gameID').val(),
        opponent: {
            //  id: $.session.get('userId'),
            controls: $('#controls').val()
        }
    };

    /*
     variablen sendes med en POST til endpointet /start
     inden det bliver sendt sørger beforeSend funktionen for at
     en loader i form af en nyancat bliver vist
     success funktionen tager dataen fra startGame, og sender
     derefter åbnes et vindue med en besked til brugeren om at spillet er startet
     til sidst bliver brugern sendt tilbage til games.html
     error funktionen eksekveres hvis der er fejl i ajax kaldet.
     */
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/games/start/',
        data: JSON.stringify(startGame),
        beforeSend: function () {
            // this is where we append a loading image
            $('.myLoadingImage').css("display", "block");
        },
        success: function (data) {
            // successful request; do something with the data
            $('.myLoadingImage').css("display", "none");
            alert('Congratulations, you have started game');
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
 AJAX kald til serveren af typen GET til endpoint /scores.
 success funtkionen:
 Henter de ti højeste scores i et array der lægges ind som items
 og placeres i celler i tabellen på highscore.html
 error funktionen:
 prompter brugeren med 'der skete en fejl'
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
    error: function () {
        // failed request; give feedback to user
        alert('Der skete en fejl');
    }
});





