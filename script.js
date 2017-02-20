$(function () {
    var screen = $(".screen")[0];
    var outcome = $(".outcome")[0];

    var memorySum, lastClickedType, lastResult;

    var is_history_shown = false;

    // when a value is clicked
    $(".val").click(function () {

        //grab this link's id value
        var a = this.getAttribute("id");

        // save last entered operation and value
        if ($(this).hasClass('operation')) {
            lastResult = outcome.value;
            lastClickedType = a;
        }

        // append said value to the screen
        if (screen.innerHTML.length < 13) {
            if (screen.innerHTML === '0') {
                if (this.innerHTML === '.' || this.getAttribute('class').search('operation') > -1) {
                    screen.innerHTML += a;
                } else {
                    screen.innerHTML = a;
                }
            } else {
                screen.innerHTML += a;
            }

            // append same value to a hidden input
            outcome.value += a;
        }

        return false;
    });

    // when MR is clicked
    $(".mrecall").click(function () {

        // solve equation and put in hidden field
        outcome.value = memorySum ? memorySum : outcome.value;

        // take hidden field's value & put it on screen
        screen.innerHTML = outcome.value;

        // create and show the history list
        if (memorySum){
            record_history(screen.innerHTML, (memorySum ? "M = " : "") + outcome.value);
        }

        return false;
    });

    // when MR is clicked
    $(".msave").click(function () {

        try {
            // solve equation and put in hidden field
            outcome.value = eval(outcome.value);

            // put it in memory
            memorySum = outcome.value;
            $(".memory").show().find("small")[0].innerHTML = memorySum;

            // take hidden field's value & put it on screen
            screen.innerHTML = outcome.value;

            // create and show the history list
            record_history(screen.innerHTML, "M = " + outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when M+ is clicked
    $(".mplus").click(function () {

        try {
            // solve equation and put in hidden field
            outcome.value = eval(outcome.value);
            memorySum = memorySum ? eval(memorySum + "+" + outcome.value) : outcome.value;
            $(".memory").show().find("small")[0].innerHTML = memorySum;

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);

            // create and show the history list
            record_history(screen.innerHTML, "M = " + outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when M- is clicked
    $(".mminus").click(function () {

        try {
            // solve equation and put in hidden field
            outcome.value = eval(outcome.value);
            memorySum = memorySum ? eval(memorySum + "-" + outcome.value) : outcome.value;
            $(".memory").show().find("small")[0].innerHTML = memorySum;

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);

            // create and show the history list
            record_history(screen.innerHTML, "M = " + outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when MC is clicked
    $(".mclear").click(function () {

        try {
            delete memorySum;
            $(".memory").hide();

            // solve equation and put in hidden field
            outcome.value = eval(outcome.value) | 0;

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value) | 0;

            // create and show the history list
            record_history(screen.innerHTML, outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when % is clicked
    $(".percent").click(function () {

        try {
            // solve equation and put in hidden field
            // outcome.value = eval(lastResult + lastClickedType + );
            var lastNum = outcome.value.replace(lastResult + lastClickedType, '');
            var lastResultNum = eval(lastResult);
            var lastResultPercent = eval(lastNum + '*' + lastResultNum + '/' + 100);

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(lastResultNum + lastClickedType + lastResultPercent);

            // create and show the history list
            record_history("(" + lastResult + ")" + lastClickedType + lastNum + "%", eval(lastResultNum + lastClickedType + lastResultPercent));
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when +- is clicked
    $(".plusmn").click(function () {

        try {
            // solve equation and put in hidden field
            outcome.value = -eval(outcome.value);

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);

            // create and show the history list
            record_history("(" + screen.innerHTML + ")*(-1)", outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when sqrt is clicked
    $(".sqrt").click(function () {

        try {
            if (eval(outcome.value) >= 0) {
                // solve equation and put in hidden field
                outcome.value = Math.sqrt(eval(outcome.value));

                // create and show the history list
                record_history("&radic;<span style=\"text-decoration: overline\">" + screen.innerHTML + "</span>", outcome.value);

                // take hidden field's value & put it on screen
                screen.innerHTML = eval(outcome.value);
            } else {
                screen.innerHTML = "<div class='very-small'><p>Negative number!</p><p>Press C to continue</p></div>";
            }
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when sqr is clicked
    $(".sqr").click(function () {

        try {
            // create and show the history list
            $(".history").show().find("ul")[0].innerHTML +=
                "<li><span>(" + outcome.value + ")<sup>2</sup>" +
                "</span><br>" +
                Math.pow(eval(outcome.value), 2) +
                "</li>";

            // solve equation and put in hidden field
            outcome.value = Math.pow(eval(outcome.value), 2);

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when fraction is clicked
    $(".fraction").click(function () {

        try {
            // solve equation and put in hidden field
            outcome.value = "1/(" + outcome.value + ")";

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);

            // create and show the history list
            record_history(outcome.value, screen.innerHTML);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when equals is clicked
    $(".equal").click(function (e) {

        try {
            // solve equation and put in hidden field
            outcome.value = eval(outcome.value);

            // create and show the history list
            record_history(screen.innerHTML, outcome.value);

            // take hidden field's value & put it on screen
            screen.innerHTML = eval(outcome.value);
        }
        catch(err) {
            screen.innerHTML = "<div class='very-small'><p>Wrong format!</p><p>Press C to continue</p></div>";
        }

        return false;
    });

    // when CE is clicked
    $(".clear_last").click(function () {

        // create and show the history list
        record_history(outcome.value, lastResult);

        // solve equation and put in hidden field
        outcome.value = lastResult | 0;

        // take hidden field's value & put it on screen
        screen.innerHTML = lastResult;

        return false;
    });

    // when C is clicked
    $(".clear").click(function () {
        outcome.value = "";
        lastResult = 0;
        screen.innerHTML = 0;
        return false;
    });

    // when << is clicked
    $(".delete").click(function () {

        // solve equation and put in hidden field
        outcome.value = outcome.value.substring(0, outcome.value.length - 1);

        // take hidden field's value & put it on screen
        screen.innerHTML = outcome.value;

        return false;
    });

    // when Show history is clicked
    $(".show_history").click(function () {
        if (is_history_shown) {
            $(".history").hide();
            is_history_shown = false;
        } else {
            $(".history").show();
            is_history_shown = true;
        }
        return false;
    });

    // record history of last actions
    function record_history(firstRow, secondRow) {
        $(".history").find("ul")[0].innerHTML +=
            "<li><span>" +
            firstRow +
            "</span><br>" +
            secondRow +
            "</li>";
    }

    // map keyboard keys to calculator
    function filter(char) {
        return $("a").filter("[id='" + char + "']").click();
    }
    $(document).keydown(function (e) {
        // alert(e.which);
        filter({
            13: "=",
            187: "=",
            106: "*",
            107: "+",
            109: "-",
            189: "-",
            47: "/",
            191: "/",
            27: "c",
            67: "c",
            49: "1",
            97: "1",
            50: "2",
            98: "2",
            51: "3",
            99: "3",
            52: "4",
            100: "4",
            53: "5",
            101: "5",
            54: "6",
            102: "6",
            55: "7",
            103: "7",
            56: "8",
            104: "8",
            57: "9",
            105: "9",
            48: "0",
            96: "0"
        }[e.which]);

        if (e.which === 8) {
            outcome.value = outcome.value.slice(0, -1);
            screen.innerHTML = screen.innerHTML.slice(0, -1);
            return false;
        }
    });
});