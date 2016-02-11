$(document).ready(function ()  {

    $.ajax("https://content.guardianapis.com/search?api-key=test", {
        complete: function (response) {
            if (response.readyState == 4) {
            var parsedResponse = jQuery.parseJSON(response.responseText);}
        console.log(parsedResponse);

        parsedResponse.response.results.map(function (el) {
            var title = el.webTitle;
            var newsLink = el.webUrl;
            $("#news").append("<li> <a href='" + newsLink + "'> "  + title + "</a> </li>");
        });

        }
    });
});