/**
 * Template name: Sina-nav Multi Purpose Menu
 * Template URI: https://github.com/shaonsina/sina-nav-4
 * Version: 2.0
 * Author: shaonsina
 */

(function ($) {
	'use strict';
	$.fn.sinaNav = function () {
		return this.each( function() {
			var getNav		= $(this),
				top 		= getNav.data('top') || getNav.offset().top,
				mdTop 		= getNav.data('md-top') || getNav.offset().top,
				xlTop 		= getNav.data('xl-top') || getNav.offset().top,
				navigation 	= getNav.find('.sina-menu'),
				getWindow 	= $(window).outerWidth(),
				anim 		= getNav.data('animate-prefix') || '',
				getIn 		= navigation.data('in'),
				getOut 		= navigation.data('out');

				$(window).on('resize', function(){
					getWindow 	= $(window).outerWidth();
				});

			// Active Class Add & Remove 
			// ---------------------------
			getNav.find('.sina-menu').each(function(){
				var $menu = $(this);
				$menu.on('click', function(e) {
					if ( 'A' == e.target.tagName ) {
						$menu.find('li.active').removeClass('active');
						$(e.target).parent().addClass('active');
					}
				});

				$menu.find('li.active').removeClass('active');
				$menu.find( 'a[href="'+ location.href +'"]' ).parent('li').addClass('active');
			});

			// Navbar Center 
			// ---------------------------------
			if( getNav.hasClass('logo-center')){
				var mainNav		= getNav.find('.sina-menu'),
					rightNav 	= mainNav.clone(),
					lists 		= mainNav.children('li'),
					divided 	= Math.round(lists.length / 2);

				// Remove All list item for newly creation
				mainNav.empty();
				rightNav.empty();

				// Create left part
				for (var i = 0; i < divided; i++) {
					mainNav.append( lists[i] );
				}
				mainNav.addClass('sina-menu-right').wrap('<div class="col-half left"></div>');

				// Create right part
				for (var i = divided; i < lists.length; i++) {
					rightNav.append( lists[i] );
				}
				getNav.find('.col-half.left').after( rightNav.addClass('sina-menu-dropdown-right sina-menu-left') );
				rightNav.wrap('<div class="col-half right"></div>');
			}

			// Mobile Sidebar
			// ---------------------------------
			if( getNav.hasClass('mobile-sidebar') ) {
				var $collapse = getNav.find('.navbar-collapse');

				// Add Class to body
				if ( $('body').children('.wrapper').length < 1 ) {
					$('body').wrapInner('<div class="wrapper"></div>');
				}

				if ( getNav.hasClass('navbar-reverse') ) {
					$collapse.on('shown.bs.collapse', function() {
						$('body').addClass('mobile-right');
					});
					$collapse.on('hide.bs.collapse', function() {
						$('body').removeClass('mobile-right');
					});
					$(window).on('resize', function(){
						$('body').removeClass('mobile-right');
						getNav.find('.navbar-collapse').removeClass('show');
						getNav.find('.navbar-toggle .fa', this).removeClass('fa-times').addClass('fa-bars');
					});
				}
				else{
					$collapse.on('shown.bs.collapse', function() {
						$('body').addClass('mobile-left');
					});
					$collapse.on('hide.bs.collapse', function() {
						$('body').removeClass('mobile-left');
					});
					$(window).on('resize', function(){
						$('body').removeClass('mobile-left');
						getNav.find('.navbar-collapse').removeClass('show');
						getNav.find('.navbar-toggle .fa', this).removeClass('fa-times').addClass('fa-bars');
					});
				}
			}

			// Navbar Fixed
			// ---------------------------------
			function freezNav() {
				var scrollTop = $(window).scrollTop(),
					winWidth  = $(window).outerWidth();

				if( winWidth > 1599 && scrollTop > xlTop ){
					getNav.addClass('navbar-freez');
				}
				else if( winWidth < 1600 && winWidth > 1199 && scrollTop > top ){
					getNav.addClass('navbar-freez');
				}
				else if( winWidth < 1200 && winWidth > 1024 && scrollTop > mdTop ){
					getNav.addClass('navbar-freez');
				}
				else {
					getNav.removeClass('navbar-freez');
				}
			}
			if( getNav.hasClass('navbar-fixed') ){

				$(window).on('scroll', function(){
					freezNav();
				});
				$(window).on('resize', function(){
					freezNav();
				});

				if ( getWindow > 1024 && $(window).scrollTop() > top ) {
					getNav.addClass('navbar-freez');
				}
			}

			// Navbar Transparent
			// ---------------------------------
			function transNav() {
				var scrollTop = $(window).scrollTop(),
					winWidth  = $(window).outerWidth();

				if( winWidth > 1599 && scrollTop > xlTop ){
					getNav.removeClass('navbar-transparent');
				}
				else if( winWidth < 1600 && winWidth > 1199 && scrollTop > top ){
					getNav.removeClass('navbar-transparent');
				}
				else if( winWidth < 1200 && winWidth > 1024 && scrollTop > mdTop ){
					getNav.removeClass('navbar-transparent');
				}
				else {
					getNav.addClass('navbar-transparent');
				}
			}
			if( getNav.hasClass('navbar-transparent') ){

				$(window).on('scroll', function(){
					transNav();
				});
				$(window).on('resize', function(){
					transNav();
				});

				if ( getWindow > 1024 && $(window).scrollTop() > top ) {
					getNav.removeClass('navbar-transparent');
				}
			}

			// Search-box
			// ---------------------------------
			getNav.find('.extension-nav').each(function(){
				$('.search > a', this).on('click', function(e){
					e.preventDefault();
					$('.search-box').slideToggle();
				});
			});
			$('.search-addon.close-search').on('click', function(){
				$('.search-box').slideUp();
			});

			// Widget-bar
			// ---------------------------------
			getNav.find('.extension-nav').each(function(){
				$('.widget-bar-btn > a', this).on('click', function(e){
					e.preventDefault();
					getNav.children('.widget-bar').toggleClass('on');
					getNav.children('.sina-nav-overlay').addClass('on').removeClass('off');
				});
			});
			getNav.find('.widget-bar .close-widget-bar').on('click', function(e){
				e.preventDefault();
				getNav.children('.widget-bar').removeClass('on');
				getNav.children('.sina-nav-overlay').addClass('off').removeClass('on');
			});

			// Toggle Button
			getNav.find('.navbar-toggle').on('click', function(){
				$('.fa', this).toggleClass('fa-bars').toggleClass('fa-times');
			});


			// Eevent
			// -------------------------------------
			getNav.find('.sina-menu, .extension-nav').each(function(){
				var menu = this;

				$('.dropdown-toggle', menu).on('click', function (e) {
					e.stopPropagation();
					return false;
				});

				$('.dropdown-menu', menu).addClass(anim+'animated');
				$('.dropdown', menu).on('mouseenter', function(){
					var dropdown = this;

					$('.dropdown-menu', dropdown).eq(0).removeClass(getOut).stop().fadeIn().addClass(getIn);
					$(dropdown).addClass('on');
				});
				$('.dropdown', menu).on('mouseleave', function(){
					var dropdown = this;

					$('.dropdown-menu', dropdown).eq(0).removeClass(getIn).stop().fadeOut().addClass(getOut);
					$(dropdown).removeClass('on');
				});
				$('.mega-menu-col', menu).children('.sub-menu').removeClass('dropdown-menu '+anim+'animated');
			});

			if( getWindow < 1025 ) {
				// Megamenu
				getNav.find('.menu-item-has-mega-menu').each(function(){
					var megamenu 	= this,
						$columnMenus = [];

					$('.mega-menu-col', megamenu).children('.sub-menu').addClass('dropdown-menu '+anim+'animated');
					$('.mega-menu-col', megamenu).each(function(){
						var megamenuColumn = this;

						$('.mega-menu-col-title', megamenuColumn).on('mouseenter', function(){
							var title = this;

							$(title).closest('.mega-menu-col').addClass('on');
							$(title).siblings('.sub-menu').stop().fadeIn().addClass(getIn);
						});

						if( !$(megamenuColumn).children().is('.mega-menu-col-title') ) {
							$columnMenus.push( $(megamenuColumn).children('.sub-menu') );
						}
					});

					$(megamenu).on('mouseenter', function(){
						var submenu;
						for (submenu in $columnMenus) {
							$columnMenus[ submenu ].stop().fadeIn().addClass(getIn);
						}	
					});

					$(megamenu).on('mouseleave', function() {
						$('.dropdown-menu', megamenu).stop().fadeOut().removeClass(getIn);
						$('.mega-menu-col', megamenu).removeClass('on');
					});
				});
			}
		});
	}
	// Initialize
	$('.sina-nav').sinaNav();
}(jQuery));


$(function () {
					      $('#res_blog_1_box').show();
					      $('#about_1_box').show();
					      $('#res_blog_1').addClass('staffing-sub-menu_activeBg');
					      $('#about_1').addClass('staffing-sub-menu_activeBg');
                         
                         //// first part
                          $('#leadership_1').add('#mission_1').add('#history_1').add('#work_1').add('#about_1').on('mouseover', function(){
					      var id = $(this).attr('id');
					      $('#leadership_1_box').hide();
					      $('#mission_1_box').hide();
					      $('#history_1_box').hide();
					      $('#work_1_box').hide();
					      $('#about_1_box').hide();
					      
					      $('#leadership_1').removeClass('staffing-sub-menu_activeBg');
					      $('#mission_1').removeClass('staffing-sub-menu_activeBg');
					      $('#history_1').removeClass('staffing-sub-menu_activeBg');
					      $('#work_1').removeClass('staffing-sub-menu_activeBg');
					      $('#about_1').removeClass('staffing-sub-menu_activeBg');
					      $('#'+id).show().addClass('staffing-sub-menu_activeBg');
					      $('#'+id+"_box").show()
					    });
					     //// first part
					     
					     
					     $('#res_blog_1').add('#res_sal_1').add('#res_per_1').add('#res_best_1').add('#res_upcoming_1').add('#res_press_1').add('#res_awards_1').add('#res_case_1').add('#res_white_1').add('#res_news_1').on('mouseover', function(){
					      var id = $(this).attr('id');
					     
					      $('#res_blog_1_box').hide();
					      $('#res_sal_1_box').hide();
					      $('#res_per_1_box').hide();
					      $('#res_best_1_box').hide();
					      $('#res_upcoming_1_box').hide();
					      $('#res_press_1_box').hide();
					      $('#res_awards_1_box').hide();
					      $('#res_case_1_box').hide();
					      $('#res_white_1_box').hide();
					      $('#res_news_1_box').hide();
					      
					      $('#res_blog_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_sal_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_per_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_best_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_upcoming_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_awards_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_case_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_white_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_news_1').removeClass('staffing-sub-menu_activeBg');
					      $('#res_press_1').removeClass('staffing-sub-menu_activeBg');
					      $('#'+id).show().addClass('staffing-sub-menu_activeBg');
					      $('#'+id+"_box").show()
					    });
						//// second part end
						
						 $('#ind_fin_1_box').show();
						 $('#ind_fin_1').addClass('staffing-sub-menu_activeBg');
						 $('#ind_fin_1').add('#ind_health_1').add('#ind_tech_1').add('#ind_bio_1').add('#ind_ene_1').add('#ind_gov_1').add('#ind_manu_1').add('#ind_supply_1').add('#ind_higher_1').add('#ind_hospitality_1').on('mouseover', function(){
					      var id = $(this).attr('id');
					     
					      $('#ind_fin_1_box').hide();
					      $('#ind_health_1_box').hide();
					      $('#ind_tech_1_box').hide();
					      $('#ind_bio_1_box').hide();
					      $('#ind_ene_1_box').hide();
					      $('#ind_gov_1_box').hide();
					      $('#ind_manu_1_box').hide();
					      $('#ind_supply_1_box').hide();
					      $('#ind_higher_1_box').hide();
					      $('#ind_hospitality_1_box').hide();
					      
					      $('#ind_fin_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_health_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_tech_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_bio_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_ene_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_gov_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_manu_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_supply_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_higher_1').removeClass('staffing-sub-menu_activeBg');
					      $('#ind_hospitality_1').removeClass('staffing-sub-menu_activeBg');
					      $('#'+id).show().addClass('staffing-sub-menu_activeBg');
					      $('#'+id+"_box").show()
					    });
						
						//// fouth part
						  $('#con_office_1_box').show();
					      $('#con_office_1').addClass('staffing-sub-menu_activeBg');
                          $('#con_office_1').add('#con_inq_1').add('#con_candi_1').on('mouseover', function(){
					      var id = $(this).attr('id');
					      $('#con_office_1_box').hide();
					      $('#con_inq_1_box').hide();
					      $('#con_candi_1_box').hide();
					      $('#con_office_1').removeClass('staffing-sub-menu_activeBg');
					      $('#con_inq_1').removeClass('staffing-sub-menu_activeBg');
					      $('#con_candi_1').removeClass('staffing-sub-menu_activeBg');
					      $('#'+id).show().addClass('staffing-sub-menu_activeBg');
					      $('#'+id+"_box").show()
					    });
						
						 $('#judge-staffing').addClass('staffing-sub-menu_activeBg');
						 $('#staff_dir_1_box').show();
						 $('#staff_dir_1').addClass('staffing-sub-menu_activeBg');
						 $('#staff_dir_1').add('#staff_it_1').add('#staff_health_1').add('#staff_eng_1').add('#staff_fin_1').add('#staff_lif_1').add('#staff_msp_1').add('#staff_rpo_1').add('#staff_cus_1').add('#staff_tech_1').add('#staff_learn_1').on('mouseover', function(){
					      var id = $(this).attr('id');
					     
					      $('#staff_dir_1_box').hide();
					      $('#staff_lif_1_box').hide();
					      $('#staff_health_1_box').hide();
					      $('#staff_eng_1_box').hide();
					      $('#staff_fin_1_box').hide();
					      $('#staff_it_1_box').hide();
					      $('#staff_msp_1_box').hide();
					      $('#staff_rpo_1_box').hide();
					      $('#staff_cus_1_box').hide();
					      $('#staff_tech_1_box').hide();
					      $('#staff_learn_1_box').hide();
					      
					      $('#staff_dir_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_lif_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_health_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_eng_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_fin_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_it_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_msp_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_rpo_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_cus_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_tech_1').removeClass('staffing-sub-menu_activeBg');
					      $('#staff_learn_1').removeClass('staffing-sub-menu_activeBg');
					      $('#'+id).show().addClass('staffing-sub-menu_activeBg');
						  $('#'+id+"_box").show() 
						 
					     
					    });
					    
					    $('#judge-managed').click(function(){
							
							  $('.sub-menu-staffing').addClass('menu-hide');
							  $('.sub-menu-managed').removeClass('menu-hide');
							  $('#staff_dir_1_box').show();
						      $('#staff_dir_1').addClass('staffing-sub-menu_activeBg');
							 
							  $('#staff_dir_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_lif_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_health_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_eng_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_fin_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_it_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_msp_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_rpo_1').removeClass('staffing-sub-menu_activeBg');
							  
							   $('#staff_dir_1_box').hide();
							  $('#staff_lif_1_box').hide();
							  $('#staff_health_1_box').hide();
							  $('#staff_eng_1_box').hide();
							  $('#staff_fin_1_box').hide();
							  $('#staff_it_1_box').hide();
							  $('#staff_msp_1_box').hide();
							  $('#staff_rpo_1_box').hide();
							  
							  $('#judge-staffing').removeClass('staffing-sub-menu_activeBg');
							  $('#judge-managed').addClass('staffing-sub-menu_activeBg');
							  $('#staff_cus_1_box').show()  
							  $('#staff_cus_1').addClass('staffing-sub-menu_activeBg');
						})
						
						$('#judge-staffing').click(function(){
							
							  $('#judge-managed').removeClass('staffing-sub-menu_activeBg');
							  $('#judge-staffing').addClass('staffing-sub-menu_activeBg');
							  $('.sub-menu-managed').addClass('menu-hide');
							  $('.sub-menu-staffing').removeClass('menu-hide');
							  
							  $('#staff_cus_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_tech_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_learn_1').removeClass('staffing-sub-menu_activeBg');
							  $('#staff_cus_1_box').hide();
							  $('#staff_tech_1_box').hide();
							  $('#staff_learn_1_box').hide();
						})
						
						
 						});
