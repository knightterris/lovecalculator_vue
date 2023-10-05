<template>
  <v-app class="background-gradient">
    <!-- Background with gradient from slightly dark to black -->
    <v-container fluid>
      <!-- Centered text -->
      <v-row align="center">
        <v-col>
            <h1 class="text-center">Hello {{ name }}</h1>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : How old are you?</p>
          <v-text-field
            v-model="age"
            label="What is your age?"
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
          <p class="question">Q : If "Yes",</p>
          <v-form>
            <v-radio-group v-model="selectedOption2" :disabled="selectedOption1 === 'no'">
              <v-radio label="He/She is just flirting w me 😮‍💨." value="1"></v-radio>
              <v-radio label="He/She is friendly." value="2"></v-radio>
              <v-radio label="He/She makes me flutter with words." value="3"></v-radio>
              <v-radio label="Share warm messages each other." value="4"></v-radio>
              <v-radio
                label="Share every details abt his/her daily routine, knows privacy and have mutual respect."
                value="5"
              ></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : If "No" ,</p>
          <v-form>
            <v-radio-group
              v-model="selectedOption3"
              :disabled="selectedOption1 === 'yes'"
            >
              <v-radio label="Hasn't been noticed! (One sided :3)" value="1"></v-radio>
              <v-radio
                label="Know each other online but never talked!"
                value="2"
              ></v-radio>
              <v-radio label="You often react his/her posts." value="3"></v-radio>
              <v-radio label="You think he/she will make first move." value="4"></v-radio>
              <v-radio
                label="You think both of you know each other, but one of us is afraid to have a chat."
                value="5"
              ></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Have you ever saved his/her photos?</p>
          <v-form>
            <v-radio-group v-model="selectedOption4">
              <v-radio label="No." value="0"></v-radio>
              <v-radio label="Tend to do so but no! (Lol)." value="1"></v-radio>
              <v-radio label="React but don't save." value="2"></v-radio>
              <v-radio label="Yes but some of them." value="3"></v-radio>
              <v-radio label="Have a collection of his/hers." value="4"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Have you ever seen each other irl?</p>
          <v-form>
            <v-radio-group v-model="selectedOption5">
              <v-radio label="No." value="0"></v-radio>
              <v-radio label="Know online but not irl." value="1"></v-radio>
              <v-radio label="One of us has seen me/him." value="2"></v-radio>
              <v-radio label="Yes" value="3"></v-radio>
              <v-radio label="Above 4 times(just two of you :3)" value="4"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="6">
          <p class="question">Q : Rate him/her.</p>
          <v-form>
            <v-radio-group v-model="selectedOption6">
              <v-radio label="Not that attractive." value="0"></v-radio>
              <v-radio
                label="Cute/handsome but cannot attract me that much."
                value="1"
              ></v-radio>
              <v-radio
                label="Charming, If I have a chance, I wanna be his/her bf/gf."
                value="2"
              ></v-radio>
              <v-radio
                label="Love his/her both looks and personality."
                value="3"
              ></v-radio>
              <v-radio
                label="Can get lovesick or already been cause of him/her. "
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
          <v-btn @click="nextPage()" color="primary" :disabled="btnDisabled">Next</v-btn>
        </v-col>
      </v-row>

      <!-- Dialog for input -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="background-gradient">
          <v-card-title>Hello there 🤩</v-card-title>
          <v-card-text>
            <v-text-field v-model="inputValue" label="What is your name?"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="saveName()" color="primary">Submit</v-btn>
            <v-btn @click="closeDialog" color="red">Cancel</v-btn>
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
      dialog: false,
      inputValue: "",
      name: "",
      age:""
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
    nextPage() {
      const score1 = this.selectedOption1;
      const score2 = this.selectedOption2;
      const score3 = this.selectedOption3;
      const score4 = this.selectedOption4;
      const score5 = this.selectedOption5;
      const score6 = this.selectedOption6;
      if (score1 === "yes") {
        const result = score2 * 1 + score4 * 1 + score5 * 1 + score6 * 1;
        sessionStorage.setItem("result1", result);
      } else if (score1 === "no") {
        const result = score3 * 1 + score4 * 1 + score5 * 1 + score6 * 1;
        sessionStorage.setItem("result1", result);
      }
      this.$router.push("/personTwo");
    },
    closeDialog() {
      this.dialog = false;
    },
    saveName() {
      const name = this.inputValue;
      localStorage.setItem("name", name);
      this.name = name;
      this.dialog = false;
    },
  },
  created() {
    var name = localStorage.getItem("name");
    if (!name) {
      this.dialog = true;
    } else if (name) {
      this.dialog = false;
      this.name = name;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nova+Cut&display=swap");
* {
  font-family: "Nova Cut", cursive;
}
.background-gradient {
  background: linear-gradient(to bottom, #333, #000);
  color: white;
  /* height: 100vh; */
}
</style>
