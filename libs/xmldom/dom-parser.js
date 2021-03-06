(function() {
    function a(a) {
        this.options = a || {
            locator: {}
        };
    }
    function b(a, b, d) {
        function f(b) {
            var c = a[b];
            !c && h && (c = 2 == a.length ? function(c) {
                a(b, c);
            } : a), g[b] = c && function(a) {
                c("[xmldom " + b + "]\t" + a + e(d));
            } || function() {};
        }
        if (!a) {
            if (b instanceof c) return b;
            a = b;
        }
        var g = {}, h = a instanceof Function;
        return d = d || {}, f("warning"), f("error"), f("fatalError"), g;
    }
    function c() {
        this.cdata = !1;
    }
    function d(a, b) {
        b.lineNumber = a.lineNumber, b.columnNumber = a.columnNumber;
    }
    function e(a) {
        if (a) return "\n@" + (a.systemId || "") + "#[line:" + a.lineNumber + ",col:" + a.columnNumber + "]";
    }
    function f(a, b, c) {
        return "string" == typeof a ? a.substr(b, c) : a.length >= b + c || b ? new java.lang.String(a, b, c) + "" : a;
    }
    function g(a, b) {
        a.currentElement ? a.currentElement.appendChild(b) : a.doc.appendChild(b);
    }
    a.prototype.parseFromString = function(a, d) {
        var e = this.options, f = new i(), g = e.domBuilder || new c(), j = e.errorHandler, k = e.locator, l = e.xmlns || {}, m = /\/x?html?$/.test(d), n = m ? h.entityMap : {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'"
        };
        return k && g.setDocumentLocator(k), f.errorHandler = b(j, g, k), f.domBuilder = e.domBuilder || g, 
        m && (l[""] = "http://www.w3.org/1999/xhtml"), l.xml = l.xml || "http://www.w3.org/XML/1998/namespace", 
        a ? f.parse(a, l, n) : f.errorHandler.error("invalid doc source"), g.doc;
    }, c.prototype = {
        startDocument: function() {
            this.doc = new j().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
        },
        startElement: function(a, b, c, e) {
            var f = this.doc, h = f.createElementNS(a, c || b), j = e.length;
            g(this, h), this.currentElement = h, this.locator && d(this.locator, h);
            for (var k = 0; k < j; k++) {
                var a = e.getURI(k), i = e.getValue(k), c = e.getQName(k), l = f.createAttributeNS(a, c);
                this.locator && d(e.getLocator(k), l), l.value = l.nodeValue = i, h.setAttributeNode(l);
            }
        },
        endElement: function() {
            var a = this.currentElement, b = a.tagName;
            this.currentElement = a.parentNode;
        },
        startPrefixMapping: function() {},
        endPrefixMapping: function() {},
        processingInstruction: function(a, b) {
            var c = this.doc.createProcessingInstruction(a, b);
            this.locator && d(this.locator, c), g(this, c);
        },
        ignorableWhitespace: function() {},
        characters: function(a) {
            if (a = f.apply(this, arguments), a) {
                if (this.cdata) var b = this.doc.createCDATASection(a); else var b = this.doc.createTextNode(a);
                this.currentElement ? this.currentElement.appendChild(b) : /^\s*$/.test(a) && this.doc.appendChild(b), 
                this.locator && d(this.locator, b);
            }
        },
        skippedEntity: function() {},
        endDocument: function() {
            this.doc.normalize();
        },
        setDocumentLocator: function(a) {
            (this.locator = a) && (a.lineNumber = 0);
        },
        comment: function(a) {
            a = f.apply(this, arguments);
            var b = this.doc.createComment(a);
            this.locator && d(this.locator, b), g(this, b);
        },
        startCDATA: function() {
            this.cdata = !0;
        },
        endCDATA: function() {
            this.cdata = !1;
        },
        startDTD: function(a, b, c) {
            var e = this.doc.implementation;
            if (e && e.createDocumentType) {
                var f = e.createDocumentType(a, b, c);
                this.locator && d(this.locator, f), g(this, f);
            }
        },
        warning: function(a) {
            console.warn("[xmldom warning]\t" + a, e(this.locator));
        },
        error: function(a) {
            console.error("[xmldom error]\t" + a, e(this.locator));
        },
        fatalError: function(a) {
            throw console.error("[xmldom fatalError]\t" + a, e(this.locator)), a;
        }
    }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(a) {
        c.prototype[a] = function() {
            return null;
        };
    });
    var h = require("./entities"), i = require("./sax").XMLReader, j = exports.DOMImplementation = require("./dom").DOMImplementation;
    exports.XMLSerializer = require("./dom").XMLSerializer, exports.DOMParser = a;
})();