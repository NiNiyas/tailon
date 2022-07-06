function formatBytes(size) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while (size >= 1024) {
        size /= 1024;
        ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
}

function formatFilename(state) {
    if (!state.id) return state.text;
    var size = formatBytes($(state.element).data('size'));
    return '<span>' + state.text + '</span>' + '<span style="float:right;">' + size + '</span>';
}

function deleteItem() {
      localStorage.removeItem('userFontColor');
      localStorage.removeItem('userBackgroundColor');
      localStorage.removeItem('userFontSize');
      localStorage.removeItem('userFont');
      //localStorage.removeItem('userhistoryLines');
  }

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

var escape_entity_map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "/": '&#x2F;'
};

// This is the escapeHtml function from mustache.js.
function escapeHtml(str) {
    return String(str).replace(/[&<>\/]/g, function(s) {
        return escape_entity_map[s];
    });
}

function parseQueryString(str) {
    var res = {};

    str.substr(1).split('&').forEach(function(item) {
        var el = item.split("=");

        var key = el[0];
        var value = el[1] && decodeURIComponent(el[1]);

        if (key in res) {
            res[key].push(value);
        } else {
            res[key] = [value];
        }
    });

    return res;
}

function lineTypeLog(line) {
    var n1 = line.search("EMERGENCY");
    var n2 = line.search("ALERT");
    var n3 = line.search("CRITICAL");
    var n4 = line.search("ERROR");
    var n5 = line.search("WARNING");
    var n6 = line.search("NOTICE");
    var n7 = line.search("INFO");
    var n8 = line.search("DEBUG");
    var n9 = line.search("SUCCESS");
    var n10 = line.search("EXCEPTION");
    var n11 = line.search("GET");
    var n12 = line.search("POST");
    var n13 = line.search("DELETE");
    var n14 = line.search("PUT");
    var n15 = line.search("TRACE");
    var n16 = line.search("HEAD");
    var n17 = line.search("OPTIONS");
    var n18 = line.search("PATCH");
    var n19 = line.search("CONNECT");
    var n20 = line.search("FAILURE");
    var n21 = line.search("FAILED");
    var n22 = line.search("WARN");
    if (n1 >= 0) {
        var res = "EMERGENCY";
    } else if (n2 >= 0) {
        var res = "ALERT";
    } else if (n3 >= 0) {
        var res = "CRITICAL";
    } else if (n4 >= 0) {
        var res = "ERROR";
    } else if (n5 >= 0) {
        var res = "WARNING";
    } else if (n6 >= 0) {
        var res = "NOTICE";
    } else if (n7 >= 0) {
        var res = "INFO";
    } else if (n8 >= 0) {
        var res = "DEBUG";
    } else if (n9 >= 0) {
        var res = "SUCCESS";
    } else if (n10 >= 0) {
        var res = "EXCEPTION";
    } else if (n11 >= 0) {
        var res = "GET";
    } else if (n12 >= 0) {
        var res = "POST";
    } else if (n13 >= 0) {
        var res = "DELETE";
    } else if (n14 >= 0) {
        var res = "PUT";
    } else if (n15 >= 0) {
        var res = "TRACE";
    } else if (n16 >= 0) {
        var res = "HEAD";
    } else if (n17 >= 0) {
        var res = "OPTIONS";
    } else if (n18 >= 0) {
        var res = "PATCH";
    } else if (n19 >= 0) {
        var res = "CONNECT";
    } else if (n20 >= 0) {
        var res = "FAILURE";
    } else if (n21 >= 0) {
        var res = "FAILED";
    } else if (n22 >= 0) {
        var res = "WARN";
    } else {
        var res = "";
    }
    return res;
}
