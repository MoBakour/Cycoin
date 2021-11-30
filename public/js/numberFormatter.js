function numberFormatter(num, format) {
    switch(true) {
        case format.startsWith("number"):
            let divideBy = 1;
            let suffix = "";
            let formattedNum;

            if (num > 1000 && num < 1000000) { divideBy = 1000; suffix = "K"; }
            if (num > 1000000 && num < 1000000000) { divideBy = 1000000; suffix = "M"; }
            if (num > 1000000000 && num < 1000000000000 <= 12) { divideBy = 1000000000; suffix = "B"; }
            if (num > 1000000000000 && num < 1000000000000000) { divideBy = 1000000000000; suffix = "T"; }
            if (num > 1000000000000000 && num < 1000000000000000000) { divideBy = 1000000000000000; suffix = "Q"; }
            
            if (format.endsWith("int")) formattedNum = Math.round(num / divideBy);
            else formattedNum = (num / divideBy).toFixed(1);

            return `${formattedNum}${suffix}`;
        break;
        case format == "date":
            num = new Date(num);
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let year = num.getFullYear();
            let month = months[num.getMonth()];
            let date = num.getDate();

            let time = () => {
                let ufh = num.getHours();
                let mins = num.getMinutes();

                let mn = () => {
                    if (mins < 10) return `0${mins}`;
                    else return mins;
                }

                if (ufh == 0) return `12:${mn()} AM`;
                else if (ufh > 12) return `${ufh - 12}:${mn()} PM`;
                else return `${ufh}:${mn()} AM`;
            }

            return `${date} ${month}, ${year} - ${time()}`;
        break;
        case format == "weight":
            if (num > 999) return `${(num / 1000).toFixed(2)} kg`;
            else return num + " g";
        break;
    }
}

/* Number Formatting */
const allNumberFormat = document.querySelectorAll(".number-formatter");
allNumberFormat.forEach(el => {
    let format = el.getAttribute("data-format");
    let num = el.getAttribute("data-number");
    el.innerText = numberFormatter(num, format);
});