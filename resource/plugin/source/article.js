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
								'<div class="catalog"></div>',
							'</div>',
						].join('');
						
						that.$el = $(that.tmpl);

						var h1s = that.$el.find('#innerdocbody .heading-3 span'),
							catalogTpml = ['<div>目录</div>'];
						for(let h1 of h1s){
							catalogTpml.push('<h1>' + h1.innerHTML + '</h1>');
						}

						let h2s = that.$el.find('#innerdocbody .heading-2 span');
						for(let h2 of h2s){
							catalogTpml.push('<h2>' + h2.innerHTML + '</h2>');
						}

						let h3s = that.$el.find('#innerdocbody .heading-1 span');
						for(let h3 of h3s){
							catalogTpml.push('<h3>' + h3.innerHTML + '</h3>');
						}

						that.$el.find('.catalog').html(catalogTpml.join(''));

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