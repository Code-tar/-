<template>
  <div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入内容" ></el-input>
      <el-button type="primary" @click="search(input)">搜索</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button type="text" @click="dialogFormVisible = true">添加管理员</el-button>
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" id="1">
        <el-form :model="addData">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="addData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="addData.userId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="addData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理员类型" :label-width="formLabelWidth">
            <el-select v-model="addData.type" placeholder="请选择管理员类型">
              <el-option label="普通管理员" value="1"></el-option>
              <el-option label="超级管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
    </div>
      </el-dialog>
    <div>
      <el-table
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column
            label="编号"
            prop="id"
            width="50">
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="name"
            width="180">
        </el-table-column>
        <el-table-column
            label="账号"
            prop="userId"
            width="180">
        </el-table-column>
        <!--        <el-table-column -->
        <!--            prop="type"-->
        <!--            label="类型">-->
        <!--        </el-table-column>-->
        <el-table-column
            label="类型"
        >
          <!--          自定义转换数据-->
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type == '1' ? '普通管理员' : "超级管理员" }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
<!--            <el-button-->
<!--                size="mini"-->
<!--                @click="handleEdit(scope.$index, scope.row)">编辑-->
<!--            </el-button>-->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible1" id="2">
              <el-form :model="changeData">
                <el-form-item label="编号" :label-width="formLabelWidth" >
                  <el-input v-model="changeData.id" autocomplete="off" :disabled="true" ></el-input>
                  </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="changeData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth" >
                  <el-input v-model="changeData.userId" autocomplete="off" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="changeData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员类型" :label-width="formLabelWidth">
                  <el-select v-model="changeData.type" placeholder="请选择管理员类型">
                    <el-option label="普通管理员" value="1"></el-option>
                    <el-option label="超级管理员" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="change()">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :total="pageNum" background layout="prev, pager, next" @current-change="pageChange">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      pageNum: 50,
      pageSize: 5,
      page: 1,
      data: [],
      addData: {
        name: '',
        userId: '',
        password: '',
        type: '',


      },
      changeData:{
        id:'1',
        name: '',
        userId: '',
        password: '',
        type: '',
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormVisible1: false,
    }
  },
  methods: {
    reset(){
      this.input = ''
    },
    search(input){

        this.$axios({
          url: '/admin/getsingleadmin',
          params: {
            name: input
          }
        }).then((res) => {
          console.log(res.data.data);
          this.data = res.data.data
          this.pageNum = res.data.data.length


        })

    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.changeData.id = row.id
      this.changeData.userId = row.userId

      console.log(index, row);},
    change() {
      this.$axios({
        url:'/admin/updateadmin',
        data: this.changeData,
        method:"post"
    }).then((res)=>{
        console.log(res);
        if(res.data.code===200){

          this.dialogFormVisible1 = false
          this.$axios({
            url: '/admin/getadmin'
          }).then((res) => {
            // console.log(res);
            this.data = res.data.data
            // this.pageNum = res.data.data.length

          })

        }
      })

    },
    add(){
      this.dialogFormVisible=false
      console.log(this.addData);
      this.$axios({
        url:'/admin/addadmin',
        data:this.addData,
        method:"post"
      }).then((res)=>{
        console.log(res);
          //最后一个数据删除完跳转页面
          this.data.push(this.addData)
          this.pageNum = this.data.length
          console.log(this.pageNum);
          let currentPage = Math.ceil(this.pageNum / this.pageSize)
          this.page = this.page < currentPage?currentPage:this.page

     })
    },


    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios({
          url: '/admin/deladmin',
          data: {
            id: row.id
          },
          method: 'post'
        }).then((res) => {
          console.log(res);

          if (res.data.code === 200) {
            this.data = this.data.filter((v) => {
              return v.id != row.id
            })
            //最后一个数据删除完跳转页面
            this.pageNum = this.data.length
            let currentPage =Math.ceil(this.pageNum / this.pageSize)
            this.page = this.page > currentPage?currentPage:this.page
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    pageChange(e) {
      console.log(e);
      this.page = e
    }
  },
  mounted() {
    this.$axios({
      url: '/admin/getadmin'
    }).then((res) => {
      // console.log(res);
      this.data = res.data.data
      this.pageNum = res.data.data.length

    })
  },
  computed: {
    tableData: function () {
      //  1   0-4   (page-1)*pageSize  page*pageSize-1
      //  2   5-9
      //  3   10-14
      //
      return (this.data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize))
    }

  }
}
</script>
<style>
.search .el-input {
  width: 300px;
  margin-right: 20px;
}

.search {
  border-bottom: 1px solid #999;
  padding-bottom: 20px;
}


.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-pagination {
  margin: 30px;
  float: right;
}
.search .el-dialog{
  width: 500px;
}
/*#alert{*/
/*  position: absolute;*/
/*  text-align: center;*/
/*}*/
#alert input{
  width: 200px;
  outline: none;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 8px 10px;
  margin: 5px 0;
}
#alert label{
  font-size: medium;
}
#alert input:hover {
  border-color: #C0C4CC;
}
input::-webkit-input-placeholder{
  color:#DCDFE6;
}
#alert select{
  position: relative;
  outline: none;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  font-weight: lighter;

}
</style>