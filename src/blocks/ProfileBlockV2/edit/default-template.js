export const DEFAULT_TEMPLATE = [
	[ "core/post-featured-image", {
		"isLink":true,
	}, []],
	[ "govpack/profile-row-group", {
		"style":{
			"spacing":{
				"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|10","right":"var:preset|spacing|10"},
				"blockGap":"var:preset|spacing|10"
			}
		}
		},[
			[ "core/post-title", {
				"isLink":true
			}, []],
			[ "govpack/profile-row", {
				"fieldKey":"party",
				"fieldType":"taxonomy"
			}, []],
			[ "govpack/profile-row", {
				"fieldKey":"status",
				"fieldType":"taxonomy"
			}, []]
		]
	]
]