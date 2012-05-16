/** 
 * Table Search Solution.
 * Version: Get
 * Author: Kenshin 
 *
 * Dependency: {klass} {backbone.event}
 */

var Events = new Events();

/** 
 * Model Constructor 
 */
window.Model = klass({
	_id: 'M' + (new Date()).getTime(),
	attrs : {},
	_backup: {},
	_changed: false,

	/** 
	 * 预留接口,自己实现 
	 */
	initialize: function(attrs, options){
		this.attrs = this._backup = attrs;
	},

	reset: function(){
		this._changed = false;
	},

	/** 
	 * @attr 
	 */
	get: function(attr) {
      	return this.attrs[attr];
    },

    /** 
     * @attr 
     */
	has: function(attr) {
      	return this.get(attr) != null;
    },

    /**
     * @options: 'silent' 是否发布数据变更事件
     */
	set: function(obj, options) {
      	options || (options = {})
      	if (!obj) {
      		return this;
      	}
      	if (obj.attrs) {
      		obj = obj.attrs;
      	}

      	// Run validation.
      	if (!this._validate(obj, options)) return false;

      	for (var attr in obj) {
      		var val = obj[attr], now = this.get(attr);
      		if (val !== now) {
      			this.attrs[attr] = val;
      			this._changed = true;
      		}
      	}

      	if (!options.silent && this._changed) {
      		Events.trigger('Changed' + this._id, obj, options);
      	}
    },

    /**
     * @attr
     * @options: 'silent' 是否发布数据变更事件
     */
	unset: function(attr, options) {
      	(options || (options = {})).unset = true;
      	return this.set(attr, null, options);
	},

	/**
	 * return boolean
	 */
	hasChanged: function(){
		return this._changed === true;
	},

	/**
	 * reduce
	 * 还原备份数据
	 */
	reduce: function(){
		if (this.hasChanged) {
			this.set(this._backup);
			Events.trigger('Reduce' + this._id, this._backup);
		}
	},

	/**
	 * 预留接口, 自己实现
	 */
	_validate: function(attrs, options){
		var rules = this.validate || {};
		for (var attr in attrs) {
			if (rules[attr] && !attrs[attr].match(rules[attr])) {
				Events.trigger('ValidateError', attr);
				return false;
			}
		}
		return true;
	}
});

/**
 * 搜索模型, 继承自Model
 */
window.SearchCore = window.Model.extend({
	initialize: function(attrs, options){
		this.supr(attrs);
	},
	validate: {
		'phone': /^1[3458]\d{9}$/
	}
});
window.searchCore = new window.SearchCore({});

/**
 * 分页模型(外围数据模型之一), 继承自Model
 */
window.SearchPagination = window.Model.extend({
	initialize: function(attrs){
		this.supr(attrs);
	},
	validate: function(){}
});
window.searchPagination = new window.SearchPagination({});

/**
 * 表格内容模型, 继承自Model
 */
window.DataModule = window.Model.extend({
	initialize: function(data){},
	validate: function(){}
});
window.dataModule = new window.DataModule({});



/** 
 * View Constructor 
 */
window.View = klass({
	_id: 'V' + (new Date()).getTime(),
	el: $('body') || null,
	model: null,
	events: {},
	initialize: function(){},
	delegateEvents: function(){}
});


window.SearchView = window.View.extend({

});
window.searchView = new window.SearchView();


window.PaginationView = window.View.extend({

});
window.paginationView = new window.PaginationView();


window.ContentView = window.View.extend({

});
window.contentView = new window.ContentView();



/** 
 * Route Constructor 
 */
window.Route = klass({
	initialize: function(){},
	/**
	 * 组装数据到Route
	 */
	assemble: function(){},
	/**
	 * 分离数据到Model
	 */
	split: function(){},
	/**
	 * ajax处理
	 */
	get: function(){},
	post: function(){},
	ajax: function(){}
});
window.route = new window.Route();


