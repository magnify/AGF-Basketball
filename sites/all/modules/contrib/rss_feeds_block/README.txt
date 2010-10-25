$Id: README.txt,v 1.1.2.9 2010/03/25 01:16:33 amedjesi Exp $

Contents of File
---------------------

 * RSS feeds block
 * Installation
 * Upgrade
 * Things to know
 * Bug(s)

 RSS feeds block
----------------------

 * Provides a block that allows users to add, remove, view and select feeds.

Installation
----------------------

 * Install and enable the module. Then in the "RSS feed block" content type
   enable one of the parsers under the FeedAPI settings. May need to enable one
   of the parsers in the module page.
 * Go to the block page and place the "RSS feed block" block onto one of the
   sections.
 * Setup the permissions so the the roles that should have the ability to
   create and delete their own rss feeds block content and rss feeds block item
   content have the permissions to do so.

Upgrade
----------------------

 * If you are upgrading then you may need to clear the cache data. Can find this
   option under admin/settings/performance page.
 * If upgrading from a version less then or equal to 6.x-1.2 then you may need
   to rebuild node permissions (drupal/admin/content/node-settings/rebuild).

Things to know
----------------------

 * If you change the RSS feeds block content type, update the views 
   rss_feeds_block_single and rss_feeds_block_all to reflect this change.
 * Cron is required to update the feeds.
 * May want to set the rss feed content type "Delete news items older than" 
   option to remove old feed items. 
 * Versions greater then version 6.x-1.2 give only the author the ability to 
   view their own content (unless the user that is trying to view the content is
   admin). 

 Bugs
----------------------
 * When the module is first enable a message saying that rss_feed_block needs to
   have a parser enabled. The link it provides is incorrent. To get to this 
   content type just go to through the content type page or use the following 
   url: admin/content/node-type/rss-feed-block.