$(document).ready(function () {
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
