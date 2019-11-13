<template>
    <div class="page-title" v-if="getTags($page).length > 0">
        <div class="author item">
            <i class="iconfont hamlin-person"></i>
            <span>{{$site.themeConfig.author}}</span>
        </div>
        <div class="date item">
            <i class="iconfont hamlin-date"></i>
            <span>{{getDate($page)}}</span>
        </div>
        <div class="count item">
            <i class="iconfont hamlin-eye"></i>
            <span class="leancloud-visitors"
                  data-flag-title="Your Article Title">
                <i class="leancloud-visitors-count"></i>
            </span>
        </div>
        <div class="pageTag item">
            <i class="iconfont hamlin-tag"></i>
            <router-link
                    :to="'/tags'"><span v-for="tag in getTags($page)">{{tag}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageTitle",
        methods: {
            getDate(page) {
                if (page.frontmatter.date) {
                    return page.frontmatter.date.replace(/-/g, '/');
                } else if (page.date) {
                    return page.date.replace(/-/g, '/');
                } else {
                    return page.lastUpdated.split(',')[0];
                }
            },
            getTags(page) {
                if (page.frontmatter && page.frontmatter.tags && page.frontmatter.tags instanceof Array) {
                    return page.frontmatter.tags;
                } else {
                    return [];
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .page-title
        display flex
        color #bbb
        .pageTag
            span
                color #bbb
                cursor pointer
                padding-right 0.5rem
                &:hover
                    color #2c3e50
        .item
            padding-right 2rem
            .iconfont
                padding-right 0.5rem
    @media (max-width: 700px)
        .page-title
            .item
                padding-right 1rem
                .iconfont
                    padding-right 0.2rem
</style>
