<template>
  <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="父级菜单" prop="parentName">
        <treeselect :options="dataList" placeholder="请选择上级菜单" v-model="formData.parentId"  />
    </el-form-item>
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="编号(唯一)" prop="code">
      <el-input v-model="formData.code"></el-input>
    </el-form-item>
    <el-form-item label="Url" prop="address">
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="formData.icon"></el-input>
    </el-form-item>
    <el-form-item label="菜单类型">
        <el-select v-model="formData.menuType" filterable >
            <el-option v-for="item in menuType" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
      <el-button style="float:right"  type="primary" @click="submit">提交</el-button>
      <!-- <el-button style="float:right;margin-right:20px;"    @click="close">返回</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenuComboxTree, addMenu, updateMenu } from '@/api/getData'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Treeselect
  },
  props: {
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    editType: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  data () {
    return {
      dataList: [],
      icons: [],
      menuTree: [],
      menuType: [
        {
          value: 1,
          label: '导航'
        },
        {
          value: 2,
          label: '嵌入页面'
        },
        {
          value: 3,
          label: '按钮'
        }
      ],
      typeValue: '',
      rules: {
        name: [{ required: true, message: '请输入菜单名称', tigger: 'blur' }],
        code: [{ required: true, message: '请输入菜单编码', tigger: 'blur' }]
      }
    }
  },
  created () {
    this.getMenu()
  },
  methods: {
    async getMenu () {
      let res = await getMenuComboxTree()
      if (res.state === 1) {
        var result = res.data
        console.log(res.data)
        result.forEach(c => {
          this.addLabel(c)
        })
        this.dataList = result
      }
    },
    addLabel (item) {
      item.label = item.text
      if ('children' in item && item.children.length > 0) {
        item.children.forEach(row => {
          this.addLabel(row)
        })
      } else {
        item.children = null
      }
    },
    submit () {
      console.log(this.formData)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editType === 1) {
            addMenu(this.formData).then(res => {
              if (res && res.state === 1) {
                this.$message({ message: '添加成功!', type: 'success' })
                this.$emit('submit-complete', true)
              } else {
                this.$message({ message: '添加失败!', type: 'error' })
              }
            })
          } else if (this.editType === 2) {
            updateMenu(this.formData).then(result => {
              if (result && result.state === 1) {
                this.$message({ message: '修改成功!', type: 'success' })
                this.$emit('submit-complete', true)
              } else {
                this.$message({ message: '修改失败!', type: 'error' })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
