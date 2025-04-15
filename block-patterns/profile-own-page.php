<?php
/**
 * Title: Profile (Own Page)
 * Slug: npe/profile-ownpage
 * Viewport Width: 400
 * Inserter: true
 * Post Types: govpack_profiles
 * Block Types: npe/profile
 */
?>
<!-- wp:npe/profile {"customWidth":"318px","align":"left","className":"is-style-red"} -->
<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"1"} /-->

<!-- wp:npe/profile-row-group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|0"}}} -->
<!-- wp:npe/profile-row {"showLabel":false,"field":{"key":"party","type":"taxonomy"}} -->
<!-- wp:npe/profile-field-term /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"key":"status","type":"taxonomy"}} -->
<!-- wp:npe/profile-field-term /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"taxonomy","key":"legislative_body"}} -->
<!-- wp:npe/profile-field-term /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"taxonomy","key":"state"}} -->
<!-- wp:npe/profile-field-term /-->
<!-- /wp:npe/profile-row -->

<!-- wp:group {"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-contact-campaign","name":"Profile Contact Information (Campaign)"},"style":{"spacing":{"blockGap":"0","margin":{"top":"0","bottom":"0"},"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><!-- wp:npe/profile-separator {"style":{"spacing":{"margin":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10"}}}} /-->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"0rem","bottom":"0.5rem"}}},"fontSize":"medium","fontFamily":"system-sans-serif"} -->
<h2 class="wp-block-heading has-system-sans-serif-font-family has-medium-font-size" style="margin-top:0rem;margin-bottom:0.5rem;font-style:normal;font-weight:500">Campaign Contact</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"top"}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"text","key":"address_campaign"}} -->
<!-- wp:npe/profile-field-text {"fontSize":"small","metadata":{"name":"366 Old Bluefield Road Princeton WV 24739"},"field":{"type":"text","key":"address_campaign"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"email","key":"email_campaign"}} -->
<!-- wp:npe/profile-field-link {"fontSize":"small","metadata":{"name":"Campaign Email Address"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"link","key":"website_campaign"}} -->
<!-- wp:npe/profile-field-link {"linkTextOverride":"Campaign Website","fontSize":"small","metadata":{"name":"Campaign Website"}} /-->
<!-- /wp:npe/profile-row --></div>
<!-- /wp:group -->

<!-- wp:npe/profile-social-links {"openInNewTab":true,"size":"has-small-icon-size","className":"is-style-logos-only","style":{"spacing":{"blockGap":{"left":"5px"}}},"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-social-media-campaign-icons","name":"Profile Campaign Social Media Icons"}} -->
<!-- wp:npe/profile-social-link {"field":{"key":"x_campaign"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"facebook_campaign"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"instagram_campaign"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"youtube_campaign"}} /-->
<!-- /wp:npe/profile-social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-contact-official","name":"Profile Contact Information (Official)"},"style":{"spacing":{"blockGap":"0","margin":{"top":"0","bottom":"0"},"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><!-- wp:npe/profile-separator {"style":{"spacing":{"margin":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10"}}}} /-->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"0rem","bottom":"0.5rem"}}},"fontSize":"medium","fontFamily":"system-sans-serif"} -->
<h2 class="wp-block-heading has-system-sans-serif-font-family has-medium-font-size" style="margin-top:0rem;margin-bottom:0.5rem;font-style:normal;font-weight:500">Official Contact</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"top"}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"text","key":"address_official"}} -->
<!-- wp:npe/profile-field-text {"fontSize":"small","metadata":{"name":"ASDA"},"field":{"type":"text","key":"address_official"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"email","key":"email_official"}} -->
<!-- wp:npe/profile-field-link {"fontSize":"small","metadata":{"name":"Link"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"link","key":"website_official"}} -->
<!-- wp:npe/profile-field-link {"linkTextOverride":"Official Website","fontSize":"small","metadata":{"name":"Official Website"}} /-->
<!-- /wp:npe/profile-row --></div>
<!-- /wp:group -->

<!-- wp:npe/profile-social-links {"openInNewTab":true,"size":"has-small-icon-size","className":"is-style-logos-only","style":{"spacing":{"blockGap":{"left":"5px"}}},"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-social-media-official-icons","name":"Profile Official Social Media Icons"}} -->
<!-- wp:npe/profile-social-link {"field":{"key":"x_official"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"facebook_official"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"instagram_official"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"youtube_official"}} /-->
<!-- /wp:npe/profile-social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-contact-personal","name":"Profile Contact Information (Personal)"},"style":{"spacing":{"blockGap":"0","margin":{"top":"0","bottom":"0"},"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><!-- wp:npe/profile-separator {"style":{"spacing":{"margin":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10"}}}} /-->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"0rem","bottom":"0.5rem"}}},"fontSize":"medium","fontFamily":"system-sans-serif"} -->
<h2 class="wp-block-heading has-system-sans-serif-font-family has-medium-font-size" style="margin-top:0rem;margin-bottom:0.5rem;font-style:normal;font-weight:500">Personal Contact</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"top"}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:npe/profile-row {"showLabel":false,"field":{"type":"link","key":"website_personal"}} -->
<!-- wp:npe/profile-field-link {"linkTextOverride":"Personal Website","fontSize":"small","metadata":{"name":"Personal Website"}} /-->
<!-- /wp:npe/profile-row --></div>
<!-- /wp:group -->

<!-- wp:npe/profile-social-links {"openInNewTab":true,"size":"has-small-icon-size","className":"is-style-logos-only","style":{"spacing":{"blockGap":{"left":"5px"}}},"metadata":{"categories":["newspack-elections"],"patternName":"npe/profile-social-media-personal-icons","name":"Profile Personal Social Media Icons"}} -->
<!-- wp:npe/profile-social-link {"field":{"key":"x_personal"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"facebook_personal"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"instagram_personal"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"youtube_personal"}} /-->
<!-- /wp:npe/profile-social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"small","layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
<div class="wp-block-group has-small-font-size" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)"><!-- wp:heading {"fontSize":"normal"} -->
<h2 class="wp-block-heading has-normal-font-size">About</h2>
<!-- /wp:heading -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"name"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"Zane Lawhorn"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"date_of_birth"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"nickname"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"Lil Zane Low"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"ethnicity"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"ASD"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"race"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"ASDA"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"gender"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"ASD"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"education"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"SDAS"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"occupation"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"asdaS"}} /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"text","key":"endorsements"}} -->
<!-- wp:npe/profile-field-text {"metadata":{"name":"ASDASD"}} /-->
<!-- /wp:npe/profile-row --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"0","right":"0"}}},"fontSize":"small","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"stretch"}} -->
<div class="wp-block-group has-small-font-size" style="padding-top:var(--wp--preset--spacing--30);padding-right:0;padding-bottom:var(--wp--preset--spacing--30);padding-left:0"><!-- wp:heading {"fontSize":"normal"} -->
<h2 class="wp-block-heading has-normal-font-size">Career</h2>
<!-- /wp:heading -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"congress_year"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"term_end_date"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"confirmed_date"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"appointed_date"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row -->

<!-- wp:npe/profile-row {"field":{"type":"date","key":"date_assumed_office"}} -->
<!-- wp:npe/profile-field-date /-->
<!-- /wp:npe/profile-row --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"0","right":"0"}}},"fontSize":"small","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"stretch"}} -->
<div class="wp-block-group has-small-font-size" style="padding-top:var(--wp--preset--spacing--30);padding-right:0;padding-bottom:var(--wp--preset--spacing--30);padding-left:0"><!-- wp:heading {"fontSize":"normal"} -->
<h2 class="wp-block-heading has-normal-font-size">Elsewhere</h2>
<!-- /wp:heading -->

<!-- wp:npe/profile-social-links {"size":"has-small-icon-size","layout":{"type":"flex","flexWrap":"wrap"}} -->
<!-- wp:npe/profile-social-link {"field":{"key":"ballotpedia"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"fec_id"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"gab"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"linkedin"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"rumble"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"openstates_id"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"wikipedia"}} /-->

<!-- wp:npe/profile-social-link {"field":{"key":"opensecrets_id"}} /-->
<!-- /wp:npe/profile-social-links --></div>
<!-- /wp:group -->
<!-- /wp:npe/profile-row-group -->
<!-- /wp:npe/profile -->