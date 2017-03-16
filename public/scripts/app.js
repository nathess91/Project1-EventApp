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

    $.ajax({
        method: 'GET',
        url: '/api/events',
        success: renderMultipleEvents,
        error: handleError
    }); //closes ajax get request

    $('#createEvent').on('click', handleNewEventSubmit);

    $('#eventSearchButton').on('click', function handleSearchSubmit(e) {
        e.preventDefault();
        // if (query === "") {
        //   alert('Please make a keyword selection!');
        //   return;
        // }
        ajaxKeywordSearch();

        // $loading.show(); // show loading gif

        // $.ajax({
        //   type: 'GET',
        //   url: '/api/keywordSearch?q=' + query,
        //   // data: {
        //   //   type: 'q',
        //   //   keyword: query
        //   // },
        //   success: handleEventSearch,
        //   error: handleEventSearchError
        // });//closes ajax search request

        // $searchForm.val(''); // clear the form fields
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




    initMap();

}); //closes DOM ready function

// Google Maps Start
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -33.8688,
        lng: 151.2195
      },
      zoom: 13
    });
  }

  //
  // $(document).ready(function()
  // {

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
}}}); //ajax end

});//heart click end

function renderMultipleEvents(events) {
  events.forEach(function(event) {
    renderEvent(event);
  }); //closes foreach
}//closes rendermult.
function renderEvent(event) {
  var keyWordArray = event.keywords;
  keyWordArray = keyWordArray.map( function ripActualKeywordsOut(keyWord){
    return keyWord.name;
  });
  event.keywords = keyWordArray.join(', ');
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
                  <span class='event-date'>${event.peopleInterested} people interested</span>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-xs btn-info pull-right" id="moreEventInfo" data-toggle="modal" data-target="#moreEventInfoModal">
                    Learn more
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
                                      <img src="http://wp.streetwise.co/wp-content/blogs.dir/2/files/2015/12/Ladies_Learning_Code_event_November_26_2011-630x420.jpg" class="responsive-img" alt="event image">
                                    </div>
                                    <div class="col-md-9 col-xs-12">
                                      <ul class="list-group">

                                          <h4 class='inline-header'>${event.eventName}</h4>


                                          <span class='eventLocation'>${event.location}</span>
                                          <span class='eventTime pull-right'>&#160;${event.time}</span>
                                          <span class='eventDate pull-right'>${event.date}</span>


                                          <span class='eventDescription'>Hello students! Our next event will be held at 1-5PM. Chime in on this issue to join us as a mentor or student for this event!</span>


                                          <span class='event-date'>19 people interested</span>


                                          <h4 class="inline-header">Keywords:</h4>
                                          <span class='event-keywords'>${event.keywords}</span>
                                      </ul>



                                      <div class="form-group modal-footer">

                                    <div class="feed" id="feed1">
                                      Like if interested
                                      <div class="heart " id="like1" rel="like"></div>
                                      <div class="likeCount" id="likeCount1">0</div>


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
} //closes renderEvent function


function ajaxKeywordSearch() {
  console.log('IN AJAX SEARCH FUNCTION');
  var keywordSearchData = $searchForm.serialize();
  var endpoint = '/api/keywordSearch';
  $.ajax({
    method: 'GET',
    url: endpoint,
    data: keywordSearchData,
    dataType: 'json',
    success: handleEventSearch,
    error: handleEventSearchError
  }); //closes ajax function
}


function handleEventSearch(successJson) {
  console.log('BLARG ', successJson);
  // successJson.data.forEach(function (gif) {
  //   var url = gif.images.fixed_height.url;
  //   $(".gif-gallery").append($('<img src='+ url +' />'));
  // }); //closes forEach function
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
      // close modal
      $newEventModal.modal('hide');
      renderEvent(data);
    }); //closes post request
} //closes function

function handleError(err) {
  console.log('error loading events!: ', err);
  $('.eventContainer').append('Sorry, there was a problem loading events.');
}

function handleEventSearchError(err) {
  console.log('error searching for an event: ', err);
}
