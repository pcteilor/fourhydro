(function() {
    var l = this,
        g, y = l.jQuery,
        p = l.$,
        o = l.jQuery = l.$ = function(E, F) {
            return new o.fn.init(E, F);
        },
        D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
        f = /^.[^:#\[\.,]*$/;
    o.fn = o.prototype = {
        init: function(E, H) {
            E = E || document;
            if (E.nodeType) {
                this[0] = E;
                this.length = 1;
                this.context = E;
                return this;
            }
            if (typeof E === "string") {
                var G = D.exec(E);
                if (G && (G[1] || !H)) {
                    if (G[1]) {
                        E = o.clean([G[1]], H);
                    } else {
                        var I = document.getElementById(G[3]);
                        if (I && I.id != G[3]) {
                            return o().find(E);
                        }
                        var F = o(I || []);
                        F.context = document;
                        F.selector = E;
                        return F;
                    }
                } else {
                    return o(H).find(E);
                }
            } else {
                if (o.isFunction(E)) {
                    return o(document).ready(E);
                }
            }
            if (E.selector && E.context) {
                this.selector = E.selector;
                this.context = E.context;
            }
            return this.setArray(o.isArray(E) ? E : o.makeArray(E));
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length;
        },
        get: function(E) {
            return E === g ? Array.prototype.slice.call(this) : this[E];
        },
        pushStack: function(F, H, E) {
            var G = o(F);
            G.prevObject = this;
            G.context = this.context;
            if (H === "find") {
                G.selector = this.selector + (this.selector ? " " : "") + E;
            } else {
                if (H) {
                    G.selector = this.selector + "." + H + "(" + E + ")";
                }
            }
            return G;
        },
        setArray: function(E) {
            this.length = 0;
            Array.prototype.push.apply(this, E);
            return this;
        },
        each: function(F, E) {
            return o.each(this, F, E);
        },
        index: function(E) {
            return o.inArray(E && E.jquery ? E[0] : E, this);
        },
        attr: function(F, H, G) {
            var E = F;
            if (typeof F === "string") {
                if (H === g) {
                    return this[0] && o[G || "attr"](this[0], F);
                } else {
                    E = {};
                    E[F] = H;
                }
            }
            return this.each(function(I) {
                for (F in E) {
                    o.attr(G ? this.style : this, F, o.prop(this, E[F], G, I, F));
                }
            });
        },
        css: function(E, F) {
            if ((E == "width" || E == "height") && parseFloat(F) < 0) {
                F = g;
            }
            return this.attr(E, F, "curCSS");
        },
        text: function(F) {
            if (typeof F !== "object" && F != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(F));
            }
            var E = "";
            o.each(F || this, function() {
                o.each(this.childNodes, function() {
                    if (this.nodeType != 8) {
                        E += this.nodeType != 1 ? this.nodeValue : o.fn.text([this]);
                    }
                });
            });
            return E;
        },
        wrapAll: function(E) {
            if (this[0]) {
                var F = o(E, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    F.insertBefore(this[0]);
                }
                F.map(function() {
                    var G = this;
                    while (G.firstChild) {
                        G = G.firstChild;
                    }
                    return G;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(E) {
            return this.each(function() {
                o(this).contents().wrapAll(E);
            });
        },
        wrap: function(E) {
            return this.each(function() {
                o(this).wrapAll(E);
            });
        },
        append: function() {
            return this.domManip(arguments, true, function(E) {
                if (this.nodeType == 1) {
                    this.appendChild(E);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, true, function(E) {
                if (this.nodeType == 1) {
                    this.insertBefore(E, this.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, false, function(E) {
                this.parentNode.insertBefore(E, this);
            });
        },
        after: function() {
            return this.domManip(arguments, false, function(E) {
                this.parentNode.insertBefore(E, this.nextSibling);
            });
        },
        end: function() {
            return this.prevObject || o([]);
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(E) {
            if (this.length === 1) {
                var F = this.pushStack([], "find", E);
                F.length = 0;
                o.find(E, this[0], F);
                return F;
            } else {
                return this.pushStack(o.unique(o.map(this, function(G) {
                    return o.find(E, G);
                })), "find", E);
            }
        },
        clone: function(G) {
            var E = this.map(function() {
                if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
                    var I = this.outerHTML;
                    if (!I) {
                        var J = this.ownerDocument.createElement("div");
                        J.appendChild(this.cloneNode(true));
                        I = J.innerHTML;
                    }
                    return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
                } else {
                    return this.cloneNode(true);
                }
            });
            if (G === true) {
                var H = this.find("*").andSelf(),
                    F = 0;
                E.find("*").andSelf().each(function() {
                    if (this.nodeName !== H[F].nodeName) {
                        return;
                    }
                    var I = o.data(H[F], "events");
                    for (var K in I) {
                        for (var J in I[K]) {
                            o.event.add(this, K, I[K][J], I[K][J].data);
                        }
                    }
                    F++;
                });
            }
            return E;
        },
        filter: function(E) {
            return this.pushStack(o.isFunction(E) && o.grep(this, function(G, F) {
                return E.call(G, F);
            }) || o.multiFilter(E, o.grep(this, function(F) {
                return F.nodeType === 1;
            })), "filter", E);
        },
        closest: function(E) {
            var G = o.expr.match.POS.test(E) ? o(E) : null,
                F = 0;
            return this.map(function() {
                var H = this;
                while (H && H.ownerDocument) {
                    if (G ? G.index(H) > -1 : o(H).is(E)) {
                        o.data(H, "closest", F);
                        return H;
                    }
                    H = H.parentNode;
                    F++;
                }
            });
        },
        not: function(E) {
            if (typeof E === "string") {
                if (f.test(E)) {
                    return this.pushStack(o.multiFilter(E, this, true), "not", E);
                } else {
                    E = o.multiFilter(E, this);
                }
            }
            var F = E.length && E[E.length - 1] !== g && !E.nodeType;
            return this.filter(function() {
                return F ? o.inArray(this, E) < 0 : this != E;
            });
        },
        add: function(E) {
            return this.pushStack(o.unique(o.merge(this.get(), typeof E === "string" ? o(E) : o.makeArray(E))));
        },
        is: function(E) {
            return !!E && o.multiFilter(E, this).length > 0;
        },
        hasClass: function(E) {
            return !!E && this.is("." + E);
        },
        val: function(K) {
            if (K === g) {
                var E = this[0];
                if (E) {
                    if (o.nodeName(E, "option")) {
                        return (E.attributes.value || {}).specified ? E.value : E.text;
                    }
                    if (o.nodeName(E, "select")) {
                        var I = E.selectedIndex,
                            L = [],
                            M = E.options,
                            H = E.type == "select-one";
                        if (I < 0) {
                            return null;
                        }
                        for (var F = H ? I : 0, J = H ? I + 1 : M.length; F < J; F++) {
                            var G = M[F];
                            if (G.selected) {
                                K = o(G).val();
                                if (H) {
                                    return K;
                                }
                                L.push(K);
                            }
                        }
                        return L;
                    }
                    return (E.value || "").replace(/\r/g, "");
                }
                return g;
            }
            if (typeof K === "number") {
                K += "";
            }
            return this.each(function() {
                if (this.nodeType != 1) {
                    return;
                }
                if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
                    this.checked = (o.inArray(this.value, K) >= 0 || o.inArray(this.name, K) >= 0);
                } else {
                    if (o.nodeName(this, "select")) {
                        var N = o.makeArray(K);
                        o("option", this).each(function() {
                            this.selected = (o.inArray(this.value, N) >= 0 || o.inArray(this.text, N) >= 0);
                        });
                        if (!N.length) {
                            this.selectedIndex = -1;
                        }
                    } else {
                        this.value = K;
                    }
                }
            });
        },
        html: function(E) {
            return E === g ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(E);
        },
        replaceWith: function(E) {
            return this.after(E).remove();
        },
        eq: function(E) {
            return this.slice(E, +E + 1);
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","));
        },
        map: function(E) {
            return this.pushStack(o.map(this, function(G, F) {
                return E.call(G, F, G);
            }));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        },
        domManip: function(J, M, L) {
            if (this[0]) {
                var I = (this[0].ownerDocument || this[0]).createDocumentFragment(),
                    F = o.clean(J, (this[0].ownerDocument || this[0]), I),
                    H = I.firstChild;
                if (H) {
                    for (var G = 0, E = this.length; G < E; G++) {
                        L.call(K(this[G], H), this.length > 1 || G > 0 ? I.cloneNode(true) : I);
                    }
                }
                if (F) {
                    o.each(F, z);
                }
            }
            return this;

            function K(N, O) {
                return M && o.nodeName(N, "table") && o.nodeName(O, "tr") ? (N.getElementsByTagName("tbody")[0] || N.appendChild(N.ownerDocument.createElement("tbody"))) : N;
            }
        }
    };
    o.fn.init.prototype = o.fn;

    function z(E, F) {
        if (F.src) {
            o.ajax({
                url: F.src,
                async: false,
                dataType: "script"
            });
        } else {
            o.globalEval(F.text || F.textContent || F.innerHTML || "");
        }
        if (F.parentNode) {
            F.parentNode.removeChild(F);
        }
    }

    function e() {
        return +new Date;
    }
    o.extend = o.fn.extend = function() {
        var J = arguments[0] || {},
            H = 1,
            I = arguments.length,
            E = false,
            G;
        if (typeof J === "boolean") {
            E = J;
            J = arguments[1] || {};
            H = 2;
        }
        if (typeof J !== "object" && !o.isFunction(J)) {
            J = {};
        }
        if (I == H) {
            J = this;
            --H;
        }
        for (; H < I; H++) {
            if ((G = arguments[H]) != null) {
                for (var F in G) {
                    var K = J[F],
                        L = G[F];
                    if (J === L) {
                        continue;
                    }
                    if (E && L && typeof L === "object" && !L.nodeType) {
                        J[F] = o.extend(E, K || (L.length != null ? [] : {}), L);
                    } else {
                        if (L !== g) {
                            J[F] = L;
                        }
                    }
                }
            }
        }
        return J;
    };
    var b = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        q = document.defaultView || {},
        s = Object.prototype.toString;
    o.extend({
        noConflict: function(E) {
            l.$ = p;
            if (E) {
                l.jQuery = y;
            }
            return o;
        },
        isFunction: function(E) {
            return s.call(E) === "[object Function]";
        },
        isArray: function(E) {
            return s.call(E) === "[object Array]";
        },
        isXMLDoc: function(E) {
            return E.nodeType === 9 && E.documentElement.nodeName !== "HTML" || !!E.ownerDocument && o.isXMLDoc(E.ownerDocument);
        },
        globalEval: function(G) {
            if (G && /\S/.test(G)) {
                var F = document.getElementsByTagName("head")[0] || document.documentElement,
                    E = document.createElement("script");
                E.type = "text/javascript";
                if (o.support.scriptEval) {
                    E.appendChild(document.createTextNode(G));
                } else {
                    E.text = G;
                }
                F.insertBefore(E, F.firstChild);
                F.removeChild(E);
            }
        },
        nodeName: function(F, E) {
            return F.nodeName && F.nodeName.toUpperCase() == E.toUpperCase();
        },
        each: function(G, K, F) {
            var E, H = 0,
                I = G.length;
            if (F) {
                if (I === g) {
                    for (E in G) {
                        if (K.apply(G[E], F) === false) {
                            break;
                        }
                    }
                } else {
                    for (; H < I;) {
                        if (K.apply(G[H++], F) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (I === g) {
                    for (E in G) {
                        if (K.call(G[E], E, G[E]) === false) {
                            break;
                        }
                    }
                } else {
                    for (var J = G[0]; H < I && K.call(J, H, J) !== false; J = G[++H]) {}
                }
            }
            return G;
        },
        prop: function(H, I, G, F, E) {
            if (o.isFunction(I)) {
                I = I.call(H, F);
            }
            return typeof I === "number" && G == "curCSS" && !b.test(E) ? I + "px" : I;
        },
        className: {
            add: function(E, F) {
                o.each((F || "").split(/\s+/), function(G, H) {
                    if (E.nodeType == 1 && !o.className.has(E.className, H)) {
                        E.className += (E.className ? " " : "") + H;
                    }
                });
            },
            remove: function(E, F) {
                if (E.nodeType == 1) {
                    E.className = F !== g ? o.grep(E.className.split(/\s+/), function(G) {
                        return !o.className.has(F, G);
                    }).join(" ") : "";
                }
            },
            has: function(F, E) {
                return F && o.inArray(E, (F.className || F).toString().split(/\s+/)) > -1;
            }
        },
        swap: function(H, G, I) {
            var E = {};
            for (var F in G) {
                E[F] = H.style[F];
                H.style[F] = G[F];
            }
            I.call(H);
            for (var F in G) {
                H.style[F] = E[F];
            }
        },
        css: function(H, F, J, E) {
            if (F == "width" || F == "height") {
                var L, G = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    K = F == "width" ? ["Left", "Right"] : ["Top", "Bottom"];

                function I() {
                    L = F == "width" ? H.offsetWidth : H.offsetHeight;
                    if (E === "border") {
                        return;
                    }
                    o.each(K, function() {
                        if (!E) {
                            L -= parseFloat(o.curCSS(H, "padding" + this, true)) || 0;
                        }
                        if (E === "margin") {
                            L += parseFloat(o.curCSS(H, "margin" + this, true)) || 0;
                        } else {
                            L -= parseFloat(o.curCSS(H, "border" + this + "Width", true)) || 0;
                        }
                    });
                }
                if (H.offsetWidth !== 0) {
                    I();
                } else {
                    o.swap(H, G, I);
                }
                return Math.max(0, Math.round(L));
            }
            return o.curCSS(H, F, J);
        },
        curCSS: function(I, F, G) {
            var L, E = I.style;
            if (F == "opacity" && !o.support.opacity) {
                L = o.attr(E, "opacity");
                return L == "" ? "1" : L;
            }
            if (F.match(/float/i)) {
                F = w;
            }
            if (!G && E && E[F]) {
                L = E[F];
            } else {
                if (q.getComputedStyle) {
                    if (F.match(/float/i)) {
                        F = "float";
                    }
                    F = F.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var M = q.getComputedStyle(I, null);
                    if (M) {
                        L = M.getPropertyValue(F);
                    }
                    if (F == "opacity" && L == "") {
                        L = "1";
                    }
                } else {
                    if (I.currentStyle) {
                        var J = F.replace(/\-(\w)/g, function(N, O) {
                            return O.toUpperCase();
                        });
                        L = I.currentStyle[F] || I.currentStyle[J];
                        if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
                            var H = E.left,
                                K = I.runtimeStyle.left;
                            I.runtimeStyle.left = I.currentStyle.left;
                            E.left = L || 0;
                            L = E.pixelLeft + "px";
                            E.left = H;
                            I.runtimeStyle.left = K;
                        }
                    }
                }
            }
            return L;
        },
        clean: function(F, K, I) {
            K = K || document;
            if (typeof K.createElement === "undefined") {
                K = K.ownerDocument || K[0] && K[0].ownerDocument || document;
            }
            if (!I && F.length === 1 && typeof F[0] === "string") {
                var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
                if (H) {
                    return [K.createElement(H[1])];
                }
            }
            var G = [],
                E = [],
                L = K.createElement("div");
            o.each(F, function(P, S) {
                if (typeof S === "number") {
                    S += "";
                }
                if (!S) {
                    return;
                }
                if (typeof S === "string") {
                    S = S.replace(/(<(\w+)[^>]*?)\/>/g, function(U, V, T) {
                        return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U : V + "></" + T + ">";
                    });
                    var O = S.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var Q = !O.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !O.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || O.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !O.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!O.indexOf("<td") || !O.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !O.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !o.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    L.innerHTML = Q[1] + S + Q[2];
                    while (Q[0] --) {
                        L = L.lastChild;
                    }
                    if (!o.support.tbody) {
                        var R = /<tbody/i.test(S),
                            N = !O.indexOf("<table") && !R ? L.firstChild && L.firstChild.childNodes : Q[1] == "<table>" && !R ? L.childNodes : [];
                        for (var M = N.length - 1; M >= 0; --M) {
                            if (o.nodeName(N[M], "tbody") && !N[M].childNodes.length) {
                                N[M].parentNode.removeChild(N[M]);
                            }
                        }
                    }
                    if (!o.support.leadingWhitespace && /^\s/.test(S)) {
                        L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]), L.firstChild);
                    }
                    S = o.makeArray(L.childNodes);
                }
                if (S.nodeType) {
                    G.push(S);
                } else {
                    G = o.merge(G, S);
                }
            });
            if (I) {
                for (var J = 0; G[J]; J++) {
                    if (o.nodeName(G[J], "script") && (!G[J].type || G[J].type.toLowerCase() === "text/javascript")) {
                        E.push(G[J].parentNode ? G[J].parentNode.removeChild(G[J]) : G[J]);
                    } else {
                        if (G[J].nodeType === 1) {
                            G.splice.apply(G, [J + 1, 0].concat(o.makeArray(G[J].getElementsByTagName("script"))));
                        }
                        I.appendChild(G[J]);
                    }
                }
                return E;
            }
            return G;
        },
        attr: function(J, G, K) {
            if (!J || J.nodeType == 3 || J.nodeType == 8) {
                return g;
            }
            var H = !o.isXMLDoc(J),
                L = K !== g;
            G = H && o.props[G] || G;
            if (J.tagName) {
                var F = /href|src|style/.test(G);
                if (G == "selected" && J.parentNode) {
                    J.parentNode.selectedIndex;
                }
                if (G in J && H && !F) {
                    if (L) {
                        if (G == "type" && o.nodeName(J, "input") && J.parentNode) {
                            throw "type property can't be changed";
                        }
                        J[G] = K;
                    }
                    if (o.nodeName(J, "form") && J.getAttributeNode(G)) {
                        return J.getAttributeNode(G).nodeValue;
                    }
                    if (G == "tabIndex") {
                        var I = J.getAttributeNode("tabIndex");
                        return I && I.specified ? I.value : J.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : J.nodeName.match(/^(a|area)$/i) && J.href ? 0 : g;
                    }
                    return J[G];
                }
                if (!o.support.style && H && G == "style") {
                    return o.attr(J.style, "cssText", K);
                }
                if (L) {
                    J.setAttribute(G, "" + K);
                }
                var E = !o.support.hrefNormalized && H && F ? J.getAttribute(G, 2) : J.getAttribute(G);
                return E === null ? g : E;
            }
            if (!o.support.opacity && G == "opacity") {
                if (L) {
                    J.zoom = 1;
                    J.filter = (J.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(K) + "" == "NaN" ? "" : "alpha(opacity=" + K * 100 + ")");
                }
                return J.filter && J.filter.indexOf("opacity=") >= 0 ? (parseFloat(J.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : "";
            }
            G = G.replace(/-([a-z])/ig, function(M, N) {
                return N.toUpperCase();
            });
            if (L) {
                J[G] = K;
            }
            return J[G];
        },
        trim: function(E) {
            return (E || "").replace(/^\s+|\s+$/g, "");
        },
        makeArray: function(G) {
            var E = [];
            if (G != null) {
                var F = G.length;
                if (F == null || typeof G === "string" || o.isFunction(G) || G.setInterval) {
                    E[0] = G;
                } else {
                    while (F) {
                        E[--F] = G[F];
                    }
                }
            }
            return E;
        },
        inArray: function(G, H) {
            for (var E = 0, F = H.length; E < F; E++) {
                if (H[E] === G) {
                    return E;
                }
            }
            return -1;
        },
        merge: function(H, E) {
            var F = 0,
                G, I = H.length;
            if (!o.support.getAll) {
                while ((G = E[F++]) != null) {
                    if (G.nodeType != 8) {
                        H[I++] = G;
                    }
                }
            } else {
                while ((G = E[F++]) != null) {
                    H[I++] = G;
                }
            }
            return H;
        },
        unique: function(K) {
            var F = [],
                E = {};
            try {
                for (var G = 0, H = K.length; G < H; G++) {
                    var J = o.data(K[G]);
                    if (!E[J]) {
                        E[J] = true;
                        F.push(K[G]);
                    }
                }
            } catch (I) {
                F = K;
            }
            return F;
        },
        grep: function(F, J, E) {
            var G = [];
            for (var H = 0, I = F.length; H < I; H++) {
                if (!E != !J(F[H], H)) {
                    G.push(F[H]);
                }
            }
            return G;
        },
        map: function(E, J) {
            var F = [];
            for (var G = 0, H = E.length; G < H; G++) {
                var I = J(E[G], G);
                if (I != null) {
                    F[F.length] = I;
                }
            }
            return F.concat.apply([], F);
        }
    });
    var C = navigator.userAgent.toLowerCase();
    o.browser = {
        version: (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(C),
        opera: /opera/.test(C),
        msie: /msie/.test(C) && !/opera/.test(C),
        mozilla: /mozilla/.test(C) && !/(compatible|webkit)/.test(C)
    };
    o.each({
        parent: function(E) {
            return E.parentNode;
        },
        parents: function(E) {
            return o.dir(E, "parentNode");
        },
        next: function(E) {
            return o.nth(E, 2, "nextSibling");
        },
        prev: function(E) {
            return o.nth(E, 2, "previousSibling");
        },
        nextAll: function(E) {
            return o.dir(E, "nextSibling");
        },
        prevAll: function(E) {
            return o.dir(E, "previousSibling");
        },
        siblings: function(E) {
            return o.sibling(E.parentNode.firstChild, E);
        },
        children: function(E) {
            return o.sibling(E.firstChild);
        },
        contents: function(E) {
            return o.nodeName(E, "iframe") ? E.contentDocument || E.contentWindow.document : o.makeArray(E.childNodes);
        }
    }, function(E, F) {
        o.fn[E] = function(G) {
            var H = o.map(this, F);
            if (G && typeof G == "string") {
                H = o.multiFilter(G, H);
            }
            return this.pushStack(o.unique(H), E, G);
        };
    });
    o.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(E, F) {
        o.fn[E] = function(G) {
            var J = [],
                L = o(G);
            for (var K = 0, H = L.length; K < H; K++) {
                var I = (K > 0 ? this.clone(true) : this).get();
                o.fn[F].apply(o(L[K]), I);
                J = J.concat(I);
            }
            return this.pushStack(J, E, G);
        };
    });
    o.each({
        removeAttr: function(E) {
            o.attr(this, E, "");
            if (this.nodeType == 1) {
                this.removeAttribute(E);
            }
        },
        addClass: function(E) {
            o.className.add(this, E);
        },
        removeClass: function(E) {
            o.className.remove(this, E);
        },
        toggleClass: function(F, E) {
            if (typeof E !== "boolean") {
                E = !o.className.has(this, F);
            }
            o.className[E ? "add" : "remove"](this, F);
        },
        remove: function(E) {
            if (!E || o.filter(E, [this]).length) {
                o("*", this).add([this]).each(function() {
                    o.event.remove(this);
                    o.removeData(this);
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            }
        },
        empty: function() {
            o(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        }
    }, function(E, F) {
        o.fn[E] = function() {
            return this.each(F, arguments);
        };
    });

    function j(E, F) {
        return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0;
    }
    var h = "jQuery" + e(),
        v = 0,
        A = {};
    o.extend({
        cache: {},
        data: function(F, E, G) {
            F = F == l ? A : F;
            var H = F[h];
            if (!H) {
                H = F[h] = ++v;
            }
            if (E && !o.cache[H]) {
                o.cache[H] = {};
            }
            if (G !== g) {
                o.cache[H][E] = G;
            }
            return E ? o.cache[H][E] : H;
        },
        removeData: function(F, E) {
            F = F == l ? A : F;
            var H = F[h];
            if (E) {
                if (o.cache[H]) {
                    delete o.cache[H][E];
                    E = "";
                    for (E in o.cache[H]) {
                        break;
                    }
                    if (!E) {
                        o.removeData(F);
                    }
                }
            } else {
                try {
                    delete F[h];
                } catch (G) {
                    if (F.removeAttribute) {
                        F.removeAttribute(h);
                    }
                }
                delete o.cache[H];
            }
        },
        queue: function(F, E, H) {
            if (F) {
                E = (E || "fx") + "queue";
                var G = o.data(F, E);
                if (!G || o.isArray(H)) {
                    G = o.data(F, E, o.makeArray(H));
                } else {
                    if (H) {
                        G.push(H);
                    }
                }
            }
            return G;
        },
        dequeue: function(H, G) {
            var E = o.queue(H, G),
                F = E.shift();
            if (!G || G === "fx") {
                F = E[0];
            }
            if (F !== g) {
                F.call(H);
            }
        }
    });
    o.fn.extend({
        data: function(E, G) {
            var H = E.split(".");
            H[1] = H[1] ? "." + H[1] : "";
            if (G === g) {
                var F = this.triggerHandler("getData" + H[1] + "!", [H[0]]);
                if (F === g && this.length) {
                    F = o.data(this[0], E);
                }
                return F === g && H[1] ? this.data(H[0]) : F;
            } else {
                return this.trigger("setData" + H[1] + "!", [H[0], G]).each(function() {
                    o.data(this, E, G);
                });
            }
        },
        removeData: function(E) {
            return this.each(function() {
                o.removeData(this, E);
            });
        },
        queue: function(E, F) {
            if (typeof E !== "string") {
                F = E;
                E = "fx";
            }
            if (F === g) {
                return o.queue(this[0], E);
            }
            return this.each(function() {
                var G = o.queue(this, E, F);
                if (E == "fx" && G.length == 1) {
                    G[0].call(this);
                }
            });
        },
        dequeue: function(E) {
            return this.each(function() {
                o.dequeue(this, E);
            });
        }
    });
    (function() {
        var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
            L = 0,
            H = Object.prototype.toString;
        var F = function(Y, U, ab, ac) {
            ab = ab || [];
            U = U || document;
            if (U.nodeType !== 1 && U.nodeType !== 9) {
                return [];
            }
            if (!Y || typeof Y !== "string") {
                return ab;
            }
            var Z = [],
                W, af, ai, T, ad, V, X = true;
            R.lastIndex = 0;
            while ((W = R.exec(Y)) !== null) {
                Z.push(W[1]);
                if (W[2]) {
                    V = RegExp.rightContext;
                    break;
                }
            }
            if (Z.length > 1 && M.exec(Y)) {
                if (Z.length === 2 && I.relative[Z[0]]) {
                    af = J(Z[0] + Z[1], U);
                } else {
                    af = I.relative[Z[0]] ? [U] : F(Z.shift(), U);
                    while (Z.length) {
                        Y = Z.shift();
                        if (I.relative[Y]) {
                            Y += Z.shift();
                        }
                        af = J(Y, af);
                    }
                }
            } else {
                var ae = ac ? {
                    expr: Z.pop(),
                    set: E(ac)
                } : F.find(Z.pop(), Z.length === 1 && U.parentNode ? U.parentNode : U, Q(U));
                af = F.filter(ae.expr, ae.set);
                if (Z.length > 0) {
                    ai = E(af);
                } else {
                    X = false;
                }
                while (Z.length) {
                    var ah = Z.pop(),
                        ag = ah;
                    if (!I.relative[ah]) {
                        ah = "";
                    } else {
                        ag = Z.pop();
                    }
                    if (ag == null) {
                        ag = U;
                    }
                    I.relative[ah](ai, ag, Q(U));
                }
            }
            if (!ai) {
                ai = af;
            }
            if (!ai) {
                throw "Syntax error, unrecognized expression: " + (ah || Y);
            }
            if (H.call(ai) === "[object Array]") {
                if (!X) {
                    ab.push.apply(ab, ai);
                } else {
                    if (U.nodeType === 1) {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && (ai[aa] === true || ai[aa].nodeType === 1 && K(U, ai[aa]))) {
                                ab.push(af[aa]);
                            }
                        }
                    } else {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && ai[aa].nodeType === 1) {
                                ab.push(af[aa]);
                            }
                        }
                    }
                }
            } else {
                E(ai, ab);
            }
            if (V) {
                F(V, U, ab, ac);
                if (G) {
                    hasDuplicate = false;
                    ab.sort(G);
                    if (hasDuplicate) {
                        for (var aa = 1; aa < ab.length; aa++) {
                            if (ab[aa] === ab[aa - 1]) {
                                ab.splice(aa--, 1);
                            }
                        }
                    }
                }
            }
            return ab;
        };
        F.matches = function(T, U) {
            return F(T, null, null, U);
        };
        F.find = function(aa, T, ab) {
            var Z, X;
            if (!aa) {
                return [];
            }
            for (var W = 0, V = I.order.length; W < V; W++) {
                var Y = I.order[W],
                    X;
                if ((X = I.match[Y].exec(aa))) {
                    var U = RegExp.leftContext;
                    if (U.substr(U.length - 1) !== "\\") {
                        X[1] = (X[1] || "").replace(/\\/g, "");
                        Z = I.find[Y](X, T, ab);
                        if (Z != null) {
                            aa = aa.replace(I.match[Y], "");
                            break;
                        }
                    }
                }
            }
            if (!Z) {
                Z = T.getElementsByTagName("*");
            }
            return {
                set: Z,
                expr: aa
            };
        };
        F.filter = function(ad, ac, ag, W) {
            var V = ad,
                ai = [],
                aa = ac,
                Y, T, Z = ac && ac[0] && Q(ac[0]);
            while (ad && ac.length) {
                for (var ab in I.filter) {
                    if ((Y = I.match[ab].exec(ad)) != null) {
                        var U = I.filter[ab],
                            ah, af;
                        T = false;
                        if (aa == ai) {
                            ai = [];
                        }
                        if (I.preFilter[ab]) {
                            Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
                            if (!Y) {
                                T = ah = true;
                            } else {
                                if (Y === true) {
                                    continue;
                                }
                            }
                        }
                        if (Y) {
                            for (var X = 0;
                                (af = aa[X]) != null; X++) {
                                if (af) {
                                    ah = U(af, Y, X, aa);
                                    var ae = W ^ !!ah;
                                    if (ag && ah != null) {
                                        if (ae) {
                                            T = true;
                                        } else {
                                            aa[X] = false;
                                        }
                                    } else {
                                        if (ae) {
                                            ai.push(af);
                                            T = true;
                                        }
                                    }
                                }
                            }
                        }
                        if (ah !== g) {
                            if (!ag) {
                                aa = ai;
                            }
                            ad = ad.replace(I.match[ab], "");
                            if (!T) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (ad == V) {
                    if (T == null) {
                        throw "Syntax error, unrecognized expression: " + ad;
                    } else {
                        break;
                    }
                }
                V = ad;
            }
            return aa;
        };
        var I = F.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(T) {
                    return T.getAttribute("href");
                }
            },
            relative: {
                "+": function(aa, T, Z) {
                    var X = typeof T === "string",
                        ab = X && !/\W/.test(T),
                        Y = X && !ab;
                    if (ab && !Z) {
                        T = T.toUpperCase();
                    }
                    for (var W = 0, V = aa.length, U; W < V; W++) {
                        if ((U = aa[W])) {
                            while ((U = U.previousSibling) && U.nodeType !== 1) {}
                            aa[W] = Y || U && U.nodeName === T ? U || false : U === T;
                        }
                    }
                    if (Y) {
                        F.filter(T, aa, true);
                    }
                },
                ">": function(Z, U, aa) {
                    var X = typeof U === "string";
                    if (X && !/\W/.test(U)) {
                        U = aa ? U : U.toUpperCase();
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                var W = Y.parentNode;
                                Z[V] = W.nodeName === U ? W : false;
                            }
                        }
                    } else {
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                Z[V] = X ? Y.parentNode : Y.parentNode === U;
                            }
                        }
                        if (X) {
                            F.filter(U, Z, true);
                        }
                    }
                },
                "": function(W, U, Y) {
                    var V = L++,
                        T = S;
                    if (!U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P;
                    }
                    T("parentNode", U, V, W, X, Y);
                },
                "~": function(W, U, Y) {
                    var V = L++,
                        T = S;
                    if (typeof U === "string" && !U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P;
                    }
                    T("previousSibling", U, V, W, X, Y);
                }
            },
            find: {
                ID: function(U, V, W) {
                    if (typeof V.getElementById !== "undefined" && !W) {
                        var T = V.getElementById(U[1]);
                        return T ? [T] : [];
                    }
                },
                NAME: function(V, Y, Z) {
                    if (typeof Y.getElementsByName !== "undefined") {
                        var U = [],
                            X = Y.getElementsByName(V[1]);
                        for (var W = 0, T = X.length; W < T; W++) {
                            if (X[W].getAttribute("name") === V[1]) {
                                U.push(X[W]);
                            }
                        }
                        return U.length === 0 ? null : U;
                    }
                },
                TAG: function(T, U) {
                    return U.getElementsByTagName(T[1]);
                }
            },
            preFilter: {
                CLASS: function(W, U, V, T, Z, aa) {
                    W = " " + W[1].replace(/\\/g, "") + " ";
                    if (aa) {
                        return W;
                    }
                    for (var X = 0, Y;
                        (Y = U[X]) != null; X++) {
                        if (Y) {
                            if (Z ^ (Y.className && (" " + Y.className + " ").indexOf(W) >= 0)) {
                                if (!V) {
                                    T.push(Y);
                                }
                            } else {
                                if (V) {
                                    U[X] = false;
                                }
                            }
                        }
                    }
                    return false;
                },
                ID: function(T) {
                    return T[1].replace(/\\/g, "");
                },
                TAG: function(U, T) {
                    for (var V = 0; T[V] === false; V++) {}
                    return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase();
                },
                CHILD: function(T) {
                    if (T[1] == "nth") {
                        var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == "even" && "2n" || T[2] == "odd" && "2n+1" || !/\D/.test(T[2]) && "0n+" + T[2] || T[2]);
                        T[2] = (U[1] + (U[2] || 1)) - 0;
                        T[3] = U[3] - 0;
                    }
                    T[0] = L++;
                    return T;
                },
                ATTR: function(X, U, V, T, Y, Z) {
                    var W = X[1].replace(/\\/g, "");
                    if (!Z && I.attrMap[W]) {
                        X[1] = I.attrMap[W];
                    }
                    if (X[2] === "~=") {
                        X[4] = " " + X[4] + " ";
                    }
                    return X;
                },
                PSEUDO: function(X, U, V, T, Y) {
                    if (X[1] === "not") {
                        if (X[3].match(R).length > 1 || /^\w/.test(X[3])) {
                            X[3] = F(X[3], null, null, U);
                        } else {
                            var W = F.filter(X[3], U, V, true ^ Y);
                            if (!V) {
                                T.push.apply(T, W);
                            }
                            return false;
                        }
                    } else {
                        if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
                            return true;
                        }
                    }
                    return X;
                },
                POS: function(T) {
                    T.unshift(true);
                    return T;
                }
            },
            filters: {
                enabled: function(T) {
                    return T.disabled === false && T.type !== "hidden";
                },
                disabled: function(T) {
                    return T.disabled === true;
                },
                checked: function(T) {
                    return T.checked === true;
                },
                selected: function(T) {
                    T.parentNode.selectedIndex;
                    return T.selected === true;
                },
                parent: function(T) {
                    return !!T.firstChild;
                },
                empty: function(T) {
                    return !T.firstChild;
                },
                has: function(V, U, T) {
                    return !!F(T[3], V).length;
                },
                header: function(T) {
                    return /h\d/i.test(T.nodeName);
                },
                text: function(T) {
                    return "text" === T.type;
                },
                radio: function(T) {
                    return "radio" === T.type;
                },
                checkbox: function(T) {
                    return "checkbox" === T.type;
                },
                file: function(T) {
                    return "file" === T.type;
                },
                password: function(T) {
                    return "password" === T.type;
                },
                submit: function(T) {
                    return "submit" === T.type;
                },
                image: function(T) {
                    return "image" === T.type;
                },
                reset: function(T) {
                    return "reset" === T.type;
                },
                button: function(T) {
                    return "button" === T.type || T.nodeName.toUpperCase() === "BUTTON";
                },
                input: function(T) {
                    return /input|select|textarea|button/i.test(T.nodeName);
                }
            },
            setFilters: {
                first: function(U, T) {
                    return T === 0;
                },
                last: function(V, U, T, W) {
                    return U === W.length - 1;
                },
                even: function(U, T) {
                    return T % 2 === 0;
                },
                odd: function(U, T) {
                    return T % 2 === 1;
                },
                lt: function(V, U, T) {
                    return U < T[3] - 0;
                },
                gt: function(V, U, T) {
                    return U > T[3] - 0;
                },
                nth: function(V, U, T) {
                    return T[3] - 0 == U;
                },
                eq: function(V, U, T) {
                    return T[3] - 0 == U;
                }
            },
            filter: {
                PSEUDO: function(Z, V, W, aa) {
                    var U = V[1],
                        X = I.filters[U];
                    if (X) {
                        return X(Z, W, V, aa);
                    } else {
                        if (U === "contains") {
                            return (Z.textContent || Z.innerText || "").indexOf(V[3]) >= 0;
                        } else {
                            if (U === "not") {
                                var Y = V[3];
                                for (var W = 0, T = Y.length; W < T; W++) {
                                    if (Y[W] === Z) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        }
                    }
                },
                CHILD: function(T, W) {
                    var Z = W[1],
                        U = T;
                    switch (Z) {
                        case "only":
                        case "first":
                            while (U = U.previousSibling) {
                                if (U.nodeType === 1) {
                                    return false;
                                }
                            }
                            if (Z == "first") {
                                return true;
                            }
                            U = T;
                        case "last":
                            while (U = U.nextSibling) {
                                if (U.nodeType === 1) {
                                    return false;
                                }
                            }
                            return true;
                        case "nth":
                            var V = W[2],
                                ac = W[3];
                            if (V == 1 && ac == 0) {
                                return true;
                            }
                            var Y = W[0],
                                ab = T.parentNode;
                            if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
                                var X = 0;
                                for (U = ab.firstChild; U; U = U.nextSibling) {
                                    if (U.nodeType === 1) {
                                        U.nodeIndex = ++X;
                                    }
                                }
                                ab.sizcache = Y;
                            }
                            var aa = T.nodeIndex - ac;
                            if (V == 0) {
                                return aa == 0;
                            } else {
                                return (aa % V == 0 && aa / V >= 0);
                            }
                    }
                },
                ID: function(U, T) {
                    return U.nodeType === 1 && U.getAttribute("id") === T;
                },
                TAG: function(U, T) {
                    return (T === "*" && U.nodeType === 1) || U.nodeName === T;
                },
                CLASS: function(U, T) {
                    return (" " + (U.className || U.getAttribute("class")) + " ").indexOf(T) > -1;
                },
                ATTR: function(Y, W) {
                    var V = W[1],
                        T = I.attrHandle[V] ? I.attrHandle[V](Y) : Y[V] != null ? Y[V] : Y.getAttribute(V),
                        Z = T + "",
                        X = W[2],
                        U = W[4];
                    return T == null ? X === "!=" : X === "=" ? Z === U : X === "*=" ? Z.indexOf(U) >= 0 : X === "~=" ? (" " + Z + " ").indexOf(U) >= 0 : !U ? Z && T !== false : X === "!=" ? Z != U : X === "^=" ? Z.indexOf(U) === 0 : X === "$=" ? Z.substr(Z.length - U.length) === U : X === "|=" ? Z === U || Z.substr(0, U.length + 1) === U + "-" : false;
                },
                POS: function(X, U, V, Y) {
                    var T = U[2],
                        W = I.setFilters[T];
                    if (W) {
                        return W(X, V, U, Y);
                    }
                }
            }
        };
        var M = I.match.POS;
        for (var O in I.match) {
            I.match[O] = RegExp(I.match[O].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        }
        var E = function(U, T) {
            U = Array.prototype.slice.call(U);
            if (T) {
                T.push.apply(T, U);
                return T;
            }
            return U;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes);
        } catch (N) {
            E = function(X, W) {
                var U = W || [];
                if (H.call(X) === "[object Array]") {
                    Array.prototype.push.apply(U, X);
                } else {
                    if (typeof X.length === "number") {
                        for (var V = 0, T = X.length; V < T; V++) {
                            U.push(X[V]);
                        }
                    } else {
                        for (var V = 0; X[V]; V++) {
                            U.push(X[V]);
                        }
                    }
                }
                return U;
            };
        }
        var G;
        if (document.documentElement.compareDocumentPosition) {
            G = function(U, T) {
                var V = U.compareDocumentPosition(T) & 4 ? -1 : U === T ? 0 : 1;
                if (V === 0) {
                    hasDuplicate = true;
                }
                return V;
            };
        } else {
            if ("sourceIndex" in document.documentElement) {
                G = function(U, T) {
                    var V = U.sourceIndex - T.sourceIndex;
                    if (V === 0) {
                        hasDuplicate = true;
                    }
                    return V;
                };
            } else {
                if (document.createRange) {
                    G = function(W, U) {
                        var V = W.ownerDocument.createRange(),
                            T = U.ownerDocument.createRange();
                        V.selectNode(W);
                        V.collapse(true);
                        T.selectNode(U);
                        T.collapse(true);
                        var X = V.compareBoundaryPoints(Range.START_TO_END, T);
                        if (X === 0) {
                            hasDuplicate = true;
                        }
                        return X;
                    };
                }
            }
        }(function() {
            var U = document.createElement("form"),
                V = "script" + (new Date).getTime();
            U.innerHTML = "<input name='" + V + "'/>";
            var T = document.documentElement;
            T.insertBefore(U, T.firstChild);
            if (!!document.getElementById(V)) {
                I.find.ID = function(X, Y, Z) {
                    if (typeof Y.getElementById !== "undefined" && !Z) {
                        var W = Y.getElementById(X[1]);
                        return W ? W.id === X[1] || typeof W.getAttributeNode !== "undefined" && W.getAttributeNode("id").nodeValue === X[1] ? [W] : g : [];
                    }
                };
                I.filter.ID = function(Y, W) {
                    var X = typeof Y.getAttributeNode !== "undefined" && Y.getAttributeNode("id");
                    return Y.nodeType === 1 && X && X.nodeValue === W;
                };
            }
            T.removeChild(U);
        })();
        (function() {
            var T = document.createElement("div");
            T.appendChild(document.createComment(""));
            if (T.getElementsByTagName("*").length > 0) {
                I.find.TAG = function(U, Y) {
                    var X = Y.getElementsByTagName(U[1]);
                    if (U[1] === "*") {
                        var W = [];
                        for (var V = 0; X[V]; V++) {
                            if (X[V].nodeType === 1) {
                                W.push(X[V]);
                            }
                        }
                        X = W;
                    }
                    return X;
                };
            }
            T.innerHTML = "<a href='#'></a>";
            if (T.firstChild && typeof T.firstChild.getAttribute !== "undefined" && T.firstChild.getAttribute("href") !== "#") {
                I.attrHandle.href = function(U) {
                    return U.getAttribute("href", 2);
                };
            }
        })();
        if (document.querySelectorAll) {
            (function() {
                var T = F,
                    U = document.createElement("div");
                U.innerHTML = "<p class='TEST'></p>";
                if (U.querySelectorAll && U.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                F = function(Y, X, V, W) {
                    X = X || document;
                    if (!W && X.nodeType === 9 && !Q(X)) {
                        try {
                            return E(X.querySelectorAll(Y), V);
                        } catch (Z) {}
                    }
                    return T(Y, X, V, W);
                };
                F.find = T.find;
                F.filter = T.filter;
                F.selectors = T.selectors;
                F.matches = T.matches;
            })();
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function() {
                var T = document.createElement("div");
                T.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (T.getElementsByClassName("e").length === 0) {
                    return;
                }
                T.lastChild.className = "e";
                if (T.getElementsByClassName("e").length === 1) {
                    return;
                }
                I.order.splice(1, 0, "CLASS");
                I.find.CLASS = function(U, V, W) {
                    if (typeof V.getElementsByClassName !== "undefined" && !W) {
                        return V.getElementsByClassName(U[1]);
                    }
                };
            })();
        }

        function P(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W;
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break;
                        }
                        if (T.nodeType === 1 && !ac) {
                            T.sizcache = Y;
                            T.sizset = W;
                        }
                        if (T.nodeName === Z) {
                            X = T;
                            break;
                        }
                        T = T[U];
                    }
                    ad[W] = X;
                }
            }
        }

        function S(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W;
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break;
                        }
                        if (T.nodeType === 1) {
                            if (!ac) {
                                T.sizcache = Y;
                                T.sizset = W;
                            }
                            if (typeof Z !== "string") {
                                if (T === Z) {
                                    X = true;
                                    break;
                                }
                            } else {
                                if (F.filter(Z, [T]).length > 0) {
                                    X = T;
                                    break;
                                }
                            }
                        }
                        T = T[U];
                    }
                    ad[W] = X;
                }
            }
        }
        var K = document.compareDocumentPosition ? function(U, T) {
            return U.compareDocumentPosition(T) & 16;
        } : function(U, T) {
            return U !== T && (U.contains ? U.contains(T) : true);
        };
        var Q = function(T) {
            return T.nodeType === 9 && T.documentElement.nodeName !== "HTML" || !!T.ownerDocument && Q(T.ownerDocument);
        };
        var J = function(T, aa) {
            var W = [],
                X = "",
                Y, V = aa.nodeType ? [aa] : aa;
            while ((Y = I.match.PSEUDO.exec(T))) {
                X += Y[0];
                T = T.replace(I.match.PSEUDO, "");
            }
            T = I.relative[T] ? T + "*" : T;
            for (var Z = 0, U = V.length; Z < U; Z++) {
                F(T, V[Z], W);
            }
            return F.filter(X, W);
        };
        o.find = F;
        o.filter = F.filter;
        o.expr = F.selectors;
        o.expr[":"] = o.expr.filters;
        F.selectors.filters.hidden = function(T) {
            return T.offsetWidth === 0 || T.offsetHeight === 0;
        };
        F.selectors.filters.visible = function(T) {
            return T.offsetWidth > 0 || T.offsetHeight > 0;
        };
        F.selectors.filters.animated = function(T) {
            return o.grep(o.timers, function(U) {
                return T === U.elem;
            }).length;
        };
        o.multiFilter = function(V, T, U) {
            if (U) {
                V = ":not(" + V + ")";
            }
            return F.matches(V, T);
        };
        o.dir = function(V, U) {
            var T = [],
                W = V[U];
            while (W && W != document) {
                if (W.nodeType == 1) {
                    T.push(W);
                }
                W = W[U];
            }
            return T;
        };
        o.nth = function(X, T, V, W) {
            T = T || 1;
            var U = 0;
            for (; X; X = X[V]) {
                if (X.nodeType == 1 && ++U == T) {
                    break;
                }
            }
            return X;
        };
        o.sibling = function(V, U) {
            var T = [];
            for (; V; V = V.nextSibling) {
                if (V.nodeType == 1 && V != U) {
                    T.push(V);
                }
            }
            return T;
        };
        return;
        l.Sizzle = F;
    })();
    o.event = {
        add: function(I, F, H, K) {
            if (I.nodeType == 3 || I.nodeType == 8) {
                return;
            }
            if (I.setInterval && I != l) {
                I = l;
            }
            if (!H.guid) {
                H.guid = this.guid++;
            }
            if (K !== g) {
                var G = H;
                H = this.proxy(G);
                H.data = K;
            }
            var E = o.data(I, "events") || o.data(I, "events", {}),
                J = o.data(I, "handle") || o.data(I, "handle", function() {
                    return typeof o !== "undefined" && !o.event.triggered ? o.event.handle.apply(arguments.callee.elem, arguments) : g;
                });
            J.elem = I;
            o.each(F.split(/\s+/), function(M, N) {
                var O = N.split(".");
                N = O.shift();
                H.type = O.slice().sort().join(".");
                var L = E[N];
                if (o.event.specialAll[N]) {
                    o.event.specialAll[N].setup.call(I, K, O);
                }
                if (!L) {
                    L = E[N] = {};
                    if (!o.event.special[N] || o.event.special[N].setup.call(I, K, O) === false) {
                        if (I.addEventListener) {
                            I.addEventListener(N, J, false);
                        } else {
                            if (I.attachEvent) {
                                I.attachEvent("on" + N, J);
                            }
                        }
                    }
                }
                L[H.guid] = H;
                o.event.global[N] = true;
            });
            I = null;
        },
        guid: 1,
        global: {},
        remove: function(K, H, J) {
            if (K.nodeType == 3 || K.nodeType == 8) {
                return;
            }
            var G = o.data(K, "events"),
                F, E;
            if (G) {
                if (H === g || (typeof H === "string" && H.charAt(0) == ".")) {
                    for (var I in G) {
                        this.remove(K, I + (H || ""));
                    }
                } else {
                    if (H.type) {
                        J = H.handler;
                        H = H.type;
                    }
                    o.each(H.split(/\s+/), function(M, O) {
                        var Q = O.split(".");
                        O = Q.shift();
                        var N = RegExp("(^|\\.)" + Q.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (G[O]) {
                            if (J) {
                                delete G[O][J.guid];
                            } else {
                                for (var P in G[O]) {
                                    if (N.test(G[O][P].type)) {
                                        delete G[O][P];
                                    }
                                }
                            }
                            if (o.event.specialAll[O]) {
                                o.event.specialAll[O].teardown.call(K, Q);
                            }
                            for (F in G[O]) {
                                break;
                            }
                            if (!F) {
                                if (!o.event.special[O] || o.event.special[O].teardown.call(K, Q) === false) {
                                    if (K.removeEventListener) {
                                        K.removeEventListener(O, o.data(K, "handle"), false);
                                    } else {
                                        if (K.detachEvent) {
                                            K.detachEvent("on" + O, o.data(K, "handle"));
                                        }
                                    }
                                }
                                F = null;
                                delete G[O];
                            }
                        }
                    });
                }
                for (F in G) {
                    break;
                }
                if (!F) {
                    var L = o.data(K, "handle");
                    if (L) {
                        L.elem = null;
                    }
                    o.removeData(K, "events");
                    o.removeData(K, "handle");
                }
            }
        },
        trigger: function(I, K, H, E) {
            var G = I.type || I;
            if (!E) {
                I = typeof I === "object" ? I[h] ? I : o.extend(o.Event(G), I) : o.Event(G);
                if (G.indexOf("!") >= 0) {
                    I.type = G = G.slice(0, -1);
                    I.exclusive = true;
                }
                if (!H) {
                    I.stopPropagation();
                    if (this.global[G]) {
                        o.each(o.cache, function() {
                            if (this.events && this.events[G]) {
                                o.event.trigger(I, K, this.handle.elem);
                            }
                        });
                    }
                }
                if (!H || H.nodeType == 3 || H.nodeType == 8) {
                    return g;
                }
                I.result = g;
                I.target = H;
                K = o.makeArray(K);
                K.unshift(I);
            }
            I.currentTarget = H;
            var J = o.data(H, "handle");
            if (J) {
                J.apply(H, K);
            }
            if ((!H[G] || (o.nodeName(H, "a") && G == "click")) && H["on" + G] && H["on" + G].apply(H, K) === false) {
                I.result = false;
            }
            if (!E && H[G] && !I.isDefaultPrevented() && !(o.nodeName(H, "a") && G == "click")) {
                this.triggered = true;
                try {
                    H[G]();
                } catch (L) {}
            }
            this.triggered = false;
            if (!I.isPropagationStopped()) {
                var F = H.parentNode || H.ownerDocument;
                if (F) {
                    o.event.trigger(I, K, F, true);
                }
            }
        },
        handle: function(K) {
            var J, E;
            K = arguments[0] = o.event.fix(K || l.event);
            K.currentTarget = this;
            var L = K.type.split(".");
            K.type = L.shift();
            J = !L.length && !K.exclusive;
            var I = RegExp("(^|\\.)" + L.slice().sort().join(".*\\.") + "(\\.|$)");
            E = (o.data(this, "events") || {})[K.type];
            for (var G in E) {
                var H = E[G];
                if (J || I.test(H.type)) {
                    K.handler = H;
                    K.data = H.data;
                    var F = H.apply(this, arguments);
                    if (F !== g) {
                        K.result = F;
                        if (F === false) {
                            K.preventDefault();
                            K.stopPropagation();
                        }
                    }
                    if (K.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(H) {
            if (H[h]) {
                return H;
            }
            var F = H;
            H = o.Event(F);
            for (var G = this.props.length, J; G;) {
                J = this.props[--G];
                H[J] = F[J];
            }
            if (!H.target) {
                H.target = H.srcElement || document;
            }
            if (H.target.nodeType == 3) {
                H.target = H.target.parentNode;
            }
            if (!H.relatedTarget && H.fromElement) {
                H.relatedTarget = H.fromElement == H.target ? H.toElement : H.fromElement;
            }
            if (H.pageX == null && H.clientX != null) {
                var I = document.documentElement,
                    E = document.body;
                H.pageX = H.clientX + (I && I.scrollLeft || E && E.scrollLeft || 0) - (I.clientLeft || 0);
                H.pageY = H.clientY + (I && I.scrollTop || E && E.scrollTop || 0) - (I.clientTop || 0);
            }
            if (!H.which && ((H.charCode || H.charCode === 0) ? H.charCode : H.keyCode)) {
                H.which = H.charCode || H.keyCode;
            }
            if (!H.metaKey && H.ctrlKey) {
                H.metaKey = H.ctrlKey;
            }
            if (!H.which && H.button) {
                H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3 : (H.button & 4 ? 2 : 0)));
            }
            return H;
        },
        proxy: function(F, E) {
            E = E || function() {
                return F.apply(this, arguments);
            };
            E.guid = F.guid = F.guid || E.guid || this.guid++;
            return E;
        },
        special: {
            ready: {
                setup: B,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(E, F) {
                    o.event.add(this, F[0], c);
                },
                teardown: function(G) {
                    if (G.length) {
                        var E = 0,
                            F = RegExp("(^|\\.)" + G[0] + "(\\.|$)");
                        o.each((o.data(this, "events").live || {}), function() {
                            if (F.test(this.type)) {
                                E++;
                            }
                        });
                        if (E < 1) {
                            o.event.remove(this, G[0], c);
                        }
                    }
                }
            }
        }
    };
    o.Event = function(E) {
        if (!this.preventDefault) {
            return new o.Event(E);
        }
        if (E && E.type) {
            this.originalEvent = E;
            this.type = E.type;
        } else {
            this.type = E;
        }
        this.timeStamp = e();
        this[h] = true;
    };

    function k() {
        return false;
    }

    function u() {
        return true;
    }
    o.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = u;
            var E = this.originalEvent;
            if (!E) {
                return;
            }
            if (E.preventDefault) {
                E.preventDefault();
            }
            E.returnValue = false;
        },
        stopPropagation: function() {
            this.isPropagationStopped = u;
            var E = this.originalEvent;
            if (!E) {
                return;
            }
            if (E.stopPropagation) {
                E.stopPropagation();
            }
            E.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u;
            this.stopPropagation();
        },
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k
    };
    var a = function(F) {
        var E = F.relatedTarget;
        while (E && E != this) {
            try {
                E = E.parentNode;
            } catch (G) {
                E = this;
            }
        }
        if (E != this) {
            F.type = F.data;
            o.event.handle.apply(this, arguments);
        }
    };
    o.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    }, function(F, E) {
        o.event.special[E] = {
            setup: function() {
                o.event.add(this, F, a, E);
            },
            teardown: function() {
                o.event.remove(this, F, a);
            }
        };
    });
    o.fn.extend({
        bind: function(F, G, E) {
            return F == "unload" ? this.one(F, G, E) : this.each(function() {
                o.event.add(this, F, E || G, E && G);
            });
        },
        one: function(G, H, F) {
            var E = o.event.proxy(F || H, function(I) {
                o(this).unbind(I, E);
                return (F || H).apply(this, arguments);
            });
            return this.each(function() {
                o.event.add(this, G, E, F && H);
            });
        },
        unbind: function(F, E) {
            return this.each(function() {
                o.event.remove(this, F, E);
            });
        },
        trigger: function(E, F) {
            return this.each(function() {
                o.event.trigger(E, F, this);
            });
        },
        triggerHandler: function(E, G) {
            if (this[0]) {
                var F = o.Event(E);
                F.preventDefault();
                F.stopPropagation();
                o.event.trigger(F, G, this[0]);
                return F.result;
            }
        },
        toggle: function(G) {
            var E = arguments,
                F = 1;
            while (F < E.length) {
                o.event.proxy(G, E[F++]);
            }
            return this.click(o.event.proxy(G, function(H) {
                this.lastToggle = (this.lastToggle || 0) % F;
                H.preventDefault();
                return E[this.lastToggle++].apply(this, arguments) || false;
            }));
        },
        hover: function(E, F) {
            return this.mouseenter(E).mouseleave(F);
        },
        ready: function(E) {
            B();
            if (o.isReady) {
                E.call(document, o);
            } else {
                o.readyList.push(E);
            }
            return this;
        },
        live: function(G, F) {
            var E = o.event.proxy(F);
            E.guid += this.selector + G;
            o(document).bind(i(G, this.selector), this.selector, E);
            return this;
        },
        die: function(F, E) {
            o(document).unbind(i(F, this.selector), E ? {
                guid: E.guid + this.selector + F
            } : null);
            return this;
        }
    });

    function c(H) {
        var E = RegExp("(^|\\.)" + H.type + "(\\.|$)"),
            G = true,
            F = [];
        o.each(o.data(this, "events").live || [], function(I, J) {
            if (E.test(J.type)) {
                var K = o(H.target).closest(J.data)[0];
                if (K) {
                    F.push({
                        elem: K,
                        fn: J
                    });
                }
            }
        });
        F.sort(function(J, I) {
            return o.data(J.elem, "closest") - o.data(I.elem, "closest");
        });
        o.each(F, function() {
            if (this.fn.call(this.elem, H, this.fn.data) === false) {
                return (G = false);
            }
        });
        return G;
    }

    function i(F, E) {
        return ["live", F, E.replace(/\./g, "`").replace(/ /g, "|")].join(".");
    }
    o.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!o.isReady) {
                o.isReady = true;
                if (o.readyList) {
                    o.each(o.readyList, function() {
                        this.call(document, o);
                    });
                    o.readyList = null;
                }
                o(document).triggerHandler("ready");
            }
        }
    });
    var x = false;

    function B() {
        if (x) {
            return;
        }
        x = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                o.ready();
            }, false);
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        o.ready();
                    }
                });
                if (document.documentElement.doScroll && l == l.top) {
                    (function() {
                        if (o.isReady) {
                            return;
                        }
                        try {
                            document.documentElement.doScroll("left");
                        } catch (E) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        o.ready();
                    })();
                }
            }
        }
        o.event.add(l, "load", o.ready);
    }
    o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","), function(F, E) {
        o.fn[E] = function(G) {
            return G ? this.bind(E, G) : this.trigger(E);
        };
    });
    o(l).bind("unload", function() {
        for (var E in o.cache) {
            if (E != 1 && o.cache[E].handle) {
                o.event.remove(o.cache[E].handle.elem);
            }
        }
    });
    (function() {
        o.support = {};
        var F = document.documentElement,
            G = document.createElement("script"),
            K = document.createElement("div"),
            J = "script" + (new Date).getTime();
        K.style.display = "none";
        K.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var H = K.getElementsByTagName("*"),
            E = K.getElementsByTagName("a")[0];
        if (!H || !H.length || !E) {
            return;
        }
        o.support = {
            leadingWhitespace: K.firstChild.nodeType == 3,
            tbody: !K.getElementsByTagName("tbody").length,
            objectAll: !!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!K.getElementsByTagName("link").length,
            style: /red/.test(E.getAttribute("style")),
            hrefNormalized: E.getAttribute("href") === "/a",
            opacity: E.style.opacity === "0.5",
            cssFloat: !!E.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        G.type = "text/javascript";
        try {
            G.appendChild(document.createTextNode("window." + J + "=1;"));
        } catch (I) {}
        F.insertBefore(G, F.firstChild);
        if (l[J]) {
            o.support.scriptEval = true;
            delete l[J];
        }
        F.removeChild(G);
        if (K.attachEvent && K.fireEvent) {
            K.attachEvent("onclick", function() {
                o.support.noCloneEvent = false;
                K.detachEvent("onclick", arguments.callee);
            });
            K.cloneNode(true).fireEvent("onclick");
        }
        o(function() {
            var L = document.createElement("div");
            L.style.width = L.style.paddingLeft = "1px";
            document.body.appendChild(L);
            o.boxModel = o.support.boxModel = L.offsetWidth === 2;
            document.body.removeChild(L).style.display = "none";
        });
    })();
    var w = o.support.cssFloat ? "cssFloat" : "styleFloat";
    o.props = {
        "for": "htmlFor",
        "class": "className",
        "float": w,
        cssFloat: w,
        styleFloat: w,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    o.fn.extend({
        _load: o.fn.load,
        load: function(G, J, K) {
            if (typeof G !== "string") {
                return this._load(G);
            }
            var I = G.indexOf(" ");
            if (I >= 0) {
                var E = G.slice(I, G.length);
                G = G.slice(0, I);
            }
            var H = "GET";
            if (J) {
                if (o.isFunction(J)) {
                    K = J;
                    J = null;
                } else {
                    if (typeof J === "object") {
                        J = o.param(J);
                        H = "POST";
                    }
                }
            }
            var F = this;
            o.ajax({
                url: G,
                type: H,
                dataType: "html",
                data: J,
                complete: function(M, L) {
                    if (L == "success" || L == "notmodified") {
                        F.html(E ? o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(E) : M.responseText);
                    }
                    if (K) {
                        F.each(K, [M.responseText, L, M]);
                    }
                }
            });
            return this;
        },
        serialize: function() {
            return o.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? o.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type));
            }).map(function(E, F) {
                var G = o(this).val();
                return G == null ? null : o.isArray(G) ? o.map(G, function(I, H) {
                    return {
                        name: F.name,
                        value: I
                    };
                }) : {
                    name: F.name,
                    value: G
                };
            }).get();
        }
    });
    o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(E, F) {
        o.fn[F] = function(G) {
            return this.bind(F, G);
        };
    });
    var r = e();
    o.extend({
        get: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = null;
            }
            return o.ajax({
                type: "GET",
                url: E,
                data: G,
                success: H,
                dataType: F
            });
        },
        getScript: function(E, F) {
            return o.get(E, null, F, "script");
        },
        getJSON: function(E, F, G) {
            return o.get(E, F, G, "json");
        },
        post: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = {};
            }
            return o.ajax({
                type: "POST",
                url: E,
                data: G,
                success: H,
                dataType: F
            });
        },
        ajaxSetup: function(E) {
            o.extend(o.ajaxSettings, E);
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return l.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(M) {
            M = o.extend(true, M, o.extend(true, {}, o.ajaxSettings, M));
            var W, F = /=\?(&|$)/g,
                R, V, G = M.type.toUpperCase();
            if (M.data && M.processData && typeof M.data !== "string") {
                M.data = o.param(M.data);
            }
            if (M.dataType == "jsonp") {
                if (G == "GET") {
                    if (!M.url.match(F)) {
                        M.url += (M.url.match(/\?/) ? "&" : "?") + (M.jsonp || "callback") + "=?";
                    }
                } else {
                    if (!M.data || !M.data.match(F)) {
                        M.data = (M.data ? M.data + "&" : "") + (M.jsonp || "callback") + "=?";
                    }
                }
                M.dataType = "json";
            }
            if (M.dataType == "json" && (M.data && M.data.match(F) || M.url.match(F))) {
                W = "jsonp" + r++;
                if (M.data) {
                    M.data = (M.data + "").replace(F, "=" + W + "$1");
                }
                M.url = M.url.replace(F, "=" + W + "$1");
                M.dataType = "script";
                l[W] = function(X) {
                    V = X;
                    I();
                    L();
                    l[W] = g;
                    try {
                        delete l[W];
                    } catch (Y) {}
                    if (H) {
                        H.removeChild(T);
                    }
                };
            }
            if (M.dataType == "script" && M.cache == null) {
                M.cache = false;
            }
            if (M.cache === false && G == "GET") {
                var E = e();
                var U = M.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + E + "$2");
                M.url = U + ((U == M.url) ? (M.url.match(/\?/) ? "&" : "?") + "_=" + E : "");
            }
            if (M.data && G == "GET") {
                M.url += (M.url.match(/\?/) ? "&" : "?") + M.data;
                M.data = null;
            }
            if (M.global && !o.active++) {
                o.event.trigger("ajaxStart");
            }
            var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
            if (M.dataType == "script" && G == "GET" && Q && (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
                var H = document.getElementsByTagName("head")[0];
                var T = document.createElement("script");
                T.src = M.url;
                if (M.scriptCharset) {
                    T.charset = M.scriptCharset;
                }
                if (!W) {
                    var O = false;
                    T.onload = T.onreadystatechange = function() {
                        if (!O && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            O = true;
                            I();
                            L();
                            T.onload = T.onreadystatechange = null;
                            H.removeChild(T);
                        }
                    };
                }
                H.appendChild(T);
                return g;
            }
            var K = false;
            var J = M.xhr();
            if (M.username) {
                J.open(G, M.url, M.async, M.username, M.password);
            } else {
                J.open(G, M.url, M.async);
            }
            try {
                if (M.data) {
                    J.setRequestHeader("Content-Type", M.contentType);
                }
                if (M.ifModified) {
                    J.setRequestHeader("If-Modified-Since", o.lastModified[M.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
                }
                J.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                J.setRequestHeader("Accept", M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType] + ", */*" : M.accepts._default);
            } catch (S) {}
            if (M.beforeSend && M.beforeSend(J, M) === false) {
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop");
                }
                J.abort();
                return false;
            }
            if (M.global) {
                o.event.trigger("ajaxSend", [J, M]);
            }
            var N = function(X) {
                if (J.readyState == 0) {
                    if (P) {
                        clearInterval(P);
                        P = null;
                        if (M.global && !--o.active) {
                            o.event.trigger("ajaxStop");
                        }
                    }
                } else {
                    if (!K && J && (J.readyState == 4 || X == "timeout")) {
                        K = true;
                        if (P) {
                            clearInterval(P);
                            P = null;
                        }
                        R = X == "timeout" ? "timeout" : !o.httpSuccess(J) ? "error" : M.ifModified && o.httpNotModified(J, M.url) ? "notmodified" : "success";
                        if (R == "success") {
                            try {
                                V = o.httpData(J, M.dataType, M);
                            } catch (Z) {
                                R = "parsererror";
                            }
                        }
                        if (R == "success") {
                            var Y;
                            try {
                                Y = J.getResponseHeader("Last-Modified");
                            } catch (Z) {}
                            if (M.ifModified && Y) {
                                o.lastModified[M.url] = Y;
                            }
                            if (!W) {
                                I();
                            }
                        } else {
                            o.handleError(M, J, R);
                        }
                        L();
                        if (X) {
                            J.abort();
                        }
                        if (M.async) {
                            J = null;
                        }
                    }
                }
            };
            if (M.async) {
                var P = setInterval(N, 13);
                if (M.timeout > 0) {
                    setTimeout(function() {
                        if (J && !K) {
                            N("timeout");
                        }
                    }, M.timeout);
                }
            }
            try {
                J.send(M.data);
            } catch (S) {
                o.handleError(M, J, null, S);
            }
            if (!M.async) {
                N();
            }

            function I() {
                if (M.success) {
                    M.success(V, R);
                }
                if (M.global) {
                    o.event.trigger("ajaxSuccess", [J, M]);
                }
            }

            function L() {
                if (M.complete) {
                    M.complete(J, R);
                }
                if (M.global) {
                    o.event.trigger("ajaxComplete", [J, M]);
                }
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop");
                }
            }
            return J;
        },
        handleError: function(F, H, E, G) {
            if (F.error) {
                F.error(H, E, G);
            }
            if (F.global) {
                o.event.trigger("ajaxError", [H, F, G]);
            }
        },
        active: 0,
        httpSuccess: function(F) {
            try {
                return !F.status && location.protocol == "file:" || (F.status >= 200 && F.status < 300) || F.status == 304 || F.status == 1223;
            } catch (E) {}
            return false;
        },
        httpNotModified: function(G, E) {
            try {
                var H = G.getResponseHeader("Last-Modified");
                return G.status == 304 || H == o.lastModified[E];
            } catch (F) {}
            return false;
        },
        httpData: function(J, H, G) {
            var F = J.getResponseHeader("content-type"),
                E = H == "xml" || !H && F && F.indexOf("xml") >= 0,
                I = E ? J.responseXML : J.responseText;
            if (E && I.documentElement.tagName == "parsererror") {
                throw "parsererror";
            }
            if (G && G.dataFilter) {
                I = G.dataFilter(I, H);
            }
            if (typeof I === "string") {
                if (H == "script") {
                    o.globalEval(I);
                }
                if (H == "json") {
                    I = l["eval"]("(" + I + ")");
                }
            }
            return I;
        },
        param: function(E) {
            var G = [];

            function H(I, J) {
                G[G.length] = encodeURIComponent(I) + "=" + encodeURIComponent(J);
            }
            if (o.isArray(E) || E.jquery) {
                o.each(E, function() {
                    H(this.name, this.value);
                });
            } else {
                for (var F in E) {
                    if (o.isArray(E[F])) {
                        o.each(E[F], function() {
                            H(F, this);
                        });
                    } else {
                        H(F, o.isFunction(E[F]) ? E[F]() : E[F]);
                    }
                }
            }
            return G.join("&").replace(/%20/g, "+");
        }
    });
    var m = {},
        n, d = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];

    function t(F, E) {
        var G = {};
        o.each(d.concat.apply([], d.slice(0, E)), function() {
            G[this] = F;
        });
        return G;
    }
    o.fn.extend({
        show: function(J, L) {
            if (J) {
                return this.animate(t("show", 3), J, L);
            } else {
                for (var H = 0, F = this.length; H < F; H++) {
                    var E = o.data(this[H], "olddisplay");
                    this[H].style.display = E || "";
                    if (o.css(this[H], "display") === "none") {
                        var G = this[H].tagName,
                            K;
                        if (m[G]) {
                            K = m[G];
                        } else {
                            var I = o("<" + G + " />").appendTo("body");
                            K = I.css("display");
                            if (K === "none") {
                                K = "block";
                            }
                            I.remove();
                            m[G] = K;
                        }
                        o.data(this[H], "olddisplay", K);
                    }
                }
                for (var H = 0, F = this.length; H < F; H++) {
                    this[H].style.display = o.data(this[H], "olddisplay") || "";
                }
                return this;
            }
        },
        hide: function(H, I) {
            if (H) {
                return this.animate(t("hide", 3), H, I);
            } else {
                for (var G = 0, F = this.length; G < F; G++) {
                    var E = o.data(this[G], "olddisplay");
                    if (!E && E !== "none") {
                        o.data(this[G], "olddisplay", o.css(this[G], "display"));
                    }
                }
                for (var G = 0, F = this.length; G < F; G++) {
                    this[G].style.display = "none";
                }
                return this;
            }
        },
        _toggle: o.fn.toggle,
        toggle: function(G, F) {
            var E = typeof G === "boolean";
            return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(this, arguments) : G == null || E ? this.each(function() {
                var H = E ? G : o(this).is(":hidden");
                o(this)[H ? "show" : "hide"]();
            }) : this.animate(t("toggle", 3), G, F);
        },
        fadeTo: function(E, G, F) {
            return this.animate({
                opacity: G
            }, E, F);
        },
        animate: function(I, F, H, G) {
            var E = o.speed(F, H, G);
            return this[E.queue === false ? "each" : "queue"](function() {
                var K = o.extend({}, E),
                    M, L = this.nodeType == 1 && o(this).is(":hidden"),
                    J = this;
                for (M in I) {
                    if (I[M] == "hide" && L || I[M] == "show" && !L) {
                        return K.complete.call(this);
                    }
                    if ((M == "height" || M == "width") && this.style) {
                        K.display = o.css(this, "display");
                        K.overflow = this.style.overflow;
                    }
                }
                if (K.overflow != null) {
                    this.style.overflow = "hidden";
                }
                K.curAnim = o.extend({}, I);
                o.each(I, function(O, S) {
                    var R = new o.fx(J, K, O);
                    if (/toggle|show|hide/.test(S)) {
                        R[S == "toggle" ? L ? "show" : "hide" : S](I);
                    } else {
                        var Q = S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                            T = R.cur(true) || 0;
                        if (Q) {
                            var N = parseFloat(Q[2]),
                                P = Q[3] || "px";
                            if (P != "px") {
                                J.style[O] = (N || 1) + P;
                                T = ((N || 1) / R.cur(true)) * T;
                                J.style[O] = T + P;
                            }
                            if (Q[1]) {
                                N = ((Q[1] == "-=" ? -1 : 1) * N) + T;
                            }
                            R.custom(T, N, P);
                        } else {
                            R.custom(T, S, "");
                        }
                    }
                });
                return true;
            });
        },
        stop: function(F, E) {
            var G = o.timers;
            if (F) {
                this.queue([]);
            }
            this.each(function() {
                for (var H = G.length - 1; H >= 0; H--) {
                    if (G[H].elem == this) {
                        if (E) {
                            G[H](true);
                        }
                        G.splice(H, 1);
                    }
                }
            });
            if (!E) {
                this.dequeue();
            }
            return this;
        }
    });
    o.each({
        slideDown: t("show", 1),
        slideUp: t("hide", 1),
        slideToggle: t("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(E, F) {
        o.fn[E] = function(G, H) {
            return this.animate(F, G, H);
        };
    });
    o.extend({
        speed: function(G, H, F) {
            var E = typeof G === "object" ? G : {
                complete: F || !F && H || o.isFunction(G) && G,
                duration: G,
                easing: F && H || H && !o.isFunction(H) && H
            };
            E.duration = o.fx.off ? 0 : typeof E.duration === "number" ? E.duration : o.fx.speeds[E.duration] || o.fx.speeds._default;
            E.old = E.complete;
            E.complete = function() {
                if (E.queue !== false) {
                    o(this).dequeue();
                }
                if (o.isFunction(E.old)) {
                    E.old.call(this);
                }
            };
            return E;
        },
        easing: {
            linear: function(G, H, E, F) {
                return E + F * G;
            },
            swing: function(G, H, E, F) {
                return ((-Math.cos(G * Math.PI) / 2) + 0.5) * F + E;
            }
        },
        timers: [],
        fx: function(F, E, G) {
            this.options = E;
            this.elem = F;
            this.prop = G;
            if (!E.orig) {
                E.orig = {};
            }
        }
    });
    o.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }(o.fx.step[this.prop] || o.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block";
            }
        },
        cur: function(F) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var E = parseFloat(o.css(this.elem, this.prop, F));
            return E && E > -10000 ? E : parseFloat(o.curCSS(this.elem, this.prop)) || 0;
        },
        custom: function(I, H, G) {
            this.startTime = e();
            this.start = I;
            this.end = H;
            this.unit = G || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var E = this;

            function F(J) {
                return E.step(J);
            }
            F.elem = this.elem;
            if (F() && o.timers.push(F) && !n) {
                n = setInterval(function() {
                    var K = o.timers;
                    for (var J = 0; J < K.length; J++) {
                        if (!K[J]()) {
                            K.splice(J--, 1);
                        }
                    }
                    if (!K.length) {
                        clearInterval(n);
                        n = g;
                    }
                }, 13);
            }
        },
        show: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            o(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        },
        step: function(H) {
            var G = e();
            if (H || G >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var E = true;
                for (var F in this.options.curAnim) {
                    if (this.options.curAnim[F] !== true) {
                        E = false;
                    }
                }
                if (E) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (o.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block";
                        }
                    }
                    if (this.options.hide) {
                        o(this.elem).hide();
                    }
                    if (this.options.hide || this.options.show) {
                        for (var I in this.options.curAnim) {
                            o.attr(this.elem.style, I, this.options.orig[I]);
                        }
                    }
                    this.options.complete.call(this.elem);
                }
                return false;
            } else {
                var J = G - this.startTime;
                this.state = J / this.options.duration;
                this.pos = o.easing[this.options.easing || (o.easing.swing ? "swing" : "linear")](this.state, J, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update();
            }
            return true;
        }
    };
    o.extend(o.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(E) {
                o.attr(E.elem.style, "opacity", E.now);
            },
            _default: function(E) {
                if (E.elem.style && E.elem.style[E.prop] != null) {
                    E.elem.style[E.prop] = E.now + E.unit;
                } else {
                    E.elem[E.prop] = E.now;
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                };
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0]);
            }
            var G = this[0].getBoundingClientRect(),
                J = this[0].ownerDocument,
                F = J.body,
                E = J.documentElement,
                L = E.clientTop || F.clientTop || 0,
                K = E.clientLeft || F.clientLeft || 0,
                I = G.top + (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop) - L,
                H = G.left + (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft) - K;
            return {
                top: I,
                left: H
            };
        };
    } else {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                };
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0]);
            }
            o.offset.initialized || o.offset.initialize();
            var J = this[0],
                G = J.offsetParent,
                F = J,
                O = J.ownerDocument,
                M, H = O.documentElement,
                K = O.body,
                L = O.defaultView,
                E = L.getComputedStyle(J, null),
                N = J.offsetTop,
                I = J.offsetLeft;
            while ((J = J.parentNode) && J !== K && J !== H) {
                M = L.getComputedStyle(J, null);
                N -= J.scrollTop, I -= J.scrollLeft;
                if (J === G) {
                    N += J.offsetTop, I += J.offsetLeft;
                    if (o.offset.doesNotAddBorder && !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(J.tagName))) {
                        N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0;
                    }
                    F = G, G = J.offsetParent;
                }
                if (o.offset.subtractsBorderForOverflowNotVisible && M.overflow !== "visible") {
                    N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0;
                }
                E = M;
            }
            if (E.position === "relative" || E.position === "static") {
                N += K.offsetTop, I += K.offsetLeft;
            }
            if (E.position === "fixed") {
                N += Math.max(H.scrollTop, K.scrollTop), I += Math.max(H.scrollLeft, K.scrollLeft);
            }
            return {
                top: N,
                left: I
            };
        };
    }
    o.offset = {
        initialize: function() {
            if (this.initialized) {
                return;
            }
            var L = document.body,
                F = document.createElement("div"),
                H, G, N, I, M, E, J = L.style.marginTop,
                K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            M = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (E in M) {
                F.style[E] = M[E];
            }
            F.innerHTML = K;
            L.insertBefore(F, L.firstChild);
            H = F.firstChild, G = H.firstChild, I = H.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (G.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
            H.style.overflow = "hidden", H.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (G.offsetTop === -5);
            L.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
            L.style.marginTop = J;
            L.removeChild(F);
            this.initialized = true;
        },
        bodyOffset: function(E) {
            o.offset.initialized || o.offset.initialize();
            var G = E.offsetTop,
                F = E.offsetLeft;
            if (o.offset.doesNotIncludeMarginInBodyOffset) {
                G += parseInt(o.curCSS(E, "marginTop", true), 10) || 0, F += parseInt(o.curCSS(E, "marginLeft", true), 10) || 0;
            }
            return {
                top: G,
                left: F
            };
        }
    };
    o.fn.extend({
        position: function() {
            var I = 0,
                H = 0,
                F;
            if (this[0]) {
                var G = this.offsetParent(),
                    J = this.offset(),
                    E = /^body|html$/i.test(G[0].tagName) ? {
                        top: 0,
                        left: 0
                    } : G.offset();
                J.top -= j(this, "marginTop");
                J.left -= j(this, "marginLeft");
                E.top += j(G, "borderTopWidth");
                E.left += j(G, "borderLeftWidth");
                F = {
                    top: J.top - E.top,
                    left: J.left - E.left
                };
            }
            return F;
        },
        offsetParent: function() {
            var E = this[0].offsetParent || document.body;
            while (E && (!/^body|html$/i.test(E.tagName) && o.css(E, "position") == "static")) {
                E = E.offsetParent;
            }
            return o(E);
        }
    });
    o.each(["Left", "Top"], function(F, E) {
        var G = "scroll" + E;
        o.fn[G] = function(H) {
            if (!this[0]) {
                return null;
            }
            return H !== g ? this.each(function() {
                this == l || this == document ? l.scrollTo(!F ? H : o(l).scrollLeft(), F ? H : o(l).scrollTop()) : this[G] = H;
            }) : this[0] == l || this[0] == document ? self[F ? "pageYOffset" : "pageXOffset"] || o.boxModel && document.documentElement[G] || document.body[G] : this[0][G];
        };
    });
    o.each(["Height", "Width"], function(I, G) {
        var E = I ? "Left" : "Top",
            H = I ? "Right" : "Bottom",
            F = G.toLowerCase();
        o.fn["inner" + G] = function() {
            return this[0] ? o.css(this[0], F, false, "padding") : null;
        };
        o.fn["outer" + G] = function(K) {
            return this[0] ? o.css(this[0], F, false, K ? "margin" : "border") : null;
        };
        var J = G.toLowerCase();
        o.fn[J] = function(K) {
            return this[0] == l ? document.compatMode == "CSS1Compat" && document.documentElement["client" + G] || document.body["client" + G] : this[0] == document ? Math.max(document.documentElement["client" + G], document.body["scroll" + G], document.documentElement["scroll" + G], document.body["offset" + G], document.documentElement["offset" + G]) : K === g ? (this.length ? o.css(this[0], J) : null) : this.css(J, typeof K === "string" ? K : K + "px");
        };
    });
})();
jQuery.ui || (function(c) {
    var i = c.fn.remove,
        d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {
        version: "1.7.1",
        plugin: {
            add: function(k, l, n) {
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]]);
                }
            },
            call: function(j, l, k) {
                var n = j.plugins[l];
                if (!n || !j.element[0].parentNode) {
                    return;
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k);
                    }
                }
            }
        },
        contains: function(k, j) {
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j);
        },
        hasScroll: function(m, k) {
            if (c(m).css("overflow") == "hidden") {
                return false;
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop",
                l = false;
            if (m[j] > 0) {
                return true;
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l;
        },
        isOverAxis: function(k, j, l) {
            return (k > j) && (k < (j + l));
        },
        isOver: function(o, k, n, m, j, l) {
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l);
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (d) {
        var f = c.attr,
            e = c.fn.removeAttr,
            h = "http://www.w3.org/2005/07/aaa",
            a = /^aria-/,
            b = /^wairole:/;
        c.attr = function(k, j, l) {
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)));
        };
        c.fn.removeAttr = function(j) {
            return (a.test(j) ? this.each(function() {
                this.removeAttributeNS(h, j.replace(a, ""));
            }) : e.call(this, j));
        };
    }
    c.fn.extend({
        remove: function() {
            c("*", this).add(this).each(function() {
                c(this).triggerHandler("remove");
            });
            return i.apply(this, arguments);
        },
        enableSelection: function() {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui");
        },
        disableSelection: function() {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
                return false;
            });
        },
        scrollParent: function() {
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1));
                }).eq(0);
            } else {
                j = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j;
        }
    });
    c.extend(c.expr[":"], {
        data: function(l, k, j) {
            return !!c.data(l, j[3]);
        },
        focusable: function(k) {
            var l = k.nodeName.toLowerCase(),
                j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length;
        },
        tabbable: function(k) {
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable");
        }
    });

    function g(m, n, o, l) {
        function k(q) {
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p);
        }
        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"));
        }
        return (c.inArray(o, j) != -1);
    }
    c.widget = function(k, j) {
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function(p) {
            var n = (typeof p == "string"),
                o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this;
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined);
            }
            return this.each(function() {
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o));
            });
        };
        c[l] = c[l] || {};
        c[l][k] = function(o, n) {
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function(q, p, r) {
                if (q.target == o) {
                    return m._setData(p, r);
                }
            }).bind("getData." + k, function(q, p) {
                if (q.target == o) {
                    return m._getData(p);
                }
            }).bind("remove", function() {
                return m.destroy();
            });
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option";
    };
    c.widget.prototype = {
        _init: function() {},
        destroy: function() {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled");
        },
        option: function(l, m) {
            var k = l,
                j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l);
                }
                k = {};
                k[l] = m;
            }
            c.each(k, function(n, o) {
                j._setData(n, o);
            });
        },
        _getData: function(j) {
            return this.options[j];
        },
        _setData: function(j, k) {
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k);
            }
        },
        enable: function() {
            this._setData("disabled", false);
        },
        disable: function() {
            this._setData("disabled", true);
        },
        _trigger: function(l, m, n) {
            var p = this.options[l],
                j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k;) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o];
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented());
        }
    };
    c.widget.defaults = {
        disabled: false
    };
    c.ui.mouse = {
        _mouseInit: function() {
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function(k) {
                return j._mouseDown(k);
            }).bind("click." + this.widgetName, function(k) {
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    k.stopImmediatePropagation();
                    return false;
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on");
            }
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable));
        },
        _mouseDown: function(l) {
            l.originalEvent = l.originalEvent || {};
            if (l.originalEvent.mouseHandled) {
                return;
            }(this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this,
                m = (l.which == 1),
                j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    k.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true;
                }
            }
            this._mouseMoveDelegate = function(n) {
                return k._mouseMove(n);
            };
            this._mouseUpDelegate = function(n) {
                return k._mouseUp(n);
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true;
        },
        _mouseMove: function(j) {
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j);
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault();
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(j) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (j.target == this._mouseDownEvent.target);
                this._mouseStop(j);
            }
            return false;
        },
        _mouseDistanceMet: function(j) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function(j) {
            return this.mouseDelayMet;
        },
        _mouseStart: function(j) {},
        _mouseDrag: function(j) {},
        _mouseStop: function(j) {},
        _mouseCapture: function(j) {
            return true;
        }
    };
    c.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    };
})(jQuery);
(function(a) {
    a.widget("ui.accordion", {
        _init: function() {
            var d = this.options,
                b = this;
            this.running = 0;
            if (d.collapsible == a.ui.accordion.defaults.collapsible && d.alwaysOpen != a.ui.accordion.defaults.alwaysOpen) {
                d.collapsible = !d.alwaysOpen;
            }
            if (d.navigation) {
                var c = this.element.find("a").filter(d.navigationFilter);
                if (c.length) {
                    if (c.filter(d.header).length) {
                        this.active = c;
                    } else {
                        this.active = c.parent().parent().prev();
                        c.addClass("ui-accordion-content-active");
                    }
                }
            }
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            if (this.element[0].nodeName == "UL") {
                this.element.children("li").addClass("ui-accordion-li-fix");
            }
            this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                a(this).addClass("ui-state-hover");
            }).bind("mouseleave.accordion", function() {
                a(this).removeClass("ui-state-hover");
            }).bind("focus.accordion", function() {
                a(this).addClass("ui-state-focus");
            }).bind("blur.accordion", function() {
                a(this).removeClass("ui-state-focus");
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            a("<span/>").addClass("ui-icon " + d.icons.header).prependTo(this.headers);
            this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
            if (a.browser.msie) {
                this.element.find("a").css("zoom", "1");
            }
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function(e) {
                return b._keydown(e);
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0");
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0");
            }
            if (!a.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1");
            }
            if (d.event) {
                this.headers.bind((d.event) + ".accordion", function(e) {
                    return b._clickHandler.call(b, e, this);
                });
            }
        },
        destroy: function() {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
            this.headers.find("a").removeAttr("tabindex");
            this.headers.children(".ui-icon").remove();
            var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
            if (c.autoHeight || c.fillHeight) {
                b.css("height", "");
            }
        },
        _setData: function(b, c) {
            if (b == "alwaysOpen") {
                b = "collapsible";
                c = !c;
            }
            a.widget.prototype._setData.apply(this, arguments);
        },
        _keydown: function(e) {
            var g = this.options,
                f = a.ui.keyCode;
            if (g.disabled || e.altKey || e.ctrlKey) {
                return;
            }
            var d = this.headers.length;
            var b = this.headers.index(e.target);
            var c = false;
            switch (e.keyCode) {
                case f.RIGHT:
                case f.DOWN:
                    c = this.headers[(b + 1) % d];
                    break;
                case f.LEFT:
                case f.UP:
                    c = this.headers[(b - 1 + d) % d];
                    break;
                case f.SPACE:
                case f.ENTER:
                    return this._clickHandler({
                        target: e.target
                    }, e.target);
            }
            if (c) {
                a(e.target).attr("tabIndex", "-1");
                a(c).attr("tabIndex", "0");
                c.focus();
                return false;
            }
            return true;
        },
        resize: function() {
            var e = this.options,
                d;
            if (e.fillSpace) {
                if (a.browser.msie) {
                    var b = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden");
                }
                d = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", b);
                }
                this.headers.each(function() {
                    d -= a(this).outerHeight();
                });
                var c = 0;
                this.headers.next().each(function() {
                    c = Math.max(c, a(this).innerHeight() - a(this).height());
                }).height(Math.max(0, d - c)).css("overflow", "auto");
            } else {
                if (e.autoHeight) {
                    d = 0;
                    this.headers.next().each(function() {
                        d = Math.max(d, a(this).outerHeight());
                    }).height(d);
                }
            }
        },
        activate: function(b) {
            var c = this._findActive(b)[0];
            this._clickHandler({
                target: c
            }, c);
        },
        _findActive: function(b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)");
        },
        _clickHandler: function(b, f) {
            var d = this.options;
            if (d.disabled) {
                return false;
            }
            if (!b.target && d.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next(),
                    e = {
                        options: d,
                        newHeader: a([]),
                        oldHeader: d.active,
                        newContent: a([]),
                        oldContent: h
                    },
                    c = (this.active = a([]));
                this._toggle(c, h, e);
                return false;
            }
            var g = a(b.currentTarget || f);
            var i = g[0] == this.active[0];
            if (this.running || (!d.collapsible && i)) {
                return false;
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
            this.active.next().addClass("ui-accordion-content-active");
            if (!i) {
                g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
                g.next().addClass("ui-accordion-content-active");
            }
            var c = g.next(),
                h = this.active.next(),
                e = {
                    options: d,
                    newHeader: i && d.collapsible ? a([]) : g,
                    oldHeader: this.active,
                    newContent: i && d.collapsible ? a([]) : c.find("> *"),
                    oldContent: h.find("> *")
                },
                j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
            this.active = i ? a([]) : g;
            this._toggle(c, h, e, i, j);
            return false;
        },
        _toggle: function(b, i, g, j, k) {
            var d = this.options,
                m = this;
            this.toShow = b;
            this.toHide = i;
            this.data = g;
            var c = function() {
                if (!m) {
                    return;
                }
                return m._completed.apply(m, arguments);
            };
            this._trigger("changestart", null, this.data);
            this.running = i.size() === 0 ? b.size() : i.size();
            if (d.animated) {
                var f = {};
                if (d.collapsible && j) {
                    f = {
                        toShow: a([]),
                        toHide: i,
                        complete: c,
                        down: k,
                        autoHeight: d.autoHeight || d.fillSpace
                    };
                } else {
                    f = {
                        toShow: b,
                        toHide: i,
                        complete: c,
                        down: k,
                        autoHeight: d.autoHeight || d.fillSpace
                    };
                }
                if (!d.proxied) {
                    d.proxied = d.animated;
                }
                if (!d.proxiedDuration) {
                    d.proxiedDuration = d.duration;
                }
                d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
                d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
                var l = a.ui.accordion.animations,
                    e = d.duration,
                    h = d.animated;
                if (!l[h]) {
                    l[h] = function(n) {
                        this.slide(n, {
                            easing: h,
                            duration: e || 700
                        });
                    };
                }
                l[h](f);
            } else {
                if (d.collapsible && j) {
                    b.toggle();
                } else {
                    i.hide();
                    b.show();
                }
                c(true);
            }
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
            b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus();
        },
        _completed: function(b) {
            var c = this.options;
            this.running = b ? 0 : --this.running;
            if (this.running) {
                return;
            }
            if (c.clearStyle) {
                this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
            }
            this._trigger("change", null, this.data);
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.7.1",
        defaults: {
            active: null,
            alwaysOpen: true,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function() {
                return this.href.toLowerCase() == location.href.toLowerCase();
            }
        },
        animations: {
            slide: function(j, h) {
                j = a.extend({
                    easing: "swing",
                    duration: 300
                }, j, h);
                if (!j.toHide.size()) {
                    j.toShow.animate({
                        height: "show"
                    }, j);
                    return;
                }
                if (!j.toShow.size()) {
                    j.toHide.animate({
                        height: "hide"
                    }, j);
                    return;
                }
                var c = j.toShow.css("overflow"),
                    g, d = {},
                    f = {},
                    e = ["height", "paddingTop", "paddingBottom"],
                    b;
                var i = j.toShow;
                b = i[0].style.width;
                i.width(parseInt(i.parent().width(), 10) - parseInt(i.css("paddingLeft"), 10) - parseInt(i.css("paddingRight"), 10) - (parseInt(i.css("borderLeftWidth"), 10) || 0) - (parseInt(i.css("borderRightWidth"), 10) || 0));
                a.each(e, function(k, m) {
                    f[m] = "hide";
                    var l = ("" + a.css(j.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
                    d[m] = {
                        value: l[1],
                        unit: l[2] || "px"
                    };
                });
                j.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show();
                j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f, {
                    step: function(k, l) {
                        if (l.prop == "height") {
                            g = (l.now - l.start) / (l.end - l.start);
                        }
                        j.toShow[0].style[l.prop] = (g * d[l.prop].value) + d[l.prop].unit;
                    },
                    duration: j.duration,
                    easing: j.easing,
                    complete: function() {
                        if (!j.autoHeight) {
                            j.toShow.css("height", "");
                        }
                        j.toShow.css("width", b);
                        j.toShow.css({
                            overflow: c
                        });
                        j.complete();
                    }
                });
            },
            bounceslide: function(b) {
                this.slide(b, {
                    easing: b.down ? "easeOutBounce" : "swing",
                    duration: b.down ? 1000 : 200
                });
            },
            easeslide: function(b) {
                this.slide(b, {
                    easing: "easeinout",
                    duration: 700
                });
            }
        }
    });
})(jQuery);
(function($) {
    $.extend($.ui, {
        datepicker: {
            version: "1.7.1"
        }
    });
    var PROP_NAME = "datepicker";

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "show",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            showMonthAfterYear: false,
            yearRange: "-10:+10",
            showOtherMonths: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "normal",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function() {
            if (this.debug) {
                console.log.apply("", arguments);
            }
        },
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                target.id = "dp" + (++this.uuid);
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst);
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst);
                }
            }
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([:\[\]\.])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            };
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return;
            }
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (appendText) {
                input[isRTL ? "before" : "after"]('<span class="' + this._appendClass + '">' + appendText + "</span>");
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker);
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
                        $.datepicker._hideDatepicker();
                    } else {
                        $.datepicker._showDatepicker(target);
                    }
                    return false;
                });
            }
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key);
            });
            $.data(target, PROP_NAME, inst);
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return;
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key);
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst));
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
        },
        _dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                var id = "dp" + (++this.uuid);
                this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            this._dialogInput.val(dateText);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }
            this._dialogInput.css("left", this._pos[0] + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv);
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },
        _destroyDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.trigger.remove();
                $target.siblings("." + this._appendClass).remove().end().removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress);
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty();
                }
            }
        },
        _enableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function() {
                    this.disabled = false;
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled");
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value);
            });
        },
        _disableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function() {
                    this.disabled = true;
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                });
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled");
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value);
            });
            this._disabledInputs[this._disabledInputs.length] = target;
        },
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true;
                }
            }
            return false;
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME);
            } catch (err) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value;
            }
            var inst = this._getInst(target);
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker(null);
                }
                extendRemove(inst.settings, settings);
                var date = new Date();
                extendRemove(inst, {
                    rangeStart: null,
                    endDay: null,
                    endMonth: null,
                    endYear: null,
                    selectedDay: date.getDate(),
                    selectedMonth: date.getMonth(),
                    selectedYear: date.getFullYear(),
                    currentDay: date.getDate(),
                    currentMonth: date.getMonth(),
                    currentYear: date.getFullYear(),
                    drawMonth: date.getMonth(),
                    drawYear: date.getFullYear()
                });
                this._updateDatepicker(inst);
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value);
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst);
            }
        },
        _setDateDatepicker: function(target, date, endDate) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date, endDate);
                this._updateDatepicker(inst);
                this._updateAlternate(inst);
            }
        },
        _getDateDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst);
            }
            return (inst ? this._getDate(inst) : null);
        },
        _doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(null, "");
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass, inst.dpDiv);
                        sel = sel.length > 0 ? sel : $("td." + $.datepicker._currentClass, inst.dpDiv);
                        if (sel[0]) {
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        } else {
                            $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
                        }
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._clearDate(event.target);
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._gotoToday(event.target);
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        }
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, -7, "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        }
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, +7, "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false;
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this);
                } else {
                    handled = false;
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        _doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
            }
        },
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0];
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return;
            }
            var inst = $.datepicker._getInst(input);
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            $.datepicker._hideDatepicker(null, "");
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = "";
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight;
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed;
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop;
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.rangeStart = null;
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim") || "show";
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function() {
                    $.datepicker._datepickerShowing = true;
                    if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
                        $("iframe.ui-datepicker-cover").css({
                            width: inst.dpDiv.width() + 4,
                            height: inst.dpDiv.height() + 4
                        });
                    }
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
                } else {
                    inst.dpDiv[showAnim](duration, postProcess);
                }
                if (duration == "") {
                    postProcess();
                }
                if (inst.input[0].type != "hidden") {
                    inst.input[0].focus();
                }
                $.datepicker._curInst = inst;
            }
        },
        _updateDatepicker: function(inst) {
            var dims = {
                width: inst.dpDiv.width() + 4,
                height: inst.dpDiv.height() + 4
            };
            var self = this;
            inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
                width: dims.width,
                height: dims.height
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function() {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover");
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover");
                }
            }).bind("mouseover", function() {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover");
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover");
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst.input && inst.input[0].type != "hidden" && inst == $.datepicker._curInst) {
                $(inst.input[0]).focus();
            }
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
            var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
            offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
            return offset;
        },
        _findPos: function(obj) {
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj.nextSibling;
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },
        _hideDatepicker: function(input, duration) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return;
            }
            if (inst.stayOpen) {
                this._selectDate("#" + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            }
            inst.stayOpen = false;
            if (this._datepickerShowing) {
                duration = (duration != null ? duration : this._get(inst, "duration"));
                var showAnim = this._get(inst, "showAnim");
                var postProcess = function() {
                    $.datepicker._tidyDialog(inst);
                };
                if (duration != "" && $.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
                } else {
                    inst.dpDiv[(duration == "" ? "hide" : (showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide")))](duration, postProcess);
                }
                if (duration == "") {
                    this._tidyDialog(inst);
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
            this._curInst = null;
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(event) {
            if (!$.datepicker._curInst) {
                return;
            }
            var $target = $(event.target);
            if (($target.parents("#" + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker(null, "");
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst);
        },
        _gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        _clickMonthYear: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
                inst.input[0].focus();
            }
            inst._selectingMonthYear = !inst._selectingMonthYear;
        },
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return;
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            if (inst.stayOpen) {
                inst.endDay = inst.endMonth = inst.endYear = null;
            }
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            if (inst.stayOpen) {
                inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                this._updateDatepicker(inst);
            }
        },
        _clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst.stayOpen = false;
            inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
            this._selectDate(target, "");
        },
        _selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr);
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
            } else {
                if (inst.input) {
                    inst.input.trigger("change");
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst);
            } else {
                if (!inst.stayOpen) {
                    this._hideDatepicker(null, this._get(inst, "duration"));
                    this._lastInput = inst.input[0];
                    if (typeof(inst.input[0]) != "object") {
                        inst.input[0].focus();
                    }
                    this._lastInput = null;
                }
            }
        },
        _updateAlternate: function(inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr);
                });
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""];
        },
        iso8601Week: function(date) {
            var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
            var firstDay = firstMon.getDay() || 7;
            firstMon.setDate(firstMon.getDate() + 1 - firstDay);
            if (firstDay < 4 && checkDate < firstMon) {
                checkDate.setDate(checkDate.getDate() - 3);
                return $.datepicker.iso8601Week(checkDate);
            } else {
                if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
                    firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
                    if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
                        return 1;
                    }
                }
            }
            return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1;
        },
        parseDate: function(format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments";
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null;
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            };
            var getNumber = function(match) {
                lookAhead(match);
                var origSize = (match == "@" ? 14 : (match == "y" ? 4 : (match == "o" ? 3 : 2)));
                var size = origSize;
                var num = 0;
                while (size > 0 && iValue < value.length && value.charAt(iValue) >= "0" && value.charAt(iValue) <= "9") {
                    num = num * 10 + parseInt(value.charAt(iValue++), 10);
                    size--;
                }
                if (size == origSize) {
                    throw "Missing number at position " + iValue;
                }
                return num;
            };
            var getName = function(match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                var size = 0;
                for (var j = 0; j < names.length; j++) {
                    size = Math.max(size, names[j].length);
                }
                var name = "";
                var iInit = iValue;
                while (size > 0 && iValue < value.length) {
                    name += value.charAt(iValue++);
                    for (var i = 0; i < names.length; i++) {
                        if (name == names[i]) {
                            return i + 1;
                        }
                    }
                    size--;
                }
                throw "Unknown name at position " + iInit;
            };
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue;
                }
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear();
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw "Invalid date";
            }
            return date;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        formatDate: function(format, date, settings) {
            if (!date) {
                return "";
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            };
            var formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num;
                    }
                }
                return num;
            };
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false;
                        } else {
                            output += format.charAt(iFormat);
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case "d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case "D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case "o":
                                var doy = date.getDate();
                                for (var m = date.getMonth() - 1; m >= 0; m--) {
                                    doy += this._getDaysInMonth(date.getFullYear(), m);
                                }
                                output += formatNumber("o", doy, 3);
                                break;
                            case "m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case "M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case "y":
                                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case "@":
                                output += date.getTime();
                                break;
                            case "'":
                                if (lookAhead("'")) {
                                    output += "'";
                                } else {
                                    literal = true;
                                }
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                    }
                }
            }
            return output;
        },
        _possibleChars: function(format) {
            var chars = "";
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        chars += format.charAt(iFormat);
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            chars += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (lookAhead("'")) {
                                chars += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat);
                    }
                }
            }
            return chars;
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
        },
        _setDateFromField: function(inst) {
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.input ? inst.input.val() : null;
            inst.endDay = inst.endMonth = inst.endYear = null;
            var date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                this.log(event);
                date = defaultDate;
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },
        _getDefaultDate: function(inst) {
            var date = this._determineDate(this._get(inst, "defaultDate"), new Date());
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date;
        },
        _determineDate: function(date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            };
            var offsetString = function(offset, getDaysInMonth) {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                        case "d":
                        case "D":
                            day += parseInt(matches[1], 10);
                            break;
                        case "w":
                        case "W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                        case "y":
                        case "Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            };
            date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date, this._getDaysInMonth) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(date);
        },
        _daylightSavingAdjust: function(date) {
            if (!date) {
                return null;
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },
        _setDate: function(inst, date, endDate) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._determineDate(date, new Date());
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if (origMonth != inst.selectedMonth || origYear != inst.selectedYear) {
                this._notifyChange(inst);
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst));
            }
        },
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate;
        },
        _generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var stepBigMonths = this._get(inst, "stepBigMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group ui-datepicker-group-';
                        switch (col) {
                            case 0:
                                calender += "first";
                                cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += "last";
                                cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += "middle";
                                cornerClass = "";
                                break;
                        }
                        calender += '">';
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = "";
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>";
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = "";
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : " onclick=\"DP_jQuery.datepicker._selectDay('#" + inst.id + "'," + drawMonth + "," + drawYear + ', this);return false;"') + ">" + (otherMonth ? (showOtherMonths ? printDate.getDate() : "&#xa0;") : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " ui-state-active" : "") + '" href="javascript:;">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate);
                        }
                        calender += tbody + "</tr>";
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    group += calender;
                }
                html += group;
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html;
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
            minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span> ";
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>";
                    }
                }
                monthHtml += "</select>";
            }
            if (!showMonthAfterYear) {
                html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? "&#xa0;" : "");
            }
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>";
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var year = 0;
                var endYear = 0;
                if (years.length != 2) {
                    year = drawYear - 10;
                    endYear = drawYear + 10;
                } else {
                    if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
                        year = drawYear + parseInt(years[0], 10);
                        endYear = drawYear + parseInt(years[1], 10);
                    } else {
                        year = parseInt(years[0], 10);
                        endYear = parseInt(years[1], 10);
                    }
                }
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>";
                }
                html += "</select>";
            }
            if (showMonthAfterYear) {
                html += (secondary || changeMonth || changeYear ? "&#xa0;" : "") + monthHtml;
            }
            html += "</div>";
            return html;
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._daylightSavingAdjust(new Date(year, month, day));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst);
            }
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
            }
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths));
        },
        _getMinMaxDate: function(inst, minMax, checkRange) {
            var date = this._determineDate(this._get(inst, minMax + "Date"), null);
            return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date));
        },
        _getDaysInMonth: function(year, month) {
            return 32 - new Date(year, month, 32).getDate();
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay();
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            }
            return this._isInRange(inst, date);
        },
        _isInRange: function(inst, date) {
            var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
            newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
            var minDate = newMinDate || this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            };
        },
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
        }
    });

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name];
            }
        }
        return target;
    }

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
    }
    $.fn.datepicker = function(options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true;
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
        }
        return this.each(function() {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
        });
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.7.1";
    window.DP_jQuery = $;
})(jQuery);
jQuery.effects || (function(d) {
    d.effects = {
        version: "1.7.1",
        save: function(g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.data("ec.storage." + h[f], g[0].style[h[f]]);
                }
            }
        },
        restore: function(g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.css(h[f], g.data("ec.storage." + h[f]));
                }
            }
        },
        setMode: function(f, g) {
            if (g == "toggle") {
                g = f.is(":hidden") ? "show" : "hide";
            }
            return g;
        },
        getBaseline: function(g, h) {
            var i, f;
            switch (g[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = 0.5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = g[0] / h.height;
            }
            switch (g[1]) {
                case "left":
                    f = 0;
                    break;
                case "center":
                    f = 0.5;
                    break;
                case "right":
                    f = 1;
                    break;
                default:
                    f = g[1] / h.width;
            }
            return {
                x: f,
                y: i
            };
        },
        createWrapper: function(f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent();
            }
            var g = {
                width: f.outerWidth(true),
                height: f.outerHeight(true),
                "float": f.css("float")
            };
            f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var j = f.parent();
            if (f.css("position") == "static") {
                j.css({
                    position: "relative"
                });
                f.css({
                    position: "relative"
                });
            } else {
                var i = f.css("top");
                if (isNaN(parseInt(i, 10))) {
                    i = "auto";
                }
                var h = f.css("left");
                if (isNaN(parseInt(h, 10))) {
                    h = "auto";
                }
                j.css({
                    position: f.css("position"),
                    top: i,
                    left: h,
                    zIndex: f.css("z-index")
                }).show();
                f.css({
                    position: "relative",
                    top: 0,
                    left: 0
                });
            }
            j.css(g);
            return j;
        },
        removeWrapper: function(f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent().replaceWith(f);
            }
            return f;
        },
        setTransition: function(g, i, f, h) {
            h = h || {};
            d.each(i, function(k, j) {
                unit = g.cssUnit(j);
                if (unit[0] > 0) {
                    h[j] = unit[0] * f + unit[1];
                }
            });
            return h;
        },
        animateClass: function(h, i, k, j) {
            var f = (typeof k == "function" ? k : (j ? j : null));
            var g = (typeof k == "string" ? k : null);
            return this.each(function() {
                var q = {};
                var o = d(this);
                var p = o.attr("style") || "";
                if (typeof p == "object") {
                    p = p.cssText;
                }
                if (h.toggle) {
                    o.hasClass(h.toggle) ? h.remove = h.toggle : h.add = h.toggle;
                }
                var l = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.addClass(h.add);
                }
                if (h.remove) {
                    o.removeClass(h.remove);
                }
                var m = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.removeClass(h.add);
                }
                if (h.remove) {
                    o.addClass(h.remove);
                }
                for (var r in m) {
                    if (typeof m[r] != "function" && m[r] && r.indexOf("Moz") == -1 && r.indexOf("length") == -1 && m[r] != l[r] && (r.match(/color/i) || (!r.match(/color/i) && !isNaN(parseInt(m[r], 10)))) && (l.position != "static" || (l.position == "static" && !r.match(/left|top|bottom|right/)))) {
                        q[r] = m[r];
                    }
                }
                o.animate(q, i, g, function() {
                    if (typeof d(this).attr("style") == "object") {
                        d(this).attr("style")["cssText"] = "";
                        d(this).attr("style")["cssText"] = p;
                    } else {
                        d(this).attr("style", p);
                    }
                    if (h.add) {
                        d(this).addClass(h.add);
                    }
                    if (h.remove) {
                        d(this).removeClass(h.remove);
                    }
                    if (f) {
                        f.apply(this, arguments);
                    }
                });
            });
        }
    };

    function c(g, f) {
        var i = g[1] && g[1].constructor == Object ? g[1] : {};
        if (f) {
            i.mode = f;
        }
        var h = g[1] && g[1].constructor != Object ? g[1] : (i.duration ? i.duration : g[2]);
        h = d.fx.off ? 0 : typeof h === "number" ? h : d.fx.speeds[h] || d.fx.speeds._default;
        var j = i.callback || (d.isFunction(g[1]) && g[1]) || (d.isFunction(g[2]) && g[2]) || (d.isFunction(g[3]) && g[3]);
        return [g[0], i, h, j];
    }
    d.fn.extend({
        _show: d.fn.show,
        _hide: d.fn.hide,
        __toggle: d.fn.toggle,
        _addClass: d.fn.addClass,
        _removeClass: d.fn.removeClass,
        _toggleClass: d.fn.toggleClass,
        effect: function(g, f, h, i) {
            return d.effects[g] ? d.effects[g].call(this, {
                method: g,
                options: f || {},
                duration: h,
                callback: i
            }) : null;
        },
        show: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._show.apply(this, arguments);
            } else {
                return this.effect.apply(this, c(arguments, "show"));
            }
        },
        hide: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._hide.apply(this, arguments);
            } else {
                return this.effect.apply(this, c(arguments, "hide"));
            }
        },
        toggle: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (arguments[0].constructor == Function)) {
                return this.__toggle.apply(this, arguments);
            } else {
                return this.effect.apply(this, c(arguments, "toggle"));
            }
        },
        addClass: function(g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                add: g
            }, f, i, h]) : this._addClass(g);
        },
        removeClass: function(g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                remove: g
            }, f, i, h]) : this._removeClass(g);
        },
        toggleClass: function(g, f, i, h) {
            return ((typeof f !== "boolean") && f) ? d.effects.animateClass.apply(this, [{
                toggle: g
            }, f, i, h]) : this._toggleClass(g, f);
        },
        morph: function(f, h, g, j, i) {
            return d.effects.animateClass.apply(this, [{
                add: h,
                remove: f
            }, g, j, i]);
        },
        switchClass: function() {
            return this.morph.apply(this, arguments);
        },
        cssUnit: function(f) {
            var g = this.css(f),
                h = [];
            d.each(["em", "px", "%", "pt"], function(j, k) {
                if (g.indexOf(k) > 0) {
                    h = [parseFloat(g), k];
                }
            });
            return h;
        }
    });
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(g, f) {
        d.fx.step[f] = function(h) {
            if (h.state == 0) {
                h.start = e(h.elem, f);
                h.end = b(h.end);
            }
            h.elem.style[f] = "rgb(" + [Math.max(Math.min(parseInt((h.pos * (h.end[0] - h.start[0])) + h.start[0], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[1] - h.start[1])) + h.start[1], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[2] - h.start[2])) + h.start[2], 10), 255), 0)].join(",") + ")";
        };
    });

    function b(g) {
        var f;
        if (g && g.constructor == Array && g.length == 3) {
            return g;
        }
        if (f = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) {
            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3], 10)];
        }
        if (f = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) {
            return [parseFloat(f[1]) * 2.55, parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55];
        }
        if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
            return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)];
        }
        if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
            return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)];
        }
        if (f = /rgba\(0, 0, 0, 0\)/.exec(g)) {
            return a.transparent;
        }
        return a[d.trim(g).toLowerCase()];
    }

    function e(h, f) {
        var g;
        do {
            g = d.curCSS(h, f);
            if (g != "" && g != "transparent" || d.nodeName(h, "body")) {
                break;
            }
            f = "backgroundColor";
        } while (h = h.parentNode);
        return b(g);
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    d.easing.jswing = d.easing.swing;
    d.extend(d.easing, {
        def: "easeOutQuad",
        swing: function(g, h, f, j, i) {
            return d.easing[d.easing.def](g, h, f, j, i);
        },
        easeInQuad: function(g, h, f, j, i) {
            return j * (h /= i) * h + f;
        },
        easeOutQuad: function(g, h, f, j, i) {
            return -j * (h /= i) * (h - 2) + f;
        },
        easeInOutQuad: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f;
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f;
        },
        easeInCubic: function(g, h, f, j, i) {
            return j * (h /= i) * h * h + f;
        },
        easeOutCubic: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h + 1) + f;
        },
        easeInOutCubic: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f;
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f;
        },
        easeInQuart: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h + f;
        },
        easeOutQuart: function(g, h, f, j, i) {
            return -j * ((h = h / i - 1) * h * h * h - 1) + f;
        },
        easeInOutQuart: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f;
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f;
        },
        easeInQuint: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h * h + f;
        },
        easeOutQuint: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f;
        },
        easeInOutQuint: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f;
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f;
        },
        easeInSine: function(g, h, f, j, i) {
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f;
        },
        easeOutSine: function(g, h, f, j, i) {
            return j * Math.sin(h / i * (Math.PI / 2)) + f;
        },
        easeInOutSine: function(g, h, f, j, i) {
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f;
        },
        easeInExpo: function(g, h, f, j, i) {
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f;
        },
        easeOutExpo: function(g, h, f, j, i) {
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f;
        },
        easeInOutExpo: function(g, h, f, j, i) {
            if (h == 0) {
                return f;
            }
            if (h == i) {
                return f + j;
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f;
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f;
        },
        easeInCirc: function(g, h, f, j, i) {
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f;
        },
        easeOutCirc: function(g, h, f, j, i) {
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f;
        },
        easeInOutCirc: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f;
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f;
        },
        easeInElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f;
            }
            if ((i /= l) == 1) {
                return f + m;
            }
            if (!k) {
                k = l * 0.3;
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4;
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h);
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f;
        },
        easeOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f;
            }
            if ((i /= l) == 1) {
                return f + m;
            }
            if (!k) {
                k = l * 0.3;
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4;
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h);
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f;
        },
        easeInOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f;
            }
            if ((i /= l / 2) == 2) {
                return f + m;
            }
            if (!k) {
                k = l * (0.3 * 1.5);
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4;
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h);
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f;
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f;
        },
        easeInBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158;
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f;
        },
        easeOutBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158;
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f;
        },
        easeInOutBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158;
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f;
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f;
        },
        easeInBounce: function(g, h, f, j, i) {
            return j - d.easing.easeOutBounce(g, i - h, 0, j, i) + f;
        },
        easeOutBounce: function(g, h, f, j, i) {
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f;
            } else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f;
                } else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f;
                    } else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f;
                    }
                }
            }
        },
        easeInOutBounce: function(g, h, f, j, i) {
            if (h < i / 2) {
                return d.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f;
            }
            return d.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f;
        }
    });
})(jQuery);
(function(a) {
    a.effects.highlight = function(b) {
        return this.queue(function() {
            var e = a(this),
                d = ["backgroundImage", "backgroundColor", "opacity"];
            var h = a.effects.setMode(e, b.options.mode || "show");
            var c = b.options.color || "#ffff99";
            var g = e.css("backgroundColor");
            a.effects.save(e, d);
            e.show();
            e.css({
                backgroundImage: "none",
                backgroundColor: c
            });
            var f = {
                backgroundColor: g
            };
            if (h == "hide") {
                f.opacity = 0;
            }
            e.animate(f, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function() {
                    if (h == "hide") {
                        e.hide();
                    }
                    a.effects.restore(e, d);
                    if (h == "show" && a.browser.msie) {
                        this.style.removeAttribute("filter");
                    }
                    if (b.callback) {
                        b.callback.apply(this, arguments);
                    }
                    e.dequeue();
                }
            });
        });
    };
})(jQuery);
(function(a) {
    a.widget("ui.slider", a.extend({}, a.ui.mouse, {
        _init: function() {
            var b = this,
                c = this.options;
            this._keySliding = false;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this.range = a([]);
            if (c.range) {
                if (c.range === true) {
                    this.range = a("<div></div>");
                    if (!c.values) {
                        c.values = [this._valueMin(), this._valueMin()];
                    }
                    if (c.values.length && c.values.length != 2) {
                        c.values = [c.values[0], c.values[0]];
                    }
                } else {
                    this.range = a("<div></div>");
                }
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (c.range == "min" || c.range == "max") {
                    this.range.addClass("ui-slider-range-" + c.range);
                }
                this.range.addClass("ui-widget-header");
            }
            if (a(".ui-slider-handle", this.element).length == 0) {
                a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle");
            }
            if (c.values && c.values.length) {
                while (a(".ui-slider-handle", this.element).length < c.values.length) {
                    a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle");
                }
            }
            this.handles = a(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(d) {
                d.preventDefault();
            }).hover(function() {
                if (!c.disabled) {
                    a(this).addClass("ui-state-hover");
                }
            }, function() {
                a(this).removeClass("ui-state-hover");
            }).focus(function() {
                if (!c.disabled) {
                    a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    a(this).addClass("ui-state-focus");
                } else {
                    a(this).blur();
                }
            }).blur(function() {
                a(this).removeClass("ui-state-focus");
            });
            this.handles.each(function(d) {
                a(this).data("index.ui-slider-handle", d);
            });
            this.handles.keydown(function(i) {
                var f = true;
                var e = a(this).data("index.ui-slider-handle");
                if (b.options.disabled) {
                    return;
                }
                switch (i.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        f = false;
                        if (!b._keySliding) {
                            b._keySliding = true;
                            a(this).addClass("ui-state-active");
                            b._start(i, e);
                        }
                        break;
                }
                var g, d, h = b._step();
                if (b.options.values && b.options.values.length) {
                    g = d = b.values(e);
                } else {
                    g = d = b.value();
                }
                switch (i.keyCode) {
                    case a.ui.keyCode.HOME:
                        d = b._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        d = b._valueMax();
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (g == b._valueMax()) {
                            return;
                        }
                        d = g + h;
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (g == b._valueMin()) {
                            return;
                        }
                        d = g - h;
                        break;
                }
                b._slide(i, e, d);
                return f;
            }).keyup(function(e) {
                var d = a(this).data("index.ui-slider-handle");
                if (b._keySliding) {
                    b._stop(e, d);
                    b._change(e, d);
                    b._keySliding = false;
                    a(this).removeClass("ui-state-active");
                }
            });
            this._refreshValue();
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
        },
        _mouseCapture: function(d) {
            var e = this.options;
            if (e.disabled) {
                return false;
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            var h = {
                x: d.pageX,
                y: d.pageY
            };
            var j = this._normValueFromMouse(h);
            var c = this._valueMax() - this._valueMin() + 1,
                f;
            var k = this,
                i;
            this.handles.each(function(l) {
                var m = Math.abs(j - k.values(l));
                if (c > m) {
                    c = m;
                    f = a(this);
                    i = l;
                }
            });
            if (e.range == true && this.values(1) == e.min) {
                f = a(this.handles[++i]);
            }
            this._start(d, i);
            k._handleIndex = i;
            f.addClass("ui-state-active").focus();
            var g = f.offset();
            var b = !a(d.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = b ? {
                left: 0,
                top: 0
            } : {
                left: d.pageX - g.left - (f.width() / 2),
                top: d.pageY - g.top - (f.height() / 2) - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
            };
            j = this._normValueFromMouse(h);
            this._slide(d, i, j);
            return true;
        },
        _mouseStart: function(b) {
            return true;
        },
        _mouseDrag: function(d) {
            var b = {
                x: d.pageX,
                y: d.pageY
            };
            var c = this._normValueFromMouse(b);
            this._slide(d, this._handleIndex, c);
            return false;
        },
        _mouseStop: function(b) {
            this.handles.removeClass("ui-state-active");
            this._stop(b, this._handleIndex);
            this._change(b, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            return false;
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation == "vertical" ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(d) {
            var c, h;
            if ("horizontal" == this.orientation) {
                c = this.elementSize.width;
                h = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
            } else {
                c = this.elementSize.height;
                h = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
            }
            var f = (h / c);
            if (f > 1) {
                f = 1;
            }
            if (f < 0) {
                f = 0;
            }
            if ("vertical" == this.orientation) {
                f = 1 - f;
            }
            var e = this._valueMax() - this._valueMin(),
                i = f * e,
                b = i % this.options.step,
                g = this._valueMin() + i - b;
            if (b > (this.options.step / 2)) {
                g += this.options.step;
            }
            return parseFloat(g.toFixed(5));
        },
        _start: function(d, c) {
            var b = {
                handle: this.handles[c],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                b.value = this.values(c);
                b.values = this.values();
            }
            this._trigger("start", d, b);
        },
        _slide: function(f, e, d) {
            var g = this.handles[e];
            if (this.options.values && this.options.values.length) {
                var b = this.values(e ? 0 : 1);
                if ((this.options.values.length == 2 && this.options.range === true) && ((e == 0 && d > b) || (e == 1 && d < b))) {
                    d = b;
                }
                if (d != this.values(e)) {
                    var c = this.values();
                    c[e] = d;
                    var h = this._trigger("slide", f, {
                        handle: this.handles[e],
                        value: d,
                        values: c
                    });
                    var b = this.values(e ? 0 : 1);
                    if (h !== false) {
                        this.values(e, d, (f.type == "mousedown" && this.options.animate), true);
                    }
                }
            } else {
                if (d != this.value()) {
                    var h = this._trigger("slide", f, {
                        handle: this.handles[e],
                        value: d
                    });
                    if (h !== false) {
                        this._setData("value", d, (f.type == "mousedown" && this.options.animate));
                    }
                }
            }
        },
        _stop: function(d, c) {
            var b = {
                handle: this.handles[c],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                b.value = this.values(c);
                b.values = this.values();
            }
            this._trigger("stop", d, b);
        },
        _change: function(d, c) {
            var b = {
                handle: this.handles[c],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                b.value = this.values(c);
                b.values = this.values();
            }
            this._trigger("change", d, b);
        },
        value: function(b) {
            if (arguments.length) {
                this._setData("value", b);
                this._change(null, 0);
            }
            return this._value();
        },
        values: function(b, e, c, d) {
            if (arguments.length > 1) {
                this.options.values[b] = e;
                this._refreshValue(c);
                if (!d) {
                    this._change(null, b);
                }
            }
            if (arguments.length) {
                if (this.options.values && this.options.values.length) {
                    return this._values(b);
                } else {
                    return this.value();
                }
            } else {
                return this._values();
            }
        },
        _setData: function(b, d, c) {
            a.widget.prototype._setData.apply(this, arguments);
            switch (b) {
                case "disabled":
                    if (d) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.attr("disabled", "disabled");
                    } else {
                        this.handles.removeAttr("disabled");
                    }
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue(c);
                    break;
                case "value":
                    this._refreshValue(c);
                    break;
            }
        },
        _step: function() {
            var b = this.options.step;
            return b;
        },
        _value: function() {
            var b = this.options.value;
            if (b < this._valueMin()) {
                b = this._valueMin();
            }
            if (b > this._valueMax()) {
                b = this._valueMax();
            }
            return b;
        },
        _values: function(b) {
            if (arguments.length) {
                var c = this.options.values[b];
                if (c < this._valueMin()) {
                    c = this._valueMin();
                }
                if (c > this._valueMax()) {
                    c = this._valueMax();
                }
                return c;
            } else {
                return this.options.values;
            }
        },
        _valueMin: function() {
            var b = this.options.min;
            return b;
        },
        _valueMax: function() {
            var b = this.options.max;
            return b;
        },
        _refreshValue: function(c) {
            var f = this.options.range,
                d = this.options,
                l = this;
            if (this.options.values && this.options.values.length) {
                var i, h;
                this.handles.each(function(p, n) {
                    var o = (l.values(p) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100;
                    var m = {};
                    m[l.orientation == "horizontal" ? "left" : "bottom"] = o + "%";
                    a(this).stop(1, 1)[c ? "animate" : "css"](m, d.animate);
                    if (l.options.range === true) {
                        if (l.orientation == "horizontal") {
                            (p == 0) && l.range.stop(1, 1)[c ? "animate" : "css"]({
                                left: o + "%"
                            }, d.animate);
                            (p == 1) && l.range[c ? "animate" : "css"]({
                                width: (o - lastValPercent) + "%"
                            }, {
                                queue: false,
                                duration: d.animate
                            });
                        } else {
                            (p == 0) && l.range.stop(1, 1)[c ? "animate" : "css"]({
                                bottom: (o) + "%"
                            }, d.animate);
                            (p == 1) && l.range[c ? "animate" : "css"]({
                                height: (o - lastValPercent) + "%"
                            }, {
                                queue: false,
                                duration: d.animate
                            });
                        }
                    }
                    lastValPercent = o;
                });
            } else {
                var j = this.value(),
                    g = this._valueMin(),
                    k = this._valueMax(),
                    e = k != g ? (j - g) / (k - g) * 100 : 0;
                var b = {};
                b[l.orientation == "horizontal" ? "left" : "bottom"] = e + "%";
                this.handle.stop(1, 1)[c ? "animate" : "css"](b, d.animate);
                (f == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[c ? "animate" : "css"]({
                    width: e + "%"
                }, d.animate);
                (f == "max") && (this.orientation == "horizontal") && this.range[c ? "animate" : "css"]({
                    width: (100 - e) + "%"
                }, {
                    queue: false,
                    duration: d.animate
                });
                (f == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[c ? "animate" : "css"]({
                    height: e + "%"
                }, d.animate);
                (f == "max") && (this.orientation == "vertical") && this.range[c ? "animate" : "css"]({
                    height: (100 - e) + "%"
                }, {
                    queue: false,
                    duration: d.animate
                });
            }
        }
    }));
    a.extend(a.ui.slider, {
        getter: "value values",
        version: "1.7.3",
        eventPrefix: "slide",
        defaults: {
            animate: false,
            delay: 0,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        }
    });
})(jQuery);
(function($) {
    $.fn.bgIframe = $.fn.bgiframe = function(s) {
        if ($.browser.msie && /6.0/.test(navigator.userAgent)) {
            s = $.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, s || {});
            var prop = function(n) {
                    return n && n.constructor == Number ? n + "px" : n;
                },
                html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (s.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : prop(s.top)) + ";" + "left:" + (s.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : prop(s.left)) + ";" + "width:" + (s.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : prop(s.width)) + ";" + "height:" + (s.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : prop(s.height)) + ";" + '"/>';
            return this.each(function() {
                if ($("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(html), this.firstChild);
                }
            });
        }
        return this;
    };
})(jQuery);
(function($) {
    $.extend({
        metadata: {
            defaults: {
                type: "class",
                name: "metadata",
                cre: /({.*})/,
                single: "metadata"
            },
            setType: function(type, name) {
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function(elem, opts) {
                var settings = $.extend({}, this.defaults, opts);
                if (!settings.single.length) {
                    settings.single = "metadata";
                }
                var data = $.data(elem, settings.single);
                if (data) {
                    return data;
                }
                data = "{}";
                var getData = function(data) {
                    if (typeof data != "string") {
                        return data;
                    }
                    if (data.indexOf("{") < 0) {
                        data = eval("(" + data + ")");
                    }
                };
                var getObject = function(data) {
                    if (typeof data != "string") {
                        return data;
                    }
                    data = eval("(" + data + ")");
                    return data;
                };
                if (settings.type == "html5") {
                    var object = {};
                    $(elem.attributes).each(function() {
                        var name = this.nodeName;
                        if (name.match(/^data-/)) {
                            name = name.replace(/^data-/, "");
                        } else {
                            return true;
                        }
                        object[name] = getObject(this.nodeValue);
                    });
                } else {
                    if (settings.type == "class") {
                        var m = settings.cre.exec(elem.className);
                        if (m) {
                            data = m[1];
                        }
                    } else {
                        if (settings.type == "elem") {
                            if (!elem.getElementsByTagName) {
                                return;
                            }
                            var e = elem.getElementsByTagName(settings.name);
                            if (e.length) {
                                data = $.trim(e[0].innerHTML);
                            }
                        } else {
                            if (elem.getAttribute != undefined) {
                                var attr = elem.getAttribute(settings.name);
                                if (attr) {
                                    data = attr;
                                }
                            }
                        }
                    }
                    object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
                }
                $.data(elem, settings.single, object);
                return object;
            }
        }
    });
    $.fn.metadata = function(opts) {
        return $.metadata.get(this[0], opts);
    };
})(jQuery);
(function(d) {
    var k = d.scrollTo = function(a, i, e) {
        d(window).scrollTo(a, i, e);
    };
    k.defaults = {
        axis: "xy",
        duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
    };
    k.window = function(a) {
        return d(window)._scrollable();
    };
    d.fn._scrollable = function() {
        return this.map(function() {
            var a = this,
                i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!i) {
                return a;
            }
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == "BackCompat" ? e.body : e.documentElement;
        });
    };
    d.fn.scrollTo = function(n, j, b) {
        if (typeof j == "object") {
            b = j;
            j = 0;
        }
        if (typeof b == "function") {
            b = {
                onAfter: b
            };
        }
        if (n == "max") {
            n = 9000000000;
        }
        b = d.extend({}, k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) {
            j /= 2;
        }
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function() {
            var q = this,
                r = d(q),
                f = n,
                s, g = {},
                u = r.is("html,body");
            switch (typeof f) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                        f = p(f);
                        break;
                    }
                    f = d(f, this);
                case "object":
                    if (f.is || f.style) {
                        s = (f = d(f)).offset();
                    }
            }
            d.each(b.axis.split(""), function(a, i) {
                var e = i == "x" ? "Left" : "Top",
                    h = e.toLowerCase(),
                    c = "scroll" + e,
                    l = q[c],
                    m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css("margin" + e)) || 0;
                        g[c] -= parseInt(f.css("border" + e + "Width")) || 0;
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h]) {
                        g[c] += f[i == "x" ? "width" : "height"]() * b.over[h];
                    }
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice(-1) == "%" ? parseFloat(o) / 100 * m : o;
                }
                if (/^\d+$/.test(g[c])) {
                    g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                }
                if (!a && b.queue) {
                    if (l != g[c]) {
                        t(b.onAfterFirst);
                    }
                    delete g[c];
                }
            });
            t(b.onAfter);

            function t(a) {
                r.animate(g, j, b.easing, a && function() {
                    a.call(this, n, b);
                });
            }
        }).end();
    };
    k.max = function(a, i) {
        var e = i == "x" ? "Width" : "Height",
            h = "scroll" + e;
        if (!d(a).is("html,body")) {
            return a[h] - d(a)[e.toLowerCase()]();
        }
        var c = "client" + e,
            l = a.ownerDocument.documentElement,
            m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c]);
    };

    function p(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        };
    }
})(jQuery);
(function($) {
    $.extend({
        tablesorter: new function() {
            var parsers = [],
                widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortDown",
                cssDesc: "headerSortUp",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                },
                headers: {},
                widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: ".",
                debug: false
            };

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
            }
            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s);
                } else {
                    alert(s);
                }
            }

            function buildParserCache(table, $headers) {
                if (table.config.debug) {
                    var parsersDebug = "";
                }
                var rows = table.tBodies[0].rows;
                if (table.tBodies[0].rows[0]) {
                    var list = [],
                        cells = rows[0].cells,
                        l = cells.length;
                    for (var i = 0; i < l; i++) {
                        var p = false;
                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
                            p = getParserById($($headers[i]).metadata().sorter);
                        } else {
                            if ((table.config.headers[i] && table.config.headers[i].sorter)) {
                                p = getParserById(table.config.headers[i].sorter);
                            }
                        }
                        if (!p) {
                            p = detectParserForColumn(table, cells[i]);
                        }
                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                        }
                        list.push(p);
                    }
                }
                if (table.config.debug) {
                    log(parsersDebug);
                }
                return list;
            }

            function detectParserForColumn(table, node) {
                var l = parsers.length;
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is($.trim(getElementText(table.config, node)), table, node)) {
                        return parsers[i];
                    }
                }
                return parsers[0];
            }

            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i];
                    }
                }
                return false;
            }

            function buildCache(table) {
                if (table.config.debug) {
                    var cacheTime = new Date();
                }
                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                    totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                    parsers = table.config.parsers,
                    cache = {
                        row: [],
                        normalized: []
                    };
                for (var i = 0; i < totalRows; ++i) {
                    var c = table.tBodies[0].rows[i],
                        cols = [];
                    cache.row.push($(c));
                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c.cells[j]), table, c.cells[j]));
                    }
                    cols.push(i);
                    cache.normalized.push(cols);
                    cols = null;
                }
                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                }
                return cache;
            }

            function getElementText(config, node) {
                if (!node) {
                    return "";
                }
                var t = "";
                if (config.textExtraction == "simple") {
                    if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                        t = node.childNodes[0].innerHTML;
                    } else {
                        t = node.innerHTML;
                    }
                } else {
                    if (typeof(config.textExtraction) == "function") {
                        t = config.textExtraction(node);
                    } else {
                        t = $(node).text();
                    }
                }
                return t;
            }

            function appendToTable(table, cache) {
                if (table.config.debug) {
                    var appendTime = new Date();
                }
                var c = cache,
                    r = c.row,
                    n = c.normalized,
                    totalRows = n.length,
                    checkCell = (n[0].length - 1),
                    tableBody = $(table.tBodies[0]),
                    rows = [];
                for (var i = 0; i < totalRows; i++) {
                    rows.push(r[n[i][checkCell]]);
                    if (!table.config.appender) {
                        var o = r[n[i][checkCell]];
                        var l = o.length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(o[j]);
                        }
                    }
                }
                if (table.config.appender) {
                    table.config.appender(table, rows);
                }
                rows = null;
                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime);
                }
                applyWidget(table);
                setTimeout(function() {
                    $(table).trigger("sortEnd");
                }, 0);
            }

            function buildHeaders(table) {
                if (table.config.debug) {
                    var time = new Date();
                }
                var meta = ($.metadata) ? true : false,
                    tableHeadersRows = [];
                for (var i = 0; i < table.tHead.rows.length; i++) {
                    tableHeadersRows[i] = 0;
                }
                $tableHeaders = $("thead th", table);
                $tableHeaders.each(function(index) {
                    this.count = 0;
                    this.column = index;
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) {
                        this.sortDisabled = true;
                    }
                    if (!this.sortDisabled) {
                        $(this).addClass(table.config.cssHeader);
                    }
                    table.config.headerList[index] = this;
                });
                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders);
                }
                return $tableHeaders;
            }

            function checkCellColSpan(table, rows, row) {
                var arr = [],
                    r = table.tHead.rows,
                    c = r[row].cells;
                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];
                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell);
                        }
                    }
                }
                return arr;
            }

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true;
                }
                return false;
            }

            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true;
                }
                return false;
            }

            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {
                    getWidgetById(c[i]).format(table);
                }
            }

            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i];
                    }
                }
            }

            function formatSortingOrder(v) {
                if (typeof(v) != "Number") {
                    i = (v.toLowerCase() == "desc") ? 1 : 0;
                } else {
                    i = (v == (0 || 1)) ? v : 0;
                }
                return i;
            }

            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true;
                    }
                }
                return false;
            }

            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function(offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this);
                    }
                });
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]]);
                }
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $("<colgroup>");
                    $("tr:first td", table.tBodies[0]).each(function() {
                        colgroup.append($("<col>").css("width", $(this).width()));
                    });
                    $(table).prepend(colgroup);
                }
            }

            function updateHeaderSortCount(table, sortList) {
                var c = table.config,
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i],
                        o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++;
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) {
                    var sortTime = new Date();
                }
                var dynamicExp = "var sortWrapper = function(a,b) {",
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    var s = (getCachedSortType(table.config.parsers, c) == "text") ? ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ? "sortNumeric" : "sortNumericDesc");
                    var e = "e" + i;
                    dynamicExp += "var " + e + " = " + s + "(a[" + c + "],b[" + c + "]); ";
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { ";
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; ";
                }
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                }
                return cache;
            }

            function sortText(a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            }

            function sortTextDesc(a, b) {
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            }

            function sortNumeric(a, b) {
                return a - b;
            }

            function sortNumericDesc(a, b) {
                return b - a;
            }

            function getCachedSortType(parsers, i) {
                return parsers[i].type;
            }
            this.construct = function(settings) {
                return this.each(function() {
                    if (!this.tHead || !this.tBodies) {
                        return;
                    }
                    var $this, $document, $headers, cache, config, shiftDown = 0,
                        sortOrder;
                    this.config = {};
                    config = $.extend(this.config, $.tablesorter.defaults, settings);
                    $this = $(this);
                    $headers = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, $headers);
                    cache = buildCache(this);
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    fixColumnWidth(this);
                    $headers.click(function(e) {
                        $this.trigger("sortStart");
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            var $cell = $(this);
                            var i = this.column;
                            this.order = this.count++ % 2;
                            if (!e[config.sortMultiSortKey]) {
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j]);
                                        }
                                    }
                                }
                                config.sortList.push([i, this.order]);
                            } else {
                                if (isValueInArray(i, config.sortList)) {
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j],
                                            o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2;
                                        }
                                    }
                                } else {
                                    config.sortList.push([i, this.order]);
                                }
                            }
                            setTimeout(function() {
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable($this[0], multisort($this[0], config.sortList, cache));
                            }, 1);
                            return false;
                        }
                    }).mousedown(function() {
                        if (config.cancelSelection) {
                            this.onselectstart = function() {
                                return false;
                            };
                            return false;
                        }
                    });
                    $this.bind("update", function() {
                        this.config.parsers = buildParserCache(this, $headers);
                        cache = buildCache(this);
                    }).bind("sorton", function(e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        var sortList = config.sortList;
                        updateHeaderSortCount(this, sortList);
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        appendToTable(this, multisort(this, sortList, cache));
                    }).bind("appendCache", function() {
                        appendToTable(this, cache);
                    }).bind("applyWidgetId", function(e, id) {
                        getWidgetById(id).format(this);
                    }).bind("applyWidgets", function() {
                        applyWidget(this);
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist;
                    }
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList]);
                    }
                    applyWidget(this);
                });
            };
            this.addParser = function(parser) {
                var l = parsers.length,
                    a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false;
                    }
                }
                if (a) {
                    parsers.push(parser);
                }
            };
            this.addWidget = function(widget) {
                widgets.push(widget);
            };
            this.formatFloat = function(s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.formatInt = function(s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.isDigit = function(s, config) {
                var DECIMAL = "\\" + config.decimal;
                var exp = "/(^[+]?0(" + DECIMAL + "0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)" + DECIMAL + "(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*" + DECIMAL + "0+$)/";
                return RegExp(exp).test($.trim(s));
            };
            this.clearTableBody = function(table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                    }
                    empty.apply(table.tBodies[0]);
                } else {
                    table.tBodies[0].innerHTML = "";
                }
            };
        }
    });
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });
    var ts = $.tablesorter;
    ts.addParser({
        id: "text",
        is: function(s) {
            return true;
        },
        format: function(s) {
            return $.trim(s.toLowerCase());
        },
        type: "text"
    });
    ts.addParser({
        id: "digit",
        is: function(s, table) {
            s = s.replace(/,/g, "");
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        },
        format: function(s) {
            s = s.replace(/,/g, "");
            return $.tablesorter.formatFloat(s);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "currency",
        is: function(s) {
            return /^[£$€?.]/.test(s);
        },
        format: function(s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "ipAddress",
        is: function(s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        },
        format: function(s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "url",
        is: function(s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        },
        format: function(s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ""));
        },
        type: "text"
    });
    ts.addParser({
        id: "isoDate",
        is: function(s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        },
        format: function(s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0");
        },
        type: "numeric"
    });
    ts.addParser({
        id: "percent",
        is: function(s) {
            return /\%$/.test($.trim(s));
        },
        format: function(s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "usLongDate",
        is: function(s) {
            return s.match(new RegExp("/^[A-Za-z]{3,10}.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]s(AM|PM)))$/"));
        },
        format: function(s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "shortDate",
        is: function(s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        },
        format: function(s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else {
                if (c.dateFormat == "uk") {
                    s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
                } else {
                    if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                        s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
                    }
                }
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function(s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        },
        format: function(s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function(s) {
            return false;
        },
        format: function(s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? "sortValue" : c.parserMetadataName;
            return $(cell).metadata()[p];
        },
        type: "numeric"
    });
    ts.addWidget({
        id: "zebra",
        format: function(table) {
            if (table.config.debug) {
                var time = new Date();
            }
            $("tr:visible", table.tBodies[0]).filter(":even").removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0]).end().filter(":odd").removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);
jQuery.cookie = function(name, value, options) {
    if (typeof value !== "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1;
        }
        var expires = "";
        if (options.expires && (typeof options.expires === "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires === "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = "; expires=" + date.toUTCString();
        }
        var path = options.path ? "; path=" + (options.path) : "";
        var domain = options.domain ? "; domain=" + (options.domain) : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
var swfobject = function() {
    var D = "undefined",
        r = "object",
        S = "Shockwave Flash",
        W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash",
        R = "SWFObjectExprInst",
        x = "onreadystatechange",
        O = window,
        j = document,
        t = navigator,
        T = false,
        U = [h],
        o = [],
        N = [],
        I = [],
        l, Q, E, B, J = false,
        a = false,
        n, G, m = true,
        M = function() {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(),
                Y = t.platform.toLowerCase(),
                ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                X = !+"\v1",
                ag = [0, 0, 0],
                ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)];
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            };
        }(),
        k = function() {
            if (!M.w3) {
                return;
            }
            if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                f();
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false);
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function() {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f();
                        }
                    });
                    if (O == top) {
                        (function() {
                            if (J) {
                                return;
                            }
                            try {
                                j.documentElement.doScroll("left");
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return;
                            }
                            f();
                        })();
                    }
                }
                if (M.wk) {
                    (function() {
                        if (J) {
                            return;
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        f();
                    })();
                }
                s(f);
            }
        }();

    function f() {
        if (J) {
            return;
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z);
        } catch (aa) {
            return;
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]();
        }
    }

    function K(X) {
        if (J) {
            X();
        } else {
            U[U.length] = X;
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false);
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false);
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y);
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y();
                        };
                    } else {
                        O.onload = Y;
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V();
        } else {
            H();
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)];
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return;
                    }
                }
                X.removeChild(aa);
                Z = null;
                H();
            })();
        } else {
            H();
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa);
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class");
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align");
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value");
                                    }
                                }
                                P(ai, ah, Y, ab);
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa);
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z;
                        }
                        ab(aa);
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y;
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z;
                }
            }
        }
        return X;
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312);
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null;
            } else {
                l = ae;
                Q = X;
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310";
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137";
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac;
            } else {
                ab.flashvars = ac;
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            u(aa, ab, X);
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y);
                } else {
                    setTimeout(arguments.callee, 10);
                }
            })();
        } else {
            Y.parentNode.replaceChild(g(Y), Y);
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML;
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true));
                        }
                    }
                }
            }
        }
        return aa;
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X;
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y;
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae];
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"';
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"';
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />';
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id);
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac]);
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac]);
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab]);
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z;
            }
        }
        return X;
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa);
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function() {
                    if (X.readyState == 4) {
                        b(Y);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                X.parentNode.removeChild(X);
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null;
                }
            }
            Y.parentNode.removeChild(Y);
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z);
        } catch (Y) {}
        return X;
    }

    function C(X) {
        return j.createElement(X);
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y];
    }

    function F(Z) {
        var Y = M.pv,
            X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false;
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return;
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return;
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null;
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1];
            }
            G = X;
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y);
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"));
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return;
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y;
        } else {
            v("#" + Z, "visibility:" + Y);
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y;
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2]);
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa]);
                }
                for (var Y in M) {
                    M[Y] = null;
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null;
                }
                swfobject = null;
            });
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false);
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    });
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X);
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al];
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak];
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai];
                            } else {
                                am.flashvars = ai + "=" + Z[ai];
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true);
                        }
                        X.success = true;
                        X.ref = an;
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return;
                        } else {
                            w(ah, true);
                        }
                    }
                    if (ac) {
                        ac(X);
                    }
                });
            } else {
                if (ac) {
                    ac(X);
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false;
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            };
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X);
            } else {
                return undefined;
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y);
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X);
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X);
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1];
                }
                if (aa == null) {
                    return L(Z);
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)));
                    }
                }
            }
            return "";
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block";
                        }
                    }
                    if (E) {
                        E(B);
                    }
                }
                a = false;
            }
        }
    };
}();
var LBG = window.LBG || {};
var console = window.console || {
    messages: [],
    log: function(msg) {
        console.messages.push(msg);
    }
};
LBG.common = {
    version: 1,
    dynamicInputSelector: "input.dyna-text",
    dynamicInputFocusClass: "focused",
    ajaxQueryParam: "rc=1",
    highlightFadeClass: ".highlightFade",
    identJS: function() {
        $("body").addClass("hasJS");
        var btn = $("#header a.logout");
        if (btn.length) {
            var url = btn.attr("href");
            url += (url === "#" || url.indexOf("?") === -1) ? "?" : "&";
            btn.attr("href", url + "hasJS=true");
        }
    },
    isEmpty: function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    },
    isUnsignedInteger: function(s) {
        return (s.toString().search(/^[0-9]+$/) === 0);
    },
    getStringQueries: function(theString) {
        if (typeof theString !== "string") {
            return;
        }
        if (theString.indexOf("?") > -1) {
            theString = theString.split("?")[1];
        }
        var qs = theString,
            qsKey, qsValue, stringElements = {};
        qs = qs.split("&");
        for (var i = qs.length - 1; i >= 0; i--) {
            qsKey = qs[i].split("=")[0];
            qsValue = qs[i].split("=")[1];
            stringElements[qsKey] = qsValue;
        }
        return stringElements;
    },
    webSafeString: function(str) {
        var WEBSAFE_CHAR = "<wbr />",
            split = str.match(/^(.*)(&[a-zA-Z0-9#]+;)(.*)$/);
        if (split) {
            split = split.slice(1);
            split[0] = arguments.callee(split[0]);
            split[1] = split[1] + WEBSAFE_CHAR;
            split[2] = arguments.callee(split[2]);
            return split.join("");
        } else {
            for (var i = 0, len = str.length, tmp = []; i < len; i++) {
                tmp.push(str[i], WEBSAFE_CHAR);
            }
            return tmp.join("");
        }
    },
    replaceLongStrings: function() {
        var WEBSAFE_CHAR_CLASS = ".splitString",
            parse = LBG.common.parseVersionString,
            mozBASELINE = "1.9.2",
            sfBASELINE = 4;
        var splitStringSelectors = ["div.primary div.searchResults table.selectPayee tbody label", "div.primary div.accountData .beneficiaries tbody label", "div.primary div.yourBusinesses ul.linkList li", "div.primary div.yourBusinessAccounts ul.linkList li", "div.primary div.myAccountDetails div.accountDetails h1", "div.primary ul.myAccounts li div.accountDetails h2 a", "div.primary div.accountBalance p.balance", ".colLayout .colPart p.data", ".content #omm table.custWidthsOccur td", ".content #omm table.custWidths td", ".content #omm table.custWidthsTrans td", ".content table.internationalPayments th", ".content table.internationalPayments td"];

        function escapeChars(text) {
            var regx = new RegExp("[-[]{}()*\\+?.,\\^$|#s]", "g");
            return text.replace(regx, "\\$&");
        }
        if ($.browser.mozilla && $.browser.version.slice(0, 5) < mozBASELINE || $.browser.safari && $.browser.version[0] <= sfBASELINE || $.browser.opera === true) {
            $(".splitString").add(splitStringSelectors.join()).each(function() {
                var regx = null,
                    html = "",
                    text = [],
                    str = "";
                if ($(this).find(".splitString").length) {
                    return;
                }
                html = $(this).html();
                text = $.trim(html.replace(/<(?:.|\s)*?>/g, " ")).split(" ");
                for (var i = 0; i < text.length; i++) {
                    str = $.trim(text[i]);
                    if (str !== "" && str !== "[?]") {
                        regx = new RegExp("(?![^<]+>)(" + escapeChars(str) + ")(?![^<]+>)", "g");
                        html = html.replace(regx, LBG.common.webSafeString(str));
                    }
                }
                $(this).html(html);
            });
        }
    },
    urlGetAnchor: function(anchor) {
        if (anchor.href.indexOf("#") >= 0) {
            anchor.destination = anchor.href.slice(anchor.href.indexOf("#") + 1);
            return anchor.destination;
        } else {
            return false;
        }
    },
    formatPlaceholder: function() {
        var content = arguments;
        return this.replace(new RegExp("{(\\d+)}", "g"), function() {
            return content[arguments[1]];
        });
    },
    getNewWindowLinks: function(target) {
        var NEW_WIN_CLASS = ".newwin",
            NEW_HELP_WIN_CLASS = "newhelpwin",
            NEW_FAQ_CLASS = "newfaqwin",
            NEW_PRINT_CLASS = "newprintwin",
            OMM_DEMO_WIN_CLASS = "ommDemoWin",
            PDF_CLASS = "pdf";
        var click = function(e) {
            var windowURL = this.getAttribute("href"),
                windowName = this.getAttribute("target") || "_blank",
                windowOptions = "",
                newWindow;
            if ($(this).hasClass(NEW_HELP_WIN_CLASS)) {
                windowOptions = "width=365,height=610,scrollbars=no,toolbar=no,location=no,status=no,menubar=no,resizable=no";
            } else {
                if ($(this).hasClass(NEW_FAQ_CLASS)) {
                    var height = 480,
                        width = 640,
                        xPos = window.screen.width - width;
                    windowOptions = "width=" + width + ",height=" + height + ",scrollbars=yes,toolbar=yes,top=0,left=" + xPos + ",location=no,status=no,menubar=yes,resizable=yes";
                } else {
                    if ($(this).hasClass(NEW_PRINT_CLASS)) {
                        var width = window.innerWidth * 0.7 || document.documentElement.clientWidth * 0.7 || document.body.clientWidth * 0.7,
                            height = window.innerHeight * 0.9 || document.documentElement.clientHeight * 0.9 || document.body.clientHeight * 0.9,
                            windowOptions = "scrollbars=yes,toolbar=yes,location=yes,status=no,menubar=yes,resizable=yes,width=" + width + ",height=" + height;
                    } else {
                        windowOptions = "scrollbars=yes,toolbar=yes,location=yes,status=no,menubar=yes,resizable=yes";
                    }
                }
            }
            if ($(this).hasClass(PDF_CLASS)) {
                var pdfName = "";
                windowName = windowURL.substring(windowURL.indexOf("?") + 1).split("&");
                for (var i = 0; i < windowName.length; i++) {
                    var bits = windowName[i].split("=");
                    pdfName += (bits[0] ? bits[0] + ":" : "") + (bits[1] ? bits[1] + ":" : "");
                }
                windowName = (pdfName.replace(/[^A-Za-z0-9]/g, "")).toLowerCase();
                if ($.browser.msie && $.browser.version < 8) {
                    newWindow = window.open("", windowName, windowOptions);
                    newWindow.close();
                    newWindow = window.open(windowURL, windowName, windowOptions);
                    return false;
                }
            }
            newWindow = window.open(windowURL, windowName, windowOptions);
            try {
                if ((typeof newWindow !== "undefined") && (typeof newWindow.focus !== "undefined") && (newWindow !== null) && (newWindow.focus !== null)) {
                    newWindow.focus();
                }
            } catch (exc) {}
            return false;
        };
        $(target || NEW_WIN_CLASS).each(function() {
            var t = ($(this).text() === "" || !$(this).text()) ? $(this).attr("title") : $(this).text();
            t = ((t === "" || !t) && $(this).find("img").length) ? $(this).find("img").attr("alt") : t;
            t = (t === "" || !t) ? "" : t + ": ";
            this.title = t + ($(this).hasClass(OMM_DEMO_WIN_CLASS) ? DI.lang.omm.demoWindow.info : DI.lang.newWindow.info);
        }).live("click", click);
        if (target) {
            click.apply(target);
        }
    },
    getNewWindowContinueActionLinks: function() {
        var NEW_WIN_CLASS = "a.newwincontinue",
            NEW_HELP_WIN_CLASS = "newhelpwincontinue",
            NEW_FAQ_CLASS = "newfaqwincontinue",
            OMM_DEMO_WIN_CLASS = "ommDemoWinContinue",
            CONTINUE_LINK_SELECTOR = ".primaryAction A";
        $(NEW_WIN_CLASS).each(function() {
            if ($(this).hasClass(OMM_DEMO_WIN_CLASS)) {
                this.title = (this.title) ? this.title + ": " + DI.lang.omm.demoWindow.info : DI.lang.omm.demoWindow.info;
            } else {
                this.title = (this.title) ? this.title + ": " + DI.lang.newWindow.info : DI.lang.newWindow.info;
            }
        }).live("click", function() {
            var windowOptions, newWindow;
            if ($(this).hasClass(NEW_HELP_WIN_CLASS)) {
                windowOptions = "width=365,height=610,scrollbars=no,toolbar=no,location=no,status=no,menubar=no,resizable=no";
            } else {
                if ($(this).hasClass(NEW_FAQ_CLASS)) {
                    var height = 480,
                        width = 640,
                        xPos = window.screen.width - width;
                    windowOptions = "width=" + width + ",height=" + height + ",scrollbars=yes,toolbar=yes,top=0,left=" + xPos + ",location=no,status=no,menubar=yes,resizable=yes";
                } else {
                    windowOptions = "scrollbars=yes,toolbar=yes,location=yes,status=no,menubar=yes,resizable=yes";
                }
            }
            newWindow = window.open(this.getAttribute("href"), this.getAttribute("target") || "_blank", windowOptions);
            if ((typeof newWindow !== "undefined") && (typeof newWindow.focus !== "undefined") && (newWindow !== null) && (newWindow.focus !== null)) {
                newWindow.focus();
            }
            window.location.href = $(CONTINUE_LINK_SELECTOR).attr("href");
            return false;
        });
    },
    getPrintLinks: function() {
        var PRINT_LINK_SELECTOR = "a.printwin",
            PRINT_LINK_TITLE = DI.lang.printWin.printLinkTitle;
        $(PRINT_LINK_SELECTOR).each(function() {
            this.title = $(this).text() + ": " + PRINT_LINK_TITLE;
        }).live("click", function() {
            var printWin = window.print();
            return false;
        });
    },
    getHighlightElements: function() {
        $(LBG.common.highlightFadeClass).each(function() {
            LBG.common.effects.highlightElement(this);
        });
    },
    getAbsoluteLeft: function(element) {
        var oLeft, oParent;
        oLeft = element.offsetLeft;
        while (element.offsetParent !== null) {
            oParent = element.offsetParent;
            oLeft += oParent.offsetLeft;
            element = oParent;
        }
        return oLeft;
    },
    getAbsoluteTop: function(element) {
        var oTop, oParent;
        oTop = element.offsetTop;
        while (element.offsetParent !== null) {
            oParent = element.offsetParent;
            oTop += oParent.offsetTop;
            element = oParent;
        }
        return oTop;
    },
    formatCurrencyString: function(amountString) {
        amountString += "";
        var amountArray = amountString.split(".");
        amountArray[1] = (amountArray[1] || "00").substring(0, 2);
        while (amountArray[1].length < 2) {
            amountArray[1] = amountArray[1] + "0";
        }
        var integerAmount = amountArray[0];
        var decimals = "." + amountArray[1];
        var regex = /(\d+)(\d{3})/;
        while (regex.test(integerAmount)) {
            integerAmount = integerAmount.replace(regex, "$1" + "," + "$2");
        }
        return integerAmount + decimals;
    },
    explorerRedrawFix: function(opt_context, opt_override) {
        if (opt_override === true || (jQuery.browser.msie && jQuery.browser.version < 8 && jQuery.browser.version > 6)) {
            var context = opt_context || document.documentElement;
            context.className = (context.className || "") + " ie_redraw";
            context.className = context.className.replace(/ ie_redraw$/, "");
        }
    },
    ajax: {
        bufferFieldID: "ajaxVirtualBufferUpdate",
        prepareBuffer: function() {
            var objHidden = document.createElement("input");
            objHidden.setAttribute("type", "hidden");
            objHidden.setAttribute("value", "1");
            objHidden.setAttribute("id", LBG.common.ajax.bufferFieldID);
            objHidden.setAttribute("name", LBG.common.ajax.bufferFieldID);
            document.body.appendChild(objHidden);
        },
        updateBuffer: function() {
            var objHidden = document.getElementById(LBG.common.ajax.bufferFieldID);
            if (objHidden) {
                if (objHidden.getAttribute("value") === "1") {
                    objHidden.setAttribute("value", "0");
                } else {
                    objHidden.setAttribute("value", "1");
                }
            } else {
                LBG.common.ajax.prepareBuffer();
                LBG.common.ajax.updateBuffer();
            }
        },
        tagUrl: function(url) {
            var prefix = (url.indexOf("?") < 0) ? "?" : "&";
            var timestamp = new Date().getTime();
            var ajaxURL = url + prefix + LBG.common.ajaxQueryParam;
            ajaxURL += "&ts=" + timestamp;
            return ajaxURL;
        },
        getAjaxURI: function(anchor) {
            anchor.ajaxURI = anchor.ajaxURI || $(anchor).metadata().ajaxURI || anchor.href || null;
            return anchor.ajaxURI;
        }
    },
    parseVersionString: function(str) {
        if (typeof(str) !== "string") {
            return false;
        }
        var x = str.split(".");
        return {
            major: parseInt(x[0], 10) || 0,
            minor: parseInt(x[1], 10) || 0,
            patch: parseInt(x[2], 10) || 0,
            rev: parseInt(x[3], 10) || 0
        };
    },
    effects: {
        highlightElement: function(element, color, speed) {
            color = (!color) ? "#FFFFCC" : color;
            speed = (!speed) ? 4000 : speed;
            $(element).effect("highlight", {
                color: color
            }, speed);
        }
    },
    frameKill: function() {
        var pointOfOrigin = $("#pointOfOrigin").val();
        if (pointOfOrigin !== undefined) {
            pointOfOrigin = pointOfOrigin.toLowerCase();
        }
        if (top !== self && pointOfOrigin !== "telephony") {
            top.location.href = self.location.href;
        }
    },
    escapeSpecialCharsInId: function(id) {
        return "#" + id.replace(/:/g, "\\:").replace(/\./g, "\\.");
    },
    zeroPadding: function(number, count) {
        var n = number + "";
        while (n.length < count) {
            n = "0" + n;
        }
        return n;
    },
    isNull: function(value) {
        if (typeof value !== "string" && !value) {
            return true;
        }
        value = $.trim(value).toLowerCase();
        return value !== "" && value !== "null" ? false : true;
    },
    round: function(val, dps) {
        dps = dps || 0;
        var fctr = Math.pow(10, parseFloat(dps));
        return (Math.round(val * fctr) / fctr);
    }
};
jQuery.fn.autoTotal = function(source, modifier) {
    var target = this;
    var updateTotal = function() {
        var total = $(source).sumTotal();
        if (typeof modifier === "function") {
            total = modifier(total);
        } else {
            if (typeof modifier === "number") {
                total = total * modifier;
            }
        }
        total = LBG.common.formatCurrencyString(total);
        if ($(target).hasClass("amount_currency_total") && $(target).parents("table.fundAllocationDetails").length) {
            $(target).text("\u00A3" + total);
        } else {
            if ($(target).hasClass("amount_percent_total") && $(target).parents("table.fundAllocationDetails").length) {
                $(target).text(total + "%");
            } else {
                $(target).text(total);
            }
        }
    };
    jQuery(source).blur(updateTotal);
    updateTotal();
};
jQuery.fn.sumTotal = function() {
    var total = 0;
    $(this).each(function() {
        if (!$(this).parents(".formField").hasClass("error")) {
            var val = this.value.replace(/\,/g, "");
            var num = parseFloat(val);
            if (!isNaN(num)) {
                total += num;
            }
        }
    });
    return Math.round(total * 100) / 100;
};
jQuery.fn.fixRadioChange = function() {
    this.change(function(e) {
        if (this.was_checked) {
            e.stopImmediatePropagation();
            return;
        }
        $("input[name=" + this.name + "]").each(function() {
            this.was_checked = false;
        });
        this.was_checked = true;
    }).focus(function() {
        if (!this.checked) {
            return;
        }
        if (!this.was_checked) {
            $(this).change();
        }
    });
    return this;
};
jQuery.expr[":"].live = function(T) {
    return T.disabled === false && (T.offsetWidth > 0 || T.offsetHeight > 0);
};
jQuery.fn.makeTabbable = function() {
    $(this).each(function() {
        $(this).attr("tabindex", "0").click(function(e) {
            $(this).focus();
        }).keydown(function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                $(this).click();
                return false;
            }
        });
    });
};
jQuery.fn.fauxClick = function() {
    var stash;

    function targetMousedown(e) {
        stash = {
            target: this,
            x: e.clientX,
            y: e.clientY
        };
    }

    function targetMouseup(e) {
        stash = undefined;
    }

    function documentMouseup(e) {
        if (stash && stash.x === e.clientX && stash.y === e.clientY) {
            $(stash.target).click();
        }
        stash = undefined;
    }
    $(document).mouseup(documentMouseup);
    return $(this).mousedown(targetMousedown).mouseup(targetMouseup);
};
LBG.$ = (function($) {
    var init = function() {
        $.fn.last = function() {
            var len = this.length;
            return $((len < 1) ? null : this[len - 1]);
        };
        $.fn._text = $.fn.text;
        $.fn.text = function(newval) {
            if (undefined !== newval) {
                return $(this)._text(newval);
            }
            var str = "";
            var self = this;
            $(self).each(function() {
                if (3 == this.nodeType) {
                    str += this.textContent || this.data;
                } else {
                    if (1 == this.nodeType) {
                        str += $(this)._text();
                    }
                }
            });
            return str;
        };
        $.fn.exists = function() {
            return 0 !== this.length;
        };
        $.fn.once = function(func) {
            func.apply(this);
            return this;
        };
    };
    return {
        init: init
    };
})(jQuery);
LBG.$.init();
LBG.lang = (function() {
    var init = function() {
        if (!String.prototype.trim) {
            String.prototype.trim = function() {
                return this.replace(/^[\s ]+|[\s ]+$/g, "");
            };
        }
        Date.prototype.isValid = function() {
            return !isNaN(this.getTime());
        };
    };
    return {
        init: init
    };
})();
LBG.lang.init();
LBG.track = (function() {
    var active = false;
    var wt;
    return function(args) {
        if (!active && typeof WebTrends !== "undefined") {
            if (typeof _tag == "undefined") {} else {}
            active = true;
        }
        var applyArgs = [];
        if (arguments.length == 1) {
            for (var key in args) {
                if (args.hasOwnProperty(key) && undefined !== args[key] && null !== args[key]) {
                    applyArgs.push(key);
                    applyArgs.push(args[key]);
                }
            }
        } else {
            applyArgs = arguments;
        }
        if (!active) {
            console.log("Would have tracked: " + applyArgs);
            return;
        }
        dcsMultiTrack.apply(this, applyArgs);
    };
})();
var LBG = window.LBG || {};
LBG.Forms = window.LBG.Forms || {};
LBG.Forms.Validation = {
    submitDisableClass: ".disabledIfNotValid",
    ValidationHandlers: [],
    clickedElement: undefined,
    init: function(context) {
        $("form", context || document).each(function(i) {
            $(this).find(LBG.Forms.Validation.submitDisableClass).each(function() {
                LBG.Forms.Validation.Tools.disableElement(this);
            });
            var className = this.className || null;
            if (className !== null) {
                if (className.indexOf("validate:") !== -1) {
                    if ($.browser.msie && $.browser.version < 8) {
                        $("option:disabled", this).each(function() {
                            var parent = $(this).closest(".formField")[0];
                            if (/validateDisabledOptions/.test(parent.className) === false) {
                                parent.className = parent.className.replace(/(validate:\([^)]*)(\))/, "$1_validateDisabledOptions$2");
                            }
                        });
                    }
                    var handler = new LBG.Forms.Validation.FormValidationHandler(this),
                        replacement = false;
                    for (var j = 0; j < LBG.Forms.Validation.ValidationHandlers.length; j++) {
                        if (LBG.Forms.Validation.ValidationHandlers[j].name === handler.name) {
                            LBG.Forms.Validation.ValidationHandlers.splice(j, 1, handler);
                            replacement = true;
                            break;
                        }
                    }
                    if (!replacement) {
                        LBG.Forms.Validation.ValidationHandlers.push(handler);
                    }
                }
            }
            var hasJS = $("<input>");
            hasJS.attr("type", "hidden");
            hasJS.attr("name", "hasJS");
            hasJS.attr("value", "true");
            $(this).append(hasJS);
            if ($.browser.mozilla) {
                $(this).find("input:image.submitAction, input:submit.submitAction").attr("autocomplete", "off");
            }
        });
        LBG.Forms.Validation.Tools.setMultipleFieldValidation(context);
    }
};
LBG.Forms.Validation.Tools = {
    setMultipleFieldValidation: function(context) {
        var initialValues = LBG.Forms.Validation.InitialValues = {},
            sameAsInit = LBG.Forms.Validation.Tools.sameAsInit;
        context = context || document;
        $("input, select", context).each(function() {
            this.ready = true;
        });
        $("input", context).filter(function() {
            if (this.id) {
                initialValues[this.id] = this.value;
            }
            if (/\b(hideJS)\b/.test(this.className)) {
                return false;
            }
            if (/\b(areaCode|subscriberNumber)\b/.test(this.className)) {
                return true;
            }
            var p = this;
            while ((p = p.parentNode)) {
                if (/\b(quickTransferInner|sortCode|passCode|amountField|addressField|manualAddress|timeYearsMonths|textInputPairMatch)\b/.test(p.className)) {
                    return true;
                }
            }
            return false;
        }).add($("#txtAmountBetweenEnd, ", context)).each(function() {
            this.startValue = $(this).val();
            this.isPrefilledField = (this.startValue !== "");
            this.ready = false;
        }).focus(function() {
            this.ready = true;
            var $radio = $(this).parents(".formField").find("input:radio");
            if ($radio.length) {
                $radio.each(function() {
                    this.ready = true;
                });
            }
        }).change(function() {
            if ($(this).is(":checked")) {
                this.ready = true;
            }
        });
        $("select", context).filter(function() {
            if (this.id) {
                initialValues[this.id] = this.value;
            }
            var p = this;
            while ((p = p.parentNode)) {
                if (/(\b(quickTransferInner|memInfoSelect|date)\b|validateDateRangeIsInRange|validateDateTimeRange|specificDateWithRadio)/.test(p.className)) {
                    return true;
                }
            }
            return false;
        }).each(function() {
            this.ready = !(sameAsInit(this) || $(this).val() === "-");
        }).focus(function() {
            this.ready = true;
        });
        if ($(".balanceTransfer", context).length) {
            $(".balanceTransfer input:text, .balanceTransfer select", context).each(function() {
                var tagName = this.tagName.toLowerCase();
                if ((tagName === "input" && this.value !== "") || (tagName === "select" && this.value !== "-")) {
                    this.isPrefilledField = true;
                    this.ready = true;
                }
            });
        }
    },
    convertClassDetailsToData: function(element, classNameToInterrogate) {
        if (!element || !classNameToInterrogate) {
            return;
        }
        var data = [],
            className = element.className;
        if (className.indexOf(classNameToInterrogate) !== -1) {
            var classNames = className.split(" ");
            for (var i = 0, len1 = classNames.length; i < len1; i++) {
                className = classNames[i];
                if (className.indexOf(classNameToInterrogate) !== -1) {
                    var primaryDetails = className.slice(className.indexOf("(") + 1, className.indexOf(")")).replace(/^_+/, "").split(/_/g);
                    for (var j = 0, len2 = primaryDetails.length; j < len2; j++) {
                        var primaryDetail = primaryDetails[j].split("[")[0];
                        if ($.inArray(primaryDetail, data) > -1) {
                            primaryDetail = primaryDetail + j;
                        }
                        data.push(primaryDetail);
                        data[primaryDetail] = {};
                        var isPreventFormSubmission = primaryDetail === "preventFormSubmission";
                        if (primaryDetails[j].indexOf("[") !== -1) {
                            var secondaryDetails = primaryDetails[j].slice(primaryDetails[j].indexOf("[") + 1, primaryDetails[j].indexOf("]")).split(/,/g);
                            for (var k = 0, len3 = secondaryDetails.length; k < len3; k++) {
                                var secondaryDetail = [];
                                if (isPreventFormSubmission) {
                                    var splits = secondaryDetails[k].split(/:/);
                                    secondaryDetail.push(splits[0]);
                                    secondaryDetail.push(splits.splice(1, splits.length).join(":"));
                                } else {
                                    secondaryDetail = secondaryDetails[k].split(/:/g);
                                }
                                if ((secondaryDetail[1] || "").indexOf("|") === -1) {
                                    data[primaryDetail][secondaryDetail[0]] = secondaryDetail[1];
                                } else {
                                    data[primaryDetail][secondaryDetail[0]] = secondaryDetail[1].split(/\|/g);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (element.tagName.toLowerCase() === "form") {
            var inputNames = [];
            $(element).find("input:image.preventFormSubmission").each(function() {
                if (this.name) {
                    inputNames.push(this.name);
                }
            });
            if (inputNames.length) {
                if (typeof data.preventFormSubmission === "undefined") {
                    data.preventFormSubmission = {
                        "inputs": inputNames
                    };
                } else {
                    var values = [];
                    if (typeof data.preventFormSubmission.inputs === "string") {
                        values.push(data.preventFormSubmission.inputs.split("|"));
                    } else {
                        values = data.preventFormSubmission.inputs;
                    }
                    for (var l = 0; l < inputNames.length; l++) {
                        if ($.inArray(inputNames[l], values) === -1) {
                            values.push(inputNames[l]);
                        }
                    }
                    data.preventFormSubmission.inputs = values;
                }
            }
        }
        return data;
    },
    getValidationHandlerObject: function($element) {
        if (!$element.length) {
            return false;
        }
        var parentFormElement = $element.parents("form")[0];
        var waitingForIE = function() {};
        while (typeof LBG.Forms.Validation.Tools.convertClassDetailsToData !== "function") {
            window.setTimeout(waitingForIE, 50);
        }
        var parentFormElementValidationName = LBG.Forms.Validation.Tools.convertClassDetailsToData(parentFormElement, "validationName:")[0];
        for (var i = 0, len = LBG.Forms.Validation.ValidationHandlers.length; i < len; i++) {
            if (LBG.Forms.Validation.ValidationHandlers[i].name === parentFormElementValidationName) {
                return LBG.Forms.Validation.ValidationHandlers[i];
            }
        }
    },
    getFieldHandler: function(element) {
        var $element = $(element),
            field = $element.hasClass("formField") ? $element[0] : $element.parents(".formField")[0],
            name = LBG.Forms.Validation.Tools.convertClassDetailsToData(field, "validationName:")[0],
            handler = LBG.Forms.Validation.Tools.getValidationHandlerObject($element);
        return handler.getChild(name);
    },
    sameAsInit: function(field) {
        var id = field.id || "",
            curr = field.value || "",
            orig = LBG.Forms.Validation.InitialValues[field.id] || "",
            result = false;
        if (id && orig === curr) {
            result = true;
        }
        return result;
    },
    disableElement: function(el) {
        var parseSrcStr = el.className.split("disabledSrc:")[1],
            parseSrc, newSrc;
        if (parseSrcStr) {
            parseSrc = parseSrcStr.split(" ")[0];
            newSrc = $(el).attr("src");
            $(el).attr("src", parseSrc).attr("disabled", "disabled");
            if (el.className.indexOf("enabledSrc:") === -1) {
                $(el).addClass("enabledSrc:" + newSrc);
            }
        }
    },
    enableElement: function(el) {
        var parseSrcStr = el.className.split("enabledSrc:")[1],
            parseSrc, newSrc;
        if (parseSrcStr) {
            parseSrc = parseSrcStr.split(" ")[0];
            newSrc = $(el).attr("src");
            $(el).attr("src", parseSrc).removeAttr("disabled");
        }
    },
    checkDisabledSubmit: function(that, el) {
        var tools = this,
            elArr = $(el).parents("form").eq(0).find(LBG.Forms.Validation.submitDisableClass);
        if (elArr.length < 1) {
            return false;
        }
        if (el.disabled && ($(el).is(":image") || $(el).is(":submit"))) {
            return false;
        }
        if (that.validate(el, true)) {
            $(elArr).each(function() {
                tools.enableElement(this);
            });
        } else {
            $(elArr).each(function() {
                tools.disableElement(this);
            });
        }
    }
};
LBG.Forms.Validation.FormValidationHandler = function(formElement) {
    var that = this;
    this.$formElement = $(formElement);
    this.children = [];
    this.name = LBG.Forms.Validation.Tools.convertClassDetailsToData(that.$formElement.get(0), "validationName:")[0];
    this.isValid = false;
    this.isShowingError = false;
    this.validationRoutines = LBG.Forms.Validation.Tools.convertClassDetailsToData(that.$formElement.get(0), "validate:");
    this.errorMessage = document.createElement("div");
    this.errorMessage.className = "formSubmitError";
    this.submitInputSelector = "submitAction";
    this.hiddenInputForSubmissionData = document.createElement("input");
    this.hiddenInputForSubmissionData.setAttribute("type", "hidden");
    this.submittedFlag = false;
    this.findChildren(this.$formElement);
    this.$formElement.bind("reset", function() {
        $("input." + that.submitInputSelector).removeAttr("disabled");
        that.submittedFlag = false;
    });

    function findEventTargetDetails(target, className) {
        var formField = $(target).closest(".formField")[0],
            formFieldTable = $(target).closest(".formFieldTable")[0],
            targetDetails = false,
            data;
        if (formField !== undefined) {
            if ((formFieldTable !== undefined) && (target.type === "checkbox")) {
                data = LBG.Forms.Validation.Tools.convertClassDetailsToData($(formFieldTable).parent(".formField")[0], className);
            } else {
                data = LBG.Forms.Validation.Tools.convertClassDetailsToData(formField, className);
            }
            if (className === "formFieldGroup:") {
                targetDetails = [];
                for (var i = 0; i < data.length; i++) {
                    var name = data[i];
                    if (data[name] !== undefined && data[name].id !== undefined) {
                        name += "_" + data[name].id;
                    }
                    targetDetails.push(that.getChild(name));
                }
            } else {
                targetDetails = that.getChild(data[0]);
            }
        }
        if ($.browser.msie && document.activeElement.tagName.toLowerCase() === "a" && $("form").length > 0) {
            $(document.activeElement).blur(function() {
                if (document.activeElement.tagName.toLowerCase() === "body") {
                    $(this).focus();
                }
            });
        }
        return targetDetails;
    }
    $.each(this.children, function() {
        if ($(this.$formFieldElement).parents(".radioGroup").length) {
            $("input[type=text]", this.$formFieldElement).change(function(e) {
                var targetFormFieldObject = findEventTargetDetails(e.target, "validationName:");
                if (targetFormFieldObject instanceof LBG.Forms.Validation.FormField) {
                    targetFormFieldObject.$formFieldElement.find("input:radio").get(0).checked = true;
                    targetFormFieldObject.$formFieldElement.find("input:radio").get(0).ready = true;
                }
            });
        }
    });
    var validateTarget = function(target) {
        var field = findEventTargetDetails(target, "validationName:"),
            group = findEventTargetDetails(target, "formFieldGroup:"),
            $radios = [],
            $amountWithRadio = field.$formFieldElement ? field.$formFieldElement.parents(".amountWithRadio") : null;
        if (group) {
            for (var i = 0; i < group.length; ++i) {
                var doHide = true,
                    members = group[i].members;
                for (var k = 0; k < members.length; k++) {
                    if (members[k].isValid === false) {
                        doHide = false;
                        break;
                    }
                }
                if ($(target).parents("fieldset.balanceTransfer").length) {
                    doHide = true;
                }
                if (doHide === true) {
                    group[i].hideError();
                }
            }
        }
        if (field instanceof LBG.Forms.Validation.FormField) {
            if ($amountWithRadio.length) {
                $radios = $amountWithRadio.find("input:radio");
                if (!$radios.filter(":checked").length) {
                    field = findEventTargetDetails($radios.filter(":first"), "validationName:");
                }
            }
            field.hideError();
            if (field.$formFieldElement.hasClass("amountField")) {
                LBG.autoFillDecimals.addDecimals(field.$formFieldElement);
            }
            if (field.$formFieldElement.is(".personalDetails .timeYearsMonths")) {
                var meta = field.$formFieldElement.metadata();
                var $y = field.$formFieldElement.find("input:text:eq(0)");
                var $m = field.$formFieldElement.find("input:text:eq(1)");
                if (meta.autoPopulate !== false) {
                    if ($y.val() === "") {
                        $y.val("0");
                    }
                }
                if ($y.val() !== "" && $m.val() === "") {
                    $m.val("0");
                }
            }
            if (target.isPrefilledField) {
                var enteredValue = $(target).val();
                target.ready = ((enteredValue !== "") || (enteredValue !== target.startValue));
                if (!target.ready) {
                    target.isPrefilledField = false;
                }
            }
            if ($amountWithRadio.length && $radios.length) {
                $radios.each(function() {
                    this.ready = true;
                });
            }
            field.validate();
        }
        if (group) {
            for (var j = 0; j < group.length; ++j) {
                group[j].validate();
            }
        }
    };
    var delegatedHandler = function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            tagName = target.tagName.toLowerCase(),
            type = target.type;
        if ((tagName === "input" && (type !== "image" && type !== "radio" && type !== "submit" && type !== "checkbox")) || tagName === "select") {
            $(target).prevAll("input.field").each(function() {
                this.ready = true;
            });
            validateTarget(target);
        }
    };
    if ($.browser.msie) {
        this.$formElement.get(0).onfocusout = delegatedHandler;
    } else {
        this.$formElement.get(0).addEventListener("blur", delegatedHandler, true);
    }
    this.$formElement.find("input:checkbox, input:radio").click(function(event) {
        validateTarget(event.target);
    });
    this.$formElement.find(".radioGroup").each(function() {
        if ($.browser.mozilla) {
            $(this).find("input:radio:first").keypress(function(event) {
                if (event.keyCode === 9 && event.shiftKey) {
                    validateTarget(event.target);
                }
            });
            $(this).find("input:radio:last").keypress(function(event) {
                if (event.keyCode === 9 && !event.shiftKey) {
                    validateTarget(event.target);
                }
            });
        } else {
            $(this).find("input:radio").filter(":first, :last").keydown(function(event) {
                if (event.keyCode === 9) {
                    validateTarget(event.target);
                }
            });
        }
    });
    var submitManagement = function(event) {
        event.preventDefault();
        var $targetElement = $(event.target),
            targetElementType = event.target.type.toLowerCase(),
            isFormValid = true;
        LBG.Forms.Validation.clickedElement = $targetElement;
        if ($(event.target).parents("fieldset.addressFinder").length) {
            return;
        }
        $("input, select").each(function() {
            this.ready = true;
        });
        if ($targetElement.hasClass("submitAction") || !$targetElement.parents("fieldset.addressFinder").length) {
            that.formSubmitTriggered = true;
        } else {
            that.formSubmitTriggered = false;
        }
        if (that.isValid === false) {
            that.hideError();
            if ($targetElement.hasClass(that.submitInputSelector) || (event.keyCode === 13 && (!$targetElement.hasClass("pseudoLink") && $targetElement.parents("ul.actions").length === 0))) {
                isFormValid = that.validate(event.target);
            }
            that.formSubmitTriggered = null;
            if (isFormValid && that.submittedFlag === false) {
                that.submittedFlag = true;
                var submitButtons = that.$formElement.find("input:image.submitAction, input:submit.submitAction");
                if (submitButtons.length > 0 && event.type === "keypress" && targetElementType !== "submit" && targetElementType !== "image") {
                    that.hiddenInputForSubmissionData.setAttribute("value", submitButtons[0].getAttribute("value"));
                    that.hiddenInputForSubmissionData.setAttribute("name", submitButtons[0].getAttribute("name"));
                } else {
                    that.hiddenInputForSubmissionData.setAttribute("value", event.target.getAttribute("value"));
                    that.hiddenInputForSubmissionData.setAttribute("name", event.target.getAttribute("name"));
                }
                that.$formElement.append(that.hiddenInputForSubmissionData);
                var allowSubmitForInputElement = true,
                    i, len;
                if (that.validationRoutines.preventFormSubmission !== undefined && that.validationRoutines.preventFormSubmission.inputs !== undefined) {
                    if (typeof that.validationRoutines.preventFormSubmission.inputs === "string") {
                        that.validationRoutines.preventFormSubmission.inputs = [that.validationRoutines.preventFormSubmission.inputs];
                    }
                    for (i = 0, len = that.validationRoutines.preventFormSubmission.inputs.length; i < len; i++) {
                        if (that.validationRoutines.preventFormSubmission.inputs[i] === event.target.getAttribute("name")) {
                            allowSubmitForInputElement = false;
                            break;
                        }
                    }
                    that.submittedFlag = false;
                    that.isValid = false;
                }
                if (allowSubmitForInputElement === true && event.target.className.indexOf("closeOverlay") === -1) {
                    var submitElements = that.$formElement.find("input:image, input:submit");
                    for (i = 0, len = submitElements.length; i < len; i++) {
                        submitElements[i].disabled = true;
                    }
                    that.$formElement.submit();
                }
            }
        }
    };
    LBG.Forms.Validation._submitManagement = submitManagement;
    var clickEventDelegation = function(event) {
        var el = event.target;
        LBG.Forms.Validation.Tools.checkDisabledSubmit(that, el);
        that.isValid = false;
        var targetElementType = event.target.type && event.target.type.toLowerCase(),
            $radioParent;
        if (targetElementType === "radio") {
            var radioGroupName = jQuery(event.target).attr("name");
            var radioElements = that.$formElement.find("input:radio[name=" + radioGroupName + "]");
            for (var i = 0, len = radioElements.length; i < len; i++) {
                $radioParent = $(radioElements[i]).parents("div.formField");
                if ($radioParent.length > 0) {
                    var formFieldObject = that.getChild(LBG.Forms.Validation.Tools.convertClassDetailsToData($radioParent[0], "validationName:")[0]);
                    if (formFieldObject instanceof LBG.Forms.Validation.FormField && !formFieldObject.$formFieldElement.find("input:radio").is(":checked")) {
                        formFieldObject.hideError();
                    }
                }
            }
        } else {
            if (targetElementType === "image" || targetElementType === "submit") {
                if (!event.target.disabled) {
                    submitManagement(event);
                }
            }
        }
    };
    this.$formElement.bind("click", clickEventDelegation);
    this.$formElement.find("input:image, input:submit").fauxClick().click(submitManagement);
    var keyPressEventDelegation = function(event) {
        var tgtTagName = event.target.tagName.toLowerCase();
        if (event.keyCode === 13 && tgtTagName === "input") {
            if (tgtTagName === "input" && event.target.type === "image" && !$(event.target).hasClass("submitAction")) {
                return;
            }
            submitManagement(event);
        }
    };
    this.$formElement.bind("keypress", keyPressEventDelegation);
};
LBG.Forms.Validation.FormValidationHandler.prototype = {
    add: function(child) {
        this.children.push(child);
    },
    remove: function(childName) {
        var removeCompleted = false;
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i] instanceof LBG.Forms.Validation.FormField && this.children[i].name === childName) {
                this.children.splice(i, 1);
                removeCompleted = true;
            }
        }
        return removeCompleted;
    },
    getChild: function(childName) {
        var childExists = false;
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i].name === childName) {
                childExists = this.children[i];
                break;
            }
        }
        return childExists;
    },
    findChildren: function($containingElement) {
        var that = this;
        $containingElement.find("div.formField").each(function(i) {
            var className = this.className;
            if (className.indexOf("validate:") !== -1 && className.indexOf("validationName:") !== -1) {
                var formFieldName = LBG.Forms.Validation.Tools.convertClassDetailsToData(this, "validationName:")[0];
                if (that.getChild(formFieldName) === false) {
                    that.add(new LBG.Forms.Validation.FormField(this));
                }
                if (className.indexOf("formFieldGroup:") !== -1) {
                    var formFieldGroupData = LBG.Forms.Validation.Tools.convertClassDetailsToData(this, "formFieldGroup:");
                    for (var j = 0; j < formFieldGroupData.length; j++) {
                        var routine = formFieldGroupData[j],
                            metadata = formFieldGroupData[routine],
                            formFieldGroupName;
                        if (metadata !== undefined && metadata.id !== undefined) {
                            formFieldGroupName = routine + "_" + metadata.id;
                        } else {
                            formFieldGroupName = routine;
                        }
                        var formFieldGroup = that.getChild(formFieldGroupName),
                            formField = that.getChild(formFieldName);
                        if (formFieldGroup === false) {
                            formFieldGroup = new LBG.Forms.Validation.FormFieldGroup(formFieldGroupName, formField, routine, metadata);
                            that.add(formFieldGroup);
                        } else {
                            formFieldGroup.add(that.getChild(formFieldName));
                        }
                    }
                }
            }
        });
    },
    removeChildren: function($containingElement) {
        var that = this;
        $containingElement.find(".formField").each(function(i) {
            var className = this.className;
            if (className.indexOf("validate:") !== -1 && className.indexOf("validationName:") !== -1) {
                var formFieldName = LBG.Forms.Validation.Tools.convertClassDetailsToData(this, "validationName:")[0];
                if (that.getChild(formFieldName) !== false) {
                    that.remove(formFieldName);
                }
                if (className.indexOf("formFieldGroup:") !== -1) {
                    var formFieldGroupName = LBG.Forms.Validation.Tools.convertClassDetailsToData(this, "formFieldGroup:")[0];
                    if (that.getChild(formFieldGroupName) !== false) {
                        if (that.getChild(formFieldGroupName).members.length <= 2) {
                            that.remove(formFieldGroupName);
                        } else {
                            that.getChild(formFieldGroupName).remove(formFieldName);
                        }
                    }
                }
            }
        });
    },
    validate: function(target, suppressError) {
        var that, i, len;
        if (!target) {
            return false;
        }
        for (i = 0, len = LBG.Forms.Validation.ValidationHandlers.length; i < len; i++) {
            if (LBG.Forms.Validation.ValidationHandlers[i].name === this.name) {
                that = LBG.Forms.Validation.ValidationHandlers[i];
            }
        }
        if (that.validationRoutines.multipleSubmits && that.validationRoutines.multipleSubmits[target.getAttribute("name")]) {
            var names = that.validationRoutines.multipleSubmits[target.getAttribute("name")];
            if (typeof names === "string") {
                names = [names];
            }
            that.isValid = true;
            for (i = 0; i < names.length; ++i) {
                var child = that.getChild(names[i]);
                if (child) {
                    child.validate(suppressError);
                    if (!child.isValid) {
                        that.isValid = false;
                    }
                }
            }
        } else {
            that.isValid = true;
            for (var j = 0; j < that.children.length; ++j) {
                that.children[j].validate(suppressError);
                if (!that.children[j].isValid) {
                    that.isValid = false;
                }
            }
        }
        if (!that.isValid && suppressError !== true) {
            that.showError();
        }
        if (!that.isValid) {
            $(that.$formElement).trigger({
                type: "error"
            });
        }
        return that.isValid;
    },
    showError: function() {
        if (this.$formElement[0].className.indexOf("errorClass") !== -1) {
            this.$formErrorParent = $("." + this.validationRoutines.errorClass.name);
        } else {
            this.$formErrorParent = this.$formElement;
        }
        if (this.validationRoutines !== undefined && this.validationRoutines.customMessage !== undefined && this.validationRoutines.customMessage.msg !== undefined) {
            this.errorMessage.innerHTML = Messages[this.validationRoutines.customMessage.msg];
        } else {
            this.errorMessage.innerHTML = DI.lang.errorMessages.defaultGlobalErrorMessage[0];
        }
        if (this.isShowingError === false) {
            this.$formErrorParent.find("." + this.errorMessage.className).remove();
            if (this.$formElement.find(".quickTransferInner").length > 0) {
                $("h2.success").html(DI.lang.quickTransfer.defaultHeadingText).removeClass("success");
            }
            if ($(".showSubmitErrorPrepend").length > 0) {
                $(".showSubmitErrorPrepend:first").prepend(this.errorMessage);
            } else {
                this.$formErrorParent.prepend(this.errorMessage);
            }
            LBG.common.explorerRedrawFix(this.$formElement[0]);
            this.isShowingError = true;
            if (!$("body").hasClass("overlayOpen") && !$(".ommCreateGoal").length) {
                var xScroll = 0,
                    yScroll = 0;
                var $errorText = $(".formSubmitError:first");
                if ($errorText.length) {
                    xScroll = $errorText.offset().left;
                    yScroll = $errorText.offset().top;
                    window.scrollTo(xScroll, yScroll);
                }
            }
        }
    },
    hideError: function() {
        if (this.isShowingError === true) {
            $(this.errorMessage).remove();
            this.isShowingError = false;
        }
        for (var i = 0, len = this.children.length; i < len; i++) {
            this.children[i].hideError();
        }
        LBG.common.explorerRedrawFix(this.$formElement[0]);
    }
};
LBG.Forms.Validation.FormField = function(formFieldElement) {
    var that = this;
    this.$formFieldElement = $(formFieldElement);
    this.name = LBG.Forms.Validation.Tools.convertClassDetailsToData(that.$formFieldElement.get(0), "validationName:")[0];
    this.isValid = false;
    this.isShowingError = false;
    this.validationRoutines = LBG.Forms.Validation.Tools.convertClassDetailsToData(that.$formFieldElement.get(0), "validate:");
    this.formFieldGroups = LBG.Forms.Validation.Tools.convertClassDetailsToData(that.$formFieldElement.get(0), "formFieldGroup:");
    this.errorMessage = document.createElement("span");
    this.errorMessage.className = "error";
};
LBG.Forms.Validation.FormField.prototype = {
    validate: function(suppressError, eventTarget) {
        this.isValid = true;
        var ready = true,
            groups = this.formFieldGroups,
            $children = $("input:live, select:live", this.$formFieldElement);
        if (groups.length && groups.conditionalRequiredGroup && this.$formFieldElement.parents(".formFieldRow").length) {
            $children = $("input:live, select:live", this.$formFieldElement.parents(".formFieldRow"));
        }
        $children.each(function() {
            ready = ready && (typeof this.ready === "undefined" ? true : this.ready);
            return ready;
        });
        if (!ready || !$children.length) {
            return;
        }
        if (this.$formFieldElement.parents(".amountGroup").length && !this.$formFieldElement.find("input:radio").get(0).checked) {
            return;
        }
        var $inputs = this.$formFieldElement.find(":text, :password, select"),
            hasValue = false,
            mustRun = ["required", "requiredWithoutCheckbox", "requiredWithCheckbox", "requiredWithPrecedingCheckbox", "requiredWithBusinessSortcode", "requiredWithValue", "validateOtherSelection", "isaAmountWithRadio", "specificAmountWithRadio", "specificBicSwiftWithRadio", "requiredWithRadio", "requiredWithBalanceAlert", "oneSelectFieldRequired", "oneTextFieldRequired", "requiredWithSelectedValues", "requiredWithAccountIdentifier", "requiredBranchFinder", "validateUnique"];
        for (var i = 0; i < $inputs.length; ++i) {
            if ($inputs[i].value.length && ($inputs[i].tagName !== "SELECT" || $inputs[i].value !== "-")) {
                hasValue = true;
                break;
            }
        }
        for (var j = 0; j < this.validationRoutines.length; ++j) {
            var name = this.validationRoutines[j],
                details = this.validationRoutines[name];
            name = name.replace(/\d/g, "");
            if (LBG.Forms.Validation.Routines[name] === undefined) {
                continue;
            }
            if (hasValue || $.inArray(name, mustRun) >= 0) {
                if (name === "required") {
                    if (this.$formFieldElement.hasClass("postcodeFinder")) {
                        if (typeof eventTarget !== "undefined" && eventTarget.type === "image") {
                            $.extend(details, {
                                "eventTarget": eventTarget
                            });
                        } else {
                            details = {};
                        }
                    }
                }
                this.isValid = LBG.Forms.Validation.Routines[name](this.$formFieldElement, details);
            }
            if (this.$formFieldElement.parents(".dateGroup").length !== 0 && this.$formFieldElement.find(":radio:first").attr("checked") === false) {
                this.isValid = true;
            }
            if (this.$formFieldElement.parents(".amountWithRadio").length) {
                var $parentFormField = this.$formFieldElement.parents(".formField");
                var validationHandler = null;
                if ($parentFormField.length && this.$formFieldElement.find(":radio:first").is(":checked")) {
                    validationHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($parentFormField);
                    validationHandler = validationHandler.getChild(LBG.Forms.Validation.Tools.convertClassDetailsToData($parentFormField[0], "validationName:")[0]);
                    validationHandler.hideError();
                } else {
                    this.isValid = this.$formFieldElement.find(":radio:checked").length > 0;
                }
            }
            if (!this.isValid) {
                if (suppressError !== true) {
                    this.showError(name, details);
                }
                break;
            }
        }
    },
    showError: function(validationRoutineName, validationRoutineDetails) {
        validationRoutineDetails = validationRoutineDetails || {};
        var $formFieldRow = this.$formFieldElement.parents(".formFieldRow");
        var $formFieldTable = this.$formFieldElement.children(".formFieldTable");
        var IsFormFieldAddress = this.$formFieldElement.hasClass("addressField");
        var $optionPanel = this.$formFieldElement.parents(".optionPanel").eq(0);
        var isFormFieldGroup = this.formFieldGroups.length;

        function appendErrorMessage($element, errorMessage) {
            if ((LBG.phoneNumbers) && (typeof(LBG.phoneNumbers.resize) === "function")) {
                LBG.phoneNumbers.resize();
            }
            if ((LBG.currencyFields) && (typeof(LBG.currencyFields.resize) === "function")) {
                LBG.currencyFields.resize();
            }
            if ($(".equalPanelHeights").length) {
                $(".equalPanelHeights .subPanel").css("height", "auto");
            }

            function appendError() {
                $element.append(errorMessage);
                if ($optionPanel.length && !isFormFieldGroup) {
                    LBG.equalisePanelHeights.init(true);
                }
            }
            if ($.browser.msie && $.browser.version < 7) {
                window.setTimeout(function() {
                    if ($element.find("span.error").length) {
                        $element.find("span.error").remove();
                    }
                    appendError();
                }, 30);
            } else {
                appendError();
            }
        }

        function prependErrorMessage($element, errorMessage) {
            if ($.browser.msie && $.browser.version < 7) {
                window.setTimeout(function() {
                    if ($element.find("span.error").length) {
                        $element.find("span.error").remove();
                    }
                    $element.prepend(errorMessage);
                }, 30);
            } else {
                $element.prepend(errorMessage);
            }
        }
        if (this.isShowingError === false) {
            var isInterstitial = this.$formFieldElement.parents(".interstitial").length;
            var isExpandingTable = this.$formFieldElement.parents(".expandingTable").length;
            if (this.$formFieldElement.parents("tr").length > 0 && !isInterstitial && !isExpandingTable) {
                this.$formFieldElement.parents("tr").addClass("error");
            } else {
                if ($.browser.msie && $.browser.version < 8 && $formFieldRow.length === 0) {
                    if ((this.$formFieldElement.next().hasClass("clearer")) === false) {
                        this.$formFieldElement.after('<div class="clearer"></div>');
                    }
                }
            }
            if ($formFieldRow.length > 0) {
                $formFieldRow.addClass("error");
                $formFieldRow.find(".formField").addClass("error");
            } else {
                if ($formFieldTable.length > 0) {
                    $formFieldTable.parent().addClass("groupedError");
                } else {
                    if (IsFormFieldAddress) {
                        if (validationRoutineName === "validateSwiftCompliantFields") {
                            this.$formFieldElement.addClass("swiftError");
                        } else {
                            this.$formFieldElement.addClass("groupedError");
                        }
                    } else {
                        if ($optionPanel.length && isFormFieldGroup) {
                            $optionPanel.addClass("optionPanelError");
                        } else {
                            this.$formFieldElement.addClass("error");
                        }
                    }
                }
            }
            var message = DI.lang.errorMessages.defaultFormFieldErrorMessages[validationRoutineName];
            if (validationRoutineDetails.msg) {
                message = Messages[validationRoutineDetails.msg];
            }
            if (validationRoutineDetails.radioMsg && this.$formFieldElement.find("input:radio:checked").length === 0) {
                message = Messages[validationRoutineDetails.radioMsg];
            }
            if (typeof message === "function") {
                message = message(validationRoutineDetails);
            }
            if (undefined != message && (message.match(/&#163;/g) || message.match(/&pound;/g))) {
                message = message.replace(/&pound;/g, "\u00A3");
                message = message.replace(/&#163;/g, "\u00A3");
            }
            $(this.errorMessage).empty().append(message);
            if ($formFieldRow.length > 0) {
                $formFieldRow.find("span.error").remove();
            } else {
                if ($optionPanel.length && isFormFieldGroup) {
                    $optionPanel.find("span.error").remove();
                } else {
                    this.$formFieldElement.find("span.error").remove();
                }
            }
            if (this.$formFieldElement.find("table").length > 0) {
                if ($formFieldTable.length > 0) {
                    prependErrorMessage(this.$formFieldElement, this.errorMessage);
                } else {
                    prependErrorMessage(this.$formFieldElement.find("div.formFieldInner"), this.errorMessage);
                }
            } else {
                if ($formFieldRow.length > 0) {
                    if ($formFieldRow.parents(".balanceTransfer").length && $formFieldRow.find(".expiryDateField").length) {
                        appendErrorMessage($formFieldRow, this.errorMessage);
                    } else {
                        appendErrorMessage($formFieldRow.children("div.formField:last").find("div.formFieldInner"), this.errorMessage);
                    }
                } else {
                    if ($optionPanel.length && isFormFieldGroup) {
                        prependErrorMessage($optionPanel, this.errorMessage);
                    } else {
                        if (this.$formFieldElement.parents(".chooseAccount").length > 0) {
                            prependErrorMessage(this.$formFieldElement.find("div.formFieldInner"), this.errorMessage);
                        } else {
                            if (this.$formFieldElement.hasClass(".groupedError") || this.$formFieldElement.hasClass(".swiftError")) {
                                if (this.$formFieldElement.find(":input:not(input[type=hidden])").length > 0) {
                                    $(this.errorMessage).insertAfter(this.$formFieldElement.find(":input:not(input[type=hidden]):first"));
                                } else {
                                    appendErrorMessage(this.$formFieldElement.find("div.formFieldInner"), this.errorMessage);
                                }
                            } else {
                                if (this.$formFieldElement.find("div.formFieldInner").find(":last").css("clear") === "left") {
                                    var $lastClrLeft = this.$formFieldElement.find("div.formFieldInner").find("p:last");
                                    appendErrorMessage(this.$formFieldElement.find("div.formFieldInner"), this.errorMessage);
                                    if ($lastClrLeft.hasClass("close") === false) {
                                        $lastClrLeft.clone(true).insertAfter(this.$formFieldElement.find("div.formFieldInner").find("span.error:last"));
                                        $lastClrLeft.remove();
                                    }
                                } else {
                                    if (this.$formFieldElement.find("div.formFieldInner:first .date").length > 0 && this.$formFieldElement.find("div.formFieldInner:first input:radio").length == 0) {
                                        appendErrorMessage(this.$formFieldElement.find("div.formFieldInner:first .date:first"), this.errorMessage);
                                    } else {
                                        appendErrorMessage(this.$formFieldElement.find("div.formFieldInner:first"), this.errorMessage);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.$formFieldElement.hasClass(".quickTransferInner")) {
                $("h2.success").html(DI.lang.quickTransfer.defaultHeadingText).removeClass("success");
            }
            if ($.browser.msie) {
                LBG.common.explorerRedrawFix(this.$formFieldElement[0]);
            }
            this.isShowingError = true;
            this.$formFieldElement.trigger({
                type: "error"
            });
        }
    },
    hideError: function() {
        var hasTextAlertInputs = this.$formFieldElement.parents("table").hasClass("textAlertInputs");
        var $optionPanel = this.$formFieldElement.parents(".optionPanel").eq(0);
        if (this.isShowingError === false && this.$formFieldElement.parents("fieldset.balanceTransfer").length) {
            var $thisRow = this.$formFieldElement.parents(".formFieldRow"),
                $otherRows = this.$formFieldElement.parents("fieldset.balanceTransfer").find(".formFieldRow").not($thisRow);
            var getCardNumber = function($row) {
                return $row.find(".formField:eq(0) input:text").val();
            };
            var totalRowsMatchingCardNumber = function(num) {
                return $otherRows.find(".formField:eq(0) input:text[value=" + num + "]").length;
            };
            if (totalRowsMatchingCardNumber(getCardNumber($thisRow)) > 0) {
                this.isShowingError = false;
            } else {
                this.isShowingError = true;
                if (typeof this.validationRoutines.validateUnique !== "undefined") {
                    $otherRows.each(function() {
                        if (totalRowsMatchingCardNumber(getCardNumber($(this))) < 2) {
                            var handler = LBG.Forms.Validation.Tools.getValidationHandlerObject($(this).find(".formField:eq(0)"));
                            $(this).removeClass("error");
                            $(this).find(".formField").removeClass("error");
                            $(this).find("span.error").text("").remove();
                            handler.isShowingError = false;
                        }
                    });
                }
            }
        }
        if (this.isShowingError === true || hasTextAlertInputs) {
            var $formFieldRow = this.$formFieldElement.parents(".formFieldRow"),
                $formFieldParentTR = this.$formFieldElement.parents("tr"),
                $formFieldTable = this.$formFieldElement.parents(".formFieldTable"),
                $formFieldTableChild = this.$formFieldElement.children(".formFieldTable"),
                IsFormFieldAddress = this.$formFieldElement.hasClass("addressField");
            var $row = this.$formFieldElement.parents("tr");
            if (hasTextAlertInputs && $row.length && $row.find(":checkbox").is(":checked") && $row.find("select").length === 0) {
                var $ckb = $row.find(":checkbox"),
                    $txt = $row.find(":text"),
                    $ckbFormField = $ckb.parents(".formField"),
                    $txtFormField = $txt.parents(".formField");
                var txtHandler = LBG.Forms.Validation.Tools.getFieldHandler($txtFormField[0]),
                    validationHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($ckb);
                if (!txtHandler) {
                    validationHandler.add(new LBG.Forms.Validation.FormField($txtFormField[0]));
                    txtHandler = LBG.Forms.Validation.Tools.getFieldHandler($txtFormField[0]);
                }
                if ($txt.val() !== "") {
                    txtHandler.validate();
                    if (txtHandler.isValid) {
                        $ckbFormField.removeClass("error");
                        $txtFormField.removeClass("error");
                        $ckbFormField.find("span.error").text("").remove();
                        $txtFormField.find("span.error").text("").remove();
                        $row.removeClass("error");
                    }
                    LBG.common.explorerRedrawFix(this.$formFieldElement[0]);
                    this.isShowingError = false;
                }
                return;
            } else {
                if ($formFieldParentTR.length > 0) {
                    this.$formFieldElement.removeClass("error");
                    console.log(this.$formFieldElement);
                    this.$formFieldElement.parents("fieldset").removeClass("error");
                    this.$formFieldElement.find("span.error").text("").remove();
                    if ($formFieldParentTR.find("span.error").length === 0) {
                        $formFieldParentTR.removeClass("error");
                    }
                    if ($formFieldTable.length > 0) {
                        $formFieldTable.parent(".formField").removeClass("groupedError");
                    }
                } else {
                    if ($formFieldRow.length > 0) {
                        $formFieldRow.removeClass("error");
                        $formFieldRow.find(".formField").removeClass("error");
                        $formFieldRow.find("span.error").text("").remove();
                    } else {
                        if ($optionPanel.length && this.formFieldGroups.length) {
                            $optionPanel.removeClass("optionPanelError");
                            $optionPanel.find("> span.error").text("").remove();
                        } else {
                            this.$formFieldElement.removeClass("error");
                            if ($formFieldTableChild.length > 0) {
                                this.$formFieldElement.removeClass("groupedError");
                                this.$formFieldElement.find(".formField").removeClass("error");
                            }
                            if (IsFormFieldAddress) {
                                this.$formFieldElement.removeClass("groupedError");
                                this.$formFieldElement.removeClass("swiftError");
                            }
                        }
                    }
                }
            }
            $(this.errorMessage).text("").remove();
            if (this.$formFieldElement.find("span.error").length > 0) {
                this.$formFieldElement.find("span.error").text("").remove();
            }
            if ($.browser.msie) {
                var pullOutElement = jQuery.find(".pullOut")[0];
                if (pullOutElement !== undefined) {
                    var focal = jQuery(document.activeElement);
                    pullOutElement.style.display = "none";
                    pullOutElement.style.display = "block";
                    focal.focus();
                }
            }
            LBG.common.explorerRedrawFix(this.$formFieldElement[0]);
            this.isShowingError = false;
        }
    }
};
LBG.Forms.Validation.FormFieldGroup = function(formFieldGroupName, formFieldObject, routine, meta) {
    this.name = formFieldGroupName;
    this.members = [formFieldObject];
    this.isValid = false;
    this.isShowingError = false;
    this.routine = routine;
    this.meta = meta;
};
LBG.Forms.Validation.FormFieldGroup.prototype = {
    validate: function(suppressError) {
        this.isValid = true;
        if (!this.ready()) {
            return this.isValid;
        }
        var inputs = [];
        var that = this;
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].validate(suppressError);
            if (this.members[i].isValid) {
                inputs.push(this.members[i].$formFieldElement);
            } else {
                this.isValid = false;
                break;
            }
        }
        if (inputs.length === this.members.length) {
            this.isValid = LBG.Forms.Validation.Routines[this.routine](inputs, this.meta);
            if (!this.isValid && suppressError !== true) {
                this.showError(this.routine, this.meta);
            }
        }
        return this.isValid;
    },
    hideError: function() {
        for (var i = 0, len = this.members.length; i < len; i++) {
            this.members[i].hideError();
        }
        this.isShowingError = false;
    },
    showError: function(errorName, validationRoutineDetails) {
        for (var i = 0, len = this.members.length; i < len; i++) {
            if (errorName === "conditionalRequiredGroup" || errorName === "telephoneBankingGroup") {
                if (!LBG.Forms.Validation.Routines.required(this.members[i].$formFieldElement)) {
                    this.members[i].showError(errorName, validationRoutineDetails);
                }
            } else {
                this.members[i].showError(errorName, validationRoutineDetails);
            }
        }
        this.isShowingError = true;
    },
    add: function(formFieldObject) {
        this.members.push(formFieldObject);
    },
    remove: function(memberName) {
        var removeCompleted = false;
        for (var i = 0, len = this.members.length; i < len; i++) {
            if (this.members[i] instanceof LBG.Forms.Validation.FormField && this.members[i].name === memberName) {
                this.members.splice(i, 1);
                removeCompleted = true;
            }
        }
        return removeCompleted;
    },
    ready: function() {
        var ready = true;

        function check_ready() {
            ready = ready && this.ready;
            return ready;
        }
        for (var i = 0; ready && i < this.members.length; ++i) {
            this.members[i].$formFieldElement.find("input:live, select:live").each(check_ready);
        }
        return ready;
    }
};
LBG.Forms.DatePickerConverter = {
    init: function() {
        if (LBG.browserIdent.browserIdent !== "iPad" && $.browser.msie === false || ($.browser.msie === true && $.browser.version >= 7)) {
            $('input.datePicker[type="hidden"]').each(function() {
                var $datePicker = $("<input />").attr({
                    type: "text",
                    name: this.name,
                    id: this.id,
                    autocomplete: "off"
                }).addClass(this.className);
                $(this).replaceWith($datePicker);
            });
        }
    }
};
$(document).ready(function() {
    LBG.Forms.DatePickerConverter.init();
    LBG.Forms.Validation.init();
});
LBG.Forms.Validation.Routines = {
    validateAccountNumber: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, value) && this.validateLength($formFieldElement, {
                min: 8,
                max: 8
            })) {
            isValid = true;
        }
        return isValid;
    },
	validateCardNumber: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, value) && this.validateLength($formFieldElement, {
                min: 16,
                max: 16
            })) {
            isValid = true;
        }
        return isValid;
    },
    validatePassCode: function($formFieldElement) {
        var isValid = true;
        var $inputElement = $formFieldElement.find("input:text:first");
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.passCode, $inputElement.val()) === false) {
            isValid = false;
        }
        return isValid;
    },    
	validatememo: function($formFieldElement) {
        var isValid = true;
        var $inputElement = $formFieldElement.find("input:text");
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.memo, $inputElement.val()) === false) {
            isValid = false;
        }
        return isValid;
    },
    validateAlphaNumeric: function($formFieldElement) {
        var isValid = false;
        var $inputElements = $formFieldElement.find("input").filter(":text, :password");
        var validElements = 0,
            value;
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            value = $inputElements[i].value;
            if (value.length > 0) {
                if ($formFieldElement.hasClass("addressField")) {
                    if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericAddress, value)) {
                        validElements++;
                    }
                } else {
                    if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumeric, value)) {
                        validElements++;
                    }
                }
            } else {
                validElements++;
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        return isValid;
    },
    validateAlphaNumericWithHypensAndSpaces: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        var successfulRegExpValidation = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericWithHypensAndSpaces, value);
        var checkNoStartWithSpace = this.simpleRegexTest(LBG.Forms.Validation.Expressions.noStartWithSpace, value);
        isValid = successfulRegExpValidation && checkNoStartWithSpace;
        return isValid;
    },
    validateAlphaNumericWithSpaces: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        var successfulRegExpValidation = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericWithSpaces, value);
        var checkNoStartWithSpace = this.simpleRegexTest(LBG.Forms.Validation.Expressions.noStartWithSpace, value);
        isValid = successfulRegExpValidation && checkNoStartWithSpace;
        return isValid;
    },
    validateAlphaWithSpaces: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaWithSpaces, value);
        return isValid;
    },
    validateAlpha: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alpha, value);
        return isValid;
    },
    validateContainsAlphaAndNumeric: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        var regEx = LBG.Forms.Validation.Expressions.containsAlphaAndNumeric;
        isValid = (this.simpleRegexTest(regEx.alpha, value) && this.simpleRegexTest(regEx.numeric, value));
        return isValid;
    },
    validateNumericPercentage: function($formFieldElement) {
        var isValid = false;
        var percent = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.percentage, percent)) {
            isValid = true;
        }
        return isValid;
    },
    validateName: function($formFieldElement) {
        var isValid = false;
        var result = /\S/.test($formFieldElement.find("input:text").val());
        if (result === true) {
            isValid = true;
        }
        return isValid;
    },
    validateCreditCard: function($formFieldElement) {
        var isValid = false;
        var cardNumber;
        if ($formFieldElement.hasClass(".formField")) {
            cardNumber = $formFieldElement.find("input:text").val();
        } else {
            cardNumber = $formFieldElement.val();
        }
        cardNumber = cardNumber.replace(/\D/g, "");
        var seemsLikeValidCardNumber = this.simpleRegexTest(LBG.Forms.Validation.Expressions.cardNumber, cardNumber);
        if (seemsLikeValidCardNumber === true) {
            var cardNumber_length = cardNumber.length;
            var parity = cardNumber_length % 2;
            for (var i = 0, total = 0; i < cardNumber_length; i++) {
                var digit = cardNumber.charAt(i);
                if (i % 2 === parity) {
                    digit = digit * 2;
                    if (digit > 9) {
                        digit = digit - 9;
                    }
                }
                total = total + parseInt(digit, 10);
            }
            if (total % 10 === 0) {
                isValid = true;
            }
        }
        return isValid;
    },
    validateDateRestriction: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        if (this.validDate($formFieldElement)) {
            isValid = true;
        }
        if (isValid === true) {
            var dd = $formFieldElement.find(".day")[0].value;
            var mm = $formFieldElement.find(".month")[0].value;
            var yyyy = $formFieldElement.find(".year")[0].value;
            var dateEntered = new Date(yyyy, mm - 1, dd);
            var daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            var dayOfWeekEntered = daysOfWeek[dateEntered.getDay()];
            var monthsOfYear = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            var monthOfYearEntered = monthsOfYear[parseInt(mm - 1, 10)];
            var i, len;
            if (validationRoutineDetails.invalidDays !== undefined) {
                if (typeof validationRoutineDetails.invalidDays === "string") {
                    validationRoutineDetails.invalidDays = [validationRoutineDetails.invalidDays];
                }
                for (i = 0, len = validationRoutineDetails.invalidDays.length; i < len; i++) {
                    var validationRoutineDetailsSplit = validationRoutineDetails.invalidDays[i].split("-");
                    if (yyyy === validationRoutineDetailsSplit[0] && mm === validationRoutineDetailsSplit[1] && dd === validationRoutineDetailsSplit[2]) {
                        isValid = false;
                        break;
                    }
                }
            }
            if (validationRoutineDetails.invalidDaysOfWeek !== undefined && isValid === true) {
                if (typeof validationRoutineDetails.invalidDaysOfWeek === "string") {
                    validationRoutineDetails.invalidDaysOfWeek = [validationRoutineDetails.invalidDaysOfWeek];
                }
                for (i = 0, len = validationRoutineDetails.invalidDaysOfWeek.length; i < len; i++) {
                    if (dayOfWeekEntered === validationRoutineDetails.invalidDaysOfWeek[i]) {
                        isValid = false;
                        break;
                    }
                }
            }
            if (validationRoutineDetails.invalidMonths !== undefined && isValid === true) {
                if (typeof validationRoutineDetails.invalidMonths === "string") {
                    validationRoutineDetails.invalidMonths = [validationRoutineDetails.invalidMonths];
                }
                for (i = 0, len = validationRoutineDetails.invalidMonths.length; i < len; i++) {
                    if (monthOfYearEntered === validationRoutineDetails.invalidMonths[i]) {
                        isValid = false;
                        break;
                    }
                }
            }
        }
        return isValid;
    },
    validateDateTimeRange: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var isValidDate = false;
        if (this.validDate($formFieldElement)) {
            isValidDate = true;
        }
        var dd;
        if ($formFieldElement.find(".day").length < 1) {
            dd = validationRoutineDetails.minDate.split("-")[2];
        } else {
            dd = $formFieldElement.find(".day")[0].value;
        }
        var mm = $formFieldElement.find(".month")[0].value;
        var yyyy = $formFieldElement.find(".year")[0].value;
        var dateEntered = new Date(yyyy, mm - 1, dd);
        var convertDetailsToDate = function(details) {
            details = details.split("-");
            var yyyy = details[0];
            var mm = details[1];
            var dd = details[2];
            return new Date(yyyy, mm - 1, dd);
        };
        if (isValidDate === true) {
            var minDate, maxDate;
            if (validationRoutineDetails.minDate && validationRoutineDetails.maxDate === undefined) {
                minDate = convertDetailsToDate(validationRoutineDetails.minDate);
                if (dateEntered >= minDate) {
                    isValid = true;
                }
            } else {
                if (validationRoutineDetails.maxDate && validationRoutineDetails.minDate === undefined) {
                    maxDate = convertDetailsToDate(validationRoutineDetails.maxDate);
                    if (dateEntered <= maxDate) {
                        isValid = true;
                    }
                } else {
                    if (validationRoutineDetails.maxDate && validationRoutineDetails.minDate) {
                        minDate = convertDetailsToDate(validationRoutineDetails.minDate);
                        maxDate = convertDetailsToDate(validationRoutineDetails.maxDate);
                        if (dateEntered <= maxDate && dateEntered >= minDate) {
                            isValid = true;
                        }
                    } else {
                        if (validationRoutineDetails.maxDate === undefined && validationRoutineDetails.minDate === undefined) {
                            isValid = true;
                        }
                    }
                }
            }
        }
        return isValid;
    },
    validateDate: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        if (this.validDate($formFieldElement)) {
            isValid = true;
        }
        return isValid;
    },
    validateDoubleRange: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var isValidNumberWithTwoDecimalPlaces = false;
        var value;
        if ($formFieldElement.hasClass("formField")) {
            value = $formFieldElement.find("input:text").val();
        } else {
            value = $formFieldElement.val();
        }
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numberWithTwoDecimalPlaces, value)) {
            isValidNumberWithTwoDecimalPlaces = true;
        }
        if (isValidNumberWithTwoDecimalPlaces === true) {
            if (validationRoutineDetails !== undefined) {
                if (validationRoutineDetails.min && validationRoutineDetails.max === undefined && (value >= parseFloat(validationRoutineDetails.min))) {
                    isValid = true;
                } else {
                    if (validationRoutineDetails.max && validationRoutineDetails.min === undefined && (value <= parseFloat(validationRoutineDetails.max))) {
                        isValid = true;
                    } else {
                        if (validationRoutineDetails.max && validationRoutineDetails.min && (value >= parseFloat(validationRoutineDetails.min)) && (value <= parseFloat(validationRoutineDetails.max))) {
                            isValid = true;
                        } else {
                            if (validationRoutineDetails.max === undefined && validationRoutineDetails.min === undefined) {
                                isValid = true;
                            }
                        }
                    }
                }
            } else {
                isValid = isValidNumberWithTwoDecimalPlaces;
            }
        }
        return isValid;
    },
    validateEmail: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = (value.replace(new RegExp("[^@]", "g"), "").length === 1) ? true : false;
        if (isValid) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.emailAddress, value, "i");
        }
        return isValid;
    },
    validateEmailAddressOab: function($formFieldElement) {
        return LBG.Forms.Validation.Routines.validateEmail($formFieldElement);
    },
    validateLength: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            value = $formFieldElement.find("input").filter(":text, :password").val();
        if (validationRoutineDetails.multipleClass) {
            var classname = validationRoutineDetails.multipleClass.replace(/'/g, "");
            var meta = $formFieldElement.find(classname + ":checked").metadata();
            if (meta.min) {
                validationRoutineDetails.min = meta.min;
            }
            if (meta.max) {
                validationRoutineDetails.max = meta.max;
            }
            if (meta.fixed) {
                validationRoutineDetails.fixed = meta.fixed;
            }
            if (meta.range) {
                validationRoutineDetails.range = meta.range;
            }
        }
        if (validationRoutineDetails.fixed && (value.length === parseInt(validationRoutineDetails.fixed, 10))) {
            isValid = true;
        }
        if (validationRoutineDetails.range) {
            for (var i = 0; i < validationRoutineDetails.range.length; i++) {
                if (value.length === parseInt(validationRoutineDetails.range[i], 10)) {
                    isValid = true;
                    break;
                }
            }
        }
        if (validationRoutineDetails.min && validationRoutineDetails.max === undefined && (value.length >= parseInt(validationRoutineDetails.min, 10))) {
            isValid = true;
        } else {
            if (validationRoutineDetails.max && validationRoutineDetails.min === undefined && (value.length <= parseInt(validationRoutineDetails.max, 10))) {
                isValid = true;
            } else {
                if (validationRoutineDetails.max && validationRoutineDetails.min && (value.length >= parseInt(validationRoutineDetails.min, 10)) && (value.length <= parseInt(validationRoutineDetails.max, 10))) {
                    isValid = true;
                }
            }
        }
        return isValid;
    },
    validateLongRange: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var isValidNumber = false;
        var value = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, value)) {
            isValidNumber = true;
        }
        if (isValidNumber === true) {
            if (validationRoutineDetails.min && validationRoutineDetails.max === undefined && (value >= parseInt(validationRoutineDetails.min, 10))) {
                isValid = true;
            } else {
                if (validationRoutineDetails.max && validationRoutineDetails.min === undefined && (value <= parseInt(validationRoutineDetails.max, 10))) {
                    isValid = true;
                } else {
                    if (validationRoutineDetails.max && validationRoutineDetails.min && (value >= parseInt(validationRoutineDetails.min, 10)) && (value <= parseInt(validationRoutineDetails.max, 10))) {
                        isValid = true;
                    } else {
                        if (validationRoutineDetails.max === undefined && validationRoutineDetails.min === undefined) {
                            isValid = true;
                        }
                    }
                }
            }
        }
        return isValid;
    },
    validatePhoneNumber: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            fullValue = "",
            $inputElements, isInternational = false,
            hasExtension = false,
            isMobileNumber = validationRoutineDetails.isMobileNumber,
            validateIfNotModified = validationRoutineDetails.validateIfNotModified,
            values = [],
            blank = true,
            isSpecialChar = validationRoutineDetails.isSpecialChar;
        if (isMobileNumber !== undefined) {
            isMobileNumber = isMobileNumber.replace(/\W/g, "");
        }
        if ($formFieldElement.hasClass("formField")) {
            $inputElements = $formFieldElement.find("input:text");
            if ($inputElements.length > 1) {
                if ($($inputElements[0]).hasClass("intDialCode")) {
                    isInternational = true;
                }
                if ($($inputElements[$inputElements.length - 1]).hasClass("extension") && ($inputElements[$inputElements.length - 1].value.length > 0)) {
                    hasExtension = true;
                }
                $inputElements.each(function(i) {
                    blank = blank && (/^\s*$/.test(this.value) || (i === 0 && isInternational && new RegExp("^\\s*" + DI.defaultCountryCode + "\\s*$").test(this.value)));
                    values.push(this.value);
                });
                if (isInternational && /^\s*$/.test(values[0])) {
                    values[0] = DI.defaultCountryCode;
                }
                if (isSpecialChar !== undefined && isSpecialChar === "true") {
                    for (var i = 0; i < values.length; i++) {
                        values[i] = values[i].replace(/\(|\)|\+|\-|\s/g, "");
                    }
                }
                fullValue = values.join("-");
            } else {
                fullValue = $formFieldElement.find("input:text").val();
            }
        } else {
            fullValue = $formFieldElement.val();
        }
        fullValue = fullValue.replace(/\s/g, "");

        function groupSameAsInit() {
            if ($inputElements.length > 1 && LBG.Forms.Validation.InitialValues) {
                var sameAsInit = LBG.Forms.Validation.Tools.sameAsInit;
                for (var i = 0; i < $inputElements.length; i++) {
                    if (sameAsInit && !sameAsInit($inputElements[i])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
        if (!validateIfNotModified && groupSameAsInit()) {
            isValid = true;
            return isValid;
        }
        if (isInternational) {
            if (blank) {
                isValid = true;
            } else {
                if (isMobileNumber !== undefined && isMobileNumber === "true") {
                    isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.internationalMobilePhoneNumber, fullValue);
                } else {
                    if (hasExtension) {
                        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.internationalLandLinePhoneNumberWithExtension, fullValue);
                    } else {
                        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.internationalLandLinePhoneNumber, fullValue);
                    }
                }
            }
        } else {
            if (isMobileNumber !== undefined && isMobileNumber === "true") {
                isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.ukMobilePhoneNumber, fullValue);
            } else {
                if (hasExtension) {
                    isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.ukLandLinePhoneNumberWithExtension, fullValue);
                } else {
                    isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.ukLandLinePhoneNumber, fullValue);
                }
            }
        }
        return isValid;
    },
    validateFullPhoneNumber: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            fullValue = "",
            $inputElements, hasExtension = false,
            validateIfNotModified = validationRoutineDetails.validateIfNotModified,
            values = [];
        validationRoutineDetails = validationRoutineDetails || {};
        $.extend(validationRoutineDetails, {
            numberHasAsterisk: false
        });
        if ($formFieldElement.hasClass("formField")) {
            $inputElements = $formFieldElement.find("input:text");
            if ($inputElements.length > 1) {
                if ($($inputElements[$inputElements.length - 1]).hasClass("extension") && ($inputElements[$inputElements.length - 1].value.length > 0)) {
                    hasExtension = true;
                }
                $inputElements.each(function(i) {
                    if ($.trim(this.value) !== "") {
                        values.push(this.value);
                    }
                });
                fullValue = values.join("-");
            } else {
                fullValue = $formFieldElement.find("input:text").val();
            }
        } else {
            fullValue = $formFieldElement.val();
        }

        function groupSameAsInit() {
            if (LBG.Forms.Validation.InitialValues) {
                var sameAsInit = LBG.Forms.Validation.Tools.sameAsInit;
                for (var i = 0; i < $inputElements.length; i++) {
                    if (sameAsInit && !sameAsInit($inputElements[i])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
        if (!validateIfNotModified && groupSameAsInit()) {
            isValid = true;
            return isValid;
        }
        if (hasExtension) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.fullPhoneNumberWithExtension, fullValue);
        } else {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.fullPhoneNumber, fullValue);
        }
        if (fullValue.indexOf("*") !== -1) {
            validationRoutineDetails.numberHasAsterisk = true;
        }
        return isValid;
    },
    validateFullPhoneNumberWithPossibleSmsReminder: function($formFieldElement, validationRoutineDetails) {
        return LBG.Forms.Validation.Routines.validateFullPhoneNumber($formFieldElement, validationRoutineDetails);
    },
    validatePostcode: function($formFieldElement, opts) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val().toUpperCase();
        var $addressFinder = $formFieldElement.parents("fieldset.addressFinder");
        var $groupFormFields = [];
        var formValidationHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($formFieldElement);
        var fieldValidationHandler = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement);
        var countryValidationHandler;
        var members;
        var meta;
        var id;
        opts = opts || {};
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.postcode, value);
        if (isValid && $addressFinder.length && formValidationHandler.formSubmitTriggered) {
            if ($addressFinder.find("div.postcodeFinder").is(":visible") && $addressFinder.find("div.selectAddress").is(":hidden")) {
                isValid = false;
                $.extend(opts, {
                    addressFinder: !isValid
                });
            }
        }
        if ($formFieldElement.hasClass("postcodeTrim")) {
            value = $.trim(value);
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.postcode, value);
            $formFieldElement.find(".postcode").val(value);
        }
        var countrySelector = $formFieldElement.prev().find(".countrySelectReg");
        if ($(countrySelector).val() && $(countrySelector).val() != "United Kingdom") {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericWithSpaces, value);
        }
        return isValid;
    },
    validateRegExp: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var inputs = $formFieldElement.find("input:text, input:password");
        var re = RegExps[validationRoutineDetails.exp];
        if (inputs.length === 1) {
            isValid = this.simpleRegexTest(re, inputs[0].value);
        } else {
            var validInputs = 0;
            for (var i = 0, len = inputs.length; i < len; i++) {
                if (this.simpleRegexTest(re, inputs[i].value)) {
                    validInputs++;
                }
            }
            if (validInputs === len) {
                isValid = true;
            }
        }
        return isValid;
    },
    validateSortcode: function($formFieldElement) {
        var isValid = true;
        var $inputElements = $formFieldElement.find("input:text");
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.sortCode, $inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    validateBankingGroupSortCode: function($formFieldElement, validationRoutineDetails) {
        var isValid = true,
            $inputElements = $formFieldElement.find("input:text"),
            accountType = validationRoutineDetails.accountType.toLowerCase();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.bankingGroupSortCode[accountType], $inputElements[0].value) === false) {
            isValid = false;
            return isValid;
        }
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.sortCode, $inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    required: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            formFieldChildInputs = [],
            containsTextInput = [],
            containsCheckInput = [],
            containsRadioInput = [],
            containsSelectInput = [],
            validElements = 0,
            textInputIsValid = false,
            checkInputIsValid = false,
            radioInputIsValid = false,
            selectInputIsValid = false,
            formValidationHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($formFieldElement),
            fieldValidationHandler = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement),
            id, members, meta, countryValidationHandler, allChecked = (validationRoutineDetails && validationRoutineDetails.allChecked) ? validationRoutineDetails.allChecked : false;
        allChecked = Boolean(allChecked);
        $formFieldElement.find("input").removeClass("validated");
        $formFieldElement.find("select").removeClass("validated");
        $formFieldElement.find("input:live").each(function(i) {
            formFieldChildInputs.push(this);
        });
        $formFieldElement.find("select:live").each(function(i) {
            formFieldChildInputs.push(this);
        });
        for (var i = 0, len = formFieldChildInputs.length; i < len; i++) {
            var $formFieldChildInput = jQuery(formFieldChildInputs[i]);
            if ($formFieldChildInput.hasClass("optional") || ($formFieldChildInput.hasClass("datePicker") && $formFieldChildInput.parents(".formField.dateRange").find("input:radio").is(":checked") === false)) {
                break;
            }
            switch ($formFieldChildInput.attr("type")) {
                case "text":
                case "password":
                case "textarea":
                    containsTextInput.push($formFieldChildInput);
                    break;
                case "checkbox":
                    containsCheckInput.push($formFieldChildInput);
                    break;
                case "radio":
                    containsRadioInput.push($formFieldChildInput);
                    break;
                case "select-one":
                    containsSelectInput.push($formFieldChildInput);
                    break;
            }
        }
        if ($formFieldElement.hasClass("dynconOrder")) {
            if ($formFieldElement.closest("fieldset").find(".dynconSelection").length > 0) {
                var $dynconCountryValidate = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement.closest("fieldset").find(".dynconSelection")[0]);
                $dynconCountryValidate.validate();
                if (!$dynconCountryValidate.isValid) {
                    return true;
                }
            }
        }
        if (containsTextInput.length > 0) {
            if ($formFieldElement.hasClass("addressField")) {
                for (i = 0, len = 1; i < len; i++) {
                    if (containsTextInput[i].val().length > 0) {
                        validElements++;
                    }
                }
            } else {
                var sameAsInit = LBG.Forms.Validation.Tools.sameAsInit;
                for (i = 0, len = containsTextInput.length; i < len; i++) {
                    var input = containsTextInput[i],
                        parent = input.closest(".formField");
                    if (sameAsInit && !sameAsInit(input.attr("id")) && !(/validateOnlyIfModified:true/.test(parent.attr("class"))) && input.val().length > 0) {
                        validElements++;
                    }
                }
            }
            if ($formFieldElement.parents(".amountGroup").length > 0 && !$formFieldElement.find("input:radio").get(0).checked) {
                textInputIsValid = true;
            } else {
                if (validElements === len) {
                    textInputIsValid = true;
                }
            }
        } else {
            textInputIsValid = true;
        }
        if (textInputIsValid === true && containsCheckInput.length > 0 && allChecked === false) {
            validElements = 0;
            for (i = 0, len = containsCheckInput.length; i < len; i++) {
                if (containsCheckInput[i].attr("checked")) {
                    validElements++;
                }
            }
            if (validElements > 0) {
                checkInputIsValid = true;
            }
        } else {
            if (textInputIsValid === true && containsCheckInput.length > 0 && allChecked === true) {
                var validElements = 0;
                for (i = 0, len = containsCheckInput.length; i < len; i++) {
                    if (containsCheckInput[i].attr("checked")) {
                        validElements++;
                    }
                }
                if (containsCheckInput.length === validElements) {
                    checkInputIsValid = true;
                }
            } else {
                checkInputIsValid = true;
            }
        }
        if ((checkInputIsValid === true && containsRadioInput.length > 0)) {
            if (($formFieldElement.parents("ul.dateGroup").length > 0 && !$formFieldElement.find("input:radio").get(0).checked) || ($formFieldElement.parents(".amountGroup").length > 0 && !$formFieldElement.find("input:radio").get(0).checked)) {
                radioInputIsValid = true;
            } else {
                validElements = 0;
                for (i = 0, len = containsRadioInput.length; i < len; i++) {
                    if (containsRadioInput[i].attr("checked") && containsRadioInput[i].val() !== "-") {
                        validElements++;
                    }
                }
                if (validElements > 0) {
                    radioInputIsValid = true;
                }
            }
        } else {
            radioInputIsValid = true;
        }
        if (radioInputIsValid === true && containsSelectInput.length > 0) {
            validElements = 0;
            for (i = 0, len = containsSelectInput.length; i < len; i++) {
                if (containsSelectInput[i].val() !== "-" && containsSelectInput[i].val() !== null) {
                    validElements++;
                }
            }
            if ($formFieldElement.parents("ul.dateGroup").length > 0 && !$formFieldElement.find("input:radio").get(0).checked) {
                selectInputIsValid = true;
            } else {
                if (validElements === len) {
                    selectInputIsValid = true;
                }
            }
        } else {
            selectInputIsValid = true;
        }
        if (textInputIsValid === true && checkInputIsValid === true && radioInputIsValid === true && selectInputIsValid === true) {
            isValid = true;
        }
        return isValid;
    },
    requiredWithCheckbox: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            inputElement = $formFieldElement.find("input:text"),
            siblingCheckboxElement = $formFieldElement.next(".formField").find('input[type="checkbox"]').get(0);
        if (siblingCheckboxElement && siblingCheckboxElement.checked) {
            isValid = this.required($formFieldElement, validationRoutineDetails);
        } else {
            isValid = true;
        }
        return isValid;
    },
    requiredWithPrecedingCheckbox: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var inputElement = $formFieldElement.find("input:text");
        var siblingCheckboxElement = $formFieldElement.parents("fieldset").find('input[type="checkbox"]');
        if (siblingCheckboxElement.get(0).checked) {
            isValid = this.required($formFieldElement, validationRoutineDetails);
        } else {
            isValid = true;
        }
        return isValid;
    },
    requiredWithBalanceAlert: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var accountChecked = false;
        var $balanceAlertCheckboxes = jQuery("table.balanceAlerts").find("input:checkbox");
        isCheckedLoop: for (var i = 0, len = $balanceAlertCheckboxes.length; i < len; i++) {
            if ($balanceAlertCheckboxes[i].checked) {
                accountChecked = true;
                break isCheckedLoop;
            }
        }
        if (accountChecked) {
            isValid = this.required($formFieldElement, validationRoutineDetails);
        } else {
            isValid = true;
        }
        return isValid;
    },
    requiredWithBusinessSortcode: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            $siblinginputElement = $formFieldElement.parents("fieldset").find(".sortCode");
        if (this.validateSortcode($siblinginputElement)) {
            isValid = this.required($formFieldElement, validationRoutineDetails);
        } else {
            isValid = true;
        }
        return isValid;
    },
    requiredWithSelectedValues: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var selector = "select.linkedSelect";
        var $parent = $formFieldElement.parents("form");
        var $input = $formFieldElement.find("input:text");
        var $select;
        var checkRequired = function() {
            var isRequired = $select.find("option:selected").hasClass("required");
            if (isRequired) {
                isValid = LBG.Forms.Validation.Routines.required($formFieldElement);
                if (!isValid) {
                    LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement).showError("required");
                }
            } else {
                isValid = true;
                if ($input.val() === "") {
                    LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement).hideError();
                }
            }
        };
        if ($formFieldElement.prev().find(selector).length) {
            $parent = $formFieldElement.parents(".formFieldRow");
        }
        if (typeof validationRoutineDetails.trigger !== "undefined") {
            $select = $parent.find(validationRoutineDetails.trigger);
        } else {
            $select = $parent.find(selector);
        }
        if (!$input.length || !$select.length) {
            return;
        }
        $select.bind("change.requiredWithSelectedValues", checkRequired);
        checkRequired();
        return isValid;
    },
    requiredWithValue: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var $thisInput = $formFieldElement.find("input:text, select");
        var $linkInput = $formFieldElement.parents("form").find(validationRoutineDetails.target);

        function hasValue($elm) {
            if ($elm[0].tagName.toLowerCase() === "select") {
                return $elm.val() !== "-";
            } else {
                return $elm.val().length > 0;
            }
        }
        if (hasValue($linkInput)) {
            isValid = this.required($formFieldElement, validationRoutineDetails);
        } else {
            if (hasValue($thisInput) && !hasValue($linkInput)) {
                LBG.Forms.Validation.Tools.getFieldHandler($linkInput[0]).validate();
            }
        }
        if (!hasValue($thisInput) && !hasValue($linkInput)) {
            LBG.Forms.Validation.Tools.getFieldHandler($thisInput[0]).hideError();
            LBG.Forms.Validation.Tools.getFieldHandler($linkInput[0]).hideError();
        }
        return isValid;
    },
    validDate: function($formFieldElement) {
        var isValid = true;
        var dd;
        if ($formFieldElement.find(".day").length < 1) {
            dd = 1;
        } else {
            dd = $formFieldElement.find(".day")[0].value;
        }
        var mm = $formFieldElement.find(".month").val();
        var yyyy = $formFieldElement.find(".year").val();
        if (dd === "-" || mm === "-" || yyyy === "-") {
            isValid = false;
        }
        if ($formFieldElement.hasClass("expiryDateField")) {
            yyyy = "20" + yyyy;
        }
        var demoDate = new Date(yyyy, mm - 1, dd);
        if (parseInt(dd, 10) !== demoDate.getDate() || parseInt(mm, 10) - 1 !== demoDate.getMonth() || parseInt(yyyy, 10) !== demoDate.getFullYear()) {
            isValid = false;
        }
        return isValid;
    },
    validateDatesRelativeRange: function($formFields, validationRoutineDetails) {
        var isValid = true;
        var datesEntered = [];
        var getDate = function($formField) {
            var dd = $formField.find(".day")[0].value;
            var mm = $formField.find(".month")[0].value;
            var yyyy = $formField.find(".year")[0].value;
            return new Date(yyyy, mm - 1, dd);
        };
        for (var i = 0, len = $formFields.length; i < len; i++) {
            datesEntered.push(getDate($formFields[i]));
        }
        if (datesEntered[1] < datesEntered[0]) {
            isValid = false;
        }
        if (validationRoutineDetails !== undefined && validationRoutineDetails.maxRangeInMonths !== undefined) {
            datesEntered[0].setMonth(parseInt(datesEntered[0].getMonth(), 10) + parseInt(validationRoutineDetails.maxRangeInMonths, 10));
            if (datesEntered[1] > datesEntered[0]) {
                isValid = false;
            }
        }
        return isValid;
    },
    simpleRegexTest: function(regExp, value, params) {
        var r;
        if (params !== undefined) {
            r = new RegExp(regExp, params);
        } else {
            r = new RegExp(regExp);
        }
        return r.test(value);
    },
    amountBetween: function($formFieldElement) {
        var isValid = false;
        var value;
        if ($formFieldElement.find("input:radio").attr("checked")) {
            var inputBoxes = $formFieldElement.find("input:text");
            var inputBoxValues = [];
            for (var i = 0, len = inputBoxes.length; i < len; i++) {
                value = inputBoxes[i].value;
                value = value.replace(new RegExp(",", "g"), "");
                value = value.replace(new RegExp("\\.", "g"), "");
                inputBoxValues.push(parseInt(value, 10));
            }
            if (inputBoxValues[0] < inputBoxValues[1]) {
                isValid = true;
            }
        }
        return isValid;
    },
    specificDateWithRadio: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        if ($formFieldElement.find("input:radio").attr("checked")) {
            isValid = this.validateDateTimeRange($formFieldElement, validationRoutineDetails);
        }
        return isValid;
    },
    validateInputForCountry: function($formFieldElement) {
        var isValid;
        var countryArray = [];
        if (countryData !== "" || typeof(countryData) !== "undefined") {
            $.each(countryData, function(index, value) {
                countryArray.push(countryData[index].country.toLowerCase());
            });
            if ($.inArray($formFieldElement.find("input:text").val().toLowerCase(), countryArray) > -1) {
                isValid = true;
            } else {
                isValid = false;
                $(".countryLookupResults p").hide();
            }
            return isValid;
        }
    },
    specificAmountWithRadio: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var $radioElement = $formFieldElement.find('input:checked[type="radio"]');
        var $inputElement = $formFieldElement.find("input:text");
        if ($radioElement.length !== 0) {
            isValid = this.validateCurrency($inputElement, validationRoutineDetails);
        }
        return isValid;
    },
    specificBicSwiftWithRadio: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var $radioElement = $formFieldElement.find('input:checked[type="radio"]');
        var $inputElement = $formFieldElement.find("input:text");
        if ($radioElement.length !== 0) {
            isValid = $inputElement.val() !== "";
        }
        return isValid;
    },
    cardNumberAndSecurityCode: function($formFields) {
        var isValid = false;
        var valuesEntered = [];
        for (var i = 0, len = $formFields.length; i < len; i++) {
            valuesEntered.push($formFields[i].find("input:text").val());
        }
        if (valuesEntered[0].replace(/\D/g, "").length === 16 && valuesEntered[1].length === 3) {
            isValid = true;
        } else {
            if (valuesEntered[0].replace(/\D/g, "").length === 15 && valuesEntered[1].length === 4) {
                isValid = true;
            }
        }
        return isValid;
    },
    cardSecurityCode: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.cardSecurityCode, value);
        return isValid;
    },
    accessCode: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.accessCode, value);
        return isValid;
    },
    validateNumeric: function($formFieldElement, opts) {
        var isValid = false,
            $inputElements, value = "";
        opts = opts || {};
        opts.formatValid = true;
        if ($formFieldElement.hasClass("formField")) {
            $inputElements = $formFieldElement.find("input:text, input:password");
        } else {
            if ($formFieldElement.parents(".dynamicConverter").length > 0) {
                $inputElements = $formFieldElement;
            } else {
                $inputElements = $formFieldElement.parents(".formField").find("input:text, input:password");
            }
        }
        if ($inputElements.length > 0) {
            $inputElements.each(function(i) {
                value += $inputElements[i].value;
            });
        } else {
            value = $inputElements.get(0).value;
        }
        isSpecialChar = opts.isSpecialChar;
        if (isSpecialChar !== undefined && isSpecialChar === "true") {
            value = value.replace(/\(|\)|\+|\-|\s/g, "");
        }
        if (value.length > 0) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, value);
        } else {
            isValid = true;
        }
        opts.formatValid = isValid;
        if (isValid && opts) {
            if (opts.min || opts.max) {
                isValid = !(opts.min && opts.min * 100 > value * 100 || opts.max && opts.max * 100 < value * 100);
            }
        }
        return isValid;
    },
    validateGreaterThanZero: function($formFieldElement) {
        var isValid = false;
        var $inputElements;
        var value = "";
        if ($formFieldElement.hasClass("formField")) {
            $inputElements = $formFieldElement.find("input:text, input:password");
        } else {
            if ($formFieldElement.parents(".dynamicConverter").length > 0) {
                $inputElements = $formFieldElement;
            } else {
                $inputElements = $formFieldElement.parents(".formField").find("input:text, input:password");
            }
        }
        if ($inputElements.length > 0) {
            $inputElements.each(function(i) {
                value += $inputElements[i].value;
            });
        } else {
            value = $inputElements.get(0).value;
        }
        if (value.length > 0) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, value);
            if (isValid) {
                if (value <= 0) {
                    isValid = false;
                }
            } else {
                isValid = true;
            }
        } else {
            isValid = true;
        }
        return isValid;
    },
    validateNumericWithSpaces: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        var successfulRegExpValidation = this.simpleRegexTest(LBG.Forms.Validation.Expressions.numericWithSpace, value);
        var checkNoStartWithSpace = this.simpleRegexTest(LBG.Forms.Validation.Expressions.noStartWithSpace, value);
        isValid = successfulRegExpValidation && checkNoStartWithSpace;
        return isValid;
    },
    validateNumericWithSpacesAndMask: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").filter(":text, :password").val();
        var successfulRegExpValidation = this.simpleRegexTest(LBG.Forms.Validation.Expressions.numericWithSpaceAndMask, value);
        var checkNoStartWithSpace = this.simpleRegexTest(LBG.Forms.Validation.Expressions.noStartWithSpace, value);
        isValid = successfulRegExpValidation && checkNoStartWithSpace;
        return isValid;
    },
    validateCardNumber: function($formFieldElement) {
        var isValid = false;
        var $inputElements;
        var value = "";
        if ($formFieldElement.hasClass("formField")) {
            $inputElements = $formFieldElement.find("input:text, input:password");
        } else {
            $inputElements = $formFieldElement.parents(".formField").find("input:text, input:password");
        }
        value = $inputElements.get(0).value;
        if (value.length > 0) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.cardNumberTail, value);
        } else {
            isValid = true;
        }
        return isValid;
    },
    textInputPairMatch: function($formFields) {
        var isValid = false,
            valuesEntered = [];
        for (var i = 0, len = $formFields.length; i < len; i++) {
            valuesEntered.push($formFields[i].find("input").filter(":text, :password, :visible").val());
        }
        if (!valuesEntered[1] || valuesEntered[0] === valuesEntered[1]) {
            isValid = true;
        }
        return isValid;
    },
    quickTransfer: function($formFieldElement, opts) {
        var isValid = false;
        $formFieldElement.find("input:text").removeClass("validated");
        $formFieldElement.find("select").removeClass("validated");
        opts = opts || {};
        var amountTextBox = $($formFieldElement.find("input:text")[0]);
        var accountFromSelect = $($formFieldElement.find("select")[0]);
        var accountToSelect = $($formFieldElement.find("select")[1]);
        var textBoxValuesValid = LBG.Forms.Validation.Routines.validateCurrency(amountTextBox, opts) && (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, amountTextBox.val()) || this.simpleRegexTest(LBG.Forms.Validation.Expressions.numberWithTwoDecimalPlaces, amountTextBox.val()));
        var accountFromSelectValid = (accountFromSelect.val() !== "-");
        var accountToSelectValid = (accountToSelect.val() !== "-");
        if (textBoxValuesValid) {
            amountTextBox.addClass("validated");
            if (accountFromSelectValid && accountToSelectValid) {
                isValid = true;
            }
        }
        $.extend(opts, {
            isText: (!textBoxValuesValid)
        });
        if (accountFromSelectValid) {
            accountFromSelect.addClass("validated");
        }
        if (accountToSelectValid) {
            accountToSelect.addClass("validated");
        }
        return isValid;
    },
    searchTransactionDateRange: function($formFieldElement, validationRoutineDetails) {
        var formFieldElements = $formFieldElement.find("div.inputGroup");
        var $formFieldElements = [];
        formFieldElements.each(function(i) {
            $formFieldElements[i] = jQuery(this);
        });
        var validDates = 0;
        var isValid = false;
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            if (this.validDate($formFieldElements[i])) {
                validDates++;
            }
        }
        if (validDates === len) {
            var datesInValidRange = 0;
            for (i = 0, len = $formFieldElements.length; i < len; i++) {
                if (this.validateDateTimeRange($formFieldElements[i], validationRoutineDetails)) {
                    datesInValidRange++;
                }
            }
            if (datesInValidRange === len) {
                return this.validateDatesRelativeRange($formFieldElements, validationRoutineDetails);
            }
        }
        return isValid;
    },
    validateDateRangeIsInRange: function($formFieldElement, validationRoutineDetails) {
        var formFieldElements = $formFieldElement.find("div.inputGroup");
        var $formFieldElements = [];
        formFieldElements.each(function(i) {
            $formFieldElements[i] = jQuery(this);
        });
        var isValid = true;
        var datesOutOfValidRange = 0;
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            if (!this.validateDateTimeRange($formFieldElements[i], validationRoutineDetails)) {
                datesOutOfValidRange++;
            }
        }
        if (datesOutOfValidRange === len) {
            isValid = false;
        }
        return isValid;
    },
    validateDatesAreInRange: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var datesInValidRange = 0;
        var formFieldElements = $formFieldElement.find("div.inputGroup");
        var $formFieldElements = [];
        formFieldElements.each(function(i) {
            $formFieldElements[i] = jQuery(this);
        });
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            if (this.validateDateTimeRange($formFieldElements[i], validationRoutineDetails)) {
                datesInValidRange++;
            }
        }
        if (datesInValidRange === len) {
            isValid = true;
        }
        return isValid;
    },
    validateDateRangeOrder: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var formFieldElements = $formFieldElement.find("div.inputGroup");
        var $formFieldElements = [];
        var datesEntered = [];
        formFieldElements.each(function(i) {
            $formFieldElements[i] = jQuery(this);
        });
        var getDate = function($formField) {
            var dd = $formField.find(".day")[0].value;
            var mm = $formField.find(".month")[0].value;
            var yyyy = $formField.find(".year")[0].value;
            return new Date(yyyy, mm - 1, dd);
        };
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            datesEntered.push(getDate($formFieldElements[i]));
        }
        if (datesEntered[1] < datesEntered[0] || (validationRoutineDetails.allowEqual === "false" && datesEntered[1] === datesEntered[0])) {
            isValid = false;
        }
        return isValid;
    },
    validateDateRange: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var formFieldElements = $formFieldElement.find("div.inputGroup");
        var $formFieldElements = [];
        var datesEntered = [];
        formFieldElements.each(function(i) {
            $formFieldElements[i] = jQuery(this);
        });
        var getDate = function($formField) {
            var dd = $formField.find(".day")[0].value;
            var mm = $formField.find(".month")[0].value;
            var yyyy = $formField.find(".year")[0].value;
            return new Date(yyyy, mm - 1, dd);
        };
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            datesEntered.push(getDate($formFieldElements[i]));
        }
        if (validationRoutineDetails !== undefined) {
            var inc = undefined !== validationRoutineDetails.maxRangeInMonthsInc;
            if (validationRoutineDetails.maxRangeInMonths !== undefined || inc) {
                var val = validationRoutineDetails.maxRangeInMonths || validationRoutineDetails.maxRangeInMonthsInc;
                datesEntered[0].setMonth(parseInt(datesEntered[0].getMonth(), 10) + parseInt(val, 10));
                if (!inc && datesEntered[1] >= datesEntered[0] || inc && datesEntered[1] > datesEntered[0]) {
                    isValid = false;
                }
            }
        }
        return isValid;
    },
    timeYearsMonths: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var validElements = 0;
        var inputElements = $formFieldElement.find("input:text");
        var years = parseInt(inputElements[0].value, 10);
        var months = parseInt(inputElements[1].value, 10);
        for (var i = 0, len = inputElements.length; i < len; i++) {
            var $inputElement = jQuery(inputElements[i]);
            if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, $inputElement.val())) {
                validElements++;
                if (i === 1 && parseInt($inputElement.val(), 10) > 11) {
                    validElements--;
                }
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        if (isValid && validationRoutineDetails.min && years < parseInt(validationRoutineDetails.min, 10)) {
            isValid = false;
        }
        if (isValid && validationRoutineDetails.max && (years > parseInt(validationRoutineDetails.max, 10) || (years === parseInt(validationRoutineDetails.max, 10) && months > 0))) {
            isValid = false;
        }
        return isValid;
    },
    timeYearsMonthsNotBothZero: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var validElements = 0;
        var inputElements = $formFieldElement.find("input:text");
        var years = parseInt(inputElements[0].value, 10);
        var months = parseInt(inputElements[1].value, 10);
        for (var i = 0, len = inputElements.length; i < len; i++) {
            var $inputElement = jQuery(inputElements[i]);
            if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.numeric, $inputElement.val())) {
                validElements++;
                if (i === 1 && parseInt($inputElement.val(), 10) > 11) {
                    validElements--;
                }
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        if (isValid && validationRoutineDetails.min && years < parseInt(validationRoutineDetails.min, 10)) {
            isValid = false;
        }
        if (isValid && validationRoutineDetails.max && (years > parseInt(validationRoutineDetails.max, 10) || (years === parseInt(validationRoutineDetails.max, 10) && months > 0))) {
            isValid = false;
        }
        if ((years === 0) && (months === 0)) {
            validationRoutineDetails.doubleZero = 1;
            isValid = false;
        }
        return isValid;
    },
    validatePhoneNumberExtension: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input.extension").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.ukPhoneNumberExtension, value);
        return isValid;
    },
    validateBalanceTransfer: function($formFieldElement, validationRoutineDetails) {
        var isValidAccount = false;
        var isValidDate = false;
        var isValidAmount = false;
        var isNullDate = false;
        var $formFields = $formFieldElement.parents(".formFieldRow").find(".formField");
        var $formFieldAccount = $formFields.eq(0);
        var $formFieldDate = $formFields.filter(".expiryDateField");
        var $formFieldAmount = $formFields.filter(".amountField");
        var $input;
        var formHandler;
        var fieldHandler;
        var value = "";
        $.extend(validationRoutineDetails, {
            formFieldType: ""
        });
        if ($formFieldDate.length) {
            validationRoutineDetails = validationRoutineDetails || {};
            $.extend(validationRoutineDetails, {
                hasExpiryDate: true
            });
        }
        if ($formFieldAccount.length) {
            $input = $formFieldAccount.find("input:text");
            if ($input.length) {
                isValidAccount = $input.val().length > 0 && this.validateCreditCard($input);
            } else {
                $input = $formFieldAccount.find("select");
                isValidAccount = $input.val() !== "-";
            }
        }
        if (isValidAccount) {
            if ($formFieldDate.length) {
                isValidDate = parseInt($formFieldDate.find("select").filter(function() {
                    return $(this).val() === "-";
                }).length, 10) === 0;
                isNullDate = $formFieldDate.find("select").filter(function() {
                    return $(this).val() === "-";
                }).length === 2;
            } else {
                isValidDate = true;
            }
            if (isValidDate || isNullDate) {
                if ($formFieldAmount.length) {
                    $input = $formFieldAmount.find("input:text");
                    formHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($formFieldAmount);
                    fieldHandler = formHandler.getChild(LBG.Forms.Validation.Tools.convertClassDetailsToData($formFieldAmount[0], "validationName:")[0]);
                    $.extend(validationRoutineDetails, {
                        min: fieldHandler.validationRoutines.validateBalanceTransfer.min,
                        max: fieldHandler.validationRoutines.validateBalanceTransfer.max,
                        msg: fieldHandler.validationRoutines.validateBalanceTransfer.msg,
                        isLess: false
                    });
                    value = $input.val();
                    if (value.search(".") !== -1) {
                        var splitDecimal = value.split(".");
                        isValidAmount = splitDecimal[splitDecimal.length - 1].length <= 2;
                        validationRoutineDetails.isValidAmount = isValidAmount;
                    } else {
                        isValidAmount = true;
                        validationRoutineDetails.isValidAmount = true;
                    }
                    if (isValidAmount && $input.val().length > 0) {
                        if ($input.val().indexOf(".") < 0) {
                            isValidAmount = this.amountBetween($input, validationRoutineDetails);
                        } else {
                            isValidAmount = this.validateDoubleRange($input, validationRoutineDetails);
                            if (!isValidAmount && (validationRoutineDetails.min && validationRoutineDetails.min * 100 > $input.val() * 100)) {
                                validationRoutineDetails.isLess = true;
                            }
                        }
                    }
                }
            }
        }
        var hasValueAccount = $formFieldAccount.find("input:text").length ? $formFieldAccount.find("input:text").val().length > 0 : $formFieldAccount.find("select").val() !== "-";
        var hasValueDate = validationRoutineDetails.hasExpiryDate ? $formFieldDate.find("select").filter(function() {
            return $(this).val() !== "-";
        }).length === 2 : true;
        var hasValueAmount = $formFieldAmount.find("input:text").val().length > 0;
        if (hasValueAccount && hasValueDate && hasValueAmount) {
            if (!isValidAccount && $input.val() !== "") {
                validationRoutineDetails.formFieldType = $input[0].tagName.toLowerCase() === "input" ? "card" : "account";
            } else {
                if (isValidAccount && !isValidDate) {
                    validationRoutineDetails.formFieldType = "date";
                } else {
                    if (!isValidAmount && $input.val() !== "") {
                        validationRoutineDetails.formFieldType = "amount";
                    } else {
                        validationRoutineDetails.formFieldType = "";
                    }
                }
            }
        } else {
            validationRoutineDetails.formFieldType = "";
        }
        return isValidAccount && isValidDate && isValidAmount;
    },
	    validatememo: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.memo, value, "i");
        return isValid;
    },
    validateNationalInsuranceNo: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.nationalInsuranceNumber, value, "i");
        return isValid;
    },
    validateNationalInsuranceNumberNoFM: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.nationalInsuranceNumberNoFM, value, "i");
        return isValid;
    },
    validateNationalInsuranceNoForISA: function($formFieldElement) {
        var isValid = false;
        var inputText = $formFieldElement.find("input:text");
        var value = $.trim(inputText.val());
        isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.nationalInsuranceNumberForISA, value, "i");
        inputText.val(value);
        return isValid;
    },
    validateAddress: function($formFieldElement) {
        var isValid = false;
        var $inputElements = $formFieldElement.find("input:text");
        var validElements = 0;
        for (var i = 0, len = 2; i < len; i++) {
            if (/\S/.test($inputElements[i].value)) {
                validElements++;
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        return isValid;
    },
    validateSwiftCompliantFields: function($formFieldElement) {
        var isValid = false;
        var $inputElements = $formFieldElement.find("input:text");
        var validElements = 0;
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            var val = $inputElements[i].value;
            var successfulRegExpValidation = this.simpleRegexTest(LBG.Forms.Validation.Expressions.swiftCompliantExpression, val);
            var checkNoStartWithSpaceOrUnderscore = this.simpleRegexTest(LBG.Forms.Validation.Expressions.noStartWithSpaceOrUnderscore, val);
            if ((i > 0 && (val === "")) || (successfulRegExpValidation && checkNoStartWithSpaceOrUnderscore)) {
                validElements++;
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        return isValid;
    },
    validateOtherSelection: function($formFieldElement) {
        var isValid = false;
        var $inputElement = $formFieldElement.find("input:text");
        var $siblingSelect = $formFieldElement.prev(".formField").find("select");
        if ($siblingSelect.val() === DI.lang.validation.otherValue && $inputElement.val().length !== 0) {
            isValid = this.validateAlphaNumeric($formFieldElement);
        } else {
            isValid = true;
        }
        return isValid;
    },
    validateOtherSelectionWithSpecialChars: function($formFieldElement) {
        var isValid = false;
        var $inputElement = $formFieldElement.find("input:text");
        var $siblingSelect = $formFieldElement.prev(".formField").find("select");
        if ($siblingSelect.val() === DI.lang.validation.otherValue && $inputElement.val().length !== 0) {
            isValid = this.validateAlphaNumericWithSpecialChars($formFieldElement);
        } else {
            isValid = true;
        }
        return isValid;
    },
    isaAmountWithRadio: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var siblingRadio = $formFieldElement.prev(".formField").find('input:checked[type="radio"]');
        if (siblingRadio.val() === DI.lang.validation.yesValue) {
            isValid = this.validateCurrency($formFieldElement, validationRoutineDetails);
        } else {
            isValid = true;
        }
        return isValid;
    },
    validateWithIsaAmount: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var $inputElement = $formFieldElement.find("input:text");
        var $isaInputElement = $("input.isaAmount");
        if (Number($inputElement.val()) >= Number($isaInputElement.val())) {
            isValid = true;
        }
        return isValid;
    },
    validateCurrency: function($inputs, opts) {
        var isValid = true,
            expr = LBG.Forms.Validation.Expressions;
        if ($inputs.hasClass(".formField")) {
            $inputs = $inputs.find("input:text");
        }
        for (var i = 0, len = $inputs.length; isValid && i < len; ++i) {
            var oValue = $inputs.get(i).value,
                aValue = 0;
            opts = opts || {};
            opts.formatValid = true;
            if (opts && opts.min && opts.min < 0) {
                opts.allowNegative = true;
            }
            if ($inputs.eq(i).parents("table.textAlertInputs").length && oValue.indexOf(".") !== -1) {
                isValid = false;
            }
            if (isValid) {
                isValid = LBG.Forms.Validation.Routines.simpleRegexTest(expr.currencyCharacters, oValue);
            }
            if (isValid && this.simpleRegexTest(expr.currencyFormat, oValue) && (oValue.indexOf(",") !== -1 || oValue.replace(/[^.]/g, "").length > 1)) {
                isValid = oValue === LBG.converter.formatCurrency(oValue);
            }
            opts.formatValid = isValid;
            if (isValid) {
                if (parseFloat(oValue) < 0 || oValue.substr(0, 1) === "-") {
                    if (opts && opts.allowNegative) {
                        aValue = "-" + LBG.converter.tidyCurrency(oValue);
                    } else {
                        isValid = false;
                    }
                } else {
                    aValue = LBG.converter.tidyCurrency(oValue);
                }
            }
            if (!isValid) {
                return false;
            }
            if ($($inputs.get(i)).closest(".formField").hasClass("dynconOrder")) {
                if ($($inputs.get(i)).closest("fieldset").find(".dynconSelection").length > 0) {
                    var $dynconCountryValidate = LBG.Forms.Validation.Tools.getFieldHandler($($inputs.get(i)).closest("fieldset").find(".dynconSelection")[0]);
                    $dynconCountryValidate.validate();
                    if (!$dynconCountryValidate.isValid) {
                        return true;
                    }
                }
            }
            if (opts && opts.allowNegative) {
                isValid = this.simpleRegexTest(expr.currencyFormat, aValue);
            } else {
                if (aValue.indexOf(".") !== -1) {
                    if (opts && opts.internatPaym) {
                        isValid = this.simpleRegexTest(expr.numberWithUpToFiveDecimalPlaces, aValue);
                        opts.formatValid = isValid;
                    } else {
                        isValid = this.simpleRegexTest(expr.numberWithOneDecimalPlaces, aValue) || this.simpleRegexTest(expr.numberWithTwoDecimalPlaces, aValue);
                        opts.formatValid = isValid;
                    }
                } else {
                    isValid = this.simpleRegexTest(expr.numeric, aValue);
                }
            }
            if (isValid && opts) {
                if (opts.min || opts.max) {
                    isValid = !(opts.min && opts.min * 100 > aValue * 100 || opts.max && opts.max * 100 < aValue * 100);
                }
                if (opts.allowZero && aValue === "0.00") {
                    isValid = true;
                }
            }
        }
        return isValid;
    },
    validateMultipleOf: function($formFieldElement, validationRoutineDetails) {
        var isValid = false,
            $inputElements, validElements = 0,
            value;
        if ($formFieldElement.hasClass(".formField")) {
            $inputElements = $formFieldElement.find("input:text");
        } else {
            $inputElements = $formFieldElement;
        }
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            value = $inputElements[i].value;
            value = value.replace(new RegExp(",", "g"), "");
            if (validationRoutineDetails !== undefined && validationRoutineDetails.multipleOf !== undefined) {
                if (value % parseInt(validationRoutineDetails.multipleOf, 10) === 0) {
                    validElements++;
                }
            }
        }
        if (validElements === len) {
            isValid = true;
        }
        return isValid;
    },
    conditionalRequiredGroup: function(formFields) {
        var isValid = false;
        var $formFieldElements = [];
        var groupHasValue = false,
            validInputs = 0,
            i, len;
        $(formFields).each(function(i) {
            $formFieldElements[i] = $(this);
        });
        checkFormFieldsLoop: for (i = 0, len = $formFieldElements.length; i < len; i++) {
            if (LBG.Forms.Validation.Routines.required($formFieldElements[i])) {
                groupHasValue = true;
                break checkFormFieldsLoop;
            }
        }
        if (groupHasValue) {
            for (i = 0, len = $formFieldElements.length; i < len; i++) {
                if (LBG.Forms.Validation.Routines.required($formFieldElements[i])) {
                    validInputs++;
                }
            }
            if (validInputs === $formFieldElements.length) {
                isValid = true;
            }
        } else {
            isValid = true;
        }
        return isValid;
    },
    telephoneBankingGroup: function(formFields) {
        var isValid = false;
        var $formFieldElements = [],
            $textInputs = [];
        var groupHasValue = false,
            textInputHasValue = false;
        var validInputs = 0,
            i, len;
        $(formFields).each(function(i) {
            $formFieldElements[i] = $(this);
        });
        checkFormFieldsLoop: for (i = 0, len = $formFieldElements.length; i < len; i++) {
            if (LBG.Forms.Validation.Routines.required($formFieldElements[i])) {
                groupHasValue = true;
                break checkFormFieldsLoop;
            }
        }
        if (groupHasValue) {
            getTextInputsLoop: for (i = 0; i < $formFieldElements.length; i++) {
                $textInputs = $formFieldElements[i].find("input:text, input:password");
                if ($textInputs.length > 0) {
                    checkTextInputsLoop: for (var j = 0; j < $textInputs.length; j++) {
                        if ($textInputs[j].value.length > 0) {
                            textInputHasValue = true;
                            break getTextInputsLoop;
                        }
                    }
                }
            }
        }
        if (textInputHasValue) {
            for (i = 0, len = $formFieldElements.length; i < len; i++) {
                if (LBG.Forms.Validation.Routines.required($formFieldElements[i])) {
                    validInputs++;
                }
            }
            if (validInputs === $formFieldElements.length) {
                isValid = true;
            }
        } else {
            isValid = true;
        }
        return isValid;
    },
    oneFieldRequiredGroup: function(formFields) {
        var isValid = false;
        var $formFieldElements = [];
        $(formFields).each(function(i) {
            $formFieldElements[i] = $(this);
        });
        for (var i = 0, len = $formFieldElements.length; i < len; i++) {
            var formField = $formFieldElements[i];
            if (LBG.Forms.Validation.Routines.required(formField)) {
                isValid = true;
                break;
            }
        }
        return isValid;
    },
    oneSelectFieldRequired: function($formField) {
        var isValid = false,
            selectElements = $formField.find("select"),
            $input;
        for (var i = 0, len = selectElements.length; i < len; i++) {
            $input = $(selectElements[i]);
            if ($input.val() !== "-" && $input.val() !== null) {
                isValid = true;
                break;
            }
        }
        return isValid;
    },
    validateDisabledOptions: function($formField) {
        var isValid = true,
            selectElement = $formField.find("select")[0];
        if ($(selectElement.options[selectElement.selectedIndex]).is(":disabled")) {
            isValid = false;
        }
        return isValid;
    },
    validateReferenceNumber: function($formFieldElement) {
        var isValid = false,
            specialChars = LBG.Forms.Validation.Expressions.specialChars,
            value = $formFieldElement.find("input:text").val(),
            count = 0,
            limit = 11;
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.referenceNumber, value)) {
            isValid = true;
        }
        if (isValid) {
            for (var i = 0; i < value.length; i++) {
                if (specialChars.indexOf(value.charAt(i)) !== -1) {
                    count++;
                }
            }
            isValid = count <= limit;
        }
        return isValid;
    },
    validateExtendedAlphaNumeric: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.extendedAlphaNumeric, value)) {
            isValid = true;
        }
        return isValid;
    },
    validateAlphaNumericWithSpecialChars: function($formFieldElement) {
        var isValid = true,
            inputElements = $formFieldElement.find("input:text, input:password");
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].value !== "" && this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericWithSpecialChars, inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    validateAlphaNumericSpecialCharsWithAmpersand: function($formFieldElement) {
        var isValid = true,
            inputElements = $formFieldElement.find("input:text");
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].value !== "" && this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericSpecialCharsWithAmpersand, inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    requiredWithoutCheckbox: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var inputElement = $formFieldElement.find("input:text");
        var siblingCheckboxElement = $formFieldElement.next(".inner").next(".formField").find('input[type="checkbox"]');
        if (siblingCheckboxElement.length > 0) {
            if (siblingCheckboxElement.get(0).checked) {
                isValid = true;
            } else {
                isValid = this.required($formFieldElement);
            }
        } else {
            isValid = this.required($formFieldElement);
        }
        return isValid;
    },
    requiredWithRadio: function($formFieldElement) {
        var selectorWrapper = ".linkedRadioAndTextFields",
            selectorLinkedTextField = ".linkedTextField",
            radioSelectedValue = DI.lang.validation.yesRegexValue;
        var isValid = false,
            $formFields = $formFieldElement.parents(selectorWrapper).find(".formField"),
            $radioElements = $formFields.find('input:[type="radio"]'),
            enabledTextField = $formFields.find(selectorLinkedTextField).hasClass("enabledTextField"),
            statusCount = 0;
        for (var i = 0; i < $radioElements.length; i++) {
            if ($radioElements.get(i).checked === false) {
                statusCount++;
            }
        }
        if (statusCount === $radioElements.length || (enabledTextField && !radioSelectedValue.test($radioElements.filter(":checked").val()))) {
            isValid = true;
        } else {
            isValid = this.required($formFieldElement);
        }
        return isValid;
    },
    oneTextFieldRequired: function($formField, validationRoutine) {
        var isValid = false,
            inputElements = $formField.find("input:text"),
            $input;
        for (var i = 0, len = inputElements.length; i < len; i++) {
            $input = $(inputElements[i]);
            if ($input.val() !== "" && $input.val() !== null) {
                isValid = true;
                break;
            }
        }
        return isValid;
    },
    requiredBranchFinder: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var $inputElement = $formFieldElement.find("input:text");
        var $radioElement = $formFieldElement.find("input:radio");
        var $checkedRadio = $radioElement.filter(":checked");
        var validationHandler = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement);
        validationRoutineDetails = validationRoutineDetails || {};
        if (validationRoutineDetails.isPostcode !== undefined) {
            validationRoutineDetails.isPostcode = null;
        }
        if (validationRoutineDetails.noValue !== undefined) {
            validationRoutineDetails.noValue = null;
        }
        $radioElement.each(function() {
            if (!this.isSetup) {
                this.isSetup = true;
                $(this).bind("click", function() {
                    validationHandler.hideError();
                    validationHandler.validate();
                });
            }
        });
        if (!$checkedRadio.length) {
            return false;
        }
        isValid = LBG.Forms.Validation.Routines.required($formFieldElement);
        if (!isValid) {
            $.extend(validationRoutineDetails, {
                noValue: true
            });
        } else {
            $.extend(validationRoutineDetails, {
                isPostcode: $checkedRadio.val() === "postcode"
            });
            if (validationRoutineDetails.isPostcode) {
                isValid = LBG.Forms.Validation.Routines.validatePostcode($formFieldElement);
            } else {
                isValid = LBG.Forms.Validation.Routines.validateAlphaNumeric($formFieldElement);
            }
        }
        return isValid;
    },
    requiredWithAccountIdentifier: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var $inputElement = $formFieldElement.find("input:text");
        var $radioElement = $formFieldElement.find("input:radio");
        var $checkedRadio = $radioElement.filter(":checked");
        var validationHandler = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement);
        validationRoutineDetails = validationRoutineDetails || {};
        if (validationRoutineDetails.isIBAN !== undefined) {
            validationRoutineDetails.isIBAN = null;
        }
        if (validationRoutineDetails.noValue !== undefined) {
            validationRoutineDetails.noValue = null;
        }
        $radioElement.each(function() {
            if (!this.isSetup) {
                this.isSetup = true;
                $(this).bind("click", function() {
                    validationHandler.hideError();
                    validationHandler.validate();
                });
            }
        });
        if (!$checkedRadio.length) {
            return false;
        }
        isValid = LBG.Forms.Validation.Routines.required($formFieldElement);
        if (!isValid) {
            $.extend(validationRoutineDetails, {
                noValue: true
            });
        } else {
            $.extend(validationRoutineDetails, {
                isIBAN: $checkedRadio.hasClass("ibanAccount")
            });
            if (validationRoutineDetails.isIBAN) {
                isValid = LBG.Forms.Validation.Routines.simpleRegexTest(LBG.Forms.Validation.Expressions.internationalBankAccountNumber, $inputElement.val());
            } else {
                isValid = LBG.Forms.Validation.Routines.validateAlphaNumeric($formFieldElement);
            }
        }
        return isValid;
    },
    accountIdentifierFilter: function($formFieldElement) {
        var isValid = false,
            accountIdentifier, $inpField, $numericOnlyField;
        if ($formFieldElement.hasClass(".formField")) {
            $inpField = $formFieldElement.find("input:text");
            $numericOnlyField = $formFieldElement.find("input:radio.numericOnly");
        } else {
            $inpField = $formFieldElement;
            $numericOnlyField = $formFieldElement.closest(".formField").find("input:radio.numericOnly");
        }
        accountIdentifier = $inpField.val();
        if ($numericOnlyField.length > 0 && $numericOnlyField.attr("checked")) {
            accountIdentifier = accountIdentifier.replace(/\D/g, "");
        } else {
            accountIdentifier = accountIdentifier.replace(/\W/g, "").replace(/_/g, "");
        }
        $inpField.val(accountIdentifier);
        isValid = true;
        return isValid;
    },
    validateTransNewCatEmpty: function($formFieldElement) {
        var newCat = $.trim($formFieldElement.find("input.txtAddLevTwo:live").val()),
            lev2Val = $formFieldElement.prevAll("select.slctLevTwo:first").val(),
            diAddcat = ommTaxonomyJSON.keyselectitemsdataisland.addcat.v;
        if (lev2Val === diAddcat && (newCat === $formFieldElement.find("input.txtAddLevTwo:live").attr("alt") || newCat === "")) {
            return false;
        } else {
            return true;
        }
    },
    validateTransNewCatExists: function($formFieldElement) {
        var newCat = $.trim($formFieldElement.find("input.txtAddLevTwo:live").val()),
            newCatName, checkFlag = 0,
            lev1Val = $formFieldElement.parents("div.frmCatSelect:first").find("select.slctLevOne:first").val(),
            lev2Val = $formFieldElement.prevAll("select.slctLevTwo:first").val(),
            diAddcat = ommTaxonomyJSON.keyselectitemsdataisland.addcat.v;
        var reg = new RegExp("[^a-zA-Z0-9_]", "g");
        newCatName = newCat.replace(reg, "");
        newCatName = newCatName.toLowerCase();
        if (lev2Val !== diAddcat) {
            return true;
        }
        var jsonObject = ommTaxonomyJSON.ommtaxonomy.lev1,
            jsonObjectLev2, lvl1, lvl2;
        if (typeof jsonObject !== "undefined") {
            for (lvl1 in jsonObject) {
                if (jsonObject.hasOwnProperty(lvl1)) {
                    jsonObjectLev2 = jsonObject[lvl1].l2;
                    if (jsonObject[lvl1].v === lev1Val) {
                        for (lvl2 in jsonObjectLev2) {
                            if (jsonObjectLev2.hasOwnProperty(lvl2)) {
                                if ($.trim(newCat).toLowerCase() === $.trim(jsonObjectLev2[lvl2].l).toLowerCase()) {
                                    checkFlag = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (checkFlag !== 1) {
            return true;
        } else {
            return false;
        }
    },
    validateSplitTransAmountNotZero: function($formFieldElement) {
        var $splitAmountElement = $formFieldElement.find("input.splitAmount:first");
        if ($splitAmountElement.size() !== 0 && parseFloat($splitAmountElement.val()) <= 0) {
            return false;
        } else {
            return true;
        }
    },
    validateSplitTransAmount: function($formFieldElement) {
        var totalSplitTransactionAmount = 0,
            sumSplitsAmounts = 0,
            totalSplitTransactionAmountObjCache = $(".transactionInfo span.amount");
        $("div.splitAmountWrap input.splitAmount").each(function() {
            sumSplitsAmounts += parseFloat($(this).val().replace(/\,/g, ""));
        });
        if (totalSplitTransactionAmountObjCache.length) {
            totalSplitTransactionAmount = parseFloat($.trim(totalSplitTransactionAmountObjCache.text().replace(/\,/g, "")));
        }
        if (sumSplitsAmounts > 0 && sumSplitsAmounts <= totalSplitTransactionAmount) {
            return true;
        } else {
            return false;
        }
    },
    validateOMMAddNewCategory: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input:text").val();
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.ommAddNewCategory, value)) {
            isValid = true;
        }
        return isValid;
    },
    validateMortgageAccountNumber: function($formFieldElement) {
        return this.simpleRegexTest(LBG.Forms.Validation.Expressions.mortgageAccountNumber, $formFieldElement.find("input:text").val());
    },
    validateGoalAllocation: function($formFieldElement, opts) {
        var round = LBG.common.round;
        var thisValidationField = LBG.Forms.Validation.Tools.getFieldHandler($formFieldElement);
        var $balEl = $formFieldElement.parents("form:first").find(".balanceText");
        var isValid = thisValidationField.bespokeValid;
        opts.max = $balEl.find(".availAmount").text();
        opts.msg = thisValidationField.bespokeMsg;
        return isValid;
    },
    validateTotal: function($formFieldElement, opts) {
        opts.min = opts.total;
        opts.max = opts.total;
        var isValid = LBG.Forms.Validation.Routines.validateCurrency($formFieldElement, opts);
        return isValid;
    },
    validateLessThan: function($formFieldElement, opts) {
        var round = LBG.common.round;
        opts.max = round($(opts.ff).find("input").val(), 2);
        var isValid = (round($formFieldElement.find("input").val(), 2) <= opts.max);
        return isValid;
    },
    validateMoreThan: function($formFieldElement, opts) {
        var round = LBG.common.round;
        opts.min = round($(opts.ff).find("input").val(), 2);
        var isValid = (round($formFieldElement.find("input").val(), 2) >= opts.min);
        if (opts.min.toString() === "NaN") {
            isValid = true;
        }
        return isValid;
    },
    validateAddressList: function($formFieldElement, opts) {
        var validationHandler = LBG.Forms.Validation.Tools.getValidationHandlerObject($formFieldElement);
        var isValid = $formFieldElement.find("select option[selected]").length > 0;
        if (isValid && $formFieldElement.is(":visible")) {
            isValid = validationHandler.formSubmitTriggered ? false : true;
        }
        return isValid;
    },
    validateNotOnlySpaces: function($formFieldElement) {
        var isValid = false;
        var value = $formFieldElement.find("input").val();
        isValid = $.trim(value) !== "" ? true : false;
        return isValid;
    },
    validateAlphaNumericSpecialCharsWithoutAmpersand: function($formFieldElement) {
        var isValid = true,
            inputElements = $formFieldElement.find("input:text");
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].value !== "" && this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumericSpecialCharsWithoutAmpersand, inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    validateUnique: function($formFieldElement, validationRoutineDetails) {
        var isValid = true,
            name = "validateUnique",
            dataKey = "validateUnique-oldValue",
            $triggerInput = [],
            $targetInputs = [],
            $matchedInputs = [];
        var getInputsMatchingValue = function(value) {
            return $targetInputs.not($triggerInput).filter("[value=" + value + "]");
        };
        var clearErrors = function() {
            if (typeof $triggerInput.data(dataKey) !== "undefined" && $triggerInput.val() !== $triggerInput.data(dataKey)) {
                var $inputs = getInputsMatchingValue($triggerInput.data(dataKey));
                if ($inputs.length === 1) {
                    $inputs.each(function() {
                        var handler = LBG.Forms.Validation.Tools.getFieldHandler(this),
                            msgHTML = "";
                        if (handler.isShowingError) {
                            msgHTML = handler.errorMessage.innerHTML;
                            if (msgHTML === Messages[validationRoutineDetails.msg] || msgHTML === DI.lang.errorMessages.defaultFormFieldErrorMessages[name]) {
                                handler.hideError();
                                $(this).removeData(dataKey);
                            }
                        }
                    });
                }
            }
        };
        if (typeof validationRoutineDetails.target === undefined) {
            return isValid;
        }
        $triggerInput = $formFieldElement.find(validationRoutineDetails.target);
        $targetInputs = $formFieldElement.parents("form").find(validationRoutineDetails.target);
        $matchedInputs = getInputsMatchingValue($triggerInput.val());
        if ($triggerInput.val() !== "") {
            isValid = $matchedInputs.length === 0;
            clearErrors();
            $triggerInput.data(dataKey, $triggerInput.val());
        }
        if (!isValid) {
            $matchedInputs.each(function() {
                LBG.Forms.Validation.Tools.getFieldHandler(this).showError(name, validationRoutineDetails);
                $(this).data(dataKey, this.value);
            });
        } else {
            clearErrors();
        }
        return isValid;
    },
    validatePassword: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var value = $formFieldElement.find("input:password:first").val();
        if (typeof validationRoutineDetails.letters === "undefined" && typeof validationRoutineDetails.numbers === "undefined") {
            return isValid;
        }
        if (typeof validationRoutineDetails.letters !== "undefined") {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.password.letters + "{" + validationRoutineDetails.letters + ",}", value);
        }
        if (typeof validationRoutineDetails.numbers !== "undefined" && isValid) {
            isValid = this.simpleRegexTest(LBG.Forms.Validation.Expressions.password.numbers + "{" + validationRoutineDetails.numbers + ",}", value);
        }
        return isValid;
    },
    validateBulkPaymentRef: function($formFieldElement) {
        var isValid = false,
            origValue = $formFieldElement.find("input:text").val();
        $formFieldElement.find("input:text").val(origValue.toUpperCase());
        var newValue = $formFieldElement.find("input:text").val(),
            newValueLen = newValue.length,
            i = 0,
            alphanum = "",
            alphanumLen = 0,
            sameChar = true,
            legalMatch = false,
            matchIndex = -1;
        if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.bulkPaymentRef, newValue)) {
            for (i = 0; i < newValueLen; i++) {
                alphanumLen = alphanum.length;
                if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.alphaNumeric, newValue.charAt(i))) {
                    if (alphanumLen > 0 && sameChar !== false) {
                        sameChar = (alphanum.charAt(alphanumLen - 1) === newValue.charAt(i)) ? true : false;
                    }
                    alphanum += newValue.charAt(i);
                }
            }
            matchIndex = newValue.indexOf("CONTRA");
            if (matchIndex > -1) {
                if (matchIndex > 0) {
                    legalMatch = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alpha, newValue.charAt(matchIndex - 1)) ? true : false;
                    if (newValueLen > matchIndex + 6) {
                        legalMatch = (this.simpleRegexTest(LBG.Forms.Validation.Expressions.alpha, newValue.charAt(matchIndex - 1)) || this.simpleRegexTest(LBG.Forms.Validation.Expressions.alpha, newValue.charAt(matchIndex + 6))) ? true : false;
                    }
                } else {
                    if (newValueLen > 6) {
                        legalMatch = this.simpleRegexTest(LBG.Forms.Validation.Expressions.alpha, newValue.charAt(6));
                    }
                }
            } else {
                legalMatch = true;
            }
            if (alphanum.length >= 6 && sameChar === false && legalMatch) {
                isValid = true;
            }
        }
        return isValid;
    },
    validateBankName: function($formFieldElement) {
        var isValid = true;
        var $inputElements = $formFieldElement.find("input:text");
        for (var i = 0, len = $inputElements.length; i < len; i++) {
            if (this.simpleRegexTest(LBG.Forms.Validation.Expressions.bankName, $inputElements[i].value) === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    },
    validateLoanMinMax: function($formFieldElement, $validationRoutineDetails) {
        var isValid = false,
            el = LBG.Forms.Validation.clickedElement;
        if (el) {
            if (el.hasClass("submitAction")) {
                var loan = el.attr("data-loan"),
                    loanType = loan.match(/[0-9]{1,4}/g),
                    min = "type" + loanType[0] + "min",
                    max = "type" + loanType[0] + "max",
                    minVal = Number($validationRoutineDetails[min]),
                    maxVal = Number($validationRoutineDetails[max]),
                    testValue = Number($formFieldElement.find(":input").val());
                if ((testValue >= minVal) && (testValue <= maxVal)) {
                    isValid = true;
                }
            }
        } else {
            isValid = true;
        }
        return isValid;
    },
    xNumberOfFieldRequiredGroup: function($formFieldElement, validationRoutineDetails) {
        var isValid = false;
        var itemCount = 0;
        var responses = 0;
        var requiredResponses = $formFieldElement.length;
        $($formFieldElement).each(function() {
            var value = $(this).find(":checked").val();
            if (value === "yes") {
                itemCount++;
            }
            if ($(this).find(":checked").length) {
                responses++;
            }
        });
        if (itemCount >= validationRoutineDetails.noRequired && responses == requiredResponses) {
            isValid = true;
        }
        return isValid;
    },
    validateInputLength: function($formFieldElement, validationRoutineDetails) {
        var isValid = true;
        var value = $formFieldElement.find("input:first").val();
        var inputLength = String(value).length;
        var minLength = Number(validationRoutineDetails.min || 6);
        var maxLength = Number(validationRoutineDetails.max || 15);
        if (inputLength < minLength || inputLength > maxLength) {
            isValid = false;
        }
        return isValid;
    },
    validateNumberInRange: function($formFieldElement, validationRoutionDetails) {
        var isValid = true,
            value = $formFieldElement.find("input:first").val(),
            min = Number(validationRoutionDetails.min),
            max = Number(validationRoutionDetails.max);
        if (value < 0) {
            isValid = false;
        } else {
            if (isNaN(min) || isNaN(max)) {
                isValid = false;
            } else {
                if (value < min || value > max) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
};
LBG.Forms.Validation.Routines.validateBusinessApplicantString = LBG.Forms.Validation.Routines.validateExtendedAlphaNumeric;
LBG.Forms.Validation.Expressions = {
    alpha: "^[a-zA-Z]+$",
    alphaNumeric: "^[a-zA-Z0-9]+$",
    alphaNumericWithSpaces: "^[a-zA-Z0-9\\s]*$",
    alphaNumericWithHypensAndSpaces: "^[a-zA-Z0-9-\\s]+$",
    extendedAlphaNumeric: "^[\\w\\s@&+\\-./'()]+$",
    containsAlphaAndNumeric: {
        alpha: "[a-zA-Z]{1}",
        numeric: "[0-9]{1}"
    },
    alphaNumericWithSpecialChars: "^[\\w @&+\\-,./']+$",
    alphaNumericSpecialCharsWithAmpersand: "^[\\w @&+\\-,./']+$",
    alphaNumericSpecialCharsWithoutAmpersand: "^[\\w @+\\-,./']+$",
    alphaWithSpaces: "^[a-zA-Z ]+$",
    alphaNumericAddress: "^[^\\s\\W]|[[^\\s]\\w\\s ,.\\-]+$",
    numeric: "^[0-9]+$",
    percentage: "(?!^f*$)(?!^f*\\.0*$)^\\d{1,3}(\\.\\d{1,2})?$",
    numericWithSpace: "^[0-9 ]+$",
    numericWithSpaceMaskAndPlus: "^([+]{0,1}[0-9 *]*)$",
    numericWithSpaceAndMask: "^[0-9 *]+$",
    emailAddress: "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?",
    emailAddressOab: "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?",
    postcode: "^((GIR 0AA)|(((A[BL]|B[ABDHLNRSTX]?|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]?|F[KY]|G[LUY]?|H[ADGPRSUX]|I[GMPV]|JE|K[ATWY]|L[ADELNSU]?|M[EKL]?|N[EGNPRW]?|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKLMNOPRSTY]?|T[ADFNQRSW]|UB|W[ADFNRSV]|YO|ZE)[1-9]?[0-9]|((E|N|NW|SE|SW|W)1|EC[1-4]|WC[12])[A-HJKMNPR-Y]|(SW|W)([2-9]|[1-9][0-9])|EC[1-9][0-9])? {0,1}[0-9][ABD-HJLNP-UW-Z]{2}))$",
    sortCode: "^[0-9]{2}$",
    bankingGroupSortCode: {
        business: "^(30|77|87|80|12)$",
        personal: "^(30|77|87|80|12|11)$"
    },
	memo: "^[0-9a-zA-Z]{6,15}$",
	CardNumber: "^[0-9]{16,16}$",
    passCode: "^\\b^[^ \\t\\w]?[0-9]{8}$\\b|\\b[0-9]{4} [0-9]{4}\\b$",
    cardNumberTail: "^[0-9]{1}\\s?[0-9]{4}",
    numberWithOneDecimalPlaces: "^[0-9]*\\.[0-9]{1}$",
    numberWithTwoDecimalPlaces: "^[0-9]*\\.[0-9]{2}$",
    numberWithUpToFiveDecimalPlaces: "^[0-9]*\\.[0-9]{0,5}$",
    currencyFormat: "^[-?]{0,1}[0-9,]*([?:\\.]{1}[0-9]{2}|[^.])$",
    currencyCharacters: "^[-?]{0,1}[0-9,.]+$",
    fullPhoneNumber: "^([+]{0,1}[0-9]{1,20})$",
    fullPhoneNumberWithPossibleSmsReminder: "^([+]{0,1}[0-9]{1,20})$",
    fullPhoneNumberWithExtension: "^([+]{0,1}[0-9]{1,20})-([0-9]{1,6})$",
    ukLandLinePhoneNumber: "^([0-9*]{1,25})$",
    ukLandLinePhoneNumberWithExtension: "^([0-9*]{1,25})-([0-9]{1,6})$",
    ukMobilePhoneNumber: "^(07([1-9]{1}[0-9]{8}))$",
    internationalLandLinePhoneNumber: "^([0-9*]{1,3})-([0-9]{1,8})-([0-9]{1,20})(-?)$",
    internationalLandLinePhoneNumberWithExtension: "^([0-9*]{1,3})-([0-9]{1,8})-([0-9]{1,20})-([0-9]{1,6})$",
    internationalMobilePhoneNumber: "^([0-9*]{1,3})-([0-9]{1,20})$",
    internationalBankAccountNumber: "^[a-zA-Z]{2}[a-zA-Z0-9]+$",
    cardSecurityCode: "^[0-9]{3,4}$",
    accessCode: "^[0-9]{6}$",
    nationalInsuranceNumber: "^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[A-DFM]{1}$",
    nationalInsuranceNumberNoFM: "^[a-ceghj-pr-tw-zA-CEGHJ-PR-TW-Z]{1}[a-ceghj-npr-tw-zA-CEGHJ-NPR-TW-Z]{1}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[A-Da-d]{1}$",
    nationalInsuranceNumberForISA: "^\\s*[a-ceghj-pr-tw-zA-CEGHJ-PR-TW-Z]{1}[a-ceghj-npr-tw-zA-CEGHJ-NPR-TW-Z]{1}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[A-Da-d]{1}\\s*$",
    referenusanceNumber: "^[\\w\\s@&+\\-,./']+$",
    currencyThodsIndicators: "(^,)|(,+,)|(,$)|(,\\d{0,2}\\.)|(,\\d{0,2},)$",
    swiftCompliantExpression: "^[a-zA-Z0-9/\\-?:().,'+\\s=!%&*<>;@#" + '"' + "]+$",
    ommAddNewCategory: "^[a-zA-Z0-9@&+\\-,.'_\\s]+$",
    mortgageAccountNumber: "^[a-zA-Z0-9-/]+$",
    noStartWithSpaceOrUnderscore: "^[^\\s_]",
    noStartWithSpace: "^[^\\s]",
    specialChars: "_@&+-,./'",
    password: {
        letters: "([a-zA-Z].*?)",
        numbers: "([0-9].*?)"
    },
    bulkPaymentRef: "^[0-9A-Z &\\-./]+$",
    bankName: "^[0-9a-zA-Z &()\\-\\*.\\/\\\\,+_']+$",
    bankNameSpecialChars: "&()\\-\\*.\\/\\\\,+_'"
};