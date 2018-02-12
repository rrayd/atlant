<?php

    $values = array();
    parse_str($_POST['form'], $values);
    $to = "romanova@atlasprof.info";
    $body .= 'Имя клиента: ' . $values['name'];
    $body .= 'Телефон: ' . $values['telephone'];
    mail($to, $subject, $body);

?>