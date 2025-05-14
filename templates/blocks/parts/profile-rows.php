<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$profile_block = $extra['profile_block'];

foreach ( $profile_block->rows() as $index => $row ) {
	


	if ( ! $row['shouldShow'] ) {
		continue;
	}	

	
	ob_start();
	switch ( $row['key'] ) {
		case 'social':
			gp_get_block_part( 'blocks/parts/row', 'social', $attributes, $content, $block, $extra );
			break;
	//	case 'comms_capitol':
	//	case 'comms_district':
	//	case 'comms_campaign':
		case 'contact':
			gp_get_block_part( 'blocks/parts/row', 'contact', $attributes, $content, $block,  $extra);
			break;
		case 'comms_other':
			echo 'other';
			break;
		case 'links':
			gp_get_block_part( 'blocks/parts/row', 'links', $attributes, $content, $block, $extra );
			break;
		case 'more_about':
			gp_get_block_part( 'blocks/parts/row', 'more-link', $attributes, $content, $block, $extra );
			break;
		default:
			if ( isset( $row['value'] ) && $row['value'] ) {
				echo $row['value']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			break;
	}
	$row_content = ob_get_clean();
	
	if(empty($row_content)){
		continue;
	}

	?>
		<div <?php echo gp_line_attributes( $row, $attributes ); ?>>
			<?php if ( isset( $row['label'] ) && ( $row['label'] ) ) { 
					$label_classes = gp_classnames(
						'govpack-line__label',
						[
							'govpack-line__label--show' => $profile_block->show( 'labels' ),
							'govpack-line__label--hide' => ! $profile_block->show( 'labels' ),
						]
					)
				?>
			<dt class="<?php echo esc_attr($label_classes);?>">
				<?php echo esc_html( $row['label'] ); ?></dt>
			<?php } ?>
			<dd class="govpack-line__content">
				<?php
					echo $row_content;
				?>
			</dd>
		</div>
	<?php
}

