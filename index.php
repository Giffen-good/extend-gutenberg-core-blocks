<?php
/**
 * Plugin Name: Extend Gutenberg Core Blocks
 * Plugin URI:  https://github.com/Giffen-good
 * Description: Library of Useful Extensions for Gutenberg core blocks.
 * Author: Christopher Rock
 * Author URI: https://chrisrock.ca
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: extend-core-block
 * Domain Path: /languages/
 *
 * @package extend-core-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'enqueue_block_editor_assets', 'extend_block_example_enqueue_block_editor_assets' );

function extend_block_example_enqueue_block_editor_assets() {
    // Enqueue our script
    wp_enqueue_script(
        'extend-core-block',
        esc_url( plugins_url( '/dist/extend-core-block.js', __FILE__ ) ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
        '1.0.0',
        true // Enqueue the script in the footer.
    );
}
