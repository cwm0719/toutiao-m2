<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" class="page-nav-bar"></van-nav-bar>

    <!-- 登录表单 -->
    <!-- 注册点击登录的事件 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <!-- 手机号码输入部分开始 -->
      <!-- v-model 绑定对应数据 -->
      <!-- 对验证规则进行优化，设置number 属性控制输入的类型，
      以及添加 maxlength 属性设置最大数 -->
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!--要使用插槽要将van-field单标签变成双标签  -->
        <!-- 使用插槽的方式给 van-field 添加图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 手机号码输入部分结束 -->

      <!-- 验证码输入部分开始 -->
      <!-- v-model 绑定对应数据 -->
      <!-- 对验证规则进行优化，设置number 属性控制输入的类型，
      以及添加 maxlength 属性设置最大数 -->
      <van-field
        name="code"
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 使用插槽的方式给第二个van-field 添加 button 按钮 -->
        <template #button>
          <!-- 倒计时组件van-count-down -->
          <!-- 绑定 time 属性为倒计时时间 -->
          <!-- 设置 format 属性为格式化时间的格式 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 点击验证码，会触发手机号和验证码的规则 -->
          <!-- 但是我们只需要验证手机号的规则，这属于官方的一个 bug -->
          <!-- 官方解决方案:给 button 组件设置native-type设置，否则会触发表单提交。 -->
          <!-- 给按钮绑定点击事件--触发onSendSms回调-->
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            type="primary"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- 验证码输入部分结束 -->

      <!-- 登录按钮部分开始 -->
      <div class="login-btn-wrap" style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
      <!-- 登录按钮部分结束 -->
    </van-form>
  </div>
</template>

<script>
// login.vue 中按需导入封装的请求模块
import { login, sendSms } from '@/api/user.js'
export default {
  // 这是组件名称，有三个作用：
  // 1、允许组件模板递归地调用自身，就是在组件内部调用自身组件showtooltip
  // 2、便于调试。有名字的组件有更友好的警告信息。另外，当在有 vue-devtools，
  // 未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，
  // 可以获得更有语义信息的组件树。
  // 3.最后一种应该是使用比较多的情况，就是当我们使用 keep-alive时可以使用
  // include和exclude指定需要缓存和不需要缓存的组件。指定的依据就是组件的name。(*****)
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      // 根据接口要求绑定获取表单数据，在登录页面组件的实例选项 data 中添加 user 数据字段
      user: {
        mobile: '',
        code: ''
      },
      // 用户名和验证码校验规则
      // ()是为了提取匹配字符串的，表达式中有几个()就有几个相应的匹配字符串
      // [] 是定义匹配的`单个字符`的范围，比如[a-zA-Z0-9]表示相应位置的字符要匹配英文字符或数字。
      // {} 一般是用来匹配的`长度`，格式为{n}、{n,m}、{n,}。(ab){0,12}? 表示匹配0到12次但尽可能少。
      // \d数字。\D非数字。
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 控制倒计时的显示和隐藏
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  create() {},
  mounted() {},
  methods: {
    // 表单提交事件
    // 事件名:--说明:--回调函数
    // submit:--提交表单且验证通过后触发:--values: object
    // failed:--提交表单且验证不通过后触发:--errorInfo:--{ values: object, errors: object[] }

    // 表单提交事件
    async onSubmit(values) {
      console.log('submit', values)
      // 1.获取表单数据
      const user = this.user
      // 2. 表单验证
      //    加载提示
      this.$toast.loading({
        message: '登录中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认是 2000，如果为 0 则持续展示
        duration: 0
      })
      // 3. 提交表单请求登录
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        // 判断是否有error响应体
        if (error.response && error.response.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登录失败，请稍后重试', error)
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },

    // 验证手机验证码
    async onSendSms() {
      console.log(1111)
      try {
        // 在事件处理程序中，获取到表单对象,调用 validate 方法,就可以实现表单校验
        // validate 方法支持传入name来验证单个表单项,所以我们给<van-field>组件设置name属性为mobile和code
        await this.$refs.loginFrom.validate('mobile')
        console.log('校验成功')
      } catch (err) {
        return console.log('校验失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// style中的lang属性决定了样式中的语法，
// 设置了scoped属性就可以避免当前页面的样式污染到其他页面。

// 在style经常用scoped属性实现组件样式的私有化,所以才需要样式穿透
// >>> 只作用于css
// ::v-deep 只作用于sass
// /deep/ 只作用于less

// /deep/使用场景：当我们开发一个`页面父组件`使用了`子组件`的时候，
// 如果这时候`父组件`需要改`子组件`的样式，
// 但是又不影响`其他页面`使用这个`子组件`的样式的时候。
// 原理：这样在打包的时候会生成一个独一无二hash值追加给原本这个类名

.login-container {
  .toutiao {
    //字体图标是我们引入的;不属于Vant的内容采用1倍图
    //设置字体图标大小;尺寸是24*37;取最大的37px
    font-size: 37px;
  }
  //`获取验证码`的按钮样式
  .send-sms-btn {
    // width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  //登录按钮样式
  .login-btn-wrap {
    //不让整个盒子顶着上方
    padding: 53px 53px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
//发送验证码按钮:需求只改变这个页面的这个button按钮;使用/deep/
//.van-button--primary这个类名源于Vant组件内部封装的button组件自带
//默认的边框颜色是绿色这里更改为蓝色
/deep/ .van-button--primary {
  border-color: #1989fa !important;
}
</style>
