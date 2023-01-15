<template>
  <div class="infoList">
    <el-form :inline="true" class="demo-form-inline" align="left" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="compData" border style="width: 100%">
      <el-table-column align="center" label="姓名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="性别" prop="sex_text">
      </el-table-column>
      <el-table-column align="center" label="年龄" prop="age">
      </el-table-column>
      <el-table-column align="center" label="父亲" prop="father">
      </el-table-column>
      <el-table-column align="center" label="母亲" prop="mather">
      </el-table-column>
      <el-table-column align="center" label="家庭住址" prop="address">
      </el-table-column>
      <el-table-column align="center" label="入校时间" prop="time">
      </el-table-column>
      <el-table-column align="center" label="联系方式" prop="phone">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
              @click="edit(scope.row)"
              icon="el-icon-edit"
              size="small"
              type="danger"
          >编辑</el-button>
          <el-button
              @click="del(scope.row)"
              icon="el-icon-delete"
              size="small"
              type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :title="state ? '添加学生信息' : '修改学生信息'"
        v-model="dialogFormVisible"
        width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input
              type="number"
              v-model="form.age"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
            label="父亲姓名"
            :label-width="formLabelWidth"
            prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
            label="母亲姓名"
            :label-width="formLabelWidth"
            prop="mather"
        >
          <el-input v-model="form.mather" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
            label="家庭住址"
            :label-width="formLabelWidth"
            prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
            label="入校时间"
            :label-width="formLabelWidth"
            prop="time"
        >
          <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
            label="联系方式"
            :label-width="formLabelWidth"
            prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer >
        <el-button @click="closeInfo('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </template>
    </el-dialog>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getData, changeInfo, delData } from "@/utils/table";

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mather: "",
        address: "",
        time: "",
        phone: "",
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入家庭住址" }],
        time: [{ required: true, message: "请输入入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      state: true,
    };
  },
  created() {
    getData(this, "/info");
  },
  computed: {
    compData() {
      return this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    edit(row) {
      this.state = false;
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    del(row) {
      delData(this, "/info", row.id, getData);
    },
    addStudent() {
      this.form = {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mather: "",
        address: "",
        time: "",
        phone: "",
      };
      this.state = true;
      this.dialogFormVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getData() {
      getData(this, "/info");
    },
    closeInfo(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    sure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let methods = "";
          this.state ? (methods = "post") : (methods = "put");
          changeInfo(this, methods, "/info", this.form, getData);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.infoList {
  .el-table{
    .el-button{
      width: 50px;
    }
  }
  .el-form-item {
    text-align: left;
  }
  .el-pagination {
    margin-top: 25px;
  }
}
</style>
