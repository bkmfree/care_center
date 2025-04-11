'use client';

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from 'next/link';

// 이미지 슬라이더 컴포넌트
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 슬라이드에 사용할 이미지 배열
  const images = [
    { src: "/images/care1.jpg", alt: "행복요양센터 전경 1" },
    { src: "/images/care2.jpg", alt: "행복요양센터 전경 2" },
    { src: "/images/care3.jpg", alt: "행복요양센터 전경 3" },
    { src: "/images/care4.jpg", alt: "행복요양센터 전경 4" },
  ];

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // 특정 슬라이드로 이동
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 자동 슬라이드 효과
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // 5초마다 슬라이드 변경
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute -z-10 w-full h-full bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      
      {/* 이미지 슬라이더 */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* 이미지 컨테이너 */}
        <div className="relative w-full" style={{ height: '500px' }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute w-full h-full transition-opacity duration-500 ease-in-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none'
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* 화살표 버튼 */}
        <button 
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-md hover:bg-white transition-colors z-20 cursor-pointer"
          aria-label="이전 슬라이드"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-md hover:bg-white transition-colors z-20 cursor-pointer"
          aria-label="다음 슬라이드"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* 인디케이터 */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              } hover:bg-white`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home(): React.ReactNode {
  return (
    <main className="min-h-screen">
      {/* 네비게이션 바 */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.svg" 
              alt="행복요양센터 로고" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-green-600">행복요양센터</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-gray-600 hover:text-green-600 transition-colors">서비스</Link>
            <Link href="#facility" className="text-gray-600 hover:text-green-600 transition-colors">시설안내</Link>
            <Link href="#staff" className="text-gray-600 hover:text-green-600 transition-colors">전문인력</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">이용후기</Link>
            <Link href="#location" className="text-gray-600 hover:text-green-600 transition-colors">오시는 길</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="#contact" className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">상담 예약</Link>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                따뜻한 <span className="text-green-600">돌봄</span>으로<br />건강한 노후를 지원합니다
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                행복요양센터는 어르신들의 건강과 행복한 일상을 위해 최선을 다하는 요양보호시설입니다.
                전문 요양보호사와 최적의 시설로 편안한 생활을 약속드립니다.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="#services" className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center">
                  서비스 알아보기
                </Link>
                <Link href="#contact" className="bg-white text-green-600 border border-green-600 font-medium py-2 px-4 rounded-lg transition-all hover:bg-green-50 text-center">
                  문의하기
                </Link>
              </div>
            </div>
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section id="services" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">제공 서비스</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              어르신들의 건강하고 행복한 일상을 위한 전문 요양 서비스
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '신체활동 지원',
                description: '개인 위생 관리, 식사 보조, 이동 및 일상생활 활동 지원',
                icon: '👵'
              },
              {
                title: '건강 관리',
                description: '건강상태 체크, 투약 관리, 병원 동행 등 건강 관련 종합 서비스',
                icon: '💊'
              },
              {
                title: '인지기능 향상 프로그램',
                description: '치매 예방 및 인지기능 강화를 위한 다양한 활동 프로그램 운영',
                icon: '🧠'
              },
              {
                title: '재활 운동',
                description: '신체 기능 유지 및 회복을 위한 맞춤형 재활 운동 프로그램',
                icon: '🤸‍♀️'
              },
              {
                title: '정서 지원',
                description: '말벗 서비스, 심리 상담, 여가활동 지원을 통한 정서적 안정 도모',
                icon: '❤️'
              },
              {
                title: '식사 및 영양 관리',
                description: '어르신 개인별 건강 상태에 맞는 균형 잡힌 식단 제공',
                icon: '🍽️'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 시설 안내 섹션 */}
      <section id="facility" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">쾌적한 시설 환경</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              어르신들의 안전과, 편안함, 그리고 행복한 생활을 위한 최적의 시설
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '넓고 쾌적한 생활공간',
                description: '밝고 통풍이 잘되는 쾌적한 환경의 생활실 및 휴게공간',
                image: { src: "/images/care1.jpg", alt: "생활공간" }
              },
              {
                title: '안전한 시설 설계',
                description: '낙상 방지 시설, 비상벨, 24시간 모니터링 시스템으로 안전 확보',
                image: { src: "/images/care2.jpg", alt: "시설 설계" }
              },
              {
                title: '전문 재활 치료실',
                description: '최신 재활기구를 갖춘 치료실에서 전문가 지도하에 재활 운동',
                image: { src: "/images/care3.jpg", alt: "재활 치료실" }
              },
              {
                title: '정서 함양 활동실',
                description: '다양한 여가활동과 프로그램을 즐길 수 있는 멀티 활동실',
                image: { src: "/images/care4.jpg", alt: "활동실" }
              }
            ].map((facility, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-64">
                  <Image
                    src={facility.image.src}
                    alt={facility.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전문인력 소개 섹션 */}
      <section id="staff" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문인력 소개</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              어르신의 건강과 행복을 책임지는 전문 요양인력
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: '김원장',
                position: '시설장',
                bio: '요양보호 분야 20년 경력의 시설장으로 따뜻한 마음과 전문성으로 시설을 운영합니다.',
                image: '/images/staff1.jpg'
              },
              {
                name: '이간호',
                position: '간호사',
                bio: '10년 경력의 노인간호 전문 간호사로 어르신들의 건강을 세심하게 관리합니다.',
                image: '/images/staff2.jpg'
              },
              {
                name: '박물리',
                position: '물리치료사',
                bio: '어르신 맞춤형 재활 프로그램을 통해 신체 기능 회복과 유지를 도와드립니다.',
                image: '/images/staff3.jpg'
              },
              {
                name: '최요양',
                position: '요양보호사',
                bio: '정성어린 돌봄과 공감으로 어르신들의 일상생활을 든든하게 지원합니다.',
                image: '/images/staff4.jpg'
              }
            ].map((staff, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image 
                    src={staff.image}
                    alt={staff.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{staff.name}</h3>
                <p className="text-green-600 font-medium mb-3">{staff.position}</p>
                <p className="text-gray-600">{staff.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이용후기 섹션 */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">이용자 후기</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              행복요양센터를 이용하신 가족분들의 생생한 후기
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: '어머니를 모신 지 1년이 되었습니다. 항상 밝고 친절한 요양보호사 선생님들 덕분에 어머니의 표정이 많이 밝아지셨어요. 매주 방문할 때마다 깨끗하게 관리되는 시설에 안심이 됩니다.',
                name: '이현주',
                relationship: '이용자 가족'
              },
              {
                quote: '아버지의 치매 증상이 심해져 요양원을 알아보던 중 행복요양센터를 만났습니다. 인지기능 프로그램 덕분에 아버지의 상태가 안정되고, 직원분들의 따뜻한 보살핌에 깊이 감사드립니다.',
                name: '김민수',
                relationship: '이용자 가족'
              },
              {
                quote: '저희 어머니는 거동이 불편하셔서 걱정이 많았는데, 재활 프로그램을 통해 조금씩 호전되고 계십니다. 항상 어머니를 가족처럼 대해주셔서 감사합니다.',
                name: '박지영',
                relationship: '이용자 가족'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      {testimonial.name[0]}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.relationship}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 섹션 */}
      <section id="location" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">오시는 길</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              행복요양센터의 위치와 교통편을 확인하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">위치 정보</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-semibold text-gray-900">주소</h4>
                      <p className="text-gray-600">서울특별시 행복구 요양로 123 행복요양센터</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-semibold text-gray-900">교통편</h4>
                      <p className="text-gray-600">지하철 2호선 행복역 3번 출구에서 도보 5분</p>
                      <p className="text-gray-600">버스: 123, 456, 789번 행복요양센터 정류장 하차</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.9879228517148!2d126.90615917445928!3d35.18185355724669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35718c5528f1c1c1%3A0x9a0aceca0a7388bc!2z64yA7Iug7YyM7YGs!5e0!3m2!1sko!2skr!4v1744336115572!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 예약 섹션 */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">문의 및 방문 안내</h2>
              <p className="text-lg text-gray-600 mb-8">
                행복요양센터에 관심을 가져주셔서 감사합니다. 어르신의 요양과 관련된 모든 문의사항에 성심껏 답변드리겠습니다.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">주소</h3>
                    <p className="text-gray-600">서울특별시 행복구 요양로 123 행복요양센터</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">전화</h3>
                    <p className="text-gray-600">02-123-4567 (평일 9:00 - 18:00)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">이메일</h3>
                    <p className="text-gray-600">info@happycare.kr</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">방문 시간</h3>
                <p className="text-gray-600 mb-2">평일: 오전 10시 - 오후 5시</p>
                <p className="text-gray-600 mb-4">주말 및 공휴일: 오전 10시 - 오후 3시</p>
                <p className="text-gray-600 italic">* 방문 전 사전 예약을 부탁드립니다.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">상담 예약하기</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="연락 가능한 번호를 입력하세요"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>
                
                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">문의사항</label>
                  <textarea
                    id="inquiry"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="문의사항을 자세히 적어주세요"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    상담 예약하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image 
                  src="/logo.svg" 
                  alt="행복요양센터 로고" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 brightness-200"
                />
                <span className="text-xl font-bold text-white">행복요양센터</span>
              </div>
              <p className="mb-4">
                어르신들의 건강하고 행복한 생활을 지원하는 전문 요양시설입니다.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Kakao</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Blog</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">바로가기</h3>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:text-white transition-colors">서비스</Link></li>
                <li><Link href="#facility" className="hover:text-white transition-colors">시설안내</Link></li>
                <li><Link href="#staff" className="hover:text-white transition-colors">전문인력</Link></li>
                <li><Link href="#testimonials" className="hover:text-white transition-colors">이용후기</Link></li>
                <li><Link href="#location" className="hover:text-white transition-colors">오시는 길</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">운영시간</h3>
              <ul className="space-y-2">
                <li>평일: 24시간</li>
                <li>주말 및 공휴일: 24시간</li>
                <li className="pt-2">방문상담: 평일 10AM - 5PM</li>
                <li>방문상담: 주말 10AM - 3PM</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
              <ul className="space-y-2">
                <li>전화: 02-123-4567</li>
                <li>팩스: 02-123-4568</li>
                <li>이메일: info@happycare.kr</li>
                <li>주소: 서울특별시 행복구 요양로 123</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} 행복요양센터. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
