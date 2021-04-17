window.onload = function(){
    let login_form = $('#login-form');
    let sub = $('#login-button');
    let reg = $('#register-button');

    sub.addEventListener('click', function(){
       login_form.submit();
    });
}
