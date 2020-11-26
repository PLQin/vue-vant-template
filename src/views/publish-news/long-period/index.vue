
<template>
  <div>
    <van-form @submit.native.prevent>
      <van-field
        v-model="form.type"
        input-align="right"
        readonly
        clickable
        required
        label="发布类型"
        @click="config.type.show = true"
      />
      <van-popup v-model="config.type.show" round position="bottom">
        <van-picker
          title="发布类型"
          show-toolbar
          :columns="config.type.columns"
          @cancel="config.type.show = false"
          @confirm="onConfirmType"
        />
      </van-popup>
      <van-field
        v-model="form.origin"
        input-align="right"
        required
        label="出发地"
        placeholder="2-20个字符"
      />
      <van-field
        v-model="form.destination"
        input-align="right"
        required
        label="目的地"
        placeholder="2-20个字符"
      />
      <van-field
        v-model="form.days_departure_time"
        input-align="right"
        readonly
        clickable
        required
        label="每日出发时间"
        placeholder="请选择每日出发时间"
        @click="date.show = true"
      />
      <van-popup v-model="date.show" round position="bottom">
        <van-datetime-picker
          v-model="date.currentDate"
          type="time"
          title="选择完整时间"
          @cancel="date.show = false"
          @confirm="onConfirmdeparture_time"
        />
      </van-popup>
      <van-field v-model="form.pathway" input-align="right" label="途径地" placeholder="请用“，”隔开每个途径地" />

      <div class="interval" />
      <van-field
        v-model.number="form.phone"
        input-align="right"
        required
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model.number="form.seats"
        input-align="right"
        required
        type="digit"
        label="剩余空位"
        placeholder="请填写数量"
      />

      <div class="interval" />
      <van-cell center title="更多描述">
        <template slot="label">
          <van-field
            v-model="form.remark"
            style="border: 1px solid #f0f0f0;"
            rows="3"
            autosize
            type="textarea"
            maxlength="200"
            placeholder="请填写费用、车牌号、车型、时间描述等事项"
            show-word-limit
          />
        </template>
      </van-cell>

      <div class="interval" />
      <van-cell-group>
        <van-cell
          class="effective-days van-cell--required"
          title="有效天数"
          :value="`${form.day}天`"
          @click="config.days.show = true"
        />
      </van-cell-group>
      <van-popup v-model="config.days.show" round position="bottom">
        <van-picker
          title="有效天数"
          show-toolbar
          :columns="config.days.columns"
          @cancel="config.days.show = false"
          @confirm="onConfirmDays"
        />
      </van-popup>
      <div class="van-sku-actions van-panel has-pay-amount">
        <span>需付金额：￥</span>
        <span class="active">15</span>
        <span>元</span>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'ShortPeriod',
  props: {
    datum: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      date: {
        show: false,
        currentDate: '08:00'
      },

      form: this.datum.form,
      config: this.datum.config
    }
  },
  computed: {},
  watch: {
    datum: {
      handler(newVal, oldVal) {
        this.form = newVal.form
        this.config = newVal.config
      },
      deep: true
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onConfirm() {},
    onCancel() {},
    onChange() {},
    onConfirmType(type) {
      this.form.type = type
      this.config.type.show = false
    },
    onConfirmdeparture_time(time) {
      this.form.days_departure_time = time
      this.date.show = false
    },
    onConfirmDays(day) {
      this.form.day = day
      this.config.days.show = false
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
