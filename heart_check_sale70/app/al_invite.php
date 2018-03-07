<?php

    require_once ('phpmailer/PHPMailer.php');
    require_once ('phpmailer/Exception.php');

    $values = array();
    parse_str($_POST['form'], $values);

    $body = 'Запись на прием со страницы http://promo.nebolitgolova.info/sale70/' . '<br>';
    $body .= 'Имя клиента: ' . $values['name'] . '<br>';
    $body .= 'Телефон: ' . $values['telephone'];

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {

        //Recipients
        $mail->setFrom('autoreply@atlasprof.info', 'Atlant no-reply');
        $mail->addAddress("romanova@atlasprof.info", 'Романова Наталия');           // Add a recipient
        $mail->addAddress("program@atlasprof.info", 'Irina Lozovan');               // Add a recipient

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Запись на прием! Landing 70%';
        $mail->Body    = $body;

        $mail->send();
        echo 'Заявка успешно принята! Мы свяжемся с Вами в течение 10 минут.';
    } catch (Exception $e) {
        echo 'Упс! Что-то пошло не так.';
        echo '<a href="https://sale70.aitlasprof.info">Попробуйте еще раз!</a><br>';
        echo 'Или просто позвоните: <a href="tel:+78129821690">+7 (812) 982-16-90</a><hr>';
        echo 'Возможная причина ошибки: ', $mail->ErrorInfo;
    }

?>