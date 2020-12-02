## 使用方法

```shell
$ cd bash
$ node buildI18n.js
```


## 可能遇到的问题

##### \# 异常 : 
```
$ node .\bash\buildI18n.js
internal/fs/utils.js:230
    throw err;
    ^

Error: ENOENT: no such file or directory, stat '../src/views'
```

##### \# 原因 : 
执行 `buildI18n.js` 的终端路径并不是在 `bash`