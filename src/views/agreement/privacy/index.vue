
<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      safe-area-inset-top
      @click-left="goBack"
    />

    <van-notice-bar
      wrapable
      :scrollable="false"
      text="免责声明：本平台仅提供信息交流，请大家自行辨别真伪！如要求付订金很可能是骗子，上车前请您核对车主身份信息并签订拼车协议！"
    />

    <div class="interval" />

    <div class="van-panel__footer">
      <div class="content">
        <p>
          {{ defaultSettings.title }}深知隐私对您的重要性，并会尊重您的隐私。请在向{{ defaultSettings.title }}提交个人数据之前，阅读、了解本《隐私政策》（下文简称“本政策”）。<strong>本政策适用于显示本隐私政策、或链接至本隐私政策的{{ defaultSettings.title }}网站和产品、服务。</strong>
        </p>
        <p>
          本政策阐述了{{ defaultSettings.title }}如何处理您的个人数据，但本政策可能并不涉及所有可能的数据处理情境。有关收集产品或服务特定数据的信息可能由{{ defaultSettings.title }}在补充政策中，或者在收集数据时提供的通知中发布。
        </p>
        <p>我们制定本政策的目的在于帮助您了解以下内容：</p>
        <p>1.{{ defaultSettings.title }}如何收集和使用您的个人数据</p>
        <p>2.{{ defaultSettings.title }}如何使用 Cookie 和同类技术</p>
        <p>3.{{ defaultSettings.title }}如何披露您的个人数据</p>
        <p>4.如何访问或修改您的个人数据</p>
        <p>5.{{ defaultSettings.title }}如何保护您的个人数据</p>
        <p>6.{{ defaultSettings.title }}如何处理儿童的个人数据</p>
        <p>7.第三方提供商及其服务</p>
        <p>8.您的个人数据如何在全球范围转移</p>
        <p>9.本政策如何更新</p>
        <p>10.如何联系{{ defaultSettings.title }}</p>
        <h2>1. {{ defaultSettings.title }}如何收集和使用您的个人数据</h2>
        <p>
          个人数据是指单独使用或结合其他信息使用时能够确定个人身份的信息。此类数据会在您使用我们的网站、产品或服务，以及与我们互动时由您直接提交给我们，例如，当您创建{{ defaultSettings.title }}账户或联系我们获得支持时；或者我们通过记录您如何与我们的网站、产品或服务交互而获得，例如，通过Cookie等技术，或者从您设备上运行的软件接收使用数据。在法律允许的情况下，我们还会从公用和商用第三方来源获取有关数据，例如，我们通过从其他公司购买统计数据来支持我们的服务。我们收集的数据取决于您与{{ defaultSettings.title }}互动的方式，包括访问的网站或者使用的产品和服务等，包括姓名、性别、企业名称、职位、地址、电子邮箱、电话号码、登录信息（帐号和密码）、照片、证件信息等。我们还收集您提供给我们的信息和您发给我们的消息内容，例如您输入的查询信息或您为了获得客服支持而提供的问题或信息。
          您在使用{{ defaultSettings.title }}产品或服务时，可能需要提供您的个人数据。在某些情况下，您可以选择不向{{ defaultSettings.title }}提供个人数据，但如果您选择不提供，{{ defaultSettings.title }}可能无法为您提供相关产品或服务，也无法回应或解决您所遇到的问题。
        </p>
        <p>我们可能将您的个人数据用于以下目的：</p>
        <p>(a) 创建账户。</p>
        <p>
          (b)
          实现您的交易或服务请求，包括履行订单；交付、激活或验证产品或服务；提供培训及认证并管理和处理培训及认证结果；参加线上或线下活动；应您的要求进行变更或者提供您请求的信息（例如产品或服务的营销资料、白皮书）；以及提供技术支持。
        </p>
        <p>
          (c)
          在您同意的情况下，与您联系；向您发送有关您可能感兴趣的产品和服务的信息；邀请您参与{{ defaultSettings.title }}活动（包括促销活动）、市场调查或满意度调查；或向您发送营销信息。如果您不想接收此类信息，则可以随时退订。
        </p>
        <p>(d) 向您发送重要通知，如操作系统或应用程序更新和安装的通知。</p>
        <p>(e) 为您提供个性化用户体验和个性化内容。</p>
        <p>
          (f)
          认证和管理供应商及业务合作伙伴，与供应商及业务合作伙伴沟通或开展业务。
        </p>
        <p>(g) 开展内部审计、数据分析和研究，改善我们的产品和服务。</p>
        <p>(h) 分析业务运营效率并衡量市场份额。</p>
        <p>(i) 在您选择向我们发送错误详情的情况下排查错误。</p>
        <p>
          (j) 同步、共享和存储您上传或下载的数据以及执行上传和下载所需的数据。
        </p>
        <p>
          (k)
          保护我们产品、服务和客户或用户的安全，执行与改善我们的防损和反欺诈计划。
        </p>
        <p>(l) 遵从和执行适用的法律要求，相关的行业标准或我们的政策。</p>
        <p>
          {{ defaultSettings.title }}还可能收集和使用非识别性数据。非识别性数据是指无法用于确定个人身份的数据。例如，{{ defaultSettings.title }}会收集汇总的统计数据，例如网站访问量。{{ defaultSettings.title }}收集此数据的目的在于了解用户如何使用自己的网站、产品和服务。借此，{{ defaultSettings.title }}可以改善自己的服务，更好地满足客户需求。{{ defaultSettings.title }}可能会自行决定出于其他目的收集、使用、处理、转移或披露非识别性数据。
          我们会尽力隔离您的个人数据和非识别性数据，并单独使用这两种数据。如果个人数据掺杂了非识别性数据，依旧会被视作个人数据处理。
        </p>
        <p>
          当{{ defaultSettings.title }}处理您的个人数据时我们会遵从适用的法律的要求基于适当的合法性基础予以处理，包括：
        </p>
        <ul>
          <li>当响应您的交易或服务请求时为履行合同处理您的个人数据；</li>
          <li>基于您的同意处理您的个人数据；</li>
          <li>
            当与您联系、进行营销或市场调查，为改善我们的产品和服务，执行与改善我们的防损和反欺诈计划等目的处理您的个人数据时我们将基于我们或第三方的合法利益。这些合法利益包括，使我们能够更有效的管理和运营我们的业务并提供我们的产品和服务；保护我们的业务、系统、产品、服务和客户的安全；内部管理，遵从内部的政策和流程；我们在本政策中描述的其他合法利益等；
          </li>
          <li>我们还可能基于遵从和执行法律义务处理您的个人数据。</li>
        </ul>
        <h2>2. {{ defaultSettings.title }}如何使用 Cookie 和同类技术</h2>
        <h3>2.1 Cookie</h3>
        <p>
          为确保网站正常运转，我们有时会在计算机或移动设备上存储名为 Cookie
          的小数据文件。Cookie
          是一种网络服务器存储在计算机或移动设备上的纯文本文件。Cookie
          的内容只能由创建它的服务器检索或读取。每个 Cookie
          对您的网络浏览器或移动应用程序都是唯一的。Cookie
          通常包含标识符、站点名称以及一些号码和字符。借助于
          Cookie，网站能够存储用户偏好或购物篮内的商品等数据。
        </p>
        <p>
          {{ defaultSettings.title }}启用Cookie的目的与大多数网站或互联网服务提供商启用 Cookie
          的目的一样，即改善用户体验。借助于
          Cookie，网站能够记住用户的单次访问（使用会话
          Cookie）或多次访问（使用永久 Cookie）。借助于
          Cookie，网站能够保存设置，例如计算机或移动设备的语言、字体大小和其他浏览偏好。这意味着，用户无需在每次访问时重新配置用户偏好设置。如果某个网站不使用
          Cookie，那么在用户每一次打开网页时，该网站都会将其视为新访客。例如，如果您登录某个网站后转到另一个网页，该网站就不会识别出您，而您会被再次注销。
          {{ defaultSettings.title }}不会将 Cookie
          用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除
          Cookie。有关详情，请参见
          <a
            href="https://www.aboutcookies.org/"
            target="_blank"
            rel="noopener"
          >AboutCookies.org</a>。您可以清除计算机上保存的所有 Cookie，大部分网络浏览器都设有阻止
          Cookie
          的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。如需详细了解如何更改浏览器设置，请访问以下链接：
        </p>
        <p>
          <a
            href="http://support.microsoft.com/kb/260971"
            target="_blank"
            rel="noopener"
          >Internet Explorer</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
            href="https://support.google.com/chrome/bin/answer.py?hl=en-GB&amp;answer=95647&amp;p=cpn_cookies"
            target="_blank"
            rel="noopener"
          >Google Chrome</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
            href="http://support.mozilla.org/en-US/kb/Cookies"
            target="_blank"
            rel="noopener"
          >Mozilla Firefox</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
            href="http://support.apple.com/kb/PH5042"
            target="_blank"
            rel="noopener"
          >Safari</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
            href="http://www.opera.com/browser/tutorials/security/privacy/"
            target="_blank"
            rel="noopener"
          >Opera</a>
        </p>
        <h3>2.2 网站信标和像素标签</h3>
        <p>
          除 Cookie
          外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，{{ defaultSettings.title }}向您发送的电子邮件可能含有链接至{{ defaultSettings.title }}网站内容的点击
          URL。如果您点击该链接，{{ defaultSettings.title }}则会跟踪此次点击，帮助我们了解您的产品和服务偏好并改善客户服务。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从{{ defaultSettings.title }}的寄信名单中退订。
        </p>
        <p>
          您使用我们的网站意味着您同意按照如上所述使用Cookie，网站信标和像素标签。
        </p>
        <h2>3. {{ defaultSettings.title }}如何披露您的个人数据</h2>
        <p>
          在某些服务由{{ defaultSettings.title }}的授权合作伙伴提供的情况下，{{ defaultSettings.title }}会如本政策描述与该合作伙伴共享您的个人数据。例如，在您上网购买{{ defaultSettings.title }}产品时，{{ defaultSettings.title }}必须与物流服务提供商共享您的个人数据才能安排送货，或者安排合作伙伴提供服务。此外，作为跨国公司，我们可能在{{ defaultSettings.title }}的关联公司间共享个人数据。
        </p>
        <p>
          在适用的法律要求或响应法律程序的情况下，{{ defaultSettings.title }}也可能会向相关的执法机关或者其他政府机关披露您的个人数据。在某些管辖区，如果{{ defaultSettings.title }}牵涉到重组、合并或破产和清理诉讼，那么您的个人数据还可能会被披露给交易方。{{ defaultSettings.title }}还会在存在合理需求的情况下披露您的数据，例如出于执行合同以及我们认为为阻止身体损害或财产损失或调查可能的或实际的非法行为有必要披露且披露是适当的。
        </p>
        <h2>4. 如何访问或修改您的个人数据</h2>
        <p>
          您应确保提交的所有个人数据都准确无误。{{ defaultSettings.title }}会尽力维护个人数据的准确和完整，并及时更新这些数据。
        </p>
        <p>
          当适用的法律要求的情况下，您可能(1)有权访问我们持有的关于您的特定的个人数据；(2)要求我们更新或更正您的不准确的个人数据；(3)拒绝或限制我们使用您的个人数据；以及(4)要求我们删除您的个人数据。如果您想行使相关的权利，请<a
            href="mailto:773561801@qq.com"
          >点击此处</a>在线反馈给我们。为保障安全，您可能需要提供书面请求。如果我们有合理依据认为这些请求存在欺骗性、无法实行或损害他人隐私权，我们则会拒绝处理请求。
        </p>
        <p>
          当适用的法律要求的情况下，当{{ defaultSettings.title }}基于您的同意处理您的个人数据时，您还有权随时撤销您的同意。但撤销同意不会影响撤销前我们基于您的同意处理您个人数据的合法性及效力，也不影响我们基于其他适当的正当性基础处理您的个人数据。
        </p>
        <h2>5. {{ defaultSettings.title }}如何保护和留存您的个人数据</h2>
        <p>
          {{ defaultSettings.title }}重视个人数据的安全。我们采用适当的物理、管理和技术保障措施来保护您的个人数据不被未经授权访问、披露、使用、修改、损坏或丢失。例如，我们会使用加密技术确保数据的机密性；我们会使用保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人数据；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人数据重要性的认识。我们会尽力保护您的个人数据，但是请注意任何安全措施都无法做到无懈可击。
        </p>
        <p>
          我们将会在达成本政策所述目的所需的期限内保留您的个人数据，除非按照法律要求或许可需要延长保留期或受到法律的允许。因为基于不同的场景和产品及服务的不同，数据的存储期可能会有所不同，我们用于确定存留期的标准包括：完成该业务目的需要留存个人数据的时间，包括提供产品和服务，维护相应的交易及业务记录，管控并提升产品与服务性能与质量，保证系统、产品和服务的安全，应对可能的用户查询或投诉，问题定位等；用户是否同意更长的留存期间；法律、合同等是否有保留数据的特殊要求等。只要您的账户是为您提供服务必须，我们都将保留您的注册信息。您也可以选择注销您的账号，在您注销账号后，我们会停止基于该账号提供产品和服务，并在无特殊法律要求的情况下，删除您相应的个人数据。
        </p>
        <h2>6. {{ defaultSettings.title }}如何处理儿童的个人数据</h2>
        <p>
          我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，儿童不得创建自己的用户帐户。对于经父母同意而收集儿童个人数据的情况，我们只会在受到法律允许、父母或监护人明确同意或者保护儿童所必要的情况下使用或披露此数据。
          如果{{ defaultSettings.title }}发现自己在未事先获得可证实的父母同意的情况下收集了儿童的个人数据，则会设法尽快删除相关数据。
        </p>
        <h2>7. 第三方提供商及其服务</h2>
        <p>
          为确保流畅的浏览体验，您可能会收到来自{{ defaultSettings.title }}及其合作伙伴外部的第三方（下文简称“第三方”）提供的内容或网络链接。{{ defaultSettings.title }}对此类第三方无控制权。您可选择是否访问第三方提供的链接、内容、产品和服务。
        </p>
        <p>
          {{ defaultSettings.title }}无法控制第三方的隐私和数据保护政策，此类第三方不受到本政策的约束。在向第三方提交个人信息之前，请参见这些第三方的隐私保护政策。
        </p>
        <h2>8. 您的个人数据如何在全球范围转移</h2>
        <p>
          {{ defaultSettings.title }}收集的您的个人数据可能会在您使用产品或服务所在国家/地区、在{{ defaultSettings.title }}或其关联公司、子公司或服务提供商、业务合作伙伴设有机构的其他国家/地区进行处理，或者受到来自这些国家/地区的访问。这些国家/地区的数据保护法可能不同。在此类情况下，{{ defaultSettings.title }}会采取措施确保我们收集的数据依据本政策和适用法律的要求进行处理。
        </p>
        <h2>9. 本政策如何更新</h2>
        <p>
          {{ defaultSettings.title }}保留不时更新或修改本政策的权利。如果我们的隐私政策变更，我们会将最新版隐私政策发布在这里。如果我们对隐私政策做出了重大变更，我们还可能会通过不同渠道向您发送变更通知，例如，在我们的网站上发布通知或者向您发布单独的通知。
        </p>
        <h2>10. 如何联系{{ defaultSettings.title }}</h2>
        <p>
          如果您有任何隐私投诉或问题要联系{{ defaultSettings.title }}数据保护官，请<a
            href="mailto:773561801@qq.com"
          >点击此处</a>。
        </p>

        <hr>
        <div>最近更新日期：2018 年 5 月</div>
      </div>
    </div>

    <div class="open-floor" />

    <van-button
      type="info"
      block
      safe-area-inset-bottom
      @click="goBack"
    >我已阅读并同意</van-button>
  </div>
</template>

<script>
import defaultSettings from '@/settings.js'
export default {
  data() {
    return {
      defaultSettings
    }
  },
  computed: {},
  created() {},
  methods: {
    goBack() {
      const { query } = this.$route
      if (query.redirect) {
        this.$router.replace(query.redirect)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
