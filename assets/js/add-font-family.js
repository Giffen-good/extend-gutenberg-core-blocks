import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable spacing control on the following blocks
const enableSpacingControlOnBlocks = [
	'core/paragraph',
	'core/heading',
	'core/quote',
	'core/verse',
	'core/list'
];

// Available spacing control options
const spacingControlOptions = [
	{
		label: __( 'Sans-serif' ),
		value: 'ff-sans-serif',
	},
	{
		label: __( 'Serif' ),
		value: 'ff-serif',
	}
];

/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSpacingControlAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnBlocks.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		fontFamily: {
			type: 'string',
			default: spacingControlOptions[ 0 ].value,
		},
	} );

	return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-example/attribute/fontFamily', addSpacingControlAttribute );

/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { fontFamily } = props.attributes;

		// add has-spacing-xy class to block
		if ( fontFamily ) {
			props.attributes.className = `${ fontFamily }`;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Font Picker' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Font Family' ) }
							value={ fontFamily }
							options={ spacingControlOptions }
							onChange={ ( val ) => {
								props.setAttributes( {
									fontFamily: val,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSpacingControl' );

addFilter( 'editor.BlockEdit', 'extend-block-example/with-spacing-control', withSpacingControl );

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
//  */
const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
	return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-example/get-save-content/extra-props', addSpacingExtraProps );
