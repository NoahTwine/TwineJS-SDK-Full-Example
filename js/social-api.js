// remodal javascript
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],function(a){return t(e,a)}):"object"==typeof exports?t(e,require("jquery")):t(e,e.jQuery||e.Zepto)}(this,function(e,t){"use strict";function a(e){var t,a,n,o,s=e.css("transition-duration")||e.css("-webkit-transition-duration")||e.css("-moz-transition-duration")||e.css("-o-transition-duration")||e.css("-ms-transition-duration")||"0s",i=e.css("transition-delay")||e.css("-webkit-transition-delay")||e.css("-moz-transition-delay")||e.css("-o-transition-delay")||e.css("-ms-transition-delay")||"0s";for(s=s.split(", "),i=i.split(", "),o=0,a=s.length,t=Number.NEGATIVE_INFINITY;a>o;o++)n=parseFloat(s[o])+parseFloat(i[o]),n>t&&(t=n);return 1e3*n}function n(){if(t(document.body).height()<=t(window).height())return 0;var e,a,n=document.createElement("div"),o=document.createElement("div");return n.style.visibility="hidden",n.style.width="100px",document.body.appendChild(n),e=n.offsetWidth,n.style.overflow="scroll",o.style.width="100%",n.appendChild(o),a=o.offsetWidth,n.parentNode.removeChild(n),e-a}function o(){var e,a,o=t("html"),s=u+"-is-locked";o.hasClass(s)||(a=t(document.body),e=parseInt(a.css("padding-right"),10)+n(),a.css("padding-right",e+"px"),o.addClass(s))}function s(){var e,a,o=t("html"),s=u+"-is-locked";o.hasClass(s)&&(a=t(document.body),e=parseInt(a.css("padding-right"),10)-n(),a.css("padding-right",e+"px"),o.removeClass(s))}function i(e){var t,a,n,o,s={};for(e=e.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),t=e.split(","),o=0,a=t.length;a>o;o++)t[o]=t[o].split(":"),n=t[o][1],("string"==typeof n||n instanceof String)&&(n="true"===n||("false"===n?!1:n)),("string"==typeof n||n instanceof String)&&(n=isNaN(n)?n:+n),s[t[o][0]]=n;return s}function r(e,n){var o,s,i,r=this;r.settings=t.extend({},h,n),r.$body=t(document.body),r.$overlay=t("."+u+"-overlay"),r.$overlay.length||(r.$overlay=t("<div>").addClass(u+"-overlay"),r.$body.append(r.$overlay)),r.$bg=t("."+u+"-bg"),r.$closeButton=t('<a href="#"></a>').addClass(u+"-close"),r.$wrapper=t("<div>").addClass(u+"-wrapper"),r.$modal=e,r.$modal.addClass(u),r.$modal.css("visibility","visible"),r.$modal.append(r.$closeButton),r.$wrapper.append(r.$modal),r.$body.append(r.$wrapper),r.$confirmButton=r.$modal.find("."+u+"-confirm"),r.$cancelButton=r.$modal.find("."+u+"-cancel"),o=a(r.$overlay),s=a(r.$modal),i=a(r.$bg),r.td=Math.max(o,s,i),r.$wrapper.on("click."+u,"."+u+"-close",function(e){e.preventDefault(),r.close()}),r.$wrapper.on("click."+u,"."+u+"-cancel",function(e){e.preventDefault(),r.$modal.trigger("cancel"),r.settings.closeOnCancel&&r.close("cancellation")}),r.$wrapper.on("click."+u,"."+u+"-confirm",function(e){e.preventDefault(),r.$modal.trigger("confirm"),r.settings.closeOnConfirm&&r.close("confirmation")}),t(document).on("keyup."+u,function(e){27===e.keyCode&&r.settings.closeOnEscape&&r.close()}),r.$wrapper.on("click."+u,function(e){var a=t(e.target);a.hasClass(u+"-wrapper")&&r.settings.closeOnAnyClick&&r.close()}),r.index=t[p].lookup.push(r)-1,r.busy=!1}function l(e,a){var n,o,s=location.hash.replace("#","");if("undefined"==typeof a&&(a=!0),s){try{o=t("[data-"+p+"-id="+s.replace(new RegExp("/","g"),"\\/")+"]")}catch(i){}o&&o.length&&(n=t[p].lookup[o.data(p)],n&&n.settings.hashTracking&&n.open())}else a&&d&&!d.busy&&d.settings.hashTracking&&d.close()}var d,c,p="remodal",u=e.remodalGlobals&&e.remodalGlobals.namespace||p,h=t.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnAnyClick:!0},e.remodalGlobals&&e.remodalGlobals.defaults);r.prototype.open=function(){if(!this.busy){var e,a=this;a.busy=!0,a.$modal.trigger("open"),e=a.$modal.attr("data-"+p+"-id"),e&&a.settings.hashTracking&&(c=t(window).scrollTop(),location.hash=e),d&&d!==a&&(d.$overlay.hide(),d.$wrapper.hide(),d.$body.removeClass(u+"-is-active")),d=a,o(),a.$overlay.show(),a.$wrapper.show(),setTimeout(function(){a.$body.addClass(u+"-is-active"),a.$wrapper.scrollTop(0),setTimeout(function(){a.busy=!1,a.$modal.trigger("opened")},a.td+50)},25)}},r.prototype.close=function(e){if(!this.busy){var a=this;a.busy=!0,a.$modal.trigger({type:"close",reason:e}),a.settings.hashTracking&&a.$modal.attr("data-"+p+"-id")===location.hash.substr(1)&&(location.hash="",t(window).scrollTop(c)),a.$body.removeClass(u+"-is-active"),setTimeout(function(){a.$overlay.hide(),a.$wrapper.hide(),s(),a.busy=!1,a.$modal.trigger({type:"closed",reason:e})},a.td+50)}},t[p]={lookup:[]},t.fn[p]=function(e){var a,n;return this.each(function(o,s){n=t(s),null==n.data(p)?(a=new r(n,e),n.data(p,a.index),a.settings.hashTracking&&n.attr("data-"+p+"-id")===location.hash.substr(1)&&a.open()):a=t[p].lookup[n.data(p)]}),a},t(document).ready(function(){t(document).on("click","[data-"+p+"-target]",function(e){e.preventDefault();var a=e.currentTarget,n=a.getAttribute("data-"+p+"-target"),o=t("[data-"+p+"-id="+n+"]");t[p].lookup[o.data(p)].open()}),t(document).find("."+u).each(function(e,a){var n=t(a),o=n.data(p+"-options");o?("string"==typeof o||o instanceof String)&&(o=i(o)):o={},n[p](o)})}),t(window).bind("hashchange."+u,l)});
(function(){ // wrap in self executing function
var s, posts = [],
socialWidget = {
	settings: {
		pagesize: 10,
		tilesLoadedSoFar: 0,		
		tileSelector: 'post_section',
		preloadID: 'twine-wall-preload',
		containerID: 'twine-wall',
		itemSelector: 'twine-item',
		campaign: 'louboutin'	
	},	
	init: function() {
		// kick things off
		s = this.settings;
		self = this;		
		jQuery( document ).ready(function() {
			self.bindUIActions(); // get modal stuff ready
			self.isotope.init(); // get isotope ready
			self.twine.init(); // run TwineSDK
		});
	},	
	isotope: {
		init: function() {		
			jQuery('#' + s.containerID).isotope({
				itemSelector : '.' + s.itemSelector + '',
				resizable: true, // enable normal resizing		
				layoutMode: 'masonry',
				masonry: {
					columnWidth: '.grid-sizer',
					gutter: '.gutter-sizer'
				}
			});
		},
		append: function() { // takes everything from preload and sticks it into the actual page
			newElements = jQuery('#' + s.preloadID).children();
			jQuery('#' + s.containerID).isotope( 'insert',  newElements, this.lazyLoadInit()); 			
		},		
		lazyLoadInit: function() {
			jQuery(function() {		
				jQuery(".lazy").lazy({
					bind: "event",
					enableThrottle: true,
					throttle: 500,
					combined: true,
					delay: 100, // don't set much higher				
					onFinishedAll: function() {
						jQuery(".lazy").removeClass('.lazy'); // no need to check these again
					},
					onError: function(element) {						
						item = element.closest('.twine-item');		
						item.addClass('hide');
						id = item.attr('data-id');
						jQuery('#twine-modals').find(".item[data-id='" + id + "']").remove();		
						jQuery('#' + s.containerID).isotope( 'layout'); 										
					},
					afterLoad: function(element) {
						jQuery('#' + s.containerID).isotope( 'layout'); 
					}
				});				
			});
		}
	},	
	
	modal: {
		init: function() {	
			if (typeof wByWorth !== 'undefined') {return false;}
			jQuery('#twine-modals').append(this.htmlString);
			
			setTimeout(function() { // sadly, in the absence of a jQuery callback for append() this is the only way to ensure asynchronous loading
				jQuery( "[data-modal]" ).bind( "click", function() {				
					id = jQuery(this).attr('data-id');
					self.modal.show(id);
				});
			
				jQuery('.carousel').carousel();		
				self.modal.bindResize();
			}, 400);
			
			this.htmlString = ""; // clear out string to avoid duplicating on load more
		},
		
		resize: function() {
			windowWidth = jQuery( window ).width();	
			if (windowWidth > 641) {
				jQuery('#twine-modals').children('.item').each(function(i) {
					modalHeight = jQuery(this).innerHeight();
					jQuery(this).children('.modal_right_section').height(modalHeight);									
				});
			} else {					
				jQuery('#twine-modals').children('.item').each(function(i) {
					jQuery(this).children('.modal_right_section').height(450);									
				});
			}
		},		
		bindResize: function() {			
			jQuery( window ).resize(function() {
				self.modal.resize();				
			});			
			self.modal.resize();
		},		
		show: function(itemID) {			
			jQuery('#twine-modals').children('.active').removeClass('active');			
			jQuery('#twine-modals').children('.item[data-id="' + itemID + '"]').addClass('active'); // activate the one we want to see			
			jQuery('#remodal').remodal().open();
			this.resize();
		},		
		htmlString: '',				
		build: function(m) {			
			modal = "" +
				'<div class="item ' + (typeof m.images[0] == "undefined" ? 'text-only' : "") + '" data-id="' + m.id + '">';
					if (typeof m.images[0] !== "undefined") {
						modal = modal + '<div class="modal_left_section">' +
							'<img src="' + m.images[0].url  + '" alt="image" />' +
						'</div>';
						'<!--modal_left_section-->';						
					}					
					modal = modal + 
						'<div class="modal_right_section">' +
							'<div class="twitter_content">' +
							'<div class="twitter_content_wrap">' +
								'<div class="twitter_top">' +
									'<div class="twitter_thumb">' +
										'<img src="' + m.profile_url + '" alt="image" />' +
									'</div>' +
									'<div class="twitter_author">' +
										'<h3>' + (typeof m.from_full_name !== "undefined" ? m.from_full_name : m.from_user_name) + '</h3>' +
										(typeof m.from_full_name !== "undefined" && m.network.name !== "Facebook" ? '<p>' + m.from_user_name + '</p>' : "") +
										'<p class="twitter_thumb"><i class="fa fa-' + m.network.name.toLowerCase() + '"></i>&nbsp;<abbr class="timeago" title="' + new Date(m.created_at*1000).toISOString() + '"></abbr></p>' +
									'</div>' +
								'</div>' +
								'<div class="twitter_bottom">' +
									'<p>' + self.twine.prettify(m.description,90) + '</p>' +
								'</div>' +
							'</div>' +
							'<!--twitter_content_wrap-->	' +
						'</div>' +
						'<!--twitter_content-->' +
						'<div class="social_media">' +
							'<ul>' +
								'<li><span><a target="blank" href="' + m.target_url + '"><strong>View Source<span class="view-arrow">&rarr;</span></strong></a></span></li>' +
									self.twine.buildSharing(m) +
							'</ul>' +
						'</div>' +
						'<!--social_media-->' +
					'</div>' +
					'<!--modal_right_section-->' +
				'</div>';
			this.htmlString = this.htmlString + modal;
		}
	},	
	sharing: {
		init: function() {			
			jQuery( "[data-share]" ).off().on('click', function() {
				action = jQuery(this).attr('data-share');
				id = jQuery(this).attr('data-id');			
				self.sharing.share(action,id);
			});
		},		
		share: function(network,id) {
			m = posts[id];
			permaLink = m.target_url;
			description = m.description;			
			if (m.media_key!==undefined) {
				networkId = m.media_key.replace(/\brel/,"");
			}			
			switch(network) {
				case "facebook":
					return !window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(permaLink),"_blank","menubar=no,height=350,width=600");
				break;				
				case "pinterest":
					return !window.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(permaLink) + "&media=" + encodeURIComponent(m.images[0].url) + "&description=" + m.description,"_blank","menubar=no,height=350,width=600");
					break;
				break;				
				case "linkedin":
	 				return !window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(permaLink) + '&title=' + encodeURIComponent(m.title) + '&summary=' + encodeURIComponent(m.description) + '&source=' + encodeURIComponent("Worth New York"),"_blank","menubar=no,height=350,width=600");
				break;				
				case "email":
					window.location = 'mailto:?subject=Check out this post from Worth New York&body=Just came across this great post from Worth New York. Check it out here:%0A%0A' + permaLink + '%2F%0A%0AThanks!';
				break;				
				case "tweet": 
					return !window.open("http://twitter.com/intent/tweet?text=" + encodeURIComponent(permaLink),"_blank","menubar=no,height=350,width=600");
				break;				
				case "tw-reply": 
					return !window.open("http://twitter.com/intent/tweet?in_reply_to=" + networkId  + "","_blank","menubar=no,height=350,width=600");								
				break;				
				case "tw-retweet":		
					return !window.open("http://twitter.com/intent/retweet?tweet_id=" + networkId  + "","_blank","menubar=no,height=350,width=600");								
				break;
				case "tw-favorite": 
					return !window.open("http://twitter.com/intent/favorite?tweet_id=" + networkId + "","_blank","menubar=no,height=350,width=600");								
				break;				
				default:					
			}			
		}
	},	
	setup: {				
		initLoadMore: function() {
			jQuery( "#load-more" ).bind( "click", function() {
				self.twine.loadMore();
			});
		}
	},	
	bindUIActions: function() {
		setup = this.setup;
		setup.initLoadMore();		
	},	
	onTilesLoaded: function() { // event called once when group of tiles is published		
		self.isotope.append(); // publish these posts now!								
		self.modal.init();
		self.sharing.init();
	},	
	twine: { // any code that gets or pushes around code social data goes here					
		init: function() {
			this.loadMore();
			if (typeof wByWorth !== 'undefined') {
				this.collections.getCollections();
			}
		},		
		bindShowMore: function() {				
			jQuery( "[data-more='show']" ).click(function() {
				clicked = jQuery(this);				
				var itemId = clicked.attr('data-id');
				tile = jQuery('.twine-item[data-id=' + itemId + ']');				
				textElem = tile.find('.body-text');				
				if (clicked.hasClass('clicked') == false) {				
					clicked.html("Show Less&nbsp;<i class='fa fa-minus'></i>");
					fullText = clicked.attr('data-text');
					textElem.html(fullText);
					clicked.addClass('clicked');					
					jQuery('#' + s.containerID).isotope( 'layout');
				} else {
					clicked.html("Show More&nbsp;<i class='fa fa-plus'></i>");
					fullText = clicked.attr('data-text');
					shortText = fullText.slice(0,100) + '...';
					textElem.html(shortText);	
					clicked.removeClass('clicked');
					jQuery('#' + s.containerID).isotope( 'layout');
				}
			});				
		},		
		loadMore: function() { // calls Twine API and adds new tiles in; used for initial load and for "load more"
			this.getContent();
		},	
		buildSharing: function(m) {
			if (m.source=='Twitter') {	
				shareHTML = '' +
					'<li class="blank"></li>' +
					'<li class="twitter"><div data-share="tw-reply" data-id="' + m.id + '" class="fa">&#xf112;</div></li>' +
					'<li class="twitter"><div data-share="tw-retweet" data-id="' + m.id + '" class="fa">&#xf079;</div></li>' +
					'<li class="twitter"><div data-share="tw-favorite" data-id="' + m.id + '" class="fa">&#xf005;</div></li>' +		
					'<li class="letter"><div data-share="email" data-id="' + m.id + '" class="fa fa">&#xf0e0;</div></li>';
			} else {
				shareHTML = '' +
					'<li class="facebook"><div data-share="facebook" data-id="' + m.id + '" class="fa">&#xf09a;</div></li>' +
					'<li class="pinterest"><div data-share="pinterest" data-id="' + m.id + '" class="fa">&#xf231;</div></li>' +
					'<li class="linkedin"><div data-share="linkedin" data-id="' + m.id + '" class="fa">&#xf0e1;</div></li>' +
					'<li class="twitter">' +
 						'<div data-share="tweet" data-id="' + m.id + '" class="fa">&#xf099;</div>' +
						'<!--sub_menu-->' +
					'</li>' +
					'<li class="letter"><div data-share="email" data-id="' + m.id + '" class="fa fa">&#xf0e0;</div></li>';
			}		
			return shareHTML;	
		},		
		buildTile: function(m) {		
			if (typeof wByWorth !== "undefined" && wByWorth == true) {
				post = "" + 
					'<div data-id="' + m.id +'" class="twine-item post_section profile transition element other nonmetal isotope-item ' + (typeof m.images[0] == "undefined" ? 'text-only' : '') + '">' +
						'<div class="byline">' +
							'<h4 class="slug"><i class="fa fa-' + m.network.name.toLowerCase() + '"></i><div>' + (typeof m.collections !== 'undefined' ? m.collections[0].title.toLowerCase() : 'Posted on ' + m.network.name) + '</div></h4>';
							if (typeof m.title !== 'undefined') {
								post = post + '<h2>' + m.title + '</h2>';
							}				
						post = post + '</div>';						
						if (typeof m.images[0] !== "undefined") {
							post = post + 
                                '<div class="thumb" data-modal="show" data-id="' + m.id + '">' +							
									'<img class="lazy" data-src="' + m.images[0].url + '" alt="image" />' +
								'</div>' +				
								'<!--thumb-->';
						}					
						post = post + 
							'<div class="post_content">' +
								'<div class="post_descrip">' +
									'<div class="body-text">' + self.twine.prettify(m.description,120) + '</div><br/>' +
									(m.description.length >= 120 ? '<span class="data_pop" data-text="' + self.twine.prettify(m.description) + '" data-more="show" data-id="' + m.id + '">Show More <i class="fa fa-plus"></i></span>' : '') +
								'</div>';
						   		'<!--post_des-->';					   
								if (typeof m.images[0] == "undefined") {					   
									post = post + 
										'<div class="byline">' +
											'<img src="' + m.profile_url + '"/>' +
											'<div class="text-side">' +
												'<h3>' + (typeof m.from_full_name !== "undefined" ? m.from_full_name : m.from_user_name) + '</h3>' +
												'<p>' + (typeof m.from_user_name !== "undefined" ? m.from_user_name : m.from_full_name) + '</p>' +
											'</div>' +
										'</div>';
								}					
						post = post + 
							'</div>' +
							'<!--post_content-->' +
							'<div class="social_media">' +
							   '<ul>' +						
								   '<li class="first"><div class="fa social-text"><a target="blank" href="' + m.target_url + '">SOURCE<span class="arrow">&nbsp;</span></a></div></li>' +
								   this.buildSharing(m) +
							   '</ul>' +
							'</div>' +
						'<!--social_media-->' +
					'</div>';							
			} else {						
				post = "" +
					'<div data-id="' + m.id +'" class="twine-item post_section profile transition element other nonmetal isotope-item">';
					if (typeof m.images[0] !== "undefined") {
						post = post + 
						'<div class="thumb" data-modal="show" data-id="' + m.id + '">' +
							'<img class="lazy" data-src="' + m.images[0].url + '" alt="image" />' +
						'</div>' +				
						'<!--thumb-->';
					}
					post = post + '<div class="post_content">' +
							'<h4><i class="fa fa-1x fa-' + m.network.name.toLowerCase() + '"></i>&nbsp;' +'<a target="_blank" href="' + m.target_url + '">Via ' + m.network.name + '</a></h4>';
							if (typeof m.category !== 'undefined') {
								post = post + '<h2>' + m.category.text + '</h2>';
							}					
							post = post + '<div class="post_descrip">' +
								'<p>' + self.twine.prettify(m.description) + '&nbsp;<span class="data_pop" data-modal="show" data-id="' + m.id + '" data-target="#myModal"> &rarr;</span></p>' +
							'</div>' +
							'<!--post_des-->' +
						'</div>' +
						'<!--post_content-->' +
						'<div class="social_media">' +
							'<ul>' +						
								'<li class="first"><a target="blank" href="' + m.target_url + '"><div>share</div></a></li>' +
								this.buildSharing(m) +
							'</ul>' +
						'</div>' +
						'<!--social_media-->' +
					'</div>';	
			}				
			return post;			
		},
		prettify: function(text,length) {
			if (!text) {return "";}
			if (typeof length !== "undefined") {
				if (text.length > length) {
					text = text.substring(0,length)+'...';
				} else {
					text = text;
				}
			}
			// look for our special formatting where a URL is followed by a brace-wrapped display-URL
			// this is to conform to Twitter's Display TOS
			var exp = /(\b(((https?):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%ÃƒÂ¢Ã¢â€šÂ¬Ã…â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â¹=~_|])\{(.*?)\}/ig;
			text = text.replace(exp,"<a target='_blank' class='link' href='$1'>$6</a>"); 
			// look for hyperlinks in the string, but not ones immediately preceded by a quote
			var exp = /[\s]((((https?):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%ÃƒÂ¢Ã¢â€šÂ¬Ã…â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â¹=~_|])/ig;
			text = text.replace(exp," <a target='_blank' class='link' href='$1'>$1</a>"); 
			return text;
		},
		// return collections from the TwineSocial API
		// see documentation here		
		collections: {					
				buildCollection: function(c) {
					if (c.visible !== true) {
							return false;
					}

					collectionHTML = '<li class="' + c.class + '" data-collection-id="' + c.id +'">' + c.name + '</li>';
					mobileCollectionHTML = '<option class="' + c.class + '" data-collection-id="' + c.id +'">' + c.name + '</option>';
					jQuery(collectionHTML).appendTo("#social-nav .desktop-nav");
					jQuery(mobileCollectionHTML).appendTo("#social-mobile-nav .mobile-nav");
				},
				getCollections: function() {			
						collectionModule = this;
						TwineJsSDK.listCollections({
								request: {
										campaign: s.campaign
								},
								options: {
										events: {
												onContent: function(data) {			
														if (data.success !== true) { return false; }		
														collectionModule.buildCollection({id:"",name: "All",class:'active',visible:true});
														jQuery.each(data.collections,function(i, c) {
																if (c.visible) { // don't publish hidden collections
																		collectionModule.buildCollection(c);
																}
														});
														collectionModule.bindClicks();
												}
										}
								}
						});					
				},
				bindClicks: function() {
					jQuery( "#social-nav li" ).click(function() {
						collectionId = jQuery(this).attr('data-collection-id');
						collectionModule.resetActiveNav(collectionId);
						collectionModule.loadByCollection(collectionId);
					});	

					jQuery( "#social-mobile-nav .mobile-nav" ).change(function() {						
						collectionId = jQuery( "#social-mobile-nav .mobile-nav option:selected" ).attr('data-collection-id');
						collectionModule.resetActiveNav(collectionId);
						collectionModule.loadByCollection(collectionId);
					});							
				},						
				resetActiveNav: function(activeCollectionId) {
					jQuery('#social-nav li.active, #social-nav option.active').removeClass('active');
					jQuery('#social-nav li[data-collection-id="' + activeCollectionId + '"], #social-nav option[data-collection-id="' + activeCollectionId + '"]').addClass('active');				
				},
				loadByCollection: function(collectionId) {
					s.activeCollection = parseInt(collectionId);
					s.tilesLoadedSoFar = 0;
					jQuery('#twine-wall').isotope( 'remove', jQuery('.twine-item') );
					jQuery('.twine-item').remove();
					jQuery('#twine-wall').isotope( 'remove', '.twine-item' );
					jQuery('#' + s.containerID).height(0);
					self.twine.loadMore();
				}
		},
		getContent: function(options) {
			if (!jQuery('#load-more').hasClass('hide')) {
				jQuery('#load-more').addClass('hide');
			}
			TwineJsSDK.renderContent({
				request: {
					campaign: s.campaign,
					limit: s.pagesize,
					offset: s.tilesLoadedSoFar,
					collection: (typeof s.activeCollection !== "undefined" ? s.activeCollection : ""),
					photosOnly: false // set to true to load only posts with photos
				},
				options: {
					target:  s.preloadID,
					events: {
						onRenderContent: function(m) {			
							posts[m.id] = m;
							self.twine.offset = self.twine.offset + 1;	
							self.modal.build(m);
							return self.twine.buildTile(m);
						},
						onComplete: function() {
							if (typeof wByWorth !== 'undefined') {
								self.twine.bindShowMore();
							}
							s.tilesLoadedSoFar = s.tilesLoadedSoFar + s.pagesize; // update the offset for next time					
							
							if (jQuery('#load-more').hasClass('hide') && jQuery('.twine-item').length > 0) {
								jQuery('#load-more').removeClass('hide');
								jQuery('.load_more').fadeIn(500); 								
							}		
							
							if (jQuery('#twine-wall-preload .twine-item').length > 0) {
								self.onTilesLoaded();
							} else {
								jQuery('.load_more').fadeOut(500); // we have no more posts; get rid of load more
							}					

							if (jQuery('.load_more').hasClass('hide') && jQuery('.twine-item').length > 0) { // add in load more button
								jQuery('.load_more').removeClass('hide');
							}
							jQuery("abbr").timeago();
						}
					}
				}
			});			
		}
	} // kick off with first API call
};
socialWidget.init(); // we call the widget
})();