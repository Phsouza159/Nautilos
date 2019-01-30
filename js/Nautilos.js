/**
 * 
 * 
 * 
 * 
 * 
 * 
 */

(function (global) {



    var html = '';

    html = "<div class='load-nautilos'>";
    html += "<div class='load-nautilos-body'>";
    html += "<div class='loader'>";
    html += "<div class='circle'></div>";
    html += "<div class='circle'></div>";
    html += "<div class='circle'></div>";
    html += "<div class='circle'></div>";
    html += "<div class='circle'></div>";
    html += "</div>";
    html += "<br />";
    html += "<div class='load-nautilos-sub-body'>";
    html += "<h6>Nautilos carregando arquivos...</h6>";
    html += "<div class='load-nautilos-nautilos-bar'></div>";
    html += "</div>";
    html += "<div id='load-efect'></div>";
    html += "</div>";
    html += "</div>";

    $('body').append(html);



    function __getValid(){
        var __aux__ = {};

        __aux__._isValid = true;
        __aux__._notificacoes = []

        return __aux__
    }



    var Nautilos = {

        Ctor: function (ob) {

            var self = this;
            self.core.urlRoot = window.location.href;
            self.core.init(ob, self._system);
        },

        sucesso: function () {
            return this.core.response.data;
        },

        rout: function (element) {
            var key,
                attr,
                html,
                parametros = window.location.search;

            attr = $(element).attr('router');
            key = this.core.getRoute(attr);
            if (key < 0) {
                console.log('Não foi possível achar a rota :: ' + attr);
                return;
            }

            html = this.core.getData(key);

            $(this.core.id).html(html);

            window.history.pushState("object or string", "Title", this.core.urlRoot.split('?')[0] + attr + parametros);
        },


        getPage: function (urlRoot = null) {

            var x, pgs = [], i = 0, ob = {};


            do {
                x = this.core.getCookie('nautilos_pags_' + i)
                if (x != null) {
                    pgs.push(x);
                    i++;
                }
            } while (x != null);


            ob.urlName = this.core.getCookie('nautilos_urlNams').split(',');
            console.log(url);
        },

        core: {

            index: "",
            id: "",
            url: [],
            self: {},
            keysLinks: [],
            urlName: [],
            urlRoot: '',
            length: 0,

            i: 0,
            porcemtagem: 0,
            porcentagemItem: 0,

            squardItem: 0,
            squardItemporcemtagem: 0,

            form: {
                name: '',
                data: {}
            },

            response: {
                data: [],
                cache: {
                    scripts: [],
                    links: [],
                    coockie: [],
                },
            },

            urlParametros: {
                parametros: {},

                GetQueryString: function (a) {
                    a = a || window.location.search.substr(1).split('&').concat(window.location.hash.substr(1).split("&"));

                    if (typeof a === "string")
                        a = a.split("#").join("&").split("&");

                    if (!a) return {};

                    var b = {};
                    for (var i = 0; i < a.length; ++i) {
                        var p = a[i].split('=');

                        if (p.length != 2) continue;
                        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                    }
                    this.parametros = b;
                    return b;
                },
            },

            init: function (ob, system) {
                var parent = this;

                if (!typeof ob === "object") {
                    return "Não eh um objeto";
                }

                this.urls = ob.hasOwnProperty('url') ? (Array.isArray(ob.url) ? ob.url : [ob.url]) : ['default'];
                this.id = ob.hasOwnProperty('id') ? ob.id : '#load-html';
                this.index = ob.hasOwnProperty('index') ? ob.index : 'index';
                this.keysLinks = ob.hasOwnProperty('links') ? (Array.isArray(ob.links) ? ob.links : ['index']) : ['index'];
                this.urlName = ob.hasOwnProperty('urlName') ? (Array.isArray(ob.urlName) ? ob.urlName : ['index']) : ['index'];
                this.self = ob.hasOwnProperty('exec') ? (typeof ob.exec === "function" ? ob.exec : function () { }) : function () { };
                this.response.cache.scripts = ob.hasOwnProperty('scripts') ? (Array.isArray(ob.scripts) ? ob.scripts : [ob.scripts]) : false;
                this.response.cache.links = ob.hasOwnProperty('links') ? (Array.isArray(ob.links) ? ob.links : [ob.links]) : false;


                this.porcentagemItem = (100 / (this.response.cache.scripts.length + this.response.cache.links.length + this.urls.length));

                this.squardItem = (280 / (this.response.cache.scripts.length + this.response.cache.links.length + this.urls.length));

                //console.log(this.squardItem);
                this.gerarLoad.setCss();
                this.gerarLoad.setHtml();

                if (Array.isArray(parent.response.cache.links)) {
                    parent.loadLink();
                }

                if (Array.isArray(parent.response.cache.scripts)) {
                    parent.loadScript();
                }
                return parent.load(parent.urls, system);

            },

            gerarLoad: {
                i: 0,
                length: 280,
                sorte: [],

                setCss: function () {
                    //   $('head').append("<style>.demo,.square{pointer-events:none}.load-nautilos{z-index:999999;position:absolute;background-Fcolor:#fff;left:0;right:0;bottom:0;top:0}.load-nautilos-body{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;max-width:740px;margin-top:200px;margin-left:auto}.load-nautilos-sub-body{text-align:center;padding-top:30px}.load-nautilos-nautilos-bar{height:2px;background-color:#000;width:0%;transition:width 2s ease}.loader{position:relative;padding-top:100px;width:40px;margin:auto}.loader .circle{position:absolute;width:38px;height:38px;opacity:0;transform:rotate(225deg);animation-iteration-count:infinite;animation-name:orbit;animation-duration:5.5s}.loader .circle:after{content:'';position:absolute;width:5px;height:5px;border-radius:5px;background:#000}.loader .circle:nth-child(2){animation-delay:240ms}.loader .circle:nth-child(3){animation-delay:480ms}.loader .circle:nth-child(4){animation-delay:720ms}.loader .circle:nth-child(5){animation-delay:960ms}@keyframes orbit{0%{transform:rotate(225deg);opacity:1;animation-timing-function:ease-out}7%{transform:rotate(345deg);animation-timing-function:linear}30%{transform:rotate(455deg);animation-timing-function:ease-in-out}39%{transform:rotate(690deg);animation-timing-function:linear}70%{transform:rotate(815deg);opacity:1;animation-timing-function:ease-out}75%{transform:rotate(945deg);animation-timing-function:ease-out}100%,76%{transform:rotate(945deg);opacity:0}}.demo{position:relative;width:50px;height:50px;background-color:#6495ed;margin:4px;display:inline-block}.shadow{position:absolute;opacity:.2}.grid{display:flex;flex-wrap:wrap}.square{position:relative;width:28px;height:28px;margin:1px;background-color:currentColor;font-size:14px}.small{width:18px;height:18px;background-color:#c8f5fd}.demo-content{position:relative;display:flex;flex-direction:column;justify-content:center;text-align:center;width:700px;height:100%}.el{background-color:#aee5ef}.black{background-color:#000}</style>");
                },

                setHtml: function () {
                    var html = ' ', i = 0;
                    html = '<div class=\'demo-content staggering-grid-demo\'>';
                    html += '<div id=\'efect-el\' class=\'grid\'>'
                    html += '</div>';
                    html += '<div id=\'efect-shadow\' class=\'grid shadow\'>';
                    html += '</div>';
                    html += '</div>';

                    $('#load-efect').html(html);

                    for (; i < this.length; i++) {

                        $('#efect-el').append('<div class="small square el num-el-' + i + '"></div>');

                    }
                    i = 0

                    for (; i < this.length; i++) {

                        $('#efect-shadow').append('<div class="small square"></div>');

                    }

                    anime({
                        targets: '.staggering-grid-demo .el', // document.querySelector('.staggering-grid-demo , .el'),//' .el',
                        scale: [
                            { value: .1, easing: 'easeOutSine', duration: 500 },
                            { value: 1, easing: 'easeInOutQuad', duration: 1200 }
                        ],
                        delay: anime.stagger(200, { grid: [35, 8], from: 'center' }),
                        loop: true
                    });

                },

                pointX: function r(max) {
                    var num = 0, aux = 0, y = 0, x = [];

                    for (q = 0; q < max; q++) {

                        num = parseInt((Math.random() * this.length).toFixed(0));

                        if (num == this.length - 1)
                            num = 0;

                        while (this.sorte.indexOf(num) > 0) {

                            if (num > this.length - 1)
                                num = 0;
                            else
                                num++;
                        }
                        if (num > this.length)
                            console.log(num);

                        x.push(num);
                        this.sorte.push(num);
                    }
                    return x;
                },

                setPoint: function (nums) {
                    for (var num of nums) {
                        setTimeout(' $(\'.num-el-\' + ' + num + ').css(\'background-color\', \'#44a6b7\')', 400 + (100 + num));
                    }
                },

            },

            load: function (urls, system) {
                var i = 0,
                    length = urls.length,
                    self = this;

                this.i = 0;
                this.length = length;

                this.getLoad(urls, 0, system);

                return this.response.data;
            },

            getLoad: function getLoad(url, i, system) {
                var self = this;

                if (url[i] == null)
                    return;

                system.server.url = url[i];
                system.server.ajax(system)
                    .done(function (text) {
                        self.addResponse(text);

                        self.i++;
                        self.getProgressoLoad()
                        if (self.length == self.i) {
                            return self.start();
                        }

                        self.getLoad(url, (i + 1), system);
                    }).fail(function () {
                        console.log('Erro load!');
                    });
            },

            loadScript: function () {
                var i = 0,
                    length = this.response.cache.scripts.length;

                for (; i < length; i++) {
                    $('head').append('<script src=' + this.response.cache.scripts[i] + '></script>')
                    this.getProgressoLoad()
                }
            },

            loadLink: function () {
                var i = 0,
                    length = this.response.cache.links.length
                aux = '';

                for (; i < length; i++) {
                    aux = this.response.cache.links[i];

                    if (aux.includes('less')) {
                        $('head').append('<link href=' + aux + ' rel="stylesheet/less" type="text/css"  />');
                    }
                    else if (aux.includes('css')) {
                        $('head').append('<link href=' + aux + ' rel="stylesheet" type="text/css"  />');
                    }

                    this.getProgressoLoad()
                }
            },

            getProgressoLoad: function () {

                this.porcemtagem = parseInt(this.porcemtagem) + parseInt(this.porcentagemItem.toFixed(0));
                if (this.porcemtagem > 90) {
                    setTimeout("$('.load-nautilos').hide()", 4000);
                }
                setTimeout("$('.load-nautilos-nautilos-bar').css('width' ,'" + parseInt(this.porcemtagem) + "%')", 300);
                this.gerarLoad.setPoint(this.gerarLoad.pointX(this.squardItem));

            },

            start: function () {

                var reload = '';

                $.cookie('nautilos_urlNams', this.urlName.toString(), { expires: 1 });
                this.setCoockie(this.response.data);

                this.urlParametros.GetQueryString();
                reload = this.urlParametros.parametros['reload'];

                if (reload != null) {
                    html = this.getData(this.getRoute(reload));
                    if (html != null) {
                        $(this.id).html(html);
                        //window.history.pushState("object or string", "Title", this.core.urlRoot + attr);
                    }
                    else {
                        $(this.id).html('Not found : 404');
                    }
                } else {

                    var nm = this.urlName.indexOf(this.index);
                    if (nm < 0) {
                        console.log('Erro index');
                        return;
                    }

                    $(this.id).html(this.response.data[nm]);
                }

                return this.self();
            },

            addResponse: function (text) {
                this.response.data.push(text);
            },

            getRoute: function (link) {
                var key
                    , i = this.urlName.indexOf(link);

                key = i > 1 ? this.urlName[i] : 'notFound';

                return i;
            },

            getData: function (key) {
                return this.response.data[key];
            },

            formData: function (element, name = ' ') {
                var ob = {};

                name = element;

                if (!element.includes('#'))
                    element = '#' + element;

                this.form.name = name;
                this.form.data[this.form.name] = null;
                this.form.data[this.form.name] = {}
                this.form.data[this.form.name].valid = __getValid();

                this.childNodes($(element)[0]);
                console.log(this.form.data);

            },
            setFormData: function (dataName) {
                var nmForm = '', dataForm, name, key, keys;

                nmForm = dataName;

                if (!dataName.includes('#'))
                    dataName = '#' + dataName;

                dataForm = this.form.data[nmForm];
                keys = Object.keys(dataForm);

                for (key of keys) {
                    $(dataName + ' [name=' + key + ']').val(dataForm[key]);
                }
            },

            childNodes: function childNodes(element) {
                var x = 0,
                    e,
                    length = 0;

                //console.log(typeof element)
                if (typeof element !== "object")
                    return;

                length = element.length;
                if (length > 0) {
                    for (; x < length; x++)
                        this.childNodes(element[x]);
                }

                if (element.childNodes != null && element.childNodes.length > 0) {
                    for (e of element.childNodes)
                        this.childNodes(e);
                }
                if (element.nodeName == "INPUT" || element.nodeName == "SELECT") {

                    this.validInputs(element);

                    this.form.data[this.form.name][element.name] = element.value;
                }

            },

            validInputs: function (element) {
                var required = element.attributes['required']
                    i = 0;

                if (required == null || element.value != null && element.value != '') {
                    $(element).css('border-color', '#dbdbdb');
                    return null;
                }
                    
                $(element).css('border-color', 'red');
                this.form.data[this.form.name].valid._isValid = false;

                if (this.form.data[this.form.name].valid._notificacoes.indexOf(element.name) < 0) {

                    this.form.data[this.form.name].valid._notificacoes.push(element.name);

                }
                else {
                    var i = this.form.data[this.form.name].valid._notificacoes.indexOf(element.name);

                    this.form.data[this.form.name].valid._notificacoes[i] = element.name;

                }
            },

            lastResponse: function () {
                var value = '',
                    key = this.response.data.length - 1;

                value = this.response.data[key];
                console.log(value);
                return value;
            },

            setCoockie: function (cvalue, cname = 'nautilos_pags', exdays = 1) {
                var d = new Date(),
                    cookie = '',
                    i = 0;
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

                var expires = "expires=" + d.toGMTString();

                for (var c of cvalue) {
                    $.cookie(cname + "_" + i, c, { expires: 1 });
                    i++;
                }

                // console.log(cookie);
            },

            getCookie: function (cname) {
                return $.cookie(cname);
            },

            checkCookie: function () {

            },

        },

        _system: {

            server: {

                Config: new Object(),
                url: "",
                token: "",
                data: new Object(),
                method: "GET",
                type: "html",
                self: this,

                ajax: function (server = this) {

                    var self = server;

                    return $.ajax({

                        url: self.server.url,
                        method: self.server.method,
                        data: { data: self.server.data },
                        dataType: "html"

                    });

                },
            },
        },
    };

    global.nautilos = Nautilos;
})(this);
