<?php
/**
 * Title: Profile Social Media (Campaign)
 * Slug: npe/profile-social-media-campaign
 * Viewport Width: 250 
 */
?>

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
<div class="wp-block-group">
	<?php
	foreach ( [ 'facebook_campaign', 'x_campaign', 'youtube_campaign', 'instagram_campaign' ] as $service ) {
		?>
				<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"service","key":"<?php echo esc_attr( $service ); ?>"}} -->
					<!-- wp:npe/profile-field-link {"linkFormat":"icon"} /-->
				<!-- /wp:npe/profile-row -->
			<?php
	}
	?>
</div>
<!-- /wp:group -->