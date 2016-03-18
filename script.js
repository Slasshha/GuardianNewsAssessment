

$(document).ready(function () {
        var currentPage = 1;
    function getTopNews(reqPage) {
            
        $.ajax('https://content.guardianapis.com/search?api-key=test&page='+ reqPage, {
            success: function (response) {

                var numPages = response.response.pages;
                currentPage = response.response.currentPage;

                console.log(response);
                $('.pages-quantity').text('of ' + numPages + ' pages'); 
                $('.current').val(currentPage); 

                if (currentPage === 1) {
                    $('.previous').prop("disabled",true);
                } else {
                     $('.previous').prop("disabled", false);
                }

                if (currentPage === numPages) {
                     $('.next').prop("disabled",true);
                } else {
                    $('.next').prop("disabled",false);
                };
                       
                response.response.results.forEach(function (el) {
                    var title = el.webTitle;
                    var newsLink = el.webUrl;
                    var newsTextLink = el.apiUrl + '?show-blocks=body&api-key=test';                   
                    
                    $('.news').append("<li class='newsLine' data-collapsed = 'true' data-text='" + newsTextLink + "'>  <span class='articleTitle'>" + title + "</span> <span class='arrowCollapsed arrow'> </span>  </li>");

            
                });

               

            },

            error: function (response) {
                $('.error-response').html("Sorry, we couldn't find news for you. Please try again later.");
            }
        });            
           

    }    
        

    getTopNews(currentPage);

    $('.refresh').on('click', function () {
        $('.news').html('');
        getTopNews(currentPage);
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

    $('.next').on('click', function(e) {
        $('.error-response').html('');
        $('.news').html('');
        getTopNews(currentPage+1);

    })

    $('.previous').on('click', function(e) {

        $('.error-response').html('');
        $('.news').html('');
        getTopNews(currentPage-1);
    })

    $('.current').on("keypress", function(e) {
            if (e.keyCode == 13) {
            currentPage = $('.current').val();
            $('.news').html('');
            getTopNews(currentPage);         

            }
        });



})