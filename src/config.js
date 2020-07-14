const config = {
	bytesFileSize: 1024 * 1024, // 每个切片大小定为1MB
	fileTypes: [
		'.jpg', '.jpeg', '.webp', '.png', '.gif', '.bmp', '.svg',
		// '.txt', '.doc', '.docx', '.pdf', '.xls', '.xlsx', '.ppt', '.pptx'
	], // 文件类型
	xlsTypes: ['.xls', '.xlsx'],
	// lang      : 'zh-TW', // 香港版默认语言繁体
	lang: 'zh-CN', // 默认语言中文
	setLang: true,
	saveAccount:true,
	defaultSider:'',
	"proxy": "http://storage.uwedding.com.cn/",
	pageLimit:10
};

module.exports = config;
