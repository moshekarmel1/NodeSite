// Common functionality for loading header and footer
class SiteComponents {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'home';
        if (path.includes('/career')) return 'career';
        if (path.includes('/projects')) return 'projects';
        if (path.includes('/show')) return 'show';
        if (path.includes('/thoughts')) return 'thoughts';
        return '';
    }

    getHeaderHTML() {
        return `<header class="header">
    <div class="header-left">
        <a href="https://news.ycombinator.com"></a>
    </div>
    <div class="header-center">
        <span class="pagetop"><b class="hnname"><a href="/">Moshe Karmel</a></b>
            <a href="/" id="nav-home">home</a> | <a href="/career" id="nav-career">career</a> | <a href="/projects" id="nav-projects">projects</a> | <a href="/show" id="nav-show">show</a> | <a href="/thoughts" id="nav-thoughts">thoughts</a>
        </span>
    </div>
    <div class="header-right">
        <span class="pagetop">
            <a id="me" href="#">you</a> (613) |
            <a id="logout" href="#">logout</a>
        </span>
    </div>
</header>
<div class="spacer"></div>`;
    }

    getFooterHTML() {
        return `<footer class="footer">
    <div class="footer-divider"></div>
    <div style="text-align: center;">
        <span class="yclinks"><a href="https://github.com/moshekarmel1">Github</a>
            | <a href="http://moshekarmelprogramming.blogspot.com/">Blog</a>
            | <a href="https://www.linkedin.com/in/moshe-karmel-3283a870">LinkedIn</a>
            | <a href="https://stackoverflow.com/users/4138452/moshe-karmel">StackExchange</a>
            | <a href="mailto:moshekarmel1@gmail.com">Contact</a>
            | <a href="https://rktrefer.com/mk82">Mortgage Referral</a></span><br><br>
    </div>
    <div style="text-align: center;">
        <span class="yclinks">This site design was <b>heavily</b> inspired by <a
                href="https://news.ycombinator.com/news" class="hnuser">Hacker News</a>.
            Minimalist++</span>
    </div>
</footer>`;
    }

    updateNavigation(headerHtml) {
        if (this.currentPage) {
            const navId = `nav-${this.currentPage}`;
            headerHtml = headerHtml.replace(
                new RegExp(`(<a href="[^"]*" id="${navId}"[^>]*>)([^<]+)(</a>)`), 
                `<span class="topsel">$1$2$3</span>`
            );
        }
        return headerHtml;
    }

    init() {
        const headerElement = document.getElementById('common-header');
        const footerElement = document.getElementById('common-footer');

        if (headerElement) {
            headerElement.innerHTML = this.updateNavigation(this.getHeaderHTML());
        }

        if (footerElement) {
            footerElement.innerHTML = this.getFooterHTML();
        }

        // Process time-ago elements
        this.processTimeAgoElements();
    }

    processTimeAgoElements() {
        const timeAgoElements = document.querySelectorAll('.time-ago');
        timeAgoElements.forEach(element => {
            const dateStr = element.getAttribute('data-date');
            if (dateStr && typeof timeAgo === 'function') {
                const dateParts = dateStr.split(',').map(Number);
                const date = new Date(dateParts[0], dateParts[1], dateParts[2]);
                element.textContent = timeAgo(date);
            }
        });
    }
}

// timeAgo function (moved up for availability)
const timeAgo = (() => {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const thresholds = [
        { threshold: 540 * day, modifier: 365 * day, render: elapsed => `${elapsed} years ago` },
        { threshold: 320 * day, render: () => 'a year ago' },
        { threshold: 45 * day, modifier: 30 * day, render: elapsed => `${elapsed} months ago` },
        { threshold: 26 * day, render: () => 'a month ago' },
        { threshold: 36 * hour, modifier: 24 * hour, render: elapsed => `${elapsed} days ago` },
        { threshold: 22 * hour, render: () => 'a day ago' },
        { threshold: 90 * minute, modifier: 60 * minute, render: elapsed => `${elapsed} hours ago` },
        { threshold: 45 * minute, render: () => 'an hour ago' },
        { threshold: 90 * second, modifier: 60 * second, render: elapsed => `${elapsed} minutes ago` },
        { threshold: 46 * second, render: () => 'a minute ago' },
        { threshold: 0 * second, render: () => 'a few seconds ago' },
    ]

    return date => {
        const elapsed = Math.round(new Date() - date)
        const { render, modifier } = thresholds.find(({ threshold }) => elapsed >= threshold)
        return render(Math.round(elapsed / modifier))
    }
})()

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const siteComponents = new SiteComponents();
    siteComponents.init();
});

// Original pizza.js functionality below
function $(id) { return document.getElementById(id); }
function byClass(el, cl) { return el ? el.getElementsByClassName(cl) : [] }
function byTag(el, tg) { return el ? el.getElementsByTagName(tg) : [] }
function allof(cl) { return byClass(document, cl) }
function hasClass(el, cl) { var a = el.className.split(' '); return afind(cl, a) }
function addClass(el, cl) { if (el) { var a = el.className.split(' '); if (!afind(cl, a)) { a.unshift(cl); el.className = a.join(' ') } } }
function remClass(el, cl) { if (el) { var a = el.className.split(' '); arem(a, cl); el.className = a.join(' ') } }
function html(el) { return el ? el.innerHTML : null; }
function attr(el, name) { return el.getAttribute(name) }
function tonum(x) { var n = parseFloat(x); return isNaN(n) ? null : n }
function remEl(el) { el.parentNode.removeChild(el) }
function posf(f, a) { for (var i = 0; i < a.length; i++) { if (f(a[i])) return i; } return -1; }
function apos(x, a) { return (typeof x == 'function') ? posf(x, a) : Array.prototype.indexOf.call(a, x) }
function afind(x, a) { var i = apos(x, a); return (i >= 0) ? a[i] : null; }
function acut(a, m, n) { return Array.prototype.slice.call(a, m, n) }
function aeach(fn, a) { return Array.prototype.forEach.call(a, fn) }
function arem(a, x) { var i = apos(x, a); if (i >= 0) { a.splice(i, 1); } return a; }
function alast(a) { return a[a.length - 1] }
function vis(el, on) { if (el) { (on ? remClass : addClass)(el, 'nosee') } }
function setshow(el, on) { (on ? remClass : addClass)(el, 'noshow') }
function noshow(el) { setshow(el, false) }
function ind(el) { return (byTag(el, 'img')[0] || {}).width }

function vote(ev, el, how) {
    var id = el.id.split(/_/)[1];
    var up = $('up_' + id);
    vis(up, how == 'un');
    vis($('down_' + id), how == 'un');
    var unv = '';
    if (how != 'un') {
        unv = " | <a id='un_" + id
            + "' onclick='return vote(event, this,\"un\")' href='"
            + up.href.replace('how=up', 'how=un')
            + "'>" + (how == 'up' ? 'unvote' : 'undown') + "</a>"
    }
    $('unv_' + id).innerHTML = unv;
    new Image().src = el.href;
    ev.stopPropagation();
    return false;
}

function kid1(el) {
    while (el = el.nextElementSibling) {
        if (hasClass(el, 'comtr')) return el;
    }
}

function kids(tr, all) {
    var i = ind(tr), j = ind(kid1(tr)), ks = [];
    if (j > i) {
        while (tr = kid1(tr)) {
            if (ind(tr) <= i) break;
            else if (all || (ind(tr) == j)) ks.push(tr);
        }
    }
    return ks;
}

function toggle(ev, id) {
    var tr = $(id), on = !hasClass(tr, 'coll');
    (on ? addClass : remClass)(tr, 'coll');
    commstate(tr);
    if ($('logout')) {
        new Image().src = 'collapse?id=' + id + (on ? '' : '&un=true');
    }
    ev.stopPropagation();
    return false;
}

function commstate(tr) {
    setshow(tr, true);
    var coll = hasClass(tr, 'coll');
    vis(byClass(tr, 'votelinks')[0], !coll);
    setshow(byClass(tr, 'comment')[0], !coll);
    var el = byClass(tr, 'togg')[0];
    el.innerHTML = coll ? ('[' + el.getAttribute('n') + ' more]') : '[â€"]';
    coll ? aeach(noshow, kids(tr, true)) : aeach(commstate, kids(tr));
}

function ajax(fn, url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            fn(req.responseText)
        }
    }
    return req.send();
}

function onop() { return attr(byTag(document, 'html')[0], 'op') }

function ranknum(el) {
    var s = html(el) || "";
    var a = s.match(/[0-9]+/);
    if (a) {
        return tonum(a[0]);
    }
}

var n1 = ranknum(allof('rank')[0]) || 1;

function newstory(json) {
    if (json) {
        var pair = JSON.parse(json);
        var sp = alast(allof('spacer'));
        sp.insertAdjacentHTML('afterend', pair[0] + sp.outerHTML);
        fixranks();
        if (onop() == 'newest') {
            var n = ranknum(alast(allof('rank')));
            allof('morelink')[0].href = 'newest?next=' + pair[1] + '&n=' + (n + 1);
        }
    }
}

function fixranks() {
    var rks = allof('rank');
    aeach(function (rk) { rk.innerHTML = (apos(rk, rks) + n1) + '.' }, rks);
}

function moreurl() { return allof('morelink')[0].href }
function morenext() { return tonum(moreurl().split('next=')[1]) }

function hidestory(ev, el, id) {
    for (var i = 0; i < 3; i++) { remEl($(id).nextSibling) }
    remEl($(id));
    fixranks();
    var next = (onop() == 'newest' && morenext()) ? ('&next=' + morenext()) : ''
    var url = el.href.replace('hide', 'snip-story').replace('goto', 'onop')
    ajax(newstory, url + next);
    ev.stopPropagation();
    return false;
}