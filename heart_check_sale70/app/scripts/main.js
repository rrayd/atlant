$( document ).ready(function() {
	// jquery functions
	// smooth scrolling for anchors
	$('a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 89
			}, 1000);
		}
	});

	// go form masks
	$('#telephone').mask('+99999999999');

	// go form validate
	 $('#at-invite').validate({
		rules: {
			'name': 'required',
			'lastname': 'required',
			'email': 'email',
			'telephone': 'required',
			'company': 'required',
			'work': 'required'
		},
		submitHandler: function(form) {
			console.log('sending form begin');
			$.ajax({
				type: 'POST',
				url: 'al_invite.php',
				data: $(form).serialize(),
				timeout: 3000,
				success: function() {alert('works');},
				error: function() {alert('failed');}
			});
			return false;
	  }
	});

	// vanilla functions
	function at_app () {

		var hD = document.getElementById('atlantDancer');
		var bD = document.getElementById('questionDancer');
        var tD = document.getElementById('typeDancer');

		window.addEventListener('scroll', function() {
			var scrolledHeight = window.pageYOffset;
		  	hD.style.marginTop = 65 + scrolledHeight / -9.99 + 'vh';
            tD.style.backgroundPositionY = -110 + scrolledHeight / 6 + 'px';
		  	if ((scrolledHeight + window.innerHeight) > bD.offsetTop) {
            	bD.style.backgroundPositionY = -110 + scrolledHeight / 6 + 'px';
		  	}
		});

	};
	// run vanilla app
	at_app();
});