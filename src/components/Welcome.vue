<template>
  <v-container>
    <v-row class="text-center" justify="center" no-gutters>
      <v-col cols="12">
        <v-img
          :src="require('../assets/ContactTrackerForeground.png')"
          contain
          class="my-3"
          height="300"
        />
      </v-col>

      <v-col cols="12" class="mb-8">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenid@ a Contact Tracker Web
        </h1>

        <p class="subheading font-weight-regular">
          Panel de control para configurar los ajustes del sistema, visualizar estadísticas y
          <br>monitorizar los positivos notificados a través de la aplicación móvil.
        </p>
      </v-col>

      <!-- Positivos notficados -->
      <v-col v-if="positives > 0" cols="12">
        <div class="display-1">¡Hoy se 
          <span v-if="positives > 1">han</span> 
          <span v-else>ha</span>
          notificado <span class="positives">{{ positives }} </span> 
          <span v-if="positives > 1">nuevos </span>
          <span v-else>nuevo </span> 
          <span v-if="positives > 1" class="positives">positivos</span>
          <span v-else class="positives">positivo</span>!</div>
      </v-col>
      <v-col v-else-if="positives == 0" cols="12">
        <div class="display-1">¡Hoy no se ha notificado ningún positivo!</div>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Welcome',

    data: () => ({
      /* Positivos notificados hoy */
      positives: null
    }),

    created() {
      // Llamada a la API para recuperar los positivos notificados hoy
      this.$statisticsapi.getPositiveStatistics(0, response => {
        this.positives = response.data.positiveCount
      }, () => {
        console.log("Error al recuperar los positivos notificados hoy.")
      })
    }

  }
</script>

<style scoped>
.positives {
  color: red;
  font-size: 140%;
}

</style>