package io.z77z.config;

import io.z77z.entity.SysPermissionInit;
import io.z77z.service.SysPermissionInitService;
import io.z77z.shiro.MyShiroRealm;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.crazycake.shiro.RedisCacheManager;
import org.crazycake.shiro.RedisManager;
import org.crazycake.shiro.RedisSessionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.shiro.mgt.SecurityManager;

/**
 * @author 作者 z77z
 * @date 创建时间：2017年2月10日 下午1:16:38
 * 
 */
@Configuration
public class ShiroConfig {

	@Autowired
	SysPermissionInitService sysPermissionInitService;
	
	@Value("${spring.redis.host}")
	private String host;
	
	@Value("${spring.redis.port}")
	private int port;

	/**
	 * ShiroFilterFactoryBean 处理拦截资源文件问题。
	 * 注意：单独一个ShiroFilterFactoryBean配置是或报错的，以为在
	 * 初始化ShiroFilterFactoryBean的时候需要注入：SecurityManager
	 *
	 * Filter Chain定义说明 1、一个URL可以配置多个Filter，使用逗号分隔 2、当设置多个过滤器时，全部验证通过，才视为通过
	 * 3、部分过滤器可指定参数，如perms，roles
	 *
	 */
	@Bean
	public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();

		// 必须设置 SecurityManager
		shiroFilterFactoryBean.setSecurityManager(securityManager);

		// 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
		shiroFilterFactoryBean.setLoginUrl("/login");
		// 登录成功后要跳转的链接
		shiroFilterFactoryBean.setSuccessUrl("/index");
		// 未授权界面;
		shiroFilterFactoryBean.setUnauthorizedUrl("/403");

		// 权限控制map.
		Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
		// 配置不会被拦截的链接 顺序判断
		// 配置退出过滤器,其中的具体的退出代码Shiro已经替我们实现了
		// 从数据库获取动态的权限
		// filterChainDefinitionMap.put("/add", "perms[权限添加]");
		// <!-- 过滤链定义，从上向下顺序执行，一般将 /**放在最为下边 -->:这是一个坑呢，一不小心代码就不好使了;
		// <!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
		//从数据库获取
		List<SysPermissionInit> list = sysPermissionInitService.selectAll();

		for (SysPermissionInit sysPermissionInit : list) {
			filterChainDefinitionMap.put(sysPermissionInit.getUrl(),
					sysPermissionInit.getPermissionInit());
		}

		shiroFilterFactoryBean
				.setFilterChainDefinitionMap(filterChainDefinitionMap);
		System.out.println("Shiro拦截器工厂类注入成功");
		return shiroFilterFactoryBean;
	}

	@Bean
	public SecurityManager securityManager() {
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		// 设置realm.
		securityManager.setRealm(myShiroRealm());
		//自定义缓存实现  使用redis
		securityManager.setCacheManager(cacheManager());
		//自定义session管理 使用redis
		securityManager.setSessionManager(SessionManager());
		return securityManager;
	}

	/**
	 * 身份认证realm; (这个需要自己写，账号密码校验；权限等)
	 * 
	 * @return
	 */
	public MyShiroRealm myShiroRealm() {
		MyShiroRealm myShiroRealm = new MyShiroRealm();
		return myShiroRealm;
	}
	
	/**
	 * 配置shiro redisManager
	 * @return
	 */
	public RedisManager redisManager(){
		RedisManager redisManager = new RedisManager();
		redisManager.setHost(host);
		redisManager.setPort(port);
		redisManager.setExpire(1800);//配置过期时间
		//redisManager.setTimeout(timeout);
		//redisManager.setPassword(password);
		return redisManager;
	}
	
	/**
	 * cacheManager  缓存 redis实现
	 * @return
	 */
	public RedisCacheManager cacheManager(){
		RedisCacheManager redisCacheManager = new RedisCacheManager();
		redisCacheManager.setRedisManager(redisManager());
		return redisCacheManager;
	}
	
	/**
	 * RedisSessionDAO shiro sessionDao层的实现 通过redis
	 */
	public RedisSessionDAO redisSessionDAO(){
		RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
		redisSessionDAO.setRedisManager(redisManager());
		return redisSessionDAO;
	}
	
	/**
	 * shiro session的管理
	 */
	public DefaultWebSessionManager SessionManager(){
		DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
		sessionManager.setSessionDAO(redisSessionDAO());
		return sessionManager;
	}
	
}
