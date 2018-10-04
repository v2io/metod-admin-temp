<template>
    <el-container>
        <el-header style="padding: 0">
        <el-menu
                :router="true"
                :default-active="$route.name"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/">METOD</el-menu-item>
            <el-submenu index="articles">
                <template slot="title">{{ $t('Статьи')}}</template>
                <el-menu-item :index="$route_i18n('articles-create')" :route="{name: $route_i18n('articles-create')}">{{
                    $t('Создать статью')}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
        </el-header>
        <el-main>
            <nuxt/>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        routes: []
      };
    },
    created() {
      this.$router.options.routes.forEach(route => {
        this.routes.push({
          name: route.name,
          path: route.path
        })
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>