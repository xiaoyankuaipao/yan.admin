<template>
  <el-form :model="formData" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.category"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button style="float:right" type="primary" @click="onSubmit">提交</el-button>
          <el-button style="float:right;margin-right:20px;" @click="onCancle">返回</el-button>
      </el-form-item>

  </el-form>
</template>

<script>
import { addCategory, updateCategory } from '@/api/getData'
export default {
  props: {
    formData: {
      type: Object,
      default () {
        return {
          id: '',
          category: ''
        }
      }
    }
  },
  data () {
    return {
      rules: {
        category: [
          {
            required: true,
            message: '请输入分类名称',
            tigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onCancle () {
      this.$emit('submit-complete', false)
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        console.log(this.formData)
        if (valid) {
          if (this.formData.id === '') {
            addCategory({
              id: this.formData.id,
              category: this.formData.category
            }).then(res => {
              console.log(res)
              if (res && res.state === 1) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$emit('submit-complete', true)
              } else {
                this.$message({
                  message: '添加失败!',
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({
                message: '添加失败!',
                type: 'error'
              })
              console.log(err)
            })
          } else {
            updateCategory({
              id: this.formData.id,
              category: this.formData.category
            }).then(res => {
              console.log(res)
              if (res && res.state === 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('submit-complete', true)
              } else {
                this.$message({
                  message: '修改失败!',
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({
                message: '修改失败!',
                type: 'error'
              })
              console.log(err)
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
