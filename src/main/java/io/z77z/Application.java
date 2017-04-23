package io.z77z;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;

/**
 * springboot口
 * 
 * @author z77z
 *
 */
// 扫描指定包下面的mapper接口
@MapperScan("io.z77z.dao")

// 该 @SpringBootApplication 注解等价于以默认属性使用:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan

@SpringBootApplication
@EnableCaching(proxyTargetClass = true) // 开启缓存功能
public class Application extends SpringBootServletInitializer implements CommandLineRunner {
	// 入口
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Java EE应用服务器配置，
	// 如果要使用tomcat来加载jsp的话就必须继承SpringBootServletInitializer类并且重写其中configure方法
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}

	// springboot运行后此方法首先被调用
	// 实现CommandLineRunner抽象类中的run方法
	@Override
	public void run(String... args) throws Exception {
		System.out.println("springboot启动完成！");
	}
}
