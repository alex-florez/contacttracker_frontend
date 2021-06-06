<template>
    <div v-if="result">
        {{ result }}
    </div>
</template>

<script>
import ContactTrackerConfigApi from '../api/contacttrackerconfig.js'

export default {
    name: "ApiCall",
    data: () => ({
        result: null
    }),

    created() {
        var api = new ContactTrackerConfigApi()
        api.updateTrackerConfig((result) => this.result = result)
    }
}

</script>
