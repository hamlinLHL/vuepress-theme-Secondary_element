<template>
  <main class="page">
    <slot name="top"/>
    <h1 v-if="$page.frontmatter">{{$page.title}}</h1>
    <pageTitle></pageTitle>
    <Content/>
    <div class="timeLine" v-if="isTimeLine">
      <TimeLine>
      </TimeLine>
    </div>
    <div v-if="isCategories">
      <CategoriesLayout></CategoriesLayout>
    </div>
    <div v-if="isTags">
      <TagsLayout></TagsLayout>
    </div>
    <div v-if="isFriendLink">
      <Friend :friendLinks="friendLinks"></Friend>
    </div>
    <footer class="page-edit" v-if="!isTags && !isCategories && !isFriendLink">
      <div
        class="edit-link"
        v-if="editLink"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div
        class="last-updated"
        v-if="lastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>
    <slot name="bottom"/>
    <ValineComment v-if="showComment"></ValineComment>
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from '../util'
import TimeLine from '@theme/components/TimeLine.vue'
import ValineComment from '@theme/components/ValineComment.vue'
import pageTitle from '@theme/components/pageTitle.vue'
import CategoriesLayout from '@theme/layouts/CategoriesLayout.vue'
import TagsLayout from '@theme/layouts/TagsLayout.vue'
import Friend from '@theme/components/Friend.vue'

export default {
  props: ['sidebarItems'],
  data() {
    return {

    }
  },
  components:{TimeLine, ValineComment, pageTitle, CategoriesLayout, TagsLayout, Friend},
  computed: {
    showComment() {
      return this.$page.frontmatter.isComment !== false
    },
    lastUpdated () {
      return this.$page.lastUpdated
    },
    isTimeLine() {
      return this.$page.frontmatter.isTimeLine
    },
    isCategories() {
      return this.$page.frontmatter.isCategories
    },
    isTags() {
      return this.$page.frontmatter.isTags
    },
    friendLinks() {
      return this.$site.themeConfig.friendLink && this.$site.themeConfig.friendLink.data
    },
    isFriendLink() {
      return this.$page.frontmatter.isFriendLink
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.relativePath)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '')
           + `/src`
           + `/${docsBranch}/`
           + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
           + path
           + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    },

  },

  watch: {
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.page
  padding-top 4rem
  padding-bottom 2rem
  display block
  img
    width 100%
.timeLine
  @extend $wrapper
.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left

</style>
