(function (global) {
    var Nautilos = {

        Ctor: function (ob) {
            return this.core.init(ob, this._system);
        },

        sucesso : function(){
            return this._system.server.response.data;
        },

        core: {
            init: function (ob, system) {
                var urls = [];

                if (!typeof ob === "object") {
                    return "Não eh um objeto";
                }

                urls = ob.hasOwnProperty('url') ? (Array.isArray(ob.url) ? ob.url : [ob.url]) : ['default'];

                return this.load(urls, system);
            },

            load: function (urls, system) {
                var i = 0,
                    length = urls.length

                for (; i < length; i++) {
                    system.server.url = urls[i];
                    system.server.ajax(system)
                        .done(function (text) {
                            system.server.addResponse(text);
                        }).fail(function () {
                            system.server.addResponse(false);
                        });
                }

                return system.server.response.data;
            }
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

                response: {
                    data: [],
                },

                lastResponse: function () {
                    var value = '',
                        key = this.response.data.length - 1;

                    value = this.response.data[key];
                    console.log(value);
                    return value;
                },

                addResponse: function (text) {
                    this.response.data.push(text);
                },

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