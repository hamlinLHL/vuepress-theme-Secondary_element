<template>
    <div class="theme-container">
        <div class="home-tag">
            <Categories @categoriesChange="($event) => {categoriesChange($event)}"></Categories>
        </div>
        <div class="home-page">
            <PageList :type="type"></PageList>
        </div>
    </div>
</template>

<script>
    import Categories from  '@theme/components/Categories.vue'
    import PageList from '@theme/components/PageList.vue'
    export default {
        name: "CategoriesLayout",
        components: {Categories, PageList},
        data() {
            return {
                type:{
                    name: 'tags',
                    value: '',
                }
            }
        },
        methods: {
            categoriesChange(categories) {
                this.type.name = 'categories';
                this.type.value = categories;
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
