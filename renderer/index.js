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

    cuurentXML: null,

    currentValue: '',

    auth_file: $('.auth_files'),

    dogauthArgs: []
  },
  init_event () {
    this.config.lincese.click(() => {
      this.showOpenDialogs()
    })
    this.renderTable(this.config.dogauthArgs)

    this.config.addsercretID.click(() => {
      if(this.currentValue&& this.cuurentXML){
        // currentValue不可重复
        let {dogId,dogXml} = {dogId:this.config.currentValue,dogXml:this.config.cuurentXML}
        this.dogauthArgs.push({dogId,dogXml})
        
      }else{
        this.config.currentXML = ''
        this.config.auth_file.val(this.config.cuurentXML)
        return;
      }
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
      if(result.canceled){
         return 
      }
      this.config.cuurentXML = result.filePaths[0]
      this.config.auth_file.val(this.config.cuurentXML)
      this.XmlRender(result.filePaths[0]).then(res => {
        console.log(res)
        // this.config.cuurentXML = res

      })
    }).catch(err => {
      console.log(err)
      this.config.cuurentXML = null 
      this.config.auth_file.val(this.config.cuurentXML)
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
  toUtil(from,...selectors){
    return  [...selectors].map(s =>
         s.replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.') .filter(t => t !== '') 
        .reduce((prev, cur) => prev && prev[cur], from) );
        // const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] }; 
    // Example get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
  }
 
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

