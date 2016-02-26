var hiddenBox = $( "#bannerMessage" );
$( ".energy__listItems li" ).on( "click", function( event ) {
	$('#bannerMessage h3').html($(this).data('title'));	
	$('#bannerMessage p').html($(this).data('text'));	
	// $('#bannerMessage button').data('background',yellow);
  hiddenBox.slideToggle();
});