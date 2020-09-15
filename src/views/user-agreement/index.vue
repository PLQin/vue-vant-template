
<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-notice-bar
      wrapable
      :scrollable="false"
      text="免责声明：本平台仅提供信息交流，请大家自行辨别真伪！如要求付订金很可能是骗子，上车前请您核对车主身份信息并签订拼车协议！"
    />

    <div class="interval" />

    <div class="van-panel__footer">
      <div class="title">司机须知</div>
      <ul>
        <li>1.要确认好拼车人信息。详细记录拼车者姓名、年龄、身份证、个人及家庭联系方式等，最好有认识的人一起拼车。</li>

        <li>2.与乘客约好出发时间，出发前1天最好给乘客通一次电话提醒对方。</li>

        <li>3.要明确拼车所需的费用。尤其是一旦发生交通违章造成罚款的分担，以及车辆发生问题所带来的维修费用的承担。</li>

        <li>4.要和乘客明确是上车前支付还是上车后支付，还应明确额外费用的支付方式。</li>

        <li>5.合理规划时间，总路程不宜超过十小时，不走夜路。不要疲劳驾驶，同时保管好个人财物。</li>

        <li>6.车主和同车人应分别将了解到的对方信息发送给至少一名亲友，以备出现问题后联系使用，并有意让对方知道这个情况。</li>

        <li>7.事先确定好关于吸烟等细节的规则，特别是有女性和小孩在场的时候。</li>

        <li>8.签协议和买保险是非常有必要的。</li>
      </ul>
    </div>

    <div class="van-panel__footer">
      <div class="title">乘客须知</div>
      <ul>
        <li>1.拼车者最好是熟悉的。与陌生人拼车时，要注意预防骗子或劫车者，车主和乘车人有必要互相了解对方的真实身份及联系方式。</li>

        <li>2.车主和同车人应分别将了解到的对方信息发送给至少一名亲友，以备出现问题后联系使用，并有意让对方知道这个情况。</li>

        <li>3.搭车人应事先了解驾驶员的技术水平、所用车型。关键是有无跑长途的经历。</li>

        <li>4.要和乘客明确是上车前支付还是上车后支付，还应明确额外费用的支付方式。</li>

        <li>5.总路程不宜超过10小时，不走夜路。避免心急赶路和疲劳驾驶，合理安排休息。</li>

        <li>6.车主对于没有驾驶过所乘车型的同车人，尽量不要让其参与驾驶。</li>

        <li>7.不要在途中向同车不熟悉的人炫耀自己的或者所携带财物情况。</li>

        <li>8.女性车主或乘车人应有熟悉的男性成年亲友相伴。</li>

        <li>9.事先确定好关于吸烟等细节的规则，特别是有女性和小孩在场的时候。</li>

        <li>10.签协议和买保险是非常有必要的。</li>
      </ul>
    </div>

    <div class="open-floor" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '拼车',
      active: 'home'
    }
  },
  computed: {},
  created() {
    console.log(this.$route)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
