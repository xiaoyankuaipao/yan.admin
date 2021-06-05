<template>
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="角色名称" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色显示名称" prop="displayName">
            <el-input v-model="formData.displayName"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button style="float:right"  type="primary" @click="onSubmit">提交</el-button>
            <el-button style="float:right;margin-right:20px;" @click="onCancle">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

import {addOrUpdateRole} from '@/api/getData'
export default {
  props: {
    formData: {
      type: Object,
      default () {
        return {
          id: '',
          name: '',
          displayName: ''
        }
      }
    }
  },
  data () {
    return {
      rules: {
        displayName: [{required: true, message: '请输入角色显示名称', tigger: 'blur'}],
        name: [{required: true, message: '请输入角色名称', tigger: 'blur'}]
      }
    }
  },
  methods: {
    onCancle () {
      this.$emit('submit-complete', false)
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          addOrUpdateRole({
            id: this.formData.id,
            name: this.formData.name,
            displayName: this.formData.displayName
          }).then(res => {
            if (res && res.state === 1) {
              if (this.formData.id !== '') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              }
              this.$emit('submit-complete', true)
            } else {
              this.$message({
                message: '保存失败!',
                type: 'error'
              })
            }
          }).catch(() => {
            this.$message({
              message: '保存失败!',
              type: 'error'
            })
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
