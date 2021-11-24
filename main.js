const timeInput = {
    name: 'time',
    data() {
        return {
            time: '',
        }
    },
    methods: {
        timeIn: function () {
            if (this.time.length <= 5) {
                let lastChar = this.time.slice(-1);
                let message = this.time.slice(0, -1);
                if (this.time.length == 3) {
                    message = message + ':';
                } else if (!isNaN(lastChar)) {
                    console.log(lastChar);
                    message = message + lastChar;
                }

                this.time = message;
            }  else {
                this.time = this.time.slice(0, -1);
            }
        }
    },
}

Vue.createApp(timeInput).mount('#main');

