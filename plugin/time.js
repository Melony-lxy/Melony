export function getTimeWeex(num) {
	    let d = new Date(),
		date = new Date(d.setDate(d.getDate() + num)),
		seperator = "-",
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		week = date.getDay(),
		day = date.getDate(),
	 	hours = date.getHours(),
		minutes = date.getMinutes()
		if (month < 10) {
			month = '0' + month
		}
		if (hours < 10) {
			hours = '0' + hours
		}
		if (minutes < 10) {
			minutes = '0' + minutes
		}
		if (day < 10) {
			day = '0' + day
		}
	let weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	return {
		data: month + seperator + day,
		week: weekList[week],
		time: year + seperator + month + seperator + day+' '+hours+':'+minutes,
		yearMonth:year + seperator + month,
		day:year + seperator + month + seperator + day
	};
}
