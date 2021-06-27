class PageData {
	/**
	 * @param {string} key 
	 * @param {string} title 
	 * @param {string} description 
	 * @param {object} content 
	 * @param {boolean} closable 
	 */
	constructor(key, title, description, content, closable = false) {
		this.key = key;
		this.title = title;
		this.description = description;
		this.content = content;
		this.closable = closable;
	}
}

export default PageData;