var step = 1;

$( document ).ready(function() {
 	$('.right-arrow').click(function() {
 		if (step === 1) {
 			$(".step1").hide();
 			$(".step2").show();
 			step = 2;
 		}
 		else if (step === 2) {
 			$(".step2").hide();
 			$(".step3").show();
 			step = 3;
 		}
 	});
 	$('.left-arrow').click(function() {
 		if (step === 2) {
 			$(".step2").hide();
 			$(".step1").show();
			step = 1;
		}
 		else if (step === 3) {
 			$(".step3").hide();
 			$(".step2").show();
 			step = 2;
 		}
 	});
});