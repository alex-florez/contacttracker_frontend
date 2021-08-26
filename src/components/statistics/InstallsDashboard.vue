<template>
    <v-card class="card">
        <v-card-title>Descargas</v-card-title>
        <v-card-subtitle>Total de descargas de la aplicación móvil</v-card-subtitle>
        <div class="ml-4 pb-2">
            <span class="value">{{ installStats.installCount }}</span>
            <span class="ml-2">descargas</span>
        </div>

    </v-card>
</template>

<script>

export default {
    name: "InstallsDashboard",
    data: () => ({
        installStats: {
            installCount: 0
        }
    }),
    created() {
        this.$statisticsapi.getInstallStatistics(response => {
            this.installStats = response.data
        }, error => {
            console.log(`Error al recuperar las estadísticas de descargas: ${error}`)
        })
    }
}
</script>

<style scoped>
    .value {
        font-size: 40px;
        font-weight: bold;
    }
</style>