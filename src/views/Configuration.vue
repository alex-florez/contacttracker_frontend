<template>
    <div class="configuration">
        <h1>Configuración</h1>
        <h2 id="subtitle">Configurar las opciones de rastreo y la comprobación de contactos de riesgo</h2>
        <v-divider></v-divider>

        <v-tabs>
            <!-- Configuración del Rastreo -->
            <v-tab href="#trackerConfig">Rastreo de ubicación</v-tab>
            <v-tab-item value="trackerConfig">
                <tracker-config></tracker-config>
            </v-tab-item>

            <!-- Configuración de la comprobación -->
            <v-tab href="#riskContactConfig">Comprobación de Contactos</v-tab>
            <v-tab-item value="riskContactConfig">
               <risk-contact-config></risk-contact-config>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import RiskContactConfig from '../components/config/RiskContactConfig.vue'
import TrackerConfig from '../components/config/TrackerConfig.vue'

export default {
    name: 'Configuration',
    components: {
        TrackerConfig,
        RiskContactConfig
    }
}
</script>

<style s
        RiskContactConfigcoped>
    #subtitle {
        color: grey
    }
</style>
