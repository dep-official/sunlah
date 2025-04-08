'use client';

import { Header } from '@/widgets';
import Link from 'next/link';

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
        <section className="mb-16">
          <h2 className="text-2xl font-normal leading-[2]">
            라선영</h2>
            <p className='text-lg font-normal font-verdana'>Sun Lah</p>
        </section>

        <section className="mb-16">
          <ul>
            <li>2011  영국왕립미술대학 조소과 석사
    <li>
    2006  이화여자대학교 조소과 학사</li>  
          </li>
          </ul>
          <div className="space-y-4 text-lg">
            <p>
            2011  영국왕립미술대학 조소과 석사
2006  이화여자대학교 조소과 학사

            </p>
            <p>
              Because we must protect ourselves and the groups we belong to, humans instinctively resist what is different. 
              To survive in society, we sometimes have to conceal parts of ourselves, and at times, we must fight. 
              This leads people to compare, categorize, and define one another. 
              But every life is everything to the one living it. 
              Every life is the center of its own universe, and to each person, their existence holds the greatest significance.
            </p>
            <p>
              For that reason, every life is inherently worthy of respect and remembrance. 
              Through the 7 Billion Project, I celebrate the individuality of every person—completely independent, 
              inhabiting their own space, and deserving of equal recognition.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-xl">EDUCATION</h3>
          <div className="space-y-2">
            <p><span className="inline-block w-14">2013</span> Royal College of Art, MA Sculpture</p>
            <p><span className="inline-block w-14">2010</span> Ewha Womens University, MFA Sculpture</p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-xl">ON EXHIBITION</h3>
          <div className="space-y-6">
            {currentExhibitions.map((exhibition, index) => (
              <div key={index} className="group">
                <Link 
                  href={exhibition.link}
                  className="block transition-opacity group-hover:opacity-70"
                >
                  <p className="inline-block text-lg link-underline">
                    {exhibition.title}
                  </p>
                  <p className="text-base text-gray-600">
                    {exhibition.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>

     

        <section className="mb-16">
          <h3 className="mb-6 text-xl">EXHIBITIONS</h3>
          <div className="space-y-8">
            <div>
              <h4 className="mb-4 text-lg">Solo Exhibitions</h4>
              <div className="space-y-2">
                <p><span className="inline-block w-14">2021</span> 'Skin and Flesh', Gallery MARK, Seoul, Korea</p>
                <p><span className="inline-block w-14">2017</span> 'Humans', Gallery MARK, Seoul, Korea</p>
                <p><span className="inline-block w-14">2016</span> 'Sparkling', Cais Gallery, Seoul, Korea</p>
                <p><span className="inline-block w-14">2015</span> 'BEAM', 63 Sky Art Museum, Seoul, Korea</p>
                <p><span className="inline-block w-14">2014</span> 'Seoulites', Corner Art Space, Seoul, Korea</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg">Selected Group Exhibitions</h4>
              <div className="space-y-2">
                <p><span className="inline-block w-14">2024</span> 7 Billion Project, Seoul Museum of Art, Seoul, KR</p>
                <p><span className="inline-block w-14">2022</span> 'Mimesis Art Project 5', Mimesis Art Museum, Paju, Korea</p>
                <p><span className="inline-block w-14">2020</span> 'Chimera', Cylinder, Seoul, Korea</p>
                <p><span className="inline-block w-14">2018</span> 'Human, human', Gallery Mark, Seoul, Korea</p>
                <p><span className="inline-block w-14"></span> '굴처럼 얌전히 있으라는 말은 지겨워' – Artspace Hue, Seoul, Korea</p>
                <p><span className="inline-block w-14">2017</span> 'Wood, Trace of Time'-63 Art Museum, Seoul, Korea</p>
                <p><span className="inline-block w-14"></span> '3≒1', Artspace 3, Seoul, Korea</p>
                <p><span className="inline-block w-14">2016</span> 'Jirisan Project : 2016 - Space Woman', Silsangsa Temple, Namwon, Korea</p>
                <p><span className="inline-block w-14"></span> 'In Between', Choi Jung A Gallery, Seoul, Korea</p>
                <p><span className="inline-block w-14"></span> 'Not same Less different- Part 2', Gallery Mark, Seoul, Korea</p>
                <p><span className="inline-block w-14">2015</span> 'Plastic Myths', Asia Culture Complex, Gwangju, Korea</p>
                <p><span className="inline-block w-14"></span> Dreaming Spring, Seoul City Hall, Seoul, Korea</p>
                <p><span className="inline-block w-14"></span> 'Sculpture and Human', Cais Gallery, Seoul, Korea</p>
                <p><span className="inline-block w-14">2014</span> 'At Home Salon 2014', Ascot, UK</p>
                <p><span className="inline-block w-14"></span> 'Springboard', White Post Gallery, London, UK</p>
                <p><span className="inline-block w-14"></span> 'Rooftop Crits', Dr. Strangelove, Seoul, Korea</p>
                <p><span className="inline-block w-14">2013</span> 'Public Rediscovered', Culture Station Seoul 284, Seoul, Korea</p>
                <p><span className="inline-block w-14"></span> 'Open Plan: Strategies and Tactics', Departure Gallery, London, UK</p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
