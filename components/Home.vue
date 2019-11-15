<template>
  <main  aria-labelledby="main-title" >
    <div class="home" :style="getBgStyle">
      <header class="hero" v-if="!isMobie()">
        <AlgoliaSearchBox
                v-if="isAlgoliaSearch"
                :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false && data.search !== false"/>
      </header>
    </div>
    <div class="home-categories">
      <Categories @categoriesChange="($event) => {categoriesChange($event)}"></Categories>
    </div>
    <Content class="theme-default-content custom"/>
    <div class="home-page">
      <PageList :type="type"></PageList>
    </div>
    <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>

import NavLink from '@theme/components/NavLink.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import Tags from '@theme/components/Tags.vue'
import PageList from '@theme/components/PageList.vue'
import {isMobie} from '../util'
import Categories from  '@theme/components/Categories.vue'
export default {
  components: { NavLink, SearchBox, AlgoliaSearchBox, Tags , PageList, Categories},
  data() {
    return {
      type:{
        name: 'tags',
        value: '',
      }
    }
  },
  computed: {
    getBgImage() {
      if (this.data.bgImage) {
        if (this.data.bgImage.startsWith('http')) {
          return this.data.bgImage;
        } else {
          return this.$withBase(this.data.bgImage);
        }
      } else {
        return ''
      }
    },
    getBgStyle() {
      if (this.data.bgImageStyle && this.data.bgImageStyle instanceof Object) {
        return Object.assign({backgroundImage: 'url(' + this.$withBase(this.getBgImage) + ')'}, this.data.bgImageStyle)
      } else {
        return {}
      }
    },
    data () {
      return this.$page.frontmatter
    },

    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    isMobie,
    tagChange(tag) {
      this.type.name = 'tags';
      this.type.value = tag;
    },
    categoriesChange(categories) {
      this.type.name = 'categories';
      this.type.value = categories;
    }
  }
}
</script>

<style lang="stylus">
.home
  position: relative;
  height: 10.6rem;
  display block
  background-position center -10px;
  background-repeat no-repeat;
  .hero
    .search-box
      position absolute
      left 2rem
      bottom 2rem
      input
        background-color rgba(255, 255, 255, .8)
        width 15rem
        border-radius 0.4rem
        &:hover
          background-color #fff


.home-categories
  padding 1rem 8rem

.home-page
  padding 1rem 8rem
@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

  .home-categories
    padding 1rem 0
  .home-page
    padding 1rem 0
@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
  .home-categories
    padding 1rem 0
  .home-page
    padding 1rem 0
</style>
