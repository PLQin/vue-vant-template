
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
        @click="type.show = true"
      />
      <van-popup v-model="type.show" round position="bottom">
        <van-picker
          title="标题"
          show-toolbar
          :columns="type.columns"
          @cancel="type.show = false"
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
        v-model="form.once_departureTime"
        input-align="right"
        readonly
        clickable
        required
        label="出发时间"
        placeholder="请选择出发时间"
        @click="date.show = true"
      />
      <van-popup v-model="date.show" round position="bottom">
        <van-datetime-picker
          v-model="date.currentDate"
          type="datetime"
          title="选择完整时间"
          @cancel="date.show = false"
          @confirm="onConfirmDepartureTime"
        />
      </van-popup>
      <van-field
        v-model="form.pathway"
        input-align="right"
        label="途径地"
        placeholder="请用“，”隔开每个途径地"
      />

      <div class="interval" />
      <van-field
        v-model="form.phone"
        input-align="right"
        required
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="form.seats"
        input-align="right"
        required
        type="digit"
        label="空位"
        placeholder="请填写数量"
      />

      <div class="interval" />
      <van-cell
        center
        title="更多描述"
      >
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
      <van-cell-group class="please-agree-user-agreement">
        <p>
          <van-checkbox v-model="form.agreeUserAgreement" icon-size="16px">
            <div>
              我已阅读并同意
              <span
                class="active"
                @click.stop="$router.push({ path: '/user-agreement' })"
              >《拼车平台说明》</span>
            </div>
          </van-checkbox>
        </p>
      </van-cell-group>

      <!-- <div class="interval" /> -->
      <van-cell-group class="please-agree-user-agreement">
        <div>支付2元，信息经过审核后将立即显示</div>
        <div>请勿发布违法违规信息，否则信息将无偿删除</div>
      </van-cell-group>
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
      type: {
        show: false,
        columns: ['车找人', '人找车']
      },

      date: {
        show: false,
        currentDate: new Date()
      },

      form: this.datum
    }
  },
  computed: {},
  watch: {
    datum: {
      handler(newVal, oldVal) {
        this.form = newVal
      },
      deep: true
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onAgree() {
      this.form.agreeUserAgreement = !this.form.agreeUserAgreement
    },
    onConfirm() {

    },
    onCancel() {

    },
    onChange() {

    },
    onConfirmType(type) {
      this.form.type = type
      this.type.show = false
    },
    onConfirmDepartureTime(time) {
      this.form.once_departureTime = this.$moment(time).format('YYYY-MM-DD HH:mm')
      this.date.show = false
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
