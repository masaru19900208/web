export default {
    getParameterByHash(name) {
        let wHash = window.location.hash; //ハッシュ(#)以降をとる
        wHash = wHash.replace('#', '&'); //↓の処理を使いたいがために#を&に変換するorzorz
        name = name.replace(/[[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(wHash);
        if (!results) return null;
        if (!results[2]) return null;
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    // requestGateway() {
    //     console.log("start request gataway")
    //     let idToken = localStorage.idToken;
    //     let headers = {
    //         headers: {
    //             'Authorization': idToken
    //         }
    //     };
    //     let url = 'https://----------------Lambda';
    //     const request = window.axios.create({});
    //     request.get(url, headers)
    //         .then(function (response) {
    //             console.log("結果発表ーーー")
    //             console.dir("結果：" + response);
    //         });
    // },
    checkSession() {
        //パスパラメータの取得
        let idToken = this.getParameterByHash('id_token');
        let accessToken = this.getParameterByHash('access_token');
        //エラーならログインページに遷移
        if (idToken == null || accessToken == null) {
            window.location.href = process.env.VUE_APP_COGNITOPOINT;
        }
        // //ユーザー情報取得
        const requestAws = window.axios.create({});
        requestAws.get(process.env.VUE_APP_COGNITOCHECKPOINT, {
            headers: {
                Authorization: " Bearer " + accessToken
            }
        })
            .then(function (response) {
                let responseJson = JSON.parse(JSON.stringify(response));
                let storage = localStorage;
                storage.setItem("idToken", idToken);
                storage.setItem("accessToken", accessToken);
                storage.setItem("email", responseJson.data.email);
                storage.setItem("phone", responseJson.data.phone_number);
                storage.setItem("username", responseJson.data.username);
            })
            .catch(function (err) {
                console.log(err)
                window.location.href = process.env.VUE_APP_COGNITOPOINT;
            })
    },

}