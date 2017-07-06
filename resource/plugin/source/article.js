!(function($){
	function iArticle(id){
		this.create(id);
	}

	iArticle.prototype = {
		data: '',

		constructor: iArticle,

		tmpl:'',

		create: function(id){
			if(this.constructor.prototype.tmpl){
				this.render();
			}else{
				var that = this;
				$.ajax({
					url: 'resource/tmpl/article/' + id + '.html',
					success: function(data){
						that.tmpl = [
							'<div class="article">',
								'<div class="article-close">',
									'<span class="fa fa-close"></span>',
								'</div>',
								data,
							'</div>',
						].join('');
						
						that.$el = $(that.tmpl);

						that.render();
					}
				});
			}
		},

		render: function(){
			var $catalog = this.$el.find('.catalog').css('height', 0);

			this.$el.appendTo($('body')).css('overflow', 'hidden');

			var that = this;
			setTimeout(function(){
				that.$el.css('overflow', 'auto');
				$catalog.css('height', 'auto').iDrag();
			}, 2000);

			this.evtBind();
		},

		evtBind: function(){
			var that = this;
			this.$el.find('.article-close').click(function(){
				that.close();
			});
		},

		open: function(){

		},

		close: function(){
			this.$el.addClass('article-out');
			var that = this;
			setTimeout(function(){
				that.$el.remove();
			},1000);
		}
	};

	!(function(){
		var old = $.iArticle;
		$.iArticle = function(id){
			return new iArticle(id);
		};
		$.iArticle.constructor = iArticle;
		$.iArticle.defaults = {};
		$.iArticle.noConfict = function(){
			$.iArticle = old;
			return this;
		}
	})();
})(jQuery);