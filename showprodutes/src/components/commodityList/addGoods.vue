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
        <el-form :model="form" :rules="rules" ref="form" label-position="top">
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
                :checked="true"
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
      <el-tab-pane label="商品图片">
        <el-upload
          :on-success="imgSuccess"
          :on-remove="removeImg"
          :on-preview="imgPreview"
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          {{fileList}}
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <el-button size="small" type="success" @click="addGoods">新增商品</el-button>
        <quill-editor v-model="content" ref="myQuillEditor"></quill-editor>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增弹框按钮 -->
    <el-dialog title="提示" :visible.sync="imgVisible" width="30%">
      <img src alt ref="myimg">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgVisible = false">取 消</el-button>
        <el-button type="primary" @click="imgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// 导入面包屑组件
import breadcrumb from '../layout/breadcrumb'
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data () {
    return {
      active: 0,
      // 表单的数据源
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          {
            required: true,
            message: '请输入商品价格(必须为数字)',
            trigger: 'blur',
            type: 'number'
          }
        ],
        goods_number: [
          {
            required: true,
            type: 'number',
            message: '请输入商品数量(必须为数字)',
            trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true,
            message: '请输入商品重量(必须为数字)',
            type: 'number',
            trigger: 'blur'
          }
        ]
      },
      sortData: [],
      value: [],
      goodsMany: [],
      goodsOnly: [],
      fileList: [],
      uploadHeaders: {
        Authorization: window.localStorage.getItem('token')
      },
      imgVisible: false,
      // 富文本框的导入
      content: ''
    }
  },
  methods: {
    tabClick (tabdom) {
      this.active = +tabdom.index
      let id = this.value[this.value.length - 1]
      if (this.value.length !== 0) {
        if (this.active === 1) {
          this.$http({
            method: 'get',
            url: `categories/${id}/attributes?sel=many`
          }).then(res => {
            const { data, meta } = res.data
            if (meta.status === 200) {
              this.goodsMany = data
            } else {
              this.$message.error(meta.msg)
            }
          })
        } else if (this.active === 2) {
          this.$http({
            method: 'get',
            url: `categories/${id}/attributes?sel=only`
          }).then(res => {
            const { data, meta } = res.data
            if (meta.status === 200) {
              this.goodsOnly = data
            } else {
              this.$message.error(meta.msg)
            }
          })
        }
      } else {
        this.$message.error('请输入商品分类的信息')
      }
    },
    // 获取级联数据
    getsortData () {
      this.$http({
        method: 'get',
        url: 'categories?type=3'
      }).then(res => {
        const { data, meta } = res.data
        if (meta.status === 200) {
          this.sortData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 挂载操作图片的钩子函数
    imgSuccess (response, file, fileList) {
      // 管理所有上传图片的集合
      this.fileList.push(response.data.tmp_path)
    },
    removeImg (file, fileList) {
      this.fileList.forEach((item, index) => {
        if (item === file.response.data.tmp_path) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 预览图片
    imgPreview (file) {
      this.imgVisible = true
      let url = file.response.data.url
      this.$nextTick(() => {
        this.$refs.myimg.src = url
      })
    },
    // 新增商品

    addGoods () {
      let goodscat = this.value.join(',')
      this.$http({
        method: 'post',
        url: 'goods',
        data: {
          ...this.form,
          goods_introduce: this.content,
          goods_cat: goodscat
        }
      }).then(res => {
        const { meta } = res.data
        if (meta.status === 201) {
          this.$router.push('/goods')
          this.$message({
            type: 'success',
            message: meta.msg
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getsortData()
  }
}
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
.ql-editor {
  height: 400px;
}
/* .el-card__body {
  height: 1000px;
} */
</style>
