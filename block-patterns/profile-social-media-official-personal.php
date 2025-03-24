<?php
/**
 * Title: Profile Social Media (Personal)
 * Slug: npe/profile-social-media-personal
 */
?>

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
<div class="wp-block-group">
	<?php
	foreach ( [ 'facebook_personal', 'x_personal', 'youtube_personal', 'instagram_personal' ] as $service ) {
		?>
				<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"service","key":"<?php echo esc_attr( $service ); ?>"}} -->
					<!-- wp:npe/profile-field-link {"linkFormat":"icon"} /-->
				<!-- /wp:npe/profile-row -->
			<?php
	}
	?>
</div>
<!-- /wp:group -->