SET NAMES UTF8;

DROP DATABASE IF EXISTS o_shop;

CREATE DATABASE o_shop CHARSET=UTF8;

USE o_shop;
/*用户表*/
CREATE TABLE o_user(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username varchar(16) NOT NULL UNIQUE,
	password varchar(16) NOT NULL,
	email VARCHAR(32) NOT NULL,
	phone varchar(11) NOT NULL,
	regtime bigint not null,
	expire int not null default 0
);
/*首页轮播*/
CREATE TABLE o_index_carsouel(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title1 varchar(16) NOT NULL,
	title2 varchar(16) NOT NULL,
	title3 VARCHAR(32) NOT NULL,
	href varchar(128) NOT NULL,
	img varchar(128) NOT NULL
);

/*商品信息*/
CREATE TABLE o_product(
	fid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(32) NOT NULL,
	price DECIMAL(7,2) NOT NULL,
	f_size VARCHAR(16),
	matures VARCHAR(32),
	p_spacing VARCHAR(32),
	p_size VARCHAR(64),
	detail1 VARCHAR(256) NOT NULL,
	reviews INT DEFAULT 0 NOT NULL,
	detail2 VARCHAR(256),
	calories varchar(10),
	carbohydrates varchar(10),
	dietary varchar(10),
	protein varchar(10),
	Sugars varchar(10),
	va varchar(20),
	vc varchar(20),
	ve varchar(20),
	vk varchar(20), 
	vb6 varchar(20)
);

/*商品图片*/
CREATE TABLE o_piclist(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	fid INT NOT NULL,
	lg varchar(128),
	sm varchar(128)
);

/*首页推荐商品表*/
CREATE TABLE o_index_onsale(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	fid INT NOT NULL,
	ftype INT NOT NULL /*所属板块 1蔬菜 2水果 3有机*/
 );

/*用户购物车*/
CREATE TABLE o_user_cart(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	fid INT NOT NULL,
	fcount INT NOT NULL,
	uid INT NOT NULL
);

/*用户收货地址*/
CREATE TABLE o_user_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT NOT NULL,
	firstname varchar(20) NOT NULL,
	uaddress varchar(256) NOT NULL,
	uphone varchar(11) NOT NULL,
	isDefault int default 0
);

/*订单列表*/
CREATE TABLE o_user_list(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT NOT NULL, /*订单所属用户*/
	lDate BIGINT NOT NULL,/*订单生成时间*/
	aid INT NOT NULL, /*订单收货地址*/
	pay_method INT NOT NULL,/*订单支付方式*/
	totalprice DECIMAL(7,2) NOT NULL,/*订单总金额*/
	common varchar(128) DEFAULT '',
	lstate INT DEFAULT 0 NOT NULL /*订单状态 0未付款 1已付款等待发货 2已发货等待收货 3 交易完成 -1 订单已取消*/
);

/*
根据UID查询出订单信息 (不包括商品信息)
SELECT * from o_user_list l,o_user_address a WHERE l.uid=1 and a.aid=l.aid; 
在根据lid 查询出每个订单下的商品内容
SELECT d.*,p.title,p.price,pic.lg from o_list_detail d,o_product p,o_piclist pic 
WHERE lid=1 and d.fid=p.fid and p.fid=pic.fid GROUP BY fid

*/


/*订单内容*/
CREATE TABLE o_list_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	fid INT NOT NULL,/*订单条目商品ID*/
	fcount INT NOT NULL, /*条目数量*/
	lid INT  NOT NULL/*所属订单*/
);

/*后台管理系统  管理员表*/
CREATE TABLE o_admin(
	oaid INT PRIMARY KEY AUTO_INCREMENT,
	aname varchar(12) NOT NULL UNIQUE,
	apwd  varchar(16) NOT NULL,
	apower INT DEFAULT 1 /*权限 0-超级管理员 1-普通管理员*/
);

/*访问历史表*/
CREATE TABLE o_vhistory(
	ovid INT PRIMARY KEY AUTO_INCREMENT,
	vip varchar(32) NOT NULL,
	vtime  BIGINT NOT NULL,
	expire INT DEFAULT 0 /*是否禁止访问 0-不禁止 1-禁止*/
);



/*插入数据部分*/
insert into o_admin values(
	null,
	'root',
	'root',
	0
);

insert into o_admin values(
	null,
	'admin',
	'admin',
	1
);



insert into o_list_detail values(
	null,
	3,
	2,
	1
);
insert into o_list_detail values(
	null,
	1,
	4,
	1
);

insert into o_list_detail values(
	null,
	12,
	2,
	2
);
insert into o_list_detail values(
	null,
	11,
	1,
	2
);


insert into o_user_address values(
	null,
	1,
	'小贤',
	'广州市越秀区小北花圈1',
	'13543993748',
	0
);
insert into o_user_address values(
	null,
	1,
	'小贤',
	'广州市越秀区小北花圈2',
	'13543993325',
	0
);

insert into o_user_address values(
	null,
	2,
	'大白',
	'广州市越秀区小北花圈3',
	'13545636321',
	0
);







insert into o_user_cart values(
	null,
	8,
	4,
	1
);

insert into o_user_cart values(
	null,
	11,
	2,
	1
);

insert into o_user_cart values(
	null,
	1,
	12,
	1
);

insert into o_user_cart values(
	null,
	3,
	7,
	1
);




insert into o_index_onsale values(
		null,
		10,
		1
);
insert into o_index_onsale values(
		null,
		7,
		1
);
insert into o_index_onsale values(
		null,
		12,
		1
);
insert into o_index_onsale values(
		null,
		14,
		1
);
insert into o_index_onsale values(
		null,
		15,
		1
);
insert into o_index_onsale values(
		null,
		16,
		1
);
insert into o_index_onsale values(
		null,
		17,
		1
);
insert into o_index_onsale values(
		null,
		5,
		1
);

insert into o_index_onsale values(
		null,
		2,
		2
);
insert into o_index_onsale values(
		null,
		3,
		2
);
insert into o_index_onsale values(
		null,
		4,
		2
);
insert into o_index_onsale values(
		null,
		6,
		2
);
insert into o_index_onsale values(
		null,
		8,
		2
);
insert into o_index_onsale values(
		null,
		9,
		2
);
insert into o_index_onsale values(
		null,
		11,
		2
);
insert into o_index_onsale values(
		null,
		18,
		2
);

insert into o_index_onsale values(
		null,
		1,
		3
);
insert into o_index_onsale values(
		null,
		9,
		3
);
insert into o_index_onsale values(
		null,
		11,
		3
);
insert into o_index_onsale values(
		null,
		13,
		3
);
insert into o_index_onsale values(
		null,
		16,
		3
);
insert into o_index_onsale values(
		null,
		18,
		3
);
insert into o_index_onsale values(
		null,
		2,
		3
);
insert into o_index_onsale values(
		null,
		10,
		3
);


insert into o_piclist values(
	null,
	1,
	"images/8.jpg",
	"images/8.jpg"
);
insert into o_piclist values(
	null,
	1,
	"images/8.jpg",
	"images/9.jpg"
);
insert into o_piclist values(
	null,
	1,
	"images/8.jpg",
	"images/7.jpg"
);
insert into o_piclist values(
	null,
	1,
	"images/8.jpg",
	"images/6.jpg"
);


insert into o_piclist values(
	null,
	2,
	"images/5.jpg",
	"images/5.jpg"
);
insert into o_piclist values(
	null,
	2,
	"images/5.jpg",
	"images/12.jpg"
);

insert into o_piclist values(
	null,
	2,
	"images/5.jpg",
	"images/11.jpg"
);

insert into o_piclist values(
	null,
	2,
	"images/5.jpg",
	"images/7.jpg"
);

insert into o_piclist values(
	null,
	3,
	"images/6.jpg",
	"images/6.jpg"
);

insert into o_piclist values(
	null,
	3,
	"images/6.jpg",
	"images/bg-4.png"
);

insert into o_piclist values(
	null,
	3,
	"images/6.jpg",
	"images/bg-5.png"
);
insert into o_piclist values(
	null,
	3,
	"images/6.jpg",
	"images/bg-2.png"
);

insert into o_piclist values(
	null,
	4,
	"images/14.jpg",
	"images/14.jpg"
);

insert into o_piclist values(
	null,
	4,
	"images/14.jpg",
	"images/19.jpg"
);

insert into o_piclist values(
	null,
	4,
	"images/14.jpg",
	"images/17.jpg"
);
insert into o_piclist values(
	null,
	4,
	"images/14.jpg",
	"images/6.jpg"
);

insert into o_piclist values(
	null,
	5,
	"images/21.jpg",
	"images/21.jpg"
);

insert into o_piclist values(
	null,
	5,
	"images/21.jpg",
	"images/11.jpg"
);

insert into o_piclist values(
	null,
	5,
	"images/21.jpg",
	"images/10.jpg"
);

insert into o_piclist values(
	null,
	5,
	"images/21.jpg",
	"images/18.jpg"
);


insert into o_piclist values(
	null,
	6,
	"images/12.jpg",
	"images/12.jpg"
);

insert into o_piclist values(
	null,
	6,
	"images/12.jpg",
	"images/5.jpg"
);

insert into o_piclist values(
	null,
	6,
	"images/12.jpg",
	"images/7.jpg"
);

insert into o_piclist values(
	null,
	6,
	"images/12.jpg",
	"images/11.jpg"
);

insert into o_piclist values(
	null,
	7,
	"images/25.jpg",
	"images/25.jpg"
);

insert into o_piclist values(
	null,
	7,
	"images/25.jpg",
	"images/22.jpg"
);

insert into o_piclist values(
	null,
	7,
	"images/25.jpg",
	"images/21.jpg"
);
insert into o_piclist values(
	null,
	7,
	"images/25.jpg",
	"images/18.jpg"
);


insert into o_piclist values(
	null,
	8,
	"images/7.jpg",
	"images/7.jpg"
);
insert into o_piclist values(
	null,
	8,
	"images/7.jpg",
	"images/6.jpg"
);
insert into o_piclist values(
	null,
	8,
	"images/7.jpg",
	"images/12.jpg"
);
insert into o_piclist values(
	null,
	8,
	"images/7.jpg",
	"images/bg-5.png"
);


insert into o_piclist values(
	null,
	9,
	"images/9.jpg",
	"images/9.jpg"
);

insert into o_piclist values(
	null,
	9,
	"images/9.jpg",
	"images/11.jpg"
);

insert into o_piclist values(
	null,
	9,
	"images/9.jpg",
	"images/18.jpg"
);
insert into o_piclist values(
	null,
	9,
	"images/9.jpg",
	"images/19.jpg"
);


insert into o_piclist values(
	null,
	10,
	"images/10.jpg",
	"images/10.jpg"
);

insert into o_piclist values(
	null,
	10,
	"images/10.jpg",
	"images/25.jpg"
);

insert into o_piclist values(
	null,
	10,
	"images/10.jpg",
	"images/22.jpg"
);
insert into o_piclist values(
	null,
	10,
	"images/10.jpg",
	"images/18.jpg"
);


insert into o_piclist values(
	null,
	11,
	"images/bg-2.png",
	"images/bg-2.png"
);

insert into o_piclist values(
	null,
	11,
	"images/bg-5.png",
	"images/bg-5.png"
);

insert into o_piclist values(
	null,
	11,
	"images/bg-4.png",
	"images/bg-4.png"
);

insert into o_piclist values(
	null,
	11,
	"images/bg-3.png",
	"images/bg-3.png"
);


insert into o_piclist values(
	null,
	12,
	"images/16.jpg",
	"images/16.jpg"
);
insert into o_piclist values(
	null,
	12,
	"images/16.jpg",
	"images/14.jpg"
);

insert into o_piclist values(
	null,
	12,
	"images/16.jpg",
	"images/13.jpg"
);

insert into o_piclist values(
	null,
	12,
	"images/16.jpg",
	"images/10.jpg"
);

insert into o_piclist values(
	null,
	13,
	"images/13.jpg",
	"images/13.jpg"
);

insert into o_piclist values(
	null,
	13,
	"images/13.jpg",
	"images/21.jpg"
);

insert into o_piclist values(
	null,
	13,
	"images/13.jpg",
	"images/20.jpg"
);
insert into o_piclist values(
	null,
	13,
	"images/13.jpg",
	"images/11.jpg"
);


insert into o_piclist values(
	null,
	14,
	"images/18.jpg",
	"images/17.jpg"
);

insert into o_piclist values(
	null,
	14,
	"images/18.jpg",
	"images/21.jpg"
);

insert into o_piclist values(
	null,
	14,
	"images/18.jpg",
	"images/19.jpg"
);

insert into o_piclist values(
	null,
	14,
	"images/18.jpg",
	"images/11.jpg"
);

insert into o_piclist values(
	null,
	15,
	"images/17.jpg",
	"images/17.jpg"
);
insert into o_piclist values(
	null,
	15,
	"images/17.jpg",
	"images/5.jpg"
);
insert into o_piclist values(
	null,
	15,
	"images/17.jpg",
	"images/10.jpg"
);
insert into o_piclist values(
	null,
	15,
	"images/17.jpg",
	"images/7.jpg"
);

insert into o_piclist values(
	null,
	16,
	"images/19.jpg",
	"images/19.jpg"
);
insert into o_piclist values(
	null,
	16,
	"images/19.jpg",
	"images/22.jpg"
);
insert into o_piclist values(
	null,
	16,
	"images/19.jpg",
	"images/20.jpg"
);
insert into o_piclist values(
	null,
	16,
	"images/19.jpg",
	"images/13.jpg"
);


insert into o_piclist values(
	null,
	17,
	"images/22.jpg",
	"images/22.jpg"
);
insert into o_piclist values(
	null,
	17,
	"images/22.jpg",
	"images/18.jpg"
);
insert into o_piclist values(
	null,
	17,
	"images/22.jpg",
	"images/21.jpg"
);
insert into o_piclist values(
	null,
	17,
	"images/22.jpg",
	"images/25.jpg"
);


insert into o_piclist values(
	null,
	18,
	"images/bg-5.png",
	"images/bg-5.png"
);
insert into o_piclist values(
	null,
	18,
	"images/bg-5.png",
	"images/bg-2.png"
);
insert into o_piclist values(
	null,
	18,
	"images/bg-5.png",
	"images/bg-3.png"
);
insert into o_piclist values(
	null,
	18,
	"images/bg-5.png",
	"images/bg-4.png"
);


insert into o_user values(null,'root','root','root@qq.com','13112144654',1509586680872,0);

insert into o_index_carsouel values(
	null,'100%纯天然','ORGANIC','最值得信赖的水果商店','product_detail.html?fid=9','images/bg-13.png'
);
insert into o_index_carsouel values(
	null,'来自农场','Vegetable','来自农场的水果 & 蔬菜','product_detail.html?fid=1','images/bg-12.png'
);
insert into o_index_carsouel values(
	null,'简单','FRUIT','小事物有大不同','product_detail.html?fid=11','images/bg-21.png'
);

insert into o_product values(
		null,
		"红 椒",
		6.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"红富士",
		8.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"水蜜桃",
		8.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"菠萝",
		12.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"番茄",
		4.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"梨子",
		8.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"玉米",
		7.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"番石榴",
		13.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"草莓",
		11.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"芹菜",
		8.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"甜橙",
		6.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"卷心菜",
		2.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"圣女果",
		10.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"西兰花",
		4.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"红辣椒",
		2.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"胡萝卜",
		3.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"豌豆",
		4.50,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);

insert into o_product values(
		null,
		"青苹果",
		5.00,
		"12厘米",
		"70~80天",
		"50厘米到70厘米之间",
		"60厘米高, 占地30平方厘米",
		"红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...",
		15,
		"茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。",
		"46",
		"9g",
		"3g",
		"1g",
		"6g",
		"93% DV",
		"317%",
		"12%",
		"9%",
		"22%"
);
INSERT INTO `o_vhistory` (`ovid`, `vip`, `vtime`, `expire`) VALUES
(1, '42.199.53.209', 1509371398000, 0),
(2, '101.199.108.50', 1509371468000, 0),
(3, '112.97.53.93', 1509371605000, 0),
(4, '113.96.219.250', 1509375423000, 0),
(5, '42.199.53.179', 1509375433000, 0),
(6, '14.215.161.16', 1509377493000, 0),
(7, '42.199.53.236', 1509379821000, 0),
(8, '42.199.53.225', 1509380682000, 0),
(9, '42.199.53.179', 1509380982000, 0),
(10, '220.181.132.181', 1509381209000, 0),
(11, '14.17.21.58', 1509391219000, 0),
(12, '112.97.49.81', 1509407787000, 0),
(13, '42.199.53.24', 1509453841000, 0),
(14, '42.199.53.167', 1509454350000, 0),
(15, '119.147.207.144', 1509457750000, 0),
(16, '42.199.53.24', 1509458812000, 0),
(17, '220.181.132.195', 1509458847000, 0),
(18, '101.199.112.52', 1509458889000, 0),
(19, '220.181.132.194', 1509458900000, 0),
(20, '101.199.112.54', 1509458909000, 0),
(21, '101.199.112.45', 1509458940000, 0),
(22, '101.199.112.52', 1509458954000, 0),
(23, '101.199.112.45', 1509459219000, 0),
(24, '112.97.49.93', 1509515140000, 0),
(25, '42.199.53.97', 1509543531000, 0),
(26, '42.199.53.236', 1509543546000, 0),
(27, '42.199.53.10', 1509543609000, 0),
(28, '101.199.108.50', 1509543615000, 0),
(29, '113.104.64.20', 1509543717000, 0),
(30, '220.181.132.181', 1509547528000, 0),
(31, '106.120.162.93', 1509547534000, 0),
(32, '42.199.53.197', 1509550256000, 0),
(33, '117.136.40.129', 1509550644000, 0),
(34, '183.57.53.196', 1509561023000, 0),
(35, '101.226.64.174', 1509563565000, 0),
(36, '113.104.64.20', 1509588889000, 0);



update o_product set reviews=RAND()*10;