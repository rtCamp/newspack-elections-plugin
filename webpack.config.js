const path = require( 'path' );
const fs = require( 'fs' );

let defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getWebpackEntryPoints, getPackageProp, hasPackageProp,getWordPressSrcDirectory } = require("@wordpress/scripts/utils")

const CopyWebpackPlugin = require("copy-webpack-plugin");
const { optimize } = require('svgo');
const TerserPlugin = require( 'terser-webpack-plugin' );

function getEntryPoints(){
	return {
		...getWebpackEntryPoints("script")(),
		...getEntryPointsFromPackage()
	}
}

function pathToEntry(filePath){
	const entryName = path.basename( filePath, '.js' );

	if ( ! filePath.startsWith( './' ) ) {
		filePath = './' + filePath;
	}

	return [ entryName, filePath ];
};

const terserOptions = {
	parallel: true,
	terserOptions: {
		output: {
			comments: /translators:/i,
		},
		compress: {
			passes: 2,
			drop_console: true
		},
		mangle: {
			reserved: [ '__', '_n', '_nx', '_x' ],
		},
	},
	extractComments: false,
}

/*
const minifier = new TerserPlugin( terserOptions )
*/

function getEntryPointsFromPackage(){
	
	let entryPoints = {}
	
	
	if(!hasPackageProp('config')){
		return entryPoints
	}

	const pkgConfig = getPackageProp("config")
	if(!pkgConfig.hasOwnProperty("entrypoints")){
		return entryPoints
	}

	if(Array.isArray(pkgConfig.entrypoints)){

		pkgConfig.entrypoints.forEach( (path, index) => {
			const [ entryName, entryPath ] = pathToEntry(path)
			entryPoints[entryName] = entryPath
		});

	} else if(typeof pkgConfig.entrypoints === "object"){

		entryPoints = {
			...entryPoints,
			...pkgConfig.entrypoints
		}
	}
	


	return entryPoints

}


function blockScripts( type, inputDir, blocks ) {
	return blocks
		.map( block => path.join( inputDir, 'blocks', block, `${ type }.js` ) )
		.filter( fs.existsSync );
}

const blocksDir = path.join( __dirname, 'src', 'blocks' );
const blocks = fs.readdirSync( blocksDir )
	.filter( block => fs.existsSync( path.join( __dirname, 'src', 'blocks', block, 'index.js' ) ) );





defaultConfig = {
	...defaultConfig,
	optimization : {
		...defaultConfig.optimization,
		minimizer : [
			new TerserPlugin( terserOptions )
		]
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyWebpackPlugin({
			patterns: [{
				context: getWordPressSrcDirectory(),
				from : "assets/icons/**/*.svg",
				to : "icons/[name][ext]",
				transform : {
					transformer(content, absoluteFrom) {
						//console.log(content.toString())
						//return content.toString();
						let result = optimize(content.toString())
						return result.data;
					}
				}
			}]
		})
	]
}

function getBlockEditorScripts(){

	const blocksDir = path.join( __dirname, 'src', 'blocks' );
	const blocks = fs.readdirSync( blocksDir ).filter( block => fs.existsSync( path.join( __dirname, 'src', 'blocks', block, 'index.js' ) ) );

	return {
		"editor-blocks" : blockScripts( 'index', path.join( __dirname, 'src' ), blocks )
	}
}

function getEntryPointsv2(){

	return {
		...getBlockEditorScripts(),
		...getEntryPointsFromPackage()
	}
	
}

console.log(getEntryPointsv2())
module.exports = {
    ...defaultConfig,
	"entry": getEntryPointsv2
};  
