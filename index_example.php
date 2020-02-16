<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>insta_token</title>
</head>
<body>
<a href="https://developers.facebook.com/docs/instagram-api/reference/media?locale=ja_JP" target="_blank">IGメディア</a>
<ul>
	<?php
	$num   = 50;
	$fb_api = 'https://graph.facebook.com/v6.0/';
	$insta_id = '';
	$token = '';
	$query = 'media.limit('. $num. '){caption,like_count,media_url,permalink,timestamp,username,thumbnail_url,shortcode,children}'; 

	$url = "{$fb_api}{$insta_id}?fields={$query}&access_token={$token}";
	var_dump($url);
	$insta_json  = file_get_contents($url);
	$insta_data  = json_decode($insta_json);
	?>
	<?php
	foreach((array)$insta_data->media->data as $post){ ?>
		<li>
			<?php
			echo '<pre style="font-size: 10px;">';
			var_dump($post);
			echo '</pre>';
			?>
			<a href="<?php echo $post->permalink; ?>" target="_blank">
			<img src="<?php echo $post->media_url; ?>" width="150">
			</a>
		</li>
	<?php } ?>
</ul>
</body>
</html>