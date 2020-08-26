$(window).on("load", function() {
    var preload = $(".preloader");
    var lines = $(".lines-grid");
    preload.find(".spinner").fadeOut(function() {
        preload.fadeOut();
        lines.addClass("loaded");
    });
});