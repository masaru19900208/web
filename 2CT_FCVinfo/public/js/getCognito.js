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
    //     let url = 'https://t05q426oy4.execute-api.ap-northeast-1.amazonaws.com/default/cognitoLambda';
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
            window.location.href = 'https://masarutest001.auth.ap-northeast-1.amazoncognito.com/login?client_id=6s0ek26ks3a8ggrn6l9mtqardo&response_type=token&scope=openid&redirect_uri=http://localhost:8080';
        }
        // //ユーザー情報取得
        const requestAws = window.axios.create({});
        requestAws.get('https://masarutest001.auth.ap-northeast-1.amazoncognito.com/oauth2/userInfo', {
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
                window.location.href = 'https://masarutest001.auth.ap-northeast-1.amazoncognito.com/login?client_id=6s0ek26ks3a8ggrn6l9mtqardo&response_type=token&scope=openid&redirect_uri=http://localhost:8080';
            })
    },

}