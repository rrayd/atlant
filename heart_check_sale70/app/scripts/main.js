// px to vh > to px
function vh(px) {
    var curSc = window.innerHeight || document.documentElement.clientHeight;
    var vh = (px / curSc) * 100;
    return vh;
}
function px(vh) {
    var curSc = window.innerHeight || document.documentElement.clientHeight;
    var px = (curSc * vh) / 100;
    return px + 'px';
}

window.onload = function() {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// vanilla functions ////////////////////////////////////////////
    //////////////////////////////////////// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ////////////////////////////////////////////
    function at_app () {

        var prlxAD = document.getElementById('atCardio');
        var prlxQD = document.getElementById('atQuestor');
        var prlxTD = document.getElementById('atMainS');
        var prlxTC = document.getElementById('atTypesContainer');

        var mobile = false;

        // elements birth
        var elementsProp = {};
		elementsProp.headerTop = document.getElementById('atHeader').offsetHeight;
        function elementsInitResize() {
            if (Math.max(window.innerWidth || document.documentElement.clientWidth) < 800) {
                mobile = true;
            }
            if (mobile === false) {
                elementsProp.typesTop = prlxAD.offsetTop - 20 - elementsProp.headerTop;
            } else {
                elementsProp.typesTop = prlxAD.offsetTop + 40 - elementsProp.headerTop;
            }
            elementsProp.pricesTop = document.getElementById('atTypePrices').offsetTop;
            // elements init
            prlxTC.style.top = elementsProp.typesTop + 'px';
        }
        elementsInitResize();

        // prlx
        var prlxProp = {};
			prlxProp.lastScroll = 0;
			prlxProp.primPos_AD = vh(parseInt(cssStyle(prlxAD, 'margin-top')));
        	prlxProp.primPos_TD = parseInt(cssStyle(prlxTD, 'background-position-y'));
        	prlxProp.primPos_QD = parseInt(cssStyle(prlxQD, 'background-position-y'));
        function prlx() {
            prlxProp.scrolledHeight = window.pageYOffset || document.documentElement.scrollTop;

            prlxAD.style.marginTop = prlxProp.primPos_AD + prlxProp.scrolledHeight / -43.99 + 'vh'; // atCardio
            prlxTD.style.backgroundPositionY = prlxProp.primPos_TD + prlxProp.scrolledHeight / 6.99 + 'px'; // atMainS
            if (mobile === false) {
                if (prlxTC.offsetTop <= elementsProp.pricesTop - prlxTC.offsetHeight) {
                    prlxTC.style.top = elementsProp.typesTop + prlxProp.scrolledHeight / 4.69 + 'px'; // atTypesContainer
                }
                if (prlxProp.scrolledHeight < prlxProp.lastScroll) {
                    if (prlxTC.offsetTop > elementsProp.pricesTop - prlxTC.offsetHeight) {
                        prlxTC.style.top = prlxTC.offsetTop - ( Math.abs(prlxTC.offsetTop - (elementsProp.pricesTop - prlxTC.offsetHeight)) ) + 'px'; // atTypesContainer
                    }
                }
            }
            if ((prlxProp.scrolledHeight + window.innerHeight) > prlxQD.offsetTop) {
                prlxQD.style.backgroundPositionY = prlxProp.primPos_QD + prlxProp.scrolledHeight / 6 + 'px'; // atQuestor
            }

            prlxProp.lastScroll = prlxProp.scrolledHeight;
        }

        // utility //
        // ↓↓↓↓↓↓↓↓ //
        // computed style
		function cssStyle(element, property) {
            return window.getComputedStyle(element).getPropertyValue(property);
        }
        // events //
		// ↓↓↓↓↓↓↓ //
        window.addEventListener('scroll', function() {
			prlx();
        });
        function resize() {
            elementsInitResize();
        }
        window.onresize = resize;

    };

    // run //
    // ↓↓↓ //
    at_app();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// jQuery functions ////////////////////////////////////////////
    ///////////////////////////////////////// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ////////////////////////////////////////////
    // smooth scrolling for anchors
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        var cor = 0;
        if( target.length ) {
            event.preventDefault();
            if (target.attr('id') === 'heartPictureTarget') {
            	cor = 270
			}
            $('html, body').stop().animate({
                scrollTop: target.offset().top - cor - 90
            }, 1000);
        }
    });
    // popups
	$('.at-show-popup').on('click', function () {
		var popupTarget = $(this).data('popupTarget');
		$('.at-popup').removeClass('show');
		$('.at-popup.' + popupTarget).toggleClass('show');
    })
    $('.at-popup-close').on('click', function () {
        $('.at-popup').removeClass('show');
    })
	// go form masks
	$('#telephone').mask('+99999999999');
	// go form validate
	 $('#at-invite').validate({
		rules: {
			'name': 'required',
			'telephone': 'required',
		},
		submitHandler: function(form) {
			$.ajax({
				type: 'POST',
				url: 'al_invite.php',
				data: $(form).serialize(),
				timeout: 3000,
				success: function() {console.log('send mail');},
				error: function() {console.log('ERROR SENDING');}
			});
			return false;
	  }
	});

};