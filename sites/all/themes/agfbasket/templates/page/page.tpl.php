<?php
// $Id: 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>

<body class="<?php print $body_classes; ?>"<?php print $background_image ?>>
  <p><a name="top" id="top"></a></p>
  <div id="wrapper">
    <div id="page" class="container-16 clear-block">
    <div id="header" class="clear-block">
      <div id="header-inner">
        <?php if ($site_logo): ?>
          <div id="logo"><?php print $site_logo; ?></div>
        <?php endif; ?>
        <?php print $header ?>

        <?php if ($search_box): ?>
          <div id="search-box" class="grid-6 prefix-10"><?php print $search_box; ?></div>
        <?php endif; ?>

      </div> <!--/#header-inner -->

    <?php if ($mainmenu): ?>
      <div id="main-menu" class="container-16 clear-block">
        <div id="main-menu-inner">
          <?php print $mainmenu; ?>
        </div>
      </div> <!--//end #main-menu -->
    <?php endif; ?>

    </div> <!--/#header -->

    <?php print $breadcrumb; ?>

    <div id="main" class="clear-block">

      <div id="main-wrapper" class="clear-block">

        <?php print $messages; ?>
        <?php print $help; ?>

        <?php if ($left && !$is_front): ?>
          <div id="sidebar-left" class="column sidebar region grid-5">
                  <div id="sidebar-left-inner">
              <?php print $left; ?>
            </div>
          </div> <!-- //end #sidebar-left-inner -->
        <?php endif; ?>

        <div id="content" class="column <?php print ns('grid-20', $left, 6, $right, 6) ?> clear-block">
          <div id="content-inner">
            <div id="main-content" class="region">
              <?php if ($tabs): ?>
                <div class="tabs clear-block"><?php print $tabs; ?></div>
              <?php endif; ?>
              <?php print $content; ?>
            </div> <!-- /#main-content -->

          </div> <!-- // #content-inner -->
        </div> <!-- //#content -->

        <?php if ($right): ?>
          <div id="sidebar-right" class="column sidebar region grid-6">
            <div id="sidebar-right-inner">
              <?php print $right; ?>
            </div>
          </div> <!--//end #sidebar-right -->
        <?php endif; ?>

        </div> <!-- //end #main-wrapper -->

        <div id="footer-wrapper" class="clear-block">
          <?php if ($footer): ?>
            <div id="footer" class="clear-block">
              <?php print $footer; ?>
            </div>
          <?php endif; ?>
        </div>

      </div> <!-- //end #main -->

    </div> <!-- /#page -->

  <?php print $closure; ?>
  
  </div>
</body>
</html>