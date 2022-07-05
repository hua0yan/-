<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        maxlength="11"
      >
        <!-- 左边图标插槽 -->
        <template #left-icon>
          <touTiaoIcon icon="shouji" />
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <!-- 左边图标插槽 -->
        <template #left-icon>
          <touTiaoIcon icon="yanzhengma" class="toutiao" />
        </template>
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down
            v-if="iscountDown"
            :time="5000"
            format=" ss 秒"
            @finish="iscountDown = false"
          />
          <!-- 发送验证码组件 -->
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="default"
            native-type="button"
            @click="sendSmCode"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Userlogin, getSmscode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      iscountDown: false,
      isDisabled: false,
      user: {
        mobile: "1391111111",
        code: "246810",
      },
      //表单校验规则。详参见vant里form表单
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号输入不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码输入不正确",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //try,catch监视方法，一般和async和swait一起使用，一旦监视到try里面的错误就会进入catch里面
    async onSubmit() {
      try {
        await Userlogin(this.user);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "登录失败");
      }
    },
    //发送验证码

    async sendSmCode() {
      try {
        //校验成功才会继续执行await后面的代码
        this.isDisabled = true;
        await this.$refs.form.validate("mobile");
      } catch (e) {
        return;
      }
      try {
        //检验成功就会进行显示倒计时组件
        await getSmscode(this.user.mobile);
        this.iscountDown = true;
        Toast.success("发送验证码成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "出错了");
        this.iscountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
