
(function ($){
  $(function(){

    $('.button-collapse').sideNav();
	$('.scrollspy').scrollSpy();
	$('select').material_select();
	$('.modal-trigger').leanModal();
      $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
	
    /*** Animate word ***/

    //set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();

	var cookie = getCookie();
	  if(cookie)
	  {
		  //alert("Got cookie!!: ["+cookie+"]");
		  loadPageByUser(cookie.user, cookie.password);
	  }


	function setCookie(user, password){
		var date = new Date();
		var minutes = 20;
		date.setTime(date.getTime() + (minutes * 60 * 1000));
		$.cookie("signin", JSON.stringify({'user' : user, 'password' : password}), { expires : date });
	}

	function getCookie(){
		var cookieValue = $.cookie("signin");
		if(cookieValue == null)
			return false;
		else
			return JSON.parse(cookieValue);
	}

	function initHeadline() {
		singleLetters($('.cd-headline.letters').find('b'));
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.cd-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}

	$('.button-collapse').sideNav({
		menuWidth: 240, // Default is 240
		closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$('.parallax').parallax();

	var card  = document.querySelectorAll('.card-work');
  	var transEndEventNames = {
	      'WebkitTransition' : 'webkitTransitionEnd',
	      'MozTransition'    : 'transitionend',
	      'transition'       : 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

	function addDashes(name) {
		return name.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); });
	}

	function getPopup(id) {
		return document.querySelector('.popup[data-popup="' + id + '"]');
	}

	function getDimensions(el) {
	   return el.getBoundingClientRect();
	}

	function getDifference(card, popup) {
		var cardDimensions = getDimensions(card),
	    	popupDimensions = getDimensions(popup);

		return {
		  	height: popupDimensions.height / cardDimensions.height,
		  	width: popupDimensions.width / cardDimensions.width,
		  	left: popupDimensions.left - cardDimensions.left,
		  	top: popupDimensions.top - cardDimensions.top
		}
	}

	function transformCard(card, size) {
		return card.style[Modernizr.prefixed('transform')] = 'translate(' + size.left + 'px,' + size.top + 'px)' + ' scale(' + size.width + ',' + size.height + ')';
	}

	function hasClass(elem, cls) {
	    var str = " " + elem.className + " ";
	    var testCls = " " + cls + " ";
	    return(str.indexOf(testCls) != -1) ;
	}

	function closest(e) {
	   var el = e.target || e.srcElement;
	    if (el = el.parentNode) do { //its an inverse loop
	        var cls = el.className;
	        if (cls) {
	            cls = cls.split(" ");
	            if (-1 !== cls.indexOf("card-work")) {
	                return el;
	                break;
	            }
	        }
	    } while (el = el.parentNode);
	}

	function scaleCard(e) {
		var el = closest(e);
		var target = el,
		    id     = target.getAttribute('data-popup-id'),
		    popup  = getPopup(id);

		var size = getDifference(target, popup);

	   	target.style[Modernizr.prefixed('transitionDuration')] = '0.5s';
	   	target.style[Modernizr.prefixed('transitionTimingFunction')] = 'cubic-bezier(0.4, 0, 0.2, 1)';
	   	target.style[Modernizr.prefixed('transitionProperty')] = addDashes(Modernizr.prefixed('transform'));
	   	target.style['borderRadius'] = 0;
	   
	  	transformCard(target, size);
	  	onAnimated(target, popup);
	  	onPopupClick(target, popup);
	}

	function onAnimated(card, popup) {
	 	card.addEventListener(transEndEventName, function transitionEnded() {
	   		card.style['opacity'] = 0;
	   		popup.style['visibility'] = 'visible';
	   		popup.style['zIndex'] = 9999;
	   		card.removeEventListener(transEndEventName, transitionEnded);
	 	});
	}

	function onPopupClick(card, popup) {
		popup.addEventListener('click', function toggleVisibility(e) {
		  	var size = getDifference(popup, card);
		  
		  	card.style['opacity'] = 1;
		  	card.style['borderRadius'] = '6px';
		  	hidePopup(e);       
		  	transformCard(card, size);
		}, false);
	}


	function hidePopup(e) {
		e.target.style['visibility'] = 'hidden';
		e.target.style['zIndex'] = 2;
	}
      
      
    function getUser(user, pass){
        if(user === "1" && pass === "1")
        {
            return 0;
        }
        else if(user === "org" && pass === "org")
        {	
            return 1;
        /*for(var i=1; i<=employeeID; i++){
            if(JSON.parse(localStorage.getItem(i.toString())) === null)
                continue;
            if(JSON.parse(localStorage.getItem(i.toString())).userName == user){
                if(JSON.parse(localStorage.getItem(i.toString())).password == pass){
                    if(JSON.parse(localStorage.getItem(i.toString())).permissions == "on")
                        return 0;
                    return 1;
                }
                $('#password').removeClass('valid');
                $('#password').addClass('invalid');
                $("#password").val("");
                $("#password").focus();
                //alert("Wrong password! please try again.");

                return -1;
            }
        }

        $("#username").removeClass('valid');
        $("#username").addClass('invalid');
        $("#username").val("");
        $("#username").focus();
        //alert("You are not registered. Please contact the Admin or try again.");
        return -1;
        */

        }
    }

function insertButtons(typeOfInsert, heName){
    
    $("#intro").empty();
    
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light green tooltipped" data-position="left" data-delay="50" data-tooltip="מציאת התאמה" type="submit" name="action" id = "findMatch"></button>');
	$("#findMatch").append('<i class="material-icons">repeat</i>');
    
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light grey tooltipped" data-position="top" data-delay="50" data-tooltip="הדפס" type="submit" name="action" id = "printBtn"></button>');
	$("#printBtn").append('<i class="material-icons">print</i>');
        
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light orange tooltipped" data-position="right" data-delay="50" data-tooltip="נקה את בחירתך" type="submit" name="action" id = "clearBtn"></button>');
	$("#clearBtn").append('<i class="material-icons">clear_all</i>');
    
    //change modal
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light red tooltipped modal-trigger3" href="#modal3" data-position="left" data-delay="50" data-tooltip=" מחק ' +heName+ '" type="submit" name="action" id = "delete' +typeOfInsert+ '"></button>');
	$('#delete' +typeOfInsert).append('<i class="material-icons">delete</i>');
    
    //change modal
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light light-blue lighten-1 tooltipped modal-trigger2" href="#modal2" data-position="top" data-delay="50" data-tooltip="ערוך ' +heName+ '" type="submit" name="action" id = "edit' +typeOfInsert+ '"></button>');
	$('#edit' +typeOfInsert).append('<i class="material-icons">mode_edit</i>');
    
    //change modal
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime tooltipped modal-trigger2" href="#modal2" data-position="right" data-delay="50" data-tooltip="הוסף ' +heName+ '" type="submit" name="action" id = "add' +typeOfInsert+ '"></button>');
	$('#add' +typeOfInsert).append('<i class="material-icons">add</i>');

	$('.tooltipped').tooltip({delay: 50});
}
      
function loadAdminPage(user){
    
	//Change page layout
    $("#links").empty();
    $("#links").append('<li> ברוך הבא ' + user + '</li>');
    $("#links").append('<li><a class="waves-effect waves-light modal-trigger tooltipped" id="disconnectUser" data-position="Down" data-delay="50" data-tooltip="התנתק" ><i class="material-icons">settings_power</i></a></li>');

	$("#disconnectUser").click(function(){
		$.removeCookie("signin");
		location.reload();
	});

    $("#index-banner").empty();
    $("#index-banner").css("min-height","80px");
    
    $("#Register").empty();
    $("#Register").removeAttr("dir");
    $("#Register").append('<div class="row" id="volOrg">');
    $("#volOrg").append('<div class="col s12" id="selectionUl">');
    $("#selectionUl").append('<ul class="tabs" id="ulTabs">');
    $("#ulTabs").append('<li class="tab col s6" ><a id="orgChooser">ארגונים</a></li>');
    $("#ulTabs").append('<li class="tab col s6" ><a class="active" id="volChooser">מתנדבים</a></li>');
    $('ul.tabs').tabs();
    
    $("#intro").wrap('<center>');
    insertButtons("Volunteer", "מתנדב");
    
    $("#Register").append('<div id="dataZoneScroll">');
    $("#dataZoneScroll").append('<ul class="collection" id="volAvatar" dir="rtl">');
        for(var i=1; i<10; i++)
        {
            $("#volAvatar").append('<li class="collection-item avatar" id="volNum' +i+ '">');
            $("#volNum" +i).append('<i class="material-icons circle light-blue">perm_identity</i>');
            $("#volNum" +i).append('<span class="title">מתנדב ' +i+ '</span>');
            $("#volNum" +i).append('<p>שורה ראשונה <br> שורה שנייה');
            $("#volNum" +i).append('<p class="secondary-content" id="p' +i+'">');
            $("#p" +i).append('<input type="checkbox" id="volCheck' +i+ '"/><label for="volCheck' +i+ '"></label>');
     
        }
    
    $("#volChooser").click(function(){
       
        insertButtons("Volunteer", "מתנדב");
        $("#dataZoneScroll").empty();
        // $("#volAvatar").remove();
        $("#dataZoneScroll").append('<ul class="collection" id="volAvatar" dir="rtl">');
        for(var i=1; i<10; i++)
        {
            idfromsql=i*i;
            $("#volAvatar").append('<li class="collection-item avatar" id="volNum' +i+ '">');
            $("#volNum" +i).append('<i class="material-icons circle light-blue">perm_identity</i>');
            $("#volNum" +i).append('<span class="title">מתנדב ' +i+ '</span>');
            $("#volNum" +i).append('<p>שורה ראשונה <br> שורה שנייה');
            $("#volNum" +i).append('<p class="secondary-content" id="p' +i+'">');
            $("#p" +i).append('<input type="checkbox" id="volCheck' +i+ '"/><label for="volCheck' +i+ '"></label>');        
        }
    });
    
    $("#orgChooser").click(function(){
         
        insertButtons("Organization", "ארגון");
        $("#dataZoneScroll").empty();
        // $("#orgAvatar").remove();
        $("#dataZoneScroll").append('<ul class="collection" id="orgAvatar" dir="rtl">');
        for(var i=1; i<6; i++)
        {
            $("#orgAvatar").append('<li class="collection-item avatar" id="volNum' +i+ '">');
            $("#volNum" +i).append('<i class="material-icons circle red">description</i>');
            $("#volNum" +i).append('<span class="title">ארגון ' +i+ '</span>');
            $("#volNum" +i).append('<p>שורה ראשונה <br> שורה שנייה');
            $("#volNum" +i).append('<p class="secondary-content" id="p' +i+'">');
            $("#p" +i).append('<input type="checkbox" id="orgCheck' +i+ '"/><label for="orgCheck' +i+ '"></label>');  
        }
    });
    
    $("#work").remove();
    
    
    /*

	$('.modal-trigger2').leanModal();
	$('.modal-trigger3').leanModal();
	
	$("#addBtn").click(function(){
		$("#addUserName").focus();
	});
	
	$("#deleteBtn").click(function(){
		$("#delName").focus();
	});
	
    
	$("#clearBtn").click(function(){
		$('.tooltipped').tooltip('remove');
		loadAdminPage(user);
	});
    
	$("#loginAddBtn").click(function(event){
		
		if($("#addUserName").val() === ""){
			$('#addUserName').removeClass('valid');
			$('#addUserName').addClass('invalid');
			$("#addUserName").val("");
			$("#addUserName").focus();
			//$('#modal2').openModal();

			//alert("User exists, please choose another username!");
			return;
		}	
		for(var i=1; i<=employeeID; i++)
		{
			if(JSON.parse(localStorage.getItem(i.toString())) === null)
				continue;
				
			if(JSON.parse(localStorage.getItem(i.toString())).userName == $("#addUserName").val()){
				$('#addUserName').removeClass('valid');
				$('#addUserName').addClass('invalid');
				$("#addUserName").val("");
				$("#addUserName").focus();
				//$('#modal2').openModal();

				//alert("User exists, please choose another username!");
				return;
			}		
		}
		if($("#choosePass").val() === "")
		{
			$('#choosePass').removeClass('valid');
			$('#choosePass').addClass('invalid');
			$("#choosePass").val("");
			$("#choosePass").focus();
			//$('#modal2').openModal();
			return;
		}	
		
		var obj = new Object();
		obj.userName = $("#addUserName").val();
		obj.password = $("#choosePass").val();	
		obj.telephone = $("#icon_telephone").val();
		obj.permissions = $('#permissions:checked').val();
		obj.email = $("#email").val();
		Materialize.toast("Employee Registered!!", 4000)
		//alert("Employee Registered!!");
		employeeID++;
		localStorage.setItem(employeeID.toString(), JSON.stringify(obj));
		localStorage.setItem("numberOfEmployees", employeeID.toString());
						$("#addUserName").val("");
		$("#modal2").closeModal();
	});

	$("#delBtn").click(function(event){
		var userToDel = $("#delName").val();
		for(var i=1; i<=employeeID; i++){
			if(JSON.parse(localStorage.getItem(i.toString())) === null)
				continue;
			if(JSON.parse(localStorage.getItem(i.toString())).userName == userToDel){
				localStorage.removeItem(i.toString());
				for(var j=(i+1); j<= employeeID; j++)
				{
					var tmpItem = localStorage.getItem(j.toString());
					localStorage.setItem(i.toString(), tmpItem);
					i++;
				}
				localStorage.removeItem(i.toString());
				employeeID--;
				localStorage.setItem("numberOfEmployees", employeeID.toString());
				Materialize.toast("User deleted successfully!", 4000)
				//alert("User deleted successfully!");
				$("#modal3").closeModal();
				return;
			}
			$('#delName').removeClass('valid');
			$('#delName').addClass('invalid');
			$("#delName").val("");
			$("#delName").focus();
		}
			//$('#modal3').openModal();
		//alert("User doesn't exists, please choose another username and try again!");		
	});
	*/
	$("#dataZone").empty();
    //To-Do: implement the data for the admin view
	
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      //constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      //alignment: 'center' // Displays dropdown with edge aligned to the left of button
    });
	$('select').material_select();
	
	$("#submitBtn").click(function(event){
		if(localStorage.getItem("Shifts"))
			localStorage.removeItem("Shifts");
	
		var obj = new Object();
		obj.givenShifts = new Array(3);
		obj.givenShifts[0] = new Array(7);
		obj.givenShifts[1] = new Array(7);
		obj.givenShifts[2] = new Array(7);
		
		for(var i = 0; i<7; i++)
		{
			obj.givenShifts[0][i] = [];
			obj.givenShifts[1][i] = [];
			obj.givenShifts[2][i] = [];
		}
		
		for(var i = 0; i<3; i++)
		{
			for(var j = 0; j<7; j++)
			{
				//Selecting the related <select> to <td>
				$('#'+i+j+'s :selected').each(function(k, selected){
						if($(selected).text() !== "")
							obj.givenShifts[i][j].push($(selected).text());
				});
				//alert(obj.givenShifts[i][j] + " number of elements: " + obj.givenShifts[i][j].length);
			}
		}
		
		localStorage.setItem("Shifts", JSON.stringify(obj));
		Materialize.toast("Thank you", 4000)
		//alert("Thank you");
	});
	
	
	$('.tooltipped').tooltip({delay: 50});
}

function loadOrganizationPage(user){
    
	//Change page layout
    $("#links").empty();
    $("#links").append('<li> ברוך הבא ' + user + '</li>');
    $("#links").append('<li><a class="waves-effect waves-light modal-trigger tooltipped" data-position="Down" data-delay="50" data-tooltip="התנתק" href="index.html"><i class="material-icons">settings_power</i></a></li>');
    
    $("#index-banner").empty();
    $("#index-banner").css("min-height","80px");
    //$("#index-banner").css("color","white");
	//$("#index-banner").append('<center><h1>Welcome ' + user + '</h1></center>');
    /*
	$("#index-banner").append('<div class="row center" id = "row1">');
	
	$("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime tooltipped modal-trigger2" href="#modal2" data-position="left" data-delay="50" data-tooltip="Add new Volunteer" type="submit" name="action" id = "addVolunteer"></button>');
	$("#addVolunteer").append('<i class="material-icons">add</i>');
    
    //change modal
    $("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime tooltipped modal-trigger2" href="#modal2" data-position="top" data-delay="50" data-tooltip="Edit Volunteer" type="submit" name="action" id = "editVolunteer"></button>');
	$("#editVolunteer").append('<i class="material-icons">mode_edit</i>');
    
    //change modal
    $("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light red tooltipped modal-trigger3" href="#modal3" data-position="top" data-delay="50" data-tooltip="Delete Volunteer" type="submit" name="action" id = "deleteVolunteer"></button>');
	$("#deleteVolunteer").append('<i class="material-icons">delete</i>');
    
    //change modal
    $("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime darken-3 tooltipped modal-trigger2" href="#modal2" data-position="top" data-delay="50" data-tooltip="Add new Organization" type="submit" name="action" id = "addOrganization"></button>');
	$("#addOrganization").append('<i class="material-icons">add</i>');
    
    //change modal
    $("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime tooltipped modal-trigger2" href="#modal2" data-position="top" data-delay="50" data-tooltip="Edit Organization" type="submit" name="action" id = "editOrganization"></button>');
	$("#editOrganization").append('<i class="material-icons">mode_edit</i>');
	
    //change modal
    $("#row1").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light red tooltipped modal-trigger3" href="#modal3" data-position="top" data-delay="50" data-tooltip="Delete Organiztion" type="submit" name="action" id = "deleteOrganization"></button>');
	$("#deleteOrganization").append('<i class="material-icons">delete</i>');
	
    
    */
    
    $("#Register").empty();
    $("#Register").removeAttr("dir");
    $("#Register").append('<div class="row" id="volOrg">');
    $("#volOrg").append('<div class="col s12" id="selectionUl">');
    $("#selectionUl").append('<ul class="tabs" id="ulTabs">');
    $("#ulTabs").append('<li class="tab col s6" ><a class="active" id="volChooser">Volunteers</a></li>');
    $("#ulTabs").append('<li class="tab col s6" ><a id="orgChooser">Organizations</a></li>');
    
    $('ul.tabs').tabs();
    
    $("#volChooser").click(function(){
        alert("ani gay");
    });
    
    //$("#index-banner").append('<div id="volTab" class="col s12">Volunteers</div>');
    //$("#index-banner").append('<div id="orgTab" class="col s12">Organizations</div>');
    
    
    ///////////////////
    //$("#Register").empty();
    $("#Register").css("color","black");
    $("#Register").append('<div id="VolunteerData-left">BLA left </div>');
    $("#Register").append('<div id="OrganizationData-right">BLA right </div>');
    
    
    
    $("#intro").empty();
    $("#intro").wrap('<center>')
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light orange tooltipped" data-position="top" data-delay="50" data-tooltip="Clear your selection" type="submit" name="action" id = "clearBtn"></button>');
	$("#clearBtn").append('<i class="material-icons">clear_all</i>');
	
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light grey tooltipped" data-position="top" data-delay="50" data-tooltip="Print your selection" type="submit" name="action" id = "printBtn"></button>');
	$("#printBtn").append('<i class="material-icons">print</i>');
   
	$("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light green tooltipped" data-position="right" data-delay="50" data-tooltip="Find a Match" type="submit" name="action" id = "findMatch"></button>');
	$("#findMatch").append('<i class="material-icons">repeat</i>');
    
    /*

	$('.modal-trigger2').leanModal();
	$('.modal-trigger3').leanModal();
	
	$("#addBtn").click(function(){
		$("#addUserName").focus();
	});
	
	$("#deleteBtn").click(function(){
		$("#delName").focus();
	});
	
    
	$("#clearBtn").click(function(){
		$('.tooltipped').tooltip('remove');
		loadAdminPage(user);
	});
    
	$("#loginAddBtn").click(function(event){
		
		if($("#addUserName").val() === ""){
			$('#addUserName').removeClass('valid');
			$('#addUserName').addClass('invalid');
			$("#addUserName").val("");
			$("#addUserName").focus();
			//$('#modal2').openModal();

			//alert("User exists, please choose another username!");
			return;
		}	
		for(var i=1; i<=employeeID; i++)
		{
			if(JSON.parse(localStorage.getItem(i.toString())) === null)
				continue;
				
			if(JSON.parse(localStorage.getItem(i.toString())).userName == $("#addUserName").val()){
				$('#addUserName').removeClass('valid');
				$('#addUserName').addClass('invalid');
				$("#addUserName").val("");
				$("#addUserName").focus();
				//$('#modal2').openModal();

				//alert("User exists, please choose another username!");
				return;
			}		
		}
		if($("#choosePass").val() === "")
		{
			$('#choosePass').removeClass('valid');
			$('#choosePass').addClass('invalid');
			$("#choosePass").val("");
			$("#choosePass").focus();
			//$('#modal2').openModal();
			return;
		}	
		
		var obj = new Object();
		obj.userName = $("#addUserName").val();
		obj.password = $("#choosePass").val();	
		obj.telephone = $("#icon_telephone").val();
		obj.permissions = $('#permissions:checked').val();
		obj.email = $("#email").val();
		Materialize.toast("Employee Registered!!", 4000)
		//alert("Employee Registered!!");
		employeeID++;
		localStorage.setItem(employeeID.toString(), JSON.stringify(obj));
		localStorage.setItem("numberOfEmployees", employeeID.toString());
						$("#addUserName").val("");
		$("#modal2").closeModal();
	});

	$("#delBtn").click(function(event){
		var userToDel = $("#delName").val();
		for(var i=1; i<=employeeID; i++){
			if(JSON.parse(localStorage.getItem(i.toString())) === null)
				continue;
			if(JSON.parse(localStorage.getItem(i.toString())).userName == userToDel){
				localStorage.removeItem(i.toString());
				for(var j=(i+1); j<= employeeID; j++)
				{
					var tmpItem = localStorage.getItem(j.toString());
					localStorage.setItem(i.toString(), tmpItem);
					i++;
				}
				localStorage.removeItem(i.toString());
				employeeID--;
				localStorage.setItem("numberOfEmployees", employeeID.toString());
				Materialize.toast("User deleted successfully!", 4000)
				//alert("User deleted successfully!");
				$("#modal3").closeModal();
				return;
			}
			$('#delName').removeClass('valid');
			$('#delName').addClass('invalid');
			$("#delName").val("");
			$("#delName").focus();
		}
			//$('#modal3').openModal();
		//alert("User doesn't exists, please choose another username and try again!");		
	});
	*/
	$("#dataZone").empty();
    //To-Do: implement the data for the admin view
	
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      //constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      //alignment: 'center' // Displays dropdown with edge aligned to the left of button
    });
	$('select').material_select();
	
	$("#submitBtn").click(function(event){
		if(localStorage.getItem("Shifts"))
			localStorage.removeItem("Shifts");
	
		var obj = new Object();
		obj.givenShifts = new Array(3);
		obj.givenShifts[0] = new Array(7);
		obj.givenShifts[1] = new Array(7);
		obj.givenShifts[2] = new Array(7);
		
		for(var i = 0; i<7; i++)
		{
			obj.givenShifts[0][i] = [];
			obj.givenShifts[1][i] = [];
			obj.givenShifts[2][i] = [];
		}
		
		for(var i = 0; i<3; i++)
		{
			for(var j = 0; j<7; j++)
			{
				//Selecting the related <select> to <td>
				$('#'+i+j+'s :selected').each(function(k, selected){
						if($(selected).text() !== "")
							obj.givenShifts[i][j].push($(selected).text());
				});
				//alert(obj.givenShifts[i][j] + " number of elements: " + obj.givenShifts[i][j].length);
			}
		}
		
		localStorage.setItem("Shifts", JSON.stringify(obj));
		Materialize.toast("Thank you", 4000)
		//alert("Thank you");
	});
	
	
	$('.tooltipped').tooltip({delay: 50});
}
      
      $("#loginBtn").click(function(event){
		
        var user = $("#username").val();
        var pass = $("#password").val();

		  loadPageByUser(user, pass);
    });

	  //TODO: get users from DB
	function loadPageByUser(user, pass){
		var userType = getUser(user, pass);

		console.log(user);

		if(userType == 0) //Admin
		{
			$("#modalLogin").closeModal();
			loadAdminPage(user);
		}
		else if(userType == 1) //Organization
		{
			$("#modalLogin").closeModal();
			loadOrganizationPage(user);
		}
		else //error
		{
			//$("#modal1").closeModal();
			//sleep(1);
			//$("#modal1").openModal();
		}
		//TODO: exit function in the last else (on error)
		setCookie(user,pass);
	}

	// [].forEach.call(card, function(card) {
	// 	card.addEventListener('click', scaleCard, false);
	// });

	}); // end of document ready
})(jQuery); // end of jQuery name space