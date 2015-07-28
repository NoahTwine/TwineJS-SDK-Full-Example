//var tabWidth = 960;
//var mobWidth = 767;
var masterSliderResize = false;
var tabWidth = 959;
var mobWidth = 767;
var bannerText = '';
jQuery(document).ready(function ($) {


    if ($('.banner-description').length > 0) {
        bannerText = $('.banner-description').text();
    }

    var openPosition = '685px';
    if (checkMediaQuery(mobWidth)) {
        openPosition = '263px';
    }
    var menuTimerOut, menuTimerOver;
    var adjustMenu = function () {
        var ww = document.body.clientWidth;
        $("#jqMyAccountTitle").removeClass('expanded');
        $(".mds-main-menu-wrapper, #jqCorraMenu, .push-button").hide();
        if (checkMediaQuery(tabWidth)) {
            $("#jqCorraMenu, .push-button").show();
            jQuery(".nav").addClass("vMenu");
            jQuery(".nav").removeClass("hMenu");
            $(".nav li").unbind('mouseenter mouseleave');
            $(document).undelegate(".nav li.parent", "click");
            $(document).delegate(".nav li.parent", "click", function (e) {
                var expandSpanClick = false;
                if ($(e.target).is('span')) {
                    if ($(e.target).closest('a').attr('href') == 'javascript:;') {
                        expandSpanClick = true;
                    }
                }
                if ($(e.target).hasClass("parent") || expandSpanClick) {
                    $('.expanded').not(this).each(function () {
                        $(this).removeClass('expanded').parent("li").removeClass("hover").end().find("ul:first").hide();
                        ;
                    });
                    $(this).toggleClass('expanded');
                    $(this).parent("li").toggleClass("hover");
                    $(this).find("ul:first").slideToggle();
                    $("#jPanelMenu-menu").toggleClass("switch-bg");
                    return false;
                }
            });
            $(".col-left.sidebar").insertBefore(".col-main");
            $("#jqMyAccountMenu").hide();
            if ($('.banner-description').length > 0) {
                if (checkMediaQuery(mobWidth)) {
                    if (bannerText.length > 30) {
                        $(".banner-description").text(bannerText.substr(0, 35) + '...').show();
                    }
                } else {
                    if (bannerText.length > 85) {
                        $(".banner-description").text(bannerText.substr(0, 85) + '...').show();
                    }
                }
                $(".banner-description").show();
            }
        } else {
            $(document).undelegate(".nav li a.parent", "click");

            $("#jqMyAccountMenu").show();
            $(".mds-main-menu-wrapper").show();
            //*
            $(".nav").addClass("hMenu");
            $(".nav").removeClass("vMenu");
            //*/
            $(".toggleMenu").css("display", "none");
            $(".nav").show();
            $(".nav li").removeClass("hover over");
            $(".nav li a").unbind('click');

            $(".nav li.level-top").unbind('mouseenter').bind('mouseenter', function () {
                me = $(this);
                clearInterval(menuTimerOver);
                menuTimerOver = setTimeout(function () {
                    $(".nav li.level-top").not(me).removeClass('hover over');
                    me.addClass('hover over');
                }, 300);
            });
            $(".nav li.level-top").unbind('mouseleave').bind('mouseleave', function () {
                me = $(this);
                clearInterval(menuTimerOver);
                clearInterval(menuTimerOut);
                menuTimerOut = setTimeout(function () {
                    $(".nav li.level-top").removeClass('hover over');
                }, 300);
            });

            $(".col-left.sidebar").insertAfter(".col-main");
            if ($('.banner-description').length > 0) {
                if (bannerText.length > 100) {
                    $(".banner-description").text(bannerText.substr(0, 115) + '...').show();
                }
                $(".banner-description").show();
            }

        }
    };
    
    jQuery(document).ready(function ($) {
    	console.log(105);
        var winWidth = document.body.clientWidth;
        $(".nav li a").each(function () {
            if ($(this).next().length > 0) {
                $(this).addClass("parent");
            }
            ;
        });
        /**
         * Push Menu
         */

        var pushMenuStarted = 0;
        var jPM = $.jPanelMenu({
            menu: '.mds-main-menu',
            trigger: '#jqCorraMenu',
            duration: 50,
            closeOnContentClick: false,
            keyboardShortcuts: false,
            openPosition: openPosition,
            afterClose: function () {
                $("#jPanelMenu-menu").hide();
                masterSliderResize = true;
                $(window).trigger('resize');
            },
            beforeShow: function () {

                $("#jPanelMenu-menu").show();


            }
        });
        console.log(137);
        var wrapper = document.querySelector(".wrapper");
        if (wrapper && document.addEventListener) {
            wrapper.addEventListener("touchmove", function () {
                jPM.close();
            }, true);
        }
        var showPushMenu = function () {
//             if(masterSliderResize == true){
// 				 masterSliderResize = false;
// 				return false;
//             }
            adjustMenu();

            winWidth = document.body.clientWidth;
            if (checkMediaQuery(tabWidth)) {
                if (pushMenuStarted === 0) {
                    //jPM.on();
                    pushMenuStarted = 1;


                }
            } else {          
                if (pushMenuStarted === 1 && jPM.isOpen()) {
                    //jPM.close();
                }
                $(".jPanelMenu-panel").css("left", 0);
                $("#jPanelMenu-menu").hide();
            }
        };
        console.log(166);
        showPushMenu();
        if (isMobile.any()) {
            if (!window.addEventListener) {
            	console.log(171);
                window.attachEvent("orientationchange", function () {
                    //showPushMenu();
                    setTimeout(function () {
                        showPushMenu();
                    }, 1000);
                    if (pushMenuStarted === 1) {
                        // jPM.close();
                    }
                }, false);
            }
            else {
            	console.log(182);
                window.addEventListener("orientationchange", function () {
                    //showPushMenu();
                    setTimeout(function () {
                        showPushMenu();
                    }, 1000);
                    if (pushMenuStarted === 1) {
                        jPM.close();
                    }
                }, false);

                //Mobile FF
                var mqOrientation = window.matchMedia("(orientation: portrait)");

                // The Listener will fire whenever this either matches or ceases to match
                mqOrientation.addListener(function () {
                    showPushMenu();
                });
            	console.log(182);                
            }
        } else {
        	console.log(203);
            $(window).resize(function () {
                showPushMenu();
            });
        }
        /* $(window).resize(function() {
         showPushMenu();
         }); */
    });

    //$("#jqMyAccountTitle").unbind('click');
    $("#jqMyAccountTitle").on('click', function () {
        $(this).toggleClass('expanded');
        $("#jqMyAccountMenu").slideToggle();
        return false;
    });
    //set hover style to opportunity & experience
    setTimeout(setAtciveToOpportunity, 500);
    function setAtciveToOpportunity() {
        var li = jQuery("#nav ul li a[href='" + location.href + "']").closest('li');
        var index = jQuery('li.level0').index(li);
        if (index == 2 || index == 4) {
            li.addClass('hover over');
        }
    }
    
    console.log(229);

    //sortMyAccountLinks();
    function sortMyAccountLinks() {
        var myAccountLinks = jQuery('#myAccountContent ul.links li');
        var menuCount = myAccountLinks.length;
        var linksArray = [];
        myAccountLinks.each(function () {
            pos = jQuery(this).attr('data-position');
            if (typeof pos != 'undefined') {
                linksArray[pos] = jQuery(this).context.outerHTML;
            } else {
                linksArray[menuCount] = jQuery(this).context.outerHTML;
            }

        });


        if (linksArray.length > 0) {
            menuUl = jQuery('#myAccountContent ul.links');
            var linkHtml = '';
            menuLInkCount = menuUl.find('li').length;
            for (i = 0; i < menuLInkCount; i++) {
                if (typeof linksArray[i] != 'undefined') {
                    linkHtml += linksArray[i];
                }
            }
            menuUl.html(linkHtml);
        }
    }


});