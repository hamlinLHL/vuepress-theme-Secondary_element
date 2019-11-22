<template>
    <div class="tags">
        <div class="tag" @click="$emit('tagChange', '')">
            <i class="iconfont hamlin-home"></i>
            <span class="tag-name">全部</span>
        </div>
        <div class="tag" v-for="tag in tags" :key="tag.name" @click="$emit('tagChange', tag.name)" :title="tag.name">
            <span class="tag-name">{{tag.name}}</span>
            <span class="tag-number">{{tag.number}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tags",
        data() {
            return {
                tags : [],
            }
        },
        mounted() {
            const pageTags = this.$site.pages.filter(page => {
                return page.frontmatter && page.frontmatter.tags && page.frontmatter.tags.length > 0
            });
            pageTags.forEach(page => {
                page.frontmatter.tags.forEach(tag => {
                    this.isTagExit(tag);
                })
            });
        },
        methods: {
            // 判断是否存在tag
            isTagExit(tag) {
                let exsit = false;
                this.tags.forEach(ele => {
                    if (ele.name === tag) {
                        exsit = true;
                        ele.number +=1;
                    }
                });
                if (!exsit) {
                    this.tags.push({
                        name : tag,
                        number: 1
                    })
                }
                return exsit;
            }
        }

    }
</script>

<style scoped lang="stylus">
    .tags
        width auto;
        &::after
            display block;
            content '';
            clear both;

        .tag
            float left;
            display flex;
            padding 0.5rem 0.5rem;
            align-items center;
            cursor pointer;
            text-align center;
            border 1px solid #73c9e5
            border-radius 2px
            margin-right 1rem
            margin-bottom: 0.5rem;
            &:hover
                color #1890ff
                box-shadow 0px 0px 5px #73c9e5 inset
            .tag-number
                color #fff;
                background-color #73c9e5;
                border-radius 0.2rem;
                max-width 1.8rem;
                min-width 0.8rem;
                padding 0.1rem 0.2rem;
                margin-left 0.3rem
                text-align center;

</style>
