$(document).ready(function () {
    $(".dropdown-trigger").dropdown({
        autoTrigger: true,
        hover: true,
        coverTrigger: false
    });
    $(document).ready(function () {
        $('.sidenav').sidenav({
            draggable: true
        });
    });

    $(".sidenav a").on('click', function () {
        $("#sidenav-geral").sidenav();
    });
});