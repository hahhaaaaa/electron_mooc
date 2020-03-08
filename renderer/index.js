// const { ipcRenderer, dialog } = require('electron').remote
// document.getElementById('add-music-button').addEventListener('click', () => {
//   ipcRenderer.send('add-music-window');
// })
const fs = require('fs')
const path = require('path')
const parseString = require('xml2js').parseString

let addSecrete = {
  config: {
    secreteId: $('.secreteId'),
    // 授权文件
    lincese: $('#button-addon2'),

    addsercretID: $('.addsercretID'),

    cuurentXML: '',

    currentValue: '',

    dogauthArgs: []
  },
  init_event () {
    this.config.lincese.click(() => {
      this.showOpenDialogs()
    })
    this.renderTable(this.config.dogauthArgs)

    this.config.addsercretID.click(() => {
      console.log('123')
    })
  
  },
  showOpenDialogs () {
    const { dialog } = require('electron').remote
    let options = {
      title: "打开文件",
      defaultPath: "",
      properties: ['openFile'],
      filters: [
        { name: 'XML', extensions: ['xml'] },
      ]
    }

    dialog.showOpenDialog(options).then(result => {
      // console.log(result.filePaths[0])
      if(result.canceled){
        
         return 
      }
      this.XmlRender(result.filePaths[0]).then(res => {
        console.log(res)
      })
    }).catch(err => {
      console.err(err)
    })
  },
  XmlRender (filePath) {
    return new Promise((resolve, reject) => {
      let data = fs.readFileSync(filePath)
      parseString(data, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
    //  await pareseStrig(filePath,(err,result)=>{
    //      if(err){
    //        throw err
    //      }
    //   })
  },
  renderOpertion (value, row, index) {
     return `<a>删除</a>`
  },
  renderTable (data) {
    $('#table').bootstrapTable('destroy').bootstrapTable({
      showLoading:false,
      height:200,
      theadClasses: "thead-light",//这里设置表头样式
      classes:"table table-borderd table-striped",
      columns: [
        {
        field: 'id',
        title: '密码狗ID',
        }, {
            field: 'file',
            title: '授权文件'
        }, {
            field: 'operate',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter: this.renderOpertion,
        } 
      ], 
      data: data
    })
    .bootstrapTable('hideLoading')
    .bootstrapTable('refreshOptions', {
      locale:'zh-CN'
    })
  },
 
}

// addSecrete.renderTable(this.addSecrete.config.dogauthArgs)
addSecrete.init_event()

// [{
//   'id': 0,
//   'file': undefined,
  
// },
// {
//   'id': 1,
//   'file': 'Item 1',
  
// },
// {
//   'id': 2,
//   'file': 'Item 2',
 
// },
// {
//   'id': 3,
//   'file': undefined,

// }]
// addSecrete.renderTable()

