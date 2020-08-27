$("#cform").validate({
    ignore: ".ignore",
    rules: {
        name: {
            required: true,
        },
        message: {
            required: true,
        },
        email: {
            required: true,
            email: true,
        },
        hiddenRecaptcha: {
            required: function() {
                if (grecaptcha.getResponse() == "") {
                    return true;
                } else {
                    return false;
                }
            },
        },
    },
    success: "valid",
    submitHandler: function() {
        $.ajax({
            url: "mailer/feedback.php",
            type: "post",
            dataType: "json",
            data: "name=" +
                $("#cform").find('input[name="name"]').val() +
                "&email=" +
                $("#cform").find('input[name="email"]').val() +
                "&message=" +
                $("#cform").find('textarea[name="message"]').val(),
            beforeSend: function() {},
            complete: function() {},
            success: function(data) {
                $("#cform").fadeOut();
                $(".alert-success").delay(1000).fadeIn();
            },
        });
    },
});