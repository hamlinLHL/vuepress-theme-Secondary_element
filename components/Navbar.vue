<template>
  <div class="navbar">
    <div class="header-bg"  :style="{backgroundImage: 'url(' + $withBase(getBgImage) + ')', filter: 'blur(4px)'}" :class="{home_bg: getBgImage === ''}">

    </div>
    <div class="nav-mask"></div>
    <header>
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

      <router-link
              :to="$localePath"
              class="home-link"
      >
        <div class="img-container">
          <img
                  class="logo"
                  v-if="$site.themeConfig.logo"
                  :src="$withBase(getLogo)"
                  :alt="$siteTitle"
                  :class="{ 'can-hide': $site.themeConfig.logo }"
          >
          <div class="personal">
            <div class="personal-head">
              <p class="name">{{ $siteTitle }}</p>
              <p class="des">{{ $site.description }}</p>
            </div>
          </div>
        </div>
        <span
                ref="siteName"
                class="site-name"
                v-if="$siteTitle"
                :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span>
      </router-link>

      <div
              class="links"
              :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      >
        <NavLinks class="can-hide"/>
      </div>

      <div class="hero" v-if="isMobie()">
        <AlgoliaSearchBox
                v-if="isAlgoliaSearch"
                :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false && data.search !== false"/>
      </div>
    </header>
  </div>
</template>

<script>
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import {isMobie} from '../util'
import SearchBox from '@SearchBox'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
export default {
  components: { SidebarButton, NavLinks, SearchBox,AlgoliaSearchBox},

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    };
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    getLogo() {
      if (this.$site.themeConfig.logo) {
        return this.$site.themeConfig.logo
      } else {
        return ''
      }
    },
    getBgImage() {
      if (this.data.bgImage) {
        return this.data.bgImage
      } else {
        return ''
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
    isMobie
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.5rem
$navbar-horizontal-padding = 1.5rem
$navbarHeight = 4rem
$accentColor = #f45a8d

.home_bg
  background-color #fff
.navbar
  height: $navbarHeight;
  z-index 999
  .nav-mask
    position absolute;
    top 0;
    left 0;
    width 100%;
    height 100%;
    background-color hsla(0,0%,100%,.4);
    box-shadow 0 1px 2px rgba(0,0,0,.1);
  header
    padding $navbar-vertical-padding $navbar-horizontal-padding
    line-height 42px
    width 100%
    height 100%
    z-index 99
    box-sizing border-box
    .hero
    .search-box
      position absolute
      right: 1.2rem;
      bottom: 0.4rem;
      input
        background-color rgba(255, 255, 255, .8)
        width 15rem
        border-radius 0.4rem
        &:hover
          background-color #fff
  .header-bg
    position absolute
    background-position center -10px;
    background-repeat no-repeat;
    top 0
    left 0
    right 0
    bottom 0
  a, span, img
    display inline-block
  .home-link
    position absolute
    right $navbar-horizontal-padding
    top 0
    height 100%
    width 10rem
    padding-left 1.5rem
    .img-container
      position: absolute
      top 50%
      left 0
      transform translateY(-50%)
      height 100%
      margin-right 0.8rem
      border-radius 50%
      &:hover
        .personal
          display block
          opacity 1
        .logo
          top 2.3rem;
          right 2.6rem;
          transform scale(1.5)
          padding 1px
          background-color #fff
          z-index 999
      .logo
        position absolute
        top 0.6rem;
        right 2.6rem;
        height $navbarHeight - 1.2rem
        width $navbarHeight - 1.2rem
        border-radius 50%
        transform scale(1)
        transition all 0.5s ease
      .personal
        position absolute
        display none
        top $navbarHeight
        right -3rem
        width 14rem
        height 10rem
        background-color #fff
        opacity 0
        box-shadow: 0 2px 4px rgba(0,0,0,.16);
        transition all 0.5s ease-in-out
        .personal-head
            position absolute
            top 1.3rem
            left 50%
            width 100%
            transform translateX(-50%)
            text-align center
            .name
                font-size 1.2rem
            .des
                font-size 0.8rem

    .site-name
      position absolute
      top 0
      right 1rem
      color #fff
      font-size 1.1rem
      height 4.8rem
      line-height 4.8rem
      width 6.5rem
      text-align center
      background-color $accentColor
      border-radius 0 0 6px 6px;
      overflow hidden;
      text-overflow ellipsis;
      &:hover{
        background-color #fb7299
      }
  .links
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
      input
        background-color transparent
        &.focused{
          background-color #fff
        }

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    header
      .hero
        .search-box
          input
            width 0
            transition all 0.5s ease
            &:focus
              width 13rem
              border-color #ffafc9
    .can-hide
      display none
    .home-link
      display none
</style>
