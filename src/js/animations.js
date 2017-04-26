/**
 * Created by adssets on 2017-01-23.
 */

/* * * * * * * * PREVIEW BUTTON * * * * * * * */

/* Clicking preview button */
/* Display preview popup, hide preview button */
function displayPreviewPopup() {
  /* show popup */
  addClass("preview-button-icon", "hide-me");
  addClass("preview-popup", " show-preview-popup");

  /* hide preview button, transition preview button into preview popup by expanding and fading it */
  addClass("preview-button", "preview-button-expand");
  /* after collapsing sidebar, this is needed to display popup again, on preview button click */
  removeClass("preview-popup", "hide-preview-popup");
  removeClass("preview-popup", "preview-popup-expand");

  /* instantly remove the label-hover onclick,
   otherwise the preview-popup will push away the label while animating */
  document.getElementById('preview-button-label').style.display='none';
  removeClass("preview-button-label","label-hover");

  /* remove the display none while the label-hover is still hidden. after 1.5s */
  setTimeout(
    function() {
      document.getElementById('preview-button-label').style.display='';
    }, 1500);
}

/* Display preview-button-label "Preview & Save" */
function showPreviewButtonLabel() {
  addClass("preview-button-label"," label-hover");
}

/* Hide the preview-button-label */
function hidePreviewButtonLabel() {
  removeClass("preview-button-label","label-hover");
}

/* * * * * * * * PREVIEW POPUP * * * * * * * */

/* Clicking expand on preview popup */
/* Display preview sidebar, hide preview popup */
function displayPreviewExpanded() {
  addClass("preview-popup", "preview-popup-expand");

  removeClass("preview-sidebar","hide-me");

  /* Subtract 300px in width to encompass the preview sidebar */
  document.getElementsByClassName("page-content-wrapper")[0].style.width = "calc(100% - 300px)";
  /* Hide content scroll x.   Preview sidebar will overlap content if under content
   is under 1000px causing a scroll. This will hide it. */
/*  document.getElementsByClassName("page-content-wrapper")[0].style.overflowX = "hidden";*/

  /* hide preview popup */
  removeClass("preview-popup", "show-preview-popup");
  /* expand and hide preview popup */
  addClass("preview-sidebar", " show-preview-sidebar");
}

/* Close preview popup, back to button */
function closePreviewPopup() {
  /* hide popup, by adding hide class */
  removeClass("preview-popup", "show-preview-popup");

  /* show button, by removing the hide class */
  removeClass("preview-button","preview-button-expand");
  removeClass("preview-button-icon", "hide-me");

}

/* * * * * * * * PREVIEW SIDEBAR * * * * * * * */


/* Collapse preview sidebar, display popup */
function collapsePreviewSidebar() {
  /* show preview popup */
  removeClass("preview-popup", "preview-popup-expand");
  addClass("preview-popup", " show-preview-popup");

  if(document.getElementsByClassName("page-content-wrapper")[0] !== undefined) {
    /* return width to 100% again, and hide sidebar by adding the hide class */
    document.getElementsByClassName("page-content-wrapper")[0].style = "";
/*    document.getElementsByClassName("page-content-wrapper")[0].style.overflowX = "auto";*/
    addClass("preview-sidebar", "hide-me");

    /* push sidebar outside content area, by removing right=0 */
    removeClass("preview-sidebar", "preview-sidebar-show");
    /* return sidebar to original position */
    removeClass("preview-sidebar", "show-preview-sidebar");
  }
}

/* Close preview sidebar, back to preview button */
function closePreviewSidebar() {
  /* show button, by removing the hide class */
  removeClass("preview-button", "preview-button-expand");
  removeClass("preview-button-icon", "hide-me");


  /* return width to 100% again, and hide sidebar by adding the hide class */
  document.getElementsByClassName("page-content-wrapper")[0].style.width = "";
/*  document.getElementsByClassName("page-content-wrapper")[0].style.overflowX = "auto";*/
  removeClass("preview-sidebar", "show-preview-sidebar");

  /* push sidebar outside content area, by removing right=0 */
  removeClass("preview-sidebar","preview-sidebar-show");

  /* return popup to initial state */
  removeClass("preview-popup","preview-popup-expand");

  /* return sidebar to original position */
  removeClass("preview-sidebar", "show-preview-sidebar");
}

function removeClass(element,CSSclassName) {
  if(document.getElementById(element) != null) {
    document.getElementById(element).className =
      document.getElementById(element).className.replace(CSSclassName, "");
  }
  }

function addClass(element, CSSclassName) {
  if(document.getElementById(element) != null) {
    document.getElementById(element).className += CSSclassName;
  }
  }




/* * * * * * * * ROTATE ICONS * * * * * * * */

function spinIcon(icon) {
  icon.style.transition = "2s";
  icon.style.transform = "rotate(720deg)";

  /* return icon to original position after animation has ended */
  setTimeout(
    function() {
      icon.style='';
    }, 2300);
}



/* * * * * * * Accordion menu animation * * * * * */

jQuery(document).ready(function () {

  var accordionsMenu = $("#accordion-menu-main");
  accordionsMenu.css("height", (window.innerHeight - 95+"px"));

  if (accordionsMenu.length > 0) {

    accordionsMenu.each(function () {
      var accordion = $(this);
      //detect change in the input[type="checkbox"] value
      accordion.on('change', 'input[type="checkbox"]', function () {
        var checkbox = $(this);
        if(checkbox.prop('checked')){
          checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300);
         /* document.getElementById("group-2").checked = false;*/
        }else{
          checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
        }


      });
    });
  }
});


/* * * * * * * * * * DISABLE SCROLLING HORIZONTALLY * * * * * * * * */
/* This is a workaround for now */
/*$(function() {

  var $body = $(document);
  $body.bind('scroll', function() {
    // "Disable" the horizontal scroll.
    if ($body.scrollLeft() !== 0) {
      $body.scrollLeft(0);
    }
  });

});*/

/* * * * * * * * * * SLIMSCROLL * * * * * * * * */

/*
/!* slimscroll *!/
$(function(){
  $('.table-container-height').slimScroll({
    height: '300px'
  });
});
*/

/* * * * * * * * * * HAMBURGER BUTTON * * * * * * * * */
/*(function() {


  "use strict";

  var toggles = document.querySelectorAll(".c-hamburger");
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      console.log("asd");
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

})();*/


function hamburgerToggle() {
  if(document.getElementById("hamburger-menu-btn").className.indexOf("is-active") != -1) {
    removeClass("hamburger-menu-btn", " is-active");
  }
  else {
  addClass("hamburger-menu-btn", " is-active");
  }
};

/* * * * * * * * * * BODY RESIZE LISTENER * * * * * * * * */


window.addEventListener('resize', function(){

  var accordionsMenu = $("#accordion-menu-main")
  accordionsMenu.css("height", (window.innerHeight - 95+"px"));


  if(window.innerWidth > 991 && document.body.className.indexOf("body-desktop") == -1) {
    document.body.className += " body-desktop";
    hamburgerToggle();
  } else if(window.innerWidth < 991 && document.body.className.indexOf("body-desktop") != -1){
    document.body.className = document.body.className.replace("body-desktop", "");
    hamburgerToggle();
  }
}, true);





window.addEventListener('resize', function () {

  var previewPopup = document.getElementById("previewPopup");
  var scriptPopup = document.getElementById("scriptPopup");
  var loadingIcon = document.getElementById("loadingIcon");

  if(previewPopup !== null){
    var divWidth = previewPopup.offsetWidth/2;
    var divHeight = previewPopup.offsetHeight/2;

    var newWidth = (event.target.innerWidth/2)
    var newHeight = (event.target.innerHeight/2)

    previewPopup.style.right = newWidth+divWidth+"px";
    previewPopup.style.bottom = newHeight+divHeight+"px";
  }
  if(scriptPopup !== null){
    var divWidth = scriptPopup.offsetWidth/2;
    var divHeight = scriptPopup.offsetHeight/2;

    var newWidth = (event.target.innerWidth/2)
    var newHeight = (event.target.innerHeight/2)

    scriptPopup.style.right = newWidth+divWidth+"px";
    scriptPopup.style.bottom = newHeight+divHeight+"px";
  }
  if(loadingIcon !== null){
    var divWidth = scriptPopup.offsetWidth/2;
    var divHeight = scriptPopup.offsetHeight/2;

    var newWidth = (event.target.innerWidth/2)
    var newHeight = (event.target.innerHeight/2)

    loadingIcon.style.right = newWidth+divWidth+"px";
    loadingIcon.style.bottom = newHeight+divHeight+"px";
  }

});
