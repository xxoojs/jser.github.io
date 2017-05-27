var Music = {
	imgLoaded: false,

	init:function(){
		this.render();
		this.evtBind();
	},

	render: function(){
		var xtpl = '<li class="song" data-id="{id}"><img data-src="{cover}?param=280y280" alt="{title}"><span>{title}</span><b>{count}</b><i class="fa fa-play-circle-o icon"></i></li>';
	    var str = '<div class="song-list" ondragstart="return false;"><div class="title">DemoXu\'s song list<span class="tag">© from barretlee</span></div><ul>';
	    for (var key in nmlist) {
	      str += xtpl.replace(/\{([^\}]+?)\}/g, function(m0, m1) {
	        return nmlist[key][m1];
	      });
	    }
	    str += '<div class="clear"></div></ul></div>';

		$('html').append(str);
	},

	evtBind: function(){
		var self = this;

		$('#nmlist img').each(function() {
          $(this).attr('src', $(this).attr('data-src')).hide().fadeIn();
        });

        $(document).click(function(e){
			var $el = $(e.target);

			if($el.hasClass('music-down')){
				var funcDown = $el.hasClass('fa-angle-down')?'addClass':'removeClass',
					funcUp = $el.hasClass('fa-angle-down')?'removeClass':'addClass';
				$('.song-list')[funcDown]('down-in')[funcUp]('up-out');

				$el.toggleClass('fa-angle-down').toggleClass('fa-angle-up');

				if(!Music.imgLoaded) {
					Music.imgLoaded = true;
			        $('.song-list img').each(function() {
			          $(this).attr('src', $(this).attr('data-src')).hide().fadeIn();
			        });
				}
			}
		});

		$('li.song').click(function(e){
			var tpl = [
				'<div id="aplayer" class="aplayer">',
					// '<div class="pic" style="background-image: url(http://p4.music.126.net/mvOIUyknh0SjF7D56QKEwg==/5693271208664177.jpg?param=280y280);">',
					// 	'<i class="fa fa-pause-circle-o stop"></i>',
					// 	'<i class="fa fa-play-circle-o restart"></i>',
					// '</div>',
					// '<div class="info">',
					// 	'<div class="music">',
					// 		'<div class="title">',
					// 			'依然想你',
					// 		'</div>',
					// 		'<div class="author">',
					// 			' - Error happens ╥﹏╥',
					// 		'</div>',
					// 	'</div>',
					// '</div>',
				'</div>'
			];

			$(tpl.join('')).appendTo($('html')).iDrag();

			// $.ajax({
			// 	url: 'songs/'+e.target.getAttribute('data-id')+'.js',
			// 	success: function(data){

			// 	}
			// })

			var option = {
		      element: document.getElementById('aplayer'),
		      narrow: false,
		      autoplay: true,
		      showlrc: 0,
		      mutex: true,
		      theme: '#e6d0b2',
		      loop: true,
		      preload: 'metadata',
		      music: [{
			      "title": "模特",
			      "duration": 306,
			      "url": "http://p2.music.126.net/FEa9ncIP1jzoAUZdV7Edqw==/7710875046712799.mp3",
			      "author": "李荣浩"
			    }]
		    }
		    self.pause();
		    window._ap = new APlayer(option);
		    window._ap.init();
		    self.restart();
		    $(".aplayer-list").addClass('aplayer-list-hide');
		});
	},

	pause: function() {
		window._ap && window._ap.pause();
	},

	restart: function() {
		window._ap && window._ap.play();
	},
};
Music.init();