<?php

$row = $extra['row'];


if ( ! $row['shouldShow'] ) {
	return;
}

$address = '';
if ( $row['show']['showAddress'] && $row['value']['address'] ) {
	$classes = [
		'wp-block-govpack-profile__contact',
		'wp-block-govpack-profile__contact--hide-label',
		'wp-block-govpack-profile__contact--address',
	];
	$classes = join( ' ', $classes );   
	$address = sprintf( '<address class="%s">%s</address>', $classes, $row['value']['address'] );
}

$services = [ 
	'email'   => 'showEmail',
	'phone'   => 'showPhone',
	'fax'     => 'showFax',
	'website' => 'showWebsite',
];

$content = '';

foreach ( $services as $service => $attr ) {

	// no data, dont show it.
	if ( ! isset( $row['value'][ $service ] ) || ! $row['value'][ $service ] ) {
		continue;
	}

	// show control might be disabled.
	if ( ! $row['show'][ $attr ] ) {
		continue;
	}

	$classes = [
		'wp-block-govpack-profile__contact',
		'wp-block-govpack-profile__contact--hide-label',
		"wp-block-govpack-profile__contact--{$service}",
	];

	$classes = esc_attr( join( ' ', $classes ) );

	$icon         = '<span class="wp-block-govpack-profile__contact__icon wp-block-govpack-profile__contact__icon--{%s}">%s</span>';
	$contact_icon = sprintf( $icon, esc_attr( $service ), esc_svg( gp_get_icon( $service ) ) );

	if ( ( 'phone' === $service ) || ( 'fax' === $service ) ) {
		$protocol = 'tel:';
	} elseif ( 'email' === $service ) {
		$protocol = 'mailto:';
	} else {
		$protocol = ''; // web has no protocol as it should come from the url itself.
	}

	$content .=  
		"<li class=\"{$classes} \">
			<a href=\"{$protocol}{$row["value"][$service]}\" class=\"wp-block-govpack-profile__contact__link\">
				{$contact_icon}
				<span class=\"wp-block-govpack-profile__contact__label\">{$service}</span>
			</a>
		</li>";
}

if ( ! $content && ! $address ) {
	return;
}
?>

<div class="wp-block-govpack-profile__comms">
	<div class="wp-block-govpack-profile__label"><?php esc_html( $row['label'] ); ?></div>
	<ul class="wp-block-govpack-profile__comms-icons govpack-inline-list">
		<?php
		if ( $content ) {
			// TODO : Move the content generation above into this area so it easier to loop out, 
			// needs to have a better way of detecting the presence of address or contact info
			echo $content; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		?>
	</ul>
	<?php
	if ( $address ) {
		echo wp_kses_post( $address ); 
	}
	?>
</div>



