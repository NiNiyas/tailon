function formatBytes(size) {
    for (var i = 0; 1024 <= size; ) size /= 1024, ++i;
    return size.toFixed(1) + " " + [ "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ][i];
}

function formatFilename(state) {
    var size;
    return state.id ? (size = formatBytes($(state.element).data("size")), "<span>" + state.text + '</span><span style="float:right;">' + size + "</span>") : state.text;
}

function deleteItem() {
    localStorage.removeItem("userFontColor"), localStorage.removeItem("userBackgroundColor"), 
    localStorage.removeItem("userFontSize"), localStorage.removeItem("userFont");
}

function endsWith(str, suffix) {
    return -1 !== str.indexOf(suffix, str.length - suffix.length);
}

function startsWith(str, prefix) {
    return 0 === str.indexOf(prefix);
}

var escape_entity_map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "/": "&#x2F;"
};

function escapeHtml(str) {
    return String(str).replace(/[&<>\/]/g, function(s) {
        return escape_entity_map[s];
    });
}

function parseQueryString(str) {
    var res = {};
    return str.substr(1).split("&").forEach(function(item) {
        var item = item.split("="), key = item[0], item = item[1] && decodeURIComponent(item[1]);
        key in res ? res[key].push(item) : res[key] = [ item ];
    }), res;
}

function lineTypeLog(line) {
    var n1 = line.search("EMERGENCY"), n2 = line.search("ALERT"), n3 = line.search("CRITICAL"), n4 = line.search("ERROR"), n5 = line.search("WARNING"), n6 = line.search("NOTICE"), n7 = line.search("INFO"), n8 = line.search("DEBUG"), n9 = line.search("SUCCESS"), n10 = line.search("EXCEPTION"), n11 = line.search("GET"), n12 = line.search("POST"), n13 = line.search("DELETE"), n14 = line.search("PUT"), n15 = line.search("TRACE"), n16 = line.search("HEAD"), n17 = line.search("OPTIONS"), n18 = line.search("PATCH"), n19 = line.search("CONNECT"), n20 = line.search("FAILURE"), n21 = line.search("FAILED"), line = line.search("WARN");
    return 0 <= n1 ? "EMERGENCY" : 0 <= n2 ? "ALERT" : 0 <= n3 ? "CRITICAL" : 0 <= n4 ? "ERROR" : 0 <= n5 ? "WARNING" : 0 <= n6 ? "NOTICE" : 0 <= n7 ? "INFO" : 0 <= n8 ? "DEBUG" : 0 <= n9 ? "SUCCESS" : 0 <= n10 ? "EXCEPTION" : 0 <= n11 ? "GET" : 0 <= n12 ? "POST" : 0 <= n13 ? "DELETE" : 0 <= n14 ? "PUT" : 0 <= n15 ? "TRACE" : 0 <= n16 ? "HEAD" : 0 <= n17 ? "OPTIONS" : 0 <= n18 ? "PATCH" : 0 <= n19 ? "CONNECT" : 0 <= n20 ? "FAILURE" : 0 <= n21 ? "FAILED" : 0 <= line ? "WARN" : "";
}

Vue.component("logview", {
    template: '<div class="log-view"></div>',
    props: [ "linesOfHistory" ],
    data: function() {
        return {
            history: [],
            lastSpan: null,
            lastSpanClasses: "",
            autoScroll: !0
        };
    },
    watch: {
        linesOfHistory: function(val) {
            this.trimHistory();
        }
    },
    methods: {
        clearLines: function() {
            this.$el.innerHTML = "", this.history = [], this.lastSpan = null;
        },
        toggleWrapLines: function(val) {
            this.$el.classList.toggle("log-view-wrapped", val);
        },
        changeFontColor: function(val) {
            this.$el.style.color = val;
        },
        changeFontSize: function(val) {
            this.$el.style.font.size = val;
        },
        changeFont: function(val) {
            this.$el.style.font = val;
        },
        createSpan: function(innerHtml, classNames) {
            var span = document.createElement("span");
            return span.innerHTML = innerHtml, span.className = classNames, span;
        },
        createLogEntrySpan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry");
        },
        createEmergencyPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-emergency");
        },
        createAlertPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-alert");
        },
        createCriticalPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-critical");
        },
        createErrorPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-error");
        },
        createWarningPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-warning");
        },
        createNoticePan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-notice");
        },
        createInfoPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-info");
        },
        createDebugPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-debug");
        },
        createSuccessPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-success");
        },
        createExceptionPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-warn");
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, "log-entry log-connect");
        },
        trimHistory: function() {
            if (0 !== this.linesOfHistory && this.history.length > this.linesOfHistory) for (var i = 0; i < this.history.length - this.linesOfHistory + 1; i++) this.$el.removeChild(this.history.shift());
        },
        isScrolledToBottom: function() {
            var elParent = this.$el.parentElement, elParent = elParent.scrollTop - (elParent.scrollHeight - elParent.offsetHeight);
            return Math.abs(elParent) < 50;
        },
        scroll: function() {
            this.$el.parentElement.scrollTop = this.$el.parentElement.scrollHeight;
        },
        write: function(source, line) {
            "o" === source && ("EMERGENCY" == (source = lineTypeLog(line = escapeHtml(line).replace(/\n$/, ""))) ? line = line.replace("EMERGENCY", '<span class="badge badge-level-emergency"><span class="mdi mdi-shield-bug"></span>EMERGENCY</span>') : "ALERT" == source ? line = line.replace("ALERT", '<span class="badge badge-level-alert"><span class="mdi mdi-bullhorn"></span>ALERT</span>') : "CRITICAL" == source ? line = line.replace("CRITICAL", '<span class="badge badge-level-critical"><span class="mdi mdi-heart-pulse"></span>CRITICAL</span>') : "ERROR" == source ? line = line.replace("ERROR", '<span class="badge badge-level-error"><span class="mdi mdi-alpha-e-circle"></span>ERROR</span>') : "WARN" == source ? line = line.replace("WARN", '<span class="badge badge-level-warning"><span class="mdi mdi-alert"></span>WARN</span>') : "WARNING" == source ? line = line.replace("WARNING", '<span class="badge badge-level-warning"><span class="mdi mdi-alert"></span>WARNING</span>') : "NOTICE" == source ? line = line.replace("NOTICE", '<span class="badge badge-level-notice"><span class="mdi mdi-alert-circle-outline"></span>NOTICE</span>') : "INFO" == source ? line = line.replace("INFO", '<span class="badge badge-level-info"><span class="mdi mdi-information"></span>INFO</span>') : "DEBUG" == source ? line = line.replace("DEBUG", '<span class="badge badge-level-debug"><span class="mdi mdi-alert-octagon"></span>DEBUG</span>') : "SUCCESS" == source ? line = line.replace("SUCCESS", '<span class="badge badge-level-success"><span class="mdi mdi-check"></span>SUCCESS</span>') : "EXCEPTION" == source ? line = line.replace("EXCEPTION", '<span class="badge badge-level-exception"><span class="mdi mdi-exclamation-thick"></span>EXCEPTION</span>') : "FAILURE" == source ? line = line.replace("FAILURE", '<span class="badge badge-level-failure"><span class="mdi mdi-alert-decagram"></span>FAILURE</span>') : "FAILED" == source ? line = line.replace("FAILED", '<span class="badge badge-level-failed"><span class="mdi mdi-alert-decagram"></span>FAILED</span>') : "GET" == source ? line = line.replace("GET", '<span class="badge badge-level-get">GET</span>') : "POST" == source ? line = line.replace("POST", '<span class="badge badge-level-post">POST</span>') : "DELETE" == source ? line = line.replace("DELETE", '<span class="badge badge-level-delete">DELETE</span>') : "PUT" == source ? line = line.replace("PUT", '<span class="badge badge-level-put">PUT</span>') : "TRACE" == source ? line = line.replace("TRACE", '<span class="badge badge-level-trace">TRACE</span>') : "HEAD" == source ? line = line.replace("HEAD", '<span class="badge badge-level-head">HEAD</span>') : "OPTIONS" == source ? line = line.replace("OPTIONS", '<span class="badge badge-level-options">OPTIONS</span>') : "PATCH" == source ? line = line.replace("PATCH", '<span class="badge badge-level-patch">PATCH</span>') : "CONNECT" == source && (line = line.replace("CONNECT", '<span class="badge badge-level-connect">CONNECT</span>')), 
            source = this.createLogEntrySpan(line), this.writeSpans([ source ]));
        },
        writeSpans: function(spanArray) {
            if (0 !== spanArray.length) {
                for (var scrollAfterWrite = this.isScrolledToBottom(), fragment = document.createDocumentFragment(), i = 0; i < spanArray.length; i++) {
                    var span = spanArray[i];
                    this.history.push(span), fragment.appendChild(span);
                }
                this.lastSpan && (this.lastSpan.className = this.lastSpanClasses), 
                this.$el.appendChild(fragment), this.trimHistory(), this.autoScroll && scrollAfterWrite && this.scroll(), 
                this.lastSpan = this.history[this.history.length - 1], this.lastSpanClasses = this.lastSpan.className, 
                this.lastSpan.className = this.lastSpanClasses + " log-entry-current";
            }
        }
    }
}), Vue.component("multiselect", window.VueMultiselect.default), Vue.component("vue-loading", window.VueLoading);

var apiURL = endsWith(window.location.href, "/") ? window.location.href + "ws" : window.location.href.replace(/[^\/]+$/, "ws"), app = (null === localStorage.getItem("userFontColor") ? document.documentElement.style.setProperty("--fontColor", "white") : document.documentElement.style.setProperty("--fontColor", localStorage.getItem("userFontColor")), 
null === localStorage.getItem("userBackgroundColor") ? document.documentElement.style.setProperty("--mainColor", "#1d1f21") : document.documentElement.style.setProperty("--mainColor", localStorage.getItem("userBackgroundColor")), 
null === localStorage.getItem("userFontSize") ? (document.documentElement.style.setProperty("--fontSize", "13px"), 
localStorage.setItem("userFontSize", "13px")) : document.documentElement.style.setProperty("--fontSize", localStorage.getItem("userFontSize")), 
null === localStorage.getItem("userFont") ? document.documentElement.style.setProperty("--font", "Consolas, Menlo,Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif") : document.documentElement.style.setProperty("--font", localStorage.getItem("userFont")), 
new Vue({
    el: "#app",
    delimiters: [ "<%", "%>" ],
    data: {
        relativeRoot: relativeRoot,
        commandScripts: commandScripts,
        fileList: [],
        allowCommandNames: allowCommandNames,
        allowDownload: allowDownload,
        file: null,
        command: null,
        script: null,
        font_color: localStorage.getItem("userFontColor") || "white",
        theme: localStorage.getItem("userBackgroundColor") || "#1d1f21",
        font_size: localStorage.getItem("userFontSize").replace("px", "") || "13px",
        font: localStorage.getItem("userFont") || "Consolas, Menlo,Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
        linesOfHistory: linesOfHistory,
        linesToTail: linesToTail,
        wrapLines: !1,
        hideToolbar: !1,
        showConfig: !1,
        showUIConfig: !1,
        showLoadingOverlay: !1,
        socket: null,
        isConnected: !1
    },
    created: function() {
        this.backendConnect(), this.command = this.allowCommandNames[0];
    },
    computed: {
        scriptInputEnabled: function() {
            return "" !== this.commandScripts[this.command];
        },
        downloadLink: function() {
            return this.file ? relativeRoot + "files/?path=" + this.file.path : "#";
        }
    },
    methods: {
        clearLogview: function() {
            this.$refs.logview.clearLines();
        },
        backendConnect: function() {
            this.showLoadingOverlay = !0, this.socket = new SockJS(apiURL), this.socket.onopen = this.onBackendOpen, 
            this.socket.onclose = this.onBackendClose, this.socket.onmessage = this.onBackendMessage;
        },
        onBackendOpen: function() {
            this.isConnected = !0, this.refreshFiles();
        },
        onBackendClose: function() {
            this.isConnected = !1, backendConnect = this.backendConnect, window.setTimeout(function() {
                backendConnect();
            }, 1e3);
        },
        onBackendMessage: function(message) {
            var fileList, k, line, data = JSON.parse(message.data);
            data.constructor === Object ? (fileList = [], Object.keys(data).forEach(function(key) {
                fileList.push({
                    group: "__default__" === key ? "Ungrouped Files" : key,
                    files: data[key]
                });
            }), this.fileList = fileList, this.file || (message = parseQueryString(window.location.search), 
            Array.isArray(message.path) && (k = message.path[0], 0 < (message = (message = fileList.map(function(e) {
                return e.files;
            }).flat()).filter(function(e) {
                return e.alias == k || e.path == k;
            })).length) ? this.file = message[0] : this.file = fileList[0].files[0])) : (message = data[0], 
            line = data[1], this.$refs.logview.write(message, line));
        },
        refreshFiles: function() {
            this.socket.send("list");
        },
        notifyBackend: function() {
            var msg = {
                command: this.command,
                script: this.script,
                entry: this.file,
                nlines: this.linesToTail
            };
            this.clearLogview(), this.socket.send(JSON.stringify(msg));
        },
        clearInput: function() {
            this.script = "", this.notifyBackend();
        }
    },
    watch: {
        isConnected: function(val) {
            this.showLoadingOverlay = !val;
        },
        wrapLines: function(val) {
            this.$refs.logview.toggleWrapLines(val);
        },
        font_color: function(val) {
            this.$refs.logview.changeFontColor(val), document.documentElement.style.setProperty("--fontColor", val), 
            localStorage.setItem("userFontColor", val);
        },
        font: function(val) {
            this.$refs.logview.changeFont(val), document.documentElement.style.setProperty("--font", val), 
            localStorage.setItem("userFont", val);
        },
        font_size: function(val) {
            this.$refs.logview.changeFontSize(val), document.documentElement.style.setProperty("--fontSize", val + "px"), 
            localStorage.setItem("userFontSize", val + "px");
        },
        theme: function(val) {
            document.documentElement.style.setProperty("--mainColor", val), localStorage.setItem("userBackgroundColor", val);
        },
        command: function(val) {
            val && this.isConnected && (this.script = this.commandScripts[val], 
            this.notifyBackend());
        },
        file: function(val) {
            val && this.isConnected && (this.notifyBackend(), this.$nextTick(function() {
                this.$refs.script_input.select(), this.$refs.script_input.focus();
            }));
        }
    }
}));
