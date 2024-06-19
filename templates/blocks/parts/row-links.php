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
<ul class="govpack-vertical-list">
	<?php foreach($links as &$link){ ?>
		<li><?php echo wp_kses_post($link['src']); ?></li>
	<?php } ?>
</ul>


