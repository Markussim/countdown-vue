let countDownDate = null;

if (localStorage.getItem("time") != null) {
    countDownDate = new Date(parseInt(localStorage.getItem("time")));
}

const timeInput = {
    name: 'timeInput',
    data() {
        return {
            time: '',
            hideClass: "",
            disabled: false,
            times: []
        }
    },
    methods: {
        timeIn: function () {
            if (this.time.length <= 5) {
                let lastChar = this.time.slice(-1);
                let message = this.time.slice(0, -1);
                if (this.time.length == 3) {
                    message = message + ':';
                    if (!isNaN(lastChar)) {
                        message += lastChar;
                    }
                } else if (!isNaN(lastChar)) {
                    message = message + lastChar;
                }

                this.time = message;
            } else {
                this.time = this.time.slice(0, -1);
            }

            const regex = /[0-2][0-9]:[0-5][0-9]/;

            if (regex.test(this.time)) {
                this.hideClass = "hidden";
                this.disabled = true;

                countDownDate = new Date(Date.now());

                countDownDate.setHours(this.time.slice(0, 2));
                countDownDate.setMinutes(this.time.slice(3, 5));
                countDownDate.setSeconds(0);
                countDownDate.setMilliseconds(0);

                localStorage.setItem("time", countDownDate.getTime());
            } else {
                this.hideClass = "";
                this.disabled = false;
                countDownDate = null;
            }
        },

        clearTime: function () {
            this.time = '';
            this.hideClass = "";
            this.disabled = false;
            countDownDate = null;
        }
    },
    mounted() {
        function updateTime(that) {
            if (countDownDate && countDownDate < Date.now()) {
                document.getElementById("clear").click();
            }

            if (countDownDate) {
                document.getElementById("timeInput").value = addLeadingZeros(countDownDate.getHours()) + ':' + addLeadingZeros(countDownDate.getMinutes());
                document.getElementById("timeInput").dispatchEvent(new Event('input'));

            }

            if (countDownDate) {
                that.times[0] = { time: ((countDownDate - Date.now()) / (1000)).toFixed(3), unit: 'seconds' };

                that.times[1] = { time: ((countDownDate - Date.now()) / (1000 * 60)).toFixed(3), unit: 'minutes' };

                that.times[2] = { time: ((countDownDate - Date.now()) / (1000 * 60 * 60)).toFixed(3), unit: 'hours' };
            } else {
                that.times = [];
            }

            window.requestAnimationFrame(() => {
                updateTime(that);
            })
        }

        window.requestAnimationFrame(() => {
            updateTime(this);
        })


    }
}

Vue.createApp(timeInput).mount('#main');

function addLeadingZeros(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}