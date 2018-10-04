<template>
    <el-card class="content-builder">
        <el-card style="margin-bottom: 1em">
            <div slot="header">{{$t('template')}}</div>
            <el-button class="button" @click="createFromTemplate('simple')">{{ $t(`template-simple`) }}</el-button>
        </el-card>

        <draggable class="content-builder" :list='items' :options="{handle:'.handle'}" @start="drag=true"
                   @end="drag=false">
            <el-card v-for="item in items" :key="item.id" :class="`content-block ${item.type}-block`">
                <div slot="header" class="clearfix">
                    <span style="float: right">
                        <el-button class="button" icon="el-icon-delete" @click="remove(item.id)"></el-button>
                        <el-button class="button handle" icon="el-icon-d-caret" style="cursor: move"></el-button>
                    </span>
                    <span>{{ $t(`${item.type}-block`) }}</span>
                </div>
                <component :is="_.upperFirst(_.camelCase(item.type))+'Block'" :block="item.data"
                           @change="onBlockChange(item.id, $event)"></component>
            </el-card>
        </draggable>
        <div class="add" style="margin-top: 1em">
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('lead')">{{ $t(`lead-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('forecast')">{{
                $t(`forecast-block`) }}
            </el-button>
            <!--<el-button class="button" icon="el-icon-circle-plus-outline" @click="add('statistics')">{{
                $t(`statistics-block`) }}
            </el-button>-->
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('text')">{{ $t(`text-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('richtext')">{{
                $t(`richtext-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('quote')">{{ $t(`quote-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('links')">{{ $t(`links-block`) }}
            </el-button>
        </div>
    </el-card>
</template>

<script>
  import lockr from "lockr"
  import RichtextBlock from "./blocks/richtext"
  import TextBlock from "./blocks/text"
  import QuoteBlock from "./blocks/quote"
  import ForecastBlock from "./blocks/forecast"
  import LeadBlock from "./blocks/lead"
  import LinksBlock from "./blocks/links"
  import StatisticsBlock from "./blocks/statistics"

  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      add(type) {
        this.items.push({
          id: Math.round(Math.random() * 1000000),
          type,
          data: {}
        })
      },
      remove(_id) {
        if (confirm()) {
          this.items.splice(this.items.findIndex(({id}) => id === _id), 1)
        }
      },
      createFromTemplate(template) {
        switch (template) {
          case 'simple':
            this.items = require('./templates/simple').default
        }
      },
      onBlockChange(_id, data) {
        this.items[this.items.findIndex(({id}) => id === _id)].data = data;
      }
    },
    mounted() {
      this.items = lockr.get('content-builder-draft', []);
      if (this.items.length) {
        this.$message({
          message: this.$t('restored_from_draft'),
          type: 'success'
        });
      }
    },
    watch: {
      items: {
        handler() {
          lockr.set('content-builder-draft', this.items);
        },
        deep: true
      }
    },
    components: {
      RichtextBlock,
      TextBlock,
      QuoteBlock,
      ForecastBlock,
      LeadBlock,
      LinksBlock,
      StatisticsBlock
    },
  }
</script>

<style lang="stylus">
    .content-block
        width 100%
        &.sortable-chosen
            background var(--secondary)
        .block-body
            display flex
            > .el-card
                margin 0.5em
                flex-basis 50%
</style>