<template>
    <el-row>
        <el-col>
            <h1>{{ $t('Добавить статью') }}</h1>
            <br>
            <hr>
            <br>
            <ContentBuilder></ContentBuilder>
        </el-col>
    </el-row>
</template>

<script>
    import ContentBuilder from "@/components/content-builder/content-builder"
    export default  {
      components: {
        ContentBuilder
      }
    }
</script>