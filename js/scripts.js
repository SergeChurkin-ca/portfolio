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

// Add class 'active' to section when near top of viewport
// Define the style of active view and indicate in navbar


window.addEventListener('scroll', () => {
    const isInViewPort = function(elem) {
        let bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight - 150 || document.documentElement.clientHeight - 150) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    for (let i = 0; i < section.length; i++) {
        const addСlassActive = document.querySelectorAll('div')[i + 1];
        const addNavActive = document.querySelectorAll('li')[i];
        let sectionTitle = document.querySelectorAll('title-big')[i];
        if (isInViewPort(sectionTitle)) {
            addСlassActive.classList.add('active');
            addNavActive.classList.add('active-nav')
            addСlassActive.style = 'padding: 0 1em 0; border-radius: 0.5em; border-style: outset; box-shadow: 0.1em 0.1em 0.9em 0.2em white; transition: ease 0.7s; opacity: 2';
            addNavActive.style = "background-color: coral; border-radius: 0.5em; border: solid 0.1em";
        } else if (!isInViewPort(sectionTitle)) {
            addСlassActive.classList.remove('active')
            addNavActive.classList.remove('active')
            addСlassActive.style = "none";
            addNavActive.style = "none";
        }
    }
});