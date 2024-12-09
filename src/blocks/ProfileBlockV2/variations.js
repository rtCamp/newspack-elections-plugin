import {justifyLeft, layout, mediaAndText} from "@wordpress/icons"

export const variations = [
	{
		'name' : "gp-profile-full",
		'title' : "Full Profile",
		'description' : "Profile",
		isDefault : false,
		icon : layout,
		attributes : {
			width : "wide",
			align: "wide"
		}
	},
	{
		'name' : "gp-profile-full-inline",
		'title' : "Inline Profile",
		isDefault : false,
		icon : mediaAndText,
		attributes : {
			width : "thin",
			align: "left"
		}
	},
	{
		'name' : "gp-profile-mini",
		'title' : "Mini Profile",
		isDefault : false,
		icon : justifyLeft,
		example : {
			attributes : {
				"preview" : true,
				"width" : "wide",
				"align": "left",
				"backgroundColor":"accent",
				"verticalAlignment":"center",
				"fontSize":"medium",
				"textColor":"base-2",
				"style":{
					"spacing":{
						"padding":{
							"top":"0.5rem","bottom":"0.5rem","left":"0.5rem","right":"0.5rem"}
					},
					"typography":{ "textAlign":"left" },
					"dimensions" : { "minHeight" : "10rem" }
				},
				"layout":{
					"type":"flex",
					"verticalAlignment":"middle",
					"justifyContent":"left",
					"flexWrap":"nowrap"
				},
			},
			innerBlocks : [
				{
					name : "core/post-featured-image", 
					attributes :{"style":{"layout":{"selfStretch":"fixed","flexSize":"130px"},"border":{"radius":"100px"}}}
				},
				{
					name : "core/group", 
					attributes : {"style":{"spacing":{"blockGap":"0.2rem"},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} , 
					innerBlocks: [
						{
							name : "core/post-title", 
							attributes : {"style":{"typography":{"fontStyle":"normal","fontWeight":"1000","fontSize":"1.4rem"},"spacing":{"padding":{"bottom":"0.5rem"}}}}, 
							innerBlocks : []
						},
						{
							name :"govpack/profile-terms", 
							attributes :{"taxonomy":"govpack_legislative_body","fontSize":"small"}, 
							innerBlocks : []
						},
						{
							name :"govpack/profile-terms", 
							attributes :{"taxonomy":"govpack_party","fontSize":"small"}, 
							innerBlocks :[]
						},
						{
							name :"govpack/profile-terms", 
							attributes :{"taxonomy":"govpack_officeholder_status","fontSize":"small"}, 
							innerBlocks :[]
						}
					]
				}
			]
		},
		attributes : {
			"width" : "wide",
			"align": "left",
			"backgroundColor":"accent",
			"verticalAlignment":"center",
			"fontSize":"medium",
			"textColor":"base-2",
			"style":{
				"spacing":{
					"padding":{
						"top":"0.5rem","bottom":"0.5rem","left":"0.5rem","right":"0.5rem"}
				},
				"typography":{"textAlign":"left"},
				"dimensions" : { "minHeight" : "10rem" }
			},
			"layout":{
				"type":"flex",
				"verticalAlignment":"middle",
				"justifyContent":"left",
				"flexWrap":"nowrap"
			},
			
		},
		innerBlocks : [
			[
				"core/post-featured-image", 
				{"style":{"layout":{"selfStretch":"fixed","flexSize":"130px"},"border":{"radius":"100px"}}}
			],
			[
				"core/group", 
				{"style":{"spacing":{"blockGap":"0.2rem"},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} , 
				[
					["core/post-title", {"style":{"typography":{"fontStyle":"normal","fontWeight":"1000","fontSize":"1.4rem"},"spacing":{"padding":{"bottom":"0.5rem"}}}}, []],
					["govpack/profile-terms", {"taxonomy":"govpack_legislative_body","fontSize":"small"}, []],
					["govpack/profile-terms", {"taxonomy":"govpack_party","fontSize":"small"}, []],
					["govpack/profile-terms", {"taxonomy":"govpack_officeholder_status","fontSize":"small"}, []]
				]
			]
		]
	}
]