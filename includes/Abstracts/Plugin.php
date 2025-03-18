<?php
namespace Govpack\Abstracts;

abstract class Plugin {

	private string $path;
	private string $url;

	public function require( string $path ): string {
		return require_once $this->path( $path ); //phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	}

	public function build_path( string $path ): string {
		return trailingslashit(
			trailingslashit( $this->path( 'build' ) ) . $path 
		);
	}

	public function set_path( string $path ): self {
		$this->path = $path;
		return $this;
	}

	public function set_url( string $url ): self {
		$this->url = $url;
		return $this;
	}

	public function path( $path ): string {
		return $this->path . $path;
	}

	public function url( string $path ): string {
		return trailingslashit( $this->url ) . $path;
	}
}
