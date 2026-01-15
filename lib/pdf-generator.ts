import jsPDF from 'jspdf';

export interface IQResult {
  score: number;
  range: string;
  description: string;
  answers: number[];
  timeSpent: number;
  cognitiveBreakdown?: {
    patternRecognition: number;
    abstractReasoning: number;
    complexAnalysis: number;
    overallAccuracy: number;
  };
}

export function generatePDF(result: IQResult): Blob {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('IQ Test Sonuç Raporu', 105, 20, { align: 'center' });
  
  // Score
  doc.setFontSize(16);
  doc.text(`IQ Skorunuz: ${result.score}`, 105, 35, { align: 'center' });
  doc.text(`Skor Aralığı: ${result.range}`, 105, 45, { align: 'center' });
  
  // Description
  doc.setFontSize(12);
  const splitDescription = doc.splitTextToSize(result.description, 180);
  let currentY = 60;
  doc.text(splitDescription, 15, currentY);
  currentY += splitDescription.length * 7 + 10;
  
  // Cognitive Breakdown (if available)
  if (result.cognitiveBreakdown) {
    doc.setFontSize(14);
    doc.text('Bilişsel Analiz', 15, currentY);
    currentY += 10;
    doc.setFontSize(11);
    
    doc.text(`Desen Tanıma: %${result.cognitiveBreakdown.patternRecognition}`, 20, currentY);
    currentY += 7;
    doc.text(`Soyut Akıl Yürütme: %${result.cognitiveBreakdown.abstractReasoning}`, 20, currentY);
    currentY += 7;
    doc.text(`Karmaşık Analiz: %${result.cognitiveBreakdown.complexAnalysis}`, 20, currentY);
    currentY += 7;
    doc.text(`Genel Doğruluk: %${result.cognitiveBreakdown.overallAccuracy}`, 20, currentY);
    currentY += 15;
  }
  
  // Cognitive Strengths
  doc.setFontSize(14);
  doc.text('Bilişsel Güçlü Yönleriniz', 15, currentY);
  currentY += 10;
  doc.setFontSize(11);
  
  const strengths = [
    'Analitik düşünme yeteneği',
    'Mantıksal akıl yürütme kapasitesi',
    'Problem çözme becerileri',
    'Desen tanıma ve görsel algı',
    'Soyut düşünme ve modelleme',
  ];
  
  strengths.forEach((strength) => {
    doc.text(`• ${strength}`, 20, currentY);
    currentY += 7;
  });
  
  // Suggested Careers
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(14);
  doc.text('Önerilen Kariyer Alanları', 15, currentY);
  currentY += 10;
  doc.setFontSize(11);
  
  const careers = [
    'Mühendislik ve Teknoloji',
    'Bilimsel Araştırma',
    'Finans ve Analiz',
    'Stratejik Planlama',
    'Yazılım Geliştirme',
    'Veri Analizi ve İstatistik',
  ];
  
  careers.forEach((career) => {
    doc.text(`• ${career}`, 20, currentY);
    currentY += 7;
  });
  
  // Brain Improvement Tips
  doc.addPage();
  currentY = 20;
  doc.setFontSize(14);
  doc.text('Zihinsel Gelişim Önerileri', 15, currentY);
  currentY += 10;
  doc.setFontSize(11);
  
  const tips = [
    'Düzenli olarak bulmaca ve zeka oyunları çözün',
    'Yeni beceriler öğrenmeye devam edin',
    'Okuma alışkanlığı edinin, farklı konularda kitaplar okuyun',
    'Fiziksel egzersiz yapın - beyin sağlığı için önemlidir',
    'Yeterli uyku alın - optimal zihinsel performans için kritiktir',
    'Meditasyon ve mindfulness pratikleri yapın',
    'Sosyal bağlantılarınızı güçlendirin',
    'Stres yönetimi teknikleri öğrenin',
  ];
  
  tips.forEach((tip) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
    const splitTip = doc.splitTextToSize(`• ${tip}`, 180);
    doc.text(splitTip, 15, currentY);
    currentY += splitTip.length * 7 + 3;
  });
  
  // Disclaimer
  doc.addPage();
  doc.setFontSize(12);
  doc.text('Önemli Uyarı', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  const disclaimer = [
    'Bu test bilimsel veya klinik tanı amacı taşımaz.',
    'Eğlence ve kişisel farkındalık amaçlıdır.',
    '',
    'IQ skorları aralık olarak gösterilir ve çeşitli',
    'faktörlerden etkilenebilir. Tek bir test sonucu',
    'kesin bir değerlendirme sağlamaz.',
    '',
    'Profesyonel bir değerlendirme için lisanslı bir',
    'psikolog veya nöropsikolog ile görüşmeniz önerilir.',
  ];
  
  disclaimer.forEach((line, index) => {
    doc.text(line, 105, 40 + (index * 10), { align: 'center' });
  });
  
  // Generate blob
  return doc.output('blob');
}
