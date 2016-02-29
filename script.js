

$(document).ready(function () {
        
    function getTopNews() {
            
        $.ajax('https://content.guardianapis.com/search?api-key=test', {
            success: function (response) {
                response.response.results.forEach(function (el) {
                    var title = el.webTitle;
                    var newsLink = el.webUrl;
                    var newsTextLink = el.apiUrl + '?show-blocks=body&api-key=test';                      
                        
                    $('.news').append("<li data-collapsed = 'true' data-text='" + newsTextLink + "'>" + title + "</li>");                      
                });

            },

            error: function (response) {
                $('.error-response').html("Sorry, we couldn't find news for you. Please try again later.");
            }
        });            
           

    }
        
    function expandText() {
        console.log( $(this).data('text'));
        $.ajax($(this).data('text'), {
            success: function (response) {
                console.log(response);
                console.log( $(this).data('text') );
                   
            }
        });
    }
        



    getTopNews();

    $('.refresh').on('click', function () {
        $('.news').html('');
        getTopNews();
    });

      

    $('.news').on('click', 'li', function (e) {
        var currentLi = $(this);

        

        currentLi.data('collapsed', !currentLi.data('collapsed')) ;

        console.log(currentLi.data('collapsed'));


        if (!currentLi.data('collapsed')) {

             $.ajax($(this).data('text'), {
            success: function (response) {
               console.log(response);
                var textSummary = response.response.content.blocks.body[0].bodyTextSummary;
                var newsLink = response.response.content.webUrl;
                currentLi.append("<p class=summary>" + textSummary + "<a href='" + newsLink + "'> Read full news </a>  </p>");

                 }
            });


        } else {
            currentLi.find('.summary').html('');
        }

    });

})