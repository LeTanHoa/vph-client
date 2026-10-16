import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Tag, 
  ArrowRight, 
  X, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { portfolioProjects } from '../data/companyData';

export default function Projects({ onOpenConsultation }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { label: 'Tất cả dự án', id: 'all' },
    { label: 'Bao bì sản phẩm', id: 'bao-bi' },
    { label: 'Nhận diện thương hiệu', id: 'branding' },
    { label: 'Chương trình OCOP', id: 'ocop' },
    { label: 'Công nghệ & QR', id: 'tech' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.categorySlug === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Dự Án &amp; Portfolio OCOP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Những câu chuyện <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">nâng tầm đặc sản &amp; thương hiệu địa phương</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Mỗi bao bì là một tác phẩm kết tinh văn hóa bản địa, được chuẩn hóa kỹ lưỡng theo tiêu chí phân hạng OCOP quốc gia và thị hiếu tiêu dùng hiện đại.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#174C3C] text-white shadow-md shadow-[#174C3C]/20'
                  : 'bg-[#F8F7F3] text-stone-600 hover:bg-stone-200/70 border border-stone-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#F8F7F3] rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative h-60 overflow-hidden bg-stone-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Verification Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${
                        project.isVerifiedReal
                          ? 'bg-[#174C3C]/95 text-[#DFCA9B] border border-[#DFCA9B]/30'
                          : 'bg-stone-800/80 text-stone-200 border border-white/20'
                      }`}
                    >
                      {project.isVerifiedReal ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#DFCA9B]" />
                          <span>{project.labelBadge}</span>
                        </>
                      ) : (
                        <>
                          <Tag className="w-3 h-3 text-stone-300" />
                          <span>{project.labelBadge}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* OCOP Rank Tag Bottom Left */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm text-xs font-semibold text-[#DFCA9B]">
                      <Award className="w-3.5 h-3.5" />
                      <span>{project.ocopRank}</span>
                    </div>
                    <span className="text-xs text-stone-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#7BAE82]" />
                      <span>{project.location}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-bold text-[#174C3C] uppercase tracking-wider">
                    {project.category} &bull; {project.client}
                  </div>

                  <h3 className="text-xl font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A6961] leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Services tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.servicesDone.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-stone-200 text-stone-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between text-xs font-bold text-[#174C3C] pt-3 border-t border-stone-200/60 group-hover:underline">
                  <span>Xem chi tiết dự án</span>
                  <ArrowRight className="w-4 h-4 text-[#7BAE82] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-500 max-w-2xl mx-auto">
            * Các dự án thực tế trên được tổng hợp từ nguồn thông tin và hồ sơ công khai của Công ty TNHH MTV Vạn Phúc Hoa tại Quảng Nam. Các dự án mẫu được gắn nhãn minh họa định hướng nhằm thể hiện tiêu chuẩn kỹ thuật thiết kế.
          </p>
        </div>

      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Image */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-stone-100 shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Đóng modal dự án"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedProject.isVerifiedReal ? 'bg-[#DFCA9B] text-[#174C3C]' : 'bg-white/20 text-white'
                  }`}>
                    {selectedProject.labelBadge}
                  </span>
                  <span className="text-xs font-semibold text-stone-300">
                    &bull; {selectedProject.location}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mt-1">
                  Đơn vị: <strong>{selectedProject.client}</strong> &bull; Xếp hạng: <strong className="text-[#DFCA9B]">{selectedProject.ocopRank}</strong>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Deliverables summary */}
              <div>
                <h4 className="text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-2">
                  Hạng mục Vạn Phúc Hoa đã triển khai
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.servicesDone.map((srv, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#174C3C]" />
                      <span>{srv}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <p className="text-xs font-bold text-red-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Thách thức ban đầu (Challenge)</span>
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <p className="text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Giải pháp từ Vạn Phúc Hoa (Solution)</span>
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Impact / Result */}
              <div className="p-5 rounded-2xl bg-[#F8F7F3] border border-stone-200">
                <p className="text-xs font-bold text-[#19241F] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C7A66A]" />
                  <span>Hiệu quả &amp; Tác động thực tế (Impact)</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-stone-500 text-center sm:text-left">
                Bạn muốn tư vấn thiết kế cho sản phẩm tương tự?
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onOpenConsultation(`Tư vấn giải pháp cho dự án: ${title}`);
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Yêu Cầu Tư Vấn Tương Tự</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
