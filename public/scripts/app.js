console.log('app.js is loaded!');
var myTags = [];
var availableTags = [
  "ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran",
  "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Picnic", "Beer", "Party", "Lecture", "Education",
  "Meetup", "Formal", "MEAN","React","JS", "Full stack", "Interview","Algorithms","Front-end","Back-end", "Database",
  "Web design","Graphic design","Design","LinkedIn","Resume","Computer science","Ruby", "Open bar", "La Croix","Rails",
  "MongoDB","Networking","Mongoose","Job fair","Coding","General Assembly","Whiteboard","Hangout","Social","Brand","WDI 36",
  "Web development","C+","Handlebars","SASS","Beginners","Intermediate","Advanced","Python","Ruby","Scala","Scheme",
  "Hack Reactor", "ES6","Node.js", "Express", "Knitting", "Skydiving", "dogs", "cats", "Other", "Veterans", "Github",
  "Hackathon", "Dating", "iOS Development", "UX", "UI", "Photoshop", "Adobe", "SQL"
];
var $searchForm;

$(document).ready(function() {
  console.log('dom is loaded!');
  $searchForm = $('#eventSearchForm');

    loadAllEvents();

    $('#createEvent').on('click', handleNewEventSubmit);

    $('.mainHeader').on('click', loadAllEvents);

    $('#eventSearchButton').on('click', function handleSearchSubmit(e) {
      e.preventDefault();
      if ($searchForm.val() === ''){
        $searchForm.focus();
        return;
      }
      ajaxKeywordSearch();
      $searchForm.val('');
    });


    $('#datepicker').datepicker({
      format: "mm/dd/yyyy",
      multidate: false
    });

    $(function autoSearch() {
       $("#tags").autocomplete({
         minLength: 1,
         source: availableTags,
         select: function(event, ui) {
           var selection = ui.item.value;
            $('#tagsHere').append(selection + " ");
            myTags.push(selection);
            $(this).val(''); return false;
          }//closes select function
       });//closes autocomplete function
    }); //closes search function

    $("#eventSearchForm").autocomplete({
      minLength: 1,
      source: availableTags,
      select: function(event, ui) {
        var selection = ui.item.value;
        console.log(selection);
        //  myTags.push(selection);
        //  $(this).val(''); return false;
       }//closes select function
    });//closes autocomplete function

    // var $infoModal = $('#moreEventInfoModal');
    // var $heart = $infoModal.find('heart');

    // $heart.on("click", function() {
    //   console.log('you pressed heart'); <--heart like
    // })


$('body').on("click",'.heart',function()
{
var A=$(this).attr("id");
var B=A.split("like"); //splitting like1 to 1
var messageID=B[1];
$(this).css("background-position","")
var D=$(this).attr("rel");

$.ajax({
type: "POST",
url: "message_like_ajax.php",
data: dataString,
cache: false,
success: function(data)
{
$("#likeCount"+messageID).html(data);
if(D === 'like')
{
$(this).addClass("heartAnimation").attr("rel","unlike"); //applying animation class
}
else
{
$(this).removeClass("heartAnimation").attr("rel","like");
$(this).css("background-position","left");
}
}}); //ajax end

});//heart click end

});


    initMap();

// }); //closes DOM ready function

function initMap() {
  var myLatLng = {lat: 37.7749295, lng: -122.4194155};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'San Francisco, CA.'
  });//closes marker function
}//closes initMap function



function loadAllEvents() {
  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: renderMultipleEvents,
    error: handleCreateError
  }); //closes ajax get request
}

function renderMultipleEvents(events) {
  events.forEach(function(event) {
    renderEvent(event);
  }); //closes foreach
}//closes rendermult.

function renderEvent(event) {
  var eventHtml = (`
    <div class="panel panel-default">
      <div class="panel-body">
      <!-- begin event internal row -->
        <div class='row'>
          <div class="col-lg- col-md-3 col-xs-12 thumbnail event-art">
            <img src="${event.imageUrl}" class="responsive-img myImage" alt="event image">
           </div>
          <div class="col-md-9 col-xs-12">
            <ul>
              <li>
                <h4 class='inline-header'>${event.eventName}</h4>
              </li>
              <li>
              <span class='eventLocation'>${event.location}</span>
                <span class='eventTime pull-right'>&#160;${event.time}</span>
                <span class='eventDate pull-right'>${event.date}</span>
              </li>
              <li>
                <span class='eventDescription'>${event.description}</span>
              </li>
            </ul>
            <div class="col-xs-6">
              <span class='event-date'><div class="feed" id="feed1">
                      Like
                      <div class="heart" id="like1" rel="like"> </div>
                      <div class="likeCount" id="likeCount1">${event.peopleInterested}</div></span>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-xs btn-info pull-right" id="moreEventInfo" data-toggle="modal" data-target="#moreEventInfoModal">
                Details
              </button>
              <!-- Modal -->
              <div class="modal fade" id="moreEventInfoModal" tabindex="-1" role="dialog" aria-labelledby="moreEventInfoModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <form class="form-horizontal">
                      <div class="row event">
                        <div class="col-md-10 col-md-offset-1">
                          <!-- begin event internal row -->
                          <div class="col-lg- col-md-3 col-xs-12 thumbnail event-art">
                            <img src="${event.imageUrl}" class="responsive-img" alt="event image">
                          </div>
                          <div class="col-md-9 col-xs-12">
                            <ul class="list-group">
                              <h4 class='inline-header'>${event.eventName}</h4>
                              <span class='eventLocation'>${event.location}</span>
                              <span class='eventTime pull-right'>&#160;${event.time}</span>
                              <span class='eventDate pull-right'>${event.date}</span>
                              <span class='eventDescription'>${event.description}</span>
                              <span class='event-date'>${event.peopleInterested} people interested</span>
                              <h4 class="inline-header">Keywords:</h4>
                              <span class='event-keywords'>${event.keywords}</span>
                            </ul>
                    <div class="form-group modal-footer">
                     <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of event internal row -->
  </div>
    </div>
    </div>
  <!-- end one event -->
  `);
  $('.eventContainer').prepend(eventHtml);
}

function renderSearchResults(successJson) {
  console.log('IN RENDER SEARCH RESULTS', successJson.length);
  $('.eventContainer').empty();
  if (successJson.length === 0) {
    noSearchResults();
  } else {
    renderMultipleEvents(successJson);
  } //closes else statement
} //closes renderSearchResults function

function ajaxKeywordSearch() {
  console.log('IN AJAX SEARCH FUNCTION');
  var keywordSearchData = $searchForm.serialize();
  var endpoint = '/api/keywordSearch';
  $.ajax({
    method: 'GET',
    url: endpoint,
    data: keywordSearchData,
    dataType: 'json',
    success: renderSearchResults,
    error: handleEventSearchError
  }); //closes ajax function
}

function handleNewEventSubmit(e) {
  e.preventDefault();
  var $newEventModal = $('#newEventModal');
  var $name = $newEventModal.find('#name');
  var $eventLocation = $newEventModal.find('#eventLocation');
  var $eventDate = $newEventModal.find('#eventDate');
  var $email = $newEventModal.find('#posterEmail');
  var $links = $newEventModal.find('#externalResource');
  var $imageUrl = $newEventModal.find('#imageUrl');
  var $desc = $newEventModal.find('#eventDescription');
  var $eventTime= $newEventModal.find('#eventTime');
  var $tags= myTags;
  console.log("tags are ", myTags);
  // get data from modal fields
  var dataToPost = {
    eventName: $name.val(),
    location: $eventLocation.val(),
    date: $eventDate.val(),
    time: $eventTime.val(),
    posterEmail: $email.val(),
    externalResource: $links.val(),
    description: $desc.val(),
    imageUrl: $imageUrl.val(),
    keywords: myTags,
  };

  console.log('retrieved new event!', dataToPost);

    $.post('/api/events', dataToPost, function(data) {
      console.log('received data from post to /events:', dataToPost);
      //clear the form!
      $name.val('');
      $eventLocation.val('');
      $eventDate.val('');
      $eventTime.val('');
      $email.val('');
      $links.val('');
      $desc.val('');
      $imageUrl.val('');
      myTags = [];
      $('#tagsHere').empty();
      // close modal
      $newEventModal.modal('hide');
      renderEvent(data);
    }); //closes post request
} //closes function

function handleCreateError(err) {
  var createErrorHtml = (`
    <div class="col-lg-12 text-center">
      <h2>WOOPSY DAISY!</h2>
      <h4>There was a problem creating your new event.</h4>
      <p>We will try again in 3 seconds</p>
    </div>
  `);
  $('.eventContainer').prepend(createErrorHtml);
  var timer = setTimeout(function() {
    $('.eventContainer').empty();
    window.location.reload() }, 3000);
}

function handleEventSearchError(err) {
  var searchErrorHtml = (`
    <div class="col-lg-12 text-center">
      <h2>UH OH SPAGHETTIOS!</h2>
      <h4>There was a problem conducting your search.</h4>
      <p>You will be redirected home in 3 seconds</p>
    </div>
  `);
  $('.eventContainer').prepend(searchErrorHtml);
  var timer = setTimeout(function() {
    $('.eventContainer').empty();
    loadAllEvents() }, 3000);
}

function noSearchResults() {
  var noResultsHtml = (`
    <div class="col-lg-12 text-center">
      <h2>SNAP CRACKLE POP!</h2>
      <h4>No search results match</h4>
      <p>You will be redirected in 3 seconds</p>
    </div>
  `);
  $('.eventContainer').prepend(noResultsHtml);
  var timer = setTimeout(function() {
    $('.eventContainer').empty();
    loadAllEvents() }, 3000);
}//closes noSearchResults function
