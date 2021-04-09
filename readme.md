## 前言

pulumi 组件基于 [pulumi automation api](https://www.pulumi.com/blog/automation-api/) 实现。

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| region  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| projectName  | true | string  | - | 项目名  |  -  |
| stackName  | false | string  | - | Stack名字  |  type为fc时必填  |
| workDir  | false | string  | - | 工作目录  |  type为fc时必填  |
| runtime  | false | string  | - | 运行时  |  type为oss时必填  |
| cloudPlatform  | false | string  | - | 云平台  |  type为oss时必填  |

------- 

## 示例运行

目录 [examples](./examples) 下有运行示例，可以按照以下步骤来运行示例代码来部署函数资源。

```shell

rm -rf dist
npm run dev

cd examples/deploy_fc && npm i
```

上述指令执行完成后，将当前项目下的 dist 目录的绝对路径填写至 [examples/deploy_fc/s.yaml](./examples/deploy_fc/s.yaml) 中的 component 字段，然后执行 ```s up ```指令即可。
