<template>
    <el-row>
        <el-col>
            <h1>{{ $t('Добавить статью') }}</h1>
            <br>
            <hr>
            <br>
            <ContentBuilder @save="save"></ContentBuilder>
        </el-col>
    </el-row>
</template>

<script>
    import ContentBuilder from "@/components/content-builder/content-builder"
    export default  {
      components: {
        ContentBuilder
      },
      methods: {
        async save(data) {
          try {
            const result = await this.$api.post('/articles', data);
            // todo show success message
          } catch (e) {
            // todo show error
          }
        }
      }
    }
</script>