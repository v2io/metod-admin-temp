<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <el-input v-model="state.heading" :placeholder="$t('block_heading')"></el-input>
            </div>
            <el-table :data="state.items" type="expand" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <p>
                            <label style="margin-bottom: 1em">{{$t('text')}}</label>
                            <el-input type="textarea" rows="3" v-model="scope.row.text"></el-input>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('title')">
                    <template slot-scope="scope">
                        <el-input type="url" v-model="scope.row.title"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('probability')">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.probability"></el-input>
                    </template>
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <el-button class="button" icon="el-icon-delete" @click="remove(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add">{{ $t(`add-forecast`) }}
            </el-button>
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
  import preview from "~/shared-components/article/blocks/forecast"
  export default {
    props: ['content'],
    data() {
      return {state: this.content}
    },
    methods: {
      add() {
        this.state = {...this.state, items: [...(this.state.items || []), {title: "", probability: 0, text: ""}]}
      },
      remove(i) {
        this.state.items.splice(i, 1);
      }
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