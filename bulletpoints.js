$(document).ready(function(){
    $("#rightbullets li").each(function(i) {
        if (i != 5){
            $(this).delay(500 * i).fadeIn(1000);
        }else{
            $(this).delay(3000).fadeIn(1000);
        }
    });
});
