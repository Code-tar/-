<template>
  <div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入宿舍名称" ></el-input>
      <el-button type="primary" @click="search(input)">搜索</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button type="text" @click="dialogFormVisible = true">添加宿舍</el-button>
      <el-dialog title="添加宿舍" :visible.sync="dialogFormVisible" id="1" >
        <el-form :model="addData">
          <el-form-item label="宿舍编号" :label-width="formLabelWidth">
            <el-input v-model="addData.dormId" autocomplete="off" placeholder="仅支持数值类型"></el-input>
          </el-form-item>
          <el-form-item label="宿舍名称" :label-width="formLabelWidth">
            <el-input v-model="addData.dormName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="宿舍水电（元）" :label-width="formLabelWidth">
            <el-input v-model="addData.balance" autocomplete="off" placeholder="仅支持数值类型"></el-input>
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
              label="宿舍编号"
              prop="dormId"
              width="100">
          </el-table-column>
          <el-table-column
              label="宿舍名称"
              prop="dormName"
              width="180">
          </el-table-column>

          <el-table-column
              label="宿舍人数"
              prop="num"
              width="180">
          </el-table-column>
          <el-table-column
              label="宿舍水电费余额（元）"
              prop="balance"
              width="180">
          </el-table-column>
          <!--        <el-table-column -->
          <!--            prop="type"-->
          <!--            label="类型">-->
          <!--        </el-table-column>-->
          <el-table-column
              label="宿舍状态"
          >
            <!--          自定义转换数据-->
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.type == '1' ? '正常' : "催款中" }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="300">
            <template slot-scope="scope"
            >
              <!--            <el-button-->
              <!--                size="mini"-->
              <!--                @click="handleEdit(scope.$index, scope.row)">编辑-->
              <!--            </el-button>-->
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-dialog title="修改宿舍信息" :visible.sync="dialogFormVisible1" id="2">
                <el-form :model="changeData">
                  <el-form-item label="宿舍编号" :label-width="formLabelWidth" >
                    <el-input v-model="changeData.id" autocomplete="off" :disabled="true" ></el-input>
                  </el-form-item>
                  <el-form-item label="宿舍名称" :label-width="formLabelWidth">
                    <el-input v-model="changeData.dormName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="宿舍人数" :label-width="formLabelWidth" >
                    <el-input v-model="changeData.num" autocomplete="off" :disabled="true" ></el-input>
                  </el-form-item>
                  <el-form-item label="宿舍水电（元）" :label-width="formLabelWidth" >
                    <el-input v-model="changeData.balance" autocomplete="off"  ></el-input>
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
              <el-button
                  size="mini"

                  @click="changetype(scope)">

                    {{ scope.row.type == '1' ? '发起催款申请' : "修改为正常状态" }}

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
        dormName: '',
        dormId: '',
        balance: '',
        num:0,
        type: '',


      },
      changeData:{
        id:'1',
        dormName: '',
        dormId: '',
        balance: '',
        type: '',
        num:''
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
        url: '/dorm/getsingledorm',
        params: {
          dormName: input
        }
      }).then((res) => {
        console.log(res.data.data);
        this.data = res.data.data
        this.pageNum = res.data.data.length


      })

    },
    changetype(scope) {
      this.$confirm('确定是否修改宿舍状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        scope.row.type==1?scope.row.type=2:scope.row.type=1
        this.$message({
          type: 'success',
          message: '修改成功'

        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    // changetype(scope){
    //   console.log(scope.row.type);
    //   scope.row.type==1?scope.row.type=2:scope.row.type=1
    // },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.changeData.id = row.id
      this.changeData.num = row.num

      console.log(index, row);},
    change() {
      this.$axios({
        url:'/dorm/updatedorm',
        data: this.changeData,
        method:"post"
      }).then((res)=>{
        console.log(res.data);
        if(res.data.code===200){
          this.$axios({
            url: '/dorm/getdorm'
          }).then((res) => {
            console.log(res);
            this.data = res.data.data
            this.pageNum = res.data.data.length

          })

          this.dialogFormVisible1 = false

        }
      })

    },
    add(){
      this.dialogFormVisible=false
      console.log(this.addData);
      this.$axios({
        url:'/dorm/adddorm',
        data:this.addData,
        method:"post"
      }).then((res)=>{
        console.log(res);
        //最后一个数据删除完跳转页面
        if(res.data.code===200) {
          this.data.push(this.addData)
          this.pageNum = this.data.length
          // console.log(this.pageNum);
          let currentPage = Math.ceil(this.pageNum / this.pageSize)
          this.page = this.page < currentPage ? currentPage : this.page
        }
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
          url: '/dorm/deldorm',
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
      url: '/dorm/getdorm'
    }).then((res) => {
      console.log(res);
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