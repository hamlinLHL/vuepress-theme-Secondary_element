<template>
    <div class="tags">
        <div class="tag" @click="$emit('tagChange', '')">
            <i class="iconfont hamlin-home"></i>
            <span class="tag-name">全部</span>
        </div>
        <div class="tag" v-for="tag in tags" :key="tag.name" @click="$emit('tagChange', tag.name)" :title="tag.name">
            <span class="tag-number">{{tag.number}}</span>
            <span class="tag-name">{{tag.name}}</span>
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
            console.log(pageTags);
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
            flex-direction column;
            align-items center;
            cursor pointer;
            width 4rem;
            text-align center;
            transform scale(1);
            transition all 0.5s ease;
            &:hover
                transform: scale(1.1);

            .tag-number
                color #fff;
                background-color #ffafc9;
                border-radius 0.2rem;
                max-width 1.8rem;
                min-width 0.8rem;
                padding 0.1rem 0.2rem;
                text-align center;

            .tag-name
                width 100%;
                overflow hidden;
                text-align center;
                text-overflow ellipsis;

</style>
