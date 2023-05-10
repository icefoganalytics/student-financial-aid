<template>
  <v-form @submit.prevent="submit" v-model="valid">
    <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
      <v-card-text>
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address") }}</h3>
        <v-divider class="my-3" />
        <AddressSelector v-model="application.draft.addresses.home_address1" />
      </v-card-text>
    </v-card>

    <v-card color="#eee5d1" variant="elevated" elevation="0">
      <v-card-text>
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address_at_school") }}</h3>
        <p class="note">(Optional) If you do not have an address while at school yet just leave this form blank.</p>
        <v-divider class="my-3" />
        <AddressSelector v-model="application.draft.addresses.home_address2" />
      </v-card-text>
    </v-card>

    <div class="text-right mt-5">
      <v-btn color="primary" @click="nextClick">Next</v-btn>
    </div>
  </v-form>
</template>

<script>
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import { useDraftStore } from "../store";
import { mapActions, mapWritableState } from "pinia";

export default {
  components: {
    BlackoutNotice,
    TextField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
    RadioList,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  mounted() {
    this.application.draft.addresses.home_address1 = this.application.draft.addresses.home_address1 || {};
    this.application.draft.addresses.home_address2 = this.application.draft.addresses.home_address2 || {};
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Addresses"));
      });
    },
  },
};
</script>