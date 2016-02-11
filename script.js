$(document).ready(function ()  {

    $.ajax("https://content.guardianapis.com/search?api-key=test", {
        success: function (response) {
            response.response.results.map(function (el) {
            var title = el.webTitle;
            var newsLink = el.webUrl;
            $(".news").append("<li> <a href='" + newsLink + "'> "  + title + "</a> </li>");
        });

        }
    });
});