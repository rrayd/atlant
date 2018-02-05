<?php

    $values = array();
    parse_str($_POST['form'], $values);
    $to = "design@aio.media";
    $subject = $values['email'];
    $body = $values['name'];
    $body .= $values['lastname'];
    $body .= $values['telephone'];
    $body .= $values['company'];
    $body .= $values['work'];
    $body .= $values['message'];
    mail($to, $subject, $body);

?>