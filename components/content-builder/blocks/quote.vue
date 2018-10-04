<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
            </div>
            <label>{{ $t('quote_body') }}</label>
            <el-input type="textarea" autosize v-model="state.body"></el-input>
            <label>{{ $t('quote_author') }}</label>
            <el-input type="text" autosize v-model="state.author"></el-input>
        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <blockquote>
                <p>{{state.body}}</p>
                <cite>{{state.author}}</cite>
            </blockquote>
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