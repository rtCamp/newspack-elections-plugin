<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$profile_block = $extra["profile_block"];



foreach($profile_block->rows() as $index => $row){
	if ( ! $row["shouldShow"] ) {
		continue;
	}

	if ( ! $row["value"] ) {
		continue;
	}

	?>
		<div <?php echo gp_line_attributes($row, $attributes);?>>
			<?php if(isset($row["label"]) && ($row["label"])){ ?>
			<dt 
				class="<?php echo gp_classnames("govpack-line__label", [
					"govpack-line__label--show" => $profile_block->show("labels"),
					"govpack-line__label--hide" => !$profile_block->show("labels"),
				]);?>"
			><?php esc_html_e($row["label"]);?></dt>
			<?php } ?>
			<dd class="govpack-line__content"><?php echo $row["value"]; ?></dd>
		</div>
	<?php
}

