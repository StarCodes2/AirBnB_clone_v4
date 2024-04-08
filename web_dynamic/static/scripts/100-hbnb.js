$(document).ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status) {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: addPlaces
  });

    let states = {};
    let cities = {}
  $('.locations .popover > UL > LI > H2 > INPUT[type="checkbox"]').change(() => {
    states ={};
    $('.locations .popover > UL > LI > H2 > INPUT[type="checkbox"]:checked').each(function () {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
    });

    addFilter(Object.assign({}, states, cities));
  });

  $('.locations .popover > UL > LI > UL > LI INPUT[type="checkbox"]').change(() => {
    cities = {};
    $('.locations .popover > UL > LI > UL > LI INPUT[type="checkbox"]:checked').each(function () {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    });

    addFilter(Object.assign({}, states, cities));
  });

  let amenities = {};
  $('.amenities INPUT[type="checkbox"]').change(() => {
    amenities = {};
    $('.amenities INPUT[type="checkbox"]:checked').each(function () {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    });

    if (Object.keys(amenities).length === 0) {
      $('.amenities H4').text('');
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });

  $('BUTTON').click(function () {
    $.ajax({
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'states': Object.keys(states),
        'cities': Object.keys(cities),
        'amenities': Object.keys(amenities)
      }),
      dataType: 'JSON',
      success: addPlaces
    });
  });
});

function addFilter (locations) {
  if (Object.keys(locations).length === 0) {
    $('.locations H4').text('');
    $('.locations H4').html('&nbsp;');
  } else {
    $('.locations H4').text(Object.values(locations).join(', '));
  }
}

function addPlaces (response) {
  $('SECTION.places').empty();
  $('SECTION.places').append(response.map(place => {
    return `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guests
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedrooms
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathrooms
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
  }));
}
