<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
            </div>
            <el-input type="textarea" autosize v-model="state.value"></el-input>
        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <div style="font-size: 1.5em" v-html="state.value"></div>
        </el-card>
    </div>
</template>

<script>
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
    }
  }
</script>