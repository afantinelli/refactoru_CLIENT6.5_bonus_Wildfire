$(function() {

//Selecting power
$('#lake').on('click', function () {
	$(this).addClass('selected-power');
	$('#campfire').removeClass('selected-power');

});

$('#campfire').on('click', function () {
	$(this).addClass('selected-power');
	$('#lake').removeClass('selected-power');
});
// end selecting power

//Selecting 4 directions for fire spread
var fireStarter = function(starter){
	var fireParent = (starter.parent());

	var fireNext = fireParent.next();
	var firePrev = fireParent.prev();
	var fireLeft = firePrev.children('a')
	var fireRight = fireNext.children('a')

	// var fireBot = fireParent.next().next().next().next().next().next().next().next().next();
	// var fireTop = fireParent.prev().prev().prev().prev().prev().prev().prev().prev().prev();

	setInterval (function (){
		var fireNextChild = fireNext.children('a')
		var firePrevChild = firePrev.children('a')
		if(fireNextChild.hasClass('btn-default')){
		fireNextChild.addClass('btn-warning').removeClass('btn-default');
		setTimeout( function() {
				if(fireNextChild.hasClass('btn-warning')){
					 fireNextChild.addClass('btn-danger')
					}
				}, 2000);
	};
		if(firePrevChild.hasClass('btn-default')){
		firePrevChild.addClass('btn-warning').removeClass('btn-default');
		setTimeout( function() {
				if(firePrevChild.hasClass('btn-warning')){
					 firePrevChild.addClass('btn-danger')
					}
				}, 2000);
	};
	// var fireBotChild = fireBot.children('a').addClass('btn-warning').removeClass('btn-default');
	// var fireTopChild = fireTop.children('a').addClass('btn-warning').removeClass('btn-default');
	fireSpread( starter.parent().prev().children('a') , starter.parent().next().children('a'));}, 500);
	 
}
//recursion? //looped function
var fireSpread = function(leftFire, rightFire) {
	
		setInterval( function() {
			if(leftFire.hasClass('btn-warning') && !leftFire.hasClass('btn-info')){
			var newLeft = leftFire.parent().prev().children('a').addClass('btn-warning').removeClass('btn-default')
			setTimeout( function() {
				if(leftFire.hasClass('btn-warning')){
					 newLeft.addClass('btn-danger')
					}
				}, 2000);

			leftFire = newLeft
			}
			else {
				clearInterval()
			}
		}, 500);

		setInterval( function() {
			if(rightFire.hasClass('btn-warning') && !rightFire.hasClass('btn-info')){
			var newRight = rightFire.parent().next().children('a').addClass('btn-warning').removeClass('btn-default')
				setTimeout( function() {
				if(rightFire.hasClass('btn-warning')){
					 newRight.addClass('btn-danger')
					}
				}, 2000);

			rightFire = newRight
			}
			else{
				clearInterval()
			}
		}, 500);

};

//Button clicks
$('.btn-default').on('click', function (){
	if ($('#lake').hasClass('selected-power') && $(this).hasClass('btn-default')){
		$(this).addClass('btn-info').removeClass('btn-default').text("Lake")
	};

	if ($('#campfire').hasClass('selected-power') && !$(this).hasClass('btn-info')){
		var starter = $(event.target)
		starter.addClass('btn-danger').removeClass('btn-default').text("FIRE!")
		fireStarter(starter)
	};
});

});