<template>
    <div class="valine">

        <div id="comment">

        </div>
    </div>
</template>

<script>
    import Valine from 'valine'
    export default {
        name: "ValineComment",
        data() {
            return {
                valine: null,
            }
        },
        methods: {
            addComment() {
                if (this.showComment) {
                    let path = location.pathname;
                    if (document.getElementsByClassName('leancloud-visitors') && document.getElementsByClassName('leancloud-visitors')[0]) {
                        document.getElementsByClassName('leancloud-visitors')[0].id = path;
                    }
                    const valineConfig = this.$site.themeConfig.valineConfig;
                    this.valine.init(Object.assign({
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
            if (typeof window !== 'undefined') {
                window.AV = require('leancloud-storage')
            }
            this.valine = new Valine();
            this.addComment();
        },
        watch: {
            $route (to, from) {
                if (from.path != to.path) {
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
