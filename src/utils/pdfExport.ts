import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types';

export const generatePDF = async (resume: ResumeData): Promise<void> => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Temporarily remove dark mode for PDF generation if needed
  if (isDarkMode) {
    document.documentElement.classList.remove('dark');
  }
  
  try {
    const resumePage = document.querySelector('.resume-page') as HTMLElement;
    if (!resumePage) throw new Error('Resume page element not found');
    
    // Set A4 dimensions (in pixels at 96 DPI)
    const a4Width = 794;
    const a4Height = 1123;
    
    // Make a temporary clone for measurement to avoid modifying the actual DOM
    const clone = resumePage.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = `${a4Width}px`;
    document.body.appendChild(clone);
    
    const contentHeight = clone.scrollHeight;
    document.body.removeChild(clone);
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'px', [a4Width, a4Height]);
    
    // If content is longer than a single page, need to handle paging
    const pageCount = Math.ceil(contentHeight / a4Height);
    
    for (let i = 0; i < pageCount; i++) {
      // Create a canvas for this section of the resume
      const canvas = await html2canvas(resumePage, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        scrollY: -i * a4Height,
        height: Math.min(a4Height, contentHeight - i * a4Height),
        windowHeight: a4Height,
      });
      
      // Add this canvas as a page in the PDF
      const imgData = canvas.toDataURL('image/png');
      if (i > 0) pdf.addPage();
      
      pdf.addImage({
        imageData: imgData,
        x: 0,
        y: 0,
        width: a4Width,
        height: a4Height,
      });
    }
    
    // Generate filename using person's name or a default
    const filename = resume.personalInfo.name
      ? `${resume.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    
    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    // Restore dark mode if it was active
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }
};