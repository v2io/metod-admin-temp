<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
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
            <ul>
                <li v-for="item in state.items" :key="item.title">
                    <h3>{{item.title}} ({{item.probability}}%)</h3>
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
  export default {
    props: ['block'],
    data() {
      return {state: this.block}
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
    }
  }
</script>