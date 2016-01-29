$(function(){   
    var winW=$(window).width(),winH=$(window).height();
    $("#list>li").height(winH);
    $("html").css("fontSize",winW/640*100+"px");
    $("#list>li").on('touchstart',start);
    function start(e) {        
        this.touchY=e.targetTouches[0].pageY;
        $("#list>li").on('touchmove',move);
        $("#list>li").on('touchend',end);    
    }
    function move(e) {
        e.preventDefault();
    }
    function end(e) {
        var disY=e.changedTouches[0].pageY- this.touchY;
        var indx=$(this).index();
        if(disY > 30){
            indx--;
            if(indx==3){
                $(".next").show();
            }  
            if(indx<0){
                indx=0;
            }                                                   
        }else if(disY <-30){ 
            indx++;   
             if(indx==4){
               $(".next").hide();
            }
            if(indx>4){               
                indx=4;
            }        
        } 
        swiper(indx);
    }
    function swiper(indx){
        $('#list>li').eq(indx).addClass('show');
        setTimeout(function() {
            $('#list>li').eq(indx).siblings().removeClass('show');
        },1000);
        $('#list').css('-webkit-transform','translateY('+-indx*winH+'px)');
    }
    //music
    (function(){
        var audio=new Audio();
        audio.src="music.mp3";
        audio.autoplay=true;
        audio.loop=true;
        audio.play();
        $("#music").on("touchend",function() {        
            if(!this.close){            
                audio.pause();
                $(this).removeClass("rting");
                this.close=true;
                return;
            }
            audio.play();
            $(this).addClass("rting");
            this.close=false;              
        })
    })();
})
