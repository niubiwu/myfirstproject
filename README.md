#myfirstproject
自己的第一个网站
项目整体文件说明

配置文件目录
default.json默认配置文件（其中包含数据库配置，JWT配置）
dao 数据访问层，存放对数据库的增删改查操作
DAO.js 提供的公共访问数据库的方法
models 存放具体数据库ORM模型文件
modules 当前项目模块
authorization.js API权限验证模块
database.js 数据库模块（数据库加载基于nodejs-orm2库加载）
passport.js 基于护照模块的登录搭建
resextra.js API统一返回结果接口
node_modules 项目依赖的第三方模块
routes 统一路由
api 提供api接口
mapp 提供移动APP界面
mweb 提供移动网络站点
services 服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据
app.js 主项目入口文件
package.json 项目配置文件
