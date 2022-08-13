<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" class="page-nav-bar"></van-nav-bar>

    <!-- 登录表单 -->
    <!-- 注册点击登录的事件 -->
    <van-form @submit="onSubmit">
      <!-- 手机号码输入部分开始 -->
      <!-- v-model 绑定对应数据 -->
      <van-field name="手机号" v-model="user.mobile" placeholder="请输入手机号">
        <!--要使用插槽要将van-field单标签变成双标签  -->
        <!-- 使用插槽的方式给 van-field 添加图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 手机号码输入部分结束 -->

      <!-- 验证码输入部分开始 -->
      <!-- v-model 绑定对应数据 -->
      <van-field name="验证码" v-model="user.code" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 使用插槽的方式给第二个van-field 添加 button 按钮 -->
        <template #button>
          <van-button class="send-sms-btn" size="small" type="primary">
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
import { login } from '@/api/user.js'
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
      }
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
    }
  }
}
</script>

<style scoped lang="less">
// style中的lang属性决定了样式中的语法，
// 设置了scoped属性就可以避免当前页面的样式污染到其他页面。

// 在style经常用scoped属性实现组件的私有化,所以才需要样式穿透
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
