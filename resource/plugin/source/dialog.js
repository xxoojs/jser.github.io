!(function($){
	function iDialog(){
		this.create();
	}

	iDialog.prototype = {
		create: function(){
			$.ajax({
				url: 'resource/tmpl/dialog.html',
				success: function(data){
					
				}
			});
		},

		open: function(){

		},

		close: function(){

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