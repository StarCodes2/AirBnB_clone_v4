$(document).ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status) {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $('.amenities INPUT[type="checkbox"]').change(() => {
    const amenities = {};
    $('INPUT[type="checkbox"]:checked').each(function () {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    });

    if (Object.keys(amenities).length === 0) {
      $('.amenities H4').text('');
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });
});
