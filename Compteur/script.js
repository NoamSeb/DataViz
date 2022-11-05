function counter (){
        
        var duration = 30;
        var count = setInterval(function(){
        var c = parseInt($('.counter').text());
        $('.counter').text((++c).toString());
        console.log(duration)
        if (c == 100){
            duration += 100
            console.log(duration)
        }
        
        if (c == 112){
            clearInterval(count);
            $('.counter').addClass('hide')
            $('.preloader').addClass('active')
            $('.text-counter').addClass('active')
        }
    },duration)
}
counter()