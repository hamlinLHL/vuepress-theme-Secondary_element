<template>
    <div class="theme-container">
        <div class="home-tag">
            <Tags @tagChange="($event) => {tagChange($event)}"></Tags>
        </div>
        <div class="home-page">
            <PageList :type="type"></PageList>
        </div>
    </div>
</template>

<script>
    import Tags from '@theme/components/Tags.vue'
    import PageList from '@theme/components/PageList.vue'
    import {isMobie} from '../util'
    export default {
        name: "TagsLayout",
        components: {Tags, PageList},
        data() {
            return {
                type:{
                    name: 'tags',
                    value: '',
                }
            }
        },
        methods: {
            isMobie,
            tagChange(tag) {
                this.type.name = 'tags';
                this.type.value = tag;
            }
        }
    }
</script>

<style scoped lang="stylus">
    .home-tag
        padding 1rem 8rem

    .home-page
        padding 1rem 8rem
    @media (max-width: $MQMobile)
        .home-tag
            padding 1rem 0
        .home-page
            padding 1rem 0
    @media (max-width: $MQMobileNarrow)
        .home-tag
            padding 1rem 0
        .home-page
            padding 1rem 0
</style>
