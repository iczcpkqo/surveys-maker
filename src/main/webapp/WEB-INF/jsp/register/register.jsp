<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--    control-->
    <link rel="stylesheet" href="../../../static/css/xiang_control/base.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/bar.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/container.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/button.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/input.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/text.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/label.css">


    <!--   page -->
    <link rel="stylesheet" href="../../../static/css/login/login.css">
    <script src="../../../static/js/xiang_control/base.js"></script>
    <script src="../../../static/js/data_processing/data-processing.js"></script>
    <script src="../../../static/js/login/login.js"></script>
</head>
<body class="xiang-control login register">
<div class="page-contain">
    <div class="login-contain">
        <div class="tit-con">
            <div class="tit">
                <a class="label-5">
                    Register
                </a>
            </div>
        </div>
        <form id="login-form" class="input-con">

            <div class="input-li">
                <div class="input-label label-4">
                    <label>
                        E-mail
                    </label>
                </div>
                <div class="input-text">
                    <input name="email" type="text" class="txt-1" placeholder="Input your e-mail">
                </div>
            </div>

            <div class="input-li">
                <div class="input-label label-4">
                    <label>
                        Password
                    </label>
                </div>
                <div class="input-text">
                    <input name="password" type="text" class="txt-1" placeholder="Input your password">
                </div>
            </div>

            <div class="input-li">
                <div class="input-label label-4">
                    <label>
                        Re-enter Password
                    </label>
                </div>
                <div class="input-text">
                    <input name="second_password" type="text" class="txt-1" placeholder="Input your password">
                </div>
            </div>

        </form>


        <div class="button-con">
            <a id="login-button" class="btn-1">
                Login
            </a>
            <a id="register-button" class="btn-1">
                Register
            </a>
        </div>
    </div>
</div>
</body>
</html>
