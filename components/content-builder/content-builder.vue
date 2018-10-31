<template>
    <el-card class="content-builder">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card style="margin-bottom: 1em">
                    <div slot="header">{{$t('template')}}</div>
                    <el-button class="button" @click="createFromTemplate('simple')">{{ $t(`template-simple`) }}</el-button>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="margin-bottom: 1em">
                    <div slot="header">{{$t('basic-article-fields')}}</div>
                    <label>{{$t('title')}}</label>
                    <el-input v-model="properties.title"></el-input>
                    <label>{{$t('announce')}}</label>
                    <el-input type="textarea" rows="3" v-model="properties.announce"></el-input>
                </el-card>
            </el-col>
        </el-row>

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
                <component :is="_.upperFirst(_.camelCase(item.type))+'Block'" :content="item.data"
                           @change="onBlockChange(item.id, $event)"></component>
            </el-card>
        </draggable>

        <div class="add" style="margin-top: 1em">
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('lead')">{{ $t(`lead-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('forecast')">{{
                $t(`forecast-block`) }}
            </el-button>
            <el-button class="button" icon="el-icon-circle-plus-outline" @click="add('statistics')">{{
                $t(`statistics-block`) }}
            </el-button>
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

        <el-card style="margin-top: 1em">
            <el-button class="button" @click="$emit('save', {properties: this.properties, items: this.items})" type="primary">{{ $t(`save`) }}</el-button>
        </el-card>

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
        properties: {},
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
            .preview
                background #f6f6f6
                .el-card__header
                    background #fff
        .title
            background url("~assets/img/dot-row.png") left repeat-x
            margin 0 -1em 1em
            h2
                margin-left 12em
                display inline-block
                font-weight normal
                font-size 0.8em
                background #cd3037 //$red
                color #fff
                padding 0.25em 0.5em
</style>