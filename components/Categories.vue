<template>
    <div class="categories">
        <div class="tag" @click="$emit('categoriesChange', '')">
            <i class="iconfont hamlin-home"></i>
            <span class="tag-name">全部</span>
        </div>
        <div class="tag" v-for="categorie in categories" :key="categorie.name" @click="$emit('categoriesChange', categorie.name)" :title="categorie.name">
            <span class="tag-name">{{categorie.name}}</span>
            <span class="tag-number">{{categorie.number}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Categories",
        data() {
            return {
                categories : [],
            }
        },
        mounted() {
            const pageCategories = this.$site.pages.filter(page => {
                return page.frontmatter && page.frontmatter.categories && page.frontmatter.categories.length > 0
            });
            pageCategories.forEach(page => {
                page.frontmatter.categories.forEach(categorie => {
                    this.isCategoriesExit(categorie);
                })
            });
        },
        methods: {
            // 判断是否存在tag
            isCategoriesExit(categorie) {
                let exsit = false;
                this.categories.forEach(ele => {
                    if (ele.name === categorie) {
                        exsit = true;
                        ele.number +=1;
                    }
                });
                if (!exsit) {
                    this.categories.push({
                        name : categorie,
                        number: 1
                    })
                }
                return exsit;
            }
        }

    }
</script>

<style scoped lang="stylus">
    .categories
        width auto;
        &::after
            display block;
            content '';
            clear both;

        .tag
            float left;
            display flex;
            padding 0.5rem 0.5rem;
            flex-direction row;
            align-items center;
            cursor pointer;
            text-align center;
            &:hover
                color #1890ff

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
