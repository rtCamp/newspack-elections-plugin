<?php

namespace Govpack\Fields;

use Govpack\Profile\Profile;

class MoreLinkField extends LinkField {


	
	
	public function link_text( string $link_text ): self {
		$this->link_text = $link_text;
		return $this;
	}
}
