<template>
  <div id="helloWorld">
    <h1>Home Security dApp Example</h1>
    <div id="tabs">
      <vs-tabs :color="tabColor">
        <!-- History Tab -->
          <vs-tab @click="colorx = '#3700ff'" label="Latest" id="header">
            <hr id="divider" />
              <div id="divLatest">
                <table>
                  <thead>
                    <tr>
                      <th>Block</th>
                      <th>Time</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="hash2 in latestData"
                      id="tRow"
                      :key="hash2.index"
                      style="color: #a5a5aa;"
                    >
                      <td>{{ hash2.index }}</td>
                      <td id="time">{{ hash2.timestamp | moment("from", "now") }}</td>
                      <td id="trans">{{ hash2.transactions[0][1][0] }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- Alert Switch -->
                <v-switch
                  class="switchOne"
                  color="primary"
                  inset
                  v-model="switch1"
                  @change="checkInput"
                ></v-switch>
                <p id="switchLabel">ALERTS</p>
              </div>
          </vs-tab>

      <!-- History Tab -->
        <vs-tab label="History">
          <hr id="divider" />
            <div id="divHistory">
                <v-progress-circular
                  style="margin-top: 30px;"
                  indeterminate
                  color="primary"
                  v-show="visible2"
                ></v-progress-circular>
              <table id="example" v-show="visible">
                <thead>
                  <tr>
                    <th>Block</th>
                    <th>Timestamp</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="hash in historyData" id="tRow" :key="hash.index">
                    <td>{{ hash.index }}</td>
                    <td id="timestamp">{{ hash.timestamp | moment("M/D/YY, h:mm:ss A") }}</td>
                    <td id="transact">{{ hash.transactions[0][1][0] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import iotapp from "iotapp-api";
import moment from "vue-moment";

//Chime Alert
var alertData = { soundurl: "https://leaningbarnsoftware.com/chime.mp3" };

export default {
  data() {
    return {
      latestData: [],
      historyData: [],
      tabColor: "#3700ff",
      polling: null,
      polling2: null,
      visible: false,
      visible2: true,
      switch1: false,
      alertData: alertData,
    };
  },

    created() {
    this.pollData();
    setTimeout(() => (this.visible2 = false), 2000);
    setTimeout(() => (this.visible = true), 2000);
  },

  
  mounted() {
    // Pass Your App Keys
    iotapp.getPrivateChain("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp","3imNnMduakmu6JmFafIxnu8WJj28BjQI")
      .then((data) => (this.historyData = data))
      .catch((err) => console.log("Error occurred:", err));

    iotapp.getLatestTx("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp","3imNnMduakmu6JmFafIxnu8WJj28BjQI")
      .then((data) => (this.latestData = data))
      .catch((err) => console.log("Error occurred:", err));

    // Format the timestamps
    moment().format("HH:mm:ss");
  },

  updated() {

    //Datatable settings and styles
    $.fn.dataTable.ext.errMode = "none";
    $("#example").DataTable({
      dom: ' <"search"f><"top">rt<"bottom"p><"clear">',
      aaSorting: [[0, "desc"]],
      pageLength: 10,
      aoColumnDefs: [{ bSortable: false, aTargets: [1, 2] }],
      language: {
        search: "_INPUT_", // Removes the 'Search' field label
      },
    });

    $(".dataTables_filter input")
      .attr("placeholder", " Search by Block or Timestamp")
      .css({
        width: "320px",
        height: "35px",
        marginTop: "20px",
        marginLeft: "-340px",
        position: "absolute",
        color: "white",
        backgroundColor: "black",
        border: "2px solid #0000ee",
        borderRadius: "5px",
        paddingLeft: "13px",
        fontSize: "15px",
      });
  },

  methods: {
    //Polls getLatestTx() every 2 seconds interval. Send updates
    pollData() {
      this.polling = setInterval(() => {
        iotapp.getLatestTx("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp", "3imNnMduakmu6JmFafIxnu8WJj28BjQI")
          .then((data) => (this.latestData = data))
          .catch((err) => console.log("Error occurred:", err));
      }, 2000);
    },

    pollAlert() {
      this.polling2 = setInterval(() => {
        var valueDiv = document.getElementById("tRow").innerText;
        if (valueDiv.includes("a few seconds ago")) {
          console.log("Alert to Movement");
          var audio = new Audio(this.alertData.soundurl);
          audio.play();
        } else {
          console.log("no movements");
        }
      }, 2000);
    },

    checkInput(value) {
      if (value) this.pollAlert();
      else location.reload(true);
    },
  },

  beforeDestroy() {
    clearInterval(this.polling);
    clearInterval(this.polling2);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap");

html {
  background: #0f1117;
  width: 100vw;
}
#helloWorld {
  background: #0f1117;
  width: 100vw;
  height: 125%;
  z-index: 0;
  position: absolute;
  overflow-y: scroll !important;
  color: hsl(220, 6%, 61%);
  font-weight: 700;
  font-size: 20px;
  border: none;
}

#divider {
  margin-top: -9px;
  height: 2px;
  opacity: 0.2;
  border-bottom: none;
  margin-right: 50px;
  z-index: 1;
}

h1 {
  color: white;
  z-index: 100;
  position: absolute;
  font-weight: 600;
  font-size: 30px;
  margin-top: 80px;
  margin-left: 50px;
  font-family: "Inter", sans-serif;
}

#tabs {
  margin-top: 150px;
  margin-left: 50px;
  margin-right: 50px;
}

th {
   text-align: center;
   font-size: 15px;
   color: #757575;
   font-family: 'Inter', sans-serif;
}

td {
  padding: 10px;
  font-weight: 100;
  font-size: 15px;
  background-color: #0f1117;
}

#divLatest {
  height: 100vh;
  overflow-y: hidden !important;
  margin-bottom: -227px;
  margin-top: 20px;
}

#example {
  margin-top: 50px !important;
  text-align: center;
  margin-bottom: 50px;
  border-radius: 10px;
  background-color: #0f1117;
  padding-top: 60px;
  padding-bottom: 20px;
}

.switchOne {
  margin-left: 20px;
  width: 56px;
  height: 34px;
  padding-left: 7px;
  border: solid #3700ff 1px;
  border-radius: 20px;
}

#switchLabel {
  float: left;
  color: #3700ff;
  font-size: 16px;
  margin-top: -28px;
  margin-left: 90px;
  letter-spacing: 1px;
  font-weight: 900;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  #helloWorld {
    zoom: 0.6;
    overflow: scroll;
    height: 100%;
  }

  #btnAlert {
    width: 160px;
    margin-top: 70px;
  }

  h1 {
    font-size: 20px;
  }
}
</style>
