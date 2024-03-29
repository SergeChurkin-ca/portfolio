window.addEventListener("DOMContentLoaded", function() {
    // get the form elements defined in your form HTML above

    let form = document.getElementById("my-form");
    let button = document.getElementById("my-form-button");
    let status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        button.style = "display: none ";
        status.innerHTML = "Thank you for your message!";
        document.getElementById("button-reset").style.display = "none";
    }

    function error() {
        status.innerHTML = "Oops! There was a problem. Please check your inputs.";
    }

    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        let data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}



// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    let rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 &&
            rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}

// active nav

$(document).ready(function() {
    $(document).on("scroll", onScroll);

});

function onScroll(event) {
    let scrollPos = $(document).scrollTop();
    $('#main-menu a').each(function() {
        let currLink = $(this);
        let refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#main-menu ul li a').removeClass("active");
            currLink.addClass("active-nav");
        } else {
            currLink.removeClass("active-nav");
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    let timer; // Variable to store the timer
    const header = document.querySelector("header");
    const wrapper = document.querySelector(".wrapper");

    function moveHeaderToRight() {
        header.style = "left: 0rem; transition: all 0.5s";
    }

    function moveHeaderToLeft() {
        header.style = "left: -10rem; transition: all 0.2s;";
    }

    function resetTimer() {
        clearTimeout(timer);
        moveHeaderToRight();
        // Set a new timer to move the header back to -10rem after 5 seconds
        timer = setTimeout(moveHeaderToLeft, 5000);
    }

    wrapper.addEventListener("mousemove", resetTimer);
    // For scroll behavior
    window.addEventListener("scroll", function() {
        resetTimer();
    });
});


// scroll down arrow

$(".js-next").click(function(e) {
    let selected = $(".js-list-item.js-current-panel");
    let anchors = $(".js-list-item");

    let pos = anchors.index(selected);
    let next = anchors.get(pos + 1);

    target = $(next);

    $(selected).removeClass("js-current-panel");
    $(next).addClass("js-current-panel");

    if (target.offset()) {
        $("html, body").animate({ scrollTop: target.offset().top + "px" }, 900);
    }

    e.preventDefault();
});



// Detect request animation frame
let scroll = window.requestAnimationFrame ||
    // IE Fallback
    function(callback) { window.setTimeout(callback, 1000 / 60) };
let elementsToShow = document.querySelectorAll('.smooth-section');

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element) {
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');
        } else {
            element.classList.remove('is-visible');
        }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();