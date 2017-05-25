!(function(){
	function iGuide(){
		this.render();
	}

	iGuide.prototype = {
		constructor: iGuide,

		defaults: {
			step: 0
		},

		render: function(){
			var that = this;
			$.ajax({
				url: 'resource/tmpl/guide.html',
				success: function(data){
					// var tmpl = data.replace('${url}', json.url)
					// 					.replace('${title}', json.title)
					// 						.replace('${icon}', json.icon)
					// 							.replaceAll('${data}', json.data)
					// 								.replace('${tip}', json.tip);
					that.$el = $(data);

					that.evtBind();

					that.$el.appendTo($('body'));
				}
			});
		},

		evtBind: function(){
			var that = this;
			this.$el.click(function(e){
				var target = e.target;

				if(target.nodeName == 'LI'){
					var siblings = target.parentNode.childNodes;
					for(var i=0; i<siblings.length; i++){
						var child = siblings[i];
						if(child.nodeName == 'LI'){
							child.className = '';
						}
					}

					target.className = 'active';

					var guideEl = $('.guide');
					guideEl.addClass('guide-animation');
					setTimeout(function(){
						guideEl.removeClass('guide-animation');
					},350);
				}

				if(target.className.indexOf('close') != '-1'){
					that.$el.remove();
				}
			});
		},

		unEvtBind: function(){

		}
	};

	!(function(){
		var old = $.iGuide;
		$.iGuide = function(){
			return new iGuide();
		};
		$.iGuide.defaults = {};
		$.iGuide.noConfict = function(){
			$.iGuide = old;
			return this;
		}
	})();
})();