<template>
  <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, getSongVkey } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.data.list)
        }
      })
    },
    _normalizeSong (list) {
      let result = []
      list.forEach(item => {
        // 解构赋值-拿到item下的musicData列表数据
        let { musicData } = item
        // 加上vkey
        getSongVkey(musicData.songmid).then(res => {
          const vkey = res.data.items[0].vkey
          if (musicData.songid && musicData.albummid) {
            result.push(createSong(musicData, vkey))
          }
        })
      })
      return result
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus"></style>
