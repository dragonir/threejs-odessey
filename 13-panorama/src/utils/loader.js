/* eslint-disable */
export default class Loader {
  constructor() {
    this.data = [];
    this.self = {};
    this.load = {};
    this.setupSelf();
    this.setupLoad();
  }

  setupSelf() {
    const _this = this;
    const self = {};
    self.allType = {
      image: ['jpg', 'png'],
      json: ['json'],
      audio: ['mp3'],
    };
    // 获取该文件的类型
    self.getType = function (u) {
      const _type = (u.match(/[^\.]+$/)[0]);
      let _result = null;
      for (let key in self.allType) {
        if (self.allType[key].join(',').indexOf(_type) !== -1) {
          _result = key;
          break;
        } else {
          _result = 'nonsupport';
        }
      }
      return _result;
    };

    // 格式化数据
    self.setData = function (data) {
      const _data = [];
      data.forEach(function (e, i, o) {
        const _url = e.url || e;
        const _type = self.getType(_url);
        const _callback = e.callback || null;
        _data.push({
          url: _url,
          type: _type,
          callback: _callback,
        });
      });
      this.data = _data;
      _this.data = _data;
    };
    this.self = self;
  }

  setupLoad() {
    const _this = this;
    const load = {};
    load.events = {
      start: null,
      loading: null,
      complete: null,
      error: null,
    };
    load.on = function (t, c) {
      load.events[t] = c;
    };
    load.off = function (t) {
      load.events[t] = null;
    };
    load.start = function (d) {
      const _d = d || _this.data;
      load.nowProgress = 0;
      load.allProgress = _d.length;
      load._runEvent('start');
      _d.forEach(function (e, i, o) {
        e.type !== 'nonsupport' && load[`_${e.type}`](e);
      });
    };
    load._complete = function (o, e) {
      o.callback && o.callback(e);
      load.nowProgress++;
      load._runEvent('loading');
      load._runEvent('complete');
    };
    load._error = function (o, e) {
      load._runEvent('error');
    };
    load._runEvent = function (k) {
      switch (k) {
        case 'start':
          load.events.start && load.start();
          break;
        case 'loading':
          load.events.loading && load.events.loading({ nowProgress: load.nowProgress, allProgress: load.allProgress });
          break;
        case 'complete':
          load.events.complete && load.nowProgress === load.allProgress && load.events.complete();
          break;
        case 'error':
          load.events.error && load.events.error();
          break;
        default:
          break;
      }
    };
    load._get = function (o, type) {
      const _xhr = new XMLHttpRequest();
      _xhr.open('post', o.url, true);
      _xhr.responseType = type;
      _xhr.send();
      _xhr.onload = function (e) {
        load._complete(o, e.currentTarget.response);
      };
      _xhr.onerror = function (e) {
        console.log(`error:${e}`);
      };
    };
    load._image = function (o) {
      const i = new Image();
      i.src = o.url;
      i.onload = function (e) {
        load._complete(o, e);
      };
      i.error = function (e) {
        load.error(o, e);
      };
    };
    load._json = function (o) {
      load._get(o, 'json');
    };
    load._audio = function (o) {
      load._get(o, 'arraybuffer');
    };
    this.load = load;
  }
}
