<template>
    <div class="valine">

        <div id="comment">

        </div>
    </div>
</template>

<script>
    export default {
        name: "ValineComment",
        methods: {
            addComment() {
                if (this.showComment) {
                    let path = location.pathname;
                    if (document.getElementsByClassName('leancloud-visitors') && document.getElementsByClassName('leancloud-visitors')[0]) {
                        document.getElementsByClassName('leancloud-visitors')[0].id = path;
                    }
                    const valineConfig = this.$site.themeConfig.valineConfig;
                    const valine = require('valine');
                    new valine(Object.assign({
                        el:'#comment',
                        path: path,
                    }, valineConfig))
                }
            }
        },
        computed:{
            showComment() {
                return this.$page.frontmatter.isComment !== false
            },
        },
        mounted() {
            this.addComment();
        },
        watch: {
            $route (to, from) {
                if (from.path !== to.path) {
                    this.addComment();
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    @require '../styles/wrapper.styl'
    .valine
        @extend $wrapper
</style>
