<template>
  <nav
    class="nav-links"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link"
    >
      <DropdownLink
        v-if="item.type === 'links'"
        :item="item"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ repoLabel }}
      <OutboundLink/>
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink, DropdownLink },

  computed: {
    userDefinedLinks() {
      let links = [...this.$site.themeConfig.nav];
      if (this.$site.themeConfig.categories
              && this.$site.themeConfig.categories.index
              && typeof  this.$site.themeConfig.categories.index === 'number') {
        this.$site.themeConfig.categories.link = '/categories/';
        if (this.$site.themeConfig.categories.index <= 0) {
          links.unshift(this.$site.themeConfig.categories)
        } else if(this.$site.themeConfig.categories.index > this.$site.themeConfig.nav.length -1) {
          links.push(this.$site.themeConfig.categories)
        } else {
          links.splice(this.$site.themeConfig.categories.index - 1, 0, this.$site.themeConfig.categories)
        }
      }
      if (this.$site.themeConfig.tags && this.$site.themeConfig.tags.index && typeof  this.$site.themeConfig.tags.index === 'number') {
        this.$site.themeConfig.tags.link = '/tags/';
        if (this.$site.themeConfig.tags.index <= 0) {
          links.unshift(this.$site.themeConfig.tags)
        } else if(this.$site.themeConfig.tags.index > this.$site.themeConfig.nav.length -1) {
          links.push(this.$site.themeConfig.tags)
        } else {
          links.splice(this.$site.themeConfig.tags.index - 1, 0, this.$site.themeConfig.tags)
        }
      }
      if (this.$site.themeConfig.timeLine && this.$site.themeConfig.timeLine.index && typeof  this.$site.themeConfig.timeLine.index === 'number') {
        this.$site.themeConfig.timeLine.link = '/timeLine/';
        if (this.$site.themeConfig.timeLine.index <= 0) {
          links.unshift(this.$site.themeConfig.timeLine)
        } else if(this.$site.themeConfig.timeLine.index > this.$site.themeConfig.nav.length -1) {
          links.push(this.$site.themeConfig.timeLine)
        } else {
          links.splice(this.$site.themeConfig.timeLine.index - 1, 0, this.$site.themeConfig.timeLine)
        }
      }
      if (this.$site.themeConfig.friendLink && this.$site.themeConfig.friendLink.index && typeof  this.$site.themeConfig.friendLink.index === 'number') {
        this.$site.themeConfig.friendLink.link = '/friendLink/';
        if (this.$site.themeConfig.friendLink.index <= 0) {
          links.unshift(this.$site.themeConfig.friendLink)
        } else if(this.$site.themeConfig.friendLink.index > this.$site.themeConfig.nav.length -1) {
          links.push(this.$site.themeConfig.friendLink)
        } else {
          links.splice(this.$site.themeConfig.friendLink.index - 1, 0, this.$site.themeConfig.friendLink)
        }
      }
      return links;
    },
    userNav () {
      return this.$themeLocaleConfig.nav || this.userDefinedLinks || []
    },

    nav () {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text = themeLocales[path] && themeLocales[path].label || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        };
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },

    repoLabel () {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ['GitHub', 'GitLab', 'Bitbucket'];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color #f45a8d
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0
  .repo-link
    position relative
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten(#f45a8d, 8%)
</style>
