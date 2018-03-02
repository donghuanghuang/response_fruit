-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-02 12:33:56
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `o_shop`
--
CREATE DATABASE IF NOT EXISTS `o_shop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `o_shop`;

-- --------------------------------------------------------

--
-- 表的结构 `o_admin`
--

CREATE TABLE `o_admin` (
  `oaid` int(11) NOT NULL,
  `aname` varchar(12) NOT NULL,
  `apwd` varchar(16) NOT NULL,
  `apower` int(11) NOT NULL DEFAULT '1',
  `expire` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_admin`
--

INSERT INTO `o_admin` (`oaid`, `aname`, `apwd`, `apower`,`expire`) VALUES
(1, 'root', 'root', 0,0),
(2, 'admin', 'admin', 1,0);

-- --------------------------------------------------------

--
-- 表的结构 `o_index_carsouel`
--

CREATE TABLE `o_index_carsouel` (
  `id` int(11) NOT NULL,
  `title1` varchar(16) NOT NULL,
  `title2` varchar(16) NOT NULL,
  `title3` varchar(32) NOT NULL,
  `href` varchar(128) NOT NULL,
  `img` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_index_carsouel`
--

INSERT INTO `o_index_carsouel` (`id`, `title1`, `title2`, `title3`, `href`, `img`) VALUES
(1, '100%纯天然', 'ORGANIC', '最值得信赖的水果商店', 'product_detail.html?fid=9', 'images/bg-13.png'),
(2, '来自农场', 'Vegetable', '来自农场的水果 & 蔬菜', 'product_detail.html?fid=1', 'images/bg-12.png'),
(3, '简单', 'FRUIT', '小事物有大不同', 'product_detail.html?fid=11', 'images/bg-21.png');

-- --------------------------------------------------------

--
-- 表的结构 `o_index_onsale`
--

CREATE TABLE `o_index_onsale` (
  `pid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `ftype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_index_onsale`
--

INSERT INTO `o_index_onsale` (`pid`, `fid`, `ftype`) VALUES
(1, 10, 1),
(2, 7, 1),
(3, 12, 1),
(4, 14, 1),
(5, 15, 1),
(6, 16, 1),
(7, 17, 1),
(8, 5, 1),
(9, 2, 2),
(10, 3, 2),
(11, 4, 2),
(12, 6, 2),
(13, 8, 2),
(14, 9, 2),
(15, 11, 2),
(16, 18, 2),
(17, 1, 3),
(18, 9, 3),
(19, 11, 3),
(20, 13, 3),
(21, 16, 3),
(22, 18, 3),
(23, 2, 3),
(24, 10, 3);

-- --------------------------------------------------------

--
-- 表的结构 `o_list_detail`
--

CREATE TABLE `o_list_detail` (
  `did` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fcount` int(11) NOT NULL,
  `lid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_list_detail`
--

INSERT INTO `o_list_detail` (`did`, `fid`, `fcount`, `lid`) VALUES
(1, 3, 2, 1),
(2, 1, 4, 1),
(3, 12, 2, 2),
(4, 11, 1, 2),
(5, 1, 12, 1),
(6, 3, 7, 1),
(7, 8, 4, 1),
(8, 9, 1, 1),
(9, 11, 2, 1),
(10, 10, 1, 2),
(11, 5, 1, 3);

-- --------------------------------------------------------

--
-- 表的结构 `o_piclist`
--

CREATE TABLE `o_piclist` (
  `pid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `lg` varchar(128) DEFAULT NULL,
  `sm` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_piclist`
--

INSERT INTO `o_piclist` (`pid`, `fid`, `lg`, `sm`) VALUES
(1, 1, 'images/8.jpg', 'images/8.jpg'),
(2, 1, 'images/8.jpg', 'images/9.jpg'),
(3, 1, 'images/8.jpg', 'images/7.jpg'),
(4, 1, 'images/8.jpg', 'images/6.jpg'),
(5, 2, 'images/5.jpg', 'images/5.jpg'),
(6, 2, 'images/5.jpg', 'images/12.jpg'),
(7, 2, 'images/5.jpg', 'images/11.jpg'),
(8, 2, 'images/5.jpg', 'images/7.jpg'),
(9, 3, 'images/6.jpg', 'images/6.jpg'),
(10, 3, 'images/6.jpg', 'images/bg-4.png'),
(11, 3, 'images/6.jpg', 'images/bg-5.png'),
(12, 3, 'images/6.jpg', 'images/bg-2.png'),
(13, 4, 'images/14.jpg', 'images/14.jpg'),
(14, 4, 'images/14.jpg', 'images/19.jpg'),
(15, 4, 'images/14.jpg', 'images/17.jpg'),
(16, 4, 'images/14.jpg', 'images/6.jpg'),
(17, 5, 'images/21.jpg', 'images/21.jpg'),
(18, 5, 'images/21.jpg', 'images/11.jpg'),
(19, 5, 'images/21.jpg', 'images/10.jpg'),
(20, 5, 'images/21.jpg', 'images/18.jpg'),
(21, 6, 'images/12.jpg', 'images/12.jpg'),
(22, 6, 'images/12.jpg', 'images/5.jpg'),
(23, 6, 'images/12.jpg', 'images/7.jpg'),
(24, 6, 'images/12.jpg', 'images/11.jpg'),
(25, 7, 'images/25.jpg', 'images/25.jpg'),
(26, 7, 'images/25.jpg', 'images/22.jpg'),
(27, 7, 'images/25.jpg', 'images/21.jpg'),
(28, 7, 'images/25.jpg', 'images/18.jpg'),
(29, 8, 'images/7.jpg', 'images/7.jpg'),
(30, 8, 'images/7.jpg', 'images/6.jpg'),
(31, 8, 'images/7.jpg', 'images/12.jpg'),
(32, 8, 'images/7.jpg', 'images/bg-5.png'),
(33, 9, 'images/9.jpg', 'images/9.jpg'),
(34, 9, 'images/9.jpg', 'images/11.jpg'),
(35, 9, 'images/9.jpg', 'images/18.jpg'),
(36, 9, 'images/9.jpg', 'images/19.jpg'),
(37, 10, 'images/10.jpg', 'images/10.jpg'),
(38, 10, 'images/10.jpg', 'images/25.jpg'),
(39, 10, 'images/10.jpg', 'images/22.jpg'),
(40, 10, 'images/10.jpg', 'images/18.jpg'),
(41, 11, 'images/bg-2.png', 'images/bg-2.png'),
(42, 11, 'images/bg-5.png', 'images/bg-5.png'),
(43, 11, 'images/bg-4.png', 'images/bg-4.png'),
(44, 11, 'images/bg-3.png', 'images/bg-3.png'),
(45, 12, 'images/16.jpg', 'images/16.jpg'),
(46, 12, 'images/16.jpg', 'images/14.jpg'),
(47, 12, 'images/16.jpg', 'images/13.jpg'),
(48, 12, 'images/16.jpg', 'images/10.jpg'),
(49, 13, 'images/13.jpg', 'images/13.jpg'),
(50, 13, 'images/13.jpg', 'images/21.jpg'),
(51, 13, 'images/13.jpg', 'images/20.jpg'),
(52, 13, 'images/13.jpg', 'images/11.jpg'),
(53, 14, 'images/18.jpg', 'images/17.jpg'),
(54, 14, 'images/18.jpg', 'images/21.jpg'),
(55, 14, 'images/18.jpg', 'images/19.jpg'),
(56, 14, 'images/18.jpg', 'images/11.jpg'),
(57, 15, 'images/17.jpg', 'images/17.jpg'),
(58, 15, 'images/17.jpg', 'images/5.jpg'),
(59, 15, 'images/17.jpg', 'images/10.jpg'),
(60, 15, 'images/17.jpg', 'images/7.jpg'),
(61, 16, 'images/19.jpg', 'images/19.jpg'),
(62, 16, 'images/19.jpg', 'images/22.jpg'),
(63, 16, 'images/19.jpg', 'images/20.jpg'),
(64, 16, 'images/19.jpg', 'images/13.jpg'),
(65, 17, 'images/22.jpg', 'images/22.jpg'),
(66, 17, 'images/22.jpg', 'images/18.jpg'),
(67, 17, 'images/22.jpg', 'images/21.jpg'),
(68, 17, 'images/22.jpg', 'images/25.jpg'),
(69, 18, 'images/bg-5.png', 'images/bg-5.png'),
(70, 18, 'images/bg-5.png', 'images/bg-2.png'),
(71, 18, 'images/bg-5.png', 'images/bg-3.png'),
(72, 18, 'images/bg-5.png', 'images/bg-4.png');

-- --------------------------------------------------------

--
-- 表的结构 `o_product`
--

CREATE TABLE `o_product` (
  `fid` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `f_size` varchar(16) DEFAULT NULL,
  `matures` varchar(32) DEFAULT NULL,
  `p_spacing` varchar(32) DEFAULT NULL,
  `p_size` varchar(64) DEFAULT NULL,
  `detail1` varchar(256) NOT NULL,
  `reviews` int(11) NOT NULL DEFAULT '0',
  `detail2` varchar(256) DEFAULT NULL,
  `calories` varchar(10) DEFAULT NULL,
  `carbohydrates` varchar(10) DEFAULT NULL,
  `dietary` varchar(10) DEFAULT NULL,
  `protein` varchar(10) DEFAULT NULL,
  `Sugars` varchar(10) DEFAULT NULL,
  `va` varchar(20) DEFAULT NULL,
  `vc` varchar(20) DEFAULT NULL,
  `ve` varchar(20) DEFAULT NULL,
  `vk` varchar(20) DEFAULT NULL,
  `vb6` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_product`
--

INSERT INTO `o_product` (`fid`, `title`, `price`, `f_size`, `matures`, `p_spacing`, `p_size`, `detail1`, `reviews`, `detail2`, `calories`, `carbohydrates`, `dietary`, `protein`, `Sugars`, `va`, `vc`, `ve`, `vk`, `vb6`) VALUES
(1, '红 椒', '6.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 3, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(2, '红富士', '8.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 8, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(3, '水蜜桃', '8.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 9, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(4, '菠萝', '12.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 3, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(5, '番茄', '4.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 8, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(6, '梨子', '8.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 2, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(7, '玉米', '7.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 4, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(8, '番石榴', '13.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 6, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(9, '草莓', '11.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 5, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(10, '芹菜', '8.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 8, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(11, '甜橙', '6.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 5, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(12, '卷心菜', '2.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 1, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(13, '圣女果', '10.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 9, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(14, '西兰花', '4.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 4, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(15, '红辣椒', '2.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 1, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(16, '胡萝卜', '3.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 2, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(17, '豌豆', '4.50', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 7, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%'),
(18, '青苹果', '5.00', '12厘米', '70~80天', '50厘米到70厘米之间', '60厘米高, 占地30平方厘米', '红椒是菜椒的培育变种,属于茄科。有辛香味,能去除菜肴中的腥味,营养甚高,具有御寒 增强食欲,杀菌的功效...', 1, '茄科草本植物辣椒及其变种的果实。又称番椒,辣茄,海椒,辣子,鸡嘴椒。品种繁多,有大红袍,大金条,二金条,朝天椒,米辣椒等. 夏秋季采摘未成熟(色青)的果实,称青辣椒;采摘成熟(色红)的果实 称红辣椒.洗净鲜用,红辣椒又可晒干备用.用时需要去蒂。', '46', '9g', '3g', '1g', '6g', '93% DV', '317%', '12%', '9%', '22%');

-- --------------------------------------------------------

--
-- 表的结构 `o_user`
--

CREATE TABLE `o_user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` varchar(32) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `regtime` bigint(20) NOT NULL,
  `expire` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_user`
--

INSERT INTO `o_user` (`id`, `username`, `password`, `email`, `phone`, `regtime`, `expire`) VALUES
(1, 'root', 'root11', 'root@qq.com', '13112144654', 1509586680872, 0),
(3, 'xiaoxian', '123456', '437816510@qq.com', '13113123133', 1509614960000, 1);

-- --------------------------------------------------------

--
-- 表的结构 `o_user_address`
--

CREATE TABLE `o_user_address` (
  `aid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `uaddress` varchar(256) NOT NULL,
  `uphone` varchar(11) NOT NULL,
  `isDefault` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_user_address`
--

INSERT INTO `o_user_address` (`aid`, `uid`, `firstname`, `uaddress`, `uphone`, `isDefault`) VALUES
(1, 1, '小贤', '广州市越秀区小北花圈', '13543993748', 0),
(2, 1, '小贤', '广州市越秀区小北花圈2', '13543993325', 1),
(3, 2, '大白', '广州市越秀区小北花圈3', '13545636321', 0);

-- --------------------------------------------------------

--
-- 表的结构 `o_user_cart`
--

CREATE TABLE `o_user_cart` (
  `cid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fcount` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_user_cart`
--

INSERT INTO `o_user_cart` (`cid`, `fid`, `fcount`, `uid`) VALUES
(8, 9, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `o_user_list`
--

CREATE TABLE `o_user_list` (
  `lid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `lDate` bigint(20) NOT NULL,
  `aid` int(11) NOT NULL,
  `pay_method` int(11) NOT NULL,
  `totalprice` decimal(7,2) NOT NULL,
  `common` varchar(128) DEFAULT '',
  `lstate` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_user_list`
--

INSERT INTO `o_user_list` (`lid`, `uid`, `lDate`, `aid`, `pay_method`, `totalprice`, `common`, `lstate`) VALUES
(1, 1, 1509587372000, 2, 1, '203.00', '没有备注信息', 3),
(2, 1, 1509608503000, 2, 1, '8.00', '没有备注信息', 1),
(3, 1, 1509608518000, 2, 1, '4.00', '没有备注信息', 0);

-- --------------------------------------------------------

--
-- 表的结构 `o_vhistory`
--

CREATE TABLE `o_vhistory` (
  `ovid` int(11) NOT NULL,
  `vip` varchar(32) NOT NULL,
  `vtime` bigint(20) NOT NULL,
  `expire` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `o_vhistory`
--
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `o_admin`
--
ALTER TABLE `o_admin`
  ADD PRIMARY KEY (`oaid`),
  ADD UNIQUE KEY `aname` (`aname`);

--
-- Indexes for table `o_index_carsouel`
--
ALTER TABLE `o_index_carsouel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `o_index_onsale`
--
ALTER TABLE `o_index_onsale`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `o_list_detail`
--
ALTER TABLE `o_list_detail`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `o_piclist`
--
ALTER TABLE `o_piclist`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `o_product`
--
ALTER TABLE `o_product`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `o_user`
--
ALTER TABLE `o_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `o_user_address`
--
ALTER TABLE `o_user_address`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `o_user_cart`
--
ALTER TABLE `o_user_cart`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `o_user_list`
--
ALTER TABLE `o_user_list`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `o_vhistory`
--
ALTER TABLE `o_vhistory`
  ADD PRIMARY KEY (`ovid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `o_admin`
--
ALTER TABLE `o_admin`
  MODIFY `oaid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `o_index_carsouel`
--
ALTER TABLE `o_index_carsouel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `o_index_onsale`
--
ALTER TABLE `o_index_onsale`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `o_list_detail`
--
ALTER TABLE `o_list_detail`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `o_piclist`
--
ALTER TABLE `o_piclist`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
--
-- 使用表AUTO_INCREMENT `o_product`
--
ALTER TABLE `o_product`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `o_user`
--
ALTER TABLE `o_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `o_user_address`
--
ALTER TABLE `o_user_address`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `o_user_cart`
--
ALTER TABLE `o_user_cart`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `o_user_list`
--
ALTER TABLE `o_user_list`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `o_vhistory`
--
ALTER TABLE `o_vhistory`
  MODIFY `ovid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
