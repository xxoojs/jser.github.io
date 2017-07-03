!(function($){
	function iBlog(json){
		this.create(json);
	}

	iBlog.prototype = {
		data: '',

		constructor: iBlog,

		colors: ['#457c69','#74c393','#8f8c6d','#e5bf80','#e9d78d','#e2975d','#f29671','#e26553','#c94a53','#be5168','#a44974','#98376a','#65377f','#4e2372','#e279a1','#df598b','#7b9faf','#529ac0','#9cbe8c'],

		tmpl:'',

		create: function(json){
			if(this.constructor.prototype.tmpl){
				this.render();
			}else{
				var that = this;
				window['catalogJsonp'] = function(catalog){
					var tpl = [
						'<div class="blog animation-small-in">',
							'<div class="header">',
								'<div class="title">历史文章</div>',
								'<a href="javascript:;" class="close"></a>',
							'</div>',
							'<div class="time-axis">',
								'<div class="line">'
					];
					catalog.forEach(function(item, index){
						var block = [
							'<div class="block" data-id="' + item.id + '">',
								'<div class="dot">',

								'</div>',
								'<div class="box">',
									'<span class="time">',
										item.date,
									'</span>',
									'<span class="name">',
										item.title,
									'</span>',
									'<div class="level"></div>',
									'<div class="corrow"></div>',
								'</div>',
							'</div>',
						].join('');

						tpl[tpl.length] = block;
					});

					tpl[tpl.length] = [
									'</div>',
							'</div>',
						'</div>'
					].join('');

					that.constructor.prototype.tmpl = tpl.join('');

					that.render();
				}
				$.getScript('resource/blog/source/data/catalog.js');
			}
		},

		render: function(){
			this.$el = $(this.constructor.prototype.tmpl);

			this.$el.appendTo($('body'));

			var that = this;
			this.$el.find('.box').each(function(index, el){
				var color = that.colors[Math.floor(Math.random()*19)];
				var corrows = $(el).css('border', '1px solid ' + color).find('.corrow');
				if(index % 2){
					corrows.css('border-top', '2px solid ' + color)
						.css('border-right', '2px solid ' + color);
				}else{
					corrows.css('border-left', '2px solid ' + color)
						.css('border-bottom', '2px solid ' + color);
				}
			});

			this.$el.click(function(e){
				var target = e.target;
				if(target.className.indexOf('back') != '-1'){
					this.$el.addClass('animation-small-out');
					setTimeout(function(){
						this.$el.remove();
					},200);
				}
			});

			this.$el.find('.block').click(function(e){
				var target = e.currentTarget;
				$.iArticle(target.getAttribute('data-id'));
			});

			this.evtBind();
		},

		evtBind: function(){
			var that = this;
			this.$el.find('.close').click(function(){
				that.close();
			});
		},

		open: function(){

		},

		close: function(){
			this.$el.remove();
		}
	};

	!(function(){
		var old = $.iBlog;
		$.iBlog = function(json){
			return new iBlog(json);
		};
		$.iBlog.constructor = iBlog;
		$.iBlog.defaults = {};
		$.iBlog.noConfict = function(){
			$.iBlog = old;
			return this;
		}
	})();
})(jQuery);