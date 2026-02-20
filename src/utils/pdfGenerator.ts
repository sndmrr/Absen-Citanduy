import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Employee, AttendanceRecord } from '../lib/supabase';

export const generatePDF = async (
  employee: Employee,
  records: AttendanceRecord[],
  startDate: string,
  endDate: string,
  fileName: string
) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 1;
    const contentWidth = pageWidth - (margin * 2);

    let currentPage = 1;
    let startIdx = 0;

    while (startIdx < records.length) {
      if (currentPage > 1) {
        pdf.addPage();
      }

      let yPosition = margin;

      // Header
      pdf.setFontSize(14);
      pdf.setTextColor(34, 139, 34);
      pdf.setFont(undefined, 'bold');
      pdf.text('JURNAL LAPORAN KEGIATAN MINGGUAN', margin, yPosition);

      yPosition += 0.6;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Karyawan: ${employee.name}`, margin, yPosition);

      yPosition += 0.5;
      pdf.text(`Jabatan: ${employee.position}`, margin, yPosition);

      yPosition += 0.5;
      pdf.text(`Unit: ${employee.unit}`, margin, yPosition);

      yPosition += 0.7;
      pdf.setLineWidth(0.1);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);

      yPosition += 0.3;

      // Table headers
      const tableTop = yPosition;
      const colWidth = contentWidth / 5;
      const headerHeight = 0.6;

      pdf.setFillColor(34, 139, 34);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(8);

      const headers = ['Tanggal', 'Kegiatan', 'Lokasi', 'Catatan', 'Foto'];
      headers.forEach((header, idx) => {
        pdf.rect(margin + (idx * colWidth), tableTop, colWidth, headerHeight, 'F');
        pdf.text(header, margin + (idx * colWidth) + 0.1, tableTop + 0.35, { maxWidth: colWidth - 0.2 });
      });

      yPosition = tableTop + headerHeight;
      const rowHeight = 1.2;
      const maxRowsPerPage = 7;
      let rowsOnPage = 0;

      // Table rows
      while (startIdx < records.length && rowsOnPage < maxRowsPerPage) {
        const record = records[startIdx];
        const isLastRow = startIdx === records.length - 1;

        const rowY = yPosition;
        const bgColor = record.status === 'day_off' ? [255, 200, 200] : [255, 255, 255];

        if (record.status === 'day_off') {
          pdf.setFillColor(...bgColor);
          pdf.rect(margin, rowY, contentWidth, rowHeight, 'F');
        }

        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(7);

        const dateStr = new Date(record.attendance_date + 'T00:00:00').toLocaleDateString('id-ID', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        pdf.text(dateStr, margin + 0.1, rowY + 0.3, { maxWidth: colWidth - 0.2 });
        pdf.text(record.activity_detail || (record.status === 'day_off' ? 'DAY OFF' : '-'), margin + colWidth + 0.1, rowY + 0.3, { maxWidth: colWidth - 0.2 });
        pdf.text(record.location || '-', margin + (colWidth * 2) + 0.1, rowY + 0.3, { maxWidth: colWidth - 0.2 });
        pdf.text(record.notes || '-', margin + (colWidth * 3) + 0.1, rowY + 0.3, { maxWidth: colWidth - 0.2 });
        pdf.text(record.photo_url ? '✓' : '-', margin + (colWidth * 4) + 0.1, rowY + 0.3, { maxWidth: colWidth - 0.2 });

        // Grid lines
        pdf.setLineWidth(0.05);
        pdf.setDrawColor(200, 200, 200);
        for (let i = 0; i <= 5; i++) {
          pdf.line(margin + (i * colWidth), rowY, margin + (i * colWidth), rowY + rowHeight);
        }
        pdf.line(margin, rowY + rowHeight, pageWidth - margin, rowY + rowHeight);

        yPosition += rowHeight;
        startIdx++;
        rowsOnPage++;
      }

      // Footer
      const footerY = pageHeight - margin - 1.2;

      pdf.setLineWidth(0.1);
      pdf.line(margin, footerY, pageWidth - margin, footerY);

      pdf.setFontSize(8);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont(undefined, 'bold');

      const signatureWidth = (contentWidth - 0.5) / 2;

      pdf.text('Dibuat Oleh:', margin, footerY + 0.4);
      pdf.text('(Karyawan)', margin, footerY + 1.0);

      if (employee.signature_photo_url && employee.signature_photo_url.startsWith('data:image')) {
        try {
          pdf.addImage(employee.signature_photo_url, 'PNG', margin, footerY + 0.5, 1.5, 0.4);
        } catch (err) {
          console.error('Error adding signature image:', err);
        }
      }

      pdf.text('Diperiksa Oleh:', margin + signatureWidth + 0.5, footerY + 0.4);
      pdf.text('(Manager)', margin + signatureWidth + 0.5, footerY + 1.0);

      // Page number
      pdf.setFontSize(7);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Halaman ${currentPage}`, pageWidth / 2, pageHeight - 0.3, { align: 'center' });

      currentPage++;
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('Error generating PDF:', err);
    throw err;
  }
};
