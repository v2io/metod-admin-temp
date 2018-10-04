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
            <div v-html="state.value"></div>
        </el-card>
    </div>
</template>

<script>
  export default {
    props: ['block'],
    data() {
      return {state: this.block}
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