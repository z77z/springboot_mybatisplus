package io.z77z.test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.apache.shiro.session.Session;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.crazycake.shiro.RedisSessionDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.Application;
import io.z77z.entity.SysUser;
import io.z77z.entity.UserOnlineBo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class OnlineUsersTest {
	
	@Autowired
	RedisSessionDAO redisSessionDAO;
	
	@Test
	public void test() {
		//因为我们是用redis实现了shiro的session的Dao,而且是采用了shiro+redis这个插件
		//所以从spring容器中获取redisSessionDAO
		//来获取session列表.
		Collection<Session> sessions = redisSessionDAO.getActiveSessions();
		Iterator<Session> it = sessions.iterator();
		List<UserOnlineBo> onlineUserList = new ArrayList<UserOnlineBo>();
		Page<UserOnlineBo> page = new Page<UserOnlineBo>();
		//遍历session
		while (it.hasNext()) {
			SimplePrincipalCollection spc = (SimplePrincipalCollection)it.next().getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY);
			SysUser user = (SysUser)spc.getPrimaryPrincipal();
			UserOnlineBo onlineUser = new UserOnlineBo(user);
			System.out.println(user.getNickname());
			onlineUserList.add(onlineUser);
		}
		//再将List<UserOnlineBo>转换成mybatisPlus封装的page对象
		page.setRecords(onlineUserList);
	}
}
