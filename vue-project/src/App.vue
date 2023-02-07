<script>
import { GetWeatherForZip } from './DataFetcher';
import { ValidateZip } from './Validator';
import WeatherSlice from './WeatherSlice.vue';
export default {
  data() {
    return {
      curZip: null,
      msg: null,
      curWeather: null
    }
  },
  components: {
    WeatherSlice
  },
  methods: {
    async GetWeather() {
      this.msg = ""
      let validationErrors = ValidateZip(this.curZip)
      if (validationErrors.length == 0) {
        await this.fetchWeather()
      } else {
        validationErrors.forEach(e => this.msg += e + " ")
      }

    },
    async fetchWeather() {
      try {
        this.curWeather = await GetWeatherForZip(this.curZip)
      } catch (err) {
        this.msg = err
      }
    }
  },
  async mounted() {

    //this.fetchWeather()
  }
}
</script>

<template>
  <form @submit.prevent="GetWeather">
    <input v-model="curZip" placeholder="Enter Zip">
    <button>Get Weather</button>
  </form>
  <ul v-if="curWeather">
    <li v-for="w in curWeather" :key="w.number">
      <WeatherSlice :timeofday="w.name" :temp="w.temperature" :unit="w.temperatureUnit" />
    </li>
  </ul>
  <p v-else>{{ msg || " no weather yet" }}</p>
</template>

<style>

</style>
