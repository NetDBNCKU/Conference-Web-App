$(document).on('pagecreate','#a_OptionA',function(){
     $('#TIA').off('click').on('click',function(){
	     $('#xTIA').ScrollTo({
	       duration: 1000,
	       easing: 'linear'
	     });
     });
     $('#TTaoyuan').off('click').on('click',function(){
	     $('#xTTaoyuan').ScrollTo({
	       duration: 1000,
	       easing: 'linear'
	     });
     });
     $('#TTainan').off('click').on('click',function(){
	     $('#xTTainan').ScrollTo({
	       duration: 1000,
	       easing: 'linear'
	     });
     });
     $('#TRS').off('click').on('click',function(){
	     $('#xTRS').ScrollTo({
	       duration: 1000,
	       easing: 'linear'
	     });
     });
});
