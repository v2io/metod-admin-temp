<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <el-input v-model="state.heading" :placeholder="$t('block_heading')"></el-input>
            </div>
            <text-editor v-model="state.value"></text-editor>
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
  import preview from "~/shared-components/article/blocks/richtext"
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