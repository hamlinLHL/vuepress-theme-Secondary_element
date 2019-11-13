<template>
    <div class="categories">
        <div class="tag" @click="$emit('categoriesChange', '')">
            <i class="iconfont hamlin-home"></i>
            <span class="tag-name">全部</span>
        </div>
        <div class="tag" v-for="categorie in categories" :key="categorie.name" @click="$emit('categoriesChange', categorie.name)" :title="categorie.name">
            <span class="tag-number">{{categorie.number}}</span>
            <span class="tag-name">{{categorie.name}}</span>
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
