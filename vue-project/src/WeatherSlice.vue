<script>
export default {
    props: {
        timeofday: String,
        temp: Number,
        unit: String
    }
}
</script>
<template>
    <p> {{ timeofday || 'nothin' }} : {{ temp }}{{ unit }}</p>
</template>