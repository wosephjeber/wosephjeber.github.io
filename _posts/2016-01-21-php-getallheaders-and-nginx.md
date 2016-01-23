---
layout: post
title: "Today I Learned: PHP getallheaders() method and NGINX"
date: 2016-01-21 14:26:00
tags: ['php', 'nginx', 'today I learned']
---

PHP has a useful `getallheaders()` method that returns a request's HTTP headers
as an array. I was using this for my organization's CMS to check the origin of a
request so I could enable CORS for whitelisted origins. It worked fine on my local
machine, but when I deployed it to production it returned a 500 error. The only
difference between my local installation of the CMS and the production environment
is that I'm running Apache on my machine, but the server is running NGINX.

After some digging, I discovered that `getallheaders()` is an alias for
`apache_request_headers()`, which until PHP version 5.4 was, as the method name
suggest, only supported if PHP was running under an Apache web server. According
to the [PHP manual](http://php.net/manual/en/function.apache-request-headers.php)
it's supposed to now be supported under FastCGI, which is used by our CMS in production,
so I think there must be something else at play here.
