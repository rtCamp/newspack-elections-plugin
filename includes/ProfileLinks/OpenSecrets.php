<?php
namespace Govpack\ProfileLinks;

class OpenSecrets extends \Govpack\ProfileLinks\ProfileLink {

	protected string $slug = 'opensecrets';

	/**
	 * @return string
	 *
	 * @psalm-return 'opensecrets_id'
	 */
	public function meta_key(): string {
		return 'opensecrets_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'OpenSecrets'
	 */
	public function label(): string {
		return 'OpenSecrets';
	}

	public function enabled(): bool {
		return false;
	}
}
