$(document).ready(function ()  {
getTopNews();

$(".refresh").on('click', function () {
$(".news").html("");
getTopNews();  } );
    
});

function getTopNews() { $.ajax("https://content.guardianapis.com/search?api-key=test", {
        success: function (response) {
            response.response.results.forEach(function (el) {
            var title = el.webTitle;
            var newsLink = el.webUrl;
            $(".news").append("<li> <a href='" + newsLink + "'> "  + title + "</a> </li>");
        });

        },

                
        error: function (jqXHR, exception) {
        var warningMessage = '';
        if (jqXHR.status === 0) {
            warningMessage = "Sorry, we couldn't find news for you. Please try again later.";
        } else if (jqXHR.status == 404) {
            warningMessage = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            warningMessage = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            warningMessage = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            warningMessage = 'Time out error.';
        } else if (exception === 'abort') {
            warningMessage = 'Ajax request aborted.';
        } else {
            warningMessage = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('.errorResponse').html(warningMessage);
        }

    });
 }