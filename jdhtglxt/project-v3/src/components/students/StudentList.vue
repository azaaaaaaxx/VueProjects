<template>
  <div class="studentList">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      align="left"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="compData" border style="width: 100%">
      <el-table-column align="center" label="姓名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="性别" prop="sex_text">
      </el-table-column>
      <el-table-column align="center" label="年龄" prop="age">
      </el-table-column>
      <el-table-column align="center" label="学号" prop="number">
      </el-table-column>
      <el-table-column align="center" label="班级" prop="class">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="state_text">
      </el-table-column>
      <el-table-column align="center" label="地址" prop="address">
      </el-table-column>
      <el-table-column align="center" label="联系方式" prop="phone">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button class="btn"
            @click="del(scope.row)"
            icon="el-icon-delete"
            size="small"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { students, studentDel } from "@/api/api";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      formInline: {
        name: "",
      },
    };
  },
  created() {
    this.getData();
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
    getData(params) {
      students(params).then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    del(row) {
      studentDel(row.id).then((res) => {
        if (res.data.status === 200) {
          this.$message({ message: res.data.message, type: "success" });
          this.getData();
        }
      });
    },
    find() {
      this.getData(this.formInline)
    },
    reset() {
      this.formInline = {}
      this.getData(this.formInline)
    },
  },
};
</script>

<style lang="less" scoped>
.studentList {
  .el-table{
    .btn{
      width: 50px;
    }
  }
  .el-pagination {
    margin-top: 25px;
  }
}
</style>
