window.onload = function(){
    let login_form = $('#login-form');
    let log = $('#login-button');
    let reg = $('#register-button');

    log.addEventListener('click', function(){
        login_form.submit();
    });
    reg.addEventListener('click', function(){
        window.location.href = '../register/register';
    });

}
