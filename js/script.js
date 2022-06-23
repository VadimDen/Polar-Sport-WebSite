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

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn(100);
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut(100);
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn(100);
        })
    });
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожайста, введите свой почтовый адрес",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order-form');

    $('input[name=phone]').mask('+38 (999) 999-9999');

    $('form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    //scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    $('a[href^="#"]').click(function(){
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offSet().top+'px'});
        return false;
    });
});