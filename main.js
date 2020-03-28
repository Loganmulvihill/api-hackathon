
var searchValue = null;

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?dmaId=381&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
  async: true,
  dataType: "json",
  success: showEvents,
  error: function (xhr, status, err) {
  }
});


function searchInput() {

  searchValue = document.getElementById('searchBar').value;
  return searchValue;
}

function returnSearch() {
  searchValue = document.getElementById('searchBar').value;
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

  var cardDeck = document.querySelector('.card-columns');
  cardDeck.innerHTML = "";

  var latlng = { lat: 33.6846, lng: -117.8265 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: latlng
  });

  for (var i = 0; i < json.page.size; i++) {

    var cardDeck = document.querySelector('.card-columns');
    var card = document.createElement('div');
    card.classList.add("card, col-4")

    var image = document.createElement('img');
    image.classList.add("card-img-top");
    image.src = json._embedded.events[i].images[0].url;

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title');
    cardHeader.textContent = json._embedded.events[i].name;
    var dateAndTime = document.createElement('p');
    dateAndTime.classList.add('card-text');
    dateAndTime.textContent = json._embedded.events[i].dates.start.localDate + " " + json._embedded.events[i].dates.start.localTime;
    var timeZone = document.createElement('p');
    timeZone.classList.add('card-text');
    timeZone.textContent = "TimeZone: " + json._embedded.events[i].dates.timezone;



    card.append(image);
    cardBody.append(cardHeader);
    cardBody.append(dateAndTime);
    cardBody.append(timeZone);
    card.append(cardBody);
    cardDeck.append(card);

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
}


function showEvents(json) {

  var latlng = { lat: 33.6846, lng: -117.8265 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: latlng
  });

  console.log(json);
  for (var i = 0; i < json.page.size; i++) {
    var cardDeck = document.querySelector('.card-columns');
    var card = document.createElement('div');
    card.classList.add("card")

    var image = document.createElement('img');
    image.classList.add("card-img-top");
    image.src = json._embedded.events[i].images[0].url;

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title');
    cardHeader.textContent = json._embedded.events[i].name;
    var dateAndTime = document.createElement('p');
    dateAndTime.classList.add('card-text');
    dateAndTime.textContent = json._embedded.events[i].dates.start.localDate + " " + json._embedded.events[i].dates.start.localTime;
    var timeZone = document.createElement('p');
    timeZone.classList.add('card-text');
    timeZone.textContent = "TimeZone: " + json._embedded.events[i].dates.timezone;

    card.append(image);
    cardBody.append(cardHeader);
    cardBody.append(dateAndTime);
    cardBody.append(timeZone);
    card.append(cardBody);
    cardDeck.append(card);

    var latitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.latitude);
    var longitude = parseFloat(json._embedded.events[i]._embedded.venues[0].location.longitude);
    var latLng2 = { lat: latitude, lng: longitude };

    var marker = new google.maps.Marker({
      position: latLng2,
      title: "Hello World!"
    });
    marker.setMap(map);
    map.setCenter(latLng2);

  }

}
