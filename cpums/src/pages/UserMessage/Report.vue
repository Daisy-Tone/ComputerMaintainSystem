<template>
  <div class="report">
    <van-nav-bar
      title="举报审理"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="reportContent">
      <van-cell-group inset :border="false">
        <van-cell title="品行不端" />
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1">不讲信用</van-radio>
          <van-radio name="2">素质低下</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group inset :border="false">
        <van-cell title="侵犯个人权益" />
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="3">侵犯隐私</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group inset :border="false">
        <van-cell title="有害社区环境" />
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="4">垃圾广告</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group inset :border="false">
        <van-cell title="具体理由" />
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="reportBottom">
      <van-button type="default">取消</van-button>
      <van-button type="primary" color="grey">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      radio: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.report {
  margin-bottom: 100px;
}
.reportContent {
  margin-top: 30px;
}
.van-cell-group {
  margin-bottom: 20px;
}
.van-radio {
  font-size: 14px;
}
.van-radio-group {
  margin: 10px 0 5px 12px;
}
.reportBottom {
  .van-button {
    margin-left: 60px;
    .van-button__content {
      padding: 5px 15px;
    }
  }
}
</style>