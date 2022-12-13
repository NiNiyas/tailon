Vue.component('logview', {
    template: '<div class="log-view"></div>',
    props: ["linesOfHistory"],
    data: function() {
        return {
            history: [],
            lastSpan: null,
            lastSpanClasses: '',
            autoScroll: true
        };
    },
    watch: {
        linesOfHistory: function(val) {
            this.trimHistory();
        }
    },
    methods: {
        clearLines: function() {
            this.$el.innerHTML = '';
            this.history = [],
                this.lastSpan = null;
        },
        toggleWrapLines: function(val) {
            this.$el.classList.toggle('log-view-wrapped', val);
        },
        changeFontColor: function (val){
            this.$el.style.color = val;
        },
        changeFontSize: function (val){
            this.$el.style.font.size = val;
        },
        changeFont: function (val){
            this.$el.style.font = val;
        },
        createSpan: function(innerHtml, classNames) {
            var span = document.createElement('span');
            span.innerHTML = innerHtml;
            span.className = classNames;
            return span;
        },
        createLogEntrySpan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry');
        },
        //
        // LOG LEVELS
        //
        createEmergencyPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-emergency');
        },
        createAlertPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-alert');
        },
        createCriticalPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-critical');
        },
        createErrorPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-error');
        },
        createWarningPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-warning');
        },
        createNoticePan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-notice');
        },
        createInfoPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-info');
        },
        createDebugPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-debug');
        },
        createSuccessPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-success');
        },
        createExceptionPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-exception');
        },
        createExceptionPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-failed');
        },
        createExceptionPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-failure');
        },
        createExceptionPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-warn');
        },
        //
        // HTTP METHODS
        //
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-get');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-post');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-delete');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-put');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-trace');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-head');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-options');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-patch');
        },
        createGetPan: function(innerHtml) {
            return this.createSpan(innerHtml, 'log-entry log-connect');
        },

        trimHistory: function() {
            if (this.linesOfHistory !== 0 && this.history.length > this.linesOfHistory) {
                for (var i = 0; i < (this.history.length - this.linesOfHistory + 1); i++) {
                    this.$el.removeChild(this.history.shift());
                }
            }
        },

        isScrolledToBottom: function() {
            var elParent = this.$el.parentElement;
            var autoScrollOffset = elParent.scrollTop - (elParent.scrollHeight - elParent.offsetHeight);
            return Math.abs(autoScrollOffset) < 50;
        },

        scroll: function() {
            this.$el.parentElement.scrollTop = this.$el.parentElement.scrollHeight;
        },

        write: function(source, line) {
            var span;
            if (source === "o") {
                line = escapeHtml(line).replace(/\n$/, '');
                var logtype = lineTypeLog(line);
                if (logtype == "EMERGENCY") {
                    // span = this.createEmergencyPan(line);
                    line = line.replace("EMERGENCY", "<span class=\"badge badge-level-emergency\"><span class=\"mdi mdi-shield-bug\"></span>EMERGENCY</span>");
                } else if (logtype == "ALERT") {
                    // span = this.createAlertPan(line);
                    line = line.replace("ALERT", "<span class=\"badge badge-level-alert\"><span class=\"mdi mdi-bullhorn\"></span>ALERT</span>");
                } else if (logtype == "CRITICAL") {
                    // span = this.createCriticalPan(line);
                    line = line.replace("CRITICAL", "<span class=\"badge badge-level-critical\"><span class=\"mdi mdi-heart-pulse\"></span>CRITICAL</span>");
                } else if (logtype == "ERROR") {
                    // span = this.createErrorPan(line);
                    line = line.replace("ERROR", "<span class=\"badge badge-level-error\"><span class=\"mdi mdi-alpha-e-circle\"></span>ERROR</span>");
                } else if (logtype == "WARN") {
                     // span = this.createWarnPan(line);
                    line = line.replace("WARN", "<span class=\"badge badge-level-warning\"><span class=\"mdi mdi-alert\"></span>WARN</span>");
                }
                else if (logtype == "WARNING") {
                    // span = this.createWarningPan(line);
                    line = line.replace("WARNING", "<span class=\"badge badge-level-warning\"><span class=\"mdi mdi-alert\"></span>WARNING</span>");
                } else if (logtype == "NOTICE") {
                    // span = this.createNoticePan(line);
                    line = line.replace("NOTICE", "<span class=\"badge badge-level-notice\"><span class=\"mdi mdi-alert-circle-outline\"></span>NOTICE</span>");
                } else if (logtype == "INFO") {
                    // span = this.createInfoPan(line);
                    line = line.replace("INFO", "<span class=\"badge badge-level-info\"><span class=\"mdi mdi-information\"></span>INFO</span>");
                } else if (logtype == "DEBUG") {
                    // span = this.createDebugPan(line);
                    line = line.replace("DEBUG", "<span class=\"badge badge-level-debug\"><span class=\"mdi mdi-alert-octagon\"></span>DEBUG</span>");
                } else if (logtype == "SUCCESS") {
                    line = line.replace("SUCCESS", "<span class=\"badge badge-level-success\"><span class=\"mdi mdi-check\"></span>SUCCESS</span>");
                } else if (logtype == "EXCEPTION") {
                    line = line.replace("EXCEPTION", "<span class=\"badge badge-level-exception\"><span class=\"mdi mdi-exclamation-thick\"></span>EXCEPTION</span>");
                } else if (logtype == "FAILURE") {
                    line = line.replace("FAILURE", "<span class=\"badge badge-level-failure\"><span class=\"mdi mdi-alert-decagram\"></span>FAILURE</span>");
                } else if (logtype == "FAILED") {
                    line = line.replace("FAILED", "<span class=\"badge badge-level-failed\"><span class=\"mdi mdi-alert-decagram\"></span>FAILED</span>");
                } else if (logtype == "GET") {
                    line = line.replace("GET", "<span class=\"badge badge-level-get\">GET</span>");
                }
                else if (logtype == "POST") {
                    line = line.replace("POST", "<span class=\"badge badge-level-post\">POST</span>");
                }
                else if (logtype == "DELETE") {
                    line = line.replace("DELETE", "<span class=\"badge badge-level-delete\">DELETE</span>");
                }
                else if (logtype == "PUT") {
                    line = line.replace("PUT", "<span class=\"badge badge-level-put\">PUT</span>");
                }
                else if (logtype == "TRACE") {
                    line = line.replace("TRACE", "<span class=\"badge badge-level-trace\">TRACE</span>");
                }
                else if (logtype == "HEAD") {
                    line = line.replace("HEAD", "<span class=\"badge badge-level-head\">HEAD</span>");
                }
                else if (logtype == "OPTIONS") {
                    line = line.replace("OPTIONS", "<span class=\"badge badge-level-options\">OPTIONS</span>");
                }
                else if (logtype == "PATCH") {
                    line = line.replace("PATCH", "<span class=\"badge badge-level-patch\">PATCH</span>");
                }
                else if (logtype == "CONNECT") {
                    line = line.replace("CONNECT", "<span class=\"badge badge-level-connect\">CONNECT</span>");
                }
                 else {
                    // span = this.createLogEntrySpan(line);
                }
                span = this.createLogEntrySpan(line);
                this.writeSpans([span]);
            }
        },

        writeSpans: function(spanArray) {
            if (spanArray.length === 0) {
                return;
            }

            var scrollAfterWrite = this.isScrolledToBottom();

            // Create spans from all elements and add them to a temporary DOM.
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < spanArray.length; i++) {
                var span = spanArray[i];
                this.history.push(span);
                fragment.appendChild(span);
            }

            if (this.lastSpan) {
                this.lastSpan.className = this.lastSpanClasses;
            }

            this.$el.appendChild(fragment);
            this.trimHistory();

            if (this.autoScroll && scrollAfterWrite) {
                this.scroll();
            }

            this.lastSpan = this.history[this.history.length - 1];
            this.lastSpanClasses = this.lastSpan.className;
            this.lastSpan.className = this.lastSpanClasses + ' log-entry-current';

        }
    }
});
