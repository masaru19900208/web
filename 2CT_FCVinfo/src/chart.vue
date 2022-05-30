<template>
  <transition name="fade">
    <div id="overlay" v-if="isshow" @click="isshow = !isshow">
      <div id="viecont" @click="stopevent">
          <input id="getnum" type="range" min="1" max="30"> <label for="getnum" id="getnumResult">スライダーで回帰直線追加</label>
          <p id="resultNum"></p>
          <div style="height:60vh; width:100%;">
            <canvas id="myChart"></canvas>
          </div>
      </div>
    </div>
  </transition>
  <div style="background-color: #303535; text-align: center;">
    <a type="button" data-target="#Commentary" style="color: #ededed;" @click="showchart">データグラフ</a>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "v_chart",
  // components: {
  //   HelloWorld,
  // },
  data(){
    return{
      isshow : false
    }
  },
  methods:{
    stopevent: function(){
      event.stopPropagation()
    },

    showchart: function() {
      let scriptElchar = document.createElement('script')
      scriptElchar.setAttribute('src', `https://cdn.jsdelivr.net/npm/chart.js`)
      document.head.appendChild(scriptElchar)
      this.isshow = !this.isshow
      async function sampleResolve() {
        try {
            const response = await fetch(`${process.env.VUE_APP_AWSCHARTPOINT}?getNum=100`, {
                method: "GET",
                mode: 'cors'
            });
            if (response.ok) {
                const resJson = await response.json();
                // console.log(JSON.stringify(resJson))
                // return JSON.stringify(resJson);
                return resJson
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error(error);
        }
      }
      let sliderNum_gr = 0;
      const scatterDataArr = [];
      sampleResolve().then((getChartData) => {
        const dateData = getChartData.datetime.map((e) => e.slice(0, 19).replace("T", " "));
        getChartData.fuelh2.forEach((value, index) => {
            scatterDataArr.push({ 'x': index, 'y': value, 'date': dateData[index] })
        });
        const labels = dateData;
        const data = {
            labels: labels,
            datasets: [{
                label: '水素残量[%]',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: scatterDataArr,
                showLine: true,
                tension: 0.5,
                borderWidth: 1
            }]
        };
        const config = {
            type: 'scatter',
            data: data,
            options: {
                layout: {
                    padding: {
                        right: 30
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                let befTime = Math.floor(new Date(dateData[tooltipItem.dataIndex]).getTime() / 1000);
                                let aftTime = Math.floor(new Date(dateData[dateData.length - 1]).getTime() / 1000);
                                // console.log(tooltipItem.raw.date);
                                return `取得日時: ${tooltipItem.raw.date} | データ値: ${tooltipItem.formattedValue} | 最新データから ${befTime - aftTime}秒前`
                            },
                        },
                    },
                },
                maintainAspectRatio: false,
            },
        };
        const myChart = new window.Chart(
            document.getElementById('myChart'),
            config
        );
        let myfunc = (e) => {
            sliderNum_gr = Number(document.getElementById("getnum").value);
            document.getElementById("getnumResult").innerText = sliderNum_gr + "個データで回帰直線";
            let addChartDataArr = scatterDataArr.slice();
            addChartDataArr.splice(0, 30 - sliderNum_gr);
            console.log(e.isTrusted);

            var sx = 0;
            var sy = 0;
            var sxy = 0;
            var sxsq = 0;
            var xmean;
            var ymean;
            var alpha;
            var beta;
            var n;
            let expandChartNum = 600; //1Hr先

            addChartDataArr.forEach(function (val) {
                sx += val.x;
                sy += val.y;
                sxy += val.x * val.y;
                sxsq += Math.pow(val.x, 2);
            });
            n = addChartDataArr.length;
            xmean = sx / n;
            ymean = sy / n;
            beta = ((n * sxy) - (sx * sy)) / ((n * sxsq) - (Math.pow(sx, 2)));
            alpha = ymean - (beta * xmean);
            var regressionLinePlot = [];

            // 回帰直線を伸ばす用の配列追加,別に中身無くてもイイんだけどね。。。
            for (let i = 0; i < expandChartNum; i++) {
                addChartDataArr.push({ 'x': addChartDataArr[addChartDataArr.length - 1].x + 1, 'y': 0 })
            }
            addChartDataArr.forEach(function (val, index) {
                if (index < addChartDataArr.length - expandChartNum) {
                    regressionLinePlot.push({ 'x': val.x, 'y': alpha + beta * val.x, 'date': dateData[index + 30 - sliderNum_gr] });
                } else {
                    let data_date_temporary = new Date(dateData[dateData.length - 1]);
                    let date_date_temporary_num = data_date_temporary.setSeconds(data_date_temporary.getSeconds() + (6 * Math.abs(addChartDataArr.length - 1 - expandChartNum - index)));
                    let DDTN = new Date(date_date_temporary_num);
                    regressionLinePlot.push({ 'x': val.x, 'y': alpha + beta * val.x, 'date': DDTN.getFullYear() + "-" + Number(DDTN.getMonth() + 1) + "-" + DDTN.getDate() + " " + DDTN.getHours() + ":" + DDTN.getMinutes() + ":" + DDTN.getSeconds() });
                }
            });
            // console.log(regressionLinePlot);
            if (myChart.data.datasets.length > 1) {
                myChart.data.datasets.pop();
            }
            myChart.data.datasets.push(
                {
                    label: '回帰直線',
                    backgroundColor: 'rgb(185, 99, 132)',
                    borderColor: 'rgb(185, 99, 132)',
                    data: regressionLinePlot,
                    showLine: true,
                    pointRadius: 1,
                    hitRadius: 1,
                    borderWidth: 1
                }
            );
            myChart.update();
        }
        document.getElementById("getnum").addEventListener("change", myfunc);
      });
    }
  },
  // mounted(){
  //   window.onload = () => {
  //       async function sampleResolve() {
  //       try {
  //           const response = await fetch(`${process.env.VUE_APP_AWSCHARTPOINT}?getNum=30`, {
  //               method: "GET",
  //               mode: 'cors'
  //           });
  //           if (response.ok) {
  //               const resJson = await response.json();
  //               // return JSON.stringify(resJson);
  //               return resJson
  //           } else {
  //               throw new Error('Network response was not ok.');
  //           }
  //       } catch (error) {
  //           console.error(error);
  //       }
  //     }
  //   }

  // }
};
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}



#overlay {
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#viecont {
  z-index:2;
  width:70%;
  padding: 1em;
  background:#fff;
}

</style>