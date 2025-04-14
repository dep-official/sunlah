'use client';

import { useLanguageStore } from '@/shared/store/language';

interface Exhibition {
  title: string;
  description: string;
  link: string;
}

export default function CV() {
  const { language } = useLanguageStore();

  const currentExhibitions: Exhibition[] = [
    {
      title: "7 Billion Project",
      description: "acrylic on wood, 1:6 human scale, 2011-",
      link: "/7-billion-project"
    }
  ];

  const content = {
    ko: {
      name: {
        korean: "라선영",
        english: "Sun Lah"
      },
      education: [
        { year: "2011", description: "영국왕립미술대학 조소과 석사" },
        { year: "2006", description: "이화여자대학교 조소과 학사" }
      ],
      soloExhibitions: [
        { year: "2021", description: "'Skin and Flesh', 갤러리 마크" },
        { year: "2017", description: "'사람들', 갤러리 마크" },
        { year: "2016", description: "'반짝이는 것들', 카이스갤러리" },
        { year: "2015", description: "'BEAM', 63 스카이 아트뮤지엄" },
        { year: "2014", description: "'서울, 사람', 코너아트스페이스" }
      ],
      groupExhibitions: [
        { year: "2022", description: "'Mimesis Art Project 5', 미메시스 아트뮤지엄, 파주" },
        { year: "2020", description: "'Chimera', 실린더" },
        { year: "2018", description: "'Human, human', 갤러리 마크" },
        { year: "", description: "'굴처럼 얌전히 있으라는 말은 지겨워', 아트스페이스 휴" },
        { year: "2017", description: "'나무, 시간의 흔적', 63 아트 뮤지엄" },
        { year: "", description: "'3≠1', 아트스페이스 3" },
        { year: "2016", description: "'지리산 프로젝트 : 2016 - 우주; 여자, 실상사', 남원" },
        { year: "", description: "'In Between', 최정아갤러리" },
        { year: "", description: "'Not same Less different- Part 2', 갤러리마크" },
        { year: "2015", description: "'플라스틱 신화들', 아시아문화전당, 광주" },
        { year: "", description: "꿈꾸다: 봄, 서울, 서울시청 로비" },
        { year: "", description: "'조각과 사람', 카이스갤러리" },
        { year: "2014", description: "'At Home Salon 2014', 애스콧, 영국" },
        { year: "", description: "'Springboard', White Post Gallery, 런던, 영국" },
        { year: "", description: "'루프탑 크릿 논/전', 닥터스트레인지러브" },
        { year: "2013", description: "'대중의 새발견', 문화역서울284" },
        { year: "", description: "'Open Plan: Strategies and Tactics', Departure Gallery, 런던, 영국" }
      ]
    },
    en: {
      name: {
        korean: "라선영",
        english: "Seonyoung Sun Lah"
      },
      education: [
        { year: "2011", description: "Royal College of Art, MA Sculpture" },
        { year: "2006", description: "Ewha Womens University, BFA Sculpture" }
      ],
      soloExhibitions: [
        { year: "2021", description: "'Skin and Flesh', Gallery MARK, Seoul, Korea" },
        { year: "2017", description: "'Humans', Gallery MARK, Seoul, Korea" },
        { year: "2016", description: "'Sparkling', Cais Gallery, Seoul, Korea" },
        { year: "2015", description: "'BEAM', 63 Sky Art Museum, Seoul, Korea" },
        { year: "2014", description: "'Seoulites', Corner Art Space, Seoul, Korea" }
      ],
      groupExhibitions: [
        { year: "2022", description: "'Mimesis Art Project 5', Mimesis Art Museum, Paju, Korea" },
        { year: "2020", description: "'Chimera', Cylinder, Seoul, Korea" },
        { year: "2018", description: "'Human, human', Gallery Mark, Seoul, Korea" },
        { year: "2017", description: "'Wood, Trace of Time', 63 Art Museum, Seoul, Korea" },
        { year: "", description: "'3≠1', Artspace 3, Seoul, Korea" },
        { year: "2016", description: "'Jirisan Project : 2016 - Space Woman', Silsangsa Temple, Namwon, Korea" },
        { year: "", description: "'In Between', Choi Jung A Gallery, Seoul, Korea" },
        { year: "", description: "'Not same Less different- Part 2', Gallery Mark, Seoul, Korea" },
        { year: "2015", description: "'Plastic Myths', Asia Culture Complex, Gwangju, Korea" },
        { year: "", description: "Dreaming Spring, Seoul City Hall, Seoul, Korea" },
        { year: "", description: "'Sculpture and Human', Cais Gallery, Seoul, Korea" },
        { year: "2014", description: "'At Home Salon 2014', Ascot, UK" },
        { year: "", description: "'Springboard', White Post Gallery, London, UK" },
        { year: "", description: "'Rooftop Crits', Dr. Strangelove, Seoul, Korea" },
        { year: "2013", description: "'Public Rediscovered', Culture Station Seoul 284, Seoul, Korea" },
        { year: "", description: "'Open Plan: Strategies and Tactics', Departure Gallery, London, UK" }
      ]
    }
  };

  const selectedContent = content[language];

  return (
    <main>
      <section className="mb-16 text-[12px] leading-[25px]">
        <h2 className="font-normal">{selectedContent.name.korean}</h2>
        {language === 'en' && <p className="font-normal">羅 善榮</p>}
        <p className='font-verdana'>{selectedContent.name.english}</p>
      </section>

      <section className="mb-16">
        <table className="leading-[25px] text-[12px]">
          <tbody>
            {selectedContent.education.map((item, index) => (
              <tr key={index}>
                <td className="w-10">{item.year}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className='text-[12px] leading-[25px] mb-16'>
        <h2>Solo Exhibitions</h2>
        <table>
          <tbody>
            {selectedContent.soloExhibitions.map((item, index) => (
              <tr key={index}>
                <td className="w-10">{item.year}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="text-[12px] leading-[25px]">
        <h2>Selected Group Exhibitions</h2>
        <table>
          <tbody>
            {selectedContent.groupExhibitions.map((item, index) => (
              <tr key={index}>
                <td className="w-10">{item.year}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
