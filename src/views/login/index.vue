<template>
  <div class="login-container">登录页面</div>
</template>

<script>
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
    return {}
  },
  computed: {},
  watch: {},
  create() {},
  mounted() {},
  methods: {}
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
</style>
