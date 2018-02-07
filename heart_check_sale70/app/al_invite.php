<?php

    $values = array();
    parse_str($_POST['form'], $values);
    $to = "design@aio.media";
    $body = $values['name'];
    $body .= $values['telephone'];
    mail($to, $subject, $body);

?>