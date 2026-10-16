import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, Share2, BookmarkCheck } from 'lucide-react';
import { knowledgeArticles } from '../data/companyData';

export default function Knowledge({ onOpenConsultation }) {
  const [readingArticle, setReadingArticle] = useState(null);

  return (
    <section id="knowledge" className="py-20 bg-[#F8F7F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cẩm Nang &amp; Kiến Thức Chuyên Ngành</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Kinh nghiệm thực tiễn cho <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">chủ thể OCOP &amp; doanh nghiệp nông thôn</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Chia sẻ các quy chuẩn kỹ thuật thiết kế bao bì, phương pháp viết câu chuyện sản phẩm và giải pháp chuyển đổi số nông nghiệp.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {knowledgeArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row"
            >
              {/* Thumbnail */}
              <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#174C3C] text-white">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="font-semibold text-[#174C3C]">{article.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A6961] leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#174C3C] group-hover:underline">
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BAE82] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setReadingArticle(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-100 shrink-0">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Đóng bài viết"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFCA9B] text-[#174C3C]">
                  {readingArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-2 leading-tight">
                  {readingArticle.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-500 pb-3 border-b border-stone-100">
                <span className="font-semibold text-[#174C3C]">{readingArticle.date}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readingArticle.readTime}</span>
                </span>
                <span>&bull;</span>
                <span>Biên soạn bởi chuyên gia Vạn Phúc Hoa</span>
              </div>

              {/* Summary lead */}
              <p className="text-sm sm:text-base font-semibold text-stone-900 italic bg-[#F8F7F3] p-4 rounded-xl border-l-4 border-[#174C3C]">
                {readingArticle.summary}
              </p>

              {/* Body */}
              <div className="text-sm text-stone-700 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                {readingArticle.content}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <span className="text-xs text-stone-500">
                Cần tư vấn áp dụng trực tiếp cho sản phẩm của bạn?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const title = readingArticle.title;
                    setReadingArticle(null);
                    onOpenConsultation(`Tư vấn sau khi đọc bài: ${title}`);
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Tư Vấn Miễn Phí</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
