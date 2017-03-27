var JSON, JucheapGrid, XPage; !
function(n) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
} (function(n) {
	"use strict";
	function d(n, t) {
		var i, r, u, f = [];
		if (!this || "function" != typeof n || n instanceof RegExp) throw new TypeError;
		for (u = this.length, i = 0; u > i; i++) if (this.hasOwnProperty(i) && (r = this[i], n.call(t, r, i, this))) {
			f.push(r);
			break
		}
		return f
	}
	var t, y;
	n.jgrid = n.jgrid || {};
	n.jgrid.hasOwnProperty("defaults") || (n.jgrid.defaults = {});
	n.extend(n.jgrid, {
		version: "5.0.0",
		htmlDecode: function(n) {
			return n && ("&nbsp;" === n || "&#160;" === n || 1 === n.length && 160 === n.charCodeAt(0)) ? "": n ? String(n).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : n
		},
		htmlEncode: function(n) {
			return n ? String(n).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : n
		},
		template: function(t) {
			var i, r = n.makeArray(arguments).slice(1),
			u = r.length;
			return null == t && (t = ""),
			t.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
			function(t, f) {
				if (!isNaN(parseInt(f, 10))) return r[parseInt(f, 10)];
				for (i = 0; u > i; i++) if (n.isArray(r[i])) for (var e = r[i], o = e.length; o--;) if (f === e[o].nm) return e[o].v
			})
		},
		msie: "Microsoft Internet Explorer" === navigator.appName,
		msiever: function() {
			var n = -1,
			t = navigator.userAgent,
			i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
			return null != i.exec(t) && (n = parseFloat(RegExp.$1)),
			n
		},
		getCellIndex: function(t) {
			var i = n(t);
			return i.is("tr") ? -1 : (i = (i.is("td") || i.is("th") ? i: i.closest("td,th"))[0], n.jgrid.msie ? n.inArray(i, i.parentNode.cells) : i.cellIndex)
		},
		stripHtml: function(n) {
			n = String(n);
			return n ? (n = n.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, ""), n && "&nbsp;" !== n && "&#160;" !== n ? n.replace(/\"/g, "'") : "") : n
		},
		stripPref: function(t, i) {
			var r = n.type(t);
			return ("string" === r || "number" === r) && (t = String(t), i = "" !== t ? String(i).replace(String(t), "") : i),
			i
		},
		parse: function(jsonString) {
			var js = jsonString;
			return "while(1);" === js.substr(0, 9) && (js = js.substr(9)),
			"/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)),
			js || (js = "{}"),
			n.jgrid.useJSON === !0 && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
		},
		parseDate: function(t, i, r, u) {
			var s, e, nt, rt = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"),
			l = "string" == typeof i ? i.match(rt) : null,
			c = function(n, t) {
				for (n = String(n), t = parseInt(t, 10) || 2; n.length < t;) n = "0" + n;
				return n
			},
			f = {
				m: 1,
				d: 1,
				y: 1970,
				h: 0,
				i: 0,
				s: 0,
				u: 0
			},
			o = 0,
			tt = function(n, t) {
				return 0 === n ? 12 === t && (t = 0) : 12 !== t && (t += 12),
				t
			},
			h = 0,
			v;
			if (void 0 === u && (u = n.jgrid.getRegional(this, "formatter.date")), void 0 === u.parseRe && (u.parseRe = /[#%\\\/:_;.,\t\s-]/), u.masks.hasOwnProperty(t) && (t = u.masks[t]), i && null != i) if (isNaN( + i) || "u" !== String(t).toLowerCase()) if (i.constructor === Date) o = i;
			else if (null !== l) o = new Date(parseInt(l[1], 10)),
			l[3] && (h = 60 * Number(l[5]) + Number(l[6]), h *= "-" === l[4] ? 1 : -1, h -= o.getTimezoneOffset(), o.setTime(Number(Number(o) + 6e4 * h)));
			else {
				for ("ISO8601Long" === u.srcformat && "Z" === i.charAt(i.length - 1) && (h -= (new Date).getTimezoneOffset()), i = String(i).replace(/\T/g, "#").replace(/\t/, "%").split(u.parseRe), t = t.replace(/\T/g, "#").replace(/\t/, "%").split(u.parseRe), e = 0, nt = t.length; nt > e; e++) {
					switch (t[e]) {
					case "M":
						s = n.inArray(i[e], u.monthNames); - 1 !== s && 12 > s && (i[e] = s + 1, f.m = i[e]);
						break;
					case "F":
						s = n.inArray(i[e], u.monthNames, 12); - 1 !== s && s > 11 && (i[e] = s + 1 - 12, f.m = i[e]);
						break;
					case "n":
						t[e] = "m";
						break;
					case "j":
						t[e] = "d";
						break;
					case "a":
						s = n.inArray(i[e], u.AmPm); - 1 !== s && 2 > s && i[e] === u.AmPm[s] && (i[e] = s, f.h = tt(i[e], f.h));
						break;
					case "A":
						s = n.inArray(i[e], u.AmPm); - 1 !== s && s > 1 && i[e] === u.AmPm[s] && (i[e] = s - 2, f.h = tt(i[e], f.h));
						break;
					case "g":
						f.h = parseInt(i[e], 10)
					}
					void 0 !== i[e] && (f[t[e].toLowerCase()] = parseInt(i[e], 10))
				}
				if (f.f && (f.m = f.f), 0 === f.m && 0 === f.y && 0 === f.d) return "&#160;";
				f.m = parseInt(f.m, 10) - 1;
				v = f.y;
				v >= 70 && 99 >= v ? f.y = 1900 + f.y: v >= 0 && 69 >= v && (f.y = 2e3 + f.y);
				o = new Date(f.y, f.m, f.d, f.h, f.i, f.s, f.u);
				h > 0 && o.setTime(Number(Number(o) + 6e4 * h))
			} else o = new Date(1e3 * parseFloat(i));
			else o = new Date(f.y, f.m, f.d, f.h, f.i, f.s, f.u);
			if (u.userLocalTime && 0 === h && (h -= (new Date).getTimezoneOffset(), h > 0 && o.setTime(Number(Number(o) + 6e4 * h))), void 0 === r) return o;
			u.masks.hasOwnProperty(r) ? r = u.masks[r] : r || (r = "Y-m-d");
			var a = o.getHours(),
			ut = o.getMinutes(),
			w = o.getDate(),
			y = o.getMonth() + 1,
			d = o.getTimezoneOffset(),
			ft = o.getSeconds(),
			et = o.getMilliseconds(),
			b = o.getDay(),
			p = o.getFullYear(),
			k = (b + 6) % 7 + 1,
			g = (new Date(p, y - 1, w) - new Date(p, 0, 1)) / 864e5,
			it = {
				d: c(w),
				D: u.dayNames[b],
				j: w,
				l: u.dayNames[b + 7],
				N: k,
				S: u.S(w),
				w: b,
				z: g,
				W: 5 > k ? Math.floor((g + k - 1) / 7) + 1 : Math.floor((g + k - 1) / 7) || ((new Date(p - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
				F: u.monthNames[y - -11],
				m: c(y),
				M: u.monthNames[y - 1],
				n: y,
				t: "?",
				L: "?",
				o: "?",
				Y: p,
				y: String(p).substring(2),
				a: 12 > a ? u.AmPm[0] : u.AmPm[1],
				A: 12 > a ? u.AmPm[2] : u.AmPm[3],
				B: "?",
				g: a % 12 || 12,
				G: a,
				h: c(a % 12 || 12),
				H: c(a),
				i: c(ut),
				s: c(ft),
				u: et,
				e: "?",
				I: "?",
				O: (d > 0 ? "-": "+") + c(100 * Math.floor(Math.abs(d) / 60) + Math.abs(d) % 60, 4),
				P: "?",
				T: (String(o).match(/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g) || [""]).pop().replace(/[^-+\dA-Z]/g, ""),
				Z: "?",
				c: "?",
				r: "?",
				U: Math.floor(o / 1e3)
			};
			return r.replace(/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
			function(n) {
				return it.hasOwnProperty(n) ? it[n] : n.substring(1)
			})
		},
		jqID: function(n) {
			return String(n).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
		},
		guid: 1,
		uidPref: "jqg",
		randId: function(t) {
			return (t || n.jgrid.uidPref) + n.jgrid.guid++
		},
		getAccessor: function(n, t) {
			var i, u, f, r = [];
			if ("function" == typeof t) return t(n);
			if (i = n[t], void 0 === i) try {
				if ("string" == typeof t && (r = t.split(".")), f = r.length) for (i = n; i && f--;) u = r.shift(),
				i = i[u]
			} catch(e) {}
			return i
		},
		getXmlData: function(t, i, r) {
			var f, u = "string" == typeof i ? i.match(/^(.*)\[(\w+)\]$/) : null;
			return "function" == typeof i ? i(t) : u && u[2] ? u[1] ? n(u[1], t).attr(u[2]) : n(t).attr(u[2]) : (f = n(i, t), r ? f: f.length > 0 ? n(f).text() : void 0)
		},
		cellWidth: function() {
			var t = n("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'><\/td><\/tr><\/table><\/div>"),
			i = t.appendTo("body").find("td").width();
			return t.remove(),
			Math.abs(i - 5) > .1
		},
		isLocalStorage: function() {
			try {
				return "localStorage" in window && null !== window.localStorage
			} catch(n) {
				return ! 1
			}
		},
		getRegional: function(t, i, r) {
			var u;
			return void 0 !== r ? r: (t.p && t.p.regional && n.jgrid.regional && (u = n.jgrid.getAccessor(n.jgrid.regional[t.p.regional] || {},
			i)), void 0 === u && (u = n.jgrid.getAccessor(n.jgrid, i)), u)
		},
		isMobile: function() {
			try {
				return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
			} catch(n) {
				return ! 1
			}
		},
		cell_width: !0,
		ajaxOptions: {},
		from: function(t) {
			var i = this,
			r = function(t, r) {
				"string" == typeof t && (t = n.data(t));
				var u = this,
				f = t,
				c = !0,
				s = !1,
				e = r,
				y = /[\$,%]/g,
				l = null,
				p = null,
				w = 0,
				o = !1,
				v = "",
				h = [],
				a = !0;
				if ("object" != typeof t || !t.push) throw "data provides is not an array";
				return t.length > 0 && (a = "object" != typeof t[0] ? !1 : !0),
				this._hasData = function() {
					return null === f ? !1 : 0 === f.length ? !1 : !0
				},
				this._getStr = function(n) {
					var t = [];
					return s && t.push("jQuery.trim("),
					t.push("String(" + n + ")"),
					s && t.push(")"),
					c || t.push(".toLowerCase()"),
					t.join("")
				},
				this._strComp = function(n) {
					return "string" == typeof n ? ".toString()": ""
				},
				this._group = function(n, t) {
					return {
						field: n.toString(),
						unique: t,
						items: []
					}
				},
				this._toStr = function(t) {
					return s && (t = n.trim(t)),
					t = t.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'),
					c ? t: t.toLowerCase()
				},
				this._funcLoop = function(t) {
					var i = [];
					return n.each(f,
					function(n, r) {
						i.push(t(r))
					}),
					i
				},
				this._append = function(n) {
					var t;
					for (null === e ? e = "": e += "" === v ? " && ": v, t = 0; w > t; t++) e += "(";
					o && (e += "!");
					e += "(" + n + ")";
					o = !1;
					v = "";
					w = 0
				},
				this._setCommand = function(n, t) {
					l = n;
					p = t
				},
				this._resetNegate = function() {
					o = !1
				},
				this._repeatCommand = function(n, t) {
					return null === l ? u: null !== n && null !== t ? l(n, t) : null === p ? l(n) : a ? l(p, n) : l(n)
				},
				this._equals = function(n, t) {
					return 0 === u._compare(n, t, 1)
				},
				this._compare = function(n, t, i) {
					var r = Object.prototype.toString;
					return void 0 === i && (i = 1),
					void 0 === n && (n = null),
					void 0 === t && (t = null),
					null === n && null === t ? 0 : null === n && null !== t ? 1 : null !== n && null === t ? -1 : "[object Date]" === r.call(n) && "[object Date]" === r.call(t) ? t > n ? -i: n > t ? i: 0 : (c || "number" == typeof n || "number" == typeof t || (n = String(n), t = String(t)), t > n ? -i: n > t ? i: 0)
				},
				this._performSort = function() {
					0 !== h.length && (f = u._doSort(f, 0))
				},
				this._doSort = function(n, t) {
					var s = h[t].by,
					c = h[t].dir,
					l = h[t].type,
					a = h[t].datefmt,
					v = h[t].sfunc,
					i,
					r,
					f,
					e,
					o;
					if (t === h.length - 1) return u._getOrder(n, s, c, l, a, v);
					for (t++, e = u._getGroup(n, s, c, l, a), o = [], i = 0; i < e.length; i++) for (f = u._doSort(e[i].items, t), r = 0; r < f.length; r++) o.push(f[r]);
					return o
				},
				this._getOrder = function(t, r, f, e, o, s) {
					var v, h, l, p, w = [],
					a = [],
					b = "a" === f ? 1 : -1,
					k;
					for (void 0 === e && (e = "text"), p = "float" === e || "number" === e || "currency" === e || "numeric" === e ?
					function(n) {
						var t = parseFloat(String(n).replace(y, ""));
						return isNaN(t) ? Number.NEGATIVE_INFINITY: t
					}: "int" === e || "integer" === e ?
					function(n) {
						return n ? parseFloat(String(n).replace(y, "")) : Number.NEGATIVE_INFINITY
					}: "date" === e || "datetime" === e ?
					function(t) {
						return n.jgrid.parseDate.call(i, o, t).getTime()
					}: n.isFunction(e) ? e: function(t) {
						return t = t ? n.trim(String(t)) : "",
						c ? t: t.toLowerCase()
					},
					n.each(t,
					function(t, i) {
						h = "" !== r ? n.jgrid.getAccessor(i, r) : i;
						void 0 === h && (h = "");
						h = p(h, i);
						a.push({
							vSort: h,
							index: t
						})
					}), a.sort(n.isFunction(s) ?
					function(n, t) {
						return n = n.vSort,
						t = t.vSort,
						s.call(this, n, t, b)
					}: function(n, t) {
						return n = n.vSort,
						t = t.vSort,
						u._compare(n, t, b)
					}), l = 0, k = t.length; k > l;) v = a[l].index,
					w.push(t[v]),
					l++;
					return w
				},
				this._getGroup = function(t, i, r, f, e) {
					var o, h = [],
					s = null,
					c = null;
					return n.each(u._getOrder(t, i, r, f, e),
					function(t, r) {
						o = n.jgrid.getAccessor(r, i);
						null == o && (o = "");
						u._equals(c, o) || (c = o, null !== s && h.push(s), s = u._group(i, o));
						s.items.push(r)
					}),
					null !== s && h.push(s),
					h
				},
				this.ignoreCase = function() {
					return c = !1,
					u
				},
				this.useCase = function() {
					return c = !0,
					u
				},
				this.trim = function() {
					return s = !0,
					u
				},
				this.noTrim = function() {
					return s = !1,
					u
				},
				this.execute = function() {
					var t = e,
					i = [];
					return null === t ? u: (n.each(f,
					function() {
						eval(t) && i.push(this)
					}), f = i, u)
				},
				this.data = function() {
					return f
				},
				this.select = function(t) {
					if (u._performSort(), !u._hasData()) return [];
					if (u.execute(), n.isFunction(t)) {
						var i = [];
						return n.each(f,
						function(n, r) {
							i.push(t(r))
						}),
						i
					}
					return f
				},
				this.hasMatch = function() {
					return u._hasData() ? (u.execute(), f.length > 0) : !1
				},
				this.andNot = function(n, t, i) {
					return o = !o,
					u.and(n, t, i)
				},
				this.orNot = function(n, t, i) {
					return o = !o,
					u.or(n, t, i)
				},
				this.not = function(n, t, i) {
					return u.andNot(n, t, i)
				},
				this.and = function(n, t, i) {
					return v = " && ",
					void 0 === n ? u: u._repeatCommand(n, t, i)
				},
				this.or = function(n, t, i) {
					return v = " || ",
					void 0 === n ? u: u._repeatCommand(n, t, i)
				},
				this.orBegin = function() {
					return w++,
					u
				},
				this.orEnd = function() {
					return null !== e && (e += ")"),
					u
				},
				this.isNot = function(n) {
					return o = !o,
					u.is(n)
				},
				this.is = function(n) {
					return u._append("this." + n),
					u._resetNegate(),
					u
				},
				this._compareValues = function(t, r, f, e, o) {
					var h, s, c;
					if (h = a ? "jQuery.jgrid.getAccessor(this,'" + r + "')": "this", void 0 === f && (f = null), s = f, c = void 0 === o.stype ? "text": o.stype, null !== f) switch (c) {
					case "int":
					case "integer":
						s = isNaN(Number(s)) || "" === s ? "0": s;
						h = "parseInt(" + h + ",10)";
						s = "parseInt(" + s + ",10)";
						break;
					case "float":
					case "number":
					case "numeric":
						s = String(s).replace(y, "");
						s = isNaN(Number(s)) || "" === s ? "0": s;
						h = "parseFloat(" + h + ")";
						s = "parseFloat(" + s + ")";
						break;
					case "date":
					case "datetime":
						s = String(n.jgrid.parseDate.call(i, o.srcfmt || "Y-m-d", s).getTime());
						h = 'jQuery.jgrid.parseDate.call(jQuery("#' + n.jgrid.jqID(i.p.id) + '")[0],"' + o.srcfmt + '",' + h + ").getTime()";
						break;
					default:
						h = u._getStr(h);
						s = u._getStr('"' + u._toStr(s) + '"')
					}
					return u._append(h + " " + e + " " + s),
					u._setCommand(t, r),
					u._resetNegate(),
					u
				},
				this.equals = function(n, t, i) {
					return u._compareValues(u.equals, n, t, "==", i)
				},
				this.notEquals = function(n, t, i) {
					return u._compareValues(u.equals, n, t, "!==", i)
				},
				this.isNull = function(n, t, i) {
					return u._compareValues(u.equals, n, null, "===", i)
				},
				this.greater = function(n, t, i) {
					return u._compareValues(u.greater, n, t, ">", i)
				},
				this.less = function(n, t, i) {
					return u._compareValues(u.less, n, t, "<", i)
				},
				this.greaterOrEquals = function(n, t, i) {
					return u._compareValues(u.greaterOrEquals, n, t, ">=", i)
				},
				this.lessOrEquals = function(n, t, i) {
					return u._compareValues(u.lessOrEquals, n, t, "<=", i)
				},
				this.startsWith = function(t, i) {
					var f = null == i ? t: i,
					r = s ? n.trim(f.toString()).length: f.toString().length;
					return a ? u._append(u._getStr("jQuery.jgrid.getAccessor(this,'" + t + "')") + ".substr(0," + r + ") == " + u._getStr('"' + u._toStr(i) + '"')) : (null != i && (r = s ? n.trim(i.toString()).length: i.toString().length), u._append(u._getStr("this") + ".substr(0," + r + ") == " + u._getStr('"' + u._toStr(t) + '"'))),
					u._setCommand(u.startsWith, t),
					u._resetNegate(),
					u
				},
				this.endsWith = function(t, i) {
					var r = null == i ? t: i,
					f = s ? n.trim(r.toString()).length: r.toString().length;
					return u._append(a ? u._getStr("jQuery.jgrid.getAccessor(this,'" + t + "')") + ".substr(" + u._getStr("jQuery.jgrid.getAccessor(this,'" + t + "')") + ".length-" + f + "," + f + ') == "' + u._toStr(i) + '"': u._getStr("this") + ".substr(" + u._getStr("this") + '.length-"' + u._toStr(t) + '".length,"' + u._toStr(t) + '".length) == "' + u._toStr(t) + '"'),
					u._setCommand(u.endsWith, t),
					u._resetNegate(),
					u
				},
				this.contains = function(n, t) {
					return u._append(a ? u._getStr("jQuery.jgrid.getAccessor(this,'" + n + "')") + '.indexOf("' + u._toStr(t) + '",0) > -1': u._getStr("this") + '.indexOf("' + u._toStr(n) + '",0) > -1'),
					u._setCommand(u.contains, n),
					u._resetNegate(),
					u
				},
				this.groupBy = function(n, t, i, r) {
					return u._hasData() ? u._getGroup(f, n, t, i, r) : null
				},
				this.orderBy = function(t, i, r, f, e) {
					return i = null == i ? "a": n.trim(i.toString().toLowerCase()),
					null == r && (r = "text"),
					null == f && (f = "Y-m-d"),
					null == e && (e = !1),
					("desc" === i || "descending" === i) && (i = "d"),
					("asc" === i || "ascending" === i) && (i = "a"),
					h.push({
						by: t,
						dir: i,
						type: r,
						datefmt: f,
						sfunc: e
					}),
					u
				},
				u
			};
			return new r(t, null)
		},
		getMethod: function(t) {
			return this.getAccessor(n.fn.jqGrid, t)
		},
		extend: function(t) {
			n.extend(n.fn.jqGrid, t);
			this.no_legacy_api || n.fn.extend(t)
		},
		clearBeforeUnload: function(t) {
			var u, r = n("#" + n.jgrid.jqID(t))[0],
			i,
			e,
			f;
			if (r.grid) {
				for (u = r.grid, n.isFunction(u.emptyRows) && u.emptyRows.call(r, !0, !0), n(document).unbind("mouseup.jqGrid" + r.p.id), n(u.hDiv).unbind("mousemove"), n(r).unbind(), e = u.headers.length, f = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "formatter", "addXmlData", "addJSONData", "grid", "p"], i = 0; e > i; i++) u.headers[i].el = null;
				for (i in u) u.hasOwnProperty(i) && (u[i] = null);
				for (i in r.p) r.p.hasOwnProperty(i) && (r.p[i] = n.isArray(r.p[i]) ? [] : null);
				for (e = f.length, i = 0; e > i; i++) r.hasOwnProperty(f[i]) && (r[f[i]] = null, delete r[f[i]])
			}
		},
		gridUnload: function(t) {
			var i, f, u, r;
			t && (t = n.trim(t), 0 === t.indexOf("#") && (t = t.substring(1)), i = n("#" + n.jgrid.jqID(t))[0], i.grid && (f = {
				id: n(i).attr("id"),
				cl: n(i).attr("class")
			},
			i.p.pager && n(i.p.pager).unbind().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom"), u = document.createElement("table"), u.className = f.cl, r = n.jgrid.jqID(i.id), n(u).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_" + r), 1 === n(i.p.pager).parents("#gbox_" + r).length && n(i.p.pager).insertBefore("#gbox_" + r), n.jgrid.clearBeforeUnload(t), n("#gbox_" + r).remove(), n(u).attr({
				id: f.id
			}), n("#alertmod_" + n.jgrid.jqID(t)).remove()))
		},
		gridDestroy: function(t) {
			if (t) {
				t = n.trim(t);
				0 === t.indexOf("#") && (t = t.substring(1));
				var i = n("#" + n.jgrid.jqID(t))[0];
				if (i.grid) {
					i.p.pager && n(i.p.pager).remove();
					try {
						n.jgrid.clearBeforeUnload(t);
						n("#gbox_" + n.jgrid.jqID(t)).remove()
					} catch(r) {}
				}
			}
		},
		styleUI: {
			jQueryUI: {
				common: {
					disabled: "ui-state-disabled",
					highlight: "ui-state-highlight",
					hover: "ui-state-hover",
					cornerall: "ui-corner-all",
					cornertop: "ui-corner-top",
					cornerbottom: "ui-corner-bottom",
					hidden: "ui-helper-hidden",
					icon_base: "ui-icon",
					overlay: "ui-widget-overlay",
					active: "ui-state-active",
					error: "ui-state-error",
					button: "ui-state-default ui-corner-all",
					content: "ui-widget-content"
				},
				base: {
					entrieBox: "ui-widget ui-widget-content ui-corner-all",
					viewBox: "",
					headerTable: "",
					headerBox: "ui-state-default",
					rowTable: "",
					rowBox: "ui-widget-content",
					footerTable: "",
					footerBox: "ui-widget-content",
					headerDiv: "ui-state-default",
					gridtitleBox: "ui-widget-header ui-corner-top ui-helper-clearfix",
					customtoolbarBox: "ui-state-default",
					loadingBox: "ui-state-default ui-state-active",
					rownumBox: "ui-state-default",
					scrollBox: "ui-widget-content",
					multiBox: "cbox",
					pagerBox: "ui-state-default ui-corner-bottom",
					toppagerBox: "ui-state-default",
					pgInput: "ui-corner-all",
					pgSelectBox: "ui-widget-content ui-corner-all",
					pgButtonBox: "ui-corner-all",
					icon_first: "ui-icon-seek-first",
					icon_prev: "ui-icon-seek-prev",
					icon_next: "ui-icon-seek-next",
					icon_end: "ui-icon-seek-end",
					icon_asc: "ui-icon-triangle-1-n",
					icon_desc: "ui-icon-triangle-1-s",
					icon_caption_open: "ui-icon-circle-triangle-n",
					icon_caption_close: "ui-icon-circle-triangle-s"
				},
				modal: {
					modal: "ui-widget ui-widget-content ui-corner-all",
					header: "ui-widget-header ui-corner-all ui-helper-clearfix",
					content: "ui-widget-content",
					resizable: "ui-resizable-handle ui-resizable-se",
					icon_close: "ui-icon-closethick",
					icon_resizable: "ui-icon-gripsmall-diagonal-se"
				},
				celledit: {
					inputClass: "ui-widget-content ui-corner-all"
				},
				inlinedit: {
					inputClass: "ui-widget-content ui-corner-all",
					icon_edit_nav: "ui-icon-pencil",
					icon_add_nav: "ui-icon-plus",
					icon_save_nav: "ui-icon-disk",
					icon_cancel_nav: "ui-icon-cancel"
				},
				formedit: {
					inputClass: "ui-widget-content ui-corner-all",
					icon_prev: "ui-icon-triangle-1-w",
					icon_next: "ui-icon-triangle-1-e",
					icon_save: "ui-icon-disk",
					icon_close: "ui-icon-close",
					icon_del: "ui-icon-scissors",
					icon_cancel: "ui-icon-cancel"
				},
				navigator: {
					icon_edit_nav: "ui-icon-pencil",
					icon_add_nav: "ui-icon-plus",
					icon_del_nav: "ui-icon-trash",
					icon_search_nav: "ui-icon-search",
					icon_refresh_nav: "ui-icon-refresh",
					icon_view_nav: "ui-icon-document",
					icon_newbutton_nav: "ui-icon-newwin"
				},
				grouping: {
					icon_plus: "ui-icon-circlesmall-plus",
					icon_minus: "ui-icon-circlesmall-minus"
				},
				filter: {
					table_widget: "ui-widget ui-widget-content",
					srSelect: "ui-widget-content ui-corner-all",
					srInput: "ui-widget-content ui-corner-all",
					menu_widget: "ui-widget ui-widget-content ui-corner-all",
					icon_search: "ui-icon-search",
					icon_reset: "ui-icon-arrowreturnthick-1-w",
					icon_query: "ui-icon-comment"
				},
				subgrid: {
					icon_plus: "ui-icon-plus",
					icon_minus: "ui-icon-minus",
					icon_open: "ui-icon-carat-1-sw"
				},
				treegrid: {
					icon_plus: "ui-icon-triangle-1-",
					icon_minus: "ui-icon-triangle-1-s",
					icon_leaf: "ui-icon-radio-off"
				},
				fmatter: {
					icon_edit: "ui-icon-pencil",
					icon_add: "ui-icon-plus",
					icon_save: "ui-icon-disk",
					icon_cancel: "ui-icon-cancel",
					icon_del: "ui-icon-trash"
				}
			},
			Bootstrap: {
				common: {
					disabled: "ui-disabled",
					highlight: "success",
					hover: "active",
					cornerall: "",
					cornertop: "",
					cornerbottom: "",
					hidden: "",
					icon_base: "glyphicon",
					overlay: "ui-overlay",
					active: "active",
					error: "bg-danger",
					button: "btn btn-default",
					content: ""
				},
				base: {
					entrieBox: "",
					viewBox: "table-responsive",
					headerTable: "table table-bordered",
					headerBox: "",
					rowTable: "table table-bordered",
					rowBox: "",
					footerTable: "table table-bordered",
					footerBox: "",
					headerDiv: "",
					gridtitleBox: "",
					customtoolbarBox: "",
					loadingBox: "row",
					rownumBox: "active",
					scrollBox: "",
					multiBox: "checkbox",
					pagerBox: "",
					toppagerBox: "",
					pgInput: "form-control",
					pgSelectBox: "form-control",
					pgButtonBox: "",
					icon_first: "glyphicon-step-backward",
					icon_prev: "glyphicon-backward",
					icon_next: "glyphicon-forward",
					icon_end: "glyphicon-step-forward",
					icon_asc: "glyphicon-triangle-top",
					icon_desc: "glyphicon-triangle-bottom",
					icon_caption_open: "glyphicon-circle-arrow-up",
					icon_caption_close: "glyphicon-circle-arrow-down"
				},
				modal: {
					modal: "modal-content",
					header: "modal-header",
					title: "modal-title",
					content: "modal-body",
					resizable: "ui-resizable-handle ui-resizable-se",
					icon_close: "glyphicon-remove-circle",
					icon_resizable: "glyphicon-import"
				},
				celledit: {
					inputClass: "form-control"
				},
				inlinedit: {
					inputClass: "form-control",
					icon_edit_nav: "glyphicon-edit",
					icon_add_nav: "glyphicon-plus",
					icon_save_nav: "glyphicon-save",
					icon_cancel_nav: "glyphicon-remove-circle"
				},
				formedit: {
					inputClass: "form-control",
					icon_prev: "glyphicon-step-backward",
					icon_next: "glyphicon-step-forward",
					icon_save: "glyphicon-save",
					icon_close: "glyphicon-remove-circle",
					icon_del: "glyphicon-trash",
					icon_cancel: "glyphicon-remove-circle"
				},
				navigator: {
					icon_edit_nav: "glyphicon-edit",
					icon_add_nav: "glyphicon-plus",
					icon_del_nav: "glyphicon-trash",
					icon_search_nav: "glyphicon-search",
					icon_refresh_nav: "glyphicon-refresh",
					icon_view_nav: "glyphicon-info-sign",
					icon_newbutton_nav: "glyphicon-new-window"
				},
				grouping: {
					icon_plus: "glyphicon-triangle-right",
					icon_minus: "glyphicon-triangle-bottom"
				},
				filter: {
					table_widget: "table table-condensed",
					srSelect: "form-control",
					srInput: "form-control",
					menu_widget: "",
					icon_search: "glyphicon-search",
					icon_reset: "glyphicon-refresh",
					icon_query: "glyphicon-comment"
				},
				subgrid: {
					icon_plus: "glyphicon-triangle-right",
					icon_minus: "glyphicon-triangle-bottom",
					icon_open: "glyphicon-indent-left"
				},
				treegrid: {
					icon_plus: "glyphicon-triangle-right",
					icon_minus: "glyphicon-triangle-bottom",
					icon_leaf: "glyphicon-unchecked"
				},
				fmatter: {
					icon_edit: "glyphicon-edit",
					icon_add: "glyphicon-plus",
					icon_save: "glyphicon-save",
					icon_cancel: "glyphicon-remove-circle",
					icon_del: "glyphicon-trash"
				}
			}
		}
	});
	n.fn.jqGrid = function(t) {
		var i, r;
		if ("string" == typeof t) {
			if (i = n.jgrid.getMethod(t), !i) throw "jqGrid - No such method: " + t;
			return r = n.makeArray(arguments).slice(1),
			i.apply(this, r)
		}
		return this.each(function() {
			var bt, u, i, r, ui, fi, a, f, ut, hr, ot, yt, yi, pt, pi, wt, l, b, wi, ti, bi, ii, ri, lr, ar, vr;
			if (!this.grid) {
				if (null != t && void 0 !== t.data && (bt = t.data, t.data = []), u = n.extend(!0, {
					url: "",
					height: 150,
					page: 1,
					rowNum: 20,
					rowTotal: null,
					records: 0,
					pager: "",
					pgbuttons: !0,
					pginput: !0,
					colModel: [],
					rowList: [],
					colNames: [],
					sortorder: "asc",
					sortname: "",
					datatype: "xml",
					mtype: "GET",
					altRows: !1,
					selarrrow: [],
					savedRow: [],
					shrinkToFit: !0,
					xmlReader: {},
					jsonReader: {},
					subGrid: !1,
					subGridModel: [],
					reccount: 0,
					lastpage: 0,
					lastsort: 0,
					selrow: null,
					beforeSelectRow: null,
					onSelectRow: null,
					onSortCol: null,
					ondblClickRow: null,
					onRightClickRow: null,
					onPaging: null,
					onSelectAll: null,
					onInitGrid: null,
					loadComplete: null,
					gridComplete: null,
					loadError: null,
					loadBeforeSend: null,
					afterInsertRow: null,
					beforeRequest: null,
					beforeProcessing: null,
					onHeaderClick: null,
					viewrecords: !1,
					loadonce: !1,
					multiselect: !1,
					multikey: !1,
					editurl: null,
					search: !1,
					caption: "",
					hidegrid: !0,
					hiddengrid: !1,
					postData: {},
					userData: {},
					treeGrid: !1,
					treeGridModel: "nested",
					treeReader: {},
					treeANode: -1,
					ExpandColumn: null,
					tree_root_level: 0,
					prmNames: {
						page: "page",
						rows: "rows",
						sort: "sidx",
						order: "sord",
						search: "_search",
						nd: "nd",
						id: "id",
						oper: "oper",
						editoper: "edit",
						addoper: "add",
						deloper: "del",
						subgridid: "id",
						npage: null,
						totalrows: "totalrows"
					},
					forceFit: !1,
					gridstate: "visible",
					cellEdit: !1,
					cellsubmit: "remote",
					nv: 0,
					loadui: "enable",
					toolbar: [!1, ""],
					scroll: !1,
					multiboxonly: !1,
					deselectAfterSort: !0,
					scrollrows: !1,
					autowidth: !1,
					scrollOffset: 18,
					cellLayout: 5,
					subGridWidth: 20,
					multiselectWidth: 30,
					gridview: !0,
					rownumWidth: 35,
					rownumbers: !1,
					pagerpos: "center",
					recordpos: "right",
					footerrow: !1,
					userDataOnFooter: !1,
					hoverrows: !0,
					altclass: "ui-priority-secondary",
					viewsortcols: [!1, "vertical", !0],
					resizeclass: "",
					autoencode: !1,
					remapColumns: [],
					ajaxGridOptions: {},
					direction: "ltr",
					toppager: !1,
					headertitles: !1,
					scrollTimeout: 40,
					data: [],
					_index: {},
					grouping: !1,
					groupingView: {
						groupField: [],
						groupOrder: [],
						groupText: [],
						groupColumnShow: [],
						groupSummary: [],
						showSummaryOnHide: !1,
						sortitems: [],
						sortnames: [],
						summary: [],
						summaryval: [],
						plusicon: "",
						minusicon: "",
						displayField: [],
						groupSummaryPos: [],
						formatDisplayField: [],
						_locgr: !1
					},
					ignoreCase: !0,
					cmTemplate: {},
					idPrefix: "",
					multiSort: !1,
					minColWidth: 33,
					scrollPopUp: !1,
					scrollTopOffset: 0,
					scrollLeftOffset: "100%",
					storeNavOptions: !1,
					regional: "en",
					styleUI: "jQueryUI",
					responsive: !1
				},
				n.jgrid.defaults, t), void 0 !== bt && (u.data = bt, t.data = bt), i = this, r = {
					headers: [],
					cols: [],
					footers: [],
					dragStart: function(t, r, f) {
						var e = n(this.bDiv).offset().left;
						this.resizing = {
							idx: t,
							startX: r.pageX,
							sOL: r.pageX - e
						};
						this.hDiv.style.cursor = "col-resize";
						this.curGbox = n("#rs_m" + n.jgrid.jqID(u.id), "#gbox_" + n.jgrid.jqID(u.id));
						this.curGbox.css({
							display: "block",
							left: r.pageX - e,
							top: f[1],
							height: f[2]
						});
						n(i).triggerHandler("jqGridResizeStart", [r, t]);
						n.isFunction(u.resizeStart) && u.resizeStart.call(i, r, t);
						document.onselectstart = function() {
							return ! 1
						}
					},
					dragMove: function(n) {
						if (this.resizing) {
							var i, f, t = n.pageX - this.resizing.startX,
							r = this.headers[this.resizing.idx],
							e = "ltr" === u.direction ? r.width + t: r.width - t;
							e > 33 && (this.curGbox.css({
								left: this.resizing.sOL + t
							}), u.forceFit === !0 ? (i = this.headers[this.resizing.idx + u.nv], f = "ltr" === u.direction ? i.width - t: i.width + t, f > u.minColWidth && (r.newWidth = e, i.newWidth = f)) : (this.newWidth = "ltr" === u.direction ? u.tblwidth + t: u.tblwidth - t, r.newWidth = e))
						}
					},
					dragEnd: function(t) {
						if (this.hDiv.style.cursor = "default", this.resizing) {
							var r = this.resizing.idx,
							f = this.headers[r].newWidth || this.headers[r].width;
							f = parseInt(f, 10);
							this.resizing = !1;
							n("#rs_m" + n.jgrid.jqID(u.id)).css("display", "none");
							u.colModel[r].width = f;
							this.headers[r].width = f;
							this.headers[r].el.style.width = f + "px";
							this.cols[r].style.width = f + "px";
							this.footers.length > 0 && (this.footers[r].style.width = f + "px");
							u.forceFit === !0 ? (f = this.headers[r + u.nv].newWidth || this.headers[r + u.nv].width, this.headers[r + u.nv].width = f, this.headers[r + u.nv].el.style.width = f + "px", this.cols[r + u.nv].style.width = f + "px", this.footers.length > 0 && (this.footers[r + u.nv].style.width = f + "px"), u.colModel[r + u.nv].width = f) : (u.tblwidth = this.newWidth || u.tblwidth, n("table:first", this.bDiv).css("width", u.tblwidth + "px"), n("table:first", this.hDiv).css("width", u.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, u.footerrow && (n("table:first", this.sDiv).css("width", u.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft));
							t && (n(i).triggerHandler("jqGridResizeStop", [f, r]), n.isFunction(u.resizeStop) && u.resizeStop.call(i, f, r))
						}
						this.curGbox = null;
						document.onselectstart = function() {
							return ! 0
						}
					},
					populateVisible: function() {
						var h, v, o, t;
						if (r.timer && clearTimeout(r.timer), r.timer = null, h = n(r.bDiv).height(), h) {
							if (t = n("table:first", r.bDiv), t[0].rows.length) try {
								v = t[0].rows[1];
								o = v ? n(v).outerHeight() || r.prevRowHeight: r.prevRowHeight
							} catch(w) {
								o = r.prevRowHeight
							}
							if (o) {
								r.prevRowHeight = o;
								var f, c, y, p = u.rowNum,
								s = r.scrollTop = r.bDiv.scrollTop,
								l = Math.round(t.position().top) - s,
								a = l + t.height(),
								e = o * p;
								if (h > a && 0 >= l && (void 0 === u.lastpage || (parseInt((a + s + e - 1) / e, 10) || 0) <= u.lastpage) && (c = parseInt((h - a + e - 1) / e, 10) || 1, a >= 0 || 2 > c || u.scroll === !0 ? (f = (Math.round((a + s) / e) || 0) + 1, l = -1) : l = 1), l > 0 && (f = (parseInt(s / e, 10) || 0) + 1, c = (parseInt((s + h) / e, 10) || 0) + 2 - f, y = !0), c) {
									if (u.lastpage && (f > u.lastpage || 1 === u.lastpage || f === u.page && f === u.lastpage)) return;
									r.hDiv.loading ? r.timer = setTimeout(r.populateVisible, u.scrollTimeout) : (u.page = f, y && (r.selectionPreserver(t[0]), r.emptyRows.call(t[0], !1, !1)), r.populate(c));
									u.scrollPopUp && null != u.lastpage && (n("#scroll_g" + u.id).show().html(n.jgrid.template(n.jgrid.getRegional(i, "defaults.pgtext", u.pgtext), u.page, u.lastpage)).css({
										top: u.scrollTopOffset + s * ((parseInt(u.height, 10) - 45) / (parseInt(o, 10) * parseInt(u.records, 10))) + "px",
										left: u.scrollLeftOffset
									}), n(this).mouseout(function() {
										n("#scroll_g" + u.id).hide()
									}))
								}
							}
						}
					},
					scrollGrid: function(t) {
						if (u.scroll) {
							var i = r.bDiv.scrollTop;
							void 0 === r.scrollTop && (r.scrollTop = 0);
							i !== r.scrollTop && (r.scrollTop = i, r.timer && clearTimeout(r.timer), r.timer = setTimeout(r.populateVisible, u.scrollTimeout))
						}
						r.hDiv.scrollLeft = r.bDiv.scrollLeft;
						u.footerrow && (r.sDiv.scrollLeft = r.bDiv.scrollLeft);
						u.frozenColumns && n(r.fbDiv).scrollTop(r.bDiv.scrollTop);
						t && t.stopPropagation()
					},
					selectionPreserver: function(t) {
						var i = t.p,
						u = i.selrow,
						r = i.selarrrow ? n.makeArray(i.selarrrow) : null,
						e = t.grid.bDiv.scrollLeft,
						f = function() {
							var o;
							if (i.selrow = null, i.selarrrow = [], i.multiselect && r && r.length > 0) for (o = 0; o < r.length; o++) r[o] !== u && n(t).jqGrid("setSelection", r[o], !1, null);
							u && n(t).jqGrid("setSelection", u, !1, null);
							t.grid.bDiv.scrollLeft = e;
							n(t).unbind(".selectionPreserver", f)
						};
						n(t).bind("jqGridGridComplete.selectionPreserver", f)
					}
				},
				"TABLE" !== this.tagName.toUpperCase() || null == this.id) return void alert("Element is not a table or has no id!");
				if (void 0 !== document.documentMode && document.documentMode <= 5) return void alert("Grid can not be used in this ('quirks') mode!");
				f = 0;
				for (fi in n.jgrid.regional) n.jgrid.regional.hasOwnProperty(fi) && (0 === f && (ui = fi), f++);
				if (1 === f && ui !== u.regional && (u.regional = ui), n(this).empty().attr("tabindex", "0"), this.p = u, this.p.useProp = !!n.fn.prop, 0 === this.p.colNames.length) for (f = 0; f < this.p.colModel.length; f++) this.p.colNames[f] = this.p.colModel[f].label || this.p.colModel[f].name;
				if (this.p.colNames.length !== this.p.colModel.length) return void alert(n.jgrid.getRegional(this, "errors.model"));
				var d, e = n.jgrid.getMethod("getStyleUI"),
				o = i.p.styleUI + ".common",
				s = e(o, "disabled", !0),
				it = e(o, "highlight", !0),
				y = e(o, "hover", !0),
				yr = e(o, "cornerall", !0),
				g = e(o, "icon_base", !0),
				ki = n.jgrid.msie,
				p = [],
				nt = [],
				rt = [];
				o = i.p.styleUI + ".base";
				d = n("<div " + e(o, "viewBox", !1, "ui-jqgrid-view") + " role='grid'><\/div>");
				i.p.direction = n.trim(i.p.direction.toLowerCase());
				i.p._ald = !1; - 1 === n.inArray(i.p.direction, ["ltr", "rtl"]) && (i.p.direction = "ltr");
				a = i.p.direction;
				n(d).insertBefore(this);
				n(this).appendTo(d);
				ut = n("<div " + e(o, "entrieBox", !1, "ui-jqgrid") + "><\/div>");
				n(ut).attr({
					id: "gbox_" + this.id,
					dir: a
				}).insertBefore(d);
				n(d).attr("id", "gview_" + this.id).appendTo(ut);
				n("<div " + e(i.p.styleUI + ".common", "overlay", !1, "jqgrid-overlay") + " id='lui_" + this.id + "'><\/div>").insertBefore(d);
				n("<div " + e(o, "loadingBox", !1, "loading") + " id='load_" + this.id + "'>" + n.jgrid.getRegional(i, "defaults.loadtext", this.p.loadtext) + "<\/div>").insertBefore(d);
				n(this).attr({
					role: "presentation",
					"aria-multiselectable": !!this.p.multiselect,
					"aria-labelledby": "gbox_" + this.id
				});
				var di, v = function(n, t) {
					return n = parseInt(n, 10),
					isNaN(n) ? t || 0 : n
				},
				ht = function(t, u, f, e, o, s) {
					var y, a, h = i.p.colModel[t],
					p = h.align,
					l = 'style="',
					v = h.classes,
					w = h.name,
					c = [];
					return p && (l += "text-align:" + p + ";"),
					h.hidden === !0 && (l += "display:none;"),
					0 === u ? l += "width: " + r.headers[t].width + "px;": (n.isFunction(h.cellattr) || "string" == typeof h.cellattr && null != n.jgrid.cellattr && n.isFunction(n.jgrid.cellattr[h.cellattr])) && (y = n.isFunction(h.cellattr) ? h.cellattr: n.jgrid.cellattr[h.cellattr], a = y.call(i, o, f, e, h, s), a && "string" == typeof a && (a = a.replace(/style/i, "style").replace(/title/i, "title"), a.indexOf("title") > -1 && (h.title = !1), a.indexOf("class") > -1 && (v = void 0), c = a.replace(/\-style/g, "-sti").split(/style/), 2 === c.length ? (c[1] = n.trim(c[1].replace(/\-sti/g, "-style").replace("=", "")), (0 === c[1].indexOf("'") || 0 === c[1].indexOf('"')) && (c[1] = c[1].substring(1)), l += c[1].replace(/'/gi, '"')) : l += '"')),
					c.length || (c[0] = "", l += '"'),
					l += (void 0 !== v ? ' class="' + v + '"': "") + (h.title && f ? ' title="' + n.jgrid.stripHtml(f) + '"': ""),
					l += ' aria-describedby="' + i.p.id + "_" + w + '"',
					l + c[0]
				},
				gi = function(t) {
					return null == t || "" === t ? "&#160;": i.p.autoencode ? n.jgrid.htmlEncode(t) : String(t)
				},
				nr = function(t, r, u, f, e) {
					var s, o = i.p.colModel[u],
					h;
					return void 0 !== o.formatter ? (t = "" !== String(i.p.idPrefix) ? n.jgrid.stripPref(i.p.idPrefix, t) : t, h = {
						rowId: t,
						colModel: o,
						gid: i.p.id,
						pos: u,
						styleUI: i.p.styleUI
					},
					s = n.isFunction(o.formatter) ? o.formatter.call(i, r, h, f, e) : n.fmatter ? n.fn.fmatter.call(i, o.formatter, r, h, f, e) : gi(r)) : s = gi(r),
					s
				},
				ei = function(n, t, i, r, u, f) {
					var e, o;
					return e = nr(n, t, i, u, "add"),
					o = ht(i, r, e, u, n, f),
					'<td role="gridcell" ' + o + ">" + e + "<\/td>"
				},
				tr = function(n, t, r, u, f) {
					var e = '<input role="checkbox" type="checkbox" id="jqg_' + i.p.id + "_" + n + '" ' + f + ' name="jqg_' + i.p.id + "_" + n + '"' + (u ? 'checked="checked"': "") + "/>",
					o = ht(t, r, "", null, n, !0);
					return '<td role="gridcell" ' + o + ">" + e + "<\/td>"
				},
				ir = function(n, t, i, r, u) {
					var f = (parseInt(i, 10) - 1) * parseInt(r, 10) + 1 + t,
					e = ht(n, t, f, null, t, !0);
					return '<td role="gridcell" ' + u + " " + e + ">" + f + "<\/td>"
				},
				oi = function(n) {
					for (var t, u = [], f = 0, r = 0; r < i.p.colModel.length; r++) t = i.p.colModel[r],
					"cb" !== t.name && "subgrid" !== t.name && "rn" !== t.name && (u[f] = "local" === n ? t.name: "xml" === n || "xmlstring" === n ? t.xmlmap || t.name: t.jsonmap || t.name, i.p.keyName !== !1 && t.key === !0 && (i.p.keyName = u[f]), f++);
					return u
				},
				kt = function(t) {
					var r = i.p.remapColumns;
					return r && r.length || (r = n.map(i.p.colModel,
					function(n, t) {
						return t
					})),
					t && (r = n.map(r,
					function(n) {
						return t > n ? null: n - t
					})),
					r
				},
				ct = function(t, i) {
					var r;
					this.p.deepempty ? n(this.rows).slice(1).remove() : (r = this.rows.length > 0 ? this.rows[0] : null, n(this.firstChild).empty().append(r));
					t && this.p.scroll && (n(this.grid.bDiv.firstChild).css({
						height: "auto"
					}), n(this.grid.bDiv.firstChild.firstChild).css({
						height: "0px",
						display: "none"
					}), 0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0));
					i === !0 && this.p.treeGrid && !this.p.loadonce && (this.p.data = [], this.p._index = {})
				},
				rr = function() {
					var e, s, t, f, u, h, w, c, b, k, y, r = i.p,
					l = r.data,
					d = l.length,
					o = r.localReader,
					p = r.colModel,
					a = o.cell,
					v = (r.multiselect === !0 ? 1 : 0) + (r.subGrid === !0 ? 1 : 0) + (r.rownumbers === !0 ? 1 : 0),
					g = r.scroll ? n.jgrid.randId() : 1;
					if ("local" === r.datatype && o.repeatitems === !0) for (b = kt(v), k = oi("local"), f = r.keyIndex === !1 ? n.isFunction(o.id) ? o.id.call(i, l) : o.id: r.keyIndex, e = 0; d > e; e++) {
						for (t = l[e], u = n.jgrid.getAccessor(t, f), void 0 === u && ("number" == typeof f && null != p[f + v] && (u = n.jgrid.getAccessor(t, p[f + v].name)), void 0 === u && (u = g + e, a && (h = n.jgrid.getAccessor(t, a) || t, u = null != h && void 0 !== h[f] ? h[f] : u, h = null))), c = {},
						c[o.id] = u, a && (t = n.jgrid.getAccessor(t, a) || t), y = n.isArray(t) ? b: k, s = 0; s < y.length; s++) w = n.jgrid.getAccessor(t, y[s]),
						c[p[s + v].name] = w;
						n.extend(!0, l[e], c)
					}
				},
				si = function() {
					var u, t, r, f = i.p.data.length;
					for (u = i.p.keyName === !1 || i.p.loadonce === !0 ? i.p.localReader.id: i.p.keyName, i.p._index = [], t = 0; f > t; t++) r = n.jgrid.getAccessor(i.p.data[t], u),
					void 0 === r && (r = String(t + 1)),
					i.p._index[r] = t
				},
				hi = function(t, r, u, f, e) {
					var s, c = "-1",
					l = "",
					h = r ? "display:none;": "",
					o = n(i).triggerHandler("jqGridRowAttr", [f, e, t]);
					if ("object" != typeof o && (o = n.isFunction(i.p.rowattr) ? i.p.rowattr.call(i, f, e, t) : "string" == typeof i.p.rowattr && null != n.jgrid.rowattr && n.isFunction(n.jgrid.rowattr[i.p.rowattr]) ? n.jgrid.rowattr[i.p.rowattr].call(i, f, e, t) : {}), !n.isEmptyObject(o)) {
						o.hasOwnProperty("id") && (t = o.id, delete o.id);
						o.hasOwnProperty("tabindex") && (c = o.tabindex, delete o.tabindex);
						o.hasOwnProperty("style") && (h += o.style, delete o.style);
						o.hasOwnProperty("class") && (u += " " + o["class"], delete o["class"]);
						try {
							delete o.role
						} catch(a) {}
						for (s in o) o.hasOwnProperty(s) && (l += " " + s + "=" + o[s])
					}
					return '<tr role="row" id="' + t + '" tabindex="' + c + '" class="' + u + '"' + ("" === h ? "": ' style="' + h + '"') + l + ">"
				},
				ci = function(t, r, u, f) {
					var ri = new Date,
					ft = "local" !== i.p.datatype && i.p.loadonce || "xmlstring" === i.p.datatype,
					et = "_id_",
					h = i.p.xmlReader,
					ui = "local" === i.p.datatype ? "local": "xml",
					tt,
					ni,
					ti,
					ii;
					if (ft && (i.p.data = [], i.p._index = {},
					i.p.localReader.id = et), i.p.reccount = 0, n.isXMLDoc(t)) { - 1 !== i.p.treeANode || i.p.scroll ? r = r > 1 ? r: 1 : (ct.call(i, !1, !0), r = 1);
						var w, ot, k, yt, st, at, rt, a, l, pt, nt = n(i),
						d = 0,
						p = i.p.multiselect === !0 ? 1 : 0,
						g = 0,
						y = i.p.rownumbers === !0 ? 1 : 0,
						ut = [],
						s = {},
						c = [],
						fi = i.p.altRows === !0 ? i.p.altclass: "",
						si = e(o, "rowBox", !0, "jqgrow ui-row-" + i.p.direction);
						i.p.subGrid === !0 && (g = 1, yt = n.jgrid.getMethod("addSubGridCell"));
						h.repeatitems || (ut = oi(ui));
						st = i.p.keyName === !1 ? n.isFunction(h.id) ? h.id.call(i, t) : h.id: i.p.keyName;
						at = -1 === String(st).indexOf("[") ? ut.length ?
						function(t, i) {
							return n(st, t).text() || i
						}: function(t, i) {
							return n(h.cell, t).eq(st).text() || i
						}: function(n, t) {
							return n.getAttribute(st.replace(/[\[\]]/g, "")) || t
						};
						i.p.userData = {};
						i.p.page = v(n.jgrid.getXmlData(t, h.page), i.p.page);
						i.p.lastpage = v(n.jgrid.getXmlData(t, h.total), 1);
						i.p.records = v(n.jgrid.getXmlData(t, h.records));
						n.isFunction(h.userdata) ? i.p.userData = h.userdata.call(i, t) || {}: n.jgrid.getXmlData(t, h.userdata, !0).each(function() {
							i.p.userData[this.getAttribute("name")] = n(this).text()
						});
						tt = n.jgrid.getXmlData(t, h.root, !0);
						tt = n.jgrid.getXmlData(tt, h.row, !0);
						tt || (tt = []);
						var wt, it = tt.length,
						b = 0,
						ht = [],
						lt = parseInt(i.p.rowNum, 10),
						bt = i.p.scroll ? n.jgrid.randId() : 1;
						if (it > 0 && i.p.page <= 0 && (i.p.page = 1), tt && it) {
							f && (lt *= f + 1);
							var vt, ci = n.isFunction(i.p.afterInsertRow),
							dt = !1,
							gt = n("#" + n.jgrid.jqID(i.p.id) + " tbody:first"),
							li = y ? e(o, "rownumBox", !1, "jqgrid-rownum") : "",
							ai = p ? e(o, "multiBox", !1, "cbox") : "";
							for (i.p.grouping && (dt = i.p.groupingView.groupCollapse === !0, vt = n.jgrid.getMethod("groupingPrepare")); it > b;) {
								if (a = tt[b], l = at(a, bt + b), l = i.p.idPrefix + l, wt = 0 === r ? 0 : r + 1, pt = si + ((wt + b) % 2 == 1 ? " " + fi: ""), ni = c.length, c.push(""), y && c.push(ir(0, b, i.p.page, i.p.rowNum, li)), p && c.push(tr(l, y, b, !1, ai)), g && c.push(yt.call(nt, p + y, b + r)), h.repeatitems) rt || (rt = kt(p + g + y)),
								ti = n.jgrid.getXmlData(a, h.cell, !0),
								n.each(rt,
								function(n) {
									var t = ti[this];
									return t ? (k = t.textContent || t.text, s[i.p.colModel[n + p + g + y].name] = k, void c.push(ei(l, k, n + p + g + y, b + r, a, s))) : !1
								});
								else for (w = 0; w < ut.length; w++) k = n.jgrid.getXmlData(a, ut[w]),
								s[i.p.colModel[w + p + g + y].name] = k,
								c.push(ei(l, k, w + p + g + y, b + r, a, s));
								if (c[ni] = hi(l, dt, pt, s, a), c.push("<\/tr>"), i.p.grouping && (ht.push(c), i.p.groupingView._locgr || vt.call(nt, s, b), c = []), (ft || i.p.treeGrid === !0 && !i.p._ald) && (s[et] = n.jgrid.stripPref(i.p.idPrefix, l), i.p.data.push(s), i.p._index[s[et]] = i.p.data.length - 1), i.p.gridview === !1 && (gt.append(c.join("")), nt.triggerHandler("jqGridAfterInsertRow", [l, s, a]), ci && i.p.afterInsertRow.call(i, l, s, a), c = []), s = {},
								d++, b++, d === lt) break
							}
						}
						if (i.p.gridview === !0 && (ot = i.p.treeANode > -1 ? i.p.treeANode: 0, i.p.grouping ? ft || (nt.jqGrid("groupingRender", ht, i.p.colModel.length, i.p.page, lt), ht = null) : i.p.treeGrid === !0 && ot > 0 ? n(i.rows[ot]).after(c.join("")) : (gt.append(c.join("")), i.grid.cols = i.rows[0].cells)), i.p.subGrid === !0) try {
							nt.jqGrid("addSubGrid", p + y)
						} catch(vi) {}
						if (i.p.totaltime = new Date - ri, d > 0 && 0 === i.p.records && (i.p.records = it), c = null, i.p.treeGrid === !0) try {
							nt.jqGrid("setTreeNode", ot + 1, d + ot + 1)
						} catch(yi) {}
						if (i.p.reccount = d, i.p.treeANode = -1, i.p.userDataOnFooter && nt.jqGrid("footerData", "set", i.p.userData, !0), ft && (i.p.records = it, i.p.lastpage = Math.ceil(it / lt)), u || i.updatepager(!1, !0), ft) {
							for (; it > d;) {
								if (a = tt[d], l = at(a, d + bt), l = i.p.idPrefix + l, h.repeatitems) rt || (rt = kt(p + g + y)),
								ii = n.jgrid.getXmlData(a, h.cell, !0),
								n.each(rt,
								function(n) {
									var t = ii[this];
									return t ? (k = t.textContent || t.text, void(s[i.p.colModel[n + p + g + y].name] = k)) : !1
								});
								else for (w = 0; w < ut.length; w++) k = n.jgrid.getXmlData(a, ut[w]),
								s[i.p.colModel[w + p + g + y].name] = k;
								s[et] = n.jgrid.stripPref(i.p.idPrefix, l);
								i.p.grouping && vt.call(nt, s, d);
								i.p.data.push(s);
								i.p._index[s[et]] = i.p.data.length - 1;
								s = {};
								d++
							}
							i.p.grouping && (i.p.groupingView._locgr = !0, nt.jqGrid("groupingRender", ht, i.p.colModel.length, i.p.page, lt), ht = null)
						}
					}
				},
				dt = function(t, r, u, f) {
					var li = new Date,
					c, vt, ft, et, lt, ci, at;
					if (t) { - 1 !== i.p.treeANode || i.p.scroll ? r = r > 1 ? r: 1 : (ct.call(i, !1, !0), r = 1);
						ft = "_id_";
						et = "local" !== i.p.datatype && i.p.loadonce || "jsonstring" === i.p.datatype;
						et && (i.p.data = [], i.p._index = {},
						i.p.localReader.id = ft);
						i.p.reccount = 0;
						"local" === i.p.datatype ? (c = i.p.localReader, vt = "local") : (c = i.p.jsonReader, vt = "json");
						var yt, b, k, h, dt, rt, ut, nt, y, ot, s, pt, tt = n(i),
						d = 0,
						gt = [],
						w = i.p.multiselect ? 1 : 0,
						g = i.p.subGrid === !0 ? 1 : 0,
						p = i.p.rownumbers === !0 ? 1 : 0,
						ni = kt(w + g + p),
						ti = oi(vt),
						l = {},
						a = [],
						ai = i.p.altRows === !0 ? i.p.altclass: "",
						vi = e(o, "rowBox", !0, "jqgrow ui-row-" + i.p.direction);
						i.p.page = v(n.jgrid.getAccessor(t, c.page), i.p.page);
						i.p.lastpage = v(n.jgrid.getAccessor(t, c.total), 1);
						i.p.records = v(n.jgrid.getAccessor(t, c.records));
						i.p.userData = n.jgrid.getAccessor(t, c.userdata) || {};
						g && (dt = n.jgrid.getMethod("addSubGridCell"));
						y = i.p.keyName === !1 ? n.isFunction(c.id) ? c.id.call(i, t) : c.id: i.p.keyName;
						nt = n.jgrid.getAccessor(t, c.root);
						null == nt && n.isArray(t) && (nt = t);
						nt || (nt = []);
						ut = nt.length;
						b = 0;
						ut > 0 && i.p.page <= 0 && (i.p.page = 1);
						var ii, wt, st = parseInt(i.p.rowNum, 10),
						ri = i.p.scroll ? n.jgrid.randId() : 1,
						ui = !1;
						f && (st *= f + 1);
						"local" !== i.p.datatype || i.p.deselectAfterSort || (ui = !0);
						var bt, yi = n.isFunction(i.p.afterInsertRow),
						ht = [],
						fi = !1,
						si = n("#" + n.jgrid.jqID(i.p.id) + " tbody:first"),
						pi = p ? e(o, "rownumBox", !1, "jqgrid-rownum") : "",
						wi = w ? e(o, "multiBox", !1, "cbox") : "";
						for (i.p.grouping && (fi = i.p.groupingView.groupCollapse === !0, bt = n.jgrid.getMethod("groupingPrepare")); ut > b;) {
							for ((h = nt[b], s = n.jgrid.getAccessor(h, y), void 0 === s && ("number" == typeof y && null != i.p.colModel[y + w + g + p] && (s = n.jgrid.getAccessor(h, i.p.colModel[y + w + g + p].name)), void 0 === s && (s = ri + b, 0 === gt.length && c.cell))) && (lt = n.jgrid.getAccessor(h, c.cell) || h, s = null != lt && void 0 !== lt[y] ? lt[y] : s, lt = null), s = i.p.idPrefix + s, ii = 1 === r ? 0 : r, pt = vi + ((ii + b) % 2 == 1 ? " " + ai: ""), ui && (wt = i.p.multiselect ? -1 !== n.inArray(s, i.p.selarrrow) : s === i.p.selrow), ci = a.length, a.push(""), p && a.push(ir(0, b, i.p.page, i.p.rowNum, pi)), w && a.push(tr(s, p, b, wt, wi)), g && a.push(dt.call(tt, w + p, b + r)), rt = ti, c.repeatitems && (c.cell && (h = n.jgrid.getAccessor(h, c.cell) || h), n.isArray(h) && (rt = ni)), k = 0; k < rt.length; k++) yt = n.jgrid.getAccessor(h, rt[k]),
							l[i.p.colModel[k + w + g + p].name] = yt,
							a.push(ei(s, yt, k + w + g + p, b + r, h, l));
							if (pt += wt ? " " + it: "", a[ci] = hi(s, fi, pt, l, h), a.push("<\/tr>"), i.p.grouping && (ht.push(a), i.p.groupingView._locgr || bt.call(tt, l, b), a = []), (et || i.p.treeGrid === !0 && !i.p._ald) && (l[ft] = n.jgrid.stripPref(i.p.idPrefix, s), i.p.data.push(l), i.p._index[l[ft]] = i.p.data.length - 1), i.p.gridview === !1 && (si.append(a.join("")), tt.triggerHandler("jqGridAfterInsertRow", [s, l, h]), yi && i.p.afterInsertRow.call(i, s, l, h), a = []), l = {},
							d++, b++, d === st) break
						}
						if (i.p.gridview === !0 && (ot = i.p.treeANode > -1 ? i.p.treeANode: 0, i.p.grouping ? et || (tt.jqGrid("groupingRender", ht, i.p.colModel.length, i.p.page, st), ht = null) : i.p.treeGrid === !0 && ot > 0 ? n(i.rows[ot]).after(a.join("")) : (si.append(a.join("")), i.grid.cols = i.rows[0].cells)), i.p.subGrid === !0) try {
							tt.jqGrid("addSubGrid", w + p)
						} catch(bi) {}
						if (i.p.totaltime = new Date - li, d > 0 && 0 === i.p.records && (i.p.records = ut), a = null, i.p.treeGrid === !0) try {
							tt.jqGrid("setTreeNode", ot + 1, d + ot + 1)
						} catch(ki) {}
						if (i.p.reccount = d, i.p.treeANode = -1, i.p.userDataOnFooter && tt.jqGrid("footerData", "set", i.p.userData, !0), et && (i.p.records = ut, i.p.lastpage = Math.ceil(ut / st)), u || i.updatepager(!1, !0), et) {
							for (; ut > d && nt[d];) {
								if ((h = nt[d], s = n.jgrid.getAccessor(h, y), void 0 === s && ("number" == typeof y && null != i.p.colModel[y + w + g + p] && (s = n.jgrid.getAccessor(h, i.p.colModel[y + w + g + p].name)), void 0 === s && (s = ri + d, 0 === gt.length && c.cell))) && (at = n.jgrid.getAccessor(h, c.cell) || h, s = null != at && void 0 !== at[y] ? at[y] : s, at = null), h) {
									for (s = i.p.idPrefix + s, rt = ti, c.repeatitems && (c.cell && (h = n.jgrid.getAccessor(h, c.cell) || h), n.isArray(h) && (rt = ni)), k = 0; k < rt.length; k++) l[i.p.colModel[k + w + g + p].name] = n.jgrid.getAccessor(h, rt[k]);
									l[ft] = n.jgrid.stripPref(i.p.idPrefix, s);
									i.p.grouping && bt.call(tt, l, d);
									i.p.data.push(l);
									i.p._index[l[ft]] = i.p.data.length - 1;
									l = {}
								}
								d++
							}
							i.p.grouping && (i.p.groupingView._locgr = !0, tt.jqGrid("groupingRender", ht, i.p.colModel.length, i.p.page, st), ht = null)
						}
					}
				},
				pr = function() {
					function ut(u) {
						var e, s, l, h, f, o, c = 0;
						if (null != u.groups) {
							for (s = u.groups.length && "OR" === u.groupOp.toString().toUpperCase(), s && t.orBegin(), e = 0; e < u.groups.length; e++) {
								c > 0 && s && t.or();
								try {
									ut(u.groups[e])
								} catch(a) {
									alert(a)
								}
								c++
							}
							s && t.orEnd()
						}
						if (null != u.rules) try {
							for (l = u.rules.length && "OR" === u.groupOp.toString().toUpperCase(), l && t.orBegin(), e = 0; e < u.rules.length; e++) f = u.rules[e],
							h = u.groupOp.toString().toUpperCase(),
							w[f.op] && f.field && (c > 0 && h && "OR" === h && (t = t.or()), o = r[f.field], "date" === o.stype && o.srcfmt && o.newfmt && o.srcfmt !== o.newfmt && (f.data = n.jgrid.parseDate.call(i, o.newfmt, f.data, o.srcfmt)), t = w[f.op](t, h)(f.field, f.data, r[f.field])),
							c++;
							l && t.orEnd()
						} catch(v) {
							alert(v)
						}
					}
					var k, a, d, e, u = i.p.multiSort ? [] : "",
					ft = [],
					g = !1,
					r = {},
					tt = [],
					et = [],
					v,
					f,
					y,
					w,
					t,
					h,
					l,
					s,
					ot,
					st;
					if (n.isArray(i.p.data)) {
						if (y = i.p.grouping ? i.p.groupingView: !1, n.each(i.p.colModel,
						function() {
							if (a = this.sorttype || "text", "date" === a || "datetime" === a ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (k = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat: n.jgrid.getRegional(i, "formatter.date.srcformat"), d = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat: n.jgrid.getRegional(i, "formatter.date.newformat")) : k = d = this.datefmt || "Y-m-d", r[this.name] = {
								stype: a,
								srcfmt: k,
								newfmt: d,
								sfunc: this.sortfunc || null
							}) : r[this.name] = {
								stype: a,
								srcfmt: "",
								newfmt: "",
								sfunc: this.sortfunc || null
							},
							i.p.grouping) for (f = 0, v = y.groupField.length; v > f; f++) if (this.name === y.groupField[f]) {
								var t = this.name;
								this.index && (t = this.index);
								tt[f] = r[t];
								et[f] = t
							}
							i.p.multiSort || g || this.index !== i.p.sortname && this.name !== i.p.sortname || (u = this.name, g = !0)
						}), i.p.multiSort && (u = p, ft = nt), i.p.treeGrid && i.p._sort) return void n(i).jqGrid("SortTree", u, i.p.sortorder, r[u].stype || "text", r[u].srcfmt || "");
						if (w = {
							eq: function(n) {
								return n.equals
							},
							ne: function(n) {
								return n.notEquals
							},
							lt: function(n) {
								return n.less
							},
							le: function(n) {
								return n.lessOrEquals
							},
							gt: function(n) {
								return n.greater
							},
							ge: function(n) {
								return n.greaterOrEquals
							},
							cn: function(n) {
								return n.contains
							},
							nc: function(n, t) {
								return "OR" === t ? n.orNot().contains: n.andNot().contains
							},
							bw: function(n) {
								return n.startsWith
							},
							bn: function(n, t) {
								return "OR" === t ? n.orNot().startsWith: n.andNot().startsWith
							},
							en: function(n, t) {
								return "OR" === t ? n.orNot().endsWith: n.andNot().endsWith
							},
							ew: function(n) {
								return n.endsWith
							},
							ni: function(n, t) {
								return "OR" === t ? n.orNot().equals: n.andNot().equals
							},
							"in": function(n) {
								return n.equals
							},
							nu: function(n) {
								return n.isNull
							},
							nn: function(n, t) {
								return "OR" === t ? n.orNot().isNull: n.andNot().isNull
							}
						},
						t = n.jgrid.from.call(i, i.p.data), i.p.ignoreCase && (t = t.ignoreCase()), i.p.search === !0) if (h = i.p.postData.filters, h)"string" == typeof h && (h = n.jgrid.parse(h)),
						ut(h);
						else try {
							e = r[i.p.postData.searchField];
							"date" === e.stype && e.srcfmt && e.newfmt && e.srcfmt !== e.newfmt && (i.p.postData.searchString = n.jgrid.parseDate.call(i, e.newfmt, i.p.postData.searchString, e.srcfmt));
							t = w[i.p.postData.searchOper](t)(i.p.postData.searchField, i.p.postData.searchString, r[i.p.postData.searchField])
						} catch(ct) {} else i.p.treeGrid && "nested" === i.p.treeGridModel && t.orderBy(i.p.treeReader.left_field, "asc", "integer", "", null);
						if (i.p.treeGrid && "adjacency" === i.p.treeGridModel && (v = 0, u = null), i.p.grouping) for (f = 0; v > f; f++) t.orderBy(et[f], y.groupOrder[f], tt[f].stype, tt[f].srcfmt);
						i.p.multiSort ? n.each(u,
						function(n) {
							t.orderBy(this, ft[n], r[this].stype, r[this].srcfmt, r[this].sfunc)
						}) : u && i.p.sortorder && g && ("DESC" === i.p.sortorder.toUpperCase() ? t.orderBy(i.p.sortname, "d", r[u].stype, r[u].srcfmt, r[u].sfunc) : t.orderBy(i.p.sortname, "a", r[u].stype, r[u].srcfmt, r[u].sfunc));
						var o = t.select(),
						b = parseInt(i.p.rowNum, 10),
						it = o.length,
						rt = parseInt(i.p.page, 10),
						ht = Math.ceil(it / b),
						c = {};
						if ((i.p.search || i.p.resetsearch) && i.p.grouping && i.p.groupingView._locgr) {
							if (i.p.groupingView.groups = [], st = n.jgrid.getMethod("groupingPrepare"), i.p.footerrow && i.p.userDataOnFooter) {
								for (s in i.p.userData) i.p.userData.hasOwnProperty(s) && (i.p.userData[s] = 0);
								ot = !0
							}
							for (l = 0; it > l; l++) {
								if (ot) for (s in i.p.userData) i.p.userData.hasOwnProperty(s) && (i.p.userData[s] += parseFloat(o[l][s] || 0));
								st.call(n(i), o[l], l, b)
							}
						}
						return o = i.p.treeGrid && i.p.search ? n(i).jqGrid("searchTree", o) : o.slice((rt - 1) * b, rt * b),
						t = null,
						r = null,
						c[i.p.localReader.total] = ht,
						c[i.p.localReader.page] = rt,
						c[i.p.localReader.records] = it,
						c[i.p.localReader.root] = o,
						c[i.p.localReader.userdata] = i.p.userData,
						o = null,
						c
					}
				},
				wr = function(t, r) {
					var c, nt, f, b, a, k, p, it, l = "",
					d = i.p.pager ? n.jgrid.jqID(i.p.pager.substr(1)) : "",
					u = d ? "_" + d: "",
					h = i.p.toppager ? "_" + i.p.toppager.substr(1) : "",
					g,
					w,
					tt,
					rt,
					ut; (f = parseInt(i.p.page, 10) - 1, 0 > f && (f = 0), f *= parseInt(i.p.rowNum, 10), a = f + i.p.reccount, i.p.scroll) && (g = n("tbody:first > tr:gt(0)", i.grid.bDiv), f = a - g.length, i.p.reccount = g.length, w = g.outerHeight() || i.grid.prevRowHeight, w && (tt = f * w, rt = parseInt(i.p.records, 10) * w, n(">div:first", i.grid.bDiv).css({
						height: rt
					}).children("div:first").css({
						height: tt,
						display: tt ? "": "none"
					}), 0 === i.grid.bDiv.scrollTop && i.p.page > 1 && (i.grid.bDiv.scrollTop = i.p.rowNum * (i.p.page - 1) * w)), i.grid.bDiv.scrollLeft = i.grid.hDiv.scrollLeft); (l = i.p.pager || "", l += i.p.toppager ? l ? "," + i.p.toppager: i.p.toppager: "") && ((p = n.jgrid.getRegional(i, "formatter.integer"), c = v(i.p.page), nt = v(i.p.lastpage), n(".selbox", l)[this.p.useProp ? "prop": "attr"]("disabled", !1), i.p.pginput === !0 && (n("#input" + u).html(n.jgrid.template(n.jgrid.getRegional(i, "defaults.pgtext", i.p.pgtext) || "", "<input " + e(o, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + n.jgrid.jqID(d) + "'><\/span>")), i.p.toppager && n("#input_t" + h).html(n.jgrid.template(n.jgrid.getRegional(i, "defaults.pgtext", i.p.pgtext) || "", "<input " + e(o, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + n.jgrid.jqID(d) + "_toppager'><\/span>")), n(".ui-pg-input", l).val(i.p.page), it = i.p.toppager ? "#sp_1" + u + ",#sp_1" + u + "_toppager": "#sp_1" + u, n(it).html(n.fmatter ? n.fmatter.util.NumberFormat(i.p.lastpage, p) : i.p.lastpage)), i.p.viewrecords) && (0 === i.p.reccount ? n(".ui-paging-info", l).html(n.jgrid.getRegional(i, "defaults.emptyrecords", i.p.emptyrecords)) : (b = f + 1, k = i.p.records, n.fmatter && (b = n.fmatter.util.NumberFormat(b, p), a = n.fmatter.util.NumberFormat(a, p), k = n.fmatter.util.NumberFormat(k, p)), ut = n.jgrid.getRegional(i, "defaults.recordtext", i.p.recordtext), n(".ui-paging-info", l).html(n.jgrid.template(ut, b, a, k)))), i.p.pgbuttons === !0 && (0 >= c && (c = nt = 0), 1 === c || 0 === c ? (n("#first" + u + ", #prev" + u).addClass(s).removeClass(y), i.p.toppager && n("#first_t" + h + ", #prev_t" + h).addClass(s).removeClass(y)) : (n("#first" + u + ", #prev" + u).removeClass(s), i.p.toppager && n("#first_t" + h + ", #prev_t" + h).removeClass(s)), c === nt || 0 === c ? (n("#next" + u + ", #last" + u).addClass(s).removeClass(y), i.p.toppager && n("#next_t" + h + ", #last_t" + h).addClass(s).removeClass(y)) : (n("#next" + u + ", #last" + u).removeClass(s), i.p.toppager && n("#next_t" + h + ", #last_t" + h).removeClass(s))));
					t === !0 && i.p.rownumbers === !0 && n(">td.jqgrid-rownum", i.rows).each(function(t) {
						n(this).html(f + 1 + t)
					});
					r && i.p.jqgdnd && n(i).jqGrid("gridDnD", "updateDnD");
					n(i).triggerHandler("jqGridGridComplete");
					n.isFunction(i.p.gridComplete) && i.p.gridComplete.call(i);
					n(i).triggerHandler("jqGridAfterGridComplete")
				},
				lt = function() {
					i.grid.hDiv.loading = !0;
					i.p.hiddengrid || n(i).jqGrid("progressBar", {
						method: "show",
						loadtype: i.p.loadui,
						htmlcontent: n.jgrid.getRegional(i, "defaults.loadtext", i.p.loadtext)
					})
				},
				ft = function() {
					i.grid.hDiv.loading = !1;
					n(i).jqGrid("progressBar", {
						method: "hide",
						loadtype: i.p.loadui
					})
				},
				tt = function(t) {
					var h, v, w, y, c, e, l;
					if (!i.grid.hDiv.loading) {
						var p, f, b = i.p.scroll && t === !1,
						u = {},
						r = i.p.prmNames;
						i.p.page <= 0 && (i.p.page = Math.min(1, i.p.lastpage));
						null !== r.search && (u[r.search] = i.p.search);
						null !== r.nd && (u[r.nd] = (new Date).getTime());
						null !== r.rows && (u[r.rows] = i.p.rowNum);
						null !== r.page && (u[r.page] = i.p.page);
						null !== r.sort && (u[r.sort] = i.p.sortname);
						null !== r.order && (u[r.order] = i.p.sortorder);
						null !== i.p.rowTotal && null !== r.totalrows && (u[r.totalrows] = i.p.rowTotal);
						var a = n.isFunction(i.p.loadComplete),
						o = a ? i.p.loadComplete: null,
						s = 0;
						if (t = t || 1, t > 1 ? null !== r.npage ? (u[r.npage] = t, s = t - 1, t = 1) : o = function(n) {
							i.p.page++;
							i.grid.hDiv.loading = !1;
							a && i.p.loadComplete.call(i, n);
							tt(t - 1)
						}: null !== r.npage && delete i.p.postData[r.npage], i.p.grouping) {
							for (n(i).jqGrid("groupingSetup"), v = i.p.groupingView, w = "", h = 0; h < v.groupField.length; h++) y = v.groupField[h],
							n.each(i.p.colModel,
							function(n, t) {
								t.name === y && t.index && (y = t.index)
							}),
							w += y + " " + v.groupOrder[h] + ", ";
							u[r.sort] = w + u[r.sort]
						}
						if (n.extend(i.p.postData, u), c = i.p.scroll ? i.rows.length - 1 : 1, e = n(i).triggerHandler("jqGridBeforeRequest"), e === !1 || "stop" === e) return;
						if (n.isFunction(i.p.datatype)) return void i.p.datatype.call(i, i.p.postData, "load_" + i.p.id, c, t, s);
						if (n.isFunction(i.p.beforeRequest) && (e = i.p.beforeRequest.call(i), void 0 === e && (e = !0), e === !1)) return;
						switch (p = i.p.datatype.toLowerCase()) {
						case "json":
						case "jsonp":
						case "xml":
						case "script":
							n.ajax(n.extend({
								url:
								i.p.url,
								type: i.p.mtype,
								dataType: p,
								data: n.isFunction(i.p.serializeGridData) ? i.p.serializeGridData.call(i, i.p.postData) : i.p.postData,
								success: function(r, u, f) {
									return n.isFunction(i.p.beforeProcessing) && i.p.beforeProcessing.call(i, r, u, f) === !1 ? void ft() : ("xml" === p ? ci(r, c, t > 1, s) : dt(r, c, t > 1, s), n(i).triggerHandler("jqGridLoadComplete", [r]), o && o.call(i, r), n(i).triggerHandler("jqGridAfterLoadComplete", [r]), b && i.grid.populateVisible(), (i.p.loadonce || i.p.treeGrid) && (i.p.datatype = "local"), r = null, void(1 === t && ft()))
								},
								error: function(r, u, f) {
									n.isFunction(i.p.loadError) && i.p.loadError.call(i, r, u, f);
									1 === t && ft();
									r = null
								},
								beforeSend: function(t, r) {
									var u = !0;
									return n.isFunction(i.p.loadBeforeSend) && (u = i.p.loadBeforeSend.call(i, t, r)),
									void 0 === u && (u = !0),
									u === !1 ? !1 : void lt()
								}
							},
							n.jgrid.ajaxOptions, i.p.ajaxGridOptions));
							break;
						case "xmlstring":
							lt();
							f = "string" != typeof i.p.datastr ? i.p.datastr: n.parseXML(i.p.datastr);
							ci(f);
							n(i).triggerHandler("jqGridLoadComplete", [f]);
							a && i.p.loadComplete.call(i, f);
							n(i).triggerHandler("jqGridAfterLoadComplete", [f]);
							i.p.datatype = "local";
							i.p.datastr = null;
							ft();
							break;
						case "jsonstring":
							lt();
							f = "string" == typeof i.p.datastr ? n.jgrid.parse(i.p.datastr) : i.p.datastr;
							dt(f);
							n(i).triggerHandler("jqGridLoadComplete", [f]);
							a && i.p.loadComplete.call(i, f);
							n(i).triggerHandler("jqGridAfterLoadComplete", [f]);
							i.p.datatype = "local";
							i.p.datastr = null;
							ft();
							break;
						case "local":
						case "clientside":
							lt();
							i.p.datatype = "local";
							i.p._ald = !0;
							l = pr();
							dt(l, c, t > 1, s);
							n(i).triggerHandler("jqGridLoadComplete", [l]);
							o && o.call(i, l);
							n(i).triggerHandler("jqGridAfterLoadComplete", [l]);
							b && i.grid.populateVisible();
							ft();
							i.p._ald = !1
						}
						i.p._sort = !1
					}
				},
				gt = function(t) {
					n("#cb_" + n.jgrid.jqID(i.p.id), i.grid.hDiv)[i.p.useProp ? "prop": "attr"]("checked", t);
					var r = i.p.frozenColumns ? i.p.id + "_frozen": "";
					r && n("#cb_" + n.jgrid.jqID(i.p.id), i.grid.fhDiv)[i.p.useProp ? "prop": "attr"]("checked", t)
				},
				ur = function(t, r) {
					var f, it, rt, ut, c, ft, k, et = "<td class='ui-pg-button " + s + "'><span class='ui-separator'><\/span><\/td>",
					l = "",
					u = "<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>",
					p = "",
					nt = function(t, r) {
						var u;
						return n.isFunction(i.p.onPaging) && (u = i.p.onPaging.call(i, t, r)),
						"stop" === u ? !1 : (i.p.selrow = null, i.p.multiselect && (i.p.selarrrow = [], gt(!1)), i.p.savedRow = [], !0)
					},
					h;
					if (t = t.substr(1), r += "_" + t, f = "pg_" + t, it = t + "_left", rt = t + "_center", ut = t + "_right", n("#" + n.jgrid.jqID(t)).append("<div id='" + f + "' class='ui-pager-control' role='group'><table class='ui-pg-table ui-common-table ui-pager-table'><tbody><tr><td id='" + it + "' align='left'><\/td><td id='" + rt + "' align='center' style='white-space:pre;'><\/td><td id='" + ut + "' align='right'><\/td><\/tr><\/tbody><\/table><\/div>").attr("dir", "ltr"), i.p.rowList.length > 0) {
						for (p = '<td dir="' + a + '">', p += "<select " + e(o, "pgSelectBox", !1, "ui-pg-selbox") + ' role="listbox" title="' + (n.jgrid.getRegional(i, "defaults.pgrecs", i.p.pgrecs) || "") + '">', k = 0; k < i.p.rowList.length; k++) h = i.p.rowList[k].toString().split(":"),
						1 === h.length && (h[1] = h[0]),
						p += '<option role="option" value="' + h[0] + '"' + (v(i.p.rowNum, 0) === v(h[0], 0) ? ' selected="selected"': "") + ">" + h[1] + "<\/option>";
						p += "<\/select><\/td>"
					}
					if ("rtl" === a && (u += p), i.p.pginput === !0 && (l = "<td id='input" + r + "' dir='" + a + "'>" + n.jgrid.template(n.jgrid.getRegional(i, "defaults.pgtext", i.p.pgtext) || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + n.jgrid.jqID(t) + "'><\/span>") + "<\/td>"), i.p.pgbuttons === !0) {
						var w = ["first" + r, "prev" + r, "next" + r, "last" + r],
						d = e(o, "pgButtonBox", !0, "ui-pg-button"),
						b = [n.jgrid.getRegional(i, "defaults.pgfirst", i.p.pgfirst) || "", n.jgrid.getRegional(i, "defaults.pgprev", i.p.pgprev) || "", n.jgrid.getRegional(i, "defaults.pgnext", i.p.pgnext) || "", n.jgrid.getRegional(i, "defaults.pglast", i.p.pglast) || ""];
						"rtl" === a && (w.reverse(), b.reverse());
						u += "<td id='" + w[0] + "' class='" + d + "' title='" + b[0] + "'><span " + e(o, "icon_first", !1, g) + "><\/span><\/td>";
						u += "<td id='" + w[1] + "' class='" + d + "'  title='" + b[1] + "'><span " + e(o, "icon_prev", !1, g) + "><\/span><\/td>";
						u += "" !== l ? et + l + et: "";
						u += "<td id='" + w[2] + "' class='" + d + "' title='" + b[2] + "'><span " + e(o, "icon_next", !1, g) + "><\/span><\/td>";
						u += "<td id='" + w[3] + "' class='" + d + "' title='" + b[3] + "'><span " + e(o, "icon_end", !1, g) + "><\/span><\/td>"
					} else "" !== l && (u += l);
					"ltr" === a && (u += p);
					u += "<\/tr><\/tbody><\/table>";
					i.p.viewrecords === !0 && n("td#" + t + "_" + i.p.recordpos, "#" + f).append("<div dir='" + a + "' style='text-align:" + i.p.recordpos + "' class='ui-paging-info'><\/div>");
					n("td#" + t + "_" + i.p.pagerpos, "#" + f).append(u);
					ft = n("#gbox_" + n.jgrid.jqID(i.p.id)).css("font-size") || "11px";
					n("#gbox_" + n.jgrid.jqID(i.p.id)).append("<div id='testpg' " + e(o, "entrieBox", !1, "ui-jqgrid") + " style='font-size:" + ft + ";visibility:hidden;' ><\/div>");
					c = n(u).clone().appendTo("#testpg").width();
					n("#testpg").remove();
					c > 0 && ("" !== l && (c += 50), n("td#" + t + "_" + i.p.pagerpos, "#" + f).width(c));
					i.p._nvtd = [];
					i.p._nvtd[0] = Math.floor(c ? (i.p.width - c) / 2 : i.p.width / 3);
					i.p._nvtd[1] = 0;
					u = null;
					n(".ui-pg-selbox", "#" + f).bind("change",
					function() {
						return nt("records", this) ? (i.p.page = Math.round(i.p.rowNum * (i.p.page - 1) / this.value - .5) + 1, i.p.rowNum = this.value, i.p.pager && n(".ui-pg-selbox", i.p.pager).val(this.value), i.p.toppager && n(".ui-pg-selbox", i.p.toppager).val(this.value), tt(), !1) : !1
					});
					i.p.pgbuttons === !0 && (n(".ui-pg-button", "#" + f).hover(function() {
						n(this).hasClass(s) ? this.style.cursor = "default": (n(this).addClass(y), this.style.cursor = "pointer")
					},
					function() {
						n(this).hasClass(s) || (n(this).removeClass(y), this.style.cursor = "default")
					}), n("#first" + n.jgrid.jqID(r) + ", #prev" + n.jgrid.jqID(r) + ", #next" + n.jgrid.jqID(r) + ", #last" + n.jgrid.jqID(r)).click(function() {
						if (n(this).hasClass(s)) return ! 1;
						var t = v(i.p.page, 1),
						u = v(i.p.lastpage, 1),
						f = !1,
						h = !0,
						c = !0,
						e = !0,
						o = !0;
						return 0 === u || 1 === u ? (h = !1, c = !1, e = !1, o = !1) : u > 1 && t >= 1 ? 1 === t ? (h = !1, c = !1) : t === u && (e = !1, o = !1) : u > 1 && 0 === t && (e = !1, o = !1, t = u - 1),
						nt(this.id.split("_")[0], this) ? (this.id === "first" + r && h && (i.p.page = 1, f = !0), this.id === "prev" + r && c && (i.p.page = t - 1, f = !0), this.id === "next" + r && e && (i.p.page = t + 1, f = !0), this.id === "last" + r && o && (i.p.page = u, f = !0), f && tt(), !1) : !1
					}));
					i.p.pginput === !0 && n("#" + f).on("keypress", "input.ui-pg-input",
					function(t) {
						var r = t.charCode || t.keyCode || 0;
						return 13 === r ? nt("user", this) ? (n(this).val(v(n(this).val(), 1)), i.p.page = n(this).val() > 0 ? n(this).val() : i.p.page, tt(), !1) : !1 : this
					})
				},
				br = function(t, r) {
					var l, u = i.p.colModel,
					o = i.p.frozenColumns ? r: i.grid.headers[t].el,
					f = "",
					h,
					e,
					c;
					for (n("span.ui-grid-ico-sort", o).addClass(s), n(o).attr("aria-selected", "false"), l = "local" === i.p.datatype ? u[t].name: u[t].index || u[t].name, u[t].lso ? "asc" === u[t].lso ? (u[t].lso += "-desc", f = "desc") : "desc" === u[t].lso ? (u[t].lso += "-asc", f = "asc") : ("asc-desc" === u[t].lso || "desc-asc" === u[t].lso) && (u[t].lso = "") : u[t].lso = f = u[t].firstsortorder || "asc", f ? (n("span.s-ico", o).show(), n("span.ui-icon-" + f, o).removeClass(s), n(o).attr("aria-selected", "true")) : i.p.viewsortcols[0] || n("span.s-ico", o).hide(), h = p.indexOf(l), -1 === h ? (p.push(l), nt.push(f)) : f ? nt[h] = f: (nt.splice(h, 1), p.splice(h, 1)), i.p.sortorder = "", i.p.sortname = "", e = 0, c = p.length; c > e; e++) e > 0 && (i.p.sortname += ", "),
					i.p.sortname += p[e],
					e !== c - 1 && (i.p.sortname += " " + nt[e]);
					i.p.sortorder = nt[c - 1]
				},
				fr = function(t, r, u, f, e) {
					var a;
					if (i.p.colModel[r].sortable && !(i.p.savedRow.length > 0)) {
						if (u || (i.p.lastsort === r && "" !== i.p.sortname ? "asc" === i.p.sortorder ? i.p.sortorder = "desc": "desc" === i.p.sortorder && (i.p.sortorder = "asc") : i.p.sortorder = i.p.colModel[r].firstsortorder || "asc", i.p.page = 1), i.p.multiSort) br(r, e);
						else {
							if (f) {
								if (i.p.lastsort === r && i.p.sortorder === f && !u) return;
								i.p.sortorder = f
							}
							var o, c = i.grid.headers[i.p.lastsort] ? i.grid.headers[i.p.lastsort].el: null,
							h = i.p.frozenColumns ? e: i.grid.headers[r].el,
							l = "single" === i.p.viewsortcols[1] ? !0 : !1;
							o = n(c).find("span.ui-grid-ico-sort");
							o.addClass(s);
							l && n(o).css("display", "none");
							n(c).attr("aria-selected", "false");
							i.p.frozenColumns && (o = i.grid.fhDiv.find("span.ui-grid-ico-sort"), o.addClass(s), l && o.css("display", "none"), i.grid.fhDiv.find("th").attr("aria-selected", "false"));
							o = n(h).find("span.ui-icon-" + i.p.sortorder);
							o.removeClass(s);
							l && o.css("display", "");
							n(h).attr("aria-selected", "true");
							i.p.viewsortcols[0] || (i.p.lastsort !== r ? (i.p.frozenColumns && i.grid.fhDiv.find("span.s-ico").hide(), n("span.s-ico", c).hide(), n("span.s-ico", h).show()) : "" === i.p.sortname && n("span.s-ico", h).show());
							t = t.substring(5 + i.p.id.length + 1);
							i.p.sortname = i.p.colModel[r].index || t
						}
						if ("stop" === n(i).triggerHandler("jqGridSortCol", [i.p.sortname, r, i.p.sortorder]) || n.isFunction(i.p.onSortCol) && "stop" === i.p.onSortCol.call(i, i.p.sortname, r, i.p.sortorder)) return void(i.p.lastsort = r); ("local" === i.p.datatype ? i.p.deselectAfterSort && n(i).jqGrid("resetSelection") : (i.p.selrow = null, i.p.multiselect && gt(!1), i.p.selarrrow = [], i.p.savedRow = []), i.p.scroll) && (a = i.grid.bDiv.scrollLeft, ct.call(i, !0, !1), i.grid.hDiv.scrollLeft = a);
						i.p.subGrid && "local" === i.p.datatype && n("td.sgexpanded", "#" + n.jgrid.jqID(i.p.id)).each(function() {
							n(this).trigger("click")
						});
						i.p._sort = !0;
						tt();
						i.p.lastsort = r;
						i.p.sortname !== t && r && (i.p.lastsort = r)
					}
				},
				kr = function() {
					var c, o, l, s, t = 0,
					u = n.jgrid.cell_width ? 0 : v(i.p.cellLayout, 0),
					f = 0,
					h = v(i.p.scrollOffset, 0),
					a = !1,
					e = 0;
					n.each(i.p.colModel,
					function() {
						if (void 0 === this.hidden && (this.hidden = !1), i.p.grouping && i.p.autowidth) {
							var r = n.inArray(this.name, i.p.groupingView.groupField);
							r >= 0 && i.p.groupingView.groupColumnShow.length > r && (this.hidden = !i.p.groupingView.groupColumnShow[r])
						}
						this.widthOrg = o = v(this.width, 0);
						this.hidden === !1 && (t += o + u, this.fixed ? e += o + u: f++)
					});
					isNaN(i.p.width) && (i.p.width = t + (i.p.shrinkToFit !== !1 || isNaN(i.p.height) ? 0 : h));
					r.width = i.p.width;
					i.p.tblwidth = t;
					i.p.shrinkToFit === !1 && i.p.forceFit === !0 && (i.p.forceFit = !1);
					i.p.shrinkToFit === !0 && f > 0 && (l = r.width - u * f - e, isNaN(i.p.height) || (l -= h, a = !0), t = 0, n.each(i.p.colModel,
					function(n) {
						this.hidden !== !1 || this.fixed || (o = Math.round(l * this.width / (i.p.tblwidth - u * f - e)), this.width = o, t += o, c = n)
					}), s = 0, a ? r.width - e - (t + u * f) !== h && (s = r.width - e - (t + u * f) - h) : a || 1 === Math.abs(r.width - e - (t + u * f)) || (s = r.width - e - (t + u * f)), i.p.colModel[c].width += s, i.p.tblwidth = t + s + u * f + e, i.p.tblwidth > i.p.width && (i.p.colModel[c].width -= i.p.tblwidth - parseInt(i.p.width, 10), i.p.tblwidth = i.p.width))
				},
				dr = function(n) {
					for (var u = n,
					r = n,
					t = n + 1; t < i.p.colModel.length; t++) if (i.p.colModel[t].hidden !== !0) {
						r = t;
						break
					}
					return r - u
				},
				gr = function(t) {
					var u = n(i.grid.headers[t].el),
					r = [u.position().left + u.outerWidth()];
					return "rtl" === i.p.direction && (r[0] = i.p.width - r[0]),
					r[0] -= i.grid.bDiv.scrollLeft,
					r.push(n(i.grid.hDiv).position().top),
					r.push(n(i.grid.bDiv).offset().top - n(i.grid.hDiv).offset().top + n(i.grid.bDiv).height()),
					r
				},
				er = function(t) {
					for (var u = i.grid.headers,
					f = n.jgrid.getCellIndex(t), r = 0; r < u.length; r++) if (t === u[r].el) {
						f = r;
						break
					}
					return f
				};
				for (this.p.id = this.id, -1 === n.inArray(i.p.multikey, ["shiftKey", "altKey", "ctrlKey"]) && (i.p.multikey = !1), i.p.keyName = !1, f = 0; f < i.p.colModel.length; f++) di = "string" == typeof i.p.colModel[f].template ? null != n.jgrid.cmTemplate && "object" == typeof n.jgrid.cmTemplate[i.p.colModel[f].template] ? n.jgrid.cmTemplate[i.p.colModel[f].template] : {}: i.p.colModel[f].template,
				i.p.colModel[f] = n.extend(!0, {},
				i.p.cmTemplate, di || {},
				i.p.colModel[f]),
				i.p.keyName === !1 && i.p.colModel[f].key === !0 && (i.p.keyName = i.p.colModel[f].name);
				if (i.p.sortorder = i.p.sortorder.toLowerCase(), n.jgrid.cell_width = n.jgrid.cellWidth(), i.p.grouping === !0 && (i.p.scroll = !1, i.p.rownumbers = !1, i.p.treeGrid = !1, i.p.gridview = !0), this.p.treeGrid === !0) {
					try {
						n(this).jqGrid("setTreeGrid")
					} catch(nu) {}
					"local" !== i.p.datatype && (i.p.localReader = {
						id: "_id_"
					})
				}
				if (this.p.subGrid) try {
					n(i).jqGrid("setSubGrid")
				} catch(tu) {}
				this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
					name: "cb",
					width: n.jgrid.cell_width ? i.p.multiselectWidth + i.p.cellLayout: i.p.multiselectWidth,
					sortable: !1,
					resizable: !1,
					hidedlg: !0,
					search: !1,
					align: "center",
					fixed: !0,
					frozen: !0
				}));
				this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
					name: "rn",
					width: i.p.rownumWidth,
					sortable: !1,
					resizable: !1,
					hidedlg: !0,
					search: !1,
					align: "center",
					fixed: !0,
					frozen: !0
				}));
				i.p.xmlReader = n.extend(!0, {
					root: "rows",
					row: "row",
					page: "rows>page",
					total: "rows>total",
					records: "rows>records",
					repeatitems: !0,
					cell: "cell",
					id: "[id]",
					userdata: "userdata",
					subgrid: {
						root: "rows",
						row: "row",
						repeatitems: !0,
						cell: "cell"
					}
				},
				i.p.xmlReader);
				i.p.jsonReader = n.extend(!0, {
					root: "rows",
					page: "page",
					total: "total",
					records: "records",
					repeatitems: !0,
					cell: "cell",
					id: "id",
					userdata: "userdata",
					subgrid: {
						root: "rows",
						repeatitems: !0,
						cell: "cell"
					}
				},
				i.p.jsonReader);
				i.p.localReader = n.extend(!0, {
					root: "rows",
					page: "page",
					total: "total",
					records: "records",
					repeatitems: !1,
					cell: "cell",
					id: "id",
					userdata: "userdata",
					subgrid: {
						root: "rows",
						repeatitems: !0,
						cell: "cell"
					}
				},
				i.p.localReader);
				i.p.scroll && (i.p.pgbuttons = !1, i.p.pginput = !1, i.p.rowList = []);
				i.p.data.length && (rr(), si());
				var or, li, ni, at, c, h, sr, vt, k = "<thead><tr class='ui-jqgrid-labels' role='row'>",
				et = "",
				ai = "",
				vi = "";
				if (i.p.shrinkToFit === !0 && i.p.forceFit === !0) for (f = i.p.colModel.length - 1; f >= 0; f--) if (!i.p.colModel[f].hidden) {
					i.p.colModel[f].resizable = !1;
					break
				}
				if ("horizontal" === i.p.viewsortcols[1] ? (ai = " ui-i-asc", vi = " ui-i-desc") : "single" === i.p.viewsortcols[1] && (ai = " ui-single-sort-asc", vi = " ui-single-sort-desc", et = " style='display:none'", i.p.viewsortcols[0] = !1), or = ki ? "class='ui-th-div-ie'": "", vt = "<span class='s-ico' style='display:none'>", vt += "<span sort='asc'  class='ui-grid-ico-sort ui-icon-asc" + ai + " ui-sort-" + a + " " + s + " " + g + " " + e(o, "icon_asc", !0) + "'" + et + "><\/span>", vt += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + vi + " ui-sort-" + a + " " + s + " " + g + " " + e(o, "icon_desc", !0) + "'" + et + "><\/span><\/span>", i.p.multiSort && i.p.sortname) for (p = i.p.sortname.split(","), f = 0; f < p.length; f++) rt = n.trim(p[f]).split(" "),
				p[f] = n.trim(rt[0]),
				nt[f] = rt[1] ? n.trim(rt[1]) : i.p.sortorder || "asc";
				for (f = 0; f < this.p.colNames.length; f++) hr = i.p.headertitles ? ' title="' + n.jgrid.stripHtml(i.p.colNames[f]) + '"': "",
				k += "<th id='" + i.p.id + "_" + i.p.colModel[f].name + "' role='columnheader' " + e(o, "headerBox", !1, "ui-th-column ui-th-" + a) + " " + hr + ">",
				li = i.p.colModel[f].index || i.p.colModel[f].name,
				k += "<div id='jqgh_" + i.p.id + "_" + i.p.colModel[f].name + "' " + or + ">" + i.p.colNames[f],
				i.p.colModel[f].width = i.p.colModel[f].width ? parseInt(i.p.colModel[f].width, 10) : 150,
				"boolean" != typeof i.p.colModel[f].title && (i.p.colModel[f].title = !0),
				i.p.colModel[f].lso = "",
				li === i.p.sortname && (i.p.lastsort = f),
				i.p.multiSort && (rt = n.inArray(li, p), -1 !== rt && (i.p.colModel[f].lso = nt[rt])),
				k += vt + "<\/div><\/th>";
				if ((k += "<\/tr><\/thead>", vt = null, n(this).append(k), n("thead tr:first th", this).hover(function() {
					n(this).addClass(y)
				},
				function() {
					n(this).removeClass(y)
				}), this.p.multiselect) && (yt = [], n("#cb_" + n.jgrid.jqID(i.p.id), this).bind("click",
				function() {
					i.p.selarrrow = [];
					var t = i.p.frozenColumns === !0 ? i.p.id + "_frozen": "";
					this.checked ? (n(i.rows).each(function(r) {
						r > 0 && (n(this).hasClass("ui-subgrid") || n(this).hasClass("jqgroup") || n(this).hasClass(s) || n(this).hasClass("jqfoot") || (n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(this.id))[i.p.useProp ? "prop": "attr"]("checked", !0), n(this).addClass(it).attr("aria-selected", "true"), i.p.selarrrow.push(this.id), i.p.selrow = this.id, t && (n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(this.id), i.grid.fbDiv)[i.p.useProp ? "prop": "attr"]("checked", !0), n("#" + n.jgrid.jqID(this.id), i.grid.fbDiv).addClass(it))))
					}), ot = !0, yt = []) : (n(i.rows).each(function(r) {
						r > 0 && (n(this).hasClass("ui-subgrid") || n(this).hasClass("jqgroup") || n(this).hasClass(s) || n(this).hasClass("jqfoot") || (n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(this.id))[i.p.useProp ? "prop": "attr"]("checked", !1), n(this).removeClass(it).attr("aria-selected", "false"), yt.push(this.id), t && (n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(this.id), i.grid.fbDiv)[i.p.useProp ? "prop": "attr"]("checked", !1), n("#" + n.jgrid.jqID(this.id), i.grid.fbDiv).removeClass(it))))
					}), i.p.selrow = null, ot = !1);
					n(i).triggerHandler("jqGridSelectAll", [ot ? i.p.selarrrow: yt, ot]);
					n.isFunction(i.p.onSelectAll) && i.p.onSelectAll.call(i, ot ? i.p.selarrrow: yt, ot)
				})), i.p.autowidth === !0 && (yi = n(ut).innerWidth(), i.p.width = yi > 0 ? yi: "nw"), kr(), n(ut).css("width", r.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + i.p.id + "'>&#160;<\/div>"), i.p.scrollPopUp && n(ut).append("<div " + e(o, "scrollBox", !1, "loading ui-scroll-popup") + " id='scroll_g" + i.p.id + "'><\/div>"), n(d).css("width", r.width + "px"), k = n("thead:first", i).get(0), pt = "", i.p.footerrow && (pt += "<table role='presentation' style='width:" + i.p.tblwidth + "px' " + e(o, "footerTable", !1, "ui-jqgrid-ftable ui-common-table") + "><tbody><tr role='row' " + e(o, "footerBox", !1, "footrow footrow-" + a) + ">"), pi = n("tr:first", k), wt = "<tr class='jqgfirstrow' role='row'>", i.p.disableClick = !1, n("th", pi).each(function(t) {
					var f, u;
					ni = i.p.colModel[t].width;
					void 0 === i.p.colModel[t].resizable && (i.p.colModel[t].resizable = !0);
					i.p.colModel[t].resizable ? (at = document.createElement("span"), n(at).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + a).css("cursor", "col-resize"), n(this).addClass(i.p.resizeclass)) : at = "";
					n(this).css("width", ni + "px").prepend(at);
					at = null;
					f = "";
					i.p.colModel[t].hidden && (n(this).css("display", "none"), f = "display:none;");
					wt += "<td role='gridcell' style='height:0px;width:" + ni + "px;" + f + "'><\/td>";
					r.headers[t] = {
						width: ni,
						el: this
					};
					et = i.p.colModel[t].sortable;
					"boolean" != typeof et && (i.p.colModel[t].sortable = !0, et = !0);
					u = i.p.colModel[t].name;
					"cb" !== u && "subgrid" !== u && "rn" !== u && i.p.viewsortcols[2] && n(">div", this).addClass("ui-jqgrid-sortable");
					et && (i.p.multiSort ? i.p.viewsortcols[0] ? (n("div span.s-ico", this).show(), i.p.colModel[t].lso && n("div span.ui-icon-" + i.p.colModel[t].lso, this).removeClass(s).css("display", "")) : i.p.colModel[t].lso && (n("div span.s-ico", this).show(), n("div span.ui-icon-" + i.p.colModel[t].lso, this).removeClass(s).css("display", "")) : i.p.viewsortcols[0] ? (n("div span.s-ico", this).show(), t === i.p.lastsort && n("div span.ui-icon-" + i.p.sortorder, this).removeClass(s).css("display", "")) : t === i.p.lastsort && "" !== i.p.sortname && (n("div span.s-ico", this).show(), n("div span.ui-icon-" + i.p.sortorder, this).removeClass(s).css("display", "")));
					i.p.footerrow && (pt += "<td role='gridcell' " + ht(t, 0, "", null, "", !1) + ">&#160;<\/td>")
				}).mousedown(function(t) {
					if (1 === n(t.target).closest("th>span.ui-jqgrid-resize").length) {
						var u = er(this);
						return i.p.forceFit === !0 && (i.p.nv = dr(u)),
						r.dragStart(u, t, gr(u)),
						!1
					}
				}).click(function(t) {
					var e, o, u, f, r, s;
					return i.p.disableClick ? (i.p.disableClick = !1, !1) : (u = "th>div.ui-jqgrid-sortable", i.p.viewsortcols[2] || (u = "th>div>span>span.ui-grid-ico-sort"), f = n(t.target).closest(u), 1 === f.length ? (i.p.frozenColumns ? (s = n(this)[0].id.substring(i.p.id.length + 1), n(i.p.colModel).each(function(n) {
						if (this.name === s) return (r = n, !1)
					})) : r = er(this), i.p.viewsortcols[2] || (e = !0, o = f.attr("sort")), null != r && fr(n("div", this)[0].id, r, e, o, this), !1) : void 0)
				}), i.p.sortable && n.fn.sortable) try {
					n(i).jqGrid("sortableColumns", pi)
				} catch(iu) {}
				i.p.footerrow && (pt += "<\/tr><\/tbody><\/table>");
				wt += "<\/tr>";
				sr = document.createElement("tbody");
				this.appendChild(sr);
				n(this).addClass(e(o, "rowTable", !0, "ui-jqgrid-btable ui-common-table")).append(wt);
				wt = null;
				var cr = n("<table " + e(o, "headerTable", !1, "ui-jqgrid-htable ui-common-table") + " style='width:" + i.p.tblwidth + "px' role='presentation' aria-labelledby='gbox_" + this.id + "'><\/table>").append(k),
				w = i.p.caption && i.p.hiddengrid === !0 ? !0 : !1,
				st = n("<div class='ui-jqgrid-hbox" + ("rtl" === a ? "-rtl": "") + "'><\/div>");
				if (k = null, r.hDiv = document.createElement("div"), r.hDiv.style.width = r.width + "px", r.hDiv.className = e(o, "headerDiv", !0, "ui-jqgrid-hdiv"), n(r.hDiv).append(st), n(st).append(cr), cr = null, w && n(r.hDiv).hide(), i.p.pager && ("string" == typeof i.p.pager ? "#" !== i.p.pager.substr(0, 1) && (i.p.pager = "#" + i.p.pager) : i.p.pager = "#" + n(i.p.pager).attr("id"), n(i.p.pager).css({
					width: r.width + "px"
				}).addClass(e(o, "pagerBox", !0, "ui-jqgrid-pager")).appendTo(ut), w && n(i.p.pager).hide(), ur(i.p.pager, "")), i.p.cellEdit === !1 && i.p.hoverrows === !0 && n(i).bind("mouseover",
				function(t) {
					h = n(t.target).closest("tr.jqgrow");
					"ui-subgrid" !== n(h).attr("class") && n(h).addClass(y)
				}).bind("mouseout",
				function(t) {
					h = n(t.target).closest("tr.jqgrow");
					n(h).removeClass(y)
				}), n(i).before(r.hDiv).click(function(t) {
					var r, u, e, f;
					if (c = t.target, h = n(c, i.rows).closest("tr.jqgrow"), 0 === n(h).length || h[0].className.indexOf(s) > -1 || (n(c, i).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== i.id) return this;
					if (r = n(c).hasClass("cbox"), u = n(i).triggerHandler("jqGridBeforeSelectRow", [h[0].id, t]), (u = u === !1 || "stop" === u ? !1 : !0, n.isFunction(i.p.beforeSelectRow)) && (e = i.p.beforeSelectRow.call(i, h[0].id, t), (e === !1 || "stop" === e) && (u = !1)), "A" !== c.tagName && ("INPUT" !== c.tagName && "TEXTAREA" !== c.tagName && "OPTION" !== c.tagName && "SELECT" !== c.tagName || r)) {
						if (l = h[0].id, c = n(c).closest("tr.jqgrow>td"), c.length > 0 && (b = n.jgrid.getCellIndex(c), wi = n(c).closest("td,th").html(), n(i).triggerHandler("jqGridCellSelect", [l, b, wi, t]), n.isFunction(i.p.onCellSelect) && i.p.onCellSelect.call(i, l, b, wi, t)), i.p.cellEdit === !0) if (i.p.multiselect && r && u) n(i).jqGrid("setSelection", l, !0, t);
						else if (c.length > 0) {
							l = h[0].rowIndex;
							try {
								n(i).jqGrid("editCell", l, b, !0)
							} catch(o) {}
						}
						u && (i.p.multikey ? t[i.p.multikey] ? n(i).jqGrid("setSelection", l, !0, t) : i.p.multiselect && r && (r = n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + l).is(":checked"), n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + l)[i.p.useProp ? "prop": "attr"]("checked", !r)) : i.p.multiselect && i.p.multiboxonly ? r ? n(i).jqGrid("setSelection", l, !0, t) : (f = i.p.frozenColumns ? i.p.id + "_frozen": "", n(i.p.selarrrow).each(function(t, r) {
							var u = n(i).jqGrid("getGridRowById", r);
							u && n(u).removeClass(it);
							n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(r))[i.p.useProp ? "prop": "attr"]("checked", !1);
							f && (n("#" + n.jgrid.jqID(r), "#" + n.jgrid.jqID(f)).removeClass(it), n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(r), "#" + n.jgrid.jqID(f))[i.p.useProp ? "prop": "attr"]("checked", !1))
						}), i.p.selarrrow = [], n(i).jqGrid("setSelection", l, !0, t)) : n(i).jqGrid("setSelection", l, !0, t))
					}
				}).bind("reloadGrid",
				function(t, r) {
					if (i.p.treeGrid === !0 && (i.p.datatype = i.p.treedatatype), r = r || {},
					r.current && i.grid.selectionPreserver(i), "local" === i.p.datatype ? (n(i).jqGrid("resetSelection"), i.p.data.length && (rr(), si())) : i.p.treeGrid || (i.p.selrow = null, i.p.multiselect && (i.p.selarrrow = [], gt(!1)), i.p.savedRow = []), i.p.scroll && ct.call(i, !0, !1), r.page) {
						var u = r.page;
						u > i.p.lastpage && (u = i.p.lastpage);
						1 > u && (u = 1);
						i.p.page = u;
						i.grid.bDiv.scrollTop = i.grid.prevRowHeight ? (u - 1) * i.grid.prevRowHeight * i.p.rowNum: 0
					}
					return i.grid.prevRowHeight && i.p.scroll && void 0 === r.page ? (delete i.p.lastpage, i.grid.populateVisible()) : i.grid.populate(),
					i.p.inlineNav === !0 && n(i).jqGrid("showAddEditButtons"),
					!1
				}).dblclick(function(t) {
					if (c = t.target, h = n(c, i.rows).closest("tr.jqgrow"), 0 !== n(h).length) {
						l = h[0].rowIndex;
						b = n.jgrid.getCellIndex(c);
						var r = n(i).triggerHandler("jqGridDblClickRow", [n(h).attr("id"), l, b, t]);
						return null != r ? r: n.isFunction(i.p.ondblClickRow) && (r = i.p.ondblClickRow.call(i, n(h).attr("id"), l, b, t), null != r) ? r: void 0
					}
				}).bind("contextmenu",
				function(t) {
					if (c = t.target, h = n(c, i.rows).closest("tr.jqgrow"), 0 !== n(h).length) {
						i.p.multiselect || n(i).jqGrid("setSelection", h[0].id, !0, t);
						l = h[0].rowIndex;
						b = n.jgrid.getCellIndex(c);
						var r = n(i).triggerHandler("jqGridRightClickRow", [n(h).attr("id"), l, b, t]);
						return null != r ? r: n.isFunction(i.p.onRightClickRow) && (r = i.p.onRightClickRow.call(i, n(h).attr("id"), l, b, t), null != r) ? r: void 0
					}
				}), r.bDiv = document.createElement("div"), ki && "auto" === String(i.p.height).toLowerCase() && (i.p.height = "100%"), n(r.bDiv).append(n('<div style="position:relative;"><\/div>').append("<div><\/div>").append(this)).addClass("ui-jqgrid-bdiv").css({
					height: i.p.height + (isNaN(i.p.height) ? "": "px"),
					width: r.width + "px"
				}).scroll(r.scrollGrid), n("table:first", r.bDiv).css({
					width: i.p.tblwidth + "px"
				}), n.support.tbody || 2 === n("tbody", this).length && n("tbody:gt(0)", this).remove(), i.p.multikey && (n.jgrid.msie ? n(r.bDiv).bind("selectstart",
				function() {
					return ! 1
				}) : n(r.bDiv).bind("mousedown",
				function() {
					return ! 1
				})), w && n(r.bDiv).hide(), ti = g + " " + e(o, "icon_caption_open", !0), bi = g + " " + e(o, "icon_caption_close", !0), r.cDiv = document.createElement("div"), ii = i.p.hidegrid === !0 ? n("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton " + yr + "' title='" + (n.jgrid.getRegional(i, "defaults.showhide", i.p.showhide) || "") + "' />").hover(function() {
					ii.addClass(y)
				},
				function() {
					ii.removeClass(y)
				}).append("<span class='ui-jqgrid-headlink " + ti + "'><\/span>").css("rtl" === a ? "left": "right", "0px") : "", (n(r.cDiv).append(ii).append("<span class='ui-jqgrid-title'>" + i.p.caption + "<\/span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === a ? "-rtl": "") + " " + e(o, "gridtitleBox", !0)), n(r.cDiv).insertBefore(r.hDiv), i.p.toolbar[0]) && (ri = e(o, "customtoolbarBox", !0, "ui-userdata"), r.uDiv = document.createElement("div"), "top" === i.p.toolbar[1] ? n(r.uDiv).insertBefore(r.hDiv) : "bottom" === i.p.toolbar[1] && n(r.uDiv).insertAfter(r.hDiv), "both" === i.p.toolbar[1] ? (r.ubDiv = document.createElement("div"), n(r.uDiv).addClass(ri + " ui-userdata-top").attr("id", "t_" + this.id).insertBefore(r.hDiv).width(r.width), n(r.ubDiv).addClass(ri + " ui-userdata-bottom").attr("id", "tb_" + this.id).insertAfter(r.hDiv).width(r.width), w && n(r.ubDiv).hide()) : n(r.uDiv).width(r.width).addClass(ri + " ui-userdata-top").attr("id", "t_" + this.id), w && n(r.uDiv).hide()), (i.p.toppager && (i.p.toppager = n.jgrid.jqID(i.p.id) + "_toppager", r.topDiv = n("<div id='" + i.p.toppager + "'><\/div>")[0], i.p.toppager = "#" + i.p.toppager, n(r.topDiv).addClass(e(o, "toppagerBox", !0, "ui-jqgrid-toppager")).width(r.width).insertBefore(r.hDiv), ur(i.p.toppager, "_t")), i.p.footerrow && (r.sDiv = n("<div class='ui-jqgrid-sdiv'><\/div>")[0], st = n("<div class='ui-jqgrid-hbox" + ("rtl" === a ? "-rtl": "") + "'><\/div>"), n(r.sDiv).append(st).width(r.width).insertAfter(r.hDiv), n(st).append(pt), r.footers = n(".ui-jqgrid-ftable", r.sDiv)[0].rows[0].cells, i.p.rownumbers && (r.footers[0].className = e(o, "rownumBox", !0, "jqgrid-rownum")), w && n(r.sDiv).hide()), st = null, i.p.caption) ? (lr = i.p.datatype, i.p.hidegrid === !0 && (n(".ui-jqgrid-titlebar-close", r.cDiv).click(function(t) {
					var u, e = n.isFunction(i.p.onHeaderClick),
					f = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv",
					o = this;
					return i.p.toolbar[0] === !0 && ("both" === i.p.toolbar[1] && (f += ", #" + n(r.ubDiv).attr("id")), f += ", #" + n(r.uDiv).attr("id")),
					u = n(f, "#gview_" + n.jgrid.jqID(i.p.id)).length,
					"visible" === i.p.gridstate ? n(f, "#gbox_" + n.jgrid.jqID(i.p.id)).slideUp("fast",
					function() {
						u--;
						0 === u && (n("span", o).removeClass(ti).addClass(bi), i.p.gridstate = "hidden", n("#gbox_" + n.jgrid.jqID(i.p.id)).hasClass("ui-resizable") && n(".ui-resizable-handle", "#gbox_" + n.jgrid.jqID(i.p.id)).hide(), n(i).triggerHandler("jqGridHeaderClick", [i.p.gridstate, t]), e && (w || i.p.onHeaderClick.call(i, i.p.gridstate, t)))
					}) : "hidden" === i.p.gridstate && n(f, "#gbox_" + n.jgrid.jqID(i.p.id)).slideDown("fast",
					function() {
						u--;
						0 === u && (n("span", o).removeClass(bi).addClass(ti), w && (i.p.datatype = lr, tt(), w = !1), i.p.gridstate = "visible", n("#gbox_" + n.jgrid.jqID(i.p.id)).hasClass("ui-resizable") && n(".ui-resizable-handle", "#gbox_" + n.jgrid.jqID(i.p.id)).show(), n(i).triggerHandler("jqGridHeaderClick", [i.p.gridstate, t]), e && (w || i.p.onHeaderClick.call(i, i.p.gridstate, t)))
					}),
					!1
				}), w && (i.p.datatype = "local", n(".ui-jqgrid-titlebar-close", r.cDiv).trigger("click")))) : (n(r.cDiv).hide(), i.p.toppager || n(r.hDiv).addClass(e(i.p.styleUI + ".common", "cornertop", !0))), n(r.hDiv).after(r.bDiv).mousemove(function(n) {
					if (r.resizing) return (r.dragMove(n), !1)
				}), n(".ui-jqgrid-labels", r.hDiv).bind("selectstart",
				function() {
					return ! 1
				}), n(document).bind("mouseup.jqGrid" + i.p.id,
				function() {
					return r.resizing ? (r.dragEnd(!0), !1) : !0
				}), i.formatCol = ht, i.sortData = fr, i.updatepager = wr, i.refreshIndex = si, i.setHeadCheckBox = gt, i.constructTr = hi, i.formatter = function(n, t, i, r, u) {
					return nr(n, t, i, r, u)
				},
				n.extend(r, {
					populate: tt,
					emptyRows: ct,
					beginReq: lt,
					endReq: ft
				}), this.grid = r, i.addXmlData = function(n) {
					ci(n)
				},
				i.addJSONData = function(n) {
					dt(n)
				},
				this.grid.cols = this.rows[0].cells, n(i).triggerHandler("jqGridInitGrid"), n.isFunction(i.p.onInitGrid) && i.p.onInitGrid.call(i), tt(), i.p.hiddengrid = !1, i.p.responsive) {
					ar = "onorientationchange" in window;
					vr = ar ? "orientationchange": "resize";
					n(window).on(vr,
					function() {
						n(i).jqGrid("resizeGrid")
					})
				}
			}
		})
	};
	n.jgrid.extend({
		getGridParam: function(t, i) {
			var r, u = this[0];
			if (u && u.grid) {
				if (void 0 === i && "string" != typeof i && (i = "jqGrid"), r = u.p, "jqGrid" !== i) try {
					r = n(u).data(i)
				} catch(f) {
					r = u.p
				}
				return t ? void 0 !== r[t] ? r[t] : null: r
			}
		},
		setGridParam: function(t, i) {
			return this.each(function() {
				if (null == i && (i = !1), this.grid && "object" == typeof t) if (i === !0) {
					var r = n.extend({},
					this.p, t);
					this.p = r
				} else n.extend(!0, this.p, t)
			})
		},
		getGridRowById: function(t) {
			var i;
			return this.each(function() {
				try {
					for (var r = this.rows.length; r--;) if (t.toString() === this.rows[r].id) {
						i = this.rows[r];
						break
					}
				} catch(u) {
					i = n(this.grid.bDiv).find("#" + n.jgrid.jqID(t))
				}
			}),
			i
		},
		getDataIDs: function() {
			var t, r = [],
			i = 0,
			u = 0;
			return this.each(function() {
				if (t = this.rows.length, t && t > 0) for (; t > i;) n(this.rows[i]).hasClass("jqgrow") && (r[u] = this.rows[i].id, u++),
				i++
			}),
			r
		},
		setSelection: function(t, i, r) {
			return this.each(function() {
				function y(t) {
					var f = n(u.grid.bDiv)[0].clientHeight,
					i = n(u.grid.bDiv)[0].scrollTop,
					r = n(u.rows[t]).position().top,
					e = u.rows[t].clientHeight;
					r + e >= f + i ? n(u.grid.bDiv)[0].scrollTop = r - (f + i) + e + i: f + i > r && i > r && (n(u.grid.bDiv)[0].scrollTop = r)
				}
				var e, f, c, h, l, o, a, u = this,
				v = n.jgrid.getMethod("getStyleUI"),
				s = v(u.p.styleUI + ".common", "highlight", !0),
				p = v(u.p.styleUI + ".common", "disabled", !0);
				void 0 !== t && (i = i === !1 ? !1 : !0, f = n(u).jqGrid("getGridRowById", t), !f || !f.className || f.className.indexOf(p) > -1 || (u.p.scrollrows === !0 && (c = n(u).jqGrid("getGridRowById", t).rowIndex, c >= 0 && y(c)), u.p.frozenColumns === !0 && (o = u.p.id + "_frozen"), u.p.multiselect ? (u.setHeadCheckBox(!1), u.p.selrow = f.id, h = n.inArray(u.p.selrow, u.p.selarrrow), -1 === h ? ("ui-subgrid" !== f.className && n(f).addClass(s).attr("aria-selected", "true"), e = !0, u.p.selarrrow.push(u.p.selrow)) : ("ui-subgrid" !== f.className && n(f).removeClass(s).attr("aria-selected", "false"), e = !1, u.p.selarrrow.splice(h, 1), l = u.p.selarrrow[0], u.p.selrow = void 0 === l ? null: l), n("#jqg_" + n.jgrid.jqID(u.p.id) + "_" + n.jgrid.jqID(f.id))[u.p.useProp ? "prop": "attr"]("checked", e), o && ( - 1 === h ? n("#" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(o)).addClass(s) : n("#" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(o)).removeClass(s), n("#jqg_" + n.jgrid.jqID(u.p.id) + "_" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(o))[u.p.useProp ? "prop": "attr"]("checked", e)), i && (n(u).triggerHandler("jqGridSelectRow", [f.id, e, r]), u.p.onSelectRow && u.p.onSelectRow.call(u, f.id, e, r))) : "ui-subgrid" !== f.className && (u.p.selrow !== f.id ? (a = n(u).jqGrid("getGridRowById", u.p.selrow), a && n(a).removeClass(s).attr({
					"aria-selected": "false",
					tabindex: "-1"
				}), n(f).addClass(s).attr({
					"aria-selected": "true",
					tabindex: "0"
				}), o && (n("#" + n.jgrid.jqID(u.p.selrow), "#" + n.jgrid.jqID(o)).removeClass(s), n("#" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(o)).addClass(s)), e = !0) : e = !1, u.p.selrow = f.id, i && (n(u).triggerHandler("jqGridSelectRow", [f.id, e, r]), u.p.onSelectRow && u.p.onSelectRow.call(u, f.id, e, r)))))
			})
		},
		resetSelection: function(t) {
			return this.each(function() {
				var u, r, i = this,
				o = n.jgrid.getMethod("getStyleUI"),
				f = o(i.p.styleUI + ".common", "highlight", !0),
				s = o(i.p.styleUI + ".common", "hover", !0),
				e; (i.p.frozenColumns === !0 && (r = i.p.id + "_frozen"), void 0 !== t) ? ((u = t === i.p.selrow ? i.p.selrow: t, n("#" + n.jgrid.jqID(i.p.id) + " tbody:first tr#" + n.jgrid.jqID(u)).removeClass(f).attr("aria-selected", "false"), r && n("#" + n.jgrid.jqID(u), "#" + n.jgrid.jqID(r)).removeClass(f), i.p.multiselect) && (n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(u), "#" + n.jgrid.jqID(i.p.id))[i.p.useProp ? "prop": "attr"]("checked", !1), r && n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(u), "#" + n.jgrid.jqID(r))[i.p.useProp ? "prop": "attr"]("checked", !1), i.setHeadCheckBox(!1), e = n.inArray(n.jgrid.jqID(u), i.p.selarrrow), -1 !== e && i.p.selarrrow.splice(e, 1)), i.p.onUnSelectRow && i.p.onUnSelectRow.call(i, u), u = null) : i.p.multiselect ? (n(i.p.selarrrow).each(function(t, u) {
					n(n(i).jqGrid("getGridRowById", u)).removeClass(f).attr("aria-selected", "false");
					n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(u))[i.p.useProp ? "prop": "attr"]("checked", !1);
					r && (n("#" + n.jgrid.jqID(u), "#" + n.jgrid.jqID(r)).removeClass(f), n("#jqg_" + n.jgrid.jqID(i.p.id) + "_" + n.jgrid.jqID(u), "#" + n.jgrid.jqID(r))[i.p.useProp ? "prop": "attr"]("checked", !1));
					i.p.onUnSelectRow && i.p.onUnSelectRow.call(i, u)
				}), i.setHeadCheckBox(!1), i.p.selarrrow = [], i.p.selrow = null) : i.p.selrow && (n("#" + n.jgrid.jqID(i.p.id) + " tbody:first tr#" + n.jgrid.jqID(i.p.selrow)).removeClass(f).attr("aria-selected", "false"), r && n("#" + n.jgrid.jqID(i.p.selrow), "#" + n.jgrid.jqID(r)).removeClass(f), i.p.onUnSelectRow && i.p.onUnSelectRow.call(i, i.p.selrow), i.p.selrow = null);
				i.p.cellEdit === !0 && parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && (n("td:eq(" + i.p.iCol + ")", i.rows[i.p.iRow]).removeClass("edit-cell " + f), n(i.rows[i.p.iRow]).removeClass("selected-row " + s));
				i.p.savedRow = []
			})
		},
		getRowData: function(t, i) {
			var u, f, r = {},
			e = !1,
			o = 0;
			return this.each(function() {
				var h, c, s = this;
				if (null == t) e = !0,
				u = [],
				f = s.rows.length;
				else {
					if (c = n(s).jqGrid("getGridRowById", t), !c) return r;
					f = 2
				}
				for (i && i === !0 && s.p.data.length > 0 || (i = !1); f > o;) e && (c = s.rows[o]),
				n(c).hasClass("jqgrow") && (i ? r = s.p.data[s.p._index[c.id]] : n('td[role="gridcell"]', c).each(function(t) {
					if (h = s.p.colModel[t].name, "cb" !== h && "subgrid" !== h && "rn" !== h) if (s.p.treeGrid === !0 && h === s.p.ExpandColumn) r[h] = n.jgrid.htmlDecode(n("span:first", this).html());
					else try {
						r[h] = n.unformat.call(s, this, {
							rowId: c.id,
							colModel: s.p.colModel[t]
						},
						t)
					} catch(i) {
						r[h] = n.jgrid.htmlDecode(n(this).html())
					}
				}), e && (u.push(r), r = {})),
				o++
			}),
			u || r
		},
		delRowData: function(t) {
			var i, r, u, f = !1;
			return this.each(function() {
				var e = this,
				h, o, s;
				if (i = n(e).jqGrid("getGridRowById", t), !i) return ! 1; (e.p.subGrid && (u = n(i).next(), u.hasClass("ui-subgrid") && u.remove()), n(i).remove(), e.p.records--, e.p.reccount--, e.updatepager(!0, !1), f = !0, e.p.multiselect && (r = n.inArray(t, e.p.selarrrow), -1 !== r && e.p.selarrrow.splice(r, 1)), e.p.selrow = e.p.multiselect && e.p.selarrrow.length > 0 ? e.p.selarrrow[e.p.selarrrow.length - 1] : null, "local" === e.p.datatype) && (h = n.jgrid.stripPref(e.p.idPrefix, t), o = e.p._index[h], void 0 !== o && (e.p.data.splice(o, 1), e.refreshIndex()));
				e.p.altRows === !0 && f && (s = e.p.altclass, n(e.rows).each(function(t) {
					t % 2 == 1 ? n(this).addClass(s) : n(this).removeClass(s)
				}))
			}),
			f
		},
		setRowData: function(t, i, r) {
			var u, f, e = !0;
			return this.each(function() {
				var a, y, l;
				if (!this.grid) return ! 1;
				var c, s, o = this,
				v = typeof r,
				h = {};
				if (s = n(this).jqGrid("getGridRowById", t), !s) return ! 1;
				if (i) try {
					if (n(this.p.colModel).each(function(r) {
						u = this.name;
						var e = n.jgrid.getAccessor(i, u);
						void 0 !== e && (h[u] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? n.unformat.date.call(o, e, this) : e, c = o.formatter(t, h[u], r, i, "edit"), f = this.title ? {
							title: n.jgrid.stripHtml(c)
						}: {},
						o.p.treeGrid === !0 && u === o.p.ExpandColumn ? n("td[role='gridcell']:eq(" + r + ") > span:first", s).html(c).attr(f) : n("td[role='gridcell']:eq(" + r + ")", s).html(c).attr(f))
					}), "local" === o.p.datatype) {
						if (y = n.jgrid.stripPref(o.p.idPrefix, t), l = o.p._index[y], o.p.treeGrid) for (a in o.p.treeReader) o.p.treeReader.hasOwnProperty(a) && delete h[o.p.treeReader[a]];
						void 0 !== l && (o.p.data[l] = n.extend(!0, o.p.data[l], h));
						h = null
					}
				} catch(p) {
					e = !1
				}
				e && ("string" === v ? n(s).addClass(r) : null !== r && "object" === v && n(s).css(r), n(o).triggerHandler("jqGridAfterGridComplete"))
			}),
			e
		},
		addRowData: function(t, i, r, u) { - 1 == ["first", "last", "before", "after"].indexOf(r) && (r = "last");
			var w, f, h, b, s, e, c, a, v, y, p, o, d, k, g = !1,
			nt = "",
			tt = "",
			l = "";
			return i && (n.isArray(i) ? (v = !0, y = t) : (i = [i], v = !1), this.each(function() {
				var it = this,
				et = i.length;
				s = it.p.rownumbers === !0 ? 1 : 0;
				h = it.p.multiselect === !0 ? 1 : 0;
				b = it.p.subGrid === !0 ? 1 : 0;
				v || (void 0 !== t ? t = String(t) : (t = n.jgrid.randId(), it.p.keyName !== !1 && (y = it.p.keyName, void 0 !== i[0][y] && (t = i[0][y]))));
				p = it.p.altclass;
				var ut, ft = 0,
				ot = n(it).jqGrid("getStyleUI", it.p.styleUI + ".base", "rowBox", !0, "jqgrow ui-row-" + it.p.direction),
				rt = {},
				st = n.isFunction(it.p.afterInsertRow) ? !0 : !1;
				for (s && (nt = n(it).jqGrid("getStyleUI", it.p.styleUI + ".base", "rownumBox", !1, "jqgrid-rownum")), h && (tt = n(it).jqGrid("getStyleUI", it.p.styleUI + ".base", "multiBox", !1, "cbox")); et > ft;) {
					if (o = i[ft], f = [], ut = ot, v) {
						try {
							t = o[y];
							void 0 === t && (t = n.jgrid.randId())
						} catch(ht) {
							t = n.jgrid.randId()
						}
						ut += it.p.altRows === !0 && (it.rows.length - 1) % 2 == 0 ? " " + p: ""
					}
					for (k = t, t = it.p.idPrefix + t, s && (l = it.formatCol(0, 1, "", null, t, !0), f[f.length] = '<td role="gridcell" ' + nt + " " + l + ">0<\/td>"), h && (a = '<input role="checkbox" type="checkbox" id="jqg_' + it.p.id + "_" + t + '" ' + tt + "/>", l = it.formatCol(s, 1, "", null, t, !0), f[f.length] = '<td role="gridcell" ' + l + ">" + a + "<\/td>"), b && (f[f.length] = n(it).jqGrid("addSubGridCell", h + s, 1)), c = h + b + s; c < it.p.colModel.length; c++) d = it.p.colModel[c],
					w = d.name,
					rt[w] = o[w],
					a = it.formatter(t, n.jgrid.getAccessor(o, w), c, o),
					l = it.formatCol(c, 1, a, o, t, rt),
					f[f.length] = '<td role="gridcell" ' + l + ">" + a + "<\/td>";
					if (f.unshift(it.constructTr(t, !1, ut, rt, o)), f[f.length] = "<\/tr>", 0 === it.rows.length) n("table:first", it.grid.bDiv).append(f.join(""));
					else switch (r) {
					case "last":
						n(it.rows[it.rows.length - 1]).after(f.join(""));
						e = it.rows.length - 1;
						break;
					case "first":
						n(it.rows[0]).after(f.join(""));
						e = 1;
						break;
					case "after":
						e = n(it).jqGrid("getGridRowById", u);
						e && (n(it.rows[e.rowIndex + 1]).hasClass("ui-subgrid") ? n(it.rows[e.rowIndex + 1]).after(f) : n(e).after(f.join("")), e = e.rowIndex + 1);
						break;
					case "before":
						e = n(it).jqGrid("getGridRowById", u);
						e && (n(e).before(f.join("")), e = e.rowIndex - 1)
					}
					it.p.subGrid === !0 && n(it).jqGrid("addSubGrid", h + s, e);
					it.p.records++;
					it.p.reccount++;
					n(it).triggerHandler("jqGridAfterInsertRow", [t, o, o]);
					st && it.p.afterInsertRow.call(it, t, o, o);
					ft++;
					"local" === it.p.datatype && (rt[it.p.localReader.id] = k, it.p._index[k] = it.p.data.length, it.p.data.push(rt), rt = {})
				}
				it.p.altRows !== !0 || v || ("last" === r ? (it.rows.length - 1) % 2 == 0 && n(it.rows[it.rows.length - 1]).addClass(p) : n(it.rows).each(function(t) {
					t % 2 == 0 ? n(this).addClass(p) : n(this).removeClass(p)
				}));
				it.updatepager(!0, !0);
				g = !0
			})),
			g
		},
		footerData: function(t, i, r) {
			function s(n) {
				var t;
				for (t in n) if (n.hasOwnProperty(t)) return ! 1;
				return ! 0
			}
			var u, e, f = !1,
			o = {};
			return void 0 === t && (t = "get"),
			"boolean" != typeof r && (r = !0),
			t = t.toLowerCase(),
			this.each(function() {
				var c, h = this;
				return h.grid && h.p.footerrow ? "set" === t && s(i) ? !1 : (f = !0, void n(this.p.colModel).each(function(s) {
					u = this.name;
					"set" === t ? void 0 !== i[u] && (c = r ? h.formatter("", i[u], s, i, "edit") : i[u], e = this.title ? {
						title: n.jgrid.stripHtml(c)
					}: {},
					n("tr.footrow td:eq(" + s + ")", h.grid.sDiv).html(c).attr(e), f = !0) : "get" === t && (o[u] = n("tr.footrow td:eq(" + s + ")", h.grid.sDiv).html())
				})) : !1
			}),
			"get" === t ? o: f
		},
		showHideCol: function(t, i) {
			return this.each(function() {
				var e, r = this,
				h = !1,
				c = n.jgrid.cell_width ? 0 : r.p.cellLayout,
				u,
				o,
				s,
				f;
				if (r.grid && ("string" == typeof t && (t = [t]), i = "none" !== i ? "": "none", u = "" === i ? !0 : !1, o = r.p.groupHeader && (n.isArray(r.p.groupHeader) || n.isFunction(r.p.groupHeader)), o && n(r).jqGrid("destroyGroupHeader", !1), n(this.p.colModel).each(function(f) {
					if ( - 1 !== n.inArray(this.name, t) && this.hidden === u) {
						if (r.p.frozenColumns === !0 && this.frozen === !0) return ! 0;
						n("tr[role=row]", r.grid.hDiv).each(function() {
							n(this.cells[f]).css("display", i)
						});
						n(r.rows).each(function() {
							n(this).hasClass("jqgroup") || n(this.cells[f]).css("display", i)
						});
						r.p.footerrow && n("tr.footrow td:eq(" + f + ")", r.grid.sDiv).css("display", i);
						e = parseInt(this.width, 10);
						"none" === i ? r.p.tblwidth -= e + c: r.p.tblwidth += e + c;
						this.hidden = !u;
						h = !0;
						n(r).triggerHandler("jqGridShowHideCol", [u, this.name, f])
					}
				}), h === !0 && (r.p.shrinkToFit !== !0 || isNaN(r.p.height) || (r.p.tblwidth += parseInt(r.p.scrollOffset, 10)), n(r).jqGrid("setGridWidth", r.p.shrinkToFit === !0 ? r.p.tblwidth: r.p.width)), o)) for (s = n.extend([], r.p.groupHeader), r.p.groupHeader = null, f = 0; f < s.length; f++) n(r).jqGrid("setGroupHeaders", s[f])
			})
		},
		hideCol: function(t) {
			return this.each(function() {
				n(this).jqGrid("showHideCol", t, "none")
			})
		},
		showCol: function(t) {
			return this.each(function() {
				n(this).jqGrid("showHideCol", t, "")
			})
		},
		remapColumns: function(t, i, r) {
			function f(i) {
				var r;
				r = i.length ? n.makeArray(i) : n.extend({},
				i);
				n.each(t,
				function(n) {
					i[n] = r[this]
				})
			}
			function e(i, r) {
				n(">tr" + (r || ""), i).each(function() {
					var i = this,
					r = n.makeArray(i.cells);
					n.each(t,
					function() {
						var n = r[this];
						n && i.appendChild(n)
					})
				})
			}
			var u = this.get(0);
			f(u.p.colModel);
			f(u.p.colNames);
			f(u.grid.headers);
			e(n("thead:first", u.grid.hDiv), r && ":not(.ui-jqgrid-labels)");
			i && e(n("#" + n.jgrid.jqID(u.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
			u.p.footerrow && e(n("tbody:first", u.grid.sDiv));
			u.p.remapColumns && (u.p.remapColumns.length ? f(u.p.remapColumns) : u.p.remapColumns = n.makeArray(t));
			u.p.lastsort = n.inArray(u.p.lastsort, t);
			u.p.treeGrid && (u.p.expColInd = n.inArray(u.p.expColInd, t));
			n(u).triggerHandler("jqGridRemapColumns", [t, i, r])
		},
		setGridWidth: function(t, i) {
			return this.each(function() {
				var v, p;
				if (this.grid) {
					var u, f, l, c, r = this,
					e = 0,
					o = n.jgrid.cell_width ? 0 : r.p.cellLayout,
					s = 0,
					y = !1,
					a = r.p.scrollOffset,
					h = 0;
					if ("boolean" != typeof i && (i = r.p.shrinkToFit), !isNaN(t)) {
						if (t = parseInt(t, 10), r.grid.width = r.p.width = t, n("#gbox_" + n.jgrid.jqID(r.p.id)).css("width", t + "px"), n("#gview_" + n.jgrid.jqID(r.p.id)).css("width", t + "px"), n(r.grid.bDiv).css("width", t + "px"), n(r.grid.hDiv).css("width", t + "px"), r.p.pager && n(r.p.pager).css("width", t + "px"), r.p.toppager && n(r.p.toppager).css("width", t + "px"), r.p.toolbar[0] === !0 && (n(r.grid.uDiv).css("width", t + "px"), "both" === r.p.toolbar[1] && n(r.grid.ubDiv).css("width", t + "px")), r.p.footerrow && n(r.grid.sDiv).css("width", t + "px"), i === !1 && r.p.forceFit === !0 && (r.p.forceFit = !1), i === !0) {
							if (n.each(r.p.colModel,
							function() {
								this.hidden === !1 && (u = this.widthOrg, e += u + o, this.fixed ? h += u + o: s++)
							}), 0 === s) return;
							if (r.p.tblwidth = e, l = t - o * s - h, isNaN(r.p.height) || (n(r.grid.bDiv)[0].clientHeight < n(r.grid.bDiv)[0].scrollHeight || 1 === r.rows.length) && (y = !0, l -= a), e = 0, v = r.grid.cols.length > 0, n.each(r.p.colModel,
							function(n) {
								if (this.hidden === !1 && !this.fixed) {
									if (u = this.widthOrg, u = Math.round(l * u / (r.p.tblwidth - o * s - h)), 0 > u) return;
									this.width = u;
									e += u;
									r.grid.headers[n].width = u;
									r.grid.headers[n].el.style.width = u + "px";
									r.p.footerrow && (r.grid.footers[n].style.width = u + "px");
									v && (r.grid.cols[n].style.width = u + "px");
									f = n
								}
							}), !f) return; (c = 0, y ? t - h - (e + o * s) !== a && (c = t - h - (e + o * s) - a) : 1 !== Math.abs(t - h - (e + o * s)) && (c = t - h - (e + o * s)), r.p.colModel[f].width += c, r.p.tblwidth = e + c + o * s + h, r.p.tblwidth > t) ? (p = r.p.tblwidth - parseInt(t, 10), r.p.tblwidth = t, u = r.p.colModel[f].width = r.p.colModel[f].width - p) : u = r.p.colModel[f].width;
							r.grid.headers[f].width = u;
							r.grid.headers[f].el.style.width = u + "px";
							v && (r.grid.cols[f].style.width = u + "px");
							r.p.footerrow && (r.grid.footers[f].style.width = u + "px")
						}
						r.p.tblwidth && (n("table:first", r.grid.bDiv).css("width", r.p.tblwidth + "px"), n("table:first", r.grid.hDiv).css("width", r.p.tblwidth + "px"), r.grid.hDiv.scrollLeft = r.grid.bDiv.scrollLeft, r.p.footerrow && n("table:first", r.grid.sDiv).css("width", r.p.tblwidth + "px"))
					}
				}
			})
		},
		setGridHeight: function(t) {
			return this.each(function() {
				var i = this,
				r;
				i.grid && (r = n(i.grid.bDiv), r.css({
					height: t + (isNaN(t) ? "": "px")
				}), i.p.frozenColumns === !0 && n("#" + n.jgrid.jqID(i.p.id) + "_frozen").parent().height(r.height() - 16), i.p.height = t, i.p.scroll && i.grid.populateVisible())
			})
		},
		setCaption: function(t) {
			return this.each(function() {
				var i = n(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "cornertop", !0);
				this.p.caption = t;
				n(".ui-jqgrid-title, .ui-jqgrid-title-rtl", this.grid.cDiv).html(t);
				n(this.grid.cDiv).show();
				n(this.grid.hDiv).removeClass(i)
			})
		},
		setLabel: function(t, i, r, u) {
			return this.each(function() {
				var e = this,
				o = -1,
				f, s;
				e.grid && void 0 !== t && (n(e.p.colModel).each(function(n) {
					if (this.name === t) return (o = n, !1)
				}), o >= 0) && (f = n("tr.ui-jqgrid-labels th:eq(" + o + ")", e.grid.hDiv), i && (s = n(".s-ico", f), n("[id^=jqgh_]", f).empty().html(i).append(s), e.p.colNames[o] = i), r && ("string" == typeof r ? n(f).addClass(r) : n(f).css(r)), "object" == typeof u && n(f).attr(u))
			})
		},
		setCell: function(t, i, r, u, f, e) {
			return this.each(function() {
				var a, v, o = this,
				s = -1,
				h, p, l;
				if (o.grid && (isNaN(i) ? n(o.p.colModel).each(function(n) {
					if (this.name === i) return (s = n, !1)
				}) : s = parseInt(i, 10), s >= 0) && (h = n(o).jqGrid("getGridRowById", t), h)) {
					var c = n("td:eq(" + s + ")", h),
					y = 0,
					w = [];
					if ("" !== r || e === !0) {
						if (void 0 !== h.cells) for (; y < h.cells.length;) w.push(h.cells[y].innerHTML),
						y++; (a = o.formatter(t, r, s, w, "edit"), v = o.p.colModel[s].title ? {
							title: n.jgrid.stripHtml(a)
						}: {},
						o.p.treeGrid && n(".tree-wrap", n(c)).length > 0 ? n("span", n(c)).html(a).attr(v) : n(c).html(a).attr(v), "local" === o.p.datatype) && (l = o.p.colModel[s], r = l.formatter && "string" == typeof l.formatter && "date" === l.formatter ? n.unformat.date.call(o, r, l) : r, p = o.p._index[n.jgrid.stripPref(o.p.idPrefix, t)], void 0 !== p && (o.p.data[p][l.name] = r))
					}
					"string" == typeof u ? n(c).addClass(u) : u && n(c).css(u);
					"object" == typeof f && n(c).attr(f)
				}
			})
		},
		getCell: function(t, i) {
			var r = !1;
			return this.each(function() {
				var f = this,
				u = -1,
				e;
				if (f.grid && (isNaN(i) ? n(f.p.colModel).each(function(n) {
					if (this.name === i) return (u = n, !1)
				}) : u = parseInt(i, 10), u >= 0) && (e = n(f).jqGrid("getGridRowById", t), e)) try {
					r = n.unformat.call(f, n("td:eq(" + u + ")", e), {
						rowId: e.id,
						colModel: f.p.colModel[u]
					},
					u)
				} catch(o) {
					r = n.jgrid.htmlDecode(n("td:eq(" + u + ")", e).html())
				}
			}),
			r
		},
		getCol: function(t, i, r) {
			var e, s, o, f, u = [],
			h = 0;
			return i = "boolean" != typeof i ? !1 : i,
			void 0 === r && (r = !1),
			this.each(function() {
				var c = this,
				l = -1;
				if (c.grid && (isNaN(t) ? n(c.p.colModel).each(function(n) {
					if (this.name === t) return (l = n, !1)
				}) : l = parseInt(t, 10), l >= 0)) {
					var v = c.rows.length,
					a = 0,
					y = 0;
					if (v && v > 0) {
						for (; v > a;) {
							if (n(c.rows[a]).hasClass("jqgrow")) {
								try {
									e = n.unformat.call(c, n(c.rows[a].cells[l]), {
										rowId: c.rows[a].id,
										colModel: c.p.colModel[l]
									},
									l)
								} catch(p) {
									e = n.jgrid.htmlDecode(c.rows[a].cells[l].innerHTML)
								}
								r ? (f = parseFloat(e), isNaN(f) || (h += f, void 0 === o && (o = s = f), s = Math.min(s, f), o = Math.max(o, f), y++)) : u.push(i ? {
									id: c.rows[a].id,
									value: e
								}: e)
							}
							a++
						}
						if (r) switch (r.toLowerCase()) {
						case "sum":
							u = h;
							break;
						case "avg":
							u = h / y;
							break;
						case "count":
							u = v - 1;
							break;
						case "min":
							u = s;
							break;
						case "max":
							u = o
						}
					}
				}
			}),
			u
		},
		clearGridData: function(t) {
			return this.each(function() {
				var i = this,
				r;
				i.grid && (("boolean" != typeof t && (t = !1), i.p.deepempty) ? n("#" + n.jgrid.jqID(i.p.id) + " tbody:first tr:gt(0)").remove() : (r = n("#" + n.jgrid.jqID(i.p.id) + " tbody:first tr:first")[0], n("#" + n.jgrid.jqID(i.p.id) + " tbody:first").empty().append(r)), i.p.footerrow && t && n(".ui-jqgrid-ftable td", i.grid.sDiv).html("&#160;"), i.p.selrow = null, i.p.selarrrow = [], i.p.savedRow = [], i.p.records = 0, i.p.page = 1, i.p.lastpage = 0, i.p.reccount = 0, i.p.data = [], i.p._index = {},
				i.updatepager(!0, !1))
			})
		},
		getInd: function(t, i) {
			var r, u = !1;
			return this.each(function() {
				r = n(this).jqGrid("getGridRowById", t);
				r && (u = i === !0 ? r: r.rowIndex)
			}),
			u
		},
		bindKeys: function(t) {
			var i = n.extend({
				onEnter: null,
				onSpace: null,
				onLeftKey: null,
				onRightKey: null,
				scrollingRows: !0
			},
			t || {});
			return this.each(function() {
				var t = this;
				n("body").is("[role]") || n("body").attr("role", "application");
				t.p.scrollrows = i.scrollingRows;
				n(t).keydown(function(r) {
					var f, u, o, e = n(t).find("tr[tabindex=0]")[0],
					s = t.p.treeReader.expanded_field;
					if (e) if (o = t.p._index[n.jgrid.stripPref(t.p.idPrefix, e.id)], 37 === r.keyCode || 38 === r.keyCode || 39 === r.keyCode || 40 === r.keyCode) {
						if (38 === r.keyCode) {
							if (u = e.previousSibling, f = "", u) if (n(u).is(":hidden")) {
								for (; u;) if (u = u.previousSibling, !n(u).is(":hidden") && n(u).hasClass("jqgrow")) {
									f = u.id;
									break
								}
							} else f = u.id;
							n(t).jqGrid("setSelection", f, !0, r);
							r.preventDefault()
						}
						if (40 === r.keyCode) {
							if (u = e.nextSibling, f = "", u) if (n(u).is(":hidden")) {
								for (; u;) if (u = u.nextSibling, !n(u).is(":hidden") && n(u).hasClass("jqgrow")) {
									f = u.id;
									break
								}
							} else f = u.id;
							n(t).jqGrid("setSelection", f, !0, r);
							r.preventDefault()
						}
						37 === r.keyCode && (t.p.treeGrid && t.p.data[o][s] && n(e).find("div.treeclick").trigger("click"), n(t).triggerHandler("jqGridKeyLeft", [t.p.selrow]), n.isFunction(i.onLeftKey) && i.onLeftKey.call(t, t.p.selrow));
						39 === r.keyCode && (t.p.treeGrid && !t.p.data[o][s] && n(e).find("div.treeclick").trigger("click"), n(t).triggerHandler("jqGridKeyRight", [t.p.selrow]), n.isFunction(i.onRightKey) && i.onRightKey.call(t, t.p.selrow))
					} else 13 === r.keyCode ? (n(t).triggerHandler("jqGridKeyEnter", [t.p.selrow]), n.isFunction(i.onEnter) && i.onEnter.call(t, t.p.selrow)) : 32 === r.keyCode && (n(t).triggerHandler("jqGridKeySpace", [t.p.selrow]), n.isFunction(i.onSpace) && i.onSpace.call(t, t.p.selrow))
				})
			})
		},
		unbindKeys: function() {
			return this.each(function() {
				n(this).unbind("keydown")
			})
		},
		getLocalRow: function(t) {
			var i, r = !1;
			return this.each(function() {
				void 0 !== t && (i = this.p._index[n.jgrid.stripPref(this.p.idPrefix, t)], i >= 0 && (r = this.p.data[i]))
			}),
			r
		},
		progressBar: function(t) {
			return t = n.extend({
				htmlcontent: "",
				method: "hide",
				loadtype: "disable"
			},
			t || {}),
			this.each(function() {
				var r, f, u = "show" === t.method ? !0 : !1,
				i = n("#load_" + n.jgrid.jqID(this.p.id)),
				e = n(window).scrollTop();
				switch ("" !== t.htmlcontent && i.html(t.htmlcontent), t.loadtype) {
				case "enable":
					i.toggle(u);
					break;
				case "block":
					n("#lui_" + n.jgrid.jqID(this.p.id)).toggle(u);
					i.toggle(u)
				}
				i.is(":visible") && (r = i.offsetParent(), i.css("top", ""), i.offset().top < e && (f = Math.min(10 + e - r.offset().top, r.height() - i.height()), i.css("top", f + "px")))
			})
		},
		getColProp: function(n) {
			var r = {},
			u = this[0],
			t,
			i;
			if (!u.grid) return ! 1;
			for (i = u.p.colModel, t = 0; t < i.length; t++) if (i[t].name === n) {
				r = i[t];
				break
			}
			return r
		},
		setColProp: function(t, i) {
			return this.each(function() {
				if (this.grid && i) for (var u = this.p.colModel,
				r = 0; r < u.length; r++) if (u[r].name === t) {
					n.extend(!0, this.p.colModel[r], i);
					break
				}
			})
		},
		sortGrid: function(n, t, i) {
			return this.each(function() {
				var u, r = this,
				f = -1,
				e = !1,
				o;
				if (r.grid) {
					for (n || (n = r.p.sortname), u = 0; u < r.p.colModel.length; u++) if (r.p.colModel[u].index === n || r.p.colModel[u].name === n) {
						f = u;
						r.p.frozenColumns === !0 && r.p.colModel[u].frozen === !0 && (e = r.grid.fhDiv.find("#" + r.p.id + "_" + n));
						break
					} - 1 !== f && (o = r.p.colModel[f].sortable, e || (e = r.grid.headers[f].el), "boolean" != typeof o && (o = !0), "boolean" != typeof t && (t = !1), o && r.sortData("jqgh_" + r.p.id + "_" + n, f, t, i, e))
				}
			})
		},
		setGridState: function(t) {
			return this.each(function() {
				if (this.grid) {
					var i = this,
					r = n(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_open", !0),
					u = n(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_close", !0);
					"hidden" === t ? (n(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + n.jgrid.jqID(i.p.id)).slideUp("fast"), i.p.pager && n(i.p.pager).slideUp("fast"), i.p.toppager && n(i.p.toppager).slideUp("fast"), i.p.toolbar[0] === !0 && ("both" === i.p.toolbar[1] && n(i.grid.ubDiv).slideUp("fast"), n(i.grid.uDiv).slideUp("fast")), i.p.footerrow && n(".ui-jqgrid-sdiv", "#gbox_" + n.jgrid.jqID(i.p.id)).slideUp("fast"), n(".ui-jqgrid-headlink", i.grid.cDiv).removeClass(r).addClass(u), i.p.gridstate = "hidden") : "visible" === t && (n(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + n.jgrid.jqID(i.p.id)).slideDown("fast"), i.p.pager && n(i.p.pager).slideDown("fast"), i.p.toppager && n(i.p.toppager).slideDown("fast"), i.p.toolbar[0] === !0 && ("both" === i.p.toolbar[1] && n(i.grid.ubDiv).slideDown("fast"), n(i.grid.uDiv).slideDown("fast")), i.p.footerrow && n(".ui-jqgrid-sdiv", "#gbox_" + n.jgrid.jqID(i.p.id)).slideDown("fast"), n(".ui-jqgrid-headlink", i.grid.cDiv).removeClass(u).addClass(r), i.p.gridstate = "visible")
				}
			})
		},
		setFrozenColumns: function() {
			return this.each(function() {
				var e, h, u, l, y, s, o, p, c;
				if (this.grid) {
					var t = this,
					a = t.p.colModel,
					f = 0,
					w = a.length,
					i = -1,
					v = !1,
					b = n(t).jqGrid("getStyleUI", t.p.styleUI + ".base", "headerDiv", !0, "ui-jqgrid-hdiv"),
					r = n(t).jqGrid("getStyleUI", t.p.styleUI + ".common", "hover", !0);
					if (t.p.subGrid !== !0 && t.p.treeGrid !== !0 && t.p.cellEdit !== !0 && !t.p.sortable && !t.p.scroll) {
						for (t.p.rownumbers && f++, t.p.multiselect && f++; w > f && a[f].frozen === !0;) v = !0,
						i = f,
						f++;
						i >= 0 && v && (e = t.p.caption ? n(t.grid.cDiv).outerHeight() : 0, h = n(".ui-jqgrid-htable", "#gview_" + n.jgrid.jqID(t.p.id)).height(), t.p.toppager && (e += n(t.grid.topDiv).outerHeight()), t.p.toolbar[0] === !0 && "bottom" !== t.p.toolbar[1] && (e += n(t.grid.uDiv).outerHeight()), t.grid.fhDiv = n('<div style="position:absolute;' + ("rtl" === t.p.direction ? "right:0;": "left:0;") + "top:" + e + "px;height:" + h + 'px;" class="frozen-div ' + b + '"><\/div>'), t.grid.fbDiv = n('<div style="position:absolute;' + ("rtl" === t.p.direction ? "right:0;": "left:0;") + "top:" + (parseInt(e, 10) + parseInt(h, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"><\/div>'), n("#gview_" + n.jgrid.jqID(t.p.id)).append(t.grid.fhDiv), u = n(".ui-jqgrid-htable", "#gview_" + n.jgrid.jqID(t.p.id)).clone(!0), t.p.groupHeader ? (n("tr.jqg-first-row-header, tr.jqg-third-row-header", u).each(function() {
							n("th:gt(" + i + ")", this).remove()
						}), s = -1, o = -1, n("tr.jqg-second-row-header th", u).each(function() {
							return l = parseInt(n(this).attr("colspan"), 10),
							y = parseInt(n(this).attr("rowspan"), 10),
							y && (s++, o++),
							l && (s += l, o++),
							s === i ? (o = i, !1) : void 0
						}), s !== i && (o = i), n("tr.jqg-second-row-header", u).each(function() {
							n("th:gt(" + o + ")", this).remove()
						})) : n("tr", u).each(function() {
							n("th:gt(" + i + ")", this).remove()
						}), (n(u).width(1), n(t.grid.fhDiv).append(u).mousemove(function(n) {
							if (t.grid.resizing) return (t.grid.dragMove(n), !1)
						}), t.p.footerrow) && (p = n(".ui-jqgrid-bdiv", "#gview_" + n.jgrid.jqID(t.p.id)).height(), t.grid.fsDiv = n('<div style="position:absolute;left:0px;top:' + (parseInt(e, 10) + parseInt(h, 10) + parseInt(p, 10) + 1) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"><\/div>'), n("#gview_" + n.jgrid.jqID(t.p.id)).append(t.grid.fsDiv), c = n(".ui-jqgrid-ftable", "#gview_" + n.jgrid.jqID(t.p.id)).clone(!0), n("tr", c).each(function() {
							n("td:gt(" + i + ")", this).remove()
						}), n(c).width(1), n(t.grid.fsDiv).append(c)), n(t).bind("jqGridResizeStop.setFrozenColumns",
						function(i, r, u) {
							var o = n(".ui-jqgrid-htable", t.grid.fhDiv),
							f,
							e;
							n("th:eq(" + u + ")", o).width(r);
							f = n(".ui-jqgrid-btable", t.grid.fbDiv); (n("tr:first td:eq(" + u + ")", f).width(r), t.p.footerrow) && (e = n(".ui-jqgrid-ftable", t.grid.fsDiv), n("tr:first td:eq(" + u + ")", e).width(r))
						}), n("#gview_" + n.jgrid.jqID(t.p.id)).append(t.grid.fbDiv), n(t.grid.fbDiv).bind("mousewheel DOMMouseScroll",
						function(i) {
							var r = n(t.grid.bDiv).scrollTop();
							n(t.grid.bDiv).scrollTop(i.originalEvent.wheelDelta > 0 || i.originalEvent.detail < 0 ? r - 25 : r + 25);
							i.preventDefault()
						}), t.p.hoverrows === !0 && n("#" + n.jgrid.jqID(t.p.id)).unbind("mouseover").unbind("mouseout"), n(t).bind("jqGridAfterGridComplete.setFrozenColumns",
						function() {
							n("#" + n.jgrid.jqID(t.p.id) + "_frozen").remove();
							n(t.grid.fbDiv).height(n(t.grid.bDiv).height() - 16);
							var u = n("#" + n.jgrid.jqID(t.p.id)).clone(!0);
							n("tr[role=row]", u).each(function() {
								n("td[role=gridcell]:gt(" + i + ")", this).remove()
							});
							n(u).width(1).attr("id", t.p.id + "_frozen");
							n(t.grid.fbDiv).append(u);
							t.p.hoverrows === !0 && (n("tr.jqgrow", u).hover(function() {
								n(this).addClass(r);
								n("#" + n.jgrid.jqID(this.id), "#" + n.jgrid.jqID(t.p.id)).addClass(r)
							},
							function() {
								n(this).removeClass(r);
								n("#" + n.jgrid.jqID(this.id), "#" + n.jgrid.jqID(t.p.id)).removeClass(r)
							}), n("tr.jqgrow", "#" + n.jgrid.jqID(t.p.id)).hover(function() {
								n(this).addClass(r);
								n("#" + n.jgrid.jqID(this.id), "#" + n.jgrid.jqID(t.p.id) + "_frozen").addClass(r)
							},
							function() {
								n(this).removeClass(r);
								n("#" + n.jgrid.jqID(this.id), "#" + n.jgrid.jqID(t.p.id) + "_frozen").removeClass(r)
							}));
							u = null
						}), t.grid.hDiv.loading || n(t).triggerHandler("jqGridAfterGridComplete"), t.p.frozenColumns = !0)
					}
				}
			})
		},
		destroyFrozenColumns: function() {
			return this.each(function() {
				var t, r, i;
				this.grid && this.p.frozenColumns === !0 && (t = this, r = n(t).jqGrid("getStyleUI", t.p.styleUI + ".common", "hover", !0), (n(t.grid.fhDiv).remove(), n(t.grid.fbDiv).remove(), t.grid.fhDiv = null, t.grid.fbDiv = null, t.p.footerrow && (n(t.grid.fsDiv).remove(), t.grid.fsDiv = null), n(this).unbind(".setFrozenColumns"), t.p.hoverrows === !0) && n("#" + n.jgrid.jqID(t.p.id)).bind("mouseover",
				function(t) {
					i = n(t.target).closest("tr.jqgrow");
					"ui-subgrid" !== n(i).attr("class") && n(i).addClass(r)
				}).bind("mouseout",
				function(t) {
					i = n(t.target).closest("tr.jqgrow");
					n(i).removeClass(r)
				}), this.p.frozenColumns = !1)
			})
		},
		resizeColumn: function(n, t) {
			return this.each(function() {
				var r, f, o, u = this.grid,
				i = this.p,
				e = i.colModel,
				s = e.length;
				if ("string" == typeof n) {
					for (r = 0; s > r; r++) if (e[r].name === n) {
						n = r;
						break
					}
				} else n = parseInt(n, 10);
				if (t = parseInt(t, 10), !("number" != typeof n || 0 > n || n > e.length - 1 || "number" != typeof t || t < i.minColWidth)) {
					if (i.forceFit) for (i.nv = 0, r = n + 1; s > r; r++) if (e[r].hidden !== !0) {
						i.nv = r - n;
						break
					}
					if (u.resizing = {
						idx: n
					},
					f = t - u.headers[n].width, i.forceFit) {
						if (o = u.headers[n + i.nv].width - f, o < i.minColWidth) return;
						u.headers[n + i.nv].newWidth = u.headers[n + i.nv].width - f
					}
					u.newWidth = i.tblwidth + f;
					u.headers[n].newWidth = t;
					u.dragEnd(!1)
				}
			})
		},
		getStyleUI: function(t, i, r, u) {
			try {
				var f = "",
				o = t.split("."),
				e = "";
				switch (r || (f = "class=", e = '"'), null == u && (u = ""), o.length) {
				case 1:
					f += e + u + " " + n.jgrid.styleUI[o[0]][i] + e;
					break;
				case 2:
					f += e + u + " " + n.jgrid.styleUI[o[0]][o[1]][i] + e
				}
			} catch(s) {
				f = ""
			}
			return n.trim(f)
		},
		resizeGrid: function(t) {
			return this.each(function() {
				var i = this;
				void 0 === t && (t = 500);
				setTimeout(function() {
					var t = n(window).width(),
					r = n("#gbox_" + n.jgrid.jqID(i.p.id)).parent().width(),
					u = i.p.width;
					u = t - r > 3 ? r: t;
					n("#" + n.jgrid.jqID(i.p.id)).jqGrid("setGridWidth", u)
				},
				t)
			})
		}
	});
	n.jgrid.extend({
		editCell: function(t, i, r) {
			return this.each(function() {
				var e, f, o, s, u = this,
				c = n(this).jqGrid("getStyleUI", u.p.styleUI + ".common", "highlight", !0),
				l = n(this).jqGrid("getStyleUI", u.p.styleUI + ".common", "hover", !0),
				y = n(this).jqGrid("getStyleUI", u.p.styleUI + ".celledit", "inputClass", !0),
				a,
				v,
				h;
				if (u.grid && u.p.cellEdit === !0) {
					if (i = parseInt(i, 10), u.p.selrow = u.rows[t].id, u.p.knv || n(u).jqGrid("GridNav"), u.p.savedRow.length > 0) {
						if (r === !0 && t == u.p.iRow && i == u.p.iCol) return;
						n(u).jqGrid("saveCell", u.p.savedRow[0].id, u.p.savedRow[0].ic)
					} else window.setTimeout(function() {
						n("#" + n.jgrid.jqID(u.p.knv)).attr("tabindex", "-1").focus()
					},
					1);
					if (s = u.p.colModel[i], e = s.name, "subgrid" !== e && "cb" !== e && "rn" !== e) {
						if (o = n("td:eq(" + i + ")", u.rows[t]), s.editable !== !0 || r !== !0 || o.hasClass("not-editable-cell") || n.isFunction(u.p.isCellEditable) && !u.p.isCellEditable.call(u, e, t, i)) parseInt(u.p.iCol, 10) >= 0 && parseInt(u.p.iRow, 10) >= 0 && n(u.rows[u.p.iRow]).removeClass("selected-row " + l).find("td:eq(" + u.p.iCol + ")").removeClass("edit-cell " + c),
						o.addClass("edit-cell " + c),
						n(u.rows[t]).addClass("selected-row " + l),
						f = o.html().replace(/\&#160\;/gi, ""),
						n(u).triggerHandler("jqGridSelectCell", [u.rows[t].id, e, f, t, i]),
						n.isFunction(u.p.onSelectCell) && u.p.onSelectCell.call(u, u.rows[t].id, e, f, t, i);
						else {
							parseInt(u.p.iCol, 10) >= 0 && parseInt(u.p.iRow, 10) >= 0 && n(u.rows[u.p.iRow]).removeClass("selected-row " + l).find("td:eq(" + u.p.iCol + ")").removeClass("edit-cell " + c);
							n(o).addClass("edit-cell " + c);
							n(u.rows[t]).addClass("selected-row " + l);
							try {
								f = n.unformat.call(u, o, {
									rowId: u.rows[t].id,
									colModel: s
								},
								i)
							} catch(p) {
								f = s.edittype && "textarea" === s.edittype ? n(o).text() : n(o).html()
							} (u.p.autoencode && (f = n.jgrid.htmlDecode(f)), s.edittype || (s.edittype = "text"), u.p.savedRow.push({
								id: t,
								ic: i,
								name: e,
								v: f
							}), ("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0)) && (f = ""), n.isFunction(u.p.formatCell)) && (a = u.p.formatCell.call(u, u.rows[t].id, e, f, t, i), void 0 !== a && (f = a));
							n(u).triggerHandler("jqGridBeforeEditCell", [u.rows[t].id, e, f, t, i]);
							n.isFunction(u.p.beforeEditCell) && u.p.beforeEditCell.call(u, u.rows[t].id, e, f, t, i);
							v = n.extend({},
							s.editoptions || {},
							{
								id: t + "_" + e,
								name: e,
								rowId: u.rows[t].id,
								oper: "edit"
							});
							h = n.jgrid.createEl.call(u, s.edittype, v, f, !0, n.extend({},
							n.jgrid.ajaxOptions, u.p.ajaxSelectOptions || {}));
							n.inArray(s.edittype, ["text", "textarea", "password", "select"]) > -1 && n(h).addClass(y);
							n(o).html("").append(h).attr("tabindex", "0");
							n.jgrid.bindEv.call(u, h, v);
							window.setTimeout(function() {
								n(h).focus()
							},
							1);
							n("input, select, textarea", o).bind("keydown",
							function(r) {
								if (27 === r.keyCode && (n("input.hasDatepicker", o).length > 0 ? n(".ui-datepicker").is(":hidden") ? n(u).jqGrid("restoreCell", t, i) : n("input.hasDatepicker", o).datepicker("hide") : n(u).jqGrid("restoreCell", t, i)), 13 === r.keyCode && !r.shiftKey) return n(u).jqGrid("saveCell", t, i),
								!1;
								if (9 === r.keyCode) {
									if (u.grid.hDiv.loading) return ! 1;
									r.shiftKey ? n(u).jqGrid("prevCell", t, i) : n(u).jqGrid("nextCell", t, i)
								}
								r.stopPropagation()
							});
							n(u).triggerHandler("jqGridAfterEditCell", [u.rows[t].id, e, f, t, i]);
							n.isFunction(u.p.afterEditCell) && u.p.afterEditCell.call(u, u.rows[t].id, e, f, t, i)
						}
						u.p.iCol = i;
						u.p.iRow = t
					}
				}
			})
		},
		saveCell: function(t, i) {
			return this.each(function() {
				var k, r = this,
				c = n.jgrid.getRegional(this, "errors"),
				s = n.jgrid.getRegional(this, "edit"),
				d,
				g,
				y,
				p,
				w,
				tt,
				v,
				o,
				it,
				rt,
				b;
				if (r.grid && r.p.cellEdit === !0) {
					if (k = r.p.savedRow.length >= 1 ? 0 : null, null !== k) {
						var u, e, l = n("td:eq(" + i + ")", r.rows[t]),
						h = r.p.colModel[i],
						f = h.name,
						a = n.jgrid.jqID(f);
						switch (h.edittype) {
						case "select":
							h.editoptions.multiple ? (d = n("#" + t + "_" + a, r.rows[t]), g = [], u = n(d).val(), u ? u.join(",") : u = "", n("option:selected", d).each(function(t, i) {
								g[t] = n(i).text()
							}), e = g.join(",")) : (u = n("#" + t + "_" + a + " option:selected", r.rows[t]).val(), e = n("#" + t + "_" + a + " option:selected", r.rows[t]).text());
							h.formatter && (e = u);
							break;
						case "checkbox":
							y = ["Yes", "No"];
							h.editoptions && (y = h.editoptions.value.split(":"));
							u = n("#" + t + "_" + a, r.rows[t]).is(":checked") ? y[0] : y[1];
							e = u;
							break;
						case "password":
						case "text":
						case "textarea":
						case "button":
							u = n("#" + t + "_" + a, r.rows[t]).val();
							e = u;
							break;
						case "custom":
							try {
								if (!h.editoptions || !n.isFunction(h.editoptions.custom_value)) throw "e1";
								if (u = h.editoptions.custom_value.call(r, n(".customelement", l), "get"), void 0 === u) throw "e2";
								e = u
							} catch(nt) {
								"e1" === nt ? n.jgrid.info_dialog(c.errcap, "function 'custom_value' " + s.msg.nodefined, s.bClose, {
									styleUI: r.p.styleUI
								}) : "e2" === nt ? n.jgrid.info_dialog(c.errcap, "function 'custom_value' " + s.msg.novalue, s.bClose, {
									styleUI: r.p.styleUI
								}) : n.jgrid.info_dialog(c.errcap, nt.message, s.bClose, {
									styleUI: r.p.styleUI
								})
							}
						}
						if (e !== r.p.savedRow[k].v) if (p = n(r).triggerHandler("jqGridBeforeSaveCell", [r.rows[t].id, f, u, t, i]), (p && (u = p, e = p), n.isFunction(r.p.beforeSaveCell)) && (w = r.p.beforeSaveCell.call(r, r.rows[t].id, f, u, t, i), w && (u = w, e = w)), tt = n.jgrid.checkValues.call(r, u, i), tt[0] === !0) {
							if (v = n(r).triggerHandler("jqGridBeforeSubmitCell", [r.rows[t].id, f, u, t, i]) || {},
							n.isFunction(r.p.beforeSubmitCell) && (v = r.p.beforeSubmitCell.call(r, r.rows[t].id, f, u, t, i), v || (v = {})), n("input.hasDatepicker", l).length > 0 && n("input.hasDatepicker", l).datepicker("hide"), "remote" === r.p.cellsubmit) if (r.p.cellurl) o = {},
							r.p.autoencode && (u = n.jgrid.htmlEncode(u)),
							o[f] = u,
							b = r.p.prmNames,
							it = b.id,
							rt = b.oper,
							o[it] = n.jgrid.stripPref(r.p.idPrefix, r.rows[t].id),
							o[rt] = b.editoper,
							o = n.extend(v, o),
							n(r).jqGrid("progressBar", {
								method: "show",
								loadtype: r.p.loadui,
								htmlcontent: n.jgrid.getRegional(r, "defaults.savetext")
							}),
							r.grid.hDiv.loading = !0,
							n.ajax(n.extend({
								url: r.p.cellurl,
								data: n.isFunction(r.p.serializeCellData) ? r.p.serializeCellData.call(r, o) : o,
								type: "POST",
								complete: function(h, a) {
									if (n(r).jqGrid("progressBar", {
										method: "hide",
										loadtype: r.p.loadui
									}), r.grid.hDiv.loading = !1, "success" === a) {
										var v = n(r).triggerHandler("jqGridAfterSubmitCell", [r, h, o.id, f, u, t, i]) || [!0, ""];
										v[0] === !0 && n.isFunction(r.p.afterSubmitCell) && (v = r.p.afterSubmitCell.call(r, h, o.id, f, u, t, i));
										v[0] === !0 ? (n(l).empty(), n(r).jqGrid("setCell", r.rows[t].id, i, e, !1, !1, !0), n(l).addClass("dirty-cell"), n(r.rows[t]).addClass("edited"), n(r).triggerHandler("jqGridAfterSaveCell", [r.rows[t].id, f, u, t, i]), n.isFunction(r.p.afterSaveCell) && r.p.afterSaveCell.call(r, r.rows[t].id, f, u, t, i), r.p.savedRow.splice(0, 1)) : (n.jgrid.info_dialog(c.errcap, v[1], s.bClose, {
											styleUI: r.p.styleUI
										}), n(r).jqGrid("restoreCell", t, i))
									}
								},
								error: function(u, f, e) {
									n("#lui_" + n.jgrid.jqID(r.p.id)).hide();
									r.grid.hDiv.loading = !1;
									n(r).triggerHandler("jqGridErrorCell", [u, f, e]);
									n.isFunction(r.p.errorCell) ? (r.p.errorCell.call(r, u, f, e), n(r).jqGrid("restoreCell", t, i)) : (n.jgrid.info_dialog(c.errcap, u.status + " : " + u.statusText + "<br/>" + f, s.bClose, {
										styleUI: r.p.styleUI
									}), n(r).jqGrid("restoreCell", t, i))
								}
							},
							n.jgrid.ajaxOptions, r.p.ajaxCellOptions || {}));
							else try {
								n.jgrid.info_dialog(c.errcap, c.nourl, s.bClose, {
									styleUI: r.p.styleUI
								});
								n(r).jqGrid("restoreCell", t, i)
							} catch(nt) {}
							"clientArray" === r.p.cellsubmit && (n(l).empty(), n(r).jqGrid("setCell", r.rows[t].id, i, e, !1, !1, !0), n(l).addClass("dirty-cell"), n(r.rows[t]).addClass("edited"), n(r).triggerHandler("jqGridAfterSaveCell", [r.rows[t].id, f, u, t, i]), n.isFunction(r.p.afterSaveCell) && r.p.afterSaveCell.call(r, r.rows[t].id, f, u, t, i), r.p.savedRow.splice(0, 1))
						} else try {
							window.setTimeout(function() {
								n.jgrid.info_dialog(c.errcap, u + " " + tt[1], s.bClose, {
									styleUI: r.p.styleUI
								})
							},
							100);
							n(r).jqGrid("restoreCell", t, i)
						} catch(nt) {} else n(r).jqGrid("restoreCell", t, i)
					}
					window.setTimeout(function() {
						n("#" + n.jgrid.jqID(r.p.knv)).attr("tabindex", "-1").focus()
					},
					0)
				}
			})
		},
		restoreCell: function(t, i) {
			return this.each(function() {
				var u, r = this,
				f;
				if (r.grid && r.p.cellEdit === !0) {
					if (u = r.p.savedRow.length >= 1 ? 0 : null, null !== u) {
						if (f = n("td:eq(" + i + ")", r.rows[t]), n.isFunction(n.fn.datepicker)) try {
							n("input.hasDatepicker", f).datepicker("hide")
						} catch(e) {}
						n(f).empty().attr("tabindex", "-1");
						n(r).jqGrid("setCell", r.rows[t].id, i, r.p.savedRow[u].v, !1, !1, !0);
						n(r).triggerHandler("jqGridAfterRestoreCell", [r.rows[t].id, r.p.savedRow[u].v, t, i]);
						n.isFunction(r.p.afterRestoreCell) && r.p.afterRestoreCell.call(r, r.rows[t].id, r.p.savedRow[u].v, t, i);
						r.p.savedRow.splice(0, 1)
					}
					window.setTimeout(function() {
						n("#" + r.p.knv).attr("tabindex", "-1").focus()
					},
					0)
				}
			})
		},
		nextCell: function(t, i) {
			return this.each(function() {
				var u, r = this,
				f = !1;
				if (r.grid && r.p.cellEdit === !0) {
					for (u = i + 1; u < r.p.colModel.length; u++) if (r.p.colModel[u].editable === !0 && (!n.isFunction(r.p.isCellEditable) || r.p.isCellEditable.call(r, r.p.colModel[u].name, t, u))) {
						f = u;
						break
					}
					f !== !1 ? n(r).jqGrid("editCell", t, f, !0) : r.p.savedRow.length > 0 && n(r).jqGrid("saveCell", t, i)
				}
			})
		},
		prevCell: function(t, i) {
			return this.each(function() {
				var u, r = this,
				f = !1;
				if (r.grid && r.p.cellEdit === !0) {
					for (u = i - 1; u >= 0; u--) if (r.p.colModel[u].editable === !0 && (!n.isFunction(r.p.isCellEditable) || r.p.isCellEditable.call(r, r.p.colModel[u].name, t, u))) {
						f = u;
						break
					}
					f !== !1 ? n(r).jqGrid("editCell", t, f, !0) : r.p.savedRow.length > 0 && n(r).jqGrid("saveCell", t, i)
				}
			})
		},
		GridNav: function() {
			return this.each(function() {
				function u(i, r, u) {
					if ("v" === u.substr(0, 1)) {
						var e = n(t.grid.bDiv)[0].clientHeight,
						o = n(t.grid.bDiv)[0].scrollTop,
						s = t.rows[i].offsetTop + t.rows[i].clientHeight,
						h = t.rows[i].offsetTop;
						"vd" === u && s >= e && (n(t.grid.bDiv)[0].scrollTop = n(t.grid.bDiv)[0].scrollTop + t.rows[i].clientHeight);
						"vu" === u && o > h && (n(t.grid.bDiv)[0].scrollTop = n(t.grid.bDiv)[0].scrollTop - t.rows[i].clientHeight)
					}
					if ("h" === u) {
						var c = n(t.grid.bDiv)[0].clientWidth,
						f = n(t.grid.bDiv)[0].scrollLeft,
						l = t.rows[i].cells[r].offsetLeft + t.rows[i].cells[r].clientWidth,
						a = t.rows[i].cells[r].offsetLeft;
						l >= c + parseInt(f, 10) ? n(t.grid.bDiv)[0].scrollLeft = n(t.grid.bDiv)[0].scrollLeft + t.rows[i].cells[r].clientWidth: f > a && (n(t.grid.bDiv)[0].scrollLeft = n(t.grid.bDiv)[0].scrollLeft - t.rows[i].cells[r].clientWidth)
					}
				}
				function f(n, i) {
					var u, r;
					if ("lft" === i) for (u = n + 1, r = n; r >= 0; r--) if (t.p.colModel[r].hidden !== !0) {
						u = r;
						break
					}
					if ("rgt" === i) for (u = n - 1, r = n; r < t.p.colModel.length; r++) if (t.p.colModel[r].hidden !== !0) {
						u = r;
						break
					}
					return u
				}
				var t = this,
				i, r, e;
				t.grid && t.p.cellEdit === !0 && (t.p.knv = t.p.id + "_kn", e = n("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + t.p.knv + "'><\/div><\/div>"), n(e).insertBefore(t.grid.cDiv), n("#" + t.p.knv).focus().keydown(function(e) {
					switch (r = e.keyCode, "rtl" === t.p.direction && (37 === r ? r = 39 : 39 === r && (r = 37)), r) {
					case 38:
						t.p.iRow - 1 > 0 && (u(t.p.iRow - 1, t.p.iCol, "vu"), n(t).jqGrid("editCell", t.p.iRow - 1, t.p.iCol, !1));
						break;
					case 40:
						t.p.iRow + 1 <= t.rows.length - 1 && (u(t.p.iRow + 1, t.p.iCol, "vd"), n(t).jqGrid("editCell", t.p.iRow + 1, t.p.iCol, !1));
						break;
					case 37:
						t.p.iCol - 1 >= 0 && (i = f(t.p.iCol - 1, "lft"), u(t.p.iRow, i, "h"), n(t).jqGrid("editCell", t.p.iRow, i, !1));
						break;
					case 39:
						t.p.iCol + 1 <= t.p.colModel.length - 1 && (i = f(t.p.iCol + 1, "rgt"), u(t.p.iRow, i, "h"), n(t).jqGrid("editCell", t.p.iRow, i, !1));
						break;
					case 13:
						parseInt(t.p.iCol, 10) >= 0 && parseInt(t.p.iRow, 10) >= 0 && n(t).jqGrid("editCell", t.p.iRow, t.p.iCol, !0);
						break;
					default:
						return ! 0
					}
					return ! 1
				}))
			})
		},
		getChangedCells: function(t) {
			var i = [];
			return t || (t = "all"),
			this.each(function() {
				var u, r = this;
				r.grid && r.p.cellEdit === !0 && n(r.rows).each(function(f) {
					var e = {};
					n(this).hasClass("edited") && (n("td", this).each(function(i) {
						if (u = r.p.colModel[i].name, "cb" !== u && "subgrid" !== u) if ("dirty" === t) {
							if (n(this).hasClass("dirty-cell")) try {
								e[u] = n.unformat.call(r, this, {
									rowId: r.rows[f].id,
									colModel: r.p.colModel[i]
								},
								i)
							} catch(o) {
								e[u] = n.jgrid.htmlDecode(n(this).html())
							}
						} else try {
							e[u] = n.unformat.call(r, this, {
								rowId: r.rows[f].id,
								colModel: r.p.colModel[i]
							},
							i)
						} catch(o) {
							e[u] = n.jgrid.htmlDecode(n(this).html())
						}
					}), e.id = this.id, i.push(e))
				})
			}),
			i
		}
	});
	n.extend(n.jgrid, {
		showModal: function(n) {
			n.w.show()
		},
		closeModal: function(n) {
			n.w.hide().attr("aria-hidden", "true");
			n.o && n.o.remove()
		},
		hideModal: function(t, i) {
			var r, o, u, f, e, s;
			if (i = n.extend({
				jqm: !0,
				gb: "",
				removemodal: !1,
				formprop: !1,
				form: ""
			},
			i || {}), r = i.gb && "string" == typeof i.gb && "#gbox_" === i.gb.substr(0, 6) ? n("#" + i.gb.substr(6))[0] : !1, !i.onClose || (o = r ? i.onClose.call(r, t) : i.onClose(t), "boolean" != typeof o || o)) {
				if (i.formprop && r && i.form && (u = n(t)[0].style.height, f = n(t)[0].style.width, u.indexOf("px") > -1 && (u = parseFloat(u)), f.indexOf("px") > -1 && (f = parseFloat(f)), "edit" === i.form ? (e = "#" + n.jgrid.jqID("FrmGrid_" + i.gb.substr(6)), s = "formProp") : "view" === i.form && (e = "#" + n.jgrid.jqID("ViewGrid_" + i.gb.substr(6)), s = "viewProp"), n(r).data(s, {
					top: parseFloat(n(t).css("top")),
					left: parseFloat(n(t).css("left")),
					width: f,
					height: u,
					dataheight: n(e).height(),
					datawidth: n(e).width()
				})), n.fn.jqm && i.jqm === !0) n(t).attr("aria-hidden", "true").jqmHide();
				else {
					if ("" !== i.gb) try {
						n(".jqgrid-overlay:first", i.gb).hide()
					} catch(h) {}
					n(t).hide().attr("aria-hidden", "true")
				}
				i.removemodal && n(t).remove()
			}
		},
		findPos: function(n) {
			var t = 0,
			i = 0;
			if (n.offsetParent) do t += n.offsetLeft,
			i += n.offsetTop;
			while (n = n.offsetParent);
			return [t, i]
		},
		createModal: function(t, i, r, u, f, e, o) {
			var h, v, y, c, p, w, b;
			r = n.extend(!0, {},
			n.jgrid.jqModal || {},
			r);
			var k = this,
			d = "rtl" === n(r.gbox).attr("dir") ? !0 : !1,
			l = n.jgrid.styleUI[r.styleUI || "jQueryUI"].modal,
			a = n.jgrid.styleUI[r.styleUI || "jQueryUI"].common,
			s = document.createElement("div");
			if (o = n.extend({},
			o || {}), s.className = "ui-jqdialog " + l.modal, s.id = t.themodal, h = document.createElement("div"), h.className = "ui-jqdialog-titlebar " + l.header, h.id = t.modalhead, n(h).append("<span class='ui-jqdialog-title'>" + r.caption + "<\/span>"), v = n("<a class='ui-jqdialog-titlebar-close " + a.cornerall + "'><\/a>").hover(function() {
				v.addClass(a.hover)
			},
			function() {
				v.removeClass(a.hover)
			}).append("<span class='" + a.icon_base + " " + l.icon_close + "'><\/span>"), n(h).append(v), d ? (s.dir = "rtl", n(".ui-jqdialog-title", h).css("float", "right"), n(".ui-jqdialog-titlebar-close", h).css("left", "0.3em")) : (s.dir = "ltr", n(".ui-jqdialog-title", h).css("float", "left"), n(".ui-jqdialog-titlebar-close", h).css("right", "0.3em")), y = document.createElement("div"), n(y).addClass("ui-jqdialog-content " + l.content).attr("id", t.modalcontent), n(y).append(i), s.appendChild(y), n(s).prepend(h), e === !0 ? n("body").append(s) : "string" == typeof e ? n(e).append(s) : n(s).insertBefore(u), n(s).css(o), void 0 === r.jqModal && (r.jqModal = !0), c = {},
			n.fn.jqm && r.jqModal === !0 ? (0 === r.left && 0 === r.top && r.overlay && (p = [], p = n.jgrid.findPos(f), r.left = p[0] + 4, r.top = p[1] + 4), c.top = r.top + "px", c.left = r.left) : (0 !== r.left || 0 !== r.top) && (c.left = r.left, c.top = r.top + "px"), (n("a.ui-jqdialog-titlebar-close", h).click(function() {
				var i = n("#" + n.jgrid.jqID(t.themodal)).data("onClose") || r.onClose,
				u = n("#" + n.jgrid.jqID(t.themodal)).data("gbox") || r.gbox;
				return k.hideModal("#" + n.jgrid.jqID(t.themodal), {
					gb: u,
					jqm: r.jqModal,
					onClose: i,
					removemodal: r.removemodal || !1,
					formprop: !r.recreateForm || !1,
					form: r.form || ""
				}),
				!1
			}), 0 !== r.width && r.width || (r.width = 300), 0 !== r.height && r.height || (r.height = 200), r.zIndex) || (w = n(u).parents("*[role=dialog]").filter(":first").css("z-index"), r.zIndex = w ? parseInt(w, 10) + 2 : 950), b = 0, d && c.left && !e && (b = n(r.gbox).width() - (isNaN(r.width) ? 0 : parseInt(r.width, 10)) - 8, c.left = parseInt(c.left, 10) + parseInt(b, 10)), c.left && (c.left += "px"), n(s).css(n.extend({
				width: isNaN(r.width) ? "auto": r.width + "px",
				height: isNaN(r.height) ? "auto": r.height + "px",
				zIndex: r.zIndex,
				overflow: "hidden"
			},
			c)).attr({
				tabIndex: "-1",
				role: "dialog",
				"aria-labelledby": t.modalhead,
				"aria-hidden": "true"
			}), void 0 === r.drag && (r.drag = !0), void 0 === r.resize && (r.resize = !0), r.drag) if (n(h).css("cursor", "move"), n.fn.jqDrag) n(s).jqDrag(h);
			else try {
				n(s).draggable({
					handle: n("#" + n.jgrid.jqID(h.id))
				})
			} catch(g) {}
			if (r.resize) if (n.fn.jqResize) n(s).append("<div class='jqResize " + l.resizable + " " + a.icon_base + " " + l.icon_resizable + "'><\/div>"),
			n("#" + n.jgrid.jqID(t.themodal)).jqResize(".jqResize", t.scrollelm ? "#" + n.jgrid.jqID(t.scrollelm) : !1);
			else try {
				n(s).resizable({
					handles: "se, sw",
					alsoResize: t.scrollelm ? "#" + n.jgrid.jqID(t.scrollelm) : !1
				})
			} catch(nt) {}
			r.closeOnEscape === !0 && n(s).keydown(function(i) {
				if (27 === i.which) {
					var u = n("#" + n.jgrid.jqID(t.themodal)).data("onClose") || r.onClose;
					k.hideModal("#" + n.jgrid.jqID(t.themodal), {
						gb: r.gbox,
						jqm: r.jqModal,
						onClose: u,
						removemodal: r.removemodal || !1,
						formprop: !r.recreateForm || !1,
						form: r.form || ""
					})
				}
			})
		},
		viewModal: function(t, i) {
			if (i = n.extend({
				toTop: !0,
				overlay: 10,
				modal: !1,
				overlayClass: "ui-widget-overlay",
				onShow: n.jgrid.showModal,
				onHide: n.jgrid.closeModal,
				gbox: "",
				jqm: !0,
				jqM: !0
			},
			i || {}), void 0 === i.focusField && (i.focusField = 0), i.focusField = "number" == typeof i.focusField && i.focusField >= 0 ? parseInt(i.focusField, 10) : "boolean" != typeof i.focusField || i.focusField ? 0 : !1, n.fn.jqm && i.jqm === !0) i.jqM ? n(t).attr("aria-hidden", "false").jqm(i).jqmShow() : n(t).attr("aria-hidden", "false").jqmShow();
			else if ("" !== i.gbox && (n(".jqgrid-overlay:first", i.gbox).show(), n(t).data("gbox", i.gbox)), n(t).show().attr("aria-hidden", "false"), i.focusField >= 0) try {
				n(":input:visible", t)[parseInt(i.focusField, 10)].focus()
			} catch(r) {}
		},
		info_dialog: function(t, i, r, u) {
			var f = {
				width: 290,
				height: "auto",
				dataheight: "auto",
				drag: !0,
				resize: !1,
				left: 250,
				top: 170,
				zIndex: 1e3,
				jqModal: !0,
				modal: !1,
				closeOnEscape: !0,
				align: "center",
				buttonalign: "center",
				buttons: []
			},
			e,
			o;
			n.extend(!0, f, n.jgrid.jqModal || {},
			{
				caption: "<b>" + t + "<\/b>"
			},
			u || {});
			var s = f.jqModal,
			a = this,
			l = n.jgrid.styleUI[f.styleUI || "jQueryUI"].modal,
			h = n.jgrid.styleUI[f.styleUI || "jQueryUI"].common;
			if (n.fn.jqm && !s && (s = !1), o = "", f.buttons.length > 0) for (e = 0; e < f.buttons.length; e++) void 0 === f.buttons[e].id && (f.buttons[e].id = "info_button_" + e),
			o += "<a id='" + f.buttons[e].id + "' class='fm-button " + h.button + "'>" + f.buttons[e].text + "<\/a>";
			var v = isNaN(f.dataheight) ? f.dataheight: f.dataheight + "px",
			y = "text-align:" + f.align + ";",
			c = "<div id='info_id'>";
			c += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + v + ";" + y + "'>" + i + "<\/div>";
			c += r ? "<div class='" + l.header + "' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button " + h.button + "'>" + r + "<\/a>" + o + "<\/div>": "" !== o ? "<div class='" + l.header + "' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + o + "<\/div>": "";
			c += "<\/div>";
			try {
				"false" === n("#info_dialog").attr("aria-hidden") && n.jgrid.hideModal("#info_dialog", {
					jqm: s
				});
				n("#info_dialog").remove()
			} catch(p) {}
			n.jgrid.createModal({
				themodal: "info_dialog",
				modalhead: "info_head",
				modalcontent: "info_content",
				scrollelm: "infocnt"
			},
			c, f, "", "", !0);
			o && n.each(f.buttons,
			function(t) {
				n("#" + n.jgrid.jqID(this.id), "#info_id").bind("click",
				function() {
					return f.buttons[t].onClick.call(n("#info_dialog")),
					!1
				})
			});
			n("#closedialog", "#info_id").click(function() {
				return a.hideModal("#info_dialog", {
					jqm: s,
					onClose: n("#info_dialog").data("onClose") || f.onClose,
					gb: n("#info_dialog").data("gbox") || f.gbox
				}),
				!1
			});
			n(".fm-button", "#info_dialog").hover(function() {
				n(this).addClass(h.hover)
			},
			function() {
				n(this).removeClass(h.hover)
			});
			n.isFunction(f.beforeOpen) && f.beforeOpen();
			n.jgrid.viewModal("#info_dialog", {
				onHide: function(n) {
					n.w.hide().remove();
					n.o && n.o.remove()
				},
				modal: f.modal,
				jqm: s
			});
			n.isFunction(f.afterOpen) && f.afterOpen();
			try {
				n("#info_dialog").focus()
			} catch(w) {}
		},
		bindEv: function(t, i) {
			var r = this;
			n.isFunction(i.dataInit) && i.dataInit.call(r, t, i);
			i.dataEvents && n.each(i.dataEvents,
			function() {
				void 0 !== this.data ? n(t).bind(this.type, this.data, this.fn) : n(t).bind(this.type, this.fn)
			})
		},
		createEl: function(t, i, r, u, f) {
			function p(t, i, r) {
				var u = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "oper"];
				void 0 !== r && n.isArray(r) && n.merge(u, r);
				n.each(i,
				function(i, r) { - 1 === n.inArray(i, u) && n(t).attr(i, r)
				});
				i.hasOwnProperty("id") || n(t).attr("id", n.jgrid.randId())
			}
			var e = "",
			s = this,
			nt, rt, l, a, w, k, v, ut, y, o, c, h, tt, ft, et, g, it, b, ot;
			switch (t) {
			case "textarea":
				e = document.createElement("textarea");
				u ? i.cols || n(e).css({
					width: "98%"
				}) : i.cols || (i.cols = 20);
				i.rows || (i.rows = 2); ("&nbsp;" === r || "&#160;" === r || 1 === r.length && 160 === r.charCodeAt(0)) && (r = "");
				e.value = r;
				p(e, i);
				n(e).attr({
					role: "textbox",
					multiline: "true"
				});
				break;
			case "checkbox":
				(e = document.createElement("input"), e.type = "checkbox", i.value) ? (nt = i.value.split(":"), r === nt[0] && (e.checked = !0, e.defaultChecked = !0), e.value = nt[0], n(e).attr("offval", nt[1])) : (rt = (r + "").toLowerCase(), rt.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== rt ? (e.checked = !0, e.defaultChecked = !0, e.value = r) : e.value = "on", n(e).attr("offval", "off"));
				p(e, i, ["value"]);
				n(e).attr("role", "checkbox");
				break;
			case "select":
				if (e = document.createElement("select"), e.setAttribute("role", "select"), a = [], i.multiple === !0 ? (l = !0, e.multiple = "multiple", n(e).attr("aria-multiselectable", "true")) : l = !1, null != i.dataUrl) {
					w = null;
					k = i.postData || f.postData;
					try {
						w = i.rowId
					} catch(d) {}
					s.p && s.p.idPrefix && (w = n.jgrid.stripPref(s.p.idPrefix, w));
					n.ajax(n.extend({
						url: n.isFunction(i.dataUrl) ? i.dataUrl.call(s, w, r, String(i.name)) : i.dataUrl,
						type: "GET",
						dataType: "html",
						data: n.isFunction(k) ? k.call(s, w, r, String(i.name)) : k,
						context: {
							elem: e,
							options: i,
							vl: r
						},
						success: function(t) {
							var o, r = [],
							u = this.elem,
							f = this.vl,
							i = n.extend({},
							this.options),
							c = i.multiple === !0,
							l = i.cacheUrlData === !0,
							h = "",
							e = n.isFunction(i.buildSelect) ? i.buildSelect.call(s, t) : t;
							"string" == typeof e && (e = n(n.trim(e)).html());
							e && (n(u).append(e), p(u, i, k ? ["postData"] : void 0), void 0 === i.size && (i.size = c ? 3 : 1), c ? (r = f.split(","), r = n.map(r,
							function(t) {
								return n.trim(t)
							})) : r[0] = n.trim(f), setTimeout(function() {
								if (n("option", u).each(function(t) {
									o = n(this).text();
									f = n(this).val() || o;
									l && (h += (0 !== t ? ";": "") + f + ":" + o);
									0 === t && u.multiple && (this.selected = !1);
									n(this).attr("role", "option"); (n.inArray(n.trim(o), r) > -1 || n.inArray(n.trim(f), r) > -1) && (this.selected = "selected")
								}), l) if ("edit" === i.oper) n(s).jqGrid("setColProp", i.name, {
									editoptions: {
										buildSelect: null,
										dataUrl: null,
										value: h
									}
								});
								else if ("search" === i.oper) n(s).jqGrid("setColProp", i.name, {
									searchoptions: {
										dataUrl: null,
										value: h
									}
								});
								else if ("filter" === i.oper && n("#fbox_" + s.p.id)[0].p) {
									var t, e = n("#fbox_" + s.p.id)[0].p.columns;
									n.each(e,
									function() {
										return t = this.index || this.name,
										i.name === t ? (this.searchoptions.dataUrl = null, this.searchoptions.value = h, !1) : void 0
									})
								}
								n(s).triggerHandler("jqGridAddEditAfterSelectUrlComplete", [u])
							},
							0))
						}
					},
					f || {}))
				} else if (i.value) {
					if (void 0 === i.size && (i.size = l ? 3 : 1), l && (a = r.split(","), a = n.map(a,
					function(t) {
						return n.trim(t)
					})), "function" == typeof i.value && (i.value = i.value()), ft = void 0 === i.separator ? ":": i.separator, et = void 0 === i.delimiter ? ";": i.delimiter, "string" == typeof i.value) for (ut = i.value.split(et), v = 0; v < ut.length; v++) y = ut[v].split(ft),
					y.length > 2 && (y[1] = n.map(y,
					function(n, t) {
						if (t > 0) return n
					}).join(ft)),
					o = document.createElement("option"),
					o.setAttribute("role", "option"),
					o.value = y[0],
					o.innerHTML = y[1],
					e.appendChild(o),
					l || n.trim(y[0]) !== n.trim(r) && n.trim(y[1]) !== n.trim(r) || (o.selected = "selected"),
					l && (n.inArray(n.trim(y[1]), a) > -1 || n.inArray(n.trim(y[0]), a) > -1) && (o.selected = "selected");
					else if ("[object Array]" === Object.prototype.toString.call(i.value)) for (c = i.value, v = 0; v < c.length; v++) 2 === c[v].length && (h = c[v][0], tt = c[v][1], o = document.createElement("option"), o.setAttribute("role", "option"), o.value = h, o.innerHTML = tt, e.appendChild(o), l || n.trim(h) !== n.trim(r) && n.trim(tt) !== n.trim(r) || (o.selected = "selected"), l && (n.inArray(n.trim(tt), a) > -1 || n.inArray(n.trim(h), a) > -1) && (o.selected = "selected"));
					else if ("object" == typeof i.value) {
						c = i.value;
						for (h in c) c.hasOwnProperty(h) && (o = document.createElement("option"), o.setAttribute("role", "option"), o.value = h, o.innerHTML = c[h], e.appendChild(o), l || n.trim(h) !== n.trim(r) && n.trim(c[h]) !== n.trim(r) || (o.selected = "selected"), l && (n.inArray(n.trim(c[h]), a) > -1 || n.inArray(n.trim(h), a) > -1) && (o.selected = "selected"))
					}
					p(e, i, ["value"])
				}
				break;
			case "image":
			case "file":
				e = document.createElement("input");
				e.type = t;
				p(e, i);
				break;
			case "custom":
				e = document.createElement("span");
				try {
					if (!n.isFunction(i.custom_element)) throw "e1";
					if (g = i.custom_element.call(s, r, i), !g) throw "e2";
					g = n(g).addClass("customelement").attr({
						id: i.id,
						name: i.name
					});
					n(e).empty().append(g)
				} catch(d) {
					it = n.jgrid.getRegional(s, "errors");
					b = n.jgrid.getRegional(s, "edit");
					"e1" === d ? n.jgrid.info_dialog(it.errcap, "function 'custom_element' " + b.msg.nodefined, b.bClose, {
						styleUI: s.p.styleUI
					}) : "e2" === d ? n.jgrid.info_dialog(it.errcap, "function 'custom_element' " + b.msg.novalue, b.bClose, {
						styleUI: s.p.styleUI
					}) : n.jgrid.info_dialog(it.errcap, "string" == typeof d ? d: d.message, b.bClose, {
						styleUI: s.p.styleUI
					})
				}
				break;
			default:
				ot = "button" === t ? "button": "textbox";
				e = document.createElement("input");
				e.type = t;
				e.value = r;
				p(e, i);
				"button" !== t && (u ? i.size || n(e).css({
					width: "96%"
				}) : i.size || (i.size = 20));
				n(e).attr("role", ot)
			}
			return e
		},
		checkDate: function(n, t) {
			var h, a = function(n) {
				return n % 4 != 0 || n % 100 == 0 && n % 400 != 0 ? 28 : 29
			},
			i = {},
			c,
			s,
			l;
			if (n = n.toLowerCase(), h = -1 !== n.indexOf("/") ? "/": -1 !== n.indexOf("-") ? "-": -1 !== n.indexOf(".") ? ".": "/", n = n.split(h), t = t.split(h), 3 !== t.length) return ! 1;
			for (var f, u = -1,
			e = -1,
			o = -1,
			r = 0; r < n.length; r++) c = isNaN(t[r]) ? 0 : parseInt(t[r], 10),
			i[n[r]] = c,
			f = n[r],
			-1 !== f.indexOf("y") && (u = r),
			-1 !== f.indexOf("m") && (o = r),
			-1 !== f.indexOf("d") && (e = r);
			return f = "y" === n[u] || "yyyy" === n[u] ? 4 : "yy" === n[u] ? 2 : -1,
			l = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			-1 === u ? !1 : (s = i[n[u]].toString(), 2 === f && 1 === s.length && (f = 1), s.length !== f || 0 === i[n[u]] && "00" !== t[u] ? !1 : -1 === o ? !1 : (s = i[n[o]].toString(), s.length < 1 || i[n[o]] < 1 || i[n[o]] > 12 ? !1 : -1 === e ? !1 : (s = i[n[e]].toString(), s.length < 1 || i[n[e]] < 1 || i[n[e]] > 31 || 2 === i[n[o]] && i[n[e]] > a(i[n[u]]) || i[n[e]] > l[i[n[o]]] ? !1 : !0)))
		},
		isEmpty: function(n) {
			return n.match(/^\s+$/) || "" === n ? !0 : !1
		},
		checkTime: function(t) {
			var i;
			if (!n.jgrid.isEmpty(t)) {
				if (i = t.match(/^(\d{1,2}):(\d{2})([apAP][Mm])?$/), !i) return ! 1;
				if (i[3]) {
					if (i[1] < 1 || i[1] > 12) return ! 1
				} else if (i[1] > 23) return ! 1;
				if (i[2] > 59) return ! 1
			}
			return ! 0
		},
		checkValues: function(t, i, r, u) {
			var f, h, e, l, w, v, a = this,
			s = a.p.colModel,
			o = n.jgrid.getRegional(this, "edit.msg"),
			c,
			y,
			p;
			if (void 0 === r) if ("string" == typeof i) {
				for (h = 0, w = s.length; w > h; h++) if (s[h].name === i) {
					f = s[h].editrules;
					i = h;
					null != s[h].formoptions && (e = s[h].formoptions.label);
					break
				}
			} else i >= 0 && (f = s[i].editrules);
			else f = r,
			e = void 0 === u ? "_": u;
			if (f) {
				if (e || (e = null != a.p.colNames ? a.p.colNames[i] : s[i].label), f.required === !0 && n.jgrid.isEmpty(t)) return [!1, e + ": " + o.required, ""];
				if (c = f.required === !1 ? !1 : !0, f.number === !0 && (c !== !1 || !n.jgrid.isEmpty(t)) && isNaN(t)) return [!1, e + ": " + o.number, ""];
				if (void 0 !== f.minValue && !isNaN(f.minValue) && parseFloat(t) < parseFloat(f.minValue)) return [!1, e + ": " + o.minValue + " " + f.minValue, ""];
				if (void 0 !== f.maxValue && !isNaN(f.maxValue) && parseFloat(t) > parseFloat(f.maxValue)) return [!1, e + ": " + o.maxValue + " " + f.maxValue, ""];
				if (f.email === !0 && !(c === !1 && n.jgrid.isEmpty(t) || (y = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, y.test(t)))) return [!1, e + ": " + o.email, ""];
				if (f.integer === !0 && (c !== !1 || !n.jgrid.isEmpty(t))) {
					if (isNaN(t)) return [!1, e + ": " + o.integer, ""];
					if (t % 1 != 0 || -1 !== t.indexOf(".")) return [!1, e + ": " + o.integer, ""]
				}
				if (f.date === !0 && !(c === !1 && n.jgrid.isEmpty(t) || (s[i].formatoptions && s[i].formatoptions.newformat ? (l = s[i].formatoptions.newformat, v = n.jgrid.getRegional(a, "formatter.date.masks"), v && v.hasOwnProperty(l) && (l = v[l])) : l = s[i].datefmt || "Y-m-d", n.jgrid.checkDate(l, t)))) return [!1, e + ": " + o.date + " - " + l, ""];
				if (f.time === !0 && !(c === !1 && n.jgrid.isEmpty(t) || n.jgrid.checkTime(t))) return [!1, e + ": " + o.date + " - hh:mm (am/pm)", ""];
				if (f.url === !0 && !(c === !1 && n.jgrid.isEmpty(t) || (y = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, y.test(t)))) return [!1, e + ": " + o.url, ""];
				if (f.custom === !0 && (c !== !1 || !n.jgrid.isEmpty(t))) return n.isFunction(f.custom_func) ? (p = f.custom_func.call(a, t, e, i), n.isArray(p) ? p: [!1, o.customarray, ""]) : [!1, o.customfcheck, ""]
			}
			return [!0, "", ""]
		}
	});
	n.fn.jqFilter = function(t) {
		var r, u, i;
		if ("string" == typeof t) {
			if (r = n.fn.jqFilter[t], !r) throw "jqFilter - No such method: " + t;
			return u = n.makeArray(arguments).slice(1),
			r.apply(this, u)
		}
		return i = n.extend(!0, {
			filter: null,
			columns: [],
			sortStrategy: null,
			onChange: null,
			afterRedraw: null,
			checkValues: null,
			error: !1,
			errmsg: "",
			errorcheck: !0,
			showQuery: !0,
			sopt: null,
			ops: [],
			operands: null,
			numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
			stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
			strarr: ["text", "string", "blob"],
			groupOps: [{
				op: "AND",
				text: "AND"
			},
			{
				op: "OR",
				text: "OR"
			}],
			groupButton: !0,
			ruleButtons: !0,
			direction: "ltr"
		},
		n.jgrid.filter, t || {}),
		this.each(function() {
			var f, t, e, o, h;
			if (!this.filter && (this.p = i, (null === this.p.filter || void 0 === this.p.filter) && (this.p.filter = {
				groupOp: this.p.groupOps[0].op,
				rules: [],
				groups: []
			}), null != this.p.sortStrategy && n.isFunction(this.p.sortStrategy) && this.p.columns.sort(this.p.sortStrategy), e = this.p.columns.length, o = /msie/i.test(navigator.userAgent) && !window.opera, this.p.initFilter = n.extend(!0, {},
			this.p.filter), e)) {
				for (f = 0; e > f; f++) t = this.p.columns[f],
				t.stype ? t.inputtype = t.stype: t.inputtype || (t.inputtype = "text"),
				t.sorttype ? t.searchtype = t.sorttype: t.searchtype || (t.searchtype = "string"),
				void 0 === t.hidden && (t.hidden = !1),
				t.label || (t.label = t.name),
				t.index && (t.name = t.index),
				t.hasOwnProperty("searchoptions") || (t.searchoptions = {}),
				t.hasOwnProperty("searchrules") || (t.searchrules = {});
				var s = function() {
					return n("#" + n.jgrid.jqID(i.id))[0] || null
				},
				c = s(),
				r = n.jgrid.styleUI[c.p.styleUI || "jQueryUI"].filter,
				u = n.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common;
				this.p.showQuery && n(this).append("<table class='queryresult " + r.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'><\/td><\/tr><\/tbody><\/table>");
				h = function(t, r) {
					var u = [!0, ""],
					f = s();
					if (n.isFunction(r.searchrules)) u = r.searchrules.call(f, t, r);
					else if (n.jgrid && n.jgrid.checkValues) try {
						u = n.jgrid.checkValues.call(f, t, -1, r.searchrules, r.label)
					} catch(e) {}
					u && u.length && u[0] === !1 && (i.error = !u[0], i.errmsg = u[1])
				};
				this.onchange = function() {
					return this.p.error = !1,
					this.p.errmsg = "",
					n.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
				};
				this.reDraw = function() {
					n("table.group:first", this).remove();
					var t = this.createTableForGroup(i.filter, null);
					n(this).append(t);
					n.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
				};
				this.createTableForGroup = function(t, f) {
					var e, o = this,
					s = n("<table class='group " + r.table_widget + " ui-search-table' style='border:0px none;'><tbody><\/tbody><\/table>"),
					y = "left",
					p,
					h,
					l,
					g,
					w,
					a,
					c,
					b,
					k,
					v,
					nt,
					d;
					if ("rtl" === this.p.direction && (y = "right", s.attr("dir", "rtl")), null === f && s.append("<tr class='error' style='display:none;'><th colspan='5' class='" + u.error + "' align='" + y + "'><\/th><\/tr>"), p = n("<tr><\/tr>"), s.append(p), h = n("<th colspan='5' align='" + y + "'><\/th>"), p.append(h), this.p.ruleButtons === !0) {
						for (l = n("<select class='opsel " + r.srSelect + "'><\/select>"), h.append(l), w = "", e = 0; e < i.groupOps.length; e++) g = t.groupOp === o.p.groupOps[e].op ? " selected='selected'": "",
						w += "<option value='" + o.p.groupOps[e].op + "'" + g + ">" + o.p.groupOps[e].text + "<\/option>";
						l.append(w).bind("change",
						function() {
							t.groupOp = n(l).val();
							o.onchange()
						})
					}
					if (a = "<span><\/span>", (this.p.groupButton && (a = n("<input type='button' value='+ {}' title='Add subgroup' class='add-group " + u.button + "'/>"), a.bind("click",
					function() {
						return void 0 === t.groups && (t.groups = []),
						t.groups.push({
							groupOp: i.groupOps[0].op,
							rules: [],
							groups: []
						}),
						o.reDraw(),
						o.onchange(),
						!1
					})), h.append(a), this.p.ruleButtons === !0) && (b = n("<input type='button' value='+' title='Add rule' class='add-rule ui-add " + u.button + "'/>"), b.bind("click",
					function() {
						var r;
						for (void 0 === t.rules && (t.rules = []), e = 0; e < o.p.columns.length; e++) {
							var i = void 0 === o.p.columns[e].search ? !0 : o.p.columns[e].search,
							u = o.p.columns[e].hidden === !0,
							f = o.p.columns[e].searchoptions.searchhidden === !0;
							if (f && i || i && !u) {
								c = o.p.columns[e];
								break
							}
						}
						return r = c.searchoptions.sopt ? c.searchoptions.sopt: o.p.sopt ? o.p.sopt: -1 !== n.inArray(c.searchtype, o.p.strarr) ? o.p.stropts: o.p.numopts,
						t.rules.push({
							field: c.name,
							op: r[0],
							data: ""
						}),
						o.reDraw(),
						!1
					}), h.append(b)), null !== f && (k = n("<input type='button' value='-' title='Delete group' class='delete-group " + u.button + "'/>"), h.append(k), k.bind("click",
					function() {
						for (e = 0; e < f.groups.length; e++) if (f.groups[e] === t) {
							f.groups.splice(e, 1);
							break
						}
						return o.reDraw(),
						o.onchange(),
						!1
					})), void 0 !== t.groups) for (e = 0; e < t.groups.length; e++) v = n("<tr><\/tr>"),
					s.append(v),
					nt = n("<td class='first'><\/td>"),
					v.append(nt),
					d = n("<td colspan='4'><\/td>"),
					d.append(this.createTableForGroup(t.groups[e], t)),
					v.append(d);
					if (void 0 === t.groupOp && (t.groupOp = o.p.groupOps[0].op), void 0 !== t.rules) for (e = 0; e < t.rules.length; e++) s.append(this.createTableRowForRule(t.rules[e], t));
					return s
				};
				this.createTableRowForRule = function(t, f) {
					var c, v, l, h, k, e = this,
					y = s(),
					p = n("<tr><\/tr>"),
					d = "",
					tt,
					a,
					g,
					w,
					it,
					rt,
					b,
					nt,
					ut,
					ft,
					et;
					for (p.append("<td class='first'><\/td>"), tt = n("<td class='columns'><\/td>"), p.append(tt), g = n("<select class='" + r.srSelect + "'><\/select>"), w = [], tt.append(g), g.bind("change",
					function() {
						var i, u, f, s;
						for (t.field = n(g).val(), l = n(this).parents("tr:first"), n(".data", l).empty(), c = 0; c < e.p.columns.length; c++) if (e.p.columns[c].name === t.field) {
							h = e.p.columns[c];
							break
						}
						if (h) {
							for (h.searchoptions.id = n.jgrid.randId(), h.searchoptions.name = t.field, h.searchoptions.oper = "filter", o && "text" === h.inputtype && (h.searchoptions.size || (h.searchoptions.size = 10)), i = n.jgrid.createEl.call(y, h.inputtype, h.searchoptions, "", !0, e.p.ajaxSelectOptions || {},
							!0), n(i).addClass("input-elm " + r.srInput), v = h.searchoptions.sopt ? h.searchoptions.sopt: e.p.sopt ? e.p.sopt: -1 !== n.inArray(h.searchtype, e.p.strarr) ? e.p.stropts: e.p.numopts, u = "", f = 0, w = [], n.each(e.p.ops,
							function() {
								w.push(this.oper)
							}), c = 0; c < v.length; c++) a = n.inArray(v[c], w),
							-1 !== a && (0 === f && (t.op = e.p.ops[a].oper), u += "<option value='" + e.p.ops[a].oper + "'>" + e.p.ops[a].text + "<\/option>", f++); (n(".selectopts", l).empty().append(u), n(".selectopts", l)[0].selectedIndex = 0, n.jgrid.msie && n.jgrid.msiever() < 9) && (s = parseInt(n("select.selectopts", l)[0].offsetWidth, 10) + 1, n(".selectopts", l).width(s), n(".selectopts", l).css("width", "auto"));
							n(".data", l).append(i);
							n.jgrid.bindEv.call(y, i, h.searchoptions);
							n(".input-elm", l).bind("change",
							function(i) {
								var r = i.target;
								t.data = "SPAN" === r.nodeName.toUpperCase() && h.searchoptions && n.isFunction(h.searchoptions.custom_value) ? h.searchoptions.custom_value.call(y, n(r).children(".customelement:first"), "get") : r.value;
								e.onchange()
							});
							setTimeout(function() {
								t.data = n(i).val();
								e.onchange()
							},
							0)
						}
					}), it = 0, c = 0; c < e.p.columns.length; c++) {
						var ot = void 0 === e.p.columns[c].search ? !0 : e.p.columns[c].search,
						st = e.p.columns[c].hidden === !0,
						ht = e.p.columns[c].searchoptions.searchhidden === !0; (ht && ot || ot && !st) && (k = "", t.field === e.p.columns[c].name && (k = " selected='selected'", it = c), d += "<option value='" + e.p.columns[c].name + "'" + k + ">" + e.p.columns[c].label + "<\/option>")
					}
					for (g.append(d), rt = n("<td class='operators'><\/td>"), p.append(rt), h = i.columns[it], h.searchoptions.id = n.jgrid.randId(), o && "text" === h.inputtype && (h.searchoptions.size || (h.searchoptions.size = 10)), h.searchoptions.name = t.field, h.searchoptions.oper = "filter", b = n.jgrid.createEl.call(y, h.inputtype, h.searchoptions, t.data, !0, e.p.ajaxSelectOptions || {},
					!0), ("nu" === t.op || "nn" === t.op) && (n(b).attr("readonly", "true"), n(b).attr("disabled", "true")), nt = n("<select class='selectopts " + r.srSelect + "'><\/select>"), rt.append(nt), nt.bind("change",
					function() {
						t.op = n(nt).val();
						l = n(this).parents("tr:first");
						var i = n(".input-elm", l)[0];
						"nu" === t.op || "nn" === t.op ? (t.data = "", "SELECT" !== i.tagName.toUpperCase() && (i.value = ""), i.setAttribute("readonly", "true"), i.setAttribute("disabled", "true")) : ("SELECT" === i.tagName.toUpperCase() && (t.data = i.value), i.removeAttribute("readonly"), i.removeAttribute("disabled"));
						e.onchange()
					}), v = h.searchoptions.sopt ? h.searchoptions.sopt: e.p.sopt ? e.p.sopt: -1 !== n.inArray(h.searchtype, e.p.strarr) ? e.p.stropts: e.p.numopts, d = "", n.each(e.p.ops,
					function() {
						w.push(this.oper)
					}), c = 0; c < v.length; c++) a = n.inArray(v[c], w),
					-1 !== a && (k = t.op === e.p.ops[a].oper ? " selected='selected'": "", d += "<option value='" + e.p.ops[a].oper + "'" + k + ">" + e.p.ops[a].text + "<\/option>");
					return nt.append(d),
					ut = n("<td class='data'><\/td>"),
					p.append(ut),
					ut.append(b),
					n.jgrid.bindEv.call(y, b, h.searchoptions),
					n(b).addClass("input-elm " + r.srInput).bind("change",
					function() {
						t.data = "custom" === h.inputtype ? h.searchoptions.custom_value.call(y, n(this).children(".customelement:first"), "get") : n(this).val();
						e.onchange()
					}),
					ft = n("<td><\/td>"),
					(p.append(ft), this.p.ruleButtons === !0) && (et = n("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del " + u.button + "'/>"), ft.append(et), et.bind("click",
					function() {
						for (c = 0; c < f.rules.length; c++) if (f.rules[c] === t) {
							f.rules.splice(c, 1);
							break
						}
						return e.reDraw(),
						e.onchange(),
						!1
					})),
					p
				};
				this.getStringForGroup = function(n) {
					var i, t = "(";
					if (void 0 !== n.groups) for (i = 0; i < n.groups.length; i++) {
						t.length > 1 && (t += " " + n.groupOp + " ");
						try {
							t += this.getStringForGroup(n.groups[i])
						} catch(r) {
							alert(r)
						}
					}
					if (void 0 !== n.rules) try {
						for (i = 0; i < n.rules.length; i++) t.length > 1 && (t += " " + n.groupOp + " "),
						t += this.getStringForRule(n.rules[i])
					} catch(u) {
						alert(u)
					}
					return t += ")",
					"()" === t ? "": t
				};
				this.getStringForRule = function(t) {
					for (var e, s, f, o = "",
					r = "",
					u = 0; u < this.p.ops.length; u++) if (this.p.ops[u].oper === t.op) {
						o = this.p.operands.hasOwnProperty(t.op) ? this.p.operands[t.op] : "";
						r = this.p.ops[u].oper;
						break
					}
					for (u = 0; u < this.p.columns.length; u++) if (this.p.columns[u].name === t.field) {
						e = this.p.columns[u];
						break
					}
					return void 0 === e ? "": (f = t.data, ("bw" === r || "bn" === r) && (f += "%"), ("ew" === r || "en" === r) && (f = "%" + f), ("cn" === r || "nc" === r) && (f = "%" + f + "%"), ("in" === r || "ni" === r) && (f = " (" + f + ")"), i.errorcheck && h(t.data, e), s = -1 !== n.inArray(e.searchtype, ["int", "integer", "float", "number", "currency"]) || "nn" === r || "nu" === r ? t.field + " " + o + " " + f: t.field + " " + o + ' "' + f + '"')
				};
				this.resetFilter = function() {
					this.p.filter = n.extend(!0, {},
					this.p.initFilter);
					this.reDraw();
					this.onchange()
				};
				this.hideError = function() {
					n("th." + u.error, this).html("");
					n("tr.error", this).hide()
				};
				this.showError = function() {
					n("th." + u.error, this).html(this.p.errmsg);
					n("tr.error", this).show()
				};
				this.toUserFriendlyString = function() {
					return this.getStringForGroup(i.filter)
				};
				this.toString = function() {
					function i(t) {
						if (n.p.errorcheck) {
							for (var r, i = 0; i < n.p.columns.length; i++) if (n.p.columns[i].name === t.field) {
								r = n.p.columns[i];
								break
							}
							r && h(t.data, r)
						}
						return t.op + "(item." + t.field + ",'" + t.data + "')"
					}
					function t(n) {
						var u, r = "(";
						if (void 0 !== n.groups) for (u = 0; u < n.groups.length; u++) r.length > 1 && (r += "OR" === n.groupOp ? " || ": " && "),
						r += t(n.groups[u]);
						if (void 0 !== n.rules) for (u = 0; u < n.rules.length; u++) r.length > 1 && (r += "OR" === n.groupOp ? " || ": " && "),
						r += i(n.rules[u]);
						return r += ")",
						"()" === r ? "": r
					}
					var n = this;
					return t(this.p.filter)
				};
				this.reDraw();
				this.p.showQuery && this.onchange();
				this.filter = !0
			}
		})
	};
	n.extend(n.fn.jqFilter, {
		toSQLString: function() {
			var n = "";
			return this.each(function() {
				n = this.toUserFriendlyString()
			}),
			n
		},
		filterData: function() {
			var n;
			return this.each(function() {
				n = this.p.filter
			}),
			n
		},
		getParameter: function(n) {
			return void 0 !== n && this.p.hasOwnProperty(n) ? this.p[n] : this.p
		},
		resetFilter: function() {
			return this.each(function() {
				this.resetFilter()
			})
		},
		addFilter: function(t) {
			"string" == typeof t && (t = n.jgrid.parse(t));
			this.each(function() {
				this.p.filter = t;
				this.reDraw();
				this.onchange()
			})
		}
	});
	n.jgrid.extend({
		filterToolbar: function(t) {
			var i = n.jgrid.getRegional(this[0], "search");
			return t = n.extend({
				autosearch: !0,
				autosearchDelay: 500,
				searchOnEnter: !0,
				beforeSearch: null,
				afterSearch: null,
				beforeClear: null,
				afterClear: null,
				searchurl: "",
				stringResult: !1,
				groupOp: "AND",
				defaultSearch: "bw",
				searchOperators: !1,
				resetIcon: "x",
				operands: {
					eq: "==",
					ne: "!",
					lt: "<",
					le: "<=",
					gt: ">",
					ge: ">=",
					bw: "^",
					bn: "!^",
					"in": "=",
					ni: "!=",
					ew: "|",
					en: "!@",
					cn: "~",
					nc: "!~",
					nu: "#",
					nn: "!#"
				}
			},
			i, t || {}),
			this.each(function() {
				var r = this;
				if (!r.p.filterToolbar) {
					n(r).data("filterToolbar") || n(r).data("filterToolbar", t);
					r.p.force_regional && (t = n.extend(t, i));
					var o, s = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].filter,
					f = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].common,
					h = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].base,
					u = function() {
						var o, u, f, s = {},
						l = 0,
						a = {},
						v, i, h, c, e;
						n.each(r.p.colModel,
						function() {
							var i = n("#gs_" + r.p.idPrefix + n.jgrid.jqID(this.name), this.frozen === !0 && r.p.frozenColumns === !0 ? r.grid.fhDiv: r.grid.hDiv);
							if (u = this.index || this.name, f = t.searchOperators ? i.parent().prev().children("a").attr("soper") || t.defaultSearch: this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq": t.defaultSearch, o = "custom" === this.stype && n.isFunction(this.searchoptions.custom_value) && i.length > 0 && "SPAN" === i[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(r, i.children(".customelement:first"), "get") : i.val(), o || "nu" === f || "nn" === f) s[u] = o,
							a[u] = f,
							l++;
							else try {
								delete r.p.postData[u]
							} catch(e) {}
						});
						v = l > 0 ? !0 : !1;
						t.stringResult === !0 || "local" === r.p.datatype || t.searchOperators === !0 ? (i = '{"groupOp":"' + t.groupOp + '","rules":[', h = 0, n.each(s,
						function(n, t) {
							h > 0 && (i += ",");
							i += '{"field":"' + n + '",';
							i += '"op":"' + a[n] + '",';
							t += "";
							i += '"data":"' + t.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
							h++
						}), i += "]}", n.extend(r.p.postData, {
							filters: i
						}), n.each(["searchField", "searchString", "searchOper"],
						function(n, t) {
							r.p.postData.hasOwnProperty(t) && delete r.p.postData[t]
						})) : n.extend(r.p.postData, s);
						r.p.searchurl && (c = r.p.url, n(r).jqGrid("setGridParam", {
							url: r.p.searchurl
						}));
						e = "stop" === n(r).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1; ! e && n.isFunction(t.beforeSearch) && (e = t.beforeSearch.call(r));
						e || n(r).jqGrid("setGridParam", {
							search: v
						}).trigger("reloadGrid", [{
							page: 1
						}]);
						c && n(r).jqGrid("setGridParam", {
							url: c
						});
						n(r).triggerHandler("jqGridToolbarAfterSearch");
						n.isFunction(t.afterSearch) && t.afterSearch.call(r)
					},
					c = function(i) {
						var f, e = {},
						s = 0,
						l, u, h, c, o;
						i = "boolean" != typeof i ? !0 : i;
						n.each(r.p.colModel,
						function() {
							var t, i = n("#gs_" + r.p.idPrefix + n.jgrid.jqID(this.name), this.frozen === !0 && r.p.frozenColumns === !0 ? r.grid.fhDiv: r.grid.hDiv);
							switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (t = this.searchoptions.defaultValue), f = this.index || this.name, this.stype) {
							case "select":
								if (i.find("option").each(function(i) {
									return 0 === i && (this.selected = !0),
									n(this).val() === t ? (this.selected = !0, !1) : void 0
								}), void 0 !== t) e[f] = t,
								s++;
								else try {
									delete r.p.postData[f]
								} catch(u) {}
								break;
							case "text":
								if (i.val(t || ""), void 0 !== t) e[f] = t,
								s++;
								else try {
									delete r.p.postData[f]
								} catch(o) {}
								break;
							case "custom":
								n.isFunction(this.searchoptions.custom_value) && i.length > 0 && "SPAN" === i[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(r, i.children(".customelement:first"), "set", t || "")
							}
						});
						l = s > 0 ? !0 : !1; (r.p.resetsearch = !0, t.stringResult === !0 || "local" === r.p.datatype) ? (u = '{"groupOp":"' + t.groupOp + '","rules":[', h = 0, n.each(e,
						function(n, t) {
							h > 0 && (u += ",");
							u += '{"field":"' + n + '",';
							u += '"op":"eq",';
							t += "";
							u += '"data":"' + t.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
							h++
						}), u += "]}", n.extend(r.p.postData, {
							filters: u
						}), n.each(["searchField", "searchString", "searchOper"],
						function(n, t) {
							r.p.postData.hasOwnProperty(t) && delete r.p.postData[t]
						})) : n.extend(r.p.postData, e);
						r.p.searchurl && (c = r.p.url, n(r).jqGrid("setGridParam", {
							url: r.p.searchurl
						}));
						o = "stop" === n(r).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1; ! o && n.isFunction(t.beforeClear) && (o = t.beforeClear.call(r));
						o || i && n(r).jqGrid("setGridParam", {
							search: l
						}).trigger("reloadGrid", [{
							page: 1
						}]);
						c && n(r).jqGrid("setGridParam", {
							url: c
						});
						n(r).triggerHandler("jqGridToolbarAfterClear");
						n.isFunction(t.afterClear) && t.afterClear()
					},
					l = function() {
						var i = n("tr.ui-search-toolbar", r.grid.hDiv),
						t = r.p.frozenColumns === !0 ? n("tr.ui-search-toolbar", r.grid.fhDiv) : !1;
						"none" === i.css("display") ? (i.show(), t && t.show()) : (i.hide(), t && t.hide())
					},
					a = function(i, e, o) {
						var v, l;
						n("#sopt_menu").remove();
						e = parseInt(e, 10);
						o = parseInt(o, 10) + 18;
						for (var y, c, w = n(".ui-jqgrid-view").css("font-size") || "11px", a = '<ul id="sopt_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="font-size:' + w + ";left:" + e + "px;top:" + o + 'px;">', b = n(i).attr("soper"), p = [], h = 0, k = n(i).attr("colname"), d = r.p.colModel.length; d > h && r.p.colModel[h].name !== k;) h++;
						for (v = r.p.colModel[h], l = n.extend({},
						v.searchoptions), l.sopt || (l.sopt = [], l.sopt[0] = "select" === v.stype ? "eq": t.defaultSearch), n.each(t.odata,
						function() {
							p.push(this.oper)
						}), h = 0; h < l.sopt.length; h++) c = n.inArray(l.sopt[h], p),
						-1 !== c && (y = b === t.odata[c].oper ? f.highlight: "", a += '<li class="ui-menu-item ' + y + '" role="presentation"><a class="' + f.cornerall + ' g-menu-item" tabindex="0" role="menuitem" value="' + t.odata[c].oper + '" oper="' + t.operands[t.odata[c].oper] + '"><table class="ui-common-table"><tr><td width="25px">' + t.operands[t.odata[c].oper] + "<\/td><td>" + t.odata[c].text + "<\/td><\/tr><\/table><\/a><\/li>");
						a += "<\/ul>";
						n("body").append(a);
						n("#sopt_menu").addClass("ui-menu " + s.menu_widget);
						n("#sopt_menu > li > a").hover(function() {
							n(this).addClass(f.hover)
						},
						function() {
							n(this).removeClass(f.hover)
						}).click(function() {
							var f = n(this).attr("value"),
							e = n(this).attr("oper"),
							o; (n(r).triggerHandler("jqGridToolbarSelectOper", [f, e, i]), n("#sopt_menu").hide(), n(i).text(e).attr("soper", f), t.autosearch === !0) && (o = n(i).parent().next().children()[0], (n(o).val() || "nu" === f || "nn" === f) && u())
						})
					},
					e = n("<tr class='ui-search-toolbar' role='row'><\/tr>");
					n.each(r.p.colModel,
					function(i) {
						var f, a, v, b, k, p, y, l = this,
						d = "",
						g = "=",
						w = n("<th role='columnheader' class='" + h.headerBox + " ui-th-" + r.p.direction + "' id='gsh_" + r.p.id + "_" + l.name + "' ><\/th>"),
						nt = n("<div><\/div>"),
						c = n("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''><\/td><td class='ui-search-input' headers=''><\/td><td class='ui-search-clear' headers=''><\/td><\/tr><\/table>");
						if (this.hidden === !0 && n(w).css("display", "none"), this.search = this.search === !1 ? !1 : !0, void 0 === this.stype && (this.stype = "text"), f = n.extend({},
						this.searchoptions || {},
						{
							name: l.index || l.name,
							id: "gs_" + r.p.idPrefix + l.name,
							oper: "search"
						}), this.search) {
							if (t.searchOperators) {
								for (a = f.sopt ? f.sopt[0] : "select" === l.stype ? "eq": t.defaultSearch, v = 0; v < t.odata.length; v++) if (t.odata[v].oper === a) {
									g = t.operands[a] || "";
									break
								}
								b = null != f.searchtitle ? f.searchtitle: t.operandTitle;
								d = "<a title='" + b + "' style='padding-right: 0.5em;' soper='" + a + "' class='soptclass' colname='" + this.name + "'>" + g + "<\/a>"
							}
							switch (n("td:eq(0)", c).attr("colindex", i).append(d), void 0 === f.clearSearch && (f.clearSearch = !0), f.clearSearch ? (k = t.resetTitle || "Clear Search Value", n("td:eq(2)", c).append("<a title='" + k + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + t.resetIcon + "<\/a>")) : n("td:eq(2)", c).hide(), this.surl && (f.dataUrl = this.surl), p = "", f.defaultValue && (p = n.isFunction(f.defaultValue) ? f.defaultValue.call(r) : f.defaultValue), y = n.jgrid.createEl.call(r, this.stype, f, p, !1, n.extend({},
							n.jgrid.ajaxOptions, r.p.ajaxSelectOptions || {})), n(y).css({
								width: "100%"
							}).addClass(s.srInput), n("td:eq(1)", c).append(y), n(nt).append(c), this.stype) {
							case "select":
								t.autosearch === !0 && (f.dataEvents = [{
									type: "change",
									fn: function() {
										return u(),
										!1
									}
								}]);
								break;
							case "text":
								t.autosearch === !0 && (f.dataEvents = t.searchOnEnter ? [{
									type: "keypress",
									fn: function(n) {
										var t = n.charCode || n.keyCode || 0;
										return 13 === t ? (u(), !1) : this
									}
								}] : [{
									type: "keydown",
									fn: function(n) {
										var i = n.which;
										switch (i) {
										case 13:
											return ! 1;
										case 9:
										case 16:
										case 37:
										case 38:
										case 39:
										case 40:
										case 27:
											break;
										default:
											o && clearTimeout(o);
											o = setTimeout(function() {
												u()
											},
											t.autosearchDelay)
										}
									}
								}])
							}
							n.jgrid.bindEv.call(r, y, f)
						}
						n(w).append(nt);
						n(e).append(w);
						t.searchOperators || n("td:eq(0)", c).hide()
					});
					n("table thead", r.grid.hDiv).append(e);
					t.searchOperators && (n(".soptclass", e).click(function(t) {
						var i = n(this).offset(),
						r = i.left,
						u = i.top;
						a(this, r, u);
						t.stopPropagation()
					}), n("body").on("click",
					function(t) {
						"soptclass" !== t.target.className && n("#sopt_menu").hide()
					}));
					n(".clearsearchclass", e).click(function() {
						var i = n(this).parents("tr:first"),
						e = parseInt(n("td.ui-search-oper", i).attr("colindex"), 10),
						o = n.extend({},
						r.p.colModel[e].searchoptions || {}),
						f = o.defaultValue ? o.defaultValue: "";
						"select" === r.p.colModel[e].stype ? f ? n("td.ui-search-input select", i).val(f) : n("td.ui-search-input select", i)[0].selectedIndex = 0 : n("td.ui-search-input input", i).val(f);
						t.autosearch === !0 && u()
					});
					this.p.filterToolbar = !0;
					this.triggerToolbar = u;
					this.clearToolbar = c;
					this.toggleToolbar = l
				}
			})
		},
		destroyFilterToolbar: function() {
			return this.each(function() {
				this.p.filterToolbar && (this.triggerToolbar = null, this.clearToolbar = null, this.toggleToolbar = null, this.p.filterToolbar = !1, n(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
			})
		},
		searchGrid: function(t) {
			var i = n.jgrid.getRegional(this[0], "search");
			return t = n.extend(!0, {
				recreateFilter: !1,
				drag: !0,
				sField: "searchField",
				sValue: "searchString",
				sOper: "searchOper",
				sFilter: "filters",
				loadDefaults: !0,
				beforeShowSearch: null,
				afterShowSearch: null,
				onInitializeSearch: null,
				afterRedraw: null,
				afterChange: null,
				sortStrategy: null,
				closeAfterSearch: !1,
				closeAfterReset: !1,
				closeOnEscape: !1,
				searchOnEnter: !1,
				multipleSearch: !1,
				multipleGroup: !1,
				top: 0,
				left: 0,
				jqModal: !0,
				modal: !1,
				resize: !0,
				width: 450,
				height: "auto",
				dataheight: "auto",
				showQuery: !1,
				errorcheck: !0,
				sopt: null,
				stringResult: void 0,
				onClose: null,
				onSearch: null,
				onReset: null,
				toTop: !0,
				overlay: 30,
				columns: [],
				tmplNames: null,
				tmplFilters: null,
				tmplLabel: " Template: ",
				showOnLoad: !1,
				layer: null,
				operands: {
					eq: "=",
					ne: "<>",
					lt: "<",
					le: "<=",
					gt: ">",
					ge: ">=",
					bw: "LIKE",
					bn: "NOT LIKE",
					"in": "IN",
					ni: "NOT IN",
					ew: "LIKE",
					en: "NOT LIKE",
					cn: "LIKE",
					nc: "NOT LIKE",
					nu: "IS NULL",
					nn: "ISNOT NULL"
				}
			},
			i, t || {}),
			this.each(function() {
				function d(u) {
					l = n(i).triggerHandler("jqGridFilterBeforeShow", [u]);
					void 0 === l && (l = !0);
					l && n.isFunction(t.beforeShowSearch) && (l = t.beforeShowSearch.call(i, u));
					l && (n.jgrid.viewModal("#" + n.jgrid.jqID(e.themodal), {
						gbox: "#gbox_" + n.jgrid.jqID(r),
						jqm: t.jqModal,
						modal: t.modal,
						overlay: t.overlay,
						toTop: t.toTop
					}), n(i).triggerHandler("jqGridFilterAfterShow", [u]), n.isFunction(t.afterShowSearch) && t.afterShowSearch.call(i, u))
				}
				var i = this,
				b;
				if (i.grid) {
					var h, r = "fbox_" + i.p.id,
					l = !0,
					u = !0,
					e = {
						themodal: "searchmod" + r,
						modalhead: "searchhd" + r,
						modalcontent: "searchcnt" + r,
						scrollelm: r
					},
					c = i.p.postData[t.sFilter],
					p = n.jgrid.styleUI[i.p.styleUI || "jQueryUI"].filter,
					f = n.jgrid.styleUI[i.p.styleUI || "jQueryUI"].common;
					if (t.styleUI = i.p.styleUI, "string" == typeof c && (c = n.jgrid.parse(c)), t.recreateFilter === !0 && n("#" + n.jgrid.jqID(e.themodal)).remove(), void 0 !== n("#" + n.jgrid.jqID(e.themodal))[0]) d(n("#fbox_" + n.jgrid.jqID(i.p.id)));
					else {
						var o = n("<div><div id='" + r + "' class='searchFilter' style='overflow:auto'><\/div><\/div>").insertBefore("#gview_" + n.jgrid.jqID(i.p.id)),
						g = "left",
						nt = "";
						"rtl" === i.p.direction && (g = "right", nt = " style='text-align:left'", o.attr("dir", "rtl"));
						var w, tt, s = n.extend([], i.p.colModel),
						it = "<a id='" + r + "_search' class='fm-button " + f.button + " fm-button-icon-right ui-search'><span class='" + f.icon_base + " " + p.icon_search + "'><\/span>" + t.Find + "<\/a>",
						rt = "<a id='" + r + "_reset' class='fm-button " + f.button + " fm-button-icon-left ui-reset'><span class='" + f.icon_base + " " + p.icon_reset + "'><\/span>" + t.Reset + "<\/a>",
						k = "",
						a = "",
						v = !1,
						y = -1; (t.showQuery && (k = "<a id='" + r + "_query' class='fm-button " + f.button + " fm-button-icon-left'><span class='" + f.icon_base + " " + p.icon_query + "'><\/span>Query<\/a>"), t.columns.length ? (s = t.columns, y = 0, w = s[0].index || s[0].name) : n.each(s,
						function(n, t) {
							if (t.label || (t.label = i.p.colNames[n]), !v) {
								var r = void 0 === t.search ? !0 : t.search,
								u = t.hidden === !0,
								f = t.searchoptions && t.searchoptions.searchhidden === !0; (f && r || r && !u) && (v = !0, w = t.index || t.name, y = n)
							}
						}), !c && w || t.multipleSearch === !1) && (b = "eq", y >= 0 && s[y].searchoptions && s[y].searchoptions.sopt ? b = s[y].searchoptions.sopt[0] : t.sopt && t.sopt.length && (b = t.sopt[0]), c = {
							groupOp: "AND",
							rules: [{
								field: w,
								op: b,
								data: ""
							}]
						});
						v = !1;
						t.tmplNames && t.tmplNames.length && (v = !0, a = "<tr><td class='ui-search-label'>" + t.tmplLabel + "<\/td>", a += "<td><select class='ui-template " + p.srSelect + "'>", a += "<option value='default'>Default<\/option>", n.each(t.tmplNames,
						function(n, t) {
							a += "<option value='" + n + "'>" + t + "<\/option>"
						}), a += "<\/select><\/td><\/tr>");
						tt = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + r + "_2'><tbody><tr><td colspan='2'><hr class='" + f.content + "' style='margin:1px'/><\/td><\/tr>" + a + "<tr><td class='EditButton' style='text-align:" + g + "'>" + rt + "<\/td><td class='EditButton' " + nt + ">" + k + it + "<\/td><\/tr><\/tbody><\/table>";
						r = n.jgrid.jqID(r);
						n("#" + r).jqFilter({
							columns: s,
							sortStrategy: t.sortStrategy,
							filter: t.loadDefaults ? c: null,
							showQuery: t.showQuery,
							errorcheck: t.errorcheck,
							sopt: t.sopt,
							groupButton: t.multipleGroup,
							ruleButtons: t.multipleSearch,
							afterRedraw: t.afterRedraw,
							ops: t.odata,
							operands: t.operands,
							ajaxSelectOptions: i.p.ajaxSelectOptions,
							groupOps: t.groupOps,
							onChange: function() {
								this.p.showQuery && n(".query", this).html(this.toUserFriendlyString());
								n.isFunction(t.afterChange) && t.afterChange.call(i, n("#" + r), t)
							},
							direction: i.p.direction,
							id: i.p.id
						});
						o.append(tt);
						v && t.tmplFilters && t.tmplFilters.length && n(".ui-template", o).bind("change",
						function() {
							var i = n(this).val();
							return "default" === i ? n("#" + r).jqFilter("addFilter", c) : n("#" + r).jqFilter("addFilter", t.tmplFilters[parseInt(i, 10)]),
							!1
						});
						t.multipleGroup === !0 && (t.multipleSearch = !0);
						n(i).triggerHandler("jqGridFilterInitialize", [n("#" + r)]);
						n.isFunction(t.onInitializeSearch) && t.onInitializeSearch.call(i, n("#" + r));
						t.gbox = "#gbox_" + r;
						t.layer ? n.jgrid.createModal(e, o, t, "#gview_" + n.jgrid.jqID(i.p.id), n("#gbox_" + n.jgrid.jqID(i.p.id))[0], "#" + n.jgrid.jqID(t.layer), {
							position: "relative"
						}) : n.jgrid.createModal(e, o, t, "#gview_" + n.jgrid.jqID(i.p.id), n("#gbox_" + n.jgrid.jqID(i.p.id))[0]); (t.searchOnEnter || t.closeOnEscape) && n("#" + n.jgrid.jqID(e.themodal)).keydown(function(i) {
							var u = n(i.target);
							return ! t.searchOnEnter || 13 !== i.which || u.hasClass("add-group") || u.hasClass("add-rule") || u.hasClass("delete-group") || u.hasClass("delete-rule") || u.hasClass("fm-button") && u.is("[id$=_query]") ? t.closeOnEscape && 27 === i.which ? (n("#" + n.jgrid.jqID(e.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1) : void 0 : (n("#" + r + "_search").click(), !1)
						});
						k && n("#" + r + "_query").bind("click",
						function() {
							return n(".queryresult", o).toggle(),
							!1
						});
						void 0 === t.stringResult && (t.stringResult = t.multipleSearch);
						n("#" + r + "_search").bind("click",
						function() {
							var s, o, f = {};
							if (h = n("#" + r), h.find(".input-elm:focus").change(), o = h.jqFilter("filterData"), t.errorcheck && (h[0].hideError(), t.showQuery || h.jqFilter("toSQLString"), h[0].p.error)) return h[0].showError(),
							!1;
							if (t.stringResult) {
								try {
									s = JSON.stringify(o)
								} catch(c) {}
								"string" == typeof s && (f[t.sFilter] = s, n.each([t.sField, t.sValue, t.sOper],
								function() {
									f[this] = ""
								}))
							} else t.multipleSearch ? (f[t.sFilter] = o, n.each([t.sField, t.sValue, t.sOper],
							function() {
								f[this] = ""
							})) : (f[t.sField] = o.rules[0].field, f[t.sValue] = o.rules[0].data, f[t.sOper] = o.rules[0].op, f[t.sFilter] = "");
							return i.p.search = !0,
							n.extend(i.p.postData, f),
							u = n(i).triggerHandler("jqGridFilterSearch"),
							void 0 === u && (u = !0),
							u && n.isFunction(t.onSearch) && (u = t.onSearch.call(i, i.p.filters)),
							u !== !1 && n(i).trigger("reloadGrid", [{
								page: 1
							}]),
							t.closeAfterSearch && n.jgrid.hideModal("#" + n.jgrid.jqID(e.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(i.p.id),
								jqm: t.jqModal,
								onClose: t.onClose
							}),
							!1
						});
						n("#" + r + "_reset").bind("click",
						function() {
							var f = {},
							s = n("#" + r);
							return i.p.search = !1,
							i.p.resetsearch = !0,
							t.multipleSearch === !1 ? f[t.sField] = f[t.sValue] = f[t.sOper] = "": f[t.sFilter] = "",
							s[0].resetFilter(),
							v && n(".ui-template", o).val("default"),
							n.extend(i.p.postData, f),
							u = n(i).triggerHandler("jqGridFilterReset"),
							void 0 === u && (u = !0),
							u && n.isFunction(t.onReset) && (u = t.onReset.call(i)),
							u !== !1 && n(i).trigger("reloadGrid", [{
								page: 1
							}]),
							t.closeAfterReset && n.jgrid.hideModal("#" + n.jgrid.jqID(e.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(i.p.id),
								jqm: t.jqModal,
								onClose: t.onClose
							}),
							!1
						});
						d(n("#" + r));
						n(".fm-button:not(." + f.disabled + ")", o).hover(function() {
							n(this).addClass(f.hover)
						},
						function() {
							n(this).removeClass(f.hover)
						})
					}
				}
			})
		}
	});
	t = {}; (n.jgrid.extend({
		editGridRow: function(i, r) {
			var o = n.jgrid.getRegional(this[0], "edit"),
			e = this[0].p.styleUI,
			f = n.jgrid.styleUI[e].formedit,
			u = n.jgrid.styleUI[e].common;
			return r = n.extend(!0, {
				top: 0,
				left: 0,
				width: "500",
				datawidth: "auto",
				height: "auto",
				dataheight: "auto",
				modal: !1,
				overlay: 30,
				drag: !0,
				resize: !0,
				url: null,
				mtype: "POST",
				clearAfterAdd: !0,
				closeAfterEdit: !1,
				reloadAfterSubmit: !0,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons: null,
				afterclickPgButtons: null,
				editData: {},
				recreateForm: !1,
				jqModal: !0,
				closeOnEscape: !1,
				addedrow: "first",
				topinfo: "",
				bottominfo: "",
				saveicon: [],
				closeicon: [],
				savekey: [!1, 13],
				navkeys: [!1, 38, 40],
				checkOnSubmit: !1,
				checkOnUpdate: !1,
				_savedData: {},
				processing: !1,
				onClose: null,
				ajaxEditOptions: {},
				serializeEditData: null,
				viewPagerButtons: !0,
				overlayClass: u.overlay,
				removemodal: !0,
				form: "edit",
				template: null,
				focusField: !0
			},
			o, r || {}),
			t[n(this)[0].p.id] = r,
			this.each(function() {
				function dt() {
					return n(y).find(".FormElement").each(function() {
						var r = n(".customelement", this),
						u,
						i,
						f,
						s;
						if (r.length) u = r[0],
						i = n(u).attr("name"),
						n.each(e.p.colModel,
						function() {
							if (this.name === i && this.editoptions && n.isFunction(this.editoptions.custom_value)) {
								try {
									if (o[i] = this.editoptions.custom_value.call(e, n("#" + n.jgrid.jqID(i), y), "get"), void 0 === o[i]) throw "e1";
								} catch(r) {
									"e1" === r ? n.jgrid.info_dialog(k.errcap, "function 'custom_value' " + t[n(this)[0]].p.msg.novalue, t[n(this)[0]].p.bClose, {
										styleUI: t[n(this)[0]].p.styleUI
									}) : n.jgrid.info_dialog(k.errcap, r.message, t[n(this)[0]].p.bClose, {
										styleUI: t[n(this)[0]].p.styleUI
									})
								}
								return ! 0
							}
						});
						else {
							switch (n(this).get(0).type) {
							case "checkbox":
								n(this).is(":checked") ? o[this.name] = n(this).val() : (f = n(this).attr("offval"), o[this.name] = f);
								break;
							case "select-one":
								o[this.name] = n("option:selected", this).val();
								break;
							case "select-multiple":
								o[this.name] = n(this).val();
								o[this.name] = o[this.name] ? o[this.name].join(",") : "";
								s = [];
								n("option:selected", this).each(function(t, i) {
									s[t] = n(i).text()
								});
								break;
							case "password":
							case "text":
							case "textarea":
							case "button":
								o[this.name] = n(this).val()
							}
							e.p.autoencode && (o[this.name] = n.jgrid.htmlEncode(o[this.name]))
						}
					}),
					!0
				}
				function ni(i, r, u, o) {
					for (var c, k, a, h, d, l, p = 0,
					g = [], y = !1, nt = "", w, b = 1; o >= b; b++) nt += "<td class='CaptionTD'>&#160;<\/td><td class='DataTD'>&#160;<\/td>";
					return ("_empty" !== i && (y = n(r).jqGrid("getInd", i)), n(r.p.colModel).each(function(w) {
						var ut;
						if (c = this.name, k = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, d = k ? "style='display:none'": "", "cb" !== c && "subgrid" !== c && this.editable === !0 && "rn" !== c) {
							if (y === !1) h = "";
							else if (c === r.p.ExpandColumn && r.p.treeGrid === !0) h = n("td[role='gridcell']:eq(" + w + ")", r.rows[y]).text();
							else {
								try {
									h = n.unformat.call(r, n("td[role='gridcell']:eq(" + w + ")", r.rows[y]), {
										rowId: i,
										colModel: this
									},
									w)
								} catch(et) {
									h = this.edittype && "textarea" === this.edittype ? n("td[role='gridcell']:eq(" + w + ")", r.rows[y]).text() : n("td[role='gridcell']:eq(" + w + ")", r.rows[y]).html()
								}
								h && "&nbsp;" !== h && "&#160;" !== h && (1 !== h.length || 160 !== h.charCodeAt(0)) || (h = "")
							}
							var b = n.extend({},
							this.editoptions || {},
							{
								id: c,
								name: c,
								rowId: i,
								oper: "edit"
							}),
							tt = n.extend({},
							{
								elmprefix: "",
								elmsuffix: "",
								rowabove: !1,
								rowcontent: ""
							},
							this.formoptions || {}),
							rt = parseInt(tt.rowpos, 10) || p + 1,
							ft = parseInt(2 * (parseInt(tt.colpos, 10) || 1), 10); ("_empty" === i && b.defaultValue && (h = n.isFunction(b.defaultValue) ? b.defaultValue.call(e) : b.defaultValue), this.edittype || (this.edittype = "text"), e.p.autoencode && (h = n.jgrid.htmlDecode(h)), l = n.jgrid.createEl.call(e, this.edittype, b, h, !1, n.extend({},
							n.jgrid.ajaxOptions, r.p.ajaxSelectOptions || {})), "select" === this.edittype && (h = n(l).val(), "select-multiple" === n(l).get(0).type && h && (h = h.join(","))), "checkbox" === this.edittype && (h = n(l).is(":checked") ? n(l).val() : n(l).attr("offval")), (t[e.p.id].checkOnSubmit || t[e.p.id].checkOnUpdate) && (t[e.p.id]._savedData[c] = h), n(l).addClass("FormElement"), n.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && n(l).addClass(f.inputClass), it) ? n(v).find("#" + c).replaceWith(l) : ((a = n(u).find("tr[rowpos=" + rt + "]"), tt.rowabove) && (ut = n("<tr><td class='contentinfo' colspan='" + 2 * o + "'>" + tt.rowcontent + "<\/td><\/tr>"), n(u).append(ut), ut[0].rp = rt), 0 === a.length && (a = n("<tr " + d + " rowpos='" + rt + "'><\/tr>").addClass("FormData").attr("id", "tr_" + c), n(a).append(nt), n(u).append(a), a[0].rp = rt), n("td:eq(" + (ft - 2) + ")", a[0]).html("<label for='" + c + "'>" + (void 0 === tt.label ? r.p.colNames[w] : tt.label) + "<\/label>"), n("td:eq(" + (ft - 1) + ")", a[0]).append(tt.elmprefix).append(l).append(tt.elmsuffix));
							"custom" === this.edittype && n.isFunction(b.custom_value) && b.custom_value.call(e, n("#" + c, s), "set", h);
							n.jgrid.bindEv.call(e, l, b);
							g[p] = w;
							p++
						}
					}), p > 0) && (it ? (w = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='" + r.p.id + "_id' value='" + i + "'/>", n(v).append(w)) : (w = n("<tr class='FormData' style='display:none'><td class='CaptionTD'><\/td><td colspan='" + (2 * o - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + r.p.id + "_id' value='" + i + "'/><\/td><\/tr>"), w[0].rp = p + 999, n(u).append(w)), (t[e.p.id].checkOnSubmit || t[e.p.id].checkOnUpdate) && (t[e.p.id]._savedData[r.p.id + "_id"] = i)),
					g
				}
				function ht(i, r, u) {
					var o, f, s, l, c, a, p = 0,
					h, v;
					if ((t[e.p.id].checkOnSubmit || t[e.p.id].checkOnUpdate) && (t[e.p.id]._savedData = {},
					t[e.p.id]._savedData[r.p.id + "_id"] = i), h = r.p.colModel, "_empty" === i) return n(h).each(function() {
						o = this.name;
						l = n.extend({},
						this.editoptions || {});
						s = n("#" + n.jgrid.jqID(o), u);
						s && s.length && null !== s[0] && (c = "", "custom" === this.edittype && n.isFunction(l.custom_value) ? l.custom_value.call(e, n("#" + o, u), "set", c) : l.defaultValue ? (c = n.isFunction(l.defaultValue) ? l.defaultValue.call(e) : l.defaultValue, "checkbox" === s[0].type ? (a = c.toLowerCase(), a.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== a ? (s[0].checked = !0, s[0].defaultChecked = !0, s[0].value = c) : (s[0].checked = !1, s[0].defaultChecked = !1)) : s.val(c)) : "checkbox" === s[0].type ? (s[0].checked = !1, s[0].defaultChecked = !1, c = n(s).attr("offval")) : s[0].type && "select" === s[0].type.substr(0, 6) ? s[0].selectedIndex = 0 : s.val(c), (t[e.p.id].checkOnSubmit === !0 || t[e.p.id].checkOnUpdate) && (t[e.p.id]._savedData[o] = c))
					}),
					void n("#id_g", u).val(i);
					v = n(r).jqGrid("getInd", i, !0);
					v && (n('td[role="gridcell"]', v).each(function(s) {
						var c, l;
						if (o = h[s].name, "cb" !== o && "subgrid" !== o && "rn" !== o && h[s].editable === !0) {
							if (o === r.p.ExpandColumn && r.p.treeGrid === !0) f = n(this).text();
							else try {
								f = n.unformat.call(r, n(this), {
									rowId: i,
									colModel: h[s]
								},
								s)
							} catch(v) {
								f = "textarea" === h[s].edittype ? n(this).text() : n(this).html()
							}
							switch (e.p.autoencode && (f = n.jgrid.htmlDecode(f)), (t[e.p.id].checkOnSubmit === !0 || t[e.p.id].checkOnUpdate) && (t[e.p.id]._savedData[o] = f), o = n.jgrid.jqID(o), h[s].edittype) {
							case "password":
							case "text":
							case "button":
							case "image":
							case "textarea":
								("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0)) && (f = "");
								n("#" + o, u).val(f);
								break;
							case "select":
								c = f.split(",");
								c = n.map(c,
								function(t) {
									return n.trim(t)
								});
								n("#" + o + " option", u).each(function() {
									this.selected = h[s].editoptions.multiple || n.trim(f) !== n.trim(n(this).text()) && c[0] !== n.trim(n(this).text()) && c[0] !== n.trim(n(this).val()) ? h[s].editoptions.multiple && (n.inArray(n.trim(n(this).text()), c) > -1 || n.inArray(n.trim(n(this).val()), c) > -1) ? !0 : !1 : !0
								}); (t[e.p.id].checkOnSubmit === !0 || t[e.p.id].checkOnUpdate) && (f = n("#" + o, u).val(), h[s].editoptions.multiple && (f = f.join(",")), t[e.p.id]._savedData[o] = f);
								break;
							case "checkbox":
								(f = String(f), h[s].editoptions && h[s].editoptions.value) ? (l = h[s].editoptions.value.split(":"), n("#" + o, u)[e.p.useProp ? "prop": "attr"](l[0] === f ? {
									checked: !0,
									defaultChecked: !0
								}: {
									checked: !1,
									defaultChecked: !1
								})) : (f = f.toLowerCase(), f.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== f ? (n("#" + o, u)[e.p.useProp ? "prop": "attr"]("checked", !0), n("#" + o, u)[e.p.useProp ? "prop": "attr"]("defaultChecked", !0)) : (n("#" + o, u)[e.p.useProp ? "prop": "attr"]("checked", !1), n("#" + o, u)[e.p.useProp ? "prop": "attr"]("defaultChecked", !1))); (t[e.p.id].checkOnSubmit === !0 || t[e.p.id].checkOnUpdate) && (f = n("#" + o, u).is(":checked") ? n("#" + o, u).val() : n("#" + o, u).attr("offval"));
								break;
							case "custom":
								try {
									if (!h[s].editoptions || !n.isFunction(h[s].editoptions.custom_value)) throw "e1";
									h[s].editoptions.custom_value.call(e, n("#" + o, u), "set", f)
								} catch(a) {
									"e1" === a ? n.jgrid.info_dialog(k.errcap, "function 'custom_value' " + t[n(this)[0]].p.msg.nodefined, n.rp_ge[n(this)[0]].p.bClose, {
										styleUI: t[n(this)[0]].p.styleUI
									}) : n.jgrid.info_dialog(k.errcap, a.message, n.rp_ge[n(this)[0]].p.bClose, {
										styleUI: t[n(this)[0]].p.styleUI
									})
								}
							}
							p++
						}
					}), p > 0 && n("#id_g", y).val(i))
				}
				function ti() {
					n.each(e.p.colModel,
					function(n, t) {
						t.editoptions && t.editoptions.NullIfEmpty === !0 && o.hasOwnProperty(t.name) && "" === o[t.name] && (o[t.name] = "null")
					})
				}
				function g() {
					var d, f, w, g, it, nt, rt, i = [!0, "", ""],
					tt = {},
					l = e.p.prmNames,
					p = n(e).triggerHandler("jqGridAddEditBeforeCheckValues", [n(s), c]),
					ft,
					ut,
					v,
					b;
					p && "object" == typeof p && (o = p);
					n.isFunction(t[e.p.id].beforeCheckValues) && (p = t[e.p.id].beforeCheckValues.call(e, o, n(s), c), p && "object" == typeof p && (o = p));
					for (g in o) if (o.hasOwnProperty(g) && (i = n.jgrid.checkValues.call(e, o[g], g), i[0] === !1)) break;
					if (ti(), i[0] && (tt = n(e).triggerHandler("jqGridAddEditClickSubmit", [t[e.p.id], o, c]), void 0 === tt && n.isFunction(t[e.p.id].onclickSubmit) && (tt = t[e.p.id].onclickSubmit.call(e, t[e.p.id], o, c) || {}), i = n(e).triggerHandler("jqGridAddEditBeforeSubmit", [o, n(s), c]), void 0 === i && (i = [!0, "", ""]), i[0] && n.isFunction(t[e.p.id].beforeSubmit) && (i = t[e.p.id].beforeSubmit.call(e, o, n(s), c))), i[0] && !t[e.p.id].processing) {
						if (t[e.p.id].processing = !0, n("#sData", y + "_2").addClass(u.active), rt = t[e.p.id].url || n(e).jqGrid("getGridParam", "editurl"), w = l.oper, f = "clientArray" === rt ? e.p.keyName: l.id, o[w] = "_empty" === n.trim(o[e.p.id + "_id"]) ? l.addoper: l.editoper, o[w] !== l.addoper ? o[f] = o[e.p.id + "_id"] : void 0 === o[f] && (o[f] = o[e.p.id + "_id"]), delete o[e.p.id + "_id"], o = n.extend(o, t[e.p.id].editData, tt), e.p.treeGrid === !0) {
							o[w] === l.addoper && (it = n(e).jqGrid("getGridParam", "selrow"), ft = "adjacency" === e.p.treeGridModel ? e.p.treeReader.parent_id_field: "parent_id", o[ft] = it);
							for (nt in e.p.treeReader) if (e.p.treeReader.hasOwnProperty(nt) && (ut = e.p.treeReader[nt], o.hasOwnProperty(ut))) {
								if (o[w] === l.addoper && "parent_id_field" === nt) continue;
								delete o[ut]
							}
						}
						o[f] = n.jgrid.stripPref(e.p.idPrefix, o[f]);
						v = n.extend({
							url: rt,
							type: t[e.p.id].mtype,
							data: n.isFunction(t[e.p.id].serializeEditData) ? t[e.p.id].serializeEditData.call(e, o) : o,
							complete: function(v, p) {
								var b;
								if (n("#sData", y + "_2").removeClass(u.active), o[f] = e.p.idPrefix + o[f], v.status >= 300 && 304 !== v.status ? (i[0] = !1, i[1] = n(e).triggerHandler("jqGridAddEditErrorTextFormat", [v, c]), i[1] = n.isFunction(t[e.p.id].errorTextFormat) ? t[e.p.id].errorTextFormat.call(e, v, c) : p + " Status: '" + v.statusText + "'. Error code: " + v.status) : (i = n(e).triggerHandler("jqGridAddEditAfterSubmit", [v, o, c]), void 0 === i && (i = [!0, "", ""]), i[0] && n.isFunction(t[e.p.id].afterSubmit) && (i = t[e.p.id].afterSubmit.call(e, v, o, c))), i[0] === !1) n(".FormError", s).html(i[1]),
								n(".FormError", s).show();
								else if (e.p.autoencode && n.each(o,
								function(t, i) {
									o[t] = n.jgrid.htmlDecode(i)
								}), o[w] === l.addoper ? (i[2] || (i[2] = n.jgrid.randId()), null == o[f] || "_empty" === o[f] ? o[f] = i[2] : i[2] = o[f], t[e.p.id].reloadAfterSubmit ? n(e).trigger("reloadGrid") : e.p.treeGrid === !0 ? n(e).jqGrid("addChildNode", i[2], it, o) : n(e).jqGrid("addRowData", i[2], o, r.addedrow), t[e.p.id].closeAfterAdd ? (e.p.treeGrid !== !0 && n(e).jqGrid("setSelection", i[2]), n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
									gb: "#gbox_" + n.jgrid.jqID(a),
									jqm: r.jqModal,
									onClose: t[e.p.id].onClose,
									removemodal: t[e.p.id].removemodal,
									formprop: !t[e.p.id].recreateForm,
									form: t[e.p.id].form
								})) : t[e.p.id].clearAfterAdd && ht("_empty", e, s)) : (t[e.p.id].reloadAfterSubmit ? (n(e).trigger("reloadGrid"), t[e.p.id].closeAfterEdit || setTimeout(function() {
									n(e).jqGrid("setSelection", o[f])
								},
								1e3)) : e.p.treeGrid === !0 ? n(e).jqGrid("setTreeRow", o[f], o) : n(e).jqGrid("setRowData", o[f], o), t[e.p.id].closeAfterEdit && n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
									gb: "#gbox_" + n.jgrid.jqID(a),
									jqm: r.jqModal,
									onClose: t[e.p.id].onClose,
									removemodal: t[e.p.id].removemodal,
									formprop: !t[e.p.id].recreateForm,
									form: t[e.p.id].form
								})), n.isFunction(t[e.p.id].afterComplete) && (d = v, setTimeout(function() {
									n(e).triggerHandler("jqGridAddEditAfterComplete", [d, o, n(s), c]);
									t[e.p.id].afterComplete.call(e, d, o, n(s), c);
									d = null
								},
								500)), (t[e.p.id].checkOnSubmit || t[e.p.id].checkOnUpdate) && (n(s).data("disabled", !1), "_empty" !== t[e.p.id]._savedData[e.p.id + "_id"])) for (b in t[e.p.id]._savedData) t[e.p.id]._savedData.hasOwnProperty(b) && o[b] && (t[e.p.id]._savedData[b] = o[b]);
								t[e.p.id].processing = !1;
								try {
									n(":input:visible", s)[0].focus()
								} catch(k) {}
							}
						},
						n.jgrid.ajaxOptions, t[e.p.id].ajaxEditOptions); (v.url || t[e.p.id].useDataProxy || (n.isFunction(e.p.dataProxy) ? t[e.p.id].useDataProxy = !0 : (i[0] = !1, i[1] += " " + k.nourl)), i[0]) && (t[e.p.id].useDataProxy ? (b = e.p.dataProxy.call(e, v, "set_" + e.p.id), void 0 === b && (b = [!0, ""]), b[0] === !1 ? (i[0] = !1, i[1] = b[1] || "Error deleting the selected row!") : (v.data.oper === l.addoper && t[e.p.id].closeAfterAdd && n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
							gb: "#gbox_" + n.jgrid.jqID(a),
							jqm: r.jqModal,
							onClose: t[e.p.id].onClose,
							removemodal: t[e.p.id].removemodal,
							formprop: !t[e.p.id].recreateForm,
							form: t[e.p.id].form
						}), v.data.oper === l.editoper && t[e.p.id].closeAfterEdit && n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
							gb: "#gbox_" + n.jgrid.jqID(a),
							jqm: r.jqModal,
							onClose: t[e.p.id].onClose,
							removemodal: t[e.p.id].removemodal,
							formprop: !t[e.p.id].recreateForm,
							form: t[e.p.id].form
						}))) : "clientArray" === v.url ? (t[e.p.id].reloadAfterSubmit = !1, o = v.data, v.complete({
							status: 200,
							statusText: ""
						},
						"")) : n.ajax(v))
					}
					i[0] === !1 && (n(".FormError", s).html(i[1]), n(".FormError", s).show())
				}
				function gt(n, t) {
					var i, r = !1;
					for (i in n) if (n.hasOwnProperty(i) && n[i] != t[i]) {
						r = !0;
						break
					}
					return r
				}
				function p() {
					var i = !0;
					return n(".FormError", s).hide(),
					t[e.p.id].checkOnUpdate && (o = {},
					dt(), nt = gt(o, t[e.p.id]._savedData), nt && (n(s).data("disabled", !0), n(".confirm", "#" + h.themodal).show(), i = !1)),
					i
				}
				function ii() {
					var t;
					if ("_empty" !== i && void 0 !== e.p.savedRow && e.p.savedRow.length > 0 && n.isFunction(n.fn.jqGrid.restoreRow)) for (t = 0; t < e.p.savedRow.length; t++) if (e.p.savedRow[t].id === i) {
						n(e).jqGrid("restoreRow", i);
						break
					}
				}
				function ct(t, i) {
					var r = i[1].length - 1;
					0 === t ? n("#pData", l).addClass(u.disabled) : void 0 !== i[1][t - 1] && n("#" + n.jgrid.jqID(i[1][t - 1])).hasClass(u.disabled) ? n("#pData", l).addClass(u.disabled) : n("#pData", l).removeClass(u.disabled);
					t === r ? n("#nData", l).addClass(u.disabled) : void 0 !== i[1][t + 1] && n("#" + n.jgrid.jqID(i[1][t + 1])).hasClass(u.disabled) ? n("#nData", l).addClass(u.disabled) : n("#nData", l).removeClass(u.disabled)
				}
				function lt() {
					var t = n(e).jqGrid("getDataIDs"),
					i = n("#id_g", y).val(),
					r = n.inArray(i, t);
					return [r, t]
				}
				function ri(n) {
					var t = "";
					return "string" == typeof n && (t = n.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
					function(n, t) {
						return '<span id="' + t + '" ><\/span>'
					})),
					t
				}
				var e = this,
				yt, et, bt, ot, st, kt;
				if (e.grid && i) {
					var l, o, nt, c, a = e.p.id,
					s = "FrmGrid_" + a,
					tt = "TblGrid_" + a,
					y = "#" + n.jgrid.jqID(tt),
					h = {
						themodal: "editmod" + a,
						modalhead: "edithd" + a,
						modalcontent: "editcnt" + a,
						scrollelm: s
					},
					w = !0,
					at = 1,
					vt = 0,
					it = "string" == typeof t[e.p.id].template && t[e.p.id].template.length > 0,
					k = n.jgrid.getRegional(this, "errors");
					t[e.p.id].styleUI = e.p.styleUI || "jQueryUI";
					n.jgrid.isMobile() && (t[e.p.id].resize = !1);
					"new" === i ? (i = "_empty", c = "add", r.caption = t[e.p.id].addCaption) : (r.caption = t[e.p.id].editCaption, c = "edit");
					r.recreateForm || n(e).data("formProp") && n.extend(t[n(this)[0].p.id], n(e).data("formProp"));
					yt = !0;
					r.checkOnUpdate && r.jqModal && !r.modal && (yt = !1);
					var b, ui = isNaN(t[n(this)[0].p.id].dataheight) ? t[n(this)[0].p.id].dataheight: t[n(this)[0].p.id].dataheight + "px",
					fi = isNaN(t[n(this)[0].p.id].datawidth) ? t[n(this)[0].p.id].datawidth: t[n(this)[0].p.id].datawidth + "px",
					v = n("<form name='FormPost' id='" + s + "' class='FormGrid' onSubmit='return false;' style='width:" + fi + ";height:" + ui + ";'><\/form>").data("disabled", !1);
					if (it ? (b = ri(t[n(this)[0].p.id].template), l = y) : (b = n("<table id='" + tt + "' class='EditTable ui-common-table'><tbody><\/tbody><\/table>"), l = y + "_2"), s = "#" + n.jgrid.jqID(s), n(v).append("<div class='FormError " + u.error + "' style='display:none;'><\/div>"), n(v).append("<div class='tinfo topinfo'>" + t[e.p.id].topinfo + "<\/div>"), n(e.p.colModel).each(function() {
						var n = this.formoptions;
						at = Math.max(at, n ? n.colpos || 0 : 0);
						vt = Math.max(vt, n ? n.rowpos || 0 : 0)
					}), n(v).append(b), w = n(e).triggerHandler("jqGridAddEditBeforeInitData", [v, c]), void 0 === w && (w = !0), w && n.isFunction(t[e.p.id].beforeInitData) && (w = t[e.p.id].beforeInitData.call(e, v, c)), w !== !1) {
						ii();
						ni(i, e, b, at);
						var rt = "rtl" === e.p.direction ? !0 : !1,
						ei = rt ? "nData": "pData",
						oi = rt ? "pData": "nData",
						pt = "<a id='" + ei + "' class='fm-button " + u.button + "'><span class='" + u.icon_base + " " + f.icon_prev + "'><\/span><\/a>",
						d = "<a id='" + oi + "' class='fm-button " + u.button + "'><span class='" + u.icon_base + " " + f.icon_next + "'><\/span><\/a>",
						ut = "<a id='sData' class='fm-button " + u.button + "'>" + r.bSubmit + "<\/a>",
						ft = "<a id='cData' class='fm-button " + u.button + "'>" + r.bCancel + "<\/a>",
						wt = "<table style='height:auto' class='EditTable ui-common-table' id='" + tt + "_2'><tbody><tr><td colspan='2'><hr class='" + u.content + "' style='margin:1px'/><\/td><\/tr><tr id='Act_Buttons'><td class='navButton'>" + (rt ? d + pt: pt + d) + "<\/td><td class='EditButton'>" + ut + ft + "<\/td><\/tr>"; (wt += "<\/tbody><\/table>", vt > 0) && (et = [], n.each(n(b)[0].rows,
						function(n, t) {
							et[n] = t
						}), et.sort(function(n, t) {
							return n.rp > t.rp ? 1 : n.rp < t.rp ? -1 : 0
						}), n.each(et,
						function(t, i) {
							n("tbody", b).append(i)
						}));
						r.gbox = "#gbox_" + n.jgrid.jqID(a);
						bt = !1;
						r.closeOnEscape === !0 && (r.closeOnEscape = !1, bt = !0); (it ? (n(v).find("#pData").replaceWith(pt), n(v).find("#nData").replaceWith(d), n(v).find("#sData").replaceWith(ut), n(v).find("#cData").replaceWith(ft), ot = n("<div id=" + tt + "><\/div>").append(v)) : ot = n("<div><\/div>").append(v).append(wt), n(v).append("<div class='binfo topinfo bottominfo'>" + t[e.p.id].bottominfo + "<\/div>"), n.jgrid.createModal(h, ot, t[n(this)[0].p.id], "#gview_" + n.jgrid.jqID(e.p.id), n("#gbox_" + n.jgrid.jqID(e.p.id))[0]), rt && (n("#pData, #nData", y + "_2").css("float", "right"), n(".EditButton", y + "_2").css("text-align", "left")), t[e.p.id].topinfo && n(".tinfo", s).show(), t[e.p.id].bottominfo && n(".binfo", s).show(), ot = null, wt = null, n("#" + n.jgrid.jqID(h.themodal)).keydown(function(i) {
							var u = i.target;
							if (n(s).data("disabled") === !0) return ! 1;
							if (t[e.p.id].savekey[0] === !0 && i.which === t[e.p.id].savekey[1] && "TEXTAREA" !== u.tagName) return n("#sData", y + "_2").trigger("click"),
							!1;
							if (27 === i.which) return p() ? (bt && n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
								gb: r.gbox,
								jqm: r.jqModal,
								onClose: t[e.p.id].onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}), !1) : !1;
							if (t[e.p.id].navkeys[0] === !0) {
								if ("_empty" === n("#id_g", y).val()) return ! 0;
								if (i.which === t[e.p.id].navkeys[1]) return n("#pData", l).trigger("click"),
								!1;
								if (i.which === t[e.p.id].navkeys[2]) return n("#nData", l).trigger("click"),
								!1
							}
						}), r.checkOnUpdate && (n("a.ui-jqdialog-titlebar-close span", "#" + n.jgrid.jqID(h.themodal)).removeClass("jqmClose"), n("a.ui-jqdialog-titlebar-close", "#" + n.jgrid.jqID(h.themodal)).unbind("click").click(function() {
							return p() ? (n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(a),
								jqm: r.jqModal,
								onClose: t[e.p.id].onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}), !1) : !1
						})), r.saveicon = n.extend([!0, "left", f.icon_save], r.saveicon), r.closeicon = n.extend([!0, "left", f.icon_close], r.closeicon), r.saveicon[0] === !0 && n("#sData", l).addClass("right" === r.saveicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + u.icon_base + " " + r.saveicon[2] + "'><\/span>"), r.closeicon[0] === !0 && n("#cData", l).addClass("right" === r.closeicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + u.icon_base + " " + r.closeicon[2] + "'><\/span>"), t[e.p.id].checkOnSubmit || t[e.p.id].checkOnUpdate) && (ut = "<a id='sNew' class='fm-button " + u.button + "' style='z-index:1002'>" + r.bYes + "<\/a>", d = "<a id='nNew' class='fm-button " + u.button + "' style='z-index:1002;margin-left:5px'>" + r.bNo + "<\/a>", ft = "<a id='cNew' class='fm-button " + u.button + "' style='z-index:1002;margin-left:5px;'>" + r.bExit + "<\/a>", st = r.zIndex || 999, st++, n("<div class='" + r.overlayClass + " jqgrid-overlay confirm' style='z-index:" + st + ";display:none;'>&#160;<\/div><div class='confirm ui-jqconfirm " + u.content + "' style='z-index:" + (st + 1) + "'>" + r.saveData + "<br/><br/>" + ut + d + ft + "<\/div>").insertAfter(s), n("#sNew", "#" + n.jgrid.jqID(h.themodal)).click(function() {
							return g(),
							n(s).data("disabled", !1),
							n(".confirm", "#" + n.jgrid.jqID(h.themodal)).hide(),
							!1
						}), n("#nNew", "#" + n.jgrid.jqID(h.themodal)).click(function() {
							return n(".confirm", "#" + n.jgrid.jqID(h.themodal)).hide(),
							n(s).data("disabled", !1),
							setTimeout(function() {
								n(":input:visible", s)[0].focus()
							},
							0),
							!1
						}), n("#cNew", "#" + n.jgrid.jqID(h.themodal)).click(function() {
							return n(".confirm", "#" + n.jgrid.jqID(h.themodal)).hide(),
							n(s).data("disabled", !1),
							n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(a),
								jqm: r.jqModal,
								onClose: t[e.p.id].onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}),
							!1
						}));
						n(e).triggerHandler("jqGridAddEditInitializeForm", [n(s), c]);
						n.isFunction(t[e.p.id].onInitializeForm) && t[e.p.id].onInitializeForm.call(e, n(s), c);
						"_empty" !== i && t[e.p.id].viewPagerButtons ? n("#pData,#nData", l).show() : n("#pData,#nData", l).hide();
						n(e).triggerHandler("jqGridAddEditBeforeShowForm", [n(s), c]);
						n.isFunction(t[e.p.id].beforeShowForm) && t[e.p.id].beforeShowForm.call(e, n(s), c);
						n("#" + n.jgrid.jqID(h.themodal)).data("onClose", t[e.p.id].onClose);
						n.jgrid.viewModal("#" + n.jgrid.jqID(h.themodal), {
							gbox: "#gbox_" + n.jgrid.jqID(a),
							jqm: r.jqModal,
							overlay: r.overlay,
							modal: r.modal,
							overlayClass: r.overlayClass,
							focusField: r.focusField,
							onHide: function(t) {
								var i = n("#editmod" + a)[0].style.height,
								r = n("#editmod" + a)[0].style.width;
								i.indexOf("px") > -1 && (i = parseFloat(i));
								r.indexOf("px") > -1 && (r = parseFloat(r));
								n(e).data("formProp", {
									top: parseFloat(n(t.w).css("top")),
									left: parseFloat(n(t.w).css("left")),
									width: r,
									height: i,
									dataheight: n(s).height(),
									datawidth: n(s).width()
								});
								t.w.remove();
								t.o && t.o.remove()
							}
						});
						yt || n("." + n.jgrid.jqID(r.overlayClass)).click(function() {
							return p() ? (n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(a),
								jqm: r.jqModal,
								onClose: t[e.p.id].onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}), !1) : !1
						});
						n(".fm-button", "#" + n.jgrid.jqID(h.themodal)).hover(function() {
							n(this).addClass(u.hover)
						},
						function() {
							n(this).removeClass(u.hover)
						});
						n("#sData", l).click(function() {
							return o = {},
							n(".FormError", s).hide(),
							dt(),
							"_empty" === o[e.p.id + "_id"] ? g() : r.checkOnSubmit === !0 ? (nt = gt(o, t[e.p.id]._savedData), nt ? (n(s).data("disabled", !0), n(".confirm", "#" + n.jgrid.jqID(h.themodal)).show()) : g()) : g(),
							!1
						});
						n("#cData", l).click(function() {
							return p() ? (n.jgrid.hideModal("#" + n.jgrid.jqID(h.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(a),
								jqm: r.jqModal,
								onClose: t[e.p.id].onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}), !1) : !1
						});
						n("#nData", l).click(function() {
							var t, i;
							if (!p()) return ! 1;
							if (n(".FormError", s).hide(), t = lt(), t[0] = parseInt(t[0], 10), -1 !== t[0] && t[1][t[0] + 1]) {
								if ((n(e).triggerHandler("jqGridAddEditClickPgButtons", ["next", n(s), t[1][t[0]]]), n.isFunction(r.onclickPgButtons) && (i = r.onclickPgButtons.call(e, "next", n(s), t[1][t[0]]), void 0 !== i && i === !1)) || n("#" + n.jgrid.jqID(t[1][t[0] + 1])).hasClass(u.disabled)) return ! 1;
								ht(t[1][t[0] + 1], e, s);
								n(e).jqGrid("setSelection", t[1][t[0] + 1]);
								n(e).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", n(s), t[1][t[0]]]);
								n.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(e, "next", n(s), t[1][t[0] + 1]);
								ct(t[0] + 1, t)
							}
							return ! 1
						});
						n("#pData", l).click(function() {
							var t, i;
							if (!p()) return ! 1;
							if (n(".FormError", s).hide(), t = lt(), -1 !== t[0] && t[1][t[0] - 1]) {
								if ((n(e).triggerHandler("jqGridAddEditClickPgButtons", ["prev", n(s), t[1][t[0]]]), n.isFunction(r.onclickPgButtons) && (i = r.onclickPgButtons.call(e, "prev", n(s), t[1][t[0]]), void 0 !== i && i === !1)) || n("#" + n.jgrid.jqID(t[1][t[0] - 1])).hasClass(u.disabled)) return ! 1;
								ht(t[1][t[0] - 1], e, s);
								n(e).jqGrid("setSelection", t[1][t[0] - 1]);
								n(e).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", n(s), t[1][t[0]]]);
								n.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(e, "prev", n(s), t[1][t[0] - 1]);
								ct(t[0] - 1, t)
							}
							return ! 1
						});
						n(e).triggerHandler("jqGridAddEditAfterShowForm", [n(s), c]);
						n.isFunction(t[e.p.id].afterShowForm) && t[e.p.id].afterShowForm.call(e, n(s), c);
						kt = lt();
						ct(kt[0], kt)
					}
				}
			})
		},
		viewGridRow: function(i, r) {
			var o = n.jgrid.getRegional(this[0], "view"),
			e = this[0].p.styleUI,
			f = n.jgrid.styleUI[e].formedit,
			u = n.jgrid.styleUI[e].common;
			return r = n.extend(!0, {
				top: 0,
				left: 0,
				width: 500,
				datawidth: "auto",
				height: "auto",
				dataheight: "auto",
				modal: !1,
				overlay: 30,
				drag: !0,
				resize: !0,
				jqModal: !0,
				closeOnEscape: !1,
				labelswidth: "30%",
				closeicon: [],
				navkeys: [!1, 38, 40],
				onClose: null,
				beforeShowForm: null,
				beforeInitData: null,
				viewPagerButtons: !0,
				recreateForm: !1,
				removemodal: !0,
				form: "view"
			},
			o, r || {}),
			t[n(this)[0].p.id] = r,
			this.each(function() {
				function p() { (t[e.p.id].closeOnEscape === !0 || t[e.p.id].navkeys[0] === !0) && setTimeout(function() {
						n(".ui-jqdialog-titlebar-close", "#" + n.jgrid.jqID(c.modalhead)).attr("tabindex", "-1").focus()
					},
					0)
				}
				function et(t, i, f, e) {
					for (var s, c, o, k, d, p, w, g, h = 0,
					nt = [], a = !1, it = "<td class='CaptionTD form-view-label " + u.content + "' width='" + r.labelswidth + "'>&#160;<\/td><td class='DataTD form-view-data ui-helper-reset " + u.content + "'>&#160;<\/td>", tt = "", rt = "<td class='CaptionTD form-view-label " + u.content + "'>&#160;<\/td><td class='DataTD form-view-data " + u.content + "'>&#160;<\/td>", ut = ["integer", "number", "currency"], v = 0, y = 0, b, l = 1; e >= l; l++) tt += 1 === l ? it: rt;
					return (n(i.p.colModel).each(function() {
						c = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1;
						c || "right" !== this.align || (this.formatter && -1 !== n.inArray(this.formatter, ut) ? v = Math.max(v, parseInt(this.width, 10)) : y = Math.max(y, parseInt(this.width, 10)))
					}), p = 0 !== v ? v: 0 !== y ? y: 0, a = n(i).jqGrid("getInd", t), n(i.p.colModel).each(function(t) {
						var v;
						if (s = this.name, w = !1, c = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, d = c ? "style='display:none'": "", g = "boolean" != typeof this.viewable ? !0 : this.viewable, "cb" !== s && "subgrid" !== s && "rn" !== s && g) {
							k = a === !1 ? "": s === i.p.ExpandColumn && i.p.treeGrid === !0 ? n("td:eq(" + t + ")", i.rows[a]).text() : n("td:eq(" + t + ")", i.rows[a]).html();
							w = "right" === this.align && 0 !== p ? !0 : !1;
							var r = n.extend({},
							{
								rowabove: !1,
								rowcontent: ""
							},
							this.formoptions || {}),
							u = parseInt(r.rowpos, 10) || h + 1,
							l = parseInt(2 * (parseInt(r.colpos, 10) || 1), 10);
							r.rowabove && (v = n("<tr><td class='contentinfo' colspan='" + 2 * e + "'>" + r.rowcontent + "<\/td><\/tr>"), n(f).append(v), v[0].rp = u);
							o = n(f).find("tr[rowpos=" + u + "]");
							0 === o.length && (o = n("<tr " + d + " rowpos='" + u + "'><\/tr>").addClass("FormData").attr("id", "trv_" + s), n(o).append(tt), n(f).append(o), o[0].rp = u);
							n("td:eq(" + (l - 2) + ")", o[0]).html("<b>" + (void 0 === r.label ? i.p.colNames[t] : r.label) + "<\/b>");
							n("td:eq(" + (l - 1) + ")", o[0]).append("<span>" + k + "<\/span>").attr("id", "v_" + s);
							w && n("td:eq(" + (l - 1) + ") span", o[0]).css({
								"text-align": "right",
								width: p + "px"
							});
							nt[h] = t;
							h++
						}
					}), h > 0) && (b = n("<tr class='FormData' style='display:none'><td class='CaptionTD'><\/td><td colspan='" + (2 * e - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + t + "'/><\/td><\/tr>"), b[0].rp = h + 99, n(f).append(b)),
					nt
				}
				function it(t, i) {
					var r, f, e, u, s = 0;
					u = n(i).jqGrid("getInd", t, !0);
					u && (n("td", u).each(function(t) {
						r = i.p.colModel[t].name;
						f = i.p.colModel[t].editrules && i.p.colModel[t].editrules.edithidden === !0 ? !1 : i.p.colModel[t].hidden === !0 ? !0 : !1;
						"cb" !== r && "subgrid" !== r && "rn" !== r && (e = r === i.p.ExpandColumn && i.p.treeGrid === !0 ? n(this).text() : n(this).html(), r = n.jgrid.jqID("v_" + r), n("#" + r + " span", "#" + o).html(e), f && n("#" + r, "#" + o).parents("tr:first").hide(), s++)
					}), s > 0 && n("#id_g", "#" + o).val(t))
				}
				function w(t, i) {
					var r = i[1].length - 1;
					0 === t ? n("#pData", "#" + o + "_2").addClass(u.disabled) : void 0 !== i[1][t - 1] && n("#" + n.jgrid.jqID(i[1][t - 1])).hasClass(u.disabled) ? n("#pData", o + "_2").addClass(u.disabled) : n("#pData", "#" + o + "_2").removeClass(u.disabled);
					t === r ? n("#nData", "#" + o + "_2").addClass(u.disabled) : void 0 !== i[1][t + 1] && n("#" + n.jgrid.jqID(i[1][t + 1])).hasClass(u.disabled) ? n("#nData", o + "_2").addClass(u.disabled) : n("#nData", "#" + o + "_2").removeClass(u.disabled)
				}
				function b() {
					var t = n(e).jqGrid("getDataIDs"),
					i = n("#id_g", "#" + o).val(),
					r = n.inArray(i, t);
					return [r, t]
				}
				var e = this,
				y, nt, tt;
				if (e.grid && i) {
					var s = e.p.id,
					h = "ViewGrid_" + n.jgrid.jqID(s),
					o = "ViewTbl_" + n.jgrid.jqID(s),
					ot = "ViewGrid_" + s,
					st = "ViewTbl_" + s,
					c = {
						themodal: "viewmod" + s,
						modalhead: "viewhd" + s,
						modalcontent: "viewcnt" + s,
						scrollelm: h
					},
					rt = n.isFunction(t[e.p.id].beforeInitData) ? t[e.p.id].beforeInitData: !1,
					l = !0,
					k = 1,
					d = 0;
					t[e.p.id].styleUI = e.p.styleUI || "jQueryUI";
					r.recreateForm || n(e).data("viewProp") && n.extend(t[n(this)[0].p.id], n(e).data("viewProp"));
					var ht = isNaN(t[n(this)[0].p.id].dataheight) ? t[n(this)[0].p.id].dataheight: t[n(this)[0].p.id].dataheight + "px",
					ct = isNaN(t[n(this)[0].p.id].datawidth) ? t[n(this)[0].p.id].datawidth: t[n(this)[0].p.id].datawidth + "px",
					g = n("<form name='FormPost' id='" + ot + "' class='FormGrid' style='width:" + ct + ";height:" + ht + ";'><\/form>"),
					a = n("<table id='" + st + "' class='EditTable ViewTable'><tbody><\/tbody><\/table>");
					if (n(e.p.colModel).each(function() {
						var n = this.formoptions;
						k = Math.max(k, n ? n.colpos || 0 : 0);
						d = Math.max(d, n ? n.rowpos || 0 : 0)
					}), n(g).append(a), rt && (l = rt.call(e, g), void 0 === l && (l = !0)), l !== !1) {
						et(i, e, a, k);
						var v = "rtl" === e.p.direction ? !0 : !1,
						lt = v ? "nData": "pData",
						at = v ? "pData": "nData",
						ut = "<a id='" + lt + "' class='fm-button " + u.button + "'><span class='" + u.icon_base + " " + f.icon_prev + "'><\/span><\/a>",
						ft = "<a id='" + at + "' class='fm-button " + u.button + "'><span class='" + u.icon_base + " " + f.icon_next + "'><\/span><\/a>",
						vt = "<a id='cData' class='fm-button " + u.button + "'>" + r.bClose + "<\/a>";
						d > 0 && (y = [], n.each(n(a)[0].rows,
						function(n, t) {
							y[n] = t
						}), y.sort(function(n, t) {
							return n.rp > t.rp ? 1 : n.rp < t.rp ? -1 : 0
						}), n.each(y,
						function(t, i) {
							n("tbody", a).append(i)
						}));
						r.gbox = "#gbox_" + n.jgrid.jqID(s);
						nt = n("<div><\/div>").append(g).append("<table border='0' class='EditTable' id='" + o + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + r.labelswidth + "'>" + (v ? ft + ut: ut + ft) + "<\/td><td class='EditButton'>" + vt + "<\/td><\/tr><\/tbody><\/table>");
						n.jgrid.createModal(c, nt, t[n(this)[0].p.id], "#gview_" + n.jgrid.jqID(e.p.id), n("#gview_" + n.jgrid.jqID(e.p.id))[0]);
						v && (n("#pData, #nData", "#" + o + "_2").css("float", "right"), n(".EditButton", "#" + o + "_2").css("text-align", "left"));
						r.viewPagerButtons || n("#pData, #nData", "#" + o + "_2").hide();
						nt = null;
						n("#" + c.themodal).keydown(function(i) {
							if (27 === i.which) return t[e.p.id].closeOnEscape && n.jgrid.hideModal("#" + n.jgrid.jqID(c.themodal), {
								gb: r.gbox,
								jqm: r.jqModal,
								onClose: r.onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}),
							!1;
							if (r.navkeys[0] === !0) {
								if (i.which === r.navkeys[1]) return n("#pData", "#" + o + "_2").trigger("click"),
								!1;
								if (i.which === r.navkeys[2]) return n("#nData", "#" + o + "_2").trigger("click"),
								!1
							}
						});
						r.closeicon = n.extend([!0, "left", f.icon_close], r.closeicon);
						r.closeicon[0] === !0 && n("#cData", "#" + o + "_2").addClass("right" === r.closeicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + u.icon_base + " " + r.closeicon[2] + "'><\/span>");
						n.isFunction(r.beforeShowForm) && r.beforeShowForm.call(e, n("#" + h));
						n.jgrid.viewModal("#" + n.jgrid.jqID(c.themodal), {
							gbox: "#gbox_" + n.jgrid.jqID(s),
							jqm: r.jqModal,
							overlay: r.overlay,
							modal: r.modal,
							onHide: function(t) {
								n(e).data("viewProp", {
									top: parseFloat(n(t.w).css("top")),
									left: parseFloat(n(t.w).css("left")),
									width: n(t.w).width(),
									height: n(t.w).height(),
									dataheight: n("#" + h).height(),
									datawidth: n("#" + h).width()
								});
								t.w.remove();
								t.o && t.o.remove()
							}
						});
						n(".fm-button:not(." + u.disabled + ")", "#" + o + "_2").hover(function() {
							n(this).addClass(u.hover)
						},
						function() {
							n(this).removeClass(u.hover)
						});
						p();
						n("#cData", "#" + o + "_2").click(function() {
							return n.jgrid.hideModal("#" + n.jgrid.jqID(c.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(s),
								jqm: r.jqModal,
								onClose: r.onClose,
								removemodal: t[e.p.id].removemodal,
								formprop: !t[e.p.id].recreateForm,
								form: t[e.p.id].form
							}),
							!1
						});
						n("#nData", "#" + o + "_2").click(function() {
							n("#FormError", "#" + o).hide();
							var t = b();
							return t[0] = parseInt(t[0], 10),
							-1 !== t[0] && t[1][t[0] + 1] && (n.isFunction(r.onclickPgButtons) && r.onclickPgButtons.call(e, "next", n("#" + h), t[1][t[0]]), it(t[1][t[0] + 1], e), n(e).jqGrid("setSelection", t[1][t[0] + 1]), n.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(e, "next", n("#" + h), t[1][t[0] + 1]), w(t[0] + 1, t)),
							p(),
							!1
						});
						n("#pData", "#" + o + "_2").click(function() {
							n("#FormError", "#" + o).hide();
							var t = b();
							return - 1 !== t[0] && t[1][t[0] - 1] && (n.isFunction(r.onclickPgButtons) && r.onclickPgButtons.call(e, "prev", n("#" + h), t[1][t[0]]), it(t[1][t[0] - 1], e), n(e).jqGrid("setSelection", t[1][t[0] - 1]), n.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(e, "prev", n("#" + h), t[1][t[0] - 1]), w(t[0] - 1, t)),
							p(),
							!1
						});
						tt = b();
						w(tt[0], tt)
					}
				}
			})
		},
		delGridRow: function(i, r) {
			var o = n.jgrid.getRegional(this[0], "del"),
			f = this[0].p.styleUI,
			e = n.jgrid.styleUI[f].formedit,
			u = n.jgrid.styleUI[f].common;
			return r = n.extend(!0, {
				top: 0,
				left: 0,
				width: 240,
				height: "auto",
				dataheight: "auto",
				modal: !1,
				overlay: 30,
				drag: !0,
				resize: !0,
				url: "",
				mtype: "POST",
				reloadAfterSubmit: !0,
				beforeShowForm: null,
				beforeInitData: null,
				afterShowForm: null,
				beforeSubmit: null,
				onclickSubmit: null,
				afterSubmit: null,
				jqModal: !0,
				closeOnEscape: !1,
				delData: {},
				delicon: [],
				cancelicon: [],
				onClose: null,
				ajaxDelOptions: {},
				processing: !1,
				serializeDelData: null,
				useDataProxy: !1
			},
			o, r || {}),
			t[n(this)[0].p.id] = r,
			this.each(function() {
				var f = this,
				g, nt;
				if (f.grid && i) {
					var a, w, v, b, k = n.isFunction(t[f.p.id].beforeShowForm),
					d = n.isFunction(t[f.p.id].afterShowForm),
					y = n.isFunction(t[f.p.id].beforeInitData) ? t[f.p.id].beforeInitData: !1,
					s = f.p.id,
					p = {},
					h = !0,
					o = "DelTbl_" + n.jgrid.jqID(s),
					tt = "DelTbl_" + s,
					c = {
						themodal: "delmod" + s,
						modalhead: "delhd" + s,
						modalcontent: "delcnt" + s,
						scrollelm: o
					};
					if (t[f.p.id].styleUI = f.p.styleUI || "jQueryUI", n.isArray(i) && (i = i.join()), void 0 !== n("#" + n.jgrid.jqID(c.themodal))[0]) {
						if (y && (h = y.call(f, n("#" + o)), void 0 === h && (h = !0)), h === !1) return;
						n("#DelData>td", "#" + o).text(i);
						n("#DelError", "#" + o).hide();
						t[f.p.id].processing === !0 && (t[f.p.id].processing = !1, n("#dData", "#" + o).removeClass(u.active));
						k && t[f.p.id].beforeShowForm.call(f, n("#" + o));
						n.jgrid.viewModal("#" + n.jgrid.jqID(c.themodal), {
							gbox: "#gbox_" + n.jgrid.jqID(s),
							jqm: t[f.p.id].jqModal,
							jqM: !1,
							overlay: t[f.p.id].overlay,
							modal: t[f.p.id].modal
						});
						d && t[f.p.id].afterShowForm.call(f, n("#" + o))
					} else {
						var it = isNaN(t[f.p.id].dataheight) ? t[f.p.id].dataheight: t[f.p.id].dataheight + "px",
						rt = isNaN(r.datawidth) ? r.datawidth: r.datawidth + "px",
						l = "<div id='" + tt + "' class='formdata' style='width:" + rt + ";overflow:auto;position:relative;height:" + it + ";'>";
						if (l += "<table class='DelTable'><tbody>", l += "<tr id='DelError' style='display:none'><td class='" + u.error + "'><\/td><\/tr>", l += "<tr id='DelData' style='display:none'><td >" + i + "<\/td><\/tr>", l += '<tr><td class="delmsg" style="white-space:pre;">' + t[f.p.id].msg + "<\/td><\/tr><tr><td >&#160;<\/td><\/tr>", l += "<\/tbody><\/table><\/div>", g = "<a id='dData' class='fm-button " + u.button + "'>" + r.bSubmit + "<\/a>", nt = "<a id='eData' class='fm-button " + u.button + "'>" + r.bCancel + "<\/a>", l += "<table class='EditTable ui-common-table' id='" + o + "_2'><tbody><tr><td><hr class='" + u.content + "' style='margin:1px'/><\/td><\/tr><tr><td class='DelButton EditButton'>" + g + "&#160;" + nt + "<\/td><\/tr><\/tbody><\/table>", r.gbox = "#gbox_" + n.jgrid.jqID(s), n.jgrid.createModal(c, l, t[f.p.id], "#gview_" + n.jgrid.jqID(f.p.id), n("#gview_" + n.jgrid.jqID(f.p.id))[0]), y && (h = y.call(f, n(l)), void 0 === h && (h = !0)), h === !1) return;
						n(".fm-button", "#" + o + "_2").hover(function() {
							n(this).addClass(u.hover)
						},
						function() {
							n(this).removeClass(u.hover)
						});
						r.delicon = n.extend([!0, "left", e.icon_del], t[f.p.id].delicon);
						r.cancelicon = n.extend([!0, "left", e.icon_cancel], t[f.p.id].cancelicon);
						r.delicon[0] === !0 && n("#dData", "#" + o + "_2").addClass("right" === r.delicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + u.icon_base + " " + r.delicon[2] + "'><\/span>");
						r.cancelicon[0] === !0 && n("#eData", "#" + o + "_2").addClass("right" === r.cancelicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + u.icon_base + " " + r.cancelicon[2] + "'><\/span>");
						n("#dData", "#" + o + "_2").click(function() {
							var y, i = [!0, ""],
							e = n("#DelData>td", "#" + o).text(),
							h,
							l;
							if (p = {},
							n.isFunction(t[f.p.id].onclickSubmit) && (p = t[f.p.id].onclickSubmit.call(f, t[f.p.id], e) || {}), n.isFunction(t[f.p.id].beforeSubmit) && (i = t[f.p.id].beforeSubmit.call(f, e)), i[0] && !t[f.p.id].processing) {
								if (t[f.p.id].processing = !0, v = f.p.prmNames, a = n.extend({},
								t[f.p.id].delData, p), b = v.oper, a[b] = v.deloper, w = v.id, e = String(e).split(","), !e.length) return ! 1;
								for (y in e) e.hasOwnProperty(y) && (e[y] = n.jgrid.stripPref(f.p.idPrefix, e[y]));
								a[w] = e.join();
								n(this).addClass(u.active);
								h = n.extend({
									url: t[f.p.id].url || n(f).jqGrid("getGridParam", "editurl"),
									type: t[f.p.id].mtype,
									data: n.isFunction(t[f.p.id].serializeDelData) ? t[f.p.id].serializeDelData.call(f, a) : a,
									complete: function(h, l) {
										var v;
										if (n("#dData", "#" + o + "_2").removeClass(u.active), h.status >= 300 && 304 !== h.status ? (i[0] = !1, i[1] = n.isFunction(t[f.p.id].errorTextFormat) ? t[f.p.id].errorTextFormat.call(f, h) : l + " Status: '" + h.statusText + "'. Error code: " + h.status) : n.isFunction(t[f.p.id].afterSubmit) && (i = t[f.p.id].afterSubmit.call(f, h, a)), i[0] === !1) n("#DelError>td", "#" + o).html(i[1]),
										n("#DelError", "#" + o).show();
										else {
											if (t[f.p.id].reloadAfterSubmit && "local" !== f.p.datatype) n(f).trigger("reloadGrid");
											else {
												if (f.p.treeGrid === !0) try {
													n(f).jqGrid("delTreeNode", f.p.idPrefix + e[0])
												} catch(y) {} else for (v = 0; v < e.length; v++) n(f).jqGrid("delRowData", f.p.idPrefix + e[v]);
												f.p.selrow = null;
												f.p.selarrrow = []
											}
											n.isFunction(t[f.p.id].afterComplete) && setTimeout(function() {
												t[f.p.id].afterComplete.call(f, h, e)
											},
											500)
										}
										t[f.p.id].processing = !1;
										i[0] && n.jgrid.hideModal("#" + n.jgrid.jqID(c.themodal), {
											gb: "#gbox_" + n.jgrid.jqID(s),
											jqm: r.jqModal,
											onClose: t[f.p.id].onClose
										})
									}
								},
								n.jgrid.ajaxOptions, t[f.p.id].ajaxDelOptions); (h.url || t[f.p.id].useDataProxy || (n.isFunction(f.p.dataProxy) ? t[f.p.id].useDataProxy = !0 : (i[0] = !1, i[1] += " " + n.jgrid.getRegional(f, "errors.nourl"))), i[0]) && (t[f.p.id].useDataProxy ? (l = f.p.dataProxy.call(f, h, "del_" + f.p.id), void 0 === l && (l = [!0, ""]), l[0] === !1 ? (i[0] = !1, i[1] = l[1] || "Error deleting the selected row!") : n.jgrid.hideModal("#" + n.jgrid.jqID(c.themodal), {
									gb: "#gbox_" + n.jgrid.jqID(s),
									jqm: r.jqModal,
									onClose: t[f.p.id].onClose
								})) : "clientArray" === h.url ? (a = h.data, h.complete({
									status: 200,
									statusText: ""
								},
								"")) : n.ajax(h))
							}
							return i[0] === !1 && (n("#DelError>td", "#" + o).html(i[1]), n("#DelError", "#" + o).show()),
							!1
						});
						n("#eData", "#" + o + "_2").click(function() {
							return n.jgrid.hideModal("#" + n.jgrid.jqID(c.themodal), {
								gb: "#gbox_" + n.jgrid.jqID(s),
								jqm: t[f.p.id].jqModal,
								onClose: t[f.p.id].onClose
							}),
							!1
						});
						k && t[f.p.id].beforeShowForm.call(f, n("#" + o));
						n.jgrid.viewModal("#" + n.jgrid.jqID(c.themodal), {
							gbox: "#gbox_" + n.jgrid.jqID(s),
							jqm: t[f.p.id].jqModal,
							overlay: t[f.p.id].overlay,
							modal: t[f.p.id].modal
						});
						d && t[f.p.id].afterShowForm.call(f, n("#" + o))
					}
					t[f.p.id].closeOnEscape === !0 && setTimeout(function() {
						n(".ui-jqdialog-titlebar-close", "#" + n.jgrid.jqID(c.modalhead)).attr("tabindex", "-1").focus()
					},
					0)
				}
			})
		},
		navGrid: function(t, i, r, u, f, e, o) {
			var l = n.jgrid.getRegional(this[0], "nav"),
			c = this[0].p.styleUI,
			h = n.jgrid.styleUI[c].navigator,
			s = n.jgrid.styleUI[c].common;
			return i = n.extend({
				edit: !0,
				editicon: h.icon_edit_nav,
				add: !0,
				addicon: h.icon_add_nav,
				del: !0,
				delicon: h.icon_del_nav,
				search: !0,
				searchicon: h.icon_search_nav,
				refresh: !0,
				refreshicon: h.icon_refresh_nav,
				refreshstate: "firstpage",
				view: !1,
				viewicon: h.icon_view_nav,
				position: "left",
				closeOnEscape: !0,
				beforeRefresh: null,
				afterRefresh: null,
				cloneToTop: !1,
				alertwidth: 200,
				alertheight: "auto",
				alerttop: null,
				alertleft: null,
				alertzIndex: null,
				dropmenu: !1
			},
			l, i || {}),
			this.each(function() {
				var g, it, h, b, a, v, w, p, y, rt;
				if (!this.p.navGrid && (b = {
					themodal: "alertmod_" + this.p.id,
					modalhead: "alerthd_" + this.p.id,
					modalcontent: "alertcnt_" + this.p.id
				},
				a = this, a.grid && "string" == typeof t)) {
					n(a).data("navGrid") || n(a).data("navGrid", i);
					h = n(a).data("navGrid");
					a.p.force_regional && (h = n.extend(h, l));
					void 0 === n("#" + b.themodal)[0] && (h.alerttop || h.alertleft || (void 0 !== window.innerWidth ? (h.alertleft = window.innerWidth, h.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (h.alertleft = document.documentElement.clientWidth, h.alerttop = document.documentElement.clientHeight) : (h.alertleft = 1024, h.alerttop = 768), h.alertleft = h.alertleft / 2 - parseInt(h.alertwidth, 10) / 2, h.alerttop = h.alerttop / 2 - 25), n.jgrid.createModal(b, "<div>" + h.alerttext + "<\/div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'><\/span><\/span>", {
						gbox: "#gbox_" + n.jgrid.jqID(a.p.id),
						jqModal: !0,
						drag: !0,
						resize: !0,
						caption: h.alertcap,
						top: h.alerttop,
						left: h.alertleft,
						width: h.alertwidth,
						height: h.alertheight,
						closeOnEscape: h.closeOnEscape,
						zIndex: h.alertzIndex,
						styleUI: a.p.styleUI
					},
					"#gview_" + n.jgrid.jqID(a.p.id), n("#gbox_" + n.jgrid.jqID(a.p.id))[0], !0));
					var nt, tt = 1,
					k = function() {
						n(this).hasClass(s.disabled) || n(this).addClass(s.hover)
					},
					d = function() {
						n(this).removeClass(s.hover)
					};
					for (h.cloneToTop && a.p.toppager && (tt = 2), nt = 0; tt > nt; nt++) y = n("<table class='ui-pg-table navtable ui-common-table'><tbody><tr><\/tr><\/tbody><\/table>"),
					rt = "<td class='ui-pg-button " + s.disabled + "' style='width:4px;'><span class='ui-separator'><\/span><\/td>",
					0 === nt ? (w = t, p = a.p.id, w === a.p.toppager && (p += "_top", tt = 1)) : (w = a.p.toppager, p = a.p.id + "_top"),
					"rtl" === a.p.direction && n(y).attr("dir", "rtl").css("float", "right"),
					u = u || {},
					h.add && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.addicon + "'><\/span>" + h.addtext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.addtitle || "",
						id: u.id || "add_" + p
					}).click(function() {
						return n(this).hasClass(s.disabled) || (n.isFunction(h.addfunc) ? h.addfunc.call(a) : n(a).jqGrid("editGridRow", "new", u)),
						!1
					}).hover(k, d), v = null),
					r = r || {},
					h.edit && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.editicon + "'><\/span>" + h.edittext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.edittitle || "",
						id: r.id || "edit_" + p
					}).click(function() {
						if (!n(this).hasClass(s.disabled)) {
							var t = a.p.selrow;
							t ? n.isFunction(h.editfunc) ? h.editfunc.call(a, t) : n(a).jqGrid("editGridRow", t, r) : (n.jgrid.viewModal("#" + b.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(a.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus())
						}
						return ! 1
					}).hover(k, d), v = null),
					o = o || {},
					h.view && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.viewicon + "'><\/span>" + h.viewtext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.viewtitle || "",
						id: o.id || "view_" + p
					}).click(function() {
						if (!n(this).hasClass(s.disabled)) {
							var t = a.p.selrow;
							t ? n.isFunction(h.viewfunc) ? h.viewfunc.call(a, t) : n(a).jqGrid("viewGridRow", t, o) : (n.jgrid.viewModal("#" + b.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(a.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus())
						}
						return ! 1
					}).hover(k, d), v = null),
					f = f || {},
					h.del && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.delicon + "'><\/span>" + h.deltext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.deltitle || "",
						id: f.id || "del_" + p
					}).click(function() {
						if (!n(this).hasClass(s.disabled)) {
							var t;
							a.p.multiselect ? (t = a.p.selarrrow, 0 === t.length && (t = null)) : t = a.p.selrow;
							t ? n.isFunction(h.delfunc) ? h.delfunc.call(a, t) : n(a).jqGrid("delGridRow", t, f) : (n.jgrid.viewModal("#" + b.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(a.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus())
						}
						return ! 1
					}).hover(k, d), v = null),
					(h.add || h.edit || h.del || h.view) && n("tr", y).append(rt),
					e = e || {},
					h.search && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.searchicon + "'><\/span>" + h.searchtext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.searchtitle || "",
						id: e.id || "search_" + p
					}).click(function() {
						return n(this).hasClass(s.disabled) || (n.isFunction(h.searchfunc) ? h.searchfunc.call(a, e) : n(a).jqGrid("searchGrid", e)),
						!1
					}).hover(k, d), e.showOnLoad && e.showOnLoad === !0 && n(v, y).click(), v = null),
					h.refresh && (v = n("<td class='ui-pg-button " + s.cornerall + "'><\/td>"), n(v).append("<div class='ui-pg-div'><span class='" + s.icon_base + " " + h.refreshicon + "'><\/span>" + h.refreshtext + "<\/div>"), n("tr", y).append(v), n(v, y).attr({
						title: h.refreshtitle || "",
						id: "refresh_" + p
					}).click(function() {
						if (!n(this).hasClass(s.disabled)) {
							n.isFunction(h.beforeRefresh) && h.beforeRefresh.call(a);
							a.p.search = !1;
							a.p.resetsearch = !0;
							try {
								if ("currentfilter" !== h.refreshstate) {
									var t = a.p.id;
									a.p.postData.filters = "";
									try {
										n("#fbox_" + n.jgrid.jqID(t)).jqFilter("resetFilter")
									} catch(i) {}
									n.isFunction(a.clearToolbar) && a.clearToolbar.call(a, !1)
								}
							} catch(r) {}
							switch (h.refreshstate) {
							case "firstpage":
								n(a).trigger("reloadGrid", [{
									page: 1
								}]);
								break;
							case "current":
							case "currentfilter":
								n(a).trigger("reloadGrid", [{
									current: !0
								}])
							}
							n.isFunction(h.afterRefresh) && h.afterRefresh.call(a)
						}
						return ! 1
					}).hover(k, d), v = null),
					it = n(".ui-jqgrid").css("font-size") || "11px",
					n("body").append("<div id='testpg2' class='ui-jqgrid " + n.jgrid.styleUI[c].base.entrieBox + "' style='font-size:" + it + ";visibility:hidden;' ><\/div>"),
					g = n(y).clone().appendTo("#testpg2").width(),
					n("#testpg2").remove(),
					a.p._nvtd && (h.dropmenu ? (y = null, n(a).jqGrid("_buildNavMenu", w, p, i, r, u, f, e, o)) : g > a.p._nvtd[0] ? (a.p.responsive ? (y = null, n(a).jqGrid("_buildNavMenu", w, p, i, r, u, f, e, o)) : n(w + "_" + h.position, w).width(g), a.p._nvtd[0] = g) : n(w + "_" + h.position, w).append(y), a.p._nvtd[1] = g),
					a.p.navGrid = !0;
					a.p.storeNavOptions && (a.p.navOptions = h, a.p.editOptions = r, a.p.addOptions = u, a.p.delOptions = f, a.p.searchOptions = e, a.p.viewOptions = o)
				}
			})
		},
		navButtonAdd: function(t, i) {
			var r = this[0].p.styleUI,
			u = n.jgrid.styleUI[r].navigator;
			return i = n.extend({
				caption: "newButton",
				title: "",
				buttonicon: u.icon_newbutton_nav,
				onClickButton: null,
				position: "last",
				cursor: "pointer"
			},
			i || {}),
			this.each(function() {
				var f;
				if (this.grid) {
					"string" == typeof t && 0 !== t.indexOf("#") && (t = "#" + n.jgrid.jqID(t));
					var u = n(".navtable", t)[0],
					c = this,
					e = n.jgrid.styleUI[r].common.disabled,
					o = n.jgrid.styleUI[r].common.hover,
					l = n.jgrid.styleUI[r].common.cornerall,
					a = n.jgrid.styleUI[r].common.icon_base;
					if (u) {
						if (i.id && void 0 !== n("#" + n.jgrid.jqID(i.id), u)[0]) return;
						f = n("<td><\/td>");
						n(f).addClass("ui-pg-button " + l).append("NONE" === i.buttonicon.toString().toUpperCase() ? "<div class='ui-pg-div'>" + i.caption + "<\/div>": "<div class='ui-pg-div'><span class='" + a + " " + i.buttonicon + "'><\/span>" + i.caption + "<\/div>");
						i.id && n(f).attr("id", i.id);
						"first" === i.position ? 0 === u.rows[0].cells.length ? n("tr", u).append(f) : n("tr td:eq(0)", u).before(f) : n("tr", u).append(f);
						n(f, u).attr("title", i.title || "").click(function(t) {
							return n(this).hasClass(e) || n.isFunction(i.onClickButton) && i.onClickButton.call(c, t),
							!1
						}).hover(function() {
							n(this).hasClass(e) || n(this).addClass(o)
						},
						function() {
							n(this).removeClass(o)
						})
					} else if (u = n(".dropdownmenu", t)[0]) {
						var s = n(u).val(),
						v = i.id || n.jgrid.randId(),
						h = n('<li class="ui-menu-item" role="presentation"><a class="' + l + ' g-menu-item" tabindex="0" role="menuitem" id="' + v + '">' + (i.caption || i.title) + "<\/a><\/li>");
						s && ("first" === i.position ? n("#" + s).prepend(h) : n("#" + s).append(h), n(h).on("click",
						function(t) {
							return n(this).hasClass(e) || (n("#" + s).hide(), n.isFunction(i.onClickButton) && i.onClickButton.call(c, t)),
							!1
						}).find("a").hover(function() {
							n(this).hasClass(e) || n(this).addClass(o)
						},
						function() {
							n(this).removeClass(o)
						}))
					}
				}
			})
		},
		navSeparatorAdd: function(t, i) {
			var u = this[0].p.styleUI,
			r = n.jgrid.styleUI[u].common;
			return i = n.extend({
				sepclass: "ui-separator",
				sepcontent: "",
				position: "last"
			},
			i || {}),
			this.each(function() {
				if (this.grid) {
					"string" == typeof t && 0 !== t.indexOf("#") && (t = "#" + n.jgrid.jqID(t));
					var f, e, u = n(".navtable", t)[0];
					u ? (f = "<td class='ui-pg-button " + r.disabled + "' style='width:4px;'><span class='" + i.sepclass + "'><\/span>" + i.sepcontent + "<\/td>", "first" === i.position ? 0 === u.rows[0].cells.length ? n("tr", u).append(f) : n("tr td:eq(0)", u).before(f) : n("tr", u).append(f)) : (u = n(".dropdownmenu", t)[0], f = "<li class='ui-menu-item " + r.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'><\/li>", u && (e = n(u).val(), e && ("first" === i.position ? n("#" + e).prepend(f) : n("#" + e).append(f))))
				}
			})
		},
		_buildNavMenu: function(t, i, r, u, f, e, o, s) {
			return this.each(function() {
				var h = this,
				v = h.p.styleUI,
				p = (n.jgrid.styleUI[v].navigator, n.jgrid.styleUI[v].filter),
				c = n.jgrid.styleUI[v].common,
				l = "form_menu_" + n.jgrid.randId(),
				w = "<button class='dropdownmenu " + c.button + "' value='" + l + "'>Actions<\/button>",
				a,
				y;
				n(t + "_" + r.position, t).append(w);
				a = {
					themodal: "alertmod_" + this.p.id,
					modalhead: "alerthd_" + this.p.id,
					modalcontent: "alertcnt_" + this.p.id
				};
				y = function() {
					var y, v, w = n(".ui-jqgrid-view").css("font-size") || "11px",
					t = n('<ul id="' + l + '" class="ui-nav-menu modal-content" role="menu" tabindex="0" style="display:none;font-size:' + w + '"><\/ul>');
					r.add && (f = f || {},
					y = f.id || "add_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.addtext || r.addtitle) + "<\/a><\/li>").click(function() {
						return n(this).hasClass(c.disabled) || (n.isFunction(r.addfunc) ? r.addfunc.call(h) : n(h).jqGrid("editGridRow", "new", f), n(t).hide()),
						!1
					}), n(t).append(v));
					r.edit && (u = u || {},
					y = u.id || "edit_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.edittext || r.edittitle) + "<\/a><\/li>").click(function() {
						if (!n(this).hasClass(c.disabled)) {
							var i = h.p.selrow;
							i ? n.isFunction(r.editfunc) ? r.editfunc.call(h, i) : n(h).jqGrid("editGridRow", i, u) : (n.jgrid.viewModal("#" + a.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(h.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus());
							n(t).hide()
						}
						return ! 1
					}), n(t).append(v));
					r.view && (s = s || {},
					y = s.id || "view_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.viewtext || r.viewtitle) + "<\/a><\/li>").click(function() {
						if (!n(this).hasClass(c.disabled)) {
							var i = h.p.selrow;
							i ? n.isFunction(r.editfunc) ? r.viewfunc.call(h, i) : n(h).jqGrid("viewGridRow", i, s) : (n.jgrid.viewModal("#" + a.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(h.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus());
							n(t).hide()
						}
						return ! 1
					}), n(t).append(v));
					r.del && (e = e || {},
					y = e.id || "del_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.deltext || r.deltitle) + "<\/a><\/li>").click(function() {
						if (!n(this).hasClass(c.disabled)) {
							var i;
							h.p.multiselect ? (i = h.p.selarrrow, 0 === i.length && (i = null)) : i = h.p.selrow;
							i ? n.isFunction(r.delfunc) ? r.delfunc.call(h, i) : n(h).jqGrid("delGridRow", i, e) : (n.jgrid.viewModal("#" + a.themodal, {
								gbox: "#gbox_" + n.jgrid.jqID(h.p.id),
								jqm: !0
							}), n("#jqg_alrt").focus());
							n(t).hide()
						}
						return ! 1
					}), n(t).append(v)); (r.add || r.edit || r.del || r.view) && n(t).append("<li class='ui-menu-item " + c.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'><\/li>");
					r.search && (o = o || {},
					y = o.id || "search_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.searchtext || r.searchtitle) + "<\/a><\/li>").click(function() {
						return n(this).hasClass(c.disabled) || (n.isFunction(r.searchfunc) ? r.searchfunc.call(h, o) : n(h).jqGrid("searchGrid", o), n(t).hide()),
						!1
					}), n(t).append(v), o.showOnLoad && o.showOnLoad === !0 && n(v).click());
					r.refresh && (y = o.id || "search_" + i, v = n('<li class="ui-menu-item" role="presentation"><a class="' + c.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + y + '">' + (r.refreshtext || r.refreshtitle) + "<\/a><\/li>").click(function() {
						if (!n(this).hasClass(c.disabled)) {
							n.isFunction(r.beforeRefresh) && r.beforeRefresh.call(h);
							h.p.search = !1;
							h.p.resetsearch = !0;
							try {
								if ("currentfilter" !== r.refreshstate) {
									var i = h.p.id;
									h.p.postData.filters = "";
									try {
										n("#fbox_" + n.jgrid.jqID(i)).jqFilter("resetFilter")
									} catch(u) {}
									n.isFunction(h.clearToolbar) && h.clearToolbar.call(h, !1)
								}
							} catch(f) {}
							switch (r.refreshstate) {
							case "firstpage":
								n(h).trigger("reloadGrid", [{
									page: 1
								}]);
								break;
							case "current":
							case "currentfilter":
								n(h).trigger("reloadGrid", [{
									current: !0
								}])
							}
							n.isFunction(r.afterRefresh) && r.afterRefresh.call(h);
							n(t).hide()
						}
						return ! 1
					}), n(t).append(v));
					n(t).hide();
					n("body").append(t);
					n("#" + l).addClass("ui-menu " + p.menu_widget);
					n("#" + l + " > li > a").hover(function() {
						n(this).addClass(c.hover)
					},
					function() {
						n(this).removeClass(c.hover)
					})
				};
				y();
				n(".dropdownmenu").on("click",
				function() {
					var t = n(this).offset(),
					r = t.left,
					u = parseInt(t.top),
					i = n(this).val();
					n("#" + i).show().css({
						top: u - (n("#" + i).height() + 10) + "px",
						left: r + "px"
					})
				});
				n("body").on("click",
				function(t) {
					n(t.target).hasClass("dropdownmenu") || n("#" + l).hide()
				})
			})
		},
		GridToForm: function(t, i) {
			return this.each(function() {
				var r, f = this,
				u;
				if (f.grid && (u = n(f).jqGrid("getRowData", t), u)) for (r in u) u.hasOwnProperty(r) && (n("[name=" + n.jgrid.jqID(r) + "]", i).is("input:radio") || n("[name=" + n.jgrid.jqID(r) + "]", i).is("input:checkbox") ? n("[name=" + n.jgrid.jqID(r) + "]", i).each(function() {
					n(this).val() == u[r] ? n(this)[f.p.useProp ? "prop": "attr"]("checked", !0) : n(this)[f.p.useProp ? "prop": "attr"]("checked", !1)
				}) : n("[name=" + n.jgrid.jqID(r) + "]", i).val(u[r]))
			})
		},
		FormToGrid: function(t, i, r, u) {
			return this.each(function() {
				var e = this,
				o, f;
				e.grid && (r || (r = "set"), u || (u = "first"), o = n(i).serializeArray(), f = {},
				n.each(o,
				function(n, t) {
					f[t.name] = t.value
				}), "add" === r ? n(e).jqGrid("addRowData", t, f, u) : "set" === r && n(e).jqGrid("setRowData", t, f))
			})
		}
	}), n.jgrid.extend({
		groupingSetup: function() {
			return this.each(function() {
				var i, r, e, f = this,
				u = f.p.colModel,
				t = f.p.groupingView,
				o = n.jgrid.styleUI[f.p.styleUI || "jQueryUI"].grouping;
				if (null !== t && ("object" == typeof t || n.isFunction(t))) if (t.plusicon || (t.plusicon = o.icon_plus), t.minusicon || (t.minusicon = o.icon_minus), t.groupField.length) {
					for (void 0 === t.visibiltyOnNextGrouping && (t.visibiltyOnNextGrouping = []), t.lastvalues = [], t._locgr || (t.groups = []), t.counters = [], i = 0; i < t.groupField.length; i++) t.groupOrder[i] || (t.groupOrder[i] = "asc"),
					t.groupText[i] || (t.groupText[i] = "{0}"),
					"boolean" != typeof t.groupColumnShow[i] && (t.groupColumnShow[i] = !0),
					"boolean" != typeof t.groupSummary[i] && (t.groupSummary[i] = !1),
					t.groupSummaryPos[i] || (t.groupSummaryPos[i] = "footer"),
					t.groupColumnShow[i] === !0 ? (t.visibiltyOnNextGrouping[i] = !0, n(f).jqGrid("showCol", t.groupField[i])) : (t.visibiltyOnNextGrouping[i] = n("#" + n.jgrid.jqID(f.p.id + "_" + t.groupField[i])).is(":visible"), n(f).jqGrid("hideCol", t.groupField[i]));
					for (t.summary = [], t.hideFirstGroupCol && (t.formatDisplayField[0] = function(n) {
						return n
					}), r = 0, e = u.length; e > r; r++) t.hideFirstGroupCol && (u[r].hidden || t.groupField[0] !== u[r].name || (u[r].formatter = function() {
						return ""
					})),
					u[r].summaryType && t.summary.push(u[r].summaryDivider ? {
						nm: u[r].name,
						st: u[r].summaryType,
						v: "",
						sd: u[r].summaryDivider,
						vd: "",
						sr: u[r].summaryRound,
						srt: u[r].summaryRoundType || "round"
					}: {
						nm: u[r].name,
						st: u[r].summaryType,
						v: "",
						sr: u[r].summaryRound,
						srt: u[r].summaryRoundType || "round"
					})
				} else f.p.grouping = !1;
				else f.p.grouping = !1
			})
		},
		groupingPrepare: function(t, i) {
			return this.each(function() {
				for (var o, f, c, e, r = this.p.groupingView,
				s = this,
				h = function() {
					n.isFunction(this.st) ? this.v = this.st.call(s, this.v, this.nm, t) : (this.v = n(s).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, t), "avg" === this.st.toLowerCase() && this.sd && (this.vd = n(s).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, t)))
				},
				a = r.groupField.length, l = 0, u = 0; a > u; u++) o = r.groupField[u],
				c = r.displayField[u],
				f = t[o],
				e = null == c ? null: t[c],
				null == e && (e = f),
				void 0 !== f && (0 === i ? (r.groups.push({
					idx: u,
					dataIndex: o,
					value: f,
					displayValue: e,
					startRow: i,
					cnt: 1,
					summary: []
				}), r.lastvalues[u] = f, r.counters[u] = {
					cnt: 1,
					pos: r.groups.length - 1,
					summary: n.extend(!0, [], r.summary)
				},
				n.each(r.counters[u].summary, h), r.groups[r.counters[u].pos].summary = r.counters[u].summary) : "object" == typeof f || (n.isArray(r.isInTheSameGroup) && n.isFunction(r.isInTheSameGroup[u]) ? r.isInTheSameGroup[u].call(s, r.lastvalues[u], f, u, r) : r.lastvalues[u] === f) ? 1 === l ? (r.groups.push({
					idx: u,
					dataIndex: o,
					value: f,
					displayValue: e,
					startRow: i,
					cnt: 1,
					summary: []
				}), r.lastvalues[u] = f, r.counters[u] = {
					cnt: 1,
					pos: r.groups.length - 1,
					summary: n.extend(!0, [], r.summary)
				},
				n.each(r.counters[u].summary, h), r.groups[r.counters[u].pos].summary = r.counters[u].summary) : (r.counters[u].cnt += 1, r.groups[r.counters[u].pos].cnt = r.counters[u].cnt, n.each(r.counters[u].summary, h), r.groups[r.counters[u].pos].summary = r.counters[u].summary) : (r.groups.push({
					idx: u,
					dataIndex: o,
					value: f,
					displayValue: e,
					startRow: i,
					cnt: 1,
					summary: []
				}), r.lastvalues[u] = f, l = 1, r.counters[u] = {
					cnt: 1,
					pos: r.groups.length - 1,
					summary: n.extend(!0, [], r.summary)
				},
				n.each(r.counters[u].summary, h), r.groups[r.counters[u].pos].summary = r.counters[u].summary))
			}),
			this
		},
		groupingToggle: function(t) {
			return this.each(function() {
				var u = this,
				a = u.p.groupingView,
				o = t.split("_"),
				h = parseInt(o[o.length - 2], 10);
				o.splice(o.length - 2, 2);
				var r, c, v = o.join("_"),
				s = a.minusicon,
				l = a.plusicon,
				d = n("#" + n.jgrid.jqID(t)),
				i = d.length ? d[0].nextSibling: null,
				y = n("#" + n.jgrid.jqID(t) + " span.tree-wrap-" + u.p.direction),
				p = function(t) {
					var i = n.map(t.split(" "),
					function(n) {
						if (n.substring(0, v.length + 1) === v + "_") return parseInt(n.substring(v.length + 1), 10)
					});
					if (i.length > 0) return i[0]
				},
				w = !1,
				b = !1,
				e = u.p.frozenColumns ? u.p.id + "_frozen": !1,
				k = e ? n("#" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(e)) : !1,
				f = k && k.length ? k[0].nextSibling: null;
				if (y.hasClass(s)) {
					if (a.showSummaryOnHide) {
						if (i) for (; i && (r = p(i.className), !(void 0 !== r && h >= r));) n(i).hide(),
						i = i.nextSibling,
						e && (n(f).hide(), f = f.nextSibling)
					} else if (i) for (; i && (r = p(i.className), !(void 0 !== r && h >= r));) n(i).hide(),
					i = i.nextSibling,
					e && (n(f).hide(), f = f.nextSibling);
					y.removeClass(s).addClass(l);
					w = !0
				} else {
					if (i) for (c = void 0; i;) {
						if (r = p(i.className), void 0 === c && (c = void 0 === r), b = n(i).hasClass("ui-subgrid") && n(i).hasClass("ui-sg-collapsed"), void 0 !== r) {
							if (h >= r) break;
							r === h + 1 && (b || (n(i).show().find(">td>span.tree-wrap-" + u.p.direction).removeClass(s).addClass(l), e && n(f).show().find(">td>span.tree-wrap-" + u.p.direction).removeClass(s).addClass(l)))
						} else c && (b || (n(i).show(), e && n(f).show()));
						i = i.nextSibling;
						e && (f = f.nextSibling)
					}
					y.removeClass(l).addClass(s)
				}
				n(u).triggerHandler("jqGridGroupingClickGroup", [t, w]);
				n.isFunction(u.p.onClickGroup) && u.p.onClickGroup.call(u, t, w)
			}),
			!1
		},
		groupingRender: function(t, i, r, u) {
			return this.each(function() {
				function g(n, t, i) {
					var r, u = !1,
					f;
					if (0 === t) u = i[n];
					else if (f = i[n].idx, 0 === f) u = i[n];
					else for (r = n; r >= 0; r--) if (i[r].idx === f - t) {
						u = i[r];
						break
					}
					return u
				}
				function k(t, r, u, f) {
					for (var h, s = g(t, r, u), c = e.p.colModel, v = s.cnt, y = "", l, a, o = f; i > o; o++) l = "<td " + e.formatCol(o, 1, "") + ">&#160;<\/td>",
					a = "{0}",
					n.each(s.summary,
					function() {
						if (this.nm === c[o].name) {
							c[o].summaryTpl && (a = c[o].summaryTpl);
							"string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd: this.v && v > 0 && (this.v = this.v / v));
							try {
								this.groupCount = s.cnt;
								this.groupIndex = s.dataIndex;
								this.groupValue = s.value;
								h = e.formatter("", this.v, o, this)
							} catch(t) {
								h = this.v
							}
							return l = "<td " + e.formatCol(o, 1, "") + ">" + n.jgrid.template(a, h) + "<\/td>",
							!1
						}
					}),
					y += l;
					return y
				}
				var h, l, s, e = this,
				f = e.p.groupingView,
				o = "",
				y = "",
				p = f.groupCollapse ? f.plusicon: f.minusicon,
				w = [],
				d = f.groupField.length,
				a = n.jgrid.styleUI[e.p.styleUI || "jQueryUI"].common,
				v,
				c,
				b;
				p = p + " tree-wrap-" + e.p.direction;
				n.each(e.p.colModel,
				function(n, t) {
					for (var i = 0; d > i; i++) if (f.groupField[i] === t.name) {
						w[i] = n;
						break
					}
				});
				c = 0;
				b = n.makeArray(f.groupSummary);
				b.reverse();
				v = e.p.multiselect ? ' colspan="2"': "";
				n.each(f.groups,
				function(g, nt) {
					var tt, st, rt, ot;
					if (f._locgr && !(nt.startRow + nt.cnt > (r - 1) * u && nt.startRow < r * u)) return ! 0;
					c++;
					l = e.p.id + "ghead_" + nt.idx;
					h = l + "_" + g;
					y = "<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='" + a.icon_base + " " + p + "' onclick=\"jQuery('#" + n.jgrid.jqID(e.p.id) + "').jqGrid('groupingToggle','" + h + "');return false;\"><\/span>";
					try {
						n.isArray(f.formatDisplayField) && n.isFunction(f.formatDisplayField[nt.idx]) ? (nt.displayValue = f.formatDisplayField[nt.idx].call(e, nt.displayValue, nt.value, e.p.colModel[w[nt.idx]], nt.idx, f), s = nt.displayValue) : s = e.formatter(h, nt.displayValue, w[nt.idx], nt.value)
					} catch(lt) {
						s = nt.displayValue
					}
					if (tt = "", tt = n.isFunction(f.groupText[nt.idx]) ? f.groupText[nt.idx].call(e, s, nt.cnt, nt.summary) : n.jgrid.template(f.groupText[nt.idx], s, nt.cnt, nt.summary), "string" != typeof tt && "number" != typeof tt && (tt = s), "header" === f.groupSummaryPos[nt.idx] ? (o += '<tr id="' + h + '"' + (f.groupCollapse && nt.idx > 0 ? ' style="display:none;" ': " ") + 'role="row" class= "' + a.content + " jqgroup ui-row-" + e.p.direction + " " + l + '"><td style="padding-left:' + 12 * nt.idx + 'px;"' + v + ">" + y + tt + "<\/td>", o += k(g, 0, f.groups, f.groupColumnShow[nt.idx] === !1 ? "" === v ? 2 : 3 : "" === v ? 1 : 2), o += "<\/tr>") : o += '<tr id="' + h + '"' + (f.groupCollapse && nt.idx > 0 ? ' style="display:none;" ': " ") + 'role="row" class= "' + a.content + " jqgroup ui-row-" + e.p.direction + " " + l + '"><td style="padding-left:' + 12 * nt.idx + 'px;" colspan="' + (f.groupColumnShow[nt.idx] === !1 ? i - 1 : i) + '">' + y + tt + "<\/td><\/tr>", st = d - 1 === nt.idx, st) {
						var ut, it, et = f.groups[g + 1],
						ft = 0,
						ht = nt.startRow,
						ct = void 0 !== et ? et.startRow: f.groups[g].startRow + f.groups[g].cnt;
						for (f._locgr && (ft = (r - 1) * u, ft > nt.startRow && (ht = ft)), ut = ht; ct > ut && t[ut - ft]; ut++) o += t[ut - ft].join("");
						if ("header" !== f.groupSummaryPos[nt.idx]) {
							if (void 0 !== et) {
								for (rt = 0; rt < f.groupField.length && et.dataIndex !== f.groupField[rt]; rt++);
								c = f.groupField.length - rt
							}
							for (it = 0; c > it; it++) b[it] && (ot = "", f.groupCollapse && !f.showSummaryOnHide && (ot = ' style="display:none;"'), o += "<tr" + ot + ' jqfootlevel="' + (nt.idx - it) + '" role="row" class="' + a.content + " jqfoot ui-row-" + e.p.direction + '">', o += k(g, it, f.groups, 0), o += "<\/tr>");
							c = rt
						}
					}
				});
				n("#" + n.jgrid.jqID(e.p.id) + " tbody:first").append(o);
				o = null
			})
		},
		groupingGroupBy: function(t, i) {
			return this.each(function() {
				var f = this,
				u, r;
				for ("string" == typeof t && (t = [t]), u = f.p.groupingView, f.p.grouping = !0, u._locgr = !1, void 0 === u.visibiltyOnNextGrouping && (u.visibiltyOnNextGrouping = []), r = 0; r < u.groupField.length; r++) ! u.groupColumnShow[r] && u.visibiltyOnNextGrouping[r] && n(f).jqGrid("showCol", u.groupField[r]);
				for (r = 0; r < t.length; r++) u.visibiltyOnNextGrouping[r] = n("#" + n.jgrid.jqID(f.p.id) + "_" + n.jgrid.jqID(t[r])).is(":visible");
				f.p.groupingView = n.extend(f.p.groupingView, i || {});
				u.groupField = t;
				n(f).trigger("reloadGrid")
			})
		},
		groupingRemove: function(t) {
			return this.each(function() {
				var i = this,
				r, u;
				if (void 0 === t && (t = !0), i.p.grouping = !1, t === !0) {
					for (u = i.p.groupingView, r = 0; r < u.groupField.length; r++) ! u.groupColumnShow[r] && u.visibiltyOnNextGrouping[r] && n(i).jqGrid("showCol", u.groupField);
					n("tr.jqgroup, tr.jqfoot", "#" + n.jgrid.jqID(i.p.id) + " tbody:first").remove();
					n("tr.jqgrow:hidden", "#" + n.jgrid.jqID(i.p.id) + " tbody:first").show()
				} else n(i).trigger("reloadGrid")
			})
		},
		groupingCalculations: {
			handler: function(n, t, i, r, u, f) {
				var o = {
					sum: function() {
						return parseFloat(t || 0) + parseFloat(f[i] || 0)
					},
					min: function() {
						return "" === t ? parseFloat(f[i] || 0) : Math.min(parseFloat(t), parseFloat(f[i] || 0))
					},
					max: function() {
						return "" === t ? parseFloat(f[i] || 0) : Math.max(parseFloat(t), parseFloat(f[i] || 0))
					},
					count: function() {
						return "" === t && (t = 0),
						f.hasOwnProperty(i) ? t + 1 : 0
					},
					avg: function() {
						return o.sum()
					}
				},
				e,
				s;
				if (!o[n]) throw "jqGrid Grouping No such method: " + n;
				return e = o[n](),
				null != r && ("fixed" === u ? e = e.toFixed(r) : (s = Math.pow(10, r), e = Math.round(e * s) / s)),
				e
			}
		},
		setGroupHeaders: function(t) {
			return t = n.extend({
				useColSpanStyle: !1,
				groupHeaders: []
			},
			t || {}),
			this.each(function() {
				var r, l, s, f, e, a, k, u, v, p, d, h, g, y, i = this,
				w = 0,
				b = i.p.colModel,
				nt = b.length,
				tt = i.grid.headers,
				o = n("table.ui-jqgrid-htable", i.grid.hDiv),
				ft = o.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
				et = o.children("thead"),
				c = o.find(".jqg-first-row-header"),
				it = n.jgrid.styleUI[i.p.styleUI || "jQueryUI"].base,
				rt,
				ut;
				for (i.p.groupHeader || (i.p.groupHeader = []), i.p.groupHeader.push(t), void 0 === c[0] ? c = n("<tr>", {
					role: "row",
					"aria-hidden": "true"
				}).addClass("jqg-first-row-header").css("height", "auto") : c.empty(), ut = function(n, t) {
					for (var r = t.length,
					i = 0; r > i; i++) if (t[i].startColumnName === n) return i;
					return - 1
				},
				n(i).prepend(et), s = n("<tr>", {
					role: "row"
				}).addClass("ui-jqgrid-labels jqg-third-row-header"), r = 0; nt > r; r++) if (e = tt[r].el, a = n(e), l = b[r], k = {
					height: "0px",
					width: tt[r].width + "px",
					display: l.hidden ? "none": ""
				},
				n("<th>", {
					role: "gridcell"
				}).css(k).addClass("ui-first-th-" + i.p.direction).appendTo(c), e.style.width = "", u = ut(l.name, t.groupHeaders), u >= 0) {
					for (v = t.groupHeaders[u], p = v.numberOfColumns, d = v.titleText, g = v.className || "", h = 0, u = 0; p > u && nt > r + u; u++) b[r + u].hidden || h++;
					f = n("<th>").attr({
						role: "columnheader"
					}).addClass(it.headerBox + " ui-th-column-header ui-th-" + i.p.direction + " " + g).html(d);
					h > 0 && f.attr("colspan", String(h));
					i.p.headertitles && f.attr("title", f.text());
					0 === h && f.hide();
					a.before(f);
					s.append(e);
					w = p - 1
				} else 0 === w ? t.useColSpanStyle ? a.attr("rowspan", "2") : (n("<th>", {
					role: "columnheader"
				}).addClass(it.headerBox + " ui-th-column-header ui-th-" + i.p.direction).css({
					display: l.hidden ? "none": ""
				}).insertBefore(a), s.append(e)) : (s.append(e), w--);
				y = n(i).children("thead");
				y.prepend(c);
				s.insertAfter(ft);
				o.append(y);
				t.useColSpanStyle && (o.find("span.ui-jqgrid-resize").each(function() {
					var t = n(this).parent();
					t.is(":visible") && (this.style.cssText = "height: " + t.height() + "px !important; cursor: col-resize;")
				}), o.find("div.ui-jqgrid-sortable").each(function() {
					var t = n(this),
					i = t.parent();
					i.is(":visible") && i.is(":has(span.ui-jqgrid-resize)") && t.css("top", (i.height() - t.outerHeight()) / 2 - 4 + "px")
				}));
				rt = y.find("tr.jqg-first-row-header");
				n(i).bind("jqGridResizeStop.setGroupHeaders",
				function(n, t, i) {
					rt.find("th").eq(i).width(t)
				})
			})
		},
		destroyGroupHeader: function(t) {
			return void 0 === t && (t = !0),
			this.each(function() {
				var f, i, h, u, r, e, c, o = this,
				s = o.grid,
				l = n("table.ui-jqgrid-htable thead", s.hDiv),
				a = o.p.colModel;
				if (s) {
					for (n(this).unbind(".setGroupHeaders"), f = n("<tr>", {
						role: "row"
					}).addClass("ui-jqgrid-labels"), u = s.headers, i = 0, h = u.length; h > i; i++) {
						c = a[i].hidden ? "none": "";
						r = n(u[i].el).width(u[i].width).css("display", c);
						try {
							r.removeAttr("rowSpan")
						} catch(v) {
							r.attr("rowSpan", 1)
						}
						f.append(r);
						e = r.children("span.ui-jqgrid-resize");
						e.length > 0 && (e[0].style.height = "");
						r.children("div")[0].style.top = ""
					}
					n(l).children("tr.ui-jqgrid-labels").remove();
					n(l).prepend(f);
					t === !0 && n(o).jqGrid("setGridParam", {
						groupHeader: null
					})
				}
			})
		}
	}), n.jgrid = n.jgrid || {},
	n.extend(n.jgrid, {
		saveState: function(t, i) {
			if (i = n.extend({
				useStorage: !0,
				storageType: "localStorage",
				beforeSetItem: null,
				compression: !1,
				compressionModule: "LZString",
				compressionMethod: "compressToUTF16"
			},
			i || {}), t) {
				var f, e, u = "",
				o = "",
				r = n("#" + t)[0];
				if (r.grid) {
					if (e = n(r).data("inlineNav"), e && r.p.inlineNav && n(r).jqGrid("setGridParam", {
						_iN: e
					}), e = n(r).data("filterToolbar"), e && r.p.filterToolbar && n(r).jqGrid("setGridParam", {
						_fT: e
					}), u = n(r).jqGrid("jqGridExport", {
						exptype: "jsonstring",
						ident: "",
						root: ""
					}), n(r.grid.bDiv).find(".ui-jqgrid-btable tr:gt(0)").each(function(n, t) {
						o += t.outerHTML
					}), n.isFunction(i.beforeSetItem) && (f = i.beforeSetItem.call(r, u), null != f && (u = f)), i.compression && i.compressionModule) try {
						f = window[i.compressionModule][i.compressionMethod](u);
						null != f && (u = f, o = window[i.compressionModule][i.compressionMethod](o))
					} catch(s) {}
					if (i.useStorage && n.jgrid.isLocalStorage()) try {
						window[i.storageType].setItem("jqGrid" + r.p.id, u);
						window[i.storageType].setItem("jqGrid" + r.p.id + "_data", o)
					} catch(s) {
						22 === s.code && alert("Local storage limit is over!")
					}
					return u
				}
			}
		},
		loadState: function(t, i, r) {
			var u, s, h, c, l, o, e, a, f;
			if (r = n.extend({
				useStorage: !0,
				storageType: "localStorage",
				clearAfterLoad: !1,
				beforeSetGrid: null,
				decompression: !1,
				decompressionModule: "LZString",
				decompressionMethod: "decompressFromUTF16"
			},
			r || {}), t) {
				if (o = n("#" + t)[0], o.grid && n.jgrid.gridUnload(t), r.useStorage) try {
					i = window[r.storageType].getItem("jqGrid" + o.id);
					h = window[r.storageType].getItem("jqGrid" + o.id + "_data")
				} catch(v) {}
				if (i) {
					if (r.decompression && r.decompressionModule) try {
						u = window[r.decompressionModule][r.decompressionMethod](i);
						null != u && (i = u, h = window[r.decompressionModule][r.decompressionMethod](h))
					} catch(v) {} (u = jqGridUtils.parse(i), u && "object" === n.type(u)) ? (n.isFunction(r.beforeSetGrid) && (s = r.beforeSetGrid(u), s && "object" === n.type(s) && (u = s)), e = function(n) {
						return n
					},
					a = {
						reccount: u.reccount,
						records: u.records,
						lastpage: u.lastpage,
						shrinkToFit: e(u.shrinkToFit),
						data: e(u.data),
						datatype: e(u.datatype),
						grouping: e(u.grouping)
					},
					u.shrinkToFit = !1, u.data = [], u.datatype = "local", u.grouping = !1, u.navGrid = !1, u.inlineNav && (c = e(u._iN), u._iN = null, delete u._iN), u.filterToolbar && (l = e(u._fT), u._fT = null, delete u._fT), f = n("#" + t).jqGrid(u), f.append(h), f.jqGrid("setGridParam", a), u.storeNavOptions && f.jqGrid("navGrid", u.pager, u.navOptions, u.editOptions, u.addOptions, u.delOptions, u.searchOptions, u.viewOptions), u.inlineNav && c && (f.jqGrid("setGridParam", {
						inlineNav: !1
					}), f.jqGrid("inlineNav", u.pager, c)), u.filterToolbar && l && (f.jqGrid("setGridParam", {
						filterToolbar: !1
					}), f.jqGrid("filterToolbar", l)), f[0].updatepager(!0, !0), r.clearAfterLoad && (window[r.storageType].removeItem("jqGrid" + o.id), window[r.storageType].removeItem("jqGrid" + o.id + "_data"))) : alert("can not convert to object")
				}
			}
		},
		setRegional: function(t, i) {
			n.jgrid.saveState(t, {
				storageType: "sessionStorage"
			});
			n.jgrid.loadState(t, null, {
				storageType: "sessionStorage",
				beforeSetGrid: function(n) {
					return n.regional = i.regional,
					n.force_regional = !0,
					n
				}
			});
			var u = n("#" + t)[0],
			e = n(u).jqGrid("getGridParam", "colModel"),
			f = -1,
			r = n.jgrid.getRegional(u, "nav");
			n.each(e,
			function(n) {
				if (this.formatter && "actions" === this.formatter) return (f = n, !1)
			}); - 1 !== f && r && n("#" + t + " tbody tr").each(function() {
				var t = this.cells[f];
				n(t).find(".ui-inline-edit").attr("title", r.edittitle);
				n(t).find(".ui-inline-del").attr("title", r.deltitle);
				n(t).find(".ui-inline-save").attr("title", r.savetitle);
				n(t).find(".ui-inline-cancel").attr("title", r.canceltitle)
			});
			try {
				window.sessionStorage.removeItem("jqGrid" + u.id);
				window.sessionStorage.removeItem("jqGrid" + u.id + "_data")
			} catch(o) {}
		},
		jqGridImport: function(t, i) {
			var u;
			i = n.extend({
				imptype: "xml",
				impstring: "",
				impurl: "",
				mtype: "GET",
				impData: {},
				xmlGrid: {
					config: "root>grid",
					data: "root>rows"
				},
				jsonGrid: {
					config: "grid",
					data: "data"
				},
				ajaxOptions: {}
			},
			i || {});
			var r = (0 === t.indexOf("#") ? "": "#") + n.jgrid.jqID(t),
			f = function(t, i) {
				var u, f, e, s = n(i.xmlGrid.config, t)[0],
				h = n(i.xmlGrid.data, t)[0],
				o;
				if (jqGridUtils.xmlToJSON) {
					u = jqGridUtils.xmlToJSON(s);
					for (e in u) u.hasOwnProperty(e) && (f = u[e]);
					h ? (o = u.grid.datatype, u.grid.datatype = "xmlstring", u.grid.datastr = t, n(r).jqGrid(f).jqGrid("setGridParam", {
						datatype: o
					})) : setTimeout(function() {
						n(r).jqGrid(f)
					},
					0)
				} else alert("xml2json or parse are not present")
			},
			e = function(t, i) {
				var o;
				if (t && "string" == typeof t) {
					var f = jqGridUtils.parse(t),
					u = f[i.jsonGrid.config],
					e = f[i.jsonGrid.data];
					e ? (o = u.datatype, u.datatype = "jsonstring", u.datastr = e, n(r).jqGrid(u).jqGrid("setGridParam", {
						datatype: o
					})) : n(r).jqGrid(u)
				}
			};
			switch (i.imptype) {
			case "xml":
				n.ajax(n.extend({
					url:
					i.impurl,
					type: i.mtype,
					data: i.impData,
					dataType: "xml",
					complete: function(t, u) {
						"success" === u && (f(t.responseXML, i), n(r).triggerHandler("jqGridImportComplete", [t, i]), n.isFunction(i.importComplete) && i.importComplete(t));
						t = null
					}
				},
				i.ajaxOptions));
				break;
			case "xmlstring":
				i.impstring && "string" == typeof i.impstring && (u = n.parseXML(i.impstring), u && (f(u, i), n(r).triggerHandler("jqGridImportComplete", [u, i]), n.isFunction(i.importComplete) && i.importComplete(u)));
				break;
			case "json":
				n.ajax(n.extend({
					url:
					i.impurl,
					type: i.mtype,
					data: i.impData,
					dataType: "json",
					complete: function(t) {
						try {
							e(t.responseText, i);
							n(r).triggerHandler("jqGridImportComplete", [t, i]);
							n.isFunction(i.importComplete) && i.importComplete(t)
						} catch(u) {}
						t = null
					}
				},
				i.ajaxOptions));
				break;
			case "jsonstring":
				i.impstring && "string" == typeof i.impstring && (e(i.impstring, i), n(r).triggerHandler("jqGridImportComplete", [i.impstring, i]), n.isFunction(i.importComplete) && i.importComplete(i.impstring))
			}
		}
	}), n.jgrid.extend({
		jqGridExport: function(t) {
			t = n.extend({
				exptype: "xmlstring",
				root: "grid",
				ident: "\t",
				addOptions: {}
			},
			t || {});
			var i = null;
			return this.each(function() {
				if (this.grid) {
					var u, r = n.extend(!0, {},
					n(this).jqGrid("getGridParam"), t.addOptions);
					if (r.rownumbers && (r.colNames.splice(0, 1), r.colModel.splice(0, 1)), r.multiselect && (r.colNames.splice(0, 1), r.colModel.splice(0, 1)), r.subGrid && (r.colNames.splice(0, 1), r.colModel.splice(0, 1)), r.knv = null, r.treeGrid) for (u in r.treeReader) r.treeReader.hasOwnProperty(u) && (r.colNames.splice(r.colNames.length - 1), r.colModel.splice(r.colModel.length - 1));
					switch (t.exptype) {
					case "xmlstring":
						i = "<" + t.root + ">" + jqGridUtils.jsonToXML(r, {
							xmlDecl: ""
						}) + "<\/" + t.root + ">";
						break;
					case "jsonstring":
						i = jqGridUtils.stringify(r);
						t.root && (i = "{" + t.root + ":" + i + "}")
					}
				}
			}),
			i
		},
		excelExport: function(t) {
			return t = n.extend({
				exptype: "remote",
				url: null,
				oper: "oper",
				tag: "excel",
				exportOptions: {}
			},
			t || {}),
			this.each(function() {
				var u, i, r;
				this.grid && "remote" === t.exptype && (i = n.extend({},
				this.p.postData), i[t.oper] = t.tag, r = jQuery.param(i), u = -1 !== t.url.indexOf("?") ? t.url + "&" + r: t.url + "?" + r, window.location = u)
			})
		}
	}), n.jgrid.inlineEdit = n.jgrid.inlineEdit || {},
	n.jgrid.extend({
		editRow: function(t, i, r, u, f, e, o, s, h) {
			var c = {},
			l = n.makeArray(arguments).slice(1);
			return "object" === n.type(l[0]) ? c = l[0] : (void 0 !== i && (c.keys = i), n.isFunction(r) && (c.oneditfunc = r), n.isFunction(u) && (c.successfunc = u), void 0 !== f && (c.url = f), void 0 !== e && (c.extraparam = e), n.isFunction(o) && (c.aftersavefunc = o), n.isFunction(s) && (c.errorfunc = s), n.isFunction(h) && (c.afterrestorefunc = h)),
			c = n.extend(!0, {
				keys: !1,
				oneditfunc: null,
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: !0,
				mtype: "POST",
				focusField: !0
			},
			n.jgrid.inlineEdit, c),
			this.each(function() {
				var f, u, l, e, r, o, i = this,
				a = 0,
				s = null,
				h = {},
				v = n(this).jqGrid("getStyleUI", i.p.styleUI + ".inlinedit", "inputClass", !0);
				i.grid && (e = n(i).jqGrid("getInd", t, !0), e !== !1 && (o = n.isFunction(c.beforeEditRow) ? c.beforeEditRow.call(i, c, t) : void 0, void 0 === o && (o = !0), o && (l = n(e).attr("editable") || "0", "0" !== l || n(e).hasClass("not-editable-row") || (r = i.p.colModel, n('td[role="gridcell"]', e).each(function(e) {
					var c, l, o;
					if (f = r[e].name, c = i.p.treeGrid === !0 && f === i.p.ExpandColumn, c) u = n("span:first", this).html();
					else try {
						u = n.unformat.call(i, this, {
							rowId: t,
							colModel: r[e]
						},
						e)
					} catch(y) {
						u = r[e].edittype && "textarea" === r[e].edittype ? n(this).text() : n(this).html()
					}
					"cb" !== f && "subgrid" !== f && "rn" !== f && (i.p.autoencode && (u = n.jgrid.htmlDecode(u)), h[f] = u, r[e].editable === !0) && (null === s && (s = e), c ? n("span:first", this).html("") : n(this).html(""), l = n.extend({},
					r[e].editoptions || {},
					{
						id: t + "_" + f,
						name: f,
						rowId: t,
						oper: "edit"
					}), r[e].edittype || (r[e].edittype = "text"), ("&nbsp;" === u || "&#160;" === u || 1 === u.length && 160 === u.charCodeAt(0)) && (u = ""), o = n.jgrid.createEl.call(i, r[e].edittype, l, u, !0, n.extend({},
					n.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {})), n(o).addClass("editable inline-edit-cell"), n.inArray(r[e].edittype, ["text", "textarea", "password", "select"]) > -1 && n(o).addClass(v), c ? n("span:first", this).append(o) : n(this).append(o), n.jgrid.bindEv.call(i, o, l), "select" === r[e].edittype && void 0 !== r[e].editoptions && r[e].editoptions.multiple === !0 && void 0 === r[e].editoptions.dataUrl && n.jgrid.msie && n(o).width(n(o).width()), a++)
				}), a > 0 && (h.id = t, i.p.savedRow.push(h), n(e).attr("editable", "1"), c.focusField && ("number" == typeof c.focusField && parseInt(c.focusField, 10) <= r.length && (s = c.focusField), setTimeout(function() {
					var t = n("td:eq(" + s + ") :input:visible", e).not(":disabled");
					t.length > 0 && t.focus()
				},
				0)), c.keys === !0 && n(e).bind("keyup",
				function(r) {
					if (27 === r.keyCode) {
						if (n(i).jqGrid("restoreRow", t, c.afterrestorefunc), i.p.inlineNav) try {
							n(i).jqGrid("showAddEditButtons")
						} catch(f) {}
						return ! 1
					}
					if (13 === r.keyCode) {
						var u = r.target;
						if ("TEXTAREA" === u.tagName) return ! 0;
						if (n(i).jqGrid("saveRow", t, c) && i.p.inlineNav) try {
							n(i).jqGrid("showAddEditButtons")
						} catch(e) {}
						return ! 1
					}
				}), n(i).triggerHandler("jqGridInlineEditRow", [t, c]), n.isFunction(c.oneditfunc) && c.oneditfunc.call(i, t))))))
			})
		},
		saveRow: function(t, i, r, u, f, e, o) {
			var lt = n.makeArray(arguments).slice(1),
			h = {},
			s = this[0],
			a,
			et,
			ot,
			y,
			it,
			rt,
			ut,
			st,
			ht,
			nt,
			ct;
			"object" === n.type(lt[0]) ? h = lt[0] : (n.isFunction(i) && (h.successfunc = i), void 0 !== r && (h.url = r), void 0 !== u && (h.extraparam = u), n.isFunction(f) && (h.aftersavefunc = f), n.isFunction(e) && (h.errorfunc = e), n.isFunction(o) && (h.afterrestorefunc = o));
			h = n.extend(!0, {
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: !0,
				mtype: "POST",
				saveui: "enable",
				savetext: n.jgrid.getRegional(s, "defaults.savetext")
			},
			n.jgrid.inlineEdit, h);
			var l, at, w, b, v, k = !1,
			c = {},
			d = {},
			p = {},
			vt = !1,
			yt = n.trim(n(s).jqGrid("getStyleUI", s.p.styleUI + ".common", "error", !0));
			if (!s.grid || (v = n(s).jqGrid("getInd", t, !0), v === !1)) return k;
			var tt = n.jgrid.getRegional(this, "errors"),
			g = n.jgrid.getRegional(this, "edit"),
			ft = n.isFunction(h.beforeSaveRow) ? h.beforeSaveRow.call(s, h, t) : void 0;
			if (void 0 === ft && (ft = !0), ft) {
				if (at = n(v).attr("editable"), h.url = h.url || s.p.editurl, "1" === at) {
					if (n('td[role="gridcell"]', v).each(function(t) {
						var i, u, r;
						if (a = s.p.colModel[t], l = a.name, "cb" !== l && "subgrid" !== l && a.editable === !0 && "rn" !== l && !n(this).hasClass("not-editable-cell")) {
							switch (a.edittype) {
							case "checkbox":
								i = ["Yes", "No"];
								a.editoptions && (i = a.editoptions.value.split(":"));
								c[l] = n("input", this).is(":checked") ? i[0] : i[1];
								break;
							case "text":
							case "password":
							case "textarea":
							case "button":
								c[l] = n("input, textarea", this).val();
								break;
							case "select":
								a.editoptions.multiple ? (u = n("select", this), r = [], c[l] = n(u).val(), c[l] = c[l] ? c[l].join(",") : "", n("select option:selected", this).each(function(t, i) {
									r[t] = n(i).text()
								}), d[l] = r.join(",")) : (c[l] = n("select option:selected", this).val(), d[l] = n("select option:selected", this).text());
								a.formatter && "select" === a.formatter && (d = {});
								break;
							case "custom":
								try {
									if (!a.editoptions || !n.isFunction(a.editoptions.custom_value)) throw "e1";
									if (c[l] = a.editoptions.custom_value.call(s, n(".customelement", this), "get"), void 0 === c[l]) throw "e2";
								} catch(f) {
									"e1" === f ? n.jgrid.info_dialog(tt.errcap, "function 'custom_value' " + g.msg.nodefined, g.bClose, {
										styleUI: s.p.styleUI
									}) : n.jgrid.info_dialog(tt.errcap, f.message, g.bClose, {
										styleUI: s.p.styleUI
									})
								}
							}
							if (b = n.jgrid.checkValues.call(s, c[l], t), b[0] === !1) return ! 1;
							s.p.autoencode && (c[l] = n.jgrid.htmlEncode(c[l]));
							"clientArray" !== h.url && a.editoptions && a.editoptions.NullIfEmpty === !0 && "" === c[l] && (p[l] = "null", vt = !0)
						}
					}), b[0] === !1) {
						try {
							et = n(s).jqGrid("getGridRowById", t);
							ot = n.jgrid.findPos(et);
							n.jgrid.info_dialog(tt.errcap, b[1], g.bClose, {
								left: ot[0],
								top: ot[1] + n(et).outerHeight(),
								styleUI: s.p.styleUI
							})
						} catch(pt) {
							alert(b[1])
						}
						return k
					}
					if (it = s.p.prmNames, rt = t, (y = s.p.keyName === !1 ? it.id: s.p.keyName, c) && ((c[it.oper] = it.editoper, void 0 === c[y] || "" === c[y]) ? c[y] = t: v.id !== s.p.idPrefix + c[y] && (ut = n.jgrid.stripPref(s.p.idPrefix, t), (void 0 !== s.p._index[ut] && (s.p._index[c[y]] = s.p._index[ut], delete s.p._index[ut]), t = s.p.idPrefix + c[y], n(v).attr("id", t), s.p.selrow === rt && (s.p.selrow = t), n.isArray(s.p.selarrrow)) && (st = n.inArray(rt, s.p.selarrrow), st >= 0 && (s.p.selarrrow[st] = t)), s.p.multiselect && (ht = "jqg_" + s.p.id + "_" + t, n("input.cbox", v).attr("id", ht).attr("name", ht))), void 0 === s.p.inlineData && (s.p.inlineData = {}), c = n.extend({},
					c, s.p.inlineData, h.extraparam)), "clientArray" === h.url) {
						for (c = n.extend({},
						c, d), s.p.autoencode && n.each(c,
						function(t, i) {
							c[t] = n.jgrid.htmlDecode(i)
						}), ct = n(s).jqGrid("setRowData", t, c), n(v).attr("editable", "0"), nt = 0; nt < s.p.savedRow.length; nt++) if (String(s.p.savedRow[nt].id) === String(rt)) {
							w = nt;
							break
						}
						w >= 0 && s.p.savedRow.splice(w, 1);
						n(s).triggerHandler("jqGridInlineAfterSaveRow", [t, ct, c, h]);
						n.isFunction(h.aftersavefunc) && h.aftersavefunc.call(s, t, ct, c, h);
						k = !0;
						n(v).removeClass("jqgrid-new-row").unbind("keydown")
					} else n(s).jqGrid("progressBar", {
						method: "show",
						loadtype: h.saveui,
						htmlcontent: h.savetext
					}),
					p = n.extend({},
					c, p),
					p[y] = n.jgrid.stripPref(s.p.idPrefix, p[y]),
					n.ajax(n.extend({
						url: h.url,
						data: n.isFunction(s.p.serializeRowData) ? s.p.serializeRowData.call(s, p) : p,
						type: h.mtype,
						async: !1,
						complete: function(i, r) {
							if (n(s).jqGrid("progressBar", {
								method: "hide",
								loadtype: h.saveui,
								htmlcontent: h.savetext
							}), "success" === r) {
								var u, f, e = !0;
								if (u = n(s).triggerHandler("jqGridInlineSuccessSaveRow", [i, t, h]), n.isArray(u) || (u = [!0, p]), u[0] && n.isFunction(h.successfunc) && (u = h.successfunc.call(s, i)), n.isArray(u) ? (e = u[0], c = u[1] || c) : e = u, e === !0) {
									for (s.p.autoencode && n.each(c,
									function(t, i) {
										c[t] = n.jgrid.htmlDecode(i)
									}), vt && n.each(c,
									function(n) {
										"null" === c[n] && (c[n] = "")
									}), c = n.extend({},
									c, d), n(s).jqGrid("setRowData", t, c), n(v).attr("editable", "0"), f = 0; f < s.p.savedRow.length; f++) if (String(s.p.savedRow[f].id) === String(t)) {
										w = f;
										break
									}
									w >= 0 && s.p.savedRow.splice(w, 1);
									n(s).triggerHandler("jqGridInlineAfterSaveRow", [t, i, c, h]);
									n.isFunction(h.aftersavefunc) && h.aftersavefunc.call(s, t, i, c, h);
									k = !0;
									n(v).removeClass("jqgrid-new-row").unbind("keydown")
								} else n(s).triggerHandler("jqGridInlineErrorSaveRow", [t, i, r, null, h]),
								n.isFunction(h.errorfunc) && h.errorfunc.call(s, t, i, r, null),
								h.restoreAfterError === !0 && n(s).jqGrid("restoreRow", t, h.afterrestorefunc)
							}
						},
						error: function(i, r, u) {
							if (n("#lui_" + n.jgrid.jqID(s.p.id)).hide(), n(s).triggerHandler("jqGridInlineErrorSaveRow", [t, i, r, u, h]), n.isFunction(h.errorfunc)) h.errorfunc.call(s, t, i, r, u);
							else {
								var f = i.responseText || i.statusText;
								try {
									n.jgrid.info_dialog(tt.errcap, '<div class="' + yt + '">' + f + "<\/div>", g.bClose, {
										buttonalign: "right",
										styleUI: s.p.styleUI
									})
								} catch(e) {
									alert(f)
								}
							}
							h.restoreAfterError === !0 && n(s).jqGrid("restoreRow", t, h.afterrestorefunc)
						}
					},
					n.jgrid.ajaxOptions, s.p.ajaxRowOptions || {}))
				}
				return k
			}
		},
		restoreRow: function(t, i) {
			var u = n.makeArray(arguments).slice(1),
			r = {};
			return "object" === n.type(u[0]) ? r = u[0] : n.isFunction(i) && (r.afterrestorefunc = i),
			r = n.extend(!0, {},
			n.jgrid.inlineEdit, r),
			this.each(function() {
				var e, u, i = this,
				f = -1,
				s = {},
				o;
				if (i.grid && (e = n(i).jqGrid("getInd", t, !0), e !== !1) && (o = n.isFunction(r.beforeCancelRow) ? r.beforeCancelRow.call(i, r, t) : void 0, void 0 === o && (o = !0), o)) {
					for (u = 0; u < i.p.savedRow.length; u++) if (String(i.p.savedRow[u].id) === String(t)) {
						f = u;
						break
					}
					if (f >= 0) {
						if (n.isFunction(n.fn.datepicker)) try {
							n("input.hasDatepicker", "#" + n.jgrid.jqID(e.id)).datepicker("hide")
						} catch(h) {}
						n.each(i.p.colModel,
						function() {
							this.editable === !0 && i.p.savedRow[f].hasOwnProperty(this.name) && (s[this.name] = i.p.savedRow[f][this.name])
						});
						n(i).jqGrid("setRowData", t, s);
						n(e).attr("editable", "0").unbind("keydown");
						i.p.savedRow.splice(f, 1);
						n("#" + n.jgrid.jqID(t), "#" + n.jgrid.jqID(i.p.id)).hasClass("jqgrid-new-row") && setTimeout(function() {
							n(i).jqGrid("delRowData", t);
							n(i).jqGrid("showAddEditButtons")
						},
						0)
					}
					n(i).triggerHandler("jqGridInlineAfterRestoreRow", [t]);
					n.isFunction(r.afterrestorefunc) && r.afterrestorefunc.call(i, t)
				}
			})
		},
		addRow: function(t) {
			return t = n.extend(!0, {
				rowID: null,
				initdata: {},
				position: "first",
				useDefValues: !0,
				useFormatter: !1,
				addRowParams: {
					extraparam: {}
				}
			},
			t || {}),
			this.each(function() {
				var i, r, u, f;
				this.grid && (i = this, r = n.isFunction(t.beforeAddRow) ? t.beforeAddRow.call(i, t.addRowParams) : void 0, (void 0 === r && (r = !0), r) && ((t.rowID = n.isFunction(t.rowID) ? t.rowID.call(i, t) : null != t.rowID ? t.rowID: n.jgrid.randId(), t.useDefValues === !0 && n(i.p.colModel).each(function() {
					if (this.editoptions && this.editoptions.defaultValue) {
						var r = this.editoptions.defaultValue,
						u = n.isFunction(r) ? r.call(i) : r;
						t.initdata[this.name] = u
					}
				}), n(i).jqGrid("addRowData", t.rowID, t.initdata, t.position), t.rowID = i.p.idPrefix + t.rowID, n("#" + n.jgrid.jqID(t.rowID), "#" + n.jgrid.jqID(i.p.id)).addClass("jqgrid-new-row"), t.useFormatter) ? n("#" + n.jgrid.jqID(t.rowID) + " .ui-inline-edit", "#" + n.jgrid.jqID(i.p.id)).click() : (u = i.p.prmNames, f = u.oper, t.addRowParams.extraparam[f] = u.addoper, n(i).jqGrid("editRow", t.rowID, t.addRowParams), n(i).jqGrid("setSelection", t.rowID))))
			})
		},
		inlineNav: function(t, i) {
			var r = this[0],
			f = n.jgrid.getRegional(r, "nav"),
			u = n.jgrid.styleUI[r.p.styleUI].inlinedit;
			return i = n.extend(!0, {
				edit: !0,
				editicon: u.icon_edit_nav,
				add: !0,
				addicon: u.icon_add_nav,
				save: !0,
				saveicon: u.icon_save_nav,
				cancel: !0,
				cancelicon: u.icon_cancel_nav,
				addParams: {
					addRowParams: {
						extraparam: {}
					}
				},
				editParams: {},
				restoreAfterSelect: !0
			},
			f, i || {}),
			this.each(function() {
				var u, e, s, h, c, o;
				if (this.grid && !this.p.inlineNav) {
					if (u = n.jgrid.jqID(r.p.id), e = n.trim(n(r).jqGrid("getStyleUI", r.p.styleUI + ".common", "disabled", !0)), r.p.navGrid || n(r).jqGrid("navGrid", t, {
						refresh: !1,
						edit: !1,
						add: !1,
						del: !1,
						search: !1,
						view: !1
					}), n(r).data("inlineNav") || n(r).data("inlineNav", i), r.p.force_regional && (i = n.extend(i, f)), r.p.inlineNav = !0, i.addParams.useFormatter === !0) for (h = r.p.colModel, s = 0; s < h.length; s++) if (h[s].formatter && "actions" === h[s].formatter) {
						h[s].formatoptions && (c = {
							keys: !1,
							onEdit: null,
							onSuccess: null,
							afterSave: null,
							onError: null,
							afterRestore: null,
							extraparam: {},
							url: null
						},
						o = n.extend(c, h[s].formatoptions), i.addParams.addRowParams = {
							keys: o.keys,
							oneditfunc: o.onEdit,
							successfunc: o.onSuccess,
							url: o.url,
							extraparam: o.extraparam,
							aftersavefunc: o.afterSave,
							errorfunc: o.onError,
							afterrestorefunc: o.afterRestore
						});
						break
					}
					i.add && n(r).jqGrid("navButtonAdd", t, {
						caption: i.addtext,
						title: i.addtitle,
						buttonicon: i.addicon,
						id: r.p.id + "_iladd",
						onClickButton: function() {
							n(r).jqGrid("addRow", i.addParams);
							i.addParams.useFormatter || (n("#" + u + "_ilsave").removeClass(e), n("#" + u + "_ilcancel").removeClass(e), n("#" + u + "_iladd").addClass(e), n("#" + u + "_iledit").addClass(e))
						}
					});
					i.edit && n(r).jqGrid("navButtonAdd", t, {
						caption: i.edittext,
						title: i.edittitle,
						buttonicon: i.editicon,
						id: r.p.id + "_iledit",
						onClickButton: function() {
							var t = n(r).jqGrid("getGridParam", "selrow");
							t ? (n(r).jqGrid("editRow", t, i.editParams), n("#" + u + "_ilsave").removeClass(e), n("#" + u + "_ilcancel").removeClass(e), n("#" + u + "_iladd").addClass(e), n("#" + u + "_iledit").addClass(e)) : (n.jgrid.viewModal("#alertmod_" + u, {
								gbox: "#gbox_" + u,
								jqm: !0
							}), n("#jqg_alrt").focus())
						}
					});
					i.save && (n(r).jqGrid("navButtonAdd", t, {
						caption: i.savetext || "",
						title: i.savetitle || "Save row",
						buttonicon: i.saveicon,
						id: r.p.id + "_ilsave",
						onClickButton: function() {
							var t = r.p.savedRow[0].id;
							if (t) {
								var f = r.p.prmNames,
								e = f.oper,
								o = i.editParams;
								n("#" + n.jgrid.jqID(t), "#" + u).hasClass("jqgrid-new-row") ? (i.addParams.addRowParams.extraparam[e] = f.addoper, o = i.addParams.addRowParams) : (i.editParams.extraparam || (i.editParams.extraparam = {}), i.editParams.extraparam[e] = f.editoper);
								n(r).jqGrid("saveRow", t, o) && n(r).jqGrid("showAddEditButtons")
							} else n.jgrid.viewModal("#alertmod_" + u, {
								gbox: "#gbox_" + u,
								jqm: !0
							}),
							n("#jqg_alrt").focus()
						}
					}), n("#" + u + "_ilsave").addClass(e));
					i.cancel && (n(r).jqGrid("navButtonAdd", t, {
						caption: i.canceltext || "",
						title: i.canceltitle || "Cancel row editing",
						buttonicon: i.cancelicon,
						id: r.p.id + "_ilcancel",
						onClickButton: function() {
							var t = r.p.savedRow[0].id,
							f = i.editParams;
							t ? (n("#" + n.jgrid.jqID(t), "#" + u).hasClass("jqgrid-new-row") && (f = i.addParams.addRowParams), n(r).jqGrid("restoreRow", t, f), n(r).jqGrid("showAddEditButtons")) : (n.jgrid.viewModal("#alertmod", {
								gbox: "#gbox_" + u,
								jqm: !0
							}), n("#jqg_alrt").focus())
						}
					}), n("#" + u + "_ilcancel").addClass(e));
					i.restoreAfterSelect === !0 && n(r).bind("jqGridBeforeSelectRow.inlineNav",
					function(t, u) {
						r.p.savedRow.length > 0 && r.p.inlineNav === !0 && u !== r.p.selrow && null !== r.p.selrow && (r.p.selrow === i.addParams.rowID ? n(r).jqGrid("delRowData", r.p.selrow) : n(r).jqGrid("restoreRow", r.p.selrow, i.editParams), n(r).jqGrid("showAddEditButtons"))
					})
				}
			})
		},
		showAddEditButtons: function() {
			return this.each(function() {
				if (this.grid) {
					var t = n.jgrid.jqID(this.p.id),
					i = n.trim(n(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "disabled", !0));
					n("#" + t + "_ilsave").addClass(i);
					n("#" + t + "_ilcancel").addClass(i);
					n("#" + t + "_iladd").removeClass(i);
					n("#" + t + "_iledit").removeClass(i)
				}
			})
		}
	}), n.jgrid.msie && 8 === n.jgrid.msiever() && (n.expr[":"].hidden = function(n) {
		return 0 === n.offsetWidth || 0 === n.offsetHeight || "none" === n.style.display
	}), n.jgrid._multiselect = !1, n.ui && n.ui.multiselect) && (n.ui.multiselect.prototype._setSelected && (y = n.ui.multiselect.prototype._setSelected, n.ui.multiselect.prototype._setSelected = function(t, i) {
		var u = y.call(this, t, i),
		r;
		return i && this.selectedList && (r = this.element, this.selectedList.find("li").each(function() {
			n(this).data("optionLink") && n(this).data("optionLink").remove().appendTo(r)
		})),
		u
	}), n.ui.multiselect.prototype.destroy && (n.ui.multiselect.prototype.destroy = function() {
		this.element.show();
		this.container.remove();
		void 0 === n.Widget ? n.widget.prototype.destroy.apply(this, arguments) : n.Widget.prototype.destroy.apply(this, arguments)
	}), n.jgrid._multiselect = !0);
	n.jgrid.extend({
		sortableColumns: function(t) {
			return this.each(function() {
				function o() {
					i.p.disableClick = !0
				}
				var i = this,
				u = n.jgrid.jqID(i.p.id),
				r = {
					tolerance: "pointer",
					axis: "x",
					scrollSensitivity: "1",
					items: ">th:not(:has(#jqgh_" + u + "_cb,#jqgh_" + u + "_rn,#jqgh_" + u + "_subgrid),:hidden)",
					placeholder: {
						element: function(t) {
							return n(document.createElement(t[0].nodeName)).addClass(t[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0]
						},
						update: function(n, t) {
							t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10));
							t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10))
						}
					},
					update: function(t, r) {
						var e = n(r.item).parent(),
						o = n(">th", e),
						s = i.p.colModel,
						f = {},
						h = i.p.id + "_",
						u;
						n.each(s,
						function(n) {
							f[this.name] = n
						});
						u = [];
						o.each(function() {
							var t = n(">div", this).get(0).id.replace(/^jqgh_/, "").replace(h, "");
							f.hasOwnProperty(t) && u.push(f[t])
						});
						n(i).jqGrid("remapColumns", u, !0, !0);
						n.isFunction(i.p.sortable.update) && i.p.sortable.update(u);
						setTimeout(function() {
							i.p.disableClick = !1
						},
						50)
					}
				},
				s,
				f,
				e; (i.p.sortable.options ? n.extend(r, i.p.sortable.options) : n.isFunction(i.p.sortable) && (i.p.sortable = {
					update: i.p.sortable
				}), r.start) ? (s = r.start, r.start = function(n, t) {
					o();
					s.call(this, n, t)
				}) : r.start = o;
				i.p.sortable.exclude && (r.items += ":not(" + i.p.sortable.exclude + ")");
				f = t.sortable(r);
				e = f.data("sortable") || f.data("uiSortable");
				null != e && (e.data("sortable").floating = !0)
			})
		},
		columnChooser: function(t) {
			function y(n, t, i) {
				var r, u;
				return t >= 0 ? (r = n.slice(), u = r.splice(t, Math.max(n.length - t, t)), t > n.length && (t = n.length), r[t] = i, r.concat(u)) : n
			}
			function o(t, i) {
				t && ("string" == typeof t ? n.fn[t] && n.fn[t].apply(i, n.makeArray(arguments).slice(2)) : n.isFunction(t) && t.apply(i, n.makeArray(arguments).slice(2)))
			}
			var f, r, l, a, h, u, e, i = this,
			c = {},
			p = [],
			s = i.jqGrid("getGridParam", "colModel"),
			w = i.jqGrid("getGridParam", "colNames"),
			v = function(t) {
				return n.ui.multiselect.prototype && t.data(n.ui.multiselect.prototype.widgetFullName || n.ui.multiselect.prototype.widgetName) || t.data("ui-multiselect") || t.data("multiselect")
			},
			b = n.jgrid.getRegional(this[0], "col");
			if (!n("#colchooser_" + n.jgrid.jqID(i[0].p.id)).length) {
				if (f = n('<div id="colchooser_' + i[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"><\/select><\/div><\/div>'), r = n("select", f), t = n.extend({
					width: 400,
					height: 240,
					classname: null,
					done: function(n) {
						n && i.jqGrid("remapColumns", n, !0)
					},
					msel: "multiselect",
					dlog: "dialog",
					dialog_opts: {
						minWidth: 470,
						dialogClass: "ui-jqdialog"
					},
					dlog_opts: function(t) {
						var i = {};
						return i[t.bSubmit] = function() {
							t.apply_perm();
							t.cleanup(!1)
						},
						i[t.bCancel] = function() {
							t.cleanup(!0)
						},
						n.extend(!0, {
							buttons: i,
							close: function() {
								t.cleanup(!0)
							},
							modal: t.modal || !1,
							resizable: t.resizable || !0,
							width: t.width + 70,
							resize: function() {
								var n = v(r),
								t = n.container.closest(".ui-dialog-content");
								t.length > 0 && "object" == typeof t[0].style ? t[0].style.width = "": t.css("width", "");
								n.selectedList.height(Math.max(n.selectedContainer.height() - n.selectedActions.outerHeight() - 1, 1));
								n.availableList.height(Math.max(n.availableContainer.height() - n.availableActions.outerHeight() - 1, 1))
							}
						},
						t.dialog_opts || {})
					},
					apply_perm: function() {
						var u = [];
						n("option", r).each(function() {
							n(this).is("[selected]") ? i.jqGrid("showCol", s[this.value].name) : i.jqGrid("hideCol", s[this.value].name)
						});
						n("option[selected]", r).each(function() {
							u.push(parseInt(this.value, 10))
						});
						n.each(u,
						function() {
							delete c[s[parseInt(this, 10)].name]
						});
						n.each(c,
						function() {
							var n = parseInt(this, 10);
							u = y(u, n, n)
						});
						t.done && t.done.call(i, u);
						i.jqGrid("setGridWidth", i[0].p.width, i[0].p.shrinkToFit)
					},
					cleanup: function(n) {
						o(t.dlog, f, "destroy");
						o(t.msel, r, "destroy");
						f.remove();
						n && t.done && t.done.call(i)
					},
					msel_opts: {}
				},
				b, t || {}), n.ui && n.ui.multiselect && n.ui.multiselect.defaults) {
					if (!n.jgrid._multiselect) return void alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
					t.msel_opts = n.extend(n.ui.multiselect.defaults, t.msel_opts)
				}
				t.caption && f.attr("title", t.caption);
				t.classname && (f.addClass(t.classname), r.addClass(t.classname));
				t.width && (n(">div", f).css({
					width: t.width,
					margin: "0 auto"
				}), r.css("width", t.width));
				t.height && (n(">div", f).css("height", t.height), r.css("height", t.height - 10));
				r.empty();
				n.each(s,
				function(t) {
					return c[this.name] = t,
					this.hidedlg ? void(this.hidden || p.push(t)) : void r.append("<option value='" + t + "' " + (this.hidden ? "": "selected='selected'") + ">" + n.jgrid.stripHtml(w[t]) + "<\/option>")
				});
				l = n.isFunction(t.dlog_opts) ? t.dlog_opts.call(i, t) : t.dlog_opts;
				o(t.dlog, f, l);
				a = n.isFunction(t.msel_opts) ? t.msel_opts.call(i, t) : t.msel_opts;
				o(t.msel, r, a);
				h = n("#colchooser_" + n.jgrid.jqID(i[0].p.id));
				h.css({
					margin: "auto"
				});
				h.find(">div").css({
					width: "100%",
					height: "100%",
					margin: "auto"
				});
				u = v(r);
				u.container.css({
					width: "100%",
					height: "100%",
					margin: "auto"
				});
				u.selectedContainer.css({
					width: 100 * u.options.dividerLocation + "%",
					height: "100%",
					margin: "auto",
					boxSizing: "border-box"
				});
				u.availableContainer.css({
					width: 100 - 100 * u.options.dividerLocation + "%",
					height: "100%",
					margin: "auto",
					boxSizing: "border-box"
				});
				u.selectedList.css("height", "auto");
				u.availableList.css("height", "auto");
				e = Math.max(u.selectedList.height(), u.availableList.height());
				e = Math.min(e, n(window).height());
				u.selectedList.css("height", e);
				u.availableList.css("height", e)
			}
		},
		sortableRows: function(t) {
			return this.each(function() {
				var i = this;
				i.grid && (i.p.treeGrid || n.fn.sortable && (t = n.extend({
					cursor: "move",
					axis: "y",
					items: " > .jqgrow"
				},
				t || {}), t.start && n.isFunction(t.start) ? (t._start_ = t.start, delete t.start) : t._start_ = !1, t.update && n.isFunction(t.update) ? (t._update_ = t.update, delete t.update) : t._update_ = !1, t.start = function(r, u) {
					if (n(u.item).css("border-width", "0"), n("td", u.item).each(function(n) {
						this.style.width = i.grid.cols[n].style.width
					}), i.p.subGrid) {
						var f = n(u.item).attr("id");
						try {
							n(i).jqGrid("collapseSubGridRow", f)
						} catch(e) {}
					}
					t._start_ && t._start_.apply(this, [r, u])
				},
				t.update = function(r, u) {
					n(u.item).css("border-width", "");
					i.p.rownumbers === !0 && n("td.jqgrid-rownum", i.rows).each(function(t) {
						n(this).html(t + 1 + (parseInt(i.p.page, 10) - 1) * parseInt(i.p.rowNum, 10))
					});
					t._update_ && t._update_.apply(this, [r, u])
				},
				n("tbody:first", i).sortable(t), n("tbody:first > .jqgrow", i).disableSelection()))
			})
		},
		gridDnD: function(t) {
			return this.each(function() {
				function u() {
					var t = n.data(i, "dnd");
					n("tr.jqgrow:not(.ui-draggable)", i).draggable(n.isFunction(t.drag) ? t.drag.call(n(i), t) : t.drag)
				}
				var r, f, i = this,
				e;
				if (i.grid && !i.p.treeGrid && n.fn.draggable && n.fn.droppable) {
					if (e = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'><\/table>", void 0 === n("#jqgrid_dnd")[0] && n("body").append(e), "string" == typeof t && "updateDnD" === t && i.p.jqgdnd === !0) return void u();
					if (t = n.extend({
						drag: function(t) {
							return n.extend({
								start: function(r, u) {
									var f, e;
									if (i.p.subGrid) {
										e = n(u.helper).attr("id");
										try {
											n(i).jqGrid("collapseSubGridRow", e)
										} catch(o) {}
									}
									for (f = 0; f < n.data(i, "dnd").connectWith.length; f++) 0 === n(n.data(i, "dnd").connectWith[f]).jqGrid("getGridParam", "reccount") && n(n.data(i, "dnd").connectWith[f]).jqGrid("addRowData", "jqg_empty_row", {});
									u.helper.addClass("ui-state-highlight");
									n("td", u.helper).each(function(n) {
										this.style.width = i.grid.headers[n].width + "px"
									});
									t.onstart && n.isFunction(t.onstart) && t.onstart.call(n(i), r, u)
								},
								stop: function(r, u) {
									var f, e;
									for (u.helper.dropped && !t.dragcopy && (e = n(u.helper).attr("id"), void 0 === e && (e = n(this).attr("id")), n(i).jqGrid("delRowData", e)), f = 0; f < n.data(i, "dnd").connectWith.length; f++) n(n.data(i, "dnd").connectWith[f]).jqGrid("delRowData", "jqg_empty_row");
									t.onstop && n.isFunction(t.onstop) && t.onstop.call(n(i), r, u)
								}
							},
							t.drag_opts || {})
						},
						drop: function(t) {
							return n.extend({
								accept: function(t) {
									var i, r;
									return n(t).hasClass("jqgrow") ? (i = n(t).closest("table.ui-jqgrid-btable"), i.length > 0 && void 0 !== n.data(i[0], "dnd")) ? (r = n.data(i[0], "dnd").connectWith, -1 !== n.inArray("#" + n.jgrid.jqID(this.id), r) ? !0 : !1) : !1 : t
								},
								drop: function(r, u) {
									var l, f, o, s;
									if (n(u.draggable).hasClass("jqgrow")) {
										if (l = n(u.draggable).attr("id"), f = u.draggable.parent().parent().jqGrid("getRowData", l), !t.dropbyname) {
											var e, h, c = 0,
											a = {},
											v = n("#" + n.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
											try {
												for (h in f) f.hasOwnProperty(h) && (e = v[c].name, "cb" !== e && "rn" !== e && "subgrid" !== e && f.hasOwnProperty(h) && v[c] && (a[e] = f[h]), c++);
												f = a
											} catch(y) {}
										} (u.helper.dropped = !0, t.beforedrop && n.isFunction(t.beforedrop)) && (o = t.beforedrop.call(this, r, u, f, n("#" + n.jgrid.jqID(i.p.id)), n(this)), void 0 !== o && null !== o && "object" == typeof o && (f = o));
										u.helper.dropped && (t.autoid && (n.isFunction(t.autoid) ? s = t.autoid.call(this, f) : (s = Math.ceil(1e3 * Math.random()), s = t.autoidprefix + s)), n("#" + n.jgrid.jqID(this.id)).jqGrid("addRowData", s, f, t.droppos));
										t.ondrop && n.isFunction(t.ondrop) && t.ondrop.call(this, r, u, f)
									}
								}
							},
							t.drop_opts || {})
						},
						onstart: null,
						onstop: null,
						beforedrop: null,
						ondrop: null,
						drop_opts: {
							activeClass: "ui-state-active",
							hoverClass: "ui-state-hover"
						},
						drag_opts: {
							revert: "invalid",
							helper: "clone",
							cursor: "move",
							appendTo: "#jqgrid_dnd",
							zIndex: 5e3
						},
						dragcopy: !1,
						dropbyname: !1,
						droppos: "first",
						autoid: !0,
						autoidprefix: "dnd_"
					},
					t || {}), t.connectWith) for (t.connectWith = t.connectWith.split(","), t.connectWith = n.map(t.connectWith,
					function(t) {
						return n.trim(t)
					}), n.data(i, "dnd", t), 0 === i.p.reccount || i.p.jqgdnd || u(), i.p.jqgdnd = !0, r = 0; r < t.connectWith.length; r++) f = t.connectWith[r],
					n(f).droppable(n.isFunction(t.drop) ? t.drop.call(n(i), t) : t.drop)
				}
			})
		},
		gridResize: function(t) {
			return this.each(function() {
				var $t = this,
				gID = n.jgrid.jqID($t.p.id),
				req,
				optstest;
				$t.grid && n.fn.resizable && ((t = n.extend({},
				t || {}), t.alsoResize ? (t._alsoResize_ = t.alsoResize, delete t.alsoResize) : t._alsoResize_ = !1, t.stop && n.isFunction(t.stop) ? (t._stop_ = t.stop, delete t.stop) : t._stop_ = !1, t.stop = function(i, r) {
					n($t).jqGrid("setGridParam", {
						height: n("#gview_" + gID + " .ui-jqgrid-bdiv").height()
					});
					n($t).jqGrid("setGridWidth", r.size.width, t.shrinkToFit);
					t._stop_ && t._stop_.call($t, i, r);
					$t.p.caption && n("#gbox_" + gID).css({
						height: "auto"
					});
					$t.p.frozenColumns && (req && clearTimeout(req), req = setTimeout(function() {
						req && clearTimeout(req);
						n("#" + gID).jqGrid("destroyFrozenColumns");
						n("#" + gID).jqGrid("setFrozenColumns")
					}))
				},
				t._alsoResize_) ? (optstest = "{'#gview_" + gID + " .ui-jqgrid-bdiv':true,'" + t._alsoResize_ + "':true}", t.alsoResize = eval("(" + optstest + ")")) : t.alsoResize = n(".ui-jqgrid-bdiv", "#gview_" + gID), delete t._alsoResize_, n("#gbox_" + gID).resizable(t))
			})
		}
	});
	n.assocArraySize = function(n) {
		var t, i = 0;
		for (t in n) n.hasOwnProperty(t) && i++;
		return i
	};
	n.jgrid.extend({
		pivotSetup: function(t, i) {
			var u = [],
			e = [],
			h = [],
			s = [],
			c = [],
			o = {
				grouping: !0,
				groupingView: {
					groupField: [],
					groupSummary: [],
					groupSummaryPos: []
				}
			},
			f = [],
			r = n.extend({
				rowTotals: !1,
				rowTotalsText: "Total",
				colTotals: !1,
				groupSummary: !0,
				groupSummaryPos: "header",
				frozenStaticCols: !1
			},
			i || {});
			return this.each(function() {
				function wt(n, t, i) {
					var r;
					return r = d.call(n, t, i),
					r.length > 0 ? r[0] : null
				}
				function bt(n, t) {
					var i, r = 0,
					u = !0;
					for (i in n) if (n.hasOwnProperty(i)) {
						if (n[i] != this[r]) {
							u = !1;
							break
						}
						if (r++, r >= this.length) break
					}
					return u && (ft = t),
					u
				}
				function kt(n, t, i, r) {
					var u;
					switch (n) {
					case "sum":
						u = parseFloat(t || 0) + parseFloat(r[i] || 0);
						break;
					case "count":
						("" === t || null == t) && (t = 0);
						u = r.hasOwnProperty(i) ? t + 1 : 0;
						break;
					case "min":
						u = "" === t || null == t ? parseFloat(r[i] || 0) : Math.min(parseFloat(t), parseFloat(r[i] || 0));
						break;
					case "max":
						u = "" === t || null == t ? parseFloat(r[i] || 0) : Math.max(parseFloat(t), parseFloat(r[i] || 0))
					}
					return u
				}
				function ut(t, i, r, u) {
					var f, e, o, v, p = i.length,
					a = "",
					l = [],
					h,
					y;
					for (n.isArray(r) ? (v = r.length, l = r) : (v = 1, l[0] = r), s = [], c = [], s.root = 0, o = 0; v > o; o++) {
						for (y = [], f = 0; p > f; f++) {
							if (null == r) e = n.trim(i[f].member) + "_" + i[f].aggregator,
							h = e,
							l[0] = i[f].label || i[f].aggregator + " " + n.trim(i[f].member);
							else {
								h = r[o].replace(/\s+/g, "");
								try {
									e = 1 === p ? a + h: a + h + "_" + i[f].aggregator + "_" + String(f)
								} catch(w) {}
								l[o] = r[o]
							}
							e = isNaN(parseInt(e, 10)) ? e: e + " ";
							u[e] = y[e] = kt(i[f].aggregator, u[e], i[f].member, t);
							1 >= o && "_r_Totals" !== h && "" === a && (a = h)
						}
						s[e] = y;
						c[e] = l[o]
					}
					return u
				}
				function yt(n) {
					var e, o, t, h, i, s, c, l, v, y;
					for (t in n) if (n.hasOwnProperty(t)) {
						if ("object" != typeof n[t]) {
							if ("level" === t) {
								if (void 0 === ht[n.level] && (ht[n.level] = "", n.level > 0 && "_r_Totals" !== n.text && (f[n.level - 1] = {
									useColSpanStyle: !1,
									groupHeaders: []
								})), ht[n.level] !== n.text && n.children.length && "_r_Totals" !== n.text && n.level > 0) {
									if (f[n.level - 1].groupHeaders.push({
										titleText: n.label,
										numberOfColumns: 0
									}), s = f[n.level - 1].groupHeaders.length - 1, c = 0 === s ? gt: vt + rt, n.level - 1 == (r.rowTotals ? 1 : 0) && s > 0) {
										for (l = 0, v = 0; s > v; v++) l += f[n.level - 1].groupHeaders[v].numberOfColumns;
										l && (c = l + b)
									}
									u[c] && (f[n.level - 1].groupHeaders[s].startColumnName = u[c].name, f[n.level - 1].groupHeaders[s].numberOfColumns = u.length - c);
									vt = u.length
								}
								ht[n.level] = n.text
							}
							if (n.level === a && "level" === t && a > 0) if (rt > 1) {
								y = 1;
								for (e in n.fields) n.fields.hasOwnProperty(e) && (1 === y && f[a - 1].groupHeaders.push({
									startColumnName: e,
									numberOfColumns: 1,
									titleText: n.label || n.text
								}), y++);
								f[a - 1].groupHeaders[f[a - 1].groupHeaders.length - 1].numberOfColumns = y - 1
							} else f.splice(a - 1, 1)
						}
						if (null != n[t] && "object" == typeof n[t] && yt(n[t]), "level" === t && n.level > 0 && n.level === (0 === a ? n.level: a)) {
							o = 0;
							for (e in n.fields) if (n.fields.hasOwnProperty(e)) {
								i = {};
								for (h in r.aggregates[o]) if (r.aggregates[o].hasOwnProperty(h)) switch (h) {
								case "member":
								case "label":
								case "aggregator":
									break;
								default:
									i[h] = r.aggregates[o][h]
								}
								rt > 1 ? (i.name = e, i.label = r.aggregates[o].label || n.label) : (i.name = n.text, i.label = "_r_Totals" === n.text ? r.rowTotalsText: n.label);
								u.push(i);
								o++
							}
						}
					}
				}
				var p, ft, i, b, a, rt, k, g, dt = t.length,
				lt = 0,
				pt, et, ot, nt, tt, v, l, it, ct;
				if (r.rowTotals && r.yDimension.length > 0 && (pt = r.yDimension[0].dataName, r.yDimension.splice(0, 0, {
					dataName: pt
				}), r.yDimension[0].converter = function() {
					return "_r_Totals"
				}), b = n.isArray(r.xDimension) ? r.xDimension.length: 0, a = r.yDimension.length, rt = n.isArray(r.aggregates) ? r.aggregates.length: 0, 0 === b || 0 === rt) throw "xDimension or aggregates optiona are not set!";
				for (i = 0; b > i; i++) et = {
					name: r.xDimension[i].dataName,
					frozen: r.frozenStaticCols
				},
				null == r.xDimension[i].isGroupField && (r.xDimension[i].isGroupField = !0),
				et = n.extend(!0, et, r.xDimension[i]),
				u.push(et);
				for (ot = b - 1, nt = {}; dt > lt;) {
					p = t[lt];
					tt = [];
					v = [];
					k = {};
					i = 0;
					do tt[i] = n.trim(p[r.xDimension[i].dataName]),
					k[r.xDimension[i].dataName] = tt[i],
					i++;
					while (b > i);
					if (l = 0, ft = -1, g = wt(e, bt, tt)) {
						if (ft >= 0) {
							if (l = 0, a >= 1) {
								for (l = 0; a > l; l++) v[l] = n.trim(p[r.yDimension[l].dataName]),
								r.yDimension[l].converter && n.isFunction(r.yDimension[l].converter) && (v[l] = r.yDimension[l].converter.call(this, v[l], tt, v));
								g = ut(p, r.aggregates, v, g)
							} else 0 === a && (g = ut(p, r.aggregates, null, g));
							e[ft] = g
						}
					} else {
						if (l = 0, a >= 1) {
							for (l = 0; a > l; l++) v[l] = n.trim(p[r.yDimension[l].dataName]),
							r.yDimension[l].converter && n.isFunction(r.yDimension[l].converter) && (v[l] = r.yDimension[l].converter.call(this, v[l], tt, v));
							k = ut(p, r.aggregates, v, k)
						} else 0 === a && (k = ut(p, r.aggregates, null, k));
						e.push(k)
					}
					var w, at = 0,
					y = null,
					st = null;
					for (w in s) if (s.hasOwnProperty(w)) {
						if (0 === at) nt.children && void 0 !== nt.children || (nt = {
							text: w,
							level: 0,
							children: [],
							label: w
						}),
						y = nt.children;
						else {
							for (st = null, i = 0; i < y.length; i++) if (y[i].text === w) {
								st = y[i];
								break
							}
							st ? y = st.children: (y.push({
								children: [],
								text: w,
								level: at,
								fields: s[w],
								label: c[w]
							}), y = y[y.length - 1].children)
						}
						at++
					}
					lt++
				}
				var ht = [],
				vt = u.length,
				gt = vt;
				if (a > 0 && (f[a - 1] = {
					useColSpanStyle: !1,
					groupHeaders: []
				}), yt(nt), r.colTotals) for (ct = e.length; ct--;) for (i = b; i < u.length; i++) it = u[i].name,
				h[it] ? h[it] += parseFloat(e[ct][it] || 0) : h[it] = parseFloat(e[ct][it] || 0);
				if (ot > 0) for (i = 0; ot > i; i++) u[i].isGroupField && (o.groupingView.groupField.push(u[i].name), o.groupingView.groupSummary.push(r.groupSummary), o.groupingView.groupSummaryPos.push(r.groupSummaryPos));
				else o.grouping = !1;
				o.sortname = u[ot].name;
				o.groupingView.hideFirstGroupCol = !0
			}),
			{
				colModel: u,
				rows: e,
				groupOptions: o,
				groupHeaders: f,
				summary: h
			}
		},
		jqPivot: function(t, i, r, u) {
			return this.each(function() {
				function e(t) {
					for (var e = jQuery(f).jqGrid("pivotSetup", t, i), s = n.assocArraySize(e.summary) > 0 ? !0 : !1, h = n.jgrid.from.call(f, e.rows), o, u = 0; u < e.groupOptions.groupingView.groupField.length; u++) h.orderBy(e.groupOptions.groupingView.groupField[u], "a", "text", "");
					if (jQuery(f).jqGrid(n.extend(!0, {
						datastr: n.extend(h.select(), s ? {
							userdata: e.summary
						}: {}),
						datatype: "jsonstring",
						footerrow: s,
						userDataOnFooter: s,
						colModel: e.colModel,
						viewrecords: !0,
						sortname: i.xDimension[0].dataName
					},
					e.groupOptions, r || {})), o = e.groupHeaders, o.length) for (u = 0; u < o.length; u++) o[u] && o[u].groupHeaders.length && jQuery(f).jqGrid("setGroupHeaders", o[u]);
					i.frozenStaticCols && jQuery(f).jqGrid("setFrozenColumns")
				}
				var f = this;
				"string" == typeof t ? n.ajax(n.extend({
					url: t,
					dataType: "json",
					success: function(t) {
						e(n.jgrid.getAccessor(t, u && u.reader ? u.reader: "rows"))
					}
				},
				u || {})) : e(t)
			})
		}
	});
	n.jgrid.extend({
		setSubGrid: function() {
			return this.each(function() {
				var i, r, t = this,
				u = n.jgrid.styleUI[t.p.styleUI || "jQueryUI"].subgrid,
				f = {
					plusicon: u.icon_plus,
					minusicon: u.icon_minus,
					openicon: u.icon_open,
					expandOnLoad: !1,
					delayOnLoad: 50,
					selectOnExpand: !1,
					selectOnCollapse: !1,
					reloadOnExpand: !0
				};
				if (t.p.subGridOptions = n.extend(f, t.p.subGridOptions || {}), t.p.colNames.unshift(""), t.p.colModel.unshift({
					name: "subgrid",
					width: n.jgrid.cell_width ? t.p.subGridWidth + t.p.cellLayout: t.p.subGridWidth,
					sortable: !1,
					resizable: !1,
					hidedlg: !0,
					search: !1,
					fixed: !0
				}), i = t.p.subGridModel, i[0]) for (i[0].align = n.extend([], i[0].align || []), r = 0; r < i[0].name.length; r++) i[0].align[r] = i[0].align[r] || "left"
			})
		},
		addSubGridCell: function(t, i) {
			var r, u, f, e = "";
			return this.each(function() {
				e = this.formatCol(t, i);
				u = this.p.id;
				r = this.p.subGridOptions.plusicon;
				f = n.jgrid.styleUI[this.p.styleUI || "jQueryUI"].common
			}),
			'<td role="gridcell" aria-describedby="' + u + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + e + "><a style='cursor:pointer;' class='ui-sghref'><span class='" + f.icon_base + " " + r + "'><\/span><\/a><\/td>"
		},
		addSubGrid: function(t, i) {
			return this.each(function() {
				var r = this,
				a, s;
				if (r.grid) {
					var u, e, v, f, h, c = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].base,
					o = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].common,
					l = function(t, i, u) {
						var f = n("<td align='" + r.p.subGridModel[0].align[u] + "'><\/td>").html(i);
						n(t).append(f)
					},
					y = function(t, i) {
						for (var s, e, h = n("<table class='" + c.rowTable + " ui-common-table'><tbody><\/tbody><\/table>"), f = n("<tr><\/tr>"), a, u = 0; u < r.p.subGridModel[0].name.length; u++) s = n("<th class='" + c.headerBox + " ui-th-subgrid ui-th-column ui-th-" + r.p.direction + "'><\/th>"),
						n(s).html(r.p.subGridModel[0].name[u]),
						n(s).width(r.p.subGridModel[0].width[u]),
						n(f).append(s);
						return n(h).append(f),
						t && (e = r.p.xmlReader.subgrid, n(e.root + " " + e.row, t).each(function() {
							if (f = n("<tr class='" + o.content + " ui-subtblcell'><\/tr>"), e.repeatitems === !0) n(e.cell, this).each(function(t) {
								l(f, n(this).text() || "&#160;", t)
							});
							else {
								var t = r.p.subGridModel[0].mapping || r.p.subGridModel[0].name;
								if (t) for (u = 0; u < t.length; u++) l(f, n(t[u], this).text() || "&#160;", u)
							}
							n(h).append(f)
						})),
						a = n("table:first", r.grid.bDiv).attr("id") + "_",
						n("#" + n.jgrid.jqID(a + i)).append(h),
						r.grid.hDiv.loading = !1,
						n("#load_" + n.jgrid.jqID(r.p.id)).hide(),
						!1
					},
					p = function(t, i) {
						for (var a, v, e, h, u, p = n("<table class='" + c.rowTable + " ui-common-table'><tbody><\/tbody><\/table>"), s = n("<tr><\/tr>"), y, w, f = 0; f < r.p.subGridModel[0].name.length; f++) a = n("<th class='" + c.headerBox + " ui-th-subgrid ui-th-column ui-th-" + r.p.direction + "'><\/th>"),
						n(a).html(r.p.subGridModel[0].name[f]),
						n(a).width(r.p.subGridModel[0].width[f]),
						n(s).append(a);
						if (n(p).append(s), t && (h = r.p.jsonReader.subgrid, v = n.jgrid.getAccessor(t, h.root), void 0 !== v)) for (f = 0; f < v.length; f++) {
							if (e = v[f], s = n("<tr class='" + o.content + " ui-subtblcell'><\/tr>"), h.repeatitems === !0) for (h.cell && (e = e[h.cell]), u = 0; u < e.length; u++) l(s, e[u] || "&#160;", u);
							else if (y = r.p.subGridModel[0].mapping || r.p.subGridModel[0].name, y.length) for (u = 0; u < y.length; u++) l(s, e[y[u]] || "&#160;", u);
							n(p).append(s)
						}
						return w = n("table:first", r.grid.bDiv).attr("id") + "_",
						n("#" + n.jgrid.jqID(w + i)).append(p),
						r.grid.hDiv.loading = !1,
						n("#load_" + n.jgrid.jqID(r.p.id)).hide(),
						!1
					},
					b = function(t) {
						var f, i, u, e;
						if (f = n(t).attr("id"), i = {
							nd_: (new Date).getTime()
						},
						i[r.p.prmNames.subgridid] = f, !r.p.subGridModel[0]) return ! 1;
						if (r.p.subGridModel[0].params) for (e = 0; e < r.p.subGridModel[0].params.length; e++) for (u = 0; u < r.p.colModel.length; u++) r.p.colModel[u].name === r.p.subGridModel[0].params[e] && (i[r.p.colModel[u].name] = n("td:eq(" + u + ")", t).text().replace(/\&#160\;/gi, ""));
						if (!r.grid.hDiv.loading) switch (r.grid.hDiv.loading = !0, n("#load_" + n.jgrid.jqID(r.p.id)).show(), r.p.subgridtype || (r.p.subgridtype = r.p.datatype), n.isFunction(r.p.subgridtype) ? r.p.subgridtype.call(r, i) : r.p.subgridtype = r.p.subgridtype.toLowerCase(), r.p.subgridtype) {
						case "xml":
						case "json":
							n.ajax(n.extend({
								type:
								r.p.mtype,
								url: n.isFunction(r.p.subGridUrl) ? r.p.subGridUrl.call(r, i) : r.p.subGridUrl,
								dataType: r.p.subgridtype,
								data: n.isFunction(r.p.serializeSubGridData) ? r.p.serializeSubGridData.call(r, i) : i,
								complete: function(t) {
									"xml" === r.p.subgridtype ? y(t.responseXML, f) : p(n.jgrid.parse(t.responseText), f);
									t = null
								}
							},
							n.jgrid.ajaxOptions, r.p.ajaxSubgridOptions || {}))
						}
						return ! 1
					},
					w = 0;
					for (n.each(r.p.colModel,
					function() { (this.hidden === !0 || "rn" === this.name || "cb" === this.name) && w++
					}), a = r.rows.length, s = 1, void 0 !== i && i > 0 && (s = i, a = i + 1); a > s;) n(r.rows[s]).hasClass("jqgrow") && (r.p.scroll && n(r.rows[s].cells[t]).unbind("click"), n(r.rows[s].cells[t]).bind("click",
					function() {
						var i = n(this).parent("tr")[0];
						if (e = r.p.id, u = i.id, h = n("#" + e + "_" + u + "_expandedContent"), n(this).hasClass("sgcollapsed")) {
							if (f = n(r).triggerHandler("jqGridSubGridBeforeExpand", [e + "_" + u, u]), f = f === !1 || "stop" === f ? !1 : !0, f && n.isFunction(r.p.subGridBeforeExpand) && (f = r.p.subGridBeforeExpand.call(r, e + "_" + u, u)), f === !1) return ! 1;
							r.p.subGridOptions.reloadOnExpand === !0 || r.p.subGridOptions.reloadOnExpand === !1 && !h.hasClass("ui-subgrid") ? (v = t >= 1 ? "<td colspan='" + t + "'>&#160;<\/td>": "", n(i).after("<tr role='row' id='" + e + "_" + u + "_expandedContent' class='ui-subgrid ui-sg-expanded'>" + v + "<td class='" + o.content + " subgrid-cell'><span class='" + o.icon_base + " " + r.p.subGridOptions.openicon + "'><\/span><\/td><td colspan='" + parseInt(r.p.colNames.length - 1 - w, 10) + "' class='" + o.content + " subgrid-data'><div id=" + e + "_" + u + " class='tablediv'><\/div><\/td><\/tr>"), n(r).triggerHandler("jqGridSubGridRowExpanded", [e + "_" + u, u]), n.isFunction(r.p.subGridRowExpanded) ? r.p.subGridRowExpanded.call(r, e + "_" + u, u) : b(i)) : h.show().removeClass("ui-sg-collapsed").addClass("ui-sg-expanded");
							n(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + o.icon_base + " " + r.p.subGridOptions.minusicon + "'><\/span><\/a>").removeClass("sgcollapsed").addClass("sgexpanded");
							r.p.subGridOptions.selectOnExpand && n(r).jqGrid("setSelection", u)
						} else if (n(this).hasClass("sgexpanded")) {
							if (f = n(r).triggerHandler("jqGridSubGridRowColapsed", [e + "_" + u, u]), f = f === !1 || "stop" === f ? !1 : !0, f && n.isFunction(r.p.subGridRowColapsed) && (f = r.p.subGridRowColapsed.call(r, e + "_" + u, u)), f === !1) return ! 1;
							r.p.subGridOptions.reloadOnExpand === !0 ? h.remove(".ui-subgrid") : h.hasClass("ui-subgrid") && h.hide().addClass("ui-sg-collapsed").removeClass("ui-sg-expanded");
							n(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + o.icon_base + " " + r.p.subGridOptions.plusicon + "'><\/span><\/a>").removeClass("sgexpanded").addClass("sgcollapsed");
							r.p.subGridOptions.selectOnCollapse && n(r).jqGrid("setSelection", u)
						}
						return ! 1
					})),
					s++;
					r.p.subGridOptions.expandOnLoad === !0 && n(r.rows).filter(".jqgrow").each(function(t, i) {
						n(i.cells[0]).click()
					});
					r.subGridXml = function(n, t) {
						y(n, t)
					};
					r.subGridJson = function(n, t) {
						p(n, t)
					}
				}
			})
		},
		expandSubGridRow: function(t) {
			return this.each(function() {
				var u = this,
				i, r; (u.grid || t) && u.p.subGrid === !0 && (i = n(this).jqGrid("getInd", t, !0), i && (r = n("td.sgcollapsed", i)[0], r && n(r).trigger("click")))
			})
		},
		collapseSubGridRow: function(t) {
			return this.each(function() {
				var u = this,
				i, r; (u.grid || t) && u.p.subGrid === !0 && (i = n(this).jqGrid("getInd", t, !0), i && (r = n("td.sgexpanded", i)[0], r && n(r).trigger("click")))
			})
		},
		toggleSubGridRow: function(t) {
			return this.each(function() {
				var u = this,
				r, i; (u.grid || t) && u.p.subGrid === !0 && (r = n(this).jqGrid("getInd", t, !0), r && (i = n("td.sgcollapsed", r)[0], i ? n(i).trigger("click") : (i = n("td.sgexpanded", r)[0], i && n(i).trigger("click"))))
			})
		}
	});
	n.jgrid.extend({
		setTreeNode: function(t, i) {
			return this.each(function() {
				var r = this,
				b, k, d;
				if (r.grid && r.p.treeGrid) for (var p, w, e, c, l, o, u, a, v = r.p.expColInd,
				s = r.p.treeReader.expanded_field,
				f = r.p.treeReader.leaf_field,
				g = r.p.treeReader.level_field,
				y = r.p.treeReader.icon_field,
				h = r.p.treeReader.loaded,
				nt = n.jgrid.styleUI[r.p.styleUI || "jQueryUI"].common; i > t;) k = n.jgrid.stripPref(r.p.idPrefix, r.rows[t].id),
				d = r.p._index[k],
				u = r.p.data[d],
				"nested" === r.p.treeGridModel && (u[f] || (p = parseInt(u[r.p.treeReader.left_field], 10), w = parseInt(u[r.p.treeReader.right_field], 10), u[f] = w === p + 1 ? "true": "false", r.rows[t].cells[r.p._treeleafpos].innerHTML = u[f])),
				e = parseInt(u[g], 10),
				0 === r.p.tree_root_level ? (c = e + 1, l = e) : (c = e, l = e - 1),
				o = "<div class='tree-wrap tree-wrap-" + r.p.direction + "' style='width:" + 18 * c + "px;'>",
				o += "<div style='" + ("rtl" === r.p.direction ? "right:": "left:") + 18 * l + "px;' class='" + nt.icon_base + " ",
				void 0 !== u[h] && (u[h] = "true" === u[h] || u[h] === !0 ? !0 : !1),
				"true" === u[f] || u[f] === !0 ? (o += (void 0 !== u[y] && "" !== u[y] ? u[y] : r.p.treeIcons.leaf) + " tree-leaf treeclick", u[f] = !0, a = "leaf") : (u[f] = !1, a = ""),
				u[s] = ("true" === u[s] || u[s] === !0 ? !0 : !1) && (u[h] || void 0 === u[h]),
				o += u[s] === !1 ? u[f] === !0 ? "'": r.p.treeIcons.plus + " tree-plus treeclick'": u[f] === !0 ? "'": r.p.treeIcons.minus + " tree-minus treeclick'",
				o += "><\/div><\/div>",
				n(r.rows[t].cells[v]).wrapInner("<span class='cell-wrapper" + a + "'><\/span>").prepend(o),
				e !== parseInt(r.p.tree_root_level, 10) && (b = n(r).jqGrid("isVisibleNode", u), b || n(r.rows[t]).css("display", "none")),
				n(r.rows[t].cells[v]).find("div.treeclick").bind("click",
				function(t) {
					var u = t.target || t.srcElement,
					e = n.jgrid.stripPref(r.p.idPrefix, n(u, r.rows).closest("tr.jqgrow")[0].id),
					i = r.p._index[e];
					return r.p.data[i][f] || (r.p.data[i][s] ? (n(r).jqGrid("collapseRow", r.p.data[i]), n(r).jqGrid("collapseNode", r.p.data[i])) : (n(r).jqGrid("expandRow", r.p.data[i]), n(r).jqGrid("expandNode", r.p.data[i]))),
					!1
				}),
				r.p.ExpandColClick === !0 && n(r.rows[t].cells[v]).find("span.cell-wrapper").css("cursor", "pointer").bind("click",
				function(t) {
					var e = t.target || t.srcElement,
					u = n.jgrid.stripPref(r.p.idPrefix, n(e, r.rows).closest("tr.jqgrow")[0].id),
					i = r.p._index[u];
					return r.p.data[i][f] || (r.p.data[i][s] ? (n(r).jqGrid("collapseRow", r.p.data[i]), n(r).jqGrid("collapseNode", r.p.data[i])) : (n(r).jqGrid("expandRow", r.p.data[i]), n(r).jqGrid("expandNode", r.p.data[i]))),
					n(r).jqGrid("setSelection", u),
					!1
				}),
				t++
			})
		},
		setTreeGrid: function() {
			return this.each(function() {
				var u, i, f, e, t = this,
				r = 0,
				s = !1,
				h = [],
				o = n.jgrid.styleUI[t.p.styleUI || "jQueryUI"].treegrid;
				if (t.p.treeGrid) {
					t.p.treedatatype || n.extend(t.p, {
						treedatatype: t.p.datatype
					});
					t.p.loadonce && (t.p.treedatatype = "local");
					t.p.subGrid = !1;
					t.p.altRows = !1;
					t.p.pgbuttons = !1;
					t.p.pginput = !1;
					t.p.gridview = !0;
					null === t.p.rowTotal && (t.p.rowNum = 1e4);
					t.p.multiselect = !1;
					t.p.rowList = [];
					t.p.expColInd = 0;
					u = o.icon_plus;
					"jQueryUI" === t.p.styleUI && (u += "rtl" === t.p.direction ? "w": "e");
					t.p.treeIcons = n.extend({
						plus: u,
						minus: o.icon_minus,
						leaf: o.icon_leaf
					},
					t.p.treeIcons || {});
					"nested" === t.p.treeGridModel ? t.p.treeReader = n.extend({
						level_field: "level",
						left_field: "lft",
						right_field: "rgt",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					},
					t.p.treeReader) : "adjacency" === t.p.treeGridModel && (t.p.treeReader = n.extend({
						level_field: "level",
						parent_id_field: "parent",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					},
					t.p.treeReader));
					for (f in t.p.colModel) if (t.p.colModel.hasOwnProperty(f)) {
						i = t.p.colModel[f].name;
						i !== t.p.ExpandColumn || s || (s = !0, t.p.expColInd = r);
						r++;
						for (e in t.p.treeReader) t.p.treeReader.hasOwnProperty(e) && t.p.treeReader[e] === i && h.push(i)
					}
					n.each(t.p.treeReader,
					function(i, u) {
						u && -1 === n.inArray(u, h) && ("leaf_field" === i && (t.p._treeleafpos = r), r++, t.p.colNames.push(u), t.p.colModel.push({
							name: u,
							width: 1,
							hidden: !0,
							sortable: !1,
							resizable: !1,
							hidedlg: !0,
							editable: !0,
							search: !1
						}))
					})
				}
			})
		},
		expandRow: function(t) {
			this.each(function() {
				var i = this;
				if (i.grid && i.p.treeGrid) {
					var r = n(i).jqGrid("getNodeChildren", t),
					f = i.p.treeReader.expanded_field,
					u = t[i.p.localReader.id],
					e = n.isFunction(i.p.beforeExpandTreeGridRow) ? i.p.beforeExpandTreeGridRow.call(i, u, t, r) : !0;
					e !== !1 && (n(r).each(function() {
						var t = i.p.idPrefix + n.jgrid.getAccessor(this, i.p.localReader.id);
						n(n(i).jqGrid("getGridRowById", t)).css("display", "");
						this[f] && n(i).jqGrid("expandRow", this)
					}), n.isFunction(i.p.afterExpandTreeGridRow) && i.p.afterExpandTreeGridRow.call(i, u, t, r))
				}
			})
		},
		collapseRow: function(t) {
			this.each(function() {
				var i = this;
				if (i.grid && i.p.treeGrid) {
					var r = n(i).jqGrid("getNodeChildren", t),
					f = i.p.treeReader.expanded_field,
					u = t[i.p.localReader.id],
					e = n.isFunction(i.p.beforeCollapseTreeGridRow) ? i.p.beforeCollapseTreeGridRow.call(i, u, t, r) : !0;
					e !== !1 && (n(r).each(function() {
						var t = i.p.idPrefix + n.jgrid.getAccessor(this, i.p.localReader.id);
						n(n(i).jqGrid("getGridRowById", t)).css("display", "none");
						this[f] && n(i).jqGrid("collapseRow", this)
					}), n.isFunction(i.p.afterCollapseTreeGridRow) && i.p.afterCollapseTreeGridRow.call(i, u, t, r))
				}
			})
		},
		getRootNodes: function(t) {
			var i = [];
			return this.each(function() {
				var e, u, f, r = this;
				if (r.grid && r.p.treeGrid) switch ("boolean" != typeof t && (t = !1), f = t ? n(r).jqGrid("getRowData", null, !0) : r.p.data, r.p.treeGridModel) {
				case "nested":
					e = r.p.treeReader.level_field;
					n(f).each(function() {
						parseInt(this[e], 10) === parseInt(r.p.tree_root_level, 10) && i.push(t ? r.p.data[r.p._index[this[r.p.keyName]]] : this)
					});
					break;
				case "adjacency":
					u = r.p.treeReader.parent_id_field;
					n(f).each(function() { (null === this[u] || "null" === String(this[u]).toLowerCase()) && i.push(t ? r.p.data[r.p._index[this[r.p.keyName]]] : this)
					})
				}
			}),
			i
		},
		getNodeDepth: function(t) {
			var i = null;
			return this.each(function() {
				var r, u;
				if (this.grid && this.p.treeGrid) {
					r = this;
					switch (r.p.treeGridModel) {
					case "nested":
						u = r.p.treeReader.level_field;
						i = parseInt(t[u], 10) - parseInt(r.p.tree_root_level, 10);
						break;
					case "adjacency":
						i = n(r).jqGrid("getNodeAncestors", t).length
					}
				}
			}),
			i
		},
		getNodeParent: function(t) {
			var i = null;
			return this.each(function() {
				var r = this;
				if (r.grid && r.p.treeGrid) switch (r.p.treeGridModel) {
				case "nested":
					var f = r.p.treeReader.left_field,
					e = r.p.treeReader.right_field,
					o = r.p.treeReader.level_field,
					h = parseInt(t[f], 10),
					c = parseInt(t[e], 10),
					l = parseInt(t[o], 10);
					n(this.p.data).each(function() {
						if (parseInt(this[o], 10) === l - 1 && parseInt(this[f], 10) < h && parseInt(this[e], 10) > c) return (i = this, !1)
					});
					break;
				case "adjacency":
					for (var a = r.p.treeReader.parent_id_field,
					s = r.p.localReader.id,
					v = t[s], u = r.p._index[v]; u--;) if (r.p.data[u][s] === n.jgrid.stripPref(r.p.idPrefix, t[a])) {
						i = r.p.data[u];
						break
					}
				}
			}),
			i
		},
		getNodeChildren: function(t) {
			var i = [];
			return this.each(function() {
				var r = this,
				o, s;
				if (r.grid && r.p.treeGrid) switch (r.p.treeGridModel) {
				case "nested":
					var u = r.p.treeReader.left_field,
					f = r.p.treeReader.right_field,
					e = r.p.treeReader.level_field,
					h = parseInt(t[u], 10),
					c = parseInt(t[f], 10),
					l = parseInt(t[e], 10);
					n(this.p.data).each(function() {
						parseInt(this[e], 10) === l + 1 && parseInt(this[u], 10) > h && parseInt(this[f], 10) < c && i.push(this)
					});
					break;
				case "adjacency":
					o = r.p.treeReader.parent_id_field;
					s = r.p.localReader.id;
					n(this.p.data).each(function() {
						this[o] == n.jgrid.stripPref(r.p.idPrefix, t[s]) && i.push(this)
					})
				}
			}),
			i
		},
		getFullTreeNode: function(t, i) {
			var r = [];
			return this.each(function() {
				var e, u = this,
				o = u.p.treeReader.expanded_field,
				h, c;
				if (u.grid && u.p.treeGrid) switch ((null == i || "boolean" != typeof i) && (i = !1), u.p.treeGridModel) {
				case "nested":
					var f = u.p.treeReader.left_field,
					l = u.p.treeReader.right_field,
					s = u.p.treeReader.level_field,
					a = parseInt(t[f], 10),
					v = parseInt(t[l], 10),
					y = parseInt(t[s], 10);
					n(this.p.data).each(function() {
						parseInt(this[s], 10) >= y && parseInt(this[f], 10) >= a && parseInt(this[f], 10) <= v && (i && (this[o] = !0), r.push(this))
					});
					break;
				case "adjacency":
					t && (r.push(t), h = u.p.treeReader.parent_id_field, c = u.p.localReader.id, n(this.p.data).each(function(t) {
						for (e = r.length, t = 0; e > t; t++) if (n.jgrid.stripPref(u.p.idPrefix, r[t][c]) === this[h]) {
							i && (this[o] = !0);
							r.push(this);
							break
						}
					}))
				}
			}),
			r
		},
		getNodeAncestors: function(t) {
			var i = [];
			return this.each(function() {
				if (this.grid && this.p.treeGrid) for (var r = n(this).jqGrid("getNodeParent", t); r;) i.push(r),
				r = n(this).jqGrid("getNodeParent", r)
			}),
			i
		},
		isVisibleNode: function(t) {
			var i = !0;
			return this.each(function() {
				var r = this,
				u, f;
				r.grid && r.p.treeGrid && (u = n(r).jqGrid("getNodeAncestors", t), f = r.p.treeReader.expanded_field, n(u).each(function() {
					return i = i && this[f],
					i ? void 0 : !1
				}))
			}),
			i
		},
		isNodeLoaded: function(t) {
			var i;
			return this.each(function() {
				var r = this,
				f, u;
				r.grid && r.p.treeGrid && (f = r.p.treeReader.leaf_field, u = r.p.treeReader.loaded, i = void 0 !== t ? void 0 !== t[u] ? t[u] : t[f] || n(r).jqGrid("getNodeChildren", t).length > 0 ? !0 : !1 : !1)
			}),
			i
		},
		reloadNode: function(t) {
			return this.each(function() {
				var u, i;
				if (this.grid && this.p.treeGrid) {
					u = this.p.localReader.id;
					i = this.p.selrow;
					n(this).jqGrid("delChildren", t[u]);
					var o = this.p.treeReader.expanded_field,
					s = this.p.treeReader.parent_id_field,
					h = this.p.treeReader.loaded,
					f = this.p.treeReader.level_field,
					c = this.p.treeReader.left_field,
					l = this.p.treeReader.right_field,
					r = n.jgrid.getAccessor(t, this.p.localReader.id),
					e = n("#" + r, this.grid.bDiv)[0];
					t[o] = !0;
					n("div.treeclick", e).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus");
					this.p.treeANode = e.rowIndex;
					this.p.datatype = this.p.treedatatype;
					"nested" === this.p.treeGridModel ? n(this).jqGrid("setGridParam", {
						postData: {
							nodeid: r,
							n_left: t[c],
							n_right: t[l],
							n_level: t[f]
						}
					}) : n(this).jqGrid("setGridParam", {
						postData: {
							nodeid: r,
							parentid: t[s],
							n_level: t[f]
						}
					});
					n(this).trigger("reloadGrid");
					t[h] = !0;
					"nested" === this.p.treeGridModel ? n(this).jqGrid("setGridParam", {
						selrow: i,
						postData: {
							nodeid: "",
							n_left: "",
							n_right: "",
							n_level: ""
						}
					}) : n(this).jqGrid("setGridParam", {
						selrow: i,
						postData: {
							nodeid: "",
							parentid: "",
							n_level: ""
						}
					})
				}
			})
		},
		expandNode: function(t) {
			return this.each(function() {
				if (this.grid && this.p.treeGrid) {
					var r = this.p.treeReader.expanded_field,
					e = this.p.treeReader.parent_id_field,
					o = this.p.treeReader.loaded,
					f = this.p.treeReader.level_field,
					s = this.p.treeReader.left_field,
					h = this.p.treeReader.right_field;
					if (!t[r]) {
						var i = n.jgrid.getAccessor(t, this.p.localReader.id),
						u = n("#" + this.p.idPrefix + n.jgrid.jqID(i), this.grid.bDiv)[0],
						c = this.p._index[i],
						l = n.isFunction(this.p.beforeExpandTreeGridNode) ? this.p.beforeExpandTreeGridNode.call(this, i, t) : !0;
						if (l === !1) return;
						n(this).jqGrid("isNodeLoaded", this.p.data[c]) ? (t[r] = !0, n("div.treeclick", u).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (t[r] = !0, n("div.treeclick", u).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = u.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? n(this).jqGrid("setGridParam", {
							postData: {
								nodeid: i,
								n_left: t[s],
								n_right: t[h],
								n_level: t[f]
							}
						}) : n(this).jqGrid("setGridParam", {
							postData: {
								nodeid: i,
								parentid: t[e],
								n_level: t[f]
							}
						}), n(this).trigger("reloadGrid"), t[o] = !0, "nested" === this.p.treeGridModel ? n(this).jqGrid("setGridParam", {
							postData: {
								nodeid: "",
								n_left: "",
								n_right: "",
								n_level: ""
							}
						}) : n(this).jqGrid("setGridParam", {
							postData: {
								nodeid: "",
								parentid: "",
								n_level: ""
							}
						}));
						n.isFunction(this.p.afterExpandTreeGridNode) && this.p.afterExpandTreeGridNode.call(this, i, t)
					}
				}
			})
		},
		collapseNode: function(t) {
			return this.each(function() {
				var i;
				if (this.grid && this.p.treeGrid && (i = this.p.treeReader.expanded_field, t[i])) {
					var r = n.jgrid.getAccessor(t, this.p.localReader.id),
					u = n.isFunction(this.p.beforeCollapseTreeGridNode) ? this.p.beforeCollapseTreeGridNode.call(this, r, t) : !0,
					f = n("#" + this.p.idPrefix + n.jgrid.jqID(r), this.grid.bDiv)[0];
					if (t[i] = !1, u === !1) return;
					n("div.treeclick", f).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus");
					n.isFunction(this.p.afterCollapseTreeGridNode) && this.p.afterCollapseTreeGridNode.call(this, r, t)
				}
			})
		},
		SortTree: function(t, i, r, u) {
			return this.each(function() {
				if (this.grid && this.p.treeGrid) {
					var f, l, c, e, o, s = [],
					h = this,
					a = n(this).jqGrid("getRootNodes", h.p.search);
					for (e = n.jgrid.from.call(this, a), e.orderBy(t, i, r, u), o = e.select(), f = 0, l = o.length; l > f; f++) c = o[f],
					s.push(c),
					n(this).jqGrid("collectChildrenSortTree", s, c, t, i, r, u);
					n.each(s,
					function(t) {
						var i = n.jgrid.getAccessor(this, h.p.localReader.id);
						n("#" + n.jgrid.jqID(h.p.id) + " tbody tr:eq(" + t + ")").after(n("tr#" + n.jgrid.jqID(i), h.grid.bDiv))
					});
					e = null;
					o = null;
					s = null
				}
			})
		},
		searchTree: function(t) {
			var r, e, u, o = t.length || 0,
			i = [],
			s = [],
			f = [];
			return this.each(function() {
				if (this.grid && this.p.treeGrid && o) for (e = this.p.localReader.id, r = 0; o > r; r++) i = n(this).jqGrid("getNodeAncestors", t[r]),
				i.length || i.push(t[r]),
				u = i[i.length - 1][e],
				-1 === n.inArray(u, s) && (s.push(u), i = n(this).jqGrid("getFullTreeNode", i[i.length - 1], !0), f = f.concat(i))
			}),
			f
		},
		collectChildrenSortTree: function(t, i, r, u, f, e) {
			return this.each(function() {
				if (this.grid && this.p.treeGrid) {
					var o, l, s, a, h, c;
					for (a = n(this).jqGrid("getNodeChildren", i), h = n.jgrid.from.call(this, a), h.orderBy(r, u, f, e), c = h.select(), o = 0, l = c.length; l > o; o++) s = c[o],
					t.push(s),
					n(this).jqGrid("collectChildrenSortTree", t, s, r, u, f, e)
				}
			})
		},
		setTreeRow: function(t, i) {
			var r = !1;
			return this.each(function() {
				var u = this;
				u.grid && u.p.treeGrid && (r = n(u).jqGrid("setRowData", t, i))
			}),
			r
		},
		delTreeNode: function(t) {
			return this.each(function() {
				var e, o, l, r, u, i = this,
				a = i.p.localReader.id,
				s = i.p.treeReader.left_field,
				h = i.p.treeReader.right_field,
				f, c;
				if (i.grid && i.p.treeGrid && (f = i.p._index[t], void 0 !== f)) {
					if (o = parseInt(i.p.data[f][h], 10), l = o - parseInt(i.p.data[f][s], 10) + 1, c = n(i).jqGrid("getFullTreeNode", i.p.data[f]), c.length > 0) for (e = 0; e < c.length; e++) n(i).jqGrid("delRowData", c[e][a]);
					if ("nested" === i.p.treeGridModel) {
						if (r = n.jgrid.from.call(i, i.p.data).greater(s, o, {
							stype: "integer"
						}).select(), r.length) for (u in r) r.hasOwnProperty(u) && (r[u][s] = parseInt(r[u][s], 10) - l);
						if (r = n.jgrid.from.call(i, i.p.data).greater(h, o, {
							stype: "integer"
						}).select(), r.length) for (u in r) r.hasOwnProperty(u) && (r[u][h] = parseInt(r[u][h], 10) - l)
					}
				}
			})
		},
		delChildren: function(t) {
			return this.each(function() {
				var s, l, r, u, i = this,
				a = i.p.localReader.id,
				h = i.p.treeReader.left_field,
				c = i.p.treeReader.right_field,
				f, e, o;
				if (i.grid && i.p.treeGrid && (f = i.p._index[t], void 0 !== f)) {
					if (s = parseInt(i.p.data[f][c], 10), l = s - parseInt(i.p.data[f][h], 10) + 1, e = n(i).jqGrid("getFullTreeNode", i.p.data[f]), e.length > 0) for (o = 0; o < e.length; o++) e[o][a] !== t && n(i).jqGrid("delRowData", e[o][a]);
					if ("nested" === i.p.treeGridModel) {
						if (r = n.jgrid.from(i.p.data).greater(h, s, {
							stype: "integer"
						}).select(), r.length) for (u in r) r.hasOwnProperty(u) && (r[u][h] = parseInt(r[u][h], 10) - l);
						if (r = n.jgrid.from(i.p.data).greater(c, s, {
							stype: "integer"
						}).select(), r.length) for (u in r) r.hasOwnProperty(u) && (r[u][c] = parseInt(r[u][c], 10) - l)
					}
				}
			})
		},
		addChildNode: function(t, i, r, u) {
			var f = this[0],
			rt,
			w,
			b,
			e,
			o;
			if (r) {
				var k, d, c, g, s, ut, nt, l, v = f.p.treeReader.expanded_field,
				y = f.p.treeReader.leaf_field,
				ft = f.p.treeReader.level_field,
				et = f.p.treeReader.parent_id_field,
				a = f.p.treeReader.left_field,
				h = f.p.treeReader.right_field,
				tt = f.p.treeReader.loaded,
				it = 0,
				p = i;
				if (void 0 === u && (u = !1), null == t) {
					if (s = f.p.data.length - 1, s >= 0) for (; s >= 0;) it = Math.max(it, parseInt(f.p.data[s][f.p.localReader.id], 10)),
					s--;
					t = it + 1
				}
				if (rt = n(f).jqGrid("getInd", i), (nt = !1, void 0 === i || null === i || "" === i) ? (i = null, p = null, k = "last", g = f.p.tree_root_level, s = f.p.data.length + 1) : (k = "after", d = f.p._index[i], c = f.p.data[d], i = c[f.p.localReader.id], g = parseInt(c[ft], 10) + 1, w = n(f).jqGrid("getFullTreeNode", c), w.length ? (s = w[w.length - 1][f.p.localReader.id], p = s, s = n(f).jqGrid("getInd", p) + 1) : s = n(f).jqGrid("getInd", i) + 1, c[y] && (nt = !0, c[v] = !0, n(f.rows[rt]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(f.p.treeIcons.leaf + " tree-leaf").addClass(f.p.treeIcons.minus + " tree-minus"), f.p.data[d][y] = !1, c[tt] = !0)), ut = s + 1, void 0 === r[v] && (r[v] = !1), void 0 === r[tt] && (r[tt] = !1), r[ft] = g, void 0 === r[y] && (r[y] = !0), "adjacency" === f.p.treeGridModel && (r[et] = i), "nested" === f.p.treeGridModel) if (null !== i) {
					if (l = parseInt(c[h], 10), b = n.jgrid.from.call(f, f.p.data), b = b.greaterOrEquals(h, l, {
						stype: "integer"
					}), e = b.select(), e.length) for (o in e) e.hasOwnProperty(o) && (e[o][a] = e[o][a] > l ? parseInt(e[o][a], 10) + 2 : e[o][a], e[o][h] = e[o][h] >= l ? parseInt(e[o][h], 10) + 2 : e[o][h]);
					r[a] = l;
					r[h] = l + 1
				} else {
					if (l = parseInt(n(f).jqGrid("getCol", h, !1, "max"), 10), e = n.jgrid.from.call(f, f.p.data).greater(a, l, {
						stype: "integer"
					}).select(), e.length) for (o in e) e.hasOwnProperty(o) && (e[o][a] = parseInt(e[o][a], 10) + 2);
					if (e = n.jgrid.from.call(f, f.p.data).greater(h, l, {
						stype: "integer"
					}).select(), e.length) for (o in e) e.hasOwnProperty(o) && (e[o][h] = parseInt(e[o][h], 10) + 2);
					r[a] = l + 1;
					r[h] = l + 2
				} (null === i || n(f).jqGrid("isNodeLoaded", c) || nt) && (n(f).jqGrid("addRowData", t, r, k, p), n(f).jqGrid("setTreeNode", s, ut));
				c && !c[v] && u && n(f.rows[rt]).find("div.treeclick").click()
			}
		}
	});
	n.fn.jqDrag = function(n) {
		return p(this, n, "d")
	};
	n.fn.jqResize = function(n, t) {
		return p(this, n, "r", t)
	};
	n.jqDnR = {
		dnr: {},
		e: 0,
		drag: function(n) {
			return "d" == r.k ? u.css({
				left: r.X + n.pageX - r.pX,
				top: r.Y + n.pageY - r.pY
			}) : (u.css({
				width: Math.max(n.pageX - r.pX + r.W, 0),
				height: Math.max(n.pageY - r.pY + r.H, 0)
			}), h && s.css({
				width: Math.max(n.pageX - h.pX + h.W, 0),
				height: Math.max(n.pageY - h.pY + h.H, 0)
			})),
			!1
		},
		stop: function() {
			n(document).unbind("mousemove", l.drag).unbind("mouseup", l.stop)
		}
	};
	var l = n.jqDnR,
	r = l.dnr,
	u = l.e,
	s, h, p = function(t, i, f, o) {
		return t.each(function() {
			i = i ? n(i, t) : t;
			i.bind("mousedown", {
				e: t,
				k: f
			},
			function(t) {
				var f = t.data,
				i = {};
				if (u = f.e, s = o ? n(o) : !1, "relative" != u.css("position")) try {
					u.position(i)
				} catch(c) {}
				if (r = {
					X: i.left || e("left") || 0,
					Y: i.top || e("top") || 0,
					W: e("width") || u[0].scrollWidth || 0,
					H: e("height") || u[0].scrollHeight || 0,
					pX: t.pageX,
					pY: t.pageY,
					k: f.k
				},
				h = s && "d" != f.k ? {
					X: i.left || a("left") || 0,
					Y: i.top || a("top") || 0,
					W: s[0].offsetWidth || a("width") || 0,
					H: s[0].offsetHeight || a("height") || 0,
					pX: t.pageX,
					pY: t.pageY,
					k: f.k
				}: !1, n("input.hasDatepicker", u[0])[0]) try {
					n("input.hasDatepicker", u[0]).datepicker("hide")
				} catch(l) {}
				return n(document).mousemove(n.jqDnR.drag).mouseup(n.jqDnR.stop),
				!1
			})
		})
	},
	e = function(n) {
		return parseInt(u.css(n), 10) || !1
	},
	a = function(n) {
		return parseInt(s.css(n), 10) || !1
	};
	n.fn.jqm = function(t) {
		var r = {
			overlay: 50,
			closeoverlay: !0,
			overlayClass: "jqmOverlay",
			closeClass: "jqmClose",
			trigger: ".jqModal",
			ajax: i,
			ajaxText: "",
			target: i,
			modal: i,
			toTop: i,
			onShow: i,
			onHide: i,
			onLoad: i
		};
		return this.each(function() {
			return this._jqm ? f[this._jqm].c = n.extend({},
			f[this._jqm].c, t) : (c++, this._jqm = c, f[c] = {
				c: n.extend(r, n.jqm.params, t),
				a: i,
				w: n(this).addClass("jqmID" + c),
				s: c
			},
			void(r.trigger && n(this).jqmAddTrigger(r.trigger)))
		})
	};
	n.fn.jqmAddClose = function(n) {
		return k(this, n, "jqmHide")
	};
	n.fn.jqmAddTrigger = function(n) {
		return k(this, n, "jqmShow")
	};
	n.fn.jqmShow = function(t) {
		return this.each(function() {
			n.jqm.open(this._jqm, t)
		})
	};
	n.fn.jqmHide = function(t) {
		return this.each(function() {
			n.jqm.close(this._jqm, t)
		})
	};
	n.jqm = {
		hash: {},
		open: function(t, r) {
			var u = f[t],
			e = u.c,
			a = "." + e.closeClass,
			c = parseInt(u.w.css("z-index")),
			l,
			s,
			h;
			return (c = c > 0 ? c: 3e3, l = n("<div><\/div>").css({
				height: "100%",
				width: "100%",
				position: "fixed",
				left: 0,
				top: 0,
				"z-index": c - 1,
				opacity: e.overlay / 100
			}), u.a) ? i: ((u.t = r, u.a = !0, u.w.css("z-index", c), e.modal ? (o[0] || setTimeout(function() {
				new b("bind")
			},
			1), o.push(t)) : e.overlay > 0 ? e.closeoverlay && u.w.jqmAddClose(l) : l = i, u.o = l ? l.addClass(e.overlayClass).prependTo("body") : i, e.ajax) ? (s = e.target || u.w, h = e.ajax, s = "string" == typeof s ? n(s, u.w) : n(s), h = "@" === h.substr(0, 1) ? n(r).attr(h.substring(1)) : h, s.html(e.ajaxText).load(h,
			function() {
				e.onLoad && e.onLoad.call(this, u);
				a && u.w.jqmAddClose(n(a, u.w));
				w(u)
			})) : a && u.w.jqmAddClose(n(a, u.w)), e.toTop && u.o && u.w.before('<span id="jqmP' + u.w[0]._jqm + '"><\/span>').insertAfter(u.o), e.onShow ? e.onShow(u) : u.w.show(), w(u), i)
		},
		close: function(t) {
			var r = f[t];
			return r.a ? (r.a = i, o[0] && (o.pop(), o[0] || new b("unbind")), r.c.toTop && r.o && n("#jqmP" + r.w[0]._jqm).after(r.w).remove(), r.c.onHide ? r.c.onHide(r) : (r.w.hide(), r.o && r.o.remove()), i) : i
		},
		params: {}
	};
	var c = 0,
	f = n.jqm.hash,
	o = [],
	i = !1,
	w = function(n) {
		void 0 === n.c.focusField && (n.c.focusField = 0);
		n.c.focusField >= 0 && e(n)
	},
	e = function(t) {
		try {
			n(":input:visible", t.w)[parseInt(t.c.focusField, 10)].focus()
		} catch(i) {}
	},
	b = function(t) {
		n(document)[t]("keypress", v)[t]("keydown", v)[t]("mousedown", v)
	},
	v = function(t) {
		var i = f[o[o.length - 1]],
		r = !n(t.target).parents(".jqmID" + i.s)[0];
		return r && (n(".jqmID" + i.s).each(function() {
			var u = n(this),
			i = u.offset();
			if (i.top <= t.pageY && t.pageY <= i.top + u.height() && i.left <= t.pageX && t.pageX <= i.left + u.width()) return (r = !1, !1)
		}), e(i)),
		!r
	},
	k = function(t, r, u) {
		return t.each(function() {
			var t = this._jqm;
			n(r).each(function() {
				this[u] || (this[u] = [], n(this).click(function() {
					var n, t;
					for (n in {
						jqmShow: 1,
						jqmHide: 1
					}) for (t in this[n]) f[this[n][t]] && f[this[n][t]].w[n](this);
					return i
				}));
				this[u].push(t)
			})
		})
	};
	n.fmatter = {};
	n.extend(n.fmatter, {
		isBoolean: function(n) {
			return "boolean" == typeof n
		},
		isObject: function(t) {
			return t && ("object" == typeof t || n.isFunction(t)) || !1
		},
		isString: function(n) {
			return "string" == typeof n
		},
		isNumber: function(n) {
			return "number" == typeof n && isFinite(n)
		},
		isValue: function(n) {
			return this.isObject(n) || this.isString(n) || this.isNumber(n) || this.isBoolean(n)
		},
		isEmpty: function(t) {
			return ! this.isString(t) && this.isValue(t) ? !1 : this.isValue(t) ? (t = n.trim(t).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, ""), "" === t) : !0
		}
	});
	n.fn.fmatter = function(t, i, r, u, f) {
		var e = i;
		r = n.extend({},
		n.jgrid.getRegional(this, "formatter"), r);
		try {
			e = n.fn.fmatter[t].call(this, i, r, u, f)
		} catch(o) {}
		return e
	};
	n.fmatter.util = {
		NumberFormat: function(t, i) {
			var s, h, l, f, e, c;
			if (n.fmatter.isNumber(t) || (t *= 1), n.fmatter.isNumber(t)) {
				var u, a = 0 > t,
				r = String(t),
				o = i.decimalSeparator || ".";
				if (n.fmatter.isNumber(i.decimalPlaces) && (s = i.decimalPlaces, h = Math.pow(10, s), r = String(Math.round(t * h) / h), u = r.lastIndexOf("."), s > 0)) for (0 > u ? (r += o, u = r.length - 1) : "." !== o && (r = r.replace(".", o)); r.length - 1 - u < s;) r += "0";
				if (i.thousandsSeparator) {
					for (l = i.thousandsSeparator, u = r.lastIndexOf(o), u = u > -1 ? u: r.length, e = r.substring(u), c = -1, f = u; f > 0; f--) c++,
					c % 3 == 0 && f !== u && (!a || f > 1) && (e = l + e),
					e = r.charAt(f - 1) + e;
					r = e
				}
				return r = i.prefix ? i.prefix + r: r,
				r = i.suffix ? r + i.suffix: r
			}
			return t
		}
	};
	n.fn.fmatter.defaultFormat = function(t, i) {
		return n.fmatter.isValue(t) && "" !== t ? t: i.defaultValue || "&#160;"
	};
	n.fn.fmatter.email = function(t, i) {
		return n.fmatter.isEmpty(t) ? n.fn.fmatter.defaultFormat(t, i) : '<a href="mailto:' + t + '">' + t + "<\/a>"
	};
	n.fn.fmatter.checkbox = function(t, i) {
		var u, r = n.extend({},
		i.checkbox),
		f;
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		u = r.disabled === !0 ? 'disabled="disabled"': "",
		(n.fmatter.isEmpty(t) || void 0 === t) && (t = n.fn.fmatter.defaultFormat(t, r)),
		t = String(t),
		t = (t + "").toLowerCase(),
		f = t.search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' ": "",
		'<input type="checkbox" ' + f + ' value="' + t + '" offval="no" ' + u + "/>"
	};
	n.fn.fmatter.link = function(t, i) {
		var r = {
			target: i.target
		},
		u = "";
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		r.target && (u = "target=" + r.target),
		n.fmatter.isEmpty(t) ? n.fn.fmatter.defaultFormat(t, i) : "<a " + u + ' href="' + t + '">' + t + "<\/a>"
	};
	n.fn.fmatter.showlink = function(t, i) {
		var u, r = {
			baseLinkUrl: i.baseLinkUrl,
			showAction: i.showAction,
			addParam: i.addParam || "",
			target: i.target,
			idName: i.idName
		},
		f = "";
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		r.target && (f = "target=" + r.target),
		u = r.baseLinkUrl + r.showAction + "?" + r.idName + "=" + i.rowId + r.addParam,
		n.fmatter.isString(t) || n.fmatter.isNumber(t) ? "<a " + f + ' href="' + u + '">' + t + "<\/a>": n.fn.fmatter.defaultFormat(t, i)
	};
	n.fn.fmatter.integer = function(t, i) {
		var r = n.extend({},
		i.integer);
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		n.fmatter.isEmpty(t) ? r.defaultValue: n.fmatter.util.NumberFormat(t, r)
	};
	n.fn.fmatter.number = function(t, i) {
		var r = n.extend({},
		i.number);
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		n.fmatter.isEmpty(t) ? r.defaultValue: n.fmatter.util.NumberFormat(t, r)
	};
	n.fn.fmatter.currency = function(t, i) {
		var r = n.extend({},
		i.currency);
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = n.extend({},
		r, i.colModel.formatoptions)),
		n.fmatter.isEmpty(t) ? r.defaultValue: n.fmatter.util.NumberFormat(t, r)
	};
	n.fn.fmatter.date = function(t, i, r, u) {
		var f = n.extend({},
		i.date);
		return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (f = n.extend({},
		f, i.colModel.formatoptions)),
		f.reformatAfterEdit || "edit" !== u ? n.fmatter.isEmpty(t) ? n.fn.fmatter.defaultFormat(t, i) : n.jgrid.parseDate.call(this, f.srcformat, t, f.newformat, f) : n.fn.fmatter.defaultFormat(t, i)
	};
	n.fn.fmatter.select = function(t, i) {
		var o, c, r, f, u, s, e, h, l, a;
		if (t = String(t), r = !1, f = [], void 0 !== i.colModel.formatoptions ? (r = i.colModel.formatoptions.value, o = void 0 === i.colModel.formatoptions.separator ? ":": i.colModel.formatoptions.separator, c = void 0 === i.colModel.formatoptions.delimiter ? ";": i.colModel.formatoptions.delimiter) : void 0 !== i.colModel.editoptions && (r = i.colModel.editoptions.value, o = void 0 === i.colModel.editoptions.separator ? ":": i.colModel.editoptions.separator, c = void 0 === i.colModel.editoptions.delimiter ? ";": i.colModel.editoptions.delimiter), r) if (s = (null != i.colModel.editoptions && i.colModel.editoptions.multiple === !0) == !0 ? !0 : !1, e = [], s && (e = t.split(","), e = n.map(e,
		function(t) {
			return n.trim(t)
		})), n.fmatter.isString(r)) {
			for (l = r.split(c), a = 0, h = 0; h < l.length; h++) if (u = l[h].split(o), u.length > 2 && (u[1] = n.map(u,
			function(n, t) {
				if (t > 0) return n
			}).join(o)), s) n.inArray(u[0], e) > -1 && (f[a] = u[1], a++);
			else if (n.trim(u[0]) === n.trim(t)) {
				f[0] = u[1];
				break
			}
		} else n.fmatter.isObject(r) && (s ? f = n.map(e,
		function(n) {
			return r[n]
		}) : f[0] = r[t] || "");
		return t = f.join(", "),
		"" === t ? n.fn.fmatter.defaultFormat(t, i) : t
	};
	n.fn.fmatter.rowactions = function(t) {
		var c = n(this).closest("tr.jqgrow"),
		f = c.attr("id"),
		a = n(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"),
		r = n("#" + a),
		o = r[0],
		e = o.p,
		s = e.colModel[n.jgrid.getCellIndex(this)],
		u = s.frozen ? n("tr#" + f + " td:eq(" + n.jgrid.getCellIndex(this) + ") > div", r) : n(this).parent(),
		i = {
			extraparam: {}
		},
		v = function(t, r) {
			n.isFunction(i.afterSave) && i.afterSave.call(o, t, r);
			u.find("div.ui-inline-edit,div.ui-inline-del").show();
			u.find("div.ui-inline-save,div.ui-inline-cancel").hide()
		},
		l = function(t) {
			n.isFunction(i.afterRestore) && i.afterRestore.call(o, t);
			u.find("div.ui-inline-edit,div.ui-inline-del").show();
			u.find("div.ui-inline-save,div.ui-inline-cancel").hide()
		},
		h;
		void 0 !== s.formatoptions && (i = n.extend(i, s.formatoptions));
		void 0 !== e.editOptions && (i.editOptions = e.editOptions);
		void 0 !== e.delOptions && (i.delOptions = e.delOptions);
		c.hasClass("jqgrid-new-row") && (i.extraparam[e.prmNames.oper] = e.prmNames.addoper);
		h = {
			keys: i.keys,
			oneditfunc: i.onEdit,
			successfunc: i.onSuccess,
			url: i.url,
			extraparam: i.extraparam,
			aftersavefunc: v,
			errorfunc: i.onError,
			afterrestorefunc: l,
			restoreAfterError: i.restoreAfterError,
			mtype: i.mtype
		};
		switch (t) {
		case "edit":
			r.jqGrid("editRow", f, h);
			u.find("div.ui-inline-edit,div.ui-inline-del").hide();
			u.find("div.ui-inline-save,div.ui-inline-cancel").show();
			r.triggerHandler("jqGridAfterGridComplete");
			break;
		case "save":
			r.jqGrid("saveRow", f, h) && (u.find("div.ui-inline-edit,div.ui-inline-del").show(), u.find("div.ui-inline-save,div.ui-inline-cancel").hide(), r.triggerHandler("jqGridAfterGridComplete"));
			break;
		case "cancel":
			r.jqGrid("restoreRow", f, l);
			u.find("div.ui-inline-edit,div.ui-inline-del").show();
			u.find("div.ui-inline-save,div.ui-inline-cancel").hide();
			r.triggerHandler("jqGridAfterGridComplete");
			break;
		case "del":
			r.jqGrid("delGridRow", f, i.delOptions);
			break;
		case "formedit":
			r.jqGrid("setSelection", f);
			r.jqGrid("editGridRow", f, i.editOptions)
		}
	};
	n.fn.fmatter.actions = function(t, i) {
		var r, s = {
			keys: !1,
			editbutton: !0,
			delbutton: !0,
			editformbutton: !1
		},
		u = i.rowId,
		e = "",
		h = n.jgrid.getRegional(this, "nav"),
		c = n.jgrid.styleUI[i.styleUI || "jQueryUI"].fmatter,
		f = n.jgrid.styleUI[i.styleUI || "jQueryUI"].common,
		o;
		return (void 0 !== i.colModel.formatoptions && (s = n.extend(s, i.colModel.formatoptions)), void 0 === u || n.fmatter.isEmpty(u)) ? "": (o = "onmouseover=jQuery(this).addClass('" + f.hover + "'); onmouseout=jQuery(this).removeClass('" + f.hover + "');  ", s.editformbutton ? (r = "id='jEditButton_" + u + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); " + o, e += "<div title='" + h.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + r + "><span class='" + f.icon_base + " " + c.icon_edit + "'><\/span><\/div>") : s.editbutton && (r = "id='jEditButton_" + u + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); " + o, e += "<div title='" + h.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + r + "><span class='" + f.icon_base + " " + c.icon_edit + "'><\/span><\/div>"), s.delbutton && (r = "id='jDeleteButton_" + u + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); " + o, e += "<div title='" + h.deltitle + "' style='float:left;' class='ui-pg-div ui-inline-del' " + r + "><span class='" + f.icon_base + " " + c.icon_del + "'><\/span><\/div>"), r = "id='jSaveButton_" + u + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); " + o, e += "<div title='" + h.savetitle + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + r + "><span class='" + f.icon_base + " " + c.icon_save + "'><\/span><\/div>", r = "id='jCancelButton_" + u + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); " + o, e += "<div title='" + h.canceltitle + "' style='float:left;display:none;' class='ui-pg-div ui-inline-cancel' " + r + "><span class='" + f.icon_base + " " + c.icon_cancel + "'><\/span><\/div>", "<div style='margin-left:8px;'>" + e + "<\/div>")
	};
	n.unformat = function(t, i, r, u) {
		var e, o, h = i.colModel.formatter,
		f = i.colModel.formatoptions || {},
		l = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
		a = i.colModel.unformat || n.fn.fmatter[h] && n.fn.fmatter[h].unformat,
		s,
		c,
		v;
		if (void 0 !== a && n.isFunction(a)) e = a.call(this, n(t).text(), i, t);
		else if (void 0 !== h && n.fmatter.isString(h)) {
			c = n.jgrid.getRegional(this, "formatter") || {};
			switch (h) {
			case "integer":
				f = n.extend({},
				c.integer, f);
				o = f.thousandsSeparator.replace(l, "\\$1");
				s = new RegExp(o, "g");
				e = n(t).text().replace(s, "");
				break;
			case "number":
				f = n.extend({},
				c.number, f);
				o = f.thousandsSeparator.replace(l, "\\$1");
				s = new RegExp(o, "g");
				e = n(t).text().replace(s, "").replace(f.decimalSeparator, ".");
				break;
			case "currency":
				f = n.extend({},
				c.currency, f);
				o = f.thousandsSeparator.replace(l, "\\$1");
				s = new RegExp(o, "g");
				e = n(t).text();
				f.prefix && f.prefix.length && (e = e.substr(f.prefix.length));
				f.suffix && f.suffix.length && (e = e.substr(0, e.length - f.suffix.length));
				e = e.replace(s, "").replace(f.decimalSeparator, ".");
				break;
			case "checkbox":
				v = i.colModel.editoptions ? i.colModel.editoptions.value.split(":") : ["Yes", "No"];
				e = n("input", t).is(":checked") ? v[0] : v[1];
				break;
			case "select":
				e = n.unformat.select(t, i, r, u);
				break;
			case "actions":
				return "";
			default:
				e = n(t).text()
			}
		}
		return void 0 !== e ? e: u === !0 ? n(t).text() : n.jgrid.htmlDecode(n(t).html())
	};
	n.unformat.select = function(t, i, r, u) {
		var c = [],
		s = n(t).text(),
		l,
		v,
		y;
		if (u === !0) return s;
		var e = n.extend({},
		void 0 !== i.colModel.formatoptions ? i.colModel.formatoptions: i.colModel.editoptions),
		p = void 0 === e.separator ? ":": e.separator,
		w = void 0 === e.delimiter ? ";": e.delimiter;
		if (e.value) {
			var f, h = e.value,
			a = e.multiple === !0 ? !0 : !1,
			o = [];
			if (a && (o = s.split(","), o = n.map(o,
			function(t) {
				return n.trim(t)
			})), n.fmatter.isString(h)) {
				for (v = h.split(w), y = 0, l = 0; l < v.length; l++) if (f = v[l].split(p), f.length > 2 && (f[1] = n.map(f,
				function(n, t) {
					if (t > 0) return n
				}).join(p)), a) n.inArray(n.trim(f[1]), o) > -1 && (c[y] = f[0], y++);
				else if (n.trim(f[1]) === n.trim(s)) {
					c[0] = f[0];
					break
				}
			} else(n.fmatter.isObject(h) || n.isArray(h)) && (a || (o[0] = s), c = n.map(o,
			function(t) {
				var i;
				return n.each(h,
				function(n, r) {
					if (r === t) return (i = n, !1)
				}),
				void 0 !== i ? i: void 0
			}));
			return c.join(", ")
		}
		return s || ""
	};
	n.unformat.date = function(t, i) {
		var r = n.jgrid.getRegional(this, "formatter.date") || {};
		return void 0 !== i.formatoptions && (r = n.extend({},
		r, i.formatoptions)),
		n.fmatter.isEmpty(t) ? n.fn.fmatter.defaultFormat(t, i) : n.jgrid.parseDate.call(this, r.newformat, t, r.srcformat, r)
	};
	window.jqGridUtils = {
		stringify: function(n) {
			return JSON.stringify(n,
			function(n, t) {
				return "function" == typeof t ? t.toString() : t
			})
		},
		parse: function(n) {
			return JSON.parse(n,
			function(key, value) {
				return "string" == typeof value && -1 !== value.indexOf("function") ? eval("(" + value + ")") : value
			})
		},
		encode: function(n) {
			return String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		},
		jsonToXML: function(t, i) {
			var r = n.extend({
				xmlDecl: '<?xml version="1.0" encoding="UTF-8" ?>\n',
				attr_prefix: "-",
				encode: !0
			},
			i || {}),
			u = this,
			e = function(n, t) {
				return "#text" === n ? r.encode ? u.encode(t) : t: "function" == typeof t ? "<" + n + "><![CDATA[" + t + "]\]><\/" + n + ">\n": "" === t ? "<" + n + ">__EMPTY_STRING_<\/" + n + ">\n": "<" + n + ">" + (r.encode ? u.encode(t) : t) + "<\/" + n + ">\n"
			},
			o = function(n, t) {
				for (var i, r = [], u = 0; u < t.length; u++) i = t[u],
				r[r.length] = "undefined" == typeof i || null == i ? "<" + n + " />": "object" == typeof i && i.constructor == Array ? o(n, i) : "object" == typeof i ? f(n, i) : e(n, i);
				return r.length || (r[0] = "<" + n + ">__EMPTY_ARRAY_<\/" + n + ">\n"),
				r.join("")
			},
			f = function(n, t) {
				var c = [],
				a = [],
				s,
				i,
				l,
				h;
				for (s in t) t.hasOwnProperty(s) && (i = t[s], s.charAt(0) !== r.attr_prefix ? c[c.length] = null == i ? "<" + s + " />": "object" == typeof i && i.constructor === Array ? o(s, i) : "object" == typeof i ? f(s, i) : e(s, i) : a[a.length] = " " + s.substring(1) + '="' + (r.encode ? u.encode(i) : i) + '"');
				return l = a.join(""),
				h = c.join(""),
				null == n || (h = c.length > 0 ? h.match(/\n/) ? "<" + n + l + ">\n" + h + "<\/" + n + ">\n": "<" + n + l + ">" + h + "<\/" + n + ">\n": "<" + n + l + " />\n"),
				h
			},
			s = f(null, t);
			return r.xmlDecl + s
		},
		xmlToJSON: function(t, i) {
			var u = n.extend({
				force_array: [],
				attr_prefix: "-"
			},
			i || {}),
			f,
			e,
			o;
			if (t) {
				if (f = {},
				u.force_array) for (e = 0; e < u.force_array.length; e++) f[u.force_array[e]] = 1;
				"string" == typeof t && (t = n.parseXML(t));
				t.documentElement && (t = t.documentElement);
				var s = function(hash, key, cnts, val) {
					if ("string" == typeof val) if ( - 1 !== val.indexOf("function")) val = eval("(" + val + ")");
					else switch (val) {
					case "__EMPTY_ARRAY_":
						val = [];
						break;
					case "__EMPTY_STRING_":
						val = "";
						break;
					case "false":
						val = !1;
						break;
					case "true":
						val = !0
					}
					f[key] ? (1 === cnts && (hash[key] = []), hash[key][hash[key].length] = val) : 1 === cnts ? hash[key] = val: 2 === cnts ? hash[key] = [hash[key], val] : hash[key][hash[key].length] = val
				},
				h = function(n) {
					var l, r, t, i, e, f, o, c;
					if (7 !== n.nodeType) {
						if (3 === n.nodeType || 4 === n.nodeType) return (l = n.nodeValue.match(/[^\x00-\x20]/), null == l) ? void 0 : n.nodeValue;
						if (f = {},
						n.attributes && n.attributes.length) for (r = {},
						t = 0; t < n.attributes.length; t++) i = n.attributes[t].nodeName,
						"string" == typeof i && (e = n.attributes[t].nodeValue, e && (i = u.attr_prefix + i, "undefined" == typeof f[i] && (f[i] = 0), f[i]++, s(r, i, f[i], e)));
						if (n.childNodes && n.childNodes.length) {
							for (o = !0, r && (o = !1), t = 0; t < n.childNodes.length && o; t++) c = n.childNodes[t].nodeType,
							3 !== c && 4 !== c && (o = !1);
							if (o) for (r || (r = ""), t = 0; t < n.childNodes.length; t++) r += n.childNodes[t].nodeValue;
							else for (r || (r = {}), t = 0; t < n.childNodes.length; t++) i = n.childNodes[t].nodeName,
							"string" == typeof i && (e = h(n.childNodes[t]), e && ("undefined" == typeof f[i] && (f[i] = 0), f[i]++, s(r, i, f[i], e)))
						}
						return r
					}
				},
				r = h(t);
				return (f[t.nodeName] && (r = [r]), 11 !== t.nodeType) && (o = {},
				o[t.nodeName] = r, r = o),
				r
			}
		}
	}
}),
function(n) {
	"use strict";
	typeof define == "function" && define.amd ? define(["jquery", "../grid.base"], n) : n(jQuery)
} (function(n) {
	n.jgrid = n.jgrid || {};
	n.jgrid.hasOwnProperty("regional") || (n.jgrid.regional = []);
	n.jgrid.regional.cn = {
		defaults: {
			recordtext: "{0} - {1}　共 {2} 条",
			emptyrecords: "无数据显示",
			loadtext: "读取中...",
			savetext: "Saving...",
			pgtext: " {0} 共 {1} 页",
			pgfirst: "First Page",
			pglast: "Last Page",
			pgnext: "Next Page",
			pgprev: "Previous Page",
			pgrecs: "Records per Page",
			showhide: "Toggle Expand Collapse Grid",
			pagerCaption: "Grid::Page Settings",
			pageText: "Page:",
			recordPage: "Records per Page",
			nomorerecs: "No more records...",
			scrollPullup: "Pull up to load more...",
			scrollPulldown: "Pull down to refresh...",
			scrollRefresh: "Release to refresh..."
		},
		search: {
			caption: "搜索...",
			Find: "查找",
			Reset: "重置",
			odata: [{
				oper: "eq",
				text: "等于　　"
			},
			{
				oper: "ne",
				text: "不等　　"
			},
			{
				oper: "lt",
				text: "小于　　"
			},
			{
				oper: "le",
				text: "小于等于"
			},
			{
				oper: "gt",
				text: "大于　　"
			},
			{
				oper: "ge",
				text: "大于等于"
			},
			{
				oper: "bw",
				text: "开始于"
			},
			{
				oper: "bn",
				text: "不开始于"
			},
			{
				oper: "in",
				text: "属于　　"
			},
			{
				oper: "ni",
				text: "不属于"
			},
			{
				oper: "ew",
				text: "结束于"
			},
			{
				oper: "en",
				text: "不结束于"
			},
			{
				oper: "cn",
				text: "包含　　"
			},
			{
				oper: "nc",
				text: "不包含"
			},
			{
				oper: "nu",
				text: "不存在"
			},
			{
				oper: "nn",
				text: "存在"
			}],
			groupOps: [{
				op: "AND",
				text: "所有"
			},
			{
				op: "OR",
				text: "任一"
			}],
			operandTitle: "Click to select search operation.",
			resetTitle: "Reset Search Value"
		},
		edit: {
			addCaption: "添加记录",
			editCaption: "编辑记录",
			bSubmit: "提交",
			bCancel: "取消",
			bClose: "关闭",
			saveData: "数据已改变，是否保存？",
			bYes: "是",
			bNo: "否",
			bExit: "取消",
			msg: {
				required: "此字段必需",
				number: "请输入有效数字",
				minValue: "输值必须大于等于 ",
				maxValue: "输值必须小于等于 ",
				email: "这不是有效的e-mail地址",
				integer: "请输入有效整数",
				date: "请输入有效时间",
				url: "无效网址。前缀必须为 ('http://' 或 'https://')",
				nodefined: " 未定义！",
				novalue: " 需要返回值！",
				customarray: "自定义函数需要返回数组！",
				customfcheck: "必须有自定义函数!"
			}
		},
		view: {
			caption: "查看记录",
			bClose: "关闭"
		},
		del: {
			caption: "删除",
			msg: "删除所选记录？",
			bSubmit: "删除",
			bCancel: "取消"
		},
		nav: {
			edittext: "",
			edittitle: "编辑所选记录",
			addtext: "",
			addtitle: "添加新记录",
			deltext: "",
			deltitle: "删除所选记录",
			searchtext: "",
			searchtitle: "查找",
			refreshtext: "",
			refreshtitle: "刷新表格",
			alertcap: "注意",
			alerttext: "请选择记录",
			viewtext: "",
			viewtitle: "查看所选记录",
			savetext: "",
			savetitle: "Save row",
			canceltext: "",
			canceltitle: "Cancel row editing",
			selectcaption: "Actions..."
		},
		col: {
			caption: "选择列",
			bSubmit: "确定",
			bCancel: "取消"
		},
		errors: {
			errcap: "错误",
			nourl: "没有设置url",
			norecords: "没有要处理的记录",
			model: "colNames 和 colModel 长度不等！"
		},
		formatter: {
			integer: {
				thousandsSeparator: ",",
				defaultValue: "0"
			},
			number: {
				decimalSeparator: ".",
				thousandsSeparator: ",",
				decimalPlaces: 2,
				defaultValue: "0.00"
			},
			currency: {
				decimalSeparator: ".",
				thousandsSeparator: ",",
				decimalPlaces: 2,
				prefix: "",
				suffix: "",
				defaultValue: "0.00"
			},
			date: {
				dayNames: ["日", "一", "二", "三", "四", "五", "六", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", ],
				monthNames: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				AmPm: ["am", "pm", "上午", "下午"],
				S: function(n) {
					return n < 11 || n > 13 ? ["st", "nd", "rd", "th"][Math.min((n - 1) % 10, 3)] : "th"
				},
				srcformat: "Y-m-d",
				newformat: "Y-m-d",
				parseRe: /[#%\\\/:_;.,\t\s-]/,
				masks: {
					ISO8601Long: "Y-m-d H:i:s",
					ISO8601Short: "Y-m-d",
					ShortDate: "n/j/Y",
					LongDate: "l, F d, Y",
					FullDateTime: "l, F d, Y g:i:s A",
					MonthDay: "F d",
					ShortTime: "g:i A",
					LongTime: "g:i:s A",
					SortableDateTime: "Y-m-d\\TH:i:s",
					UniversalSortableDateTime: "Y-m-d H:i:sO",
					YearMonth: "F, Y"
				},
				reformatAfterEdit: !1,
				userLocalTime: !1
			},
			baseLinkUrl: "",
			showAction: "",
			target: "",
			checkbox: {
				disabled: !0
			},
			idName: "id"
		}
	}
});
JSON || (JSON = {}),
function() {
	"use strict";
	function i(n) {
		return n < 10 ? "0" + n: n
	}
	function o(n) {
		return e.lastIndex = 0,
		e.test(n) ? '"' + n.replace(e,
		function(n) {
			var t = s[n];
			return typeof t == "string" ? t: "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice( - 4)
		}) + '"': '"' + n + '"'
	}
	function u(i, f) {
		var s, l, h, a, v = n,
		c, e = f[i];
		e && typeof e == "object" && typeof e.toJSON == "function" && (e = e.toJSON(i));
		typeof t == "function" && (e = t.call(f, i, e));
		switch (typeof e) {
		case "string":
			return o(e);
		case "number":
			return isFinite(e) ? String(e) : "null";
		case "boolean":
		case "null":
			return String(e);
		case "object":
			if (!e) return "null";
			if (n += r, c = [], Object.prototype.toString.apply(e) === "[object Array]") {
				for (a = e.length, s = 0; s < a; s += 1) c[s] = u(s, e) || "null";
				return h = c.length === 0 ? "[]": n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]": "[" + c.join(",") + "]",
				n = v,
				h
			}
			if (t && typeof t == "object") for (a = t.length, s = 0; s < a; s += 1) typeof t[s] == "string" && (l = t[s], h = u(l, e), h && c.push(o(l) + (n ? ": ": ":") + h));
			else for (l in e) Object.prototype.hasOwnProperty.call(e, l) && (h = u(l, e), h && c.push(o(l) + (n ? ": ": ":") + h));
			return h = c.length === 0 ? "{}": n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}": "{" + c.join(",") + "}",
			n = v,
			h
		}
	}
	typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z": null
	},
	String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	});
	var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	n, r, s = {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"': '\\"',
		"\\": "\\\\"
	},
	t;
	typeof JSON.stringify != "function" && (JSON.stringify = function(i, f, e) {
		var o;
		if (n = "", r = "", typeof e == "number") for (o = 0; o < e; o += 1) r += " ";
		else typeof e == "string" && (r = e);
		if (t = f, f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number")) throw new Error("JSON.stringify");
		return u("", {
			"": i
		})
	});
	typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
		function walk(n, t) {
			var r, u, i = n[t];
			if (i && typeof i == "object") for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (u = walk(i, r), u !== undefined ? i[r] = u: delete i[r]);
			return reviver.call(n, t, i)
		}
		var j;
		if (text = String(text), f.lastIndex = 0, f.test(text) && (text = text.replace(f,
		function(n) {
			return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice( - 4)
		})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
		typeof reviver == "function" ? walk({
			"": j
		},
		"") : j;
		throw new SyntaxError("JSON.parse");
	})
} ();
JucheapGrid = {
	Load: function(n) {
		var t = n.id ? $("#" + n.id) : $("#table_list"),
		i = {
			caption: n.title,
			url: n.url,
			mtype: "GET",
			styleUI: "Bootstrap",
			datatype: "json",
			colNames: n.colNames,
			colModel: n.colModel,
			viewrecords: !0,
			multiselect: !0,
			rownumbers: !0,
			autowidth: !0,
			height: "100%",
			rowNum: 15,
			rownumWidth: 35,
			emptyrecords: "没有相关数据",
			loadComplete: function(n) {
				n && n.code === 401 && alert(n.msg)
			},
			loadError: function(n, t, i) {
				console.log(n);
				console.log(t);
				console.log(i)
			},
			pager: n.pagerId ? "#" + n.pagerId: "#pager_list",
			subGrid: n.subGrid ? !0 : !1,
			subGridRowExpanded: n.subGridRowExpanded ? n.subGridRowExpanded: null,
			gridComplete: n.gridComplete ? n.gridComplete: function() {}
		};
		$.extend(i, n);
		t.jqGrid(i);
		$(window).bind("resize",
		function() {
			var n = $(".jqGrid_wrapper").width();
			t.setGridWidth(n)
		})
	},
	GetData: function() {
		var n = $("#table_list").jqGrid("getGridParam", "selrow");
		return n ? $("#table_list").jqGrid("getRowData", n) : null
	},
	GetDataTableDeleteData: function() {
		return JucheapGrid.GetAllSelected("table_list")
	},
	GetAllSelected: function(n) {
		var t = {
			Len: 0,
			Data: []
		},
		u = $("#" + n),
		f = u.getGridParam("selrow"),
		r,
		i;
		if (f) for (r = u.getGridParam("selarrrow"), i = 0; i < r.length; i++) t.Data.push(r[i]);
		return t.Len = t.Data.length,
		t
	}
},
function() {
	Date.prototype.format = function(n) {
		var i = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		},
		t;
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (t in i) i.hasOwnProperty(t) && new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length === 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n
	};
	String.prototype.getDate = function() {
		var n = /\d{13}/.exec(this),
		t = new Date(parseInt(n));
		return t.format("yyyy-MM-dd HH:mm:ss")
	}
} ();
XPage = {
	DelData: function(n) {
		var t = JucheapGrid.GetDataTableDeleteData();
		t.Len > 0 && t.Data.length > 0 ? parent.layer.confirm("确认要删除这" + t.Len + "条数据？", {
			btn: ["确认", "取消"]
		},
		function() {
			var i = $("#btnDel");
			i.button("loading");
			$.ajax({
				url: n,
				type: "POST",
				dataType: "json",
				data: {
					ids : t.Data
				},
				success: function(n) {
					i.button("reset");
					n.flag ? (parent.layer.alert("删除成功"), $("#table_list").trigger("reloadGrid")) : parent.layer.alert("删除失败：" + n.msg)
				}
			})
		},
		function() {}) : parent.layer.alert("请选择要删除的数据！")
	},
	GoTo: function(n, t) {
		$(n).button("loading");
		window.location.href = t
	},
	Search: function(n) {
		var t = $("#table_list").jqGrid("getGridParam", "postData");
		$.extend(t, n);
		$("#table_list").setGridParam({
			search: !0
		}).trigger("reloadGrid", [{
			page: 1
		}])
	},
	DoPost: function(n, t, i, r, u) {
		var f = n != null,
		e;
		f && $(n).button("loading");
		e = $.ajax({
			url: t,
			type: "POST",
			data: i,
			dataType: "JSON",
			success: function(t) {
				f && $(n).button("reset");
				t.flag ? r == null || typeof r == "undefined" ? parent.layer.alert("操作成功") : r.call(this, t) : u == null || typeof u == "undefined" ? parent.layer.alert("操作失败：" + t.msg) : u.call(this, t)
			},
			complete: function(t, i) {
				f && $(n).button("reset");
				i === "timeout" && (e.abort(), parent.layer.alert("请求超时，请刷新页面重试"));
				i === "error" && (e.abort(), parent.layer.alert("请求失败，请刷新页面重试"))
			}
		})
	},
	AddCondition: function() {
		var t = $("#panel-condition"),
		n = $('<div class="row">' + t.find(".row:first").html() + "<\/div>");
		n.find(".date").removeClass("date");
		n.find(".input-group-addon").addClass("hidden");
		n.appendTo(t)
	},
	DelCondition: function(n) {
		$("#panel-condition .row").length > 1 && $(n).parent().parent().parent().parent().remove()
	},
	InitCondition: function(n) {
		for (var f = $("#panel-condition .row select[name='FieldName']"), r = $("#" + n), e = r.jqGrid("getGridParam", "colNames"), o = r.jqGrid("getGridParam", "colModel"), u = [], i, t = 0; i = o[t]; t++) i.search && u.push(['<option value="', i.name, '" data-type="', i.dataType, '">', e[t], "<\/option>"].join(""));
		f.html(u.join(""));
		$("#btnAddCondition").bind("click", this.AddCondition);
		$("#btnAdvanceSearch").bind("click", n, this.AdvanceSearch)
	},
	ChangeControler: function(n) {
		var i = $(n).parent().parent(),
		t = i.find("input[name='FieldData']");
		$(n).find("option:selected").data("type") === "date" ? (t.prev().removeClass("hidden"), t.parent().addClass("date"), i.find(".input-group.date").datepicker({
			format: "yyyy-mm-dd",
			todayBtn: "linked",
			keyboardNavigation: !1,
			forceParse: !1,
			calendarWeeks: !0,
			autoclose: !0
		})) : (t.prev().addClass("hidden"), i.find(".input-group.date").datepicker("remove"), t.parent().removeClass("date"))
	},
	AdvanceSearch: function(n) {
		var t = {
			GroupOperator: $("#txtSearchGroupOperator").val(),
			Rules: []
		};
		$.each($("#panel-condition .row"),
		function() {
			t.Rules.push({
				FieldName: $(this).find("select[name='FieldName']").val(),
				OperatorName: $(this).find("select[name='Operator']").val(),
				Data: $(this).find("input[name='FieldData']").val()
			})
		});
		var r = {
			filters: JSON.stringify(t)
		},
		i = $("#" + n.data),
		u = i.jqGrid("getGridParam", "postData");
		$.extend(u, r);
		i.setGridParam({
			search: !0
		}).trigger("reloadGrid", [{
			page: 1
		}])
	}
}

//时间戳格式化
function formatDate(now) {
	now = new Date(now);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute
			+ ":" + second;
}
//是否有效格式化
function formatStatus(now) {
	if(now==1){
		return "有效";
	}else if(now==0) {
		return "无效";
	}else{
		return "未知";
	}
}