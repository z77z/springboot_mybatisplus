项目功能的具体实现，本人个人博客中都有学习记录。本人博客每周更新学习内容。

博客地址 ： http://z77z.oschina.io/

stable_version分支是可以保证稳定跑起来的，本项目只做学习交流用，并不是标准的开发模式，只是注重功能的实现。

最新功能的实现可以在master分支中看到。

本项目实现的功能如下：

1.美女图片爬虫，爬虫启动是在springboot_mybatisplus/src/main/java/io/z77z/CrawlerMain.java，使用test方式运行即可。

2.mybatisplus的整合，完成了基本的demo实现

3.整个项目的核心是springBoot，每个框架插件的使用都是基于springBoot的整合。

4.redis和springBoot的整合，完成基本Demo。

4.shiro的整合，详见springBoot+shiro学习之系列博文。实现的功能如下：

- Shiro 初始权限动态加载。

- Shiro Ajax请求权限不满足，拦截后解决方案。

- 用户禁止登录开关。

- 在线显示，在线用户管理（踢出登录）。

- GIF验证码验证

- 记住用户

- 一个帐号多处登录限制，挤掉最先登录的用户。可以设置同一账号的同时在线数量。

- 使用redis实现shiro缓存，使用shiro-redis插件。

- 密码采用用户名+密码采用DES加密方式入库。

- 密码重试次数限制。




![](http://z77z.oschina.io/img/1.png)

![](http://z77z.oschina.io/img/2.png)

![](http://z77z.oschina.io/img/3.png)