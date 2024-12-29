/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3386
 Source Schema         : myedu

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 28/12/2024 19:41:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data_ai_pptx_templates
-- ----------------------------
DROP TABLE IF EXISTS `data_ai_pptx_templates`;
CREATE TABLE `data_ai_pptx_templates`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `动画` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `目录` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `编码` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `封面URL` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `语言` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `页码` int NOT NULL DEFAULT 0,
  `排序` int NOT NULL DEFAULT 0,
  `风格` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `主题` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `皮肤颜色` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `类型` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `子类型` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `创建时间` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `创建人` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `更新时间` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `更新人` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `公司` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `目录`(`目录` ASC) USING BTREE,
  INDEX `编码`(`编码` ASC) USING BTREE,
  INDEX `语言`(`语言` ASC) USING BTREE,
  INDEX `风格`(`风格` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'PPTX模板' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of data_ai_pptx_templates
-- ----------------------------
INSERT INTO `data_ai_pptx_templates` VALUES (1, '', '企业介绍', '1816023336543838208', '1816023336543838208', 'zh-CN', 26, 3720, '扁平简约', '蓝色主题简约商务模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (3, '', '年终总结', '1815334914816729088', '1815334914816729088', 'zh-CN', 30, 2920, '扁平简约', '白色简约答辩演示模版', '#FFFFFF', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (4, '', '医学医疗', '1810202494165573632', '1810202494165573632', 'zh-CN', 27, 2400, '商务科技', '浅蓝色医疗生物主题工作总结汇报演示模版', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (5, '', '年终总结', '1815673143831027712', '1815673143831027712', 'zh-CN', 28, 3320, '卡通手绘', '紫色卡通手绘通用演示模板', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (6, '', '商业计划书', '1815585249871257600', '1815585249871257600', 'zh-CN', 28, 3040, '商务科技', '蓝色商业计划书通用演示模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (7, '', '年终总结', '1792777377043132416', '1792777377043132416', 'zh-CN', 28, 1180, '中国风', '创意油画背景演示模板', '#FA920A', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (8, '', '年终总结', '1807659875694796800', '1807659875694796800', 'zh-CN', 27, 600, '文艺清新', '绿色清新自然主题演示模版', '#61D328', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (9, '', '商业计划书', '1808025604461944832', '1808025604461944832', 'zh-CN', 27, 980, '商务科技', '紫色科技商务主题演示模版', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (10, '', '年终总结', '1815291863360593920', '1815291863360593920', 'zh-CN', 29, 2620, '扁平简约', '极简风商务工作报告演示模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (11, '', '年终总结', '1809201240576614400', '1809201240576614400', 'zh-CN', 29, 2320, '商务科技', '黑金色金融工作主题演示模版', '#000000', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (12, '', '企业介绍', '1808773451012628480', '1808773451012628480', 'zh-CN', 29, 1980, '扁平简约', '蓝色通用主题模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (13, '', '年终总结', '1807686611094462464', '1807686611094462464', 'zh-CN', 28, 780, '创意时尚', '渐变色艺术风格演示模版', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (14, '', '商业计划书', '1807663800703508480', '1807663800703508480', 'zh-CN', 27, 640, '商务科技', '酒红色时尚商务演示模版', '#E05757', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (15, '', '商业计划书', '1815630950042951680', '1815630950042951680', 'zh-CN', 27, 3120, '商务科技', '蓝色研究课题答辩演示模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (16, '', '年终总结', '1806268304982269952', '1806268304982269952', 'zh-CN', 29, 220, '扁平简约', '大气简约工作通用演示模板', '#000000', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (17, '', '年终总结', '1816008514972409856', '1816008514972409856', 'zh-CN', 26, 3680, '商务科技', '紫色项目计划书演示模板	', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (18, '', '年终总结', '1808020295823646720', '1808020295823646720', 'zh-CN', 28, 940, '中国风', '古典书画风格主题演示模版', '#65E5EC', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (19, '', '年终总结', '1806285286083387392', '1806285286083387392', 'zh-CN', 28, 300, '商务科技', '深灰商务时尚演示模板', '#FFFFFF', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (20, '', '年终总结', '1815635262324334592', '1815635262324334592', 'zh-CN', 29, 3140, '卡通手绘', '紫色简约插画工作总结通用演示模板', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (21, '', '年终总结', '1806291734771261440', '1806291734771261440', 'zh-CN', 27, 380, '卡通手绘', '紫色扁平插画风格演示模板', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (22, '', '年终总结', '1792829270024990720', '1792829270024990720', 'zh-CN', 33, 1060, '商务科技', '气泡彩膜主题演示模版', '#000000', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (23, '', '商业计划书', '1792468347829563392', '1792468347829563392', 'zh-CN', 31, 1140, '商务科技', '黑色科技风格', '#000000', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (24, '', '商业计划书', '1792408621909413888', '1792408621909413888', 'zh-CN', 29, 1100, '商务科技', '蓝色简约商务', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (25, '', '年终总结', '1815308477845987328', '1815308477845987328', 'zh-CN', 27, 2820, '文艺清新', '蓝色清新可爱风格海洋主题演示模板', '#589AFD', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (26, '', '年终总结', '1815663444272340992', '1815663444272340992', 'zh-CN', 28, 3240, '商务科技', '红色商业计划演示模板', '#E05757', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (27, '', '年终总结', '1815644223555493888', '1815644223555493888', 'zh-CN', 30, 3160, '卡通手绘', '紫色手绘插画风格工作总结汇报通用演示模板', '#7664FA', '', '', '', '', '', '', '');
INSERT INTO `data_ai_pptx_templates` VALUES (28, '', '企业介绍', '1816014257578565632', '1816014257578565632', 'zh-CN', 26, 3700, '扁平简约', '蓝色主题简约模板', '#589AFD', '', '', '', '', '', '', '');

SET FOREIGN_KEY_CHECKS = 1;
