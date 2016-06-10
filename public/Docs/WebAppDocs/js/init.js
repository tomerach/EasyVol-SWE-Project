(function ($){
	var g_array;
	var g_user;
	var g_volunteer;

  $(function(){
    $('.button-collapse').sideNav();
	$('.scrollspy').scrollSpy();
	$('select').material_select();
	$('.modal-trigger').leanModal();
      $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
	  $('#FB_IndustrialRelations_A').val('יחסים עם מתנדבים אחרים');
	  $('#FB_IndustrialRelations_B').val('יחסים עם הצוות');
	  $('#FB_IndustrialRelations_C').val('יחסים עם המוטבים/לקוחות');
	  $('#FB_ProgressIndicators_A').val('עמידה בלוח זמנים וסיום משימות בזמן');
	  $('#FB_ProgressIndicators_B').val('יוזמה');
	  $('#FB_ProgressIndicators_C').val('גמישות');
	  $('#FB_ManagerComments').val('');
	  $('#FB_ManagerComments').trigger('autoresize');
	  $('#FB_VolComments').val('');
	  $('#FB_VolComments').trigger('autoresize');
	  $('#FB_GreatAchievement').val('');
	  $('#FB_GreatAchievement').trigger('autoresize');
	  $('#FB_PointsForImprovement').val('');
	  $('#FB_PointsForImprovement').trigger('autoresize');
	  $('#FB_FuturePlans').val('');
	  $('#FB_FuturePlans').trigger('autoresize');



	  $('.datepicker').pickadate({
		  selectMonths: true, // Creates a dropdown to control month
		  min: [1940,1,01],
		  max: [2020,7,14],
		  selectYears: 70 // Creates a dropdown of 15 years to control year
	  });

    $('#updateBtnVol').hide();
      $('#updateBtnOrg').hide();

      $("#mailFromHomePage").click(function(){
            var details = {
                subject: $("#icon_prefix").val() + " רוצה להתנדב!",
                mailContent: $("#icon_prefix2").val() + "\n\n\n" + $("#icon_email").val(),
                emailAdress: '<easyvol.mevaseret@gmail.com>',
            };
            $.post('/SendMail', details);  

            var $toastContent = $('<span>המייל נשלח בהצלחה</span>');
            Materialize.toast($toastContent, 3000);
            $("#mailToAllModal").closeModal();
      });
      
	  $("#submitBtnVol").click(function(){

		  //TODO: Add validations before submitting details

		  var volunteer = getVolunteerObject();
		  volunteer.FourtyHours = false;
		  volunteer.Organization= "";
		  volunteer.StartedVolunteering = false;

		  console.log(volunteer);
		  $("#VolunteerQuestModal").closeModal();
		  $.post("/AddRecord?volunteers",volunteer);


		  var $toastContent = $('<span>תודה, בקשתך נרשמה</span>');
		  Materialize.toast($toastContent, 3000);

		  setTimeout(function(){
			  window.location.reload();
		  }, 1000);

	  });

      $("#submitBtnOrg").click(function(){

          //TODO: Add validations before submitting details

          var organization = getOrgObject();



          $("#OrganizationQuestModal").closeModal();
          $.post("/AddRecord?organizations",organization);


          var $toastContent = $('<span>תודה, בקשתך נרשמה</span>');
          Materialize.toast($toastContent, 3000);

          setTimeout(function(){
              window.location.reload();
          }, 1000);

      });




      function getOrgObject()
      {

		//TODO: Add validations before submitting details

		var organization = {
            organizationName: $("#orgName").val(),
            ProgramName: $("#programName").val(),
            contactName: $("#conName").val(),
            contactRole: $("#conRole").val(),
            officePhone: $("#officePhone").val(),
            contactPhone: $("#conPhone").val(),
            organizationEmail: $("#orgEmail").val(),
            fieldManName: $("#fieldMan").val(),
            fieldManEmail: $("#fieldEmail").val(),
            fieldManPhone: $("#fieldManPhone").val(),
            orgMultiDates: $("#orgMultiDates").val(),
            orgMultiHours: $("#orgMultiHours").val(),
            orgVolunteerLociton: $("#orgVolunteerLocation").val(),
            orgVolunteerLocationOther: $("#orgVolunteerLocationOther").val(),
            orgMultiVolTypes: $("#orgMultiVolTypes").val(),
            orgMultiVolTypesOther: $("#orgMultiVolTypesOther").val(),
            orgTimePeriod: $("#orgTimePeriod").val(),
            orgMultiLanguage: $("#orgMultiLanguage").val(),
            orgPassword: $("#orgPassword").val(),
            cPassword: $("#cPassword").val(),
            orgUserName: $("#orgUserName").val()
        }
          return organization;

		};



	 function getVolunteerObject(){
		 var volunteer = {
			 firstName: $("#fName").val(),
			 lastName: $("#lName").val(),
			 phone: $("#telephone").val(),
			 IDnumber: $("#IDnum").val(),
			 HomeCity: $("#City").val(),
			 HomeStreet: $("#HomeStreet").val(),
			 HomeZipcode: $("#Zipcode").val(),
			 Hometelephone: $("#Hometelephone").val(),
			 emailAdress: $("#email").val(),
			 BirthdayDate: $("#Birthday").val(),
			 familyStatus: $("#familyStatus").val(),
			 educationLevel: $("#education").val(),
			 workOccupation: $("#occupation").val(),
			 workJob: $("#Job").val(),
			 wrokDuty: $("#duty").val(),
			 leisureHobby: $("#Hobby").val(),
			 leisureVolunteerExperience: $("#VolunteerExperience").val(),
			 leisureVolunteerTropic: $("#VolunteerTropic").val(),
			 leisureUniqueTalents: $("#UniqueTalents").val(),
			 InterestVolunteerReasons: $("#VolunteerReasons").val(),
			 InterestVolunteerExpectations: $("#VolunteerExpectations").val(),
			 InterestMultiDates: $("#multiDates").val(),
			 InterestMultiHours: $("#multiHours").val(),
			 InterestVolunteerLociton: $("#VolunteerLociton").val(),
			 InterestVolunteerLocitonOther: $("#VolunteerLocitonOther").val(),
			 InterestmultiVolTypes: $("#multiVolTypes").val(),
			 InterestmultiVolTypesOther: $("#multiVolTypesOther").val(),
			 InterestTimePeriod: $("#TimePeriod").val(),
			 InterestmultiLanguage: $("#multiLanguage").val(),
			 StudentAcademicInstitution: $("#StudentAcademicInstitution").val(),
			 StudentEducationDepartment: $("#StudentEducationDepartment").val(),
			 StudentYearDates: $("#YearDates").val(),
			 StudentYearDatesOther: $("#YearDatesOther").val(),
			 StudentVoluntaryExtra: $("#StudentVoluntaryExtra").val(),
			 StudentHomeTwon: $("#StudentHomeTwon").val(),
		 };

		 return volunteer;
	  }

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
		  //alert("Got cookie!!: ["+cookie.user+","+cookie.password+"]");
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

function insertButtons(typeOfInsert, heName, typeOfPage){

    $("#intro").empty();

    if(typeOfPage === "AdminPage"){
        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light green tooltipped" data-position="top" data-delay="50" data-tooltip="מציאת התאמה" type="submit" name="action" id = "findMatch"></button>');
        $("#findMatch").append('<i class="material-icons">repeat</i>');       
        
        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light light-blue lighten-1 tooltipped " href="#" data-position="top" data-delay="50" data-tooltip="שלח מייל ליעדים נבחרים" type="submit" name="action" id = "mailToAllBtn"></button>');
        $("#mailToAllBtn").append('<i class="material-icons">email</i>');
    }

    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light grey tooltipped" data-position="top" data-delay="50" data-tooltip="הדפס" type="submit" name="action" id = "printBtn"></button>');
	$("#printBtn").append('<i class="material-icons">print</i>');

     $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light orange tooltipped" data-position="top" data-delay="50" data-tooltip="בחר הכל" type="submit" name="action" id = "markAllBtn"></button>');
	$("#markAllBtn").append('<i class="material-icons">done_all</i>');
        
    $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light orange tooltipped" data-position="top" data-delay="50" data-tooltip="נקה את בחירתך" type="submit" name="action" id = "clearBtn"></button>');
	$("#clearBtn").append('<i class="material-icons">clear_all</i>');


    if(typeOfPage === "AdminPage"){
        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light red tooltipped modal-trigger3" href="#modal3" data-position="top" data-delay="50" data-tooltip=" מחק ' +heName+ '" type="submit" name="action" id = "delete' +typeOfInsert+ '"></button>');
        $('#delete' +typeOfInsert).append('<i class="material-icons">delete</i>');

        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light light-blue lighten-1 tooltipped" href="#" data-position="top" data-delay="50" data-tooltip="ערוך ' +heName+ '" type="submit" name="action" id = "edit' +typeOfInsert+ '"></button>');
        $('#edit' +typeOfInsert).append('<i class="material-icons">mode_edit</i>');

        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light lime tooltipped modal-trigger" href="#'+typeOfInsert+'QuestModal"'+ 'data-position="top" data-delay="50" data-tooltip="הוסף ' +heName+ '" type="submit" name="action" id = "add' +typeOfInsert+ '"></button>');
        $('#add' +typeOfInsert).append('<i class="material-icons">add</i>');
    }

    else{ //Organization page
        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light red tooltipped" href="#" data-position="top" data-delay="50" data-tooltip=" המתנדב השלים 40 שעות" type="submit" name="action" id = "fourtyHours"></button>');
        $('#fourtyHours').append('<i class="material-icons">done</i>');

        $("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light light-blue lighten-1 tooltipped" href="#" data-position="top" data-delay="50" data-tooltip="המתנדב התחיל להתנדב" type="submit" name="action" id = "startedToVol"></button>');
        $('#startedToVol').append('<i class="material-icons">play_arrow</i>');

		$("#intro").append('<button class="usrBttns btn-floating btn-large waves-effect waves-light green tooltipped" href="#" data-position="top" data-delay="50" data-tooltip="טופס משוב והערכת מתנדב" type="submit" name="action" id = "feedbackToVol"></button>');
		$('#feedbackToVol').append('<i class="material-icons">assignment</i>');
    }

	$('.tooltipped').tooltip({delay: 50});

    $("#clearBtn").click(function(){
        $( "input:checked").prop('checked', false);
    });

    $("#markAllBtn").click(function(){
        $("input:checkbox:not(:checked)").prop('checked', true);   
    });
	$("#feedbackToVol").click(function(){
		var n = $( "input:checked");
		var filter = {};
		filter['ids'] = [];
		Array.from(n).forEach(function(item, index){
			filter['ids'].push(item.id);
		});

		if(filter['ids'].length == 1)
			$("#feedbackToVolModal").openModal();

		else{
			var $toastContent = $('<span>יש לסמן מתנדב אחד לפחות</span>');
			Materialize.toast($toastContent, 3000);
		}
	});

    $("#mailToAllBtn").click(function(){
         //var selected = GetCheckedAvatars();

        var n = $( "input:checked");
		var filter = {};
		filter['ids'] = [];
		Array.from(n).forEach(function(item, index){
			filter['ids'].push(item.id);
		});

        if(filter['ids'].length > 0)

            $("#mailToAllModal").openModal();
        else{
            var $toastContent = $('<span>יש לסמן מתנדב אחד לפחות</span>');
            Materialize.toast($toastContent, 3000);
        }
        
        $("#senMailModalBtn").click(function(){
            
            for(var i=0; i<filter['ids'].length; i++){
                $.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+filter['ids'][i]+'?}}',function(result) {

                    var details = {
                        typeOfMailPost: "toAll",
                        subject: $("#mailSubject").val(),
                        mailContent: $("#mailContent").val(),
                        emailAdress: result[0].emailAdress,
                    };
                    $.post('/SendMail', details);  
                });
            }

            var $toastContent = $('<span>המייל נשלח בהצלחה</span>');
            Materialize.toast($toastContent, 3000);
            $("#mailToAllModal").closeModal();

            setTimeout(function(){
            window.location.reload();
            }, 1000);           

        });

         
     });
    

    $('#fourtyHours').click(function(){
        var selected = GetCheckedAvatars();
        
        if(selected.length > 0)
        {   
            for(var i=0; i<selected.length; i++){
                $.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+selected[i]+'?}}',function(result) {
                    var objId = result[0]._id;
                    delete result[0]._id;
                    result[0].FourtyHours =  result[0].FourtyHours == "false" ? "true" : "false";

                    $.post('/UpdateRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+objId+'?}}', result[0]);
                });

            }

            var $toastContent = $('<span>הרשומה עודכנה</span>');
            Materialize.toast($toastContent, 3000);

            setTimeout(function(){
            window.location.reload();
            }, 1000);

        }
        else{
            var $toastContent = $('<span>יש לסמן מתנדב אחד לפחות</span>');
            Materialize.toast($toastContent, 3000);
        }

    });

    $('#startedToVol').click(function(){
       //var selected = GetCheckedAvatars();
        var n = $( "input:checked");
		var filter = {};
		filter['ids'] = [];
		Array.from(n).forEach(function(item, index){
			filter['ids'].push(item.id);
		});
       
        if(filter['ids'].length > 0)
        {
            for(var i=0; i<filter['ids'].length; i++){
                $.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+filter['ids'][i]+'?}}',function(result) {
                    var objId = result[0]._id;
                    delete result[0]._id;
                    result[0].StartedVolunteering =  result[0].StartedVolunteering == "false" ? "true" : "false";

                    var newVol = result[0];
                    $.post('/UpdateRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+objId+'?}}', result[0]);
                    console.log(result[0]);

                    if(newVol.StartedVolunteering == "true"){
                        //TODO: Add organiztion name!

                        var details = {
                            typeOfMailPost: "toOne",
                            mailContent:  "רכז המתנדבים שלום, \n\nהמתנדב/ת " +result[0].firstName+ " " + result[0].lastName+ ", תעודת זהות " + result[0].IDnumber +", החל/ה להתנדב בארגון " + //details.orgName 
                            "שם ארגון זמני "+ "\n\n בברכה, \n מערכת EasyVol",
                            subject :  "השמת " +result[0].firstName+ " " + result[0].lastName + " לארגון",
                            emailAdress: result[0].emailAdress
                        };
                    $.post('/SendMail', details); 
                    }

                    $.post('/UpdateRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+objId+'?}}', result[0]);

                    //TODO: Add organiztion name!

                    var details = {
                        firstName : result[0].firstName,
                        lastName : result[0].lastName,
                        IDnumber : result[0].IDnumber,
                        emailAdress : result[0].emailAdress,
                        orgName : "שם זמני"
                    };

                    $.post('/SendMail', details);


                });

            }

            var $toastContent = $('<span>הרשומה עודכנה</span>');
            Materialize.toast($toastContent, 3000);


            setTimeout(function(){
            window.location.reload();
            }, 1000);

        }
        else{
            var $toastContent = $('<span>יש לסמן מתנדב אחד לפחות</span>');
            Materialize.toast($toastContent, 3000);
        }

    });






	$('#delete' +typeOfInsert).click(function(){

		var n = $( "input:checked");
		var filter = {};
		filter['ids'] = [];
		Array.from(n).forEach(function(item, index){
			filter['ids'].push(item.id);
		});

		console.log(filter);

        if(filter['ids'].length > 0)
        {

		typeOfInsert == "Volunteer" ?  $.post("/DeleteRecord?volunteers",filter): $.post("/DeleteRecord?organizations",filter);
		var $toastContent = $('<span>רשומה נמחקה</span>');
		Materialize.toast($toastContent, 3000);

		setTimeout(function(){
			window.location.reload();
		}, 1000);
        }
        else{
            var $toastContent = $('<span>יש לסמן מתנדב אחד לפחות</span>');
		Materialize.toast($toastContent, 3000);
        }
	});



    $("#editOrganization").click(function() {
        var n = $("input:checked");
        var filter = {};
        filter['ids'] = [];
        Array.from(n).forEach(function (item, index) {
            filter['ids'].push(item.id);
        });

        if (filter['ids'].length == 1) {
            $('#submitBtnOrg').hide();
            $('#updateBtnOrg').show();
            $('#orgFormName').html("עריכת ארגון");
            $("#OrganizationQuestModal").openModal({
				dismissible: true, // Modal can be dismissed by clicking outside of the modal
				opacity: .5, // Opacity of modal background
				in_duration: 300, // Transition in duration
				out_duration: 200, // Transition out duration
				complete: function() { setTimeout(function(){
					window.location.reload();
				}, 200); } // Callback for Modal close
			});

            console.log(filter['ids'][0]);
            $.getJSON('/GetRecord?{?collection?:?organizations?,?filter?:{?_id?:?' + filter['ids'][0] + '?}}', function (result) {
                console.log(result);
                $("#OrganizationQuestModal label").attr('class', 'active');
                $("#orgName").attr('_id', filter['ids'][0]);
                $("#orgName").val(result[0].organizationName);
                $("#programName").val(result[0].ProgramName);
                $("#conName").val(result[0].contactName);
                $("#conRole").val(result[0].contactRole);
                $("#officePhone").val(result[0].officePhone);
                $("#conPhone").val(result[0].contactPhone);
                $("#orgEmail").val(result[0].organizationEmail);
                $("#fieldMan").val(result[0].fieldManName);
                $("#fieldEmail").val(result[0].fieldManEmail);
                $("#fieldManPhone").val(result[0].fieldManPhone);
                $("#orgMultiDates").val(result[0].orgMultiDates);
                $("#orgMultiHours").val(result[0].orgMultiHours);
                $("#orgVolunteerLociton").val(result[0].orgVolunteerLociton);
                $("#orgVolunteerLocationOther").val(result[0].orgVolunteerLocationOther);
                $("#orgMultiVolTypes").val(result[0].orgMultiVolTypes);
                $("#orgMultiVolTypesOther").val(result[0].orgMultiVolTypesOther);
                $("#orgTimePeriod").val(result[0].orgTimePeriod);
                $("#orgMultiLanguage").val(result[0].orgMultiLanguage);
                $("#orgPassword").val(result[0].orgPassword);
                $("#cPassword").val(result[0].cPassword);
                $("#orgUserName").val(result[0].orgUserName);

            });
        }

        else {
            var $toastContent = $('<span>יש לסמן ארגון אחד בדיוק</span>');
            Materialize.toast($toastContent, 3000);
            return;
        }

        $("#updateBtnOrg").click(function () {
            $("#OrganizationQuestModal").closeModal();
            $("#OrganizationQuestModal label").removeAttr('class');

            $('#submitBtnOrg').show();
            $('#updateBtnOrg').hide();
            $('#volFormName').html("שאלון ארגונים");

            var newOrg = getOrgObject();
            //console.log(oldVol);
            console.log(newOrg);

            $.post('/UpdateRecord?{?collection?:?organizations?,?filter?:{?_id?:?' + $("#orgName").attr("_id") + '?}}', newOrg);
            var $toastContent = $('<span>רשומה נערכה בהצלחה</span>');
            Materialize.toast($toastContent, 3000);

            $("#OrganizationQuestModal input").val("");

            setTimeout(function () {
                window.location.reload();
            }, 1000);
        });
    });









    $("#editVolunteer").click(function() {
		var n = $("input:checked");
		var filter = {};
		filter['ids'] = [];
		Array.from(n).forEach(function (item, index) {
			filter['ids'].push(item.id);
		});

		if (filter['ids'].length == 1) {
			$('#submitBtnVol').hide();
			$('#updateBtnVol').show();
			$('#volFormName').html("עריכת מתנדב");
			$("#VolunteerQuestModal").openModal({
				dismissible: true, // Modal can be dismissed by clicking outside of the modal
				opacity: .5, // Opacity of modal background
				in_duration: 300, // Transition in duration
				out_duration: 200, // Transition out duration
				complete: function() { setTimeout(function(){
					window.location.reload();
				}, 200); } // Callback for Modal close
			});

			console.log(filter['ids'][0]);

			$.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?' + filter['ids'][0] + '?}}', function (result) {
				console.log(result);
				$("#VolunteerQuestModal label").attr('class', 'active');
				$("#fName").attr('_id', filter['ids'][0]);
				$("#fName").val(result[0].firstName);
				$("#lName").val(result[0].lastName);
				$("#telephone").val(result[0].phone);
				$("#IDnum").val(result[0].IDnumber);
				$("#City").val(result[0].HomeCity);
				$("#HomeStreet").val(result[0].HomeStreet);
				$("#Zipcode").val(result[0].HomeZipcode);
				$("#Hometelephone").val(result[0].Hometelephone);
				$("#email").val(result[0].emailAdress);
				$("#Birthday").val(result[0].BirthdayDate);
				$("#familyStatus").val(result[0].familyStatus);
				$("#education").val(result[0].educationLevel);
				$("#occupation").val(result[0].workOccupation);
				$("#Job").val(result[0].workJob);
				$("#duty").val(result[0].wrokDuty);
				$("#Hobby").val(result[0].leisureHobby);
				$("#VolunteerExperience").val(result[0].leisureVolunteerExperience);
				$("#VolunteerTropic").val(result[0].leisureVolunteerTropic);
				$("#UniqueTalents").val(result[0].leisureUniqueTalents);
				$("#VolunteerReasons").val(result[0].InterestVolunteerReasons);
				$("#VolunteerExpectations").val(result[0].InterestVolunteerExpectations);
				$("#multiDates").val(result[0].InterestMultiDates);
				$("#multiHours").val(result[0].InterestMultiHours);
				$("#VolunteerLociton").val(result[0].InterestVolunteerLociton);
				$("#VolunteerLocitonOther").val(result[0].InterestVolunteerLocitonOther);
				$("#multiVolTypes").val(result[0].InterestmultiVolTypes);
				$("#multiVolTypesOther").val(result[0].InterestmultiVolTypesOther);
				$("#TimePeriod").val(result[0].InterestTimePeriod);
				$("#multiLanguage").val(result[0].InterestmultiLanguage);
				$("#StudentAcademicInstitution").val(result[0].StudentAcademicInstitution);
				$("#StudentEducationDepartment").val(result[0].StudentEducationDepartment);
				$("#YearDates").val(result[0].StudentYearDates);
				$("#YearDatesOther").val(result[0].StudentYearDatesOther);
				$("#StudentVoluntaryExtra").val(result[0].StudentVoluntaryExtra);
				$("#StudentHomeTwon").val(result[0].StudentHomeTwon);
			});
/**
			$.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?' + filter['ids'][0] + '?}}', function (result) {
				console.log(result);
				$("#feedbackToVol label").attr('class', 'active');
				$("#fName").attr('_id', filter['ids'][0]);
				$("#FB_Personal_Name").val(result[0].firstName);
				$("#FB_Personal_Time").val(result[0].FB_Personal_Time);
				$("#FB_Personal_Job").val(result[0].FB_Personal_Job);
				$("#FB_Personal_FormDate").val(result[0].FB_Personal_FormDate);
				$("#FB_Gols_A").val(result[0].FB_Gols_A);
				$("#FB_Gols_A_R").val(result[0].FB_Gols_A_R);
				$("#FB_Gols_B").val(result[0].FB_Gols_B);
				$("#FB_Gols_B_R").val(result[0].FB_Gols_B_R);
				$("#FB_Gols_C").val(result[0].FB_Gols_C_R);
				$("#FB_Gols_D").val(result[0].FB_Gols_D);
				$("#FB_Gols_D_R").val(result[0].FB_Gols_D_R);
				$("#FB_IndustrialRelations_A").val(result[0].FB_IndustrialRelations_A);
				$("#FB_IndustrialRelations_A_R").val(result[0].FB_IndustrialRelations_A_R);
				$("#FB_IndustrialRelations_B").val(result[0].FB_IndustrialRelations_B);
				$("#FB_IndustrialRelations_B_R").val(result[0].FB_IndustrialRelations_B_R);
				$("#FB_IndustrialRelations_C").val(result[0].FB_IndustrialRelations_C);
				$("#FB_IndustrialRelations_C_R").val(result[0].FB_IndustrialRelations_C_R);
				$("#FB_IndustrialRelations_D").val(result[0].FB_IndustrialRelations_D);
				$("#FB_IndustrialRelations_D_R").val(result[0].FB_IndustrialRelations_D_R);
				$("#FB_IndustrialRelations_E").val(result[0].FB_IndustrialRelations_E);
				$("#FB_IndustrialRelations_E_R").val(result[0].FB_IndustrialRelations_E_R);
				$("#FB_ProgressIndicators_A").val(result[0].FB_ProgressIndicators_A);
				$("#FB_ProgressIndicators_A_R").val(result[0].FB_ProgressIndicators_A_R);
				$("#FB_ProgressIndicators_B").val(result[0].FB_ProgressIndicators_B);
				$("#FB_ProgressIndicators_B_R").val(result[0].FB_ProgressIndicators_B_R);
				$("#FB_ProgressIndicators_C").val(result[0].FB_ProgressIndicators_C);
				$("#FB_ProgressIndicators_C_R").val(result[0].FB_ProgressIndicators_C_R);
				$("#FB_ProgressIndicators_D").val(result[0].FB_ProgressIndicators_D);
				$("#FB_ProgressIndicators_D_R").val(result[0].FB_ProgressIndicators_D_R);
				$("#FB_ProgressIndicators_E").val(result[0].FB_ProgressIndicators_E);
				$("#FB_ProgressIndicators_E_R").val(result[0].FB_ProgressIndicators_E_R);
				$("#FB_ProgressIndicators_F").val(result[0].FB_ProgressIndicators_F);
				$("#FB_ProgressIndicators_F_R").val(result[0].FB_ProgressIndicators_F_R);
				$("#FB_ProgressIndicators_G").val(result[0].FB_ProgressIndicators_G);
				$("#FB_ProgressIndicators_G_R").val(result[0].FB_ProgressIndicators_G_R);
				$("#FB_ManagerComments").val(result[0].FB_ManagerComments);
				$("#FB_VolComments").val(result[0].FB_VolComments);
				$("#FB_GreatAchievement").val(result[0].FB_GreatAchievement);
				$("#FB_PointsForImprovement").val(result[0].FB_PointsForImprovement);
				$("#FB_FuturePlans").val(result[0].FB_FuturePlans);
				$("#FB_AchievableTarget_A").val(result[0].FB_AchievableTarget_A);
				$("#FB_AchievableTarget_B").val(result[0].FB_AchievableTarget_B);
				$("#FB_AchievableTarget_C").val(result[0].FB_AchievableTarget_C);
				$("#FB_ActionAchievingTarget_A").val(result[0].FB_ActionAchievingTarget_A);
				$("#FB_ActionAchievingTarget_B").val(result[0].FB_ActionAchievingTarget_B);
				$("#FB_ActionAchievingTarget_C").val(result[0].FB_ActionAchievingTarget_C);
				$("#FB_ActionAchievingTarget_D").val(result[0].FB_ActionAchievingTarget_D);
				$("#FB_ActionAchievingTarget_E").val(result[0].FB_ActionAchievingTarget_E);
			});
 **/
		}

		else {
			var $toastContent = $('<span>יש לסמן מתנדב אחד בדיוק</span>');
			Materialize.toast($toastContent, 3000);
			return;
		}

		$("#updateBtnVol").click(function () {
			$("#VolunteerQuestModal").closeModal();
			$("#VolunteerQuestModal label").removeAttr('class');
			$('#submitBtnVol').show();
			$('#updateBtnVol').hide();
			$('#volFormName').html("הרשמה להתנדבות");

			var newVol = getVolunteerObject();
			//console.log(oldVol);
			console.log(newVol);

			$.post('/UpdateRecord?{?collection?:?volunteers?,?filter?:{?_id?:?' + $("#fName").attr("_id") + '?}}', newVol);
			var $toastContent = $('<span>רשומה נערכה בהצלחה</span>');
			Materialize.toast($toastContent, 3000);

			$("#VolunteerQuestModal input").val("");

			setTimeout(function () {
				window.location.reload();
			}, 1000);
		});
	});



	$("#findMatch").click(function(){
		var selected = GetCheckedAvatars();

		if(selected.length != 1){
			var $toastContent = $('<span>יש לסמן מתנדב אחד בדיוק</span>');
			Materialize.toast($toastContent, 3000);
			return;
		}

		else{
			$.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?' + selected[0] + '?}}', function (result) {
				g_volunteer = jQuery.extend(true, {}, result[0]);
			});
			$("#Tinder").empty();

			$.getJSON("/GetRecord?{?collection?:?organizations?,?filter?:{}}", function (result) {
				console.log(result);
				var sortedArray = getSortedArray(result);


				for (var i = 0; i < sortedArray.length; i++) {
					$("#Tinder").append('<li class="collection-item avatar MatchingOrgs" id="li' + sortedArray[i].Organization._id + '">');
					$("#li" + sortedArray[i].Organization._id).append('<i class="material-icons circle red">description</i>');
					$("#li" + sortedArray[i].Organization._id).append('<span class="title" > ' + sortedArray[i].Organization.organizationName + '</span>');
					$("#li" + sortedArray[i].Organization._id).append('<p>' + sortedArray[i].Organization.contactName + '<br>' + sortedArray[i].Organization.contactPhone);
					$("#li" + sortedArray[i].Organization._id).append('<p class="secondary-content" id="p' + sortedArray[i].Organization._id + '">');
					sortedArray[i].Days.forEach(function(item, index){
						$("#p" + sortedArray[i].Organization._id).append('<div class="chip red" id="daysChip'+ index + sortedArray[i].Organization._id + '">יום: '+item+'</div>');
					});
					sortedArray[i].Hours.forEach(function(item, index){
						$("#p" + sortedArray[i].Organization._id).append('<div class="chip green" id="houresChip'+ index + sortedArray[i].Organization._id + '">שעות: '+item+'</div>');
					});
					sortedArray[i].VolPeriod.forEach(function(item, index){
						$("#p" + sortedArray[i].Organization._id).append('<div class="chip blue" id="volPeriodChip'+ index + sortedArray[i].Organization._id + '">תקופה: '+item+'</div>');
					});
					$("#p" + sortedArray[i].Organization._id).append('</br>');
					sortedArray[i].VolType.forEach(function(item, index){
						$("#p" + sortedArray[i].Organization._id).append('<div class="chip yellow" id="volTypeChip'+ index + sortedArray[i].Organization._id + '">סוג:  '+item+'</div>');
					});


				}
				$(".MatchingOrgs").click(function(){
					$(".MatchingOrgs").removeClass("active");
					$(this).addClass("active");
				});
			});



			$("#MatchBtn").click(function(){
				var selectedOrganization = $(".active.MatchingOrgs").attr("id");
				console.log("------Selected organization:")
				console.log(selectedOrganization);
				if(selectedOrganization == undefined || selectedOrganization.length == 0){
					var $toastContent = $('<span>יש לבחור ארגון להתאמה</span>');
					Materialize.toast($toastContent, 3000);
					return;
				}
				var myRegexp = /li(.*)/g;
				var match = myRegexp.exec(selectedOrganization);
				var selectedOrgId = match[1];

				$.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+selected[0]+'?}}',function(result) {
					var objId = result[0]._id;
					delete result[0]._id;
					console.log("-------Setting ["+result[0].firstName+"] from: ["+result[0].Organization+"]");
					result[0].Organization = selectedOrgId;
					console.log("-------To: ["+result[0].Organization+"]");
					console.log("-------Posting:");
					console.log(result[0]);
					$.post('/UpdateRecord?{?collection?:?volunteers?,?filter?:{?_id?:?'+objId+'?}}', result[0]);

					$("#MatchingModal").closeModal();

					var $toastContent = $('<span>רשומה עודכנה</span>');
					Materialize.toast($toastContent, 3000);

					setTimeout(function(){
						window.location.reload();
					}, 1000);
				});
			});
		}


		$("#MatchingModal").openModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			complete: function() { setTimeout(function(){
				window.location.reload();
			}, 200); } // Callback for Modal close
		});
	});

	$('.modal-trigger').leanModal();
}

	  function getSortedArray(result){

		  var matches = new Array(result.length);
		  console.log("VOLUNTEER IS:");
		  console.log(g_volunteer);
		  for(var i = 0; i < result.length; i++)
		  {
			  matches[i]= {
				  OrgId: result[i]._id,
				  Days: [],
				  Hours: [],
				  VolType: [],
				  VolPeriod: [],
				  NumOfMatches: 0,
				  Organization: new Object()
			  };
			  result[i] = toArrays(result[i]);
			  result[i]["orgMultiHours[]"].forEach(function(item,index){
				  if(g_volunteer["InterestMultiHours[]"].includes(item)){
					  matches[i].Hours.push(item);
				  }
			  });
			  result[i]["orgMultiDates[]"].forEach(function(item,index){
				  if(g_volunteer["InterestMultiDates[]"].includes(item)){
					  matches[i].Days.push(item);
				  }
			  });
			  result[i]["orgMultiVolTypes[]"].forEach(function(item,index){
				  if(g_volunteer["InterestmultiVolTypes[]"].includes(item)){
					  matches[i].VolType.push(item);
				  }
			  });
			  if(result[i].orgTimePeriod == g_volunteer.InterestTimePeriod){
					  matches[i].VolPeriod.push(g_volunteer.InterestTimePeriod);
			  }
			  matches[i].NumOfMatches = matches[i].Days.length + matches[i].Hours.length + matches[i].VolType.length + matches[i].VolPeriod.length;
			  matches[i].Organization = result[i];
		  }

		  console.log("MATCHES ARRAY:");
		  console.log(matches);

		  var sorted = matches.sort(function(a, b) {
			  return parseFloat(b.NumOfMatches) - parseFloat(a.NumOfMatches);
		  });

		  console.log("SORTED ARRAY:");
		  console.log(sorted);

		  return sorted;
	  }

	  function toArrays(result){
		  console.log("PARSING RESULT TO ARRAYS:");
		  console.log(result);
		  if(!Array.isArray(result["InterestMultiDates[]"])){
			  result["InterestMultiDates[]"] = new Array(result["InterestMultiDates[]"]);
		  }
		  if(!Array.isArray(result["orgMultiHours[]"])){
			  result["orgMultiHours[]"] = new Array(result["orgMultiHours[]"]);
		  }
		  if(!Array.isArray(result["orgMultiVolTypes[]"])){
			  result["orgMultiVolTypes[]"] = new Array(result["orgMultiVolTypes[]"]);
		  }

		  console.log("PARSED:");
		  console.log(result);
		  return result;
	  }

function GetCheckedAvatars()
{
	var n = $("input:checked");
	var selectedIds = [];
	Array.from(n).forEach(function(item, index){
		selectedIds.push(item.id);
	});

	return selectedIds;
}

function insertVolunteersAvatars(records)
{
	g_array = [];
	var relatedOrganization = "אינו משוייך לארגון";
  for(var i=0; i<records.length; i++)
  {


      $("#volAvatar").append('<li class="collection-item avatar" id="li'+records[i]._id +'">');
      $("#li" +records[i]._id).append('<i class="material-icons circle light-blue">perm_identity</i>');
      $("#li" +records[i]._id).append('<span class="title" > ' + records[i].firstName + " " + records[i].lastName + '</span>');
      $("#li" +records[i]._id).append('<p id="contentP' +records[i]._id+'">');
	  $("#contentP" +records[i]._id).append('<div class="row" id="row'+ records[i]._id + '" style="margin-bottom: 0px">');
	  $("#row" +records[i]._id).append('<div class="col s8" id="contentPfirst' +records[i]._id+'"><b>'+ relatedOrganization + '</b></div>');
	  //$("#contentP" +records[i]._id).append('</br>');
	  $("#row" +records[i]._id).append('<div class="col s8" id="contentPsecond' +records[i]._id+'">'+  "טלפון - " + records[i].phone + '</div>');

      $("#row" +records[i]._id).append('<img class="avatarImage left tooltipped" id="fourtyHoursImage'+ records[i]._id + '" data-position="top" data-delay="50" data-tooltip="המתנדב השלים 40 שעות" src="Docs/WebAppDocs/Pics/fouryHours.png"/>');
      $("#row" +records[i]._id).append('<img class="avatarImage left tooltipped" id="finishedImage'+ records[i]._id +'" data-position="top" data-delay="50" data-tooltip="המתנדב התחיל להתנדב" src="Docs/WebAppDocs/Pics/finished.png"/>');

      $("#li" +records[i]._id).append('<p class="secondary-content" id="p' +records[i]._id+'">');
      $("#p" +records[i]._id).append('<input type="checkbox" id="' +records[i]._id+ '"/><label for="' +records[i]._id+ '"></label>');

	  records[i].FourtyHours == "false" ? $('#fourtyHoursImage' + records[i]._id).hide() : $('#fourtyHoursImage' + records[i]._id).show();
	  records[i].StartedVolunteering == "false" ? $('#finishedImage' + records[i]._id).hide() : $('#finishedImage' + records[i]._id).show();

	  if(records[i].Organization != "") {
		  $.getJSON('/GetRecord?{?collection?:?organizations?,?filter?:{?_id?:?'+records[i].Organization+'?}}', function (id,result) {

			  $("#contentPfirst" + id).text("מתנדב בארגון - " + result[0].organizationName);
		  }.bind(null,records[i]._id));
	  }
  }
}


function loadAdminPage(){

	//Change page layout
    $("#links").empty();
    $("#links").append('<li>ברוך הבא מנהל</li>');
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
	$("#Register").append('<div id="dataZoneScroll">');

	loadVolunteersView();

    $("#volChooser").click(function(){

        $("#dataZoneScroll").empty();
		loadVolunteersView();
    });

    $("#orgChooser").click(function() {
		$("#dataZoneScroll").empty();
		loadOrganizationsView();
	});

    $("#work").remove();

    function loadVolunteersView(){
		insertButtons("Volunteer", "מתנדב", "AdminPage");

		$("#dataZoneScroll").append('<ul class="collection" id="volAvatar" dir="rtl">');
		var volunteers = [];
		$.getJSON("/GetRecord?{?collection?:?volunteers?,?filter?:{}}",function(result) {
			insertVolunteersAvatars(result);
		});
	}

	function loadOrganizationsView(){
		insertButtons("Organization", "ארגון", "AdminPage");

		$("#dataZoneScroll").append('<ul class="collection" id="orgAvatar" dir="rtl">');
		$.getJSON("/GetRecord?{?collection?:?organizations?,?filter?:{}}", function (result) {
			console.log(result);

			for (var i = 0; i < result.length; i++) {
				$("#orgAvatar").append('<li class="collection-item avatar" id="li' + result[i]._id + '">');
				$("#li" + result[i]._id).append('<i class="material-icons circle red">description</i>');
				$("#li" + result[i]._id).append('<span class="title" > ' + result[i].organizationName + '</span>');
				$("#li" + result[i]._id).append('<p>' + result[i].contactName + '<br>' + result[i].contactPhone);
				$("#li" + result[i]._id).append('<p class="secondary-content" id="p' + result[i]._id + '">');
				$("#p" + result[i]._id).append('<input type="checkbox" id="' + result[i]._id + '"/><label for="' + result[i]._id + '"></label>');

			}

		});
	}

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


	$('.tooltipped').tooltip({delay: 50});
}

function loadOrganizationPage(){

	//Change page layout
    $("#links").empty();
    $("#links").append('<li> ברוך הבא ' + g_user.organizationName + '</li>');
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
    $("#ulTabs").append('<li class="tab col s6" ><a class="active" id="volChooser">מתנדבים בארגון</a></li>');
    $('ul.tabs').tabs();

    $("#intro").wrap('<center>');
	$("#Register").append('<div id="dataZoneScroll">');

    insertButtons("Volunteer", "מתנדב", "OrganizationPage");

    $("#dataZoneScroll").append('<ul class="collection" id="volAvatar" dir="rtl">');
    var volunteers = [];
    $.getJSON('/GetRecord?{?collection?:?volunteers?,?filter?:{?Organization?:?'+g_user._id+'?}}',function(result) {
        console.log(result);
        //TODO: implement Volunteers list
        insertVolunteersAvatars(result);
    });

    $("#work").remove();

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


	$('.tooltipped').tooltip({delay: 50});
}


$("#loginBtn").click(function(event){

        var user = $("#username").val();
        var pass = $("#password").val();

        loadPageByUser(user, pass);
});

	  //TODO: get users from DB
	function loadPageByUser(user, pass){
		//var userType = getUser(user, pass);




			$.getJSON('/GetRecord?{?collection?:?Admin?,?filter?:{?username?:?'+user+'?,?password?:?'+pass+'?}}',function(result) {
				//Not Admin
				if(result.length == 0) {
					$.getJSON('/GetRecord?{?collection?:?organizations?,?filter?:{?orgUserName?:?'+user+'?,?orgPassword?:?'+pass+'?}}',function(result) {

						g_user = result.length == 0? null : result[0];

						if(g_user != null) //Organization
						{
							$("#modalLogin").closeModal();
							loadOrganizationPage();
						}
						else //error
						{
							//TODO: exit function in the last else (on error)
							//$("#modal1").closeModal();
							//sleep(1);
							//$("#modal1").openModal();
						}
					});
				}
				else{
					$("#modalLogin").closeModal();
					loadAdminPage();
				}
			});
			setCookie(user,pass);
	}


	// [].forEach.call(card, function(card) {
	// 	card.addEventListener('click', scaleCard, false);
	// });

	}); // end of document ready
})(jQuery); // end of jQuery name space