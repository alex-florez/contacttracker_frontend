<template>
    <div class="configuration">
        <h1>Configuración</h1>
        <h2 id="subtitle">Configurar las opciones de la notificación de positivos y de la comprobación de contactos de riesgo</h2>
        <v-divider></v-divider>

        <v-tabs>
            <!-- Configuración de la Notificación de Positivos -->
            <v-tab href="#notifyConfig">Notificación de Positivos</v-tab>
            <v-tab-item value="notifyConfig">
                <notify-config></notify-config>
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
import NotifyConfig from '../components/config/NotifyConfig.vue'

export default {
    name: 'Configuration',
    components: {
        NotifyConfig,
        RiskContactConfig
    }
}
</script>

<style RiskContactConfig scoped>
    #subtitle {
        color: grey
    }
</style>
