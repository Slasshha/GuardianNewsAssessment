

    $(document).ready(function () {
        
        function getTopNews() {
            
            $.ajax('https://content.guardianapis.com/search?api-key=test', {
                success: function (response) {
                                        response.response.results.forEach(function (el) {
                        var title = el.webTitle;
                        var newsLink = el.webUrl;
                        var newsTextLink = el.apiUrl + '?show-blocks=body&api-key=test';                      
                        
                        $('.news').append("<li data-text='" + newsTextLink + "'>" + title + "</li>");                      
                    });

                },

                error: function (response) {
                    $('.error-response').html("Sorry, we couldn't find news for you. Please try again later.");
                }
            });            
           

        }
        
            function expandText() {
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
            console.log('clickkk');
            expandText();
        });
    });

