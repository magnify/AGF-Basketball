// $Id: rss_feeds_block.js,v 1.1.2.8 2010/03/11 02:57:09 amedjesi Exp $

Drupal.rssfeedsblock = {};

Drupal.behaviors.rssfeedsblock = function() {
  Drupal.rssfeedsblock.block = null;

  // Stop here if the block isn't enabled.
  if ($().find('.rss-feeds-block').length == 0) {
    return;
  }

  // Setup rssfeedsblock
  Drupal.rssfeedsblock.block = $().find('.rss-feeds-block');
  Drupal.rssfeedsblock.block.find(".rss-feeds-block-status").hide();
  Drupal.rssfeedsblock.block.find('select').val('all');
  Drupal.rssfeedsblock.toggleRemoveButton('all');

  // Default Text
  Drupal.rssfeedsblock.block.find('.rss-feeds-block-default-text').each(function(){
    this.value = $(this).attr('title');
    $(this).addClass('rss-feeds-block-text-label');

    $(this).focus(function(){
      if(this.value == $(this).attr('title')) {
        this.value = '';
        $(this).removeClass('rss-feeds-block-text-label');
      }
    });

    $(this).blur(function(){
      if(this.value == '') {
        this.value = $(this).attr('title');
        $(this).addClass('rss-feeds-block-text-label');
      }
    });
  });

  // Attach select event on select
  Drupal.rssfeedsblock.block.find('select').change(function() {
    var selectedFeed = $(this).val();
    Drupal.rssfeedsblock.select(selectedFeed);
  });

  // Attach click event on add
  Drupal.rssfeedsblock.block.find('.rss-feeds-block-add-button').click(function() {
    var feedUrl = Drupal.rssfeedsblock.block.find('.rss-feeds-block-add-text').val();
    Drupal.rssfeedsblock.addFeed(feedUrl);
  });

  // Attach click event on remove
  Drupal.rssfeedsblock.block.find('.rss-feeds-block-remove-button').click(function() {
    var selectedFeed = Drupal.rssfeedsblock.block.find('select').val();
    Drupal.rssfeedsblock.removeFeed(selectedFeed);
  });
}

/**
 * Main function - Select event
 */
Drupal.rssfeedsblock.select = function (selectedFeed) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  Drupal.rssfeedsblock.toggleRemoveButton(selectedFeed);

  $.ajax({
    url: Drupal.settings.basePath + 'rss-feeds-block/select',
    type: "POST",
    dataType: "json",
    data: {selected: selectedFeed},
    success: function(data) {
      Drupal.rssfeedsblock.setItems(data.feed_item_list);
      Drupal.rssfeedsblock.setStatus(data.status);
    },
    error: function() {
      Drupal.t("An error occured while trying to save you settings.");
    }
  });
}

/**
 * Main function - Add event
 */
Drupal.rssfeedsblock.addFeed = function (feedUrl) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  if (Drupal.rssfeedsblock.addFeed.clicked == null
      || Drupal.rssfeedsblock.addFeed.clicked == false) {
    Drupal.rssfeedsblock.addFeed.clicked = true;
    Drupal.rssfeedsblock.toggleAddButton();

    // Change back to default text
    if (Drupal.rssfeedsblock.block.find('.rss-feeds-block-default-text').length != 0) {
      Drupal.rssfeedsblock.block.find('.rss-feeds-block-default-text').val(Drupal.rssfeedsblock.block.find('.rss-feeds-block-default-text').attr('title'));
      Drupal.rssfeedsblock.block.find('.rss-feeds-block-default-text').addClass('rss-feeds-block-text-label');
    }

    $.ajax({
      url: Drupal.settings.basePath + 'rss-feeds-block/add',
      type: "POST",
      dataType: "json",
      data: {feed: feedUrl},
      success: function(data) {
        Drupal.rssfeedsblock.setSelect(data.feed_list);
        Drupal.rssfeedsblock.setItems(data.feed_item_list);
        Drupal.rssfeedsblock.setStatus(data.status);
        Drupal.rssfeedsblock.block.find('select').val('all');
        Drupal.rssfeedsblock.toggleRemoveButton('all');
        Drupal.rssfeedsblock.toggleAddButton();
        Drupal.rssfeedsblock.addFeed.clicked = false;
      },
      error: function() {
        Drupal.t("An error occured while trying to save you settings.");
        Drupal.rssfeedsblock.toggleAddButton();
      }
    });
  }
}

/**
 * Main function - Remove event
 */
Drupal.rssfeedsblock.removeFeed = function (selectedFeed) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  if (selectedFeed != 'all') {
    $.ajax({
      url: Drupal.settings.basePath + 'rss-feeds-block/remove',
      type: "POST",
      dataType: "json",
      data: {selected: selectedFeed},
      success: function(data) {
        Drupal.rssfeedsblock.setSelect(data.feed_list);
        Drupal.rssfeedsblock.setItems(data.feed_item_list);
        Drupal.rssfeedsblock.setStatus(data.status);
        Drupal.rssfeedsblock.block.find('select').val('all');
        Drupal.rssfeedsblock.toggleRemoveButton('all');
      },
      error: function() {
        Drupal.t("An error occured while trying to save you settings.");
      }
    });
  }
}

/**
 * Helper function - Set select options
 */
Drupal.rssfeedsblock.setSelect = function (text) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  Drupal.rssfeedsblock.block.find('select').val('all');
  Drupal.rssfeedsblock.block.find("select").empty();
  Drupal.rssfeedsblock.block.find("select").append(text);
}

/**
 * Helper function - Set items text
 */
Drupal.rssfeedsblock.setItems = function (text) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  Drupal.rssfeedsblock.block.find(".rss-feeds-block-middle").empty();
  Drupal.rssfeedsblock.block.find(".rss-feeds-block-middle").append(text);
}

/**
 * Helper function - Set status text
 */
Drupal.rssfeedsblock.setStatus = function (text) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  if (Drupal.rssfeedsblock.setStatus.timer != null) {
    clearTimeout(Drupal.rssfeedsblock.setStatus.timer);
  }

  Drupal.rssfeedsblock.block.find(".rss-feeds-block-status").empty();
  Drupal.rssfeedsblock.block.find(".rss-feeds-block-status").append(text);
  Drupal.rssfeedsblock.block.find(".rss-feeds-block-status").show();
  Drupal.rssfeedsblock.setStatus.timer = setTimeout(
    function () {
      Drupal.rssfeedsblock.block.find(".rss-feeds-block-status").hide();
    },
    5000
  );
}

/**
 * Helper function - Toggle add button
 */
Drupal.rssfeedsblock.toggleAddButton = function() {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }
  Drupal.rssfeedsblock.block.find('.rss-feeds-block-add-button').toggleClass('rss-feeds-block-button-disabled');
}

/**
 * Helper function - Toggle remove button
 */
Drupal.rssfeedsblock.toggleRemoveButton = function (selectedFeed) {
  // Stop here if the block isn't enabled.
  if (Drupal.rssfeedsblock.block == null) {
    return;
  }

  if (selectedFeed == 'all') {
    Drupal.rssfeedsblock.block.find('.rss-feeds-block-remove-button').addClass('rss-feeds-block-button-disabled');
  }
  else {
    Drupal.rssfeedsblock.block.find('.rss-feeds-block-remove-button').removeClass('rss-feeds-block-button-disabled');
  }
}