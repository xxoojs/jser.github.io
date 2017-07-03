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
			this.$el.appendTo($('body'));

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