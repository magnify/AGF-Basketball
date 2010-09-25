$(document).ready(function() {  

    $('#main-menu ul li.active-trail').addClass('selected');

    $('#main-menu ul li')
    .hover(
      function () {
        $('#main-menu ul li.selected').removeClass('active-trail');
        $(this).addClass("hover");
      },
      function () {
        $('#main-menu ul li.selected').addClass('active-trail');
        $(this).removeClass("hover");
      }
    );

});