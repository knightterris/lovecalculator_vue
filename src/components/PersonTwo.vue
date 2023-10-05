<template>
  <v-app class="background-gradient">
    <!-- Background with gradient from slightly dark to black -->
    <v-container fluid >
      <!-- Centered text -->
      <v-row align="center">
        <v-col>
          <h1 class="text-center">Hello {{ name }}</h1> <br>
          <h2 class="text-center ma-3">
            His/her impact on you
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : His/her name?</p>
          <v-text-field
            v-model="personTwoName"
            label="What is his/her name?"
            class="mt-3"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : How old is he/she?</p>
          <v-text-field
            v-model="age"
            label="What is his/her age?"
            class="mt-3"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Have you ever talked to each other?</p>
          <v-form>
            <v-radio-group v-model="selectedOption1">
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : If "Yes", what's ur feeling if u are talking with him/her?</p>
          <v-form>
            <v-radio-group v-model="selectedOption2" :disabled="selectedOption1 === 'no'">
              <v-radio label="Just normal." value="1"></v-radio>
              <v-radio label="Relaxed just for chit-chat." value="2"></v-radio>
              <v-radio label="He/she can make you comfortable." value="3"></v-radio>
              <v-radio label="Good listener and sweet talker." value="4"></v-radio>
              <v-radio label="Feels safe. Opens up everything." value="5"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : If "No" ,times that u think of him/her</p>
          <v-form>
            <v-radio-group v-model="selectedOption3" :disabled="selectedOption1 === 'yes'">
              <v-radio label="0" value="0"></v-radio>
              <v-radio
                label="When he/she posts smth."
                value="1"
              ></v-radio>
              <v-radio label="Sometimes(You think it's his/her time to flirt w you(Lolll))." value="2"></v-radio>
              <v-radio label="Think of 4-5 times." value="3"></v-radio>
              <v-radio
                label="When you get emotional."
                value="4"
              ></v-radio>
              <v-radio label="He/she is dominating me" value="5"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Can't help but check his/her social media?</p>
          <v-form>
            <v-radio-group v-model="selectedOption4">
              <v-radio label="No." value="0"></v-radio>
              <v-radio label="Tend to do so but no! (Lol)." value="1"></v-radio>
              <v-radio label="Make me stalk :3." value="2"></v-radio>
              <v-radio label="Stalk like a ghost(don't show activity but actually you do check :3)." value="3"></v-radio>
              <v-radio label="Hell yes! Over 4 times." value="4"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Have you ever dreamt abt him/her?</p>
          <v-form>
            <v-radio-group v-model="selectedOption5">
              <v-radio label="No." value="0"></v-radio>
              <v-radio label="Sometimes." value="1"></v-radio>
              <v-radio label="Sometimes sweet dreams with him/her." value="2"></v-radio>
              <v-radio label="Always think of him/her when u go to sleep even in dreams." value="3"></v-radio>
              <v-radio label="She/he is dominating me." value="4"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : If you were met with him/her in person, how will you react?</p>
          <v-form>
            <v-radio-group v-model="selectedOption6">
              <v-radio label="Go away as you have no courage and shy." value="0"></v-radio>
              <v-radio
                label="Ignore but your heart is beating fast."
                value="1"
              ></v-radio>
              <v-radio
                label="Smile at him/her and just say 'Hi'."
                value="2"
              ></v-radio>
              <v-radio
                label="Buys her/him smth(like snacks) and have a short chat."
                value="3"
              ></v-radio>
              <v-radio
                label="Ask to go out a date bravely. "
                value="4"
              ></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <!-- Spacer -->
      <v-row>
        <v-col>
          <div class="mb-4"></div>
        </v-col>
      </v-row>

      <!-- Next button in the bottom right corner -->
      <v-row class="mt-4">
        <v-col class="text-right">
          <v-btn @click="backPage()" class="mx-3" color="primary">Back</v-btn>
          <v-btn @click="calculateScore()" class="mx-3" color="primary" :disabled="btnDisabled">Calc</v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="loadingDialog" max-width="500">
      <v-card class="background-gradient">
        <v-card-text>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary" size="65"></v-progress-circular>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <h2 class="loading-text">Please wait, we are calculating...</h2>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="messageDialog" max-width="700">
      <v-card class="background-gradient">
        <v-card-text>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <h1 class="text-center">The score is {{ total  }}</h1>
              <h2 class="">{{ message }}</h2>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="closeMessageDialog" color="red">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedOption1: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      selectedOption5: null,
      selectedOption6: null,
      loadingDialog: false,
      messageDialog: false,
      name:"",
      firstResult: "",
      personTwoName:"",
      age:"",
      total:"",
      message:"",
    };
  },
  computed: {
    btnDisabled() {
      if (
        this.selectedOption1 === "yes" && 
        this.selectedOption2 != null &&
        this.selectedOption4 != null &&
        this.selectedOption5 != null &&
        this.selectedOption6 != null 
        ) {
        return false;
      } else if (
        this.selectedOption1 === "no" &&
        this.selectedOption3 != null &&
        this.selectedOption4 != null &&
        this.selectedOption5 != null &&
        this.selectedOption6 != null 
        ) {
        return false;
      }else{
      return true;
      }
    }
  },
  methods: {
    backPage() {
      this.$router.push("/");
    },
    calculateScore(){
      const score1 = this.selectedOption1;
      const score2 = this.selectedOption2;
      const score3 = this.selectedOption3;
      const score4 = this.selectedOption4;
      const score5 = this.selectedOption5;
      const score6 = this.selectedOption6;
      
        if (score1 === "yes") {
        const result = score2 * 1 + score4 * 1 + score5 * 1 + score6 * 1;
        const semiTotal = result + this.firstResult * 1;
        // console.log(Math.floor(Math.random() * 100) + semiTotal);
        const finalTotal = Math.floor(Math.random() * 100) + semiTotal;
        if(finalTotal > 100 || finalTotal >= 100 || finalTotal == 100){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
            this.total = 100 + "%";
            this.message = "Oh! You have a great result. Keep going. I do hope you two fall in love"
            this.messageDialog = true
        }else if(50 < finalTotal && finalTotal < 100){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
            this.total = finalTotal + "%";
            this.message = "Not bad. I think both of you should wait and study each other to know well."
            this.messageDialog = true
        }else if(finalTotal < 50){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
          this.total = finalTotal
          this.message = "Hmm, this result is not the one you expected. You should move on or keep going. (It depends on you. This is just a piece of my advice)"
          this.messageDialog = true
        }
        
      } else if (score1 === "no") {
        const result = score3 * 1 + score4 * 1 + score5 * 1 + score6 * 1;
        const semiTotal = result + this.firstResult * 1;
        const finalTotal = Math.floor(Math.random() * 100) + semiTotal;
        if(finalTotal > 100 || finalTotal >= 100 || finalTotal == 100){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
            this.total = 100 + "%";
            this.message = "Oh! You have a great result. Keep going. I do hope you two fall in love"
            this.messageDialog = true
        }else if(50 < finalTotal && finalTotal < 100){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
            this.total = finalTotal + "%";
            this.message = "Not bad. I think both of you should wait and study each other to know well."
            this.messageDialog = true
        }else if(finalTotal < 50){
          this.loadingDialog = true;
          setTimeout(() => {
            this.loadingDialog = false;
          }, 3000);
          this.total = finalTotal
          this.message = "Hmm, this result is not the one you expected. You should move on or keep going. (It depends on you. This is just a piece of my advice)"
          this.messageDialog = true
        }
      }
    },
    closeMessageDialog(){
      this.messageDialog = false;
      sessionStorage.removeItem("result1");
      this.$router.push("/");
    }
  },
  created() {
    var name = localStorage.getItem("name");
    var firstResult = sessionStorage.getItem("result1") ? sessionStorage.getItem("result1") : 0;
    this.firstResult = firstResult;
    if(!name){
      this.name = "";
    }else if(name){
      this.name = name;
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nova+Cut&display=swap');
*{
  font-family: 'Nova Cut', cursive;
}
.background-gradient {
  background: linear-gradient(to bottom, #333, #000);
  color: white;
}
.loading-text {
  font-size: 18px;
  padding: 10px 0;
}
.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > .v-sheet, .v-dialog > .v-overlay__content > form > .v-card, .v-dialog > .v-overlay__content > form > .v-sheet{
  overflow-y: hidden !important;
}
</style>
