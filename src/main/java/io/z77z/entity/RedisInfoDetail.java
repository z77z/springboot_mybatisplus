package io.z77z.entity;

import java.util.HashMap;
import java.util.Map;

public class RedisInfoDetail {
	private static Map<String, String> map = new HashMap<String, String>();
	
	static {
		map.put("redis_version", "Redis 服务器版本");
		map.put("redis_git_sha1", "Git SHA1");
		map.put("redis_git_dirty", "Git dirty flag");
		map.put("os", "Redis 服务器的宿主操作系统");
		map.put("arch_bits", " 架构（32 或 64 位）");
		map.put("multiplexing_api", "Redis 所使用的事件处理机制");
		map.put("gcc_version", "编译 Redis 时所使用的 GCC 版本");
		map.put("process_id", "服务器进程的 PID");
		map.put("run_id", "Redis 服务器的随机标识符（用于 Sentinel 和集群）");
		map.put("tcp_port", "TCP/IP 监听端口");
		map.put("uptime_in_seconds", "自 Redis 服务器启动以来，经过的秒数");
		map.put("uptime_in_days", "自 Redis 服务器启动以来，经过的天数");
		map.put("lru_clock", " 以分钟为单位进行自增的时钟，用于 LRU 管理");
		map.put("connected_clients", "已连接客户端的数量（不包括通过从属服务器连接的客户端）");
		map.put("client_longest_output_list", "当前连接的客户端当中，最长的输出列表");
		map.put("client_longest_input_buf", "当前连接的客户端当中，最大输入缓存");
		map.put("blocked_clients", "正在等待阻塞命令（BLPOP、BRPOP、BRPOPLPUSH）的客户端的数量");
		map.put("used_memory", "由 Redis 分配器分配的内存总量，以字节（byte）为单位");
		map.put("used_memory_human", "以人类可读的格式返回 Redis 分配的内存总量");
		map.put("used_memory_rss", "从操作系统的角度，返回 Redis 已分配的内存总量（俗称常驻集大小）。这个值和 top 、 ps 等命令的输出一致");
		map.put("used_memory_peak", " Redis 的内存消耗峰值(以字节为单位)");
		map.put("used_memory_peak_human", "以人类可读的格式返回 Redis 的内存消耗峰值");
		map.put("used_memory_lua", "Lua 引擎所使用的内存大小（以字节为单位）");
		map.put("mem_fragmentation_ratio", "sed_memory_rss 和 used_memory 之间的比率");
		map.put("mem_allocator", "在编译时指定的， Redis 所使用的内存分配器。可以是 libc 、 jemalloc 或者 tcmalloc");
	}
	
	private String key;
	private String value;
	private String desctiption;
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
		this.desctiption = map.get(this.key);
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDesctiption() {
		return desctiption;
	}
	public void setDesctiption(String desctiption) {
		this.desctiption = desctiption;
	}
	@Override
	public String toString() {
		return "RedisInfoDetail [key=" + key + ", value=" + value
				+ ", desctiption=" + desctiption + "]";
	}
}
