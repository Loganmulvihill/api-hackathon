
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=381&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
  async: true,
  dataType: "json",
  success: function (json) {
    if (json) {
      showEvents(json);
    }
  },
  error: function (xhr, status, err) {
  }
});

function searchInput() {
  searchValue = document.getElementById('selectBar').value;
  return searchValue;
}

function returnSearch() {

var headerButton = document.querySelector('.header-button');
headerButton.disabled = true;


  searchValue = document.getElementById('selectBar').value;
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchValue + "&dmaId=381&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
    async: true,
    dataType: "json",
    success: function (json) {
      updateSearch(json);
    },
    error: console.log("this worked")
  });
}

function updateSearch(json) {

    var cardDeck = document.querySelector('.carousel-inner');
    cardDeck.innerHTML = "";
    var latlng = { lat: 32.7549, lng: -117.1104 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: latlng
    });

    function initMap() {
      var iw = new google.maps.InfoWindow();
      var oms = new OverlappingMarkerSpiderfier(map, {
        markersWontMove: true,
        markersWontHide: true,
        basicFormatEvents: true,
        keepSpiderfied: true
      });
      for (var i = 0, len = json._embedded.events.length; i < len; i++) {
        (function () {  // make a closure over the marker and marker data
          var latitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.latitude);
          var longitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.longitude);
          var latLng2 = { lat: latitude, lng: longitude, text: json._embedded.events[i].name, venue: json._embedded.events[i]._embedded.venues[0].name };
          var marker = new google.maps.Marker({ position: latLng2 });  // markerData works here as a LatLngLiteral
          google.maps.event.addListener(marker, 'spider_click', function (e) {  // 'spider_click', not plain 'click'
            iw.open(map, marker);
          });
          marker.addListener("mouseover", function () {
            iw.setContent("<div>" + "<h6>" + latLng2.text + "</h6>" + "</div>" + "<br>" +
              "<p>" + latLng2.venue + "</p>");
            iw.open(map, marker);
          });
          marker.addListener("click", function () {
            iw.setContent("<div>" + "<h6>" + latLng2.text + "</h6>" + "</div>" + "<br>" +
              "<p>" + latLng2.venue + "</p>");
            iw.open(map, marker);
          });
          marker.addListener("mouseout", function () {
            iw.close();
          });
          oms.addMarker(marker);  // adds the marker to the spiderfier _and_ the map
        })();
      }
    }

    initMap();

    function getFormattedTime(hour, minutes) {
      var hours = ((hour + 11) % 12) + 1;
      var amPm = hour > 11 ? 'pm' : 'am';
      var functionMinutes = minutes;
      return hours + ':' + functionMinutes + " " + amPm;
    }

    function checkTime() {
      var eventTime = json._embedded.events[i].dates.start.localTime;
      if (eventTime) {
        var eventTime1 = eventTime.slice(0, 2);
        var eventTime2 = eventTime.slice(3, 5);
        var timeHour = parseInt(eventTime1);
        var year = json._embedded.events[i].dates.start.localDate.slice(0, 4);
        var monthAndDate = json._embedded.events[i].dates.start.localDate.slice(5);
        var formattedYear = monthAndDate + '-' + year;
        dateAndTime.textContent = formattedYear + " " + (getFormattedTime(timeHour, eventTime2));
      }
      else if (eventTime1 === undefined) {
        dateAndTime.textContent = "No Time Available"
      }
    }

    for (var i = 0; i < json._embedded.events.length; i++) {
      var cardDeck = document.querySelector('.carousel-inner');
      var carouselItem = document.createElement('div');
      carouselItem.classList.add("carousel-item");
      carouselItem.classList.add("carousel-card");
      var card = document.createElement('div');
      card.classList.add("card")
      var image = document.createElement('img');
      image.classList.add("card-img-top");
      if (json._embedded.events[i].images[0].width >= json._embedded.events[i].images[1].width) {
        image.src = json._embedded.events[i].images[0].url;
      }
      if (json._embedded.events[i].images[1].width >= json._embedded.events[i].images[0].width) {
        image.src = json._embedded.events[i].images[1].url;
      }
      var cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column');
      var cardHeader = document.createElement('h5');
      cardHeader.classList.add('card-title');
      cardHeader.classList.add('text-center');
      cardHeader.classList.add('m-0');
      cardHeader.textContent = json._embedded.events[i].name;
      var venue = document.createElement('p');
      venue.classList.add('m-0');
      venue.classList.add('text-center');
      venue.textContent = json._embedded.events[i]._embedded.venues[0].name;
      var dateAndTime = document.createElement('p');
      dateAndTime.classList.add('card-text');
      dateAndTime.classList.add('m-0');
      var eventInfo = document.createElement('a');
      eventInfo.classList.add('card-text');
      eventInfo.classList.add('text-primary');
      eventInfo.classList.add('m-0');
      eventInfo.textContent = 'Event Info';
      let url = json._embedded.events[i].url;
      eventInfo.onclick = function () {
        window.open(url)
      }
      checkTime();
      card.append(image);
      cardBody.append(cardHeader);
      cardBody.append(venue);
      cardBody.append(dateAndTime);
      cardBody.append(eventInfo);
      card.append(cardBody);
      carouselItem.append(card)
      cardDeck.append(carouselItem);
    }
    $(document).ready(function () {
      $(".carousel-item:first-child").addClass("active");
    });

  var headerButton = document.querySelector('.header-button');
  headerButton.disabled = false;
  var spinner = document.querySelector('.spinner-border');
  spinner.classList.remove('display-none');

}

function showEvents(json) {

  function initMap() {
    if (json) {
      var latlng = { lat: 32.7549, lng: -117.1104 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: latlng
      });
      var iw = new google.maps.InfoWindow();
      var oms = new OverlappingMarkerSpiderfier(map, {
        markersWontMove: true,
        markersWontHide: true,
        basicFormatEvents: true,
        keepSpiderfied: true
      });
      for (var i = 0, len = json._embedded.events.length; i < len; i++) {
        (function () {  // make a closure over the marker and marker data
          var latitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.latitude);
          var longitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.longitude);
          var latLng2 = { lat: latitude, lng: longitude, text: json._embedded.events[i].name, venue: json._embedded.events[i]._embedded.venues[0].name };
          var marker = new google.maps.Marker({ position: latLng2 });  // markerData works here as a LatLngLiteral
          google.maps.event.addListener(marker, 'spider_click', function (e) {  // 'spider_click', not plain 'click'
            iw.open(map, marker);
          });
          marker.addListener("mouseover", function () {
            iw.setContent("<div>" + "<h6>" + latLng2.text + "</h6>" + "</div>" + "<br>" +
              "<p>" + latLng2.venue + "</p>");
            iw.open(map, marker);
          });
          marker.addListener("click", function () {
            iw.setContent("<div>" + "<h6>" + latLng2.text + "</h6>" + "</div>" + "<br>" +
              "<p>" + latLng2.venue + "</p>");
            iw.open(map, marker);
          });
          marker.addListener("mouseout", function () {
            iw.close();
          });
          oms.addMarker(marker);  // adds the marker to the spiderfier _and_ the map
        })();
      }
    } else {
      console.log("no data");
    }
  }
  initMap();
  function getFormattedTime(hour, minutes) {
    var hours = ((hour + 11) % 12) + 1;
    var amPm = hour > 11 ? 'pm' : 'am';
    var functionMinutes = minutes;
    return hours + ':' + functionMinutes + " " + amPm;
  }

  function checkTime() {
    var eventTime = json._embedded.events[i].dates.start.localTime;
    if (eventTime) {
      var eventTime1 = eventTime.slice(0, 2);
      var eventTime2 = eventTime.slice(3, 5);
      var timeHour = parseInt(eventTime1);
      var year = json._embedded.events[i].dates.start.localDate.slice(0, 4);
      var monthAndDate = json._embedded.events[i].dates.start.localDate.slice(5);
      var formattedYear = monthAndDate + '-' + year;
      dateAndTime.textContent = formattedYear + " " + (getFormattedTime(timeHour, eventTime2));
    }
    else if (eventTime1 === undefined) {
      dateAndTime.textContent = "No Time Available"
    }
  }

  for (var i = 0; i < json._embedded.events.length; i++) {
    var cardDeck = document.querySelector('.carousel-inner');
    var carouselItem = document.createElement('div');
    carouselItem.classList.add("carousel-item");
    carouselItem.classList.add("carousel-card");
    var card = document.createElement('div');
    card.classList.add("card")
    var image = document.createElement('img');
    image.classList.add("card-img-top");
    var theaterImage = document.createElement('img');

    if (json._embedded.events[i].images[0].width >= json._embedded.events[i].images[1].width) {
      image.src = json._embedded.events[i].images[0].url;
    }
    if (json._embedded.events[i].images[1].width >= json._embedded.events[i].images[0].width) {
      image.src = json._embedded.events[i].images[1].url;
    }
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column');
    var cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title');
    cardHeader.classList.add('text-center');
    cardHeader.classList.add('m-0');
    cardHeader.textContent = json._embedded.events[i].name;
    var venue = document.createElement('p');
    venue.classList.add('m-0');
    venue.classList.add('text-center');
    venue.textContent = json._embedded.events[i]._embedded.venues[0].name;
    var dateAndTime = document.createElement('p');
    dateAndTime.classList.add('card-text');
    dateAndTime.classList.add('m-0');
    var eventInfo = document.createElement('a');
    eventInfo.classList.add('cursor-pointer');
    eventInfo.classList.add('card-text');
    eventInfo.classList.add('text-primary');
    eventInfo.textContent = 'Event Info';
    let url = json._embedded.events[i].url;
    eventInfo.onclick = function () {
      window.open(url)
    }
    checkTime();
    card.append(image);
    cardBody.append(cardHeader);
    cardBody.append(venue);
    cardBody.append(dateAndTime);
    cardBody.append(eventInfo);
    card.append(cardBody);
    carouselItem.append(card)
    cardDeck.append(carouselItem);
  }

}
