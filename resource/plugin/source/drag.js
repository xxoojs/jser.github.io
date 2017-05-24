!(function(){
	function iDrag($el){
		this.render($el);
	}

	iDrag.prototype = {
		constructor: iDrag,

		render: function($el){
			$el.mousedown(function(downEvt){
				var downX = downEvt.pageX,
					downY = downEvt.pageY;

				var distanceX = downX - parseInt($el.css('left')),
					distanceY = downY - parseInt($el.css('top'));

				$(document).mousemove(function(moveEvt){
					var moveX = moveEvt.pageX,
						moveY = moveEvt.pageY;

					$el.css('left', moveX - distanceX + 'px');
					$el.css('top', moveY - distanceY + 'px');

					$(document).mouseup(function(){
						$(document).off('mousemove').off('mouseup');
					});
				});
			});
		}
	};

	!(function(){
		var old = $.fn.iDrag;
		$.fn.iDrag = function(){
			this.each(function(){
				new iDrag($(this));
			});
		}
		$.fn.iDrag.defaults = {};
		$.fn.iDrag.noConfict = function(){
			$.fn.iDrag = old;
			return this;
		}
	})();
})();