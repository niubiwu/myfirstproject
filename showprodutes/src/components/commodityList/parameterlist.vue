<template>
  <el-card>
    <!-- 面包导航组件 -->
    <breadcrumb oneName="商品管理" twoName="分类参数"></breadcrumb>
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 级联框 -->
    <div class="goodsList">
      请选择参数分类：
      <el-cascader
        v-model="selVal"
        :clearable="true"
        :options="sortData"
        :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',children:'children' }"
      ></el-cascader>
    </div>
    <el-tabs @tab-click="tabclick">
      <el-tab-pane label="动态参数" name="first">
        <template>
          <div class="btn">
            <el-button type="primary" @click="dialogFormVisible = true" :disabled="isable">添加动态参数</el-button>
          </div>
          <el-table :data="goodsMany" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="item in scope.row.attr_vals.split(',')"
                  :key="item"
                  closable
                  :disable-transitions="false"
                >{{item}}</el-tag>
                <el-button class="button-new-tag" size="small">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="商品参数" width="200"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  plain
                  type="primary"
                  icon="el-icon-edit"
                  @click="showData(scope)"
                ></el-button>
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteAttr(scope.row.attr_id, scope.row.cat_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        {{goodsMany}}
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <template>
          <div class="btn">
            <el-button type="primary" @click="dialogFormVisible = true" :disabled="isable">添加静态参数</el-button>
          </div>
          <el-table :data="goodsOnly" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="200"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  plain
                  type="primary"
                  icon="el-icon-edit"
                  @click="showData(scope)"
                ></el-button>
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteAttr(scope.row.attr_id, scope.row.cat_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        {{goodsOnly}}
      </el-tab-pane>
    </el-tabs>
    <!-- 属性添加框 -->
    <el-dialog title="添加属性" :visible.sync="dialogFormVisible">
      {{tabnum}}
      <el-form :model="form">
        <el-form-item label="动态属性" :label-width="formLabelWidth" :required="true" v-if="tabnum===0">
          <el-input v-model="form.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="静态属性" :label-width="formLabelWidth" :required="true" v-if="tabnum===1">
          <el-input v-model="form.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="静态属性值"
          :label-width="formLabelWidth"
          :required="true"
          v-if="tabnum===1"
        >
          <el-input v-model="form.attr_vals" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttr">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 属性修改框 -->
    <el-dialog title="修改属性" :visible.sync="dialogVisible">
      {{tabnum}}
      <el-form :model="formData">
        <el-form-item label="动态属性" :label-width="formLabelWidth" :required="true" v-if="tabnum===0">
          <el-input v-model="formData.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="静态属性" :label-width="formLabelWidth" :required="true" v-if="tabnum===1">
          <el-input v-model="formData.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="静态属性值"
          :label-width="formLabelWidth"
          :required="true"
          v-if="tabnum===1"
        >
          <el-input v-model="formData.attr_vals" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putAttr()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      sortData: [],
      isable: false,
      selVal: [],
      goodsMany: [],
      goodsOnly: [],
      form: {
        attr_name: "",
        attr_sel: "",
        attr_vals: ""
      },
      formData: {
        attr_id: "",
        attr_name: "",
        attr_sel: "",
        attr_vals: ""
      },
      tabnum: 0,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      dialogVisible: false
    };
  },
  methods: {
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
    },
    tabclick(tabdom) {
      if (this.selVal.length === 0) {
        this.isable = true;
      } else {
        this.isable = false;
        let tabNum = +tabdom.index;
        let id = this.selVal[this.selVal.length - 1];
        if (tabNum === 0) {
          this.tabnum = tabNum;
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
        } else if (tabNum === 1) {
          this.tabnum = tabNum;
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
      }
    },
    deleteAttr(id, attrid) {
      console.log(id, attrid);

      this.$confirm("此操作将永久删除该属性, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: `categories/${attrid}/attributes/${id}`
        }).then(res => {
          const { meta } = res.data;
          if (meta.status === 200) {
            this.$message({
              type: "success",
              message: meta.msg
            });
            this.getAttrData();
          }
        });
      });
    },
    getAttrData() {
      let id = this.selVal[this.selVal.length - 1];
      let sel = this.tabnum === 0 ? "many" : "only";
      this.$http({
        method: "get",
        url: `categories/${id}/attributes?sel=${sel}`
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          if (this.tabnum === 0) {
            this.goodsMany = data;
          } else {
            this.goodsOnly = data;
          }
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 增加给商品加参数
    addAttr() {
      let id = this.selVal[this.selVal.length - 1];
      let sel = this.tabnum === 0 ? "many" : "only";
      this.$http({
        method: "post",
        url: `categories/${id}/attributes`,
        data: {
          attr_name: this.form.attr_name,
          attr_sel: sel,
          attr_vals: this.form.attr_vals
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 201) {
          this.dialogFormVisible = false;
          this.getAttrData();
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    //  点开渲染数据
    showData(scope) {
      this.dialogVisible = true;
      this.formData.attr_name = scope.row.attr_name;
      this.formData.attr_vals = scope.row.attr_vals;
      this.formData.attr_id = scope.row.attr_id;
    },
    // 修改商品参数
    putAttr(id, attrid) {
      this.$http({
        method: "put",
        url: `categories/${id}/attributes/${attrid}`
      }).then(res => {
        const { data, meta } = res.data;
        if (status === 200) {
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
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
.goodsList {
  margin-bottom: 30px;
}
.el-tag {
  margin-right: 10px;
}
.btn {
  margin-bottom: 15px;
}
</style>
