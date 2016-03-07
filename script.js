

$(document).ready(function () {
        
    function getTopNews() {
            
        $.ajax('https://content.guardianapis.com/search?api-key=test', {
            success: function (response) {

                var numPages = response.pages;
                $('.pages-quantity').text('of ' + numPages + ' pages');  

                response.response.results.forEach(function (el) {
                    var title = el.webTitle;
                    var newsLink = el.webUrl;
                    var newsTextLink = el.apiUrl + '?show-blocks=body&api-key=test';                      
                    
                    $('.news').append("<li data-collapsed = 'true' data-text='" + newsTextLink + "'>  <span class='articleTitle'>" + title + "</span> <span class='arrowCollapsed arrow'> </span>  </li>");

            
                });

               

            },

            error: function (response) {
                $('.error-response').html("Sorry, we couldn't find news for you. Please try again later.");
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

        
        if (!currentLi.data('collapsed')) {

             $.ajax($(this).data('text'), {
            success: function (response) {
                var textSummary = response.response.content.blocks.body[0].bodyTextSummary;
                var newsLink = response.response.content.webUrl;

                                
                if(currentLi.find('.summary').length > 0) {                
                currentLi.find('.summary').slideDown('slow'); 
                currentLi.addClass('clicked');
                      }

                else {  
                currentLi.append("<p class='summary'>" + textSummary + "<a href='" + newsLink + "'> Read full news </a>  </p>").children('.arrow').removeClass('arrowCollapsed').addClass('arrowExpanded');
                currentLi.find('.summary').slideDown('slow'); 
                currentLi.addClass('clicked');
                }


                 }
            });


        } else {
            currentLi.find('.summary').slideUp('slow');
            currentLi.children('.arrow').removeClass('arrowExpanded').addClass('arrowCollapsed');
            currentLi.removeClass('clicked');
        }

    });

})