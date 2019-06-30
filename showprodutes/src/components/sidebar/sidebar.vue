<template>
  <el-menu
    default-active="2"
    :span="24"
    :unique-opened="true"
    :router="true"
    class="el-menu-vertical-demo"
  >
    <el-submenu v-for="item1 in navData" :key="item1.id" :index="item1.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item1.authName}}</span>
      </template>
      <el-menu-item v-for="item2 in item1.children" :key="item2.id" :index="'/'+item2.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item2.authName}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      navData: []
    }
  },
  methods: {
    // 动态生成权限列表
    getUserRights () {
      this.$http({
        method: 'get',
        url: 'menus'
      }).then(res => {
        const { data, meta } = res.data
        if (meta.status === 200) {
          this.navData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getUserRights()
  }
}
</script>

<style>
</style>
