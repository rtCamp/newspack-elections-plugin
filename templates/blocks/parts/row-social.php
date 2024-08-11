<?php

$profile_data  = $extra['profile_data'];
$profile_block = $extra['profile_block'];

if ( ! $profile_block->show( 'social' ) ) {
	return;
}

if ( empty( $profile_data['social'] ) ) {
	return;
}


?>

<div class="wp-block-govpack-profile__social">
	<ul class="wp-block-govpack-profile__services govpack-vertical-list">
		<?php
		foreach ( $profile_data['social'] as $group_key => $group ) {

			if ( empty( $group['services'] ) ) {
				continue;
			}

			?>
			<li class="wp-block-govpack-profile__social_group">
				<div class="wp-block-govpack-profile__label"><?php echo esc_html( $group['label'] ); ?>:</div>
				<ul class="govpack-inline-list">
					<?php
					foreach ( $group['services'] as $service => $social_link ) {

						if ( ! $social_link ) {
							continue;
						}

						$classes = [
							'wp-block-govpack-profile__contact',
							'wp-block-govpack-profile__contact--hide-label',
							"wp-block-govpack-profile__contact--{$service}",
						];
						$classes = join( ' ', $classes );

						$icon_classes = [
							'wp-block-govpack-profile__contact__icon',
							"wp-block-govpack-profile__contact__icon--{$service}",
						];

						$icon_classes = join( ' ', $icon_classes );
						?>
							<li class="<?php echo esc_attr( $classes ); ?>">
								<a href="<?php echo esc_url( $social_link ); ?>" class="wp-block-govpack-profile__contact__link">
									<span class="<?php echo esc_attr( $icon_classes ); ?>"><?php echo esc_svg( gp_get_icon( $service ) ); ?></span>
									<span class="wp-block-govpack-profile__contact__label"><?php esc_html( $service ); ?></span>
								</a>
							</li>
							<?php
					}
					?>
				</ul>
			</li>
		<?php } ?>
	</ul>
</div>


