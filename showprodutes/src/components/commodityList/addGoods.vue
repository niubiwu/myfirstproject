<template>
  <el-card>
    <!-- breadcrumb导航 -->
    <breadcrumb oneName="商品管理" twoName="商品列表"></breadcrumb>
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <el-steps :active="active" finish-status="success" :space="200" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs tab-position="left" @tab-click="tabClick">
      <el-tab-pane label="基本信息">
        <el-form :model="form" :rules="rules" ref="form" :label-position="top">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="form.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model.number="form.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model.number="form.goods_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model.number="form.goods_weight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :required="true">
            <el-cascader
              v-model="value"
              :clearable="true"
              :options="sortData"
              :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',children:'children' }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-form>
          <el-form-item :label="item.attr_name" v-for="item in goodsMany" :key="item.id">
            <div>
              <el-checkbox
                v-for="(tag,index) in item.attr_vals.split(',')"
                :key="index"
                border
                checked="true"
              >{{tag}}</el-checkbox>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form>
          <el-form-item :label="item.attr_name" v-for="item in goodsOnly" :key="item.attr_id">
            <el-input autocomplete="off" v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
    <!-- 新增弹框按钮 -->
  </el-card>
</template>

<script>
// 导入面包屑组件
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      active: 0,
      // 表单的数据源
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: ""
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格(必须为数字)",
            trigger: "blur",
            type: "number"
          }
        ],
        goods_number: [
          {
            required: true,
            type: "number",
            message: "请输入商品数量(必须为数字)",
            trigger: "blur"
          }
        ],
        goods_weight: [
          {
            required: true,
            message: "请输入商品重量(必须为数字)",
            type: "number",
            trigger: "blur"
          }
        ]
      },
      sortData: [],
      value: [],
      goodsMany: [],
      goodsOnly: []
    };
  },
  methods: {
    tabClick(tabdom) {
      this.active = +tabdom.index;
      let id = this.value[this.value.length - 1];
      if (this.value.length !== 0) {
        if (this.active === 1) {
          this.$http({
            method: "get",
            url: `categories/${id}/attributes?sel=many`
          }).then(res => {
            const { data, meta } = res.data;
            if (meta.status === 200) {
              this.goodsMany = data;
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else if (this.active === 2) {
          this.$http({
            method: "get",
            url: `categories/${id}/attributes?sel=only`
          }).then(res => {
            const { data, meta } = res.data;
            if (meta.status === 200) {
              this.goodsOnly = data;
            } else {
              this.$message.error(meta.msg);
            }
          });
        }
      } else {
        this.$message.error("请输入商品分类的信息");
      }
    },
    // 获取级联数据
    getsortData() {
      this.$http({
        method: "get",
        url: "categories?type=3"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.sortData = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
    // 验证
  },
  mounted() {
    this.getsortData();
  }
};
</script>

<style scope>
.el-alert {
  margin: 20px 0px;
}
.el-steps {
  margin-bottom: 20px;
}
.el-step__title {
  font-size: 12px;
}
.el-cascader {
  display: block;
  width: 240px;
}
.el-form-item__label {
  float: none;
}
.el-checkbox {
  margin-right: 0px;
}
/* .el-card__body {
  height: 1000px;
} */
</style>
