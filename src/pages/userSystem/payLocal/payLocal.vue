<template>
    <div style="text-algin:center">
        Loading...
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {
        this._open()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        _open() {
            let urls = this.$route.query.url
            this.url = urls
            window.location.replace(urls);
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
