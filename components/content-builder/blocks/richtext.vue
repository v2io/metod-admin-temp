<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
            </div>
            <text-editor v-model="state.value"></text-editor>
        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <div v-html="state.value"></div>
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