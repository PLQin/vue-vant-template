const fs = require('fs')
const path = require('path')
const dir = '..'
let cnKeys = {}
const result = {}

// 统计每个门户的国际化字段
setModuleJson()

// 统一各个模块的国际化json，并写入
unifyModules()

function setModuleJson() {
  cnKeys = {}
  readFileList(`${dir}\\pages`)
  getLangs().forEach(lang => {
    const file = `${dir}\\locales\\${lang}.json`
    const oriJson = JSON.parse(String(fs.readFileSync(file)))

    Object.keys(cnKeys).filter(item => !oriJson[item]).forEach(item => {
      oriJson[item] = cnKeys[item]
    })

    if (!result[lang]) {
      result[lang] = oriJson
    }

    Object.keys(oriJson).forEach(key => {
      if (result[lang][key] && (result[lang][key] !== key || !oriJson[key])) {
        return false
      }

      result[lang][key] = oriJson[key]
    })
  })
}

function unifyModules() {
  const allKey = {}
  Object.keys(result).forEach(key => {
    const temp = {}
    Object.keys(result[key]).forEach(item => {
      temp[item] = item
    })

    Object.assign(allKey, temp)
  })

  getLangs().forEach(lang => {
    const file = `${dir}\\locales\\${lang}.json`
    const langData = Object.assign({}, allKey, result[lang])
    fs.writeFileSync(file, JSON.stringify(langData, null, 2))
  })
}

function getLangs() {
  const locales = `${dir}\\locales`
  const indexContent = String(fs.readFileSync(`${locales}\\index.js`))

  const reg = /readDir = \[(.*?)\]/
  return reg.exec(indexContent)[1].replace(/'/g, '')
    .split(',').map(item => item.trim())
}

function readFileList(dir) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) {
    doFile(dir)
    return
  }
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item)) // 递归读取文件
    } else {
      doFile(fullPath)
    }
  })
}

function doFile(fullPath) {
  if (!/.vue$/.test(fullPath)) {
    return
  }

  modify(fullPath)
  count(fullPath)
}

function count(fullPath) {
  const content = String(fs.readFileSync(fullPath))

  const reg = /\$t\('([^']+)'\)/g

  let r = reg.exec(content)
  while (r) {
    cnKeys[r[1]] = r[1]
    r = reg.exec(content)
  }
}

function modify(fullPath) {
  const content = String(fs.readFileSync(fullPath))

  wrapperAndSave(fullPath, content
    .replace(/>\s*([^{}+\n<>'"`]*?[\u4E00-\u9FA5][^{}+\n<>'"`]*?)\s*<([\s\S]+?<\/template>)/g, ">{{ $t('$1') }}<$2")
    .replace(/([\w-_]+)="([^{}+\n<>'"`]*?[\u4E00-\u9FA5][^{}+\n<>'"`]*?)"/g, `:$1="$t('$2')"`)

    // script 中的汉文不再被 $t() 调用
    // .replace(/:\s*'([^'\n+;,]*?[\u4E00-\u9FA5][^'\n+;,]*?)'/g, ": $t('$1')")
    // .replace(/,\s*'([^'\n+;,]*?[\u4E00-\u9FA5][^'\n+;,]*?)'\s*(?=[^:])/g, ", $t('$1')")
    // .replace(/\?\s+'([^'\n+;,]*?[\u4E00-\u9FA5][^'\n+;,]*?)'/g, "? $t('$1')")
    // .replace(/'([^'\n+;,]*?[\u4E00-\u9FA5][^'\n+;,]*?)'\s*,/g, "$t('$1'),")
  )
}

function wrapperAndSave(fullPath, content) {
  const strs = content.split(/<\/template>\s*<script>/)
  if (strs[1]) {
    content = strs[0].replace(/this\.\$t\(/g, '$t(') + `</template>

<script>` + strs[1].replace(/this\.\$t\(/g, '$t(')
      .replace(/\$t\(/g, 'this.$t(')
  } else {
    if (content.match(/<template>/)) {
      content = content.replace(/this\.\$t\(/g, '$t(')
    } else if (content.match(/<script>/)) {
      content = content.replace(/this\.\$t\(/g, '$t(')
        .replace(/\$t\(/g, 'this.$t(')
    }
  }
  fs.writeFileSync(fullPath, content)
}
