import { CONTACT_SUBJECTS } from "./constant";

export const SERVICE_STEPS = [
  {
    step: "1",
    title: "Liên Hệ & Nhận Thông Tin",
    description: `Nhận thông tin & nhu cầu cần hỗ trợ từ khách hàng. <br /> Chúng tôi sẽ tư vấn các dịch vụ phù hợp nhất với mong đợi.`,
  },
  {
    step: "2",
    title: "Lên Kịch Bản & Lịch Quay",
    description: `Cùng lên ý tưởng & xây dựng kịch bản chi tiết để ghi lại các khoảnh khắc đặc biệt một cách tự nhiên và chân thực nhất.`,
  },
  {
    step: "3",
    title: "Quay & Dựng Phim",
    description: `Đội ngũ chuyên nghiệp của MyVR thực hiện dựng phim 3D, đảm bảo hình ảnh & âm thanh đạt chất lượng hoàn hảo.`,
  },
  {
    step: "4",
    title: "Lưu Trữ & Cấp Tài Khoản",
    description: `Tất cả video được lưu trữ an toàn và cung cấp tài khoản cá nhân để khách hàng có thể truy cập bất cứ lúc nào.`,
  },
  {
    step: "5",
    title: "Hướng Dẫn & Xem Lại Video",
    description: `Hướng dẫn chi tiết cách xem lại video và trải nghiệm kỷ niệm theo cách chân thật nhất qua nền tảng Thực tế ảo 3D.`,
  },
];

export const SERVICE_POSTFIX_URLS = {
  SPEICAL: "luu-giu-ky-uc-sau-cung",
  FAMILY: "luu-giu-khoanh-khac-ben-gia-dinh",
  LOVE: "luu-giu-ky-niem-tinh-yeu-con-cai",
  BUSINESS: "gioi-thieu-san-pham-va-khong-gian",
  RANDOM: "quay-theo-yeu-cau",
};

export const CONTACT_SERVICES = [
  {
    id: "contact-service-0",
    title: CONTACT_SUBJECTS.ADVISE,
  },
  {
    id: "contact-service-1",
    title: CONTACT_SUBJECTS.FORGOT_ACCOUNT,
  },
];

export const BRIEF_SERVICES = [
  {
    id: "brief-service-0",
    title: "Quay theo yêu cầu",
    postFixUrl: SERVICE_POSTFIX_URLS.RANDOM,
  },
  {
    id: "brief-service-1",
    title: "Ký Ức Sau Cùng & Còn Mãi",
    imgSrc: "/imgs/khoanh-khac-cuoi-cung.png",
    postFixUrl: SERVICE_POSTFIX_URLS.SPEICAL,
  },
  {
    id: "brief-service-2",
    title: "Lưu Giữ Tình Yêu & Hành Trình Trưởng Thành",
    imgSrc: "/imgs/ky-niem-tinh-yeu-con-cai.png",
    postFixUrl: SERVICE_POSTFIX_URLS.LOVE,
  },
  {
    id: "brief-service-3",
    title: "Khoảnh khắc bên gia đình, người thân",
    imgSrc: "/imgs/khoanh-khac-ben-gia-dinh-nguoi-than.jpg",
    postFixUrl: SERVICE_POSTFIX_URLS.FAMILY,
  },
  // {
  //   id: "brief-service-4",
  //   title: "Khám phá - Giới thiệu - Thương hiệu",
  //   imgSrc: "/imgs/kham-pha-gioi-thieu.png",
  //   postFixUrl: SERVICE_POSTFIX_URLS.BUSINESS,
  // },
];

export const MAIN_SERVICES = [
  {
    id: 0,
    mappingId: BRIEF_SERVICES.at(1)?.id,
    title: "Ký Ức Sau Cùng & Còn Mãi",
    subtitle: "Dịch Vụ Đặc Biệt Nhất",
    description: `
      Cuộc sống vốn dĩ vô thường, không ai biết trước được khi nào chúng ta hoặc những người thân yêu của mình sẽ phải rời xa thế giới này... <br/><br/>
      <b>Dịch vụ này dành riêng cho những hoàn cảnh đặc biệt:</b> <br/>
      <ul class="default-list">
        <li>Những người già sắp đi qua đoạn cuối của hành trình</li>
        <li>Người vẫn tràn đầy sức sống nhưng phải đối mặt với căn bệnh hiểm nghèo</li>
        <li>Các em bé nhỏ, dù tuổi đời ngắn ngủi nhưng sắp phải "rời xa" vòng tay cha mẹ</li>
        <li>...</li>
      </ul>
      Chúng tôi sẽ giúp bạn ghi lại <b class="text-orange-700">những giây phút cuối cùng quý giá</b>, biến kỷ niệm thành mãi mãi với thước phim 3D, mà dù sau này có bao nhiêu tiền bạn cũng <b class="text-orange-700">không mua lại được</b>. <br/>
      Bạn hoặc người thân sẽ cảm nhận được sự hiện diện của nhau một lần nữa, sống lại trong những khoảnh khắc tuyệt đẹp và đầy cảm xúc. <br/>
      Hãy để chúng tôi giúp bạn bảo tồn những ký ức đáng trân trọng nhất của cuộc đời bạn...`,
    youtubeSrc: "https://www.youtube.com/embed/52vtguDb5-c?si=b2E7k8Iq0DOAiU-N",
    videoSrc: "/vids/bua_com_voi_nguoi_me_da_mat.mp4",
    videoThumbnail: "/imgs/bua_com_voi_nguoi_me_da_mat.png",
    videoSrcTitle: "Lưu lại ký ức với Ông bà tuổi đã cao",
    postFixUrl: SERVICE_POSTFIX_URLS.SPEICAL,
    fullDescription: `
    <h4 class="text-xl text-center text-gray-500 mb-6"><b>Dịch Vụ Đặc Biệt Nhất: Lưu Giữ Những Ký Ức Cuối Cùng</b></h4>

    <div class="full-description max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
      <p class="mb-6">
        Đối diện với cái chết, những điều còn lại không phải là vật chất, mà là những <b>ký ức</b>. 
        <br />
        Ký ức ấy không chỉ là <b class="text-orange-700">hành trang cho người ra đi</b>, 
        mà còn là <b class="text-orange-700">món quà quý giá dành cho những người ở lại</b> – để họ cảm nhận được tình yêu thương, sự hiện diện, và giá trị của từng khoảnh khắc từng được sống cùng nhau.
      </p>

      <div class="flex justify-center py-6">
        <img 
          src="/imgs/nhung-nguoi-sap-roi-xa-the-gioi-nay.png" 
          alt="Lưu giữ ký ức gia đình" 
          class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md">
      </div>

      <p class="mb-6">
        <b>Ký Ức Sau Cùng & Còn Mãi</b> là gói lưu lại ký ức trọn vẹn cho những khoảnh khắc ta không thể níu giữ khi thời gian đang đếm ngược.<br/>
        - <b class="text-orange-700">Dành cho những ông bà lớn tuổi,</b> đang bước những bước cuối cùng trên hành trình cuộc đời, khi từng phút giây bên người thân yêu đều trở nên vô giá.<br />
        - <b class="text-orange-700">Cho những bậc cha mẹ, anh chị,</b> vẫn còn cháy bỏng khát vọng sống nhưng đang chạy đua với thời gian trước căn bệnh hiểm nghèo. <br/> 
        - <b class="text-orange-700">Và cho những thiên thần nhỏ,</b> dù chỉ có mặt trên thế gian ngắn ngủi, nhưng đã để lại tình yêu và kỷ niệm không thể phai nhòa...
        <br />
        <br />
      </p>

      <div class="text-center mb-8">
        <div class="flex justify-center py-6">
          <img 
            src="/imgs/khoanh-khac-cuoi-cung.png" 
            alt="Lưu giữ ký ức gia đình" 
            class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md">
        </div>

        <p class="font-semibold text-gray-400">
          - Tình yêu vượt qua ranh giới của sự sống -
        </p>
      </div>

      <p>
        Bằng công nghệ dựng <b class="text-orange-700">video 3D chất lượng 8K</b> và tái hiện trong <b class="text-orange-700">không gian thực tế ảo</b> với tỷ lệ và chiều sâu giống như ta cảm nhận bằng mắt thường, MyVR sẽ giúp bạn lưu giữ lại những khoảnh khắc vô giá ấy một cách chân thực nhất.<br/>
        Đây <b class="text-orange-700">không chỉ là một đoạn phim</b>, mà là một <b class="text-orange-700">cánh cửa quay về quá khứ</b> – nơi bạn có thể nhìn thấy, lắng nghe, và gần như chạm đến hơi ấm, giọng nói, ánh mắt của người thân yêu. 
        Như thể họ vẫn đang ở ngay bên, chưa từng rời xa.
      </p>

      <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
         - Những thước phim ghi lại các cuộc trò chuyện bình dị, giúp những đứa trẻ lớn lên <span class="font-bold">vẫn cảm nhận được hơi ấm và tình yêu của cha mẹ, 
          ông bà hay anh chị em đã khuất.</span> <br/>
         - Những nụ cười, ánh mắt đầy cảm xúc hay cái nắm tay cuối cùng, <span class="font-bold">tạo nên di sản tình yêu cho người ở lại.</span><br/>
         - Những khoảnh khắc đặc biệt đó, sau này - dù có bao nhiêu tiền cũng không mua lại được. 
      </div>

      <hr class="my-8"/>

      <h3>HÃY ĐỂ <span class="font-extrabold text-2xl !text-gray-500">MYVR</span> GIÚP BẠN!</h3>
      <ul class="default-list !ml-0">
        <li>MyVR tự hào là đội ngũ <b class="text-orange-700">đầu tiên và duy nhất</b> tại Việt Nam chuyên dựng video 3D thực tế ảo bằng thiết bị hiện đại, chuyên nghiệp. </li>
        <li>Chúng tôi mang đến cơ hội lưu giữ những thước phim quý giá của bạn và người thân – những khoảnh khắc mà <b class="text-orange-700">thời gian không thể nào đưa bạn quay lại</b>. </li>
        <li>Khi xem lại ký ức qua kính VR, bạn sẽ ngạc nhiên vì trong vô thức, bản thân không nhận ra mình đang <b class="text-orange-700">xem</b>, thay vì đó cảm giác giống như đang <b class="text-orange-700">sống</b> và hòa vào không gian đó 1 lần nữa. Một trải nghiệm mà những video thông thường không thể đem lại. </li>
        <li>Và dù bạn ở bất kỳ nơi đâu, MyVR luôn sẵn sàng đồng hành và có mặt trên mọi miền tổ quốc!</li>
      </ul>

      <div class="mt-4 mb-16 text-center">
      <a href="/lien-he" target="_blank"><span class="bg-[#069a2b] hover:bg-[#0d9b31] font-semibold !text-white px-8 py-3 rounded transition duration-300 animate-fadeInUp">LIÊN HỆ MYVR</span></a>
      </div>


      <div class="video-container my-8 text-center">
             <iframe 
                width="560"
                src="https://www.youtube.com/embed/5sSOFcgZ-M8?si=XTqE9N3aJsXlGjZ_" 
                title="Kết nối yêu thương dù xa cách" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen 
                class="mx-auto rounded-lg shadow-md aspect-auto h-[200px] sm:h-[315px]">
            </iframe>
      </div>

       <hr class="my-8"/>

      <p class="text-gray-700 leading-relaxed mb-6">
        Ký ức được lưu giữ dưới định dạng 3DVR, không chỉ mang đến sự khác biệt về độ chân thật mà còn mang lại giá trị bảo tồn vượt thời gian. <br/>
      </p>
      <br />
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Đôi khi, trong những mất mát lớn nhất, chúng ta lại tìm thấy giá trị thật sự của tình yêu và ký ức. Những hình ảnh, 
        âm thanh và khoảnh khắc được lưu giữ không chỉ dành cho hôm nay, mà còn là món quà vô giá dành cho các thế hệ mai sau – để tình yêu và kỷ niệm luôn sống mãi, 
        bất chấp thời gian.
      </p>
    </div>

  `,
  },
  {
    id: 1,
    mappingId: BRIEF_SERVICES.at(3)?.id,
    title: "Gia Đình Và Những Người Thân Yêu",
    subtitle: "Yêu Thương Đong Đầy",
    description: `Gia đình là nơi khởi nguồn của tình yêu thương và những kỷ niệm đẹp. <br/><br/>
       <b>Đó có thể là những kỷ niệm vui:</b>
      <ul class="default-list">
        <li>Vào dịp lễ tết, tất cả tụ họp sum vầy.</li>
        <li>1 sự kiện đáng nhớ, 1 bữa tiệc sinh nhật ấm áp,...</li>
        <li>Hoặc đơn giản chỉ là một bữa cơm gia đình tràn ngập tiếng cười</li>
      </ul>
      <b>Hay là để kết nối yêu thương:</b>
      <ul class="default-list">
        <li>Những người thân sống xa nhau chưa có dịp đoàn viên</li>
        <li>Lý do ngoại cảnh (cách ly, tuổi tác, thời gian,...) mà không thể gặp gỡ</li>
        <li>Hoặc muốn trải nghiệm và hòa vào không gian sống của người thân mình</li>
      </ul>
      <br/>  
      Dịch vụ của chúng tôi mang đến cơ hội tuyệt vời để ghi lại những khoảnh khắc ấm áp bên những người bạn yêu quý nhất.  <br/>  
      Bằng cách lưu giữ những khoảnh khắc giản dị nhưng chân thành, bạn sẽ có thể <b class="text-orange-700">chia sẻ và truyền lại</b> 
      những giá trị yêu thương này <b class="text-orange-700">cho thế hệ mai sau</b>.  <br/>  
      Hãy để chúng tôi đồng hành cùng bạn trong hành trình này, để mỗi kỷ niệm đều trở thành một phần di sản quý giá.`,
    youtubeSrc: "https://www.youtube.com/embed/-8vHG7ck40o?si=Wh_4v7BDPP2YAFWG",
    videoSrc: "/vids/nguoi_gia_thay_con_chau_o_xa_qua_kinh_vr.mp4",
    videoThumbnail: "/imgs/nguoi_gia_thay_con_chau_o_xa_qua_kinh_vr.png",
    videoSrcTitle: `Sự kết nối vượt thời gian và không gian`,
    postFixUrl: SERVICE_POSTFIX_URLS.FAMILY,
    reverse: true,
    fullDescription: `<h4 class="text-xl text-center text-gray-500 mb-6">
        <b>Yêu Thương Đong Đầy, Lưu Giữ Những Giá Trị Bền Vững</b>
      </h4>

      <div class="full-description text-lg max-w-3xl mx-auto">
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Gia đình không chỉ là nơi bắt đầu, mà còn là nơi mang đến những khoảnh khắc hạnh phúc nhất trong cuộc đời. <br/>
            <b>Đó có thể là những <span class="!text-orange-700">kỷ niệm vui</span>:</b>
             <ul class="default-list">
              <li>Vào dịp lễ tết, tất cả đoàn viên sum vầy.</li>
              <li>1 sự kiện đáng nhớ, hay 1 bữa tiệc sinh nhật ấm áp</li>
              <li>Hoặc đơn giản chỉ là một bữa cơm gia đình tràn ngập tiếng cười</li>
              <li>...</li>
            </ul>
        </p>

        <div class="flex justify-center py-6">
            <img 
                src="/imgs/khoanh-khac-ben-gia-dinh-nguoi-than.jpg" 
                alt="Khoảnh khắc gia đình đoàn viên" 
                class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md"
            >
        </div>

        <b class="text-lg text-gray-700 leading-relaxed mb-6">
          Và còn là nơi ta <span class="!text-orange-700">kết nối yêu thương</span> trong những hoàn cảnh đặc biệt:
        </b>
        <ul class="default-list">
          <li>Những người thân sống xa nhau và không thường xuyên gặp gỡ.</li>
          <li>Những rào cản ngoại cảnh: tuổi tác, khoảng cách địa lý, hoặc những lý do bất khả kháng – khiến ta không thể đoàn viên.</li>
          <li>Hay đơn giản, là khát khao được cảm nhận không gian sống của người thân yêu như thể bạn đang ở đó cùng họ.</li>
          <li>...</li>
        </ul>
       
        <div class="text-center mb-8 mt-2">
          <div class="flex justify-center">
              <img 
                  src="/imgs/ket-noi-yeu-thuong-du-xa-cach.png" 
                  alt="Kết nối yêu thương dù xa cách" 
                  class="!w-full h-full object-cover rounded-lg shadow-md" />
            </div>

          <p class="font-semibold text-gray-400">
            - Kết nối yêu thương dù xa cách -
          </p>
        </div>
         <p>
          <b>Chúng tôi mang đến cơ hội tuyệt vời để ghi lại những khoảnh khắc yêu thương ấy.</b> <br/>
          Bằng công nghệ dựng <b class="!text-orange-700">video 3D chất lượng 8K</b> và tái hiện trong <b class="!text-orange-700">không gian thực tế ảo</b> với tỷ lệ và chiều sâu giống như ta cảm nhận bằng mắt thường, 
          MyVR sẽ giúp bạn lưu giữ lại những khoảnh khắc vô giá ấy một cách chân thực nhất.<br/>
          
          Đây không chỉ là một <b class="!text-orange-700">món quà cho hiện tại</b>, mà còn là <b class="!text-orange-700">di sản cảm xúc dành cho thế hệ mai sau</b>.
        </p>.

        <hr class="my-8"/>

        <h3>HÃY ĐỂ <span class="font-extrabold text-2xl !text-gray-500">MYVR</span> GIÚP BẠN!</h3>
        <ul class="default-list">
          <li>MyVR tự hào là đội ngũ <b class="text-orange-700">đầu tiên và duy nhất</b> tại Việt Nam chuyên dựng video 3D thực tế ảo bằng thiết bị hiện đại, chuyên nghiệp. </li>
          <li>Chúng tôi mang đến cơ hội lưu giữ những thước phim quý giá của bạn và người thân – những khoảnh khắc mà <b class="text-orange-700">thời gian không thể nào đưa bạn quay lại</b>. </li>
          <li>Khi xem lại ký ức qua kính VR, bạn sẽ ngạc nhiên vì trong vô thức, bản thân không nhận ra mình đang "xem", thay vì đó cảm giác giống như đang "sống" và hòa vào không gian đó 1 lần nữa. Một trải nghiệm mà những video thông thường không thể đem lại. </li>
          <li>Và dù bạn ở bất kỳ nơi đâu, MyVR luôn sẵn sàng đồng hành và có mặt trên mọi miền tổ quốc!</li>
        </ul>

        <div class="mt-4 mb-16 text-center">
        <a href="/lien-he" target="_blank"><span class="bg-[#069a2b] hover:bg-[#0d9b31] font-semibold !text-white px-8 py-3 rounded transition duration-300 animate-fadeInUp">LIÊN HỆ MYVR</span></a>
        </div>

        <div class="video-container my-8 text-center">
            <h4 class="text-xl !font-semibold text-gray-500 mb-4">
               - Lưu giữ khoảnh khắc sum vầy, vượt qua mọi rào cản -
            </h4>
            <iframe 
                width="560"
                src="https://www.youtube.com/embed/ixOBtUGKYio?si=p540486ntCJdy2R8" 
                title="Kết nối yêu thương dù xa cách" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen 
                class="mx-auto rounded-lg shadow-md aspect-auto h-[200px] sm:h-[315px]">
            </iframe>
        </div>

       <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Những người con xa quê, những ai không thể gần gũi gia đình do khoảng cách địa lý hoặc những lý do ngoại cảnh, giờ đây có thể vượt qua mọi giới hạn đó với MYVR. 
      </p>
      <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
        - Tưởng tượng bạn có thể nhìn thấy nụ cười của cha mẹ trong bữa cơm ngày Tết.<br/>
        - Nghe giọng hát của các em nhỏ trong bữa tiệc sinh nhật.<br/>
        - Được trải nghiệm không gian sống của người thân ở xa <br/>
        - Hay cảm nhận không khí rộn ràng của ngày đoàn viên như thể bạn đang sống trong chính khoảnh khắc ấy. <br/>
        - ...
      </div>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">
       Những ký ức này sẽ được truyền lại, để con cháu có thể cảm nhận được tình yêu, sự gắn bó và giá trị của gia đình qua từng nụ cười, ánh mắt, hay cử chỉ của những người đi trước.
      </p> <br/>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Với MYVR, bạn không chỉ lưu giữ kỷ niệm mà còn trải nghiệm lại trọn vẹn cảm xúc – như thể thời gian chưa bao giờ trôi qua. <br/> Hãy để chúng tôi đồng hành cùng bạn trong hành trình lưu giữ những giá trị yêu thương, để mỗi khoảnh khắc đều trở thành một phần của di sản gia đình, trường tồn với thời gian.
      </p>
    </div>

`,
  },
  {
    id: 2,
    mappingId: BRIEF_SERVICES.at(2)?.id,
    title: "Kỷ Niệm Tình Yêu - Con Cái",
    subtitle: "Hạnh Phúc Trọn Vẹn",
    description: `
    Trong tình yêu, ngày cưới là một trong những sự kiện quan trọng nhất, không chỉ của đôi lứa mà còn là khởi đầu cho gia đình hạnh phúc. <br/> <br/>
    <b>Hãy để chúng tôi giúp bạn lưu giữ lại:</b> 
    <ul class="default-list">
      <li>Từng giây phút hạnh phúc trong ngày trọng đại, những ánh mắt trao nhau cho đến những nụ cười rạng rỡ của bạn bè và người thân</li>
      <li>Để các bạn được <b class="text-orange-700">"làm 1 vị khách"</b> trong chính đám cưới của mình khi xem lại dưới không gian 3D</li>
      <li>Được thấy chính mình đứng trước cổng hoa, cùng nắm tay nhau vào lễ đường, cắt bánh, rót rượu,... ngay trước mắt.</li>
    </ul><br/>
    <b>Và hành trình tình yêu còn tiếp tục lớn lên qua từng bước chân của con cái</b>  <br/>
     <ul class="default-list">
      <li>Hãy tưởng tượng, nếu một ngày nào đó con cái bạn được nhìn thấy tận mắt đám cưới của chính cha mẹ mình</li>
      <li>Và con bạn được nhìn lại hành trình lớn lên của bản thân – từ tiếng khóc chào đời, bước đi đầu tiên, đến những thành tựu nhỏ bé... </li>
      <li>Sẽ là một <b class="text-orange-700">trải nghiệm kỳ diệu và lạ lùng</b>, giúp chúng thêm tự hào về tình yêu và tổ ấm của mình</li>
      <li>Khi được nhìn lại 1 bằng không gian 3D có gia đình nhỏ trong đó, con bạn sẽ biết rằng tình yêu của bạn dành cho chúng đã bắt đầu ngay từ những ngày đầu tiên của cuộc đời</li>
    </ul>`,
    youtubeSrc: "",
    videoSrc: "/vids/nhin_lai_hanh_trinh_truong_thanh_cua_con.mp4",
    videoThumbnail: "/imgs/nhin_lai_hanh_trinh_truong_thanh_cua_con.png",
    videoSrcTitle: `Lưu lại hành trình khôn lớn. Dành cho con "món quà" đặc biệt nhất`,
    postFixUrl: SERVICE_POSTFIX_URLS.LOVE,
    fullDescription: `
    <h4 class="text-xl text-center text-gray-500 mb-6">
      <b>Lưu Giữ Tình Yêu & Hành Trình Trưởng Thành</b>
    </h4>

    <div class="full-description text-lg max-w-3xl mx-auto">
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      Tình yêu không chỉ dừng lại ở những khoảnh khắc thăng hoa trong ngày cưới, mà còn tiếp tục lớn lên qua từng bước chân của con cái trong vòng tay cha mẹ. <br/>
      <b>"Kỷ Niệm Tình Yêu - Con Cái"</b> là gói dịch vụ ghi lại không chỉ những giây phút hạnh phúc của đôi lứa 
      mà còn những dấu ấn đáng nhớ trong hành trình nuôi dưỡng và trưởng thành của gia đình bạn.
    </p>

    <div class="flex justify-center py-6">
      <img 
        src="/imgs/ky-niem-tinh-yeu-con-cai.png" 
        alt="Kỷ niệm tình yêu và con cái" 
        class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md"
      >
    </div>

    <b>Hãy để chúng tôi giúp bạn lưu giữ lại:</b> 
    <ul class="default-list">
      <li>Từng giây phút hạnh phúc trong ngày trọng đại, những ánh mắt trao nhau cho đến những nụ cười rạng rỡ của bạn bè và người thân</li>
      <li>Để các bạn được <b class="text-orange-700">"làm 1 vị khách"</b> trong chính đám cưới của mình khi xem lại dưới không gian 3D</li>
      <li>Được thấy chính mình đứng trước cổng hoa, cùng nắm tay nhau vào lễ đường, cắt bánh, rót rượu,... ngay trước mắt.</li>
    </ul>
    <iframe 
        width="560" 
        src="https://www.youtube.com/embed/uu9bldsuK8g?si=mz0W1SfzDFHMBwd0" 
        title="Đám cưới và hành trình yêu thương" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen 
        class="mx-auto rounded-lg shadow-md aspect-auto h=[200px] sm:h-[315px]">
      </iframe>
    <br/>
    <b>Và hành trình tình yêu còn tiếp tục lớn lên qua từng bước chân của con cái</b>  <br/>
     <ul class="default-list">
      <li>Hãy tưởng tượng, nếu một ngày nào đó con cái bạn được nhìn thấy tận mắt đám cưới của chính cha mẹ mình</li>
      <li>Và con bạn được nhìn lại hành trình lớn lên của bản thân – từ tiếng khóc chào đời, bước đi đầu tiên, đến những thành tựu nhỏ bé... </li>
      <li>Sẽ là một <b class="text-orange-700">trải nghiệm kỳ diệu và lạ lùng</b>, giúp chúng thêm tự hào về tình yêu và tổ ấm của mình</li>
      <li>Khi được nhìn lại 1 bằng không gian 3D có gia đình nhỏ trong đó, con bạn sẽ biết rằng tình yêu của bạn dành cho chúng đã bắt đầu ngay từ những ngày đầu tiên của cuộc đời</li>
    </ul>

    <div class="video-container my-8 text-center">
      <h4 class="text2xl !font-semibold text-gray-600 mb-4">
        Lưu giữ những hành trình trưởng thành để thế hệ sau cảm nhận
      </h4>
      <iframe 
        width="560" 
        src="https://www.youtube.com/embed/zTnLgXDV-GA?si=1n40AGHCOa31Kd8d" 
        title="Đám cưới và hành trình yêu thương" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen 
        class="mx-auto rounded-lg shadow-md aspect-auto h=[200px] sm:h-[315px]">
      </iframe>
    </div>

    <p>
      Bằng công nghệ dựng <b class="!text-orange-700">video 3D chất lượng 8K</b> và tái hiện trong <b class="!text-orange-700">không gian thực tế ảo</b> với tỷ lệ và chiều sâu giống như ta cảm nhận bằng mắt thường, 
      MyVR sẽ giúp bạn lưu giữ lại những khoảnh khắc vô giá ấy một cách chân thực nhất.
    </p>

    <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
     Vì người ta vẫn thường nói rằng: "Bạn chỉ có duy nhất một cơ hội để ngắm nhìn con mình còn bé nhỏ, vì những khoảnh khắc ấy trôi qua rất nhanh trước khi bạn kịp nhận ra."
    </div>

    <hr class="my-8"/>

    <h3>HÃY ĐỂ <span class="font-extrabold text-2xl !text-gray-500">MYVR</span> GIÚP BẠN!</h3>
    <ul class="default-list">
      <li>MyVR tự hào là đội ngũ <b class="text-orange-700">đầu tiên và duy nhất</b> tại Việt Nam chuyên dựng video 3D thực tế ảo bằng thiết bị hiện đại, chuyên nghiệp. </li>
      <li>Chúng tôi mang đến cơ hội lưu giữ những thước phim quý giá của bạn và người thân – những khoảnh khắc mà sau này dù <b class="text-orange-700">bao nhiêu tiền cũng không thể mua lại</b>. </li>
      <li>Khi xem lại ký ức qua kính VR, bạn sẽ ngạc nhiên vì trong vô thức, bản thân không nhận ra mình đang "xem", thay vì đó cảm giác giống như đang "sống" và hòa vào không gian đó 1 lần nữa. Một trải nghiệm mà những video thông thường không thể đem lại. </li>
      <li>Và dù bạn ở bất kỳ nơi đâu, MyVR luôn sẵn sàng đồng hành và có mặt trên mọi miền tổ quốc!</li>
    </ul>

    <div class="mt-4 mb-16 text-center">
    <a href="/lien-he" target="_blank"><span class="bg-[#069a2b] hover:bg-[#0d9b31] font-semibold !text-white px-8 py-3 rounded transition duration-300 animate-fadeInUp">LIÊN HỆ MYVR</span></a>
    </div>


    <div class="text-center mb-8">
      <div class="flex justify-center px-6">
        <img 
          src="/imgs/hanh_trinh_luu_giu_ky_niem_truong_thanh.png" 
          alt="Hành trình lưu giữ kỷ niệm trưởng thành" 
          class="!w-full h-auto object-cover rounded-lg shadow-md">
      </div>

      <p class="font-semibold text-gray-400">
        - Sẽ là 1 trải nghiệm cực kỳ lạ lùng và kỳ diệu cho con bạn -
      </p>
    </div>

    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      Cuộc sống là một hành trình dài, và mỗi chặng đường đều có những khoảnh khắc quý giá. <br/>
      Hãy để <b>MYVR</b> đồng hành cùng bạn, lưu lại từng giai đoạn đáng nhớ, từng nụ cười, từng giọt nước mắt – tất cả những điều làm nên câu chuyện đặc biệt của gia đình bạn.
      <br/> 
      <br/> 
      Chúng tôi cam kết mang đến sản phẩm ý nghĩa, giúp bạn lưu giữ và sẻ chia những giá trị yêu thương qua từng thế hệ, không chỉ là một video, mà là những ký ức sống động sẽ mãi trường tồn, để dù ở đâu, dù thời gian trôi qua, tình yêu gia đình vẫn luôn được kết nối.
    </p>
  </div>

    `,
  },
  // {
  //   id: 3,
  //   mappingId: BRIEF_SERVICES.at(4)?.id,
  //   title: "Giới Thiệu Sản Phẩm - Không Gian",
  //   subtitle: "Chân Thực, Tin Cậy",
  //   description: `Trong thế giới kinh doanh hiện đại, việc giới thiệu sản phẩm một cách sinh động và chân thực không chỉ là một lợi thế, mà còn là yếu tố quyết định. <br/> <br/>
  //     <b>Bạn có thể là:</b>
  //     <ul class="default-list">
  //       <li>Một nhà phát triển bất động sản cần giới thiệu căn hộ mẫu hay khu biệt thự cao cấp với khách hàng quốc tế mà <b class="text-orange-700">không cần di chuyển</b>.</li>
  //       <li>Một chủ sở hữu cửa hàng nội thất muốn khách hàng <b class="text-orange-700">hình dung rõ ràng</b> từng món đồ trong không gian thực tế của họ.</li>
  //       <li>Một quản lý khách sạn hoặc resort cao cấp đang tìm cách đưa khách hàng <b class="text-orange-700">“tham quan trực tuyến”</b> các phòng nghỉ, tiện ích sang trọng trước khi đặt phòng.</li>
  //       <li>Một doanh nghiệp cung cấp dịch vụ như spa, nhà hàng, hoặc trung tâm thể thao, cần giới thiệu không gian trải nghiệm trực tiếp mà không cần khách hàng phải đến tận nơi.</li>
  //       <li>Một công ty tổ chức sự kiện muốn khách hàng <b class="text-orange-700">cảm nhận được quy mô và chất lượng</b> không gian tổ chức qua video thực tế ảo.</li>
  //     </ul>
  //     Những thước phim thực tế ảo không chỉ giúp khách hàng hiểu rõ hơn về sản phẩm mà còn tạo ra sự kết nối cảm xúc, <b class="text-orange-700">khơi gợi sự tò mò và thúc đẩy quyết định</b> mua hàng.
  //     Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực và giúp bạn ghi điểm trong lòng khách hàng.`,
  //   videoSrc: "/vids/kham_pha_khong_gian_qua_kinh_vr.mp4",
  //   videoThumbnail: "/imgs/kham_pha_khong_gian_qua_kinh_vr.png",
  //   videoSrcTitle: "Tự trải nghiệm không gian thực tế tại nhà",
  //   postFixUrl: SERVICE_POSTFIX_URLS.BUSINESS,
  //   reverse: true,
  //   fullDescription: `
  //   <h4 class="text-xl text-center text-gray-500 mb-6">
  //     <b>Chân thực, tin cậy & gây ấn tượng</b>
  //   </h4>

  //   <div class="full-description text-lg max-w-3xl mx-auto">
  //   <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //     Trong thế giới kinh doanh hiện đại, việc giới thiệu sản phẩm một cách sinh động và chân thực <b class="text-orange-700">không chỉ là một lợi thế</b>, mà còn là <b class="text-orange-700">yếu tố quyết định</b>. <br/>
  //     Dịch vụ <b>"Giới Thiệu Sản Phẩm - Không Gian"</b> của chúng tôi mang đến <b class="text-orange-700">giải pháp thực tế ảo 3D độc đáo</b>, giúp bạn tạo ấn tượng mạnh mẽ với khách hàng thông qua cách trình bày sản phẩm đầy sáng tạo và thuyết phục.
  //   </p>

  //   <div class="flex justify-center py-6">
  //     <img
  //       src="/imgs/kham_pha_khong_gian_vr.png"
  //       alt="Giới thiệu sản phẩm không gian"
  //       class="!w-full h-auto object-cover rounded-lg shadow-md"
  //     >
  //   </div>

  //   <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //     Từ những bất động sản cao cấp, nội thất hiện đại, đến các sản phẩm dịch vụ phong phú, chúng tôi giúp bạn biến từng chi tiết thành một <b class="text-orange-700">trải nghiệm trực quan và sống động</b>.
  //     <br/>
  //     Những thước phim thực tế ảo không chỉ khơi gợi sự tò mò của khách hàng mà còn <b class="text-orange-700">truyền tải giá trị cốt lõi</b> của sản phẩm một cách hiệu quả, giúp họ hiểu rõ hơn về không gian và lợi ích mà sản phẩm mang lại.
  //   </p>
  //   <br/>

  //   <b>Bạn có thể là:</b>
  //   <ul class="default-list">
  //     <li>Một nhà phát triển bất động sản cần giới thiệu căn hộ mẫu hay khu biệt thự cao cấp với khách hàng quốc tế mà <b class="text-orange-700">không cần di chuyển</b>.</li>
  //     <li>Một chủ sở hữu cửa hàng nội thất muốn khách hàng <b class="text-orange-700">hình dung rõ ràng</b> từng món đồ trong không gian thực tế của họ.</li>
  //     <li>Một quản lý khách sạn hoặc resort cao cấp đang tìm cách đưa khách hàng <b class="text-orange-700">“tham quan trực tuyến”</b> các phòng nghỉ, tiện ích sang trọng trước khi đặt phòng.</li>
  //     <li>Một doanh nghiệp cung cấp dịch vụ như spa, nhà hàng, hoặc trung tâm thể thao, cần giới thiệu không gian trải nghiệm trực tiếp mà không cần khách hàng phải đến tận nơi.</li>
  //     <li>Một công ty tổ chức sự kiện muốn khách hàng <b class="text-orange-700">cảm nhận được quy mô và chất lượng</b> không gian tổ chức qua video thực tế ảo.</li>
  //   </ul>

  //   <div class="video-container my-8 text-center">
  //     <h4 class="text-xl !font-semibold text-gray-600 mb-4">
  //      - Giới thiệu qua công nghệ thực tế ảo đem đến sự cạnh tranh cực kỳ lớn -
  //     </h4>
  //     <video
  //       className="w-full"
  //       controls
  //       poster="/imgs/kham_pha_khong_gian_qua_kinh_vr.png"
  //       src="/vids/kham_pha_khong_gian_qua_kinh_vr.mp4"
  //       title="Video player"
  //       loop
  //       disablePictureInPicture
  //     ></video>
  //   </div>

  //   <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
  //     Điểm đặc biệt của dịch vụ của chúng tôi chính là khả năng kết nối cảm xúc. <br/>
  //     Khi khách hàng được “bước vào” không gian sản phẩm thông qua video 3D, họ không chỉ nhìn thấy mà còn cảm nhận được sự chân thực và đẳng cấp.  <br/>
  //     Điều này sẽ là yếu tố thúc đẩy quyết định mua hàng, tạo lòng tin và giúp doanh nghiệp của bạn nổi bật hơn trên thị trường cạnh tranh khốc liệt.
  //   </div>

  //   <hr class="my-8"/>

  //   <h3>HÃY ĐỂ <span class="font-extrabold text-2xl !text-gray-500">MYVR</span> GIÚP BẠN!</h3>
  //   <ul class="default-list">
  //     <li>MyVR tự hào là đội ngũ <b class="text-orange-700">đầu tiên và duy nhất</b> tại Việt Nam chuyên dựng video 3D thực tế ảo bằng thiết bị hiện đại, chuyên nghiệp. </li>
  //     <li>Chúng tôi mang đến cơ hội lưu giữ những thước phim giới thiệu siêu chân thực mà <b class="text-orange-700">các nền tảng video thông thường không thể đem lại</b>. </li>
  //     <li>Khi xem qua kính VR, khách hàng của bạn sẽ ngạc nhiên vì trong vô thức, họ không nhận ra mình đang "xem", thay vì đó cảm giác giống như đang "sống",  "trải nghiệm" và hòa vào không gian chính nơi đó. </li>
  //     <li>Và dù bạn ở bất kỳ nơi đâu, MyVR luôn sẵn sàng đồng hành và có mặt trên mọi miền tổ quốc!</li>
  //   </ul>

  //   <div class="mt-4 mb-16 text-center">
  //   <a href="/lien-he" target="_blank"><span class="bg-[#069a2b] hover:bg-[#0d9b31] font-semibold !text-white px-8 py-3 rounded transition duration-300 animate-fadeInUp">LIÊN HỆ MYVR</span></a>
  //   </div>

  //   <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //     Chúng tôi hiểu rằng mỗi sản phẩm đều mang một câu chuyện riêng. Với công nghệ thực tế ảo, <b>MYVR</b> sẽ giúp bạn truyền tải những câu chuyện ấy một cách sáng tạo và trọn vẹn nhất.
  //     Hãy để chúng tôi đồng hành cùng bạn trong hành trình gây ấn tượng với khách hàng, tạo dựng niềm tin và nâng cao giá trị thương hiệu.
  //   </p>
  // </div>

  //   `,
  // },
  // {
  //   id: 4,
  //   mappingId: BRIEF_SERVICES.at(0)?.id,
  //   title: "Quay theo yêu cầu",
  //   subtitle: "Linh Hoạt, Độc Đáo",
  //   description: `Chúng tôi hiểu rằng mỗi câu chuyện, mỗi khoảnh khắc đều mang ý nghĩa riêng biệt.
  //     Với dịch vụ quay theo yêu cầu, bạn có thể tự do sáng tạo và thiết kế nội dung theo mong muốn của mình.
  //     Dù là một buổi tiệc, một sự kiện đặc biệt, hay chỉ đơn giản là những giây phút đời thường đầy ý nghĩa, chúng tôi sẽ giúp bạn biến ý tưởng thành hiện thực.
  //     Với công nghệ 3D thực tế ảo, mọi chi tiết đều được tái hiện chân thực, giúp bạn lưu giữ những ký ức theo cách hoàn hảo nhất.`,
  //   videoSrc: "/vids/ghi_lai_nhung_khoanh_khac_y_nghia.mp4",
  //   videoThumbnail: "/imgs/ghi_lai_nhung_khoanh_khac_y_nghia.png",
  //   videoSrcTitle: "Lưu lại bất kỳ khoảnh khắc nào ý nghĩa đối với bạn",
  //   postFixUrl: SERVICE_POSTFIX_URLS.RANDOM,
  //   fullDescription: `
  //   <h4 class="text-xl text-center text-gray-500 mb-6">
  //     <b>Quay theo yêu cầu - Linh Hoạt, Độc Đáo</b>
  //   </h4>

  //   <div class="full-description text-lg max-w-3xl mx-auto">
  //     <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //       Chúng tôi hiểu rằng mỗi khoảnh khắc trong cuộc sống đều mang những giá trị riêng và đáng để lưu giữ. <br/>
  //       Với dịch vụ <b>Quay theo yêu cầu</b>, bạn có thể thoải mái sáng tạo, chia sẻ ý tưởng, và chúng tôi sẽ giúp bạn biến chúng thành hiện thực theo cách chân thực và độc đáo nhất.
  //     </p>

  //     <div class="flex justify-center py-6">
  //       <img
  //         src="/imgs/quay_vr_theo_yeu_cau.png"
  //         alt="Quay theo yêu cầu"
  //         class="xl:!w-90 xl:h-auto w-full aspect-video object-cover rounded-lg shadow-md"
  //       >
  //     </div>
  //     <b>Dù đó là:</b>
  //     <ul class="default-list">
  //       <li>Một buổi tiệc sinh nhật giản dị.</li>
  //       <li>Một lễ kỷ niệm mừng ngày tốt nghiệp hoặc tất niên cuối năm.</li>
  //       <li>Một dịp cầu hôn bất ngờ, hay 1 buổi tối hẹn hò nhẹ nhàng, lãng mạn</li>
  //       <li>....</li>
  //     </ul>

  //     <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //       Công nghệ 3D thực tế ảo của chúng tôi tái hiện một cách sống động từng chi tiết nhỏ nhất, từ ánh sáng, không gian, cho đến cảm xúc trong từng thước phim. <br/>
  //       Hãy để mọi khoảnh khắc quý giá trở nên ý nghĩa, được lưu giữ qua lăng kính hiện đại và tinh tế nhất.
  //     </p>

  //     <div class="video-container my-8 text-center">
  //       <h4 class="text-2xl font-semibold text-gray-800 mb-4">
  //         Tận hưởng trải nghiệm độc đáo:
  //       </h4>
  //     <video
  //       className="w-full"
  //       controls
  //       poster="/imgs/ghi_lai_nhung_khoanh_khac_y_nghia.png"
  //       src="/vids/ghi_lai_nhung_khoanh_khac_y_nghia.mp4"
  //       title="Video player"
  //       loop
  //       disablePictureInPicture
  //     ></video>
  //     </div>

  //     <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //       Điểm mạnh của dịch vụ <b>Quay theo yêu cầu</b> nằm ở sự linh hoạt. <br/>
  //       Bạn có thể lựa chọn bối cảnh, góc quay, phong cách trình bày, và nội dung phù hợp nhất với nhu cầu. Dịch vụ của chúng tôi không chỉ giúp bạn ghi lại ký ức mà còn truyền tải cảm xúc, câu chuyện của bạn một cách chân thực nhất.
  //     </p>

  //     <hr class="my-8"/>

  //     <h3>HÃY ĐỂ <span class="font-extrabold text-2xl !text-gray-500">MYVR</span> GIÚP BẠN!</h3>
  //     <ul class="default-list">
  //       <li>MyVR tự hào là đội ngũ <b class="text-orange-700">đầu tiên và duy nhất</b> tại Việt Nam chuyên dựng video 3D thực tế ảo bằng thiết bị hiện đại, chuyên nghiệp. </li>
  //       <li>Chúng tôi mang đến cơ hội lưu giữ những thước phim giới thiệu siêu chân thực mà <b class="text-orange-700">các nền tảng video thông thường không thể đem lại</b>. </li>
  //       <li>Khi xem qua kính VR, khách hàng của bạn sẽ ngạc nhiên vì trong vô thức, họ không nhận ra mình đang "xem", thay vì đó cảm giác giống như đang "sống",  "trải nghiệm" và hòa vào không gian chính nơi đó. </li>
  //       <li>Và dù bạn ở bất kỳ nơi đâu, MyVR luôn sẵn sàng đồng hành và có mặt trên mọi miền tổ quốc!</li>
  //     </ul>

  //     <div class="mt-4 mb-16 text-center">
  //     <a href="/lien-he" target="_blank"><span class="bg-[#069a2b] hover:bg-[#0d9b31] font-semibold !text-white px-8 py-3 rounded transition duration-300 animate-fadeInUp">LIÊN HỆ MYVR</span></a>
  //     </div>

  //     <p class="text-lg text-gray-700 leading-relaxed mb-6">
  //       Hãy thử tưởng tượng: một ngày nào đó, khi bạn xem lại những khoảnh khắc ấy, tất cả kỷ niệm sẽ hiện ra rõ ràng như thể thời gian chưa từng trôi qua. Chúng tôi cam kết mang lại cho bạn những sản phẩm chất lượng nhất, không chỉ là video mà còn là cách để lưu giữ câu chuyện và cảm xúc mãi mãi.
  //     </p>
  //   </div>

  //   `,
  // },
];

export const isSlugInServicePostfixUrls = (value: string): boolean => {
  return Object.values(SERVICE_POSTFIX_URLS).includes(value);
};

export const getMainServiceByPostFixURL = (url: string) => {
  return MAIN_SERVICES.find((service) => service.postFixUrl === url.trim());
};

export const getBriefServiceURLById = (id: string) => {
  return BRIEF_SERVICES.find((service) => service.id === id);
};
