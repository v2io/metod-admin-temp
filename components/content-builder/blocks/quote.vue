<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <el-input v-model="state.heading" :placeholder="$t('block_heading')"></el-input>
            </div>
            <label>{{ $t('quote_body') }}</label>
            <el-input type="textarea" rows="5" v-model="state.body"></el-input>
            <label>{{ $t('quote_author') }}</label>
            <el-input type="text"  v-model="state.author"></el-input>
            <el-input type="text"  v-model="state.position"></el-input>
        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <preview :content="state"></preview>
        </el-card>
    </div>
</template>

<script>
  import preview from "~/shared-components/article/blocks/quote"
  export default {
    props: ['content'],
    data() {
      return {state: this.content}
    },
    watch: {
      state: {
        handler(v) {
          this.$emit('change', this.state)
        },
        deep: true
      }
    },
    components: {
      preview
    }
  }
</script>