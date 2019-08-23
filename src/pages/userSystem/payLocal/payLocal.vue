<template>
    <div>
        加载中...
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
            console.log(urls)
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
