jQuery(document).ready(function() {
    const SCREEN_WIDTH = window.innerWidth;
    const TIME_TRANSITION = 1000;
    const NUMBER_SCROLL_WHEEL = 1;
    const SCREEN_HEIGHT = jQuery(".wrapper_page").outerHeight(true);
    let width_menu = 0;
    let current_position_menu = 0;
    let delta = 0 ;
    let touchStart = 0;
    let touchEnd = 0;
    let scrolling = false;
    let currentScrollingTop = 0;
    let currentScrollingBottom = 0;
    let currentPage=0;
    let totalNumberPage = jQuery(".page").length;

     if(SCREEN_WIDTH>1200){
       jQuery(".page").eq(0).addClass("animate");
       jQuery(".menu_link").eq(0).addClass("activ_link");
      jQuery(".menu_link").click(function(){
        moveScrollLine (jQuery(this).data("id"));
        movePage(jQuery(this).data("id"));
      });

      function moveScrollLine (position){
        if(position==0) jQuery(".scroll_line").css({"top": "0%"});
        if(position==1) jQuery(".scroll_line").css({"top": "33.3333%"});
        if(position==2) jQuery(".scroll_line").css({"top": "66.6666%"});
        currentPage=position;
      }
      function movePage(current){
        if(current==0) jQuery(".wrapper_page").css({"top": "0%"});
        if(current==1) jQuery(".wrapper_page").css({"top": -SCREEN_HEIGHT/3});
        if(current==2) jQuery(".wrapper_page").css({"top": -(SCREEN_HEIGHT/3)*2});
        jQuery(".page").removeClass("animate");
        jQuery(".page").eq(current).addClass("animate");
        currentPage=current;
      }

      jQuery('body').bind('mousewheel', function(e){
        if( e.originalEvent.deltaY < 0 && scrolling === false ){
            currentScrollingTop++;
            if(currentScrollingTop==NUMBER_SCROLL_WHEEL){
              restartData();
              currentPage--;
              changePage(currentPage);
            }
        } else if (e.originalEvent.deltaY > 0 && scrolling === false) {
            currentScrollingBottom++;
            if(currentScrollingBottom==NUMBER_SCROLL_WHEEL){
              restartData();
              currentPage++;
              changePage(currentPage);
            }
        }
    });

    function changePage(currentPage){
      if( currentPage<0 ) {
        currentPage=0;
        moveActivate(currentPage);
      } else if (currentPage==totalNumberPage) {
        currentPage=totalNumberPage-1;
        moveActivate(currentPage);
      } else {
        moveActivate(currentPage);
      }
      setTimeout(() => {
        scrolling=false;
      }, TIME_TRANSITION);
  }

    function moveActivate(currentPage){
      movePage(currentPage);
      moveScrollLine(currentPage);
      jQuery(".menu_link").removeClass("activ_link");
      jQuery(".menu_link").eq(currentPage).addClass("activ_link");
    }

      function restartData(){
        currentScrollingTop=0;
        currentScrollingBottom=0;
        scrolling = true;
      }

      document.onkeydown = function (event) {
       if(event.keyCode==38){
          currentPage--;
          changePage(currentPage);
       } else if (event.keyCode==40) {
        currentPage++;
        changePage(currentPage);
       }
    };

     } else if(SCREEN_WIDTH<768) {
      jQuery(".left_part_item").eq(0).addClass("activ_item");
      setTimeout(() => {
        jQuery(".page").addClass("animate");
      for(let i=0; i<jQuery(".left_part_item").length; i++){
        width_menu += jQuery(".left_part_item").eq(i).outerWidth();
        jQuery(".menu_link").eq(i).attr("href", "#page_"+i);
      }
      jQuery(".left_part").width(width_menu+10);

      const left_part = document.querySelector(".left_part");
      left_part.addEventListener("touchstart", (event)=>{
        touchStart=event.changedTouches[0].pageX;
      });
      left_part.addEventListener("touchend", (event)=>{
        touchEnd=event.changedTouches[0].pageX;
        moveMenu();
      });

      function moveMenu(){
        delta = touchStart-touchEnd;
        current_position_menu+=delta;
        if( current_position_menu > width_menu-screen.width) {
          current_position_menu = width_menu-screen.width;
        }
        if(current_position_menu < 0) {
          current_position_menu = 0;
        }
        jQuery(".left_part").css({"margin-left": current_position_menu < 0 ? 0: -current_position_menu}); 
      }

      jQuery(".left_part_item").click(function(){
        jQuery(".left_part_item").removeClass("activ_item");
        jQuery(this).addClass("activ_item");
      });
      }, 100);
     }
  });
  