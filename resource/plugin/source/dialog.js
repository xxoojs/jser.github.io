!(function($){
	function iDialog(){
		this.create();
	}

	iDialog.prototype = {
		$el: '',

		create: function(){
			if(this.$el){

			}else{
				var that = this;
				$.ajax({
					url: 'resource/tmpl/dialog.html',
					success: function(data){
						that.$el = $(data);

						that.evtBind();

						that.$el.appendTo($('body'));
					}
				});
			}
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
			this.$el.hide();
		}
	};

	!(function(){
		var old = $.iDialog;
		$.iDialog = function(){
			return new iDialog();
		};
		$.iDialog.constructor = iDialog;
		$.iDialog.defaults = {};
		$.iDialog.noConfict = function(){
			$.iDialog = old;
			return this;
		}
	})();
})(jQuery);