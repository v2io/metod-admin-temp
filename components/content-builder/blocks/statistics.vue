<template>
    <div class="block-body">
        <el-card class="box-card editor">
            <div slot="header" class="clearfix">
                <span>{{ $t('editor') }}</span>
            </div>

            <strong>Все сообщения в структуре инфополя</strong>
            <ul>
                <li>Традиционные СМИ:
                    <el-input type="text" v-model="state.infofield.media"></el-input>
                </li>
                <li>Интернет:
                    <el-input type="text" v-model="state.infofield.internet"></el-input>
                </li>
            </ul>

            <strong>Количество сообщений</strong>
            <ul>
                <li>Телевидение:
                    <el-input type="number" v-model="state.messages.tv"></el-input>
                </li>
                <li>Радио:
                    <el-input type="number" v-model="state.messages.radio"></el-input>
                </li>
                <li>Пресса:
                    <el-input type="number" v-model="state.messages.press"></el-input>
                </li>
                <li>Интернет:
                    <el-input type="number" v-model="state.messages.internet"></el-input>
                </li>
            </ul>

            <strong>Тональность сообщений:</strong>
            <ul>
                <li>Негативно:
                    <el-input type="text" v-model="state.tone.negative"></el-input>
                </li>
                <li>Нейтрально:
                    <el-input type="text" v-model="state.tone.neutral"></el-input>
                </li>
                <li>Позитивно:
                    <el-input type="text" v-model="state.tone.positive"></el-input>
                </li>
            </ul>

            <strong>Оценка влияния:</strong>
            <ul>
                <li>Общественное мнение:
                    <el-input type="text" v-model="state.impact.popular"></el-input>
                </li>
                <li>Реальная политика:
                    <el-input type="text" v-model="state.impact.politics"></el-input>
                </li>
            </ul>

        </el-card>
        <el-card class="box-card preview">
            <div slot="header" class="clearfix">
                <span>{{ $t('preview') }}</span>
            </div>
            <h3>Тут будет превью в дизайне, когда будет сверстан фронт</h3>
        </el-card>
    </div>
</template>

<style scoped lang="stylus">
    .el-input {
        width 6em
    }
</style>

<script>
  export default {
    props: ['block'],
    data() {
      return {
        state: this.block && Object.values(this.block).length ? this.block : {
          infofield: {
            media: 0,
            internet: 0,
          },
          messages: {
            tv: 0,
            radio: 0,
            press: 0,
            internet: 0,
          },
          tone: {
            negative: 0,
            neutral: 0,
            positive: 0
          },
          impact: {
            popular: 0,
            politics: 0
          }
        }
      }
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