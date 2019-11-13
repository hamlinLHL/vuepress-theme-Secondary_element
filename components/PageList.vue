<template>
    <main>
        <div class="pageList">
            <div class="artical" v-for="page in renderPageControl" :key="page.path">
                <router-link
                        :to="page.path"><h1>{{page.title}}</h1>
                </router-link>
                <footer>
                    <span class="author"><i class="iconfont hamlin-person"></i>{{$site.themeConfig.author}}</span>
                    <span class="date"><i class="iconfont hamlin-time"></i>{{getDate(page)}}</span>
                    <span class="tag"><i class="iconfont hamlin-tag"></i>
                    <span v-for="tag in getValue(page)" :class="{'activeTag': tag === currentValue}">
                        {{tag}}
                    </span>
                </span>
                </footer>
            </div>
        </div>
        <div class="pageNum">
            <PageControl :total="renderPages.length" :perPage="perPage" :currentPage="currentPage" @pageChange="pageChange($event)"></PageControl>
        </div>
    </main>

</template>

<script>
    import PageControl from '@theme/components/PageControl.vue'
    export default {
        name: "PageList",
        components: { PageControl},
        props: {
            type: {
                type: Object,
                default: function() {
                    return {
                        name: 'tags',
                        value: ''
                    }
                }
            }
        },
        data () {
            return {
                perPage: 5,
                currentPage: 1,
            }
        },
        computed: {
            currentName() {
                return this.type.name;
            },
            currentValue() {
                this.currentPage = 1;
                return this.type.value;
            },
            pages() {
               return this.$site.pages.filter(page => {
                   return page.frontmatter && page.frontmatter[this.currentName] && page.frontmatter[this.currentName].length > 0
               })
            },
            // 过滤出page并按日期逆序
            renderPages() {
                return this.pages.filter(page => {
                    if (this.currentValue) {
                        return page.frontmatter[this.currentName].includes(this.currentValue)
                    } else {
                        return page;
                    }
                }).sort((a, b) => {
                    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
                })
            },
            // 分页
            renderPageControl() {
                return this.renderPages.slice((this.currentPage - 1)*this.perPage, (this.currentPage - 1)*this.perPage + this.perPage)
            }
        },
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
            getValue(page) {
                if (page.frontmatter[this.currentName] && page.frontmatter[this.currentName].length > 0) {
                    return page.frontmatter[this.currentName]
                } else {
                    return []
                }
            },
            pageChange(index) {
                this.currentPage = index;
            }
        },

    }
</script>

<style scoped lang="stylus">
    $accentColor = #f45a8d
    @keyframes shaking {
        0%{transform: translateX(0rem)}
        16%{transform: translateX(3rem)}
        32%{transform: translateX(5rem)}
        50%{transform: translateX(7em)}
        66%{transform: translateX(5rem)}
        83%{transform: translateX(3rem)}
        100%{transform: translateX(0rem)}
    }
    .pageNum
        padding 0 2rem
    .activeTag
        color : $accentColor
    .artical
        position: relative
        padding 0 2rem;
        margin 3rem 1rem;
        border-radius 10px;
        background-color rgba(255,255,255,0);
        box-shadow 0 1px 12px -6px rgba(0,0,0,.5);
        transition all 0.5s ease
        overflow hidden
        &::before
            position absolute
            top 100%
            left -100%
            content ''
            width 100%
            height 100%
            background-color #f2dbe5
            transform: skew(45deg, 0);
            transition all 0.5s ease
        &:hover
            box-shadow 0 1px 15px -3px rgba(0,0,0,.5);
            &::before
                left 0
                top 0
                transform: skew(0, 0);
        h1
            color #222;
            position relative
            padding-bottom 2rem
            font-size 1.8rem
            padding-top 1rem
            cursor pointer
            &:hover
                animation shaking 500ms 2 forwards ease-in-out
        footer
            color #99a2aa;
            position: relative
            padding-bottom 2rem
            .author
                margin-right 2rem
            .date
                margin-right 2rem
            .tag
                margin-right 2rem
                span
                    padding-right 1rem
            i
                font-size 1.3rem
                margin-right 1rem
        &:first-child
            margin-top 0;
</style>
