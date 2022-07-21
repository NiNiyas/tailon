Vue.component('multiselect', window.VueMultiselect.default);
Vue.component('vue-loading', window.VueLoading);

var apiURL = endsWith(window.location.href, '/') ? window.location.href + "ws" : window.location.href.replace(/[^\/]+$/, 'ws');

if (localStorage.getItem("userFontColor") === null) {
    document.documentElement.style.setProperty("--fontColor", "white");
} else {
    document.documentElement.style.setProperty("--fontColor", localStorage.getItem('userFontColor'));
};

if (localStorage.getItem("userBackgroundColor") === null) {
    document.documentElement.style.setProperty("--mainColor", "#1d1f21");
} else {
    document.documentElement.style.setProperty("--mainColor", localStorage.getItem("userBackgroundColor"));
};

if (localStorage.getItem("userFontSize") === null) {
    document.documentElement.style.setProperty("--fontSize", "13px");
    localStorage.setItem("userFontSize", "13px");
} else {
    document.documentElement.style.setProperty("--fontSize", localStorage.getItem("userFontSize"));
};

if (localStorage.getItem("userFont") === null) {
    document.documentElement.style.setProperty("--font", "Default");
} else {
    document.documentElement.style.setProperty("--font", localStorage.getItem("userFont"));
};

//if (localStorage.getItem("historyLines") === null) {
//      document.documentElement.style.setProperty("--historyLines", 0);
// } else {
//      document.documentElement.style.setProperty("--historyLines", localStorage.getItem("userhistoryLines"));
//};

var app = new Vue({
    el: '#app',
    delimiters: ['<%', '%>'],
    data: {
        'relativeRoot': relativeRoot,
        'commandScripts': commandScripts,

        'fileList': [],
        'allowCommandNames': allowCommandNames,
        'allowDownload': allowDownload,

        'file': null,
        'command': null,
        'script': null,
        'font_color': localStorage.getItem("userFontColor") || "white",
        'theme': localStorage.getItem('userBackgroundColor') || "#1d1f21",
        'font_size': localStorage.getItem('userFontSize').replace('px', '') || "13px",
        'font': localStorage.getItem('userFont') || "Default",

        'linesOfHistory': linesOfHistory,
        'linesToTail': linesToTail,
        'wrapLines': false,

        'hideToolbar': false,
        'showConfig': false,
        'showUIConfig': false,
        'showLoadingOverlay': false,

        'socket': null,
        'isConnected': false
    },
    created: function() {
        this.backendConnect();

        this.command = this.allowCommandNames[0];
    },
    computed: {
        scriptInputEnabled: function() {
            return this.commandScripts[this.command] !== "";
        },
        downloadLink: function() {
            if (this.file) {
                return relativeRoot + 'files/?path=' + this.file.path;
            }
            return '#';
        }
    },
    methods: {
        clearLogview: function() {
            this.$refs.logview.clearLines();
        },
        backendConnect: function() {
            console.log('Connecting to: ' + apiURL);
            this.showLoadingOverlay = true;
            this.socket = new SockJS(apiURL);
            this.socket.onopen = this.onBackendOpen;
            this.socket.onclose = this.onBackendClose;
            this.socket.onmessage = this.onBackendMessage;
        },
        onBackendOpen: function() {
            console.log('Connected to backend.');
            this.isConnected = true;
            this.refreshFiles();
        },
        onBackendClose: function() {
            console.log('Disconnected from backend.');
            this.isConnected = false;
            backendConnect = this.backendConnect;
            window.setTimeout(function() {
                backendConnect();
            }, 1000);
        },
        onBackendMessage: function(message) {
            var data = JSON.parse(message.data);

            if (data.constructor === Object) {
                // Reshape into something that vue-multiselect :group-select can use.
                var fileList = [];
                Object.keys(data).forEach(function(key) {
                    var group = ("__default__" === key) ? "Ungrouped Files" : key;
                    fileList.push({
                        "group": group,
                        "files": data[key]
                    });
                });

                this.fileList = fileList;

                // Set file input to first entry in list.
                if (!this.file) {
                    var query = parseQueryString(window.location.search);
                    if (Array.isArray(query.path)) {
                        var k = query.path[0];
                        var files = fileList.map(function(e) {
                            return e.files;
                        }).flat()

                        files = files.filter(function(e) {
                            return e.alias == k || e.path == k;
                        })
                        if (files.length > 0) {
                            this.file = files[0];
                        } else {
                            this.file = fileList[0].files[0];
                        }
                    } else {
                        this.file = fileList[0].files[0];
                    }
                }
            } else {
                var stream = data[0];
                var line = data[1];
                this.$refs.logview.write(stream, line);
            }
        },
        refreshFiles: function() {
            console.log("Updating file list..");
            this.socket.send("list");
        },
        notifyBackend: function() {
            var msg = {
                command: this.command,
                script: this.script,
                entry: this.file,
                nlines: this.linesToTail
            };
            console.log("Sending message: ", msg);
            this.clearLogview();
            this.socket.send(JSON.stringify(msg));
        },
        clearInput: function() {
            this.script = "";
            this.notifyBackend();
        }
    },
    watch: {
        isConnected: function(val) {
            this.showLoadingOverlay = !val;
        },
        wrapLines: function(val) {
            this.$refs.logview.toggleWrapLines(val);
        },
        //linesOfHistory: function (val) {
        //  document.documentElement.style.setProperty("--historyLines", val);
        //  localStorage.setItem("userhistoryLines", val);
        //},
        font_color: function(val) {
            this.$refs.logview.changeFontColor(val);
            document.documentElement.style.setProperty("--fontColor", val);
            localStorage.setItem("userFontColor", val);
        },
        font: function(val) {
            this.$refs.logview.changeFont(val);
            document.documentElement.style.setProperty("--font", val);
            localStorage.setItem("userFont", val);
        },
        font_size: function(val) {
            this.$refs.logview.changeFontSize(val);
            document.documentElement.style.setProperty("--fontSize", val + "px");
            localStorage.setItem("userFontSize", val + "px");
        },
        theme: function(val) {
            document.documentElement.style.setProperty("--mainColor", val);
            localStorage.setItem("userBackgroundColor", val);
        },
        command: function(val) {
            if (val && this.isConnected) {
                this.script = this.commandScripts[val];
                this.notifyBackend();
            }
        },
        file: function(val) {
            if (val && this.isConnected) {
                this.notifyBackend();
                this.$nextTick(function() {
                    this.$refs.script_input.select();
                    this.$refs.script_input.focus();
                })
            }
        }
    }
});
