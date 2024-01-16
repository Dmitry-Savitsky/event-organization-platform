import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const generatePDF = (data) => {
  const pdf = new jsPDF();

  pdf.text('Services Report', 15, 15);

  const tableData = data.map((service, index) => [
    index + 1,
    service.serviceName,
    service.serviceType,
    service.servicePrice,
  ]);

  const headers = ['No.', 'Service Name', 'Service Type', 'Service Price'];
  pdf.autoTable({
    startY: 20,
    head: [headers],
    body: tableData,
  });

  pdf.save('services_report.pdf');
};

export default generatePDF;
