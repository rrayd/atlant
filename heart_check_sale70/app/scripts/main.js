window.onload = function() {


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// vanilla functions ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    function at_app () {

        var prlxAD = document.getElementById('atCardio');
        var prlxQD = document.getElementById('atQuestor');
        var prlxTD = document.getElementById('atMainS');
        var prlxTC = document.getElementById('atTypesContainer');

        // elements
        var elementsProp = {};
        // elements properties
		elementsProp.headerTop = document.getElementById('atHeader').offsetHeight;
        function elements_init() {
            elementsProp.typesTop = prlxAD.offsetTop - elementsProp.headerTop;
            elementsProp.pricesTop = document.getElementById('atTypePrices').offsetTop;
            // elements init
            prlxTC.style.top = elementsProp.typesTop + 'px';
        }
        elements_init();

        // prlx
        var prlxProp = {};
        // prlx properties
			prlxProp.lastScroll = 0;
			prlxProp.primPosAD = 62;
        	prlxProp.primPosTD = parseInt(cssStyle(prlxTD, 'background-position-y'));
        	prlxProp.primPosQD = parseInt(cssStyle(prlxQD, 'background-position-y'));
		console.log(prlxProp.primPosAD);
        console.log(prlxProp.primPosTD);
        console.log(prlxProp.primPosQD);
		// prlx computation
        function prlx() {
            // init prlx
            prlxProp.scrolledHeight = window.pageYOffset || document.documentElement.scrollTop;
            // atCardio V
            prlxAD.style.marginTop = prlxProp.primPosAD + prlxProp.scrolledHeight / -43.99 + 'vh';
            // atMainS V
            prlxTD.style.backgroundPositionY = prlxProp.primPosTD + prlxProp.scrolledHeight / 6.99 + 'px';
            // atTypesContainer V
            if (prlxTC.offsetTop <= elementsProp.pricesTop - prlxTC.offsetHeight) {
                prlxTC.style.top = elementsProp.typesTop + prlxProp.scrolledHeight / 4.99 + 'px';
            }
            if (prlxProp.scrolledHeight < prlxProp.lastScroll) {
                if (prlxTC.offsetTop > elementsProp.pricesTop - prlxTC.offsetHeight) {
                    prlxTC.style.top = prlxTC.offsetTop - ( Math.abs( prlxTC.offsetTop - (elementsProp.pricesTop - prlxTC.offsetHeight) ) ) + 'px';
                }
            }
            // atQuestor V
            if ((prlxProp.scrolledHeight + window.innerHeight) > prlxQD.offsetTop) {
                prlxQD.style.backgroundPositionY = prlxProp.primPosQD + prlxProp.scrolledHeight / 6 + 'px';
            }
            // exit prlx
            prlxProp.lastScroll = prlxProp.scrolledHeight;
        }

        // computed style
		function cssStyle (element, property) {
            return window.getComputedStyle(element).getPropertyValue(property);
        }
        // VH recalculating
        function vh(v) {
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            return (v * h) / 1000;
        }

        /// /// /// /// ///
        // global events //
		// V V V V V V V //
        window.addEventListener('scroll', function() {
			prlx();
        });
        function resize() {
            elements_init();
        }
        window.onresize = resize;

    };

    /// /// /// ///
    //  run app  //
    // V V V V V //
    at_app();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////// jQuery plugins /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

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

};