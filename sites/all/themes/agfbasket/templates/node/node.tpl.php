<?php
// $Id$
/**
 * @file
 * node.tpl.php
 */

//  dsm($node->links);
  // foreach ($node->links as $key => $value) {
  //   print $node->links[$key]['title'];
  // }

/**
 * dsm(get_defined_vars())
 * dsm($variables['template_files']);
 * dsm($node);
 * dsm($node->content);
 * print $FIELD_NAME_rendered;
 */

/**
 * $links splitted up
 * <?php print $statistics_counter; ?>
 * <?php print $link_read_more; ?>
 * <?php print $link_comment; ?>
 * <?php print $link_comment_add ?>
 * <?php print $link_attachments; ?>
 */

/**
 * ad a class="" if we have anything in the $classes var
 * this is so we can have a cleaner output - no reason to have an empty <div class="" id="">
 */

if ($classes) {
  $classes = ' class="'. $classes . '"';
}

if ($id_node) {
  $id_node = ' id="'. $id_node . '"';
}
?>

<?php
if ($page == 0) { ?>
<div<?php print $id_node . $classes; ?>>
  <?php if ($node->title) {  ?>
  <h2><a href="<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h2>
  <?php } ?>
    
  <div class="content">
    <?php print $content;?>
  </div>

</div>

<?php
}
else{
//Content
?>
<div<?php print $id_node . $classes; ?>>
  <?php if ($node->title) {  ?>
    <h1><?php print $title;?></h1>
  <?php } ?>

  <?php if ($submitted): ?>
    <span class="submitted"><?php print $submitted ?></span>
  <?php endif; ?>

  <?php print $content ?>

  <?php print $node_region_two;?>

  <?php print $node_region_one;?>

  <?php if ($links) { ?>
    <?php  print $links; ?>
  <?php } ?>
</div>
<?php }