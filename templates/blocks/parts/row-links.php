<?php

$profile_data = $extra["profile_data"];
$profile_block = $extra["profile_block"];

if(!$profile_block->show("links")){
	return;
}

$links = $profile_block->get_profile_links();
if(count($links) <= 0){
	return;
}

foreach($links as $key => &$link){
	$link["show"] = gp_should_show_link($key, $attributes);
}	

$links = array_filter($links, function($link, $key){
	return $link["show"];
}, ARRAY_FILTER_USE_BOTH );

if(count($links) <= 0){
	return;
}

?>
	<div class="wp-block-govpack-profile__comms">
		<div class="wp-block-govpack-profile__label">Links:</div>
			<ul class="wp-block-govpack-profile__comms-icons govpack-inline-list">
			<?php
				foreach ( $links as &$link ) {
					
					if ( ! gp_icon_exists( $link['slug'] ) ) {
						continue;
					}
					
					$classes = [
						'wp-block-govpack-profile__contact',
						'wp-block-govpack-profile__contact--hide-label',
						"wp-block-govpack-profile__contact--{$link['slug']}",
					];
					$classes = join( ' ', $classes );

					?>
					<li class="<?php echo esc_attr( $classes ); ?>">
						<a href="<?php echo esc_url( $link['href'] ); ?>" title="Link to <?php echo esc_attr( $link['text'] ); ?>">
							<span class="wp-block-govpack-profile__contact__icon wp-block-govpack-profile__contact__icon--<?php echo esc_attr( $link['slug'] ); ?>">
								<?php echo esc_svg( gp_get_icon( $link['slug'] ) ); ?>
							</span>
							<span class="wp-block-govpack-profile__contact__label">
								<?php echo esc_html( $link['text'] ); ?>
							</span>
						</a>
					</li>
				<?php } ?>
			</ul>
		</div>
<?php

