export default {
    data: {
        currentlat: 35.2288635,
        currentlon: 138.9058909,
        datetime: 0,
        fuelh2: 0,
        dcpsplst: 0,
        pwsplt_f: 0,
        pwsplw_f: 0,
        sp1: 0,
        outtmp: 0,
        TTL: 0,
    },
    getawsdata() {
        let self = this;
        var url = process.env.VUE_APP_AWSTRUCKPOINT;
        async function fetchget() {
            const res = await fetch(url);
            const json = await res.json();
            self.data.currentlat = json.Items[0].ido;
            self.data.currentlon = json.Items[0].keido;
            self.data.datetime = json.Items[0].datetime;
            self.data.fuelh2 = json.Items[0].fuelh2;
            self.data.dcpsplst = json.Items[0].dcpsplst;
            self.data.pwsplt_f = json.Items[0].pwsplt_f;
            self.data.pwsplw_f = json.Items[0].pwsplw_f;
            self.data.sp1 = json.Items[0].sp1;
            self.data.outtmp = json.Items[0].outtmp;
            self.data.TTL = json.Items[0].TTL
            // console.log(json);
        }
        fetchget()
        // fetch(url)
        //     .then(function (data) {
        //         console.log("return json")
        //         return data.json();
        //     })
        //     .then(function (json) {
        // self.data.TTL = json.Items[0].TTL
        //         // return json
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         window.alert("エラーが発生しました。ウェブページを再読み込みしてください getaws")
        //     });
    },
    asynctest() {
        var url = process.env.VUE_APP_AWSTRUCKPOINT;
        return fetch(url)
    }
}