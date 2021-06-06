<template>
    <div class="configuration">
        <h1>Configuración</h1>
        <h2 id="subtitle">Configurar las opciones de rastreo y la comprobación de contactos de riesgo</h2>
        <v-divider></v-divider>

        <!-- Configuración del Rastreo -->
        <tracker-config/>

        <!-- Configuración de la comprobación -->

    </div>
</template>

<script>
import TrackerConfig from '@/components/TrackerConfig.vue'

export default {
    name: 'Configuration',
    components: {
        TrackerConfig
    }
}
</script>

<style scoped>
    #subtitle {
        color: grey
    }
</style>
