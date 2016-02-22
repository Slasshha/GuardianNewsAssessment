$(document).ready(function() {

        function getTopNews() {
            $.ajax('https://content.guardianapis.com/search?api-key=test', {
                success: function(response) {
                    response.response.results.forEach(function(el) {
                        var title = el.webTitle;
                        var newsLink = el.webUrl;
                        $('.news').append("<li> <a href='" + newsLink + "'> " + title + "</a> </li>");
                    });

                },


                error: function(response) {
                    $('.error-response').html("Sorry, we couldn't find news for you. Please try again later.");
                }

            });

            getTopNews();

            $('.refresh').on('click', function() {
                $('.news').html('');
                getTopNews();
            });

        });


}