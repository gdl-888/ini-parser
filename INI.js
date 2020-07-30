module.exports = {
	parse: function parseINI(iniString) {
		if(iniString.includes('\r') && !iniString.includes('\n')) {  // 매킨토시
			iniString = iniString.replace(/\r/g, '\n');
		}
		else if(iniString.includes('\r') && iniString.includes('\n')) {  // 도스와 윈도우
			iniString = iniString.replace(/\r/g, '');
		}
		
		var retval = {};
		
		var currentSection = null;
		
		for(ln of iniString.split('\n')) {
			if(ln.replace(/\s/g, '') == '') continue;
			
			const section = ln.match(/^\[(.+)\]$/);
			const comment = ln.match(/^[;]/);
			const data    = ln.match(/((?:(?![=]).)+)[=](.+)/);
			
			if(comment) continue;
			else if(section) {
				currentSection = section[1];
			}
			else if(data) {
				if(!currentSection) {
					continue;
				}
				
				if(!retval[currentSection]) retval[currentSection] = {};
				retval[currentSection][data[1]] = data[2];
			}
		}
		
		return retval;
	}
}