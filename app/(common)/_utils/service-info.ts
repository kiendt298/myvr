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
    imgSrc: "/imgs/bua-com-vuot-thoi-gian-va-khong-gian.png",
    postFixUrl: SERVICE_POSTFIX_URLS.SPEICAL,
  },
  {
    id: "brief-service-2",
    title: "Lưu Giữ Tình Yêu & Hành Trình Trưởng Thành",
    imgSrc: "/imgs/luu-giu-ky-uc-cho-con.png",
    postFixUrl: SERVICE_POSTFIX_URLS.LOVE,
  },
  {
    id: "brief-service-3",
    title: "Khoảnh khắc bên gia đình, người thân",
    imgSrc: "/imgs/khoanh-khac-ben-gia-dinh.png",
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
    id: 2,
    mappingId: BRIEF_SERVICES.at(2)?.id,
    title: "Ký ức 3D đầu đời cho con",
    subtitle: "Tuổi thơ con... chỉ đến đúng 1 lần",
    description: `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333; max-width: 720px;">
  <p><strong>Hãy tưởng tượng:</strong></p>
  <p>
    Một ngày nào đó, con bạn đeo kính VR lên. <br>
    Và lần đầu tiên trong đời, con không chỉ xem - mà thực sự được “trở về” tuổi thơ của chính mình.
  </p>
   <ul class="default-list">
    <li> Con nhìn thấy căn phòng quen thuộc ngày bé </li>
    <li> Nghe lại tiếng cười của chính mình </li>
    <li> Thấy ông bà, ba mẹ của "ngày đó" - những phiên bản mà thời gian đã lặng lẽ mang đi</li>
  </ul>
  <br/>
  <p>
    Đó là một cảm giác…<br>
    <strong>Mà chưa từng có thế hệ nào trước đây được trải nghiệm.</strong>
  </p>
  <ul class="default-list">
    <li> Không phải qua lời kể </li>
    <li> Không phải qua trí tưởng tượng </li>
  </ul>
  <p>
    <strong>Mà là trực tiếp sống lại ký ức của chính mình.</strong>
  </p>
  <br>
  <p>
    Những bữa tiệc xa hoa, những món quà đắt tiền.
  </p>
  <p>
    Cũng không bằng món quà…<br>
    <strong style="color: #d35400;">
      Mà chỉ thời gian mới TẠO RA — và công nghệ giúp bạn GIỮ LẠI.
    </strong>
  </p>
  <br>
  <p>
    <strong>Một món quà <b>trong tương lai</b>.</strong><br>
    Dành cho con.<br>
    Và cũng dành cho chính bạn.
  </p>

</div>`,
    youtubeSrc: "https://www.youtube.com/embed/WDLEjh70vOM?si=iR7j9WhzmwwvM3p-",
    videoSrc: "/vids/nhin_lai_hanh_trinh_truong_thanh_cua_con.mp4",
    videoThumbnail: "/imgs/nhin_lai_hanh_trinh_truong_thanh_cua_con.png",
    videoSrcTitle: `Cùng con lưu lại hành trình khôn lớn`,
    postFixUrl: SERVICE_POSTFIX_URLS.LOVE,
    fullDescription: `
    <h4 class="text-xl text-center text-gray-500 mb-6">
      <b>Lưu Giữ Tình Yêu & Hành Trình Trưởng Thành</b>
    </h4>

    <div class="full-description text-lg max-w-3xl mx-auto">
     <p class="text-lg text-gray-700 leading-relaxed mb-6"> 
     Người ta vẫn hay nói rằng: <br />
     <b> "Bạn chỉ có duy nhất một cơ hội để ngắm nhìn con mình còn bé nhỏ, vì những khoảnh khắc ấy trôi qua rất nhanh trước khi bạn kịp nhận ra." </b>
    </div>

   <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
      Hôm nay con còn nằm gọn trong vòng tay bạn, <br />
      Ngày mai đã lon ton chạy khắp nhà, <br />
      Và rồi một ngày… bạn chợt nhận ra, đứa trẻ hôm ấy đã lớn từ lúc nào.
    </p>
     </div>
<div class="full-description text-lg max-w-3xl mx-auto">
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
   <b> Nhưng… bạn có thể lưu giữ tất cả. </b>

    <ul class="default-list">
      <li>Không phải những bức ảnh đứng yên theo năm tháng.</li>
      <li>Không phải vài đoạn video rồi cũng bị lãng quên trong bộ nhớ.</li>
    </ul> <br />
   <b class="text-orange-700"> Mà là cả một thế giới tuổi thơ - sống động, nguyên vẹn trong không gian 3D. </b> <br />
   Nơi bạn có thể bước vào… <br />
    <ul class="default-list">
      <li>Khoảnh khắc con vừa chập chững đứng dậy - đôi chân nhỏ run run, ánh mắt ngây ngô nhìn bạn.</li>
      <li>Ngồi xuống bên con trong bữa ăn đầu đời - nơi mọi thứ còn vụng về nhưng đầy ắp yêu thương.</li>
      <li>Và rồi… đứng đó, lặng nhìn chính mình của những năm tháng ấy - đang ôm con vào lòng, gần đến mức bạn gần như có thể chạm được.</li>
    </ul> 
    </p>

    <div class="flex justify-center py-6">
      <img 
        src="/imgs/nhin-lai-sinh-nhat-dau-tien-cua-chinh-minh.png" 
        alt="Kỷ niệm tình yêu và con cái" 
        class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md"
      >
    </div>

    <p><strong>Hãy tưởng tượng:</strong></p>
  <p>
    Một ngày nào đó, con bạn đeo kính VR lên. <br>
    Và lần đầu tiên trong đời, con không chỉ xem - mà thực sự được “trở về” tuổi thơ của chính mình.
  </p>
   <ul class="default-list">
    <li> Bữa tiệc thôi nôi sinh nhật đầu đời </li>
    <li> Con nhìn thấy căn phòng quen thuộc ngày bé </li>
    <li> Nghe lại tiếng cười của chính mình </li>
    <li> Thấy ông bà, ba mẹ của "ngày đó" - những phiên bản mà thời gian đã lặng lẽ mang đi</li>
  </ul>
  <br/>
  <p>
    Đó là một cảm giác…<br>
    <strong>Mà chưa từng có thế hệ nào trước đây được trải nghiệm.</strong>
  </p>
  <ul class="default-list">
    <li> Không phải qua lời kể </li>
    <li> Không phải qua trí tưởng tượng </li>
  </ul>
  <p>
    <strong>Mà là trực tiếp sống lại ký ức của chính mình.</strong>
  </p>
  <br>
  <p>
    Những bữa tiệc xa hoa, những món quà đắt tiền.
  </p>
  <p>
    Cũng không bằng món quà…<br>
    <strong style="color: #d35400;">
      Mà chỉ thời gian mới TẠO RA — và công nghệ giúp bạn GIỮ LẠI.
    </strong>
  </p>
  <br />
  <p>
    <strong>Một món quà <b>trong tương lai</b>.</strong><br>
    Dành cho con.<br>
    Và cũng dành cho chính bạn.
  </p>
  <br />
  <hr />
<br />

    <div class="flex justify-center py-6">
      <img 
        src="/imgs/luu-giu-ky-uc-cho-con.png" 
        alt="Kỷ niệm tình yêu và con cái" 
        class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md"
      >
    </div>
    <b>Hãy để chúng tôi giúp bạn lưu giữ lại:</b>  <br/>
     <ul class="default-list">
      <li>Hành trình tình yêu của cha mẹ tiếp tục lớn lên qua từng dấu ấn của con. </li>
      <li>Những khoảnh khắc tưởng chừng rất bình thường… nhưng sau này lại trở thành điều quý giá nhất! </li>
      <li>Sẽ là một <b class="text-orange-700">trải nghiệm kỳ diệu và lạ lùng</b>, giúp con thêm tự hào về tình yêu và tổ ấm của mình.</li>
      <li>Khi được nhìn lại 1 bằng không gian 3D có gia đình nhỏ trong đó, con bạn sẽ biết rằng tình yêu của bạn dành con đã bắt đầu ngay từ những ngày đầu tiên của cuộc đời.</li>
    </ul>

     <div class="text-center mb-8 mt-4">
      <div class="flex justify-center px-6">
        <img 
          src="/imgs/con-duoc-xem-lai-ky-uc-cua-minh.png" 
          alt="Hành trình lưu giữ kỷ niệm trưởng thành" 
          class="!w-full h-auto object-cover rounded-lg shadow-md">
      </div>

      <p class="font-semibold text-gray-400">
        - Sẽ là 1 trải nghiệm lạ lùng và kỳ diệu cho con bạn -
      </p>
    </div>

    <p>
      Bằng công nghệ dựng <b class="!text-orange-700">video 3D chất lượng 8K</b> và tái hiện trong <b class="!text-orange-700">không gian thực tế ảo</b> với tỷ lệ và chiều sâu giống như ta cảm nhận bằng mắt thường, 
      MyVR sẽ giúp bạn lưu giữ lại những khoảnh khắc vô giá ấy một cách chân thực nhất.
    </p>

    

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

 <div class="video-container my-8 text-center">
      <iframe 
        width="560" 
        src="https://www.youtube.com/embed/WDLEjh70vOM?si=iR7j9WhzmwwvM3p-" 
        title="Đám cưới và hành trình yêu thương" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen 
        class="mx-auto rounded-lg shadow-md aspect-auto h=[200px] sm:h-[315px]">
      </iframe>

        <h4 class="text2xl !font-semibold text-gray-600 mt-4">
        1 "món quà" vô giá cho tương lai
      </h4>
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
  {
    id: 0,
    mappingId: BRIEF_SERVICES.at(1)?.id,
    title: "Kỷ niệm vô giá với ông bà, cha mẹ",
    subtitle: "Những khoảnh khắc vượt thời gian & thế hệ",
    description: `
      <b>Có những cái ôm… con cháu sẽ không bao giờ kịp nhớ.</b>

<p>Vì khi còn quá nhỏ, ông bà đã bắt đầu đi đến những chặng cuối của cuộc đời. </p>
<br/>
<p>Con vẫn cười, vẫn bi bô gọi… </p>
  <ul class="default-list">
      <li>Nhưng chưa đủ lớn để hiểu đó là ai. </li>
      <li>Chưa đủ lâu để giữ lại một ký ức trọn vẹn. </li>
    </ul>
<p>
<br/>
<b>Và rồi một ngày, </b><br/>
khi những đứa trẻ bắt đầu hiểu thế nào là yêu thương, là gia đình…  <br/>
thì ông bà có thể đã không còn nữa.</p>
<br/>      
<b>Nhưng… có một cách để sự hiện diện ấy không biến mất.</b>

<p>Không phải chỉ là "ghi lại" trong gia phả.<br/>
Mà là giữ ông bà “ở lại” - theo cách chân thực nhất có thể.</p>
<br/>

<p><b style="color: #d35400;">Trong một không gian 3D sống động như đang ở ngay trước mắt</b></p>
 <ul class="default-list">
      <li>Nơi ông bà không chỉ là hình ảnh. Mà là <b>một con người đang hiện diện</b>...</li>
      <li>Nơi một đứa trẻ của hiện tại… có thể ngồi cùng ông bà của quá khứ.</li>
      <li>Nơi hai thế hệ, tưởng chừng không bao giờ có đủ thời gian để hiểu nhau -
lại có thể ở cạnh nhau, trọn vẹn trong cùng một khoảnh khắc.</li>
    </ul>
    <br/>
 <b>1 khoảnh khắc tương phùng vượt qua được nghịch cảnh của thời gian.</b>   
`,
    youtubeSrc: "https://www.youtube.com/embed/52vtguDb5-c?si=b2E7k8Iq0DOAiU-N",
    videoSrc: "/vids/bua_com_voi_nguoi_me_da_mat.mp4",
    videoThumbnail: "/imgs/bua_com_voi_nguoi_me_da_mat.png",
    videoSrcTitle: "Lưu lại ký ức với Ông bà tuổi đã cao",
    postFixUrl: SERVICE_POSTFIX_URLS.SPEICAL,
    fullDescription: `
    <h4 class="text-xl text-center text-gray-500 mb-6"><b>Khoảnh khắc tương phùng vượt qua được nghịch cảnh của thời gian</b></h4>

    <div class="full-description max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
     <b>Có những cái ôm… con cháu sẽ không bao giờ kịp nhớ.</b>

<p>Vì khi còn quá nhỏ, ông bà đã bắt đầu đi đến những chặng cuối của cuộc đời. </p> 
<div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
  <p>Con vẫn cười, vẫn bi bô gọi… </p>
  <ul class="default-list">
      <li>Nhưng chưa đủ lớn để hiểu đó là ai. </li>
      <li>Chưa đủ lâu để giữ lại một ký ức trọn vẹn. </li>
    </ul>
</div>
<b>Và rồi một ngày, </b><br/>
khi những đứa trẻ bắt đầu hiểu thế nào là yêu thương, là gia đình…  <br/>
thì ông bà có thể đã không còn nữa.</p>

      <div class="text-center mb-8">
        <div class="flex justify-center py-6">
          <img 
            src="/imgs/con-chau-xem-lai-hinh-anh-ong-ba.png" 
            alt="Lưu giữ ký ức gia đình" 
            class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md">
        </div>
        <p class="font-semibold text-gray-400">
          - Đừng để những kỷ niệm vô giá chỉ còn nằm trong những bức ảnh -
        </p>
      </div>

      <b class="mb-6">
       Hãy tưởng tượng… nhiều năm sau, khi con cháu đã lớn.
      </b>
      <p> Con đeo kính VR lên, và lần đầu tiên trong đời - được “gặp” ông bà của mình. </p>

      <ul class="default-list">
        <li>Không phải qua những lời kể từ người thân.</li>
        <li>Không phải qua trí tưởng tượng từ những bức ảnh. </li>
      </ul>
      <br/>

<p>Mà là ngồi xuống bên mâm cơm, đối diện ông bà như đang ở trước mắt - Trong một thế giới thực.</p>
<b>Một bữa cơm vượt thời gian và không gian </b> 
<ul class="default-list">
        <li>Nơi khoảng cách thế hệ được thu hẹp.</li>
        <li>Nơi lời dặn dò không còn bị đứt đoạn bởi năm tháng. </li>
      </ul>
      <br/>
<p><b>Không chỉ con bạn. Mà chính bạn - cũng có thể quay lại những ngày ấy.</b>
<br/>
Ngồi lại bên mâm cơm có đủ ba thế hệ. <br/>
Nghe lại những lời dặn dò tưởng chừng rất bình thường… nhưng sau này, không gì có thể thay thế. </p>

<p>Đây không phải là một đoạn video.
<br/>
Đây là một cuộc gặp gỡ được giữ lại cho tương lai.
<br/>
<b style="color: #d35400;">Một cách để thời gian… không thể lấy đi hoàn toàn một con người.</b>
      <div class="text-center mb-8">
        <div class="flex justify-center py-6">
          <img 
            src="/imgs/bua-com-vuot-thoi-gian-va-khong-gian.png" 
            alt="Lưu giữ ký ức gia đình" 
            class="w-full aspect-video xl:w-64 xl:h-40 object-cover rounded-lg shadow-md">
        </div>

        <p class="font-semibold text-gray-400">
          - Bữa cơm "thế hệ" vượt thời gian và cả không gian -
        </p>
      </div>

      <p>
        Bằng công nghệ dựng <b class="text-orange-700">video 3D chất lượng 8K</b> và tái hiện trong <b class="text-orange-700">không gian thực tế ảo</b> với tỷ lệ và chiều sâu giống như ta cảm nhận bằng mắt thường, MyVR sẽ giúp bạn lưu giữ lại những khoảnh khắc vô giá ấy một cách chân thực nhất.<br/>
        Đây <b class="text-orange-700">không chỉ là một đoạn phim</b>, mà là một <b class="text-orange-700">cánh cửa quay về quá khứ</b> – nơi bạn có thể nhìn thấy, lắng nghe, và gần như chạm đến hơi ấm, giọng nói, ánh mắt của người thân yêu. 
        Như thể họ vẫn đang ở ngay bên, chưa từng rời xa.
      </p>

      <div class="p-4 bg-background bg-[#913e1f17] my-2 text-gray-500">
         Là khoảnh khắc quý giá được đóng băng để chờ ngày gặp lại. 
         Đây là lần gặp lại mà thời gian không thể cướp đi. 
         Một lần ghi lại. Giá trị cho nhiều thế hệ.
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
                src="https://www.youtube.com/embed/52vtguDb5-c?si=tpe93C589lQmeGTy" 
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
    title: "Sự kết nối tình thân & gia đình",
    subtitle: "Sự đoàn viên không còn bị giới hạn bởi không gian",
    description: `
     <b>Không phải ai cũng có thể trờ về nhà...</b>
      <ul class="default-list">
        <li>Có những người con phải rời xa gia đình - vì công việc, vì cuộc sống… và những lần sum họp dần trở thành điều xa xỉ.</li>
        <li>Có những người… đang nhìn thế giới qua song sắt, đếm thời gian bằng những ngày tháng lặng lẽ trôi qua. Khi một bữa cơm gia đình… là điều không thể chạm tới</li>
        <li>Có những người… muốn trở về hơn bất kỳ ai, nhưng cơ thể không còn cho phép. Bệnh tật giữ họ lại. Khoảng cách giữ họ lại. Số phận… giữ họ lại.</li>
      </ul>
      <br/>
    <b>Hãy tưởng tượng… dù bạn đang ở bất cứ đâu </b>

<p>Bạn vẫn có thể “trở về” - không phải bằng một chuyến xe, mà bằng một không gian 3D qua kính Thực tế ảo.</p>
<p>
 <br/>
Ngôi nhà vẫn còn đó, mâm cơm vẫn được dọn ra, và những người bạn yêu thương… vẫn đang chờ.</p>
<ul class="default-list">
    <li>Ở đó, người ở xa có thể trở về.</li>
    <li>Người không thể bước ra ngoài… vẫn có thể “đi đến”.</li>
</ul>
<br/>
<p>Không phải là thay thế thực tại.
<b class="text-orange-700">Mà là mở ra một cách khác để được ở bên nhau.</b></p>
`,
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
