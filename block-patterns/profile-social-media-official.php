<?php
/**
 * Title: Profile Social Media (Official)
 * Slug: npe/profile-social-media-official
 * Viewport Width: 250
 */
?>

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
<div class="wp-block-group">
	<?php
	foreach ( [ 'facebook_official', 'x_official', 'youtube_official', 'instagram_official' ] as $service ) {
		?>
				<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"service","key":"<?php echo esc_attr( $service ); ?>"}} -->
					<!-- wp:npe/profile-field-link {"linkFormat":"icon"} /-->
				<!-- /wp:npe/profile-row -->
			<?php
	}
	?>
</div>
<!-- /wp:group -->