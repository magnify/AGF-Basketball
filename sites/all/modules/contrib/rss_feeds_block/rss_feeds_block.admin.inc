<?php
// $Id: rss_feeds_block.admin.inc,v 1.1.2.7 2010/03/11 02:57:09 amedjesi Exp $

/**
 * @file
 * Administration-related functions for RSS feeds block
 */

/**
 * Settings
 */
function rss_feeds_block_admin_settings() {
  $form = array();

  $form['rss_feeds_block_general'] = array(
    '#type' => 'fieldset',
    '#title' => t('General'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['rss_feeds_block_general']['rss_feeds_block_title'] = array(
    '#type' => 'textfield',
    '#title' => t('Block title'),
    '#size' => 80,
    '#maxlength' => 255,
    '#default_value' => variable_get('rss_feeds_block_title', RSS_FEEDS_BLOCK_DEFAULT_TITLE),
    '#description' => t('The title of the block.')
  );

  $form['rss_feeds_block_general']['rss_feeds_block_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('Limit'),
    '#size' => 10,
    '#maxlength' => 10,
    '#default_value' => variable_get('rss_feeds_block_limit', RSS_FEEDS_BLOCK_DEFAULT_LIMIT),
    '#description' => t('The max number of feed items will display in the block.')
  );

  // Grab all node types - might not need this? is there some function in core that already does this?
  $results = db_query('SELECT nt.type, nt.name FROM {node_type} AS nt ORDER BY nt.name');
  while ($result = db_fetch_object($results)) {
    $node_types[$result->type] = $result->name;
  }

  $form['rss_feeds_block_general']['rss_feeds_block_content_type'] = array(
    '#type' => 'select',
    '#title' => t('RSS feed content type'),
    '#default_value' => variable_get('rss_feeds_block_content_type', RSS_FEEDS_BLOCK_DEFAULT_CONTENT_TYPE),
    '#options' => $node_types,
    '#description' => t('Content type to use for feeds.')
  );

  $form['rss_feeds_block_general']['rss_feeds_block_item_content_type'] = array(
    '#type' => 'select',
    '#title' => t('RSS feed item content type'),
    '#default_value' => variable_get('rss_feeds_block_item_content_type', RSS_FEEDS_BLOCK_DEFAULT_ITEM_CONTENT_TYPE),
    '#options' => $node_types,
    '#description' => t('Content type to use for feed items.')
  );

  $form['rss_feeds_block_length'] = array(
    '#type' => 'fieldset',
    '#title' => t('Length'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['rss_feeds_block_length']['rss_feeds_block_length_feed_title'] = array(
    '#type' => 'textfield',
    '#title' => t('Feed title length'),
    '#size' => 10,
    '#maxlength' => 32000,
    '#default_value' => variable_get('rss_feeds_block_length_feed_title', RSS_FEEDS_BLOCK_DEFAULT_LENGTH_FEED_TITLE),
    '#description' => t('The max length a feed title string can be. Leave it 0 to be unlimited.')
  );

  $form['rss_feeds_block_length']['rss_feeds_block_length_feed_item_title'] = array(
    '#type' => 'textfield',
    '#title' => t('Feed item title length'),
    '#size' => 10,
    '#maxlength' => 32000,
    '#default_value' => variable_get('rss_feeds_block_length_feed_item_title', RSS_FEEDS_BLOCK_DEFAULT_LENGTH_FEED_ITEM_TITLE),
    '#description' => t('The max length a feed item title can be. Leave it 0 to be unlimited.')
  );

  $form['rss_feeds_block_length']['rss_feeds_block_length_feed_item_description'] = array(
    '#type' => 'textfield',
    '#title' => t('Feed item description length'),
    '#size' => 10,
    '#maxlength' => 32000,
    '#default_value' => variable_get('rss_feeds_block_length_feed_item_description', RSS_FEEDS_BLOCK_DEFAULT_LENGTH_FEED_ITEM_DESCRIPTION),
    '#description' => t('The max length a feed item description can be. Leave it 0 to be unlimited.')
  );

  return system_settings_form($form);
}