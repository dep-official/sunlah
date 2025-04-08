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
    <div className="min-h-screen bg-white p-8 font-nicholas">
      <Header />
      
      <main className="max-w-3xl mx-auto">
        <section className="mb-16">
          <h2 className="text-2xl mb-8">
            라선영<br/>
          Sun Lah</h2>
        </section>

        <section className="mb-16">
          <h3 className="text-xl mb-6">ARTIST STATEMENT</h3>
          <div className="space-y-4 text-lg">
            <p>
              The fact that seven billion people live in this world means that seven billion versions of the universe coexist. 
              Every individual exists in their own world—one that can never truly be shared. 
              Out of the desire to be understood and to connect, language, culture, and society were born.
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
          <h3 className="text-xl mb-6">EDUCATION</h3>
          <div className="space-y-2">
            <p><span className="inline-block w-14">2013</span> Royal College of Art, MA Sculpture</p>
            <p><span className="inline-block w-14">2010</span> Ewha Womens University, MFA Sculpture</p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-xl mb-6">ON EXHIBITION</h3>
          <div className="space-y-6">
            {currentExhibitions.map((exhibition, index) => (
              <div key={index} className="group">
                <Link 
                  href={exhibition.link}
                  className="block group-hover:opacity-70 transition-opacity"
                >
                  <p className="text-lg link-underline inline-block">
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
          <h3 className="text-xl mb-6">EXHIBITIONS</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg mb-4">Solo Exhibitions</h4>
              <div className="space-y-2">
                <p><span className="inline-block w-14">2021</span> 'Skin and Flesh', Gallery MARK, Seoul, Korea</p>
                <p><span className="inline-block w-14">2017</span> 'Humans', Gallery MARK, Seoul, Korea</p>
                <p><span className="inline-block w-14">2016</span> 'Sparkling', Cais Gallery, Seoul, Korea</p>
                <p><span className="inline-block w-14">2015</span> 'BEAM', 63 Sky Art Museum, Seoul, Korea</p>
                <p><span className="inline-block w-14">2014</span> 'Seoulites', Corner Art Space, Seoul, Korea</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4">Selected Group Exhibitions</h4>
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
    </div>
  );
}
