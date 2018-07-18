<template>
    <b-container>
        <h1>File Edit</h1>
        <p>{{file}}</p>
    </b-container>
</template>

<script>
export default {
    props: {
        file: {
            type: Object,
            required: true
        },
    }
}
</script>

