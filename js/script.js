$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 700,
      //adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
      responsive: [
        {
            breakpoint: 920,
            settings: {
                arrows: false,
                dots: true
            }
        }
      ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content')
      .removeClass('catalog__content_active').eq($(this).index())
      .addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click' , function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })
  }

  $(".clients-item__more a").on("click", function(e) {
    e.preventDefault();
    var $this = $(this); 
    var $content = $this.parent().prev("div.clients-item__comment");
    var linkText = $this.text().toUpperCase();    
    
    if(linkText === "БОЛЬШЕ"){
        linkText = "скрыть";
        $content.switchClass("clients-item__comment_hidden", "clients-item__comment_visible", 400);
    } else {
        linkText = "больше";
        $content.switchClass("clients-item__comment_visible", "clients-item__comment_hidden", 400);
    };

    $this.text(linkText);
    });

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

});