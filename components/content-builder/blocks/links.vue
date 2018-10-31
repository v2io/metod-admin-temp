<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
            </div>
            <el-table :data="state.links" style="width: 100%">
                <el-table-column :label="$t('link')">
                    <template slot-scope="scope">
                        <p>тут будет селектор статей, когда будут статьи!</p>
                        <el-input type="url" v-model="scope.row.url"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('link-text')">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.text"></el-input>
                    </template>
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <el-button class="button" icon="el-icon-delete" @click="remove(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add">{{ $t(`add-link`) }}</el-button>
        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <ul>
                <li v-for="link in state.links" :key="link.url">
                    <a :href="link.url" target="_blank">{{link.text}}</a>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
  export default {
    props: ['content'],
    data() {
      return {state: this.content}
    },
    methods: {
      add() {
        this.state = {...this.state, links: [...(this.state.links || []), {url: "http://", text: ""}]}
      },
      remove(i) {
        this.state.links.splice(i, 1);
      }
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