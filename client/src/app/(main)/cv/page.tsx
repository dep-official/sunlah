'use client';

interface Exhibition {
  title: string;
  description: string;
  link: string;
}

export default function CV() {
  const currentExhibitions: Exhibition[] = [
    {
      title: "7 Billion Project",
      description: "acrylic on wood, 1:6 human scale, 2011-",
      link: "/7-billion-project"
    }
  ];

  return (
      <main>
        <section className="mb-16 text-[12px] leading-[25px]">
          <h2 className="font-normal">라선영</h2>
          <p className='font-verdana'>Sun Lah</p>
        </section>

        <section className="mb-16">
          <table className="leading-[25px] text-[12px]">
            <tbody>
              <tr>
                <td className="w-10">2011</td>
                <td>영국왕립미술대학 조소과 석사</td>
              </tr>
              <tr>
                <td className="w-10">2006</td>
                <td>이화여자대학교 조소과 학사</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className='text-[12px] leading-[25px] mb-16'>
          <h2>Solo Exhibitions</h2>
          <table>
            <tbody>
              <tr>
                <td className="w-10">2021</td>
                <td>’Skin and Flesh’, 갤러리 마크</td>
              </tr>
              <tr>
                <td className="w-10">2017</td>
                <td>'사람들', 갤러리 마크</td>
              </tr>
              <tr>
                <td className="w-10">2016</td>
                <td>'반짝이는 것들', 카이스갤러리</td>
              </tr>
              <tr>
                <td className="w-10">2015</td>
                <td>'BEAM', 63 스카이 아트뮤지엄</td>
              </tr>
              <tr>
                <td className="w-10">2014</td>
                <td>'서울, 사람', 코너아트스페이스</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="text-[12px] leading-[25px]">
        <h2>Selected Group Exhibitions</h2>
          <table>
            <tbody>
              <tr>
                <td className="w-10">2022</td>
                <td>'Mimesis Art Project 5', 미메시스 아트뮤지엄, 파주 </td>
              </tr>
              <tr>
                <td>2020</td>
                <td>'Chimera', 실린더</td>
              </tr>
              <tr>
                <td >2018</td>
                <td>'Human, human', 갤러리 마크</td>
              </tr>
              <tr>
                <td></td>
                <td>'굴처럼 얌전히 있으라는 말은 지겨워', 아트스페이스 휴</td>
              </tr>
              <tr>  
                <td>2017</td>
                <td>'나무, 시간의 흔적', 63 아트 뮤지엄</td>
              </tr>
              <tr>
                <td></td>
                <td>'3≠1', 아트스페이스 3</td>
              </tr>
              <tr>  
                <td>2016</td>
                <td>'지리산 프로젝트 : 2016 - 우주; 여자, 실상사', 남원</td>
              </tr>
              <tr>
                <td></td>
                <td>'In Between', 최정아갤러리</td>
              </tr>
              <tr>
                <td></td>
                <td>'Not same Less different- Part 2', 갤러리마크</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>'플라스틱 신화들', 아시아문화전당, 광주</td>
              </tr>
              <tr>
                <td></td>
                <td>꿈꾸다: 봄, 서울, 서울시청 로비</td>
              </tr>
              <tr>
                <td></td>
                <td>'조각과 사람', 카이스갤러리</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>'At Home Salon 2014', 애스콧, 영국</td>
              </tr>
              <tr>
                <td></td>
                <td>'Springboard', White Post Gallery, 런던, 영국</td>
              </tr>
              <tr>
                <td></td>
                <td>'루프탑 크릿 논/전', 닥터스트레인지러브</td>
              </tr>
              <tr>
                <td>2013</td>
                <td>'대중의 새발견', 문화역서울284</td>
              </tr>
              <tr>
                <td></td>
                <td>'Open Plan: Strategies and Tactics', Departure Gallery, 런던, 영국</td>
              </tr>
            </tbody>
          </table>
        </section>
         
      </main>
  );
}
