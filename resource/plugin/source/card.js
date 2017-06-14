!(function($){
	function iCard(){
		this.create();
	}

	iCard.prototype = {
		$el: '',

		tmpl: '',

		constructor: iCard,

		isOutBounds:true,

		create: function(){
			if(this.constructor.prototype.tmpl){
				this.render();
			}else{
				var that = this;
				$.ajax({
					url: 'resource/tmpl/card.html',
					success: function(data){
						window['cardJsonp'] = function(json){
							for(var prop in json){
								data = data.replace('${'+ prop +'}', json[prop]);
							}
							that.constructor.prototype.tmpl = data;

							that.render();
						}
						$.getScript('resource/mock/source/card.js');
					}
				});
			}
		},

		render: function(){
			this.$el = $(this.constructor.prototype.tmpl);
			this.evtBind();
			this.$el.appendTo($('body'));
		},

		evtBind: function(){
			this.idx = 0;
			this.round = 0;
			this.cls = ['.contact', '.introduce', '.support'];
			this.degs = [0, -20, -40];

			this.fnAnimationEvt = this.animationEvt(),
			this.fnClickEvt = this.clickEvt(),
			this.fnMouseoverEvt = this.mouseoverEvt(),
			this.fnMouseoutEvt = this.mouseoutEvt(),
			this.domEvt = this.domEvt();

			var that = this;
			this.$el.click(this.fnAnimationEvt);
		},

		animationEvt: function(){
			var that = this;
			return function(e){
				that.$el.addClass('card-leftIn')
					.find('.introduce').addClass('introduce-leftIn')
						.next('.support').addClass('support-leftIn');
				setTimeout(function(){
					that.$el.css('right', 'calc(50% - 126px)').css('transform', 'rotateZ(0deg)')
						.find('.introduce').css('transform', 'rotateZ(-20deg)')
							.next('.support').css('transform', 'rotateZ(-40deg)');

					that.$el.off('click', that.fnAnimationEvt).click(that.fnClickEvt).mouseover(that.fnMouseoverEvt).mouseout(that.fnMouseoutEvt);
				
					$(document).click(that.domEvt);
				}, 1000);

				e.stopPropagation();
			}
		},

		domEvt: function(){
			var that = this;
			return function(){
				that.$el.removeClass('card-leftIn')
					.find('.introduce').removeClass('introduce-leftIn')
						.next('.support').removeClass('support-leftIn');

				that.$el.css('right', '-50px').css('transform', 'rotateZ(-50deg)')
					.find('.contact').css('transform', 'rotateZ(0deg)')	
						.next('.introduce').css('transform', 'rotateZ(-5deg)')
							.next('.support').css('transform', 'rotateZ(-10deg)');

				that.$el.off('click', that.fnClickEvt)
					.off('mouseover',that.fnMouseoverEvt)
						.off('mouseout',that.fnMouseoutEvt)
							.click(that.fnAnimationEvt);

				$(document).off('click', that.domEvt);

				that.idx = 0;
				that.round = 0;
				that.degs = [0, -20, -40];
			}
		},

		clickEvt: function(){
			var that = this;
			return function(e){
				var target = $(e.currentTarget),
					deg = 140 + that.degs[that.idx % 3];
				
				that.degs[that.idx % 3] = deg;

				target.find(that.cls[that.idx % 3]).css('transform', 'rotateZ('+ deg +'deg)');

				++that.idx;
				if(that.idx % 3 == 0){
					++that.round;
					that.idx = 0;
					that.cls.forEach(function(item, index){
						deg = 220 + that.degs[index];

						that.degs[index] = deg;

						target.find(item).css('transform', 'rotateZ('+ deg +'deg)');
					});
				}
				e.stopPropagation();
			}
		},

		mouseoverEvt: function(){
			var that = this;
			return function(e){
				var target = $(e.currentTarget);
				that.cls.forEach(function(item, index){
					if(index){
						target.find(item).css('transform', 'rotateZ('+ (that.degs[index] + 10 * index) +'deg)');
					}
				});
				e.stopPropagation();
			}
		},

		mouseoutEvt: function(){
			var that = this;
			return function(e){
				var target = $(e.currentTarget);
				that.cls.forEach(function(item, index){
					if(index){
						target.find(item).css('transform', 'rotateZ('+ that.degs[index] +'deg)');
					}
				});
				e.stopPropagation();
			}
		},

		open: function(){

		},

		close: function(){
			this.$el.remove();
		}
	};

	!(function(){
		var old = $.iCard;
		$.iCard = function(){
			return new iCard();
		};
		$.iCard.constructor = iCard;
		$.iCard.defaults = {};
		$.iCard.noConfict = function(){
			$.iCard = old;
			return this;
		}
	})();
})(jQuery);