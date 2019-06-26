<template>
  <el-menu
    default-active="2"
    :span="24"
    :unique-opened="true"
    :router="true"
    class="el-menu-vertical-demo"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/userlist">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/roletree">
        <i class="el-icon-menu"></i>
        <span slot="title">角色列表</span>
      </el-menu-item>
      <el-menu-item index="/rolelist">
        <i class="el-icon-menu"></i>
        <span slot="title">权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/commoditylist">
        <i class="el-icon-menu"></i>
        <span slot="title">商品列表</span>
      </el-menu-item>
      <el-menu-item index="3-2">
        <i class="el-icon-menu"></i>
        <span slot="title">分类参数</span>
      </el-menu-item>
      <el-menu-item index="/sortlist">
        <i class="el-icon-menu"></i>
        <span slot="title">商品分类</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="4-1">
        <i class="el-icon-menu"></i>
        <span slot="title">订单列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index="5-1">
        <i class="el-icon-menu"></i>
        <span slot="title">数据报表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {}
}
</script>

<style>
</style>
