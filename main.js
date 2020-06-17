var searchValue = null;

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=381&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
  async: true,
  dataType: "json",
  success: showEvents,
  error: function (xhr, status, err) {
  }
});

function searchInput() {
  searchValue = document.getElementById('selectBar').value;
  return searchValue;
}

function returnSearch() {
  searchValue = document.getElementById('selectBar').value;
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchValue + "&dmaId=381&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
    async: true,
    dataType: "json",
    success: function (json) {
      updateSearch(json);
    },
    error: function (xhr, status, err) {
    }
  });
}

function updateSearch(json) {
  var cardDeck = document.querySelector('.carousel-inner');
  cardDeck.innerHTML = "";
  var latlng = { lat: 33.6846, lng: -117.8265 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: latlng
  });

  function getFormattedTime(hour, minutes) {
    var hours = ((hour + 11) % 12) + 1;
    var amPm = hours > 11 ? 'pm' : 'am';
    var functionMinutes = minutes;
    return hours + ':' + functionMinutes + " " + amPm;
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
    image.src = json._embedded.events[i].images[0].url;
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column');
    var cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title');
    cardHeader.textContent = json._embedded.events[i].name;
    var dateAndTime = document.createElement('p');
    dateAndTime.classList.add('card-text');
    var eventTime = json._embedded.events[i].dates.start.localTime;
    var eventTime1 = eventTime.slice(0,2);
    var eventTime2 = eventTime.slice(3, 5);
    var timeHour = parseInt(eventTime1);
    var year = json._embedded.events[i].dates.start.localDate.slice(0,4);
    var monthAndDate = json._embedded.events[i].dates.start.localDate.slice(5);
    var formattedYear = monthAndDate + '-' + year;
    dateAndTime.textContent = formattedYear + " " + (getFormattedTime(timeHour, eventTime2));
    var eventInfo = document.createElement('a');
    eventInfo.classList.add('card-text');
    eventInfo.textContent = 'Event Info';
    eventInfo.setAttribute("href", json._embedded.events[i].url)
    card.append(image);
    cardBody.append(cardHeader);
    cardBody.append(dateAndTime);
    cardBody.append(eventInfo);
    card.append(cardBody);
    carouselItem.append(card)
    cardDeck.append(carouselItem);
    var latitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.latitude);
    var longitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.longitude);
    var latlng2 = { lat: latitude, lng: longitude };
    var marker = new google.maps.Marker({
      position: latlng2,
      title: "Hello World!"
    });
    marker.setMap(map);
    map.setCenter(latlng2);
  }
  $(document).ready(function () {
    $(".carousel-item:first-child").addClass("active");
  });
}

function showEvents(json) {
  var markers =[];
  var infoArray = [];
  var latlng = { lat: 32.7549, lng: -117.1104 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: latlng
  });

  console.log(json);

  function initMap() {
    // var latlng = { lat: 33.6846, lng: -117.8265 };
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 10,
    //   center: latlng
    // });
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 4,
    //   center: uluru
    // });
    var contentString = "<div>" + "<p>" + json._embedded.events[i].name + "</p>" + "</div>"

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    infoArray.push(infoWindow);

    var latitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.latitude);
    var longitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.longitude);
    var latLng2 = { lat: latitude, lng: longitude };

    var marker = new google.maps.Marker({
      position: latLng2,
      map: map,
      title: json._embedded.events[i].name
    });

    markers.push(marker);
    marker.setMap(map);
    // infoWindow.open(map, marker);
    marker.addListener('click', function () {

      // if(marker.setVisible(false)){
      //   marker.setVisbile(true)
      // }
      // infoArray[i].content = "<div>"+"<p>"+ json._embedded.events[i].name+"</p>"+"</div>";
      // infoArray[i].close();
      // infoArray[i].open(map, marker)
      // marker.setVisible(false);
      // infoWindow.close();
      infoWindow.open(map, marker);
      marker.setVisible(false);
      // if (marker.setVisible(false)) {
      //   marker.setVisbile(true)
      // }
        //  infoWindow.close();
    });
    // console.log(markers);
    // console.log(infoArray);
  }

  function getFormattedTime(hour, minutes) {
    var hours = ((hour + 11) % 12) + 1;
    var amPm = hours > 11 ? 'pm' : 'am';
    var functionMinutes = minutes;
    return hours + ':' + functionMinutes + " " + amPm;
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
    image.src = json._embedded.events[i].images[0].url;
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column');
    var cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title');
    cardHeader.classList.add('text-center');
    cardHeader.textContent = json._embedded.events[i].name;
    var dateAndTime = document.createElement('p');
    dateAndTime.classList.add('card-text');

    var eventInfo = document.createElement('a');
    eventInfo.classList.add('card-text');
    eventInfo.textContent = 'Event Info';
    eventInfo.setAttribute("href", json._embedded.events[i].url)

    var eventTime = json._embedded.events[i].dates.start.localTime;
    var eventTime1 = eventTime.slice(0, 2);
    var eventTime2 = eventTime.slice(3, 5);
    var timeHour = parseInt(eventTime1);
    var year = json._embedded.events[i].dates.start.localDate.slice(0, 4);
    var monthAndDate = json._embedded.events[i].dates.start.localDate.slice(5);
    var formattedYear = monthAndDate + '-' + year;
    dateAndTime.textContent = formattedYear + " " + (getFormattedTime(timeHour, eventTime2));
    card.append(image);
    cardBody.append(cardHeader);
    cardBody.append(dateAndTime);
    cardBody.append(eventInfo);
    card.append(cardBody);
    carouselItem.append(card)
    cardDeck.append(carouselItem);
    initMap();
  }

}
